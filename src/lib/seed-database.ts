import { getDatabase } from './mongodb';
import { articles } from './data';
import { users } from './users';
import { ArticleDocument } from './models/Article';
import { UserDocument } from './models/User';

export async function seedDatabase() {
  try {
    const db = await getDatabase();
    
    // Seed articles
    const articlesCollection = db.collection<ArticleDocument>('articles');
    const existingArticlesCount = await articlesCollection.countDocuments();
    
    if (existingArticlesCount === 0) {
      const articleDocuments: Omit<ArticleDocument, '_id'>[] = articles.map(article => ({
        slug: article.slug,
        title: article.title,
        category: article.category,
        imageUrl: article.imageUrl,
        imageHint: article.imageHint,
        excerpt: article.excerpt,
        content: article.content,
        author: article.author,
        authorImageUrl: article.authorImageUrl,
        publishedAt: article.publishedAt,
        focusKeywords: article.focusKeywords,
        metaDescription: article.metaDescription,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      
      await articlesCollection.insertMany(articleDocuments);
      console.log(`Seeded ${articleDocuments.length} articles`);
    }
    
    // Seed users
    const usersCollection = db.collection<UserDocument>('users');
    const existingUsersCount = await usersCollection.countDocuments();
    
    if (existingUsersCount === 0) {
      const userDocuments: Omit<UserDocument, '_id'>[] = users.map(user => ({
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      
      await usersCollection.insertMany(userDocuments);
      console.log(`Seeded ${userDocuments.length} users`);
    }
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}