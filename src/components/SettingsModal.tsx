import React from 'react';
import {
  X,
  User,
  RefreshCw,
  LogOut,
  Cloud,
  Calendar,
  Bell,
  BellOff,
  Sun,
  Moon,
  Globe,
  Trash2,
  LayoutGrid,
  List,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Layers,
  Check,
  Sparkles,
  CheckCircle2,
  Brain,
  Shield,
  Clock,
  Search
} from 'lucide-react';
import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';
import type { ProfessionDomain, WorkDomainCluster } from '../types/domainThemes.ts';
import {
  getLocalizedWorkDomainOptions,
  getLocalizedWorkDomainClusters,
  getDomainCluster
} from '../types/domainThemes.ts';
import { loadUserCognitiveProfile, type UserCognitiveProfile } from '../services/userLearningService.ts';

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
  onTriggerEveningSummary?: () => void;
  isTriggeringEveningSummary?: boolean;
  workDomain?: ProfessionDomain;
  onSelectWorkDomain?: (domain: ProfessionDomain) => void;
  onSyncDrive?: () => void;
  isSyncingDrive?: boolean;
  driveSyncTime?: string | null;
  isDriveConnected?: boolean;
  onConnectDrive?: () => void;
  onSyncAllCalendar?: () => void;
  isSyncingCalendar?: boolean;
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
  onTriggerEveningSummary,
  isTriggeringEveningSummary = false,
  workDomain = 'GENEL',
  onSelectWorkDomain,
  onSyncDrive,
  isSyncingDrive = false,
  driveSyncTime,
  isDriveConnected = false,
  onConnectDrive,
  onSyncAllCalendar,
  isSyncingCalendar = false,
  viewMode,
  onToggleViewMode,
  onOpenRecycleBin,
  trashCount = 0,
}) => {
  const [cognitiveProfile, setCognitiveProfile] = React.useState<UserCognitiveProfile>(() => loadUserCognitiveProfile());
  const [expandedClusterId, setExpandedClusterId] = React.useState<string | null>(() => getDomainCluster(workDomain)?.id || null);
  const [isSectorPickerOpen, setIsSectorPickerOpen] = React.useState(false);
  const [sectorSearchQuery, setSectorSearchQuery] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setCognitiveProfile(loadUserCognitiveProfile());
      const cluster = getDomainCluster(workDomain);
      if (cluster) {
        setExpandedClusterId(cluster.id);
      }
    }
  }, [isOpen, workDomain]);

  const localizedDomainOptions = getLocalizedWorkDomainOptions(language);
  const localizedClusters = getLocalizedWorkDomainClusters(language);
  const activeCluster = getDomainCluster(workDomain);
  const selectedOption = localizedDomainOptions.find((opt) => opt.id === workDomain) || localizedDomainOptions[0];

  const filteredClusters = React.useMemo(() => {
    if (!sectorSearchQuery.trim()) return localizedClusters;
    const q = sectorSearchQuery.toLowerCase().trim();
    return localizedClusters.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.sublabel.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [localizedClusters, sectorSearchQuery]);

  if (!isOpen) return null;

  const t = translations[language];
  const isDark = theme === 'dark';



  return (
    <div
      id="settings-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-heading"
    >
      <div
        id="settings-modal"
        className={`w-full sm:max-w-lg rounded-t-[28px] sm:rounded-2xl shadow-2xl border-t sm:border overflow-hidden transition-all max-h-[92dvh] sm:max-h-[88vh] flex flex-col ${
          isDark
            ? 'bg-stone-900 border-stone-800 text-stone-100'
            : 'bg-stone-50 border-stone-200 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobil Tutamaç (Drawer Grab Handle) */}
        <div className="pt-3 pb-1 sm:hidden flex justify-center shrink-0">
          <div className="w-10 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 pt-3 sm:pt-5 pb-3.5 border-b border-stone-200/80 dark:border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-200/70 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 shrink-0">
              <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            </div>
            <div>
              <h2 id="settings-heading" className="text-base font-bold tracking-tight leading-tight">
                {t.settingsHeader}
              </h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {language === 'tr' ? 'Uygulama tercihleri ve bilişsel odak' : 'App preferences and cognitive engine'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Modal Scrollable İçerik */}
        <div className="overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 space-y-4 sm:space-y-5 flex-1 focus:outline-none">
          
          {/* 1. HESAP & BULUT SENKRONİZASYONU */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold tracking-wider uppercase px-1 text-stone-400 dark:text-stone-500">
              {language === 'tr' ? 'Hesap & Senkronizasyon' : 'Account & Sync'}
            </span>

            <div className={`p-3.5 sm:p-4 rounded-2xl border transition-colors ${
              isDark ? 'bg-stone-850/90 border-stone-800' : 'bg-white border-stone-200/90 shadow-2xs'
            }`}>
              {activeUser ? (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={
                            activeUser.photoURL ||
                            `https://api.dicebear.com/7.x/identicon/svg?seed=${activeUser.uid}`
                          }
                          alt="User Avatar"
                          className="w-11 h-11 rounded-full object-cover border-2 border-stone-200 dark:border-stone-700"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-850" title="Aktif Google Hesabı" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-xs sm:text-sm truncate leading-snug">
                          {activeUser.displayName || 'Kullanıcı'}
                        </p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                          {activeUser.email || 'Google Hesabı'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onSignOut();
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-medium rounded-xl text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/40 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer min-h-[36px]"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.signOut}</span>
                    </button>
                  </div>

                  {/* Bulut & Senkronizasyon Durum Paneli */}
                  <div className={`space-y-2 p-2.5 rounded-xl text-[11px] ${
                    isDark ? 'bg-stone-800/80 text-stone-300' : 'bg-stone-100/80 text-stone-600'
                  }`}>
                    {/* 1. Firestore Gerçek Zamanlı Bulut Eşitleme (Herkes için kesintisiz aktif) */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="font-medium text-stone-700 dark:text-stone-200">
                          {language === 'tr' ? 'Notivia Bulut (Firestore):' : 'Notivia Cloud (Firestore):'}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {language === 'tr' ? 'Gerçek Zamanlı Aktif ✓' : 'Real-time Active ✓'}
                        </span>
                      </div>
                    </div>

                    {/* 2. Google Drive & Takvim Eşitlemesi (İsteğe bağlı ek katman) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-stone-200/60 dark:border-stone-700/60">
                      <div className="flex items-center gap-2 min-w-0">
                        <Cloud className={`w-3.5 h-3.5 shrink-0 ${isDriveConnected ? 'text-sky-500' : 'text-stone-400'}`} />
                        <span className="truncate">
                          {isDriveConnected
                            ? (driveSyncTime
                                ? `${language === 'tr' ? 'Drive Eşitlendi:' : 'Drive Synced:'} ${driveSyncTime}`
                                : (language === 'tr' ? 'Drive & Takvim: Bağlı ✓' : 'Drive & Calendar: Connected ✓'))
                            : (language === 'tr' ? 'Drive & Takvim: İsteğe Bağlı' : 'Drive & Calendar: Optional')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isDriveConnected ? (
                          <>
                            {onSyncDrive && (
                              <button
                                type="button"
                                onClick={onSyncDrive}
                                disabled={isSyncingDrive}
                                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                                  isDark
                                    ? 'bg-stone-750 hover:bg-stone-700 text-stone-200'
                                    : 'bg-white hover:bg-stone-200 text-stone-800 shadow-2xs'
                                }`}
                              >
                                <RefreshCw className={`w-3 h-3 ${isSyncingDrive ? 'animate-spin text-indigo-500' : ''}`} />
                                <span>{isSyncingDrive ? (language === 'tr' ? 'Eşitleniyor...' : 'Syncing...') : (language === 'tr' ? 'Eşitle' : 'Sync')}</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={onConnectDrive || onLogin}
                              title="Google oturumunu ve Drive erişim yetkisini yenile"
                              className="px-2 py-1 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors cursor-pointer"
                            >
                              {language === 'tr' ? 'Yenile' : 'Refresh'}
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={onConnectDrive || onLogin}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-sky-500 hover:bg-sky-600 text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
                          >
                            {language === 'tr' ? 'Drive & Takvim Bağla' : 'Connect Drive & Cal'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 3. Google Takvim Doğrudan Otomatik Entegrasyonu */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-stone-200/60 dark:border-stone-700/60">
                      <div className="flex items-center gap-2 min-w-0">
                        <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">
                          {language === 'tr' ? 'Google Takvim Otomatik Senkron:' : 'Google Calendar Auto Sync:'}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {language === 'tr' ? 'Doğrudan Entegre ✓' : 'Direct Sync ✓'}
                        </span>
                      </div>

                      {onSyncAllCalendar && (
                        <button
                          type="button"
                          onClick={onSyncAllCalendar}
                          disabled={isSyncingCalendar}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                            isDark
                              ? 'bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/60'
                              : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 shadow-2xs'
                          }`}
                        >
                          <RefreshCw className={`w-3 h-3 ${isSyncingCalendar ? 'animate-spin text-blue-500' : ''}`} />
                          <span>
                            {isSyncingCalendar
                              ? (language === 'tr' ? 'Takvime Aktarılıyor...' : 'Syncing...')
                              : (language === 'tr' ? 'Tüm Notları Takvime Eşitle' : 'Sync All to Calendar')}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm leading-tight">
                        {language === 'tr' ? 'Google ile Giriş Yap' : 'Sign in with Google'}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal">
                        {language === 'tr'
                          ? 'Tüm cihazlarınızda gerçek zamanlı bulut eşitlemesi için tek tıkla bağlanın'
                          : 'Sign in with Google for real-time cloud sync across all your devices'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onLogin();
                      onClose();
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 active:scale-98 transition-all shrink-0 cursor-pointer shadow-xs min-h-[44px]"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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

          {/* 2. ÇALIŞTIĞIN SEKTÖR & BİLİŞSEL ODAK */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold tracking-wider uppercase text-stone-400 dark:text-stone-500">
                {language === 'tr' ? 'Bilişsel Motor Odağı' : 'Cognitive Engine Focus'}
              </span>
              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200/80 dark:border-indigo-800/50">
                {language === 'tr' ? '10 Odak Grubu' : '10 Focus Groups'}
              </span>
            </div>

            <div
              id="work-domain-selector-card"
              className={`p-3 rounded-2xl border transition-all space-y-2.5 ${
                isDark ? 'bg-stone-850/90 border-stone-800' : 'bg-white border-stone-200/90 shadow-2xs'
              }`}
            >
              {/* Aktif Bilişsel Motor Özet Kartı & Inline Açılır Menü Butonu */}
              <button
                type="button"
                onClick={() => setIsSectorPickerOpen((prev) => !prev)}
                className="w-full p-3 rounded-xl bg-stone-100/80 dark:bg-stone-800/70 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-750 flex items-center justify-between gap-3 text-left transition-all cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-2xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${activeCluster.color}35` }}
                  >
                    {activeCluster.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-xs sm:text-sm leading-tight truncate text-stone-900 dark:text-stone-100">
                        {activeCluster.label}
                      </h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" title="Aktif Motor" />
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                      {workDomain === activeCluster.id
                        ? (language === 'tr' ? 'Tam Çatı Küme Motoru' : 'Full Focus Cluster')
                        : (selectedOption.label || activeCluster.sublabel)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-600 text-white flex items-center gap-1 shadow-2xs">
                    <span>{isSectorPickerOpen ? (language === 'tr' ? 'Kapat' : 'Close') : (language === 'tr' ? 'Değiştir' : 'Change')}</span>
                    {isSectorPickerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </span>
                </div>
              </button>

              {/* AYNI PENCERE İÇİNDE AÇILAN BASİT DÜŞEY LİSTE (ALT ALTA SEÇENEKLER) */}
              {isSectorPickerOpen && (
                <div className="space-y-2 pt-1.5 border-t border-stone-200/80 dark:border-stone-800 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">
                      {language === 'tr' ? 'Bir Sektör / Odak Grubu Seçin:' : 'Select an Industry / Focus Group:'}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {language === 'tr' ? 'Alt alta tıklayarak seçin' : 'Click to select below'}
                    </span>
                  </div>

                  {/* Basit Arama İptali/Araması */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={sectorSearchQuery}
                      onChange={(e) => setSectorSearchQuery(e.target.value)}
                      placeholder={language === 'tr' ? 'Sektör ara (Örn: Sağlık, Sanayi)...' : 'Search sector...'}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-xl border border-stone-200 dark:border-stone-750 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Alt Alta Düşey Liste */}
                  <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-0.5 scrollbar-thin">
                    {filteredClusters.map((cluster) => {
                      const isClusterSelected =
                        workDomain === cluster.id ||
                        activeCluster.id === cluster.id ||
                        cluster.subDomains.includes(workDomain as any);

                      const isExpanded = expandedClusterId === cluster.id;

                      return (
                        <div
                          key={cluster.id}
                          className={`rounded-xl border transition-all overflow-hidden ${
                            isClusterSelected
                              ? isDark
                                ? 'bg-indigo-950/40 border-indigo-500/80 ring-1 ring-indigo-500/40'
                                : 'bg-indigo-50 border-indigo-300 ring-1 ring-indigo-500/30'
                              : isDark
                              ? 'bg-stone-800/50 border-stone-750 hover:bg-stone-800'
                              : 'bg-stone-50/80 border-stone-200/90 hover:bg-stone-100/80'
                          }`}
                        >
                          {/* Satır Seçeneği */}
                          <div
                            onClick={() => {
                              onSelectWorkDomain?.(cluster.id as ProfessionDomain);
                              setExpandedClusterId(cluster.id);
                              setIsSectorPickerOpen(false);
                            }}
                            className="p-2.5 flex items-center justify-between gap-2.5 cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                                style={{ backgroundColor: `${cluster.color}35` }}
                              >
                                {cluster.icon}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <h4 className="font-semibold text-xs text-stone-900 dark:text-stone-100 truncate">
                                    {cluster.label}
                                  </h4>
                                  {isClusterSelected && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                  )}
                                </div>
                                <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                                  {cluster.sublabel}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={() => setExpandedClusterId(isExpanded ? null : cluster.id)}
                                className="px-2 py-0.5 rounded-md text-[10px] font-medium text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 bg-stone-200/60 dark:bg-stone-750 transition-colors cursor-pointer flex items-center gap-0.5"
                              >
                                <span>{cluster.subDomains.length} {language === 'tr' ? 'Alt Branş' : 'Fields'}</span>
                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>

                          {/* Alt Branş İnce Ayarı */}
                          {isExpanded && (
                            <div className="px-2.5 pb-2 pt-1 border-t border-stone-200/60 dark:border-stone-750 bg-white/50 dark:bg-stone-900/50 space-y-1">
                              <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
                                {language === 'tr' ? 'Özel Alt Branş Seçin:' : 'Sub-discipline:'}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    onSelectWorkDomain?.(cluster.id as ProfessionDomain);
                                    setIsSectorPickerOpen(false);
                                  }}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all cursor-pointer ${
                                    workDomain === cluster.id
                                      ? 'bg-indigo-600 text-white shadow-2xs'
                                      : isDark
                                      ? 'bg-stone-800 text-stone-300 hover:bg-stone-750'
                                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                                  }`}
                                >
                                  ✓ {language === 'tr' ? 'Tüm Çatı Motoru' : 'Full Cluster'}
                                </button>

                                {cluster.subDomains.map((subId) => {
                                  const opt = localizedDomainOptions.find((o) => o.id === subId);
                                  const isSubActive = workDomain === subId;
                                  return (
                                    <button
                                      key={subId}
                                      type="button"
                                      onClick={() => {
                                        onSelectWorkDomain?.(subId);
                                        setIsSectorPickerOpen(false);
                                      }}
                                      className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all cursor-pointer ${
                                        isSubActive
                                          ? 'bg-indigo-600 text-white shadow-2xs'
                                          : isDark
                                          ? 'bg-stone-800 text-stone-300 hover:bg-stone-750'
                                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                                      }`}
                                    >
                                      {opt?.icon || '•'} {opt?.label ? opt.label.split('(')[0].trim() : subId}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>



          {/* 4. UYGULAMA TERCİHLERİ (Görünüm, Düzen, Bildirimler, Dil) */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold tracking-wider uppercase px-1 text-stone-400 dark:text-stone-500">
              {language === 'tr' ? 'Uygulama Tercihleri' : 'Preferences'}
            </span>

            <div className={`rounded-2xl border divide-y transition-colors overflow-hidden ${
              isDark
                ? 'bg-stone-850/90 border-stone-800 divide-stone-800'
                : 'bg-white border-stone-200/90 divide-stone-150 shadow-2xs'
            }`}>
              {/* Görünüm (Tema) */}
              <div className="flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-stone-800 text-amber-400' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm leading-tight">{t.appearanceSection}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {isDark ? (language === 'tr' ? 'Koyu Tema' : 'Dark Mode') : (language === 'tr' ? 'Açık Tema' : 'Light Mode')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200/60 dark:border-stone-750">
                  <button
                    type="button"
                    onClick={() => { if (isDark) onToggleTheme(); }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] active:scale-95 ${
                      !isDark
                        ? 'bg-white text-stone-900 shadow-2xs'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>{language === 'tr' ? 'Açık' : 'Light'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { if (!isDark) onToggleTheme(); }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] active:scale-95 ${
                      isDark
                        ? 'bg-stone-700 text-white shadow-2xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>{language === 'tr' ? 'Koyu' : 'Dark'}</span>
                  </button>
                </div>
              </div>

              {/* Görünüm Düzeni (Single / Grid View) */}
              {onToggleViewMode && viewMode && (
                <div className="flex items-center justify-between p-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400 shrink-0">
                      {viewMode === 'grid' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm leading-tight">
                        {language === 'tr' ? 'Not Görünümü' : 'Layout View'}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        {viewMode === 'grid'
                          ? (language === 'tr' ? 'Izgara görünümü' : 'Grid layout')
                          : (language === 'tr' ? 'Tek liste görünümü' : 'Single list')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200/60 dark:border-stone-750">
                    <button
                      type="button"
                      onClick={() => { if (viewMode !== 'single') onToggleViewMode(); }}
                      className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] active:scale-95 ${
                        viewMode === 'single'
                          ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs'
                          : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
                      }`}
                      title={language === 'tr' ? 'Tek Liste' : 'Single List'}
                    >
                      <List className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{language === 'tr' ? 'Liste' : 'List'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { if (viewMode !== 'grid') onToggleViewMode(); }}
                      className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] active:scale-95 ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs'
                          : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
                      }`}
                      title={language === 'tr' ? 'Izgara' : 'Grid'}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{language === 'tr' ? 'Izgara' : 'Grid'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bildirimler & Alarmlar */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      notificationsEnabled
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
                    }`}>
                      {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm leading-tight">{t.notificationsSection}</p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        {notificationsEnabled
                          ? (language === 'tr' ? 'Sesli ve titreşimli alarmlar aktif' : 'Sound & vibration alarms on')
                          : (language === 'tr' ? 'Alarmlar sessiz modda' : 'Alarms muted')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200/60 dark:border-stone-750">
                    <button
                      type="button"
                      onClick={() => { if (!notificationsEnabled) onToggleNotifications(); }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] active:scale-95 ${
                        notificationsEnabled
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                      }`}
                    >
                      <span>{language === 'tr' ? 'Açık' : 'On'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { if (notificationsEnabled) onToggleNotifications(); }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] active:scale-95 ${
                        !notificationsEnabled
                          ? 'bg-stone-300 dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs'
                          : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                      }`}
                    >
                      <span>{language === 'tr' ? 'Kapalı' : 'Off'}</span>
                    </button>
                  </div>
                </div>

                {/* Bildirim Test Aksiyonları */}
                {notificationsEnabled && notificationSupported && onSendTestNotification && (
                  <div className="pt-1 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={onSendTestNotification}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>🔔</span>
                      <span>{language === 'tr' ? 'Test Bildirimi Gönder' : 'Send Test Notification'}</span>
                    </button>
                    {onRemindTodayTasks && (
                      <button
                        type="button"
                        onClick={onRemindTodayTasks}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <span>📅</span>
                        <span>{language === 'tr' ? 'Bugünün Görevlerini Bildir' : 'Remind Today Tasks'}</span>
                      </button>
                    )}
                    {onTriggerEveningSummary && (
                      <button
                        type="button"
                        onClick={onTriggerEveningSummary}
                        disabled={isTriggeringEveningSummary}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
                      >
                        <span>📬</span>
                        <span>
                          {isTriggeringEveningSummary
                            ? (language === 'tr' ? 'Özetleniyor...' : 'Summarizing...')
                            : (language === 'tr' ? '20:00 Günün Özetini Çalıştır' : 'Run 20:00 Daily Summary')}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Dil Seçimi */}
              <div className="flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm leading-tight">{t.languageSection}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {language === 'tr' ? 'Türkçe (TR)' : 'English (UK)'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200/60 dark:border-stone-750">
                  <button
                    type="button"
                    onClick={() => onSelectLanguage('tr')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] active:scale-95 ${
                      language === 'tr'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs'
                        : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                    }`}
                  >
                    <span>🇹🇷</span>
                    <span>TR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectLanguage('en')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] active:scale-95 ${
                      language === 'en'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs'
                        : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>EN</span>
                  </button>
                </div>
              </div>

              {/* Geri Dönüşüm Kutusu */}
              <div className="flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-400/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-xs sm:text-sm leading-tight">{t.recycleBinTitle}</p>
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
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-200 transition-all cursor-pointer flex items-center gap-1 min-h-[36px] active:scale-95"
                >
                  <span>{language === 'tr' ? 'Aç' : 'Open'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>



        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200/80 dark:border-stone-800 shrink-0 bg-white/50 dark:bg-stone-900/50 backdrop-blur-xs">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 sm:py-2.5 px-4 rounded-xl text-sm font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs text-center min-h-[44px] flex items-center justify-center gap-2"
          >
            <span>{t.close}</span>
          </button>
          <p className="text-center text-[10px] text-stone-400 dark:text-stone-500 mt-2 font-medium">
            Notivia v2.4 • {language === 'tr' ? 'Bilişsel Yaşam Asistanı' : 'Cognitive Life Assistant'}
          </p>
        </div>
      </div>
    </div>
  );
};
