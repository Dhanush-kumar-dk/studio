'use server';

import { revalidatePath } from 'next/cache';
import { createClient, createAdminClient } from '@/lib/supabase/server';

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
};

// Helper: Check caller identity and permissions
async function getCallerPermissions() {
  const authClient = createClient();
  const {
    data: { user },
    error: authError,
  } = await authClient.auth.getUser();

  if (authError || !user) {
    return { user: null, role: null };
  }

  const adminClient = createAdminClient();
  const { data: profile } = await adminClient
    .from('users')
    .select('role, name')
    .eq('id', user.id)
    .maybeSingle();

  return {
    user,
    role: profile?.role || 'User',
    name: profile?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
  };
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
    const { user, role } = await getCallerPermissions();

    if (!user) {
      return { error: 'Unauthorized. You must be signed in to create an article.' };
    }

    if (role !== 'Admin' && role !== 'Editor' && role !== 'Author') {
      return { error: 'Forbidden. Your role does not permit creating articles.' };
    }

    const slug = data.slug || generateSlug(data.title);
    const authorSlug = generateAuthorSlug(data.author);

    const newArticle = {
      slug,
      author_slug: authorSlug,
      title: data.title,
      content: data.content,
      image_url: data.imageUrl,
      category: data.category,
      excerpt: data.excerpt,
      author: data.author,
      author_image_url: user.user_metadata?.avatar_url || `https://picsum.photos/seed/${authorSlug}/40/40`,
      focus_keywords: data.focusKeywords ? data.focusKeywords.split(',').map((kw) => kw.trim()) : [],
      meta_description: data.metaDescription,
      image_hint: 'new article',
    };

    const adminClient = createAdminClient();
    const { error } = await adminClient.from('articles').insert([newArticle]);

    if (error) throw error;

    revalidatePath('/');
    revalidatePath(`/articles/${slug}`);
    revalidatePath('/dashboard');

    return { slug };
  } catch (error: any) {
    console.error('Error creating article:', error);
    return { error: error?.message || 'Failed to create article.' };
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
    const { user, role, name } = await getCallerPermissions();

    if (!user) {
      return { error: 'Unauthorized. You must be signed in to edit an article.' };
    }

    if (role !== 'Admin' && role !== 'Editor' && role !== 'Author') {
      return { error: 'Forbidden. Your role does not permit editing articles.' };
    }

    const adminClient = createAdminClient();
    const { data: existingData, error: fetchError } = await adminClient
      .from('articles')
      .select('slug, author, author_slug')
      .eq('id', articleId)
      .single();

    if (fetchError || !existingData) {
      return { error: 'Article not found.' };
    }

    // If caller is only an Author, verify they authored this article
    if (role === 'Author') {
      const isOwner =
        existingData.author.toLowerCase() === name.toLowerCase() ||
        existingData.author_slug === generateAuthorSlug(name);
      if (!isOwner) {
        return { error: 'Forbidden. Authors can only edit their own articles.' };
      }
    }

    const slug = data.slug || generateSlug(data.title);
    const authorSlug = generateAuthorSlug(data.author);

    const updatedArticle = {
      title: data.title,
      content: data.content,
      image_url: data.imageUrl,
      category: data.category,
      excerpt: data.excerpt,
      author: data.author,
      author_slug: authorSlug,
      focus_keywords: data.focusKeywords ? data.focusKeywords.split(',').map((kw) => kw.trim()) : [],
      meta_description: data.metaDescription,
      slug,
    };

    const { error: updateError } = await adminClient
      .from('articles')
      .update(updatedArticle)
      .eq('id', articleId);

    if (updateError) throw updateError;

    revalidatePath('/');
    revalidatePath(`/articles/${slug}`);
    revalidatePath('/dashboard');
    if (existingData.slug && existingData.slug !== slug) {
      revalidatePath(`/articles/${existingData.slug}`);
    }

    return { slug };
  } catch (error: any) {
    console.error('Error updating article:', error);
    return { error: error?.message || 'Failed to update article.' };
  }
}

export async function deleteArticle(articleId: string) {
  try {
    const { user, role } = await getCallerPermissions();

    if (!user) {
      return { error: 'Unauthorized. You must be signed in to delete an article.' };
    }

    // Only Admin and Editor can delete articles
    if (role !== 'Admin' && role !== 'Editor') {
      return { error: 'Forbidden. Only Admins and Editors can delete articles.' };
    }

    const adminClient = createAdminClient();
    const { data: article, error: fetchError } = await adminClient
      .from('articles')
      .select('slug')
      .eq('id', articleId)
      .single();

    if (fetchError || !article) {
      return { error: 'Article not found.' };
    }

    const { error: deleteError } = await adminClient.from('articles').delete().eq('id', articleId);

    if (deleteError) throw deleteError;

    revalidatePath('/');
    revalidatePath(`/articles/${article.slug}`);
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return { error: error?.message || 'Failed to delete article.' };
  }
}
