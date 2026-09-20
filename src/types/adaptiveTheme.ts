import { ProfessionDomain } from './domainThemes.ts';
import { detectDomainFromJargon } from '../utils/jargonRadar.ts';
export type { ProfessionDomain };
export * from './domainThemes.ts';

export const DOMAIN_KEYWORDS: Record<ProfessionDomain, RegExp> = {
  SADE: /(?!.*)/, // Sade modda otomatik yakalama yapmaz
  OTOMATIK_JARGON: /(?!.*)/, // Otomatik Jargon modunda tüm sektörler jargon radarından taranır
  OGRENCI: /(vize|final|bütünleme|büt|ödev teslim|lab raporu|kyk|burs|ders kaydı|üniversite|obs|kampüs|turnitin|intihal|gano)/i,
  CALISMIYORUM: /(taahhüt|abonelik|gss|işkur|su arıtma|kombi bakımı|derin dondurucu|ecza dolabı|kira|aidat|iş başvurusu|mülakat|cv güncelle|özgeçmiş|emekli|günlük rutin)/i,
  HUKUK: /(uyap|duruşma|istinaf|tebligat|müvekkil|hâkim|hakim|savcı|icra|haciz|ihtarname|mahkeme|89\/1|89\/2|haciz ihbarnamesi|arabuluculuk|arabulucu|cmk 100|cmk 101|kyok|takipsizlik|segbis|istintak|kıymet takdiri)/i,
  FINANS: /(kdv|muhsgk|beyanname|sgk prim|e-defter|berat|mali müşavir|smmm|muhasebe|fatura mutabakat|finans|tevkifat|vuk 33|enflasyon düzeltmesi|gekap|ba-bs)/i,
  MALIYE: /(smmm|kdv|muhsgk|muhtasar|geçici vergi|e-defter|edefter|berat|sgk|mizan|stopaj|vergi dairesi|luca|zirve|tevkifat|vuk 33|enflasyon düzeltmesi|tarhiyat|uzlaşma)/i,
  SAGLIK: /(hasta|pansuman|serum|epikriz|konsültasyon|enjeksiyon|tansiyon|dekübitus|sbar|ilaç|damaryolu|doktor|hemşire|eczane|diş|aydınlatılmış onam|transfüzyon|cross-match|renkli reçete|majistral)/i,
  EGITIM: /(okul|öğretmen|ogretmen|müdür|mudur|kbs|ek ders|dys|devamsızlık|devamsizlik|taşımalı|tasimali|zümre|zumre|e-okul|eokul|tatbikat|disiplin|veli|bep|tefbis|ram yönlendirme)/i,
  TEKNIK: /(arıza|şalter|loto|voltaj|manometre|parça|salıncak|tork|fren|amortisör|klima|vrf|motor|beton|deploy|mühendis|spt|zemin etüdü|kaçak akım|meger)/i,
  MUHENDISLIK: /(beton dökümü|kırım testi|küp numune|loto|kompanzasyon|trafo|pano|hidrostatik test|prod deploy|staging|hotfix|semver|pull request|db migration|geoteknik|spt|kaçak akım|30ma|300ma|meger|ataşman|hakediş|owasp)/i,
  SAVUNMA: /(gözaltı|gozalti|şüpheli|nezarethane|nezaret|fezleke|tutanak|asayiş|devriye|adli rapor|adli muayene|arama kararı|adli arama|suç eşyası|adli emanet|içtima|tekmil|silahlık|doldur-boşalt|doldur boşalt|mühimmat|poligon|atış hattı|scba|arazöz|yangın uygunluk|polis|asker|emniyet|itfaiye|jandarma|karakol|nöbetçi subayı|nöbetçi astsubayı|kompozit başlık|hücum yeleği|özel güvenlik|5188|x-ray|kapı dedektörü|üst arama|olay yeri inceleme|oyi|kriminal|çelik yelek|gbt sorgu|yol kontrol)/i,
  LOJISTIK: /(takograf|dorse|sevk|irsaliye|rampa|kantar|şoför|yükleme|tır|kamyon|mola|lojistik|cmr|aetr)/i,
  TICARET: /(satış teklif|teklif sıcak takip|kasa avans|z raporu|pos gün sonu|veresiye|deftere yaz|açık hesap|toptancı|mal kabul|irsaliye|çek ödemesi|senet|esnaf|kasiyer|dükkan|stok sayım|fiyat etiketi)/i,
  GASTRONOMI: /(mise en place|servis|haccp|benmari|soğuk oda|stok|şef|garnitür|tadım|aşçı|mutfak)/i,
  KUAFOR: /(kuaför|kuafor|berber|oryal|saç açma|sac acma|röfle|rofle|boya|keratin|fön|fon|sterilizasyon|sarf stok)/i,
  HAVACILIK: /(uçuş|kokpit|ofp|metar|notam|dispatch|fdp|walkaround|fms|brifing|pilot)/i,
  KAMU: /(sekreter|yönetici|yonetici|insan kaynakları|insan kaynaklari|ik\b|işe giriş|ise giris|işten çıkış|isten cikis|deneme süresi|deneme suresi|brifing|vip|karşılama|karsilama|ebys|cimer|memur|kamu|doğrudan temin|22\/d)/i,
  ZIRAAT: /(sulama serinliği|çiçek suvar|orkide daldırma|hobi bahçe|budama|peyzaj|botanik|ziraat|tarsim|çks|zirai don|damlama sulama|bordo bulamacı|aşı macunu|phi süresi|yaprak gübresi|taban gübresi|fertigasyon|kök mantarı|kök boğazı|çiçekler susamış|suvarıver|sulayuver|çiçek sula|sardunya|kaktüs sulama|sukulent|can suyu|fidan dikim|verticut|çim havalandırma)/i,
  VETERINER: /(petvet|mikroçip|kuduz titrasyon|iç parazit|dış parazit|karma aşı|kısırlaştırma|veteriner|post-op|kedi|köpek|hayvan sağlığı)/i,
  EMLAK: /(taşınmaz ticareti|web-tapu|webtapu|dask|ipotek fek|rayiç bedel|tapu harcı|cayma akçesi|emlak|gayrimenkul|tahliye taahhüt|yer gösterme|kat irtifakı|kat mülkiyeti|iskan|takyidat|güvenli tapu|taputakas|kira sözleşmesi|kira kontratı|kiracı tahliyesi|depozito mahsubu)/i,
  DENIZCILIK: /(psc denetim|port state control|ism kodu|draft survey|sintine|balast|oow|seyir vardiyası|kaptan|gemi|denizcilik)/i,
  GUMRUK: /(atr dolaşım|menşe şahadetnamesi|antrepo|supalan|kırmızı hat|sarı hat|konşimento|bill of lading|ordino|gümrük müşavir)/i,
  ECZACILIK: /(eczane|eczacı|medula|sut provizyon|kırmızı reçete|kirmizi recete|yeşil reçete|yesil recete|renkli reçete|rrs|majistral|its karekod|karekod sonlandırma|soğuk zincir|soguk zincir|aşı dolabı|asi dolabi|miadı dolan|ilaç imha|depo iade)/i,
  ISG: /(isg|iş sağlığı|is sagligi|iş güvenliği|is guvenligi|ibys|ramak kala|ramakkala|6331|onaylı defter|risk değerlendirmesi|risk analizi|kkd|periyodik muayene|sıcak iş|kapalı alan|kaza bildirimi|iş kazası|is kazasi|fine kinney|l matris)/i,
  SANAT_MEDYA: /(call\s*sheet|çekim\s*planı|cekim\s*plani|klaket|gaffer|dit|kamera\s*kaydı|kurgu|montaj|render|export|-23\s*lufs|ebu\s*r128|broadcast\s*master|color\s*grading|davinci|lut|vectorscope|soundcheck|teknik\s*rider|stage\s*plot|in-ear|rf\s*tarama|isrc|mesam|msg|müyap|split\s*sheet|raw\s*retouch|lightroom|colorchecker|gri\s*kart|vernisaj|küratör|kurator|fine\s*art|paspartu|basın\s*bülteni|basin\s*bulteni|ambargo|liveu|tvu|rundown|reji|tiyatro|dress\s*rehearsal|prömiyer|fsek|telif\s*sözleşmesi|podcast|sesli\s*kitap|acx|audible|dcp|film\s*festivali|filmfreeway|kdm|epk|senaryo|tretman|sinopsis|logline|chroma\s*key|greenbox|yeşil\s*perde|yesil\s*perde|vfx|tracking\s*marker|defile|backstage|podyum|lookbook|rtük|rtuk|akıllı\s*işaret|akilli\s*isaret)/i,

  // =========================================================================
  // MYK RESMÎ 27 SEKTÖR STANDARDI REGEX HARİTASI
  // =========================================================================
  ADALET_GUVENLIK: /(uyap|duruşma|istinaf|tebligat|müvekkil|hâkim|hakim|savcı|icra|haciz|ihtarname|mahkeme|89\/1|89\/2|haciz ihbarnamesi|arabuluculuk|arabulucu|cmk 100|cmk 101|kyok|takipsizlik|segbis|istintak|kıymet takdiri|gözaltı|gozalti|şüpheli|nezarethane|fezleke|asayiş|devriye|adli rapor|adli muayene|arama kararı|adli arama|suç eşyası|adli emanet|içtima|tekmil|silahlık|doldur-boşalt|mühimmat|poligon|atış hattı|scba|arazöz|yangın uygunluk|polis|asker|emniyet|itfaiye|jandarma|karakol|özel güvenlik|5188|x-ray|kapı dedektörü|üst arama|olay yeri inceleme|oyi|kriminal|çelik yelek|gbt sorgu|yol kontrol)/i,
  AGAC_KAGIT: /(ahşap|ebatlama|kesim planı|kenar bant|pvc bant|mdf|sunta|kontrplak|kereste|tomruk|ahşap nem|nem ölçer|rende|planya|freze|zıvana|marangoz|mobilya imalat|kağıt hamuru|selüloz|oluklu mukavva|fleksografik|masura|karton koli|bobin kağıt)/i,
  BILISIM: /(yazılım|software|frontend|backend|fullstack|devops|prod deploy|staging|hotfix|semver|pull request|pr review|git merge|db migration|api endpoint|graphql|rest api|docker|kubernetes|ci\/cd|cloud|aws|azure|gcp|siber güvenlik|penetrasyon|firewall|vpn|sql query|redis|postgresql|mongodb)/i,
  CAM_CIMENTO_TOPRAK: /(çimento|klinker|hazır beton|hazir beton|slump|seramik|porselen|karo|fayans|tuğla|tugla|kiremit|refrakter|cam fırını|tavlama|temperli cam|lamine cam|düzcam|cam işleme|basınç dayanımı|agregat|kum ocağı|harç)/i,
  CEVRE: /(çed|ced raporu|emisyon|atıksu|atiksu|arıtma tesisi|aritma tesisi|motat|tehlikeli atık|sıfır atık|sifir atik|geri dönüşüm|katı atık|baca gazı|koku ölçümü|koi|boi|çevre izin|çevre lisans|karbon ayak izi|sera gazı)/i,
  ELEKTRIK_ELEKTRONIK: /(elektrik pano|şalter|kontaktör|termik|röle|role|kaçak akım|30ma|300ma|meger|topraklama|kompanzasyon|kondansatör|plc|scada|inverter|invertör|trafo|yüksek gerilim|orta gerilim|alçak gerilim|loto|voltaj|amper|ohm|lehim|smd|osiloskop)/i,
  ENERJI: /(ges|res|hes|güneş enerjisi|ruzgar enerjisi|rüzgar türbini|fotovoltaik|gop|epiaş|dengelenme piyasası|trafo merkezi|şebeke dağıtım|enerji iletim|doğalgaz çevrim|kombine çevrim|biyogaz|jeotermal|megavat|mwh|reaktif ceza)/i,
  GIDA: /(gıda mühendisi|haccp|ccp|kritik kontrol|parti no|lot no|pastörizasyon|sterilizasyon|soğuk zincir|soguk zincir|gıda güvenliği|iso 22000|helal gıda|mikrobiyoloji|maya|küf|aflatoksin|raf ömrü|son tüketim|tett|stt|gıda analiz|ambalaj kontrol)/i,
  INSAAT: /(inşaat|şantiye|santiye|kalıpçı|demirci|donatı|beton dökümü|beton dokumu|7 gün kırım|28 gün kırım|küp numune|slump testi|metraj|hakediş|hakedis|yeşil defter|ataşman|iskele|statik proje|mimari proje|şantiye şefi|yapı denetim|zemin etüdü|spt|fore kazık|temel radye)/i,
  IS_YONETIM: /(insan kaynakları|ik bordro|sgk işe giriş|sgk işten çıkış|özlük dosyası|performans değerlendirme|iso 9001|kalite yönetim|döf|iç tetkik|yönetim kurulu|hazirun|karar defteri|pmp|proje yönetim|scrum master|sprint plan|okr|kpi|bütçe plan)/i,
  KIMYA_PETROL_PLASTIK: /(msds|gbf|güvenlik bilgi formu|rafineri|petrol|akaryakıt|petrokimya|plastik enjeksiyon|ekstrüzyon|ekstruder|polimer|polietilen|polipropilen|pvc hammade|masterbatch|termoform|kauçuk|vulkanizasyon|çözücü|solvent|parlama noktası|reaktör|damıtma)/i,
  KULTUR_SANAT_TASARIM: /(grafik tasarım|illüstrasyon|illustrator|photoshop|indesign|3d render|pafta|maket|iç mimarlık|iç mekan|sergi|vernisaj|küratör|sanat galerisi|5846 fsek|telif hakkı|moda tasarım|koleksiyon|defile|kostüm|tipografi|pantone)/i,
  MADEN: /(maden ocağı|açık ocak|yeraltı ocağı|tahkimat|desandre|kuyu|galeri|ayna|sondaj|sondör|ch4|metan gazı|karbonmonoksit|gaz maskesi|ofm|patlatma|dinamit|anfo|kapsül|cevher|tuvonon|flotasyon|zenginleştirme)/i,
  MAKINE: /(makine mühendis|cnc|torna|freze|işleme merkezi|hidrolik|pnömatik|kompresör|basınçlı kap|kazan|buhar kazanı|hidrostatik test|titreşim|vibrasyon|rulman|kayış kasnak|redüktör|yağlama|mekanik bakım|talaşlı imalat)/i,
  MEDYA_ILETISIM_YAYIN: /(gazeteci|haber bülteni|muhabir|kameraman|reji|prompter|stüdyo|canlı yayın|liveu|tvu|montaj|kurgu|premiere|davinci|call sheet|çekim planı|-23 lufs|yayın akışı|rundown|basın danışmanı|ambargo|ajans)/i,
  METAL: /(metalurji|çelik|demir çelik|döküm|dökümhane|indüksiyon ocağı|kaynak|gazaltı kaynak|tig kaynak|mig mag|wps|pqr|kaynakçı sertifika|ndt|ultrasonik muayene|manyetik partikül|radyografi|ısıl işlem|tavlama|sertlik ölçüm|haddehane)/i,
  OTOMOTIV: /(oto tamir|oto servis|oto elektrik|obd|arıza kodu|diyagnostik|fren testi|rot balans|amortisör|debriyaj|baskı balata|triger|periyodik bakım|yağ değişimi|filtre|tüvtürk|araç muayene|kaporta|boyasız göçük|ekspertiz)/i,
  SAGLIK_SOSYAL: /(doktor|hekim|hemşire|ebe|hasta|pansuman|serum|damaryolu|enjeksiyon|tansiyon|vital bulgu|epikriz|konsültasyon|sbar|aydınlatılmış onam|kan transfüzyon|ameliyathane|anestezi|yoğun bakım|triyaj|acil servis|eczane|ilaç provizyon|medula sut|sosyal hizmet)/i,
  SPOR_REKREASYON: /(antrenör|teknik direktör|kondisyoner|fitness eğitmeni|spor kulübü|periyodizasyon|antrenman programı|laktat|vo2max|nabız bölgesi|esame listesi|fikstür|müsabaka|hakem|lisans vize|sporcu sağlığı|doping|rehabilitasyon)/i,
  TARIM_AV_BALIK: /(ziraat|çiftçi|traktör|biçerdöver|ekim|dikim|hasat|gübreleme|damlama sulama|zirai don|tarsim|çks|tarım kredi|pestisit|fungisit|herbisit|phi süresi|sera|seracılık|bahçe|bağ bozumu|balıkçı|av yasağı|ağ atma|trol|su ürünleri)/i,
  TEKSTIL_GIYIM_DERI: /(tekstil|dokuma|örme|iplik|bobin|kumaş|pastal planı|kesimhane|dikiş|overlok|reçme|ilik düğme|modelist|stilist|numune|proto|çekmezlik testi|haslık testi|baskı nakış|deri konfeksiyon|tabakhane|yıkama finis)/i,
  TOPLUMSAL_KISISEL: /(kuaför|kuafor|berber|güzellik salonu|saç kesim|saç boyama|oryal|röfle|balyaj|keratin|fön|manikür|pedikür|cilt bakımı|epilasyon|otoklav|sterilizasyon|kuru temizleme|leke çıkarma|terzi|lostra)/i,
  TURIZM_KONAKLAMA_YIYECEK: /(otel|resepsiyon|front office|housekeeping|oda temizliği|kat şefi|overbooking|folyo|giriş çıkış|check-in|check-out|restoran|şef|aşçı|garson|komi|barmen|mise en place|servis hazırlık|haccp|alakart|açık büfe|ziyafet)/i,
  ULASTIRMA_LOJISTIK: /(tır|kamyon|çekici|dorse|şoför|kurye|dağıtım|kargo|sevk|irsaliye|cmr|aetr|takograf|4.5 saat mola|kantar|yükleme|boşaltma|antrepo|depo|forklift|konşimento|gemi|kaptan|psc denetim|uçak|pilot|kokpit|havalimanı)/i,

  GENEL: /(taahhüt|abonelik|gss|işkur|su arıtma|kombi bakımı|derin dondurucu|ecza dolabı|kira|aidat|iş başvurusu|mülakat|cv güncelle|özgeçmiş|emekli|günlük rutin|fatura)/i
};

export function detectDomainFromText(text: string, fallback: ProfessionDomain = 'GENEL'): ProfessionDomain {
  if (fallback === 'SADE') return 'SADE';
  if (!text || text.trim().length === 0) return fallback === 'OTOMATIK_JARGON' ? 'GENEL' : fallback;

  // 1. Öncelikli 0ms Jargon Radar kontrolü (exclusive + supporting puanlama)
  const radar = detectDomainFromJargon(text, fallback);
  const minConfidence = fallback === 'OTOMATIK_JARGON' ? 0.2 : 0.4;
  if (radar.confidence >= minConfidence && radar.detectedDomain !== 'GENEL' && radar.detectedDomain !== 'OTOMATIK_JARGON') {
    return radar.detectedDomain === 'CALISMIYORUM' ? 'GENEL' : radar.detectedDomain;
  }

  // 2. Yedek regex taraması
  for (const [domain, regex] of Object.entries(DOMAIN_KEYWORDS)) {
    if (domain !== 'GENEL' && domain !== 'OTOMATIK_JARGON' && regex.test(text)) {
      const res = domain as ProfessionDomain;
      return res === 'CALISMIYORUM' ? 'GENEL' : res;
    }
  }

  const detected = radar.detectedDomain || fallback;
  if (detected === 'OTOMATIK_JARGON') return 'GENEL';
  return detected === 'CALISMIYORUM' ? 'GENEL' : detected;
}
