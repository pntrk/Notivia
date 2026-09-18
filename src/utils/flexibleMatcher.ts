// src/utils/flexibleMatcher.ts
import { isAdministrativeContext } from './administrativeShield.ts';

export interface DomainConcept {
  id: string;
  name: string;
  // Hedef nesneler / kelime kökleri
  targets: string[];
  // Süreç / başlatma eylemleri
  triggers: string[];
  // Satın alma veya soru gibi zıt niyetleri eleyen kelimeler
  negatives: string[];
}

export const FERMENTATION_DOMAINS: DomainConcept[] = [
  {
    id: 'beer',
    name: 'Ev Yapımı Bira',
    targets: ['bira', 'kit', 'kova', 'şerbet', 'maya', 'gazlanma', 'lager', 'ale', 'pilsner'],
    triggers: ['kur', 'mayala', 'başla', 'koy', 'dök', 'doldur', 'kapat', 'hazır', 'tamam', 'attım', 'girdi'],
    negatives: ['al', 'alınacak', 'sipariş', 'fiyat', 'nerede', 'sat', 'tükendi']
  },
  {
    id: 'pickle',
    name: 'Ev Turşusu',
    targets: ['turşu', 'kornişon', 'lahana', 'salamura', 'kavanoz'],
    triggers: ['kur', 'bas', 'yaptım', 'koydum', 'kapattım', 'hazır'],
    negatives: ['al', 'alınacak', 'pazar', 'fiyat']
  },
  {
    id: 'vinegar',
    name: 'Ev Yapımı Sirke',
    targets: ['sirke', 'elma sirke', 'üzüm sirke', 'sirke anası'],
    triggers: ['kur', 'koy', 'mayala', 'süz', 'başla'],
    negatives: ['al', 'market', 'fiyat']
  }
];

export function detectFlexibleDomain(rawText: string): string | null {
  if (!rawText || typeof rawText !== 'string') return null;
  if (isAdministrativeContext(rawText)) return null;

  const text = rawText.toLowerCase().trim();

  for (const domain of FERMENTATION_DOMAINS) {
    // 1. Negatif kelime kontrolü (Örn: "bira kiti al" dediyse fermantasyon motoruna sokma)
    const hasNegative = domain.negatives.some(neg => text.includes(neg));
    if (hasNegative) continue;

    // 2. Hedef kelime var mı? (bira, kova, kit...)
    const matchedTarget = domain.targets.some(target => text.includes(target));

    // 3. Eylem/Tetikleyici kelime var mı? (kurduk, koydum, bitti, mayaladım...)
    const matchedTrigger = domain.triggers.some(trigger => text.includes(trigger));

    // Kombinasyon Kontrolü:
    // A) Hem hedef hem eylem varsa -> Doğrudan eşleşti (Örn: "kovayı doldurdum", "kit bitti")
    if (matchedTarget && matchedTrigger) {
      return domain.id;
    }

    // B) Çok güçlü tekil ifadeler (Örn: doğrudan "bira kiti" veya "bira kurdum" dendiğinde)
    if (text === 'bira kiti' || text === 'yeni kova' || text.includes('bira kurdum')) {
      return domain.id;
    }
  }

  return null; // Yerelde net yakalanamadıysa Gemini LLM'e devret
}
