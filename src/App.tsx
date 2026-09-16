import React, { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';
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
  type User,
} from './firebase.ts';
import { extractSimpleNoteFromText } from './utils/simpleNote.ts';
import { getCardColor } from './utils/cardColors.ts';
import { checkEpisodicMemory } from './utils/episodicMemory.ts';
import type { ActionItem } from './types/notivia.ts';
import {
  exportToDeviceCalendar,
  getGoogleCalendarWebUrl,
  scheduleLocalDeviceReminder,
  requestDeviceNotificationPermission,
  playNotificationChime,
  showSystemNotification,
  scheduleAllCardReminders,
  clearAllScheduledReminders,
  triggerDailyAssistantSummary,
  testAssistantNotification,
  playMicListeningChime,
  playMicDoneChime,
} from './utils/deviceCalendar.ts';
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
import { PWAInstallButton } from './components/PWAInstallButton.tsx';
import { OfflineIndicator } from './components/OfflineIndicator.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
import { translations, type Language } from './utils/i18n.ts';

export interface SimpleCardItem {
  id: string;
  baslik: string;
  zaman?: string | null;
  tarih_iso?: string | null;
  tetikleyici?: {
    tip: string | null;
    sart: string;
    etiket: string;
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

// 1. Türkçe Doğal Sesli Fısıltı (TTS)
function speakFeedback(phrase: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  // Önceki ses kuyruğunu anında kes
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang = 'tr-TR';
  utterance.rate = 1.05; // Seri ve modern konuşma hızı
  utterance.pitch = 1.0;

  // Varsa Türkçe ses profilini seç
  const voices = window.speechSynthesis.getVoices();
  const trVoice = voices.find((v) => v.lang.startsWith('tr'));
  if (trVoice) {
    utterance.voice = trVoice;
  }

  window.speechSynthesis.speak(utterance);
}

// 2. Nota Göre 3-4 Kelimelik Kısa Doğrulama Metni Üretici
function generateWhisperText(note: {
  baslik: string;
  zaman?: string | null;
  calendarEventId?: string | null;
  tetikleyici?: { etiket: string } | null;
}): string {
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
  const [cards, setCards] = useState<SimpleCardItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [simulatedUser, setSimulatedUser] = useState<any>(null);
  const [statusText, setStatusText] = useState<string>('Söyle, çek ya da yaz');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showTextInput, setShowTextInput] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null);

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

  // Ekran üstü anlık asistan bildirim bildirici (Push Banner)
  const [activeBannerNotification, setActiveBannerNotification] = useState<{
    title: string;
    body: string;
    icon?: string;
  } | null>(null);

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

  // Kartlar güncellendiğinde veya bildirimler açıkken alarmları sisteme kur
  useEffect(() => {
    if (notificationsEnabled && cards.length > 0) {
      scheduleAllCardReminders(cards);
    }
  }, [cards, notificationsEnabled]);

  // Uygulama içi push bildirim başlığı dinleyicisi
  useEffect(() => {
    const handleInAppNotif = (e: any) => {
      const detail = e.detail;
      if (detail && notificationsEnabled) {
        setActiveBannerNotification({
          title: detail.title || 'Notivia Bildirimi',
          body: detail.body || '',
          icon: detail.icon || '🔔',
        });
        const timer = window.setTimeout(() => {
          setActiveBannerNotification(null);
        }, 4500);
        return () => window.clearTimeout(timer);
      }
    };

    window.addEventListener('notivia_notification', handleInAppNotif);
    return () => window.removeEventListener('notivia_notification', handleInAppNotif);
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

  // Load initial notes (local mode)
  const getLocalNotes = (): SimpleCardItem[] => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
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

  const saveLocalNotes = (notes: SimpleCardItem[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore
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
    setStatusText("Drive'dan notlar yükleniyor...");
    try {
      const driveResult = await loadNotesFromGoogleDrive();
      if (driveResult.success && driveResult.notes) {
        const local = getLocalNotes();
        // Eğer Drive'da yedek dosyası varsa ve boş değilse
        if (driveResult.notes.length > 0) {
          // Drive'daki notlar ile lokali birleştir (ID eşleşmelerine göre)
          const mergedMap = new Map<string, SimpleCardItem>();
          // Önce drive verisini ekle
          driveResult.notes.forEach((n) => mergedMap.set(n.id, n));
          // Sonra lokaldeki yeni olanları koru
          local.forEach((n) => mergedMap.set(n.id, n));
          const mergedList = Array.from(mergedMap.values());
          setCards(mergedList);
          saveLocalNotes(mergedList);
          // Drive'ı güncel son haliyle besle
          await saveNotesToGoogleDrive(mergedList);
        } else if (local.length > 0) {
          // Drive'da henüz dosya yok ama yerelde notlar varsa, ilk yedeklemeyi yap
          await saveNotesToGoogleDrive(local);
          setCards(local);
        } else {
          setCards([]);
        }
        setDriveSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setStatusText("Google Drive ile eşitlendi ✓");
        setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
      }
    } catch (err) {
      console.warn("Drive sync hatası:", err);
      setStatusText("Drive senkronizasyonunda sorun oluştu");
      setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
    } finally {
      setIsSyncingDrive(false);
    }
  };

  // Firebase Auth (Sadece Google Giriş Protokolü) & Google Drive Senkronizasyonu
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
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken || null;
        if (token) {
          setGoogleAccessToken(token);
          console.log("Mevcut Google Token başarıyla alındı (Redirect):", token);
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

        if (user) {
          // Google hesabı bağlandı. Notlar Firestore'a ASLA kaydedilmez.
          // Doğrudan kullanıcının Google Drive'ındaki dosyadan yüklenir ve yedeklenir.
          await syncFromDrive();
        } else {
          setCards(getLocalNotes());
        }
      });

      return () => {
        isMounted = false;
        unsubscribeAuth();
      };
    } catch {
      setCards(getLocalNotes());
    }
  }, []);

  // Web Speech API Voice Recognition setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'tr-TR';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
          playMicListeningChime();
          if (pendingCapturedImageRef.current) {
            setStatusText('Görsel hazır. Bir şey söyleyecek misin?');
          } else {
            setStatusText('Dinliyorum...');
          }
        };

        recognition.onresult = async (event: any) => {
          const spoken = event.results?.[0]?.[0]?.transcript;
          if (spoken && onSpeechCompletedRef.current) {
            await onSpeechCompletedRef.current(spoken);
          } else if (pendingCapturedImageRef.current) {
            const imageToSend = pendingCapturedImageRef.current;
            pendingCapturedImageRef.current = null;
            setStatusText('Görsel teşhis ediliyor...');
            resetMicUI();
            if (processWithAIRef.current) {
              await processWithAIRef.current('', imageToSend);
            }
          } else {
            resetMicUI();
          }
        };

        recognition.onerror = async (e: any) => {
          console.warn('SpeechRecognition bildirimi:', e?.error || e);
          const imageToSend = pendingCapturedImageRef.current;
          if (imageToSend) {
            pendingCapturedImageRef.current = null;
            setStatusText('Görsel teşhis ediliyor...');
            resetMicUI();
            if (processWithAIRef.current) {
              await processWithAIRef.current('', imageToSend);
            }
          } else {
            resetMicUI();
          }
        };

        recognition.onend = async () => {
          setIsListening(false);
          const imageToSend = pendingCapturedImageRef.current;
          if (imageToSend) {
            pendingCapturedImageRef.current = null;
            setStatusText('Görsel teşhis ediliyor...');
            resetMicUI();
            if (processWithAIRef.current) {
              await processWithAIRef.current('', imageToSend);
            }
          } else {
            resetMicUI();
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

  // Butona basıldığında giriş alanını aç/kapa
  const handleToggleTextInput = () => {
    if (showManualModal) {
      closeManualModal();
    } else {
      openManualModal();
    }
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

  // Metin girilip enter/ekle yapıldığında
  const handleManualTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = textInput.trim();
    if (!text) return;

    // Giriş kutusunu sıfırla ve kapat
    setTextInput('');
    setShowTextInput(false);
    setStatusText('Yapay zeka çözümlüyor...');

    try {
      // Mevcut bilişsel motora gönder (yazılı girdi olduğu için sesli fısıltı kapalı)
      await processWithAI(text, null, false);
    } catch (error) {
      console.error("Yazılı girdi işleme hatası:", error);
      const parsed = extractSimpleNoteFromText(text);
      await addNote(parsed);
    } finally {
      setStatusText('Söyle, çek ya da yaz');
    }
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

  // Yeni bir girdi geldiğinde pasif koşullu kartları tarama
  const checkReactiveTriggers = (newInputText: string, existingCards: SimpleCardItem[]) => {
    const lowerInput = newInputText.toLowerCase();
    
    return existingCards.filter(card => {
      if (!card.tetikleyici || !card.tetikleyici.sart) return false;
      
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
    tetikleyici?: {
      tip: string | null;
      sart: string;
      etiket: string;
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
    periyodik?: {
      tip: string;
      aralik_gun?: number;
      bir_sonraki_tarih_iso?: string;
    } | null;
  }) => {
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

    // Optimistic immediate update to local UI state & localStorage
    setCards((prev) => [newCard, ...prev.filter((c) => c.id !== tempId)]);
    const local = getLocalNotes().filter((c) => c.id !== tempId);
    local.unshift(newCard);
    saveLocalNotes(local);

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
      triggerDriveBackup(local);
    }
  };

  // Kalıcı silmeyi gerçekleştiren çekirdek fonksiyon
  const commitPendingDeletion = async (card: SimpleCardItem) => {
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
      triggerDriveBackup(local);
    }
    
    // React state update (runs for both cloud and local)
    setCards((prev) =>
      prev.map((n) => (n.id === id ? { ...n, baslik: cleanTitle, ikon: icon } : n))
    );
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
    return () => {
      delete (window as any).deleteNote;
      delete (window as any).viewFullImage;
      delete (window as any).updateNoteTitle;
      delete (window as any).updateCalendarEventTitle;
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

    const promptContent = `CURRENT_DATETIME: ${currentNow}
Kullanıcı Girdisi: "${textInput}"

GÖREV:
1. Kullanıcı "yarın", "cuma" gibi bir gün söyleyip saat vermediyse varsayılan saat olarak "09:00:00" ata.
2. "tarih_iso" alanını KESİNLİKLE hesapla (Format: YYYY-MM-DDTHH:mm:ss). Asla null bırakma.

BİLİŞSEL ALT GÖREVLER (Action Items):
- Kullanıcının belirttiği ana işin (muayene, seyahat, resmi başvuru, bakım, randevu) gerektirdiği 2-3 somut alt adımı belirle.
- "action_items": [ { "task": "Kısa alt görev metni", "is_completed": false } ] formatında dizi olarak döndür.
- Alt görev gerektirmeyen basit durumlarda boş dizi [] dön.

3. Sadece saf JSON üret:
{
  "baslik": "Kısa eylem başlığı",
  "zaman": "Arayüz zaman metni (örn: Yarın 09:00)",
  "tarih_iso": "2026-09-16T09:00:00",
  "action_items": [
    { "task": "Kısa alt görev metni", "is_completed": false }
  ],
  "ikon": "📌",
  "renk": "#FEF3C7"
}`;

    const GEMINI_API_KEY = (window as any).GEMINI_API_KEY || '';

    // İstemcide özel bir anahtar tanımlıysa doğrudan dene
    if (GEMINI_API_KEY && GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: promptContent },
                ...(base64Image ? [{ inlineData: { mimeType: "image/jpeg", data: base64Image.split(",")[1] } }] : [])
              ]
            }]
          })
        });

        if (res.ok) {
          const data = await res.json();
          const rawResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawResult) {
            console.log("2. AI Ham Çıktı (İstemci):", rawResult);
            const cleanResult = rawResult.replace(/```json/gi, "").replace(/```/g, "").trim();
            const parsedData = JSON.parse(cleanResult);
            console.log("3. Ayrıştırılmış Veri:", parsedData);
            const createdNote = { ...parsedData, mediaId };
            await addNote(createdNote);
            if (isSpoken) {
              const whisper = generateWhisperText(createdNote);
              speakFeedback(whisper);
            }
            resetMicUI();
            return;
          }
        }
      } catch (clientErr) {
        console.warn("İstemci Gemini denemesi başarısız, sunucuya geçiliyor:", clientErr);
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
              const createdNote = {
                baslik: args.baslik,
                zaman: args.zaman,
                tarih_iso: args.tarih_iso,
                hazirlik_zamani: args.hazirlik_zamani,
                hazirlik_iso: args.hazirlik_iso,
                action_items: args.action_items,
                anomali_notu: args.anomali_notu,
                ikon: args.ikon || '📌',
                renk: args.renk || '#FEF3C7',
                periyodik: args.periyodik,
                tetikleyici: args.tetikleyici,
                mediaId,
              };

              await addNote(createdNote);
              const whisper = args.sesli_fisilti || generateWhisperText(createdNote);
              if (isSpoken) {
                speakFeedback(whisper);
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
        }),
      });
      if (sRes.ok) {
        const sJson = await sRes.json();
        if (sJson.success && sJson.data) {
          console.log("2. AI Sunucu Çıktısı:", JSON.stringify(sJson.data));
          console.log("3. Ayrıştırılmış Veri:", sJson.data);
          const createdNote = { ...sJson.data, mediaId };
          await addNote(createdNote);
          if (isSpoken) {
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
      const fallback = extractSimpleNoteFromText(textInput, currentNow);
      console.log("2. Bilişsel Kural Motoru Devrede:", fallback);
      console.log("3. Ayrıştırılmış Veri:", fallback);
      const createdNote = { ...fallback, mediaId };
      await addNote(createdNote);
      if (isSpoken) {
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
    const imageToSend = pendingCapturedImageRef.current;
    pendingCapturedImageRef.current = null; // Sıfırla

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

    setStatusText('Görsel hazır. Bir şey söyleyecek misin?');

    try {
      const compressed = await compressImage(file);
      pendingCapturedImageRef.current = compressed;

      // Otomatik ses dinlemeyi başlat (İsteğe bağlı konuşma)
      if (recognitionRef.current && !isListening) {
        try {
          recognitionRef.current.start();
        } catch {
          // Ses desteği yoksa veya başlatılamazsa doğrudan analiz et
          const imageToSend = pendingCapturedImageRef.current;
          pendingCapturedImageRef.current = null;
          setStatusText('Görsel teşhis ediliyor...');
          await processWithAI('', imageToSend, true);
        }
      } else {
        // Ses desteği yoksa sadece görseli doğrudan analiz et
        const imageToSend = pendingCapturedImageRef.current;
        pendingCapturedImageRef.current = null;
        setStatusText('Görsel teşhis ediliyor...');
        await processWithAI('', imageToSend, true);
      }
    } catch (err) {
      console.error('Fotoğraf işleme hatası:', err);
      pendingCapturedImageRef.current = null;
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
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || null;
      if (token) {
        setGoogleAccessToken(token);
        console.log("Mevcut Google Token başarıyla alındı:", token);
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

  // Sign out
  const handleSignOut = async () => {
    if (confirm('Hesaptan çıkış yapılsın mı?')) {
      await signOut(auth);
      setGoogleAccessToken(null);
      setCurrentUser(null);
      setSimulatedUser(null);
      localStorage.removeItem(SIMULATED_USER_KEY);
      setCards(getLocalNotes());
    }
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
            {/* PWA Uygulama Olarak Yükle Butonu */}
            <PWAInstallButton />

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

        {/* Metin Girişi (Klavye Modu) */}
        {showTextInput && (
          <div className={`px-6 py-2 border-b animate-in fade-in duration-150 ${
            theme === 'dark' ? 'border-stone-800 bg-stone-900/60' : 'border-stone-100 bg-stone-50/50'
          }`}>
            <form
              id="text-input-form"
              onSubmit={handleManualTextSubmit}
              className="flex gap-2"
            >
              <input
                id="manual-text-input"
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={t.manualInputPlaceholder}
                className={`flex-1 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-400 border ${
                  theme === 'dark'
                    ? 'bg-stone-800 border-stone-700 text-stone-100 placeholder-stone-500'
                    : 'bg-stone-50 border border-stone-200 text-stone-800'
                }`}
                autoFocus
              />
              <button
                type="submit"
                disabled={!textInput.trim()}
                className="px-3 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl text-xs font-semibold disabled:opacity-40 cursor-pointer"
              >
                {t.addButton}
              </button>
            </form>
          </div>
        )}

        {/* Kart Listesi Alanı */}
        <section
          id="cards-container"
          className="flex-1 overflow-y-auto px-5 py-3 space-y-3 pb-32"
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
              const cardBgColor = item.guncel_renk || item.renk || getCardColor(item.id, item.baslik);
              const isSelected = selectedCardIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`card p-3.5 rounded-2xl flex items-center justify-between transition-all duration-300 ${
                    item.isRemoving ? 'scale-95 opacity-0' : 'scale-100'
                  } ${
                    isCompleted
                      ? 'opacity-70 saturate-50 border-solid border-stone-300/80 shadow-none'
                      : isExpired 
                      ? 'opacity-95 border-dashed border-amber-300/80 shadow-2xs' 
                      : 'opacity-100 border-solid border-black/5 shadow-xs'
                  } ${isSelected ? 'ring-2 ring-stone-800' : ''}`}
                  style={{
                    backgroundColor: cardBgColor,
                    borderWidth: '1px',
                  }}
                >
                  <div className="flex items-center gap-3 overflow-hidden flex-1">
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
                        className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs shrink-0 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-stone-900 border-stone-900 text-white'
                            : 'border-stone-400 bg-white/70 hover:bg-white text-transparent'
                        }`}
                        title={isSelected ? "Seçimi kaldır" : "Seç"}
                      >
                        ✓
                      </button>
                    )}

                    {item.mediaId ? (
                      <CardMediaThumbnail
                        mediaId={item.mediaId}
                        onClick={() => viewFullImage(item.mediaId!)}
                      />
                    ) : (
                      <span className={`text-2xl select-none shrink-0 ${isCompleted ? 'grayscale-40' : ''}`}>
                        {item.ikon || '📌'}
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <h2
                        contentEditable={!isCompleted}
                        suppressContentEditableWarning={true}
                        spellCheck={false}
                        className={`font-semibold text-sm leading-tight outline-hidden ${
                          isCompleted
                            ? 'text-stone-500 line-through decoration-stone-500/70'
                            : isExpired
                            ? 'text-stone-800 cursor-text'
                            : 'text-stone-900 cursor-text'
                        }`}
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

                      <div className="flex flex-col gap-0.5 mt-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {isExpired ? (
                            <span className="text-[9px] bg-stone-900/10 text-stone-600 px-1.5 py-0.5 rounded font-mono font-medium shrink-0 flex items-center gap-0.5">
                              ⌛ {t.expiredBadge} · {item.zaman || t.incompleteStatus}
                            </span>
                          ) : (
                            <>
                              {item.tetikleyici?.etiket ? (
                                <span
                                  className="text-[10px] bg-white/85 text-stone-800 font-semibold px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1 shadow-2xs border border-stone-900/10"
                                  title={item.tetikleyici.sart ? `${t.conditionLabel}: ${item.tetikleyici.sart}` : undefined}
                                >
                                  {item.tetikleyici.etiket}
                                </span>
                              ) : (
                                <p className="text-[11px] text-stone-600 truncate">
                                  {item.zaman || t.noReminder}
                                </p>
                              )}
                              {item.hazirlik_zamani && (
                                <span
                                  className="text-[9px] bg-white/80 text-amber-900 border border-amber-300/40 px-1.5 py-0.5 rounded font-medium shrink-0 flex items-center gap-0.5 shadow-2xs"
                                  title={`${t.prepLeadTime}: ${item.hazirlik_zamani}`}
                                >
                                  ⏳ {item.hazirlik_zamani}
                                </span>
                              )}
                              {(item.calendarEventId || item.calendar_event_id) && (
                                <span className="text-[9px] bg-white/70 text-stone-700 px-1 rounded shadow-2xs font-medium shrink-0">
                                  📅 {t.inCalendarBadge}
                                </span>
                              )}
                              {item.periyodik && (
                                <span
                                  className="text-[9px] bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 px-1.5 py-0.5 rounded font-medium shrink-0 flex items-center gap-1 shadow-2xs"
                                  title={t.periodicBadge}
                                >
                                  <span>🔄</span>
                                  <span>{item.periyodik.tip === 'aylik_son_hafta' ? (language === 'tr' ? 'Ay Sonu Tekrarlı' : 'End of Month') : t.periodicBadge}</span>
                                </span>
                              )}
                              {item.tarih_iso && (
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      exportToDeviceCalendar({
                                        title: `${item.ikon || '📌'} ${item.baslik}`,
                                        startDate: new Date(item.tarih_iso!),
                                        description: `Notivia: ${item.baslik}`
                                      });
                                      playNotificationChime();
                                      setStatusText(language === 'tr' ? 'Cihaz takvimine (.ics) aktarıldı' : 'Exported to device calendar (.ics)');
                                      setTimeout(() => setStatusText(t.speakOrWrite), 2500);
                                    }}
                                    className="text-[9px] bg-amber-100/90 hover:bg-amber-200 text-amber-900 border border-amber-300/80 px-1.5 py-0.5 rounded font-medium shrink-0 flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95 transition-all"
                                    title={t.exportDeviceCalendar}
                                  >
                                    <span>📲</span>
                                    <span>{t.exportDeviceCalendar}</span>
                                  </button>
                                </div>
                              )}
                            </>
                          )}

                          {/* Oluşturulma Zaman Damgası */}
                          {item.createdAt && (
                            <span className="text-[9px] text-stone-400 font-mono tracking-tight select-none ml-1">
                              · {formatCreatedTime(item.createdAt, language)}
                            </span>
                          )}
                        </div>

                        {/* Eğer çakışma varsa görünen hafif uyarı */}
                        {(item.conflictWith || item.conflictWarning) && (
                          <p className="text-[10px] text-amber-700 font-medium flex items-center gap-1 mt-0.5">
                            <span>⚠️</span>
                            <span className="truncate">'{item.conflictWith || item.conflictWarning}' {t.conflictsWith}</span>
                          </p>
                        )}

                        {/* Kart İçi Teşhis Rozeti */}
                        {item.teshis_notu && (
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 text-[10px] bg-stone-900/5 text-stone-700 px-1.5 py-0.5 rounded border border-stone-300/60 font-mono">
                              🔍 {item.teshis_notu}
                            </span>
                          </div>
                        )}

                        {/* Bağlantılı Hatırlatma (Fısıltı) */}
                        {item.baglantili_hatirlatma && (
                          <div className="mt-1.5 flex items-start gap-1.5 bg-blue-500/10 text-blue-900 border border-blue-500/20 px-2 py-1 rounded-lg">
                            <span className="text-xs shrink-0">🔗</span>
                            <p className="text-[11px] font-medium leading-tight">{item.baglantili_hatirlatma}</p>
                          </div>
                        )}

                        {/* Anomali veya Rutin Zeka Tespiti */}
                        {item.anomali_notu && (
                          <div className="mt-1.5 flex items-start gap-1.5 bg-amber-500/10 text-amber-900 border border-amber-500/20 px-2 py-1 rounded-lg">
                            <span className="text-xs shrink-0">💡</span>
                            <p className="text-[11px] font-medium leading-tight">{item.anomali_notu}</p>
                          </div>
                        )}

                        {/* Kart İçi Alt Görevler Alanı */}
                        {item.action_items && item.action_items.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-black/5">
                            <details className="group" open>
                              <summary className="text-[10px] font-semibold text-stone-600 flex items-center justify-between cursor-pointer list-none select-none">
                                <span className="flex items-center gap-1">
                                  <span>📋</span>
                                  <span>{item.action_items.filter(t => t.is_completed).length}/{item.action_items.length} {t.prepStepsTitle}</span>
                                </span>
                                <span className="text-[9px] text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                              </summary>
                              
                              <div className="mt-1.5 space-y-1 pl-1">
                                {item.action_items.map((task, tIdx) => (
                                  <div
                                    key={tIdx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleActionItem(item.id, tIdx);
                                    }}
                                    className="flex items-center gap-2 cursor-pointer py-0.5"
                                  >
                                    <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] ${
                                      task.is_completed 
                                        ? 'bg-stone-800 border-stone-800 text-white' 
                                        : 'border-stone-400 bg-white/60'
                                    }`}>
                                      {task.is_completed ? '✓' : ''}
                                    </span>
                                    <span className={`text-[11px] leading-tight ${
                                      task.is_completed ? 'line-through text-stone-400' : 'text-stone-700'
                                    }`}>
                                      {task.task}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </details>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Kart Aksiyonları: Paylaş, Doğrudan Sil ve Tamamla (Tik) */}
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {/* Paylaş Butonu */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        shareNote(item);
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
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
                      className="w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-red-600 hover:bg-red-50/80 active:bg-red-100 transition-colors cursor-pointer"
                      title={t.deleteNoteTitle}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    {/* Tamamlama Butonu (Tik: Yok etmek yerine alta üstü çizili gönderir) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCardCompleted(item.id);
                      }}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                        isCompleted
                          ? 'bg-stone-800 border-stone-800 text-white shadow-xs'
                          : 'border-stone-300/80 text-stone-400 hover:text-stone-700 hover:border-stone-400 active:bg-white/80'
                      }`}
                      title={isCompleted ? t.reopenTitle : t.completeTitle}
                    >
                      ✓
                    </button>
                  </div>
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
          <div className="bg-stone-900/95 dark:bg-stone-100/95 backdrop-blur-md text-white dark:text-stone-900 p-3.5 rounded-2xl shadow-2xl border border-stone-700/80 dark:border-stone-300/80 flex items-start gap-3 animate-in slide-in-from-top-4 duration-250">
            <span className="text-2xl shrink-0 leading-none mt-0.5">{activeBannerNotification.icon || '🔔'}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-xs font-bold truncate tracking-tight">{activeBannerNotification.title}</h4>
                <span className="text-[10px] opacity-60 shrink-0 font-medium">Notivia</span>
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed mt-0.5 line-clamp-2">{activeBannerNotification.body}</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveBannerNotification(null)}
              aria-label="Kapat"
              className="text-stone-400 hover:text-white dark:hover:text-stone-900 p-1 rounded-md transition-colors cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
      />
    </div>
  );
}
