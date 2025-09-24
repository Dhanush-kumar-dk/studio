// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxH8yp7vBAKRcHR6deq0pF5m4o0uQdlxI",
  authDomain: "studio-5927375734-5754c.firebaseapp.com",
  projectId: "studio-5927375734-5754c",
  storageBucket: "studio-5927375734-5754c.appspot.com",
  messagingSenderId: "228039712999",
  appId: "1:228039712999:web:b2138907583c7f7c78c242",
  measurementId: ""
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;
