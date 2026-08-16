'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

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
      author_image_url: `https://picsum.photos/seed/${authorSlug}/40/40`,
      focus_keywords: data.focusKeywords.split(',').map(kw => kw.trim()),
      meta_description: data.metaDescription,
      image_hint: 'new article',
    };

    const supabase = createClient();
    const { error } = await supabase
      .from('articles')
      .insert([newArticle]);

    if (error) throw error;

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
      author_image_url: `https://picsum.photos/seed/${authorSlug}/40/40`,
      focus_keywords: data.focusKeywords.split(',').map(kw => kw.trim()),
      meta_description: data.metaDescription,
      slug,
    };

    const supabase = createClient();
    const { data: existingData, error: fetchError } = await supabase
      .from('articles')
      .select('slug')
      .eq('id', articleId)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from('articles')
      .update(updatedArticle)
      .eq('id', articleId);

    if (updateError) throw updateError;

    revalidatePath('/');
    revalidatePath(`/articles/${slug}`);
    if (existingData.slug && existingData.slug !== slug) {
      revalidatePath(`/articles/${existingData.slug}`);
    }

    return { slug };
  } catch (error: any) {
    console.error('Error updating article:', error);
    return { error: 'Failed to update article.' };
  }
}

export async function deleteArticle(articleId: string) {
    try {
        const supabase = createClient();
        const { data: article, error: fetchError } = await supabase
          .from('articles')
          .select('slug')
          .eq('id', articleId)
          .single();

        if (fetchError) throw fetchError;

        const { error: deleteError } = await supabase
          .from('articles')
          .delete()
          .eq('id', articleId);

        if (deleteError) throw deleteError;
        
        revalidatePath('/');
        revalidatePath(`/articles/${article.slug}`);

        return { success: true };
    } catch (error) {
        console.error('Error deleting article:', error);
        return { error: 'Failed to delete article.' };
    }
}
