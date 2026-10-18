import React from 'react';
import type { SimpleCardItem } from '../../App.tsx';

export interface DeleteConfirmModalProps {
  note: SimpleCardItem | null;
  language: 'tr' | 'en';
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  note,
  language,
  onClose,
  onConfirm,
}) => {
  if (!note) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
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
                {note.ikon || '📌'} {note.baslik}
              </span>
              {language === 'tr'
                ? ' başlıklı not geri dönüşüm kutusuna taşınacak ve 30 gün boyunca saklanacaktır.'
                : ' will be moved to the recycle bin and kept for 30 days.'}
            </p>
          </div>
        </div>

        {/* Butonlar */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center gap-2.5 sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-medium text-sm hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95 transition-all cursor-pointer text-center"
          >
            {language === 'tr' ? 'Vazgeç' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={() => {
              const idToDelete = note.id;
              onClose();
              onConfirm(idToDelete);
              if (typeof navigator !== 'undefined' && navigator.vibrate) {
                try {
                  navigator.vibrate([20, 50, 20]);
                } catch {}
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
  );
};
