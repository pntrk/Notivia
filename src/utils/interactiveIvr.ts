import type { ProfessionDomain } from '../types/domainThemes.ts';
import { detectDomainFromJargon, type AmbiguousDomainCandidate } from './jargonRadar.ts';
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
  isAmbiguous?: boolean;
  candidateDomains?: AmbiguousDomainCandidate[];
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
    domain: 'FINANS',
    icon: '📊',
    routeTitle: 'KDV & MUHSGK Beyanname Onayı',
    institution: 'Gelir İdaresi Başkanlığı (GİB)',
    fullPrompt: 'KDV beyannamesi ve fatura dökümü'
  },
  {
    label: 'e-Defter beratı',
    domain: 'FINANS',
    icon: '📈',
    routeTitle: 'e-Defter Berat Yüklemesi',
    institution: 'Gelir İdaresi Başkanlığı (GİB)',
    fullPrompt: 'e-Defter beratı onay ve yükleme'
  },
  {
    label: 'Çek provizyonu',
    domain: 'FINANS',
    icon: '💸',
    routeTitle: 'Çek Takas & Provizyon (11:00)',
    institution: 'Bankalararası Takas Odası',
    fullPrompt: 'Çek takas saati provizyon ve karşılıksız önleme'
  },
  {
    label: 'Hazine nakit akışı',
    domain: 'FINANS',
    icon: '💰',
    routeTitle: 'Nakit Akışı & 16:30 Repo',
    institution: 'Kurumsal Hazine / TCMB',
    fullPrompt: 'Günlük hazine nakit akışı ve gecelik repo nemalandırma'
  },
  {
    label: 'VİOP teminat',
    domain: 'FINANS',
    icon: '⚠️',
    routeTitle: 'VİOP Margin Call (14:30)',
    institution: 'Borsa İstanbul / Takasbank',
    fullPrompt: 'VİOP margin call teminat tamamlama'
  },
  {
    label: 'KDV İadesi & YMM',
    domain: 'FINANS',
    icon: '📑',
    routeTitle: 'YMM KDV İadesi & GEKSİS',
    institution: 'Gelir İdaresi / Vergi Dairesi',
    fullPrompt: 'YMM KDV iadesi karşıt inceleme ve GEKSİS raporu'
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
  // Eğitim & Maarif Modeli
  {
    label: 'Maarif ders planı',
    domain: 'EGITIM',
    icon: '🌟',
    routeTitle: 'Maarif Modeli Ders Planı & ÖÇ',
    institution: 'Milli Eğitim Bakanlığı / TTKB',
    fullPrompt: 'Öğrenme çıktısı ve beceri örgüsüne göre Maarif ders planı hazırla'
  },
  {
    label: 'Süreç odaklı rubrik',
    domain: 'EGITIM',
    icon: '📝',
    routeTitle: 'Süreç Odaklı Ölçme & KSDT Rubrik',
    institution: 'MEB Ölçme ve Değerlendirme Merkezi',
    fullPrompt: 'Konu soru dağılım tablosuna göre açık uçlu sınav ve rubrik hazırla'
  },
  {
    label: 'Maarif farklılaştırma',
    domain: 'EGITIM',
    icon: '🎯',
    routeTitle: 'Maarif Zenginleştirme & Destekleme',
    institution: 'Milli Eğitim Bakanlığı / Temel Eğitim',
    fullPrompt: 'Öğrenciler için zenginleştirme ve destekleme farklılaştırılmış eğitim planı'
  },
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
  },
  {
    label: 'e-Okul Nakil Kabul',
    domain: 'EGITIM',
    icon: '🔄',
    routeTitle: 'e-Okul Öğrenci Nakil & Kontenjan Kabulü',
    institution: 'MEB / e-Okul Yönetim Bilgi Sistemi',
    fullPrompt: 'e okul öğrenci nakil işlemini gerçekleştir'
  },
  {
    label: 'Kura & Şube Belirleme',
    domain: 'EGITIM',
    icon: '🎲',
    routeTitle: 'e-Okul Merkezi Kura & Şube Belirleme',
    institution: 'MEB / e-Okul Kura Modülü',
    fullPrompt: 'e-okul şube kuralarını çek ve komisyon tutanağı hazırla'
  },
  {
    label: 'Sosyal Etkinlik Onayı',
    domain: 'EGITIM',
    icon: '🏆',
    routeTitle: 'e-Okul Sosyal Etkinlik & e-Portfolyo Onayı',
    institution: 'MEB / e-Okul Sosyal Etkinlik',
    fullPrompt: 'e-okul sosyal etkinlik modülündeki başvuruları onayla'
  },
  {
    label: 'ŞÖK Kararları Girişi',
    domain: 'EGITIM',
    icon: '📋',
    routeTitle: 'e-Okul ŞÖK Karar Girişi & Tedbir Planı',
    institution: 'MEB / e-Okul ŞÖK Modülü',
    fullPrompt: 'şök kararlarını e-okul sistemine işle ve tedbir planı hazırla'
  },
  {
    label: 'Karne & Belge Basımı',
    domain: 'EGITIM',
    icon: '📜',
    routeTitle: 'e-Okul Karne & Belge Basımı',
    institution: 'MEB / e-Okul Belge Basım',
    fullPrompt: 'e-okul dönem sonu karne ve takdir teşekkür belgelerini bas'
  },
  {
    label: 'Maddi Hata Not Düzeltme',
    domain: 'EGITIM',
    icon: '⚖️',
    routeTitle: 'e-Okul Not Düzeltme & Maddi Hata Komisyonu',
    institution: 'MEB / Ölçme Değerlendirme Komisyonu',
    fullPrompt: 'sınav notuna itiraz için maddi hata inceleme komisyonu kur'
  },
  // Sanat, Medya & Prodüksiyon
  {
    label: 'Call Sheet hazırla',
    domain: 'SANAT_MEDYA',
    icon: '🎬',
    routeTitle: 'Günlük Set Çekim Planı (Call Sheet)',
    institution: 'Sinema / Dizi Prodüksiyonu',
    fullPrompt: 'Yarın sabah 06:30 günlük call sheet ve çekim planı hazırla'
  },
  {
    label: 'Render al (-23 LUFS)',
    domain: 'SANAT_MEDYA',
    icon: '🖥️',
    routeTitle: 'EBU R128 Broadcast Master Export',
    institution: 'RTÜK / Broadcast Standardı',
    fullPrompt: 'Kurgu bitti -23 LUFS broadcast master render al'
  },
  {
    label: 'Konser soundcheck',
    domain: 'SANAT_MEDYA',
    icon: '🎙️',
    routeTitle: 'Konser Soundcheck & RF Frekans Taraması',
    institution: 'Canlı Performans & Sahne Amirliği',
    fullPrompt: 'Konser soundcheck saat 16:00 teknik rider ve RF taraması'
  },
  {
    label: 'FSEK Telif devri',
    domain: 'SANAT_MEDYA',
    icon: '📜',
    routeTitle: '5846 Sayılı FSEK Telif & Eser Devri',
    institution: 'Kültür ve Turizm Bakanlığı (Telif Hakları)',
    fullPrompt: '5846 FSEK mali hak devir sözleşmesi ve oyuncu muvafakatnamesi'
  },
  {
    label: 'DIT çift SSD yedek',
    domain: 'SANAT_MEDYA',
    icon: '💾',
    routeTitle: 'DIT Checksum & RAW Veri Güvenliği',
    institution: 'Kamera & DIT Departmanı',
    fullPrompt: 'DIT veri aktarımı çift SSD checksum doğrulama'
  },
  {
    label: 'Basın bülteni ambargo',
    domain: 'SANAT_MEDYA',
    icon: '📰',
    routeTitle: 'Basın Bülteni & Medya Ambargosu',
    institution: 'Medya & İletişim Ajansı',
    fullPrompt: 'Basın bülteni hazırla sabah 09:30 ambargolu servis'
  },
  {
    label: 'Reels kanca (Hook) planı',
    domain: 'SANAT_MEDYA',
    icon: '📱',
    routeTitle: 'Reels & TikTok Retention & Kanca',
    institution: 'Sosyal Medya & İçerik Üretimi',
    fullPrompt: 'Reels kanca ve retention optimizasyonu 9:16 altyazı hazırla'
  },
  {
    label: 'Influencer #işbirliği briefi',
    domain: 'SANAT_MEDYA',
    icon: '🤝',
    routeTitle: 'Ticaret Bakanlığı #İşbirliği Protokolü',
    institution: 'Ticaret Bakanlığı / Tüketici Hakları',
    fullPrompt: 'Influencer ürün tanıtımı #işbirliği yasal briefi hazırla'
  },
  {
    label: 'Meta Ads & ROAS hedefi',
    domain: 'SANAT_MEDYA',
    icon: '📈',
    routeTitle: 'Meta & TikTok Ads Performans Pazarlama',
    institution: 'Dijital Pazarlama & Performans',
    fullPrompt: 'Meta ads reklam kampanyası CAPI ve piksel ROAS optimizasyonu'
  },
  // Bilişim & Yazılım
  {
    label: 'Prod deploy',
    domain: 'BILISIM',
    icon: '🚀',
    routeTitle: 'Prod Canlıya Alma & Rollback',
    institution: 'Sanayi ve Teknoloji Bak. / Yazılım Ekibi',
    fullPrompt: 'Prod deploy öncesi DB migration yedeği ve staging onayı al'
  },
  {
    label: 'DB migration',
    domain: 'BILISIM',
    icon: '🗄️',
    routeTitle: 'Veritabanı Şema Güncellemesi',
    institution: 'DevOps & Veritabanı Mimarisi',
    fullPrompt: 'PostgreSQL migration scriptini çalıştır ve snapshot al'
  },
  {
    label: 'Hotfix & SemVer',
    domain: 'BILISIM',
    icon: '💻',
    routeTitle: 'Acil Hotfix & Sürüm Etiketi',
    institution: 'Yazılım Kalite & Git Release',
    fullPrompt: 'P1 incident için acil hotfix çıkar ve semver etiketle'
  },
  // İnşaat
  {
    label: 'Küp kırımı',
    domain: 'INSAAT',
    icon: '🏗️',
    routeTitle: '7 ve 28 Gün Laboratuvar Kırımı',
    institution: 'Çevre ve Şehircilik / Yapı Denetim',
    fullPrompt: 'Dökülen C30 betonun 7 günlük küp kırım testi raporu'
  },
  {
    label: 'Demir donatı vizesi',
    domain: 'INSAAT',
    icon: '📐',
    routeTitle: 'Donatı İmalat & Paspayı Vizesi',
    institution: 'Yapı Denetim Kuruluşu',
    fullPrompt: 'Kolon ve kiriş donatı teslimi paspayı kontrolü'
  },
  {
    label: 'Şantiye günlüğü',
    domain: 'INSAAT',
    icon: '📝',
    routeTitle: 'Günlük Şantiye İmalat Defteri',
    institution: 'Şantiye Şefliği & Müşavir',
    fullPrompt: 'Hava durumu işçi mevcudu ve döküm şantiye günlüğünü doldur'
  },
  // Elektrik & Elektronik
  {
    label: 'LOTO kilitleme',
    domain: 'ELEKTRIK_ELEKTRONIK',
    icon: '🔒',
    routeTitle: 'LOTO Kilitleme & Enerji İzolasyonu',
    institution: 'TEİAŞ / TEDAŞ / İSG Kurulu',
    fullPrompt: 'Ana besleme panosunda LOTO kilitleme ve gerilim sıfırlama yap'
  },
  {
    label: 'Kompanzasyon kontrolü',
    domain: 'ELEKTRIK_ELEKTRONIK',
    icon: '⚡',
    routeTitle: 'Reaktif Ceza Sınırı Kontrolü (%20/%15)',
    institution: 'Elektrik Dağıtım Şirketi (EDAŞ)',
    fullPrompt: 'Kompanzasyon panosu kondansatör kademeleri ve endeks okuması'
  },
  {
    label: 'Meger izolasyon testi',
    domain: 'ELEKTRIK_ELEKTRONIK',
    icon: '🔌',
    routeTitle: 'Yalıtım Direnci & Meger Ölçümü',
    institution: 'TMMOB EMO / Akredite Lab',
    fullPrompt: 'Kablo hatları ve motor sargıları meger izolasyon testi'
  },
  // Makine & İmalat
  {
    label: 'Hidrostatik basınç testi',
    domain: 'MAKINE',
    icon: '⚙️',
    routeTitle: 'Kazan & Basınçlı Kap Yasal Testi',
    institution: 'Makina Mühendisleri Odası (MMO)',
    fullPrompt: 'Basınçlı hava tankı 1.5 katı hidrostatik basınç testi ve emniyet ventili'
  },
  {
    label: 'Vibrasyon analizi',
    domain: 'MAKINE',
    icon: '📉',
    routeTitle: 'Kestirimci Bakım & Rulman Analizi',
    institution: 'Endüstriyel Bakım & Güvenilirlik',
    fullPrompt: 'Ana pompa rulmanlarında vibrasyon ve spektrum analizi yap'
  },
  {
    label: 'CNC takım sıfırlama',
    domain: 'MAKINE',
    icon: '🔩',
    routeTitle: 'CNC Takım Boyu & Parça Sıfırlama',
    institution: 'Hassas Talaşlı İmalat Atölyesi',
    fullPrompt: 'CNC işleme merkezinde takım boyu sıfırlama ve parça prova'
  },
  // Metal
  {
    label: 'WPS / PQR kaynak testi',
    domain: 'METAL',
    icon: '🔥',
    routeTitle: 'Kaynak Prosedürü & NDT Muayenesi',
    institution: 'Türk Loydu / Akredite Metalurji Lab',
    fullPrompt: 'Çelik konstrüksiyon kaynaklarında ultrasonik NDT muayenesi'
  },
  // Havacılık
  {
    label: 'OFP Dispatch brifingi',
    domain: 'HAVACILIK',
    icon: '✈️',
    routeTitle: 'Uçuş Öncesi Dispatch & METAR/TAF',
    institution: 'Sivil Havacılık Gn. Md. (SHGM) / DHMİ',
    fullPrompt: 'Kalkıştan 90 dk önce dispatch OFP paketi ve rota hava durumu'
  },
  {
    label: 'Walkaround T-45',
    domain: 'HAVACILIK',
    icon: '🛫',
    routeTitle: 'Uçak Harici Kontrolü (Walkaround)',
    institution: 'Uçuş Operasyon & Kokpit Ekibi',
    fullPrompt: 'Kalkıştan 45 dk önce kokpit harici walkaround pitot ve lastik kontrolü'
  },
  // Denizcilik
  {
    label: 'PSC denetimi',
    domain: 'DENIZCILIK',
    icon: '⚓',
    routeTitle: 'Liman Devleti Denetimi (PSC Inspection)',
    institution: 'Denizcilik Genel Müdürlüğü / Liman Başkanlığı',
    fullPrompt: 'Liman yanaşmasında PSC denetimi ISM kodu ve sintine kontrolü'
  },
  {
    label: 'Draft survey yük hesabı',
    domain: 'DENIZCILIK',
    icon: '🚢',
    routeTitle: 'Draft Survey & Balast Hesabı',
    institution: 'Uluslararası Gözetim & Survey',
    fullPrompt: 'Dökme yükleme öncesi ve sonrası draft survey ve balast jurnali'
  },
  // Gümrük
  {
    label: 'Kırmızı hat muayenesi',
    domain: 'GUMRUK',
    icon: '📦',
    routeTitle: 'Kırmızı Hat Fiziki Eşya Muayenesi',
    institution: 'Ticaret Bakanlığı / Gümrük Müdürlüğü',
    fullPrompt: 'Gümrükte kırmızı hat çıktı konteyner fiziki muayene ve supalan'
  },
  {
    label: 'ATR & Menşe belgesi',
    domain: 'GUMRUK',
    icon: '🌐',
    routeTitle: 'ATR Dolaşım & EUR.1 Belgesi Tasdiki',
    institution: 'Ticaret ve Sanayi Odası / Gümrük',
    fullPrompt: 'İhracat sevkiyatı için ATR belgesi ve fatura gümrük onayı'
  },
  // Turizm & Gastronomi
  {
    label: 'Mise en place',
    domain: 'TURIZM_KONAKLAMA_YIYECEK',
    icon: '👨‍🍳',
    routeTitle: 'Mutfak İstasyon & Hazırlık Bitişi',
    institution: 'Restoran Mutfak Şefliği / HACCP',
    fullPrompt: 'Akşam servisi öncesi saat 17:00 mise en place hazırlığını tamamla'
  },
  {
    label: 'HACCP soğuk oda',
    domain: 'TURIZM_KONAKLAMA_YIYECEK',
    icon: '❄️',
    routeTitle: 'HACCP Soğuk Oda & FIFO Denetimi',
    institution: 'Tarım ve Orman İl Md. / Gıda Hijyen',
    fullPrompt: 'Soğuk oda +4°C ve derin dondurucu -18°C derece çizelgesi'
  },
  // Tarım & Çiftçi
  {
    label: 'Güneş kuralı sulama',
    domain: 'TARIM_AV_BALIK',
    icon: '🌿',
    routeTitle: 'Güneş Kuralı & Akşam Sulama (19:30)',
    institution: 'Tarım ve Orman Bakanlığı / Ziraat Odası',
    fullPrompt: 'Yaprak yanmasını önlemek için sulamayı akşam 19:30 serinliğine kur'
  },
  {
    label: 'TARSİM don ihbarı',
    domain: 'TARIM_AV_BALIK',
    icon: '🌾',
    routeTitle: 'Meteorolojik Zirai Don & TARSİM',
    institution: 'TARSİM Tarım Sigortaları Havuzu',
    fullPrompt: 'Gece -3 derece zirai don bekleniyor sera ısıtması ve TARSİM kontrolü'
  },
  // Gıda Sanayii
  {
    label: 'Pastörizasyon & CCP1',
    domain: 'GIDA',
    icon: '🥛',
    routeTitle: 'Pastörizatör Isı Logu & CCP1 Kontrolü',
    institution: 'Gıda Kontrol Genel Müdürlüğü',
    fullPrompt: 'Pastörizatör sıcaklığı 72°C 15 saniye CCP1 kayıt föyünü doldur'
  },
  // Cam & Çimento
  {
    label: 'Slump çökme deneyi',
    domain: 'CAM_CIMENTO_TOPRAK',
    icon: '🧱',
    routeTitle: 'Hazır Beton Slump Çökme Deneyi',
    institution: 'Türkak Akredite Yapı Laboratuvarı',
    fullPrompt: 'Transmikser şantiyeye girdi slump hunisi çökme ölçümü yap'
  },
  // Kimya & Plastik
  {
    label: 'GBF & MSDS kontrolü',
    domain: 'KIMYA_PETROL_PLASTIK',
    icon: '🧪',
    routeTitle: 'Kimyasal Güvenlik Bilgi Formu (GBF)',
    institution: 'Çevre ve Şehircilik Bakanlığı / KKS',
    fullPrompt: 'Yeni gelen solvent hammaddesi GBF formu ve parlama noktası teyidi'
  },
  // Çevre
  {
    label: 'MoTAT tehlikeli atık',
    domain: 'CEVRE',
    icon: '♻️',
    routeTitle: 'MoTAT Lisanslı Araç Atık Sevkiyatı',
    institution: 'Çevre, Şehircilik ve İklim Değişikliği Bak.',
    fullPrompt: 'Atık sahasından tehlikeli atık çıkışı MoTAT taşıma formu onayla'
  },
  // Maden
  {
    label: 'Metan CH4 gaz ölçümü',
    domain: 'MADEN',
    icon: '⛏️',
    routeTitle: 'Ocak Aynası Metan & CO Gaz Ölçümü',
    institution: 'Maden ve Petrol İşleri Gn. Md. (MAPEG)',
    fullPrompt: 'Vardiya girişinde maden aynasında metan CH4 ve CO gaz ölçümü yap'
  },
  // Ağaç & Mobilya
  {
    label: 'Ebatlama & Kesim planı',
    domain: 'AGAC_KAGIT',
    icon: '🪵',
    routeTitle: 'Optimum Ebatlama & PVC Kenar Bant',
    institution: 'Mobilya İmalat & Tasarım Atölyesi',
    fullPrompt: 'Sipariş için plaka ebatlama kesim optimizasyonu ve PVC bant hazırla'
  },
  // Tekstil
  {
    label: 'Pastal kumaş fire hesabı',
    domain: 'TEKSTIL_GIYIM_DERI',
    icon: '🧵',
    routeTitle: 'Pastal Planı & Kumaş Fire Optimizasyonu',
    institution: 'Tekstil İhracatçıları / Konfeksiyon',
    fullPrompt: 'Kesimhane için pastal planı çiz ve kumaş fire oranını hesapla'
  },
  // Spor
  {
    label: 'Laktat eşiği & VO2max',
    domain: 'SPOR_REKREASYON',
    icon: '⚽',
    routeTitle: 'Kondisyon & Laktat Eşiği Testi',
    institution: 'Gençlik ve Spor Bakanlığı / Spor Hekimliği',
    fullPrompt: 'Sezon başı sporculara laktat eşiği ve nabız bölgesi testi uygula'
  },
  // İş Yönetimi & İK
  {
    label: 'ISO 9001 DÖF başlat',
    domain: 'IS_YONETIM',
    icon: '🗂️',
    routeTitle: 'Düzeltici Önleyici Faaliyet (DÖF)',
    institution: 'Türk Akreditasyon Kurumu (TÜRKAK)',
    fullPrompt: 'İç denetim uygunsuzluğu için DÖF formu aç ve kök neden analizi yap'
  },
  // Öğrenci & Akademi
  {
    label: 'Turnitin intihal <%20',
    domain: 'OGRENCI',
    icon: '📚',
    routeTitle: 'Turnitin Benzerlik Raporu Filtresi',
    institution: 'Yükseköğretim Kurulu (YÖK) / Enstitü',
    fullPrompt: 'Tez teslimi öncesi Turnitin intihal raporu al ve filtreleri kontrol et'
  },
  {
    label: 'Vize sınav kampı',
    domain: 'OGRENCI',
    icon: '🎓',
    routeTitle: 'Vize & Final Sınav Kampı Takvimi',
    institution: 'Üniversite Öğrenci İşleri / Fakülte',
    fullPrompt: 'Gelecek hafta başlayacak vize sınavları için ders çalışma kampı kur'
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

  // Eğitim & Maarif Modeli
  {
    keywords: ['maarif', 'maarif modeli', 'öğrenme çıktısı', 'öğrenme çıktılar', 'beceri örgüsü', 'maarif plan'],
    routeTitle: 'Maarif Modeli Ders Planı & Beceri Örgüsü',
    institution: 'Milli Eğitim Bakanlığı / TTKB',
    domain: 'EGITIM',
    icon: '🌟',
    badgeHex: '#FEF08A'
  },
  {
    keywords: ['süreç odaklı', 'surec odakli', 'rubrik', 'biçimlendirici', 'ksdt', 'soru dağılım tablosu'],
    routeTitle: 'Süreç Odaklı Ölçme & KSDT / Rubrik',
    institution: 'MEB Ölçme ve Değerlendirme Merkezi',
    domain: 'EGITIM',
    icon: '📝',
    badgeHex: '#FEF08A'
  },
  {
    keywords: ['farklılaştırma', 'farklilastirma', 'zenginleştirme', 'zenginlestirme', 'destekleme eğitimi'],
    routeTitle: 'Maarif Farklılaştırma & SDB',
    institution: 'Milli Eğitim Bakanlığı / Temel Eğitim',
    domain: 'EGITIM',
    icon: '🎯',
    badgeHex: '#FEF08A'
  },
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
  {
    keywords: ['nakil', 'öğrenci nakil', 'ogrenci nakil', 'nakil kabul', 'nakil onayı', 'nakil talebi'],
    routeTitle: 'e-Okul Öğrenci Nakil & Kontenjan Kabulü',
    institution: 'MEB / e-Okul Yönetim Bilgi Sistemi',
    domain: 'EGITIM',
    icon: '🔄',
    badgeHex: '#E0E7FF'
  },
  {
    keywords: ['kura', 'şube kura', 'sube kura', 'şube belirleme', 'kura çekimi'],
    routeTitle: 'e-Okul Merkezi Kura & Şube Belirleme',
    institution: 'MEB / e-Okul Kura Modülü',
    domain: 'EGITIM',
    icon: '🎲',
    badgeHex: '#FEF3C7'
  },
  {
    keywords: ['sosyal etkinlik', 'sosyal etkinlik modülü', 'kulüp onayı', 'e-portfolyo'],
    routeTitle: 'e-Okul Sosyal Etkinlik & e-Portfolyo Onayı',
    institution: 'MEB / e-Okul Sosyal Etkinlik',
    domain: 'EGITIM',
    icon: '🏆',
    badgeHex: '#DCFCE7'
  },
  {
    keywords: ['karne basımı', 'karne basimi', 'karne', 'takdir teşekkür', 'iftihar belgesi'],
    routeTitle: 'e-Okul Karne & Belge Basımı',
    institution: 'MEB / e-Okul Belge Basım',
    domain: 'EGITIM',
    icon: '📜',
    badgeHex: '#FEF3C7'
  },
  {
    keywords: ['maddi hata', 'not düzeltme', 'sınav itiraz', 'not itiraz'],
    routeTitle: 'e-Okul Not Düzeltme & Maddi Hata Komisyonu',
    institution: 'MEB / Ölçme Değerlendirme Komisyonu',
    domain: 'EGITIM',
    icon: '⚖️',
    badgeHex: '#FEF08A'
  },
  {
    keywords: ['şök', 'sok', 'şube öğretmenler kurulu'],
    routeTitle: 'e-Okul ŞÖK Karar Girişi & Tedbir Planı',
    institution: 'MEB / e-Okul ŞÖK Modülü',
    domain: 'EGITIM',
    icon: '📋',
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
  },

  // Sanat, Medya, Prodüksiyon & Sahne Sanatları
  {
    keywords: ['call sheet', 'callsheet', 'çekim planı', 'cekim plani', 'set çağrısı', 'set cagrisi', 'klaket'],
    routeTitle: 'Günlük Call Sheet & Set Çekim Planı',
    institution: 'Sinema & Dizi Prodüksiyonu',
    domain: 'SANAT_MEDYA',
    icon: '🎬',
    badgeHex: '#FFE4E6'
  },
  {
    keywords: ['dit', 'checksum', 'silverstack', 'veri aktarımı', 'timecode jam'],
    routeTitle: 'DIT Çift SSD Checksum Doğrulama',
    institution: 'Kamera & DIT Departmanı',
    domain: 'SANAT_MEDYA',
    icon: '💾',
    badgeHex: '#FFE4E6'
  },
  {
    keywords: ['render', 'export', 'broadcast master', '-23 lufs', 'ebu r128', 'kurgu', 'montaj'],
    routeTitle: 'EBU R128 Broadcast Master (-23 LUFS)',
    institution: 'RTÜK / Televizyon & Dijital Yayın',
    domain: 'SANAT_MEDYA',
    icon: '🖥️',
    badgeHex: '#F3E8FF'
  },
  {
    keywords: ['color grading', 'davinci resolve', 'davinci', 'show lut', 'vectorscope'],
    routeTitle: 'DaVinci Resolve Renk Oturumu & LUT',
    institution: 'Post-Prodüksiyon / Color Grading',
    domain: 'SANAT_MEDYA',
    icon: '🎨',
    badgeHex: '#E0E7FF'
  },
  {
    keywords: ['soundcheck', 'sound check', 'teknik rider', 'stage plot', 'in-ear', 'rf tarama'],
    routeTitle: 'Konser Soundcheck & RF Frekans Taraması',
    institution: 'Canlı Ses & Sahne Amirliği',
    domain: 'SANAT_MEDYA',
    icon: '🎙️',
    badgeHex: '#CFFAFE'
  },
  {
    keywords: ['isrc', 'mesam', 'msg', 'müyap', 'split sheet', 'müzik dağıtım', 'spotify pitch'],
    routeTitle: 'Dijital Dağıtım, ISRC & Telif (MESAM)',
    institution: 'Kültür Bakanlığı / MESAM & MÜYAP',
    domain: 'SANAT_MEDYA',
    icon: '🎵',
    badgeHex: '#FEE2E2'
  },
  {
    keywords: ['fotoğraf çekimi', 'fotograf cekimi', 'stüdyo çekimi', 'retouch', 'gri kart', 'colorchecker'],
    routeTitle: 'Fotoğraf Çekimi & RAW Retouch Teslimi',
    institution: 'Profesyonel Fotoğraf Stüdyosu',
    domain: 'SANAT_MEDYA',
    icon: '📸',
    badgeHex: '#FEF3C7'
  },
  {
    keywords: ['vernisaj', 'küratör', 'fine art baskı', 'paspartu', 'sergi açılışı', 'galeri açılışı'],
    routeTitle: 'Sergi Açılışı, Vernisaj & Eser Künyeleri',
    institution: 'Sanat Galerisi & Müze Yönetimi',
    domain: 'SANAT_MEDYA',
    icon: '🖼️',
    badgeHex: '#FEF08A'
  },
  {
    keywords: ['basın bülteni', 'basin bulteni', 'ambargo', 'medya dağıtım', 'tekzip'],
    routeTitle: 'Basın Bülteni Servisi & Ambargo Takibi',
    institution: 'Medya Takip & İletişim Ajansı',
    domain: 'SANAT_MEDYA',
    icon: '📰',
    badgeHex: '#FED7AA'
  },
  {
    keywords: ['canlı yayın', 'canli yayin', 'rundown', 'reji akışı', 'liveu', 'prompter', 'kj'],
    routeTitle: 'Canlı Yayın Reji Akışı (Rundown) & LiveU',
    institution: 'Televizyon Rejisi & Canlı Yayın',
    domain: 'SANAT_MEDYA',
    icon: '📡',
    badgeHex: '#FEE2E2'
  },
  {
    keywords: ['tiyatro', 'genel prova', 'dress rehearsal', 'suflör', 'ışık masası', 'cue'],
    routeTitle: 'Tiyatro Genel Prova & Sahne Cueleri',
    institution: 'Devlet / Şehir Tiyatroları & Sahne',
    domain: 'SANAT_MEDYA',
    icon: '🎭',
    badgeHex: '#EDE9FE'
  },
  {
    keywords: ['fsek', 'telif sözleşmesi', 'mali hak devri', 'oyuncu muvafakatname', 'eser sahibi'],
    routeTitle: '5846 FSEK Telif & Mali Hak Devri',
    institution: 'Kültür Bakanlığı (Telif Hakları Gn. Md.)',
    domain: 'SANAT_MEDYA',
    icon: '📜',
    badgeHex: '#E0E7FF'
  },
  {
    keywords: ['reels', 'tiktok', 'shorts', 'kanca', 'hook', 'retention', 'dikey video', 'auto caption'],
    routeTitle: 'Reels & TikTok Retention & Kanca',
    institution: 'Sosyal Medya & İçerik Üretimi',
    domain: 'SANAT_MEDYA',
    icon: '📱',
    badgeHex: '#FFE4E6'
  },
  {
    keywords: ['influencer', '#işbirliği', '#isbirligi', 'sponsorlu', 'işbirliği', 'ürün tanıtımı'],
    routeTitle: 'Ticaret Bakanlığı #İşbirliği Protokolü',
    institution: 'Ticaret Bakanlığı (Tüketici Hakları)',
    domain: 'SANAT_MEDYA',
    icon: '🤝',
    badgeHex: '#FEF3C7'
  },
  {
    keywords: ['meta ads', 'tiktok ads', 'roas', 'ctr', 'pixel', 'conversions api', 'reklam seti'],
    routeTitle: 'Meta & TikTok Ads Performans Pazarlama',
    institution: 'Dijital Reklam & Performans',
    domain: 'SANAT_MEDYA',
    icon: '📈',
    badgeHex: '#DCFCE7'
  },
  {
    keywords: ['içerik takvimi', 'icerik takvimi', 'carousel', 'kaydırmalı post', 'prime time', 'grid planı'],
    routeTitle: 'Aylık İçerik Takvimi & Prime Time Dağıtımı',
    institution: 'Sosyal Medya Yönetimi & Planlama',
    domain: 'SANAT_MEDYA',
    icon: '🗓️',
    badgeHex: '#E0F2FE'
  },
  {
    keywords: ['linç', 'linc', 'sosyal medya kriz', 'troll', 'bot saldırısı', 'kara liste', 'holding statement'],
    routeTitle: 'Sosyal Medya Kriz & Topluluk Moderasyonu',
    institution: 'İtibar & Kriz İletişimi',
    domain: 'SANAT_MEDYA',
    icon: '🛡️',
    badgeHex: '#FEE2E2'
  },
  {
    keywords: ['youtube', 'thumbnail', 'kapak fotoğrafı', 'chapters', 'end screen', 'youtube seo'],
    routeTitle: 'YouTube Video SEO & Thumbnail CTR',
    institution: 'Video Yayıncılığı & YouTube',
    domain: 'SANAT_MEDYA',
    icon: '🔴',
    badgeHex: '#FEE2E2'
  },
  // Bilişim & Yazılım
  {
    keywords: ['prod deploy', 'production deploy', 'canlıya al', 'canliya al', 'rollback'],
    routeTitle: 'Prod Canlıya Alma & Staging Onayı',
    institution: 'Sanayi ve Teknoloji Bak. / Yazılım Ekibi',
    domain: 'BILISIM',
    icon: '🚀',
    badgeHex: '#E0F2FE'
  },
  {
    keywords: ['migration', 'db migration', 'veritabanı şema', 'database migration'],
    routeTitle: 'Veritabanı Migration & Snapshot',
    institution: 'DevOps & Veritabanı Mimarisi',
    domain: 'BILISIM',
    icon: '🗄️',
    badgeHex: '#E0F2FE'
  },
  {
    keywords: ['hotfix', 'semver', 'pull request', 'pr review', 'ci/cd'],
    routeTitle: 'P1 Incident Hotfix & SemVer Etiketi',
    institution: 'Yazılım Kalite & Git Release',
    domain: 'BILISIM',
    icon: '💻',
    badgeHex: '#E0F2FE'
  },
  // Havacılık
  {
    keywords: ['ofp', 'dispatch', 'metar', 'taf', 'notam'],
    routeTitle: 'OFP Dispatch Paketi & Hava Brifingi',
    institution: 'Sivil Havacılık Genel Müdürlüğü (SHGM)',
    domain: 'HAVACILIK',
    icon: '✈️',
    badgeHex: '#E0E7FF'
  },
  {
    keywords: ['walkaround', 'kokpit', 'pitot', 'fdp'],
    routeTitle: 'Walkaround Harici Kontrol & FDP',
    institution: 'Uçuş Operasyon & Kokpit Amiri',
    domain: 'HAVACILIK',
    icon: '🛫',
    badgeHex: '#E0E7FF'
  },
  // Denizcilik
  {
    keywords: ['psc', 'port state control', 'ism kodu', 'sintine', 'balast'],
    routeTitle: 'Liman Devleti PSC Denetimi & Sintine',
    institution: 'Denizcilik Genel Müdürlüğü / Liman Başkanlığı',
    domain: 'DENIZCILIK',
    icon: '⚓',
    badgeHex: '#CFFAFE'
  },
  {
    keywords: ['draft survey', 'draft', 'bunker', 'gemi adamı'],
    routeTitle: 'Draft Survey Yük & Yakıt Hesabı',
    institution: 'Uluslararası Gözetim & Survey',
    domain: 'DENIZCILIK',
    icon: '🚢',
    badgeHex: '#CFFAFE'
  },
  // Gümrük
  {
    keywords: ['kırmızı hat', 'kirmizi hat', 'supalan', 'antrepo beyannamesi'],
    routeTitle: 'Gümrük Kırmızı Hat & Fiziki Muayene',
    institution: 'Ticaret Bakanlığı / Gümrükler Gn. Md.',
    domain: 'GUMRUK',
    icon: '📦',
    badgeHex: '#E0E7FF'
  },
  {
    keywords: ['atr', 'menşe', 'eur.1', 'konşimento', 'ordino'],
    routeTitle: 'ATR Dolaşım & Konşimento Ordino Teslimi',
    institution: 'Ticaret ve Sanayi Odası / Gümrük',
    domain: 'GUMRUK',
    icon: '🌐',
    badgeHex: '#E0E7FF'
  },
  // Çevre
  {
    keywords: ['çed', 'ced', 'motat', 'tehlikeli atık', 'atıksu', 'koi', 'boi'],
    routeTitle: 'ÇED & MoTAT Tehlikeli Atık Formu',
    institution: 'Çevre, Şehircilik ve İklim Değişikliği Bak.',
    domain: 'CEVRE',
    icon: '♻️',
    badgeHex: '#D1FAE5'
  },
  // Maden
  {
    keywords: ['metan', 'ch4', 'ocak aynası', 'tahkimat', 'karot', 'sondaj'],
    routeTitle: 'Maden Ocak Aynası Metan & Tahkimat',
    institution: 'Maden ve Petrol İşleri Gn. Md. (MAPEG)',
    domain: 'MADEN',
    icon: '⛏️',
    badgeHex: '#E4E4E7'
  },
  // Ağaç & Kağıt
  {
    keywords: ['ebatlama', 'kesim planı', 'mdf', 'kenar bant', 'ahşap nem'],
    routeTitle: 'Ebatlama Kesim Planı & Ahşap Nem Testi',
    institution: 'Mobilya Sanayicileri / Tasarım',
    domain: 'AGAC_KAGIT',
    icon: '🪵',
    badgeHex: '#FEF3C7'
  },
  // Kimya & Plastik
  {
    keywords: ['msds', 'gbf', 'enjeksiyon', 'ekstrüzyon', 'parlama noktası'],
    routeTitle: 'Kimyasal Güvenlik Bilgi Formu (GBF)',
    institution: 'Çevre ve Şehircilik / Kimyasallar Kayıt',
    domain: 'KIMYA_PETROL_PLASTIK',
    icon: '🧪',
    badgeHex: '#CCFBF1'
  },
  // Cam & Çimento
  {
    keywords: ['slump', 'klinker', 'hazır beton', 'temperli cam'],
    routeTitle: 'Hazır Beton Slump & Klinker Fırın Testi',
    institution: 'Akredite Yapı Laboratuvarı / TSE',
    domain: 'CAM_CIMENTO_TOPRAK',
    icon: '🧱',
    badgeHex: '#E2E8F0'
  },
  // Spor
  {
    keywords: ['laktat', 'vo2max', 'esame listesi', 'lisans vize'],
    routeTitle: 'Laktat Eşiği & Müsabaka Esame Listesi',
    institution: 'Gençlik ve Spor Bakanlığı / Federasyon',
    domain: 'SPOR_REKREASYON',
    icon: '⚽',
    badgeHex: '#D1FAE5'
  },
  // Tekstil
  {
    keywords: ['pastal', 'kumaş fire', 'çekmezlik', 'overlok'],
    routeTitle: 'Pastal Planı & Kumaş Çekmezlik Testi',
    institution: 'Tekstil İhracatçıları / Akredite Lab',
    domain: 'TEKSTIL_GIYIM_DERI',
    icon: '🧵',
    badgeHex: '#FCE7F3'
  },
  // İş Yönetimi & İK
  {
    keywords: ['iso 9001', 'döf', 'özlük dosyası', 'bordro tahakkuk'],
    routeTitle: 'ISO 9001 DÖF & Aylık Personel Bordrosu',
    institution: 'Çalışma ve Sosyal Güvenlik / TÜRKAK',
    domain: 'IS_YONETIM',
    icon: '🗂️',
    badgeHex: '#F1F5F9'
  }
];

const DOMAIN_INSTITUTIONS: Record<string, { label: string; institution: string; icon: string; badgeHex: string; defaultRoute: string }> = {
  // Sanat & Medya
  SANAT_MEDYA: {
    label: 'Sanat, Medya & Prodüksiyon',
    institution: 'Kültür Bakanlığı / RTÜK & Sektörel Standart',
    icon: '🎬',
    badgeHex: '#FFE4E6',
    defaultRoute: 'Prodüksiyon, Kurgu & Telif Protokolü'
  },
  KULTUR_SANAT_TASARIM: {
    label: 'Kültür, Sanat ve Tasarım',
    institution: 'Kültür ve Turizm Bakanlığı / Telif Hakları Gn. Md.',
    icon: '🎨',
    badgeHex: '#FCE7F3',
    defaultRoute: 'Tasarım, Sergi & Telif Protokolü'
  },
  // Hukuk & Adalet
  HUKUK: {
    label: 'Hukuk / Avukat',
    institution: 'Adalet Bakanlığı / UYAP',
    icon: '⚖️',
    badgeHex: '#E0E7FF',
    defaultRoute: 'UYAP Dava & Takip İşlemi'
  },
  ADALET_GUVENLIK: {
    label: 'Adalet ve Güvenlik',
    institution: 'Adalet Bakanlığı / İçişleri Bakanlığı',
    icon: '⚖️',
    badgeHex: '#E0E7FF',
    defaultRoute: 'UYAP Yargı & Adli Güvenlik Takibi'
  },
  // Maliye & Finans
  MALIYE: {
    label: 'Mali Müşavir / SMMM',
    institution: 'Gelir İdaresi Başkanlığı (GİB)',
    icon: '📊',
    badgeHex: '#DCFCE7',
    defaultRoute: 'Beyanname & Vergi Süreci'
  },
  FINANS: {
    label: 'Finans, Muhasebe & Bankacılık',
    institution: 'Gelir İdaresi Başkanlığı / SPK / BDDK',
    icon: '📈',
    badgeHex: '#DCFCE7',
    defaultRoute: 'Vergi, Nakit Akışı & Beyanname Süreci'
  },
  // Sağlık & Sosyal
  VETERINER: {
    label: 'Veteriner Hekim & Sürü Sağlığı',
    institution: 'Tarım ve Orman Bakanlığı / TÜRKVET',
    icon: '🐾',
    badgeHex: '#FED7AA',
    defaultRoute: 'Klinik Teşhis & Sürü Sağlığı Protokolü'
  },
  ECZACILIK: {
    label: 'Eczacılık / SUT & Medula',
    institution: 'SGK SSGM / TİTCK',
    icon: '💊',
    badgeHex: '#FEE2E2',
    defaultRoute: 'Medula & İTS Eczane İşlemi'
  },
  SAGLIK: {
    label: 'Sağlık / Hekimlik & Klinik',
    institution: 'Sağlık Bakanlığı / E-Nabız',
    icon: '🩺',
    badgeHex: '#E0F2FE',
    defaultRoute: 'Klinik Protokol & Hasta Takibi'
  },
  SAGLIK_SOSYAL: {
    label: 'Sağlık ve Sosyal Hizmetler',
    institution: 'Sağlık Bakanlığı / Sosyal Güvenlik Kurumu',
    icon: '🩺',
    badgeHex: '#CCFBF1',
    defaultRoute: 'Klinik SBAR & Sağlık Takibi'
  },
  // İSG
  ISG: {
    label: 'İş Sağlığı & Güvenliği',
    institution: 'ÇSGB / İBYS Takip Sistemi',
    icon: '🦺',
    badgeHex: '#FEF3C7',
    defaultRoute: 'İSG Yasal Bildirim & Denetim'
  },
  // Bilişim & Teknoloji
  BILISIM: {
    label: 'Bilişim Teknolojileri',
    institution: 'Sanayi ve Teknoloji Bakanlığı / BTK',
    icon: '💻',
    badgeHex: '#E0F2FE',
    defaultRoute: 'Prod Deploy & Sistem Mimarisi'
  },
  TEKNIK: {
    label: 'Mühendislik & Teknik Servis',
    institution: 'TÜVTÜRK / TSE / Yetkili Servis',
    icon: '🔧',
    badgeHex: '#FED7AA',
    defaultRoute: 'Periyodik Bakım & Test Süreci'
  },
  // İnşaat & Yapı
  INSAAT: {
    label: 'İnşaat & Yapı Denetim',
    institution: 'Çevre, Şehircilik ve İklim Değişikliği Bak. / Yapı Denetim',
    icon: '🏗️',
    badgeHex: '#FEF3C7',
    defaultRoute: 'Küp Kırımı & Şantiye İmalat Defteri'
  },
  MUHENDISLIK: {
    label: 'İnşaat / Mühendislik',
    institution: 'Çevre ve Şehircilik / Yapı Denetim',
    icon: '🏗️',
    badgeHex: '#FEF3C7',
    defaultRoute: 'Teknik Standart & Şantiye Takibi'
  },
  // Elektrik, Elektronik & Enerji
  ELEKTRIK_ELEKTRONIK: {
    label: 'Elektrik ve Elektronik',
    institution: 'Enerji ve Tabii Kaynaklar Bakanlığı / TEİAŞ / TEDAŞ',
    icon: '⚡',
    badgeHex: '#FEF08A',
    defaultRoute: 'LOTO Kilitleme & Kompanzasyon Takibi'
  },
  ENERJI: {
    label: 'Enerji & Santral Yönetimi',
    institution: 'EPDK / EPİAŞ / EÜAŞ',
    icon: '🔋',
    badgeHex: '#CFFAFE',
    defaultRoute: 'GÖP Gün Öncesi Piyasası & Şebeke Takibi'
  },
  // Makine & Metal
  MAKINE: {
    label: 'Makine & İmalat Sanayii',
    institution: 'Sanayi ve Teknoloji Bak. / Makina Mühendisleri Odası',
    icon: '⚙️',
    badgeHex: '#E2E8F0',
    defaultRoute: 'Hidrostatik Test & Kestirimci Bakım'
  },
  METAL: {
    label: 'Metal & Kaynak İmalatı',
    institution: 'Türk Loydu / Akredite Metalurji Lab',
    icon: '🔩',
    badgeHex: '#E4E4E7',
    defaultRoute: 'WPS/PQR Kaynak & Ultrasonik NDT Testi'
  },
  // Otomotiv
  OTOMOTIV: {
    label: 'Otomotiv Sanayii & Servis',
    institution: 'Ulaştırma Bakanlığı / TÜVTÜRK / TSE',
    icon: '🚗',
    badgeHex: '#FFEDD5',
    defaultRoute: 'OBD Arıza Teşhis & Muayene Takibi'
  },
  // Eğitim & Akademi
  EGITIM: {
    label: 'Eğitim / MEB İdare & Akademi',
    institution: 'Milli Eğitim Bakanlığı / MEBBİS & DYS',
    icon: '📚',
    badgeHex: '#FEF08A',
    defaultRoute: 'DYS, TEFBİS & e-Okul Resmi Süreci'
  },
  OGRENCI: {
    label: 'Öğrenci & Akademik Kampüs',
    institution: 'Yükseköğretim Kurulu (YÖK) / ÖSYM / Fakülte',
    icon: '🎓',
    badgeHex: '#DDD6FE',
    defaultRoute: 'Sınav Kampı & Turnitin İntihal Takibi'
  },
  // Tarım, Ziraat & Gıda
  ZIRAAT: {
    label: 'Ziraat & Tarım',
    institution: 'Tarım ve Orman / Ziraat Odası',
    icon: '🌾',
    badgeHex: '#FEF3C7',
    defaultRoute: 'Tarımsal Üretim & ÇKS Protokolü'
  },
  TARIM_AV_BALIK: {
    label: 'Tarım, Avcılık ve Balıkçılık',
    institution: 'Tarım ve Orman Bakanlığı / BÜGEM & TARSİM',
    icon: '🌿',
    badgeHex: '#ECFCCB',
    defaultRoute: 'Güneş Kuralı Sulama & TARSİM İhbarı'
  },
  GIDA: {
    label: 'Gıda Sanayii & Kalite',
    institution: 'Tarım ve Orman Bakanlığı / Gıda Kontrol Gn. Md.',
    icon: '🌾',
    badgeHex: '#ECFCCB',
    defaultRoute: 'HACCP CCP1 & Soğuk Oda Kalite Takibi'
  },
  // Lojistik, Ulaşım, Havacılık & Denizcilik
  LOJISTIK: {
    label: 'Lojistik & Ağır Vasıta',
    institution: 'Ulaştırma ve Altyapı Bakanlığı / U-ETDS',
    icon: '🚛',
    badgeHex: '#FED7AA',
    defaultRoute: 'AETR Takograf & Rampa Sevkiyat Takibi'
  },
  ULASTIRMA_LOJISTIK: {
    label: 'Ulaştırma, Lojistik ve Haberleşme',
    institution: 'Ulaştırma ve Altyapı Bakanlığı / U-ETDS',
    icon: '🚛',
    badgeHex: '#FEF3C7',
    defaultRoute: 'AETR Takograf & Nakliye Rezerv Takibi'
  },
  HAVACILIK: {
    label: 'Havacılık & Kokpit',
    institution: 'Sivil Havacılık Genel Müdürlüğü (SHGM) / DHMİ',
    icon: '✈️',
    badgeHex: '#E0E7FF',
    defaultRoute: 'OFP Dispatch Paketi & Uçuş Öncesi Brifing'
  },
  DENIZCILIK: {
    label: 'Denizcilik & Gemi İşletmeciliği',
    institution: 'Denizcilik Genel Müdürlüğü / Liman Başkanlığı',
    icon: '⚓',
    badgeHex: '#CFFAFE',
    defaultRoute: 'PSC Liman Devleti Denetimi & Draft Survey'
  },
  GUMRUK: {
    label: 'Gümrük & Dış Ticaret',
    institution: 'Ticaret Bakanlığı / Gümrükler Genel Müdürlüğü',
    icon: '📦',
    badgeHex: '#E0E7FF',
    defaultRoute: 'Kırmızı Hat Muayenesi & ATR Dolaşım Belgesi'
  },
  // Savunma, Emniyet & Güvenlik
  SAVUNMA: {
    label: 'Savunma, Emniyet & Askeriye',
    institution: 'İçişleri (EGM/JGK) / MSB (TSK)',
    icon: '👮',
    badgeHex: '#BFDBFE',
    defaultRoute: 'Asayiş, Savunma & Operasyonel Protokol'
  },
  // Çevre & Maden
  CEVRE: {
    label: 'Çevre & Atık Yönetimi',
    institution: 'Çevre, Şehircilik ve İklim Değişikliği Bak. / ÇED İzin',
    icon: '♻️',
    badgeHex: '#D1FAE5',
    defaultRoute: 'MoTAT Atık Taşıma & Arıtma Deşarj Analizi'
  },
  MADEN: {
    label: 'Maden & Sondaj Sanayii',
    institution: 'Maden ve Petrol İşleri Genel Müdürlüğü (MAPEG)',
    icon: '⛏️',
    badgeHex: '#E4E4E7',
    defaultRoute: 'Ocak Aynası Gaz Ölçümü & Tahkimat Güvenliği'
  },
  // İmalat & Malzeme
  CAM_CIMENTO_TOPRAK: {
    label: 'Cam, Çimento ve Toprak',
    institution: 'Çevre ve Şehircilik / Türkak Yapı Lab.',
    icon: '🧱',
    badgeHex: '#E2E8F0',
    defaultRoute: 'Slump Çökme Deneyi & Klinker Fırın Kontrolü'
  },
  KIMYA_PETROL_PLASTIK: {
    label: 'Kimya, Petrol, Lastik ve Plastik',
    institution: 'Çevre ve Şehircilik / Petrol İşleri / TSE',
    icon: '🧪',
    badgeHex: '#CCFBF1',
    defaultRoute: 'GBF/MSDS Güvenlik & Enjeksiyon Kalıp Takibi'
  },
  AGAC_KAGIT: {
    label: 'Ağaç İşleri, Kağıt ve Mobilya',
    institution: 'Orman Genel Müdürlüğü / Mobilya Sanayicileri',
    icon: '🪵',
    badgeHex: '#FEF3C7',
    defaultRoute: 'Ebatlama Kesim Planı & Ahşap Nem Testi'
  },
  TEKSTIL_GIYIM_DERI: {
    label: 'Tekstil, Hazır Giyim ve Deri',
    institution: 'Tekstil İhracatçıları Birliği / Akredite Lab',
    icon: '🧵',
    badgeHex: '#FCE7F3',
    defaultRoute: 'Pastal Planı & Kumaş Çekmezlik Testi'
  },
  // Ticaret, Turizm & Hizmet
  TICARET: {
    label: 'Ticaret & Esnaf',
    institution: 'Ticaret Bakanlığı / Esnaf ve Ticaret Sicil',
    icon: '🧾',
    badgeHex: '#DCFCE7',
    defaultRoute: 'Z Raporu, Gün Sonu Kasa & Veresiye Takibi'
  },
  TURIZM_KONAKLAMA_YIYECEK: {
    label: 'Turizm, Konaklama ve Yiyecek İçecek',
    institution: 'Kültür ve Turizm Bakanlığı / İl Turizm Md.',
    icon: '👨‍🍳',
    badgeHex: '#FFEDD5',
    defaultRoute: 'Mise en Place & HACCP Soğuk Oda Isı Takibi'
  },
  GASTRONOMI: {
    label: 'Gastronomi & Mutfak Şefliği',
    institution: 'Restoran Mutfak Şefliği / HACCP Denetimi',
    icon: '👨‍🍳',
    badgeHex: '#ECFCCB',
    defaultRoute: 'Mise en Place & Servis Tadım Brifingi'
  },
  TOPLUMSAL_KISISEL: {
    label: 'Toplumsal ve Kişisel Hizmetler',
    institution: 'Esnaf ve Sanatkarlar Odası / İlçe Sağlık',
    icon: '✂️',
    badgeHex: '#EDE9FE',
    defaultRoute: 'Oryal Açma Süresi & Otoklav Sterilizasyonu'
  },
  KUAFOR: {
    label: 'Kuaför & Güzellik',
    institution: 'Esnaf ve Sanatkarlar Odası / Güzellik Salonu',
    icon: '✂️',
    badgeHex: '#FCE7F3',
    defaultRoute: 'Oryal Açma Sayacı & Elastikiyet Testi'
  },
  EMLAK: {
    label: 'Gayrimenkul & Emlak Danışmanlığı',
    institution: 'Ticaret Bakanlığı (Taşınmaz Yetki) / Tapu Kadastro',
    icon: '🏢',
    badgeHex: '#FEF3C7',
    defaultRoute: 'Web-Tapu Başvurusu & Yer Gösterme Tutanağı'
  },
  SPOR_REKREASYON: {
    label: 'Spor ve Rekreasyon',
    institution: 'Gençlik ve Spor Bakanlığı / İlgili Federasyon',
    icon: '⚽',
    badgeHex: '#D1FAE5',
    defaultRoute: 'Laktat Eşik Testi & Müsabaka Esame Listesi'
  },
  IS_YONETIM: {
    label: 'İş ve Yönetim',
    institution: 'Çalışma ve Sosyal Güvenlik / İŞKUR / TÜRKAK',
    icon: '🗂️',
    badgeHex: '#F1F5F9',
    defaultRoute: 'ISO 9001 DÖF & Personel Bordro Takibi'
  },
  // Kamu & Genel
  KAMU: {
    label: 'Kamu & Resmi Kurum',
    institution: 'Resmi Kurum / EBYS & Belgenet',
    icon: '🏛️',
    badgeHex: '#FEF9C3',
    defaultRoute: 'EBYS Resmi Yazışma, 22/d & CİMER Takibi'
  },
  CALISMIYORUM: {
    label: 'Genel Yaşam',
    institution: 'Notivia Yaşam Asistanı',
    icon: '🏠',
    badgeHex: '#F3F4F6',
    defaultRoute: 'Ev, Aile & Fatura Takibi'
  },
  SADE: {
    label: 'Sade Not',
    institution: 'Cihaz İçi Hızlı Bellek',
    icon: '📝',
    badgeHex: '#F8FAFC',
    defaultRoute: 'Düz Not Kaydı'
  },
  OTOMATIK_JARGON: {
    label: 'Otomatik Jargon',
    institution: 'Notivia Global Jargon Radarı',
    icon: '🎯',
    badgeHex: '#D1FAE5',
    defaultRoute: 'Tüm Sektörler Otomatik Aktif'
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
  const radar = detectDomainFromJargon(clean, currentDomain);
  const minConf = currentDomain === 'OTOMATIK_JARGON' ? 0.2 : 0.4;
  const effectiveDomain: ProfessionDomain = 
    (radar.confidence >= minConf && radar.detectedDomain !== 'GENEL' && radar.detectedDomain !== 'OTOMATIK_JARGON')
      ? radar.detectedDomain
      : (currentDomain && currentDomain !== 'GENEL' && currentDomain !== 'SADE' && currentDomain !== 'OTOMATIK_JARGON' ? currentDomain : 'GENEL');
  
  const domInfo = DOMAIN_INSTITUTIONS[effectiveDomain] || DOMAIN_INSTITUTIONS.GENEL;

  if (radar.confidence >= minConf && radar.matchedKeywords.length > 0) {
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
      hasActiveMatch: true,
      isAmbiguous: radar.isAmbiguous,
      candidateDomains: radar.candidateDomains,
      clarificationPrompt: radar.clarificationQuestion
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
