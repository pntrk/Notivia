// Not kartları için şık, yüksek kontrastlı ve göz yormayan pastel/soft renk paleti
export const NOTE_COLOR_PALETTE = [
  '#FEF3C7', // Amber / Sıcak Sarı
  '#E0F2FE', // Açık Gökyüzü Mavisi
  '#DCFCE7', // Taze Nane Yeşili
  '#FCE7F3', // Gül / Pembe
  '#F3E8FF', // Lavanta Moru
  '#FFEDD5', // Şeftali / Turuncu
  '#CCFBF1', // Turkuaz / Camgöbeği
  '#F1F5F9', // Buzul Grisi
  '#EDE9FE', // Eflatun
  '#FEF9C3', // Limon Sarısı
];

/**
 * Başlık, id veya kategoriye göre deterministik ve dengeli renk seçer.
 * Eğer daha önce atanmış bir renk varsa ve geçerliyse onu korur.
 */
export function getCardColor(seed?: string, existingColor?: string | null): string {
  if (existingColor && existingColor.startsWith('#') && existingColor !== '#F5F5F4') {
    return existingColor;
  }
  if (!seed) {
    return NOTE_COLOR_PALETTE[Math.floor(Math.random() * NOTE_COLOR_PALETTE.length)];
  }
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % NOTE_COLOR_PALETTE.length;
  return NOTE_COLOR_PALETTE[index];
}
