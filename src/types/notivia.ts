export type NotiviaCategory =
  | 'Sosyal'
  | 'İş'
  | 'Bakım & Onarım'
  | 'Ev & Yaşam'
  | 'Sağlık'
  | 'Finans'
  | 'Genel';

export type NotiviaPriority = 'dusuk' | 'normal' | 'yuksek' | 'kritik';

export interface UiMeta {
  icon: string;
  color_hex: string;
  badge_text: string;
}

export interface CalendarEvent {
  has_event: boolean;
  title: string;
  start_datetime: string | null;
  end_datetime: string | null;
  is_all_day: boolean;
  location: string | null;
}

export interface ActionItem {
  task: string;
  is_completed: boolean;
}

export interface NotificationInfo {
  needs_reminder: boolean;
  remind_at: string | null;
  notification_text: string;
}

export interface PeriodicLog {
  is_periodic: boolean;
  interval_days: number | null;
  next_due_date: string | null;
}

export interface NotiviaSimpleNote {
  baslik: string;
  zaman: string | null;
  tarih_iso?: string | null;
  hazirlik_zamani?: string | null;
  hazirlik_iso?: string | null;
  ikon: string;
  renk: string;
}

export interface NotiviaParsedNote {
  id: string;
  created_at: string;
  raw_input: string;
  reference_datetime: string;
  summary: string;
  detailed_note: string;
  category: NotiviaCategory;
  priority: NotiviaPriority;
  ui_meta: UiMeta;
  calendar_event: CalendarEvent;
  action_items: ActionItem[];
  notification: NotificationInfo;
  periodic_log: PeriodicLog;
  engine_meta?: {
    model: string;
    processing_time_ms: number;
    source: 'gemini-3.8-flash' | 'cognitive-fallback' | 'json-import';
  };
}

export interface ParseRequestPayload {
  input: string;
  current_datetime: string;
}

export interface ParseResponsePayload {
  success: boolean;
  data?: NotiviaParsedNote;
  error?: string;
  engine_meta?: {
    model: string;
    processing_time_ms: number;
    source: 'gemini-3.8-flash' | 'cognitive-fallback' | 'json-import';
  };
}
