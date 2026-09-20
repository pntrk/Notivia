/**
 * Notivia Ses Girişi Dolgu Kelime ve Gürültü Temizleyici (Speech Sanitizer)
 * 
 * Ses tanıma konuşmadaki "ııı", "şey", "yani", "hocam bir de" gibi tereddüt seslerini
 * doğrudan modele göndermek yerine deterministik Regex ön temizleyicisi ile filtreler.
 * 
 * Faydaları:
 * - Model çağrılmadan önce dolgu sözcükler ve anlamsız sesler elenerek saf eylem cümlesi çıkarılır.
 * - API'ye giden token sayısı küçülür ve gecikme azalır.
 * - Kart başlığı "Şey yarın DYS yazısı" yerine doğrudan "DYS Yazısı" olur.
 */

import { stripTemporalFromText } from './date.ts';

// Tereddüt sesleri ve mırıldanmalar (Vowel elongations & hesitation gutturals)
const HESITATION_SOUNDS_REGEX = /(?:^|\s+)(?:[ıiIİ]{2,}|[eEéÉ]{2,}|[hH][ıiIİ]m+|[hH]m+|öhm|öh|ıh|ıhm|kem\s+küm|öfff+|pff+)(?=\s+|$|[.,!?])/gi;

// Birleşik dolgu ve tereddüt kalıpları (Multi-word conversational fillers)
const MULTI_WORD_FILLERS_REGEX = /(?:^|\s+)(?:hocam\s+(?:bir|bi)\s+de|şey\s+(?:bir|bi)\s+de|şey\s+ya|şey\s+hani|şey\s+yani|falan\s+filan|falanlar\s+filanlar|ha\s+(?:bir|bi)\s+de|ayrıca\s+(?:bir|bi)\s+de|ya\s+da\s+şey|ve\s+de\s+şey)(?=\s+|$|[.,!?])/gi;

// Cümle başındaki hitap ve seslenme dolguları (Leading conversational address)
const LEADING_ADDRESS_REGEX = /^(?:hocam|abi|abim|kardeşim|canım|dostum|arkadaşım)[,:\s]+/gi;

// Tekil dolgu sözcükler (Single-word conversational discourse particles)
const SINGLE_WORD_FILLERS_REGEX = /(?:^|\s+)(?:şey|yani|hani|falan|filan|yahu)(?=\s+|$|[.,!?])/gi;

// Cümle başındaki asistan seslenme ve komut kalıpları (Leading voice prompt debris)
const LEADING_COMMAND_NOISE_REGEX = /^(?:bakar\s+mısın(?:ız)?|baksana|lütfen|acaba|zahmet\s+olmazsa)[,:\s]+/gi;
const LEADING_NOTE_PROMPT_REGEX = /^(?:not\s+al(?:ıver)?(?:\s+bakalım)?|not\s+et(?:sene)?|not\s+eder\s+misin|not\s+düş|yaz\s+bunu|şunu\s+yaz|yazar\s+mısın|kaydet\s+bunu|şunu\s+kaydet|bana\s+hatırlat|hatırlat(?:ıver)?)[,:\s]+/gi;

// Cümle başındaki bağlaç artıkları
const LEADING_CONJUNCTIONS_REGEX = /^(?:bir\s+de|bi\s+de|ve\s+de|ayrıca)[,:\s]+/gi;

/**
 * Konuşma metnini analiz edip dolgu sözcükleri, mırıldanmaları ve parazit kalıpları ayıklar.
 * @param rawText Web Speech API veya harici ses tanımadan gelen ham transkript
 * @returns Saf eylem cümlesi
 */
export function sanitizeSpokenText(rawText: string): string {
  if (!rawText || typeof rawText !== 'string') return '';
  let text = rawText.trim();

  // 1. Tereddüt sesleri ve mırıldanmaları temizle (ııı, eee, hımm, öhm, kem küm vb.)
  text = text.replace(HESITATION_SOUNDS_REGEX, ' ');

  // 2. Birleşik dolgu kalıplarını temizle ("hocam bir de", "şey bir de", "falan filan" vb.)
  text = text.replace(MULTI_WORD_FILLERS_REGEX, ' ');

  // 3. Cümle başındaki hitap dolgularını temizle ("Hocam ...", "Abi ...")
  text = text.replace(LEADING_ADDRESS_REGEX, ' ');

  // 4. Tekil dolgu sözcükleri temizle ("şey", "yani", "hani", "falan", "filan")
  text = text.replace(SINGLE_WORD_FILLERS_REGEX, ' ');

  // 5. Cümle başındaki bot seslenme ve komut gürültülerini temizle ("Bakar mısın", "Not al", vb.)
  text = text.replace(LEADING_COMMAND_NOISE_REGEX, ' ');
  text = text.replace(LEADING_NOTE_PROMPT_REGEX, ' ');

  // 6. Cümle başında kalan bağlaçları temizle ("Bir de ...")
  text = text.replace(LEADING_CONJUNCTIONS_REGEX, ' ');

  // 7. Noktalama, çift boşluk ve kenar boşluklarını toparla
  text = text
    .replace(/[\s\t\n]+/g, ' ')
    .replace(/^[.,;:!?\-–—\s]+/, '')
    .replace(/[.,;:!?\-–—\s]+$/, '')
    .trim();

  // 8. İlk harfi Türkçe kurallarına göre büyüt
  if (text.length > 0) {
    text = text.charAt(0).toLocaleUpperCase('tr-TR') + text.slice(1);
  }

  return text;
}

/**
 * Kart başlığındaki olası dolgu veya artık tereddüt kelimelerini temizleyip
 * başlığı standart Notivia formatına (Örn: "DYS Yazısı") dönüştürür.
 */
export function sanitizeCardTitle(rawTitle: string): string {
  if (!rawTitle || typeof rawTitle !== 'string') return '';
  let clean = rawTitle.trim();

  // Başta yer alan dolgu kelimeleri ve seslenmeleri at
  clean = clean.replace(/^(?:şey|yani|hani|işte|hocam(?:\s+(?:bir|bi)\s+de)?|ııı+|eee+|hmm+|öhm)[,:\s]+/gi, '');

  // Zamansal ifadeleri (saatler, günler, periyotlar) başlıktan tamamen ayıkla (zaman ve etiket bağımsızdır)
  clean = stripTemporalFromText(clean);

  // Sonda kalan dolguları at
  clean = clean.replace(/[,:\s]+(?:falan|filan|falan filan|yani|yahu)$/gi, '');

  clean = clean
    .replace(/[\s\t\n]+/g, ' ')
    .replace(/^[.,;:!?\-–—\s]+/, '')
    .replace(/[.,;:!?\-–—\s]+$/, '')
    .trim();

  if (!clean) return rawTitle.trim();

  // Bilinen sektörel ve teknik kısaltmalar sözlüğü
  const KNOWN_ACRONYMS: Record<string, string> = {
    siem: 'SIEM',
    siemm: 'SIEM',
    soc: 'SOC',
    gpo: 'GPO',
    edr: 'EDR',
    xdr: 'XDR',
    poc: 'POC',
    uat: 'UAT',
    waf: 'WAF',
    vpn: 'VPN',
    ipsec: 'IPsec',
    cve: 'CVE',
    eps: 'EPS',
    dr: 'DR',
    kbs: 'KBS',
    dys: 'DYS',
    cimer: 'CİMER',
    smmm: 'SMMM',
    uyap: 'UYAP',
    uets: 'UETS',
    hmk: 'HMK',
    iik: 'İİK',
    cmk: 'CMK',
    haccp: 'HACCP',
    loto: 'LOTO',
    ebys: 'EBYS',
    semver: 'SemVer',
    k8s: 'K8s',
    ram: 'RAM',
    şök: 'ŞÖK',
    sok: 'ŞÖK',
    bep: 'BEP',
    tefbis: 'TEFBİS',
    dask: 'DASK',
    psc: 'PSC',
    gtip: 'GTİP',
    aetr: 'AETR',
    cmr: 'CMR',
    sbar: 'SBAR',
    cpr: 'CPR',
    its: 'İTS',
    mersis: 'MERSİS',
    çks: 'ÇKS',
    tarsim: 'TARSİM'
  };

  // Başlık kelimelerini düzgün baş harflerle yaz, kısaltmaları koru ve düzelt
  const words = clean.split(/\s+/);
  const formatted = words.map((word) => {
    const lowerWord = word.toLowerCase();
    if (KNOWN_ACRONYMS[lowerWord]) {
      return KNOWN_ACRONYMS[lowerWord];
    }
    // 2 veya daha fazla harfli büyük harf kısaltması ise koru (DYS, RAM, ŞÖK, KBS vb.)
    if (word === word.toUpperCase() && word.length >= 2) {
      return word;
    }
    return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR');
  }).join(' ');

  return formatted;
}

/**
 * Girdide dolgu kelime veya ses gürültüsü bulunup bulunmadığını kontrol eder.
 */
export function containsSpeechFillers(rawText: string): boolean {
  if (!rawText || typeof rawText !== 'string') return false;
  return (
    HESITATION_SOUNDS_REGEX.test(rawText) ||
    MULTI_WORD_FILLERS_REGEX.test(rawText) ||
    LEADING_ADDRESS_REGEX.test(rawText) ||
    SINGLE_WORD_FILLERS_REGEX.test(rawText) ||
    LEADING_COMMAND_NOISE_REGEX.test(rawText) ||
    LEADING_NOTE_PROMPT_REGEX.test(rawText) ||
    LEADING_CONJUNCTIONS_REGEX.test(rawText)
  );
}

/**
 * Geliştirici ve arayüz denetimi için temizleme tanılama çıktısı üretir.
 */
export function getSpeechSanitizerDiagnostics(rawText: string) {
  const sanitized = sanitizeSpokenText(rawText);
  return {
    original: rawText,
    sanitized,
    hasFillers: containsSpeechFillers(rawText),
    charReduction: rawText.length - sanitized.length,
    isFullyStripped: sanitized.length === 0 && rawText.trim().length > 0
  };
}
