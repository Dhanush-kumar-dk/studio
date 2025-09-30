
import { initializeApp, cert, App } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getApps } from 'firebase-admin/app';

let adminApp: App;

if (!getApps().length) {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable not set.');
    }
    const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );
    
    // Ensure private_key format is correct
    if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    adminApp = initializeApp({
        credential: cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
} else {
    adminApp = getApps()[0];
}


export const rtdb = getDatabase(adminApp);
