import { registerPlugin } from '@capacitor/core';

export interface AndroidNotificationRecord {
  id: number;
  timestamp: number;
  packageName: string;
  title: string;
  body: string;
  isSummarized: number;
}

export interface GetUnsummarizedNotificationsResult {
  notifications: AndroidNotificationRecord[];
  count: number;
}

export interface MarkAsSummarizedOptions {
  ids: number[];
}

export interface MarkAsSummarizedResult {
  updatedCount: number;
}

export interface NotiviaPluginInterface {
  /**
   * Android yerel SQLite veritabanından henüz özetlenmemiş (is_summarized == 0)
   * tüm bildirimleri getirir.
   */
  getUnsummarizedNotifications(): Promise<GetUnsummarizedNotificationsResult>;

  /**
   * Verilen ID'lere sahip bildirimleri özetlendi (is_summarized = 1) olarak işaretler.
   */
  markAsSummarized(options: MarkAsSummarizedOptions): Promise<MarkAsSummarizedResult>;
}

/**
 * Notivia Capacitor Özel Eklentisi (Custom Plugin)
 * Web ortamında çalışırken fallback olarak boş liste döndürür.
 */
export const NotiviaPlugin = registerPlugin<NotiviaPluginInterface>('NotiviaPlugin', {
  web: () => ({
    getUnsummarizedNotifications: async () => ({
      notifications: [],
      count: 0
    }),
    markAsSummarized: async () => ({
      updatedCount: 0
    })
  })
});
