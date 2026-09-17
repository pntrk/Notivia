import { LocalNotifications, Channel } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import type { IntermediateCheck } from './fermentationEngine';
import { localNotifications } from './localNotifications';

export * from './localNotifications';

export async function scheduleFermentationAlarms(params: {
  noteId: string;
  urunAdi: string;
  ikon: string;
  startDate: Date;
  araKontrol?: IntermediateCheck;
  asamalar: { gun: number; baslik: string; aksiyon: string }[];
}) {
  if (!Capacitor.isNativePlatform()) return;

  const notificationsToSchedule: any[] = [];
  const baseNumericId = (localNotifications as any)['generateNumericId'](params.noteId);

  // 1. Ara Sıcaklık Kontrollerini Zamanla (3, 6, 9, 12. günler, saat 11:00)
  if (params.araKontrol) {
    const { herXGundeBir, bitisGunu, baslik, mesaj } = params.araKontrol;

    for (let gun = herXGundeBir; gun < bitisGunu; gun += herXGundeBir) {
      const checkDate = new Date(params.startDate.getTime() + gun * 24 * 60 * 60 * 1000);
      checkDate.setHours(11, 0, 0, 0); // Sabah 11:00'de hatırlat

      // Geçmiş bir tarih değilse plana al
      if (checkDate.getTime() > Date.now()) {
        notificationsToSchedule.push({
          id: baseNumericId + gun, // Benzersiz alt ID
          title: `${baslik} (${gun}. Gün)`,
          body: mesaj,
          schedule: { at: checkDate, allowWhileIdle: true },
          channelId: 'notivia_critical_alarms',
          smallIcon: 'ic_stat_alarm',
          extra: {
            parentNoteId: params.noteId,
            tip: 'ara_kontrol',
            gun
          }
        });
      }
    }
  }

  // 2. Ana Aşamaları Zamanla (14. Gün Şişeleme ve 28. Gün Olgunlaşma)
  params.asamalar.forEach((asama, idx) => {
    const targetDate = new Date(params.startDate.getTime() + asama.gun * 24 * 60 * 60 * 1000);
    targetDate.setHours(10, 0, 0, 0); // Sabah 10:00

    if (targetDate.getTime() > Date.now()) {
      notificationsToSchedule.push({
        id: baseNumericId + 100 + idx,
        title: `${params.ikon} ${asama.baslik}`,
        body: asama.aksiyon,
        schedule: { at: targetDate, allowWhileIdle: true },
        channelId: 'notivia_critical_alarms',
        smallIcon: 'ic_stat_alarm',
        extra: {
          parentNoteId: params.noteId,
          tip: 'ana_asama',
          gun: asama.gun
        }
      });
    }
  });

  if (notificationsToSchedule.length > 0) {
    try {
      await LocalNotifications.schedule({ notifications: notificationsToSchedule });
    } catch (err) {
      console.error('Fermantasyon bildirimleri kurulamadı:', err);
    }
  }
}

// Bir kiti sildiğinizde veya tamamladığınızda tüm alt alarmları temizleyen fonksiyon:
export async function cancelAllFermentationAlarms(noteId: string) {
  if (!Capacitor.isNativePlatform()) return;

  const baseNumericId = (localNotifications as any)['generateNumericId'](noteId);
  const idsToCancel: { id: number }[] = [];

  // Olası gün indeksleri (1-30 gün arası ve aşama ID'leri)
  for (let i = 1; i <= 30; i++) {
    idsToCancel.push({ id: baseNumericId + i });
  }
  for (let i = 100; i <= 105; i++) {
    idsToCancel.push({ id: baseNumericId + i });
  }

  try {
    await LocalNotifications.cancel({ notifications: idsToCancel });
  } catch (err) {
    console.warn('Fermantasyon alarmları iptal edilemedi:', err);
  }
}
