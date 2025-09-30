import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxH8yp7vBAKRcHR6deq0pF5m4o0uQdlxI",
  authDomain: "studio-5927375734-5754c.firebaseapp.com",
  databaseURL: "https://studio-5927375734-5754c-default-rtdb.firebaseio.com", // **Added**
  projectId: "studio-5927375734-5754c",
  storageBucket: "studio-5927375734-5754c.appspot.com",
  messagingSenderId: "228039712999",
  appId: "1:228039712999:web:b2138907583c7f7c78c242",
  measurementId: ""
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

export default app;