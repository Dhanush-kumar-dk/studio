
import { initializeApp, cert, App, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import fs from 'fs';
import path from 'path';

let adminApp: App;

if (!getApps().length) {
    if (process.env.FIREBASE_CONFIG) {
        adminApp = initializeApp();
    } else {
        try {
            let serviceAccount: any;
            if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
                serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            } else {
                const jsonPath = path.join(process.cwd(), 'studio-5927375734-5754c-firebase-adminsdk-fbsvc-2bd192e29b.json');
                if (fs.existsSync(jsonPath)) {
                    serviceAccount = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                } else {
                    throw new Error('No service account found in environment or disk');
                }
            }
            
            if (serviceAccount.private_key) {
                serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
            }

            adminApp = initializeApp({
                credential: cert(serviceAccount),
                databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://studio-5927375734-5754c-default-rtdb.firebaseio.com',
            });
        } catch (error: any) {
             throw new Error(`Failed to initialize Firebase Admin SDK. Original error: ${error.message}`);
        }
    }
} else {
    adminApp = getApps()[0];
}

export const rtdb = getDatabase(adminApp);
