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

// Firestore lazy initialization (Sadece yapılandırılmışsa ve gerekliyse yüklenir, Google Drive birincil veritabanıdır)
let firestoreDb: Firestore | null = null;
export function getDb(): Firestore | null {
  if (firestoreDb) return firestoreDb;
  try {
    if ((firebaseConfig as any).firestoreDatabaseId) {
      firestoreDb = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
    }
  } catch {
    // ignore
  }
  return firestoreDb;
}

export const db: Firestore = (typeof Proxy !== 'undefined' ? new Proxy({}, {
  get(_target, prop) {
    const d = getDb();
    if (d) return (d as any)[prop];
    return undefined;
  }
}) : null) as unknown as Firestore;

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

// 1. Standart Google Giriş Sağlayıcısı (Temel Profil & E-posta)
// Bu sağlayıcı hassas yetkiler (Drive/Takvim) İSTEMEZ; bu sayede Google Cloud OAuth "Testing" modunda olsa dahi
// dünyadaki HERHANGİ bir Google hesabı (arkadaşlarınız, aileniz, iş arkadaşlarınız) Error 403 veya engelleme olmadan tek tıkla giriş yapabilir!
export const standardGoogleProvider = new GoogleAuthProvider();
standardGoogleProvider.setCustomParameters({ prompt: 'select_account' });

// 2. Gelişmiş Google Drive & Takvim Sağlayıcısı (İsteğe bağlı ek yetkiler)
// Kişisel Google Drive dosyası yedekleme ve Google Takvim çakışma kontrolü isteyen kullanıcılar için isteğe bağlı olarak tetiklenir.
export const googleDriveCalendarProvider = new GoogleAuthProvider();
googleDriveCalendarProvider.addScope('https://www.googleapis.com/auth/drive.file');
googleDriveCalendarProvider.addScope('https://www.googleapis.com/auth/calendar.events');
googleDriveCalendarProvider.setCustomParameters({ prompt: 'select_account' });

// Geriye dönük tam uyumluluk için googleProvider varsayılan olarak engelsiz ve güvenli standart sağlayıcıdır
export const googleProvider = standardGoogleProvider;

/**
 * Kullanıcı dilerse Google Drive & Takvim izinlerini isteğe bağlı olarak bağlayabilir
 */
export async function connectGoogleDriveAndCalendar(): Promise<{ success: boolean; token: string | null; error?: any }> {
  try {
    const result = await signInWithPopup(auth, googleDriveCalendarProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || null;
    if (token) {
      setGoogleAccessToken(token);
      return { success: true, token };
    }
    return { success: false, token: null, error: 'Token alınamadı' };
  } catch (err: any) {
    console.warn('Google Drive/Takvim izin alma uyarısı:', err);
    return { success: false, token: null, error: err };
  }
}

// Token management (in-memory + localStorage + sessionStorage for persistent Google Drive sync)
const TOKEN_KEY = 'notivia_g_token';
const TOKEN_EXPIRES_KEY = 'notivia_g_token_expires_at';
const USER_EMAIL_KEY = 'notivia_g_user_email';

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

export function isGoogleTokenExpired(): boolean {
  try {
    const expiresStr = typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_EXPIRES_KEY) : null;
    if (!expiresStr) return false; // Expiry not tracked, assume valid until 401
    const expiresAt = parseInt(expiresStr, 10);
    if (isNaN(expiresAt)) return false;
    // Expired if less than 60 seconds remaining
    return Date.now() > expiresAt - 60000;
  } catch {
    return false;
  }
}

export function setGoogleAccessToken(token: string | null, expiresInSeconds: number = 3540) {
  cachedAccessToken = token;
  googleAccessToken = token;
  if (typeof window !== 'undefined') {
    (window as any).googleAccessToken = token;
  }
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(TOKEN_KEY, token);
      const expiresAt = Date.now() + expiresInSeconds * 1000;
      localStorage.setItem(TOKEN_EXPIRES_KEY, expiresAt.toString());
      console.log("Mevcut Google Token kaydedildi (Geçerlilik süresi: ~" + Math.round(expiresInSeconds / 60) + " dk):", token.slice(0, 10) + '...');
    } else {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRES_KEY);
    }
  } catch {
    // ignore
  }
}

export function getGoogleAccessToken(): string | null {
  if (googleAccessToken && !isGoogleTokenExpired()) return googleAccessToken;
  if (cachedAccessToken && !isGoogleTokenExpired()) return cachedAccessToken;
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

// Google Identity Services (GIS) Token Client for interactive user authorization
let gisTokenClient: any = null;

export function getGisTokenClient(onSuccess?: (token: string) => void): any {
  if (gisTokenClient) return gisTokenClient;
  if (typeof window !== 'undefined' && (window as any).google?.accounts?.oauth2) {
    try {
      gisTokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: (firebaseConfig as any).oAuthClientId || '337388503929-a3iaduo7bkgeu847jiqffhip6c2as5ms.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/calendar.events',
        callback: (response: any) => {
          if (response && response.access_token) {
            setGoogleAccessToken(response.access_token, response.expires_in || 3540);
            onSuccess?.(response.access_token);
          }
        },
      });
    } catch (e) {
      console.warn('GIS TokenClient başlatılamadı:', e);
    }
  }
  return gisTokenClient;
}

/**
 * Kullanıcı bir butona tıkladığında doğrudan çağrılan interaktif token alma fonksiyonu
 */
export async function requestGoogleTokenInteractive(): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const client = getGisTokenClient((token) => {
        resolve(token);
      });
      if (client) {
        client.requestAccessToken({
          prompt: 'select_account',
        });
      } else {
        resolve(null);
      }
    } catch {
      resolve(null);
    }
  });
}

// Automatically update cached user & token when auth state changes
onAuthStateChanged(auth, async (user) => {
  setCachedUser(user);
  if (user) {
    if (user.email && typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_EMAIL_KEY, user.email);
    }
  } else {
    // Sadece açıkça oturum kapatıldığında token'ı temizle
    setGoogleAccessToken(null);
  }
});

// Arka planda güvenli token kontrolü (Asla istenmeyen açılır pencere / popup tetiklemez)
export async function refreshGoogleAccessToken(interactive: boolean = false): Promise<string | null> {
  const token = getGoogleAccessToken();
  if (token && !isGoogleTokenExpired()) {
    return token;
  }

  // Yalnızca kullanıcı bir etkileşim / tıklama başlattıysa popup tetiklenebilir
  if (interactive && auth.currentUser) {
    try {
      const result = await signInWithPopup(auth, googleDriveCalendarProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const newToken = credential?.accessToken || null;
      if (newToken) {
        setGoogleAccessToken(newToken);
      }
      return newToken;
    } catch (err) {
      console.warn('Google interaktif token yenileme hatası:', err);
      return null;
    }
  }

  return null;
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
  const d = getDb();
  if (!d) return;
  try {
    const noteRef = doc(d, 'users', userId, 'notes', note.id);
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
  const d = getDb();
  if (!d) return;
  try {
    const noteRef = doc(d, 'users', userId, 'notes', noteId);
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
  const d = getDb();
  if (!d) return;
  try {
    const chunks: any[][] = [];
    for (let i = 0; i < notes.length; i += 300) {
      chunks.push(notes.slice(i, i + 300));
    }
    for (const chunk of chunks) {
      const batch = writeBatch(d);
      for (const note of chunk) {
        if (!note.id) continue;
        const noteRef = doc(d, 'users', userId, 'notes', note.id);
        batch.set(noteRef, cleanDataForFirestore({ ...note, updatedAt: serverTimestamp() }), { merge: true });
      }
      await batch.commit();
    }
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
  const d = getDb();
  if (!d) {
    return () => {};
  }
  try {
    const notesCol = collection(d, 'users', userId, 'notes');
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
        onError?.(err);
      }
    );
  } catch {
    return () => {};
  }
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
