import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Bell,
  BellRing,
  ExternalLink,
  Check,
  X,
  Trash2,
  Volume2,
  CalendarCheck,
  Repeat,
} from 'lucide-react';
import type { Language } from '../utils/i18n';
import type { SimpleCardItem } from '../App';
import {
  openDirectDeviceCalendar,
  getGoogleCalendarWebUrl,
  requestDeviceNotificationPermission,
  playNotificationChime,
  showSystemNotification,
  cancelScheduledReminder,
} from '../utils/deviceCalendar';
import { alarmSound } from '../services/alarmSound';
import { createCalendarEvent } from '../firebase';

interface CardReminderEditorProps {
  note: SimpleCardItem;
  isOpen: boolean;
  onClose: () => void;
  onSaveReminder: (
    noteId: string,
    newDateIso: string | null,
    newZamanLabel: string | null,
    enableNotification?: boolean,
    periyodik?: { tip: string; aralik_gun?: number } | null
  ) => Promise<void> | void;
  language?: Language;
  theme?: 'light' | 'dark';
}

function toLocalDatetimeString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatTurkishFriendlyDate(date: Date, lang: string = 'tr'): string {
  const monthsTr = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  const monthsEn = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const pad = (n: number) => String(n).padStart(2, '0');

  const day = date.getDate();
  const month = lang === 'en' ? monthsEn[date.getMonth()] : monthsTr[date.getMonth()];
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isTomorrow =
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();

  if (isToday) {
    return lang === 'en' ? `Today ${hours}:${minutes}` : `Bugün ${hours}:${minutes}`;
  }
  if (isTomorrow) {
    return lang === 'en' ? `Tomorrow ${hours}:${minutes}` : `Yarın ${hours}:${minutes}`;
  }

  return `${day} ${month}, ${hours}:${minutes}`;
}

export const CardReminderEditor: React.FC<CardReminderEditorProps> = ({
  note,
  isOpen,
  onClose,
  onSaveReminder,
  language = 'tr',
  theme = 'light',
}) => {
  if (!isOpen) return null;

  // Başlangıç tarihi belirleme
  const initialDate = note.tarih_iso ? new Date(note.tarih_iso) : (() => {
    const d = new Date();
    d.setHours(d.getHours() + 1, 0, 0, 0);
    return d;
  })();

  const [datetimeInput, setDatetimeInput] = useState<string>(toLocalDatetimeString(initialDate));
  const [customLabel, setCustomLabel] = useState<string>(note.zaman || formatTurkishFriendlyDate(initialDate, language));
  const [notifyEnabled, setNotifyEnabled] = useState<boolean>(note.deviceNotificationEnabled !== false);
  const [periodicType, setPeriodicType] = useState<string>(note.periyodik?.tip || 'none');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);
  const [isSyncingCalendar, setIsSyncingCalendar] = useState<boolean>(false);

  // Cihaz bildirim durumunu değiştir
  const handleToggleNotification = async (enable: boolean) => {
    if (enable) {
      const granted = await requestDeviceNotificationPermission();
      setNotifyEnabled(true);
      if (granted) {
        setFeedback({
          type: 'success',
          text: language === 'tr' ? '✓ Cihaz bildirim izni devrede' : '✓ Notification permission active',
        });
      } else {
        setFeedback({
          type: 'info',
          text: language === 'tr' ? 'Uygulama içi sesli alarm hazır' : 'In-app sound chime active',
        });
      }
    } else {
      setNotifyEnabled(false);
      setFeedback({
        type: 'info',
        text: language === 'tr' ? 'Bildirim ve alarm sessize alındı' : 'Notification silenced',
      });
    }
  };

  // Test Sesi ve Anlık Bildirim
  const handleTestChimeAndNotification = async () => {
    if (note.isAlarm) {
      alarmSound.startAlarm();
      setTimeout(() => {
        alarmSound.stopAlarm();
      }, 2000);
    } else {
      playNotificationChime();
    }

    const title = `${note.ikon || (note.isAlarm ? '⏰' : '📌')} ${note.baslik}`;
    const body = language === 'tr'
      ? `Zil testi başarılı! Belirlenen zamanda cihazınızda çalacaktır.`
      : `Test chime played! Will alert at scheduled time.`;

    await showSystemNotification({
      title,
      body,
      tag: `test-${note.id}`,
      isAlarm: !!note.isAlarm,
    });

    setFeedback({
      type: 'success',
      text: language === 'tr' ? '🔔 Test zili başarıyla çaldı!' : '🔔 Chime played successfully!',
    });
  };

  // Cihaz Takvimine Doğrudan Aktarma
  const handleExportToDeviceCalendar = () => {
    const date = new Date(datetimeInput);
    if (isNaN(date.getTime())) {
      setFeedback({
        type: 'error',
        text: language === 'tr' ? 'Lütfen geçerli bir tarih seçin.' : 'Please select a valid date.',
      });
      return;
    }

    let rruleStr: string | undefined = undefined;
    if (periodicType === 'gunluk') rruleStr = 'FREQ=DAILY';
    else if (periodicType === 'haftalik') rruleStr = 'FREQ=WEEKLY';
    else if (periodicType === 'aylik') rruleStr = 'FREQ=MONTHLY';
    else if (periodicType === 'aylik_son_hafta') rruleStr = 'FREQ=MONTHLY;BYSETPOS=-1;BYDAY=MO,TU,WE,TH,FR';

    openDirectDeviceCalendar({
      title: `${note.ikon || '📌'} ${note.baslik}`,
      startDate: date,
      description: `Notivia Bilişsel Yaşam Asistanı: ${note.baslik}\n${note.anomali_notu || ''}`,
      rrule: rruleStr,
    });

    playNotificationChime();
    setFeedback({
      type: 'success',
      text: language === 'tr' ? '✓ Cihaz takvimi açıldı, etkinlik hazırlandı!' : '✓ Device calendar opened with event!',
    });
  };

  // Google Takvime Senkronize Etme
  const handleSyncToGoogleCalendar = async () => {
    const date = new Date(datetimeInput);
    if (isNaN(date.getTime())) return;

    setIsSyncingCalendar(true);
    try {
      const result = await createCalendarEvent({
        baslik: note.baslik,
        tarih_iso: date.toISOString(),
        ikon: note.ikon || '📌',
      });

      if (result.eventId) {
        setFeedback({
          type: 'success',
          text: language === 'tr' ? '✓ Google Takvime kaydedildi!' : '✓ Synced with Google Calendar!',
        });
        playNotificationChime();
      } else {
        const url = getGoogleCalendarWebUrl({
          title: `${note.ikon || '📌'} ${note.baslik}`,
          startDate: date,
          description: `Notivia: ${note.baslik}\n${note.anomali_notu || ''}`,
        });
        window.open(url, '_blank');
      }
    } catch {
      const url = getGoogleCalendarWebUrl({
        title: `${note.ikon || '📌'} ${note.baslik}`,
        startDate: date,
        description: `Notivia: ${note.baslik}\n${note.anomali_notu || ''}`,
      });
      window.open(url, '_blank');
    } finally {
      setIsSyncingCalendar(false);
    }
  };

  // Değişiklikleri Kaydet
  const handleSave = async () => {
    const parsedDate = new Date(datetimeInput);
    if (isNaN(parsedDate.getTime())) {
      setFeedback({
        type: 'error',
        text: language === 'tr' ? 'Lütfen geçerli bir tarih ve saat seçin.' : 'Please select a valid date.',
      });
      return;
    }

    const iso = parsedDate.toISOString();
    const friendly = customLabel.trim() || formatTurkishFriendlyDate(parsedDate, language);

    let periyodikObj: { tip: string; aralik_gun?: number } | null = null;
    if (periodicType !== 'none') {
      periyodikObj = { tip: periodicType };
    }

    await onSaveReminder(note.id, iso, friendly, notifyEnabled, periyodikObj);
    playNotificationChime();
    onClose();
  };

  // Hatırlatıcıyı Tamamen Kaldır
  const handleClearReminder = async () => {
    await onSaveReminder(note.id, null, null, false, null);
    cancelScheduledReminder(note.id);
    onClose();
  };

  return (
    <div
      id="reminder-modal-backdrop"
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 ${theme === 'dark' ? 'dark' : ''}`}
      onClick={onClose}
    >
      <div
        id="reminder-modal-sheet"
        className="w-full sm:max-w-md bg-white dark:bg-stone-900 rounded-t-3xl sm:rounded-2xl border-t sm:border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] animate-in slide-in-from-bottom-4 duration-250 text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobil Tutamaç */}
        <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700 mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-150 dark:border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center text-lg shrink-0 border border-amber-200/60 dark:border-amber-800/60 shadow-2xs">
              {note.ikon || '⏰'}
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold truncate leading-snug">{note.baslik}</h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1 truncate">
                <CalendarCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span>{language === 'tr' ? 'Hatırlatıcı & Takvim Ayarı' : 'Reminder & Calendar'}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
            title={language === 'tr' ? 'Kapat' : 'Close'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Geri Bildirim Toast */}
        {feedback && (
          <div
            className={`mx-4 mt-3 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in duration-150 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800'
                : feedback.type === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-800'
                : 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800'
            }`}
          >
            <span>{feedback.type === 'success' ? '✓' : feedback.type === 'error' ? '⚠️' : 'ℹ️'}</span>
            <span className="flex-1">{feedback.text}</span>
          </div>
        )}

        {/* Form Alanı (Kaydırılabilir) */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 overscroll-contain">
          {/* Tarih & Saat Seçici */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{language === 'tr' ? 'Tarih & Saat Belirle' : 'Exact Date & Time'}</span>
            </label>
            <div className="space-y-2">
              <input
                type="datetime-local"
                value={datetimeInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setDatetimeInput(val);
                  if (val) {
                    const d = new Date(val);
                    if (!isNaN(d.getTime())) {
                      setCustomLabel(formatTurkishFriendlyDate(d, language));
                    }
                  }
                }}
                className="w-full text-xs font-mono font-medium px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-amber-500"
              />
              <input
                type="text"
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                placeholder={language === 'tr' ? 'Etiket (Örn: Yarın 14:00)' : 'Label (e.g. Tomorrow 2 PM)'}
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* 3. Cihaz Takvimine Doğrudan Aktarma (1-Tap Direkt Entegrasyon) */}
          <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center text-sm shadow-2xs shrink-0">
                  📅
                </span>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-sky-950 dark:text-sky-200 truncate">
                    {language === 'tr' ? 'Cihaz Takvimi (Google / Apple)' : 'Device Calendar (Google / Apple)'}
                  </h3>
                  <p className="text-[10px] text-sky-700 dark:text-sky-400 truncate">
                    {language === 'tr' ? 'Dosya indirmeden doğrudan ajandana aktar' : 'Add directly without downloading files'}
                  </p>
                </div>
              </div>
              {(note.calendarEventId || note.calendar_event_id) && (
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-full shrink-0">
                  ✓ {language === 'tr' ? 'Kayıtlı' : 'Synced'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleExportToDeviceCalendar}
                className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-97 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{language === 'tr' ? 'Cihaz Takvimine Ekle' : 'Add to Device Calendar'}</span>
              </button>

              <button
                type="button"
                onClick={handleSyncToGoogleCalendar}
                disabled={isSyncingCalendar}
                className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-stone-800 hover:bg-sky-50 dark:hover:bg-stone-700 active:scale-97 text-stone-800 dark:text-stone-200 border border-sky-200 dark:border-sky-800 font-semibold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                <span>{isSyncingCalendar ? '...' : (language === 'tr' ? 'Google Takvim (Web)' : 'Google Calendar')}</span>
              </button>
            </div>
          </div>

          {/* 4. Sesli Alarm & Bildirim (Kafa Yormayan İkili Segment) */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/70 dark:border-amber-800/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center text-sm shadow-2xs">
                  {notifyEnabled ? '🔔' : '🔕'}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                    {language === 'tr' ? 'Sesli Alarm ve Bildirim' : 'Alarm & Notification'}
                  </h3>
                  <p className="text-[10px] text-amber-800 dark:text-amber-400">
                    {notifyEnabled
                      ? (language === 'tr' ? 'Zamanı geldiğinde cihazında sesli çalar' : 'Chimes and alerts on time')
                      : (language === 'tr' ? 'Sessiz hatırlatıcı' : 'Silent reminder')}
                  </p>
                </div>
              </div>

              {/* Ses Testi */}
              <button
                type="button"
                onClick={handleTestChimeAndNotification}
                className="px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-white dark:bg-stone-800 hover:bg-amber-100 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer flex items-center gap-1"
                title={language === 'tr' ? 'Sesi test et' : 'Test chime'}
              >
                <Volume2 className="w-3 h-3 text-amber-600" />
                <span>Test 🔔</span>
              </button>
            </div>

            {/* İkili Görsel Buton Grubu */}
            <div className="flex items-center gap-1.5 bg-white/80 dark:bg-stone-800/80 p-1 rounded-xl border border-amber-200/50 dark:border-amber-800/40">
              <button
                type="button"
                onClick={() => handleToggleNotification(true)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-97 ${
                  notifyEnabled
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                <BellRing className="w-3.5 h-3.5" />
                <span>{language === 'tr' ? 'Açık (Sesli Alarm)' : 'Active (Alarm)'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleNotification(false)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-97 ${
                  !notifyEnabled
                    ? 'bg-stone-300 dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                <Bell className="w-3.5 h-3.5 opacity-50" />
                <span>{language === 'tr' ? 'Kapalı (Sessiz)' : 'Off (Silent)'}</span>
              </button>
            </div>
          </div>

          {/* 5. Tekrarlama / Döngü Çipleri */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
              <Repeat className="w-3.5 h-3.5 text-stone-400" />
              <span>{language === 'tr' ? 'Tekrarlama Döngüsü' : 'Recurrence'}</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'none', labelTr: 'Tek', labelEn: 'Once', icon: '🚫' },
                { id: 'gunluk', labelTr: 'Her Gün', labelEn: 'Daily', icon: '🔄' },
                { id: 'haftalik', labelTr: 'Haftalık', labelEn: 'Weekly', icon: '📆' },
                { id: 'aylik', labelTr: 'Aylık', labelEn: 'Monthly', icon: '🗓️' },
              ].map((rec) => {
                const active = periodicType === rec.id;
                return (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => setPeriodicType(rec.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer active:scale-95 flex flex-col items-center gap-0.5 ${
                      active
                        ? 'border-stone-900 bg-stone-900 text-white dark:border-white dark:bg-white dark:text-stone-900 font-bold shadow-xs'
                        : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-sm">{rec.icon}</span>
                    <span className="text-[10px] leading-tight">
                      {language === 'tr' ? rec.labelTr : rec.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Alt Butonlar */}
        <div className="flex items-center gap-2 p-3 sm:px-4 sm:py-3.5 border-t border-stone-150 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/70 shrink-0">
          {(note.tarih_iso || note.zaman) && (
            <button
              type="button"
              onClick={handleClearReminder}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer flex items-center gap-1"
              title={language === 'tr' ? 'Hatırlatıcıyı Kaldır' : 'Remove'}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'tr' ? 'Kaldır' : 'Remove'}</span>
            </button>
          )}

          <div className="flex-1 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              {language === 'tr' ? 'Vazgeç' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{language === 'tr' ? 'Kaydet' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
