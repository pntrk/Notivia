// src/services/educationAdminEngine.ts

import { matchShortScenario } from '../utils/scenarioDatabase.ts';
import { parseTemporalAndCleanLabel } from '../utils/date.ts';

export interface SchoolAdminTask {
  id: string;
  baslik: string;
  kategori:
    | 'Maarif Modeli & Beceri Örgüsü'
    | 'Özel Eğitim'
    | 'Mevzuat & DYS'
    | 'Öğrenci İşleri'
    | 'Özlük & Puantaj'
    | 'Kurul & Zümre'
    | 'Öğretmenlik'
    | 'Akademi & Araştırma'
    | 'İSG & Güvenlik'
    | 'Taşımalı & Sosyal'
    | 'Mesleki Eğitim & Staj'
    | 'Merkezi Sınav & BSK'
    | 'Sosyal Etkinlik & Gezi';
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
    text.includes('maarif') || text.includes('öğrenme çıktısı') || text.includes('ogrenme ciktisi') || text.includes('öğrenme çıktıları') || text.includes('ogrenme ciktilari') ||
    text.includes('beceri örgüsü') || text.includes('beceri orgusu') || text.includes('süreç bileşenleri') || text.includes('surec bilesenleri') ||
    text.includes('süreç odaklı') || text.includes('surec odakli') || text.includes('biçimlendirici') || text.includes('formatif') ||
    text.includes('ksdt') || text.includes('rubrik') || text.includes('farklılaştırma') || text.includes('farklilastirma') ||
    text.includes('zenginleştirme') || text.includes('zenginlestirme') || text.includes('okul') || (text.includes('eğitim') && !text.includes('iş güvenliği') && !text.includes('çalışan')) || text.includes('egitim') ||
    text.includes('öğretmen') || text.includes('ogretmen') || text.includes('müdür') || text.includes('mudur') ||
    text.includes('sınav') || text.includes('sinav') || text.includes('e-okul') || text.includes('eokul') || text.includes('e okul') ||
    text.includes('nakil') || text.includes('kura') || text.includes('karne') || text.includes('sosyal etkinlik') ||
    text.includes('maddi hata') || text.includes('hizmetiçi') || text.includes('hizmetici') || text.includes('idareci') || text.includes('şartlı eğitim') ||
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
    text.includes('istiklal') || text.includes('bayrak') || text.includes('tören') || text.includes('toreni') ||
    text.includes('gezi') || text.includes('veli izin') || text.includes('muvafakatname') || text.includes('türsab') ||
    text.includes('açık uçlu') || text.includes('acik uclu') || text.includes('mazeret sınav') || text.includes('mazeret sinav') ||
    text.includes('mesem') || text.includes('çıraklık') || text.includes('ciraklik') || text.includes('staj') || text.includes('3308') ||
    text.includes('iyep') || text.includes('bologna') || text.includes('syllabus') || text.includes('ders izlencesi') ||
    text.includes('turnitin') || text.includes('intihal') || text.includes('bina sınav') || text.includes('bina sinav') ||
    text.includes('özel okul') || text.includes('ozel okul') || text.includes('ruhsat') || text.includes('ders kitabı') || text.includes('ders kitabi') ||
    text.includes('kitap seçim') || text.includes('kitap secim') || text.includes('anaokulu') || text.includes('kreş') || text.includes('kres') ||
    text.includes('gelişim gözlem') || text.includes('gelisim gozlem') || text.includes('aday öğretmen') || text.includes('aday ogretmen');

  if (!isEducationContext) return null;

  // 0.0 TÜRKİYE YÜZYILI MAARİF MODELİ: DERS PLANI & ÖĞRENME ÇIKTILARI (ÖÇ)
  if (
    text.includes('maarif') ||
    text.includes('öğrenme çıktısı') ||
    text.includes('ogrenme ciktisi') ||
    text.includes('öğrenme çıktıları') ||
    text.includes('ogrenme ciktilari') ||
    text.includes('süreç bileşenleri') ||
    text.includes('surec bilesenleri') ||
    text.includes('beceri örgüsü') ||
    text.includes('beceri orgusu') ||
    text.includes('kavramsal beceri') ||
    text.includes('alan becerisi') ||
    text.includes('öğrenme yaşantısı') ||
    text.includes('ogrenme yasantisi') ||
    (text.includes('ders planı') && (text.includes('maarif') || text.includes('müfredat') || text.includes('beceri')))
  ) {
    const dt = parseEduDateTime(rawText, now, 8, 30);
    return {
      id: `edu_maarif_plan_${Date.now()}`,
      baslik: dt.cleanedTitle || 'Maarif Modeli Ders Planı & Beceri Örgüsü',
      kategori: 'Maarif Modeli & Beceri Örgüsü',
      mevzuat_notu: 'Türkiye Yüzyılı Maarif Modeli Öğretim Programları uyarınca ders planları öğrenme çıktısı (ÖÇ), süreç bileşenleri, beceri örgüsü (Kavramsal, Sosyal-Duygusal, Alan Becerileri) ve erdem-değer-eylem çerçevesinde hazırlanır.',
      action_items: [
        { task: 'Giriş (Köprü Kurma): Öğrencilerin ön bilgilerini harekete geçiren merak uyandırıcı soru/etkinliği belirle', is_completed: false },
        { task: 'Keşfetme & Derinleşme: Öğrenme çıktısı ve süreç bileşenlerine (SB) yönelik beceri modelleme ve uygulama adımlarını kurgula', is_completed: false },
        { task: 'Öğrenme Kanıtları: Süreç odaklı biçimlendirici değerlendirme (Çıkış kartı, öz/akran değerlendirme veya kontrol listesi) hazırla', is_completed: false },
        { task: 'Farklılaştırma Entegrasyonu: Hızlı öğrenenler için zenginleştirme, ek desteğe ihtiyaç duyanlar için destekleme görevlerini uyarla', is_completed: false },
        { task: 'Sosyal-Duygusal Öğrenme (SDB) ve erdem-değer-eylem yansımalarını ders akışında ilişkilendir', is_completed: false }
      ],
      zaman_etiketi: `${dt.dayLabel} (Ders Planı & Uygulama)`,
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Dersten Önce (Öğrenme Yaşantısı Hazırlığı)',
      ikon: '🌟',
      renk: '#FEF08A',
      sesli_geribildirim: 'Türkiye Yüzyılı Maarif Modeli ders planı, öğrenme çıktısı ve beceri basamakları hazırlandı.'
    };
  }

  // 0.01 TÜRKİYE YÜZYILI MAARİF MODELİ: SÜREÇ ODAKLI ÖLÇME DEĞERLENDİRME & KSDT / RUBRİK
  if (
    text.includes('süreç odaklı') ||
    text.includes('surec odakli') ||
    text.includes('biçimlendirici') ||
    text.includes('formatif') ||
    text.includes('ksdt') ||
    (text.includes('rubrik') && !text.includes('tez')) ||
    (text.includes('dereceli puanlama') && !text.includes('tez')) ||
    (text.includes('dağılım tablosu') && text.includes('soru'))
  ) {
    const dt = parseEduDateTime(rawText, now, 10, 0);
    return {
      id: `edu_maarif_olcme_${Date.now()}`,
      baslik: 'Süreç Odaklı Ölçme & KSDT / Rubrik',
      kategori: 'Maarif Modeli & Beceri Örgüsü',
      mevzuat_notu: 'MEB Ölçme ve Değerlendirme Yönetmeliği ile Maarif Modeli Ölçme Kılavuzu uyarınca ölçme-değerlendirme ezbere değil, süreç odaklı biçimlendirici değerlendirme, konu soru dağılım senaryosu (KSDT) ve analitik rubriklerle yürütülür.',
      action_items: [
        { task: 'İl/okul zümre kurulu konu soru dağılım tablosundan (KSDT) ortak yazılı sınav senaryosunu seç', is_completed: false },
        { task: 'Ezberci çoktan seçmeli test yerine açık uçlu, analitik ve üst düzey düşünme sorularını hazırla', is_completed: false },
        { task: 'Her soru için aşamalı puanlama basamaklarını içeren analitik Dereceli Puanlama Anahtarını (Rubrik) oluştur', is_completed: false },
        { task: 'Süreç odaklı gözlem formları, öğrenci gelişim dosyası (portfolyo) ve öz/akran değerlendirmelerini e-Okul\'a işle', is_completed: false }
      ],
      zaman_etiketi: `${dt.dayLabel} (Süreç Odaklı Ölçme)`,
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Sınav / Değerlendirme Öncesi Barem Hazırlığı',
      ikon: '📝',
      renk: '#FEF08A',
      sesli_geribildirim: 'Süreç odaklı ölçme, konu soru dağılım tablosu ve dereceli puanlama rubriği planlandı.'
    };
  }

  // 0.02 TÜRKİYE YÜZYILI MAARİF MODELİ: FARKLILAŞTIRMA (ZENGİNLEŞTİRME & DESTEKLEME) & SOSYAL-DUYGUSAL ÖĞRENME (SDB)
  if (
    text.includes('farklılaştırma') ||
    text.includes('farklilastirma') ||
    text.includes('zenginleştirme') ||
    text.includes('zenginlestirme') ||
    (text.includes('destekleme') && (text.includes('eğitim') || text.includes('öğrenci') || text.includes('maarif'))) ||
    text.includes('sosyal duygusal') ||
    text.includes('sdb') ||
    text.includes('erdem değer eylem') ||
    text.includes('bütüncül eğitim')
  ) {
    return {
      id: `edu_maarif_farklilastirma_${Date.now()}`,
      baslik: 'Maarif Modeli Farklılaştırma & SDB',
      kategori: 'Maarif Modeli & Beceri Örgüsü',
      mevzuat_notu: 'Türkiye Yüzyılı Maarif Modeli Farklılaştırılmış Öğretim Kılavuzu uyarınca sınıftaki bireysel farklılıklar zenginleştirme (enrichment) ve destekleme (scaffolding) yollarıyla karşılanır; sosyal-duygusal beceriler desteklenir.',
      action_items: [
        { task: 'İleri düzeydeki öğrenciler için derinleştirici zenginleştirme (proje, problem çözme, vaka inceleme) materyalleri hazırla', is_completed: false },
        { task: 'Öğrenme desteğine ihtiyaç duyan öğrenciler için basamaklandırılmış destekleme (scaffolding) föyleri oluştur', is_completed: false },
        { task: 'Sosyal-duygusal öğrenme becerileri (Benlik farkındalığı, öz yönetim, empati ve iş birliği) gözlem kriterlerini ders sürecine ekle', is_completed: false },
        { task: 'Akl-ı selim, kalb-i selim ve zevk-i selim bütüncül insan profiline uygun değer-eylem kazanımlarını değerlendir', is_completed: false }
      ],
      zaman_etiketi: 'Haftalık / Dönemlik Farklılaştırma',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Öğrenci Düzey Belirleme & Ön Test',
      ikon: '🎯',
      renk: '#FEF08A',
      sesli_geribildirim: 'Maarif Modeli zenginleştirme, destekleme ve sosyal-duygusal beceri adımları planlandı.'
    };
  }

  // 0.03 E-OKUL ÖĞRENCİ NAKİL & GEÇİŞ İŞLEMLERİ (İDARECİ: OKUL MÜDÜRÜ / MÜDÜR YARDIMCISI)
  if (
    text.includes('nakil') ||
    text.includes('ogrenci nakil') ||
    text.includes('öğrenci nakil') ||
    text.includes('nakil kabul') ||
    text.includes('nakil onay') ||
    text.includes('nakil onayı') ||
    text.includes('nakil isteği') ||
    text.includes('nakil talebi') ||
    text.includes('nakil başvurusu') ||
    text.includes('nakil islemi') ||
    text.includes('nakil işlemi') ||
    (text.includes('kontenjan') && (text.includes('öğrenci') || text.includes('ogrenci') || text.includes('okul') || text.includes('şube') || text.includes('sube')))
  ) {
    const dt = parseEduDateTime(rawText, now, 10, 0);
    return {
      id: `edu_nakil_${Date.now()}`,
      baslik: 'e-Okul Öğrenci Nakil & Geçiş İşlemleri',
      kategori: 'Öğrenci İşleri',
      mevzuat_notu: 'MEB Okul Öncesi ve İlköğretim Kurumları Yönetmeliği (Md. 12) ile Ortaöğretim Kurumları Yönetmeliği (Md. 37-38) uyarınca nakil ve geçiş başvuruları haftalık/aylık kontenjan dahilinde e-Okul sistemi üzerinden okul idaresince karara bağlanır.',
      action_items: [
        { task: 'e-Okul Yönetim Bilgi Sistemi > Kurum İşlemleri > Nakil İşlemleri ekranına okul idareci şifresiyle giriş yap', is_completed: false },
        { task: 'Sınıf seviyesi, boş kontenjan durumu ve yabancı dil/alan uyumunu e-Okul üzerinden doğrula', is_completed: false },
        { task: 'Gelen nakil başvurusunu veli ikametgah/çalışma belgesi veya yasal mazeret evrakıyla teyit et', is_completed: false },
        { task: 'e-Okul üzerinden "Nakil Kabul" onayını ver veya yasal gerekçesini sisteme girerek işlemi sonuçlandır', is_completed: false },
        { task: 'Nakli gerçekleşen öğrenciyi uygun şubeye yerleştir, sınıf defteri ve öğrenci kütüğüne kaydet; eski okulundan sağlık/özlük dosyasını DYS ile iste', is_completed: false }
      ],
      zaman_etiketi: 'Haftalık Nakil Dönemi (e-Okul Onayı)',
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Haftalık Kontenjan Belirleme & İnceleme',
      ikon: '🔄',
      renk: '#E0E7FF',
      sesli_geribildirim: 'e-Okul öğrenci nakil kabul, kontenjan kontrolü ve şube yerleştirme protokolü hazırlandı.'
    };
  }

  // 0.04 E-OKUL MERKEZİ KURA & ŞUBE BELİRLEME KOMİSYONU (İDARECİ)
  if (
    text.includes('kura çekimi') ||
    text.includes('kura cekimi') ||
    text.includes('şube kura') ||
    text.includes('sube kura') ||
    text.includes('sınıf kura') ||
    text.includes('sinif kura') ||
    text.includes('şube belirleme') ||
    text.includes('sube belirleme') ||
    text.includes('şube kuraları') ||
    text.includes('sube kuralari') ||
    (text.includes('kura') && (text.includes('öğrenci') || text.includes('ogrenci') || text.includes('öğretmen') || text.includes('ogretmen') || text.includes('1. sınıf') || text.includes('5. sınıf') || text.includes('9. sınıf')))
  ) {
    const dt = parseEduDateTime(rawText, now, 10, 30);
    return {
      id: `edu_kura_sube_${Date.now()}`,
      baslik: 'e-Okul Merkezi Kura & Şube Belirleme',
      kategori: 'Öğrenci İşleri',
      mevzuat_notu: 'MEB Yönetmeliği gereğince ilkokul ve ortaokullarda şube ve sınıf öğretmenleri, e-Okul sistemi üzerinden merkezi kura yöntemiyle veli ve komisyon huzurunda şeffaf olarak belirlenir.',
      action_items: [
        { task: 'Okul Kura Komisyonunu (Okul Müdürü, Md. Yrd., Rehber Öğretmen ve Okul Aile Birliği Bşk.) resmi yazıyla kur', is_completed: false },
        { task: 'Kayıt bölgesindeki kesin kayıtlı öğrencilerin kız/erkek, doğum tarihi ve özel eğitim dengesini e-Okul\'da doğrula', is_completed: false },
        { task: 'e-Okul Merkezi Kura Modülü üzerinden öğrenci şube ve öğretmen kura çekimini gerçekleştir', is_completed: false },
        { task: 'Kura çekim tutanağını komisyon üyelerine ıslak imzalatarak okul ilan panosunda ve internet sitesinde duyur', is_completed: false },
        { task: 'Şube değişiklik taleplerinin ancak veli yazılı başvurusu ve PDR komisyon raporuyla değerlendirilebileceğini tebliğ et', is_completed: false }
      ],
      zaman_etiketi: 'Eylül Ayı Kura Takvimi',
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Kura Öncesi Komisyon Toplantısı',
      ikon: '🎲',
      renk: '#FEF3C7',
      sesli_geribildirim: 'e-Okul merkezi kura, şube dağıtımı ve komisyon tutanak adımları oluşturuldu.'
    };
  }

  // 0.05 E-OKUL SOSYAL ETKİNLİK MODÜLÜ & E-PORTFOLYO İDARE ONAYI
  if (
    text.includes('sosyal etkinlik onay') ||
    text.includes('sosyal etkinlik modülü') ||
    text.includes('sosyal etkinlik modulu') ||
    text.includes('e-okul sosyal etkinlik') ||
    text.includes('eokul sosyal etkinlik') ||
    text.includes('e okul sosyal etkinlik') ||
    text.includes('kulüp onay') ||
    text.includes('kulup onay') ||
    text.includes('e-portfolyo onay') ||
    (text.includes('sosyal etkinlik') && (text.includes('onayla') || text.includes('onay') || text.includes('idare')))
  ) {
    const dt = parseEduDateTime(rawText, now, 11, 0);
    return {
      id: `edu_sosyal_etkinlik_onay_${Date.now()}`,
      baslik: 'e-Okul Sosyal Etkinlik & e-Portfolyo İdare Onayı',
      kategori: 'Sosyal Etkinlik & Gezi',
      mevzuat_notu: 'MEB Sosyal Etkinlikler Yönetmeliği uyarınca danışman öğretmenler tarafından sisteme girilen etkinlikler, yarışma dereceleri ve katılım belgeleri okul müdürlüğü tarafından incelenerek onaylanır.',
      action_items: [
        { task: 'e-Okul Sosyal Etkinlik Modülü > Kurum Onay İşlemleri menüsünden bekleyen kayıtları listele', is_completed: false },
        { task: 'Öğrencinin katılım belgesi, yarışma derecesi, veli izin belgesi ve faaliyet fotoğraflarını mevzuata göre incele', is_completed: false },
        { task: 'Uygun bulunan sanatsal, sportif ve bilimsel etkinlikleri okul idaresi yetkisiyle sistemde onayla', is_completed: false },
        { task: 'Dönem sonu Sosyal Etkinlik Tamamlama Belgelerinin e-Okul dökümünü alarak öğrenci gelişim dosyalarına ekle', is_completed: false }
      ],
      zaman_etiketi: 'Aylık İdari Onay Rutini',
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Onay Öncesi Belge İnceleme',
      ikon: '🏆',
      renk: '#DCFCE7',
      sesli_geribildirim: 'e-Okul sosyal etkinlik modülü idari onay ve e-Portfolyo doğrulama adımları hazırlandı.'
    };
  }

  // 0.06 E-OKUL ŞÖK KARAR GİRİŞİ & BAŞARISIZ ÖĞRENCİ TEDBİR PLANI
  if (
    text.includes('şök kararları gir') ||
    text.includes('sok kararlari gir') ||
    text.includes('şök sisteme işle') ||
    text.includes('sok sisteme isle') ||
    text.includes('şök karar girişi') ||
    text.includes('sok karar girisi') ||
    (text.includes('şök') && text.includes('e-okul')) ||
    (text.includes('sok') && text.includes('e-okul')) ||
    (text.includes('şök') && text.includes('e okul')) ||
    (text.includes('şök') && (text.includes('karar') || text.includes('başarısız') || text.includes('tedbir')))
  ) {
    const dt = parseEduDateTime(rawText, now, 14, 0);
    return {
      id: `edu_sok_giris_${Date.now()}`,
      baslik: 'e-Okul ŞÖK Karar Girişi & Tedbir Planı',
      kategori: 'Kurul & Zümre',
      mevzuat_notu: 'MEB Yönetmelikleri gereğince Şube Öğretmenler Kurulunda her şube için alınan akademik ve davranışsal kararlar ile başarısız öğrenciler için planlanan tedbirler süresi içinde e-Okul sistemine işlenmelidir.',
      action_items: [
        { task: 'Şube Öğretmenler Kurulunda alınan şube başarı analizi ve karar tutanaklarını topla', is_completed: false },
        { task: 'e-Okul > Kurum İşlemleri > Bilgi Giriş İşlemleri > ŞÖK Kararları ekranına öğrenci bazında kararları gir', is_completed: false },
        { task: '3 veya daha fazla dersten başarısız olan öğrenciler için DYK, destek eğitim veya rehberlik servisi tedbir planını sisteme kaydet', is_completed: false },
        { task: 'İmzalı ŞÖK toplantı tutanağını ve veli bilgilendirme taahhütnamelerini okul idari arşivine kaldır', is_completed: false }
      ],
      zaman_etiketi: 'Dönem Sonu / ŞÖK Takvimi',
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Kurul Kararları Derleme',
      ikon: '📋',
      renk: '#FEF08A',
      sesli_geribildirim: 'e-Okul ŞÖK karar girişi, başarısız öğrenci tedbirleri ve veli bilgilendirme protokolü açıldı.'
    };
  }

  // 0.07 E-OKUL NOT DÜZELTME & MADDİ HATA İNCELEME KOMİSYONU
  if (
    text.includes('not düzeltme') ||
    text.includes('not duzeltme') ||
    text.includes('maddi hata') ||
    text.includes('sınav notuna itiraz') ||
    text.includes('sinav notuna itiraz') ||
    text.includes('not itiraz dilekçesi') ||
    text.includes('not itiraz dilekcesi') ||
    (text.includes('not') && text.includes('itiraz') && text.includes('sınav'))
  ) {
    const due = addBusinessDays(now, 5);
    return {
      id: `edu_not_duzeltme_${Date.now()}`,
      baslik: 'e-Okul Not Düzeltme & Maddi Hata Komisyonu',
      kategori: 'Öğrenci İşleri',
      mevzuat_notu: 'MEB Ölçme ve Değerlendirme Yönetmeliği uyarınca sınav notuna itirazlarda okul müdürü başkanlığında zümre öğretmenlerinden Maddi Hata Komisyonu kurulur; not düzeltmesi İlçe MEM onayıyla e-Okul\'a işlenir.',
      action_items: [
        { task: 'Velinin sınav sonuçlarının ilanından itibaren en geç 5 iş günü içinde verdiği yazılı itiraz dilekçesini DYS evrak kaydına al', is_completed: false },
        { task: 'Okul Müdürü başkanlığında branş zümre öğretmenlerinden oluşan 3 kişilik Maddi Hata İnceleme Komisyonunu kur', is_completed: false },
        { task: 'Sınav kağıdını ve dereceli puanlama rubriğini/cevap anahtarını inceleyerek komisyon değerlendirme tutanağını tanzim et', is_completed: false },
        { task: 'Not değişikliği gerekiyorsa DYS üzerinden gerekçeli komisyon tutanağıyla İlçe MEM\'den e-Okul Not Düzeltme Oluru talep et', is_completed: false },
        { task: 'İlçe MEM onayından sonra e-Okul sisteminde notu güncelle ve sonucu veliye resmi yazıyla tebliğ et', is_completed: false }
      ],
      zaman_etiketi: '5 İş Günü Yasal İnceleme Süresi',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'İtiraz Dilekçesi Alındığında (Derhal)',
      ikon: '⚖️',
      renk: '#FEF08A',
      sesli_geribildirim: 'Maddi hata inceleme komisyonu, DYS İlçe MEM olur yazısı ve e-Okul not düzeltme protokolü takvimlendi.'
    };
  }

  // 0.08 E-OKUL KARNE, TAKDİR/TEŞEKKÜR & KÜTÜK DEFTERİ BASIMI
  if (
    text.includes('karne basımı') ||
    text.includes('karne basimi') ||
    text.includes('karne bas') ||
    text.includes('karne hazırla') ||
    text.includes('karne hazirla') ||
    text.includes('takdir teşekkür bas') ||
    text.includes('takdir tesekkur bas') ||
    text.includes('iftihar belgesi') ||
    text.includes('onur belgesi bas') ||
    text.includes('dönem sonu karne') ||
    text.includes('donem sonu karne') ||
    text.includes('sınıf geçme defteri') ||
    text.includes('sinif gecme defteri')
  ) {
    const dt = parseEduDateTime(rawText, now, 9, 0);
    return {
      id: `edu_karne_basim_${Date.now()}`,
      baslik: 'e-Okul Karne & Takdir/Teşekkür Belgesi Basımı',
      kategori: 'Öğrenci İşleri',
      mevzuat_notu: 'MEB Yönetmelikleri uyarınca tüm derslerin not kilidi tamamlandıktan sonra e-Okul sisteminden karne, takdir-teşekkür, üstün başarı ve iftihar belgeleri ile sınıf geçme kütük defterleri resmi mühür ve imza için basılır.',
      action_items: [
        { task: 'Tüm branş öğretmenlerinin e-Okul sınav, sözlü ve ders içi katılım not girişlerini tamamlayıp kilitlediğini doğrula', is_completed: false },
        { task: 'Devamsızlık sınırını aşan veya sınıf tekrarına kalan öğrencilerin durumunu ŞÖK ve disiplin kuruluyla netleştir', is_completed: false },
        { task: 'e-Okul Raporlar > Karne ve Belge Basım ekranından takdir, teşekkür, onur ve iftihar belgelerini dök', is_completed: false },
        { task: 'Karneleri okul müdürü ıslak imzası ve resmi mühürle onaylayıp sınıf rehber öğretmenlerine zimmetle teslim et', is_completed: false },
        { task: 'Dönem sonu Sınıf Geçme Defterlerini yazdırıp ciltleterek okulun daimi arşivine kaldır', is_completed: false }
      ],
      zaman_etiketi: 'Dönem Sonu Karne Haftası',
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Karne Öncesi Not & Kilit Denetimi',
      ikon: '📜',
      renk: '#FEF3C7',
      sesli_geribildirim: 'e-Okul karne basımı, takdir-teşekkür belgeleri ve dönem sonu not kilit kontrolleri hazırlandı.'
    };
  }

  // 0.09 MEBBİS İZİN/RAPOR GİRİŞİ & BOŞ DERS NÖBETÇİ İKAME PLANI (İDARECİ)
  if (
    text.includes('öğretmen rapor aldı') ||
    text.includes('ogretmen rapor aldi') ||
    text.includes('raporu mebbise işle') ||
    text.includes('raporu mebbise isle') ||
    text.includes('mebbis rapor girişi') ||
    text.includes('mebbis rapor girisi') ||
    text.includes('öğretmen sevk aldı') ||
    text.includes('ogretmen sevk aldi') ||
    text.includes('öğretmen mazeret izni') ||
    text.includes('ogretmen mazeret izni') ||
    (text.includes('öğretmen') && text.includes('rapor') && (text.includes('mebbis') || text.includes('idare') || text.includes('okul')))
  ) {
    const dt = parseEduDateTime(rawText, now, 8, 15);
    return {
      id: `edu_mebbis_rapor_${Date.now()}`,
      baslik: 'MEBBİS İzin/Rapor Girişi & Ders İkame Planı',
      kategori: 'Özlük & Puantaj',
      mevzuat_notu: 'MEB İzin Yönergesi ve DMK uyarınca personelin aldığı sağlık raporları derhal MEBBİS İzin Modülüne işlenmeli; öğrencilerin boş dersi nöbetçi veya ek ders ücretli öğretmenle ikame edilmelidir.',
      action_items: [
        { task: 'Öğretmenin e-Devlet barkodlu veya hastane onaylı sağlık raporunu teslim alarak kayıt numarası ver', is_completed: false },
        { task: 'MEBBİS > Özlük Modülü > İzin İşlemleri > Sağlık İzinleri ekranına rapor protokol no ve gün sayısını hatasız işle', is_completed: false },
        { task: 'Raporlu öğretmenin haftalık ders programını inceleyerek sınıfların boş geçmemesi için nöbetçi öğretmen görevlendirmesi yap', is_completed: false },
        { task: 'KBS Ek Ders Modülünde raporlu günlerin ders ücreti kesintisini puantaja yansıt', is_completed: false },
        { task: 'Rapor fotokopisi ve MEBBİS izin onay belgesini öğretmenin okul özlük dosyasına kaldır', is_completed: false }
      ],
      zaman_etiketi: 'Mesai Başlangıcı (Rapor Bildirimiyle Derhal)',
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Sabah 08:15 (Ders İkamesi)',
      ikon: '🩺',
      renk: '#E0F2FE',
      sesli_geribildirim: 'MEBBİS personel rapor girişi, KBS ek ders kesintisi ve nöbetçi öğretmen ikame planı oluşturuldu.'
    };
  }

  // 0.10 MEBBİS HİZMETİÇİ EĞİTİM & SEMİNER İDARE ONAYLARI
  if (
    text.includes('hizmetiçi onay') ||
    text.includes('hizmetici onay') ||
    text.includes('mebbis hizmetiçi') ||
    text.includes('mebbis hizmetici') ||
    text.includes('mebbis seminer onay') ||
    text.includes('öğretmen kurs başvurusu') ||
    text.includes('ogretmen kurs basvurusu') ||
    text.includes('mahalli hizmetiçi') ||
    text.includes('mahalli hizmetici')
  ) {
    const dt = parseEduDateTime(rawText, now, 11, 30);
    return {
      id: `edu_hizmetici_onay_${Date.now()}`,
      baslik: 'MEBBİS Hizmetiçi Eğitim & Seminer İdare Onayı',
      kategori: 'Özlük & Puantaj',
      mevzuat_notu: 'MEB Hizmetiçi Eğitim Yönetmeliği uyarınca öğretmenlerin mahalli ve merkezi eğitim faaliyetleri okul müdürlüğü 1. onay makamı tarafından takvimine göre incelenip onaylanır.',
      action_items: [
        { task: 'MEBBİS Hizmetiçi Eğitim Modülü > Başvuru Onay İşlemleri ekranına girerek bekleyen öğretmen başvurularını listele', is_completed: false },
        { task: 'Eğitimin tarihlerinin okul sınav takvimi, nöbet günleri ve ders yüküyle çakışma durumunu denetle', is_completed: false },
        { task: 'Okulun eğitim-öğretim aksamayacak şekilde uygun görülen başvuruları okul müdürü yetkisiyle sistemde onayla', is_completed: false },
        { task: 'Faaliyet bitiminde personelin e-Sertifika katılım belgesini MEBBİS özlük kaydında teyit et', is_completed: false }
      ],
      zaman_etiketi: 'Başvuru Takvimi İçi (Sistem Onayı)',
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Ders Yükü & İkame Kontrolü',
      ikon: '🧑‍🏫',
      renk: '#FEF9C3',
      sesli_geribildirim: 'MEBBİS hizmetiçi eğitim idari onayı ve ders ikame kontrolleri planlandı.'
    };
  }

  // 0.11 ŞARTLI EĞİTİM YARDIMI (ŞEY) & E-OKUL DEVAMSIZLIK TAKİBİ
  if (
    text.includes('şartlı eğitim yardımı') ||
    text.includes('sartli egitim yardimi') ||
    text.includes('şey devamsızlık') ||
    text.includes('sey devamsizlik') ||
    text.includes('sydv öğrenci') ||
    text.includes('sydv ogrenci') ||
    (text.includes('sosyal yardım') && text.includes('devamsızlık'))
  ) {
    const dt = parseEduDateTime(rawText, now, 13, 30);
    return {
      id: `edu_sey_takip_${Date.now()}`,
      baslik: 'Şartlı Eğitim Yardımı (ŞEY) & Devamsızlık Takibi',
      kategori: 'Öğrenci İşleri',
      mevzuat_notu: 'MEB ve Aile ve Sosyal Hizmetler Bakanlığı Şartlı Eğitim Yardımı (ŞEY) protokolü uyarınca yardım alan öğrencilerin aylık devamsızlıkları (en fazla 4 gün) e-Okul sistemi üzerinden kontrol edilerek onaylanır.',
      action_items: [
        { task: 'e-Okul Şartlı Eğitim Yardımı (ŞEY) modülünden yardım alan öğrenci listesini dök', is_completed: false },
        { task: 'Öğrencilerin ilgili aydaki özürlü/özürsüz devamsızlık durumunu sınıf yoklama fişleriyle karşılaştır', is_completed: false },
        { task: 'Aylık 4 günden fazla devamsızlık yaparak yardımı kesilme riski bulunan öğrencilerin velileriyle görüşme yap', is_completed: false },
        { task: 'e-Okul ŞEY modülündeki aylık devam doğrulamasını tamamla ve İlçe SYDV raporunu arşivle', is_completed: false }
      ],
      zaman_etiketi: 'Aylık SYDV Doğrulama Takvimi',
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Ay Başı Devamsızlık İcmali',
      ikon: '🤝',
      renk: '#CCFBF1',
      sesli_geribildirim: 'Şartlı Eğitim Yardımı devamsızlık analizi ve e-Okul ŞEY doğrulama kartı açıldı.'
    };
  }

  // 0.12 NÖBETÇİ İDARECİ & OKUL EMNİYET / KAMERA / KAPANIŞ DEVRİ
  if (
    text.includes('nöbetçi müdür yardımcısı') ||
    text.includes('nobetci mudur yardimcisi') ||
    text.includes('nöbetçi idareci') ||
    text.includes('nobetci idareci') ||
    text.includes('idareci nöbeti') ||
    text.includes('idareci nobeti') ||
    text.includes('okul kamera denetimi') ||
    text.includes('okul kapanış devri') ||
    text.includes('okul kapanis devri')
  ) {
    const dt = parseEduDateTime(rawText, now, 17, 30);
    return {
      id: `edu_idareci_nobet_${Date.now()}`,
      baslik: 'Nöbetçi İdareci & Okul Emniyet / Kamera Devri',
      kategori: 'İSG & Güvenlik',
      mevzuat_notu: 'MEB Nöbet Hizmetleri Yönergesi gereği nöbetçi müdür yardımcısı mesai bitiminde okulun fiziki güvenliğini, kamera kayıtlarını ve nöbet defterini denetleyerek binayı emniyete alır.',
      action_items: [
        { task: 'Sabah nöbetçi öğretmenlerin görev yerlerini almalarını sağla, boş geçen dersleri ek ders defterine işle', is_completed: false },
        { task: 'Okul güvenlik kameralarının (DVR) kesintisiz kayıt yaptığını ve kör nokta olmadığını kontrol et', is_completed: false },
        { task: 'Bahçe kapısı ve bina giriş turnikelerinde ziyaretçi defterinin tutulduğunu denetle', is_completed: false },
        { task: 'Ders bitiminde katların boşaltıldığını, pencerelerin kapalı olduğunu kontrol et; nöbet defterini imzalayarak binayı kilitle', is_completed: false }
      ],
      zaman_etiketi: 'Mesai Bitimi 17:30 (Kapanış Devri)',
      tarih_iso: dt.tarih_iso,
      hazirlik_zamani: 'Sabah 08:00 Açılış & Akşam 17:30 Kapanış',
      ikon: '🛡️',
      renk: '#F1F5F9',
      sesli_geribildirim: 'Nöbetçi idareci denetimi, kamera sistemi kontrolü ve bina kapanış devir adımları oluşturuldu.'
    };
  }

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
      baslik: 'e-Okul Not Kilidi & Maarif Çıktı Analizi',
      kategori: 'Öğretmenlik',
      mevzuat_notu: 'MEB Ölçme ve Değerlendirme Yönetmeliği ile Türkiye Yüzyılı Maarif Modeli uyarınca sınav sonuçları, açık uçlu madde analizleri ve öğrenme çıktıları (ÖÇ) sınav tarihinden itibaren en geç 10 gün içinde e-Okul\'a girilmelidir.',
      action_items: [
        { task: 'Sınav cevap anahtarı ve dereceli puanlama rubriğini okul duyuru panosuna asarak öğrencilere duyur', is_completed: false },
        { task: 'Yazılı kağıtlarını analitik rubrikle oku ve soru bazlı öğrenme çıktısı (ÖÇ) analiz tablosunu doldur', is_completed: false },
        { task: 'e-Okul sistemine sınav notlarını ve süreç bileşeni eksikliklerini işleyerek not kilidini kapat', is_completed: false },
        { task: 'İmzalı sınav analiz çıktısı, cevap anahtarı ve kağıtları zümre başkanına teslim tutanağıyla ilet', is_completed: false }
      ],
      zaman_etiketi: 'Son 10 Gün (Not Kilitleme)',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Sınav Sonrası İlk 3 Gün (Okuma Başlangıcı)',
      ikon: '✍️',
      renk: '#FEF08A',
      sesli_geribildirim: 'Sınav not girişi için 10 günlük e-Okul sayacı ve Maarif öğrenme çıktısı analizi oluşturuldu.'
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
      mevzuat_notu: 'MEB Eğitim Kurulları ve Zümreleri Yönergesi ile Türkiye Yüzyılı Maarif Modeli uyarınca zümre kararlarında öğrenme çıktıları, süreç odaklı ölçme araçları ve farklılaştırma eylemleri yer almalıdır.',
      action_items: [
        { task: 'Toplantı gündem maddelerini, Maarif Modeli öğrenme çıktıları gerçekleşme durumunu ve önceki karar tutanaklarını hazırla', is_completed: false },
        { task: 'Öğrenme çıktıları analizi, süreç odaklı değerlendirme sonuçları ve telafi/farklılaştırma (zenginleştirme/destekleme) eylem planını karara bağla', is_completed: false },
        { task: 'Zümre / ŞÖK toplantı tutanağını tüm kurul üyelerine eksiksiz imzalat', is_completed: false },
        { task: 'İmzalı karar tutanağını ve çalışma takvimini DYS üzerinden Okul Müdürü onayına sun', is_completed: false }
      ],
      zaman_etiketi: 'Toplantı Günü',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Toplantıdan 1 Gün Önce Gündem Dağıtımı',
      ikon: '📑',
      renk: '#FEF08A',
      sesli_geribildirim: 'Maarif Modeli zümre ve ŞÖK toplantı gündemi, imza föyü ve karar tutanağı adımları hazırlandı.'
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

  // 16. OKUL GEZİSİ, VELİ İZİN MUVAFAKATNAMESİ & KAYMAKAMLIK/İLÇE MEM ONAY PROTOKOLÜ
  if (
    text.includes('okul gezisi') ||
    text.includes('sosyal etkinlik gezisi') ||
    text.includes('veli izin belgesi') ||
    text.includes('veli muvafakatname') ||
    text.includes('türsab') ||
    text.includes('tursab') ||
    text.includes('d2 belgeli') ||
    (text.includes('gezi') && (text.includes('okul') || text.includes('öğrenci') || text.includes('kaymakamlık') || text.includes('onay')))
  ) {
    const geziDue = addBusinessDays(now, 7);

    return {
      id: `edu_gezi_${Date.now()}`,
      baslik: 'Okul Gezisi & Veli İzin / DYS Onay Dosyası',
      kategori: 'Sosyal Etkinlik & Gezi',
      mevzuat_notu: 'MEB Sosyal Etkinlikler Yönetmeliği uyarınca il dışı/il içi gezilerde TÜRSAB acente sözleşmesi, D2 araç belgesi, ferdi kaza sigortası ve mülki amir (Kaymakamlık) Oluru zorunludur.',
      action_items: [
        { task: 'Geziye katılacak tüm öğrencilerin ıslak imzalı Veli İzin Muvafakatnamelerini topla ve dosyala', is_completed: false },
        { task: 'TÜRSAB onaylı seyahat acentesi sözleşmesi, D2 taşımacılık yetki belgesi ve araç şoför belgelerini kontrol et', is_completed: false },
        { task: 'Öğrenci isim listesi, refakatçi öğretmen görevlendirmesi ve gezi planını DYS üzerinden İlçe MEM / Kaymakamlık onayına gönder', is_completed: false },
        { task: 'Gezi bitiminde gezi değerlendirme raporunu ve fotoğraflarını e-Okul Sosyal Etkinlikler Modülüne yükle', is_completed: false }
      ],
      zaman_etiketi: 'Gezi Öncesi (En Geç 7 Gün Önce Onay)',
      tarih_iso: geziDue.toISOString(),
      hazirlik_zamani: 'Geziden 1 Hafta Önce (DYS Kaymakamlık Oluru)',
      ikon: '🚌',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Okul gezisi yasal izin dosyası, TÜRSAB ve veli muvafakatname süreci planlandı.'
    };
  }

  // 17. AÇIK UÇLU ORTAK SINAV & MEB SORU DAĞILIM TABLOSU / PUANLAMA BAREMİ
  if (
    text.includes('açık uçlu') ||
    text.includes('acik uclu') ||
    text.includes('ortak yazılı') ||
    text.includes('ortak yazili') ||
    text.includes('ülke geneli ortak') ||
    text.includes('il geneli ortak') ||
    text.includes('soru dağılım tablosu') ||
    text.includes('senaryo tablosu') ||
    text.includes('madde analizi') ||
    text.includes('dereceli puanlama')
  ) {
    const sinavDate = new Date(now);
    sinavDate.setDate(sinavDate.getDate() + 10);
    sinavDate.setHours(17, 0, 0, 0);

    return {
      id: `edu_acik_uclu_${Date.now()}`,
      baslik: 'Açık Uçlu Ortak Sınav & Barem Analizi',
      kategori: 'Öğretmenlik',
      mevzuat_notu: 'MEB Ölçme ve Değerlendirme Yönetmeliği gereğince tüm yazılı sınavlar açık uçlu veya kısa cevaplı maddelerden oluşmalı, MEB il zümre konu soru dağılım senaryolarına tam uyulmalıdır.',
      action_items: [
        { task: 'İl zümre başkanları kurulu tarafından yayımlanan konu soru dağılım senaryosunu (Senaryo 1/2) seç ve ilan et', is_completed: false },
        { task: 'Açık uçlu sınav sorularını ve her soruya ait detaylı puanlama baremini (Rubrik) hazırla', is_completed: false },
        { task: 'Sınav kağıtlarını zümre öğretmenleriyle birlikte çift okuma veya bağımsız puanlama baremiyle değerlendir', is_completed: false },
        { task: 'Madde analizi ve kazanım kavrama oranlarını çıkararak e-Okul ortak sınav analiz modülüne kaydet', is_completed: false }
      ],
      zaman_etiketi: '10 Günlük Not & Barem Kilidi',
      tarih_iso: sinavDate.toISOString(),
      hazirlik_zamani: 'Sınav Öncesi Barem Dağıtımı',
      ikon: '📝',
      renk: '#FEF08A',
      sesli_geribildirim: 'Açık uçlu sınav senaryosu, soru dağılım baremi ve kazanım analizi adımları oluşturuldu.'
    };
  }

  // 18. SAĞLIK RAPORLU ÖĞRENCİ MAZERET SINAVI (RAPOR BİTİMİNDEN İTİBAREN 5 GÜN)
  if (
    text.includes('mazeret sınavı') ||
    text.includes('mazeret sinavi') ||
    text.includes('raporlu öğrenci sınavı') ||
    text.includes('mazeretli yazılı') ||
    (text.includes('mazeret') && (text.includes('sınav') || text.includes('sinav') || text.includes('yazılı') || text.includes('yazili') || text.includes('öğrenci')))
  ) {
    const mazeretDue = addBusinessDays(now, 5);

    return {
      id: `edu_mazeret_${Date.now()}`,
      baslik: 'Mazeret Sınavı & Telafi Değerlendirmesi',
      kategori: 'Öğretmenlik',
      mevzuat_notu: 'MEB Kurumları Yönetmeliği uyarınca geçerli mazereti (sağlık raporu vb.) bulunan öğrenciler, mazeretin bitimini izleyen 5 iş günü içinde zümre öğretmenlerince mazeret sınavına alınır.',
      action_items: [
        { task: 'Öğrencinin sağlık raporunu veya resmi mazeret dilekçesini e-Okul sistemine işle ve idare onayını al', is_completed: false },
        { task: 'Zümre ortak kararıyla paralel kazanımları içeren eşdeğer mazeret sınav kağıdını hazırla', is_completed: false },
        { task: 'Öğrenciye ve veliye mazeret sınavının gün ve saatini resmi olarak tebliğ et', is_completed: false },
        { task: 'Sınavı uygulayıp kağıdı oku, notu e-Okul mazeret sınav hanesine girerek kaydı tamamla', is_completed: false }
      ],
      zaman_etiketi: 'Mazeret Bitiminden 5 İş Günü',
      tarih_iso: mazeretDue.toISOString(),
      hazirlik_zamani: 'Rapor Geldiğinde Eşdeğer Sınav Hazırlığı',
      ikon: '📋',
      renk: '#FEF08A',
      sesli_geribildirim: 'Sağlık raporlu öğrenci için 5 iş günü yasal mazeret sınavı süreci takvimlendi.'
    };
  }

  // 19. MESEM, ÇIRAKLIK, İŞLETMEDE BECERİ EĞİTİMİ & 3308 STAJYER SGK TAKİBİ
  if (
    text.includes('mesem') ||
    text.includes('çıraklık') ||
    text.includes('ciraklik') ||
    text.includes('3308') ||
    text.includes('işletmelerde mesleki eğitim') ||
    text.includes('isletmelerde mesleki egitim') ||
    text.includes('staj sözleşmesi') ||
    text.includes('stajyer sgk') ||
    text.includes('koordinatör öğretmen') ||
    text.includes('koordinator ogretmen') ||
    text.includes('usta öğretici') ||
    text.includes('usta ogretici')
  ) {
    return {
      id: `edu_mesem_${Date.now()}`,
      baslik: 'MESEM & 3308 Stajyer SGK / Sözleşme Dosyası',
      kategori: 'Mesleki Eğitim & Staj',
      mevzuat_notu: '3308 Sayılı Mesleki Eğitim Kanunu uyarınca stajyer öğrencilerin SGK iş kazası ve meslek hastalığı işe giriş bildirgeleri staja başlamadan en az 1 gün önce onaylanmalıdır.',
      action_items: [
        { task: 'İşletme, okul ve veli arasında 3308 sayılı İşletmelerde Mesleki Eğitim Sözleşmesini eksiksiz imzalat', is_completed: false },
        { task: 'Öğrencinin SGK 4/a (İş Kazası ve Meslek Hastalığı) e-Sigorta işe giriş bildirgesini staj başlamadan 1 gün önce onayla', is_completed: false },
        { task: 'Aylık koordinatörlük öğretmen takip föyünü ve işletme staj devam-devamsızlık çizelgelerini dosyala', is_completed: false },
        { task: 'İşletmeye ödenen devlet katkısı için usta öğreticilik belgesi ve banka dekont kontrolünü yap', is_completed: false }
      ],
      zaman_etiketi: 'Staj Öncesi SGK (T-1 Gün) / Aylık Takip',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Staj Başlamadan 1 Gün Önce SGK Girişi',
      ikon: '🛠️',
      renk: '#FED7AA',
      sesli_geribildirim: 'MESEM 3308 staj sözleşmesi, koordinatörlük föyü ve SGK işe giriş protokolü açıldı.'
    };
  }

  // 20. İYEP (İLKOKULLARDA YETİŞTİRME PROGRAMI) & ÖĞRENCİ BELİRLEME MODÜLÜ
  if (
    text.includes('iyep') ||
    text.includes('ilkokullarda yetiştirme') ||
    text.includes('iyep modülü') ||
    text.includes('öbiç') ||
    text.includes('öğrenci belirleme aracı')
  ) {
    return {
      id: `edu_iyep_${Date.now()}`,
      baslik: 'İYEP Öğrenci Belirleme & Kurs Takvimi',
      kategori: 'Öğretmenlik',
      mevzuat_notu: 'MEB İYEP Yönergesi uyarınca 3. ve 4. sınıf öğrencilerine Öğrenci Belirleme Aracı (ÖBA) uygulanır, Modül 1/2/3 seviye tespiti yapılarak veli muvafakatiyle kurs açılır.',
      action_items: [
        { task: 'Öğrenci Belirleme Aracını (ÖBA) 3. ve 4. sınıflara uygulayarak cevap formlarını oku', is_completed: false },
        { task: 'e-Okul İYEP Modülüne öğrenci puanlarını girip Modül 1, 2 veya 3 düzeyindeki hedef kitleyi belirle', is_completed: false },
        { task: 'İYEP kursuna dahil edilecek öğrencilerin veli muvafakatnamelerini imzalatıp arşivle', is_completed: false },
        { task: 'Haftalık İYEP ders saatleri ve öğretmen görevlendirmesini okul idaresi onayına sun', is_completed: false }
      ],
      zaman_etiketi: 'Dönem Başı İYEP Takvimi',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'ÖBA Uygulama Haftası',
      ikon: '📖',
      renk: '#FEF08A',
      sesli_geribildirim: 'İYEP öğrenci belirleme modülü, ÖBA analizi ve veli izin adımları hazırlandı.'
    };
  }

  // 21. MEBBİS NORM KADRO & HAFTALIK DERS DAĞITIM ÇİZELGELERİ (ASC TIMETABLES)
  if (
    text.includes('norm kadro') ||
    text.includes('norm fazlası') ||
    text.includes('norm fazlasi') ||
    text.includes('ders dağıtım') ||
    text.includes('ders dagitim') ||
    text.includes('asc timetables') ||
    text.includes('haftalık ders çizelgesi')
  ) {
    return {
      id: `edu_norm_kadro_${Date.now()}`,
      baslik: 'MEBBİS Norm Kadro & Ders Dağıtım Protokolü',
      kategori: 'Özlük & Puantaj',
      mevzuat_notu: 'MEB Norm Kadro Yönetmeliği gereği ders yükü ve şube sayıları her yıl Ekim ayında MEBBİS modülüne girilir; norm fazlası veya norm ihtiyacı olan branşlar ilçe MEM\'e bildirilir.',
      action_items: [
        { task: 'Toplam şube sayısı ve haftalık ders saatlerini branşlar bazında hesaplayarak norm tablosunu çıkar', is_completed: false },
        { task: 'MEBBİS Norm Kadro Modülüne okul verilerini hatasız işleyip İlçe MEM onayına sun', is_completed: false },
        { task: 'Öğretmenlerin nöbet ve boş gün taleplerini gözeterek haftalık ders programını (ASC) oluştur', is_completed: false },
        { task: 'Haftalık ders dağıtım çizelgesini öğretmenlere ıslak imzayla tebliğ et ve panolara as', is_completed: false }
      ],
      zaman_etiketi: 'Ekim Ayı Norm Güncellemesi',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Dönem Başı / Şube Belirleme',
      ikon: '📊',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Norm kadro MEBBİS güncellemesi ve haftalık ders dağıtım tebliği takvimlendi.'
    };
  }

  // 22. ADAY ÖĞRETMENLİK (AÖP) & DANIŞMAN ÖĞRETMEN DERS İZLEME FORMU
  if (
    text.includes('aday öğretmen') ||
    text.includes('aday ogretmen') ||
    text.includes('danışman öğretmen') ||
    text.includes('danisman ogretmen') ||
    text.includes('adaylık kaldırma') ||
    text.includes('adaylik kaldirma') ||
    text.includes('aöp') ||
    text.includes('ders izleme formu')
  ) {
    return {
      id: `edu_aday_ogretmen_${Date.now()}`,
      baslik: 'Aday Öğretmenlik & Danışman İzleme Dosyası',
      kategori: 'Öğretmenlik',
      mevzuat_notu: 'MEB Öğretmenlik Meslek Kanunu ve Aday Öğretmenlik Yetiştirme Programı uyarınca danışman öğretmen haftalık ders izleme ve okul içi/dışı etkinlik formlarını tanzim eder.',
      action_items: [
        { task: 'Danışman öğretmen eşliğinde haftalık ders gözlem formunu doldur ve aday öğretmene geri bildirim ver', is_completed: false },
        { task: 'Okul içi idari işleyiş (DYS, nöbet, kurul toplantıları) gözlem tutanağını hazırla', is_completed: false },
        { task: 'Aday öğretmen yetiştirme programı çalışma dosyasını MEBBİS modülüne yükle', is_completed: false },
        { task: 'Dönem sonu aday öğretmen değerlendirme formunu Okul Müdürü ve Danışman onayıyla tamamla', is_completed: false }
      ],
      zaman_etiketi: 'Haftalık İzleme / Dönemlik Dosya',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Ders Öncesi Gözlem Planı',
      ikon: '🧑‍🏫',
      renk: '#FEF08A',
      sesli_geribildirim: 'Aday öğretmen yetiştirme süreci, danışman gözlem formu ve MEBBİS onay basamakları açıldı.'
    };
  }

  // 23. ÜNİVERSİTE / AKADEMİ: DERS İZLENCESİ (SYLLABUS) & BOLOGNA / AKTS KREDİLENDİRME
  if (
    text.includes('syllabus') ||
    text.includes('ders izlencesi') ||
    text.includes('ders izlencesı') ||
    text.includes('bologna') ||
    text.includes('akts') ||
    text.includes('ects') ||
    text.includes('öğrenme çıktıları') ||
    text.includes('obs not girişi') ||
    text.includes('bağıl değerlendirme') ||
    text.includes('çan eğrisi')
  ) {
    return {
      id: `edu_syllabus_${Date.now()}`,
      baslik: 'Ders İzlencesi (Syllabus) & Bologna / AKTS Paketi',
      kategori: 'Akademi & Araştırma',
      mevzuat_notu: 'YÖK ve Bologna Süreci Standartları gereği her dersin 14 haftalık izlencesi, AKTS iş yükü tablosu, değerlendirme kriterleri (vize/final ağırlığı) dönem başında OBS\'de ilan edilmelidir.',
      action_items: [
        { task: '14 haftalık konu başlıklarını, zorunlu/önerilen kaynakları ve haftalık okumaları syllabus formatında yaz', is_completed: false },
        { task: 'Dersin AKTS iş yükü (derse katılım, ödev, sınav hazırlığı) tablosunu Bologna bilgi paketine işle', is_completed: false },
        { task: 'Vize, final, ödev ve proje değerlendirme yüzdelerini OBS (Öğrenci Bilgi Sistemi) ortamında onayla', is_completed: false },
        { task: 'Syllabus belgesini ilk ders gününden önce ders yönetim sistemine (Moodle/Blackboard) yükle', is_completed: false }
      ],
      zaman_etiketi: 'Dönem Başı / 1. Hafta',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Dönem Başlamadan 1 Hafta Önce',
      ikon: '🎓',
      renk: '#DDD6FE',
      sesli_geribildirim: 'Ders izlencesi (Syllabus), Bologna AKTS tablosu ve OBS değerlendirme kriterleri oluşturuldu.'
    };
  }

  // 24. LİSANSÜSTÜ TEZ JÜRİSİ, TİK (TEZ İZLEME KOMİTESİ) & TURNİTİN İNTİHAL RAPORU (<%20)
  if (
    text.includes('turnitin') ||
    text.includes('intihal raporu') ||
    text.includes('intihal orani') ||
    text.includes('tik raporu') ||
    text.includes('tez izleme komitesi') ||
    text.includes('doktora yeterlik') ||
    text.includes('doktora yeterlilik') ||
    (text.includes('tez') && (text.includes('savunma') || text.includes('jüri') || text.includes('enstitü')))
  ) {
    const due = new Date(now);
    due.setDate(due.getDate() + 15);
    due.setHours(17, 0, 0, 0);

    return {
      id: `edu_tez_tik_${Date.now()}`,
      baslik: 'Tez Jürisi, TİK & Turnitin İntihal Kontrolü',
      kategori: 'Akademi & Araştırma',
      mevzuat_notu: 'Lisansüstü Eğitim ve Öğretim Yönetmeliği uyarınca savunma öncesi Turnitin intihal benzerlik oranı %20\'nin altında olmalı, asil ve yedek jüri üyelerine tezin basılı nüshası en geç 15 gün önce teslim edilmelidir.',
      action_items: [
        { task: 'Tezin son halini Turnitin/iThenticate sistemine yükleyerek benzerlik raporunu (alıntılar hariç <%20) al', is_completed: false },
        { task: 'Enstitü Yönetim Kurulu onaylı asil ve yedek 5 jüri üyesine tez nüshalarını ve resmi davet yazılarını ilet', is_completed: false },
        { task: 'Doktora Tez İzleme Komitesi (TİK) 6 aylık rapor tutanağını Enstitüye süresi içinde teslim et', is_completed: false },
        { task: 'Tez savunma sınavı tutanağını ve jüri kişisel değerlendirme raporlarını savunma bitiminde imzalat', is_completed: false }
      ],
      zaman_etiketi: 'Savunmadan 15 Gün Önce (Jüri Teslim)',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Turnitin İntihal Taraması Öncesi',
      ikon: '🔬',
      renk: '#DDD6FE',
      sesli_geribildirim: 'Turnitin intihal raporu, jüri teslim süreci ve tez savunma takvimi oluşturuldu.'
    };
  }

  // 25. BİNA SINAV KOMİSYONU (BSK) & MERKEZİ SINAV (ÖSYM GİS / MEB MEBBİS) PROTOKOLÜ
  if (
    text.includes('bina sınav komisyonu') ||
    text.includes('bina sinav komisyonu') ||
    text.includes('öbel') ||
    text.includes('bina sınav sorumlusu') ||
    text.includes('bina denetim') ||
    text.includes('öğrenci girişi arama') ||
    (text.includes('sınav') && (text.includes('kurye') || text.includes('mühürlü poşet') || text.includes('gis görev') || text.includes('öly')))
  ) {
    return {
      id: `edu_bsk_merkezi_${Date.now()}`,
      baslik: 'Bina Sınav Komisyonu & Merkezi Sınav Güvenliği',
      kategori: 'Merkezi Sınav & BSK',
      mevzuat_notu: 'ÖSYM ve MEB Merkezi Sınav Yönergesi uyarınca Bina Sınav Komisyonu sınavdan en az 2 saat önce binada hazır bulunur, mühürlü kutular emniyet kuryesi ve tutanakla teslim alınır.',
      action_items: [
        { task: 'Sınav saatinden 2 saat önce salon başkanları ve gözetmenlerle toplantı yaparak görev kartlarını dağıt', is_completed: false },
        { task: 'Emniyet kuryesinden sınav soru/cevap evrakı kilitli kutularını teslim tutanağıyla teslim al', is_completed: false },
        { task: 'Sinyal kesici (Jammer) ve salon duvar saati kontrollerini tamamla; adayların elektronik cihazsız girişini sağla', is_completed: false },
        { task: 'Sınav bitiminde salon sınav poşetlerinin eksiksiz ve mühürlü olduğunu teyit edip kuryeye teslim et', is_completed: false }
      ],
      zaman_etiketi: 'Sınav Sabahı (T-2 Saat)',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Sınavdan 1 Gün Önce Salon Numaralandırma',
      ikon: '🛡️',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Bina sınav komisyonu güvenlik adımları, mühürlü poşet ve kurye teslim protokolü hazırlandı.'
    };
  }

  // 26. OKUL ÖNCESİ / ANAOKULU GÜNLÜK AKIŞ & GELİŞİM GÖZLEM FORMU
  if (
    text.includes('anaokulu') ||
    text.includes('okul öncesi') ||
    text.includes('okul oncesi') ||
    text.includes('kreş') ||
    text.includes('kres') ||
    text.includes('gelişim gözlem formu') ||
    text.includes('gelisim gozlem') ||
    text.includes('çember saati') ||
    text.includes('günlük eğitim akışı')
  ) {
    return {
      id: `edu_okul_oncesi_${Date.now()}`,
      baslik: 'Okul Öncesi Günlük Akış & Gelişim Formu',
      kategori: 'Öğretmenlik',
      mevzuat_notu: 'MEB Okul Öncesi Eğitim Programı uyarınca güne başlama, oyun, öğrenme merkezleri ve beslenme saatleri günlük akışa göre yürütülür, dönemlik Gelişim Gözlem Formları e-Okul\'a işlenir.',
      action_items: [
        { task: 'Güne başlama çemberinde günün hava durumu, takvimi ve merkez etkinliklerinin duyurusunu yap', is_completed: false },
        { task: 'Öğrenme merkezlerinde (blok, dramatik oyun, sanat, kitap) çocukların serbest oyunlarını gözlemle', is_completed: false },
        { task: 'Çocukların bilişsel, motor ve dil gelişimine dair bireysel gözlem notlarını portfolyoya kaydet', is_completed: false },
        { task: 'Dönem sonu MEB Okul Öncesi Gelişim Raporlarını e-Okul modülüne girerek çıktısını velilere ilet', is_completed: false }
      ],
      zaman_etiketi: 'Günlük Akış & Dönemlik Portfolyo',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Sabah 08:30 (Merkezlerin Hazırlığı)',
      ikon: '🎨',
      renk: '#FBCFE8',
      sesli_geribildirim: 'Okul öncesi günlük akış, öğrenme merkezleri ve gelişim gözlem formu takvimlendi.'
    };
  }

  // 27. MEB ÜCRETSİZ DERS KİTABI SAYIMI & KİTAP SEÇİM MODÜLÜ
  if (
    text.includes('ders kitabı') ||
    text.includes('ders kitabi') ||
    text.includes('kitap seçim modülü') ||
    text.includes('kitap secim modulu') ||
    text.includes('ücretsiz ders kitabı') ||
    text.includes('hurda kitap') ||
    text.includes('kitap teslim')
  ) {
    return {
      id: `edu_ders_kitabi_${Date.now()}`,
      baslik: 'Ücretsiz Ders Kitabı & MEBBİS Kitap Seçimi',
      kategori: 'Mevzuat & DYS',
      mevzuat_notu: 'MEB Ders Kitapları ve Eğitim Araçları Yönetmeliği uyarınca gelecek eğitim yılı ders kitabı ihtiyaçları MEBBİS Kitap Seçim Modülüne süresi içinde işlenir, hurda kitaplar tutanakla geri dönüşüme verilir.',
      action_items: [
        { task: 'Öğrenci şube sayıları ve tahmini kayıt projeksiyonuna göre ders kitabı ihtiyaç sayılarını çıkar', is_completed: false },
        { task: 'MEBBİS Kitap Seçim Modülüne branş ve sınıf bazlı ders kitabı sayı girişini yaparak onayla', is_completed: false },
        { task: 'Yaz döneminde okula gelen ücretsiz ders kitaplarını paket bazında sayarak irsaliye ile teslim al', is_completed: false },
        { task: 'Eski ve kullanılmayan atık kitapları hurda geri dönüşüm komisyonu tutanağı ile teslim et', is_completed: false }
      ],
      zaman_etiketi: 'MEBBİS Kitap Modülü Takvimi',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Dönem Başı Sayım Haftası',
      ikon: '📚',
      renk: '#FEF08A',
      sesli_geribildirim: 'Ders kitabı sayımı, MEBBİS kitap seçim girişi ve geri dönüşüm adımları kaydedildi.'
    };
  }

  // 28. ÖZEL ÖĞRETİM KURUMLARI / KURS & MEB RUHSAT / BAKANLIK DENETİMİ
  if (
    text.includes('özel okul') ||
    text.includes('ozel okul') ||
    text.includes('özel öğretim') ||
    text.includes('ozel ogretim') ||
    text.includes('kurs açma') ||
    text.includes('kurum açma izni') ||
    text.includes('çalışma ruhsatı') ||
    text.includes('calisma ruhsati') ||
    text.includes('ücret ilanı') ||
    text.includes('ucret ilani')
  ) {
    return {
      id: `edu_ozel_ogretim_${Date.now()}`,
      baslik: 'Özel Öğretim Ruhsat & Bakanlık Denetim Dosyası',
      kategori: 'Mevzuat & DYS',
      mevzuat_notu: '5580 Sayılı Özel Öğretim Kurumları Kanunu uyarınca bina yerleşim planı, itfaiye yangın raporu, sağlık uygunluk raporu, öğretmen MEBBİS çalışma izinleri ve yıllık ücret ilanları tam olmalıdır.',
      action_items: [
        { task: 'İtfaiye yangın emniyet raporu, ilçe sağlık uygunluk belgesi ve bina deprem dayanım raporunu dosyala', is_completed: false },
        { task: 'Tüm eğitim personelinin MEBBİS üzerinden atanma ve çalışma izin (onay) belgelerini kontrol et', is_completed: false },
        { task: 'Eğitim ve yemek/servis ücretlerini Mayıs ayı sonuna kadar MEBBİS modülüne girip veli panosunda ilan et', is_completed: false },
        { task: 'Kurum açma ve yerleşim planı krokisi ile derslik kontenjan levhalarını denetle', is_completed: false }
      ],
      zaman_etiketi: 'Yıllık MEB Özel Öğretim Denetimi',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Denetim Öncesi Evrak Arşivi',
      ikon: '🏫',
      renk: '#E0E7FF',
      sesli_geribildirim: '5580 Özel Öğretim mevzuatı, MEBBİS personel izinleri ve ücret ilanı dosyası açıldı.'
    };
  }

  // 29. GENEL EĞİTİM & OKUL YÖNETİMİ FALLBACK (Sadece eğitim terimleri geçtiğinde)
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
