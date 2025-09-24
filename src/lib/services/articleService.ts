import { getDatabase } from '@/lib/mongodb';
import { ArticleDocument, Article, documentToArticle } from '@/lib/models/Article';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'articles';

export async function getAllArticles(): Promise<Article[]> {
  try {
    const db = await getDatabase();
    const collection = db.collection<ArticleDocument>(COLLECTION_NAME);
    
    const documents = await collection
      .find({})
      .sort({ publishedAt: -1 })
      .toArray();
    
    return documents.map(documentToArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection<ArticleDocument>(COLLECTION_NAME);
    
    const document = await collection.findOne({ slug });
    
    return document ? documentToArticle(document) : null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection<ArticleDocument>(COLLECTION_NAME);
    
    const document = await collection.findOne({ _id: new ObjectId(id) });
    
    return document ? documentToArticle(document) : null;
  } catch (error) {
    console.error('Error fetching article by id:', error);
    return null;
  }
}

export async function createArticle(articleData: Omit<ArticleDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<Article | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection<ArticleDocument>(COLLECTION_NAME);
    
    const now = new Date();
    const document: Omit<ArticleDocument, '_id'> = {
      ...articleData,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await collection.insertOne(document as ArticleDocument);
    
    if (result.insertedId) {
      const newDocument = await collection.findOne({ _id: result.insertedId });
      return newDocument ? documentToArticle(newDocument) : null;
    }
    
    return null;
  } catch (error) {
    console.error('Error creating article:', error);
    return null;
  }
}

export async function updateArticle(id: string, articleData: Partial<Omit<ArticleDocument, '_id' | 'createdAt' | 'updatedAt'>>): Promise<Article | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection<ArticleDocument>(COLLECTION_NAME);
    
    const updateData = {
      ...articleData,
      updatedAt: new Date(),
    };
    
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    return result ? documentToArticle(result) : null;
  } catch (error) {
    console.error('Error updating article:', error);
    return null;
  }
}

export async function deleteArticle(id: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    const collection = db.collection<ArticleDocument>(COLLECTION_NAME);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    return result.deletedCount === 1;
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
}