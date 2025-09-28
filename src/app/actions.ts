
'use server';

import { summarizeArticle as summarizeArticleFlow } from '@/ai/flows/article-summarization';
import { subscribeToNewsletter as subscribeToNewsletterFlow } from '@/ai/flows/subscribe-to-newsletter';
import type { Article, User } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { rtdb } from '@/lib/firebase-admin';
import { ref, set, get, child, remove, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { articles as sampleArticles } from '@/lib/data';


const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export async function getArticles(): Promise<(Article & { _id: string })[]> {
    const articlesRef = ref(rtdb, 'articles');
    const snapshot = await get(articlesRef);
    if (snapshot.exists()) {
        const articlesData = snapshot.val();
        const articlesList = Object.keys(articlesData).map(key => ({
            ...articlesData[key],
            _id: key,
        }));
        return articlesList.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    
    // Fallback to sample data if database is empty
    return sampleArticles.map(article => ({...article, _id: uuidv4(), id: uuidv4() })).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getArticleBySlug(slug: string): Promise<(Article & { _id: string }) | null> {
    const articles = await getArticles();
    return articles.find((article) => article.slug === slug) || null;
}

export async function getArticlesByAuthor(authorSlug: string) {
    const articles = await getArticles();
    return articles.filter((article) => article.authorSlug === authorSlug).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getAuthorSlugs() {
    const articles = await getArticles();
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

export async function subscribeToNewsletter(email: string) {
    try {
        const result = await subscribeToNewsletterFlow({ email });
        return { success: result.status === 'subscribed' };
    } catch (error) {
        console.error('Failed to subscribe to newsletter:', error);
        return { error: 'An unexpected error occurred while subscribing.' };
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
    const articleId = uuidv4();

    const newArticle: Omit<Article, '_id'> = {
      id: articleId,
      slug: finalSlug,
      title: input.title,
      category: input.category,
      imageUrl: input.imageUrl || `https://picsum.photos/seed/${finalSlug}/1200/800`,
      imageHint: 'new article',
      excerpt: input.excerpt,
      content: input.content,
      author: input.author,
      authorSlug: generateSlug(input.author),
      authorImageUrl: `https://picsum.photos/seed/${input.author.toLowerCase().replace(/\s+/g, '-')}/40/40`,
      publishedAt: new Date().toISOString(),
      focusKeywords: input.focusKeywords.split(',').map((k) => k.trim()),
      metaDescription: input.metaDescription,
    };
    
    const articleRef = ref(rtdb, 'articles/' + articleId);
    await set(articleRef, newArticle);

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
    const articleRef = ref(rtdb, 'articles/' + articleId);
    const snapshot = await get(articleRef);

    if (!snapshot.exists()) {
        return { error: 'Article not found.' };
    }

    const finalSlug = input.slug || generateSlug(input.title);

    const updatedArticleData = {
        slug: finalSlug,
        title: input.title,
        category: input.category,
        imageUrl: input.imageUrl || `https://picsum.photos/seed/${finalSlug}/1200/800`,
        excerpt: input.excerpt,
        content: input.content,
        author: input.author,
        authorSlug: generateSlug(input.author),
        authorImageUrl: `https://picsum.photos/seed/${input.author.toLowerCase().replace(/\s+/g, '-')}/40/40`,
        focusKeywords: input.focusKeywords.split(',').map((k) => k.trim()),
        metaDescription: input.metaDescription,
    };
    
    await update(articleRef, updatedArticleData);

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
    const articleRef = ref(rtdb, 'articles/' + articleId);
    await remove(articleRef);

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
      return { created: true };
    } catch (error) {
      console.error("Error creating user document:", error);
      return { error: 'Failed to create user in database.' }
    }
  }
  return { created: false };
}

export async function getUsers(): Promise<User[]> {
    const usersRef = ref(rtdb, 'users');
    try {
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
    } catch (error) {
        console.error("Error fetching users:", error);
        // This is where the permission error from RTDB would be caught.
        // We can re-throw a more specific error message.
        if ((error as any).code === 'PERMISSION_DENIED') {
             throw new Error("Permission denied. Please check your Realtime Database security rules in the Firebase Console.");
        }
        throw new Error("Could not fetch user data.");
    }
}
