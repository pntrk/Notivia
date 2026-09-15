import React, { useState } from 'react';
import { Clock, Copy, Check, Sparkles } from 'lucide-react';
import type { NotiviaSimpleNote } from '../types/notivia.ts';

interface SimpleCardVisualizerProps {
  note: NotiviaSimpleNote;
  onSwitchToJson?: () => void;
}

export const SimpleCardVisualizer: React.FC<SimpleCardVisualizerProps> = ({ note, onSwitchToJson }) => {
  const [copied, setCopied] = useState(false);

  const cleanJsonString = JSON.stringify(note, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(cleanJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="notivia-simple-card"
      className="w-full max-w-xl mx-auto rounded-2xl p-6 sm:p-7 border border-stone-300/80 shadow-sm transition-all duration-200"
      style={{ backgroundColor: note.renk || '#FEF3C7' }}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: Emoji and Content */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/90 shadow-2xs text-2xl border border-stone-200/60 select-none">
            {note.ikon || '📝'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-stone-700 bg-white/70 px-2 py-0.5 rounded-full border border-stone-200/50">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Sade Not
              </span>
            </div>
            <h3 id="simple-card-baslik" className="mt-1.5 text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              {note.baslik}
            </h3>

            {/* Zaman pill */}
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-stone-700 bg-white/80 w-fit px-2.5 py-1 rounded-lg border border-stone-200/60 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span id="simple-card-zaman">
                {note.zaman ? note.zaman : 'Zaman belirtilmedi'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Copy 4-field JSON */}
        <button
          type="button"
          id="btn-copy-simple-json"
          onClick={handleCopyJson}
          title="4 Alanlı Temiz JSON'u Kopyala"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-stone-800 text-xs font-semibold rounded-lg border border-stone-300 shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Kopyalandı!' : 'JSON'}</span>
        </button>
      </div>

      {/* Embedded Minimal JSON Box */}
      <div className="mt-4 pt-3.5 border-t border-stone-900/10">
        <div className="flex items-center justify-between text-[11px] font-mono text-stone-600 mb-1.5">
          <span>Temiz JSON Şeması (4 Alan)</span>
          <span className="font-semibold text-stone-800">{note.renk}</span>
        </div>
        <pre className="text-xs bg-stone-900 text-emerald-400 p-3 rounded-xl overflow-x-auto font-mono">
          <code>{cleanJsonString}</code>
        </pre>
      </div>
    </div>
  );
};
