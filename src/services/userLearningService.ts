// src/services/userLearningService.ts
import type { SimpleCardItem } from '../App';
import type { ProfessionDomain } from '../types/notivia';
import { DEFAULT_RHYTHM, type UserRhythmConfig } from './engine/PersonalCognitiveOrchestrator';

export interface UserCognitiveProfile {
  detectedDomain: ProfessionDomain;
  rhythm: UserRhythmConfig;
  activeHoursDetected: { startHour: number; endHour: number };
  topKeywords: { word: string; count: number }[];
  frequentActions: string[];
  totalNotesAnalyzed: number;
  personalTips: string[];
  lastUpdated: string;
}

const STORAGE_KEY = 'notivia_user_cognitive_profile';

export const DEFAULT_COGNITIVE_PROFILE: UserCognitiveProfile = {
  detectedDomain: 'GENEL',
  rhythm: DEFAULT_RHYTHM,
  activeHoursDetected: { startHour: 8, endHour: 18 },
  topKeywords: [],
  frequentActions: [],
  totalNotesAnalyzed: 0,
  personalTips: [
    'Notivia, gün içindeki notlarınız ve hatırlatmalarınız çoğaldıkça yaşam ritminizi ve mesleki jargonunuzu öğrenir.',
    'Akşam 20:00 özetleri tamamlandıkça size özel zaman çapaları daha isabetli hale gelir.'
  ],
  lastUpdated: new Date().toISOString()
};

/**
 * Kullanıcının mevcut notlarını ve eylemlerini yerel olarak analiz edip bilişsel profilini günceller.
 * Hiçbir sunucuya veri göndermez, tamamen cihaz içinde çalışır (On-Device Profiling).
 */
export function analyzeAndLearnUserProfile(cards: SimpleCardItem[], currentDomain: ProfessionDomain = 'GENEL'): UserCognitiveProfile {
  if (!cards || cards.length === 0) {
    return loadUserCognitiveProfile();
  }

  // 1. Saat Dağılımını Analiz Et
  const hourCounts: { [hour: number]: number } = {};
  for (const card of cards) {
    if (card.createdAt) {
      const d = new Date(card.createdAt);
      const h = d.getHours();
      hourCounts[h] = (hourCounts[h] || 0) + 1;
    }
  }

  // En aktif aralıkları bul
  const sortedHours = Object.entries(hourCounts)
    .map(([h, c]) => ({ hour: Number(h), count: c }))
    .sort((a, b) => b.count - a.count);

  let earliestWorkHour = 8;
  let latestWorkHour = 18;

  if (sortedHours.length > 0) {
    const morningHours = sortedHours.filter(h => h.hour >= 6 && h.hour <= 11);
    const eveningHours = sortedHours.filter(h => h.hour >= 17 && h.hour <= 23);
    if (morningHours.length > 0) {
      earliestWorkHour = morningHours[0].hour;
    }
    if (eveningHours.length > 0) {
      latestWorkHour = eveningHours[0].hour;
    }
  }

  // 2. Kelime Frekansı ve Eğilim Analizi
  const wordFreq: { [word: string]: number } = {};
  const stopWords = new Set([
    've', 'ile', 'bir', 'bu', 'da', 'de', 'için', 'not', 'görev', 'var', 'sonra', 'kadar', 'olan', 'ama',
    'bugün', 'yarın', 'saat', 'adet', 'gün', 'yeni', 'tamamlandı', 'hazırlandı'
  ]);

  for (const card of cards) {
    const text = `${card.baslik} ${card.action_items?.map(a => a.task).join(' ') || ''}`.toLowerCase();
    const tokens = text.match(/[\p{L}]{3,}/gu) || [];
    for (const t of tokens) {
      if (!stopWords.has(t)) {
        wordFreq[t] = (wordFreq[t] || 0) + 1;
      }
    }
  }

  const topKeywords = Object.entries(wordFreq)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 3. Sık Yapılan Eylemler
  const actionCounts: { [act: string]: number } = {};
  for (const card of cards) {
    if (card.action_items) {
      for (const item of card.action_items) {
        const clean = item.task.replace(/^[0-9:]+\s*-\s*/, '').trim();
        if (clean.length > 3) {
          actionCounts[clean] = (actionCounts[clean] || 0) + 1;
        }
      }
    }
  }

  const frequentActions = Object.entries(actionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([act]) => act);

  // 4. Dinamik Kişisel Tavsiyeler (Domain & Alışkanlığa Özgü)
  const personalTips: string[] = [];
  if (currentDomain === 'EGITIM' || (currentDomain as string) === 'MEB_OGRETMEN') {
    personalTips.push('📚 Eğitim Takvimi: Sınav not girişleri ve nöbet defteri saatleri otomatik olarak mesai başlangıcınıza sabitlendi.');
  } else if (currentDomain === 'SAGLIK' || currentDomain === 'SAGLIK_SOSYAL') {
    personalTips.push('🩺 Klinik Düzen: Konsültasyon ve hasta devir döngüleri nöbet saatlerinize göre önceliklendirildi.');
  } else if (currentDomain === 'MAKINE' || currentDomain === 'OTOMOTIV' || currentDomain === 'INSAAT') {
    personalTips.push('🔧 Saha & Bakım: Parça teslimatları ve iş güvenliği adımları sabah çalışma saatlerinize çapalandı.');
  } else if (currentDomain === 'HUKUK' || currentDomain === 'ADALET_GUVENLIK') {
    personalTips.push('⚖️ Yasal Takvim: Duruşma hazırlıkları ve tebligat itiraz süreleri adliye mesai saatlerinize göre indekslendi.');
  } else {
    personalTips.push(`✨ Günlük Akış: En üretken saatleriniz genellikle saat ${earliestWorkHour}:00 civarı olarak belirlendi.`);
  }

  if (topKeywords.length > 0) {
    personalTips.push(`🎯 Sık Odaklandığınız Temalar: "${topKeywords.map(k => k.word).join(', ')}" konularında hatırlatmalarınız yoğunlaşıyor.`);
  }

  // 5. Kişiye Özel Yaşam Ritmini Güncelle
  const formatTime = (h: number, m: number = 0) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  const customRhythm: UserRhythmConfig = {
    workStart: formatTime(earliestWorkHour, 0),
    workEnd: formatTime(latestWorkHour, 0),
    weekendWake: '10:00',
    eveningHome: formatTime(Math.min(21, latestWorkHour + 1), 30),
    nightRest: '23:30',
  };

  const updatedProfile: UserCognitiveProfile = {
    detectedDomain: currentDomain,
    rhythm: customRhythm,
    activeHoursDetected: { startHour: earliestWorkHour, endHour: latestWorkHour },
    topKeywords,
    frequentActions,
    totalNotesAnalyzed: cards.length,
    personalTips,
    lastUpdated: new Date().toISOString()
  };

  saveUserCognitiveProfile(updatedProfile);
  return updatedProfile;
}

export function loadUserCognitiveProfile(): UserCognitiveProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Bilişsel profil okunamadı:', e);
  }
  return DEFAULT_COGNITIVE_PROFILE;
}

export function saveUserCognitiveProfile(profile: UserCognitiveProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Bilişsel profil kaydedilemedi:', e);
  }
}
