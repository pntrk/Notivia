// Localization (i18n) dictionary for Notivia
export type Language = 'tr' | 'en';

export interface Translations {
  appName: string;
  driveSynced: string;
  driveSyncing: string;
  localMode: string;
  syncNow: string;
  syncTooltip: string;
  localModeTooltip: string;
  searchPlaceholder: string;
  searchTitle: string;
  multiSelectTitle: string;
  exitMultiSelectTitle: string;
  keyboardToggleTitle: string;
  cameraToggleTitle: string;
  settingsTitle: string;
  
  // Settings modal
  settingsHeader: string;
  profileSection: string;
  signedInAs: string;
  notSignedIn: string;
  signInWithGoogle: string;
  signOut: string;
  confirmSignOut: string;
  appearanceSection: string;
  themeDark: string;
  themeLight: string;
  notificationsSection: string;
  notificationsEnabled: string;
  notificationsDisabled: string;
  enableNotifications: string;
  disableNotifications: string;
  notificationsUnsupported: string;
  sendTestNotification: string;
  todaySummaryNotification: string;
  assistantNotificationsDesc: string;
  prepReminderFeature: string;
  appointmentsFeature: string;
  periodicFeature: string;
  languageSection: string;
  close: string;

  // Input & Prompts
  manualInputPlaceholder: string;
  addButton: string;
  speakOrWrite: string;
  listening: string;
  audioProcessing: string;
  analyzingImage: string;
  readyStatus: string;
  tapToSpeak: string;
  stopListening: string;
  pressAndHold: string;

  // Card items & actions
  emptyNotesTitle: string;
  emptyNotesDesc: string;
  noSearchResults: string;
  noSearchResultsDesc: string;
  share: string;
  delete: string;
  editTitle: string;
  save: string;
  cancel: string;
  undo: string;
  noteDeleted: string;
  noteRestored: string;
  notesDeleted: string;
  tasksProgress: string;
  calendarExport: string;
  markDone: string;
  markUndone: string;
  copiedToClipboard: string;
  noteShared: string;

  // Periodic & conflict
  conflictDetected: string;
  preparationNote: string;
  recurringMonthly: string;
  recurringDays: string;

  // Additional batch and card labels
  selectAll: string;
  clearSelection: string;
  selectedCount: string;
  deleteSelected: string;
  cancelSelection: string;
  manualNoteTitle: string;
  manualNotePlaceholder: string;
  manualDateTimePlaceholder: string;
  syncWithGoogleCalendar: string;
  expired: string;
  uncompleted: string;
  noReminder: string;
  onCalendar: string;
  recurringBadge: string;
  addToDeviceCalendar: string;
  addedToDeviceCalendar: string;
  conflictsWith: string;
  preparationSteps: string;
  listeningActive: string;

  // Aliases for backward & UI compatibility
  expiredBadge: string;
  incompleteStatus: string;
  conditionLabel: string;
  prepLeadTime: string;
  inCalendarBadge: string;
  periodicBadge: string;
  exportDeviceCalendar: string;
  prepStepsTitle: string;
  shareOrCopy: string;
  deleteNoteTitle: string;
  reopenTitle: string;
  completeTitle: string;
  cameraTitle: string;
  deletedToast: string;
  undoButton: string;
  manualModalTitle: string;
  manualModalTitlePlaceholder: string;
  syncToGoogleCalendar: string;
  saveButton: string;
}

export const translations: Record<Language, Translations> = {
  tr: {
    appName: 'Notivia',
    driveSynced: 'Google Drive Yedekli',
    driveSyncing: 'Drive Eşitleniyor...',
    localMode: 'Lokal Mod',
    syncNow: "Google Drive'dan şimdi eşitle",
    syncTooltip: 'Google Drive Yedekli',
    localModeTooltip: 'Kişisel verileriniz sadece bu cihazda saklanır',
    searchPlaceholder: 'Notlarda ara (isim, borç, araba, tarih)...',
    searchTitle: 'Notlarda ara',
    multiSelectTitle: 'Çoklu not seç / sil',
    exitMultiSelectTitle: 'Çoklu seçimden çık',
    keyboardToggleTitle: 'Metin ile yaz',
    cameraToggleTitle: 'Fotoğraf Çek / Görsel Yükle',
    settingsTitle: 'Ayarlar ve Profil',

    settingsHeader: 'Ayarlar',
    profileSection: 'Hesap & Profil',
    signedInAs: 'Oturum açık',
    notSignedIn: 'Giriş yapılmadı (Lokal Mod)',
    signInWithGoogle: 'Google ile Giriş Yap',
    signOut: 'Çıkış Yap',
    confirmSignOut: 'Hesaptan çıkış yapılsın mı?',
    appearanceSection: 'Görünüm',
    themeDark: 'Karanlık Mod',
    themeLight: 'Aydınlık Mod',
    notificationsSection: 'Bildirimler',
    notificationsEnabled: 'Bildirimler Aktif',
    notificationsDisabled: 'Bildirimler Kapalı',
    enableNotifications: 'Bildirimleri Aç',
    disableNotifications: 'Bildirimleri Kapat',
    notificationsUnsupported: 'Bu tarayıcı bildirimleri desteklemiyor',
    sendTestNotification: 'Test Bildirimi Gönder',
    todaySummaryNotification: "Günün Programını Hatırlat",
    assistantNotificationsDesc: 'İzin verildiğinde Notivia asistanı randevu, ön hazırlık ve periyodik görevlerinizi cihazınıza bildirim olarak iletir.',
    prepReminderFeature: '⏳ Ön Hazırlık Adımları (Biyometrik foto, evrak vb.)',
    appointmentsFeature: '📌 Yaklaşan Randevu & Zamanlı Notlar',
    periodicFeature: '🔄 Periyodik & Düzenli Rutinler (Ay sonu vb.)',
    languageSection: 'Dil / Language',
    close: 'Kapat',

    manualInputPlaceholder: 'Salı 19:00 Ahmet abiyle çay...',
    addButton: 'Ekle',
    speakOrWrite: 'Söyle, çek ya da yaz',
    listening: 'Dinliyor...',
    audioProcessing: 'Ses işleniyor...',
    analyzingImage: 'Görsel analiz ediliyor...',
    readyStatus: 'Hazır',
    tapToSpeak: 'Konuşmak için dokun',
    stopListening: 'Kaydı durdur',
    pressAndHold: 'Basılı tutarak konuşun ya da dokunun',

    emptyNotesTitle: 'Henüz not yok',
    emptyNotesDesc: 'Konuş veya fotoğraf çek ya da klavye ile not ekle.',
    noSearchResults: 'Aramanızla eşleşen not bulunamadı.',
    noSearchResultsDesc: 'Farklı bir arama terimi deneyin.',
    share: 'Paylaş',
    delete: 'Sil',
    editTitle: 'Başlığı Düzenle',
    save: 'Kaydet',
    cancel: 'İptal',
    undo: 'Geri Al',
    noteDeleted: 'silindi',
    noteRestored: 'Not geri yüklendi',
    notesDeleted: 'not silindi',
    tasksProgress: 'Ön Hazırlık Adımı',
    calendarExport: 'Cihaz Takvimine Ekle',
    markDone: 'Tamamlandı yap',
    markUndone: 'Geri aç',
    copiedToClipboard: 'Not metni panoya kopyalandı ✓',
    noteShared: 'Not paylaşıldı ✓',

    conflictDetected: 'Çakışma Uyarısı',
    preparationNote: 'Ön Hazırlık',
    recurringMonthly: 'Ay Sonu Tekrarlı',
    recurringDays: 'Periyodik',

    selectAll: 'Tümünü Seç',
    clearSelection: 'Seçimi Kaldır',
    selectedCount: 'seçili',
    deleteSelected: 'Seçilenleri Sil',
    cancelSelection: 'İptal',
    manualNoteTitle: 'Manuel Not Oluştur',
    manualNotePlaceholder: 'Not başlığı (örn: Kira Ödemesi)',
    manualDateTimePlaceholder: 'Tarih ve Saat',
    syncWithGoogleCalendar: "Google Takvim'e işle",
    expired: 'Vadesi Geçti',
    uncompleted: 'Tamamlanmadı',
    noReminder: 'Hatırlatıcı yok',
    onCalendar: 'Takvimde',
    recurringBadge: 'Döngüsel',
    addToDeviceCalendar: 'Cihaz Takvimine Ekle',
    addedToDeviceCalendar: 'Cihaz takvimine (.ics) aktarıldı',
    conflictsWith: 'ile çakışıyor',
    preparationSteps: 'Ön Hazırlık Adımı',
    listeningActive: 'Dinleniyor...',

    expiredBadge: 'Vadesi Geçti',
    incompleteStatus: 'Tamamlanmadı',
    conditionLabel: 'Şart',
    prepLeadTime: 'Ön Hazırlık',
    inCalendarBadge: 'Takvimde',
    periodicBadge: 'Döngüsel',
    exportDeviceCalendar: 'Cihaz Takvimine Ekle',
    prepStepsTitle: 'Ön Hazırlık Adımları',
    shareOrCopy: 'Paylaş / Kopyala',
    deleteNoteTitle: 'Notu Sil',
    reopenTitle: 'Geri Aç',
    completeTitle: 'Tamamla',
    cameraTitle: 'Fotoğraf Çek / Görsel Yükle',
    deletedToast: 'Not silindi',
    undoButton: 'Geri Al',
    manualModalTitle: 'Manuel Not Oluştur',
    manualModalTitlePlaceholder: 'Not başlığı (örn: Randevu, Toplantı, İlaç)',
    syncToGoogleCalendar: "Google Takvim'e işle",
    saveButton: 'Kaydet',
  },
  en: {
    appName: 'Notivia',
    driveSynced: 'Google Drive Synced',
    driveSyncing: 'Syncing Drive...',
    localMode: 'Local Mode',
    syncNow: 'Sync with Google Drive now',
    syncTooltip: 'Google Drive Synced',
    localModeTooltip: 'Your personal data is stored locally on this device',
    searchPlaceholder: 'Search notes (name, debt, car, date)...',
    searchTitle: 'Search notes',
    multiSelectTitle: 'Select / delete multiple notes',
    exitMultiSelectTitle: 'Exit multi-select',
    keyboardToggleTitle: 'Add note via keyboard',
    cameraToggleTitle: 'Take Photo / Upload Image',
    settingsTitle: 'Settings & Profile',

    settingsHeader: 'Settings',
    profileSection: 'Account & Profile',
    signedInAs: 'Signed in as',
    notSignedIn: 'Not signed in (Local Mode)',
    signInWithGoogle: 'Sign in with Google',
    signOut: 'Sign Out',
    confirmSignOut: 'Are you sure you want to sign out?',
    appearanceSection: 'Appearance',
    themeDark: 'Dark Mode',
    themeLight: 'Light Mode',
    notificationsSection: 'Notifications',
    notificationsEnabled: 'Notifications Enabled',
    notificationsDisabled: 'Notifications Disabled',
    enableNotifications: 'Enable Notifications',
    disableNotifications: 'Disable Notifications',
    notificationsUnsupported: 'Notifications not supported in this browser',
    sendTestNotification: 'Send Test Notification',
    todaySummaryNotification: "Remind Today's Schedule",
    assistantNotificationsDesc: 'When granted, Notivia Assistant will deliver timely alerts for appointments, preparation steps, and recurring routines.',
    prepReminderFeature: '⏳ Preparation Steps (e.g. photos, documents)',
    appointmentsFeature: '📌 Upcoming Appointments & Timed Notes',
    periodicFeature: '🔄 Recurring & Regular Routines (e.g. end of month)',
    languageSection: 'Language / Dil',
    close: 'Close',

    manualInputPlaceholder: 'Tuesday 7pm Coffee with John...',
    addButton: 'Add',
    speakOrWrite: 'Speak, capture or write',
    listening: 'Listening...',
    audioProcessing: 'Processing voice...',
    analyzingImage: 'Analyzing image...',
    readyStatus: 'Ready',
    tapToSpeak: 'Tap to speak',
    stopListening: 'Stop recording',
    pressAndHold: 'Hold to speak or tap',

    emptyNotesTitle: 'No notes yet',
    emptyNotesDesc: 'Speak, snap a photo or use the keyboard to add notes.',
    noSearchResults: 'No matching notes found.',
    noSearchResultsDesc: 'Try searching for another keyword.',
    share: 'Share',
    delete: 'Delete',
    editTitle: 'Edit Title',
    save: 'Save',
    cancel: 'Cancel',
    undo: 'Undo',
    noteDeleted: 'deleted',
    noteRestored: 'Note restored',
    notesDeleted: 'notes deleted',
    tasksProgress: 'Preparation Steps',
    calendarExport: 'Add to Device Calendar',
    markDone: 'Mark as done',
    markUndone: 'Reopen',
    copiedToClipboard: 'Note text copied to clipboard ✓',
    noteShared: 'Note shared ✓',

    conflictDetected: 'Schedule Conflict',
    preparationNote: 'Preparation',
    recurringMonthly: 'Monthly Recurring',
    recurringDays: 'Periodic',

    selectAll: 'Select All',
    clearSelection: 'Deselect All',
    selectedCount: 'selected',
    deleteSelected: 'Delete Selected',
    cancelSelection: 'Cancel',
    manualNoteTitle: 'Create Manual Note',
    manualNotePlaceholder: 'Note title (e.g., Rent Payment)',
    manualDateTimePlaceholder: 'Date and Time',
    syncWithGoogleCalendar: 'Sync to Google Calendar',
    expired: 'Overdue',
    uncompleted: 'Pending',
    noReminder: 'No reminder',
    onCalendar: 'On Calendar',
    recurringBadge: 'Periodic',
    addToDeviceCalendar: 'Add to Device Calendar',
    addedToDeviceCalendar: 'Exported to device calendar (.ics)',
    conflictsWith: 'conflicts with',
    preparationSteps: 'Preparation Step',
    listeningActive: 'Listening...',

    expiredBadge: 'Overdue',
    incompleteStatus: 'Pending',
    conditionLabel: 'Condition',
    prepLeadTime: 'Lead Time',
    inCalendarBadge: 'On Calendar',
    periodicBadge: 'Periodic',
    exportDeviceCalendar: 'Add to Device Calendar',
    prepStepsTitle: 'Preparation Steps',
    shareOrCopy: 'Share / Copy',
    deleteNoteTitle: 'Delete Note',
    reopenTitle: 'Reopen',
    completeTitle: 'Complete',
    cameraTitle: 'Take Photo / Upload Image',
    deletedToast: 'Note deleted',
    undoButton: 'Undo',
    manualModalTitle: 'Create Manual Note',
    manualModalTitlePlaceholder: 'Note title (e.g., Meeting, Dentist, Pill)',
    syncToGoogleCalendar: 'Sync to Google Calendar',
    saveButton: 'Save',
  },
};
