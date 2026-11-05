import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB1MQzBe3JaU8HsYTIbncdhAs87SEODVxY",
  authDomain: "kshmmi.firebaseapp.com",
  projectId: "kshmmi",
  storageBucket: "kshmmi.firebasestorage.app",
  messagingSenderId: "864496083227",
  appId: "1:864496083227:web:3669aea6a36dfd4ab333be",
  measurementId: "G-7CKN3H3R4Z"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
