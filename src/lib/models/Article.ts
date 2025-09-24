import { ObjectId } from 'mongodb';

export interface ArticleDocument {
  _id?: ObjectId;
  slug: string;
  title: string;
  category: 'Politics' | 'Sports' | 'Technology' | 'World';
  imageUrl: string;
  imageHint: string;
  excerpt: string;
  content: string;
  author: string;
  authorImageUrl: string;
  publishedAt: string;
  focusKeywords: string[];
  metaDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Politics' | 'Sports' | 'Technology' | 'World';
  imageUrl: string;
  imageHint: string;
  excerpt: string;
  content: string;
  author: string;
  authorImageUrl: string;
  publishedAt: string;
  focusKeywords: string[];
  metaDescription: string;
}

export function documentToArticle(doc: ArticleDocument): Article {
  return {
    id: doc._id?.toString() || '',
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    imageUrl: doc.imageUrl,
    imageHint: doc.imageHint,
    excerpt: doc.excerpt,
    content: doc.content,
    author: doc.author,
    authorImageUrl: doc.authorImageUrl,
    publishedAt: doc.publishedAt,
    focusKeywords: doc.focusKeywords,
    metaDescription: doc.metaDescription,
  };
}