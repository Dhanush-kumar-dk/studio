import { articles } from './src/lib/data';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const jsonPath = path.join(process.cwd(), 'debt-dominion-db-app-service-account.json');
const serviceAccount = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://debt-dominion-db-app-default-rtdb.firebaseio.com'
});

const rtdb = admin.database();

async function seed() {
    console.log("Clearing database...");
    await rtdb.ref('/').set(null);

    console.log("Seeding articles...");
    const articlesRef = rtdb.ref('articles');
    
    for (const article of articles) {
        const id = uuidv4();
        await articlesRef.child(id).set({
            id,
            ...article,
            publishedAt: new Date().toISOString()
        });
    }

    console.log("Seeding an admin user...");
    const usersRef = rtdb.ref('users');
    await usersRef.child('admin-user-id').set({
        id: 'admin-user-id',
        email: 'admin@example.com',
        role: 'admin',
        displayName: 'Admin User'
    });

    console.log("Done seeding!");
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
