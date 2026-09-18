// src/services/engine/orchestrator.ts

import {
  type NotiviaIntentType,
  type NotiviaOperationalCategory,
  type NotiviaCognitiveResult,
  calculateBufferTiming,
  resolveCycleInterval,
  NOTIVIA_COGNITIVE_SYSTEM_PROMPT
} from './cognitivePrompt.ts';

export {
  type NotiviaIntentType,
  type NotiviaOperationalCategory,
  type NotiviaCognitiveResult,
  calculateBufferTiming,
  resolveCycleInterval,
  NOTIVIA_COGNITIVE_SYSTEM_PROMPT
};

export interface ParsedActionPayload {
  baslik: string;
  kategori?: string;
  intent_type?: NotiviaIntentType;
  tarih_iso?: string | null;
  hazirlik_iso?: string | null;
  interval_days?: number | null;
  zaman?: string | null;
  zaman_etiketi?: string;
  action_items?: { task: string; is_completed: boolean }[] | null;
  ikon?: string;
  renk?: string;
  sesli_fisilti?: string | null;
  sesli_onay?: string;
  anomali_notu?: string | null;
  anomali_uyarisi?: string | null;
  eksik_bilgi?: boolean;
  netlestirme_sorusu?: string | null;
  [key: string]: any;
}

export interface EngineResult {
  confidence: number;            // 0.00 - 1.00
  needsClarification: boolean;
  clarificationPrompt?: string;
  action: ParsedActionPayload;
}

export function evaluateConfidence(action: ParsedActionPayload, rawText: string): number {
  let score = 1.0;

  // 1. Kategori - Kelime Uyuşmazlığı Cezası (Negatif Kalkanlar)
  if (action.kategori === 'Alışveriş' || action.intent_type === 'shopping') {
    const adminWords = ['onay', 'yazı', 'dys', 'resmi', 'veli', 'rapor', 'balata', 'kombi', 'kurul', 'evrak', 'servis'];
    if (adminWords.some(w => rawText.toLowerCase().includes(w))) {
      score -= 0.60; // Kritik güven düşüşü
    }
  }

  // 2. Zaman Tutarsızlığı Cezası
  if (action.tarih_iso && new Date(action.tarih_iso).getTime() < Date.now()) {
    score -= 0.40; // Geçmiş zaman üretilmişse hata
  }

  // 3. Muğlak Eylem Cezası
  if (action.baslik.length < 3 || action.baslik.toLowerCase().includes('not al')) {
    score -= 0.30;
  }

  return Math.max(0, score);
}

