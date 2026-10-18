import React from 'react';
import type { SimpleCardItem } from '../../App.tsx';

export interface CalendarQueryResults {
  sorgu_tipi: string;
  matchingCount: number;
  matchingNotes: SimpleCardItem[];
}

export interface CalendarEventsModalProps {
  calendarQueryResults: CalendarQueryResults | null;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export const CalendarEventsModal: React.FC<CalendarEventsModalProps> = ({
  calendarQueryResults,
  onClose,
  theme,
}) => {
  if (!calendarQueryResults) return null;

  return (
    <div
      id="calendar-query-modal"
      className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 ${theme === 'dark' ? 'dark' : ''}`}
    >
      <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
              🗓️ Ajanda Taraması
            </span>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mt-1">
              {calendarQueryResults.sorgu_tipi === 'bugun'
                ? 'Bugünkü Programınız'
                : calendarQueryResults.sorgu_tipi === 'yarin'
                ? 'Yarınki Randevularınız'
                : 'Takvim Planlarınız'}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {calendarQueryResults.matchingCount === 0
                ? 'Belirtilen zaman aralığında kayıtlı plan bulunamadı.'
                : `Toplam ${calendarQueryResults.matchingCount} kayıt tespit edildi:`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {calendarQueryResults.matchingCount > 0 ? (
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {calendarQueryResults.matchingNotes.map((note) => (
              <div
                key={note.id}
                className="p-2.5 rounded-xl border border-stone-200/80 dark:border-stone-700/80 bg-stone-50 dark:bg-stone-800/60 flex items-center gap-3"
              >
                <span className="text-xl shrink-0">{note.ikon || '📌'}</span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                    {note.baslik}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    {note.zaman || 'Saat belirtilmemiş'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-500">
            Bu zaman aralığı için ajandanız tamamen boş.
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl active:scale-95 transition-all cursor-pointer"
        >
          Tamam
        </button>
      </div>
    </div>
  );
};
