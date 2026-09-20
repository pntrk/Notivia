// src/utils/engineLocalization.ts
import type { NotiviaSimpleNote } from '../types/notivia.ts';

// Comprehensive dictionary for domain terms, action items, anomaly notes, and common UI strings
export const TRANSLATION_DICTIONARY: Record<string, string> = {
  // Common Titles
  'Not': 'Note',
  'Notunuz': 'Your Note',
  'Uyanış Alarmı': 'Wake-up Alarm',
  'Zamanlayıcı': 'Timer',
  'Sayaç': 'Timer',
  'Alışveriş Listesi': 'Shopping List',
  'Pazar Alışverişi': 'Market Groceries',
  'Market Alışverişi': 'Grocery Shopping',
  'Çöpü Çıkar': 'Take Out Trash',
  'Çöp Hatırlatıcısı': 'Trash Reminder',
  'Diş Hekimi Randevusu': 'Dentist Appointment',
  'Doktor Randevusu': 'Doctor Appointment',
  'Hekim Muayenesi': 'Doctor Consultation',
  'İlaç Hatırlatıcısı': 'Medication Reminder',
  'Tansiyon İlacı': 'Blood Pressure Medication',
  'Günlük Vitamin': 'Daily Vitamin',
  'Magnezyum': 'Magnesium',
  'Aspirin': 'Aspirin',
  'Şeker İlacı': 'Diabetes Medication',
  'Çamaşırları As': 'Hang Laundry',
  'Ocağın Altını Kapat': 'Turn Off Stove',
  'Fırını Kapat': 'Turn Off Oven',
  'Çayı Kapat / Demle': 'Turn Off / Brew Tea',
  'Günlük İlaç Takvimi': 'Daily Medication Schedule',
  'Ev Periyodik Bakım Döngüsü': 'Home Maintenance Cycle',
  'Kişisel & Ev Rutini': 'Personal & Home Routine',
  'Sınav Oturumu & Çalışma Kampı': 'Exam Session & Study Camp',
  'Akademik Görev': 'Academic Task',
  'Yazılı Sınav Not Kilidi (e-Okul)': 'Exam Grade Lock (School System)',
  'KBS Ek Ders Onay & Puantaj': 'Payroll & Overtime Approval',
  'Taşımalı Yemek & Nöbet Kontrolü': 'School Meal & Duty Inspection',
  'Sınav Gözetmenliği': 'Exam Proctoring',
  'Akademik Hakemlik / Revizyon': 'Academic Peer Review / Revision',
  'Eğitim & Yönetim Görevi': 'Education & Administration Task',
  'UYAP Tebligat Takvimi': 'Legal Notification Calendar',
  'Duruşma ve Adliye Alarmı': 'Court Hearing & Trial Alarm',
  'Gerekçeli Karar Sayacı': 'Reasoned Judgment Deadline',
  'KDV / MUHSGK Beyanname': 'VAT / Tax Declaration',
  'SGK Prim ve Berat Takibi': 'Social Security & Ledger Audit',
  'İhtarname ve Tebliğ Takibi': 'Legal Notice & Service Tracking',
  'Gözaltı ve Adli Muayene': 'Detention & Forensic Protocol',
  'İtfaiye Nöbet ve SCBA Kontrol': 'Fire Station Duty & SCBA Check',
  'Mutfak Hazırlığı (Mise en Place)': 'Kitchen Prep (Mise en Place)',
  'Uçuş Öncesi Dispatch & Brifing': 'Pre-Flight Dispatch & Briefing',
  'Klinik Hasta Viziti': 'Clinical Patient Rounds',
  'Hemşire Order ve SBAR Devir': 'Nursing Order & SBAR Handover',
  'Eczane Soğuk Zincir & Medula': 'Pharmacy Cold Chain & Dispensing',
  'Diş Protez ve Sterilizasyon': 'Dental Prosthetics & Sterilization',
  'EBYS Süreli Evrak Onayı': 'Electronic Document Approval',
  'CİMER / Bilgi Edinme Cevabı': 'Public Inquiry / Petition Response',
  'Doğrudan Temin & TİF Süreci': 'Procurement & Asset Receipt',
  'Araç Tamir ve Yol Testi': 'Vehicle Repair & Road Test',
  'Müşteri Teklifi Takibi': 'Client Proposal Follow-up',
  'Kasa Kapanışı ve Z Raporu': 'Register Closeout & Z-Report',
  'Esnaf & Dükkan Rutini': 'Shop & Store Routine',
  'İçtima ve Tekmil Alarmı': 'Military Roll Call & Inspection',
  'Silahlık ve Mühimmat Güvenliği': 'Armory & Ammunition Security',
  'Beton Dökümü ve Kürleme': 'Concrete Pouring & Curing Test',
  'LOTO Güvenlik & Pano Bakımı': 'LOTO Safety & Switchboard Maintenance',
  'Basınçlı Kap ve Kazan Testi': 'Pressure Vessel & Boiler Inspection',
  'Canlıya Alma (Production Deploy)': 'Production Deployment & Release',
  'Belediye Mimari Ruhsat Revizyonu': 'Municipal Building Permit Revision',
  'Lojistik ve Sürüş Takografı': 'Logistics & Tachograph Driving Schedule',
  'Saha Teknik Servis SLA': 'Field Service SLA Dispatch',
  'Veteriner Klinik Protokolü': 'Veterinary Clinical Protocol',
  'İş Sağlığı ve Güvenliği Denetimi': 'Occupational Health & Safety Audit',
  'Gayrimenkul & Tapu Devri': 'Real Estate & Title Deed Transfer',
  'Ziraat & Hasat / İlaçlama': 'Agriculture & Harvest / Spraying',
  'Denizcilik & Vardiya Seyir': 'Maritime Watchkeeping & Navigation',
  'Fermentasyon Takvimi': 'Fermentation Schedule',

  // Time expressions
  'Kayıt Edildi': 'Recorded',
  'Tarih Belirtilmedi': 'No Date Specified',
  'Zamanı Geldiğinde': 'When Due',
  'Zaman Belirtilmedi': 'No Time Specified',
  'Planlanan Saat': 'Scheduled Time',
  'Mesai İçi': 'During Work Hours',
  'Eve Gelirken': 'On the Way Home',
  'Markette': 'At the Grocery Store',
  'Markette / Alışverişte': 'At the Store / Shopping',
  'Şart Gerçekleştiğinde': 'When Condition Met',
  'Bugün': 'Today',
  'Yarın': 'Tomorrow',
  'Bu Sabah': 'This Morning',
  'Bu Akşam': 'This Evening',
  'Yarın Sabah': 'Tomorrow Morning',
  'Yarın Akşam': 'Tomorrow Evening',
  'Pazartesi': 'Monday',
  'Salı': 'Tuesday',
  'Çarşamba': 'Wednesday',
  'Perşembe': 'Thursday',
  'Cuma': 'Friday',
  'Cumartesi': 'Saturday',
  'Pazar': 'Sunday',
  'Her Cuma': 'Every Friday',
  'Her Pazartesi': 'Every Monday',

  // Whispers & Feedbacks
  'Notunuz kaydedildi.': 'Your note has been saved.',
  'Note saved.': 'Note saved.',
  'Hangi gün ve saatte planlayalım?': 'Which day and time should we schedule this for?',
  'Bugünün ajandasına bakıyorum.': "Checking today's schedule.",
  'Yarının ajandasına bakıyorum.': "Checking tomorrow's schedule.",
  'Bu haftaki takviminize bakıyorum.': "Checking this week's calendar.",
  'İlgili günün ajandasına bakıyorum.': "Checking the schedule for that day.",
  '6 aylık bakım döngüsü başlatıldı.': '6-month maintenance cycle initiated.',
  'Ödeme ve taahhüt takip kartı açıldı.': 'Payment and commitment tracking card created.',
  'Sınav takvimi ve tersine çalışma kampı planlandı.': 'Exam schedule and backward study plan created.',
  'Akademik teslim görevi kaydedildi.': 'Academic submission task saved.',
  'Gözetmenlik için 25 dakika öncesine hazırlık alarmı kuruldu.': '25-minute prior prep alarm set for proctoring duty.',
  'Eğitim ve okul yönetimi görevi kaydedildi.': 'Education and school management task saved.',
};

// Patterns for dynamic translation
export function translateTimeExpressionToEn(timeStr: string | null | undefined): string | null {
  if (!timeStr) return null;
  let str = timeStr.trim();

  // "X dakika sonra (HH:MM)" -> "In X minutes (HH:MM)"
  str = str.replace(/(\d+)\s*(?:dakika|dk)\s*sonra\s*\(([^)]+)\)/gi, 'In $1 minutes ($2)');
  str = str.replace(/(\d+)\s*saat\s*sonra\s*\(([^)]+)\)/gi, 'In $1 hours ($2)');
  str = str.replace(/(\d+)\s*(?:dakika|dk)\s*sonra/gi, 'In $1 minutes');
  str = str.replace(/(\d+)\s*saat\s*sonra/gi, 'In $1 hours');
  str = str.replace(/(\d+)\s*gün\s*sonra/gi, 'In $1 days');

  str = str.replace(/^Bugün\s*/i, 'Today ');
  str = str.replace(/^Yarın\s*/i, 'Tomorrow ');
  str = str.replace(/^Bu Sabah\s*/i, 'This Morning ');
  str = str.replace(/^Bu Akşam\s*/i, 'This Evening ');
  str = str.replace(/^Yarın Sabah\s*/i, 'Tomorrow Morning ');
  str = str.replace(/^Yarın Akşam\s*/i, 'Tomorrow Evening ');

  // Days
  str = str.replace(/\bHer\s+Pazartesi\b/gi, 'Every Monday');
  str = str.replace(/\bHer\s+Salı\b/gi, 'Every Tuesday');
  str = str.replace(/\bHer\s+Çarşamba\b/gi, 'Every Wednesday');
  str = str.replace(/\bHer\s+Perşembe\b/gi, 'Every Thursday');
  str = str.replace(/\bHer\s+Cuma\b/gi, 'Every Friday');
  str = str.replace(/\bHer\s+Cumartesi\b/gi, 'Every Saturday');
  str = str.replace(/\bHer\s+Pazar\b/gi, 'Every Sunday');

  str = str.replace(/\bPazartesi\b/gi, 'Monday');
  str = str.replace(/\bSalı\b/gi, 'Tuesday');
  str = str.replace(/\bÇarşamba\b/gi, 'Wednesday');
  str = str.replace(/\bPerşembe\b/gi, 'Thursday');
  str = str.replace(/\bCuma\b/gi, 'Friday');
  str = str.replace(/\bCumartesi\b/gi, 'Saturday');
  str = str.replace(/\bPazar\b/gi, 'Sunday');

  // Month names
  str = str.replace(/\bOcak\b/gi, 'Jan');
  str = str.replace(/\bŞubat\b/gi, 'Feb');
  str = str.replace(/\bMart\b/gi, 'Mar');
  str = str.replace(/\bNisan\b/gi, 'Apr');
  str = str.replace(/\bMayıs\b/gi, 'May');
  str = str.replace(/\bHaziran\b/gi, 'Jun');
  str = str.replace(/\bTemmuz\b/gi, 'Jul');
  str = str.replace(/\bAğustos\b/gi, 'Aug');
  str = str.replace(/\bEylül\b/gi, 'Sep');
  str = str.replace(/\bEkim\b/gi, 'Oct');
  str = str.replace(/\bKasım\b/gi, 'Nov');
  str = str.replace(/\bAralık\b/gi, 'Dec');

  if (TRANSLATION_DICTIONARY[str]) {
    return TRANSLATION_DICTIONARY[str];
  }

  return str;
}

export function translateTaskToEn(task: string): string {
  if (!task) return task;
  let t = task.trim();

  // Common shopping / simple tasks
  t = t.replace(/\bekmek\b/gi, 'Bread');
  t = t.replace(/\bsüt\b/gi, 'Milk');
  t = t.replace(/\byumurta\b/gi, 'Eggs');
  t = t.replace(/\bpeynir\b/gi, 'Cheese');
  t = t.replace(/\bzeytin\b/gi, 'Olives');
  t = t.replace(/\byağ\b/gi, 'Oil / Butter');
  t = t.replace(/\bmaden suyu\b/gi, 'Mineral Water');
  t = t.replace(/\bsu\b/gi, 'Water');
  t = t.replace(/\bmeyve\b/gi, 'Fruit');
  t = t.replace(/\bsebze\b/gi, 'Vegetables');
  t = t.replace(/\bdomates\b/gi, 'Tomatoes');
  t = t.replace(/\bsalatalık\b/gi, 'Cucumbers');
  t = t.replace(/\bet\b/gi, 'Meat');
  t = t.replace(/\btavuk\b/gi, 'Chicken');
  t = t.replace(/\bkahve\b/gi, 'Coffee');
  t = t.replace(/\bçay\b/gi, 'Tea');
  t = t.replace(/\bşeker\b/gi, 'Sugar');
  t = t.replace(/\btuz\b/gi, 'Salt');
  t = t.replace(/\bun\b/gi, 'Flour');
  t = t.replace(/\bpirinç\b/gi, 'Rice');
  t = t.replace(/\bmakarna\b/gi, 'Pasta');

  // Medication timings
  t = t.replace(/\bAç Karnına\b/gi, 'On an Empty Stomach');
  t = t.replace(/\bTok Karnına\b/gi, 'After Meal');
  t = t.replace(/\bYatarken\b/gi, 'Before Bedtime');
  t = t.replace(/\bMide Koruyucu\b/gi, 'Antacid / PPI');
  t = t.replace(/\bAntibiyotik\b/gi, 'Antibiotic');
  t = t.replace(/\bTansiyon İlacı\b/gi, 'Blood Pressure Pill');
  t = t.replace(/\bVitamin\b/gi, 'Vitamin');
  t = t.replace(/\bMagnezyum\b/gi, 'Magnesium');
  t = t.replace(/\bAspirin\b/gi, 'Aspirin');

  // School & Academic
  t = t.replace(/Ders notları ve çıkmış sınav sorularını çöz/gi, 'Review course notes and solve past exam questions');
  t = t.replace(/Özet formül\/kavram kağıdı hazırla/gi, 'Prepare summary formula & concept cheat sheet');
  t = t.replace(/Öğrenci kimliği ve sınav giriş yerini kontrol et/gi, 'Verify student ID and exam hall assignment');
  t = t.replace(/LMS\/Turnitin intihal oranını kontrol et/gi, 'Check LMS/Turnitin similarity & plagiarism score');
  t = t.replace(/Teslim formatını PDF olarak kaydet ve yükle/gi, 'Export submission as PDF and upload to portal');
  t = t.replace(/Cevap anahtarını ve puanlama baremini okul panosuna as/gi, 'Post answer key and grading rubric to the board');
  t = t.replace(/Yazılı kağıtlarını oku ve kazanım analiz tablosunu doldur/gi, 'Grade exam papers and populate learning outcome matrix');
  t = t.replace(/e-Okul sistemine notları gir ve sınav analiz çıktısını zümre başkanına teslim et/gi, 'Enter grades into grading portal and submit exam analysis to head teacher');
  t = t.replace(/Raporlu, sevkli ve izinli öğretmenlerin ek ders kesintilerini puantaja işle/gi, 'Record medical/leave deductions on teacher overtime payroll');
  t = t.replace(/Nöbet, DYK ve ders dışı kulüp faaliyet saatlerini kontrol et/gi, 'Audit duty shifts, prep courses, and extracurricular club hours');
  t = t.replace(/KBS sistemi üzerinden bordroyu hesaplat ve Malmüdürlüğü\/Muhasebeye ilet/gi, 'Calculate payroll in system and dispatch to accounting office');
  t = t.replace(/Öğle yemeği numunesini steril kavanoza al, etiketle ve \+4°C dolapta 72 saat sakla/gi, 'Take lunch meal sample in sterile jar, label, and store at +4°C for 72h');
  t = t.replace(/Öğrenci servis araçlarının emniyet kemeri ve şoför denetim föyünü imzala/gi, 'Inspect school bus seatbelts and sign driver audit sheet');
  t = t.replace(/Boş geçen sınıflar için nöbetçi öğretmen görevlendirmesini yap/gi, 'Assign substitute duty teacher for empty class periods');
  t = t.replace(/Sınav salon başkanlığından soru kitapçıkları ve yoklama listesini teslim al/gi, 'Collect test booklets and attendance sheet from proctoring office');
  t = t.replace(/Öğrenci kimlik kontrolü yap ve sınav salon oturma düzenini sağla/gi, 'Verify student IDs and ensure exam hall seating layout');
  t = t.replace(/Sınav bitiminde optik formları sayıp tutanakla teslim et/gi, 'Count bubble answer sheets upon exam end and deliver with signed report');
  t = t.replace(/Makalenin metodoloji ve kaynakça kontrolünü tamamla/gi, 'Complete methodology and references review for paper');
  t = t.replace(/Dergi portalı üzerinden hakem değerlendirme raporunu sisteme yükle/gi, 'Upload peer-review evaluation report via journal portal');

  // General & Home
  t = t.replace(/Uyumlu yedek parça\/filtre stok durumunu kontrol et/gi, 'Check compatible spare parts and filter inventory');
  t = t.replace(/Değişim\/bakım işlemini uygula ve çalışma sızdırmazlığını gözlemle/gi, 'Perform replacement/maintenance and inspect for leaks');
  t = t.replace(/Son ödeme gününden önce bakiye\/limit kontrolü sağla/gi, 'Verify account balance/credit limit prior to due date');
  t = t.replace(/Görev detaylarını ve resmi evrak kayıtlarını kontrol et/gi, 'Verify task details and official document logs');
  t = t.replace(/İdare onaylı karar veya tutanağı dosyala/gi, 'Archive management-approved minute or resolution');

  return t;
}

export function translateAnomalyToEn(anomali: string | null | undefined): string | null {
  if (!anomali) return null;
  let a = anomali.trim();

  a = a.replace(/🔔 (.*?) için alarm ve cihaz bildirimi devrede\./gi, '🔔 Alarm and device notification active for $1.');
  a = a.replace(/🛒 (\d+) parça alışveriş ürünü listelendi\./gi, '🛒 $1 shopping items listed.');
  a = a.replace(/🗑️ Sabah çöp kamyonu geçmeden önce kapı önüne çıkarınız\./gi, '🗑️ Place outside before morning collection truck arrives.');
  a = a.replace(/💊 İlacınızı belirtilen saatte bir bardak su ile alınız\./gi, '💊 Take your medication with a glass of water at scheduled time.');
  a = a.replace(/⏱️ (.*?) için geri sayım sayacı devrede\./gi, '⏱️ Countdown timer active for $1.');
  a = a.replace(/Taahhütlü işlemlerde son 15 gün içinde bildirim yapılmazsa tarife cezalı fiyattan otomatik yenilenir\./gi, 'If cancellation notice is not given in the last 15 days, plan auto-renews at non-discounted rate.');
  a = a.replace(/MEB Yönetmeliği uyarınca sınav sonuçları sınav tarihini takip eden en geç 10 gün içinde e-Okul'a işlenmelidir\./gi, 'According to education regulations, exam grades must be submitted within 10 days of test date.');
  a = a.replace(/Vize\/Final notu geçme katsayısını doğrudan etkiler; T-2 gün kala soru kampı şarttır\./gi, 'Exam directly impacts GPA; a 2-day prior study camp is recommended.');
  a = a.replace(/Ek ders puantajları her ayın 20-27'si arasında tamamlanmalıdır; onay gecikmesi maaş ödemelerini aksatır\./gi, 'Overtime payroll records must be finalized between the 20th-27th; delays disrupt payroll distribution.');
  a = a.replace(/Gıda güvenliği mevzuatı gereği taşımalı yemek numuneleri 72 saat boyunca \+4°C saklanmak zorundadır\./gi, 'Food safety rules mandate keeping meal samples at +4°C for 72 hours.');
  a = a.replace(/Gözetmenlik evrakları sınav başlamadan en az 20 dakika önce teslim alınmalıdır\./gi, 'Proctoring materials must be collected at least 20 minutes prior to exam start.');

  return a;
}

export function translateWhisperToEn(whisper: string | null | undefined, baslik?: string, zaman?: string): string | null {
  if (!whisper) return null;
  let w = whisper.trim();

  if (TRANSLATION_DICTIONARY[w]) {
    return TRANSLATION_DICTIONARY[w];
  }

  // Regex matches for standard templates
  const alarmMatch = w.match(/^(.*?) için (.*?) alarmı kuruldu\.$/);
  if (alarmMatch) {
    const titleEn = TRANSLATION_DICTIONARY[alarmMatch[1]] || alarmMatch[1];
    const timeEn = translateTimeExpressionToEn(alarmMatch[2]);
    return `Alarm set for ${titleEn} at ${timeEn}.`;
  }

  const timerMatch = w.match(/^(.*?) için (.*?) sayacı başlatıldı\.$/);
  if (timerMatch) {
    const titleEn = TRANSLATION_DICTIONARY[timerMatch[1]] || timerMatch[1];
    const timeEn = translateTimeExpressionToEn(timerMatch[2]);
    return `Timer started for ${titleEn} (${timeEn}).`;
  }

  const shoppingMatch = w.match(/^Alışveriş listeniz (\d+) ürünle hazırlandı\.$/);
  if (shoppingMatch) {
    return `Shopping list created with ${shoppingMatch[1]} items.`;
  }

  const trashMatch = w.match(/^Çöpü çıkarma hatırlatıcısı (.*?) için kuruldu\.$/);
  if (trashMatch) {
    const timeEn = translateTimeExpressionToEn(trashMatch[1]);
    return `Trash reminder scheduled for ${timeEn}.`;
  }

  const genericSetMatch = w.match(/^(.*?) (.*?) için kuruldu\.$/);
  if (genericSetMatch) {
    const titleEn = TRANSLATION_DICTIONARY[genericSetMatch[1]] || genericSetMatch[1];
    const timeEn = translateTimeExpressionToEn(genericSetMatch[2]);
    return `${titleEn} scheduled for ${timeEn}.`;
  }

  return w;
}

/**
 * Main localization dispatcher: Converts any NotiviaSimpleNote into English if language === 'en'
 */
export function localizeSimpleNote(note: NotiviaSimpleNote, language: string = 'tr', rawInput?: string): NotiviaSimpleNote {
  if (language !== 'en' || !note) {
    return note;
  }

  // Localize Title
  let baslikEn = TRANSLATION_DICTIONARY[note.baslik] || note.baslik;
  if (!TRANSLATION_DICTIONARY[note.baslik]) {
    // Check partial translations
    baslikEn = baslikEn
      .replace(/Alışveriş Listesi/gi, 'Shopping List')
      .replace(/Pazar Alışverişi/gi, 'Market Groceries')
      .replace(/Çöpü Çıkar/gi, 'Take Out Trash')
      .replace(/Uyanış Alarmı/gi, 'Wake-up Alarm')
      .replace(/Tansiyon İlacı/gi, 'Blood Pressure Pill')
      .replace(/Günlük Vitamin/gi, 'Daily Vitamin')
      .replace(/Zamanlayıcı/gi, 'Timer')
      .replace(/Sayaç/gi, 'Timer')
      .replace(/Randevusu/gi, 'Appointment')
      .replace(/Randevu/gi, 'Appointment')
      .replace(/Görevi/gi, 'Task')
      .replace(/Döngüsü/gi, 'Cycle')
      .replace(/Takvimi/gi, 'Calendar');
  }

  // Localize Zaman
  const zamanEn = translateTimeExpressionToEn(note.zaman);

  // Localize Preparation Time
  const prepEn = translateTimeExpressionToEn(note.hazirlik_zamani);

  // Localize Action Items
  const actionsEn = (note.action_items || []).map((item) => ({
    task: translateTaskToEn(item.task),
    is_completed: item.is_completed,
  }));

  // Localize Anomaly Note
  const anomaliEn = translateAnomalyToEn(note.anomali_notu);

  // Localize Question
  let netlestirmeEn = note.netlestirme_sorusu;
  if (netlestirmeEn) {
    if (netlestirmeEn.includes('Hangi gün') || netlestirmeEn.includes('saatte')) {
      netlestirmeEn = 'Which day and time should we schedule this for?';
    }
  }

  // Localize Whisper
  const whisperEn = translateWhisperToEn(note.sesli_fisilti, baslikEn, zamanEn || undefined);

  return {
    ...note,
    baslik: baslikEn,
    zaman: zamanEn || note.zaman,
    hazirlik_zamani: prepEn || note.hazirlik_zamani,
    action_items: actionsEn,
    anomali_notu: anomaliEn || note.anomali_notu,
    netlestirme_sorusu: netlestirmeEn || note.netlestirme_sorusu,
    sesli_fisilti: whisperEn || note.sesli_fisilti,
  };
}
