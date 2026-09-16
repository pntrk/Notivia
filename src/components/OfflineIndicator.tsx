import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div 
      id="banner-offline-indicator"
      className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 flex items-center justify-center sm:justify-start gap-2 rounded-xl bg-stone-900/95 text-stone-100 px-4 py-2 text-xs font-medium shadow-xl border border-stone-700 backdrop-blur-md animate-in slide-in-from-bottom duration-300"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
      <WifiOff className="w-3.5 h-3.5 text-amber-400" />
      <span>Çevrimdışı Mod — Kayıtlı kartlar ve yerel hafıza aktif.</span>
    </div>
  );
};
