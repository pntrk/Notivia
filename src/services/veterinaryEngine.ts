// src/services/veterinaryEngine.ts

import { matchShortScenario } from '../utils/scenarioDatabase.ts';

export interface VeterinaryTask {
  id: string;
  baslik: string;
  kategori:
    | 'Klinik & Aşı Takvimi'
    | 'Cerrahi & Anestezi'
    | 'PETVET & Yurt Dışı Seyahat'
    | 'Acil & Toksikoloji'
    | 'Büyükbaş & TÜRKVET'
    | 'Reprodüksiyon & Doğum'
    | 'Sürü Sağlığı & Mastitis'
    | 'Dermatoloji & Parazitoloji'
    | 'Diş & Ağız Sağlığı'
    | 'Laboratuvar & Tanı'
    | 'At Hekimliği & Kolik'
    | 'VETBİS & İlaç / Biyogüvenlik';
  mevzuat_notu: string;
  action_items: { task: string; is_completed: boolean }[];
  zaman_etiketi: string;
  tarih_iso: string | null;
  hazirlik_zamani?: string;
  ikon: string;
  renk: string;
  sesli_geribildirim: string;
  anomali_notu?: string;
}

export function parseVeterinaryIntent(
  rawText: string,
  now: Date = new Date(),
  userDomain?: string
): VeterinaryTask | null {
  if (!rawText || typeof rawText !== 'string') return null;
  const text = rawText.toLowerCase().trim();

  // 0. HIZLI SENARYO VERİTABANI KONTROLÜ (matchShortScenario - VETERINER)
  const shortMatch = matchShortScenario(rawText, 'VETERINER');
  if (shortMatch && shortMatch.domain === 'VETERINER') {
    return {
      id: `vet_scenario_${Date.now()}`,
      baslik: shortMatch.baslik,
      kategori: 'Klinik & Aşı Takvimi',
      mevzuat_notu: shortMatch.akilliFisilti || '5996 sayılı Kanun ve Veteriner Hekimliği mevzuatına uygun kayıt tutulmalıdır.',
      action_items: (shortMatch.oncedenYapilacaklar || []).map((t) => ({ task: t, is_completed: false })),
      zaman_etiketi: shortMatch.varsayilanZaman || 'Klinik Randevusu',
      tarih_iso: null,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      ikon: shortMatch.ikon || '🐾',
      renk: shortMatch.renk || '#CCFBF1',
      sesli_geribildirim: shortMatch.akilliFisilti || `${shortMatch.baslik} planlandı.`
    };
  }

  // 1. PETVET MİKROÇİP İĞNESİ & EVCL HAYVAN PASAPORTU KAYDI
  if (
    text.includes('mikroçip') ||
    text.includes('mikrocip') ||
    text.includes('petvet') ||
    text.includes('evcil hayvan pasaport') ||
    text.includes('çip tak') ||
    text.includes('çip okuma') ||
    text.includes('tarım ilçe kayıt') ||
    text.includes('kedi çip') ||
    text.includes('köpek çip')
  ) {
    const isToday = text.includes('bugün') || text.includes('hemen');
    return {
      id: `vet_chip_${Date.now()}`,
      baslik: 'PETVET Mikroçip & Pasaport Kaydı',
      kategori: 'PETVET & Yurt Dışı Seyahat',
      mevzuat_notu: '5199 ve 5996 sayılı Kanunlar uyarınca kedi, köpek ve gelinciklerin ISO 11784/11785 uyumlu mikroçip ile PETVET sistemine kaydı ve resmi pasaport tanzimi yasal zorunluluktur.',
      action_items: [
        { task: '15 haneli mikroçipi enjektörden çıkarmadan önce mikroçip okuyucu ile test et', is_completed: false },
        { task: 'Sol boyun / skapular bölge derisini dezenfekte ederek mikroçipi subkutan (SC) implante et ve ardından tekrar tara', is_completed: false },
        { task: 'Bakanlık PETVET sistemine hayvan sahibi kimlik, ırk, cinsiyet, eşgal ve doğum bilgilerini kaydet', is_completed: false },
        { task: 'Resmi Evcil Hayvan Pasaportuna mikroçip barkod etiketini yapıştır, kaşe ve ıslak imza ile mühürle', is_completed: false }
      ],
      zaman_etiketi: isToday ? 'Bugün Klinik Kayıt (14:00)' : 'PETVET Kayıt Randevusu',
      tarih_iso: null,
      hazirlik_zamani: 'İşlem Öncesi Çip Barkod Kontrolü',
      ikon: '🐾',
      renk: '#CCFBF1',
      sesli_geribildirim: 'Mikroçip implantasyonu, PETVET sistem tescili ve pasaport mühürleme adımları hazırlandı.'
    };
  }

  // 2. KUDUZ TİTRASYON TESTİ (RNATT) & YURT DIŞI SEYAHAT PROTOKOLÜ
  if (
    text.includes('kuduz titrasyon') ||
    text.includes('titrasyon') ||
    text.includes('titre testi') ||
    text.includes('rnatt') ||
    text.includes('yurt dışı kedi') ||
    text.includes('yurt dışı köpek') ||
    text.includes('yurtdışı çıkış pet') ||
    text.includes('yurt dışı seyahat') ||
    text.includes('kuduz antikor')
  ) {
    const bloodDate = new Date(now);
    bloodDate.setDate(bloodDate.getDate() + 30); // 30 gün sonra kan alma

    const travelDate = new Date(now);
    travelDate.setDate(travelDate.getDate() + 120); // 3 ay karantina bekleme süresi

    return {
      id: `vet_rnatt_${Date.now()}`,
      baslik: 'Kuduz Titrasyon (RNATT) & Yurt Dışı Çıkış',
      kategori: 'PETVET & Yurt Dışı Seyahat',
      mevzuat_notu: 'AB ve uluslararası pet seyahat regülasyonları uyarınca, kuduz aşısından en az 30 gün sonra kan alınmalı; FAVN/RNATT testinde antikor titresi ≥0.50 IU/mL çıkmalı ve kan alımından itibaren 3 takvim ayı beklenmelidir.',
      action_items: [
        { task: 'Kuduz aşısının mikroçip takıldıktan sonra yapıldığını ve üzerinden en az 30 gün geçtiğini PETVET karnesinden teyit et', is_completed: false },
        { task: 'Jelli biyokimya tüpüne en az 2-3 mL kan al, santrifüj ederek serumu ayır ve soğuk zincirde (+4°C) tut', is_completed: false },
        { task: 'Resmi Dilekçe ve Pasaport fotokopisiyle birlikte numuneyi Tarım Bakanlığı Yetkili Kuduz Teşhis Laboratuvarına gönder', is_completed: false },
        { task: 'Test sonucunun ≥0.50 IU/mL olduğunu doğrula ve kan alım tarihinden itibaren 90 günlük bekleme sayacını başlat', is_completed: false },
        { task: 'Uçuş/çıkıştan önceki 48 saat içinde İlçe Tarım Müdürlüğünden Uluslararası Veteriner Sağlık Sertifikası (VSR) al', is_completed: false }
      ],
      zaman_etiketi: '30. Gün Kan Alımı / 90 Gün Bekleme',
      tarih_iso: bloodDate.toISOString(),
      hazirlik_zamani: 'Kuduz Aşısından 30 Gün Sonra',
      ikon: '✈️',
      renk: '#E0F2FE',
      sesli_geribildirim: 'Kuduz titrasyon kan alımı, laboratuvar sevk ve 90 günlük yasal yurt dışı bekleme takvimi oluşturuldu.'
    };
  }

  // 3. PRE-OP HAZIRLIK, ANESTEZİ ONAMI & AMELİYAT PROTOKOLÜ
  if (
    text.includes('pre-op') ||
    text.includes('preop') ||
    text.includes('ameliyat öncesi') ||
    text.includes('ameliyata alacağız') ||
    text.includes('kısırlaştırma hazırlık') ||
    text.includes('anestezi hazırlık') ||
    text.includes('cerrahi onam') ||
    text.includes('operasyon hazırlık') ||
    text.includes('aç bırak')
  ) {
    return {
      id: `vet_preop_${Date.now()}`,
      baslik: 'Pre-Op Cerrahi Hazırlık & Anestezi Onamı',
      kategori: 'Cerrahi & Anestezi',
      mevzuat_notu: 'Cerrahi operasyonlar öncesi 5996 sayılı Kanun gereği hasta sahibinden Aydınlatılmış Cerrahi Onam Formu alınmalı; aspirasyon pnömonisi riskine karşı 8-12 saatlik mama, 2-4 saatlik su açlığı sağlanmalıdır.',
      action_items: [
        { task: 'Hasta sahibine 8-12 saatlik mama açlığı ve operasyondan 2 saat öncesine kadar su kısıtlamasını teyit ettir', is_completed: false },
        { task: 'Pre-anestetik tam kan sayımı (Hemogram) ve böbrek/karaciğer biyokimyası (ALT, AST, BUN, Cre) çalış', is_completed: false },
        { task: 'Hasta sahibine riskleri açıklayarak Aydınlatılmış Cerrahi ve Anestezi Onam Formunu ıslak imzalat', is_completed: false },
        { task: 'İntravenöz (IV) damar yolu kanülü yerleştir, izotonik sıvı infüzyonu bağla ve sedasyon/premedikasyonu uygula', is_completed: false }
      ],
      zaman_etiketi: 'Operasyon Sabahı (09:00)',
      tarih_iso: null,
      hazirlik_zamani: 'Operasyondan 12 Saat Önce Açlık Başlangıcı',
      ikon: '🩺',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Pre-op açlık protokolü, biyokimya paneli ve cerrahi onam adımları sisteme işlendi.'
    };
  }

  // 4. POST-OP BAKIM, KISIRLAŞTIRMA & DİKİŞ ALMA TAKVİMİ
  if (
    text.includes('post-op') ||
    text.includes('postop') ||
    text.includes('kısırlaştırma yapıldı') ||
    text.includes('kısırlaştırdık') ||
    text.includes('ameliyat bitti') ||
    text.includes('dikiş alma') ||
    text.includes('dikişlerini al') ||
    text.includes('ovariohisterektomi') ||
    text.includes('kastrasyon') ||
    text.includes('elizabeth yakalığı') ||
    text.includes('yara kontrolü')
  ) {
    const sutureDate = new Date(now);
    sutureDate.setDate(sutureDate.getDate() + 8); // 8 gün sonra dikiş alma
    sutureDate.setHours(11, 0, 0, 0);

    return {
      id: `vet_postop_${Date.now()}`,
      baslik: 'Post-Op Bakım & 8. Gün Dikiş Alma',
      kategori: 'Cerrahi & Anestezi',
      mevzuat_notu: 'Post-operatif dönemde ilk 48 saat multimodal ağrı yönetimi (NSAID/Opioid) ve profilaktik antibiyoterapi sürdürülmeli; cerrahi dikişler 7-10. günler arasında yara dudağı koaptasyonu incelenerek alınmalıdır.',
      action_items: [
        { task: 'İlk 24-48 saat için NSAID analjezik ve profilaktik antibiyotik doz takvimini hasta kartına işle', is_completed: false },
        { task: 'Operasyon bölgesinin yalanmasını ve açılmasını önlemek için Elizabeth yakalığı veya medikal tulum giydir', is_completed: false },
        { task: 'Dikiş hattını günde 2 kez antiseptik solüsyonla (klorheksidin) temizle; ödem, akıntı ve seroma kontrolü yap', is_completed: false },
        { task: '8. günde yara dudaklarının kaynamasını değerlendirerek cerrahi dikişleri/staplerleri aseptik olarak al', is_completed: false }
      ],
      zaman_etiketi: '8 Gün Sonra Dikiş Alma (11:00)',
      tarih_iso: sutureDate.toISOString(),
      hazirlik_zamani: 'İlk 48 Saat Ağrı ve Pansuman Takibi',
      ikon: '🧵',
      renk: '#CCFBF1',
      sesli_geribildirim: 'Post-op antibiyoterapi, Elizabeth yakalığı ve 8. gün dikiş alma randevusu planlandı.'
    };
  }

  // 5. YAVRU KEDİ / KÖPEK AŞILAMA TAKVİMİ & RAPEL DOZLAR
  if (
    text.includes('karma aşı') ||
    text.includes('karma 1') ||
    text.includes('karma 2') ||
    text.includes('lösemi aşısı') ||
    text.includes('felv') ||
    text.includes('fiv') ||
    text.includes('kuduz aşısı') ||
    text.includes('bordetella') ||
    text.includes('bronchine') ||
    text.includes('aşı takvimi') ||
    text.includes('yavru kedi aşı') ||
    text.includes('yavru köpek aşı') ||
    text.includes('rapel aşı') ||
    text.includes('dhppi') ||
    text.includes('fvrcp')
  ) {
    const boosterDate = new Date(now);
    boosterDate.setDate(boosterDate.getDate() + 21); // 21 gün sonra rapel
    boosterDate.setHours(10, 30, 0, 0);

    return {
      id: `vet_vaccine_${Date.now()}`,
      baslik: 'Aşı Protokolü & 21 Gün Sonra Rapel',
      kategori: 'Klinik & Aşı Takvimi',
      mevzuat_notu: 'Maternal antikor etkileşimini kırmak için yavru kedi/köpek aşılarında 21 gün aralıklı booster (rapel) kuralı uygulanmalı; aşılar +2°C ile +8°C soğuk zincirde saklanıp aşı günlüğüne etiketlenmelidir.',
      action_items: [
        { task: 'Aşı öncesi genel klinik muayene yap (Rektal ateş < 39.2°C, lenf nodları, mukoza rengi ve dışkı kontrolü)', is_completed: false },
        { task: 'Soğuk zincirde (+2°C ile +8°C) korunan aşıyı oda sıcaklığına getirip subkutan (SC) yolla aseptik olarak enjekte et', is_completed: false },
        { task: 'Aşının lot, seri numarası ve son kullanma tarihi barkodunu PETVET sistemine ve aşı karnesine işle', is_completed: false },
        { task: '21 gün sonrasına 2. doz rapel randevusu planla ve sahibine aşı sonrası 48 saat banyo yaptırmamasını bildir', is_completed: false }
      ],
      zaman_etiketi: '21 Gün Sonra Rapel Doz (10:30)',
      tarih_iso: boosterDate.toISOString(),
      hazirlik_zamani: 'Aşı Sonrası 48 Saat Banyo Yasağı & Halsizlik Takibi',
      ikon: '💉',
      renk: '#DCFCE7',
      sesli_geribildirim: 'Aşılama kaydı, PETVET barkod onayı ve 21 gün sonraki rapel takvimi oluşturuldu.'
    };
  }

  // 6. İÇ & DIŞ PARAZİT PROFİLAKSİSİ
  if (
    text.includes('iç parazit') ||
    text.includes('dış parazit') ||
    text.includes('pire damlası') ||
    text.includes('kene damlası') ||
    text.includes('parazit iğnesi') ||
    text.includes('parazit hapı') ||
    text.includes('tenya') ||
    text.includes('praziquantel') ||
    text.includes('selamektin') ||
    text.includes('flea') ||
    text.includes('kene') ||
    text.includes('pire')
  ) {
    const nextParasiteDate = new Date(now);
    nextParasiteDate.setDate(nextParasiteDate.getDate() + 60); // 2 ay sonra tekrarlama
    nextParasiteDate.setHours(11, 0, 0, 0);

    return {
      id: `vet_parasite_${Date.now()}`,
      baslik: 'İç & Dış Paraziter Profilaksi',
      kategori: 'Dermatoloji & Parazitoloji',
      mevzuat_notu: 'Zoonotik paraziter hastalıkların (Echinococcus granulosus, Toxocara vb.) önlenmesi ve halk sağlığının korunması için 2-3 ayda bir periyodik iç-dış parazit uygulaması ve PETVET kaydı şarttır.',
      action_items: [
        { task: 'Hayvanı hassas dijital terazide tart ve canlı ağırlığına göre (mg/kg) kesin ilaç dozunu hesapla', is_completed: false },
        { task: 'Dış parazit spot-on damlayı ense köküne deriye temas edecek şekilde dök; 48 saat suyla temas ettirme', is_completed: false },
        { task: 'Geniş spektrumlu iç parazit tabletini veya enjeksiyonunu uygula, aşı karnesine kaşe bas', is_completed: false },
        { task: '2 ay sonraki periyodik profilaksi için otomatik hasta hatırlatma bildirimini kur', is_completed: false }
      ],
      zaman_etiketi: '2 Ay Sonraki Tekrar (Periyodik)',
      tarih_iso: nextParasiteDate.toISOString(),
      hazirlik_zamani: 'Damla Sonrası 48 Saat Yıkama Yasağı',
      ikon: '🐾',
      renk: '#CCFBF1',
      sesli_geribildirim: 'İç-dış parazit uygulaması tamamlandı ve 2 aylık periyodik rapel kuruldu.'
    };
  }

  // 7. ACİL TRİYAJ, ZEHİRLENME & YÜKSEKTEN DÜŞME / TRAVMA
  if (
    text.includes('zehirlenme') ||
    text.includes('yüksekten düştü') ||
    text.includes('araba çarptı') ||
    text.includes('travma veteriner') ||
    text.includes('fare zehri') ||
    text.includes('çikolata zehirlenmesi') ||
    text.includes('zambak') ||
    text.includes('permetrin') ||
    text.includes('torasentez') ||
    text.includes('iç kanama') ||
    text.includes('acil hasta')
  ) {
    return {
      id: `vet_emergency_${Date.now()}`,
      baslik: 'Acil Triyaj, Toksikoloji & Travma Protokolü',
      kategori: 'Acil & Toksikoloji',
      mevzuat_notu: 'Acil triyajda ilk 60 dakika (Altın Saat) hayati önemdedir; ABC (Havayolu, Solunum, Dolaşım) stabilize edilmeden, pnömotoraks veya iç kanama ekarte edilmeden hasta cerrahiye alınmamalıdır.',
      action_items: [
        { task: 'Acil ABC kontrolü yap: Havayolu açıklığı sağla, O2 saturasyonunu ölç ve gerekirse oksijen kafesine al', is_completed: false },
        { task: 'Geniş lümenli IV kateter aç, şok dozunda kristaloid sıvı infüzyonu başlat ve vücut sıcaklığını regüle et', is_completed: false },
        { task: 'FAST USG ve acil radyografi ile göğüs/karın boşluğu sıvısı (hemotoraks/hemoperiton) ve organ rüptürünü tara', is_completed: false },
        { task: 'Zehirlenme şüphesinde: 2 saati geçmemişse kustur, geçmişse aktif kömür ve spesifik antidot (K1 Vitamini/Atropin) ver', is_completed: false }
      ],
      zaman_etiketi: 'Acil Müdahale (STAT)',
      tarih_iso: null,
      hazirlik_zamani: 'İlk 60 Dakika Yaşamsal Stabilizasyon',
      ikon: '🚨',
      renk: '#FEE2E2',
      sesli_geribildirim: 'Acil triyaj, oksijen desteği, şok infüzyonu ve toksikoloji protokolü devreye alındı.'
    };
  }

  // 8. DENTAL TARTAR TEMİZLİĞİ, POLİSHİNG & DİŞ ÇEKİMİ
  if (
    text.includes('diş taşı') ||
    text.includes('tartar') ||
    text.includes('kavitron') ||
    text.includes('diş çekimi') ||
    text.includes('gingivitis') ||
    text.includes('periodontitis') ||
    text.includes('stomatitis') ||
    text.includes('diş temizliği')
  ) {
    return {
      id: `vet_dental_${Date.now()}`,
      baslik: 'Ultrasonik Tartar Temizliği & Polisaj',
      kategori: 'Diş & Ağız Sağlığı',
      mevzuat_notu: 'Veteriner dental operasyonlar aspirasyon pnömonisi riskine karşı mutlaka manşonlu (kavlı) endotrakeal tüp ile entübe edilerek gaz anestezisi altında yapılmalıdır.',
      action_items: [
        { task: 'Manşonlu endotrakeal tüp ile hava yolunu aspire edilen sıvılara karşı tam korumaya al', is_completed: false },
        { task: 'Ultrasonik kavitron ucuyla diş minesi ve diş eti cebi (subgingival) kalkuluslarını temizle', is_completed: false },
        { task: 'Mine pürüzlerini gidermek ve plak birikimini geciktirmek için florlu pasta ve döner fırçayla polisaj yap', is_completed: false },
        { task: 'Operasyon sonrası 5 gün boyunca yumuşak yaş mama diyeti ve ağız içi klorheksidin solüsyonu reçete et', is_completed: false }
      ],
      zaman_etiketi: 'Dental Randevu (Entübasyonlu)',
      tarih_iso: null,
      hazirlik_zamani: 'Operasyon Öncesi 8 Saatlik Açlık',
      ikon: '🦷',
      renk: '#EDE9FE',
      sesli_geribildirim: 'Entübasyonlu kavitron tartar temizliği, polisaj ve ağız hijyeni adımları hazırlandı.'
    };
  }

  // 9. DERMATOLOJİ, WOOD LAMBASI, MANTAR & DERİ KAZINTISI
  if (
    text.includes('wood lambası') ||
    text.includes('wood lambasi') ||
    text.includes('deri kazıntısı') ||
    text.includes('deri kazintisi') ||
    text.includes('mantar aşısı') ||
    text.includes('microsporum') ||
    text.includes('tüy dökülmesi') ||
    text.includes('kaşıntı') ||
    text.includes('uyuz') ||
    text.includes('otodectes') ||
    text.includes('kulak uyuzu') ||
    text.includes('malassezia')
  ) {
    return {
      id: `vet_derm_${Date.now()}`,
      baslik: 'Dermatolojik Kazıntı, Sitoloji & Mantar Taraması',
      kategori: 'Dermatoloji & Parazitoloji',
      mevzuat_notu: 'Microsporum canis gibi zoonotik mantar enfeksiyonlarında hasta sahibi enfeksiyon riskine karşı bilgilendirilmeli, hasta çevre dezenfeksiyonu sağlanmalıdır.',
      action_items: [
        { task: 'Karanlık odada 5 dakika ısıtılmış Wood lambası ile lezyonlu bölgede elma yeşili floresans kontrolü yap', is_completed: false },
        { task: 'Lezyon sınırından lam üzerine mineral yağ ile derin ve yüzeysel deri kazıntısı alarak mikroskopta uyuza bak', is_completed: false },
        { task: 'Kulak ve deri eksudatından Diff-Quik boyama ile sitolojik yayma hazırla (Malassezia / Bakteri taraması)', is_completed: false },
        { task: 'Dermatofit besiyerine (DTM) ekim yap, 14 gün boyunca 25°C oda ısısında renk değişimini izle', is_completed: false }
      ],
      zaman_etiketi: 'Dermatoloji Muayenesi (14 Günlük Kültür)',
      tarih_iso: null,
      hazirlik_zamani: 'Muayeneden Önce Lezyonu Yıkamama',
      ikon: '🔬',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Wood lambası muayenesi, deri kazıntısı ve 14 günlük DTM mantar kültür takvimi açıldı.'
    };
  }

  // 10. TÜRKVET BÜYÜKBAŞ & KÜÇÜKBAŞ KÜPELEME / DÜŞÜM
  if (
    text.includes('türkvet') ||
    text.includes('turkvet') ||
    text.includes('buzağı küpe') ||
    text.includes('buzagi kupe') ||
    text.includes('kuzu küpe') ||
    text.includes('küpeleme') ||
    text.includes('kulak küpesi') ||
    text.includes('işletme tescil') ||
    text.includes('küpe düşüm')
  ) {
    return {
      id: `vet_turkvet_${Date.now()}`,
      baslik: 'TÜRKVET Küpe Kaydı & İşletme Tescili',
      kategori: 'Büyükbaş & TÜRKVET',
      mevzuat_notu: '5996 sayılı Kanun uyarınca sığır cinsi hayvanlar doğumdan itibaren en geç 30 gün, koyun-keçiler en geç 90 gün içinde küpelenip TÜRKVET veri tabanına tescil edilmelidir.',
      action_items: [
        { task: 'Yeni doğan buzağının/kuzunun kulağına dezenfektan sıkarak resmi kulak küpesini pensi ile aseptik olarak tak', is_completed: false },
        { task: 'Doğum tarihi, ana kulak numarası, ırk ve cinsiyet bilgilerini Doğum Bildirim Belgesine kaydet', is_completed: false },
        { task: 'İlçe Tarım ve Orman Müdürlüğü TÜRKVET portalına küpe seri numarasını tescil et', is_completed: false },
        { task: 'İşletmeden kesime veya satışa giden hayvanların TÜRKVET düşüm ve nakil onaylarını tamamla', is_completed: false }
      ],
      zaman_etiketi: 'Saha Küpeleme Ziyareti (09:30)',
      tarih_iso: null,
      hazirlik_zamani: 'Doğumdan İtibaren 30 Gün İçinde',
      ikon: '🐄',
      renk: '#DCFCE7',
      sesli_geribildirim: 'TÜRKVET kulak küpesi takımı, doğum bildirimi ve işletme kayıt süreci takvimlendi.'
    };
  }

  // 11. BÜYÜKBAŞ SÜRÜ SAĞLIĞI & ŞAP / BRUSELLA / ÇELERME AŞILAMASI
  if (
    text.includes('şap aşısı') ||
    text.includes('sap asisi') ||
    text.includes('brusella aşısı') ||
    text.includes('brusella') ||
    text.includes('rev1') ||
    text.includes('s19') ||
    text.includes('çelerme') ||
    text.includes('enterotoksemi') ||
    text.includes('çiçek aşısı sığır') ||
    text.includes('lsd aşısı') ||
    text.includes('büyükbaş aşılama') ||
    text.includes('sürü aşısı')
  ) {
    return {
      id: `vet_herd_vac_${Date.now()}`,
      baslik: 'Sürü Koruyucu Aşılama (Şap / Brusella / Clostridial)',
      kategori: 'Büyükbaş & TÜRKVET',
      mevzuat_notu: 'Şap ve Brusella aşılamaları Tarım ve Orman Bakanlığı programlı salgın mücadele kapsamında zorunludur; soğuk zincir (+2°C ile +8°C) bozulmadan uygulanmalı ve TÜRKVET kütüğüne işlenmelidir.',
      action_items: [
        { task: 'Aşıları sahaya soğuk zincir termoslarında buz aküleri eşliğinde (+2°C / +8°C) ulaştır', is_completed: false },
        { task: 'Otomatik enjektör tabancasını kalibre et ve hayvan başına steril iğne ucu rotasyonu sağla', is_completed: false },
        { task: 'Aşılanan her hayvanın kulak numarasını TÜRKVET aşı takip modülüne kaydet', is_completed: false },
        { task: 'Aşı sonrası 24 saat boyunca gelişebilecek anafilaktik reaksiyonlara karşı sahada Atropin/Adrenalin hazır bulundur', is_completed: false }
      ],
      zaman_etiketi: 'Sürü Aşılama Seferi (08:30)',
      tarih_iso: null,
      hazirlik_zamani: 'Aşı Termos ve Soğuk Zincir Kontrolü',
      ikon: '💉',
      renk: '#DCFCE7',
      sesli_geribildirim: 'Sürü aşı protokolü, TÜRKVET aşı kaydı ve soğuk zincir güvenlik adımları oluşturuldu.'
    };
  }

  // 12. BÜYÜKBAŞ DOĞUM, GÜÇ DOĞUM (DİSTOSİ) & KOLOSTRUM PROTOKOLÜ
  if (
    text.includes('buzağı doğumu') ||
    text.includes('buzagi dogumu') ||
    text.includes('güç doğum') ||
    text.includes('guc dogum') ||
    text.includes('distosi') ||
    text.includes('kolostrum') ||
    text.includes('ağız sütü') ||
    text.includes('buzağı göbek') ||
    text.includes('sezaryen sığır') ||
    text.includes('doğum felci') ||
    text.includes('hipokalsemi') ||
    text.includes('retensiyo')
  ) {
    return {
      id: `vet_calving_${Date.now()}`,
      baslik: 'Doğum & İlk 4 Saat Kolostrum / Göbek Protokolü',
      kategori: 'Reprodüksiyon & Doğum',
      mevzuat_notu: 'Buzağı yaşama gücü ve pasif transfer (IgG) için doğumdan sonraki ilk 2-4 saat içinde refraktometrede Brix > %22 olan en az 4 litre kaliteli kolostrum içirilmeli ve göbek kordonu tentürdiyotla dezenfekte edilmelidir.',
      action_items: [
        { task: 'Doğum kanalını ve fötal pozisyonu kontrol et; gerekiyorsa steril doğum ipleriyle traksiyon/düzeltme uygula', is_completed: false },
        { task: 'Buzağının ağız/burun mukusunu aspire et ve göbek kordonuna %7 tentürdiyot daldırma solüsyonu uygula', is_completed: false },
        { task: 'Optik refraktometreyle ölçülmüş kaliteli ağız sütünü (Brix > %22) ilk 2-4 saatte buzağıya biberon/sonda ile içir', is_completed: false },
        { task: 'Anada retensiyo sekundinarum (sonun atılamaması) ve hipokalsemi (süt humması) kontrolü yap', is_completed: false }
      ],
      zaman_etiketi: 'Doğum Anı & İlk 4 Saat',
      tarih_iso: null,
      hazirlik_zamani: 'Doğumdan Hemen Sonra Göbek & Kolostrum',
      ikon: '🍼',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Doğum müdahalesi, ilk 4 saat kolostrum içirme ve göbek dezenfeksiyon protokolü hazırlandı.'
    };
  }

  // 13. SUNİ TOHUMLAMA, PAYET ÇÖZME & GEBELİK MUAYENESİ
  if (
    text.includes('suni tohumlama') ||
    text.includes('tohumlama') ||
    text.includes('boğa sperması') ||
    text.includes('azot tankı') ||
    text.includes('payet çözme') ||
    text.includes('östrus') ||
    text.includes('ostrus') ||
    text.includes('gebelik muayenesi sığır') ||
    text.includes('rektal palpasyon') ||
    text.includes('pgf2a')
  ) {
    const usgCheckDate = new Date(now);
    usgCheckDate.setDate(usgCheckDate.getDate() + 30); // 30 gün sonra USG gebelik kontrolü

    return {
      id: `vet_insemination_${Date.now()}`,
      baslik: 'Suni Tohumlama & 30. Gün USG Gebelik Kontrolü',
      kategori: 'Reprodüksiyon & Doğum',
      mevzuat_notu: 'Suni tohumlamada payet sıvı azot tankından (-196°C) çıkarılıp 37°C su banyosunda tam 35-40 saniye çözülmeli; tohumlama koçanı TÜRKVET döl verimi modülüne tescil edilmelidir.',
      action_items: [
        { task: 'Sıvı azot tankından payeti çıkarıp 37°C su banyosunda 35-40 saniye çözdür ve pistoleti kur', is_completed: false },
        { task: 'Rektal muayene ile serviksi sabitle, kateteri nazikçe servikal halkalardan geçirerek korpus uteriye tohumu bırak', is_completed: false },
        { task: 'Resmi Suni Tohumlama Belgesini doldur (Boğa ırkı, kulak no, payet seri no) ve TÜRKVET sistemine işle', is_completed: false },
        { task: 'Tohumlamadan 30-35 gün sonrasına ultrasonografik gebelik muayenesi randevusunu takvime ekle', is_completed: false }
      ],
      zaman_etiketi: '30 Gün Sonra USG Gebelik Kontrolü',
      tarih_iso: usgCheckDate.toISOString(),
      hazirlik_zamani: 'Payet Çözme: 37°C Su Banyosu 35-40 Saniye',
      ikon: '🧬',
      renk: '#E0F2FE',
      sesli_geribildirim: 'Suni tohumlama kaydı yapıldı ve 30. gün USG gebelik kontrolü takvime eklendi.'
    };
  }

  // 14. BÜYÜKBAŞ MASTITIS YÖNETİMİ, CMT & SÜT ARINMA SÜRESİ
  if (
    text.includes('mastitis') ||
    text.includes('cmt testi') ||
    text.includes('cmt') ||
    text.includes('meme iltihabı') ||
    text.includes('somatik hücre') ||
    text.includes('antibiyotikli süt') ||
    text.includes('süt arınma süresi') ||
    text.includes('süt arınma') ||
    text.includes('sağım hijyeni') ||
    text.includes('post dipping')
  ) {
    return {
      id: `vet_mastitis_${Date.now()}`,
      baslik: 'CMT Testi, Mastitis & Süt Arınma Karantinası',
      kategori: 'Sürü Sağlığı & Mastitis',
      mevzuat_notu: 'Türk Gıda Kodeksi uyarınca antibiyotikli sütlerin tanka girmesi kesinlikle yasaktır. İlaç prospektüsündeki süt arınma süresi (örn: 72-96 saat) dolana kadar süt imha edilmelidir.',
      action_items: [
        { task: '4 meme lobundan ön sütleri atıp CMT reaktifi ile palet üzerinde jelleşme ve renk değişimini skorla', is_completed: false },
        { task: 'Klinik mastitisli lobdan steril tüpe süt numunesi alarak antibiyogram kültürüne gönder', is_completed: false },
        { task: 'İntramammar ve parenteral antibiyotik uygulanan ineğe renkli bacak bandı takarak sağım sırasının sonuna al', is_completed: false },
        { task: 'Süt arınma süresi dolana kadar (72-96 saat) sağılan sütü tanka karıştırmadan imha et', is_completed: false }
      ],
      zaman_etiketi: 'Sağım Saati (72 Saat Süt İmhası)',
      tarih_iso: null,
      hazirlik_zamani: 'Tedavi Süresince Sağım Sırası En Son',
      ikon: '🥛',
      renk: '#FEE2E2',
      sesli_geribildirim: 'CMT testi yapıldı, mastitis tedavisi başlatıldı ve süt arınma karantinası açıldı.'
    };
  }

  // 15. BÜYÜKBAŞ & KÜÇÜKBAŞ TIRNAK BAKIMI & LAMİNİTİS (TOPALLIK)
  if (
    text.includes('tırnak kesimi') ||
    text.includes('tirnak kesimi') ||
    text.includes('tırnak bakımı') ||
    text.includes('laminitis') ||
    text.includes('topallık') ||
    text.includes('ökçe çürüğü') ||
    text.includes('dijital dermatit') ||
    text.includes('tırnak travayı') ||
    text.includes('tırnak takozu')
  ) {
    return {
      id: `vet_hoof_${Date.now()}`,
      baslik: 'Fonksiyonel Tırnak Bakımı & Laminitis Tedavisi',
      kategori: 'Sürü Sağlığı & Mastitis',
      mevzuat_notu: 'Topallık süt verimini %25 düşürür; hayvan refahı ve sürü verimliliği için yılda en az 2 kez travayda fonksiyonel tırnak bakımı yapılmalı ve grup ayak banyoları uygulanmalıdır.',
      action_items: [
        { task: 'Hayvanı hidrolik/mekanik tırnak bakım travayına alarak bacak emniyetini sağla', is_completed: false },
        { task: 'Ranyer ve tırnak pensesiyle fazla boynuz dokuyu kes, taban açısını 45 dereceye ve eşit yüksekliğe getir', is_completed: false },
        { task: 'Taban ülseri veya beyaz çizgi lezyonunda sağlam tırnağa poliüretan/ahşap takoz yapıştırarak yükü hafiflet', is_completed: false },
        { task: 'Lezyonlu bölgeye oksitetrasiklin sprey ve bandaj uygula, sağım çıkışına %5 bakır sülfat ayak banyosu kur', is_completed: false }
      ],
      zaman_etiketi: 'Tırnak Bakım Seansı (Travay)',
      tarih_iso: null,
      hazirlik_zamani: 'Bandaj Sonrası 3 Günlük Kontrol',
      ikon: '🪵',
      renk: '#FED7AA',
      sesli_geribildirim: 'Fonksiyonel tırnak kesimi, takoz uygulaması ve ayak banyosu adımları hazırlandı.'
    };
  }

  // 16. HAYVAN NAKLİ & VETERİNER SAĞLIK RAPORU (VSR)
  if (
    text.includes('hayvan sevki') ||
    text.includes('hayvan nakli') ||
    text.includes('veteriner sağlık raporu') ||
    text.includes('vsr') ||
    text.includes('ilçe tarım sevk') ||
    text.includes('nakil beyannamesi') ||
    text.includes('kurbanlık sevk') ||
    text.includes('büyükbaş nakil')
  ) {
    return {
      id: `vet_transport_${Date.now()}`,
      baslik: 'Canlı Hayvan Sevki & Yurtiçi VSR Raporu',
      kategori: 'Büyükbaş & TÜRKVET',
      mevzuat_notu: 'Hayvanların Nakilleri Sırasında Refahı Yönetmeliği uyarınca, il dışı sevklerde TÜRKVET aşı/küpe uyumu, İlçe Tarım Veteriner Sağlık Raporu (VSR) ve araç dezenfeksiyon belgesi zorunludur.',
      action_items: [
        { task: 'Sevk edilecek tüm hayvanların kulak küpelerinin TÜRKVET sisteminde aktif olduğunu doğrula', is_completed: false },
        { task: 'Şap ve Brusella aşılarının yasal geçerlilik sürelerini ve işletmede karantina bulunmadığını denetle', is_completed: false },
        { task: 'Nakil kamyonunun araç dezenfeksiyon belgesini ve onaylı nakil yeterlilik sertifikasını kontrol et', is_completed: false },
        { task: 'İlçe Tarım Müdürlüğünden Yurtiçi Veteriner Sağlık Raporu (VSR) düzenleterek nakil sürücüsüne teslim et', is_completed: false }
      ],
      zaman_etiketi: 'Sevk Günü (Yola Çıkış Öncesi)',
      tarih_iso: null,
      hazirlik_zamani: 'Sevkten 24 Saat Önce İlçe Tarım Kontrolü',
      ikon: '🚛',
      renk: '#FED7AA',
      sesli_geribildirim: 'TÜRKVET küpe denetimi, dezenfeksiyon belgesi ve VSR sağlık raporu süreci planlandı.'
    };
  }

  // 17. AT HEKİMLİĞİ & KOLİK ACİLİ
  if (
    text.includes('at kolik') ||
    text.includes('kolik sancısı') ||
    text.includes('at veteriner') ||
    text.includes('nazogastrik') ||
    text.includes('at pasaportu') ||
    text.includes('equine influenza') ||
    text.includes('tetanoz at') ||
    text.includes('nallama at') ||
    text.includes('tendon usg')
  ) {
    return {
      id: `vet_equine_${Date.now()}`,
      baslik: 'At Hekimliği: Kolik Acil & Dekompresyon Protokolü',
      kategori: 'At Hekimliği & Kolik',
      mevzuat_notu: 'Equine kolik vakalarında ilk 2 saat içinde borborigmi oskültasyonu, nazogastrik sonda ile mide dekompresyonu ve rektal palpasyon yapılarak cerrahi/medikal ayrımı yapılmalıdır.',
      action_items: [
        { task: 'Vital parametreleri değerlendir (Nabız > 60/dk, CRT, toksik halka kontrolü) ve 4 kadranda bağırsak seslerini dinle', is_completed: false },
        { task: 'Nazogastrik sonda uygulayarak mide gaz/sıvı dekompresyonu yap ve mide yırtılması riskini önle', is_completed: false },
        { task: 'Rektal muayene ile çekum/kolon impaksiyonu veya yer değiştirmesini (torsiyon) ekarte et', is_completed: false },
        { task: 'Flunixin meglumin ile analjezi sağla, IV izotonik sıvı infüzyonu başlat ve pasaporta tedavi kaydını gir', is_completed: false }
      ],
      zaman_etiketi: 'Acil Müdahale (Kolik Takibi)',
      tarih_iso: null,
      hazirlik_zamani: 'İlk 2 Saatte Nazogastrik Sonda ve Vital İzlem',
      ikon: '🐎',
      renk: '#E0E7FF',
      sesli_geribildirim: 'At kolik acil değerlendirmesi, nazogastrik sonda ve analjezi adımları hazırlandı.'
    };
  }

  // 18. VETBİS, İLAÇ TAKİP SİSTEMİ (İTS) & TIBBİ ATIK YÖNETİMİ
  if (
    text.includes('vetbis') ||
    text.includes('its veteriner') ||
    text.includes('ketamin') ||
    text.includes('tıbbi atık veteriner') ||
    (userDomain === 'VETERINER' && (text.includes('kırmızı reçete') || text.includes('yeşil reçete') || text.includes('ilaç takip sistemi'))) ||
    (text.includes('veteriner') && (text.includes('kırmızı reçete') || text.includes('yeşil reçete') || text.includes('ilaç takip sistemi')))
  ) {
    return {
      id: `vet_vetbis_${Date.now()}`,
      baslik: 'VETBİS İTS Bildirimi & Renkli Reçete Kaydı',
      kategori: 'VETBİS & İlaç / Biyogüvenlik',
      mevzuat_notu: 'Veteriner Tıbbi Ürünler Hakkında Yönetmelik uyarınca tüm veteriner ilaçlarının İTS/VETBİS üzerinden karekod bildirimi zorunludur; kontrole tabi anestezikler (Ketamin vb.) kilitli dolapta saklanmalıdır.',
      action_items: [
        { task: 'Kliniğe giren ve uygulanan tüm veteriner tıbbi ürün karekodlarını Bakanlık İTS/VETBİS sistemine bildir', is_completed: false },
        { task: 'Kontrole tabi psikotrop/anestezik ilaçları (Ketamin, Butorfanol) çift kilitli dolaba koy ve sarfiyat kütüğüne işle', is_completed: false },
        { task: 'Delici/kesici iğne uçlarını sarı tıbbi atık kutusuna, kontamine pamuk ve eldivenleri kırmızı poşete at', is_completed: false },
        { task: 'Otoklav sterilizasyon döngüsünü (121°C/134°C) kimyasal indikatör şeritleri ile test et ve steriliteyi onayla', is_completed: false }
      ],
      zaman_etiketi: 'Günlük Klinik Kapanış & İTS Bildirimi',
      tarih_iso: null,
      hazirlik_zamani: 'Günlük VETBİS Karekod Mutabakatı',
      ikon: '📋',
      renk: '#DCFCE7',
      sesli_geribildirim: 'VETBİS karekod bildirimleri, kilitli ilaç dolap kaydı ve tıbbi atık tasnifi planlandı.'
    };
  }

  // EĞER KULLANICI VETERİNER ALANINDA İSE VEYA METİNDE GENEL VETERİNER/EVCİL HAYVAN İFADESİ GEÇİYORSA GENEL KLİNİK PROTOKOLÜ
  if (
    userDomain === 'VETERINER' ||
    text.includes('veteriner') ||
    text.includes('kedi') ||
    text.includes('köpek') ||
    text.includes('hayvan sağlığı') ||
    text.includes('pet klinik')
  ) {
    return {
      id: `vet_general_${Date.now()}`,
      baslik: 'Veteriner Klinik Muayene & Sağlık Protokolü',
      kategori: 'Klinik & Aşı Takvimi',
      mevzuat_notu: 'Klinik muayene ve tedavilerde hayvan refahı, PETVET karne kayıtları ve aydınlatılmış hasta sahibi bilgilendirmesi esastır.',
      action_items: [
        { task: 'Genel klinik muayene yap (Kilo tartımı, rektal ateş, kalp/akciğer oskültasyonu ve mukoza kontrolü)', is_completed: false },
        { task: 'Gerekli aşı, paraziter profilaksi veya medikal tedaviyi PETVET ve hasta takip yazılımına işle', is_completed: false },
        { task: 'Hasta sahibine evde bakım, beslenme ve ilaç kullanım talimatlarını açıkla', is_completed: false },
        { task: 'Sonraki periyodik kontrol veya rapel randevusunu takvime ekle', is_completed: false }
      ],
      zaman_etiketi: 'Veteriner Klinik Randevusu',
      tarih_iso: null,
      hazirlik_zamani: 'Randevu Öncesi Aşı Karnesi ve Taşıma Çantası Hazırlığı',
      ikon: '🐾',
      renk: '#CCFBF1',
      sesli_geribildirim: 'Veteriner klinik muayene, hasta kartı ve takip randevusu hazırlandı.'
    };
  }

  return null;
}
