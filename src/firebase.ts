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
  getDocFromServer,
  type Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);

// Google Auth Provider with Google Calendar Events scope
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/calendar.events');

// Token management (in-memory + sessionStorage as requested)
const TOKEN_KEY = 'notivia_g_token';
let cachedAccessToken: string | null = null;
try {
  cachedAccessToken = sessionStorage.getItem(TOKEN_KEY) || null;
} catch {
  // ignore
}

export function setGoogleAccessToken(token: string | null) {
  cachedAccessToken = token;
  try {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // ignore
  }
}

export function getGoogleAccessToken(): string | null {
  if (cachedAccessToken) return cachedAccessToken;
  try {
    return sessionStorage.getItem(TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

// Automatically clear token when user signs out
onAuthStateChanged(auth, (user) => {
  if (!user) {
    setGoogleAccessToken(null);
  }
});

// Token süresi dolduğunda veya bulunamadığında sessizce taze token alma fonksiyonu
export async function refreshGoogleAccessToken(): Promise<string | null> {
  if (!auth.currentUser) return null;
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const newToken = credential?.accessToken || null;
    if (newToken) {
      setGoogleAccessToken(newToken);
    }
    return newToken;
  } catch (err) {
    console.warn('Google token yenilenemedi:', err);
    return null;
  }
}

// createCalendarEvent fonksiyonunu 401 yakalayıp 1 kez tazeleyecek şekilde güncelleyin
export async function createCalendarEvent(item: {
  baslik: string;
  tarih_iso?: string | null;
  hazirlik_zamani?: string | null;
  hazirlik_iso?: string | null;
  ikon?: string;
}): Promise<string | null> {
  let token = getGoogleAccessToken();
  if (!token || !item.tarih_iso) return null;

  try {
    const startTime = new Date(item.tarih_iso);
    if (isNaN(startTime.getTime())) return null;

    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const description = item.hazirlik_zamani
      ? `Notivia tarafından otomatik oluşturuldu.\n⏳ Tersine Ön Hazırlık: ${item.hazirlik_zamani}`
      : 'Notivia tarafından otomatik oluşturuldu.';

    const eventPayload = {
      summary: `${item.ikon || '📌'} ${item.baslik}`,
      description,
      start: { dateTime: startTime.toISOString() },
      end: { dateTime: endTime.toISOString() },
    };

    let response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    });

    // 401 Expired Token yakalandığında token'ı sıfırla ve 1 kez tazeleyip tekrar dene
    if (response.status === 401) {
      setGoogleAccessToken(null);
      const refreshedToken = await refreshGoogleAccessToken();
      if (refreshedToken) {
        response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${refreshedToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventPayload),
        });
      }
    }

    if (response.ok) {
      const data = await response.json();
      return data.id;
    }
  } catch (error) {
    console.error('Takvim senkronizasyon hatası:', error);
  }
  return null;
}

// Delete Calendar Event from Google Calendar
export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const token = getGoogleAccessToken();
  if (!token || !eventId) return;

  try {
    await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Takvim silme hatası:', error);
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initial connection test
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or configuration needs verification.');
    }
  }
}

testConnection();

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export function getSavedFirebaseConfig(): FirebaseConfig | null {
  return {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
  };
}

export function saveFirebaseConfig(_config: FirebaseConfig) {
  // Config is managed through firebase-applet-config.json
}

export function initFirebase() {
  return { app, auth, db };
}

export {
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
export type { User, FirebaseApp, Firestore, Auth };
