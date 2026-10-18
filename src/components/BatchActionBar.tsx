import React from 'react';
import type { SimpleCardItem } from '../App.tsx';

export interface BatchActionBarProps {
  isSelectMode: boolean;
  selectedCardIds: string[];
  filteredCards: SimpleCardItem[];
  language: 'tr' | 'en';
  t: {
    clearSelection: string;
    selectAll: string;
    selectedCount: string;
    cancelSelection: string;
    moveToTop: string;
    moveSelectedUp: string;
    moveUp: string;
    moveSelectedDown: string;
    moveDown: string;
    moveToBottom: string;
    deleteSelected: string;
    [key: string]: string;
  };
  onSelectAllToggle: () => void;
  onCancelSelection: () => void;
  onMoveSelected: (direction: 'top' | 'up' | 'down' | 'bottom') => void;
  onToggleCompleteSelected: () => void;
  onDeleteSelected: () => void;
}

export const BatchActionBar: React.FC<BatchActionBarProps> = ({
  isSelectMode,
  selectedCardIds,
  filteredCards,
  language,
  t,
  onSelectAllToggle,
  onCancelSelection,
  onMoveSelected,
  onToggleCompleteSelected,
  onDeleteSelected,
}) => {
  if (!isSelectMode) return null;

  return (
    <div className="sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-stone-900/95 dark:bg-stone-950/95 backdrop-blur-md text-white text-xs p-3 rounded-2xl mb-3 shadow-xl border border-stone-800 animate-in fade-in slide-in-from-top-1 duration-150">
      <div className="flex items-center justify-between sm:justify-start gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSelectAllToggle}
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
          onClick={onCancelSelection}
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
            onClick={() => onMoveSelected('top')}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-stone-100 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer active:scale-95"
            title={t.moveToTop}
          >
            <span>🔝</span>
            <span className="hidden xs:inline">{t.moveToTop}</span>
          </button>

          <button
            type="button"
            disabled={selectedCardIds.length === 0}
            onClick={() => onMoveSelected('up')}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-stone-100 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer active:scale-95"
            title={t.moveSelectedUp}
          >
            <span>⬆️</span>
            <span>{t.moveUp}</span>
          </button>

          <button
            type="button"
            disabled={selectedCardIds.length === 0}
            onClick={() => onMoveSelected('down')}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-stone-100 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer active:scale-95"
            title={t.moveSelectedDown}
          >
            <span>⬇️</span>
            <span>{t.moveDown}</span>
          </button>

          <button
            type="button"
            disabled={selectedCardIds.length === 0}
            onClick={() => onMoveSelected('bottom')}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-stone-100 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer active:scale-95"
            title={t.moveToBottom}
          >
            <span>🔚</span>
            <span className="hidden xs:inline">{t.moveToBottom}</span>
          </button>
        </div>

        {/* Toplu Tamamla Butonu */}
        <button
          type="button"
          disabled={selectedCardIds.length === 0}
          onClick={onToggleCompleteSelected}
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
            onClick={onDeleteSelected}
            className="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer active:scale-95 text-[11px]"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>{t.deleteSelected}</span>
          </button>

          <button
            type="button"
            onClick={onCancelSelection}
            className="hidden sm:inline-flex px-2.5 py-1.5 text-stone-300 hover:text-white rounded-xl hover:bg-stone-800 transition-colors cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
