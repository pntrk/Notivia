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
    keywords: /(bira|kit).*(kuruldu|mayaladım|kovaya aldım|kurulum)/i,
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
    keywords: /(turşu).*(kurdum|bastım|yaptım)/i,
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
    keywords: /(sirke).*(kurdum|koydum|mayaladım)/i,
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
    keywords: /(zeytin).*(kurdum|tatlandırma|çizdim|kırdım)/i,
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
