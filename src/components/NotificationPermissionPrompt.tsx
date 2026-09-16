import React, { useState, useEffect } from 'react';
import { requestDeviceNotificationPermission } from '../utils/deviceCalendar';
import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';

interface Props {
  language?: Language;
  onStatusChange?: (msg: string) => void;
  onEnabled?: () => void;
}

export const NotificationPermissionPrompt: React.FC<Props> = ({ language = 'tr', onStatusChange, onEnabled }) => {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [isPrompting, setIsPrompting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const t = translations[language];

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPermission('unsupported');
      return;
    }
    setPermission(Notification.permission);
  }, []);

  const handleRequest = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    setIsPrompting(true);
    try {
      const granted = await requestDeviceNotificationPermission();
      setPermission(Notification.permission);
      if (granted) {
        onStatusChange?.(language === 'tr' ? 'Cihaz bildirimleri aktif 🔔' : 'Device notifications enabled 🔔');
        onEnabled?.();
      } else {
        onStatusChange?.(language === 'tr' ? 'Bildirim izni verilmedi 🔕' : 'Notification permission not granted 🔕');
      }
    } catch {
      onStatusChange?.(language === 'tr' ? 'Bildirim izni alınamadı' : 'Could not obtain notification permission');
    } finally {
      setIsPrompting(false);
    }
  };

  if (isDismissed || permission === 'unsupported' || permission === 'granted') {
    return null;
  }

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-3 flex items-center justify-between gap-3 text-stone-800 dark:text-stone-200 animate-in fade-in duration-200">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-xl shrink-0">🔔</span>
        <div className="text-xs min-w-0">
          <p className="font-semibold text-stone-900 dark:text-stone-100">
            {language === 'tr' ? 'Asistan ve Hatırlatıcı Bildirimleri' : 'Assistant & Reminder Notifications'}
          </p>
          <p className="text-stone-600 dark:text-stone-400 truncate">
            {language === 'tr'
              ? 'Randevu alarmları ve hazırlık adımları telefonunuza/cihazınıza gelsin.'
              : 'Receive alarms, prep steps, and recurring alerts directly on your device.'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleRequest}
          disabled={isPrompting}
          className="px-3 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg text-xs font-medium hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
        >
          {isPrompting ? (language === 'tr' ? 'İsteniyor...' : 'Requesting...') : t.enableNotifications}
        </button>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label={t.close}
          className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-500/10 transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
