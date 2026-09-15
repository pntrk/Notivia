import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';

const STORAGE_CONFIG_KEY = 'notivia_firebase_config';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

// Check saved config in localStorage or env variables
export function getSavedFirebaseConfig(): FirebaseConfig | null {
  try {
    const saved = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.apiKey && parsed?.projectId && !parsed.apiKey.startsWith('BURAYA_')) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  // Check Vite env
  const metaEnv = (import.meta as any).env || {};
  if (
    metaEnv.VITE_FIREBASE_API_KEY &&
    metaEnv.VITE_FIREBASE_PROJECT_ID &&
    !metaEnv.VITE_FIREBASE_API_KEY.startsWith('BURAYA_')
  ) {
    return {
      apiKey: metaEnv.VITE_FIREBASE_API_KEY,
      authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || `${metaEnv.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
      projectId: metaEnv.VITE_FIREBASE_PROJECT_ID,
      storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: metaEnv.VITE_FIREBASE_APP_ID,
    };
  }

  return null;
}

export function saveFirebaseConfig(config: FirebaseConfig) {
  try {
    localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

export function initFirebase(config?: FirebaseConfig | null) {
  const activeConfig = config || getSavedFirebaseConfig();
  if (!activeConfig || !activeConfig.apiKey || activeConfig.apiKey.startsWith('BURAYA_')) {
    return { app: null, auth: null, db: null };
  }

  try {
    if (getApps().length === 0) {
      app = initializeApp(activeConfig);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
    db = getFirestore(app);
    return { app, auth, db };
  } catch (err) {
    console.warn('[Firebase] Init notice:', err);
    return { app: null, auth: null, db: null };
  }
}

export {
  auth,
  db,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
};
export type { User };
