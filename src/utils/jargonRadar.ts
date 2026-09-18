import type { ProfessionDomain } from '../types/domainThemes.ts';

export interface JargonDetectionResult {
  detectedDomain: ProfessionDomain;
  confidence: number; // 0.0 - 1.0
  matchedKeywords: string[];
  suggestedIcon: string;
  suggestedColor: string;
  implicitHour?: number;
  implicitMinute?: number;
  reason?: string;
}

interface DomainRule {
  domain: ProfessionDomain;
  defaultIcon: string;
  defaultColor: string;
  // Kesin ayırt edici terimler (Doğrudan yüksek ağırlık: 0.85+)
  exclusiveKeywords: string[];
  // Destekleyici terimler (Ağırlık: 0.35+)
  supportingKeywords: string[];
  // Örtük saat ataması (Belirli jargonda saat verilmediyse varsayılan)
  implicitTimeHooks?: {
    keyword: string;
    hour: number;
    minute: number;
  }[];
}

const DOMAIN_RULES: DomainRule[] = [
  {
    domain: 'EGITIM',
    defaultIcon: '📚',
    defaultColor: '#FEF08A',
    exclusiveKeywords: [
      'dys', 'mebbis', 'e-okul', 'eokul', 'şök', 'bep', 'ram', 'ek ders',
      'puantaj', 'zümre', 'zümresi', 'nöbet defteri', 'yazılı kağıdı',
      'taşımalı yemek', 'öğretmenler odası', 'kazanım analizi', 'barem',
      'tefbis', 'okul aile birliği', 'bina sınav komisyonu', 'lgs görev',
      'yks görev', 'e-kurs', 'dyk', 'norm kadro', 'ders dağıtım'
    ],
    supportingKeywords: [
      'okul', 'sınav', 'veli', 'müdür', 'müdür yardımcısı', 'nöbet',
      'ders', 'teneffüs', 'karne', 'tatil', 'idare', 'tutanak', 'öğrenci',
      'bağış', 'sosyal etkinlik'
    ],
    implicitTimeHooks: [
      { keyword: 'nöbet', hour: 8, minute: 0 },
      { keyword: 'zümre', hour: 15, minute: 30 },
      { keyword: 'ek ders', hour: 17, minute: 0 },
      { keyword: 'tefbis', hour: 16, minute: 0 },
    ]
  },
  {
    domain: 'HUKUK',
    defaultIcon: '⚖️',
    defaultColor: '#E0E7FF',
    exclusiveKeywords: [
      'uyap', 'istinaf', 'temyiz', 'tebligat', 'vekaletname', 'müzekkere',
      'mazeret dilekçesi', 'ihtiyati haciz', 'tensip', 'celse', 'icra takibi',
      'esastan ret', 'gerekçeli karar', 'baro', 'bilirkişi raporu',
      'arabuluculuk', 'arabulucu', 'uzlaştırma', 'uzlaştırmacı',
      'kıymet takdiri', '103 davetiyesi', 'fiili haciz', 'son tutanak'
    ],
    supportingKeywords: [
      'duruşma', 'adliye', 'mahkeme', 'savcı', 'savcılık', 'hâkim', 'hakim',
      'dava', 'müvekkil', 'tutanak', 'keşif', 'ihtarname', 'haciz', 'satış'
    ],
    implicitTimeHooks: [
      { keyword: 'duruşma', hour: 9, minute: 30 },
      { keyword: 'keşif', hour: 11, minute: 0 },
      { keyword: 'uyap', hour: 16, minute: 0 },
      { keyword: 'arabulucu', hour: 14, minute: 0 },
    ]
  },
  {
    domain: 'MALIYE',
    defaultIcon: '📊',
    defaultColor: '#DCFCE7',
    exclusiveKeywords: [
      'smmm', 'ymm', 'kdv', 'muhsgk', 'muhtasar', 'geçici vergi', 'e-defter',
      'edefter', 'berat', 'sgk bildirgesi', 'ba-bs', 'babs', 'mizan',
      'stopaj', 'amortisman', 'vergi dairesi', 'luca', 'zirve',
      'kdv iadesi', 'karşıt inceleme', 'bağımsız denetim', 'kgk', 'çalışma kağıdı'
    ],
    supportingKeywords: [
      'fatura', 'ekstre', 'mükellef', 'beyanname', 'bordro', 'bağkur',
      'kasa', 'gelir tablosu', 'tahakkuk', 'faturasını', 'ödeme', 'tasdik'
    ],
    implicitTimeHooks: [
      { keyword: 'beyanname', hour: 17, minute: 0 },
      { keyword: 'kdv', hour: 16, minute: 30 },
      { keyword: 'sgk', hour: 18, minute: 0 },
    ]
  },
  {
    domain: 'SAGLIK',
    defaultIcon: '🩺',
    defaultColor: '#E0F2FE',
    exclusiveKeywords: [
      'epikriz', 'konsültasyon', 'order', 'anamnez', 'triyaj', 'dekübitus',
      'sbar', 'otoklav', 'dikiş alma', 'pansuman', 'hemogram', 'biyokimya',
      'its karekod', 'medula', 'endodonti', 'kanal tedavisi',
      'gebe izlem', 'bebek izlem', 'asm', 'negatif performans', 'hyp',
      'paramedik', '112 acil', 'narkotik sayım'
    ],
    supportingKeywords: [
      'hasta', 'ameliyat', 'ilaç', 'reçete', 'klinik', 'tahlil', 'aşı',
      'damla', 'poliklinik', 'doktor', 'hemşire', 'eczane', 'röntgen', 'ambulans'
    ],
    implicitTimeHooks: [
      { keyword: 'pansuman', hour: 10, minute: 0 },
      { keyword: 'ameliyat', hour: 8, minute: 30 },
      { keyword: 'konsültasyon', hour: 14, minute: 0 },
      { keyword: 'izlem', hour: 10, minute: 30 },
    ]
  },
  {
    domain: 'MUHENDISLIK',
    defaultIcon: '⚙️',
    defaultColor: '#E2E8F0',
    exclusiveKeywords: [
      'beton dökümü', 'kırım testi', 'küp numune', 'loto', 'kompanzasyon',
      'trafo', 'pano', 'hidrostatik test', 'prod deploy', 'staging', 'hotfix',
      'semver', 'pull request', 'db migration', 'vibrasyon analizi',
      'isg', 'ibys', 'onaylı defter', 'ramak kala', 'yapı denetim',
      'donatı vizesi', 'demir teslim', 'şantiye günlüğü'
    ],
    supportingKeywords: [
      'şantiye', 'arıza', 'kalibrasyon', 'bakım', 'kod', 'deploy',
      'sunucu', 'test', 'donatı', 'pompa', 'basınç', 'şalter', 'baret'
    ],
    implicitTimeHooks: [
      { keyword: 'beton', hour: 7, minute: 30 },
      { keyword: 'deploy', hour: 11, minute: 0 },
      { keyword: 'kırım', hour: 10, minute: 0 },
      { keyword: 'isg', hour: 10, minute: 0 },
    ]
  },
  {
    domain: 'HAVACILIK',
    defaultIcon: '✈️',
    defaultColor: '#E0E7FF',
    exclusiveKeywords: [
      'ofp', 'dispatch', 'metar', 'taf', 'walkaround', 'fdp', 'notam',
      'lpc', 'simülatör eğitimi', 'slot saati', 'briefing', 'crosscheck'
    ],
    supportingKeywords: [
      'kokpit', 'uçuş', 'kalkış', 'iniş', 'havalimanı', 'apron',
      'kule', 'pist', 'pilot', 'yakıt', 'sefer'
    ],
    implicitTimeHooks: [
      { keyword: 'walkaround', hour: 45, minute: 0 }, // kalkıştan 45 dk önce mantığı
      { keyword: 'dispatch', hour: 90, minute: 0 },
    ]
  },
  {
    domain: 'KAMU',
    defaultIcon: '🗂️',
    defaultColor: '#FEF9C3',
    exclusiveKeywords: [
      'ebys', 'belgenet', 'sdp', 'standart dosya', 'paraf', 'makam oluru',
      'cimer', '22/d', 'doğrudan temin', 'taşınır işlem fişi', 'tif', 'mys'
    ],
    supportingKeywords: [
      'üst yazı', 'daire başkanı', 'şube müdürü', 'memur', 'komisyon',
      'ihale', 'evrak', 'resmi yazı', 'malmüdürlüğü', 'valilik', 'kaymakamlık'
    ],
    implicitTimeHooks: [
      { keyword: 'cimer', hour: 16, minute: 0 },
      { keyword: 'üst yazı', hour: 15, minute: 0 },
    ]
  },
  {
    domain: 'ZIRAAT',
    defaultIcon: '🌿',
    defaultColor: '#DCFCE7',
    exclusiveKeywords: [
      'zirai don', 'phi süresi', 'kalıntı süresi', 'çks', 'tarsim', 'tarım sigortası',
      'damlama sulama', 'bordo bulamacı', 'yaprak gübresi', 'hasat yasağı', 'akarit',
      'fungusit', 'türkvet', 'turkvet', 'küpeleme', 'kupeleme', 'şap aşısı', 'kuduz aşısı',
      'hayvan sevk', 'veteriner'
    ],
    supportingKeywords: [
      'gübreleme', 'sulama', 'ilaçlama', 'budama', 'hasat', 'tarla',
      'bahçe', 'sera', 'fidan', 'traktör', 'toprak', 'buzağı', 'kuzu', 'çiftlik'
    ],
    implicitTimeHooks: [
      { keyword: 'don', hour: 3, minute: 30 },
      { keyword: 'sulama', hour: 19, minute: 30 }, // Akşam serinliği kuralı
      { keyword: 'ilaçlama', hour: 7, minute: 0 },
      { keyword: 'küpeleme', hour: 9, minute: 0 },
      { keyword: 'tarsim', hour: 16, minute: 0 },
    ]
  },
  {
    domain: 'LOJISTIK',
    defaultIcon: '🚛',
    defaultColor: '#FED7AA',
    exclusiveKeywords: [
      'takograf', 'aetr', 'kantar fişi', 'king-pin', 'kingpin', 'cmr',
      'dorse', 'navlun', 'parsiyel yük', 'aks tartımı', 'sevk irsaliyesi'
    ],
    supportingKeywords: [
      'tır', 'kamyon', 'yük', 'teslimat', 'şoför', 'gümrük',
      'rampa', 'nakliye', 'depo', 'palet', 'sevkiyat'
    ],
    implicitTimeHooks: [
      { keyword: 'takograf', hour: 4, minute: 30 },
      { keyword: 'kantar', hour: 8, minute: 0 },
    ]
  },
  {
    domain: 'TICARET',
    defaultIcon: '🧾',
    defaultColor: '#DCFCE7',
    exclusiveKeywords: [
      'z raporu', 'z-raporu', 'pos rulosu', 'gün sonu', 'kasa sayımı',
      'kasa açığı', 'veresiye defteri', 'iskonto', 'irsaliyeli fatura'
    ],
    supportingKeywords: [
      'dükkan', 'kasiyer', 'müşteri', 'stok', 'toptancı', 'satış',
      'teklif', 'hesap', 'para', 'tahsilat', 'pos'
    ],
    implicitTimeHooks: [
      { keyword: 'z raporu', hour: 19, minute: 0 },
      { keyword: 'gün sonu', hour: 19, minute: 30 },
      { keyword: 'kasa sayımı', hour: 18, minute: 45 },
    ]
  },
  {
    domain: 'KUAFOR',
    defaultIcon: '✂️',
    defaultColor: '#FCE7F3',
    exclusiveKeywords: [
      'oryal', 'açıcı', 'dip boya', '30 volüm', '40 volüm', 'sombre',
      'ombre', 'röfle', 'keratin bakım', 'sterilizatör'
    ],
    supportingKeywords: [
      'saç', 'boya', 'manikür', 'pedikür', 'kesim', 'fön',
      'randevu', 'cila', 'makas', 'salon'
    ],
    implicitTimeHooks: [
      { keyword: 'boya', hour: 13, minute: 0 },
      { keyword: 'bakım', hour: 15, minute: 0 },
    ]
  },
  {
    domain: 'SAVUNMA',
    defaultIcon: '🪖',
    defaultColor: '#E2E8D5',
    exclusiveKeywords: [
      'içtima', 'tekmil', 'doldur-boşalt', 'mühimmat sandığı', 'silahlık sayımı',
      'nöbetçi subayı', 'nöbetçi astsubayı', 'asayiş fezlekesi', 'adli emanet bürosu'
    ],
    supportingKeywords: [
      'bölük', 'tabur', 'takım', 'karakol', 'polis', 'asker',
      'devriye', 'gözaltı', 'atış', 'tatbikat'
    ],
    implicitTimeHooks: [
      { keyword: 'içtima', hour: 7, minute: 40 },
      { keyword: 'devir-teslim', hour: 8, minute: 30 },
    ]
  },
  {
    domain: 'CALISMIYORUM',
    defaultIcon: '👶',
    defaultColor: '#FDF2F8',
    exclusiveKeywords: [
      'bebek aşısı', 'çocuk aşısı', 'karma aşı', 'kpa aşısı', 'verem aşısı',
      'kkk aşısı', 'iç parazit', 'dış parazit', 'kuduz aşısı', 'su arıtma filtre',
      'kombi bakımı', 'petek temizliği', 'robot süpürge filtresi'
    ],
    supportingKeywords: [
      'bebek', 'çocuk', 'aşı', 'veteriner', 'kedi', 'köpek', 'mama', 'kum',
      'filtre', 'kombi', 'klima', 'arıtma', 'temizlik', 'ev', 'bakım'
    ],
    implicitTimeHooks: [
      { keyword: 'aşı', hour: 9, minute: 30 },
      { keyword: 'veteriner', hour: 11, minute: 0 },
      { keyword: 'arıtma', hour: 14, minute: 0 },
    ]
  },
  {
    domain: 'FINANS',
    defaultIcon: '💳',
    defaultColor: '#FEE2E2',
    exclusiveKeywords: [
      'deneme sürümü', 'ücretsiz deneme', 'abonelik iptal', 'netflix abonelik',
      'spotify abonelik', 'mtv 1. taksit', 'mtv 2. taksit', 'kasko yenileme',
      'trafik sigortası yenileme', 'kira ödemesi', 'aidat ödemesi'
    ],
    supportingKeywords: [
      'abonelik', 'deneme', 'sigorta', 'kasko', 'mtv', 'vergi', 'fatura',
      'kart', 'aidat', 'kira', 'öde', 'taksit', 'provizyon'
    ],
    implicitTimeHooks: [
      { keyword: 'deneme', hour: 10, minute: 0 },
      { keyword: 'mtv', hour: 16, minute: 0 },
      { keyword: 'fatura', hour: 15, minute: 0 },
    ]
  }
];

/**
 * 0 MS DETERMINISTIK RADAR
 * Girdiyi harfiyat ve kelime sınırlarıyla regex üzerinden tarar.
 * Yüksek puan alan domain'i ve örtük kuralları anında döndürür.
 */
export function detectDomainFromJargon(
  text: string,
  fallbackDomain: ProfessionDomain = 'GENEL'
): JargonDetectionResult {
  if (!text || !text.trim()) {
    return {
      detectedDomain: fallbackDomain,
      confidence: 0,
      matchedKeywords: [],
      suggestedIcon: '📌',
      suggestedColor: '#FEF3C7',
    };
  }

  // Türkçe karakter duyarlı normalizasyon
  const normalized = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ');

  let bestDomain: ProfessionDomain = fallbackDomain;
  let highestScore = 0;
  let bestMatches: string[] = [];
  let matchedRule: DomainRule | null = null;

  for (const rule of DOMAIN_RULES) {
    let currentScore = 0;
    const currentMatches: string[] = [];

    // 1. Kesin terimler kontrolü (Exclusive: Her biri 65 puan)
    for (const kw of rule.exclusiveKeywords) {
      const regex = new RegExp(`(^|\\s)${kw.replace('-', '[- ]?')}($|\\s)`, 'i');
      if (regex.test(normalized)) {
        currentScore += 65;
        currentMatches.push(kw);
      }
    }

    // 2. Destekleyici terimler kontrolü (Supporting: Her biri 20 puan)
    for (const kw of rule.supportingKeywords) {
      const regex = new RegExp(`(^|\\s)${kw}($|\\s)`, 'i');
      if (regex.test(normalized)) {
        currentScore += 20;
        currentMatches.push(kw);
      }
    }

    // Kullanıcının mevcut seçili profiline hafif ağırlık (+15)
    if (rule.domain === fallbackDomain && fallbackDomain !== 'GENEL') {
      currentScore += 15;
    }

    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestDomain = rule.domain;
      bestMatches = currentMatches;
      matchedRule = rule;
    }
  }

  // Eşik: En az bir kesin terim (65) veya 2 destekleyici terim (40)
  if (highestScore >= 40 && matchedRule) {
    let implicitHour: number | undefined;
    let implicitMinute: number | undefined;

    if (matchedRule.implicitTimeHooks) {
      for (const hook of matchedRule.implicitTimeHooks) {
        if (normalized.includes(hook.keyword)) {
          implicitHour = hook.hour;
          implicitMinute = hook.minute;
          break;
        }
      }
    }

    const confidence = Math.min(1.0, Number((highestScore / 100).toFixed(2)));

    return {
      detectedDomain: bestDomain,
      confidence,
      matchedKeywords: bestMatches,
      suggestedIcon: matchedRule.defaultIcon,
      suggestedColor: matchedRule.defaultColor,
      implicitHour,
      implicitMinute,
      reason: `Tespit edilen sektörel jargon: ${bestMatches.join(', ')}`,
    };
  }

  // Eşik aşılmadıysa fallback'i koru
  return {
    detectedDomain: fallbackDomain,
    confidence: 0.1,
    matchedKeywords: [],
    suggestedIcon: '📌',
    suggestedColor: '#FEF3C7',
  };
}
