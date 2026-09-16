import { GoogleGenAI, Type } from '@google/genai';
import type { NotiviaParsedNote, NotiviaCategory, NotiviaPriority, NotiviaSimpleNote } from '../types/notivia.ts';
import { extractSimpleNoteFromText } from '../utils/simpleNote.ts';

const SYSTEM_INSTRUCTION = `Sen "Notivia" adlı bilişsel yaşam asistanının çekirdek niyet çözümleme ve veri ayrıştırma (parser) motorusun.
Görevin: Kullanıcının ayaküstü, devrik, dağınık, imalı veya sesle kaydedilmiş girdilerini analiz etmek; söylenmeyen gereksinimleri ("leb demeden leblebiyi anlayarak") alt görevlere dönüştürmek ve arayüzde görselleştirilmeye hazır katı bir JSON nesnesi üretmektir.

GÖREV: Kullanıcının yeni girdisini ve varsa verilen 'GEÇMİŞ NOTLAR' listesini karşılaştır.

GÖREV VE ANLAM AYRIŞTIRMA KURALLARI:
1. Kişi İsimleri ve Eylem Ayrımı:
   - Girdide bir kişi adı geçmesi (Ahmet, Mehmet vb.) o kişinin ziyaret edileceği anlamına GELMEZ.
   - "Ahmet'ten alacağım var", "Mehmet'e borç verdim" gibi ifadeler KESİNLİKLE 'Finans' kategorisidir. Başlığı "Buluşma" veya "Ziyaret" yapma; doğrudan "Alacak Takibi" veya "Borç Takibi" yap.
   - İkon: Alacak/borç için '💰' veya '💳' kullan.
   - Zaman: Kesin bir tarih veya vade söylenmediyse zamanı null bırak; takvime rastgele çay randevusu yazma.

ÖRÜNTÜ VE ANOMALİ KURALLARI:
1. Anomali Tespiti: Normalde uzun aralıklarla yapılması gereken bir bakım/işlem (örn: kombiye su basma, akü şarjı, arıza tamiri) son 30 gün içinde birden fazla tekrarlanmışsa teknik bir sorun olduğunu sez ve "anomali_notu" üret.
2. Rutin Keşfi: Düzenli tekrarlanan bir sosyal veya kişisel alışkanlık sezersen ortalama döngüyü çıkar.
3. Çıktı: Sorun veya rutin yoksa null dön; varsa tek cümlelik zeki bir gözlem yaz.

TEMEL YÖNERGELER:

1. Referans Zaman ve Hesaplama (CURRENT_DATETIME):
- Kullanıcı girdisinin başında sağlanan ISO-8601 referans saatini baz al.
- "Yarın akşam", "haftaya pazartesi", "üç ay sonra" gibi tüm izafi ifadeleri kesin ISO-8601 biçimine (YYYY-MM-DDTHH:mm:ss) dönüştür.
- Saat açıkça belirtilmemişse bağlama uygun varsayılan ata (Sabah: 09:00, Öğle: 13:00, Akşam: 19:00, Gece: 21:30).

2. Bilişsel Çıkarım (İma Edileni Ayrıştırma):
- Belirtilen ana işin arkasındaki gizli gereksinimleri yakala ve "action_items" dizisine ekle (Örn: "Salı günü arabayı muayeneye götüreceğim" -> Alt görevler: "Ruhsat ve sigorta evraklarını kontrol et", "İlk yardım çantasını ve yangın tüpünü kontrol et", "TÜVTÜRK muayene randevusunu teyit et").
- Kaydın tipini belirle: Basit not mu, takvim randevusu mu, yoksa belirli aralıklarla tekrarlanan periyodik bir döngü mü?

3. Arayüz ve Görselleştirme (UI Meta):
- Notun konusunu ve ruhunu tek bakışta anlatan 1-2 emoji seç.
- Kartın arka planı için modern pastel HEX renk kodu üret:
  * İş / Resmi: #E0F2FE (Pastel Mavi)
  * Sosyal / Buluşma: #DCFCE7 (Pastel Yeşil)
  * Bakım / Rutin / Tamir: #FEF3C7 (Pastel Sarı)
  * Acil / Kritik: #FEE2E2 (Pastel Kırmızı)
  * Kişisel / Sağlık: #F3E8FF (Pastel Mor)
- Kart üzerinde görünecek 1-2 kelimelik durum rozeti ("badge_text") oluştur (Örn: "Randevu", "Periyodik Kontrol", "Acil Görev", "Araç Muayenesi", "Finansal Hatırlatma").

4. Çıktı Biçimi:
- Yalnızca aşağıdaki JSON şemasına harfiyen uyan ham JSON nesnesi üret. Markdown formatı (\`\`\`json) veya fazladan açıklama metni ekleme.`;

export async function parseWithGemini(
  userInput: string,
  currentDatetime: string,
  pastNotes?: any[]
): Promise<{ data: Omit<NotiviaParsedNote, 'id' | 'created_at' | 'raw_input' | 'reference_datetime'>; source: string }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
    const candidateModels = [
      'gemini-2.5-flash',
      'gemini-2.5-pro',
      'gemini-flash-latest'
    ];
    for (const modelName of candidateModels) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const historyContext = pastNotes && pastNotes.length > 0
          ? `\nGEÇMİŞ NOTLAR:\n${JSON.stringify(pastNotes.slice(0, 20).map((n) => ({ baslik: n.baslik, zaman: n.zaman, tarih_iso: n.tarih_iso, createdAt: n.createdAt })), null, 2)}`
          : '';

        const promptText = `CURRENT_DATETIME: ${currentDatetime}${historyContext}\nKULLANICI GİRDİSİ: ${userInput}`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: promptText,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            temperature: 0.2,
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                summary: {
                  type: Type.STRING,
                  description: 'Kısa ve vurucu başlık (Maksimum 5 kelime)',
                },
                detailed_note: {
                  type: Type.STRING,
                  description: 'Girdinin anlaşılır, toparlanmış Türkçe özeti',
                },
                category: {
                  type: Type.STRING,
                  description: 'Sosyal | İş | Bakım & Onarım | Ev & Yaşam | Sağlık | Finans | Genel',
                },
                priority: {
                  type: Type.STRING,
                  description: 'dusuk | normal | yuksek | kritik',
                },
                anomali_notu: {
                  type: Type.STRING,
                  description: 'Kısa zeka tespiti veya null (Örn: Son 20 günde 3. kez su basıldı, tesisatta kaçak olabilir.)',
                },
                ui_meta: {
                  type: Type.OBJECT,
                  properties: {
                    icon: { type: Type.STRING, description: 'İçeriği temsil eden 1-2 emoji' },
                    color_hex: { type: Type.STRING, description: 'Pastel kart rengi HEX kodu' },
                    badge_text: { type: Type.STRING, description: 'Kısa durum rozeti' },
                  },
                  required: ['icon', 'color_hex', 'badge_text'],
                },
                calendar_event: {
                  type: Type.OBJECT,
                  properties: {
                    has_event: { type: Type.BOOLEAN },
                    title: { type: Type.STRING },
                    start_datetime: { type: Type.STRING },
                    end_datetime: { type: Type.STRING },
                    is_all_day: { type: Type.BOOLEAN },
                    location: { type: Type.STRING },
                  },
                  required: ['has_event', 'title', 'is_all_day'],
                },
                action_items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      task: { type: Type.STRING, description: 'Somut alt işlem adımı' },
                      is_completed: { type: Type.BOOLEAN },
                    },
                    required: ['task', 'is_completed'],
                  },
                },
                notification: {
                  type: Type.OBJECT,
                  properties: {
                    needs_reminder: { type: Type.BOOLEAN },
                    remind_at: { type: Type.STRING },
                    notification_text: { type: Type.STRING },
                  },
                  required: ['needs_reminder', 'notification_text'],
                },
                periodic_log: {
                  type: Type.OBJECT,
                  properties: {
                    is_periodic: { type: Type.BOOLEAN },
                    interval_days: { type: Type.INTEGER },
                    next_due_date: { type: Type.STRING },
                  },
                  required: ['is_periodic'],
                },
              },
              required: [
                'summary',
                'detailed_note',
                'category',
                'priority',
                'ui_meta',
                'calendar_event',
                'action_items',
                'notification',
                'periodic_log',
              ],
            },
          },
        });

        const text = response.text;
        if (text) {
          const cleanJson = text.replace(/```json/gi, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleanJson);
          return {
            data: sanitizeParsedOutput(parsed),
            source: modelName,
          };
        }
      } catch {
        continue;
      }
    }
  }

  return {
    data: runCognitiveFallback(userInput, currentDatetime, pastNotes),
    source: 'cognitive-fallback',
  };
}

function sanitizeParsedOutput(raw: any): Omit<NotiviaParsedNote, 'id' | 'created_at' | 'raw_input' | 'reference_datetime'> {
  const validCategories: NotiviaCategory[] = [
    'Sosyal',
    'İş',
    'Bakım & Onarım',
    'Ev & Yaşam',
    'Sağlık',
    'Finans',
    'Genel',
  ];
  const validPriorities: NotiviaPriority[] = ['dusuk', 'normal', 'yuksek', 'kritik'];

  const category: NotiviaCategory = validCategories.includes(raw.category) ? raw.category : 'Genel';
  const priority: NotiviaPriority = validPriorities.includes(raw.priority) ? raw.priority : 'normal';

  return {
    summary: String(raw.summary || 'Yeni Bilişsel Kayıt').slice(0, 100),
    detailed_note: String(raw.detailed_note || ''),
    category,
    priority,
    anomali_notu: raw.anomali_notu ? String(raw.anomali_notu) : null,
    ui_meta: {
      icon: String(raw.ui_meta?.icon || '📝'),
      color_hex: String(raw.ui_meta?.color_hex || '#E0F2FE'),
      badge_text: String(raw.ui_meta?.badge_text || 'Not'),
    },
    calendar_event: {
      has_event: Boolean(raw.calendar_event?.has_event),
      title: String(raw.calendar_event?.title || raw.summary || 'Etkinlik'),
      start_datetime: raw.calendar_event?.start_datetime || null,
      end_datetime: raw.calendar_event?.end_datetime || null,
      is_all_day: Boolean(raw.calendar_event?.is_all_day),
      location: raw.calendar_event?.location || null,
    },
    action_items: Array.isArray(raw.action_items)
      ? raw.action_items.map((item: any) => ({
          task: String(item?.task || ''),
          is_completed: Boolean(item?.is_completed),
        }))
      : [],
    notification: {
      needs_reminder: Boolean(raw.notification?.needs_reminder),
      remind_at: raw.notification?.remind_at || null,
      notification_text: String(raw.notification?.notification_text || ''),
    },
    periodic_log: {
      is_periodic: Boolean(raw.periodic_log?.is_periodic),
      interval_days: typeof raw.periodic_log?.interval_days === 'number' ? raw.periodic_log.interval_days : null,
      next_due_date: raw.periodic_log?.next_due_date || null,
    },
  };
}

/**
 * Intelligent rule-based cognitive parser implementing the exact Notivia instructions
 * Handles relative dates, cognitive "leb demeden leblebi" inferences, UI meta color mapping,
 * calendar events, and periodic logs.
 */
export function runCognitiveFallback(
  input: string,
  currentDatetime: string,
  pastNotes?: any[]
): Omit<NotiviaParsedNote, 'id' | 'created_at' | 'raw_input' | 'reference_datetime'> {
  const refDate = new Date(currentDatetime);
  const lower = input.toLowerCase();

  // 1. Calculate Target Date and Time
  const targetDate = new Date(refDate.getTime());
  let hasSpecificTime = false;
  let isAllDay = false;
  let hasEvent = false;
  let location: string | null = null;
  let isPeriodic = false;
  let intervalDays: number | null = null;
  let nextDueDate: string | null = null;

  // Periodic interval detection
  if (lower.includes('ayda bir') || lower.includes('ayda 1') || lower.includes('aylık') || lower.includes('her ay')) {
    isPeriodic = true;
    const matchMonth = lower.match(/(\d+)\s*ayda\s*bir/);
    const months = matchMonth ? parseInt(matchMonth[1], 10) : 1;
    intervalDays = months * 30;
    const next = new Date(refDate.getTime() + intervalDays * 24 * 60 * 60 * 1000);
    nextDueDate = next.toISOString();
  } else if (lower.includes('haftada bir') || lower.includes('her hafta')) {
    isPeriodic = true;
    intervalDays = 7;
    const next = new Date(refDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    nextDueDate = next.toISOString();
  } else if (lower.includes('yılda bir') || lower.includes('her yıl') || lower.includes('senelik') || lower.includes('yıllık')) {
    isPeriodic = true;
    intervalDays = 365;
    const next = new Date(refDate.getTime() + 365 * 24 * 60 * 60 * 1000);
    nextDueDate = next.toISOString();
  } else if (lower.includes('günlük') || lower.includes('her gün')) {
    isPeriodic = true;
    intervalDays = 1;
    const next = new Date(refDate.getTime() + 24 * 60 * 60 * 1000);
    nextDueDate = next.toISOString();
  }

  // Relative Date detection
  if (lower.includes('bugün')) {
    hasEvent = true;
  } else if (lower.includes('yarın')) {
    targetDate.setDate(targetDate.getDate() + 1);
    hasEvent = true;
  } else if (lower.includes('öbür gün') || lower.includes('öbürgün')) {
    targetDate.setDate(targetDate.getDate() + 2);
    hasEvent = true;
  } else if (lower.includes('haftaya') || lower.includes('gelecek hafta')) {
    targetDate.setDate(targetDate.getDate() + 7);
    hasEvent = true;
  } else {
    // Check for "X gün sonra", "X hafta sonra", "X ay sonra"
    const gunSonra = lower.match(/(\d+)\s*gün\s*sonra/);
    const haftaSonra = lower.match(/(\d+)\s*hafta\s*sonra/);
    const aySonra = lower.match(/(\d+)\s*ay\s*sonra/);

    if (gunSonra) {
      targetDate.setDate(targetDate.getDate() + parseInt(gunSonra[1], 10));
      hasEvent = true;
    } else if (haftaSonra) {
      targetDate.setDate(targetDate.getDate() + parseInt(haftaSonra[1], 10) * 7);
      hasEvent = true;
    } else if (aySonra) {
      targetDate.setMonth(targetDate.getMonth() + parseInt(aySonra[1], 10));
      hasEvent = true;
    }
  }

  // Day of week detection
  const daysMap: Record<string, number> = {
    pazartesi: 1,
    salı: 2,
    çarşamba: 3,
    perşembe: 4,
    cuma: 5,
    cumartesi: 6,
    pazar: 0,
  };

  for (const [dayName, dayIndex] of Object.entries(daysMap)) {
    if (lower.includes(dayName)) {
      hasEvent = true;
      const currentDay = targetDate.getDay();
      let distance = dayIndex - currentDay;
      if (distance <= 0) {
        distance += 7;
      }
      targetDate.setDate(targetDate.getDate() + distance);
      break;
    }
  }

  // Time of Day defaults (as instructed: Sabah: 09:00, Öğle: 13:00, Akşam: 19:00, Gece: 21:30)
  if (lower.includes('sabah')) {
    targetDate.setHours(9, 0, 0, 0);
    hasSpecificTime = true;
  } else if (lower.includes('öğlen') || lower.includes('öğle') || lower.includes('öğleden sonra')) {
    targetDate.setHours(13, 0, 0, 0);
    hasSpecificTime = true;
  } else if (lower.includes('akşam')) {
    targetDate.setHours(19, 0, 0, 0);
    hasSpecificTime = true;
  } else if (lower.includes('gece')) {
    targetDate.setHours(21, 30, 0, 0);
    hasSpecificTime = true;
  } else {
    // Check for explicit time like 14:00, 15.30, saat 3'te
    const timeMatch = lower.match(/(?:saat\s*)?(\d{1,2})[:.](\d{2})/) || lower.match(/saat\s*(\d{1,2})/);
    if (timeMatch) {
      const hour = parseInt(timeMatch[1], 10);
      const min = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
      targetDate.setHours(hour, min, 0, 0);
      hasSpecificTime = true;
      hasEvent = true;
    } else if (hasEvent) {
      // Default to 13:00 if an event date was scheduled without specific hour
      targetDate.setHours(13, 0, 0, 0);
    } else {
      isAllDay = true;
    }
  }

  const startDatetime = hasEvent ? targetDate.toISOString() : null;
  let endDatetime: string | null = null;
  if (hasEvent && startDatetime) {
    const end = new Date(targetDate.getTime() + 60 * 60 * 1000); // 1 hour standard slot
    endDatetime = end.toISOString();
  }

  // Categories and UI Meta Palettes as instructed:
  // İş / Resmi: #E0F2FE (Pastel Mavi)
  // Sosyal / Buluşma: #DCFCE7 (Pastel Yeşil)
  // Bakım / Rutin / Tamir: #FEF3C7 (Pastel Sarı)
  // Acil / Kritik: #FEE2E2 (Pastel Kırmızı)
  // Kişisel / Sağlık: #F3E8FF (Pastel Mor)

  let category: NotiviaCategory = 'Genel';
  let priority: NotiviaPriority = 'normal';
  let icon = '📝';
  let colorHex = '#E0F2FE';
  let badgeText = 'Kayıt';
  let summary = 'Bilişsel Yaşam Notu';
  let detailedNote = `"${input}" ifadesi bilişsel olarak analiz edildi. İma edilen tüm alt gereksinimler çıkartıldı.`;
  const actionItems: { task: string; is_completed: boolean }[] = [];

  // Scenario: Toplantı / Müdür / Kurul / Resmi Görüşme
  if (lower.includes('toplantı') || lower.includes('toplanti') || lower.includes('müdür') || lower.includes('veli') || lower.includes('kurul') || lower.includes('görüşme')) {
    category = 'İş';
    priority = 'yuksek';
    icon = '🤝 📋';
    colorHex = '#E0F2FE'; // Pastel Mavi
    badgeText = 'Toplantı';
    summary = lower.includes('müdür') ? 'Müdürle Toplantı' : (lower.includes('veli') ? 'Veli Toplantısı' : 'Toplantı Randevusu');
    hasEvent = true;
    detailedNote = `${summary} planlandı. Toplantı gündem maddeleri, ilgili evraklar ve notlar alt adımlara ayrıştırıldı.`;
    actionItems.push(
      { task: 'Toplantı gündem maddelerini ve görüşülecek konuları hazırla', is_completed: false },
      { task: 'Gerekli evrak, dosya veya rapor çıktılarını hazır bulundur', is_completed: false },
      { task: 'Gündemle ilgili geçmiş notları gözden geçir', is_completed: false }
    );
  }
  // Scenario: Araç Muayenesi / Otomotiv
  else if (lower.includes('muayene') || lower.includes('araba') || lower.includes('tüvtürk') || lower.includes('araç')) {
    category = 'Bakım & Onarım';
    priority = 'yuksek';
    icon = '🚗 🔧';
    colorHex = '#FEF3C7'; // Pastel Sarı
    badgeText = 'Araç Muayenesi';
    summary = 'Araç Muayene & Evrak Hazırlığı';
    hasEvent = true;
    location = 'TÜVTÜRK Muayene İstasyonu';
    detailedNote = 'Otomobil muayene süreci planlandı. TÜVTÜRK standartlarına göre zorunlu ekipmanlar, borç kontrolleri ve araç evrakları kontrol listesine eklendi.';
    actionItems.push(
      { task: 'Ruhsat ve geçerli trafik sigortası poliçesini araç torpidosunda kontrol et', is_completed: false },
      { task: 'İlk yardım çantası, yangın tüpü ve reflektör üçgenini kontrol et', is_completed: false },
      { task: 'TÜVTÜRK muayene randevu saatini ve egzoz pulu geçerlilik tarihini teyit et', is_completed: false },
      { task: 'Vergi Dairesi ve Gelir İdaresi üzerinden MTV ve trafik cezası borcu sorgula', is_completed: false },
      { task: 'Kısa/uzun farlar, fren lambaları, sinyaller ve silecek lastiklerini test et', is_completed: false }
    );
  }
  // Scenario: Evcil Hayvan / Parazit / Veteriner
  else if (lower.includes('kedi') || lower.includes('köpek') || lower.includes('parazit') || lower.includes('veteriner') || lower.includes('aşı')) {
    category = 'Sağlık';
    priority = 'normal';
    icon = '🐱 💉';
    colorHex = '#F3E8FF'; // Pastel Mor
    badgeText = isPeriodic ? 'Periyodik Kontrol' : 'Veteriner Randevusu';
    summary = 'Evcil Hayvan Parazit & Sağlık Rutini';
    location = 'Veteriner Kliniği';
    detailedNote = 'Evcil hayvan parazit ve koruma döngüsü kaydedildi. İlaç uygulama prosedürleri ve periyodik yenileme takvime işlendi.';
    actionItems.push(
      { task: 'İç ve dış parazit damla/tablet stokunu ve son kullanma tarihini kontrol et', is_completed: false },
      { task: 'Aşı karnesindeki son uygulama geçmişini incele', is_completed: false },
      { task: 'Damlama uygulamasından sonraki 48 saat boyunca hayvanı yıkama', is_completed: false },
      { task: 'Veteriner hekime kilo tartımı ve genel deri kontrolü yaptır', is_completed: false }
    );
  }
  // Scenario: Halı Saha / Spor / Sosyal
  else if (lower.includes('halı saha') || lower.includes('futbol') || lower.includes('maç') || lower.includes('basket') || lower.includes('arkadaş') || lower.includes('ahmet')) {
    category = 'Sosyal';
    priority = 'normal';
    icon = '⚽ 👟';
    colorHex = '#DCFCE7'; // Pastel Yeşil
    badgeText = 'Sosyal Etkinlik';
    summary = 'Halı Saha Maçı & Ekipman';
    hasEvent = true;
    location = 'Halı Saha Spor Tesisi';
    detailedNote = 'Spor etkinliği için tarih ve saat netleştirildi. Gerekli kıyafet yıkama ve saha hazırlığı alt görevlere dönüştürüldü.';
    actionItems.push(
      { task: 'Forma, halı saha ayakkabısı ve tozlukları yıkayıp havalandır', is_completed: false },
      { task: 'Yedek tişört, banyo havlusu ve su matarasını spor çantasına yerleştir', is_completed: false },
      { task: 'Takım WhatsApp grubunda eksik oyuncu ve saha ücreti paylaşımını teyit et', is_completed: false }
    );
  }
  // Scenario: Sağlık / Doktor / Diş
  else if (lower.includes('doktor') || lower.includes('diş') || lower.includes('hastane') || lower.includes('tahlil') || lower.includes('sağlık')) {
    category = 'Sağlık';
    priority = 'yuksek';
    icon = '🩺 🦷';
    colorHex = '#F3E8FF'; // Pastel Mor
    badgeText = 'Tıbbi Randevu';
    summary = 'Sağlık & Diş Kontrolü';
    hasEvent = true;
    location = 'Sağlık Kuruluşu';
    detailedNote = 'Sağlık randevusu için takvim kaydı oluşturuldu. Randevu öncesi tahlil, kimlik ve evrak hazırlıkları listelendi.';
    actionItems.push(
      { task: 'T.C. Kimlik kartını ve varsa önceki tetkik/film sonuçlarını yanına al', is_completed: false },
      { task: 'Randevu saatinden önce açlık/tokluk şartını kliniğe sorarak teyit et', is_completed: false },
      { task: 'Düzenli kullanılan ilaçların veya takviyelerin listesini hazırla', is_completed: false }
    );
  }
  // Scenario: Pasaport / Vize / Resmi İş
  else if (lower.includes('pasaport') || lower.includes('vize') || lower.includes('nüfus') || lower.includes('noter') || lower.includes('tapu') || lower.includes('resmi')) {
    category = 'İş';
    priority = 'yuksek';
    icon = '🛂 📄';
    colorHex = '#E0F2FE'; // Pastel Mavi
    badgeText = 'Resmi Başvuru';
    summary = 'Pasaport & Resmi Evrak Başvurusu';
    hasEvent = true;
    location = 'Nüfus ve Vatandaşlık İşleri Müdürlüğü';
    detailedNote = 'Resmi kurum randevusu takvime işlendi. Harç yatırma, biyometrik fotoğraf ve kimlik evrakları alt adımlara ayrıştırıldı.';
    actionItems.push(
      { task: 'Pasaport defter ve harç bedelini internet vergi dairesinden yatırıp dekontu kaydet', is_completed: false },
      { task: 'Son 6 ay içinde ICAO standartlarında çekilmiş 2 adet biyometrik fotoğraf temin et', is_completed: false },
      { task: 'Eski pasaportu ve T.C. kimlik kartını asıllarıyla birlikte hazırla', is_completed: false },
      { task: 'Randevu saatinden en az 15 dakika önce kurum adresinde bulun', is_completed: false }
    );
  }
  // Scenario: Kombi / Tesisat / Ev Bakımı
  else if (lower.includes('kombi') || lower.includes('klima') || lower.includes('bakım') || lower.includes('tamir') || lower.includes('servis')) {
    category = 'Bakım & Onarım';
    priority = 'normal';
    icon = '❄️ 🔧';
    colorHex = '#FEF3C7'; // Pastel Sarı
    badgeText = 'Periyodik Kontrol';
    summary = 'Kombi ve Isıtma Bakımı';
    hasEvent = true;
    detailedNote = 'Kış öncesi kombi/tesisat bakım servisi planlandı. Basınç testi, petek havası ve servis evrakları listelendi.';
    actionItems.push(
      { task: 'Yetkili servis ile randevu tarihi ve servis ücretini netleştir', is_completed: false },
      { task: 'Kombi bar göstergesini kontrol et (ideal aralık: 1.5 bar)', is_completed: false },
      { task: 'Tüm radyatörlerin hava alma anahtarını ve tahliye kabını hazırla', is_completed: false },
      { task: 'Kombi garanti belgesi veya önceki bakım formunu servis için çıkar', is_completed: false }
    );
  }
  // Scenario: Finans / Kredi Kartı / Maaş
  else if (lower.includes('kredi kartı') || lower.includes('maaş') || lower.includes('fatura') || lower.includes('vadeli') || lower.includes('borç') || lower.includes('para')) {
    category = 'Finans';
    priority = 'yuksek';
    icon = '💳 📈';
    colorHex = '#E0F2FE'; // Pastel Mavi
    badgeText = 'Finansal Plan';
    summary = 'Kredi Kartı ve Tasarruf Yönetimi';
    detailedNote = 'Finansal nakit akışı organize edildi. Kredi kartı ekstre kapaması, birikim aktarımı ve otomatik faturalar planlandı.';
    actionItems.push(
      { task: 'Kredi kartı ekstre son ödeme tarihini ve asgari ödeme tutarını doğrula', is_completed: false },
      { task: 'Maaş hesabından belirlenen tasarruf miktarını vadeli hesaba aktar', is_completed: false },
      { task: 'Otomatik fatura ödeme talimatlarının bakiye durumunu kontrol et', is_completed: false }
    );
  }
  // Scenario: Acil / Kritik
  else if (lower.includes('acil') || lower.includes('kritik') || lower.includes('hemen') || lower.includes('derhal')) {
    category = 'Genel';
    priority = 'kritik';
    icon = '🚨 ⚡';
    colorHex = '#FEE2E2'; // Pastel Kırmızı
    badgeText = 'Acil Görev';
    summary = input.split(' ').slice(0, 5).join(' ');
    detailedNote = 'Yüksek öncelikli acil kayıt oluşturuldu. Gerekli aksiyonların ivedilikle ele alınması hedeflendi.';
    actionItems.push(
      { task: 'En acil engeli veya ilk adımı derhal gerçekleştir', is_completed: false },
      { task: 'Süreç paydaşlarını veya ilgili kişileri hemen bilgilendir', is_completed: false }
    );
  }
  // Generic Fallback
  else {
    category = 'Ev & Yaşam';
    priority = 'normal';
    icon = '📌 ✨';
    colorHex = '#DCFCE7'; // Pastel Yeşil
    badgeText = 'Kişisel Görev';
    const words = input.split(' ').slice(0, 5);
    summary = words.length > 0 ? words.join(' ') : 'Günlük Yaşam Görevi';
    detailedNote = `"${input}" ifadesi bilişsel asistan Notivia tarafından analiz edildi. İlgili aksiyon maddeleri yapılandırıldı.`;
    actionItems.push(
      { task: 'Görev kapsamındaki ihtiyaçları ve ön hazırlıkları tamamla', is_completed: false },
      { task: 'Gerekli irtibatları ve randevuları doğrula', is_completed: false }
    );
  }

  // Notification configuration
  let remindAt: string | null = null;
  let notificationText = `${summary} için planlanan zaman yaklaşıyor.`;
  if (hasEvent && startDatetime) {
    const rem = new Date(new Date(startDatetime).getTime() - 2 * 60 * 60 * 1000); // 2 hours before
    remindAt = rem.toISOString();
    notificationText = `${summary}: Hazırlık adımlarını tamamlayın ve takvimdeki randevuya hazırlanın.`;
  }

  return {
    summary: summary.slice(0, 50),
    detailed_note: detailedNote,
    category,
    priority,
    ui_meta: {
      icon,
      color_hex: colorHex,
      badge_text: badgeText,
    },
    calendar_event: {
      has_event: hasEvent,
      title: summary,
      start_datetime: startDatetime,
      end_datetime: endDatetime,
      is_all_day: isAllDay,
      location,
    },
    action_items: actionItems,
    notification: {
      needs_reminder: hasEvent || isPeriodic,
      remind_at: remindAt,
      notification_text: notificationText,
    },
    periodic_log: {
      is_periodic: isPeriodic,
      interval_days: intervalDays,
      next_due_date: nextDueDate,
    },
  };
}

/**
 * Parses user input using the exact prompt and 5-field schema specified by the user:
 * {
 *   "baslik": "Kısa eylem başlığı (max 4 kelime)",
 *   "zaman": "Arayüzde görünecek sade ifade (örn: Salı 19:00, 6 ay sonra)",
 *   "tarih_iso": "Belirli bir gün/saat varsa ISO-8601 (YYYY-MM-DDTHH:mm:ss) formatı, yoksa null",
 *   "ikon": "tek emoji",
 *   "renk": "pastel hex (örn: #FEF3C7, #E0F2FE, #DCFCE7)"
 * }
 */
export async function parseSimpleWithGemini(
  text: string,
  now: string,
  pastNotes?: any[]
): Promise<NotiviaSimpleNote> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
    const candidateModels = [
      'gemini-2.5-flash',
      'gemini-2.5-pro',
      'gemini-flash-latest'
    ];
    for (const modelName of candidateModels) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const historyContext = pastNotes && pastNotes.length > 0
          ? `\nGEÇMİŞ NOTLAR:\n${JSON.stringify(pastNotes.slice(0, 20).map((n) => ({ baslik: n.baslik, zaman: n.zaman, tarih_iso: n.tarih_iso, createdAt: n.createdAt })), null, 2)}`
          : '';

        const prompt = `Sen Notivia'nın Türkçe Dilbilgisi ve Semantik Niyet Çözümleme Motorusun.
Görevin: Kullanıcının doğal Türkçe ifadelerini "Özne - Nesne/Meblağ - Yüklem/Eylem" çözümlemesine tabi tutarak katı JSON üretmek.

TEMEL SÖZDİZİMİ VE ANLAM KURALLARI:

1. İsmin Halleri ve Finansal Rol Dağılımı:
   - İsmin Yönelme Hali (-e, -a): Hedef muhataptır, giden bir değeri ifade eder. ("Ali hocaya 750 at"). Başlığı KESİNLİKLE "Kişi: Meblağ Ödeme" formatında yap (Örn: "Ali: 750 Ödeme"). Renk: #FEE2E2, İkon: 💳.
   - İsmin Ayrılma Hali (-den, -dan): Kaynak muhataptır, gelen bir değeri ifade eder. ("Ahmet abiden 5000 alacağım var"). Başlığı KESİNLİKLE "Kişi: Meblağ Alacak" formatında yap (Örn: "Ahmet: 5000 Alacak"). Renk: #DCFCE7, İkon: 💰.
   - Vade belirtilmemişse "tarih_iso": null dön; rastgele takvim randevusu oluşturma.

2. Kurumsal ve Üçüncü Şahıs Bildirimleri (Tersine Zamanlama):
   - Cümlenin öznesi resmi bir makam veya olay ise ("Müfettişler denetleyecek", "Bakan gelecek", "Sular kesilecek"), kullanıcı pasif etkilenendir.
   - Bu girdileri kullanıcının yapması gereken hazırlık olarak yapılandır ("📁 Müfettiş Evrak Denetimi").
   - Etkinlik gününden bir önceki ikindi vaktine (16:00) "hazirlik_zamani" ve "hazirlik_iso" üret.

3. Koşul ve Tetikleyiciler (Triggers):
   - "Maaş yatınca", "Sanayiye yolum düşünce", "Toplantıda", "Havalar soğuyunca" gibi şart bildiren yapılarda "tarih_iso": null bırak.
   - Bu şartı "tetikleyici" alanına yaz:
     { "tip": "finansal"|"mekan"|"kisi"|"durum", "sart": "Olay adı", "etiket": "⚡ Maaş Gününde" }

4. Sağlık ve Reçete Eylemleri:
   - "Günde X kez tok karnına", "Doktor iç dedi" ifadelerinde eylem medikal takiptir ("💊 İlaç Takibi (3x1 Tok)").

5. Zaman, Hatırlatıcı ve Periyodik Çözümleme Kuralları:
   - Göreceli Gün Çözümlemesi: "CURRENT_DATETIME" değerini referans alarak "yarın", "pazartesi", "haftaya cuma" gibi ifadeleri kesin YYYY-MM-DD formatına dönüştür.
   - Periyodik ve Döngüsel İfadeler: "Her ay sonu", "her ayın son haftası", "her ay", "ayda bir", "her hafta" gibi tekrarlayan eylemlerde "periyodik" nesnesi oluştur:
     { "tip": "aylik_son_hafta"|"aylik"|"haftalik"|"gunluk", "aralik_gun": 30 }
     "tarih_iso" alanına İÇİNDE BULUNULAN VEYA EN YAKIN AYIN SON İŞ GÜNÜNÜ (örn: son Cuma 10:00) ISO-8601 olarak ata. "zaman" alanına "Her Ay Sonu (Son Hafta)" veya ilgili döngüyü yaz.
   - Saat Belirtilmemişse Varsayılan Ekle: Kullanıcı "yarın randevu", "cuma veli toplantısı" gibi bir gün belirtip SAAT BELİRTMEDİYSE: "tarih_iso" alanını kesinlikle boş (null) bırakma. Standart iş/eylem saati olarak 09:00:00 ata. "zaman" etiketine "Yarın 09:00" yaz.
   - Randevu ve Hatırlatıcı İfadeleri: Cümlede "randevu", "toplantı", "görüşme", "teslim", "kontrol" gibi kelimeler geçiyorsa bu doğrudan bir takvim eylemidir.

6. Predictive Action Graph (Leb Demeden Anlama & Ön Hazırlık Çıkarımı):
   - Kullanıcı bir eylem veya randevu belirttiğinde, o olayın gerçekleşebilmesi için gereken görünmez ön adımları "action_items" olarak üret.
   - Örnekler:
     * Pasaport/Vize: ["Harç ve defter bedeli dekontu", "2 adet biyometrik fotoğraf", "Eski pasaport ve kimlik kartı"]
     * Uçak/Seyahat: ["Online check-in yap ve biniş kartını al", "Kimlik/pasaport kontrolü", "Kabin bagajı sıvı kuralları"]
     * Araç Muayenesi: ["Trafik sigortası poliçesi", "MTV ve ceza borcu sorgula", "İlk yardım çantası ve yangın tüpü"]
     * Doktor/Kan Tahlili: ["10-12 saatlik açlık kuralı", "Su dışında bir şey tüketme", "Eski tahlil sonuçlarını yanına al"]
     * Mülakat/Sunum: ["Şirket araştırması ve ürün incelemesi", "CV ve portfolyo linkleri", "Mikrofon/kamera testi"]
   - "anomali_notu": Kullanıcının hayatını kolaylaştıracak tek cümlelik proaktif ipucu veya uyarı.
   - "hazirlik_zamani": Ana eylemden önce yapılması gereken hazırlık hatırlatma zamanı (örn: "1 Gün Önce 17:00", "24 Saat Önce").

7. Kısa & Eksik Girdi Çözümleme (2-3 Kelimeden Tam Niyet Çıkarımı):
   - Kullanıcı devrik, özensiz veya sadece 2-3 kelime yazsa dahi ("klima temizlik", "muayene", "kombi bar", "filtre değiştim", "tahlil sabah", "fatura kes", "tapu harcı"):
   - Asla "Not" veya "Randevu" gibi sığ başlıklar üretme. O alandaki uzman bir yönetici asistanı gibi derin niyetini anla:
     * "klima temizlik" -> Başlık: "Klima Filtre & Sezon Bakımı", İkon: "❄️", Renk: "#E0F2FE", action_items: ["Toz filtrelerini çıkarıp ılık suyla yıka", "Evaporatör dezenfektan sprey sık", "Tahliye hortumunu kontrol et"].
     * "kombi bar" -> Başlık: "Kombi Su Basınç Dengeleme", İkon: "🔧", Renk: "#FEF3C7", anomali_notu: "💡 İdeal basınç 1.2 - 1.5 Bar arasıdır.", action_items: ["Alt doldurma musluğuyla suyu 1.5 bara getir", "Petek havasını al"].
     * "tahlil sabah" -> Başlık: "Kan Tahlili & Açlık Takibi", İkon: "🩸", anomali_notu: "💡 10-12 saat açlık şarttır.", action_items: ["Akşam 22:00 sonrası yemek ve çayı kes", "Sabah sadece su iç"].
     * "fatura kes" -> Başlık: "E-Arşiv Fatura Kesimi", İkon: "🧾", Renk: "#DCFCE7", action_items: ["Müşteri vergi ve unvanını doğrula", "GİB portalından e-arşiv taslağı oluştur"].
   - Kullanıcının eksik bıraktığı tüm alanları senaryo uzmanlığıyla kusursuz tamamla.

Referans Zaman (CURRENT_DATETIME): ${now}.${historyContext}

Kullanıcı girdisi: "${text}".

ÇIKTI ŞEMASI (Katı JSON üret, markdown veya açıklama ekleme):
{
  "ozne": "Cümlenin öznesi veya muhatap",
  "nesne": "İşleme konu olan meblağ, eşya veya evrak",
  "eylem": "Gerçekleşecek temel aksiyon",
  "baslik": "Kısa eylem başlığı (maks 4 kelime)",
  "zaman": "Arayüzde görünecek sade ifade",
  "tarih_iso": "Kesin ISO-8601 tarihi veya null",
  "hazirlik_zamani": "Varsa ön hazırlık uyarısı metni veya null",
  "hazirlik_iso": "Varsa ön hazırlık tarihi (ISO-8601) veya null",
  "tetikleyici": {
    "tip": "finansal | mekan | kisi | durum",
    "sart": "Beklenen olay",
    "etiket": "Arayüz hap etiketi (örn: ⚡ Maaş Gününde)"
  },
  "ikon": "İçeriğe tam uyan tek emoji",
  "renk": "Pastel HEX kodu (#DCFCE7, #FEE2E2, #E0F2FE, #FEF3C7, #F3E8FF)"
}`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.1,
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                baslik: { type: Type.STRING, description: 'Kısa eylem (max 4 kelime)' },
                zaman: { type: Type.STRING, description: 'Arayüzde görünecek sade metin' },
                tarih_iso: { type: Type.STRING, description: 'Yalnızca kesin randevularda ISO-8601, koşulluysa null' },
                tetikleyici: {
                  type: Type.OBJECT,
                  properties: {
                    tip: { type: Type.STRING, description: 'finansal | mekan | kisi | durum | zincirleme' },
                    sart: { type: Type.STRING, description: 'Gerçekleşmesi beklenen şart' },
                    etiket: { type: Type.STRING, description: 'Arayüzde görünecek 2-3 kelimelik koşul rozeti (örn: ⚡ Maaş Gününde)' },
                  },
                },
                hazirlik_zamani: { type: Type.STRING, description: 'Ön hazırlık zamanı' },
                hazirlik_iso: { type: Type.STRING, description: 'Takvim/bildirim için hazırlık tarihi (ISO-8601)' },
                anomali_notu: { type: Type.STRING, description: 'Kısa zeka tespiti veya null' },
                action_items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      task: { type: Type.STRING, description: 'Alt görev veya hazırlık adımı' },
                      is_completed: { type: Type.BOOLEAN, description: 'Tamamlandı mı' },
                    },
                    required: ['task'],
                  },
                },
                periyodik: {
                  type: Type.OBJECT,
                  properties: {
                    tip: { type: Type.STRING, description: 'aylik_son_hafta | aylik | haftalik | yillik | gunluk' },
                    aralik_gun: { type: Type.INTEGER, description: 'Gün aralığı (örn: 30)' },
                  },
                },
                ikon: { type: Type.STRING, description: 'tek emoji' },
                renk: { type: Type.STRING, description: 'pastel hex' },
              },
              required: ['baslik', 'ikon', 'renk'],
            },
          },
        });

        const raw = response.text;
        if (raw) {
          const cleanJson = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleanJson);
          return {
            baslik: String(parsed.baslik || text.slice(0, 25)),
            zaman: parsed.zaman ? String(parsed.zaman) : null,
            tarih_iso: parsed.tarih_iso ? String(parsed.tarih_iso) : null,
            tetikleyici: parsed.tetikleyici && parsed.tetikleyici.etiket ? {
              tip: parsed.tetikleyici.tip || null,
              sart: String(parsed.tetikleyici.sart || ''),
              etiket: String(parsed.tetikleyici.etiket || ''),
            } : null,
            periyodik: parsed.periyodik && parsed.periyodik.tip ? {
              tip: parsed.periyodik.tip,
              aralik_gun: typeof parsed.periyodik.aralik_gun === 'number' ? parsed.periyodik.aralik_gun : 30,
              bir_sonraki_tarih_iso: parsed.tarih_iso || undefined,
            } : null,
            hazirlik_zamani: parsed.hazirlik_zamani ? String(parsed.hazirlik_zamani) : null,
            hazirlik_iso: parsed.hazirlik_iso ? String(parsed.hazirlik_iso) : null,
            anomali_notu: parsed.anomali_notu ? String(parsed.anomali_notu) : null,
            action_items: Array.isArray(parsed.action_items) && parsed.action_items.length > 0
              ? parsed.action_items.map((item: any) => ({
                  task: String(item.task || item),
                  is_completed: false,
                }))
              : null,
            ikon: String(parsed.ikon || '📌'),
            renk: String(parsed.renk || '#FEF3C7'),
          };
        }
      } catch {
        continue;
      }
    }
  }

  // Local fallback with reference datetime and past notes
  return extractSimpleNoteFromText(text, now, pastNotes);
}

export async function sendMultimodalRequest(text?: string, base64Image?: string | null): Promise<any> {
  const now = new Date().toISOString();
  const parts: any[] = [];

  // 1. Metin ve Referans Bilgisi
  parts.push({
    text: `CURRENT_DATETIME: ${now}\nKullanıcı Sesi: "${text || 'Görseldeki durumu teşhis et ve yapılması gereken işlemi belirle.'}"`
  });

  // 2. Görsel Parçası (Varsa)
  if (base64Image) {
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image.includes(',') ? base64Image.split(',')[1] : base64Image
      }
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    throw new Error('GEMINI_API_KEY missing');
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { 
        responseMimeType: 'application/json',
        temperature: 0.1 
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error ${response.status}`);
  }

  const resJson = await response.json();
  const textOut = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOut) throw new Error('No candidate content');
  const cleanJson = textOut.replace(/```json/gi, "").replace(/```/g, "").trim();
  return JSON.parse(cleanJson);
}

export async function parseWithAIAndImage(
  text?: string,
  base64Image: string | null = null,
  referenceNow?: string,
  pastNotes?: any[]
): Promise<NotiviaSimpleNote> {
  const now = referenceNow || new Date().toISOString();
  const historyContext = pastNotes && pastNotes.length > 0
    ? `\nGEÇMİŞ NOTLAR:\n${JSON.stringify(pastNotes.slice(0, 20).map((n) => ({ baslik: n.baslik, zaman: n.zaman, tarih_iso: n.tarih_iso, createdAt: n.createdAt })), null, 2)}`
    : '';

  const promptText = `Sen Notivia'nın Türkçe Dilbilgisi ve Semantik Niyet Çözümleme Motorusun.
Girdiyi "Özne - Nesne/Meblağ - Yüklem/Eylem" ayrımına tabi tutarak katı JSON üretirsin.

SÖZDİZİMİ AYRIŞTIRMA KURALLARI:
1. Kişi İsimleri Önyargısını Kır:
   - Cümlede kişi ismi geçmesi (Ahmet, Mehmet vb.) o kişiyle buluşulacağı/çay içileceği anlamına KESİNLİKLE GELMEZ.
   - Yükleme bak: "Alacağım var", "Borç verdim", "Evrak teslim ettim" deniyorsa bu bir FİNANSAL veya RESMİ işlemdir; asla 'Sosyal' kategorisine atama.

2. Finansal Rol Dağılımı:
   - "X kişisinden Y TL alacağım var" -> Başlık: "X: Y TL Alacak", İkon: "💰", Renk: "#DCFCE7" (Pastel Yeşil).
   - "X kişisine Y TL borcum var" -> Başlık: "X: Y TL Borç", İkon: "💳", Renk: "#FEE2E2" (Pastel Kırmızı).
   - Tarih/vade verilmediyse "tarih_iso": null dön; rastgele takvim randevusu oluşturma.

3. Üçüncü Şahıs ve Kurumsal Bildirimler:
   - "Cuma günü bakan gelecek", "Elektrik kesilecek" gibi ifadelerde kullanıcı pasif dinleyicidir; bunu kullanıcının hazırlık yapması gereken kurumsal/takip görevi olarak yapılandır ("🏛️ Bakan Ziyareti").

FÜZYON VE TEŞHİS KURALLARI (Görsel Varsa):
1. Görsel Okuma (OCR & Durum):
   - Görseldeki model numarası, marka, son kullanma tarihi, bar/basınç saati veya parça aşınmasını doğrudan tespit et.
2. Bağlam Birleştirme:
   - Kullanıcı belirsiz konuştuğunda ("Ses yapıyor", "Bunu al", "Bitti bu") görseldeki nesneyi özne yap (örn: Görselde bisiklet/araç fren diski varsa -> "Ön Fren Balatası Değişimi").
3. Eyleme Dökme:
   - Sadece durumu tespit etmekle kalma; gerekli aksiyonu ve zamanlamayı çıkar (örn: "Basınç 0.7 Bar - Kombiye Su Basılacak").

ÖRÜNTÜ VE ANOMALİ KURALLARI:
- Normalde uzun aralıklarla yapılması gereken bir bakım son 30 günde tekrarlanmışsa veya rutin varsa anomali_notu oluştur.

BİLİŞSEL ALT GÖREVLER (Action Items):
- Kullanıcının belirttiği ana işin (muayene, seyahat, resmi başvuru, bakım, randevu) gerektirdiği 2-3 somut alt adımı belirle.
- "action_items": [ { "task": "Kısa alt görev metni", "is_completed": false } ] formatında dizi olarak döndür.
- Alt görev gerektirmeyen basit durumlarda boş dizi [] dön.

4. Referans Zaman (CURRENT_DATETIME):
   - Sağlanan referans zamana göre gün ve saatleri kesin ISO-8601 biçiminde hesapla: ${now}.${historyContext}

Kullanıcı Girdisi / Ses Notu: "${text || 'Görseldeki durumu teşhis et ve yapılması gereken işlemi belirle.'}".

JSON ÇIKTI ALANLARI (Katı JSON):
{
  "baslik": "Net özne + nesne + eylem özeti (max 4 kelime)",
  "zaman": "Arayüzde görünecek sade zaman ifadesi",
  "tarih_iso": "Kesin gün/saat varsa ISO-8601, yoksa null",
  "hazirlik_zamani": "Ön hazırlık zamanı (varsa)",
  "hazirlik_iso": "Takvim/bildirim için hazırlık tarihi (ISO-8601)",
  "teshis_notu": "Görselden okunan kritik teşhis (max 6 kelime, örn: Balata aşınma sınırında)",
  "anomali_notu": "Kısa zeka tespiti veya null",
  "action_items": [
    { "task": "Yapılacak alt adım / kontrol maddesi", "is_completed": false }
  ],
  "ikon": "İçeriğe tam uyan tek emoji",
  "renk": "Pastel HEX"
}`;

  const parts: any[] = [{ text: promptText }];

  if (base64Image) {
    const cleanBase64 = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: cleanBase64,
      },
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
    const candidateModels = [
      'gemini-2.5-flash',
      'gemini-2.5-pro',
      'gemini-flash-latest',
    ];

    for (const modelName of candidateModels) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts }],
              generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.1,
                responseSchema: {
                  type: 'OBJECT',
                  properties: {
                    baslik: { type: 'STRING' },
                    zaman: { type: 'STRING' },
                    tarih_iso: { type: 'STRING' },
                    tetikleyici: {
                      type: 'OBJECT',
                      properties: {
                        tip: { type: 'STRING' },
                        sart: { type: 'STRING' },
                        etiket: { type: 'STRING' },
                      },
                    },
                    hazirlik_zamani: { type: 'STRING' },
                    hazirlik_iso: { type: 'STRING' },
                    teshis_notu: { type: 'STRING' },
                    anomali_notu: { type: 'STRING' },
                    action_items: {
                      type: Type.ARRAY,
                      description: 'Gizli gereksinimlerden türetilen somut kontrol adımları',
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          task: { type: Type.STRING },
                          is_completed: { type: Type.BOOLEAN },
                        },
                        required: ['task', 'is_completed'],
                      },
                    },
                    ikon: { type: 'STRING' },
                    renk: { type: 'STRING' },
                  },
                  required: ['baslik', 'ikon', 'renk'],
                },
              },
            }),
          }
        );

        if (response.ok) {
          const resJson = await response.json();
          const raw = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (raw) {
            const cleanJson = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
            const parsed = JSON.parse(cleanJson);
            return {
              baslik: String(parsed.baslik || (text || 'Görsel Notu').slice(0, 25)),
              zaman: parsed.zaman ? String(parsed.zaman) : null,
              tarih_iso: parsed.tarih_iso ? String(parsed.tarih_iso) : null,
              tetikleyici: parsed.tetikleyici && parsed.tetikleyici.etiket ? {
                tip: parsed.tetikleyici.tip || null,
                sart: String(parsed.tetikleyici.sart || ''),
                etiket: String(parsed.tetikleyici.etiket || ''),
              } : null,
              hazirlik_zamani: parsed.hazirlik_zamani ? String(parsed.hazirlik_zamani) : null,
              hazirlik_iso: parsed.hazirlik_iso ? String(parsed.hazirlik_iso) : null,
              teshis_notu: parsed.teshis_notu ? String(parsed.teshis_notu) : null,
              anomali_notu: parsed.anomali_notu ? String(parsed.anomali_notu) : null,
              action_items: Array.isArray(parsed.action_items) ? parsed.action_items.map((ai: any) => ({
                task: String(ai.task || ''),
                is_completed: Boolean(ai.is_completed),
              })) : null,
              ikon: String(parsed.ikon || '📷'),
              renk: String(parsed.renk || '#FEF3C7'),
            };
          }
        }
      } catch (err) {
        console.warn(`parseWithAIAndImage model error (${modelName}):`, err);
        continue;
      }
    }
  }

  const fallback = extractSimpleNoteFromText(text || 'Görsel analizi', now, pastNotes);
  if (base64Image && !text) {
    fallback.baslik = 'Görsel Teşhisi';
    fallback.ikon = '📷';
  }
  return fallback;
}

