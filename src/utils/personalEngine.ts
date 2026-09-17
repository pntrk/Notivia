import { findFermentationRecipe, type FermentationRecipe } from './fermentationScheduler.ts';
import { scheduleFermentationAlarms } from '../services/localNotificationService.ts';

export interface LocalFastParseResult {
  id: string;
  type: 'cycle' | 'task' | 'reminder' | 'event' | 'note';
  baslik: string;
  detay: string;
  zaman_etiketi: string;
  tarih_iso: string;
  items: string[];
  ikon: string;
  renk: string;
  sesli_geribildirim: string;
}

export class PersonalEngine {
  /**
   * Hızlı yerel kural ve regex tabanlı çözümleyici.
   */
  public tryLocalFastParse(text: string, now: Date = new Date()): LocalFastParseResult | null {
    if (!text || typeof text !== 'string') return null;

    const recipe = findFermentationRecipe(text);
    if (recipe) {
      const startDate = new Date(now);
      const primaryPhase = recipe.asamalar[0];
      const targetDate = new Date(startDate.getTime() + primaryPhase.gun * 24 * 60 * 60 * 1000);

      // Checklist maddelerini oluştur
      const items: string[] = [];

      // 1. Ara sıcaklık kontrollerini checklist'e ekle
      if (recipe.araKontrol) {
        const { herXGundeBir, bitisGunu } = recipe.araKontrol;
        for (let g = herXGundeBir; g < bitisGunu; g += herXGundeBir) {
          items.push(`${g}. Gün: Sıcaklık & Hava Kilidi Kontrolü (18-22°C)`);
        }
      }

      // 2. Ana aşamaları checklist'e ekle
      recipe.asamalar.forEach(a => {
        items.push(`${a.gun}. Gün: ${a.baslik}`);
      });

      const noteId = `ferm_${Date.now()}`;

      // Arka plan bildirimlerini (ara kontroller dahil) planla
      scheduleFermentationAlarms({
        noteId,
        urunAdi: recipe.urun,
        ikon: recipe.ikon,
        startDate,
        araKontrol: recipe.araKontrol,
        asamalar: recipe.asamalar
      });

      const zamanEtiketi = recipe.araKontrol
        ? `${primaryPhase.gun} Gün Kova (${recipe.araKontrol.herXGundeBir} Günde Bir Sıcaklık Kontrolü)`
        : `${primaryPhase.gun} Gün Sonra (${primaryPhase.baslik})`;

      const sesliGeribildirim = recipe.araKontrol
        ? `${recipe.urun} kurulumu kaydedildi. ${recipe.araKontrol.herXGundeBir} günde bir kova sıcaklık kontrolleri ve ${primaryPhase.gun}. güne ${primaryPhase.baslik} alarmı kuruldu.`
        : `${recipe.urun} kurulumu kaydedildi. ${primaryPhase.gun} gün sonraya ${primaryPhase.baslik} hatırlatıcısı kuruldu.`;

      return {
        id: noteId,
        type: 'cycle',
        baslik: `${recipe.urun} Kurulumu`,
        detay: recipe.ipuclari,
        zaman_etiketi: zamanEtiketi,
        tarih_iso: targetDate.toISOString(),
        items,
        ikon: recipe.ikon,
        renk: recipe.renk,
        sesli_geribildirim: sesliGeribildirim
      };
    }

    return null;
  }
}

export const personalEngine = new PersonalEngine();
