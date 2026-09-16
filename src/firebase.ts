import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
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
  updateDoc,
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

// Google Auth Provider (Standard authentication without external Calendar scopes)
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  client_id: '337388503929-cdmog5ep7103gchf32h27hagsmqc0pq1.apps.googleusercontent.com'
});

// Token management (in-memory + sessionStorage as requested)
const TOKEN_KEY = 'notivia_g_token';
let cachedAccessToken: string | null = null;
export let googleAccessToken: string | null = null;
try {
  cachedAccessToken = sessionStorage.getItem(TOKEN_KEY) || null;
  googleAccessToken = cachedAccessToken;
  if (typeof window !== 'undefined') {
    (window as any).googleAccessToken = googleAccessToken;
  }
} catch {
  // ignore
}

export function setGoogleAccessToken(token: string | null) {
  cachedAccessToken = token;
  googleAccessToken = token;
  if (typeof window !== 'undefined') {
    (window as any).googleAccessToken = token;
  }
  try {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
      console.log("Mevcut Google Token:", token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // ignore
  }
}

export function getGoogleAccessToken(): string | null {
  if (googleAccessToken) return googleAccessToken;
  if (cachedAccessToken) return cachedAccessToken;
  try {
    const stored = sessionStorage.getItem(TOKEN_KEY) || null;
    if (stored) {
      googleAccessToken = stored;
      cachedAccessToken = stored;
    }
    return stored;
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

// Çakışan etkinlikleri sessizce sorgulama
export async function checkCalendarConflict(startIso: string, endIso: string): Promise<string | null> {
  const token = getGoogleAccessToken();
  if (!token) return null;

  try {
    const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
    url.searchParams.append('timeMin', new Date(startIso).toISOString());
    url.searchParams.append('timeMax', new Date(endIso).toISOString());
    url.searchParams.append('singleEvents', 'true');
    url.searchParams.append('orderBy', 'startTime');

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      const data = await res.json();
      // Varsa çakışan ilk etkinliğin özetini döndür
      if (data.items && data.items.length > 0) {
        return data.items[0].summary || 'Mevcut Etkinlik';
      }
    }
  } catch (err) {
    console.warn('Çakışma sorgusu yapılamadı:', err);
  }
  return null;
}

export const checkCalendarConflicts = checkCalendarConflict;

// createCalendarEvent fonksiyonu artık hem ID hem çakışma bilgisi döndürür
export async function createCalendarEvent(item: {
  baslik: string;
  tarih_iso?: string | null;
  hazirlik_zamani?: string | null;
  hazirlik_iso?: string | null;
  ikon?: string;
  [key: string]: any;
}): Promise<{ eventId: string | null; conflictWith: string | null }> {
  const token = googleAccessToken || getGoogleAccessToken();
  if (!token) {
    console.warn("Takvim Hatası: Google Access Token bulunamadı! Giriş yapılmamış.");
    return { eventId: null, conflictWith: null };
  }
  if (!item.tarih_iso) {
    console.warn("Takvim Hatası: tarih_iso alanı boş geldiği için takvim atlandı.");
    return { eventId: null, conflictWith: null };
  }

  const startTime = new Date(item.tarih_iso);
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

  try {
    const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        summary: `${item.ikon || "📌"} ${item.baslik}`,
        start: { dateTime: startTime.toISOString() },
        end: { dateTime: endTime.toISOString() }
      })
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      console.error("Google Takvim API Red Hatası:", errorBody);
      return { eventId: null, conflictWith: null };
    }

    const calData = await res.json();
    console.log("Takvim Başarıyla Eklendi. Event ID:", calData.id);
    return { eventId: calData.id, conflictWith: null };
  } catch (err) {
    console.error("Google Takvim API Red Hatası:", err);
    return { eventId: null, conflictWith: null };
  }
}

if (typeof window !== 'undefined') {
  (window as any).createCalendarEvent = createCalendarEvent;
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

// 1. Google Takvim Başlığını Güncelleme
export async function updateCalendarEventTitle(
  eventId: string,
  newTitle: string,
  icon: string = '📌'
): Promise<void> {
  const token = getGoogleAccessToken();
  if (!token || !eventId) return;
  try {
    await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary: `${icon} ${newTitle}`,
      }),
    });
  } catch (err) {
    console.warn('Takvim güncelleme hatası:', err);
  }
}

export { updateDoc };

if (typeof window !== 'undefined') {
  (window as any).checkCalendarConflict = checkCalendarConflict;
  (window as any).checkCalendarConflicts = checkCalendarConflict;
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
  console.warn('Firestore Operation Info: ', JSON.stringify(errInfo));
  return errInfo;
}

// Initial connection test
export async function testConnection() {
  try {
    if (db) {
      await getDocFromServer(doc(db, 'test', 'connection'));
    }
  } catch (error) {
    // Database may not be provisioned yet; fallback storage handles notes safely
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
  signInWithRedirect,
  getRedirectResult,
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
