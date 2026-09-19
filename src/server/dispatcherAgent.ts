import { GoogleGenAI, Type, type FunctionDeclaration } from '@google/genai';
import { extractSimpleNoteFromText } from '../utils/simpleNote.ts';
import { matchShortScenario } from '../utils/scenarioDatabase.ts';
import { sanitizeSpokenText, sanitizeCardTitle } from '../utils/speechSanitizer.ts';
import { detectDomainFromJargon } from '../utils/jargonRadar.ts';

// 1. Otonom Ajan Araç Tanımları (Function Declarations - Exact Formal Schema)
export const getCalendarEventsDeclaration: FunctionDeclaration = {
  name: 'get_calendar_events',
  description: 'Kullanıcının mevcut Google Takvimindeki randevularını, toplantılarını ve ajandasını sorgular.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      period_label: {
        type: Type.STRING,
        enum: ['bugun', 'yarin', 'bu_hafta', 'ozel'],
        description: 'Sorgulanan zaman dilimi etiketi (bugun | yarin | bu_hafta | ozel)',
      },
      start_iso: {
        type: Type.STRING,
        description: 'Sorgulanacak aralığın başlangıç zamanı (ISO-8601 YYYY-MM-DDTHH:mm:ss)',
      },
      end_iso: {
        type: Type.STRING,
        description: 'Sorgulanacak aralığın bitiş zamanı (ISO-8601 YYYY-MM-DDTHH:mm:ss)',
      },
      sesli_fisilti: {
        type: Type.STRING,
        description: "Sorgulama başladığında söylenecek fısıltı (Örn: 'Bugünün ajandasına bakıyorum.')",
      },
    },
    required: ['period_label', 'start_iso', 'end_iso', 'sesli_fisilti'],
  },
};

export const createNoteOrEventDeclaration: FunctionDeclaration = {
  name: 'create_note_or_event',
  description: 'Notivia içine bilişsel alt görevleri, zamanı ve görsel özellikleri olan yeni bir eylem/hatırlatıcı kartı ekler.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      baslik: {
        type: Type.STRING,
        description: 'Kısa ve net eylem başlığı (Maksimum 4 kelime)',
      },
      zaman: {
        type: Type.STRING,
        description: "Arayüzde gösterilecek sade zaman ifadesi (Örn: 'Bugün 19:30', '14 Gün Sonra')",
      },
      tarih_iso: {
        type: Type.STRING,
        description: 'Etkinliğin kesin ISO-8601 tarihi veya null',
      },
      eksik_bilgi: {
        type: Type.BOOLEAN,
        description: 'Kritik zaman bilgisi eksik olup kullanıcıya soru sorulması gerekiyorsa true',
      },
      netlestirme_sorusu: {
        type: Type.STRING,
        description: "Eksik bilgi varsa kullanıcıya sesli yöneltilecek soru (Örn: 'Hangi gün için planlayalım?')",
      },
      action_items: {
        type: Type.ARRAY,
        description: 'Tiklenebilir görevler veya arka plandaki ön hazırlık adımları',
        items: {
          type: Type.OBJECT,
          properties: {
            task: { type: Type.STRING },
            is_completed: { type: Type.BOOLEAN },
          },
          required: ['task', 'is_completed'],
        },
      },
      tetikleyici: {
        type: Type.OBJECT,
        description: 'Koşullu tetikleyici (hava, konum vb.)',
        properties: {
          tip: { type: Type.STRING, description: 'hava | konum | surekli' },
          sart: { type: Type.STRING, description: 'yagmur | don | sanayi | market' },
          aktif_mi: { type: Type.BOOLEAN },
        },
        required: ['tip', 'sart', 'aktif_mi'],
      },
      anomali_notu: {
        type: Type.STRING,
        description: 'Teknik uyarı, botanik tüyo veya operasyonel risk notu',
      },
      ikon: {
        type: Type.STRING,
        description: 'Kategoriye tam uyan tek bir emoji',
      },
      renk: {
        type: Type.STRING,
        description: 'Pastel kart arka plan HEX kodu (#FEF3C7, #E0F2FE, #DCFCE7, #FEE2E2, #F3E8FF)',
      },
      sesli_fisilti: {
        type: Type.STRING,
        description: 'Kulaklıktan TTS ile okunacak 1 cümlelik insani teyit',
      },
    },
    required: ['baslik', 'zaman', 'eksik_bilgi', 'action_items', 'ikon', 'renk', 'sesli_fisilti'],
  },
};

export const draftMessageDeclaration: FunctionDeclaration = {
  name: 'draft_message',
  description: 'Toplantı, randevu erteleme, bilgilendirme veya ödeme takibi için hazır mesaj/e-posta taslağı üretir.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      recipient: {
        type: Type.STRING,
        description: "Muhatap kişi veya grubun adı (Örn: 'Ahmet Abi', 'Veli Grubu', 'Müdür')",
      },
      channel: {
        type: Type.STRING,
        enum: ['whatsapp', 'email', 'sms'],
        description: 'whatsapp | email | sms',
      },
      subject: {
        type: Type.STRING,
        description: 'E-posta ise konu başlığı, WhatsApp ise kısa özet',
      },
      message_body: {
        type: Type.STRING,
        description: 'Doğrudan gönderilmeye hazır, nazik ve eksiksiz mesaj metni',
      },
      sesli_fisilti: {
        type: Type.STRING,
        description: "Kulaktan verilecek sesli bildirim (Örn: 'Ahmet Abi için WhatsApp taslağı hazırlandı.')",
      },
    },
    required: ['recipient', 'channel', 'message_body', 'sesli_fisilti'],
  },
};

export interface DispatchResponse {
  tool: 'get_calendar_events' | 'create_note_or_event' | 'draft_message';
  arguments: Record<string, any>;
  sesli_fisilti: string;
  source: string;
}

const DISPATCHER_SYSTEM_PROMPT = `Sen "Notivia" bilişsel yaşam asistanının Otonom Ajan Yönlendiricisisin (Autonomous Dispatcher Agent).
Görevin: Kullanıcının ayaküstü, devrik, sesli veya yazılı girdilerini analiz etmek; kullanıcının asıl niyetini sezerek laf kalabalığı yapmadan DOĞRUDAN en uygun Fonksiyon Çağrısını (Function Call) tetiklemektir.

KULLANILABİLİR ARAÇLAR:
1. get_calendar_events: Kullanıcının mevcut Google Takvimindeki randevularını, toplantılarını ve ajandasını sorgular.
   Parametreler: period_label (bugun | yarin | bu_hafta | ozel), start_iso, end_iso, sesli_fisilti.
2. create_note_or_event: Notivia içine bilişsel alt görevleri (action_items), zamanı ve görsel özellikleri olan yeni bir eylem kartı ekler.
   - Zero-Shot Inverted Planning: Eksik girdileri dev bir eylem planına dönüştür; 3-4 maddelik somut kontrol adımı üret (harç, evrak, borç kontrolü, açlık/tokluk, vb.).
   - Inverted Scheduling: Etkinlikten önceki hazırlık vadesini ('hazirlik_iso') hesapla (randevudan 1 gün önce 16:00, uçuştan 24 saat önce, vb.).
   - Anomali Notu: Hayati hatadan kurtaracak rehber fısıltı ('anomali_notu').
   - Liste & Market & Envanter Kuralı: Kullanıcı "alınacaklar listesi", "market", "pazar", "bakkal" dediğinde veya arka arkaya ürün saydığında ("et süt yumurta ekmek su zeytin peynir") başlığı "Market Alışveriş Listesi" veya "Pazar Alışverişi" yap, her ürünü tek tek 'action_items' dizisine aktar, bağlaçları temizle, İkon: 🛒, Renk: #DCFCE7, Zaman: "Markette / Alışverişte".
   - Renk ve İkon Mimarisi:
     * Alışveriş / Liste / Market: #DCFCE7 (🛒)
     * Resmi / Kurumsal / Bürokrasi: #E0F2FE (🏛️/🛂/🪪/📋)
     * Sosyal / İletişim / Tören: #DCFCE7 (🤝/💍/💐)
     * Teknik / Bakım / Muayene: #FEF3C7 (🔧/🚗/⚙️)
     * Acil / Finansal Ödeme / Borç: #FEE2E2 (💳/💸/🚨)
     * Sağlık / Kişisel Yaşam / Alacak: #F3E8FF (💊/🩺/💰)
   - baslik maksimum 4 kelime olmalıdır.
3. draft_message: Toplantı, randevu erteleme, bilgilendirme veya ödeme takibi için hazır mesaj/e-posta taslağı üretir.
   Parametreler: recipient, channel (whatsapp | email | sms), subject, message_body, sesli_fisilti.

TEMEL ÇALIŞMA KURALLARI VE BİLİŞSEL ALANLAR:
0. TEMEL İLKE: KULLANICIYA YAPAY İŞ ÇIKARMA (MİKRO GÖREV KURALI):
- Tekil Alarmlar ve Hatırlatıcılar:
  * Kullanıcı "sabah 9'da alarm kur", "yarın 8'de kaldır", "20 dk sonra fırını kapat" dediğinde:
    - 'action_items' listesini KESİNLİKLE BOŞ BIRAK ([]). 
    - Tersine planlama veya hazırlık alarmı türetme.
    - Görev tipini doğrudan alarm veya sayaç olarak belirle.
  * Sadece karmaşık ve içinde gerçekten hazırlık gerektiren durumlarda (örn: "haftaya vizeler başlıyor") alt adımlar üret.
- Günlük Yaşamın 5 Temel Çekirdeği:
  * İlaç/Vitamin: "Akşam tansiyon ilacımı hatırlat" -> Tekil saat alarmı, 'action_items': [].
  * Ev/Mutfak: "40 dakika sonra çamaşırları as", "Ocağın altını kapat" -> Süreli sayaç alarmı, 'action_items': [].
  * Alışveriş: "Eve gelirken ekmek ve maden suyu al" -> Basit kontrol listesi (yalnızca istenen 2 madde).
  * Çöp/Rutin: "Yarın sabah çöpü çıkarmayı unutma" -> Sabah 08:00 hatırlatıcısı, 'action_items': [].
  * Randevu: "Salı 14:30 diş hekimi" -> Sadece randevu kartı + 30 dk önce yola çıkış, 'action_items': [].

1. BİLİŞSEL ALT GÖREV TÜRETİMİ (LEB DEMEDEN LEBLEBİYİ ANLAMA):
- Seyahat / Tatil / Uçak / YHT: Pasaport/vize geçerliliği, T-24 saatte online check-in, T-3 saatte evden çıkış / trafik payı, T-90 dakikada bagaj/güvenlik, ev su vanası ve priz kontrolü.
- Araç Bakım / Muayene / MTV: MTV/ceza borcu kontrolü, 3 gün önce sigorta teklif karşılaştırma, ilk yardım çantası/yangın tüpü, ruhsat kontrolü.
- Bebek & Aşı Takvimi: 1 gün önce parasetamol şurup ve dijital ateşölçer kontrolü, kolay çıkarılır pamuklu giysi, 48 saat ateş takibi.
- Evcil Hayvan & Parazit: 2-3 aylık periyodik iç-dış parazit takvimi, aşı karnesi ve taşıma kutusu kontrolü.
- Ev Filtre & Tesisat (Arıtma, Kombi, Klima): Su arıtma filtre değişimi (6 ay), kombi petek/hava tahliyesi, müdahaleden 48 saat sonrasına kontrol adımı (bar basıncı testi).
- Abonelik & Deneme Sürümü: 3 gün öncesine otomatik kart çekimini önlemek için abonelik iptal / provizyon kontrolü alarmı.
- Zirai İlaçlama & Budama: 24 saat yağmursuzluk/rüzgarsızlık meteorolojik kontrolü, sabah erken serinlik (07:30), kış sonu budama ve aşı macunu.
- Sporcu Recovery & Beslenme: Ağır bacak/göğüs/sırt antrenmanından 48 saat sonra kas toparlanma (recovery), günlük 3.5L su ve 5g kreatin dozu.
- Kurul / Toplantı: Gündem maddeleri, önceki karar tutanakları, ıslak imzalı hazirun listesi.
- TEFBİS & Okul Aile Birliği: 3 gün içinde TEFBİS gelir-gider makbuz kaydı, OAB aylık veli tablosu.
- Bina Sınav Komisyonu (LGS/YKS): T-2 saatte komisyon toplantısı, emniyet kuryesinden mühürlü evrak teslimi ve sınav sonu mühürleme.
- ASM Gebe-Bebek İzlemi & 112 Acil: AHBS izlem aralığı, negatif performans uyarısı, 112 nöbet devrinde kırmızı reçete narkotik ampul sayımı.
- Arabuluculuk (3+1 Hafta) & İcra Kıymet Takdiri: 3 haftalık yasal süre, ilk oturum daveti, UYAP arabuluculuk portalı son tutanak, 2 yıllık kıymet takdiri süresi.
- YMM KDV İadesi & Bağımsız Denetim: Karşıt inceleme tutanakları, İVD tasdik raporu, KGK çalışma kağıtları ve finansal dipnot mutabakatı.
- ÇKS & TARSİM & TÜRKVET: ÇKS dosya yenileme, TARSİM dolu/don poliçesi, yeni doğan TÜRKVET küpeleme ve koruyucu aşı takvimi.
- İSG & Yapı Denetim: İBYS noter onaylı defter kaydı, ramak kala tutanağı, şantiye demir donatı kabul vizesi ve beton döküm izni.

2. LİSTE, MARKET VE ÇOKLU GÖREV AYRIŞTIRMA:
- Arka arkaya ürün veya görev sayıldığında ("et süt yumurta al", "raporu at sonra Ahmet'i ara"):
  * Her bir maddeyi saf, temiz haliyle bağımsız bir 'action_items' elemanı yap ({ "task": "...", "is_completed": false }).
  * Bağlaçları ("ve", "bir de", "sonra") temizle, kart başlığını genel koy (Örn: "Market Alışverişi").

3. ŞİVE TOLERANSI VE BOTANİK ZAMANLAMA KURALI:
- Yöresel ağızları ("suvarıver", "verive gari", "sulayuver", "çiçekler susamış") standart niyetle karşıla.
- Güneş Kuralı: Çiçek sulama talebi 11:00 - 17:00 arasında gelirse ASLA o saate kurma; AKŞAM SERİNLİĞİNE (19:30) ötele.
- Orkide: Gece ıslak kalırsa çürür; ertesi gün SABAH 09:30'a al ve daldırma sulama uyarısı ekle.

4. HAVA DURUMU VE KOŞULLU TETİKLEYİCİLER:
- Meteorolojik şarta bağlıysa ("yağmur yağarsa", "don olursa"):
  * Zaman metnini "Şart Gerçekleştiğinde" yap, anomali ve tetikleyici bilgisini aktar.

5. EMANET, ALACAK VE SOSYAL BELLEK:
- Biriyle paylaşılan eşya/para ("Ahmet'e lokma takımını verdim", "Mehmet'e 2000 TL borç verdim"):
  * Türü emanet/alacak olarak işaretle. Vade yoksa 14 gün sonrasına teyit adımı koy ("Emanet/Borç teslim alındı mı?").

6. EKSİK BİLGİ DİYALOG DÖNGÜSÜ (CLARIFICATION):
- Randevu/buluşma bildirildiği halde gün/saat verilmediyse:
  * "eksik_bilgi": true
  * "soru": "Hangi gün ve saatte planlayalım?"
  * "tarih_iso": null
  * "zaman": null
  * "sesli_fisilti": "Hangi gün ve saatte planlayalım?"

7. SESLİ FISILTI PROTOKOLÜ (SESLİ GERİ BİLDİRİM):
- 'sesli_fisilti' alanında kullanıcının kulaklığına fısıldanacak sıcak, kısa (en fazla 1 cümle), robotik olmayan net bir teyit cümlesi üret.

ZAMAN REFERANSI:
- Tüm bağıl zamanları sana verilen CURRENT_DATETIME değerine göre ISO-8601 olarak hesapla.`;

// Deterministic Dispatcher Engine (Yüksek Doğruluklu Deterministik Eşleme)
export function dispatchDeterministic(
  input: string,
  currentDatetime: string,
  userDomain?: string
): DispatchResponse {
  const sanitizedInput = sanitizeSpokenText(input) || input.trim();
  const lower = sanitizedInput.toLowerCase().trim();
  const baseDate = currentDatetime ? new Date(currentDatetime) : new Date();

  // 0. KANAL: SADE / MOTORSUZ MOD (Kullanıcı motor seçimi yapmadıysa doğrudan söylenen ham haliyle not kaydı)
  if (userDomain === 'SADE') {
    const rawNote = input.trim();
    return {
      tool: 'create_note_or_event',
      arguments: {
        baslik: rawNote,
        zaman: 'Kayıt Edildi',
        tarih_iso: null,
        eksik_bilgi: false,
        netlestirme_sorusu: '',
        action_items: [],
        tetikleyici: { tip: 'surekli', sart: '', aktif_mi: false },
        anomali_notu: null,
        ikon: '📝',
        renk: '#F8FAFC',
        sesli_fisilti: 'Notunuz kaydedildi.',
      },
      sesli_fisilti: 'Notunuz kaydedildi.',
      source: 'raw-simple-mode',
    };
  }

  // 1. KANAL: İLETİŞİM & TASLAK HAZIRLAYICI (draft_message)
  const isMessageDraft =
    lower.includes('yaz') ||
    lower.includes('mesaj') ||
    lower.includes('mail') ||
    lower.includes('e-posta') ||
    lower.includes('taslak') ||
    lower.includes('duyuru') ||
    lower.includes('haber ver') ||
    lower.includes('ilet') ||
    lower.includes('bilgilendir') ||
    lower.includes('söyle');

  const isExplicitDraftRequest =
    (lower.includes('yaz') && (lower.includes('ye ') || lower.includes('ya ') || lower.includes('e ') || lower.includes('a '))) ||
    lower.includes('mesajı hazırla') ||
    lower.includes('mail taslağı') ||
    lower.includes('taslağı çıkar') ||
    lower.includes('gelemeyeceğimi') ||
    lower.includes('katılamayacağımı');

  if (isExplicitDraftRequest || (isMessageDraft && !lower.includes('not al') && !lower.includes('hatırlat'))) {
    let recipient = 'İlgili Kişi';
    let channel: 'whatsapp' | 'email' | 'sms' = 'whatsapp';
    let subject = 'Bilgilendirme';

    if (lower.includes('mail') || lower.includes('e-posta')) channel = 'email';
    else if (lower.includes('sms')) channel = 'sms';

    // Alıcı tespiti
    if (lower.includes('müdür')) {
      recipient = 'Müdür';
      subject = 'Rapor Teslimi ve Bilgilendirme';
    } else if (lower.includes('veli')) {
      recipient = 'Veli Grubu';
      subject = 'Veli Toplantısı Bilgilendirmesi';
    } else {
      const matchRecipient = input.match(/([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[A-Za-zçğıöşü]+)?)(?:'?[yea]\b)/);
      if (matchRecipient) recipient = matchRecipient[1];
    }

    let message_body = '';
    if (lower.includes('gelemeyece') || lower.includes('katılamaya')) {
      message_body = `Merhaba ${recipient}, elimde olmayan zorunlu sebeplerden ötürü yarın planlanan buluşmaya katılamayacağımı üzülerek bildirmek isterim. En kısa sürede telafi etmek üzere görüşmek dileğiyle.`;
    } else if (lower.includes('veli toplantı')) {
      message_body = `Sayın Velilerimiz, öğrencilerimizin akademik ve sosyal gelişim süreçlerini değerlendirmek üzere okulumuzda düzenlenecek veli toplantısına katılımınızı önemle rica ederiz.`;
    } else if (lower.includes('rapor teslim') || (lower.includes('müdür') && lower.includes('rapor'))) {
      message_body = `Sayın Müdürüm,\n\nHazırlamış olduğum rapor ve ilgili resmi evraklar tamamlanmış olup ekte bilgilerinize sunulmuştur. Bilgilerinize arz ederim.\n\nSaygılarımla.`;
    } else {
      message_body = `Merhaba ${recipient}, ${input} konusu hakkında sizleri bilgilendirmek istedim. Detayları görüşmek üzere iyi çalışmalar dilerim.`;
    }

    const whisper = `${recipient} için ${channel === 'email' ? 'e-posta' : 'mesaj'} taslağı hazırlandı.`;

    return {
      tool: 'draft_message',
      arguments: {
        recipient,
        channel,
        subject,
        message_body,
        // Geriye dönük uyumluluk alanları
        alici: recipient,
        kanal: channel,
        konu: subject,
        metin: message_body,
        sesli_fisilti: whisper,
      },
      sesli_fisilti: whisper,
      source: 'deterministic-dispatcher',
    };
  }

  // 2. KANAL: TAKVİM & AJANDA OKUYUCU (get_calendar_events)
  const isCalendarQuery =
    lower.includes('neyim var') ||
    lower.includes('programım nasıl') ||
    lower.includes('müsait miyim') ||
    lower.includes('musait miyim') ||
    lower.includes('planım ne') ||
    lower.includes('ajandam') ||
    lower.includes('randevum var mı') ||
    lower.includes('boş vaktim') ||
    lower.includes('ne zaman müsait');

  if (isCalendarQuery) {
    const pad = (n: number) => String(n).padStart(2, '0');
    const start = new Date(baseDate);
    const end = new Date(baseDate);
    let period_label: 'bugun' | 'yarin' | 'bu_hafta' | 'ozel' = 'bugun';
    let fisilti = "Bugünün ajandasına bakıyorum.";

    if (lower.includes('yarın') || lower.includes('yarin')) {
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() + 1);
      end.setHours(23, 59, 59, 999);
      period_label = 'yarin';
      fisilti = 'Yarının ajandasına bakıyorum.';
    } else if (lower.includes('hafta') || lower.includes('bu hafta')) {
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() + 7);
      period_label = 'bu_hafta';
      fisilti = 'Bu haftaki takviminize bakıyorum.';
    } else if (lower.includes('cuma') || lower.includes('pazartesi') || lower.includes('çarşamba')) {
      period_label = 'ozel';
      fisilti = 'İlgili günün ajandasına bakıyorum.';
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    } else {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }

    const start_iso = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}T${pad(start.getHours())}:${pad(start.getMinutes())}:${pad(start.getSeconds())}`;
    const end_iso = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}T${pad(end.getHours())}:${pad(end.getMinutes())}:${pad(end.getSeconds())}`;

    return {
      tool: 'get_calendar_events',
      arguments: {
        period_label,
        start_iso,
        end_iso,
        sesli_fisilti: fisilti,
        // Geriye dönük uyumluluk
        sorgu_tipi: period_label,
      },
      sesli_fisilti: fisilti,
      source: 'deterministic-dispatcher',
    };
  }

  // 3. KANAL: BİLİŞSEL EYLEM & NOT OLUŞTURUCU (create_note_or_event)
  const radar = detectDomainFromJargon(sanitizedInput, (userDomain as any) || 'GENEL');
  const simpleNote = extractSimpleNoteFromText(sanitizedInput, currentDatetime, undefined, userDomain);

  // Başlık maksimum 4 kelime kuralı ve dolgu sözcüklerden arındırma
  let baslik = sanitizeCardTitle(simpleNote.baslik);
  const words = baslik.split(/\s+/);
  if (words.length > 4) {
    baslik = words.slice(0, 4).join(' ');
  }

  // İsmin halleri finansal kontrol: "-den/-dan" alacak (🟢), "-e/-a" borç/ödeme (🔴)
  let icon = simpleNote.ikon;
  let color = simpleNote.renk;
  if (radar.confidence >= 0.4) {
    if (!icon || icon === '📌') icon = radar.suggestedIcon;
    if (!color || color === '#FEF3C7') color = radar.suggestedColor;
  }

  if (lower.includes('alacak') || lower.includes('alacağım') || input.match(/\b[A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:'?[dten]an|'?[dten]en)\b/)) {
    icon = '🟢';
    color = '#DCFCE7';
  } else if (lower.includes('borç') || lower.includes('öde') || input.match(/\b[A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:'?[yea])\b/)) {
    icon = '🔴';
    color = '#FEE2E2';
  }

  // Örtük saat ataması (Jargon radarında implicit time hook varsa ve kullanıcı spesifik saat vermediyse)
  let zamanText = simpleNote.zaman;
  let tarihIso = simpleNote.tarih_iso;
  if (radar.confidence >= 0.4 && radar.implicitHour !== undefined && radar.implicitMinute !== undefined) {
    const hasExplicitHour = zamanText && /\b\d{1,2}:\d{2}\b/.test(zamanText);
    if (!hasExplicitHour) {
      const pad = (n: number) => String(n).padStart(2, '0');
      const timeStr = `${pad(radar.implicitHour)}:${pad(radar.implicitMinute)}`;
      if (zamanText === 'Bugün' || !zamanText) {
        zamanText = `Bugün ${timeStr}`;
      } else if (zamanText === 'Yarın') {
        zamanText = `Yarın ${timeStr}`;
      } else {
        zamanText = `${zamanText || 'Bugün'} ${timeStr}`;
      }
      if (tarihIso) {
        const d = new Date(tarihIso);
        d.setHours(radar.implicitHour, radar.implicitMinute, 0, 0);
        tarihIso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      }
    }
  }

  const isClarificationNeeded = !radar.implicitHour && !!(simpleNote.eksik_bilgi || (!simpleNote.zaman && !simpleNote.tarih_iso && (lower.includes('randevu') || lower.includes('görüşme') || lower.includes('buluşma') || lower.includes('toplantı'))));
  const soruText = simpleNote.netlestirme_sorusu || simpleNote.soru || (isClarificationNeeded ? 'Hangi gün ve saatte planlayalım?' : null);
  zamanText = isClarificationNeeded ? 'Zaman Belirtilmedi' : (zamanText || 'Bugün');
  const voiceWhisper = isClarificationNeeded && soruText
    ? soruText
    : `${baslik} ${zamanText ? zamanText + ' için ' : ''}kuruldu.`;

  return {
    tool: 'create_note_or_event',
    arguments: {
      baslik,
      zaman: zamanText,
      tarih_iso: isClarificationNeeded ? null : (tarihIso || null),
      eksik_bilgi: isClarificationNeeded,
      netlestirme_sorusu: isClarificationNeeded ? soruText : null,
      soru: isClarificationNeeded ? soruText : null,
      action_items: simpleNote.action_items || [],
      tetikleyici: simpleNote.tetikleyici ? {
        tip: (simpleNote.tetikleyici.tip as any) || 'hava',
        sart: simpleNote.tetikleyici.sart || '',
        aktif_mi: simpleNote.tetikleyici.aktif_mi !== undefined ? simpleNote.tetikleyici.aktif_mi : true,
      } : null,
      anomali_notu: simpleNote.anomali_notu || null,
      ikon: icon,
      renk: color,
      sesli_fisilti: voiceWhisper,
      hazirlik_zamani: simpleNote.hazirlik_zamani || null,
      hazirlik_iso: simpleNote.hazirlik_iso || null,
      periyodik: simpleNote.periyodik || null,
    },
    sesli_fisilti: voiceWhisper,
    source: 'deterministic-dispatcher',
  };
}

// Full Gemini Tool-Calling Autonomous Dispatcher
export async function dispatchWithGemini(
  input: string,
  currentDatetime: string,
  userDomain?: string
): Promise<DispatchResponse> {
  if (userDomain === 'SADE') {
    return dispatchDeterministic(input, currentDatetime, 'SADE');
  }

  const sanitized = sanitizeSpokenText(input);
  const cleanInput = (sanitized || input || '').trim();
  let lower = cleanInput.toLowerCase();

  // Kelime bazlı göreceli süreleri dakikaya dönüştür
  lower = lower
    .replace(/yarım\s*saat\s*sonra/gi, '30 dakika sonra')
    .replace(/çeyrek\s*saat\s*sonra/gi, '15 dakika sonra')
    .replace(/bir\s*buçuk\s*saat\s*sonra/gi, '90 dakika sonra')
    .replace(/uyandır/gi, 'alarm kur');

  // 1. ÖNCELİK: YEREL VE BİLİŞSEL KURAL MOTORU KONTROLÜ
  // 2-3 kelimelik kısa senaryolar, tekil alarmlar, sayaçlar veya belirgin kurumsal/mesleki kalıplar varsa
  // API'ye gitmeden anında, sıfır gecikmeyle ve sıfır maliyetle yerel motoru çalıştırır.
  const shortScenario = matchShortScenario(cleanInput, userDomain);
  const isDirectCalendar = lower.includes('neyim var') || lower.includes('programım nasıl') || lower.includes('müsait miyim') || lower.includes('ajandam');
  const isDirectMessage = lower.includes('mesajı hazırla') || lower.includes('mail taslağı') || lower.includes('gelemeyeceğimi söyle');
  const isMicroTaskFast =
    lower.includes('alarm') ||
    lower.includes('kaldır') ||
    lower.includes('uyandır') ||
    /(\d+)\s*(dakika|dk|saat)\s*sonra/.test(lower) ||
    lower.includes('tansiyon ilac') ||
    lower.includes('çamaşır') ||
    lower.includes('ocağın altı') ||
    lower.includes('fırını kapat') ||
    lower.includes('çöp') ||
    (lower.includes('diş') && lower.includes('randevu'));

  if (shortScenario || isDirectCalendar || isDirectMessage || isMicroTaskFast) {
    return dispatchDeterministic(cleanInput, currentDatetime, userDomain);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return dispatchDeterministic(cleanInput, currentDatetime, userDomain);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const userPrompt = `Kullanıcı Girdisi: "${input}"\nCURRENT_DATETIME: ${currentDatetime}${userDomain && userDomain !== 'GENEL' ? `\nKULLANICININ ÇALIŞMA / UZMANLIK ALANI ODAĞI: ${userDomain}` : ''}`;

    let functionCalls: any[] | undefined;
    let usedModel = 'gemini-2.5-flash';

    const candidateModels = [
      'gemini-3.1-flash',
      'gemini-2.5-flash', 'gemini-2.0-flash',
      'gemini-3.1-8b',
    ];
    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: userPrompt,
          config: {
            systemInstruction: DISPATCHER_SYSTEM_PROMPT,
            tools: [
              {
                functionDeclarations: [
                  getCalendarEventsDeclaration,
                  createNoteOrEventDeclaration,
                  draftMessageDeclaration,
                ],
              },
            ],
            toolConfig: {
              functionCallingConfig: {
                mode: 'ANY' as any,
              },
            },
          },
        });

        if (response.functionCalls && response.functionCalls.length > 0) {
          functionCalls = response.functionCalls;
          usedModel = modelName;
          break;
        }
      } catch {
        // 503 (high demand) veya 429 gibi geçici durumlarda sıradaki modele geç
        continue;
      }
    }

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      const toolName = call.name as 'get_calendar_events' | 'create_note_or_event' | 'draft_message';
      const args = (call.args || {}) as Record<string, any>;
      const fisilti = String(args.sesli_fisilti || 'İşleminiz tamamlandı.');

      // Normalize args to support both new formal schema and UI aliases
      if (toolName === 'draft_message') {
        args.alici = args.recipient || args.alici || 'İlgili Kişi';
        args.kanal = args.channel || args.kanal || 'whatsapp';
        args.konu = args.subject || args.konu || 'Bilgilendirme';
        args.metin = args.message_body || args.metin || '';
      } else if (toolName === 'get_calendar_events') {
        args.sorgu_tipi = args.period_label || args.sorgu_tipi || 'bugun';
      } else if (toolName === 'create_note_or_event') {
        if (args.baslik) {
          args.baslik = sanitizeCardTitle(args.baslik);
        }
      }

      return {
        tool: toolName,
        arguments: args,
        sesli_fisilti: fisilti,
        source: `${usedModel}-tools`,
      };
    }

    // Fallback if no function call emitted
    return dispatchDeterministic(input, currentDatetime, userDomain);
  } catch (err) {
    console.warn('[Gemini Dispatcher Fallback]:', err);
    return dispatchDeterministic(input, currentDatetime, userDomain);
  }
}
