import { LocalNotifications, Channel } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

class LocalNotificationService {
  private channelId = 'notivia_critical_alarms';

  // String ID'leri Capacitor'ın zorunlu tuttuğu 32-bit pozitif integer ID'ye dönüştürür
  private generateNumericId(strId: string): number {
    let hash = 0;
    for (let i = 0; i < strId.length; i++) {
      hash = (hash << 5) - hash + strId.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // 1. İzinleri al ve yüksek öncelikli Android bildirim kanalını oluştur
  public async init() {
    if (!Capacitor.isNativePlatform()) return;

    try {
      const permission = await LocalNotifications.checkPermissions();
      if (permission.display !== 'granted') {
        await LocalNotifications.requestPermissions();
      }

      // 1. Kilit Ekranı Aksiyon Butonları (Action Types)
      await LocalNotifications.registerActionTypes({
        types: [
          {
            id: 'ALARM_ACTIONS',
            actions: [
              {
                id: 'snooze_5m',
                title: '⏱️ 5 Dk Ertele',
                foreground: false, // Uygulamayı öne getirmeden arka planda çöz
              },
              {
                id: 'dismiss',
                title: '✓ Durdur',
                destructive: true,
                foreground: false,
              },
            ],
          },
        ],
      });

      // 2. Bildirim Kanalı
      const alarmChannel: Channel = {
        id: this.channelId,
        name: 'Notivia Alarmlar ve Sayaçlar',
        description: 'Süresi dolan sayaç ve hatırlatıcı bildirimleri',
        importance: 5,
        visibility: 1,
        vibration: true,
        lights: true,
      };

      await LocalNotifications.createChannel(alarmChannel);
    } catch (err) {
      console.warn('Local Notification kanalı veya aksiyonları başlatılamadı:', err);
    }
  }

  // 2. Belirli bir zamana bildirim kur (Uygulama kapalıyken de çalar)
  public async scheduleAlarm(item: {
    id: string;
    baslik: string;
    tarih_iso: string;
    ikon?: string;
  }): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return false;

    try {
      const targetTime = new Date(item.tarih_iso);
      if (isNaN(targetTime.getTime()) || targetTime.getTime() <= Date.now()) {
        return false;
      }

      const notificationId = this.generateNumericId(item.id);

      await LocalNotifications.schedule({
        notifications: [
          {
            id: notificationId,
            title: `${item.ikon || '⏰'} Notivia`,
            body: item.baslik,
            schedule: {
              at: targetTime,
              allowWhileIdle: true,
            },
            channelId: this.channelId,
            actionTypeId: 'ALARM_ACTIONS', // <- Tanımladığımız aksiyon seti
            extra: {
              noteId: item.id,
              baslik: item.baslik,
              ikon: item.ikon || '⏰',
            },
          },
        ],
      });

      return true;
    } catch (err) {
      console.error('Bildirim planlanamadı:', err);
      return false;
    }
  }

  // 3. Görev tamamlandığında veya silindiğinde arka plan bildirimini iptal et
  public async cancelAlarm(noteId: string) {
    if (!Capacitor.isNativePlatform()) return;

    try {
      const notificationId = this.generateNumericId(noteId);
      await LocalNotifications.cancel({
        notifications: [{ id: notificationId }],
      });
    } catch (err) {
      console.warn('Bildirim iptal edilemedi:', err);
    }
  }
}

export const localNotifications = new LocalNotificationService();
