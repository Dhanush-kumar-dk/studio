import { ObjectId } from 'mongodb';

export type Article = {
  _id: ObjectId;
  id: string; // Keep for client-side components that might use it, but it's the string version of _id
  slug: string;
  title: string;
  category: 'Politics' | 'Sports' | 'Technology' | 'World';
  imageUrl: string;
  imageHint: string;
  excerpt: string;
  content: string;
  author: string;
  authorSlug: string;
  authorImageUrl: string;
  publishedAt: string;
  focusKeywords: string[];
  metaDescription: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Subscriber';
  avatarUrl: string;
}
