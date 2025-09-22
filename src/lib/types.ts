export type Article = {
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
};
