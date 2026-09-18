// src/utils/administrativeShield.ts

/**
 * Alışveriş ve Fermantasyon motoruna eklenen 'Kesin Yasaklı / İdari' kelime kalkanı.
 * İdari, bürokratik, okul/kurum ve resmi işlemlerin alışveriş ya da fermantasyon ile
 * yanlışlıkla eşleşmesini önler.
 */
export const ADMINISTRATIVE_SHIELD = [
  'onay',
  'olur',
  'yazı',
  'yazi',
  'dys',
  'mebbis',
  'e-okul',
  'eokul',
  'destek eğitim',
  'destek egitim',
  'bep',
  'ram',
  'nöbet',
  'nobet',
  'puantaj',
  'ek ders',
  'şök',
  'sok',
  'zümre',
  'zumre',
  'tutanak',
  'müfettiş',
  'mufettis',
  'soruşturma',
  'sorusturma',
  'veli',
  'disiplin',
  'öddk',
  'oddk',
  'karne',
  'devamsızlık',
  'devamsizlik',
  'sosyal etkinlik',
  'kulüp',
  'kulup',
  'yazılacak',
  'yazilacak',
  'gönderilecek',
  'gonderilecek',
  'imzalanacak',
  'desimal kodu',
  'desimal',
  'üst yazı',
  'ust yazi',
  'kaymakamlık oluru',
  'kaymakamlik oluru',
  'ilçe mem',
  'il mem',
  'kbs',
  'öğretmenler kurulu',
  'ogretmenler kurulu',
  'okul idaresi',
  'okul müdür'
];

/**
 * Verilen metnin idari/resmi/bürokratik bir bağlam içerip içermediğini denetler.
 */
export function isAdministrativeContext(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  const lower = text.toLowerCase();
  return ADMINISTRATIVE_SHIELD.some(keyword => lower.includes(keyword));
}
