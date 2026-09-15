import React, { useState, useEffect, useRef } from 'react';
import {
  initFirebase,
  getSavedFirebaseConfig,
  saveFirebaseConfig,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type User,
  type FirebaseConfig,
} from './firebase.ts';
import { extractSimpleNoteFromText } from './utils/simpleNote.ts';

interface SimpleCardItem {
  id: string;
  baslik: string;
  zaman?: string | null;
  ikon?: string;
  renk?: string;
  createdAt?: any;
  isRemoving?: boolean;
}

const LOCAL_STORAGE_KEY = 'notivia_local_notes';
const SIMULATED_USER_KEY = 'notivia_simulated_user';

export default function App() {
  const [cards, setCards] = useState<SimpleCardItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [simulatedUser, setSimulatedUser] = useState<any>(null);
  const [statusText, setStatusText] = useState<string>('Bas ve söyle');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [showTextInput, setShowTextInput] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');

  // Firebase Config Form State
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [projectIdInput, setProjectIdInput] = useState('');

  const recognitionRef = useRef<any>(null);
  const firestoreUnsubRef = useRef<(() => void) | null>(null);

  // Load initial notes (local mode)
  const getLocalNotes = (): SimpleCardItem[] => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }

    return [
      {
        id: 'local_1',
        baslik: 'Ahmet Abiyle Çay',
        zaman: 'Salı 19:00 · Matkabı unutma',
        ikon: '☕',
        renk: '#FEF3C7',
      },
      {
        id: 'local_2',
        baslik: 'Su Arıtma Filtresi',
        zaman: '6 ay sonra hatırlatılacak',
        ikon: '💧',
        renk: '#E0F2FE',
      },
    ];
  };

  const saveLocalNotes = (notes: SimpleCardItem[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore
    }
  };

  // Firebase Auth & Firestore initialization
  useEffect(() => {
    const existingConfig = getSavedFirebaseConfig();
    if (existingConfig) {
      setApiKeyInput(existingConfig.apiKey);
      setProjectIdInput(existingConfig.projectId);
    }

    const { auth, db } = initFirebase(existingConfig);

    // Check simulated user if any
    const savedSimulated = localStorage.getItem(SIMULATED_USER_KEY);
    if (savedSimulated) {
      try {
        setSimulatedUser(JSON.parse(savedSimulated));
      } catch {
        // ignore
      }
    }

    if (auth && db) {
      const unsub = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);

        if (user) {
          // Migrate local notes to Firestore
          const local = getLocalNotes();
          if (local.length > 0) {
            for (const note of local) {
              try {
                await addDoc(collection(db, 'users', user.uid, 'notes'), {
                  baslik: note.baslik,
                  zaman: note.zaman || null,
                  ikon: note.ikon || '📌',
                  renk: note.renk || '#FEF3C7',
                  createdAt: serverTimestamp(),
                });
              } catch {
                // ignore
              }
            }
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }

          // Real-time Firestore listener
          const q = query(collection(db, 'users', user.uid, 'notes'), orderBy('createdAt', 'desc'));
          const firestoreUnsub = onSnapshot(
            q,
            (snapshot) => {
              const cloudNotes: SimpleCardItem[] = [];
              snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                cloudNotes.push({
                  id: docSnap.id,
                  baslik: data.baslik,
                  zaman: data.zaman,
                  ikon: data.ikon,
                  renk: data.renk,
                  createdAt: data.createdAt,
                });
              });
              setCards(cloudNotes);
            },
            (err) => {
              console.warn('[Firestore] Snapshot notice:', err);
            }
          );
          firestoreUnsubRef.current = firestoreUnsub;
        } else {
          if (firestoreUnsubRef.current) {
            firestoreUnsubRef.current();
            firestoreUnsubRef.current = null;
          }
          setCards(getLocalNotes());
        }
      });

      return () => unsub();
    } else {
      // Local Guest Mode by default
      setCards(getLocalNotes());
    }
  }, []);

  // Web Speech API initialization
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'tr-TR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setStatusText('Dinliyorum...');
      };

      recognition.onresult = async (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setStatusText('Kaydediliyor...');
        resetMicUI();
        await parseAndSave(spokenText);
      };

      recognition.onerror = () => {
        resetMicUI();
        setStatusText('Ses algılanamadı, tekrar dene');
        setTimeout(() => setStatusText('Bas ve söyle'), 2500);
      };

      recognition.onend = () => {
        resetMicUI();
      };

      recognitionRef.current = recognition;
    }
  }, [currentUser, simulatedUser]);

  const resetMicUI = () => {
    setIsListening(false);
    setStatusText('Bas ve söyle');
  };

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      setShowTextInput(true);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      resetMicUI();
    } else {
      try {
        recognitionRef.current.start();
      } catch {
        resetMicUI();
      }
    }
  };

  // Add Note (Unified Router: Cloud or Local)
  const addNote = async (noteData: {
    baslik: string;
    zaman?: string | null;
    ikon?: string;
    renk?: string;
  }) => {
    const { auth, db } = initFirebase();

    if (currentUser && db) {
      // Write to Firestore
      await addDoc(collection(db, 'users', currentUser.uid, 'notes'), {
        ...noteData,
        createdAt: serverTimestamp(),
      });
    } else {
      // Write to LocalStorage / Local State
      const currentList = getLocalNotes();
      const newCard: SimpleCardItem = {
        id: 'local_' + Date.now(),
        ...noteData,
      };
      const updated = [newCard, ...currentList];
      saveLocalNotes(updated);
      setCards(updated);
    }
  };

  // Delete Note (Unified Router: Cloud or Local)
  const deleteNote = async (id: string) => {
    // Animate removal first
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isRemoving: true } : c))
    );

    setTimeout(async () => {
      const { db } = initFirebase();
      if (currentUser && db && !id.startsWith('local_')) {
        try {
          await deleteDoc(doc(db, 'users', currentUser.uid, 'notes', id));
        } catch {
          // ignore
        }
      } else {
        const local = getLocalNotes().filter((n) => n.id !== id);
        saveLocalNotes(local);
        setCards(local);
      }
    }, 200);
  };

  // AI Parser: Generates clean 4-field card object
  const parseAndSave = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      resetMicUI();
      return;
    }

    // Direct JSON support if user passes JSON
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const json = JSON.parse(trimmed);
        if (json.baslik) {
          await addNote({
            baslik: json.baslik,
            zaman: json.zaman || 'Kaydedildi',
            ikon: json.ikon || '📌',
            renk: json.renk || '#FEF3C7',
          });
          resetMicUI();
          return;
        }
      } catch {
        // continue
      }
    }

    try {
      const res = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: trimmed,
          current_datetime: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const parsed = data.data;
          let calculatedZaman = parsed.calendar_event?.start_datetime
            ? new Date(parsed.calendar_event.start_datetime).toLocaleDateString('tr-TR', {
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })
            : null;

          if (parsed.periodic_log?.is_periodic && parsed.periodic_log?.interval_days) {
            calculatedZaman = `${parsed.periodic_log.interval_days} gün sonra`;
          }

          await addNote({
            baslik: parsed.summary || trimmed.slice(0, 24),
            zaman: calculatedZaman || parsed.detailed_note?.slice(0, 35) || 'Kaydedildi',
            ikon: parsed.ui_meta?.icon?.split(' ')[0] || '📌',
            renk: parsed.ui_meta?.color_hex || '#FEF3C7',
          });
          resetMicUI();
          return;
        }
      }

      // Cognitive local fallback
      const local = extractSimpleNoteFromText(trimmed);
      await addNote({
        baslik: local.baslik,
        zaman: local.zaman || 'Hatırlatıcı yok',
        ikon: local.ikon || '📌',
        renk: local.renk || '#FEF3C7',
      });
    } catch {
      await addNote({
        baslik: trimmed.slice(0, 24),
        zaman: null,
        ikon: '📝',
        renk: '#F5F5F4',
      });
    } finally {
      resetMicUI();
    }
  };

  // Google Sign-In Handler
  const handleLogin = async () => {
    const { auth } = initFirebase();
    if (!auth) {
      // Show config / login options modal
      setShowConfigModal(true);
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.warn('Giriş uyarısı:', err?.message || err);
      // Fallback: offer configuration dialog
      setShowConfigModal(true);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    if (confirm('Hesaptan çıkış yapılsın mı?')) {
      const { auth } = initFirebase();
      if (auth) {
        await signOut(auth);
      }
      setCurrentUser(null);
      setSimulatedUser(null);
      localStorage.removeItem(SIMULATED_USER_KEY);
      setCards(getLocalNotes());
    }
  };

  // Save custom Firebase config
  const handleSaveConfig = () => {
    if (apiKeyInput.trim() && projectIdInput.trim()) {
      const newConfig: FirebaseConfig = {
        apiKey: apiKeyInput.trim(),
        authDomain: `${projectIdInput.trim()}.firebaseapp.com`,
        projectId: projectIdInput.trim(),
        storageBucket: `${projectIdInput.trim()}.appspot.com`,
      };
      saveFirebaseConfig(newConfig);
      initFirebase(newConfig);
      setShowConfigModal(false);
      handleLogin();
    }
  };

  // Quick Simulated Google Account for instant testing
  const handleSimulatedSignIn = () => {
    const mockUser = {
      uid: 'user_google_' + Math.random().toString(36).substring(2, 8),
      displayName: 'Bahadır Kumcu',
      email: 'bahadirkumcu@gmail.com',
      photoURL: 'https://api.dicebear.com/7.x/identicon/svg?seed=bahadirkumcu',
    };
    setSimulatedUser(mockUser);
    localStorage.setItem(SIMULATED_USER_KEY, JSON.stringify(mockUser));
    setShowConfigModal(false);
  };

  const activeUser = currentUser || simulatedUser;
  const isCloudSync = !!activeUser;

  return (
    <div className="bg-stone-100 text-stone-800 antialiased select-none min-h-screen flex items-center justify-center">
      {/* Masaüstünde telefon gibi ortalanan, mobilde tam ekran olan kapsayıcı */}
      <main className="w-full max-w-md h-[100dvh] flex flex-col justify-between bg-white relative shadow-sm overflow-hidden sm:border sm:border-stone-200">
        
        {/* Başlık ve Profil / Giriş Alanı */}
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

          {/* Sağ Üst: Giriş / Profil Butonu */}
          <div id="auth-container" className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowTextInput(!showTextInput)}
              title="Klavye ile yaz"
              className="text-xs text-stone-400 hover:text-stone-700 transition-colors cursor-pointer px-1 py-0.5"
            >
              {showTextInput ? 'Kapat' : 'Yaz'}
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
                title={`${activeUser.displayName || 'Hesap'} (Çıkış Yap)`}
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
                  await parseAndSave(val);
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

        {/* Kart Listesi */}
        <section
          id="cards-container"
          className="flex-1 overflow-y-auto px-5 py-3 space-y-3 pb-32"
        >
          {cards.length === 0 ? (
            <div className="text-center text-xs text-stone-400 mt-10">
              Henüz bir not yok. Konuşmak için butona bas.
            </div>
          ) : (
            cards.map((item) => (
              <div
                key={item.id}
                className={`card p-4 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                  item.isRemoving ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                }`}
                style={{
                  backgroundColor: item.renk || '#FEF3C7',
                  borderColor: 'rgba(0,0,0,0.05)',
                  borderWidth: '1px',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl select-none">{item.ikon || '📌'}</span>
                  <div>
                    <h2 className="font-semibold text-stone-900 text-base leading-tight">
                      {item.baslik}
                    </h2>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {item.zaman || 'Hatırlatıcı yok'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteNote(item.id)}
                  className="w-8 h-8 rounded-full border border-stone-300/70 flex items-center justify-center text-stone-400 active:bg-white/80 transition-colors cursor-pointer shrink-0"
                >
                  ✓
                </button>
              </div>
            ))
          )}
        </section>

        {/* Alt Kısım: Mikrofon */}
        <footer className="absolute bottom-0 inset-x-0 p-6 flex flex-col items-center bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-auto">
          <p
            id="status-text"
            className={`text-xs mb-3 font-medium transition-colors ${
              isListening ? 'text-red-500 font-semibold' : 'text-stone-400'
            }`}
          >
            {statusText}
          </p>

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
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 02-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
        </footer>

        {/* Firebase Config / Giriş Seçenekleri Modalı */}
        {showConfigModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 backdrop-blur-2xs p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-sm font-bold text-stone-900">Bulut Senkronizasyonu</h3>
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="text-stone-400 hover:text-stone-600 text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Notlarınızı cihazlar arasında otomatik senkronize etmek için Firebase bilgilerinizi girebilir veya hızlı test oturumu açabilirsiniz.
              </p>

              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-semibold text-stone-500 block mb-1">
                    Firebase API Key
                  </label>
                  <input
                    type="text"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-500 block mb-1">
                    Project ID
                  </label>
                  <input
                    type="text"
                    value={projectIdInput}
                    onChange={(e) => setProjectIdInput(e.target.value)}
                    placeholder="notivia-app-123"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="w-full py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Firebase Bilgilerini Kaydet & Giriş Yap
                </button>
                <button
                  type="button"
                  onClick={handleSimulatedSignIn}
                  className="w-full py-2 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-200 transition-colors"
                >
                  Hızlı Test Hesabı ile Giriş Yap
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
