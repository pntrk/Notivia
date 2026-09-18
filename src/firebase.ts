import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
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
  setDoc,
  getDocs,
  writeBatch,
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

// Kullanıcı oturumunun tarayıcı kapatılsa, sekme yenilense veya PWA yeniden açılsa dahi
// kalıcı olarak açık kalması için browserLocalPersistence zorunlu kılınır.
try {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn('Firebase persistence setting warning:', err);
  });
} catch (e) {
  console.warn('setPersistence catch:', e);
}

export const db: Firestore = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);

// Anlık Kullanıcı Profil Önbelleği (Kullanıcının her açılışta 0ms içinde tanınması için)
const CACHED_USER_KEY = 'notivia_cached_user';

export interface CachedUserInfo {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export function getCachedUser(): CachedUserInfo | null {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(CACHED_USER_KEY) : null;
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCachedUser(user: User | null) {
  try {
    if (user) {
      const data: CachedUserInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      localStorage.setItem(CACHED_USER_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(CACHED_USER_KEY);
    }
  } catch {
    // ignore
  }
}

// Google Auth Provider with Google Drive scope for user backup & sync
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Token management (in-memory + localStorage + sessionStorage for persistent Google Drive sync)
const TOKEN_KEY = 'notivia_g_token';
let cachedAccessToken: string | null = null;
export let googleAccessToken: string | null = null;
try {
  cachedAccessToken =
    (typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null) ||
    (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(TOKEN_KEY) : null) ||
    null;
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
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(TOKEN_KEY, token);
      console.log("Mevcut Google Token kaydedildi:", token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
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
    const stored =
      (typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null) ||
      (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(TOKEN_KEY) : null) ||
      null;
    if (stored) {
      googleAccessToken = stored;
      cachedAccessToken = stored;
    }
    return stored;
  } catch {
    return null;
  }
}

// Automatically update cached user & token when auth state changes
onAuthStateChanged(auth, (user) => {
  setCachedUser(user);
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

// --- Firestore Bulut Senkronizasyon Motoru ---

/**
 * Firestore nesnelerinde 'undefined' değer bulunmasını engelleyip temizler
 */
export function cleanDataForFirestore(obj: any): any {
  if (obj === null || obj === undefined) return null;
  if (Array.isArray(obj)) {
    return obj.map((item) => cleanDataForFirestore(item));
  }
  if (typeof obj === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [key, val] of Object.entries(obj)) {
      if (val === undefined) {
        continue;
      }
      cleaned[key] = cleanDataForFirestore(val);
    }
    return cleaned;
  }
  return obj;
}

/**
 * Tekil bir notu Firestore'a anında kaydeder veya günceller
 */
export async function saveUserNoteToFirestore(userId: string, note: any): Promise<void> {
  if (!userId || !note || !note.id) return;
  try {
    const noteRef = doc(db, 'users', userId, 'notes', note.id);
    const cleaned = cleanDataForFirestore({
      ...note,
      updatedAt: serverTimestamp(),
    });
    await setDoc(noteRef, cleaned, { merge: true });
  } catch (err) {
    console.warn('Firestore not kaydetme uyarısı:', err);
  }
}

/**
 * Tekil bir notu Firestore'dan anında siler
 */
export async function deleteUserNoteFromFirestore(userId: string, noteId: string): Promise<void> {
  if (!userId || !noteId) return;
  try {
    const noteRef = doc(db, 'users', userId, 'notes', noteId);
    await deleteDoc(noteRef);
  } catch (err) {
    console.warn('Firestore not silme uyarısı:', err);
  }
}

/**
 * Birden fazla notu toplu olarak Firestore'a yazar (Batch)
 */
export async function batchSyncNotesToFirestore(userId: string, notes: any[]): Promise<void> {
  if (!userId || !Array.isArray(notes) || notes.length === 0) return;
  try {
    const chunks: any[][] = [];
    for (let i = 0; i < notes.length; i += 300) {
      chunks.push(notes.slice(i, i + 300));
    }
    for (const chunk of chunks) {
      const batch = writeBatch(db);
      for (const note of chunk) {
        if (!note.id) continue;
        const noteRef = doc(db, 'users', userId, 'notes', note.id);
        batch.set(noteRef, cleanDataForFirestore({ ...note, updatedAt: serverTimestamp() }), { merge: true });
      }
      await batch.commit();
    }
    console.log(`Firestore'a ${notes.length} adet not senkronize edildi ✓`);
  } catch (err) {
    console.warn('Firestore toplu senkronizasyon uyarısı:', err);
  }
}

/**
 * Kullanıcının Firestore'daki notlarını gerçek zamanlı (Real-time onSnapshot) dinler.
 * Bir sekmede veya cihazda yapılan değişiklikler ekran yenilenmeksizin diğer tüm yerlerde anında güncellenir.
 */
export function subscribeToUserNotes(
  userId: string,
  onNotes: (notes: any[]) => void,
  onError?: (err: any) => void
): () => void {
  if (!userId) {
    return () => {};
  }
  const notesCol = collection(db, 'users', userId, 'notes');
  return onSnapshot(
    notesCol,
    (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      onNotes(items);
    },
    (err) => {
      console.warn('Firestore gerçek zamanlı dinleme uyarısı:', err);
      onError?.(err);
    }
  );
}

// Initial connection test
export async function testConnection() {
  // Local-first, Firestore real-time and Google Drive backup
}

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
  setDoc,
  getDocs,
  writeBatch,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
};
export type { User, FirebaseApp, Firestore, Auth };
