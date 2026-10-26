

export type Article = {
  _id: string; 
  id: string;
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

export type UserRole = 'Admin' | 'Editor' | 'Author' | 'Subscriber' | 'User';

export type User = {
  id: string;
  name: string;
  email: string | null;
  role: UserRole;
  avatarUrl: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  website?: string;
  createdAt?: string;
};

