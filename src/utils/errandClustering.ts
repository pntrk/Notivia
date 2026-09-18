/**
 * Konum ve Güzergâh Kümeleme Motoru (Spatial & Errand Clustering Engine)
 * Kullanıcının dağınık görevlerini fiziksel yakınlıklarına ve lokasyon türlerine göre analiz ederek
 * tek bir akıllı güzergâh (errand batch) altında birleştirir.
 */

export interface ErrandCluster {
  clusterId: string;
  clusterTitle: string;
  locationLabel: string;
  icon: string;
  color: string;
  taskIds: string[];
  taskTitles: string[];
  suggestedRouteSummary: string;
}

interface LocationPattern {
  clusterId: string;
  clusterTitle: string;
  locationLabel: string;
  icon: string;
  color: string;
  keywords: string[];
}

const LOCATION_PATTERNS: LocationPattern[] = [
  {
    clusterId: 'carsi_merkez',
    clusterTitle: 'Çarşı & Merkez Güzergâhı',
    locationLabel: 'Çarşı / Merkez',
    icon: '🏛️',
    color: '#E0F2FE',
    keywords: ['noter', 'banka', 'atm', 'kırtasiye', 'ptt', 'belediye', 'nüfus', 'kaymakamlık', 'çarşı', 'merkez', 'terzi', 'kuru temizleme'],
  },
  {
    clusterId: 'sanayi_oto',
    clusterTitle: 'Sanayi & Oto Bakım Turu',
    locationLabel: 'Sanayi Sitesi',
    icon: '🔧',
    color: '#FEF3C7',
    keywords: ['sanayi', 'oto tamir', 'balata', 'yağ değişimi', 'lastikçi', 'kaporta', 'egzoz', 'muayene', 'tüvtürk', 'yedek parça', 'akü'],
  },
  {
    clusterId: 'saglik_hastane',
    clusterTitle: 'Sağlık & Klinik Hattı',
    locationLabel: 'Hastane / Sağlık Ocağı',
    icon: '🩺',
    color: '#F3E8FF',
    keywords: ['eczane', 'ilaç al', 'hastane', 'sağlık ocağı', 'poliklinik', 'tahlil', 'doktor randevu', 'diş hekimi', 'optik', 'gözlük'],
  },
  {
    clusterId: 'egitim_okul',
    clusterTitle: 'Okul & İlçe MEM Güzergâhı',
    locationLabel: 'Okul / Milli Eğitim',
    icon: '🏫',
    color: '#FEF08A',
    keywords: ['okul', 'ilçe mem', 'milli eğitim', 'kütüphane', 'ram', 'rehberlik', 'halk eğitim', 'zümre', 'veli'],
  },
  {
    clusterId: 'market_alisveris',
    clusterTitle: 'Market & Erzak Alışverişi',
    locationLabel: 'Süpermarket / Pazar',
    icon: '🛒',
    color: '#DCFCE7',
    keywords: ['market', 'bakkal', 'manav', 'kasap', 'pazar', 'migros', 'şok', 'bim', 'a101', 'şarküteri'],
  },
  {
    clusterId: 'adliye_hukuk',
    clusterTitle: 'Adliye & Hukuk Çemberi',
    locationLabel: 'Adliye / Baro',
    icon: '⚖️',
    color: '#E0E7FF',
    keywords: ['adliye', 'mahkeme', 'duruşma', 'icra dairesi', 'savcılık', 'baro', 'hukuk bürosu', 'kalem'],
  },
];

/**
 * Mevcut tamamlanmamış kartları tarayarak aynı lokasyondaki görevleri kümeleştirir.
 */
export function clusterErrandsByLocation(
  cards: Array<{ id: string; baslik: string; is_completed?: boolean; action_items?: any[] }>
): ErrandCluster[] {
  const activeCards = cards.filter((c) => !c.is_completed);
  const clusterMap: Record<string, ErrandCluster> = {};

  for (const card of activeCards) {
    const textToScan = `${card.baslik} ${(card.action_items || []).map((a: any) => a.task).join(' ')}`.toLowerCase();

    for (const pattern of LOCATION_PATTERNS) {
      const match = pattern.keywords.some((kw) => textToScan.includes(kw));
      if (match) {
        if (!clusterMap[pattern.clusterId]) {
          clusterMap[pattern.clusterId] = {
            clusterId: pattern.clusterId,
            clusterTitle: pattern.clusterTitle,
            locationLabel: pattern.locationLabel,
            icon: pattern.icon,
            color: pattern.color,
            taskIds: [],
            taskTitles: [],
            suggestedRouteSummary: '',
          };
        }

        if (!clusterMap[pattern.clusterId].taskIds.includes(card.id)) {
          clusterMap[pattern.clusterId].taskIds.push(card.id);
          clusterMap[pattern.clusterId].taskTitles.push(card.baslik);
        }
      }
    }
  }

  // Sadece 2 veya daha fazla görevi olan kümeleri önceliklendir (verimli birleştirme)
  const result: ErrandCluster[] = [];
  for (const cluster of Object.values(clusterMap)) {
    if (cluster.taskIds.length >= 2) {
      cluster.suggestedRouteSummary = `${cluster.locationLabel} bölgesinde ${cluster.taskIds.length} göreviniz var (${cluster.taskTitles.join(' + ')}). Tek seferde halledilebilir.`;
      result.push(cluster);
    }
  }

  return result;
}

/**
 * Yeni girilen bir görevin mevcut kartlarla güzergâh uyumunu kontrol eder.
 */
export function checkErrandRouteProximity(
  newTitle: string,
  existingCards: Array<{ id: string; baslik: string }>
): string | null {
  const lower = newTitle.toLowerCase();

  for (const pattern of LOCATION_PATTERNS) {
    const isNewMatching = pattern.keywords.some((kw) => lower.includes(kw));
    if (isNewMatching) {
      const matchingExisting = existingCards.filter((card) =>
        pattern.keywords.some((kw) => card.baslik.toLowerCase().includes(kw))
      );

      if (matchingExisting.length > 0) {
        const titles = matchingExisting.map((c) => c.baslik).join(', ');
        return `📍 ${pattern.locationLabel} uğramışken: Zaten kayıtlı olan "${titles}" işinizi de tek seferde bitirebilirsiniz.`;
      }
    }
  }

  return null;
}
