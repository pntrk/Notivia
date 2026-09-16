import { GoogleGenAI, Type, type FunctionDeclaration } from '@google/genai';
import { extractSimpleNoteFromText } from '../utils/simpleNote.ts';

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
        description: "Arayüzde görünecek sade zaman metni (Örn: 'Salı 14:00')",
      },
      tarih_iso: {
        type: Type.STRING,
        description: 'Etkinliğin kesin ISO-8601 tarihi veya null',
      },
      hazirlik_zamani: {
        type: Type.STRING,
        description: "Ön hazırlık zamanı (Örn: '1 Gün Önce 16:00')",
      },
      hazirlik_iso: {
        type: Type.STRING,
        description: 'Ön hazırlık alarmının çalacağı ISO-8601 tarihi veya null',
      },
      action_items: {
        type: Type.ARRAY,
        description: 'İşin arkasındaki gizli gereksinimlerden türetilen somut kontrol adımları',
        items: {
          type: Type.OBJECT,
          properties: {
            task: { type: Type.STRING },
            is_completed: { type: Type.BOOLEAN },
          },
          required: ['task', 'is_completed'],
        },
      },
      anomali_notu: {
        type: Type.STRING,
        description: 'Kritik rehberlik fısıltısı veya teknik uyarı',
      },
      ikon: {
        type: Type.STRING,
        description: 'Kategoriye tam uyan tek bir emoji',
      },
      renk: {
        type: Type.STRING,
        description: 'Pastel kart arka plan rengi HEX (#E0F2FE, #FEF3C7, #FEE2E2, #DCFCE7, #F3E8FF)',
      },
      sesli_fisilti: {
        type: Type.STRING,
        description: "Kulaktan verilecek kısa sesli doğrulama (Örn: 'Muayene randevusu Salı 14:00 için kuruldu.')",
      },
    },
    required: ['baslik', 'ikon', 'renk', 'sesli_fisilti'],
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
   - "Leb Demeden Leblebiyi Anlama": Gizli ön hazırlıkları 'action_items' listesine ekle.
   - Tersine Zamanlama: Etkinlikten önceki hazırlık vadesini ('hazirlik_iso') hesapla.
   - Finansal Yön: "-den/-dan" ayrılma ise alacak (ikon: 🟢), "-e/-a" yönelme ise borç/ödeme (ikon: 🔴).
   - baslik maksimum 4 kelime olmalıdır.
3. draft_message: Toplantı, randevu erteleme, bilgilendirme veya ödeme takibi için hazır mesaj/e-posta taslağı üretir.
   Parametreler: recipient, channel (whatsapp | email | sms), subject, message_body, sesli_fisilti.

TEMEL DAVRANIŞ KURALLARI:
- ASLA serbest metinle sohbet etme; daima uygun aracı fonksiyon çağrısı olarak çalıştır.
- Tüm saat hesaplamalarını CURRENT_DATETIME değerini referans alarak yap. Saat söylenmediyse bağlama uygun varsayılan ata (Sabah: 09:00, Öğle: 13:00, Akşam: 19:00).
- Her araç çağrısına kullanıcının kulaklığına veya hoparlörüne fısıldanacak 3-4 kelimelik net bir onay ifadesi ('sesli_fisilti') ekle.`;

// Deterministic Dispatcher Engine (Yüksek Doğruluklu Deterministik Eşleme)
export function dispatchDeterministic(input: string, currentDatetime: string): DispatchResponse {
  const lower = input.toLowerCase().trim();
  const baseDate = currentDatetime ? new Date(currentDatetime) : new Date();

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
  const simpleNote = extractSimpleNoteFromText(input, currentDatetime);

  // Başlık maksimum 4 kelime kuralı
  let baslik = simpleNote.baslik;
  const words = baslik.split(/\s+/);
  if (words.length > 4) {
    baslik = words.slice(0, 4).join(' ');
  }

  // İsmin halleri finansal kontrol: "-den/-dan" alacak (🟢), "-e/-a" borç/ödeme (🔴)
  let icon = simpleNote.ikon;
  let color = simpleNote.renk;
  if (lower.includes('alacak') || lower.includes('alacağım') || input.match(/\b[A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:'?[dten]an|'?[dten]en)\b/)) {
    icon = '🟢';
    color = '#DCFCE7';
  } else if (lower.includes('borç') || lower.includes('öde') || input.match(/\b[A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:'?[yea])\b/)) {
    icon = '🔴';
    color = '#FEE2E2';
  }

  const voiceWhisper = `${baslik} ${simpleNote.zaman ? simpleNote.zaman + ' için ' : ''}kuruldu.`;

  return {
    tool: 'create_note_or_event',
    arguments: {
      baslik,
      zaman: simpleNote.zaman,
      tarih_iso: simpleNote.tarih_iso || null,
      hazirlik_zamani: simpleNote.hazirlik_zamani || null,
      hazirlik_iso: simpleNote.hazirlik_iso || null,
      action_items: simpleNote.action_items || [],
      anomali_notu: simpleNote.anomali_notu || null,
      ikon: icon,
      renk: color,
      sesli_fisilti: voiceWhisper,
      periyodik: simpleNote.periyodik || null,
      tetikleyici: simpleNote.tetikleyici || null,
    },
    sesli_fisilti: voiceWhisper,
    source: 'deterministic-dispatcher',
  };
}

// Full Gemini Tool-Calling Autonomous Dispatcher
export async function dispatchWithGemini(input: string, currentDatetime: string): Promise<DispatchResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return dispatchDeterministic(input, currentDatetime);
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

    const userPrompt = `Kullanıcı Girdisi: "${input}"\nCURRENT_DATETIME: ${currentDatetime}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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

    const functionCalls = response.functionCalls;
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
      }

      return {
        tool: toolName,
        arguments: args,
        sesli_fisilti: fisilti,
        source: 'gemini-2.5-flash-tools',
      };
    }

    // Fallback if no function call emitted
    return dispatchDeterministic(input, currentDatetime);
  } catch (err) {
    console.warn('[Gemini Dispatcher Fallback]:', err);
    return dispatchDeterministic(input, currentDatetime);
  }
}
