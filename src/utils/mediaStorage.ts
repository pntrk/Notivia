// IndexedDB Kurulumu (NotiviaMediaDB)
const DB_NAME = 'NotiviaMediaDB';
const DB_VERSION = 1;
const STORE_NAME = 'media';

function getDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB is not supported in this environment'));
    }

    const req = window.indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    req.onsuccess = () => {
      resolve(req.result);
    };

    req.onerror = () => {
      reject(req.error);
    };
  });
}

// Initial setup check
if (typeof window !== 'undefined' && 'indexedDB' in window) {
  try {
    const initReq = window.indexedDB.open(DB_NAME, DB_VERSION);
    initReq.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  } catch (err) {
    console.warn('IndexedDB initialization notice:', err);
  }
}

export async function saveLocalMedia(id: string, base64Data: string): Promise<void> {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put({ id, data: base64Data });

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getLocalMedia(id: string): Promise<string | null> {
  try {
    const db = await getDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);

      req.onsuccess = () => {
        resolve(req.result?.data || null);
      };
      req.onerror = () => {
        resolve(null);
      };
    });
  } catch (err) {
    console.warn('getLocalMedia error:', err);
    return null;
  }
}

export async function deleteLocalMedia(id: string): Promise<void> {
  try {
    const db = await getDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

export function compressImage(file: File | Blob, maxWidth: number = 800): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const elem = document.createElement("canvas");
        const scaleFactor = maxWidth / img.width;
        elem.width = scaleFactor < 1 ? maxWidth : img.width;
        elem.height = scaleFactor < 1 ? img.height * scaleFactor : img.height;
        const ctx = elem.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, elem.width, elem.height);
          // %70 kalite JPEG base64 çıktısı
          resolve(elem.toDataURL("image/jpeg", 0.7));
        } else {
          resolve(event.target?.result as string);
        }
      };
    };
  });
}

export async function parseWithAIAndImage(text?: string, base64Image: string | null = null): Promise<any> {
  const now = new Date().toISOString();
  const apiKey = (window as any).GEMINI_API_KEY;

  if (apiKey) {
    const promptText = `Sen "Notivia" uygulamasının bilişsel zeka motorusun. Sadece söylenen kelimeleri değil, söylenmeyen hazırlık ihtiyaçlarını ve tersine zamanlamayı ("leb demeden leblebiyi") çözümlersin.

TEMEL GÖREVLER VE AKIL YÜRÜTME:
1. Niyet ve Özne Analizi:
   - 3. şahıs bildirimleri ("bakan gelecek", "okul tatil", "elektrik kesilecek") kullanıcı için doğrudan takip ve hazırlık görevidir.
   - Pasif haberleri veya görsel duyuruları kullanıcının etkileneceği aksiyona dönüştür.

2. Tersine Zamanlama (Inverted Scheduling):
   - Her randevu, resmi ziyaret, sınav, seyahat veya kontrol öncesinde bir "ön hazırlık" gerekir.
   - Etkinlik Cuma sabahı ise hazırlık hatırlatıcısını Perşembe 16:00'ya; sabah erken uçuş varsa hazırlık uyarısını önceki akşam 20:00'ye kur.

3. Referans Zaman (CURRENT_DATETIME):
   - Sağlanan referans zamana göre gün ve saatleri kesin ISO-8601 biçiminde hesapla: ${now}.

Kullanıcı girdisi / Görsel: "${text || 'Görseldeki durumu veya duyuruyu analiz et ve yapılması gereken takip/etkinlik ve ön hazırlık işini çıkar.'}".

ÇIKTI ŞEMASI (Katı JSON):
{
  "baslik": "Kısa eylem başlığı (max 4 kelime)",
  "zaman": "Kullanıcıya görünecek sade zaman (örn: Cuma 09:00)",
  "tarih_iso": "Etkinliğin kesin tarihi (ISO-8601)",
  "hazirlik_zamani": "Ön hazırlık zamanı (örn: Perşembe 16:00 hazırlık uyarısı)",
  "hazirlik_iso": "Takvim/bildirim için hazırlık tarihi (ISO-8601)",
  "ikon": "Temsili tek emoji",
  "renk": "Pastel HEX kodu"
}`;

    const parts: any[] = [{ text: promptText }];

    if (base64Image) {
      const cleanBase64 = base64Image.includes(",") ? base64Image.split(",")[1] : base64Image;
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: cleanBase64
        }
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const resJson = await response.json();
    return JSON.parse(resJson.candidates[0].content.parts[0].text);
  }

  // Fallback to secure backend proxy endpoint
  const response = await fetch('/api/parse-simple', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: text || '',
      base64Image: base64Image || null,
      current_datetime: now,
    }),
  });

  const resJson = await response.json();
  if (resJson.success && resJson.data) {
    return resJson.data;
  }
  throw new Error(resJson.error || 'Ayrıştırma hatası.');
}

// Global window bindings for user requests and console interactions
if (typeof window !== 'undefined') {
  (window as any).saveLocalMedia = saveLocalMedia;
  (window as any).getLocalMedia = getLocalMedia;
  (window as any).deleteLocalMedia = deleteLocalMedia;
  (window as any).compressImage = compressImage;
  (window as any).parseWithAIAndImage = parseWithAIAndImage;
}
