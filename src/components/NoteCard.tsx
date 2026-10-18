import React, { useState, useEffect } from 'react';
import type { SimpleCardItem } from '../App.tsx';
import type { ProfessionDomain, NextActionSuggestion } from '../types/notivia.ts';
import type { ClarificationOption } from '../utils/interactiveIvr.ts';
import { getQuickClarificationOptions } from '../utils/interactiveIvr.ts';
import { formatCreatedTime } from '../utils/date.ts';
import { getLocalMedia } from '../utils/mediaStorage.ts';

export function CardMediaThumbnail({ mediaId, onClick }: { mediaId: string; onClick: () => void }) {
  const [mediaData, setMediaData] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getLocalMedia(mediaId).then((data) => {
      if (isMounted && data) {
        setMediaData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [mediaId]);

  if (!mediaData) {
    return (
      <span className="w-11 h-11 rounded-xl bg-stone-200/50 animate-pulse shrink-0 flex items-center justify-center text-xs text-stone-400">
        📷
      </span>
    );
  }

  return (
    <img
      src={mediaData}
      alt="Not görseli"
      onClick={onClick}
      className="w-11 h-11 rounded-xl object-cover shrink-0 border border-black/10 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 transition-transform"
      loading="lazy"
    />
  );
}

export interface NoteCardProps {
  item: SimpleCardItem;
  viewMode: 'single' | 'grid';
  language: 'tr' | 'en';
  isSelectMode: boolean;
  isSelected: boolean;
  isSwipedOpen: boolean;
  cardBgColor: string;
  cardOffset: number;
  isDraggingThis: boolean;
  draggingCardId: string | null;
  dragOverCardId: string | null;
  dragPosition: 'before' | 'after' | null;
  isWeatherTriggered: boolean;
  isCompleted: boolean;
  isExpired: boolean;
  syncingCalendarCardId: string | null;
  t: {
    conflictsWith: string;
    [key: string]: string;
  };
  onSelect: (id: string) => void;
  onEdit: (note: SimpleCardItem) => void;
  onDelete: (note: SimpleCardItem) => void;
  onCloseSwipe: () => void;
  onUpdateTitle: (id: string, title: string, calId?: string | null, icon?: string) => void;
  onOpenAlarmEdit: (note: SimpleCardItem) => void;
  onSyncCalendar: (note: SimpleCardItem) => void;
  onSelectDomainClarification: (id: string, domain: ProfessionDomain) => void;
  onResolveClarification: (id: string, option: ClarificationOption) => void;
  onToggleMilestoneStep: (id: string, stepIndex: number) => void;
  onAdoptNextAction: (nextAction: NextActionSuggestion) => void;
  onToggleActionItem: (id: string, taskIndex: number) => void;
  onViewFullImage: (mediaId: string) => void;
  onDesktopDragStart: (e: React.DragEvent, id: string) => void;
  onDesktopDragOver: (e: React.DragEvent, id: string) => void;
  onDesktopDragLeave: (e: React.DragEvent, id: string) => void;
  onDesktopDrop: (e: React.DragEvent, id: string) => void;
  onDesktopDragEnd: (e: React.DragEvent) => void;
  onTouchStart: (id: string, e: React.TouchEvent) => void;
  onTouchMove: (id: string, e: React.TouchEvent) => void;
  onTouchEnd: (id: string) => void;
  onTouchCancel: (id: string) => void;
  onMouseDown: (id: string, e: React.MouseEvent) => void;
  onMouseMove: (id: string, e: React.MouseEvent) => void;
  onMouseUp: (id: string) => void;
  onMouseLeave: (id: string) => void;
  onCardClick: (id: string, e: React.MouseEvent) => void;
  isLongPressFired?: boolean;
}

export const NoteCard = React.memo(function NoteCard({
  item,
  viewMode,
  language,
  isSelectMode,
  isSelected,
  isSwipedOpen,
  cardBgColor,
  cardOffset,
  isDraggingThis,
  draggingCardId,
  dragOverCardId,
  dragPosition,
  isWeatherTriggered,
  isCompleted,
  isExpired,
  syncingCalendarCardId,
  t,
  onSelect,
  onEdit,
  onDelete,
  onCloseSwipe,
  onUpdateTitle,
  onOpenAlarmEdit,
  onSyncCalendar,
  onSelectDomainClarification,
  onResolveClarification,
  onToggleMilestoneStep,
  onAdoptNextAction,
  onToggleActionItem,
  onViewFullImage,
  onDesktopDragStart,
  onDesktopDragOver,
  onDesktopDragLeave,
  onDesktopDrop,
  onDesktopDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onCardClick,
  isLongPressFired = false,
}: NoteCardProps) {
  return (
    <React.Fragment>
      {/* Yukarıya Yerleştirme Göstergesi (Drop Indicator Before) */}
      {dragOverCardId === item.id && dragPosition === 'before' && (
        <div className="w-full col-span-full py-1 flex items-center justify-center animate-in fade-in zoom-in-95 duration-100">
          <div className="w-full h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full shadow-md flex items-center justify-center relative">
            <span className="absolute bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs -top-2.5 flex items-center gap-1">
              <span>⬆️</span> {language === 'tr' ? 'Buraya Taşı' : 'Move Here'}
            </span>
          </div>
        </div>
      )}

      {/* Sola Kaydırılabilir Kart Dış Kapsayıcısı */}
      <div
        className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl group/swipe select-none card-swipe-container"
        data-card-id={item.id}
      >
        {/* Tek Sütun Görünümünde Arkadan Açılan Mobil Aksiyon Çekmecesi (Düzenle, Sil) */}
        {viewMode !== 'grid' && (
          <div className="absolute inset-y-0 right-0 flex items-stretch z-0 bg-stone-900 dark:bg-stone-950 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
            {/* 1. Düzenle */}
            <button
              type="button"
              id={`swipe-edit-${item.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
                onCloseSwipe();
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                  try { navigator.vibrate(25); } catch {}
                }
              }}
              className="w-18 sm:w-20 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer px-1 text-center select-none border-r border-white/10 min-h-[48px]"
              title={language === 'tr' ? 'Kartı Düzenle' : 'Edit'}
            >
              <span className="text-lg sm:text-xl">✏️</span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-tight">
                {language === 'tr' ? 'Düzenle' : 'Edit'}
              </span>
            </button>

            {/* 2. Sil */}
            <button
              type="button"
              id={`swipe-delete-${item.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item);
                onCloseSwipe();
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                  try { navigator.vibrate(30); } catch {}
                }
              }}
              className="w-18 sm:w-20 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer px-1 text-center select-none min-h-[48px]"
              title={language === 'tr' ? 'Notu Sil' : 'Delete'}
            >
              <span className="text-lg sm:text-xl">🗑️</span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-tight">
                {language === 'tr' ? 'Sil' : 'Delete'}
              </span>
            </button>
          </div>
        )}

        {/* İkili Izgarada Kaydırma Esnasında Gösterilen Sağ Çekme İpucu */}
        {viewMode === 'grid' && (
          <div className="absolute inset-y-0 right-0 w-10 bg-stone-900 text-white flex items-center justify-center rounded-r-xl z-0 text-xs font-bold shadow-inner opacity-80">
            <span>⚙️</span>
          </div>
        )}

        {/* İkili Izgarada Sola Çekince Açılan Aksiyon HUD'ı */}
        {viewMode === 'grid' && isSwipedOpen && (
          <div
            className="absolute inset-0 z-30 bg-stone-900/95 dark:bg-stone-950/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between text-white shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Başlık ve Kapat Butonu */}
            <div className="flex items-center justify-between gap-1 border-b border-white/10 pb-1 px-0.5">
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <span className="text-xs shrink-0">{item.ikon || '📌'}</span>
                <span className="text-[11px] font-bold truncate text-stone-100" title={item.baslik}>
                  {item.baslik}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseSwipe();
                }}
                className="w-5 h-5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 flex items-center justify-center text-[10px] text-stone-300 hover:text-white cursor-pointer transition-colors shrink-0"
                title={language === 'tr' ? 'Kapat' : 'Close'}
              >
                ✕
              </button>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex flex-col gap-1.5 flex-1 justify-center py-1">
              <button
                type="button"
                id={`grid-swipe-edit-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item);
                  onCloseSwipe();
                  if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    try { navigator.vibrate(25); } catch {}
                  }
                }}
                className="w-full flex-1 min-h-[32px] max-h-[42px] px-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:from-indigo-800 active:to-indigo-900 text-white flex items-center justify-between shadow-2xs active:scale-95 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs sm:text-sm shrink-0">✏️</span>
                  <span className="text-[10px] sm:text-[11px] font-bold truncate">
                    {language === 'tr' ? 'Düzenle' : 'Edit'}
                  </span>
                </div>
                <span className="text-[10px] opacity-70 font-mono">›</span>
              </button>

              <button
                type="button"
                id={`grid-swipe-delete-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                  onCloseSwipe();
                  if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    try { navigator.vibrate(30); } catch {}
                  }
                }}
                className="w-full flex-1 min-h-[32px] max-h-[42px] px-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 text-white flex items-center justify-between shadow-2xs active:scale-95 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs sm:text-sm shrink-0">🗑️</span>
                  <span className="text-[10px] sm:text-[11px] font-bold truncate">
                    {language === 'tr' ? 'Notu Sil' : 'Delete'}
                  </span>
                </div>
                <span className="text-[10px] opacity-70 font-mono">›</span>
              </button>
            </div>
          </div>
        )}

        {/* Ön Plandaki Kaydırılabilir Not Kartı */}
        <div
          draggable={!isSelectMode}
          onDragStart={(e) => onDesktopDragStart(e, item.id)}
          onDragOver={(e) => onDesktopDragOver(e, item.id)}
          onDragLeave={(e) => onDesktopDragLeave(e, item.id)}
          onDrop={(e) => onDesktopDrop(e, item.id)}
          onDragEnd={onDesktopDragEnd}
          onTouchStart={(e) => onTouchStart(item.id, e)}
          onTouchMove={(e) => onTouchMove(item.id, e)}
          onTouchEnd={() => onTouchEnd(item.id)}
          onTouchCancel={() => onTouchCancel(item.id)}
          onMouseDown={(e) => onMouseDown(item.id, e)}
          onMouseMove={(e) => onMouseMove(item.id, e)}
          onMouseUp={() => onMouseUp(item.id)}
          onMouseLeave={() => onMouseLeave(item.id)}
          onContextMenu={(e) => {
            if (isLongPressFired || isSelectMode) {
              e.preventDefault();
            }
          }}
          onClick={(e) => onCardClick(item.id, e)}
          className={`card relative z-10 w-full max-w-full overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md ${
            viewMode === 'grid'
              ? 'p-2.5 sm:p-3 rounded-xl sm:rounded-2xl gap-1.5'
              : 'p-3.5 sm:p-4 rounded-2xl gap-2 sm:gap-2.5'
          } ${
            item.isRemoving ? 'scale-95 opacity-0' : 'scale-100'
          } ${
            draggingCardId === item.id
              ? 'opacity-50 scale-[1.02] ring-2 ring-indigo-500 shadow-2xl z-30 cursor-grabbing'
              : ''
          } ${
            isWeatherTriggered
              ? 'ring-2 ring-red-500 bg-red-50 animate-pulse'
              : isCompleted
              ? 'opacity-70 saturate-50 border-solid border-stone-300/80 shadow-none'
              : isExpired 
              ? 'opacity-95 border-dashed border-amber-300/80 shadow-xs' 
              : 'opacity-100 border-solid border-black/8 dark:border-white/10 shadow-xs'
          } ${isSelected ? 'ring-2 ring-stone-800 dark:ring-stone-200' : ''} ${
            isSelectMode ? 'cursor-pointer select-none active:scale-[0.99]' : ''
          }`}
          style={{
            backgroundColor: cardBgColor,
            borderWidth: '1px',
            transform: `translateX(${cardOffset}px)`,
            transition: isDraggingThis ? 'none' : 'transform 0.28s cubic-bezier(0.2, 0.85, 0.32, 1.05)',
            WebkitTouchCallout: 'none',
          }}
        >
          {/* Üst Kısım: Başlık ve İkon */}
          <div className="flex items-start justify-between gap-2 sm:gap-2.5 w-full">
            <div className="flex items-start gap-2 sm:gap-2.5 min-w-0 flex-1 w-full">
              {/* Çoklu Seçim Modunda Seçim Kutucuğu ve Sürükleme Kulpu */}
              {isSelectMode && (
                <div className="flex items-center gap-1 shrink-0 mt-0.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(item.id);
                    }}
                    className={`rounded-md border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                      viewMode === 'grid' ? 'w-4 h-4 text-[9px]' : 'w-5 h-5 text-xs'
                    } ${
                      isSelected
                        ? 'bg-stone-900 border-stone-900 text-white'
                        : 'border-stone-400 bg-white/70 hover:bg-white text-transparent'
                    }`}
                    title={isSelected ? (language === 'en' ? 'Deselect' : 'Seçimi kaldır') : (language === 'en' ? 'Select' : 'Seç')}
                  >
                    ✓
                  </button>
                  <span
                    className="text-stone-400 dark:text-stone-500 text-xs font-mono font-bold tracking-tighter select-none cursor-grab active:cursor-grabbing px-0.5"
                    title={language === 'tr' ? 'Sürükleyerek sırasını değiştirin' : 'Drag to reorder'}
                  >
                    ⋮⋮
                  </span>
                </div>
              )}

              {/* İkon / Medya Rozeti */}
              <div className="relative shrink-0">
                {item.mediaId ? (
                  <CardMediaThumbnail
                    mediaId={item.mediaId}
                    onClick={() => onViewFullImage(item.mediaId!)}
                  />
                ) : (
                  <div className={`${viewMode === 'grid' ? 'w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg' : 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl'} flex items-center justify-center bg-white/85 dark:bg-black/25 border border-black/5 shadow-2xs select-none shrink-0 ${isCompleted ? 'grayscale opacity-60' : ''}`}>
                    <span className={viewMode === 'grid' ? 'text-sm sm:text-base' : 'text-xl sm:text-2xl'}>
                      {item.ikon || '📌'}
                    </span>
                  </div>
                )}
                {/* Durum Noktası */}
                {isWeatherTriggered ? (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white animate-ping" />
                ) : isExpired ? (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" title={language === 'en' ? 'Overdue' : 'Süresi doldu'} />
                ) : isCompleted ? (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-stone-700 ring-2 ring-white flex items-center justify-center text-[7px] text-white">✓</span>
                ) : null}
              </div>

              {/* Başlık ve Zaman */}
              <div className="min-w-0 flex-1">
                <h2
                  contentEditable={!isCompleted && !isSelectMode}
                  suppressContentEditableWarning={true}
                  spellCheck={false}
                  className={`font-semibold leading-snug tracking-tight outline-hidden break-words hyphens-auto w-full ${
                    viewMode === 'grid' ? 'text-[11.5px] sm:text-xs line-clamp-2' : 'text-[15px] sm:text-base'
                  } ${
                    isCompleted
                      ? 'text-stone-500 line-through decoration-stone-500/70'
                      : isExpired
                      ? 'text-stone-800 cursor-text'
                      : 'text-stone-900 dark:text-stone-100 cursor-text'
                  }`}
                  style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      (e.currentTarget as HTMLElement).blur();
                    }
                  }}
                  onBlur={(e) => {
                    const newTitle = e.currentTarget.innerText?.trim();
                    if (newTitle && newTitle !== item.baslik) {
                      onUpdateTitle(
                        item.id,
                        newTitle,
                        item.calendarEventId || item.calendar_event_id,
                        item.ikon || '📌'
                      );
                    } else if (!newTitle) {
                      e.currentTarget.innerText = item.baslik;
                    }
                  }}
                >
                  {item.baslik}
                </h2>

                {/* Zaman Damgası & Google Takvim Rozeti */}
                {(item.zaman || item.tarih_iso) && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    {item.zaman && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAlarmEdit(item);
                        }}
                        className={`inline-flex items-center gap-1 font-semibold rounded-md transition-colors cursor-pointer hover:opacity-80 select-none ${
                          viewMode === 'grid' ? 'text-[9.5px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5'
                        } ${
                          isExpired
                            ? 'bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30'
                            : 'bg-black/8 dark:bg-white/10 text-stone-800 dark:text-stone-200'
                        }`}
                        title={language === 'tr' ? 'Zamanı düzenlemek için tıkla' : 'Click to edit time'}
                      >
                        <span>{item.isAlarm ? '⏰' : '🗓️'}</span>
                        <span className="truncate">{item.zaman}</span>
                      </span>
                    )}

                    {/* Google Takvim Senkronizasyon Rozeti */}
                    {item.tarih_iso && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSyncCalendar(item);
                        }}
                        className={`inline-flex items-center gap-1 font-semibold rounded-md border transition-all cursor-pointer select-none active:scale-95 ${
                          viewMode === 'grid' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10.5px] px-2 py-0.5'
                        } ${
                          item.calendarEventId || item.calendar_event_id
                            ? 'bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300'
                            : 'bg-stone-500/10 border-stone-500/20 text-stone-600 dark:text-stone-400 hover:bg-blue-500/15 hover:border-blue-500/30 hover:text-blue-700'
                        }`}
                        title={
                          item.calendarEventId || item.calendar_event_id
                            ? (language === 'tr' ? 'Google Takvimde otomatik eşitlendi (Yenilemek için tıkla)' : 'Synced in Google Calendar (Click to refresh)')
                            : (language === 'tr' ? 'Google Takvime otomatik aktarmak için tıkla' : 'Click to auto-sync to Google Calendar')
                        }
                      >
                        <span>📅</span>
                        <span>
                          {syncingCalendarCardId === item.id
                            ? (language === 'tr' ? 'Aktarılıyor...' : 'Syncing...')
                            : (item.calendarEventId || item.calendar_event_id)
                            ? (language === 'tr' ? 'Google Takvimde ✓' : 'Google Calendar ✓')
                            : (language === 'tr' ? 'Takvime Eşitle' : 'Sync to Cal')}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gövde: Rozetler, Uyarılar ve Alt Görevler */}
          <div className={`w-full ${viewMode === 'grid' ? 'space-y-1.5' : 'space-y-2'}`}>
            {/* Çakışma Uyarısı */}
            {(item.conflictWith || item.conflictWarning) && (
              <div className={`flex items-center gap-1 text-amber-900 bg-amber-500/15 border border-amber-500/30 rounded-lg break-words ${
                viewMode === 'grid' ? 'text-[10px] p-1.5' : 'text-xs px-2.5 py-1'
              }`}>
                <span className="shrink-0">⚠️</span>
                <span className="leading-tight">'{item.conflictWith || item.conflictWarning}' {t.conflictsWith}</span>
              </div>
            )}

            {/* Jargon İkilemi */}
            {item.domain_clarification?.isAmbiguous && item.domain_clarification.candidates?.length > 0 && (
              <div className={`rounded-xl bg-amber-500/15 dark:bg-amber-400/15 border border-amber-500/40 text-stone-900 dark:text-stone-100 flex flex-col gap-2 shadow-xs transition-all animate-in fade-in slide-in-from-top-1 duration-200 ${
                viewMode === 'grid' ? 'p-2 text-[10px]' : 'p-2.5 sm:p-3 text-xs'
              }`}>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/25 text-amber-900 dark:text-amber-100 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    🤔
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                        {language === 'en' ? 'Did You Mean?' : 'Bunu mu Demek İstediniz?'}
                      </span>
                      <span className="text-[8.5px] px-1.5 py-0.2 rounded-full bg-amber-500/25 text-amber-950 dark:text-amber-100 font-semibold font-mono">
                        Jargon
                      </span>
                    </div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                      {item.domain_clarification.question || (language === 'en' ? 'Multiple professional fields detected. Which domain procedure should be applied?' : 'Birden fazla mesleki jargon tespit edildi. Hangi uzmanlık prosedürü uygulansın?')}
                    </p>
                  </div>
                </div>

                {/* Sektör Seçim Butonları */}
                <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-amber-500/20">
                  {item.domain_clarification.candidates.map((cand, candIdx) => (
                    <button
                      key={candIdx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDomainClarification(item.id, cand.domain);
                      }}
                      className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 hover:bg-amber-100 dark:hover:bg-amber-950/80 border border-stone-300 dark:border-stone-700 hover:border-amber-400 active:scale-95 transition-all shadow-2xs cursor-pointer"
                      title={`${cand.domainLabel} olarak ayarla`}
                    >
                      <span>{cand.icon}</span>
                      <span className="whitespace-nowrap font-semibold">{cand.domainLabel}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Netleştirme Sorusu / Eksik Bilgi Uyarısı */}
            {(!item.domain_clarification?.isAmbiguous) && (item.eksik_bilgi || item.netlestirme_sorusu || item.soru) && (
              <div className={`rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 text-stone-900 dark:text-stone-100 flex flex-col gap-2 shadow-xs transition-all animate-in fade-in slide-in-from-top-1 duration-200 ${
                viewMode === 'grid' ? 'p-2 text-[10px]' : 'p-2.5 sm:p-3 text-xs'
              }`}>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    🎙️
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                        {language === 'en' ? 'Voice Clarification' : 'Sesli Netleştirme'}
                      </span>
                      <span className="text-[8.5px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-200 font-semibold font-mono">
                        IVR
                      </span>
                    </div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                      {item.netlestirme_sorusu || item.soru || (language === 'en' ? 'Which day and time should we plan for?' : 'Hangi gün ve saat için planlayalım?')}
                    </p>
                  </div>
                </div>

                {/* Hızlı Yanıt Butonları */}
                <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-amber-500/20">
                  {getQuickClarificationOptions().map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onResolveClarification(item.id, opt);
                      }}
                      className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-amber-950/70 border border-stone-200 dark:border-stone-700 hover:border-amber-400 active:scale-95 transition-all shadow-2xs cursor-pointer"
                      title={`${opt.label} olarak kaydet`}
                    >
                      <span>{opt.icon}</span>
                      <span className="whitespace-nowrap">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Anomali Notu */}
            {item.anomali_notu && (
              <div className={`flex items-start gap-1 bg-amber-500/10 text-amber-950 border border-amber-500/20 rounded-lg leading-tight break-words ${
                viewMode === 'grid' ? 'text-[10px] p-1.5' : 'text-xs px-2.5 py-1.5'
              }`}>
                <span className="shrink-0 text-xs mt-0.5">💡</span>
                <p className="font-normal">{item.anomali_notu}</p>
              </div>
            )}

            {/* 1. Çıkarılan Metrikler */}
            {item.extracted_metrics && item.extracted_metrics.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-0.5">
                {item.extracted_metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className={`inline-flex items-center gap-1 rounded-md bg-stone-900/10 dark:bg-white/10 text-stone-900 dark:text-stone-100 font-medium border border-black/5 dark:border-white/10 ${
                      viewMode === 'grid' ? 'text-[9px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5'
                    }`}
                  >
                    <span className="opacity-70 text-[8.5px] uppercase tracking-wider">{m.label}:</span>
                    <span className="font-bold">{m.value} {m.unit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Kilometre Taşı Zinciri */}
            {item.milestone_chain && item.milestone_chain.steps.length > 0 && (
              <div className="mt-1 p-1.5 sm:p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-stone-800 dark:text-stone-200 mb-1">
                  <span className="flex items-center gap-1 truncate">
                    <span>⛓️</span>
                    <span className="truncate">{item.milestone_chain.chainName}</span>
                  </span>
                  <span className="text-[9px] text-stone-500 font-mono shrink-0 ml-1">
                    {item.milestone_chain.currentStepIndex + 1}/{item.milestone_chain.steps.length}
                  </span>
                </div>

                <div className="space-y-1">
                  {item.milestone_chain.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMilestoneStep(item.id, sIdx);
                      }}
                      className="flex items-center gap-1.5 text-xs py-0.5 px-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8.5px] font-bold shrink-0 transition-colors ${
                          step.isCompleted
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : sIdx === item.milestone_chain?.currentStepIndex
                            ? 'border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold'
                            : 'border border-stone-400 text-stone-500 bg-white/70 dark:bg-stone-800'
                        }`}
                      >
                        {step.isCompleted ? '✓' : sIdx + 1}
                      </span>
                      <span
                        className={`flex-1 text-[10px] sm:text-[11px] select-none truncate ${
                          step.isCompleted
                            ? 'line-through text-stone-400 dark:text-stone-500'
                            : sIdx === item.milestone_chain?.currentStepIndex
                            ? 'font-bold text-stone-900 dark:text-white'
                            : 'text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Proaktif Sıradaki Eylem Önerisi */}
            {item.next_action && (
              <div className="mt-1 p-1.5 sm:p-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-950 dark:text-indigo-100 flex items-center justify-between gap-1.5 text-xs">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 font-semibold text-[10px] sm:text-[11px] text-indigo-700 dark:text-indigo-300">
                    <span>⚡</span>
                    <span className="truncate">{item.next_action.title}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdoptNextAction(item.next_action!);
                  }}
                  className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[9px] sm:text-[10px] rounded-md shadow-2xs cursor-pointer active:scale-95 transition-all shrink-0"
                  title="Bu öneriyi yeni görev olarak ekle"
                >
                  + Ekle
                </button>
              </div>
            )}

            {/* Alt Görevler: İlerleme Çubuğu ve Liste */}
            {item.action_items && item.action_items.length > 0 && (() => {
              const completedCount = item.action_items.filter(t => t.is_completed).length;
              const totalCount = item.action_items.length;
              const percent = Math.round((completedCount / totalCount) * 100);

              return (
                <div className="mt-1 pt-1 border-t border-black/5 dark:border-white/5">
                  <details className="group" open>
                    <summary className="flex items-center justify-between cursor-pointer list-none select-none py-0.5">
                      <div className="flex items-center gap-1.5 flex-1 mr-2 min-w-0">
                        <span className="text-[10px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-0.5 shrink-0">
                          <span>📋</span>
                          <span>{completedCount}/{totalCount}</span>
                        </span>
                        <div className="flex-1 max-w-[45px] sm:max-w-[70px] h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden shrink-0">
                          <div
                            className="h-full bg-stone-800 dark:bg-stone-200 rounded-full transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-stone-500 shrink-0">%{percent}</span>
                      </div>
                      <span className="text-[9px] text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>

                    <div className="mt-1 space-y-0.5 sm:space-y-1 bg-white/50 dark:bg-black/20 p-1.5 rounded-lg border border-black/5 dark:border-white/5">
                      {item.action_items.map((task, tIdx) => (
                        <div
                          key={tIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleActionItem(item.id, tIdx);
                          }}
                          className="flex items-center gap-2 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-white/70 dark:hover:bg-white/10 active:scale-[0.99] transition-all group/task min-h-[36px]"
                        >
                          <span className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-md border flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all shrink-0 ${
                            task.is_completed 
                              ? 'bg-stone-800 border-stone-800 text-white shadow-2xs dark:bg-white dark:text-stone-900' 
                              : 'border-stone-400 bg-white group-hover/task:border-stone-700 shadow-2xs'
                          }`}>
                            {task.is_completed ? '✓' : ''}
                          </span>
                          <span
                            className={`text-xs sm:text-[13px] leading-snug select-none break-words flex-1 min-w-0 transition-all ${
                              task.is_completed
                                ? 'line-through text-stone-400 dark:text-stone-500 opacity-60'
                                : 'text-stone-900 dark:text-white font-medium'
                            }`}
                          >
                            {task.task}
                          </span>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              );
            })()}
          </div>

          {/* Kaydedilme Zamanı */}
          <div className="flex items-center justify-end w-full pt-1 mt-auto select-none pointer-events-none">
            <span
              className={`font-mono text-stone-500/80 dark:text-stone-400/80 tracking-tight flex items-center gap-1 ${
                viewMode === 'grid' ? 'text-[8.5px]' : 'text-[9.5px]'
              }`}
              title={language === 'tr' ? 'Kaydedilme Tarihi ve Saati' : 'Saved Date & Time'}
            >
              <span>{formatCreatedTime(item.createdAt || (!isNaN(Number(item.id)) ? Number(item.id) : item.tarih_iso) || Date.now(), language)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Aşağıya Yerleştirme Göstergesi (Drop Indicator After) */}
      {dragOverCardId === item.id && dragPosition === 'after' && (
        <div className="w-full col-span-full py-1 flex items-center justify-center animate-in fade-in zoom-in-95 duration-100">
          <div className="w-full h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full shadow-md flex items-center justify-center relative">
            <span className="absolute bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs -top-2.5 flex items-center gap-1">
              <span>⬇️</span> {language === 'tr' ? 'Buraya Taşı' : 'Move Here'}
            </span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
});
