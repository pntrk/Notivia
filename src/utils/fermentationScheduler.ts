import type { NotiviaSimpleNote } from '../types/notivia.ts';
import {
  type FermentationPhase,
  type FermentationRecipe,
  FERMENTATION_REGISTRY
} from '../types/fermentation.ts';
import { detectFlexibleDomain } from './flexibleMatcher.ts';

export * from '../types/fermentation.ts';
export * from './flexibleMatcher.ts';

/**
 * Kullanıcı girdisini Fermantasyon / Ev Yapımı Ürün Reçeteleri ile eşleştirir.
 * DİKKAT: "Bira kiti sipariş ver", "turşuluk al", "sirke satın al" gibi ifadeler fermantasyon değil 'Alışveriş'tir.
 */
export function findFermentationRecipe(input: string): FermentationRecipe | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  // Alışveriş / Satın alma / Sipariş filtreleme kuralı
  const isShoppingOrOrdering = /(?:sipariş\s*ver|siparis\s*ver|satın\s*al|satin\s*al|\bal\b|\balınacak\b|\balinacak\b|\blisteye\s*ekle\b|almayı\s*unutma)/i.test(lower);
  const hasSetupOrFermentAction = /(?:kuruldu|kurduk|kurdum|kurulum|mayaladım|mayaladik|bastım|bastik|doldurdum|serptim|kilitledim|çizdim|cizdim|kırdım|kirdim|kovaya aldım|kapağı kapattım|kapagi kapattim)/i.test(lower);

  // Eğer alışveriş ifadesi varsa ve açık bir kurulum/mayalama eylemi yoksa fermantasyon motoruna sokma
  if (isShoppingOrOrdering && !hasSetupOrFermentAction) {
    return null;
  }

  // 1. Regex tabanlı birebir kural kontrolü
  for (const recipe of FERMENTATION_REGISTRY) {
    if (recipe.keywords.test(trimmed)) {
      return recipe;
    }
  }

  // 2. Esnek konsept & niyet eşleyici (flexibleMatcher)
  const flexibleDomainId = detectFlexibleDomain(trimmed);
  if (flexibleDomainId) {
    if (flexibleDomainId === 'beer') {
      return FERMENTATION_REGISTRY.find(r => r.urun === 'Ev Yapımı Bira') || null;
    }
    if (flexibleDomainId === 'pickle') {
      return FERMENTATION_REGISTRY.find(r => r.urun === 'Ev Turşusu') || null;
    }
    if (flexibleDomainId === 'vinegar') {
      return FERMENTATION_REGISTRY.find(r => r.urun === 'Ev Yapımı Doğal Sirke') || null;
    }
  }

  return null;
}

/**
 * Eşleşen fermantasyon tarifini çok aşamalı, bilişsel zaman ve eylem kartına dönüştürür.
 */
export function buildFermentationCard(
  recipe: FermentationRecipe,
  baseDate: Date = new Date()
): NotiviaSimpleNote {
  const sortedPhases = [...recipe.asamalar].sort((a, b) => a.gun - b.gun);
  const maxDays = sortedPhases.length > 0 ? sortedPhases[sortedPhases.length - 1].gun : 14;
  const firstPhase = sortedPhases.length > 0 ? sortedPhases[0] : null;

  const targetDate = new Date(baseDate.getTime() + maxDays * 24 * 60 * 60 * 1000);
  targetDate.setHours(12, 0, 0, 0);

  const firstDate = firstPhase
    ? new Date(baseDate.getTime() + firstPhase.gun * 24 * 60 * 60 * 1000)
    : null;
  if (firstDate) firstDate.setHours(12, 0, 0, 0);

  const formatter = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long' });
  const finalDateFormatted = formatter.format(targetDate);
  const firstDateFormatted = firstDate ? formatter.format(firstDate) : null;

  const actionItems = sortedPhases.map((phase) => {
    const phaseDate = new Date(baseDate.getTime() + phase.gun * 24 * 60 * 60 * 1000);
    const dateStr = formatter.format(phaseDate);
    return {
      task: `${phase.gun}. Gün (${dateStr}) - ${phase.baslik}: ${phase.aksiyon}`,
      is_completed: false,
    };
  });

  const hazirlikZamani = firstPhase && sortedPhases.length > 1
    ? `İlk Aşama: ${firstPhase.gun}. Gün (${firstDateFormatted})`
    : `Kurulumdan ${maxDays} Gün Sonra`;

  const hazirlikIso = firstDate ? firstDate.toISOString() : null;

  const sesliFisilti = `${recipe.urun} fermantasyon süreci başlatıldı. ${sortedPhases.length} aşamalı takvim ve püf noktaları hazırlandı.`;

  const anomaliNotu = recipe.araKontrol
    ? `${recipe.ipuclari} • ⏱️ Ara Kontrol (Her ${recipe.araKontrol.herXGundeBir} günde bir): ${recipe.araKontrol.mesaj}`
    : recipe.ipuclari;

  return {
    baslik: `${recipe.urun} (Fermantasyon)`,
    zaman: `${maxDays} Gün Sonra (${finalDateFormatted})`,
    tarih_iso: targetDate.toISOString(),
    hazirlik_zamani: hazirlikZamani,
    hazirlik_iso: hazirlikIso,
    eksik_bilgi: false,
    action_items: actionItems,
    anomali_notu: anomaliNotu,
    ikon: recipe.ikon,
    renk: recipe.renk,
    sesli_fisilti: sesliFisilti,
    tetikleyici: {
      tip: 'surekli',
      sart: 'fermantasyon_olgunlasma',
      aktif_mi: true,
      etiket: 'Fermantasyon Takvimi',
    }
  };
}
