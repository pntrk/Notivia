/**
 * Notivia Sesli Dikte ve Fonetik Hata Toleransı Modülü
 * Sesle girişlerde veya hızlı yazımlarda oluşan harf kaymalarını ve ses benzerliklerini
 * 0ms içinde normalize ederek jargon radarına saf veri sağlar.
 */

const PHONETIC_REPLACEMENTS: [RegExp, string][] = [
  // Şive Toleransı & Yöresel Ağızlar (Bakarım hele, suvarıver, verive gari, ediver)
  [/\b(suvarıver|suvariver|sulayuver|sulayıver|çiçekler susamış|cicekler susamis)\b/gi, 'çiçekleri sula'],
  [/\b(verive gari|veriver gari|hallediver|ediver gari)\b/gi, 'hallet'],
  [/\b(yapıver|ediver|bakıver|gidiver|geliver)\b/gi, 'yap'],

  // Hukuk & Adalet
  [/\b(müzekere|muzekere|muzekkere)\b/gi, 'müzekkere'],
  [/\b(uyp|uyep|uyabb|uyapta|uyapa)\b/gi, 'uyap'],
  [/\b(istilaf|isdinaf)\b/gi, 'istinaf'],
  [/\b(tebligat|teblikaat|teblikat)\b/gi, 'tebligat'],
  [/\b(tensip|tensib|tensip zapti)\b/gi, 'tensip zaptı'],
  [/\b(uets|uets tebligat|elektronik tebligat)\b/gi, 'uets'],
  [/\b(fezleğe|fezlece|fezlege)\b/gi, 'fezleke'],
  [/\b(mazeret dilekcesi|mazeret dilekçe)\b/gi, 'mazeret dilekçesi'],
  [/\b(hazirun|hazirun list)\b/gi, 'hazirun'],
  [/\b(tehir-i icra|tehiri icra|tehiriicra)\b/gi, 'tehir-i icra'],
  [/\b(segbis|sekbis)\b/gi, 'segbis'],

  // Maliye & SMMM
  [/\b(muhsgk|muhsggk|muhkod|muhsg)\b/gi, 'muhsgk'],
  [/\b(edefter|e-defter|e defter)\b/gi, 'e-defter'],
  [/\b(puantaj|puvantaj|puantac)\b/gi, 'puantaj'],
  [/\b(stopaj|stopac)\b/gi, 'stopaj'],
  [/\b(mizan|miyzan)\b/gi, 'mizan'],
  [/\b(ba-bs|babs|ba bs)\b/gi, 'ba-bs'],
  [/\b(tevkifat|tevkifatli fatura)\b/gi, 'tevkifat'],

  // Sağlık & Klinik
  [/\b(dekübitüs|dekubitus|dekubitis|yatak yarası)\b/gi, 'dekübitus'],
  [/\b(esbar|s-bar|sbarr)\b/gi, 'sbar'],
  [/\b(epikriz|epikriz raporu|epikriz)\b/gi, 'epikriz'],
  [/\b(damaryolu|damar yolu|iv yol)\b/gi, 'damaryolu'],
  [/\b(otoklav|otokilav)\b/gi, 'otoklav'],
  [/\b(vital bulgu|vital takibi|vitaller)\b/gi, 'vital bulgular'],
  [/\b(spo2|oksijen satürasyon|saturasyon)\b/gi, 'spo2'],

  // Eğitim & Okul
  [/\b(e-okul|eokul|e okul)\b/gi, 'e-okul'],
  [/\b(kbss|kbs sistemi)\b/gi, 'kbs'],
  [/\b(dyss|dys belgenet)\b/gi, 'dys'],
  [/\b(zümre|zumre)\b/gi, 'zümre'],
  [/\b(sök|sok toplantısı|şök)\b/gi, 'şök'],
  [/\b(bep planı|bep toplantısı)\b/gi, 'bep'],
  [/\b(tefbis kaydı|tefbis sistemi)\b/gi, 'tefbis'],
  [/\b(iyep|i-yep|ilkokul yetistirme)\b/gi, 'iyep'],
  [/\b(mesem|mes-em|meslek egitim merkezi)\b/gi, 'mesem'],
  [/\b(syllabus|silabus|ders izlencesi)\b/gi, 'syllabus'],
  [/\b(turnitin|törnıtın|intihal raporu)\b/gi, 'turnitin'],
  [/\b(bologna|bolonya süreci)\b/gi, 'bologna'],
  [/\b(acik uclu|açık uçlu sınav|acik uclu sinav)\b/gi, 'açık uçlu sınav'],
  [/\b(bsk|bina sinav komisyonu|bina sınav komisyonu)\b/gi, 'bina sınav komisyonu'],
  [/\b(muvafakatname|muvafakat|veli izin belgesi)\b/gi, 'veli muvafakatname'],

  // Mühendislik & Bilişim / IT & Siber Güvenlik
  [/\b(siemm|siyem|siiem|siem'in|siemler)\b/gi, 'siem'],
  [/\b(soc analizi|sokk|soc merkezi)\b/gi, 'soc'],
  [/\b(edr|xdr|antivirüs kurumsal)\b/gi, 'edr'],
  [/\b(firewal|firewall|güvenlik duvarı|fortigate|forti|paloalto|palo alto|waf)\b/gi, 'firewall'],
  [/\b(active directory|activedirectory|domain controller|aktive direktori)\b/gi, 'active directory'],
  [/\b(veeam|viim|viam backup)\b/gi, 'veeam'],
  [/\b(disaster recovery|dr tatbikatı|felaket kurtarma)\b/gi, 'disaster recovery'],
  [/\b(k8s|kubarnetes|kubernetis|kubernetes)\b/gi, 'kubernetes'],
  [/\b(pentest|pen test|sızma testi|zafiyet tarama)\b/gi, 'pentest'],
  [/\b(uat testi|kabul testi|poc sunumu|devir teslim)\b/gi, 'uat'],
  [/\b(loto kilitleme|loto etiketi|lotoo)\b/gi, 'loto'],
  [/\b(kompanzasyon|kompanzasyon panosu)\b/gi, 'kompanzasyon'],
  [/\b(kırım testi|kirim testi|karot testi)\b/gi, 'kırım testi'],
  [/\b(semver|sem-ver)\b/gi, 'semver'],
  [/\b(deploy|depoly|canlıya alma)\b/gi, 'deploy'],
  [/\b(ipsec vpn|ip-sec|vpn tünel)\b/gi, 'vpn'],
  [/\b(gpo basımı|group policy|gpo dağıtımı)\b/gi, 'gpo'],

  // Güvenlik, Polis, İtfaiye, Asker
  [/\b(scba|skba|solunum tüpü)\b/gi, 'scba'],
  [/\b(arazöz|arazoz)\b/gi, 'arazöz'],
  [/\b(içtima|ictima|tekmil)\b/gi, 'içtima'],
  [/\b(doldur boşalt|doldur-bosalt)\b/gi, 'doldur-boşalt'],

  // Lojistik & Havacılık
  [/\b(takoraf|takoğraf|takograf)\b/gi, 'takograf'],
  [/\b(king-pin|kingpin)\b/gi, 'king-pin'],
  [/\b(metar-taf|metar taf|metarr)\b/gi, 'metar'],
  [/\b(walkaround|walk around)\b/gi, 'walkaround'],
  [/\b(konşimento|bill of lading|konismento)\b/gi, 'konşimento'],
  [/\b(ordino|ordino belgesi)\b/gi, 'ordino'],
  [/\b(demuraj|demurrage|detention)\b/gi, 'demuraj'],

  // Emlak & Gayrimenkul
  [/\b(webtapu|web-tapu|web tapu)\b/gi, 'web-tapu'],
  [/\b(dask|deprem sigortasi|zorunlu deprem)\b/gi, 'dask'],
  [/\b(tahliye taahhüdü|tahliye taahhutnamesi)\b/gi, 'tahliye taahhütnamesi'],

  // Ziraat, Tarım & Hayvancılık
  [/\b(can suyu|cansuyu)\b/gi, 'can suyu'],
  [/\b(taban gübresi|taban gubresi)\b/gi, 'taban gübresi'],
  [/\b(bordo bulamaci|bordo bulamacı)\b/gi, 'bordo bulamacı'],
  [/\b(çks yenileme|cks belgesi)\b/gi, 'çks'],
  [/\b(tarsim eksper|tarsim sigorta)\b/gi, 'tarsim'],

  // Veteriner & Pet
  [/\b(petvet|pet-vet|mikroçip)\b/gi, 'petvet'],
  [/\b(iç dış parazit|ic dis parazit|pire damlası|kene damlası)\b/gi, 'iç dış parazit'],
  [/\b(karma asi|karma aşı)\b/gi, 'karma aşı'],

  // Gastronomi & Güzellik
  [/\b(mise en place|mizanplas|mizenplas)\b/gi, 'mise en place'],
  [/\b(haccp|hasep|hasip)\b/gi, 'haccp'],
  [/\b(oryal|oryel|açıcı)\b/gi, 'oryal'],
  [/\b(keratin bakımı|keretin)\b/gi, 'keratin'],

  // Genel & Ev
  [/\b(su arıtma|su aritma|aritma filtre)\b/gi, 'su arıtma'],
  [/\b(kombi petek|petek temizlik|kombi basinc)\b/gi, 'kombi bakımı'],
  [/\b(kurban eti|kurbanlik et|kurban payi)\b/gi, 'kurban eti']
];

/**
 * Gelen sesli veya ham metni fonetik olarak temizleyip standart terimlere dönüştürür.
 */
export function normalizePhoneticJargon(text: string): string {
  if (!text || typeof text !== 'string') return '';

  let normalized = text;
  for (const [regex, replacement] of PHONETIC_REPLACEMENTS) {
    normalized = normalized.replace(regex, replacement);
  }

  return normalized;
}
