import React from 'react';
import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';

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
}) => {
  if (!isOpen) return null;

  const t = translations[language];
  const isDark = theme === 'dark';

  return (
    <div
      id="settings-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="settings-modal"
        className={`w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden p-5 transition-colors ${
          isDark
            ? 'bg-stone-900 border-stone-800 text-stone-100'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 text-base">
              ⚙️
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">{t.settingsHeader}</h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Notivia Tercihleri ve Profil</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark
                ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Ana Ayar Listesi (Modern Uncluttered Grouped Card) */}
        <div className="space-y-4">
          {/* 1. Profil & Google Giriş Bölümü */}
          <div className={`p-3.5 rounded-xl border transition-colors ${
            isDark ? 'bg-stone-850/80 border-stone-800' : 'bg-stone-50/70 border-stone-200/80'
          }`}>
            <div className="flex items-center justify-between gap-3">
              {activeUser ? (
                <>
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
                      <p className="font-semibold text-xs truncate leading-snug">
                        {activeUser.displayName || 'Kullanıcı'}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                        {activeUser.email || ''}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onSignOut();
                      onClose();
                    }}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/10 hover:bg-red-500/15 text-red-600 dark:text-red-400 transition-colors shrink-0 cursor-pointer"
                  >
                    {t.signOut}
                  </button>
                </>
              ) : (
                <>
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
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 active:scale-98 transition-all shrink-0 cursor-pointer shadow-xs"
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
                </>
              )}
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
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                  isDark ? 'bg-stone-800 text-amber-400' : 'bg-stone-100 text-amber-600'
                }`}>
                  {isDark ? '🌙' : '☀️'}
                </div>
                <div>
                  <p className="font-semibold text-xs leading-tight">{t.appearanceSection}</p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {isDark ? t.themeDark : t.themeLight}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleTheme}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isDark ? 'bg-amber-500' : 'bg-stone-300'
                }`}
                role="switch"
                aria-checked={isDark}
                aria-label={isDark ? t.themeLight : t.themeDark}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isDark ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Bildirimler & Alarmlar Satırı (Temizlenmiş, profesyonel optimize edilmiş) */}
            <div className="p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                    notificationsEnabled
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}>
                    {notificationsEnabled ? '🔔' : '🔕'}
                  </div>
                  <div>
                    <p className="font-semibold text-xs leading-tight">{t.notificationsSection}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {notificationsEnabled ? t.notificationsEnabled : t.notificationsDisabled}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  id="notification-toggle-switch"
                  onClick={onToggleNotifications}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notificationsEnabled ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                  role="switch"
                  aria-checked={notificationsEnabled}
                  aria-label={notificationsEnabled ? t.disableNotifications : t.enableNotifications}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Bildirimler Açıkken Minimalist Eylem Butonları */}
              {notificationsEnabled && (
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-100 dark:border-stone-800/80">
                  {onSendTestNotification && (
                    <button
                      type="button"
                      onClick={onSendTestNotification}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>🔔</span>
                      <span>{t.sendTestNotification}</span>
                    </button>
                  )}

                  {onRemindTodayTasks && (
                    <button
                      type="button"
                      onClick={onRemindTodayTasks}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>📋</span>
                      <span>{t.todaySummaryNotification}</span>
                    </button>
                  )}
                </div>
              )}
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
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-lg border border-stone-200/50 dark:border-stone-750">
                <button
                  type="button"
                  onClick={() => onSelectLanguage('tr')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
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
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
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
          </div>
        </div>

        {/* Footer Kapat Butonu */}
        <div className="mt-5 pt-3 border-t border-stone-200 dark:border-stone-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-xs text-center"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
