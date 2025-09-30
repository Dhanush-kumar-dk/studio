
'use server';

import { rtdb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const generateAuthorSlug = (author: string) => {
    return author.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export async function createArticle(data: {
  title: string;
  content: string;
  imageUrl: string;
  category: 'Technology' | 'Politics' | 'Sports' | 'World';
  excerpt: string;
  author: string;
  focusKeywords: string;
  metaDescription: string;
  slug?: string;
}) {
  try {
    const id = uuidv4();
    const slug = data.slug || generateSlug(data.title);
    const authorSlug = generateAuthorSlug(data.author);

    const newArticle = {
      id,
      slug,
      authorSlug,
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      category: data.category,
      excerpt: data.excerpt,
      author: data.author,
      authorImageUrl: `https://picsum.photos/seed/${authorSlug}/40/40`,
      focusKeywords: data.focusKeywords.split(',').map(kw => kw.trim()),
      metaDescription: data.metaDescription,
      publishedAt: new Date().toISOString(),
      imageHint: 'new article',
    };

    await rtdb.ref(`articles/${id}`).set(newArticle);

    revalidatePath('/');
    revalidatePath(`/articles/${slug}`);

    return { slug };
  } catch (error: any) {
    console.error('Error creating article:', error);
    return { error: 'Failed to create article.' };
  }
}

export async function updateArticle(
  articleId: string,
  data: {
    title: string;
    content: string;
    imageUrl: string;
    category: 'Technology' | 'Politics' | 'Sports' | 'World';
    excerpt: string;
    author: string;
    focusKeywords: string;
    metaDescription: string;
    slug?: string;
  }
) {
  try {
    const articleRef = rtdb.ref(`articles/${articleId}`);
    const snapshot = await articleRef.get();
    if (!snapshot.exists()) {
      return { error: 'Article not found.' };
    }

    const existingArticle = snapshot.val();
    const slug = data.slug || generateSlug(data.title);
    const authorSlug = generateAuthorSlug(data.author);

    const updatedArticle = {
      ...existingArticle,
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      category: data.category,
      excerpt: data.excerpt,
      author: data.author,
      authorSlug,
      authorImageUrl: `https://picsum.photos/seed/${authorSlug}/40/40`,
      focusKeywords: data.focusKeywords.split(',').map(kw => kw.trim()),
      metaDescription: data.metaDescription,
      slug,
    };

    await articleRef.set(updatedArticle);

    revalidatePath('/');
    revalidatePath(`/articles/${slug}`);
    if (existingArticle.slug && existingArticle.slug !== slug) {
      revalidatePath(`/articles/${existingArticle.slug}`);
    }

    return { slug };
  } catch (error: any) {
    console.error('Error updating article:', error);
    return { error: 'Failed to update article.' };
  }
}

export async function deleteArticle(articleId: string) {
    try {
        const articleRef = rtdb.ref(`articles/${articleId}`);
        const snapshot = await articleRef.get();
        if (!snapshot.exists()) {
            return { error: 'Article not found.' };
        }
        const article = snapshot.val();

        await articleRef.remove();
        
        revalidatePath('/');
        revalidatePath(`/articles/${article.slug}`);

        return { success: true };
    } catch (error) {
        console.error('Error deleting article:', error);
        return { error: 'Failed to delete article.' };
    }
}
