// Google Drive Notes Backup & Sync Service
// Notes are stored directly in the user's personal Google Drive account.
// No user notes are stored in Firebase or any central database.

import { getGoogleAccessToken } from '../firebase';
import type { SimpleCardItem } from '../App';

const BACKUP_FILE_NAME = 'notivia_backup.json';
const BACKUP_MIME_TYPE = 'application/json';

export interface DriveSyncResult {
  success: boolean;
  fileId?: string;
  notes?: SimpleCardItem[];
  error?: string;
}

/**
 * Searches for the existing Notivia backup file in the user's Google Drive.
 */
async function findBackupFile(token: string): Promise<string | null> {
  try {
    const query = encodeURIComponent(`name = '${BACKUP_FILE_NAME}' and trashed = false`);
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,modifiedTime)&spaces=drive`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.warn('Drive dosya arama hatası:', res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
    return null;
  } catch (err) {
    console.warn('Drive findBackupFile hatası:', err);
    return null;
  }
}

/**
 * Loads notes backup from the user's personal Google Drive account.
 */
export async function loadNotesFromGoogleDrive(): Promise<DriveSyncResult> {
  const token = getGoogleAccessToken();
  if (!token) {
    return { success: false, error: 'Google Access Token bulunamadı' };
  }

  try {
    const fileId = await findBackupFile(token);
    if (!fileId) {
      // No existing backup file in Google Drive yet
      return { success: true, notes: [] };
    }

    const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    const res = await fetch(downloadUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return { success: false, error: `Drive okuma hatası: ${res.status}` };
    }

    const content = await res.json();
    if (Array.isArray(content)) {
      return { success: true, fileId, notes: content };
    } else if (content && Array.isArray(content.notes)) {
      return { success: true, fileId, notes: content.notes };
    }

    return { success: true, fileId, notes: [] };
  } catch (err: any) {
    console.error('Google Drive’dan notlar yüklenemedi:', err);
    return { success: false, error: err?.message || 'Bilinmeyen hata' };
  }
}

/**
 * Backs up notes directly to the user's Google Drive account.
 * Updates the existing file if present, or creates a new one using multipart upload.
 */
export async function saveNotesToGoogleDrive(notes: SimpleCardItem[]): Promise<DriveSyncResult> {
  const token = getGoogleAccessToken();
  if (!token) {
    return { success: false, error: 'Google Access Token bulunamadı' };
  }

  try {
    const fileId = await findBackupFile(token);
    const content = JSON.stringify(
      {
        appName: 'Notivia',
        version: '1.0',
        lastBackup: new Date().toISOString(),
        notesCount: notes.length,
        notes,
      },
      null,
      2
    );

    if (fileId) {
      // Update existing file content
      const uploadUrl = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;
      const res = await fetch(uploadUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': BACKUP_MIME_TYPE,
        },
        body: content,
      });

      if (!res.ok) {
        return { success: false, error: `Drive güncelleme hatası: ${res.status}` };
      }

      const data = await res.json();
      return { success: true, fileId: data.id, notes };
    } else {
      // Create a new backup file in user's Drive using multipart upload
      const metadata = {
        name: BACKUP_FILE_NAME,
        mimeType: BACKUP_MIME_TYPE,
        description: 'Notivia Kişisel Not Yedeklemesi',
      };

      const boundary = '-------314159265358979323846';
      const delimiter = `\r\n--${boundary}\r\n`;
      const closeDelimiter = `\r\n--${boundary}--`;

      const multipartRequestBody =
        delimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        `Content-Type: ${BACKUP_MIME_TYPE}\r\n\r\n` +
        content +
        closeDelimiter;

      const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      });

      if (!res.ok) {
        return { success: false, error: `Drive dosya oluşturma hatası: ${res.status}` };
      }

      const data = await res.json();
      return { success: true, fileId: data.id, notes };
    }
  } catch (err: any) {
    console.error('Google Drive yedekleme hatası:', err);
    return { success: false, error: err?.message || 'Bilinmeyen hata' };
  }
}
