"use server";

import { summarizeArticle as summarizeArticleFlow } from '@/ai/flows/article-summarization';
import { articles } from '@/lib/data';
import type { Article } from '@/lib/types';
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
        const newId = (articles.length + 1).toString();
        const finalSlug = input.slug || input.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        const newArticle: Article = {
            id: newId,
            slug: finalSlug,
            title: input.title,
            category: input.category,
            imageUrl: input.imageUrl || `https://picsum.photos/seed/${finalSlug}/1200/800`,
            imageHint: 'new article',
            excerpt: input.excerpt,
            content: input.content,
            author: input.author,
            publishedAt: new Date().toISOString(),
            focusKeywords: input.focusKeywords.split(',').map(k => k.trim()),
            metaDescription: input.metaDescription
        };

        articles.unshift(newArticle);
        
        revalidatePath('/');
        revalidatePath(`/articles/${finalSlug}`);

        return { slug: newArticle.slug };
    } catch (error) {
        console.error('Failed to create article:', error);
        return { error: 'An unexpected error occurred while creating the article.' };
    }
}

export async function deleteArticle(articleId: string) {
    try {
        const articleIndex = articles.findIndex((a) => a.id === articleId);
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
