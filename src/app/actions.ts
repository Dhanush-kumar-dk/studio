"use server";

import { summarizeArticle as summarizeArticleFlow } from '@/ai/flows/article-summarization';
import { getPersonalizedRecommendations as getPersonalizedRecommendationsFlow } from '@/ai/flows/personalized-recommendations';
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

export async function getPersonalizedRecommendations(readingHistoryIds: string[]) {
    // This is a simplified implementation. In a real app, you'd fetch user preferences from a DB.
    const readingHistory = articles
        .filter(article => readingHistoryIds.includes(article.id))
        .map(article => `${article.title} (${article.category})`)
        .join(', ');

    const preferences = 'Interested in Technology and World events. Prefers short-form content.';

    try {
        const { recommendations } = await getPersonalizedRecommendationsFlow({
            readingHistory: readingHistory || 'No reading history yet.',
            preferences,
            numberOfRecommendations: 6,
        });

        // The AI might return titles that don't exist. We need to find the closest matches in our data.
        const recommendedArticles = recommendations.map(recTitle => {
            // A simple search. A more robust solution might use fuzzy search or embeddings.
            return articles.find(article => article.title.toLowerCase().includes(recTitle.toLowerCase().slice(0, 20)))
        }).filter((article): article is Article => article !== undefined);

        // If not enough matches, fill with recent articles from different categories
        if (recommendedArticles.length < 6) {
            const recommendedIds = new Set(recommendedArticles.map(a => a.id));
            const recentArticles = articles
                .filter(a => !recommendedIds.has(a.id))
                .slice(0, 6 - recommendedArticles.length);
            recommendedArticles.push(...recentArticles);
        }
        
        return { recommendations: recommendedArticles.slice(0, 6) };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to get recommendations.' };
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

        // In a real application, you would save this to a database.
        // For this demo, we are just adding it to the in-memory array.
        // This change will not persist across server restarts.
        articles.unshift(newArticle);

        return { slug: newArticle.slug };
    } catch (error) {
        console.error('Failed to create article:', error);
        return { error: 'An unexpected error occurred while creating the article.' };
    }
}
