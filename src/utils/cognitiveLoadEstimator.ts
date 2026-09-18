/**
 * Bilişsel Yük ve Süre Tahmincisi (Cognitive Load & Effort Estimator)
 * Eklenen her görevin doğasına göre gereken tahmini odaklanma süresini ve efor seviyesini hesaplar.
 * Aşırı yüklenen günlerde zihinsel hafifletme tavsiyeleri üretir.
 */

export type CognitiveLoadLevel = 'Hafif (1-15 dk)' | 'Orta (15-45 dk)' | 'Derin Odak (45+ dk)';

export interface CognitiveLoadAnalysis {
  estimatedMinutes: number;
  loadLevel: CognitiveLoadLevel;
  requiresHighFocus: boolean;
  bestTimeOfDay: 'Sabah (Zihin Açıkken)' | 'Öğleden Sonra' | 'Akşam / Gün Sonu' | 'Herhangi';
  advice?: string;
}

export interface DailyLoadSummary {
  totalEstimatedMinutes: number;
  taskCount: number;
  isOverloaded: boolean;
  warningNote?: string;
}

/**
 * Görev metninden tahmini süre ve bilişsel yük çıkarır.
 */
export function estimateCognitiveLoad(taskTitle: string, actionItemCount: number = 0): CognitiveLoadAnalysis {
  const lower = taskTitle.toLowerCase();

  // 1. Derin Odak Gerektiren İşler (45-90 dk)
  if (
    lower.includes('dilekçe') ||
    lower.includes('makale') ||
    lower.includes('tez') ||
    lower.includes('gerekçeli karar') ||
    lower.includes('dys') ||
    lower.includes('ihale') ||
    lower.includes('sözleşme') ||
    lower.includes('kodlama') ||
    lower.includes('analiz') ||
    lower.includes('istinaf') ||
    lower.includes('bütçe') ||
    lower.includes('proje')
  ) {
    const minutes = Math.max(60, 45 + actionItemCount * 15);
    return {
      estimatedMinutes: minutes,
      loadLevel: 'Derin Odak (45+ dk)',
      requiresHighFocus: true,
      bestTimeOfDay: 'Sabah (Zihin Açıkken)',
      advice: '🧠 Yüksek zihinsel efor gerektirir; sabah 09:00 - 11:30 aralığında bölünmeden tamamlanması önerilir.',
    };
  }

  // 2. Orta Seviye İşler (20-45 dk)
  if (
    lower.includes('noter') ||
    lower.includes('banka') ||
    lower.includes('kbs') ||
    lower.includes('ek ders') ||
    lower.includes('e-okul') ||
    lower.includes('toplantı') ||
    lower.includes('veli') ||
    lower.includes('muayene') ||
    lower.includes('ilaçlama') ||
    lower.includes('tamir') ||
    lower.includes('antrenman') ||
    lower.includes('fatura')
  ) {
    const minutes = Math.max(30, 20 + actionItemCount * 10);
    return {
      estimatedMinutes: minutes,
      loadLevel: 'Orta (15-45 dk)',
      requiresHighFocus: false,
      bestTimeOfDay: 'Öğleden Sonra',
      advice: '📋 Standart operasyonel süreç; mesai ortasında ele alınabilir.',
    };
  }

  // 3. Hafif Rutinler ve Alışverişler (5-15 dk)
  const baseMinutes = Math.min(20, Math.max(5, 5 + actionItemCount * 3));
  return {
    estimatedMinutes: baseMinutes,
    loadLevel: 'Hafif (1-15 dk)',
    requiresHighFocus: false,
    bestTimeOfDay: 'Akşam / Gün Sonu',
    advice: '⚡ Hızlı tamamlanabilir mikro eylem.',
  };
}

/**
 * Günlük kart listesini analiz ederek aşırı bilişsel yükü denetler.
 */
export function calculateDailyCognitiveLoad(
  cardsForDay: Array<{ baslik: string; action_items?: any[] }>
): DailyLoadSummary {
  let totalMinutes = 0;

  for (const card of cardsForDay) {
    const analysis = estimateCognitiveLoad(card.baslik, card.action_items?.length || 0);
    totalMinutes += analysis.estimatedMinutes;
  }

  const isOverloaded = totalMinutes > 360; // 6 saatten fazla aktif odak yükü
  let warningNote: string | undefined;

  if (isOverloaded) {
    warningNote = `⚠️ Bilişsel Aşırı Yükleme: Bugün için toplam tahmini ${Math.round(totalMinutes / 60)} saatlik yoğun iş planlanmış. Zihinsel yorgunluğu önlemek için hafif işleri yarına kaydırmanız önerilir.`;
  }

  return {
    totalEstimatedMinutes: totalMinutes,
    taskCount: cardsForDay.length,
    isOverloaded,
    warningNote,
  };
}
