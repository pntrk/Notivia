import React, { useMemo } from 'react';
import { DOMAIN_REGISTRY, ActionButtonConfig, ProfessionDomain } from '../types/adaptiveTheme';
import { detectDomainFromText } from '../utils/detectDomain';

export interface AdaptiveCardProps {
  id: string;
  baslik: string;
  hamMetin: string;
  zaman: string | null;
  anomaliNotu?: string | null;
  actionItems?: { task: string; is_completed: boolean }[];
  ikon: string;
  onActionClick?: (action: ActionButtonConfig, cardId: string) => void;
  onToggleTask?: (cardId: string, taskIndex: number) => void;
}

export const AdaptiveNoteCard: React.FC<AdaptiveCardProps> = ({
  id,
  baslik,
  hamMetin,
  zaman,
  anomaliNotu,
  actionItems,
  ikon,
  onActionClick,
  onToggleTask
}) => {
  // Metinden veya başlıktan mesleği anlık tespit et
  const activeDomain = useMemo<ProfessionDomain>(() => {
    return detectDomainFromText(`${baslik} ${hamMetin}`);
  }, [baslik, hamMetin]);

  const theme = DOMAIN_REGISTRY[activeDomain] || DOMAIN_REGISTRY.GENEL;

  return (
    <div
      className={`relative w-full rounded-2xl p-4 border border-l-4 shadow-sm transition-all duration-300 ${theme.bgCard} ${theme.borderAccent}`}
    >
      {/* Üst Bilgi: İkon, Başlık ve Dinamik Meslek Rozeti */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl p-1.5 rounded-xl bg-white/80 shadow-xs select-none">
            {ikon || '📌'}
          </span>
          <div>
            <h3 className="text-sm font-bold text-stone-900 leading-snug">
              {baslik}
            </h3>
            {zaman && (
              <p className="text-[11px] font-medium text-stone-600 mt-0.5 flex items-center gap-1">
                <span>🗓️</span> {zaman}
              </p>
            )}
          </div>
        </div>

        {/* Dinamik Alan Rozeti */}
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors duration-200 ${theme.badgeBg} ${theme.badgeText}`}
        >
          {theme.displayName}
        </span>
      </div>

      {/* Varsa Kritik Güvenlik / Yasal Süre Uyarısı */}
      {anomaliNotu && (
        <div className="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-900 font-medium flex items-center gap-1.5">
          <span>⚠️</span>
          <span>{anomaliNotu}</span>
        </div>
      )}

      {/* Bilişsel Alt Görevler (Kontrol Listesi) */}
      {actionItems && actionItems.length > 0 && (
        <div className="mt-3 space-y-1.5 border-t border-black/5 pt-2.5">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">
            Operasyonel Adımlar ({actionItems.filter((t) => t.is_completed).length}/{actionItems.length})
          </p>
          {actionItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onToggleTask && onToggleTask(id, idx)}
              className="flex items-center gap-2 cursor-pointer group py-0.5"
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] transition-colors ${
                  item.is_completed
                    ? 'bg-stone-800 border-stone-800 text-white'
                    : 'border-stone-400 bg-white group-hover:border-stone-600'
                }`}
              >
                {item.is_completed ? '✓' : ''}
              </div>
              <span
                className={`text-[11px] select-none ${
                  item.is_completed ? 'line-through text-stone-400' : 'text-stone-700'
                }`}
              >
                {item.task}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Mesleğe Özel Anlık Aksiyon Butonları */}
      <div className="mt-3 pt-2.5 border-t border-black/5 flex flex-wrap items-center gap-1.5">
        {theme.actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onActionClick && onActionClick(action, id)}
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-xs transition-transform active:scale-95 ${theme.btnPrimaryBg} ${theme.btnPrimaryText}`}
          >
            <span>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
