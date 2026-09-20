import React, { useMemo, useState, useRef } from 'react';
import { DOMAIN_REGISTRY, ActionButtonConfig, ProfessionDomain } from '../types/adaptiveTheme';
import { detectDomainFromJargon } from '../utils/jargonRadar';
import { detectDomainFromText } from '../utils/detectDomain';

export interface AdaptiveCardProps {
  id: string;
  baslik: string;
  hamMetin: string;
  zaman: string | null;
  anomaliNotu?: string | null;
  actionItems?: { task: string; is_completed: boolean }[];
  ikon: string;
  renk?: string;
  onActionClick?: (action: ActionButtonConfig, cardId: string) => void;
  onToggleTask?: (cardId: string, taskIndex: number) => void;
  onEdit?: (cardId: string) => void;
  onDelete?: (cardId: string) => void;
  onSetAlarm?: (cardId: string) => void;
  isCompleted?: boolean;
  onToggleComplete?: (cardId: string) => void;
}

export const AdaptiveNoteCard: React.FC<AdaptiveCardProps> = ({
  id,
  baslik,
  hamMetin,
  zaman,
  anomaliNotu,
  actionItems,
  ikon,
  renk,
  onActionClick,
  onToggleTask,
  onEdit,
  onDelete,
  onSetAlarm,
  isCompleted = false,
  onToggleComplete
}) => {
  // Sola Kaydırma (Swipe-to-Reveal) Durumları
  const [offsetX, setOffsetX] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isSwipingRef = useRef(false);

  // Metinden veya başlıktan sektörel jargonu 0 ms deterministik tara
  const fullText = `${baslik} ${hamMetin}`;
  const radarResult = useMemo(() => detectDomainFromJargon(fullText), [fullText]);
  const activeDomain = useMemo<ProfessionDomain>(() => {
    if (radarResult.confidence >= 0.4 && radarResult.detectedDomain !== 'GENEL') {
      return radarResult.detectedDomain;
    }
    return detectDomainFromText(fullText);
  }, [radarResult, fullText]);

  const theme = DOMAIN_REGISTRY[activeDomain] || DOMAIN_REGISTRY.GENEL;

  // Dokunma (Touch) Olayları
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    startXRef.current = touch.clientX;
    startYRef.current = touch.clientY;
    isSwipingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;

    const dx = touch.clientX - startXRef.current;
    const dy = touch.clientY - startYRef.current;

    if (!isSwipingRef.current) {
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        isSwipingRef.current = true;
      } else if (Math.abs(dy) > 10) {
        return;
      }
    }

    if (isSwipingRef.current) {
      const base = isOpen ? -224 : 0;
      const target = Math.min(0, Math.max(-250, base + dx));
      setOffsetX(target);
    }
  };

  const handleTouchEnd = () => {
    if (isSwipingRef.current) {
      if (!isOpen) {
        if (offsetX < -50) {
          setIsOpen(true);
          setOffsetX(-224);
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(25); } catch {}
          }
        } else {
          setIsOpen(false);
          setOffsetX(0);
        }
      } else {
        if (offsetX > -160) {
          setIsOpen(false);
          setOffsetX(0);
        } else {
          setIsOpen(true);
          setOffsetX(-224);
        }
      }
    }
    isSwipingRef.current = false;
  };

  // Fare (Mouse Drag) Olayları
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (e.target instanceof HTMLElement && e.target.closest('button, input, textarea, a, [contenteditable="true"]')) {
      return;
    }
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    isSwipingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (!isSwipingRef.current) {
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        isSwipingRef.current = true;
      }
    }

    if (isSwipingRef.current) {
      const base = isOpen ? -224 : 0;
      const target = Math.min(0, Math.max(-250, base + dx));
      setOffsetX(target);
    }
  };

  const handleMouseUp = () => {
    if (isSwipingRef.current) {
      if (!isOpen) {
        if (offsetX < -50) {
          setIsOpen(true);
          setOffsetX(-224);
        } else {
          setIsOpen(false);
          setOffsetX(0);
        }
      } else {
        if (offsetX > -160) {
          setIsOpen(false);
          setOffsetX(0);
        } else {
          setIsOpen(true);
          setOffsetX(-224);
        }
      }
    }
    isSwipingRef.current = false;
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setOffsetX(0);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl select-none card-swipe-container">
      {/* Sola Çekince Açılan Mobil Çekmece: Tamamla, Alarm, Düzenle, Sil */}
      <div className="absolute inset-y-0 right-0 flex items-stretch z-0 bg-stone-900 rounded-2xl overflow-hidden shadow-inner">
        {/* 0. Tamamla / Geri Al */}
        {onToggleComplete && (
          <button
            type="button"
            id={`adaptive-swipe-complete-${id}`}
            onClick={(e) => {
              e.stopPropagation();
              closeDrawer();
              onToggleComplete(id);
              if (typeof navigator !== 'undefined' && navigator.vibrate) {
                try { navigator.vibrate(25); } catch {}
              }
            }}
            className={`w-14 sm:w-16 ${
              isCompleted ? 'bg-stone-700 hover:bg-stone-800' : 'bg-emerald-600 hover:bg-emerald-700'
            } text-white flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors px-1 text-center select-none`}
            title={isCompleted ? 'Yeniden Aç' : 'Tamamla'}
          >
            <span className="text-xl">{isCompleted ? '↩️' : '✓'}</span>
            <span className="text-[11px] font-bold tracking-tight">{isCompleted ? 'Geri Al' : 'Tamam'}</span>
          </button>
        )}

        {/* 1. Alarm Kur */}
        <button
          type="button"
          id={`adaptive-swipe-alarm-${id}`}
          onClick={(e) => {
            e.stopPropagation();
            closeDrawer();
            if (onSetAlarm) onSetAlarm(id);
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
              try { navigator.vibrate(25); } catch {}
            }
          }}
          className="w-14 sm:w-16 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors px-1 text-center select-none"
          title="Alarm & Hatırlatıcı Kur"
        >
          <span className="text-xl">🔔</span>
          <span className="text-[11px] font-bold tracking-tight">Alarm</span>
        </button>

        {/* 2. Düzenle */}
        <button
          type="button"
          id={`adaptive-swipe-edit-${id}`}
          onClick={(e) => {
            e.stopPropagation();
            closeDrawer();
            if (onEdit) onEdit(id);
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
              try { navigator.vibrate(25); } catch {}
            }
          }}
          className="w-14 sm:w-16 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors px-1 text-center select-none border-x border-white/10"
          title="Notu Düzenle"
        >
          <span className="text-xl">✏️</span>
          <span className="text-[11px] font-bold tracking-tight">Düzenle</span>
        </button>

        {/* 3. Sil (Öncesinde Onay İster) */}
        <button
          type="button"
          id={`adaptive-swipe-delete-${id}`}
          onClick={(e) => {
            e.stopPropagation();
            closeDrawer();
            setShowDeleteConfirm(true);
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
              try { navigator.vibrate(30); } catch {}
            }
          }}
          className="w-14 sm:w-16 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors px-1 text-center select-none"
          title="Notu Sil"
        >
          <span className="text-xl">🗑️</span>
          <span className="text-[11px] font-bold tracking-tight">Sil</span>
        </button>
      </div>

      {/* Ön Plandaki Kaydırılabilir Not Kartı */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => {
          if (isOpen) closeDrawer();
        }}
        className={`relative z-10 w-full rounded-2xl p-4 sm:p-5 border shadow-xs transition-all duration-250 ${theme.bgCard} ${
          isCompleted ? 'opacity-70 saturate-50 border-stone-300' : 'border-black/8 dark:border-white/10'
        }`}
        style={{
          backgroundColor: renk || undefined,
          transform: `translateX(${offsetX}px)`,
          transition: isSwipingRef.current ? 'none' : 'transform 0.28s cubic-bezier(0.2, 0.85, 0.32, 1.05)',
          WebkitTouchCallout: 'none'
        }}
      >
        {/* Üst Bilgi: İkon, Başlık ve Dinamik Meslek Rozeti */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <span className="text-2xl p-2 rounded-xl bg-white/90 dark:bg-black/20 shadow-2xs select-none shrink-0 border border-black/5">
              {ikon || radarResult.suggestedIcon || '📌'}
            </span>
            <div className="min-w-0 flex-1">
              <h3
                className={`text-base sm:text-lg font-bold leading-snug tracking-tight truncate ${
                  isCompleted ? 'line-through text-stone-500' : 'text-stone-900 dark:text-white'
                }`}
              >
                {baslik}
              </h3>
              {zaman && (
                <p className="text-xs font-semibold text-stone-600 dark:text-stone-300 mt-0.5 flex items-center gap-1.5">
                  <span>🗓️</span> <span>{zaman}</span>
                </p>
              )}
            </div>
          </div>

          {/* Dinamik Alan Rozeti */}
          <div className="flex flex-col items-end shrink-0">
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors duration-200 border border-black/5 ${theme.badgeBg} ${theme.badgeText}`}
            >
              {theme.displayName}
            </span>
          </div>
        </div>

        {/* Varsa Kritik Güvenlik / Yasal Süre / Anomali Uyarısı */}
        {anomaliNotu && (
          <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 dark:text-amber-100 font-medium flex items-center gap-2">
            <span className="text-base shrink-0">⚠️</span>
            <span className="leading-snug">{anomaliNotu}</span>
          </div>
        )}

        {/* Bilişsel Alt Görevler (Geniş Mobil Dokunma Hedefli Kontrol Listesi) */}
        {actionItems && actionItems.length > 0 && (
          <div className="mt-3.5 space-y-2 border-t border-black/5 dark:border-white/5 pt-3">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400">
              <span>Operasyonel Adımlar</span>
              <span className="font-mono text-[10px]">
                {actionItems.filter((t) => t.is_completed).length}/{actionItems.length}
              </span>
            </div>

            <div className="space-y-1">
              {actionItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onToggleTask && onToggleTask(id, idx)}
                  className="flex items-center gap-2.5 cursor-pointer group py-1.5 px-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors min-h-[40px]"
                >
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                      item.is_completed
                        ? 'bg-stone-900 border-stone-900 text-white dark:bg-white dark:text-stone-900'
                        : 'border-stone-400 bg-white group-hover:border-stone-600 shadow-2xs'
                    }`}
                  >
                    {item.is_completed ? '✓' : ''}
                  </div>
                  <span
                    className={`text-xs sm:text-sm select-none break-words flex-1 leading-snug ${
                      item.is_completed
                        ? 'line-through text-stone-400 dark:text-stone-500'
                        : 'text-stone-800 dark:text-stone-200 font-medium'
                    }`}
                  >
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mesleğe Özel Anlık Aksiyon Butonları (Mobil Ergonomik 2:1 Oran) */}
        {theme.actions && theme.actions.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-black/5 dark:border-white/5 flex flex-wrap items-center gap-2">
            {theme.actions.map((action) => (
              <button
                key={action.id}
                type="button"
                id={`card-action-${id}-${action.id}`}
                onClick={() => onActionClick && onActionClick(action, id)}
                className={`inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer min-h-[38px] ${theme.btnPrimaryBg} ${theme.btnPrimaryText}`}
              >
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Silmeden Önce Kullanıcıdan Onay İsteyen Mobil Modal */}
      {showDeleteConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="w-full sm:max-w-md bg-white dark:bg-stone-900 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobil Çekme Çizgisi */}
            <div className="w-12 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 text-2xl shadow-xs">
                🗑️
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-snug">
                  Bu notu silmek istiyor musunuz?
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {ikon || '📌'} {baslik}
                  </span>{' '}
                  başlıklı not ve varsa içindeki tüm alt görevler kalıcı olarak silinecektir.
                </p>
              </div>
            </div>

            {/* Butonlar: Mobil Ergonomik ve Kolay Dokunulabilir (min 44px) */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row items-center gap-2.5 sm:justify-end">
              <button
                type="button"
                id={`cancel-delete-modal-${id}`}
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-medium text-sm hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95 transition-all cursor-pointer text-center min-h-[44px]"
              >
                Vazgeç
              </button>
              <button
                type="button"
                id={`confirm-delete-modal-${id}`}
                onClick={() => {
                  setShowDeleteConfirm(false);
                  if (onDelete) onDelete(id);
                  if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    try { navigator.vibrate([20, 50, 20]); } catch {}
                  }
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm shadow-md shadow-red-600/20 active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>🗑️</span>
                <span>Evet, Sil</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
