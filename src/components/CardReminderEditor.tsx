import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Bell,
  BellRing,
  Download,
  ExternalLink,
  Check,
  X,
  Trash2,
  Sparkles,
  Volume2,
  CalendarCheck,
  Repeat,
  AlertCircle,
} from 'lucide-react';
import type { SimpleCardItem } from '../App.tsx';
import {
  exportToDeviceCalendar,
  getGoogleCalendarWebUrl,
  requestDeviceNotificationPermission,
  playNotificationChime,
  showSystemNotification,
  scheduleLocalDeviceReminder,
  cancelScheduledReminder,
} from '../utils/deviceCalendar.ts';
import { alarmSound } from '../services/alarmSound.ts';
import { createCalendarEvent, updateCalendarEventTitle } from '../firebase.ts';

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
  language?: 'tr' | 'en';
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

function formatTurkishFriendlyDate(date: Date, lang: 'tr' | 'en' = 'tr'): string {
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
  const month = lang === 'tr' ? monthsTr[date.getMonth()] : monthsEn[date.getMonth()];
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
    return lang === 'tr' ? `Bugün ${hours}:${minutes}` : `Today at ${hours}:${minutes}`;
  }
  if (isTomorrow) {
    return lang === 'tr' ? `Yarın ${hours}:${minutes}` : `Tomorrow at ${hours}:${minutes}`;
  }

  return `${day} ${month}, ${hours}:${minutes}`;
}

export const CardReminderEditor: React.FC<CardReminderEditorProps> = ({
  note,
  isOpen,
  onClose,
  onSaveReminder,
  language = 'tr',
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
  const [permissionStatus, setPermissionStatus] = useState<string>(() => {
    return typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default';
  });

  // Hızlı Zaman Şablonları
  const applyPreset = (offsetHours: number, fixedHour?: number, fixedMinute: number = 0, addDays: number = 0) => {
    const target = new Date();
    if (addDays > 0) {
      target.setDate(target.getDate() + addDays);
    }
    if (fixedHour !== undefined) {
      target.setHours(fixedHour, fixedMinute, 0, 0);
    } else {
      target.setTime(target.getTime() + offsetHours * 60 * 60 * 1000);
    }

    setDatetimeInput(toLocalDatetimeString(target));
    setCustomLabel(formatTurkishFriendlyDate(target, language));
    setFeedback({
      type: 'info',
      text: language === 'tr' ? `Seçildi: ${formatTurkishFriendlyDate(target, language)}` : `Selected: ${formatTurkishFriendlyDate(target, language)}`,
    });
  };

  // Cihaz bildirim iznini iste ve aktif et
  const handleToggleNotification = async () => {
    if (!notifyEnabled) {
      const granted = await requestDeviceNotificationPermission();
      if (typeof window !== 'undefined' && 'Notification' in window) {
        setPermissionStatus(Notification.permission);
      }
      setNotifyEnabled(true);
      if (granted) {
        setFeedback({
          type: 'success',
          text: language === 'tr' ? '✓ Cihaz bildirim izni onaylandı ve aktif edildi' : '✓ Notification permission granted and active',
        });
      } else {
        setFeedback({
          type: 'info',
          text: language === 'tr' ? 'Sesli alarm ve uygulama içi bildirimler hazırlandı' : 'Sound chime and in-app notifications ready',
        });
      }
    } else {
      setNotifyEnabled(false);
      setFeedback({
        type: 'info',
        text: language === 'tr' ? 'Cihaz bildirimi kapatıldı' : 'Device notification turned off',
      });
    }
  };

  // Test Sesi ve Anlık Bildirim
  const handleTestChimeAndNotification = async () => {
    if (note.isAlarm) {
      alarmSound.startAlarm();
      setTimeout(() => {
        alarmSound.stopAlarm();
      }, 2400);
    } else {
      playNotificationChime();
    }

    const title = `${note.ikon || (note.isAlarm ? '⏰' : '📌')} ${note.baslik}`;
    const body = language === 'tr'
      ? `Bildirim testi başarılı! ${customLabel || 'Belirlenen zamanda'} cihazınızda çalacaktır.`
      : `Test notification succeeded! Will alert at ${customLabel || 'scheduled time'}.`;

    await showSystemNotification({
      title,
      body,
      tag: `test-${note.id}`,
      isAlarm: !!note.isAlarm,
    });

    setFeedback({
      type: 'success',
      text: language === 'tr' ? '🔔 Test zili çaldı ve bildirim yollandı!' : '🔔 Chime played and test notification dispatched!',
    });
  };

  // Cihaz Takvimine (.ics) Aktarma
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

    exportToDeviceCalendar({
      title: `${note.ikon || '📌'} ${note.baslik}`,
      startDate: date,
      description: `Notivia Bilişsel Yaşam Asistanı: ${note.baslik}\n${note.anomali_notu || ''}`,
      rrule: rruleStr,
    });

    playNotificationChime();
    setFeedback({
      type: 'success',
      text: language === 'tr' ? '📲 Cihaz takvimi dosyası (.ics) indirildi ve takvime hazırlandı!' : '📲 Device calendar (.ics) downloaded!',
    });
  };

  // Google Takvim Web Sayfasını Açma
  const handleOpenGoogleCalendarWeb = () => {
    const date = new Date(datetimeInput);
    if (isNaN(date.getTime())) return;

    const url = getGoogleCalendarWebUrl({
      title: `${note.ikon || '📌'} ${note.baslik}`,
      startDate: date,
      description: `Notivia: ${note.baslik}\n${note.anomali_notu || ''}`,
    });
    window.open(url, '_blank');
  };

  // Doğrudan Google Takvime Senkronize Etme (Google Auth ile giriş yapılmışsa)
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
          text: language === 'tr' ? '✓ Google Takviminize başarıyla kaydedildi!' : '✓ Synced with your Google Calendar!',
        });
        playNotificationChime();
      } else {
        // Token yoksa web arayüzüne yönlendir
        handleOpenGoogleCalendarWeb();
        setFeedback({
          type: 'info',
          text: language === 'tr' ? 'Google Takvim web arayüzü yeni sekmede açıldı' : 'Google Calendar opened in new tab',
        });
      }
    } catch {
      handleOpenGoogleCalendarWeb();
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
        text: language === 'tr' ? 'Lütfen geçerli bir tarih ve saat seçin.' : 'Please select a valid date and time.',
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
      onClick={(e) => e.stopPropagation()}
      className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 text-stone-900 dark:text-stone-100 text-xs animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Başlık ve Kapat Butonu */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-100">
          <CalendarCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>{language === 'tr' ? 'Hatırlatıcı & Cihaz Takvimini Düzenle' : 'Edit Reminder & Device Calendar'}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          title={language === 'tr' ? 'Kapat' : 'Close'}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Geri Bildirim Mesajı */}
      {feedback && (
        <div
          className={`mb-2.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-1.5 animate-in fade-in duration-150 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800'
              : feedback.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-800'
              : 'bg-sky-50 text-sky-800 border border-sky-200 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-800'
          }`}
        >
          <span>{feedback.type === 'success' ? '✓' : feedback.type === 'error' ? '⚠️' : 'ℹ️'}</span>
          <span>{feedback.text}</span>
        </div>
      )}

      {/* 1. Tarih ve Saat Seçimi */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-500" />
            <span>{language === 'tr' ? 'Kesin Tarih & Saat:' : 'Exact Date & Time:'}</span>
          </label>
          <span className="text-[10px] text-stone-500 font-mono">
            {formatTurkishFriendlyDate(new Date(datetimeInput), language)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Native Datetime Local Input */}
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
            className="w-full text-xs font-mono font-medium px-2.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-xs focus:ring-2 focus:ring-amber-500/40 outline-none"
          />

          {/* İsteğe bağlı Özel Zaman Etiketi */}
          <input
            type="text"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            placeholder={language === 'tr' ? 'Örn: Yarın 14:00' : 'e.g. Tomorrow 2 PM'}
            className="w-full text-xs px-2.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-xs focus:ring-2 focus:ring-amber-500/40 outline-none"
          />
        </div>

        {/* Hızlı Şablon Butonları (Tek Dokunuşla) */}
        <div className="flex items-center gap-1 flex-wrap pt-1">
          <span className="text-[10px] font-semibold text-stone-500 mr-1 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
            <span>{language === 'tr' ? 'Hızlı:' : 'Quick:'}</span>
          </span>
          <button
            type="button"
            onClick={() => applyPreset(1)}
            className="px-2 py-0.5 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-[10px] font-medium transition-colors cursor-pointer"
          >
            +1 Saat
          </button>
          <button
            type="button"
            onClick={() => applyPreset(0, 19, 30, 0)}
            className="px-2 py-0.5 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-[10px] font-medium transition-colors cursor-pointer"
          >
            {language === 'tr' ? 'Bu Akşam 19:30' : 'Tonight 19:30'}
          </button>
          <button
            type="button"
            onClick={() => applyPreset(0, 9, 0, 1)}
            className="px-2 py-0.5 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-[10px] font-medium transition-colors cursor-pointer"
          >
            {language === 'tr' ? 'Yarın 09:00' : 'Tomorrow 9 AM'}
          </button>
          <button
            type="button"
            onClick={() => applyPreset(0, 14, 0, 1)}
            className="px-2 py-0.5 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-[10px] font-medium transition-colors cursor-pointer"
          >
            {language === 'tr' ? 'Yarın 14:00' : 'Tomorrow 2 PM'}
          </button>
          <button
            type="button"
            onClick={() => applyPreset(0, 10, 0, 3)}
            className="px-2 py-0.5 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-[10px] font-medium transition-colors cursor-pointer"
          >
            {language === 'tr' ? '3 Gün Sonra' : 'In 3 Days'}
          </button>
        </div>
      </div>

      {/* 2. Cihaz Bildirimi (Push & Sound Alarm) Ayarı */}
      <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/20 text-amber-900 dark:text-amber-200">
              {notifyEnabled ? <BellRing className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300 animate-pulse" /> : <Bell className="w-3.5 h-3.5 text-stone-500" />}
            </span>
            <div>
              <p className="text-[11px] font-bold text-stone-900 dark:text-stone-100">
                {language === 'tr' ? 'Cihazıma Bildirim & Alarm Gönder' : 'Device Notification & Sound Alarm'}
              </p>
              <p className="text-[10px] text-stone-600 dark:text-stone-300">
                {notifyEnabled
                  ? (language === 'tr' ? 'Zamanı geldiğinde cihazında sesli bildirim çalar' : 'Chimes and alerts on your device on time')
                  : (language === 'tr' ? 'Bildirim kapalı' : 'Notifications disabled')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleNotification}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              notifyEnabled ? 'bg-amber-600' : 'bg-stone-300 dark:bg-stone-600'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                notifyEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Bildirimi Şimdi Test Et Butonu */}
        <div className="flex items-center justify-between pt-1 border-t border-amber-500/15">
          <span className="text-[10px] text-stone-500 dark:text-stone-400">
            {language === 'tr' ? 'Cihazının zilini test etmek için:' : 'To test device chime:'}
          </span>
          <button
            type="button"
            onClick={handleTestChimeAndNotification}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/80 hover:bg-white dark:bg-stone-800 dark:hover:bg-stone-700 text-[10px] font-semibold text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Volume2 className="w-3 h-3 text-amber-600" />
            <span>{language === 'tr' ? 'Sesi Test Et 🔔' : 'Test Sound 🔔'}</span>
          </button>
        </div>
      </div>

      {/* 3. Cihaz Takvimine Entegrasyon (Apple, Google, Samsung, Windows) */}
      <div className="p-2.5 rounded-xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-[11px] text-sky-950 dark:text-sky-200">
            <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{language === 'tr' ? 'Cihaz Takvimine Entegre Et:' : 'Integrate with Device Calendar:'}</span>
          </div>
          {(note.calendarEventId || note.calendar_event_id) && (
            <span className="text-[9px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 px-1.5 py-0.5 rounded">
              ✓ {language === 'tr' ? 'Takvimde Kayıtlı' : 'In Calendar'}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {/* Cihaz Takvimine (.ics) Aktar */}
          <button
            type="button"
            onClick={handleExportToDeviceCalendar}
            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-stone-800 hover:bg-sky-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 border border-sky-200 dark:border-sky-800 font-semibold text-[11px] shadow-2xs transition-all cursor-pointer active:scale-98"
            title={language === 'tr' ? 'iOS (Apple), Android ve Outlook takvimine eklemek için .ics dosyası indirir' : 'Downloads .ics for Apple/Android/Outlook calendar'}
          >
            <Download className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{language === 'tr' ? 'Cihaz Takvimine Aktar (.ics)' : 'Export to Device Calendar (.ics)'}</span>
          </button>

          {/* Google Takvim Web Sayfasını Aç */}
          <button
            type="button"
            onClick={handleSyncToGoogleCalendar}
            disabled={isSyncingCalendar}
            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-stone-800 hover:bg-sky-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 border border-sky-200 dark:border-sky-800 font-semibold text-[11px] shadow-2xs transition-all cursor-pointer active:scale-98"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{isSyncingCalendar ? '...' : (language === 'tr' ? "Google Takvim'e Ekle" : 'Add to Google Calendar')}</span>
          </button>
        </div>
      </div>

      {/* 4. Periyodik Tekrar Seçeneği */}
      <div className="mb-3 flex items-center justify-between text-[11px]">
        <label className="font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1">
          <Repeat className="w-3 h-3 text-stone-500" />
          <span>{language === 'tr' ? 'Tekrarlama / Döngü:' : 'Recurrence:'}</span>
        </label>
        <select
          value={periodicType}
          onChange={(e) => setPeriodicType(e.target.value)}
          className="text-xs bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-600 rounded-lg px-2 py-1 outline-none shadow-2xs"
        >
          <option value="none">{language === 'tr' ? 'Tek Seferlik' : 'One-time'}</option>
          <option value="gunluk">{language === 'tr' ? 'Her Gün' : 'Daily'}</option>
          <option value="haftalik">{language === 'tr' ? 'Her Hafta' : 'Weekly'}</option>
          <option value="aylik">{language === 'tr' ? 'Her Ay' : 'Monthly'}</option>
          <option value="aylik_son_hafta">{language === 'tr' ? 'Her Ayın Son Haftası' : 'Last Week of Month'}</option>
        </select>
      </div>

      {/* 5. İşlem Butonları (Kaydet / Hatırlatıcıyı Kaldır / Kapat) */}
      <div className="flex items-center justify-between pt-2 border-t border-black/10 dark:border-white/10 gap-2">
        <div>
          {(note.tarih_iso || note.zaman) && (
            <button
              type="button"
              onClick={handleClearReminder}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 text-[11px] font-medium transition-colors cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>{language === 'tr' ? 'Hatırlatıcıyı Kaldır' : 'Remove Reminder'}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-stone-700 dark:text-stone-300 font-medium text-[11px] transition-colors cursor-pointer"
          >
            {language === 'tr' ? 'Vazgeç' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-semibold text-[11px] shadow-xs transition-transform active:scale-95 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{language === 'tr' ? 'Kaydet & Bildirimi Kur' : 'Save & Set Reminder'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
