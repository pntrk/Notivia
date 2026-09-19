/**
 * Notivia Yerel Öğrenen Kullanıcı Sözlüğü Motoru (Local Adaptive Vocabulary Engine)
 * Kullanıcının kendi kurumuna, işine veya sosyal hayatına özel jargon ve kısaltmalarını
 * tarayıcı yerel belleğinde saklar ve Jargon Radarına dinamik besler.
 */

import { CustomVocabularyItem, ProfessionDomain } from '../types/notivia.ts';

const VOCAB_STORAGE_KEY = 'notivia_custom_vocabulary';

// Varsayılan zenginleştirilmiş terimler
const DEFAULT_CUSTOM_VOCAB: CustomVocabularyItem[] = [
  { id: 'cv-1', term: 'UYAP', mappedDomain: 'HUKUK', category: 'Kurum', notes: 'Ulusal Yargı Ağı Bilişim Sistemi', createdAt: new Date().toISOString(), usageCount: 5 },
  { id: 'cv-2', term: 'SMMM', mappedDomain: 'FINANS', category: 'Meslek', notes: 'Serbest Muhasebeci Mali Müşavir', createdAt: new Date().toISOString(), usageCount: 4 },
  { id: 'cv-3', term: 'KBS', mappedDomain: 'EGITIM', category: 'Sistem', notes: 'Kamu Harcama ve Muhasebe Bilişim Sistemi (Ek Ders)', createdAt: new Date().toISOString(), usageCount: 3 },
  { id: 'cv-4', term: 'LOTO', mappedDomain: 'TEKNIK', category: 'İSG', notes: 'Lockout-Tagout (Kilitleme-Etiketleme Emniyeti)', createdAt: new Date().toISOString(), usageCount: 3 },
  { id: 'cv-5', term: 'SBAR', mappedDomain: 'SAGLIK', category: 'Protokol', notes: 'Situation Background Assessment Recommendation Devir', createdAt: new Date().toISOString(), usageCount: 2 },
  { id: 'cv-6', term: 'SCBA', mappedDomain: 'SAVUNMA', category: 'Ekipman', notes: 'Self-Contained Breathing Apparatus (Solunum Cihazı)', createdAt: new Date().toISOString(), usageCount: 2 },
  { id: 'cv-7', term: 'HACCP', mappedDomain: 'GASTRONOMI', category: 'Standart', notes: 'Kritik Kontrol Noktaları Tehlike Analizi', createdAt: new Date().toISOString(), usageCount: 2 }
];

export function getCustomVocabulary(): CustomVocabularyItem[] {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(VOCAB_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
  } catch {
    // fallback
  }
  return DEFAULT_CUSTOM_VOCAB;
}

export function saveCustomVocabulary(items: CustomVocabularyItem[]): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(items));
    }
  } catch {
    // ignore
  }
}

export function addCustomVocabularyItem(term: string, mappedDomain: ProfessionDomain, notes?: string): CustomVocabularyItem {
  const list = getCustomVocabulary();
  const existing = list.find(x => x.term.toLowerCase() === term.trim().toLowerCase());
  if (existing) {
    existing.usageCount += 1;
    existing.mappedDomain = mappedDomain;
    if (notes) existing.notes = notes;
    saveCustomVocabulary(list);
    return existing;
  }

  const newItem: CustomVocabularyItem = {
    id: `cv-${Date.now()}`,
    term: term.trim(),
    mappedDomain,
    notes,
    createdAt: new Date().toISOString(),
    usageCount: 1
  };

  list.unshift(newItem);
  saveCustomVocabulary(list);
  return newItem;
}

export function removeCustomVocabularyItem(id: string): void {
  const list = getCustomVocabulary().filter(x => x.id !== id);
  saveCustomVocabulary(list);
}

/**
 * Kullanıcı metnini özel sözlükteki terimlerle eşler.
 */
export function matchCustomVocabulary(text: string): { matchedItem: CustomVocabularyItem; domain: ProfessionDomain } | null {
  if (!text) return null;
  const list = getCustomVocabulary();
  const lower = text.toLowerCase();

  for (const item of list) {
    const termLower = item.term.toLowerCase();
    if (lower.includes(termLower)) {
      item.usageCount += 1;
      saveCustomVocabulary(list);
      return { matchedItem: item, domain: item.mappedDomain };
    }
  }

  return null;
}
