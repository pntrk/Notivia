/**
 * Notivia Cihaz Takvimi & Yerel Hatırlatıcı Entegrasyonu
 * iOS (Apple Takvim), Android (Google/Samsung Takvim), MacOS ve Windows cihaz takvimleriyle
 * RFC 5545 iCalendar standardında (.ics) doğrudan ve yerel bildirimlerle entegre çalışır.
 */

export interface CalendarEventData {
  title: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  location?: string;
}

/**
 * RFC 5545 uyumlu iCalendar (.ics) içeriği üretir.
 * İçerisinde cihazın yerel takviminde alarm (hatırlatıcı bildirimi) çalması için VALARM bloğu bulunur.
 */
export function generateIcsContent(event: CalendarEventData): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const formatIcsDate = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;

  const dtStart = formatIcsDate(event.startDate);
  const end = event.endDate || new Date(event.startDate.getTime() + 60 * 60 * 1000);
  const dtEnd = formatIcsDate(end);
  const dtStamp = formatIcsDate(new Date());
  const uid = `notivia_${Date.now()}_${Math.random().toString(36).slice(2, 9)}@notivia.app`;
  const cleanSummary = (event.title || 'Notivia Hatırlatıcı').replace(/\n/g, ' ');
  const cleanDesc = (event.description || 'Notivia Bilişsel Yaşam Asistanı Hatırlatıcısı').replace(/\n/g, '\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Notivia//Bilisel Yasam Asistani//TR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${cleanSummary}`,
    `DESCRIPTION:${cleanDesc}`,
    event.location ? `LOCATION:${event.location}` : '',
    'STATUS:CONFIRMED',
    // 15 dakika önce cihazda çalacak hatırlatıcı alarm
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    `DESCRIPTION:Hatırlatıcı: ${cleanSummary}`,
    'END:VALARM',
    // Etkinlik anında çalacak ikinci alarm
    'BEGIN:VALARM',
    'TRIGGER:PT0M',
    'ACTION:DISPLAY',
    `DESCRIPTION:Şimdi: ${cleanSummary}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}

/**
 * Cihazın yerel takvimine (.ics dosyası olarak) tek dokunuşla kaydetmesini sağlar.
 * iOS (iPhone/iPad Safari/Chrome), Android ve Masaüstü takvim uygulamasını doğrudan tetikler.
 */
export function downloadIcsFile(filename: string, icsContent: string): void {
  try {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = filename.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'hatirlatma';
    link.setAttribute('download', `${safeName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } catch (err) {
    console.error('Cihaz takvimi dosyası oluşturulamadı:', err);
  }
}

/**
 * Google Takvim Web Intent linki üretir (Herhangi bir tarayıcıda doğrudan Google Takvim'i açar)
 */
export function getGoogleCalendarWebUrl(event: CalendarEventData): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const formatUtc = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

  const end = event.endDate || new Date(event.startDate.getTime() + 60 * 60 * 1000);
  const dates = `${formatUtc(event.startDate)}/${formatUtc(end)}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates,
    details: event.description || 'Notivia Bilişsel Yaşam Asistanı Hatırlatıcısı',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Kullanıcı cihazının yerel takvimine ekleme aksiyonunu çalıştırır.
 */
export function exportToDeviceCalendar(event: CalendarEventData): void {
  const ics = generateIcsContent(event);
  downloadIcsFile(event.title, ics);
}

// Tarayıcı Bildirimi & Sesli Alarm Yönetimi
const activeTimers: Map<string, number> = new Map();

/**
 * Tarayıcı / Cihaz bildirim izni ister
 */
export async function requestDeviceNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }
  if (Notification.permission === 'granted') {
    return true;
  }
  if (Notification.permission !== 'denied') {
    const perm = await Notification.requestPermission();
    return perm === 'granted';
  }
  return false;
}

/**
 * Belirtilen tarih için yerel cihaz bildirim alarmı kurar.
 * PWA Service Worker desteği varsa showNotification ile sistem bildirim tepsisine gönderir,
 * ayrıca periyodik hatırlatıcılar için sonraki döngüyü otomatik kurar.
 */
export function scheduleLocalDeviceReminder(
  id: string,
  title: string,
  targetDateIso: string,
  icon: string = '📌',
  periyodik?: {
    tip: string;
    aralik_gun?: number;
    bir_sonraki_tarih_iso?: string;
  } | null,
  onRecurringTrigger?: (nextIso: string) => void
): void {
  if (typeof window === 'undefined') return;

  const target = new Date(targetDateIso);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();

  // Geçmiş bir tarihse hatırlatıcı kurma
  if (diffMs <= 0) return;

  // Mevcut eski zamanlayıcıyı temizle
  if (activeTimers.has(id)) {
    window.clearTimeout(activeTimers.get(id));
    activeTimers.delete(id);
  }

  // Maksimum 24 güne kadar setTimeout güvenle çalışır (~2 milyar ms)
  if (diffMs > 24 * 24 * 60 * 60 * 1000) return;

  const timerId = window.setTimeout(async () => {
    // 1. Ses çal
    playNotificationChime();

    // 2. Sistem / Cihaz Bildirimi gönder (ServiceWorker ve Notification)
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notifTitle = `${icon} ${title}`;
        const notifBody = periyodik?.tip === 'aylik_son_hafta'
          ? 'Notivia: Ay sonu toplantı zamanı geldi! Ajandanızı kontrol edin.'
          : 'Notivia: Hatırlatma zamanı geldi!';

        // ServiceWorker Registration üzerinden bildirim göster (PWA mobil cihazlarda arka planda daha güvenilirdir)
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.ready.catch(() => null);
          if (reg && reg.showNotification) {
            reg.showNotification(notifTitle, {
              body: notifBody,
              icon: '/pwa-192x192.png',
              badge: '/pwa-192x192.png',
              tag: id,
              renotify: true,
              data: { url: '/' },
            } as any);
          } else {
            new Notification(notifTitle, {
              body: notifBody,
              icon: '/pwa-192x192.png',
              tag: id,
            });
          }
        } else {
          new Notification(notifTitle, {
            body: notifBody,
            icon: '/pwa-192x192.png',
            tag: id,
          });
        }
      } catch (err) {
        console.warn('Bildirim açılamadı:', err);
      }
    }

    activeTimers.delete(id);

    // 3. Periyodik döngü varsa otomatik sonraki ay / hafta hatırlatıcısını kur
    if (periyodik) {
      const nowNext = new Date();
      let nextDate: Date;
      if (periyodik.tip === 'aylik_son_hafta') {
        // Gelecek ayın son Cuma gününü hesapla
        let nextM = nowNext.getMonth() + 1;
        let nextY = nowNext.getFullYear();
        if (nextM > 11) {
          nextM = 0;
          nextY += 1;
        }
        const lastDay = new Date(nextY, nextM + 1, 0);
        const dayOfWeek = lastDay.getDay();
        let offset = 0;
        if (dayOfWeek === 5) offset = 0;
        else if (dayOfWeek === 6) offset = 1;
        else offset = (dayOfWeek + 2) % 7;

        nextDate = new Date(nextY, nextM, lastDay.getDate() - offset, 10, 0, 0, 0);
      } else {
        const addDays = periyodik.aralik_gun || 30;
        nextDate = new Date(nowNext.getTime() + addDays * 24 * 60 * 60 * 1000);
      }

      const nextIso = nextDate.toISOString();
      console.log(`Periyodik hatırlatıcı bir sonraki döneme kuruldu: ${nextIso}`);
      scheduleLocalDeviceReminder(id, title, nextIso, icon, periyodik, onRecurringTrigger);
      if (onRecurringTrigger) {
        onRecurringTrigger(nextIso);
      }
    }
  }, diffMs);

  activeTimers.set(id, timerId);
}

/**
 * Hatırlatıcı alarm zili (Web Audio API ile harici ses dosyasına gerek olmadan üretilen berrak zil tonu)
 */
export function playNotificationChime(): void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(440, now); // A4
    osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.85);
    osc2.stop(now + 0.85);
  } catch {
    // Ses desteği yoksa sessizce geç
  }
}
