import type { NotiviaParsedNote, NotiviaSimpleNote } from '../types/notivia.ts';
import {
  getNextMonthEndTargetDate,
  calculateOffsetIso,
  rollToNextBusinessDay,
  calculateUetsDeadline,
  getTaxCalendarDeadlines,
  parseDailyLifeTime,
  type ParsedTimeResult
} from './date.ts';
import { inferPredictiveActions } from './predictiveGraph.ts';
import { matchShortScenario } from './scenarioDatabase.ts';
import { getCardColor } from './cardColors.ts';
import {
  findFermentationRecipe,
  buildFermentationCard,
  FERMENTATION_REGISTRY,
  type FermentationPhase,
  type FermentationRecipe
} from './fermentationScheduler.ts';
export {
  findFermentationRecipe,
  buildFermentationCard,
  FERMENTATION_REGISTRY,
  type FermentationPhase,
  type FermentationRecipe
} from './fermentationScheduler.ts';
export {
  extractDateTimeFromTurkish,
  getNextMonthEndTargetDate,
  calculateOffsetIso,
  rollToNextBusinessDay,
  calculateUetsDeadline,
  getTaxCalendarDeadlines,
  parseDailyLifeTime,
} from './date.ts';
export type { ParsedTimeResult } from './date.ts';
export { inferPredictiveActions } from './predictiveGraph.ts';
export { matchShortScenario } from './scenarioDatabase.ts';
export { getCardColor } from './cardColors.ts';

/**
 * Kullanıcı isteğindeki Sınav/Öğrenci ve Çalışmıyorum/Kişisel Yaşam motor kuralları
 */
export function dispatchDomainRule(
  domain: string | undefined,
  text: string,
  targetDateText?: string | null,
  targetIso?: string | null
): NotiviaSimpleNote | null {
  // Sınav / Öğrenci tespiti
  if (
    domain === 'OGRENCI' ||
    /(vize|final|büt|quiz|ödev|lms|turnitin|devamsızlık|burs|kyk|ders kaydı)/i.test(text)
  ) {
    const isExam = /(vize|final|büt|sınav)/i.test(text);
    return {
      baslik: isExam ? 'Sınav Oturumu & Çalışma Kampı' : 'Akademik Görev',
      zaman: targetDateText || 'Tarih Belirtilmedi',
      tarih_iso: targetIso || null,
      hazirlik_zamani: isExam ? 'Sınavdan 2 Gün Önce (Soru Çözümü)' : null,
      hazirlik_iso: isExam ? calculateOffsetIso(targetIso, -2) : null,
      eksik_bilgi: !targetIso,
      action_items: isExam
        ? [
            { task: 'Ders notları ve çıkmış sınav sorularını çöz', is_completed: false },
            { task: 'Özet formül/kavram kağıdı hazırla', is_completed: false },
            { task: 'Öğrenci kimliği ve sınav giriş yerini kontrol et', is_completed: false }
          ]
        : [
            { task: 'LMS/Turnitin intihal oranını kontrol et', is_completed: false },
            { task: 'Teslim formatını PDF olarak kaydet ve yükle', is_completed: false }
          ],
      anomali_notu: isExam ? 'Vize/Final notu geçme katsayısını doğrudan etkiler; T-2 gün kala soru kampı şarttır.' : null,
      ikon: '🎓',
      renk: '#DDD6FE',
      sesli_fisilti: isExam ? 'Sınav takvimi ve tersine çalışma kampı planlandı.' : 'Akademik teslim görevi kaydedildi.'
    };
  }

  // Çalışmıyorum / Kişisel Yaşam tespiti
  if (
    domain === 'CALISMIYORUM' ||
    /(taahhüt|fatura|abonelik|su arıtma|kombi bakımı|gss|işkur|aidat|kira)/i.test(text)
  ) {
    const isPeriodic = /(filtre|kombi|bakım|temizlik|ilaç)/i.test(text);
    return {
      baslik: isPeriodic ? 'Ev Periyodik Bakım Döngüsü' : 'Kişisel & Ev Rutini',
      zaman: targetDateText || 'Zamanı Geldiğinde',
      tarih_iso: targetIso || null,
      hazirlik_zamani: '1 Hafta Önce (Fiyat/Stok Kontrolü)',
      eksik_bilgi: false,
      action_items: isPeriodic
        ? [
            { task: 'Uyumlu yedek parça/filtre stok durumunu kontrol et', is_completed: false },
            { task: 'Değişim/bakım işlemini uygula ve çalışma sızdırmazlığını gözlemle', is_completed: false }
          ]
        : [
            { task: 'Son ödeme gününden önce bakiye/limit kontrolü sağla', is_completed: false }
          ],
      anomali_notu: 'Taahhütlü işlemlerde son 15 gün içinde bildirim yapılmazsa tarife cezalı fiyattan otomatik yenilenir.',
      ikon: '🏠',
      renk: '#F1F5F9',
      periyodik: isPeriodic ? { tip: 'aylik', aralik_gun: 180 } : null,
      sesli_fisilti: isPeriodic ? '6 aylık bakım döngüsü başlatıldı.' : 'Ödeme ve taahhüt takip kartı açıldı.'
    };
  }

  // Sağlık, Klinik & Tıp Tespiti
  if (
    domain === 'SAGLIK' ||
    /(konsültasyon|epikriz|pre-op|ameliyat|nöbet devri|sbar|dekübitus|pansuman|dikiş alma|soğuk zincir|aşı dolabı|otoklav|implant|order)/i.test(text)
  ) {
    const isUrgent = /(acil|stemi|arrest|kanama|koma)/i.test(text);
    const isSurgery = /(ameliyat|cerrahi|pre-op|operasyon)/i.test(text);
    const isHandover = /(nöbet devri|sbar|teslim)/i.test(text);

    let baslik = 'Klinik Görev';
    let ikon = '🩺';
    let renk = '#E0F2FE';

    if (isUrgent) {
      baslik = 'Acil Konsültasyon / Müdahale';
      ikon = '🚨';
      renk = '#FEE2E2';
    } else if (isSurgery) {
      baslik = 'Pre-Op Cerrahi Hazırlığı';
      ikon = '🏥';
      renk = '#E0F2FE';
    } else if (isHandover) {
      baslik = 'SBAR Nöbet Devir Teslimi';
      ikon = '💉';
      renk = '#CCFBF1';
    }

    return {
      baslik,
      zaman: targetDateText || (isUrgent ? 'Hemen (30 Dk SLA)' : 'Mesai İçi'),
      tarih_iso: targetIso || null,
      hazirlik_zamani: isSurgery ? 'Operasyondan 8 Saat Önce (Açlık & Tetkik)' : null,
      hazirlik_iso: isSurgery ? calculateOffsetIso(targetIso, -1) : null,
      eksik_bilgi: false,
      action_items: isSurgery
        ? [
            { task: 'NPO (Açlık) durumunu teyit et (minimum 8 saat)', is_completed: false },
            { task: 'Anestezi konsültasyon onayı ve aydınlatılmış onam formunu dosyala', is_completed: false },
            { task: 'Kan grubu, cross-match ve damar yolu açıklığını kontrol et', is_completed: false }
          ]
        : isHandover
        ? [
            { task: 'Yatan hastaların güncel vital bulgularını ve orderlarını kontrol et', is_completed: false },
            { task: 'SBAR şablonuna göre kritik hastaları yeni nöbetçiye sözlü ve yazılı devret', is_completed: false }
          ]
        : [
            { task: 'Hastanın klinik durumunu ve laboratuvar sonuçlarını değerlendir', is_completed: false },
            { task: 'Konsültasyon/order notunu HBYS sistemine işle ve e-İmza ile onayla', is_completed: false }
          ],
      anomali_notu: isUrgent
        ? 'Acil konsültasyon yanıt süresi kalite standartları gereği maksimum 30 dakikadır.'
        : isSurgery
        ? 'Açlık süresi ihlali aspirasyon pnömonisi riski yaratır, operasyon ertelenir.'
        : null,
      ikon,
      renk,
      sesli_fisilti: isUrgent ? '30 dakikalık acil konsültasyon sayacı başlatıldı.' : 'Klinik takip kartı oluşturuldu.'
    };
  }

  // Eğitim & Okul Yönetimi Tespiti
  if (
    domain === 'EGITIM' ||
    /(kbs|ek ders|taşımalı|yemek numune|nöbetçi öğretmen|dys|devamsızlık mektubu|yazılı yaptık|sınav okuma|e-okul|gözetmenlik|hakemlik|tez jürisi)/i.test(text)
  ) {
    const isKbs = /(kbs|ek ders|puantaj)/i.test(text);
    const isExam = /(yazılı|sınav yaptık|sınav bitti|not girişi)/i.test(text);
    const isFoodOrDuty = /(taşımalı|numune|yemek|nöbet)/i.test(text);
    const isAcademia = /(gözetmenlik|hakemlik|makale|bap|tübitak|jüri)/i.test(text);

    let baslik = 'Eğitim & Yönetim Görevi';
    let ikon = '📚';
    let renk = '#FEF08A';

    // 10 Günlük e-Okul Not Kilidi Hesabı
    if (isExam) {
      const baseDate = targetIso ? new Date(targetIso) : new Date();
      const deadlineDate = new Date(baseDate.getTime() + 10 * 24 * 60 * 60 * 1000);
      deadlineDate.setHours(17, 0, 0, 0);
      const deadlineIso = deadlineDate.toISOString();

      return {
        baslik: 'Yazılı Sınav Not Kilidi (e-Okul)',
        zaman: `${deadlineDate.getDate()} ${new Intl.DateTimeFormat('tr-TR', { month: 'short' }).format(deadlineDate)} 17:00 (10. Gün)`,
        tarih_iso: deadlineIso,
        hazirlik_zamani: 'Sınavdan 3 Gün Sonra (Okuma Başlangıcı)',
        eksik_bilgi: false,
        action_items: [
          { task: 'Cevap anahtarını ve puanlama baremini okul panosuna as', is_completed: false },
          { task: 'Yazılı kağıtlarını oku ve kazanım analiz tablosunu doldur', is_completed: false },
          { task: 'e-Okul sistemine notları gir ve sınav analiz çıktısını zümre başkanına teslim et', is_completed: false }
        ],
        anomali_notu: 'MEB Yönetmeliği uyarınca sınav sonuçları sınav tarihini takip eden en geç 10 gün içinde e-Okul\'a işlenmelidir.',
        ikon: '✍️',
        renk: '#FEF08A',
        sesli_fisilti: 'Yazılı sınav için 10 günlük e-Okul not giriş sayacı başlatıldı.'
      };
    }

    // KBS / Ek Ders Döngüsü
    if (isKbs) {
      return {
        baslik: 'KBS Ek Ders Onay & Puantaj',
        zaman: 'Her Ayın 24\'ü 17:00',
        tarih_iso: targetIso || null,
        eksik_bilgi: false,
        action_items: [
          { task: 'Raporlu, sevkli ve izinli öğretmenlerin ek ders kesintilerini puantaja işle', is_completed: false },
          { task: 'Nöbet, DYK ve ders dışı kulüp faaliyet saatlerini kontrol et', is_completed: false },
          { task: 'KBS sistemi üzerinden bordroyu hesaplat ve Malmüdürlüğü/Muhasebeye ilet', is_completed: false }
        ],
        anomali_notu: 'Ek ders puantajları her ayın 20-27\'si arasında tamamlanmalıdır; onay gecikmesi maaş ödemelerini aksatır.',
        ikon: '📋',
        renk: '#FEF3C7',
        sesli_fisilti: 'KBS ek ders onay ve puantaj kontrol kartı açıldı.'
      };
    }

    // Taşımalı Yemek & Güvenlik
    if (isFoodOrDuty) {
      return {
        baslik: 'Taşımalı Yemek & Nöbet Kontrolü',
        zaman: targetDateText || 'Sabah 08:15',
        tarih_iso: targetIso || null,
        eksik_bilgi: false,
        action_items: [
          { task: 'Öğle yemeği numunesini steril kavanoza al, etiketle ve +4°C dolapta 72 saat sakla', is_completed: false },
          { task: 'Öğrenci servis araçlarının emniyet kemeri ve şoför denetim föyünü imzala', is_completed: false },
          { task: 'Boş geçen sınıflar için nöbetçi öğretmen görevlendirmesini yap', is_completed: false }
        ],
        anomali_notu: 'Gıda güvenliği mevzuatı gereği taşımalı yemek numuneleri 72 saat boyunca +4°C saklanmak zorundadır.',
        ikon: '🍱',
        renk: '#DCFCE7',
        sesli_fisilti: 'Taşımalı yemek numune ve nöbet görev föyü oluşturuldu.'
      };
    }

    // Akademisyen (Gözetmenlik / Hakemlik)
    if (isAcademia) {
      const isProctor = /gözetmenlik/i.test(text);
      return {
        baslik: isProctor ? 'Sınav Gözetmenliği' : 'Akademik Hakemlik / Revizyon',
        zaman: targetDateText || 'Planlanan Saat',
        tarih_iso: targetIso || null,
        hazirlik_zamani: isProctor ? 'Sınavdan 25 Dk Önce (Evrak Teslim)' : null,
        eksik_bilgi: false,
        action_items: isProctor
          ? [
              { task: 'Sınav salon başkanlığından soru kitapçıkları ve yoklama listesini teslim al', is_completed: false },
              { task: 'Öğrenci kimlik kontrolü yap ve sınav salon oturma düzenini sağla', is_completed: false },
              { task: 'Sınav bitiminde optik formları sayıp tutanakla teslim et', is_completed: false }
            ]
          : [
              { task: 'Makalenin metodoloji ve kaynakça kontrolünü tamamla', is_completed: false },
              { task: 'Dergi portalı üzerinden hakem değerlendirme raporunu sisteme yükle', is_completed: false }
            ],
        anomali_notu: isProctor ? 'Gözetmenlik evrakları sınav başlamadan en az 20 dakika önce teslim alınmalıdır.' : null,
        ikon: isProctor ? '🎓' : '🔬',
        renk: '#DDD6FE',
        sesli_fisilti: isProctor ? 'Gözetmenlik için 25 dakika öncesine hazırlık alarmı kuruldu.' : 'Akademik görev kaydedildi.'
      };
    }

    return {
      baslik,
      zaman: targetDateText || 'Mesai İçi',
      tarih_iso: targetIso || null,
      eksik_bilgi: false,
      action_items: [
        { task: 'Görev detaylarını ve resmi evrak kayıtlarını kontrol et', is_completed: false },
        { task: 'İdare onaylı karar veya tutanağı dosyala', is_completed: false }
      ],
      ikon,
      renk,
      sesli_fisilti: 'Eğitim ve okul yönetimi görevi kaydedildi.'
    };
  }

  return null;
}

// src/utils/simpleNote.ts içine medikal ayrıştırıcı
export function parseMultiMedicationNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();
  
  // İlaç/sağlık anahtar kelimeleri kontrolü
  const isMedical = lower.includes('ilaç') || lower.includes('ilac') || lower.includes('hap') || 
                    lower.includes('aç karnına') || lower.includes('tok karnına') || 
                    lower.includes('vitamin') || lower.includes('antibiyotik') ||
                    lower.includes('magnezyum') || lower.includes('iğne') || lower.includes('tiroit') ||
                    lower.includes('mide koruyucu') || lower.includes('aspirin') || lower.includes('melatonin');

  if (!isMedical) return null;

  const tasks: { task: string; time: string; condition: string; is_completed: boolean }[] = [];

  // Vakit ve Şart Eşleştirmeleri
  const timeSlots = [
    { key: 'sabah aç', time: '08:00', condition: 'aç', label: 'Aç Karnına' },
    { key: 'sabah tok', time: '09:00', condition: 'tok', label: 'Tok Karnına' },
    { key: 'öğle aç', time: '12:30', condition: 'aç', label: 'Aç Karnına' },
    { key: 'öğle tok', time: '13:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'öğlen aç', time: '12:30', condition: 'aç', label: 'Aç Karnına' },
    { key: 'öğlen tok', time: '13:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'öğle', time: '13:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'öğlen', time: '13:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'ikindi', time: '16:00', condition: 'farketmez', label: 'İkindi' },
    { key: 'akşam aç', time: '18:30', condition: 'aç', label: 'Aç Karnına' },
    { key: 'akşam tok', time: '19:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'akşam', time: '19:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'gece', time: '22:30', condition: 'gece', label: 'Yatarken' },
    { key: 'yatarken', time: '22:30', condition: 'gece', label: 'Yatarken' }
  ];

  // Cümleyi virgül, "bir de", "ve" gibi bağlaçlarla parçala
  const parts = input.split(/,|veya|\s+ve\s+|\s+bir de\s+/gi);

  parts.forEach(part => {
    const pLower = part.toLowerCase();
    for (const slot of timeSlots) {
      if (pLower.includes(slot.key)) {
        // Vakit ifadesini temizle ve ilaç ismini izole et
        const medName = part
          .replace(new RegExp(slot.key, 'gi'), '')
          .replace(/ilaç|ilacımı|ilac|hapı|hapımı|hap|hatırlat|iç|al|kullan|alınacak/gi, '')
          .trim();

        const cleanMed = medName ? (medName.charAt(0).toUpperCase() + medName.slice(1)) : 'İlaç';

        tasks.push({
          task: `${slot.time} - ${cleanMed} (${slot.label})`,
          time: slot.time,
          condition: slot.condition,
          is_completed: false
        });
        break;
      }
    }
  });

  if (tasks.length === 0) return null;

  return {
    baslik: 'Günlük İlaç Takvimi',
    zaman: `Günde ${tasks.length} Doz`,
    tarih_iso: `${baseDate.toISOString().split('T')[0]}T${tasks[0].time}:00`,
    action_items: tasks,
    ikon: '💊',
    renk: '#F3E8FF',
    anomali_notu: 'İlaçları bol su ile alınız; saat aralıklarına dikkat ediniz.',
    sesli_fisilti: `${tasks.length} farklı ilaç dozu günün saatlerine göre planlandı.`
  };
}

export function parseLegalNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isLegalOrFinancial = 
    lower.includes('avukat') || lower.includes('hakim') || lower.includes('hâkim') || lower.includes('smmm') || lower.includes('mali müşavir') || lower.includes('mali musavir') || lower.includes('noter') ||
    lower.includes('duruşma') || lower.includes('durusma') || lower.includes('mahkeme') || lower.includes('sulh') || lower.includes('asliye') || lower.includes('ağır ceza') || lower.includes('agir ceza') ||
    lower.includes('icra') || lower.includes('haciz') || lower.includes('tebligat') || lower.includes('tebliğ') || lower.includes('teblig') ||
    lower.includes('ödeme emri') || lower.includes('odeme emri') || lower.includes('istinaf') || lower.includes('temyiz') || lower.includes('gerekçeli karar') || lower.includes('gerekceli karar') ||
    lower.includes('hüküm') || lower.includes('hukum') || lower.includes('müzekkere') || lower.includes('muzekkere') || lower.includes('bilirkişi') || lower.includes('bilirkisi') ||
    lower.includes('kdv') || lower.includes('muhsgk') || lower.includes('beyanname') || lower.includes('e-defter') || lower.includes('edefter') || lower.includes('berat') || lower.includes('sgk prim') || lower.includes('mükellef') || lower.includes('mukellef') ||
    lower.includes('ihtarname') || lower.includes('defter tasdik') || lower.includes('yevmiye') || lower.includes('uyap');

  if (!isLegalOrFinancial) return null;

  // 1. NOTER (NOTARY): İhtarname PTT Tebliği, Yevmiye Kapanış & Defter Tasdik
  if (lower.includes('noter') || lower.includes('ihtarname') || lower.includes('defter tasdik') || lower.includes('yevmiye')) {
    if (lower.includes('ihtarname')) {
      const pttDate = new Date(baseDate);
      pttDate.setDate(pttDate.getDate() + 7);
      return {
        baslik: 'Noter İhtarname & PTT Takibi',
        zaman: '7 Gün Sonra (Tebliğ Şerhi)',
        tarih_iso: pttDate.toISOString(),
        action_items: [
          { task: 'İhtarname metnini hazırla ve noter yevmiye kaydını al', is_completed: false },
          { task: 'PTT barkod takip numarası ile tebliğ akıbetini sorgula', is_completed: false },
          { task: 'Tebliğ şerhli ihtarname nüshasını dosyalayıp müvekkile/arşive ilet', is_completed: false }
        ],
        ikon: '📜',
        renk: '#F1F5F9',
        anomali_notu: 'İhtarnamelerde muhataba tebliğ tarihi hukuki temerrüt başlangıcı açısından esastır.',
        sesli_fisilti: 'Noter ihtarnamesi ve PTT tebliğ şerhi takip adımları oluşturuldu.'
      };
    }

    return {
      baslik: 'Noter Defter Tasdiki & Yevmiye',
      zaman: 'Yasal Tasdik / Gün Sonu',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Gün sonu noter yevmiye defteri dökümü ve kasa mutabakatı', is_completed: false },
        { task: 'Ticari defter açılış (Aralık) veya yevmiye kapanış (Haziran) tasdik kontrolü', is_completed: false },
        { task: 'Mühür ve imza sirküleri arşiv kaydını doğrula', is_completed: false }
      ],
      ikon: '📜',
      renk: '#F1F5F9',
      anomali_notu: 'TTK uyarınca yevmiye defteri kapanış tasdiki izleyen faaliyet döneminin altıncı ayının sonuna kadar yapılmalıdır.',
      sesli_fisilti: 'Noter defter tasdiki ve yevmiye kapama adımları planlandı.'
    };
  }

  // 2. MALİ MÜŞAVİR VE FİNANS MOTORU (CPA & FINANCIAL SUITE)
  if (lower.includes('smmm') || lower.includes('mali müşavir') || lower.includes('mali musavir') || lower.includes('beyanname') || lower.includes('kdv') || lower.includes('muhsgk') || lower.includes('e-defter') || lower.includes('edefter') || lower.includes('berat') || lower.includes('mükellef') || lower.includes('mukellef') || lower.includes('ba-bs') || lower.includes('babs') || lower.includes('geçici vergi') || lower.includes('gecici vergi') || lower.includes('fatura toplama') || lower.includes('evrak toplama')) {
    const isEvrakToplama = lower.includes('evrak toplama') || lower.includes('fatura toplama') || lower.includes('evrak iste') || lower.includes('ba-bs') || lower.includes('babs') || lower.includes('10-15') || (lower.includes('mükellef') && (lower.includes('fatura') || lower.includes('ekstre')));
    const isSgkBerat = (lower.includes('sgk') || lower.includes('berat') || lower.includes('e-defter') || lower.includes('edefter') || lower.includes('ay sonu')) && !lower.includes('kdv') && !lower.includes('muhsgk');
    const isTaxDue = !isEvrakToplama && !isSgkBerat;
    
    // 3. Tersine Evrak Toplama Rutini (Ayın 10-15'i)
    if (isEvrakToplama) {
      const targetMonth = baseDate.getDate() > 15 ? (baseDate.getMonth() + 1) % 12 : baseDate.getMonth();
      const targetYear = baseDate.getDate() > 15 && baseDate.getMonth() === 11 ? baseDate.getFullYear() + 1 : baseDate.getFullYear();
      const evrakDate = new Date(targetYear, targetMonth, 10, 9, 30, 0);

      return {
        baslik: 'Mükellef Evrak Toplama & Ba-Bs',
        zaman: 'Ayın 10-15\'i (Toplu Duyuru)',
        tarih_iso: evrakDate.toISOString(),
        action_items: [
          { task: 'Mükelleflere WhatsApp üzerinden toplu fatura ve ekstre isteme duyurusu gönder', is_completed: false },
          { task: 'Alış/satış faturaları ve POS raporlarını toplayıp sisteme aktar', is_completed: false },
          { task: 'Ba-Bs formları için 5.000 TL üzeri fatura mutabakatlarını sağla', is_completed: false },
          { task: 'Eksik evrak bildiren mükelleflere teyit hatırlatması yap', is_completed: false }
        ],
        ikon: '📊',
        renk: '#DCFCE7',
        anomali_notu: 'Mükellef fatura ve banka dökümleri ayın ilk 10-15 gününde toplanarak Luca/Zirve sistemine işlenmelidir.',
        sesli_fisilti: 'Ayın 10-15\'i için mükelleflere toplu evrak isteme duyurusu planlandı.'
      };
    }

    // 2. Ay Sonu SGK & e-Defter Berat Kilidi
    if (isSgkBerat) {
      const monthToUse = baseDate.getMonth();
      const yearToUse = baseDate.getFullYear();
      const taxDeadlines = getTaxCalendarDeadlines(yearToUse, monthToUse);
      const sgkDate = new Date(taxDeadlines.sgkDeadlineIso);
      sgkDate.setHours(23, 59, 0, 0);

      return {
        baslik: 'SGK Primleri & e-Defter Beratı',
        zaman: `Ay Sonu (${taxDeadlines.sgkDeadlineIso})`,
        tarih_iso: sgkDate.toISOString(),
        action_items: [
          { task: 'SGK prim tahakkuklarını ve ödeme dekontlarını mükelleflere ilet', is_completed: false },
          { task: 'e-Defter beratlarını GİB e-Defter portalına yükle ve zaman damgalı imzala', is_completed: false },
          { task: 'Banka ve kasa hesap mutabakatlarını kapat', is_completed: false }
        ],
        ikon: '📊',
        renk: '#DCFCE7',
        anomali_notu: 'SGK prim ödemeleri ve e-Defter berat yüklemeleri ayın son gününe kadar tamamlanmalıdır.',
        sesli_fisilti: 'Ay sonu SGK prim ve e-Defter berat yükleme görevi oluşturuldu.'
      };
    }

    // 1. Ayın 26'sı KDV & MUHSGK Kilidi
    if (isTaxDue) {
      const monthToUse = baseDate.getDate() > 26 ? (baseDate.getMonth() + 1) % 12 : baseDate.getMonth();
      const yearToUse = baseDate.getDate() > 26 && baseDate.getMonth() === 11 ? baseDate.getFullYear() + 1 : baseDate.getFullYear();
      const taxDeadlines = getTaxCalendarDeadlines(yearToUse, monthToUse);

      const taxDate = new Date(taxDeadlines.kdvDeadlineIso);
      taxDate.setHours(23, 59, 0, 0);

      const rolledNotice = taxDeadlines.isKdvRolled ? ' (Hafta sonuna denk geldiği için ilk iş gününe ötelendi)' : '';

      return {
        baslik: 'KDV & MUHSGK Beyanname Onayı',
        zaman: `Ayın ${taxDeadlines.isKdvRolled ? 'Pazartesi Günü' : '26\'sı'} (${taxDeadlines.kdvDeadlineIso})`,
        tarih_iso: taxDate.toISOString(),
        action_items: [
          { task: 'Mükelleflerin Z raporları, POS ekstreleri ve alış/satış faturalarını Luca/Zirve sistemine işle', is_completed: false },
          { task: 'KDV-1 ve KDV-2 matrah mutabakatını tamamla', is_completed: false },
          { task: 'MUHSGK prim ve muhtasar kesintilerini kontrol et, e-Beyanname onayına gönder', is_completed: false },
          { task: 'Tahakkuk fişlerini mükelleflere PDF/WhatsApp olarak ilet', is_completed: false }
        ],
        ikon: '📊',
        renk: '#DCFCE7',
        anomali_notu: `KDV ve Muhtasar Prim Hizmet Beyannameleri her ayın 26. günü saat 23:59'a kadar onaylanmalıdır.${rolledNotice}`,
        sesli_fisilti: 'KDV ve MUHSGK beyanname onay alarmı ayın 26\'sına kuruldu.'
      };
    }
  }

  // 3. HAKİM (JUDGE): Hüküm / Gerekçeli Karar (30 Gün) & Müzekkere/Bilirkişi Tekidi
  if (lower.includes('hakim') || lower.includes('hâkim') || lower.includes('gerekçeli karar') || lower.includes('gerekceli karar') || lower.includes('hüküm') || lower.includes('hukum') || lower.includes('müzekkere') || lower.includes('bilirkişi')) {
    const rawJudgeDate = new Date(baseDate);
    rawJudgeDate.setDate(rawJudgeDate.getDate() + 30);
    const { finalDate: judgeDate, isRolled } = rollToNextBusinessDay(rawJudgeDate);

    return {
      baslik: 'Gerekçeli Karar & Müzekkere Takibi',
      zaman: isRolled ? '30 Gün (Pazartesiye Ötelendi)' : '30 Gün İçinde (HMK 294)',
      tarih_iso: judgeDate.toISOString(),
      action_items: [
        { task: 'HMK 294 uyarınca 30 gün içinde gerekçeli kararı UYAP üzerinden yaz ve imzala', is_completed: false },
        { task: 'Cevap gelmeyen kurumlara müzekkere tekidi (hatırlatma) yazısı çıkar', is_completed: false },
        { task: 'Bilirkişi ek rapor veya dosya teslim süresini denetle', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#FEF3C7',
      anomali_notu: `HMK gereğince hükmün tefhiminden itibaren 30 gün içinde gerekçeli kararın yazılması yasal zorunluluktur.${isRolled ? ' (Son gün hafta sonuna denk geldiği için Pazartesiye ötelenmiştir.)' : ''}`,
      sesli_fisilti: 'Gerekçeli karar yazımı için 30 günlük yasal süre sayacı başlatıldı.'
    };
  }

  // 4. HUKUK VE ADALET MOTORU (LAW & JUSTICE SUITE): UETS 7/a Elektronik Tebligat Hesabı
  if (
    lower.includes('uets') ||
    (lower.includes('uyap') && (lower.includes('tebligat') || lower.includes('tebliğ') || lower.includes('teblig') || lower.includes('geldi') || lower.includes('karar'))) ||
    (lower.includes('tebligat') && (lower.includes('geldi') || lower.includes('elektronik') || lower.includes('uets')))
  ) {
    // Tebligat Kanunu 7/a + 14 gün yasal süre ve hafta sonu HMK md. 93 kontrolü
    const uetsResult = calculateUetsDeadline(baseDate.toISOString(), 14);
    const finalDate = new Date(uetsResult.yasalSonGun);
    finalDate.setHours(23, 59, 0, 0);

    return {
      baslik: 'UETS Elektronik Tebligat & İstinaf',
      zaman: `Son Gün: ${uetsResult.yasalSonGun} (Kalan: ${uetsResult.kalanGun} gün)`,
      tarih_iso: finalDate.toISOString(),
      action_items: [
        { task: 'Tebligat mazbatası ve ekli gerekçeli kararı UYAP\'tan indir', is_completed: false },
        { task: 'Müvekkile yasal süre ve istinaf masraf/harç bilgilendirmesi yap', is_completed: false },
        { task: 'İstinaf/İtiraz layihası taslağını hazırla ve süre tutum (tutuklu işlerde) kontrolü sağla', is_completed: false },
        { task: 'Son günden 24 saat önce e-İmza ile UYAP Avukat Portal üzerinden sisteme gönder', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#E0E7FF',
      anomali_notu: uetsResult.anomaliUyarisi,
      sesli_fisilti: 'UETS 7/a 5 günlük tebliğ süresi ve 14 günlük istinaf takvimi oluşturuldu.'
    };
  }

  // 5. DURUŞMA VE MAZERET BARİYERİ
  if (lower.includes('duruşma') || lower.includes('durusma') || lower.includes('mahkeme') || lower.includes('mazeret') || lower.includes('haciz')) {
    const isConflict = lower.includes('çakışma') || lower.includes('cakisma') || lower.includes('aynı saat') || lower.includes('ayni saat') || lower.includes('mazeret') || lower.includes('iki mahkeme');
    const courtMatch = input.match(/([a-zA-ZÇĞİÖŞÜçğıöşü0-9\.\s]+(?:Sulh|Asliye|Ağır Ceza|İş|Aile|Ticaret|İcra|Tüketici|Fikri|İdare|Vergi)\s*(?:Hukuk|Ceza|Mahkemesi|Mahkeme)?)/i);
    const esasMatch = input.match(/(\d{4}\s*\/\s*\d+)\s*(?:E\.?|esas)?/i);

    let baslik = 'Duruşma';
    if (courtMatch && esasMatch) {
      baslik = `${courtMatch[1].trim()} - ${esasMatch[1].replace(/\s+/g, '')} E.`;
    } else if (courtMatch) {
      baslik = `${courtMatch[1].trim()} Duruşması`;
    } else if (esasMatch) {
      baslik = `Duruşma - ${esasMatch[1].replace(/\s+/g, '')} E.`;
    } else {
      const shortClean = input.replace(/duruşması|durusmasi|duruşma|durusma|var|hatırlat|mazeret|haciz/gi, '').trim();
      baslik = shortClean ? `${shortClean.slice(0, 20)} Duruşması` : 'Mahkeme Duruşması';
    }

    const words = baslik.split(/\s+/);
    if (words.length > 5) {
      baslik = words.slice(0, 5).join(' ');
    }

    return {
      baslik,
      zaman: 'Duruşma Günü (45 Dk Önce Alarm)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Duruşmadan 45 dk önce adliyede hazır bulun ve cübbe/dosya kontrolü yap', is_completed: false },
        { task: 'Çakışan duruşma riski varsa UYAP üzerinden mazeret dilekçesi sun', is_completed: false },
        { task: 'Yetki belgesi, vekaletname harcı ve duruşma tutanağı tanzimi', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#E0E7FF',
      anomali_notu: isConflict
        ? '⚠️ Duruşma Çakışması! Diğer mahkemeye UYAP üzerinden mazeret dilekçesi gönderilmelidir.'
        : 'Duruşma saatinden en az 45 dakika önce adliyede hazır bulunulmalı, çakışma durumunda UYAP üzerinden mazeret dilekçesi sunulmalıdır.',
      sesli_fisilti: 'Duruşma için 45 dakika öncesine adliye intikal alarmı ve mazeret kontrolü kuruldu.'
    };
  }

  // İcra / Ödeme Emri (7 Günlük İtiraz Süresi)
  if (lower.includes('icra emri') || lower.includes('ödeme emri') || lower.includes('odeme emri') || (lower.includes('icra') && (lower.includes('itiraz') || lower.includes('süre') || lower.includes('geldi')))) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 7);

    return {
      baslik: 'İcra İtiraz Süresi',
      zaman: '7 Gün Sonra (Kesin Süre)',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'İcra takip dosyası ve borç sebebi incelemesi', is_completed: false },
        { task: 'Yetki, borç veya imzaya itiraz dilekçesi hazırlığı', is_completed: false },
        { task: 'İcra müdürlüğüne UYAP üzerinden itiraz gönderimi', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#E0E7FF',
      anomali_notu: 'İİK gereği ödeme emrine itiraz süresi tebliğden itibaren 7 gündür. Hak düşürücü süredir.',
      sesli_fisilti: '7 günlük icra itiraz süresi alarmı kuruldu.'
    };
  }

  // İstinaf / Temyiz (2 Hafta / 14 Gün Kesin Süre)
  if (lower.includes('istinaf') || lower.includes('temyiz')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 14);

    return {
      baslik: lower.includes('temyiz') ? 'Temyiz Başvuru Süresi' : 'İstinaf Başvuru Süresi',
      zaman: '14 Gün Sonra (2 Hafta)',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Gerekçeli kararın tebliği/tefhimi kontrolü', is_completed: false },
        { task: 'İstinaf/Temyiz gerekçeli başvuru dilekçesi yazımı', is_completed: false },
        { task: 'İstinaf harç ve gider avansı yatırma kontrolü', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#E0E7FF',
      anomali_notu: 'HMK/CMK gereği istinaf ve temyiz süresi tebliğden itibaren 2 haftadır (14 gün).',
      sesli_fisilti: '2 haftalık yasal istinaf/temyiz süresi planlandı.'
    };
  }

  // Genel Tebligat (14 Günlük Yasal Süre)
  if (lower.includes('tebligat') || lower.includes('tebliğ') || lower.includes('teblig')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 14);

    return {
      baslik: 'Tebligat Cevap Süresi',
      zaman: '14 Gün Sonra',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Tebliğ mazbatası ve tebliğ tarihi teyidi', is_completed: false },
        { task: 'Dava/Cevap dilekçesi ve delil listesi hazırlığı', is_completed: false },
        { task: 'UYAP üzerinden cevap dilekçesi sunumu', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#E0E7FF',
      anomali_notu: 'HMK genel hükümlerine göre dava dilekçesine cevap süresi tebliğden itibaren 2 haftadır.',
      sesli_fisilti: '14 günlük yasal cevap ve itiraz süresi takvime işlendi.'
    };
  }

  return null;
}

export function parseEduManagerNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isEdu = 
    lower.includes('sınav') || lower.includes('sinav') || lower.includes('e-okul') || lower.includes('eokul') ||
    lower.includes('not giriş') || lower.includes('not giris') || lower.includes('nöbet') || lower.includes('nobet') ||
    lower.includes('gözetmenlik') || lower.includes('gozetmenlik') || lower.includes('makale') || lower.includes('hakemlik') ||
    lower.includes('peer-review') || lower.includes('peer review') || lower.includes('tübitak') || lower.includes('tubitak') ||
    lower.includes('bap') || lower.includes('tez jürisi') || lower.includes('tez jurisi') || lower.includes('araştırma görevlisi') ||
    lower.includes('dys') || lower.includes('üst yazı') || lower.includes('ust yazi') || lower.includes('cimer') || lower.includes('ilçe mem') || lower.includes('ilce mem') ||
    lower.includes('zümre') || lower.includes('zumre') || lower.includes('öğretmenler kurul') || lower.includes('ogretmenler kurul') ||
    lower.includes('kulüp') || lower.includes('kulup') || lower.includes('ek ders') || lower.includes('kbs') ||
    lower.includes('puantaj') || lower.includes('dyk') ||
    lower.includes('okul müdür') || lower.includes('okul mudur') || lower.includes('müdür yardımcısı') || lower.includes('mudur yardimcisi') ||
    lower.includes('taşımalı') || lower.includes('tasimali') || lower.includes('yemek numune') || lower.includes('servis denetim') ||
    lower.includes('devamsızlık mektubu') || lower.includes('devamsizlik') || lower.includes('disiplin kurulu') || lower.includes('disiplin') ||
    lower.includes('tahliye tatbikatı') || lower.includes('yangın tatbikatı') || lower.includes('ziyaretçi defteri') || lower.includes('isg');

  if (!isEdu) return null;

  // 1. OKUL YÖNETİMİ: KBS & Ek Ders Onay Takvimi (Ayın 20-27'si Arası)
  if (lower.includes('ek ders') || lower.includes('kbs') || lower.includes('puantaj') || lower.includes('dyk')) {
    const kbsDue = new Date(baseDate);
    // Ayın 20-27'si arasına kur
    kbsDue.setDate(24);
    kbsDue.setHours(17, 0, 0, 0);

    return {
      baslik: 'KBS Ek Ders & Puantaj Onayı',
      zaman: 'Her Ayın 20-27 Arası (KBS Onay)',
      tarih_iso: kbsDue.toISOString(),
      action_items: [
        { task: 'Sevkli, izinli ve raporlu öğretmenlerin gün bazlı ek ders kesintilerini işle', is_completed: false },
        { task: 'DYK (Destekleme Yetiştirme Kursu) ve haftalık nöbet puantajlarını doğrula', is_completed: false },
        { task: 'KBS sistemi üzerinden veri girişini yap ve Malmüdürlüğü/Muhasebe onayına sun', is_completed: false }
      ],
      ikon: '📋',
      renk: '#FEF3C7',
      anomali_notu: 'KBS ek ders onayları her ayın 20-27\'si arasında tamamlanmalıdır; raporlu günlerin düşülmemesi kamu zararı oluşturur.',
      sesli_fisilti: 'KBS ek ders onay takvimi, DYK/nöbet puantajı ve rapor kesinti adımları planlandı.'
    };
  }

  // 2. OKUL YÖNETİMİ: Nöbet, Servis ve Taşımalı Yemek (72 Saat Numune)
  if (lower.includes('taşımalı') || lower.includes('tasimali') || lower.includes('yemek numune') || lower.includes('servis denetim') || (lower.includes('nöbet') && (lower.includes('servis') || lower.includes('boş ders') || lower.includes('bos ders') || lower.includes('idare') || lower.includes('müdür')))) {
    return {
      baslik: 'Taşımalı Yemek, Servis & Nöbet Denetimi',
      zaman: 'Günlük Denetim / 72 Saat Numune',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Taşımalı eğitim öğle yemeğinden steril kavanozla numune al ve +4°C dolapta 72 saat sakla', is_completed: false },
        { task: 'Okul servis araçlarının emniyet kemeri, rehber personel ve kapasite denetim föyünü doldur', is_completed: false },
        { task: 'Raporlu/sevkli öğretmenlerin boş geçen derslerine nöbetçi öğretmen görevlendirmesi yap', is_completed: false }
      ],
      ikon: '🍱',
      renk: '#DCFCE7',
      anomali_notu: 'Taşımalı yemek numuneleri mevzuat gereği etiketlenerek +4°C ortamda 72 saat saklanmalıdır; servis denetimleri haftalık kayıt altına alınır.',
      sesli_fisilti: '72 saatlik yemek numunesi saklama, servis denetimi ve boş ders nöbetçi görevlendirmesi kuruldu.'
    };
  }

  // 3. OKUL YÖNETİMİ: e-Okul, Devamsızlık Mektubu & Disiplin Takvimi
  if (lower.includes('devamsızlık') || lower.includes('devamsizlik') || lower.includes('disiplin') || (lower.includes('öğrenci') && lower.includes('savunma'))) {
    const isDiscipline = lower.includes('disiplin') || lower.includes('savunma');
    const isAbsent = lower.includes('devamsızlık') || lower.includes('devamsizlik');

    if (isDiscipline) {
      const savunmaDue = new Date(baseDate);
      savunmaDue.setDate(savunmaDue.getDate() + 3); // 3 günlük yasal savunma süresi

      return {
        baslik: 'Öğrenci Disiplin Kurulu Süreci',
        zaman: 'Yasal Süre: 3 Gün (Savunma)',
        tarih_iso: savunmaDue.toISOString(),
        action_items: [
          { task: 'Nöbetçi öğretmen ve olaya karışanların ıslak imzalı olay tutanağını dosyala', is_completed: false },
          { task: 'Öğrenciye yazılı savunma tebligatı yap (3 iş günü yasal savunma süresi başlat)', is_completed: false },
          { task: 'Okul Öğrenci Ödül ve Disiplin Kurulunu toplayıp karar tutanağını e-Okul\'a işle', is_completed: false }
        ],
        ikon: '🏫',
        renk: '#FEE2E2',
        anomali_notu: 'Disiplin süreçlerinde öğrenciye en az 3 iş günü savunma süresi tanınmadan ceza kurulunda karar alınamaz.',
        sesli_fisilti: 'Disiplin süreci için nöbetçi tutanağı, 3 günlük savunma süresi ve kurul takvimi açıldı.'
      };
    }

    return {
      baslik: 'e-Okul Devamsızlık Mektubu Tebliği',
      zaman: 'Özürsüz 5 / 10 Gün Eşiği',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'e-Okul sisteminden özürsüz 5 ve 10 gün devamsızlık sınırına ulaşan öğrencileri listele', is_completed: false },
        { task: 'Resmi devamsızlık bildirim mektubu ve iadeli taahhütlü posta/elden tebliğ zarfını hazırla', is_completed: false },
        { task: 'Veli bilgilendirme ve tebellüğ belgesini öğrenci özlük dosyasına tak', is_completed: false }
      ],
      ikon: '🏫',
      renk: '#FEE2E2',
      anomali_notu: 'Özürsüz 5, 10 ve 15 gün devamsızlık yapan öğrencilerin velilerine iadeli taahhütlü bildirim yapılması yasal zorunluluktur.',
      sesli_fisilti: 'e-Okul devamsızlık mektubu ve veli tebliğ adımları oluşturuldu.'
    };
  }

  // 4. OKUL YÖNETİMİ: İSG, Yangın/Tahliye Tatbikatı & Okul Güvenliği
  if (lower.includes('tatbikat') || lower.includes('isg') || lower.includes('ziyaretçi defteri') || lower.includes('ziyaretci') || (lower.includes('güvenlik') && lower.includes('okul'))) {
    return {
      baslik: 'Okul İSG & Güvenlik Denetimi',
      zaman: 'Dönemlik / Periyodik İSG',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Dönemlik yangın ve acil durum tahliye tatbikatı planla, süre kronometresi ve tatbikat tutanağı tanzim et', is_completed: false },
        { task: 'Okul ana giriş kapısı ziyaretçi kayıt defteri ve kimlik teslim protokolünü denetle', is_completed: false },
        { task: 'Yangın tüpleri manometre basınçları ve periyodik dolum etiket tarihlerini kontrol et', is_completed: false }
      ],
      ikon: '🛡️',
      renk: '#F1F5F9',
      anomali_notu: 'MEB İSG mevzuatı gereği her eğitim-öğretim döneminde en az 1 kez acil durum tahliye tatbikatı yapılması ve tutanak altına alınması mecburidir.',
      sesli_fisilti: 'Dönemlik tahliye tatbikatı, ziyaretçi defteri ve yangın tüpü İSG takip listesi oluşturuldu.'
    };
  }

  // 5. OKUL YÖNETİMİ: DYS, CİMER & Resmi Yazışmalar (5 İş Günü)
  if (lower.includes('dys') || lower.includes('üst yazı') || lower.includes('ust yazi') || lower.includes('cimer') || lower.includes('ilçe mem') || lower.includes('ilce mem')) {
    const due = new Date(baseDate);
    let addedDays = 0;
    while (addedDays < 5) {
      due.setDate(due.getDate() + 1);
      if (due.getDay() !== 0 && due.getDay() !== 6) {
        addedDays++;
      }
    }
    due.setHours(17, 0, 0, 0);

    return {
      baslik: 'DYS & CİMER Resmi Yazışma',
      zaman: '5 İş Günü İçinde (Yasal Cevap)',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'DYS gelen kutusundan \'günlü/ivedi\' yazıları ve CİMER bilgi taleplerini incele', is_completed: false },
        { task: 'İlgili müdür yardımcısı veya zümreden bilgi toplayarak cevap taslağı hazırla', is_completed: false },
        { task: 'Okul Müdürü e-imza onayına sunarak DYS üzerinden İlçe MEM\'e sevk et', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#E0E7FF',
      anomali_notu: 'Günlü ve ivedi DYS/CİMER yazışmalarında son cevap tarihi aşılmamalıdır; süre uzatımı gerekiyorsa ara yazı yazılmalıdır.',
      sesli_fisilti: 'DYS ve CİMER resmi yazı takibi için 5 iş günü yasal geri sayımı başlatıldı.'
    };
  }

  // 1. AKADEMİSYEN & ARAŞTIRMA GÖREVLİSİ: Gözetmenlik
  if (lower.includes('gözetmenlik') || lower.includes('gozetmenlik')) {
    const timeMatch = input.match(/(\d{1,2})[:.](\d{2})/);
    let gozetmenZaman = 'Sınavdan 25 Dk Önce (Salon & Evrak)';
    let gozetmenIso = baseDate.toISOString();

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const examDate = new Date(baseDate);
      examDate.setHours(h, m - 25, 0, 0);
      const gh = examDate.getHours().toString().padStart(2, '0');
      const gm = examDate.getMinutes().toString().padStart(2, '0');
      gozetmenZaman = `${gh}:${gm} (25 Dk Önce Hazırlık)`;
      gozetmenIso = examDate.toISOString();
    }

    return {
      baslik: 'Sınav Gözetmenliği Hazırlığı',
      zaman: gozetmenZaman,
      tarih_iso: gozetmenIso,
      action_items: [
        { task: 'Öğrenci işleri / Bölüm sekreterliğinden sınav evrakı ve yoklama listesini teslim al', is_completed: false },
        { task: 'Sınav salonu oturma düzeni ve tahta sınav kuralları hazırlığı', is_completed: false },
        { task: 'Kimlik kontrolü, imza sirküsü ve sınav tutanağı tanzimi', is_completed: false }
      ],
      ikon: '🎓',
      renk: '#DDD6FE',
      anomali_notu: 'Sınav evraklarının sınav başlangıcından en az 25 dakika önce teslim alınıp salonda hazır bulunulması zorunludur.',
      sesli_fisilti: 'Gözetmenlik için sınav saatinden 25 dakika öncesine evrak teslim ve salon hazırlık alarmı kuruldu.'
    };
  }

  // 2. AKADEMİSYEN & ARAŞTIRMA GÖREVLİSİ: Makale Revizyonu, Hakemlik & Proje (TÜBİTAK/BAP)
  if (lower.includes('makale') || lower.includes('hakemlik') || lower.includes('peer-review') || lower.includes('peer review') || lower.includes('tübitak') || lower.includes('tubitak') || lower.includes('bap') || lower.includes('tez jürisi') || lower.includes('tez jurisi')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 14); // 2 hafta teslim
    due.setHours(23, 59, 0, 0);

    const isPaper = lower.includes('makale') || lower.includes('hakemlik') || lower.includes('peer');
    
    if (isPaper) {
      return {
        baslik: 'Makale Revizyonu & Hakemlik',
        zaman: 'Yasal Teslim Tarihi',
        tarih_iso: due.toISOString(),
        action_items: [
          { task: 'Editör ve hakem eleştirilerinin (Comments) maddelendirilmesi', is_completed: false },
          { task: 'Metin içi revizyonların Track Changes / Kırmızı ile işaretlenmesi', is_completed: false },
          { task: 'Response to Reviewers mektubunun detaylı olarak hazırlanması', is_completed: false },
          { task: 'Dergi yönetim sistemine (ScholarOne/Editorial Manager) revizyon yükleme', is_completed: false }
        ],
        ikon: '🔬',
        renk: '#DDD6FE',
        anomali_notu: 'Hakem değerlendirmelerinde Response to Reviewers mektubunda her eleştiriye sayfa ve satır numarasıyla yanıt verilmelidir.',
        sesli_fisilti: 'Makale revizyon adımları ve Response to Reviewers mektup hazırlığı takvimlendi.'
      };
    }

    return {
      baslik: 'Proje & Tez Jürisi Yönetimi',
      zaman: 'Gelişme/Kapanış Raporu',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Dönem içi BAP / TÜBİTAK gelişme raporu ve harcama belgeleri tasnifi', is_completed: false },
        { task: 'Tez savunma sınavı jüri tutanağı ve tez teslim onayı', is_completed: false },
        { task: 'Enstitü / Proje Yönetim Ofisi sistemine evrak yükleme ve kapanış', is_completed: false }
      ],
      ikon: '🎓',
      renk: '#E0E7FF',
      anomali_notu: 'Proje gelişme raporları ve fatura onayları yasal proje takvimine göre zamanında enstitüye teslim edilmelidir.',
      sesli_fisilti: 'Proje gelişme raporu ve enstitü evrak kontrol adımları oluşturuldu.'
    };
  }

  // 3. K-12 ÖĞRETMEN: e-Okul ve Sınav Takvimi (10 Günlük Sayaç)
  if (lower.includes('sınav yap') || lower.includes('sinav yap') || lower.includes('sınavı yaptık') || lower.includes('sınav bitti') || lower.includes('sinav bitti') || lower.includes('e-okul') || lower.includes('eokul') || lower.includes('not giriş') || lower.includes('yazılı yap')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 10);
    due.setHours(17, 0, 0, 0);

    return {
      baslik: 'e-Okul Not Girişi & Kazanım Analizi',
      zaman: 'Son 10 Gün (Not Kilitleme)',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Yazılı kağıtlarını puanlama baremine göre oku ve cevap anahtarını panoya as', is_completed: false },
        { task: 'e-Okul sistemine notları ve kazanım analizlerini gir', is_completed: false },
        { task: 'Sınav analiz formu çıktısını alıp zümre başkanına teslim et', is_completed: false }
      ],
      ikon: '📚',
      renk: '#FEF08A',
      anomali_notu: 'MEB mevzuatı gereği sınav sonuçları ve kazanım analizleri sınav tarihinden itibaren 10 gün içinde e-Okul sistemine girilmelidir.',
      sesli_fisilti: 'Sınav not girişi için 10 günlük e-Okul takvimi ve kazanım analiz adımları oluşturuldu.'
    };
  }

  // 4. K-12 ÖĞRETMEN: Nöbet ve Alan Denetimi (30 Dk Önce)
  if (lower.includes('nöbet') || lower.includes('nobet')) {
    const timeMatch = input.match(/(\d{1,2})[:.](\d{2})/);
    let nobetZaman = 'İlk Ders Öncesi (30 Dk Önce)';
    let nobetIso = `${baseDate.toISOString().split('T')[0]}T08:00:00`;

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const nobetDate = new Date(baseDate);
      nobetDate.setHours(h, m - 30, 0, 0); // 30 dakika öncesi
      const nh = nobetDate.getHours().toString().padStart(2, '0');
      const nm = nobetDate.getMinutes().toString().padStart(2, '0');
      nobetZaman = `${nh}:${nm} (30 Dk Önce)`;
      nobetIso = nobetDate.toISOString();
    }

    return {
      baslik: 'Okul Nöbet Görevi',
      zaman: nobetZaman,
      tarih_iso: nobetIso,
      action_items: [
        { task: 'Nöbet defteri imzalama ve kat/bahçe emniyeti kontrolü', is_completed: false },
        { task: 'Bahçe ve koridor güvenlik taraması ile boş geçen dersleri idareye bildirme', is_completed: false },
        { task: 'Teneffüs giriş-çıkış denetimi ve kat emniyetini sağlama', is_completed: false }
      ],
      ikon: '📚',
      renk: '#FEF08A',
      anomali_notu: 'Nöbet görevi ilk ders başlamadan en az 30 dakika önce başlar ve teneffüslerde kesintisiz sürer.',
      sesli_fisilti: 'Sabah ilk dersten 30 dakika önceye nöbet defteri imzalama ve kat emniyeti uyarısı atandı.'
    };
  }

  // 5. DYS ve Resmi Yazışmalar
  if (lower.includes('dys') || lower.includes('üst yazı') || lower.includes('ust yazi')) {
    const due = new Date(baseDate);
    let addedDays = 0;
    while (addedDays < 5) {
      due.setDate(due.getDate() + 1);
      if (due.getDay() !== 0 && due.getDay() !== 6) {
        addedDays++;
      }
    }
    due.setHours(17, 0, 0, 0);

    return {
      baslik: 'DYS Süreli Resmi Yazı',
      zaman: '5 İş Günü İçinde',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'DYS üst yazı eklerini ve varsa süresini incele', is_completed: false },
        { task: 'İlgili birim/zümre görüşü ve cevap taslağı hazırla', is_completed: false },
        { task: 'DYS üzerinden e-imza ile onaya sun/gönder', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#E0F2FE',
      anomali_notu: 'DYS resmi yazışmalarında aksi belirtilmedikçe standart cevap süresi 5 iş günüdür.',
      sesli_fisilti: 'DYS resmi yazı takibi 5 iş günü yasal süresiyle ajandaya kaydedildi.'
    };
  }

  // 6. Ay Sonu Ek Ders (Yönetim & İdare)
  if (lower.includes('ek ders') || lower.includes('kbs') || lower.includes('puantaj')) {
    return {
      baslik: 'Ay Sonu Ek Ders Puantajı',
      zaman: 'Ay Sonu KBS Onayı',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'İzinli/raporlu personel puantaj düşümü', is_completed: false },
        { task: 'Nöbet/DYK ekleme', is_completed: false },
        { task: 'KBS veri girişi ve onay', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#E0F2FE',
      anomali_notu: 'Maaş ve ek ders tahakkuklarının KBS üzerinden her ayın son haftasında onaylanması zorunludur.',
      sesli_fisilti: 'Ay sonu ek ders, nöbet/DYK ve KBS onay adımları listelendi.'
    };
  }

  // 7. Kurul / Zümre / Kulüp
  if (lower.includes('zümre') || lower.includes('zumre') || lower.includes('kurul') || lower.includes('kulüp') || lower.includes('kulup')) {
    let baslik = 'Zümre / Kurul Toplantısı';
    if (lower.includes('zümre') || lower.includes('zumre')) baslik = 'Zümre Öğretmenler Kurulu';
    else if (lower.includes('kulüp') || lower.includes('kulup')) baslik = 'Sosyal Kulüp Faaliyeti';

    return {
      baslik,
      zaman: 'Toplantı Günü',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Gündem maddeleri ve önceki dönem kararları çıktısı', is_completed: false },
        { task: 'Aylık faaliyet tutanağı', is_completed: false },
        { task: 'İdare onaylı karar özeti', is_completed: false }
      ],
      ikon: '📚',
      renk: '#FEF08A',
      anomali_notu: 'Toplantı tutanaklarının toplantı bitimini takiben 3 gün içinde idareye teslimi gereklidir.',
      sesli_fisilti: 'Kurul ve zümre evrak hazırlık adımları planlandı.'
    };
  }

  return null;
}

export function parseOperationSafetyEmergencyNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isOperationSafety = 
    lower.includes('polis') || lower.includes('emniyet') || lower.includes('gözaltı') || lower.includes('gozalti') ||
    lower.includes('nezaret') || lower.includes('yakaladık') || lower.includes('yakaladik') || lower.includes('yakalama') ||
    lower.includes('şüpheli') || lower.includes('supheli') || lower.includes('adli muayene') || lower.includes('fezleke') ||
    lower.includes('adli emanet') || lower.includes('itfaiye') || lower.includes('itfaiyeci') || lower.includes('yangın') || lower.includes('yangin') ||
    lower.includes('scba') || lower.includes('solunum tüp') || lower.includes('arazöz') || lower.includes('arazoz') ||
    lower.includes('hidrolik kesici') || lower.includes('baca denetim') || lower.includes('yangın uygunluk') || lower.includes('yangin uygunluk') ||
    lower.includes('aşçı') || lower.includes('asci') || lower.includes('şef') || lower.includes('mutfak') || lower.includes('mise en place') ||
    lower.includes('haccp') || lower.includes('fifo') || lower.includes('tadım brifing') || lower.includes('tadim') ||
    lower.includes('pilot') || lower.includes('uçuş') || lower.includes('ucus') || lower.includes('kokpit') || lower.includes('dispatch') ||
    lower.includes('ofp') || lower.includes('metar') || lower.includes('taf') || lower.includes('walkaround') ||
    lower.includes('fdp') || lower.includes('dinlenme süresi') || lower.includes('class 1') || lower.includes('simülatör') || lower.includes('lpc');

  if (!isOperationSafety) return null;

  // 1. POLİS (LAW ENFORCEMENT)
  if (lower.includes('polis') || lower.includes('gözaltı') || lower.includes('gozalti') || lower.includes('nezaret') || lower.includes('yakalama') || lower.includes('yakaladık') || lower.includes('yakaladik') || lower.includes('şüpheli') || lower.includes('fezleke') || lower.includes('adli emanet')) {
    const isGroup = lower.includes('toplu') || lower.includes('örgüt') || lower.includes('orgut');
    const hours = isGroup ? 48 : 24;
    const due = new Date(baseDate);
    due.setHours(due.getHours() + hours);

    return {
      baslik: isGroup ? 'Toplu Suç Gözaltı (48s)' : 'Gözaltı & Savcılık Sevk (24s)',
      zaman: `Yasal Süre: ${hours} Saat`,
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Giriş adli muayene raporunun alınması', is_completed: false },
        { task: 'Şüpheli hakları formu imzalatılması ve adli emanet teslim tutanağı', is_completed: false },
        { task: 'Süre bitimine 6 saat kala savcılık fezlekesinin tamamlanması', is_completed: false },
        { task: 'Savcılık sevk öncesi çıkış doktor raporunun alınması', is_completed: false }
      ],
      ikon: '👮',
      renk: '#BFDBFE',
      anomali_notu: 'CMK 91 gereği bireysel suçlarda gözaltı 24 saati geçemez. Süre bitimine en geç 6 saat kala fezleke savcılığa sunulmalıdır.',
      sesli_fisilti: `${hours} saatlik yasal gözaltı süreci ve 6 saat kala savcılık fezleke alarmı kuruldu.`
    };
  }

  // 2. İTFAİYECİ (FIRE & RESCUE)
  if (lower.includes('itfaiye') || lower.includes('yangın') || lower.includes('yangin') || lower.includes('scba') || lower.includes('arazöz') || lower.includes('baca denetim')) {
    if (lower.includes('denetim') || lower.includes('uygunluk') || lower.includes('ruhsat') || lower.includes('baca')) {
      const inspectDate = new Date(baseDate);
      inspectDate.setDate(inspectDate.getDate() + 3);

      return {
        baslik: 'Yangın Uygunluk & Baca Denetimi',
        zaman: '3 Gün İçinde (Raporlama)',
        tarih_iso: inspectDate.toISOString(),
        action_items: [
          { task: 'İşyeri yangın algılama, sprinkler ve acil çıkış yönlendirmelerini denetle', is_completed: false },
          { task: 'Endüstriyel mutfak/baca yağ tutucu ve tahliye kanallarını kontrol et', is_completed: false },
          { task: 'İtfaiye yangın güvenlik ve uygunluk raporunu tanzim edip sisteme yükle', is_completed: false }
        ],
        ikon: '🚒',
        renk: '#FECACA',
        anomali_notu: 'Binaların Yangından Korunması Hakkında Yönetmelik gereği eksiklikler tespit edilirse 15 günlük süre verilir.',
        sesli_fisilti: 'Yangın uygunluk denetimi ve yasal raporlama adımları planlandı.'
      };
    }

    return {
      baslik: 'İtfaiye Nöbet & Ekipman Devri',
      zaman: 'Nöbet Başlangıcı / Devir',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'SCBA temiz hava solunum tüplerinin 300 Bar basınç ve maske sızdırmazlık kontrolü', is_completed: false },
        { task: 'Arazöz su ve köpük tank seviyeleri ile pompa testlerinin yapılması', is_completed: false },
        { task: 'Hidrolik ayırıcı/kesici batarya şarj ve hidrolik yağ basınç kontrolü', is_completed: false }
      ],
      ikon: '🚒',
      renk: '#FECACA',
      anomali_notu: 'Solunum tüplerinde 270 Bar altındaki tüpler derhal kompresör odasında doldurulmalıdır.',
      sesli_fisilti: 'SCBA 300 Bar ve arazöz su-köpük kontrolleri 1. sıraya alınarak devir listesi oluşturuldu.'
    };
  }

  // 3. AŞÇI (CULINARY & KITCHEN)
  if (lower.includes('aşçı') || lower.includes('asci') || lower.includes('şef') || lower.includes('mutfak') || lower.includes('mise en place') || lower.includes('haccp') || lower.includes('fifo') || lower.includes('servis')) {
    const timeMatch = input.match(/(\d{1,2})[:.](\d{2})/);
    let prepZaman = 'Servisten 3 Saat Önce (Mise en place)';
    let prepIso = baseDate.toISOString();

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const prepDate = new Date(baseDate);
      prepDate.setHours(h - 3, m, 0, 0);
      const ph = prepDate.getHours().toString().padStart(2, '0');
      const pm = prepDate.getMinutes().toString().padStart(2, '0');
      prepZaman = `${ph}:${pm} (Mise en Place Bitişi)`;
      prepIso = prepDate.toISOString();
    }

    return {
      baslik: 'Mutfak Hazırlık & Servis Brifingi',
      zaman: prepZaman,
      tarih_iso: prepIso,
      action_items: [
        { task: 'Servisten 3-4 saat önce tüm istasyonların Mise en place hazırlığını tamamla', is_completed: false },
        { task: 'HACCP standartlarında soğuk oda (+4°C) ve derin dondurucu (-18°C) ısı çizelgesini kaydet', is_completed: false },
        { task: 'FIFO rotasyonuna göre et, süt ve taze yeşillik skt/etiket kontrolü yap', is_completed: false },
        { task: 'Servise 45 dakika kala servis tadım ve menü brifingini gerçekleştir', is_completed: false }
      ],
      ikon: '👨‍🍳',
      renk: '#FED7AA',
      anomali_notu: 'Çapraz bulaşmayı önlemek için kırmızı et ve çiğ sebze doğrama tahtaları kesinlikle ayrılmalıdır.',
      sesli_fisilti: 'Mise en place hazırlığı ve servise 45 dakika kala tadım brifingi takvimlendi.'
    };
  }

  // 4. PİLOT (AVIATION)
  if (lower.includes('pilot') || lower.includes('uçuş') || lower.includes('ucus') || lower.includes('kokpit') || lower.includes('dispatch') || lower.includes('ofp') || lower.includes('walkaround') || lower.includes('metar') || lower.includes('taf')) {
    const timeMatch = input.match(/(\d{1,2})[:.](\d{2})/);
    let dispatchZaman = 'Uçuştan 90 Dk Önce (Dispatch & OFP)';
    let dispatchIso = baseDate.toISOString();

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const dispDate = new Date(baseDate);
      dispDate.setHours(h, m - 90, 0, 0);
      const dh = dispDate.getHours().toString().padStart(2, '0');
      const dm = dispDate.getMinutes().toString().padStart(2, '0');
      dispatchZaman = `${dh}:${dm} (90 Dk Önce Dispatch)`;
      dispatchIso = dispDate.toISOString();
    }

    return {
      baslik: 'Uçuş Öncesi Dispatch & Kokpit',
      zaman: dispatchZaman,
      tarih_iso: dispatchIso,
      action_items: [
        { task: 'Uçuştan önceki 12 saatlik FDP dinlenme süresi ve Class 1 medikal geçerlilik teyidi', is_completed: false },
        { task: 'Uçuşa 90 dk kala OFP (Operasyonel Uçuş Planı), NOTAM ve METAR/TAF analizi', is_completed: false },
        { task: 'Uçuşa 45 dk kala uçak başı harici kontrol (walkaround) ve yakıt mutabakatı', is_completed: false },
        { task: 'FMC/CDU rota veri girişi ve kalkış brifingi', is_completed: false }
      ],
      ikon: '✈️',
      renk: '#E0E7FF',
      anomali_notu: 'FDP dinlenme kuralı ihlal edilemez. NOTAM ve rüzgar güncellemeleri kalkış öncesi kontrol edilmelidir.',
      sesli_fisilti: 'Uçuştan 90 dakika öncesine dispatch analizi ve 45 dakika öncesine walkaround alarmı kuruldu.'
    };
  }

  return null;
}

export function parseHealthcareClinicalNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isClinical = 
    lower.includes('doktor') || lower.includes('hekim') || lower.includes('konsültasyon') || lower.includes('konsultasyon') ||
    lower.includes('epikriz') || lower.includes('taburcu') || lower.includes('taburculuk') ||
    lower.includes('hemşire') || lower.includes('hemsire') || lower.includes('dekübitus') || lower.includes('dekubitus') ||
    lower.includes('pozisyon değişim') || lower.includes('pozisyon degisim') || lower.includes('sbar') || lower.includes('order') || lower.includes('hbys') ||
    lower.includes('5 doğru') || lower.includes('5 dogru') ||
    lower.includes('eczacı') || lower.includes('eczaci') || lower.includes('eczane') || lower.includes('soğuk zincir') || lower.includes('soguk zincir') ||
    lower.includes('its') || lower.includes('karekod bildirim') || lower.includes('medula') || lower.includes('miad') ||
    lower.includes('diş hekimi') || lower.includes('dis hekimi') || lower.includes('implant') || lower.includes('protez') ||
    lower.includes('dikiş alma') || lower.includes('dikis alma') || lower.includes('otoklav') || lower.includes('sterilizasyon') || lower.includes('biyolojik spor') ||
    lower.includes('pre-op') || lower.includes('preop') || lower.includes('post-op') || lower.includes('postop') || lower.includes('npo') || lower.includes('açlık başlat') ||
    lower.includes('troponin') || lower.includes('kan gazı') || lower.includes('kan gazi') || lower.includes('cross-match') ||
    lower.includes('narkotik') || lower.includes('kırmızı reçete') || lower.includes('kirmizi recete') ||
    lower.includes('yeşil reçete') || lower.includes('yesil recete') || lower.includes('nöbet devir') ||
    lower.includes('nobet devir') || lower.includes('hasta devri') || lower.includes('adli vaka') || lower.includes('adli rapor') ||
    lower.includes('mayi') || lower.includes('damar yolu') || lower.includes('pansuman') || lower.includes('servis nöbet') ||
    lower.includes('cerrahi vaka') || lower.includes('ameliyathane') || (lower.includes('ameliyat') && (lower.includes('hazır') || lower.includes('onam') || lower.includes('premedikasyon') || lower.includes('plan')));

  if (!isClinical) return null;

  // 1. DOKTOR (DOCTOR): Acil Konsültasyon (30 Dk SLA), Ameliyat/Pre-Op (T-8 Saat NPO, Cross-match, Onam), Taburculuk (e-Reçete, Epikriz, 10 Gün Sonra Kontrol)
  if (lower.includes('acil konsültasyon') || lower.includes('acil konsultasyon') || lower.includes('stat kons') || lower.includes('konsültasyon istendi') || lower.includes('konsultasyon istendi')) {
    const consultTime = new Date(baseDate);
    consultTime.setMinutes(consultTime.getMinutes() + 30);

    return {
      baslik: 'Acil Konsültasyon (30 Dk SLA)',
      zaman: '30 Dk İçinde (Kritik SLA)',
      tarih_iso: consultTime.toISOString(),
      action_items: [
        { task: '30 dakika içinde hastayı bizzat değerlendir ve konsültasyon notunu HBYS\'ye işle', is_completed: false },
        { task: 'İsteyen birim hekimi ile sözlü iletişim kur ve tedavi revizyonunu planla', is_completed: false },
        { task: 'Gerekli ek tetkik ve acil görüntüleme istemlerini onayla', is_completed: false }
      ],
      ikon: '🩺',
      renk: '#E0F2FE',
      anomali_notu: 'Acil konsültasyonlar Sağlık Bakanlığı Kalite Standartları gereğince 30 dakika içinde yanıtlanmalıdır.',
      sesli_fisilti: 'Acil konsültasyon için 30 dakikalık kritik SLA sayacı başlatıldı.'
    };
  }

  if (lower.includes('pre-op') || lower.includes('preop') || lower.includes('npo') || lower.includes('ameliyat') || lower.includes('cerrahi')) {
    const npoDate = new Date(baseDate);
    npoDate.setHours(npoDate.getHours() - 8);

    return {
      baslik: 'Pre-Op Cerrahi Hazırlık',
      zaman: 'Ameliyattan 8 Saat Önce (NPO)',
      tarih_iso: npoDate.toISOString(),
      action_items: [
        { task: 'T-8 saat: Ameliyat saatinden 8 saat önce mutlak açlık (NPO) başlatma', is_completed: false },
        { task: 'EKG, kan grubu ve Kan Merkezi cross-match teyidi', is_completed: false },
        { task: 'Aydınlatılmış hasta ve anestezi onam formunun imzalatılması', is_completed: false },
        { task: 'Cerrahi alan işaretleme ve premedikasyon kontrolü', is_completed: false }
      ],
      ikon: '🩺',
      renk: '#E0F2FE',
      anomali_notu: 'Anestezi güvenliği için ameliyat saatinden en az 8 saat önce tüm oral alım (su dahil) kesilmelidir.',
      sesli_fisilti: 'Ameliyat öncesi 8 saatlik NPO açlık, cross-match ve anestezi onam adımları kuruldu.'
    };
  }

  if (lower.includes('taburcu') || lower.includes('taburculuk') || lower.includes('epikriz')) {
    const controlDate = new Date(baseDate);
    controlDate.setDate(controlDate.getDate() + 10);

    return {
      baslik: 'Hasta Taburculuk & Epikriz',
      zaman: 'Taburculuk Saati (10 Gün Sonra Kontrol)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Detaylı klinik epikriz raporunu HBYS üzerinde tamamla ve e-İmzala', is_completed: false },
        { task: 'SGK Medula e-Reçetesini düzenleyip hastaya/yakınına ilet', is_completed: false },
        { task: 'Taburculuktan 10 gün sonrasına poliklinik kontrol randevusu oluştur', is_completed: false },
        { task: 'Çıkış patoloji, laboratuvar ve radyoloji tetkik onaylarını kapat', is_completed: false }
      ],
      ikon: '🩺',
      renk: '#E0F2FE',
      anomali_notu: 'Tüm açık tetkikler, e-Reçete ve HBYS epikriz raporu onaylanmadan hasta taburculuk işlemi sistemden kapatılamaz.',
      sesli_fisilti: 'Taburculuk epikrizi, e-Reçete ve 10 gün sonraki kontrol randevusu planlandı.'
    };
  }

  if (lower.includes('konsültasyon') || lower.includes('konsultasyon')) {
    const consultTime = new Date(baseDate);
    consultTime.setHours(consultTime.getHours() + 24);

    return {
      baslik: 'Rutin Konsültasyon Değerlendirmesi',
      zaman: '24 Saat İçinde (Rutin)',
      tarih_iso: consultTime.toISOString(),
      action_items: [
        { task: '24 saat içinde klinik değerlendirme ve önerileri HBYS sistemine işle', is_completed: false },
        { task: 'İsteyen birim hekimi ile sözlü iletişim kur ve tedavi revizyonunu planla', is_completed: false },
        { task: 'Gerekli ek tetkik veya görüntüleme istemlerini gerçekleştir', is_completed: false }
      ],
      ikon: '🩺',
      renk: '#E0F2FE',
      anomali_notu: 'Rutin konsültasyon yanıt süresi en fazla 24 saattir.',
      sesli_fisilti: 'Rutin konsültasyon değerlendirme adımları oluşturuldu.'
    };
  }

  // 2. HEMŞİRE (NURSE): Order/5 Doğru Kuralı, 2 Saatlik Dekübitus Pozisyon Alarmı, 45 Dk Önce SBAR Teslim Föyü
  if (lower.includes('dekübitus') || lower.includes('dekubitus') || lower.includes('pozisyon') || lower.includes('immobil')) {
    const posDate = new Date(baseDate);
    posDate.setHours(posDate.getHours() + 2); // 2 saat sonra

    return {
      baslik: 'Dekübitus Pozisyon Değişimi',
      zaman: '2 Saatte Bir (Periyodik)',
      tarih_iso: posDate.toISOString(),
      action_items: [
        { task: 'Hastanın vücut pozisyonunu değiştir (Sol lateral / Sağ lateral / Supine)', is_completed: false },
        { task: 'Bası yarası riskli bölgeleri (Sakrum, topuklar, skapula) kontrol et ve bariyer krem uygula', is_completed: false },
        { task: 'Pozisyon saatini ve Braden skalası bası skoru derecesini hemşire gözlem formuna işle', is_completed: false }
      ],
      ikon: '💉',
      renk: '#CCFBF1',
      anomali_notu: 'Yatağa bağımlı ve immobil hastalarda bası yarasını önlemek için en geç 2 saatte bir düzenli pozisyon değişimi zorunludur.',
      sesli_fisilti: 'İmmobil hasta için 2 saatlik periyodik dekübitus pozisyon alarmı kuruldu.'
    };
  }

  if (lower.includes('nöbet devir') || lower.includes('nobet devir') || lower.includes('hasta devri') || lower.includes('sbar') || lower.includes('narkotik')) {
    const handoffDate = new Date(baseDate);
    handoffDate.setMinutes(handoffDate.getMinutes() - 45);

    return {
      baslik: 'SBAR Nöbet Devir-Teslim Föyü',
      zaman: 'Nöbet Bitimine 45 Dk Kala',
      tarih_iso: handoffDate.toISOString(),
      action_items: [
        { task: 'SBAR (Situation, Background, Assessment, Recommendation) hasta teslim föyünü hazırla', is_completed: false },
        { task: 'Yeşil/kırmızı reçeteli narkotik ilaç dolabı fiziki sayımını yap ve çift imza ile teslim et', is_completed: false },
        { task: 'Kritik laboratuvar sonuçlarını, vital trendleri ve açık orderları devralan ekibe aktar', is_completed: false }
      ],
      ikon: '💉',
      renk: '#CCFBF1',
      anomali_notu: 'Nöbet devrinde hasta güvenliği için SBAR standardı ve narkotik dolabı çift imza protokolü zorunludur.',
      sesli_fisilti: 'Nöbet devir saatinden 45 dakika öncesine SBAR hasta teslim föyü hazırlığı alarmı kuruldu.'
    };
  }

  if (lower.includes('order') || lower.includes('ilaç saati') || lower.includes('ilac saati') || lower.includes('5 doğru') || lower.includes('5 dogru') || lower.includes('tedavi')) {
    return {
      baslik: 'Klinik Order & İlaç Uygulaması',
      zaman: 'Order Saati (5 Doğru Kuralı)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: '5 Doğru Kuralı Denetimi: Doğru hasta, doğru ilaç, doğru doz, doğru yol, doğru zaman kontrolü', is_completed: false },
        { task: 'Uygulanan tedaviyi anında HBYS hemşire order ve gözlem defterine kaydet', is_completed: false },
        { task: 'Hastanın vital bulgularını ve alerji öyküsünü doğrula', is_completed: false }
      ],
      ikon: '💉',
      renk: '#CCFBF1',
      anomali_notu: 'İlaç uygulamalarında 5 Doğru Kuralı ve order teyidi zorunlu emniyet basamağıdır.',
      sesli_fisilti: '5 Doğru Kuralı denetimi ile order uygulama görevi oluşturuldu.'
    };
  }

  // 3. ECZACI (PHARMACIST): 2-8°C Dolapları Sabah 09:00 / Akşam 18:00 Isı Logu, Ayın İlk Haftası Medula, Ay Sonu Miad Sayımı
  if (lower.includes('eczac') || lower.includes('eczane') || lower.includes('soğuk zincir') || lower.includes('soguk zincir') || lower.includes('its') || lower.includes('medula') || lower.includes('miad') || lower.includes('aşı') || lower.includes('asi')) {
    const isColdChain = lower.includes('soğuk zincir') || lower.includes('soguk zincir') || lower.includes('ısı') || lower.includes('isi') || lower.includes('buzdolabı') || lower.includes('2-8') || lower.includes('aşı');
    
    if (isColdChain) {
      return {
        baslik: 'Eczane Soğuk Zincir (2-8°C) Logu',
        zaman: 'Sabah 09:00 & Akşam 18:00',
        tarih_iso: baseDate.toISOString(),
        action_items: [
          { task: 'Sabah 09:00: Dijital termometre sıcaklık (2-8°C) ve nem değerini log defterine kaydet', is_completed: false },
          { task: 'Akşam 18:00: Dijital termometre sıcaklık ve nem değerini log defterine kaydet', is_completed: false },
          { task: 'Aşı ve biyolojik ürünlerin İTS karekod durumlarını doğrula', is_completed: false }
        ],
        ikon: '💊',
        renk: '#FEE2E2',
        anomali_notu: '2-8°C aralığı dışındaki sıcaklık sapmalarında soğuk zincir bozulmuş sayılarak ürünler derhal karantinaya alınmalıdır.',
        sesli_fisilti: '2-8°C dolapları için sabah 09:00 ve akşam 18:00 ısı log kontrolü kuruldu.'
      };
    }

    return {
      baslik: 'Medula Reçete & Miad Kontrolü',
      zaman: 'Ayın İlk Haftası / Ay Sonu',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Ayın ilk haftası: Medula reçete döküm özeti çıktısını al ve SGK teslim evraklarını hazırla', is_completed: false },
        { task: 'Ay sonu: Miadı yaklaşan (3 ay kalan) ürünlerin fiziki sayımını yap ve depo iadesini başlat', is_completed: false },
        { task: 'Renkli reçete sistemi (Uyuşturucu/Psikotrop) aylık bildirim mutabakatını tamamla', is_completed: false }
      ],
      ikon: '💊',
      renk: '#FEE2E2',
      anomali_notu: 'Medula reçete faturaları her ayın ilk haftasında SGK\'ya teslim edilmeli, miadı yaklaşan ürünler zamanında iade edilmelidir.',
      sesli_fisilti: 'Ayın ilk haftası Medula reçete döküm teslimi ve ay sonu miad kontrol adımları oluşturuldu.'
    };
  }

  // 4. DİŞ HEKİMİ (DENTIST): İmplant/Cerrahi 7. Gün Dikiş Alma & Otoklav Haftalık Biyolojik Spor / Günlük İndikatör
  if (lower.includes('diş') || lower.includes('dis') || lower.includes('implant') || lower.includes('protez') || lower.includes('otoklav') || lower.includes('sterilizasyon') || lower.includes('dikiş') || lower.includes('dikis')) {
    const isSterilization = lower.includes('otoklav') || lower.includes('sterilizasyon') || lower.includes('biyolojik spor') || lower.includes('indikatör') || lower.includes('indikator');
    
    if (isSterilization) {
      return {
        baslik: 'Otoklav Spor Testi & Sterilizasyon',
        zaman: 'Haftalık Spor Testi / Günlük İndikatör',
        tarih_iso: baseDate.toISOString(),
        action_items: [
          { task: 'Haftalık biyolojik spor test tüpünü otoklav döngüsüne yerleştir ve inkübatörde üreme kontrolü yap', is_completed: false },
          { task: 'Günlük rulo paketleme indikatör şeritlerinin renk dönüşümünü onayla', is_completed: false },
          { task: 'Cihaz basınç/sıcaklık log çıktısını sterilizasyon takip defterine yapıştır', is_completed: false }
        ],
        ikon: '🦷',
        renk: '#EDE9FE',
        anomali_notu: 'Otoklav biyolojik spor testinde üreme görülürse cihaz derhal kullanımdan çekilmeli ve tüm paketler yeniden steril edilmelidir.',
        sesli_fisilti: 'Otoklav haftalık biyolojik spor testi ve günlük indikatör onay görevi oluşturuldu.'
      };
    }

    const stichDate = new Date(baseDate);
    stichDate.setDate(stichDate.getDate() + 7);

    return {
      baslik: 'Dental İmplant & Dikiş Alma',
      zaman: '7 Gün Sonra (Dikiş & İyileşme)',
      tarih_iso: stichDate.toISOString(),
      action_items: [
        { task: 'Operasyonun 7. gününde dikiş alma ve yumuşak doku iyileşme kontrolü', is_completed: false },
        { task: 'Protez ölçü modelini laboratuvara gönder ve prova randevusu planla', is_completed: false },
        { task: 'Post-op klorheksidin gargara ve ağız hijyen talimatlarını hastaya teyit et', is_completed: false }
      ],
      ikon: '🦷',
      renk: '#EDE9FE',
      anomali_notu: 'İmplant cerrahisi sonrası ilk 7 gün kemik ve yumuşak doku primer iyileşmesi açısından kritiktir.',
      sesli_fisilti: 'İmplant operasyonu sonrası 7. güne dikiş alma ve doku kontrol randevusu planlandı.'
    };
  }

  // Standart fallback
  return {
    baslik: 'Klinik Order & Tedavi Takibi',
    zaman: 'Order Saati',
    tarih_iso: baseDate.toISOString(),
    action_items: [
      { task: '5 Doğru Kuralı Denetimi: Doğru hasta, doğru ilaç, doğru doz, doğru yol, doğru zaman', is_completed: false },
      { task: 'İlaç uygulama kayıtlarının HBYS/order defterine işlenmesi', is_completed: false },
      { task: 'Hastanın vital bulgularını ve alerji öyküsünü doğrula', is_completed: false }
    ],
    ikon: '💉',
    renk: '#CCFBF1',
    anomali_notu: 'Uygulanan tüm mayi ve medikal tedaviler uygulandığı dakika HBYS sistemine kaydedilmelidir.',
    sesli_fisilti: '5 Doğru Kuralı ve HBYS order kayıt adımları oluşturuldu.'
  };
}

export function parseCivilServantPublicOfficeNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isCivilServant = 
    lower.includes('ebys') || lower.includes('belgenet') || lower.includes('cimer') || lower.includes('çimer') ||
    lower.includes('günlü evrak') || lower.includes('gunlu evrak') || lower.includes('süreli yazı') || lower.includes('sureli yazi') ||
    lower.includes('acele yazı') || lower.includes('acele yazi') || lower.includes('paraf') || lower.includes('e-imza') || lower.includes('eimza') ||
    lower.includes('doğrudan temin') || lower.includes('dogrudan temin') || lower.includes('4734') || lower.includes('22/d') ||
    lower.includes('tif') || lower.includes('tkys') || lower.includes('mys') || lower.includes('muayene kabul') ||
    lower.includes('piyasa fiyat araştırma') || lower.includes('malmüdürlüğü') || lower.includes('malmudurlugu') ||
    lower.includes('sağlık raporu') || lower.includes('saglik raporu') || lower.includes('izin formu') || lower.includes('komisyon');

  if (!isCivilServant) return null;

  // 1. CİMER ve Bilgi Edinme (15-30 Gün)
  if (lower.includes('cimer') || lower.includes('çimer') || lower.includes('bilgi edinme') || lower.includes('3071')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 15);
    due.setHours(17, 0, 0, 0);

    return {
      baslik: 'CİMER Başvuru İşlemi',
      zaman: 'Yasal Süre: 15 Gün',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'CİMER başvuru konusunu incele ve gerekirse 3 iş günü içinde alt birimlerden bilgi iste', is_completed: false },
        { task: 'Gelen veriler doğrultusunda mevzuata uygun cevap taslağını hazırla', is_completed: false },
        { task: 'Şube Müdürü ve Amir parafıyla CİMER sistemine cevabı yükle ve kapat', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#FEF9C3',
      anomali_notu: 'CİMER başvurularına yasal cevap süresi azami 30 gündür; kurum içi ara yazışmalar 3 gün içinde tamamlanmalıdır.',
      sesli_fisilti: 'CİMER yasal başvuru takvimi ve alt birim ara yazı süreci oluşturuldu.'
    };
  }

  // 2. Doğrudan Temin ve Taşınır (4734 - 22/d & TİF & MYS)
  if (lower.includes('doğrudan temin') || lower.includes('dogrudan temin') || lower.includes('22/d') || lower.includes('tif') || lower.includes('tkys') || lower.includes('mys') || lower.includes('muayene kabul')) {
    return {
      baslik: 'Doğrudan Temin & Taşınır (22/d)',
      zaman: 'Harcama / Fatura Süreci',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Piyasa fiyat araştırma teklif mektupları kontrolü', is_completed: false },
        { task: 'Muayene ve kabul komisyon tutanağı imzalatılması', is_completed: false },
        { task: 'TKYS üzerinden Taşınır İşlem Fişi (TİF) kesilmesi', is_completed: false },
        { task: 'MYS ödeme emri belgesinin Malmüdürlüğü/Muhasebeye teslimi', is_completed: false }
      ],
      ikon: '🗂️',
      renk: '#FEF9C3',
      anomali_notu: '4734 sayılı KİK 22/d alımlarında fatura tarihi ile TİF ve Muayene Kabul tarihleri uyumlu olmalıdır.',
      sesli_fisilti: 'Doğrudan temin piyasa araştırması, TİF ve MYS ödeme kontrol listesi hazırlandı.'
    };
  }

  // 3. Özlük & Rapor
  if (lower.includes('sağlık raporu') || lower.includes('saglik raporu') || lower.includes('izin formu') || (lower.includes('rapor') && lower.includes('amire'))) {
    return {
      baslik: 'Sağlık Raporu & İzin Bildirimi',
      zaman: 'Mesai Başlangıcı (İvedi)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Mesai başlangıcında amire sözlü/yazılı rapor intikali', is_completed: false },
        { task: 'EBYS üzerinden sağlık izni formu doldurulması ve raporun eklenmesi', is_completed: false },
        { task: 'İzin onayının personel özlük birimince işlendiğini teyit et', is_completed: false }
      ],
      ikon: '🗂️',
      renk: '#FEF9C3',
      anomali_notu: 'Devlet Memurları Kanunu gereği sağlık raporları en geç mesai bitimine kadar kuruma intikal ettirilmelidir.',
      sesli_fisilti: 'Sağlık raporu amir bilgilendirme ve EBYS izin süreci başlatıldı.'
    };
  }

  // 4. Süreli ve Günlü Evraklar (EBYS / Belgenet)
  const due = new Date(baseDate);
  due.setDate(due.getDate() + 3); // 3 gün sonra
  due.setHours(17, 0, 0, 0);

  return {
    baslik: 'EBYS Günlü & Süreli Evrak',
    zaman: '1 Gün Önce İç Onay',
    tarih_iso: due.toISOString(),
    action_items: [
      { task: 'Yazı taslağının hazırlanması ve Standart Dosya Kodu (SDP) seçimi', is_completed: false },
      { task: 'Şef ve Şube Müdürü paraf zincirine sunulması', is_completed: false },
      { task: 'Nitelikli elektronik sertifika (e-İmza) ile nihai onay ve sayı/tarih alımı', is_completed: false }
    ],
    ikon: '🖋️',
    renk: '#FEF9C3',
    anomali_notu: 'Günlü evraklarda gecikmeye meydan vermemek için son teslimden en az 1 iş günü önce paraf zinciri başlatılmalıdır.',
    sesli_fisilti: 'EBYS günlü evrak için SDP dosya kodu, paraf zinciri ve e-İmza adımları oluşturuldu.'
  };
}

export function parseTradesmanLocalShopNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isTradeAndRepair =
    lower.includes('tamirci') || lower.includes('usta') || lower.includes('tamir') || lower.includes('balata') || lower.includes('yağ değişimi') || lower.includes('yag degisimi') ||
    lower.includes('obd') || lower.includes('arıza kodu') || lower.includes('ariza kodu') || lower.includes('torklama') || lower.includes('parça değişimi') || lower.includes('parca degisimi') ||
    lower.includes('satış danışmanı') || lower.includes('satis danismani') || lower.includes('müşteri teklifi') || lower.includes('musteri teklifi') || lower.includes('teklif verdik') || lower.includes('teklif gönderdik') || lower.includes('follow-up') || lower.includes('sıcak takip') || lower.includes('sicak takip') || lower.includes('çapraz satış') || lower.includes('capraz satis') || lower.includes('cross-sell') ||
    lower.includes('kasiyer') || lower.includes('kasa avansı') || lower.includes('kasa avansi') || lower.includes('ara kasa tahliye') || lower.includes('yazar kasa') ||
    lower.includes('veresiye') || lower.includes('toptancı') || lower.includes('toptanci') ||
    lower.includes('tedarikçi') || lower.includes('tedarikci') || lower.includes('z raporu') ||
    lower.includes('pos gün sonu') || lower.includes('kasa sayımı') || lower.includes('kasa sayimi') ||
    lower.includes('dükkan') || lower.includes('dukkan') || lower.includes('esnaf') ||
    lower.includes('bağ-kur') || lower.includes('bagkur') || lower.includes('stopaj') ||
    lower.includes('veresiye defteri') || lower.includes('eksik listesi') ||
    ((lower.includes('azaldı') || lower.includes('bitti') || lower.includes('sipariş ver') || lower.includes('siparis ver')) && (lower.includes('koli') || lower.includes('toptan') || lower.includes('ürün') || lower.includes('mal')));

  if (!isTradeAndRepair) return null;

  // 1. TAMİRCİ / USTA (AUTO & DEVICE REPAIR): Müşteri Onayı, Parça Tedariği, Torklama, OBD & Yol Testi
  if (lower.includes('tamirci') || lower.includes('usta') || lower.includes('tamir') || lower.includes('balata') || lower.includes('obd') || lower.includes('arıza') || lower.includes('ariza') || lower.includes('tork')) {
    const testDate = new Date(baseDate);
    testDate.setMinutes(testDate.getMinutes() - 45);

    return {
      baslik: 'Araç / Cihaz Onarımı & Teslimat',
      zaman: 'Teslimattan 45 Dk Önce (Test & OBD)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Onarım Öncesi (Müşteri Onayı)',
      hazirlik_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Müşteri onayı ve tahmini maliyet mutabakatı almadan parça değişimine başlama', is_completed: false },
        { task: 'Gereken orijinal/muadil yedek parçanın tedarik durumunu teyit et', is_completed: false },
        { task: 'Teslimattan 45 dk önce: Bijon/civata tork kontrolü ve OBD arıza hafızasını sıfırla', is_completed: false },
        { task: 'Sıvı kaçağı denetimi ve 5 km kısa yol testi gerçekleştir', is_completed: false }
      ],
      ikon: '🔧',
      renk: '#FEF3C7',
      anomali_notu: 'Müşteri yazılı/sözlü onayı alınmayan ilave parça değişimleri hukuki uyuşmazlık yaratır; teslim öncesi tork ve OBD kontrolü zorunludur.',
      sesli_fisilti: 'Onarım öncesi müşteri onayı ve teslimattan 45 dk öncesine tork/OBD kontrolü kuruldu.'
    };
  }

  // 2. SATIŞ DANIŞMANI: Teklif Takibi (24-48 Saat), Rezervasyon & Çapraz Satış
  if (lower.includes('satış') || lower.includes('satis') || lower.includes('teklif') || lower.includes('follow-up') || lower.includes('cross-sell') || lower.includes('danışman')) {
    const followUpDate = new Date(baseDate);
    followUpDate.setHours(followUpDate.getHours() + 24);

    return {
      baslik: 'Müşteri Teklifi & Sıcak Takip',
      zaman: '24-48 Saat İçinde (Follow-Up)',
      tarih_iso: followUpDate.toISOString(),
      action_items: [
        { task: 'Müşteriye gönderilen teklifin ulaştığını ve opsiyon/geçerlilik süresini teyit et', is_completed: false },
        { task: 'Teklif edilen ürünler için depoda geçici stok rezervasyonu oluştur', is_completed: false },
        { task: '24-48 saat içinde müşteriyle sıcak takip görüşmesi (follow-up) yap', is_completed: false },
        { task: 'Teklife tamamlayıcı sarf/aksesuar çapraz satış (cross-sell) alternatiflerini sun', is_completed: false }
      ],
      ikon: '💼',
      renk: '#E0E7FF',
      anomali_notu: 'Tekliflerde fiyat opsiyon süresi açıkça belirtilmeli ve stok rezerve süreleri aşılmamalıdır.',
      sesli_fisilti: 'Teklif için 24 saatlik sıcak takip ve stok rezervasyon görevi açıldı.'
    };
  }

  // 3. KASİYER: Kasa Avansı, Rulo Kontrolü, Ara Tahliye & Z Raporu
  if (lower.includes('kasiyer') || lower.includes('kasa avansı') || lower.includes('kasa avansi') || lower.includes('ara kasa') || lower.includes('z raporu') || lower.includes('pos gün sonu') || lower.includes('kasa sayım') || lower.includes('dükkan kapat') || lower.includes('kapanış')) {
    return {
      baslik: 'Kasa Yönetimi & Gün Sonu',
      zaman: 'Kapanış (Z Raporu & POS)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Vardiya Başı (Avans & Rulo)',
      hazirlik_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Vardiya başında bozuk para avans sayımı ve pos/yazar kasa rulo kontrolü yap', is_completed: false },
        { task: 'Çekmecede nakit biriktiğinde kasa güvenliği için ara tahliye gerçekleştir', is_completed: false },
        { task: 'Kapanışta yazar kasa Z raporu çıktısı ve banka POS gün sonu işlemlerini al', is_completed: false },
        { task: 'Fiziki nakit sayımı ile sistem raporu mutabakatını sağla', is_completed: false }
      ],
      ikon: '🧾',
      renk: '#DCFCE7',
      anomali_notu: 'Kasa açığı veya fazlası oluşmaması için Z raporu ve POS gün sonu slipleri nakit kasa ile tam eşleşmelidir.',
      sesli_fisilti: 'Vardiya başı avans ve kapanış Z raporu/POS mutabakat adımları planlandı.'
    };
  }

  // 4. Veresiye & Borç-Alacak Dengesi
  if (lower.includes('veresiye') || (lower.includes('alacak') && (lower.includes('müşteri') || lower.includes('yaz') || lower.includes('defter')))) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 14); // Standart 14 gün vade kontrolü

    return {
      baslik: 'Veresiye / Müşteri Alacağı',
      zaman: 'Vade / 14 Gün Sonra',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Veresiye defterine/sisteme isim, tutar ve tarih kaydı', is_completed: false },
        { task: 'Müşteriye sözlü veya SMS/WhatsApp ile hesap özeti onayı', is_completed: false },
        { task: 'Vade günü tahsilat kontrolü', is_completed: false }
      ],
      ikon: '📓',
      renk: '#DCFCE7',
      anomali_notu: 'Veresiye kayıtlarında ürün detayı ve vade tarihinin açıkça belirtilmesi mutabakat kolaylığı sağlar.',
      sesli_fisilti: 'Veresiye kaydı ve 14 günlük vade kontrol takvimi oluşturuldu.'
    };
  }

  // 5. Toptancı & Tedarikçi Ödemesi
  if (lower.includes('toptancı') || lower.includes('toptanci') || lower.includes('tedarikçi') || lower.includes('tedarikci')) {
    if (lower.includes('ödeme') || lower.includes('odeme') || lower.includes('çek') || lower.includes('cek') || lower.includes('senet') || lower.includes('borç') || lower.includes('borc')) {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 1);

      return {
        baslik: 'Toptancı & Tedarikçi Ödemesi',
        zaman: 'Ödemeden 1 Gün Önce (Nakit Kontrolü)',
        tarih_iso: due.toISOString(),
        action_items: [
          { task: 'Toptancı cari hesap ekstresi ve fatura mutabakatı', is_completed: false },
          { task: 'Banka/kasa nakit akışı ve bakiye teyidi', is_completed: false },
          { task: 'EFT/Havale veya elden ödeme dekontunun arşivlenmesi', is_completed: false }
        ],
        ikon: '💸',
        renk: '#FEE2E2',
        anomali_notu: 'Toptancı ödemelerinden 1 gün önce banka limitleri ve nakit akışı kontrol edilmelidir.',
        sesli_fisilti: 'Toptancı ödemesi için 1 gün öncesine nakit akışı kontrol alarmı kuruldu.'
      };
    }

    // Toptancı Sipariş & Eksik Listesi
    return {
      baslik: 'Tedarik & Sipariş Listesi',
      zaman: 'Toptancı Günü',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Kritik stok ve biten ürünlerin sayımı', is_completed: false },
        { task: 'Toptancıya sipariş listesinin ve adetlerin iletilmesi', is_completed: false },
        { task: 'Mal kabulünde irsaliye ve koli adedi kontrolü', is_completed: false }
      ],
      ikon: '📦',
      renk: '#FEF3C7',
      anomali_notu: 'Gelen ürünlerin irsaliye ile son kullanma tarihleri mal kabul anında kontrol edilmelidir.',
      sesli_fisilti: 'Eksik ürünler toptancı sipariş listenize eklendi.'
    };
  }

  // 6. Esnaf Mali Takvimi (Muhasebeci / Fatura / Bağ-Kur / Stopaj)
  if (lower.includes('muhasebeci') || lower.includes('fatura teslim') || lower.includes('bağ-kur') || lower.includes('bagkur') || lower.includes('stopaj') || lower.includes('kira')) {
    return {
      baslik: 'Esnaf Mali Takvimi & Vergiler',
      zaman: 'Ay Sonu / Fatura Dönemi',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Muhasebeciye alış/satış faturalarının ve Z raporlarının teslimi', is_completed: false },
        { task: 'Bağ-Kur primi, SGK ve dükkan stopaj ödeme kontrolü', is_completed: false },
        { task: 'Dükkan kira dekontunun muhasebeye iletilmesi', is_completed: false }
      ],
      ikon: '🏪',
      renk: '#FEF3C7',
      anomali_notu: 'Her ayın 15-20 arası evrak teslimi, ay sonu ise vergi/SGK tahakkuklarının ödenmesi zorunludur.',
      sesli_fisilti: 'Esnaf mali takvimi, muhasebe evrak teslimi ve Bağ-Kur kontrolleri planlandı.'
    };
  }

  return null;
}

export function parseMilitaryCommanderNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isMilitary =
    lower.includes('içtima') || lower.includes('ictima') || lower.includes('tekmil') ||
    lower.includes('bölük') || lower.includes('boluk') || lower.includes('tabur') || lower.includes('tugay') ||
    lower.includes('silahlık') || lower.includes('silahlik') || lower.includes('mühimmat') || lower.includes('muhimmat') ||
    lower.includes('doldur-boşalt') || lower.includes('doldur bosalt') || lower.includes('doldur boşalt') ||
    lower.includes('atış') || lower.includes('atis') || lower.includes('poligon') || lower.includes('tatbikat') ||
    lower.includes('hücum yeleği') || lower.includes('hucum yelegi') || lower.includes('kompozit başlık') ||
    lower.includes('kompozit baslik') || lower.includes('kademe') || lower.includes('askeri araç') ||
    lower.includes('askeri arac') || lower.includes('devir-teslim') || lower.includes('devir teslim') ||
    ((lower.includes('nöbet') || lower.includes('nobet')) && (lower.includes('silah') || lower.includes('mühimmat') || lower.includes('amir') || lower.includes('çavuş') || lower.includes('cavus') || lower.includes('teğmen') || lower.includes('tegmen') || lower.includes('yüzbaşı') || lower.includes('yuzbasi') || lower.includes('astsubay')));

  if (!isMilitary) return null;

  // 1. Silahlık ve Mühimmat Güvenliği / Nöbet Devir-Teslim
  if (lower.includes('silahlık') || lower.includes('silahlik') || lower.includes('mühimmat') || lower.includes('muhimmat') || lower.includes('doldur') || lower.includes('devir')) {
    return {
      baslik: 'Silahlık & Mühimmat Nöbet Devri',
      zaman: 'Devir-Teslim Saati',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Silahlık sayım cetvelinin ıslak imzayla fiziki sayımı', is_completed: false },
        { task: 'Mühimmat sandığı kurşun mühürlerinin fiziki kontrolü', is_completed: false },
        { task: 'Doldur-boşalt istasyonunda doldur-boşalt emniyetinin bizzat denetimi', is_completed: false },
        { task: 'Nöbet defteri vukuat kaydı ve devir-teslim imzası', is_completed: false }
      ],
      ikon: '🛡️',
      renk: '#E2E8D5',
      anomali_notu: 'Silah ve mühimmat devir-teslimi mühürler kırılmadan ve fiziki seri numaraları doğrulanarak yapılmalıdır.',
      sesli_fisilti: 'Silahlık sayımı, mühür kontrolü ve doldur-boşalt güvenlik adımları hazırlandı.'
    };
  }

  // 2. Atış ve Arazi Eğitimi (Poligon)
  if (lower.includes('atış') || lower.includes('atis') || lower.includes('poligon') || lower.includes('tatbikat')) {
    return {
      baslik: 'Atış & Arazi Tatbikat Protokolü',
      zaman: 'Faaliyet Öncesi Hazırlık',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Poligon emniyet subayı ve flama/gözcü yerleşimi', is_completed: false },
        { task: 'Sıhhiye aracı (ambulans) ve tabip koordinasyonu', is_completed: false },
        { task: 'Kovan ve mühimmat sarfiyat tutanağı tanzimi', is_completed: false },
        { task: 'Atış hattı öncesi doldur-boşalt ve silah kontrolü', is_completed: false }
      ],
      ikon: '🎯',
      renk: '#E2E8D5',
      anomali_notu: 'Poligonda sıhhiye ambulansı ve nöbetçi tabip hazır bulunmadan atış faaliyeti başlatılamaz.',
      sesli_fisilti: 'Poligon emniyeti, sıhhiye koordinasyonu ve mühimmat sarfiyat kontrol adımları oluşturuldu.'
    };
  }

  // 3. Bakım ve Kademe (Teknik/Motorlu Araç)
  if (lower.includes('kademe') || lower.includes('araç bakım') || lower.includes('arac bakim') || lower.includes('motorlu')) {
    return {
      baslik: 'Kademe & Askeri Araç Bakımı',
      zaman: 'Bakım Saati',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Araç takip defteri ve kilometre fişleri kontrolü', is_completed: false },
        { task: 'Yangın tüpü ve ilk yardım çantası denetimi', is_completed: false },
        { task: 'Motor yağı, hidrolik seviyeleri ve lastik basınç muayenesi', is_completed: false }
      ],
      ikon: '🪖',
      renk: '#E2E8F0',
      anomali_notu: 'Göreve çıkacak askeri araçların araç takip defteri imzalı ve emniyet teçhizatı tam olmalıdır.',
      sesli_fisilti: 'Kademe araç bakım ve takip defteri kontrol listesi hazırlandı.'
    };
  }

  // 4. Askeri Zaman Kademelendirmesi (İçtima & Tekmil)
  const ictimaDate = new Date(baseDate);
  ictimaDate.setMinutes(ictimaDate.getMinutes() - 20); // 20 dk önce

  return {
    baslik: 'İçtima & Tekmil Hazırlığı',
    zaman: '20 Dk Önce (Takım Hazırlığı)',
    tarih_iso: ictimaDate.toISOString(),
    action_items: [
      { task: 'Mevcut ve künye kontrolü (Raporlu, izinli, nöbetçi personelin tespiti)', is_completed: false },
      { task: 'Teçhizat, kompozit başlık, hücum yeleği ve kılık-kıyafet denetimi', is_completed: false },
      { task: 'Bölük/Tabur komutanına tekmil verme hazırlığı', is_completed: false }
    ],
    ikon: '🪖',
    renk: '#E2E8D5',
    anomali_notu: 'Birlik içtimasından en az 20 dakika önce takım mevcutları alınmış ve teçhizat kontrolü tamamlanmış olmalıdır.',
    sesli_fisilti: 'İçtima öncesi mevcut sayımı, teçhizat denetimi ve tekmil hazırlığı planlandı.'
  };
}

export function parseEngineeringSuiteNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isEngineering =
    lower.includes('beton') || lower.includes('şantiye') || lower.includes('santiye') ||
    lower.includes('donatı') || lower.includes('donati') || lower.includes('kürleme') || lower.includes('kurleme') ||
    lower.includes('kırım testi') || lower.includes('kirim testi') || lower.includes('kalıp söküm') ||
    lower.includes('trafo') || lower.includes('pano') || lower.includes('yüksek gerilim') || lower.includes('yuksek gerilim') ||
    lower.includes('loto') || lower.includes('kilitleme-etiketleme') || lower.includes('kompanzasyon') || lower.includes('endüktif') || lower.includes('kapasitif') ||
    lower.includes('kompresör') || lower.includes('kompresor') || lower.includes('kazan') || lower.includes('basınçlı kap') || lower.includes('basincli kap') ||
    lower.includes('hidrostatik test') || lower.includes('vibrasyon') || lower.includes('titreşim') || lower.includes('titresim') || lower.includes('yağ analizi') || lower.includes('yag analizi') ||
    lower.includes('deploy') || lower.includes('canlıya alma') || lower.includes('canliya alma') || lower.includes('migration') ||
    lower.includes('rollback') || lower.includes('staging') || lower.includes('semver') || lower.includes('hotfix') || lower.includes('sprint');

  if (!isEngineering) return null;

  // 1. İNŞAAT MÜHENDİSLİĞİ: Beton Dökümü, Kürleme & Kırım Testi
  if (lower.includes('beton') || lower.includes('şantiye') || lower.includes('santiye') || lower.includes('donatı') || lower.includes('donati') || lower.includes('kür') || lower.includes('kırım') || lower.includes('kirim')) {
    const test7 = new Date(baseDate);
    test7.setDate(test7.getDate() + 7);
    const test28 = new Date(baseDate);
    test28.setDate(test28.getDate() + 28);

    return {
      baslik: 'Beton Dökümü & Kalite Kontrol',
      zaman: '7 & 28 Günlük Kırım Testi',
      tarih_iso: test7.toISOString(),
      action_items: [
        { task: 'Küp/silindir beton numunelerinin etiketlenmesi ve su kür havuzuna alınması', is_completed: false },
        { task: 'İlk 3 gün boyunca sabah/akşam düzenli beton kür sulaması', is_completed: false },
        { task: 'Yapı denetim ve şantiye şefi ıslak imzalı donatı teslim tutanağı', is_completed: false },
        { task: '7. gün laboratuvar erken dayanım basınç kırım testi', is_completed: false },
        { task: '28. gün nihai tasarım dayanımı kırım testi ve rapor onayı', is_completed: false }
      ],
      ikon: '🏗️',
      renk: '#FEF3C7',
      anomali_notu: 'TS EN 206 standardı uyarınca 28 günlük basınç dayanımı proje sınıfını karşılamalı; ilk 72 saat kürleme aksatılmamalıdır.',
      sesli_fisilti: 'Beton kürleme periyodu ve 7 ile 28 günlük laboratuvar kırım takvimi oluşturuldu.'
    };
  }

  // 2. ELEKTRİK MÜHENDİSLİĞİ: LOTO & Kompanzasyon / Sayaç Takibi
  if (lower.includes('trafo') || lower.includes('pano') || lower.includes('yüksek gerilim') || lower.includes('yuksek gerilim') || lower.includes('loto') || lower.includes('kompanzasyon') || lower.includes('endüktif') || lower.includes('kapasitif')) {
    const isLoto = lower.includes('loto') || lower.includes('trafo') || lower.includes('pano') || lower.includes('yüksek gerilim') || lower.includes('yuksek gerilim') || lower.includes('kilitleme');
    
    if (isLoto) {
      return {
        baslik: 'Pano/Trafo Bakımı & LOTO Güvenliği',
        zaman: 'Müdahale Öncesi (İSG)',
        tarih_iso: baseDate.toISOString(),
        action_items: [
          { task: 'LOTO Prosedürü: Ana kesiciyi indir, asma kilitle kilitle ve ikaz etiketini as', is_completed: false },
          { task: 'Gerilim kontrol kalemi ile hatta 0V olduğunu doğrula ve topraklama yap', is_completed: false },
          { task: 'Termal kamera ile baralar ve klemenslerde aşırı ısınma/gevşeklik taraması', is_completed: false },
          { task: 'Bakım bitimi izolasyon direnci testi ve tutanak imzalatılması', is_completed: false }
        ],
        ikon: '⚡',
        renk: '#FEE2E2',
        anomali_notu: 'Can güvenliği için enerjinin kesildiği fiziksel ölçümle teyit edilmeden panoya asla dokunulmamalıdır.',
        sesli_fisilti: 'LOTO kilitleme-etiketleme ve termal kontrol adımları 1. sıraya alındı.'
      };
    }

    return {
      baslik: 'Kompanzasyon & Sayaç Takibi',
      zaman: 'Haftalık / Sayaç Okuma',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Aktif, reaktif endüktif ve reaktif kapasitif sayaç endekslerini kaydet', is_completed: false },
        { task: 'Reaktif ceza kontrolü: Endüktif <%20, Kapasitif <%15 sınır denetimi', is_completed: false },
        { task: 'Kademe kontaktörleri ve kondansatör akım değerlerini ölç', is_completed: false }
      ],
      ikon: '⚡',
      renk: '#FEE2E2',
      anomali_notu: 'Endüktif oran %20, kapasitif oran %15 aşıldığında elektrik faturasına reaktif ceza bedeli yansır.',
      sesli_fisilti: 'Kompanzasyon sayaç okuma ve reaktif sınır kontrol adımları oluşturuldu.'
    };
  }

  // 3. MAKİNE MÜHENDİSLİĞİ: Basınçlı Kaplar & Kestirimci Bakım
  if (lower.includes('kompresör') || lower.includes('kompresor') || lower.includes('kazan') || lower.includes('basınçlı kap') || lower.includes('basincli kap') || lower.includes('vibrasyon') || lower.includes('titreşim') || lower.includes('titresim') || lower.includes('yağ analizi') || lower.includes('yag analizi')) {
    return {
      baslik: 'Basınçlı Kap & Kestirimci Bakım',
      zaman: 'Periyodik Bakım Saati',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Yıllık yasal hidrostatik test ve emniyet ventili açma basıncı kontrolü', is_completed: false },
        { task: 'Rulman ve motor yataklarında titreşim/vibrasyon spektrum analizi', is_completed: false },
        { task: 'Yağ viskozite, partikül ve su içeriği numune analizi', is_completed: false },
        { task: 'Hava/buhar kaçak dedektörü ile hat kaçak taraması', is_completed: false }
      ],
      ikon: '⚙️',
      renk: '#E2E8F0',
      anomali_notu: 'İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliğince basınçlı kaplar yılda en az 1 kez hidrostatik teste tabi tutulmalıdır.',
      sesli_fisilti: 'Basınçlı kap hidrostatik testi ve vibrasyon kontrol listesi hazırlandı.'
    };
  }

  // 4. YAZILIM MÜHENDİSLİĞİ: Prod Deploy & Sürüm Yönetimi
  const isFriday = baseDate.getDay() === 5;
  const deployTime = new Date(baseDate);

  return {
    baslik: 'Production Deploy & Sürüm Yönetimi',
    zaman: isFriday ? 'Cuma Deploy Riski / Canlıya Alma' : 'Prod Deploy Saati',
    tarih_iso: deployTime.toISOString(),
    action_items: [
      { task: 'Production veri tabanı anlık yedeği ve migration script teyidi', is_completed: false },
      { task: 'Staging ortamı regresyon/E2E testleri ve QA onayı', is_completed: false },
      { task: 'SemVer sürüm etiketi (Tag) oluşturma ve PR onay kontrolü', is_completed: false },
      { task: 'Canlıya alma sonrası APM metrikleri ve Sentry/Log kontrolü', is_completed: false },
      { task: 'Olası hata durumunda Rollback planı ve runbook hazır bulundurma', is_completed: false }
    ],
    ikon: '💻',
    renk: '#E0F2FE',
    anomali_notu: isFriday
      ? 'DİKKAT: Cuma günü prod deploy yüksek operasyonel risk taşır. Rollback adımları test edilmeden canlıya geçilmemelidir.'
      : 'Migration içeren deploylarda veri tabanı yedeklemesi ve rollback mekanizması zorunludur.',
    sesli_fisilti: isFriday
      ? 'Cuma deploy risk uyarısı eklendi; DB yedek ve rollback adımları oluşturuldu.'
      : 'Prod deploy kontrol listesi, DB yedeği ve rollback planı hazırlandı.'
  };
}

export function parseProjectLogisticsFieldTechNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isProjectLogisticsTech =
    lower.includes('mimar') || lower.includes('ruhsat') || lower.includes('belediye revizyon') || lower.includes('clash') || lower.includes('çakışma') || lower.includes('cakisma') || lower.includes('mahal listesi') || lower.includes('metraj') || lower.includes('render') || lower.includes('görselleştirme') || lower.includes('gorsellestirme') ||
    lower.includes('şoför') || lower.includes('sofor') || lower.includes('tır') || lower.includes('tir') || lower.includes('kamyon') || lower.includes('dorse') || lower.includes('king-pin') || lower.includes('kingpin') || lower.includes('takograf') || lower.includes('aetr') || lower.includes('kantar') || lower.includes('lojistik') || lower.includes('sevkiyat') || lower.includes('cmr') || lower.includes('pre-trip') ||
    lower.includes('teknisyen') || lower.includes('saha servisi') || lower.includes('saha ekibi') || lower.includes('iş emri') || lower.includes('is emri') || lower.includes('sla') || lower.includes('dbm') || lower.includes('optik güç') || lower.includes('fiber ek') || lower.includes('gerilim sıfırlama');

  if (!isProjectLogisticsTech) return null;

  // 1. MİMAR (ARCHITECTURE & DESIGN): Ruhsat Revizyonu, Müellif Çakışması, Render & Metraj
  if (lower.includes('mimar') || lower.includes('ruhsat') || lower.includes('clash') || lower.includes('çakışma') || lower.includes('cakisma') || lower.includes('render') || lower.includes('metraj') || lower.includes('mahal listesi')) {
    const isRevision = lower.includes('ruhsat') || lower.includes('revizyon') || lower.includes('belediye');
    const isPresentation = lower.includes('sunum') || lower.includes('render') || lower.includes('müşteri');

    if (isPresentation) {
      const renderLockDate = new Date(baseDate);
      renderLockDate.setHours(renderLockDate.getHours() - 24);

      return {
        baslik: 'Mimari Sunum & Görselleştirme',
        zaman: 'Sunumdan 24 Saat Önce (Render Kilidi)',
        tarih_iso: baseDate.toISOString(),
        hazirlik_zamani: '24 Saat Önce (Final Render)',
        hazirlik_iso: renderLockDate.toISOString(),
        action_items: [
          { task: 'Sunumdan 24 saat önce tüm 3D render ve animasyon çıktılarını kilitle', is_completed: false },
          { task: 'Pafta ve malzeme numune panosunu (moodboard) hazırla', is_completed: false },
          { task: 'İmalat öncesi mahal listesi ve yaklaşık metraj maliyet tablosunu doğrula', is_completed: false }
        ],
        ikon: '📐',
        renk: '#FEF08A',
        anomali_notu: 'Müşteri sunumlarında revizyon karmaşasını önlemek için renderlar en az 24 saat önceden dondurulmalıdır.',
        sesli_fisilti: 'Sunumdan 24 saat öncesine render kilidi ve malzeme lejantı kontrolü kuruldu.'
      };
    }

    const revisionDue = new Date(baseDate);
    revisionDue.setDate(revisionDue.getDate() + 30); // 30 günlük yasal süre

    return {
      baslik: 'Mimari Ruhsat Revizyonu & Koordinasyon',
      zaman: isRevision ? 'Yasal Süre: 30 Gün' : 'Proje Koordinasyon Saati',
      tarih_iso: revisionDue.toISOString(),
      action_items: [
        { task: 'Statik, mekanik ve elektrik müellif projeleriyle BIM/CAD çakışma (clash) testi yap', is_completed: false },
        { task: 'İmar yönetmeliği ve yangın merdiveni/sığınak yönetmelik kontrollerini tamamla', is_completed: false },
        { task: 'Belediye imar müdürlüğü eksik listesini 30 günlük yasal sürede tamamlayıp sisteme yükle', is_completed: false },
        { task: 'İmalat öncesi mahal listesi ve malzeme şartnamesini onayla', is_completed: false }
      ],
      ikon: '📐',
      renk: '#FEF08A',
      anomali_notu: 'Belediye ruhsat eksiklerinde yasal tamamlama süresi 30 gündür; şantiye imalatı öncesi müellif çakışma testi zorunludur.',
      sesli_fisilti: 'Ruhsat revizyonu için 30 günlük yasal süre ve müellif çakışma kontrolü başlatıldı.'
    };
  }

  // 2. ŞOFÖR & LOJİSTİK (AETR, Takograf, Yük Teslim & Pre-Trip)
  if (lower.includes('şoför') || lower.includes('sofor') || lower.includes('tır') || lower.includes('tir') || lower.includes('kamyon') || lower.includes('dorse') || lower.includes('takograf') || lower.includes('aetr') || lower.includes('kantar') || lower.includes('lojistik') || lower.includes('sevkiyat')) {
    const timeMatch = input.match(/(\d{1,2})[:.](\d{2})/);
    let tripZaman = 'Yük Slotuna Göre Planlandı';
    let tripIso = baseDate.toISOString();

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const departureDate = new Date(baseDate);
      departureDate.setHours(h - 5, m, 0, 0); // 4.5 saat sürüş + 45 dk mola + kantar payı
      const dh = departureDate.getHours().toString().padStart(2, '0');
      const dm = departureDate.getMinutes().toString().padStart(2, '0');
      tripZaman = `${dh}:${dm} (Tersine Kalkış & Pre-Trip)`;
      tripIso = departureDate.toISOString();
    }

    return {
      baslik: 'Lojistik Sevkiyat & Takograf Planı',
      zaman: tripZaman,
      tarih_iso: tripIso,
      hazirlik_zamani: 'Kalkıştan 45 Dk Önce (Pre-Trip)',
      hazirlik_iso: tripIso,
      action_items: [
        { task: 'Pre-trip: Lastik havaları, dorse king-pin kilidi, fren hortumları ve aydınlatma kontrolü', is_completed: false },
        { task: 'Dijital takograf kartını tak; 4.5 saat sürüş / 45 dk mola ve günlük 9 saat limitini planla', is_completed: false },
        { task: 'Kantar tartım fişi, sevk irsaliyesi ve CMR/taşıma evraklarını doğrula', is_completed: false },
        { task: 'Varış rampa randevu saatine göre mola ve trafik süresini hesapla', is_completed: false }
      ],
      ikon: '🚛',
      renk: '#FED7AA',
      anomali_notu: 'AETR kuralları gereği 4.5 saatlik kesintisiz sürüşten sonra en az 45 dakika mola zorunludur; takograf ihlalleri ağır idari para cezasına tabidir.',
      sesli_fisilti: 'AETR takograf sürüş/mola planı ve dorse pre-trip kontrolleri takvimlendi.'
    };
  }

  // 3. TEKNİSYEN & SAHA TEKNOLOJİSİ (SLA, LOTO, Parametre Ölçümü & Teslim İmzası)
  return {
    baslik: 'Saha Arıza Müdahalesi & SLA',
    zaman: 'SLA Müdahale Süresi İçinde',
    tarih_iso: baseDate.toISOString(),
    hazirlik_zamani: 'Müdahale Öncesi (LOTO & Emniyet)',
    hazirlik_iso: baseDate.toISOString(),
    action_items: [
      { task: 'Müdahale öncesi LOTO (enerji kesme/etiketleme) ve artık gerilim/gaz sıfırlama güvenliği', is_completed: false },
      { task: 'SLA süresi dolmadan müşteri lokasyonuna intikal et ve arıza kök nedenini belirle', is_completed: false },
      { task: 'Onarım sonrası teknik parametreleri (dBm, PSI, Ohm, Bar) ölç ve tolerans dahilinde doğrula', is_completed: false },
      { task: 'Saha iş emri tutanağını doldur ve müşteriden ıslak/dijital teslim imzasını al', is_completed: false }
    ],
    ikon: '🛠️',
    renk: '#CFFAFE',
    anomali_notu: 'Can güvenliği için LOTO uygulanmadan hatta girilmemeli; SLA süresi aşılmadan ölçüm değerleri iş emrine girilmelidir.',
    sesli_fisilti: 'SLA geri sayımı, LOTO güvenlik adımı ve parametre ölçüm tutanağı oluşturuldu.'
  };
}

export function parseCorporateOfficePersonalCareNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isCorporateOrCare = 
    lower.includes('sekreter') || lower.includes('yönetici asistan') || lower.includes('yonetici asistan') ||
    lower.includes('brifing') || lower.includes('ikram') || lower.includes('vip') || lower.includes('karşılama') || lower.includes('karsilama') ||
    lower.includes('insan kaynakları') || lower.includes('insan kaynaklari') || lower.includes('işe giriş') || lower.includes('ise giris') ||
    lower.includes('işten çıkış') || lower.includes('isten cikis') || lower.includes('sgk bildir') || lower.includes('sgk') || lower.includes('deneme süresi') || lower.includes('deneme suresi') ||
    lower.includes('kuaför') || lower.includes('kuafor') || lower.includes('berber') || lower.includes('oryal') || lower.includes('saç açma') || lower.includes('sac acma') ||
    lower.includes('röfle') || lower.includes('rofle') || lower.includes('saç boya') || lower.includes('sac boya') || lower.includes('keratin') ||
    lower.includes('fön') || lower.includes('fon') || lower.includes('elastikiyet') || (lower.includes('sterilizasyon') && (lower.includes('makas') || lower.includes('tarak') || lower.includes('salon') || lower.includes('kuaför')));

  if (!isCorporateOrCare) return null;

  // 1. SEKRETER / YÖNETİCİ ASİSTANI
  if (lower.includes('sekreter') || lower.includes('yönetici asistan') || lower.includes('yonetici asistan') || lower.includes('brifing') || lower.includes('vip') || lower.includes('karşılama') || lower.includes('karsilama') || (lower.includes('toplantı') && (lower.includes('ulaşım') || lower.includes('tampon') || lower.includes('ikram')))) {
    const timeMatch = input.match(/(\d{1,2})[:.](\d{2})/);
    let meetingZaman = 'Görüşme Öncesi (2 Saat Önce Brifing)';
    let meetingIso = baseDate.toISOString();

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const meetingDate = new Date(baseDate);
      meetingDate.setHours(h - 2, m, 0, 0); // 2 saat öncesi brifing ve ikram teyidi
      const mh = meetingDate.getHours().toString().padStart(2, '0');
      const mm = meetingDate.getMinutes().toString().padStart(2, '0');
      meetingZaman = `${mh}:${mm} (T-2 Saat Brifing & İkram)`;
      meetingIso = meetingDate.toISOString();
    }

    return {
      baslik: 'Yönetici Ajandası & VIP Brifing',
      zaman: meetingZaman,
      tarih_iso: meetingIso,
      hazirlik_zamani: 'Görüşmeden 2 Saat Önce (Brifing & İkram)',
      hazirlik_iso: meetingIso,
      action_items: [
        { task: 'Toplantılar arasına min. 30 dakika ulaşım ve toparlanma tamponu yerleştir', is_completed: false },
        { task: 'Üst düzey görüşmeden 2 saat önce: Toplantı bilgi notu (brifing dosyası) ve ikram teyidini sağla', is_completed: false },
        { task: 'Uçuşlarda T-24 saat öncesi online check-in yap ve VIP havalimanı karşılama/transfer zincirini koordine et', is_completed: false },
        { task: 'Görüşme sonrası alınan aksiyon kararlarını ilgili birim yöneticilerine ilet', is_completed: false }
      ],
      ikon: '🗂️',
      renk: '#EDE9FE',
      anomali_notu: 'Yönetici ajandasında arka arkaya toplantılar arasına en az 30 dk tampon konulmalı, VIP görüşmelerde brifing dosyası 2 saat önce masada olmalıdır.',
      sesli_fisilti: 'Yönetici ajandası tamponu, T-2 saat brifing dosyası ve VIP karşılama adımları hazırlandı.'
    };
  }

  // 2. İNSAN KAYNAKLARI (T-1 SGK İşe Giriş, 10 Gün İşten Çıkış, 45 Gün Deneme Süresi Formu)
  if (lower.includes('insan kaynakları') || lower.includes('insan kaynaklari') || lower.includes('işe giriş') || lower.includes('ise giris') || lower.includes('işten çıkış') || lower.includes('isten cikis') || lower.includes('sgk') || lower.includes('deneme süresi') || lower.includes('deneme suresi')) {
    const isExit = lower.includes('işten çıkış') || lower.includes('isten cikis') || lower.includes('istifa') || lower.includes('fesih');
    const isTrial = lower.includes('deneme süresi') || lower.includes('deneme suresi');

    if (isExit) {
      const exitDue = new Date(baseDate);
      exitDue.setDate(exitDue.getDate() + 10); // 10 günlük yasal SGK işten çıkış bildirgesi süresi
      exitDue.setHours(23, 59, 0, 0);

      return {
        baslik: 'SGK İşten Çıkış & İbra Süreci',
        zaman: 'Yasal Süre: 10 Gün (SGK Bildirgesi)',
        tarih_iso: exitDue.toISOString(),
        action_items: [
          { task: 'SGK e-Bildirge üzerinden 10 gün içinde işten ayrılış bildirgesini ver', is_completed: false },
          { task: 'Zimmet iade tutanağı, şirket kartı ve kurumsal erişimlerin iptalini tamamla', is_completed: false },
          { task: 'Kıdem/ihbar tazminatı ve kullanılmayan izin ücreti bordrosunu hesaplayıp imzalat', is_completed: false },
          { task: 'İbraname ve çalışma belgesini ıslak imzalı olarak özlük dosyasına kaldır', is_completed: false }
        ],
        ikon: '👥',
        renk: '#E0E7FF',
        anomali_notu: 'İşten ayrılış bildirgesi fesih tarihinden itibaren 10 gün içinde SGK\'ya verilmezse idari para cezası uygulanır.',
        sesli_fisilti: '10 günlük yasal SGK işten çıkış bildirgesi ve zimmet teslim adımları takvimlendi.'
      };
    }

    if (isTrial) {
      const trialDue = new Date(baseDate);
      trialDue.setDate(trialDue.getDate() + 45); // 45. gün deneme süresi değerlendirmesi

      return {
        baslik: 'Deneme Süresi Değerlendirmesi',
        zaman: '45. Gün (2 Aylık Süre Bitimi Öncesi)',
        tarih_iso: trialDue.toISOString(),
        action_items: [
          { task: 'Bölüm yöneticisine 2 aylık deneme süresi performans değerlendirme formunu ilet', is_completed: false },
          { task: 'Yönetici geri bildirimi ve KPI hedeflerine uyumunu analiz et', is_completed: false },
          { task: 'Devam veya fesih kararını 60. gün dolmadan önce yazılı olarak tebliğ et', is_completed: false }
        ],
        ikon: '👥',
        renk: '#E0E7FF',
        anomali_notu: '2 aylık yasal deneme süresi dolmadan önce (45. günde) değerlendirme tamamlanmalıdır; 60 gün aşılırsa standart fesih hükümleri devreye girer.',
        sesli_fisilti: 'Deneme süresi için 45. gün yönetici performans değerlendirme formu planlandı.'
      };
    }

    // İşe Giriş (T-1 gün öncesi SGK zorunluluğu)
    return {
      baslik: 'SGK İşe Giriş & Özlük Dosyası',
      zaman: 'T-1 Gün Önce (SGK Bildirge Zorunluluğu)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'KIRMIZI ALARM: İşe başlama tarihinden en az 1 gün önce SGK işe giriş bildirgesini onayla', is_completed: false },
        { task: 'İş sözleşmesi, KVKK açık rıza metni ve zimmet teslim formunu ıslak imzalat', is_completed: false },
        { task: 'Sağlık raporu, adli sicil kaydı ve mezuniyet belgelerini özlük dosyasına tak', is_completed: false },
        { task: 'İşe giriş tarihinden 45 gün sonrasına \'2 Aylık Deneme Süresi Değerlendirme\' hatırlatması kur', is_completed: false }
      ],
      ikon: '👥',
      renk: '#E0E7FF',
      anomali_notu: 'SGK işe giriş bildirgesi işe başlama tarihinden en az 1 gün önce verilmelidir (İnşaat ve balıkçılık hariç); aksi takdirde asgari ücret tutarında ceza kesilir.',
      sesli_fisilti: 'T-1 gün öncesi SGK işe giriş bildirgesi ve 45. gün deneme süresi takibi kuruldu.'
    };
  }

  // 3. KUAFÖR & GÜZELLİK (Oryal/Saç Açma 35-40 dk, 15. dk Elastikiyet, Sterilizasyon & Stok)
  const isBleachOrColor = lower.includes('oryal') || lower.includes('açma') || lower.includes('acma') || lower.includes('röfle') || lower.includes('rofle') || lower.includes('boya') || lower.includes('keratin') || lower.includes('elastikiyet');

  if (isBleachOrColor) {
    const timerDue = new Date(baseDate);
    timerDue.setMinutes(timerDue.getMinutes() + 40); // 40 dk maksimum açma süresi

    return {
      baslik: 'Saç Açma (Oryal) & Boya Süreci',
      zaman: '40 Dk Maksimum (Oryal Sayacı)',
      tarih_iso: timerDue.toISOString(),
      hazirlik_zamani: '15. Dakika (Elastikiyet Testi)',
      hazirlik_iso: new Date(baseDate.getTime() + 15 * 60 * 1000).toISOString(),
      action_items: [
        { task: '15. Dakika: Saç tutamını çekerek elastikiyet ve kopma kontrolü yap (Kritik ara denetim)', is_completed: false },
        { task: '35-40. Dakika: Açılma tonunu kontrol et ve saç derisinde yanma/ısı artışı varsa hemen yıkamaya al', is_completed: false },
        { task: 'Randevu çizelgesine işlem ve kurutma için 45 dakikalık tampon süre ekle', is_completed: false },
        { task: 'İşlem bitiminde asidik ph sabitleyici ve keratin bakım maskesi uygula', is_completed: false }
      ],
      ikon: '✂️',
      renk: '#FCE7F3',
      anomali_notu: 'Oryal saçta 40 dakikadan fazla bekletilmemelidir; 15. dakikada elastikiyet kontrolü yapılmazsa kimyasal yanma ve kopma riski oluşur.',
      sesli_fisilti: 'Oryal açma için 40 dk sayaç ve 15. dakika elastikiyet kontrol adımı başlatıldı.'
    };
  }

  // Kuaför Genel & Kapanış Rutini
  return {
    baslik: 'Kuaför Gün Sonu & Sterilizasyon',
    zaman: 'Gün Sonu Kapanış',
    tarih_iso: baseDate.toISOString(),
    action_items: [
      { task: 'Kullanılan makas, ustura ve fırçaları UV sterilizatör ve dezenfektan sıvısına koy', is_completed: false },
      { task: 'Tek kullanımlık havlu, boya önlüğü ve eldiven sarf malzeme stok sayımını yap', is_completed: false },
      { task: 'Boya ve oksidan tüplerinin kapaklarını sıkıca kapatıp serin dolaba diz', is_completed: false },
      { task: 'Yarınki randevular için kimyasal işlem süre tamponlarını doğrula', is_completed: false }
    ],
    ikon: '✂️',
    renk: '#FCE7F3',
    anomali_notu: 'Hijyen yönetmeliği gereği kesici ve temaslı aletler her müşteri sonrası ve gün sonunda dezenfekte edilmelidir.',
    sesli_fisilti: 'Kuaför gün sonu sterilizasyon ve sarf malzeme stok sayım listesi oluşturuldu.'
  };
}

export function parseAcademicStudentSuiteNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isStudent = 
    lower.includes('vize') || lower.includes('final') || lower.includes('büt') || lower.includes('bütünleme') ||
    lower.includes('quiz') || lower.includes('ara sınav') || lower.includes('ara sinav') || lower.includes('mazeret sınavı') ||
    lower.includes('sınav') || lower.includes('sinav') ||
    lower.includes('ödev') || lower.includes('odev') || lower.includes('proje teslim') || lower.includes('lms') ||
    lower.includes('turnitin') || lower.includes('intihal') || lower.includes('rapor teslim') || lower.includes('makale ödev') ||
    lower.includes('devamsızlık') || lower.includes('devamsizlik') ||
    lower.includes('ders kaydı') || lower.includes('ders kaydi') || lower.includes('ders seç') || lower.includes('ders sec') ||
    lower.includes('add-drop') || lower.includes('add drop') || lower.includes('obs') || lower.includes('öys') || lower.includes('oys') ||
    lower.includes('katkı payı') || lower.includes('katki payi') || lower.includes('harç') || lower.includes('harc') ||
    lower.includes('kyk') || lower.includes('burs') || lower.includes('gano') || lower.includes('transkript');

  if (!isStudent) return null;

  // 1. SINAV KAMPI (TERSİNE ÇALIŞMA ZİNCİRİ: T-5, T-2, T-1)
  if (lower.includes('vize') || lower.includes('final') || lower.includes('büt') || lower.includes('bütünleme') || lower.includes('quiz') || lower.includes('ara sınav') || lower.includes('ara sinav') || lower.includes('sınav') || lower.includes('sinav')) {
    let examName = 'Sınav Hazırlık Kampı';
    if (lower.includes('vize')) examName = 'Vize Sınavı Kampı';
    else if (lower.includes('final')) examName = 'Final Sınavı Kampı';
    else if (lower.includes('büt') || lower.includes('bütünleme')) examName = 'Bütünleme Sınavı Kampı';
    else if (lower.includes('quiz')) examName = 'Quiz Hazırlık Kampı';

    // Zaman ve tarih kestirimi
    let zamanStr = 'Sınav Tarihi';
    let examIso = baseDate.toISOString();

    if (lower.includes('haftaya salı') || lower.includes('haftaya sali')) {
      const target = new Date(baseDate);
      const currentDay = target.getDay();
      const daysUntilNextTuesday = (9 - currentDay) % 7 + 7;
      target.setDate(target.getDate() + daysUntilNextTuesday);
      target.setHours(10, 0, 0, 0);
      zamanStr = 'Haftaya Salı 10:00';
      examIso = target.toISOString();
    } else if (lower.includes('yarın') || lower.includes('yarin')) {
      const target = new Date(baseDate);
      target.setDate(target.getDate() + 1);
      target.setHours(10, 0, 0, 0);
      zamanStr = 'Yarın 10:00';
      examIso = target.toISOString();
    }

    return {
      baslik: examName,
      zaman: zamanStr,
      tarih_iso: examIso,
      hazirlik_zamani: 'T-5 Gün (Soru ve Not Kampı)',
      hazirlik_iso: examIso,
      action_items: [
        { task: 'T-5 Gün: Ders notlarını toparla, eksik slaytları tamamla ve çıkmış sınav sorularını tara', is_completed: false },
        { task: 'T-2 Gün: Özet formül kağıdı çıkar ve soru çözüm kampı yap', is_completed: false },
        { task: 'T-1 Gün (19:00): Sınav salonu, optik kurşun kalem, silgi ve öğrenci kimlik kartını hazırla', is_completed: false }
      ],
      ikon: '🎓',
      renk: '#DDD6FE',
      anomali_notu: 'Sınav başarı zincirinde son gece çalışma yerine T-2 özet formül kampı ve T-1 salon/evrak teyidi başarı oranını %40 artırır.',
      sesli_fisilti: 'Sınav için T-5 ders notları, T-2 soru kampı ve T-1 salon hazırlık zinciri oluşturuldu.'
    };
  }

  // 2. ÖDEV, RAPOR VE PROJE TESLİMLERİ (LMS / TURNITIN)
  if (lower.includes('ödev') || lower.includes('odev') || lower.includes('proje teslim') || lower.includes('lms') || lower.includes('turnitin') || lower.includes('intihal') || lower.includes('rapor teslim') || lower.includes('makale ödev')) {
    return {
      baslik: 'Ödev & Proje Teslim Takvimi',
      zaman: 'Teslim Tarihi (LMS / Turnitin)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Teslimden 24 Saat Önce (Turnitin)',
      hazirlik_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Teslimden 24 saat önce: Turnitin/intihal benzerlik raporu al ve kaynakçayı APA formatında kontrol et', is_completed: false },
        { task: 'Son 3 saat: PDF formatında LMS sistemine yükle ve teslim makbuzunu kaydet', is_completed: false },
        { task: 'Danışman/Ders hocası proje yönergesi ve sayfa sınırları kontrolü', is_completed: false }
      ],
      ikon: '🎓',
      renk: '#DDD6FE',
      anomali_notu: 'LMS sistemlerinde teslim saatindeki sunucu yoğunluğunu önlemek için dosya en az 3 saat önceden yüklenip makbuz kaydedilmelidir.',
      sesli_fisilti: 'Teslimden 24 saat öncesine Turnitin kontrolü ve son 3 saate LMS yükleme görevi kuruldu.'
    };
  }

  // 3. DEVAMSIZLIK & YOKLAMA
  if (lower.includes('devamsızlık') || lower.includes('devamsizlik')) {
    return {
      baslik: 'Devamsızlık & Yoklama Denetimi',
      zaman: '%30 Yasal Devamsızlık Eşiği',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Dönemlik %30 yasal devamsızlık sınırını (Kritik eşik: 12 ders saati / 4 hafta) denetle', is_completed: false },
        { task: 'Hocadan ve OBS üzerinden güncel yoklama durumunu teyit et', is_completed: false },
        { task: 'Gerekiyorsa sağlık raporunu 5 iş günü içinde bölüm sekreterliğine ver', is_completed: false }
      ],
      ikon: '🎓',
      renk: '#DDD6FE',
      anomali_notu: '%30 yasal devamsızlık sınırı aşıldığında öğrenci NA (Devamsızlıktan Kaldı) notu alır.',
      sesli_fisilti: '%30 yasal devamsızlık sınırı ve yoklama denetim adımları oluşturuldu.'
    };
  }

  // 4. DERS KAYDI & OBS / ADD-DROP / HARÇ
  if (lower.includes('ders kaydı') || lower.includes('ders kaydi') || lower.includes('ders seç') || lower.includes('ders sec') || lower.includes('add-drop') || lower.includes('add drop') || lower.includes('obs') || lower.includes('öys') || lower.includes('oys') || lower.includes('harç') || lower.includes('harc') || lower.includes('katkı payı') || lower.includes('katki payi')) {
    return {
      baslik: 'OBS Ders Kaydı & Danışman Onayı',
      zaman: 'Kayıt Saatinden 15 Dk Önce',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: '15 Dk Önce (Sisteme Giriş)',
      hazirlik_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Ders kayıt saatinden 15 dk önce: ÖYS/OBS sistemine giriş ve harç/katkı payı teyidi', is_completed: false },
        { task: 'Kontenjan dolmadan zorunlu ve seçmeli dersleri sepete ekle', is_completed: false },
        { task: 'Danışman onayına gönder ve kayıt onay çıktısını sakla', is_completed: false }
      ],
      ikon: '🎓',
      renk: '#DDD6FE',
      anomali_notu: 'Ders kayıtlarında danışman onayı verilmeden kayıt kesinleşmez.',
      sesli_fisilti: 'Ders kayıt saatinden 15 dakika öncesine OBS hazırlık ve danışman onay adımları kuruldu.'
    };
  }

  // 5. KYK / BURS / GANO
  return {
    baslik: 'KYK Burs / Yurt & Başarı Takibi',
    zaman: 'Dönem Sonu / Burs Periyodu',
    tarih_iso: baseDate.toISOString(),
    action_items: [
      { task: 'KYK yurt/burs taahhütname onayını e-Devlet üzerinden tamamla', is_completed: false },
      { task: 'Burs devamı için dönem sonu GANO / transkript başarı kriterini (Min 2.00) kontrol et', is_completed: false },
      { task: 'Ziraat Genç Kart hesap hareketleri ve burs yatış gününü takip et', is_completed: false }
    ],
    ikon: '🎓',
    renk: '#DDD6FE',
    anomali_notu: 'KYK bursunun krediye dönmemesi için GANO\'nun 2.00 altına düşmemesi gerekir.',
    sesli_fisilti: 'KYK burs/yurt taahhüt ve başarı takip adımları oluşturuldu.'
  };
}

export function parsePersonalRoutineCareNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isPersonalRoutine = 
    lower.includes('taahhüt') || lower.includes('taahhut') || lower.includes('abonelik') || lower.includes('cayma') ||
    lower.includes('vodafone') || lower.includes('turkcell') || lower.includes('türk telekom') || lower.includes('turk telekom') ||
    lower.includes('superonline') || lower.includes('digiturk') || lower.includes('netflix') ||
    lower.includes('gss') || lower.includes('gelir testi') || lower.includes('işkur') || lower.includes('iskur') ||
    lower.includes('işsizlik maaşı') || lower.includes('issizlik maasi') || lower.includes('iş arayan') || lower.includes('is arayan') ||
    lower.includes('su arıtma') || lower.includes('su aritma') || lower.includes('filtre değişim') || lower.includes('filtre degisim') ||
    lower.includes('kombi bakım') || lower.includes('klima bakım') || lower.includes('klima temiz') ||
    lower.includes('derin dondurucu') || lower.includes('buz çöz') || lower.includes('buz coz') || lower.includes('defrost') ||
    lower.includes('ecza dolab') || lower.includes('kira') || lower.includes('aidat') ||
    lower.includes('apartman aidat') || lower.includes('bina aidat') ||
    (lower.includes('fatura') && (lower.includes('öde') || lower.includes('ode') || lower.includes('elektrik') || lower.includes('su') || lower.includes('doğalgaz') || lower.includes('dogalgaz') || lower.includes('internet')));

  if (!isPersonalRoutine) return null;

  // 1. ABONELİK VE TAAHHÜT BİTİŞ TAKİBİ (15 GÜN KALA)
  if (lower.includes('taahhüt') || lower.includes('taahhut') || lower.includes('abonelik') || lower.includes('cayma') || lower.includes('vodafone') || lower.includes('turkcell') || lower.includes('türk telekom') || lower.includes('turk telekom') || lower.includes('superonline') || lower.includes('digiturk') || lower.includes('netflix') || (lower.includes('sigorta') && lower.includes('yenile'))) {
    const alertDue = new Date(baseDate);
    alertDue.setDate(alertDue.getDate() + 15);

    return {
      baslik: 'Abonelik & Taahhüt Yenileme',
      zaman: 'Taahhüt Bitimine 15 Gün Kala',
      tarih_iso: alertDue.toISOString(),
      hazirlik_zamani: '15 Gün Önce (Tarife Araştırması)',
      hazirlik_iso: alertDue.toISOString(),
      action_items: [
        { task: 'Taahhüt bitimine 15 gün kala: Cayma bedelsiz tarife değişikliği ve alternatif paket araştırması yap', is_completed: false },
        { task: 'Mevcut operatörden sadakat indirimi veya taahhüt yenileme teklifi iste', is_completed: false },
        { task: 'Yeni pakete geçiş durumunda modem/ekipman iade protokolünü denetle', is_completed: false }
      ],
      ikon: '🏠',
      renk: '#F1F5F9',
      anomali_notu: 'Taahhüt bittiğinde tarife otomatik olarak taahhütsüz fahiş fiyata geçer; son 15 gün cayma bedelsiz işlem dönemidir.',
      sesli_fisilti: 'Taahhüt bitimine 15 gün kala cayma bedelsiz tarife araştırma alarmı kuruldu.'
    };
  }

  // 2. KAMUSAL HAK VE BAŞVURU TAKİBİ (GSS, İŞKUR)
  if (lower.includes('gss') || lower.includes('gelir testi') || lower.includes('işkur') || lower.includes('iskur') || lower.includes('işsizlik maaşı') || lower.includes('issizlik maasi') || lower.includes('iş arayan') || lower.includes('is arayan')) {
    return {
      baslik: 'GSS & İŞKUR Başvuru Takibi',
      zaman: 'Yasal Takip / Başvuru',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'e-Devlet üzerinden GSS prim borcu ve tescil durumunu kontrol et (Gerekirse Kaymakamlık Gelir Testi)', is_completed: false },
        { task: 'İŞKUR iş arayan profil durumunu ve aktif kayıt yenileme periyodunu güncelle', is_completed: false },
        { task: 'İşsizlik ödeneği başvuru şartları (Son 3 yılda 600 gün prim ve son 120 gün) kontrolü', is_completed: false }
      ],
      ikon: '🏠',
      renk: '#F1F5F9',
      anomali_notu: 'İŞKUR kayıtları düzenli güncellenmezse pasife düşer; GSS prim borcu gecikirse sağlık hizmeti kesintiye uğrayabilir.',
      sesli_fisilti: 'GSS gelir testi ve İŞKUR kayıt yenileme takip adımları oluşturuldu.'
    };
  }

  // 3. DÜZENSİZ EV DÖNGÜLERİ (PERİYODİK LOG: SU ARITMA 180G, KOMBİ/KLİMA 365G, DONDURUCU 90G, ECZA DOLABI 180G)
  if (lower.includes('su arıtma') || lower.includes('su aritma') || lower.includes('filtre')) {
    const due180 = new Date(baseDate);
    due180.setDate(due180.getDate() + 180);

    return {
      baslik: 'Su Arıtma Filtre Değişimi',
      zaman: '6 Ayda Bir (180 Gün)',
      tarih_iso: due180.toISOString(),
      periyodik: { tip: 'aylik', aralik_gun: 180, bir_sonraki_tarih_iso: due180.toISOString() },
      action_items: [
        { task: 'Sediman, granül aktif karbon ve blok karbon ön filtrelerini değiştir', is_completed: false },
        { task: 'Membran filtre ve post karbon tatlandırıcı filtre geçirgenliğini test et', is_completed: false },
        { task: 'TDS metre ile arıtılmış su ppm değerini ölç ve sızıntı kontrolü yap', is_completed: false }
      ],
      ikon: '🏠',
      renk: '#F1F5F9',
      anomali_notu: 'Su arıtma ön filtreleri 6 ayda bir değiştirilmezse membran tıkanır ve su kalitesi düşer.',
      sesli_fisilti: '6 aylık su arıtma filtre değişim ve TDS kontrol döngüsü ajandaya işlendi.'
    };
  }

  if (lower.includes('kombi') || lower.includes('klima')) {
    const due365 = new Date(baseDate);
    due365.setDate(due365.getDate() + 365);

    return {
      baslik: 'Kombi & Klima Periyodik Bakımı',
      zaman: 'Yılda Bir (365 Gün)',
      tarih_iso: due365.toISOString(),
      periyodik: { tip: 'yillik', aralik_gun: 365, bir_sonraki_tarih_iso: due365.toISOString() },
      action_items: [
        { task: 'Kombi su basıncını 1.5 Bar seviyesine ayarla ve genleşme tankı havasını kontrol et', is_completed: false },
        { task: 'Klima iç ünite antibakteriyel filtre temizliği ve dış ünite serpantin kontrolü', is_completed: false },
        { task: 'Yetkili servis bakım formunu kaşeli olarak sakla', is_completed: false }
      ],
      ikon: '🏠',
      renk: '#F1F5F9',
      anomali_notu: 'Yıllık kombi ve klima bakımı yakıt tüketimini %15-20 azaltır ve cihaz ömrünü uzatır.',
      sesli_fisilti: 'Yıllık kombi ve klima periyodik bakım döngüsü ajandaya işlendi.'
    };
  }

  if (lower.includes('derin dondurucu') || lower.includes('buz çöz') || lower.includes('buz coz') || lower.includes('defrost')) {
    const due90 = new Date(baseDate);
    due90.setDate(due90.getDate() + 90);

    return {
      baslik: 'Derin Dondurucu Buz Çözme',
      zaman: '3 Ayda Bir (90 Gün)',
      tarih_iso: due90.toISOString(),
      periyodik: { tip: 'aylik', aralik_gun: 90, bir_sonraki_tarih_iso: due90.toISOString() },
      action_items: [
        { task: 'Defrost: Cihazın fişini çek ve buzlanmayı doğal erimeye bırak (Kesici alet kullanma)', is_completed: false },
        { task: 'Tahliye kanalını temizle, iç yüzeyi karbonatlı suyla dezenfekte et', is_completed: false },
        { task: 'Dondurulmuş gıdaların son tüketim tarihlerini kontrol edip etiket rotasyonu yap', is_completed: false }
      ],
      ikon: '🏠',
      renk: '#F1F5F9',
      anomali_notu: 'Karlanma ve buzlanma motor yükünü artırarak elektrik sarfiyatını yükseltir; 90 günde bir eritilmelidir.',
      sesli_fisilti: '3 aylık derin dondurucu defrost ve gıda rotasyon döngüsü kuruldu.'
    };
  }

  if (lower.includes('ecza dolab')) {
    const due180 = new Date(baseDate);
    due180.setDate(due180.getDate() + 180);

    return {
      baslik: 'Ev Ecza Dolabı Miad Kontrolü',
      zaman: '6 Ayda Bir (180 Gün)',
      tarih_iso: due180.toISOString(),
      periyodik: { tip: 'aylik', aralik_gun: 180, bir_sonraki_tarih_iso: due180.toISOString() },
      action_items: [
        { task: 'Miadı (SKT) geçmiş tüm ilaç, vitamin ve merhemleri ayıkla ve güvenli imha et', is_completed: false },
        { task: 'Açıldıktan sonra 30 gün geçerli göz damlaları ve şurupların açılış tarihini kontrol et', is_completed: false },
        { task: 'İlk yardım malzemelerini (steril gazlı bez, batikon, yara bandı, yanık kremi) tamamla', is_completed: false }
      ],
      ikon: '🏠',
      renk: '#F1F5F9',
      anomali_notu: 'Açılmış göz damlaları ve antibiyotik şuruplar 30 günden sonra bakteri üretebilir; 6 ayda bir ecza dolabı ayıklanmalıdır.',
      sesli_fisilti: '6 aylık ecza dolabı miad kontrolü ve ilk yardım stok döngüsü kuruldu.'
    };
  }

  // 4. FATURA, KİRA, AİDAT VE BÜTÇE KORUMASI
  if (lower.includes('kira') || lower.includes('aidat') || lower.includes('apartman') || lower.includes('bina aidat')) {
    const rentDue = new Date(baseDate);
    rentDue.setDate(5); // Her ayın 1-5'i
    rentDue.setHours(12, 0, 0, 0);

    return {
      baslik: lower.includes('kira') ? 'Ev Kirası Ödemesi' : 'Apartman Aidatı Ödemesi',
      zaman: 'Her Ayın 1-5\'i Arası',
      tarih_iso: rentDue.toISOString(),
      action_items: [
        { task: 'Banka havalesi ile açıklama kısmına \'Kira/Aidat Bedeli\' belirterek ödemeyi yap', is_completed: false },
        { task: 'Banka dekontunu dijital arşive kaydet ve ev sahibine/yöneticiye ilet', is_completed: false },
        { task: 'Gecikme zammı ve cezai şart riskini önle', is_completed: false }
      ],
      ikon: '🏠',
      renk: '#F1F5F9',
      anomali_notu: 'Kira ödemelerinde açıklama kısmına "YYYY Ayı Kira Bedeli" yazılması ve banka üzerinden yapılması yasal zorunluluktur.',
      sesli_fisilti: 'Kira ve aidat ödeme adımları her ayın 1-5\'i arasına takvimleştirildi.'
    };
  }

  // Fatura
  return {
    baslik: 'Fatura Ödeme & Gecikme Önleme',
    zaman: 'Son Ödemeden 2 Gün Önce',
    tarih_iso: baseDate.toISOString(),
    hazirlik_zamani: 'Son Ödemeden 2 Gün Önce',
    hazirlik_iso: baseDate.toISOString(),
    action_items: [
      { task: 'Son ödeme tarihinden 2 gün önce: Fatura tutarı ve otomatik ödeme limitini kontrol et', is_completed: false },
      { task: 'Ödemeyi gerçekleştir ve dekont/referans numarasını sakla', is_completed: false },
      { task: 'Açma-kapama bedeli ve gecikme faizi riskini önle', is_completed: false }
    ],
    ikon: '🏠',
    renk: '#F1F5F9',
    anomali_notu: 'Faturalar son ödeme gününden en az 2 gün önce ödenerek hafta sonu takas gecikmeleri ve açma-kapama masrafları önlenmelidir.',
    sesli_fisilti: 'Fatura için son ödemeden 2 gün öncesine gecikme zammı önleme alarmı kuruldu.'
  };
}

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

// Metin içindeki maddeleri, yeni satırları veya ayıraçları kontrol listesine dönüştürücü
export function parseTextToChecklist(rawText: string): { task: string; is_completed: boolean }[] {
  // 1. Yeni satırlara, tirelere, yıldızlara veya virgüllere göre parçala
  const lines = rawText
    .split(/\r?\n|(?<=[^0-9]),|(?<=[a-zA-ZğüşıöçĞÜŞİÖÇ])\s*-\s*|\s*•\s*/)
    .map(line => line.trim())
    // Liste başlığı veya boş satırları ele
    .filter(line => line.length > 1 && !line.toLowerCase().endsWith('listesi:'));

  return lines.map(line => {
    // Başındaki "1.", "-", "*", "[ ]" gibi liste işaretlerini temizle
    const cleanTask = line
      .replace(/^(\d+[\.\)]|\-|\*|•|\[\s*\])\s*/, '')
      .trim();

    return {
      task: cleanTask.charAt(0).toLocaleUpperCase('tr-TR') + cleanTask.slice(1),
      is_completed: false
    };
  });
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

  // 0. "X dakika / saat sonra", "Sabah 9", "Akşam 8'de kaldır / alarm" doğrudan tespiti
  const dailyLife = parseDailyLifeTime(text);
  if (dailyLife) {
    const targetDate = new Date(dailyLife.isoString);
    const hour = targetDate.getHours();
    const minute = targetDate.getMinutes();
    return {
      zaman: dailyLife.displayZaman,
      tarih_iso: dailyLife.isoString,
      isRecurringDay: false,
      recurringDayName: null,
      hour,
      minute,
    };
  }

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

  // 2. Saat / Vakit Tespiti (Sayısal veya metinsel)
  let hour: number | null = null;
  let minute = 0;
  let hasSpecificTime = false;

  // Zaman dilimi etiketleri
  const isEvening = /akşam|aksam/i.test(lower);
  const isNight = /gece/i.test(lower);
  const isAfternoon = /öğleden sonra|ogleden sonra/i.test(lower);
  const isMorning = /sabah/i.test(lower);
  const isNoon = /öğlen|oglen|öğle|ogle/i.test(lower);

  // Türkçe sayı kelimeleri
  const numberWords: Record<string, number> = {
    'bir': 1, 'iki': 2, 'üç': 3, 'uc': 3, 'dört': 4, 'dort': 4,
    'beş': 5, 'bes': 5, 'altı': 6, 'alti': 6, 'yedi': 7, 'sekiz': 8,
    'dokuz': 9, 'on': 10, 'on bir': 11, 'onbir': 11, 'on iki': 12, 'oniki': 12,
    'yirmi': 20, 'yirmi bir': 21, 'yirmibir': 21, 'yirmi iki': 22, 'yirmi üç': 23
  };

  // Format: "21:00", "21.00", "9:30"
  const colonMatch = lower.match(/\b(\d{1,2})[:.](\d{2})\b/);
  if (colonMatch) {
    hour = parseInt(colonMatch[1], 10);
    minute = parseInt(colonMatch[2], 10);
    hasSpecificTime = true;
    hasDate = true;
  }

  // Format: "akşam 9", "saat 9", "9da", "9'da", "9 da"
  if (hour === null) {
    const digitMatch = lower.match(/(?:saat\s*|akşam\s*|aksam\s*|sabah\s*|gece\s*|öğlen\s*)(\d{1,2})(?:\s*['’]?(?:da|de|ta|te))?/i) ||
      lower.match(/\b(\d{1,2})\s*(?:['’]?(?:da|de|ta|te))\b/i);
    if (digitMatch) {
      hour = parseInt(digitMatch[1], 10);
      hasSpecificTime = true;
      hasDate = true;
    }
  }

  // Format: Metinsel saat (dokuzda, sekizde, on birde)
  if (hour === null) {
    for (const [word, val] of Object.entries(numberWords)) {
      const reg = new RegExp(`\\b(?:saat\\s*)?${word}(?:['’]?(?:da|de|ta|te))?\\b`, 'i');
      if (reg.test(lower)) {
        hour = val;
        hasSpecificTime = true;
        hasDate = true;
        break;
      }
    }
  }

  // 12 saat formatından 24 saat formatına kesin dönüşüm (Akşam 9 = 21:00)
  if (hour !== null) {
    if (isEvening) {
      if (hour < 12) hour += 12; // 9 -> 21, 8 -> 20
    } else if (isAfternoon) {
      if (hour < 12) hour += 12; // 3 -> 15
    } else if (isNight) {
      if (hour >= 9 && hour <= 11) hour += 12; // 10 -> 22
      else if (hour === 12) hour = 0;
    } else if (isNoon) {
      if (hour >= 1 && hour <= 3) hour += 12;
    }
  } else {
    // Sayı verilmemişse bağlamsal varsayılan saat ata
    if (isEvening) { hour = 21; minute = 0; hasSpecificTime = true; }
    else if (isNoon) { hour = 13; minute = 0; hasSpecificTime = true; }
    else if (isNight) { hour = 22; minute = 0; hasSpecificTime = true; }
    else if (isMorning) { hour = 9; minute = 0; hasSpecificTime = true; }
    else { hour = 9; minute = 0; }
  }

  // Sınır koruması
  if (hour < 0) hour = 0;
  if (hour > 23) hour = 23;
  if (minute < 0) minute = 0;
  if (minute > 59) minute = 59;

  target.setHours(hour, minute, 0, 0);

  // Gün açıkça belirtilmemişse ve hedef saat bugün için geçmişse yarına yuvarla
  const nowMs = baseDate.getTime();
  if (!hasDate && target.getTime() <= nowMs) {
    target.setDate(target.getDate() + 1);
    hasDate = true;
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  const iso = `${target.getFullYear()}-${pad(target.getMonth() + 1)}-${pad(target.getDate())}T${pad(hour)}:${pad(minute)}:00`;
  const gunIsimleri = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  const isToday = target.toDateString() === baseDate.toDateString();
  const tomorrow = new Date(baseDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = target.toDateString() === tomorrow.toDateString();

  const labelPrefix = isToday
    ? (isEvening ? 'Bu Akşam' : isMorning ? 'Bu Sabah' : 'Bugün')
    : isTomorrow
    ? (isEvening ? 'Yarın Akşam' : isMorning ? 'Yarın Sabah' : 'Yarın')
    : gunIsimleri[target.getDay()];

  const zamanStr = (hasDate || hasSpecificTime || isEvening || isMorning || isNoon || isNight)
    ? `${labelPrefix} ${pad(hour)}:${pad(minute)}`
    : null;

  return {
    zaman: zamanStr,
    tarih_iso: hasDate || hasSpecificTime || isEvening || isMorning || isNoon || isNight ? iso : null,
    isRecurringDay,
    recurringDayName,
    hour,
    minute,
  };
}

/**
 * TEMEL İLKE: KULLANICIYA YAPAY İŞ ÇIKARMA (MİKRO GÖREV KURALI)
 * 1. Tekil Alarmlar ve Hatırlatıcılar ("sabah 9'da alarm kur", "yarın 8'de kaldır", "20 dk sonra fırını kapat")
 *    - 'action_items' listesini KESİNLİKLE BOŞ BIRAK ([]).
 *    - Tersine planlama veya hazırlık alarmı türetme.
 *    - Görev tipini doğrudan alarm veya sayaç olarak belirle.
 * 2. Günlük Yaşamın 5 Temel Çekirdeği:
 *    - İlaç/Vitamin: "Akşam tansiyon ilacımı hatırlat" -> Tekil saat alarmı, alt görev yok ([]).
 *    - Ev/Mutfak: "40 dakika sonra çamaşırları as", "Ocağın altını kapat" -> Süreli sayaç alarmı ([]).
 *    - Alışveriş: "Eve gelirken ekmek ve maden suyu al" -> Basit kontrol listesi (yalnızca talep edilen ürünler).
 *    - Çöp/Rutin: "Yarın sabah çöpü çıkarmayı unutma" -> Sabah 08:00 hatırlatıcısı ([]).
 *    - Randevu: "Salı 14:30 diş hekimi" -> Sadece randevu kartı + 30 dk önce yola çıkış ([]).
 */
export function detectDailyLifeCoreOrSingleAlarm(cleanInput: string, baseDate: Date = new Date()): NotiviaSimpleNote | null {
  let lower = cleanInput.toLowerCase().trim();
  
  // Kelime bazlı göreceli süreleri dakikaya dönüştür
  lower = lower
    .replace(/yarım\s*saat\s*sonra/gi, '30 dakika sonra')
    .replace(/çeyrek\s*saat\s*sonra/gi, '15 dakika sonra')
    .replace(/bir\s*buçuk\s*saat\s*sonra/gi, '90 dakika sonra')
    .replace(/uyandır/gi, 'alarm kur');

  const pad = (n: number) => String(n).padStart(2, '0');

  // İstisna: Sadece karmaşık ve içinde gerçekten hazırlık gerektiren durumlarda alt adımlar üret:
  // Örn: "haftaya vizeler başlıyor", "ameliyat", "implant cerrahisi", "pasaport", "araç muayenesi"
  if (
    lower.includes('vize') ||
    lower.includes('final') ||
    lower.includes('büt') ||
    lower.includes('ameliyat') ||
    lower.includes('cerrahi') ||
    lower.includes('yatış') ||
    lower.includes('yatis') ||
    lower.includes('pasaport') ||
    lower.includes('vize başvuru') ||
    lower.includes('muayene istasyonu') ||
    lower.includes('tüvtürk') ||
    lower.includes('tuvturk')
  ) {
    return null;
  }

  // -------------------------------------------------------------
  // 1. GÜNLÜK YAŞAM ÇEKİRDEĞİ 1: İLAÇ / VİTAMİN
  // Örn: "Akşam tansiyon ilacımı hatırlat", "Sabah vitaminimi al", "Gece magnezyumu unutma"
  // Kural: Tekil saat alarmı, alt görev KESİNLİKLE BOŞ ([]).
  // -------------------------------------------------------------
  const isMedicine = 
    (lower.includes('tansiyon ilac') || lower.includes('tansiyon hap') ||
     lower.includes('şeker ilac') || lower.includes('seker ilac') ||
     lower.includes('vitamin') || lower.includes('aspirin') ||
     lower.includes('magnezyum') || lower.includes('demir ilac') ||
     lower.includes('b12') || lower.includes('d vitamini') ||
     lower.includes('omega 3') || lower.includes('omega-3') ||
     (lower.includes('ilac') && !lower.includes('ilaçlama')) ||
     lower.includes('hapımı') || lower.includes('hapimi') || lower.includes('hapı iç') || lower.includes('hapi ic')) &&
     // Çoklu ilaç rejimi değilse (örn. "sabah aç şu, öğlen bu" değilse)
     !((lower.includes('sabah') && lower.includes('öğlen')) || (lower.includes('sabah') && lower.includes('akşam') && lower.includes('gece')));

  if (isMedicine) {
    let baslik = 'İlaç Hatırlatıcısı';
    if (lower.includes('tansiyon')) baslik = 'Tansiyon İlacı';
    else if (lower.includes('vitamin')) baslik = 'Günlük Vitamin';
    else if (lower.includes('magnezyum')) baslik = 'Magnezyum';
    else if (lower.includes('aspirin')) baslik = 'Aspirin';
    else if (lower.includes('şeker') || lower.includes('seker')) baslik = 'Şeker İlacı';

    let hour = 19;
    let minute = 30;
    let zaman = 'Bugün 19:30';

    if (lower.includes('sabah')) {
      hour = 9;
      minute = 0;
      zaman = 'Sabah 09:00';
    } else if (lower.includes('öğlen') || lower.includes('oglen')) {
      hour = 13;
      minute = 30;
      zaman = 'Öğlen 13:30';
    } else if (lower.includes('gece') || lower.includes('yatarken')) {
      hour = 22;
      minute = 30;
      zaman = 'Gece 22:30';
    } else if (lower.includes('akşam') || lower.includes('aksam')) {
      hour = 19;
      minute = 30;
      zaman = 'Akşam 19:30';
    }

    // Belirli bir saat söylenmişse (örn: 20:00 veya 8'de)
    const timeMatch = lower.match(/(\d{1,2})(?::(\d{2}))?\s*(?:'de|'da|'te|'ta|de|da)/);
    if (timeMatch) {
      hour = parseInt(timeMatch[1], 10);
      minute = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
      if ((lower.includes('akşam') || lower.includes('aksam')) && hour < 12) hour += 12;
      zaman = `Bugün ${pad(hour)}:${pad(minute)}`;
    }

    const targetDate = new Date(baseDate);
    targetDate.setHours(hour, minute, 0, 0);
    if (targetDate.getTime() <= baseDate.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1);
      zaman = `Yarın ${pad(hour)}:${pad(minute)}`;
    }

    return {
      baslik,
      zaman,
      tarih_iso: targetDate.toISOString(),
      action_items: [], // KESİNLİKLE BOŞ
      ikon: '💊',
      renk: '#F3E8FF', // Pastel Mor
      deviceNotificationEnabled: true,
      isAlarm: true,
      isMicroTask: true,
      anomali_notu: '💊 İlacınızı belirtilen saatte bir bardak su ile alınız.',
      sesli_fisilti: `${baslik} için ${zaman} alarmı kuruldu.`
    };
  }

  // -------------------------------------------------------------
  // 2. GÜNLÜK YAŞAM ÇEKİRDEĞİ 2: EV / MUTFAK (Süreli Sayaç Alarmı)
  // Örn: "40 dakika sonra çamaşırları as", "Ocağın altını kapat", "20 dk sonra fırını kapat"
  // Kural: Süreli sayaç alarmı, alt görev KESİNLİKLE BOŞ ([]).
  // -------------------------------------------------------------
  const isKitchenHome = 
    lower.includes('çamaşır') || lower.includes('camasir') ||
    lower.includes('ocağın altı') || lower.includes('ocagin alti') || lower.includes('ocağı kapat') || lower.includes('ocagi kapat') || lower.includes('ocak') ||
    lower.includes('fırını kapat') || lower.includes('firini kapat') || lower.includes('fırından al') || lower.includes('firindan al') || lower.includes('fırın') ||
    lower.includes('çayın altı') || lower.includes('cayin alti') || lower.includes('çayı demle') || lower.includes('cayi demle') ||
    lower.includes('suyu kapat') || lower.includes('ütü fiş') || lower.includes('utu fis');

  // Geri sayım süresi tespiti ("40 dakika sonra", "20 dk sonra", vb.)
  const relativeMatch = lower.match(/(\d+)\s*(dakika|dk|saat)\s*sonra/);
  
  if (isKitchenHome || relativeMatch) {
    let minutes = 20; // Varsayılan mutfak/sayaç süresi
    let unit = 'dakika';
    let hasExplicitDuration = false;

    if (relativeMatch) {
      const val = parseInt(relativeMatch[1], 10);
      unit = relativeMatch[2].startsWith('saat') ? 'saat' : 'dakika';
      minutes = unit === 'saat' ? val * 60 : val;
      hasExplicitDuration = true;
    } else if (lower.includes('çamaşır') || lower.includes('camasir')) {
      minutes = 45;
    } else if (lower.includes('ocak') || lower.includes('ocağın altı')) {
      minutes = 15;
    } else if (lower.includes('fırın') || lower.includes('firin')) {
      minutes = 25;
    } else if (lower.includes('çay') || lower.includes('cay')) {
      minutes = 15;
    }

    const targetDate = new Date(baseDate.getTime() + minutes * 60 * 1000);
    const displayZaman = `${hasExplicitDuration ? relativeMatch![1] + ' ' + relativeMatch![2] : minutes + ' dakika'} sonra (${pad(targetDate.getHours())}:${pad(targetDate.getMinutes())})`;

    let baslik = 'Zamanlayıcı';
    let ikon = '⏱️';

    if (lower.includes('çamaşır') || lower.includes('camasir')) {
      baslik = 'Çamaşırları As';
      ikon = '🧺';
    } else if (lower.includes('ocak') || lower.includes('ocağın altı') || lower.includes('ocagin alti')) {
      baslik = 'Ocağın Altını Kapat';
      ikon = '🍳';
    } else if (lower.includes('fırın') || lower.includes('firin')) {
      baslik = 'Fırını Kapat';
      ikon = '🥧';
    } else if (lower.includes('çay') || lower.includes('cay')) {
      baslik = 'Çayı Kapat / Demle';
      ikon = '🫖';
    } else {
      // Genel sayaç / alarm başlığını temizle
      let clean = cleanInput
        .replace(/(\d+)\s*(dakika|dk|saat)\s*sonra/gi, '')
        .replace(/\b(alarm|kur|kaldır|kaldir|hatırlat|hatirlat|bana|beni|bir|haber ver|ara)\b/gi, '')
        .trim();
      if (clean.length > 2) {
        baslik = clean.charAt(0).toLocaleUpperCase('tr-TR') + clean.slice(1);
      } else {
        baslik = `${minutes} Dk Sayaç`;
      }
    }

    return {
      baslik: baslik.slice(0, 32),
      zaman: displayZaman,
      tarih_iso: targetDate.toISOString(),
      sureDakika: minutes,
      action_items: [], // KESİNLİKLE BOŞ
      ikon,
      renk: '#FEF3C7',
      deviceNotificationEnabled: true,
      isAlarm: true,
      isMicroTask: true,
      anomali_notu: `⏱️ ${displayZaman} için geri sayım sayacı devrede.`,
      sesli_fisilti: `${baslik} için ${displayZaman} sayacı başlatıldı.`
    };
  }

  // -------------------------------------------------------------
  // 1.B: TEKİL SAAT ALARMLARI ("sabah 9'da alarm kur", "yarın 8'de kaldır", "saat 7'de beni uyandır")
  // -------------------------------------------------------------
  const isExplicitAlarmCommand = 
    lower.includes('alarm') || lower.includes('kaldır') || lower.includes('kaldir') ||
    lower.includes('uyandır') || lower.includes('uyandir');

  if (isExplicitAlarmCommand) {
    const dailyTime = parseDailyLifeTime(cleanInput);
    if (dailyTime) {
      let cleanTitle = cleanInput
        .replace(/(sabah|öğlen|akşam|gece)?\s*(\d{1,2})(?::(\d{2}))?\s*(?:'da|'de|'te|'ta|da|de|alarm|kaldır|kaldir|hatırlat|hatirlat|uyandır|uyandir)?/gi, '')
        .replace(/\b(alarm|kaldır|kaldir|hatırlat|hatirlat|uyandır|uyandir|kur|bana|beni|bir)\b/gi, '')
        .trim();

      if (!cleanTitle || cleanTitle.length < 2) {
        cleanTitle = 'Uyanış Alarmı';
      } else {
        cleanTitle = cleanTitle.charAt(0).toLocaleUpperCase('tr-TR') + cleanTitle.slice(1);
      }

      return {
        baslik: cleanTitle.slice(0, 32),
        zaman: dailyTime.displayZaman,
        tarih_iso: dailyTime.isoString,
        action_items: [], // KESİNLİKLE BOŞ
        ikon: '⏰',
        renk: '#FEF3C7',
        deviceNotificationEnabled: true,
        isAlarm: true,
        isMicroTask: true,
        anomali_notu: `🔔 ${dailyTime.displayZaman} için alarm ve cihaz bildirimi devrede.`,
        sesli_fisilti: `${cleanTitle} için ${dailyTime.displayZaman} alarmı kuruldu.`
      };
    }
  }

  // -------------------------------------------------------------
  // 3. GÜNLÜK YAŞAM ÇEKİRDEĞİ 3: ALIŞVERİŞ (Basit Kontrol Listesi)
  // Örn: "Eve gelirken ekmek ve maden suyu al", "Marketten süt yumurta al"
  // Kural: Yalnızca istenen ürünleri içeren temiz bir kontrol listesi.
  // -------------------------------------------------------------
  const isShopping = 
    (lower.includes('eve gelirken') && lower.includes('al')) ||
    (lower.includes('gelirken') && lower.includes('al')) ||
    (lower.includes('markete gidince') && lower.includes('al')) ||
    (lower.includes('marketten') && lower.includes('al')) ||
    (lower.includes('bakkaldan') && lower.includes('al')) ||
    (lower.includes('alınacaklar') || lower.includes('alinacaklar')) ||
    (lower.includes('alınacak') && lower.includes('liste')) ||
    ((lower.includes('ekmek') || lower.includes('süt') || lower.includes('yumurta') || lower.includes('maden suyu')) && lower.includes('al'));

  if (isShopping) {
    // Liste maddelerini çıkar
    let rawItems = cleanInput
      .replace(/\b(eve gelirken|gelirken|markete gidince|marketten|bakkaldan|manavdan|pazardan|şunları|sunlari|alınacaklar|alınacak|listesi|almayı unutma|almayi unutma|al|bana|bir de|biraz)\b/gi, '')
      .trim();

    const parts = rawItems
      .split(/,|\s+ve\s+|\s+bir de\s+|\s+ile\s+|\n/gi)
      .map(p => p.trim())
      .filter(p => p.length >= 2);

    if (parts.length > 0) {
      const checklist = parts.map(p => ({
        task: p.charAt(0).toLocaleUpperCase('tr-TR') + p.slice(1),
        is_completed: false
      }));

      return {
        baslik: lower.includes('pazar') ? 'Pazar Alışverişi' : 'Alışveriş Listesi',
        zaman: lower.includes('eve gelirken') ? 'Eve Gelirken' : 'Markette',
        tarih_iso: null,
        action_items: checklist, // Sadece kullanıcının saydığı ürünler!
        ikon: '🛒',
        renk: '#DCFCE7',
        isMicroTask: true,
        anomali_notu: `🛒 ${checklist.length} parça alışveriş ürünü listelendi.`,
        sesli_fisilti: `Alışveriş listeniz ${checklist.length} ürünle hazırlandı.`
      };
    }
  }

  // -------------------------------------------------------------
  // 4. GÜNLÜK YAŞAM ÇEKİRDEĞİ 4: ÇÖP / RUTİN (Sabah 08:00 Hatırlatıcısı)
  // Örn: "Yarın sabah çöpü çıkarmayı unutma", "Çöpü çıkar", "Çöpleri at"
  // Kural: Sabah 08:00 hatırlatıcısı, alt görev KESİNLİKLE BOŞ ([]).
  // -------------------------------------------------------------
  const isTrashRoutine = 
    lower.includes('çöp') || lower.includes('cop') ||
    lower.includes('çöpleri') || lower.includes('copleri');

  if (isTrashRoutine) {
    const targetDate = new Date(baseDate);
    let hour = 8;
    let minute = 0;
    let zaman = 'Yarın Sabah 08:00';

    if (lower.includes('akşam') || lower.includes('aksam') || lower.includes('gece') || lower.includes('bu akşam')) {
      hour = 20;
      minute = 0;
      targetDate.setHours(hour, minute, 0, 0);
      zaman = 'Bu Akşam 20:00';
      if (targetDate.getTime() <= baseDate.getTime()) {
        targetDate.setDate(targetDate.getDate() + 1);
        zaman = 'Yarın Akşam 20:00';
      }
    } else {
      // Varsayılan: Yarın sabah 08:00
      targetDate.setDate(targetDate.getDate() + 1);
      targetDate.setHours(8, 0, 0, 0);
    }

    return {
      baslik: 'Çöpü Çıkar',
      zaman,
      tarih_iso: targetDate.toISOString(),
      action_items: [], // KESİNLİKLE BOŞ
      ikon: '🗑️',
      renk: '#F1F5F9',
      deviceNotificationEnabled: true,
      isAlarm: true,
      isMicroTask: true,
      anomali_notu: '🗑️ Sabah çöp kamyonu geçmeden önce kapı önüne çıkarınız.',
      sesli_fisilti: 'Çöpü çıkarma hatırlatıcısı yarın sabah 08:00 için kuruldu.'
    };
  }

  // -------------------------------------------------------------
  // 5. GÜNLÜK YAŞAM ÇEKİRDEĞİ 5: RANDEVU (Sadece Randevu Kartı + 30 Dk Önce Yola Çıkış)
  // Örn: "Salı 14:30 diş hekimi", "Salı 14:30 diş randevusu", "Yarın 15:00 doktor randevusu"
  // Kural: Sadece randevu kartı + 30 dk önce yola çıkış, alt görev KESİNLİKLE BOŞ ([]).
  // -------------------------------------------------------------
  const isAppointment = 
    lower.includes('diş hekim') || lower.includes('dis hekim') ||
    lower.includes('dişçi') || lower.includes('disci') ||
    lower.includes('diş randevu') || lower.includes('dis randevu') ||
    ((lower.includes('doktor') || lower.includes('hekim') || lower.includes('hastane') || lower.includes('sağlık ocağı')) && (lower.includes('randevu') || lower.includes('muayene')));

  if (isAppointment) {
    const temporal = parseTurkishTemporal(cleanInput, baseDate);
    const appointmentIso = temporal.tarih_iso;
    let prepIso: string | null = null;
    let zamanDisplay = temporal.zaman || 'Randevu Günü';

    if (appointmentIso) {
      try {
        const appTime = new Date(appointmentIso).getTime();
        const prepTime = new Date(appTime - 30 * 60 * 1000); // 30 dk önce
        prepIso = prepTime.toISOString();
      } catch {}
    }

    const isDentist = lower.includes('diş') || lower.includes('dis');
    const baslik = isDentist ? 'Diş Hekimi Randevusu' : 'Doktor Randevusu';
    const ikon = isDentist ? '🦷' : '🩺';

    return {
      baslik,
      zaman: zamanDisplay,
      tarih_iso: appointmentIso,
      hazirlik_zamani: '30 Dk Önce Yola Çıkış',
      hazirlik_iso: prepIso,
      action_items: [], // KESİNLİKLE BOŞ! (Yapay alt adımlar üretilmez)
      ikon,
      renk: '#E0F2FE',
      isMicroTask: true,
      deviceNotificationEnabled: true,
      anomali_notu: '🚗 30 dakika önce yola çıkış hatırlatılacaktır.',
      sesli_fisilti: `${baslik} ${zamanDisplay} için kaydedildi. 30 dakika önce yola çıkış hatırlatılacak.`
    };
  }

  return null;
}

// 2. Sözdizimsel Anlam ve Rol Çözümleyici (Özne - Nesne - Yüklem)
export function extractSimpleNoteFromText(
  input: string,
  refDatetime?: string,
  pastNotes?: any[],
  userDomain?: string
): NotiviaSimpleNote {
  const cleanInput = input.trim();
  const lower = cleanInput.toLowerCase();
  const baseDate = refDatetime ? new Date(refDatetime) : new Date();

  // ⚡ TEMEL İLKE: KULLANICIYA YAPAY İŞ ÇIKARMA (MİKRO GÖREV KURALI)
  // Tekil alarmlar, süreli sayaçlar ve 5 temel günlük yaşam çekirdeği doğrudan tespit edilir.
  const microCore = detectDailyLifeCoreOrSingleAlarm(cleanInput, baseDate);
  if (microCore) {
    return microCore;
  }

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
  let tetikleyici: { tip: 'finansal' | 'mekan' | 'kisi' | 'durum' | 'zincirleme' | 'hava' | null; sart: string; etiket: string } | null = null;
  if (lower.includes('maaş yatınca')) {
    tetikleyici = { tip: 'finansal', sart: 'Maaş yatması', etiket: '⚡ Maaş Gününde' };
  } else if (lower.includes('sanayiye yolum') || lower.includes('sanayiye gidince') || lower.includes('sanayide')) {
    tetikleyici = { tip: 'mekan', sart: 'Sanayi ziyareti', etiket: '📍 Sanayi Uğraması' };
  } else if (lower.includes('veli toplantıs') || lower.includes('toplantıda')) {
    tetikleyici = { tip: 'mekan', sart: 'Toplantı', etiket: '📍 Toplantıda' };
  }

  // 0. ÖNCELİK: KISA SENARYO EŞLEŞTİRME ("Leb Demeden Leblebiyi Anlama" - 2-3 Kelimelik Doğrudan Eşleme)
  const activeDomain = userDomain || (typeof window !== 'undefined' ? (localStorage.getItem('notivia_work_domain') as any) || undefined : undefined);
  const shortScenario = matchShortScenario(cleanInput, activeDomain);
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

  // 0.02 ÖNCELİK: FERMANTASYON & EV YAPIMI ÜRÜN REÇETELERİ (Bira, Turşu, Sirke, Zeytin)
  const fermentationMatch = findFermentationRecipe(cleanInput);
  if (fermentationMatch) {
    const fermCard = buildFermentationCard(fermentationMatch, baseDate);
    return fermCard;
  }

  // 0.05 ÖNCELİK: KULLANICININ SEÇTİĞİ ALANIN MOTORUNU ÖNCELİKLİ ÇALIŞTIRMA
  if (activeDomain && activeDomain !== 'GENEL') {
    if (activeDomain === 'HUKUK') {
      const legalResult = parseLegalNote(cleanInput, baseDate);
      if (legalResult) return enrichWithPredictiveGraph(legalResult, cleanInput);
    } else if (activeDomain === 'FINANS' || activeDomain === 'MALIYE') {
      const finResult = parseLegalNote(cleanInput, baseDate);
      if (finResult) return enrichWithPredictiveGraph(finResult, cleanInput);
      const tradeResult = parseTradesmanLocalShopNote(cleanInput, baseDate);
      if (tradeResult) return enrichWithPredictiveGraph(tradeResult, cleanInput);
    } else if (activeDomain === 'OGRENCI') {
      const domainRuleResult = dispatchDomainRule('OGRENCI', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput);
      const studentResult = parseAcademicStudentSuiteNote(cleanInput, baseDate);
      if (studentResult) return enrichWithPredictiveGraph(studentResult, cleanInput);
      const eduResult = parseEduManagerNote(cleanInput, baseDate);
      if (eduResult) return enrichWithPredictiveGraph(eduResult, cleanInput);
    } else if (activeDomain === 'EGITIM') {
      const domainRuleResult = dispatchDomainRule('EGITIM', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput);
      const eduResult = parseEduManagerNote(cleanInput, baseDate);
      if (eduResult) return enrichWithPredictiveGraph(eduResult, cleanInput);
      const studentResult = parseAcademicStudentSuiteNote(cleanInput, baseDate);
      if (studentResult) return enrichWithPredictiveGraph(studentResult, cleanInput);
    } else if (activeDomain === 'CALISMIYORUM') {
      const domainRuleResult = dispatchDomainRule('CALISMIYORUM', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput);
      const personalRoutineResult = parsePersonalRoutineCareNote(cleanInput, baseDate);
      if (personalRoutineResult) return enrichWithPredictiveGraph(personalRoutineResult, cleanInput);
      const civilResult = parseCivilServantPublicOfficeNote(cleanInput, baseDate);
      if (civilResult) return enrichWithPredictiveGraph(civilResult, cleanInput);
      const corpResult = parseCorporateOfficePersonalCareNote(cleanInput, baseDate);
      if (corpResult) return enrichWithPredictiveGraph(corpResult, cleanInput);
    } else if (activeDomain === 'SAGLIK' || activeDomain === 'EMEKLİ' || (activeDomain as string) === 'EMEKLILIK') {
      const domainRuleResult = dispatchDomainRule('SAGLIK', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput);
      const clinicalResult = parseHealthcareClinicalNote(cleanInput, baseDate);
      if (clinicalResult) return enrichWithPredictiveGraph(clinicalResult, cleanInput);
      const multiMedResult = parseMultiMedicationNote(cleanInput, baseDate);
      if (multiMedResult) return enrichWithPredictiveGraph(multiMedResult, cleanInput);
    } else if (activeDomain === 'EMNIYET') {
      const opResult = parseOperationSafetyEmergencyNote(cleanInput, baseDate);
      if (opResult) return enrichWithPredictiveGraph(opResult, cleanInput);
      const militaryResult = parseMilitaryCommanderNote(cleanInput, baseDate);
      if (militaryResult) return enrichWithPredictiveGraph(militaryResult, cleanInput);
    } else if (activeDomain === 'TEKNIK') {
      const engResult = parseEngineeringSuiteNote(cleanInput, baseDate);
      if (engResult) return enrichWithPredictiveGraph(engResult, cleanInput);
    } else if (activeDomain === 'LOJISTIK' || activeDomain === 'HAVACILIK') {
      const logResult = parseProjectLogisticsFieldTechNote(cleanInput, baseDate);
      if (logResult) return enrichWithPredictiveGraph(logResult, cleanInput);
    } else if (activeDomain === 'KURUMSAL') {
      const civilResult = parseCivilServantPublicOfficeNote(cleanInput, baseDate);
      if (civilResult) return enrichWithPredictiveGraph(civilResult, cleanInput);
      const corpResult = parseCorporateOfficePersonalCareNote(cleanInput, baseDate);
      if (corpResult) return enrichWithPredictiveGraph(corpResult, cleanInput);
    } else if (activeDomain === 'TICARET' || activeDomain === 'MALIYE') {
      const tradeResult = parseTradesmanLocalShopNote(cleanInput, baseDate);
      if (tradeResult) return enrichWithPredictiveGraph(tradeResult, cleanInput);
    } else if (activeDomain === 'MUTFAK' || activeDomain === 'GUZELLIK') {
      const corpResult = parseCorporateOfficePersonalCareNote(cleanInput, baseDate);
      if (corpResult) return enrichWithPredictiveGraph(corpResult, cleanInput);
    }
  }

  // 0.1 ÖNCELİK: HAVA KOŞULU TETİKLEYİCİLERİ
  if (lower.includes('yağmur') || lower.includes('yagmur')) {
    return enrichWithPredictiveGraph({
      baslik: cleanInput.replace(/yağmur yağarsa/gi, '').trim() || 'Yağmur Önlemi',
      zaman: 'Hava Yağmurlu Olduğunda',
      tarih_iso: null,
      tetikleyici: { tip: 'hava', sart: 'yagmur', etiket: '🌧️ Yağmur Şartı' },
      ikon: '🌧️',
      renk: '#E0F2FE'
    }, cleanInput);
  }

  if (lower.includes('don') || lower.includes('soğuk') || lower.includes('buz')) {
    return enrichWithPredictiveGraph({
      baslik: cleanInput.replace(/don yaparsa|don olursa/gi, '').trim() || 'Don Önlemi',
      zaman: 'Hava 0°C Altına İndiğinde',
      tarih_iso: null,
      tetikleyici: { tip: 'hava', sart: 'don', etiket: '❄️ Don Tehlikesi' },
      ikon: '❄️',
      renk: '#E0F2FE'
    }, cleanInput);
  }

  // 0. ÖNCELİK: LİSTE, MARKET VE ENVANTER / ÇOK SATIRLI GÖREV LİSTESİ AYRIŞTIRMA KURALI
  if (lower.includes('alınacak') || lower.includes('market') || lower.includes('liste') || lower.includes('bakkal') || lower.includes('pazar') || cleanInput.includes('\n')) {
    // Çok satırlı genel görev listesi ise
    if (cleanInput.includes('\n') || (cleanInput.includes('-') && cleanInput.split('-').length >= 3)) {
      const parsedItems = parseTextToChecklist(cleanInput);
      if (parsedItems.length > 0) {
        const isShopping = lower.includes('market') || lower.includes('pazar') || lower.includes('alınacak') ||
          parsedItems.some(i => /süt|sut|ekmek|yumurta|peynir|zeytin|su|deterjan|yağ|yag/i.test(i.task));

        return enrichWithPredictiveGraph({
          baslik: isShopping ? (lower.includes('pazar') ? 'Pazar Alışverişi' : 'Market Alışveriş Listesi') : 'Görev Listesi',
          zaman: isShopping ? 'Markette' : (zaman || 'Gerektiğinde'),
          tarih_iso: tarih_iso || null,
          action_items: parsedItems,
          ikon: isShopping ? '🛒' : '📝',
          renk: isShopping ? '#DCFCE7' : '#E0F2FE',
          anomali_notu: `${parsedItems.length} madde listelendi.`,
          sesli_fisilti: `Listeniz ${parsedItems.length} madde ile hazırlandı.`
        }, cleanInput);
      }
    }

    // "alınacaklar listesi", "marketten" gibi başlangıç kelimelerini temizle
    const rawItemsText = cleanInput
      .replace(/\b(alınacaklar|alınacak|listesi|market|bakkal|pazar|şunlar|al|almam lazım)\b/gi, '')
      .trim();

    // Virgül, "ve", "bir de", "ile" ve boşluklara göre maddeleri ayıkla
    let rawList = rawItemsText.split(/,|\s+ve\s+|\s+bir de\s+|\s+ile\s+|\n/gi);
    
    // Eğer tek parça kaldıysa ve boşluklarla ayrılmış birden çok kelime varsa kelime bazlı böl
    if (rawList.length === 1 && rawList[0].trim().split(/\s+/).length >= 2) {
      rawList = rawList[0].trim().split(/\s+/);
    }

    const checklistItems = rawList
      .map(item => item.trim())
      .filter(item => item.length > 1)
      .map(item => ({
        task: item.charAt(0).toLocaleUpperCase('tr-TR') + item.slice(1),
        is_completed: false
      }));

    if (checklistItems.length > 0) {
      return enrichWithPredictiveGraph({
        baslik: lower.includes('pazar') ? 'Pazar Alışverişi' : 'Market Alışveriş Listesi',
        zaman: 'Markette',
        tarih_iso: null,
        action_items: checklistItems,
        ikon: '🛒',
        renk: '#DCFCE7',
        anomali_notu: `${checklistItems.length} parça ürün listelendi.`,
        sesli_fisilti: `Alışveriş listeniz ${checklistItems.length} parça ürünle hazırlandı.`
      }, cleanInput);
    }
  }

  // 0.2 ÖNCELİK: DOĞRUDAN GÜNLÜK YAŞAM ALARMI VE GERİ SAYIM ZAMANLAYICISI ("X dk sonra", "Sabah 9'da kaldır")
  const dailyTime = parseDailyLifeTime(cleanInput);
  if (dailyTime && dailyTime.isAlarm) {
    let cleanTitle = cleanInput
      .replace(/(\d+)\s*(dakika|dk|saat)\s*sonra/gi, '')
      .replace(/(sabah|öğlen|akşam|gece)?\s*(\d{1,2})(?::(\d{2}))?\s*(?:'da|'de|'te|'ta|da|de|alarm|kaldır|hatırlat)?/gi, '')
      .replace(/\b(alarm|kaldır|hatırlat|uyandır|kur|bana|beni|bir)\b/gi, '')
      .trim();
    if (!cleanTitle || cleanTitle.length < 2) {
      cleanTitle = dailyTime.sureDakika ? `${dailyTime.sureDakika} Dk Zamanlayıcı` : 'Alarm & Hatırlatıcı';
    } else {
      cleanTitle = cleanTitle.charAt(0).toLocaleUpperCase('tr-TR') + cleanTitle.slice(1);
    }

    return enrichWithPredictiveGraph({
      baslik: cleanTitle.slice(0, 32),
      zaman: dailyTime.displayZaman,
      tarih_iso: dailyTime.isoString,
      ikon: '⏰',
      renk: '#FEF3C7',
      deviceNotificationEnabled: true,
      isAlarm: true,
      anomali_notu: `🔔 ${dailyTime.displayZaman} için alarm ve cihaz bildirimi devrede.`,
      sesli_fisilti: `${cleanTitle} için ${dailyTime.displayZaman} alarmı kuruldu.`
    }, cleanInput);
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

    const hasExplicitTime = !!(periodicIso || tarih_iso);
    const isClarificationNeeded = !hasExplicitTime && (lower.includes('randevu') || lower.includes('görüşme') || lower.includes('gorusme') || lower.includes('buluşma') || lower.includes('toplantı') || lower.includes('toplanti'));

    return enrichWithPredictiveGraph({
      baslik: baslik.slice(0, 32),
      zaman: isClarificationNeeded ? null : (periodicZaman || zaman || 'Planlanan Toplantı'),
      tarih_iso: isClarificationNeeded ? null : (periodicIso || tarih_iso),
      eksik_bilgi: isClarificationNeeded ? true : undefined,
      soru: isClarificationNeeded ? 'Hangi gün ve saatte planlayalım?' : undefined,
      ikon,
      renk,
      tetikleyici,
      periyodik,
      sesli_fisilti: isClarificationNeeded ? 'Hangi gün ve saatte planlayalım?' : undefined,
    }, cleanInput);
  }

  // 2. ÖNCELİK: HUKUK & AVUKATLIK MESLEK MOTORU (LEGAL ENGINE)
  const legalResult = parseLegalNote(cleanInput, baseDate);
  if (legalResult) {
    return enrichWithPredictiveGraph(legalResult, cleanInput);
  }

  // 3. ÖNCELİK: OPERASYON, GÜVENLİK VE ACİL DURUM MOTORU (POLICE, FIREFIGHTER, CHEF, PILOT)
  const operationSafetyResult = parseOperationSafetyEmergencyNote(cleanInput, baseDate);
  if (operationSafetyResult) {
    return enrichWithPredictiveGraph(operationSafetyResult, cleanInput);
  }

  // 4. ÖNCELİK: EĞİTİM VE OKUL YÖNETİM MOTORU (EDUMANAGER)
  const eduResult = parseEduManagerNote(cleanInput, baseDate);
  if (eduResult) {
    return enrichWithPredictiveGraph(eduResult, cleanInput);
  }

  // 4.5. ÖNCELİK: ÖĞRENCİ & AKADEMİK YAŞAM MOTORU (STUDENT & ACADEMIC SUITE)
  const studentResult = parseAcademicStudentSuiteNote(cleanInput, baseDate);
  if (studentResult) {
    return enrichWithPredictiveGraph(studentResult, cleanInput);
  }

  // 5. ÖNCELİK: KAMU VE DEVLET MEMURU MOTORU (CIVIL SERVANT & PUBLIC OFFICE ENGINE)
  const civilServantResult = parseCivilServantPublicOfficeNote(cleanInput, baseDate);
  if (civilServantResult) {
    return enrichWithPredictiveGraph(civilServantResult, cleanInput);
  }

  // 6. ÖNCELİK: ASKER VE BİRLİK KOMUTANI MOTORU (MILITARY & COMMANDER ENGINE)
  const militaryResult = parseMilitaryCommanderNote(cleanInput, baseDate);
  if (militaryResult) {
    return enrichWithPredictiveGraph(militaryResult, cleanInput);
  }

  // 7. ÖNCELİK: MÜHENDİSLİK MOTORU (ENGINEERING SUITE - CIVIL, ELEC, MECH, SOFT)
  const engineeringResult = parseEngineeringSuiteNote(cleanInput, baseDate);
  if (engineeringResult) {
    return enrichWithPredictiveGraph(engineeringResult, cleanInput);
  }

  // 8. ÖNCELİK: PROJE, LOJİSTİK VE SAHA TEKNOLOJİSİ (MİMAR, ŞOFÖR, TEKNİSYEN)
  const projLogisticsResult = parseProjectLogisticsFieldTechNote(cleanInput, baseDate);
  if (projLogisticsResult) {
    return enrichWithPredictiveGraph(projLogisticsResult, cleanInput);
  }

  // 9. ÖNCELİK: ESNAF VE KÜÇÜK İŞLETME MOTORU (TRADESMAN & LOCAL SHOP ENGINE)
  const tradesmanResult = parseTradesmanLocalShopNote(cleanInput, baseDate);
  if (tradesmanResult) {
    return enrichWithPredictiveGraph(tradesmanResult, cleanInput);
  }

  // 9.5. ÖNCELİK: KURUMSAL OFİS, İK VE KİŞİSEL BAKIM MOTORU (CORPORATE HR & BEAUTY ENGINE)
  const corporateCareResult = parseCorporateOfficePersonalCareNote(cleanInput, baseDate);
  if (corporateCareResult) {
    return enrichWithPredictiveGraph(corporateCareResult, cleanInput);
  }

  // 9.8. ÖNCELİK: ÇALIŞMIYORUM, EV DÖNGÜSÜ & KİŞİSEL YAŞAM MOTORU (ROUTINE, HOME & BUDGET CARE)
  const personalRoutineResult = parsePersonalRoutineCareNote(cleanInput, baseDate);
  if (personalRoutineResult) {
    return enrichWithPredictiveGraph(personalRoutineResult, cleanInput);
  }

  // 10. ÖNCELİK: SAĞLIK VE KLİNİK ÇALIŞANLARI MOTORU (HEALTHCARE & CLINICAL ENGINE)
  const clinicalResult = parseHealthcareClinicalNote(cleanInput, baseDate);
  if (clinicalResult) {
    return enrichWithPredictiveGraph(clinicalResult, cleanInput);
  }

  // 11. ÖNCELİK: SAĞLIK, ÇOKLU İLAÇ & MEDİKAL DOZ YÖNETİMİ
  const multiMedResult = parseMultiMedicationNote(cleanInput, baseDate);
  if (multiMedResult) {
    return enrichWithPredictiveGraph(multiMedResult, cleanInput);
  }

  const isMedicationQuery = 
    lower.includes('ilaç') || lower.includes('ilac') || lower.includes('mide koruyucu') ||
    lower.includes('antibiyotik') || lower.includes('magnezyum') || lower.includes('vitamin') ||
    lower.includes('aspirin') || lower.includes('tansiyon') || lower.includes('tiroit') ||
    lower.includes('melatonin') || lower.includes('reçete') || lower.includes('recete') ||
    lower.includes('aç karnına') || lower.includes('tok karnına') || lower.includes('iğne') ||
    lower.includes('doktor') || lower.includes('diş') || lower.includes('tahlil');

  if (isMedicationQuery) {
    // Çoklu ilaç veya zaman/doz ayrıştırması var mı kontrol et
    const hasMultipleMedsOrDoses = 
      (lower.includes('sabah') && (lower.includes('öğlen') || lower.includes('oglen') || lower.includes('akşam') || lower.includes('aksam') || lower.includes('gece') || lower.includes('yatarken'))) ||
      (lower.includes('mide koruyucu') && (lower.includes('antibiyotik') || lower.includes('magnezyum') || lower.includes('vitamin'))) ||
      (/\b(sabah|öğlen|oglen|akşam|aksam|gece|yatarken)\s+(aç|ac|tok)\b/i.test(lower));

    if (hasMultipleMedsOrDoses) {
      const medActions: Array<{ task: string; is_completed: boolean }> = [];

      // 1. Sabah Aç (08:00)
      if (lower.includes('sabah aç') || lower.includes('sabah ac') || (lower.includes('sabah') && lower.includes('mide koruyucu')) || (lower.includes('sabah') && lower.includes('tiroit'))) {
        let name = 'Mide Koruyucu / İlaç';
        if (lower.includes('mide koruyucu')) name = 'Mide Koruyucu';
        else if (lower.includes('tiroit')) name = 'Tiroit İlacı';
        else if (lower.includes('aspirin')) name = 'Aspirin';
        medActions.push({ task: `08:00 - ${name} (Aç Karnına)`, is_completed: false });
      }

      // 2. Sabah Tok (09:00)
      if (lower.includes('sabah tok') || (lower.includes('sabah') && (lower.includes('vitamin') || lower.includes('tansiyon') || lower.includes('demir')) && !lower.includes('aç'))) {
        let name = 'Sabah İlacı / Vitamin';
        if (lower.includes('tansiyon')) name = 'Tansiyon İlacı';
        else if (lower.includes('vitamin')) name = 'Vitamin Takviyesi';
        else if (lower.includes('demir')) name = 'Demir Hapı';
        medActions.push({ task: `09:00 - ${name} (Tok Karnına)`, is_completed: false });
      }

      // 3. Öğlen Tok (13:30)
      if (lower.includes('öğlen') || lower.includes('oglen')) {
        let name = 'Öğlen İlacı';
        if (lower.includes('antibiyotik')) name = 'Antibiyotik';
        else if (lower.includes('vitamin')) name = 'Vitamin D';
        medActions.push({ task: `13:30 - ${name} (Tok Karnına)`, is_completed: false });
      }

      // 4. Akşam Aç (18:30)
      if (lower.includes('akşam aç') || lower.includes('aksam ac') || (lower.includes('akşam') && lower.includes('önce') && !lower.includes('tok'))) {
        let name = 'Akşam İlacı (Yemek Öncesi)';
        medActions.push({ task: `18:30 - ${name} (Aç Karnına)`, is_completed: false });
      }

      // 5. Akşam Tok (19:30)
      if (lower.includes('akşam tok') || lower.includes('aksam tok') || (lower.includes('akşam') && !lower.includes('aç') && !lower.includes('ac') && !lower.includes('önce') && !lower.includes('yatarken'))) {
        let name = 'Akşam İlacı';
        if (lower.includes('antibiyotik')) name = 'Antibiyotik (2. Doz)';
        else if (lower.includes('tansiyon')) name = 'Tansiyon İlacı';
        medActions.push({ task: `19:30 - ${name} (Tok Karnına)`, is_completed: false });
      }

      // 6. Gece / Yatarken (22:30)
      if (lower.includes('gece') || lower.includes('yatarken') || lower.includes('uyumadan') || lower.includes('magnezyum') || lower.includes('melatonin')) {
        let name = 'Gece Takviyesi';
        if (lower.includes('magnezyum')) name = 'Magnezyum';
        else if (lower.includes('melatonin')) name = 'Melatonin';
        medActions.push({ task: `22:30 - ${name} (Yatarken)`, is_completed: false });
      }

      // Eğer eşleşen bulunamadıysa standart güvenli dağılım
      if (medActions.length === 0) {
        medActions.push(
          { task: '08:00 - Sabah İlacı (Aç/Tok)', is_completed: false },
          { task: '13:30 - Öğlen İlacı (Tok Karnına)', is_completed: false },
          { task: '22:30 - Gece İlacı (Yatarken)', is_completed: false }
        );
      }

      return enrichWithPredictiveGraph({
        baslik: 'Günlük İlaç Takvimi',
        zaman: zaman || 'Günlük Biyolojik Dozlar',
        tarih_iso,
        ikon: '💊',
        renk: '#F3E8FF',
        anomali_notu: 'Mide koruyucu kahvaltıdan en az 30 dk önce alınmalı, süt ürünleriyle demir hapı karıştırılmamalıdır.',
        action_items: medActions,
        sesli_fisilti: 'Günlük ilaç ve medikal takviminiz biyolojik saatlere göre hazırlandı.'
      }, cleanInput);
    }

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

  // 5. ÖNCELİK: EMANET, ALACAK & SOSYAL BELLEK / FİNANSAL İŞLEMLER
  const isEmanetOrLending = 
    /\b(emanet|borç verdim|borc verdim|ödünç verdim|odunc verdim|verdim|teslim ettim|bıraktım)\b/i.test(lower) &&
    !lower.includes('sipariş') && !lower.includes('kargo');

  if (isEmanetOrLending) {
    const default14Days = new Date(baseDate);
    default14Days.setDate(default14Days.getDate() + 14);
    default14Days.setHours(11, 0, 0, 0);

    const hasTime = !!(periodicIso || tarih_iso);
    const targetIso = hasTime ? (periodicIso || tarih_iso) : default14Days.toISOString();
    const targetZaman = hasTime ? (periodicZaman || zaman) : '14 Gün Sonra';

    let itemDesc = cleanInput
      .replace(/\b(emanet|borç|borc|ödünç|odunc|verdim|teslim ettim|bıraktım|bugün|dün)\b/gi, '')
      .trim();
    if (itemDesc.length > 25) itemDesc = itemDesc.slice(0, 25);
    const title = itemDesc ? `${itemDesc.charAt(0).toUpperCase() + itemDesc.slice(1)} (Emanet)` : 'Emanet / Alacak Takibi';

    return enrichWithPredictiveGraph({
      baslik: title.slice(0, 32),
      zaman: targetZaman,
      tarih_iso: targetIso,
      ikon: '🤝',
      renk: '#F3E8FF',
      anomali_notu: '💡 Emanet/borç teslimi için 14 gün sonrasına sessiz teyit görevi oluşturuldu.',
      action_items: [
        { task: 'Emanet / Borç teslim alındı mı teyit et', is_completed: false },
        { task: 'Muhatap ile nezaketle durum kontrolü yap', is_completed: false }
      ],
      sesli_fisilti: 'Emanet kaydı alındı, 14 gün sonrasına teyit adımı eklendi.',
      tetikleyici,
      periyodik
    }, cleanInput);
  }

  // 5b. ÖNCELİK: FİNANSAL İŞLEMLER (Ödeme / Alacak / Borç / Fatura)
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

  // 7. ÖNCELİK: İLETİŞİM, TELEFONLA ARAMA VE ÇAĞRI HATIRLATICILARI
  // "akşam 9da alpereni ara", "annemi ara", "doktoru ara", "mehmet beyi ara", "veli grubuna telefon et"
  const isCall =
    /\b(ara|aramak|ararsın|aransın|telefon et|çağrı yap|ulaş)\b/i.test(lower) &&
    !lower.includes('araç') && !lower.includes('araba') && !lower.includes('arada') && !lower.includes('fırsat ara');

  if (isCall) {
    let personName = '';
    // "alpereni ara", "annemi ara", "doktoru ara", "ahmet abiyi ara"
    const callMatch = cleanInput.match(/\b([A-ZÇĞİÖŞÜa-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜa-zçğıöşü]+)?)\s+(?:ara|aramak|telefon et|çağrı yap)\b/i);
    if (callMatch) {
      const candidate = callMatch[1].trim();
      const temporalStopwords = ['akşam', 'aksam', 'sabah', 'öğlen', 'oglen', 'gece', 'yarın', 'yarin', 'bugün', 'bugun', 'saat', 'sonra', 'önce'];
      const filteredWords = candidate.split(/\s+/).filter(w => !temporalStopwords.includes(w.toLowerCase()) && !/^\d+/.test(w));
      if (filteredWords.length > 0) {
        personName = filteredWords.join(' ');
      }
    }

    if (!personName) {
      const altMatch = cleanInput.match(/(?:ara|aramak|telefon et)\s+([A-ZÇĞİÖŞÜa-zçğıöşü]+)/i);
      if (altMatch) {
        personName = altMatch[1].trim();
      }
    }

    let formattedTitle = 'Telefon Görüşmesi';
    if (personName) {
      const capName = personName.charAt(0).toLocaleUpperCase('tr-TR') + personName.slice(1);
      formattedTitle = `${capName} Ara`;
    }

    return enrichWithPredictiveGraph({
      baslik: formattedTitle,
      zaman: periodicZaman || zaman || 'Bu Akşam 21:00',
      tarih_iso: periodicIso || tarih_iso,
      ikon: '📞',
      renk: '#DCFCE7', // Pastel Yeşil (İletişim & Sosyal)
      anomali_notu: '📞 Görüşülecek konuları ve notlarınızı önceden hazırlayın.',
      action_items: [
        { task: 'Görüşülecek ana konu başlıklarını hazırla', is_completed: false },
        { task: 'Muhatabın müsaitlik durumunu teyit et', is_completed: false }
      ],
      tetikleyici,
      periyodik
    }, cleanInput);
  }

  // 8. ÖNCELİK: DİĞER RANDEVU VE ETKİNLİKLER
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

  // 9. ÖNCELİK: EMANET / İADE
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
  let cleanTitle = cleanInput
    .replace(/\b(?:akşam|aksam|sabah|öğlen|oglen|gece|yarın|yarin|bugün|bugun)\b/gi, '')
    .replace(/\b(?:saat\s*)?\d{1,2}(?:[:.]\d{2})?(?:\s*['’]?(?:da|de|ta|te))?\b/gi, '')
    .replace(/\b(?:dokuzda|sekizde|yedide|altıda|beşte|dörtte|üçte|ikide|birde|onda)\b/gi, '')
    .trim();
  if (cleanTitle.length < 2) cleanTitle = cleanInput;
  cleanTitle = cleanTitle.charAt(0).toLocaleUpperCase('tr-TR') + cleanTitle.slice(1);
  const titleWords = cleanTitle.split(/\s+/);
  if (titleWords.length > 4) cleanTitle = titleWords.slice(0, 4).join(' ');

  const baseResult: NotiviaSimpleNote = {
    baslik: cleanTitle || 'Not',
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
  // ⚡ TEMEL İLKE: KULLANICIYA YAPAY İŞ ÇIKARMA (MİKRO GÖREV KURALI)
  // Tekil alarmlar ve mikro-görevlere yapay alt görevler veya tersine hazırlık adımları eklenmez!
  if (note.isAlarm || note.isMicroTask) {
    return note;
  }

  const predictive = inferPredictiveActions(input);
  if (!predictive) return note;

  const result = { ...note };

  // 0. Botanik / özel başlık ve zamanlama geçişi (eğer genel/varsayılansa)
  if (predictive.baslik && (!result.baslik || result.baslik === 'Yeni Eylem' || result.baslik === 'Yeni Hatırlatıcı')) {
    result.baslik = predictive.baslik;
  }
  if (predictive.zaman && (!result.zaman || result.zaman === 'Bugün')) {
    result.zaman = predictive.zaman;
  }
  if (predictive.tarih_iso && !result.tarih_iso) {
    result.tarih_iso = predictive.tarih_iso;
  }

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

  // 4. Kulaktan verilecek kısa sesli doğrulama fısıltısı
  if (predictive.sesliFisilti && (!result.sesli_fisilti || result.sesli_fisilti.includes('oluşturuldu'))) {
    result.sesli_fisilti = predictive.sesliFisilti;
  } else if (!result.sesli_fisilti) {
    result.sesli_fisilti = `${result.baslik} planlandı, hazırlık adımları hazırlandı.`;
  }

  // 5. İkon ve Renk Tema Uyarlaması
  if (predictive.ikon && (!result.ikon || result.ikon === '📌')) {
    result.ikon = predictive.ikon;
  }
  if (predictive.renk && (!result.renk || result.renk === '#FEF3C7' || result.renk.startsWith('#F5'))) {
    result.renk = predictive.renk;
  }

  return result;
}
