import React, { useState, useMemo } from 'react';
import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';
import type { TrashNoteItem } from '../types/notivia';

export const RETENTION_DAYS = 30;
export const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;

export function calculateDaysRemaining(deletedAtIso: string): number {
  const deletedTime = new Date(deletedAtIso).getTime();
  if (isNaN(deletedTime)) return RETENTION_DAYS;
  const elapsedMs = Date.now() - deletedTime;
  const remainingMs = RETENTION_MS - elapsedMs;
  const days = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

function formatDeletedDate(deletedAtIso: string, lang: Language): string {
  try {
    const d = new Date(deletedAtIso);
    return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

interface RecycleBinModalProps {
  isOpen: boolean;
  onClose: () => void;
  trashItems: TrashNoteItem[];
  onRestoreItem: (cardId: string) => void;
  onPermanentDeleteItem: (cardId: string) => void;
  onRestoreAll: () => void;
  onEmptyTrash: () => void;
  theme: 'light' | 'dark';
  language: Language;
}

export const RecycleBinModal: React.FC<RecycleBinModalProps> = ({
  isOpen,
  onClose,
  trashItems,
  onRestoreItem,
  onPermanentDeleteItem,
  onRestoreAll,
  onEmptyTrash,
  theme,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmEmpty, setConfirmEmpty] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const t = translations[language];
  const isDark = theme === 'dark';

  const filteredTrash = useMemo(() => {
    if (!searchQuery.trim()) return trashItems;
    const q = searchQuery.toLowerCase();
    return trashItems.filter((tItem) => {
      const item = tItem.item;
      return (
        item.baslik.toLowerCase().includes(q) ||
        (item.zaman && item.zaman.toLowerCase().includes(q)) ||
        (item.ikon && item.ikon.toLowerCase().includes(q)) ||
        (item.anomali_notu && item.anomali_notu.toLowerCase().includes(q)) ||
        (item.teshis_notu && item.teshis_notu.toLowerCase().includes(q))
      );
    });
  }, [trashItems, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      id="recycle-bin-backdrop"
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 ${
        isDark ? 'dark' : ''
      }`}
      onClick={onClose}
    >
      <div
        id="recycle-bin-modal"
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border overflow-hidden px-4 pt-3 pb-6 sm:p-5 transition-colors max-h-[92dvh] sm:max-h-[90vh] flex flex-col overscroll-contain ${
          isDark
            ? 'bg-stone-900 border-stone-800 text-stone-100'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobil Çekme Tutamacı */}
        <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700 mx-auto mb-3.5 sm:hidden shrink-0" />

        {/* Başlık ve Kapatma */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-stone-200 dark:border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-400/15 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg shrink-0">
              🗑️
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight truncate">
                  {t.recycleBinTitle}
                </h2>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                  {trashItems.length}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 truncate">
                {language === 'tr' ? '30 gün saklama süresi' : '30-day retention period'}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="close-recycle-bin-btn"
            onClick={onClose}
            aria-label={t.close}
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors cursor-pointer active:scale-95 shrink-0 ${
              isDark
                ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800 active:bg-stone-800'
                : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100 active:bg-stone-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 30 Günlük Saklama Bilgilendirme Kutusu */}
        <div className="mb-3 px-3 py-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5 shrink-0">
          <span className="text-base shrink-0 leading-none">⏳</span>
          <p className="leading-relaxed">
            {t.recycleBinDesc}
          </p>
        </div>

        {/* Çoklu Aksiyon Çubuğu (Tümünü Geri Yükle & Çöpü Boşalt) */}
        {trashItems.length > 0 && (
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-100 dark:border-stone-800/80 shrink-0">
            <button
              type="button"
              id="restore-all-trash-btn"
              onClick={onRestoreAll}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer min-h-[36px]"
            >
              <span>↩️</span>
              <span>{t.restoreAll}</span>
            </button>

            {confirmEmpty ? (
              <div className="flex items-center gap-1.5 animate-in fade-in duration-150">
                <span className="text-[11px] font-medium text-red-500 dark:text-red-400 hidden sm:inline">
                  {language === 'tr' ? 'Emin misiniz?' : 'Are you sure?'}
                </span>
                <button
                  type="button"
                  id="confirm-empty-trash-btn"
                  onClick={() => {
                    onEmptyTrash();
                    setConfirmEmpty(false);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold shadow-2xs active:scale-95 transition-all cursor-pointer min-h-[36px]"
                >
                  {language === 'tr' ? 'Evet, Boşalt' : 'Yes, Empty'}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmEmpty(false)}
                  className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95 transition-all cursor-pointer min-h-[36px]"
                >
                  {t.cancel}
                </button>
              </div>
            ) : (
              <button
                type="button"
                id="empty-trash-btn"
                onClick={() => setConfirmEmpty(true)}
                className="px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 active:bg-red-100 text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer min-h-[36px]"
              >
                <span>🗑️</span>
                <span>{t.emptyTrash}</span>
              </button>
            )}
          </div>
        )}

        {/* Arama Alanı (Not sayısı 3'ten fazlaysa gösterilir) */}
        {trashItems.length >= 3 && (
          <div className="mb-3 shrink-0">
            <div className="relative">
              <input
                type="text"
                id="trash-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full px-3 py-2 pl-9 text-xs rounded-xl border transition-all outline-hidden ${
                  isDark
                    ? 'bg-stone-800 border-stone-700 text-stone-100 placeholder-stone-500 focus:border-amber-400'
                    : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-amber-500'
                }`}
              />
              <span className="absolute left-3 top-2.5 text-stone-400 text-xs">🔍</span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs p-0.5"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Silinen Notlar Listesi */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5 overscroll-contain">
          {trashItems.length === 0 ? (
            <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 flex items-center justify-center text-3xl mb-3 shadow-inner">
                ♻️
              </div>
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-1">
                {t.trashEmpty}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs leading-relaxed">
                {t.trashEmptyDesc}
              </p>
            </div>
          ) : filteredTrash.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500 dark:text-stone-400">
              {t.noSearchResults}
            </div>
          ) : (
            filteredTrash.map((trashItem) => {
              const item = trashItem.item;
              const daysLeft = calculateDaysRemaining(trashItem.deletedAt);
              const isUrgent = daysLeft <= 3;
              const isConfirmingDelete = confirmDeleteId === item.id;
              const deletedDateStr = formatDeletedDate(trashItem.deletedAt, language);

              return (
                <div
                  key={item.id}
                  id={`trash-item-${item.id}`}
                  className={`p-3 sm:p-3.5 rounded-xl border transition-all flex flex-col gap-2.5 ${
                    isDark
                      ? 'bg-stone-800/80 border-stone-700/70 hover:border-stone-600'
                      : 'bg-stone-50/90 border-stone-200 hover:border-stone-300 shadow-2xs'
                  }`}
                >
                  {/* Üst Kısım: İkon, Başlık, Kalan Süre Rozeti */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <span className="text-xl sm:text-2xl shrink-0 mt-0.5">
                        {item.ikon || '📌'}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug line-clamp-2">
                          {item.baslik}
                        </h4>

                        {/* Zaman veya Ek Not */}
                        {item.zaman && (
                          <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                            <span>🕒</span>
                            <span className="truncate">{item.zaman}</span>
                          </div>
                        )}

                        {/* Alt Görev Sayısı Varsa */}
                        {item.action_items && item.action_items.length > 0 && (
                          <div className="text-[10px] font-medium text-stone-500 dark:text-stone-400 mt-1 flex items-center gap-1">
                            <span>📋</span>
                            <span>
                              {item.action_items.length}{' '}
                              {language === 'tr' ? 'alt görev' : 'subtasks'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Kalan Gün Rozeti */}
                    <div className="flex flex-col items-end shrink-0 gap-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-tight ${
                          daysLeft === 0
                            ? 'bg-red-500/15 border-red-500/30 text-red-600 dark:text-red-400'
                            : isUrgent
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300'
                            : 'bg-stone-200/80 dark:bg-stone-700 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {daysLeft === 0
                          ? t.trashExpiringToday
                          : `${daysLeft} ${t.trashDaysRemaining}`}
                      </span>
                      {deletedDateStr && (
                        <span className="text-[9px] text-stone-400 dark:text-stone-500 font-mono">
                          {language === 'tr' ? `Silindi: ${deletedDateStr}` : `Deleted: ${deletedDateStr}`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Alt Kısım: Eylem Butonları (Geri Yükle & Kalıcı Olarak Sil) */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-stone-200/60 dark:border-stone-700/60">
                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-1.5 animate-in fade-in duration-150">
                        <span className="text-[11px] text-red-500 font-medium">
                          {language === 'tr' ? 'Kalıcı silinsin mi?' : 'Permanently delete?'}
                        </span>
                        <button
                          type="button"
                          id={`confirm-permanent-delete-${item.id}`}
                          onClick={() => {
                            onPermanentDeleteItem(item.id);
                            setConfirmDeleteId(null);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold cursor-pointer active:scale-95 transition-all min-h-[32px]"
                        >
                          {language === 'tr' ? 'Evet, Sil' : 'Delete'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-1 rounded-lg border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-700 cursor-pointer active:scale-95 transition-all min-h-[32px]"
                        >
                          {t.cancel}
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Kalıcı Olarak Sil */}
                        <button
                          type="button"
                          id={`trash-permanent-delete-${item.id}`}
                          onClick={() => setConfirmDeleteId(item.id)}
                          className="px-2.5 py-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-500/10 active:bg-red-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer active:scale-95 transition-all min-h-[36px]"
                          title={t.deleteForever}
                        >
                          <span>🗑️</span>
                          <span className="text-[11px]">{t.deleteForever}</span>
                        </button>

                        {/* Geri Yükle (Restore) */}
                        <button
                          type="button"
                          id={`trash-restore-${item.id}`}
                          onClick={() => onRestoreItem(item.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-all min-h-[36px]"
                          title={t.restore}
                        >
                          <span>↩️</span>
                          <span>{t.restore}</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
