import React from 'react';
import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';
import type { ProfessionDomain } from '../types/domainThemes.ts';
import { WORK_DOMAIN_OPTIONS } from '../types/domainThemes.ts';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: any;
  onLogin: () => void;
  onSignOut: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  notificationSupported: boolean;
  onSendTestNotification?: () => void;
  onRemindTodayTasks?: () => void;
  workDomain?: ProfessionDomain;
  onSelectWorkDomain?: (domain: ProfessionDomain) => void;
  onSyncDrive?: () => void;
  isSyncingDrive?: boolean;
  driveSyncTime?: string | null;
  viewMode?: 'single' | 'grid';
  onToggleViewMode?: () => void;
  onOpenRecycleBin?: () => void;
  trashCount?: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  activeUser,
  onLogin,
  onSignOut,
  theme,
  onToggleTheme,
  language,
  onSelectLanguage,
  notificationsEnabled,
  onToggleNotifications,
  notificationSupported,
  onSendTestNotification,
  onRemindTodayTasks,
  workDomain = 'GENEL',
  onSelectWorkDomain,
  onSyncDrive,
  isSyncingDrive,
  driveSyncTime,
  onOpenRecycleBin,
  trashCount = 0,
}) => {
  if (!isOpen) return null;

  const t = translations[language];
  const isDark = theme === 'dark';

  const selectedOption = WORK_DOMAIN_OPTIONS.find((opt) => opt.id === workDomain) || WORK_DOMAIN_OPTIONS[0];

  return (
    <div
      id="settings-backdrop"
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 ${isDark ? 'dark' : ''}`}
      onClick={onClose}
    >
      <div
        id="settings-modal"
        className={`w-full max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border overflow-hidden px-4 pt-3 pb-6 sm:p-5 transition-colors max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain ${
          isDark
            ? 'bg-stone-900 border-stone-800 text-stone-100'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobil Çekme Tutamacı (Pull Handle) */}
        <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700 mx-auto mb-3.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 text-base shrink-0">
              ⚙️
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold tracking-tight truncate">{t.settingsHeader}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className={`w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl transition-colors cursor-pointer active:scale-95 shrink-0 ${
              isDark
                ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800 active:bg-stone-800'
                : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100 active:bg-stone-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Ana Ayar Listesi (Modern Uncluttered Grouped Card) */}
        <div className="space-y-3.5 sm:space-y-4">
          {/* 1. Profil & Google Giriş & Drive Senkronizasyon Bölümü */}
          <div className={`p-3.5 rounded-xl border transition-colors ${
            isDark ? 'bg-stone-850/80 border-stone-800' : 'bg-stone-50/70 border-stone-200/80'
          }`}>
            <div className="flex flex-col gap-3">
              {activeUser ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={
                          activeUser.photoURL ||
                          `https://api.dicebear.com/7.x/identicon/svg?seed=${activeUser.uid}`
                        }
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover border border-stone-300 dark:border-stone-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-xs truncate leading-snug">
                            {activeUser.displayName || 'Kullanıcı'}
                          </p>
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Aktif Google Hesabı" />
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                          {activeUser.email || 'Google Hesabı'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => {
                          onLogin();
                        }}
                        title="Google oturumunu ve Drive erişim yetkisini yenile"
                        className="px-3 py-2 sm:py-1.5 text-xs font-medium rounded-lg bg-stone-200 dark:bg-stone-750 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer flex items-center gap-1.5 min-h-[36px] sm:min-h-0 active:scale-95"
                      >
                        <span>🔄</span>
                        <span>{language === 'tr' ? 'Yetkiyi Yenile' : 'Re-auth'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onSignOut();
                          onClose();
                        }}
                        className="px-3 py-2 sm:py-1.5 text-xs font-medium rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors cursor-pointer flex items-center gap-1.5 min-h-[36px] sm:min-h-0 active:scale-95"
                      >
                        <span>🚪</span>
                        <span>{t.signOut}</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-sm shrink-0">
                      👤
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs leading-snug">
                        {language === 'tr' ? 'Hesap & Senkronizasyon' : 'Account & Sync'}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                        {t.notSignedIn}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onLogin();
                      onClose();
                    }}
                    className="flex items-center gap-2 px-3.5 py-2.5 sm:py-1.5 text-xs font-semibold rounded-xl sm:rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 active:scale-95 transition-all shrink-0 cursor-pointer shadow-xs min-h-[40px] sm:min-h-0"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{t.signInWithGoogle}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 1.5. Çalıştığın Alan & Bilişsel Motor Odağı */}
          <div
            id="work-domain-selector-card"
            className={`p-3.5 rounded-xl border transition-colors ${
              isDark ? 'bg-stone-850/80 border-stone-800' : 'bg-stone-50/70 border-stone-200/80'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm shrink-0">
                {selectedOption.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-xs leading-tight">
                  {language === 'tr' ? 'Çalıştığın Alan & Motor Odağı' : 'Career & Cognitive Focus'}
                </h3>
              </div>
            </div>

            {/* Seçim Açılır Menüsü */}
            <div className="relative">
              <select
                id="work-domain-select"
                aria-label="Çalıştığın Alan Seçimi"
                value={workDomain}
                onChange={(e) => {
                  if (onSelectWorkDomain) {
                    onSelectWorkDomain(e.target.value as ProfessionDomain);
                  }
                }}
                className={`w-full text-sm sm:text-xs font-medium py-3 sm:py-2 pl-3 pr-9 rounded-xl sm:rounded-lg border transition-all cursor-pointer outline-none appearance-none focus:ring-2 focus:ring-indigo-500/30 min-h-[44px] sm:min-h-0 ${
                  isDark
                    ? 'bg-stone-900 border-stone-750 text-stone-100 hover:border-stone-650'
                    : 'bg-white border-stone-300 text-stone-800 hover:border-stone-400 shadow-2xs'
                }`}
              >
                <optgroup label="Özel Durumlar">
                  {WORK_DOMAIN_OPTIONS.filter((o) => o.category === 'ozel').map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.icon} {opt.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Meslek & Uzmanlık Grupları">
                  {WORK_DOMAIN_OPTIONS.filter((o) => o.category === 'meslek').map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.icon} {opt.label}
                    </option>
                  ))}
                </optgroup>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. Sistem Ayarları Grubu (Görünüm, Bildirimler, Dil) */}
          <div className={`rounded-xl border divide-y transition-colors overflow-hidden ${
            isDark
              ? 'bg-stone-900 border-stone-800 divide-stone-800'
              : 'bg-white border-stone-200 divide-stone-150'
          }`}>
            {/* Görünüm (Tema) Satırı */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                  isDark ? 'bg-stone-800 text-amber-400' : 'bg-stone-100 text-amber-600'
                }`}>
                  {isDark ? '🌙' : '☀️'}
                </div>
                <div>
                  <p className="font-semibold text-xs leading-tight">{t.appearanceSection}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200/50 dark:border-stone-750">
                <button
                  type="button"
                  onClick={() => { if (isDark) onToggleTheme(); }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 min-h-[36px] sm:min-h-0 active:scale-95 ${
                    !isDark
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-200'
                  }`}
                >
                  <span>☀️</span>
                  <span>{language === 'tr' ? 'Açık' : 'Light'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { if (!isDark) onToggleTheme(); }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 min-h-[36px] sm:min-h-0 active:scale-95 ${
                    isDark
                      ? 'bg-stone-700 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <span>🌙</span>
                  <span>{language === 'tr' ? 'Koyu' : 'Dark'}</span>
                </button>
              </div>
            </div>

            {/* Bildirimler & Alarmlar Satırı */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                  notificationsEnabled
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                }`}>
                  {notificationsEnabled ? '🔔' : '🔕'}
                </div>
                <div>
                  <p className="font-semibold text-xs leading-tight">{t.notificationsSection}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200/50 dark:border-stone-750">
                <button
                  type="button"
                  onClick={() => { if (!notificationsEnabled) onToggleNotifications(); }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 min-h-[36px] sm:min-h-0 active:scale-95 ${
                    notificationsEnabled
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  <span>🔔</span>
                  <span>{language === 'tr' ? 'Açık' : 'On'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { if (notificationsEnabled) onToggleNotifications(); }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 min-h-[36px] sm:min-h-0 active:scale-95 ${
                    !notificationsEnabled
                      ? 'bg-stone-300 dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  <span>🔕</span>
                  <span>{language === 'tr' ? 'Kapalı' : 'Off'}</span>
                </button>
              </div>
            </div>

            {/* Dil Seçimi Satırı */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-sm text-stone-600 dark:text-stone-300">
                  🌐
                </div>
                <div>
                  <p className="font-semibold text-xs leading-tight">{t.languageSection}</p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {language === 'tr' ? 'Türkçe seçili' : 'English selected'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200/50 dark:border-stone-750">
                <button
                  type="button"
                  onClick={() => onSelectLanguage('tr')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 min-h-[36px] sm:min-h-0 active:scale-95 ${
                    language === 'tr'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  <span>🇹🇷</span>
                  <span>TR</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectLanguage('en')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 min-h-[36px] sm:min-h-0 active:scale-95 ${
                    language === 'en'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>EN</span>
                </button>
              </div>
            </div>

            {/* Geri Dönüşüm Kutusu Satırı */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-400/15 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm">
                  🗑️
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-xs leading-tight">{t.recycleBinTitle}</p>
                    {trashCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300">
                        {trashCount}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {language === 'tr' ? '30 gün saklanan silinmiş notlar' : 'Deleted notes kept for 30 days'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="settings-open-recycle-bin-btn"
                onClick={() => {
                  onClose();
                  onOpenRecycleBin?.();
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-all cursor-pointer flex items-center gap-1 min-h-[36px] sm:min-h-0 active:scale-95"
              >
                <span>{language === 'tr' ? 'Aç' : 'Open'}</span>
                <span>›</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Kapat Butonu */}
        <div className="mt-5 pt-3 border-t border-stone-200 dark:border-stone-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 sm:py-2.5 px-4 rounded-xl text-sm sm:text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-xs text-center min-h-[44px] flex items-center justify-center"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
