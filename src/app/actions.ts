'use server';

import { summarizeArticle as summarizeArticleFlow } from '@/ai/flows/article-summarization';
import type { Article } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB);
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export async function getArticles() {
  const db = await getDb();
  const articles = await db.collection('articles').find({}).sort({ publishedAt: -1 }).toArray();
  return JSON.parse(JSON.stringify(articles)) as Article[];
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  const article = await db.collection('articles').findOne({ slug });
  if (!article) return null;
  return JSON.parse(JSON.stringify(article)) as Article;
}

export async function getArticlesByAuthor(authorSlug: string) {
    const db = await getDb();
    const articles = await db.collection('articles').find({ authorSlug }).sort({ publishedAt: -1 }).toArray();
    return JSON.parse(JSON.stringify(articles)) as Article[];
}

export async function getAuthorSlugs() {
    const db = await getDb();
    const articles = await db.collection('articles').distinct('authorSlug');
    return articles;
}

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
    const db = await getDb();
    const finalSlug = input.slug || generateSlug(input.title);

    const newArticle = {
      slug: finalSlug,
      title: input.title,
      category: input.category,
      imageUrl: input.imageUrl || `https://picsum.photos/seed/${finalSlug}/1200/800`,
      imageHint: 'new article',
      excerpt: input.excerpt,
      content: input.content,
      author: input.author,
      authorSlug: generateSlug(input.author),
      authorImageUrl: `https://picsum.photos/seed/${input.author.replace(/\s+/g, '-')}/40/40`,
      publishedAt: new Date().toISOString(),
      focusKeywords: input.focusKeywords.split(',').map((k) => k.trim()),
      metaDescription: input.metaDescription,
    };

    const result = await db.collection('articles').insertOne(newArticle);

    revalidatePath('/');
    revalidatePath(`/articles/${finalSlug}`);

    return { slug: finalSlug };
  } catch (error) {
    console.error('Failed to create article:', error);
    return { error: 'An unexpected error occurred while creating the article.' };
  }
}

export async function updateArticle(articleId: string, input: CreateArticleInput) {
  try {
    if (!ObjectId.isValid(articleId)) {
        return { error: 'Invalid article ID.'}
    }
    const db = await getDb();
    const finalSlug = input.slug || generateSlug(input.title);

    const updatedArticleData = {
      slug: finalSlug,
      title: input.title,
      category: input.category,
      imageUrl: input.imageUrl || `https://picsum.photos/seed/${finalSlug}/1200/800`,
      excerpt: input.excerpt,
      content: input.content,
      author: input.author,
      authorSlug: generateSlug(input.author),
      authorImageUrl: `https://picsum.photos/seed/${input.author.replace(/\s+/g, '-')}/40/40`,
      focusKeywords: input.focusKeywords.split(',').map((k) => k.trim()),
      metaDescription: input.metaDescription,
    };

    const result = await db.collection('articles').updateOne(
        { _id: new ObjectId(articleId) },
        { $set: updatedArticleData }
    );

    if (result.matchedCount === 0) {
        return { error: 'Article not found.' };
    }

    revalidatePath('/');
    revalidatePath(`/articles/${finalSlug}`);
    revalidatePath(`/edit-post/${finalSlug}`);

    return { slug: finalSlug };
  } catch (error) {
    console.error('Failed to update article:', error);
    return { error: 'An unexpected error occurred while updating the article.' };
  }
}

export async function deleteArticle(articleId: string) {
  try {
    if (!ObjectId.isValid(articleId)) {
        return { error: 'Invalid article ID.'}
    }
    const db = await getDb();
    const result = await db.collection('articles').deleteOne({ _id: new ObjectId(articleId) });
    
    if (result.deletedCount === 0) {
        return { error: 'Article not found.' };
    }

    revalidatePath('/');
    revalidatePath('/articles');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete article:', error);
    return { error: 'An unexpected error occurred while deleting the article.' };
  }
}
