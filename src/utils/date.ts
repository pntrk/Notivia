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
    çarşamba: 3,
    perşembe: 4,
    cuma: 5,
    cumartesi: 6,
  };

  let targetDate = new Date(baseDate);
  let hasDate = false;

  // 1. Gün Tespiti
  for (const [dayName, dayIndex] of Object.entries(days)) {
    if (lower.includes(dayName)) {
      const currentDay = targetDate.getDay();
      let diff = dayIndex - currentDay;
      if (diff <= 0) diff += 7; // Önümüzdeki ilk ilgili gün
      targetDate.setDate(targetDate.getDate() + diff);
      hasDate = true;
      break;
    }
  }

  if (lower.includes("yarın")) {
    targetDate.setDate(targetDate.getDate() + 1);
    hasDate = true;
  }

  // 2. Saat / Vakit Tespiti
  let hour = 9,
    minute = 0;
  if (lower.includes("öğlen") || lower.includes("öğle")) hour = 13;
  else if (lower.includes("akşam")) hour = 19;
  else if (lower.includes("gece")) hour = 21;
  else if (lower.includes("sabah")) hour = 9;

  targetDate.setHours(hour, minute, 0, 0);

  // ISO Formatı (YYYY-MM-DDTHH:mm:ss)
  const pad = (n: number | string) => String(n).padStart(2, '0');
  const iso = `${targetDate.getFullYear()}-${pad(targetDate.getMonth() + 1)}-${pad(targetDate.getDate())}T${pad(hour)}:${pad(minute)}:00`;

  return hasDate
    ? {
        zaman: `${lower.includes("cuma") ? "Cuma" : "Tarihli"} ${pad(hour)}:${pad(minute)}`,
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

