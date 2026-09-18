// src/services/engine/PersonalCognitiveOrchestrator.ts

export interface UserRhythmConfig {
  workStart: string;    // "08:30"
  workEnd: string;      // "17:30"
  weekendWake: string;  // "10:00"
  eveningHome: string;  // "19:00"
  nightRest: string;    // "23:00"
}

export const DEFAULT_RHYTHM: UserRhythmConfig = {
  workStart: '08:30',
  workEnd: '17:30',
  weekendWake: '10:00',
  eveningHome: '19:00',
  nightRest: '23:00',
};

export interface ActionItem {
  task: string;
  is_completed: boolean;
}

export type CognitiveCategory = 
  | 'İdari & Okul' 
  | 'Bakım & Teknik' 
  | 'Ev & Yaşam' 
  | 'Alışveriş' 
  | 'Finans' 
  | 'Sosyal' 
  | 'Genel';

export interface ParsedActionPayload {
  id?: string;
  baslik: string;
  kategori: CognitiveCategory;
  zaman_etiketi?: string;
  tarih_iso?: string | null;
  hazirlik_iso?: string | null;
  interval_days?: number | null;
  action_items: ActionItem[];
  anomali_uyarisi?: string | null;
  ikon: string;
  renk: string;
  sesli_onay?: string;
}

export interface OrchestratedItem {
  rawSegment: string;
  confidence: number;
  needsClarification: boolean;
  clarificationPrompt?: string;
  payload: ParsedActionPayload;
}

/**
 * 1. Bileşik Cümle Parçalayıcı
 * Kullanıcının tek nefeste söylediği sıralı eylemleri bağlaçlar,
 * zaman geçişleri ve çekimli fiil sonlarından mantıksal alt parçalara böler.
 */
export function splitCompoundUtterance(rawText: string): string[] {
  if (!rawText || !rawText.trim()) return [];

  // Noktalama işaretleri, bağlaçlar ve Türkçe eylem geçişleri
  const conjunctionRegex = 
    /(?:[\.\n;]+|\s+(?:sonra da|ardından|ve de|ayrıca|dönerken de|çıkışta da|ondan sonra|akabinde)\s+|(?<=\b(?:yapayım|gideyim|edeyim|alırım|bakarım|ödeyim|yazayım|baktırayım|bırakayım|alırız))\s*,\s*)/i;

  const rawSegments = rawText.split(conjunctionRegex);

  return rawSegments
    .map(segment => segment.trim())
    .filter(segment => segment.length > 3);
}

/**
 * 2. Kişisel Yaşam Ritmi ve Zaman Çapaları
 * 'Sabah', 'mesai bitimi' gibi izafi kavramları kullanıcının haftalık yaşam 
 * ritmine ve görevin bağlamına (iş/ev/bakım) göre dinamik saate dönüştürür.
 */
export function resolveContextualTime(
  timeContext: 'sabah' | 'oglen' | 'aksam' | 'mesai_bitimi' | 'gece' | 'varsayilan',
  targetDate: Date,
  category: CognitiveCategory,
  config: UserRhythmConfig = DEFAULT_RHYTHM
): { hour: number; minute: number } {
  const isWeekend = targetDate.getDay() === 0 || targetDate.getDay() === 6;

  const parseTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return { hour: h, minute: m };
  };

  switch (timeContext) {
    case 'sabah':
      if (isWeekend) return parseTime(config.weekendWake);
      return category === 'İdari & Okul' ? parseTime(config.workStart) : { hour: 9, minute: 30 };

    case 'oglen':
      return { hour: 12, minute: 45 };

    case 'mesai_bitimi':
      return isWeekend ? { hour: 18, minute: 0 } : parseTime(config.workEnd);

    case 'aksam':
      return parseTime(config.eveningHome);

    case 'gece':
      return parseTime(config.nightRest);

    default:
      return { hour: 10, minute: 0 };
  }
}

/**
 * 3. Güven Skoru ve Hata Kalkanı
 * Yapılandırılmış verinin güvenilirliğini puanlar; bürokratik, teknik veya yasal
 * işlemlerin hatalı kategorilere (örneğin alışverişe) düşmesini engeller.
 */
export function evaluateConfidence(action: ParsedActionPayload, rawText: string): number {
  let score = 1.0;
  const lowerText = rawText.toLowerCase();

  // A) Bürokratik / İdari Kalkan (Destek eğitim, DYS gibi terimlerin alışverişe düşmesi engellenir)
  const adminKeywords = [
    'onay', 'olur', 'yazı', 'dys', 'mebbis', 'e-okul', 'destek eğitim',
    'bep', 'ram', 'nöbet', 'puantaj', 'ek ders', 'şök', 'zümre', 'tutanak'
  ];
  if (action.kategori === 'Alışveriş' && adminKeywords.some(w => lowerText.includes(w))) {
    score -= 0.65;
  }

  // B) Teknik Bakım Kalkanı (Kombi, balata, tesisatın alışverişe düşmesi engellenir)
  const maintenanceKeywords = ['balata', 'kombi', 'basınç', 'arıza', 'servis', 'filtre', 'tesisat'];
  if (action.kategori === 'Alışveriş' && maintenanceKeywords.some(w => lowerText.includes(w))) {
    score -= 0.50;
  }

  // C) Geçmiş Zaman Tutarsızlığı
  if (action.tarih_iso) {
    const parsedDate = new Date(action.tarih_iso).getTime();
    if (!isNaN(parsedDate) && parsedDate < Date.now() - 60000) {
      score -= 0.40;
    }
  }

  // D) İçi Boş veya Muğlak Görev Tespiti
  if (!action.baslik || action.baslik.trim().length < 3 || action.baslik.toLowerCase().includes('not al')) {
    score -= 0.35;
  }

  // E) Alt Görev Tutarlılığı (Listedeki maddeler tek harfli veya bölük pörçük mü?)
  if (action.action_items && action.action_items.length > 0) {
    const hasCorruptItem = action.action_items.some(item => item.task.trim().length <= 2);
    if (hasCorruptItem) {
      score -= 0.30;
    }
  }

  return Math.max(0, Math.min(1, Number(score.toFixed(2))));
}

/**
 * 4. Bilişsel Orkestrasyon Yürütücüsü
 * Ayrıştırılmış her segmente zaman çözümü uygular, kalkanı çalıştırır ve
 * netleştirme gerekip gerekmediğini denetler.
 */
export class PersonalCognitiveOrchestrator {
  private rhythm: UserRhythmConfig;

  constructor(customRhythm: Partial<UserRhythmConfig> = {}) {
    this.rhythm = { ...DEFAULT_RHYTHM, ...customRhythm };
  }

  public orchestrate(rawUtterance: string, parserFallback: (text: string) => Promise<ParsedActionPayload>): Promise<OrchestratedItem[]> {
    const segments = splitCompoundUtterance(rawUtterance);

    return Promise.all(
      segments.map(async (segment) => {
        const payload = await parserFallback(segment);

        // İzafi zaman çözümlemesi
        if (!payload.tarih_iso && payload.zaman_etiketi) {
          const lowerLabel = payload.zaman_etiketi.toLowerCase();
          const targetDate = new Date();

          let timeContext: 'sabah' | 'oglen' | 'aksam' | 'mesai_bitimi' | 'gece' | 'varsayilan' = 'varsayilan';
          if (lowerLabel.includes('sabah')) timeContext = 'sabah';
          else if (lowerLabel.includes('öğle') || lowerLabel.includes('oglen')) timeContext = 'oglen';
          else if (lowerLabel.includes('mesai')) timeContext = 'mesai_bitimi';
          else if (lowerLabel.includes('akşam') || lowerLabel.includes('aksam')) timeContext = 'aksam';
          else if (lowerLabel.includes('gece')) timeContext = 'gece';

          const { hour, minute } = resolveContextualTime(timeContext, targetDate, payload.kategori, this.rhythm);
          targetDate.setHours(hour, minute, 0, 0);
          payload.tarih_iso = targetDate.toISOString();
        }

        const confidence = evaluateConfidence(payload, segment);
        const needsClarification = confidence < 0.65;

        return {
          rawSegment: segment,
          confidence,
          needsClarification,
          clarificationPrompt: needsClarification 
            ? `"${payload.baslik}" kaydı için kategoriyi veya tarihi doğrulamak ister misiniz?`
            : undefined,
          payload,
        };
      })
    );
  }
}
