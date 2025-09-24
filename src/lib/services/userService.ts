import { getDatabase } from '@/lib/mongodb';
import { UserDocument, User, documentToUser } from '@/lib/models/User';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'users';

export async function getAllUsers(): Promise<User[]> {
  try {
    const db = await getDatabase();
    const collection = db.collection<UserDocument>(COLLECTION_NAME);
    
    const documents = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return documents.map(documentToUser);
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection<UserDocument>(COLLECTION_NAME);
    
    const document = await collection.findOne({ _id: new ObjectId(id) });
    
    return document ? documentToUser(document) : null;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection<UserDocument>(COLLECTION_NAME);
    
    const document = await collection.findOne({ email });
    
    return document ? documentToUser(document) : null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
}

export async function createUser(userData: Omit<UserDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<User | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection<UserDocument>(COLLECTION_NAME);
    
    const now = new Date();
    const document: Omit<UserDocument, '_id'> = {
      ...userData,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await collection.insertOne(document as UserDocument);
    
    if (result.insertedId) {
      const newDocument = await collection.findOne({ _id: result.insertedId });
      return newDocument ? documentToUser(newDocument) : null;
    }
    
    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function updateUser(id: string, userData: Partial<Omit<UserDocument, '_id' | 'createdAt' | 'updatedAt'>>): Promise<User | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection<UserDocument>(COLLECTION_NAME);
    
    const updateData = {
      ...userData,
      updatedAt: new Date(),
    };
    
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    return result ? documentToUser(result) : null;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

export async function updateUserRole(id: string, role: 'Admin' | 'Subscriber'): Promise<User | null> {
  return updateUser(id, { role });
}