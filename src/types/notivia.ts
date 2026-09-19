import type { ProfessionDomain, DomainThemeConfig, ActionButtonConfig } from './domainThemes.ts';
export * from './domainThemes.ts';
export * from './fermentation.ts';

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
  time?: string;
  condition?: string;
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

export interface ExtractedMetric {
  id: string;
  type: 'pressure' | 'temp' | 'money' | 'vital' | 'official' | 'time_measure' | 'generic';
  label: string;
  value: string;
  unit?: string;
  raw: string;
  alertLevel?: 'normal' | 'warning' | 'danger';
  alertMsg?: string;
}

export interface MilestoneStep {
  id: string;
  order: number;
  title: string;
  targetOffsetDays?: number;
  targetDateIso?: string | null;
  targetText: string;
  isCompleted: boolean;
  icon?: string;
  description?: string;
}

export interface MilestoneChain {
  chainId: string;
  chainName: string;
  currentStepIndex: number;
  steps: MilestoneStep[];
  autoProgress?: boolean;
}

export interface NextActionSuggestion {
  id: string;
  title: string;
  description: string;
  actionType: 'DRAFT_MESSAGE' | 'CREATE_FOLLOWUP' | 'COPY_TEXT' | 'SCHEDULE_TIMER';
  icon: string;
  payload?: {
    recipient?: string;
    channel?: 'whatsapp' | 'email' | 'sms';
    messageBody?: string;
    followupTitle?: string;
    followupZaman?: string;
    followupOffsetDays?: number;
    followupIkon?: string;
    copyText?: string;
  };
}

export interface CustomVocabularyItem {
  id: string;
  term: string;
  mappedDomain: ProfessionDomain;
  category?: string;
  notes?: string;
  createdAt: string;
  usageCount: number;
}

export interface NotiviaTriggerInfo {
  tip?: 'hava' | 'konum' | 'surekli' | 'finansal' | 'mekan' | 'kisi' | 'durum' | 'zincirleme' | string | null;
  sart?: string;
  aktif_mi?: boolean;
  etiket?: string;
}

export interface NotiviaSimpleNote {
  baslik: string;
  zaman: string | null;
  tarih_iso?: string | null;
  hazirlik_zamani?: string | null;
  hazirlik_iso?: string | null;
  anomali_notu?: string | null;
  eksik_bilgi?: boolean;
  soru?: string | null;
  netlestirme_sorusu?: string | null;
  teshis_notu?: string | null;
  baglantili_hatirlatma?: string | null;
  tetikleyici?: NotiviaTriggerInfo | null;
  periyodik?: {
    tip: 'aylik_son_hafta' | 'aylik' | 'haftalik' | 'yillik' | 'gunluk';
    aralik_gun?: number;
    bir_sonraki_tarih_iso?: string;
  } | null;
  action_items?: ActionItem[] | null;
  ikon: string;
  renk: string;
  sesli_fisilti?: string | null;
  deviceNotificationEnabled?: boolean;
  isAlarm?: boolean;
  isMicroTask?: boolean;
  sureDakika?: number;
  extracted_metrics?: ExtractedMetric[];
  milestone_chain?: MilestoneChain | null;
  next_action?: NextActionSuggestion | null;
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
  anomali_notu?: string | null;
  teshis_notu?: string | null;
  ui_meta: UiMeta;
  calendar_event: CalendarEvent;
  action_items: ActionItem[];
  notification: NotificationInfo;
  periodic_log: PeriodicLog;
  extracted_metrics?: ExtractedMetric[];
  milestone_chain?: MilestoneChain | null;
  next_action?: NextActionSuggestion | null;
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
