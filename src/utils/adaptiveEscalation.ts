/**
 * Akıllı Eskalasyon ve Erteleme Zekâsı (Adaptive Snooze & Escalation Engine)
 * Ertelenen veya geciken görevleri analiz ederek görev riskine göre uyarının şiddetini ve aciliyetini kademeli olarak yükseltir.
 */

export interface EscalationResult {
  escalationLevel: 'normal' | 'dikkat' | 'yuksek' | 'kritik';
  snoozeCount: number;
  highlightColor?: string;
  escalatedBadge?: string;
  escalatedWarning?: string;
  escalatedWhisper?: string;
}

/**
 * Görevin yasal/hayati risk seviyesini ve erteleme sayısını değerlendirir.
 */
export function evaluateTaskEscalation(
  taskTitle: string,
  snoozeCount: number = 0,
  dueIso?: string | null
): EscalationResult {
  const lower = taskTitle.toLowerCase();

  // Yasal ve Hayati Kritik Alanlar
  const isHighRisk =
    lower.includes('tebligat') ||
    lower.includes('itiraz') ||
    lower.includes('istinaf') ||
    lower.includes('duruşma') ||
    lower.includes('vergi') ||
    lower.includes('beyanname') ||
    lower.includes('kdv') ||
    lower.includes('sgk') ||
    lower.includes('aşı') ||
    lower.includes('asi') ||
    lower.includes('ilaç') ||
    lower.includes('dys') ||
    lower.includes('kbs') ||
    lower.includes('sınav not') ||
    lower.includes('muayene');

  if (snoozeCount === 0) {
    return {
      escalationLevel: 'normal',
      snoozeCount: 0,
    };
  }

  // 1. Erteleme
  if (snoozeCount === 1) {
    if (isHighRisk) {
      return {
        escalationLevel: 'dikkat',
        snoozeCount: 1,
        highlightColor: '#FEF3C7',
        escalatedBadge: '⚠️ 1. Erteleme (Süreli İş)',
        escalatedWarning: 'Bu görev süreli ve yasal bağlayıcılığı olan bir süreçtir.',
        escalatedWhisper: 'Görevi erteledim ancak son teslim tarihini kaçırmamaya dikkat edin.',
      };
    }
    return {
      escalationLevel: 'normal',
      snoozeCount: 1,
      escalatedBadge: '1. Erteleme',
      escalatedWhisper: 'Görev ertelendi.',
    };
  }

  // 2. Erteleme
  if (snoozeCount === 2) {
    if (isHighRisk) {
      return {
        escalationLevel: 'yuksek',
        snoozeCount: 2,
        highlightColor: '#FED7AA',
        escalatedBadge: '🚨 2. Erteleme (Kritik Eşik)',
        escalatedWarning: 'Dikkat: Yasal hak kaybı veya gecikme cezası riski doğabilir!',
        escalatedWhisper: 'Dikkat: Bu görev 2 kez ertelendi. Ceza veya hak kaybı yaşamamak için bugün bitirmenizi öneririm.',
      };
    }
    return {
      escalationLevel: 'dikkat',
      snoozeCount: 2,
      highlightColor: '#FEF3C7',
      escalatedBadge: '2. Erteleme',
      escalatedWhisper: 'Görev 2. kez ertelendi.',
    };
  }

  // 3 ve üzeri Erteleme (Kritik Eskalasyon)
  return {
    escalationLevel: 'kritik',
    snoozeCount,
    highlightColor: '#FEE2E2',
    escalatedBadge: `🔥 ${snoozeCount}. Erteleme (ACİL)`,
    escalatedWarning: '⚠️ ACİL DURUM: Bu görev defalarca ertelendi! Öncelikli olarak tamamlanmalıdır.',
    escalatedWhisper: 'Acil uyarı: Bu görev artık ertelenemez kritik aşamaya geldi.',
  };
}
