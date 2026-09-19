import { ProfessionDomain } from './domainThemes.ts';
import { detectDomainFromJargon } from '../utils/jargonRadar.ts';
export type { ProfessionDomain };
export * from './domainThemes.ts';

export const DOMAIN_KEYWORDS: Record<ProfessionDomain, RegExp> = {
  SADE: /(?!.*)/, // Sade modda otomatik yakalama yapmaz
  OGRENCI: /(vize|final|bütünleme|büt|ödev teslim|lab raporu|kyk|burs|ders kaydı|üniversite|obs|kampüs|turnitin|intihal|gano)/i,
  CALISMIYORUM: /(taahhüt|abonelik|gss|işkur|su arıtma|kombi bakımı|derin dondurucu|ecza dolabı|kira|aidat|iş başvurusu|mülakat|cv güncelle|özgeçmiş|emekli|günlük rutin)/i,
  HUKUK: /(uyap|duruşma|istinaf|tebligat|müvekkil|hâkim|hakim|savcı|icra|haciz|ihtarname|mahkeme|89\/1|89\/2|haciz ihbarnamesi|arabuluculuk|arabulucu|cmk 100|cmk 101|kyok|takipsizlik|segbis|istintak|kıymet takdiri)/i,
  FINANS: /(kdv|muhsgk|beyanname|sgk prim|e-defter|berat|mali müşavir|smmm|muhasebe|fatura mutabakat|finans|tevkifat|vuk 33|enflasyon düzeltmesi|gekap|ba-bs)/i,
  MALIYE: /(smmm|kdv|muhsgk|muhtasar|geçici vergi|e-defter|edefter|berat|sgk|mizan|stopaj|vergi dairesi|luca|zirve|tevkifat|vuk 33|enflasyon düzeltmesi|tarhiyat|uzlaşma)/i,
  SAGLIK: /(hasta|pansuman|serum|epikriz|konsültasyon|enjeksiyon|tansiyon|dekübitus|sbar|ilaç|damaryolu|doktor|hemşire|eczane|diş|aydınlatılmış onam|transfüzyon|cross-match|renkli reçete|majistral)/i,
  EGITIM: /(okul|öğretmen|ogretmen|müdür|mudur|kbs|ek ders|dys|devamsızlık|devamsizlik|taşımalı|tasimali|zümre|zumre|e-okul|eokul|tatbikat|disiplin|veli|bep|tefbis|ram yönlendirme)/i,
  TEKNIK: /(arıza|şalter|loto|voltaj|manometre|parça|salıncak|tork|fren|amortisör|klima|vrf|motor|beton|deploy|mühendis|spt|zemin etüdü|kaçak akım|meger)/i,
  MUHENDISLIK: /(beton dökümü|kırım testi|küp numune|loto|kompanzasyon|trafo|pano|hidrostatik test|prod deploy|staging|hotfix|semver|pull request|db migration|geoteknik|spt|kaçak akım|30ma|300ma|meger|ataşman|hakediş|owasp)/i,
  SAVUNMA: /(gözaltı|şüpheli|nezarethane|fezleke|tutanak|asayiş|devriye|adli rapor|arama kararı|içtima|scba|polis|asker|emniyet|itfaiye)/i,
  LOJISTIK: /(takograf|dorse|sevk|irsaliye|rampa|kantar|şoför|yükleme|tır|kamyon|mola|lojistik|cmr|aetr)/i,
  TICARET: /(satış teklif|teklif sıcak takip|kasa avans|z raporu|pos gün sonu|veresiye|toptancı sipariş|esnaf|kasiyer)/i,
  GASTRONOMI: /(mise en place|servis|haccp|benmari|soğuk oda|stok|şef|garnitür|tadım|aşçı|mutfak)/i,
  KUAFOR: /(kuaför|kuafor|berber|oryal|saç açma|sac acma|röfle|rofle|boya|keratin|fön|fon|sterilizasyon|sarf stok)/i,
  HAVACILIK: /(uçuş|kokpit|ofp|metar|notam|dispatch|fdp|walkaround|fms|brifing|pilot)/i,
  KAMU: /(sekreter|yönetici|yonetici|insan kaynakları|insan kaynaklari|ik\b|işe giriş|ise giris|işten çıkış|isten cikis|deneme süresi|deneme suresi|brifing|vip|karşılama|karsilama|ebys|cimer|memur|kamu|doğrudan temin|22\/d)/i,
  ZIRAAT: /(sulama serinliği|çiçek suvar|orkide daldırma|hobi bahçe|budama|peyzaj|botanik|ziraat|tarsim|çks|zirai don)/i,
  VETERINER: /(petvet|mikroçip|kuduz titrasyon|iç parazit|dış parazit|karma aşı|kısırlaştırma|veteriner|post-op|kedi|köpek|hayvan sağlığı)/i,
  EMLAK: /(taşınmaz ticareti|web-tapu|webtapu|dask|ipotek fek|rayiç bedel|tapu harcı|cayma akçesi|emlak|gayrimenkul|tahliye taahhüt)/i,
  DENIZCILIK: /(psc denetim|port state control|ism kodu|draft survey|sintine|balast|oow|seyir vardiyası|kaptan|gemi|denizcilik)/i,
  GUMRUK: /(atr dolaşım|menşe şahadetnamesi|antrepo|supalan|kırmızı hat|sarı hat|konşimento|bill of lading|ordino|gümrük müşavir)/i,
  GENEL: /(taahhüt|abonelik|gss|işkur|su arıtma|kombi bakımı|derin dondurucu|ecza dolabı|kira|aidat|iş başvurusu|mülakat|cv güncelle|özgeçmiş|emekli|günlük rutin|fatura)/i
};

export function detectDomainFromText(text: string, fallback: ProfessionDomain = 'GENEL'): ProfessionDomain {
  if (fallback === 'SADE') return 'SADE';
  if (!text || text.trim().length === 0) return fallback;

  // 1. Öncelikli 0ms Jargon Radar kontrolü (exclusive + supporting puanlama)
  const radar = detectDomainFromJargon(text, fallback);
  if (radar.confidence >= 0.4 && radar.detectedDomain !== 'GENEL') {
    return radar.detectedDomain === 'CALISMIYORUM' ? 'GENEL' : radar.detectedDomain;
  }

  // 2. Yedek regex taraması
  for (const [domain, regex] of Object.entries(DOMAIN_KEYWORDS)) {
    if (domain !== 'GENEL' && regex.test(text)) {
      const res = domain as ProfessionDomain;
      return res === 'CALISMIYORUM' ? 'GENEL' : res;
    }
  }

  const detected = radar.detectedDomain || fallback;
  return detected === 'CALISMIYORUM' ? 'GENEL' : detected;
}
