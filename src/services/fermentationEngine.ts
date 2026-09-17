// src/services/fermentationEngine.ts

export interface IntermediateCheck {
  herXGundeBir: number; // Örn: Her 3 günde bir
  bitisGunu: number;     // 14. güne kadar (şişelemeye kadar)
  baslik: string;
  mesaj: string;
}

export interface FermentationPhase {
  gun: number;
  baslik: string;
  aksiyon: string;
}

export interface FermentationRecipe {
  keywords: RegExp;
  urun: string;
  ikon: string;
  renk: string;
  ipuclari: string;
  araKontrol?: IntermediateCheck;
  asamalar: FermentationPhase[];
}

export const FERMENTATION_REGISTRY: FermentationRecipe[] = [
  {
    // Bira Kurulumu ve Dolaylı İfadeler:
    // "Kovayı doldurdum", "mayayı serptim", "şerbeti kilitledim", "yeni parti kurduk", "bira kiti bitti kapağı kapattım", "bira mayaladım", "kovaya aldım"
    keywords: /(?:(?:bira|kit|parti).*(?:kuruldu|kurduk|kurdum|mayaladım|mayaladik|kovaya aldım|kovaya aldik|kurulum|kapağı kapattım|kapagi kapattim|bitti.*kapattım|kilitledim)|(?:kovayı|kovayi)\s+doldurdum|mayayı\s+serptim|mayayi\s+serptim|şerbeti\s+kilitledim|serbeti\s+kilitledim|yeni\s+parti\s+kurduk)/i,
    urun: 'Ev Yapımı Bira',
    ikon: '🍺',
    renk: '#FEF3C7',
    ipuclari: 'Kova sıcaklığını 18-22°C arasında sabit tutun. Güneşten ve esintiden koruyun.',
    // 3 günde bir sıcaklık ve hava kilidi denetimi
    araKontrol: {
      herXGundeBir: 3,
      bitisGunu: 14,
      baslik: '🍺 Kova Sıcaklık & Hava Kilidi Kontrolü',
      mesaj: 'Sıcaklık kristal termometrede 18-22°C bandında mı? Hava kilidi suyunu kontrol edin.'
    },
    asamalar: [
      {
        gun: 14,
        baslik: 'Kova Fermantasyon Bitişi & Şişeleme',
        aksiyon: 'Yoğunluk ölçümü yapın (FG kontrolü). Şişeleme şekeri ile şişelemeye geçin.'
      },
      {
        gun: 28,
        baslik: 'Şişede Gazlanma ve Olgunlaşma Bitişi',
        aksiyon: 'İlk partiyi buzdolabına alın, tadım için hazır!'
      }
    ]
  },
  {
    // Turşu Kurulumu ve Dolaylı İfadeler:
    // "Kornişonları kavanoza bastım", "turşuyu kurdum", "salamurayı döktüm", "lahana turşusu bastım"
    keywords: /(?:(?:turşu|tursu).*(?:kurdum|kurduk|bastım|bastik|yaptım|yaptik|kurulum)|kornişon.*(?:bastım|kurdum|kavanoz)|salamurayı\s+döktüm|salamurayi\s+doktum|kavanoza\s+bastım|kavanoza\s+bastik)/i,
    urun: 'Ev Turşusu',
    ikon: '🥒',
    renk: '#DCFCE7',
    ipuclari: 'Güneş görmeyen serin bir yerde muhafaza edin. Beyaz tabaka oluşumuna karşı kapağı sıkı tutun.',
    araKontrol: {
      herXGundeBir: 5,
      bitisGunu: 21,
      baslik: '🥒 Turşu Suyu & Gaz Kontrolü',
      mesaj: 'Kavanoz kapağında aşırı şişme veya yüzeyde kef/beyazlanma var mı kontrol edin.'
    },
    asamalar: [
      {
        gun: 21,
        baslik: 'Turşu Olgunlaşma Bitişi',
        aksiyon: 'Kavanozu açın, kıtırlığı kontrol edin. Açtıktan sonra buzdolabında saklayın.'
      }
    ]
  },
  {
    // Sirke Kurulumu:
    // "Elma sirkesi kurdum", "sirke mayaladım", "üzüm sirkesi koydum"
    keywords: /(?:(?:sirke).*(?:kurdum|kurduk|koydum|mayaladım|mayaladik|yaptım|bastım)|sirke\s+anası\s+koydum)/i,
    urun: 'Ev Yapımı Doğal Sirke',
    ikon: '🍎',
    renk: '#FEE2E2',
    ipuclari: 'İlk 20 gün meyveler dibe çökene kadar her gün tahta kaşıkla karıştırın.',
    araKontrol: {
      herXGundeBir: 2,
      bitisGunu: 20,
      baslik: '🍎 Sirke Karıştırma & Havalandırma',
      mesaj: 'Meyvelerin küflenmemesi ve havalanması için tahta kaşıkla dairesel karıştırın.'
    },
    asamalar: [
      {
        gun: 20,
        baslik: 'Meyveleri Süzme Vakti',
        aksiyon: 'Dibe çöken meyveleri tülbentle süzün, sirke anasının oluşması için dinlenmeye bırakın.'
      },
      {
        gun: 60,
        baslik: 'Sirke Dinlenmesi & Şişeleme',
        aksiyon: 'Sirke anasını ayırın, temiz cam şişelere aktarın.'
      }
    ]
  },
  {
    // Şarap & Meyve Fermantasyonu:
    keywords: /(?:(?:şarap|sarap).*(?:kurdum|kurduk|mayaladım|mayaladik|kovaya aldım|fermente)|üzüm\s+şırası\s+mayaladım)/i,
    urun: 'Ev Yapımı Şarap',
    ikon: '🍷',
    renk: '#FCE7F3',
    ipuclari: 'Damacanayı doğrudan ışıktan koruyun ve hava kilidi seviyesini haftalık denetleyin.',
    araKontrol: {
      herXGundeBir: 7,
      bitisGunu: 28,
      baslik: '🍷 Şarap Gaz Çıkışı & Hava Kilidi Kontrolü',
      mesaj: 'Hava kilidindeki kabarcık sıklığını ve tortu çökme durumunu gözlemleyin.'
    },
    asamalar: [
      {
        gun: 28,
        baslik: 'İlk Aktarma (Tortudan Ayırma)',
        aksiyon: 'Sifon yardımıyla dip tortuyu havalandırmadan temiz ikinci damacanaya aktarın.'
      },
      {
        gun: 90,
        baslik: 'Olgunlaşma Bitişi & Şişeleme',
        aksiyon: 'Berraklığı kontrol edin, mantar tıpa ile şişeleyin.'
      }
    ]
  },
  {
    // Sofralık Zeytin Kurulumu:
    keywords: /(?:(?:zeytin).*(?:kurdum|kurduk|tatlandırma|tatlandirma|çizdim|cizdim|kırdım|kirdim|bastım)|zeytinleri\s+çizip\s+suya\s+bastım)/i,
    urun: 'Sofralık Zeytin',
    ikon: '🫒',
    renk: '#E0E7FF',
    ipuclari: 'İlk 2 hafta boyunca 2 günde bir suyunu değiştirin.',
    araKontrol: {
      herXGundeBir: 2,
      bitisGunu: 14,
      baslik: '🫒 Zeytin Su Değişimi',
      mesaj: 'Acılığının gitmesi ve tatlanması için kavanoz suyunu tazeleyin.'
    },
    asamalar: [
      {
        gun: 15,
        baslik: 'Salamura & Yağlama Aşaması',
        aksiyon: 'Acılık kontrolü yapın. Uygunsa kaya tuzu, limon tuzu ve zeytinyağı ile kavanozlayın.'
      }
    ]
  }
];
