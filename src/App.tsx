import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Mic } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import {
  auth,
  googleProvider,
  standardGoogleProvider,
  googleDriveCalendarProvider,
  connectGoogleDriveAndCalendar,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  setGoogleAccessToken,
  getGoogleAccessToken,
  googleAccessToken,
  refreshGoogleAccessToken,
  createCalendarEvent,
  updateCalendarEvent,
  syncNoteToGoogleCalendar,
  syncAllCardsToGoogleCalendar,
  deleteCalendarEvent,
  deleteCalendarEventForNote,
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
import type { ActionItem, ExtractedMetric, MilestoneChain, NextActionSuggestion, DomainClarificationInfo } from './types/notivia.ts';
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
import { NoteCard } from './components/NoteCard.tsx';
import { AppHeader } from './components/AppHeader.tsx';
import { BatchActionBar } from './components/BatchActionBar.tsx';
import { BottomInputBar } from './components/BottomInputBar.tsx';
import { DraftMessageModal } from './components/modals/DraftMessageModal.tsx';
import { CalendarEventsModal } from './components/modals/CalendarEventsModal.tsx';
import { DeleteConfirmModal } from './components/modals/DeleteConfirmModal.tsx';
import { MediaViewerModal } from './components/modals/MediaViewerModal.tsx';
import { PushBannerToast } from './components/modals/PushBannerToast.tsx';
import { DOMAIN_REGISTRY, WORK_DOMAIN_OPTIONS, detectDomainFromNote, type ProfessionDomain } from './types/domainThemes.ts';
import { translations, type Language } from './utils/i18n.ts';
import { checkLocalWeather, checkWeatherTaskCompatibility, type WeatherCondition } from './utils/weather.ts';
import { detectCalendarConflict } from './utils/calendar.ts';
import { evaluatePipelineTrigger } from './utils/actionPipeline.ts';
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
  domain_clarification?: DomainClarificationInfo | null;
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
  const [isSyncingCalendar, setIsSyncingCalendar] = useState<boolean>(false);

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
    if (!workDomain || workDomain === 'GENEL' || workDomain === 'SADE' || workDomain === 'OTOMATIK_JARGON') {
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

  // Android Mobil Sürümde Navigasyon Tuşlarını Gizleme ve İmmersive Modu
  useEffect(() => {
    const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent || '');
    if (!isAndroid) return;

    // Android cihaz sınıfını body'ye ekle
    document.body.classList.add('android-device');

    // Android Web & PWA tam ekran / tuş gizleme fonksiyonu
    const requestAndroidImmersive = async () => {
      try {
        if (!document.fullscreenElement && document.fullscreenEnabled) {
          const docEl = document.documentElement;
          if (docEl.requestFullscreen) {
            await docEl.requestFullscreen({ navigationUI: 'hide' } as FullscreenOptions);
          } else if ((docEl as any).webkitRequestFullscreen) {
            await (docEl as any).webkitRequestFullscreen();
          }
        }
      } catch {
        // Tarayıcı güvenlik modeli jest bekler, sessizce geçilir
      }
    };

    // İlk kullanıcı etkileşiminde (dokunma/tıklama) Android gezinme tuşlarını gizle
    const handleAndroidTouch = () => {
      requestAndroidImmersive();
    };

    window.addEventListener('touchstart', handleAndroidTouch, { passive: true, once: true });
    window.addEventListener('click', handleAndroidTouch, { once: true });

    return () => {
      window.removeEventListener('touchstart', handleAndroidTouch);
      window.removeEventListener('click', handleAndroidTouch);
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
    domain_clarification?: DomainClarificationInfo | null;
    action_items?: ActionItem[] | null;
    sesli_fisilti?: string | null;
    periyodik?: {
      tip: string;
      aralik_gun?: number;
      bir_sonraki_tarih_iso?: string;
    } | null;
    isManualEntry?: boolean;
    isAlarm?: boolean;
    isAlarmActive?: boolean;
    isMicroTask?: boolean;
    sureDakika?: number;
    deviceNotificationEnabled?: boolean;
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
    } else if (noteData.isAlarm) {
      setStatusText('Alarm kuruldu ⏰');
    } else if (noteData.tarih_iso && new Date(noteData.tarih_iso).getTime() > Date.now() + 60000) {
      setStatusText('Cihaz hatırlatıcısı kuruldu ⏰');
    } else {
      setStatusText('Not kaydedildi 📝');
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
      domain_clarification: noteData.domain_clarification || null,
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
    
    // Google Takvimden sil
    deleteCalendarEventForNote(card).catch((err) =>
      console.warn('Takvim silme hatası:', err)
    );

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

    // Eğer tarih varsa alarmları ve Google Takvim kaydını tekrar kur
    if (target.item.tarih_iso && !target.item.tamamlandi) {
      localNotifications.scheduleAlarm({
        id: target.item.id,
        baslik: target.item.baslik,
        tarih_iso: target.item.tarih_iso,
        ikon: target.item.ikon,
      });
      syncNoteToGoogleCalendar(target.item).then((res) => {
        if (res.success && res.eventId) {
          target.item.calendarEventId = res.eventId;
          target.item.calendar_event_id = res.eventId;
          setCards((prev) =>
            prev.map((c) =>
              c.id === target.item.id
                ? { ...c, calendarEventId: res.eventId, calendar_event_id: res.eventId }
                : c
            )
          );
        }
      }).catch((err) => console.warn('Takvim geri yükleme hatası:', err));
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
        syncNoteToGoogleCalendar(card).catch((err) =>
          console.warn('Toplu takvim geri yükleme hatası:', err)
        );
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

    // Alarmları ve Google Takvim kaydını yeniden kur
    if (restoredItem.tarih_iso && !restoredItem.tamamlandi) {
      localNotifications.scheduleAlarm({
        id: restoredItem.id,
        baslik: restoredItem.baslik,
        tarih_iso: restoredItem.tarih_iso,
        ikon: restoredItem.ikon,
      });
      syncNoteToGoogleCalendar(restoredItem).then((res) => {
        if (res.success && res.eventId) {
          restoredItem.calendarEventId = res.eventId;
          restoredItem.calendar_event_id = res.eventId;
          setCards((prev) =>
            prev.map((c) =>
              c.id === restoredItem.id
                ? { ...c, calendarEventId: res.eventId, calendar_event_id: res.eventId }
                : c
            )
          );
        }
      }).catch((err) => console.warn('Undo takvim eşitleme hatası:', err));
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

    // Google Takvim verisini de Google Takvimden sil
    deleteCalendarEventForNote(targetCard).catch((err) =>
      console.warn('Takvim silme hatası:', err)
    );

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

    // Her birini çöp kutusuna ekle, alarmları durdur ve Google Takvimden sil
    const nowIso = new Date().toISOString();
    const newTrashEntries: TrashNoteItem[] = targetsToDelete.map((item) => ({
      item,
      deletedAt: nowIso,
    }));

    for (const card of targetsToDelete) {
      await localNotifications.cancelAlarm(card.id);
      await cancelAllFermentationAlarms(card.id);
      deleteCalendarEventForNote(card).catch((err) =>
        console.warn('Çoklu takvim silme hatası:', err)
      );
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

  // 2.1 Çoklu Jargon İkilemi Seçimi ("Bunu mu demek istediniz?" Seçimi)
  const handleSelectDomainClarification = async (cardId: string, chosenDomain: ProfessionDomain) => {
    const targetCard = cards.find((c) => c.id === cardId);
    if (!targetCard) return;

    // Seçilen sektörel jargona göre notu derinlemesine yeniden zenginleştir
    const refined = extractSimpleNoteFromText(targetCard.baslik, new Date().toISOString(), cards, chosenDomain, language);

    const updatedCard: SimpleCardItem = {
      ...targetCard,
      ikon: refined.ikon || targetCard.ikon,
      renk: refined.renk || targetCard.renk,
      action_items: (refined.action_items && refined.action_items.length > 0) ? refined.action_items : targetCard.action_items,
      anomali_notu: refined.anomali_notu || targetCard.anomali_notu,
      eksik_bilgi: false,
      netlestirme_sorusu: null,
      soru: null,
      domain_clarification: null,
    };

    setCards((prev) => prev.map((c) => (c.id === cardId ? updatedCard : c)));
    const local = getLocalNotes();
    const idx = local.findIndex((n) => n.id === cardId);
    if (idx !== -1) {
      local[idx] = updatedCard;
      saveLocalNotes(local);
      syncNoteToCloud(updatedCard);
      triggerDriveBackup(local);
    }

    const domainLabel = DOMAIN_REGISTRY[chosenDomain]?.displayName || chosenDomain;
    const whisper = language === 'en' ? `${domainLabel} domain applied.` : `${domainLabel} uzmanlık alanı uygulandı.`;
    setStatusText(whisper);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const u = new SpeechSynthesisUtterance(whisper);
        u.lang = language === 'en' ? 'en-US' : 'tr-TR';
        window.speechSynthesis.speak(u);
      } catch {}
    }
    setTimeout(() => setStatusText(t.speakOrWrite), 2500);
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

  // Tüm Zamanlı ve Alarmlı Notları Doğrudan Google Takvime Tek Seferde Otomatik Eşitle
  const handleSyncAllGoogleCalendar = async () => {
    setIsSyncingCalendar(true);
    try {
      let token = getGoogleAccessToken();
      if (!token) {
        const connectRes = await connectGoogleDriveAndCalendar();
        if (!connectRes.success || !connectRes.token) {
          setStatusText(language === 'tr' ? 'Google Takvim yetkilendirmesi yapılamadı' : 'Google Calendar auth failed');
          setTimeout(() => setStatusText(t.speakOrWrite), 2500);
          setIsSyncingCalendar(false);
          return;
        }
      }

      setStatusText(language === 'tr' ? 'Notlar Google Takvime aktarılıyor...' : 'Syncing notes to Google Calendar...');
      const { syncedCount, updatedCards } = await syncAllCardsToGoogleCalendar(cards);
      setCards(updatedCards);
      saveLocalNotes(updatedCards);
      triggerDriveBackup(updatedCards);

      playNotificationChime();
      setStatusText(
        language === 'tr'
          ? `✓ ${syncedCount} zamanlı not Google Takviminize otomatik eşitlendi!`
          : `✓ ${syncedCount} timed notes synced directly to your Google Calendar!`
      );
      setTimeout(() => setStatusText(t.speakOrWrite), 3500);
    } catch (err) {
      console.warn('Google Takvim toplu eşitleme hatası:', err);
      setStatusText(language === 'tr' ? 'Takvim senkronizasyonunda hata oluştu' : 'Calendar sync error');
      setTimeout(() => setStatusText(t.speakOrWrite), 2500);
    } finally {
      setIsSyncingCalendar(false);
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
    if (workDomain === 'SADE') {
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
              const questionToAsk = args.netlestirme_sorusu || args.soru || (isMissingTime ? defaultClarify : null);

              const createdNote = {
                baslik: sanitizeCardTitle(args.baslik) || args.baslik,
                zaman: isMissingTime ? null : args.zaman,
                tarih_iso: isMissingTime ? null : args.tarih_iso,
                hazirlik_zamani: args.hazirlik_zamani,
                hazirlik_iso: args.hazirlik_iso,
                action_items: args.action_items,
                anomali_notu: args.anomali_notu,
                eksik_bilgi: isMissingTime,
                netlestirme_sorusu: questionToAsk,
                soru: questionToAsk,
                domain_clarification: args.domain_clarification || null,
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
            domain_clarification: sJson.data.domain_clarification || null,
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
        domain_clarification: fallback.domain_clarification || null,
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

  // Google Sign-In Handler (Tüm kullanıcılar için açık, kısıtlamasız standart Google girişi)
  const handleLogin = async () => {
    setStatusText(language === 'en' ? 'Connecting Google account...' : 'Google hesabı bağlanıyor...');
    
    try {
      // Standart sağlayıcı hassas yetki (Drive/Takvim) istemez; Google OAuth test modu kısıtlamalarına takılmadan
      // tüm kullanıcıların (arkadaş, aile vb.) başarıyla giriş yapmasını sağlar.
      const result = await signInWithPopup(auth, standardGoogleProvider);
      if (result?.user) {
        setCachedUser(result.user);
        setCurrentUser(result.user);
      }
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || null;
      if (token) {
        setGoogleAccessToken(token);
        console.log("Mevcut Google Token alındı:", token);
        await syncFromDrive();
      }
      setStatusText(language === 'en' ? 'Google account connected ✓' : 'Google hesabı bağlandı ✓');
      setTimeout(() => setStatusText(t.speakOrWrite), 2500);
    } catch (err: any) {
      console.warn('Google giriş uyarısı / hatası:', err?.code, err?.message || err);
      
      if (err?.code === 'auth/popup-blocked') {
        setStatusText(language === 'en' ? 'Popup blocked, redirecting...' : 'Açılır pencere engellendi, yönlendiriliyor...');
        try {
          await signInWithRedirect(auth, standardGoogleProvider);
        } catch (redirectErr: any) {
          setStatusText(language === 'en' ? `Redirect error: ${redirectErr?.message || 'Unknown'}` : `Yönlendirme hatası: ${redirectErr?.message || redirectErr?.code || 'Bilinmeyen hata'}`);
          setTimeout(() => setStatusText(t.speakOrWrite), 4000);
        }
      } else if (err?.code === 'auth/unauthorized-domain') {
        const currentHost = window.location.hostname;
        setStatusText(language === 'en' ? `Unauthorized domain: add "${currentHost}" in Firebase` : `Domain yetkisiz: Firebase Console'da "${currentHost}" eklenmeli`);
        alert(`Firebase Yetkilendirme Uyarısı:\n\nŞu anki domain ("${currentHost}") Firebase Console > Authentication > Settings > Authorized domains listesinde bulunmuyor.\n\nBu adresi Firebase Console'a ekleyerek yetkilendirebilirsiniz.`);
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

  // İsteğe Bağlı Google Drive & Takvim Yetkilendirmesi
  const handleConnectDriveCalendar = async () => {
    setStatusText(language === 'en' ? 'Connecting Google Drive & Calendar...' : 'Google Drive ve Takvim bağlanıyor...');
    try {
      const res = await connectGoogleDriveAndCalendar();
      if (res.success && res.token) {
        setStatusText(language === 'en' ? 'Drive & Calendar connected ✓' : 'Drive ve Takvim bağlandı ✓');
        await syncFromDrive();
      } else {
        setStatusText(language === 'en' ? 'Drive connection optional' : 'Drive bağlantısı isteğe bağlıdır');
      }
      setTimeout(() => setStatusText(t.speakOrWrite), 3000);
    } catch (err: any) {
      console.warn('Drive bağlantı uyarısı:', err);
      setStatusText(language === 'en' ? 'Drive permission error' : 'Drive izin hatası');
      setTimeout(() => setStatusText(t.speakOrWrite), 3000);
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

  // ⚡ Bilişsel Yük Analizi
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
        <AppHeader
          theme={theme}
          viewMode={viewMode}
          showSearch={showSearch}
          trashCount={trashNotes.length}
          activeUser={activeUser}
          t={t}
          onToggleViewMode={toggleViewMode}
          onToggleSearch={() => {
            setShowSearch((prev) => !prev);
            if (showSearch) setSearchQuery('');
          }}
          onOpenTrash={() => setShowRecycleBinModal(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Kart Listesi Alanı */}
        <section
          id="cards-container"
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden w-full max-w-full px-3 sm:px-5 py-2.5 sm:py-3 space-y-2.5 sm:space-y-3 pb-6"
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

          {/* Çoklu Seçim, Taşıma ve Toplu Silme Barı */}
          <BatchActionBar
            isSelectMode={isSelectMode}
            selectedCardIds={selectedCardIds}
            filteredCards={filteredCards}
            language={language}
            t={t}
            onSelectAllToggle={() => {
              if (selectedCardIds.length === filteredCards.length) {
                setSelectedCardIds([]);
              } else {
                setSelectedCardIds(filteredCards.map((c) => c.id));
              }
            }}
            onCancelSelection={() => {
              setIsSelectMode(false);
              setSelectedCardIds([]);
            }}
            onMoveSelected={moveSelectedNotes}
            onToggleCompleteSelected={() => {
              selectedCardIds.forEach((id) => toggleCardCompleted(id));
              setStatusText(language === 'tr' ? `${selectedCardIds.length} kart güncellendi ✓` : `${selectedCardIds.length} cards updated ✓`);
              setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, capture or write'), 2000);
            }}
            onDeleteSelected={deleteSelectedNotes}
          />

          {/* ⚡ Bilişsel Yük ve Odak Bildirimi */}
          {dailyLoad.isOverloaded && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/20 mb-2.5 animate-in fade-in">
              <span className="text-base shrink-0">🧠</span>
              <span className="flex-1 leading-snug">{dailyLoad.warningNote}</span>
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
                  <NoteCard
                    key={item.id}
                    item={item}
                    viewMode={viewMode}
                    language={language}
                    isSelectMode={isSelectMode}
                    isSelected={isSelected}
                    isSwipedOpen={isSwipedOpen}
                    cardBgColor={cardBgColor}
                    cardOffset={cardOffset}
                    isDraggingThis={isDraggingThis}
                    draggingCardId={draggingCardId}
                    dragOverCardId={dragOverCardId}
                    dragPosition={dragPosition}
                    isWeatherTriggered={Boolean(isWeatherTriggered)}
                    isCompleted={isCompleted}
                    isExpired={isExpired}
                    syncingCalendarCardId={syncingCalendarCardId}
                    t={t}
                    onSelect={(id) => {
                      setSelectedCardIds((prev) =>
                        prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
                      );
                    }}
                    onEdit={(note) => {
                      setEditingNote(note);
                      setSwipedCardId(null);
                      setSwipeOffsets({});
                    }}
                    onDelete={(note) => {
                      setDeleteConfirmNote(note);
                      setSwipedCardId(null);
                      setSwipeOffsets({});
                    }}
                    onCloseSwipe={() => {
                      setSwipedCardId(null);
                      setSwipeOffsets({});
                    }}
                    onUpdateTitle={updateNoteTitle}
                    onOpenAlarmEdit={(note) => {
                      setEditingNote(note);
                      setEditingNoteInitialTab('alarm');
                    }}
                    onSyncCalendar={autoSyncCardToDeviceCalendar}
                    onSelectDomainClarification={handleSelectDomainClarification}
                    onResolveClarification={handleResolveClarification}
                    onToggleMilestoneStep={toggleMilestoneStep}
                    onAdoptNextAction={handleAdoptNextAction}
                    onToggleActionItem={toggleActionItem}
                    onViewFullImage={viewFullImage}
                    onDesktopDragStart={handleDesktopDragStart}
                    onDesktopDragOver={handleDesktopDragOver}
                    onDesktopDragLeave={handleDesktopDragLeave}
                    onDesktopDrop={handleDesktopDrop}
                    onDesktopDragEnd={handleDesktopDragEnd}
                    onTouchStart={handleCardTouchStart}
                    onTouchMove={handleCardTouchMove}
                    onTouchEnd={handleCardTouchEnd}
                    onTouchCancel={handleCardTouchEnd}
                    onMouseDown={handleCardMouseDown}
                    onMouseMove={handleCardMouseMove}
                    onMouseUp={handleCardMouseUp}
                    onMouseLeave={handleCardMouseUp}
                    onCardClick={handleCardClick}
                    isLongPressFired={isLongPressFiredRef.current}
                  />
                );
            })}
          </div>
          )}
        </section>

        {/* Alt Kontrol Barı (Kamera + Mikrofon + Klavye) */}
        <BottomInputBar
          theme={theme}
          language={language}
          statusText={statusText}
          isListening={isListening}
          liveSpeechTranscript={liveSpeechTranscript}
          pendingImage={pendingImage}
          showTextInput={showTextInput}
          textInput={textInput}
          liveIntentRoute={liveIntentRoute}
          sortedInstantJargonChips={sortedInstantJargonChips}
          t={t}
          onMicClick={handleMicClick}
          onToggleTextInput={handleToggleTextInput}
          onTextInputChange={setTextInput}
          onTextSubmit={handleManualTextSubmit}
          onCloseTextInput={() => {
            setShowTextInput(false);
            setTextInput('');
          }}
          onCameraChange={handleCameraChange}
          onViewPendingImage={(img) => setModalImgSrc(img)}
          onDiagnosePendingImage={async () => {
            const img = pendingImage;
            setPendingImage(null);
            pendingCapturedImageRef.current = null;
            setStatusText(language === 'en' ? 'Analyzing image...' : 'Görsel teşhis ediliyor...');
            await processWithAI(textInput.trim(), img, true);
            setTextInput('');
          }}
          onCancelPendingImage={() => {
            setPendingImage(null);
            pendingCapturedImageRef.current = null;
            setStatusText(language === 'en' ? 'Speak, capture, or type' : 'Söyle, çek ya da yaz');
          }}
        />

        {/* Geri Alma (Undo Toast) Bildirimi */}
        {undoToast && (
          <div className="absolute bottom-24 inset-x-4 z-30 flex items-center justify-between bg-stone-900 text-white text-xs px-4 py-2.5 rounded-2xl shadow-xl border border-stone-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
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
      <MediaViewerModal
        modalImgSrc={modalImgSrc}
        onClose={() => setModalImgSrc(null)}
      />

      {/* PWA Çevrimdışı Durum Göstergesi */}
      <OfflineIndicator />

      {/* Otonom Ajan: İletişim & Taslak Mesaj Modalı (draft_message) */}
      <DraftMessageModal
        draftedMessage={draftedMessage}
        onClose={() => setDraftedMessage(null)}
        onCopySuccess={() => {
          setStatusText(language === 'tr' ? 'Metin panoya kopyalandı ✓' : 'Text copied to clipboard ✓');
          setTimeout(() => setStatusText(language === 'tr' ? 'Söyle, çek ya da yaz' : 'Speak, capture or write'), 2500);
        }}
        theme={theme}
      />

      {/* Otonom Ajan: Takvim & Ajanda Sorgu Sonucu Modalı (get_calendar_events) */}
      <CalendarEventsModal
        calendarQueryResults={calendarQueryResults}
        onClose={() => setCalendarQueryResults(null)}
        theme={theme}
      />

      {/* Ekran Üstü Canlı Bildirim Kartı (Push Banner Toast) */}
      <PushBannerToast
        notification={activeBannerNotification}
        language={language}
        onDismiss={() => {
          if (activeBannerNotification?.isAlarm) {
            alarmSound.stopAlarm();
          }
          setActiveBannerNotification(null);
        }}
        onStopAlarm={() => {
          alarmSound.stopAlarm();
          setActiveBannerNotification(null);
        }}
      />

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
        isDriveConnected={Boolean(getGoogleAccessToken() || googleAccessToken)}
        onConnectDrive={handleConnectDriveCalendar}
        onSyncAllCalendar={handleSyncAllGoogleCalendar}
        isSyncingCalendar={isSyncingCalendar}
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

      {/* Not Silme Onay Modalı */}
      <DeleteConfirmModal
        note={deleteConfirmNote}
        language={language}
        onClose={() => setDeleteConfirmNote(null)}
        onConfirm={(idToDelete) => directDeleteNote(idToDelete)}
      />
    </div>
  );
}
