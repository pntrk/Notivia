import React from 'react';

export interface DraftMessageModalProps {
  draftedMessage: {
    alici: string;
    kanal: 'whatsapp' | 'email' | 'sms' | string;
    konu?: string;
    metin: string;
  } | null;
  onClose: () => void;
  onCopySuccess: () => void;
  theme: 'light' | 'dark';
}

export const DraftMessageModal: React.FC<DraftMessageModalProps> = ({
  draftedMessage,
  onClose,
  onCopySuccess,
  theme,
}) => {
  if (!draftedMessage) return null;

  return (
    <div
      id="draft-message-modal"
      className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 ${theme === 'dark' ? 'dark' : ''}`}
    >
      <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
              ✉️ İletişim Taslağı ({draftedMessage.kanal.toUpperCase()})
            </span>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mt-1">
              Kime: {draftedMessage.alici}
            </h3>
            {draftedMessage.konu && (
              <p className="text-xs text-stone-500 dark:text-stone-400">Konu: {draftedMessage.konu}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-3 bg-stone-50 dark:bg-stone-800/80 rounded-xl border border-stone-200/80 dark:border-stone-700/80 text-sm text-stone-800 dark:text-stone-200 leading-relaxed select-all whitespace-pre-wrap">
          {draftedMessage.metin}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(draftedMessage.metin);
              onCopySuccess();
            }}
            className="flex-1 py-2 px-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl active:scale-95 transition-all text-center cursor-pointer"
          >
            📋 Metni Kopyala
          </button>

          {draftedMessage.kanal === 'email' ? (
            <a
              href={`mailto:?subject=${encodeURIComponent(draftedMessage.konu || 'Bilgilendirme')}&body=${encodeURIComponent(draftedMessage.metin)}`}
              className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl active:scale-95 transition-all text-center"
            >
              ✉️ E-postayı Aç
            </a>
          ) : (
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(draftedMessage.metin)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl active:scale-95 transition-all text-center"
            >
              🟢 WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
