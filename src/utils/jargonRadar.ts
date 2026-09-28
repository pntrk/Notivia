import type { ProfessionDomain } from '../types/domainThemes.ts';
import { normalizePhoneticJargon } from './phoneticNormalizer.ts';
import { matchCustomVocabulary } from './userVocabularyEngine.ts';

export interface AmbiguousDomainCandidate {
  domain: ProfessionDomain;
  score: number;
  matchedKeywords: string[];
  domainLabel: string;
  suggestedIcon: string;
  suggestedColor: string;
  description?: string;
}

export interface JargonDetectionResult {
  detectedDomain: ProfessionDomain;
  confidence: number; // 0.0 - 1.0
  matchedKeywords: string[];
  suggestedIcon: string;
  suggestedColor: string;
  implicitHour?: number;
  implicitMinute?: number;
  reason?: string;
  isAmbiguous?: boolean;
  candidateDomains?: AmbiguousDomainCandidate[];
  clarificationQuestion?: string;
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
      'maarif modeli', 'maarif planı', 'maarif plani', 'maarif ders planı', 'maarif ders plani',
      'türkiye yüzyılı maarif modeli', 'turkiye yuzyili maarif modeli', 'öğrenme çıktısı', 'ogrenme ciktisi',
      'öğrenme çıktıları', 'ogrenme ciktilari', 'süreç bileşenleri', 'surec bilesenleri', 'beceri örgüsü',
      'beceri orgusu', 'kavramsal beceri', 'kavramsal beceriler', 'alan becerisi', 'alan becerileri',
      'sosyal duygusal öğrenme', 'sosyal duygusal ogrenme', 'sdb', 'okuryazarlık becerileri', 'okuryazarlik becerileri',
      'süreç odaklı ölçme', 'surec odakli olcme', 'biçimlendirici değerlendirme', 'bicimlendirici degerlendirme',
      'formatif değerlendirme', 'formatif degerlendirme', 'konu soru dağılım tablosu', 'konu soru dagilim tablosu',
      'ksdt', 'dereceli puanlama anahtarı', 'dereceli puanlama anahtari', 'rubrik', 'farklılaştırma',
      'farklilastirma', 'zenginleştirme', 'zenginlestirme', 'destekleme eğitimi', 'öğrenme kanıtları',
      'ogrenme kanitlari', 'çıkış kartı', 'cikis karti', 'erdem değer eylem', 'öğrenme yaşantısı',
      'dys', 'mebbis', 'e-okul', 'eokul', 'şök', 'sok', 'bep', 'ram', 'ek ders',
      'puantaj', 'zümre', 'zumre', 'zümresi', 'nöbet defteri', 'yazılı kağıdı',
      'taşımalı yemek', 'öğretmenler odası', 'kazanım analizi', 'barem',
      'tefbis', 'okul aile birliği', 'bina sınav komisyonu', 'lgs görev',
      'yks görev', 'e-kurs', 'dyk', 'norm kadro', 'ders dağıtım',
      'ram yönlendirme', 'bep toplantısı', 'lgs deneme', 'yks deneme',
      'ortak yazılı mazeret', 'mazeret sınavı', 'zümre başkanı',
      'açık uçlu sınav', 'acik uclu sinav', 'öba', 'öbiç', 'iyep', 'mesem',
      'çıraklık', 'ciraklik', '3308', 'koordinatör öğretmen', 'usta öğretici',
      'staj sözleşmesi', 'stajyer sgk', 'turnitin', 'intihal raporu', 'tik raporu',
      'tez izleme komitesi', 'doktora yeterlik', 'doktora tez jürisi',
      'bologna', 'syllabus', 'ders izlencesi', 'akts', 'obs not', 'çan eğrisi',
      'aday öğretmenlik', 'aöp', 'danışman öğretmen', 'gelişim gözlem formu',
      'okul öncesi', 'anaokulu', 'veli muvafakatname', 'türsab', 'd2 araç',
      'sosyal etkinlik modülü', 'kitap seçim modülü', 'ücretsiz ders kitabı',
      'özel öğretim ruhsat', '5580', 'özel okul ücret ilanı',
      'öğrenci nakil', 'ogrenci nakil', 'nakil kabul', 'nakil onayı', 'nakil talebi',
      'şube kura', 'sube kura', 'şube belirleme', 'kura çekimi', 'karne basımı', 'karne basimi',
      'maddi hata komisyonu', 'not düzeltme', 'şartlı eğitim yardımı', 'şey devamsızlık',
      'nöbetçi müdür yardımcısı', 'nöbetçi idareci'
    ],
    supportingKeywords: [
      'maarif', 'çıktı', 'cikti', 'bileşen', 'bilesen', 'beceri', 'kavramsal', 'eğilim', 'egilim',
      'portfolyo', 'gelişim dosyası', 'okul', 'sınav', 'veli', 'müdür', 'müdür yardımcısı', 'nöbet',
      'ders', 'teneffüs', 'karne', 'tatil', 'idare', 'tutanak', 'öğrenci',
      'bağış', 'sosyal etkinlik', 'karneler', 'ödev', 'öğretmen', 'ogretmen',
      'akademisyen', 'üniversite', 'enstitü', 'fakülte', 'rektörlük',
      'dekanlık', 'bölüm başkanı', 'araştırma görevlisi', 'öğretim görevlisi',
      'tez', 'makale', 'hakemlik', 'jüri', 'savunma', 'gezi', 'staj', 'kura'
    ],
    implicitTimeHooks: [
      { keyword: 'maarif', hour: 15, minute: 30 },
      { keyword: 'öğrenme çıktısı', hour: 16, minute: 0 },
      { keyword: 'rubrik', hour: 16, minute: 30 },
      { keyword: 'ksdt', hour: 15, minute: 0 },
      { keyword: 'nöbet', hour: 8, minute: 0 },
      { keyword: 'zümre', hour: 15, minute: 30 },
      { keyword: 'ek ders', hour: 17, minute: 0 },
      { keyword: 'tefbis', hour: 16, minute: 0 },
      { keyword: 'bep', hour: 14, minute: 30 },
      { keyword: 'iyep', hour: 15, minute: 0 },
      { keyword: 'mesem', hour: 10, minute: 0 },
      { keyword: 'tez savunma', hour: 14, minute: 0 },
      { keyword: 'bina sınav', hour: 8, minute: 0 },
      { keyword: 'okul gezisi', hour: 7, minute: 30 },
      { keyword: 'veli toplantısı', hour: 13, minute: 0 },
      { keyword: 'nakil', hour: 10, minute: 0 },
      { keyword: 'kura', hour: 10, minute: 30 },
      { keyword: 'karne', hour: 9, minute: 0 },
      { keyword: 'maddi hata', hour: 11, minute: 0 }
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
      'takipsizlik kararı', 'segbis', 'istintak', 'uets', 'uets tebligat',
      'tebligat 7/a', '7/a', 'tebliğ sayılma', 'duruşmaya gir', 'duruşmam var',
      'mazeret gönder', 'istinaf süresi', 'gerekçeli karar yazımı', 'hmk 30 gün'
    ],
    supportingKeywords: [
      'duruşma', 'adliye', 'mahkeme', 'savcı', 'savcılık', 'hâkim', 'hakim',
      'dava', 'müvekkil', 'tutanak', 'keşif', 'ihtarname', 'haciz', 'satış',
      'itiraz', 'dilekçe', 'tahliye', 'icra', 'avukat'
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
      'oyun geliştirme', 'oyun geliştirme prosedürü', 'oyun gelistirme proseduru', 'game development', 'game dev',
      'game design document', 'gdd', 'oyun motoru', 'unity', 'unreal engine', 'godot', 'game loop', 'gameplay mechanics',
      'oyunda arayüz güncellemeleri', 'oyunda arayüz güncellemesi', 'oyunda arayüz', 'oyun arayüzü', 'arayüz güncellemesi',
      'arayüz güncellemeleri', 'ui güncellemesi', 'ux revizyonu', 'ui/ux güncellemesi', 'gamedev ui',
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
      'oyun', 'oyunda', 'arayüz', 'arayüzü', 'güncellemeleri', 'güncellemesi', 'ui', 'ux', 'hud', 'menu', 'tasarım',
      'geliştirme', 'prosedür', 'prosedürü', 'game', 'level', 'asset', 'shader',
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
      { keyword: 'oyun', hour: 11, minute: 0 }
    ]
  },
  {
    domain: 'TEKNIK',
    defaultIcon: '💻',
    defaultColor: '#E0F2FE',
    exclusiveKeywords: [
      'oyun geliştirme', 'oyun geliştirme prosedürü', 'oyun gelistirme proseduru', 'game development', 'game dev',
      'game design document', 'gdd', 'oyun motoru', 'unity', 'unreal engine', 'godot', 'game loop', 'gameplay mechanics',
      'oyunda arayüz güncellemeleri', 'oyunda arayüz güncellemesi', 'oyunda arayüz', 'oyun arayüzü', 'arayüz güncellemesi',
      'arayüz güncellemeleri', 'ui güncellemesi', 'ux revizyonu', 'ui/ux güncellemesi', 'gamedev ui',
      'siem', 'soc', 'siem kurulumu', 'korelasyon kuralı', 'edr', 'xdr',
      'firewall', 'fortigate', 'palo alto', 'waf', 'active directory',
      'domain controller', 'gpo', 'veeam', 'disaster recovery', 'dr tatbikatı',
      'dr testi', 'kubernetes', 'k8s', 'docker', 'pentest', 'sızma testi',
      'zafiyet tarama', 'syslog', 'log analizi', 'uat testi', 'poc sunumu',
      'loto', 'kompanzasyon', 'prod deploy', 'staging', 'hotfix', 'semver', 'db migration'
    ],
    supportingKeywords: [
      'oyun', 'oyunda', 'arayüz', 'arayüzü', 'güncellemeleri', 'güncellemesi', 'ui', 'ux', 'hud', 'menu', 'tasarım',
      'geliştirme', 'prosedür', 'prosedürü', 'game', 'level', 'asset', 'shader',
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
      { keyword: 'oyun', hour: 11, minute: 0 }
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
    defaultIcon: '👮',
    defaultColor: '#BFDBFE',
    exclusiveKeywords: [
      'içtima', 'tekmil', 'doldur-boşalt', 'doldur boşalt', 'mühimmat sandığı', 'silahlık sayımı',
      'nöbetçi subayı', 'nöbetçi astsubayı', 'asayiş fezlekesi', 'adli emanet bürosu',
      'olay yeri inceleme', 'cmk 91', 'nezarethane defteri', 'scba solunum', '5188 sayılı',
      'x-ray bagaj', 'balistik kovan', 'parola-işaret', 'hazır kıta', 'arazöz su'
    ],
    supportingKeywords: [
      'bölük', 'tabur', 'takım', 'karakol', 'polis', 'asker',
      'devriye', 'gözaltı', 'atış', 'tatbikat', 'emniyet', 'jandarma',
      'itfaiye', 'ögg', 'özel güvenlik', 'çelik yelek', 'gbt sorgu', 'yol kontrol'
    ],
    implicitTimeHooks: [
      { keyword: 'içtima', hour: 7, minute: 40 },
      { keyword: 'devir-teslim', hour: 8, minute: 0 },
      { keyword: 'gözaltı', hour: 14, minute: 0 },
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
  },
  {
    domain: 'SANAT_MEDYA',
    defaultIcon: '🎬',
    defaultColor: '#FFE4E6',
    exclusiveKeywords: [
      'call sheet', 'callsheet', 'çekim planı', 'cekim plani', 'klaket', 'gaffer',
      'dit', 'silverstack', 'shotput pro', 'prores', 'apple prores', 'dnxhr',
      'color grading', 'davinci resolve', 'vectorscope', 'show lut', '-23 lufs',
      'ebu r128', 'broadcast master', 'soundcheck', 'teknik rider', 'stage plot',
      'in-ear monitör', 'rf tarama', 'isrc', 'isrc kodu', 'mesam', 'müyap',
      'split sheet', 'raw retouch', 'colorchecker', 'vernisaj', 'küratör',
      'fine art baskı', 'paspartu', 'basın bülteni', 'medya ambargosu',
      'liveu', 'tvu', 'rundown', 'dress rehearsal', '5846 sayılı', 'fsek',
      'telif sözleşmesi', 'mali hak devri', 'reels', 'tiktok', 'shorts',
      'kanca', 'hook', 'retention', 'dikey video', 'auto caption', 'trend ses',
      'influencer', '#işbirliği', '#isbirligi', 'işbirliği', 'isbirligi', 'sponsorlu içerik',
      'meta ads', 'tiktok ads', 'roas', 'ctr', 'pixel', 'conversions api',
      'içerik takvimi', 'icerik takvimi', 'carousel', 'kaydırmalı post', 'prime time',
      'sosyal medya kriz', 'troll saldırısı', 'bot saldırısı', 'kara liste',
      'youtube seo', 'thumbnail', 'video chapters', 'end screen', 'tiktok live',
      'instagram live', 'stream key', 'obs studio'
    ],
    supportingKeywords: [
      'set', 'çekim', 'kurgu', 'montaj', 'render', 'export', 'reji',
      'kamera', 'ışık', 'ses', 'mikser', 'konser', 'tiyatro', 'prova',
      'sergi', 'galeri', 'haber', 'spiker', 'bülten', 'fotoğraf',
      'stüdyo', 'deklanşör', 'telif', 'şarkı', 'albüm', 'single',
      'sosyal medya', 'story', 'post', 'takipçi', 'etkileşim', 'algoritma',
      'canlı yayın', 'yayıncı', 'akış', 'feed', 'grid', 'bio link'
    ],
    implicitTimeHooks: [
      { keyword: 'call sheet', hour: 6, minute: 30 },
      { keyword: 'set', hour: 6, minute: 30 },
      { keyword: 'soundcheck', hour: 16, minute: 0 },
      { keyword: 'render', hour: 19, minute: 0 },
      { keyword: 'vernisaj', hour: 18, minute: 30 },
      { keyword: 'basın bülteni', hour: 9, minute: 30 },
      { keyword: 'canlı yayın', hour: 19, minute: 30 },
      { keyword: 'prova', hour: 19, minute: 0 },
      { keyword: 'reels', hour: 19, minute: 30 },
      { keyword: 'tiktok', hour: 20, minute: 0 },
      { keyword: 'içerik takvimi', hour: 10, minute: 0 },
      { keyword: 'prime time', hour: 19, minute: 30 },
      { keyword: 'youtube', hour: 18, minute: 0 }
    ]
  },

  // =========================================================================
  // MYK RESMÎ 27 SEKTÖR STANDARDI RADAR KURALLARI
  // =========================================================================
  {
    domain: 'ADALET_GUVENLIK',
    defaultIcon: '⚖️',
    defaultColor: '#E0E7FF',
    exclusiveKeywords: [
      'uets', 'mazeret dilekçesi', 'tensip', 'celse', 'icra takibi', '89/1',
      'gerekçeli karar', 'bilirkişi raporu', 'arabuluculuk', 'uzlaştırma',
      'kıymet takdiri', 'haciz ihbarnamesi', 'cmk 100', 'cmk 101', 'kyok',
      'takipsizlik kararı', 'segbis', 'istintak', 'gözaltı süresi', 'nezarethane',
      'savcılık fezlekesi', 'adli emanet', 'doldur-boşalt', 'scba', '5188 sayılı'
    ],
    supportingKeywords: [
      'uyap', 'duruşma', 'adliye', 'mahkeme', 'savcı', 'hakim', 'avukat',
      'polis', 'asker', 'itfaiye', 'emniyet', 'jandarma', 'güvenlik', 'tutanak'
    ],
    implicitTimeHooks: [
      { keyword: 'duruşma', hour: 9, minute: 30 },
      { keyword: 'uyap', hour: 16, minute: 0 },
      { keyword: 'gözaltı', hour: 8, minute: 0 },
      { keyword: 'devriye', hour: 20, minute: 0 }
    ]
  },
  {
    domain: 'AGAC_KAGIT',
    defaultIcon: '🪵',
    defaultColor: '#FEF3C7',
    exclusiveKeywords: [
      'ebatlama', 'kesim planı', 'pvc kenar bant', 'kenar bantlama', 'mdf lam',
      'sunta lam', 'kontrplak', 'ahşap nemi', 'nem ölçer', 'planya', 'freze',
      'zıvana', 'marangoz', 'oluklu mukavva', 'fleksografik', 'bobin kağıt',
      'masura', 'kağıt hamuru', 'kraft kağıt'
    ],
    supportingKeywords: [
      'ahşap', 'mobilya', 'kereste', 'tomruk', 'tutkal', 'vernik', 'lake',
      'zımpara', 'kağıt', 'koli', 'ambalaj', 'kutu', 'palet'
    ],
    implicitTimeHooks: [
      { keyword: 'ebatlama', hour: 9, minute: 0 },
      { keyword: 'kesim', hour: 10, minute: 30 },
      { keyword: 'nem', hour: 14, minute: 0 }
    ]
  },
  {
    domain: 'BILISIM',
    defaultIcon: '💻',
    defaultColor: '#E0F2FE',
    exclusiveKeywords: [
      'oyun geliştirme', 'oyun geliştirme prosedürü', 'oyun gelistirme proseduru', 'game development', 'game dev',
      'game design document', 'gdd', 'oyun motoru', 'unity', 'unreal engine', 'godot', 'game loop', 'gameplay mechanics',
      'level design', 'bölüm tasarımı', 'playtest', 'oyun testi', 'shader optimizasyonu', 'draw call optimizasyonu',
      'sprite atlas', 'navmesh pathfinding', 'steam build deploy', 'itch.io release', 'oyun yayınlama',
      'prod deploy', 'production deploy', 'staging deploy', 'hotfix', 'semver',
      'pull request', 'pr review', 'db migration', 'database migration',
      'api endpoint', 'graphql query', 'rest api', 'docker container',
      'kubernetes pod', 'ci/cd pipeline', 'penetrasyon testi', 'firewall kuralı',
      'redis cache', 'postgresql query', 'mongodb aggregation',
      'canlıya al', 'canlıya alma', 'canliya al', 'rollback', 'rollback planı',
      'staging ortamı', 'p1 incident', 'canary deploy', 'blue green deploy'
    ],
    supportingKeywords: [
      'oyun', 'geliştirme', 'prosedür', 'prosedürü', 'game', 'level', 'asset', 'shader', 'fps',
      'yazılım', 'kod', 'developer', 'yazılımcı', 'sunucu', 'server', 'deploy',
      'commit', 'branch', 'merge', 'frontend', 'backend', 'devops', 'cloud', 'aws', 'bug',
      'staging', 'migration', 'database', 'veritabanı'
    ],
    implicitTimeHooks: [
      { keyword: 'deploy', hour: 10, minute: 0 },
      { keyword: 'pr review', hour: 14, minute: 0 },
      { keyword: 'standup', hour: 9, minute: 30 },
      { keyword: 'oyun', hour: 11, minute: 0 }
    ]
  },
  {
    domain: 'CAM_CIMENTO_TOPRAK',
    defaultIcon: '🧱',
    defaultColor: '#E2E8F0',
    exclusiveKeywords: [
      'klinker', 'hazır beton', 'slump testi', 'klinker fırını', 'refrakter tuğla',
      'tavlama fırını', 'temperli cam', 'lamine cam', 'düzcam kesim', 'basınç dayanımı',
      'seramik sır', 'karo seramik', 'porselen çamuru', 'agregat elek'
    ],
    supportingKeywords: [
      'çimento', 'beton', 'cam', 'seramik', 'fayans', 'tuğla', 'kiremit',
      'fırın', 'harç', 'toprak', 'kil', 'agrega', 'kum'
    ],
    implicitTimeHooks: [
      { keyword: 'slump', hour: 8, minute: 30 },
      { keyword: 'fırın', hour: 7, minute: 0 },
      { keyword: 'döküm', hour: 9, minute: 0 }
    ]
  },
  {
    domain: 'CEVRE',
    defaultIcon: '♻️',
    defaultColor: '#D1FAE5',
    exclusiveKeywords: [
      'çed raporu', 'çed gerekli değildir', 'motat', 'tehlikeli atık beyanı',
      'arıtma tesisi', 'atıksu deşarj', 'emisyon ölçümü', 'baca gazı analizi',
      'koi ölçümü', 'boi analizi', 'sıfır atık belgesi', 'çevre izin lisans',
      'karbon ayak izi', 'sera gazı doğrulama'
    ],
    supportingKeywords: [
      'çevre', 'atık', 'arıtma', 'geri dönüşüm', 'filtre', 'emisyon',
      'baca', 'numune', 'çevre mühendisi', 'koku', 'deşarj'
    ],
    implicitTimeHooks: [
      { keyword: 'numune', hour: 9, minute: 30 },
      { keyword: 'emisyon', hour: 11, minute: 0 },
      { keyword: 'motat', hour: 15, minute: 0 }
    ]
  },
  {
    domain: 'ELEKTRIK_ELEKTRONIK',
    defaultIcon: '⚡',
    defaultColor: '#FEF08A',
    exclusiveKeywords: [
      'loto', 'loto güvenlik prosedürleri', 'loto prosedürü', 'loto prosedürleri', 'kilitleme etiketleme', 'loto güvenlik',
      '30ma kaçak akım', '300ma yangın koruma', 'kompanzasyon panosu',
      'kondansatör kademesi', 'meger testi', 'yalıtım direnci', 'kontaktör bobini',
      'termik röle', 'plc panosu', 'scada ekranı', 'trafo hücresi', 'trafo buşingi',
      'reaktif ceza', 'endüktif ceza', 'kapasitif ceza', 'sayaç endeks', 'trafo bakımı', 'enerji kesme'
    ],
    supportingKeywords: [
      'elektrik', 'pano', 'şalter', 'voltaj', 'amper', 'topraklama', 'kablo',
      'sigorta', 'röle', 'inverter', 'motor sürücü', 'akım', 'gerilim', 'trafo'
    ],
    implicitTimeHooks: [
      { keyword: 'loto', hour: 8, minute: 0 },
      { keyword: 'sayaç', hour: 9, minute: 0 },
      { keyword: 'trafo', hour: 13, minute: 30 }
    ]
  },
  {
    domain: 'ENERJI',
    defaultIcon: '🔋',
    defaultColor: '#CFFAFE',
    exclusiveKeywords: [
      'epiaş göp', 'gün öncesi piyasası', 'dengelenme güç piyasası', 'ges santrali',
      'res rüzgar türbini', 'fotovoltaik panel', 'invertör arızası', 'trafo yağı dga',
      'reaktif güç cezası', 'fider açması', 'kombine çevrim santrali'
    ],
    supportingKeywords: [
      'enerji', 'elektrik üretim', 'santral', 'türbin', 'güneş', 'rüzgar',
      'megavat', 'mwh', 'şebeke', 'trafo', 'dağıtım', 'üretim'
    ],
    implicitTimeHooks: [
      { keyword: 'epiaş', hour: 11, minute: 30 },
      { keyword: 'göp', hour: 11, minute: 0 },
      { keyword: 'üretim', hour: 8, minute: 0 }
    ]
  },
  {
    domain: 'GIDA',
    defaultIcon: '🌾',
    defaultColor: '#ECFCCB',
    exclusiveKeywords: [
      'haccp', 'kritik kontrol noktası', 'ccp1', 'ccp2', 'parti no takibi',
      'lot izlenebilirlik', 'pastörizasyon sıcaklığı', 'pastörizatör', 'aflatoksin testi',
      'tett kontrolü', 'stt kontrolü', 'gıda hijyen tetkiki', 'soğuk zincir kırılması'
    ],
    supportingKeywords: [
      'gıda', 'üretim', 'numune', 'laboratuvar', 'soğuk oda', 'depo',
      'hijyen', 'kalite güvence', 'ambalaj', 'tadım', 'tarih'
    ],
    implicitTimeHooks: [
      { keyword: 'haccp', hour: 9, minute: 0 },
      { keyword: 'sıcaklık', hour: 8, minute: 30 },
      { keyword: 'numune', hour: 11, minute: 0 }
    ]
  },
  {
    domain: 'INSAAT',
    defaultIcon: '🏗️',
    defaultColor: '#FEF3C7',
    exclusiveKeywords: [
      '7 günlük kırım', '28 günlük kırım', 'küp numune etiketleme', 'slump deneyi',
      'demir donatı teslimi', 'paspayı kontrolü', 'yeşil defter metraj', 'ataşman faturası',
      'hakediş raporu', 'iskele periyodik kontrol', 'zemin etüdü spt', 'fore kazık donatı',
      'beton döktük', 'beton döküldü', 'c30 beton', 'c35 beton', 'küp kırımı', 'küp kırma',
      'demir vizesi', 'şantiye günlüğü', 'hakediş pursantajı', 'kür sulaması', 'transmikser'
    ],
    supportingKeywords: [
      'inşaat', 'şantiye', 'beton', 'demir', 'kalıp', 'mimar', 'şef',
      'proje', 'statik', 'harç', 'döküm', 'iskele', 'tuğla', 'döşeme'
    ],
    implicitTimeHooks: [
      { keyword: 'beton', hour: 8, minute: 0 },
      { keyword: 'döküm', hour: 8, minute: 30 },
      { keyword: 'kırım', hour: 10, minute: 0 },
      { keyword: 'hakediş', hour: 16, minute: 0 }
    ]
  },
  {
    domain: 'IS_YONETIM',
    defaultIcon: '🗂️',
    defaultColor: '#F1F5F9',
    exclusiveKeywords: [
      'sgk işe giriş', 'sgk işten çıkış', 'özlük dosyası denetimi', 'ik bordro',
      'iso 9001 döf', 'iç tetkik soru listesi', 'yönetim kurulu karar defteri',
      'hazirun cetveli', 'pmp sprint review', 'okr çeyrek değerlendirme'
    ],
    supportingKeywords: [
      'yönetim', 'şirket', 'toplantı', 'ik', 'insan kaynakları', 'personel',
      'bordro', 'izin', 'performans', 'proje', 'süreç', 'rapor'
    ],
    implicitTimeHooks: [
      { keyword: 'toplantı', hour: 10, minute: 0 },
      { keyword: 'bordro', hour: 16, minute: 0 },
      { keyword: 'mülakat', hour: 14, minute: 0 }
    ]
  },
  {
    domain: 'KIMYA_PETROL_PLASTIK',
    defaultIcon: '🧪',
    defaultColor: '#CCFBF1',
    exclusiveKeywords: [
      'güvenlik bilgi formu gbf', 'msds formu', 'plastik enjeksiyon kalıp',
      'ekstrüzyon hattı', 'polietilen granül', 'masterbatch boya', 'parlama noktası tayini',
      'vulkanizasyon presi', 'petrokimya rafineri', 'solvent buharı', 'statik topraklama pensesi'
    ],
    supportingKeywords: [
      'kimya', 'petrol', 'plastik', 'hammadde', 'reaktör', 'kazan',
      'enjeksiyon', 'kalıp', 'çözücü', 'kauçuk', 'varil', 'tank'
    ],
    implicitTimeHooks: [
      { keyword: 'kalıp', hour: 8, minute: 30 },
      { keyword: 'enjeksiyon', hour: 9, minute: 0 },
      { keyword: 'numune', hour: 14, minute: 0 }
    ]
  },
  {
    domain: 'KULTUR_SANAT_TASARIM',
    defaultIcon: '🎨',
    defaultColor: '#FCE7F3',
    exclusiveKeywords: [
      '5846 fsek telif', 'telif devir sözleşmesi', 'tasarım paftası', '3d render sahnesi',
      'vernisaj kokteyli', 'küratör sergi metni', 'fine art baskı onayı', 'pantone renk kodu',
      'koleksiyon lookbook', 'defile prova'
    ],
    supportingKeywords: [
      'tasarım', 'sanat', 'sergi', 'galeri', 'çizim', 'maket', 'moda',
      'grafik', 'illüstrasyon', 'tablo', 'sanatçı', 'ressam'
    ],
    implicitTimeHooks: [
      { keyword: 'vernisaj', hour: 18, minute: 30 },
      { keyword: 'render', hour: 19, minute: 0 },
      { keyword: 'sergi', hour: 17, minute: 0 }
    ]
  },
  {
    domain: 'MADEN',
    defaultIcon: '⛏️',
    defaultColor: '#E4E4E7',
    exclusiveKeywords: [
      'metan gazı ch4', 'karbonmonoksit co', 'tavan tahkimatı', 'maden aynası',
      'patlatma emniyet sahası', 'anfo şarjı', 'desandre inişi', 'sondör karot',
      'cevher flotasyonu', 'ocak çavuşu teftiş'
    ],
    supportingKeywords: [
      'maden', 'ocak', 'galeri', 'tahkimat', 'gaz', 'ölçüm', 'patlatma',
      'sondaj', 'kömür', 'cevher', 'kuyu', 'vardiya'
    ],
    implicitTimeHooks: [
      { keyword: 'gaz', hour: 7, minute: 30 },
      { keyword: 'patlatma', hour: 16, minute: 30 },
      { keyword: 'vardiya', hour: 8, minute: 0 }
    ]
  },
  {
    domain: 'MAKINE',
    defaultIcon: '⚙️',
    defaultColor: '#E2E8F0',
    exclusiveKeywords: [
      'hidrostatik basınç testi', 'vibrasyon analizi', 'rulman boşluğu',
      'cnc takım boyu sıfırlama', 'hidrolik yağ viskozite', 'pnömatik valf arızası',
      'kompresör periyodik test', 'buhar kazanı emniyet ventili', 'redüktör dişli boşluğu'
    ],
    supportingKeywords: [
      'makine', 'cnc', 'torna', 'freze', 'bakım', 'motor', 'yağlama',
      'rulman', 'hidrolik', 'pnömatik', 'kayış', 'basınç'
    ],
    implicitTimeHooks: [
      { keyword: 'bakım', hour: 8, minute: 30 },
      { keyword: 'test', hour: 10, minute: 0 },
      { keyword: 'cnc', hour: 9, minute: 0 }
    ]
  },
  {
    domain: 'MEDYA_ILETISIM_YAYIN',
    defaultIcon: '🎬',
    defaultColor: '#FFE4E6',
    exclusiveKeywords: [
      'call sheet planı', '-23 lufs yayın standardı', 'basın bülteni ambargosu',
      'liveu canlı yayın', 'reji akış formu', 'rundown program akışı', 'prompter metni',
      'montaj kurgu teslimi', 'ajans basın duyurusu'
    ],
    supportingKeywords: [
      'medya', 'haber', 'yayın', 'gazete', 'stüdyo', 'kamera', 'bülten',
      'röportaj', 'muhabir', 'reji', 'canlı yayın', 'spiker'
    ],
    implicitTimeHooks: [
      { keyword: 'bülten', hour: 9, minute: 30 },
      { keyword: 'canlı', hour: 19, minute: 0 },
      { keyword: 'çekim', hour: 7, minute: 0 }
    ]
  },
  {
    domain: 'METAL',
    defaultIcon: '🔩',
    defaultColor: '#E4E4E7',
    exclusiveKeywords: [
      'wps kaynak prosedürü', 'pqr kaynak onay', 'ndt tahribatsız muayene',
      'ultrasonik kaynak testi', 'manyetik partikül çatlak', 'indüksiyon ergitme ocağı',
      'ısıl işlem fırını sertlik', 'rockwell sertlik hrc', 'haddehane paso ayarı'
    ],
    supportingKeywords: [
      'metal', 'çelik', 'demir', 'kaynak', 'döküm', 'ısıl işlem', 'sac',
      'profil', 'torna', 'alev', 'elektrot', 'gazaltı'
    ],
    implicitTimeHooks: [
      { keyword: 'kaynak', hour: 8, minute: 30 },
      { keyword: 'döküm', hour: 10, minute: 0 },
      { keyword: 'muayene', hour: 14, minute: 0 }
    ]
  },
  {
    domain: 'OTOMOTIV',
    defaultIcon: '🚗',
    defaultColor: '#FFEDD5',
    exclusiveKeywords: [
      'obd arıza kodu', 'obd hata silme', 'bijon torklama', 'rot balans ayarı',
      'tüvtürk muayene randevu', 'amortisör patlağı', 'baskı balata debriyaj',
      'triger kayışı değişimi', 'motor yağ filtre bakımı', 'ekspertiz boya mikron'
    ],
    supportingKeywords: [
      'araba', 'araç', 'oto', 'tamir', 'servis', 'fren', 'lastik', 'motor',
      'akü', 'bakım', 'muayene', 'balata', 'yağ'
    ],
    implicitTimeHooks: [
      { keyword: 'bakım', hour: 9, minute: 0 },
      { keyword: 'teslimat', hour: 17, minute: 0 },
      { keyword: 'muayene', hour: 10, minute: 30 }
    ]
  },
  {
    domain: 'SAGLIK_SOSYAL',
    defaultIcon: '🩺',
    defaultColor: '#CCFBF1',
    exclusiveKeywords: [
      'sbar vardiya devri', 'aydınlatılmış onam imzası', '2-8°c aşı dolabı',
      'medula sut provizyon', 'kırmızı reçete its', 'triyaj acil değerlendirme',
      'cross-match kan uyumu', 'dekübitus pozisyon değişimi', 'epikriz çıkış özeti'
    ],
    supportingKeywords: [
      'hasta', 'doktor', 'hemşire', 'ilaç', 'tedavi', 'hastane', 'klinik',
      'pansuman', 'enjeksiyon', 'serum', 'ameliyat', 'vizit', 'nöbet'
    ],
    implicitTimeHooks: [
      { keyword: 'devir', hour: 7, minute: 30 },
      { keyword: 'vizit', hour: 9, minute: 0 },
      { keyword: 'pansuman', hour: 10, minute: 30 }
    ]
  },
  {
    domain: 'SPOR_REKREASYON',
    defaultIcon: '⚽',
    defaultColor: '#D1FAE5',
    exclusiveKeywords: [
      'yıllık periyodizasyon', 'laktat eşiği testi', 'vo2max ölçümü',
      'müsabaka esame listesi', 'hakem raporu tanzimi', 'sporcu lisans vize',
      'kondisyon antrenman nabzı', 'doping kontrol prosedürü'
    ],
    supportingKeywords: [
      'spor', 'antrenman', 'maç', 'turnuva', 'futbol', 'basketbol', 'fitness',
      'hoca', 'antrenör', 'takım', 'kulüp', 'koşu', 'idman'
    ],
    implicitTimeHooks: [
      { keyword: 'antrenman', hour: 10, minute: 0 },
      { keyword: 'maç', hour: 15, minute: 0 },
      { keyword: 'idman', hour: 17, minute: 30 }
    ]
  },
  {
    domain: 'TARIM_AV_BALIK',
    defaultIcon: '🌿',
    defaultColor: '#ECFCCB',
    exclusiveKeywords: [
      'çks', 'cks', 'çks kaydı', 'çks güncelleme', 'çks belgesi', 'çiftçi kayıt sistemi',
      'çks kayıt güncelleme', 'tarsim zirai don ihbarı', 'damlama sulama gübreleme',
      'phi hasat bekleme süresi', 'güneş kuralı sulama', 'bordo bulamacı ilaçlama',
      'av yasağı trol kontrolü', 'balıkçı ağ bakım'
    ],
    supportingKeywords: [
      'tarım', 'çiftçi', 'tarla', 'hasat', 'tohum', 'gübre', 'ilaçlama',
      'bahçe', 'sera', 'traktör', 'balık', 'tekne', 'avcılık'
    ],
    implicitTimeHooks: [
      { keyword: 'sulama', hour: 19, minute: 30 },
      { keyword: 'hasat', hour: 6, minute: 30 },
      { keyword: 'ilaçlama', hour: 7, minute: 0 }
    ]
  },
  {
    domain: 'TEKSTIL_GIYIM_DERI',
    defaultIcon: '🧵',
    defaultColor: '#FCE7F3',
    exclusiveKeywords: [
      'pastal planı kumaş', 'kumaş fire hesabı', 'yıkama çekmezlik testi',
      'proto numune onayı', 'modelist kalıp serileme', 'overlok dikiş ayarı',
      'iplik kopma mukavemeti', 'deri finisaj kontrolü'
    ],
    supportingKeywords: [
      'tekstil', 'kumaş', 'dikiş', 'iplik', 'kesim', 'konfeksiyon', 'giyim',
      'numune', 'model', 'astar', 'ütü', 'paket'
    ],
    implicitTimeHooks: [
      { keyword: 'pastal', hour: 8, minute: 30 },
      { keyword: 'numune', hour: 11, minute: 0 },
      { keyword: 'kesim', hour: 9, minute: 30 }
    ]
  },
  {
    domain: 'TOPLUMSAL_KISISEL',
    defaultIcon: '✂️',
    defaultColor: '#EDE9FE',
    exclusiveKeywords: [
      'oryal saç açma süresi', 'otoklav alet sterilizasyonu', 'kuru temizleme leke çıkarma',
      'dip boya bekletme', 'keratin saç botoksu', 'cilt bakım protokolü'
    ],
    supportingKeywords: [
      'kuaför', 'berber', 'güzellik', 'saç', 'boya', 'fön', 'manikür',
      'pedikür', 'cilt', 'kuru temizleme', 'terzi', 'ütü'
    ],
    implicitTimeHooks: [
      { keyword: 'oryal', hour: 10, minute: 0 },
      { keyword: 'randevu', hour: 11, minute: 0 },
      { keyword: 'boya', hour: 14, minute: 0 }
    ]
  },
  {
    domain: 'TURIZM_KONAKLAMA_YIYECEK',
    defaultIcon: '👨‍🍳',
    defaultColor: '#FFEDD5',
    exclusiveKeywords: [
      'overbooking', 'otel overbooking', 'overbooking kontrolü', 'çifte rezervasyon', 'mise en place', 'haccp',
      'mise en place hazırlık', 'haccp soğuk oda sıcaklık',
      'housekeeping oda teftişi', 'minibar folyo kontrolü', 'alakart servis tadımı',
      'front office check-in'
    ],
    supportingKeywords: [
      'otel', 'restoran', 'şef', 'aşçı', 'yemek', 'mutfak', 'resepsiyon',
      'oda', 'servis', 'menü', 'rezervasyon', 'misafir', 'tatil'
    ],
    implicitTimeHooks: [
      { keyword: 'mise en place', hour: 15, minute: 30 },
      { keyword: 'servis', hour: 18, minute: 30 },
      { keyword: 'check-in', hour: 14, minute: 0 }
    ]
  },
  {
    domain: 'ULASTIRMA_LOJISTIK',
    defaultIcon: '🚛',
    defaultColor: '#FEF3C7',
    exclusiveKeywords: [
      '4.5 saat aetr takograf', 'takograf mola denetimi', 'cmr hasar rezervi',
      'kantar tartım fişi', 'pre-trip lastik ve king-pin', 'psc denetimi liman',
      'draft survey yük hesabı', 'uçuş dispatch ofp'
    ],
    supportingKeywords: [
      'tır', 'kamyon', 'şoför', 'lojistik', 'sevk', 'irsaliye', 'yük',
      'kargo', 'kurye', 'gemi', 'kaptan', 'uçak', 'pilot', 'nakliye'
    ],
    implicitTimeHooks: [
      { keyword: 'kalkış', hour: 6, minute: 0 },
      { keyword: 'mola', hour: 12, minute: 0 },
      { keyword: 'teslimat', hour: 16, minute: 0 }
    ]
  }
];

/**
 * 0 MS DETERMINISTIK RADAR
 * Girdiyi harfiyat ve kelime sınırlarıyla regex üzerinden tarar.
 * Yüksek puan alan domain'i ve örtük kuralları anında döndürür.
 */
export const DOMAIN_FRIENDLY_LABELS: Record<string, string> = {
  HUKUK: 'Hukuk / Avukat',
  ADALET_GUVENLIK: 'Hukuk & Adalet',
  SAGLIK: 'Sağlık / Hekim',
  SAGLIK_SOSYAL: 'Sağlık & Klinik',
  MALIYE: 'Mali Müşavir / SMMM',
  FINANS: 'Finans & Muhasebe',
  EGITIM: 'Eğitim / Öğretmen',
  OGRENCI: 'Öğrenci & Akademi',
  MUHENDISLIK: 'Mühendislik / Şantiye',
  INSAAT: 'İnşaat / Şantiye',
  BILISIM: 'Yazılım / Bilişim',
  TEKNIK: 'Otomotiv / Sanayi',
  OTOMOTIV: 'Otomotiv / Sanayi',
  VETERINER: 'Veterinerlik',
  ECZACILIK: 'Eczacılık',
  ISG: 'İş Sağlığı ve Güvenliği',
  DENIZCILIK: 'Denizcilik',
  ZIRAAT: 'Ziraat / Çiftçi',
  TARIM_AV_BALIK: 'Tarım & Ziraat',
  SAVUNMA: 'Askeri / Savunma',
  EMNIYET: 'Emniyet / Polis',
  GASTRONOMI: 'Gastronomi / Şef',
  GIDA: 'Gıda & Mutfak',
  HAVACILIK: 'Havacılık / Pilot',
  KAMU: 'Bürokrasi / Memur',
  TICARET: 'Ticaret & Esnaf',
  IS_YONETIM: 'İş Yönetimi & Kurumsal',
  EMLAK: 'Gayrimenkul / Emlak',
  GUMRUK: 'Gümrük & Dış Ticaret',
  KUAFOR: 'Kişisel Bakım & Kuaför',
  SANAT_MEDYA: 'Sanat & Medya',
  MEDYA_ILETISIM_YAYIN: 'Medya & Yayıncılık',
  ELEKTRIK_ELEKTRONIK: 'Elektrik & Elektronik',
  MAKINE: 'Makine Mühendisliği',
  ENERJI: 'Enerji & Şebeke',
  MADEN: 'Madencilik & Jeoloji',
  METAL: 'Metal & İmalat',
  KIMYA_PETROL_PLASTIK: 'Kimya & Rafineri',
  TEKSTIL_GIYIM_DERI: 'Tekstil & Moda',
  TURIZM_KONAKLAMA_YIYECEK: 'Turizm & Otelcilik',
  ULASTIRMA_LOJISTIK: 'Lojistik & Nakliye',
  LOJISTIK: 'Lojistik & Taşımacılık',
  GENEL: 'Genel Not',
  SADE: 'Sade Not',
  CALISMIYORUM: 'Günlük Yaşam'
};

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

  let bestDomain: ProfessionDomain = fallbackDomain === 'OTOMATIK_JARGON' ? 'GENEL' : fallbackDomain;
  let highestScore = 0;
  let bestMatches: string[] = [];
  let matchedRule: DomainRule | null = null;
  const candidateScores: AmbiguousDomainCandidate[] = [];

  for (const rule of DOMAIN_RULES) {
    let currentScore = 0;
    const currentMatches: string[] = [];

    // 1. Kesin terimler kontrolü (Exclusive: Her biri 65 puan)
    for (const kw of rule.exclusiveKeywords) {
      const escaped = kw.replace('-', '[- ]?').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|\\s)${escaped}(?:yi|ye|ya|yu|yı|da|de|ta|te|dan|den|nin|nın|nun|nün|si|sı|su|sü)?($|\\s)`, 'i');
      if (regex.test(normalized)) {
        currentScore += 65;
        currentMatches.push(kw);
      }
    }

    // 2. Destekleyici terimler kontrolü (Supporting: Her biri 20 puan)
    for (const kw of rule.supportingKeywords) {
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|\\s)${escaped}(?:yi|ye|ya|yu|yı|da|de|ta|te|dan|den|nin|nın|nun|nün|si|sı|su|sü)?($|\\s)`, 'i');
      if (regex.test(normalized)) {
        currentScore += 20;
        currentMatches.push(kw);
      }
    }

    // Kullanıcının mevcut seçili profiline hafif ağırlık (+15) (Otomatik Jargon modunda tüm sektörler tarafsız ve eşit taranır)
    if (rule.domain === fallbackDomain && fallbackDomain !== 'GENEL' && fallbackDomain !== 'OTOMATIK_JARGON') {
      currentScore += 15;
    }

    if (currentScore >= 20 && currentMatches.length > 0) {
      const domainLabel = DOMAIN_FRIENDLY_LABELS[rule.domain] || String(rule.domain);
      candidateScores.push({
        domain: rule.domain,
        score: currentScore,
        matchedKeywords: currentMatches,
        domainLabel,
        suggestedIcon: rule.defaultIcon,
        suggestedColor: rule.defaultColor,
        description: `${currentMatches.join(', ')} (${domainLabel})`
      });
    }

    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestDomain = rule.domain;
      bestMatches = currentMatches;
      matchedRule = rule;
    }
  }

  // Adayları puana göre azalan sırala
  candidateScores.sort((a, b) => b.score - a.score);

  // Belirsizlik / İkilem (Ambiguity) Tespiti:
  // Eğer en az 2 farklı mesleki alan eşleştiyse ve puanları birbirine çok yakınsa
  let isAmbiguous = false;
  let candidateDomains: AmbiguousDomainCandidate[] | undefined = undefined;
  let clarificationQuestion: string | undefined = undefined;

  const distinctCandidates: AmbiguousDomainCandidate[] = [];
  const seenDomains = new Set<string>();
  for (const cand of candidateScores) {
    if (!seenDomains.has(cand.domain)) {
      seenDomains.add(cand.domain);
      distinctCandidates.push(cand);
    }
  }

  if (distinctCandidates.length >= 2) {
    const top1 = distinctCandidates[0];
    const top2 = distinctCandidates[1];
    
    // İkilem şartı: En az 2 alan eşleştiğinde ve ikisi de önemli bir puan aldığında
    const hasCloseScores = (top1.score - top2.score) <= 35 && top2.score >= 20;
    const hasMultipleExclusive = top1.score >= 60 && top2.score >= 60;

    if (hasCloseScores || hasMultipleExclusive) {
      isAmbiguous = true;
      candidateDomains = distinctCandidates.slice(0, 3);
      const domainOptionsText = candidateDomains.map(c => `${c.suggestedIcon} ${c.domainLabel}`).join(' veya ');
      clarificationQuestion = `Bunu mu demek istediniz: ${domainOptionsText}?`;
    }
  }

  // Eşik: Otomatik Jargon modunda herhangi bir sektörel terim (20+), diğer modlarda 40+
  const threshold = fallbackDomain === 'OTOMATIK_JARGON' ? 20 : 40;
  if (highestScore >= threshold && matchedRule) {
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
      reason: fallbackDomain === 'OTOMATIK_JARGON'
        ? `Otomatik Jargon: ${bestMatches.join(', ')} (${bestDomain})`
        : `Tespit edilen sektörel jargon: ${bestMatches.join(', ')}`,
      isAmbiguous,
      candidateDomains,
      clarificationQuestion,
    };
  }

  // Eşik aşılmadıysa fallback'i koru
  return {
    detectedDomain: fallbackDomain === 'OTOMATIK_JARGON' ? 'GENEL' : fallbackDomain,
    confidence: 0.1,
    matchedKeywords: [],
    suggestedIcon: fallbackDomain === 'OTOMATIK_JARGON' ? '🎯' : '📌',
    suggestedColor: '#FEF3C7',
    reason: fallbackDomain === 'OTOMATIK_JARGON' ? 'Otomatik Jargon (Genel mod)' : undefined,
    isAmbiguous: false,
  };
}

export interface JargonKeywordInsight {
  keyword: string;
  count: number;
  percentage: number;
  domain: ProfessionDomain;
  domainLabel: string;
  suggestedIcon: string;
  suggestedColor: string;
}

export interface JargonInsightsResult {
  activeDomain: ProfessionDomain;
  activeDomainLabel: string;
  totalNotesAnalyzed: number;
  notesWithJargonCount: number;
  topKeywords: JargonKeywordInsight[];
  totalJargonOccurrences: number;
  hasJargonData: boolean;
}

/**
 * Kullanıcının mevcut notlarını ve seçtiği uzmanlık alanını analiz ederek
 * kart listesinde en sık kullanılan jargon kelimelerini hesaplar.
 */
export function analyzeJargonInsights(
  notes: { baslik: string; hamMetin?: string; action_items?: { task: string }[] }[],
  userDomain: ProfessionDomain = 'OTOMATIK_JARGON'
): JargonInsightsResult {
  const activeDomainLabel = DOMAIN_FRIENDLY_LABELS[userDomain] || (userDomain === 'OTOMATIK_JARGON' ? 'Otomatik Jargon Radarı' : String(userDomain));

  if (!notes || notes.length === 0) {
    return {
      activeDomain: userDomain,
      activeDomainLabel,
      totalNotesAnalyzed: 0,
      notesWithJargonCount: 0,
      topKeywords: [],
      totalJargonOccurrences: 0,
      hasJargonData: false,
    };
  }

  let notesWithJargonCount = 0;
  let totalJargonOccurrences = 0;
  const keywordMap = new Map<string, {
    count: number;
    domain: ProfessionDomain;
    domainLabel: string;
    icon: string;
    color: string;
  }>();

  for (const note of notes) {
    const actionText = note.action_items ? note.action_items.map(a => a.task).join(' ') : '';
    const fullText = `${note.baslik || ''} ${note.hamMetin || ''} ${actionText}`.trim();
    if (!fullText) continue;

    const radar = detectDomainFromJargon(fullText, userDomain);
    if (radar.matchedKeywords && radar.matchedKeywords.length > 0) {
      notesWithJargonCount++;
      for (const kw of radar.matchedKeywords) {
        totalJargonOccurrences++;
        const key = kw.toLowerCase();
        const existing = keywordMap.get(key);
        if (existing) {
          existing.count++;
        } else {
          keywordMap.set(key, {
            count: 1,
            domain: radar.detectedDomain,
            domainLabel: DOMAIN_FRIENDLY_LABELS[radar.detectedDomain] || String(radar.detectedDomain),
            icon: radar.suggestedIcon || '🎯',
            color: radar.suggestedColor || '#FEF3C7',
          });
        }
      }
    }
  }

  const sortedList = Array.from(keywordMap.entries())
    .map(([kw, data]) => ({
      keyword: kw.charAt(0).toLocaleUpperCase('tr-TR') + kw.slice(1),
      count: data.count,
      percentage: totalJargonOccurrences > 0 ? Math.round((data.count / totalJargonOccurrences) * 100) : 0,
      domain: data.domain,
      domainLabel: data.domainLabel,
      suggestedIcon: data.icon,
      suggestedColor: data.color,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    activeDomain: userDomain,
    activeDomainLabel,
    totalNotesAnalyzed: notes.length,
    notesWithJargonCount,
    topKeywords: sortedList.slice(0, 8),
    totalJargonOccurrences,
    hasJargonData: sortedList.length > 0,
  };
}
