
import { initializeApp, cert, App } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getApps } from 'firebase-admin/app';

let adminApp: App;

if (!getApps().length) {
    if (process.env.FIREBASE_CONFIG) {
        // In App Hosting, FIREBASE_CONFIG is automatically set
        adminApp = initializeApp();
    } else {
        // Fallback for local development
        if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable not set for local development.');
        }
        try {
            const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
            const serviceAccount = JSON.parse(serviceAccountString);
            
            // This is the critical fix for local development
            if (serviceAccount.private_key) {
                serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
            }

            adminApp = initializeApp({
                credential: cert(serviceAccount),
                databaseURL: process.env.FIREBASE_DATABASE_URL,
            });
        } catch (error: any) {
             throw new Error(`Failed to initialize Firebase Admin SDK. Ensure FIREBASE_SERVICE_ACCOUNT_KEY is set correctly. Original error: ${error.message}`);
        }
    }
} else {
    adminApp = getApps()[0];
}

export const rtdb = getDatabase(adminApp);
