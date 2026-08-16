
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const jsonPath = path.join(process.cwd(), 'debt-dominion-db-app-service-account.json');
const serviceAccount = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://debt-dominion-db-app-default-rtdb.firebaseio.com'
    });
}

const rtdb = admin.database();
const auth = admin.auth();

async function setAdmin(email: string) {
    let uid: string;
    try {
        const userRecord = await auth.getUserByEmail(email);
        uid = userRecord.uid;
        console.log(`Found user: ${uid}`);
    } catch (e: any) {
        if (e.code === 'auth/user-not-found') {
            console.log(`User not found, creating...`);
            const userRecord = await auth.createUser({
                email: email,
                password: 'password123', // temporary password
                displayName: 'Dhanush Kumar'
            });
            uid = userRecord.uid;
            console.log(`Created user: ${uid}`);
        } else {
            throw e;
        }
    }

    // Set role in RTDB
    await rtdb.ref(`users/${uid}`).update({
        id: uid,
        email: email,
        role: 'Admin',
        displayName: 'Dhanush Kumar'
    });

    console.log(`User ${email} has been set as Admin successfully.`);
    process.exit(0);
}

setAdmin('dhanushkumark62@gmail.com').catch(console.error);
