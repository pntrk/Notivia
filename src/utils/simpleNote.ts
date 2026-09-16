import type { NotiviaParsedNote, NotiviaSimpleNote } from '../types/notivia.ts';
import { getNextMonthEndTargetDate } from './date.ts';
import { inferPredictiveActions } from './predictiveGraph.ts';
import { matchShortScenario } from './scenarioDatabase.ts';
import { getCardColor } from './cardColors.ts';
export { extractDateTimeFromTurkish, getNextMonthEndTargetDate } from './date.ts';
export { inferPredictiveActions } from './predictiveGraph.ts';
export { matchShortScenario } from './scenarioDatabase.ts';
export { getCardColor } from './cardColors.ts';

// src/utils/simpleNote.ts içine medikal ayrıştırıcı
export function parseMultiMedicationNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();
  
  // İlaç/sağlık anahtar kelimeleri kontrolü
  const isMedical = lower.includes('ilaç') || lower.includes('ilac') || lower.includes('hap') || 
                    lower.includes('aç karnına') || lower.includes('tok karnına') || 
                    lower.includes('vitamin') || lower.includes('antibiyotik') ||
                    lower.includes('magnezyum') || lower.includes('iğne') || lower.includes('tiroit') ||
                    lower.includes('mide koruyucu') || lower.includes('aspirin') || lower.includes('melatonin');

  if (!isMedical) return null;

  const tasks: { task: string; time: string; condition: string; is_completed: boolean }[] = [];

  // Vakit ve Şart Eşleştirmeleri
  const timeSlots = [
    { key: 'sabah aç', time: '08:00', condition: 'aç', label: 'Aç Karnına' },
    { key: 'sabah tok', time: '09:00', condition: 'tok', label: 'Tok Karnına' },
    { key: 'öğle aç', time: '12:30', condition: 'aç', label: 'Aç Karnına' },
    { key: 'öğle tok', time: '13:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'öğlen aç', time: '12:30', condition: 'aç', label: 'Aç Karnına' },
    { key: 'öğlen tok', time: '13:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'öğle', time: '13:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'öğlen', time: '13:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'ikindi', time: '16:00', condition: 'farketmez', label: 'İkindi' },
    { key: 'akşam aç', time: '18:30', condition: 'aç', label: 'Aç Karnına' },
    { key: 'akşam tok', time: '19:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'akşam', time: '19:30', condition: 'tok', label: 'Tok Karnına' },
    { key: 'gece', time: '22:30', condition: 'gece', label: 'Yatarken' },
    { key: 'yatarken', time: '22:30', condition: 'gece', label: 'Yatarken' }
  ];

  // Cümleyi virgül, "bir de", "ve" gibi bağlaçlarla parçala
  const parts = input.split(/,|veya|\s+ve\s+|\s+bir de\s+/gi);

  parts.forEach(part => {
    const pLower = part.toLowerCase();
    for (const slot of timeSlots) {
      if (pLower.includes(slot.key)) {
        // Vakit ifadesini temizle ve ilaç ismini izole et
        const medName = part
          .replace(new RegExp(slot.key, 'gi'), '')
          .replace(/ilaç|ilacımı|ilac|hapı|hapımı|hap|hatırlat|iç|al|kullan|alınacak/gi, '')
          .trim();

        const cleanMed = medName ? (medName.charAt(0).toUpperCase() + medName.slice(1)) : 'İlaç';

        tasks.push({
          task: `${slot.time} - ${cleanMed} (${slot.label})`,
          time: slot.time,
          condition: slot.condition,
          is_completed: false
        });
        break;
      }
    }
  });

  if (tasks.length === 0) return null;

  return {
    baslik: 'Günlük İlaç Takvimi',
    zaman: `Günde ${tasks.length} Doz`,
    tarih_iso: `${baseDate.toISOString().split('T')[0]}T${tasks[0].time}:00`,
    action_items: tasks,
    ikon: '💊',
    renk: '#F3E8FF',
    anomali_notu: 'İlaçları bol su ile alınız; saat aralıklarına dikkat ediniz.',
    sesli_fisilti: `${tasks.length} farklı ilaç dozu günün saatlerine göre planlandı.`
  };
}

export function parseLegalNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isLegal = 
    lower.includes('duruşma') || lower.includes('durusma') ||
    lower.includes('mahkeme') || lower.includes('sulh hukuk') ||
    lower.includes('asliye hukuk') || lower.includes('asliye ceza') ||
    lower.includes('ağır ceza') || lower.includes('agir ceza') ||
    lower.includes('icra') || lower.includes('haciz') ||
    lower.includes('tebligat') || lower.includes('tebliğ') || lower.includes('teblig') ||
    lower.includes('ödeme emri') || lower.includes('odeme emri') ||
    lower.includes('icra emri') || lower.includes('istinaf') ||
    lower.includes('temyiz') || lower.includes('itiraz süresi') ||
    lower.includes('cevap süresi') || lower.includes('vekalet') ||
    lower.includes('uyap') || lower.includes('esas no') || lower.includes('esas');

  if (!isLegal) return null;

  // 1. Duruşma Tespiti
  if (lower.includes('duruşma') || lower.includes('durusma') || lower.includes('mahkeme')) {
    // Mahkeme ve Esas No ayıklama
    const courtMatch = input.match(/([a-zA-ZÇĞİÖŞÜçğıöşü0-9\.\s]+(?:Sulh|Asliye|Ağır Ceza|İş|Aile|Ticaret|İcra|Tüketici|Fikri|İdare|Vergi)\s*(?:Hukuk|Ceza|Mahkemesi|Mahkeme)?)/i);
    const esasMatch = input.match(/(\d{4}\s*\/\s*\d+)\s*(?:E\.?|esas)?/i);

    let baslik = 'Duruşma';
    if (courtMatch && esasMatch) {
      baslik = `${courtMatch[1].trim()} - ${esasMatch[1].replace(/\s+/g, '')} E.`;
    } else if (courtMatch) {
      baslik = `${courtMatch[1].trim()} Duruşması`;
    } else if (esasMatch) {
      baslik = `Duruşma - ${esasMatch[1].replace(/\s+/g, '')} E.`;
    } else {
      const shortClean = input.replace(/duruşması|durusmasi|duruşma|durusma|var|hatırlat/gi, '').trim();
      baslik = shortClean ? `${shortClean.slice(0, 20)} Duruşması` : 'Mahkeme Duruşması';
    }

    // Kelime sayısı sınırlaması (en fazla 4-5 kelime)
    const words = baslik.split(/\s+/);
    if (words.length > 5) {
      baslik = words.slice(0, 5).join(' ');
    }

    return {
      baslik,
      zaman: 'Duruşma Günü',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Duruşmadan 1 gün önce: UYAP dosya incelemesi ve mazeret/beyan kontrolü', is_completed: false },
        { task: 'Duruşma günü: Cübbe, vekaletname/yetki belgesi ve duruşma pulu kontrolü', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#FEF3C7',
      anomali_notu: 'Duruşma saatinden en az 15 dakika önce salon önünde hazır bulununuz.',
      sesli_fisilti: 'Duruşma ve UYAP hazırlık adımları ajandaya işlendi.'
    };
  }

  // 2. İcra / Ödeme Emri (7 Günlük İtiraz Süresi)
  if (lower.includes('icra emri') || lower.includes('ödeme emri') || lower.includes('odeme emri') || (lower.includes('icra') && (lower.includes('itiraz') || lower.includes('süre') || lower.includes('geldi')))) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 7);

    return {
      baslik: 'İcra İtiraz Süresi',
      zaman: '7 Gün Sonra (Kesin Süre)',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'İcra takip dosyası ve borç sebebi incelemesi', is_completed: false },
        { task: 'Yetki, borç veya imzaya itiraz dilekçesi hazırlığı', is_completed: false },
        { task: 'İcra müdürlüğüne UYAP üzerinden itiraz gönderimi', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#FEF3C7',
      anomali_notu: 'İİK gereği ödeme emrine itiraz süresi tebliğden itibaren 7 gündür. Hak düşürücü süredir.',
      sesli_fisilti: '7 günlük icra itiraz süresi alarmı kuruldu.'
    };
  }

  // 3. İstinaf / Temyiz (2 Hafta / 14 Gün Kesin Süre)
  if (lower.includes('istinaf') || lower.includes('temyiz')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 14);

    return {
      baslik: lower.includes('temyiz') ? 'Temyiz Başvuru Süresi' : 'İstinaf Başvuru Süresi',
      zaman: '14 Gün Sonra (2 Hafta)',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Gerekçeli kararın tebliği/tefhimi kontrolü', is_completed: false },
        { task: 'İstinaf/Temyiz gerekçeli başvuru dilekçesi yazımı', is_completed: false },
        { task: 'İstinaf harç ve gider avansı yatırma kontrolü', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#FEF3C7',
      anomali_notu: 'HMK/CMK gereği istinaf ve temyiz süresi tebliğden itibaren 2 haftadır (14 gün).',
      sesli_fisilti: '2 haftalık yasal istinaf/temyiz süresi planlandı.'
    };
  }

  // 4. Tebligat / Tebliğ (14 Günlük Genel Yasal Cevap/İtiraz Süresi)
  if (lower.includes('tebligat') || lower.includes('tebliğ') || lower.includes('teblig')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 14);

    return {
      baslik: 'Tebligat Cevap Süresi',
      zaman: '14 Gün Sonra',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Tebliğ mazbatası ve tebliğ tarihi teyidi', is_completed: false },
        { task: 'Dava/Cevap dilekçesi ve delil listesi hazırlığı', is_completed: false },
        { task: 'UYAP üzerinden cevap dilekçesi sunumu', is_completed: false }
      ],
      ikon: '⚖️',
      renk: '#FEF3C7',
      anomali_notu: 'HMK genel hükümlerine göre dava dilekçesine cevap süresi tebliğden itibaren 2 haftadır.',
      sesli_fisilti: '14 günlük yasal cevap ve itiraz süresi takvime işlendi.'
    };
  }

  return null;
}

export function parseEduManagerNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isEdu = 
    lower.includes('sınav') || lower.includes('sinav') || lower.includes('e-okul') || lower.includes('eokul') ||
    lower.includes('not giriş') || lower.includes('not giris') || lower.includes('nöbet') || lower.includes('nobet') ||
    lower.includes('gözetmenlik') || lower.includes('gozetmenlik') || lower.includes('makale') || lower.includes('hakemlik') ||
    lower.includes('peer-review') || lower.includes('peer review') || lower.includes('tübitak') || lower.includes('tubitak') ||
    lower.includes('bap') || lower.includes('tez jürisi') || lower.includes('tez jurisi') || lower.includes('araştırma görevlisi') ||
    lower.includes('dys') || lower.includes('üst yazı') || lower.includes('ust yazi') ||
    lower.includes('zümre') || lower.includes('zumre') || lower.includes('öğretmenler kurul') || lower.includes('ogretmenler kurul') ||
    lower.includes('kulüp') || lower.includes('kulup') || lower.includes('ek ders') || lower.includes('kbs') ||
    lower.includes('puantaj') || lower.includes('dyk');

  if (!isEdu) return null;

  // 1. AKADEMİSYEN & ARAŞTIRMA GÖREVLİSİ: Gözetmenlik
  if (lower.includes('gözetmenlik') || lower.includes('gozetmenlik')) {
    const timeMatch = input.match(/(\d{1,2})[:.](\d{2})/);
    let gozetmenZaman = 'Sınavdan 25 Dk Önce (Salon & Evrak)';
    let gozetmenIso = baseDate.toISOString();

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const examDate = new Date(baseDate);
      examDate.setHours(h, m - 25, 0, 0);
      const gh = examDate.getHours().toString().padStart(2, '0');
      const gm = examDate.getMinutes().toString().padStart(2, '0');
      gozetmenZaman = `${gh}:${gm} (25 Dk Önce Hazırlık)`;
      gozetmenIso = examDate.toISOString();
    }

    return {
      baslik: 'Sınav Gözetmenliği Hazırlığı',
      zaman: gozetmenZaman,
      tarih_iso: gozetmenIso,
      action_items: [
        { task: 'Öğrenci işleri / Bölüm sekreterliğinden sınav evrakı ve yoklama listesini teslim al', is_completed: false },
        { task: 'Sınav salonu oturma düzeni ve tahta sınav kuralları hazırlığı', is_completed: false },
        { task: 'Kimlik kontrolü, imza sirküsü ve sınav tutanağı tanzimi', is_completed: false }
      ],
      ikon: '🎓',
      renk: '#DDD6FE',
      anomali_notu: 'Sınav evraklarının sınav başlangıcından en az 25 dakika önce teslim alınıp salonda hazır bulunulması zorunludur.',
      sesli_fisilti: 'Gözetmenlik için sınav saatinden 25 dakika öncesine evrak teslim ve salon hazırlık alarmı kuruldu.'
    };
  }

  // 2. AKADEMİSYEN & ARAŞTIRMA GÖREVLİSİ: Makale Revizyonu, Hakemlik & Proje (TÜBİTAK/BAP)
  if (lower.includes('makale') || lower.includes('hakemlik') || lower.includes('peer-review') || lower.includes('peer review') || lower.includes('tübitak') || lower.includes('tubitak') || lower.includes('bap') || lower.includes('tez jürisi') || lower.includes('tez jurisi')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 14); // 2 hafta teslim
    due.setHours(23, 59, 0, 0);

    const isPaper = lower.includes('makale') || lower.includes('hakemlik') || lower.includes('peer');
    
    if (isPaper) {
      return {
        baslik: 'Makale Revizyonu & Hakemlik',
        zaman: 'Yasal Teslim Tarihi',
        tarih_iso: due.toISOString(),
        action_items: [
          { task: 'Editör ve hakem eleştirilerinin (Comments) maddelendirilmesi', is_completed: false },
          { task: 'Metin içi revizyonların Track Changes / Kırmızı ile işaretlenmesi', is_completed: false },
          { task: 'Response to Reviewers mektubunun detaylı olarak hazırlanması', is_completed: false },
          { task: 'Dergi yönetim sistemine (ScholarOne/Editorial Manager) revizyon yükleme', is_completed: false }
        ],
        ikon: '🔬',
        renk: '#DDD6FE',
        anomali_notu: 'Hakem değerlendirmelerinde Response to Reviewers mektubunda her eleştiriye sayfa ve satır numarasıyla yanıt verilmelidir.',
        sesli_fisilti: 'Makale revizyon adımları ve Response to Reviewers mektup hazırlığı takvimlendi.'
      };
    }

    return {
      baslik: 'Proje & Tez Jürisi Yönetimi',
      zaman: 'Gelişme/Kapanış Raporu',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Dönem içi BAP / TÜBİTAK gelişme raporu ve harcama belgeleri tasnifi', is_completed: false },
        { task: 'Tez savunma sınavı jüri tutanağı ve tez teslim onayı', is_completed: false },
        { task: 'Enstitü / Proje Yönetim Ofisi sistemine evrak yükleme ve kapanış', is_completed: false }
      ],
      ikon: '🎓',
      renk: '#E0E7FF',
      anomali_notu: 'Proje gelişme raporları ve fatura onayları yasal proje takvimine göre zamanında enstitüye teslim edilmelidir.',
      sesli_fisilti: 'Proje gelişme raporu ve enstitü evrak kontrol adımları oluşturuldu.'
    };
  }

  // 3. K-12 ÖĞRETMEN: e-Okul ve Sınav Takvimi (10 Günlük Sayaç)
  if (lower.includes('sınav yap') || lower.includes('sinav yap') || lower.includes('sınavı yaptık') || lower.includes('sınav bitti') || lower.includes('sinav bitti') || lower.includes('e-okul') || lower.includes('eokul') || lower.includes('not giriş') || lower.includes('yazılı yap')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 10);
    due.setHours(17, 0, 0, 0);

    return {
      baslik: 'e-Okul Not Girişi & Kazanım Analizi',
      zaman: 'Son 10 Gün (Not Kilitleme)',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Yazılı kağıtlarının okunması ve puanlama baremi/cevap anahtarı kontrolü', is_completed: false },
        { task: 'e-Okul sistemine notların ve kazanım analizlerinin girilmesi', is_completed: false },
        { task: 'Yazılı kağıtları ve analiz çıktılarının zümre başkanına teslimi', is_completed: false }
      ],
      ikon: '📚',
      renk: '#FEF08A',
      anomali_notu: 'MEB mevzuatı gereği sınav sonuçları ve kazanım analizleri sınav tarihinden itibaren 10 gün içinde e-Okul sistemine girilmelidir.',
      sesli_fisilti: 'Sınav not girişi için 10 günlük e-Okul takvimi ve kazanım analiz adımları oluşturuldu.'
    };
  }

  // 4. K-12 ÖĞRETMEN: Nöbet ve Alan Denetimi (30 Dk Önce)
  if (lower.includes('nöbet') || lower.includes('nobet')) {
    const timeMatch = input.match(/(\d{1,2})[:.](\d{2})/);
    let nobetZaman = 'İlk Ders Öncesi (30 Dk Önce)';
    let nobetIso = `${baseDate.toISOString().split('T')[0]}T08:00:00`;

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const nobetDate = new Date(baseDate);
      nobetDate.setHours(h, m - 30, 0, 0); // 30 dakika öncesi
      const nh = nobetDate.getHours().toString().padStart(2, '0');
      const nm = nobetDate.getMinutes().toString().padStart(2, '0');
      nobetZaman = `${nh}:${nm} (30 Dk Önce)`;
      nobetIso = nobetDate.toISOString();
    }

    return {
      baslik: 'Okul Nöbet Görevi',
      zaman: nobetZaman,
      tarih_iso: nobetIso,
      action_items: [
        { task: 'Nöbet defterini teslim alma/imzalama ve kat emniyeti kontrolü', is_completed: false },
        { task: 'Bahçe ve koridor güvenlik taraması', is_completed: false },
        { task: 'Teneffüs giriş-çıkış denetimi', is_completed: false }
      ],
      ikon: '📚',
      renk: '#FEF08A',
      anomali_notu: 'Nöbet görevi ders başlamadan en az 30 dakika önce başlar ve teneffüslerde kesintisiz sürer.',
      sesli_fisilti: 'Nöbet göreviniz ilk dersten 30 dakika öncesine ayarlandı.'
    };
  }

  // 5. DYS ve Resmi Yazışmalar
  if (lower.includes('dys') || lower.includes('üst yazı') || lower.includes('ust yazi')) {
    const due = new Date(baseDate);
    let addedDays = 0;
    while (addedDays < 5) {
      due.setDate(due.getDate() + 1);
      if (due.getDay() !== 0 && due.getDay() !== 6) {
        addedDays++;
      }
    }
    due.setHours(17, 0, 0, 0);

    return {
      baslik: 'DYS Süreli Resmi Yazı',
      zaman: '5 İş Günü İçinde',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'DYS üst yazı eklerini ve varsa süresini incele', is_completed: false },
        { task: 'İlgili birim/zümre görüşü ve cevap taslağı hazırla', is_completed: false },
        { task: 'DYS üzerinden e-imza ile onaya sun/gönder', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#E0F2FE',
      anomali_notu: 'DYS resmi yazışmalarında aksi belirtilmedikçe standart cevap süresi 5 iş günüdür.',
      sesli_fisilti: 'DYS resmi yazı takibi 5 iş günü yasal süresiyle ajandaya kaydedildi.'
    };
  }

  // 6. Ay Sonu Ek Ders (Yönetim & İdare)
  if (lower.includes('ek ders') || lower.includes('kbs') || lower.includes('puantaj')) {
    return {
      baslik: 'Ay Sonu Ek Ders Puantajı',
      zaman: 'Ay Sonu KBS Onayı',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'İzinli/raporlu personel puantaj düşümü', is_completed: false },
        { task: 'Nöbet/DYK ekleme', is_completed: false },
        { task: 'KBS veri girişi ve onay', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#E0F2FE',
      anomali_notu: 'Maaş ve ek ders tahakkuklarının KBS üzerinden her ayın son haftasında onaylanması zorunludur.',
      sesli_fisilti: 'Ay sonu ek ders, nöbet/DYK ve KBS onay adımları listelendi.'
    };
  }

  // 7. Kurul / Zümre / Kulüp
  if (lower.includes('zümre') || lower.includes('zumre') || lower.includes('kurul') || lower.includes('kulüp') || lower.includes('kulup')) {
    let baslik = 'Zümre / Kurul Toplantısı';
    if (lower.includes('zümre') || lower.includes('zumre')) baslik = 'Zümre Öğretmenler Kurulu';
    else if (lower.includes('kulüp') || lower.includes('kulup')) baslik = 'Sosyal Kulüp Faaliyeti';

    return {
      baslik,
      zaman: 'Toplantı Günü',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Gündem maddeleri ve önceki dönem kararları çıktısı', is_completed: false },
        { task: 'Aylık faaliyet tutanağı', is_completed: false },
        { task: 'İdare onaylı karar özeti', is_completed: false }
      ],
      ikon: '📚',
      renk: '#FEF08A',
      anomali_notu: 'Toplantı tutanaklarının toplantı bitimini takiben 3 gün içinde idareye teslimi gereklidir.',
      sesli_fisilti: 'Kurul ve zümre evrak hazırlık adımları planlandı.'
    };
  }

  return null;
}

export function parsePoliceLawEnforcementNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isPolice = 
    lower.includes('gözaltı') || lower.includes('gozalti') ||
    lower.includes('nezaret') || lower.includes('yakaladık') || lower.includes('yakaladik') || lower.includes('yakalama') ||
    lower.includes('şüpheli') || lower.includes('supheli') || lower.includes('adli muayene') ||
    lower.includes('çevik kuvvet') || lower.includes('cevik kuvvet') || lower.includes('ek görev') || lower.includes('ek gorev') ||
    lower.includes('maç görevi') || lower.includes('mac gorevi') || lower.includes('miting') ||
    lower.includes('asayiş uygulama') || lower.includes('asayis uygulama') || lower.includes('trafik uygulama') ||
    lower.includes('alkolmetre') || lower.includes('kaza tespit') || lower.includes('elkoyma') ||
    lower.includes('teslim tesellüm') || lower.includes('zabıt mümzisi') || lower.includes('fezleke');

  if (!isPolice) return null;

  // 1. Gözaltı ve Adli Muayene Protokolü (CMK 91 - 24 Saat)
  if (lower.includes('gözaltı') || lower.includes('gozalti') || lower.includes('nezaret') || lower.includes('yakaladık') || lower.includes('yakaladik') || lower.includes('yakalama')) {
    const due = new Date(baseDate);
    due.setHours(due.getHours() + 24);

    return {
      baslik: 'Gözaltı & Adli Sevk (CMK 91)',
      zaman: 'Yasal Süre: 24 Saat',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Giriş adli muayene raporu alımı', is_completed: false },
        { task: 'Şüpheli hakları tebellüğ belgesi imzalatılması', is_completed: false },
        { task: 'Savcılık sevk öncesi çıkış doktor raporu alımı', is_completed: false },
        { task: 'Tahkikat evrakı / Fezleke hazırlığı ve adliye sevki', is_completed: false }
      ],
      ikon: '🚔',
      renk: '#DBEAFE',
      anomali_notu: 'CMK 91 gereği bireysel suçlarda gözaltı süresi yakalama anından itibaren 24 saati geçemez (yol süresi hariç).',
      sesli_fisilti: 'Yakalama anından itibaren 24 saatlik yasal gözaltı ve adli muayene takvimi başlatıldı.'
    };
  }

  // 2. Ek Görev & Uygulama (Maç, Miting, Çevik Kuvvet, Asayiş/Trafik Uygulaması)
  if (lower.includes('ek görev') || lower.includes('ek gorev') || lower.includes('maç') || lower.includes('mac') || lower.includes('miting') || lower.includes('çevik') || lower.includes('cevik') || lower.includes('uygulama')) {
    // 90 dakika öncesi içtima
    const timeMatch = input.match(/(\d{1,2})[:.](\d{2})/);
    let ictimaZaman = 'Görevden 90 Dk Önce (İçtima)';
    let ictimaIso = baseDate.toISOString();

    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const ictimaDate = new Date(baseDate);
      ictimaDate.setHours(h, m - 90, 0, 0);
      const ih = ictimaDate.getHours().toString().padStart(2, '0');
      const im = ictimaDate.getMinutes().toString().padStart(2, '0');
      ictimaZaman = `${ih}:${im} (90 Dk Önce İçtima)`;
      ictimaIso = ictimaDate.toISOString();
    }

    return {
      baslik: 'Kolluk Ek Görevi & Uygulama',
      zaman: ictimaZaman,
      tarih_iso: ictimaIso,
      action_items: [
        { task: 'Kask/kalkan/çelik yelek teçhizat kontrolü', is_completed: false },
        { task: 'Telsiz kanalı ve batarya teyidi', is_completed: false },
        { task: 'Görev yeri amirine tekmil/kayıt', is_completed: false }
      ],
      ikon: '👮‍♂️',
      renk: '#DBEAFE',
      anomali_notu: 'Toplumsal olay ve ek görevlerde tam teçhizatla görev saatinden 90 dakika önce içtima alanında bulunulmalıdır.',
      sesli_fisilti: 'Ek görev için 90 dakika öncesine teçhizat ve içtima alarmı kuruldu.'
    };
  }

  // 3. Trafik / Olay Yeri / Elkoyma
  if (lower.includes('trafik') || lower.includes('kaza') || lower.includes('alkol') || lower.includes('elkoyma')) {
    return {
      baslik: 'Olay Yeri & Tutanak Güvenliği',
      zaman: 'Olay Anı / İvedi',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Alkolmetre çıktısı fişinin tutanağa zımbalanması', is_completed: false },
        { task: 'Kaza tespit tutanağı kroki kontrolü', is_completed: false },
        { task: 'Elkoyma tutanağı ve 24 saatlik hakim onayı takibi', is_completed: false },
        { task: 'En az 2 zabıt mümzisi imzası ve teslim-tesellüm kontrolü', is_completed: false }
      ],
      ikon: '🚔',
      renk: '#DBEAFE',
      anomali_notu: 'Gecikmesinde sakınca bulunan hallerde yapılan elkoyma işlemleri 24 saat içinde hakim onayına sunulmalıdır.',
      sesli_fisilti: 'Tutanak ve delil güvenliği kontrol adımları oluşturuldu.'
    };
  }

  return null;
}

export function parseHealthcareClinicalNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isClinical = 
    lower.includes('doktor') || lower.includes('hekim') || lower.includes('konsültasyon') || lower.includes('konsultasyon') ||
    lower.includes('epikriz') || lower.includes('taburcu') || lower.includes('taburculuk') ||
    lower.includes('hemşire') || lower.includes('hemsire') || lower.includes('dekübitus') || lower.includes('dekubitus') ||
    lower.includes('pozisyon değişim') || lower.includes('pozisyon degisim') || lower.includes('sbar') || lower.includes('order') || lower.includes('hbys') ||
    lower.includes('eczacı') || lower.includes('eczaci') || lower.includes('eczane') || lower.includes('soğuk zincir') || lower.includes('soguk zincir') ||
    lower.includes('its') || lower.includes('karekod bildirim') || lower.includes('medula') || lower.includes('miad') ||
    lower.includes('diş hekimi') || lower.includes('dis hekimi') || lower.includes('implant') || lower.includes('protez') ||
    lower.includes('dikiş alma') || lower.includes('dikis alma') || lower.includes('otoklav') || lower.includes('sterilizasyon') || lower.includes('biyolojik spor') ||
    lower.includes('pre-op') || lower.includes('preop') || lower.includes('post-op') || lower.includes('postop') || lower.includes('npo') || lower.includes('açlık başlat') ||
    lower.includes('troponin') || lower.includes('kan gazı') || lower.includes('kan gazi') || lower.includes('cross-match') ||
    lower.includes('narkotik') || lower.includes('kırmızı reçete') || lower.includes('kirmizi recete') ||
    lower.includes('yeşil reçete') || lower.includes('yesil recete') || lower.includes('nöbet devir') ||
    lower.includes('nobet devir') || lower.includes('hasta devri') || lower.includes('adli vaka') || lower.includes('adli rapor') ||
    lower.includes('mayi') || lower.includes('damar yolu') || lower.includes('pansuman') || lower.includes('servis nöbet') ||
    lower.includes('cerrahi vaka') || lower.includes('ameliyathane') || (lower.includes('ameliyat') && (lower.includes('hazır') || lower.includes('onam') || lower.includes('premedikasyon')));

  if (!isClinical) return null;

  // 1. DİŞ HEKİMİ (DENTIST): İmplant, Dikiş Alma, Protez & Otoklav Sterilizasyon
  if (lower.includes('diş') || lower.includes('dis') || lower.includes('implant') || lower.includes('protez') || lower.includes('otoklav') || lower.includes('sterilizasyon')) {
    const isSterilization = lower.includes('otoklav') || lower.includes('sterilizasyon') || lower.includes('biyolojik spor') || lower.includes('indikatör');
    
    if (isSterilization) {
      return {
        baslik: 'Otoklav & Sterilizasyon Kontrolü',
        zaman: 'Haftalık Rutin Kontrol',
        tarih_iso: baseDate.toISOString(),
        action_items: [
          { task: 'Haftalık biyolojik spor test tüpünü otoklav döngüsüne yerleştir ve inkübe et', is_completed: false },
          { task: 'Rulo paketlerin kimyasal indikatör renk dönüşümünü doğrula', is_completed: false },
          { task: 'Cihaz basınç/sıcaklık log çıktısını sterilizasyon takip defterine yapıştır', is_completed: false }
        ],
        ikon: '🦷',
        renk: '#EDE9FE',
        anomali_notu: 'Biyolojik spor testi üreme gösterirse otoklav derhal kullanımdan çekilmeli ve bakım çağrılmalıdır.',
        sesli_fisilti: 'Otoklav biyolojik spor testi ve paketleme indikatör kontrolü takvimlendi.'
      };
    }

    const stichDate = new Date(baseDate);
    stichDate.setDate(stichDate.getDate() + 7);

    return {
      baslik: 'Dental Cerrahi & Protez Takibi',
      zaman: '7 Gün Sonra (Dikiş Alma)',
      tarih_iso: stichDate.toISOString(),
      action_items: [
        { task: 'Cerrahi operasyon sonrası 7. günde dikiş alma ve yara yeri muayenesi', is_completed: false },
        { task: 'Protez ölçü modelini laboratuvara gönder ve prova randevusu planla', is_completed: false },
        { task: 'Post-op antibiyotik, klorheksidin gargara ve analjezik kullanımını kontrol et', is_completed: false }
      ],
      ikon: '🦷',
      renk: '#EDE9FE',
      anomali_notu: 'İmplant cerrahisi sonrası ilk 7 gün kemik iyileşmesi ve enfeksiyon kontrolü açısından kritiktir.',
      sesli_fisilti: '7 gün sonraki dikiş alma randevusu ve laboratuvar prova zinciri oluşturuldu.'
    };
  }

  // 2. ECZACI (PHARMACIST): Soğuk Zincir, İTS Karekod, Medula & Miad Takibi
  if (lower.includes('eczac') || lower.includes('eczane') || lower.includes('soğuk zincir') || lower.includes('soguk zincir') || lower.includes('its') || lower.includes('medula') || lower.includes('miad')) {
    const isColdChain = lower.includes('soğuk zincir') || lower.includes('soguk zincir') || lower.includes('ısı') || lower.includes('isi') || lower.includes('buzdolabı');
    
    if (isColdChain) {
      return {
        baslik: 'Eczane Soğuk Zincir (2-8°C) Takibi',
        zaman: 'Sabah & Akşam Ölçümü',
        tarih_iso: baseDate.toISOString(),
        action_items: [
          { task: 'Sabah dijital termometre sıcaklık (2-8°C) ve nem değerini kaydet', is_completed: false },
          { task: 'Akşam dijital termometre sıcaklık ve nem değerini kaydet', is_completed: false },
          { task: 'Aşı ve biyolojik ürünlerin İTS karekod durumlarını doğrula', is_completed: false }
        ],
        ikon: '💊',
        renk: '#FEE2E2',
        anomali_notu: '2-8°C aralığı dışındaki sıcaklık sapmalarında soğuk zincir bozulmuş sayılarak ürünler karantinaya alınmalıdır.',
        sesli_fisilti: 'Eczane sabah/akşam soğuk zincir ve İTS karekod kayıt görevi hazırlandı.'
      };
    }

    return {
      baslik: 'Medula Reçete & Miad Kontrolü',
      zaman: 'Ayın İlk Haftası / Rutin',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Medula döküm özeti çıktısını al ve SGK teslim evraklarını hazırla', is_completed: false },
        { task: 'Son kullanma tarihi (Miad) 3 ay kalan ilaçların tespiti ve depo iadesi', is_completed: false },
        { task: 'Renkli reçete (Uyuşturucu/Psikotrop) sistem mutabakatını tamamla', is_completed: false }
      ],
      ikon: '💊',
      renk: '#FEE2E2',
      anomali_notu: 'Medula reçete faturaları her ayın yasal teslim gününe kadar SGK Sağlık Sosyal Güvenlik Merkezine teslim edilmelidir.',
      sesli_fisilti: 'Medula reçete döküm ve miad yaklaşan ilaç iade listesi oluşturuldu.'
    };
  }

  // 3. DOKTOR (DOCTOR): Acil/Rutin Konsültasyon, Epikriz, Taburculuk & Pre-Op
  if (lower.includes('konsültasyon') || lower.includes('konsultasyon') || lower.includes('epikriz') || lower.includes('taburcu') || lower.includes('taburculuk') || lower.includes('hekim') || lower.includes('doktor')) {
    const isEmergency = lower.includes('acil konsültasyon') || lower.includes('acil konsultasyon') || lower.includes('stat kons');
    
    if (lower.includes('konsültasyon') || lower.includes('konsultasyon')) {
      const consultTime = new Date(baseDate);
      if (isEmergency) {
        consultTime.setMinutes(consultTime.getMinutes() + 30);
      } else {
        consultTime.setHours(consultTime.getHours() + 24);
      }

      return {
        baslik: isEmergency ? 'Acil Konsültasyon Yanıtı' : 'Rutin Konsültasyon Değerlendirmesi',
        zaman: isEmergency ? '30 Dk İçinde (Acil)' : '24 Saat İçinde (Rutin)',
        tarih_iso: consultTime.toISOString(),
        action_items: [
          { task: isEmergency ? '30 dakika içinde hastayı bizzat değerlendir ve konsültasyon notu düş' : '24 saat içinde klinik değerlendirme ve önerileri HBYS sistemine işle', is_completed: false },
          { task: 'İsteyen birim hekimi ile sözlü iletişim kur ve tedavi revizyonunu planla', is_completed: false },
          { task: 'Gerekli ek tetkik veya görüntüleme istemlerini gerçekleştir', is_completed: false }
        ],
        ikon: '🩺',
        renk: '#E0F2FE',
        anomali_notu: isEmergency ? 'Acil konsültasyonlar Sağlık Bakanlığı Kalite Standartları gereğince 30 dakika içinde yanıtlanmalıdır.' : 'Rutin konsültasyon yanıt süresi en fazla 24 saattir.',
        sesli_fisilti: isEmergency ? 'Acil konsültasyon için 30 dakikalık geri sayım başlatıldı.' : 'Rutin konsültasyon değerlendirme adımları oluşturuldu.'
      };
    }

    if (lower.includes('taburcu') || lower.includes('epikriz')) {
      return {
        baslik: 'Hasta Taburculuk & Epikriz Kapatma',
        zaman: 'Taburculuk Saati',
        tarih_iso: baseDate.toISOString(),
        action_items: [
          { task: 'Detaylı klinik epikriz raporunu HBYS üzerinde tamamla ve e-imzala', is_completed: false },
          { task: 'Çıkış patoloji, laboratuvar ve radyoloji tetkik onaylarını kapat', is_completed: false },
          { task: 'Taburculuk reçetesini ve evde bakım/kontrol önerilerini hastaya tebliğ et', is_completed: false }
        ],
        ikon: '🩺',
        renk: '#E0F2FE',
        anomali_notu: 'Tüm açık tetkikler ve HBYS epikriz raporu onaylanmadan hasta taburculuk işlemi sistemden kapatılamaz.',
        sesli_fisilti: 'Taburculuk epikrizi ve tetkik kapama kontrol listesi hazırlandı.'
      };
    }
  }

  // 4. HEMŞİRE (NURSE): Dekübitus Pozisyon Değişimi, 5 Doğru Kuralı & SBAR Devir
  if (lower.includes('dekübitus') || lower.includes('dekubitus') || lower.includes('pozisyon') || lower.includes('hemsire') || lower.includes('hemşire')) {
    const posDate = new Date(baseDate);
    posDate.setHours(posDate.getHours() + 2); // 2 saat sonra

    return {
      baslik: 'Dekübitus Pozisyon Değişimi & Cilt Bakımı',
      zaman: '2 Saatte Bir Rutin',
      tarih_iso: posDate.toISOString(),
      action_items: [
        { task: 'Hastanın vücut pozisyonunu değiştir (Sol/Sağ lateral veya Supine)', is_completed: false },
        { task: 'Bası yarası riskli bölgeleri (Sakrum, topuklar) kontrol et ve nemlendir', is_completed: false },
        { task: 'Pozisyon değişimini ve Braden skalası skorunu hemşire gözlem formuna işle', is_completed: false }
      ],
      ikon: '💉',
      renk: '#CCFBF1',
      anomali_notu: 'Yatağa bağımlı hastalarda bası yarasını önlemek için en geç 2 saatte bir düzenli pozisyon değişimi zorunludur.',
      sesli_fisilti: '2 saatlik dekübitus pozisyon değişimi ve cilt takip sayacı kuruldu.'
    };
  }

  // 5. Cerrahi & Pre-Op Protokolü
  if (lower.includes('pre-op') || lower.includes('preop') || lower.includes('npo') || lower.includes('ameliyat') || lower.includes('cerrahi')) {
    const npoDate = new Date(baseDate);
    npoDate.setHours(npoDate.getHours() - 8);

    return {
      baslik: 'Pre-Op Hazırlık & Cerrahi Protokol',
      zaman: 'Ameliyattan 8 Saat Önce (NPO)',
      tarih_iso: npoDate.toISOString(),
      action_items: [
        { task: 'Ameliyat saatinden 8 saat önce mutlak açlık (NPO) başlatma', is_completed: false },
        { task: 'Aydınlatılmış hasta onam belgesi kontrolü', is_completed: false },
        { task: 'Pre-op anestezi konsültasyon notu', is_completed: false },
        { task: 'Kan hazırlığı (Cross-match teyidi)', is_completed: false },
        { task: 'Ameliyat bölgesi işaretleme ve premedikasyon', is_completed: false }
      ],
      ikon: '🩺',
      renk: '#E0F2FE',
      anomali_notu: 'Anestezi güvenliği için ameliyat saatinden en az 8 saat önce tüm oral alım (su dahil) kesilmelidir.',
      sesli_fisilti: 'Pre-op cerrahi kontrol listesi ve 8 saatlik mutlak açlık uyarısı planlandı.'
    };
  }

  // 6. Nöbet Devir-Teslim & Narkotik Sayımı (SBAR)
  if (lower.includes('nöbet devir') || lower.includes('nobet devir') || lower.includes('hasta devri') || lower.includes('narkotik') || lower.includes('sbar')) {
    const handoffDate = new Date(baseDate);
    handoffDate.setMinutes(handoffDate.getMinutes() - 45);

    return {
      baslik: 'Klinik Nöbet Devir-Teslim (SBAR)',
      zaman: 'Nöbet Bitimine 45 Dk Kala',
      tarih_iso: handoffDate.toISOString(),
      action_items: [
        { task: 'Yeşil/kırmızı reçeteli narkotik ilaç dolabı sayımı ve çift imza', is_completed: false },
        { task: 'Kritik yatakların sözlü/yazılı devri (SBAR)', is_completed: false },
        { task: 'Eksik order ve teslim defteri imzaları', is_completed: false }
      ],
      ikon: '💉',
      renk: '#CCFBF1',
      anomali_notu: 'Narkotik kasa sayımı iki yetkili sağlık personeli tarafından fiziksel sayılıp çift imzayla teslim edilmelidir.',
      sesli_fisilti: 'Nöbet bitimine 45 dakika kala SBAR devir ve narkotik sayım protokolü başlatılacak.'
    };
  }

  // 7. Standart Klinik Tedavi & Order
  return {
    baslik: 'Klinik Order & Tedavi Takibi',
    zaman: 'Order Zamanı',
    tarih_iso: baseDate.toISOString(),
    action_items: [
      { task: 'Doğru hasta - doğru ilaç - doğru doz - doğru yol kontrolü (5 Doğru Kuralı)', is_completed: false },
      { task: 'İlaç uygulama kayıtlarının HBYS/order defterine işlenmesi', is_completed: false },
      { task: 'Hastanın vital bulgularını ve alerji öyküsünü doğrula', is_completed: false }
    ],
    ikon: '💉',
    renk: '#CCFBF1',
    anomali_notu: 'Uygulanan tüm mayi ve medikal tedaviler uygulandığı dakika HBYS sistemine kaydedilmelidir.',
    sesli_fisilti: '5 Doğru Kuralı ve HBYS order kayıt adımları oluşturuldu.'
  };
}

export function parseCivilServantPublicOfficeNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isCivilServant = 
    lower.includes('ebys') || lower.includes('belgenet') || lower.includes('cimer') || lower.includes('çimer') ||
    lower.includes('günlü evrak') || lower.includes('gunlu evrak') || lower.includes('süreli yazı') || lower.includes('sureli yazi') ||
    lower.includes('acele yazı') || lower.includes('acele yazi') || lower.includes('paraf') || lower.includes('e-imza') || lower.includes('eimza') ||
    lower.includes('doğrudan temin') || lower.includes('dogrudan temin') || lower.includes('4734') || lower.includes('22/d') ||
    lower.includes('tif') || lower.includes('tkys') || lower.includes('mys') || lower.includes('muayene kabul') ||
    lower.includes('piyasa fiyat araştırma') || lower.includes('malmüdürlüğü') || lower.includes('malmudurlugu') ||
    lower.includes('sağlık raporu') || lower.includes('saglik raporu') || lower.includes('izin formu') || lower.includes('komisyon');

  if (!isCivilServant) return null;

  // 1. CİMER ve Bilgi Edinme (15-30 Gün)
  if (lower.includes('cimer') || lower.includes('çimer') || lower.includes('bilgi edinme') || lower.includes('3071')) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 15);
    due.setHours(17, 0, 0, 0);

    return {
      baslik: 'CİMER Başvuru İşlemi',
      zaman: 'Yasal Süre: 15 Gün',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'CİMER başvuru konusunu incele ve gerekirse 3 iş günü içinde alt birimlerden bilgi iste', is_completed: false },
        { task: 'Gelen veriler doğrultusunda mevzuata uygun cevap taslağını hazırla', is_completed: false },
        { task: 'Şube Müdürü ve Amir parafıyla CİMER sistemine cevabı yükle ve kapat', is_completed: false }
      ],
      ikon: '🏛️',
      renk: '#FEF9C3',
      anomali_notu: 'CİMER başvurularına yasal cevap süresi azami 30 gündür; kurum içi ara yazışmalar 3 gün içinde tamamlanmalıdır.',
      sesli_fisilti: 'CİMER yasal başvuru takvimi ve alt birim ara yazı süreci oluşturuldu.'
    };
  }

  // 2. Doğrudan Temin ve Taşınır (4734 - 22/d & TİF & MYS)
  if (lower.includes('doğrudan temin') || lower.includes('dogrudan temin') || lower.includes('22/d') || lower.includes('tif') || lower.includes('tkys') || lower.includes('mys') || lower.includes('muayene kabul')) {
    return {
      baslik: 'Doğrudan Temin & Taşınır (22/d)',
      zaman: 'Harcama / Fatura Süreci',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Piyasa fiyat araştırma teklif mektupları kontrolü', is_completed: false },
        { task: 'Muayene ve kabul komisyon tutanağı imzalatılması', is_completed: false },
        { task: 'TKYS üzerinden Taşınır İşlem Fişi (TİF) kesilmesi', is_completed: false },
        { task: 'MYS ödeme emri belgesinin Malmüdürlüğü/Muhasebeye teslimi', is_completed: false }
      ],
      ikon: '🗂️',
      renk: '#FEF9C3',
      anomali_notu: '4734 sayılı KİK 22/d alımlarında fatura tarihi ile TİF ve Muayene Kabul tarihleri uyumlu olmalıdır.',
      sesli_fisilti: 'Doğrudan temin piyasa araştırması, TİF ve MYS ödeme kontrol listesi hazırlandı.'
    };
  }

  // 3. Özlük & Rapor
  if (lower.includes('sağlık raporu') || lower.includes('saglik raporu') || lower.includes('izin formu') || (lower.includes('rapor') && lower.includes('amire'))) {
    return {
      baslik: 'Sağlık Raporu & İzin Bildirimi',
      zaman: 'Mesai Başlangıcı (İvedi)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Mesai başlangıcında amire sözlü/yazılı rapor intikali', is_completed: false },
        { task: 'EBYS üzerinden sağlık izni formu doldurulması ve raporun eklenmesi', is_completed: false },
        { task: 'İzin onayının personel özlük birimince işlendiğini teyit et', is_completed: false }
      ],
      ikon: '🗂️',
      renk: '#FEF9C3',
      anomali_notu: 'Devlet Memurları Kanunu gereği sağlık raporları en geç mesai bitimine kadar kuruma intikal ettirilmelidir.',
      sesli_fisilti: 'Sağlık raporu amir bilgilendirme ve EBYS izin süreci başlatıldı.'
    };
  }

  // 4. Süreli ve Günlü Evraklar (EBYS / Belgenet)
  const due = new Date(baseDate);
  due.setDate(due.getDate() + 3); // 3 gün sonra
  due.setHours(17, 0, 0, 0);

  return {
    baslik: 'EBYS Günlü & Süreli Evrak',
    zaman: '1 Gün Önce İç Onay',
    tarih_iso: due.toISOString(),
    action_items: [
      { task: 'Yazı taslağının hazırlanması ve Standart Dosya Kodu (SDP) seçimi', is_completed: false },
      { task: 'Şef ve Şube Müdürü paraf zincirine sunulması', is_completed: false },
      { task: 'Nitelikli elektronik sertifika (e-İmza) ile nihai onay ve sayı/tarih alımı', is_completed: false }
    ],
    ikon: '🖋️',
    renk: '#FEF9C3',
    anomali_notu: 'Günlü evraklarda gecikmeye meydan vermemek için son teslimden en az 1 iş günü önce paraf zinciri başlatılmalıdır.',
    sesli_fisilti: 'EBYS günlü evrak için SDP dosya kodu, paraf zinciri ve e-İmza adımları oluşturuldu.'
  };
}

export function parseTradesmanLocalShopNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isTradesman =
    lower.includes('veresiye') || lower.includes('toptancı') || lower.includes('toptanci') ||
    lower.includes('tedarikçi') || lower.includes('tedarikci') || lower.includes('z raporu') ||
    lower.includes('pos gün sonu') || lower.includes('kasa sayımı') || lower.includes('kasa sayimi') ||
    lower.includes('dükkan') || lower.includes('dukkan') || lower.includes('esnaf') ||
    lower.includes('bağ-kur') || lower.includes('bagkur') || lower.includes('stopaj') ||
    lower.includes('veresiye defteri') || lower.includes('eksik listesi') ||
    ((lower.includes('azaldı') || lower.includes('bitti') || lower.includes('sipariş ver') || lower.includes('siparis ver')) && (lower.includes('koli') || lower.includes('toptan') || lower.includes('ürün') || lower.includes('mal')));

  if (!isTradesman) return null;

  // 1. Akşam Kasa & Gün Sonu (Z Raporu, POS Gün Sonu, Kasa Sayımı)
  if (lower.includes('z raporu') || lower.includes('pos gün sonu') || lower.includes('kasa sayım') || lower.includes('dükkan kapat') || lower.includes('kapanış')) {
    return {
      baslik: 'Akşam Kasa & Gün Sonu',
      zaman: 'Dükkan Kapanışı (20:00)',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Yazar kasa Z raporu çıktısı', is_completed: false },
        { task: 'Banka POS cihazları gün sonu işlemi', is_completed: false },
        { task: 'Nakit kasa sayımı ve günlük ciro mutabakatı', is_completed: false }
      ],
      ikon: '🏪',
      renk: '#FEF3C7',
      anomali_notu: 'POS gün sonu işlemleri ile Z raporundaki kredi kartı toplamlarının birebir tutması gerekir.',
      sesli_fisilti: 'Z raporu, POS gün sonu ve nakit kasa sayım adımları hazırlandı.'
    };
  }

  // 2. Veresiye & Borç-Alacak Dengesi
  if (lower.includes('veresiye') || (lower.includes('alacak') && (lower.includes('müşteri') || lower.includes('yaz') || lower.includes('defter')))) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 14); // Standart 14 gün vade kontrolü

    return {
      baslik: 'Veresiye / Müşteri Alacağı',
      zaman: 'Vade / 14 Gün Sonra',
      tarih_iso: due.toISOString(),
      action_items: [
        { task: 'Veresiye defterine/sisteme isim, tutar ve tarih kaydı', is_completed: false },
        { task: 'Müşteriye sözlü veya SMS/WhatsApp ile hesap özeti onayı', is_completed: false },
        { task: 'Vade günü tahsilat kontrolü', is_completed: false }
      ],
      ikon: '📓',
      renk: '#DCFCE7',
      anomali_notu: 'Veresiye kayıtlarında ürün detayı ve vade tarihinin açıkça belirtilmesi mutabakat kolaylığı sağlar.',
      sesli_fisilti: 'Veresiye kaydı ve 14 günlük vade kontrol takvimi oluşturuldu.'
    };
  }

  // 3. Toptancı & Tedarikçi Ödemesi
  if (lower.includes('toptancı') || lower.includes('toptanci') || lower.includes('tedarikçi') || lower.includes('tedarikci')) {
    if (lower.includes('ödeme') || lower.includes('odeme') || lower.includes('çek') || lower.includes('cek') || lower.includes('senet') || lower.includes('borç') || lower.includes('borc')) {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + 1);

      return {
        baslik: 'Toptancı & Tedarikçi Ödemesi',
        zaman: 'Ödemeden 1 Gün Önce (Nakit Kontrolü)',
        tarih_iso: due.toISOString(),
        action_items: [
          { task: 'Toptancı cari hesap ekstresi ve fatura mutabakatı', is_completed: false },
          { task: 'Banka/kasa nakit akışı ve bakiye teyidi', is_completed: false },
          { task: 'EFT/Havale veya elden ödeme dekontunun arşivlenmesi', is_completed: false }
        ],
        ikon: '💸',
        renk: '#FEE2E2',
        anomali_notu: 'Toptancı ödemelerinden 1 gün önce banka limitleri ve nakit akışı kontrol edilmelidir.',
        sesli_fisilti: 'Toptancı ödemesi için 1 gün öncesine nakit akışı kontrol alarmı kuruldu.'
      };
    }

    // Toptancı Sipariş & Eksik Listesi
    return {
      baslik: 'Tedarik & Sipariş Listesi',
      zaman: 'Toptancı Günü',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Kritik stok ve biten ürünlerin sayımı', is_completed: false },
        { task: 'Toptancıya sipariş listesinin ve adetlerin iletilmesi', is_completed: false },
        { task: 'Mal kabulünde irsaliye ve koli adedi kontrolü', is_completed: false }
      ],
      ikon: '📦',
      renk: '#FEF3C7',
      anomali_notu: 'Gelen ürünlerin irsaliye ile son kullanma tarihleri mal kabul anında kontrol edilmelidir.',
      sesli_fisilti: 'Eksik ürünler toptancı sipariş listenize eklendi.'
    };
  }

  // 4. Esnaf Mali Takvimi (Muhasebeci / Fatura / Bağ-Kur / Stopaj)
  if (lower.includes('muhasebeci') || lower.includes('fatura teslim') || lower.includes('bağ-kur') || lower.includes('bagkur') || lower.includes('stopaj') || lower.includes('kira')) {
    return {
      baslik: 'Esnaf Mali Takvimi & Vergiler',
      zaman: 'Ay Sonu / Fatura Dönemi',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Muhasebeciye alış/satış faturalarının ve Z raporlarının teslimi', is_completed: false },
        { task: 'Bağ-Kur primi, SGK ve dükkan stopaj ödeme kontrolü', is_completed: false },
        { task: 'Dükkan kira dekontunun muhasebeye iletilmesi', is_completed: false }
      ],
      ikon: '🏪',
      renk: '#FEF3C7',
      anomali_notu: 'Her ayın 15-20 arası evrak teslimi, ay sonu ise vergi/SGK tahakkuklarının ödenmesi zorunludur.',
      sesli_fisilti: 'Esnaf mali takvimi, muhasebe evrak teslimi ve Bağ-Kur kontrolleri planlandı.'
    };
  }

  return null;
}

export function parseMilitaryCommanderNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isMilitary =
    lower.includes('içtima') || lower.includes('ictima') || lower.includes('tekmil') ||
    lower.includes('bölük') || lower.includes('boluk') || lower.includes('tabur') || lower.includes('tugay') ||
    lower.includes('silahlık') || lower.includes('silahlik') || lower.includes('mühimmat') || lower.includes('muhimmat') ||
    lower.includes('doldur-boşalt') || lower.includes('doldur bosalt') || lower.includes('doldur boşalt') ||
    lower.includes('atış') || lower.includes('atis') || lower.includes('poligon') || lower.includes('tatbikat') ||
    lower.includes('hücum yeleği') || lower.includes('hucum yelegi') || lower.includes('kompozit başlık') ||
    lower.includes('kompozit baslik') || lower.includes('kademe') || lower.includes('askeri araç') ||
    lower.includes('askeri arac') || lower.includes('devir-teslim') || lower.includes('devir teslim') ||
    ((lower.includes('nöbet') || lower.includes('nobet')) && (lower.includes('silah') || lower.includes('mühimmat') || lower.includes('amir') || lower.includes('çavuş') || lower.includes('cavus') || lower.includes('teğmen') || lower.includes('tegmen') || lower.includes('yüzbaşı') || lower.includes('yuzbasi') || lower.includes('astsubay')));

  if (!isMilitary) return null;

  // 1. Silahlık ve Mühimmat Güvenliği / Nöbet Devir-Teslim
  if (lower.includes('silahlık') || lower.includes('silahlik') || lower.includes('mühimmat') || lower.includes('muhimmat') || lower.includes('doldur') || lower.includes('devir')) {
    return {
      baslik: 'Silahlık & Mühimmat Nöbet Devri',
      zaman: 'Devir-Teslim Saati',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Silahlık sayım cetvelinin ıslak imzayla fiziki sayımı', is_completed: false },
        { task: 'Mühimmat sandığı kurşun mühürlerinin fiziki kontrolü', is_completed: false },
        { task: 'Doldur-boşalt istasyonunda doldur-boşalt emniyetinin bizzat denetimi', is_completed: false },
        { task: 'Nöbet defteri vukuat kaydı ve devir-teslim imzası', is_completed: false }
      ],
      ikon: '🛡️',
      renk: '#E2E8D5',
      anomali_notu: 'Silah ve mühimmat devir-teslimi mühürler kırılmadan ve fiziki seri numaraları doğrulanarak yapılmalıdır.',
      sesli_fisilti: 'Silahlık sayımı, mühür kontrolü ve doldur-boşalt güvenlik adımları hazırlandı.'
    };
  }

  // 2. Atış ve Arazi Eğitimi (Poligon)
  if (lower.includes('atış') || lower.includes('atis') || lower.includes('poligon') || lower.includes('tatbikat')) {
    return {
      baslik: 'Atış & Arazi Tatbikat Protokolü',
      zaman: 'Faaliyet Öncesi Hazırlık',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Poligon emniyet subayı ve flama/gözcü yerleşimi', is_completed: false },
        { task: 'Sıhhiye aracı (ambulans) ve tabip koordinasyonu', is_completed: false },
        { task: 'Kovan ve mühimmat sarfiyat tutanağı tanzimi', is_completed: false },
        { task: 'Atış hattı öncesi doldur-boşalt ve silah kontrolü', is_completed: false }
      ],
      ikon: '🎯',
      renk: '#E2E8D5',
      anomali_notu: 'Poligonda sıhhiye ambulansı ve nöbetçi tabip hazır bulunmadan atış faaliyeti başlatılamaz.',
      sesli_fisilti: 'Poligon emniyeti, sıhhiye koordinasyonu ve mühimmat sarfiyat kontrol adımları oluşturuldu.'
    };
  }

  // 3. Bakım ve Kademe (Teknik/Motorlu Araç)
  if (lower.includes('kademe') || lower.includes('araç bakım') || lower.includes('arac bakim') || lower.includes('motorlu')) {
    return {
      baslik: 'Kademe & Askeri Araç Bakımı',
      zaman: 'Bakım Saati',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Araç takip defteri ve kilometre fişleri kontrolü', is_completed: false },
        { task: 'Yangın tüpü ve ilk yardım çantası denetimi', is_completed: false },
        { task: 'Motor yağı, hidrolik seviyeleri ve lastik basınç muayenesi', is_completed: false }
      ],
      ikon: '🪖',
      renk: '#E2E8F0',
      anomali_notu: 'Göreve çıkacak askeri araçların araç takip defteri imzalı ve emniyet teçhizatı tam olmalıdır.',
      sesli_fisilti: 'Kademe araç bakım ve takip defteri kontrol listesi hazırlandı.'
    };
  }

  // 4. Askeri Zaman Kademelendirmesi (İçtima & Tekmil)
  const ictimaDate = new Date(baseDate);
  ictimaDate.setMinutes(ictimaDate.getMinutes() - 20); // 20 dk önce

  return {
    baslik: 'İçtima & Tekmil Hazırlığı',
    zaman: '20 Dk Önce (Takım Hazırlığı)',
    tarih_iso: ictimaDate.toISOString(),
    action_items: [
      { task: 'Mevcut ve künye kontrolü (Raporlu, izinli, nöbetçi personelin tespiti)', is_completed: false },
      { task: 'Teçhizat, kompozit başlık, hücum yeleği ve kılık-kıyafet denetimi', is_completed: false },
      { task: 'Bölük/Tabur komutanına tekmil verme hazırlığı', is_completed: false }
    ],
    ikon: '🪖',
    renk: '#E2E8D5',
    anomali_notu: 'Birlik içtimasından en az 20 dakika önce takım mevcutları alınmış ve teçhizat kontrolü tamamlanmış olmalıdır.',
    sesli_fisilti: 'İçtima öncesi mevcut sayımı, teçhizat denetimi ve tekmil hazırlığı planlandı.'
  };
}

export function parseEngineeringSuiteNote(input: string, baseDate: Date): NotiviaSimpleNote | null {
  const lower = input.toLowerCase();

  const isEngineering =
    lower.includes('beton') || lower.includes('şantiye') || lower.includes('santiye') ||
    lower.includes('donatı') || lower.includes('donati') || lower.includes('kürleme') || lower.includes('kurleme') ||
    lower.includes('kırım testi') || lower.includes('kirim testi') || lower.includes('kalıp söküm') ||
    lower.includes('trafo') || lower.includes('pano') || lower.includes('yüksek gerilim') || lower.includes('yuksek gerilim') ||
    lower.includes('loto') || lower.includes('kilitleme-etiketleme') || lower.includes('kompanzasyon') || lower.includes('endüktif') || lower.includes('kapasitif') ||
    lower.includes('kompresör') || lower.includes('kompresor') || lower.includes('kazan') || lower.includes('basınçlı kap') || lower.includes('basincli kap') ||
    lower.includes('hidrostatik test') || lower.includes('vibrasyon') || lower.includes('titreşim') || lower.includes('titresim') || lower.includes('yağ analizi') || lower.includes('yag analizi') ||
    lower.includes('deploy') || lower.includes('canlıya alma') || lower.includes('canliya alma') || lower.includes('migration') ||
    lower.includes('rollback') || lower.includes('staging') || lower.includes('semver') || lower.includes('hotfix') || lower.includes('sprint');

  if (!isEngineering) return null;

  // 1. İNŞAAT MÜHENDİSLİĞİ: Beton Dökümü, Kürleme & Kırım Testi
  if (lower.includes('beton') || lower.includes('şantiye') || lower.includes('santiye') || lower.includes('donatı') || lower.includes('donati') || lower.includes('kür') || lower.includes('kırım') || lower.includes('kirim')) {
    const test7 = new Date(baseDate);
    test7.setDate(test7.getDate() + 7);
    const test28 = new Date(baseDate);
    test28.setDate(test28.getDate() + 28);

    return {
      baslik: 'Beton Dökümü & Kalite Kontrol',
      zaman: '7 & 28 Günlük Kırım Testi',
      tarih_iso: test7.toISOString(),
      action_items: [
        { task: 'Küp/silindir beton numunelerinin etiketlenmesi ve su kür havuzuna alınması', is_completed: false },
        { task: 'İlk 3 gün boyunca sabah/akşam düzenli beton kür sulaması', is_completed: false },
        { task: 'Yapı denetim ve şantiye şefi ıslak imzalı donatı teslim tutanağı', is_completed: false },
        { task: '7. gün laboratuvar erken dayanım basınç kırım testi', is_completed: false },
        { task: '28. gün nihai tasarım dayanımı kırım testi ve rapor onayı', is_completed: false }
      ],
      ikon: '🏗️',
      renk: '#FEF3C7',
      anomali_notu: 'TS EN 206 standardı uyarınca 28 günlük basınç dayanımı proje sınıfını karşılamalı; ilk 72 saat kürleme aksatılmamalıdır.',
      sesli_fisilti: 'Beton kürleme periyodu ve 7 ile 28 günlük laboratuvar kırım takvimi oluşturuldu.'
    };
  }

  // 2. ELEKTRİK MÜHENDİSLİĞİ: LOTO & Kompanzasyon / Sayaç Takibi
  if (lower.includes('trafo') || lower.includes('pano') || lower.includes('yüksek gerilim') || lower.includes('yuksek gerilim') || lower.includes('loto') || lower.includes('kompanzasyon') || lower.includes('endüktif') || lower.includes('kapasitif')) {
    const isLoto = lower.includes('loto') || lower.includes('trafo') || lower.includes('pano') || lower.includes('yüksek gerilim') || lower.includes('yuksek gerilim') || lower.includes('kilitleme');
    
    if (isLoto) {
      return {
        baslik: 'Pano/Trafo Bakımı & LOTO Güvenliği',
        zaman: 'Müdahale Öncesi (İSG)',
        tarih_iso: baseDate.toISOString(),
        action_items: [
          { task: 'LOTO Prosedürü: Ana kesiciyi indir, asma kilitle kilitle ve ikaz etiketini as', is_completed: false },
          { task: 'Gerilim kontrol kalemi ile hatta 0V olduğunu doğrula ve topraklama yap', is_completed: false },
          { task: 'Termal kamera ile baralar ve klemenslerde aşırı ısınma/gevşeklik taraması', is_completed: false },
          { task: 'Bakım bitimi izolasyon direnci testi ve tutanak imzalatılması', is_completed: false }
        ],
        ikon: '⚡',
        renk: '#FEE2E2',
        anomali_notu: 'Can güvenliği için enerjinin kesildiği fiziksel ölçümle teyit edilmeden panoya asla dokunulmamalıdır.',
        sesli_fisilti: 'LOTO kilitleme-etiketleme ve termal kontrol adımları 1. sıraya alındı.'
      };
    }

    return {
      baslik: 'Kompanzasyon & Sayaç Takibi',
      zaman: 'Haftalık / Sayaç Okuma',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Aktif, reaktif endüktif ve reaktif kapasitif sayaç endekslerini kaydet', is_completed: false },
        { task: 'Reaktif ceza kontrolü: Endüktif <%20, Kapasitif <%15 sınır denetimi', is_completed: false },
        { task: 'Kademe kontaktörleri ve kondansatör akım değerlerini ölç', is_completed: false }
      ],
      ikon: '⚡',
      renk: '#FEE2E2',
      anomali_notu: 'Endüktif oran %20, kapasitif oran %15 aşıldığında elektrik faturasına reaktif ceza bedeli yansır.',
      sesli_fisilti: 'Kompanzasyon sayaç okuma ve reaktif sınır kontrol adımları oluşturuldu.'
    };
  }

  // 3. MAKİNE MÜHENDİSLİĞİ: Basınçlı Kaplar & Kestirimci Bakım
  if (lower.includes('kompresör') || lower.includes('kompresor') || lower.includes('kazan') || lower.includes('basınçlı kap') || lower.includes('basincli kap') || lower.includes('vibrasyon') || lower.includes('titreşim') || lower.includes('titresim') || lower.includes('yağ analizi') || lower.includes('yag analizi')) {
    return {
      baslik: 'Basınçlı Kap & Kestirimci Bakım',
      zaman: 'Periyodik Bakım Saati',
      tarih_iso: baseDate.toISOString(),
      action_items: [
        { task: 'Yıllık yasal hidrostatik test ve emniyet ventili açma basıncı kontrolü', is_completed: false },
        { task: 'Rulman ve motor yataklarında titreşim/vibrasyon spektrum analizi', is_completed: false },
        { task: 'Yağ viskozite, partikül ve su içeriği numune analizi', is_completed: false },
        { task: 'Hava/buhar kaçak dedektörü ile hat kaçak taraması', is_completed: false }
      ],
      ikon: '⚙️',
      renk: '#E2E8F0',
      anomali_notu: 'İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliğince basınçlı kaplar yılda en az 1 kez hidrostatik teste tabi tutulmalıdır.',
      sesli_fisilti: 'Basınçlı kap hidrostatik testi ve vibrasyon kontrol listesi hazırlandı.'
    };
  }

  // 4. YAZILIM MÜHENDİSLİĞİ: Prod Deploy & Sürüm Yönetimi
  const isFriday = baseDate.getDay() === 5;
  const deployTime = new Date(baseDate);

  return {
    baslik: 'Production Deploy & Sürüm Yönetimi',
    zaman: isFriday ? 'Cuma Deploy Riski / Canlıya Alma' : 'Prod Deploy Saati',
    tarih_iso: deployTime.toISOString(),
    action_items: [
      { task: 'Production veri tabanı anlık yedeği ve migration script teyidi', is_completed: false },
      { task: 'Staging ortamı regresyon/E2E testleri ve QA onayı', is_completed: false },
      { task: 'SemVer sürüm etiketi (Tag) oluşturma ve PR onay kontrolü', is_completed: false },
      { task: 'Canlıya alma sonrası APM metrikleri ve Sentry/Log kontrolü', is_completed: false },
      { task: 'Olası hata durumunda Rollback planı ve runbook hazır bulundurma', is_completed: false }
    ],
    ikon: '💻',
    renk: '#E0F2FE',
    anomali_notu: isFriday
      ? 'DİKKAT: Cuma günü prod deploy yüksek operasyonel risk taşır. Rollback adımları test edilmeden canlıya geçilmemelidir.'
      : 'Migration içeren deploylarda veri tabanı yedeklemesi ve rollback mekanizması zorunludur.',
    sesli_fisilti: isFriday
      ? 'Cuma deploy risk uyarısı eklendi; DB yedek ve rollback adımları oluşturuldu.'
      : 'Prod deploy kontrol listesi, DB yedeği ve rollback planı hazırlandı.'
  };
}

export function toSimpleNote(note: NotiviaParsedNote): NotiviaSimpleNote {
  let zamanStr: string | null = null;
  let tarihIso: string | null = null;

  if (note.periodic_log.is_periodic) {
    const days = note.periodic_log.interval_days;
    if (days === 180) zamanStr = '6 ay sonra';
    else if (days === 90) zamanStr = '3 ayda bir';
    else if (days === 30) zamanStr = 'Ayda bir';
    else if (days === 7) zamanStr = 'Haftada bir';
    else if (days) zamanStr = `${days} günde bir`;
    tarihIso = note.periodic_log.next_due_date || null;
  } else if (note.calendar_event.has_event && note.calendar_event.start_datetime) {
    try {
      tarihIso = note.calendar_event.start_datetime;
      const d = new Date(note.calendar_event.start_datetime);
      const hours = d.getHours().toString().padStart(2, '0');
      const mins = d.getMinutes().toString().padStart(2, '0');
      const timePart = `${hours}:${mins}`;

      const now = new Date(note.reference_datetime || Date.now());
      const diffDays = Math.round((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
      const dayName = daysOfWeek[d.getDay()];

      if (diffDays === 0) {
        zamanStr = `Bugün ${timePart}`;
      } else if (diffDays === 1) {
        zamanStr = `Yarın ${timePart}`;
      } else if (diffDays > 1 && diffDays < 7) {
        zamanStr = `${dayName} ${timePart}`;
      } else {
        zamanStr = `${d.getDate()} ${new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(d)} ${timePart}`;
      }
    } catch {
      zamanStr = null;
    }
  }

  // Pick first emoji for ikon
  const emojiMatch = note.ui_meta.icon.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u);
  const singleEmoji = emojiMatch ? emojiMatch[0] : '📝';

  return {
    baslik: note.summary,
    zaman: zamanStr,
    tarih_iso: tarihIso,
    anomali_notu: note.anomali_notu || null,
    tetikleyici: (note as any).tetikleyici || null,
    ikon: singleEmoji,
    renk: note.ui_meta.color_hex || '#FEF3C7',
  };
}

// Metin içindeki maddeleri, yeni satırları veya ayıraçları kontrol listesine dönüştürücü
export function parseTextToChecklist(rawText: string): { task: string; is_completed: boolean }[] {
  // 1. Yeni satırlara, tirelere, yıldızlara veya virgüllere göre parçala
  const lines = rawText
    .split(/\r?\n|(?<=[^0-9]),|(?<=[a-zA-ZğüşıöçĞÜŞİÖÇ])\s*-\s*|\s*•\s*/)
    .map(line => line.trim())
    // Liste başlığı veya boş satırları ele
    .filter(line => line.length > 1 && !line.toLowerCase().endsWith('listesi:'));

  return lines.map(line => {
    // Başındaki "1.", "-", "*", "[ ]" gibi liste işaretlerini temizle
    const cleanTask = line
      .replace(/^(\d+[\.\)]|\-|\*|•|\[\s*\])\s*/, '')
      .trim();

    return {
      task: cleanTask.charAt(0).toLocaleUpperCase('tr-TR') + cleanTask.slice(1),
      is_completed: false
    };
  });
}

// 1. Türkçe Zaman ve Göreceli Periyot Ayrıştırıcı
interface TemporalParseResult {
  zaman: string | null;
  tarih_iso: string | null;
  isRecurringDay: boolean;
  recurringDayName: string | null;
  hour: number;
  minute: number;
}

const DAYS_MAP: Record<string, number> = {
  pazar: 0,
  pazartesi: 1,
  salı: 2,
  sali: 2,
  çarşamba: 3,
  carsamba: 3,
  perşembe: 4,
  persembe: 4,
  cuma: 5,
  cumartesi: 6,
};

const DAYS_DISPLAY: Record<string, string> = {
  pazar: 'Pazar',
  pazartesi: 'Pazartesi',
  salı: 'Salı',
  sali: 'Salı',
  çarşamba: 'Çarşamba',
  carsamba: 'Çarşamba',
  perşembe: 'Perşembe',
  persembe: 'Perşembe',
  cuma: 'Cuma',
  cumartesi: 'Cumartesi',
};

function parseTurkishTemporal(text: string, baseDate: Date): TemporalParseResult {
  const lower = text.toLowerCase();
  const target = new Date(baseDate.getTime());
  let hasDate = false;

  // "her cuma", "her pazartesi" döngü tespiti
  let isRecurringDay = false;
  let recurringDayName: string | null = null;
  const recurringDayMatch = lower.match(/\bher\s+(pazartesi|salı|sali|çarşamba|carsamba|perşembe|persembe|cuma|cumartesi|pazar)\b/i);
  if (recurringDayMatch) {
    isRecurringDay = true;
    recurringDayName = recurringDayMatch[1].toLowerCase();
  }

  let matchedDayKey: string | null = recurringDayName;
  if (!matchedDayKey) {
    for (const dKey of Object.keys(DAYS_MAP)) {
      if (new RegExp(`\\b${dKey}\\b`, 'i').test(lower)) {
        matchedDayKey = dKey;
        break;
      }
    }
  }

  if (matchedDayKey && DAYS_MAP[matchedDayKey] !== undefined) {
    const current = target.getDay();
    const targetIdx = DAYS_MAP[matchedDayKey];
    let diff = targetIdx - current;
    if (diff <= 0) diff += 7;
    target.setDate(target.getDate() + diff);
    hasDate = true;
  }

  if (lower.includes('yarın') || lower.includes('yarin')) {
    target.setDate(target.getDate() + 1);
    hasDate = true;
  } else if (lower.includes('öbür gün') || lower.includes('obur gun')) {
    target.setDate(target.getDate() + 2);
    hasDate = true;
  }

  const gunMatch = lower.match(/(\d+)\s*gün\s*sonra/);
  const ayMatch = lower.match(/(\d+)\s*ay\s*sonra/);
  if (gunMatch) {
    target.setDate(target.getDate() + parseInt(gunMatch[1], 10));
    hasDate = true;
  } else if (ayMatch) {
    target.setMonth(target.getMonth() + parseInt(ayMatch[1], 10));
    hasDate = true;
  }

  // 2. Saat / Vakit Tespiti (Sayısal veya metinsel)
  let hour: number | null = null;
  let minute = 0;
  let hasSpecificTime = false;

  // Zaman dilimi etiketleri
  const isEvening = /akşam|aksam/i.test(lower);
  const isNight = /gece/i.test(lower);
  const isAfternoon = /öğleden sonra|ogleden sonra/i.test(lower);
  const isMorning = /sabah/i.test(lower);
  const isNoon = /öğlen|oglen|öğle|ogle/i.test(lower);

  // Türkçe sayı kelimeleri
  const numberWords: Record<string, number> = {
    'bir': 1, 'iki': 2, 'üç': 3, 'uc': 3, 'dört': 4, 'dort': 4,
    'beş': 5, 'bes': 5, 'altı': 6, 'alti': 6, 'yedi': 7, 'sekiz': 8,
    'dokuz': 9, 'on': 10, 'on bir': 11, 'onbir': 11, 'on iki': 12, 'oniki': 12,
    'yirmi': 20, 'yirmi bir': 21, 'yirmibir': 21, 'yirmi iki': 22, 'yirmi üç': 23
  };

  // Format: "21:00", "21.00", "9:30"
  const colonMatch = lower.match(/\b(\d{1,2})[:.](\d{2})\b/);
  if (colonMatch) {
    hour = parseInt(colonMatch[1], 10);
    minute = parseInt(colonMatch[2], 10);
    hasSpecificTime = true;
    hasDate = true;
  }

  // Format: "akşam 9", "saat 9", "9da", "9'da", "9 da"
  if (hour === null) {
    const digitMatch = lower.match(/(?:saat\s*|akşam\s*|aksam\s*|sabah\s*|gece\s*|öğlen\s*)(\d{1,2})(?:\s*['’]?(?:da|de|ta|te))?/i) ||
      lower.match(/\b(\d{1,2})\s*(?:['’]?(?:da|de|ta|te))\b/i);
    if (digitMatch) {
      hour = parseInt(digitMatch[1], 10);
      hasSpecificTime = true;
      hasDate = true;
    }
  }

  // Format: Metinsel saat (dokuzda, sekizde, on birde)
  if (hour === null) {
    for (const [word, val] of Object.entries(numberWords)) {
      const reg = new RegExp(`\\b(?:saat\\s*)?${word}(?:['’]?(?:da|de|ta|te))?\\b`, 'i');
      if (reg.test(lower)) {
        hour = val;
        hasSpecificTime = true;
        hasDate = true;
        break;
      }
    }
  }

  // 12 saat formatından 24 saat formatına kesin dönüşüm (Akşam 9 = 21:00)
  if (hour !== null) {
    if (isEvening) {
      if (hour < 12) hour += 12; // 9 -> 21, 8 -> 20
    } else if (isAfternoon) {
      if (hour < 12) hour += 12; // 3 -> 15
    } else if (isNight) {
      if (hour >= 9 && hour <= 11) hour += 12; // 10 -> 22
      else if (hour === 12) hour = 0;
    } else if (isNoon) {
      if (hour >= 1 && hour <= 3) hour += 12;
    }
  } else {
    // Sayı verilmemişse bağlamsal varsayılan saat ata
    if (isEvening) { hour = 21; minute = 0; hasSpecificTime = true; }
    else if (isNoon) { hour = 13; minute = 0; hasSpecificTime = true; }
    else if (isNight) { hour = 22; minute = 0; hasSpecificTime = true; }
    else if (isMorning) { hour = 9; minute = 0; hasSpecificTime = true; }
    else { hour = 9; minute = 0; }
  }

  // Sınır koruması
  if (hour < 0) hour = 0;
  if (hour > 23) hour = 23;
  if (minute < 0) minute = 0;
  if (minute > 59) minute = 59;

  target.setHours(hour, minute, 0, 0);

  // Gün açıkça belirtilmemişse ve hedef saat bugün için geçmişse yarına yuvarla
  const nowMs = baseDate.getTime();
  if (!hasDate && target.getTime() <= nowMs) {
    target.setDate(target.getDate() + 1);
    hasDate = true;
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  const iso = `${target.getFullYear()}-${pad(target.getMonth() + 1)}-${pad(target.getDate())}T${pad(hour)}:${pad(minute)}:00`;
  const gunIsimleri = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  const isToday = target.toDateString() === baseDate.toDateString();
  const tomorrow = new Date(baseDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = target.toDateString() === tomorrow.toDateString();

  const labelPrefix = isToday
    ? (isEvening ? 'Bu Akşam' : isMorning ? 'Bu Sabah' : 'Bugün')
    : isTomorrow
    ? (isEvening ? 'Yarın Akşam' : isMorning ? 'Yarın Sabah' : 'Yarın')
    : gunIsimleri[target.getDay()];

  const zamanStr = (hasDate || hasSpecificTime || isEvening || isMorning || isNoon || isNight)
    ? `${labelPrefix} ${pad(hour)}:${pad(minute)}`
    : null;

  return {
    zaman: zamanStr,
    tarih_iso: hasDate || hasSpecificTime || isEvening || isMorning || isNoon || isNight ? iso : null,
    isRecurringDay,
    recurringDayName,
    hour,
    minute,
  };
}

// 2. Sözdizimsel Anlam ve Rol Çözümleyici (Özne - Nesne - Yüklem)
export function extractSimpleNoteFromText(
  input: string,
  refDatetime?: string,
  pastNotes?: any[]
): NotiviaSimpleNote {
  const cleanInput = input.trim();
  const lower = cleanInput.toLowerCase();
  const baseDate = refDatetime ? new Date(refDatetime) : new Date();

  const temporal = parseTurkishTemporal(cleanInput, baseDate);
  const { zaman, tarih_iso, isRecurringDay, recurringDayName, hour, minute } = temporal;
  const pad = (n: number) => String(n).padStart(2, '0');

  // A0. DÖNGÜSEL / PERİYODİK TEKRARLAMA TESPİTİ
  let periyodik: NotiviaSimpleNote['periyodik'] = null;
  let periodicZaman = zaman;
  let periodicIso = tarih_iso;

  if (isRecurringDay && recurringDayName) {
    const dayDisplay = DAYS_DISPLAY[recurringDayName] || 'Cuma';
    periodicZaman = `Her ${dayDisplay} ${pad(hour)}:${pad(minute)}`;
    periodicIso = tarih_iso;
    periyodik = {
      tip: 'haftalik',
      aralik_gun: 7,
      bir_sonraki_tarih_iso: periodicIso || undefined,
    };
  } else if (
    lower.includes('her ay sonu') ||
    lower.includes('her ayın son') ||
    lower.includes('ay sonu') ||
    lower.includes('ay sonunda') ||
    lower.includes('ayın sonunda')
  ) {
    const nextTarget = getNextMonthEndTargetDate(baseDate, 10, 0);
    periodicIso = `${nextTarget.getFullYear()}-${pad(nextTarget.getMonth() + 1)}-${pad(nextTarget.getDate())}T${pad(nextTarget.getHours())}:${pad(nextTarget.getMinutes())}:00`;
    
    const gunIsimleri = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const ayIsimleri = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    periodicZaman = `Her Ay Sonu (${nextTarget.getDate()} ${ayIsimleri[nextTarget.getMonth()]} ${gunIsimleri[nextTarget.getDay()]})`;

    periyodik = {
      tip: 'aylik_son_hafta',
      aralik_gun: 30,
      bir_sonraki_tarih_iso: periodicIso,
    };
  } else if (lower.includes('her ay') || lower.includes('ayda bir')) {
    const nextTarget = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    periodicIso = `${nextTarget.getFullYear()}-${pad(nextTarget.getMonth() + 1)}-${pad(nextTarget.getDate())}T10:00:00`;
    periodicZaman = `Her Ay (${nextTarget.getDate()} ${new Intl.DateTimeFormat('tr-TR', { month: 'short' }).format(nextTarget)})`;
    periyodik = {
      tip: 'aylik',
      aralik_gun: 30,
      bir_sonraki_tarih_iso: periodicIso,
    };
  } else if (lower.includes('her hafta') || lower.includes('haftada bir')) {
    const nextTarget = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    periodicIso = `${nextTarget.getFullYear()}-${pad(nextTarget.getMonth() + 1)}-${pad(nextTarget.getDate())}T10:00:00`;
    periodicZaman = 'Her Hafta';
    periyodik = {
      tip: 'haftalik',
      aralik_gun: 7,
      bir_sonraki_tarih_iso: periodicIso,
    };
  } else if (lower.includes('her gün') || lower.includes('hergun') || lower.includes('günlük')) {
    const nextTarget = new Date(baseDate.getTime() + 24 * 60 * 60 * 1000);
    periodicIso = `${nextTarget.getFullYear()}-${pad(nextTarget.getMonth() + 1)}-${pad(nextTarget.getDate())}T${pad(hour)}:${pad(minute)}:00`;
    periodicZaman = `Her Gün ${pad(hour)}:${pad(minute)}`;
    periyodik = {
      tip: 'gunluk',
      aralik_gun: 1,
      bir_sonraki_tarih_iso: periodicIso,
    };
  }

  // A. KOŞUL VE TETİKLEYİCİ TESPİTİ (Zaman içermeyen şartlar)
  let tetikleyici: { tip: 'finansal' | 'mekan' | 'kisi' | 'durum' | 'zincirleme' | 'hava' | null; sart: string; etiket: string } | null = null;
  if (lower.includes('maaş yatınca')) {
    tetikleyici = { tip: 'finansal', sart: 'Maaş yatması', etiket: '⚡ Maaş Gününde' };
  } else if (lower.includes('sanayiye yolum') || lower.includes('sanayiye gidince') || lower.includes('sanayide')) {
    tetikleyici = { tip: 'mekan', sart: 'Sanayi ziyareti', etiket: '📍 Sanayi Uğraması' };
  } else if (lower.includes('veli toplantıs') || lower.includes('toplantıda')) {
    tetikleyici = { tip: 'mekan', sart: 'Toplantı', etiket: '📍 Toplantıda' };
  }

  // HAVA KOŞULU TETİKLEYİCİLERİ
  if (lower.includes('yağmur') || lower.includes('yagmur')) {
    return enrichWithPredictiveGraph({
      baslik: cleanInput.replace(/yağmur yağarsa/gi, '').trim() || 'Yağmur Önlemi',
      zaman: 'Hava Yağmurlu Olduğunda',
      tarih_iso: null,
      tetikleyici: { tip: 'hava', sart: 'yagmur', etiket: '🌧️ Yağmur Şartı' },
      ikon: '🌧️',
      renk: '#E0F2FE'
    }, cleanInput);
  }

  if (lower.includes('don') || lower.includes('soğuk') || lower.includes('buz')) {
    return enrichWithPredictiveGraph({
      baslik: cleanInput.replace(/don yaparsa|don olursa/gi, '').trim() || 'Don Önlemi',
      zaman: 'Hava 0°C Altına İndiğinde',
      tarih_iso: null,
      tetikleyici: { tip: 'hava', sart: 'don', etiket: '❄️ Don Tehlikesi' },
      ikon: '❄️',
      renk: '#E0F2FE'
    }, cleanInput);
  }

  // 0. ÖNCELİK: LİSTE, MARKET VE ENVANTER / ÇOK SATIRLI GÖREV LİSTESİ AYRIŞTIRMA KURALI
  if (lower.includes('alınacak') || lower.includes('market') || lower.includes('liste') || lower.includes('bakkal') || lower.includes('pazar') || cleanInput.includes('\n')) {
    // Çok satırlı genel görev listesi ise
    if (cleanInput.includes('\n') || (cleanInput.includes('-') && cleanInput.split('-').length >= 3)) {
      const parsedItems = parseTextToChecklist(cleanInput);
      if (parsedItems.length > 0) {
        const isShopping = lower.includes('market') || lower.includes('pazar') || lower.includes('alınacak') ||
          parsedItems.some(i => /süt|sut|ekmek|yumurta|peynir|zeytin|su|deterjan|yağ|yag/i.test(i.task));

        return enrichWithPredictiveGraph({
          baslik: isShopping ? (lower.includes('pazar') ? 'Pazar Alışverişi' : 'Market Alışveriş Listesi') : 'Görev Listesi',
          zaman: isShopping ? 'Markette' : (zaman || 'Gerektiğinde'),
          tarih_iso: tarih_iso || null,
          action_items: parsedItems,
          ikon: isShopping ? '🛒' : '📝',
          renk: isShopping ? '#DCFCE7' : '#E0F2FE',
          anomali_notu: `${parsedItems.length} madde listelendi.`,
          sesli_fisilti: `Listeniz ${parsedItems.length} madde ile hazırlandı.`
        }, cleanInput);
      }
    }

    // "alınacaklar listesi", "marketten" gibi başlangıç kelimelerini temizle
    const rawItemsText = cleanInput
      .replace(/\b(alınacaklar|alınacak|listesi|market|bakkal|pazar|şunlar|al|almam lazım)\b/gi, '')
      .trim();

    // Virgül, "ve", "bir de", "ile" ve boşluklara göre maddeleri ayıkla
    let rawList = rawItemsText.split(/,|\s+ve\s+|\s+bir de\s+|\s+ile\s+|\n/gi);
    
    // Eğer tek parça kaldıysa ve boşluklarla ayrılmış birden çok kelime varsa kelime bazlı böl
    if (rawList.length === 1 && rawList[0].trim().split(/\s+/).length >= 2) {
      rawList = rawList[0].trim().split(/\s+/);
    }

    const checklistItems = rawList
      .map(item => item.trim())
      .filter(item => item.length > 1)
      .map(item => ({
        task: item.charAt(0).toLocaleUpperCase('tr-TR') + item.slice(1),
        is_completed: false
      }));

    if (checklistItems.length > 0) {
      return enrichWithPredictiveGraph({
        baslik: lower.includes('pazar') ? 'Pazar Alışverişi' : 'Market Alışveriş Listesi',
        zaman: 'Markette',
        tarih_iso: null,
        action_items: checklistItems,
        ikon: '🛒',
        renk: '#DCFCE7',
        anomali_notu: `${checklistItems.length} parça ürün listelendi.`,
        sesli_fisilti: `Alışveriş listeniz ${checklistItems.length} parça ürünle hazırlandı.`
      }, cleanInput);
    }
  }

  // 1. ÖNCELİK: TOPLANTI, YÖNETİM & RESMİ GÖRÜŞMELER
  // Kullanıcı "her cuma müdürle toplantı", "veli toplantısı", "öğretmenler kurulu" vb. söylediğinde
  // asla finans veya borç ile karıştırılmamalı, doğrudan toplantı kartı açılmalıdır!
  const isMeeting = 
    lower.includes('toplantı') || lower.includes('toplanti') ||
    lower.includes('görüşme') || lower.includes('gorusme') ||
    lower.includes('mülakat') || lower.includes('buluşma') ||
    lower.includes('kurul') ||
    (lower.includes('müdür') && !lower.includes('tl') && !lower.includes('lira') && !lower.includes('borç') && !lower.includes('öde'));

  if (isMeeting) {
    let baslik = 'Toplantı';
    let ikon = '🤝';
    let renk = '#E0F2FE'; // Pastel Mavi (Kurumsal / Resmi)

    if (lower.includes('müdür')) {
      baslik = 'Müdürle Toplantı';
      ikon = '🤝';
    } else if (lower.includes('veli')) {
      baslik = 'Veli Toplantısı';
      ikon = '🏫';
    } else if (lower.includes('öğretmen') || lower.includes('ogretmen')) {
      baslik = 'Öğretmenler Toplantısı';
      ikon = '📚';
    } else if (lower.includes('kurul')) {
      baslik = 'Kurul Toplantısı';
      ikon = '📋';
    } else if (lower.includes('mülakat') || lower.includes('iş görüşme')) {
      baslik = 'İş Mülakatı';
      ikon = '💼';
    } else if (lower.includes('avukat')) {
      baslik = 'Avukat Görüşmesi';
      ikon = '⚖️';
    } else if (lower.includes('ekip') || lower.includes('takım')) {
      baslik = 'Ekip Toplantısı';
      ikon = '👥';
    } else {
      const cleanWords = cleanInput
        .replace(/\b(her|yarın|bugün|öbür gün|saat|pazartesi|salı|çarşamba|perşembe|cuma|cumartesi|pazar|yapacağız|yaparız|olacak|edeceğiz|var)\b/gi, '')
        .replace(/\b\d{1,2}(?:[:.]\d{2})?\b/g, '')
        .replace(/\bda\b|\bde\b|\bte\b|\bta\b/gi, '')
        .trim();
      if (cleanWords.length > 2) {
        baslik = cleanWords.charAt(0).toUpperCase() + cleanWords.slice(1);
      } else {
        baslik = 'Toplantı';
      }
    }

    const hasExplicitTime = !!(periodicIso || tarih_iso);
    const isClarificationNeeded = !hasExplicitTime && (lower.includes('randevu') || lower.includes('görüşme') || lower.includes('gorusme') || lower.includes('buluşma') || lower.includes('toplantı') || lower.includes('toplanti'));

    return enrichWithPredictiveGraph({
      baslik: baslik.slice(0, 32),
      zaman: isClarificationNeeded ? null : (periodicZaman || zaman || 'Planlanan Toplantı'),
      tarih_iso: isClarificationNeeded ? null : (periodicIso || tarih_iso),
      eksik_bilgi: isClarificationNeeded ? true : undefined,
      soru: isClarificationNeeded ? 'Hangi gün ve saatte planlayalım?' : undefined,
      ikon,
      renk,
      tetikleyici,
      periyodik,
      sesli_fisilti: isClarificationNeeded ? 'Hangi gün ve saatte planlayalım?' : undefined,
    }, cleanInput);
  }

  // 2. ÖNCELİK: HUKUK & AVUKATLIK MESLEK MOTORU (LEGAL ENGINE)
  const legalResult = parseLegalNote(cleanInput, baseDate);
  if (legalResult) {
    return enrichWithPredictiveGraph(legalResult, cleanInput);
  }

  // 3. ÖNCELİK: EMNİYET VE KOLLUK KUVVETLERİ MOTORU (POLICE & LAW ENFORCEMENT ENGINE)
  const policeResult = parsePoliceLawEnforcementNote(cleanInput, baseDate);
  if (policeResult) {
    return enrichWithPredictiveGraph(policeResult, cleanInput);
  }

  // 4. ÖNCELİK: EĞİTİM VE OKUL YÖNETİM MOTORU (EDUMANAGER)
  const eduResult = parseEduManagerNote(cleanInput, baseDate);
  if (eduResult) {
    return enrichWithPredictiveGraph(eduResult, cleanInput);
  }

  // 5. ÖNCELİK: KAMU VE DEVLET MEMURU MOTORU (CIVIL SERVANT & PUBLIC OFFICE ENGINE)
  const civilServantResult = parseCivilServantPublicOfficeNote(cleanInput, baseDate);
  if (civilServantResult) {
    return enrichWithPredictiveGraph(civilServantResult, cleanInput);
  }

  // 6. ÖNCELİK: ASKER VE BİRLİK KOMUTANI MOTORU (MILITARY & COMMANDER ENGINE)
  const militaryResult = parseMilitaryCommanderNote(cleanInput, baseDate);
  if (militaryResult) {
    return enrichWithPredictiveGraph(militaryResult, cleanInput);
  }

  // 7. ÖNCELİK: MÜHENDİSLİK MOTORU (ENGINEERING SUITE - CIVIL, ELEC, MECH, SOFT)
  const engineeringResult = parseEngineeringSuiteNote(cleanInput, baseDate);
  if (engineeringResult) {
    return enrichWithPredictiveGraph(engineeringResult, cleanInput);
  }

  // 8. ÖNCELİK: ESNAF VE KÜÇÜK İŞLETME MOTORU (TRADESMAN & LOCAL SHOP ENGINE)
  const tradesmanResult = parseTradesmanLocalShopNote(cleanInput, baseDate);
  if (tradesmanResult) {
    return enrichWithPredictiveGraph(tradesmanResult, cleanInput);
  }

  // 9. ÖNCELİK: SAĞLIK VE KLİNİK ÇALIŞANLARI MOTORU (HEALTHCARE & CLINICAL ENGINE)
  const clinicalResult = parseHealthcareClinicalNote(cleanInput, baseDate);
  if (clinicalResult) {
    return enrichWithPredictiveGraph(clinicalResult, cleanInput);
  }

  // 10. ÖNCELİK: SAĞLIK, ÇOKLU İLAÇ & MEDİKAL DOZ YÖNETİMİ
  const multiMedResult = parseMultiMedicationNote(cleanInput, baseDate);
  if (multiMedResult) {
    return enrichWithPredictiveGraph(multiMedResult, cleanInput);
  }

  const isMedicationQuery = 
    lower.includes('ilaç') || lower.includes('ilac') || lower.includes('mide koruyucu') ||
    lower.includes('antibiyotik') || lower.includes('magnezyum') || lower.includes('vitamin') ||
    lower.includes('aspirin') || lower.includes('tansiyon') || lower.includes('tiroit') ||
    lower.includes('melatonin') || lower.includes('reçete') || lower.includes('recete') ||
    lower.includes('aç karnına') || lower.includes('tok karnına') || lower.includes('iğne') ||
    lower.includes('doktor') || lower.includes('diş') || lower.includes('tahlil');

  if (isMedicationQuery) {
    // Çoklu ilaç veya zaman/doz ayrıştırması var mı kontrol et
    const hasMultipleMedsOrDoses = 
      (lower.includes('sabah') && (lower.includes('öğlen') || lower.includes('oglen') || lower.includes('akşam') || lower.includes('aksam') || lower.includes('gece') || lower.includes('yatarken'))) ||
      (lower.includes('mide koruyucu') && (lower.includes('antibiyotik') || lower.includes('magnezyum') || lower.includes('vitamin'))) ||
      (/\b(sabah|öğlen|oglen|akşam|aksam|gece|yatarken)\s+(aç|ac|tok)\b/i.test(lower));

    if (hasMultipleMedsOrDoses) {
      const medActions: Array<{ task: string; is_completed: boolean }> = [];

      // 1. Sabah Aç (08:00)
      if (lower.includes('sabah aç') || lower.includes('sabah ac') || (lower.includes('sabah') && lower.includes('mide koruyucu')) || (lower.includes('sabah') && lower.includes('tiroit'))) {
        let name = 'Mide Koruyucu / İlaç';
        if (lower.includes('mide koruyucu')) name = 'Mide Koruyucu';
        else if (lower.includes('tiroit')) name = 'Tiroit İlacı';
        else if (lower.includes('aspirin')) name = 'Aspirin';
        medActions.push({ task: `08:00 - ${name} (Aç Karnına)`, is_completed: false });
      }

      // 2. Sabah Tok (09:00)
      if (lower.includes('sabah tok') || (lower.includes('sabah') && (lower.includes('vitamin') || lower.includes('tansiyon') || lower.includes('demir')) && !lower.includes('aç'))) {
        let name = 'Sabah İlacı / Vitamin';
        if (lower.includes('tansiyon')) name = 'Tansiyon İlacı';
        else if (lower.includes('vitamin')) name = 'Vitamin Takviyesi';
        else if (lower.includes('demir')) name = 'Demir Hapı';
        medActions.push({ task: `09:00 - ${name} (Tok Karnına)`, is_completed: false });
      }

      // 3. Öğlen Tok (13:30)
      if (lower.includes('öğlen') || lower.includes('oglen')) {
        let name = 'Öğlen İlacı';
        if (lower.includes('antibiyotik')) name = 'Antibiyotik';
        else if (lower.includes('vitamin')) name = 'Vitamin D';
        medActions.push({ task: `13:30 - ${name} (Tok Karnına)`, is_completed: false });
      }

      // 4. Akşam Aç (18:30)
      if (lower.includes('akşam aç') || lower.includes('aksam ac') || (lower.includes('akşam') && lower.includes('önce') && !lower.includes('tok'))) {
        let name = 'Akşam İlacı (Yemek Öncesi)';
        medActions.push({ task: `18:30 - ${name} (Aç Karnına)`, is_completed: false });
      }

      // 5. Akşam Tok (19:30)
      if (lower.includes('akşam tok') || lower.includes('aksam tok') || (lower.includes('akşam') && !lower.includes('aç') && !lower.includes('ac') && !lower.includes('önce') && !lower.includes('yatarken'))) {
        let name = 'Akşam İlacı';
        if (lower.includes('antibiyotik')) name = 'Antibiyotik (2. Doz)';
        else if (lower.includes('tansiyon')) name = 'Tansiyon İlacı';
        medActions.push({ task: `19:30 - ${name} (Tok Karnına)`, is_completed: false });
      }

      // 6. Gece / Yatarken (22:30)
      if (lower.includes('gece') || lower.includes('yatarken') || lower.includes('uyumadan') || lower.includes('magnezyum') || lower.includes('melatonin')) {
        let name = 'Gece Takviyesi';
        if (lower.includes('magnezyum')) name = 'Magnezyum';
        else if (lower.includes('melatonin')) name = 'Melatonin';
        medActions.push({ task: `22:30 - ${name} (Yatarken)`, is_completed: false });
      }

      // Eğer eşleşen bulunamadıysa standart güvenli dağılım
      if (medActions.length === 0) {
        medActions.push(
          { task: '08:00 - Sabah İlacı (Aç/Tok)', is_completed: false },
          { task: '13:30 - Öğlen İlacı (Tok Karnına)', is_completed: false },
          { task: '22:30 - Gece İlacı (Yatarken)', is_completed: false }
        );
      }

      return enrichWithPredictiveGraph({
        baslik: 'Günlük İlaç Takvimi',
        zaman: zaman || 'Günlük Biyolojik Dozlar',
        tarih_iso,
        ikon: '💊',
        renk: '#F3E8FF',
        anomali_notu: 'Mide koruyucu kahvaltıdan en az 30 dk önce alınmalı, süt ürünleriyle demir hapı karıştırılmamalıdır.',
        action_items: medActions,
        sesli_fisilti: 'Günlük ilaç ve medikal takviminiz biyolojik saatlere göre hazırlandı.'
      }, cleanInput);
    }

    const frequencyMatch = cleanInput.match(/günde\s*(\d+)\s*kez/i);
    const doseStr = frequencyMatch ? `(${frequencyMatch[1]}x1 Tok)` : '';
    
    return enrichWithPredictiveGraph({
      baslik: lower.includes('diş') ? 'Diş Randevusu' : (lower.includes('doktor') ? 'Doktor Randevusu' : (lower.includes('tahlil') ? 'Kan Tahlili / Açlık' : `İlaç Takibi ${doseStr}`.trim())),
      zaman: zaman || 'Günlük Doz',
      tarih_iso,
      ikon: lower.includes('diş') ? '🦷' : (lower.includes('doktor') ? '🩺' : (lower.includes('tahlil') ? '🩸' : '💊')),
      renk: '#F3E8FF'
    }, cleanInput);
  }

  // 3. ÖNCELİK: TEKNİK BAKIM / MUAYENE & SERVİS
  if (
    lower.includes('muayene') || lower.includes('pasaport') ||
    lower.includes('balata') || lower.includes('kombi') || lower.includes('lastik') ||
    lower.includes('basınç') || lower.includes('filtre') || lower.includes('tamir') ||
    lower.includes('servis') || (lower.includes('araba') && lower.includes('bakım')) || lower.includes('tüvtürk')
  ) {
    let baslik = 'Teknik Bakım';
    let ikon = '🔧';

    if (lower.includes('muayene') || lower.includes('tüvtürk')) { baslik = 'Araç Muayenesi'; ikon = '🚗'; }
    else if (lower.includes('pasaport')) { baslik = 'Pasaport Randevusu'; ikon = '🛂'; }
    else if (lower.includes('balata')) baslik = 'Fren Balata Değişimi';
    else if (lower.includes('lastik')) { baslik = 'Kışlık Lastik Değişimi'; ikon = '🛞'; }
    else if (lower.includes('kombi')) baslik = 'Kombi Basınç Kontrolü';
    else if (lower.includes('filtre')) { baslik = 'Filtre Değişimi'; ikon = '💧'; }

    return enrichWithPredictiveGraph({
      baslik,
      zaman: tetikleyici ? tetikleyici.etiket : (zaman || 'Servis Takibi'),
      tarih_iso: tetikleyici ? null : tarih_iso,
      ikon,
      renk: '#FEF3C7',
      tetikleyici
    }, cleanInput);
  }

  // 4. ÖNCELİK: KURUMSAL / BÜROKRASİ / 3. ŞAHIS DENETİM & RESMİ GÖREVLER
  if (
    lower.includes('müfettiş') || lower.includes('bakan') || lower.includes('denetim') ||
    lower.includes('nöbet') || lower.includes('evrak') ||
    lower.includes('protokol') || lower.includes('ziyaret')
  ) {
    let baslik = 'Kurumsal Takip';
    let ikon = '📄';

    if (lower.includes('müfettiş') || lower.includes('denetim')) {
      baslik = 'Müfettiş Evrak Denetimi';
      ikon = '📁';
    } else if (lower.includes('nöbet')) {
      baslik = 'Nöbetçi Görevi';
      ikon = '📋';
    } else if (lower.includes('bakan')) {
      baslik = 'Bakan Ziyareti';
      ikon = '🏛️';
    } else if (lower.includes('rapor') || lower.includes('evrak')) {
      baslik = 'Evrak / Rapor Teslimi';
      ikon = '📑';
    }

    return enrichWithPredictiveGraph({
      baslik,
      zaman: tetikleyici ? tetikleyici.etiket : (zaman || 'Resmi Takip'),
      tarih_iso: tetikleyici ? null : tarih_iso,
      ikon,
      renk: '#E0F2FE',
      tetikleyici
    }, cleanInput);
  }

  // 5. ÖNCELİK: EMANET, ALACAK & SOSYAL BELLEK / FİNANSAL İŞLEMLER
  const isEmanetOrLending = 
    /\b(emanet|borç verdim|borc verdim|ödünç verdim|odunc verdim|verdim|teslim ettim|bıraktım)\b/i.test(lower) &&
    !lower.includes('sipariş') && !lower.includes('kargo');

  if (isEmanetOrLending) {
    const default14Days = new Date(baseDate);
    default14Days.setDate(default14Days.getDate() + 14);
    default14Days.setHours(11, 0, 0, 0);

    const hasTime = !!(periodicIso || tarih_iso);
    const targetIso = hasTime ? (periodicIso || tarih_iso) : default14Days.toISOString();
    const targetZaman = hasTime ? (periodicZaman || zaman) : '14 Gün Sonra';

    let itemDesc = cleanInput
      .replace(/\b(emanet|borç|borc|ödünç|odunc|verdim|teslim ettim|bıraktım|bugün|dün)\b/gi, '')
      .trim();
    if (itemDesc.length > 25) itemDesc = itemDesc.slice(0, 25);
    const title = itemDesc ? `${itemDesc.charAt(0).toUpperCase() + itemDesc.slice(1)} (Emanet)` : 'Emanet / Alacak Takibi';

    return enrichWithPredictiveGraph({
      baslik: title.slice(0, 32),
      zaman: targetZaman,
      tarih_iso: targetIso,
      ikon: '🤝',
      renk: '#F3E8FF',
      anomali_notu: '💡 Emanet/borç teslimi için 14 gün sonrasına sessiz teyit görevi oluşturuldu.',
      action_items: [
        { task: 'Emanet / Borç teslim alındı mı teyit et', is_completed: false },
        { task: 'Muhatap ile nezaketle durum kontrolü yap', is_completed: false }
      ],
      sesli_fisilti: 'Emanet kaydı alındı, 14 gün sonrasına teyit adımı eklendi.',
      tetikleyici,
      periyodik
    }, cleanInput);
  }

  // 5b. ÖNCELİK: FİNANSAL İŞLEMLER (Ödeme / Alacak / Borç / Fatura)
  // KESİN GÜVENLİK FİLTRESİ:
  // "saat 9 da", "cuma", "hafta" gibi zaman/tarih sözcükleri KESİNLİKLE tutar veya kişi ismi sayılamaz!
  const hasCurrencySuffix = /\b(\d+(?:[.,]\d+)?)\s*(?:bin\s*)?(?:tl|lira|₺|euro|€|dolar|\$|usd)\b/i.test(cleanInput);
  const isExplicitFinancialVerb = /\b(alacak|alacağım|borç|borcum|öde|ödeyeceğim|ödemesi|havale|eft|taksit|kira|fatura|aidat|maaş)\b/i.test(lower);

  // Gün ve zaman kelimeleri asla alıcı/kaynak kişi ismi olamaz
  const nonPersonBlacklist = new Set([
    'pazartesi', 'salı', 'sali', 'çarşamba', 'carsamba', 'perşembe', 'persembe', 'cuma', 'cumartesi', 'pazar',
    'bugün', 'yarın', 'öbür', 'gün', 'saat', 'dakika', 'hafta', 'ay', 'yıl', 'sene', 'araba', 'ev', 'oda', 'okul',
    'iş', 'toplantı', 'randevu', 'servis', 'kombi', 'muayene', 'doktor', 'müdür', 'veli', 'öğretmen', 'lastik'
  ]);

  const rawRecipientMatch = cleanInput.match(/\b([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ]?[a-zçğıöşü]+)?)(?:'?[yea])\b/);
  const rawSourceMatch = cleanInput.match(/\b([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ]?[a-zçğıöşü]+)?)(?:'?[dten]an|'?[dten]en)\b/);

  const recipientMatch = (rawRecipientMatch && !nonPersonBlacklist.has(rawRecipientMatch[1].toLowerCase())) ? rawRecipientMatch : null;
  const sourceMatch = (rawSourceMatch && !nonPersonBlacklist.has(rawSourceMatch[1].toLowerCase())) ? rawSourceMatch : null;

  // Tutarı sadece para birimi varsa veya açıkça borç/alacak/ödeme fiili varsa tanı
  let amountStr: string | null = null;
  if (hasCurrencySuffix) {
    const curMatch = cleanInput.match(/(\d+(?:[.,]\d+)?\s*(?:bin\s*)?(?:tl|lira|₺|euro|€|dolar|\$|usd)?)/i);
    amountStr = curMatch ? curMatch[0] : null;
  } else if (isExplicitFinancialVerb) {
    // Saat kelimesi ile bitişik olmayan sayıyı al
    const cleanNoTime = cleanInput.replace(/saat\s*\d{1,2}(?:[:.]\d{2})?/gi, '').replace(/\b\d{1,2}\s*(?:'da|'de|da|de)\b/gi, '');
    const numMatch = cleanNoTime.match(/(\d+(?:[.,]\d+)?\s*(?:bin)?)/);
    amountStr = numMatch ? `${numMatch[0]} TL` : null;
  }

  if (amountStr && (isExplicitFinancialVerb || (hasCurrencySuffix && (recipientMatch || sourceMatch)))) {
    let title = 'Finansal İşlem';
    let isPayable = lower.includes('borcum') || lower.includes('öde') || lower.includes('at') || lower.includes('gönder') || !!recipientMatch;

    if (recipientMatch) {
      title = `${recipientMatch[1]}: ${amountStr} Ödeme`;
      isPayable = true;
    } else if (sourceMatch) {
      title = `${sourceMatch[1]}: ${amountStr} Alacak`;
      isPayable = false;
    } else if (lower.includes('alacak') || lower.includes('alacağım')) {
      title = `${amountStr} Alacak Takibi`;
      isPayable = false;
    } else {
      title = `${amountStr} Ödeme Takibi`;
      isPayable = true;
    }

    return enrichWithPredictiveGraph({
      baslik: title.slice(0, 32),
      zaman: tetikleyici ? tetikleyici.etiket : (zaman || 'Vade Belirtilmedi'),
      tarih_iso: tetikleyici ? null : tarih_iso,
      ikon: isPayable ? '💳' : '💰',
      renk: isPayable ? '#FEE2E2' : '#DCFCE7',
      tetikleyici
    }, cleanInput);
  }

  // 6. ÖNCELİK: KISA SENARYO EŞLEŞTİRME (Leb Demeden Leblebiyi Anlama)
  const shortScenario = matchShortScenario(cleanInput);
  if (shortScenario) {
    return enrichWithPredictiveGraph({
      baslik: shortScenario.baslik,
      zaman: periodicZaman || zaman || shortScenario.varsayilanZaman,
      tarih_iso: periodicIso || tarih_iso,
      ikon: shortScenario.ikon,
      renk: shortScenario.renk,
      tetikleyici: tetikleyici || (shortScenario.tetikleyici ? {
        tip: shortScenario.tetikleyici.tip,
        sart: shortScenario.tetikleyici.sart,
        etiket: shortScenario.tetikleyici.etiket
      } : null),
      periyodik,
      anomali_notu: shortScenario.akilliFisilti,
      hazirlik_zamani: shortScenario.hazirlikZamani
    }, cleanInput);
  }

  // 7. ÖNCELİK: İLETİŞİM, TELEFONLA ARAMA VE ÇAĞRI HATIRLATICILARI
  // "akşam 9da alpereni ara", "annemi ara", "doktoru ara", "mehmet beyi ara", "veli grubuna telefon et"
  const isCall =
    /\b(ara|aramak|ararsın|aransın|telefon et|çağrı yap|ulaş)\b/i.test(lower) &&
    !lower.includes('araç') && !lower.includes('araba') && !lower.includes('arada') && !lower.includes('fırsat ara');

  if (isCall) {
    let personName = '';
    // "alpereni ara", "annemi ara", "doktoru ara", "ahmet abiyi ara"
    const callMatch = cleanInput.match(/\b([A-ZÇĞİÖŞÜa-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜa-zçğıöşü]+)?)\s+(?:ara|aramak|telefon et|çağrı yap)\b/i);
    if (callMatch) {
      const candidate = callMatch[1].trim();
      const temporalStopwords = ['akşam', 'aksam', 'sabah', 'öğlen', 'oglen', 'gece', 'yarın', 'yarin', 'bugün', 'bugun', 'saat', 'sonra', 'önce'];
      const filteredWords = candidate.split(/\s+/).filter(w => !temporalStopwords.includes(w.toLowerCase()) && !/^\d+/.test(w));
      if (filteredWords.length > 0) {
        personName = filteredWords.join(' ');
      }
    }

    if (!personName) {
      const altMatch = cleanInput.match(/(?:ara|aramak|telefon et)\s+([A-ZÇĞİÖŞÜa-zçğıöşü]+)/i);
      if (altMatch) {
        personName = altMatch[1].trim();
      }
    }

    let formattedTitle = 'Telefon Görüşmesi';
    if (personName) {
      const capName = personName.charAt(0).toLocaleUpperCase('tr-TR') + personName.slice(1);
      formattedTitle = `${capName} Ara`;
    }

    return enrichWithPredictiveGraph({
      baslik: formattedTitle,
      zaman: periodicZaman || zaman || 'Bu Akşam 21:00',
      tarih_iso: periodicIso || tarih_iso,
      ikon: '📞',
      renk: '#DCFCE7', // Pastel Yeşil (İletişim & Sosyal)
      anomali_notu: '📞 Görüşülecek konuları ve notlarınızı önceden hazırlayın.',
      action_items: [
        { task: 'Görüşülecek ana konu başlıklarını hazırla', is_completed: false },
        { task: 'Muhatabın müsaitlik durumunu teyit et', is_completed: false }
      ],
      tetikleyici,
      periyodik
    }, cleanInput);
  }

  // 8. ÖNCELİK: DİĞER RANDEVU VE ETKİNLİKLER
  if (
    lower.includes('randevu') || lower.includes('kuaför') || lower.includes('berber') ||
    lower.includes('uçak') || lower.includes('uçuş') || lower.includes('seyahat')
  ) {
    let baslik = 'Randevu';
    let ikon = '🗓️';
    if (lower.includes('uçuş') || lower.includes('uçak') || lower.includes('seyahat')) {
      baslik = 'Uçak Seyahati';
      ikon = '✈️';
    } else if (lower.includes('kuaför') || lower.includes('berber')) {
      baslik = 'Kuaför Randevusu';
      ikon = '✂️';
    }

    return enrichWithPredictiveGraph({
      baslik,
      zaman: periodicZaman || zaman || 'Planlanan Zaman',
      tarih_iso: periodicIso || tarih_iso,
      ikon,
      renk: '#FEF3C7',
      tetikleyici,
      periyodik,
    }, cleanInput);
  }

  // 9. ÖNCELİK: EMANET / İADE
  if (lower.includes('emanet') || lower.includes('geri ver') || lower.includes('iade') || lower.includes('aldım')) {
    return enrichWithPredictiveGraph({
      baslik: (cleanInput.slice(0, 24) + ' (İade)').slice(0, 30),
      zaman: zaman || 'Takip',
      tarih_iso,
      ikon: '🪜',
      renk: getCardColor(cleanInput, '#E0F2FE')
    }, cleanInput);
  }

  // G. GENEL DÜŞÜŞ (Fallback)
  let cleanTitle = cleanInput
    .replace(/\b(?:akşam|aksam|sabah|öğlen|oglen|gece|yarın|yarin|bugün|bugun)\b/gi, '')
    .replace(/\b(?:saat\s*)?\d{1,2}(?:[:.]\d{2})?(?:\s*['’]?(?:da|de|ta|te))?\b/gi, '')
    .replace(/\b(?:dokuzda|sekizde|yedide|altıda|beşte|dörtte|üçte|ikide|birde|onda)\b/gi, '')
    .trim();
  if (cleanTitle.length < 2) cleanTitle = cleanInput;
  cleanTitle = cleanTitle.charAt(0).toLocaleUpperCase('tr-TR') + cleanTitle.slice(1);
  const titleWords = cleanTitle.split(/\s+/);
  if (titleWords.length > 4) cleanTitle = titleWords.slice(0, 4).join(' ');

  const baseResult: NotiviaSimpleNote = {
    baslik: cleanTitle || 'Not',
    zaman: periodicZaman || zaman || 'Not',
    tarih_iso: periodicIso || tarih_iso,
    ikon: periyodik ? '🔄' : '📌',
    renk: periyodik ? '#FEF3C7' : getCardColor(cleanInput),
    periyodik,
  };

  return enrichWithPredictiveGraph(baseResult, cleanInput);
}

/**
 * Üretilen NotiviaSimpleNote nesnesini Predictive Action Graph ile zenginleştirir:
 * Ön hazırlık adımları, tersine bildirim zamanı ve rehberlik fısıltısı ekler.
 */
function enrichWithPredictiveGraph(note: NotiviaSimpleNote, input: string): NotiviaSimpleNote {
  const predictive = inferPredictiveActions(input);
  if (!predictive) return note;

  const result = { ...note };

  // 0. Botanik / özel başlık ve zamanlama geçişi (eğer genel/varsayılansa)
  if (predictive.baslik && (!result.baslik || result.baslik === 'Yeni Eylem' || result.baslik === 'Yeni Hatırlatıcı')) {
    result.baslik = predictive.baslik;
  }
  if (predictive.zaman && (!result.zaman || result.zaman === 'Bugün')) {
    result.zaman = predictive.zaman;
  }
  if (predictive.tarih_iso && !result.tarih_iso) {
    result.tarih_iso = predictive.tarih_iso;
  }

  // 1. Ön hazırlık fısıltısı ve anomali / rehberlik notu
  if (!result.anomali_notu && predictive.akilliFisilti) {
    result.anomali_notu = predictive.akilliFisilti;
  }

  // 2. Tersine Zamanlanmış Ön Bildirim (Hazırlık Zamanı)
  if (!result.hazirlik_zamani && predictive.hazirlikZamani) {
    result.hazirlik_zamani = predictive.hazirlikZamani;
  }

  // Eğer tarih_iso varsa ve hazırlık saat öncesi biliniyorsa hazirlik_iso hesapla
  if (result.tarih_iso && predictive.hazirlikSaatOncesi && !result.hazirlik_iso) {
    try {
      const eventTime = new Date(result.tarih_iso).getTime();
      const prepTime = new Date(eventTime - predictive.hazirlikSaatOncesi * 60 * 60 * 1000);
      result.hazirlik_iso = prepTime.toISOString();
    } catch {
      // sessizce geç
    }
  }

  // 3. Alt kontrol adımları (Checklist items)
  if ((!result.action_items || result.action_items.length === 0) && predictive.oncedenYapilacaklar.length > 0) {
    result.action_items = predictive.oncedenYapilacaklar.map((task) => ({
      task,
      is_completed: false,
    }));
  }

  // 4. Kulaktan verilecek kısa sesli doğrulama fısıltısı
  if (predictive.sesliFisilti && (!result.sesli_fisilti || result.sesli_fisilti.includes('oluşturuldu'))) {
    result.sesli_fisilti = predictive.sesliFisilti;
  } else if (!result.sesli_fisilti) {
    result.sesli_fisilti = `${result.baslik} planlandı, hazırlık adımları hazırlandı.`;
  }

  // 5. İkon ve Renk Tema Uyarlaması
  if (predictive.ikon && (!result.ikon || result.ikon === '📌')) {
    result.ikon = predictive.ikon;
  }
  if (predictive.renk && (!result.renk || result.renk === '#FEF3C7' || result.renk.startsWith('#F5'))) {
    result.renk = predictive.renk;
  }

  return result;
}
