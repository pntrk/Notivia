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
