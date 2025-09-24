import { initializeApp, getApps, getApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { config } from 'dotenv';

config({ path: '.env.local' });

let serviceAccount: ServiceAccount | undefined;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccountJson = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    // The private_key field in the JSON stored in .env files gets its newlines escaped.
    // We need to replace the \\n characters with actual newlines.
    serviceAccount = {
        ...serviceAccountJson,
        private_key: serviceAccountJson.private_key.replace(/\\n/g, '\n')
    }
  }
} catch (e) {
  console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it is a valid JSON string in your .env.local file:', e);
}


const adminApp = !getApps().length
  ? initializeApp({
      credential: serviceAccount ? cert(serviceAccount) : undefined,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    })
  : getApp();

export const rtdb = getDatabase(adminApp);
