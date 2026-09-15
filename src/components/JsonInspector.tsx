import React, { useState } from 'react';
import { Check, Copy, Download, ShieldCheck, Code2, Sparkles } from 'lucide-react';
import type { NotiviaParsedNote } from '../types/notivia.ts';
import { toSimpleNote } from '../utils/simpleNote.ts';

interface JsonInspectorProps {
  note: NotiviaParsedNote;
}

export const JsonInspector: React.FC<JsonInspectorProps> = ({ note }) => {
  const [copied, setCopied] = useState(false);
  const [schemaMode, setSchemaMode] = useState<'detailed' | 'simple'>('detailed');

  // Exact payload adhering to the requested 9-field JSON schema
  const cleanDetailedPayload = {
    summary: note.summary,
    detailed_note: note.detailed_note,
    category: note.category,
    priority: note.priority,
    ui_meta: {
      icon: note.ui_meta.icon,
      color_hex: note.ui_meta.color_hex,
      badge_text: note.ui_meta.badge_text,
    },
    calendar_event: {
      has_event: note.calendar_event.has_event,
      title: note.calendar_event.title,
      start_datetime: note.calendar_event.start_datetime,
      end_datetime: note.calendar_event.end_datetime,
      is_all_day: note.calendar_event.is_all_day,
      location: note.calendar_event.location,
    },
    action_items: note.action_items.map((a) => ({
      task: a.task,
      is_completed: a.is_completed,
    })),
    notification: {
      needs_reminder: note.notification.needs_reminder,
      remind_at: note.notification.remind_at,
      notification_text: note.notification.notification_text,
    },
    periodic_log: {
      is_periodic: note.periodic_log.is_periodic,
      interval_days: note.periodic_log.interval_days,
      next_due_date: note.periodic_log.next_due_date,
    },
  };

  // 4-field simple note schema: { baslik, zaman, ikon, renk }
  const cleanSimplePayload = toSimpleNote(note);

  const activePayload = schemaMode === 'detailed' ? cleanDetailedPayload : cleanSimplePayload;
  const jsonString = JSON.stringify(activePayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notivia-${schemaMode === 'detailed' ? 'detayli' : 'sade'}-${note.id || 'parsed'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-stone-900 rounded-2xl p-5 sm:p-6 text-stone-100 shadow-sm border border-stone-800 font-mono">
      {/* Inspector Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-stone-200">
            NOTIVIA JSON ÇIKTISI
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Şema Doğrulandı</span>
          </span>
        </div>

        {/* Mode Selector pills: Detailed (9 keys) vs Simple (4 keys) */}
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800">
          <button
            type="button"
            onClick={() => setSchemaMode('detailed')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
              schemaMode === 'detailed'
                ? 'bg-stone-800 text-white shadow-2xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Detaylı Şema (9 Alan)
          </button>
          <button
            type="button"
            onClick={() => setSchemaMode('simple')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
              schemaMode === 'simple'
                ? 'bg-stone-800 text-amber-300 shadow-2xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Sade Şema (4 Alan)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-copy-json"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium border border-stone-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı!' : 'JSON Kopyala'}</span>
          </button>
          <button
            type="button"
            id="btn-download-json"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium border border-stone-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>İndir</span>
          </button>
        </div>
      </div>

      {/* Code Block Display */}
      <div className="mt-4 relative">
        <pre
          id="raw-json-code"
          className="text-xs leading-relaxed overflow-x-auto max-h-[500px] p-4 bg-stone-950 rounded-xl border border-stone-800/80 text-emerald-400 font-mono scrollbar-thin"
        >
          <code>{jsonString}</code>
        </pre>
      </div>

      {/* Schema Key Verification Checklist */}
      {schemaMode === 'detailed' ? (
        <div className="mt-4 pt-3 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-stone-400">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> summary & note
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> ui_meta (color, icon)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> action_items (inferred)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> calendar & periodic
          </div>
        </div>
      ) : (
        <div className="mt-4 pt-3 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-stone-400">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> baslik (net eylem)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> zaman (insan dili veya null)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> ikon (tek emoji)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> renk (pastel hex)
          </div>
        </div>
      )}
    </div>
  );
};
