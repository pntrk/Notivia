// src/services/engine/cognitivePrompt.ts

export type NotiviaIntentType = 'calendar' | 'task' | 'cycle' | 'shopping' | 'timer' | 'memo';
export type NotiviaOperationalCategory = 'İdari & İş' | 'Ev & Yaşam' | 'Bakım & Teknik' | 'Finans' | 'Sağlık' | 'Sosyal';

export interface NotiviaCognitiveResult {
  intent_type: NotiviaIntentType;
  confidence: number;
  baslik: string;
  kategori: NotiviaOperationalCategory;
  zaman_etiketi: string;
  tarih_iso: string | null;
  hazirlik_iso: string | null;
  interval_days: number | null;
  action_items: { task: string; is_completed: boolean }[];
  anomali_uyarisi: string | null;
  ikon: string;
  renk: string;
  sesli_onay: string;
}

export const NOTIVIA_COGNITIVE_SYSTEM_PROMPT = `ROL VE PRENSİP:
Sen Notivia Bilişsel Motorusun. Sıradan bir ajanda değil; kullanıcının dağınık, eksik ve örtük günlük konuşmalarından operasyonel görevler çıkaran bir karar motorusun.

ANALİZ PROTOKOLÜ:
1. Negatif Kalkanlar:
   - "onay", "yazı", "DYS", "evrak", "rapor", "kurul", "servis", "balata" gibi terimleri ASLA "Alışveriş" veya basit "Yapılacaklar" kategorisine sokma.
2. Tersine Zamanlama (Buffer Timing):
   - Belirli bir saatte icra edilecek randevular için 'hazirlik_iso' üret (Adliye/Okul için T-30 dk, Sunum/Toplantı için T-45 dk).
3. Döngüsel Süreçler:
   - Rutin filtre değişimi, kombi bakımı, araç bakımı, fermantasyon gibi durumları 'cycle' olarak işaretle; aralık gün sayısını ('interval_days') hesapla.
4. Çıktı Biçimi: SADECE aşağıdaki JSON şemasını üret (açıklama ve markdown olmadan):

{
  "intent_type": "calendar" | "task" | "cycle" | "shopping" | "timer" | "memo",
  "confidence": 0.95,
  "baslik": "Kısa eylem başlığı (Maksimum 5 kelime)",
  "kategori": "İdari & İş | Ev & Yaşam | Bakım & Teknik | Finans | Sağlık | Sosyal",
  "zaman_etiketi": "Kullanıcıya gösterilecek temiz zaman (Örn: Pazartesi 08:30)",
  "tarih_iso": "YYYY-MM-DDTHH:mm:ss veya null",
  "hazirlik_iso": "YYYY-MM-DDTHH:mm:ss veya null",
  "interval_days": 180,
  "action_items": [
    { "task": "Teknik/idari adım", "is_completed": false }
  ],
  "anomali_uyarisi": "Varsa yasal süre aşımı, çakışma veya risk notu (yoksa null)",
  "ikon": "Emoji",
  "renk": "Pastel HEX (#E0E7FF, #FEF3C7, #DCFCE7, #FEE2E2)",
  "sesli_onay": "Kullanıcıya fısıldanacak maks 10 kelimelik operasyonel geri bildirim"
}`;

/**
 * Belirli bir randevu/etkinlik için tersine tampon zamanı (Buffer Timing) hesaplar
 * Adliye/Okul: T - 30 dakika
 * Sunum/Toplantı: T - 45 dakika
 */
export function calculateBufferTiming(targetDate: Date, contextText: string): string | null {
  if (isNaN(targetDate.getTime())) return null;

  const text = contextText.toLowerCase();
  let bufferMinutes = 30; // varsayılan

  if (text.includes('adliye') || text.includes('duruşma') || text.includes('durusma') || text.includes('okul') || text.includes('nöbet') || text.includes('nobet')) {
    bufferMinutes = 30;
  } else if (text.includes('sunum') || text.includes('toplantı') || text.includes('toplanti') || text.includes('jüri') || text.includes('juri') || text.includes('mülakat') || text.includes('mulakat')) {
    bufferMinutes = 45;
  } else if (text.includes('uçak') || text.includes('ucus') || text.includes('uçuş') || text.includes('havalimanı') || text.includes('havaalanı')) {
    bufferMinutes = 180; // Uçuş için 3 saat önce evden çıkış / hazırlık
  } else if (text.includes('yht') || text.includes('hızlı tren') || text.includes('otobüs') || text.includes('otogar') || text.includes('gar')) {
    bufferMinutes = 60; // Tren / Otobüs için 1 saat önce gar hazırlığı
  } else if (text.includes('ilaçlama') || text.includes('budama')) {
    bufferMinutes = 60; // İlaçlama öncesi hazırlık
  } else if (text.includes('pre-workout') || text.includes('antrenman')) {
    bufferMinutes = 30;
  }

  const prepDate = new Date(targetDate.getTime() - bufferMinutes * 60 * 1000);
  return prepDate.toISOString();
}

/**
 * Rutin döngüsel süreçlerin (cycle) gün aralığını hesaplar
 */
export function resolveCycleInterval(rawText: string): number | null {
  const text = rawText.toLowerCase();

  if (text.includes('filtre') || text.includes('su arıtma') || text.includes('aritma')) {
    return 180; // 6 ay
  }
  if (text.includes('parazit') || text.includes('kedi aşı') || text.includes('köpek aşı') || text.includes('veteriner aşı')) {
    return 90; // 3 ayda bir parazit döngüsü
  }
  if (text.includes('mtv') || text.includes('motorlu taşıtlar vergisi')) {
    return 180; // 6 ayda bir MTV taksiti (Ocak & Temmuz)
  }
  if (text.includes('deneme') || text.includes('trial') || text.includes('ücretsiz deneme')) {
    return 30; // 30 günlük ücretsiz deneme
  }
  if (text.includes('kombi') || text.includes('klima bakım') || text.includes('periyodik bakım') || text.includes('muayene') || text.includes('yangın tüp') || text.includes('sigorta yenileme') || text.includes('kasko yenileme')) {
    return 365; // 1 yıl
  }
  if (text.includes('balata') || text.includes('yağ değişimi') || text.includes('yag degisimi') || text.includes('lastik')) {
    return 180; // 6 ay
  }
  if (text.includes('recovery') || text.includes('bacak') || text.includes('ağır antrenman') || text.includes('leg day')) {
    return 2; // 48 saat kas toparlanma
  }
  if (text.includes('fermantasyon') || text.includes('sirke') || text.includes('turşu') || text.includes('kombucha')) {
    if (text.includes('sirke')) return 45;
    if (text.includes('turşu') || text.includes('tursu')) return 21;
    if (text.includes('kombucha')) return 14;
    return 30;
  }
  if (text.includes('diş kontrol') || text.includes('dis kontrol') || text.includes('checkup') || text.includes('check-up')) {
    return 180;
  }

  return null;
}

