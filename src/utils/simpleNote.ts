import type { NotiviaParsedNote, NotiviaSimpleNote } from '../types/notivia.ts';
import { normalizePhoneticJargon } from './phoneticNormalizer.ts';
import { extractEntityMetrics } from './entityMetricExtractor.ts';
import { detectMilestoneChain } from './milestoneChainEngine.ts';
import { generateNextActionSuggestion } from './nextActionEngine.ts';
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
import {
  isAdministrativeContext,
  ADMINISTRATIVE_SHIELD
} from './administrativeShield.ts';
import {
  parseSchoolAdminIntent,
  type SchoolAdminTask
} from '../services/educationAdminEngine.ts';
import {
  parseVeterinaryIntent,
  type VeterinaryTask
} from '../services/veterinaryEngine.ts';
import {
  parsePharmacyIntent,
  type PharmacyTask
} from '../services/pharmacyEngine.ts';
import {
  parseOccupationalSafetyIntent,
  type OccupationalSafetyTask
} from '../services/occupationalSafetyEngine.ts';
import {
  parseAdvancedProfessionIntent,
  type AdvancedProfessionTask
} from '../services/advancedProfessionEngine.ts';
import {
  parseDefenseSecurityIntent,
  type DefenseSecurityTask
} from '../services/defenseSecurityEngine.ts';
import {
  parseArtMediaIntent,
  type ArtMediaTask
} from '../services/artMediaEngine.ts';
import { resolveInstitutionalReference } from './institutionalCalendar.ts';
import { estimateCognitiveLoad } from './cognitiveLoadEstimator.ts';
export { resolveInstitutionalReference } from './institutionalCalendar.ts';
export { estimateCognitiveLoad } from './cognitiveLoadEstimator.ts';

export {
  parseSchoolAdminIntent,
  type SchoolAdminTask
} from '../services/educationAdminEngine.ts';
export {
  parseVeterinaryIntent,
  type VeterinaryTask
} from '../services/veterinaryEngine.ts';
export {
  parsePharmacyIntent,
  type PharmacyTask
} from '../services/pharmacyEngine.ts';
export {
  parseOccupationalSafetyIntent,
  type OccupationalSafetyTask
} from '../services/occupationalSafetyEngine.ts';
export {
  parseArtMediaIntent,
  type ArtMediaTask
} from '../services/artMediaEngine.ts';
export { splitCompoundUtterance } from '../services/engine/sentenceSplitter.ts';
export {
  resolveContextualTime,
  type UserRhythmConfig
} from '../services/engine/temporalAnchor.ts';
export {
  evaluateConfidence,
  type EngineResult,
  type ParsedActionPayload,
  type NotiviaIntentType,
  type NotiviaOperationalCategory,
  type NotiviaCognitiveResult,
  calculateBufferTiming,
  resolveCycleInterval,
  NOTIVIA_COGNITIVE_SYSTEM_PROMPT
} from '../services/engine/orchestrator.ts';
export {
  PersonalCognitiveOrchestrator,
  DEFAULT_RHYTHM,
  type CognitiveCategory,
  type ActionItem,
  type OrchestratedItem
} from '../services/engine/PersonalCognitiveOrchestrator.ts';
export {
  isAdministrativeContext,
  ADMINISTRATIVE_SHIELD
} from './administrativeShield.ts';
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

  // Genel / Kişisel Yaşam & Ev Rutini tespiti
  if (
    domain === 'GENEL' ||
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
    /(konsültasyon|konsultasyon|epikriz|taburcu|taburculuk|pre-op|preop|post-op|postop|ameliyat|cerrahi|nöbet devri|sbar|dekübitus|dekubitus|pansuman|dikiş alma|dikis alma|soğuk zincir|soguk zincir|aşı dolabı|asi dolabi|otoklav|sterilizasyon|biyolojik spor|implant|protez|kanal tedavisi|endodonti|order|hbys|5 doğru|5 dogru|medula|karekod|miad|renkli reçete|kırmızı reçete|yeşil reçete|transfüzyon|cross-match|kan torbası|mavi kod|code blue|panik değer|adli vaka|adli rapor|kateter|damar yolu|branül|asm\b|gebe izlem|bebek izlem|112 acil|ambulans)/i.test(text)
  ) {
    const multiMedResult = parseMultiMedicationNote(text, targetIso ? new Date(targetIso) : new Date());
    if (multiMedResult) return multiMedResult;

    const clinicalResult = parseHealthcareClinicalNote(text, targetIso ? new Date(targetIso) : new Date(), domain);
    if (clinicalResult) return clinicalResult;
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

  // Ticaret & Esnaf Tespiti
  if (
    domain === 'TICARET' ||
    /(veresiye|toptancı|toptanci|mal kabul|irsaliye|çek ödemesi|cek odemesi|senet vadesi|kasa avansı|kasa avansi|z raporu|pos gün sonu|pos gun sonu|bağkur|bağ-kur|bagkur|dükkan kirası|dukkan kirasi|fiyat etiketi|oto tamir|balata|esnaf)/i.test(text)
  ) {
    const tradeResult = parseTradesmanLocalShopNote(text, targetIso ? new Date(targetIso) : new Date(), domain);
    if (tradeResult) return tradeResult;
  }

  // Gayrimenkul & Emlak Tespiti
  if (
    domain === 'EMLAK' ||
    /(taşınmaz ticareti|web-tapu|webtapu|tapu harcı|dask poliçesi|dask|ipotek fek|rayiç bedel|cayma akçesi|tahliye taahhütnamesi|tahliye taahhüt|kat irtifakı|kat mülkiyeti|iskan raporu|imar durumu|ada parsel|kira sözleşmesi|depozito mahsubu|emlakçı|gayrimenkul|yer gösterme belgesi|tapu devri)/i.test(text)
  ) {
    const reResult = parseRealEstateNote(text, targetIso ? new Date(targetIso) : new Date(), domain);
    if (reResult) return reResult;
  }

  // Ziraat & Botanik Tespiti
  if (
    domain === 'ZIRAAT' ||
    /(sulama serinliği|çiçek suvar|orkide daldırma|hobi bahçe|budama|peyzaj|botanik|ziraat|tarsim|çks|zirai don|damlama sulama|bordo bulamacı|aşı macunu|phi süresi|yaprak gübresi|taban gübresi|fertigasyon|kök mantarı|kök boğazı|çiçekler susamış|suvarıver|sulayuver|çiçek sula|sardunya|kaktüs sulama|sukulent|can suyu|fidan dikim|verticut|çim havalandırma)/i.test(text)
  ) {
    const agriResult = parseAgricultureBotanyNote(text, targetIso ? new Date(targetIso) : new Date(), domain);
    if (agriResult) return agriResult;
  }

  // Kamu, Bürokrasi & Kurumsal Ofis Tespiti
  if (
    domain === 'KAMU' ||
    domain === 'KURUMSAL' ||
    /(ebys|belgenet|dys|cimer|çimer|4734|22\/d|22-d|doğrudan temin|dogrudan temin|tif|tkys|mys v2|ödeme emri|piyasa fiyat araştırma|tek hekim|sağlık raporu|disiplin soruşturması|savunma istem|sayıştay|sorgu layihası|sgk işe giriş|işten ayrılış|özlük dosyası|yönetici asistanı|sekreter|vip brifing|toplantı tamponu|karar defteri|yönetim kurulu|hazirun|ttsg|satın alma teklif|nda|gizlilik sözleşmesi)/i.test(text)
  ) {
    const kamuResult = parseCivilServantPublicOfficeNote(text, targetIso ? new Date(targetIso) : new Date(), domain);
    if (kamuResult) return kamuResult;
  }

  // Mühendislik & Teknik Tespiti
  if (
    domain === 'TEKNIK' ||
    /(beton|şantiye|santiye|donatı|donati|kürleme|kurleme|kırım testi|kirim testi|kalıp|statik proje|trafo|pano|yüksek gerilim|yuksek gerilim|loto|kilitleme-etiketleme|kompanzasyon|reaktif ceza|endüktif|kapasitif|kompresör|kazan|basınçlı kap|hidrostatik test|vibrasyon|titreşim|yağ analizi|deploy|canlıya alma|canliya alma|migration|rollback|staging|semver|hotfix|sprint|siem|soc|firewall|fortigate|palo alto|waf|active directory|gpo|veeam|disaster recovery|dr tatbikatı|k8s|kubernetes|docker|pentest|sızma testi|zafiyet|zemin etüdü|spt|aplikasyon|nivo|total station|poligon|biyomedikal|kalibrasyon|iec 62353|fmea|kaizen|5s|spc)/i.test(text)
  ) {
    const engResult = parseEngineeringSuiteNote(text, targetIso ? new Date(targetIso) : new Date(), domain);
    if (engResult) return engResult;
  }

  // Denizcilik & Gemi İdaresi Tespiti
  if (
    domain === 'DENIZCILIK' ||
    /(psc|paris mou|med mou|liman devleti|draft survey|draft okuma|draft hesabı|densimetre|hidrometre|balast|ballast|bwm|bwts|sintine|ows|15 ppm|yağ jurnali|oil record book|orb|passage plan|sefer planı|dümen testi|ecdis|pilot çarmıh|pilot carmih|pilot ladder|kılavuz kaptan|kilavuz kaptan|mpx|pilot card|bunkering|bunker|yakıt ikmali|yakit ikmali|scupper|frengi|bdn|filika tatbikat|boat drill|terk-i sefine|terki sefine|abandon ship|solas|kapalı mahal|kapali mahal|enclosed space|sıcak çalışma|sicak calisma|hot work|demirleme|anchor watch|kaloma|demir tarama|isps|gangway|borda iskelesi|free pratique|deniz sağlık beyanı|sağlık bildirimi|gemi acente|crew list|ordino|çarkçı|carkci|başmühendis|basmuhendis|zabit|colreg|sea protest|deniz raporu|müşterek avarya|musterek avarya|general average|kaptan|gemi)/i.test(text)
  ) {
    const nauticalResult = parseMaritimeNauticalNote(text, targetIso ? new Date(targetIso) : new Date(), domain);
    if (nauticalResult) return nauticalResult;
  }

  // Lojistik, Taşımacılık & Tedarik Zinciri Tespiti
  if (
    domain === 'LOJISTIK' ||
    /(takograf|aetr|sürüş süresi|surus suresi|dinlenme molası|dinlenme molasi|şoför|sofor|tır\b|tir\b|kamyon|çekici|cekici|dorse|treyler|king-pin|kingpin|beşinci teker|besinci teker|pleyt|kantar|aks ağırlığı|aks agirligi|tonaj aşımı|tonaj asimi|lojistik|sevkiyat|cmr|sevk irsaliyesi|taşıma irsaliyesi|navlun|hasar rezerv|çekince|adr\b|tehlikeli madde|un no|un numarası|src5|src-5|turuncu plaka|kemler|frigo|soğuk zincir|soguk zincir|atp|data logger|termokin|reefer|t1\b|t2\b|ncts|mrn|tir karnesi|transit rejimi|gümrük mührü|gumruk muhru|wms|mal kabul|cross-docking|cross docking|palet sayımı|palet sayimi|fefo|fifo|rampa randevu|dock appointment|vgm|konteyner|demuraj|detention|ardiye|free time|bolt seal|cıvata mühür|civata muhur|eir|lashing|spanzet|yük emniyeti|yuk emniyeti|en 12195|kaymaz paspas|köşe koruyucu|kose koruyucu|hava kargo|air cargo|iata|dgr|awb|air waybill|uld|intermodal|ro-ro|ro-la|swap body|last-mile|last mile|son kilometre|kurye|paket dağıtım|paket dagitim|rota optimizasyonu|teslimat kodu|pod\b|tüvtürk|tuvturk|k2 belgesi|psikoteknik)/i.test(text)
  ) {
    const logisticsResult = parseLogisticsSupplyChainNote(text, targetIso ? new Date(targetIso) : new Date(), domain);
    if (logisticsResult) return logisticsResult;
  }

  // Savunma, Emniyet & Askeriye Tespiti
  if (
    domain === 'SAVUNMA' ||
    domain === 'EMNIYET' ||
    /(içtima|ictima|tekmil|silahlık|silahlik|doldur-boşalt|doldur bosalt|mühimmat sandığı|muhimmat sandigi|poligon|atış tatbikatı|atis tatbikati|kule nöbeti|kule nobeti|parola-işaret|parola isaret|kademe|zırhlı araç|zirhli arac|asayiş devriyesi|asayis devriyesi|gözaltı|gozalti|nezarethane|cmk 91|fezleke|adli muayene|olay yeri inceleme|oyi\b|kriminal delil|delil torbası|adli arama|suç eşyası|suc esyasi|yol kontrol|asayiş uygulama|5188|özel güvenlik|ozel guvenlik|x-ray|kapı dedektörü|itfaiye|scba|solunum tüpü|arazöz|arazoz|yangın uygunluk|baca denetimi)/i.test(text)
  ) {
    const defenseResult = parseDefenseSecurityIntent(text, targetIso ? new Date(targetIso) : new Date(), domain);
    if (defenseResult) {
      return {
        baslik: defenseResult.baslik,
        zaman: targetDateText || defenseResult.zaman_etiketi,
        tarih_iso: targetIso || defenseResult.tarih_iso,
        hazirlik_zamani: defenseResult.hazirlik_zamani,
        action_items: defenseResult.action_items,
        ikon: defenseResult.ikon,
        renk: defenseResult.renk,
        anomali_notu: defenseResult.mevzuat_notu,
        sesli_fisilti: defenseResult.sesli_geribildirim
      };
    }
  }

  // Sanat, Medya, Prodüksiyon & Sahne Sanatları Tespiti
  if (
    domain === 'SANAT_MEDYA' ||
    /(call sheet|callsheet|çekim planı|cekim plani|klaket|gaffer|dit|prores|color grading|davinci resolve|vectorscope|show lut|-23 lufs|ebu r128|broadcast master|soundcheck|teknik rider|stage plot|in-ear|rf tarama|isrc|mesam|müyap|split sheet|raw retouch|colorchecker|vernisaj|küratör|fine art baskı|paspartu|basın bülteni|ambargo|liveu|tvu|rundown|dress rehearsal|fsek|telif sözleşmesi)/i.test(text)
  ) {
    const artResult = parseArtMediaIntent(text, targetIso ? new Date(targetIso) : new Date(), domain);
    if (artResult) {
      return {
        baslik: artResult.baslik,
        zaman: targetDateText || artResult.zaman_etiketi,
        tarih_iso: targetIso || artResult.tarih_iso,
        hazirlik_zamani: artResult.hazirlik_zamani,
        action_items: artResult.action_items,
        ikon: artResult.ikon,
        renk: artResult.renk,
        anomali_notu: artResult.mevzuat_notu,
        sesli_fisilti: artResult.sesli_geribildirim
      };
    }
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

  let anomaliNotu = 'İlaçlar hekim/eczacı talimatına uygun olarak bol su ile alınmalı, biyolojik saat aralıklarına titizlikle uyulmalıdır.';
  if (lower.includes('mide koruyucu') || lower.includes('tiroit') || lower.includes('levotiron') || lower.includes('euthyrox')) {
    anomaliNotu = 'Mide koruyucu kahvaltıdan en az 30 dk önce alınmalı, süt ürünleriyle demir hapı karıştırılmamalıdır.';
  } else if (lower.includes('antibiyotik')) {
    anomaliNotu = 'Antibiyotik doz aralıklarına titizlikle uyulmalı, semptomlar gerilese dahi kutu tamamlanmalıdır.';
  } else if (lower.includes('demir') || lower.includes('kalsiyum')) {
    anomaliNotu = 'Demir preparatları süt, yoğurt ve çay/kahve ile birlikte alınmamalıdır; C vitamini emilimi artırır.';
  } else if (lower.includes('magnezyum') || lower.includes('melatonin')) {
    anomaliNotu = 'Magnezyum ve melatonin preparatları uyku kalitesini desteklemek üzere gece yatmadan 30-45 dk önce alınmalıdır.';
  }

  return {
    baslik: 'Günlük İlaç Takvimi',
    zaman: `Günde ${tasks.length} Doz`,
    tarih_iso: `${baseDate.toISOString().split('T')[0]}T${tasks[0].time}:00`,
    action_items: tasks,
    ikon: '💊',
    renk: '#F3E8FF',
    anomali_notu: anomaliNotu,
    sesli_fisilti: `${tasks.length} farklı ilaç dozu günün biyolojik saatlerine göre planlandı.`
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

export function parseEduManagerNote(input: string, baseDate: Date, userDomain?: string): NotiviaSimpleNote | null {
  const task = parseSchoolAdminIntent(input, baseDate, userDomain);
  if (!task) return null;

  return {
    baslik: task.baslik,
    zaman: task.zaman_etiketi,
    tarih_iso: task.tarih_iso,
    hazirlik_zamani: task.hazirlik_zamani,
    action_items: task.action_items,
    ikon: task.ikon,
    renk: task.renk,
    anomali_notu: task.mevzuat_notu,
    sesli_fisilti: task.sesli_geribildirim
  };
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

export function parseHealthcareClinicalNote(input: string, baseDate: Date, userDomain?: string): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();
  const isSaglikDomain = userDomain === 'SAGLIK' || userDomain === 'EMEKLİ' || (userDomain as string) === 'EMEKLILIK';

  const isClinical = isSaglikDomain ||
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
    lower.includes('mavi kod') || lower.includes('code blue') || lower.includes('2222') || lower.includes('cpr') || lower.includes('resüsitasyon') ||
    lower.includes('panik değer') || lower.includes('panik deger') || lower.includes('kritik sonuç') ||
    lower.includes('transfüzyon') || lower.includes('transfuzyon') || lower.includes('eritrosit') || lower.includes('kan torbası') ||
    lower.includes('kanal tedavisi') || lower.includes('endodonti') || lower.includes('apeks') ||
    lower.includes('asm') || lower.includes('gebe izlem') || lower.includes('bebek izlem') || lower.includes('hyp') ||
    lower.includes('112 acil') || lower.includes('ambulans') || lower.includes('paramedik') || lower.includes('att') ||
    lower.includes('cerrahi vaka') || lower.includes('ameliyathane') || (lower.includes('ameliyat') && (lower.includes('hazır') || lower.includes('onam') || lower.includes('premedikasyon') || lower.includes('plan')));

  if (!isClinical) return null;

  // 0. ÖNCELİK: KISA SENARYO VERİTABANI EŞLEŞMESİ (Scenario Database Lookup)
  const shortMatch = matchShortScenario(input, 'SAGLIK');
  if (shortMatch && shortMatch.domain === 'SAGLIK') {
    let targetIso: string | null = baseDate.toISOString();
    if (shortMatch.id === 'saglik_acil_konsultasyon_stat') {
      const due = new Date(baseDate);
      due.setMinutes(due.getMinutes() + 30);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'saglik_taburculuk_epikriz') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 10);
      due.setHours(10, 0, 0, 0);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'saglik_dis_implant_dikis') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 7);
      due.setHours(11, 0, 0, 0);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'saglik_hemsire_dekubitus') {
      const due = new Date(baseDate);
      due.setHours(due.getHours() + 2);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'saglik_preop_cerrahi_hazirlik') {
      const due = new Date(baseDate);
      due.setHours(due.getHours() - 8);
      targetIso = due.toISOString();
    }

    return {
      baslik: shortMatch.baslik,
      zaman: shortMatch.varsayilanZaman,
      tarih_iso: targetIso,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      action_items: shortMatch.oncedenYapilacaklar.map(t => ({ task: t, is_completed: false })),
      ikon: shortMatch.ikon,
      renk: shortMatch.renk,
      anomali_notu: shortMatch.akilliFisilti,
      sesli_fisilti: shortMatch.akilliFisilti
    };
  }

  // 1. ACİL & RESÜSİTASYON: MAVİ KOD (CODE BLUE 2222) / CPR RESÜSİTASYON (3 DK SLA)
  if (lower.includes('mavi kod') || lower.includes('code blue') || lower.includes('2222') || lower.includes('cpr') || lower.includes('arrest') || lower.includes('kalp masajı')) {
    const cprTime = new Date(baseDate);
    cprTime.setMinutes(cprTime.getMinutes() + 3);

    return {
      baslik: 'Mavi Kod & CPR Resüsitasyon',
      zaman: '3 Dk İçinde Olay Yerinde (Kritik SLA)',
      tarih_iso: cprTime.toISOString(),
      action_items: [
        { task: 'Mavi kod anons saatini ve olay yerine intikal süresini (maksimum 3 dk) kaydet', is_completed: false },
        { task: '30:2 göğüs basısı ve solutma döngüsü ile 2 dakikada bir ritim analizini sağla', is_completed: false },
        { task: 'İlk 3-5 dakika içinde 1 mg IV Epinefrin (Adrenalin) ve defibrilasyon hazırlığını yap', is_completed: false },
        { task: 'Mavi Kod Müdahale Tutanak Formunu doldurup Kalite Yönetim Birimine ilet', is_completed: false }
      ],
      ikon: '🚨',
      renk: '#BFDBFE',
      anomali_notu: 'Sağlıkta Kalite Standartları gereğince Mavi Kod ekibinin olay yerine intikal süresi maksimum 3 dakikadır.',
      sesli_fisilti: 'Mavi kod acil resüsitasyon protokolü ve 3 dakikalık intikal sayacı başlatıldı.'
    };
  }

  // 2. DOKTOR: ACİL KONSÜLTASYON / STAT KONS (30 DK SLA)
  if (lower.includes('acil konsültasyon') || lower.includes('acil konsultasyon') || lower.includes('stat kons') || lower.includes('kırmızı alan kons') || lower.includes('acil hekim kons') || lower.includes('konsültasyon istendi')) {
    const consultTime = new Date(baseDate);
    consultTime.setMinutes(consultTime.getMinutes() + 30);

    return {
      baslik: 'Acil Konsültasyon (30 Dk SLA)',
      zaman: '30 Dk İçinde (Kritik SLA)',
      tarih_iso: consultTime.toISOString(),
      action_items: [
        { task: '30 dakika içinde hastayı bizzat değerlendir ve konsültasyon notunu HBYS\'ye işle', is_completed: false },
        { task: 'İsteyen birim hekimi ile sözlü iletişim kur ve tedavi revizyonunu planla', is_completed: false },
        { task: 'Gerekli ek tetkik, EKG ve acil görüntüleme istemlerini HBYS üzerinden onayla', is_completed: false }
      ],
      ikon: '🩺',
      renk: '#E0F2FE',
      anomali_notu: 'Acil konsültasyonlar Sağlık Bakanlığı Kalite Standartları gereğince 30 dakika içinde yanıtlanmalıdır.',
      sesli_fisilti: 'Acil konsültasyon için 30 dakikalık kritik SLA sayacı başlatıldı.'
    };
  }

  // 3. ADLİ VAKA: ADLİ RAPOR, MUAYENE VE HASTANE POLİSİ BİLDİRİMİ
  if (lower.includes('adli vaka') || lower.includes('adli rapor') || lower.includes('adli muayene') || lower.includes('darp raporu') || lower.includes('adli emanet')) {
    return {
      baslik: 'Adli Vaka & Tıbbi Raporlama',
      zaman: 'Derhal (Resmi Kolluk Bildirimi)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Hastanın kimlik tespitini ve kolluk (polis/jandarma) sevk müzekkeresini kontrol et', is_completed: false },
        { task: 'Tüm lezyonların milimetrik boyut, renk ve anatomik lokalizasyonunu adli rapora 2 nüsha kaydet', is_completed: false },
        { task: 'Delil niteliğindeki eşya, giysi veya biyolojik materyalleri adli emanet torbasında mühürle', is_completed: false },
        { task: 'Raporu hastane polisine zimmet karşılığı teslim edip HBYS adli vaka kutucuğunu işaretle', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#FEF3C7',
      anomali_notu: 'Adli vakalarda düzenlenen geçici/kesin hekim raporu 2 nüsha tanzim edilir; resmi kolluk teslimi ve zimmet zorunludur.',
      sesli_fisilti: 'Adli vaka muayenesi, 2 nüsha rapor tanzimi ve kolluk teslim adımları oluşturuldu.'
    };
  }

  // 4. CERRAHİ: PRE-OP CERRAHİ HAZIRLIK (T-8 SAAT NPO, ANESTEZİ ONAMI, CROSS-MATCH)
  if (lower.includes('pre-op') || lower.includes('preop') || lower.includes('npo') || lower.includes('ameliyata hazırlık') || lower.includes('cerrahi hazırlık') || (lower.includes('ameliyat') && !lower.includes('çıktı') && !lower.includes('sonrası') && !lower.includes('post-op'))) {
    const npoDate = new Date(baseDate);
    npoDate.setHours(npoDate.getHours() - 8);

    return {
      baslik: 'Pre-Op Cerrahi Hazırlık',
      zaman: 'Ameliyattan 8 Saat Önce (NPO)',
      tarih_iso: npoDate.toISOString(),
      hazirlik_zamani: 'Operasyondan 8 Saat Önce (NPO & Tetkik)',
      action_items: [
        { task: 'T-8 saat: Ameliyat saatinden en az 8 saat önce tüm oral alımı (su dahil) kes (NPO)', is_completed: false },
        { task: 'EKG, kan grubu ve Kan Merkezinden ayrılan kan torbalarının cross-match teyidi', is_completed: false },
        { task: 'Aydınlatılmış cerrahi ve anestezi onam formunun ıslak imzalı olduğunu dosyala', is_completed: false },
        { task: 'Cerrahi taraf işaretleme ve premedikasyon tedavisini hekim orderına göre uygula', is_completed: false }
      ],
      ikon: '🏥',
      renk: '#E0F2FE',
      anomali_notu: 'Anestezi güvenliği için ameliyat saatinden en az 8 saat önce tüm oral alım (su dahil) kesilmelidir.',
      sesli_fisilti: 'Ameliyat öncesi 8 saatlik NPO açlık, cross-match ve anestezi onam adımları kuruldu.'
    };
  }

  // 5. CERRAHİ: POST-OP VİTAL & CERRAHİ SERVİS İZLEMİ (DREN, VİTAL, AÇT, ANALJEZİ)
  if (lower.includes('post-op') || lower.includes('postop') || lower.includes('ameliyat sonrası') || lower.includes('dren') || lower.includes('ameliyattan çıktı') || lower.includes('servise çıktı')) {
    return {
      baslik: 'Post-Op Vital & Cerrahi Servis İzlemi',
      zaman: '15 Dk / Saatlik Rutin Vital',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'İlk 2 saat 15 dakikada bir vital bulgu (Tansiyon, Nabız, SpO2, Solunum) kaydet', is_completed: false },
        { task: 'Cerrahi dren miktarı, rengi ve pansuman kanama sızıntı kontrolünü yap', is_completed: false },
        { task: 'Hastanın post-op aldığı-çıkardığı (AÇT) sıvı dengesini order föyüne işle', is_completed: false },
        { task: 'Cerrahi hekimin post-op analjezik ve antibiyotik orderını 5 Doğru Kuralı ile uygula', is_completed: false }
      ],
      ikon: '🩺',
      renk: '#E0F2FE',
      anomali_notu: 'Post-op ilk 2 saat 15 dakikada bir, sonraki 4 saatte yarım saatte bir vital bulgu ve dren takibi hayati önem taşır.',
      sesli_fisilti: 'Post-op 15 dakikalık vital izlem, dren takibi ve AÇT kontrol protokolü başlatıldı.'
    };
  }

  // 6. DOKTOR: HASTA TABURCULUK & EPİKRİZ (SGK e-REÇETE, EPİKRİZ, 10 GÜN SONRA KONTROL)
  if (lower.includes('taburcu') || lower.includes('taburculuk') || lower.includes('epikriz') || lower.includes('çıkış özeti')) {
    const controlDate = new Date(baseDate);
    controlDate.setDate(controlDate.getDate() + 10);

    return {
      baslik: 'Hasta Taburculuk & Epikriz',
      zaman: 'Taburculuk Saati (10 Gün Sonra Kontrol)',
      tarih_iso: controlDate.toISOString(),
      action_items: [
        { task: 'Detaylı klinik epikriz raporunu HBYS üzerinde tamamla ve e-İmzala', is_completed: false },
        { task: 'SGK Medula e-Reçetesini düzenleyip reçete şifresini hastaya/yakınına ilet', is_completed: false },
        { task: 'Taburculuk tarihinden 10 gün sonrasına ilgili poliklinikten kontrol randevusu planla', is_completed: false },
        { task: 'Çıkış patoloji, mikrobiyoloji ve açık laboratuvar tetkik onaylarını sistemden kapat', is_completed: false }
      ],
      ikon: '🩺',
      renk: '#E0F2FE',
      anomali_notu: 'Tüm açık tetkikler, e-Reçete ve HBYS epikriz raporu onaylanmadan hasta taburculuk işlemi sistemden kapatılamaz.',
      sesli_fisilti: 'Taburculuk epikrizi, e-Reçete ve 10 gün sonraki kontrol randevusu planlandı.'
    };
  }

  // 7. DOKTOR: RUTİN KONSÜLTASYON DEĞERLENDİRMESİ (24 SAAT SLA)
  if (lower.includes('konsültasyon') || lower.includes('konsultasyon') || lower.includes('kons iste')) {
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
      anomali_notu: 'Rutin konsültasyon yanıt süresi kalite standartları gereği en fazla 24 saattir.',
      sesli_fisilti: 'Rutin konsültasyon değerlendirme adımları oluşturuldu.'
    };
  }

  // 8. HEMŞİRE: KAN TRANSFÜZYONU & ÇİFT HEMŞİRE DOĞRULAMASI (4 SAAT SINIRI)
  if (lower.includes('transfüzyon') || lower.includes('transfuzyon') || lower.includes('kan tak') || lower.includes('eritrosit') || lower.includes('tdp') || lower.includes('kan torbası')) {
    return {
      baslik: 'Kan Transfüzyonu & Çift Hemşire Teyidi',
      zaman: 'Transfüzyon Saati (İlk 15 Dk Vital)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'İki sağlık personeli ile hasta kimliği, kan grubu, torba numarası ve cross-match teyidi yap', is_completed: false },
        { task: 'Transfüzyon öncesi başlangıç vital bulgularını (Ateş, TA, Nabız) kaydet', is_completed: false },
        { task: 'İlk 15 dakika hastanın başında kalarak anafilaksi ve transfüzyon reaksiyonu gözlemi yap', is_completed: false },
        { task: 'İnfüzyon süresinin maksimum 4 saati aşmamasını sağla ve boş torbayı 24 saat sakla', is_completed: false }
      ],
      ikon: '🩸',
      renk: '#FECACA',
      anomali_notu: 'Kan ürünü dolaptan çıktıktan sonra 30 dk içinde başlanmalı, ilk 15 dakika yatak başında vital izlenmeli ve infüzyon 4 saati aşmamalıdır.',
      sesli_fisilti: 'Çift hemşire doğrulamalı kan transfüzyon protokolü ve ilk 15 dakika gözlem adımı kuruldu.'
    };
  }

  // 9. HEMŞİRE: DEKÜBİTUS (BASI YARASI) POZİSYON DEĞİŞİMİ (2 SAATTE BİR)
  if (lower.includes('dekübitus') || lower.includes('dekubitus') || lower.includes('bası yarası') || lower.includes('pozisyon') || lower.includes('immobil')) {
    const posDate = new Date(baseDate);
    posDate.setHours(posDate.getHours() + 2);

    return {
      baslik: 'Dekübitus Pozisyon Değişimi',
      zaman: '2 Saatte Bir (Periyodik)',
      tarih_iso: posDate.toISOString(),
      action_items: [
        { task: 'Hastanın vücut pozisyonunu sırayla değiştir (Sol lateral / Supine / Sağ lateral)', is_completed: false },
        { task: 'Kemik çıkıntıları (Sakrum, iskium, topuklar, skapula) kızarıklık yönünden denetle ve bariyer krem sür', is_completed: false },
        { task: 'Pozisyon değişim saatini ve Braden bası yarası risk skorunu hemşire takip formuna işle', is_completed: false },
        { task: 'Havalı yatak basınç ayarını ve çarşaf kırışıklık kontrolünü tamamla', is_completed: false }
      ],
      ikon: '💉',
      renk: '#CCFBF1',
      anomali_notu: 'Yatağa bağımlı ve immobil hastalarda bası yarasını önlemek için en geç 2 saatte bir düzenli pozisyon değişimi zorunludur.',
      sesli_fisilti: 'İmmobil hasta için 2 saatlik periyodik dekübitus pozisyon alarmı kuruldu.'
    };
  }

  // 10. HEMŞİRE: SBAR NÖBET DEVİR-TESLİM FÖYÜ (T-45 DK KALA, ÇİFT İMZA NARKOTİK DOLABI)
  if (lower.includes('nöbet devir') || lower.includes('nobet devir') || lower.includes('hasta devri') || lower.includes('sbar') || lower.includes('narkotik sayımı') || lower.includes('hemşire devri')) {
    const handoffDate = new Date(baseDate);
    handoffDate.setMinutes(handoffDate.getMinutes() - 45);

    return {
      baslik: 'SBAR Nöbet Devir-Teslim Föyü',
      zaman: 'Nöbet Bitimine 45 Dk Kala',
      tarih_iso: handoffDate.toISOString(),
      action_items: [
        { task: 'SBAR (Durum, Arka Plan, Değerlendirme, Öneri) formatında hasta devir föyünü hazırla', is_completed: false },
        { task: 'Kırmızı/yeşil reçeteli narkotik ampul sayımını devralan hemşireyle bizzat sayıp çift imza at', is_completed: false },
        { task: 'Kritik laboratuvar sonuçları, vital trendler, açık mayiler ve orderları yeni ekibe aktar', is_completed: false },
        { task: 'Servis genel düzeni, arızalı cihazlar ve acil arabası (crash cart) mührünü teyit et', is_completed: false }
      ],
      ikon: '💉',
      renk: '#CCFBF1',
      anomali_notu: 'Nöbet devrinde hasta güvenliği için SBAR standardı ve narkotik dolabı çift imza protokolü zorunludur.',
      sesli_fisilti: 'Nöbet devir saatinden 45 dakika öncesine SBAR hasta teslim föyü hazırlığı alarmı kuruldu.'
    };
  }

  // 11. HEMŞİRE: SANTRAL KATETER (CVC) & PERİFERİK DAMAR YOLU (72 SAAT BRANÜL ROTASYONU)
  if (lower.includes('kateter') || lower.includes('cvc') || lower.includes('branül') || lower.includes('damar yolu') || lower.includes('damaryolu') || lower.includes('flebit') || lower.includes('pansuman')) {
    const branulDate = new Date(baseDate);
    branulDate.setHours(branulDate.getHours() + 72);

    return {
      baslik: 'Damar Yolu & Kateter Bakımı',
      zaman: '72 Saatlik Rotasyon & Pansuman',
      tarih_iso: branulDate.toISOString(),
      action_items: [
        { task: 'Giriş yerinde kızarıklık, endürasyon veya ağrı (VIP Flebit Skalası) kontrolü yap', is_completed: false },
        { task: 'Periferik IV branülü en geç 72 saatte bir karşı ekstremiteye rotasyon yap', is_completed: false },
        { task: 'Santral kateter (CVC) giriş yerini %2 klorheksidin ile temizle ve şeffaf steril örtü ile kapat', is_completed: false },
        { task: 'Yıkama (flushing) işlemini heparinli/salinli solüsyonla ordera göre tamamla', is_completed: false }
      ],
      ikon: '💉',
      renk: '#CCFBF1',
      anomali_notu: 'Periferik damar yolları flebit ve enfeksiyon riski nedeniyle maksimum 72 saatte bir değiştirilmeli ve steril örtülmelidir.',
      sesli_fisilti: 'Kateter pansumanı ve 72 saatlik periferik damar yolu rotasyon adımları oluşturuldu.'
    };
  }

  // 12. HEMŞİRE: KLİNİK ORDER & 5 DOĞRU KURALI
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

  // 13. LABORATUVAR: PANİK DEĞER (KRİTİK SONUÇ) BİLDİRİMİ (READ-BACK)
  if (lower.includes('panik değer') || lower.includes('panik deger') || lower.includes('kritik sonuç') || lower.includes('kritik sonuc') || lower.includes('troponin') || lower.includes('potasyum') || lower.includes('kan gazı')) {
    return {
      baslik: 'Laboratuvar Panik Değer Bildirimi',
      zaman: 'Derhal (Read-Back Telefonla)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Analiz sonucunu cihazda ve ikinci testle (serum kontrolü) derhal doğrula', is_completed: false },
        { task: 'Hastanın sorumlu hekimi veya servis hemşiresine doğrudan telefonla ulaş', is_completed: false },
        { task: 'Hasta adı, protokol numarası ve test değerini okuyup karşı tarafa aynen geri okut (Read-Back)', is_completed: false },
        { task: 'Bildirimi alan kişinin adı, unvanı, arama saati ve dakikasını HBYS panik değer modülüne işle', is_completed: false }
      ],
      ikon: '⚠️',
      renk: '#FEE2E2',
      anomali_notu: 'Panik değerlerde hastanın hekimine veya servis sorumlu hemşiresine telefonla ulaşılarak geri okuma (Read-Back) yöntemiyle bildirim yapılır.',
      sesli_fisilti: 'Kritik panik değer tespiti için telefonla geri okuma (Read-Back) bildirim adımı açıldı.'
    };
  }

  // 14. ECZACI: 2-8°C SOĞUK ZİNCİR DOLABI (SABAH 09:00 & AKŞAM 18:00 ISI LOGU)
  if (lower.includes('soğuk zincir') || lower.includes('soguk zincir') || lower.includes('2-8') || lower.includes('aşı dolabı') || lower.includes('asi dolabi') || lower.includes('buzdolabı ısı')) {
    return {
      baslik: 'Eczane Soğuk Zincir (2-8°C) Logu',
      zaman: 'Sabah 09:00 & Akşam 18:00',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Sabah 09:00: Dijital termometre sıcaklık (2-8°C) ve nem değerini log defterine kaydet', is_completed: false },
        { task: 'Akşam 18:00: Dijital termometre sıcaklık ve nem değerini log defterine kaydet', is_completed: false },
        { task: 'Aşı ve biyolojik ürünlerin İTS karekod durumlarını doğrula', is_completed: false },
        { task: '2-8°C dışı sapmalarda ürünleri derhal karantinaya alıp İTS bildirimini başlat', is_completed: false }
      ],
      ikon: '💊',
      renk: '#FEE2E2',
      anomali_notu: '2-8°C aralığı dışındaki sıcaklık sapmalarında soğuk zincir bozulmuş sayılarak ürünler derhal karantinaya alınmalıdır.',
      sesli_fisilti: '2-8°C dolapları için sabah 09:00 ve akşam 18:00 ısı log kontrolü kuruldu.'
    };
  }

  // 15. ECZACI: MEDULA REÇETE DÖKÜMÜ & MİAD DENETİMİ (AYIN İLK HAFTASI / AY SONU)
  if (lower.includes('eczac') || lower.includes('eczane') || lower.includes('its') || lower.includes('medula') || lower.includes('miad') || lower.includes('reçete döküm') || lower.includes('renkli reçete') || lower.includes('kırmızı reçete') || lower.includes('yeşil reçete')) {
    return {
      baslik: 'Medula Reçete & Miad Kontrolü',
      zaman: 'Ayın İlk Haftası / Ay Sonu',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Ayın ilk haftası: Medula A-B grubu reçete döküm çıktılarını alıp faturalandır', is_completed: false },
        { task: 'Döküm özetlerini, reçete ve kupürleri klasörleyip SGK Sağlık Sosyal Güvenlik Merkezine teslim et', is_completed: false },
        { task: 'Ay sonu: Miadı yaklaşan (3 ay kalan) ürünlerin fiziki sayımını yap ve depo iadesini başlat', is_completed: false },
        { task: 'Renkli Reçete Sistemi (RRS) uyuşturucu/psikotrop aylık bildirim mutabakatını tamamla', is_completed: false }
      ],
      ikon: '💊',
      renk: '#FEE2E2',
      anomali_notu: 'Medula reçete faturaları her ayın ilk haftasında SGK\'ya teslim edilmeli, miadı yaklaşan ürünler zamanında iade edilmelidir.',
      sesli_fisilti: 'Ayın ilk haftası Medula reçete döküm teslimi ve ay sonu miad kontrol adımları oluşturuldu.'
    };
  }

  // 16. DİŞ HEKİMİ: OTOKLAV BİYOLOJİK SPOR TESTİ & STERİLİZASYON
  if (lower.includes('otoklav') || lower.includes('sterilizasyon') || lower.includes('biyolojik spor') || lower.includes('indikatör') || lower.includes('indikator')) {
    return {
      baslik: 'Otoklav Spor Testi & Sterilizasyon',
      zaman: 'Haftalık Spor Testi / Günlük İndikatör',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Haftalık biyolojik spor test ampulünü (Bacillus stearothermophilus) otoklav döngüsüne yerleştir', is_completed: false },
        { task: 'İnkübatörde 24-48 saat üremeye bırakıp kontrol tüpüyle negatif üremeyi teyit et', is_completed: false },
        { task: 'Günlük rulo paketleme indikatör şeritlerinin renk dönüşümünü Class 5 parametresine göre onayla', is_completed: false },
        { task: 'Steril paketlerin üzerine sterilizasyon ve 30 günlük son kullanım tarihini etiketle', is_completed: false }
      ],
      ikon: '🦷',
      renk: '#EDE9FE',
      anomali_notu: 'Otoklav biyolojik spor testinde üreme görülürse cihaz derhal kullanımdan çekilmeli ve tüm paketler yeniden steril edilmelidir.',
      sesli_fisilti: 'Otoklav haftalık biyolojik spor testi ve günlük indikatör onay görevi oluşturuldu.'
    };
  }

  // 17. DİŞ HEKİMİ: DENTAL İMPLANT & 7. GÜN DİKİŞ ALMA
  if (lower.includes('implant') || lower.includes('protez') || lower.includes('dikiş') || lower.includes('dikis') || lower.includes('diş') || lower.includes('dis hekimi')) {
    const stichDate = new Date(baseDate);
    stichDate.setDate(stichDate.getDate() + 7);

    return {
      baslik: 'Dental İmplant & 7. Gün Dikiş Alma',
      zaman: '7 Gün Sonra (Dikiş & İyileşme)',
      tarih_iso: stichDate.toISOString(),
      action_items: [
        { task: 'Operasyonun 7. gününde dikiş alma ve yumuşak doku primer iyileşme kontrolü', is_completed: false },
        { task: 'Protez ölçü modelini laboratuvara gönder ve prova randevusu planla', is_completed: false },
        { task: 'Post-op klorheksidin gargara ve ağız hijyen talimatlarını hastaya teyit et', is_completed: false },
        { task: 'Gerekiyorsa kontrol periapikal röntgen çekerek kemik seviyesini değerlendir', is_completed: false }
      ],
      ikon: '🦷',
      renk: '#EDE9FE',
      anomali_notu: 'İmplant cerrahisi sonrası ilk 7 gün kemik ve yumuşak doku primer iyileşmesi açısından kritiktir.',
      sesli_fisilti: 'İmplant operasyonu sonrası 7. güne dikiş alma ve doku kontrol randevusu planlandı.'
    };
  }

  // 18. ASM / AİLE HEKİMLİĞİ: GEBE / BEBEK İZLEM VE AŞI TAKVİMİ (AHBS / HYP)
  if (lower.includes('gebe izlem') || lower.includes('bebek izlem') || lower.includes('asm') || lower.includes('aile hekimi') || lower.includes('hyp') || lower.includes('aşı takvimi')) {
    return {
      baslik: 'ASM Gebe/Bebek İzlem & Aşı Takvimi',
      zaman: 'AHBS Takvimi (Aylık Rutin)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'AHBS sistemi üzerinden ayı gelen gebe, bebek izlem ve aşı listelerini tara', is_completed: false },
        { task: 'Gelmeyen hastaları telefonla arayarak randevuya davet et veya adres tespitine çık', is_completed: false },
        { task: 'Aşı ve izlemleri AHBS ve KPS sistemine anında işleyerek negatif performansı önle', is_completed: false },
        { task: 'Aşı ret beyanında bulunan ebeveynler için resmi aşı ret tutanağını tanzim et', is_completed: false }
      ],
      ikon: '🩺',
      renk: '#E0F2FE',
      anomali_notu: 'Zamanında yapılmayan gebe ve çocuk izlemleri Sağlık Bakanlığı negatif performans kesintisine neden olur.',
      sesli_fisilti: 'ASM gebe/bebek izlem ve aşı takvimi adımları AHBS sistemine bağlandı.'
    };
  }

  // 19. 112 ACİL & AMBULANS: NÖBET DEVRİ & NARKOTİK SAYIMI
  if (lower.includes('112 acil') || lower.includes('ambulans') || lower.includes('paramedik') || lower.includes('att')) {
    return {
      baslik: '112 Ambulans Nöbet Devri & Sayım',
      zaman: 'Vardiya Başlangıcı (T-15 Dk)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Kırmızı/yeşil reçeteli narkotik ve psikotrop ampulleri fiziki sayarak çift imza at', is_completed: false },
        { task: 'Defibrilatör batarya ve self-test kontrolünü, monitör ve aspiratörü test et', is_completed: false },
        { task: 'Sabit ve portatif oksijen tüplerinin basınç (en az 100 Bar) seviyesini doğrula', is_completed: false },
        { task: 'Ambulans yakıt, tepe lambası, siren ve telsiz muhabere testini tamamla', is_completed: false }
      ],
      ikon: '🚑',
      renk: '#CCFBF1',
      anomali_notu: '112 acil istasyon devrinde narkotik kasa sayımı, defibrilatör testi ve oksijen bar kontrolü zorunlu güvenlik basamağıdır.',
      sesli_fisilti: '112 acil ambulans nöbet devir ve narkotik sayım protokolü başlatıldı.'
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

export function parseCivilServantPublicOfficeNote(input: string, baseDate: Date, userDomain?: string): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();
  const isKamuDomain = userDomain === 'KAMU' || userDomain === 'KURUMSAL';

  const isCivilServant = isKamuDomain ||
    lower.includes('ebys') || lower.includes('belgenet') || lower.includes('dys') ||
    lower.includes('cimer') || lower.includes('çimer') || lower.includes('bilgi edinme') || lower.includes('3071') || lower.includes('4982') ||
    lower.includes('günlü evrak') || lower.includes('gunlu evrak') || lower.includes('süreli yazı') || lower.includes('sureli yazi') ||
    lower.includes('acele yazı') || lower.includes('acele yazi') || lower.includes('paraf zinciri') || lower.includes('paraf') ||
    lower.includes('e-imza') || lower.includes('eimza') || lower.includes('standart dosya') || lower.includes('sdp') ||
    lower.includes('doğrudan temin') || lower.includes('dogrudan temin') || lower.includes('4734') || lower.includes('22/d') || lower.includes('22-d') ||
    lower.includes('tif') || lower.includes('tkys') || lower.includes('mys v2') || lower.includes('mys') || lower.includes('muayene kabul') ||
    lower.includes('piyasa fiyat araştırma') || lower.includes('harcama talimatı') || lower.includes('ödeme emri') || lower.includes('malmüdürlüğü') ||
    lower.includes('sağlık raporu') || lower.includes('saglik raporu') || lower.includes('tek hekim') || lower.includes('izin formu') ||
    lower.includes('disiplin soruşturması') || lower.includes('disiplin sorusturmasi') || lower.includes('savunma istem') || lower.includes('muhakkik') ||
    lower.includes('sayıştay') || lower.includes('sayistay') || lower.includes('teftiş sorgusu') || lower.includes('denetim sorgusu') || lower.includes('savunma layihası') || lower.includes('kamu zararı') ||
    lower.includes('protokol') || lower.includes('karşılama') || lower.includes('karsilama') || lower.includes('çelenk') || lower.includes('oturma düzeni') ||
    lower.includes('işe giriş') || lower.includes('ise giris') || lower.includes('sgk işe giriş') || lower.includes('5510') || lower.includes('özlük dosyası') ||
    lower.includes('işten çıkış') || lower.includes('isten cikis') || lower.includes('işten ayrılış') || lower.includes('ibraname') || lower.includes('kıdem tazminatı') ||
    lower.includes('deneme süresi') || lower.includes('deneme suresi') || lower.includes('yönetici asistanı') || lower.includes('yonetici asistani') ||
    lower.includes('sekreter') || lower.includes('brifing dosyası') || lower.includes('toplantı tamponu') || lower.includes('vip brifing') ||
    lower.includes('karar defteri') || lower.includes('yönetim kurulu') || lower.includes('hazirun') || lower.includes('ttsg') ||
    lower.includes('satın alma teklif') || lower.includes('tedarikçi teklif') || lower.includes('nda') || lower.includes('gizlilik sözleşmesi');

  if (!isCivilServant) return null;

  // 0. ÖNCELİK: KISA SENARYO VERİTABANI EŞLEŞMESİ (Scenario Database Lookup)
  const shortMatch = matchShortScenario(input, 'KAMU');
  if (shortMatch && shortMatch.domain === 'KAMU') {
    let targetIso: string | null = baseDate.toISOString();
    if (shortMatch.id === 'kamu_cimer_yasal_takip') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 15);
      due.setHours(17, 0, 0, 0);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'kamu_ebys_paraf_zinciri') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 3);
      due.setHours(16, 30, 0, 0);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'kamu_dmk_disiplin_savunma') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 7);
      due.setHours(17, 0, 0, 0);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'kamu_sayistay_denetim_sorgusu') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 30);
      due.setHours(17, 0, 0, 0);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'kurumsal_sgk_ise_giris') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 1);
      due.setHours(23, 59, 0, 0);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'kurumsal_sgk_isten_cikis') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 10);
      due.setHours(23, 59, 0, 0);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'kurumsal_deneme_suresi') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 45);
      due.setHours(18, 0, 0, 0);
      targetIso = due.toISOString();
    }

    return {
      baslik: shortMatch.baslik,
      zaman: shortMatch.varsayilanZaman,
      tarih_iso: targetIso,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      action_items: shortMatch.oncedenYapilacaklar.map(task => ({ task, is_completed: false })),
      ikon: shortMatch.ikon,
      renk: shortMatch.renk,
      anomali_notu: shortMatch.akilliFisilti,
      sesli_fisilti: shortMatch.akilliFisilti.replace(/^[^\s]+\s*/, '')
    };
  }

  // 1. CİMER ve Bilgi Edinme (15-30 Gün Yasal Süre, Ara Yazı & KVKK)
  if (lower.includes('cimer') || lower.includes('çimer') || lower.includes('bilgi edinme') || lower.includes('3071') || lower.includes('4982')) {
    const is3071 = lower.includes('3071');
    const dayCount = is3071 ? 30 : 15;
    const due = new Date(baseDate);
    due.setDate(due.getDate() + dayCount);
    due.setHours(17, 0, 0, 0);

    return {
      baslik: 'CİMER Yasal Başvuru Takibi',
      zaman: `Yasal Süre: ${dayCount} Gün`,
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'İlk 3 İş Gününde Alt Birim Yazışması',
      action_items: [
        { task: 'CİMER başvuru konusunu incele ve gerekirse 3 iş günü içinde alt birim veya taşra teşkilatına ara yazı yaz', is_completed: false },
        { task: 'Alt birimlerden gelen bilgi ve belgeleri mevzuat süzgecinden geçirerek gerekçeli cevap taslağını hazırla', is_completed: false },
        { task: 'Kişisel veriler (KVKK) ve ticari sır teşkil eden bilgileri karartarak metni nihai hale getir', is_completed: false },
        { task: 'Şube Müdürü parafı ve Makam Onayı ile CİMER sistemine cevabı yükle ve kapat', is_completed: false },
        { task: 'Vatandaşa sistem üzerinden bilgilendirme SMS/e-postası düştüğünü teyit et', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#FEF9C3',
      anomali_notu: '4982 sayılı Kanunda 15 gün, 3071 sayılı Kanunda 30 günlük yasal cevap süresi esastır; ara yazışmalar ilk 3 günde çıkmalıdır.',
      sesli_fisilti: 'CİMER yasal başvuru takvimi, alt birim ara yazışması ve KVKK karartma kontrol adımları oluşturuldu.'
    };
  }

  // 2. Doğrudan Temin ve Taşınır (4734 - 22/d, TİF, TKYS & MYS V2)
  if (lower.includes('doğrudan temin') || lower.includes('dogrudan temin') || lower.includes('22/d') || lower.includes('22-d') || lower.includes('tif') || lower.includes('tkys') || lower.includes('mys') || lower.includes('muayene kabul') || lower.includes('harcama talimatı') || lower.includes('piyasa fiyat araştırma')) {
    return {
      baslik: '4734 Sayılı KİK 22/d Doğrudan Temin',
      zaman: 'Fatura & Muayene Kabul Aşaması',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: '3 Piyasa Teklifi Toplama Aşaması',
      action_items: [
        { task: 'Harcama yetkilisinden onaylı Harcama Talimatını al ve en az 3 firmadan kaşeli piyasa teklif mektubu topla', is_completed: false },
        { task: 'Piyasa Fiyat Araştırma Tutanağını tanzim edip en uygun teklif sahibiyle sözleşme/sipariş oluştur', is_completed: false },
        { task: 'Mal/hizmet tesliminde Muayene ve Kabul Komisyonu Tutanağını komisyon üyelerine ıslak imzalattır', is_completed: false },
        { task: 'Taşınır Kayıt ve Yönetim Sistemi (TKYS) üzerinden Taşınır İşlem Fişi (TİF) kes ve ambar kaydını yap', is_completed: false },
        { task: 'MYS V2 üzerinden Ödeme Emri Belgesi (ÖEB) düzenleyip fatura aslıyla birlikte Malmüdürlüğü/Muhasebeye teslim et', is_completed: false }
      ],
      ikon: '🗂️',
      renk: '#FEF9C3',
      anomali_notu: '4734 sayılı KİK 22/d alımlarında piyasa fiyat araştırma tutanağı, fatura tarihi, Muayene Kabul ve TİF tarihleri birebir uyumlu olmalıdır.',
      sesli_fisilti: 'Doğrudan temin piyasa araştırması, TİF ambar kaydı ve MYS V2 ödeme emri kontrol listesi hazırlandı.'
    };
  }

  // 3. 657 DMK Sağlık Raporu & Tek Hekim (10 Gün Kuralı)
  if (lower.includes('sağlık raporu') || lower.includes('saglik raporu') || lower.includes('tek hekim') || lower.includes('izin formu') || (lower.includes('rapor') && (lower.includes('amire') || lower.includes('mesai') || lower.includes('dmk')))) {
    return {
      baslik: '657 DMK Sağlık Raporu & İzin Bildirimi',
      zaman: 'Mesai Başlangıcı (İvedi Bildirim)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Mesai Başlangıcında Amire İntikal',
      action_items: [
        { task: 'Mesai başlangıcında amire sözlü/yazılı rapor intikali sağla (DMK Madde 105)', is_completed: false },
        { task: 'Raporun aslını veya barkodlu e-Devlet nüshasını EBYS üzerinden hastalık izni onayına bağla', is_completed: false },
        { task: 'Tek hekim raporunun tek seferde 10 günü, yılda toplam 40 günü aşmadığını kontrol et', is_completed: false },
        { task: 'Özlük biriminin onayını alarak personelin fiili izin kaydını teyit et', is_completed: false }
      ],
      ikon: '📋',
      renk: '#FEF9C3',
      anomali_notu: 'Devlet Memurları Kanunu gereği tek hekim raporları tek seferde 10 günü aşamaz; rapor mesai başlangıcında kuruma bildirilmelidir.',
      sesli_fisilti: '657 DMK sağlık raporu amir intikali, 10 gün kontrolü ve EBYS izin süreci başlatıldı.'
    };
  }

  // 4. 657 DMK Disiplin Soruşturması & Savunma İstemi (7 Günlük Süre)
  if (lower.includes('disiplin soruşturması') || lower.includes('disiplin sorusturmasi') || lower.includes('savunma istem') || lower.includes('muhakkik')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 7);
    due.setHours(17, 0, 0, 0);

    return {
      baslik: '657 DMK Disiplin Savunma Süreci',
      zaman: 'Yasal Savunma Süresi: 7 Gün',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Tebliğden İtibaren 7 Gün Geri Sayım',
      action_items: [
        { task: 'Muhakkik görevlendirme yazısını ve iddia olunan fiilleri dosyalayarak soruşturma planı yap', is_completed: false },
        { task: 'İlgili memura isnat edilen fiilleri açıkça belirterek 7 günden az olmamak üzere yasal savunma istem yazısı tebliğ et', is_completed: false },
        { task: 'Tutanak, tanık ifadeleri ve kamera/kullanıcı log kayıtlarını soruşturma dosyasına ekle', is_completed: false },
        { task: '7 günlük yasal süre sonunda savunmayı inceleyip Disiplin Soruşturma Raporunu tanzim et ve amire sun', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#FEE2E2',
      anomali_notu: '657 DMK Madde 130 gereğince memura 7 günden az savunma süresi tanınamaz; süre verilmeden ceza tayin edilemez.',
      sesli_fisilti: '657 DMK disiplin soruşturması, 7 günlük yasal savunma istemi ve rapor tanzim takvimi kuruldu.'
    };
  }

  // 5. Sayıştay Denetimi & Teftiş Sorgusu (30 Günlük Savunma Layihası)
  if (lower.includes('sayıştay') || lower.includes('sayistay') || lower.includes('teftiş sorgusu') || lower.includes('denetim sorgusu') || lower.includes('savunma layihası') || lower.includes('kamu zararı')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 30);
    due.setHours(17, 0, 0, 0);

    return {
      baslik: 'Sayıştay Denetim & Sorgu Layihası',
      zaman: 'Yasal Savunma Süresi: 30 Gün',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'İlk 10 Günde Arşiv Belgesi Toplama',
      action_items: [
        { task: 'Sayıştay denetçisi tarafından tebliğ edilen sorgu kağıdını ve iddia olunan kamu zararı tespitlerini incele', is_completed: false },
        { task: 'İlgili ihale, hakediş, bordro ve harcama belgelerinin onaylı suretlerini arşivden çıkar', is_completed: false },
        { task: '30 günlük yasal savunma süresi içinde gerekçeli savunma layihasını ve kanıtlayıcı belgeleri hazırla', is_completed: false },
        { task: 'Harcama Yetkilisi ve Gerçekleştirme Görevlisinin müşterek imzasıyla savunmayı Sayıştay Denetçiliğine resmi yazıyla teslim et', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#FEF9C3',
      anomali_notu: 'Sayıştay sorgularına cevap verme süresi tebliğden itibaren 30 gündür; süresinde verilmeyen savunmalar kabul edilmeyebilir.',
      sesli_fisilti: 'Sayıştay sorgu tebliği, arşiv harcama evrakı çıkarma ve 30 günlük savunma layihası takvimi açıldı.'
    };
  }

  // 6. Resmi Protokol, VIP Karşılama & Çelenk Sunma
  if (lower.includes('protokol') || lower.includes('çelenk') || lower.includes('oturma düzeni') || (lower.includes('karşılama') && (lower.includes('vip') || lower.includes('makam') || lower.includes('vali')))) {
    return {
      baslik: 'Resmi Protokol & Karşılama Planı',
      zaman: 'Tören / Karşılama Saati',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: '2 Saat Önce Tören Alanı & Ses Sistemi Kontrolü',
      action_items: [
        { task: 'Mülki idare amiri ve VIP heyet geliş saatine göre karşılama ekibini koordine et', is_completed: false },
        { task: 'Protokol oturma düzenini (sağ-sol kuralı ve unvan hiyerarşisi) isimliklerle masaya yerleştir', is_completed: false },
        { task: 'Tören akış programı, ses sistemi, çelenk sunumu ve İstiklal Marşı koordinasyonunu sağla', is_completed: false },
        { task: 'Makam aracı eskort ve park güzergahını emniyet/koruma birimiyle teyit et', is_completed: false }
      ],
      ikon: '🎖️',
      renk: '#E0E7FF',
      anomali_notu: 'Resmi protokolde hiyerarşik unvan sırası ve sağ-sol kuralı esastır; araçta sağ arka koltuk 1 numaralı makama aittir.',
      sesli_fisilti: 'Resmi protokol unvan hiyerarşisi, oturma düzeni ve çelenk/karşılama koordinasyonu oluşturuldu.'
    };
  }

  // 7. İK: 5510 Sayılı Kanun SGK İşe Giriş Bildirgesi (T-1 Gün Kuralı)
  if (lower.includes('işe giriş') || lower.includes('ise giris') || lower.includes('sgk işe giriş') || lower.includes('5510')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 1);
    due.setHours(23, 59, 0, 0);

    return {
      baslik: 'SGK İşe Giriş Bildirgesi (5510)',
      zaman: 'İşe Başlamadan 24 Saat Önce (T-1)',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'T-1 Gün Önce e-Bildirge Onayı',
      action_items: [
        { task: 'KIRMIZI ALARM: İşe başlama tarihinden en az 1 gün önce SGK e-Bildirge üzerinden işe giriş bildirgesini onayla', is_completed: false },
        { task: 'Belirli/belirsiz süreli iş sözleşmesi, KVKK açık rıza metni ve şirket iç yönetmeliğini ıslak imzalattır', is_completed: false },
        { task: 'Sağlık raporu, adli sicil kaydı, diploma ve ikametgah evraklarını özlük klasörüne tak', is_completed: false },
        { task: 'Zimmet teslim tutanağıyla laptop, telefon, şirket kredi kartı ve giriş kartını teslim et', is_completed: false },
        { task: 'İşe giriş tarihinden 45 gün sonrasına \'Deneme Süresi Performans Değerlendirme\' hatırlatması kur', is_completed: false }
      ],
      ikon: '👥',
      renk: '#DCFCE7',
      anomali_notu: '5510 sayılı Kanun uyarınca sigortalı işe giriş bildirgesi çalışanın işe fiilen başlamasından en az 1 gün önce (T-1 gün) e-Bildirge üzerinden onaylanmalıdır.',
      sesli_fisilti: 'T-1 gün SGK işe giriş bildirgesi onay uyarısı, özlük sözleşmesi ve zimmet teslim zinciri planlandı.'
    };
  }

  // 8. İK: SGK İşten Çıkış Bildirgesi (10 Günlük Süre) & İbraname
  if (lower.includes('işten çıkış') || lower.includes('isten cikis') || lower.includes('işten ayrılış') || lower.includes('ibraname') || lower.includes('kıdem tazminatı') || lower.includes('ihbar tazminatı')) {
    const exitDue = new Date(baseDate);
    exitDue.setDate(exitDue.getDate() + 10);
    exitDue.setHours(23, 59, 0, 0);

    return {
      baslik: 'SGK İşten Çıkış & İbra Süreci',
      zaman: 'Yasal Süre: 10 Gün (SGK Bildirgesi)',
      tarih_iso: exitDue.toISOString(),
      hazirlik_zamani: 'Fesih Tarihinden İtibaren 10 Gün İçinde',
      action_items: [
        { task: 'Fesih/istifa tarihinden itibaren 10 gün içinde SGK e-Bildirge üzerinden işten ayrılış bildirgesini onayla', is_completed: false },
        { task: 'Şirket bilgisayarı, telefon, araç ve giriş kartı zimmet iade tutanağını eksiksiz imzalat', is_completed: false },
        { task: 'Kıdem/ihbar tazminatı ve kullanılmayan yıllık izin ücreti bordrosunu hesaplayıp muhasebeye ilet', is_completed: false },
        { task: 'Yasal bekleme süresi sonrası kapsamlı ibraname ve çalışma belgesini ıslak imzalı olarak özlük dosyasına kaldır', is_completed: false }
      ],
      ikon: '👥',
      renk: '#FEE2E2',
      anomali_notu: 'İşten ayrılış bildirgesi fesih tarihinden itibaren 10 gün içinde SGK\'ya verilmezse idari para cezası uygulanır.',
      sesli_fisilti: '10 günlük yasal SGK işten çıkış bildirgesi, zimmet iade tutanağı ve ibraname adımları takvimlendi.'
    };
  }

  // 9. İK: 2 Aylık Deneme Süresi Değerlendirmesi (45. Gün)
  if (lower.includes('deneme süresi') || lower.includes('deneme suresi')) {
    const trialDue = new Date(baseDate);
    trialDue.setDate(trialDue.getDate() + 45);
    trialDue.setHours(18, 0, 0, 0);

    return {
      baslik: 'Deneme Süresi Değerlendirmesi',
      zaman: '45. Gün (2 Aylık Süre Bitimi Öncesi)',
      tarih_iso: trialDue.toISOString(),
      hazirlik_zamani: '60 Gün Dolmadan Önce Değerlendirme',
      action_items: [
        { task: 'İşe başlama tarihinden sonraki 45. günde ilgili departman müdürüne deneme süresi değerlendirme formunu ilet', is_completed: false },
        { task: 'Yöneticiden yazılı performans onayı veya fesih gerekçesini 55. güne kadar teslim al', is_completed: false },
        { task: 'Olumsuz değerlendirmede ihbarsız ve tazminatsız fesih bildirimini 60 gün dolmadan noter/elden tebliğ et', is_completed: false },
        { task: 'Olumlu değerlendirmede kalıcı kadro geçişini ve yan hak tanımlarını tamamla', is_completed: false }
      ],
      ikon: '📊',
      renk: '#FEF3C7',
      anomali_notu: '4857 sayılı İş Kanunu gereğince deneme süresi en çok 2 aydır (TİS ile 4 aya çıkabilir); 60 gün dolmadan aksiyon alınmalıdır.',
      sesli_fisilti: '45. gün deneme süresi değerlendirme formu, yönetici geri bildirimi ve kadro onay takvimi açıldı.'
    };
  }

  // 10. VIP Yönetici Ajandası, 30 Dk Tampon & Brifing Dosyası
  if (lower.includes('sekreter') || lower.includes('yönetici asistanı') || lower.includes('yonetici asistani') || lower.includes('vip brifing') || lower.includes('toplantı tamponu') || lower.includes('brifing dosyası')) {
    return {
      baslik: 'Yönetici Ajandası & VIP Brifing',
      zaman: 'Görüşmeden 2 Saat Önce Brifing',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Toplantıdan 2 Saat Önce Brifing Dosyası',
      action_items: [
        { task: 'Arka arkaya toplantılar arasına min. 30 dakika seyahat, toparlanma ve nefeslenme tamponu koy', is_completed: false },
        { task: 'Üst düzey görüşmeden 2 saat önce: Katılımcı özgeçmişleri, toplantı bilgi notu ve ikram teyidini sağla', is_completed: false },
        { task: 'Uçuşlu seyahatlerde T-24 saatte online check-in yap, VIP lounge ve havalimanı transferini teyit et', is_completed: false },
        { task: 'Toplantı bitiminde MoM (Minutes of Meeting - Toplantı Tutanağı) ve aksiyon sahipleri listesini ilgili yöneticilere dağıt', is_completed: false }
      ],
      ikon: '🗂️',
      renk: '#EDE9FE',
      anomali_notu: 'Yönetici ajandasında ardışık toplantılar arasına min. 30 dakika tampon konulmalı, brifing dosyası 2 saat önce masaya sunulmalıdır.',
      sesli_fisilti: 'Yönetici ajandası tamponu, T-2 saat brifing dosyası ve VIP karşılama adımları hazırlandı.'
    };
  }

  // 11. Şirket Yönetim Kurulu (Board) Toplantısı & Karar Defteri
  if (lower.includes('yönetim kurulu') || lower.includes('yonetim kurulu') || lower.includes('karar defteri') || lower.includes('hazirun') || lower.includes('yk kararı') || lower.includes('ttsg')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 2);
    due.setHours(14, 0, 0, 0);

    return {
      baslik: 'Yönetim Kurulu Karar & Tescil Süreci',
      zaman: 'Toplantı & Noter Onay Günü',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Gündem Maddelerinin 3 Gün Önce Tebliği',
      action_items: [
        { task: 'Yönetim Kurulu gündem maddelerini ve karar taslaklarını üyelere en az 3 gün önceden tebliğ et', is_completed: false },
        { task: 'Toplantı günü ıslak imzalı Hazirun Cetvelini (katılımcı listesi) imzalat ve nisap kontrolü yap', is_completed: false },
        { task: 'Alınan kararları Noter tasdikli Yönetim Kurulu Karar Defterine yazıp tüm üyelere ıslak imzalattır', is_completed: false },
        { task: 'Tescil ve ilana tabi kararları (imza sirküleri, pay devri, adres vb.) Ticaret Sicil Müdürlüğüne tescil ettirip TTSG ilanını takip et', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#E0E7FF',
      anomali_notu: 'Türk Ticaret Kanunu uyarınca Yönetim Kurulu kararları Noter tasdikli karar defterine kaydedilmeden ve tescil edilmeden 3. kişilere karşı hüküm ifade etmez.',
      sesli_fisilti: 'Yönetim kurulu gündem tebliği, hazirun cetveli, noter tasdikli karar defteri ve ticaret sicil tescil adımları hazırlandı.'
    };
  }

  // 12. Kurumsal Satın Alma, Tedarikçi Teklif & Gizlilik Sözleşmesi (NDA)
  if (lower.includes('satın alma') || lower.includes('satin alma') || lower.includes('tedarikçi teklif') || lower.includes('tedarikci teklif') || lower.includes('nda') || lower.includes('gizlilik sözleşmesi')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 3);
    due.setHours(17, 0, 0, 0);

    return {
      baslik: 'Kurumsal Satın Alma & Teklif Değerlendirme',
      zaman: 'Teklif Toplama: 3 İş Günü',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Şartname ve İki Taraflı NDA İmzalatılması',
      action_items: [
        { task: 'İlgili departmandan onaylı Satın Alma Talep Formu ve Teknik Şartnameyi teslim al', is_completed: false },
        { task: 'Tedarikçilere teklif istemeden önce iki taraflı Gizlilik Sözleşmesini (NDA) karşılıklı imzalattır', is_completed: false },
        { task: 'En az 3 onaylı tedarikçiden kaşeli teklif toplayarak Fiyat-Kalite Karşılaştırma Matrisini hazırla', is_completed: false },
        { task: 'Satın Alma Komisyonu onayından sonra sipariş emrini oluştur ve teslimat termin tarihini sisteme gir', is_completed: false }
      ],
      ikon: '💼',
      renk: '#FEF3C7',
      anomali_notu: 'Ticari teklif paylaşımı öncesinde NDA imzalatılmalı; alternatif en az 3 teklif olmadan satın alma onayı verilmemelidir.',
      sesli_fisilti: 'Kurumsal satın alma teknik şartnamesi, tedarikçi NDA sözleşmesi ve 3 teklif karşılaştırma matrisi takvimlendi.'
    };
  }

  // 13. Süreli ve Günlü Evraklar (EBYS / Belgenet Varsayılan)
  const due = new Date(baseDate);
  due.setDate(due.getDate() + 3);
  due.setHours(16, 30, 0, 0);

  return {
    baslik: 'EBYS Günlü & Süreli Evrak',
    zaman: '1 İş Günü Önce İç Onay',
    tarih_iso: due.toISOString(),
    hazirlik_zamani: '1 İş Günü Önce 16:30 Paraf Zinciri',
    action_items: [
      { task: 'Yazı taslağının hazırlanması ve Standart Dosya Planı (SDP) kodunun seçilmesi', is_completed: false },
      { task: 'Şef, Şube Müdürü ve Daire Başkanı hiyerarşik paraf zincirine sunulması', is_completed: false },
      { task: 'Ekli belgelerin (CD, cetvel, fiziki dosya, harita) üst yazıya tam iliştirildiğini kontrol et', is_completed: false },
      { task: 'Nitelikli elektronik sertifika (e-İmza) ile nihai onay ve sayı/tarih alımı', is_completed: false },
      { task: 'Muhatap idareye veya UETS/KEP adresine teslim teyidini alarak arşive kaldır', is_completed: false }
    ],
    ikon: '🖋️',
    renk: '#FEF9C3',
    anomali_notu: 'Günlü ve ivedi yazılarda gecikmeye meydan vermemek için son teslim tarihinden en az 1 iş günü önce iç paraf zinciri tamamlanmalıdır.',
    sesli_fisilti: 'EBYS günlü evrak için SDP dosya kodu, hiyerarşik paraf zinciri ve e-İmza adımları oluşturuldu.'
  };
}

export function parseTradesmanLocalShopNote(input: string, baseDate: Date, userDomain?: string): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();
  const isTradeDomain = userDomain === 'TICARET' || userDomain === 'ESNAF' || userDomain === 'FINANS';

  const isTradeAndRepair = isTradeDomain ||
    lower.includes('tamirci') || lower.includes('usta') || lower.includes('tamir') || lower.includes('balata') || lower.includes('yağ değişimi') || lower.includes('yag degisimi') ||
    lower.includes('obd') || lower.includes('arıza kodu') || lower.includes('ariza kodu') || lower.includes('torklama') || lower.includes('parça değişimi') || lower.includes('parca degisimi') || lower.includes('oto servis') ||
    lower.includes('satış') || lower.includes('satis') || lower.includes('teklif') || lower.includes('follow-up') || lower.includes('sıcak takip') || lower.includes('sicak takip') || lower.includes('çapraz satış') || lower.includes('capraz satis') || lower.includes('cross-sell') ||
    lower.includes('kasiyer') || lower.includes('kasa avansı') || lower.includes('kasa avansi') || lower.includes('ara kasa') || lower.includes('ara tahliye') || lower.includes('yazar kasa') || lower.includes('bozuk para') || lower.includes('pos rulosu') ||
    lower.includes('veresiye') || lower.includes('açık hesap') || lower.includes('acik hesap') || lower.includes('deftere yaz') || lower.includes('hesaba yaz') || lower.includes('müşteri borcu') || lower.includes('musteri borcu') || lower.includes('lokma takımı') || lower.includes('lokma takimi') ||
    lower.includes('toptancı') || lower.includes('toptanci') || lower.includes('tedarikçi') || lower.includes('tedarikci') || lower.includes('mal kabul') || lower.includes('irsaliye') || lower.includes('koli geldi') || lower.includes('koli indirdik') || lower.includes('sevkiyat') ||
    lower.includes('z raporu') || lower.includes('pos gün sonu') || lower.includes('pos gun sonu') || lower.includes('kasa sayımı') || lower.includes('kasa sayimi') || lower.includes('kasa kapat') || lower.includes('gün sonu hasılat') ||
    lower.includes('dükkan') || lower.includes('dukkan') || lower.includes('esnaf') || lower.includes('tezgah') ||
    lower.includes('bağ-kur') || lower.includes('bagkur') || lower.includes('stopaj') || lower.includes('dükkan kirası') || lower.includes('dukkan kirasi') ||
    lower.includes('fiyat etiketi') || lower.includes('etiket kontrol') || lower.includes('raf fiyatı') || lower.includes('ürün iadesi') || lower.includes('değişim fişi') ||
    lower.includes('çek') || lower.includes('cek') || lower.includes('senet') || lower.includes('vade') ||
    lower.includes('veresiye defteri') || lower.includes('eksik listesi') ||
    ((lower.includes('azaldı') || lower.includes('bitti') || lower.includes('sipariş ver') || lower.includes('siparis ver')) && (lower.includes('koli') || lower.includes('toptan') || lower.includes('ürün') || lower.includes('mal')));

  if (!isTradeAndRepair) return null;

  // 0. ÖNCELİK: KISA SENARYO VERİTABANI EŞLEŞMESİ (Scenario Database Lookup)
  const shortMatch = matchShortScenario(input, 'TICARET');
  if (shortMatch && shortMatch.domain === 'TICARET') {
    let targetIso: string | null = baseDate.toISOString();
    if (shortMatch.id === 'ticaret_veresiye_alacak') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 14);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'ticaret_teklif_sicak_takip') {
      const followUp = new Date(baseDate);
      followUp.setHours(followUp.getHours() + 36);
      targetIso = followUp.toISOString();
    } else if (shortMatch.id === 'ticaret_cek_senet_vade') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 1);
      targetIso = due.toISOString();
    }

    return {
      baslik: shortMatch.baslik,
      zaman: shortMatch.varsayilanZaman,
      tarih_iso: targetIso,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      action_items: shortMatch.oncedenYapilacaklar.map(task => ({ task, is_completed: false })),
      ikon: shortMatch.ikon,
      renk: shortMatch.renk,
      anomali_notu: shortMatch.akilliFisilti,
      sesli_fisilti: shortMatch.akilliFisilti.replace(/^[^\s]+\s*/, '')
    };
  }

  // 1. VERESİYE / AÇIK HESAP & EMANET ALACAĞI (14 Günlük Vade ve Ara Teyit)
  if (
    lower.includes('veresiye') || lower.includes('deftere yaz') || lower.includes('açık hesap') || lower.includes('acik hesap') ||
    lower.includes('hesaba yaz') || lower.includes('lokma takımı') || lower.includes('lokma takimi') ||
    (lower.includes('alacak') && (lower.includes('müşteri') || lower.includes('borç') || lower.includes('defter') || lower.includes('tahsilat')))
  ) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 14); // 14 gün standart esnaf vade kuralı

    return {
      baslik: 'Veresiye / Müşteri Alacağı & Vade',
      zaman: '14 Gün Sonra Vade',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: '7. Gün Ara Bakiye Teyidi',
      action_items: [
        { task: 'Veresiye defterine veya sisteme müşteri adı, borç kalemi, telefon ve net tutarı kaydet', is_completed: false },
        { task: 'Müşteriye WhatsApp/SMS ile borç dökümü ve fiş detayını nezaketle teyit ettir', is_completed: false },
        { task: '7. günde ara bakiye kontrolü yaparak ihtilaflı kalem olup olmadığını gözden geçir', is_completed: false },
        { task: '14. gün vade bitiminde nazik bir hatırlatma ve hesap kapatma mesajı ilet', is_completed: false }
      ],
      ikon: '📓',
      renk: '#FEF3C7',
      anomali_notu: '📓 Veresiye kayıtlarında ürün detayı ve vade tarihi açıkça belirtilmeli; 14 günlük vade aşılmadan ara teyit yapılmalıdır.',
      sesli_fisilti: 'Veresiye defterine kayıt alındı, 7. günde ara kontrol ve 14. günde vade tahsilat adımları takvimlendi.'
    };
  }

  // 2. TOPTANCI MAL KABULÜ & İRSALİYE KONTROLÜ (Gelen Mal / Koli / Sevkiyat)
  if (
    lower.includes('mal kabul') || lower.includes('koli geldi') || lower.includes('irsaliye') ||
    lower.includes('koli indirdik') || lower.includes('sevkiyat geldi') ||
    (lower.includes('toptancı') && (lower.includes('geldi') || lower.includes('koli') || lower.includes('fatura') || lower.includes('mal')))
  ) {
    return {
      baslik: 'Toptancı Mal Kabulü & İrsaliye',
      zaman: 'Mal Kabul Anında (Şoför Ayrılmadan)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Sipariş Listesiyle Karşılaştırma',
      action_items: [
        { task: 'Şoför ayrılmadan gelen fiziki koli/kasa adedini ve ambalaj bütünlüğünü say', is_completed: false },
        { task: 'İrsaliyedeki ürün çeşitlerini, adetleri ve birim fiyatları sipariş fişiyle tek tek eşleştir', is_completed: false },
        { task: 'Raf ömrü olan ürünlerde Son Tüketim Tarihi (STT) ve parti numarasını denetle', is_completed: false },
        { task: 'Varsa eksik, ezik veya kırık ürünleri irsaliye nüshasına şerh düşüp şoföre imzalatarak iade tutanağı düzenle', is_completed: false },
        { task: 'Teslim alınan sağlam malları depoya FIFO (ilk giren ilk çıkar) kuralıyla yerleştir', is_completed: false }
      ],
      ikon: '📦',
      renk: '#FEF3C7',
      anomali_notu: '📦 Şoförün yanında irsaliye şerhi düşülmeyen eksik veya hasarlı malların sonradan toptancıya iadesi kabul edilmez; STT ve adet kontrolü zorunludur.',
      sesli_fisilti: 'Mal kabulünde şoför ayrılmadan koli sayımı, STT kontrolü ve irsaliye şerhi adımları başlatıldı.'
    };
  }

  // 3. TOPTANCI ÇEK / SENET & VADE ÖDEMESİ
  if (
    lower.includes('çek') || lower.includes('cek') || lower.includes('senet') ||
    (lower.includes('vade') && (lower.includes('ödeme') || lower.includes('odeme') || lower.includes('toptan')))
  ) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 1);

    return {
      baslik: 'Toptancı Çek / Senet & Vade Ödemesi',
      zaman: 'Vadeden 1 Gün Önce (Nakit Akışı)',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Takas Saati (11:00) Öncesi Bakiye',
      action_items: [
        { task: 'Takas saati (11:00) öncesinde banka hesabındaki nakit bakiyeyi ve provizyon limitini teyit et', is_completed: false },
        { task: 'Vadesi gelen çek/senet tutarını toptancı cari hesap mutabakatıyla eşleştir', is_completed: false },
        { task: 'Havale/EFT yapılacaksa banka günlük EFT işlem limitlerini kontrol et', is_completed: false },
        { task: 'Ödeme dekontunu ve tahsil makbuzunu cari hesap dosyasına arşivle', is_completed: false }
      ],
      ikon: '💸',
      renk: '#FEE2E2',
      anomali_notu: '💸 Çek ve senet vadelerinde 1 gün önceden nakit provizyonu sağlanmazsa karşılıksız işlem cezası, protesto ve banka kredi sicili bozulması riski doğar.',
      sesli_fisilti: 'Toptancı çek/senet ödemesi için takas saati öncesine nakit provizyon ve cari mutabakat alarmı kuruldu.'
    };
  }

  // 4. TOPTANCI SİPARİŞİ & EKSİK LİSTESİ / STOK SAYIMI
  if (
    lower.includes('eksik listesi') || lower.includes('stok sayımı') || lower.includes('stok sayimi') ||
    lower.includes('mal siparişi') || lower.includes('sipariş ver') || lower.includes('koli sipariş') ||
    (lower.includes('toptancı') && lower.includes('sipariş')) ||
    ((lower.includes('azaldı') || lower.includes('bitti')) && (lower.includes('koli') || lower.includes('mal') || lower.includes('ürün') || lower.includes('stok')))
  ) {
    return {
      baslik: 'Toptancı Siparişi & Eksik Listesi',
      zaman: 'Toptancı Gelmeden 1 Gün Önce',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Hızlı Tüketim & Raf Kontrolü',
      action_items: [
        { task: 'Kritik stok seviyesinin altına düşen raf ve depo ürünlerini sayarak listele', is_completed: false },
        { task: 'Hızlı tüketilen çok satan (A grubu) ürünlerin tükenme hızını ve raf payını kontrol et', is_completed: false },
        { task: 'Toptancının vadeli iskonto veya promosyonlu koli kampanyalarını değerlendir', is_completed: false },
        { task: 'Net sipariş listesini toptancı temsilcisine WhatsApp veya sipariş portalından teyitli ilet', is_completed: false }
      ],
      ikon: '📋',
      renk: '#FEF3C7',
      anomali_notu: '📋 Toptancı gününden önce eksik sayımı yapılmazsa raf boşluğu ciro kaybına, gereksiz fazla sipariş ise nakit sıkışıklığına yol açar.',
      sesli_fisilti: 'Toptancı öncesi eksik sayımı, A grubu ürün kontrolü ve sipariş teyidi planlandı.'
    };
  }

  // 5. KASA AÇILIŞI / SABAH AVANSI & BOZUK PARA
  if (
    lower.includes('kasa avansı') || lower.includes('kasa avansi') || lower.includes('kasa açılışı') || lower.includes('kasa acilisi') ||
    lower.includes('bozuk para') || lower.includes('bozukluk kalmadı') || lower.includes('pos rulosu') || lower.includes('sabah kasası') || lower.includes('yazarkasa rulosu')
  ) {
    return {
      baslik: 'Kasa Açılışı & Bozuk Para Avansı',
      zaman: 'Açılış 08:30 (Vardiya Başı)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Açılış Öncesi Sayım',
      action_items: [
        { task: 'Madeni para ve küçük kupürlü kağıt para avansını sayarak yazar kasa sistemine gir', is_completed: false },
        { task: 'Yazar kasa ve POS terminallerinin termal rulo seviyelerini kontrol et, yedeği çekmeceye koy', is_completed: false },
        { task: 'Banka POS cihazlarının gün başı provizyon sinyalini ve internet bağlantısını test et', is_completed: false },
        { task: 'Sahte para kontrol dedektörünü / mor ışığı bankoda hazırla', is_completed: false }
      ],
      ikon: '🪙',
      renk: '#DCFCE7',
      anomali_notu: '🪙 Güne bozuk para avansı ve yedek POS rulosu olmadan başlamak ilk müşteride para üstü verememe ve satış kaçırma krizine yol açar.',
      sesli_fisilti: 'Vardiya başı bozuk para avansı, yedek rulo ve POS provizyon test adımları kuruldu.'
    };
  }

  // 6. KASA KAPANISI, Z RAPORU & POS GÜN SONU (Hasılat & Ara Tahliye)
  if (
    lower.includes('z raporu') || lower.includes('pos gün sonu') || lower.includes('pos gun sonu') ||
    lower.includes('ara kasa') || lower.includes('ara tahliye') || lower.includes('kasa sayımı') || lower.includes('kasa sayimi') ||
    lower.includes('kasa kapat') || lower.includes('gün sonu hasılat') || lower.includes('dükkanı kapattık') || lower.includes('dukkani kapattik')
  ) {
    return {
      baslik: 'Gün Sonu Kasa, Z Raporu & POS Mutabakatı',
      zaman: 'Kapanış 20:30',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Kapanıştan 15 Dk Önce (Ara Tahliye)',
      action_items: [
        { task: 'Gün içinde biriken büyük kupürler için ara kasa tahliyesi tutarını denetle', is_completed: false },
        { task: 'Tüm banka POS terminallerinden tek tek Gün Sonu slip dökümlerini al', is_completed: false },
        { task: 'Mali yazar kasadan günlük Z Raporu çıktısını al ve tarihli koçana zımbala', is_completed: false },
        { task: 'Kasada kalan avans bozuk parayı ayırıp günün net nakit cirosunu say ve Z raporuyla kuruşu kuruşuna mutabakat yap', is_completed: false },
        { task: 'Ertesi günün açılış avansını çekmecede bırakıp net hasılatı çelik kasaya kilitle', is_completed: false }
      ],
      ikon: '🧾',
      renk: '#DCFCE7',
      anomali_notu: '🧾 Kasa açığı veya fazlası oluşmaması için Z raporu mali cirosu, POS gün sonu slipleri ve fiziki nakit mutabakatı her akşam sıcağı sıcağına yapılmalıdır.',
      sesli_fisilti: 'Kapanış Z raporu, banka POS gün sonu ve kuruşu kuruşuna nakit mutabakat protokolü devrede.'
    };
  }

  // 7. REYON ETİKET KONTROLÜ & İADE / DEĞİŞİM
  if (
    lower.includes('fiyat etiketi') || lower.includes('etiket kontrol') || lower.includes('raf fiyatı') ||
    lower.includes('ürün iadesi') || lower.includes('değişim fişi') || lower.includes('müşteri iadesi') || lower.includes('reyon düzeni')
  ) {
    return {
      baslik: 'Reyon Etiket Kontrolü & İade / Değişim',
      zaman: 'Haftalık Kontrol / İade Anında',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Barkod Karşılaştırması',
      action_items: [
        { task: 'Reyondaki raf etiket fiyatları ile kasa barkod sistemindeki fiyatları tek tek eşleştir', is_completed: false },
        { task: 'İade veya değişim talebinde satış fişi/faturayı kontrol et ve ürünün ambalaj/hasar durumunu incele', is_completed: false },
        { task: 'İade alınan ürün için iade gider pusulası düzenle ve ürünü hasarlı/sağlam reyonuna ayır', is_completed: false },
        { task: 'Vitrin ve çok satan öne çıkan ürünlerin reyon aydınlatması ve dizilimini tazele', is_completed: false }
      ],
      ikon: '🏷️',
      renk: '#DCFCE7',
      anomali_notu: '🏷️ Raf fiyatı ile kasa fiyatı arasındaki farklar Tüketici Hakem Heyeti ve Ticaret Bakanlığı denetiminde idari para cezasına tabidir.',
      sesli_fisilti: 'Kasa-raf etiket fiyat eşleşmesi ve yasal iade pusulası takip kartı hazırlandı.'
    };
  }

  // 8. TAMİRCİ / USTA (AUTO & DEVICE REPAIR): Müşteri Onayı, Parça Tedariği, Torklama, OBD & Yol Testi
  if (
    lower.includes('tamirci') || lower.includes('usta') || lower.includes('tamir') || lower.includes('balata') ||
    lower.includes('yağ değişimi') || lower.includes('yag degisimi') || lower.includes('obd') || lower.includes('arıza') || lower.includes('ariza') ||
    lower.includes('tork') || lower.includes('oto servis') || lower.includes('parça değişimi')
  ) {
    const testDate = new Date(baseDate);
    testDate.setMinutes(testDate.getMinutes() - 45);

    return {
      baslik: 'Araç / Cihaz Onarımı & Teslimat Protokolü',
      zaman: 'Teslimattan 45 Dk Önce (Test & OBD)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Onarım Öncesi (Müşteri Onayı)',
      hazirlik_iso: testDate.toISOString(),
      action_items: [
        { task: 'Müşteri yazılı/sözlü teyidi ve tahmini parça/işçilik bütçe mutabakatı almadan söküme başlama', is_completed: false },
        { task: 'Takılacak orijinal/OEM parçanın fatura, garanti belgesi ve eski çıkan parçayı müşteriye ayır', is_completed: false },
        { task: 'Teslimattan 45 dk önce: Tork anahtarıyla kritik bağlantıları sık ve OBD cihazıyla arıza hafızasını sıfırla', is_completed: false },
        { task: 'Sıvı kaçak kontrolü ve 5 km kısa yol testi gerçekleştirip aracı teslimat alanına çek', is_completed: false }
      ],
      ikon: '🔧',
      renk: '#FEF3C7',
      anomali_notu: '🔧 Müşteri onayı alınmayan ilave parça değişimi hukuki ihtilaf doğurur; teslimat öncesi tork kontrolü ve OBD testi can güvenliği gereğidir.',
      sesli_fisilti: 'Onarım öncesi müşteri maliyet onayı ve teslimat öncesine 45 dakikalık OBD/tork testi kuruldu.'
    };
  }

  // 9. SATIŞ DANIŞMANI: Teklif Takibi (24-48 Saat), Rezervasyon & Çapraz Satış
  if (
    lower.includes('satış') || lower.includes('satis') || lower.includes('teklif') || lower.includes('follow-up') ||
    lower.includes('cross-sell') || lower.includes('danışman') || lower.includes('danisman') || lower.includes('sıcak takip') || lower.includes('çapraz satış')
  ) {
    const followUpDate = new Date(baseDate);
    followUpDate.setHours(followUpDate.getHours() + 24);

    return {
      baslik: 'Teklif Sıcak Takibi (Follow-Up)',
      zaman: '24-48 Saat İçinde (Follow-Up)',
      tarih_iso: followUpDate.toISOString(),
      hazirlik_zamani: 'Görüşme Öncesi Notlar',
      action_items: [
        { task: 'Müşteriye gönderilen teklifin ulaştığını ve opsiyon/fiyat geçerlilik süresini teyit et', is_completed: false },
        { task: 'Teklifteki ürünlerin tükenmemesi için depo sistemine geçici stok rezervasyonu gir', is_completed: false },
        { task: '24-48 saat sonra arayarak soruları yanıtla, müşteri endişelerini gider ve karar sürecini nazikçe yokla', is_completed: false },
        { task: 'Teklife tamamlayıcı sarf, garanti uzatımı veya montaj çapraz satış (cross-sell) alternatiflerini sun', is_completed: false }
      ],
      ikon: '💼',
      renk: '#E0E7FF',
      anomali_notu: '💼 Gönderilen teklifin 24-48 saat içinde nazikçe sorgulanması kapanış oranını %40 artırır; opsiyon süresi ve stok rezervasyonu unutulmamalıdır.',
      sesli_fisilti: 'Teklif için 24-48 saatlik sıcak takip, stok rezervasyonu ve çapraz satış adımları planlandı.'
    };
  }

  // 10. ESNAF MALİ TAKVİMİ (Bağ-Kur, Dükkan Kirası, Muhasebeci & Stopaj)
  if (
    lower.includes('muhasebeci') || lower.includes('fatura teslim') || lower.includes('bağ-kur') ||
    lower.includes('bagkur') || lower.includes('stopaj') || lower.includes('dükkan kirası') || lower.includes('dukkan kirasi') ||
    (lower.includes('kira') && (lower.includes('dükkan') || lower.includes('esnaf') || lower.includes('stopaj')))
  ) {
    return {
      baslik: 'Esnaf Mali Takvimi (Kira, Bağ-Kur & Muhasebe)',
      zaman: 'Ayın 20\'si Evrak / Ay Sonu Ödeme',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Fatura & Z Raporu Dosyalama',
      action_items: [
        { task: 'Ayın 15-20\'si: Alış/satış faturalarını, POS sliplerini ve aylık Z raporlarını muhasebeciye teslim et', is_completed: false },
        { task: 'Dükkan kira ödemesini yasa gereği mutlaka banka üzerinden "Kira Ödemesi" açıklamasıyla havale et', is_completed: false },
        { task: 'Ayın son gününe kadar Bağ-Kur primini ve SGK çalışan primlerini bankadan/GİB\'den öde', is_completed: false },
        { task: 'Muhasebeciden gelen KDV ve Stopaj (Muhtasar) tahakkuk fişlerinin ödemesini gerçekleştir', is_completed: false }
      ],
      ikon: '🏪',
      renk: '#FEF3C7',
      anomali_notu: '🏪 Dükkan kiralarının elden ödenmesi Vergi Usul Kanununa göre usulsüzlük cezası doğurur; Bağ-Kur ödemelerinin aksatılması prim teşvikini yakar.',
      sesli_fisilti: 'Esnaf mali takvimi: bankadan kira havalesi, muhasebe evrak teslimi ve Bağ-Kur prim ödeme hatırlatıcısı kuruldu.'
    };
  }

  // 11. GENEL DÜKKAN & TİCARET GÜNLÜK RUTİNİ (Ticaret / Esnaf Alanı Seçildiğinde veya Genel Esnaf Girdisi)
  if (isTradeDomain || lower.includes('dükkan') || lower.includes('dukkan') || lower.includes('esnaf') || lower.includes('tezgah')) {
    return {
      baslik: 'Dükkan Günlük Operasyon & Kasa',
      zaman: 'Gün Boyu (Açılış - Kapanış)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Sabah Açılışında Avans & Rulo Kontrolü',
      action_items: [
        { task: 'Sabah kasa açılışında madeni ve bozuk para avansını kontrol et', is_completed: false },
        { task: 'Gün içinde veresiye, alacak ve gelen koli irsaliyelerini kayda al', is_completed: false },
        { task: 'Akşam kapanışta POS gün sonu slipleri ve mali Z raporu mutabakatını tamamla', is_completed: false }
      ],
      ikon: '🏪',
      renk: '#FEF3C7',
      anomali_notu: '🏪 Günlük ciro ve stok dengesinin korunması için düzenli kasa ve irsaliye takibi şarttır.',
      sesli_fisilti: 'Dükkan günlük operasyon, kasa avansı ve gün sonu mutabakat kartı açıldı.'
    };
  }

  return null;
}

export function parseRealEstateNote(input: string, baseDate: Date, userDomain?: string): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();
  const isRealEstateDomain = userDomain === 'EMLAK';

  const isRealEstate = isRealEstateDomain ||
    lower.includes('emlak') || lower.includes('gayrimenkul') || lower.includes('taşınmaz') || lower.includes('tasinmaz') ||
    lower.includes('webtapu') || lower.includes('web-tapu') || lower.includes('tapu') ||
    lower.includes('dask') || lower.includes('ipotek fek') || lower.includes('rayiç bedel') || lower.includes('rayic bedel') ||
    lower.includes('tahliye taahhüt') || lower.includes('tahliye taahhut') || lower.includes('yer gösterme') || lower.includes('yer gosterme') ||
    lower.includes('kira sözleşmesi') || lower.includes('kira sozlesmesi') || lower.includes('kira kontratı') || lower.includes('kira kontrati') ||
    lower.includes('kiracı') || lower.includes('kiraci') || lower.includes('depozito') || lower.includes('iskan') || lower.includes('iskân') ||
    lower.includes('kat irtifakı') || lower.includes('kat irtifaki') || lower.includes('kat mulkiyeti') || lower.includes('kat mülkiyeti') ||
    lower.includes('imar durumu') || lower.includes('imar çapı') || lower.includes('imar capi') || lower.includes('ada parsel') || lower.includes('takyidat') ||
    lower.includes('taputakas') || lower.includes('güvenli tapu') || lower.includes('guvenli tapu') || lower.includes('bloke çek') || lower.includes('bloke cek') ||
    lower.includes('eids') || lower.includes('yetki belgesi') || lower.includes('portföy') || lower.includes('portfoy') ||
    lower.includes('cayma akçesi') || lower.includes('cayma akcesi') || lower.includes('döner sermaye') || lower.includes('doner sermaye');

  if (!isRealEstate) return null;

  // 0. ÖNCELİK: KISA SENARYO VERİTABANI EŞLEŞMESİ (Scenario Database Lookup)
  const shortMatch = matchShortScenario(input, 'EMLAK');
  if (shortMatch && shortMatch.domain === 'EMLAK') {
    let targetIso: string | null = baseDate.toISOString();
    if (shortMatch.id === 'emlak_webtapu_satis_devir') {
      const d = new Date(baseDate);
      d.setHours(11, 0, 0, 0);
      targetIso = d.toISOString();
    } else if (shortMatch.id === 'emlak_tufe_kira_artisi') {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + 30);
      targetIso = d.toISOString();
    } else if (shortMatch.id === 'emlak_yer_gosterme_sunum') {
      const d = new Date(baseDate);
      d.setHours(15, 30, 0, 0);
      targetIso = d.toISOString();
    } else if (shortMatch.id === 'emlak_ipotek_fek_terkin') {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + 2);
      targetIso = d.toISOString();
    }

    return {
      baslik: shortMatch.baslik,
      zaman: shortMatch.varsayilanZaman,
      tarih_iso: targetIso,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      action_items: shortMatch.oncedenYapilacaklar.map(task => ({ task, is_completed: false })),
      ikon: shortMatch.ikon,
      renk: shortMatch.renk,
      anomali_notu: shortMatch.akilliFisilti,
      sesli_fisilti: shortMatch.akilliFisilti.replace(/^[^\s]+\s*/, '')
    };
  }

  // 1. WEB-TAPU SATIŞ & MÜLKİYET DEVİR PROTOKOLÜ (DASK, Rayiç Bedel, Harç SMS, Güvenli Tapu Takas)
  if (
    lower.includes('webtapu') || lower.includes('web-tapu') || lower.includes('tapu devri') || lower.includes('tapu harcı') ||
    lower.includes('tapu harci') || lower.includes('tapu günü') || lower.includes('tapu gunu') || lower.includes('tapu randevusu') ||
    lower.includes('ev satışı') || lower.includes('ev satisi') || lower.includes('daire satışı') || lower.includes('daire satisi') ||
    lower.includes('döner sermaye') || lower.includes('doner sermaye') || lower.includes('taputakas') || lower.includes('tapu takas') ||
    lower.includes('güvenli tapu') || lower.includes('guvenli tapu') || lower.includes('bloke çek') || lower.includes('bloke cek') ||
    lower.includes('cayma akçesi') || lower.includes('cayma akcesi') ||
    (lower.includes('tapu') && (lower.includes('satış') || lower.includes('satis') || lower.includes('devir') || lower.includes('randevu') || lower.includes('müdürlük') || lower.includes('mudurluk')))
  ) {
    const tapuDate = new Date(baseDate);
    tapuDate.setHours(11, 0, 0, 0);

    return {
      baslik: 'Web-Tapu Satış & Devir Protokolü',
      zaman: 'Tapu Randevu Saati (11:00)',
      tarih_iso: tapuDate.toISOString(),
      hazirlik_zamani: 'Randevudan 24 Saat Önce (Evrak & Harç)',
      action_items: [
        { task: 'Web-Tapu sistemine güncel DASK poliçesi, belediye rayiç bedel belgesi ve taraf kimliklerini yükle', is_completed: false },
        { task: 'Gelen SMS takip numarası üzerinden alıcı ve satıcı tapu harçlarını (%2 + %2) ve döner sermaye bedelini yatır', is_completed: false },
        { task: 'Para transferini korumak için Takasbank TapuTakas veya banka bloke çek / bloke havale protokolünü hazırla', is_completed: false },
        { task: 'Randevu saatinden 15 dakika önce kimlik asılları, fotoğraf ve vekaletname asılları ile müdürlükte hazır bulun', is_completed: false },
        { task: 'Resmi senet imzalanıp tapu senedi alındıktan sonra elektrik/su/doğalgaz sayaç devri ve emlak beyanını hatırlat', is_completed: false }
      ],
      ikon: '🏢',
      renk: '#FEF3C7',
      anomali_notu: '🏢 DASK poliçesi ve belediye rayiç bedel belgesi sisteme yüklenmeden tapu harç SMS\'i üretilmez; satış bedeli elden değil mutlaka Güvenli Tapu Takas veya bloke çekle ödenmelidir.',
      sesli_fisilti: 'Web-Tapu satış ve devir protokolü açıldı; DASK, rayiç belgesi, harç ödeme ve güvenli para takası adımları takvimlendi.'
    };
  }

  // 2. KİRA SÖZLEŞMESİ & TAHLİYE TAAHHÜTNAMESİ (Demirbaş Tespiti, Sayaç İlk Endeksleri, Yargıtay Zaman Kuralı)
  if (
    lower.includes('kira sözleşmesi') || lower.includes('kira sozlesmesi') || lower.includes('kira kontratı') || lower.includes('kira kontrati') ||
    lower.includes('tahliye taahhüt') || lower.includes('tahliye taahhut') || lower.includes('yeni kiracı') || lower.includes('yeni kiraci') ||
    lower.includes('kiraya verdik') || lower.includes('ev kiralandı') || lower.includes('ev kiralandi') || lower.includes('daire kiralandı') || lower.includes('daire kiralandi')
  ) {
    const contractDate = new Date(baseDate);

    return {
      baslik: 'Kira Sözleşmesi & Tahliye Taahhütnamesi',
      zaman: 'Sözleşme İmzası & Anahtar Teslimi',
      tarih_iso: contractDate.toISOString(),
      hazirlik_zamani: 'İmza Öncesi (Kimlik & Gelir Teyidi)',
      action_items: [
        { task: 'Kiracının T.C. kimlik fotokopisi, adli sicil kaydı ve düzenli gelir/bordro teyidini al', is_completed: false },
        { task: 'Kira sözleşmesine net kira bedeli, TÜFE artış tavanı, ödeme günü ve banka IBAN hesabını açıkça yaz', is_completed: false },
        { task: 'Dairenin boya, kombi, ankastre, armatür ve demirbaş durumunu fotoğraflayarak "Demirbaş Teslim Tutanağı"na bağla', is_completed: false },
        { task: 'Elektrik, su ve doğalgaz sayaç ilk endekslerini fotoğrafla ve aboneliklerin kiracı adına açılmasını şart koş', is_completed: false },
        { task: 'Tahliye Taahhütnamesini Yargıtay kuralı gereği sözleşmeden sonraki tarihe tanzim et ve tercihen noterde onaylat', is_completed: false },
        { task: 'TBK 342 uyarınca en fazla 3 aylık kira tutarındaki güvence (depozito) bedelini vadeli mevduat hesabına bloke ettir', is_completed: false }
      ],
      ikon: '📝',
      renk: '#DCFCE7',
      anomali_notu: '📝 Kira sözleşmesiyle aynı gün tarihli tahliye taahhütnameleri Yargıtay içtihatlarında baskı altında imzalanmış sayılarak iptal edilebilir; tanzim tarihi teslim sonrasına bırakılmalıdır.',
      sesli_fisilti: 'Kira sözleşmesi hazırlandı; demirbaş teslim tutanağı, sayaç ilk endeksleri ve yasal tahliye taahhütnamesi protokolü oluşturuldu.'
    };
  }

  // 3. KİRACI TAHLİYESİ, ÇIKIŞ & DEPOZİTO MAHSUBU (Sayaç Son Endeksleri, Boya/Hasar Tespiti, Aidat Borçsuzluk)
  if (
    lower.includes('kiracı çıktı') || lower.includes('kiraci cikti') || lower.includes('anahtarı teslim') || lower.includes('anahtar teslim') ||
    lower.includes('daireyi boşalttı') || lower.includes('daireyi bosaltti') || lower.includes('ev boşaldı') || lower.includes('ev bosaldi') ||
    lower.includes('kiracı tahliyesi') || lower.includes('kiraci tahliyesi') ||
    (lower.includes('depozito') && (lower.includes('iade') || lower.includes('mahsup') || lower.includes('kesinti'))) ||
    lower.includes('tahliye devir')
  ) {
    const evictionDate = new Date(baseDate);

    return {
      baslik: 'Kiracı Tahliyesi & Depozito Mahsup Protokolü',
      zaman: 'Tahliye Günü (Sayaç & Anahtar)',
      tarih_iso: evictionDate.toISOString(),
      hazirlik_zamani: 'Teslim Öncesi (Yönetim & Faturalar)',
      action_items: [
        { task: 'Elektrik, su ve doğalgaz sayaçlarının son endeks fotoğraflarını çekerek kapatma/devir borçlarını tespit et', is_completed: false },
        { task: 'Daire içi duvar boyası, ankastre, kombi, kapılar ve armatürlerin hasar tespit fotoğraflarını ilk demirbaş föyüyle karşılaştır', is_completed: false },
        { task: 'Apartman/site yönetiminden kaşeli ve ıslak imzalı aidat ve demirbaş borçsuzluk belgesi temin et', is_completed: false },
        { task: 'Tespit edilen hasar tamir bedellerini ve son faturaları depozitodan düşerek "Tahliye ve Depozito İbranamesi" düzenle', is_completed: false },
        { task: 'Kalan net depozito tutarını kiracının banka IBAN hesabına iade ederek anahtarları teslim al', is_completed: false }
      ],
      ikon: '🔑',
      renk: '#FEF3C7',
      anomali_notu: '🔑 Depozito iadesi yapılmadan önce yönetim aidat borçsuzluğu teyit edilmeli ve son sayaç endeksleri okunarak hasar mahsup tutanağı karşılıklı imzalanmalıdır.',
      sesli_fisilti: 'Kiracı tahliyesi için sayaç son endeksleri, yönetim borçsuzluk belgesi ve depozito mahsup tutanağı adımları devrede.'
    };
  }

  // 4. TAŞINMAZ GÖSTERME BELGESİ & PORTFÖY SUNUMU (Yer Gösterme Tutanağı, Mülk Sahibi Teyidi, Havalandırma)
  if (
    lower.includes('yer gösterme') || lower.includes('yer gosterme') || lower.includes('evi göstereceğiz') || lower.includes('evi gosterecegiz') ||
    lower.includes('sunum randevusu') || lower.includes('portföy sunumu') || lower.includes('portfoy sunumu') || lower.includes('daireyi gezdireceğiz') ||
    lower.includes('daireyi gosterecegiz') || lower.includes('daireyi göstereceğiz') || lower.includes('müşteriye gezdireceğiz') || lower.includes('daire sunumu')
  ) {
    const sunumDate = new Date(baseDate);
    sunumDate.setHours(15, 30, 0, 0);

    return {
      baslik: 'Taşınmaz Gösterme Belgesi & Portföy Sunumu',
      zaman: 'Müşteri Randevu Saati (15:30)',
      tarih_iso: sunumDate.toISOString(),
      hazirlik_zamani: 'Sunumdan 1 Saat Önce (Mülk Sahibi Teyidi)',
      action_items: [
        { task: 'Sunumdan 1 saat önce mülk sahibi veya mevcut kiracıyı arayarak randevuyu teyit et ve site güvenliğine bildirim yap', is_completed: false },
        { task: 'Daireye 15 dakika önce varıp pencereleri açarak havalandır, perdeleri ve aydınlatmaları açarak hazırla', is_completed: false },
        { task: 'Taşınmaz Ticareti Yönetmeliği gereği sunum başlamadan önce müşteriye "Taşınmaz Gösterme Belgesi"ni imzalat', is_completed: false },
        { task: 'Müşteriye net/brüt m2, aidat tutarı, bina yaşı, cephe, ısınma türü ve varsa otopark/depo haklarını şeffafça açıkla', is_completed: false },
        { task: 'Sunum bitiminde müşterinin geri bildirimini ve teklif niyetini CRM portföy takip föyüne kaydet', is_completed: false }
      ],
      ikon: '🤝',
      renk: '#E0E7FF',
      anomali_notu: '🤝 Taşınmaz Ticareti Yönetmeliği md. 19 uyarınca yer gösterme belgesi imzalatılmadan yapılan sunumlarda hizmet bedeli (komisyon) tahsili yasal güvenceden mahrum kalır.',
      sesli_fisilti: 'Portföy sunumu öncesi mülk sahibi teyidi, daire havalandırma ve yasal Taşınmaz Gösterme Belgesi imzalatma adımları kuruldu.'
    };
  }

  // 5. İMAR DURUMU, İSKAN, RUHSAT & TAPU TAKYİDAT SORGUSU (Kadastro, Parsel Sorgu, Kat İrtifakı/Mülkiyeti, Haciz Denetimi)
  if (
    lower.includes('imar durumu') || lower.includes('imar çapı') || lower.includes('imar capi') || lower.includes('iskan') || lower.includes('iskân') ||
    lower.includes('yapı kullanma') || lower.includes('yapi kullanma') || lower.includes('takyidat') || lower.includes('ada parsel') ||
    lower.includes('parsel sorgu') || lower.includes('kat irtifakı') || lower.includes('kat irtifaki') || lower.includes('kat mülkiyeti') ||
    lower.includes('kat mulkiyeti') || lower.includes('kadastro') || lower.includes('ekspertiz') || lower.includes('değerleme') || lower.includes('degerleme')
  ) {
    const inspectionDate = new Date(baseDate);
    inspectionDate.setHours(10, 0, 0, 0);

    return {
      baslik: 'İmar, İskan & Tapu Takyidat Denetimi',
      zaman: 'Belediye & Tapu Mesaisi (10:00)',
      tarih_iso: inspectionDate.toISOString(),
      hazirlik_zamani: 'Ekspertiz Öncesi (Ada/Parsel Doğrulama)',
      action_items: [
        { task: 'TKGM Parsel Sorgu üzerinden ada, parsel, yüzölçümü ve mülkiyet sınırlarını doğrula', is_completed: false },
        { task: 'Web-Tapu veya Tapu Müdürlüğünden güncel "Takyidat Belgesi" alarak haciz, ipotek, intifa veya mahkeme şerhlerini incele', is_completed: false },
        { task: 'İlgili ilçe belediyesi imar müdürlüğünden imar çapı, yapı ruhsatı ve İskan (Yapı Kullanma İzin Belgesi) durumunu sorgula', is_completed: false },
        { task: 'Onaylı mimari projeyi belediye arşivinden inceleyerek bağımsız bölümde projeye aykırı kaçak büyüme/eklenti olup olmadığını denetle', is_completed: false },
        { task: 'Bölgedeki son 6 aylık emsal satış değerlerini derleyerek gayrimenkul değerleme ve ekspertiz analiz raporu hazırla', is_completed: false }
      ],
      ikon: '📐',
      renk: '#FEF08A',
      anomali_notu: '📐 İskansız (yapı kullanma izinsiz) binalarda konut kredisi çekilemez veya faiz oranları yükselir; tapu takyidatında görünmeyen kamu hacizleri satış anında devri kilitler.',
      sesli_fisilti: 'Ada/parsel kadastro doğrulaması, belediye iskan/imar incelemesi ve tapu takyidat haciz kontrolü başlatıldı.'
    };
  }

  // 6. İPOTEK FEKKİ & KREDİ BORCU KAPANIŞ PROTOKOLÜ (Elektronik Fek, TAKPAS, Terkin Harcı)
  if (
    lower.includes('ipotek fek') || lower.includes('ipotek fekki') || lower.includes('ipotek kaldırma') || lower.includes('ipotek kaldirma') ||
    lower.includes('kredi kapandı') || lower.includes('kredi kapandi') || lower.includes('kredisi bitti') || lower.includes('ipotek terkin') ||
    lower.includes('banka ipoteği') || lower.includes('banka ipotegi') || lower.includes('ipotek fek yazısı')
  ) {
    const releaseDate = new Date(baseDate);
    releaseDate.setDate(releaseDate.getDate() + 2);

    return {
      baslik: 'İpotek Fekki & Tapu Terkin Protokolü',
      zaman: 'Kredi Kapanışı Sonrası (2 Gün)',
      tarih_iso: releaseDate.toISOString(),
      hazirlik_zamani: 'Banka Borçsuzluk Teyidi',
      action_items: [
        { task: 'İlgili banka şubesinden konut kredisinin sıfırlandığını ve borcun tamamen kapandığını teyit eden dekontu al', is_completed: false },
        { task: 'Bankanın Genel Müdürlük Kredi Operasyon biriminden Tapu Müdürlüğü\'ne Web-Tapu / TAKPAS üzerinden elektronik "İpotek Fekki" yazısı göndermesini talep et', is_completed: false },
        { task: 'Tapu harç ve döner sermaye sisteminden fek terkin harcının tahakkuk edip etmediğini kontrol et ve ödemesini sağla', is_completed: false },
        { task: 'Web-Tapu üzerinden taşınmazın güncel tapu kaydını sorgulayarak ipotek şerhinin sicilden tamamen silindiğini doğrula', is_completed: false },
        { task: 'Takyidatsız temiz tapu senedini alıcı veya mülk sahibine resmi olarak teslim et', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#DCFCE7',
      anomali_notu: '🏛️ Kredi borcu kapansa dahi banka sisteme fek yazısı göndermez ve harç ödenmezse ipotek tapu kütüğünde kalmaya devam eder ve satışa engel teşkil eder.',
      sesli_fisilti: 'İpotek fek yazısı takibi, elektronik terkin harcı ve güncel temiz tapu kaydı alma adımları oluşturuldu.'
    };
  }

  // 7. TÜFE KİRA ARTIŞI & YILLIK YENİLEME BİLDİRİMİ (12 Aylık TÜFE Tavan Oranı, 30 Gün Öncesi İhtar)
  if (
    lower.includes('kira artışı') || lower.includes('kira artisi') || lower.includes('tüfe kira') || lower.includes('tufe kira') ||
    lower.includes('kira zammı') || lower.includes('kira zammi') || lower.includes('kira yenileme') || lower.includes('kira süresi doldu') ||
    lower.includes('kira gunce') || lower.includes('kira günce')
  ) {
    const tufeDate = new Date(baseDate);
    tufeDate.setDate(tufeDate.getDate() + 30);

    return {
      baslik: 'TÜFE Kira Artışı & Yenileme Bildirimi',
      zaman: 'Sözleşme Bitişinden 30 Gün Önce',
      tarih_iso: tufeDate.toISOString(),
      hazirlik_zamani: 'TÜİK 12 Aylık TÜFE Açıklanması',
      action_items: [
        { task: 'TÜİK tarafından açıklanan son "12 Aylık TÜFE Ortalaması" yasal tavan artış oranını tespit et', is_completed: false },
        { task: 'Mevcut kira bedeline yasal tavan oranını uygulayarak yeni dönem aylık net kira rakamını hesapla', is_completed: false },
        { task: 'Kira yenileme döneminden en az 30 gün önce kiracıya yeni dönem kira bedeli ve banka IBAN bilgilerini yazılı olarak ilet', is_completed: false },
        { task: 'Ödemelerin Vergi Usul Kanunu gereği banka dekontunda "X Yılı X Ayı Kira Bedeli" açıklamasıyla yapılmasını hatırlat', is_completed: false },
        { task: 'Yeni kira bedeline göre depozito tamamlama farkını ve varsa kefil sorumluluğunu gözden geçir', is_completed: false }
      ],
      ikon: '📈',
      renk: '#FEF3C7',
      anomali_notu: '📈 TBK md. 344 uyarınca konut kiralarında artış oranı son 12 aylık TÜFE ortalamasını aşamaz; kira bedellerinin elden ödenmesi VUK uyarınca usulsüzlük cezasına tabidir.',
      sesli_fisilti: '12 aylık TÜFE ortalaması tavan kira artış hesabı ve sözleşme bitiminden 30 gün öncesine bildirim takvimi kuruldu.'
    };
  }

  // 8. EİDS YETKİLENDİRME & PORTFÖY İLAN PROTOKOLÜ (E-Devlet EİDS, Geniş Açı Çekim, Portallar)
  if (
    lower.includes('eids') || lower.includes('yetki belgesi') || lower.includes('yetki sözleşmesi') || lower.includes('yetki sozlesmesi') ||
    lower.includes('ilan girişi') || lower.includes('ilan girisi') || lower.includes('ilan gir') || lower.includes('satılık ilanı') ||
    lower.includes('satilik ilani') || lower.includes('kiralık ilanı') || lower.includes('kiralik ilani') ||
    lower.includes('portföy aldık') || lower.includes('portfoy aldik') || lower.includes('fotoğraf çekimi') || lower.includes('fotograf cekimi')
  ) {
    const ilanDate = new Date(baseDate);

    return {
      baslik: 'EİDS Yetkilendirme & Portföy İlan Protokolü',
      zaman: 'İlan Yayını Öncesi (E-Devlet Onayı)',
      tarih_iso: ilanDate.toISOString(),
      hazirlik_zamani: 'Portföy Çekimi & Evrak Toplama',
      action_items: [
        { task: 'Mülk sahibinden e-Devlet Elektronik İlan Doğrulama Sistemi (EİDS) üzerinden emlak işletmesine yetkilendirme onayını aldır', is_completed: false },
        { task: 'Taşınmaz Ticareti Hakkında Yönetmeliğe uygun "Yetkilendirme Sözleşmesi"ni süresi ve komisyon oranıyla ıslak imzalı tanzim et', is_completed: false },
        { task: 'Dairenin geniş açılı iç-dış mimari fotoğraflarını, video turunu ve kat planı çizimini hazırla', is_completed: false },
        { task: 'Tapudaki net ve brüt m2, ada/parsel, bina yaşı, ısıtma, aidat ve tapu mülkiyet durumunu şeffafça ilana gir', is_completed: false },
        { task: 'İlanı Sahibinden, Hepsiemlak ve kurumsal web sitesinde EİDS yetki onay koduyla yayına al', is_completed: false }
      ],
      ikon: '📸',
      renk: '#E0F2FE',
      anomali_notu: '📸 EİDS yetkilendirmesi veya sözleşmesi olmayan gayrimenkullerin internet portallarında ilana girilmesi Ticaret Bakanlığı tarafından idari para cezasına tabidir.',
      sesli_fisilti: 'E-Devlet EİDS yetki doğrulama, profesyonel çekim ve yasal mevzuata uygun portföy ilan protokolü hazırlandı.'
    };
  }

  // 9. GENEL GAYRİMENKUL & EMLAKÇI PORTFÖY TAKİBİ
  const defaultDate = new Date(baseDate);

  return {
    baslik: 'Gayrimenkul Portföy & Müşteri Takibi',
    zaman: 'Gün Boyu (Mesai İçi)',
    tarih_iso: defaultDate.toISOString(),
    hazirlik_zamani: 'Sabah Portföy & İlan Taraması',
    action_items: [
      { task: 'Sabah portföydeki satılık/kiralık ilanların güncelliğini ve gelen müşteri çağrılarını CRM\'e kaydet', is_completed: false },
      { task: 'Gün içindeki yer gösterme ve Web-Tapu randevularının evrak hazırlıklarını tamamla', is_completed: false },
      { task: 'Mülk sahiplerine haftalık portföy sunum ve geri bildirim raporunu ilet', is_completed: false },
      { task: 'Emlak işletmesi Taşınmaz Ticareti Yetki Belgesi ve mesleki yeterlilik belgelerini denetle', is_completed: false }
    ],
    ikon: '🏢',
    renk: '#FEF3C7',
    anomali_notu: '🏢 Gayrimenkul alım-satım ve kiralama işlemlerinde Taşınmaz Ticareti Yetki Belgesi ve yazılı sözleşmeler olmadan aracılık yapılması idari yaptırıma tabidir.',
    sesli_fisilti: 'Gayrimenkul portföy takip, müşteri sunum ve yasal evrak denetim kartı açıldı.'
  };
}

export function parseAgricultureBotanyNote(input: string, baseDate: Date, userDomain?: string): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();
  const isAgriDomain = userDomain === 'ZIRAAT';

  const isAgri = isAgriDomain ||
    lower.includes('ziraat') || lower.includes('botanik') || lower.includes('peyzaj') ||
    lower.includes('bahçe') || lower.includes('bahce') || lower.includes('tarla') || lower.includes('sera') ||
    lower.includes('çiçek') || lower.includes('cicek') || lower.includes('saksı') || lower.includes('saksi') ||
    lower.includes('sulama') || lower.includes('suvar') || lower.includes('sulayuver') || lower.includes('sulayıver') ||
    lower.includes('suver') || lower.includes('çiçekler susamış') || lower.includes('susamış') || lower.includes('saksının dibi') ||
    lower.includes('boynunu bükmüş') || lower.includes('su sal') || lower.includes('verive gari') ||
    lower.includes('orkide') || lower.includes('kaktüs') || lower.includes('kaktus') || lower.includes('sukulent') ||
    lower.includes('sardunya') || lower.includes('petunya') || lower.includes('paşa kılıcı') || lower.includes('pasa kilici') ||
    lower.includes('ilaçlama') || lower.includes('ilaclama') || lower.includes('bordo bulamacı') || lower.includes('bordo bulamaci') ||
    lower.includes('pestisit') || lower.includes('fungisit') || lower.includes('herbisit') || lower.includes('phi süresi') ||
    lower.includes('budama') || lower.includes('aşı macunu') || lower.includes('asi macunu') || lower.includes('ardıç katranı') ||
    lower.includes('damlama') || lower.includes('fertigasyon') || lower.includes('gübre') || lower.includes('gubre') ||
    lower.includes('çks') || lower.includes('cks') || lower.includes('tarsim') || lower.includes('tarım sigortası') ||
    lower.includes('zirai don') || lower.includes('fidan') || lower.includes('can suyu') || lower.includes('verticut') ||
    lower.includes('çim biçme') || lower.includes('çim havalandırma') || lower.includes('toprak tahlili');

  if (!isAgri) return null;

  // 0. ÖNCELİK: KISA SENARYO VERİTABANI EŞLEŞMESİ (Scenario Database Lookup)
  const shortMatch = matchShortScenario(input, 'ZIRAAT');
  if (shortMatch && shortMatch.domain === 'ZIRAAT') {
    let targetIso: string | null = baseDate.toISOString();
    const now = new Date(baseDate);

    if (shortMatch.id === 'ziraat_aksam_sulama') {
      const d = new Date(now);
      if (d.getHours() >= 20) d.setDate(d.getDate() + 1);
      d.setHours(19, 30, 0, 0);
      targetIso = d.toISOString();
    } else if (shortMatch.id === 'ziraat_orkide_daldirma') {
      const d = new Date(now);
      if (d.getHours() >= 12) d.setDate(d.getDate() + 1);
      d.setHours(9, 30, 0, 0);
      targetIso = d.toISOString();
    } else if (shortMatch.id === 'zirai_ilaclama_hava_sarti') {
      const d = new Date(now);
      if (d.getHours() >= 9) d.setDate(d.getDate() + 1);
      d.setHours(7, 0, 0, 0);
      targetIso = d.toISOString();
    } else if (shortMatch.id === 'zirai_budama_gubreleme' || shortMatch.id === 'ziraat_budama_bordo_bulamaci') {
      const d = new Date(now);
      d.setHours(8, 30, 0, 0);
      targetIso = d.toISOString();
    } else if (shortMatch.id === 'ziraat_ekim_can_suyu') {
      const d = new Date(now);
      d.setHours(10, 0, 0, 0);
      targetIso = d.toISOString();
    }

    return {
      baslik: shortMatch.baslik,
      zaman: shortMatch.varsayilanZaman,
      tarih_iso: targetIso,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      action_items: shortMatch.oncedenYapilacaklar.map(task => ({ task, is_completed: false })),
      ikon: shortMatch.ikon,
      renk: shortMatch.renk,
      tetikleyici: shortMatch.tetikleyici,
      anomali_notu: shortMatch.akilliFisilti,
      sesli_fisilti: shortMatch.akilliFisilti
    };
  }

  // 1. ŞİVE TOLERANSI & BOTANİK GÜNEŞ KURALI (AKŞAM 19:30 SERİNLİĞİ SULAMASI)
  // "suvarıver", "verive gari", "sulayuver", "çiçekler susamış", "saksının dibi", "çiçek sula", "su sal"
  if (
    lower.includes('suvar') || lower.includes('sulayuver') || lower.includes('sulayıver') || lower.includes('verive gari') ||
    lower.includes('çiçekler susamış') || lower.includes('cicekler susamis') || lower.includes('saksının dibi') ||
    lower.includes('çiçek sula') || lower.includes('cicek sula') || lower.includes('çiçeğe su') || lower.includes('çiçee su') ||
    lower.includes('bahçe sula') || lower.includes('bahce sula') || lower.includes('bostan sula') || lower.includes('domates sula') ||
    lower.includes('saksı sula') || lower.includes('saksi sula') || lower.includes('boynunu bükmüş') || lower.includes('su sal') ||
    (lower.includes('sulama') && !lower.includes('damlama') && !lower.includes('orkide') && !lower.includes('kaktüs'))
  ) {
    const target = new Date(baseDate);
    const currentHour = target.getHours();
    let zamanText = 'Bu Akşam 19:30';

    if (currentHour >= 20) {
      target.setDate(target.getDate() + 1);
      target.setHours(19, 30, 0, 0);
      zamanText = 'Yarın Akşam 19:30';
    } else {
      target.setHours(19, 30, 0, 0);
    }

    return {
      baslik: 'Akşam Serinliği Sulaması',
      zaman: zamanText,
      tarih_iso: target.toISOString(),
      hazirlik_zamani: 'Güneş Battıktan Sonra (Toprak Soğuyunca)',
      action_items: [
        { task: 'Toprağın 3-4 cm derinine parmak batırarak nem kontrolü yap (ıslaksa sulama yapma)', is_completed: false },
        { task: 'Güneşin tamamen batmasını ve saksı/toprak sıcaklığının düşmesini bekle (19:30)', is_completed: false },
        { task: 'Suyu doğrudan yapraklara değil, kök boğazına dinlendirilmiş kireçsiz suyla ver', is_completed: false },
        { task: 'Saksı tabağında biriken fazla suyu kök çürümesini önlemek için 15 dakika sonra boşalt', is_completed: false }
      ],
      ikon: '🌿',
      renk: '#DCFCE7',
      anomali_notu: '☀️ Güneş altında sulanan yapraklar mercek etkisiyle yanar ve kökler sıcak suyla haşlanır; sulama daima güneş battıktan sonra akşam serinliğinde yapılmalıdır.',
      sesli_fisilti: 'Güneş yaprakları yakmasın diye sulama saatini akşam 19:30 serinliğine kurdum.'
    };
  }

  // 2. ORKİDE DALDIRMA PROTOKOLÜ (ASLA AKŞAM DEĞİL - SABAH 09:30 IŞIĞI)
  if (
    lower.includes('orkide') || lower.includes('orkide bakımı') || lower.includes('orkide sula') ||
    lower.includes('daldırma sulama') || lower.includes('daldirma sulama')
  ) {
    const target = new Date(baseDate);
    const currentHour = target.getHours();
    let zamanText = 'Bugün Sabah 09:30';

    if (currentHour >= 11) {
      target.setDate(target.getDate() + 1);
      zamanText = 'Yarın Sabah 09:30';
    }
    target.setHours(9, 30, 0, 0);

    return {
      baslik: 'Orkide Daldırma Sulama Protokolü',
      zaman: zamanText,
      tarih_iso: target.toISOString(),
      hazirlik_zamani: 'Sabah Filtrelenmiş Gün Işığı',
      action_items: [
        { task: 'Şeffaf saksıdaki köklerin gümüş-griye döndüğünü teyit et (Kökler canlı yeşilse sulama yapma)', is_completed: false },
        { task: 'Oda sıcaklığındaki dinlenmiş kireçsiz su dolu kaba şeffaf saksıyı 10-15 dakika daldır', is_completed: false },
        { task: 'Sudan çıkarıp saksı deliklerinden tüm fazla suyun tamamen süzülmesini bekle (Damlamasın)', is_completed: false },
        { task: 'Yaprak göbeğine (taç noktasına) su kaçtıysa peçeteyle nazikçe kurula (Taç çürümesini önle)', is_completed: false },
        { task: 'Doğrudan yakıcı güneş almayan, tül arkası aydınlık ve havadar bir konuma yerleştir', is_completed: false }
      ],
      ikon: '🌸',
      renk: '#FDF2F8',
      anomali_notu: '🌸 Orkideler gece ıslak kalırsa ve tabakta su bekletilirse hızla kök mantarı oluşur; işlem sabah 10-15 dk daldırma yöntemiyle yapılmalıdır.',
      sesli_fisilti: 'Orkide gece kök mantarı yapmasın diye daldırma sulamayı sabah 09:30 ışığına kurdum.'
    };
  }

  // 3. KAKTÜS, SUKULENT & PAŞA KILICI (KURAKÇIL / KSEROFİTİK BAKIM)
  if (
    lower.includes('kaktüs') || lower.includes('kaktus') || lower.includes('sukulent') || lower.includes('succulent') ||
    lower.includes('paşa kılıcı') || lower.includes('pasa kilici') || lower.includes('aloe vera') || lower.includes('yılan bitkisi')
  ) {
    const target = new Date(baseDate);
    target.setHours(10, 0, 0, 0);

    return {
      baslik: 'Kaktüs & Sukulent Kurakçıl Bakım',
      zaman: 'Sabah 10:00 (2-3 Haftada Bir)',
      tarih_iso: target.toISOString(),
      hazirlik_zamani: 'Tam Kuruluk Testi Sonrası',
      action_items: [
        { task: 'Toprağın saksı dibine kadar tamamen kuruduğundan çöp şiş veya nem ölçerle emin ol', is_completed: false },
        { task: 'Oda sıcaklığında dinlenmiş kireçsiz suyla sadece kök çevresine az miktarda su ver', is_completed: false },
        { task: 'Gövdeye ve yaprak etli dokusuna su temas ettirme (Çürüme ve mantar lekesini önle)', is_completed: false },
        { task: 'Saksı tabağında kesinlikle su bırakma, kış dinlenmesi döneminde sulamayı ayda bire düşür', is_completed: false }
      ],
      ikon: '🌵',
      renk: '#FEF3C7',
      anomali_notu: '🌵 Kaktüs ve sukulentlerin en yaygın ölüm sebebi aşırı sulamadır; toprak tamamen kurumadan kesinlikle su verilmemelidir.',
      sesli_fisilti: 'Kaktüs ve sukulentler için kök çürümesini önleyici kurakçıl sulama takvimi oluşturuldu.'
    };
  }

  // 4. ZİRAİ İLAÇLAMA, METEOROLOJİK KOŞUL & PHI HASAT ÖNCESİ BEKLEME SÜRESİ
  if (
    lower.includes('ilaçlama') || lower.includes('ilaclama') || lower.includes('mantar ilacı') || lower.includes('böcek ilacı') ||
    lower.includes('pestisit') || lower.includes('fungisit') || lower.includes('herbisit') || lower.includes('zirai ilaç') ||
    lower.includes('kırmızı örümcek') || lower.includes('unlu bit') || lower.includes('pas ilacı') || lower.includes('phi süresi')
  ) {
    const target = new Date(baseDate);
    if (target.getHours() >= 9) target.setDate(target.getDate() + 1);
    target.setHours(7, 0, 0, 0);

    return {
      baslik: 'Zirai İlaçlama & Meteorolojik Koşul Takibi',
      zaman: 'Sabah Serinliği 07:00 (Rüzgarsız Saat)',
      tarih_iso: target.toISOString(),
      hazirlik_zamani: 'İlaçlama Günü 06:15 (Tulum & Kalibrasyon)',
      tetikleyici: {
        tip: 'durum',
        sart: 'yagmursuz_ruzgarsiz',
        etiket: 'Hava Şartı: Rüzgar <10 km/s & 24 Saat Yağışsız'
      },
      action_items: [
        { task: 'Meteoroloji 48 saatlik yağış ve rüzgar (<10 km/s) tahminini teyit et (İlaç yıkanması ve sürüklenmeyi önle)', is_completed: false },
        { task: 'Kimyasal buhar maskesi (A2P3 filtre), koruyucu tulum, gözlük ve nitril eldiven donanımını kuşan', is_completed: false },
        { task: 'İlaçlama suyu pH değerini (5.5 - 6.5 aralığı) kontrol et; etiket reçete dozajını asla aşma', is_completed: false },
        { task: 'Uygulama öncesinde komşu arıcılara haber ver; etiket üzerindeki PHI (Son İlaçlama ile Hasat Arası Süre) gününü kaydet', is_completed: false },
        { task: 'Pülverizatör tankı ve memelerini uygulama bitiminde bol temiz suyla yıkayarak arındır', is_completed: false }
      ],
      ikon: '🧪',
      renk: '#DCFCE7',
      anomali_notu: '⚠️ Rüzgarlı havada ilaçlama sürüklenme zehirlenmesine yol açar; ilk 24 saatte yağacak yağmur ise ilacı tamamen yıkar. PHI bekleme süresine uyulmalıdır.',
      sesli_fisilti: 'Rüzgarsız hava şartı, İSG donanımı ve PHI hasat bekleme takvimli zirai ilaçlama kartı açıldı.'
    };
  }

  // 5. MEVSİMLİK BUDAMA, YARA BAKIMI & BORDO BULAMACI
  if (
    lower.includes('budama') || lower.includes('ağaç budama') || lower.includes('fidan budama') ||
    lower.includes('zeytin budama') || lower.includes('asma budama') || lower.includes('gül budama') ||
    lower.includes('bordo bulamacı') || lower.includes('bordo bulamaci') || lower.includes('aşı macunu') ||
    lower.includes('ardıç katranı') || lower.includes('ağaçları budadık')
  ) {
    const target = new Date(baseDate);
    target.setHours(8, 30, 0, 0);

    return {
      baslik: 'Mevsimlik Budama & Bordo Bulamacı Protokolü',
      zaman: 'Sabah 08:30 (Budama & Yara Tedavisi)',
      tarih_iso: target.toISOString(),
      hazirlik_zamani: 'Budamadan Hemen Sonra (48 Saat İçinde)',
      action_items: [
        { task: 'Budama makası, testere ve aletleri %10 çamaşır suyu veya alkolle dezenfekte et (Kanser ve virüs bulaşmasını önle)', is_completed: false },
        { task: 'Kuru, hastalıklı, obur ve içe doğru gelişen dalları tırnak bırakmadan dipten kes', is_completed: false },
        { task: '2 cm üzerindeki tüm kalın kesim yaralarını hava almayacak şekilde aşı macunu (ardıç katranı) ile kapat', is_completed: false },
        { task: 'Budama biter bitmez gövde ve ana dallara bakteri/mantar girişini önleyen %1.5-2\'lik Bordo Bulamacı püskürt', is_completed: false },
        { task: 'Budanan hastalıklı ve mantarlı dal artıklarını bahçeden uzaklaştırarak imha et', is_completed: false }
      ],
      ikon: '✂️',
      renk: '#FEF3C7',
      anomali_notu: '🌳 Kalın kesik yüzeyleri aşı macunuyla kapatılmazsa ve aletler dezenfekte edilmezse ağaçlar dal kanseri (Pseudomonas) kapar.',
      sesli_fisilti: 'Budama dezenfeksiyonu, yara aşı macunu ve Bordo Bulamacı koruma adımları hazırlandı.'
    };
  }

  // 6. DAMLAMA SULAMA, FERTİGASYON & TOPRAK TAHLİLİ / GÜBRELEME
  if (
    lower.includes('damlama sulama') || lower.includes('damlama') || lower.includes('fertigasyon') ||
    lower.includes('taban gübresi') || lower.includes('yaprak gübresi') || lower.includes('azot gübre') ||
    lower.includes('potasyum gübre') || lower.includes('fosforik asit') || lower.includes('gübreleme') ||
    lower.includes('gubreleme') || lower.includes('toprak tahlili')
  ) {
    const target = new Date(baseDate);
    target.setHours(8, 0, 0, 0);

    return {
      baslik: 'Damlama Sulama & Fertigasyon Protokolü',
      zaman: 'Sabah 08:00 (Damlama & Besleme Döngüsü)',
      tarih_iso: target.toISOString(),
      hazirlik_zamani: 'Sulama Öncesi Filtre & Basınç Kontrolü',
      action_items: [
        { task: 'Toprak ve yaprak tahlili sonuçlarına göre N-P-K gübre dozunu fertigasyon tankında tamamen erit', is_completed: false },
        { task: 'Sulamanın ilk 15-20 dakikasında hatları temiz suyla doldurup manometreden çalışma basıncını (1.5-2.0 bar) sağla', is_completed: false },
        { task: 'Gübre enjeksiyonunu tamamladıktan sonra hatlarda kristal kalmaması için sisteme 20-30 dakika temiz su bas', is_completed: false },
        { task: 'Damlatıcıların tıkanmaması için disk/kum çakıl filtrelerini ters yıkama (backwash) yaparak temizle', is_completed: false },
        { task: 'Sezonluk kireç ve yosun birikimlerine karşı damlama borularına düşük doz fosforik/nitrik asit şoku ver', is_completed: false }
      ],
      ikon: '💧',
      renk: '#DCFCE7',
      anomali_notu: '💧 Fertigasyon sonrasında damlama borularına temiz su basılmazsa damlatıcı memeleri gübre tuzları ve kireçle kalıcı olarak tıkanır.',
      sesli_fisilti: 'Fertigasyon dozu, hat basınç kontrolü ve filtre temizleme adımları planlandı.'
    };
  }

  // 7. ZİRAİ DON UYARISI, SERA ISITMA & SİSLEME / DUMANLAMA
  if (
    lower.includes('zirai don') || lower.includes('don var') || lower.includes('don tehlikesi') ||
    lower.includes('serayı ısıt') || lower.includes('don nöbeti') || lower.includes('dona karşı') ||
    lower.includes('sera don') || lower.includes('don vuracak') || lower.includes('don riski')
  ) {
    const target = new Date(baseDate);
    target.setHours(3, 30, 0, 0);

    return {
      baslik: 'Zirai Don Nöbeti & Sera Isıtma Alarmı',
      zaman: 'Gece Don Nöbeti (03:30)',
      tarih_iso: target.toISOString(),
      hazirlik_zamani: 'Akşam 21:00 (Termometre & Soba Hazırlığı)',
      tetikleyici: {
        tip: 'hava',
        sart: 'don',
        etiket: 'Meteoroloji Şartı: Gece Zirai Don Alarmı (≤ 0°C)'
      },
      action_items: [
        { task: 'Gece sıcaklıklarının 0°C ve altına düşüş hızını seradaki dijital termometreden anlık takip et', is_completed: false },
        { task: 'Seralarda soba, kalorifer veya sıcak hava üreteçlerini saat 02:00 itibarıyla ateşle', is_completed: false },
        { task: 'Açık meyve bahçelerinde don öncesi gündüzden hafif sulama yap (Islak toprak gündüz ısısını geceye taşır)', is_completed: false },
        { task: 'Aşırı don riskinde üstten yağmurlama sisleme sistemini açarak suyun donma gizli ısısıyla tomurcukları koru', is_completed: false },
        { task: 'Don hasarı sonrasında bitkinin toparlanması için yapraktan amino asit ve deniz yosunu takviyesi ver', is_completed: false }
      ],
      ikon: '❄️',
      renk: '#E0F2FE',
      anomali_notu: '❄️ Kuru toprak gece ıslak topraktan 1.5 - 2°C daha soğuk olur; don gecesinde don pervaneleri ve nem kritik hayati koruma sağlar.',
      sesli_fisilti: 'Gece zirai don nöbeti, sera ısıtma ve bitki don koruma protokolü devreye alındı.'
    };
  }

  // 8. ÇKS (ÇİFTÇİ KAYIT SİSTEMİ) & TARSİM TARIM SİGORTASI
  if (
    lower.includes('çks') || lower.includes('cks') || lower.includes('tarsim') ||
    lower.includes('tarım sigortası') || lower.includes('çiftçi kayıt sistemi') ||
    lower.includes('mazot gübre desteği') || lower.includes('ürün sigortası') || lower.includes('dolu sigortası')
  ) {
    const target = new Date(baseDate);
    target.setHours(16, 0, 0, 0);

    return {
      baslik: 'ÇKS Yenileme & TARSİM Sigorta Protokolü',
      zaman: 'Başvuru Dönemi (Mesai Bitimi 16:00)',
      tarih_iso: target.toISOString(),
      hazirlik_zamani: 'Evrak Hazırlığı (Ziraat Odası & Tapu)',
      action_items: [
        { task: 'Güncel tapu fotokopileri, muvafakatnameler ve kira sözleşmelerini bağlı bulunulan Ziraat Odasına onaylat', is_completed: false },
        { task: 'İlçe Tarım ve Orman Müdürlüğüne ÇKS formlarını ve parsel beyanlarını teslim et', is_completed: false },
        { task: 'TARSİM yetkili acentesinden don, dolu, fırtına ve yangın risk teminat poliçesini son başvuru gününden önce kestir', is_completed: false },
        { task: 'Doğal afet hasarı oluştuğunda en geç 10 gün içinde TARSİM çağrı merkezine ihbarda bulunarak ekspertiz talep et', is_completed: false },
        { task: 'e-Devlet üzerinden Mazot-Gübre ve prim destekleme hakediş durumunu sorgula', is_completed: false }
      ],
      ikon: '🌾',
      renk: '#FEF3C7',
      anomali_notu: '🌾 ÇKS kaydı süresinde yenilenmeyen araziler mazot-gübre devlet desteğinden ve TARSİM prim indiriminden faydalanamaz.',
      sesli_fisilti: 'ÇKS dosya yenileme, mazot-gübre desteği ve TARSİM tarım sigortası adımları açıldı.'
    };
  }

  // 9. FİDAN DİKİMİ, CAN SUYU & KÖK BOĞAZI BAKIMI
  if (
    lower.includes('fidan diktik') || lower.includes('fidan dikimi') || lower.includes('ağaç diktik') ||
    lower.includes('fidan aldık') || lower.includes('tüplü fidan') || lower.includes('açık köklü') ||
    lower.includes('can suyu')
  ) {
    const target = new Date(baseDate);
    target.setHours(10, 0, 0, 0);

    return {
      baslik: 'Fidan Dikimi & Can Suyu Protokolü',
      zaman: 'Dikimden Hemen Sonra (İlk 24 Saat)',
      tarih_iso: target.toISOString(),
      hazirlik_zamani: 'Dikim Çukuru & Herek Hazırlığı',
      action_items: [
        { task: 'Dikim çukurunu fidan kökünden 2 kat geniş ve derin kaz; tabanına yanmış çiftlik gübresi harmanla', is_completed: false },
        { task: 'Açık köklü fidanlarda kök tuvaleti yap (Ezilmiş, kırılmış ve aşırı uzun kökleri steril makasla buda)', is_completed: false },
        { task: 'Fidan aşı noktasının toprak yüzeyinden en az 5-10 cm yukarıda kalmasına dikkat et (Aşı boğulmasın)', is_completed: false },
        { task: 'Fidanı rüzgar yönüne göre destek hereğine (kazığa) 8 şeklinde esnek iple bağla', is_completed: false },
        { task: 'Topraktaki hava boşluklarını kapatmak ve kökü sabitlemek için bol miktarda ilk CAN SUYU ver', is_completed: false }
      ],
      ikon: '🌱',
      renk: '#DCFCE7',
      anomali_notu: '🌱 Fidan aşı noktası toprağa gömülürse fidan asil kök verir, yabani anacın özelliği kaybolur veya gövde çürüyerek fidan kurur.',
      sesli_fisilti: 'Kök tuvaleti, aşı boğazı hizası ve ilk can suyu dikim protokolü oluşturuldu.'
    };
  }

  // 10. ÇİM ALAN BAKIMI, KÖK HAVALANDIRMA & VERTİCUT
  if (
    lower.includes('çim biçme') || lower.includes('cim bicme') || lower.includes('çim havalandırma') ||
    lower.includes('verticut') || lower.includes('çim sulama') || lower.includes('çim ekimi') ||
    lower.includes('çim sarardı') || lower.includes('rulo çim')
  ) {
    const target = new Date(baseDate);
    target.setHours(7, 30, 0, 0);

    return {
      baslik: 'Çim Alan Bakımı & Verticut Protokolü',
      zaman: 'Sabah Erken 07:30 (Çim Fıskiye & Biçim)',
      tarih_iso: target.toISOString(),
      hazirlik_zamani: 'Bıçak Bileme & Zemin Kontrolü',
      action_items: [
        { task: 'Çim biçme makinesinin bıçaklarının keskin olduğunu kontrol et (Kör bıçak çim ucunu parçalar ve sarartır)', is_completed: false },
        { task: 'Çim boyunun 1/3\'ünden fazlasını tek seferde kesme (Bitkiyi strese sokmamak için kademeli biç)', is_completed: false },
        { task: 'Çimleri sabah erken saatte sula; akşam sulamasından kaçın (Sabaha kadar ıslak yaprak pas ve mantar yapar)', is_completed: false },
        { task: 'Yılda iki kez keçe tabakasını temizlemek için verticut havalandırma ve silindirleme yap', is_completed: false },
        { task: 'Seyrelen kel bölgelere ara ekim tohumu serpip üzerini ince elenmiş torf ve silis kumla ört', is_completed: false }
      ],
      ikon: '🌱',
      renk: '#DCFCE7',
      anomali_notu: '🌱 Çimler akşam sulanırsa sabaha kadar ıslak kalan yapraklarda kahverengi yama (Brown Patch) ve pas mantarı oluşur.',
      sesli_fisilti: 'Sabah erken fıskiye sulaması, 1/3 boy kesim ve verticut çim bakım kartı açıldı.'
    };
  }

  // 11. GENEL ZİRAAT & BAHÇE / BİTKİ BAKIM RUTİNİ FALLBACK
  const defaultTarget = new Date(baseDate);
  defaultTarget.setHours(19, 30, 0, 0);

  return {
    baslik: 'Ziraat & Botanik Bakım Takibi',
    zaman: 'Akşam Serinliği 19:30',
    tarih_iso: defaultTarget.toISOString(),
    hazirlik_zamani: 'Gün İçi Bitki Gözlemi',
    action_items: [
      { task: 'Bitkilerde yaprak altı böcek, akar, külleme ve mantar belirtilerini kontrol et', is_completed: false },
      { task: 'Toprağın nem durumunu kontrol ederek sulama gereksinimini belirle', is_completed: false },
      { task: 'Kuruyan çiçek başlarını ve sararan yaprakları temizleyerek yeni sürgünleri teşvik et', is_completed: false },
      { task: 'Mevsimine uygun organik/mineral gübre takviyesini kök izdüşümüne uygula', is_completed: false }
    ],
    ikon: '🌿',
    renk: '#DCFCE7',
    anomali_notu: '🌿 Bitki bakımında düzenli yaprak altı kontrolü hastalıkların erken teşhisinde anahtar rol oynar.',
    sesli_fisilti: 'Ziraat ve botanik genel kontrol ve bakım kartı oluşturuldu.'
  };
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

export function parseEngineeringSuiteNote(input: string, baseDate: Date, userDomain?: string): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();
  const isTeknikDomain = userDomain === 'TEKNIK';

  const isEngineering =
    isTeknikDomain ||
    lower.includes('siem') || lower.includes('siemm') || lower.includes('soc') ||
    lower.includes('firewall') || lower.includes('fortigate') || lower.includes('palo alto') || lower.includes('waf') ||
    lower.includes('active directory') || lower.includes('domain controller') || lower.includes('gpo') || lower.includes('ldap') ||
    lower.includes('veeam') || lower.includes('disaster recovery') || lower.includes('dr tatbikatı') || lower.includes('dr testi') || lower.includes('backup restore') ||
    lower.includes('kubernetes') || lower.includes('k8s') || lower.includes('docker') || lower.includes('microservice') ||
    lower.includes('pentest') || lower.includes('sızma testi') || lower.includes('zafiyet') || lower.includes('vulnerability') ||
    lower.includes('edr') || lower.includes('xdr') || lower.includes('syslog') || lower.includes('log analizi') || lower.includes('uat') || lower.includes('poc') ||
    lower.includes('vpn koptu') || lower.includes('ipsec') || lower.includes('ssl sertifikası') || lower.includes('tls sertifikası') ||
    ((lower.includes('kurulum') || lower.includes('sunum')) && (lower.includes('müşteri') || lower.includes('sunumu') || lower.includes('artı') || lower.includes('sistem') || lower.includes('sunucu'))) ||
    lower.includes('beton') || lower.includes('şantiye') || lower.includes('santiye') ||
    lower.includes('donatı') || lower.includes('donati') || lower.includes('kürleme') || lower.includes('kurleme') ||
    lower.includes('kırım testi') || lower.includes('kirim testi') || lower.includes('kalıp söküm') || lower.includes('kalıp kontrol') || lower.includes('paspayı') ||
    lower.includes('trafo') || lower.includes('pano') || lower.includes('yüksek gerilim') || lower.includes('yuksek gerilim') ||
    lower.includes('loto') || lower.includes('kilitleme-etiketleme') || lower.includes('kilitleme etiketleme') || lower.includes('kompanzasyon') || lower.includes('endüktif') || lower.includes('kapasitif') ||
    lower.includes('kompresör') || lower.includes('kompresor') || lower.includes('kazan') || lower.includes('basınçlı kap') || lower.includes('basincli kap') ||
    lower.includes('hidrostatik test') || lower.includes('vibrasyon') || lower.includes('titreşim') || lower.includes('titresim') || lower.includes('yağ analizi') || lower.includes('yag analizi') ||
    lower.includes('deploy') || lower.includes('canlıya alma') || lower.includes('canliya alma') || lower.includes('migration') ||
    lower.includes('rollback') || lower.includes('staging') || lower.includes('semver') || lower.includes('hotfix') || lower.includes('sprint') ||
    lower.includes('zemin etüdü') || lower.includes('zemin etudu') || lower.includes('spt') || lower.includes('aplikasyon') || lower.includes('nivo') || lower.includes('total station') ||
    lower.includes('biyomedikal') || lower.includes('kalibrasyon') || lower.includes('iec 62353') ||
    lower.includes('5s') || lower.includes('kaizen') || lower.includes('balık kılçığı') || lower.includes('spc') || lower.includes('fmea');

  if (!isEngineering) return null;

  // 0. ÖNCELİK: KISA SENARYO VERİTABANI EŞLEŞMESİ (Scenario Database Lookup)
  const shortMatch = matchShortScenario(input, 'TEKNIK');
  if (shortMatch && shortMatch.domain === 'TEKNIK') {
    let targetIso: string | null = baseDate.toISOString();
    let hazirlikIso: string | null = null;

    if (shortMatch.id === 'muhendislik_insaat_beton_kirim') {
      const due7 = new Date(baseDate);
      due7.setDate(due7.getDate() + 7);
      due7.setHours(10, 0, 0, 0);
      targetIso = due7.toISOString();
    } else if (shortMatch.id === 'muhendislik_insaat_kalip_donati_onam') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 1);
      due.setHours(9, 0, 0, 0);
      targetIso = due.toISOString();
      hazirlikIso = baseDate.toISOString();
    } else if (shortMatch.id === 'it_ssl_tls_renewal') {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 7);
      due.setHours(11, 0, 0, 0);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'muhendislik_yazilim_hotfix_semver') {
      const due = new Date(baseDate);
      due.setHours(due.getHours() + 2);
      targetIso = due.toISOString();
    } else if (shortMatch.id === 'it_vpn_ipsec_kesinti') {
      const due = new Date(baseDate);
      due.setMinutes(due.getMinutes() + 15);
      targetIso = due.toISOString();
    } else if (shortMatch.hazirlikSaatOncesi && targetIso) {
      const hDate = new Date(targetIso);
      hDate.setHours(hDate.getHours() - shortMatch.hazirlikSaatOncesi);
      hazirlikIso = hDate.toISOString();
    }

    return {
      baslik: shortMatch.baslik,
      zaman: shortMatch.varsayilanZaman,
      tarih_iso: targetIso,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      hazirlik_iso: hazirlikIso,
      eksik_bilgi: false,
      action_items: shortMatch.oncedenYapilacaklar.map((task) => ({ task, is_completed: false })),
      anomali_notu: shortMatch.akilliFisilti,
      ikon: shortMatch.ikon,
      renk: shortMatch.renk,
      sesli_fisilti: shortMatch.akilliFisilti
    };
  }

  // 1. İNŞAAT MÜHENDİSLİĞİ: Beton Dökümü, Kürleme & 7/28 Gün Laboratuvar Kırım Testi
  if (
    lower.includes('beton döktük') || lower.includes('beton döküldü') || lower.includes('beton dökümü') ||
    lower.includes('kırım testi') || lower.includes('kirim testi') || lower.includes('küp numune') || lower.includes('silindir numune') ||
    (lower.includes('beton') && (lower.includes('kür') || lower.includes('suvar') || lower.includes('sulama') || lower.includes('numune')))
  ) {
    const test7 = new Date(baseDate);
    test7.setDate(test7.getDate() + 7);
    test7.setHours(10, 0, 0, 0);

    return {
      baslik: 'Beton Dökümü & 7/28 Gün Kırım Testi',
      zaman: '7. & 28. Gün Laboratuvar Kırımı',
      tarih_iso: test7.toISOString(),
      hazirlik_zamani: 'İlk 3 Gün (Sabah/Akşam Kürleme)',
      hazirlik_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Küp/silindir beton numunelerinin şantiyede etiketlenmesi ve standart su kür havuzuna alınması', is_completed: false },
        { task: 'İlk 72 saat boyunca günde en az iki kez düzenli beton kür sulaması veya kür membranı uygulaması', is_completed: false },
        { task: 'Yapı denetim ve şantiye şefi ıslak imzalı beton döküm ve donatı teslim tutanağını dosyala', is_completed: false },
        { task: '7. gün akredite laboratuvarda erken dayanım (hedef: en az %70) kırım testi ve rapor onayı', is_completed: false },
        { task: '28. gün nihai karakteristik basınç dayanımı kırım testi ve statik uygunluk kabulü', is_completed: false }
      ],
      ikon: '🏗️',
      renk: '#FEF3C7',
      anomali_notu: 'TS EN 206 standardı uyarınca ilk 72 saat kürleme aksatılmamalı; 7. gün erken ve 28. gün nihai tasarım dayanımı basınç testleri laboratuvarda yapılmalıdır.',
      sesli_fisilti: 'Beton kürleme periyodu ve 7 ile 28 günlük laboratuvar kırım takvimi oluşturuldu.'
    };
  }

  // 2. İNŞAAT MÜHENDİSLİĞİ: Kalıp-Donatı Teslimi & Döküm Vizesi (T-24)
  if (
    lower.includes('donatı') || lower.includes('donati') || lower.includes('kalıp') || lower.includes('kalip') ||
    lower.includes('paspayı') || lower.includes('paspayi') || lower.includes('etriye') || lower.includes('döküm izni') || lower.includes('dokum izni')
  ) {
    const dokumDate = new Date(baseDate);
    dokumDate.setDate(dokumDate.getDate() + 1);
    dokumDate.setHours(9, 0, 0, 0);

    return {
      baslik: 'Kalıp-Donatı Kontrolü & Döküm Vizesi',
      zaman: 'Dökümden 24 Saat Önce',
      tarih_iso: dokumDate.toISOString(),
      hazirlik_zamani: 'T-24 Saat (Proje Donatı Kontrolü)',
      hazirlik_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Statik mimari projeye göre kolon, kiriş ve perde donatı çap ve adetlerinin bizzat sayımı', is_completed: false },
        { task: 'Kolon-kiriş birleşim bölgelerinde etriye sıklaştırma aralıklarının ve gönyelerin kontrolü', is_completed: false },
        { task: 'Kalıp altı ve yan yüzeylerde plastik paspayı takozlarının yerleşimi ve kalıp temizliği', is_completed: false },
        { task: 'Yapı denetim mühendisi ile şantiye mahallinde donatı vize tutanağının müştereken imzalanması', is_completed: false }
      ],
      ikon: '🏗️',
      renk: '#FEF3C7',
      anomali_notu: 'Donatı çapı, aralığı, paspayı ve etriye sıklaştırması yapı denetim ve şantiye şefince imzalanmadan beton mikseri sahaya sokulamaz.',
      sesli_fisilti: 'Kalıp-donatı vizesi ve döküm öncesi T-24 kontrol adımları planlandı.'
    };
  }

  // 3. ELEKTRİK MÜHENDİSLİĞİ: Pano, Trafo, Yüksek Gerilim & LOTO Güvenliği
  if (
    lower.includes('loto') || lower.includes('kilitleme-etiketleme') || lower.includes('kilitleme etiketleme') ||
    ((lower.includes('trafo') || lower.includes('pano') || lower.includes('yüksek gerilim') || lower.includes('yuksek gerilim') || lower.includes('şalter')) &&
     (lower.includes('bakım') || lower.includes('müdahale') || lower.includes('enerji kes') || lower.includes('arıza')))
  ) {
    return {
      baslik: 'Pano/Trafo Bakımı & LOTO Güvenliği',
      zaman: 'Müdahale Öncesi (İSG)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'T-30 Dk (Enerji Kesme & Ölçüm)',
      action_items: [
        { task: 'LOTO Prosedürü: Ana kesici ve kompakt şalteri indir, asma kilitle kilitle ve ikaz levhasını as', is_completed: false },
        { task: 'Gerilim kontrol kalemi ile baralarda 0V olduğunu doğrula ve seyyar topraklama donanımını tak', is_completed: false },
        { task: 'Termal kamera ile bara bağlantıları, kontaktör ve klemenslerde aşırı ısınma/gevşeklik taraması yap', is_completed: false },
        { task: 'Bakım bitiminde megger mego metre ile izolasyon direnci testi ve teslim tutanağını imzala', is_completed: false }
      ],
      ikon: '⚡',
      renk: '#FEE2E2',
      anomali_notu: 'Can güvenliği için enerjinin kesildiği fiziksel gerilim kalemi ve multimetreyle ölçülmeden panoya asla dokunulmamalıdır.',
      sesli_fisilti: 'LOTO kilitleme-etiketleme, 0V gerilim teyidi ve termal kamera denetimi 1. sıraya alındı.'
    };
  }

  // 4. ELEKTRİK MÜHENDİSLİĞİ: Kompanzasyon, RGKR & Reaktif Ceza Takibi
  if (
    lower.includes('kompanzasyon') || lower.includes('reaktif ceza') || lower.includes('endüktif') || lower.includes('kapasitif') ||
    lower.includes('kondansatör') || lower.includes('rgkr') || lower.includes('reaktif güç')
  ) {
    return {
      baslik: 'Kompanzasyon & Sayaç Takibi',
      zaman: 'Haftalık Sayaç Okuma',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Pazartesi 09:00',
      action_items: [
        { task: 'Aktif (T), reaktif endüktif (Ri) ve reaktif kapasitif (Rc) sayaç endekslerini haftalık olarak kaydet', is_completed: false },
        { task: 'Reaktif oranları hesapla: Endüktif <%20 ve Kapasitif <%15 güvenlik sınırında olduğunu teyit et', is_completed: false },
        { task: 'Reaktif güç kontrol rölesi (RGKR) kademe akımlarını ve arızalı kondansatörleri pensampermetre ile test et', is_completed: false },
        { task: 'Yapışık kalan kontaktör veya deşarj direnci bozulmuş kondansatörlerin değişimini planla', is_completed: false }
      ],
      ikon: '⚡',
      renk: '#FEE2E2',
      anomali_notu: 'Endüktif oran %20, kapasitif oran %15 sınırını aştığında elektrik faturasına ağır reaktif ceza yansır.',
      sesli_fisilti: 'Kompanzasyon sayaç okuma ve reaktif sınır denetim adımları oluşturuldu.'
    };
  }

  // 5. MAKİNE MÜHENDİSLİĞİ: Basınçlı Kaplar, Kompresör, Kazan & Hidrostatik Test
  if (
    lower.includes('hidrostatik test') || lower.includes('basınçlı kap') || lower.includes('basincli kap') ||
    lower.includes('kompresör') || lower.includes('kompresor') || lower.includes('kazan') || lower.includes('hava tankı') || lower.includes('emniyet ventili')
  ) {
    return {
      baslik: 'Basınçlı Kap Hidrostatik Testi',
      zaman: 'Yıllık Yasal Periyodik Muayene',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Testten 24 Saat Önce',
      action_items: [
        { task: 'Tank veya kazanın havasını tahliye edip suyla doldurarak 1.5 x İşletme Basıncında hidrostatik test hazırla', is_completed: false },
        { task: 'Emniyet ventili açma basıncını test standında doğrula ve kurşun mühür durumunu denetle', is_completed: false },
        { task: 'Kaynak dikişleri, gövde korozyonu ve et kalınlığı ultrasonik kalınlık ölçüm cihazıyla tara', is_completed: false },
        { task: 'TÜRKAK akredite A-Tipi muayene kuruluşundan periyodik kontrol uygunluk raporunu teslim al', is_completed: false }
      ],
      ikon: '⚙️',
      renk: '#E2E8F0',
      anomali_notu: 'İş Ekipmanları Yönetmeliği uyarınca basınçlı kaplar yılda en az bir kez akredite kuruluşça işletme basıncının 1.5 katıyla hidrostatik teste tabi tutulmalıdır.',
      sesli_fisilti: 'Basınçlı kap hidrostatik testi ve emniyet ventili kalibrasyon föyü oluşturuldu.'
    };
  }

  // 6. MAKİNE MÜHENDİSLİĞİ: Kestirimci Bakım, Vibrasyon Analizi & Yağ Numunesi
  if (
    lower.includes('vibrasyon') || lower.includes('titreşim') || lower.includes('titresim') ||
    lower.includes('yağ analizi') || lower.includes('yag analizi') || lower.includes('rulman') || lower.includes('kestirimci bakım')
  ) {
    return {
      baslik: 'Kestirimci Bakım & Vibrasyon Analizi',
      zaman: 'Aylık Rutin Ölçüm',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Ölçümden 1 Saat Önce',
      action_items: [
        { task: 'Motor ve pompa yatak noktalarından (Yatay, Dikey, Eksenel) titreşim ivme ve hız RMS değerlerini ölç', is_completed: false },
        { task: 'Lazerli kaplin ayarı (şaft hizalama) ve balanssızlık açılarını kontrol et', is_completed: false },
        { task: 'Redüktör ve hidrolik üniteden yağ numunesi alarak viskozite, aşınma metali ve partikül analizine gönder', is_completed: false },
        { task: 'Kritik eşiği aşan rulmanlar için duruş planı oluştur ve yedek parça siparişini tetikle', is_completed: false }
      ],
      ikon: '⚙️',
      renk: '#E2E8F0',
      anomali_notu: 'ISO 10816 standart limitleri aşıldığında rulman ve kaplin hasarı kaçınılmazdır; FFT spektrum analiziyle arıza kaynağı saptanmalıdır.',
      sesli_fisilti: 'Titreşim spektrum analizi, şaft hizalama ve yağ laboratuvar adımları planlandı.'
    };
  }

  // 7. YAZILIM MÜHENDİSLİĞİ: Production Deploy, Release & Rollback Yönetimi
  if (
    lower.includes('deploy') || lower.includes('canlıya alma') || lower.includes('canliya alma') ||
    lower.includes('release') || lower.includes('canlıya geçiş') || lower.includes('production deployment')
  ) {
    const isFriday = baseDate.getDay() === 5;
    return {
      baslik: 'Production Deploy & Sürüm Yönetimi',
      zaman: isFriday ? 'Cuma Deploy Riski / Canlıya Alma' : 'Deploy Saati / Bakım Penceresi',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'T-1 Saat (DB Backup & Runbook)',
      action_items: [
        { task: 'Production veritabanı anlık snapshot yedeğini al ve migration scriptlerinin geriye dönük uyumunu test et', is_completed: false },
        { task: 'Staging ortamında E2E regresyon testlerinin ve ürün yöneticisi (PO) kabul onayının tamamlandığını doğrula', is_completed: false },
        { task: 'SemVer standardına uygun Git tag/release etiketini oluştur ve PR onaylarını kilitle', is_completed: false },
        { task: 'Deploy sonrası APM hata oranı, Sentry logları ve Kubernetes pod restart metriklerini 30 dakika canlı izle', is_completed: false },
        { task: 'Kritik anomali durumunda otomatik/manuel rollback runbook prosedürünü hazır beklet', is_completed: false }
      ],
      ikon: '💻',
      renk: '#E0F2FE',
      anomali_notu: isFriday
        ? 'DİKKAT: Cuma günü prod deploy yüksek operasyonel risk taşır. Rollback adımları test edilmeden canlıya geçilmemelidir.'
        : 'Migration içeren deploylarda veri tabanı yedeklemesi ve rollback mekanizması zorunludur.',
      sesli_fisilti: isFriday
        ? 'Cuma deploy risk uyarısı eklendi; DB snapshot ve rollback planı hazırlandı.'
        : 'Prod deploy kontrol listesi, DB yedeği ve rollback planı hazırlandı.'
    };
  }

  // 8. YAZILIM MÜHENDİSLİĞİ: Hotfix & SemVer Patch Sürümü
  if (lower.includes('hotfix') || lower.includes('acil yama') || lower.includes('semver') || lower.includes('patch sürümü')) {
    const hotfixDue = new Date(baseDate);
    hotfixDue.setHours(hotfixDue.getHours() + 2);

    return {
      baslik: 'Hotfix & SemVer Sürüm Dağıtımı',
      zaman: 'Acil Yama (SLA: 2 Saat)',
      tarih_iso: hotfixDue.toISOString(),
      hazirlik_zamani: 'Derhal',
      action_items: [
        { task: 'Production crash/hata logunu (Sentry/Datadog) izole et ve lokal ortamda yeniden üret (reproduce)', is_completed: false },
        { task: 'Hedefe yönelik minimal düzeltme kodunu yaz ve birim (unit) testlerini çalıştır', is_completed: false },
        { task: 'Kodu main dalına squash/merge yapıp SemVer PATCH sürüm artırımını (vX.Y.Z) etiketle', is_completed: false },
        { task: 'Düzeltmeyi develop dalına cherry-pick ile senkronize ederek regresyon oluşmasını engelle', is_completed: false }
      ],
      ikon: '💻',
      renk: '#E0F2FE',
      anomali_notu: 'Hotfix ana dala (main) atıldıktan sonra mutlaka develop dalına da cherry-pick edilmeli ve patch sürüm etiketi verilmelidir.',
      sesli_fisilti: 'Acil hotfix SLA sayacı başlatıldı; cherry-pick ve SemVer adımları listelendi.'
    };
  }

  // 9. BİLİŞİM MÜHENDİSLİĞİ & SİBER GÜVENLİK: SIEM, SOC & Müşteri POC Sunumu
  if (
    lower.includes('siem') || lower.includes('siemm') || lower.includes('soc') ||
    ((lower.includes('kurulum') || lower.includes('sunum')) && (lower.includes('müşteri') || lower.includes('sunumu') || lower.includes('artı') || lower.includes('kural')))
  ) {
    return {
      baslik: 'SIEM Kurulumu & Müşteri Sunumu',
      zaman: 'Kurulum & Sunum Takvimi',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Kurulumdan 24 Saat Önce',
      action_items: [
        { task: 'SIEM log kaynaklarının (Syslog, Firewall, Windows Event, EDR) entegrasyonu ve agent kurulumu', is_completed: false },
        { task: 'Kural seti, parsing/normalization ve korelasyon alarmlarının (Use-Case) konfigürasyonu', is_completed: false },
        { task: 'Dashboard, SOC alarm paneli ve log saklama/indeksleme sağlığının doğrulanması', is_completed: false },
        { task: 'Müşteri/Yönetim sunumu için POC raporu, tespit edilen kritik bulgular ve yönetici özeti hazırlığı', is_completed: false },
        { task: 'Müşteriye canlı demo/sunum gerçekleştirilmesi ve UAT kabul tutanağının imzalatılması', is_completed: false }
      ],
      ikon: '🛡️',
      renk: '#E0F2FE',
      anomali_notu: '🛡️ SIEM projelerinde log kaynaklarının sürekliliği ve EPS lisansı kontrol edilmeli, sunum öncesi sahte alarm testi ile korelasyon doğrulanmalıdır.',
      sesli_fisilti: 'SIEM kurulumu, korelasyon kural testi ve müşteri sunum/POC adımları planlandı.'
    };
  }

  // 10. AĞ & SİBER GÜVENLİK: Firewall, FortiGate, Palo Alto, WAF & VPN Kural Testi
  if (lower.includes('firewall') || lower.includes('fortigate') || lower.includes('palo alto') || lower.includes('waf') || lower.includes('güvenlik duvarı')) {
    return {
      baslik: 'Firewall & Ağ Güvenliği Yapılandırması',
      zaman: 'Konfigürasyon Saati',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: '1 Saat Önce',
      action_items: [
        { task: 'Firewall erişim kuralı (ACL/Policy) ve NAT yapılandırmalarının yazımı', is_completed: false },
        { task: 'IPS, SSL-Inspection ve Antivirus güvenlik profillerinin aktif edilmesi', is_completed: false },
        { task: 'Site-to-Site IPsec veya SSL-VPN tünel bağlantı testi ve 2FA doğrulaması', is_completed: false },
        { task: 'Kural çakışma (Shadow Rule) ve canlı trafik geçiş log testlerinin yapılması', is_completed: false }
      ],
      ikon: '🔥',
      renk: '#FEE2E2',
      anomali_notu: 'Yeni firewall kuralı yazılırken Any-Any-Allow kuralı açılmamalı, kural öncesi ve sonrası log akışı doğrulanmalıdır.',
      sesli_fisilti: 'Firewall güvenlik kuralları, VPN ve kural çakışma testleri planlandı.'
    };
  }

  // 11. SİBER GÜVENLİK: IPsec / VPN Tünel Kesintisi & Acil Müdahale
  if (lower.includes('vpn koptu') || lower.includes('ipsec düştü') || lower.includes('vpn kesildi') || lower.includes('tünel koptu') || lower.includes('site to site vpn')) {
    const vpnDue = new Date(baseDate);
    vpnDue.setMinutes(vpnDue.getMinutes() + 15);

    return {
      baslik: 'IPsec / VPN Tünel Müdahalesi',
      zaman: 'Acil Müdahale (SLA: 15 Dk)',
      tarih_iso: vpnDue.toISOString(),
      hazirlik_zamani: 'Derhal',
      action_items: [
        { task: 'Firewall üzerinde IKE Phase 1 ve Phase 2 durum loglarını kontrol et', is_completed: false },
        { task: 'Uzak lokasyon WAN IP ping ve ISP hat erişilebilirliğini doğrula', is_completed: false },
        { task: 'Pre-shared key (PSK), crypto profile ve lifetime süre uyumunu test et', is_completed: false },
        { task: 'Yedek SD-WAN veya mobil APN failover hattının devreye girdiğini teyit et', is_completed: false }
      ],
      ikon: '🛡️',
      renk: '#FEE2E2',
      anomali_notu: 'VPN tünel kesintilerinde önce Faz 1/2 IKE Security Association ve WAN ISP ping durumu kontrol edilir.',
      sesli_fisilti: 'IPsec tünel arızası için 15 dakikalık SLA acil müdahale kartı açıldı.'
    };
  }

  // 12. SİSTEM MÜHENDİSLİĞİ: Active Directory, Domain Controller, GPO & LDAP
  if (lower.includes('active directory') || lower.includes('domain controller') || lower.includes('gpo') || lower.includes('ldap')) {
    return {
      baslik: 'Active Directory & GPO Dağıtımı',
      zaman: 'Bakım Penceresi',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: '2 Saat Önce',
      action_items: [
        { task: 'Domain Controller replikasyon sağlığı ve FSMO rolleri kontrolü', is_completed: false },
        { task: 'Organizational Unit (OU) hiyerarşisi ve kullanıcı/grup yetkilendirmesi', is_completed: false },
        { task: 'GPO parola karmaşıklığı, USB engelleme ve güvenlik kısıtlama dağıtımı', is_completed: false },
        { task: 'İstemci makinelerde gpupdate /force ve RSOP politika uygulama testi', is_completed: false }
      ],
      ikon: '🏢',
      renk: '#E0F2FE',
      anomali_notu: 'GPO dağıtımlarında geniş kapsamlı OU uygulamadan önce test grubunda RSOP simülasyonu yapılmalıdır.',
      sesli_fisilti: 'Active Directory OU yapılandırması ve GPO ilke dağıtım adımları oluşturuldu.'
    };
  }

  // 13. İŞ SÜREKLİLİĞİ & YEDEKLEME: Veeam, Disaster Recovery & SureBackup Testi
  if (lower.includes('veeam') || lower.includes('disaster recovery') || lower.includes('dr tatbikatı') || lower.includes('dr testi') || lower.includes('backup restore')) {
    return {
      baslik: 'Yedekleme & DR Kurtarma Testi',
      zaman: 'Planlanan DR Testi',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Testten 24 Saat Önce',
      action_items: [
        { task: '3-2-1 kuralı kontrolü: 3 kopya, 2 farklı medya, 1 offsite/bulut yedek', is_completed: false },
        { task: 'Veeam snapshot ve incremental yedekleme zinciri bütünlük denetimi', is_completed: false },
        { task: 'İzole laboratuvar ortamında (SureBackup/Sandbox) geri yükleme (Restore) testi', is_completed: false },
        { task: 'RPO ve RTO sürelerinin hedeflenen SLA sınırlarında kaldığının raporlanması', is_completed: false }
      ],
      ikon: '💾',
      renk: '#DCFCE7',
      anomali_notu: 'Geri yüklenmeyen (Restore testi yapılmamış) yedek alınmış sayılmaz. Yılda en az 2 kez DR tatbikatı yapılmalıdır.',
      sesli_fisilti: '3-2-1 yedekleme kuralı, sandbox geri yükleme ve DR tatbikat adımları planlandı.'
    };
  }

  // 14. BULUT & KONTEYNER: Kubernetes, Docker, Helm & Mikroservis Dağıtımı
  if (lower.includes('kubernetes') || lower.includes('k8s') || lower.includes('docker') || lower.includes('microservice') || lower.includes('openshift')) {
    return {
      baslik: 'Kubernetes & Bulut Dağıtımı',
      zaman: 'Dağıtım Saati',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: '1 Saat Önce',
      action_items: [
        { task: 'K8s manifest/Helm chart konfigürasyonu ve ConfigMap/Secret denetimi', is_completed: false },
        { task: 'Ingress controller, TLS sertifikası ve DNS yönlendirme ayarları', is_completed: false },
        { task: 'Pod Resource Limit (CPU/Memory) ve HPA otomatik ölçekleme testi', is_completed: false },
        { task: 'Rolling update sıfır kesinti pod geçişi ve liveness/readiness probe kontrolü', is_completed: false }
      ],
      ikon: '☁️',
      renk: '#E0F2FE',
      anomali_notu: 'Resource limits tanımlanmamış podlar node üzerindeki diğer servislerin çökmesine yol açabilir.',
      sesli_fisilti: 'Kubernetes küme dağıtımı, kaynak limitleri ve healthcheck kontrolleri hazırlandı.'
    };
  }

  // 15. SİBER GÜVENLİK & DENETİM: Pentest, Zafiyet Tarama & Sızma Testi
  if (lower.includes('pentest') || lower.includes('sızma testi') || lower.includes('zafiyet') || lower.includes('vulnerability')) {
    return {
      baslik: 'Sızma Testi & Zafiyet Raporu',
      zaman: 'Test Başlangıcı',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Testten 24 Saat Önce',
      action_items: [
        { task: 'Kapsam belirleme, RoE (Rules of Engagement) ve yasal izin formunun imzalanması', is_completed: false },
        { task: 'Dış/İç ağ zafiyet taraması (Vulnerability Scan) ve servis port keşfi', is_completed: false },
        { task: 'OWASP Top 10 web/API güvenlik zafiyetlerinin manuel istismar ve kanıt toplama süreci', is_completed: false },
        { task: 'Kritik/Yüksek seviye bulguların remediation (çözüm) önerileriyle yönetici raporuna dönüştürülmesi', is_completed: false }
      ],
      ikon: '🎯',
      renk: '#FEE2E2',
      anomali_notu: 'Pentest testleri öncesinde sistem yedekleri alınmalı ve test saatleri operasyon ekiplerine bildirilmelidir.',
      sesli_fisilti: 'Pentest kapsam analizi, zafiyet taraması ve raporlama adımları oluşturuldu.'
    };
  }

  // 16. AĞ GÜVENLİĞİ: SSL / TLS Sertifika Yenileme
  if (lower.includes('ssl') || lower.includes('tls') || lower.includes('sertifika yenileme')) {
    const sslDue = new Date(baseDate);
    sslDue.setDate(sslDue.getDate() + 7);

    return {
      baslik: 'SSL / TLS Sertifika Yenileme',
      zaman: 'Süre Bitimine 7 Gün Kala',
      tarih_iso: sslDue.toISOString(),
      hazirlik_zamani: '7 Gün Önce',
      action_items: [
        { task: '2048-bit RSA veya ECC private key ile yeni CSR üret', is_completed: false },
        { task: 'DNS TXT veya HTTP-01 doğrulama kaydını tamamla', is_completed: false },
        { task: 'Nginx, Apache veya IIS web sunucu binding konfigürasyonunu güncelle', is_completed: false },
        { task: 'HSTS başlıkları ve SSL Labs testinde A+ güvenlik derecesini doğrula', is_completed: false }
      ],
      ikon: '🔒',
      renk: '#FEF3C7',
      anomali_notu: 'SSL sertifikası süresi dolduğunda tarayıcılar siteye erişimi "Güvenli Değil" uyarısıyla tamamen engeller.',
      sesli_fisilti: 'SSL sertifika yenileme ve web sunucu binding takvimi oluşturuldu.'
    };
  }

  // 17. HARİTA & JEOTEKNİK MÜHENDİSLİĞİ: Zemin Etüdü & SPT Sondajı
  if (lower.includes('zemin etüdü') || lower.includes('zemin etudu') || lower.includes('sondaj') || lower.includes('spt')) {
    return {
      baslik: 'Zemin Etüdü & SPT Sondaj Takibi',
      zaman: 'Sondaj Günü 09:00',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'T-24 Saat (Yeraltı Altyapı Taraması)',
      action_items: [
        { task: 'Sondaj yapılacak parselde İSKİ, İGDAŞ ve Telekom altyapı çakışma taramasını tamamla', is_completed: false },
        { task: 'Her 1.5 metrede bir Standart Penetrasyon Testi (SPT) darbe sayılarını (N30) log defterine kaydet', is_completed: false },
        { task: 'Yeraltı su seviyesi (YASS) derinliğini ve karot numune tüplerini etiketleyip laboratuvara sevk et', is_completed: false },
        { task: 'Zemin mekaniği laboratuvar deney sonuçlarıyla (Atterberg, elek, üç eksenli) jeoteknik raporu hazırla', is_completed: false }
      ],
      ikon: '📐',
      renk: '#FEF08A',
      anomali_notu: 'TBDY 2018 uyarınca zemin sınıfı, sıvılaşma riski ve yeraltı su seviyesi jeoteknik raporda netleşmeden temel statik projesi onaylanamaz.',
      sesli_fisilti: 'Zemin sondajı, SPT darbe logları ve altyapı güvenlik adımları planlandı.'
    };
  }

  // 18. HARİTA MÜHENDİSLİĞİ: Aplikasyon, Nivo & Deformasyon Takibi
  if (lower.includes('aplikasyon') || lower.includes('nivo') || lower.includes('total station') || lower.includes('poligon') || lower.includes('deformasyon')) {
    return {
      baslik: 'Aplikasyon & Nivo Ölçüm Föyü',
      zaman: 'Saha Ölçüm Saati',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Ölçümden 1 Saat Önce',
      action_items: [
        { task: 'Kadastral poligon ve nirengi noktalarının koordinat doğrulamasını yap', is_completed: false },
        { task: 'Total station ile bina köşe kazıklarının yerinde aplikasyonunu gerçekleştir', is_completed: false },
        { task: 'Hassas nivo ile temel altı ve su basman kotlarını ölçüp nivelman defterine işle', is_completed: false },
        { task: 'Derin kazı iksa ve komşu parsellerde deformasyon/oturma prizmalarını oku', is_completed: false }
      ],
      ikon: '📐',
      renk: '#FEF08A',
      anomali_notu: 'Aplikasyon hataları telafisi imkansız parsel aşımı (tecavüz) davalarına yol açar; ölçüm 2 farklı poligon noktasından doğrulanmalıdır.',
      sesli_fisilti: 'Aplikasyon, nivelman kot okuması ve iksa deformasyon kontrolü hazırlandı.'
    };
  }

  // 19. BİYOMEDİKAL MÜHENDİSLİĞİ: Tıbbi Cihaz Kalibrasyonu & IEC 62353
  if (lower.includes('biyomedikal') || lower.includes('tıbbi cihaz') || lower.includes('tibbi cihaz') || lower.includes('kalibrasyon') || lower.includes('iec 62353')) {
    return {
      baslik: 'Biyomedikal Cihaz Kalibrasyonu & İSG',
      zaman: 'Yıllık Periyodik Kalibrasyon',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Testten 2 Saat Önce',
      action_items: [
        { task: 'IEC 62353 standardına göre kaçak akım ve gövde topraklama süreklilik testini analizörle ölç', is_completed: false },
        { task: 'Ventilatör, defibrilatör veya anestezi cihazının basınç, debi ve enerji çıkış hassasiyetini kalibre et', is_completed: false },
        { task: 'Kalibrasyon yeşil onay etiketini cihazın görünür yerine yapıştır ve sonraki test tarihini işle', is_completed: false },
        { task: 'Klinik Mühendislik HBYS sistemine kalibrasyon sertifikasını yükleyip servise teslim imzasını al', is_completed: false }
      ],
      ikon: '🔬',
      renk: '#CCFBF1',
      anomali_notu: 'Hastanelerde kritik yaşam destek cihazları IEC 62353 elektriksel güvenlik ve metrolojik kalibrasyon sertifikası olmadan hasta başında kullanılamaz.',
      sesli_fisilti: 'Biyomedikal elektriksel güvenlik ve metroloji kalibrasyon föyü oluşturuldu.'
    };
  }

  // 20. ENDÜSTRİ & KALİTE MÜHENDİSLİĞİ: 5S Saha Denetimi, Kırmızı Etiket & Kaizen
  if (lower.includes('5s') || lower.includes('kaizen') || lower.includes('balık kılçığı') || lower.includes('spc') || lower.includes('fmea')) {
    return {
      baslik: '5S Saha Denetimi & Kaizen Rutini',
      zaman: 'Haftalık Saha Denetimi',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Denetimden 1 Gün Önce',
      action_items: [
        { task: 'Üretim hattında kırmızı etiket (red-tag) uygulaması ile gereksiz malzeme ve aletleri ayıkla', is_completed: false },
        { task: 'Alet panoları, zemin çizgileri ve malzeme stok alanlarının gölge pano standartlarına uygunluğunu denetle', is_completed: false },
        { task: 'Haftalık 5S puanlama skorunu hesapla ve operatörlerle birlikte Kaizen iyileştirme panosuna as', is_completed: false },
        { task: 'Kritik sapmalar için Balık Kılçığı (İshikawa) veya 5 Neden analiziyle kök neden aksiyon planı aç', is_completed: false }
      ],
      ikon: '📊',
      renk: '#DCFCE7',
      anomali_notu: 'Yalın üretimde 5S (Ayıkla, Düzenle, Temizle, Standartlaştır, Sürdür) panoları ve Kaizen aksiyonları periyodik denetimle canlı tutulur.',
      sesli_fisilti: '5S saha denetimi, kırmızı etiket ve Kaizen aksiyon panosu oluşturuldu.'
    };
  }

  // GENEL MÜHENDİSLİK FALLBACK
  return {
    baslik: 'Mühendislik & Teknik Operasyon',
    zaman: 'Mesai İçi / Planlanan Saat',
    tarih_iso: baseDate.toISOString(),
    hazirlik_zamani: 'İşlemden 1 Saat Önce',
    action_items: [
      { task: 'Teknik şartname, proje çizimleri ve emniyet talimatlarını gözden geçir', is_completed: false },
      { task: 'İş güvenliği (İSG) kişisel koruyucu donanım (KKD) eksiksizliğini denetle', is_completed: false },
      { task: 'İşlem bitiminde test/ölçüm değerlerini teknik kabul tutanağına kaydet', is_completed: false }
    ],
    ikon: '⚙️',
    renk: '#E0F2FE',
    anomali_notu: 'Mühendislik işlemlerinde saha emniyet kuralları ve standart tolerans değerlerine tam uyum esastır.',
    sesli_fisilti: 'Mühendislik operasyon ve teknik kontrol adımları kaydedildi.'
  };
}

// ============================================================================
// DENİZCİLİK & GEMİ İDARESİ MOTORU (MARITIME & NAUTICAL SUITE)
// Kaptan, Güverte Zabiti, Çarkçıbaşı (Başmühendis) & Gemi Acentesi
// ============================================================================
export function parseMaritimeNauticalNote(input: string, baseDate: Date, userDomain?: string): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  // 1. Doğrudan kısa senaryo veritabanı eşleşmesi kontrolü
  const shortMatch = matchShortScenario(input, userDomain || 'DENIZCILIK');
  if (shortMatch && (shortMatch.domain === 'DENIZCILIK' || shortMatch.id.startsWith('denizcilik_'))) {
    return {
      baslik: shortMatch.baslik,
      zaman: shortMatch.varsayilanZaman,
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: shortMatch.hazirlikZamani,
      action_items: shortMatch.oncedenYapilacaklar.map((task) => ({ task, is_completed: false })),
      ikon: shortMatch.ikon,
      renk: shortMatch.renk,
      anomali_notu: shortMatch.akilliFisilti,
      sesli_fisilti: shortMatch.akilliFisilti.replace(/^[^\s]+\s+/, '')
    };
  }

  // Denizcilik anahtar kelimeleri filtresi
  const isMaritime =
    lower.includes('psc') || lower.includes('paris mou') || lower.includes('med mou') || lower.includes('tokyo mou') || lower.includes('liman devleti') ||
    lower.includes('draft survey') || lower.includes('draft okuma') || lower.includes('draft hesabı') || lower.includes('densimetre') || lower.includes('hidrometre') ||
    lower.includes('balast') || lower.includes('ballast') || lower.includes('bwm') || lower.includes('bwts') ||
    lower.includes('sintine') || lower.includes('ows') || lower.includes('15 ppm') || lower.includes('yağ jurnali') || lower.includes('oil record book') || lower.includes('orb') || lower.includes('sludge') ||
    lower.includes('passage plan') || lower.includes('sefer planı') || lower.includes('sefer plani') || lower.includes('köprüüstü') || lower.includes('kopruustu') || lower.includes('dümen testi') || lower.includes('dumen testi') || lower.includes('ecdis') ||
    lower.includes('pilot çarmıh') || lower.includes('pilot carmih') || lower.includes('pilot ladder') || lower.includes('kılavuz kaptan') || lower.includes('kilavuz kaptan') || lower.includes('mpx') || lower.includes('pilot card') ||
    lower.includes('bunkering') || lower.includes('bunker') || lower.includes('yakıt ikmali') || lower.includes('yakit ikmali') || lower.includes('scupper') || lower.includes('frengi') || lower.includes('bdn') ||
    lower.includes('filika tatbikat') || lower.includes('boat drill') || lower.includes('terk-i sefine') || lower.includes('terki sefine') || lower.includes('abandon ship') || lower.includes('solas') ||
    lower.includes('kapalı mahal') || lower.includes('kapali mahal') || lower.includes('enclosed space') || lower.includes('sıcak çalışma') || lower.includes('sicak calisma') || lower.includes('hot work') ||
    lower.includes('demirleme') || lower.includes('demir at') || lower.includes('anchor watch') || lower.includes('kaloma') || lower.includes('demir tarama') || lower.includes('demir mevkii') ||
    lower.includes('isps') || lower.includes('gangway') || lower.includes('borda iskelesi') || lower.includes('ziyaretçi defteri') || lower.includes('ziyaretci defteri') || lower.includes('security level') ||
    lower.includes('free pratique') || lower.includes('deniz sağlık beyanı') || lower.includes('sağlık bildirimi') || lower.includes('gemi acente') || lower.includes('crew list') || lower.includes('ordino') || lower.includes('port clearance') ||
    lower.includes('colreg') || lower.includes('çatışmayı önleme') || lower.includes('catismayi onleme') || lower.includes('vardiya zabiti') || lower.includes('cpa') || lower.includes('tcpa') ||
    lower.includes('çarkçıbaşı') || lower.includes('carkcibasi') || lower.includes('başmühendis') || lower.includes('basmuhendis') || lower.includes('makine dairesi') || lower.includes('karter patlama') || lower.includes('scavenge') ||
    lower.includes('sea protest') || lower.includes('deniz raporu') || lower.includes('müşterek avarya') || lower.includes('musterek avarya') || lower.includes('general average') || lower.includes('p&i') ||
    lower.includes('gemi') || lower.includes('kaptan') || lower.includes('denizcilik') || userDomain === 'DENIZCILIK';

  if (!isMaritime) return null;

  // 1. PSC LİMAN DEVLETİ DENETİMİ & PARIS MOU
  if (lower.includes('psc') || lower.includes('paris mou') || lower.includes('med mou') || lower.includes('tokyo mou') || lower.includes('liman devleti')) {
    return {
      baslik: 'PSC Liman Devleti Denetimi & Paris MoU',
      zaman: 'Varışta / Müfettiş Gelişinde',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Liman Öncesi 24 Saat (Gemi İçi Ön Denetim)',
      action_items: [
        { task: 'Can filikaları indirme donanımı, acil dümen geçişi ve filika motorunu test et', is_completed: false },
        { task: '15 PPM sintine separatörü (OWS) 3 yollu vana alarm ve otomatik durdurma testini yap', is_completed: false },
        { task: 'Yağ Kayıt Jurnali (ORB Part I) ve Çöp Kayıt Jurnalini Başmühendis/Kaptan imzalı hazırla', is_completed: false },
        { task: 'Yangın damperleri, manyetik pusula deviasyon kartı ve acil yangın pompasını dene', is_completed: false },
        { task: 'Mürettebat STCW ehliyetleri, MLC 2006 sözleşmeleri ve klas sertifikalarını masaya aç', is_completed: false }
      ],
      ikon: '⚓',
      renk: '#CFFAFE',
      anomali_notu: 'Paris MoU denetimlerinde filika indirme, yangın tatbikatı ve 15 PPM OWS arızası doğrudan detention (geminin tutulması) nedenidir.',
      sesli_fisilti: 'PSC Paris MoU denetimi için filika, OWS ve SOLAS emniyet çeklisti oluşturuldu.'
    };
  }

  // 2. DRAFT SURVEY & YÜKLEME / TAHLİYE BALANS HESABI
  if (lower.includes('draft survey') || lower.includes('draft okuma') || lower.includes('draft hesabı') || lower.includes('densimetre') || lower.includes('hidrometre')) {
    return {
      baslik: 'Draft Survey & Yükleme Balans Hesabı',
      zaman: 'Yükleme Öncesi / Bitiminde',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Ölçümden 1 Saat Önce',
      action_items: [
        { task: 'Baş, kıç ve vasat (Forward, Aft, Midship) sancak/iskele draft değerlerini oku', is_completed: false },
        { task: 'Borda iskelesinden numune alarak kalibre densimetre ile deniz suyu yoğunluğunu (SG) ölç', is_completed: false },
        { task: 'Tüm balast, tatlı su, yakıt (FO/DO) ve sintine tanklarının iskandillerini (sounding) al', is_completed: false },
        { task: 'Hogging/sagging omurga sehimi düzeltmesini uygulayarak net deplasman ve yükü hesapla', is_completed: false },
        { task: 'Yükleyici/tahliye sörveyörü ile müşterek Draft Survey Raporunu karşılıklı imzala', is_completed: false }
      ],
      ikon: '🚢',
      renk: '#E0F2FE',
      anomali_notu: 'Draft survey hesaplarında deniz suyu yoğunluğu (SG) densimetre ile yerinde ölçülmeden yapılan hesap binlerce tonluk navlun ihtilafına sebep olur.',
      sesli_fisilti: 'Draft survey okuma, densimetre ve iskandil yük balans protokolü hazırlandı.'
    };
  }

  // 3. BALAST SUYU YÖNETİMİ & BWM D-2 STANDARDI
  if (lower.includes('balast') || lower.includes('ballast') || lower.includes('bwm') || lower.includes('bwts')) {
    return {
      baslik: 'Balast Suyu Yönetimi & BWM Jurnali',
      zaman: 'Balast Operasyon Saati',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Operasyon Öncesi (D-2 Standart Testi)',
      action_items: [
        { task: 'BWM D-2 arıtma sistemi (BWTS) UV lambaları ve filtre basınç farkını operasyon öncesi test et', is_completed: false },
        { task: 'Açık deniz balast değişimini (Ballast Exchange) kıyıdan en az 200 mil ve 200 metre derinlikte yap', is_completed: false },
        { task: 'Balast Kayıt Jurnaline (BWRB) başlangıç/bitiş koordinatları ve metreküp hacmini işle', is_completed: false },
        { task: 'Pompa emiş ve basma basınçlarını sürekli izleyerek tank taşması veya havalık tıkanıklığını engelle', is_completed: false },
        { task: 'Liman otoritesine ve PSC müfettişine ibraz edilmek üzere güncel Balast Su Bildirim Formunu hazırla', is_completed: false }
      ],
      ikon: '🌊',
      renk: '#CFFAFE',
      anomali_notu: 'IMO BWM Sözleşmesi uyarınca açık denizde derin su balast değişimi en az 200 deniz mili açıkta ve 200 metre derinlikte icra edilmelidir.',
      sesli_fisilti: 'BWM D-2 standart testi ve balast kayıt jurnali operasyon kartı oluşturuldu.'
    };
  }

  // 4. OWS 15 PPM SİNTİNE & YAĞ KAYIT JURNALİ (ORB PART I / SLUDGE)
  if (lower.includes('ows') || lower.includes('sintine') || lower.includes('15 ppm') || lower.includes('yağ jurnali') || lower.includes('oil record book') || lower.includes('orb') || lower.includes('sludge')) {
    return {
      baslik: 'OWS 15 PPM & Yağ Jurnali (ORB Part I)',
      zaman: 'Açık Deniz Seyrinde',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'T-30 Dk (Sintine Seviye & Kalibrasyon)',
      action_items: [
        { task: '15 PPM sintine alarm ünitesi (OCM) temiz su sıfırlamasını ve 3 yollu vana testini tamamla', is_completed: false },
        { task: 'Geminin özel alan dışında (Outside Special Area), seyir halinde ve hızının en az 4 knot olduğunu teyit et', is_completed: false },
        { task: 'Yağ Kayıt Jurnali Part I içine Code D (Sintine) veya Code C (Sludge) kayıtlarını hatasız işle', is_completed: false },
        { task: 'İşlem bitiminde separatör sintine basma valfini kapatıp asma kilitle emniyete al ve sayacı kaydet', is_completed: false },
        { task: 'Her sayfa bitiminde jurnali Başmühendis ve Gemi Kaptanına ıslak imzayla onaylat', is_completed: false }
      ],
      ikon: '⚓',
      renk: '#E2E8F0',
      anomali_notu: 'MARPOL Annex I uyarınca özel alanlarda (Akdeniz, Karadeniz) ve 15 PPM üzeri sintine basılması uluslararası çevre suçudur ve gemiye el konulma nedenidir.',
      sesli_fisilti: '15 PPM OWS sensör doğrulaması ve Yağ Kayıt Jurnali (ORB) kayıt protokolü açıldı.'
    };
  }

  // 5. PASSAGE PLAN (SEFER PLANI) & KALKIŞ KÖPRÜÜSTÜ ÇEKLİSTİ
  if (lower.includes('passage plan') || lower.includes('sefer planı') || lower.includes('sefer plani') || lower.includes('dümen testi') || lower.includes('dumen testi') || lower.includes('ecdis')) {
    return {
      baslik: 'Passage Plan & Kalkış Seyir Çeklisti',
      zaman: 'Kalkıştan 2 Saat Önce',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'T-2 Saat (Köprüüstü Kontrolü)',
      action_items: [
        { task: 'Berthing to Berthing (Rıhtımdan rıhtıma) ECDIS rota planını ve Squat paylarını onayla', is_completed: false },
        { task: 'SOLAS kuralı: Dümen motorları (Steering Gear) ana/acil durum geçişini ve müşirini test et', is_completed: false },
        { task: 'Manyetik pusula ve Gyro pusula repeater eşitlemesini yap; seyir fenerleri ve sis düdüğünü dene', is_completed: false },
        { task: 'VHF, GMDSS Navtex, EPIRB ve SART cihazlarının batarya ve alıcı testlerini gerçekleştir', is_completed: false },
        { task: 'Liman kontrol (VTS) ile irtibata geçerek kalkış izni ve römorkör koordinasyonunu sağla', is_completed: false }
      ],
      ikon: '🧭',
      renk: '#E0F2FE',
      anomali_notu: 'SOLAS Chapter V uyarınca kalkıştan en geç 12 saat önce acil durum dümen donanımı ve telsiz teçhizatı bizzat test edilmelidir.',
      sesli_fisilti: 'SOLAS 12 saatlik acil dümen testi ve ECDIS passage plan çeklisti hazırlandı.'
    };
  }

  // 6. KILAVUZ KAPTAN (PİLOT) & PİLOT ÇARMIHI (MPX - PILOT CARD)
  if (lower.includes('pilot çarmıh') || lower.includes('pilot carmih') || lower.includes('pilot ladder') || lower.includes('kılavuz kaptan') || lower.includes('kilavuz kaptan') || lower.includes('mpx') || lower.includes('pilot card')) {
    return {
      baslik: 'Kılavuz Kaptan (Pilot) & Çarmıh Emniyeti',
      zaman: 'Pilot İstasyonuna Varışta',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Varıştan 45 Dk Önce (Çarmıh Donatma)',
      action_items: [
        { task: 'Pilot çarmıhını SOLAS ve IMPA kurallarına göre su seviyesinden 1.5 - 2m yükseklikte donat', is_completed: false },
        { task: 'Çarmıh başında ışıklı ve kendinden duman kandilli can simidi, heman halatları ve zabit bulundur', is_completed: false },
        { task: 'Gemi draft, boy, makine gücü ve manevra özelliklerini içeren Pilot Card föyünü hazırla', is_completed: false },
        { task: 'Köprüüstünde Kaptan-Pilot Bilgi Değişimi (MPX) formunu doldur ve rota/akıntı brifingini al', is_completed: false },
        { task: 'VHF Kanal 16 ve yerel sektör kanalından VTS/Pilot botu ile sürekli telsiz temasını sürdür', is_completed: false }
      ],
      ikon: '🧑‍✈️',
      renk: '#FEF3C7',
      anomali_notu: 'SOLAS Reg V/23 ve IMPA standardına aykırı bağlanan çarmıhlar kılavuz kaptanın gemiye çıkışını reddetmesine ve boğaz sıra kaybına yol açar.',
      sesli_fisilti: 'Pilot çarmıhı IMPA donatımı, Pilot Card ve MPX brifing kartı hazırlandı.'
    };
  }

  // 7. BUNKERING (YAKIT İKMALİ) & MARPOL BDN
  if (lower.includes('bunkering') || lower.includes('bunker') || lower.includes('yakıt ikmali') || lower.includes('yakit ikmali') || lower.includes('scupper') || lower.includes('frengi') || lower.includes('bdn')) {
    return {
      baslik: 'Bunkering Yakıt İkmali & MARPOL BDN',
      zaman: 'Bunker Barç Yanaşmasında',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'T-1 Saat (Scupper & İSG Kontrolü)',
      action_items: [
        { task: 'Gemi ve barç arasında Ship-Shore Safety Checklist (SSSCL) formunu müştereken imzala', is_completed: false },
        { task: 'Güverte frengi deliklerini (scupper) mekanik tapalarla kapat ve taşma tavasını denetle', is_completed: false },
        { task: 'Manifold flanş civatalarını tam sıkıp topraklama kablosunu bağla; acil stop butonunu test et', is_completed: false },
        { task: 'Manifold damlama vanasından sürekli akışla mühürlü MARPOL şahit yakıt numunesi (Drip Sample) al', is_completed: false },
        { task: 'BDN teslim notu üzerindeki kükürt oranını (%0.50 VLSFO veya %0.10 ULSFO) ve yoğunluğu teyit et', is_completed: false }
      ],
      ikon: '⛽',
      renk: '#FED7AA',
      anomali_notu: 'Yakıt ikmalinde güvertedeki tüm frengi delikleri mekanik tapalarla tıkanmalı, taşma tepsilerinde yangın söndürücüler hazır tutulmalıdır.',
      sesli_fisilti: 'Bunkering scupper tapalama, drip sample ve MARPOL BDN emniyet föyü oluşturuldu.'
    };
  }

  // 8. SOLAS CAN KURTARMA & TERK-İ SEFİNE / YANGIN TATBİKATI
  if (lower.includes('filika tatbikat') || lower.includes('boat drill') || lower.includes('terk-i sefine') || lower.includes('terki sefine') || lower.includes('abandon ship') || lower.includes('solas')) {
    return {
      baslik: 'SOLAS Terk-i Sefine & Yangın Tatbikatı',
      zaman: 'Aylık Zorunlu Emniyet Saati',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Tatbikattan 30 Dk Önce',
      action_items: [
        { task: 'Genel alarmı (7 kısa 1 uzun düdük) çal ve toplanma mahallinde (Muster Station) yoklama al', is_completed: false },
        { task: 'Can filikası indirme mekanizmasını çalıştır, filikayı su seviyesine indir ve motoru test et', is_completed: false },
        { task: 'Yangın timi solunum cihazlarını (SCBA/BA set) ve acil yangın pompasını iki koldan basınçla dene', is_completed: false },
        { task: 'Denize adam düştü (MOB) can simidi, duman kandili ve kurtarma botu (Rescue Boat) simülasyonunu yap', is_completed: false },
        { task: 'Tatbikat başlangıç, bitiş saatlerini ve tespit edilen eksiklikleri Gemi Seyir Jurnaline kaydet', is_completed: false }
      ],
      ikon: '🛟',
      renk: '#FEE2E2',
      anomali_notu: 'SOLAS Chapter III uyarınca mürettebatın en az %25’i değiştiğinde liman kalkışını takip eden 24 saat içinde terk-i sefine ve yangın tatbikatı zorunludur.',
      sesli_fisilti: 'SOLAS genel acil alarm, filika indirme ve yangın timi tatbikat föyü açıldı.'
    };
  }

  // 9. KAPALI MAHAL GİRİŞİ & SICAK ÇALIŞMA (ENCLOSED SPACE & HOT WORK)
  if (lower.includes('kapalı mahal') || lower.includes('kapali mahal') || lower.includes('enclosed space') || lower.includes('sıcak çalışma') || lower.includes('sicak calisma') || lower.includes('hot work')) {
    return {
      baslik: 'Kapalı Mahal Girişi & Sıcak Çalışma İzni',
      zaman: 'Giriş Öncesi (İSG İzni)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'T-2 Saat (Cebri Havalandırma)',
      action_items: [
        { task: 'Mahalli en az 24 saat cebri mekanik fanlarla havalandır ve boru devrelerini kör flanşla izole et', is_completed: false },
        { task: 'Kalibre 4 gaz dedektörü ile dip, orta ve üstten Oksijen (%20.9), LEL (%0), H2S (0 ppm) ölçümü yap', is_completed: false },
        { task: 'Kapalı Mahal Giriş İznini (Enclosed Space Entry Permit) Başmühendis ve Kaptana onaylat', is_completed: false },
        { task: 'Giriş kapısında can halatı, acil kaçış seti (EEBD) ve telsizli nöbetçi personel konuşlandır', is_completed: false },
        { task: 'Sıcak çalışma varsa 10 metre çapındaki yanıcı malzemeleri uzaklaştır ve yangın devresini basınçlandır', is_completed: false }
      ],
      ikon: '🦺',
      renk: '#FEE2E2',
      anomali_notu: 'Kapalı mahallerde (tank, zincirlik, double bottom) oksijen %20.9 ve patlayıcı gaz %0 LEL seviyesine gelmeden içeriye tek bir adım dahi atılamaz.',
      sesli_fisilti: 'Kapalı mahal 4 gaz ölçümü ve Enclosed Space çalışma izni protokolü hazırlandı.'
    };
  }

  // 10. DEMİRLEME & DEMİR NÖBETİ (ANCHOR WATCH & KALOMA)
  if (lower.includes('demirleme') || lower.includes('demir at') || lower.includes('anchor watch') || lower.includes('kaloma') || lower.includes('demir tarama') || lower.includes('demir mevkii')) {
    return {
      baslik: 'Demirleme & Demir Nöbeti (Anchor Watch)',
      zaman: 'Demir Mevkiine Varışta',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'T-30 Dk (Irgat & Başüstü Hazırlığı)',
      action_items: [
        { task: 'Başüstü ırgat hidrolik/elektrik gücünü devreye al, feneri aç ve loça kapağını sök', is_completed: false },
        { task: 'Derinliğin en az 5-7 katı kadar zincir kalomasını su derinliği ve hava şartlarına göre fundala', is_completed: false },
        { task: 'Irgat frenini sıkıp bosa donanımını bağla ve demirin tuttuğunu (bitter end) teyit et', is_completed: false },
        { task: 'ECDIS ve radarda çapa alarmını (Anchor Watch Guard Zone) kur; sahil fenerlerinden transit kerteriz al', is_completed: false },
        { task: 'VHF Kanal 16 ve yerel VTS kanalından demir atılan mevkiyi ve demirleme saatini raporla', is_completed: false }
      ],
      ikon: '⚓',
      renk: '#CFFAFE',
      anomali_notu: 'Demir taraması ani karaya oturma riskidir; radar guard zone ve GPS anchor watch alarmı köprüüstünde sürekli aktif tutulmalıdır.',
      sesli_fisilti: 'Demirleme kaloma hesabı, bosa kilitleme ve ECDIS guard zone nöbeti kuruldu.'
    };
  }

  // 11. ISPS GEMİ GÜVENLİĞİ & GANGWAY (BORDA İSKELESİ) NÖBETİ
  if (lower.includes('isps') || lower.includes('gangway') || lower.includes('borda iskelesi') || lower.includes('ziyaretçi defteri') || lower.includes('ziyaretci defteri') || lower.includes('security level')) {
    return {
      baslik: 'ISPS Gemi Güvenliği & Gangway Nöbeti',
      zaman: 'Liman Boyunca (7/24 Nöbet)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Rıhtıma Yanaşmada',
      action_items: [
        { task: 'Borda iskelesi altına can kurtarma güvenlik ağını (Safety Net) usulüne uygun ger', is_completed: false },
        { task: 'Gangway kulübesinde kimlik kontrol föyü, ziyaretçi defteri ve metal el dedektörünü hazırla', is_completed: false },
        { task: 'Geminin aktif ISPS Seviyesine (Level 1/2/3) uygun borda aydınlatması ve kilitleri denetle', is_completed: false },
        { task: 'Gemi Güvenlik Zabiti (SSO) ile Liman Zabiti (PFSO) arasında Güvenlik Deklarasyonu (DoS) imzala', is_completed: false },
        { task: 'Kaçak yolcu (Stowaway) aramasını kalkış öncesi ambarlar, makine dairesi ve filikalarda yap', is_completed: false }
      ],
      ikon: '🛡️',
      renk: '#E0E7FF',
      anomali_notu: 'ISPS Kodu gereği borda iskelesinde (Gangway) kimlik kontrolü yapılmadan ve ziyaretçi kartı verilmeden hiç kimse gemiye kabul edilemez.',
      sesli_fisilti: 'ISPS gangway nöbeti, safety net ve ziyaretçi kayıt protokolü hazırlandı.'
    };
  }

  // 12. LİMAN GİRİŞ-ÇIKIŞ, FREE PRATIQUE & GEMİ ACENTE EVRAKI
  if (lower.includes('free pratique') || lower.includes('deniz sağlık beyanı') || lower.includes('sağlık bildirimi') || lower.includes('gemi acente') || lower.includes('crew list') || lower.includes('ordino') || lower.includes('port clearance')) {
    return {
      baslik: 'Liman Giriş-Çıkış & Free Pratique Evrakı',
      zaman: 'Varış / Kalkış Saati',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Varıştan 24 Saat Önce (ETA Bildirimi)',
      action_items: [
        { task: 'Sağlık Merkezine Deniz Sağlık Bildirimini (Maritime Declaration of Health) ve aşı listesini ilet', is_completed: false },
        { task: 'Mürettebat Listesi (Crew List) ve Son 10 Liman Listesini kaşe-imzalı hazırla', is_completed: false },
        { task: 'Gümrük için Gemi Mağazası (Ship Stores - alkol/tütün kilit altına alma) ve Personel Beyanını düzenle', is_completed: false },
        { task: 'Liman Başkanlığına varış öncesi ISPS Pre-Arrival Formunu acente kanalıyla ulaştır', is_completed: false },
        { task: 'Tüm kontroller bitiminde Yola Elverişlilik Belgesini (Port Clearance) teslim al', is_completed: false }
      ],
      ikon: '📑',
      renk: '#F1F5F9',
      anomali_notu: 'Gemiye sarı karantina sancağı (Q Flag) çekilip Free Pratique onayı alınmadan rıhtımdan kimse gemiye çıkamaz, temas kurulamaz.',
      sesli_fisilti: 'Free pratique sağlık bildirimi, crew list ve port clearance evrak föyü açıldı.'
    };
  }

  // 13. COLREG & SEYİR VARDİYASI (CPA / TCPA & GÖZCÜLÜK)
  if (lower.includes('colreg') || lower.includes('çatışmayı önleme') || lower.includes('catismayi onleme') || lower.includes('vardiya zabiti') || lower.includes('cpa') || lower.includes('tcpa')) {
    return {
      baslik: 'COLREG Seyir Vardiyası & Çatışmayı Önleme',
      zaman: 'Seyir Vardiyası Boyunca (4 Saat)',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Vardiya Tesliminden 15 Dk Önce',
      action_items: [
        { task: 'STCW uyarınca köprüüstünde kesintisiz gözcülük (lookout) ve gece karanlık uyumunu sağla', is_completed: false },
        { task: 'ARPA radar ile yaklaşan hedeflerin CPA (en az 1.5 - 2 NM) ve TCPA marjlarını sürekli izle', is_completed: false },
        { task: 'COLREG Kural 8 uyarınca yol verme manevralarını erken, belirgin ve tereddütsüz yap', is_completed: false },
        { task: 'Kısıtlı görüş şartlarında (sis/yağmur) sesli sis işaretlerini başlat ve AIS durumunu güncelle', is_completed: false },
        { task: 'Vardiya bitiminde gemi rotası, sürati, rüzgar ve barometre değerlerini Seyir Jurnaline işle', is_completed: false }
      ],
      ikon: '🧭',
      renk: '#CFFAFE',
      anomali_notu: 'STCW Bölüm VIII uyarınca vardiya zabiti köprüüstü gözcülüğünü asla aksatamaz; çatışma rotasındaki gemilere erken ve belirgin rota/hız değişimi zorunludur.',
      sesli_fisilti: 'COLREG vardiya seyir emniyeti, CPA/TCPA ve gözcülük protokolü kaydedildi.'
    };
  }

  // 14. MAKİNE DAİRESİ, ÇARKÇIBAŞI & YARDIMCI SİSTEMLER
  if (lower.includes('çarkçıbaşı') || lower.includes('carkcibasi') || lower.includes('başmühendis') || lower.includes('basmuhendis') || lower.includes('makine dairesi') || lower.includes('karter patlama') || lower.includes('scavenge')) {
    return {
      baslik: 'Makine Dairesi Bakım & Çarkçıbaşı Vardiyası',
      zaman: 'Makine Vardiyası / Günlük Bakım',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Vardiyadan 20 Dk Önce',
      action_items: [
        { task: 'Ana makine karter patlama röleleri, yağ sisi dedektörü ve scavenge yangın sıcaklıklarını denetle', is_completed: false },
        { task: 'Dizel jeneratör paralel çalışma devirleri, frekans (60Hz/50Hz) ve yük dağılımını kontrol et', is_completed: false },
        { task: 'HFO/LO santrifüj seperatörlerinin karter yağ seviyesi ve otomatik çamur deşarjını takip et', is_completed: false },
        { task: 'Yardımcı kazan su seviyesi, blöf vanaları ve alev gözetleme fotoselini test et', is_completed: false },
        { task: 'Makine Jurnaline (Engine Log Book) yakıt sarfiyatı, basınçlar ve çalışma saatlerini işle', is_completed: false }
      ],
      ikon: '⚙️',
      renk: '#E2E8F0',
      anomali_notu: 'Ana makine karterinde yağ sisi birikmesi anlık karter patlamasına yol açar; Oil Mist Detector testleri asla atlanmamalıdır.',
      sesli_fisilti: 'Çarkçıbaşı makine dairesi güvenlik parametreleri ve karter dedektör kontrolü açıldı.'
    };
  }

  // 15. DENİZ RAPORU (SEA PROTEST), MÜŞTEREK AVARYA & P&I
  if (lower.includes('sea protest') || lower.includes('deniz raporu') || lower.includes('müşterek avarya') || lower.includes('musterek avarya') || lower.includes('general average') || lower.includes('p&i')) {
    return {
      baslik: 'Deniz Raporu (Sea Protest) & P&I Bildirimi',
      zaman: 'Varıştan İtibaren 24 Saat İçinde',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: 'Liman Girişinde',
      action_items: [
        { task: 'Seyir esnasındaki ağır deniz, fırtına ve hasar kayıtlarını Deck Log Book’tan çıkart', is_completed: false },
        { task: 'Liman Başkanlığı veya Noter huzurunda 24 saatlik yasal sürede Deniz Raporunu (Sea Protest) tanzim et', is_completed: false },
        { task: 'P&I Kulübü yerel temsilcisi ve gemi armatörüne yazılı hasar ihbarını ilet', is_completed: false },
        { task: 'Bağımsız kargo/hasar sörveyörü eşliğinde ambar kapak mühür açılışı ve hasar tespitini yap', is_completed: false },
        { task: 'Müşterek avarya söz konusu ise York-Antwerp kuralları uyarınca ortalama dağıtımcısına evrakları sun', is_completed: false }
      ],
      ikon: '📜',
      renk: '#FEF3C7',
      anomali_notu: 'TTK uyarınca Deniz Raporu (Sea Protest) limana varıştan itibaren 24 saat içinde Noter veya Liman Başkanlığına verilmezse armatörün sorumluluktan kurtulma hakkı düşebilir.',
      sesli_fisilti: '24 saatlik Deniz Raporu (Sea Protest) ve P&I hasar tespit protokolü hazırlandı.'
    };
  }

  // GENEL DENİZCİLİK & GEMİ İDARESİ FALLBACK
  return {
    baslik: 'Denizcilik & Gemi Seyir Operasyonu',
    zaman: 'Planlanan Seyir / Vardiya Saati',
    tarih_iso: baseDate.toISOString(),
    hazirlik_zamani: 'Operasyondan 1 Saat Önce',
    action_items: [
      { task: 'SOLAS, MARPOL ve ISM Emniyet Yönetim Sistemi (SMS) prosedürlerini gözden geçir', is_completed: false },
      { task: 'Köprüüstü veya makine dairesi vardiya zabiti ile operasyonel brifingi tamamla', is_completed: false },
      { task: 'İşlem bitiminde saat, mevki ve teknik parametreleri ilgili gemi jurnaline işle', is_completed: false }
    ],
    ikon: '⚓',
    renk: '#CFFAFE',
    anomali_notu: 'Gemi idaresi operasyonlarında IMO uluslararası konvansiyonları (SOLAS, MARPOL, STCW, MLC) ve şirket SMS el kitabı esastır.',
    sesli_fisilti: 'Denizcilik operasyon çeklisti ve jurnal kayıt adımları hazırlandı.'
  };
}

/**
 * LOJİSTİK, TAŞIMACILIK & TEDARİK ZİNCİRİ MOTORU (LOGISTICS & SUPPLY CHAIN SUITE)
 * -------------------------------------------------------------------------------
 * Kapsam: AETR Takograf Sürüş/Mola, CMR Sevk Mektubu & Hasar Rezervi, ADR Tehlikeli Madde,
 * Frigofrik Soğuk Zincir (ATP/Pre-Cooling), NCTS Transit T1/T2 & TIR Karnesi, WMS Mal Kabul & FEFO,
 * SOLAS VGM & Konteyner Demuraj/Detention, Ağır Vasıta Pre-Trip/King-Pin/Kantar, EN 12195 Lashing/Spanzet,
 * Hava Kargo IATA DGR/AWB, İntermodal Ro-Ro/Ro-La/Swap Body, Last-Mile POD Dağıtım, TÜVTÜRK Muayene & Kalibrasyon.
 */
export function parseLogisticsSupplyChainNote(input: string, baseDate: Date, userDomain?: string): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  // Öncelikli Hızlı Senaryo Denetimi
  const shortMatch = matchShortScenario(input, userDomain || 'LOJISTIK');
  if (shortMatch && (shortMatch.domain === 'LOJISTIK' || shortMatch.id.startsWith('lojistik_') || shortMatch.id === 'sofor_takograf_aetr')) {
    return {
      baslik: shortMatch.baslik,
      zaman: shortMatch.varsayilanZaman || 'Planlandı',
      tarih_iso: null,
      action_items: (shortMatch.oncedenYapilacaklar || []).map(task => ({ task, is_completed: false })),
      ikon: shortMatch.ikon,
      renk: shortMatch.renk,
      anomali_notu: shortMatch.akilliFisilti,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      sesli_fisilti: shortMatch.akilliFisilti ? `${shortMatch.baslik} planlandı. ${shortMatch.akilliFisilti}` : 'Lojistik operasyon adımları hazırlandı.'
    };
  }

  const isLogisticsDomain =
    userDomain === 'LOJISTIK' ||
    lower.includes('takograf') || lower.includes('aetr') || lower.includes('sürüş') || lower.includes('surus') || lower.includes('şoför') || lower.includes('sofor') || lower.includes('tır') || lower.includes('tir') || lower.includes('kamyon') || lower.includes('çekici') || lower.includes('cekici') || lower.includes('dorse') || lower.includes('treyler') || lower.includes('king-pin') || lower.includes('kingpin') || lower.includes('beşinci teker') || lower.includes('besinci teker') || lower.includes('pleyt') || lower.includes('kantar') || lower.includes('aks yükü') || lower.includes('aks agirligi') || lower.includes('tonaj') || lower.includes('lojistik') || lower.includes('sevkiyat') || lower.includes('cmr') || lower.includes('sevk irsaliyesi') || lower.includes('taşıma irsaliyesi') || lower.includes('navlun') || lower.includes('hasar rezerv') || lower.includes('çekince') || lower.includes('adr') || lower.includes('tehlikeli madde') || lower.includes('un no') || lower.includes('un numarası') || lower.includes('src5') || lower.includes('src-5') || lower.includes('turuncu plaka') || lower.includes('kemler') || lower.includes('frigo') || lower.includes('soğuk zincir') || lower.includes('soguk zincir') || lower.includes('atp') || lower.includes('data logger') || lower.includes('termokin') || lower.includes('reefer') || lower.includes('t1') || lower.includes('t2') || lower.includes('ncts') || lower.includes('mrn') || lower.includes('tir karnesi') || lower.includes('transit rejimi') || lower.includes('gümrük mührü') || lower.includes('gumruk muhru') || lower.includes('wms') || lower.includes('mal kabul') || lower.includes('cross-docking') || lower.includes('cross docking') || lower.includes('palet') || lower.includes('fefo') || lower.includes('fifo') || lower.includes('rampa randevu') || lower.includes('dock appointment') || lower.includes('vgm') || lower.includes('konteyner') || lower.includes('demuraj') || lower.includes('detention') || lower.includes('ardiye') || lower.includes('free time') || lower.includes('bolt seal') || lower.includes('cıvata mühür') || lower.includes('civata muhur') || lower.includes('eir') || lower.includes('lashing') || lower.includes('spanzet') || lower.includes('yük emniyeti') || lower.includes('yuk emniyeti') || lower.includes('gergi kayışı') || lower.includes('en 12195') || lower.includes('hava kargo') || lower.includes('air cargo') || lower.includes('iata') || lower.includes('dgr') || lower.includes('awb') || lower.includes('air waybill') || lower.includes('uld') || lower.includes('intermodal') || lower.includes('ro-ro') || lower.includes('ro-la') || lower.includes('swap body') || lower.includes('last-mile') || lower.includes('last mile') || lower.includes('kurye') || lower.includes('dağıtım') || lower.includes('dagitim') || lower.includes('teslimat kodu') || lower.includes('pod') || lower.includes('tüvtürk') || lower.includes('tuvturk') || lower.includes('k2 belgesi') || lower.includes('psikoteknik') || lower.includes('pre-trip');

  if (!isLogisticsDomain) return null;

  // Zaman tespiti ve tersine kalkış saati hesaplama
  const timeMatch = input.match(/\b([01]?[0-9]|2[0-3])[:.]([0-5][0-9])\b/);
  let zamanStr = 'Bugün';
  let isoDateStr: string | null = null;
  let reverseCalcZaman: string | null = null;

  if (timeMatch) {
    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const targetDate = new Date(baseDate);
    targetDate.setHours(hours, minutes, 0, 0);
    isoDateStr = targetDate.toISOString();
    zamanStr = `Saat ${timeMatch[0]}`;

    // Yük teslim slotuna göre tersine kalkış hesabı (Örn: 4.5 saat sürüş + 45 dk mola + 45 dk pre-trip = 6 saat öncesi)
    const departureDate = new Date(targetDate.getTime() - 6 * 60 * 60 * 1000);
    const depH = String(departureDate.getHours()).padStart(2, '0');
    const depM = String(departureDate.getMinutes()).padStart(2, '0');
    reverseCalcZaman = `${depH}:${depM} (En Geç Kalkış Saati)`;
  } else if (lower.includes('yarın') || lower.includes('yarin')) {
    zamanStr = 'Yarın';
  } else if (lower.includes('haftaya') || lower.includes('pazartesi')) {
    zamanStr = 'Pazartesi';
  }

  // 1. AETR, DİJİTAL TAKOGRAF, SÜRÜŞ & MOLA YÖNETİMİ
  if (
    lower.includes('takograf') || lower.includes('aetr') || lower.includes('sürüş') || lower.includes('surus') ||
    lower.includes('mola') || lower.includes('sürücü kartı') || lower.includes('surucu karti') ||
    lower.includes('dinlenme') || lower.includes('4.5 saat') || lower.includes('9 saat')
  ) {
    return {
      baslik: 'AETR Takograf Sürüş & Mola Takvimi',
      zaman: reverseCalcZaman || zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Kalkıştan 45 Dk Önce (Pre-Trip & Kart)',
      action_items: [
        { task: 'Dijital takograf sürücü kartını tak; başlangıç ülke kodunu doğrula ve takometre saatini kontrol et', is_completed: false },
        { task: '4.5 saatlik kesintisiz sürüş sonrasında zorunlu 45 dk (veya 15+30 dk) bölünemez dinlenme molasını planla', is_completed: false },
        { task: 'Günlük azami sürüş limitini (9 saat, haftada en fazla 2 kez 10 saat) ve 11 saatlik kesintisiz günlük dinlenmeyi takip et', is_completed: false },
        { task: 'Çift şoförlü (ekip) sürüşte 30 saatlik periyot içinde her iki şoförün en az 9 saat dinlenmesini sağla', is_completed: false },
        { task: 'Dijital takograf sürücü kartı verisini en geç 28 günde bir, araç bellek verisini 90 günde bir indirip arşivle', is_completed: false }
      ],
      ikon: '🚛',
      renk: '#FED7AA',
      anomali_notu: 'AETR ve Karayolları Trafik Kanunu gereği 4.5 saatlik sürüş sonrası 45 dk mola verilmemesi ve günlük 9 saat aşımı ağır idari para cezası ve ehliyet ceza puanı doğurur.',
      sesli_fisilti: 'AETR takograf sürüş/mola planı ve 28 günlük kart indirme takvimi oluşturuldu.'
    };
  }

  // 2. CMR SEVK MEKTUBU, TAŞIMA İRSALİYESİ & HASAR REZERVİ
  if (
    lower.includes('cmr') || lower.includes('sevk mektubu') || lower.includes('hasar rezerv') ||
    lower.includes('çekince') || lower.includes('cekince') || lower.includes('rezervasyon') ||
    lower.includes('sevk irsaliyesi') || lower.includes('taşıma irsaliyesi') || lower.includes('navlun') ||
    lower.includes('eksik teslim') || lower.includes('koli hasarı') || lower.includes('koli hasari')
  ) {
    return {
      baslik: 'CMR Sevk Mektubu & İrsaliye Yönetimi',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Yük Teslim Öncesi (Fiziki Muayene)',
      action_items: [
        { task: 'CMR Sevk Mektubunun 1. nüshasını göndericiye, 2. nüshasını alıcıya ver; 3. nüshayı kaşeli/imzalı araçta sakla', is_completed: false },
        { task: 'Teslimde koli yırtığı, ıslanma veya palet dağılması varsa alıcıyla birlikte CMR Kutu 18\'e somut hasar rezervi düş', is_completed: false },
        { task: 'Gizli ambalaj içi hasarlarda CMR md. 30 gereği teslimden sonraki 7 günlük yasal yazılı ihbar süresini alıcıya bildir', is_completed: false },
        { task: 'GİB e-İrsaliye karekodunu, sevk irsaliyesini ve araç plaka/şoför TC kimlik no eşleşmesini sistemden doğrula', is_completed: false },
        { task: 'Hasar fotoğraflarını çekip taşıyıcı sorumluluk (CMR Sigortası) acentesine 24 saat içinde hasar ihbarı geç', is_completed: false }
      ],
      ikon: '📄',
      renk: '#FEF3C7',
      anomali_notu: 'CMR üzerine teslim anında çekince (rezerv) yazılmadan imzalanan mallar için taşıyıcının hasarsız ve tam teslim ettiği yasal karine sayılır.',
      sesli_fisilti: 'CMR sevk mektubu ve hasar rezerv kayıt prosedürü takvimlendi.'
    };
  }

  // 3. ADR TEHLİKELİ MADDE TAŞIMACILIĞI (UN NO, SRC-5, KEMLER, PLACARD)
  if (
    lower.includes('adr') || lower.includes('tehlikeli madde') || lower.includes('un no') ||
    lower.includes('un numarası') || lower.includes('un numarasi') || lower.includes('src5') || lower.includes('src-5') ||
    lower.includes('turuncu plaka') || lower.includes('kemler') || lower.includes('paketleme grubu') ||
    lower.includes('pg i') || lower.includes('pg ii') || lower.includes('adr çantası') || lower.includes('adr cantasi')
  ) {
    return {
      baslik: 'ADR Tehlikeli Madde Taşıma Güvenliği',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Yükleme Öncesi (ADR Donanım & Belge Kontrolü)',
      action_items: [
        { task: 'UN numarası, sevkiyat adı, sınıf (Class 1-9) ve paketleme grubunu (PG I/II/III) ADR taşıma evrakıyla karşılaştır', is_completed: false },
        { task: 'Çekici ve dorse ön/arka turuncu plakalarını (varsa Kemler tehlike kodlu) ve gövde tehlike etiketlerini (placards) tak', is_completed: false },
        { task: 'Şoförün geçerli SRC-5 belgesi ve araç kabininde Türkçe/İngilizce ADR Yazılı Talimat föyünü denetle', is_completed: false },
        { task: 'Yangın tüplerinin manometre basınçlarını (asgari 12 kg toplam, mühürlü) ve ADR kişisel koruma çantasını (göz duşu, kıvılcım çıkarmaz fener) kontrol et', is_completed: false },
        { task: 'Tünel kısıtlama kodunu (B/C/D/E) navigasyon rotasına işle ve meskun mahal park kısıtlamalarına harfiyen uy', is_completed: false }
      ],
      ikon: '☣️',
      renk: '#FEE2E2',
      anomali_notu: 'ADR ihlallerinde çevre ve can güvenliği nedeniyle araç derhal trafikten men edilir; SRC-5 belgesiz taşıma en üst limitten adli cezaya tabidir.',
      sesli_fisilti: 'ADR tehlikeli madde taşıma evrakı, UN levhaları ve SRC-5 güvenlik kontrolü hazırlandı.'
    };
  }

  // 4. FRİGORİFİK SOĞUK ZİNCİR & ATP KONVANSİYONU (DATA LOGGER, PRE-COOLING)
  if (
    lower.includes('frigo') || lower.includes('soğuk zincir') || lower.includes('soguk zincir') ||
    lower.includes('atp') || lower.includes('data logger') || lower.includes('termokin') ||
    lower.includes('reefer') || lower.includes('dondurulmuş') || lower.includes('dondurulmus') ||
    lower.includes('ısı sapması') || lower.includes('isi sapmasi') || lower.includes('set derecesi')
  ) {
    return {
      baslik: 'Frigorifik Soğuk Zincir & ATP Takibi',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Yüklemeden 2 Saat Önce (Pre-Cooling)',
      action_items: [
        { task: 'Yükleme öncesi dorseyi yükün cinsine göre soğut (Pre-cooling: Donuk -18°C / Taze +4°C / Farma +15..+25°C); set derecesine ulaşmadan yükleme yapma', is_completed: false },
        { task: 'Kalibrasyonlu Data Logger cihazının ve termokin dahili sensörlerinin kayıt başlattığını ekrandan doğrula', is_completed: false },
        { task: 'Yükleme esnasında tavan hava sirkülasyon perdesini ve taban hava kanallarını kapatmayacak şekilde istif yap', is_completed: false },
        { task: 'Boşaltma rampasında termokin yazıcısından sıcaklık çıktısını (printout) alarak alıcı kalite kontrol onayına sun', is_completed: false },
        { task: 'Seyir esnasında sıcaklık sapması (±2°C alarmı) durumunda jeneratör yakıtını ve kompresör kayışını derhal kontrol et', is_completed: false }
      ],
      ikon: '❄️',
      renk: '#E0F2FE',
      anomali_notu: 'ATP konvansiyonu ve soğuk zincir protokolü gereği ısı sapması yaşanan gıda ve ilaç yükleri alıcı tarafından reddedilir ve imhaya gider.',
      sesli_fisilti: 'Frigo pre-cooling set ısısı, data logger ve ATP soğuk zincir kontrolü oluşturuldu.'
    };
  }

  // 5. GÜMRÜK TRANSİT, NCTS, T1/T2 & TIR KARNESİ
  if (
    lower.includes('t1') || lower.includes('t2') || lower.includes('ncts') || lower.includes('mrn') ||
    lower.includes('tir karnesi') || lower.includes('transit rejimi') || lower.includes('gümrük mührü') ||
    lower.includes('gumruk muhru') || lower.includes('varış gümrüğü') || lower.includes('varis gumrugu') ||
    lower.includes('transit süresi') || lower.includes('transit suresi') || lower.includes('supalan')
  ) {
    return {
      baslik: 'Gümrük Transit & NCTS (T1/T2) Rejimi',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Gümrük Çıkışı Öncesi',
      action_items: [
        { task: 'NCTS sistemi üzerinden üretilen MRN barkodlu Transit Refakat Belgesini (TRB) ve teminat mektubunu teslim al', is_completed: false },
        { task: 'Gümrük muayene memuru tarafından takılan kurşun veya barkodlu plastik mührün numarasını beyanname ile eşleştir', is_completed: false },
        { task: 'Çıkış gümrüğünce belirlenen zorunlu seyahat güzergahına uy ve varış gümrüğü yasal süresini (transit süresini) geçirme', is_completed: false },
        { task: 'Mührün seyir esnasında kopması veya kaza halinde en yakın gümrük müdürlüğü veya kolluk kuvvetiyle derhal resmi tutanak tanzim et', is_completed: false },
        { task: 'Varış gümrüğüne intikalde MRN barkodunu okutarak tescil kapatma ve supalan/antrepo boşaltma iznini al', is_completed: false }
      ],
      ikon: '🛂',
      renk: '#E0E7FF',
      anomali_notu: 'NCTS transit süresinin aşılması veya gümrük mührünün yetkisiz bozulması 5607 sayılı Kaçakçılıkla Mücadele Kanunu uyarınca adli ceza başlatır.',
      sesli_fisilti: 'NCTS MRN transit takibi, gümrük mührü ve varış süresi kontrol kartı açıldı.'
    };
  }

  // 6. DEPO YÖNETİMİ, WMS, CROSS-DOCKING & MAL KABUL
  if (
    lower.includes('wms') || lower.includes('mal kabul') || lower.includes('cross-docking') ||
    lower.includes('cross docking') || lower.includes('depo') || lower.includes('palet sayımı') ||
    lower.includes('palet sayimi') || lower.includes('fefo') || lower.includes('fifo') ||
    lower.includes('rampa randevu') || lower.includes('dock appointment')
  ) {
    return {
      baslik: 'Depo Mal Kabul & WMS Entegrasyonu',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Rampa Randevusundan 30 Dk Önce',
      action_items: [
        { task: 'Rampa randevu (Dock Appointment) saatinde aracı perona yanaştır, tekerlek takozunu yerleştir ve kontak anahtarını teslim et', is_completed: false },
        { task: 'Sevk irsaliyesi ile fiziki koli/palet sayısını, lot/seri numaralarını RF el terminaliyle barkod taratarak WMS sistemine gir', is_completed: false },
        { task: 'Hasarlı, yırtık, ıslak veya ezilmiş paletleri derhal sarı karantina alanına ayırarak fotoğraflı tutanak düzenle', is_completed: false },
        { task: 'Depo adresli raf gözlerine yerleştirmede SKT kontrolü ile FEFO (First Expired First Out) ve hacim optimizasyonunu uygula', is_completed: false },
        { task: 'Cross-docking sevkiyatlarında malı rafa almadan doğrudan çıkış rampa kapısına aktararak çıkış irsaliyesini hazırla', is_completed: false }
      ],
      ikon: '🏬',
      renk: '#FEF3C7',
      anomali_notu: 'WMS sistemine hatalı parti/SKT girilmesi veya rampa randevu süresinin aşılması depo demurajı ve stok sayım uyumsuzluğu yaratır.',
      sesli_fisilti: 'WMS depo mal kabul, rampa randevusu ve FEFO adresleme planı oluşturuldu.'
    };
  }

  // 7. KONTEYNER TAŞIMACILIĞI, SOLAS VGM & DEMURAJ / DETENTION TAKİBİ
  if (
    lower.includes('vgm') || lower.includes('konteyner') || lower.includes('demuraj') ||
    lower.includes('detention') || lower.includes('ardiye') || lower.includes('free time') ||
    lower.includes('bolt seal') || lower.includes('cıvata mühür') || lower.includes('civata muhur') ||
    lower.includes('eir') || lower.includes('liman konteyner') || lower.includes('depo iade')
  ) {
    return {
      baslik: 'Konteyner VGM & Demuraj / Detention Takibi',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Liman Kapısından 2 Saat Önce',
      action_items: [
        { task: 'SOLAS Chapter VI gereği tartım istasyonundan onaylı Method 1 veya Method 2 Doğrulanmış Brüt Ağırlık (VGM) sertifikasını temin et', is_completed: false },
        { task: 'ISO 17712 standardında yüksek güvenlikli cıvata mührünü (High Security Bolt Seal) konteyner kilidine takıp konşimentoya işlet', is_completed: false },
        { task: 'Hat acentesi serbest süresini (Free Time gün sayısı) takip et; liman ardiye ve acente demuraj cezası başlamadan boşaltmayı planla', is_completed: false },
        { task: 'Boş konteyneri acentenin belirlediği depoya iade ederken EIR (Equipment Interchange Receipt) formuyla hasarsız teslim al', is_completed: false },
        { task: 'Konteyner taban tahtalarında yağ, kimyasal leke veya eğrilik olup olmadığını kapı açılışında fotoğrafla', is_completed: false }
      ],
      ikon: '🚢',
      renk: '#CFFAFE',
      anomali_notu: 'VGM beyanı bulunmayan konteynerler SOLAS gereği gemiye yüklenemez; free time aşımı günlük yüzlerce dolar demuraj cezası üretir.',
      sesli_fisilti: 'SOLAS VGM tartım sertifikası, cıvata mühür ve demuraj serbest süre takibi kuruldu.'
    };
  }

  // 8. AĞIR VASITA PRE-TRIP, KING-PIN & AKS KANTAR GÜVENLİĞİ
  if (
    lower.includes('pre-trip') || lower.includes('king-pin') || lower.includes('kingpin') ||
    lower.includes('beşinci teker') || lower.includes('besinci teker') || lower.includes('pleyt') ||
    lower.includes('lastik basıncı') || lower.includes('lastik basinci') || lower.includes('kantar') ||
    lower.includes('aks ağırlığı') || lower.includes('aks agirligi') || lower.includes('aks yükü') ||
    lower.includes('tonaj aşımı') || lower.includes('tonaj asimi') || lower.includes('hava hortumu')
  ) {
    return {
      baslik: 'Ağır Vasıta Pre-Trip & Aks Kantar Kontrolü',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Kalkıştan 45 Dk Önce (Pre-Trip)',
      action_items: [
        { task: 'Beşinci tekerlek (pleyt) king-pin kilit mandalının tam oturduğunu ve emniyet kilidinin geçtiğini fiziki ve fenerle doğrula', is_completed: false },
        { task: 'Kırmızı (acil besleme) ve sarı (servis freni) spiral hava hortumları ile ABS/EBS elektrik soketlerini dorseye bağla', is_completed: false },
        { task: 'Lastiklerin soğuk hava basınçlarını (110-120 PSI), bijon sıkılıklarını ve taban diş derinliğini (en az 1.6 mm / kış 4 mm) kontrol et', is_completed: false },
        { task: 'Karayolları 40 ton (44 ton intermodal) sınırını aşmamak için kantar tartım fişiyle çekici ön/arka ve dorse tridem aks yükünü denetle', is_completed: false },
        { task: 'Dorse park fren mandalını (kırmızı düğme) içeri iterek hava dolumunu sağla ve servis freni kaçak testini yap', is_completed: false }
      ],
      ikon: '🚛',
      renk: '#FED7AA',
      anomali_notu: 'King-pin kilit mandalının oturmaması seyir halinde dorsenin ayrılmasına yol açar; aks tonaj aşımı kantar cezası ve trafikten men sebebidir.',
      sesli_fisilti: 'Pre-trip king-pin kilidi, fren devreleri ve aks kantar kontrolü hazırlandı.'
    };
  }

  // 9. YÜK GÜVENLİĞİ, LASHİNG & SPANZET EMNİYETİ (EN 12195)
  if (
    lower.includes('lashing') || lower.includes('spanzet') || lower.includes('yük emniyeti') ||
    lower.includes('yuk emniyeti') || lower.includes('gergi kayışı') || lower.includes('gergi kayisi') ||
    lower.includes('cırcırlı kayış') || lower.includes('circirli kayis') || lower.includes('en 12195') ||
    lower.includes('kaymaz paspas') || lower.includes('köşe koruyucu') || lower.includes('kose koruyucu') ||
    lower.includes('yük bağlama') || lower.includes('yuk baglama')
  ) {
    return {
      baslik: 'EN 12195 Yük Emniyeti & Lashing Planı',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Yükleme Esnasında',
      action_items: [
        { task: 'Palet ve rulo yüklerin altına sürtünme katsayısını artıran EN 12195 standardı kauçuk kaymaz paspaslar yerleştir', is_completed: false },
        { task: 'Kayış kesilmesini ve palet kenar ezilmesini önlemek için plastik köşe koruyucuları palet kenarlarına tak', is_completed: false },
        { task: 'Spanzet cırcırlarını (ratchet) LC çekme kapasitesine göre çapraz ve sürtünmeli bağlama açısıyla şasiye kilitle', is_completed: false },
        { task: 'Yola çıktıktan sonraki ilk 25-50 km mesafede güvenli park alanında durup kayış gergilerini yeniden sık', is_completed: false },
        { task: 'Ağır sanayi ve saç rulo yüklerinde dikey kilit kamaları ve zincir gerdiriciler kullan', is_completed: false }
      ],
      ikon: '⛓️',
      renk: '#E2E8F0',
      anomali_notu: 'EN 12195 standardına aykırı yetersiz bağlama virajlarda yükün devrilmesine ve dorse tentesini yırtarak karayolu facialarına yol açar.',
      sesli_fisilti: 'EN 12195 spanzet lashing, kaymaz paspas ve ilk 30 km gergi kontrolü planlandı.'
    };
  }

  // 10. HAVA KARGO & IATA DGR / AIR WAYBILL (AWB)
  if (
    lower.includes('hava kargo') || lower.includes('air cargo') || lower.includes('iata') ||
    lower.includes('dgr') || lower.includes('awb') || lower.includes('air waybill') ||
    lower.includes('uld') || lower.includes('kargo uçağı') || lower.includes('kargo ucagi') ||
    lower.includes('bilinen gönderici')
  ) {
    return {
      baslik: 'Hava Kargo & IATA DGR Operasyonu',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Uçuştan 6 Saat Önce',
      action_items: [
        { task: 'Master Air Waybill (MAWB) ve House Air Waybill (HAWB) konşimento numaralarını kargo etiketleri ve çeki listesiyle eşleştir', is_completed: false },
        { task: 'Tehlikeli madde içeren gönderilerde IATA DGR kurallarına uygun Shipper\'s Declaration for Dangerous Goods (DGD) föyünü tanzim et', is_completed: false },
        { task: 'ULD (uçak konteyneri/paleti) kontur ölçülerini (aircraft contour) ve net/brüt tartım değerlerini kontrol et', is_completed: false },
        { task: 'Havalimanı kargo terminali X-Ray güvenlik taraması ve gümrük beyannamesi kapama onayını al', is_completed: false },
        { task: 'Kargo uçağı (Cargo Aircraft Only - CAO) etiketli paketlerin yolcu uçağına yüklenmesini kesinlikle engelle', is_completed: false }
      ],
      ikon: '✈️',
      renk: '#DDD6FE',
      anomali_notu: 'IATA DGR kurallarına uygun paketlenmeyen veya DGD beyanı eksik hava kargolar uçağa kabul edilmez; havayolu güvenlik cezası uygulanır.',
      sesli_fisilti: 'Hava kargo AWB konşimentosu, IATA DGR beyanı ve ULD kontur kontrolü oluşturuldu.'
    };
  }

  // 11. İNTERMODAL TAŞIMACILIK, RO-RO & RO-LA & SWAP BODY
  if (
    lower.includes('intermodal') || lower.includes('ro-ro') || lower.includes('ro-la') ||
    lower.includes('swap body') || lower.includes('swap-body') || lower.includes('kombine taşımacılık') ||
    lower.includes('treyler vinçleme') || lower.includes('twist-lock') || lower.includes('cim')
  ) {
    return {
      baslik: 'İntermodal & Ro-Ro / Ro-La Taşımacılığı',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Terminal Girişinden 2 Saat Önce',
      action_items: [
        { task: 'Ro-Ro gemi yüklemesinde dorse şasisindeki 4 köşedeki lashing halkalarını ve çekici ayaklarını gemi güvertesine sabitle', is_completed: false },
        { task: 'Demiryolu Ro-La vagon yüklemesinde P400 gabari yüksekliğini ve treyler vinçleme (craneable) ceplerini kontrol et', is_completed: false },
        { task: 'Swap-body konteyner twist-lock kilitlerinin şasiye oturduğunu ve kilit kollarının emniyet mandalına alındığını teyit et', is_completed: false },
        { task: 'Demiryolu CIM taşıma senedini ve intermodal aktarma liman giriş barkodunu şoföre teslim et', is_completed: false }
      ],
      ikon: '🚆',
      renk: '#FEF08A',
      anomali_notu: 'Gabari aşımı ve gevşek twist-lock kilitleri tünel çarpmalarına ve vagon üzerinden treyler savrulmasına yol açar.',
      sesli_fisilti: 'İntermodal Ro-Ro lashing, Ro-La gabari kontrolü ve CIM taşıma senedi hazırlandı.'
    };
  }

  // 12. SON KİLOMETRE (LAST-MILE), KURYE DAĞITIM & ROTA OPTİMİZASYONU
  if (
    lower.includes('last-mile') || lower.includes('last mile') || lower.includes('son kilometre') ||
    lower.includes('kurye') || lower.includes('paket dağıtım') || lower.includes('paket dagitim') ||
    lower.includes('rota optimizasyonu') || lower.includes('teslimat kodu') || lower.includes('pod') ||
    lower.includes('teslimat kanıtı') || lower.includes('teslimat kaniti')
  ) {
    return {
      baslik: 'Son Kilometre Dağıtım & Teslimat (POD)',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Dağıtıma Çıkıştan 15 Dk Önce',
      action_items: [
        { task: 'Günlük dağıtım manifestosunu adres kümeleme ve anlık trafik yoğunluğuna göre navigasyon sisteminde optimize et', is_completed: false },
        { task: 'Alıcıya tahmini teslimat zaman penceresini (ETA time-window) ve 4 haneli SMS teslimat kodunu ilet', is_completed: false },
        { task: 'Kapıda teslimatta temassız teslimat kodunu el terminaline gir veya alıcı imzasını (POD - Proof of Delivery) kaydet', is_completed: false },
        { task: 'Adreste bulunamayan veya hasarlı iade paketlerini gün sonunda şube iade karantinasına teslim tutanağıyla bırak', is_completed: false }
      ],
      ikon: '📦',
      renk: '#DCFCE7',
      anomali_notu: 'Hatalı adres ve geciken zaman pencereleri müşteri memnuniyetsizliği ve dağıtım maliyetlerini iki katına çıkarır.',
      sesli_fisilti: 'Son kilometre rota optimizasyonu, SMS teslimat kodu ve POD teslimat adımları planlandı.'
    };
  }

  // 13. FİLO YÖNETİMİ, TÜVTÜRK & TAKOGRAF KALİBRASYONU
  if (
    lower.includes('tüvtürk') || lower.includes('tuvturk') || lower.includes('ağır vasıta muayene') ||
    lower.includes('agir vasita muayene') || lower.includes('takograf kalibrasyon') ||
    lower.includes('k2 belgesi') || lower.includes('psikoteknik') || lower.includes('filo bakım') ||
    lower.includes('filo bakim')
  ) {
    return {
      baslik: 'TÜVTÜRK Muayene & Takograf Kalibrasyonu',
      zaman: zamanStr,
      tarih_iso: isoDateStr,
      hazirlik_zamani: 'Muayeneden 1 Gün Önce',
      action_items: [
        { task: 'Yetkili serviste fren test merdanesiyle ön, çekici ve dorse fren sapma yüzdesinin <%30 olduğunu doğrula', is_completed: false },
        { task: 'Dijital takografın 2 yıllık periyodik kalibrasyonunu (W katsayısı ve plaka eşleşmesi) yetkili serviste yenilet', is_completed: false },
        { task: 'K1/C2/L2 yetki belgesi taşıt kartı vizesini ve araç Zorunlu Trafik Sigortası poliçesini kontrol et', is_completed: false },
        { task: 'Şoförlerin SRC mesleki yeterlilik ve psikoteknik değerlendirme raporlarının geçerliliğini filo sisteminde onayla', is_completed: false }
      ],
      ikon: '🔧',
      renk: '#FEF3C7',
      anomali_notu: 'Muayenesi veya takograf kalibrasyonu geçmiş ağır vasıtaların trafiğe çıkması durumunda araç bağlanır ve tonaj cezası kesilir.',
      sesli_fisilti: 'TÜVTÜRK muayene öncesi fren testi, takograf kalibrasyonu ve yetki belgesi kontrolü takvimlendi.'
    };
  }

  // 14. GENEL LOJİSTİK & AĞIR VASITA OPERASYONU (VARSAYILAN / FALLBACK)
  return {
    baslik: 'Lojistik & Ağır Vasıta Sevkiyatı',
    zaman: zamanStr,
    tarih_iso: isoDateStr,
    hazirlik_zamani: 'Yola Çıkıştan 45 Dk Önce (Pre-Trip)',
    action_items: [
      { task: 'Araç pre-trip kontrolünü yap: Lastik basınçları, king-pin emniyeti ve fren hortumlarını denetle', is_completed: false },
      { task: 'Sevk irsaliyesi, CMR veya fatura evraklarını ve gümrük/kantar belgelerini kontrol et', is_completed: false },
      { task: 'Dijital takograf kartını tak; 4.5 saatlik sürüş ve zorunlu 45 dk dinlenme molasını planla', is_completed: false },
      { task: 'Yükün dorse içindeki ağırlık dağılımını ve spanzet gergi bağlarını kontrol et', is_completed: false },
      { task: 'Varış noktası rampa randevu saatini teyit ederek alıcıya tahmini varış (ETA) bilgisini ilet', is_completed: false }
    ],
    ikon: '🚛',
    renk: '#FED7AA',
    anomali_notu: 'Karayolu taşımacılığında AETR takograf süreleri, aks ağırlık limitleri (azami 40 ton) ve CMR sevk evrakı mevzuatı bağlayıcıdır.',
    sesli_fisilti: 'Lojistik sevkiyat planı, pre-trip kontrolü ve takograf adımları hazırlandı.'
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
    lower.includes('fön') || lower.includes('fon') || lower.includes('elastikiyet') ||
    lower.includes('ombre') || lower.includes('sombre') || lower.includes('balyaj') || lower.includes('cila') || lower.includes('dip boya') || lower.includes('açıcı') || lower.includes('acici') ||
    lower.includes('lazer') || lower.includes('epilasyon') || lower.includes('manikür') || lower.includes('pedikür') || lower.includes('protez tırnak') || lower.includes('kalıcı oje') ||
    (lower.includes('sterilizasyon') && (lower.includes('makas') || lower.includes('tarak') || lower.includes('salon') || lower.includes('kuaför')));

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

  // 3. KUAFÖR & GÜZELLİK (Ombre/Oryal, Dip Boya, Brezilya Fönü, Lazer, Sterilizasyon)
  const isBleachOrColor = lower.includes('oryal') || lower.includes('açma') || lower.includes('acma') || lower.includes('açıcı') || lower.includes('acici') ||
    lower.includes('röfle') || lower.includes('rofle') || lower.includes('boya') || lower.includes('keratin') || lower.includes('elastikiyet') ||
    lower.includes('ombre') || lower.includes('sombre') || lower.includes('balyaj') || lower.includes('cila');

  if (isBleachOrColor) {
    // 3.a: Açıcı / Ombre Sonrası (48 Saat Yıkama Yasağı & 3 Hafta Keratin)
    if (lower.includes('ombre') || lower.includes('sombre') || lower.includes('balyaj') || lower.includes('röfle') || lower.includes('rofle') ||
        ((lower.includes('açıcı') || lower.includes('oryal') || lower.includes('açıldı') || lower.includes('açtık')) && (lower.includes('yapıldı') || lower.includes('bitti') || lower.includes('sürüldü') || lower.includes('sonrası')))) {
      return {
        baslik: 'Açıcı / Ombre Sonrası 48 Saat & Keratin',
        zaman: '48 Saat Yıkama Yasağı',
        tarih_iso: baseDate.toISOString(),
        hazirlik_zamani: '3 Hafta Sonra Keratin',
        hazirlik_iso: new Date(baseDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        action_items: [
          { task: 'Müşteriye ilk 48 saat saçı yıkamaması ve sıcak fön çekmemesi talimatını ver', is_completed: false },
          { task: 'Turunculaşma ve sararmayı önlemek için sülfatsız mor şampuan kullanımını tavsiye et', is_completed: false },
          { task: 'Açma işlemi sonrası saç elastikiyetini korumak için 3 hafta sonrasına keratin/botoks seansı planla', is_completed: false },
          { task: 'Dip boya ve cila tazeleme randevusunu 5 hafta sonrasına kaydet', is_completed: false }
        ],
        ikon: '✂️',
        renk: '#FCE7F3',
        anomali_notu: '✂️ Oryal veya açıcı uygulanan saç 48 saat yıkanmamalı; sararma önleyici mor şampuan ve 3 hafta sonra nem yüklemesi yapılmalıdır.',
        sesli_fisilti: 'Ombre sonrası 48 saat yıkama yasağı ve 3 hafta sonraki keratin bakım adımları kuruldu.'
      };
    }

    // 3.b: Dip Boya & Cila Tazeleme
    if (lower.includes('dip boya') || lower.includes('cila') || lower.includes('beyaz kapama')) {
      return {
        baslik: 'Dip Boya & Renk Koruma Takvimi',
        zaman: '4 Hafta Sonra Dip Tazeleme',
        tarih_iso: baseDate.toISOString(),
        hazirlik_zamani: '48 Saat Renk Kilitleme',
        hazirlik_iso: new Date(baseDate.getTime() + 48 * 60 * 60 * 1000).toISOString(),
        action_items: [
          { task: 'İlk 48 saat aşırı sıcak su ve agresif sülfatlı şampuan kullanımından kaçınma uyarısı yap', is_completed: false },
          { task: 'Renk pigmenti solmasını önlemek için asidik renk koruyucu saç bakım kremi tavsiye et', is_completed: false },
          { task: 'Dip çıkış periyoduna göre 4-5 hafta sonrasına dip boya tazeleme randevusunu oluştur', is_completed: false },
          { task: 'Saç derisinde olası boya hassasiyeti ve alerji takibini sağla', is_completed: false }
        ],
        ikon: '✂️',
        renk: '#FCE7F3',
        anomali_notu: '✂️ Boya pigmentlerinin kilitlenmesi için ilk 48 saat sıcak sudan kaçınılmalı, 4 hafta sonrasına dip tazeleme planlanmalıdır.',
        sesli_fisilti: 'Dip boya renk koruma ve 4 hafta sonraki dip tazeleme randevusu takvimleştirildi.'
      };
    }

    // 3.c: Aktif Oryal / Açma Sayacı (40 Dk Maksimum & 15. Dk Elastikiyet)
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

  // 4. LAZER EPİLASYON & CİLT BAKIMI
  if (lower.includes('lazer') || lower.includes('epilasyon') || lower.includes('cilt bakımı') || lower.includes('cilt bakimi') || lower.includes('hydrafacial') || lower.includes('dermapen')) {
    return {
      baslik: 'Lazer & Cilt Koruma Protokolü',
      zaman: '24 Saat Sıcak Duş Yasağı',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: '4-6 Hafta Sonraki Seans',
      hazirlik_iso: new Date(baseDate.getTime() + 28 * 24 * 60 * 60 * 1000).toISOString(),
      action_items: [
        { task: 'İlk 24 saat sıcak duş, sauna, terletici spor ve kese uygulamasından kesinlikle kaçın', is_completed: false },
        { task: 'Hiperpigmentasyon ve güneş lekesi oluşmaması için SPF 50+ koruyucu kremi her 3 saatte bir tazele', is_completed: false },
        { task: 'Cilt bariyerini onarmak için yatıştırıcı panthenol veya centella jel kullan', is_completed: false },
        { task: 'Kıl kökü veya cilt hücre yenilenme periyoduna göre 4-6 hafta sonrasına sonraki seansı takvimle', is_completed: false }
      ],
      ikon: '✨',
      renk: '#FCE7F3',
      anomali_notu: '✨ Lazer ve derin cilt bakımı sonrası 24 saat sıcak su ve kese yasaktır; leke kalmaması için SPF 50+ güneş kremi zorunludur.',
      sesli_fisilti: 'Lazer işlemi sonrası 24 saat sıcak su koruması ve sonraki seans planı oluşturuldu.'
    };
  }

  // 5. KALICI OJE & PROTEZ TIRNAK
  if (lower.includes('kalıcı oje') || lower.includes('kalici oje') || lower.includes('protez tırnak') || lower.includes('protez tirnak') || lower.includes('manikür') || lower.includes('manikur') || lower.includes('pedikür') || lower.includes('pedikur')) {
    return {
      baslik: 'Kalıcı Oje & Tırnak Bakım Takvimi',
      zaman: '3 Hafta Sonra Bakım / Dolgu',
      tarih_iso: baseDate.toISOString(),
      hazirlik_zamani: '24 Saat Sıcak Su / Kimyasal Koruma',
      hazirlik_iso: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      action_items: [
        { task: 'İlk 24 saat sıcak su, buhar ve sert kimyasal deterjan temasından kaçın', is_completed: false },
        { task: 'Tırnak etlerinin kurumasını önlemek için kütikül yağı kullanımını öner', is_completed: false },
        { task: 'Tırnak uzama çizgisine göre 3 hafta sonrasına dolgu veya yenileme randevusu aç', is_completed: false },
        { task: 'Tırnağı kazımadan veya soymadan salonda frezeyle çıkarma kuralını ilet', is_completed: false }
      ],
      ikon: '💅',
      renk: '#FCE7F3',
      anomali_notu: '💅 Kalıcı oje ve protez tırnak sonrası ilk 24 saat sıcak sudan korunmalı, 3 hafta sonra dolgu bakımı yapılmalıdır.',
      sesli_fisilti: 'Tırnak bakımı sonrası 24 saat koruma ve 3 hafta sonraki dolgu takvimi hazırlandı.'
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
  // Kesin Yasaklı / İdari Kalkan: İdari, resmi, okul/kurum kelimeleri varsa alışveriş sayma!
  // -------------------------------------------------------------
  const isShopping = 
    !isAdministrativeContext(cleanInput) && (
      (lower.includes('eve gelirken') && lower.includes('al')) ||
      (lower.includes('gelirken') && lower.includes('al')) ||
      (lower.includes('markete gidince') && lower.includes('al')) ||
      (lower.includes('marketten') && lower.includes('al')) ||
      (lower.includes('bakkaldan') && lower.includes('al')) ||
      (lower.includes('alınacaklar') || lower.includes('alinacaklar')) ||
      (lower.includes('alınacak') && lower.includes('liste')) ||
      ((lower.includes('ekmek') || lower.includes('süt') || lower.includes('yumurta') || lower.includes('maden suyu')) && lower.includes('al'))
    );

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
    const isMissingTime = !appointmentIso;
    const netlestirmeSorusu = isDentist
      ? 'Hangi gün ve saatte diş hekiminde olacaksınız?'
      : 'Hangi gün ve saatte doktor randevunuz var?';

    return {
      baslik,
      zaman: isMissingTime ? 'Tarih Belirlenmedi (Randevu)' : zamanDisplay,
      tarih_iso: appointmentIso,
      eksik_bilgi: isMissingTime ? true : undefined,
      netlestirme_sorusu: isMissingTime ? netlestirmeSorusu : undefined,
      soru: isMissingTime ? netlestirmeSorusu : undefined,
      hazirlik_zamani: '30 Dk Önce Yola Çıkış',
      hazirlik_iso: prepIso,
      action_items: [], // KESİNLİKLE BOŞ! (Yapay alt adımlar üretilmez)
      ikon,
      renk: '#E0F2FE',
      isMicroTask: true,
      deviceNotificationEnabled: true,
      anomali_notu: '🚗 30 dakika önce yola çıkış hatırlatılacaktır.',
      sesli_fisilti: isMissingTime
        ? netlestirmeSorusu
        : `${baslik} ${zamanDisplay} için kaydedildi. 30 dakika önce yola çıkış hatırlatılacak.`
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
  const rawTrimmed = (input || '').trim();

  // 0. ÖNCELİK: SADE / MOTORSUZ MOD (Kullanıcı motor seçimi yapmadıysa veya Sade Mod seçildiyse)
  // Hiçbir bilişsel motor, jargon radarı, mevzuat veya otomatik alt adım üretilmez; yalnızca söylenen ham haliyle yazılır.
  if (userDomain === 'SADE') {
    return {
      baslik: rawTrimmed,
      zaman: 'Kayıt Edildi',
      tarih_iso: null,
      action_items: [],
      ikon: '📝',
      renk: '#F8FAFC',
      anomali_notu: null,
      sesli_fisilti: 'Notunuz kaydedildi.'
    };
  }

  // 1. Fonetik Hata ve Sesli Dikte Normalizasyonu
  const cleanInput = normalizePhoneticJargon(rawTrimmed);
  const lower = cleanInput.toLowerCase();
  const baseDate = refDatetime ? new Date(refDatetime) : new Date();

  // 0.00 ÖNCELİK: EĞİTİM, MEB VE OKUL YÖNETİMİ PROTOKOLÜ (SCHOOL ADMIN ENGINE)
  // Kullanıcı Türk Millî Eğitim sistemi, okul idaresi, öğretmenlik veya resmi bürokrasi ile ilgili terim
  // kullandığında (DYS, MEBBİS, e-Okul, Destek Eğitim Odası, BEP, RAM, ŞÖK, Zümre, Nöbet, Ek Ders, Puantaj,
  // Disiplin, Desimal Kodu, Üst Yazı, Kaymakamlık Oluru): Kesinlikle alışveriş veya genel liste oluşturulmaz!
  const schoolAdminResult = parseSchoolAdminIntent(cleanInput, baseDate, userDomain);
  if (schoolAdminResult) {
    return enrichWithPredictiveGraph({
      baslik: schoolAdminResult.baslik,
      zaman: schoolAdminResult.zaman_etiketi,
      tarih_iso: schoolAdminResult.tarih_iso,
      hazirlik_zamani: schoolAdminResult.hazirlik_zamani,
      action_items: schoolAdminResult.action_items,
      ikon: schoolAdminResult.ikon,
      renk: schoolAdminResult.renk,
      anomali_notu: schoolAdminResult.mevzuat_notu,
      sesli_fisilti: schoolAdminResult.sesli_geribildirim
    }, cleanInput, userDomain);
  }

  // 0.005 ÖNCELİK: DERİNLEŞTİRİLMİŞ VETERİNER HEKİMLİK & HAYVAN SAĞLIĞI PROTOKOLLERİ
  // (PETVET Mikroçip/Pasaport, Kuduz Titrasyon RNATT, Pre-Op/Post-Op Cerrahi, Anestezi Onam,
  // Aşı/Parazit Profılaksisi, TÜRKVET Küpeleme & Doğum, Mastitis CMT & Süt Arınma Karantinası vb.)
  const vetResult = parseVeterinaryIntent(cleanInput, baseDate, userDomain);
  if (vetResult) {
    return enrichWithPredictiveGraph({
      baslik: vetResult.baslik,
      zaman: vetResult.zaman_etiketi,
      tarih_iso: vetResult.tarih_iso,
      hazirlik_zamani: vetResult.hazirlik_zamani,
      action_items: vetResult.action_items,
      ikon: vetResult.ikon,
      renk: vetResult.renk,
      anomali_notu: vetResult.mevzuat_notu,
      sesli_fisilti: vetResult.sesli_geribildirim
    }, cleanInput, userDomain);
  }

  // 0.006 ÖNCELİK: ECZACILIK, MEDULA SUT, SOĞUK ZİNCİR & MAJİSTRAL PROTOKOLÜ (PHARMACY ENGINE)
  // (2-8°C Soğuk Zincir/Aşı Dolabı, Medula Fatura/Reçete Kolisi, Renkli Reçete RRS/İTS, Miad İadesi, Majistral Formül)
  const pharmacyResult = parsePharmacyIntent(cleanInput, baseDate, userDomain);
  if (pharmacyResult) {
    return enrichWithPredictiveGraph({
      baslik: pharmacyResult.baslik,
      zaman: pharmacyResult.zaman_etiketi,
      tarih_iso: pharmacyResult.tarih_iso,
      hazirlik_zamani: pharmacyResult.hazirlik_zamani,
      action_items: pharmacyResult.action_items,
      ikon: pharmacyResult.ikon,
      renk: pharmacyResult.renk,
      anomali_notu: pharmacyResult.mevzuat_notu,
      sesli_fisilti: pharmacyResult.sesli_geribildirim
    }, cleanInput, userDomain || 'ECZACILIK');
  }

  // 0.007 ÖNCELİK: İŞ SAĞLIĞI VE GÜVENLİĞİ PROTOKOLÜ (OCCUPATIONAL SAFETY & HEALTH ENGINE)
  // (İBYS Eğitim Bildirimi, Ramak Kala Olayı & DÖF, SGK İş Kazası 3 İş Günü, Periyodik Muayene, İSG Kurulu, Sıcak İş İzni PTW)
  const isgResult = parseOccupationalSafetyIntent(cleanInput, baseDate, userDomain);
  if (isgResult) {
    return enrichWithPredictiveGraph({
      baslik: isgResult.baslik,
      zaman: isgResult.zaman_etiketi,
      tarih_iso: isgResult.tarih_iso,
      hazirlik_zamani: isgResult.hazirlik_zamani,
      action_items: isgResult.action_items,
      ikon: isgResult.ikon,
      renk: isgResult.renk,
      anomali_notu: isgResult.mevzuat_notu,
      sesli_fisilti: isgResult.sesli_geribildirim
    }, cleanInput, userDomain || 'ISG');
  }

  // 0.008 ÖNCELİK: SAVUNMA, ASKERİYE, POLİS & EMNİYET PROTOKOLÜ (DEFENSE & SECURITY ENGINE)
  // (CMK 91 Gözaltı & Fezleke, OYİ Kriminal Delil Zinciri, Adli Arama, Birlik İçtima & Tekmil,
  // Silahlık Sayımı & Doldur-Boşalt, Poligon Atış & Sıhhiye Ambulans, Kule Nöbeti & Parola-İşaret,
  // Kademe Zırhlı Araç, Jandarma Asayiş Timi, SCBA 300 Bar İtfaiye, 5188 Özel Güvenlik X-Ray)
  const defenseResult = parseDefenseSecurityIntent(cleanInput, baseDate, userDomain);
  if (defenseResult) {
    return enrichWithPredictiveGraph({
      baslik: defenseResult.baslik,
      zaman: defenseResult.zaman_etiketi,
      tarih_iso: defenseResult.tarih_iso,
      hazirlik_zamani: defenseResult.hazirlik_zamani,
      action_items: defenseResult.action_items,
      ikon: defenseResult.ikon,
      renk: defenseResult.renk,
      anomali_notu: defenseResult.mevzuat_notu,
      sesli_fisilti: defenseResult.sesli_geribildirim
    }, cleanInput, userDomain || 'SAVUNMA');
  }

  // 0.009 ÖNCELİK: SANAT, MEDYA, PRODÜKSİYON & SAHNE SANATLARI PROTOKOLÜ (ART & MEDIA ENGINE)
  // (Call sheet & set çekim planı, DIT çift SSD checksum, render/export & broadcast master -23 LUFS,
  // DaVinci Resolve color grading & LUT, konser soundcheck & RF tarama, ISRC & telif MESAM/MSG,
  // stüdyo fotoğrafı & RAW retouch, sergi vernisaj & fine art baskı, basın bülteni & ambargo,
  // canlı yayın rundown & LiveU, tiyatro genel prova & cue listesi, 5846 FSEK telif devri)
  const artMediaResult = parseArtMediaIntent(cleanInput, baseDate, userDomain);
  if (artMediaResult) {
    return enrichWithPredictiveGraph({
      baslik: artMediaResult.baslik,
      zaman: artMediaResult.zaman_etiketi,
      tarih_iso: artMediaResult.tarih_iso,
      hazirlik_zamani: artMediaResult.hazirlik_zamani,
      action_items: artMediaResult.action_items,
      ikon: artMediaResult.ikon,
      renk: artMediaResult.renk,
      anomali_notu: artMediaResult.mevzuat_notu,
      sesli_fisilti: artMediaResult.sesli_geribildirim
    }, cleanInput, userDomain || 'SANAT_MEDYA');
  }

  // 0.01 ÖNCELİK: DERİNLEŞTİRİLMİŞ MESLEKİ & KURUMSAL SENARYO MOTORU (ADVANCED PROFESSION ENGINE)
  // (TEFBİS, LGS/YKS Komisyonu, ASM Gebe-Bebek İzlem, 112 Nöbet/Narkotik, Arabuluculuk 3+1 Hafta,
  // İcra Kıymet Takdiri, YMM KDV İadesi/Karşıt İnceleme, Bağımsız Denetim KGK, ÇKS/TARSİM, TÜRKVET/Aşı, İSG İBYS, Yapı Denetim Demir Vizesi)
  const advProfResult = parseAdvancedProfessionIntent(cleanInput, baseDate);
  if (advProfResult) {
    return enrichWithPredictiveGraph({
      baslik: advProfResult.baslik,
      zaman: advProfResult.zaman_etiketi,
      tarih_iso: advProfResult.tarih_iso,
      action_items: advProfResult.action_items,
      ikon: advProfResult.ikon,
      renk: advProfResult.renk,
      anomali_notu: advProfResult.mevzuat_notu,
      sesli_fisilti: advProfResult.sesli_geribildirim
    }, cleanInput);
  }

  // ⚡ TEMEL İLKE: KULLANICIYA YAPAY İŞ ÇIKARMA (MİKRO GÖREV KURALI)
  // Tekil alarmlar, süreli sayaçlar ve 5 temel günlük yaşam çekirdeği doğrudan tespit edilir.
  const microCore = detectDailyLifeCoreOrSingleAlarm(cleanInput, baseDate);
  if (microCore) {
    return microCore;
  }

  // ⚡ RESMİ & AKADEMİK KURUM TAKVİMİ KONTROLÜ (MEB Ara Tatil, Adli Tatil, Vergi Günü)
  const instRef = resolveInstitutionalReference(cleanInput, baseDate);
  let instZaman: string | null = null;
  let instIso: string | null = null;
  let instNote: string | undefined = undefined;

  if (instRef.matched) {
    instZaman = instRef.displayTimeText || instRef.label;
    instIso = instRef.resolvedIso || null;
    instNote = instRef.officialNote;
  }

  const temporal = parseTurkishTemporal(cleanInput, baseDate);
  const { zaman: parsedZaman, tarih_iso: parsedIso, isRecurringDay, recurringDayName, hour, minute } = temporal;
  const zaman = instZaman || parsedZaman;
  const tarih_iso = instIso || parsedIso;
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
    const actionItems = (shortScenario.oncedenYapilacaklar && shortScenario.oncedenYapilacaklar.length > 0)
      ? shortScenario.oncedenYapilacaklar.map(task => ({ task, is_completed: false }))
      : [];

    const hasExplicitTime = !!(periodicIso || tarih_iso);
    const isCourtClarification = !hasExplicitTime && (
      shortScenario.id === 'hukuk_durusma_adliye' ||
      lower.includes('duruşma') || lower.includes('durusma')
    );
    const netlestirmeSorusu = isCourtClarification
      ? 'Hangi gün ve saatte adliyede olacaksınız?'
      : undefined;

    return enrichWithPredictiveGraph({
      baslik: shortScenario.baslik,
      zaman: isCourtClarification ? 'Tarih Belirlenmedi (Adliye)' : (periodicZaman || zaman || shortScenario.varsayilanZaman),
      tarih_iso: periodicIso || tarih_iso,
      eksik_bilgi: isCourtClarification ? true : undefined,
      netlestirme_sorusu: isCourtClarification ? netlestirmeSorusu : undefined,
      soru: isCourtClarification ? netlestirmeSorusu : undefined,
      action_items: actionItems,
      ikon: shortScenario.ikon,
      renk: shortScenario.renk,
      tetikleyici: tetikleyici || (shortScenario.tetikleyici ? {
        tip: shortScenario.tetikleyici.tip,
        sart: shortScenario.tetikleyici.sart,
        etiket: shortScenario.tetikleyici.etiket
      } : null),
      periyodik,
      anomali_notu: shortScenario.akilliFisilti,
      hazirlik_zamani: shortScenario.hazirlikZamani,
      sesli_fisilti: isCourtClarification ? netlestirmeSorusu : (shortScenario.akilliFisilti ? `${shortScenario.baslik} planlandı. ${shortScenario.akilliFisilti}` : undefined),
    }, cleanInput, activeDomain);
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
      const tradeResult = parseTradesmanLocalShopNote(cleanInput, baseDate, activeDomain);
      if (tradeResult) return enrichWithPredictiveGraph(tradeResult, cleanInput, activeDomain);
    } else if (activeDomain === 'OGRENCI') {
      const domainRuleResult = dispatchDomainRule('OGRENCI', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput, activeDomain);
      const studentResult = parseAcademicStudentSuiteNote(cleanInput, baseDate);
      if (studentResult) return enrichWithPredictiveGraph(studentResult, cleanInput, activeDomain);
      const eduResult = parseEduManagerNote(cleanInput, baseDate, activeDomain);
      if (eduResult) return enrichWithPredictiveGraph(eduResult, cleanInput, activeDomain);
    } else if (activeDomain === 'EGITIM') {
      const domainRuleResult = dispatchDomainRule('EGITIM', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput, activeDomain);
      const eduResult = parseEduManagerNote(cleanInput, baseDate, activeDomain);
      if (eduResult) return enrichWithPredictiveGraph(eduResult, cleanInput, activeDomain);
      const studentResult = parseAcademicStudentSuiteNote(cleanInput, baseDate);
      if (studentResult) return enrichWithPredictiveGraph(studentResult, cleanInput, activeDomain);
    } else if (activeDomain === 'GENEL' || activeDomain === 'CALISMIYORUM') {
      const domainRuleResult = dispatchDomainRule('GENEL', cleanInput, zaman, tarih_iso);
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
      const clinicalResult = parseHealthcareClinicalNote(cleanInput, baseDate, activeDomain);
      if (clinicalResult) return enrichWithPredictiveGraph(clinicalResult, cleanInput);
      const multiMedResult = parseMultiMedicationNote(cleanInput, baseDate);
      if (multiMedResult) return enrichWithPredictiveGraph(multiMedResult, cleanInput);
    } else if (activeDomain === 'EMNIYET' || activeDomain === 'SAVUNMA') {
      const domainRuleResult = dispatchDomainRule(activeDomain, cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput, activeDomain);
      const defRes = parseDefenseSecurityIntent(cleanInput, baseDate, activeDomain);
      if (defRes) {
        return enrichWithPredictiveGraph({
          baslik: defRes.baslik,
          zaman: defRes.zaman_etiketi,
          tarih_iso: defRes.tarih_iso,
          hazirlik_zamani: defRes.hazirlik_zamani,
          action_items: defRes.action_items,
          ikon: defRes.ikon,
          renk: defRes.renk,
          anomali_notu: defRes.mevzuat_notu,
          sesli_fisilti: defRes.sesli_geribildirim
        }, cleanInput, activeDomain);
      }
      const opResult = parseOperationSafetyEmergencyNote(cleanInput, baseDate);
      if (opResult) return enrichWithPredictiveGraph(opResult, cleanInput);
      const militaryResult = parseMilitaryCommanderNote(cleanInput, baseDate);
      if (militaryResult) return enrichWithPredictiveGraph(militaryResult, cleanInput);
    } else if (activeDomain === 'TEKNIK') {
      const domainRuleResult = dispatchDomainRule('TEKNIK', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput, activeDomain);
      const engResult = parseEngineeringSuiteNote(cleanInput, baseDate, activeDomain);
      if (engResult) return enrichWithPredictiveGraph(engResult, cleanInput, activeDomain);
    } else if (activeDomain === 'DENIZCILIK') {
      const domainRuleResult = dispatchDomainRule('DENIZCILIK', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput, activeDomain);
      const nauticalResult = parseMaritimeNauticalNote(cleanInput, baseDate, activeDomain);
      if (nauticalResult) return enrichWithPredictiveGraph(nauticalResult, cleanInput, activeDomain);
    } else if (activeDomain === 'LOJISTIK') {
      const domainRuleResult = dispatchDomainRule('LOJISTIK', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput, activeDomain);
      const logResult = parseLogisticsSupplyChainNote(cleanInput, baseDate, activeDomain);
      if (logResult) return enrichWithPredictiveGraph(logResult, cleanInput, activeDomain);
      const fallbackTech = parseProjectLogisticsFieldTechNote(cleanInput, baseDate);
      if (fallbackTech) return enrichWithPredictiveGraph(fallbackTech, cleanInput, activeDomain);
    } else if (activeDomain === 'HAVACILIK') {
      const logResult = parseProjectLogisticsFieldTechNote(cleanInput, baseDate);
      if (logResult) return enrichWithPredictiveGraph(logResult, cleanInput);
    } else if (activeDomain === 'KAMU' || activeDomain === 'KURUMSAL') {
      const domainRuleResult = dispatchDomainRule(activeDomain, cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput, activeDomain);
      const civilResult = parseCivilServantPublicOfficeNote(cleanInput, baseDate, activeDomain);
      if (civilResult) return enrichWithPredictiveGraph(civilResult, cleanInput, activeDomain);
      const corpResult = parseCorporateOfficePersonalCareNote(cleanInput, baseDate);
      if (corpResult) return enrichWithPredictiveGraph(corpResult, cleanInput, activeDomain);
    } else if (activeDomain === 'TICARET' || activeDomain === 'MALIYE') {
      const tradeResult = parseTradesmanLocalShopNote(cleanInput, baseDate, activeDomain);
      if (tradeResult) return enrichWithPredictiveGraph(tradeResult, cleanInput, activeDomain);
    } else if (activeDomain === 'EMLAK') {
      const domainRuleResult = dispatchDomainRule('EMLAK', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput);
      const reResult = parseRealEstateNote(cleanInput, baseDate, activeDomain);
      if (reResult) return enrichWithPredictiveGraph(reResult, cleanInput, activeDomain);
    } else if (activeDomain === 'ZIRAAT') {
      const domainRuleResult = dispatchDomainRule('ZIRAAT', cleanInput, zaman, tarih_iso);
      if (domainRuleResult) return enrichWithPredictiveGraph(domainRuleResult, cleanInput);
      const agriResult = parseAgricultureBotanyNote(cleanInput, baseDate, activeDomain);
      if (agriResult) return enrichWithPredictiveGraph(agriResult, cleanInput, activeDomain);
    } else if (activeDomain === 'VETERINER') {
      const vetResult = parseVeterinaryIntent(cleanInput, baseDate, activeDomain);
      if (vetResult) {
        return enrichWithPredictiveGraph({
          baslik: vetResult.baslik,
          zaman: vetResult.zaman_etiketi,
          tarih_iso: vetResult.tarih_iso,
          hazirlik_zamani: vetResult.hazirlik_zamani,
          action_items: vetResult.action_items,
          ikon: vetResult.ikon,
          renk: vetResult.renk,
          anomali_notu: vetResult.mevzuat_notu,
          sesli_fisilti: vetResult.sesli_geribildirim
        }, cleanInput, activeDomain);
      }
    } else if (activeDomain === 'ECZACILIK') {
      const pharmaResult = parsePharmacyIntent(cleanInput, baseDate, activeDomain);
      if (pharmaResult) {
        return enrichWithPredictiveGraph({
          baslik: pharmaResult.baslik,
          zaman: pharmaResult.zaman_etiketi,
          tarih_iso: pharmaResult.tarih_iso,
          hazirlik_zamani: pharmaResult.hazirlik_zamani,
          action_items: pharmaResult.action_items,
          ikon: pharmaResult.ikon,
          renk: pharmaResult.renk,
          anomali_notu: pharmaResult.mevzuat_notu,
          sesli_fisilti: pharmaResult.sesli_geribildirim
        }, cleanInput, activeDomain);
      }
    } else if (activeDomain === 'ISG') {
      const isgResult = parseOccupationalSafetyIntent(cleanInput, baseDate, activeDomain);
      if (isgResult) {
        return enrichWithPredictiveGraph({
          baslik: isgResult.baslik,
          zaman: isgResult.zaman_etiketi,
          tarih_iso: isgResult.tarih_iso,
          hazirlik_zamani: isgResult.hazirlik_zamani,
          action_items: isgResult.action_items,
          ikon: isgResult.ikon,
          renk: isgResult.renk,
          anomali_notu: isgResult.mevzuat_notu,
          sesli_fisilti: isgResult.sesli_geribildirim
        }, cleanInput, activeDomain);
      }
    } else if (activeDomain === 'SANAT_MEDYA') {
      const artMediaResult = parseArtMediaIntent(cleanInput, baseDate, activeDomain);
      if (artMediaResult) {
        return enrichWithPredictiveGraph({
          baslik: artMediaResult.baslik,
          zaman: artMediaResult.zaman_etiketi,
          tarih_iso: artMediaResult.tarih_iso,
          hazirlik_zamani: artMediaResult.hazirlik_zamani,
          action_items: artMediaResult.action_items,
          ikon: artMediaResult.ikon,
          renk: artMediaResult.renk,
          anomali_notu: artMediaResult.mevzuat_notu,
          sesli_fisilti: artMediaResult.sesli_geribildirim
        }, cleanInput, activeDomain);
      }
    } else if (activeDomain === 'KUAFOR' || activeDomain === 'GUZELLIK' || activeDomain === 'MUTFAK') {
      const corpResult = parseCorporateOfficePersonalCareNote(cleanInput, baseDate);
      if (corpResult) return enrichWithPredictiveGraph(corpResult, cleanInput, activeDomain);
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
  // Kesin Yasaklı / İdari Kalkan: İdari, resmi, okul/kurum kelimeleri varsa alışveriş/liste motorunu baypas et
  if (!isAdministrativeContext(cleanInput) && (lower.includes('alınacak') || lower.includes('market') || lower.includes('liste') || lower.includes('bakkal') || lower.includes('pazar') || cleanInput.includes('\n'))) {
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
    lower.includes('buluş') || lower.includes('bulus') ||
    lower.includes('randevu') ||
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
    const isClarificationNeeded = !hasExplicitTime && (
      lower.includes('randevu') || lower.includes('görüş') || lower.includes('gorus') ||
      lower.includes('buluş') || lower.includes('bulus') || lower.includes('toplantı') || lower.includes('toplanti')
    );
    const meetingQuestion = (lower.includes('buluş') || lower.includes('bulus'))
      ? 'Hangi gün ve saatte buluşacaksınız?'
      : 'Hangi gün ve saatte planlayalım?';

    return enrichWithPredictiveGraph({
      baslik: baslik.slice(0, 32),
      zaman: isClarificationNeeded ? 'Tarih Belirlenmedi (Buluşma/Toplantı)' : (periodicZaman || zaman || 'Planlanan Toplantı'),
      tarih_iso: isClarificationNeeded ? null : (periodicIso || tarih_iso),
      eksik_bilgi: isClarificationNeeded ? true : undefined,
      netlestirme_sorusu: isClarificationNeeded ? meetingQuestion : undefined,
      soru: isClarificationNeeded ? meetingQuestion : undefined,
      ikon,
      renk,
      tetikleyici,
      periyodik,
      sesli_fisilti: isClarificationNeeded ? meetingQuestion : undefined,
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
  const eduResult = parseEduManagerNote(cleanInput, baseDate, activeDomain);
  if (eduResult) {
    return enrichWithPredictiveGraph(eduResult, cleanInput, activeDomain);
  }

  // 4.5. ÖNCELİK: ÖĞRENCİ & AKADEMİK YAŞAM MOTORU (STUDENT & ACADEMIC SUITE)
  const studentResult = parseAcademicStudentSuiteNote(cleanInput, baseDate);
  if (studentResult) {
    return enrichWithPredictiveGraph(studentResult, cleanInput);
  }

  // 5. ÖNCELİK: KAMU VE DEVLET MEMURU MOTORU (CIVIL SERVANT & PUBLIC OFFICE ENGINE)
  const civilServantResult = parseCivilServantPublicOfficeNote(cleanInput, baseDate, activeDomain);
  if (civilServantResult) {
    return enrichWithPredictiveGraph(civilServantResult, cleanInput, activeDomain);
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

  // 7.5. ÖNCELİK: DENİZCİLİK & GEMİ İDARESİ MOTORU (MARITIME & NAUTICAL SUITE)
  const maritimeResult = parseMaritimeNauticalNote(cleanInput, baseDate, activeDomain);
  if (maritimeResult) {
    return enrichWithPredictiveGraph(maritimeResult, cleanInput, activeDomain);
  }

  // 7.8. ÖNCELİK: LOJİSTİK, TAŞIMACILIK & TEDARİK ZİNCİRİ MOTORU (LOGISTICS & SUPPLY CHAIN SUITE)
  const logisticsResult = parseLogisticsSupplyChainNote(cleanInput, baseDate, activeDomain);
  if (logisticsResult) {
    return enrichWithPredictiveGraph(logisticsResult, cleanInput, activeDomain);
  }

  // 8. ÖNCELİK: PROJE, LOJİSTİK VE SAHA TEKNOLOJİSİ (MİMAR, ŞOFÖR, TEKNİSYEN)
  const projLogisticsResult = parseProjectLogisticsFieldTechNote(cleanInput, baseDate);
  if (projLogisticsResult) {
    return enrichWithPredictiveGraph(projLogisticsResult, cleanInput);
  }

  // 9. ÖNCELİK: ESNAF VE KÜÇÜK İŞLETME MOTORU (TRADESMAN & LOCAL SHOP ENGINE)
  const tradesmanResult = parseTradesmanLocalShopNote(cleanInput, baseDate, activeDomain);
  if (tradesmanResult) {
    return enrichWithPredictiveGraph(tradesmanResult, cleanInput, activeDomain);
  }

  // 9.2. ÖNCELİK: GAYRİMENKUL & EMLAK MOTORU (REAL ESTATE & PROPERTY MANAGEMENT ENGINE)
  const realEstateResult = parseRealEstateNote(cleanInput, baseDate, activeDomain);
  if (realEstateResult) {
    return enrichWithPredictiveGraph(realEstateResult, cleanInput, activeDomain);
  }

  // 9.3. ÖNCELİK: ZİRAAT & BOTANİK MOTORU (AGRICULTURE & BOTANY ENGINE)
  const agriResult = parseAgricultureBotanyNote(cleanInput, baseDate, activeDomain);
  if (agriResult) {
    return enrichWithPredictiveGraph(agriResult, cleanInput, activeDomain);
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
  const clinicalResult = parseHealthcareClinicalNote(cleanInput, baseDate, activeDomain);
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
function enrichWithPredictiveGraph(note: NotiviaSimpleNote, input: string, userDomain?: string): NotiviaSimpleNote {
  // ⚡ TEMEL İLKE: KULLANICIYA YAPAY İŞ ÇIKARMA (MİKRO GÖREV KURALI)
  // Tekil alarmlar ve mikro-görevlere yapay alt görevler veya tersine hazırlık adımları eklenmez!
  if (note.isAlarm || note.isMicroTask) {
    return note;
  }

  const predictive = inferPredictiveActions(input, new Date(), userDomain);
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

  // 6. Sayısal Parametre ve Varlık Çıkarımı (Entity & Metric Extraction)
  if (!result.extracted_metrics || result.extracted_metrics.length === 0) {
    const metrics = extractEntityMetrics(input);
    if (metrics.length > 0) {
      result.extracted_metrics = metrics;
    }
  }

  // 7. Çok Aşamalı Süreç Zinciri (Sequential Milestone Chain)
  if (!result.milestone_chain) {
    const chain = detectMilestoneChain(input, result.tarih_iso ? new Date(result.tarih_iso) : new Date());
    if (chain) {
      result.milestone_chain = chain;
    }
  }

  // 8. Proaktif Bir Sonraki Adım Önerisi (Next Action Dispatcher)
  if (!result.next_action) {
    const nextAction = generateNextActionSuggestion(result.baslik, undefined, input);
    if (nextAction) {
      result.next_action = nextAction;
    }
  }

  return result;
}
