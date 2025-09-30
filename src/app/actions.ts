
'use server';

import { createArticle as createArticleAction, updateArticle as updateArticleAction, deleteArticle as deleteArticleAction } from '@/lib/articles';
import { summarizeArticle } from '@/ai/flows/article-summarization';
import type { Article, User } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { rtdb } from '@/lib/firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { articles as sampleArticles } from '@/lib/data';

// Helper function to generate slugs
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphen
    .replace(/[^\w-]+/g, '') // Remove non-alphanumeric characters
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one
    .replace(/^-+/, '') // Trim hyphen from start
    .replace(/-+$/, ''); // Trim hyphen from end
};


export async function getArticles(): Promise<(Article & { _id: string })[]> {
  const articlesRef = rtdb.ref('articles');
  const snapshot = await articlesRef.get();

  if (snapshot.exists()) {
    const articlesData = snapshot.val();
    const articlesList = Object.keys(articlesData).map(key => ({
      ...articlesData[key],
      _id: key,
    }));
    return articlesList.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  // Fallback to sample data
  return sampleArticles
    .map(article => ({ ...article, _id: uuidv4(), id: uuidv4() }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getArticleBySlug(slug: string) {
  const articles = await getArticles();
  return articles.find(article => article.slug === slug) || null;
}

export async function getUsers(): Promise<User[]> {
  const usersRef = rtdb.ref('users');
  const snapshot = await usersRef.get();

  if (snapshot.exists()) {
    const usersData = snapshot.val();
    return Object.keys(usersData).map(key => usersData[key]);
  }
  return [];
}

export async function getArticlesByAuthor(authorSlug: string): Promise<(Article & { _id: string })[]> {
  const articles = await getArticles();
  return articles.filter(article => article.authorSlug === authorSlug);
}

export async function getAuthorSlugs(): Promise<string[]> {
    const articles = await getArticles();
    const slugs = articles.map(article => article.authorSlug);
    return [...new Set(slugs)];
}

export async function checkAndCreateUser(user: {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}) {
  try {
    const userRef = rtdb.ref(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists()) {
      await userRef.set({
        id: user.uid,
        name: user.displayName || (user.email ? user.email.split('@')[0] : 'Anonymous'),
        email: user.email,
        role: 'Subscriber',
        avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
        createdAt: new Date().toISOString(),
      });
      return { created: true };
    }

    return { created: false };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user in database.' };
  }
}

export const createArticle = createArticleAction;
export const updateArticle = updateArticleAction;
export const deleteArticle = deleteArticleAction;
const summarizeArticleAction = async (articleContent: string) => {
    try {
        const { summary } = await summarizeArticle({ articleContent });
        return { summary };
    } catch (error) {
        console.error('Error summarizing article:', error);
        return { error: 'Failed to summarize article.' };
    }
};

export { summarizeArticleAction as summarizeArticle };
