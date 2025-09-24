import { ObjectId } from 'mongodb';

export interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  role: 'Admin' | 'Subscriber';
  avatarUrl: string;
  firebaseUid?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Subscriber';
  avatarUrl: string;
}

export function documentToUser(doc: UserDocument): User {
  return {
    id: doc._id?.toString() || '',
    name: doc.name,
    email: doc.email,
    role: doc.role,
    avatarUrl: doc.avatarUrl,
  };
}