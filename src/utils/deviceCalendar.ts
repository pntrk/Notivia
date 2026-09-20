/**
 * Notivia Cihaz Takvimi & Yerel Hatırlatıcı Entegrasyonu
 * iOS (Apple Takvim), Android (Google/Samsung Takvim), MacOS ve Windows cihaz takvimleriyle
 * RFC 5545 iCalendar standardında (.ics) doğrudan ve yerel bildirimlerle entegre çalışır.
 */

import { alarmSound } from './alarmSound';

export interface CalendarEventData {
  title: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  location?: string;
  rrule?: string;
}

/**
 * RFC 5545 uyumlu iCalendar (.ics) içeriği üretir.
 * İçerisinde cihazın yerel takviminde alarm (hatırlatıcı bildirimi) çalması için VALARM bloğu bulunur.
 */
export function generateIcsContent(event: CalendarEventData): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const formatIcsDate = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

  const dtStart = formatIcsDate(event.startDate);
  const end = event.endDate || new Date(event.startDate.getTime() + 60 * 60 * 1000);
  const dtEnd = formatIcsDate(end);
  const dtStamp = formatIcsDate(new Date());
  const uid = `notivia_${Date.now()}_${Math.random().toString(36).slice(2, 9)}@notivia.app`;
  const cleanSummary = (event.title || 'Notivia Hatırlatıcı').replace(/[\r\n]+/g, ' ');
  const cleanDesc = (event.description || 'Notivia Bilişsel Yaşam Asistanı Hatırlatıcısı').replace(/[\r\n]+/g, '\\n');

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
    event.rrule ? `RRULE:${event.rrule}` : '',
    `SUMMARY:${cleanSummary}`,
    `DESCRIPTION:${cleanDesc}`,
    event.location ? `LOCATION:${event.location}` : '',
    'STATUS:CONFIRMED',
    // 15 dakika önce cihazda çalacak hatırlatıcı alarm
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    `DESCRIPTION:Hatırlatma: ${cleanSummary}`,
    'X-APPLE-DEFAULT-ALARM:TRUE',
    'END:VALARM',
    // Etkinlik anında çalacak ikinci alarm
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:AUDIO',
    'ATTACH;VALUE=URI:Chord',
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
 * Google Takvim Web / Mobil Uygulama Intent linki üretir.
 * Mobil cihazlarda (Android / iOS) yüklü Google Takvim uygulamasını doğrudan açar.
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
  if (event.location) {
    params.set('location', event.location);
  }
  if (event.rrule) {
    params.set('recur', `RRULE:${event.rrule}`);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Cihazın yerel takvimine (Apple Takvim, Samsung Takvim, Xiaomi Takvim vb.) 
 * RFC 5545 .ics takvim verisiyle otomatik ve doğrudan aktarır.
 * iOS'ta yerel takvim sayfasını, Android ve masaüstünde ise doğrudan takvim aktarımını tetikler.
 */
export function openDirectDeviceCalendar(event: CalendarEventData): void {
  if (typeof window === 'undefined') return;

  const ics = generateIcsContent(event);
  const safeTitle = (event.title || 'etkinlik').replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ_-]/g, '_').slice(0, 30);
  downloadIcsFile(`${safeTitle}.ics`, ics);
}

/**
 * Google Takvim mobil uygulamasına veya web arayüzüne tek dokunuşla otomatik yönlendirir.
 */
export function openGoogleCalendarApp(event: CalendarEventData): void {
  if (typeof window === 'undefined') return;
  const webUrl = getGoogleCalendarWebUrl(event);
  
  // Yeni sekmede veya mobil sistem intentinde aç
  const newWin = window.open(webUrl, '_blank', 'noopener,noreferrer');
  if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
    window.location.href = webUrl;
  }
}

/**
 * Kullanıcı cihazının yerel takvimine ekleme aksiyonunu çalıştırır.
 * Öncelikli olarak dosya indirmeden cihaz takvimine doğrudan aktarır.
 */
export function exportToDeviceCalendar(event: CalendarEventData): void {
  openDirectDeviceCalendar(event);
}

// Tarayıcı Bildirimi & Sesli Alarm Yönetimi
const activeTimers: Map<string, number> = new Map();

/**
 * Tarayıcı / Cihaz bildirim izni ister
 */
export async function requestDeviceNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }
  if (!('Notification' in window)) {
    return false;
  }
  if (Notification.permission === 'granted') {
    return true;
  }
  if (Notification.permission === 'denied') {
    return false;
  }

  try {
    // iframe içinde bazı tarayıcılar requestPermission çağrısında hata fırlatabilir
    const req = Notification.requestPermission();
    let perm: NotificationPermission;
    if (req && typeof req.then === 'function') {
      perm = await req;
    } else {
      perm = await new Promise<NotificationPermission>((resolve) => {
        Notification.requestPermission((p) => resolve(p));
      });
    }
    return perm === 'granted';
  } catch (err) {
    console.warn('Tarayıcı bildirim izni istenirken kısıtlandı (muhtemelen iframe ortamı):', err);
    return false;
  }
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
  onRecurringTrigger?: (nextIso: string) => void,
  isAlarm?: boolean
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
    const notifTitle = `${icon} ${title}`;
    const notifBody = periyodik?.tip === 'aylik_son_hafta'
      ? 'Notivia: Ay sonu toplantı zamanı geldi! Ajandanızı kontrol edin.'
      : (isAlarm ? 'Notivia: Alarm zamanı geldi!' : 'Notivia: Hatırlatma zamanı geldi!');

    // 1. Ses çal / Alarm başlat
    if (isAlarm) {
      alarmSound.startAlarm();
    } else {
      playNotificationChime();
    }

    // Uygulama içi bildirim olayını tetikle
    try {
      window.dispatchEvent(
        new CustomEvent('notivia_notification', {
          detail: {
            title: notifTitle,
            body: notifBody,
            icon,
            isAlarm: !!isAlarm,
          },
        })
      );
    } catch {
      // ignore
    }

    // 2. Sistem / Cihaz Bildirimi gönder (ServiceWorker ve Notification)
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
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
 * Bellekteki tüm zamanlanmış zamanlayıcıları temizler (Örn: bildirimler kapatıldığında)
 */
export function clearAllScheduledReminders(): void {
  activeTimers.forEach((timerId) => window.clearTimeout(timerId));
  activeTimers.clear();
}

/**
 * Belirli bir nota ait zamanlayıcıyı iptal eder
 */
export function cancelScheduledReminder(id: string): boolean {
  if (activeTimers.has(id)) {
    window.clearTimeout(activeTimers.get(id));
    activeTimers.delete(id);
    return true;
  }
  return false;
}

/**
 * Belirli bir kart için aktif zamanlayıcı olup olmadığını kontrol eder
 */
export function isReminderScheduled(id: string): boolean {
  return activeTimers.has(id);
}

export interface SystemNotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  silent?: boolean;
  isAlarm?: boolean;
  data?: any;
}

/**
 * Sistem bildirimi gösterir (PWA Service Worker veya standart Notification API)
 * Ayrıca uygulama içi bildirim olayını ve sesli alarmı her durumda tetikler.
 */
export async function showSystemNotification(options: SystemNotificationOptions): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  if (!options.silent) {
    if (options.isAlarm) {
      alarmSound.startAlarm();
    } else {
      playNotificationChime();
    }
  }

  // Uygulama içi bildirim dinleyicilerine her durumda bildirim objesini ilet
  try {
    window.dispatchEvent(new CustomEvent('notivia_notification', { detail: options }));
  } catch {
    // ignore
  }

  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return false;
  }

  const iconUrl = options.icon || '/icon.svg';
  const badgeUrl = options.badge || '/icon.svg';

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready.catch(() => null);
      if (reg && reg.showNotification) {
        await reg.showNotification(options.title, {
          body: options.body,
          icon: iconUrl,
          badge: badgeUrl,
          tag: options.tag || `notivia-${Date.now()}`,
          renotify: true,
          data: options.data || { url: '/' },
        } as any);
        return true;
      }
    }

    new Notification(options.title, {
      body: options.body,
      icon: iconUrl,
      tag: options.tag || `notivia-${Date.now()}`,
    });
    return true;
  } catch (err) {
    console.warn('Sistem bildirimi gösterilirken hata:', err);
    return false;
  }
}

/**
 * Kullanıcının mevcut tüm kartlarındaki ileri tarihli randevu, periyodik görev ve hazırlık alarmlarını sisteme kurar.
 */
export function scheduleAllCardReminders(cards: any[]): number {
  if (!Array.isArray(cards) || typeof window === 'undefined') return 0;

  let scheduledCount = 0;
  const now = Date.now();

  for (const card of cards) {
    if (!card || card.tamamlandi) continue;

    // 1. Ana randevu / etkinlik alarmı
    if (card.tarih_iso) {
      const targetTime = new Date(card.tarih_iso).getTime();
      if (targetTime > now) {
        scheduleLocalDeviceReminder(
          card.id,
          card.baslik || 'Hatırlatıcı',
          card.tarih_iso,
          card.ikon || '📌',
          card.periyodik || null,
          undefined,
          !!card.isAlarm
        );
        scheduledCount++;
      }
    }

    // 2. Ön hazırlık alarmı (Tersine takvim planlaması)
    if (card.hazirlik_iso) {
      const prepTime = new Date(card.hazirlik_iso).getTime();
      if (prepTime > now) {
        const prepId = `${card.id}_prep`;
        const prepTitle = `Ön Hazırlık: ${card.baslik || 'Görev'}`;
        scheduleLocalDeviceReminder(
          prepId,
          prepTitle,
          card.hazirlik_iso,
          '⏳',
          null
        );
        scheduledCount++;
      }
    }
  }

  return scheduledCount;
}

/**
 * Bilişsel Asistan: Günün randevu ve bekleyen görevlerini özetleyen anlık bildirim gönderir.
 */
export async function triggerDailyAssistantSummary(
  cards: any[],
  language: 'tr' | 'en' = 'tr'
): Promise<boolean> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayCards = (cards || []).filter((c) => {
    if (!c || c.tamamlandi) return false;
    if (c.tarih_iso) {
      const d = new Date(c.tarih_iso);
      return d >= today && d < tomorrow;
    }
    return false;
  });

  if (todayCards.length === 0) {
    return showSystemNotification({
      title: language === 'tr' ? '✨ Notivia Bilişsel Asistan' : '✨ Notivia Cognitive Assistant',
      body: language === 'tr'
        ? 'Bugün için bekleyen planlanmış randevunuz bulunmuyor. Harika bir gün dileriz!'
        : 'You have no pending scheduled appointments for today. Have a productive day!',
      tag: 'notivia-daily-summary',
    });
  }

  const firstTitles = todayCards
    .slice(0, 2)
    .map((c) => c.baslik)
    .join(', ');
  const moreText = todayCards.length > 2 ? ` (+${todayCards.length - 2})` : '';
  const bodyText = language === 'tr'
    ? `Bugün ajandanızda ${todayCards.length} plan var: ${firstTitles}${moreText}`
    : `You have ${todayCards.length} scheduled items today: ${firstTitles}${moreText}`;

  return showSystemNotification({
    title: language === 'tr' ? '📋 Notivia: Günün Ajandası' : "📋 Notivia: Today's Schedule",
    body: bodyText,
    tag: 'notivia-daily-summary',
  });
}

/**
 * Bildirim mekanizmasını test etmek için anlık asistan uyarısı gönderir.
 */
export async function testAssistantNotification(language: 'tr' | 'en' = 'tr'): Promise<boolean> {
  return showSystemNotification({
    title: language === 'tr' ? '🔔 Notivia Bildirimleri Aktif' : '🔔 Notivia Notifications Active',
    body: language === 'tr'
      ? 'Harika! Cihaz bildirimleriniz sorunsuz çalışıyor. Randevularınız ve ön hazırlık adımlarınız vakti gelince hatırlatılacak.'
      : 'Great! Device notifications are working smoothly. Your appointments and preparation tasks will alert on time.',
    tag: 'notivia-test-ping',
  });
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

/**
 * Mikrofon dinlemeye başladığında çalacak yumuşak yükselen tını (Apple Siri / Google Asistan tarzı)
 */
export function playMicListeningChime(): void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now); // A4
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  } catch {
    // sessizce geç
  }
}

/**
 * Mikrofon dinlemeyi tamamladığında veya işlem başarılı olduğunda onay tınısı
 */
export function playMicDoneChime(): void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25, now); // E5
    osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.12); // C5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch {
    // sessizce geç
  }
}

