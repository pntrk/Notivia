import { ProfessionDomain } from './domainThemes.ts';
export type { ProfessionDomain };
export * from './domainThemes.ts';

export const DOMAIN_KEYWORDS: Record<ProfessionDomain, RegExp> = {
  OGRENCI: /(vize|final|bütünleme|büt|ödev teslim|lab raporu|kyk|burs|ders kaydı|üniversite|obs|kampüs|turnitin|intihal|gano)/i,
  CALISMIYORUM: /(taahhüt|abonelik|gss|işkur|su arıtma|kombi bakımı|derin dondurucu|ecza dolabı|kira|aidat|iş başvurusu|mülakat|cv güncelle|özgeçmiş|emekli|günlük rutin)/i,
  HUKUK: /(uyap|duruşma|istinaf|tebligat|müvekkil|hâkim|hakim|savcı|icra|haciz|ihtarname|mahkeme)/i,
  FINANS: /(kdv|muhsgk|beyanname|sgk prim|e-defter|berat|mali müşavir|smmm|muhasebe|fatura mutabakat|finans)/i,
  SAGLIK: /(hasta|pansuman|serum|epikriz|konsültasyon|enjeksiyon|tansiyon|dekübitus|sbar|ilaç|damaryolu|doktor|hemşire|eczane|diş)/i,
  EGITIM: /(okul|öğretmen|ogretmen|müdür|mudur|kbs|ek ders|dys|devamsızlık|devamsizlik|taşımalı|tasimali|zümre|zumre|e-okul|eokul|tatbikat|disiplin|veli)/i,
  TEKNIK: /(arıza|şalter|loto|voltaj|manometre|parça|salıncak|tork|fren|amortisör|klima|vrf|motor|beton|deploy|mühendis)/i,
  SAVUNMA: /(gözaltı|şüpheli|nezarethane|fezleke|tutanak|asayiş|devriye|adli rapor|arama kararı|içtima|scba|polis|asker|emniyet|itfaiye)/i,
  LOJISTIK: /(takograf|dorse|sevk|irsaliye|rampa|kantar|şoför|yükleme|tır|kamyon|mola|lojistik)/i,
  TICARET: /(satış teklif|teklif sıcak takip|kasa avans|z raporu|pos gün sonu|veresiye|toptancı sipariş|esnaf|kasiyer)/i,
  GASTRONOMI: /(mise en place|servis|haccp|benmari|soğuk oda|stok|şef|garnitür|tadım|aşçı|mutfak)/i,
  KUAFOR: /(kuaför|kuafor|berber|oryal|saç açma|sac acma|röfle|rofle|boya|keratin|fön|fon|sterilizasyon|sarf stok)/i,
  HAVACILIK: /(uçuş|kokpit|ofp|metar|notam|dispatch|fdp|walkaround|fms|brifing|pilot)/i,
  KAMU: /(sekreter|yönetici|yonetici|insan kaynakları|insan kaynaklari|ik\b|işe giriş|ise giris|işten çıkış|isten cikis|deneme süresi|deneme suresi|brifing|vip|karşılama|karsilama|ebys|cimer|memur|kamu)/i,
  ZIRAAT: /(sulama serinliği|çiçek suvar|orkide daldırma|hobi bahçe|budama|peyzaj|botanik|ziraat)/i,
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
