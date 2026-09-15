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
}): Promise<{ eventId: string | null; conflictWith: string | null }> {
  let token = getGoogleAccessToken();
  if (!token || !item.tarih_iso) return { eventId: null, conflictWith: null };

  try {
    const startTime = new Date(item.tarih_iso);
    if (isNaN(startTime.getTime())) return { eventId: null, conflictWith: null };

    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    // 1. Önce takvimde çakışma var mı bak
    const conflictWith = await checkCalendarConflict(startTime.toISOString(), endTime.toISOString());

    // 2. Etkinliği oluştur (Ön hazırlık uyarısı ile birlikte)
    const eventPayload: any = {
      summary: `${item.ikon || '📌'} ${item.baslik}`,
      description: conflictWith
        ? `Notivia: Dikkat! Bu saatte '${conflictWith}' ile çakışma tespit edildi.`
        : (item.hazirlik_zamani
            ? `Notivia tarafından otomatik oluşturuldu.\n⏳ Tersine Ön Hazırlık: ${item.hazirlik_zamani}`
            : 'Notivia tarafından otomatik oluşturuldu.'),
      start: { dateTime: startTime.toISOString() },
      end: { dateTime: endTime.toISOString() },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 60 },   // 1 saat önce
          { method: 'popup', minutes: 1020 }  // 17 saat önce (Önceki gün ikindi)
        ]
      }
    };

    let response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventPayload)
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
      return { eventId: data.id, conflictWith };
    }
  } catch (error) {
    console.error('Takvim kayıt hatası:', error);
  }
  return { eventId: null, conflictWith: null };
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
