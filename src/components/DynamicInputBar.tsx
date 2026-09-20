import React, { useState, useMemo, useRef, useEffect } from 'react';
import { detectIntentRoute, INSTANT_JARGON_CHIPS, type IntentRouteResult } from '../utils/interactiveIvr';
import { DOMAIN_REGISTRY, type ProfessionDomain } from '../types/domainThemes';

export interface DynamicInputBarProps {
  onSend: (text: string) => void;
  isListening: boolean;
  onToggleMic: () => void;
  activeDomain?: ProfessionDomain;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const DynamicInputBar: React.FC<DynamicInputBarProps> = ({
  onSend,
  isListening,
  onToggleMic,
  activeDomain,
  placeholder,
  className = '',
  autoFocus = false
}) => {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Canlı Niyet ve Kurum Rotası Tespiti (0 ms deterministik)
  const route: IntentRouteResult = useMemo(() => {
    return detectIntentRoute(inputText, activeDomain);
  }, [inputText, activeDomain]);

  // Seçili veya tespit edilen alana göre temayı belirle
  const currentDomain = (route.hasActiveMatch ? route.domain : activeDomain) || 'GENEL';
  const theme = DOMAIN_REGISTRY[currentDomain as ProfessionDomain] || DOMAIN_REGISTRY.GENEL;

  // Çipleri aktif alana göre sırala (Önce bu mesleğe ait çipler, ardından diğerleri)
  const sortedChips = useMemo(() => {
    if (!activeDomain || activeDomain === 'GENEL') {
      return INSTANT_JARGON_CHIPS;
    }
    const matching = INSTANT_JARGON_CHIPS.filter((c) => c.domain === activeDomain);
    const others = INSTANT_JARGON_CHIPS.filter((c) => c.domain !== activeDomain);
    return [...matching, ...others];
  }, [activeDomain]);

  const handleChipClick = (chipPrompt: string) => {
    setInputText(chipPrompt);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleQuickSubmit = () => {
    if (!inputText.trim()) return;
    onSend(inputText.trim());
    setInputText('');
  };

  return (
    <div className={`w-full max-w-2xl mx-auto flex flex-col gap-1.5 ${className}`}>
      {/* 1. Canlı Niyet Radar Barı (Live Intent Waveform) */}
      {route.hasActiveMatch && (
        <div
          className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border shadow-sm backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-1"
          style={{
            backgroundColor: `${route.color}25`,
            borderColor: `${route.color}60`
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            {/* Canlı Ekolayzer / Ses Dalgası Animasyonu */}
            <div className="flex items-end gap-0.5 h-3.5 px-0.5 shrink-0">
              <span className="w-1 bg-stone-800 dark:bg-stone-100 rounded-full animate-pulse h-2" style={{ animationDuration: '450ms' }} />
              <span className="w-1 bg-stone-800 dark:bg-stone-100 rounded-full animate-pulse h-3.5" style={{ animationDuration: '600ms', animationDelay: '150ms' }} />
              <span className="w-1 bg-stone-800 dark:bg-stone-100 rounded-full animate-pulse h-2.5" style={{ animationDuration: '500ms', animationDelay: '300ms' }} />
              <span className="w-1 bg-stone-800 dark:bg-stone-100 rounded-full animate-pulse h-3" style={{ animationDuration: '550ms', animationDelay: '75ms' }} />
            </div>

            <span className="text-base shrink-0">{route.icon}</span>

            <div className="min-w-0 flex items-center gap-1.5 truncate">
              <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 truncate">
                {route.domainLabel}:
              </span>
              <span className="text-[11px] font-semibold text-stone-800 dark:text-stone-200 truncate">
                {route.routeTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="hidden sm:inline-block text-[10px] font-medium text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-stone-900/70 px-2 py-0.5 rounded-full border border-black/5 dark:border-white/10 shadow-2xs">
              🏛️ {route.institution}
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-stone-900/10 dark:bg-white/10 text-stone-800 dark:text-stone-200">
              %{Math.round(route.confidence * 100)}
            </span>
          </div>
        </div>
      )}

      {/* 2. Kelimelik Akıllı Tamamlayıcı Çipler (Instant Jargon Chips) */}
      {(isFocused || inputText.length === 0) && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none -mx-1 px-1">
          <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider shrink-0 flex items-center gap-1 mr-0.5">
            <span>⚡</span>
            <span>Hızlı:</span>
          </span>
          {sortedChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(chip.prompt || chip.fullPrompt)}
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-all active:scale-95 shadow-2xs cursor-pointer"
            >
              <span>{chip.icon}</span>
              <span>{chip.chipText || chip.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* 3. Ana Giriş Kapsülü */}
      <div
        className={`w-full p-2 rounded-2xl border shadow-md backdrop-blur-md transition-all duration-200 flex items-center gap-2 ${
          isFocused ? 'ring-2 ring-stone-400 dark:ring-stone-600' : ''
        } ${theme.bgCard}`}
      >
        {/* Mikrofon Butonu */}
        <button
          type="button"
          onClick={onToggleMic}
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg text-white transition-all shrink-0 cursor-pointer ${
            isListening
              ? 'bg-rose-600 animate-pulse scale-105 shadow-md shadow-rose-600/30'
              : 'bg-stone-900 dark:bg-white dark:text-stone-900 hover:opacity-90'
          }`}
          title={isListening ? 'Kaydı Durdur' : 'Sesli Komut Ver'}
        >
          {isListening ? '⏹️' : '🎙️'}
        </button>

        {/* Canlı Metin Alanı */}
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          autoFocus={autoFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Küçük gecikme ile buton tıklamasını yakalamak için
            setTimeout(() => setIsFocused(false), 200);
          }}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputText.trim()) {
              e.preventDefault();
              handleQuickSubmit();
            }
          }}
          placeholder={
            placeholder ||
            (isListening
              ? 'Dinleniyor... (Örn: Kuduz titrasyon, tebligat geldi, küp kırımı)'
              : 'Not yaz veya 2 kelimelik komut söyle...')
          }
          className="flex-1 bg-transparent border-none text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none px-2 min-w-0"
        />

        {/* Canlı Niyet Rozeti (Kompakt görünüm) */}
        {route.hasActiveMatch && !inputText.trim().length && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-stone-700 dark:text-stone-300 shrink-0">
            <span>{route.icon}</span>
            <span>{route.routeTitle}</span>
          </span>
        )}

        {/* Temizle Butonu */}
        {inputText.length > 0 && (
          <button
            type="button"
            onClick={() => setInputText('')}
            className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs shrink-0 cursor-pointer"
            title="Temizle"
          >
            ✕
          </button>
        )}

        {/* Gönder Butonu */}
        {inputText.trim().length > 0 && (
          <button
            type="button"
            onClick={handleQuickSubmit}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:opacity-90 active:scale-95 transition-all shrink-0 cursor-pointer shadow-xs"
          >
            Ekle
          </button>
        )}
      </div>
    </div>
  );
};
