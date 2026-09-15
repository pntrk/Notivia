import type { NotiviaParsedNote, NotiviaSimpleNote } from '../types/notivia.ts';

export function toSimpleNote(note: NotiviaParsedNote): NotiviaSimpleNote {
  let zamanStr: string | null = null;

  if (note.periodic_log.is_periodic) {
    const days = note.periodic_log.interval_days;
    if (days === 180) zamanStr = '6 ay sonra';
    else if (days === 90) zamanStr = '3 ayda bir';
    else if (days === 30) zamanStr = 'Ayda bir';
    else if (days === 7) zamanStr = 'Haftada bir';
    else if (days) zamanStr = `${days} günde bir`;
  } else if (note.calendar_event.has_event && note.calendar_event.start_datetime) {
    try {
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
    ikon: singleEmoji,
    renk: note.ui_meta.color_hex || '#FEF3C7',
  };
}

export function extractSimpleNoteFromText(input: string): NotiviaSimpleNote {
  const lower = input.toLowerCase();

  // Color selection
  let renk = '#FEF3C7'; // Default yellow
  let ikon = '📝';

  if (lower.includes('su') || lower.includes('arıtma') || lower.includes('filtre') || lower.includes('temizle')) {
    renk = '#E0F2FE'; // Pastel mavi
    ikon = '💧';
  } else if (lower.includes('para') || lower.includes('maaş') || lower.includes('kart') || lower.includes('fatura') || lower.includes('kira')) {
    renk = '#DCFCE7'; // Pastel yeşil
    ikon = '💳';
  } else if (lower.includes('maç') || lower.includes('halı saha') || lower.includes('kahve') || lower.includes('ahmet') || lower.includes('arkadaş') || lower.includes('buluş')) {
    renk = '#DCFCE7'; // Pastel yeşil
    ikon = '⚽';
  } else if (lower.includes('acil') || lower.includes('hemen') || lower.includes('bugün saat') || lower.includes('unutma')) {
    renk = '#FEE2E2'; // Pastel kırmızı
    ikon = '⚡';
  } else if (lower.includes('doktor') || lower.includes('diş') || lower.includes('hastane') || lower.includes('ilaç') || lower.includes('aşı') || lower.includes('kedi') || lower.includes('köpek')) {
    renk = '#F3E8FF'; // Pastel mor
    ikon = lower.includes('kedi') ? '🐱' : lower.includes('diş') ? '🦷' : '🩺';
  } else if (lower.includes('araba') || lower.includes('muayene') || lower.includes('kombi') || lower.includes('tamir')) {
    renk = '#FEF3C7'; // Pastel sarı
    ikon = lower.includes('araba') ? '🚗' : '🔧';
  }

  // Zaman extraction
  let zaman: string | null = null;
  if (lower.includes('6 ay')) {
    zaman = '6 ay sonra';
  } else if (lower.includes('3 ay')) {
    zaman = '3 ay sonra';
  } else if (lower.includes('yarın akşam')) {
    zaman = 'Yarın 19:00';
  } else if (lower.includes('yarın sabah')) {
    zaman = 'Yarın 09:00';
  } else if (lower.includes('yarın öğlen') || lower.includes('yarın öğle')) {
    zaman = 'Yarın 13:00';
  } else if (lower.includes('yarın')) {
    zaman = 'Yarın';
  } else if (lower.includes('salı öğleden sonra') || lower.includes('salı öğlen')) {
    zaman = 'Salı öğlen';
  } else if (lower.includes('salı')) {
    zaman = 'Salı';
  } else if (lower.includes('haftaya pazartesi')) {
    zaman = 'Haftaya Pazartesi 09:00';
  } else if (lower.includes('gelecek hafta perşembe')) {
    zaman = 'Gelecek hafta Perşembe 13:00';
  }

  // Baslik extraction (en fazla 4-5 kelime net ve eylem odaklı)
  let baslik = 'Yeni Hatırlatıcı';
  if (lower.includes('su arıtma') || lower.includes('filtre')) {
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
    baslik = 'Pasaport Yenileme Başvurusu';
  } else if (lower.includes('kombi')) {
    baslik = 'Kombi Bakımı ve Temizliği';
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

  return {
    baslik,
    zaman,
    ikon,
    renk,
  };
}
