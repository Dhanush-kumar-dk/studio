"use server";

import { summarizeArticle as summarizeArticleFlow } from '@/ai/flows/article-summarization';
import { articles } from '@/lib/data';
import type { Article } from '@/lib/types';

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
};

export async function createArticle(input: CreateArticleInput) {
    try {
        const newId = (articles.length + 1).toString();
        const slug = input.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        const newArticle: Article = {
            id: newId,
            slug,
            title: input.title,
            category: input.category,
            imageUrl: `https://picsum.photos/seed/${slug}/1200/800`,
            imageHint: 'new article',
            excerpt: input.excerpt,
            content: `<p>${input.content.replace(/\n/g, '</p><p>')}</p>`,
            author: input.author,
            publishedAt: new Date().toISOString(),
        };

        articles.unshift(newArticle);

        return { slug: newArticle.slug };
    } catch (error) {
        console.error('Failed to create article:', error);
        return { error: 'An unexpected error occurred while creating the article.' };
    }
}
