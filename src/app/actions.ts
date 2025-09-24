"use server";

import { summarizeArticle as summarizeArticleFlow } from '@/ai/flows/article-summarization';
import { getAllArticles, createArticle as createArticleInDB, updateArticle as updateArticleInDB, deleteArticle as deleteArticleInDB, getArticleById } from '@/lib/services/articleService';
import type { Article } from '@/lib/models/Article';
import { revalidatePath } from 'next/cache';

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
        const finalSlug = input.slug || input.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        const contentWithBreaks = input.content.replace(/\n/g, '<br />');

        const articleData = {
            slug: finalSlug,
            title: input.title,
            category: input.category,
            imageUrl: input.imageUrl || `https://picsum.photos/seed/${finalSlug}/1200/800`,
            imageHint: 'new article',
            excerpt: input.excerpt,
            content: contentWithBreaks,
            author: input.author,
            authorImageUrl: `https://picsum.photos/seed/${input.author.replace(/\s+/g, '-')}/40/40`,
            publishedAt: new Date().toISOString().split('T')[0],
            focusKeywords: input.focusKeywords.split(',').map(k => k.trim()),
            metaDescription: input.metaDescription
        };

        const newArticle = await createArticleInDB(articleData);
        
        if (!newArticle) {
            return { error: 'Failed to create article in database.' };
        }
        
        revalidatePath('/');
        revalidatePath(`/articles/${newArticle.slug}`);

        return { slug: newArticle.slug };
    } catch (error) {
        console.error('Failed to create article:', error);
        return { error: 'An unexpected error occurred while creating the article.' };
    }
}

export async function updateArticle(articleId: string, input: CreateArticleInput) {
    try {
        const existingArticle = await getArticleById(articleId);
        if (!existingArticle) {
            return { error: 'Article not found.' };
        }

        const finalSlug = input.slug || input.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        const contentWithBreaks = input.content.replace(/\n/g, '<br />');

        const updateData = {
            slug: finalSlug,
            title: input.title,
            category: input.category,
            imageUrl: input.imageUrl || `https://picsum.photos/seed/${finalSlug}/1200/800`,
            excerpt: input.excerpt,
            content: contentWithBreaks,
            author: input.author,
            authorImageUrl: `https://picsum.photos/seed/${input.author.replace(/\s+/g, '-')}/40/40`,
            focusKeywords: input.focusKeywords.split(',').map(k => k.trim()),
            metaDescription: input.metaDescription
        };

        const updatedArticle = await updateArticleInDB(articleId, updateData);
        
        if (!updatedArticle) {
            return { error: 'Failed to update article in database.' };
        }
        
        revalidatePath('/');
        revalidatePath(`/articles/${updatedArticle.slug}`);
        revalidatePath(`/edit-post/${updatedArticle.slug}`);

        return { slug: updatedArticle.slug };
    } catch (error) {
        console.error('Failed to update article:', error);
        return { error: 'An unexpected error occurred while updating the article.' };
    }
}


export async function deleteArticle(articleId: string) {
    try {
        const existingArticle = await getArticleById(articleId);
        if (!existingArticle) {
            return { error: 'Article not found.' };
        }
        
        const deleted = await deleteArticleInDB(articleId);
        if (!deleted) {
            return { error: 'Failed to delete article from database.' };
        }
        
        revalidatePath('/');
        revalidatePath('/articles');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete article:', error);
        return { error: 'An unexpected error occurred while deleting the article.' };
    }
}
