import type { NotiviaParsedNote, NotiviaSimpleNote } from '../types/notivia.ts';
export { extractDateTimeFromTurkish } from './date.ts';

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
    ikon: singleEmoji,
    renk: note.ui_meta.color_hex || '#FEF3C7',
  };
}

export function extractSimpleNoteFromText(input: string, refDatetime?: string): NotiviaSimpleNote {
  const lower = input.toLowerCase();
  const baseDate = refDatetime ? new Date(refDatetime) : new Date();

  // Color selection
  let renk = '#FEF3C7'; // Default yellow
  let ikon = '📝';

  if (lower.includes('bakan') || lower.includes('ziyaret') || lower.includes('valilik') || lower.includes('belediye')) {
    renk = '#E0F2FE'; // Pastel mavi
    ikon = '🏛️';
  } else if (lower.includes('su') || lower.includes('sular') || lower.includes('arıtma') || lower.includes('filtre') || lower.includes('temizle')) {
    renk = '#E0F2FE'; // Pastel mavi
    ikon = '💧';
  } else if (lower.includes('para') || lower.includes('maaş') || lower.includes('kart') || lower.includes('fatura') || lower.includes('kira')) {
    renk = '#DCFCE7'; // Pastel yeşil
    ikon = '💳';
  } else if (lower.includes('maç') || lower.includes('halı saha') || lower.includes('kahve') || lower.includes('ahmet') || lower.includes('arkadaş') || lower.includes('buluş')) {
    renk = '#DCFCE7'; // Pastel yeşil
    ikon = '☕';
  } else if (lower.includes('acil') || lower.includes('elektrik') || lower.includes('kesinti') || lower.includes('hemen') || lower.includes('bugün saat') || lower.includes('unutma')) {
    renk = '#FEE2E2'; // Pastel kırmızı
    ikon = '⚡';
  } else if (lower.includes('doktor') || lower.includes('diş') || lower.includes('hastane') || lower.includes('ilaç') || lower.includes('aşı') || lower.includes('kedi') || lower.includes('köpek')) {
    renk = '#F3E8FF'; // Pastel mor
    ikon = lower.includes('kedi') ? '🐱' : lower.includes('diş') ? '🦷' : '🩺';
  } else if (lower.includes('araba') || lower.includes('muayene') || lower.includes('kombi') || lower.includes('tamir')) {
    renk = '#FEF3C7'; // Pastel sarı
    ikon = lower.includes('araba') ? '🚗' : '🔧';
  }

  // Zaman & tarih_iso extraction
  let zaman: string | null = null;
  let tarih_iso: string | null = null;

  const targetDate = new Date(baseDate);

  // Time slot detection
  // Kurallar: "sabah" -> 09:00, "öğlen" -> 13:00, "akşam" -> 19:00, "gece" -> 21:30. Saat verilmediyse 09:00 ata.
  let slotHours = 9;
  let slotMinutes = 0;
  let hasSlot = false;

  if (lower.includes('gece')) {
    slotHours = 21;
    slotMinutes = 30;
    hasSlot = true;
  } else if (lower.includes('akşam')) {
    slotHours = 19;
    slotMinutes = 0;
    hasSlot = true;
  } else if (lower.includes('öğlen') || lower.includes('öğle')) {
    slotHours = 13;
    slotMinutes = 0;
    hasSlot = true;
  } else if (lower.includes('sabah')) {
    slotHours = 9;
    slotMinutes = 0;
    hasSlot = true;
  }

  // Check explicit HH:mm
  const timeRegex = /(\b[0-2]?[0-9]):([0-5][0-9])\b/;
  const timeMatch = input.match(timeRegex);
  if (timeMatch) {
    slotHours = parseInt(timeMatch[1], 10);
    slotMinutes = parseInt(timeMatch[2], 10);
    hasSlot = true;
  }

  // Days mapping
  const daysMap: Record<string, { dayIndex: number; name: string }> = {
    'pazartesi': { dayIndex: 1, name: 'Pazartesi' },
    'salı': { dayIndex: 2, name: 'Salı' },
    'çarşamba': { dayIndex: 3, name: 'Çarşamba' },
    'perşembe': { dayIndex: 4, name: 'Perşembe' },
    'cuma': { dayIndex: 5, name: 'Cuma' },
    'cumartesi': { dayIndex: 6, name: 'Cumartesi' },
    'pazar': { dayIndex: 0, name: 'Pazar' },
  };

  let matchedDayKey: string | null = null;
  for (const dayKey of Object.keys(daysMap)) {
    if (lower.includes(dayKey)) {
      matchedDayKey = dayKey;
      break;
    }
  }

  if (lower.includes('6 ay')) {
    zaman = '6 ay sonra';
    targetDate.setMonth(targetDate.getMonth() + 6);
    targetDate.setHours(10, 0, 0, 0);
    tarih_iso = targetDate.toISOString().slice(0, 19);
  } else if (lower.includes('3 ay')) {
    zaman = '3 ay sonra';
    targetDate.setMonth(targetDate.getMonth() + 3);
    targetDate.setHours(10, 0, 0, 0);
    tarih_iso = targetDate.toISOString().slice(0, 19);
  } else if (lower.includes('yarın')) {
    targetDate.setDate(targetDate.getDate() + 1);
    targetDate.setHours(slotHours, slotMinutes, 0, 0);
    const timeStr = `${slotHours.toString().padStart(2, '0')}:${slotMinutes.toString().padStart(2, '0')}`;
    zaman = `Yarın ${timeStr}`;
    tarih_iso = targetDate.toISOString().slice(0, 19);
  } else if (matchedDayKey) {
    const { dayIndex, name } = daysMap[matchedDayKey];
    const currentDay = targetDate.getDay();
    const diff = (dayIndex - currentDay + 7) % 7 || 7;
    targetDate.setDate(targetDate.getDate() + diff);
    targetDate.setHours(slotHours, slotMinutes, 0, 0);

    const timeStr = `${slotHours.toString().padStart(2, '0')}:${slotMinutes.toString().padStart(2, '0')}`;
    zaman = `${name} ${timeStr}`;
    tarih_iso = targetDate.toISOString().slice(0, 19);
  }

  // Baslik extraction (en fazla 4 kelime net ve eylem/takip odaklı)
  let baslik = 'Yeni Hatırlatıcı';
  if (lower.includes('bakan')) {
    baslik = 'Bakan Ziyareti Takibi';
  } else if (lower.includes('sular') || lower.includes('su kesil')) {
    baslik = 'Su Kesintisi';
  } else if (lower.includes('elektrik')) {
    baslik = 'Elektrik Kesintisi';
  } else if (lower.includes('ahmet')) {
    baslik = 'Ahmet Ziyareti';
  } else if (lower.includes('su arıtma') || lower.includes('filtre')) {
    baslik = 'Su Arıtma Filtresi Değişimi';
  } else if (lower.includes('araba') && lower.includes('muayene')) {
    baslik = 'Araç Muayenesi';
  } else if (lower.includes('kedi') && lower.includes('parazit')) {
    baslik = 'Kedi Parazit Damlası';
  } else if (lower.includes('halı saha')) {
    baslik = 'Halı Saha Maçı';
  } else if (lower.includes('diş')) {
    baslik = 'Diş Hekimi Randevusu';
  } else if (lower.includes('pasaport')) {
    baslik = 'Pasaport Yenileme';
  } else if (lower.includes('kombi')) {
    baslik = 'Kombi Bakımı';
  } else if (lower.includes('kredi kartı')) {
    baslik = 'Kredi Kartı Borcu Ödemesi';
  } else {
    // Generate clean concise title from input
    const cleanWords = input
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .split(/\s+/)
      .filter((w) => !['bir', 've', 'için', 'ile', 'bana', 'yeni', 'kafam', 'rahat', 'ama', 'günü', 'geçmesin', 'yine'].includes(w.toLowerCase()))
      .slice(0, 4);
    if (cleanWords.length > 0) {
      baslik = cleanWords.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }

  // Tersine Zamanlama (Inverted Scheduling):
  // - Etkinlik Cuma sabahı ise hazırlık hatırlatıcısını Perşembe 16:00'ya; sabah erken uçuş varsa hazırlık uyarısını önceki akşam 20:00'ye kur.
  let hazirlik_zamani: string | null = null;
  let hazirlik_iso: string | null = null;

  if (tarih_iso) {
    const eventDate = new Date(tarih_iso);
    if (!isNaN(eventDate.getTime())) {
      const prepDate = new Date(eventDate);
      const isMorning = eventDate.getHours() < 12;

      if (isMorning) {
        prepDate.setDate(prepDate.getDate() - 1);
        if (lower.includes('uçak') || lower.includes('uçuş')) {
          prepDate.setHours(20, 0, 0, 0);
        } else {
          prepDate.setHours(16, 0, 0, 0);
        }
      } else if (eventDate.getHours() >= 18) {
        prepDate.setHours(13, 0, 0, 0);
      } else {
        prepDate.setDate(prepDate.getDate() - 1);
        prepDate.setHours(16, 0, 0, 0);
      }

      const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
      const prepDayName = daysOfWeek[prepDate.getDay()];
      const pad = (n: number) => n.toString().padStart(2, '0');
      hazirlik_zamani = `${prepDayName} ${pad(prepDate.getHours())}:${pad(prepDate.getMinutes())} hazırlık uyarısı`;
      hazirlik_iso = `${prepDate.getFullYear()}-${pad(prepDate.getMonth() + 1)}-${pad(prepDate.getDate())}T${pad(prepDate.getHours())}:${pad(prepDate.getMinutes())}:00`;
    }
  }

  return {
    baslik,
    zaman,
    tarih_iso,
    hazirlik_zamani,
    hazirlik_iso,
    ikon,
    renk,
  };
}
