export interface PresetScenario {
  id: string;
  category: string;
  icon: string;
  badge: string;
  label: string;
  prompt: string;
  expectedHiddenInferences: string[];
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'car-inspection',
    category: 'Bakım & Onarım',
    icon: '🚗',
    badge: 'Araç Muayenesi',
    label: 'Araç Muayenesi',
    prompt: 'Salı günü arabayı muayeneye götüreceğim öğleden sonra, hazır edeyim',
    expectedHiddenInferences: [
      'Ruhsat ve geçerli trafik sigortası poliçesi kontrolü',
      'İlk yardım çantası, yangın tüpü ve reflektör teyidi',
      'TÜVTÜRK randevusu ve vergi/ceza borcu kontrolü',
      'Fren ve sinyal lambaları testi',
    ],
  },
  {
    id: 'pet-periodic',
    category: 'Sağlık',
    icon: '🐱',
    badge: 'Periyodik Kontrol',
    label: 'Kedi Parazit Damlası',
    prompt: '3 ayda bir kedinin iç dış parazit damlasını yenilemeyi unutmayayım',
    expectedHiddenInferences: [
      'İlaç stok ve son kullanma tarihi kontrolü',
      'Uygulama sonrası 48 saat yıkama yapılmaması',
      'Aşı takvimine sonraki döngü kaydı',
    ],
  },
  {
    id: 'social-sports',
    category: 'Sosyal',
    icon: '⚽',
    badge: 'Halı Saha',
    label: 'Halı Saha Maçı',
    prompt: 'Yarın akşam Ahmetlerle halı saha maçı var formayı yıka çantayı hazırla',
    expectedHiddenInferences: [
      'Forma ve ayakkabıları önceden havalandırma',
      'Yedek kıyafet, havlu ve su matarasını çantaya koyma',
      'Takım katılım teyidi ve saha ücreti paylaşımı',
    ],
  },
  {
    id: 'health-dentist',
    category: 'Sağlık',
    icon: '🦷',
    badge: 'Diş Randevusu',
    label: 'Diş Hekimi',
    prompt: 'Gelecek hafta perşembe öğlen diş randevum var kanal tedavisi kontrolü',
    expectedHiddenInferences: [
      'Eski röntgen ve tahlil filmlerini yanına alma',
      'Randevu öncesi açlık/tokluk durumunu doğrulama',
      'Ağrı kesici veya reçeteli ilaçları yanına alma',
    ],
  },
  {
    id: 'official-passport',
    category: 'İş',
    icon: '🛂',
    badge: 'Resmi Başvuru',
    label: 'Pasaport Başvurusu',
    prompt: 'Haftaya pazartesi sabah pasaport yenileme randevusuna gideceğim',
    expectedHiddenInferences: [
      'Pasaport harç ve defter bedelini bankaya yatırma',
      'Son 6 ayda çekilmiş 2 adet biyometrik fotoğraf temini',
      'Eski pasaport ve T.C. kimlik kartı asılları',
      'Randevudan 15 dakika önce kurumda bulunma',
    ],
  },
  {
    id: 'home-maintenance',
    category: 'Bakım & Onarım',
    icon: '❄️',
    badge: 'Kombi Servisi',
    label: 'Kombi Bakımı',
    prompt: 'Kış gelmeden kombi bakımını yaptıracağız servis çağır petekleri temizlet',
    expectedHiddenInferences: [
      'Yetkili kombi servisi randevusu oluşturma',
      'Kombi su bar basıncını kontrol etme',
      'Radyatör hava alma anahtarını hazır bulundurma',
      'Garanti belgesi ve bakım formunu çıkarma',
    ],
  },
  {
    id: 'finance-salary',
    category: 'Finans',
    icon: '💳',
    badge: 'Maaş & Borç',
    label: 'Kredi Kartı ve Birikim',
    prompt: 'Maaş yatınca kredi kartı borcunu sıfırla ve 5000 lira vadeliye at',
    expectedHiddenInferences: [
      'Ekstre son ödeme tarihini ve asgari tutarı kontrol etme',
      'Vadeli/tasarruf hesabına aktarım talimatı',
      'Otomatik fatura ödemelerinin bakiye kontrolü',
    ],
  },
  {
    id: 'fermentation-beer',
    category: 'Ev & Yaşam',
    icon: '🍺',
    badge: 'Fermantasyon',
    label: 'Ev Yapımı Bira',
    prompt: 'Bira kitini mayaladım kovaya aldım',
    expectedHiddenInferences: [
      'Kova fermantasyon takibi ve sıcaklık kontrolü (18-22°C)',
      '14. gün kova bitişi ve FG yoğunluk ölçümü ile şişeleme',
      '28. gün şişede gazlanma ve tadım olgunlaşması',
    ],
  },
  {
    id: 'fermentation-pickle',
    category: 'Ev & Yaşam',
    icon: '🥒',
    badge: 'Fermantasyon',
    label: 'Ev Turşusu',
    prompt: 'Kışlık turşu kurdum kavanozladım',
    expectedHiddenInferences: [
      'Güneş görmeyen serin yerde muhafaza',
      '21. gün olgunlaşma bitişi ve kıtırlık testi',
    ],
  },
  {
    id: 'fermentation-vinegar',
    category: 'Ev & Yaşam',
    icon: '🍎',
    badge: 'Fermantasyon',
    label: 'Doğal Sirke',
    prompt: 'Elma sirkesi kurdum mayaladım',
    expectedHiddenInferences: [
      'İlk 20 gün meyveler çökene kadar tahta kaşıkla günlük karıştırma',
      '20. gün süzme ve sirke anası dinlenmesi',
      '60. gün nihai şişeleme ve anayı ayırma',
    ],
  },
  {
    id: 'fermentation-olive',
    category: 'Ev & Yaşam',
    icon: '🫒',
    badge: 'Fermantasyon',
    label: 'Sofralık Zeytin',
    prompt: 'Yeşil zeytin çizdim tatlandırma yapıyorum',
    expectedHiddenInferences: [
      'İlk 2 hafta 2 günde bir su değişimi ile tatlandırma',
      '15. gün salamura, kaya tuzu ve yağlama',
    ],
  },
];
