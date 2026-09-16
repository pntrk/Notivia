// Not kartları için şık, yüksek kontrastlı ve göz yormayan pastel/soft renk paleti
export const SEMANTIC_PALETTE = {
  resmi_burokrasi: '#E0F2FE', // Resmi / Kurumsal / Bürokrasi (🏛️/🛂/🪪/📋)
  sosyal_iletisim: '#DCFCE7', // Sosyal / İletişim / Tören (🤝/💍/💐)
  teknik_bakim: '#FEF3C7',    // Teknik / Bakım / Muayene (🔧/🚗/⚙️)
  finansal_borc: '#FEE2E2',   // Acil / Finansal Ödeme / Borç (💳/💸/🚨)
  saglik_alacak: '#F3E8FF',   // Sağlık / Kişisel Yaşam / Alacak (💊/🩺/💰)
};

export const NOTE_COLOR_PALETTE = [
  '#E0F2FE', // Resmi / Bürokrasi
  '#DCFCE7', // Sosyal / İletişim
  '#FEF3C7', // Teknik / Bakım
  '#FEE2E2', // Finansal / Ödeme
  '#F3E8FF', // Sağlık / Yaşam
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
