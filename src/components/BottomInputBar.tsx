import React, { useRef } from 'react';
import { Mic } from 'lucide-react';
import type { IntentRouteResult } from '../utils/interactiveIvr.ts';

export interface InstantJargonChip {
  icon: string;
  label?: string;
  chipText?: string;
  prompt?: string;
  fullPrompt?: string;
}

export interface BottomInputBarProps {
  theme: 'light' | 'dark';
  language: 'tr' | 'en';
  statusText: string;
  isListening: boolean;
  liveSpeechTranscript: string;
  pendingImage: string | null;
  showTextInput: boolean;
  textInput: string;
  liveIntentRoute: IntentRouteResult;
  sortedInstantJargonChips: InstantJargonChip[];
  t: {
    cameraTitle: string;
    keyboardToggleTitle: string;
    addButton: string;
    [key: string]: string;
  };
  onMicClick: () => void;
  onToggleTextInput: () => void;
  onTextInputChange: (text: string) => void;
  onTextSubmit: (e?: React.FormEvent) => void;
  onCloseTextInput: () => void;
  onCameraChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onViewPendingImage: (img: string) => void;
  onDiagnosePendingImage: () => void;
  onCancelPendingImage: () => void;
}

export const BottomInputBar: React.FC<BottomInputBarProps> = ({
  theme,
  language,
  statusText,
  isListening,
  liveSpeechTranscript,
  pendingImage,
  showTextInput,
  textInput,
  liveIntentRoute,
  sortedInstantJargonChips,
  t,
  onMicClick,
  onToggleTextInput,
  onTextInputChange,
  onTextSubmit,
  onCloseTextInput,
  onCameraChange,
  onViewPendingImage,
  onDiagnosePendingImage,
  onCancelPendingImage,
}) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const manualTextInputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <footer
      className={`shrink-0 z-20 w-full px-4 pt-3 android-footer-safe flex flex-col items-center border-t backdrop-blur-md transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-stone-900/95 border-stone-800 text-stone-100 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white/95 border-stone-200/80 text-stone-900 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]'
      }`}
      style={{
        paddingBottom: 'max(1.75rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))',
      }}
    >
      {/* Bekleyen Görsel Önizleme Kartı */}
      {pendingImage && (
        <div
          id="pending-image-card"
          className="w-full mb-3 p-2.5 bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/80 rounded-2xl flex items-center justify-between gap-3 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={pendingImage}
              alt={language === 'en' ? 'Preview' : 'Önizleme'}
              onClick={() => onViewPendingImage(pendingImage)}
              className="w-12 h-12 rounded-xl object-cover border border-amber-300 dark:border-amber-700 shrink-0 cursor-pointer shadow-xs active:scale-95"
              title={language === 'en' ? 'Click to enlarge' : 'Büyütmek için tıkla'}
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-amber-950 dark:text-amber-100 truncate flex items-center gap-1">
                <span>📷</span> <span>{language === 'en' ? 'Image Uploaded' : 'Görsel Yüklendi'}</span>
              </p>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 truncate">
                {language === 'en' ? 'Explain by voice or analyze directly' : 'İster sesle anlat, ister hemen teşhis et'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              id="diagnose-pending-image-btn"
              onClick={onDiagnosePendingImage}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>✨ {language === 'en' ? 'Analyze' : 'Teşhis Et'}</span>
            </button>
            <button
              type="button"
              onClick={onCancelPendingImage}
              className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg cursor-pointer text-sm"
              title={language === 'en' ? 'Cancel Image' : 'Görseli İptal Et'}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Tek ve Bütünleşik Metin/Görev Giriş Formu */}
      {showTextInput && (
        <form
          id="text-input-form"
          onSubmit={onTextSubmit}
          className={`w-full mb-3 p-3 rounded-2xl border shadow-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${
            theme === 'dark'
              ? 'bg-stone-900/95 border-stone-700 text-stone-100'
              : 'bg-white border-stone-200 text-stone-900'
          }`}
        >
          {/* Canlı Niyet Radar Barı */}
          {liveIntentRoute.hasActiveMatch && (
            <div
              className="mb-2 px-3 py-1.5 rounded-xl border flex items-center justify-between gap-2 shadow-xs transition-all animate-in fade-in duration-200"
              style={{
                backgroundColor: `${liveIntentRoute.color}20`,
                borderColor: `${liveIntentRoute.color}60`,
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-end gap-0.5 h-3 px-0.5 shrink-0">
                  <span className="w-1 bg-stone-800 dark:bg-stone-200 rounded-full animate-pulse h-2" style={{ animationDuration: '400ms' }} />
                  <span className="w-1 bg-stone-800 dark:bg-stone-200 rounded-full animate-pulse h-3" style={{ animationDuration: '600ms', animationDelay: '150ms' }} />
                  <span className="w-1 bg-stone-800 dark:bg-stone-200 rounded-full animate-pulse h-2" style={{ animationDuration: '450ms', animationDelay: '300ms' }} />
                </div>
                <span className="text-base shrink-0">{liveIntentRoute.icon}</span>
                <div className="min-w-0 flex items-center gap-1.5 truncate">
                  <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 truncate">
                    {liveIntentRoute.domainLabel}:
                  </span>
                  <span className="text-[11px] font-medium text-stone-700 dark:text-stone-300 truncate">
                    {liveIntentRoute.routeTitle}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="hidden sm:inline-block text-[9.5px] font-medium bg-white/80 dark:bg-stone-800/80 px-2 py-0.5 rounded-full border border-black/5 dark:border-white/10 text-stone-600 dark:text-stone-300">
                  🏛️ {liveIntentRoute.institution}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-stone-900/10 dark:bg-white/10 text-stone-800 dark:text-stone-200">
                  %{Math.round(liveIntentRoute.confidence * 100)}
                </span>
              </div>
            </div>
          )}

          {/* 2 Kelimelik Akıllı Tamamlayıcı Çipler */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 mb-2 scrollbar-none -mx-1 px-1">
            <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider shrink-0 flex items-center gap-1 mr-0.5">
              <span>⚡</span>
              <span>{language === 'en' ? 'Quick:' : 'Hızlı:'}</span>
            </span>
            {sortedInstantJargonChips.slice(0, 8).map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onTextInputChange(chip.fullPrompt || chip.prompt || chip.label || '');
                  setTimeout(() => manualTextInputRef.current?.focus(), 50);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-all active:scale-95 shadow-2xs cursor-pointer"
              >
                <span>{chip.icon}</span>
                <span>{chip.label || chip.chipText}</span>
              </button>
            ))}
          </div>

          <textarea
            id="manual-text-input"
            ref={manualTextInputRef}
            value={textInput}
            onChange={(e) => onTextInputChange(e.target.value)}
            placeholder={
              language === 'tr'
                ? 'Notunuzu yazın veya maddeleri alt alta ekleyin...\n(Shift+Enter ile alt satır, Enter veya Ekle butonu ile kaydet)'
                : 'Write your note or list items line by line...\n(Shift+Enter for new line, Enter or Add to save)'
            }
            rows={2}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onTextSubmit(e);
              }
            }}
            className="w-full bg-transparent text-sm outline-none resize-none placeholder-stone-400 dark:placeholder-stone-500 leading-relaxed min-h-[48px] max-h-[120px]"
          />
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/80 mt-1">
            <span className="text-[11px] text-stone-400 dark:text-stone-500">
              {textInput.includes('\n') 
                ? (language === 'tr' ? '📋 Görev Listesi olarak kaydedilecek' : '📋 Will save as Task List') 
                : (language === 'tr' ? '💡 Çoklu madde için satır başı yapın' : '💡 Use new lines for checklist')}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onCloseTextInput}
                className="px-2.5 py-1 text-xs text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                {language === 'tr' ? 'Kapat' : 'Close'}
              </button>
              <button
                type="submit"
                disabled={!textInput.trim() && !pendingImage}
                className="px-3.5 py-1.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl active:scale-95 disabled:opacity-40 transition-all shrink-0 cursor-pointer shadow-xs"
              >
                {textInput.includes('\n')
                  ? (language === 'tr' ? 'Listeyi Kaydet' : 'Save List')
                  : t.addButton}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Mikrofon açıkken Canlı Niyet Radar Barı */}
      {isListening && liveIntentRoute.hasActiveMatch && (
        <div
          className="mb-2 px-3 py-1.5 rounded-2xl border flex items-center justify-between gap-2 shadow-sm backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-1 max-w-lg mx-auto w-full"
          style={{
            backgroundColor: `${liveIntentRoute.color}25`,
            borderColor: `${liveIntentRoute.color}70`,
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-end gap-0.5 h-3.5 px-0.5 shrink-0">
              <span className="w-1 bg-red-600 dark:bg-red-400 rounded-full animate-pulse h-2" style={{ animationDuration: '400ms' }} />
              <span className="w-1 bg-red-600 dark:bg-red-400 rounded-full animate-pulse h-3.5" style={{ animationDuration: '550ms', animationDelay: '120ms' }} />
              <span className="w-1 bg-red-600 dark:bg-red-400 rounded-full animate-pulse h-2.5" style={{ animationDuration: '480ms', animationDelay: '250ms' }} />
              <span className="w-1 bg-red-600 dark:bg-red-400 rounded-full animate-pulse h-3" style={{ animationDuration: '520ms', animationDelay: '60ms' }} />
            </div>
            <span className="text-base shrink-0">{liveIntentRoute.icon}</span>
            <div className="min-w-0 flex items-center gap-1.5 truncate">
              <span className="text-[11.5px] font-bold text-stone-900 dark:text-stone-100 truncate">
                {liveIntentRoute.domainLabel}:
              </span>
              <span className="text-[11.5px] font-semibold text-stone-800 dark:text-stone-200 truncate">
                {liveIntentRoute.routeTitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-medium text-stone-700 dark:text-stone-300 bg-white/80 dark:bg-stone-900/80 px-2 py-0.5 rounded-full border border-black/5 dark:border-white/10 shadow-2xs">
              🏛️ {liveIntentRoute.institution}
            </span>
          </div>
        </div>
      )}

      {/* Sesli Asistan Durum ve Dalga Göstergesi */}
      {isListening ? (
        <div className="mb-3 px-3.5 py-1.5 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/80 rounded-full flex items-center gap-2.5 shadow-sm animate-in fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-tight">
            {liveSpeechTranscript ? `"${liveSpeechTranscript}"` : (statusText || 'Dinliyorum...')}
          </span>
          <div className="flex items-center gap-0.5 ml-1">
            <span className="w-0.5 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: '600ms', animationDelay: '0ms' }} />
            <span className="w-0.5 h-3.5 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: '600ms', animationDelay: '150ms' }} />
            <span className="w-0.5 h-2.5 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: '600ms', animationDelay: '300ms' }} />
            <span className="w-0.5 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: '600ms', animationDelay: '75ms' }} />
          </div>
        </div>
      ) : statusText && statusText !== 'Söyle, çek ya da yaz' ? (
        <div className="mb-2 px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[11px] font-medium rounded-full border border-stone-200 dark:border-stone-700 shadow-2xs animate-in fade-in duration-200 max-w-[280px] truncate text-center">
          {statusText}
        </div>
      ) : null}

      <div className="flex items-center justify-center gap-5 sm:gap-6 py-1 z-10 w-full max-w-xs mx-auto">
        {/* Kamera Butonu */}
        <label
          htmlFor="camera-input"
          className={`w-12 h-12 border rounded-full flex items-center justify-center shadow-xs active:scale-90 transition-all cursor-pointer touch-manipulation select-none shrink-0 ${
            theme === 'dark'
              ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700 active:bg-stone-600'
              : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200/80 active:bg-stone-300'
          }`}
          title={t.cameraTitle}
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
          onChange={onCameraChange}
        />

        {/* Ana Mikrofon Butonu */}
        <div className="relative flex items-center justify-center shrink-0">
          {isListening && (
            <>
              <span className="absolute -inset-2.5 rounded-full bg-red-400/30 animate-ping pointer-events-none" />
              <span className="absolute -inset-1 rounded-full bg-red-500/20 animate-pulse pointer-events-none" />
            </>
          )}
          <button
            id="mic-btn"
            type="button"
            onClick={onMicClick}
            className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all duration-200 cursor-pointer touch-manipulation select-none ${
              isListening
                ? 'bg-red-500 scale-105 text-white shadow-red-500/30 ring-4 ring-red-400/20'
                : theme === 'dark'
                ? 'bg-white text-stone-900 hover:bg-stone-100 shadow-stone-950/40'
                : 'bg-stone-900 text-white hover:bg-stone-800 shadow-stone-900/30'
            }`}
          >
            <Mic id="mic-icon" className="w-7 h-7" />
          </button>
        </div>

        {/* Klavye Toggle Butonu */}
        <button
          id="keyboard-toggle-btn"
          type="button"
          onClick={onToggleTextInput}
          title={t.keyboardToggleTitle}
          className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-xs active:scale-90 transition-all cursor-pointer touch-manipulation select-none shrink-0 ${
            showTextInput
              ? theme === 'dark'
                ? 'bg-white text-stone-900 border-white'
                : 'bg-stone-800 text-white border-stone-800'
              : theme === 'dark'
              ? 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700'
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
  );
};
