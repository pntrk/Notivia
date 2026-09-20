import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Check,
  Clock,
  Trash2,
  Plus,
  Palette,
  Bell,
  BellRing,
  BellOff,
  ListTodo,
  Calendar,
  FileText,
  Repeat,
  Smartphone,
  ExternalLink,
  Volume2,
  Sparkles,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import type { SimpleCardItem } from '../App.tsx';
import {
  openDirectDeviceCalendar,
  openGoogleCalendarApp,
  requestDeviceNotificationPermission,
  playNotificationChime,
} from '../utils/deviceCalendar.ts';

export interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: SimpleCardItem | null;
  onSave: (updatedNote: SimpleCardItem) => Promise<void> | void;
  language?: 'tr' | 'en';
  theme?: 'light' | 'dark';
  initialTab?: 'all' | 'alarm' | 'tasks' | 'details';
}

export const PASTEL_COLORS = [
  { name: 'Sarı', nameEn: 'Sunny', hex: '#FEF3C7', darkHex: '#78350F' },
  { name: 'Limon', nameEn: 'Lemon', hex: '#FEF08A', darkHex: '#854D0E' },
  { name: 'Mavi', nameEn: 'Sky', hex: '#E0F2FE', darkHex: '#0C4A6E' },
  { name: 'İndigo', nameEn: 'Indigo', hex: '#E0E7FF', darkHex: '#3730A3' },
  { name: 'Yeşil', nameEn: 'Emerald', hex: '#DCFCE7', darkHex: '#14532D' },
  { name: 'Nane', nameEn: 'Mint', hex: '#CCFBF1', darkHex: '#115E59' },
  { name: 'Camgöbeği', nameEn: 'Cyan', hex: '#CFFAFE', darkHex: '#155E75' },
  { name: 'Kırmızı', nameEn: 'Coral', hex: '#FEE2E2', darkHex: '#7F1D1D' },
  { name: 'Pembe', nameEn: 'Rose', hex: '#FFE4E6', darkHex: '#881337' },
  { name: 'Mor', nameEn: 'Lavender', hex: '#F3E8FF', darkHex: '#581C87' },
  { name: 'Leylak', nameEn: 'Lilac', hex: '#EDE9FE', darkHex: '#5B21B6' },
  { name: 'Turuncu', nameEn: 'Peach', hex: '#FFEDD5', darkHex: '#7C2D12' },
  { name: 'Şeftali', nameEn: 'Warm Peach', hex: '#FED7AA', darkHex: '#9A3412' },
  { name: 'Haki', nameEn: 'Khaki', hex: '#E2E8D5', darkHex: '#3F4E28' },
  { name: 'Gri', nameEn: 'Slate', hex: '#F1F5F9', darkHex: '#334155' },
  { name: 'Taş', nameEn: 'Stone', hex: '#F5F5F4', darkHex: '#44403C' },
];

export const ALL_EMOJIS = [
  '📌', '📋', '✅', '⏰', '💡', '💊', '⭐', '❤️', '🔥', '🎯', '🛒', '📝',
  '⚖️', '🏛️', '📊', '💼', '🧾', '💻', '📐', '🏢', '📈', '🤝', '📁', '🖋️',
  '🩺', '💉', '🦷', '🌱', '🍎', '☕', '💧', '🏃', '🧘', '🌿', '🥗', '⚡',
  '🔧', '⚙️', '🏗️', '🛠️', '🚛', '🚗', '🔑', '🔋', '🛡️', '🚨', '🧹', '🏷️',
  '📚', '🎓', '🍱', '👮', '🚒', '👨‍🍳', '✈️', '🪖', '🏪', '🎨', '🧪', '🌍'
];

function toLocalDatetimeString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function EditNoteModal({
  isOpen,
  onClose,
  note,
  onSave,
  language = 'tr',
  theme = 'light',
  initialTab = 'all',
}: EditNoteModalProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'alarm' | 'appearance'>('content');
  const [baslik, setBaslik] = useState('');
  const [zaman, setZaman] = useState('');
  const [tarihIso, setTarihIso] = useState('');
  const [ikon, setIkon] = useState('📌');
  const [renk, setRenk] = useState('#FEF3C7');
  const [anomaliNotu, setAnomaliNotu] = useState('');
  const [actionItems, setActionItems] = useState<{ task: string; is_completed: boolean }[]>([]);
  const [newSubtaskInput, setNewSubtaskInput] = useState('');
  const [deviceNotificationEnabled, setDeviceNotificationEnabled] = useState(true);
  const [periodicType, setPeriodicType] = useState<string>('none');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  const activeColorObj = useMemo(() => {
    return (
      PASTEL_COLORS.find(
        (c) => c.hex.toLowerCase() === (renk || '').toLowerCase()
      ) || PASTEL_COLORS[0]
    );
  }, [renk]);

  useEffect(() => {
    if (note && isOpen) {
      setBaslik(note.baslik || '');
      setZaman(note.zaman || '');
      setTarihIso(note.tarih_iso ? note.tarih_iso.substring(0, 16) : '');
      setIkon(note.ikon || '📌');
      setRenk(note.renk || '#FEF3C7');
      setAnomaliNotu(note.anomali_notu || '');
      setActionItems(
        note.action_items ? note.action_items.map((t) => ({ ...t })) : []
      );
      setDeviceNotificationEnabled(note.deviceNotificationEnabled !== false);
      setPeriodicType(note.periyodik?.tip || 'none');
      setNewSubtaskInput('');
      setFeedback(null);

      // Tab seçimi
      if (initialTab === 'alarm') {
        setActiveTab('alarm');
      } else if (initialTab === 'tasks' || initialTab === 'details') {
        setActiveTab('content');
      } else {
        setActiveTab('content');
      }
    }
  }, [note, isOpen, initialTab]);

  if (!isOpen || !note) return null;

  const triggerHaptic = (ms = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(ms);
      } catch {
        // Safe fallback
      }
    }
  };

  const showFeedback = (type: 'success' | 'info' | 'error', text: string) => {
    setFeedback({ type, text });
    setTimeout(() => {
      setFeedback((prev) => (prev?.text === text ? null : prev));
    }, 2800);
  };

  const handleClearDate = () => {
    triggerHaptic(10);
    setTarihIso('');
    setZaman('');
    setPeriodicType('none');
    showFeedback('info', language === 'tr' ? 'Tarih ve alarm temizlendi.' : 'Date & alarm cleared.');
  };

  const handleToggleNotification = async (enabled: boolean) => {
    triggerHaptic(15);
    if (enabled) {
      const granted = await requestDeviceNotificationPermission();
      setDeviceNotificationEnabled(true);
      if (granted) {
        showFeedback('success', language === 'tr' ? '✓ Sesli alarm ve bildirimler aktif' : '✓ Sound alarm and push notifications enabled');
      } else {
        showFeedback('info', language === 'tr' ? 'Uygulama içi sesli alarm hazır' : 'In-app sound chime ready');
      }
    } else {
      setDeviceNotificationEnabled(false);
      showFeedback('info', language === 'tr' ? 'Bildirim ve sesli alarm kapatıldı' : 'Alarm and sound disabled');
    }
  };

  const handleTestChime = () => {
    triggerHaptic(20);
    try {
      playNotificationChime();
      showFeedback('success', language === 'tr' ? '🔔 Alarm sesi test edildi' : '🔔 Alarm chime played');
    } catch {
      showFeedback('info', 'Ses çalındı');
    }
  };

  const handleExportToDeviceCalendar = () => {
    triggerHaptic(15);
    const targetDate = tarihIso ? new Date(tarihIso) : new Date();
    if (isNaN(targetDate.getTime())) {
      showFeedback('error', language === 'tr' ? 'Geçerli bir tarih seçin.' : 'Please select a valid date.');
      return;
    }

    let rruleStr: string | undefined = undefined;
    if (periodicType === 'gunluk') rruleStr = 'FREQ=DAILY;INTERVAL=1';
    else if (periodicType === 'haftalik') rruleStr = 'FREQ=WEEKLY;INTERVAL=1';
    else if (periodicType === 'aylik') rruleStr = 'FREQ=MONTHLY;INTERVAL=1';

    openDirectDeviceCalendar({
      title: `${ikon} ${baslik || 'Notivia Hatırlatıcı'}`,
      startDate: targetDate,
      description: anomaliNotu || actionItems.map((a) => `• ${a.task}`).join('\n') || 'Notivia Bilişsel Hatırlatıcı',
      rrule: rruleStr,
    });

    showFeedback('success', language === 'tr' ? '📱 Telefon takvimine aktarılıyor...' : '📱 Exporting to device calendar...');
  };

  const handleOpenGoogleCalendar = () => {
    triggerHaptic(15);
    const targetDate = tarihIso ? new Date(tarihIso) : new Date();
    if (isNaN(targetDate.getTime())) {
      showFeedback('error', language === 'tr' ? 'Geçerli bir tarih seçin.' : 'Please select a valid date.');
      return;
    }

    let rruleStr: string | undefined = undefined;
    if (periodicType === 'gunluk') rruleStr = 'FREQ=DAILY;INTERVAL=1';
    else if (periodicType === 'haftalik') rruleStr = 'FREQ=WEEKLY;INTERVAL=1';
    else if (periodicType === 'aylik') rruleStr = 'FREQ=MONTHLY;INTERVAL=1';

    openGoogleCalendarApp({
      title: `${ikon} ${baslik || 'Notivia Hatırlatıcı'}`,
      startDate: targetDate,
      description: anomaliNotu || actionItems.map((a) => `• ${a.task}`).join('\n') || 'Notivia Bilişsel Hatırlatıcı',
      rrule: rruleStr,
    });

    showFeedback('success', language === 'tr' ? '📅 Google Takvim açılıyor...' : '📅 Opening Google Calendar...');
  };

  const handleAddSubtask = () => {
    if (!newSubtaskInput.trim()) return;
    triggerHaptic(10);
    const lines = newSubtaskInput.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const newItems = lines
      .map((line) => ({
        task: line.replace(/^[-*•\d+.)\]\[\s]+/, '').trim(),
        is_completed: false,
      }))
      .filter((item) => item.task.length > 0);

    if (newItems.length > 0) {
      setActionItems((prev) => [...prev, ...newItems]);
      setNewSubtaskInput('');
    }
  };

  const handleToggleSubtask = (index: number) => {
    triggerHaptic(15);
    setActionItems((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, is_completed: !item.is_completed } : item
      )
    );
  };

  const handleRemoveSubtask = (index: number) => {
    triggerHaptic(10);
    setActionItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubtaskTextChange = (index: number, newText: string) => {
    setActionItems((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, task: newText } : item
      )
    );
  };

  const completedCount = actionItems.filter((a) => a.is_completed).length;
  const totalCount = actionItems.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!baslik.trim()) {
      showFeedback('error', language === 'tr' ? 'Lütfen kart başlığını girin.' : 'Please enter card title.');
      setActiveTab('content');
      return;
    }

    triggerHaptic(25);
    const finalIso = tarihIso ? new Date(tarihIso).toISOString() : null;

    const updated: SimpleCardItem = {
      ...note,
      baslik: baslik.trim(),
      zaman:
        zaman.trim() ||
        (finalIso
          ? new Date(tarihIso).toLocaleString('tr-TR', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })
          : null),
      tarih_iso: finalIso,
      ikon,
      renk,
      anomali_notu: anomaliNotu.trim() || null,
      action_items: actionItems,
      deviceNotificationEnabled,
      periyodik:
        periodicType !== 'none'
          ? {
              tip: periodicType,
              aralik_gun: periodicType === 'gunluk' ? 1 : periodicType === 'haftalik' ? 7 : 30,
            }
          : null,
      eksik_bilgi: finalIso ? false : note.eksik_bilgi,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div
      id="unified-edit-note-modal"
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 select-none ${
        theme === 'dark' ? 'dark' : ''
      }`}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-lg bg-white dark:bg-stone-900 border-t sm:border border-stone-200/90 dark:border-stone-800 rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[88dvh] text-stone-900 dark:text-stone-100 animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        {/* Mobil Tutamaç Çubuğu (Native Bottom Sheet Handle) */}
        <div className="pt-2.5 pb-1 flex items-center justify-center sm:hidden shrink-0">
          <div className="w-10 h-1 rounded-full bg-stone-300 dark:bg-stone-700" />
        </div>

        {/* Üst Kart Önizleme Başlığı */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-stone-100 dark:border-stone-800/80 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-2xl border border-black/10 shadow-xs shrink-0 select-none transition-transform active:scale-95 cursor-pointer"
              style={{ backgroundColor: renk }}
              onClick={() => setActiveTab('appearance')}
              title={language === 'tr' ? 'Simgeyi veya rengi değiştirmek için dokunun' : 'Tap to change icon or color'}
            >
              {ikon}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm leading-tight truncate">
                {baslik.trim() || (language === 'tr' ? 'Kartı Düzenle' : 'Edit Card')}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                {tarihIso ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span className="truncate max-w-[130px]">{zaman || 'Alarm'}</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-stone-400">
                    {language === 'tr' ? 'Alarmsız Not' : 'Standard Note'}
                  </span>
                )}

                {totalCount > 0 && (
                  <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">
                    • {completedCount}/{totalCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-90 transition-all cursor-pointer shrink-0"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobil Segmented Tab Bar (Üst Seviye Mobil Gezinme) */}
        <div className="px-4 sm:px-5 pt-2.5 pb-1 shrink-0 bg-stone-50/70 dark:bg-stone-900/60 border-b border-stone-100 dark:border-stone-800/60">
          <div className="flex items-center p-1 rounded-xl bg-stone-200/70 dark:bg-stone-800 gap-1 select-none">
            <button
              type="button"
              onClick={() => {
                triggerHaptic(8);
                setActiveTab('content');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation ${
                activeTab === 'content'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs scale-[1.01]'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <ListTodo className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'tr' ? 'İçerik & Görevler' : 'Tasks & Note'}</span>
              {totalCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-100 dark:bg-stone-600 font-bold">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                triggerHaptic(8);
                setActiveTab('alarm');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation ${
                activeTab === 'alarm'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs scale-[1.01]'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'tr' ? 'Alarm & Zaman' : 'Alarm & Time'}</span>
              {tarihIso && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                triggerHaptic(8);
                setActiveTab('appearance');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation ${
                activeTab === 'appearance'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs scale-[1.01]'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'tr' ? 'Simge & Renk' : 'Theme'}</span>
            </button>
          </div>
        </div>

        {/* Canlı Geri Bildirim Bildirimi */}
        {feedback && (
          <div
            className={`mx-4 sm:mx-5 mt-2.5 p-2 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 animate-in fade-in duration-150 shrink-0 ${
              feedback.type === 'success'
                ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                : feedback.type === 'error'
                ? 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/20'
                : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/20'
            }`}
          >
            <span>{feedback.text}</span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Gövde / Tab İçerikleri */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain">
          {/* TAB 1: İÇERİK & BİLİŞSEL GÖREVLER */}
          {activeTab === 'content' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* 1. KART BAŞLIĞI */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {language === 'tr' ? 'Kart Başlığı' : 'Card Title'}
                </label>
                <input
                  type="text"
                  required
                  value={baslik}
                  onChange={(e) => setBaslik(e.target.value)}
                  placeholder={language === 'tr' ? 'Görev veya hatırlatıcı başlığı...' : 'Task or note title...'}
                  className="w-full text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/80 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all placeholder:font-normal placeholder:text-stone-400 min-h-[44px]"
                />
              </div>

              {/* 2. BİLİŞSEL ALT GÖREVLER (CHECKLIST) */}
              <div className="space-y-2.5 p-3 sm:p-3.5 rounded-2xl bg-stone-50/70 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ListTodo className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                      {language === 'tr' ? 'Alt Görevler' : 'Subtasks'}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-400">({totalCount})</span>
                  </div>

                  {totalCount > 0 && (
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{completedCount}/{totalCount}</span>
                    </span>
                  )}
                </div>

                {/* İlerleme Çubuğu */}
                {totalCount > 0 && (
                  <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}

                {/* Maddeler Listesi */}
                {actionItems.length > 0 && (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-0.5 scrollbar-thin">
                    {actionItems.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                          item.is_completed
                            ? 'bg-stone-100/60 dark:bg-stone-800/30 border-stone-200/50 dark:border-stone-700/50'
                            : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 shadow-2xs'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleToggleSubtask(idx)}
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 cursor-pointer border transition-all ${
                            item.is_completed
                              ? 'bg-emerald-600 border-emerald-600 text-white font-bold scale-95'
                              : 'border-stone-300 dark:border-stone-600 hover:border-amber-500'
                          }`}
                        >
                          {item.is_completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                        </button>
                        <input
                          type="text"
                          value={item.task}
                          onChange={(e) => handleSubtaskTextChange(idx, e.target.value)}
                          className={`flex-1 text-xs bg-transparent outline-none py-0.5 font-medium ${
                            item.is_completed
                              ? 'line-through text-stone-400 dark:text-stone-500'
                              : 'text-stone-800 dark:text-stone-200'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSubtask(idx)}
                          className="text-stone-400 hover:text-red-500 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Yeni Madde Ekleme Kutusu */}
                <div className="flex items-center gap-1.5 pt-1">
                  <input
                    type="text"
                    value={newSubtaskInput}
                    onChange={(e) => setNewSubtaskInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubtask();
                      }
                    }}
                    placeholder={language === 'tr' ? '+ Madde ekle (Enter ile kaydet)...' : '+ Add task (press Enter)...'}
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 min-h-[40px] shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubtask}
                    disabled={!newSubtaskInput.trim()}
                    className="px-3.5 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold rounded-xl hover:opacity-90 disabled:opacity-30 transition-all cursor-pointer flex items-center gap-1 shrink-0 active:scale-95 min-h-[40px]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{language === 'tr' ? 'Ekle' : 'Add'}</span>
                  </button>
                </div>
              </div>

              {/* 3. EK NOT & AÇIKLAMA */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-stone-400" />
                  <span>{language === 'tr' ? 'Ek Not & Detaylar' : 'Notes & Details'}</span>
                </label>
                <textarea
                  value={anomaliNotu}
                  onChange={(e) => setAnomaliNotu(e.target.value)}
                  rows={2}
                  placeholder={language === 'tr' ? 'Özel not, teknik uyarı veya operasyonel detay...' : 'Custom note, instructions or details...'}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/80 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 outline-none resize-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: ALARM & ZAMANLAMA */}
          {activeTab === 'alarm' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Manuel Tarih & Saat Seçici */}
              <div className="p-3.5 rounded-2xl bg-stone-50/80 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>{language === 'tr' ? 'Tarih ve Saat' : 'Date & Time'}</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={tarihIso}
                      onChange={(e) => {
                        setTarihIso(e.target.value);
                        if (e.target.value) {
                          setZaman(
                            new Date(e.target.value).toLocaleString('tr-TR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          );
                        }
                      }}
                      className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 min-h-[42px] shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{language === 'tr' ? 'Arayüz Etiketi' : 'Display Text'}</span>
                    </label>
                    <input
                      type="text"
                      value={zaman}
                      onChange={(e) => setZaman(e.target.value)}
                      placeholder={language === 'tr' ? 'Örn: Bugün 19:30' : 'e.g. Tomorrow 09:00'}
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 min-h-[42px] shadow-2xs"
                    />
                  </div>
                </div>

                {/* Tekrarlama Periyodu */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                    <Repeat className="w-3 h-3 text-amber-500" />
                    <span>{language === 'tr' ? 'Tekrarlama' : 'Recurrence'}</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'none', label: language === 'tr' ? 'Yok' : 'None' },
                      { id: 'gunluk', label: language === 'tr' ? 'Günlük' : 'Daily' },
                      { id: 'haftalik', label: language === 'tr' ? 'Haftalık' : 'Weekly' },
                      { id: 'aylik', label: language === 'tr' ? 'Aylık' : 'Monthly' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          triggerHaptic(8);
                          setPeriodicType(p.id);
                        }}
                        className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center cursor-pointer active:scale-95 min-h-[38px] ${
                          periodicType === p.id
                            ? 'bg-amber-500 text-white shadow-xs font-bold'
                            : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sesli Alarm ve Bildirim Açma/Kapama */}
              <div
                onClick={() => handleToggleNotification(!deviceNotificationEnabled)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] flex items-center justify-between gap-3 shadow-2xs ${
                  deviceNotificationEnabled
                    ? 'bg-amber-500/10 border-amber-500/30 dark:bg-amber-500/15'
                    : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all shrink-0 ${
                      deviceNotificationEnabled
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    {deviceNotificationEnabled ? <BellRing className="w-4 h-4 animate-pulse" /> : <BellOff className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                      {language === 'tr' ? 'Cihaz Sesli Alarmı & Bildirim' : 'Sound Alarm & Push Notification'}
                    </h4>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                      {deviceNotificationEnabled
                        ? (language === 'tr' ? 'Vakti geldiğinde sesli çalar ve bildirir' : 'Will chime & notify at scheduled time')
                        : (language === 'tr' ? 'Sessiz mod (alarm kapalı)' : 'Silent mode (alarm off)')}
                    </p>
                  </div>
                </div>

                {/* iOS/Android Style Switch */}
                <div
                  className={`w-11 h-6 rounded-full transition-colors duration-200 p-0.5 flex items-center shrink-0 ${
                    deviceNotificationEnabled ? 'bg-amber-500 justify-end' : 'bg-stone-300 dark:bg-stone-600 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform" />
                </div>
              </div>

              {/* Takvim Senkronizasyon Butonları */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  {language === 'tr' ? 'Harici Takvim Senkronizasyonu' : 'External Calendar Sync'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleExportToDeviceCalendar}
                    className="py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-2xs min-h-[40px]"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{language === 'tr' ? 'Telefon Takvimi' : 'Phone Calendar'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenGoogleCalendar}
                    className="py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-2xs min-h-[40px]"
                  >
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>Google Takvim</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SİMGE & RENK TEMASI */}
          {activeTab === 'appearance' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Pastel Renk Seçici */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-500" />
                    <span>{language === 'tr' ? 'Kart Pastel Rengi' : 'Pastel Card Color'}</span>
                  </label>
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    {language === 'tr' ? activeColorObj.name : activeColorObj.nameEn}
                  </span>
                </div>

                <div className="grid grid-cols-8 gap-2 p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/80 dark:border-stone-700/80">
                  {PASTEL_COLORS.map((col) => {
                    const isSelected = renk.toLowerCase() === col.hex.toLowerCase();
                    return (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => {
                          triggerHaptic(12);
                          setRenk(col.hex);
                        }}
                        className={`w-full aspect-square max-w-[38px] rounded-full border border-black/15 dark:border-white/20 transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-2xs touch-manipulation mx-auto ${
                          isSelected
                            ? 'ring-3 ring-amber-500 scale-115 shadow-md z-10'
                            : 'hover:scale-110 active:scale-95 opacity-85 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={language === 'tr' ? col.name : col.nameEn}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-stone-900 stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Simge Seçici (Doğrudan Dokunmatik Izgara) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                    {language === 'tr' ? 'Simge / Emoji Seçimi' : 'Icon / Emoji Selection'}
                  </label>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-sm">
                    {ikon}
                  </span>
                </div>

                {/* Emoji Izgarası */}
                <div className="grid grid-cols-6 sm:grid-cols-6 gap-2 p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 max-h-48 overflow-y-auto scrollbar-thin">
                  {ALL_EMOJIS.map((emoji, idx) => {
                    const isSelected = ikon === emoji;
                    return (
                      <button
                        key={`${emoji}-${idx}`}
                        type="button"
                        onClick={() => {
                          triggerHaptic(12);
                          setIkon(emoji);
                        }}
                        className={`w-full aspect-square rounded-xl text-2xl flex items-center justify-center transition-all cursor-pointer min-h-[44px] touch-manipulation ${
                          isSelected
                            ? 'bg-amber-100 text-amber-950 dark:bg-amber-900/60 dark:text-amber-100 scale-108 shadow-xs font-bold ring-2 ring-amber-500'
                            : 'hover:bg-white dark:hover:bg-stone-700 bg-white/60 dark:bg-stone-800/80 active:scale-95 border border-stone-200/60 dark:border-stone-700/60'
                        }`}
                      >
                        {emoji}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sabit Alt Mobil Eylem Çubuğu (Ergonomic Touch Footer) */}
        <div className="flex items-center gap-2 p-3 sm:px-5 sm:py-3.5 border-t border-stone-100 dark:border-stone-800 bg-stone-50/95 dark:bg-stone-900/95 shrink-0 safe-bottom">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-3 rounded-xl text-xs font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer text-center min-h-[46px] active:scale-[0.98]"
          >
            {language === 'tr' ? 'Vazgeç' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="flex-2 py-3 px-4 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 shadow-md active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[46px]"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{language === 'tr' ? 'Kaydet' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
