import React, { useState, useMemo } from 'react';
import { detectDomainFromJargon } from '../utils/jargonRadar';
import { DOMAIN_REGISTRY } from '../types/adaptiveTheme';

export const DynamicInputBar: React.FC<{
  onSend: (text: string) => void;
  isListening: boolean;
  onToggleMic: () => void;
}> = ({ onSend, isListening, onToggleMic }) => {
  const [inputText, setInputText] = useState('');

  // 0 ms deterministik Jargon Radar taraması
  const radar = useMemo(() => detectDomainFromJargon(inputText), [inputText]);
  const currentDomain = radar.confidence >= 0.4 ? radar.detectedDomain : 'GENEL';
  const theme = DOMAIN_REGISTRY[currentDomain] || DOMAIN_REGISTRY.GENEL;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-lg p-2 rounded-2xl border shadow-lg backdrop-blur-md transition-colors duration-300 flex items-center gap-2 z-40 ${theme.bgCard}`}
    >
      {/* Mikrofon Butonu */}
      <button
        type="button"
        onClick={onToggleMic}
        className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg text-white transition-all ${
          isListening
            ? 'bg-rose-600 animate-pulse scale-105'
            : theme.btnPrimaryBg
        }`}
      >
        {isListening ? '⏹️' : '🎙️'}
      </button>

      {/* Canlı Metin Alanı */}
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && inputText.trim()) {
            onSend(inputText);
            setInputText('');
          }
        }}
        placeholder={
          isListening
            ? 'Dinleniyor... (Örn: UYAP tebligatı, motor arızası)'
            : 'Not al veya ses kaydet...'
        }
        className="flex-1 bg-transparent border-none text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none px-2"
      />

      {/* Canlı Jargon Radar Göstergesi */}
      {radar.confidence >= 0.4 && radar.matchedKeywords.length > 0 && (
        <span
          className={`hidden sm:flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap transition-all ${theme.badgeBg} ${theme.badgeText}`}
          title={radar.reason}
        >
          <span>{radar.suggestedIcon}</span>
          <span>{radar.matchedKeywords[0]}</span>
        </span>
      )}

      {/* Hızlı Gönder Butonu */}
      {inputText.trim().length > 0 && (
        <button
          type="button"
          onClick={() => {
            onSend(inputText);
            setInputText('');
          }}
          className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all ${theme.btnPrimaryBg} ${theme.btnPrimaryText}`}
        >
          Ekle
        </button>
      )}
    </div>
  );
};

