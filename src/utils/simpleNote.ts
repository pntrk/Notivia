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
    anomali_notu: note.anomali_notu || null,
    tetikleyici: (note as any).tetikleyici || null,
    ikon: singleEmoji,
    renk: note.ui_meta.color_hex || '#FEF3C7',
  };
}

// 1. Türkçe Zaman ve Göreceli Periyot Ayrıştırıcı
function parseTurkishTemporal(text: string, baseDate: Date): { zaman: string | null; tarih_iso: string | null } {
  const lower = text.toLowerCase();
  const target = new Date(baseDate.getTime());
  let hasDate = false;

  const days: Record<string, number> = { pazar: 0, pazartesi: 1, salı: 2, çarşamba: 3, perşembe: 4, cuma: 5, cumartesi: 6 };
  for (const [day, idx] of Object.entries(days)) {
    if (lower.includes(day)) {
      const current = target.getDay();
      let diff = idx - current;
      if (diff <= 0) diff += 7;
      target.setDate(target.getDate() + diff);
      hasDate = true;
      break;
    }
  }

  if (lower.includes('yarın')) {
    target.setDate(target.getDate() + 1);
    hasDate = true;
  } else if (lower.includes('öbür gün')) {
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

  let hour = 9, minute = 0;
  const timeRegex = /(?:saat\s*)?(\d{1,2})[:.](\d{2})|saat\s*(\d{1,2})/;
  const timeMatch = lower.match(timeRegex);

  if (timeMatch) {
    hour = parseInt(timeMatch[1] || timeMatch[3], 10);
    minute = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    hasDate = true;
  } else if (lower.includes('öğle') || lower.includes('öğlen')) {
    hour = 13;
  } else if (lower.includes('akşam')) {
    hour = 19;
  } else if (lower.includes('gece')) {
    hour = 21;
    minute = 30;
  }

  target.setHours(hour, minute, 0, 0);

  if (!hasDate) return { zaman: null, tarih_iso: null };

  const pad = (n: number) => String(n).padStart(2, '0');
  const iso = `${target.getFullYear()}-${pad(target.getMonth() + 1)}-${pad(target.getDate())}T${pad(hour)}:${pad(minute)}:00`;
  const gunIsimleri = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  
  return { zaman: `${gunIsimleri[target.getDay()]} ${pad(hour)}:${pad(minute)}`, tarih_iso: iso };
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

  const { zaman, tarih_iso } = parseTurkishTemporal(cleanInput, baseDate);

  // A. KOŞUL VE TETİKLEYİCİ TESPİTİ (Zaman içermeyen şartlar)
  let tetikleyici: { tip: 'finansal' | 'mekan' | 'kisi' | 'durum' | 'zincirleme' | null; sart: string; etiket: string } | null = null;
  if (lower.includes('maaş yatınca')) {
    tetikleyici = { tip: 'finansal', sart: 'Maaş yatması', etiket: '⚡ Maaş Gününde' };
  } else if (lower.includes('sanayiye yolum') || lower.includes('sanayiye gidince') || lower.includes('sanayide')) {
    tetikleyici = { tip: 'mekan', sart: 'Sanayi ziyareti', etiket: '📍 Sanayi Uğraması' };
  } else if (lower.includes('veli toplantıs') || lower.includes('toplantıda')) {
    tetikleyici = { tip: 'mekan', sart: 'Toplantı', etiket: '📍 Toplantıda' };
  }

  // B. FİNANSAL İŞLEMLER (-e / -den Ek Analizi ve Meblağ Tespiti)
  const amountMatch = cleanInput.match(/(\d+(?:[.,]\d+)?)\s*(?:bin)?\s*(?:tl|lira|euro|dolar)?/i);
  const amountStr = amountMatch ? amountMatch[0] : null;

  // İsmin halleri ve muhatap yakalama (Örn: "Ali hocaya", "Ahmet abiden", "Mehmet'e")
  const recipientMatch = cleanInput.match(/([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[a-zçğıöşü]+)?)(?:'?[yea])\b/i); // -e/-a (Yönelme -> Ödeme)
  const sourceMatch = cleanInput.match(/([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[a-zçğıöşü]+)?)(?:'?[dten]an|'?[dten]en)\b/i); // -den/-dan (Ayrılma -> Alacak)

  const isFinancialVerb = lower.includes('alacak') || lower.includes('alacağım') || 
                           lower.includes('borç') || lower.includes('borcum') || 
                           lower.includes('öde') || lower.includes('at') || 
                           lower.includes('gönder') || lower.includes('yatır');

  if (amountStr && (isFinancialVerb || recipientMatch || sourceMatch)) {
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

    return {
      baslik: title.slice(0, 32),
      zaman: tetikleyici ? tetikleyici.etiket : (zaman || 'Vade Belirtilmedi'),
      tarih_iso: tetikleyici ? null : tarih_iso,
      ikon: isPayable ? '💳' : '💰',
      renk: isPayable ? '#FEE2E2' : '#DCFCE7',
      tetikleyici
    };
  }

  // C. KURUMSAL / BÜROKRASİ / 3. ŞAHIS DENETİM & RESMİ GÖREVLER
  if (
    lower.includes('müfettiş') || lower.includes('bakan') || lower.includes('denetim') ||
    lower.includes('nöbet') || lower.includes('müdür') || lower.includes('evrak') ||
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

    return {
      baslik,
      zaman: tetikleyici ? tetikleyici.etiket : (zaman || 'Resmi Takip'),
      tarih_iso: tetikleyici ? null : tarih_iso,
      ikon,
      renk: '#E0F2FE',
      tetikleyici
    };
  }

  // D. TEKNİK BAKIM / MUAYENE & RESMİ İŞLEMLER
  if (
    lower.includes('muayene') || lower.includes('pasaport') ||
    lower.includes('balata') || lower.includes('kombi') || lower.includes('lastik') ||
    lower.includes('basınç') || lower.includes('filtre') || lower.includes('tamir') ||
    lower.includes('servis') || lower.includes('araba') || lower.includes('bakım')
  ) {
    let baslik = 'Teknik Bakım';
    let ikon = '🔧';

    if (lower.includes('muayene')) { baslik = 'Araç Muayenesi'; ikon = '🚗'; }
    else if (lower.includes('pasaport')) { baslik = 'Pasaport Randevusu'; ikon = '🛂'; }
    else if (lower.includes('balata')) baslik = 'Fren Balata Değişimi';
    else if (lower.includes('lastik')) { baslik = 'Kışlık Lastik Değişimi'; ikon = '🛞'; }
    else if (lower.includes('kombi')) baslik = 'Kombi Basınç Kontrolü';

    let action_items: { task: string; is_completed: boolean }[] = [];
    if (lower.includes('muayene')) {
      action_items = [
        { task: 'Ruhsat ve trafik sigortasını kontrol et', is_completed: false },
        { task: 'İlk yardım çantası ve yangın tüpünü teyit et', is_completed: false },
        { task: 'MTV ve trafik cezası borcu sorgula', is_completed: false }
      ];
    } else if (lower.includes('pasaport')) {
      action_items = [
        { task: 'Harç ve defter bedeli dekontunu al', is_completed: false },
        { task: '2 adet biyometrik fotoğraf hazırla', is_completed: false },
        { task: 'Eski pasaport ve kimlik asıllarını çantaya koy', is_completed: false }
      ];
    }

    return {
      baslik,
      zaman: tetikleyici ? tetikleyici.etiket : (zaman || 'Servis Takibi'),
      tarih_iso: tetikleyici ? null : tarih_iso,
      ikon,
      renk: '#FEF3C7',
      tetikleyici,
      action_items // <- Dönen objeye iliştirildi
    };
  }

  // E. SAĞLIK & REÇETE TAKİBİ
  if (lower.includes('doktor') || lower.includes('tok karnına') || lower.includes('ilaç') || lower.includes('reçete') || lower.includes('diş')) {
    const frequencyMatch = cleanInput.match(/günde\s*(\d+)\s*kez/i);
    const doseStr = frequencyMatch ? `(${frequencyMatch[1]}x1 Tok)` : '';
    
    return {
      baslik: lower.includes('diş') ? 'Diş Randevusu' : (lower.includes('doktor') ? 'Doktor Randevusu' : `İlaç Takibi ${doseStr}`.trim()),
      zaman: zaman || 'Günlük Doz',
      tarih_iso,
      ikon: lower.includes('diş') ? '🦷' : (lower.includes('doktor') ? '🩺' : '💊'),
      renk: '#F3E8FF'
    };
  }

  // E2. RANDEVU, TOPLANTI VE TAKVİM HATIRLATICILARI
  if (
    lower.includes('randevu') || lower.includes('toplantı') || lower.includes('görüşme') ||
    lower.includes('buluşma') || lower.includes('seans') || lower.includes('muayene') ||
    lower.includes('mülakat') || lower.includes('hatırlat')
  ) {
    let baslik = 'Randevu';
    let ikon = '🗓️';
    if (lower.includes('veli toplantı')) baslik = 'Veli Toplantısı';
    else if (lower.includes('iş görüşme') || lower.includes('mülakat')) baslik = 'İş Mülakatı';
    else if (lower.includes('kuaför') || lower.includes('berber')) { baslik = 'Kuaför Randevusu'; ikon = '✂️'; }
    else if (lower.includes('muayene') || lower.includes('hastane')) { baslik = 'Hastane Muayenesi'; ikon = '🏥'; }
    else {
      // Kelime temizleme: "randevu yarın" -> "Randevu"
      const cleanWords = cleanInput
        .replace(/\b(yarın|bugün|öbür gün|saat|pazartesi|salı|çarşamba|perşembe|cuma|cumartesi|pazar)\b/gi, '')
        .replace(/\b(\d{1,2}[:.]\d{2}|\d{1,2})\b/g, '')
        .trim();
      if (cleanWords.length > 2) {
        baslik = cleanWords.charAt(0).toUpperCase() + cleanWords.slice(1);
      } else {
        baslik = 'Randevu';
      }
    }

    return {
      baslik: baslik.slice(0, 30),
      zaman: zaman || 'Planlanan Zaman',
      tarih_iso,
      ikon,
      renk: '#FEF3C7',
      tetikleyici
    };
  }

  // F. EMANET / İADE İŞLEMLERİ
  if (lower.includes('emanet') || lower.includes('geri ver') || lower.includes('iade') || lower.includes('aldım')) {
    return {
      baslik: (cleanInput.slice(0, 24) + ' (İade)').slice(0, 30),
      zaman: zaman || 'Takip',
      tarih_iso,
      ikon: '🪜',
      renk: '#F5F5F4'
    };
  }

  // G. GENEL DÜŞÜŞ (Fallback)
  return {
    baslik: cleanInput.slice(0, 28) || 'Not',
    zaman: zaman || 'Not',
    tarih_iso,
    ikon: '📌',
    renk: '#F5F5F4'
  };
}
