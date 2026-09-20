import type { ProfessionDomain } from '../types/domainThemes.ts';
import { detectDomainFromJargon } from './jargonRadar.ts';
import { DOMAIN_REGISTRY } from '../types/domainThemes.ts';
import type { SimpleCardItem } from '../App.tsx';

export interface IntentRouteInfo {
  domain: ProfessionDomain;
  domainLabel: string;
  routeTitle: string;
  institution: string;
  matchedKeyword: string;
  icon: string;
  color: string;
  badgeHex: string;
  confidence: number;
  hasActiveMatch: boolean;
  clarificationPrompt?: string;
}

export type IntentRouteResult = IntentRouteInfo;

export interface JargonChip {
  label: string;
  chipText?: string;
  domain: ProfessionDomain;
  icon: string;
  routeTitle: string;
  institution: string;
  fullPrompt: string;
  prompt?: string;
}

// 2 Kelimelik Akıllı Tamamlayıcı Çipler (Instant Jargon Chips)
export const INSTANT_JARGON_CHIPS: JargonChip[] = [
  // Hukuk
  {
    label: 'Tebligat geldi',
    domain: 'HUKUK',
    icon: '⚖️',
    routeTitle: 'Tebligat Kanunu 7/a & İtiraz Süreci',
    institution: 'Adalet Bakanlığı / UYAP',
    fullPrompt: 'UYAP tebligatı geldi'
  },
  {
    label: 'Duruşma var',
    domain: 'HUKUK',
    icon: '🏛️',
    routeTitle: 'Adliye Mahkeme Duruşması',
    institution: 'Adalet Bakanlığı / Adliye',
    fullPrompt: 'Duruşma var'
  },
  {
    label: 'Mazeret dilekçesi',
    domain: 'HUKUK',
    icon: '⚖️',
    routeTitle: 'Çakışan Duruşma Mazereti',
    institution: 'Adalet Bakanlığı / UYAP',
    fullPrompt: 'Mazeret dilekçesi gönder'
  },
  // Mühendislik / Şantiye
  {
    label: 'Küp kırımı',
    domain: 'MUHENDISLIK',
    icon: '🏗️',
    routeTitle: '7/28 Gün Laboratuvar Testi',
    institution: 'Çevre ve Şehircilik / Yapı Denetim',
    fullPrompt: 'Beton döküldü küp kırımı testi'
  },
  {
    label: 'Demir vizesi',
    domain: 'MUHENDISLIK',
    icon: '🏗️',
    routeTitle: 'Donatı İmalat Kontrolü',
    institution: 'Yapı Denetim Kuruluşu',
    fullPrompt: 'Demir vizesi yapı denetim kontrolü'
  },
  // Veterinerlik
  {
    label: 'CMT yaptık',
    domain: 'VETERINER',
    icon: '🧪',
    routeTitle: 'Mastitis CMT & Karantina',
    institution: 'Tarım ve Orman Bakanlığı',
    fullPrompt: 'Sürüde CMT yaptık mastitis tespiti'
  },
  {
    label: 'Kuduz titrasyon',
    domain: 'VETERINER',
    icon: '🐾',
    routeTitle: 'Kuduz Titrasyon (RNATT)',
    institution: 'Tarım ve Orman / Yetkili Lab',
    fullPrompt: 'Kuduz titrasyon kan alımı ve RNATT testi'
  },
  // Otomotiv / Sanayi
  {
    label: 'Araç muayene',
    domain: 'TEKNIK',
    icon: '🚗',
    routeTitle: 'Araç Muayene & Kusur Taraması',
    institution: 'TÜVTÜRK / Ulaştırma Bak.',
    fullPrompt: 'Araç muayene randevusu ve borç sorgusu'
  },
  {
    label: 'Balata değişti',
    domain: 'TEKNIK',
    icon: '🔧',
    routeTitle: 'Fren Balata & 48 Saat Kontrolü',
    institution: 'Yetkili Servis / Usta',
    fullPrompt: 'Ön fren balatası değişti 48 saat sonra kontrol'
  },
  // Sağlık / Klinik
  {
    label: 'İlaç order',
    domain: 'SAGLIK',
    icon: '🩺',
    routeTitle: 'İlaç Order & 5 Doğru Kuralı',
    institution: 'Sağlık Bakanlığı / Klinik',
    fullPrompt: 'Hastaya ilaç order verildi'
  },
  {
    label: 'Dişçiye gideceğim',
    domain: 'SAGLIK',
    icon: '🦷',
    routeTitle: 'Diş Hekimi Muayene Randevusu',
    institution: 'Ağız ve Diş Sağlığı Merkezi',
    fullPrompt: 'Dişçiye gideceğim'
  },
  {
    label: 'Epikriz yaz',
    domain: 'SAGLIK',
    icon: '📋',
    routeTitle: 'Taburculuk Epikriz Raporu',
    institution: 'Sağlık Bakanlığı / E-Nabız',
    fullPrompt: 'Hasta taburcu oldu epikriz yazılacak'
  },
  // Mali Müşavir / Finans
  {
    label: 'KDV beyannamesi',
    domain: 'MALIYE',
    icon: '📊',
    routeTitle: 'KDV & MUHSGK Beyanname Onayı',
    institution: 'Gelir İdaresi Başkanlığı (GİB)',
    fullPrompt: 'KDV beyannamesi ve fatura dökümü'
  },
  {
    label: 'e-Defter beratı',
    domain: 'MALIYE',
    icon: '📈',
    routeTitle: 'e-Defter Berat Yüklemesi',
    institution: 'Gelir İdaresi Başkanlığı (GİB)',
    fullPrompt: 'e-Defter beratı onay ve yükleme'
  },
  // Eczacılık
  {
    label: 'Medula dökümü',
    domain: 'ECZACILIK',
    icon: '📑',
    routeTitle: 'SGK Medula Fatura & Koli',
    institution: 'SGK SSGM / Medula',
    fullPrompt: 'Medula SGK fatura sonlandırma ve reçete dökümü'
  },
  {
    label: 'Soğuk zincir',
    domain: 'ECZACILIK',
    icon: '❄️',
    routeTitle: '2-8°C Aşı Dolabı Isı Takibi',
    institution: 'İlçe Sağlık Müdürlüğü / TİTCK',
    fullPrompt: '2-8 derece soğuk zincir ısı takip çizelgesi'
  },
  // İSG
  {
    label: 'Ramak kala',
    domain: 'ISG',
    icon: '⚠️',
    routeTitle: 'Ramak Kala Olayı & DÖF Başlatma',
    institution: 'ÇSGB / İBYS Takip Sistemi',
    fullPrompt: 'Ramak kala olayı tutanağı ve DÖF başlat'
  },
  {
    label: 'İş kazası',
    domain: 'ISG',
    icon: '⏱️',
    routeTitle: 'SGK 3 İş Günü Yasal Bildirimi',
    institution: 'Sosyal Güvenlik Kurumu (SGK)',
    fullPrompt: 'İş kazası oldu SGK bildirim süresi'
  },
  // Ziraat
  {
    label: 'ÇKS yenile',
    domain: 'ZIRAAT',
    icon: '🌾',
    routeTitle: 'ÇKS Dosya & Destekleme Başvurusu',
    institution: 'Tarım İl/İlçe Md. / Ziraat Odası',
    fullPrompt: 'ÇKS yenileme ve TARSİM sigorta başvurusu'
  },
  // Eğitim
  {
    label: 'Ek ders',
    domain: 'EGITIM',
    icon: '📋',
    routeTitle: 'KBS Ek Ders & Puantaj Onayı',
    institution: 'Milli Eğitim Bak. / KBS & DYS',
    fullPrompt: 'KBS ek ders onay ve nöbet puantajı'
  },
  {
    label: 'Nöbet defteri',
    domain: 'EGITIM',
    icon: '📚',
    routeTitle: 'Okul Kat & Bahçe Nöbet İmzası',
    institution: 'Milli Eğitim Bakanlığı / İdare',
    fullPrompt: 'Sabah nöbet defteri imzalama ve kat emniyeti'
  }
];

// Belirlenen anahtar kelimelere göre tam kurumsal rota eşleme sözlüğü
interface RoutePattern {
  keywords: string[];
  routeTitle: string;
  institution: string;
  domain: ProfessionDomain;
  icon: string;
  badgeHex: string;
}

const ROUTE_PATTERNS: RoutePattern[] = [
  // Veteriner
  {
    keywords: ['kuduz titrasyon', 'rnatt', 'titrasyon'],
    routeTitle: 'Kuduz Titrasyon (RNATT)',
    institution: 'Tarım ve Orman Bakanlığı',
    domain: 'VETERINER',
    icon: '🐾',
    badgeHex: '#FED7AA'
  },
  {
    keywords: ['cmt', 'mastitis', 'süt karantina'],
    routeTitle: 'Mastitis CMT & Süt Karantinası',
    institution: 'İlçe Tarım / Süt Birliği',
    domain: 'VETERINER',
    icon: '🧪',
    badgeHex: '#FED7AA'
  },
  {
    keywords: ['petvet', 'mikroçip', 'türkvet', 'küpe'],
    routeTitle: 'TÜRKVET / PETVET Çip & Kayıt',
    institution: 'Tarım ve Orman Bakanlığı',
    domain: 'VETERINER',
    icon: '🐶',
    badgeHex: '#FED7AA'
  },

  // Mali Müşavir / Vergi
  {
    keywords: ['kdv', 'muhsgk', 'muhtasar', 'beyanname'],
    routeTitle: 'KDV & MUHSGK Beyannamesi',
    institution: 'Gelir İdaresi Başkanlığı (GİB)',
    domain: 'MALIYE',
    icon: '📊',
    badgeHex: '#DCFCE7'
  },
  {
    keywords: ['e-defter', 'edefter', 'berat'],
    routeTitle: 'e-Defter Berat Yüklemesi',
    institution: 'Gelir İdaresi Başkanlığı (GİB)',
    domain: 'MALIYE',
    icon: '📈',
    badgeHex: '#DCFCE7'
  },

  // Hukuk
  {
    keywords: ['tebligat', '7/a', 'tebliğ'],
    routeTitle: 'Tebligat Kanunu 7/a (5 Gün İtiraz)',
    institution: 'Adalet Bakanlığı / UYAP',
    domain: 'HUKUK',
    icon: '⚖️',
    badgeHex: '#E0E7FF'
  },
  {
    keywords: ['duruşma', 'duruşmam', 'mahkeme', 'celse', 'adliye'],
    routeTitle: 'UYAP Adliye Duruşması',
    institution: 'Adalet Bakanlığı / Adliye',
    domain: 'HUKUK',
    icon: '🏛️',
    badgeHex: '#E0E7FF'
  },
  {
    keywords: ['mazeret', 'mazeret dilekçesi'],
    routeTitle: 'Duruşma Mazeret Dilekçesi',
    institution: 'Adalet Bakanlığı / UYAP',
    domain: 'HUKUK',
    icon: '⚖️',
    badgeHex: '#E0E7FF'
  },
  {
    keywords: ['89/1', '89/2', 'icra', 'haciz'],
    routeTitle: 'İcra İflas Haciz İhbarnamesi (89/1)',
    institution: 'İcra Dairesi / UYAP',
    domain: 'HUKUK',
    icon: '💼',
    badgeHex: '#E0E7FF'
  },

  // Eczacılık
  {
    keywords: ['medula', 'reçete koli', 'ssgm', 'sut'],
    routeTitle: 'Medula SGK Fatura Sonlandırma',
    institution: 'SGK SSGM / TİTCK',
    domain: 'ECZACILIK',
    icon: '📑',
    badgeHex: '#FEE2E2'
  },
  {
    keywords: ['soğuk zincir', 'soguk zincir', 'aşı dolabı', '2-8'],
    routeTitle: '2-8°C Soğuk Zincir & Isı Takibi',
    institution: 'İlçe Sağlık Müdürlüğü / TİTCK',
    domain: 'ECZACILIK',
    icon: '❄️',
    badgeHex: '#E0F2FE'
  },
  {
    keywords: ['majistral', 'havan', 'farmakope'],
    routeTitle: 'Majistral Formül & Lab Defteri',
    institution: 'TİTCK / Eczacılık Lab.',
    domain: 'ECZACILIK',
    icon: '⚗️',
    badgeHex: '#EDE9FE'
  },
  {
    keywords: ['rrs', 'renkli reçete', 'kırmızı reçete', 'yeşil reçete'],
    routeTitle: 'Renkli Reçete (RRS) & İTS Bildirimi',
    institution: 'TİTCK / E-Reçete RRS',
    domain: 'ECZACILIK',
    icon: '💊',
    badgeHex: '#FEE2E2'
  },

  // İSG
  {
    keywords: ['ramak kala', 'döf'],
    routeTitle: 'Ramak Kala Olayı & DÖF Süreci',
    institution: 'ÇSGB / İBYS',
    domain: 'ISG',
    icon: '⚠️',
    badgeHex: '#FEE2E2'
  },
  {
    keywords: ['iş kazası', 'is kazasi', 'sgk bildirim'],
    routeTitle: 'SGK İş Kazası (3 İş Günü)',
    institution: 'Sosyal Güvenlik Kurumu (SGK)',
    domain: 'ISG',
    icon: '⏱️',
    badgeHex: '#FEE2E2'
  },
  {
    keywords: ['ibys', 'isg-katip', 'isg katip', 'çalışan eğitimi'],
    routeTitle: 'İBYS Yasal Çalışan Eğitimi',
    institution: 'ÇSGB / İSG-KATİP',
    domain: 'ISG',
    icon: '🦺',
    badgeHex: '#FEF3C7'
  },

  // Mühendislik / Şantiye
  {
    keywords: ['küp kırımı', 'kup kirimi', 'beton', 'kürleme'],
    routeTitle: '7/28 Gün Laboratuvar Kırımı',
    institution: 'Çevre ve Şehircilik / Yapı Denetim',
    domain: 'MUHENDISLIK',
    icon: '🏗️',
    badgeHex: '#FEF3C7'
  },
  {
    keywords: ['loto', 'trafo', 'kompanzasyon', 'yüksek gerilim'],
    routeTitle: 'LOTO Kilitleme & Yüksek Gerilim',
    institution: 'TEİAŞ / TEDAŞ / İSG',
    domain: 'MUHENDISLIK',
    icon: '⚡',
    badgeHex: '#FEE2E2'
  },

  // Sağlık
  {
    keywords: ['dişçi', 'disci', 'diş hekim', 'dis hekim', 'kanal tedavi'],
    routeTitle: 'Diş Hekimi Muayene Randevusu',
    institution: 'Ağız ve Diş Sağlığı Merkezi',
    domain: 'SAGLIK',
    icon: '🦷',
    badgeHex: '#E0F2FE'
  },
  {
    keywords: ['order', 'ilaç order', 'ilac order'],
    routeTitle: 'İlaç Order & 5 Doğru Kuralı',
    institution: 'Sağlık Bakanlığı / Klinik',
    domain: 'SAGLIK',
    icon: '🩺',
    badgeHex: '#E0F2FE'
  },
  {
    keywords: ['epikriz', 'taburcu', 'konsültasyon'],
    routeTitle: 'Epikriz Raporu & Konsültasyon',
    institution: 'Sağlık Bakanlığı / E-Nabız',
    domain: 'SAGLIK',
    icon: '📋',
    badgeHex: '#E0F2FE'
  },

  // Eğitim
  {
    keywords: ['kbs', 'ek ders', 'puantaj'],
    routeTitle: 'KBS Ek Ders & Puantaj Onayı',
    institution: 'Milli Eğitim Bak. / KBS',
    domain: 'EGITIM',
    icon: '📋',
    badgeHex: '#FEF3C7'
  },
  {
    keywords: ['nöbet defteri', 'nobet defteri', 'nöbet'],
    routeTitle: 'Nöbet Defteri & Kat Emniyeti',
    institution: 'Milli Eğitim Bakanlığı',
    domain: 'EGITIM',
    icon: '📚',
    badgeHex: '#FEF08A'
  },

  // Ziraat
  {
    keywords: ['çks', 'tarsim', 'gübreleme', 'ilaçlama'],
    routeTitle: 'ÇKS Yenileme & TARSİM Sigortası',
    institution: 'Tarım İl/İlçe Md. / TARSİM',
    domain: 'ZIRAAT',
    icon: '🌾',
    badgeHex: '#FEF3C7'
  },

  // Otomotiv
  {
    keywords: ['araç muayene', 'arac muayene', 'tüvtürk', 'tuvturk'],
    routeTitle: 'TÜVTÜRK Araç Muayene & Kusur',
    institution: 'TÜVTÜRK / Ulaştırma Bak.',
    domain: 'TEKNIK',
    icon: '🚗',
    badgeHex: '#FED7AA'
  },
  {
    keywords: ['balata', 'yağ bakımı', 'obd', 'arıza kodu'],
    routeTitle: 'Fren & Mekanik 48 Saat Kontrolü',
    institution: 'Oto Sanayi / Servis',
    domain: 'TEKNIK',
    icon: '🔧',
    badgeHex: '#FEF3C7'
  },

  // Savunma & Emniyet
  {
    keywords: ['gözaltı', 'gozalti', 'fezleke', 'nezarethane', 'cmk 91', 'yakalama'],
    routeTitle: 'CMK 91 Gözaltı (24s) & Savcılık Fezlekesi',
    institution: 'Emniyet Genel Müdürlüğü / Adalet Bakanlığı',
    domain: 'SAVUNMA',
    icon: '👮',
    badgeHex: '#BFDBFE'
  },
  {
    keywords: ['olay yeri', 'oyi', 'balistik', 'delil torbası', 'parmak izi'],
    routeTitle: 'Olay Yeri İnceleme & Delil Güvenliği',
    institution: 'Kriminal Polis Laboratuvarı (KPL)',
    domain: 'SAVUNMA',
    icon: '🔍',
    badgeHex: '#BFDBFE'
  },
  {
    keywords: ['içtima', 'tekmil', 'silahlık', 'doldur boşalt', 'mühimmat'],
    routeTitle: 'Askeri İçtima & Silahlık Devir-Teslim',
    institution: 'Milli Savunma Bakanlığı (TSK)',
    domain: 'SAVUNMA',
    icon: '🪖',
    badgeHex: '#E2E8D5'
  },
  {
    keywords: ['scba', 'arazöz', 'yangın nöbeti', 'itfaiye'],
    routeTitle: 'İtfaiye SCBA 300 Bar & Arazöz Nöbet Devri',
    institution: 'İtfaiye Daire Başkanlığı',
    domain: 'SAVUNMA',
    icon: '🚒',
    badgeHex: '#FECACA'
  },
  {
    keywords: ['5188', 'özel güvenlik', 'x-ray', 'kapı dedektörü'],
    routeTitle: '5188 ÖGG Kontrol & X-Ray Güvenlik',
    institution: 'Özel Güvenlik Denetleme Başkanlığı',
    domain: 'SAVUNMA',
    icon: '🛡️',
    badgeHex: '#BFDBFE'
  }
];

const DOMAIN_INSTITUTIONS: Record<string, { label: string; institution: string; icon: string; badgeHex: string; defaultRoute: string }> = {
  HUKUK: {
    label: 'Hukuk / Avukat',
    institution: 'Adalet Bakanlığı / UYAP',
    icon: '⚖️',
    badgeHex: '#E0E7FF',
    defaultRoute: 'UYAP Dava & Takip İşlemi'
  },
  MALIYE: {
    label: 'Mali Müşavir / SMMM',
    institution: 'Gelir İdaresi Başkanlığı (GİB)',
    icon: '📊',
    badgeHex: '#DCFCE7',
    defaultRoute: 'Beyanname & Vergi Süreci'
  },
  VETERINER: {
    label: 'Veteriner Hekim',
    institution: 'Tarım ve Orman Bakanlığı',
    icon: '🐾',
    badgeHex: '#FED7AA',
    defaultRoute: 'Klinik Sağlık & Teşhis Protokolü'
  },
  ECZACILIK: {
    label: 'Eczacılık / SUT',
    institution: 'SGK SSGM / TİTCK',
    icon: '💊',
    badgeHex: '#FEE2E2',
    defaultRoute: 'Medula & İTS Eczane İşlemi'
  },
  ISG: {
    label: 'İş Sağlığı & Güvenliği',
    institution: 'ÇSGB / İBYS Takip Sistemi',
    icon: '🦺',
    badgeHex: '#FEF3C7',
    defaultRoute: 'İSG Yasal Bildirim & Denetim'
  },
  MUHENDISLIK: {
    label: 'İnşaat / Mühendislik',
    institution: 'Çevre ve Şehircilik / Yapı Denetim',
    icon: '🏗️',
    badgeHex: '#FEF3C7',
    defaultRoute: 'Teknik Standart & Şantiye Takibi'
  },
  SAGLIK: {
    label: 'Sağlık / Hekimlik',
    institution: 'Sağlık Bakanlığı / E-Nabız',
    icon: '🩺',
    badgeHex: '#E0F2FE',
    defaultRoute: 'Klinik Protokol & Hasta Takibi'
  },
  EGITIM: {
    label: 'Eğitim / MEB İdare',
    institution: 'Milli Eğitim Bakanlığı / MEBBİS',
    icon: '📚',
    badgeHex: '#FEF08A',
    defaultRoute: 'DYS & e-Okul Resmi Süreci'
  },
  ZIRAAT: {
    label: 'Ziraat & Tarım',
    institution: 'Tarım ve Orman / Ziraat Odası',
    icon: '🌾',
    badgeHex: '#FEF3C7',
    defaultRoute: 'Tarımsal Üretim & ÇKS Protokolü'
  },
  TEKNIK: {
    label: 'Otomotiv & Sanayi',
    institution: 'TÜVTÜRK / Yetkili Servis',
    icon: '🔧',
    badgeHex: '#FED7AA',
    defaultRoute: 'Periyodik Bakım & Test Süreci'
  },
  SAVUNMA: {
    label: 'Savunma, Emniyet & Askeriye',
    institution: 'İçişleri (EGM/JGK) / MSB (TSK)',
    icon: '👮',
    badgeHex: '#BFDBFE',
    defaultRoute: 'Asayiş, Savunma & Operasyonel Protokol'
  },
  KAMU: {
    label: 'Kamu & Resmi Kurum',
    institution: 'Resmi Kurum / EBYS & Belgenet',
    icon: '🏛️',
    badgeHex: '#FEF9C3',
    defaultRoute: 'EBYS Resmi Yazışma & Onay'
  },
  GENEL: {
    label: 'Bilişsel Asistan',
    institution: 'Notivia Akıllı Yönlendirici',
    icon: '⚡',
    badgeHex: '#F3F4F6',
    defaultRoute: 'Kişisel Yaşam Asistanı'
  }
};

/**
 * 0 ms Deterministik Niyet ve Hedef Kurum Sezici (Interactive Intent Route Radar)
 */
export function detectIntentRoute(
  text: string,
  currentDomain?: ProfessionDomain
): IntentRouteInfo {
  const clean = (text || '').trim().toLocaleLowerCase('tr-TR');
  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Önce doğrudan yüksek hassasiyetli RoutePattern eşleşmesi
  for (const p of ROUTE_PATTERNS) {
    for (const kw of p.keywords) {
      if (clean.includes(kw)) {
        const domInfo = DOMAIN_INSTITUTIONS[p.domain] || DOMAIN_INSTITUTIONS.GENEL;
        return {
          domain: p.domain,
          domainLabel: domInfo.label,
          routeTitle: p.routeTitle,
          institution: p.institution,
          matchedKeyword: kw,
          icon: p.icon,
          color: domInfo.badgeHex,
          badgeHex: p.badgeHex,
          confidence: 0.95,
          hasActiveMatch: true
        };
      }
    }
  }

  // 2. Jargon Radar Taraması
  const radar = detectDomainFromJargon(clean);
  const effectiveDomain: ProfessionDomain = 
    radar.confidence >= 0.4 ? radar.detectedDomain : (currentDomain && currentDomain !== 'GENEL' && currentDomain !== 'SADE' ? currentDomain : 'GENEL');
  
  const domInfo = DOMAIN_INSTITUTIONS[effectiveDomain] || DOMAIN_INSTITUTIONS.GENEL;

  if (radar.confidence >= 0.4 && radar.matchedKeywords.length > 0) {
    const kw = radar.matchedKeywords[0];
    const capitalizedKw = kw.charAt(0).toLocaleUpperCase('tr-TR') + kw.slice(1);
    return {
      domain: effectiveDomain,
      domainLabel: domInfo.label,
      routeTitle: capitalizedKw,
      institution: domInfo.institution,
      matchedKeyword: kw,
      icon: radar.suggestedIcon || domInfo.icon,
      color: radar.suggestedColor || domInfo.badgeHex,
      badgeHex: domInfo.badgeHex,
      confidence: radar.confidence,
      hasActiveMatch: true
    };
  }

  // 3. En az 2 kelime yazıldıysa fakat tam jargon bulunamadıysa: Aktif sektöre göre anında rota belirle
  if (wordCount >= 2) {
    const previewWords = words.slice(0, 3).map(w => w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1)).join(' ');
    return {
      domain: effectiveDomain,
      domainLabel: domInfo.label,
      routeTitle: previewWords,
      institution: domInfo.institution,
      matchedKeyword: words[0],
      icon: domInfo.icon,
      color: domInfo.badgeHex,
      badgeHex: domInfo.badgeHex,
      confidence: 0.70,
      hasActiveMatch: true
    };
  }

  // Eşleşme yok veya 1 kelime
  return {
    domain: effectiveDomain,
    domainLabel: domInfo.label,
    routeTitle: domInfo.defaultRoute,
    institution: domInfo.institution,
    matchedKeyword: '',
    icon: domInfo.icon,
    color: domInfo.badgeHex,
    badgeHex: domInfo.badgeHex,
    confidence: 0.1,
    hasActiveMatch: false
  };
}

/**
 * Eksik Bilgi Netleştirme Seçenekleri (Interactive IVR Quick Options)
 * Kullanıcının tek dokunuşla "Yarın sabah 09:30", "Pazartesi" gibi seçeneklerle boşluğu doldurmasını sağlar.
 */
export interface ClarificationOption {
  label: string;
  displayZaman: string;
  dateIso: string;
  icon: string;
}

export function getQuickClarificationOptions(baseDate: Date = new Date()): ClarificationOption[] {
  const options: ClarificationOption[] = [];

  // 1. Yarın Sabah 09:30
  const tomorrowMorning = new Date(baseDate);
  tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
  tomorrowMorning.setHours(9, 30, 0, 0);
  options.push({
    label: 'Yarın sabah 09:30',
    displayZaman: 'Yarın 09:30',
    dateIso: tomorrowMorning.toISOString(),
    icon: '☀️'
  });

  // 2. Yarın Öğleden Sonra 14:00
  const tomorrowAfternoon = new Date(baseDate);
  tomorrowAfternoon.setDate(tomorrowAfternoon.getDate() + 1);
  tomorrowAfternoon.setHours(14, 0, 0, 0);
  options.push({
    label: 'Yarın 14:00',
    displayZaman: 'Yarın 14:00',
    dateIso: tomorrowAfternoon.toISOString(),
    icon: '🌤️'
  });

  // 3. Gelecek Pazartesi 09:30
  const monday = new Date(baseDate);
  const currentDay = monday.getDay(); // 0: Pazar, 1: Pzt, ...
  const daysUntilMonday = currentDay === 1 ? 7 : (8 - currentDay) % 7 || 7;
  monday.setDate(monday.getDate() + daysUntilMonday);
  monday.setHours(9, 30, 0, 0);
  options.push({
    label: 'Pazartesi 09:30',
    displayZaman: 'Pazartesi 09:30',
    dateIso: monday.toISOString(),
    icon: '📅'
  });

  // 4. Bu Cuma 14:30
  const friday = new Date(baseDate);
  const daysUntilFriday = (5 - friday.getDay() + 7) % 7 || 7;
  friday.setDate(friday.getDate() + daysUntilFriday);
  friday.setHours(14, 30, 0, 0);
  options.push({
    label: 'Bu Cuma 14:30',
    displayZaman: 'Cuma 14:30',
    dateIso: friday.toISOString(),
    icon: '🗓️'
  });

  // 5. 3 Gün Sonra 11:00
  const threeDaysLater = new Date(baseDate);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  threeDaysLater.setHours(11, 0, 0, 0);
  options.push({
    label: '3 Gün Sonra',
    displayZaman: '3 Gün Sonra (11:00)',
    dateIso: threeDaysLater.toISOString(),
    icon: '⏱️'
  });

  return options;
}
