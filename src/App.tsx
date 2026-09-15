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
  checkCalendarConflicts,
  collection,
  addDoc,
  deleteDoc,
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
  hazirlik_zamani?: string | null;
  hazirlik_iso?: string | null;
  anomali_notu?: string | null;
  teshis_notu?: string | null;
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
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null);

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
  const processWithAIRef = useRef<((text?: string, base64Image?: string | null) => Promise<void>) | null>(null);

  // Load initial notes (local mode)
  const getLocalNotes = (): SimpleCardItem[] => {
    const initialCards: SimpleCardItem[] = [
      {
        id: 'local_0',
        baslik: 'Bakan Ziyareti (Kırklareli)',
        zaman: 'Cuma 09:00',
        tarih_iso: '2026-09-18T09:00:00+03:00',
        hazirlik_zamani: 'Perşembe 16:00 Hazırlık Planı',
        hazirlik_iso: '2026-09-17T16:00:00+03:00',
        ikon: '🏛️',
        renk: '#E0F2FE',
      },
      {
        id: 'local_1',
        baslik: 'Ahmet Abiyle Çay',
        zaman: 'Salı 19:00',
        tarih_iso: '2026-09-15T19:00:00',
        ikon: '☕',
        renk: '#FEF3C7',
      },
      {
        id: 'local_2',
        baslik: 'Su Arıtma Filtresi',
        zaman: '6 ay sonra',
        tarih_iso: '2027-03-15T10:00:00',
        ikon: '💧',
        renk: '#E0F2FE',
      },
    ];

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure showcase item is present if not already added
          const hasBakan = parsed.some((c: any) => c.baslik && c.baslik.includes('Bakan'));
          if (!hasBakan) {
            return [initialCards[0], ...parsed];
          }
          return parsed;
        }
      }
    } catch {
      // ignore
    }

    return initialCards;
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
    openManualModal();
  };

  const openManualModal = () => {
    setShowManualModal(true);
    setTimeout(() => {
      const el = document.getElementById('manual-title');
      el?.focus();
    }, 60);
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
      tarihIso = d.toISOString();
      zamanStr = d.toLocaleDateString('tr-TR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // Doğrudan sisteme ekleme (AI atlanır)
    await addNote({
      baslik,
      zaman: zamanStr,
      tarih_iso: syncCal ? tarihIso : null,
      ikon: '📌',
      renk: '#FEF3C7',
    });

    closeManualModal();
    setManualTitle('');
    setManualDatetime('');
  };

  // Metin girilip enter/ekle yapıldığında
  const handleManualTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = textInput.trim();
    if (!text) return;

    // Giriş kutusunu sıfırla ve kapat
    setTextInput('');
    setShowTextInput(false);

    setStatusText('Kaydediliyor...');

    // Mevcut bilişsel motora gönder
    await processWithAI(text, null);

    setStatusText('Söyle, çek ya da yaz');
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

  // Add Note Handler
  const addNote = async (noteData: {
    baslik: string;
    zaman?: string | null;
    tarih_iso?: string | null;
    hazirlik_zamani?: string | null;
    hazirlik_iso?: string | null;
    anomali_notu?: string | null;
    teshis_notu?: string | null;
    conflictWith?: string | null;
    conflictWarning?: string | null;
    ikon?: string;
    renk?: string;
    mediaId?: string | null;
  }) => {
    // Takvime yaz ve çakışma bilgisini al
    const { eventId, conflictWith } = await createCalendarEvent(noteData);

    if (conflictWith) {
      setStatusText(`Not eklendi (Takvim çakışması: ${conflictWith})`);
    }

    const payload = {
      ...noteData,
      calendarEventId: eventId || null,
      calendar_event_id: eventId || null,
      conflictWith: conflictWith || null,
      conflictWarning: conflictWith || null,
      anomali_notu: noteData.anomali_notu || null,
      teshis_notu: noteData.teshis_notu || null,
    };

    if (currentUser && db) {
      const pathForWrite = `users/${currentUser.uid}/notes`;
      try {
        await addDoc(collection(db, 'users', currentUser.uid, 'notes'), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, pathForWrite);
        const local = getLocalNotes();
        local.unshift({ id: 'local_' + Date.now(), ...payload });
        saveLocalNotes(local);
        setCards(local);
      }
    } else {
      const local = getLocalNotes();
      local.unshift({ id: 'local_' + Date.now(), ...payload });
      saveLocalNotes(local);
      setCards(local);
    }
  };

  // Delete Note Handler
  const deleteNote = async (
    id: string,
    calendarEventId?: string | null,
    mediaId?: string | null
  ) => {
    if (calendarEventId) {
      deleteCalendarEvent(calendarEventId).catch((err) =>
        console.warn('Takvim silme hatası:', err)
      );
    }
    if (mediaId) {
      deleteLocalMedia(mediaId).catch((err) =>
        console.warn('Medya silme hatası:', err)
      );
    }

    // Animate removal first
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isRemoving: true } : c))
    );

    setTimeout(async () => {
      if (currentUser && db && !id.startsWith('local_')) {
        const pathForDelete = `users/${currentUser.uid}/notes/${id}`;
        try {
          await deleteDoc(doc(db, 'users', currentUser.uid, 'notes', id));
        } catch (error) {
          handleFirestoreError(error, OperationType.DELETE, pathForDelete);
        }
      }
      const local = getLocalNotes().filter((n) => n.id !== id);
      saveLocalNotes(local);
      setCards((prev) => prev.filter((n) => n.id !== id));
    }, 200);
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
    return () => {
      delete (window as any).deleteNote;
      delete (window as any).viewFullImage;
    };
  }, [currentUser]);

  // Multimodal AI Processing (Text + Image)
  const processWithAI = async (text: string = '', base64Image: string | null = null) => {
    let mediaId: string | null = null;
    if (base64Image) {
      mediaId = 'media_' + Date.now();
      await saveLocalMedia(mediaId, base64Image);
    }

    // Direct JSON handling (if user pastes/inputs exact JSON object)
    if (text && text.trim().startsWith('{') && text.trim().endsWith('}')) {
      try {
        const directJson = JSON.parse(text.trim());
        if (directJson.baslik) {
          await addNote({
            baslik: directJson.baslik,
            zaman: directJson.zaman || null,
            tarih_iso: directJson.tarih_iso || null,
            hazirlik_zamani: directJson.hazirlik_zamani || null,
            hazirlik_iso: directJson.hazirlik_iso || null,
            ikon: directJson.ikon || '🏛️',
            renk: directJson.renk || '#E0F2FE',
            mediaId,
          });
          resetMicUI();
          return;
        }
      } catch {
        // continue normal parsing flow
      }
    }

    const now = new Date().toISOString();
    const pastNotesPayload = cards.slice(0, 30).map((c) => ({
      baslik: c.baslik,
      zaman: c.zaman,
      tarih_iso: c.tarih_iso,
      createdAt: c.createdAt,
    }));

    try {
      const res = await fetch('/api/parse-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: text || '',
          base64Image: base64Image || null,
          current_datetime: now,
          past_notes: pastNotesPayload,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const item = data.data;
          await addNote({
            baslik: item.baslik || (text ? text.slice(0, 24) : 'Görsel Kaydı'),
            zaman: item.zaman || null,
            tarih_iso: item.tarih_iso || null,
            hazirlik_zamani: item.hazirlik_zamani || null,
            hazirlik_iso: item.hazirlik_iso || null,
            teshis_notu: item.teshis_notu || null,
            anomali_notu: item.anomali_notu || null,
            ikon: item.ikon || (base64Image ? '📷' : '📌'),
            renk: item.renk || '#FEF3C7',
            mediaId,
          });
          resetMicUI();
          return;
        }
      }
    } catch (err) {
      console.warn('AI analizi sunucuda başarısız oldu, yerel ayrıştırmaya geçiliyor:', err);
    }

    // Cognitive Local Fallback
    const local = extractSimpleNoteFromText(
      text || (base64Image ? 'Fotoğraflı kayıt' : 'Not'),
      now,
      cards
    );
    await addNote({
      baslik: text ? local.baslik : (local.teshis_notu ? local.baslik : 'Fotoğraflı Not'),
      zaman: local.zaman || (base64Image ? 'Az önce eklendi' : null),
      tarih_iso: local.tarih_iso || null,
      hazirlik_zamani: local.hazirlik_zamani || null,
      hazirlik_iso: local.hazirlik_iso || null,
      teshis_notu: local.teshis_notu || null,
      anomali_notu: local.anomali_notu || null,
      ikon: base64Image ? '📷' : local.ikon,
      renk: local.renk || '#FEF3C7',
      mediaId,
    });
    resetMicUI();
  };

  processWithAIRef.current = processWithAI;

  // Ses bittiğinde hem ses metnini hem bekleyen görseli gönder
  const onSpeechCompleted = async (spokenText: string) => {
    const imageToSend = pendingCapturedImageRef.current;
    pendingCapturedImageRef.current = null; // Sıfırla

    if (imageToSend) {
      setStatusText('Görsel ve ses teşhis ediliyor...');
    } else {
      setStatusText('Anlıyorum...');
    }
    await processWithAI(spokenText, imageToSend);
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
          await processWithAI('', imageToSend);
        }
      } else {
        // Ses desteği yoksa sadece görseli doğrudan analiz et
        const imageToSend = pendingCapturedImageRef.current;
        pendingCapturedImageRef.current = null;
        setStatusText('Görsel teşhis ediliyor...');
        await processWithAI('', imageToSend);
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
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || null;
      if (token) {
        setGoogleAccessToken(token);
      }
    } catch (err: any) {
      console.warn('Google giriş uyarısı:', err?.message || err);
      setStatusText('Giriş penceresi açılamadı');
      setTimeout(() => setStatusText('Söyle ya da fotoğrafını çek'), 2500);
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
              onSubmit={async (e) => {
                e.preventDefault();
                if (textInput.trim()) {
                  setStatusText('Kaydediliyor...');
                  const val = textInput;
                  setTextInput('');
                  setShowTextInput(false);
                  await processWithAI(val, null);
                }
              }}
              className="flex gap-2"
            >
              <input
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
          {cards.length === 0 ? (
            <div className="text-center text-xs text-stone-400 mt-10">
              Henüz not yok. Konuş veya fotoğraf çek.
            </div>
          ) : (
            cards.map((item) => (
              <div
                key={item.id}
                className={`card p-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                  item.isRemoving ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                }`}
                style={{
                  backgroundColor: item.renk || '#FEF3C7',
                  borderColor: 'rgba(0,0,0,0.05)',
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
                    <span className="text-2xl select-none shrink-0">{item.ikon || '📌'}</span>
                  )}
                  <div className="truncate">
                    <h2 className="font-semibold text-stone-900 text-sm leading-tight truncate">
                      {item.baslik}
                    </h2>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-[11px] text-stone-600 truncate">
                          {item.zaman || 'Hatırlatıcı yok'}
                        </p>
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

                      {/* Anomali veya Rutin Zeka Tespiti */}
                      {item.anomali_notu && (
                        <div className="mt-1.5 flex items-start gap-1.5 bg-amber-500/10 text-amber-900 border border-amber-500/20 px-2 py-1 rounded-lg">
                          <span className="text-xs shrink-0">💡</span>
                          <p className="text-[11px] font-medium leading-tight">{item.anomali_notu}</p>
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
                >
                  ✓
                </button>
              </div>
            ))
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
                : statusText === 'Kaydediliyor...'
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
