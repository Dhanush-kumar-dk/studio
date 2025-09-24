'use server';

import { summarizeArticle as summarizeArticleFlow } from '@/ai/flows/article-summarization';
import type { Article, User } from '@/lib/types';
import { articles as allArticles } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { rtdb } from '@/lib/firebase';
import { ref, set, get, child } from 'firebase/database';

let articles: (Article & {_id: any})[] = allArticles.map((a, i) => ({...a, id: (i+1).toString(), _id: (i+1).toString()}));

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export async function getArticles() {
  return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug) || null;
}

export async function getArticlesByAuthor(authorSlug: string) {
    return articles.filter((article) => article.authorSlug === authorSlug).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getAuthorSlugs() {
    const slugs = new Set(articles.map(a => a.authorSlug));
    return Array.from(slugs);
}

export async function summarizeArticle(articleContent: string) {
  try {
    const { summary } = await summarizeArticleFlow({ articleContent });
    return { summary };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to summarize article.' };
  }
}

type CreateArticleInput = {
  title: string;
  excerpt: string;
  content: string;
  category: 'Technology' | 'Politics' | 'Sports' | 'World';
  author: string;
  slug: string;
  metaDescription: string;
  focusKeywords: string;
  imageUrl: string;
};

export async function createArticle(input: CreateArticleInput) {
  try {
    const finalSlug = input.slug || generateSlug(input.title);

    const newArticle = {
      _id: (articles.length + 1).toString(),
      id: (articles.length + 1).toString(),
      slug: finalSlug,
      title: input.title,
      category: input.category,
      imageUrl: input.imageUrl || `https://picsum.photos/seed/${finalSlug}/1200/800`,
      imageHint: 'new article',
      excerpt: input.excerpt,
      content: input.content,
      author: input.author,
      authorSlug: generateSlug(input.author),
      authorImageUrl: `https://picsum.photos/seed/${input.author.replace(/\s+/g, '-')}/40/40`,
      publishedAt: new Date().toISOString(),
      focusKeywords: input.focusKeywords.split(',').map((k) => k.trim()),
      metaDescription: input.metaDescription,
    };

    articles.push(newArticle);

    revalidatePath('/');
    revalidatePath(`/articles/${finalSlug}`);

    return { slug: finalSlug };
  } catch (error) {
    console.error('Failed to create article:', error);
    return { error: 'An unexpected error occurred while creating the article.' };
  }
}

export async function updateArticle(articleId: string, input: CreateArticleInput) {
  try {
    const articleIndex = articles.findIndex(a => a._id.toString() === articleId);
    if (articleIndex === -1) {
        return { error: 'Article not found.' };
    }

    const finalSlug = input.slug || generateSlug(input.title);

    const updatedArticle = {
        ...articles[articleIndex],
        slug: finalSlug,
        title: input.title,
        category: input.category,
        imageUrl: input.imageUrl || `https://picsum.photos/seed/${finalSlug}/1200/800`,
        excerpt: input.excerpt,
        content: input.content,
        author: input.author,
        authorSlug: generateSlug(input.author),
        authorImageUrl: `https://picsum.photos/seed/${input.author.replace(/\s+/g, '-')}/40/40`,
        focusKeywords: input.focusKeywords.split(',-').map((k) => k.trim()),
        metaDescription: input.metaDescription,
    };
    
    articles[articleIndex] = updatedArticle;

    revalidatePath('/');
    revalidatePath(`/articles/${finalSlug}`);
    revalidatePath(`/edit-post/${finalSlug}`);

    return { slug: finalSlug };
  } catch (error) {
    console.error('Failed to update article:', error);
    return { error: 'An unexpected error occurred while updating the article.' };
  }
}

export async function deleteArticle(articleId: string) {
  try {
    const articleIndex = articles.findIndex(a => a._id.toString() === articleId);
    if (articleIndex === -1) {
        return { error: 'Article not found.' };
    }
    
    articles.splice(articleIndex, 1);

    revalidatePath('/');
    revalidatePath('/articles');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete article:', error);
    return { error: 'An unexpected error occurred while deleting the article.' };
  }
}

export async function checkAndCreateUser(user: { uid: string; displayName: string | null; email: string | null; photoURL: string | null; }) {
  const dbRef = ref(rtdb);
  const snapshot = await get(child(dbRef, `users/${user.uid}`));

  if (!snapshot.exists()) {
    try {
      await set(ref(rtdb, 'users/' + user.uid), {
        id: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        email: user.email,
        role: 'Subscriber',
        avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
      });
    } catch (error) {
      console.error("Error creating user document:", error);
      return { error: 'Failed to create user in database.' }
    }
  }
  return { success: true };
}

export async function getUsers(): Promise<User[]> {
    const usersRef = ref(rtdb, 'users');
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
        const usersData = snapshot.val();
        const userList = Object.keys(usersData).map(key => ({
            id: key,
            ...usersData[key]
        }));
        return userList as User[];
    } else {
        return [];
    }
}
