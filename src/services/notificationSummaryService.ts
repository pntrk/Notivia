// src/services/notificationSummaryService.ts
import type { SimpleCardItem } from '../App';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export interface SummaryCheckResult {
  hasNewSummary: boolean;
  newCard?: SimpleCardItem;
  summarizedCount: number;
  message?: string;
}

const LAST_SUMMARY_DATE_KEY = 'notivia_last_evening_summary_date';
const EVENING_ALARM_SCHEDULED_KEY = 'notivia_evening_alarm_scheduled_date';
const SUMMARY_ALARM_ID = 882000; // Saat 20:00 özetleme bildirim ID'si

/**
 * Kullanıcının Notivia içindeki yerel görev ve hatırlatma kartlarını analiz ederek
 * tamamen cihaz içi, güvenli ve mahremiyete saygılı bir akşam özeti üretir.
 * Dış uygulamaların veya bankacılık verilerinin iznini TALEP ETMEZ.
 */
export function buildDailyTasksSummary(cards: SimpleCardItem[]): {
  baslik: string;
  zaman: string;
  action_items: { task: string; is_completed: boolean }[];
  anomali_notu: string;
  ikon: string;
  renk: string;
} {
  const completedTasks: string[] = [];
  const pendingTasks: string[] = [];

  for (const card of cards) {
    if (card.id.startsWith('evening_summary_')) continue; // Önceki özetleri dahil etme

    if (card.tamamlandi) {
      completedTasks.push(card.baslik);
    } else {
      pendingTasks.push(card.baslik);
    }

    // Alt görevleri de kontrol et
    if (card.action_items && Array.isArray(card.action_items)) {
      for (const item of card.action_items) {
        if (item.is_completed) {
          completedTasks.push(item.task);
        } else {
          pendingTasks.push(item.task);
        }
      }
    }
  }

  const actionItems: { task: string; is_completed: boolean }[] = [];

  if (completedTasks.length > 0) {
    actionItems.push({
      task: `✅ Bugün tamamlanan ${completedTasks.length} görev arşivlendi`,
      is_completed: true,
    });
  }

  if (pendingTasks.length > 0) {
    // En fazla 3 açık görevi listele
    const topPending = pendingTasks.slice(0, 3);
    for (const p of topPending) {
      actionItems.push({
        task: `📌 ${p}`,
        is_completed: false,
      });
    }
    if (pendingTasks.length > 3) {
      actionItems.push({
        task: `📋 Kalan ${pendingTasks.length - 3} açık maddeye göz at`,
        is_completed: false,
      });
    }
  } else {
    actionItems.push({
      task: '✨ Bugün için bekleyen açık görev kalmadı. Harika bir gün!',
      is_completed: true,
    });
  }

  const anomali_notu = pendingTasks.length > 0
    ? `🌙 Günün görevleri toparlandı. Yarın için ${pendingTasks.length} açık madde hazır bekliyor.`
    : `🌿 Günlük hedefleriniz tamamlandı. Sakin ve dinlendirici bir akşam dileriz.`;

  return {
    baslik: 'Günün Akşam Özeti',
    zaman: 'Bugün 20:00',
    action_items: actionItems,
    anomali_notu,
    ikon: '✨',
    renk: '#FEF9C3', // Dinlendirici pastel ton
  };
}

/**
 * Saat 20:00 kontrolü ve akşam görev özetini çalıştıran ana fonksiyon.
 * Tamamen yerel çalışır, sıfır hassas veri izni.
 */
export async function checkAndRunEveningNotificationSummary(options?: {
  forceRun?: boolean;
  onNewSummaryCard?: (card: SimpleCardItem) => void;
}): Promise<SummaryCheckResult> {
  const now = new Date();
  const currentHour = now.getHours();
  const todayStr = now.toISOString().split('T')[0];

  const lastSummaryDate = localStorage.getItem(LAST_SUMMARY_DATE_KEY);

  // forceRun değilse:
  // 1. Saat 20:00 veya sonrası mı?
  // 2. Bugün henüz özet çıkarılmadı mı?
  if (!options?.forceRun) {
    if (currentHour < 20) {
      return { hasNewSummary: false, summarizedCount: 0, message: 'Saat henüz 20:00 olmadı.' };
    }
    if (lastSummaryDate === todayStr) {
      return { hasNewSummary: false, summarizedCount: 0, message: 'Bugünün akşam özeti zaten hazırlandı.' };
    }
  }

  try {
    // Yerel kartları localStorage üzerinden oku
    let localCards: SimpleCardItem[] = [];
    try {
      const raw = localStorage.getItem('notivia_local_notes');
      if (raw) {
        localCards = JSON.parse(raw);
      }
    } catch {
      localCards = [];
    }

    const summaryData = buildDailyTasksSummary(localCards);
    const newCardId = `evening_summary_${Date.now()}`;
    const nowIso = now.toISOString();

    const newCard: SimpleCardItem = {
      id: newCardId,
      baslik: summaryData.baslik,
      zaman: summaryData.zaman,
      tarih_iso: nowIso,
      action_items: summaryData.action_items,
      anomali_notu: summaryData.anomali_notu,
      ikon: summaryData.ikon,
      renk: summaryData.renk,
      createdAt: nowIso,
      tamamlandi: false,
      deviceNotificationEnabled: true,
    };

    // Son özet tarihini kaydet
    localStorage.setItem(LAST_SUMMARY_DATE_KEY, todayStr);

    // Cihaz yerel standart bildirim gönder (kullanıcıya akşam özeti hazır haberi ver)
    if (Capacitor.isNativePlatform()) {
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              id: SUMMARY_ALARM_ID + 1,
              title: '✨ Günün Akşam Özeti',
              body: summaryData.anomali_notu,
              channelId: 'notivia_critical_alarms',
              schedule: { at: new Date(Date.now() + 500) },
            },
          ],
        });
      } catch (err) {
        console.warn('Özet hazır bildirimi gönderilemedi:', err);
      }
    }

    if (options?.onNewSummaryCard) {
      options.onNewSummaryCard(newCard);
    }

    return {
      hasNewSummary: true,
      newCard,
      summarizedCount: summaryData.action_items.length,
      message: 'Günün akşam özeti başarıyla hazırlandı.',
    };
  } catch (error: any) {
    console.error('Akşam özetleme hatası:', error);
    return {
      hasNewSummary: false,
      summarizedCount: 0,
      message: `Hata: ${error?.message || error}`,
    };
  }
}

/**
 * Her gün saat 20:00 için cihaz yerel alarmını planlar.
 * Tamamen yerel, standart bildirim mekanizması kullanır.
 */
export async function scheduleDaily2000EveningReminder() {
  if (!Capacitor.isNativePlatform()) return;

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const lastScheduledDate = localStorage.getItem(EVENING_ALARM_SCHEDULED_KEY);

  if (lastScheduledDate === todayStr) {
    return; // Bugün için zaten planlandı
  }

  const targetDate = new Date();
  targetDate.setHours(20, 0, 0, 0);

  // Eğer bugün saat 20:00 çoktan geçmişse, yarına kur
  if (targetDate.getTime() <= now.getTime()) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: SUMMARY_ALARM_ID,
          title: '✨ Günün Akşam Özeti',
          body: 'Bugünkü görevlerinizi toparlamak ve yarının planını görmek için dokunun.',
          schedule: {
            at: targetDate,
            allowWhileIdle: true,
          },
          channelId: 'notivia_critical_alarms',
          extra: {
            action: 'OPEN_EVENING_SUMMARY',
          },
        },
      ],
    });

    localStorage.setItem(EVENING_ALARM_SCHEDULED_KEY, todayStr);
    console.log(`[Notivia] Saat 20:00 Akşam Özeti alarmı kuruldu: ${targetDate.toLocaleString()}`);
  } catch (e) {
    console.warn('[Notivia] 20:00 alarmı planlanamadı:', e);
  }
}
