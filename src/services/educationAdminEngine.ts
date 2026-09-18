// src/services/educationAdminEngine.ts

export interface SchoolAdminTask {
  id: string;
  baslik: string;
  kategori: 'Özel Eğitim' | 'Mevzuat & DYS' | 'Öğrenci İşleri' | 'Özlük & Puantaj' | 'Kurul & Zümre';
  mevzuat_notu: string;
  action_items: { task: string; is_completed: boolean }[];
  zaman_etiketi: string;
  tarih_iso: string | null;
  ikon: string;
  renk: string;
  sesli_geribildirim: string;
}

export function parseSchoolAdminIntent(rawText: string, now: Date = new Date()): SchoolAdminTask | null {
  if (!rawText || typeof rawText !== 'string') return null;
  const text = rawText.toLowerCase().trim();

  // 1. DESTEK EĞİTİM ODASI, BEP & RAM SÜRECİ
  if (
    text.includes('destek eğitim') ||
    text.includes('destek egitim') ||
    text.includes('bep') ||
    (text.includes('ram') && (text.includes('rapor') || text.includes('yönlendirme') || text.includes('yonlendirme') || text.includes('öğrenci') || text.includes('ogrenci')))
  ) {
    const isMonday = text.includes('pazartesi');
    const targetDate = new Date(now);

    if (isMonday) {
      const day = targetDate.getDay();
      const diff = (day === 0 ? 1 : 8 - day); // En yakın pazartesi
      targetDate.setDate(targetDate.getDate() + diff);
      targetDate.setHours(8, 30, 0, 0); // Sabah mesai başlangıcı
    }

    return {
      id: `edu_${Date.now()}`,
      baslik: 'Destek Eğitim Odası Onay Yazısı (DYS)',
      kategori: 'Özel Eğitim',
      mevzuat_notu: 'MEB Özel Eğitim Hizmetleri Yönetmeliği uyarınca haftalık ders çizelgesi, RAM raporu ve veli izinleri tamamlanmalıdır.',
      action_items: [
        { task: 'Öğrenci RAM raporlarını ve haftalık toplam ders saatlerini doğrula', is_completed: false },
        { task: 'Görev alacak öğretmenlerin haftalık ders programı çakışmalarını kontrol et', is_completed: false },
        { task: 'DYS üzerinden Kaymakamlık / İlçe MEM Olur üst yazısını hazırla ve onaya gönder', is_completed: false },
        { task: 'Veli muvafakatnamelerini özel eğitim dosyasına zımbala', is_completed: false }
      ],
      zaman_etiketi: isMonday ? 'Pazartesi 08:30 (DYS Görevi)' : 'İdari İşlem',
      tarih_iso: isMonday ? targetDate.toISOString() : null,
      ikon: '🏫',
      renk: '#E0E7FF', // İdari Mavi
      sesli_geribildirim: 'Destek eğitim odası onay yazısı görevi kaydedildi. DYS hazırlık adımları ve veli onay süreci kuruldu.'
    };
  }

  // 2. DEVAMSIZLIK, E-OKUL & VELİ TEBLİGATI
  if (
    text.includes('devamsızlık') ||
    text.includes('devamsizlik') ||
    (text.includes('e-okul') && (text.includes('mektup') || text.includes('yazı') || text.includes('tebligat') || text.includes('devam')))
  ) {
    return {
      id: `edu_${Date.now()}`,
      baslik: 'e-Okul Devamsızlık Mektupları ve Veli Tebligatı',
      kategori: 'Öğrenci İşleri',
      mevzuat_notu: 'MEB Ortaöğretim / İlköğretim Kurumları Yönetmeliği gereği 5 ve 10 gün devamsızlık bildirimleri yasal süre içinde veliye tebliğ edilmelidir.',
      action_items: [
        { task: 'e-Okul sistemi üzerinden devamsızlık mektuplarının dökümünü al', is_completed: false },
        { task: 'Özürsüz 5 ve 10 günü aşan öğrencilerin veli iletişim bilgilerini doğrula', is_completed: false },
        { task: 'Tebligat mektuplarını posta / zimmet defteri ile veliye ilet', is_completed: false },
        { task: 'Geri gelen tebellüğ belgelerini öğrenci özlük dosyasına tak', is_completed: false }
      ],
      zaman_etiketi: 'Haftalık Kontrol',
      tarih_iso: null,
      ikon: '🏫',
      renk: '#E0E7FF', // İdari Mavi
      sesli_geribildirim: 'Devamsızlık takip ve veli tebligat süreci resmi idari takvime işlendi.'
    };
  }

  // 3. EK DERS, PUANTAJ & KBS KAPATMA
  if (
    text.includes('ek ders') ||
    text.includes('puantaj') ||
    text.includes('kbs') ||
    (text.includes('nöbet') && (text.includes('ücret') || text.includes('defter') || text.includes('puantaj')))
  ) {
    return {
      id: `edu_${Date.now()}`,
      baslik: 'Aylık Ek Ders ve Puantaj İşlemleri',
      kategori: 'Özlük & Puantaj',
      mevzuat_notu: 'Rapor, sevk, idari izin ve nöbet görevleri puantaj cetveline eksiksiz işlenmelidir.',
      action_items: [
        { task: 'Sınıf defterleri ve nöbet defteri imzalarını kontrol et', is_completed: false },
        { task: 'Raporlu ve izinli öğretmenlerin ders kesintilerini MEBBİS modülüne gir', is_completed: false },
        { task: 'Puantaj çıktısını okul müdürüne imzalatıp KBS sistemine aktar', is_completed: false }
      ],
      zaman_etiketi: 'Ay Sonu / Maaş Öncesi',
      tarih_iso: null,
      ikon: '📑',
      renk: '#E0E7FF', // İdari Mavi
      sesli_geribildirim: 'Ek ders puantaj kapatma kontrol listesi ve KBS adımları hazırlandı.'
    };
  }

  // 4. ŞÖK / ZÜMRE / ÖĞRETMENLER KURULU
  if (
    text.includes('şök') ||
    text.includes('sok') ||
    text.includes('zümre') ||
    text.includes('zumre') ||
    text.includes('öğretmenler kurulu') ||
    text.includes('ogretmenler kurulu')
  ) {
    return {
      id: `edu_${Date.now()}`,
      baslik: 'Kurul / Zümre Toplantı Süreci',
      kategori: 'Kurul & Zümre',
      mevzuat_notu: 'Toplantı tutanağı ve imza sirküsü kurul tamamlandıktan sonra idareye teslim edilmelidir.',
      action_items: [
        { task: 'Toplantı gündem maddelerini ve imza föyünü öğretmenler odasına duyur', is_completed: false },
        { task: 'Toplantı salonu veya idari odayı hazırla', is_completed: false },
        { task: 'Alınan kararları karar defterine veya DYS kurul modülüne işle', is_completed: false }
      ],
      zaman_etiketi: 'Toplantı Günü',
      tarih_iso: null,
      ikon: '📑',
      renk: '#E0E7FF', // İdari Mavi
      sesli_geribildirim: 'Kurul hazırlık süreci ajandaya işlendi.'
    };
  }

  // 5. RESMİ YAZIŞMA, DYS, DESİMAL KODU & KAYMAKAMLIK OLURU
  if (
    text.includes('dys') ||
    text.includes('kaymakamlık olur') ||
    text.includes('kaymakamlik olur') ||
    text.includes('üst yazı') ||
    text.includes('ust yazi') ||
    text.includes('desimal') ||
    text.includes('ilçe mem') ||
    text.includes('il mem') ||
    text.includes('mebbis')
  ) {
    return {
      id: `edu_${Date.now()}`,
      baslik: 'DYS Resmi Yazışma ve Onay Süreci',
      kategori: 'Mevzuat & DYS',
      mevzuat_notu: 'Resmi Yazışmalarda Uygulanacak Usul ve Esaslar Hakkında Yönetmelik gereğince Standart Dosya Planı (Desimal Kod) seçilmeli ve e-İmza ile paraflanmalıdır.',
      action_items: [
        { task: 'Standart Dosya Planı (Desimal Kodu) ve konu başlığını seç', is_completed: false },
        { task: 'DYS üst yazısını hazırla ve ek belgeleri sisteme tara', is_completed: false },
        { task: 'Okul Müdürü ve İlçe MEM onay zincirine e-İmza ile ilet', is_completed: false },
        { task: 'Gelen olur sayısını ve tarihini kayıt defterine işle', is_completed: false }
      ],
      zaman_etiketi: 'Resmi Mesai',
      tarih_iso: null,
      ikon: '📑',
      renk: '#E0E7FF', // İdari Mavi
      sesli_geribildirim: 'DYS resmi üst yazı ve onay süreci resmi idari takvime kaydedildi.'
    };
  }

  // 6. DİSİPLİN VE ÖDDK SÜRECİ
  if (
    text.includes('disiplin') ||
    text.includes('öddk') ||
    text.includes('oddk') ||
    (text.includes('soruşturma') && (text.includes('öğrenci') || text.includes('okul')))
  ) {
    return {
      id: `edu_${Date.now()}`,
      baslik: 'Öğrenci Disiplin Kurulu (ÖDDK) Dosyası',
      kategori: 'Öğrenci İşleri',
      mevzuat_notu: 'MEB Ödül ve Disiplin Yönetmeliği uyarınca 3 günlük savunma süresi tanınmalı, nöbetçi öğretmen tutanağı ve ifadeler eksiksiz dosyalanmalıdır.',
      action_items: [
        { task: 'Nöbetçi öğretmen tutanağı ve tanık öğrenci ifadelerini topla', is_completed: false },
        { task: 'İlgili öğrenciye 3 günlük yasal yazılı savunma bildirimini yap', is_completed: false },
        { task: 'Veliye disiplin sevk bildirimini resmi tebligatla ilet', is_completed: false },
        { task: 'ÖDDK kurulunu toplayarak karar karar defterine ve e-Okul sistemine işle', is_completed: false }
      ],
      zaman_etiketi: 'Yasal Süreç (3 Gün)',
      tarih_iso: null,
      ikon: '🏫',
      renk: '#E0E7FF', // İdari Mavi
      sesli_geribildirim: 'Disiplin ve ÖDDK süreci yasal savunma takvimiyle birlikte idari dosyaya kaydedildi.'
    };
  }

  return null;
}
