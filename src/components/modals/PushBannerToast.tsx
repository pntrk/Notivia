import React from 'react';

export interface PushBannerNotification {
  title: string;
  body: string;
  icon?: string;
  isAlarm?: boolean;
}

export interface PushBannerToastProps {
  notification: PushBannerNotification | null;
  language: 'tr' | 'en';
  onDismiss: () => void;
  onStopAlarm?: () => void;
}

export const PushBannerToast: React.FC<PushBannerToastProps> = ({
  notification,
  language,
  onDismiss,
  onStopAlarm,
}) => {
  if (!notification) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-60 w-full max-w-sm px-4 pointer-events-auto">
      <div
        className={`backdrop-blur-md p-3.5 rounded-2xl shadow-2xl flex items-start gap-3 animate-in slide-in-from-top-4 duration-250 ${
          notification.isAlarm
            ? 'bg-red-950/95 text-white border-2 border-red-500 ring-4 ring-red-500/20 animate-pulse'
            : 'bg-stone-900/95 dark:bg-stone-100/95 text-white dark:text-stone-900 border border-stone-700/80 dark:border-stone-300/80'
        }`}
      >
        <span
          className={`text-2xl shrink-0 leading-none mt-0.5 ${
            notification.isAlarm ? 'animate-bounce' : ''
          }`}
        >
          {notification.icon || (notification.isAlarm ? '⏰' : '🔔')}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-xs font-bold truncate tracking-tight flex items-center gap-1.5">
              <span>{notification.title}</span>
              {notification.isAlarm && (
                <span className="text-[9px] bg-red-500 text-white font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  Alarm
                </span>
              )}
            </h4>
            <span className="text-[10px] opacity-60 shrink-0 font-medium">Notivia</span>
          </div>
          <p className="text-[11px] opacity-90 leading-relaxed mt-0.5 line-clamp-2">
            {notification.body}
          </p>

          {notification.isAlarm && onStopAlarm && (
            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={onStopAlarm}
                className="w-full py-1.5 px-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>⏹️</span>
                <span>{language === 'tr' ? 'Alarmı Kapat / Sustur' : 'Stop Alarm'}</span>
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Kapat"
          className="text-stone-400 hover:text-white dark:hover:text-stone-900 p-1 rounded-md transition-colors cursor-pointer shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
