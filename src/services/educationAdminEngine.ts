// src/services/educationAdminEngine.ts

import { matchShortScenario } from '../utils/scenarioDatabase.ts';
import { parseTemporalAndCleanLabel } from '../utils/date.ts';

export interface SchoolAdminTask {
  id: string;
  baslik: string;
  kategori:
    | 'Özel Eğitim'
    | 'Mevzuat & DYS'
    | 'Öğrenci İşleri'
    | 'Özlük & Puantaj'
    | 'Kurul & Zümre'
    | 'Öğretmenlik'
    | 'Akademi & Araştırma'
    | 'İSG & Güvenlik'
    | 'Taşımalı & Sosyal';
  mevzuat_notu: string;
  action_items: { task: string; is_completed: boolean }[];
  zaman_etiketi: string;
  tarih_iso: string | null;
  hazirlik_zamani?: string;
  ikon: string;
  renk: string;
  sesli_geribildirim: string;
}

export function formatLocalISO(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

export interface ExtractedDateTime {
  targetDate: Date;
  dayLabel: string;
  hour: number;
  minute: number;
  tarih_iso: string;
  timeLabel: string;
  cleanedTitle: string;
}

export function parseEduDateTime(rawText: string, now: Date = new Date(), defaultHour = 8, defaultMinute = 20): ExtractedDateTime {
  const parsed = parseTemporalAndCleanLabel(rawText, now);

  const hour = parsed.hour !== null ? parsed.hour : defaultHour;
  const minute = parsed.hour !== null ? parsed.minute : defaultMinute;
  const dayLabel = parsed.dayLabel;

  const targetDate = new Date(now);
  if (parsed.tarih_iso) {
    const d = new Date(parsed.tarih_iso);
    targetDate.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
  } else if (dayLabel === 'Yarın') {
    targetDate.setDate(targetDate.getDate() + 1);
  }
  targetDate.setHours(hour, minute, 0, 0);

  const pad = (n: number) => String(n).padStart(2, '0');
  const tarih_iso = formatLocalISO(targetDate);
  const timeLabel = `${dayLabel} ${pad(hour)}:${pad(minute)}`;

  let cleanedTitle = parsed.cleanLabel;
  if (!cleanedTitle || cleanedTitle === 'Yeni Hatırlatıcı' || cleanedTitle === 'Sabah Uyanış Alarmı') {
    cleanedTitle = 'İstiklal Marşı & Bayrak Töreni';
  }

  return { targetDate, dayLabel, hour, minute, tarih_iso, timeLabel, cleanedTitle };
}

function addBusinessDays(baseDate: Date, count: number): Date {
  const result = new Date(baseDate);
  let added = 0;
  while (added < count) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) {
      added++;
    }
  }
  result.setHours(17, 0, 0, 0);
  return result;
}

export function parseSchoolAdminIntent(
  rawText: string,
  now: Date = new Date(),
  userDomain?: string
): SchoolAdminTask | null {
  if (!rawText || typeof rawText !== 'string') return null;
  const text = rawText.toLowerCase().trim();

  // 0. HIZLI SENARYO VERİTABANI KONTROLÜ (matchShortScenario - EGITIM)
  const shortMatch = matchShortScenario(rawText, 'EGITIM');
  if (shortMatch && shortMatch.domain === 'EGITIM') {
    return {
      id: `edu_scenario_${Date.now()}`,
      baslik: shortMatch.baslik,
      kategori: 'Öğretmenlik',
      mevzuat_notu: shortMatch.akilliFisilti || 'MEB mevzuatına uygun olarak eğitim süreçleri yürütülmelidir.',
      action_items: (shortMatch.oncedenYapilacaklar || []).map((t) => ({ task: t, is_completed: false })),
      zaman_etiketi: shortMatch.varsayilanZaman || 'İdari Takvim',
      tarih_iso: null,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      ikon: shortMatch.ikon,
      renk: shortMatch.renk,
      sesli_geribildirim: shortMatch.akilliFisilti || `${shortMatch.baslik} adımları oluşturuldu.`
    };
  }

  const isEduDomain = userDomain === 'EGITIM';

  // İSG (İş Sağlığı ve Güvenliği) ve Ramak Kala gibi spesifik saha durumları eğitim motoruna takılmamalıdır
  const isOccupationalSafetyQuery =
    text.includes('ramak kala') ||
    text.includes('ibys') ||
    text.includes('iş güvenliği') ||
    text.includes('is güvenligi') ||
    text.includes('iş sağlığı') ||
    text.includes('is sagligi') ||
    text.includes('iş kazası') ||
    text.includes('is kazasi') ||
    text.includes('çalışan eğitimi') ||
    text.includes('calisan egitimi') ||
    text.includes('döf formu') ||
    text.includes('sıcak iş izni') ||
    text.includes('kapalı alan izni');

  if (!isEduDomain && isOccupationalSafetyQuery) {
    return null;
  }

  const isEducationContext =
    isEduDomain ||
    text.includes('okul') || (text.includes('eğitim') && !text.includes('iş güvenliği') && !text.includes('çalışan')) || text.includes('egitim') ||
    text.includes('öğretmen') || text.includes('ogretmen') || text.includes('müdür') || text.includes('mudur') ||
    text.includes('sınav') || text.includes('sinav') || text.includes('e-okul') || text.includes('eokul') ||
    text.includes('not giriş') || text.includes('not giris') || text.includes('kazanım analizi') || text.includes('barem') ||
    text.includes('nöbet') || text.includes('nobet') || text.includes('gözetmen') || text.includes('gozetmen') ||
    text.includes('makale') || text.includes('hakemlik') || text.includes('peer-review') || text.includes('peer review') ||
    text.includes('tübitak') || text.includes('tubitak') || text.includes('bap') || text.includes('tez jürisi') || text.includes('tez jurisi') ||
    text.includes('araştırma görevlisi') || text.includes('akademisyen') || text.includes('üniversite') || text.includes('universite') ||
    text.includes('dys') || text.includes('desimal') || text.includes('üst yazı') || text.includes('ust yazi') ||
    text.includes('ilçe mem') || text.includes('ilce mem') || text.includes('il mem') || text.includes('cimer') ||
    text.includes('kaymakamlık olur') || text.includes('kaymakamlik olur') || text.includes('mebbis') ||
    text.includes('zümre') || text.includes('zumre') || text.includes('şök') || text.includes('sok') ||
    text.includes('ek ders') || text.includes('kbs') || text.includes('puantaj') || text.includes('dyk') ||
    text.includes('taşımalı') || text.includes('tasimali') || text.includes('yemek numune') || text.includes('servis denetim') ||
    text.includes('devamsızlık') || text.includes('devamsizlik') || text.includes('disiplin') || text.includes('öddk') || text.includes('oddk') ||
    text.includes('tahliye tatbikatı') || text.includes('yangın tatbikatı') || text.includes('ziyaretçi defteri') ||
    text.includes('destek eğitim') || text.includes('destek egitim') || text.includes('bep') || /\bram\b/i.test(text) ||
    text.includes('pdr') || text.includes('rehberlik') || text.includes('tefbis') || text.includes('kantin kira') || text.includes('okul aile birliği') ||
    text.includes('istiklal') || text.includes('bayrak') || text.includes('tören') || text.includes('toreni');

  if (!isEducationContext) return null;

  // 0.1 İSTİKLAL MARŞI & BAYRAK TÖRENİ PROTOKOLÜ
  if (
    text.includes('istiklal') ||
    text.includes('bayrak töreni') ||
    text.includes('bayrak toreni') ||
    text.includes('tören') ||
    text.includes('toreni') ||
    text.includes('saygı duruşu') ||
    text.includes('saygi durusu')
  ) {
    const dt = parseEduDateTime(rawText, now, 8, 20);
    const prepDate = new Date(dt.targetDate);
    prepDate.setMinutes(prepDate.getMinutes() - 10);
    const pad = (n: number) => String(n).padStart(2, '0');
    const prepTimeLabel = `${dt.dayLabel} ${pad(prepDate.getHours())}:${pad(prepDate.getMinutes())} (Ses & Düzen Kontrolü)`;

    return {
      id: `edu_toren_${Date.now()}`,
      baslik: dt.cleanedTitle || 'İstiklal Marşı & Bayrak Töreni',
      kategori: 'Taşımalı & Sosyal',
      mevzuat_notu: 'MEB Bayrak Törenleri Yönergesi uyarınca okul açılış (Pazartesi) ve kapanış (Cuma) törenlerinde İstiklal Marşı tam kadro ve kat emniyeti ile icra edilir.',
      action_items: [
        { task: 'Tören alanının (okul bahçesi/salon), ses düzeninin ve bayrak direğinin fiziki kontrolünü sağla', is_completed: false },
        { task: 'İstiklal Marşı ses kaydını veya bando/müzik ekipmanını test et', is_completed: false },
        { task: 'Öğrenci ve öğretmenlerin tören düzenine (sınıf bazlı hiza) geçmesini koordine et', is_completed: false },
        { task: 'Bayrak çekme görevlisi öğrencileri ve tören sunucusunu hazır et', is_completed: false }
      ],
      zaman_etiketi: `${dt.dayLabel} ${pad(dt.hour)}:${pad(dt.minute)}`,
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: prepTimeLabel,
      ikon: '🇹🇷',
      renk: '#FEE2E2',
      sesli_geribildirim: `İstiklal Marşı töreni için ${dt.dayLabel.toLowerCase()} saat ${pad(dt.hour)}:${pad(dt.minute)}ye alarm kuruldu.`
    };
  }

  // 1. KBS & EK DERS ONAY TAKVİMİ (AYIN 20-27'Sİ ARASI)
  if (
    text.includes('ek ders') ||
    text.includes('kbs') ||
    text.includes('puantaj') ||
    text.includes('dyk') ||
    text.includes('ekders') ||
    (text.includes('nöbet') && (text.includes('ücret') || text.includes('puantaj') || text.includes('bordro')))
  ) {
    const kbsDue = new Date(now);
    kbsDue.setDate(24);
    kbsDue.setHours(17, 0, 0, 0);

    return {
      id: `edu_kbs_${Date.now()}`,
      baslik: 'KBS Ek Ders & Puantaj Onayı',
      kategori: 'Özlük & Puantaj',
      mevzuat_notu: 'KBS ek ders onayları her ayın 20-27\'si arasında tamamlanmalıdır; raporlu/sevkli günlerin puantajdan düşülmemesi kamu zararı doğurur.',
      action_items: [
        { task: 'Sınıf ve nöbet defterlerindeki öğretmen imzalarını haftalık puantaj föyüyle karşılaştır', is_completed: false },
        { task: 'Raporlu, sevkli ve idari izinli öğretmenlerin gün/ders bazlı kesintilerini MEBBİS modülüne işle', is_completed: false },
        { task: 'DYK (Destekleme ve Yetiştirme Kursu) ile nöbet görev ücretlerini KBS sistemine aktar', is_completed: false },
        { task: 'Okul Müdürü onaylı ıslak imzalı ek ders icmal bordrosunu Malmüdürlüğü/Muhasebe birimine teslim et', is_completed: false }
      ],
      zaman_etiketi: 'Her Ayın 20-27 Arası (KBS Onay)',
      tarih_iso: kbsDue.toISOString(),
      hazirlik_zamani: 'Ayın 20\'si (Puantaj Toplama Başlangıcı)',
      ikon: '📋',
      renk: '#FEF3C7',
      sesli_geribildirim: 'KBS ek ders onay takvimi, DYK/nöbet puantajı ve rapor kesinti adımları planlandı.'
    };
  }

  // 2. TAŞIMALI EĞİTİM, YEMEK NUMUNESİ (72 SAAT +4°C) & SERVİS DENETİMİ
  if (
    text.includes('taşımalı') ||
    text.includes('tasimali') ||
    text.includes('yemek numune') ||
    text.includes('servis denetim') ||
    text.includes('numune dolabı') ||
    text.includes('72 saat numune') ||
    text.includes('öğle yemeği numune') ||
    (text.includes('nöbet') && (text.includes('servis') || text.includes('boş ders') || text.includes('bos ders') || text.includes('yemekhane')))
  ) {
    return {
      id: `edu_tasimali_${Date.now()}`,
      baslik: 'Taşımalı Yemek, Servis & Nöbet Denetimi',
      kategori: 'Taşımalı & Sosyal',
      mevzuat_notu: 'MEB Taşımalı Eğitim ve Hijyen Yönetmeliği gereği yemek numuneleri steril kaplarda +4°C\'de 72 saat saklanmalı, servis denetimleri haftalık yapılmalıdır.',
      action_items: [
        { task: 'Gelen sıcak yemekten her çeşitten steril kavanozlara numune al, etiketle ve +4°C numune dolabında 72 saat muhafaza et', is_completed: false },
        { task: 'Taşımalı servis araçlarının yangın tüpü, emniyet kemerleri, rehber personel ve güzergah föyünü denetle', is_completed: false },
        { task: 'Raporlu/sevkli öğretmenlerin sınıflarını tespit ederek boş geçen derslere nöbetçi öğretmen görevlendirmesi yap', is_completed: false },
        { task: 'Yemek teslim tutanağını yüklenici firma yetkilisi ve okul nöbetçi idarecisi ile müştereken imzala', is_completed: false }
      ],
      zaman_etiketi: 'Günlük Denetim / 72 Saat Numune',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Yemek Öncesi / Sabah 08:15',
      ikon: '🍱',
      renk: '#DCFCE7',
      sesli_geribildirim: '72 saatlik yemek numunesi saklama, servis denetimi ve boş ders nöbetçi görevlendirmesi kuruldu.'
    };
  }

  // 3. E-OKUL DEVAMSIZLIK MEKTUPLARI & VELİ TEBLİGATI (5/10/15 GÜN EŞİĞİ)
  if (
    text.includes('devamsızlık mektubu') ||
    text.includes('devamsizlik mektubu') ||
    text.includes('özürsüz devamsızlık') ||
    text.includes('ozursuz devamsizlik') ||
    (text.includes('devamsızlık') && (text.includes('veli') || text.includes('mektup') || text.includes('tebliğ') || text.includes('tebligat') || text.includes('5 gün') || text.includes('10 gün'))) ||
    (text.includes('devamsizlik') && (text.includes('veli') || text.includes('mektup') || text.includes('teblig') || text.includes('tebligat')))
  ) {
    return {
      id: `edu_devamsizlik_${Date.now()}`,
      baslik: 'e-Okul Devamsızlık Mektubu & Veli Tebliği',
      kategori: 'Öğrenci İşleri',
      mevzuat_notu: 'MEB Okul Öncesi ve İlköğretim / Ortaöğretim Kurumları Yönetmeliği uyarınca özürsüz 5, 10 ve 15 gün devamsızlık yapan öğrencilerin velilerine yasal tebligat zorunludur.',
      action_items: [
        { task: 'e-Okul sistemi üzerinden özürsüz 5 ve 10 gün devamsızlık sınırına ulaşan öğrencilerin listesini dök', is_completed: false },
        { task: 'Resmi devamsızlık uyarı mektubunu ve veli iletişim adreslerini kütük defterinden doğrula', is_completed: false },
        { task: 'Tebligat zarflarını iadeli taahhütlü posta veya zimmet karşılığı imza ile veliye ulaştır', is_completed: false },
        { task: 'Posta alındı veya elden tebellüğ belgesini öğrencinin okul özlük dosyasına tak', is_completed: false }
      ],
      zaman_etiketi: 'Özürsüz 5 / 10 Gün Eşiği',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Haftalık Devamsızlık Kapatma Öncesi',
      ikon: '🏫',
      renk: '#FEE2E2',
      sesli_geribildirim: 'e-Okul devamsızlık mektubu dökümü ve veli yasal tebligat adımları oluşturuldu.'
    };
  }

  // 4. ÖĞRENCİ DİSİPLİN KURULU (ÖDDK) & 3 İŞ GÜNÜ YASAL SAVUNMA SÜRESİ
  if (
    text.includes('disiplin kurulu') ||
    text.includes('öddk') ||
    text.includes('oddk') ||
    text.includes('disiplin soruşturması') ||
    (text.includes('disiplin') && (text.includes('savunma') || text.includes('ceza') || text.includes('olay') || text.includes('kurul') || text.includes('öğrenci') || text.includes('ogrenci'))) ||
    (text.includes('öğrenci') && text.includes('savunma') && text.includes('tutanak'))
  ) {
    const savunmaDue = addBusinessDays(now, 3);

    return {
      id: `edu_disiplin_${Date.now()}`,
      baslik: 'Öğrenci Disiplin Kurulu (ÖDDK) Dosyası',
      kategori: 'Öğrenci İşleri',
      mevzuat_notu: 'MEB Ödül ve Disiplin Yönetmeliği gereği öğrenciye en az 3 iş günü yazılı savunma süresi tanınmadan disiplin cezası uygulanamaz.',
      action_items: [
        { task: 'Nöbetçi öğretmen ve olaya karışan tanıkların ıslak imzalı olay yeri tutanağını dosyala', is_completed: false },
        { task: 'Öğrenciye 3 iş günü yasal yazılı savunma bildirim belgesini tebliğ et', is_completed: false },
        { task: 'Öğrenci velisini disiplin süreci hakkında resmi yazıyla bilgilendir', is_completed: false },
        { task: 'ÖDDK Disiplin Kurulunu toplayarak karar tutanağını tanzim et ve e-Okul modülüne kaydet', is_completed: false }
      ],
      zaman_etiketi: 'Yasal Süre: 3 İş Günü (Savunma)',
      tarih_iso: savunmaDue.toISOString(),
      hazirlik_zamani: 'Olay Günü / Derhal Tutanak',
      ikon: '🏫',
      renk: '#FEE2E2',
      sesli_geribildirim: 'Disiplin süreci için olay tutanağı, 3 günlük savunma hakkı ve ÖDDK takvimi açıldı.'
    };
  }

  // 5. RESMİ YAZIŞMALAR, DYS, DESİMAL KODU, KAYMAKAMLIk OLURU & CİMER (5 İŞ GÜNÜ İVEDİ)
  if (
    text.includes('dys') ||
    text.includes('desimal') ||
    text.includes('kaymakamlık olur') ||
    text.includes('kaymakamlik olur') ||
    text.includes('üst yazı') ||
    text.includes('ust yazi') ||
    text.includes('cimer') ||
    text.includes('ilçe mem') ||
    text.includes('ilce mem') ||
    text.includes('il mem') ||
    text.includes('resmi yazışma') ||
    text.includes('resmi yazi')
  ) {
    const due = addBusinessDays(now, 5);

    return {
      id: `edu_dys_${Date.now()}`,
      baslik: 'DYS & CİMER Resmi Yazışma Süreci',
      kategori: 'Mevzuat & DYS',
      mevzuat_notu: 'Resmi Yazışmalarda Uygulanacak Usul ve Esaslar ile CİMER mevzuatı uyarınca günlü yazılara yasal süre içinde Standart Dosya Planı koduyla cevap verilmelidir.',
      action_items: [
        { task: 'DYS gelen kutusundaki süreli/ivedi yazıları ve Standart Dosya Planı (Desimal) kodunu belirle', is_completed: false },
        { task: 'İlgili zümre veya müdür yardımcısından gerekli bilgi/belgeleri toplayarak resmi üst yazı taslağını oluştur', is_completed: false },
        { task: 'Okul Müdürü ve İlçe MEM onay silsilesine e-İmza ile parafa sun', is_completed: false },
        { task: 'CİMER veya Bilgi Edinme başvurusuna sistem üzerinden resmi cevap metnini yükleyerek kaydı kapat', is_completed: false }
      ],
      zaman_etiketi: '5 İş Günü İçinde (Yasal Cevap)',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Yazı Geldiğinde (1. İş Günü)',
      ikon: '🏛️',
      renk: '#E0E7FF',
      sesli_geribildirim: 'DYS ve CİMER resmi yazı süreci için 5 iş günü yasal cevap geri sayımı başlatıldı.'
    };
  }

  // 6. OKUL İSG, YANGIN/TAHLİYE TATBİKATI & ZİYARETÇİ GÜVENLİK DEFTERİ
  if (
    text.includes('tatbikat') ||
    text.includes('tahliye tatbikatı') ||
    text.includes('tahliye tatbikati') ||
    text.includes('yangın tatbikatı') ||
    text.includes('yangin tatbikati') ||
    text.includes('ziyaretçi defteri') ||
    text.includes('ziyaretci defteri') ||
    text.includes('yangın tüpü') ||
    text.includes('yangin tupu') ||
    (text.includes('isg') && (text.includes('okul') || text.includes('tahliye') || text.includes('yangın') || text.includes('yangin'))) ||
    (text.includes('güvenlik') && (text.includes('okul') || text.includes('giriş') || text.includes('giris')))
  ) {
    return {
      id: `edu_isg_${Date.now()}`,
      baslik: 'Okul İSG, Tatbikat & Güvenlik Denetimi',
      kategori: 'İSG & Güvenlik',
      mevzuat_notu: 'MEB İSG ve Yangın Önleme Yönetmeliği uyarınca her dönem en az 1 tahliye tatbikatı yapılmalı, giriş kapısı ziyaretçi protokolü kesintisiz işletilmelidir.',
      action_items: [
        { task: 'Dönemlik yangın ve acil durum tahliye tatbikatı planla, tahliye süresini kronometreyle ölç ve tutanak altına al', is_completed: false },
        { task: 'Okul ana giriş kapısı ziyaretçi kayıt defteri, kimlik teslimi ve ziyaretçi kartı uygulamasını bizzat denetle', is_completed: false },
        { task: 'Katlardaki yangın tüplerinin manometre basınç ibrelerini (yeşil alan) ve son dolum etiket tarihlerini kontrol et', is_completed: false },
        { task: 'Acil çıkış kapılarının açık ve kaçış koridorlarının engelsiz olduğunu doğrula', is_completed: false }
      ],
      zaman_etiketi: 'Dönemlik / Periyodik İSG',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Tatbikattan 1 Gün Önce Bilgilendirme',
      ikon: '🛡️',
      renk: '#F1F5F9',
      sesli_geribildirim: 'Tahliye tatbikatı tutanağı, ziyaretçi defteri ve yangın tüpü İSG denetimi planlandı.'
    };
  }

  // 7. DESTEK EĞİTİM ODASI, BEP & RAM SÜRECİ
  if (
    text.includes('destek eğitim') ||
    text.includes('destek egitim') ||
    text.includes('bep') ||
    (text.includes('ram') && (text.includes('rapor') || text.includes('yönlendirme') || text.includes('yonlendirme') || text.includes('öğrenci') || text.includes('ogrenci') || text.includes('özel eğitim') || text.includes('ozel egitim')))
  ) {
    const isMonday = text.includes('pazartesi');
    const targetDate = new Date(now);

    if (isMonday) {
      const day = targetDate.getDay();
      const diff = day === 0 ? 1 : 8 - day;
      targetDate.setDate(targetDate.getDate() + diff);
      targetDate.setHours(8, 30, 0, 0);
    }

    return {
      id: `edu_destek_${Date.now()}`,
      baslik: 'Destek Eğitim Odası Onay & BEP Takvimi',
      kategori: 'Özel Eğitim',
      mevzuat_notu: 'MEB Özel Eğitim Hizmetleri Yönetmeliği uyarınca BEP Geliştirme Birimi toplanmalı, destek eğitim odası için Kaymakamlık Oluru alınmalıdır.',
      action_items: [
        { task: 'Öğrencinin güncel RAM eğitsel değerlendirme raporu ve veli muvafakatnamesini dosyala', is_completed: false },
        { task: 'Destek eğitim odasında ders verecek branş öğretmenlerinin haftalık boş saatleriyle uyumlu ders programı hazırla', is_completed: false },
        { task: 'DYS üzerinden Destek Eğitim Odası Açılmasına İlişkin Kaymakamlık / İlçe MEM Olur yazısını onaya gönder', is_completed: false },
        { task: 'Bireyselleştirilmiş Eğitim Planı (BEP) gelişim ölçeklerini ders öğretmenlerine teslim et', is_completed: false }
      ],
      zaman_etiketi: isMonday ? 'Pazartesi 08:30 (DYS Görevi)' : 'Haftalık Program / DYS Onayı',
      tarih_iso: isMonday ? targetDate.toISOString() : now.toISOString(),
      hazirlik_zamani: 'Dönem Başı / Açılış Öncesi',
      ikon: '🏫',
      renk: '#E0E7FF',
      sesli_geribildirim: 'Destek eğitim odası açılış oluru, RAM raporu ve BEP haftalık programı hazırlandı.'
    };
  }

  // 8. K-12 SINAV NOT GİRİŞİ & KAZANIM ANALİZİ (E-OKUL 10 GÜNLÜK KİLİT)
  if (
    text.includes('sınav okuma') ||
    text.includes('sinav okuma') ||
    text.includes('yazılı okuma') ||
    text.includes('yazili okuma') ||
    text.includes('sınav yaptık') ||
    text.includes('sinav yaptik') ||
    text.includes('sınav bitti') ||
    text.includes('sinav bitti') ||
    text.includes('yazılı yaptık') ||
    text.includes('yazili yaptik') ||
    text.includes('not giriş') ||
    text.includes('not giris') ||
    text.includes('e-okul not') ||
    text.includes('eokul not') ||
    text.includes('kazanım analizi') ||
    text.includes('kazanim analizi') ||
    (text.includes('barem') && text.includes('sınav'))
  ) {
    const due = new Date(now);
    due.setDate(due.getDate() + 10);
    due.setHours(17, 0, 0, 0);

    return {
      id: `edu_sinav_${Date.now()}`,
      baslik: 'e-Okul Sınav Not Kilidi & Kazanım Analizi',
      kategori: 'Öğretmenlik',
      mevzuat_notu: 'MEB Ölçme ve Değerlendirme Yönetmeliği uyarınca sınav sonuçları ve kazanım analizleri sınav tarihinden itibaren en geç 10 gün içinde e-Okul\'a girilmelidir.',
      action_items: [
        { task: 'Sınav cevap anahtarı ve puanlama baremini okul duyuru panosuna asarak öğrencilere duyur', is_completed: false },
        { task: 'Yazılı sınav kağıtlarını objektif kriterle oku ve soru bazlı kazanım analiz tablosunu doldur', is_completed: false },
        { task: 'e-Okul sistemine sınav notlarını ve kazanım eksikliklerini işleyerek not kilidini kapat', is_completed: false },
        { task: 'İmzalı sınav analiz çıktısı, cevap anahtarı ve kağıtları zümre başkanına teslim tutanağıyla ilet', is_completed: false }
      ],
      zaman_etiketi: 'Son 10 Gün (Not Kilitleme)',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Sınav Sonrası İlk 3 Gün (Okuma Başlangıcı)',
      ikon: '✍️',
      renk: '#FEF08A',
      sesli_geribildirim: 'Sınav not girişi için 10 günlük e-Okul sayacı ve kazanım analizi adımları oluşturuldu.'
    };
  }

  // 9. K-12 ÖĞRETMEN NÖBET GÖREVİ & ALAN EMNİYETİ (İLK DERSTEN 30 DK ÖNCE)
  if (
    text.includes('nöbetçiyim') ||
    text.includes('nobetciyim') ||
    text.includes('okul nöbeti') ||
    text.includes('okul nobeti') ||
    text.includes('kat nöbeti') ||
    text.includes('kat nobeti') ||
    text.includes('bahçe nöbeti') ||
    text.includes('bahce nobeti') ||
    text.includes('nöbet defteri') ||
    text.includes('nobet defteri') ||
    (text.includes('nöbet') && (text.includes('öğretmen') || text.includes('ogretmen') || text.includes('teneffüs') || text.includes('teneffus')))
  ) {
    const timeMatch = rawText.match(/(\d{1,2})[:.](\d{2})/);
    let nobetZaman = 'İlk Ders Öncesi (30 Dk Önce)';
    const nobetDate = new Date(now);
    nobetDate.setHours(8, 0, 0, 0);

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      nobetDate.setHours(h, m - 30, 0, 0);
      const nh = nobetDate.getHours().toString().padStart(2, '0');
      const nm = nobetDate.getMinutes().toString().padStart(2, '0');
      nobetZaman = `${nh}:${nm} (30 Dk Önce)`;
    }

    return {
      id: `edu_nobet_${Date.now()}`,
      baslik: 'Okul Nöbet Görevi & Alan Emniyeti',
      kategori: 'Öğretmenlik',
      mevzuat_notu: 'MEB Kurumları Yönetmeliği uyarınca nöbet görevi ilk ders başlamadan en az 30 dakika önce başlar, son ders bitiminden 30 dakika sonra biter.',
      action_items: [
        { task: 'Sabah ilk ders başlamadan 30 dakika önce nöbet defterini imzala ve görev yerini teslim al', is_completed: false },
        { task: 'Kat, bahçe veya yemekhane alanında öğrencilerin fiziki güvenliğini ve emniyetini gözet', is_completed: false },
        { task: 'Teneffüslerde nöbet bölgesini terk etme; boş geçen dersleri ve olayları derhal idareye bildir', is_completed: false },
        { task: 'Mesai bitiminde günün vukuat özetini nöbet defterine yazarak nöbetçi müdür yardımcısına teslim et', is_completed: false }
      ],
      zaman_etiketi: nobetZaman,
      tarih_iso: nobetDate.toISOString(),
      hazirlik_zamani: 'Sabah 07:30 / 08:00 (Mesai Başlangıcı)',
      ikon: '📚',
      renk: '#FEF08A',
      sesli_geribildirim: 'İlk dersten 30 dakika öncesine nöbet defteri imzalama ve alan emniyeti alarmı kuruldu.'
    };
  }

  // 10. ŞÖK & ZÜMRE ÖĞRETMENLER KURULU TOPLANTISI
  if (
    text.includes('zümre') ||
    text.includes('zumre') ||
    text.includes('şök') ||
    text.includes('sok') ||
    text.includes('öğretmenler kurulu') ||
    text.includes('ogretmenler kurulu') ||
    text.includes('sınıf şube öğretmenler') ||
    text.includes('sinif sube ogretmenler')
  ) {
    let baslik = 'Zümre / ŞÖK Öğretmenler Kurulu';
    if (text.includes('şök') || text.includes('sok')) baslik = 'Şube Öğretmenler Kurulu (ŞÖK)';
    else if (text.includes('zümre') || text.includes('zumre')) baslik = 'Zümre Öğretmenler Kurulu';
    else if (text.includes('öğretmenler kurulu') || text.includes('ogretmenler kurulu')) baslik = 'Öğretmenler Kurulu Toplantısı';

    return {
      id: `edu_kurul_${Date.now()}`,
      baslik,
      kategori: 'Kurul & Zümre',
      mevzuat_notu: 'MEB Eğitim Kurulları ve Zümreleri Yönergesi uyarınca zümre ve ŞÖK karar tutanakları toplantı bitimini izleyen 3 gün içinde okul idaresine sunulur.',
      action_items: [
        { task: 'Toplantı gündem maddelerini, yıllık plan gerçekleşme oranlarını ve önceki karar tutanaklarını hazırla', is_completed: false },
        { task: 'Öğrenci başarı durumunu, başarısızlık nedenlerini ve telafi eylem planlarını görüşerek karara bağla', is_completed: false },
        { task: 'Zümre / ŞÖK toplantı tutanağını tüm kurul üyelerine eksiksiz imzalat', is_completed: false },
        { task: 'İmzalı karar tutanağını ve çalışma takvimini DYS üzerinden Okul Müdürü onayına sun', is_completed: false }
      ],
      zaman_etiketi: 'Toplantı Günü',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Toplantıdan 1 Gün Önce Gündem Dağıtımı',
      ikon: '📑',
      renk: '#FEF08A',
      sesli_geribildirim: 'Zümre ve ŞÖK toplantı gündemi, imza föyü ve karar tutanağı adımları hazırlandı.'
    };
  }

  // 11. AKADEMİK SINAV GÖZETMENLİĞİ (SINAVDAN 25 DK ÖNCE)
  if (
    text.includes('gözetmenlik') ||
    text.includes('gozetmenlik') ||
    text.includes('sınav gözetmeni') ||
    text.includes('sinav gozetmeni') ||
    text.includes('salon başkanı') ||
    text.includes('salon baskani') ||
    (text.includes('gözetmen') && (text.includes('sınav') || text.includes('sinav') || text.includes('amfi') || text.includes('fakülte')))
  ) {
    const timeMatch = rawText.match(/(\d{1,2})[:.](\d{2})/);
    let gozetmenZaman = 'Sınavdan 25 Dk Önce (Salon & Evrak)';
    const examDate = new Date(now);

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      examDate.setHours(h, m - 25, 0, 0);
      const gh = examDate.getHours().toString().padStart(2, '0');
      const gm = examDate.getMinutes().toString().padStart(2, '0');
      gozetmenZaman = `${gh}:${gm} (25 Dk Önce Hazırlık)`;
    } else {
      examDate.setHours(9, 35, 0, 0);
    }

    return {
      id: `edu_gozetmen_${Date.now()}`,
      baslik: 'Sınav Gözetmenliği & Salon Hazırlığı',
      kategori: 'Akademi & Araştırma',
      mevzuat_notu: 'Yükseköğretim Kurumları Sınav Yönetmeliği uyarınca gözetmenler sınav başlangıç saatinden en az 25 dakika önce evrakı teslim alıp salonda hazır bulunmalıdır.',
      action_items: [
        { task: 'Bölüm sekreterliği veya öğrenci işlerinden sınav soru kitapçıklarını ve yoklama listesini teslim al', is_completed: false },
        { task: 'Sınav salonunda öğrencilerin öğrenci kimlik kartlarını kontrol et ve oturma düzenini sağla', is_completed: false },
        { task: 'Tahtaya sınav başlangıç, bitiş saatini ve sınav kurallarını (cep telefonu yasağı) yaz', is_completed: false },
        { task: 'Sınav bitiminde teslim edilen kağıtları imza listesiyle sayarak teslim-tesellüm tutanağıyla bölüm başkanlığına teslim et', is_completed: false }
      ],
      zaman_etiketi: gozetmenZaman,
      tarih_iso: examDate.toISOString(),
      hazirlik_zamani: 'Sınavdan 25 Dk Önce (Evrak Teslim)',
      ikon: '🎓',
      renk: '#DDD6FE',
      sesli_geribildirim: 'Sınav saatinden 25 dakika öncesine evrak teslim ve amfi hazırlık alarmı kuruldu.'
    };
  }

  // 12. MAKALE REVİZYONU, HAKEMLİK (PEER-REVIEW) & RESPONSE TO REVIEWERS
  if (
    text.includes('makale') ||
    text.includes('hakemlik') ||
    text.includes('peer-review') ||
    text.includes('peer review') ||
    text.includes('hakem değerlendirmesi') ||
    text.includes('response to reviewers') ||
    text.includes('scholarone') ||
    text.includes('editorial manager')
  ) {
    const due = new Date(now);
    due.setDate(due.getDate() + 14);
    due.setHours(23, 59, 0, 0);

    return {
      id: `edu_makale_${Date.now()}`,
      baslik: 'Makale Revizyonu & Hakemlik (Peer-Review)',
      kategori: 'Akademi & Araştırma',
      mevzuat_notu: 'Uluslararası hakemli dergi yayın etiği (COPE) gereğince hakem eleştirilerine madde madde Response Letter ile yanıt verilmelidir.',
      action_items: [
        { task: 'Editör ve hakem raporundaki (Reviewer Comments) tüm eleştirileri maddeleştirerek tasnif et', is_completed: false },
        { task: 'Metin içi düzeltmeleri ve eklemeleri Word Track Changes veya renkli fontla belirginleştir', is_completed: false },
        { task: 'Her hakem sorusuna sayfa ve paragraf referanslı detaylı "Response to Reviewers" yanıt mektubunu yaz', is_completed: false },
        { task: 'Dergi yönetim sistemine (ScholarOne/OJS) revize ana metin ve yanıt dosyasını süresi dolmadan yükle', is_completed: false }
      ],
      zaman_etiketi: 'Yasal Teslim Tarihi (14 Gün)',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Teslime 3 Gün Kala (Mektup Kontrolü)',
      ikon: '🔬',
      renk: '#DDD6FE',
      sesli_geribildirim: 'Makale revizyonu, hakem yanıtları ve Response to Reviewers mektup süreci takvimlendi.'
    };
  }

  // 13. TÜBİTAK / BAP PROJESİ, TEZ JÜRİSİ & HARCAMA KAPANIŞI
  if (
    text.includes('tübitak') ||
    text.includes('tubitak') ||
    text.includes('bap') ||
    text.includes('tez jürisi') ||
    text.includes('tez jurisi') ||
    text.includes('tez savunması') ||
    text.includes('tez savunmasi') ||
    text.includes('proje gelişme raporu') ||
    text.includes('ara rapor') ||
    text.includes('proje kapanış')
  ) {
    const due = new Date(now);
    due.setDate(due.getDate() + 14);
    due.setHours(17, 0, 0, 0);

    return {
      id: `edu_proje_${Date.now()}`,
      baslik: 'TÜBİTAK / BAP Projesi & Tez Jürisi',
      kategori: 'Akademi & Araştırma',
      mevzuat_notu: 'TÜBİTAK ve BAP Yönergesi uyarınca ara gelişme raporları ve fatura harcama dökümleri belirlenen takvimde Enstitü/BAP birimine sunulmalıdır.',
      action_items: [
        { task: 'Dönem içi proje harcama faturalarını, taşınır işlem fişlerini ve banka dekontlarını tasnif et', is_completed: false },
        { task: 'Proje bilimsel gelişme ve sonuç raporunu sisteme (PRODİS/BAP Portal) yükle', is_completed: false },
        { task: 'Yüksek lisans/doktora tez jürisi için jüri üyelerine tez nüshalarını ve davet yazılarını ilet', is_completed: false },
        { task: 'Tez savunma sınavı tutanağını jüri üyelerine imzalatarak Enstitü Öğrenci İşlerine teslim et', is_completed: false }
      ],
      zaman_etiketi: 'Rapor / Jüri Teslim Tarihi',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Jüriden 3 Gün Önce (Evrak Kontrolü)',
      ikon: '🎓',
      renk: '#E0E7FF',
      sesli_geribildirim: 'Proje gelişme raporu, harcama belgeleri ve tez jürisi teslim süreci oluşturuldu.'
    };
  }

  // 14. REHBERLİK & PDR: RAM YÖNLENDİRME, BEP & İHMAL/İSTİSMAR BİLDİRİMİ
  if (
    text.includes('rehberlik') ||
    text.includes('pdr') ||
    text.includes('ram eğitsel') ||
    text.includes('ram egitsel') ||
    text.includes('rehberlik servisi') ||
    text.includes('ihmal istismar') ||
    text.includes('risk grubu öğrenci') ||
    text.includes('bildirim yükümlülüğü')
  ) {
    return {
      id: `edu_pdr_${Date.now()}`,
      baslik: 'PDR & Rehberlik Hizmetleri Protokolü',
      kategori: 'Özel Eğitim',
      mevzuat_notu: 'MEB Rehberlik ve Psikolojik Danışma Hizmetleri Yönetmeliği ile TCK 279 gereğince çocuk koruma ve bildirim süreçlerinde gizlilik esastır.',
      action_items: [
        { task: 'Özel gereksinimli veya risk altındaki öğrenci için RAM Eğitsel Değerlendirme İsteği Formunu doldur', is_completed: false },
        { task: 'Görüşme notlarını PDR servisi gizlilik protokolüne uygun olarak şifreli/kilitli dolapta muhafaza et', is_completed: false },
        { task: 'İhmal/istismar şüphesi durumunda Çocuk İzlem Merkezi (ÇİM) veya savcılık bildirim sürecini Okul Müdürüyle ivedilikle koordine et', is_completed: false },
        { task: 'Öğrenci velisi ve sınıf rehber öğretmeniyle koordineli BEP izleme toplantısını gerçekleştir', is_completed: false }
      ],
      zaman_etiketi: 'Görüşme & Raporlama Saati',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Görüşmeden Önce Dosya İnceleme',
      ikon: '🤝',
      renk: '#CCFBF1',
      sesli_geribildirim: 'Rehberlik PDR eğitsel değerlendirme, gizlilik esası ve RAM koordinasyon kartı açıldı.'
    };
  }

  // 15. TEFBİS OKUL AİLE BİRLİĞİ & KANTİN KİRA / İHALE DENETİMİ
  if (
    text.includes('tefbis') ||
    text.includes('okul aile birliği') ||
    text.includes('okul aile birligi') ||
    text.includes('kantin kira') ||
    text.includes('kantin denetim') ||
    text.includes('ihale komisyonu') ||
    text.includes('bağış makbuzu') ||
    text.includes('bagis makbuzu')
  ) {
    return {
      id: `edu_tefbis_${Date.now()}`,
      baslik: 'TEFBİS & Kantin / Okul Aile Birliği',
      kategori: 'Özlük & Puantaj',
      mevzuat_notu: 'MEB Okul Aile Birliği Yönetmeliği uyarınca tüm gelir-giderler TEFBİS modülüne girilmeli, kantin hijyen denetimleri aylık yapılmalıdır.',
      action_items: [
        { task: 'Okul aile birliği banka hesabına yatan bağış ve kantin kira dekontlarını TEFBİS modülüne işle', is_completed: false },
        { task: 'Aylık kantin denetim komisyonuyla gıda hijyeni, fiyat tarifesi ve Tarım Bakanlığı onaylarını denetle', is_completed: false },
        { task: 'Kantin denetim formunu işletmeciyle birlikte imzalayıp dosyala', is_completed: false },
        { task: 'Dönemlik denetleme kurulu raporunu hazırlayarak panoda ilan et', is_completed: false }
      ],
      zaman_etiketi: 'Aylık Denetim / Kira Günü',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Ay Sonu / Kira Vadesi',
      ikon: '📊',
      renk: '#DCFCE7',
      sesli_geribildirim: 'TEFBİS gelir-gider kaydı, kantin kira ve hijyen denetim föyü takvimlendi.'
    };
  }

  // 16. GENEL EĞİTİM & OKUL YÖNETİMİ FALLBACK (Sadece eğitim terimleri geçtiğinde)
  if (userDomain === 'EGITIM' || userDomain === 'OGRENCI') {
    const isEduRelated = /okul|eğitim|egitim|meb|ders|sınav|sinav|öğretmen|ogretmen|öğrenci|ogrenci|veli|nöbet|nobet|puantaj|dys|mebbis|e-okul|eokul|school|teacher|student|exam|class/i.test(text);
    if (isEduRelated) {
      return {
        id: `edu_general_${Date.now()}`,
        baslik: 'Okul Yönetimi & Eğitim Protokolü',
        kategori: 'Mevzuat & DYS',
        mevzuat_notu: 'Millî Eğitim Bakanlığı mevzuatı uyarınca resmi kayıtlar, kurul kararları ve öğrenci işleri eksiksiz dosyalanmalıdır.',
        action_items: [
          { task: 'İlgili resmi yazı, mevzuat maddesi veya kurul gündemini incele', is_completed: false },
          { task: 'Sorumlu öğretmen, veli veya idari birimle koordinasyonu sağla', is_completed: false },
          { task: 'İşlem sonuç tutanağını e-Okul, MEBBİS veya DYS ortamına kaydet', is_completed: false }
        ],
        zaman_etiketi: 'Mesai İçi İdari Süreç',
        tarih_iso: now.toISOString(),
        hazirlik_zamani: 'İşlem Öncesi Evrak İnceleme',
        ikon: '🏫',
        renk: '#E0E7FF',
        sesli_geribildirim: 'Okul yönetimi ve eğitim idari işlem kartı oluşturuldu.'
      };
    }
  }

  return null;
}
