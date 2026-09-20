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

export interface TemporalResolutionResult {
  hasTemporal: boolean;
  zaman: string | null;
  tarih_iso: string | null;
  dayLabel: string;
  hour: number | null;
  minute: number;
  isRecurring: boolean;
  recurringDayName: string | null;
  cleanLabel: string;
  isSpecificTime: boolean;
}

/**
 * Metinden tüm zamansal ifadeleri (günler, saatler, süreler, periyotlar) ve
 * komut gürültülerini ayıklar; geriye sadece saf konu/etiket metnini bırakır.
 */
export function stripTemporalFromText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  let clean = text;

  // 1. Dijital saat formatları (Örn: "08:20", "8.20'de", "saat 14:30")
  clean = clean.replace(/\b(?:saat\s*)?\d{1,2}[:.]\d{2}(?:\s*['’]?(?:da|de|ta|te|ye|ya|e|a))?\b/gi, ' ');

  // 2. Sayısal ve sözel bağıl süreler ("20 dakika sonra", "3 saat sonra", "yarım saat sonra")
  clean = clean.replace(/\b\d+\s*(?:dakika|dk|saat|gün|gun|hafta|ay|yıl|yil)\s*sonra\b/gi, ' ');
  clean = clean.replace(/\b(?:bir|iki|üç|dört|beş|alti|yedi|sekiz|dokuz|on)\s*(?:dakika|dk|saat|gün|gun|hafta|ay)\s*sonra\b/gi, ' ');
  clean = clean.replace(/\b(?:yarım|buçuk|çeyrek)\s*saat\s*sonra\b/gi, ' ');
  clean = clean.replace(/\bbir\s*buçuk\s*saat\s*sonra\b/gi, ' ');

  // 3. Birleşik Türkçe saat ve dakika kalıpları (Örn: "sekiz yirmide", "dokuz buçukta", "on bir kırk beşte", "saat sekiz buçuk")
  clean = clean.replace(/\b(?:saat\s*)?(?:on\s*iki|oniki|on\s*bir|onbir|yirmi\s*üç|yirmi\s*iki|yirmi\s*bir|yirmi|on\s*dokuz|on\s*sekiz|on\s*yedi|on\s*altı|on\s*alti|on\s*beş|on\s*bes|on\s*dört|on\s*dort|on\s*üç|on\s*uc|on|dokuz|sekiz|yedi|altı|alti|beş|bes|dört|dort|üç|uc|iki|bir)\s+(?:buçukta|bucukta|buçuk|bucuk|çeyrekte|ceyrekte|çeyrek|ceyrek|elli\s*beşte|elli\s*beş|ellide|elli|kırk\s*beşte|kırk\s*beş|kırkta|kırk|otuz\s*beşte|otuz\s*beş|otuzda|otuz|yirmi\s*beşte|yirmi\s*beş|yirmide|yirmiye|yirmi|on\s*beşte|on\s*beş|onda|on)(?:\s*['’]?(?:da|de|ta|te|ye|ya))?\b/gi, ' ');

  // 4. Tekil saat ifadeleri (Örn: "saat 8'de", "8'de", "sekizde", "dokuzda", "saat onda", "on birde")
  clean = clean.replace(/\b(?:saat\s*)?\d{1,2}(?:\s*['’]?(?:da|de|ta|te|ye|ya|e|a))\b/gi, ' ');
  clean = clean.replace(/\b(?:saat\s*)?(?:on\s*iki|oniki|on\s*bir|onbir|on|dokuz|sekiz|yedi|altı|alti|beş|bes|dört|dort|üç|uc|iki|bir)(?:\s*['’]?(?:de|da|te|ta|ye|ya|e|a))\b/gi, ' ');
  clean = clean.replace(/\bsaat\s+\d{1,2}\b/gi, ' ');

  // 5. Haftanın günleri ve ekleri (Örn: "her pazartesi", "çarşamba günü", "cuma günkü", "salıya")
  clean = clean.replace(/\bher\s+(?:pazartesi|salı|sali|çarşamba|carsamba|perşembe|persembe|cuma|cumartesi|pazar)(?:\s*günü)?\b/gi, ' ');
  clean = clean.replace(/\b(?:pazartesi|salı|sali|çarşamba|carsamba|perşembe|persembe|cuma|cumartesi|pazar)(?:\s+günü|\s+günleri|\s+günkü)?(?:\s*['’]?(?:ye|ya|e|a|de|da|te|ta))?\b/gi, ' ');

  // 6. Bağıl günler (Örn: "yarınki", "yarın", "ertesi gün", "öbür gün", "bugün", "dün", "haftaya", "gelecek hafta")
  clean = clean.replace(/\b(?:yarınki|yarinki|yarın|yarin|ertesi\s+gün|ertesi\s+gun|öbür\s+gün|obur\s+gun|bugünkü|bugunku|bugün|bugun|bu\s+gün|dünkü|dunku|dün|dun|haftaya|gelecek\s+hafta|önümüzdeki\s+hafta|bu\s+hafta)\b/gi, ' ');

  // 7. Günün vakitleri (Örn: "sabah", "öğlen", "öğleden sonra", "akşam", "gece")
  clean = clean.replace(/\b(?:sabahleyin|sabahında|sabahı|sabaha|sabah|öğleden\s+sonra|ogleden\s+sonra|öğleyin|öğle\s+vakti|öğlen|oglen|öğle|ogle|ikindi\s+vakti|ikindileyin|ikindi|akşamleyin|akşamında|akşamı|aksami|akşama|aksama|akşam|aksam|geceleyin|gecesi|geceye|gece)\b/gi, ' ');

  // 8. Zamanla ilişkili edatlar ve kalıntılar (Örn: "itibarıyla", "itibariyle")
  clean = clean.replace(/\b(?:itibarıyla|itibariyle)\b/gi, ' ');

  // 9. Komut ve ses kalıntıları (Örn: "alarm kur", "beni kaldır", "hatırlat", "için alarm kur")
  clean = clean.replace(/\b(?:için\s+)?(?:alarm(?:\s*kur|\s*kurar\s*mısın|\s*ayarla|\s*oluştur)?|alarmını\s*kur|alarmi\s*kur)\b/gi, ' ');
  clean = clean.replace(/\b(?:için\s+)?(?:beni\s*kaldır|kaldır|uyandır)\b/gi, ' ');
  clean = clean.replace(/\b(?:için\s+)?(?:hatırlat(?:ıcı)?(?:\s*kur)?|hatırlatır\s*mısın|hatirlat)\b/gi, ' ');
  clean = clean.replace(/\b(?:için\s+)?(?:not\s+al|not\s+et|kaydet|ajandaya\s+yaz|takvime\s+ekle|ayarla)\b/gi, ' ');
  clean = clean.replace(/\b(?:için|icin)\s*$/gi, ' ');

  // 10. Yetim ekler ve noktalama işaretleri
  clean = clean
    .replace(/\b(?:['’]?(?:de|da|te|ta|ye|ya))\b/gi, ' ')
    .replace(/[\s\t\n]+/g, ' ')
    .replace(/^[.,;:!?\-–—\s]+/, '')
    .replace(/[.,;:!?\-–—\s]+$/, '')
    .trim();

  return clean;
}

/**
 * Doğal dil metnindeki zamansal komutları (tarih, saat, periyot) ve etiket metnini (başlık)
 * birbirinden tamamen bağımsız ve doğru şekilde çözümler.
 */
export function parseTemporalAndCleanLabel(
  rawText: string,
  baseDate: Date | string = new Date()
): TemporalResolutionResult {
  const lower = (rawText || '').toLowerCase().trim();
  const now = typeof baseDate === 'string' ? new Date(baseDate) : new Date(baseDate.getTime());
  const validNow = isNaN(now.getTime()) ? new Date() : now;

  let targetDate = new Date(validNow);
  let hasDate = false;
  let hasTime = false;
  let isExplicitTime = false;
  let isRecurring = false;
  let recurringDayName: string | null = null;
  let dayLabel = 'Bugün';

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

  // 1. Döngüsel Gün Kontrolü ("her pazartesi", "her cuma")
  const recurringMatch = lower.match(/\bher\s+(pazartesi|salı|sali|çarşamba|carsamba|perşembe|persembe|cuma|cumartesi|pazar)(?:\s*günü)?\b/i);
  if (recurringMatch) {
    isRecurring = true;
    const dName = recurringMatch[1].toLowerCase();
    recurringDayName = dayDisplay[dName] || dName;
    const dayIndex = days[dName];
    if (dayIndex !== undefined) {
      const currentDay = targetDate.getDay();
      let diff = dayIndex - currentDay;
      if (diff <= 0) diff += 7;
      targetDate.setDate(targetDate.getDate() + diff);
      hasDate = true;
      dayLabel = `Her ${recurringDayName}`;
    }
  }

  // 2. Bağıl Günler ("yarın", "bugün", "ertesi gün", "öbür gün", "3 gün sonra")
  if (!hasDate) {
    if (/\b(?:yarınki|yarinki|yarın|yarin|ertesi\s+gün|ertesi\s+gun)\b/i.test(lower)) {
      targetDate.setDate(targetDate.getDate() + 1);
      hasDate = true;
      dayLabel = 'Yarın';
    } else if (/\b(?:öbür\s+gün|obur\s+gun)\b/i.test(lower)) {
      targetDate.setDate(targetDate.getDate() + 2);
      hasDate = true;
      dayLabel = 'Öbür Gün';
    } else if (/\b(?:bugünkü|bugunku|bugün|bugun|bu\s+gün)\b/i.test(lower)) {
      hasDate = true;
      dayLabel = 'Bugün';
    } else if (/\b(?:dünkü|dunku|dün|dun)\b/i.test(lower)) {
      targetDate.setDate(targetDate.getDate() - 1);
      hasDate = true;
      dayLabel = 'Dün';
    } else {
      const daysLater = lower.match(/\b(\d+)\s*gün\s*sonra\b/i);
      if (daysLater) {
        const d = parseInt(daysLater[1], 10);
        targetDate.setDate(targetDate.getDate() + d);
        hasDate = true;
        dayLabel = `${d} Gün Sonra`;
      } else {
        const weeksLater = lower.match(/\b(\d+)\s*hafta\s*sonra\b/i);
        if (weeksLater) {
          const w = parseInt(weeksLater[1], 10);
          targetDate.setDate(targetDate.getDate() + w * 7);
          hasDate = true;
          dayLabel = `${w} Hafta Sonra`;
        } else if (/\b(?:haftaya|gelecek\s+hafta|önümüzdeki\s+hafta)\b/i.test(lower)) {
          targetDate.setDate(targetDate.getDate() + 7);
          hasDate = true;
          dayLabel = 'Haftaya';
        }
      }
    }
  }

  // 3. Belirli Gün İsimleri ("pazartesi", "çarşamba günü" vb.)
  if (!hasDate) {
    for (const [dayName, dayIndex] of Object.entries(days)) {
      const reg = new RegExp(`\\b${dayName}(?:\\s+günü|\\s+günleri|\\s+günkü)?(?:['’]?(?:ye|ya|e|a|de|da|te|ta))?\\b`, 'i');
      if (reg.test(lower)) {
        const currentDay = targetDate.getDay();
        let diff = dayIndex - currentDay;
        if (diff <= 0) diff += 7;
        targetDate.setDate(targetDate.getDate() + diff);
        hasDate = true;
        dayLabel = dayDisplay[dayName] || dayName;
        break;
      }
    }
  }

  // 4. Vakit / Zaman Dilimi Göstergeleri
  const isMorning = /\b(?:sabahleyin|sabahında|sabahı|sabaha|sabah)\b/i.test(lower);
  const isNoon = /\b(?:öğleyin|öğle\s+vakti|öğlen|oglen|öğle|ogle)\b/i.test(lower);
  const isAfternoon = /\b(?:öğleden\s+sonra|ogleden\s+sonra|ikindi\s+vakti|ikindileyin|ikindi)\b/i.test(lower);
  const isEvening = /\b(?:akşamleyin|akşamında|akşamı|aksami|akşama|aksama|akşam|aksam)\b/i.test(lower);
  const isNight = /\b(?:geceleyin|gecesi|geceye|gece)\b/i.test(lower);

  // 5. Bağıl Dakika / Saat Geri Sayımı ("40 dakika sonra", "1 saat sonra")
  const minsLater = lower.match(/\b(\d+)\s*(?:dakika|dk)\s*sonra\b/i);
  const hoursLater = lower.match(/\b(\d+)\s*saat\s*sonra\b/i);
  if (minsLater) {
    const mins = parseInt(minsLater[1], 10);
    targetDate = new Date(validNow.getTime() + mins * 60000);
    hasDate = true;
    hasTime = true;
    isExplicitTime = true;
    dayLabel = 'Bugün';
  } else if (hoursLater) {
    const hrs = parseInt(hoursLater[1], 10);
    targetDate = new Date(validNow.getTime() + hrs * 3600000);
    hasDate = true;
    hasTime = true;
    isExplicitTime = true;
    dayLabel = 'Bugün';
  }

  let hour: number | null = hasTime ? targetDate.getHours() : null;
  let minute: number = hasTime ? targetDate.getMinutes() : 0;

  // 6. Sayısal Saat Çözümleme (Örn: "08:20", "8.20'de", "saat 14:00")
  if (!hasTime) {
    const colonMatch = lower.match(/\b(?:saat\s*)?(\d{1,2})[:.](\d{2})(?:\s*['’]?(?:da|de|ta|te|ye|ya|e|a))?\b/i);
    if (colonMatch) {
      hour = parseInt(colonMatch[1], 10);
      minute = parseInt(colonMatch[2], 10);
      hasTime = true;
      isExplicitTime = true;
    }
  }

  // 7. Türkçe Sözcüklerle Saat + Dakika Çözümleme
  // Örn: "sekiz yirmide", "sekiz buçukta", "dokuz ellide", "on bir kırk beşte", "saat on iki buçuk"
  if (!hasTime) {
    const hourWords: [string, number][] = [
      ['on iki', 12], ['oniki', 12], ['on bir', 11], ['onbir', 11],
      ['yirmi dört', 24], ['yirmi üç', 23], ['yirmi iki', 22], ['yirmi bir', 21],
      ['yirmi', 20], ['on dokuz', 19], ['on sekiz', 18], ['on yedi', 17],
      ['on altı', 16], ['on alti', 16], ['on beş', 15], ['on bes', 15],
      ['on dört', 14], ['on dort', 14], ['on üç', 13], ['on uc', 13],
      ['on', 10], ['dokuz', 9], ['sekiz', 8], ['yedi', 7], ['altı', 6], ['alti', 6],
      ['beş', 5], ['bes', 5], ['dört', 4], ['dort', 4], ['üç', 3], ['uc', 3],
      ['iki', 2], ['bir', 1]
    ];

    const minuteWords: [string, number][] = [
      ['elli beş', 55], ['elli bes', 55], ['elli', 50],
      ['kırk beş', 45], ['kirk bes', 45], ['kırk', 40], ['kirk', 40],
      ['otuz beş', 35], ['otuz bes', 35], ['otuz', 30], ['buçuk', 30], ['bucuk', 30],
      ['yirmi beş', 25], ['yirmi bes', 25], ['yirmi', 20],
      ['on beş', 15], ['on bes', 15], ['çeyrek', 15], ['ceyrek', 15],
      ['on', 10], ['dokuz', 9], ['sekiz', 8], ['yedi', 7], ['altı', 6], ['alti', 6],
      ['beş', 5], ['bes', 5], ['dört', 4], ['dort', 4], ['üç', 3], ['uc', 3],
      ['iki', 2], ['bir', 1]
    ];

    for (const [hWord, hVal] of hourWords) {
      for (const [mWord, mVal] of minuteWords) {
        const reg = new RegExp(`\\b(?:saat\s*)?${hWord}\\s+${mWord}(?:ta|te|da|de|ya|ye)?\\b`, 'i');
        if (reg.test(lower)) {
          hour = hVal;
          minute = mVal;
          hasTime = true;
          isExplicitTime = true;
          break;
        }
      }
      if (hasTime) break;
    }
  }

  // 8. Tekil Saat Çözümleme ("saat 8'de", "8'de", "sekizde", "dokuzda", "saat onda", "on birde")
  if (!hasTime) {
    const digitHour = lower.match(/(?:saat\s*|akşam\s*|aksam\s*|sabah\s*|gece\s*|öğlen\s*)(\d{1,2})(?:\s*['’]?(?:da|de|ta|te|ye|ya|e|a))?/i) ||
      lower.match(/\b(\d{1,2})\s*['’]?(?:da|de|ta|te|ye|ya|e|a)\b/i);
    if (digitHour) {
      hour = parseInt(digitHour[1], 10);
      minute = 0;
      hasTime = true;
      isExplicitTime = true;
    }
  }

  if (!hasTime) {
    const hourWordsSingle: [string, number][] = [
      ['on iki', 12], ['oniki', 12], ['on bir', 11], ['onbir', 11],
      ['on', 10], ['dokuz', 9], ['sekiz', 8], ['yedi', 7], ['altı', 6], ['alti', 6],
      ['beş', 5], ['bes', 5], ['dört', 4], ['dort', 4], ['üç', 3], ['uc', 3],
      ['iki', 2], ['bir', 1]
    ];
    for (const [word, val] of hourWordsSingle) {
      const reg = new RegExp(`\\b(?:saat\s*)?${word}(?:['’]?(?:de|da|te|ta|ye|ya|e|a))\\b`, 'i');
      if (reg.test(lower)) {
        hour = val;
        minute = 0;
        hasTime = true;
        isExplicitTime = true;
        break;
      }
    }
  }

  // 9. 12 Saat Formatından 24 Saat Formatına Dönüştürme
  if (hour !== null) {
    if (isEvening && hour < 12) {
      hour += 12; // Örn: Akşam 8 -> 20, Akşam 9 -> 21
    } else if (isAfternoon && hour < 12) {
      hour += 12; // Örn: Öğleden sonra 2 -> 14, 3 -> 15
    } else if (isNight) {
      if (hour >= 9 && hour <= 11) hour += 12; // Gece 10 -> 22, 11 -> 23
      else if (hour === 12) hour = 0;
    } else if (isNoon) {
      if (hour >= 1 && hour <= 3) hour += 12; // Öğlen 1 -> 13, 2 -> 14
    } else if (isMorning && hour === 12) {
      hour = 0;
    }
  } else {
    // Saat belirtilmediyse vakit bağlamına göre varsayılanlar
    if (isMorning) { hour = 8; minute = 0; }
    else if (isNoon) { hour = 12; minute = 30; }
    else if (isAfternoon) { hour = 14; minute = 30; }
    else if (isEvening) { hour = 19; minute = 30; }
    else if (isNight) { hour = 22; minute = 0; }
  }

  // Saat sınır koruması
  if (hour !== null) {
    if (hour < 0) hour = 0;
    if (hour > 23) hour = 23;
  }
  if (minute < 0) minute = 0;
  if (minute > 59) minute = 59;

  // Hedef tarihe saati uygula
  if (hour !== null) {
    targetDate.setHours(hour, minute, 0, 0);
    // Gün belirtilmediyse ve hesaplanan saat bugünün şu anki vaktinden önceyse yarına al
    if (!hasDate && targetDate.getTime() <= validNow.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1);
      hasDate = true;
      dayLabel = 'Yarın';
    }
  }

  const hasTemporal = hasDate || hasTime || isExplicitTime || isEvening || isMorning || isNoon || isNight || isAfternoon;

  // 10. ISO Formatı ve Zaman Etiketi
  const pad = (n: number | string) => String(n).padStart(2, '0');
  const hDisplay = hour !== null ? hour : 9;
  const mDisplay = minute;
  const iso = `${targetDate.getFullYear()}-${pad(targetDate.getMonth() + 1)}-${pad(targetDate.getDate())}T${pad(hDisplay)}:${pad(mDisplay)}:00`;

  let zaman: string | null = null;
  if (hasTemporal) {
    const timeStr = `${pad(hDisplay)}:${pad(mDisplay)}`;
    if (isRecurring && recurringDayName) {
      zaman = `Her ${recurringDayName} ${timeStr}`;
    } else if (dayLabel === 'Bugün') {
      const prefix = isEvening ? 'Bu Akşam' : isMorning ? 'Bu Sabah' : 'Bugün';
      zaman = `${prefix} ${timeStr}`;
    } else if (dayLabel === 'Yarın') {
      const prefix = isEvening ? 'Yarın Akşam' : isMorning ? 'Yarın Sabah' : 'Yarın';
      zaman = `${prefix} ${timeStr}`;
    } else {
      zaman = `${dayLabel} ${timeStr}`;
    }
  }

  // 11. Bağımsız Etiket / Başlık Metni Çıkarımı (Tarih ve zaman ifadelerinden tamamen arındırılmış)
  let cleanLabel = stripTemporalFromText(rawText);

  // Başlık boş kalmışsa (Örn: Sadece "yarın sabah sekiz yirmide beni kaldır" denmişse)
  if (!cleanLabel || cleanLabel.length < 2) {
    if (isMorning) cleanLabel = 'Sabah Uyanış Alarmı';
    else if (isEvening) cleanLabel = 'Akşam Alarmı';
    else if (hasTime) cleanLabel = 'Alarm & Hatırlatıcı';
    else cleanLabel = 'Yeni Hatırlatıcı';
  } else {
    // Kelimelerin ilk harflerini düzgün Türkçe kurallarıyla büyüt
    cleanLabel = cleanLabel
      .split(' ')
      .map(w => w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1))
      .join(' ');
  }

  return {
    hasTemporal,
    zaman,
    tarih_iso: hasTemporal ? iso : null,
    dayLabel,
    hour,
    minute,
    isRecurring,
    recurringDayName,
    cleanLabel,
    isSpecificTime: isExplicitTime
  };
}

/**
 * Geriye dönük uyumluluk wrapper'ı. Hem zaman ve tarih_iso hem de yeni bağımsız
 * cleanLabel ve çözümlenmiş bileşenleri döndürür.
 */
export function extractDateTimeFromTurkish(
  text: string,
  baseDate: Date | string = new Date()
): {
  zaman: string | null;
  tarih_iso: string | null;
  cleanLabel: string;
  hour: number | null;
  minute: number;
  dayLabel: string;
  hasTemporal: boolean;
} {
  const res = parseTemporalAndCleanLabel(text, baseDate);
  return {
    zaman: res.zaman,
    tarih_iso: res.tarih_iso,
    cleanLabel: res.cleanLabel,
    hour: res.hour,
    minute: res.minute,
    dayLabel: res.dayLabel,
    hasTemporal: res.hasTemporal
  };
}

// Global window binding
if (typeof window !== 'undefined') {
  (window as any).extractDateTimeFromTurkish = extractDateTimeFromTurkish;
  (window as any).parseDailyLifeTime = parseDailyLifeTime;
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

// Hafta sonu kontrolü ve ilk iş gününe öteleme (HMK md. 93)
export function rollToNextBusinessDay(date: Date): { finalDate: Date; isRolled: boolean } {
  const result = new Date(date.getTime());
  const day = result.getDay();

  if (day === 6) { // Cumartesi -> Pazartesi
    result.setDate(result.getDate() + 2);
    return { finalDate: result, isRolled: true };
  } else if (day === 0) { // Pazar -> Pazartesi
    result.setDate(result.getDate() + 1);
    return { finalDate: result, isRolled: true };
  }
  return { finalDate: result, isRolled: false };
}

// Tebligat Kanunu 7/a uyarınca UETS tebliğ ve kesin süre hesabı
export interface UetsCalculationResult {
  uetsUlasmaTarihi: string;       // Sisteme düştüğü tarih
  tebligSayilmaTarihi: string;     // 5 gün sonra tebliğ sayıldığı an
  sureBaslangicTarihi: string;     // Yasal sürenin fiilen işlemeye başladığı gün
  yasalSonGun: string;            // Hafta sonu kaydırılmış nihai son işlem tarihi
  kalanGun: number;
  anomaliUyarisi: string;
}

export function calculateUetsDeadline(
  arrivalDateIso: string,
  legalDurationDays: number = 14 // Örn: İstinaf 14 gün, itiraz 7 gün
): UetsCalculationResult {
  const arrival = new Date(arrivalDateIso);

  // 1. Tebligat Kanunu 7/a: Ulaştığı tarihi izleyen 5. günün sonu
  const tebligSayilma = new Date(arrival.getTime());
  tebligSayilma.setDate(tebligSayilma.getDate() + 5);
  tebligSayilma.setHours(23, 59, 59, 999);

  // 2. Süre tebliğ sayılmayı izleyen gün başlar
  const sureBaslangic = new Date(tebligSayilma.getTime());
  sureBaslangic.setDate(sureBaslangic.getDate() + 1);
  sureBaslangic.setHours(0, 0, 0, 0);

  // 3. Yasal süreyi ekle
  const rawDeadline = new Date(sureBaslangic.getTime());
  rawDeadline.setDate(rawDeadline.getDate() + (legalDurationDays - 1));
  rawDeadline.setHours(23, 59, 0, 0);

  // 4. Hafta sonu çakışma kontrolü
  const { finalDate: finalDeadline, isRolled } = rollToNextBusinessDay(rawDeadline);

  const today = new Date();
  const diffMs = finalDeadline.getTime() - today.getTime();
  const kalanGun = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  let anomali = `Tebligat Kanunu 7/a gereği 5 günlük bekleme süresi işletilmiştir. Süre ${formatDate(sureBaslangic)} tarihinde başlar.`;
  if (isRolled) {
    anomali += ' Son gün hafta sonuna denk geldiği için HMK Md. 93 uyarınca ilk iş günü Pazartesi 23:59\'a uzatılmıştır.';
  }

  return {
    uetsUlasmaTarihi: formatDate(arrival),
    tebligSayilmaTarihi: formatDate(tebligSayilma),
    sureBaslangicTarihi: formatDate(sureBaslangic),
    yasalSonGun: formatDate(finalDeadline),
    kalanGun,
    anomaliUyarisi: anomali
  };
}

// Aylık SMMM Vergi Takvimi Üretici (Ayın 26'sı ve Ay Sonu)
export function getTaxCalendarDeadlines(year: number, monthZeroBased: number) {
  // Ayın 26'sı (KDV-1, KDV-2, MUHSGK)
  const kdvDate = new Date(year, monthZeroBased, 26, 23, 59, 0);
  const { finalDate: finalKdv, isRolled: isKdvRolled } = rollToNextBusinessDay(kdvDate);

  // Ayın son günü (SGK Primleri & e-Defter Beratı)
  const lastDayOfMonth = new Date(year, monthZeroBased + 1, 0, 23, 59, 0);
  const { finalDate: finalSgk, isRolled: isSgkRolled } = rollToNextBusinessDay(lastDayOfMonth);

  const pad = (n: number) => String(n).padStart(2, '0');
  const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  return {
    kdvDeadlineIso: fmt(finalKdv),
    isKdvRolled,
    sgkDeadlineIso: fmt(finalSgk),
    isSgkRolled
  };
}

export interface ParsedTimeResult {
  isoString: string;
  displayZaman: string;
  isAlarm: boolean;
  sureDakika?: number;
}

export function parseDailyLifeTime(rawText: string, language: string = 'tr'): ParsedTimeResult | null {
  let text = rawText.toLowerCase().trim();
  const isEn = language === 'en';

  // Kelime bazlı göreceli süreleri dakikaya dönüştür (TR & EN)
  text = text
    .replace(/yarım\s*saat\s*sonra/gi, '30 dakika sonra')
    .replace(/çeyrek\s*saat\s*sonra/gi, '15 dakika sonra')
    .replace(/bir\s*buçuk\s*saat\s*sonra/gi, '90 dakika sonra')
    .replace(/in\s*half\s*an?\s*hour/gi, 'in 30 minutes')
    .replace(/in\s*a\s*quarter\s*hour/gi, 'in 15 minutes')
    .replace(/in\s*an?\s*hour/gi, 'in 60 minutes')
    .replace(/uyandır/gi, 'alarm kur')
    .replace(/wake\s*me\s*up/gi, 'alarm')
    .replace(/set\s*(?:an?\s*)?alarm/gi, 'alarm')
    .replace(/set\s*(?:a\s*)?timer/gi, 'timer');

  const now = new Date();

  // 1. "X dakika / saat sonra" or "in X minutes / hours" (Zamanlayıcı / Geri Sayım)
  const relativeMatch = text.match(/(?:in\s+)?(\d+)\s*(dakika|dk|saat|mins?|minutes?|hours?|hrs?)(?:\s*sonra)?/i);
  if (relativeMatch) {
    const value = parseInt(relativeMatch[1], 10);
    const unitRaw = relativeMatch[2].toLowerCase();
    const isHours = unitRaw.startsWith('saat') || unitRaw.startsWith('hour') || unitRaw.startsWith('hr');
    const minutes = isHours ? value * 60 : value;
    const targetDate = new Date(now.getTime() + minutes * 60 * 1000);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const timeFormatted = `${pad(targetDate.getHours())}:${pad(targetDate.getMinutes())}`;
    const displayZaman = isEn
      ? `In ${value} ${isHours ? (value === 1 ? 'hour' : 'hours') : (value === 1 ? 'minute' : 'minutes')} (${timeFormatted})`
      : `${value} ${isHours ? 'saat' : 'dakika'} sonra (${timeFormatted})`;

    return {
      isoString: targetDate.toISOString(),
      displayZaman,
      isAlarm: true,
      sureDakika: minutes
    };
  }

  // 2. "Sabah 9", "Akşam 8", "at 8 am", "at 9:30 pm", "tomorrow at 8", "09:00"
  const isMorningEn = /morning|am\b/i.test(text);
  const isEveningEn = /evening|night|pm\b/i.test(text);
  const isTomorrowExplicit = /tomorrow|yarın|yarin/i.test(text);

  const timeRegex = /(sabah|öğlen|akşam|gece|morning|evening|afternoon|night)?\s*(?:at\s*)?(\d{1,2})(?::(\d{2}))?\s*(am|pm|'da|'de|'te|'ta|da|de|alarm|kaldır|hatırlat|remind)?/i;
  const match = text.match(timeRegex);

  if (match && (text.includes('alarm') || text.includes('kaldır') || text.includes('hatırlat') || text.includes('remind') || text.includes('timer') || match[1] || match[4] === 'am' || match[4] === 'pm')) {
    const period = (match[1] || '').toLowerCase();
    const ampm = (match[4] || '').toLowerCase();
    let hours = parseInt(match[2], 10);
    const minutes = match[3] ? parseInt(match[3], 10) : 0;

    // Saat dilimi düzeltmesi (12h -> 24h dönüşümü)
    if ((period === 'akşam' || period === 'evening' || period === 'night' || ampm === 'pm') && hours < 12) hours += 12;
    if ((period === 'öğlen' || period === 'afternoon') && hours < 12 && hours !== 12) hours += 12;
    if ((period === 'gece' || (ampm === 'am' && hours === 12)) && hours === 12) hours = 0;

    const targetDate = new Date(now.getTime());
    targetDate.setHours(hours, minutes, 0, 0);

    // Eğer belirtilen saat bugün geçtiyse veya yarın denmişse hedef yarındır
    if (isTomorrowExplicit || targetDate.getTime() <= now.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const pad = (n: number) => n.toString().padStart(2, '0');
    const isTomorrow = targetDate.getDate() !== now.getDate();

    const prefix = isEn
      ? (isTomorrow ? 'Tomorrow ' : 'Today ')
      : (isTomorrow ? 'Yarın ' : 'Bugün ');

    return {
      isoString: targetDate.toISOString(),
      displayZaman: `${prefix}${pad(hours)}:${pad(minutes)}`,
      isAlarm: text.includes('alarm') || text.includes('kaldır') || text.includes('wake')
    };
  }

  return null;
}

