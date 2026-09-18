import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Calendar,
  Clock,
  Trash2,
  Plus,
  Tag,
  Palette,
  Bell,
  BellOff,
  Sparkles,
  ListTodo,
} from 'lucide-react';
import type { SimpleCardItem } from '../App.tsx';

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: SimpleCardItem | null;
  onSave: (updatedNote: SimpleCardItem) => Promise<void> | void;
  language?: 'tr' | 'en';
  theme?: 'light' | 'dark';
}

const PASTEL_COLORS = [
  { name: 'Sarı', hex: '#FEF3C7', darkHex: '#78350F' },
  { name: 'Mavi', hex: '#E0F2FE', darkHex: '#0C4A6E' },
  { name: 'Yeşil', hex: '#DCFCE7', darkHex: '#14532D' },
  { name: 'Kırmızı', hex: '#FEE2E2', darkHex: '#7F1D1D' },
  { name: 'Mor', hex: '#F3E8FF', darkHex: '#581C87' },
  { name: 'Gri', hex: '#F1F5F9', darkHex: '#334155' },
  { name: 'Turuncu', hex: '#FFEDD5', darkHex: '#7C2D12' },
  { name: 'Gül', hex: '#FFE4E6', darkHex: '#881337' },
];

const EMOJI_OPTIONS = [
  '📌', '📋', '✅', '⏰', '💡', '💊', '⚖️', '🏛️', '📊', '🍱',
  '📚', '🎓', '👮', '🚒', '👨‍🍳', '✈️', '🩺', '💉', '🦷', '🔧',
  '💼', '🧾', '🏪', '🪖', '🏗️', '⚡', '⚙️', '💻', '📐', '🚛',
  '🛒', '🔑', '🎯', '🌱', '⭐'
];

export function EditNoteModal({
  isOpen,
  onClose,
  note,
  onSave,
  language = 'tr',
  theme = 'light',
}: EditNoteModalProps) {
  const [baslik, setBaslik] = useState('');
  const [zaman, setZaman] = useState('');
  const [tarihIso, setTarihIso] = useState('');
  const [ikon, setIkon] = useState('📌');
  const [renk, setRenk] = useState('#FEF3C7');
  const [anomaliNotu, setAnomaliNotu] = useState('');
  const [actionItems, setActionItems] = useState<{ task: string; is_completed: boolean }[]>([]);
  const [newSubtaskInput, setNewSubtaskInput] = useState('');
  const [deviceNotificationEnabled, setDeviceNotificationEnabled] = useState(true);
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  useEffect(() => {
    if (note) {
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
      setNewSubtaskInput('');
      setShowCustomDatePicker(!!note.tarih_iso);
    }
  }, [note, isOpen]);

  if (!isOpen || !note) return null;

  const setTodayEvening = () => {
    const d = new Date();
    d.setHours(19, 30, 0, 0);
    if (d.getTime() < Date.now()) {
      d.setDate(d.getDate() + 1);
    }
    const iso = d.toISOString().substring(0, 16);
    setTarihIso(iso);
    setZaman(language === 'tr' ? 'Bu Akşam 19:30' : 'Tonight 19:30');
    setShowCustomDatePicker(false);
  };

  const setTomorrowMorning = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(9, 0, 0, 0);
    const iso = d.toISOString().substring(0, 16);
    setTarihIso(iso);
    setZaman(language === 'tr' ? 'Yarın 09:00' : 'Tomorrow 09:00');
    setShowCustomDatePicker(false);
  };

  const setInTwoDays = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    d.setHours(10, 0, 0, 0);
    const iso = d.toISOString().substring(0, 16);
    setTarihIso(iso);
    setZaman(language === 'tr' ? '2 Gün Sonra' : 'In 2 days');
    setShowCustomDatePicker(false);
  };

  const clearDateTime = () => {
    setTarihIso('');
    setZaman('');
    setShowCustomDatePicker(false);
  };

  const handleAddSubtask = () => {
    if (!newSubtaskInput.trim()) return;
    const lines = newSubtaskInput.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const newItems = lines.map((line) => ({
      task: line.replace(/^[-*•\d+.)\]\[\s]+/, '').trim(),
      is_completed: false,
    })).filter((item) => item.task.length > 0);

    if (newItems.length > 0) {
      setActionItems((prev) => [...prev, ...newItems]);
      setNewSubtaskInput('');
    }
  };

  const handleToggleSubtask = (index: number) => {
    setActionItems((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, is_completed: !item.is_completed } : item
      )
    );
  };

  const handleRemoveSubtask = (index: number) => {
    setActionItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubtaskTextChange = (index: number, newText: string) => {
    setActionItems((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, task: newText } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baslik.trim()) return;

    const finalIso = tarihIso ? new Date(tarihIso).toISOString() : null;

    const updated: SimpleCardItem = {
      ...note,
      baslik: baslik.trim(),
      zaman: zaman.trim() || (finalIso ? new Date(tarihIso).toLocaleString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : null),
      tarih_iso: finalIso,
      ikon,
      renk,
      anomali_notu: anomaliNotu.trim() || null,
      action_items: actionItems,
      deviceNotificationEnabled,
      eksik_bilgi: finalIso ? false : note.eksik_bilgi,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      <div
        className="relative w-full sm:max-w-lg bg-white dark:bg-stone-900 border-t sm:border border-stone-200 dark:border-stone-800 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobil Tutamaç Çubuğu */}
        <div className="w-10 h-1 rounded-full bg-stone-300 dark:bg-stone-700 mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

        {/* Üst Başlık & Kapatma */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 shadow-2xs shrink-0 select-none">
              {ikon}
            </span>
            <div className="min-w-0">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base leading-tight truncate">
                {baslik.trim() || (language === 'tr' ? 'Kartı Düzenle' : 'Edit Card')}
              </h3>
              <p className="text-[11px] text-stone-400 dark:text-stone-500 truncate">
                {zaman || (language === 'tr' ? 'Hızlı ve pratik ayarlar' : 'Quick settings')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95 transition-all cursor-pointer shrink-0"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Alanı */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Başlık Girişi */}
          <div>
            <div className="relative">
              <input
                type="text"
                required
                value={baslik}
                onChange={(e) => setBaslik(e.target.value)}
                placeholder={language === 'tr' ? 'Not veya görev başlığı...' : 'Note or task title...'}
                className="w-full text-base sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-500 transition-all placeholder:font-normal placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* İkon & Renk Hızlı Seçim Barı */}
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-150 dark:border-stone-800 space-y-2.5">
            {/* Emojiler - Yatay Hızlı Kaydırma */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIkon(emoji)}
                  className={`w-9 h-9 shrink-0 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                    ikon === emoji
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 scale-105 shadow-xs font-bold'
                      : 'hover:bg-stone-200/60 dark:hover:bg-stone-700/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Pastel Renkler */}
            <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60 dark:border-stone-700/60 overflow-x-auto pb-0.5">
              <Palette className="w-3.5 h-3.5 text-stone-400 shrink-0 mr-1" />
              {PASTEL_COLORS.map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => setRenk(col.hex)}
                  className={`w-7 h-7 rounded-full border border-black/10 transition-transform flex items-center justify-center shrink-0 cursor-pointer ${
                    renk.toLowerCase() === col.hex.toLowerCase()
                      ? 'ring-2 ring-stone-900 dark:ring-white scale-110 shadow-xs'
                      : 'hover:scale-105 active:scale-95'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                >
                  {renk.toLowerCase() === col.hex.toLowerCase() && (
                    <Check className="w-3.5 h-3.5 text-stone-800 stroke-[3]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Zaman ve Hatırlatıcı Hızlı Seçenekleri */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{language === 'tr' ? 'Zaman & Alarm' : 'Time & Reminder'}</span>
              </span>

              {/* Alarm Açık/Kapalı Hızlı Rozet */}
              <button
                type="button"
                onClick={() => setDeviceNotificationEnabled(!deviceNotificationEnabled)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                  deviceNotificationEnabled
                    ? 'bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border border-stone-200 dark:border-stone-700'
                }`}
                title={deviceNotificationEnabled ? 'Alarm açık' : 'Alarm kapalı'}
              >
                {deviceNotificationEnabled ? (
                  <Bell className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                ) : (
                  <BellOff className="w-3 h-3 text-stone-400" />
                )}
                <span>{deviceNotificationEnabled ? 'Alarm' : 'Sessiz'}</span>
              </button>
            </div>

            {/* Pratik Zaman Çipleri */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={setTodayEvening}
                className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-200 dark:hover:bg-stone-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>🌅</span>
                <span>{language === 'tr' ? 'Bu Akşam (19:30)' : 'Tonight (19:30)'}</span>
              </button>

              <button
                type="button"
                onClick={setTomorrowMorning}
                className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-200 dark:hover:bg-stone-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>☀️</span>
                <span>{language === 'tr' ? 'Yarın (09:00)' : 'Tomorrow (09:00)'}</span>
              </button>

              <button
                type="button"
                onClick={setInTwoDays}
                className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-200 dark:hover:bg-stone-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>📅</span>
                <span>{language === 'tr' ? '2 Gün Sonra' : 'In 2 Days'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  showCustomDatePicker
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <span>🕒</span>
                <span>{language === 'tr' ? 'Saat Seç' : 'Custom'}</span>
              </button>

              {(tarihIso || zaman) && (
                <button
                  type="button"
                  onClick={clearDateTime}
                  className="px-2.5 py-1.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                  title="Zamanı Kaldır"
                >
                  <X className="w-3 h-3" />
                  <span>{language === 'tr' ? 'Kaldır' : 'Clear'}</span>
                </button>
              )}
            </div>

            {/* Manuel Tarih/Saat Seçici */}
            {showCustomDatePicker && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1.5 animate-in fade-in duration-150">
                <input
                  type="datetime-local"
                  value={tarihIso}
                  onChange={(e) => {
                    setTarihIso(e.target.value);
                    if (e.target.value) {
                      setZaman(new Date(e.target.value).toLocaleString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }));
                    }
                  }}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-stone-400"
                />
                <input
                  type="text"
                  value={zaman}
                  onChange={(e) => setZaman(e.target.value)}
                  placeholder={language === 'tr' ? 'Etiket (Örn: Yarın 14:00)' : 'Label (e.g. Tomorrow 14:00)'}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>
            )}
          </div>

          {/* Alt Görevler / Kontrol Listesi */}
          <div className="pt-2 border-t border-stone-150 dark:border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                <ListTodo className="w-3.5 h-3.5 text-stone-400" />
                <span>{language === 'tr' ? 'Görev Maddeleri' : 'Subtasks'}</span>
                <span className="text-[11px] font-normal text-stone-400">({actionItems.length})</span>
              </span>
            </div>

            {/* Maddeler */}
            {actionItems.length > 0 && (
              <div className="space-y-1.5 mb-2.5 max-h-40 overflow-y-auto pr-0.5">
                {actionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-1.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleSubtask(idx)}
                      className={`w-5 h-5 rounded-lg flex items-center justify-center text-[11px] shrink-0 cursor-pointer border transition-colors ${
                        item.is_completed
                          ? 'bg-stone-800 border-stone-800 text-white dark:bg-stone-200 dark:text-stone-900 font-bold'
                          : 'border-stone-300 dark:border-stone-600 text-transparent hover:border-stone-400'
                      }`}
                    >
                      ✓
                    </button>
                    <input
                      type="text"
                      value={item.task}
                      onChange={(e) => handleSubtaskTextChange(idx, e.target.value)}
                      className={`flex-1 text-xs bg-transparent outline-none py-0.5 ${
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

            {/* Yeni Madde Ekle */}
            <div className="flex items-center gap-1.5">
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
                placeholder={language === 'tr' ? '+ Madde ekle...' : '+ Add item...'}
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-stone-400"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                disabled={!newSubtaskInput.trim()}
                className="px-3 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-xl hover:opacity-90 disabled:opacity-30 transition-all cursor-pointer flex items-center gap-1 shrink-0 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'tr' ? 'Ekle' : 'Add'}</span>
              </button>
            </div>
          </div>

          {/* Özel Not / Hatırlatıcı Açıklaması */}
          <div className="pt-1">
            <div className="relative">
              <textarea
                value={anomaliNotu}
                onChange={(e) => setAnomaliNotu(e.target.value)}
                rows={2}
                placeholder={language === 'tr' ? '💡 Eklemek istediğiniz kısa not veya detay...' : '💡 Short note or detail...'}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none resize-none focus:ring-1 focus:ring-stone-400"
              />
            </div>
          </div>
        </form>

        {/* Alt Butonlar */}
        <div className="flex items-center gap-2 p-3 sm:px-5 sm:py-3.5 border-t border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/70 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer text-center"
          >
            {language === 'tr' ? 'Vazgeç' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-2 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{language === 'tr' ? 'Kaydet' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
