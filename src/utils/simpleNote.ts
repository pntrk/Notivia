import type { NotiviaParsedNote, NotiviaSimpleNote } from '../types/notivia.ts';
import { getNextMonthEndTargetDate } from './date.ts';
import { inferPredictiveActions } from './predictiveGraph.ts';
import { matchShortScenario } from './scenarioDatabase.ts';
import { getCardColor } from './cardColors.ts';
export { extractDateTimeFromTurkish, getNextMonthEndTargetDate } from './date.ts';
export { inferPredictiveActions } from './predictiveGraph.ts';
export { matchShortScenario } from './scenarioDatabase.ts';
export { getCardColor } from './cardColors.ts';

export function toSimpleNote(note: NotiviaParsedNote): NotiviaSimpleNote {
  let zamanStr: string | null = null;
  let tarihIso: string | null = null;

  if (note.periodic_log.is_periodic) {
    const days = note.periodic_log.interval_days;
    if (days === 180) zamanStr = '6 ay sonra';
    else if (days === 90) zamanStr = '3 ayda bir';
    else if (days === 30) zamanStr = 'Ayda bir';
    else if (days === 7) zamanStr = 'Haftada bir';
    else if (days) zamanStr = `${days} günde bir`;
    tarihIso = note.periodic_log.next_due_date || null;
  } else if (note.calendar_event.has_event && note.calendar_event.start_datetime) {
    try {
      tarihIso = note.calendar_event.start_datetime;
      const d = new Date(note.calendar_event.start_datetime);
      const hours = d.getHours().toString().padStart(2, '0');
      const mins = d.getMinutes().toString().padStart(2, '0');
      const timePart = `${hours}:${mins}`;

      const now = new Date(note.reference_datetime || Date.now());
      const diffDays = Math.round((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
      const dayName = daysOfWeek[d.getDay()];

      if (diffDays === 0) {
        zamanStr = `Bugün ${timePart}`;
      } else if (diffDays === 1) {
        zamanStr = `Yarın ${timePart}`;
      } else if (diffDays > 1 && diffDays < 7) {
        zamanStr = `${dayName} ${timePart}`;
      } else {
        zamanStr = `${d.getDate()} ${new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(d)} ${timePart}`;
      }
    } catch {
      zamanStr = null;
    }
  }

  // Pick first emoji for ikon
  const emojiMatch = note.ui_meta.icon.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u);
  const singleEmoji = emojiMatch ? emojiMatch[0] : '📝';

  return {
    baslik: note.summary,
    zaman: zamanStr,
    tarih_iso: tarihIso,
    anomali_notu: note.anomali_notu || null,
    tetikleyici: (note as any).tetikleyici || null,
    ikon: singleEmoji,
    renk: note.ui_meta.color_hex || '#FEF3C7',
  };
}

// 1. Türkçe Zaman ve Göreceli Periyot Ayrıştırıcı
interface TemporalParseResult {
  zaman: string | null;
  tarih_iso: string | null;
  isRecurringDay: boolean;
  recurringDayName: string | null;
  hour: number;
  minute: number;
}

const DAYS_MAP: Record<string, number> = {
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

const DAYS_DISPLAY: Record<string, string> = {
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

function parseTurkishTemporal(text: string, baseDate: Date): TemporalParseResult {
  const lower = text.toLowerCase();
  const target = new Date(baseDate.getTime());
  let hasDate = false;

  // "her cuma", "her pazartesi" döngü tespiti
  let isRecurringDay = false;
  let recurringDayName: string | null = null;
  const recurringDayMatch = lower.match(/\bher\s+(pazartesi|salı|sali|çarşamba|carsamba|perşembe|persembe|cuma|cumartesi|pazar)\b/i);
  if (recurringDayMatch) {
    isRecurringDay = true;
    recurringDayName = recurringDayMatch[1].toLowerCase();
  }

  let matchedDayKey: string | null = recurringDayName;
  if (!matchedDayKey) {
    for (const dKey of Object.keys(DAYS_MAP)) {
      if (new RegExp(`\\b${dKey}\\b`, 'i').test(lower)) {
        matchedDayKey = dKey;
        break;
      }
    }
  }

  if (matchedDayKey && DAYS_MAP[matchedDayKey] !== undefined) {
    const current = target.getDay();
    const targetIdx = DAYS_MAP[matchedDayKey];
    let diff = targetIdx - current;
    if (diff <= 0) diff += 7;
    target.setDate(target.getDate() + diff);
    hasDate = true;
  }

  if (lower.includes('yarın') || lower.includes('yarin')) {
    target.setDate(target.getDate() + 1);
    hasDate = true;
  } else if (lower.includes('öbür gün') || lower.includes('obur gun')) {
    target.setDate(target.getDate() + 2);
    hasDate = true;
  }

  const gunMatch = lower.match(/(\d+)\s*gün\s*sonra/);
  const ayMatch = lower.match(/(\d+)\s*ay\s*sonra/);
  if (gunMatch) {
    target.setDate(target.getDate() + parseInt(gunMatch[1], 10));
    hasDate = true;
  } else if (ayMatch) {
    target.setMonth(target.getMonth() + parseInt(ayMatch[1], 10));
    hasDate = true;
  }

  // Saat tespiti: "saat 9 da", "saat 9", "09:00", "9:00", "14:30", "9 da", "9'da", "9'de"
  let hour = 9, minute = 0;
  let hasSpecificTime = false;

  const clockRegex = /(?:saat\s*)?(\d{1,2})[:.](\d{2})|saat\s*(\d{1,2})|\b(\d{1,2})\s*(?:'da|'de|da|de|'te|'te|ta|te)\b/;
  const clockMatch = lower.match(clockRegex);

  if (clockMatch) {
    if (clockMatch[1]) {
      hour = parseInt(clockMatch[1], 10);
      minute = parseInt(clockMatch[2], 10);
      hasSpecificTime = true;
      hasDate = true;
    } else if (clockMatch[3]) {
      hour = parseInt(clockMatch[3], 10);
      minute = 0;
      hasSpecificTime = true;
      hasDate = true;
    } else if (clockMatch[4]) {
      const parsedVal = parseInt(clockMatch[4], 10);
      if (parsedVal >= 1 && parsedVal <= 24) {
        hour = parsedVal;
        minute = 0;
        hasSpecificTime = true;
        hasDate = true;
      }
    }
  } else if (lower.includes('sabah')) {
    hour = 9;
    hasSpecificTime = true;
  } else if (lower.includes('öğle') || lower.includes('öğlen')) {
    hour = 13;
    hasSpecificTime = true;
  } else if (lower.includes('akşam')) {
    hour = 19;
    hasSpecificTime = true;
  } else if (lower.includes('gece')) {
    hour = 21;
    minute = 30;
    hasSpecificTime = true;
  }

  target.setHours(hour, minute, 0, 0);

  const pad = (n: number) => String(n).padStart(2, '0');
  const iso = `${target.getFullYear()}-${pad(target.getMonth() + 1)}-${pad(target.getDate())}T${pad(hour)}:${pad(minute)}:00`;
  const gunIsimleri = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  const zamanStr = hasDate
    ? `${gunIsimleri[target.getDay()]} ${pad(hour)}:${pad(minute)}`
    : (hasSpecificTime ? `Bugün ${pad(hour)}:${pad(minute)}` : null);

  return {
    zaman: zamanStr,
    tarih_iso: hasDate || hasSpecificTime ? iso : null,
    isRecurringDay,
    recurringDayName,
    hour,
    minute,
  };
}

// 2. Sözdizimsel Anlam ve Rol Çözümleyici (Özne - Nesne - Yüklem)
export function extractSimpleNoteFromText(
  input: string,
  refDatetime?: string,
  pastNotes?: any[]
): NotiviaSimpleNote {
  const cleanInput = input.trim();
  const lower = cleanInput.toLowerCase();
  const baseDate = refDatetime ? new Date(refDatetime) : new Date();

  const temporal = parseTurkishTemporal(cleanInput, baseDate);
  const { zaman, tarih_iso, isRecurringDay, recurringDayName, hour, minute } = temporal;
  const pad = (n: number) => String(n).padStart(2, '0');

  // A0. DÖNGÜSEL / PERİYODİK TEKRARLAMA TESPİTİ
  let periyodik: NotiviaSimpleNote['periyodik'] = null;
  let periodicZaman = zaman;
  let periodicIso = tarih_iso;

  if (isRecurringDay && recurringDayName) {
    const dayDisplay = DAYS_DISPLAY[recurringDayName] || 'Cuma';
    periodicZaman = `Her ${dayDisplay} ${pad(hour)}:${pad(minute)}`;
    periodicIso = tarih_iso;
    periyodik = {
      tip: 'haftalik',
      aralik_gun: 7,
      bir_sonraki_tarih_iso: periodicIso || undefined,
    };
  } else if (
    lower.includes('her ay sonu') ||
    lower.includes('her ayın son') ||
    lower.includes('ay sonu') ||
    lower.includes('ay sonunda') ||
    lower.includes('ayın sonunda')
  ) {
    const nextTarget = getNextMonthEndTargetDate(baseDate, 10, 0);
    periodicIso = `${nextTarget.getFullYear()}-${pad(nextTarget.getMonth() + 1)}-${pad(nextTarget.getDate())}T${pad(nextTarget.getHours())}:${pad(nextTarget.getMinutes())}:00`;
    
    const gunIsimleri = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const ayIsimleri = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    periodicZaman = `Her Ay Sonu (${nextTarget.getDate()} ${ayIsimleri[nextTarget.getMonth()]} ${gunIsimleri[nextTarget.getDay()]})`;

    periyodik = {
      tip: 'aylik_son_hafta',
      aralik_gun: 30,
      bir_sonraki_tarih_iso: periodicIso,
    };
  } else if (lower.includes('her ay') || lower.includes('ayda bir')) {
    const nextTarget = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    periodicIso = `${nextTarget.getFullYear()}-${pad(nextTarget.getMonth() + 1)}-${pad(nextTarget.getDate())}T10:00:00`;
    periodicZaman = `Her Ay (${nextTarget.getDate()} ${new Intl.DateTimeFormat('tr-TR', { month: 'short' }).format(nextTarget)})`;
    periyodik = {
      tip: 'aylik',
      aralik_gun: 30,
      bir_sonraki_tarih_iso: periodicIso,
    };
  } else if (lower.includes('her hafta') || lower.includes('haftada bir')) {
    const nextTarget = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    periodicIso = `${nextTarget.getFullYear()}-${pad(nextTarget.getMonth() + 1)}-${pad(nextTarget.getDate())}T10:00:00`;
    periodicZaman = 'Her Hafta';
    periyodik = {
      tip: 'haftalik',
      aralik_gun: 7,
      bir_sonraki_tarih_iso: periodicIso,
    };
  } else if (lower.includes('her gün') || lower.includes('hergun') || lower.includes('günlük')) {
    const nextTarget = new Date(baseDate.getTime() + 24 * 60 * 60 * 1000);
    periodicIso = `${nextTarget.getFullYear()}-${pad(nextTarget.getMonth() + 1)}-${pad(nextTarget.getDate())}T${pad(hour)}:${pad(minute)}:00`;
    periodicZaman = `Her Gün ${pad(hour)}:${pad(minute)}`;
    periyodik = {
      tip: 'gunluk',
      aralik_gun: 1,
      bir_sonraki_tarih_iso: periodicIso,
    };
  }

  // A. KOŞUL VE TETİKLEYİCİ TESPİTİ (Zaman içermeyen şartlar)
  let tetikleyici: { tip: 'finansal' | 'mekan' | 'kisi' | 'durum' | 'zincirleme' | null; sart: string; etiket: string } | null = null;
  if (lower.includes('maaş yatınca')) {
    tetikleyici = { tip: 'finansal', sart: 'Maaş yatması', etiket: '⚡ Maaş Gününde' };
  } else if (lower.includes('sanayiye yolum') || lower.includes('sanayiye gidince') || lower.includes('sanayide')) {
    tetikleyici = { tip: 'mekan', sart: 'Sanayi ziyareti', etiket: '📍 Sanayi Uğraması' };
  } else if (lower.includes('veli toplantıs') || lower.includes('toplantıda')) {
    tetikleyici = { tip: 'mekan', sart: 'Toplantı', etiket: '📍 Toplantıda' };
  }

  // 1. ÖNCELİK: TOPLANTI, YÖNETİM & RESMİ GÖRÜŞMELER
  // Kullanıcı "her cuma müdürle toplantı", "veli toplantısı", "öğretmenler kurulu" vb. söylediğinde
  // asla finans veya borç ile karıştırılmamalı, doğrudan toplantı kartı açılmalıdır!
  const isMeeting = 
    lower.includes('toplantı') || lower.includes('toplanti') ||
    lower.includes('görüşme') || lower.includes('gorusme') ||
    lower.includes('mülakat') || lower.includes('buluşma') ||
    lower.includes('kurul') ||
    (lower.includes('müdür') && !lower.includes('tl') && !lower.includes('lira') && !lower.includes('borç') && !lower.includes('öde'));

  if (isMeeting) {
    let baslik = 'Toplantı';
    let ikon = '🤝';
    let renk = '#E0F2FE'; // Pastel Mavi (Kurumsal / Resmi)

    if (lower.includes('müdür')) {
      baslik = 'Müdürle Toplantı';
      ikon = '🤝';
    } else if (lower.includes('veli')) {
      baslik = 'Veli Toplantısı';
      ikon = '🏫';
    } else if (lower.includes('öğretmen') || lower.includes('ogretmen')) {
      baslik = 'Öğretmenler Toplantısı';
      ikon = '📚';
    } else if (lower.includes('kurul')) {
      baslik = 'Kurul Toplantısı';
      ikon = '📋';
    } else if (lower.includes('mülakat') || lower.includes('iş görüşme')) {
      baslik = 'İş Mülakatı';
      ikon = '💼';
    } else if (lower.includes('avukat')) {
      baslik = 'Avukat Görüşmesi';
      ikon = '⚖️';
    } else if (lower.includes('ekip') || lower.includes('takım')) {
      baslik = 'Ekip Toplantısı';
      ikon = '👥';
    } else {
      const cleanWords = cleanInput
        .replace(/\b(her|yarın|bugün|öbür gün|saat|pazartesi|salı|çarşamba|perşembe|cuma|cumartesi|pazar|yapacağız|yaparız|olacak|edeceğiz|var)\b/gi, '')
        .replace(/\b\d{1,2}(?:[:.]\d{2})?\b/g, '')
        .replace(/\bda\b|\bde\b|\bte\b|\bta\b/gi, '')
        .trim();
      if (cleanWords.length > 2) {
        baslik = cleanWords.charAt(0).toUpperCase() + cleanWords.slice(1);
      } else {
        baslik = 'Toplantı';
      }
    }

    return enrichWithPredictiveGraph({
      baslik: baslik.slice(0, 32),
      zaman: periodicZaman || zaman || 'Planlanan Toplantı',
      tarih_iso: periodicIso || tarih_iso,
      ikon,
      renk,
      tetikleyici,
      periyodik,
    }, cleanInput);
  }

  // 2. ÖNCELİK: SAĞLIK & REÇETE TAKİBİ
  if (lower.includes('doktor') || lower.includes('tok karnına') || lower.includes('ilaç') || lower.includes('reçete') || lower.includes('diş') || lower.includes('tahlil')) {
    const frequencyMatch = cleanInput.match(/günde\s*(\d+)\s*kez/i);
    const doseStr = frequencyMatch ? `(${frequencyMatch[1]}x1 Tok)` : '';
    
    return enrichWithPredictiveGraph({
      baslik: lower.includes('diş') ? 'Diş Randevusu' : (lower.includes('doktor') ? 'Doktor Randevusu' : (lower.includes('tahlil') ? 'Kan Tahlili / Açlık' : `İlaç Takibi ${doseStr}`.trim())),
      zaman: zaman || 'Günlük Doz',
      tarih_iso,
      ikon: lower.includes('diş') ? '🦷' : (lower.includes('doktor') ? '🩺' : (lower.includes('tahlil') ? '🩸' : '💊')),
      renk: '#F3E8FF'
    }, cleanInput);
  }

  // 3. ÖNCELİK: TEKNİK BAKIM / MUAYENE & SERVİS
  if (
    lower.includes('muayene') || lower.includes('pasaport') ||
    lower.includes('balata') || lower.includes('kombi') || lower.includes('lastik') ||
    lower.includes('basınç') || lower.includes('filtre') || lower.includes('tamir') ||
    lower.includes('servis') || (lower.includes('araba') && lower.includes('bakım')) || lower.includes('tüvtürk')
  ) {
    let baslik = 'Teknik Bakım';
    let ikon = '🔧';

    if (lower.includes('muayene') || lower.includes('tüvtürk')) { baslik = 'Araç Muayenesi'; ikon = '🚗'; }
    else if (lower.includes('pasaport')) { baslik = 'Pasaport Randevusu'; ikon = '🛂'; }
    else if (lower.includes('balata')) baslik = 'Fren Balata Değişimi';
    else if (lower.includes('lastik')) { baslik = 'Kışlık Lastik Değişimi'; ikon = '🛞'; }
    else if (lower.includes('kombi')) baslik = 'Kombi Basınç Kontrolü';
    else if (lower.includes('filtre')) { baslik = 'Filtre Değişimi'; ikon = '💧'; }

    return enrichWithPredictiveGraph({
      baslik,
      zaman: tetikleyici ? tetikleyici.etiket : (zaman || 'Servis Takibi'),
      tarih_iso: tetikleyici ? null : tarih_iso,
      ikon,
      renk: '#FEF3C7',
      tetikleyici
    }, cleanInput);
  }

  // 4. ÖNCELİK: KURUMSAL / BÜROKRASİ / 3. ŞAHIS DENETİM & RESMİ GÖREVLER
  if (
    lower.includes('müfettiş') || lower.includes('bakan') || lower.includes('denetim') ||
    lower.includes('nöbet') || lower.includes('evrak') ||
    lower.includes('protokol') || lower.includes('ziyaret')
  ) {
    let baslik = 'Kurumsal Takip';
    let ikon = '📄';

    if (lower.includes('müfettiş') || lower.includes('denetim')) {
      baslik = 'Müfettiş Evrak Denetimi';
      ikon = '📁';
    } else if (lower.includes('nöbet')) {
      baslik = 'Nöbetçi Görevi';
      ikon = '📋';
    } else if (lower.includes('bakan')) {
      baslik = 'Bakan Ziyareti';
      ikon = '🏛️';
    } else if (lower.includes('rapor') || lower.includes('evrak')) {
      baslik = 'Evrak / Rapor Teslimi';
      ikon = '📑';
    }

    return enrichWithPredictiveGraph({
      baslik,
      zaman: tetikleyici ? tetikleyici.etiket : (zaman || 'Resmi Takip'),
      tarih_iso: tetikleyici ? null : tarih_iso,
      ikon,
      renk: '#E0F2FE',
      tetikleyici
    }, cleanInput);
  }

  // 5. ÖNCELİK: FİNANSAL İŞLEMLER (Ödeme / Alacak / Borç / Fatura)
  // KESİN GÜVENLİK FİLTRESİ:
  // "saat 9 da", "cuma", "hafta" gibi zaman/tarih sözcükleri KESİNLİKLE tutar veya kişi ismi sayılamaz!
  const hasCurrencySuffix = /\b(\d+(?:[.,]\d+)?)\s*(?:bin\s*)?(?:tl|lira|₺|euro|€|dolar|\$|usd)\b/i.test(cleanInput);
  const isExplicitFinancialVerb = /\b(alacak|alacağım|borç|borcum|öde|ödeyeceğim|ödemesi|havale|eft|taksit|kira|fatura|aidat|maaş)\b/i.test(lower);

  // Gün ve zaman kelimeleri asla alıcı/kaynak kişi ismi olamaz
  const nonPersonBlacklist = new Set([
    'pazartesi', 'salı', 'sali', 'çarşamba', 'carsamba', 'perşembe', 'persembe', 'cuma', 'cumartesi', 'pazar',
    'bugün', 'yarın', 'öbür', 'gün', 'saat', 'dakika', 'hafta', 'ay', 'yıl', 'sene', 'araba', 'ev', 'oda', 'okul',
    'iş', 'toplantı', 'randevu', 'servis', 'kombi', 'muayene', 'doktor', 'müdür', 'veli', 'öğretmen', 'lastik'
  ]);

  const rawRecipientMatch = cleanInput.match(/\b([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ]?[a-zçğıöşü]+)?)(?:'?[yea])\b/);
  const rawSourceMatch = cleanInput.match(/\b([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ]?[a-zçğıöşü]+)?)(?:'?[dten]an|'?[dten]en)\b/);

  const recipientMatch = (rawRecipientMatch && !nonPersonBlacklist.has(rawRecipientMatch[1].toLowerCase())) ? rawRecipientMatch : null;
  const sourceMatch = (rawSourceMatch && !nonPersonBlacklist.has(rawSourceMatch[1].toLowerCase())) ? rawSourceMatch : null;

  // Tutarı sadece para birimi varsa veya açıkça borç/alacak/ödeme fiili varsa tanı
  let amountStr: string | null = null;
  if (hasCurrencySuffix) {
    const curMatch = cleanInput.match(/(\d+(?:[.,]\d+)?\s*(?:bin\s*)?(?:tl|lira|₺|euro|€|dolar|\$|usd)?)/i);
    amountStr = curMatch ? curMatch[0] : null;
  } else if (isExplicitFinancialVerb) {
    // Saat kelimesi ile bitişik olmayan sayıyı al
    const cleanNoTime = cleanInput.replace(/saat\s*\d{1,2}(?:[:.]\d{2})?/gi, '').replace(/\b\d{1,2}\s*(?:'da|'de|da|de)\b/gi, '');
    const numMatch = cleanNoTime.match(/(\d+(?:[.,]\d+)?\s*(?:bin)?)/);
    amountStr = numMatch ? `${numMatch[0]} TL` : null;
  }

  if (amountStr && (isExplicitFinancialVerb || (hasCurrencySuffix && (recipientMatch || sourceMatch)))) {
    let title = 'Finansal İşlem';
    let isPayable = lower.includes('borcum') || lower.includes('öde') || lower.includes('at') || lower.includes('gönder') || !!recipientMatch;

    if (recipientMatch) {
      title = `${recipientMatch[1]}: ${amountStr} Ödeme`;
      isPayable = true;
    } else if (sourceMatch) {
      title = `${sourceMatch[1]}: ${amountStr} Alacak`;
      isPayable = false;
    } else if (lower.includes('alacak') || lower.includes('alacağım')) {
      title = `${amountStr} Alacak Takibi`;
      isPayable = false;
    } else {
      title = `${amountStr} Ödeme Takibi`;
      isPayable = true;
    }

    return enrichWithPredictiveGraph({
      baslik: title.slice(0, 32),
      zaman: tetikleyici ? tetikleyici.etiket : (zaman || 'Vade Belirtilmedi'),
      tarih_iso: tetikleyici ? null : tarih_iso,
      ikon: isPayable ? '💳' : '💰',
      renk: isPayable ? '#FEE2E2' : '#DCFCE7',
      tetikleyici
    }, cleanInput);
  }

  // 6. ÖNCELİK: KISA SENARYO EŞLEŞTİRME (Leb Demeden Leblebiyi Anlama)
  const shortScenario = matchShortScenario(cleanInput);
  if (shortScenario) {
    return enrichWithPredictiveGraph({
      baslik: shortScenario.baslik,
      zaman: periodicZaman || zaman || shortScenario.varsayilanZaman,
      tarih_iso: periodicIso || tarih_iso,
      ikon: shortScenario.ikon,
      renk: shortScenario.renk,
      tetikleyici: tetikleyici || (shortScenario.tetikleyici ? {
        tip: shortScenario.tetikleyici.tip,
        sart: shortScenario.tetikleyici.sart,
        etiket: shortScenario.tetikleyici.etiket
      } : null),
      periyodik,
      anomali_notu: shortScenario.akilliFisilti,
      hazirlik_zamani: shortScenario.hazirlikZamani
    }, cleanInput);
  }

  // 7. ÖNCELİK: DİĞER RANDEVU VE ETKİNLİKLER
  if (
    lower.includes('randevu') || lower.includes('kuaför') || lower.includes('berber') ||
    lower.includes('uçak') || lower.includes('uçuş') || lower.includes('seyahat')
  ) {
    let baslik = 'Randevu';
    let ikon = '🗓️';
    if (lower.includes('uçuş') || lower.includes('uçak') || lower.includes('seyahat')) {
      baslik = 'Uçak Seyahati';
      ikon = '✈️';
    } else if (lower.includes('kuaför') || lower.includes('berber')) {
      baslik = 'Kuaför Randevusu';
      ikon = '✂️';
    }

    return enrichWithPredictiveGraph({
      baslik,
      zaman: periodicZaman || zaman || 'Planlanan Zaman',
      tarih_iso: periodicIso || tarih_iso,
      ikon,
      renk: '#FEF3C7',
      tetikleyici,
      periyodik,
    }, cleanInput);
  }

  // 8. ÖNCELİK: EMANET / İADE
  if (lower.includes('emanet') || lower.includes('geri ver') || lower.includes('iade') || lower.includes('aldım')) {
    return enrichWithPredictiveGraph({
      baslik: (cleanInput.slice(0, 24) + ' (İade)').slice(0, 30),
      zaman: zaman || 'Takip',
      tarih_iso,
      ikon: '🪜',
      renk: getCardColor(cleanInput, '#E0F2FE')
    }, cleanInput);
  }

  // G. GENEL DÜŞÜŞ (Fallback)
  const baseResult: NotiviaSimpleNote = {
    baslik: cleanInput.slice(0, 28) || 'Not',
    zaman: periodicZaman || zaman || 'Not',
    tarih_iso: periodicIso || tarih_iso,
    ikon: periyodik ? '🔄' : '📌',
    renk: periyodik ? '#FEF3C7' : getCardColor(cleanInput),
    periyodik,
  };

  return enrichWithPredictiveGraph(baseResult, cleanInput);
}

/**
 * Üretilen NotiviaSimpleNote nesnesini Predictive Action Graph ile zenginleştirir:
 * Ön hazırlık adımları, tersine bildirim zamanı ve rehberlik fısıltısı ekler.
 */
function enrichWithPredictiveGraph(note: NotiviaSimpleNote, input: string): NotiviaSimpleNote {
  const predictive = inferPredictiveActions(input);
  if (!predictive) return note;

  const result = { ...note };

  // 1. Ön hazırlık fısıltısı ve anomali / rehberlik notu
  if (!result.anomali_notu && predictive.akilliFisilti) {
    result.anomali_notu = predictive.akilliFisilti;
  }

  // 2. Tersine Zamanlanmış Ön Bildirim (Hazırlık Zamanı)
  if (!result.hazirlik_zamani && predictive.hazirlikZamani) {
    result.hazirlik_zamani = predictive.hazirlikZamani;
  }

  // Eğer tarih_iso varsa ve hazırlık saat öncesi biliniyorsa hazirlik_iso hesapla
  if (result.tarih_iso && predictive.hazirlikSaatOncesi && !result.hazirlik_iso) {
    try {
      const eventTime = new Date(result.tarih_iso).getTime();
      const prepTime = new Date(eventTime - predictive.hazirlikSaatOncesi * 60 * 60 * 1000);
      result.hazirlik_iso = prepTime.toISOString();
    } catch {
      // sessizce geç
    }
  }

  // 3. Alt kontrol adımları (Checklist items)
  if ((!result.action_items || result.action_items.length === 0) && predictive.oncedenYapilacaklar.length > 0) {
    result.action_items = predictive.oncedenYapilacaklar.map((task) => ({
      task,
      is_completed: false,
    }));
  }

  return result;
}
