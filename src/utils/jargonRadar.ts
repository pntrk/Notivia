import type { ProfessionDomain } from '../types/domainThemes.ts';
import { normalizePhoneticJargon } from './phoneticNormalizer.ts';
import { matchCustomVocabulary } from './userVocabularyEngine.ts';

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
      'yks görev', 'e-kurs', 'dyk', 'norm kadro', 'ders dağıtım',
      'ram yönlendirme', 'bep toplantısı', 'lgs deneme', 'yks deneme',
      'ortak yazılı mazeret', 'mazeret sınavı', 'zümre başkanı'
    ],
    supportingKeywords: [
      'okul', 'sınav', 'veli', 'müdür', 'müdür yardımcısı', 'nöbet',
      'ders', 'teneffüs', 'karne', 'tatil', 'idare', 'tutanak', 'öğrenci',
      'bağış', 'sosyal etkinlik', 'karneler', 'ödev'
    ],
    implicitTimeHooks: [
      { keyword: 'nöbet', hour: 8, minute: 0 },
      { keyword: 'zümre', hour: 15, minute: 30 },
      { keyword: 'ek ders', hour: 17, minute: 0 },
      { keyword: 'tefbis', hour: 16, minute: 0 },
      { keyword: 'bep', hour: 14, minute: 30 },
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
      'kıymet takdiri', '103 davetiyesi', 'fiili haciz', 'son tutanak',
      '89/1', '89/2', '89/3', 'haciz ihbarnamesi', 'kıymet takdiri itirazı',
      'e-satış', 'mezat', 'sıra cetveli', 'icra edilebilirlik şerhi',
      'cmk 100', 'cmk 101', 'tutukluluğa itiraz', 'kyok', 'kovuşturmaya yer olmadığı',
      'takipsizlik kararı', 'segbis', 'istintak'
    ],
    supportingKeywords: [
      'duruşma', 'adliye', 'mahkeme', 'savcı', 'savcılık', 'hâkim', 'hakim',
      'dava', 'müvekkil', 'tutanak', 'keşif', 'ihtarname', 'haciz', 'satış',
      'itiraz', 'dilekçe', 'tahliye'
    ],
    implicitTimeHooks: [
      { keyword: 'duruşma', hour: 9, minute: 30 },
      { keyword: 'keşif', hour: 11, minute: 0 },
      { keyword: 'uyap', hour: 16, minute: 0 },
      { keyword: 'arabulucu', hour: 14, minute: 0 },
      { keyword: '89/1', hour: 15, minute: 0 },
      { keyword: 'kyok', hour: 16, minute: 30 },
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
      'kdv iadesi', 'karşıt inceleme', 'bağımsız denetim', 'kgk', 'çalışma kağıdı',
      'vuk geçici 33', 'enflasyon düzeltmesi', 'tevkifat', 'kdv tevkifatı',
      'tevkifatlı fatura', '9/10 tevkifat', '5/10 tevkifat', 'gekap',
      'ba-bs mutabakatı', 'tarhiyat öncesi uzlaşma', 'vergi mahkemesi dava',
      'işe giriş bildirgesi', 'işten çıkış bildirgesi', 'eksik gün kodu', 'kıdem tavanı'
    ],
    supportingKeywords: [
      'fatura', 'ekstre', 'mükellef', 'beyanname', 'bordro', 'bağkur',
      'kasa', 'gelir tablosu', 'tahakkuk', 'faturasını', 'ödeme', 'tasdik', 'vergi'
    ],
    implicitTimeHooks: [
      { keyword: 'beyanname', hour: 17, minute: 0 },
      { keyword: 'kdv', hour: 16, minute: 30 },
      { keyword: 'sgk', hour: 18, minute: 0 },
      { keyword: 'enflasyon', hour: 15, minute: 0 },
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
      'paramedik', '112 acil', 'narkotik sayım',
      'aydınlatılmış onam', 'kırmızı alan', 'sarı alan', 'cpr resüsitasyon',
      'cross-match', 'transfüzyon reaksiyon', 'renkli reçete', 'yeşil reçete',
      'kırmızı reçete devir', 'majistral formül', 'medula fatura'
    ],
    supportingKeywords: [
      'hasta', 'ameliyat', 'ilaç', 'reçete', 'klinik', 'tahlil', 'aşı',
      'damla', 'poliklinik', 'doktor', 'hemşire', 'eczane', 'röntgen', 'ambulans', 'kan'
    ],
    implicitTimeHooks: [
      { keyword: 'pansuman', hour: 10, minute: 0 },
      { keyword: 'ameliyat', hour: 8, minute: 30 },
      { keyword: 'konsültasyon', hour: 14, minute: 0 },
      { keyword: 'izlem', hour: 10, minute: 30 },
      { keyword: 'transfüzyon', hour: 11, minute: 0 },
    ]
  },
  {
    domain: 'MUHENDISLIK',
    defaultIcon: '⚙️',
    defaultColor: '#E2E8F0',
    exclusiveKeywords: [
      'siem', 'soc', 'siem kurulumu', 'korelasyon kuralı', 'edr', 'xdr',
      'firewall', 'fortigate', 'palo alto', 'waf', 'active directory',
      'domain controller', 'gpo', 'veeam', 'disaster recovery', 'dr tatbikatı',
      'dr testi', 'kubernetes', 'k8s', 'docker', 'pentest', 'sızma testi',
      'zafiyet tarama', 'syslog', 'log analizi', 'uat testi', 'poc sunumu',
      'beton dökümü', 'kırım testi', 'küp numune', 'loto', 'kompanzasyon',
      'trafo', 'pano', 'hidrostatik test', 'prod deploy', 'staging', 'hotfix',
      'semver', 'pull request', 'db migration', 'vibrasyon analizi',
      'isg', 'ibys', 'onaylı defter', 'ramak kala', 'yapı denetim',
      'donatı vizesi', 'demir teslim', 'şantiye günlüğü',
      'geoteknik', 'zemin etüdü', 'spt vuruş', 'plaka yükleme', 'grobeton',
      'yeşil defter', 'ataşman', 'röleve', 'hakediş pursantajı', 'topraklama meger',
      'trafo yağ dielektrik', 'kaçak akım rölesi', '30ma', '300ma', 'owasp',
      'canary release', 'rollback planı', 'p1 incident post-mortem'
    ],
    supportingKeywords: [
      'bilişim', 'sunucu', 'network', 'kural', 'entegrasyon', 'kurulum', 'sunum',
      'güvenlik', 'yedek', 'yedekleme', 'bulut', 'cloud', 'ci/cd', 'pipeline', 'devops',
      'şantiye', 'arıza', 'kalibrasyon', 'bakım', 'kod', 'deploy',
      'test', 'donatı', 'pompa', 'basınç', 'şalter', 'baret', 'beton', 'topraklama'
    ],
    implicitTimeHooks: [
      { keyword: 'siem', hour: 10, minute: 0 },
      { keyword: 'sunum', hour: 14, minute: 30 },
      { keyword: 'firewall', hour: 11, minute: 0 },
      { keyword: 'soc', hour: 9, minute: 0 },
      { keyword: 'backup', hour: 23, minute: 0 },
      { keyword: 'veeam', hour: 22, minute: 30 },
      { keyword: 'beton', hour: 7, minute: 30 },
      { keyword: 'deploy', hour: 11, minute: 0 },
      { keyword: 'kırım', hour: 10, minute: 0 },
      { keyword: 'isg', hour: 10, minute: 0 },
      { keyword: 'spt', hour: 9, minute: 0 },
    ]
  },
  {
    domain: 'TEKNIK',
    defaultIcon: '💻',
    defaultColor: '#E0F2FE',
    exclusiveKeywords: [
      'siem', 'soc', 'siem kurulumu', 'korelasyon kuralı', 'edr', 'xdr',
      'firewall', 'fortigate', 'palo alto', 'waf', 'active directory',
      'domain controller', 'gpo', 'veeam', 'disaster recovery', 'dr tatbikatı',
      'dr testi', 'kubernetes', 'k8s', 'docker', 'pentest', 'sızma testi',
      'zafiyet tarama', 'syslog', 'log analizi', 'uat testi', 'poc sunumu',
      'loto', 'kompanzasyon', 'prod deploy', 'staging', 'hotfix', 'semver', 'db migration'
    ],
    supportingKeywords: [
      'bilişim', 'sunucu', 'network', 'kural', 'entegrasyon', 'kurulum', 'sunum',
      'güvenlik', 'yedek', 'yedekleme', 'bulut', 'cloud', 'ci/cd', 'pipeline', 'devops',
      'arıza', 'bakım', 'kod', 'deploy', 'test'
    ],
    implicitTimeHooks: [
      { keyword: 'siem', hour: 10, minute: 0 },
      { keyword: 'sunum', hour: 14, minute: 30 },
      { keyword: 'firewall', hour: 11, minute: 0 },
      { keyword: 'soc', hour: 9, minute: 0 },
      { keyword: 'deploy', hour: 11, minute: 0 },
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
      'cimer', 'çimer', '4982', '3071', '22/d', '22-d', '4734', 'doğrudan temin',
      'dogrudan temin', 'taşınır işlem fişi', 'tif', 'tkys', 'mys v2', 'ödeme emri belgesi',
      'harcama talimatı', 'muayene kabul', 'piyasa fiyat araştırma', 'tek hekim raporu',
      'disiplin soruşturması', 'savunma istem', 'sayıştay', 'sorgu layihası', 'sgk işe giriş',
      'işten ayrılış bildirgesi', 'karar defteri', 'yönetim kurulu kararı', 'ttsg'
    ],
    supportingKeywords: [
      'üst yazı', 'daire başkanı', 'şube müdürü', 'memur', 'komisyon', 'müfettiş',
      'ihale', 'evrak', 'resmi yazı', 'malmüdürlüğü', 'valilik', 'kaymakamlık',
      'devlet memuru', '657 dmk', 'özlük dosyası', 'deneme süresi', 'teftiş',
      'protokol oturma', 'çelenk sunma', 'toplantı tutanağı', 'brifing dosyası',
      'yönetici asistanı', 'sekreter', 'satın alma teklif', 'nda'
    ],
    implicitTimeHooks: [
      { keyword: 'cimer', hour: 17, minute: 0 },
      { keyword: 'ebys', hour: 16, minute: 30 },
      { keyword: 'üst yazı', hour: 16, minute: 0 },
      { keyword: 'doğrudan temin', hour: 15, minute: 0 },
      { keyword: 'sağlık raporu', hour: 9, minute: 0 },
      { keyword: 'yönetim kurulu', hour: 15, minute: 0 },
      { keyword: 'brifing', hour: 10, minute: 0 },
    ]
  },
  {
    domain: 'ZIRAAT',
    defaultIcon: '🌿',
    defaultColor: '#DCFCE7',
    exclusiveKeywords: [
      'zirai don', 'phi süresi', 'kalıntı süresi', 'çks', 'tarsim', 'tarım sigortası',
      'damlama sulama', 'bordo bulamacı', 'aşı macunu', 'yaprak gübresi', 'taban gübresi',
      'fertigasyon', 'daldırma sulama', 'orkide sula', 'orkide bakımı', 'suvarıver',
      'sulayuver', 'verive gari', 'çiçekler susamış', 'çiçek sula', 'kök mantarı',
      'kök boğazı', 'ardıç katranı', 'fungisit', 'pestisit', 'herbisit', 'akarisit',
      'kireçli toprak', 'toprak ph', 'ec değeri', 'budama zamanı', 'tüplü fidan',
      'can suyu', 'herek', 'çim havalandırma', 'verticut', 'sera havalandırma',
      'kserofitik', 'sukulent sulama', 'kaktüs sulama', 'sardunya sulama', 'mercek etkisi'
    ],
    supportingKeywords: [
      'gübreleme', 'sulama', 'ilaçlama', 'budama', 'hasat', 'tarla',
      'bahçe', 'sera', 'fidan', 'traktör', 'toprak', 'çiftlik', 'çiçek', 'saksı',
      'orkide', 'kaktüs', 'sukulent', 'sardunya', 'petunya', 'zeytin', 'bağ', 'meyve bahçesi'
    ],
    implicitTimeHooks: [
      { keyword: 'don', hour: 3, minute: 30 },
      { keyword: 'zirai don', hour: 3, minute: 30 },
      { keyword: 'sulama', hour: 19, minute: 30 }, // Akşam serinliği kuralı
      { keyword: 'sula', hour: 19, minute: 30 },
      { keyword: 'suvar', hour: 19, minute: 30 },
      { keyword: 'orkide', hour: 9, minute: 30 }, // Orkide sabah kuralı
      { keyword: 'ilaçlama', hour: 7, minute: 0 },
      { keyword: 'budama', hour: 8, minute: 30 },
      { keyword: 'tarsim', hour: 16, minute: 0 },
      { keyword: 'çks', hour: 16, minute: 0 }
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
      'kasa açığı', 'kasa avansı', 'ara kasa', 'ara tahliye', 'veresiye', 'veresiye defteri',
      'deftere yaz', 'açık hesap', 'mal kabul', 'koli adedi', 'irsaliye',
      'çek vadesi', 'senet vadesi', 'iskonto', 'irsaliyeli fatura', 'bağkur primi', 'dükkan kirası'
    ],
    supportingKeywords: [
      'dükkan', 'dukkan', 'kasiyer', 'müşteri', 'stok', 'toptancı', 'toptanci', 'satış', 'satis',
      'teklif', 'hesap', 'para', 'tahsilat', 'pos', 'koli', 'tedarik', 'esnaf', 'fatura', 'avans', 'rulo'
    ],
    implicitTimeHooks: [
      { keyword: 'z raporu', hour: 19, minute: 0 },
      { keyword: 'gün sonu', hour: 19, minute: 30 },
      { keyword: 'kasa sayımı', hour: 18, minute: 45 },
      { keyword: 'kasa avansı', hour: 8, minute: 30 },
      { keyword: 'kasa açılışı', hour: 8, minute: 30 },
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
    domain: 'GENEL',
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
  },
  {
    domain: 'VETERINER',
    defaultIcon: '🐾',
    defaultColor: '#CCFBF1',
    exclusiveKeywords: [
      'petvet', 'mikroçip', 'kuduz titrasyon', 'iç parazit', 'dış parazit',
      'karma aşı', 'kısırlaştırma post-op', 'lökosit', 'hemogram kan sayımı',
      'veteriner hekim', 'aşı karnesi', 'traş anestezi', 'kedi pansiyon',
      'panleukopeni', 'parvoviral', 'fip', 'leishmania', 'anestezi onam',
      'türkvet', 'turkvet', 'kolostrum', 'suni tohumlama', 'distosi',
      'kavitron', 'tartar temizliği', 'wood lambası', 'elizabeth yakalığı',
      'pre-op', 'post-op', 'vetbis', 'rnatt', 'felv', 'fiv', 'laminitis',
      'vsr', 'veteriner sağlık raporu', 'buzağı küpe', 'cmt testi', 'süt arınma'
    ],
    supportingKeywords: [
      'veteriner', 'kedi', 'köpek', 'aşı', 'klinik', 'tedavi', 'ameliyat',
      'parazit', 'pansuman', 'mama', 'ilaç', 'damla', 'hayvan', 'buzağı',
      'inek', 'sığır', 'koyun', 'kuzu', 'at', 'küpeleme', 'dikiş'
    ],
    implicitTimeHooks: [
      { keyword: 'aşı', hour: 10, minute: 0 },
      { keyword: 'kısırlaştırma', hour: 9, minute: 0 },
      { keyword: 'pansuman', hour: 11, minute: 30 },
      { keyword: 'petvet', hour: 14, minute: 0 },
      { keyword: 'tohumlama', hour: 9, minute: 30 },
      { keyword: 'küpeleme', hour: 8, minute: 30 },
      { keyword: 'sağım', hour: 6, minute: 30 }
    ]
  },
  {
    domain: 'EMLAK',
    defaultIcon: '🏢',
    defaultColor: '#FEF3C7',
    exclusiveKeywords: [
      'taşınmaz ticareti', 'yetki belgesi', 'web-tapu', 'webtapu', 'tapu harcı',
      'dask poliçesi', 'dask', 'ipotek fek', 'ipotek fekki', 'rayiç bedel', 'cayma akçesi',
      'emlak beyanı', 'tahliye taahhütnamesi', 'tahliye taahhüdü', 'döner sermaye bedeli',
      'kat irtifakı', 'kat mülkiyeti', 'iskan raporu', 'iskan', 'imar durumu', 'imar çapı',
      'ada parsel', 'yer gösterme belgesi', 'yer gösterme', 'yer gosterme', 'taputakas',
      'tapu takas', 'güvenli tapu', 'bloke çek', 'eids', 'takyidat', 'kira sözleşmesi',
      'kira kontratı', 'depozito iadesi', 'depozito mahsubu', 'tüfe kira'
    ],
    supportingKeywords: [
      'tapu', 'kira', 'kiracı', 'daire', 'arsa', 'konut', 'satış', 'kiralık',
      'satılık', 'komisyon', 'gayrimenkul', 'emlakçı', 'noter', 'ipotek',
      'portföy', 'sunum', 'ekspertiz', 'değerleme', 'rayiç', 'ev sahibi'
    ],
    implicitTimeHooks: [
      { keyword: 'tapu', hour: 10, minute: 30 },
      { keyword: 'sunum', hour: 14, minute: 0 },
      { keyword: 'yer gösterme', hour: 15, minute: 30 },
      { keyword: 'belediye', hour: 11, minute: 0 },
      { keyword: 'dask', hour: 15, minute: 0 }
    ]
  },
  {
    domain: 'DENIZCILIK',
    defaultIcon: '⚓',
    defaultColor: '#CFFAFE',
    exclusiveKeywords: [
      'psc denetimi', 'port state control', 'ism kodu', 'draft survey',
      'sintine jurnali', 'balast suyu', 'oow', 'seyir vardiyası', 'demirleme',
      'borda', 'çarmıh', 'gemi adamı cüzdanı', 'slop tank', 'marpol', 'solas',
      'iskele borda', 'sancak borda', 'dümen dolabı', 'baş itici'
    ],
    supportingKeywords: [
      'kaptan', 'gemi', 'liman', 'deniz', 'demir', 'vardiya', 'yakıt',
      'kumanya', 'bunker', 'sefer', 'yanaşma', 'kalkış', 'radar'
    ],
    implicitTimeHooks: [
      { keyword: 'denetim', hour: 9, minute: 0 },
      { keyword: 'draft', hour: 10, minute: 0 },
      { keyword: 'bunker', hour: 14, minute: 30 },
      { keyword: 'vardiya', hour: 8, minute: 0 }
    ]
  },
  {
    domain: 'GUMRUK',
    defaultIcon: '📦',
    defaultColor: '#E0E7FF',
    exclusiveKeywords: [
      'atr dolaşım belgesi', 'menşe şahadetnamesi', 'antrepo beyannamesi',
      'supalan muayene', 'kırmızı hat', 'sarı hat', 'yeşil hat', 'mavi hat',
      'konşimento', 'bill of lading', 'ordino teslimi', 'gümrük müşaviri',
      'dahilde işleme', 'dii̇b', 'gti̇p tespiti', 'ötv teminatı', 'antrepo devir'
    ],
    supportingKeywords: [
      'gümrük', 'ithalat', 'ihracat', 'beyanname', 'konteyner', 'liman',
      'antrepo', 'ordino', 'muayene', 'tahakkuk', 'navlun', 'vergi'
    ],
    implicitTimeHooks: [
      { keyword: 'muayene', hour: 10, minute: 0 },
      { keyword: 'antrepo', hour: 11, minute: 30 },
      { keyword: 'ordino', hour: 14, minute: 0 },
      { keyword: 'kırmızı hat', hour: 13, minute: 30 }
    ]
  },
  {
    domain: 'ECZACILIK',
    defaultIcon: '💊',
    defaultColor: '#FEE2E2',
    exclusiveKeywords: [
      'medula', 'sut provizyon', 'renkli reçete', 'kırmızı reçete', 'yeşil reçete',
      'mor reçete', 'turuncu reçete', 'rrs', 'majistral', 'its karekod',
      'karekod sonlandırma', 'soğuk zincir', 'aşı dolabı', 'data logger',
      'miadı dolan', 'ilaç imha', 'ecza deposu', 'ssgm', 'katılım payı muafiyet',
      'uyuşturucu defteri', 'farmakope', 'nöbetçi eczane', 'bud kullanım süresi'
    ],
    supportingKeywords: [
      'eczane', 'eczacı', 'reçete', 'ilaç', 'muadil', 'provizyon', 'kupür',
      'rapor', 'kronik', 'etken madde', 'doz', 'şurup', 'merhem', 'damla'
    ],
    implicitTimeHooks: [
      { keyword: 'soğuk zincir', hour: 9, minute: 0 },
      { keyword: 'medula', hour: 17, minute: 0 },
      { keyword: 'majistral', hour: 13, minute: 30 },
      { keyword: 'nöbet', hour: 18, minute: 30 }
    ]
  },
  {
    domain: 'ISG',
    defaultIcon: '🦺',
    defaultColor: '#FEF3C7',
    exclusiveKeywords: [
      'ibys', 'isg-katip', 'ramak kala', 'ramakkala', '6331', 'onaylı defter',
      'risk değerlendirmesi', 'fine-kinney', 'l matris', 'periyodik muayene',
      'odyometri', 'solunum fonksiyon', 'sft testi', 'akciğer grafisi',
      'iş kazası bildirimi', 'kkd zimmet', 'sıcak iş izni', 'ptw',
      'kapalı alan çalışma', 'isg kurulu', 'tahliye tatbikatı', 'yangın tüpü basınç'
    ],
    supportingKeywords: [
      'isg', 'iş güvenliği', 'iş sağlığı', 'işyeri hekimi', 'isg uzmanı',
      'iş güvenliği uzmanı', 'baret', 'emniyet kemeri', 'tatbikat', 'döf',
      'kaza', 'tehlike', 'risk'
    ],
    implicitTimeHooks: [
      { keyword: 'eğitim', hour: 17, minute: 0 },
      { keyword: 'ramak kala', hour: 11, minute: 0 },
      { keyword: 'kurul', hour: 14, minute: 0 },
      { keyword: 'tatbikat', hour: 11, minute: 0 },
      { keyword: 'kaza', hour: 17, minute: 0 }
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
  if (fallbackDomain === 'SADE') {
    return {
      detectedDomain: 'SADE',
      confidence: 0,
      matchedKeywords: [],
      suggestedIcon: '📝',
      suggestedColor: '#F8FAFC',
      reason: 'Sade Mod (Bilişsel motorlar kapalı)',
    };
  }

  if (!text || !text.trim()) {
    return {
      detectedDomain: fallbackDomain,
      confidence: 0,
      matchedKeywords: [],
      suggestedIcon: '📌',
      suggestedColor: '#FEF3C7',
    };
  }

  // 1. Fonetik sesli dikte düzeltmesi & Türkçe karakter duyarlı normalizasyon
  const phoneticClean = normalizePhoneticJargon(text);
  const normalized = phoneticClean
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ');

  // 2. Kullanıcının yerel özel sözlüğü kontrolü (Öncelikli Eşleşme)
  const customMatch = matchCustomVocabulary(phoneticClean);
  if (customMatch && customMatch.domain) {
    const matchingRule = DOMAIN_RULES.find(r => r.domain === customMatch.domain);
    return {
      detectedDomain: customMatch.domain,
      confidence: 0.95,
      matchedKeywords: [customMatch.matchedItem.term],
      suggestedIcon: matchingRule?.defaultIcon || '⭐',
      suggestedColor: matchingRule?.defaultColor || '#FEF3C7',
      reason: `Özel Kullanıcı Sözlüğü: ${customMatch.matchedItem.term} (${customMatch.matchedItem.notes || customMatch.domain})`
    };
  }

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
