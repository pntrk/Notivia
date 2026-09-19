// Google Drive Notes Database & Continuous Multi-Device Sync Engine
// Notivia uses the user's personal Google Drive as the primary, persistent cloud database.
// No user notes are stored in Firebase or any central company server.

import { getGoogleAccessToken, setGoogleAccessToken, refreshGoogleAccessToken } from '../firebase';
import type { SimpleCardItem } from '../App';

export const PRIMARY_DB_FILE = 'notivia_database.json';
export const LEGACY_DB_FILE = 'notivia_backup.json';
const DB_MIME_TYPE = 'application/json';

const DELETED_NOTES_KEY = 'notivia_deleted_notes_ids';
const DRIVE_LAST_MODIFIED_KEY = 'notivia_drive_last_modified';
const DEVICE_ID_KEY = 'notivia_client_device_id';

export interface DriveSyncResult {
  success: boolean;
  fileId?: string;
  modifiedTime?: string;
  notes?: SimpleCardItem[];
  error?: string;
  updated?: boolean;
  isNewerRemote?: boolean;
}

export interface NotiviaDriveDatabase {
  appName: 'Notivia';
  version: '2.0';
  lastUpdated: string; // ISO 8601
  deviceId: string;
  notesCount: number;
  notes: SimpleCardItem[];
  deletedIds?: string[];
}

/**
 * Returns or generates a persistent unique client device ID.
 */
export function getDeviceId(): string {
  try {
    let id = typeof localStorage !== 'undefined' ? localStorage.getItem(DEVICE_ID_KEY) : null;
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(DEVICE_ID_KEY, id);
      }
    }
    return id;
  } catch {
    return 'dev_' + Date.now();
  }
}

/**
 * Record a deleted note ID so deletions correctly propagate across devices via Google Drive.
 */
export function recordDeletedNoteId(noteId: string): void {
  if (!noteId) return;
  try {
    const current = getDeletedNoteIds();
    if (!current.includes(noteId)) {
      current.push(noteId);
      // Keep last 200 deleted IDs
      const trimmed = current.slice(-200);
      localStorage.setItem(DELETED_NOTES_KEY, JSON.stringify(trimmed));
    }
  } catch {
    // ignore
  }
}

/**
 * Returns locally tracked deleted note IDs.
 */
export function getDeletedNoteIds(): string[] {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(DELETED_NOTES_KEY) : null;
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clean up deleted note IDs once confirmed processed.
 */
export function pruneDeletedNoteIds(idsToKeep: string[]): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(DELETED_NOTES_KEY, JSON.stringify(idsToKeep.slice(-100)));
    }
  } catch {
    // ignore
  }
}

export function getLastKnownDriveModified(): string | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(DRIVE_LAST_MODIFIED_KEY) : null;
  } catch {
    return null;
  }
}

export function setLastKnownDriveModified(modifiedTime: string | null): void {
  try {
    if (typeof localStorage !== 'undefined') {
      if (modifiedTime) {
        localStorage.setItem(DRIVE_LAST_MODIFIED_KEY, modifiedTime);
      } else {
        localStorage.removeItem(DRIVE_LAST_MODIFIED_KEY);
      }
    }
  } catch {
    // ignore
  }
}

/**
 * Wrapper for Google Drive API requests with automatic silent token refresh on 401 Unauthorized.
 * This guarantees the user's session doesn't suddenly drop or fail after 1 hour.
 */
async function fetchWithDriveAuth(
  url: string,
  options: RequestInit = {},
  retryOn401 = true
): Promise<Response> {
  let token = getGoogleAccessToken();
  if (!token) {
    // Try to refresh token silently before giving up
    token = await refreshGoogleAccessToken();
  }

  if (!token) {
    throw new Error('Google hesabı bağlı değil veya oturum süresi doldu');
  }

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401 && retryOn401) {
    console.log('Google Drive 401 döndürdü, token otomatik yenileniyor...');
    const newToken = await refreshGoogleAccessToken();
    if (newToken) {
      const retryHeaders = new Headers(options.headers || {});
      retryHeaders.set('Authorization', `Bearer ${newToken}`);
      return fetch(url, {
        ...options,
        headers: retryHeaders,
      });
    }
  }

  return res;
}

export interface DriveFileInfo {
  id: string;
  name: string;
  modifiedTime: string;
}

/**
 * Searches for Notivia database file in Google Drive.
 * Checks primary name first ('notivia_database.json'), falls back to legacy ('notivia_backup.json').
 */
export async function findDatabaseFile(): Promise<DriveFileInfo | null> {
  try {
    // Query for both primary and legacy names
    const query = encodeURIComponent(
      `(name = '${PRIMARY_DB_FILE}' or name = '${LEGACY_DB_FILE}') and trashed = false`
    );
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,modifiedTime)&spaces=drive&orderBy=modifiedTime desc`;

    const res = await fetchWithDriveAuth(url);
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (data.files && data.files.length > 0) {
      return {
        id: data.files[0].id,
        name: data.files[0].name,
        modifiedTime: data.files[0].modifiedTime || new Date().toISOString(),
      };
    }
    return null;
  } catch (err) {
    console.warn('Google Drive veritabanı dosyası arama uyarısı:', err);
    return null;
  }
}

/**
 * Checks if remote database in Google Drive has changed without downloading full content (0ms metadata check).
 */
export async function checkGoogleDriveForUpdates(): Promise<{ hasUpdate: boolean; modifiedTime?: string; fileId?: string }> {
  try {
    const file = await findDatabaseFile();
    if (!file) {
      return { hasUpdate: false };
    }
    const lastKnown = getLastKnownDriveModified();
    if (!lastKnown) {
      return { hasUpdate: true, modifiedTime: file.modifiedTime, fileId: file.id };
    }
    const hasUpdate = new Date(file.modifiedTime).getTime() > new Date(lastKnown).getTime();
    return { hasUpdate, modifiedTime: file.modifiedTime, fileId: file.id };
  } catch {
    return { hasUpdate: false };
  }
}

/**
 * Loads notes database from the user's personal Google Drive account.
 */
export async function loadNotesFromGoogleDrive(): Promise<DriveSyncResult & { deletedIds?: string[] }> {
  try {
    const file = await findDatabaseFile();
    if (!file) {
      // First time on Google Drive
      return { success: true, notes: [], deletedIds: [] };
    }

    const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
    const res = await fetchWithDriveAuth(downloadUrl);

    if (!res.ok) {
      return { success: false, error: `Drive okuma hatası: ${res.status}` };
    }

    const content = await res.json();
    setLastKnownDriveModified(file.modifiedTime);

    let notes: SimpleCardItem[] = [];
    let deletedIds: string[] = [];

    if (Array.isArray(content)) {
      notes = content;
    } else if (content && typeof content === 'object') {
      if (Array.isArray(content.notes)) {
        notes = content.notes;
      }
      if (Array.isArray(content.deletedIds)) {
        deletedIds = content.deletedIds;
      }
    }

    return {
      success: true,
      fileId: file.id,
      modifiedTime: file.modifiedTime,
      notes,
      deletedIds,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Bilinmeyen Drive hatası' };
  }
}

/**
 * Saves notes directly to the user's Google Drive as the primary database.
 * Updates the existing file if present, or creates a new one using multipart upload.
 */
export async function saveNotesToGoogleDrive(
  notes: SimpleCardItem[],
  customDeletedIds?: string[]
): Promise<DriveSyncResult> {
  try {
    const existingFile = await findDatabaseFile();
    const deletedIds = customDeletedIds || getDeletedNoteIds();
    const deviceId = getDeviceId();

    const dbPayload: NotiviaDriveDatabase = {
      appName: 'Notivia',
      version: '2.0',
      lastUpdated: new Date().toISOString(),
      deviceId,
      notesCount: notes.length,
      notes,
      deletedIds,
    };

    const content = JSON.stringify(dbPayload, null, 2);

    if (existingFile) {
      // Update existing database file
      const uploadUrl = `https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}?uploadType=media`;
      const res = await fetchWithDriveAuth(uploadUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': DB_MIME_TYPE,
        },
        body: content,
      });

      if (!res.ok) {
        return { success: false, error: `Drive güncelleme hatası: ${res.status}` };
      }

      const data = await res.json();
      const updatedTime = new Date().toISOString();
      setLastKnownDriveModified(updatedTime);

      return {
        success: true,
        fileId: data.id || existingFile.id,
        modifiedTime: updatedTime,
        notes,
      };
    } else {
      // Create new database file in user's Drive using multipart upload
      const metadata = {
        name: PRIMARY_DB_FILE,
        mimeType: DB_MIME_TYPE,
        description: 'Notivia Bilişsel Yaşam Asistanı Kişisel Bulut Veritabanı',
      };

      const boundary = '-------314159265358979323846';
      const delimiter = `\r\n--${boundary}\r\n`;
      const closeDelimiter = `\r\n--${boundary}--`;

      const multipartRequestBody =
        delimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        `Content-Type: ${DB_MIME_TYPE}\r\n\r\n` +
        content +
        closeDelimiter;

      const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
      const res = await fetchWithDriveAuth(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      });

      if (!res.ok) {
        return { success: false, error: `Drive veritabanı oluşturma hatası: ${res.status}` };
      }

      const data = await res.json();
      const updatedTime = new Date().toISOString();
      setLastKnownDriveModified(updatedTime);

      return {
        success: true,
        fileId: data.id,
        modifiedTime: updatedTime,
        notes,
      };
    }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Drive kayıt hatası' };
  }
}

/**
 * Intelligent Multi-Device Bidirectional Database Synchronization.
 * Seamlessly merges Google Drive cloud database with local storage:
 * - Honors deletions from any device (via deletedIds tombstone)
 * - Compares note timestamps to keep the latest modifications
 * - Adds new notes created on any device
 * - Updates Google Drive if local had newer changes
 */
export async function syncDatabaseWithDrive(
  localNotes: SimpleCardItem[]
): Promise<{
  success: boolean;
  notes: SimpleCardItem[];
  updated: boolean;
  error?: string;
  source: 'remote' | 'local' | 'merged' | 'noop';
}> {
  try {
    const driveResult = await loadNotesFromGoogleDrive();
    if (!driveResult.success) {
      return {
        success: false,
        notes: localNotes,
        updated: false,
        error: driveResult.error,
        source: 'noop',
      };
    }

    const remoteNotes = driveResult.notes || [];
    const remoteDeletedIds = driveResult.deletedIds || [];
    const localDeletedIds = getDeletedNoteIds();

    // Union of all deleted note IDs from all devices
    const allDeletedIds = new Set<string>([...remoteDeletedIds, ...localDeletedIds]);

    // Fast-path: Remote has no database yet and local has notes -> upload local to Drive
    if (remoteNotes.length === 0 && localNotes.length > 0) {
      const filteredLocal = localNotes.filter((n) => !allDeletedIds.has(n.id));
      await saveNotesToGoogleDrive(filteredLocal, Array.from(allDeletedIds));
      return {
        success: true,
        notes: filteredLocal,
        updated: true,
        source: 'local',
      };
    }

    // Fast-path: Local has no notes and remote has notes (e.g. logging in from a new device/phone)
    if (localNotes.length === 0 && remoteNotes.length > 0) {
      const filteredRemote = remoteNotes.filter((n) => !allDeletedIds.has(n.id));
      return {
        success: true,
        notes: filteredRemote,
        updated: true,
        source: 'remote',
      };
    }

    // Bidirectional merge with timestamp & conflict resolution
    const mergedMap = new Map<string, SimpleCardItem>();
    let hasLocalChanges = false;
    let hasRemoteChanges = false;

    // 1. Process remote notes
    for (const rNote of remoteNotes) {
      if (allDeletedIds.has(rNote.id)) continue;
      mergedMap.set(rNote.id, rNote);
    }

    // 2. Merge local notes
    for (const lNote of localNotes) {
      if (allDeletedIds.has(lNote.id)) {
        hasLocalChanges = true; // Was deleted locally
        continue;
      }

      if (!mergedMap.has(lNote.id)) {
        // New note created locally on this device
        mergedMap.set(lNote.id, lNote);
        hasLocalChanges = true;
      } else {
        const rNote = mergedMap.get(lNote.id)!;
        // Compare modification times
        const lTime = lNote.createdAt ? new Date(lNote.createdAt).getTime() : 0;
        const rTime = rNote.createdAt ? new Date(rNote.createdAt).getTime() : 0;

        // If local has more completed action items or is completed
        const lCompletedCount = (lNote.action_items || []).filter((t) => t.is_completed).length;
        const rCompletedCount = (rNote.action_items || []).filter((t) => t.is_completed).length;

        if (lNote.tamamlandi && !rNote.tamamlandi) {
          mergedMap.set(lNote.id, lNote);
          hasLocalChanges = true;
        } else if (rNote.tamamlandi && !lNote.tamamlandi) {
          hasRemoteChanges = true;
        } else if (lCompletedCount > rCompletedCount) {
          mergedMap.set(lNote.id, lNote);
          hasLocalChanges = true;
        } else if (rCompletedCount > lCompletedCount) {
          hasRemoteChanges = true;
        } else if (lTime > rTime) {
          mergedMap.set(lNote.id, lNote);
          hasLocalChanges = true;
        } else if (rTime > lTime) {
          hasRemoteChanges = true;
        }
      }
    }

    const mergedNotes = Array.from(mergedMap.values());

    // Prune processed deleted IDs to keep storage lean
    pruneDeletedNoteIds(Array.from(allDeletedIds));

    // If local had new items or modified items, push the merged state back to Google Drive
    if (hasLocalChanges) {
      await saveNotesToGoogleDrive(mergedNotes, Array.from(allDeletedIds));
    }

    return {
      success: true,
      notes: mergedNotes,
      updated: hasLocalChanges || hasRemoteChanges,
      source: hasLocalChanges && hasRemoteChanges ? 'merged' : hasLocalChanges ? 'local' : hasRemoteChanges ? 'remote' : 'noop',
    };
  } catch (err: any) {
    return {
      success: false,
      notes: localNotes,
      updated: false,
      error: err?.message || 'Senkronizasyon hatası',
      source: 'noop',
    };
  }
}

// Global Auto-Sync Polling Interval
let autoSyncIntervalTimer: any = null;
let isSyncInProgress = false;

/**
 * Starts continuous background synchronization with Google Drive.
 * Automatically checks for updates on:
 * - Interval (every 25 seconds when tab is active)
 * - Window Focus (when user switches back from another app/device)
 * - Document Visibility Change (when user unlocks phone or opens tab)
 * - Network Reconnect (online event)
 */
export function startDriveAutoSync(
  onNotesUpdated: (notes: SimpleCardItem[]) => void,
  intervalMs = 25000
): () => void {
  stopDriveAutoSync();

  const performSyncCheck = async () => {
    if (isSyncInProgress) return;
    if (typeof navigator !== 'undefined' && !navigator.onLine) return;
    const token = getGoogleAccessToken();
    if (!token) return;

    isSyncInProgress = true;
    try {
      const { hasUpdate } = await checkGoogleDriveForUpdates();
      if (hasUpdate) {
        console.log("Google Drive'da yeni değişiklikler tespit edildi, senkronize ediliyor...");
        // Get local notes from storage
        let localNotes: SimpleCardItem[] = [];
        try {
          const raw = localStorage.getItem('notivia_local_notes');
          if (raw) localNotes = JSON.parse(raw);
        } catch {
          // ignore
        }

        const syncRes = await syncDatabaseWithDrive(localNotes);
        if (syncRes.success && syncRes.updated) {
          onNotesUpdated(syncRes.notes);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(
              new CustomEvent('notivia_drive_database_synced', {
                detail: { notes: syncRes.notes, source: syncRes.source },
              })
            );
          }
        }
      }
    } catch (err) {
      console.warn('Drive auto-sync kontrol uyarısı:', err);
    } finally {
      isSyncInProgress = false;
    }
  };

  // 1. Recurring timer
  autoSyncIntervalTimer = setInterval(performSyncCheck, intervalMs);

  // 2. Focus listener
  const handleFocus = () => {
    performSyncCheck();
  };

  // 3. Visibility change listener (phone unlock, tab switch)
  const handleVisibilityChange = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      performSyncCheck();
    }
  };

  // 4. Online reconnect listener
  const handleOnline = () => {
    performSyncCheck();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  // Initial check shortly after starting
  setTimeout(performSyncCheck, 1500);

  return () => {
    stopDriveAutoSync();
    if (typeof window !== 'undefined') {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleOnline);
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  };
}

export function stopDriveAutoSync(): void {
  if (autoSyncIntervalTimer) {
    clearInterval(autoSyncIntervalTimer);
    autoSyncIntervalTimer = null;
  }
}
