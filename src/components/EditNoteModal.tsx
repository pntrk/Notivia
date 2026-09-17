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
  Sparkles,
  Layers,
} from 'lucide-react';
import type { SimpleCardItem } from '../App.tsx';

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: SimpleCardItem | null;
  onSave: (updatedNote: SimpleCardItem) => Promise<void> | void;
  language?: 'tr' | 'en';
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
    }
  }, [note, isOpen]);

  if (!isOpen || !note) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Üst Başlık & Kapatma */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl select-none">{ikon}</span>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
              {language === 'tr' ? 'Not Kartını Düzenle' : 'Edit Note Card'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Alanı */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Başlık Girişi */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              {language === 'tr' ? 'Kart Başlığı / Eylem' : 'Card Title / Action'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={baslik}
              onChange={(e) => setBaslik(e.target.value)}
              placeholder={language === 'tr' ? 'Not veya görev başlığı...' : 'Note or task title...'}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-500 transition-all font-medium"
            />
          </div>

          {/* İkon Seçici */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-stone-400" />
              <span>{language === 'tr' ? 'Simge / İkon' : 'Icon / Emoji'}</span>
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIkon(emoji)}
                  className={`w-8 h-8 shrink-0 rounded-lg text-lg flex items-center justify-center transition-all cursor-pointer ${
                    ikon === emoji
                      ? 'bg-stone-900 text-white dark:bg-white scale-110 shadow-sm'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Kart Pastel Rengi */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-stone-400" />
              <span>{language === 'tr' ? 'Kart Rengi' : 'Card Color'}</span>
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {PASTEL_COLORS.map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => setRenk(col.hex)}
                  className={`w-7 h-7 rounded-full border border-black/10 transition-all flex items-center justify-center cursor-pointer ${
                    renk.toLowerCase() === col.hex.toLowerCase()
                      ? 'ring-2 ring-stone-900 dark:ring-white scale-110 shadow-sm'
                      : 'hover:scale-105'
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

          {/* Tarih ve Zaman / Hatırlatıcı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{language === 'tr' ? 'Hatırlatıcı Tarih & Saat' : 'Reminder Date & Time'}</span>
              </label>
              <input
                type="datetime-local"
                value={tarihIso}
                onChange={(e) => setTarihIso(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{language === 'tr' ? 'Zaman Etiketi' : 'Time Label'}</span>
              </label>
              <input
                type="text"
                value={zaman}
                onChange={(e) => setZaman(e.target.value)}
                placeholder={language === 'tr' ? 'Örn: Yarın 14:00, 3 Gün Sonra' : 'e.g. Tomorrow 14:00'}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>
          </div>

          {/* Bildirim Aç/Kapat */}
          {tarihIso && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 dark:text-amber-200">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="font-medium">
                  {language === 'tr' ? 'Zamanı geldiğinde cihazda sesli alarm çal' : 'Play audio alarm when time comes'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={deviceNotificationEnabled}
                onChange={(e) => setDeviceNotificationEnabled(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
              />
            </div>
          )}

          {/* Tiklenebilir Alt Görevler (action_items) */}
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-stone-400" />
                <span>{language === 'tr' ? 'Tiklenebilir Alt Görevler / Maddeler' : 'Subtasks / Checklist'}</span>
                <span className="text-[10px] font-normal text-stone-400">({actionItems.length})</span>
              </label>
            </div>

            {/* Mevcut Maddeler */}
            {actionItems.length > 0 && (
              <div className="space-y-1.5 mb-3 max-h-48 overflow-y-auto pr-1">
                {actionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 group"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleSubtask(idx)}
                      className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 cursor-pointer border transition-colors ${
                        item.is_completed
                          ? 'bg-stone-800 border-stone-800 text-white dark:bg-stone-200 dark:text-stone-900'
                          : 'border-stone-300 dark:border-stone-600 text-transparent hover:border-stone-400'
                      }`}
                      title={item.is_completed ? 'Tamamlanmadı yap' : 'Tamamla'}
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
                      className="text-stone-400 hover:text-red-500 p-1 rounded opacity-60 group-hover:opacity-100 transition-all cursor-pointer"
                      title="Maddeyi Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Yeni Madde Ekleme Kutusu */}
            <div className="flex items-center gap-2">
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
                placeholder={language === 'tr' ? '+ Yeni görev veya alt madde yazın...' : '+ Add new subtask...'}
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-stone-400"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                disabled={!newSubtaskInput.trim()}
                className="px-3 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-xl hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'tr' ? 'Ekle' : 'Add'}</span>
              </button>
            </div>
          </div>

          {/* Anomali / Operasyonel Not */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'tr' ? 'Teknik Uyarı / Anomali Notu' : 'Operational Note / Warning'}</span>
            </label>
            <textarea
              value={anomaliNotu}
              onChange={(e) => setAnomaliNotu(e.target.value)}
              rows={2}
              placeholder={language === 'tr' ? 'Opsiyonel teknik not, risk veya botanik/tıbbi tüyo...' : 'Optional notes, warnings...'}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none resize-none focus:ring-1 focus:ring-stone-400"
            />
          </div>
        </form>

        {/* Alt Butonlar */}
        <div className="flex items-center justify-end gap-2.5 px-5 py-3.5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {language === 'tr' ? 'İptal' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{language === 'tr' ? 'Değişiklikleri Kaydet' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
