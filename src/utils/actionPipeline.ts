/**
 * Ön Koşul ve Zincirleme Görev Motoru (Sequential Action Pipelines & Dependency Graph)
 * Bir görevin veya alt maddenin tamamlanması halinde bir sonraki eylemi otomatik tetikler.
 */

import type { NotiviaSimpleNote, ActionItem } from '../types/notivia.ts';

export interface PipelineTriggerResult {
  hasFollowUp: boolean;
  followUpNote?: NotiviaSimpleNote;
  whisperText?: string;
  autoAddedItems?: string[];
}

export interface PipelineRule {
  id: string;
  triggerKeywords: string[];
  delayDays?: number;
  delayHours?: number;
  generateFollowUp: (completedCardTitle: string, baseDate?: Date) => {
    baslik: string;
    zaman: string;
    tarih_iso?: string;
    action_items: ActionItem[];
    ikon: string;
    renk: string;
    anomali_notu?: string;
    sesli_fisilti: string;
  };
}

export const PIPELINE_RULES: PipelineRule[] = [
  // 1. Tahlil -> Sonuç Kontrolü
  {
    id: 'kan_tahlili_pipeline',
    triggerKeywords: ['kan tahlili', 'tahlil verdim', 'kan verdim', 'kan testi', 'laboratuvar numune'],
    delayHours: 24,
    generateFollowUp: (title, baseDate = new Date()) => {
      const targetDate = new Date(baseDate.getTime() + 24 * 60 * 60 * 1000);
      targetDate.setHours(14, 0, 0, 0); // Ertesi gün 14:00
      const iso = targetDate.toISOString();
      return {
        baslik: 'e-Nabız Tahlil Sonuçları Kontrolü',
        zaman: 'Yarın 14:00',
        tarih_iso: iso,
        action_items: [
          { task: 'e-Nabız sistemine giriş ve tahlil sonuçlarının kontrolü', is_completed: false },
          { task: 'Referans dışı değerler varsa hekimden kontrol randevusu oluşturma', is_completed: false },
        ],
        ikon: '🧪',
        renk: '#E0F2FE',
        anomali_notu: 'Kritik parametrelerde (hemogram, biyokimya) sapma varsa hekim teyidi şarttır.',
        sesli_fisilti: 'Tahlil tamamlandı; yarın 14:00 için e-Nabız sonuç kontrolü ajandaya eklendi.',
      };
    },
  },

  // 2. Sözleşme / İhale -> Harç ve Ruhsat Süreci
  {
    id: 'sozlesme_ruhsat_pipeline',
    triggerKeywords: ['sözleşme imzalandı', 'sozlesme imzalandi', 'ihaleyi aldık', 'ihale kesinleşti', 'müteahhit sözleşmesi'],
    delayDays: 3,
    generateFollowUp: (title, baseDate = new Date()) => {
      const targetDate = new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000);
      targetDate.setHours(10, 0, 0, 0);
      return {
        baslik: 'Ruhsat ve Damga Vergisi Harcı',
        zaman: '3 Gün Sonra (10:00)',
        tarih_iso: targetDate.toISOString(),
        action_items: [
          { task: 'Vergi dairesine damga vergisi beyanı ve makbuzu alma', is_completed: false },
          { task: 'İlgili belediye veya idareye ruhsat dosyasının teslimi', is_completed: false },
        ],
        ikon: '📑',
        renk: '#FEF9C3',
        anomali_notu: 'Yasal damga vergisi 15 gün içinde yatırılmazsa gecikme zammı tahakkuk eder.',
        sesli_fisilti: 'Sözleşme tamamlandı. 3 gün sonrası için harç ve ruhsat takibi kuruldu.',
      };
    },
  },

  // 3. Sınav Yapıldı -> e-Okul Not Girişi (MEB 10 Günlük Yasal Süre)
  {
    id: 'sinav_yapildi_pipeline',
    triggerKeywords: ['sınavı yaptık', 'sinav bitti', 'yazılı tamamlandı', 'ortak sınav bitti', 'sınav yapıldı'],
    delayDays: 10,
    generateFollowUp: (title, baseDate = new Date()) => {
      const targetDate = new Date(baseDate.getTime() + 10 * 24 * 60 * 60 * 1000);
      targetDate.setHours(17, 0, 0, 0);
      return {
        baslik: 'e-Okul Sınav Notu Giriş Kapanışı',
        zaman: '10 Gün Sonra (Son Gün)',
        tarih_iso: targetDate.toISOString(),
        action_items: [
          { task: 'Yazılı kağıtlarının cevap anahtarına göre okunması', is_completed: false },
          { task: 'Kazanım analiz ölçeğinin doldurulması', is_completed: false },
          { task: 'e-Okul sistemine notların kaydedilmesi ve kilitlenmesi', is_completed: false },
          { task: 'Sınav evraklarının zümre başkanına tutanakla teslimi', is_completed: false },
        ],
        ikon: '📚',
        renk: '#FEF08A',
        anomali_notu: 'MEB Ortaöğretim/İlköğretim Yönetmeliği gereği sınavlar 10 gün içinde e-Okul sistemine girilmelidir.',
        sesli_fisilti: 'Sınav kaydedildi. 10 günlük yasal e-Okul not giriş süreci başlatıldı.',
      };
    },
  },

  // 4. Diş / Cerrahi Müdahale -> Dikiş Alma & Kontrol
  {
    id: 'cerrahi_dikis_pipeline',
    triggerKeywords: ['diş çekildi', 'implant yapıldı', 'dikiş atıldı', 'ameliyat oldum', 'cerrahi operasyon'],
    delayDays: 7,
    generateFollowUp: (title, baseDate = new Date()) => {
      const targetDate = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      targetDate.setHours(11, 0, 0, 0);
      return {
        baslik: 'Cerrahi Dikiş Alma & İyileşme Kontrolü',
        zaman: '7 Gün Sonra (11:00)',
        tarih_iso: targetDate.toISOString(),
        action_items: [
          { task: 'Klinik hekiminden dikiş alma randevusunu teyit et', is_completed: false },
          { task: 'Yara yeri enfeksiyon ve doku kaynaması kontrolü', is_completed: false },
        ],
        ikon: '🦷',
        renk: '#EDE9FE',
        anomali_notu: 'Dikişlerin 7-10 günden fazla kalması doku inflamasyonu riskini artırır.',
        sesli_fisilti: 'Geçmiş olsun. 7 gün sonrasına dikiş kontrol randevusu planlandı.',
      };
    },
  },

  // 5. Araç Muayenesi Yapıldı -> 2 Yıllık Gelecek Döngü
  {
    id: 'arac_muayene_tamam_pipeline',
    triggerKeywords: ['muayeneden geçti', 'araç muayenesi bitti', 'tüvtürk tamam', 'muayene yapıldı'],
    delayDays: 730, // 2 yıl
    generateFollowUp: (title, baseDate = new Date()) => {
      const targetDate = new Date(baseDate.getTime() + 730 * 24 * 60 * 60 * 1000);
      return {
        baslik: 'Gelecek Araç Muayene Randevusu (TÜVTÜRK)',
        zaman: '2 Yıl Sonra',
        tarih_iso: targetDate.toISOString(),
        action_items: [
          { task: 'TÜVTÜRK randevu sisteminden gün seçimi', is_completed: false },
          { task: 'Egzoz emisyon pulu ve borç sorgulama kontrolü', is_completed: false },
        ],
        ikon: '🚗',
        renk: '#FEF3C7',
        anomali_notu: 'Muayene süresi geçerse her ay için %5 gecikme cezası uygulanır.',
        sesli_fisilti: 'Muayene kaydedildi; 2 yıl sonraki periyodik vize takvime işlendi.',
      };
    },
  },

  // 6. Antibiyotik Başlandı -> Bitiş & Bağırsak Florası Takibi
  {
    id: 'antibiyotik_flora_pipeline',
    triggerKeywords: ['antibiyotiğe başladım', 'antibiyotik aldım', 'kutu antibiyotik'],
    delayDays: 7,
    generateFollowUp: (title, baseDate = new Date()) => {
      const targetDate = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      targetDate.setHours(20, 0, 0, 0);
      return {
        baslik: 'Antibiyotik Bitişi & Probiyotik Desteği',
        zaman: '7 Gün Sonra (20:00)',
        tarih_iso: targetDate.toISOString(),
        action_items: [
          { task: 'Doktor tavsiyesiyle kutunun eksiksiz bittiğini doğrula', is_completed: false },
          { task: 'Bağırsak florası için probiyotik/kefir tüketimi planla', is_completed: false },
        ],
        ikon: '💊',
        renk: '#F3E8FF',
        anomali_notu: 'Antibiyotik erken bırakılırsa bakteriyel direnç gelişir; mutlaka tam kür tamamlanmalıdır.',
        sesli_fisilti: 'İlaç kürü kaydedildi. 7 gün sonrası için bitiş ve probiyotik adımı oluşturuldu.',
      };
    },
  },
];

/**
 * Kart tamamlandığında veya işlem gerçekleştiğinde zincirleme bir sonraki eylemi tespit eder.
 */
export function evaluatePipelineTrigger(
  completedText: string,
  baseDate: Date = new Date()
): PipelineTriggerResult {
  const lower = completedText.toLowerCase();

  for (const rule of PIPELINE_RULES) {
    const isMatched = rule.triggerKeywords.some((kw) => lower.includes(kw));
    if (isMatched) {
      const followUp = rule.generateFollowUp(completedText, baseDate);
      return {
        hasFollowUp: true,
        followUpNote: followUp,
        whisperText: followUp.sesli_fisilti,
      };
    }
  }

  return { hasFollowUp: false };
}
