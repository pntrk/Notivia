import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Bell,
  RotateCw,
  CheckCircle2,
  Circle,
  Plus,
  Share2,
  Download,
  CalendarPlus,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import type { NotiviaParsedNote, ActionItem } from '../types/notivia.ts';
import { formatTurkishDateTime, formatRelativeTimeRemaining } from '../utils/date.ts';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar.ts';

interface CardVisualizerProps {
  note: NotiviaParsedNote;
  onUpdateActionItem: (noteId: string, index: number, isCompleted: boolean) => void;
  onAddActionItem: (noteId: string, taskText: string) => void;
  onSwitchToJsonView?: () => void;
}

export const CardVisualizer: React.FC<CardVisualizerProps> = ({
  note,
  onUpdateActionItem,
  onAddActionItem,
  onSwitchToJsonView,
}) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);

  const completedCount = note.action_items.filter((item) => item.is_completed).length;
  const totalCount = note.action_items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    onAddActionItem(note.id, newTaskText.trim());
    setNewTaskText('');
  };

  const handleShareSummary = () => {
    const text = `📌 *${note.summary}*\n${note.detailed_note}\n\n` +
      `Alt Görevler:\n` +
      note.action_items.map((a) => `${a.is_completed ? '✅' : '⬜'} ${a.task}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const googleCalUrl = createGoogleCalendarUrl(note);

  // Priority color tag mapping
  const priorityStyles: Record<string, { label: string; badgeClass: string; dotClass: string }> = {
    dusuk: { label: 'Düşük Öncelik', badgeClass: 'bg-stone-100 text-stone-700', dotClass: 'bg-stone-400' },
    normal: { label: 'Normal Öncelik', badgeClass: 'bg-blue-50 text-blue-700', dotClass: 'bg-blue-500' },
    yuksek: { label: 'Yüksek Öncelik', badgeClass: 'bg-amber-50 text-amber-800', dotClass: 'bg-amber-500' },
    kritik: { label: 'Kritik Öncelik', badgeClass: 'bg-rose-50 text-rose-800 font-semibold', dotClass: 'bg-rose-600 animate-pulse' },
  };

  const currentPriority = priorityStyles[note.priority] || priorityStyles.normal;

  return (
    <div
      id="notivia-active-card"
      className="relative w-full rounded-2xl p-6 sm:p-8 transition-all duration-200 border border-stone-300/70 shadow-sm"
      style={{
        backgroundColor: note.ui_meta.color_hex || '#E0F2FE',
      }}
    >
      {/* Top Header Metadata */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-stone-800/10">
        <div className="flex items-center gap-3">
          <span
            id="card-icon-badge"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 shadow-xs text-2xl border border-stone-200/60 select-none"
          >
            {note.ui_meta.icon || '📝'}
          </span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                id="card-status-badge"
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-900 text-white tracking-wide shadow-2xs"
              >
                {note.ui_meta.badge_text}
              </span>
              <span
                id="card-category-badge"
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/80 text-stone-800 border border-stone-300/60"
              >
                {note.category}
              </span>
              <span
                id="card-priority-badge"
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-stone-300/60 ${currentPriority.badgeClass}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${currentPriority.dotClass}`} />
                {currentPriority.label}
              </span>
            </div>
            <h2 id="card-title" className="text-xl sm:text-2xl font-bold text-stone-900 mt-1 tracking-tight">
              {note.summary}
            </h2>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-share-summary"
            onClick={handleShareSummary}
            title="Özeti Kopyala"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white/80 hover:bg-white border border-stone-300/80 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedToast ? 'Kopyalandı!' : 'Özeti Kopyala'}</span>
          </button>
          {onSwitchToJsonView && (
            <button
              type="button"
              id="btn-inspect-json"
              onClick={onSwitchToJsonView}
              title="Katı JSON Şemasını İncele"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-white/80 hover:bg-white border border-stone-300/80 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <span>{`{ } JSON`}</span>
            </button>
          )}
        </div>
      </div>

      {/* Detailed Refined Note */}
      <div className="mt-4">
        <p id="card-detailed-note" className="text-stone-800 text-sm sm:text-base leading-relaxed font-normal bg-white/50 p-3.5 rounded-xl border border-stone-200/50">
          {note.detailed_note}
        </p>
      </div>

      {/* Main Grid: Action items + Calendar/Reminders */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Cognitive Action Items ("Leb Demeden Leblebi") */}
        <div className="lg:col-span-7 bg-white/90 rounded-xl p-4.5 border border-stone-300/70 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-stone-900 tracking-tight">
                  Bilişsel Alt Görevler
                </h3>
              </div>
              <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                {completedCount} / {totalCount} Tamamlandı
              </span>
            </div>

            <div className="mt-2 mb-3 text-[11px] text-stone-500 flex items-center gap-1.5 font-medium">
              <span>🧠</span>
              <span>Notivia tarafından ima edilen gereksinimler tespit edilerek ayrıştırıldı.</span>
            </div>

            {/* Progress bar */}
            {totalCount > 0 && (
              <div className="w-full bg-stone-100 rounded-full h-1.5 mb-3 overflow-hidden">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}

            {/* Checklist items */}
            <ul id="action-items-list" className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {note.action_items.map((item: ActionItem, idx: number) => (
                <li
                  key={idx}
                  id={`action-item-${idx}`}
                  onClick={() => onUpdateActionItem(note.id, idx, !item.is_completed)}
                  className={`group flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors border ${
                    item.is_completed
                      ? 'bg-stone-50/90 border-stone-200 text-stone-400'
                      : 'bg-white hover:bg-stone-50 border-stone-200/80 text-stone-800'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-stone-400 group-hover:text-stone-700 transition-colors"
                  >
                    {item.is_completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-400" />
                    )}
                  </button>
                  <span
                    className={`text-xs sm:text-sm leading-snug break-words ${
                      item.is_completed ? 'line-through text-stone-400' : 'font-normal'
                    }`}
                  >
                    {item.task}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add custom action item */}
          <form onSubmit={handleAddNewTask} className="mt-3 pt-2.5 border-t border-stone-200 flex gap-2">
            <input
              type="text"
              id="input-new-subtask"
              placeholder="Yeni bir alt görev adımı ekle..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
            <button
              type="submit"
              id="btn-add-subtask"
              disabled={!newTaskText.trim()}
              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium flex items-center gap-1 disabled:opacity-40 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ekle</span>
            </button>
          </form>
        </div>

        {/* Right Column: Calendar Event & Periodic & Notification widgets */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Calendar Box */}
          <div className="bg-white/90 rounded-xl p-4 border border-stone-300/70 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Takvim Entegrasyonu</span>
              </div>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                note.calendar_event.has_event
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-stone-100 text-stone-600'
              }`}>
                {note.calendar_event.has_event ? 'Etkinlik Var' : 'Takvim Dışı'}
              </span>
            </div>

            {note.calendar_event.has_event ? (
              <div className="mt-2.5 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-stone-700">
                  <Clock className="w-3.5 h-3.5 mt-0.5 text-stone-400 shrink-0" />
                  <div>
                    <span className="font-medium text-stone-900">
                      {formatTurkishDateTime(note.calendar_event.start_datetime)}
                    </span>
                    {note.calendar_event.start_datetime && (
                      <span className="ml-1.5 text-[11px] text-blue-600 font-medium">
                        ({formatRelativeTimeRemaining(note.calendar_event.start_datetime, note.reference_datetime)})
                      </span>
                    )}
                  </div>
                </div>

                {note.calendar_event.location && (
                  <div className="flex items-center gap-2 text-stone-700">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="text-stone-800">{note.calendar_event.location}</span>
                  </div>
                )}

                {/* Calendar Action Buttons */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {googleCalUrl && (
                    <a
                      href={googleCalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="btn-google-calendar"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-2xs"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Google Takvim</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  )}
                  <button
                    type="button"
                    id="btn-download-ics"
                    onClick={() => downloadIcsFile(note)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-600" />
                    <span>.ics İndir</span>
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-xs text-stone-500">
                Bu kayıt için belirli bir takvim randevusu atanmadı.
              </p>
            )}
          </div>

          {/* Notification Info Box */}
          <div className="bg-white/90 rounded-xl p-4 border border-stone-300/70 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <Bell className="w-4 h-4 text-amber-600" />
                <span>Bildirim & Hatırlatıcı</span>
              </div>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                note.notification.needs_reminder
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-stone-100 text-stone-600'
              }`}>
                {note.notification.needs_reminder ? 'Aktif' : 'Gereksiz'}
              </span>
            </div>

            {note.notification.needs_reminder ? (
              <div className="mt-2.5 text-xs space-y-1.5">
                <p className="text-stone-800 font-medium">
                  "{note.notification.notification_text}"
                </p>
                {note.notification.remind_at && (
                  <p className="text-[11px] text-stone-500">
                    <span className="font-semibold">Hatırlatma Zamanı: </span>
                    {formatTurkishDateTime(note.notification.remind_at)}
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-2 text-xs text-stone-500">
                Özel bir alarm veya bildirim ihtiyacı bulunmuyor.
              </p>
            )}
          </div>

          {/* Periodic Log Box */}
          <div className="bg-white/90 rounded-xl p-4 border border-stone-300/70 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <RotateCw className="w-4 h-4 text-purple-600" />
                <span>Periyodik Döngü</span>
              </div>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                note.periodic_log.is_periodic
                  ? 'bg-purple-100 text-purple-900'
                  : 'bg-stone-100 text-stone-600'
              }`}>
                {note.periodic_log.is_periodic ? 'Döngüsel Rutin' : 'Tek Seferlik'}
              </span>
            </div>

            {note.periodic_log.is_periodic ? (
              <div className="mt-2.5 text-xs space-y-1 text-stone-800">
                <p className="font-medium text-purple-950">
                  🔄 Her {note.periodic_log.interval_days} günde bir tekrarlanır.
                </p>
                {note.periodic_log.next_due_date && (
                  <p className="text-[11px] text-stone-600">
                    <span className="font-semibold">Sonraki Döngü: </span>
                    {formatTurkishDateTime(note.periodic_log.next_due_date)}
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-2 text-xs text-stone-500">
                Bu işlem tek seferliktir, periyodik bir aralığa sahip değildir.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Engine Telemetry Footer */}
      <div className="mt-4 pt-3 border-t border-stone-800/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-600 font-mono">
        <div className="flex items-center gap-3">
          <span>
            Motor: <strong className="text-stone-800">{note.engine_meta?.model || 'Gemini 3.8 Flash'}</strong>
          </span>
          {typeof note.engine_meta?.processing_time_ms === 'number' && (
            <span>• Süre: {note.engine_meta.processing_time_ms}ms</span>
          )}
        </div>
        <div>
          <span>Referans ISO: {note.reference_datetime || '2026-09-15T09:25:44'}</span>
        </div>
      </div>
    </div>
  );
};
