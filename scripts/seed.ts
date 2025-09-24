import { rtdb } from '@/lib/firebase-admin';
import { ref, set } from 'firebase/database';
import { articles as articleData } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';

async function seedDB() {
  try {
    const articlesRef = ref(rtdb, 'articles');
    
    // Create a map of articles with UUIDs as keys
    const articlesToInsert: { [key: string]: any } = {};
    articleData.forEach(article => {
        const id = uuidv4();
        articlesToInsert[id] = {
            ...article,
            id: id,
        };
    });

    await set(articlesRef, articlesToInsert);
    console.log('Seeded the "articles" collection in Realtime Database');

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // The admin SDK will handle connection closing, so we don't need to explicitly close it.
    // This process will exit automatically.
    process.exit(0);
  }
}

seedDB();
