export function formatTurkishDateTime(isoString: string | null | undefined): string {
  if (!isoString) return 'Belirtilmedi';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    return new Intl.DateTimeFormat('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return isoString;
  }
}

export function formatRelativeTimeRemaining(isoString: string | null | undefined, refIsoString?: string): string {
  if (!isoString) return '';
  try {
    const target = new Date(isoString).getTime();
    const ref = refIsoString ? new Date(refIsoString).getTime() : Date.now();
    const diffMs = target - ref;
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      return `${diffDays} gün sonra`;
    } else if (diffDays === 1) {
      return 'Yarın';
    } else if (diffDays === 0) {
      if (diffHours > 0) return `${diffHours} saat sonra`;
      if (diffHours === 0) return 'Çok yakında';
      return 'Geçti';
    } else {
      return `${Math.abs(diffDays)} gün önce`;
    }
  } catch {
    return '';
  }
}

export function getCurrentIsoLocal(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  // Local ISO with offset
  const offset = -now.getTimezoneOffset();
  const offsetSign = offset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
  const offsetMinutes = pad(Math.abs(offset) % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

export function extractDateTimeFromTurkish(
  text: string,
  baseDate: Date | string = new Date()
): { zaman: string | null; tarih_iso: string | null } {
  const lower = text.toLowerCase();
  const days: Record<string, number> = {
    pazar: 0,
    pazartesi: 1,
    salı: 2,
    sali: 2,
    çarşamba: 3,
    carsamba: 3,
    perşembe: 4,
    persembe: 4,
    cuma: 5,
    cumartesi: 6,
  };

  const dayDisplay: Record<string, string> = {
    pazar: 'Pazar',
    pazartesi: 'Pazartesi',
    salı: 'Salı',
    sali: 'Salı',
    çarşamba: 'Çarşamba',
    carsamba: 'Çarşamba',
    perşembe: 'Perşembe',
    persembe: 'Perşembe',
    cuma: 'Cuma',
    cumartesi: 'Cumartesi',
  };

  let targetDate = new Date(baseDate);
  let hasDate = false;
  let matchedDayLabel: string | null = null;

  // 1. Gün Tespiti
  for (const [dayName, dayIndex] of Object.entries(days)) {
    if (lower.includes(dayName)) {
      const currentDay = targetDate.getDay();
      let diff = dayIndex - currentDay;
      if (diff <= 0) diff += 7; // Önümüzdeki ilk ilgili gün
      targetDate.setDate(targetDate.getDate() + diff);
      hasDate = true;
      matchedDayLabel = dayDisplay[dayName];
      break;
    }
  }

  if (lower.includes("yarın") || lower.includes("yarin")) {
    targetDate.setDate(targetDate.getDate() + 1);
    hasDate = true;
    matchedDayLabel = 'Yarın';
  } else if (lower.includes("bugün") || lower.includes("bugun")) {
    hasDate = true;
    matchedDayLabel = 'Bugün';
  }

  // 2. Saat / Vakit Tespiti (Sayısal veya metinsel)
  let hour: number | null = null;
  let minute = 0;
  let isExplicitTime = false;

  // Türkçe sayı kelimeleri
  const numberWords: Record<string, number> = {
    'bir': 1, 'iki': 2, 'üç': 3, 'uc': 3, 'dört': 4, 'dort': 4,
    'beş': 5, 'bes': 5, 'altı': 6, 'alti': 6, 'yedi': 7, 'sekiz': 8,
    'dokuz': 9, 'on': 10, 'on bir': 11, 'onbir': 11, 'on iki': 12, 'oniki': 12,
    'on üç': 13, 'on dört': 14, 'on beş': 15, 'on altı': 16, 'on yedi': 17,
    'on sekiz': 18, 'on dokuz': 19, 'yirmi': 20, 'yirmi bir': 21, 'yirmibir': 21,
    'yirmi iki': 22, 'yirmi üç': 23, 'yirmi dört': 24
  };

  // Zaman dilimi etiketleri
  const isEvening = /akşam|aksam/i.test(lower);
  const isNight = /gece/i.test(lower);
  const isAfternoon = /öğleden sonra|ogleden sonra/i.test(lower);
  const isMorning = /sabah/i.test(lower);
  const isNoon = /öğlen|oglen|öğle|ogle/i.test(lower);

  // Sayısal saat formatları (21:00, 21.00, 9:30 vb.)
  const colonMatch = lower.match(/\b(\d{1,2})[:.](\d{2})\b/);
  if (colonMatch) {
    hour = parseInt(colonMatch[1], 10);
    minute = parseInt(colonMatch[2], 10);
    isExplicitTime = true;
  }

  // "saat 9", "9da", "9'da", "9 da", "akşam 9"
  if (hour === null) {
    const digitMatch = lower.match(/(?:saat\s*|akşam\s*|aksam\s*|sabah\s*|gece\s*|öğlen\s*)(\d{1,2})(?:\s*['’]?(?:da|de|ta|te))?/i) ||
      lower.match(/\b(\d{1,2})\s*['’]?(?:da|de|ta|te)\b/i);
    if (digitMatch) {
      hour = parseInt(digitMatch[1], 10);
      isExplicitTime = true;
    }
  }

  // Metinsel saat (dokuzda, sekizde, on birde)
  if (hour === null) {
    for (const [word, val] of Object.entries(numberWords)) {
      const reg = new RegExp(`\\b(?:saat\\s*)?${word}(?:['’]?(?:da|de|ta|te))?\\b`, 'i');
      if (reg.test(lower)) {
        hour = val;
        isExplicitTime = true;
        break;
      }
    }
  }

  // Buçuk ve çeyrek tespiti
  if (lower.includes('buçuk') || lower.includes('bucuk')) {
    minute = 30;
  } else if (lower.includes('çeyrek') || lower.includes('ceyrek')) {
    minute = 15;
  }

  // Saat 12 saat formatından 24 saat formatına dönüştürme (Akşam 9 = 21:00)
  if (hour !== null) {
    if (isEvening) {
      if (hour < 12) hour += 12; // 9 -> 21, 8 -> 20, vb.
    } else if (isAfternoon) {
      if (hour < 12) hour += 12; // 3 -> 15, vb.
    } else if (isNight) {
      if (hour >= 9 && hour <= 11) hour += 12; // 10 -> 22, 11 -> 23
      else if (hour === 12) hour = 0;
    } else if (isNoon) {
      if (hour >= 1 && hour <= 3) hour += 12; // öğlen 1 -> 13, öğlen 2 -> 14
    }
  } else {
    // Sayı belirtilmemişse bağlamsal varsayılanlar
    if (isNoon) { hour = 13; minute = 0; }
    else if (isEvening) { hour = 21; minute = 0; } // Akşam varsayılan 21:00
    else if (isNight) { hour = 22; minute = 0; }
    else if (isMorning) { hour = 9; minute = 0; }
    else { hour = 9; minute = 0; }
  }

  // Sınır koruması
  if (hour < 0) hour = 0;
  if (hour > 23) hour = 23;
  if (minute < 0) minute = 0;
  if (minute > 59) minute = 59;

  targetDate.setHours(hour, minute, 0, 0);

  // Gün belirtilmediyse ve hesaplanan saat bugün için çoktan geçmişse yarına yuvarla
  const nowMs = new Date(baseDate).getTime();
  if (!hasDate && targetDate.getTime() <= nowMs) {
    targetDate.setDate(targetDate.getDate() + 1);
    hasDate = true;
    matchedDayLabel = 'Yarın';
  }

  // ISO Formatı (YYYY-MM-DDTHH:mm:ss)
  const pad = (n: number | string) => String(n).padStart(2, '0');
  const iso = `${targetDate.getFullYear()}-${pad(targetDate.getMonth() + 1)}-${pad(targetDate.getDate())}T${pad(hour)}:${pad(minute)}:00`;

  const timeDisplay = `${pad(hour)}:${pad(minute)}`;
  const labelPrefix = matchedDayLabel || (isEvening ? 'Akşam' : isMorning ? 'Sabah' : 'Bugün');

  return (hasDate || isExplicitTime || isEvening || isMorning || isNoon || isNight)
    ? {
        zaman: `${labelPrefix} ${timeDisplay}`,
        tarih_iso: iso,
      }
    : { zaman: null, tarih_iso: null };
}

// Global window binding
if (typeof window !== 'undefined') {
  (window as any).extractDateTimeFromTurkish = extractDateTimeFromTurkish;
}

/**
 * Bir ayın son haftasındaki hedef iş gününü (Varsayılan: Son Cuma veya son gün) hesaplar.
 * Eğer içinde bulunulan ayın son iş günü geçmişse bir sonraki ayınkini döndürür.
 */
export function getNextMonthEndTargetDate(baseDate: Date = new Date(), targetHour: number = 10, targetMinute: number = 0): Date {
  const findLastFridayOfMonth = (year: number, month: number): Date => {
    // month is 0-indexed. ayın son günü: new Date(year, month + 1, 0)
    const lastDay = new Date(year, month + 1, 0);
    const dayOfWeek = lastDay.getDay(); // 0: Pazar, 5: Cuma
    let offset = 0;
    if (dayOfWeek === 5) {
      offset = 0; // Zaten cuma
    } else if (dayOfWeek === 6) {
      offset = 1; // Cumartesi -> Cuma için 1 gün geri
    } else {
      // 0 (Pazar) -> 2 gün geri, 1 (Pazartesi) -> 3 gün geri vb.
      offset = (dayOfWeek + 2) % 7;
    }
    const target = new Date(year, month, lastDay.getDate() - offset, targetHour, targetMinute, 0, 0);
    return target;
  };

  let candidate = findLastFridayOfMonth(baseDate.getFullYear(), baseDate.getMonth());
  // Eğer bu ayın son cuması şimdiden geçmişse, bir sonraki ayınkini al
  if (candidate.getTime() <= baseDate.getTime()) {
    let nextMonth = baseDate.getMonth() + 1;
    let nextYear = baseDate.getFullYear();
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
    candidate = findLastFridayOfMonth(nextYear, nextMonth);
  }

  return candidate;
}

/**
 * ISO tarihini gün ofseti kadar kaydırıp yeni ISO döndürür
 */
export function calculateOffsetIso(targetIso: string | null | undefined, offsetDays: number): string | null {
  if (!targetIso) return null;
  try {
    const d = new Date(targetIso);
    if (isNaN(d.getTime())) return null;
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString();
  } catch {
    return null;
  }
}

