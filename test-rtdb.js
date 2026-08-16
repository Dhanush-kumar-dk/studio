const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

async function run() {
    let serviceAccount;
    const jsonPath = path.join(process.cwd(), 'studio-5927375734-5754c-firebase-adminsdk-fbsvc-2bd192e29b.json');
    if (fs.existsSync(jsonPath)) {
        serviceAccount = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } else {
        console.log("No json found");
        return;
    }
    
    const app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://studio-5927375734-5754c-default-rtdb.firebaseio.com'
    });
    
    const db = admin.database();
    const start = Date.now();
    try {
        const snap = await db.ref('articles').once('value');
        console.log("Success in", Date.now() - start, "ms", snap.val() ? Object.keys(snap.val()).length : 0);
    } catch(e) {
        console.error("Error", e);
    }
    process.exit(0);
}
run();
