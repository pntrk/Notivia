import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  refreshGoogleAccessToken,
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
import type { ActionItem, ExtractedMetric, MilestoneChain, NextActionSuggestion } from './types/notivia.ts';
import { scheduleMedicationAlarms } from './utils/medicationScheduler.ts';
import {
  exportToDeviceCalendar,
  openDirectDeviceCalendar,
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
  syncDatabaseWithDrive,
  checkGoogleDriveForUpdates,
  startDriveAutoSync,
  recordDeletedNoteId,
} from './utils/driveStorage.ts';
import { OfflineIndicator } from './components/OfflineIndicator.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
import { RecycleBinModal, RETENTION_MS } from './components/RecycleBinModal.tsx';
import type { TrashNoteItem } from './types/notivia.ts';
import { EditNoteModal } from './components/EditNoteModal.tsx';
import { DOMAIN_REGISTRY, WORK_DOMAIN_OPTIONS, detectDomainFromNote, type ProfessionDomain } from './types/domainThemes.ts';
import { translations, type Language } from './utils/i18n.ts';
import { checkLocalWeather, checkWeatherTaskCompatibility, type WeatherCondition } from './utils/weather.ts';
import { detectCalendarConflict } from './utils/calendar.ts';
import { evaluatePipelineTrigger } from './utils/actionPipeline.ts';
import { clusterErrandsByLocation } from './utils/errandClustering.ts';
import { splitMultiActionMemo, isMultiActionMemo } from './utils/multiActionExtractor.ts';
import { calculateDailyCognitiveLoad, estimateCognitiveLoad } from './utils/cognitiveLoadEstimator.ts';
import { evaluateTaskEscalation } from './utils/adaptiveEscalation.ts';
import { resolveInstitutionalReference } from './utils/institutionalCalendar.ts';
import { parseDailyLifeTime, type ParsedTimeResult } from './utils/date.ts';
import { sanitizeSpokenText, sanitizeCardTitle } from './utils/speechSanitizer.ts';
import { detectDomainFromJargon } from './utils/jargonRadar.ts';
import { detectIntentRoute, getQuickClarificationOptions, INSTANT_JARGON_CHIPS, type ClarificationOption, type IntentRouteResult } from './utils/interactiveIvr.ts';
export { parseDailyLifeTime, type ParsedTimeResult };

export interface SimpleCardItem {
  id: string;
  baslik: string;
  customOrder?: number;
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
  extracted_metrics?: ExtractedMetric[] | null;
  milestone_chain?: MilestoneChain | null;
  next_action?: NextActionSuggestion | null;
}

export function isCompletedCard(card: SimpleCardItem): boolean {
  if (card.tamamlandi) return true;
  if (card.action_items && card.action_items.length > 0) {
    return card.action_items.every((item) => item.is_completed);
  }
  return false;
}

const LOCAL_STORAGE_KEY = 'notivia_local_notes';
const LOCAL_TRASH_STORAGE_KEY = 'notivia_trash_notes';
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

export const getTrashNotes = (): TrashNoteItem[] => {
  try {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(LOCAL_TRASH_STORAGE_KEY) : null;
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

export const saveTrashNotes = (trashItems: TrashNoteItem[]) => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCAL_TRASH_STORAGE_KEY, JSON.stringify(trashItems));
    }
  } catch {
    // ignore
  }
};

// 1. Türkçe & İngilizce Doğal Sesli Fısıltı & Soru Sorma Motoru (TTS)
export function speakQuestion(text: string, lang: Language = 'tr', onFinished?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onFinished?.();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'en' ? 'en-US' : 'tr-TR';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const targetVoice = voices.find((v) => v.lang.startsWith(lang === 'en' ? 'en' : 'tr'));
  if (targetVoice) {
    utterance.voice = targetVoice;
  }

  utterance.onend = () => {
    onFinished?.();
  };

  utterance.onerror = () => {
    onFinished?.();
  };

  window.speechSynthesis.speak(utterance);
}

function speakFeedback(phrase: string, lang: Language = 'tr', onFinished?: () => void) {
  speakQuestion(phrase, lang, onFinished);
}

// 2. Nota Göre Kısa Doğrulama Metni Üretici
function generateWhisperText(note: {
  baslik: string;
  zaman?: string | null;
  calendarEventId?: string | null;
  tetikleyici?: { tip?: string | null; sart?: string; aktif_mi?: boolean; etiket?: string } | null;
  teshis_notu?: string | null;
  anomali_notu?: string | null;
  sesli_fisilti?: string | null;
}, lang: Language = 'tr'): string {
  if (note.sesli_fisilti) {
    return note.sesli_fisilti;
  }
  if (lang === 'en') {
    if (note.teshis_notu) {
      return `${note.teshis_notu}. ${note.baslik} scheduled.`;
    }
    if (note.calendarEventId && note.zaman) {
      return `${note.baslik}, scheduled for ${note.zaman}.`;
    }
    if (note.tetikleyici?.etiket) {
      return `${note.baslik}, saved for ${note.tetikleyici.etiket}.`;
    }
    return `${note.baslik} saved.`;
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

  const isCurrentYear = date.getFullYear() === new Date().getFullYear();

  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', {
    day: "numeric",
    month: "short",
    ...(isCurrentYear ? {} : { year: "numeric" }),
    hour: "2-digit",
    minute: "2-digit"
  });
}

function sortNotiviaCards(cards: SimpleCardItem[]): SimpleCardItem[] {
  const now = Date.now();

  return [...cards].sort((a, b) => {
    // 0. Öncelik: Kullanıcının özel sıralaması varsa (customOrder)
    const hasOrderA = typeof a.customOrder === 'number';
    const hasOrderB = typeof b.customOrder === 'number';
    if (hasOrderA && hasOrderB) {
      return (a.customOrder as number) - (b.customOrder as number);
    }
    if (hasOrderA) return -1;
    if (hasOrderB) return 1;

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
  const [liveSpeechTranscript, setLiveSpeechTranscript] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);

  // Çoklu seçim ve toplu silme modu
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

  // Kart Düzeni Görünümü (Tekli Liste / İkili Izgara)
  const [viewMode, setViewMode] = useState<'single' | 'grid'>(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('notivia_view_mode') : null;
      return saved === 'grid' ? 'grid' : 'single';
    } catch {
      return 'single';
    }
  });

  const toggleViewMode = () => {
    setViewMode((prev) => {
      const next = prev === 'single' ? 'grid' : 'single';
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('notivia_view_mode', next);
        }
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Kart üzerinde uzun basma (Long Press) ve Sürükle-Bırak (Drag-to-Reorder) State & Ref'leri
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const isLongPressFiredRef = useRef<boolean>(false);
  const longPressFiredTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [dragOverCardId, setDragOverCardId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<'before' | 'after'>('before');
  const isDraggingActiveRef = useRef<boolean>(false);
  const dragTriggerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragTargetIdRef = useRef<string | null>(null);

  // Mobil Sola Kaydırma (Swipe-to-Reveal Actions: Alarm, Düzenle, Sil) State & Ref'leri
  const [swipedCardId, setSwipedCardId] = useState<string | null>(null);
  const [swipeOffsets, setSwipeOffsets] = useState<{ [cardId: string]: number }>({});
  const isSwipingCardRef = useRef<boolean>(false);
  const swipeStartXRef = useRef<number>(0);
  const swipeStartYRef = useRef<number>(0);
  const activeSwipingCardIdRef = useRef<string | null>(null);

  // Not Silme Öncesi Güvenli Onay Modalı (Delete Confirmation Dialog)
  const [deleteConfirmNote, setDeleteConfirmNote] = useState<SimpleCardItem | null>(null);

  // Geri Dönüşüm Kutusu (Recycle Bin - 30 Günlük Saklama) State'leri
  const [trashNotes, setTrashNotes] = useState<TrashNoteItem[]>(() => getTrashNotes());
  const [showRecycleBinModal, setShowRecycleBinModal] = useState<boolean>(false);

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

  // Kullanıcının seçtiği uzmanlık / bilişsel alan (Varsayılan: SADE - Motor seçilmediğinde yalnızca söylenenleri yazar)
  const [workDomain, setWorkDomain] = useState<ProfessionDomain>(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('notivia_lang');
        const navLang = navigator.language?.toLowerCase() || '';
        const currentLang = savedLang === 'tr' || savedLang === 'en' ? savedLang : (navLang.startsWith('tr') ? 'tr' : 'en');
        if (currentLang === 'en') {
          return 'SADE';
        }
        const saved = localStorage.getItem('notivia_work_domain');
        if (saved) {
          if (saved === 'CALISMIYORUM') return 'GENEL';
          return saved as ProfessionDomain;
        }
      }
    } catch {
      // ignore
    }
    return 'SADE';
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

  // 1. Görsel "Sesli Yanıt / Hızlı Niyet Sezici" (Live Intent Waveform & Jargon Radar)
  const activeInputForRadar = isListening
    ? (liveSpeechTranscript || (statusText !== 'Söyle, çek ya da yaz' && statusText !== 'Dinleniyor...' ? statusText : ''))
    : textInput;

  const liveIntentRoute = useMemo(() => {
    return detectIntentRoute(activeInputForRadar, workDomain);
  }, [activeInputForRadar, workDomain]);

  // 2 Kelimelik Akıllı Tamamlayıcı Çipler (Instant Jargon Chips)
  const sortedInstantJargonChips = useMemo(() => {
    if (!workDomain || workDomain === 'GENEL' || workDomain === 'SADE') {
      return INSTANT_JARGON_CHIPS;
    }
    const matching = INSTANT_JARGON_CHIPS.filter((c) => c.domain === workDomain);
    const others = INSTANT_JARGON_CHIPS.filter((c) => c.domain !== workDomain);
    return [...matching, ...others];
  }, [workDomain]);

  // Ekran üstü anlık asistan bildirim bildirici (Push Banner)
  const [activeBannerNotification, setActiveBannerNotification] = useState<{
    title: string;
    body: string;
    icon?: string;
    isAlarm?: boolean;
  } | null>(null);

  // Cihaz takvimine otomatik senkronizasyon animasyonu için kart ID'si
  const [syncingCalendarCardId, setSyncingCalendarCardId] = useState<string | null>(null);

  // Kart detaylı düzenleme ve alarm modalı için seçili kart ve başlangıç sekmesi
  const [editingNote, setEditingNote] = useState<SimpleCardItem | null>(null);
  const [editingNoteInitialTab, setEditingNoteInitialTab] = useState<'all' | 'alarm' | 'tasks' | 'details'>('all');

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
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
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

  // Geri Dönüşüm Kutusu: 30 günü aşan süresi dolmuş çöpleri otomatik temizle
  useEffect(() => {
    const rawTrash = getTrashNotes();
    const now = Date.now();
    const valid: TrashNoteItem[] = [];
    const expired: TrashNoteItem[] = [];

    for (const item of rawTrash) {
      const delTime = new Date(item.deletedAt).getTime();
      if (!isNaN(delTime) && (now - delTime) >= RETENTION_MS) {
        expired.push(item);
      } else {
        valid.push(item);
      }
    }

    if (expired.length > 0) {
      console.log(`[Recycle Bin] 30 günü aşan ${expired.length} not kalıcı olarak temizlendi.`);
      expired.forEach((exp) => {
        if (exp.item.mediaId) {
          deleteLocalMedia(exp.item.mediaId).catch(() => {});
        }
        const calId = exp.item.calendarEventId || exp.item.calendar_event_id;
        if (calId) {
          deleteCalendarEvent(calId).catch(() => {});
        }
        recordDeletedNoteId(exp.item.id);
      });
      saveTrashNotes(valid);
      setTrashNotes(valid);
    }
  }, []);

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
    if (newLang === 'en') {
      setWorkDomain('SADE');
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('notivia_work_domain', 'SADE');
        }
      } catch {
        // ignore
      }
    }
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
  const manualTextInputRef = useRef<HTMLTextAreaElement | null>(null);
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

  // Google Drive Kişisel Bulut Veritabanına Anında Kayıt Tetikleyici
  const triggerDriveBackup = async (currentNotes: SimpleCardItem[]) => {
    let token = getGoogleAccessToken();
    if (!token) {
      token = await refreshGoogleAccessToken();
    }
    if (!token) return;
    setIsSyncingDrive(true);
    try {
      const result = await saveNotesToGoogleDrive(currentNotes);
      if (result.success) {
        setDriveSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        console.log("Notlar kullanıcının kişisel Google Drive veritabanına kaydedildi ✓");
      }
    } catch (err) {
      console.warn("Google Drive kaydetme hatası:", err);
    } finally {
      setIsSyncingDrive(false);
    }
  };

  // Google Drive Kişisel Bulut Veritabanından Çekme ve Kesintisiz Çift Yönlü Eşitleme
  const syncFromDrive = async (silent = false) => {
    let token = getGoogleAccessToken();
    if (!token) {
      token = await refreshGoogleAccessToken();
    }
    if (!token) {
      if (!silent) {
        console.log("Google Drive senkronizasyonu için geçerli oturum bulunamadı");
      }
      return;
    }
    setIsSyncingDrive(true);
    try {
      const local = getLocalNotes();
      const syncResult = await syncDatabaseWithDrive(local);
      if (syncResult.success) {
        setCards(syncResult.notes);
        saveLocalNotes(syncResult.notes);
        setDriveSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        console.log("Google Drive bulut veritabanı senkronize edildi ✓ (Kaynak:", syncResult.source, ")");
      } else {
        console.warn("Google Drive senkronizasyon uyarısı:", syncResult.error);
      }
    } catch (err) {
      console.warn("Drive sync hatası:", err);
    } finally {
      setIsSyncingDrive(false);
    }
  };

  // Firebase Auth (Sürekli Kalıcı Oturum) & Google Drive Veritabanı Entegrasyonu
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
          // Kullanıcı oturum açtığında veya sayfa açıldığında Google Drive veritabanı senkronizasyonunu başlat
          const tok = getGoogleAccessToken();
          if (tok && isMounted) {
            syncFromDrive(true);
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

  // Google Drive Kesintisiz Arka Plan Veritabanı Senkronizasyon Motoru (Continuous Multi-Device Sync)
  // Kullanıcı başka bir cihazdan (telefon/tablet/bilgisayar) not eklese veya silse dahi,
  // ekranı yenilemeye gerek kalmadan otomatik algılanır ve anında arayüze yansıtılır.
  useEffect(() => {
    const cleanup = startDriveAutoSync((updatedNotes) => {
      console.log("Google Drive bulut veritabanından güncel notlar alındı:", updatedNotes.length);
      setCards(updatedNotes);
      saveLocalNotes(updatedNotes);
      setDriveSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 20000);

    const handleDriveSynced = (e: any) => {
      if (e.detail?.notes) {
        setCards(e.detail.notes);
      }
    };
    window.addEventListener('notivia_drive_database_synced', handleDriveSynced);

    return () => {
      cleanup();
      window.removeEventListener('notivia_drive_database_synced', handleDriveSynced);
    };
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
        recognition.lang = language === 'en' ? 'en-US' : 'tr-TR';
        
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
              const sanitized = sanitizeSpokenText(currentTranscript.trim());
              await processWithAIRef.current(sanitized || currentTranscript.trim(), null, true);
            }
          } else if (pendingCapturedImageRef.current) {
            const imageToSend = pendingCapturedImageRef.current;
            pendingCapturedImageRef.current = null;
            setStatusText(language === 'en' ? 'Analyzing image...' : 'Görsel teşhis ediliyor...');
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
          setLiveSpeechTranscript('');
          playMicListeningChime();
          if (pendingCapturedImageRef.current) {
            setStatusText(language === 'en' ? 'Image ready. Listening...' : 'Görsel hazır. Dinleniyor...');
          } else {
            setStatusText(language === 'en' ? 'Listening...' : 'Dinleniyor...');
          }
        };

        recognition.onresult = (event: any) => {
          clearTimeout(silenceTimer);

          currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
          setLiveSpeechTranscript(currentTranscript.trim());

          setStatusText(
            language === 'en' 
              ? `Listening (${event.results.length} segment)...` 
              : `Dinleniyor (${event.results.length} parça)...`
          );

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
               setStatusText(language === 'en' ? 'Image ready. Tap "Diagnose" or speak.' : 'Görsel hazır. "Teşhis Et"e dokunabilir veya konuşabilirsin.');
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
               setStatusText(language === 'en' ? 'Image ready. Describe with voice or tap directly.' : 'Görsel hazır. İster sesle anlat, ister doğrudan tıkla.');
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
  }, [language]);

  const resetMicUI = () => {
    setIsListening(false);
    setStatusText('Söyle, çek ya da yaz');
    setLiveSpeechTranscript('');
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
    setStatusText(language === 'en' ? 'Note added ✓' : 'Not eklendi ✓');

    // Doğrudan sisteme ekleme (AI atlanır)
    await addNote({
      baslik,
      zaman: zamanStr,
      tarih_iso: syncCal ? tarihIso : null,
      ikon,
      renk,
    });

    setTimeout(() => setStatusText(t.speakOrWrite), 2500);
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

    let noteTitle = text || (language === 'en' ? 'Photo Note' : 'Görsel Notu');
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
      if (
        rawLines[0].endsWith(':') ||
        firstLineClean.toLowerCase().includes('liste') ||
        firstLineClean.toLowerCase().includes('görev') ||
        firstLineClean.toLowerCase().includes('market') ||
        firstLineClean.toLowerCase().includes('list') ||
        firstLineClean.toLowerCase().includes('task') ||
        firstLineClean.toLowerCase().includes('todo')
      ) {
        noteTitle = firstLineClean.replace(/:$/, '');
        actionItems = rawLines.slice(1).map((line) => ({
          task: cleanLine(line),
          is_completed: false,
        })).filter((item) => item.task.length > 0);
      } else {
        noteTitle = language === 'en' ? 'Task List' : 'Görev Listesi';
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

    setStatusText(
      actionItems.length > 0
        ? (language === 'en' ? `${actionItems.length} tasks added ✓` : `${actionItems.length} görev eklendi ✓`)
        : (language === 'en' ? 'Note added ✓' : 'Not eklendi ✓')
    );

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
      sesli_fisilti:
        actionItems.length > 0
          ? (language === 'en' ? `${actionItems.length} task items saved.` : `${actionItems.length} maddelik görev listesi kaydedildi.`)
          : (language === 'en' ? 'Your note has been saved.' : 'Notunuz kaydedildi.'),
      isManualEntry: true,
    });

    setTimeout(() => setStatusText(t.speakOrWrite), 2000);
  };

  const handleMicClick = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition || !recognitionRef.current) {
      setShowTextInput(true);
      setStatusText(language === 'en' ? 'Switched to keyboard mode' : 'Klavye moduna geçildi');
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
          setStatusText(language === 'en' ? 'Switched to keyboard mode' : 'Klavye moduna geçildi');
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

      // Takvim çakışma ve alternatif zaman kontrolü
      if (noteData.tarih_iso) {
        const conflictRes = detectCalendarConflict(noteData.tarih_iso, cards);
        if (conflictRes.hasConflict) {
          noteData.conflictWith = conflictRes.conflictingEventTitle;
          noteData.conflictWarning = conflictRes.warningNote;
          if (!noteData.anomali_notu) {
            noteData.anomali_notu = conflictRes.warningNote;
          }
        }
      }

      // Hava durumu ile görev uyumu kontrolü
      if (weather && noteData.baslik) {
        const weatherCheck = checkWeatherTaskCompatibility(noteData.baslik, weather);
        if (!weatherCheck.isCompatible && weatherCheck.warning) {
          if (noteData.anomali_notu) {
            noteData.anomali_notu = `${noteData.anomali_notu} | ${weatherCheck.warning}`;
          } else {
            noteData.anomali_notu = weatherCheck.warning;
          }
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

  // 1.2 Kilometre Taşı (Milestone) Adımı Tamamlama/İlerletme
  const toggleMilestoneStep = (cardId: string, stepIndex: number) => {
    const targetCard = cards.find((c) => c.id === cardId);
    if (!targetCard || !targetCard.milestone_chain) return;

    const updatedSteps = targetCard.milestone_chain.steps.map((step, idx) =>
      idx === stepIndex ? { ...step, isCompleted: !step.isCompleted } : step
    );
    const firstIncomplete = updatedSteps.findIndex((s) => !s.isCompleted);
    const updatedChain = {
      ...targetCard.milestone_chain,
      steps: updatedSteps,
      currentStepIndex: firstIncomplete >= 0 ? firstIncomplete : updatedSteps.length,
    };

    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, milestone_chain: updatedChain } : c))
    );

    const local = getLocalNotes();
    const locItem = local.find((n) => n.id === cardId);
    if (locItem) {
      locItem.milestone_chain = updatedChain;
      saveLocalNotes(local);
      syncNoteToCloud(locItem);
      triggerDriveBackup(local);
    }
  };

  // 1.3 Sonraki Eylem Önerisini Bağımsız Kart Olarak Ekleme
  const handleAdoptNextAction = async (nextAction: NextActionSuggestion) => {
    const newNote = {
      baslik: nextAction.payload?.followupTitle || nextAction.title,
      zaman: nextAction.payload?.followupZaman || 'Bugün',
      anomali_notu: nextAction.description,
      ikon: nextAction.icon || '⚡',
      renk: '#E0F2FE',
    };
    await addNote(newNote);
    setStatusText(`⚡ "${nextAction.title}" eklendi ✓`);
    setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
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

      // ⚡ ÖN KOŞUL VE ZİNCİRLEME GÖREV MOTORU (Action Pipeline Trigger)
      const pipelineRes = evaluatePipelineTrigger(targetCard.baslik);
      if (pipelineRes.hasFollowUp && pipelineRes.followUpNote) {
        setTimeout(async () => {
          await addNote(pipelineRes.followUpNote!);
          if (pipelineRes.whisperText) {
            setStatusText(pipelineRes.whisperText);
            speakFeedback(pipelineRes.whisperText);
          }
        }, 500);
      }
    }
  };

  // Kalıcı silmeyi gerçekleştiren çekirdek fonksiyon (Geri Dönüşüm Kutusundan silindiğinde veya 30 gün dolduğunda çağrılır)
  const commitPermanentDeletion = async (card: SimpleCardItem) => {
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
    recordDeletedNoteId(card.id);
    syncDeleteToCloud(card.id);
    triggerDriveBackup(local);
  };

  // Geri Dönüşüm Kutusundan Tek Bir Notu Geri Yükle (Restore Single Item)
  const restoreTrashItem = async (cardId: string) => {
    const target = trashNotes.find((t) => t.item.id === cardId);
    if (!target) return;

    const remainingTrash = trashNotes.filter((t) => t.item.id !== cardId);
    setTrashNotes(remainingTrash);
    saveTrashNotes(remainingTrash);

    const updatedCards = [target.item, ...cards.filter((c) => c.id !== cardId)];
    setCards(updatedCards);
    saveLocalNotes(updatedCards);
    syncNoteToCloud(target.item);
    triggerDriveBackup(updatedCards);

    // Eğer tarih varsa alarmları tekrar kur
    if (target.item.tarih_iso && !target.item.tamamlandi) {
      localNotifications.scheduleAlarm({
        id: target.item.id,
        baslik: target.item.baslik,
        tarih_iso: target.item.tarih_iso,
        ikon: target.item.ikon,
      });
    }

    setStatusText(language === 'tr' ? `"${target.item.baslik}" geri yüklendi ✓` : `"${target.item.baslik}" restored ✓`);
    setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, snap or type'), 2500);
  };

  // Geri Dönüşüm Kutusundaki Tüm Notları Geri Yükle (Restore All Items)
  const restoreAllTrashItems = async () => {
    if (trashNotes.length === 0) return;
    const restoredCards = trashNotes.map((t) => t.item);
    setTrashNotes([]);
    saveTrashNotes([]);

    const updatedCards = [...restoredCards, ...cards];
    setCards(updatedCards);
    saveLocalNotes(updatedCards);

    for (const card of restoredCards) {
      syncNoteToCloud(card);
      if (card.tarih_iso && !card.tamamlandi) {
        localNotifications.scheduleAlarm({
          id: card.id,
          baslik: card.baslik,
          tarih_iso: card.tarih_iso,
          ikon: card.ikon,
        });
      }
    }
    triggerDriveBackup(updatedCards);

    setStatusText(language === 'tr' ? `${restoredCards.length} not başarıyla geri yüklendi ✓` : `${restoredCards.length} notes restored ✓`);
    setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, snap or type'), 2500);
  };

  // Geri Dönüşüm Kutusundan Tek Bir Notu Kalıcı Olarak Sil
  const permanentDeleteTrashItem = async (cardId: string) => {
    const target = trashNotes.find((t) => t.item.id === cardId);
    if (!target) return;

    const remainingTrash = trashNotes.filter((t) => t.item.id !== cardId);
    setTrashNotes(remainingTrash);
    saveTrashNotes(remainingTrash);

    await commitPermanentDeletion(target.item);

    setStatusText(language === 'tr' ? 'Not kalıcı olarak silindi' : 'Note permanently deleted');
    setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, snap or type'), 2000);
  };

  // Geri Dönüşüm Kutusundaki Tüm Notları Kalıcı Olarak Boşalt
  const emptyTrash = async () => {
    if (trashNotes.length === 0) return;
    const itemsToDelete = [...trashNotes];
    setTrashNotes([]);
    saveTrashNotes([]);

    for (const entry of itemsToDelete) {
      await commitPermanentDeletion(entry.item);
    }

    setStatusText(language === 'tr' ? 'Geri dönüşüm kutusu boşaltıldı ✓' : 'Recycle bin emptied ✓');
    setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, snap or type'), 2000);
  };

  // Geri Alma Aksiyonu (Hızlı Toast üzerinden)
  const handleUndo = () => {
    if (!undoToast) return;
    clearTimeout(undoToast.timerId);
    const restoredItem = undoToast.item;
    
    // Çöp kutusundan çıkar
    const remainingTrash = trashNotes.filter((t) => t.item.id !== restoredItem.id);
    setTrashNotes(remainingTrash);
    saveTrashNotes(remainingTrash);

    // Kartı listeye geri yükle
    setCards((prev) => [restoredItem, ...prev.filter((c) => c.id !== restoredItem.id)]);
    const updatedLocal = [restoredItem, ...getLocalNotes().filter((c) => c.id !== restoredItem.id)];
    saveLocalNotes(updatedLocal);
    setUndoToast(null);

    // Alarmları yeniden kur
    if (restoredItem.tarih_iso && !restoredItem.tamamlandi) {
      localNotifications.scheduleAlarm({
        id: restoredItem.id,
        baslik: restoredItem.baslik,
        tarih_iso: restoredItem.tarih_iso,
        ikon: restoredItem.ikon,
      });
    }

    setStatusText(language === 'tr' ? 'Not geri yüklendi ✓' : 'Note restored ✓');
    setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, snap or type'), 2000);
  };

  // Tek tek doğrudan silme fonksiyonu (Notu 30 günlük Geri Dönüşüm Kutusuna taşır)
  const directDeleteNote = (id: string) => {
    const targetCard = cards.find((c) => c.id === id);
    if (!targetCard) return;

    // Alarmları durdur
    localNotifications.cancelAlarm(targetCard.id);
    cancelAllFermentationAlarms(targetCard.id);

    // Aktif kartlardan çıkar ve kaydet
    const updatedCards = cards.filter((c) => c.id !== id);
    setCards(updatedCards);
    saveLocalNotes(updatedCards);
    setSelectedCardIds((prev) => prev.filter((selectedId) => selectedId !== id));

    // Geri dönüşüm kutusuna ekle
    const newTrashEntry: TrashNoteItem = {
      item: targetCard,
      deletedAt: new Date().toISOString(),
    };
    const updatedTrash = [newTrashEntry, ...trashNotes.filter((t) => t.item.id !== id)];
    setTrashNotes(updatedTrash);
    saveTrashNotes(updatedTrash);

    triggerDriveBackup(updatedCards);

    if (undoToast) {
      clearTimeout(undoToast.timerId);
    }

    const timerId = setTimeout(() => {
      setUndoToast(null);
    }, 6000);

    setUndoToast({ item: targetCard, timerId });
    setStatusText(language === 'tr' ? 'Not çöp kutusuna taşındı (30 gün saklanır)' : 'Note moved to trash (kept for 30 days)');
  };

  // Çoklu seçim ile seçilen tüm notları Geri Dönüşüm Kutusuna taşıma
  const deleteSelectedNotes = async () => {
    if (selectedCardIds.length === 0) return;
    const count = selectedCardIds.length;
    
    if (undoToast) {
      clearTimeout(undoToast.timerId);
      setUndoToast(null);
    }

    const targetsToDelete = cards.filter((c) => selectedCardIds.includes(c.id));
    const updatedCards = cards.filter((c) => !selectedCardIds.includes(c.id));
    setCards(updatedCards);
    saveLocalNotes(updatedCards);
    setSelectedCardIds([]);
    setIsSelectMode(false);

    // Her birini çöp kutusuna ekle ve alarmları durdur
    const nowIso = new Date().toISOString();
    const newTrashEntries: TrashNoteItem[] = targetsToDelete.map((item) => ({
      item,
      deletedAt: nowIso,
    }));

    for (const card of targetsToDelete) {
      await localNotifications.cancelAlarm(card.id);
      await cancelAllFermentationAlarms(card.id);
    }

    const updatedTrash = [
      ...newTrashEntries,
      ...trashNotes.filter((t) => !selectedCardIds.includes(t.item.id)),
    ];
    setTrashNotes(updatedTrash);
    saveTrashNotes(updatedTrash);

    triggerDriveBackup(updatedCards);

    setStatusText(
      language === 'tr'
        ? `${count} not çöp kutusuna taşındı (30 gün saklanır)`
        : `${count} notes moved to trash (kept for 30 days)`
    );
    setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, snap or type'), 2500);
  };

  // Kartları Yeniden Sıralama (Reorder) Fonksiyonu
  const reorderCards = (
    sourceIds: string[],
    targetId: string,
    position: 'before' | 'after' = 'before'
  ) => {
    if (sourceIds.length === 0 || !targetId || sourceIds.includes(targetId)) return;

    const currentSorted = sortNotiviaCards(filteredCards);
    const sourceItems = currentSorted.filter((c) => sourceIds.includes(c.id));
    const remaining = currentSorted.filter((c) => !sourceIds.includes(c.id));

    const targetIndex = remaining.findIndex((c) => c.id === targetId);
    if (targetIndex === -1) return;

    const insertIndex = position === 'after' ? targetIndex + 1 : targetIndex;
    const newSorted = [
      ...remaining.slice(0, insertIndex),
      ...sourceItems,
      ...remaining.slice(insertIndex),
    ];

    const idToOrderMap = new Map<string, number>();
    newSorted.forEach((card, idx) => {
      idToOrderMap.set(card.id, idx);
    });

    const updatedAllCards = cards.map((c) => {
      if (idToOrderMap.has(c.id)) {
        return { ...c, customOrder: idToOrderMap.get(c.id)! };
      }
      return c;
    });

    updatedAllCards.sort((a, b) => {
      const oA = typeof a.customOrder === 'number' ? a.customOrder : 99999;
      const oB = typeof b.customOrder === 'number' ? b.customOrder : 99999;
      return oA - oB;
    });

    setCards(updatedAllCards);
    saveLocalNotes(updatedAllCards);
    triggerDriveBackup(updatedAllCards);

    for (const item of sourceItems) {
      const updated = updatedAllCards.find((c) => c.id === item.id);
      if (updated) syncNoteToCloud(updated);
    }

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([20, 30]);
      } catch {}
    }

    setStatusText(language === 'tr' ? 'Notlar taşındı ✓' : 'Notes moved ✓');
    setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, capture or write'), 2000);
  };

  // Seçilen Notları Toplu Taşıma (Yukarı / Aşağı / En Üst / En Alt)
  const moveSelectedNotes = (direction: 'up' | 'down' | 'top' | 'bottom') => {
    if (selectedCardIds.length === 0) return;

    const currentSorted = sortNotiviaCards(filteredCards);
    const selectedSet = new Set(selectedCardIds);
    const selectedItems = currentSorted.filter((c) => selectedSet.has(c.id));
    const unselectedItems = currentSorted.filter((c) => !selectedSet.has(c.id));

    let newSorted: SimpleCardItem[] = [];

    if (direction === 'top') {
      newSorted = [...selectedItems, ...unselectedItems];
    } else if (direction === 'bottom') {
      newSorted = [...unselectedItems, ...selectedItems];
    } else if (direction === 'up') {
      const list = [...currentSorted];
      for (let i = 1; i < list.length; i++) {
        if (selectedSet.has(list[i].id) && !selectedSet.has(list[i - 1].id)) {
          const temp = list[i];
          list[i] = list[i - 1];
          list[i - 1] = temp;
        }
      }
      newSorted = list;
    } else if (direction === 'down') {
      const list = [...currentSorted];
      for (let i = list.length - 2; i >= 0; i--) {
        if (selectedSet.has(list[i].id) && !selectedSet.has(list[i + 1].id)) {
          const temp = list[i];
          list[i] = list[i + 1];
          list[i + 1] = temp;
        }
      }
      newSorted = list;
    }

    const idToOrderMap = new Map<string, number>();
    newSorted.forEach((card, idx) => {
      idToOrderMap.set(card.id, idx);
    });

    const updatedAllCards = cards.map((c) => {
      if (idToOrderMap.has(c.id)) {
        return { ...c, customOrder: idToOrderMap.get(c.id)! };
      }
      return c;
    });

    updatedAllCards.sort((a, b) => {
      const oA = typeof a.customOrder === 'number' ? a.customOrder : 99999;
      const oB = typeof b.customOrder === 'number' ? b.customOrder : 99999;
      return oA - oB;
    });

    setCards(updatedAllCards);
    saveLocalNotes(updatedAllCards);
    triggerDriveBackup(updatedAllCards);

    for (const item of selectedItems) {
      const updated = updatedAllCards.find((c) => c.id === item.id);
      if (updated) syncNoteToCloud(updated);
    }

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(25);
      } catch {}
    }

    setStatusText(language === 'tr' ? 'Seçilenler taşındı ✓' : 'Selected notes moved ✓');
    setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, capture or write'), 2000);
  };

  // Tekil Notu 1 Adım Yukarı / Aşağı Taşıma
  const moveSingleNote = (cardId: string, direction: 'up' | 'down') => {
    const currentSorted = sortNotiviaCards(filteredCards);
    const idx = currentSorted.findIndex((c) => c.id === cardId);
    if (idx === -1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= currentSorted.length) return;

    const targetCard = currentSorted[targetIdx];
    reorderCards([cardId], targetCard.id, direction === 'up' ? 'before' : 'after');
  };

  // Kart üzerinde uzun basma (Long Press) ve sürükleme başlatıcı
  const startLongPress = (cardId: string, clientX: number, clientY: number, target: EventTarget | null) => {
    if (target instanceof HTMLElement && target.closest('button, input, textarea, a, [contenteditable="true"]')) {
      return;
    }

    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    if (dragTriggerTimerRef.current) clearTimeout(dragTriggerTimerRef.current);

    touchStartPosRef.current = { x: clientX, y: clientY };
    isLongPressFiredRef.current = false;
    isDraggingActiveRef.current = false;

    // 360ms kesintisiz basılı tutulduğunda: Çoklu seçim modunu ve dokunmatik sürüklemeyi aktifleştir
    longPressTimerRef.current = setTimeout(() => {
      isLongPressFiredRef.current = true;
      isDraggingActiveRef.current = true;
      setDraggingCardId(cardId);

      if (!isSelectMode) {
        setIsSelectMode(true);
      }
      setSelectedCardIds((prev) => (prev.includes(cardId) ? prev : [...prev, cardId]));

      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate(40);
        } catch {}
      }

      if (longPressFiredTimeoutRef.current) clearTimeout(longPressFiredTimeoutRef.current);
      longPressFiredTimeoutRef.current = setTimeout(() => {
        isLongPressFiredRef.current = false;
      }, 500);
    }, 360);
  };

  // Kart üzerinde uzun basmayı iptal etme
  const cancelLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (dragTriggerTimerRef.current) {
      clearTimeout(dragTriggerTimerRef.current);
      dragTriggerTimerRef.current = null;
    }
  };

  // Masaüstü Drag & Drop Event Yöneticileri
  const handleDesktopDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData('text/plain', cardId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingCardId(cardId);
    isDraggingActiveRef.current = true;
  };

  const handleDesktopDragOver = (e: React.DragEvent, targetCardId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (targetCardId === draggingCardId) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const isAfter = e.clientY > (rect.top + rect.height / 2);
    setDragOverCardId(targetCardId);
    setDragPosition(isAfter ? 'after' : 'before');
  };

  const handleDesktopDragLeave = (e: React.DragEvent, targetCardId: string) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    if (dragOverCardId === targetCardId) {
      setDragOverCardId(null);
    }
  };

  const handleDesktopDrop = (e: React.DragEvent, targetCardId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain') || draggingCardId;
    if (sourceId && targetCardId && sourceId !== targetCardId) {
      if (selectedCardIds.includes(sourceId) && selectedCardIds.length > 1) {
        reorderCards(selectedCardIds, targetCardId, dragPosition);
      } else {
        reorderCards([sourceId], targetCardId, dragPosition);
      }
    }
    setDraggingCardId(null);
    setDragOverCardId(null);
    isDraggingActiveRef.current = false;
  };

  const handleDesktopDragEnd = () => {
    setDraggingCardId(null);
    setDragOverCardId(null);
    isDraggingActiveRef.current = false;
  };

  // Mobil Sola Kaydırma (Swipe-to-Reveal: Alarm, Düzenle, Sil) Yöneticileri
  const handleCardTouchStart = (cardId: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;

    if (swipedCardId && swipedCardId !== cardId) {
      setSwipedCardId(null);
      setSwipeOffsets({});
    }

    swipeStartXRef.current = touch.clientX;
    swipeStartYRef.current = touch.clientY;
    isSwipingCardRef.current = false;
    activeSwipingCardIdRef.current = cardId;

    startLongPress(cardId, touch.clientX, touch.clientY, e.target);
  };

  const handleCardTouchMove = (cardId: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch || activeSwipingCardIdRef.current !== cardId) return;

    const dx = touch.clientX - swipeStartXRef.current;
    const dy = touch.clientY - swipeStartYRef.current;

    // 1. Eğer uzun basma sonrası dokunmatik sürükleme aktifse:
    if (isDraggingActiveRef.current && draggingCardId) {
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const cardEl = el?.closest('[data-card-id]') as HTMLElement | null;
      if (cardEl) {
        const targetId = cardEl.getAttribute('data-card-id');
        if (targetId && targetId !== draggingCardId) {
          const rect = cardEl.getBoundingClientRect();
          const isAfter = touch.clientY > (rect.top + rect.height / 2);
          setDragOverCardId(targetId);
          setDragPosition(isAfter ? 'after' : 'before');
          dragTargetIdRef.current = targetId;
        }
      }

      // Kenarlara yaklaşınca otomatik kaydırma
      if (touch.clientY < 90) {
        window.scrollBy({ top: -8, behavior: 'auto' });
      } else if (touch.clientY > window.innerHeight - 90) {
        window.scrollBy({ top: 8, behavior: 'auto' });
      }
      return;
    }

    // 2. Henüz sürükleme başlamadıysa: yön belirleme
    if (!isSwipingCardRef.current) {
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        isSwipingCardRef.current = true;
        cancelLongPress();
      } else if (Math.abs(dy) > 10 || Math.abs(dx) > 10) {
        // Doğal dikey kaydırmada uzun basmayı hemen iptal et
        cancelLongPress();
        return;
      }
    }

    // 3. Sola kaydırma aktifse
    if (isSwipingCardRef.current) {
      const isCurrentlyOpen = swipedCardId === cardId;
      if (viewMode === 'grid') {
        // İkili ızgarada kartı uçurmak yerine esnek dokunmatik direnç (-45px)
        const baseOffset = isCurrentlyOpen ? -35 : 0;
        const targetOffset = Math.min(0, Math.max(-45, baseOffset + dx * 0.45));
        setSwipeOffsets((prev) => ({ ...prev, [cardId]: targetOffset }));
      } else {
        const baseOffset = isCurrentlyOpen ? -168 : 0;
        const targetOffset = Math.min(0, Math.max(-200, baseOffset + dx));
        setSwipeOffsets((prev) => ({ ...prev, [cardId]: targetOffset }));
      }
    }
  };

  const handleCardTouchEnd = (cardId: string) => {
    cancelLongPress();

    // Sürükleme bittiyse sıralamayı uygula
    if (isDraggingActiveRef.current && draggingCardId && dragOverCardId && draggingCardId !== dragOverCardId) {
      if (selectedCardIds.includes(draggingCardId) && selectedCardIds.length > 1) {
        reorderCards(selectedCardIds, dragOverCardId, dragPosition);
      } else {
        reorderCards([draggingCardId], dragOverCardId, dragPosition);
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate([25, 40, 25]);
        } catch {}
      }
      setStatusText(language === 'tr' ? 'Kart sıralaması güncellendi ✓' : 'Cards reordered ✓');
      setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, capture or write'), 2000);
    }

    isDraggingActiveRef.current = false;
    setDraggingCardId(null);
    setDragOverCardId(null);
    dragTargetIdRef.current = null;

    // Sola kaydırma bittiyse çekmece / hızlı eylem durumunu ayarla
    if (activeSwipingCardIdRef.current === cardId && isSwipingCardRef.current) {
      const currentOffset = swipeOffsets[cardId] ?? 0;
      const isCurrentlyOpen = swipedCardId === cardId;

      if (viewMode === 'grid') {
        if (!isCurrentlyOpen) {
          if (currentOffset < -18) {
            setSwipedCardId(cardId);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: 0 }));
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
              try { navigator.vibrate(25); } catch {}
            }
          } else {
            setSwipedCardId(null);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: 0 }));
          }
        } else {
          setSwipedCardId(null);
          setSwipeOffsets((prev) => ({ ...prev, [cardId]: 0 }));
        }
      } else {
        if (!isCurrentlyOpen) {
          if (currentOffset < -45) {
            setSwipedCardId(cardId);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: -168 }));
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
              try { navigator.vibrate(25); } catch {}
            }
          } else {
            setSwipedCardId(null);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: 0 }));
          }
        } else {
          if (currentOffset > -110) {
            setSwipedCardId(null);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: 0 }));
          } else {
            setSwipedCardId(cardId);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: -168 }));
          }
        }
      }
    }
    isSwipingCardRef.current = false;
    activeSwipingCardIdRef.current = null;
  };

  const handleCardMouseDown = (cardId: string, e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (e.target instanceof HTMLElement && e.target.closest('button, input, textarea, a, [contenteditable="true"]')) {
      return;
    }
    if (swipedCardId && swipedCardId !== cardId) {
      setSwipedCardId(null);
      setSwipeOffsets({});
    }
    swipeStartXRef.current = e.clientX;
    swipeStartYRef.current = e.clientY;
    isSwipingCardRef.current = false;
    activeSwipingCardIdRef.current = cardId;
    startLongPress(cardId, e.clientX, e.clientY, e.target);
  };

  const handleCardMouseMove = (cardId: string, e: React.MouseEvent) => {
    if (activeSwipingCardIdRef.current !== cardId) return;
    const dx = e.clientX - swipeStartXRef.current;
    const dy = e.clientY - swipeStartYRef.current;

    if (!isSwipingCardRef.current) {
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        isSwipingCardRef.current = true;
        cancelLongPress();
      }
    }

    if (isSwipingCardRef.current) {
      const isCurrentlyOpen = swipedCardId === cardId;
      if (viewMode === 'grid') {
        const baseOffset = isCurrentlyOpen ? -35 : 0;
        const targetOffset = Math.min(0, Math.max(-45, baseOffset + dx * 0.45));
        setSwipeOffsets((prev) => ({ ...prev, [cardId]: targetOffset }));
      } else {
        const baseOffset = isCurrentlyOpen ? -168 : 0;
        const targetOffset = Math.min(0, Math.max(-200, baseOffset + dx));
        setSwipeOffsets((prev) => ({ ...prev, [cardId]: targetOffset }));
      }
    }
  };

  const handleCardMouseUp = (cardId: string) => {
    cancelLongPress();
    if (activeSwipingCardIdRef.current === cardId && isSwipingCardRef.current) {
      const currentOffset = swipeOffsets[cardId] ?? 0;
      const isCurrentlyOpen = swipedCardId === cardId;

      if (viewMode === 'grid') {
        if (!isCurrentlyOpen) {
          if (currentOffset < -18) {
            setSwipedCardId(cardId);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: 0 }));
          } else {
            setSwipedCardId(null);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: 0 }));
          }
        } else {
          setSwipedCardId(null);
          setSwipeOffsets((prev) => ({ ...prev, [cardId]: 0 }));
        }
      } else {
        if (!isCurrentlyOpen) {
          if (currentOffset < -45) {
            setSwipedCardId(cardId);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: -168 }));
          } else {
            setSwipedCardId(null);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: 0 }));
          }
        } else {
          if (currentOffset > -110) {
            setSwipedCardId(null);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: 0 }));
          } else {
            setSwipedCardId(cardId);
            setSwipeOffsets((prev) => ({ ...prev, [cardId]: -168 }));
          }
        }
      }
    }
    isSwipingCardRef.current = false;
    activeSwipingCardIdRef.current = null;
  };

  // Kart tıklandığında çoklu seçim modundaysa seçimi aç/kapat, swipe açıksa kapat
  const handleCardClick = (cardId: string, e: React.MouseEvent) => {
    if (isLongPressFiredRef.current || isSwipingCardRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Açık olan swipe çekmecesini tek tıkla kapat
    if (swipedCardId) {
      setSwipedCardId(null);
      setSwipeOffsets({});
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (isSelectMode) {
      if (e.target instanceof HTMLElement && e.target.closest('button, input, textarea, a, [contenteditable="true"]')) {
        return;
      }
      setSelectedCardIds((prev) =>
        prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]
      );
    }
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

  // 2. Eksik Bilgi Netleştirme Yanıtı (Interactive IVR Clarification)
  const handleResolveClarification = (cardId: string, option: ClarificationOption) => {
    updateNoteReminder(cardId, option.dateIso, option.displayZaman, true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const u = new SpeechSynthesisUtterance(`${option.displayZaman} olarak planlandı.`);
        u.lang = language === 'en' ? 'en-US' : 'tr-TR';
        window.speechSynthesis.speak(u);
      } catch {}
    }
  };

  // Kartı Doğrudan Cihaz Takvimine (Google Takvim / Apple Takvim) Otomatik ve Dosyasız Aktarma
  const autoSyncCardToDeviceCalendar = async (item: SimpleCardItem) => {
    if (!item.tarih_iso) return;
    setSyncingCalendarCardId(item.id);

    try {
      // 1. Google ile oturum açıksa Google Takvim API ile doğrudan arka planda senkronize et
      const token = getGoogleAccessToken();
      if (token) {
        setStatusText(language === 'tr' ? 'Google Takvime otomatik aktarılıyor...' : 'Syncing directly to Google Calendar...');
        const result = await createCalendarEvent({
          baslik: item.baslik,
          tarih_iso: item.tarih_iso,
          ikon: item.ikon,
          hazirlik_zamani: item.hazirlik_zamani,
        });

        if (result.eventId) {
          const updatedCards = cards.map((c) =>
            c.id === item.id ? { ...c, calendarEventId: result.eventId } : c
          );
          setCards(updatedCards);
          const local = getLocalNotes();
          const locItem = local.find((n) => n.id === item.id);
          if (locItem) {
            locItem.calendarEventId = result.eventId;
            saveLocalNotes(local);
            syncNoteToCloud(locItem);
          }
          playNotificationChime();
          setStatusText(
            language === 'tr'
              ? '✓ Cihaz takviminize otomatik aktarıldı!'
              : '✓ Added directly to your device calendar!'
          );
          setTimeout(() => setStatusText(t.speakOrWrite), 3000);
          return;
        }
      }

      // 2. Google token yoksa veya API yanıt vermediyse:
      // Cihazın yerel takvim uygulamasını (Google Takvim, Apple Takvim, Samsung Takvim)
      // dosya indirmeden DOĞRUDAN aç!
      let rruleStr: string | undefined = undefined;
      if (item.periyodik) {
        if (item.periyodik.tip === 'gunluk') rruleStr = 'FREQ=DAILY';
        else if (item.periyodik.tip === 'haftalik') rruleStr = 'FREQ=WEEKLY';
        else if (item.periyodik.tip === 'aylik') rruleStr = 'FREQ=MONTHLY';
        else if (item.periyodik.tip === 'yillik') rruleStr = 'FREQ=YEARLY';
        else if (item.periyodik.tip === 'aylik_son_hafta') rruleStr = 'FREQ=MONTHLY;BYSETPOS=-1;BYDAY=MO,TU,WE,TH,FR';
      }

      openDirectDeviceCalendar({
        title: `${item.ikon || '📌'} ${item.baslik}`,
        startDate: new Date(item.tarih_iso),
        description: `Notivia: ${item.baslik}${item.anomali_notu ? '\n' + item.anomali_notu : ''}`,
        rrule: rruleStr,
      });

      // Cihaz yerel hatırlatıcı alarmını da kur
      scheduleLocalDeviceReminder(
        item.id,
        item.baslik,
        item.tarih_iso,
        item.ikon,
        item.periyodik
      );
      requestDeviceNotificationPermission().catch(() => {});

      // Kartı takvimle eşleşmiş olarak işaretle
      const newCalId = item.calendarEventId || `device_cal_${Date.now()}`;
      const updatedCards = cards.map((c) =>
        c.id === item.id ? { ...c, calendarEventId: newCalId } : c
      );
      setCards(updatedCards);
      const local = getLocalNotes();
      const locItem = local.find((n) => n.id === item.id);
      if (locItem) {
        locItem.calendarEventId = newCalId;
        saveLocalNotes(local);
        syncNoteToCloud(locItem);
      }

      playNotificationChime();
      setStatusText(
        language === 'tr'
          ? '✓ Cihaz takvimi açıldı ve etkinlik aktarıldı!'
          : '✓ Device calendar opened and event transferred!'
      );
      setTimeout(() => setStatusText(t.speakOrWrite), 3000);
    } catch (err) {
      console.error('Takvim aktarım hatası:', err);
      setStatusText(language === 'tr' ? 'Takvim aktarılırken bir sorun oluştu' : 'Failed to transfer to calendar');
      setTimeout(() => setStatusText(t.speakOrWrite), 3000);
    } finally {
      setSyncingCalendarCardId(null);
    }
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

    // 1. Sıfır Gecikmeli Jargon Taraması
    const radar = detectDomainFromJargon(textInput, workDomain);
    const targetDomain = radar.detectedDomain;

    console.log(`[Jargon Radar] Girdi: "${textInput}" -> Alan: ${targetDomain} (Güven: %${Math.round(radar.confidence * 100)})`);
    console.log("1. Girdi gönderiliyor:", textInput, "Zaman:", currentNow);

    let mediaId: string | null = null;
    if (base64Image) {
      mediaId = 'media_' + Date.now();
      await saveLocalMedia(mediaId, base64Image);
    }

    // 0. SADE / MOTORSUZ MOD (Kullanıcı motor seçimi yapmadıysa, Sade Mod seçiliyse veya İngilizce dilindeyse)
    // Bilişsel motorlarla entegre olmadan yalnızca söylenen/yazılan ham metni kaydeder.
    if (workDomain === 'SADE' || language === 'en') {
      const createdNote = {
        baslik: textInput?.trim() || (base64Image ? (language === 'en' ? 'Photo Note' : 'Görsel Notu') : (language === 'en' ? 'New Note' : 'Yeni Not')),
        zaman: language === 'en' ? 'Saved' : 'Kayıt Edildi',
        tarih_iso: null,
        action_items: [],
        ikon: base64Image ? '🖼️' : '📝',
        renk: '#F8FAFC',
        anomali_notu: null,
        mediaId,
      };
      await addNote(createdNote);
      const whisper = language === 'en' ? 'Note saved.' : 'Not kaydedildi.';
      setStatusText(whisper);
      if (isSpoken) {
        speakFeedback(whisper, language);
      }
      resetMicUI();
      return;
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
            const whisper = generateWhisperText(createdNote, language);
            speakFeedback(whisper, language);
          }
          resetMicUI();
          return;
        }
      } catch {
        // JSON değilse normal akışa devam et
      }
    }

    // ⚡ ÇOKLU EYLEM AYRIŞTIRICI (Multi-Action Memo Extractor)
    // Eğer girdi birden fazla bağımsız görev/toplantı kararı içeriyorsa bağımsız kartlar üret
    if (textInput && !base64Image && isMultiActionMemo(textInput)) {
      const chunks = splitMultiActionMemo(textInput);
      if (chunks.length > 1) {
        console.log(`[Multi-Action Extractor] Girdi ${chunks.length} bağımsız eyleme ayrıştırıldı:`, chunks);
        for (const chunk of chunks) {
          const parsedChunk = extractSimpleNoteFromText(chunk, currentNow, cards, targetDomain, language);
          await addNote({
            baslik: sanitizeCardTitle(parsedChunk.baslik) || parsedChunk.baslik,
            zaman: parsedChunk.zaman,
            tarih_iso: parsedChunk.tarih_iso,
            action_items: parsedChunk.action_items,
            ikon: parsedChunk.ikon,
            renk: parsedChunk.renk,
            anomali_notu: parsedChunk.anomali_notu,
            periyodik: parsedChunk.periyodik,
            tetikleyici: parsedChunk.tetikleyici,
          });
        }
        const whisper = language === 'en' ? `${chunks.length} tasks and schedule cards created.` : `${chunks.length} ayrı görev ve ajanda kartı oluşturuldu.`;
        setStatusText(whisper);
        if (isSpoken) {
          speakFeedback(whisper, language);
        }
        resetMicUI();
        return;
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
            userDomain: targetDomain,
            preferredDomain: targetDomain,
            language: language,
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

              let whisper = args.sesli_fisilti || (language === 'en' ? 'Checked your calendar.' : 'Ajandanız kontrol edildi.');
              if (matching.length === 0) {
                whisper = `${whisper} ${language === 'en' ? 'You have no plans in this interval.' : 'Belirtilen aralıkta herhangi bir planınız bulunmuyor.'}`;
              } else {
                whisper = `${whisper} ${language === 'en' ? `You have ${matching.length} scheduled items: ${matching.map((m) => m.baslik).join(', ')}` : `${matching.length} adet planınız var: ${matching.map((m) => m.baslik).join(', ')}`}`;
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
                speakFeedback(whisper, language);
              }
              resetMicUI();
              return;
            }

            // 2. İletişim & Taslak Hazırlayıcı (draft_message)
            if (tool === 'draft_message') {
              const alici = args.recipient || args.alici || (language === 'en' ? 'Contact' : 'İlgili Kişi');
              const kanal = args.channel || args.kanal || 'whatsapp';
              const konu = args.subject || args.konu || (language === 'en' ? 'Notice' : 'Bilgilendirme');
              const metin = args.message_body || args.metin || '';

              setDraftedMessage({
                alici,
                kanal,
                konu,
                metin,
                sesli_fisilti: args.sesli_fisilti || (language === 'en' ? 'Message draft prepared.' : 'Mesaj taslağınız hazırlandı.'),
              });

              const whisper = args.sesli_fisilti || (language === 'en' ? `${kanal === 'email' ? 'Email' : 'Message'} draft for ${alici} is ready.` : `${alici} için ${kanal === 'email' ? 'e-posta' : 'mesaj'} taslağı hazırlandı.`);
              setStatusText(whisper);
              if (isSpoken) {
                speakFeedback(whisper, language);
              }
              resetMicUI();
              return;
            }

            // 3. Bilişsel Eylem & Not Oluşturucu (create_note_or_event)
            if (tool === 'create_note_or_event') {
              const isMissingTime = args.eksik_bilgi || (!args.zaman && !args.tarih_iso && (args.baslik?.toLowerCase().includes('randevu') || args.baslik?.toLowerCase().includes('görüşme') || args.baslik?.toLowerCase().includes('buluşma') || args.baslik?.toLowerCase().includes('toplantı') || args.baslik?.toLowerCase().includes('meeting') || args.baslik?.toLowerCase().includes('appointment')));
              const defaultClarify = language === 'en' ? 'Which day and time should we schedule this for?' : 'Hangi gün ve saatte planlayalım?';
              const questionToAsk = args.soru || (isMissingTime ? (args.netlestirme_sorusu || defaultClarify) : null);

              const createdNote = {
                baslik: sanitizeCardTitle(args.baslik) || args.baslik,
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
                  speakQuestion(questionToAsk, language, () => {
                    setTimeout(() => {
                      handleMicClick();
                    }, 300);
                  });
                }
              } else {
                const whisper = args.sesli_fisilti || generateWhisperText(createdNote, language);
                if (isSpoken) {
                  speakFeedback(whisper, language);
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
          userDomain: targetDomain,
          preferredDomain: targetDomain,
          language: language,
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
          const isMissingTime = sJson.data.eksik_bilgi || (!sJson.data.zaman && !sJson.data.tarih_iso && (sJson.data.baslik?.toLowerCase().includes('randevu') || sJson.data.baslik?.toLowerCase().includes('görüşme') || sJson.data.baslik?.toLowerCase().includes('buluşma') || sJson.data.baslik?.toLowerCase().includes('toplantı') || sJson.data.baslik?.toLowerCase().includes('meeting') || sJson.data.baslik?.toLowerCase().includes('appointment')));
          const defaultClarify = language === 'en' ? 'Which day and time should we schedule this for?' : 'Hangi gün ve saatte planlayalım?';
          const questionToAsk = sJson.data.soru || (isMissingTime ? defaultClarify : null);

          const createdNote = {
            ...sJson.data,
            baslik: sanitizeCardTitle(sJson.data.baslik) || sJson.data.baslik,
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
              speakQuestion(questionToAsk, language, () => {
                setTimeout(() => {
                  handleMicClick();
                }, 300);
              });
            }
          } else if (isSpoken) {
            const whisper = generateWhisperText(createdNote, language);
            speakFeedback(whisper, language);
          }
          parsedByServer = true;
        }
      }
    } catch {
      // Sunucuya erişilemezse yerel kural motoruna geç
    }

    if (!parsedByServer) {
      // Çevrimdışı / Hızlı Kural Motoru (Doğal Dil Ayrıştırıcı)
      const fallback = extractSimpleNoteFromText(textInput, currentNow, cards.slice(0, 15), targetDomain, language);
      console.log("2. Bilişsel Kural Motoru Devrede:", fallback);
      console.log("3. Ayrıştırılmış Veri:", fallback);
      const isMissingTime = fallback.eksik_bilgi || (!fallback.zaman && !fallback.tarih_iso && (fallback.baslik?.toLowerCase().includes('randevu') || fallback.baslik?.toLowerCase().includes('görüşme') || fallback.baslik?.toLowerCase().includes('buluşma') || fallback.baslik?.toLowerCase().includes('toplantı') || fallback.baslik?.toLowerCase().includes('meeting') || fallback.baslik?.toLowerCase().includes('appointment')));
      const defaultClarify = language === 'en' ? 'Which day and time should we schedule this for?' : 'Hangi gün ve saatte planlayalım?';
      const questionToAsk = fallback.soru || (isMissingTime ? defaultClarify : null);

      const createdNote = {
        ...fallback,
        baslik: sanitizeCardTitle(fallback.baslik) || fallback.baslik,
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
          speakQuestion(questionToAsk, language, () => {
            setTimeout(() => {
              handleMicClick();
            }, 300);
          });
        }
      } else if (isSpoken) {
        const whisper = generateWhisperText(createdNote, language);
        speakFeedback(whisper, language);
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

    // ⚡ Deterministik Regex Ön Temizleyici (Speech Sanitizer)
    // Model çağrılmadan önce "ııı", "şey", "yani", "hocam bir de" gibi dolgu sözcükler ve anlamsız sesler elenerek saf eylem cümlesi çıkarılır.
    const sanitizedText = sanitizeSpokenText(spokenText);
    console.log('[SpeechSanitizer] Ham ses:', spokenText, '-> Saf eylem cümlesi:', sanitizedText);

    // Yalnızca dolgu sesler veya mırıldanmalardan ibaretse ve görsel yoksa kullanıcıyı nazikçe uyar
    if (!sanitizedText && !imageToSend) {
      setStatusText(language === 'en' ? 'No clear action detected. Please speak again.' : 'Net bir eylem algılanamadı. Lütfen tekrar söyleyin.');
      resetMicUI();
      return;
    }

    const textToProcess = sanitizedText || spokenText.trim();

    if (imageToSend) {
      setStatusText(language === 'en' ? 'Analyzing image and speech...' : 'Görsel ve ses teşhis ediliyor...');
    } else {
      setStatusText(
        language === 'en'
          ? (textToProcess ? `Processing "${textToProcess}"...` : 'Understanding...')
          : (textToProcess ? `"${textToProcess}" işleniyor...` : 'Anlıyorum...')
      );
    }
    await processWithAI(textToProcess, imageToSend, true);
  };

  onSpeechCompletedRef.current = onSpeechCompleted;

  // Camera / Gallery Image Upload Handler
  const handleCameraChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatusText(language === 'en' ? 'Processing image...' : 'Görsel işleniyor...');

    try {
      const compressed = await compressImage(file);
      pendingCapturedImageRef.current = compressed;
      setPendingImage(compressed);
      setStatusText(
        language === 'en'
          ? 'Image ready. Speak to explain or tap to analyze.'
          : 'Görsel hazır. İster sesle anlat, ister doğrudan tıkla.'
      );
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
      setStatusText(language === 'en' ? 'Failed to process image' : 'Görsel işlenemedi');
      setTimeout(() => setStatusText(t.speakOrWrite), 2000);
    } finally {
      if (cameraInputRef.current) {
        cameraInputRef.current.value = '';
      }
    }
  };

  // Google Sign-In Handler
  const handleLogin = async () => {
    setStatusText(language === 'en' ? 'Connecting Google account...' : 'Google hesabı bağlanıyor...');
    
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
      setStatusText(language === 'en' ? 'Google account connected ✓' : 'Google hesabı bağlandı ✓');
      setTimeout(() => setStatusText(t.speakOrWrite), 2500);
    } catch (err: any) {
      console.warn('Google giriş uyarısı / hatası:', err?.code, err?.message || err);
      
      if (err?.code === 'auth/popup-blocked') {
        setStatusText(language === 'en' ? 'Popup blocked, redirecting...' : 'Açılır pencere engellendi, yönlendiriliyor...');
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectErr: any) {
          setStatusText(language === 'en' ? `Redirect error: ${redirectErr?.message || 'Unknown'}` : `Yönlendirme hatası: ${redirectErr?.message || redirectErr?.code || 'Bilinmeyen hata'}`);
          setTimeout(() => setStatusText(t.speakOrWrite), 4000);
        }
      } else if (err?.code === 'auth/unauthorized-domain') {
        const currentHost = window.location.hostname;
        setStatusText(language === 'en' ? `Unauthorized domain: add "${currentHost}" in Firebase` : `Domain yetkisiz: Firebase Console'da "${currentHost}" eklenmeli`);
        alert(`Firebase: "${currentHost}" domain is not yet in Firebase Console > Authentication > Authorized domains.`);
        setTimeout(() => setStatusText(t.speakOrWrite), 5000);
      } else if (err?.code === 'auth/cancelled-popup-request' || err?.code === 'auth/popup-closed-by-user') {
        setStatusText(language === 'en' ? 'Sign-in cancelled' : 'Giriş penceresi kapatıldı');
        setTimeout(() => setStatusText(t.speakOrWrite), 2500);
      } else {
        const msg = err?.message || err?.code || (language === 'en' ? 'Sign-in failed' : 'Giriş yapılamadı');
        setStatusText(language === 'en' ? `Sign-in error: ${msg}` : `Giriş hatası: ${msg}`);
        setTimeout(() => setStatusText(t.speakOrWrite), 4500);
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
    setStatusText(language === 'en' ? 'Signed out' : 'Hesaptan çıkış yapıldı');
    setTimeout(() => setStatusText(t.speakOrWrite), 2000);
  };

  const activeUser = currentUser || simulatedUser;
  const isCloudSync = !!activeUser;

  // ⚡ Mekânsal Güzergâh ve Bilişsel Yük Analizi
  const errandClusters = React.useMemo(() => clusterErrandsByLocation(cards), [cards]);
  const activeUncompletedCards = React.useMemo(() => cards.filter((c) => !isCompletedCard(c)), [cards]);
  const dailyLoad = React.useMemo(() => calculateDailyCognitiveLoad(activeUncompletedCards), [activeUncompletedCards]);

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
      theme === 'dark' ? 'dark bg-stone-950 text-stone-100' : 'bg-stone-100 text-stone-800'
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
            {/* Görünüm Modu Toggle (Tekli / İkili Izgara) */}
            <button
              id="view-mode-toggle-btn"
              type="button"
              onClick={toggleViewMode}
              title={viewMode === 'grid' ? t.singleView : t.dualGridView}
              className={`p-1.5 rounded-full transition-all cursor-pointer active:scale-95 ${
                viewMode === 'grid'
                  ? theme === 'dark' ? 'text-amber-300 bg-stone-800 ring-1 ring-amber-400/30' : 'text-stone-900 bg-stone-200 ring-1 ring-stone-300'
                  : theme === 'dark' ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
              }`}
            >
              {viewMode === 'grid' ? (
                /* 2-column grid icon */
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              ) : (
                /* Single list icon */
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>

            {/* Arama Toggle */}
            <button
              type="button"
              onClick={() => {
                setShowSearch((prev) => !prev);
                if (showSearch) setSearchQuery('');
              }}
              title={t.searchTitle}
              className={`p-1.5 rounded-full transition-colors cursor-pointer active:scale-95 ${
                showSearch 
                  ? theme === 'dark' ? 'text-white bg-stone-800' : 'text-stone-900 bg-stone-200'
                  : theme === 'dark' ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Geri Dönüşüm Kutusu Butonu (30 Günlük Saklama) */}
            <button
              id="recycle-bin-top-btn"
              type="button"
              onClick={() => setShowRecycleBinModal(true)}
              title={t.recycleBinTitle}
              className={`relative p-1.5 rounded-full transition-all cursor-pointer active:scale-95 ${
                trashNotes.length > 0
                  ? theme === 'dark'
                    ? 'text-amber-400 hover:bg-stone-800 hover:text-amber-300'
                    : 'text-amber-600 hover:bg-stone-100 hover:text-amber-700'
                  : theme === 'dark'
                    ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                    : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {trashNotes.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center border border-white dark:border-stone-900 leading-none">
                  {trashNotes.length > 99 ? '99+' : trashNotes.length}
                </span>
              )}
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

        {/* Kart Listesi Alanı */}
        <section
          id="cards-container"
          className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-full px-3 sm:px-5 py-2.5 sm:py-3 space-y-2.5 sm:space-y-3 pb-32"
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

          {/* Çoklu Seçim, Taşıma ve Toplu Silme Barı (Sticky & Mobile Optimized) */}
          {isSelectMode && (
            <div className="sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-stone-900/95 dark:bg-stone-950/95 backdrop-blur-md text-white text-xs p-3 rounded-2xl mb-3 shadow-xl border border-stone-800 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between sm:justify-start gap-2">
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
                  <span className="text-stone-300 font-medium bg-white/15 px-2 py-0.5 rounded-md text-[11px]">
                    {selectedCardIds.length} {t.selectedCount}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsSelectMode(false);
                    setSelectedCardIds([]);
                  }}
                  className="sm:hidden px-2 py-1 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer text-xs"
                >
                  {t.cancelSelection}
                </button>
              </div>

              {/* Hızlı Taşıma (Üst/Alt), Toplu Tamamlama ve Silme Butonları */}
              <div className="flex items-center justify-between sm:justify-end gap-1.5 flex-wrap pt-1.5 sm:pt-0 border-t sm:border-t-0 border-white/10">
                {/* Sıralama & Taşıma Butonları */}
                <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-xl">
                  <button
                    type="button"
                    disabled={selectedCardIds.length === 0}
                    onClick={() => moveSelectedNotes('top')}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-stone-100 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                    title={t.moveToTop}
                  >
                    <span>🔝</span>
                    <span className="hidden xs:inline">{t.moveToTop}</span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedCardIds.length === 0}
                    onClick={() => moveSelectedNotes('up')}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-stone-100 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                    title={t.moveSelectedUp}
                  >
                    <span>⬆️</span>
                    <span>{t.moveUp}</span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedCardIds.length === 0}
                    onClick={() => moveSelectedNotes('down')}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-stone-100 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                    title={t.moveSelectedDown}
                  >
                    <span>⬇️</span>
                    <span>{t.moveDown}</span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedCardIds.length === 0}
                    onClick={() => moveSelectedNotes('bottom')}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-stone-100 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                    title={t.moveToBottom}
                  >
                    <span>🔚</span>
                    <span className="hidden xs:inline">{t.moveToBottom}</span>
                  </button>
                </div>

                {/* Toplu Tamamla / Geri Al Butonu */}
                <button
                  type="button"
                  disabled={selectedCardIds.length === 0}
                  onClick={() => {
                    selectedCardIds.forEach((id) => toggleCardCompleted(id));
                    setStatusText(language === 'tr' ? `${selectedCardIds.length} kart güncellendi ✓` : `${selectedCardIds.length} cards updated ✓`);
                    setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, capture or write'), 2000);
                  }}
                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer active:scale-95 text-[11px]"
                  title={language === 'tr' ? 'Seçilenleri Tamamla / Geri Al' : 'Complete / Undo Selected'}
                >
                  <span>✓</span>
                  <span>{language === 'tr' ? 'Tamamla' : 'Done'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={selectedCardIds.length === 0}
                    onClick={deleteSelectedNotes}
                    className="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer active:scale-95 text-[11px]"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>{t.deleteSelected}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSelectMode(false);
                      setSelectedCardIds([]);
                    }}
                    className="hidden sm:inline-flex px-2.5 py-1.5 text-stone-300 hover:text-white rounded-xl hover:bg-stone-800 transition-colors cursor-pointer text-xs"
                  >
                    {t.cancelSelection}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ⚡ Bilişsel Yük ve Odak Bildirimi */}
          {dailyLoad.isOverloaded && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/20 mb-2.5 animate-in fade-in">
              <span className="text-base shrink-0">🧠</span>
              <span className="flex-1 leading-snug">{dailyLoad.warningNote}</span>
            </div>
          )}

          {/* ⚡ Mekânsal Güzergâh Kümeleme (Errand Clusters) */}
          {errandClusters.length > 0 && !searchQuery && (
            <div className="space-y-1.5 mb-2.5">
              {errandClusters.map((cluster) => (
                <div
                  key={cluster.clusterId}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border shadow-2xs transition-all"
                  style={{ backgroundColor: cluster.color, borderColor: 'rgba(0,0,0,0.06)' }}
                >
                  <span className="text-base shrink-0">{cluster.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-stone-900 mr-1.5">
                      {cluster.clusterTitle} Güzergâhı:
                    </span>
                    <span className="text-[11px] text-stone-700 truncate">
                      {cluster.taskTitles.join(' + ')}
                    </span>
                  </div>
                  <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-full font-semibold text-stone-800 shrink-0">
                    {cluster.taskIds.length} İş Tek Seferde
                  </span>
                </div>
              ))}
            </div>
          )}

          {filteredCards.length === 0 ? (
            <div className="text-center text-xs text-stone-400 mt-10">
              {searchQuery ? t.noSearchResults : t.emptyNotesDesc}
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-2.5 sm:gap-3.5 items-start' : 'flex flex-col gap-3 sm:gap-4'}>
              {sortNotiviaCards(filteredCards).map((item) => {
                // Kartın süresinin dolup dolmadığını ve tamamlanma durumunu kontrol et
                const isExpired = item.tarih_iso ? new Date(item.tarih_iso).getTime() < Date.now() : false;
                const isCompleted = isCompletedCard(item);
                const isWeatherTriggered = 
                  (item.tetikleyici?.sart === 'yagmur' && weather?.isRaining) ||
                  (item.tetikleyici?.sart === 'don' && weather?.isFreezing);
                const cardBgColor = isWeatherTriggered ? '#FEE2E2' : (item.guncel_renk || item.renk || getCardColor(item.id, item.baslik));
                const isSelected = selectedCardIds.includes(item.id);

                // Mobil Sola Kaydırma (Swipe-to-Reveal: Düzenle, Sil) Durumu
                const isSwipedOpen = swipedCardId === item.id;
                const isDraggingThis = activeSwipingCardIdRef.current === item.id && isSwipingCardRef.current;
                const currentDragOffset = swipeOffsets[item.id];
                // İkili ızgara görünümünde kart ekran dışına uçmaz; hızlı eylem paneli yüzen bir katman (HUD) olarak açılır
                const cardOffset = viewMode === 'grid'
                  ? (isDraggingThis && currentDragOffset !== undefined ? currentDragOffset : 0)
                  : (currentDragOffset !== undefined ? currentDragOffset : (isSwipedOpen ? -144 : 0));

                return (
                  <React.Fragment key={item.id}>
                    {/* Yukarıya Yerleştirme Göstergesi (Drop Indicator Before) */}
                    {dragOverCardId === item.id && dragPosition === 'before' && (
                      <div className="w-full col-span-full py-1 flex items-center justify-center animate-in fade-in zoom-in-95 duration-100">
                        <div className="w-full h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full shadow-md flex items-center justify-center relative">
                          <span className="absolute bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs -top-2.5 flex items-center gap-1">
                            <span>⬆️</span> {language === 'tr' ? 'Buraya Taşı' : 'Move Here'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Sola Kaydırılabilir Kart Dış Kapsayıcısı */}
                    <div
                      className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl group/swipe select-none card-swipe-container"
                      data-card-id={item.id}
                    >
                      {/* Tek Sütun Görünümünde (Single View) Arkadan Açılan Mobil Aksiyon Çekmecesi (Düzenle, Sil) */}
                      {viewMode !== 'grid' && (
                        <div className="absolute inset-y-0 right-0 flex items-stretch z-0 bg-stone-900 dark:bg-stone-950 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
                          {/* 1. Düzenle */}
                          <button
                            type="button"
                            id={`swipe-edit-${item.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingNote(item);
                              setSwipedCardId(null);
                              setSwipeOffsets({});
                              if (typeof navigator !== 'undefined' && navigator.vibrate) {
                                try { navigator.vibrate(25); } catch {}
                              }
                            }}
                            className="w-18 sm:w-20 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer px-1 text-center select-none border-r border-white/10 min-h-[48px]"
                            title={language === 'tr' ? 'Kartı Düzenle' : 'Edit'}
                          >
                            <span className="text-lg sm:text-xl">✏️</span>
                            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight">
                              {language === 'tr' ? 'Düzenle' : 'Edit'}
                            </span>
                          </button>

                          {/* 2. Sil (Öncesinde Onay İster) */}
                          <button
                            type="button"
                            id={`swipe-delete-${item.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmNote(item);
                              setSwipedCardId(null);
                              setSwipeOffsets({});
                              if (typeof navigator !== 'undefined' && navigator.vibrate) {
                                try { navigator.vibrate(30); } catch {}
                              }
                            }}
                            className="w-18 sm:w-20 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer px-1 text-center select-none min-h-[48px]"
                            title={language === 'tr' ? 'Notu Sil' : 'Delete'}
                          >
                            <span className="text-lg sm:text-xl">🗑️</span>
                            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight">
                              {language === 'tr' ? 'Sil' : 'Delete'}
                            </span>
                          </button>
                        </div>
                      )}

                      {/* İkili Izgarada (Grid View) Kaydırma Esnasında Gösterilen Sağ Çekme İpucu */}
                      {viewMode === 'grid' && (
                        <div className="absolute inset-y-0 right-0 w-10 bg-stone-900 text-white flex items-center justify-center rounded-r-xl z-0 text-xs font-bold shadow-inner opacity-80">
                          <span>⚙️</span>
                        </div>
                      )}

                      {/* İKİLİ IZGARADA (Grid View) Sola Çekince Açılan Pratik Yüzen Aksiyon HUD'ı */}
                      {/* Kartın boyutlarına kusursuz oturan 2 hızlı aksiyon: Düzenle, Sil */}
                      {viewMode === 'grid' && isSwipedOpen && (
                        <div
                          className="absolute inset-0 z-30 bg-stone-900/95 dark:bg-stone-950/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between text-white shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-white/15"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Başlık ve Kapat Butonu */}
                          <div className="flex items-center justify-between gap-1 border-b border-white/10 pb-1 px-0.5">
                            <div className="flex items-center gap-1.5 min-w-0 flex-1">
                              <span className="text-xs shrink-0">{item.ikon || '📌'}</span>
                              <span className="text-[11px] font-bold truncate text-stone-100" title={item.baslik}>
                                {item.baslik}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSwipedCardId(null);
                                setSwipeOffsets({});
                              }}
                              className="w-5 h-5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 flex items-center justify-center text-[10px] text-stone-300 hover:text-white cursor-pointer transition-colors shrink-0"
                              title={language === 'tr' ? 'Kapat' : 'Close'}
                            >
                              ✕
                            </button>
                          </div>

                          {/* 2 Pratik ve Ergonomik Aksiyon Butonu */}
                          <div className="flex flex-col gap-1.5 flex-1 justify-center py-1">
                            {/* 1. Düzenle */}
                            <button
                              type="button"
                              id={`grid-swipe-edit-${item.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingNote(item);
                                setSwipedCardId(null);
                                setSwipeOffsets({});
                                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                                  try { navigator.vibrate(25); } catch {}
                                }
                              }}
                              className="w-full flex-1 min-h-[32px] max-h-[42px] px-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:from-indigo-800 active:to-indigo-900 text-white flex items-center justify-between shadow-2xs active:scale-95 transition-all text-left cursor-pointer"
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-xs sm:text-sm shrink-0">✏️</span>
                                <span className="text-[10px] sm:text-[11px] font-bold truncate">
                                  {language === 'tr' ? 'Düzenle' : 'Edit'}
                                </span>
                              </div>
                              <span className="text-[10px] opacity-70 font-mono">›</span>
                            </button>

                            {/* 2. Sil */}
                            <button
                              type="button"
                              id={`grid-swipe-delete-${item.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmNote(item);
                                setSwipedCardId(null);
                                setSwipeOffsets({});
                                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                                  try { navigator.vibrate(30); } catch {}
                                }
                              }}
                              className="w-full flex-1 min-h-[32px] max-h-[42px] px-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 text-white flex items-center justify-between shadow-2xs active:scale-95 transition-all text-left cursor-pointer"
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-xs sm:text-sm shrink-0">🗑️</span>
                                <span className="text-[10px] sm:text-[11px] font-bold truncate">
                                  {language === 'tr' ? 'Notu Sil' : 'Delete'}
                                </span>
                              </div>
                              <span className="text-[10px] opacity-70 font-mono">›</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Ön Plandaki Kaydırılabilir Not Kartı */}
                      <div
                        draggable={!isSelectMode}
                        onDragStart={(e) => handleDesktopDragStart(e, item.id)}
                        onDragOver={(e) => handleDesktopDragOver(e, item.id)}
                        onDragLeave={(e) => handleDesktopDragLeave(e, item.id)}
                        onDrop={(e) => handleDesktopDrop(e, item.id)}
                        onDragEnd={handleDesktopDragEnd}
                        onTouchStart={(e) => handleCardTouchStart(item.id, e)}
                        onTouchMove={(e) => handleCardTouchMove(item.id, e)}
                        onTouchEnd={() => handleCardTouchEnd(item.id)}
                        onTouchCancel={() => handleCardTouchEnd(item.id)}
                        onMouseDown={(e) => handleCardMouseDown(item.id, e)}
                        onMouseMove={(e) => handleCardMouseMove(item.id, e)}
                        onMouseUp={() => handleCardMouseUp(item.id)}
                        onMouseLeave={() => handleCardMouseUp(item.id)}
                        onContextMenu={(e) => {
                          if (isLongPressFiredRef.current || isSelectMode) {
                            e.preventDefault();
                          }
                        }}
                        onClick={(e) => handleCardClick(item.id, e)}
                        className={`card relative z-10 w-full max-w-full overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md ${
                          viewMode === 'grid'
                            ? 'p-2.5 sm:p-3 rounded-xl sm:rounded-2xl gap-1.5'
                            : 'p-3.5 sm:p-4 rounded-2xl gap-2 sm:gap-2.5'
                        } ${
                          item.isRemoving ? 'scale-95 opacity-0' : 'scale-100'
                        } ${
                          draggingCardId === item.id
                            ? 'opacity-50 scale-[1.02] ring-2 ring-indigo-500 shadow-2xl z-30 cursor-grabbing'
                            : ''
                        } ${
                          isWeatherTriggered
                            ? 'ring-2 ring-red-500 bg-red-50 animate-pulse'
                            : isCompleted
                            ? 'opacity-70 saturate-50 border-solid border-stone-300/80 shadow-none'
                            : isExpired 
                            ? 'opacity-95 border-dashed border-amber-300/80 shadow-xs' 
                            : 'opacity-100 border-solid border-black/8 dark:border-white/10 shadow-xs'
                        } ${isSelected ? 'ring-2 ring-stone-800 dark:ring-stone-200' : ''} ${
                          isSelectMode ? 'cursor-pointer select-none active:scale-[0.99]' : ''
                        }`}
                        style={{
                          backgroundColor: cardBgColor,
                          borderWidth: '1px',
                          transform: `translateX(${cardOffset}px)`,
                          transition: isDraggingThis ? 'none' : 'transform 0.28s cubic-bezier(0.2, 0.85, 0.32, 1.05)',
                          WebkitTouchCallout: 'none',
                        }}
                      >
                    {/* Üst Kısım: Başlık ve İkon (Sade, Geniş ve Mobil Uyumlu Düzen) */}
                    <div className="flex items-start justify-between gap-2 sm:gap-2.5 w-full">
                      {/* Başlık ve İkon */}
                      <div className="flex items-start gap-2 sm:gap-2.5 min-w-0 flex-1 w-full">
                        {/* Çoklu Seçim Modunda Seçim Kutucuğu ve Sürükleme Kulpu */}
                        {isSelectMode && (
                          <div className="flex items-center gap-1 shrink-0 mt-0.5">
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
                              className={`rounded-md border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                                viewMode === 'grid' ? 'w-4 h-4 text-[9px]' : 'w-5 h-5 text-xs'
                              } ${
                                isSelected
                                  ? 'bg-stone-900 border-stone-900 text-white'
                                  : 'border-stone-400 bg-white/70 hover:bg-white text-transparent'
                              }`}
                              title={isSelected ? (language === 'en' ? 'Deselect' : 'Seçimi kaldır') : (language === 'en' ? 'Select' : 'Seç')}
                            >
                              ✓
                            </button>
                            <span
                              className="text-stone-400 dark:text-stone-500 text-xs font-mono font-bold tracking-tighter select-none cursor-grab active:cursor-grabbing px-0.5"
                              title={language === 'tr' ? 'Sürükleyerek sırasını değiştirin' : 'Drag to reorder'}
                            >
                              ⋮⋮
                            </span>
                          </div>
                        )}

                        {/* İkon / Medya Rozeti */}
                        <div className="relative shrink-0">
                          {item.mediaId ? (
                            <CardMediaThumbnail
                              mediaId={item.mediaId}
                              onClick={() => viewFullImage(item.mediaId!)}
                            />
                          ) : (
                            <div className={`${viewMode === 'grid' ? 'w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg' : 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl'} flex items-center justify-center bg-white/85 dark:bg-black/25 border border-black/5 shadow-2xs select-none shrink-0 ${isCompleted ? 'grayscale opacity-60' : ''}`}>
                              <span className={viewMode === 'grid' ? 'text-sm sm:text-base' : 'text-xl sm:text-2xl'}>
                                {item.ikon || '📌'}
                              </span>
                            </div>
                          )}
                          {/* Küçük Durum Gösterge Noktası */}
                          {isWeatherTriggered ? (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white animate-ping" />
                          ) : isExpired ? (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" title={language === 'en' ? 'Overdue' : 'Süresi doldu'} />
                          ) : isCompleted ? (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-stone-700 ring-2 ring-white flex items-center justify-center text-[7px] text-white">✓</span>
                          ) : null}
                        </div>

                        {/* Kart Başlığı ve Zaman Damgası */}
                        <div className="min-w-0 flex-1">
                          <h2
                            contentEditable={!isCompleted && !isSelectMode}
                            suppressContentEditableWarning={true}
                            spellCheck={false}
                            className={`font-semibold leading-snug tracking-tight outline-hidden break-words hyphens-auto w-full ${
                              viewMode === 'grid' ? 'text-[11.5px] sm:text-xs line-clamp-2' : 'text-[15px] sm:text-base'
                            } ${
                              isCompleted
                                ? 'text-stone-500 line-through decoration-stone-500/70'
                                : isExpired
                                ? 'text-stone-800 cursor-text'
                                : 'text-stone-900 dark:text-stone-100 cursor-text'
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
                        </div>
                      </div>
                    </div>

                  {/* Kart Gövdesi: Rozetler, Uyarılar ve Alt Görevler (Kartın Tam Genişliğini Kullanır) */}
                  <div className={`w-full ${viewMode === 'grid' ? 'space-y-1.5' : 'space-y-2'}`}>
                    {/* Çakışma Uyarısı */}
                    {(item.conflictWith || item.conflictWarning) && (
                      <div className={`flex items-center gap-1 text-amber-900 bg-amber-500/15 border border-amber-500/30 rounded-lg break-words ${
                        viewMode === 'grid' ? 'text-[10px] p-1.5' : 'text-xs px-2.5 py-1'
                      }`}>
                        <span className="shrink-0">⚠️</span>
                        <span className="leading-tight">'{item.conflictWith || item.conflictWarning}' {t.conflictsWith}</span>
                      </div>
                    )}

                    {/* Netleştirme Sorusu / Eksik Bilgi Uyarısı - İnteraktif IVR Clarification Bubble */}
                    {(item.eksik_bilgi || item.netlestirme_sorusu || item.soru) && (
                      <div className={`rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 text-stone-900 dark:text-stone-100 flex flex-col gap-2 shadow-xs transition-all animate-in fade-in slide-in-from-top-1 duration-200 ${
                        viewMode === 'grid' ? 'p-2 text-[10px]' : 'p-2.5 sm:p-3 text-xs'
                      }`}>
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                            🎙️
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                                {language === 'en' ? 'Voice Clarification' : 'Sesli Netleştirme'}
                              </span>
                              <span className="text-[8.5px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-200 font-semibold font-mono">
                                IVR
                              </span>
                            </div>
                            <p className="font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                              {item.netlestirme_sorusu || item.soru || (language === 'en' ? 'Which day and time should we plan for?' : 'Hangi gün ve saat için planlayalım?')}
                            </p>
                          </div>
                        </div>

                        {/* Tek dokunuşluk interaktif hızlı yanıt butonları */}
                        <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-amber-500/20">
                          {getQuickClarificationOptions().map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResolveClarification(item.id, opt);
                              }}
                              className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-amber-950/70 border border-stone-200 dark:border-stone-700 hover:border-amber-400 active:scale-95 transition-all shadow-2xs cursor-pointer"
                              title={`${opt.label} olarak kaydet`}
                            >
                              <span>{opt.icon}</span>
                              <span className="whitespace-nowrap">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Anomali veya Bilişsel Zeka Notu */}
                    {item.anomali_notu && (
                      <div className={`flex items-start gap-1 bg-amber-500/10 text-amber-950 border border-amber-500/20 rounded-lg leading-tight break-words ${
                        viewMode === 'grid' ? 'text-[10px] p-1.5' : 'text-xs px-2.5 py-1.5'
                      }`}>
                        <span className="shrink-0 text-xs mt-0.5">💡</span>
                        <p className="font-normal">{item.anomali_notu}</p>
                      </div>
                    )}

                    {/* 1. Çıkarılan Metrik ve Parametre Rozetleri (Extracted Entity Metrics) */}
                    {item.extracted_metrics && item.extracted_metrics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {item.extracted_metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className={`inline-flex items-center gap-1 rounded-md bg-stone-900/10 dark:bg-white/10 text-stone-900 dark:text-stone-100 font-medium border border-black/5 dark:border-white/10 ${
                              viewMode === 'grid' ? 'text-[9px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5'
                            }`}
                          >
                            <span className="opacity-70 text-[8.5px] uppercase tracking-wider">{m.label}:</span>
                            <span className="font-bold">{m.value} {m.unit}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 2. Kilometre Taşı İlerleme Zinciri (Sequential Milestone Chain) */}
                    {item.milestone_chain && item.milestone_chain.steps.length > 0 && (
                      <div className="mt-1 p-1.5 sm:p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-stone-800 dark:text-stone-200 mb-1">
                          <span className="flex items-center gap-1 truncate">
                            <span>⛓️</span>
                            <span className="truncate">{item.milestone_chain.chainName}</span>
                          </span>
                          <span className="text-[9px] text-stone-500 font-mono shrink-0 ml-1">
                            {item.milestone_chain.currentStepIndex + 1}/{item.milestone_chain.steps.length}
                          </span>
                        </div>

                        {/* Yatay Adım Çizgisi */}
                        <div className="space-y-1">
                          {item.milestone_chain.steps.map((step, sIdx) => (
                            <div
                              key={sIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMilestoneStep(item.id, sIdx);
                              }}
                              className="flex items-center gap-1.5 text-xs py-0.5 px-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                            >
                              <span
                                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8.5px] font-bold shrink-0 transition-colors ${
                                  step.isCompleted
                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                    : sIdx === item.milestone_chain?.currentStepIndex
                                    ? 'border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold'
                                    : 'border border-stone-400 text-stone-500 bg-white/70 dark:bg-stone-800'
                                }`}
                              >
                                {step.isCompleted ? '✓' : sIdx + 1}
                              </span>
                              <span
                                className={`flex-1 text-[10px] sm:text-[11px] select-none truncate ${
                                  step.isCompleted
                                    ? 'line-through text-stone-400 dark:text-stone-500'
                                    : sIdx === item.milestone_chain?.currentStepIndex
                                    ? 'font-bold text-stone-900 dark:text-white'
                                    : 'text-stone-700 dark:text-stone-300'
                                }`}
                              >
                                {step.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. Proaktif Sıradaki Eylem Önerisi (Next-Action Suggestion) */}
                    {item.next_action && (
                      <div className="mt-1 p-1.5 sm:p-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-950 dark:text-indigo-100 flex items-center justify-between gap-1.5 text-xs">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1 font-semibold text-[10px] sm:text-[11px] text-indigo-700 dark:text-indigo-300">
                            <span>⚡</span>
                            <span className="truncate">{item.next_action.title}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAdoptNextAction(item.next_action!);
                          }}
                          className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[9px] sm:text-[10px] rounded-md shadow-2xs cursor-pointer active:scale-95 transition-all shrink-0"
                          title="Bu öneriyi yeni görev olarak ekle"
                        >
                          + Ekle
                        </button>
                      </div>
                    )}

                    {/* Alt Görevler: Görsel İlerleme Çubuğu ve Liste */}
                    {item.action_items && item.action_items.length > 0 && (() => {
                      const completedCount = item.action_items.filter(t => t.is_completed).length;
                      const totalCount = item.action_items.length;
                      const percent = Math.round((completedCount / totalCount) * 100);

                      return (
                        <div className="mt-1 pt-1 border-t border-black/5 dark:border-white/5">
                          <details className="group" open>
                            <summary className="flex items-center justify-between cursor-pointer list-none select-none py-0.5">
                              {/* İlerleme Çubuğu ve İkonik İndikatör */}
                              <div className="flex items-center gap-1.5 flex-1 mr-2 min-w-0">
                                <span className="text-[10px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-0.5 shrink-0">
                                  <span>📋</span>
                                  <span>{completedCount}/{totalCount}</span>
                                </span>
                                {/* Görsel Mini Progress Bar */}
                                <div className="flex-1 max-w-[45px] sm:max-w-[70px] h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden shrink-0">
                                  <div
                                    className="h-full bg-stone-800 dark:bg-stone-200 rounded-full transition-all duration-300"
                                    style={{ width: `${percent}%` }}
                                  />
                                </div>
                                <span className="text-[9px] font-mono text-stone-500 shrink-0">%{percent}</span>
                              </div>
                              <span className="text-[9px] text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>

                            <div className="mt-1 space-y-0.5 sm:space-y-1 bg-white/50 dark:bg-black/20 p-1.5 rounded-lg border border-black/5 dark:border-white/5">
                              {item.action_items.map((task, tIdx) => (
                                <div
                                  key={tIdx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleActionItem(item.id, tIdx);
                                  }}
                                  className="flex items-center gap-2 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-white/70 dark:hover:bg-white/10 active:scale-[0.99] transition-all group/task min-h-[36px]"
                                >
                                  {/* Özel Tiklenebilir Şekil */}
                                  <span className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-md border flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all shrink-0 ${
                                    task.is_completed 
                                      ? 'bg-stone-800 border-stone-800 text-white shadow-2xs dark:bg-white dark:text-stone-900' 
                                      : 'border-stone-400 bg-white group-hover/task:border-stone-700 shadow-2xs'
                                  }`}>
                                    {task.is_completed ? '✓' : ''}
                                  </span>
                                  <span
                                    className={`text-xs sm:text-[13px] leading-snug select-none break-words flex-1 min-w-0 transition-all ${
                                      task.is_completed
                                        ? 'line-through text-stone-400 dark:text-stone-500 opacity-60'
                                        : 'text-stone-900 dark:text-white font-medium'
                                    }`}
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

                  {/* Kartın Kaydedildiği Tarih ve Saat (Sağ Alt Köşe) */}
                  <div className="flex items-center justify-end w-full pt-1 mt-auto select-none pointer-events-none">
                    <span
                      className={`font-mono text-stone-500/80 dark:text-stone-400/80 tracking-tight flex items-center gap-1 ${
                        viewMode === 'grid' ? 'text-[8.5px]' : 'text-[9.5px]'
                      }`}
                      title={language === 'tr' ? 'Kaydedilme Tarihi ve Saati' : 'Saved Date & Time'}
                    >
                      <span>{formatCreatedTime(item.createdAt || (!isNaN(Number(item.id)) ? Number(item.id) : item.tarih_iso) || Date.now(), language)}</span>
                    </span>
                  </div>
                </div>
              </div>

                {/* Aşağıya Yerleştirme Göstergesi (Drop Indicator After) */}
                {dragOverCardId === item.id && dragPosition === 'after' && (
                  <div className="w-full col-span-full py-1 flex items-center justify-center animate-in fade-in zoom-in-95 duration-100">
                    <div className="w-full h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full shadow-md flex items-center justify-center relative">
                      <span className="absolute bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs -top-2.5 flex items-center gap-1">
                        <span>⬇️</span> {language === 'tr' ? 'Buraya Taşı' : 'Move Here'}
                      </span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
            })}
          </div>
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
                  alt={language === 'en' ? 'Preview' : 'Önizleme'}
                  onClick={() => setModalImgSrc(pendingImage)}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-300 dark:border-amber-700 shrink-0 cursor-pointer shadow-xs active:scale-95"
                  title={language === 'en' ? 'Click to enlarge' : 'Büyütmek için tıkla'}
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-amber-950 dark:text-amber-100 truncate flex items-center gap-1">
                    <span>📷</span> <span>{language === 'en' ? 'Image Uploaded' : 'Görsel Yüklendi'}</span>
                  </p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 truncate">
                    {language === 'en' ? 'Explain by voice or analyze directly' : 'İster sesle anlat, ister hemen teşhis et'}
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
                    setStatusText(language === 'en' ? 'Analyzing image...' : 'Görsel teşhis ediliyor...');
                    await processWithAI(textInput.trim(), img, true);
                    setTextInput('');
                  }}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>✨ {language === 'en' ? 'Analyze' : 'Teşhis Et'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPendingImage(null);
                    pendingCapturedImageRef.current = null;
                    setStatusText(language === 'en' ? 'Speak, capture, or type' : 'Söyle, çek ya da yaz');
                  }}
                  className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg cursor-pointer text-sm"
                  title={language === 'en' ? 'Cancel Image' : 'Görseli İptal Et'}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Tek ve Bütünleşik Metin/Görev Giriş Formu (Alt Bölümde Toplu ve Rahat Kullanım) */}
          {showTextInput && (
            <form
              id="text-input-form"
              onSubmit={handleManualTextSubmit}
              className={`w-full mb-3 p-3 rounded-2xl border shadow-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${
                theme === 'dark'
                  ? 'bg-stone-900/95 border-stone-700 text-stone-100'
                  : 'bg-white border-stone-200 text-stone-900'
              }`}
            >
              {/* 1. Canlı Niyet Radar Barı (Live Intent Waveform) */}
              {liveIntentRoute.hasActiveMatch && (
                <div
                  className="mb-2 px-3 py-1.5 rounded-xl border flex items-center justify-between gap-2 shadow-xs transition-all animate-in fade-in duration-200"
                  style={{
                    backgroundColor: `${liveIntentRoute.color}20`,
                    borderColor: `${liveIntentRoute.color}60`
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex items-end gap-0.5 h-3 px-0.5 shrink-0">
                      <span className="w-1 bg-stone-800 dark:bg-stone-200 rounded-full animate-pulse h-2" style={{ animationDuration: '400ms' }} />
                      <span className="w-1 bg-stone-800 dark:bg-stone-200 rounded-full animate-pulse h-3" style={{ animationDuration: '600ms', animationDelay: '150ms' }} />
                      <span className="w-1 bg-stone-800 dark:bg-stone-200 rounded-full animate-pulse h-2" style={{ animationDuration: '450ms', animationDelay: '300ms' }} />
                    </div>
                    <span className="text-base shrink-0">{liveIntentRoute.icon}</span>
                    <div className="min-w-0 flex items-center gap-1.5 truncate">
                      <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 truncate">
                        {liveIntentRoute.domainLabel}:
                      </span>
                      <span className="text-[11px] font-medium text-stone-700 dark:text-stone-300 truncate">
                        {liveIntentRoute.routeTitle}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="hidden sm:inline-block text-[9.5px] font-medium bg-white/80 dark:bg-stone-800/80 px-2 py-0.5 rounded-full border border-black/5 dark:border-white/10 text-stone-600 dark:text-stone-300">
                      🏛️ {liveIntentRoute.institution}
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-stone-900/10 dark:bg-white/10 text-stone-800 dark:text-stone-200">
                      %{Math.round(liveIntentRoute.confidence * 100)}
                    </span>
                  </div>
                </div>
              )}

              {/* 2 Kelimelik Akıllı Tamamlayıcı Çipler (Instant Jargon Chips) */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 mb-2 scrollbar-none -mx-1 px-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider shrink-0 flex items-center gap-1 mr-0.5">
                  <span>⚡</span>
                  <span>{language === 'en' ? 'Quick:' : 'Hızlı:'}</span>
                </span>
                {sortedInstantJargonChips.slice(0, 8).map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTextInput(chip.fullPrompt || chip.prompt || chip.label);
                      setTimeout(() => manualTextInputRef.current?.focus(), 50);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-all active:scale-95 shadow-2xs cursor-pointer"
                  >
                    <span>{chip.icon}</span>
                    <span>{chip.label || chip.chipText}</span>
                  </button>
                ))}
              </div>

              <textarea
                id="manual-text-input"
                ref={manualTextInputRef}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={
                  language === 'tr'
                    ? 'Notunuzu yazın veya maddeleri alt alta ekleyin...\n(Shift+Enter ile alt satır, Enter veya Ekle butonu ile kaydet)'
                    : 'Write your note or list items line by line...\n(Shift+Enter for new line, Enter or Add to save)'
                }
                rows={2}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleManualTextSubmit(e);
                  }
                }}
                className="w-full bg-transparent text-sm outline-none resize-none placeholder-stone-400 dark:placeholder-stone-500 leading-relaxed min-h-[48px] max-h-[120px]"
              />
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/80 mt-1">
                <span className="text-[11px] text-stone-400 dark:text-stone-500">
                  {textInput.includes('\n') 
                    ? (language === 'tr' ? '📋 Görev Listesi olarak kaydedilecek' : '📋 Will save as Task List') 
                    : (language === 'tr' ? '💡 Çoklu madde için satır başı yapın' : '💡 Use new lines for checklist')}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTextInput(false);
                      setTextInput('');
                    }}
                    className="px-2.5 py-1 text-xs text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    {language === 'tr' ? 'Kapat' : 'Close'}
                  </button>
                  <button
                    type="submit"
                    disabled={!textInput.trim() && !pendingImage}
                    className="px-3.5 py-1.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl active:scale-95 disabled:opacity-40 transition-all shrink-0 cursor-pointer shadow-xs"
                  >
                    {textInput.includes('\n')
                      ? (language === 'tr' ? 'Listeyi Kaydet' : 'Save List')
                      : t.addButton}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Mikrofon açıkken Canlı Niyet Radar Barı (Live Intent Waveform) */}
          {isListening && liveIntentRoute.hasActiveMatch && (
            <div
              className="mb-2 px-3 py-1.5 rounded-2xl border flex items-center justify-between gap-2 shadow-sm backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-1 max-w-lg mx-auto w-full"
              style={{
                backgroundColor: `${liveIntentRoute.color}25`,
                borderColor: `${liveIntentRoute.color}70`
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-end gap-0.5 h-3.5 px-0.5 shrink-0">
                  <span className="w-1 bg-red-600 dark:bg-red-400 rounded-full animate-pulse h-2" style={{ animationDuration: '400ms' }} />
                  <span className="w-1 bg-red-600 dark:bg-red-400 rounded-full animate-pulse h-3.5" style={{ animationDuration: '550ms', animationDelay: '120ms' }} />
                  <span className="w-1 bg-red-600 dark:bg-red-400 rounded-full animate-pulse h-2.5" style={{ animationDuration: '480ms', animationDelay: '250ms' }} />
                  <span className="w-1 bg-red-600 dark:bg-red-400 rounded-full animate-pulse h-3" style={{ animationDuration: '520ms', animationDelay: '60ms' }} />
                </div>
                <span className="text-base shrink-0">{liveIntentRoute.icon}</span>
                <div className="min-w-0 flex items-center gap-1.5 truncate">
                  <span className="text-[11.5px] font-bold text-stone-900 dark:text-stone-100 truncate">
                    {liveIntentRoute.domainLabel}:
                  </span>
                  <span className="text-[11.5px] font-semibold text-stone-800 dark:text-stone-200 truncate">
                    {liveIntentRoute.routeTitle}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-medium text-stone-700 dark:text-stone-300 bg-white/80 dark:bg-stone-900/80 px-2 py-0.5 rounded-full border border-black/5 dark:border-white/10 shadow-2xs">
                  🏛️ {liveIntentRoute.institution}
                </span>
              </div>
            </div>
          )}

          {/* Sesli Asistan Durum ve Dalga Göstergesi */}
          {isListening ? (
            <div className="mb-3 px-3.5 py-1.5 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/80 rounded-full flex items-center gap-2.5 shadow-sm animate-in fade-in duration-200">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-tight">
                {liveSpeechTranscript ? `"${liveSpeechTranscript}"` : (statusText || 'Dinliyorum...')}
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
          className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 ${theme === 'dark' ? 'dark' : ''}`}
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
          className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 ${theme === 'dark' ? 'dark' : ''}`}
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

      {/* Kart Düzenleme Modalı (Tüm Alarm ve Kart Ayarları Tek Yerde) */}
      <EditNoteModal
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        note={editingNote}
        onSave={handleSaveEditedNote}
        language={language}
        theme={theme}
        initialTab={editingNoteInitialTab}
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
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
        onOpenRecycleBin={() => {
          setIsSettingsOpen(false);
          setShowRecycleBinModal(true);
        }}
        trashCount={trashNotes.length}
      />

      {/* Geri Dönüşüm Kutusu Modalı (30 Gün Saklama & Geri Alma) */}
      <RecycleBinModal
        isOpen={showRecycleBinModal}
        onClose={() => setShowRecycleBinModal(false)}
        trashItems={trashNotes}
        onRestoreItem={restoreTrashItem}
        onPermanentDeleteItem={permanentDeleteTrashItem}
        onRestoreAll={restoreAllTrashItems}
        onEmptyTrash={emptyTrash}
        theme={theme}
        language={language}
      />

      {/* Not Silme Onay Modalı (Mobil Ergonomik ve Güvenli Onay Penceresi) */}
      {deleteConfirmNote && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setDeleteConfirmNote(null)}
        >
          <div
            className="w-full sm:max-w-md bg-white dark:bg-stone-900 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobil Çekme Çizgisi */}
            <div className="w-12 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 text-2xl shadow-xs">
                🗑️
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-snug">
                  {language === 'tr' ? 'Notu Çöp Kutusuna Taşı?' : 'Move note to trash?'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {deleteConfirmNote.ikon || '📌'} {deleteConfirmNote.baslik}
                  </span>
                  {language === 'tr' 
                    ? ' başlıklı not geri dönüşüm kutusuna taşınacak ve 30 gün boyunca saklanacaktır.' 
                    : ' will be moved to the recycle bin and kept for 30 days.'}
                </p>
              </div>
            </div>

            {/* Butonlar: Mobil Ergonomik ve Kolay Dokunulabilir */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row items-center gap-2.5 sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteConfirmNote(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-medium text-sm hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95 transition-all cursor-pointer text-center"
              >
                {language === 'tr' ? 'Vazgeç' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const idToDelete = deleteConfirmNote.id;
                  setDeleteConfirmNote(null);
                  directDeleteNote(idToDelete);
                  if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    try { navigator.vibrate([20, 50, 20]); } catch {}
                  }
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold text-sm shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <span>🗑️</span>
                <span>{language === 'tr' ? 'Çöp Kutusuna Taşı' : 'Move to Trash'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
