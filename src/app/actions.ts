'use server';

import { createArticle as createArticleAction, updateArticle as updateArticleAction, deleteArticle as deleteArticleAction } from '@/lib/articles';
import type { Article, User, UserRole } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { createClient, createPublicClient } from '@/lib/supabase/server';
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
  try {
    const supabase = createPublicClient();
    const { data: articlesData, error } = await supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      if (error.message?.includes('fetch failed') || error.details?.includes('ENOTFOUND')) {
        console.warn('[Supabase] Unable to connect to Supabase (project may be paused or starting up). Serving local fallback articles.');
      } else {
        console.error('Error fetching articles from Supabase:', error);
      }
    } else if (articlesData && articlesData.length > 0) {
      return articlesData.map(a => ({
        ...a,
        _id: a.id, // Map Supabase id to _id
        imageUrl: a.image_url,
        imageHint: a.image_hint,
        authorSlug: a.author_slug,
        authorImageUrl: a.author_image_url,
        publishedAt: a.published_at,
        focusKeywords: a.focus_keywords,
        metaDescription: a.meta_description,
      }));
    }
  } catch (error: any) {
    if (error?.message?.includes('fetch failed') || error?.cause?.code === 'ENOTFOUND') {
      console.warn('[Supabase] Connection failed (project may be paused or starting up). Serving local fallback articles.');
    } else {
      console.error('Error in getArticles:', error);
    }
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
  try {
    const supabase = createPublicClient();
    const { data: usersData, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error("Error fetching users from Supabase:", error);
      return [];
    }

    if (usersData) {
      return usersData.map(u => ({
        ...u,
        avatarUrl: u.avatar_url,
        firstName: u.first_name,
        lastName: u.last_name,
        createdAt: u.created_at,
      }));
    }
    return [];
  } catch(error) {
    console.error("Error in getUsers:", error);
    return [];
  }
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

export async function checkAndCreateUser(user: any) {
  // Supabase Auth handles user creation in public.users via PostgreSQL trigger.
  // We can just verify it here or do nothing since the trigger handles the row creation.
  return { created: true };
}

export async function updateUserRole(userId: string, role: UserRole) {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', userId);
        
      if (error) throw error;
      
      revalidatePath('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Error updating user role:', error);
      return { error: 'Failed to update user role.' };
    }
}

export async function updateUserProfile(userId: string, data: {
  name?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
}) {
  try {
    const supabase = createClient();
    
    // Map camelCase to snake_case
    const updatedData: any = { ...data };
    if (data.firstName) { updatedData.first_name = data.firstName; delete updatedData.firstName; }
    if (data.lastName) { updatedData.last_name = data.lastName; delete updatedData.lastName; }
    if (data.avatarUrl) { updatedData.avatar_url = data.avatarUrl; delete updatedData.avatarUrl; }

    const { data: userData, error } = await supabase
      .from('users')
      .update(updatedData)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath('/profile');
    revalidatePath('/dashboard');
    return { success: true, user: userData };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { error: 'Failed to update user profile.' };
  }
}

export const createArticle = createArticleAction;
export const updateArticle = updateArticleAction;
export const deleteArticle = deleteArticleAction;
