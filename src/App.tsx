import React, { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import {
  auth,
  googleProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  setGoogleAccessToken,
  getGoogleAccessToken,
  createCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEventTitle,
  checkCalendarConflicts,
  saveUserNoteToFirestore,
  deleteUserNoteFromFirestore,
  batchSyncNotesToFirestore,
  subscribeToUserNotes,
  getCachedUser,
  setCachedUser,
  type User,
} from './firebase.ts';
import { extractSimpleNoteFromText, findFermentationRecipe } from './utils/simpleNote.ts';
import { getCardColor } from './utils/cardColors.ts';
import { checkEpisodicMemory } from './utils/episodicMemory.ts';
import type { ActionItem } from './types/notivia.ts';
import { scheduleMedicationAlarms } from './utils/medicationScheduler.ts';
import {
  exportToDeviceCalendar,
  getGoogleCalendarWebUrl,
  scheduleLocalDeviceReminder,
  requestDeviceNotificationPermission,
  playNotificationChime,
  showSystemNotification,
  scheduleAllCardReminders,
  clearAllScheduledReminders,
  cancelScheduledReminder,
  triggerDailyAssistantSummary,
  testAssistantNotification,
  playMicListeningChime,
  playMicDoneChime,
} from './utils/deviceCalendar.ts';
import { alarmSound } from './services/alarmSound.ts';
import { LocalNotifications } from '@capacitor/local-notifications';
import {
  localNotifications,
  scheduleFermentationAlarms,
  cancelAllFermentationAlarms
} from './services/localNotificationService.ts';
import { useAlarmWatcher } from './hooks/useAlarmWatcher.ts';
import {
  saveLocalMedia,
  getLocalMedia,
  deleteLocalMedia,
  compressImage,
} from './utils/mediaStorage.ts';
import {
  loadNotesFromGoogleDrive,
  saveNotesToGoogleDrive,
} from './utils/driveStorage.ts';
import { OfflineIndicator } from './components/OfflineIndicator.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
import { CardReminderEditor } from './components/CardReminderEditor.tsx';
import { EditNoteModal } from './components/EditNoteModal.tsx';
import { DOMAIN_REGISTRY, WORK_DOMAIN_OPTIONS, detectDomainFromNote, type ProfessionDomain } from './types/domainThemes.ts';
import { translations, type Language } from './utils/i18n.ts';
import { checkLocalWeather, type WeatherCondition } from './utils/weather.ts';
import { parseDailyLifeTime, type ParsedTimeResult } from './utils/date.ts';
export { parseDailyLifeTime, type ParsedTimeResult };

export interface SimpleCardItem {
  id: string;
  baslik: string;
  zaman?: string | null;
  tarih_iso?: string | null;
  eksik_bilgi?: boolean;
  netlestirme_sorusu?: string | null;
  soru?: string | null;
  tetikleyici?: {
    tip?: string | null;
    sart?: string;
    aktif_mi?: boolean;
    etiket?: string;
  } | null;
  hazirlik_zamani?: string | null;
  hazirlik_iso?: string | null;
  anomali_notu?: string | null;
  teshis_notu?: string | null;
  baglantili_hatirlatma?: string | null;
  periyodik?: {
    tip: string;
    aralik_gun?: number;
    bir_sonraki_tarih_iso?: string;
  } | null;
  action_items?: ActionItem[] | null;
  calendar_event_id?: string | null;
  calendarEventId?: string | null;
  deviceNotificationEnabled?: boolean;
  isAlarm?: boolean;
  isAlarmActive?: boolean;
  isMicroTask?: boolean;
  sureDakika?: number;
  conflictWarning?: string | null;
  conflictWith?: string | null;
  ikon?: string;
  renk?: string;
  mediaId?: string | null;
  createdAt?: any;
  isRemoving?: boolean;
  tamamlandi?: boolean;
  guncel_renk?: string;
}

export function isCompletedCard(card: SimpleCardItem): boolean {
  if (card.tamamlandi) return true;
  if (card.action_items && card.action_items.length > 0) {
    return card.action_items.every((item) => item.is_completed);
  }
  return false;
}

const LOCAL_STORAGE_KEY = 'notivia_local_notes';
const SIMULATED_USER_KEY = 'notivia_simulated_user';

export const getLocalNotes = (): SimpleCardItem[] => {
  try {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return [];
};

export const saveLocalNotes = (notes: SimpleCardItem[]) => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    }
  } catch {
    // ignore
  }
};

// 1. Türkçe Doğal Sesli Fısıltı & Soru Sorma Motoru (TTS)
export function speakQuestion(text: string, onFinished?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onFinished?.();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'tr-TR';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const trVoice = voices.find((v) => v.lang.startsWith('tr'));
  if (trVoice) {
    utterance.voice = trVoice;
  }

  utterance.onend = () => {
    onFinished?.();
  };

  utterance.onerror = () => {
    onFinished?.();
  };

  window.speechSynthesis.speak(utterance);
}

function speakFeedback(phrase: string, onFinished?: () => void) {
  speakQuestion(phrase, onFinished);
}

// 2. Nota Göre 3-4 Kelimelik Kısa Doğrulama Metni Üretici
function generateWhisperText(note: {
  baslik: string;
  zaman?: string | null;
  calendarEventId?: string | null;
  tetikleyici?: { tip?: string | null; sart?: string; aktif_mi?: boolean; etiket?: string } | null;
  teshis_notu?: string | null;
  anomali_notu?: string | null;
  sesli_fisilti?: string | null;
}): string {
  if (note.sesli_fisilti) {
    return note.sesli_fisilti;
  }
  if (note.teshis_notu) {
    return `${note.teshis_notu}. ${note.baslik} planlandı.`;
  }
  if (note.calendarEventId && note.zaman) {
    return `${note.baslik}, ${note.zaman} için takvime işlendi.`;
  }
  if (note.tetikleyici?.etiket) {
    return `${note.baslik}, ${note.tetikleyici.etiket} koşuluyla kaydedildi.`;
  }
  return `${note.baslik} kaydedildi.`;
}

function formatCreatedTime(rawTime: any, lang: Language = 'tr'): string {
  if (!rawTime) return "";
  
  // Firestore Timestamp veya standart Date ayrıştırma
  const date = rawTime.toDate ? rawTime.toDate() : new Date(rawTime);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function sortNotiviaCards(cards: SimpleCardItem[]): SimpleCardItem[] {
  const now = Date.now();

  return [...cards].sort((a, b) => {
    const isCompletedA = isCompletedCard(a);
    const isCompletedB = isCompletedCard(b);

    // 1. Öncelik: Tamamlanmış (tik atılmış) kartlar en altlarda gösterilir
    if (isCompletedA && !isCompletedB) return 1;
    if (!isCompletedA && isCompletedB) return -1;

    const timeA = a.tarih_iso ? new Date(a.tarih_iso).getTime() : null;
    const timeB = b.tarih_iso ? new Date(b.tarih_iso).getTime() : null;

    const isExpiredA = timeA !== null && timeA < now;
    const isExpiredB = timeB !== null && timeB < now;

    // 2. Öncelik: Süresi geçmiş olanlar tamamlanmamışlar arasında altta
    if (isExpiredA && !isExpiredB) return 1;
    if (!isExpiredA && isExpiredB) return -1;

    // 3. Öncelik: Yaklaşan aktif randevular (önümüzdeki 48 saat) en üste
    const isUpcomingA = timeA && timeA >= now && (timeA - now) < 48 * 3600 * 1000;
    const isUpcomingB = timeB && timeB >= now && (timeB - now) < 48 * 3600 * 1000;

    if (isUpcomingA && !isUpcomingB) return -1;
    if (!isUpcomingA && isUpcomingB) return 1;

    // 4. Öncelik: Kendi içlerinde en yeni oluşturulan en üstte
    const getCreatedMs = (val: any) => {
      if (!val) return 0;
      if (val.toDate) return val.toDate().getTime();
      return new Date(val).getTime();
    };

    return getCreatedMs(b.createdAt) - getCreatedMs(a.createdAt);
  });
}

function CardMediaThumbnail({ mediaId, onClick }: { mediaId: string; onClick: () => void }) {
  const [mediaData, setMediaData] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getLocalMedia(mediaId).then((data) => {
      if (isMounted && data) {
        setMediaData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [mediaId]);

  if (!mediaData) {
    return (
      <span className="w-11 h-11 rounded-xl bg-stone-200/50 animate-pulse shrink-0 flex items-center justify-center text-xs text-stone-400">
        📷
      </span>
    );
  }

  return (
    <img
      src={mediaData}
      alt="Not görseli"
      onClick={onClick}
      className="w-11 h-11 rounded-xl object-cover border border-white/80 shadow-xs cursor-pointer active:scale-95 shrink-0"
    />
  );
}

export default function App() {
  // Anında (0ms) yerel hafızadan kartları yükle - ekran asla boş veya gecikmeli açılmaz
  const [cards, setCards] = useState<SimpleCardItem[]>(() => getLocalNotes());

  // useAlarmWatcher: Kartlar içindeki zamanlı alarmları saniyelik kontrol eder ve çalar
  const { activeAlarm, dismissAlarm } = useAlarmWatcher(cards, (id) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isAlarmActive: false } : c))
    );
  });
  // Giriş yapmış kullanıcıyı önbellekten 0ms içinde yakala - tekrar giriş sormaz
  const [currentUser, setCurrentUser] = useState<User | any>(() => {
    return auth.currentUser || (getCachedUser() as any) || null;
  });
  const [simulatedUser, setSimulatedUser] = useState<any>(null);
  const [statusText, setStatusText] = useState<string>('Söyle, çek ya da yaz');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showTextInput, setShowTextInput] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);

  // Çoklu seçim ve toplu silme modu
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

  // Geri alma state'i
  const [undoToast, setUndoToast] = useState<{
    item: SimpleCardItem;
    timerId: any;
  } | null>(null);

  // Manuel Ekleme Çekmecesi State'leri
  const [showManualModal, setShowManualModal] = useState<boolean>(false);
  const [manualTitle, setManualTitle] = useState<string>('');
  const [manualDatetime, setManualDatetime] = useState<string>('');
  const [manualSyncCal, setManualSyncCal] = useState<boolean>(true);

  const [isSyncingDrive, setIsSyncingDrive] = useState<boolean>(false);
  const [driveSyncTime, setDriveSyncTime] = useState<string | null>(null);

  // Otonom Ajan Yönlendirici (Autonomous Dispatcher) Sonuç Modalları
  const [draftedMessage, setDraftedMessage] = useState<{
    alici: string;
    kanal: 'whatsapp' | 'email' | 'sms' | 'duyuru' | string;
    konu?: string;
    metin: string;
    sesli_fisilti: string;
  } | null>(null);

  const [calendarQueryResults, setCalendarQueryResults] = useState<{
    sorgu_tipi: string;
    start_iso: string;
    end_iso: string;
    matchingCount: number;
    matchingNotes: SimpleCardItem[];
    sesli_fisilti: string;
  } | null>(null);

  // Ayarlar ve Tercihler State'leri
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('notivia_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('notivia_lang');
      if (saved === 'tr' || saved === 'en') return saved;
      const navLang = navigator.language?.toLowerCase() || '';
      return navLang.startsWith('tr') ? 'tr' : 'en';
    } catch {
      return 'tr';
    }
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedPref = localStorage.getItem('notivia_notifications_enabled');
        if (storedPref !== null) {
          return storedPref === 'true';
        }
        if ('Notification' in window && Notification.permission === 'granted') {
          return true;
        }
      }
    } catch {
      // ignore
    }
    return false;
  });

  // Kullanıcının seçtiği uzmanlık / bilişsel alan (Hukuk, Maliye, Sağlık, Eğitim, Emekli, Öğrenci, vb.)
  const [workDomain, setWorkDomain] = useState<ProfessionDomain>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('notivia_work_domain');
        if (saved) return saved as ProfessionDomain;
      }
    } catch {
      // ignore
    }
    return 'GENEL';
  });

  const handleSelectWorkDomain = (domain: ProfessionDomain) => {
    setWorkDomain(domain);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('notivia_work_domain', domain);
      }
    } catch {
      // ignore
    }
  };

  // Ekran üstü anlık asistan bildirim bildirici (Push Banner)
  const [activeBannerNotification, setActiveBannerNotification] = useState<{
    title: string;
    body: string;
    icon?: string;
    isAlarm?: boolean;
  } | null>(null);

  // Kart üzerinden hatırlatıcı, takvim ve bildirim düzenleme paneli açık olan kart ID'si
  const [activeReminderEditCardId, setActiveReminderEditCardId] = useState<string | null>(null);

  // Kart detaylı düzenleme modalı için seçili kart
  const [editingNote, setEditingNote] = useState<SimpleCardItem | null>(null);

  // Canlı Hava Durumu Takip State'i
  const [weather, setWeather] = useState<WeatherCondition | null>(null);

  useEffect(() => {
    const updateWeather = async () => {
      // Cihaz konumunu al, izin yoksa varsayılan koordinatla devam et
      if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const w = await checkLocalWeather(pos.coords.latitude, pos.coords.longitude);
            setWeather(w);
          },
          async () => {
            const w = await checkLocalWeather();
            setWeather(w);
          },
          { timeout: 6000 }
        );
      } else {
        const w = await checkLocalWeather();
        setWeather(w);
      }
    };

    updateWeather();
    const interval = setInterval(updateWeather, 20 * 60 * 1000); // 20 dakikada bir kontrol
    return () => clearInterval(interval);
  }, []);

  const t = translations[language];

  // Tema değişikliğinde html sınıfını ve localStorage'ı güncelle
  useEffect(() => {
    try {
      localStorage.setItem('notivia_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, [theme]);

  // Dil değişikliğinde html lang ve localStorage'ı güncelle
  useEffect(() => {
    try {
      localStorage.setItem('notivia_lang', language);
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  // Native bildirim servisi ve bildirim tıklama dinleyicisi
  useEffect(() => {
    // Servisi ve izinleri başlat
    localNotifications.init();

    // Kullanıcı gelen bildirime dokunup uygulamayı açtığında yakalar
    const actionListener = LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (notificationAction) => {
        const noteId = notificationAction.notification.extra?.noteId;
        if (noteId) {
          // İlgili nota odaklan veya tamamlandı olarak işaretle
          console.log('Bildirime dokunuldu, Not ID:', noteId);
        }
      }
    );

    return () => {
      actionListener.then((sub) => sub.remove());
    };
  }, []);

  useEffect(() => {
    if (notificationsEnabled && cards.length > 0) {
      scheduleAllCardReminders(cards);
      // Native ortamda süresi dolacak kartlar için kilit ekranı/arka plan alarmlarını da kur
      cards.forEach((card) => {
        if (card.tarih_iso && !card.tamamlandi) {
          localNotifications.scheduleAlarm({
            id: card.id,
            baslik: card.baslik,
            tarih_iso: card.tarih_iso,
            ikon: card.ikon,
          });
        }
      });
    }
  }, [cards, notificationsEnabled]);

  // Uygulama içi push bildirim başlığı dinleyicisi
  useEffect(() => {
    let autoCloseTimer: number | null = null;
    const handleInAppNotif = (e: any) => {
      const detail = e.detail;
      if (detail && notificationsEnabled) {
        const isAlarmEvent = !!detail.isAlarm;
        if (isAlarmEvent) {
          alarmSound.startAlarm();
        }
        setActiveBannerNotification({
          title: detail.title || 'Notivia Bildirimi',
          body: detail.body || '',
          icon: detail.icon || (isAlarmEvent ? '⏰' : '🔔'),
          isAlarm: isAlarmEvent,
        });

        if (autoCloseTimer) {
          window.clearTimeout(autoCloseTimer);
          autoCloseTimer = null;
        }

        // Standart bildirimse 4.5 sn sonra kapat, alarmsa kullanıcı kapatana kadar ekranda çalsın
        if (!isAlarmEvent) {
          autoCloseTimer = window.setTimeout(() => {
            setActiveBannerNotification(null);
          }, 4500);
        }
      }
    };

    window.addEventListener('notivia_notification', handleInAppNotif);
    return () => {
      window.removeEventListener('notivia_notification', handleInAppNotif);
      if (autoCloseTimer) window.clearTimeout(autoCloseTimer);
    };
  }, [notificationsEnabled]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSelectLanguage = (newLang: Language) => {
    setLanguage(newLang);
  };

  const handleToggleNotifications = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      localStorage.setItem('notivia_notifications_enabled', 'false');
      clearAllScheduledReminders();
      setStatusText(language === 'tr' ? 'Bildirimler kapatıldı 🔕' : 'Notifications disabled 🔕');
      setTimeout(() => setStatusText(t.speakOrWrite), 2500);
      return;
    }

    // Bildirimleri aç
    setNotificationsEnabled(true);
    localStorage.setItem('notivia_notifications_enabled', 'true');
    scheduleAllCardReminders(cards);

    const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
    let systemGranted = false;

    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        systemGranted = await requestDeviceNotificationPermission();
      } catch {
        systemGranted = false;
      }
    }

    if (systemGranted) {
      await showSystemNotification({
        title: language === 'tr' ? '🔔 Notivia Bildirimleri Aktif' : '🔔 Notivia Notifications Active',
        body: language === 'tr'
          ? 'Masaüstü/cihaz bildirimleri ve sesli alarmlarınız aktif edildi.'
          : 'Desktop notifications and audio alarms are active.',
      });
      setStatusText(language === 'tr' ? 'Masaüstü ve sesli bildirimler açıldı ✓' : 'System notifications enabled ✓');
    } else {
      await showSystemNotification({
        title: language === 'tr' ? '🔔 Notivia Bildirimleri Açık' : '🔔 Notivia Notifications Active',
        body: language === 'tr'
          ? isInIframe
            ? 'Uygulama içi sesli alarmlar aktif. Masaüstü pencereleri için uygulamayı yeni sekmede açabilirsiniz.'
            : 'Uygulama içi sesli alarmlar ve hatırlatıcılar aktif edildi.'
          : 'In-app audio alarms are active.',
      });
      setStatusText(
        language === 'tr'
          ? isInIframe
            ? 'Uygulama içi alarmlar açıldı 🔔 (Masaüstü için yeni sekmede açın)'
            : 'Uygulama içi sesli alarmlar açıldı 🔔'
          : 'In-app alarms active 🔔'
      );
    }
    setTimeout(() => setStatusText(t.speakOrWrite), 3500);
  };

  const handleSendTestNotification = async () => {
    setNotificationsEnabled(true);
    localStorage.setItem('notivia_notifications_enabled', 'true');
    await requestDeviceNotificationPermission().catch(() => false);
    await testAssistantNotification(language);
    setStatusText(language === 'tr' ? 'Test bildirimi ve sesli zil çalındı 🔔' : 'Test notification & chime played 🔔');
    setTimeout(() => setStatusText(t.speakOrWrite), 2500);
  };

  const handleRemindTodayTasks = async () => {
    setNotificationsEnabled(true);
    localStorage.setItem('notivia_notifications_enabled', 'true');
    await requestDeviceNotificationPermission().catch(() => false);
    await triggerDailyAssistantSummary(cards, language);
    setStatusText(language === 'tr' ? 'Günün ajandası bildirildi 📋' : "Today's schedule notified 📋");
    setTimeout(() => setStatusText(t.speakOrWrite), 2500);
  };

  const recognitionRef = useRef<any>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const manualTextInputRef = useRef<HTMLInputElement | null>(null);
  const pendingCapturedImageRef = useRef<string | null>(null);
  const onSpeechCompletedRef = useRef<((spoken: string) => Promise<void>) | null>(null);
  const processWithAIRef = useRef<((text?: string, base64Image?: string | null, isSpoken?: boolean) => Promise<void>) | null>(null);

  // Firestore bulut senkronizasyon köprüsü
  const syncNoteToCloud = (note: SimpleCardItem) => {
    const uid = currentUser?.uid;
    if (uid) {
      saveUserNoteToFirestore(uid, note);
    }
  };

  const syncDeleteToCloud = (noteId: string) => {
    const uid = currentUser?.uid;
    if (uid) {
      deleteUserNoteFromFirestore(uid, noteId);
    }
  };

  // Google Drive'a arka planda sessizce yedekleme tetikleyici
  const triggerDriveBackup = async (currentNotes: SimpleCardItem[]) => {
    const token = getGoogleAccessToken();
    if (!token) return;
    setIsSyncingDrive(true);
    try {
      const result = await saveNotesToGoogleDrive(currentNotes);
      if (result.success) {
        setDriveSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        console.log("Notlar kullanıcının kişisel Google Drive'ına yedeklendi ✓");
      }
    } catch (err) {
      console.warn("Google Drive yedekleme hatası:", err);
    } finally {
      setIsSyncingDrive(false);
    }
  };

  // Google Drive'dan notları çekme ve lokal ile birleştirme
  const syncFromDrive = async () => {
    const token = getGoogleAccessToken();
    if (!token) return;
    setIsSyncingDrive(true);
    try {
      const driveResult = await loadNotesFromGoogleDrive();
      if (driveResult.success && driveResult.notes) {
        const local = getLocalNotes();
        // Eğer Drive'da yedek dosyası varsa ve boş değilse
        if (driveResult.notes.length > 0) {
          // Drive'daki notlar ile lokali birleştir (ID eşleşmelerine göre)
          const mergedMap = new Map<string, SimpleCardItem>();
          driveResult.notes.forEach((n) => mergedMap.set(n.id, n));
          local.forEach((n) => mergedMap.set(n.id, n));
          const mergedList = Array.from(mergedMap.values());
          setCards(mergedList);
          saveLocalNotes(mergedList);
          if (currentUser?.uid) {
            batchSyncNotesToFirestore(currentUser.uid, mergedList);
          }
          await saveNotesToGoogleDrive(mergedList);
        } else if (local.length > 0) {
          await saveNotesToGoogleDrive(local);
        }
        setDriveSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.warn("Drive sync hatası:", err);
    } finally {
      setIsSyncingDrive(false);
    }
  };

  // Firebase Auth (Sürekli Kalıcı Oturum) & Gerçek Zamanlı Bulut Senkronizasyonu
  useEffect(() => {
    try {
      const storedSim = localStorage.getItem(SIMULATED_USER_KEY);
      if (storedSim) {
        const parsed = JSON.parse(storedSim);
        setSimulatedUser(parsed);
      }
    } catch {
      // ignore
    }

    let isMounted = true;

    // Mobil cihazlardan redirect ile dönüldüyse sonucu yakala
    getRedirectResult(auth).then(async (result) => {
      if (result && result.user) {
        setCachedUser(result.user);
        setCurrentUser(result.user);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken || null;
        if (token) {
          setGoogleAccessToken(token);
          await syncFromDrive();
        }
        setStatusText('Google hesabı bağlandı ✓');
        setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
      }
    }).catch((err) => {
      console.warn("Google Redirect Login Error:", err);
      if (err?.code === 'auth/unauthorized-domain') {
        setStatusText(`Domain yetkisiz: ${window.location.hostname} Firebase'e eklenmeli`);
      }
    });

    try {
      const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (!isMounted) return;
        setCurrentUser(user);
        setCachedUser(user);

        if (user) {
          // Arka planda Drive yedeklemesi kontrol et
          if (getGoogleAccessToken()) {
            syncFromDrive();
          }
        }
      });

      return () => {
        isMounted = false;
        unsubscribeAuth();
      };
    } catch {
      // ignore
    }
  }, []);

  // Gerçek Zamanlı Firestore Senkronizasyon Dinleyicisi (Real-time Cloud Sync)
  // Kullanıcı ister telefondan ister masaüstünden yazsın, sayfa yenilemeye gerek kalmadan anında eşitlenir.
  useEffect(() => {
    const uid = currentUser?.uid;
    if (!uid) return;

    const unsubscribe = subscribeToUserNotes(
      uid,
      async (remoteNotes) => {
        if (!remoteNotes) return;
        const local = getLocalNotes();

        if (remoteNotes.length > 0) {
          const mergedMap = new Map<string, SimpleCardItem>();
          remoteNotes.forEach((rn) => mergedMap.set(rn.id, rn as SimpleCardItem));

          // Yerelde olup henüz buluta aktarılmamış not varsa koru ve Firestore'a gönder
          let hasLocalOnly = false;
          local.forEach((loc) => {
            if (!mergedMap.has(loc.id)) {
              mergedMap.set(loc.id, loc);
              saveUserNoteToFirestore(uid, loc);
              hasLocalOnly = true;
            }
          });

          const mergedList = Array.from(mergedMap.values());
          setCards(mergedList);
          saveLocalNotes(mergedList);
          if (hasLocalOnly) {
            triggerDriveBackup(mergedList);
          }
        } else if (local.length > 0) {
          // Bulutta henüz not yok ama yerelde notlar varsa (ilk giriş), tümünü Firestore'a aktar
          await batchSyncNotesToFirestore(uid, local);
        }
      },
      (err) => {
        console.warn('Firestore realtime sync listener error:', err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentUser?.uid]);

  // Çoklu Sekme ve Ağ Durumu Senkronizasyonu (Window Storage & Online Listener)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY) {
        setCards(getLocalNotes());
      }
    };
    const handleOnline = () => {
      setCards(getLocalNotes());
      if (currentUser?.uid) {
        const local = getLocalNotes();
        batchSyncNotesToFirestore(currentUser.uid, local);
      }
      if (getGoogleAccessToken()) {
        syncFromDrive();
      }
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setCards(getLocalNotes());
        if (getGoogleAccessToken()) {
          syncFromDrive();
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('online', handleOnline);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('online', handleOnline);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [currentUser?.uid]);

  // Web Speech API Voice Recognition setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'tr-TR';
        
        // Mobil cihazlarda çift kelime (Ahmet Ahmet) ve stabilite sorunlarını çözmek için 
        // continuous ve interimResults false yapılarak cihazın native VAD'ine (Voice Activity Detection) bırakılır.
        recognition.continuous = false; 
        recognition.interimResults = false; 

        let silenceTimer: any = null;
        let currentTranscript = '';
        let isSubmitted = false;

        const submitTranscript = async () => {
          if (isSubmitted) return;
          isSubmitted = true;
          
          try {
            recognition.stop();
          } catch {
            // ignore
          }
          
          resetMicUI();
          if (currentTranscript.trim()) {
            if (onSpeechCompletedRef.current) {
              await onSpeechCompletedRef.current(currentTranscript.trim());
            } else if (processWithAIRef.current) {
              await processWithAIRef.current(currentTranscript.trim(), null, true);
            }
          } else if (pendingCapturedImageRef.current) {
            const imageToSend = pendingCapturedImageRef.current;
            pendingCapturedImageRef.current = null;
            setStatusText('Görsel teşhis ediliyor...');
            resetMicUI();
            if (processWithAIRef.current) {
              await processWithAIRef.current('', imageToSend, false);
            }
          }
        };

        recognition.onstart = () => {
          setIsListening(true);
          isSubmitted = false;
          currentTranscript = '';
          playMicListeningChime();
          if (pendingCapturedImageRef.current) {
            setStatusText('Görsel hazır. Dinleniyor...');
          } else {
            setStatusText('Dinleniyor...');
          }
        };

        recognition.onresult = (event: any) => {
          clearTimeout(silenceTimer);

          currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }

          setStatusText(`Dinleniyor (${event.results.length} parça)...`);

          // 3.5 saniye boyunca tek bir kelime dahi gelmezse listeyi tamamla ve AI'a gönder
          silenceTimer = setTimeout(() => {
            submitTranscript();
          }, 3500);
        };

        recognition.onerror = async (e: any) => {
          console.warn('SpeechRecognition bildirimi:', e?.error || e);
          clearTimeout(silenceTimer);
          setIsListening(false);
          // Eğer hata no-speech ise ve elimizde metin varsa göndermeyi deneyebiliriz.
          if (e?.error !== 'no-speech' && e?.error !== 'aborted') {
             if (pendingCapturedImageRef.current) {
               setStatusText('Görsel hazır. "Teşhis Et"e dokunabilir veya konuşabilirsin.');
             } else {
               resetMicUI();
             }
          }
        };

        recognition.onend = async () => {
          clearTimeout(silenceTimer);
          setIsListening(false);
          
          // Eğer onend tetiklendiğinde elimizde henüz gönderilmemiş bir metin varsa gönder:
          if (!isSubmitted && currentTranscript.trim()) {
             submitTranscript();
          } else if (!isSubmitted) {
             if (pendingCapturedImageRef.current) {
               setStatusText('Görsel hazır. İster sesle anlat, ister doğrudan tıkla.');
             } else {
               resetMicUI();
             }
          }
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Konuşma tanıma başlatılamadı:', err);
      }
    }
  }, []);

  const resetMicUI = () => {
    setIsListening(false);
    setStatusText('Söyle, çek ya da yaz');
  };

  // Butona basıldığında hızlı yapay zeka metin giriş alanını aç/kapa
  const handleToggleTextInput = () => {
    setShowTextInput((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => manualTextInputRef.current?.focus(), 80);
      }
      return next;
    });
  };

  const openManualModal = () => {
    setShowManualModal(true);
    setTimeout(() => {
      const el = document.getElementById('manual-title');
      el?.focus();
    }, 80);
  };

  const closeManualModal = () => {
    setShowManualModal(false);
  };

  // Expose to window for direct event invocation
  useEffect(() => {
    (window as any).closeManualModal = closeManualModal;
    (window as any).openManualModal = openManualModal;
    return () => {
      delete (window as any).closeManualModal;
      delete (window as any).openManualModal;
    };
  }, []);

  // Manuel Not Form Gönderimi (#manual-create-form)
  const handleManualCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const baslik = manualTitle.trim();
    const rawDate = manualDatetime;
    const syncCal = manualSyncCal;

    if (!baslik) return;

    let zamanStr: string | null = null;
    let tarihIso: string | null = null;

    if (rawDate) {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        tarihIso = d.toISOString();
        zamanStr = d.toLocaleDateString('tr-TR', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    }

    // Determine smart icon & color based on keywords
    let ikon = '📌';
    let renk = '#FEF3C7';
    const lower = baslik.toLowerCase();
    if (lower.includes('kira') || lower.includes('fatura') || lower.includes('öde')) {
      ikon = '💳';
      renk = '#FEE2E2';
    } else if (lower.includes('toplantı') || lower.includes('görüşme') || lower.includes('ziyaret')) {
      ikon = '💼';
      renk = '#E0F2FE';
    } else if (lower.includes('çay') || lower.includes('kahve') || lower.includes('yemek')) {
      ikon = '☕';
      renk = '#FEF3C7';
    } else if (lower.includes('doktor') || lower.includes('ilaç') || lower.includes('hastane')) {
      ikon = '💊';
      renk = '#DCFCE7';
    } else if (lower.includes('su') || lower.includes('filtre') || lower.includes('tamir')) {
      ikon = '💧';
      renk = '#E0F2FE';
    } else if (rawDate) {
      ikon = '🗓️';
      renk = '#F3E8FF';
    }

    closeManualModal();
    setManualTitle('');
    setManualDatetime('');
    setStatusText('Not eklendi');

    // Doğrudan sisteme ekleme (AI atlanır)
    await addNote({
      baslik,
      zaman: zamanStr,
      tarih_iso: syncCal ? tarihIso : null,
      ikon,
      renk,
    });

    setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
  };

  // Klavye / Manuel Metin Girişi: Senaryolara tabi tutulmadan olduğu gibi kaydedilir
  const handleManualTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = textInput.trim();
    const imageToAttach = pendingImage || pendingCapturedImageRef.current;
    if (!text && !imageToAttach) return;

    // Giriş kutusunu sıfırla ve kapat
    setTextInput('');
    setShowTextInput(false);
    setPendingImage(null);
    pendingCapturedImageRef.current = null;

    let mediaId: string | null = null;
    if (imageToAttach) {
      try {
        const generatedId = 'media_' + Date.now();
        await saveLocalMedia(generatedId, imageToAttach);
        mediaId = generatedId;
      } catch {
        // ignore
      }
    }

    // Alt alta yazılan satırları ayrıştır ve temizle
    const rawLines = text ? text.split('\n').map((l) => l.trim()).filter(Boolean) : [];
    
    // Satır başındaki liste işaretlerini (- , * , 1. , [ ] vb.) temizleyen yardımcı
    const cleanLine = (l: string) =>
      l.replace(/^[-*•]\s*|^\[[ xX]?\]\s*|^\d+[\.\)]\s*/, '').trim();

    let noteTitle = text || 'Görsel Notu';
    let actionItems: { task: string; is_completed: boolean }[] = [];
    let ikon = '📌';
    let renk = '#FEF3C7';

    if (rawLines.length > 1) {
      // Çoklu satır girilmişse: Her bir satır bağımsız tiklenebilir alt görev olur
      actionItems = rawLines.map((line) => ({
        task: cleanLine(line),
        is_completed: false,
      })).filter((item) => item.task.length > 0);

      // Başlığı belirle: İlk satır kısa ve başlık gibiyse veya genel "Görev Listesi"
      const firstLineClean = cleanLine(rawLines[0]);
      if (rawLines[0].endsWith(':') || firstLineClean.toLowerCase().includes('liste') || firstLineClean.toLowerCase().includes('görev') || firstLineClean.toLowerCase().includes('market')) {
        noteTitle = firstLineClean.replace(/:$/, '');
        actionItems = rawLines.slice(1).map((line) => ({
          task: cleanLine(line),
          is_completed: false,
        })).filter((item) => item.task.length > 0);
      } else {
        noteTitle = 'Görev Listesi';
      }

      ikon = '📋';
      renk = '#E0F2FE';
    } else if (rawLines.length === 1) {
      // Tek satır girilmişse: Eğer tire/madde işaretiyle başlamışsa tekil görev yap
      const singleLine = rawLines[0];
      if (/^[-*•]|^\[[ xX]?\]|^\d+[\.\)]/.test(singleLine)) {
        const cleaned = cleanLine(singleLine);
        noteTitle = cleaned;
        actionItems = [{ task: cleaned, is_completed: false }];
        ikon = '📋';
      } else {
        noteTitle = singleLine;
      }
    }

    if (imageToAttach && !text) {
      ikon = '📷';
      renk = '#E0F2FE';
    }

    setStatusText(actionItems.length > 0 ? `${actionItems.length} görev eklendi ✓` : 'Not eklendi ✓');

    // Manuel / klavye girişleri doğrudan olduğu gibi kaydedilir (hiçbir yapay zeka veya senaryo müdahalesi yapılmaz)
    await addNote({
      baslik: noteTitle,
      zaman: null,
      tarih_iso: null,
      ikon,
      renk,
      mediaId,
      action_items: actionItems,
      eksik_bilgi: false,
      anomali_notu: null,
      sesli_fisilti: actionItems.length > 0 ? `${actionItems.length} maddelik görev listesi kaydedildi.` : 'Notunuz kaydedildi.',
      isManualEntry: true,
    });

    setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2000);
  };

  const handleMicClick = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition || !recognitionRef.current) {
      setShowTextInput(true);
      setStatusText('Klavye moduna geçildi');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      resetMicUI();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e: any) {
        try {
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current?.start(), 150);
        } catch {
          setShowTextInput(true);
          setStatusText('Klavye moduna geçildi');
        }
      }
    }
  };

  // Android Quick Settings Tile / Deep Link / PWA Shortcuts Yönlendiricisi (notivia://listen veya ?action=listen)
  useEffect(() => {
    // Native Android WebView / TWA doğrudan JS köprüsü fonksiyonları
    (window as any).startNotiviaVoiceListen = () => {
      handleMicClick();
    };
    (window as any).openNotiviaCamera = () => {
      cameraInputRef.current?.click();
    };
    (window as any).openNotiviaManualNote = () => {
      openManualModal();
    };

    const handleDeepLink = () => {
      try {
        const search = window.location.search;
        const hash = window.location.hash.toLowerCase();
        const params = new URLSearchParams(search);
        const action = params.get('action') || params.get('mode');
        const shouldListen =
          action === 'listen' ||
          params.get('listen') === 'true' ||
          hash === '#listen' ||
          hash === '#/listen' ||
          search.includes('listen');
        const shouldCamera =
          action === 'camera' ||
          params.get('camera') === 'true' ||
          hash === '#camera' ||
          search.includes('camera');
        const shouldManual = action === 'manual' || hash === '#manual';

        if (shouldListen) {
          setTimeout(() => {
            handleMicClick();
          }, 400);
        } else if (shouldCamera) {
          setTimeout(() => {
            cameraInputRef.current?.click();
          }, 300);
        } else if (shouldManual) {
          setTimeout(() => {
            openManualModal();
          }, 300);
        }

        if (action || hash === '#listen' || hash === '#camera' || hash === '#manual') {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (err) {
        console.warn('Deep link işleme bildirimi:', err);
      }
    };

    const onNativeCustomAction = (event: any) => {
      const act = event?.detail?.action || event?.data;
      if (act === 'listen') {
        handleMicClick();
      } else if (act === 'camera') {
        cameraInputRef.current?.click();
      } else if (act === 'manual') {
        openManualModal();
      }
    };

    handleDeepLink();
    window.addEventListener('hashchange', handleDeepLink);
    window.addEventListener('notivia:action', onNativeCustomAction as EventListener);
    window.addEventListener('notivia:listen', (() => handleMicClick()) as EventListener);

    // Capacitor Native App Deep Link Dinleyicisi
    let capListenerHandle: { remove: () => void } | null = null;
    if (Capacitor.isPluginAvailable('App')) {
      CapApp.addListener('appUrlOpen', (data) => {
        const urlStr = data?.url || '';
        if (urlStr.includes('listen')) {
          handleMicClick();
        } else if (urlStr.includes('camera')) {
          cameraInputRef.current?.click();
        } else if (urlStr.includes('manual')) {
          openManualModal();
        }
      }).then((handle) => {
        capListenerHandle = handle;
      }).catch((err) => {
        console.warn('Capacitor App listener bildirimi:', err);
      });
    }

    return () => {
      delete (window as any).startNotiviaVoiceListen;
      delete (window as any).openNotiviaCamera;
      delete (window as any).openNotiviaManualNote;
      window.removeEventListener('hashchange', handleDeepLink);
      window.removeEventListener('notivia:action', onNativeCustomAction as EventListener);
      window.removeEventListener('notivia:listen', (() => handleMicClick()) as EventListener);
      if (capListenerHandle) {
        capListenerHandle.remove();
      }
    };
  }, []);

  // Yeni bir girdi geldiğinde pasif koşullu kartları tarama
  const checkReactiveTriggers = (newInputText: string, existingCards: SimpleCardItem[]) => {
    const lowerInput = newInputText.toLowerCase();
    
    return existingCards.filter(card => {
      if (!card.tetikleyici || !card.tetikleyici.sart) return false;
      
      // Hava durumu şartı kontrolü
      if (card.tetikleyici.tip === 'hava') {
        if (card.tetikleyici.sart === 'yagmur' && weather?.isRaining) return true;
        if (card.tetikleyici.sart === 'don' && weather?.isFreezing) return true;
      }

      // Tetikleyicinin anahtar kelimeleri yeni girdide geçiyor mu?
      const conditionWords = card.tetikleyici.sart.toLowerCase().split(' ');
      return conditionWords.some(word => word.length > 3 && lowerInput.includes(word));
    });
  };

  // Add Note Handler
  const addNote = async (noteData: {
    baslik: string;
    zaman?: string | null;
    tarih_iso?: string | null;
    eksik_bilgi?: boolean;
    netlestirme_sorusu?: string | null;
    soru?: string | null;
    tetikleyici?: {
      tip?: string | null;
      sart?: string;
      aktif_mi?: boolean;
      etiket?: string;
    } | null;
    hazirlik_zamani?: string | null;
    hazirlik_iso?: string | null;
    anomali_notu?: string | null;
    teshis_notu?: string | null;
    conflictWith?: string | null;
    conflictWarning?: string | null;
    ikon?: string;
    renk?: string;
    mediaId?: string | null;
    baglantili_hatirlatma?: string | null;
    action_items?: ActionItem[] | null;
    sesli_fisilti?: string | null;
    periyodik?: {
      tip: string;
      aralik_gun?: number;
      bir_sonraki_tarih_iso?: string;
    } | null;
    isManualEntry?: boolean;
  }) => {
    if (!noteData.isManualEntry) {
      // Check reactive triggers against existing cards
      const triggeredCards = checkReactiveTriggers(noteData.baslik + ' ' + (noteData.zaman || ''), cards);
      if (triggeredCards.length > 0) {
        const relatedNames = triggeredCards.map((c) => c.baslik).join(', ');
        noteData.baglantili_hatirlatma = `Hazır buradayken: ${relatedNames}`;
      }

      // Episodic Memory (Geçmiş Örüntüleri ve Bakiye Mahsuplaşması) kontrolü
      const episodicResult = checkEpisodicMemory(noteData, cards);
      if (episodicResult.newCardUpdates) {
        noteData = { ...noteData, ...episodicResult.newCardUpdates };
      }

      if (episodicResult.pastCardUpdates.length > 0) {
        // Geçmiş kartları bellekte güncelle
        setCards(prevCards => {
          const nextCards = [...prevCards];
          for (const update of episodicResult.pastCardUpdates) {
            const idx = nextCards.findIndex(c => c.id === update.id);
            if (idx !== -1) {
              nextCards[idx] = { ...nextCards[idx], ...update.changes };
            }
          }
          return nextCards;
        });

        // Firebase / LocalStorage yansıt
        for (const update of episodicResult.pastCardUpdates) {
          updateNoteTitle(update.id, update.changes.baslik || '', null, update.changes.ikon || '📌');
        }
      }
    }

    // Takvime yaz ve çakışma bilgisini al
    const { eventId, conflictWith } = await createCalendarEvent(noteData);

    const nowIso = new Date().toISOString();
    const tempId = 'local_' + Date.now();

    // Cihaz Takvimi / Yerel & Push Bildirim Alarmı Kur
    if (noteData.tarih_iso) {
      scheduleLocalDeviceReminder(
        tempId,
        noteData.baslik,
        noteData.tarih_iso,
        noteData.ikon,
        noteData.periyodik,
        (nextIso) => {
          // Bir sonraki periyodun bildirim güncellemesi
          console.log(`Sonraki periyot tarihi güncellendi: ${nextIso}`);
        }
      );
      requestDeviceNotificationPermission().catch(() => {});
    }

    // Predictive Action Graph: Ön Hazırlık Alarmı Kur (Tersine Hatırlatıcı)
    if (noteData.hazirlik_iso) {
      const prepId = tempId + '_prep';
      const prepTitle = `Ön Hazırlık: ${noteData.baslik}`;
      scheduleLocalDeviceReminder(
        prepId,
        prepTitle,
        noteData.hazirlik_iso,
        '⏳',
        null
      );
    }

    // Çoklu Medikal İlaç Alarmlarını Kur (@capacitor/local-notifications)
    if (noteData.action_items && noteData.action_items.length > 0) {
      const hasMedTimes = noteData.action_items.some(it => it.time || (it.task && /^\d{2}:\d{2}/.test(it.task)));
      if (hasMedTimes) {
        scheduleMedicationAlarms(noteData.action_items).catch(err => {
          console.warn('scheduleMedicationAlarms hatası:', err);
        });
      }
    }

    // Fermantasyon Alarmlarını Kur (Ara kontroller ve ana aşamalar)
    const fermRecipe = findFermentationRecipe(noteData.baslik + ' ' + (noteData.anomali_notu || ''));
    if (fermRecipe) {
      scheduleFermentationAlarms({
        noteId: tempId,
        urunAdi: fermRecipe.urun,
        ikon: fermRecipe.ikon,
        startDate: new Date(),
        araKontrol: fermRecipe.araKontrol,
        asamalar: fermRecipe.asamalar,
      }).catch(err => {
        console.warn('scheduleFermentationAlarms hatası:', err);
      });
    }

    if (conflictWith) {
      setStatusText(`Not eklendi (Çakışma: ${conflictWith})`);
    } else if (noteData.periyodik) {
      setStatusText('Periyodik hatırlatıcı kuruldu 🔄🔔');
    } else if (noteData.tarih_iso) {
      setStatusText('Cihaz hatırlatıcısı kuruldu ⏰');
    }

    const payload = {
      ...noteData,
      calendarEventId: eventId || null,
      calendar_event_id: eventId || null,
      conflictWith: conflictWith || null,
      conflictWarning: conflictWith || null,
      tetikleyici: noteData.tetikleyici || null,
      anomali_notu: noteData.anomali_notu || null,
      teshis_notu: noteData.teshis_notu || null,
      baglantili_hatirlatma: noteData.baglantili_hatirlatma || null,
      action_items: (noteData as any).action_items || null,
      createdAt: nowIso,
    };

    const newCard: SimpleCardItem = {
      id: tempId,
      ...payload,
    };
    const newNote = newCard;

    if (newNote.tarih_iso) {
      await localNotifications.scheduleAlarm({
        id: newNote.id,
        baslik: newNote.baslik,
        tarih_iso: newNote.tarih_iso,
        ikon: newNote.ikon,
      });
    }

    // Optimistic immediate update to local UI state & localStorage
    setCards((prev) => [newCard, ...prev.filter((c) => c.id !== tempId)]);
    const local = getLocalNotes().filter((c) => c.id !== tempId);
    local.unshift(newCard);
    saveLocalNotes(local);
    syncNoteToCloud(newCard);

    // Google Drive'a sessizce yedekle
    triggerDriveBackup(local);
  };

  // 1. Alt görev tamamlama / geri alma fonksiyonu
  const toggleActionItem = async (cardId: string, taskIndex: number) => {
    const targetCard = cards.find((c) => c.id === cardId);
    if (!targetCard || !targetCard.action_items) return;

    const updatedTasks = targetCard.action_items.map((item, idx) =>
      idx === taskIndex ? { ...item, is_completed: !item.is_completed } : item
    );

    // Lokal State Güncelle
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, action_items: updatedTasks } : c))
    );

    const local = getLocalNotes();
    const locItem = local.find((n) => n.id === cardId);
    if (locItem) {
      locItem.action_items = updatedTasks;
      saveLocalNotes(local);
      syncNoteToCloud(locItem);
      triggerDriveBackup(local);
    }
  };

  // 1.1 Karta alt görev / madde ekleme fonksiyonu
  const addSubtaskToCard = (cardId: string, taskText: string) => {
    if (!taskText.trim()) return;

    const trimmed = taskText.trim();
    setCards((prev) =>
      prev.map((card) => {
        if (card.id !== cardId) return card;
        const currentTasks = card.action_items || [];
        return {
          ...card,
          action_items: [...currentTasks, { task: trimmed, is_completed: false }],
        };
      })
    );

    const local = getLocalNotes();
    const locItem = local.find((n) => n.id === cardId);
    if (locItem) {
      const currentTasks = locItem.action_items || [];
      locItem.action_items = [...currentTasks, { task: trimmed, is_completed: false }];
      saveLocalNotes(local);
      syncNoteToCloud(locItem);
      triggerDriveBackup(local);
    }
  };

  // Kartın tamamlanma durumunu (tik atma) değiştirme - yok etmek yerine altlara üstü çizili atar
  const toggleCardCompleted = async (cardId: string) => {
    const targetCard = cards.find((c) => c.id === cardId);
    if (!targetCard) return;

    const nextCompleted = !isCompletedCard(targetCard);

    // Varsa tüm action_items maddelerini de aynı duruma getir
    const updatedTasks = targetCard.action_items
      ? targetCard.action_items.map((task) => ({ ...task, is_completed: nextCompleted }))
      : null;

    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== cardId) return c;
        return {
          ...c,
          tamamlandi: nextCompleted,
          action_items: updatedTasks || c.action_items,
        };
      })
    );

    setStatusText(nextCompleted ? 'Not tamamlandı olarak işaretlendi ✓' : 'Not geri açıldı');
    setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2000);

    const local = getLocalNotes();
    const locItem = local.find((n) => n.id === cardId);
    if (locItem) {
      locItem.tamamlandi = nextCompleted;
      if (updatedTasks) locItem.action_items = updatedTasks;
      saveLocalNotes(local);
      syncNoteToCloud(locItem);
      triggerDriveBackup(local);
    }

    if (nextCompleted) {
      await localNotifications.cancelAlarm(cardId);
      await cancelAllFermentationAlarms(cardId);
    }
  };

  // Kalıcı silmeyi gerçekleştiren çekirdek fonksiyon
  const commitPendingDeletion = async (card: SimpleCardItem) => {
    await localNotifications.cancelAlarm(card.id);
    await cancelAllFermentationAlarms(card.id);
    const calId = card.calendarEventId || card.calendar_event_id;
    if (calId) {
      deleteCalendarEvent(calId).catch((err) =>
        console.warn('Takvim silme hatası:', err)
      );
    }
    if (card.mediaId) {
      deleteLocalMedia(card.mediaId).catch((err) =>
        console.warn('Medya silme hatası:', err)
      );
    }
    const local = getLocalNotes().filter((n) => n.id !== card.id);
    saveLocalNotes(local);
    syncDeleteToCloud(card.id);
    triggerDriveBackup(local);
  };

  // Geri Alma Aksiyonu
  const handleUndo = () => {
    if (!undoToast) return;
    clearTimeout(undoToast.timerId);
    const restoredItem = undoToast.item;
    
    // Kartı listeye geri yükle
    setCards((prev) => [restoredItem, ...prev]);
    setUndoToast(null);
    setStatusText('Not geri yüklendi');
    setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2000);
  };

  // Tek tek doğrudan silme fonksiyonu (kullanıcı çöp kutusuna basarak direkt silebilir)
  const directDeleteNote = (id: string) => {
    if (undoToast) {
      commitPendingDeletion(undoToast.item);
      clearTimeout(undoToast.timerId);
    }

    const targetCard = cards.find((c) => c.id === id);
    if (!targetCard) return;

    setCards((prev) => prev.filter((c) => c.id !== id));
    setSelectedCardIds((prev) => prev.filter((selectedId) => selectedId !== id));

    const timerId = setTimeout(async () => {
      await commitPendingDeletion(targetCard);
      setUndoToast(null);
    }, 5000);

    setUndoToast({ item: targetCard, timerId });
    setStatusText('Not silindi (Geri alabilirsiniz)');
  };

  // Çoklu seçim ile seçilen tüm notları silme
  const deleteSelectedNotes = async () => {
    if (selectedCardIds.length === 0) return;
    const count = selectedCardIds.length;
    
    if (undoToast) {
      commitPendingDeletion(undoToast.item);
      clearTimeout(undoToast.timerId);
      setUndoToast(null);
    }

    const targetsToDelete = cards.filter((c) => selectedCardIds.includes(c.id));
    setCards((prev) => prev.filter((c) => !selectedCardIds.includes(c.id)));
    setSelectedCardIds([]);
    setIsSelectMode(false);

    setStatusText(`${count} not siliniyor...`);

    // Hepsini kalıcı olarak sil
    for (const card of targetsToDelete) {
      await commitPendingDeletion(card);
    }

    setStatusText(`${count} not başarıyla silindi ✓`);
    setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
  };

  // Notu Paylaşma Özelliği (Web Share API ve Kopyalama Desteği)
  const shareNote = async (item: SimpleCardItem) => {
    let shareText = `${item.ikon || '📌'} ${item.baslik}`;
    if (item.zaman) {
      shareText += `\n⏰ Zaman: ${item.zaman}`;
    }
    if (item.anomali_notu) {
      shareText += `\n⚠️ Not: ${item.anomali_notu}`;
    }
    if (item.action_items && item.action_items.length > 0) {
      shareText += '\n\nGörevler:';
      item.action_items.forEach((t) => {
        shareText += `\n${t.is_completed ? '[✓]' : '[ ]'} ${t.task}`;
      });
    }
    shareText += '\n\n— Notivia ile paylaşıldı';

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.baslik,
          text: shareText,
        });
        setStatusText('Not paylaşıldı ✓');
        setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2000);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    // Web Share desteklenmiyorsa veya iptal edildiyse panoya kopyala
    try {
      await navigator.clipboard.writeText(shareText);
      setStatusText('Not metni panoya kopyalandı ✓');
      setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
    } catch {
      setStatusText('Paylaşım metni panoya kopyalanamadı');
    }
  };

  const deleteNote = (
    id: string,
    calendarEventId?: string | null,
    mediaId?: string | null
  ) => {
    // Geriye dönük uyumluluk için directDeleteNote'a yönlendir
    directDeleteNote(id);
  };

  // 2. Kartı Güncelleme (Lokal / Firestore)
  const updateNoteTitle = async (
    id: string,
    newTitle: string,
    calendarEventId?: string | null,
    icon: string = '📌'
  ) => {
    const cleanTitle = newTitle.trim();
    if (!cleanTitle) return;

    // Takvimde karşılığı varsa başlığı orada da sessizce güncelle
    if (calendarEventId) {
      updateCalendarEventTitle(calendarEventId, cleanTitle, icon);
    }

    const local = getLocalNotes();
    const target = local.find((n) => n.id === id);
    if (target) {
      target.baslik = cleanTitle;
      target.ikon = icon;
      saveLocalNotes(local);
      syncNoteToCloud(target);
      triggerDriveBackup(local);
    }
    
    // React state update (runs for both cloud and local)
    setCards((prev) =>
      prev.map((n) => (n.id === id ? { ...n, baslik: cleanTitle, ikon: icon } : n))
    );
  };

  // Kartı Detaylı Olarak Düzenleyip Kaydetme (Tüm Alanlar)
  const handleSaveEditedNote = async (updatedNote: SimpleCardItem) => {
    // Takvim başlık/ikon senkronu
    const calId = updatedNote.calendarEventId || updatedNote.calendar_event_id;
    if (calId) {
      updateCalendarEventTitle(calId, updatedNote.baslik, updatedNote.ikon || '📌');
    }

    // Cihaz hatırlatıcısı / alarm zamanlayıcısı senkronu
    if (updatedNote.tarih_iso && updatedNote.deviceNotificationEnabled !== false) {
      scheduleLocalDeviceReminder(
        updatedNote.id,
        updatedNote.baslik,
        updatedNote.tarih_iso,
        updatedNote.ikon || '📌',
        updatedNote.periyodik || null
      );
    } else {
      cancelScheduledReminder(updatedNote.id);
    }

    // Yerel depolama
    const local = getLocalNotes();
    const idx = local.findIndex((n) => n.id === updatedNote.id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updatedNote };
      saveLocalNotes(local);
      syncNoteToCloud(local[idx]);
      triggerDriveBackup(local);
    }

    // State güncelle
    setCards((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? { ...n, ...updatedNote } : n))
    );

    setStatusText(language === 'tr' ? 'Kart düzenlendi ve kaydedildi ✓' : 'Note updated and saved ✓');
    setTimeout(() => setStatusText(t.speakOrWrite), 2500);
  };

  // Kartın Hatırlatıcı Tarih/Saatini, Takvim ve Cihaz Bildirimini Güncelleme
  const updateNoteReminder = async (
    id: string,
    newDateIso: string | null,
    newZamanLabel: string | null,
    enableNotification: boolean = true,
    periyodik?: { tip: string; aralik_gun?: number } | null
  ) => {
    const local = getLocalNotes();
    const target = local.find((n) => n.id === id);
    if (target) {
      target.tarih_iso = newDateIso;
      target.zaman = newZamanLabel;
      target.deviceNotificationEnabled = enableNotification;
      if (periyodik !== undefined) {
        target.periyodik = periyodik;
      }
      if (newDateIso) {
        target.eksik_bilgi = false;
        target.soru = null;
        target.netlestirme_sorusu = null;
      }
      saveLocalNotes(local);
      syncNoteToCloud(target);
      triggerDriveBackup(local);
    }

    setCards((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          return {
            ...n,
            tarih_iso: newDateIso,
            zaman: newZamanLabel,
            deviceNotificationEnabled: enableNotification,
            periyodik: periyodik !== undefined ? periyodik : n.periyodik,
            eksik_bilgi: newDateIso ? false : n.eksik_bilgi,
            soru: newDateIso ? null : n.soru,
            netlestirme_sorusu: newDateIso ? null : n.netlestirme_sorusu,
          };
        }
        return n;
      })
    );

    // Bildirim aktifse cihaz için yerel zamanlayıcı kur veya iptal et
    if (newDateIso && enableNotification) {
      scheduleLocalDeviceReminder(
        id,
        target?.baslik || 'Notivia Hatırlatıcı',
        newDateIso,
        target?.ikon || '📌',
        periyodik || null
      );
    } else {
      cancelScheduledReminder(id);
    }

    setStatusText(
      newDateIso
        ? (language === 'tr' ? `Hatırlatıcı güncellendi: ${newZamanLabel || ''}` : `Reminder updated: ${newZamanLabel || ''}`)
        : (language === 'tr' ? 'Hatırlatıcı kaldırıldı' : 'Reminder removed')
    );
    setTimeout(() => setStatusText(t.speakOrWrite), 2500);
  };

  // View full image in modal
  const viewFullImage = async (mediaId: string) => {
    const base64 = await getLocalMedia(mediaId);
    if (base64) {
      setModalImgSrc(base64);
    }
  };

  // Global window bindings
  useEffect(() => {
    (window as any).deleteNote = deleteNote;
    (window as any).viewFullImage = viewFullImage;
    (window as any).updateNoteTitle = updateNoteTitle;
    (window as any).updateCalendarEventTitle = updateCalendarEventTitle;
    (window as any).addSubtaskToCard = addSubtaskToCard;
    return () => {
      delete (window as any).deleteNote;
      delete (window as any).viewFullImage;
      delete (window as any).updateNoteTitle;
      delete (window as any).updateCalendarEventTitle;
      delete (window as any).addSubtaskToCard;
    };
  }, [currentUser]);

  // Güvenli ve Konsolda Her Adımı Gösteren AI İşleme Fonksiyonu
  async function processWithAI(
    textInput: string = '',
    base64Image: string | null = null,
    isSpoken: boolean = false
  ) {
    const currentNow = new Date().toISOString();
    console.log("1. Girdi gönderiliyor:", textInput, "Zaman:", currentNow);

    let mediaId: string | null = null;
    if (base64Image) {
      mediaId = 'media_' + Date.now();
      await saveLocalMedia(mediaId, base64Image);
    }

    // Doğrudan saf JSON girilmişse doğrudan ekle
    if (textInput && textInput.trim().startsWith('{') && textInput.trim().endsWith('}')) {
      try {
        const directJson = JSON.parse(textInput.trim());
        if (directJson.baslik) {
          console.log("3. Ayrıştırılmış Veri (Doğrudan JSON):", directJson);
          const createdNote = { ...directJson, mediaId };
          await addNote(createdNote);
          if (isSpoken) {
            const whisper = generateWhisperText(createdNote);
            speakFeedback(whisper);
          }
          resetMicUI();
          return;
        }
      } catch {
        // JSON değilse normal akışa devam et
      }
    }

    // Sunucu tarafı Otonom Ajan Yönlendiricisini (Autonomous Dispatcher) çağır
    if (textInput && !base64Image) {
      try {
        const dRes = await fetch('/api/dispatch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: textInput,
            current_datetime: currentNow,
            userDomain: workDomain,
            preferredDomain: workDomain,
          }),
        });

        if (dRes.ok) {
          const dJson = await dRes.json();
          if (dJson.success && dJson.data) {
            const { tool, arguments: args, sesli_fisilti } = dJson.data;

            // 1. Takvim & Ajanda Okuyucu (get_calendar_events)
            if (tool === 'get_calendar_events') {
              const startMs = new Date(args.start_iso).getTime();
              const endMs = new Date(args.end_iso).getTime();
              const matching = cards.filter((c) => {
                if (!c.tarih_iso) return false;
                const t = new Date(c.tarih_iso).getTime();
                return t >= startMs && t <= endMs;
              });

              let whisper = args.sesli_fisilti || 'Ajandanız kontrol edildi.';
              if (matching.length === 0) {
                whisper = `${whisper} Belirtilen aralıkta herhangi bir planınız bulunmuyor.`;
              } else {
                whisper = `${whisper} ${matching.length} adet planınız var: ${matching.map((m) => m.baslik).join(', ')}`;
              }

              setCalendarQueryResults({
                sorgu_tipi: args.period_label || args.sorgu_tipi || 'bugun',
                start_iso: args.start_iso,
                end_iso: args.end_iso,
                matchingCount: matching.length,
                matchingNotes: matching,
                sesli_fisilti: whisper,
              });

              setStatusText(whisper);
              if (isSpoken) {
                speakFeedback(whisper);
              }
              resetMicUI();
              return;
            }

            // 2. İletişim & Taslak Hazırlayıcı (draft_message)
            if (tool === 'draft_message') {
              const alici = args.recipient || args.alici || 'İlgili Kişi';
              const kanal = args.channel || args.kanal || 'whatsapp';
              const konu = args.subject || args.konu || 'Bilgilendirme';
              const metin = args.message_body || args.metin || '';

              setDraftedMessage({
                alici,
                kanal,
                konu,
                metin,
                sesli_fisilti: args.sesli_fisilti || 'Mesaj taslağınız hazırlandı.',
              });

              const whisper = args.sesli_fisilti || `${alici} için ${kanal === 'email' ? 'e-posta' : 'mesaj'} taslağı hazırlandı.`;
              setStatusText(whisper);
              if (isSpoken) {
                speakFeedback(whisper);
              }
              resetMicUI();
              return;
            }

            // 3. Bilişsel Eylem & Not Oluşturucu (create_note_or_event)
            if (tool === 'create_note_or_event') {
              const isMissingTime = args.eksik_bilgi || (!args.zaman && !args.tarih_iso && (args.baslik?.toLowerCase().includes('randevu') || args.baslik?.toLowerCase().includes('görüşme') || args.baslik?.toLowerCase().includes('buluşma') || args.baslik?.toLowerCase().includes('toplantı')));
              const questionToAsk = args.soru || (isMissingTime ? 'Hangi gün ve saatte planlayalım?' : null);

              const createdNote = {
                baslik: args.baslik,
                zaman: isMissingTime ? null : args.zaman,
                tarih_iso: isMissingTime ? null : args.tarih_iso,
                hazirlik_zamani: args.hazirlik_zamani,
                hazirlik_iso: args.hazirlik_iso,
                action_items: args.action_items,
                anomali_notu: args.anomali_notu,
                eksik_bilgi: isMissingTime,
                soru: questionToAsk,
                ikon: args.ikon || '📌',
                renk: args.renk || '#FEF3C7',
                periyodik: args.periyodik,
                tetikleyici: args.tetikleyici,
                mediaId,
                isMicroTask: args.isMicroTask,
                isAlarm: args.isAlarm,
                sureDakika: args.sureDakika,
                deviceNotificationEnabled: args.deviceNotificationEnabled ?? (args.isAlarm || args.isMicroTask),
              };

              await addNote(createdNote);

              if (isMissingTime && questionToAsk) {
                setStatusText(questionToAsk);
                if (isSpoken) {
                  speakQuestion(questionToAsk, () => {
                    setTimeout(() => {
                      handleMicClick();
                    }, 300);
                  });
                }
              } else {
                const whisper = args.sesli_fisilti || generateWhisperText(createdNote);
                if (isSpoken) {
                  speakFeedback(whisper);
                }
              }
              resetMicUI();
              return;
            }
          }
        }
      } catch (dispErr) {
        console.warn('Otonom yönlendirici hatası, ayrıştırmaya devam ediliyor:', dispErr);
      }
    }

    // Sunucu tarafı proxy'yi çağır (GEMINI_API_KEY sunucuda güvenle saklanır)
    let parsedByServer = false;
    try {
      const sRes = await fetch('/api/parse-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: textInput,
          base64Image,
          current_datetime: currentNow,
          userDomain: workDomain,
          preferredDomain: workDomain,
          past_notes: cards.slice(0, 15).map((c) => ({
            baslik: c.baslik,
            zaman: c.zaman,
            tarih_iso: c.tarih_iso,
          })),
        }),
      });
      if (sRes.ok) {
        const sJson = await sRes.json();
        if (sJson.success && sJson.data) {
          console.log("2. AI Sunucu Çıktısı:", JSON.stringify(sJson.data));
          console.log("3. Ayrıştırılmış Veri:", sJson.data);
          const isMissingTime = sJson.data.eksik_bilgi || (!sJson.data.zaman && !sJson.data.tarih_iso && (sJson.data.baslik?.toLowerCase().includes('randevu') || sJson.data.baslik?.toLowerCase().includes('görüşme') || sJson.data.baslik?.toLowerCase().includes('buluşma') || sJson.data.baslik?.toLowerCase().includes('toplantı')));
          const questionToAsk = sJson.data.soru || (isMissingTime ? 'Hangi gün ve saatte planlayalım?' : null);

          const createdNote = {
            ...sJson.data,
            zaman: isMissingTime ? null : sJson.data.zaman,
            tarih_iso: isMissingTime ? null : sJson.data.tarih_iso,
            eksik_bilgi: isMissingTime,
            soru: questionToAsk,
            mediaId,
          };
          await addNote(createdNote);

          if (isMissingTime && questionToAsk) {
            setStatusText(questionToAsk);
            if (isSpoken) {
              speakQuestion(questionToAsk, () => {
                setTimeout(() => {
                  handleMicClick();
                }, 300);
              });
            }
          } else if (isSpoken) {
            const whisper = generateWhisperText(createdNote);
            speakFeedback(whisper);
          }
          parsedByServer = true;
        }
      }
    } catch {
      // Sunucuya erişilemezse yerel kural motoruna geç
    }

    if (!parsedByServer) {
      // Çevrimdışı / Hızlı Kural Motoru (Türkçe Doğal Dil Ayrıştırıcı)
      const fallback = extractSimpleNoteFromText(textInput, currentNow, cards.slice(0, 15), workDomain);
      console.log("2. Bilişsel Kural Motoru Devrede:", fallback);
      console.log("3. Ayrıştırılmış Veri:", fallback);
      const isMissingTime = fallback.eksik_bilgi || (!fallback.zaman && !fallback.tarih_iso && (fallback.baslik?.toLowerCase().includes('randevu') || fallback.baslik?.toLowerCase().includes('görüşme') || fallback.baslik?.toLowerCase().includes('buluşma') || fallback.baslik?.toLowerCase().includes('toplantı')));
      const questionToAsk = fallback.soru || (isMissingTime ? 'Hangi gün ve saatte planlayalım?' : null);

      const createdNote = {
        ...fallback,
        zaman: isMissingTime ? null : fallback.zaman,
        tarih_iso: isMissingTime ? null : fallback.tarih_iso,
        eksik_bilgi: isMissingTime,
        soru: questionToAsk,
        mediaId,
      };
      await addNote(createdNote);

      if (isMissingTime && questionToAsk) {
        setStatusText(questionToAsk);
        if (isSpoken) {
          speakQuestion(questionToAsk, () => {
            setTimeout(() => {
              handleMicClick();
            }, 300);
          });
        }
      } else if (isSpoken) {
        const whisper = generateWhisperText(createdNote);
        speakFeedback(whisper);
      }
    }
    resetMicUI();
  }

  processWithAIRef.current = processWithAI;
  (window as any).processWithAI = processWithAI;

  // Ses bittiğinde hem ses metnini hem bekleyen görseli gönder
  const onSpeechCompleted = async (spokenText: string) => {
    playMicDoneChime();
    const imageToSend = pendingImage || pendingCapturedImageRef.current;
    pendingCapturedImageRef.current = null; // Sıfırla
    setPendingImage(null);

    if (imageToSend) {
      setStatusText('Görsel ve ses teşhis ediliyor...');
    } else {
      setStatusText('Anlıyorum...');
    }
    await processWithAI(spokenText, imageToSend, true);
  };

  onSpeechCompletedRef.current = onSpeechCompleted;

  // Camera / Gallery Image Upload Handler
  const handleCameraChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatusText('Görsel işleniyor...');

    try {
      const compressed = await compressImage(file);
      pendingCapturedImageRef.current = compressed;
      setPendingImage(compressed);
      setStatusText('Görsel hazır. İster sesle anlat, ister doğrudan tıkla.');
      playMicListeningChime();

      // İsteğe bağlı olarak mikrofonu da dinlemeye al (kullanıcı konuşursa birlikte çözümlenir)
      if (recognitionRef.current && !isListening) {
        try {
          recognitionRef.current.start();
        } catch {
          // mikrofon açılamazsa görsel hazır kalır, kullanıcı tıklayabilir
        }
      }
    } catch (err) {
      console.error('Fotoğraf işleme hatası:', err);
      pendingCapturedImageRef.current = null;
      setPendingImage(null);
      setStatusText('Görsel işlenemedi');
      setTimeout(() => setStatusText('Söyle ya da fotoğrafını çek'), 2000);
    } finally {
      if (cameraInputRef.current) {
        cameraInputRef.current.value = '';
      }
    }
  };

  // Google Sign-In Handler
  const handleLogin = async () => {
    setStatusText('Google hesabı bağlanıyor...');
    
    try {
      // Modern mobil ve masaüstü tarayıcılarda kullanıcı tıklamasıyla tetiklenen popup en kararlı yöntemdir.
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user) {
        setCachedUser(result.user);
        setCurrentUser(result.user);
      }
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || null;
      if (token) {
        setGoogleAccessToken(token);
        console.log("Mevcut Google Token başarıyla alındı:", token);
        await syncFromDrive();
      }
      setStatusText('Google hesabı bağlandı ✓');
      setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
    } catch (err: any) {
      console.warn('Google giriş uyarısı / hatası:', err?.code, err?.message || err);
      
      if (err?.code === 'auth/popup-blocked') {
        setStatusText('Açılır pencere engellendi, yönlendiriliyor...');
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectErr: any) {
          setStatusText(`Yönlendirme hatası: ${redirectErr?.message || redirectErr?.code || 'Bilinmeyen hata'}`);
          setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 4000);
        }
      } else if (err?.code === 'auth/unauthorized-domain') {
        const currentHost = window.location.hostname;
        setStatusText(`Domain yetkisiz: Firebase Console'da "${currentHost}" eklenmeli`);
        alert(`Firebase Hatası: "${currentHost}" alan adı henüz Firebase Console > Authentication > Settings > Authorized domains bölümüne eklenmemiş.`);
        setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 5000);
      } else if (err?.code === 'auth/cancelled-popup-request' || err?.code === 'auth/popup-closed-by-user') {
        setStatusText('Giriş penceresi kapatıldı');
        setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
      } else {
        const msg = err?.message || err?.code || 'Giriş yapılamadı';
        setStatusText(`Giriş hatası: ${msg}`);
        setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 4500);
      }
    }
  };

  // Sign out (iframe uyumlu ve anında temizleyen güvenli çıkış)
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("SignOut bildirimi:", err);
    }
    setCachedUser(null);
    setGoogleAccessToken(null);
    setCurrentUser(null);
    setSimulatedUser(null);
    try {
      sessionStorage.removeItem('notivia_g_token');
      localStorage.removeItem(SIMULATED_USER_KEY);
    } catch {
      // ignore
    }
    setCards(getLocalNotes());
    setStatusText('Hesaptan çıkış yapıldı');
    setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2000);
  };

  const activeUser = currentUser || simulatedUser;
  const isCloudSync = !!activeUser;

  const filteredCards = cards.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.baslik.toLowerCase().includes(q) ||
      (item.zaman && item.zaman.toLowerCase().includes(q)) ||
      (item.teshis_notu && item.teshis_notu.toLowerCase().includes(q)) ||
      (item.anomali_notu && item.anomali_notu.toLowerCase().includes(q)) ||
      (item.baglantili_hatirlatma && item.baglantili_hatirlatma.toLowerCase().includes(q)) ||
      (item.ikon && item.ikon.toLowerCase().includes(q))
    );
  });

  return (
    <div className={`min-h-screen flex items-center justify-center antialiased select-none transition-colors duration-200 ${
      theme === 'dark' ? 'bg-stone-950 text-stone-100' : 'bg-stone-100 text-stone-800'
    }`}>
      {/* Masaüstünde telefon gibi ortalanan, mobilde tam ekran olan kapsayıcı */}
      <main className={`w-full max-w-md h-[100dvh] flex flex-col justify-between relative shadow-sm overflow-hidden sm:border transition-colors duration-200 ${
        theme === 'dark' ? 'bg-stone-900 sm:border-stone-800 text-stone-100' : 'bg-white sm:border-stone-200 text-stone-800'
      }`}>
        
        {/* Üst Bar: Başlık & Ayarlar */}
        <header className="px-6 pt-6 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <img
              src="/icon.svg"
              alt="Notivia Logo"
              className="w-7 h-7 rounded-lg shadow-xs ring-1 ring-stone-900/10 dark:ring-white/15 shrink-0 object-contain"
              width={28}
              height={28}
            />
            <h1 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>Notivia</h1>
          </div>

          <div id="auth-container" className="flex items-center gap-2">
            {/* Çoklu Seçim Modu Butonu */}
            <button
              type="button"
              onClick={() => {
                setIsSelectMode((prev) => !prev);
                setSelectedCardIds([]);
              }}
              title={isSelectMode ? t.exitMultiSelectTitle : t.multiSelectTitle}
              className={`p-1.5 rounded-full transition-colors ${
                isSelectMode 
                  ? 'text-stone-900 bg-amber-200' 
                  : theme === 'dark'
                  ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </button>

            {/* Arama Toggle */}
            <button
              type="button"
              onClick={() => {
                setShowSearch((prev) => !prev);
                if (showSearch) setSearchQuery('');
              }}
              title={t.searchTitle}
              className={`p-1.5 rounded-full transition-colors ${
                showSearch 
                  ? theme === 'dark' ? 'text-white bg-stone-800' : 'text-stone-900 bg-stone-200'
                  : theme === 'dark' ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Hızlı Metin Girişi Toggle */}
            <button
              type="button"
              onClick={handleToggleTextInput}
              title={t.keyboardToggleTitle}
              className={`p-1.5 rounded-full transition-colors ${
                showTextInput
                  ? theme === 'dark' ? 'text-white bg-stone-800' : 'text-stone-900 bg-stone-200'
                  : theme === 'dark' ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            {/* Ayarlar ve Profil Butonu (Focus-mode & User Request) */}
            <button
              id="user-avatar-btn"
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              title={t.settingsTitle}
              className={`relative p-1.5 rounded-full border transition-all active:scale-95 cursor-pointer ${
                theme === 'dark'
                  ? 'border-stone-700 bg-stone-800/80 text-stone-200 hover:bg-stone-700 hover:border-stone-600'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
              }`}
            >
              {activeUser ? (
                <div className="w-5 h-5 rounded-full overflow-hidden relative">
                  <img
                    id="user-avatar"
                    src={
                      activeUser.photoURL ||
                      `https://api.dicebear.com/7.x/identicon/svg?seed=${activeUser.uid}`
                    }
                    alt={activeUser.displayName || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                  {/* Minik ayar rozeti */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
                </div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Metin Girişi (Klavye Modu / Görev Listesi) */}
        {showTextInput && (
          <form onSubmit={handleManualTextSubmit} className="p-3 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 animate-in fade-in duration-150">
            <textarea
              id="manual-text-input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={`Maddeleri alt alta yazın veya yapıştırın (Enter ile yeni satır ekleyebilirsiniz):
- Süt al
- Faturayı öde
- Raporu gönder`}
              rows={3}
              className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl outline-none resize-none text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:ring-1 focus:ring-stone-400"
              autoFocus
              onKeyDown={(e) => {
                // Enter serbestçe alt satıra geçsin, Ctrl+Enter veya Cmd+Enter ile hızlı gönderilsin
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  handleManualTextSubmit(e);
                }
              }}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="submit"
                disabled={!textInput.trim()}
                className="px-3 py-1.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
              >
                Görev Listesi Oluştur
              </button>
            </div>
          </form>
        )}

        {/* Kart Listesi Alanı */}
        <section
          id="cards-container"
          className="flex-1 overflow-y-auto px-3.5 sm:px-5 py-2.5 sm:py-3 space-y-2.5 sm:space-y-3 pb-32"
        >
          {/* Gizlenebilir Arama Alanı */}
          <div
            id="search-bar-container"
            className={`transition-all duration-200 overflow-hidden mb-2 ${
              showSearch ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full text-xs px-3.5 py-2 border rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-400 ${
                theme === 'dark'
                  ? 'bg-stone-800/80 border-stone-700 text-stone-100 placeholder-stone-500'
                  : 'bg-stone-100/80 border-stone-200 text-stone-800'
              }`}
            />
          </div>

          {/* Çoklu Seçim ve Toplu Silme Barı */}
          {isSelectMode && (
            <div className="flex items-center justify-between bg-stone-900 text-white text-xs px-3.5 py-2.5 rounded-xl mb-3 shadow-sm animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedCardIds.length === filteredCards.length) {
                      setSelectedCardIds([]);
                    } else {
                      setSelectedCardIds(filteredCards.map((c) => c.id));
                    }
                  }}
                  className="text-stone-300 hover:text-white underline font-medium cursor-pointer"
                >
                  {selectedCardIds.length === filteredCards.length ? t.clearSelection : t.selectAll}
                </button>
                <span className="text-stone-400">({selectedCardIds.length} {t.selectedCount})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSelectMode(false);
                    setSelectedCardIds([]);
                  }}
                  className="px-2.5 py-1 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  {t.cancelSelection}
                </button>
                <button
                  type="button"
                  disabled={selectedCardIds.length === 0}
                  onClick={deleteSelectedNotes}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  {t.deleteSelected} ({selectedCardIds.length})
                </button>
              </div>
            </div>
          )}

          {filteredCards.length === 0 ? (
            <div className="text-center text-xs text-stone-400 mt-10">
              {searchQuery ? t.noSearchResults : t.emptyNotesDesc}
            </div>
          ) : (
            sortNotiviaCards(filteredCards).map((item) => {
              // Kartın süresinin dolup dolmadığını ve tamamlanma durumunu kontrol et
              const isExpired = item.tarih_iso ? new Date(item.tarih_iso).getTime() < Date.now() : false;
              const isCompleted = isCompletedCard(item);
              const isWeatherTriggered = 
                (item.tetikleyici?.sart === 'yagmur' && weather?.isRaining) ||
                (item.tetikleyici?.sart === 'don' && weather?.isFreezing);
              const cardBgColor = isWeatherTriggered ? '#FEE2E2' : (item.guncel_renk || item.renk || getCardColor(item.id, item.baslik));
              const isSelected = selectedCardIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`card p-3 sm:p-4 rounded-2xl flex flex-col gap-2 sm:gap-2.5 transition-all duration-300 hover:shadow-md ${
                    item.isRemoving ? 'scale-95 opacity-0' : 'scale-100'
                  } ${
                    isWeatherTriggered
                      ? 'ring-2 ring-red-500 bg-red-50 animate-pulse'
                      : isCompleted
                      ? 'opacity-70 saturate-50 border-solid border-stone-300/80 shadow-none'
                      : isExpired 
                      ? 'opacity-95 border-dashed border-amber-300/80 shadow-xs' 
                      : 'opacity-100 border-solid border-black/8 dark:border-white/10 shadow-xs'
                  } ${isSelected ? 'ring-2 ring-stone-800 dark:ring-stone-200' : ''}`}
                  style={{
                    backgroundColor: cardBgColor,
                    borderWidth: '1px',
                  }}
                >
                  {/* Üst Kısım: Başlık, İkon ve Hızlı İşlem Araç Çubuğu */}
                  <div className="flex items-start justify-between gap-1.5 sm:gap-2 w-full">
                    <div className="flex items-start gap-2 sm:gap-2.5 min-w-0 flex-1">
                      {/* Çoklu Seçim Modunda Seçim Kutucuğu */}
                      {isSelectMode && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCardIds((prev) =>
                              prev.includes(item.id)
                                ? prev.filter((id) => id !== item.id)
                                : [...prev, item.id]
                            );
                          }}
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs shrink-0 cursor-pointer transition-colors mt-0.5 ${
                            isSelected
                              ? 'bg-stone-900 border-stone-900 text-white'
                              : 'border-stone-400 bg-white/70 hover:bg-white text-transparent'
                          }`}
                          title={isSelected ? "Seçimi kaldır" : "Seç"}
                        >
                          ✓
                        </button>
                      )}

                      {/* İkon / Medya Rozeti */}
                      <div className="relative shrink-0">
                        {item.mediaId ? (
                          <CardMediaThumbnail
                            mediaId={item.mediaId}
                            onClick={() => viewFullImage(item.mediaId!)}
                          />
                        ) : (
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-black/15 border border-black/5 shadow-2xs select-none shrink-0 ${isCompleted ? 'grayscale opacity-60' : ''}`}>
                            <span className="text-lg sm:text-2xl">
                              {item.ikon || '📌'}
                            </span>
                          </div>
                        )}
                        {/* Küçük Durum Gösterge Noktası */}
                        {isWeatherTriggered ? (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white animate-ping" />
                        ) : isExpired ? (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" title="Süresi doldu" />
                        ) : isCompleted ? (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-stone-700 ring-2 ring-white flex items-center justify-center text-[7px] text-white">✓</span>
                        ) : null}
                      </div>

                      {/* Kart Başlığı ve Zaman Damgası */}
                      <div className="min-w-0 flex-1">
                        <h2
                          contentEditable={!isCompleted}
                          suppressContentEditableWarning={true}
                          spellCheck={false}
                          className={`font-semibold text-sm sm:text-base leading-snug tracking-tight outline-hidden break-words hyphens-auto ${
                            isCompleted
                              ? 'text-stone-500 line-through decoration-stone-500/70'
                              : isExpired
                              ? 'text-stone-800 cursor-text'
                              : 'text-stone-900 cursor-text'
                          }`}
                          style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              (e.currentTarget as HTMLElement).blur();
                            }
                          }}
                          onBlur={(e) => {
                            const newTitle = e.currentTarget.innerText?.trim();
                            if (newTitle && newTitle !== item.baslik) {
                              updateNoteTitle(
                                item.id,
                                newTitle,
                                item.calendarEventId || item.calendar_event_id,
                                item.ikon || '📌'
                              );
                            } else if (!newTitle) {
                              e.currentTarget.innerText = item.baslik;
                            }
                          }}
                        >
                          {item.baslik}
                        </h2>

                        {item.createdAt && (
                          <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono tracking-tight select-none mt-0.5 block">
                            {formatCreatedTime(item.createdAt, language)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Kart Aksiyonları Araç Çubuğu (Mobilde Rahat Dokunulabilir) */}
                    <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 bg-white/80 dark:bg-black/30 backdrop-blur-xs p-0.5 sm:p-1 rounded-xl border border-black/5 dark:border-white/10 shadow-2xs self-start">
                      {/* Kartı Düzenle Butonu (Kalem) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingNote(item);
                        }}
                        className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white/80 active:scale-95 transition-all cursor-pointer"
                        title={language === 'tr' ? 'Kartı Düzenle' : 'Edit Card'}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      {/* Hatırlatıcı, Cihaz Takvimi ve Bildirim Düzenleme Butonu */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveReminderEditCardId(activeReminderEditCardId === item.id ? null : item.id);
                        }}
                        className={`w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                          activeReminderEditCardId === item.id
                            ? 'bg-amber-500 text-white shadow-xs'
                            : item.tarih_iso
                            ? 'text-amber-800 bg-amber-100/90 hover:bg-amber-200 border border-amber-300/80 shadow-2xs'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                        }`}
                        title={language === 'tr' ? 'Hatırlatıcı & Takvim' : 'Reminder & Calendar'}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>

                      {/* Paylaş Butonu */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          shareNote(item);
                        }}
                        className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white/80 active:scale-95 transition-all cursor-pointer"
                        title={t.shareOrCopy}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>

                      {/* Direkt Silme Butonu (Çöp Kutusu) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          directDeleteNote(item.id);
                        }}
                        className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-stone-500 hover:text-red-600 hover:bg-red-50/80 active:scale-95 transition-all cursor-pointer"
                        title={t.deleteNoteTitle}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                      {/* Tamamlama Butonu (Tik) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCardCompleted(item.id);
                        }}
                        className={`w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                          isCompleted
                            ? 'bg-stone-800 border-stone-800 text-white shadow-xs'
                            : 'border-stone-300 bg-white/70 text-stone-600 hover:text-stone-900 hover:border-stone-400'
                        }`}
                        title={isCompleted ? t.reopenTitle : t.completeTitle}
                      >
                        <span className="text-xs font-bold">✓</span>
                      </button>
                    </div>
                  </div>

                  {/* Kart Gövdesi: Rozetler, Uyarılar ve Alt Görevler (Kartın Tam Genişliğini Kullanır) */}
                  <div className="w-full space-y-2">
                    {/* Kompakt Görsel İkon Çubuğu ve Meta Etiketler */}
                    <div className="flex items-center gap-1.5 flex-wrap w-full">
                      {isWeatherTriggered && (
                        <span className="text-[10px] font-bold text-red-700 bg-red-100/90 border border-red-300/80 px-2 py-0.5 rounded-md shadow-2xs flex items-center gap-1 shrink-0 animate-pulse">
                          <span>⚡</span>
                          <span>{item.tetikleyici?.sart === 'yagmur' ? 'Yağmur Başladı' : 'Hava 0°C Altı'}</span>
                        </span>
                      )}

                      {isExpired ? (
                        <span className="text-[10px] bg-stone-900/10 text-stone-700 px-2 py-0.5 rounded-md font-medium shrink-0 flex items-center gap-1 border border-black/5" title="Süresi doldu">
                          <span>⌛</span>
                          <span>{item.zaman || t.incompleteStatus}</span>
                        </span>
                      ) : (
                        <>
                          {/* Zaman / Hatırlatıcı İkonik Kapsülü */}
                          {item.tetikleyici?.etiket ? (
                            <span
                              className="text-[10px] bg-white/90 text-stone-800 font-semibold px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1 shadow-2xs border border-stone-900/10"
                              title={item.tetikleyici.sart ? `${t.conditionLabel}: ${item.tetikleyici.sart}` : undefined}
                            >
                              <span>📍</span>
                              <span>{item.tetikleyici.etiket}</span>
                            </span>
                          ) : item.zaman ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveReminderEditCardId(activeReminderEditCardId === item.id ? null : item.id);
                              }}
                              className="text-[11px] text-stone-800 hover:text-amber-950 font-medium flex items-center gap-1.5 bg-white/90 hover:bg-white px-2.5 py-1 rounded-md border border-stone-200/90 shadow-2xs hover:border-amber-400 transition-all cursor-pointer group shrink-0"
                              title={language === 'tr' ? 'Hatırlatıcı tarih/saat, takvim ve bildirimleri düzenle' : 'Edit reminder time, calendar & notification'}
                            >
                              <svg className="w-3.5 h-3.5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="font-medium">{item.zaman}</span>
                              <svg className="w-2.5 h-2.5 text-stone-400 group-hover:text-amber-700 shrink-0 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveReminderEditCardId(activeReminderEditCardId === item.id ? null : item.id);
                              }}
                              className="text-[10px] text-stone-500 hover:text-stone-800 font-medium flex items-center gap-1 bg-white/60 hover:bg-white px-2 py-0.5 rounded-md border border-dashed border-stone-300 hover:border-stone-400 transition-all cursor-pointer shrink-0"
                              title={language === 'tr' ? 'Hatırlatıcı ekle' : 'Add reminder'}
                            >
                              <svg className="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>+</span>
                            </button>
                          )}

                          {/* İkonik Mini Rozetler Grubu */}
                          <div className="flex items-center gap-1 shrink-0 flex-wrap">
                            {/* Cihaz Alarmı / Bildirimi İkonu */}
                            {item.tarih_iso && item.deviceNotificationEnabled !== false && (
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveReminderEditCardId(activeReminderEditCardId === item.id ? null : item.id);
                                }}
                                className="w-5.5 h-5.5 rounded-md bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-500/30 flex items-center justify-center cursor-pointer shadow-2xs transition-colors"
                                title={language === 'tr' ? 'Cihaz sesli alarmı devrede. Düzenlemek için tıkla' : 'Device audio alert active'}
                              >
                                <span className="text-[10px]">🔔</span>
                              </span>
                            )}

                            {/* Takvim Entegrasyonu İkonu */}
                            {(item.calendarEventId || item.calendar_event_id) && (
                              <span
                                className="w-5.5 h-5.5 rounded-md bg-white/80 text-stone-700 border border-stone-200 flex items-center justify-center shadow-2xs"
                                title={t.inCalendarBadge}
                              >
                                <span className="text-[10px]">📅</span>
                              </span>
                            )}

                            {/* Periyodik / Rutin İkonu */}
                            {item.periyodik && (
                              <span
                                className="h-5.5 px-1.5 rounded-md bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 flex items-center gap-0.5 text-[10px] font-medium shadow-2xs"
                                title={item.periyodik.tip === 'aylik_son_hafta' ? (language === 'tr' ? 'Ay Sonu Tekrarlı' : 'End of Month') : t.periodicBadge}
                              >
                                <span>🔄</span>
                              </span>
                            )}

                            {/* Hazırlık Zamanı İkonu */}
                            {item.hazirlik_zamani && (
                              <span
                                className="h-5.5 px-1.5 rounded-md bg-white/80 text-amber-900 border border-amber-300/40 flex items-center gap-0.5 text-[10px] font-medium shadow-2xs"
                                title={`${t.prepLeadTime}: ${item.hazirlik_zamani}`}
                              >
                                <span>⏳</span>
                                <span className="text-[9px]">{item.hazirlik_zamani}</span>
                              </span>
                            )}

                            {/* Bilişsel Alan İkonik Etiketi */}
                            {(() => {
                              const cardDomain = detectDomainFromNote(item);
                              if (cardDomain && cardDomain !== 'GENEL') {
                                const dTheme = DOMAIN_REGISTRY[cardDomain];
                                const domainOpt = WORK_DOMAIN_OPTIONS.find((opt) => opt.id === cardDomain);
                                const domainIcon = domainOpt?.icon || '🏷️';
                                return (
                                  <span
                                    className={`h-5.5 px-1.5 rounded-md text-[9px] font-medium shrink-0 flex items-center gap-0.5 shadow-2xs border ${dTheme?.badgeBg || 'bg-stone-100'} ${dTheme?.badgeText || 'text-stone-800'} border-black/10`}
                                    title={`Bilişsel Alan: ${dTheme?.displayName || cardDomain}`}
                                  >
                                    <span>{domainIcon}</span>
                                  </span>
                                );
                              }
                              return null;
                            })()}

                            {/* Cihaz Takvimine Aktar (.ics) */}
                            {item.tarih_iso && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  let rruleStr = undefined;
                                  if (item.periyodik) {
                                    if (item.periyodik.tip === 'gunluk') rruleStr = 'FREQ=DAILY';
                                    else if (item.periyodik.tip === 'haftalik') rruleStr = 'FREQ=WEEKLY';
                                    else if (item.periyodik.tip === 'aylik') rruleStr = 'FREQ=MONTHLY';
                                    else if (item.periyodik.tip === 'yillik') rruleStr = 'FREQ=YEARLY';
                                    else if (item.periyodik.tip === 'aylik_son_hafta') rruleStr = 'FREQ=MONTHLY;BYSETPOS=-1;BYDAY=MO,TU,WE,TH,FR'; 
                                  }
                                  exportToDeviceCalendar({
                                    title: `${item.ikon || '📌'} ${item.baslik}`,
                                    startDate: new Date(item.tarih_iso!),
                                    description: `Notivia: ${item.baslik}`,
                                    rrule: rruleStr
                                  });
                                  playNotificationChime();
                                  setStatusText(language === 'tr' ? 'Cihaz takvimine (.ics) aktarıldı' : 'Exported to device calendar (.ics)');
                                  setTimeout(() => setStatusText(t.speakOrWrite), 2500);
                                }}
                                className="w-5.5 h-5.5 rounded-md bg-white/80 hover:bg-white text-stone-700 border border-stone-200/90 flex items-center justify-center shadow-2xs cursor-pointer active:scale-95 transition-all"
                                title={t.exportDeviceCalendar}
                              >
                                <span className="text-[10px]">📲</span>
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Çakışma Uyarısı */}
                    {(item.conflictWith || item.conflictWarning) && (
                      <div className="flex items-center gap-1.5 text-xs text-amber-900 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-lg break-words">
                        <span className="shrink-0">⚠️</span>
                        <span className="leading-snug">'{item.conflictWith || item.conflictWarning}' {t.conflictsWith}</span>
                      </div>
                    )}

                    {/* Netleştirme Sorusu / Eksik Bilgi Uyarısı */}
                    {(item.eksik_bilgi || item.netlestirme_sorusu || item.soru) && (
                      <div className="flex items-start gap-1.5 bg-sky-500/10 text-sky-950 border border-sky-500/20 px-2.5 py-1.5 rounded-lg text-xs leading-snug break-words">
                        <span className="shrink-0 mt-0.5">❓</span>
                        <span className="font-medium">{item.netlestirme_sorusu || item.soru || 'Zaman bilgisi eksik'}</span>
                      </div>
                    )}

                    {/* Anomali veya Bilişsel Zeka Notu */}
                    {item.anomali_notu && (
                      <div className="flex items-start gap-1.5 bg-amber-500/10 text-amber-950 border border-amber-500/20 px-2.5 py-1.5 rounded-lg text-xs leading-relaxed break-words">
                        <span className="shrink-0 text-xs mt-0.5">💡</span>
                        <p className="font-normal">{item.anomali_notu}</p>
                      </div>
                    )}

                    {/* Alt Görevler: Görsel İlerleme Çubuğu ve Liste */}
                    {item.action_items && item.action_items.length > 0 && (() => {
                      const completedCount = item.action_items.filter(t => t.is_completed).length;
                      const totalCount = item.action_items.length;
                      const percent = Math.round((completedCount / totalCount) * 100);

                      return (
                        <div className="mt-1 pt-1.5 border-t border-black/5 dark:border-white/5">
                          <details className="group" open>
                            <summary className="flex items-center justify-between cursor-pointer list-none select-none py-1">
                              {/* İlerleme Çubuğu ve İkonik İndikatör */}
                              <div className="flex items-center gap-2 flex-1 mr-3">
                                <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1 shrink-0">
                                  <span>📋</span>
                                  <span>{completedCount}/{totalCount}</span>
                                </span>
                                {/* Görsel Mini Progress Bar */}
                                <div className="flex-1 max-w-[130px] h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-stone-800 dark:bg-stone-200 rounded-full transition-all duration-300"
                                    style={{ width: `${percent}%` }}
                                  />
                                </div>
                                <span className="text-[10px] font-mono text-stone-500">%{percent}</span>
                              </div>
                              <span className="text-[10px] text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>

                            <div className="mt-1.5 space-y-1 bg-white/50 dark:bg-black/20 p-2 rounded-xl border border-black/5 dark:border-white/5">
                              {item.action_items.map((task, tIdx) => (
                                <div
                                  key={tIdx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleActionItem(item.id, tIdx);
                                  }}
                                  className="flex items-start gap-2.5 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-white/70 dark:hover:bg-white/10 transition-colors group/task"
                                >
                                  {/* Özel Tiklenebilir Şekil */}
                                  <span className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center text-[11px] font-bold transition-colors shrink-0 mt-0.5 ${
                                    task.is_completed 
                                      ? 'bg-stone-800 border-stone-800 text-white shadow-2xs' 
                                      : 'border-stone-500 bg-white group-hover/task:border-stone-800 shadow-2xs'
                                  }`}>
                                    {task.is_completed ? '✓' : ''}
                                  </span>
                                  <span
                                    className={`text-xs sm:text-[13px] leading-relaxed select-none break-words flex-1 min-w-0 transition-all ${
                                      task.is_completed
                                        ? 'line-through text-stone-400 dark:text-stone-500 opacity-60'
                                        : 'text-stone-950 dark:text-white font-semibold'
                                    }`}
                                    style={{ color: task.is_completed ? undefined : '#09090b' }}
                                  >
                                    {task.task}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </details>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Kart İçi Hatırlatıcı, Cihaz Takvimi ve Bildirim Düzenleme Paneli */}
                  <CardReminderEditor
                    note={item}
                    isOpen={activeReminderEditCardId === item.id}
                    onClose={() => setActiveReminderEditCardId(null)}
                    onSaveReminder={updateNoteReminder}
                    language={language}
                  />
                </div>
              );
            })
          )}
        </section>

        {/* Alt Kontrol Barı (Kamera + Mikrofon + Klavye) */}
        <footer className={`absolute bottom-0 inset-x-0 p-6 flex flex-col items-center bg-gradient-to-t pointer-events-auto transition-colors duration-200 ${
          theme === 'dark'
            ? 'from-stone-900 via-stone-900/95 to-transparent'
            : 'from-white via-white/95 to-transparent'
        }`}>
          {/* Bekleyen Görsel Önizleme Kartı */}
          {pendingImage && (
            <div
              id="pending-image-card"
              className="w-full mb-3 p-2.5 bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/80 rounded-2xl flex items-center justify-between gap-3 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={pendingImage}
                  alt="Önizleme"
                  onClick={() => setModalImgSrc(pendingImage)}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-300 dark:border-amber-700 shrink-0 cursor-pointer shadow-xs active:scale-95"
                  title="Büyütmek için tıkla"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-amber-950 dark:text-amber-100 truncate flex items-center gap-1">
                    <span>📷</span> <span>Görsel Yüklendi</span>
                  </p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 truncate">
                    İster sesle anlat, ister hemen teşhis et
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  id="diagnose-pending-image-btn"
                  onClick={async () => {
                    const img = pendingImage;
                    setPendingImage(null);
                    pendingCapturedImageRef.current = null;
                    setStatusText('Görsel teşhis ediliyor...');
                    await processWithAI(textInput.trim(), img, true);
                    setTextInput('');
                  }}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>✨ Teşhis Et</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPendingImage(null);
                    pendingCapturedImageRef.current = null;
                    setStatusText('Söyle, çek ya da yaz');
                  }}
                  className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg cursor-pointer text-sm"
                  title="Görseli İptal Et"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Metin Giriş Formu (Açılır/Kapanır) */}
          <form
            id="text-input-form"
            onSubmit={handleManualTextSubmit}
            className={`w-full mb-3 flex items-center gap-2 p-1.5 pl-3 rounded-2xl border shadow-sm transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-stone-800 border-stone-700 text-stone-100'
                : 'bg-stone-50 border-stone-200 text-stone-800'
            } ${
              showTextInput ? 'opacity-100 scale-100' : 'hidden opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <input
              id="manual-text-input"
              ref={manualTextInputRef}
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={t.manualInputPlaceholder}
              className="flex-1 bg-transparent text-sm outline-hidden py-1"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              {t.addButton}
            </button>
          </form>

          {/* Sesli Asistan Durum ve Dalga Göstergesi */}
          {isListening ? (
            <div className="mb-3 px-3.5 py-1.5 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/80 rounded-full flex items-center gap-2.5 shadow-sm animate-in fade-in duration-200">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-tight">
                {statusText || 'Dinliyorum...'}
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                <span className="w-0.5 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: '600ms', animationDelay: '0ms' }} />
                <span className="w-0.5 h-3.5 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: '600ms', animationDelay: '150ms' }} />
                <span className="w-0.5 h-2.5 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: '600ms', animationDelay: '300ms' }} />
                <span className="w-0.5 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: '600ms', animationDelay: '75ms' }} />
              </div>
            </div>
          ) : statusText && statusText !== 'Söyle, çek ya da yaz' ? (
            <div className="mb-2 px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[11px] font-medium rounded-full border border-stone-200 dark:border-stone-700 shadow-2xs animate-in fade-in duration-200 max-w-[280px] truncate text-center">
              {statusText}
            </div>
          ) : null}

          <div className="flex items-center gap-4">
            {/* Kamera / Galeri Butonu */}
            <label
              htmlFor="camera-input"
              className={`w-12 h-12 border rounded-full flex items-center justify-center shadow-xs active:scale-90 transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                  : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200/80'
              }`}
              title={t.cameraTitle}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
            <input
              id="camera-input"
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleCameraChange}
            />

            {/* Ana Mikrofon Butonu */}
            <div className="relative flex items-center justify-center">
              {isListening && (
                <>
                  <span className="absolute -inset-2.5 rounded-full bg-red-400/30 animate-ping pointer-events-none" />
                  <span className="absolute -inset-1 rounded-full bg-red-500/20 animate-pulse pointer-events-none" />
                </>
              )}
              <button
                id="mic-btn"
                type="button"
                onClick={handleMicClick}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all duration-200 cursor-pointer ${
                  isListening
                    ? 'bg-red-500 scale-105 text-white shadow-red-500/30'
                    : theme === 'dark' ? 'bg-white text-stone-900 hover:bg-stone-100' : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                <Mic
                  id="mic-icon"
                  className="w-7 h-7"
                />
              </button>
            </div>

            {/* Klavye / Metin Girişi Toggle Butonu */}
            <button
              id="keyboard-toggle-btn"
              type="button"
              onClick={handleToggleTextInput}
              title={t.keyboardToggleTitle}
              className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-xs active:scale-90 transition-all cursor-pointer ${
                showTextInput
                  ? theme === 'dark' ? 'bg-white text-stone-900 border-white' : 'bg-stone-800 text-white border-stone-800'
                  : theme === 'dark' ? 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700' : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/70'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        </footer>

        {/* Geri Alma (Undo Toast) Bildirimi */}
        {undoToast && (
          <div className="absolute bottom-28 inset-x-6 z-30 flex items-center justify-between bg-stone-900 text-white text-xs px-4 py-2.5 rounded-2xl shadow-xl border border-stone-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="text-red-400 font-bold">🗑</span>
              <span className="truncate">"{undoToast.item.baslik}" {t.deletedToast}</span>
            </div>
            <button
              type="button"
              onClick={handleUndo}
              className="text-amber-300 hover:text-amber-200 font-bold shrink-0 ml-3 underline decoration-amber-400/50 hover:decoration-amber-300 transition-colors cursor-pointer"
            >
              {t.undoButton}
            </button>
          </div>
        )}

      </main>

      {/* Gizlenebilir Manuel Ekleme Çekmecesi */}
      {showManualModal && (
        <div
          className="fixed inset-0 bg-stone-900/40 z-40 backdrop-blur-2xs transition-opacity"
          onClick={closeManualModal}
        />
      )}
      <div
        id="manual-modal"
        className={`fixed inset-x-0 bottom-0 max-w-md mx-auto rounded-t-3xl p-6 shadow-2xl border-t z-50 transition-transform duration-300 ${
          theme === 'dark'
            ? 'bg-stone-900 border-stone-800 text-stone-100'
            : 'bg-white border-stone-200 text-stone-900'
        } ${
          showManualModal ? 'translate-y-0' : 'translate-y-full hidden'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{t.manualModalTitle}</h3>
          <button
            type="button"
            onClick={closeManualModal}
            className="text-stone-400 hover:text-stone-700 text-sm p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form id="manual-create-form" onSubmit={handleManualCreateSubmit} className="space-y-3">
          <input
            id="manual-title"
            type="text"
            value={manualTitle}
            onChange={(e) => setManualTitle(e.target.value)}
            placeholder={t.manualModalTitlePlaceholder}
            required
            className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-400 ${
              theme === 'dark'
                ? 'bg-stone-800 border-stone-700 text-stone-100 placeholder-stone-500'
                : 'bg-stone-50 border-stone-200 text-stone-800'
            }`}
          />

          <input
            id="manual-datetime"
            type="datetime-local"
            value={manualDatetime}
            onChange={(e) => setManualDatetime(e.target.value)}
            className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-hidden ${
              theme === 'dark'
                ? 'bg-stone-800 border-stone-700 text-stone-200'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
          />

          <div className="flex items-center justify-between px-1 py-1">
            <label className={`text-xs flex items-center gap-2 cursor-pointer ${
              theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
            }`}>
              <input
                id="manual-sync-cal"
                type="checkbox"
                checked={manualSyncCal}
                onChange={(e) => setManualSyncCal(e.target.checked)}
                className="rounded text-stone-900"
              />
              {t.syncToGoogleCalendar}
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl text-xs font-semibold active:scale-95 transition-transform cursor-pointer"
          >
            {t.saveButton}
          </button>
        </form>
      </div>

      {/* Görsel Büyütme Modalı */}
      <div
        id="image-modal"
        className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer transition-opacity duration-200 ${
          modalImgSrc ? 'opacity-100' : 'hidden opacity-0 pointer-events-none'
        }`}
        onClick={() => setModalImgSrc(null)}
      >
        {modalImgSrc && (
          <img
            id="modal-img"
            src={modalImgSrc}
            alt="Büyütülmüş Görsel"
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
          />
        )}
      </div>

      {/* PWA Çevrimdışı Durum Göstergesi */}
      <OfflineIndicator />

      {/* Otonom Ajan: İletişim & Taslak Mesaj Modalı (draft_message) */}
      {draftedMessage && (
        <div
          id="draft-message-modal"
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                  ✉️ İletişim Taslağı ({draftedMessage.kanal.toUpperCase()})
                </span>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mt-1">
                  Kime: {draftedMessage.alici}
                </h3>
                {draftedMessage.konu && (
                  <p className="text-xs text-stone-500 dark:text-stone-400">Konu: {draftedMessage.konu}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setDraftedMessage(null)}
                className="w-7 h-7 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-800/80 rounded-xl border border-stone-200/80 dark:border-stone-700/80 text-sm text-stone-800 dark:text-stone-200 leading-relaxed select-all whitespace-pre-wrap">
              {draftedMessage.metin}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(draftedMessage.metin);
                  setStatusText('Metin panoya kopyalandı ✓');
                  setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
                }}
                className="flex-1 py-2 px-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl active:scale-95 transition-all text-center cursor-pointer"
              >
                📋 Metni Kopyala
              </button>

              {draftedMessage.kanal === 'email' ? (
                <a
                  href={`mailto:?subject=${encodeURIComponent(draftedMessage.konu || 'Bilgilendirme')}&body=${encodeURIComponent(draftedMessage.metin)}`}
                  className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl active:scale-95 transition-all text-center"
                >
                  ✉️ E-postayı Aç
                </a>
              ) : (
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(draftedMessage.metin)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl active:scale-95 transition-all text-center"
                >
                  🟢 WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Otonom Ajan: Takvim & Ajanda Sorgu Sonucu Modalı (get_calendar_events) */}
      {calendarQueryResults && (
        <div
          id="calendar-query-modal"
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  🗓️ Ajanda Taraması
                </span>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mt-1">
                  {calendarQueryResults.sorgu_tipi === 'bugun'
                    ? 'Bugünkü Programınız'
                    : calendarQueryResults.sorgu_tipi === 'yarin'
                    ? 'Yarınki Randevularınız'
                    : 'Takvim Planlarınız'}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {calendarQueryResults.matchingCount === 0
                    ? 'Belirtilen zaman aralığında kayıtlı plan bulunamadı.'
                    : `Toplam ${calendarQueryResults.matchingCount} kayıt tespit edildi:`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCalendarQueryResults(null)}
                className="w-7 h-7 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {calendarQueryResults.matchingCount > 0 ? (
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {calendarQueryResults.matchingNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-2.5 rounded-xl border border-stone-200/80 dark:border-stone-700/80 bg-stone-50 dark:bg-stone-800/60 flex items-center gap-3"
                  >
                    <span className="text-xl shrink-0">{note.ikon || '📌'}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {note.baslik}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                        {note.zaman || 'Saat belirtilmemiş'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-500">
                Bu zaman aralığı için ajandanız tamamen boş.
              </div>
            )}

            <button
              type="button"
              onClick={() => setCalendarQueryResults(null)}
              className="w-full py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      {/* Ekran Üstü Canlı Bildirim Kartı (Push Banner Toast) */}
      {activeBannerNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-60 w-full max-w-sm px-4 pointer-events-auto">
          <div className={`backdrop-blur-md p-3.5 rounded-2xl shadow-2xl flex items-start gap-3 animate-in slide-in-from-top-4 duration-250 ${
            activeBannerNotification.isAlarm
              ? 'bg-red-950/95 text-white border-2 border-red-500 ring-4 ring-red-500/20 animate-pulse'
              : 'bg-stone-900/95 dark:bg-stone-100/95 text-white dark:text-stone-900 border border-stone-700/80 dark:border-stone-300/80'
          }`}>
            <span className={`text-2xl shrink-0 leading-none mt-0.5 ${activeBannerNotification.isAlarm ? 'animate-bounce' : ''}`}>
              {activeBannerNotification.icon || (activeBannerNotification.isAlarm ? '⏰' : '🔔')}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-xs font-bold truncate tracking-tight flex items-center gap-1.5">
                  <span>{activeBannerNotification.title}</span>
                  {activeBannerNotification.isAlarm && (
                    <span className="text-[9px] bg-red-500 text-white font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                      Alarm
                    </span>
                  )}
                </h4>
                <span className="text-[10px] opacity-60 shrink-0 font-medium">Notivia</span>
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed mt-0.5 line-clamp-2">{activeBannerNotification.body}</p>

              {activeBannerNotification.isAlarm && (
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      alarmSound.stopAlarm();
                      setActiveBannerNotification(null);
                    }}
                    className="w-full py-1.5 px-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>⏹️</span>
                    <span>{language === 'tr' ? 'Alarmı Kapat / Sustur' : 'Stop Alarm'}</span>
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                if (activeBannerNotification.isAlarm) {
                  alarmSound.stopAlarm();
                }
                setActiveBannerNotification(null);
              }}
              aria-label="Kapat"
              className="text-stone-400 hover:text-white dark:hover:text-stone-900 p-1 rounded-md transition-colors cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* useAlarmWatcher Aktif Alarm Kartı */}
      {activeAlarm && (
        <div className="fixed top-4 left-4 right-4 max-w-md mx-auto z-50 p-4 bg-red-600 text-white rounded-2xl shadow-2xl flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3 min-w-0 mr-2">
            <span className="text-3xl shrink-0">{activeAlarm.ikon || '⏰'}</span>
            <div className="min-w-0">
              <h4 className="font-bold text-lg leading-tight truncate">{activeAlarm.baslik}</h4>
              <p className="text-xs text-red-100 font-medium">
                {language === 'tr' ? 'Süre doldu!' : "Time's up!"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={dismissAlarm}
            className="bg-white text-red-600 font-bold px-4 py-2 rounded-xl shadow active:scale-95 transition-transform cursor-pointer shrink-0 hover:bg-red-50"
          >
            {language === 'tr' ? 'Kapat' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Kart Düzenleme Modalı */}
      <EditNoteModal
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        note={editingNote}
        onSave={handleSaveEditedNote}
        language={language}
      />

      {/* Ayarlar ve Profil Modalı */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activeUser={activeUser}
        onLogin={handleLogin}
        onSignOut={handleSignOut}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        language={language}
        onSelectLanguage={handleSelectLanguage}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={handleToggleNotifications}
        notificationSupported={typeof window !== 'undefined' && 'Notification' in window}
        onSendTestNotification={handleSendTestNotification}
        onRemindTodayTasks={handleRemindTodayTasks}
        workDomain={workDomain}
        onSelectWorkDomain={handleSelectWorkDomain}
        onSyncDrive={syncFromDrive}
        isSyncingDrive={isSyncingDrive}
        driveSyncTime={driveSyncTime}
      />
    </div>
  );
}
