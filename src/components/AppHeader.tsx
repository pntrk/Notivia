import React from 'react';

export interface AppHeaderProps {
  theme: 'light' | 'dark';
  viewMode: 'single' | 'grid';
  showSearch: boolean;
  trashCount: number;
  activeUser: any;
  t: {
    singleView: string;
    dualGridView: string;
    searchTitle: string;
    recycleBinTitle: string;
    settingsTitle: string;
    [key: string]: string;
  };
  onToggleViewMode: () => void;
  onToggleSearch: () => void;
  onOpenTrash: () => void;
  onOpenSettings: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  theme,
  viewMode,
  showSearch,
  trashCount,
  activeUser,
  t,
  onToggleViewMode,
  onToggleSearch,
  onOpenTrash,
  onOpenSettings,
}) => {
  return (
    <header className="px-6 pt-6 pb-2 flex justify-between items-center">
      <div className="flex items-center gap-2.5">
        <img
          src="/icon.svg"
          alt="Notivia Logo"
          className="w-7 h-7 rounded-lg shadow-xs ring-1 ring-stone-900/10 dark:ring-white/15 shrink-0 object-contain"
          width={28}
          height={28}
        />
        <h1 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>
          Notivia
        </h1>
      </div>

      <div id="auth-container" className="flex items-center gap-2">
        {/* Görünüm Modu Toggle (Tekli / İkili Izgara) */}
        <button
          id="view-mode-toggle-btn"
          type="button"
          onClick={onToggleViewMode}
          title={viewMode === 'grid' ? t.singleView : t.dualGridView}
          className={`p-1.5 rounded-full transition-all cursor-pointer active:scale-95 ${
            viewMode === 'grid'
              ? theme === 'dark'
                ? 'text-amber-300 bg-stone-800 ring-1 ring-amber-400/30'
                : 'text-stone-900 bg-stone-200 ring-1 ring-stone-300'
              : theme === 'dark'
              ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
          }`}
        >
          {viewMode === 'grid' ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Arama Toggle */}
        <button
          type="button"
          onClick={onToggleSearch}
          title={t.searchTitle}
          className={`p-1.5 rounded-full transition-colors cursor-pointer active:scale-95 ${
            showSearch 
              ? theme === 'dark' ? 'text-white bg-stone-800' : 'text-stone-900 bg-stone-200'
              : theme === 'dark' ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Geri Dönüşüm Kutusu Butonu (30 Günlük Saklama) */}
        <button
          id="recycle-bin-top-btn"
          type="button"
          onClick={onOpenTrash}
          title={t.recycleBinTitle}
          className={`relative p-1.5 rounded-full transition-all cursor-pointer active:scale-95 ${
            trashCount > 0
              ? theme === 'dark'
                ? 'text-amber-400 hover:bg-stone-800 hover:text-amber-300'
                : 'text-amber-600 hover:bg-stone-100 hover:text-amber-700'
              : theme === 'dark'
              ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {trashCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center border border-white dark:border-stone-900 leading-none">
              {trashCount > 99 ? '99+' : trashCount}
            </span>
          )}
        </button>

        {/* Ayarlar ve Profil Butonu */}
        <button
          id="user-avatar-btn"
          type="button"
          onClick={onOpenSettings}
          title={t.settingsTitle}
          className={`relative p-1.5 rounded-full border transition-all active:scale-95 cursor-pointer ${
            theme === 'dark'
              ? 'border-stone-700 bg-stone-800/80 text-stone-200 hover:bg-stone-700 hover:border-stone-600'
              : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
          }`}
        >
          {activeUser ? (
            <div className="w-5 h-5 rounded-full overflow-hidden relative">
              <img
                id="user-avatar"
                src={
                  activeUser.photoURL ||
                  `https://api.dicebear.com/7.x/identicon/svg?seed=${activeUser.uid}`
                }
                alt={activeUser.displayName || 'Profile'}
                className="w-full h-full object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
            </div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};
