// src/services/engine/temporalAnchor.ts

export interface UserRhythmConfig {
  workStart: string;    // "08:30"
  workEnd: string;      // "17:30"
  weekendWake: string;  // "10:00"
  eveningHome: string;  // "19:00"
  nightRest: string;    // "23:00"
}

export function resolveContextualTime(
  timeContext: 'sabah' | 'oglen' | 'aksam' | 'mesai_bitimi' | 'gece',
  targetDate: Date,
  category: 'is' | 'kisisel' | 'ev',
  config?: UserRhythmConfig
): { hour: number; minute: number } {
  const isWeekend = targetDate.getDay() === 0 || targetDate.getDay() === 6;

  switch (timeContext) {
    case 'sabah':
      if (isWeekend) return { hour: 10, minute: 0 };
      return category === 'is' ? { hour: 8, minute: 30 } : { hour: 9, minute: 30 };

    case 'oglen':
      return { hour: 12, minute: 45 };

    case 'mesai_bitimi':
      return { hour: 17, minute: 30 };

    case 'aksam':
      return { hour: 19, minute: 15 };

    case 'gece':
      return { hour: 21, minute: 30 };

    default:
      return { hour: 9, minute: 0 };
  }
}
