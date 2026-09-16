import { ProfessionDomain } from './domainThemes.ts';
export type { ProfessionDomain };
export * from './domainThemes.ts';

export const DOMAIN_KEYWORDS: Record<ProfessionDomain, RegExp> = {
  HUKUK: /(uyap|duruşma|istinaf|tebligat|müvekkil|hâkim|hakim|savcı|icra|haciz|ihtarname|mahkeme)/i,
  SAGLIK: /(hasta|pansuman|serum|epikriz|konsültasyon|enjeksiyon|tansiyon|dekübitus|sbar|ilaç|damaryolu)/i,
  TEKNIK: /(arıza|şalter|loto|voltaj|manometre|parça|salıncak|tork|fren|amortisör|klima|vrf|motor)/i,
  LOJISTIK: /(takograf|dorse|sevk|irsaliye|rampa|kantar|şoför|yükleme|tır|kamyon|mola)/i,
  EMNIYET: /(gözaltı|şüpheli|nezarethane|fezleke|tutanak|asayiş|devriye|adli rapor|arama kararı)/i,
  HAVACILIK: /(uçuş|kokpit|ofp|metar|notam|dispatch|fdp|walkaround|fms|brifing)/i,
  MUTFAK: /(mise en place|servis|haccp|benmari|soğuk oda|stok|şef|garnitür|tadım)/i,
  EGITIM: /(okul|öğretmen|ogretmen|müdür|mudur|kbs|ek ders|dys|devamsızlık|devamsizlik|taşımalı|tasimali|zümre|zumre|e-okul|eokul|öğrenci|ogrenci|tatbikat|disiplin|veli)/i,
  KURUMSAL: /(sekreter|yönetici|yonetici|insan kaynakları|insan kaynaklari|ik\b|sgk|işe giriş|ise giris|işten çıkış|isten cikis|deneme süresi|deneme suresi|brifing|vip|karşılama|karsilama|check-in|checkin)/i,
  GUZELLIK: /(kuaför|kuafor|berber|oryal|saç açma|sac acma|röfle|rofle|boya|keratin|fön|fon|sterilizasyon|sarf stok)/i,
  GENEL: /.*/
};

export function detectDomainFromText(text: string): ProfessionDomain {
  if (!text || text.trim().length === 0) return 'GENEL';

  for (const [domain, regex] of Object.entries(DOMAIN_KEYWORDS)) {
    if (domain !== 'GENEL' && regex.test(text)) {
      return domain as ProfessionDomain;
    }
  }
  return 'GENEL';
}
