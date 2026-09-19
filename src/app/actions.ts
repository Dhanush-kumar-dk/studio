'use server';

import { createArticle as createArticleAction, updateArticle as updateArticleAction, deleteArticle as deleteArticleAction } from '@/lib/articles';
import type { Article, User, UserRole } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { createClient, createPublicClient, createAdminClient } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';
import { articles as sampleArticles } from '@/lib/data';

// Helper function to generate clean, SEO-friendly URL slugs
export const generateSlug = (title: string) => {
  return title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100)
    .replace(/-+$/, '');
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
    const authClient = createClient();
    const { data: { user } } = await authClient.auth.getUser();

    // Only authenticated users can request user lists
    if (!user) return [];

    const adminClient = createAdminClient();
    const { data: caller } = await adminClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    // Only Admins and Editors are authorized to view full user management data
    if (caller?.role !== 'Admin' && caller?.role !== 'Editor') {
      return [];
    }

    const { data: usersData, error } = await adminClient
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

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
  if (!user || !user.id) return { created: false };
  try {
    const supabase = createAdminClient();
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', user.id)
      .maybeSingle();

    if (!existingUser) {
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
      const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

      const { error } = await supabase.from('users').insert({
        id: user.id,
        email: user.email,
        name: name,
        avatar_url: avatarUrl,
        role: 'User',
      });
      if (error) console.error('Error inserting user in checkAndCreateUser:', error);
    }
    return { created: true };
  } catch (error) {
    console.error('Error in checkAndCreateUser:', error);
    return { created: false, error };
  }
}

export async function updateUserRole(userId: string, role: UserRole) {
  try {
    const authClient = createClient();
    const { data: { user }, error: authError } = await authClient.auth.getUser();

    if (authError || !user) {
      return { error: 'Unauthorized. You must be signed in to modify roles.' };
    }

    const adminClient = createAdminClient();
    const { data: callerProfile } = await adminClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (callerProfile?.role !== 'Admin') {
      return { error: 'Forbidden. Only Admins can modify user roles.' };
    }

    if (user.id === userId && role !== 'Admin') {
      return { error: 'Cannot remove Admin role from your own account.' };
    }

    const { error } = await adminClient
      .from('users')
      .update({ role })
      .eq('id', userId);
      
    if (error) throw error;
    
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating user role:', error);
    return { error: error?.message || 'Failed to update user role.' };
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
    const authClient = createClient();
    const { data: { user }, error: authError } = await authClient.auth.getUser();

    if (authError || !user) {
      return { error: 'Unauthorized. You must be signed in to update a profile.' };
    }

    const adminClient = createAdminClient();

    // Verify caller is either the owner or an Admin
    if (user.id !== userId) {
      const { data: callerProfile } = await adminClient
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (callerProfile?.role !== 'Admin') {
        return { error: 'Forbidden. You can only update your own profile.' };
      }
    }
    
    // Map camelCase to snake_case
    const updatedData: any = { ...data };
    if (data.firstName !== undefined) { updatedData.first_name = data.firstName; delete updatedData.firstName; }
    if (data.lastName !== undefined) { updatedData.last_name = data.lastName; delete updatedData.lastName; }
    if (data.avatarUrl !== undefined) { updatedData.avatar_url = data.avatarUrl; delete updatedData.avatarUrl; }

    const { data: userData, error } = await adminClient
      .from('users')
      .update(updatedData)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath('/profile');
    revalidatePath('/dashboard');
    return { success: true, user: userData };
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return { error: error?.message || 'Failed to update user profile.' };
  }
}

export const createArticle = createArticleAction;
export const updateArticle = updateArticleAction;
export const deleteArticle = deleteArticleAction;
