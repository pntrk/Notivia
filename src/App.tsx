import React, { useState, useEffect, useRef } from 'react';
import {
  auth,
  db,
  googleProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setGoogleAccessToken,
  createCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEventTitle,
  checkCalendarConflicts,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  handleFirestoreError,
  OperationType,
  type User,
} from './firebase.ts';
import { extractSimpleNoteFromText } from './utils/simpleNote.ts';
import type { ActionItem } from './types/notivia.ts';
import {
  exportToDeviceCalendar,
  getGoogleCalendarWebUrl,
  scheduleLocalDeviceReminder,
  requestDeviceNotificationPermission,
  playNotificationChime,
} from './utils/deviceCalendar.ts';
import {
  saveLocalMedia,
  getLocalMedia,
  deleteLocalMedia,
  compressImage,
} from './utils/mediaStorage.ts';

interface SimpleCardItem {
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

function formatCreatedTime(rawTime: any): string {
  if (!rawTime) return "";
  
  // Firestore Timestamp veya standart Date ayrıştırma
  const date = rawTime.toDate ? rawTime.toDate() : new Date(rawTime);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function sortNotiviaCards(cards: SimpleCardItem[]): SimpleCardItem[] {
  const now = Date.now();

  return [...cards].sort((a, b) => {
    const timeA = a.tarih_iso ? new Date(a.tarih_iso).getTime() : null;
    const timeB = b.tarih_iso ? new Date(b.tarih_iso).getTime() : null;

    const isExpiredA = timeA !== null && timeA < now;
    const isExpiredB = timeB !== null && timeB < now;

    // 1. Öncelik: Süresi geçmiş olanlar her zaman listenin en dibine
    if (isExpiredA && !isExpiredB) return 1;
    if (!isExpiredA && isExpiredB) return -1;

    // 2. Öncelik: Yaklaşan aktif randevular (önümüzdeki 48 saat) en üste
    const isUpcomingA = timeA && timeA >= now && (timeA - now) < 48 * 3600 * 1000;
    const isUpcomingB = timeB && timeB >= now && (timeB - now) < 48 * 3600 * 1000;

    if (isUpcomingA && !isUpcomingB) return -1;
    if (!isUpcomingA && isUpcomingB) return 1;

    // 3. Öncelik: Kendi içlerinde en yeni oluşturulan en üstte
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

  const recognitionRef = useRef<any>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const manualTextInputRef = useRef<HTMLInputElement | null>(null);
  const firestoreUnsubRef = useRef<(() => void) | null>(null);
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
    return []; // Mock 'Ahmet Abi' ve 'Su Filtresi' kayıtları tamamen temizlendi
  };

  const saveLocalNotes = (notes: SimpleCardItem[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore
    }
  };

  // Firebase Auth & Firestore synchronization
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

    try {
      const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (!isMounted) return;
        setCurrentUser(user);

        if (user && db) {
          if (firestoreUnsubRef.current) {
            firestoreUnsubRef.current();
            firestoreUnsubRef.current = null;
          }

          // Migrate local notes to Firestore if any
          const local = getLocalNotes();
          if (local.length > 0) {
            for (const note of local) {
              try {
                await addDoc(collection(db, 'users', user.uid, 'notes'), {
                  ...note,
                  createdAt: serverTimestamp(),
                });
              } catch {
                // ignore
              }
            }
            try {
              localStorage.removeItem(LOCAL_STORAGE_KEY);
            } catch {
              // ignore
            }
          }

          // Listen live to Firestore notes collection
          const notesRef = collection(db, 'users', user.uid, 'notes');
          const q = query(notesRef, orderBy('createdAt', 'desc'));

          firestoreUnsubRef.current = onSnapshot(
            q,
            (snapshot) => {
              const cloudNotes: SimpleCardItem[] = [];
              snapshot.forEach((docSnap) => {
                const d = docSnap.data();
                cloudNotes.push({
                  id: docSnap.id,
                  baslik: d.baslik || 'Not',
                  zaman: d.zaman || null,
                  tarih_iso: d.tarih_iso || null,
                  hazirlik_zamani: d.hazirlik_zamani || null,
                  hazirlik_iso: d.hazirlik_iso || null,
                  anomali_notu: d.anomali_notu || null,
                  teshis_notu: d.teshis_notu || null,
                  calendarEventId: d.calendarEventId || d.calendar_event_id || null,
                  calendar_event_id: d.calendarEventId || d.calendar_event_id || null,
                  conflictWith: d.conflictWith || d.conflictWarning || null,
                  conflictWarning: d.conflictWith || d.conflictWarning || null,
                  action_items: d.action_items || null,
                  ikon: d.ikon || '📌',
                  renk: d.renk || '#FEF3C7',
                  mediaId: d.mediaId || null,
                  createdAt: d.createdAt,
                });
              });
              setCards(cloudNotes);
            },
            (error) => {
              handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/notes`);
              setCards(getLocalNotes());
            }
          );
        } else {
          if (firestoreUnsubRef.current) {
            firestoreUnsubRef.current();
            firestoreUnsubRef.current = null;
          }
          setCards(getLocalNotes());
        }
      });

      return () => {
        isMounted = false;
        unsubscribeAuth();
        if (firestoreUnsubRef.current) {
          firestoreUnsubRef.current();
        }
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
  }) => {
    // Check reactive triggers against existing cards
    const triggeredCards = checkReactiveTriggers(noteData.baslik + ' ' + (noteData.zaman || ''), cards);
    if (triggeredCards.length > 0) {
      const relatedNames = triggeredCards.map((c) => c.baslik).join(', ');
      noteData.baglantili_hatirlatma = `Hazır buradayken: ${relatedNames}`;
    }

    // Takvime yaz ve çakışma bilgisini al
    const { eventId, conflictWith } = await createCalendarEvent(noteData);

    const nowIso = new Date().toISOString();
    const tempId = 'local_' + Date.now();

    // Cihaz Takvimi / Yerel Hatırlatıcı Kur
    if (noteData.tarih_iso) {
      scheduleLocalDeviceReminder(tempId, noteData.baslik, noteData.tarih_iso, noteData.ikon);
      requestDeviceNotificationPermission().catch(() => {});
    }

    if (conflictWith) {
      setStatusText(`Not eklendi (Çakışma: ${conflictWith})`);
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
      createdAt: currentUser ? serverTimestamp() : nowIso // Lokal ve bulut uyumu
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

    if (currentUser && db) {
      const pathForWrite = `users/${currentUser.uid}/notes`;
      try {
        const docRef = await addDoc(collection(db, 'users', currentUser.uid, 'notes'), payload);
        setCards((prev) =>
          prev.map((c) => (c.id === tempId ? { ...c, id: docRef.id } : c))
        );
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, pathForWrite);
      }
    }
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

    // Firestore & LocalStorage Güncelle
    if (currentUser && db && !cardId.startsWith('local_')) {
      const noteRef = doc(db, 'users', currentUser.uid, 'notes', cardId);
      await updateDoc(noteRef, { action_items: updatedTasks });
    } else {
      const local = getLocalNotes();
      const locItem = local.find((n) => n.id === cardId);
      if (locItem) {
        locItem.action_items = updatedTasks;
        saveLocalNotes(local);
      }
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
    if (currentUser && db && !card.id.startsWith('local_')) {
      const pathForDelete = `users/${currentUser.uid}/notes/${card.id}`;
      try {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'notes', card.id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, pathForDelete);
      }
    }
    const local = getLocalNotes().filter((n) => n.id !== card.id);
    saveLocalNotes(local);
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

  const deleteNote = (
    id: string,
    calendarEventId?: string | null,
    mediaId?: string | null
  ) => {
    // Eğer zaten bekleyen başka bir silme işlemi varsa onu hemen kalıcılaştır
    if (undoToast) {
      commitPendingDeletion(undoToast.item);
      clearTimeout(undoToast.timerId);
    }

    const targetCard = cards.find((c) => c.id === id);
    if (!targetCard) return;

    // 1. Ekrandan anında kaldır (Hızlı UI tepkisi)
    setCards((prev) => prev.filter((c) => c.id !== id));

    // 2. 5 saniyelik zamanlayıcı başlat (Geri alınmazsa kalıcı silinecek)
    const timerId = setTimeout(async () => {
      await commitPendingDeletion(targetCard);
      setUndoToast(null);
    }, 5000);

    setUndoToast({ item: targetCard, timerId });
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

    // Bulut veya yerel kayıt güncellemesi
    if (currentUser && db && !id.startsWith('local_')) {
      const noteRef = doc(db, 'users', currentUser.uid, 'notes', id);
      try {
        await updateDoc(noteRef, { baslik: cleanTitle });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${currentUser.uid}/notes/${id}`);
      }
    } else {
      const local = getLocalNotes();
      const target = local.find((n) => n.id === id);
      if (target) {
        target.baslik = cleanTitle;
        saveLocalNotes(local);
      }
      setCards((prev) =>
        prev.map((n) => (n.id === id ? { ...n, baslik: cleanTitle } : n))
      );
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
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || null;
      if (token) {
        setGoogleAccessToken(token);
        console.log("Mevcut Google Token başarıyla alındı:", token);
        setStatusText('Google hesabı bağlandı ✓');
      } else {
        setStatusText('Giriş yapıldı ✓');
      }
      setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
    } catch (err: any) {
      console.warn('Google giriş uyarısı / hatası:', err?.code, err?.message || err);
      if (err?.code === 'auth/popup-blocked') {
        setStatusText('Tarayıcı açılır pencereyi engelledi. Lütfen izin verin.');
      } else if (err?.code === 'auth/unauthorized-domain') {
        setStatusText('Önizleme yetkisi bekleniyor (Lokal mod aktif)');
      } else if (err?.code === 'auth/cancelled-popup-request' || err?.code === 'auth/popup-closed-by-user') {
        setStatusText('Giriş penceresi kapatıldı');
      } else {
        setStatusText('Giriş yapılamadı (Lokal mod devrede)');
      }
      setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 3500);
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
    <div className="bg-stone-100 text-stone-800 antialiased select-none min-h-screen flex items-center justify-center">
      {/* Masaüstünde telefon gibi ortalanan, mobilde tam ekran olan kapsayıcı */}
      <main className="w-full max-w-md h-[100dvh] flex flex-col justify-between bg-white relative shadow-sm overflow-hidden sm:border sm:border-stone-200">
        
        {/* Üst Bar: Başlık & Senkronizasyon & Profil */}
        <header className="px-6 pt-6 pb-2 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Notivia</h1>
            <span
              id="sync-status"
              className={`text-[11px] font-medium transition-colors ${
                isCloudSync ? 'text-emerald-600' : 'text-stone-400'
              }`}
            >
              {isCloudSync ? 'Bulut Senkronize' : 'Lokal Mod'}
            </span>
          </div>

          <div id="auth-container" className="flex items-center gap-2">
            {/* Arama Toggle */}
            <button
              type="button"
              onClick={() => {
                setShowSearch((prev) => !prev);
                if (showSearch) setSearchQuery('');
              }}
              title="Notlarda ara"
              className={`p-1.5 rounded-full transition-colors ${
                showSearch ? 'text-stone-900 bg-stone-200' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
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
              title="Metin ile yaz"
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            {!activeUser ? (
              <button
                id="login-btn"
                type="button"
                onClick={handleLogin}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-stone-200 text-stone-600 active:bg-stone-100 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Giriş
              </button>
            ) : (
              <button
                id="user-avatar-btn"
                type="button"
                onClick={handleSignOut}
                title={`${activeUser.displayName || 'Kullanıcı'} - Çıkış yapmak için tıkla`}
                className="w-8 h-8 rounded-full overflow-hidden border border-stone-200 active:scale-95 transition-transform cursor-pointer"
              >
                <img
                  id="user-avatar"
                  src={
                    activeUser.photoURL ||
                    `https://api.dicebear.com/7.x/identicon/svg?seed=${activeUser.uid}`
                  }
                  alt="Profil"
                  className="w-full h-full object-cover"
                />
              </button>
            )}
          </div>
        </header>

        {/* Metin Girişi (Klavye Modu) */}
        {showTextInput && (
          <div className="px-6 py-2 border-b border-stone-100 animate-in fade-in duration-150">
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
                placeholder="Salı 19:00 Ahmet abiyle çay..."
                className="flex-1 text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-800"
                autoFocus
              />
              <button
                type="submit"
                disabled={!textInput.trim()}
                className="px-3 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold disabled:opacity-40 cursor-pointer"
              >
                Ekle
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
              placeholder="Notlarda ara (isim, borç, araba, tarih)..."
              className="w-full text-xs px-3.5 py-2 bg-stone-100/80 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-400 text-stone-800"
            />
          </div>

          {filteredCards.length === 0 ? (
            <div className="text-center text-xs text-stone-400 mt-10">
              {searchQuery ? 'Aramanızla eşleşen not bulunamadı.' : 'Henüz not yok. Konuş veya fotoğraf çek.'}
            </div>
          ) : (
            sortNotiviaCards(filteredCards).map((item) => {
              // Kartın süresinin dolup dolmadığını kontrol et
              const isExpired = item.tarih_iso ? new Date(item.tarih_iso).getTime() < Date.now() : false;

              return (
                <div
                  key={item.id}
                  className={`card p-3.5 rounded-2xl flex items-center justify-between transition-all duration-300 ${
                    item.isRemoving ? 'scale-95 opacity-0' : 'scale-100'
                  } ${
                    isExpired 
                      ? 'opacity-65 saturate-60 border-dashed border-stone-300' 
                      : 'opacity-100 border-solid border-black/5'
                  }`}
                  style={{
                    backgroundColor: item.renk || '#FEF3C7',
                    borderWidth: '1px',
                  }}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {item.mediaId ? (
                      <CardMediaThumbnail
                        mediaId={item.mediaId}
                        onClick={() => viewFullImage(item.mediaId!)}
                      />
                    ) : (
                      <span className={`text-2xl select-none shrink-0 ${isExpired ? 'grayscale-40' : ''}`}>
                        {item.ikon || '📌'}
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <h2
                        contentEditable={!isExpired}
                        suppressContentEditableWarning={true}
                        spellCheck={false}
                        className={`font-semibold text-sm leading-tight outline-hidden ${
                          isExpired ? 'text-stone-500 line-through decoration-stone-400/60' : 'text-stone-900 cursor-text'
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
                              ⌛ Vadesi Geçti · {item.zaman || 'Tamamlanmadı'}
                            </span>
                          ) : (
                            <>
                              {item.tetikleyici?.etiket ? (
                                <span
                                  className="text-[10px] bg-white/85 text-stone-800 font-semibold px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1 shadow-2xs border border-stone-900/10"
                                  title={item.tetikleyici.sart ? `Koşul: ${item.tetikleyici.sart}` : undefined}
                                >
                                  {item.tetikleyici.etiket}
                                </span>
                              ) : (
                                <p className="text-[11px] text-stone-600 truncate">
                                  {item.zaman || 'Hatırlatıcı yok'}
                                </p>
                              )}
                              {item.hazirlik_zamani && (
                                <span
                                  className="text-[9px] bg-white/80 text-amber-900 border border-amber-300/40 px-1.5 py-0.5 rounded font-medium shrink-0 flex items-center gap-0.5 shadow-2xs"
                                  title={`Ön Hazırlık: ${item.hazirlik_zamani}`}
                                >
                                  ⏳ {item.hazirlik_zamani}
                                </span>
                              )}
                              {(item.calendarEventId || item.calendar_event_id) && (
                                <span className="text-[9px] bg-white/70 text-stone-700 px-1 rounded shadow-2xs font-medium shrink-0">
                                  📅 Takvimde
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
                                        description: `Notivia Hatırlatıcı: ${item.baslik}`
                                      });
                                      playNotificationChime();
                                      setStatusText('Cihaz takvimine (.ics) aktarıldı');
                                      setTimeout(() => setStatusText('Söyle, çek ya da yaz'), 2500);
                                    }}
                                    className="text-[9px] bg-amber-100/90 hover:bg-amber-200 text-amber-900 border border-amber-300/80 px-1.5 py-0.5 rounded font-medium shrink-0 flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95 transition-all"
                                    title="iPhone / Android Cihaz Takvimine (.ics) Ekle"
                                  >
                                    <span>📲</span>
                                    <span>Cihaz Takvimine Ekle</span>
                                  </button>
                                </div>
                              )}
                            </>
                          )}

                          {/* Oluşturulma Zaman Damgası */}
                          {item.createdAt && (
                            <span className="text-[9px] text-stone-400 font-mono tracking-tight select-none ml-1">
                              · {formatCreatedTime(item.createdAt)}
                            </span>
                          )}
                        </div>

                        {/* Eğer çakışma varsa görünen hafif uyarı */}
                        {(item.conflictWith || item.conflictWarning) && (
                          <p className="text-[10px] text-amber-700 font-medium flex items-center gap-1 mt-0.5">
                            <span>⚠️</span>
                            <span className="truncate">'{item.conflictWith || item.conflictWarning}' ile çakışıyor</span>
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
                            <details className="group">
                              <summary className="text-[10px] font-semibold text-stone-600 flex items-center justify-between cursor-pointer list-none select-none">
                                <span className="flex items-center gap-1">
                                  <span>📋</span>
                                  <span>{item.action_items.filter(t => t.is_completed).length}/{item.action_items.length} Alt Görev</span>
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

                  <button
                    type="button"
                    onClick={() =>
                      deleteNote(
                        item.id,
                        item.calendarEventId || item.calendar_event_id,
                        item.mediaId
                      )
                    }
                    className="w-8 h-8 rounded-full border border-stone-300/70 flex items-center justify-center text-stone-400 active:bg-white/80 transition-colors shrink-0 ml-2 cursor-pointer"
                    title={isExpired ? "Arşivle / Temizle" : "Tamamla"}
                  >
                    ✓
                  </button>
                </div>
              );
            })
          )}
        </section>

        {/* Alt Kontrol Barı (Kamera + Mikrofon + Klavye) */}
        <footer className="absolute bottom-0 inset-x-0 p-6 flex flex-col items-center bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-auto">
          {/* Metin Giriş Formu (Açılır/Kapanır) */}
          <form
            id="text-input-form"
            onSubmit={handleManualTextSubmit}
            className={`w-full mb-3 flex items-center gap-2 bg-stone-50 p-1.5 pl-3 rounded-2xl border border-stone-200 shadow-sm transition-all duration-200 ${
              showTextInput ? 'opacity-100 scale-100' : 'hidden opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <input
              id="manual-text-input"
              ref={manualTextInputRef}
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Bir not yazın..."
              className="flex-1 bg-transparent text-sm text-stone-800 placeholder-stone-400 outline-hidden py-1"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded-xl active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              Ekle
            </button>
          </form>

          <p
            id="status-text"
            className={`text-xs mb-3 font-medium transition-colors ${
              isListening
                ? 'text-red-500 font-semibold'
                : statusText.includes('Görsel') || statusText.includes('inceleniyor')
                ? 'text-amber-600 font-semibold'
                : statusText.includes('çözümlüyor') || statusText === 'Kaydediliyor...'
                ? 'text-stone-700 font-semibold'
                : 'text-stone-400'
            }`}
          >
            {statusText}
          </p>

          <div className="flex items-center gap-4">
            {/* Kamera / Galeri Butonu */}
            <label
              htmlFor="camera-input"
              className="w-12 h-12 bg-stone-100 border border-stone-200 text-stone-700 rounded-full flex items-center justify-center shadow-xs active:scale-90 transition-all cursor-pointer"
              title="Fotoğraf Çek / Görsel Yükle"
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
            <button
              id="mic-btn"
              type="button"
              onClick={handleMicClick}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all duration-200 cursor-pointer ${
                isListening
                  ? 'bg-red-500 scale-105 animate-pulse text-white'
                  : 'bg-stone-900 text-white'
              }`}
            >
              <svg
                id="mic-icon"
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 02-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>

            {/* Klavye / Metin Girişi Toggle Butonu */}
            <button
              id="keyboard-toggle-btn"
              type="button"
              onClick={handleToggleTextInput}
              title="Metin ile Yaz"
              className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-xs active:scale-90 transition-all cursor-pointer ${
                showTextInput
                  ? 'bg-stone-800 text-white border-stone-800'
                  : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/70'
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
              <span className="text-emerald-400 font-bold">✓</span>
              <span className="truncate">"{undoToast.item.baslik}" tamamlandı</span>
            </div>
            <button
              type="button"
              onClick={handleUndo}
              className="text-amber-300 hover:text-amber-200 font-bold shrink-0 ml-3 underline decoration-amber-400/50 hover:decoration-amber-300 transition-colors cursor-pointer"
            >
              Geri Al
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
        className={`fixed inset-x-0 bottom-0 max-w-md mx-auto bg-white rounded-t-3xl p-6 shadow-2xl border-t border-stone-200 z-50 transition-transform duration-300 ${
          showManualModal ? 'translate-y-0' : 'translate-y-full hidden'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-stone-900">Manuel Not Oluştur</h3>
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
            placeholder="Not başlığı (örn: Kira Ödemesi)"
            required
            className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-400 text-stone-800"
          />

          <input
            id="manual-datetime"
            type="datetime-local"
            value={manualDatetime}
            onChange={(e) => setManualDatetime(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden text-stone-700"
          />

          <div className="flex items-center justify-between px-1 py-1">
            <label className="text-xs text-stone-600 flex items-center gap-2 cursor-pointer">
              <input
                id="manual-sync-cal"
                type="checkbox"
                checked={manualSyncCal}
                onChange={(e) => setManualSyncCal(e.target.checked)}
                className="rounded text-stone-900"
              />
              Google Takvim'e işle
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold active:scale-95 transition-transform cursor-pointer"
          >
            Kaydet
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
    </div>
  );
}
