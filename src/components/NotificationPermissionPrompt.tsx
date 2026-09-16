import React, { useState, useEffect } from 'react';
import { requestDeviceNotificationPermission } from '../utils/deviceCalendar';

interface Props {
  onStatusChange?: (msg: string) => void;
}

export const NotificationPermissionPrompt: React.FC<Props> = ({ onStatusChange }) => {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [isPrompting, setIsPrompting] = useState(false);

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
        onStatusChange?.('Cihaz bildirimleri aktif 🔔');
      } else {
        onStatusChange?.('Bildirim izni verilmedi 🔕');
      }
    } catch {
      onStatusChange?.('Bildirim izni alınamadı');
    } finally {
      setIsPrompting(false);
    }
  };

  if (permission === 'unsupported' || permission === 'granted') {
    return null;
  }

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-4 flex items-center justify-between gap-3 text-stone-800">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-xl shrink-0">🔔</span>
        <div className="text-xs">
          <p className="font-semibold text-stone-900">Hatırlatıcı Bildirimlerini Açın</p>
          <p className="text-stone-600 truncate">
            Ay sonu toplantısı ve periyodik görevler telefonunuza bildirim olarak gelsin.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleRequest}
        disabled={isPrompting}
        className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 active:scale-95 transition-all shrink-0 cursor-pointer shadow-sm"
      >
        {isPrompting ? 'İsteniyor...' : 'Bildirimleri Aç'}
      </button>
    </div>
  );
};
