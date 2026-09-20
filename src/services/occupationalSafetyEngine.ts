// src/services/occupationalSafetyEngine.ts

import { matchShortScenario } from '../utils/scenarioDatabase.ts';

export interface OccupationalSafetyTask {
  id: string;
  baslik: string;
  kategori:
    | 'İBYS & Çalışan Eğitimi'
    | 'Periyodik Muayene & Sağlık'
    | 'Ramak Kala & DÖF'
    | 'Risk Değerlendirmesi'
    | 'İSG Kurulu & Defter'
    | 'Acil Durum & Tatbikat'
    | 'İş Kazası Bildirimi'
    | 'KKD & Ekipman Uygunluğu'
    | 'Sıcak İş & İzinli Çalışma';
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

export function parseOccupationalSafetyIntent(
  rawText: string,
  now: Date = new Date(),
  userDomain?: string
): OccupationalSafetyTask | null {
  if (!rawText || typeof rawText !== 'string') return null;
  const text = rawText.replace(/İ/g, 'i').replace(/I/g, 'ı').toLocaleLowerCase('tr-TR').normalize('NFC').trim();

  // 0. HIZLI SENARYO VERİTABANI KONTROLÜ (matchShortScenario - ISG / TEKNIK)
  const shortMatch = matchShortScenario(rawText, 'ISG') || matchShortScenario(rawText, 'TEKNIK');
  if (shortMatch && (shortMatch.domain === 'ISG' || shortMatch.baslik.toLowerCase().includes('isg') || shortMatch.baslik.toLowerCase().includes('iş güvenliği') || shortMatch.baslik.toLowerCase().includes('ramak kala'))) {
    return {
      id: `isg_scenario_${Date.now()}`,
      baslik: shortMatch.baslik,
      kategori: 'İSG Kurulu & Defter',
      mevzuat_notu: shortMatch.akilliFisilti || '6331 sayılı İş Sağlığı ve Güvenliği Kanununa uygun saha denetimi ve kayıt zorunludur.',
      action_items: (shortMatch.oncedenYapilacaklar || []).map((t) => ({ task: t, is_completed: false })),
      zaman_etiketi: shortMatch.varsayilanZaman || 'İSG Denetim Periyodu',
      tarih_iso: null,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      ikon: shortMatch.ikon || '🦺',
      renk: shortMatch.renk || '#FEF3C7',
      sesli_geribildirim: shortMatch.akilliFisilti || `${shortMatch.baslik} planlandı.`
    };
  }

  // 1. İBYS ÇALIŞAN EĞİTİMİ BİLDİRİMİ & TEHLİKE SINIFINA GÖRE YASAL SÜRELER
  if (
    text.includes('ibys') ||
    text.includes('isg eğitimi') ||
    text.includes('isg egitimi') ||
    text.includes('iş güvenliği eğitimi') ||
    text.includes('is guvenligi egitimi') ||
    text.includes('çalışan eğitimi bildirimi') ||
    text.includes('temel isg eğitimi') ||
    text.includes('16 saat eğitim') ||
    text.includes('12 saat eğitim') ||
    text.includes('8 saat eğitim')
  ) {
    const trainingDate = new Date(now);
    trainingDate.setDate(trainingDate.getDate() + 3);
    trainingDate.setHours(17, 0, 0, 0);

    return {
      id: `isg_training_${Date.now()}`,
      baslik: 'İBYS Çalışan Eğitimi & Yasal Bildirim Kaydı',
      kategori: 'İBYS & Çalışan Eğitimi',
      mevzuat_notu: 'Çalışanların İş Sağlığı ve Güvenliği Eğitimlerinin Usul ve Esasları Hakkında Yönetmelik gereği: Çok Tehlikeli sınıfta yılda en az 16 saat, Tehlikeli sınıfta 12 saat, Az Tehlikeli sınıfta 8 saat eğitim verilip İBYS sistemine işlenmesi zorunludur.',
      action_items: [
        { task: 'Tehlike sınıfına uygun eğitim müfredatını (Genel, Sağlık, Teknik konular) ve sunumları hazırla', is_completed: false },
        { task: 'Eğitim başlangıcı ve bitişinde çalışanların ıslak imzalı Eğitim Katılım Formunu tanzim et', is_completed: false },
        { task: 'Eğitim sonu ölçme-değerlendirme sınavı uygulayarak başarı notlarını kaydet', is_completed: false },
        { task: 'İSG-KATİP / İBYS sistemi üzerinden eğitim tarihlerini ve T.C. Kimlik Numaralarını sisteme gir', is_completed: false },
        { task: 'Eğitim belgelerini düzenleyip çalışan özlük dosyalarına ve İSG arşivine kaldır', is_completed: false }
      ],
      zaman_etiketi: 'Eğitim Bildirim Süresi (17:00)',
      tarih_iso: trainingDate.toISOString(),
      hazirlik_zamani: '1 gün önce',
      ikon: '🦺',
      renk: '#FEF3C7',
      sesli_geribildirim: 'İBYS çalışan eğitimi protokolü oluşturuldu. Tehlike sınıfı yasal saatleri ve bildirim adımları hazır.'
    };
  }

  // 2. PERİYODİK SAĞLIK MUAYENESİ TAKİBİ & İŞYERİ HEKİMİ KOORDİNASYONU
  if (
    text.includes('periyodik muayene') ||
    text.includes('sağlık gözetimi') ||
    text.includes('saglik gozetimi') ||
    text.includes('odyometri') ||
    text.includes('işitme testi') ||
    text.includes('solunum fonksiyon') ||
    text.includes('sft testi') ||
    text.includes('akciğer grafisi') ||
    text.includes('akciger grafisi') ||
    text.includes('ağır ve tehlikeli iş') ||
    text.includes('işe giriş sağlık raporu')
  ) {
    const examDate = new Date(now);
    examDate.setDate(examDate.getDate() + 14);
    examDate.setHours(10, 0, 0, 0);

    return {
      id: `isg_health_exam_${Date.now()}`,
      baslik: 'Periyodik Sağlık Muayenesi & Tetkik Takibi',
      kategori: 'Periyodik Muayene & Sağlık',
      mevzuat_notu: '6331 sayılı İSG Kanunu m. 15 gereğince çalışanların periyodik sağlık muayeneleri Çok Tehlikeli sınıfta yılda 1, Tehlikeli sınıfta 3 yılda 1, Az Tehlikeli sınıfta 5 yılda 1 yenilenmeli; tetkikler İşyeri Hekimi kanaat raporuyla onaylanmalıdır.',
      action_items: [
        { task: 'Muayene süresi dolmak üzere olan çalışanların listesini çıkar ve İşyeri Hekimine ilet', is_completed: false },
        { task: 'Mobil sağlık aracı veya yetkili laboratuvarda Odyometri, SFT ve PA Akciğer grafisi randevularını planla', is_completed: false },
        { task: 'Gürültülü veya tozlu ortamda çalışan personelin maruziyet verilerini hekim muayenesine ekle', is_completed: false },
        { task: 'İşyeri Hekiminin \'İşe / Göreve Uygundur\' kanaatini içeren EK-2 Sağlık Raporlarını imzalat', is_completed: false },
        { task: 'Kronik kısıtlılığı olan çalışanlar için sahada ergonomik ve operasyonel iş düzenlemesi yap', is_completed: false }
      ],
      zaman_etiketi: '14 Günlük Takvim (10:00)',
      tarih_iso: examDate.toISOString(),
      hazirlik_zamani: '3 gün önce',
      ikon: '🩺',
      renk: '#E0F2FE',
      sesli_geribildirim: 'Periyodik sağlık muayenesi ve tetkik protokolü kaydedildi. İşyeri hekimi onay adımları devrede.'
    };
  }

  // 3. RAMAK KALA OLAY TUTANAĞI, FOTOĞRAFLI TESPİT & DÖF (5 NEDEN ANALİZİ)
  if (
    text.includes('ramak kala') ||
    text.includes('ramakkala') ||
    text.includes('ucuz atlattık') ||
    text.includes('kaza tehlikesi') ||
    text.includes('kaza atlattık') ||
    text.includes('döf formu') ||
    text.includes('dof formu') ||
    text.includes('kök neden analizi') ||
    text.includes('kok neden analizi')
  ) {
    return {
      id: `isg_near_miss_${Date.now()}`,
      baslik: 'Ramak Kala Olay Tutanağı & DÖF Kök Neden Analizi',
      kategori: 'Ramak Kala & DÖF',
      mevzuat_notu: 'İş Sağlığı ve Güvenliği Kurulları Hakkında Yönetmelik gereği işyerinde meydana gelen ve zarara uğratma potansiyeli olan ramak kala olayları derhal tutanağa bağlanmalı, kök neden analizi yapılarak DÖF başlatılmalıdır.',
      action_items: [
        { task: 'Olay yerini emniyet şeridine alıp tehlikeli durumu, makineyi veya zemini fotoğrafla', is_completed: false },
        { task: 'Olayı yaşayan veya gören çalışanların yazılı ifadelerini alarak Ramak Kala Tutanağını tanzim et', is_completed: false },
        { task: '5 Neden (5 Why) veya Balık Kılçığı yöntemiyle olayın kök nedenini belirle', is_completed: false },
        { task: 'Düzeltici ve Önleyici Faaliyet (DÖF) açarak ilgili bölüm sorumlusuna termin tarihiyle tebliğ et', is_completed: false },
        { task: 'Onaylı Deftere ramak kala özetini işleyip İşveren Vekiline ve Kurul toplantısına sun', is_completed: false }
      ],
      zaman_etiketi: 'Aynı Gün İçinde (İvedi)',
      tarih_iso: null,
      hazirlik_zamani: 'Derhal',
      ikon: '⚠️',
      renk: '#FEE2E2',
      sesli_geribildirim: 'Ramak kala tutanağı ve DÖF kök neden analizi adımları oluşturuldu. Fotoğraflı tespit ve onaylı defter süreci aktifleştirildi.'
    };
  }

  // 4. RİSK DEĞERLENDİRMESİ YENİLEME PERİYODU & ACİL GÜNCELLEME
  if (
    text.includes('risk değerlendirmesi') ||
    text.includes('risk degerlendirmesi') ||
    text.includes('risk analizi') ||
    text.includes('fine kinney') ||
    text.includes('l matris') ||
    text.includes('risk skor') ||
    text.includes('risk yenileme')
  ) {
    const riskDate = new Date(now);
    riskDate.setDate(riskDate.getDate() + 30);
    riskDate.setHours(17, 0, 0, 0);

    return {
      id: `isg_risk_eval_${Date.now()}`,
      baslik: '6331 İSG Risk Değerlendirmesi Yenileme Protokolü',
      kategori: 'Risk Değerlendirmesi',
      mevzuat_notu: 'İş Sağlığı ve Güvenliği Risk Değerlendirmesi Yönetmeliği m. 12: Risk değerlendirmesi Çok Tehlikeli sınıfta 2 yılda bir, Tehlikeli sınıfta 4 yılda bir, Az Tehlikeli sınıfta 6 yılda bir; iş kazası, teknoloji veya yer değişikliğinde derhal yenilenir.',
      action_items: [
        { task: 'Risk Değerlendirme Ekibini (İşveren vekili, İSG uzmanı, hekim, çalışan temsilcisi, destek elemanı) görevlendir', is_completed: false },
        { task: 'Saha turu yaparak kimyasal, fiziksel, biyolojik ve ergonomik tehlike kaynaklarını yeniden haritalandır', is_completed: false },
        { task: 'Fine-Kinney veya L-Tipi Matris yöntemine göre olasılık x frekans x şiddet risk skorlarını hesapla', is_completed: false },
        { task: 'Kabul edilemez (yüksek) riskler için eliminasyon, ikame ve mühendislik önlemlerini belirle', is_completed: false },
        { task: 'Nihai Risk Değerlendirme Raporunu tüm ekip üyelerine ıslak imzalattırıp İSG panosunda özetini ilan et', is_completed: false }
      ],
      zaman_etiketi: 'Yenileme Takvimi (30 Gün)',
      tarih_iso: riskDate.toISOString(),
      hazirlik_zamani: '1 hafta önce',
      ikon: '📋',
      renk: '#FEF3C7',
      sesli_geribildirim: '6331 Risk değerlendirmesi yenileme protokolü başlatıldı. Tehlike sınıflarına göre yasal periyot ve ekip imza süreci devrede.'
    };
  }

  // 5. İSG KURUL TOPLANTISI (AYLIK / 3 AYLIK) & KARAR DEFTERİ ONAYI
  if (
    text.includes('isg kurulu') ||
    text.includes('isg kurul') ||
    text.includes('iş sağlığı kurulu') ||
    text.includes('kurul toplantısı') ||
    text.includes('kurul toplantisi') ||
    text.includes('isg karar defteri') ||
    text.includes('onaylı defter yazımı')
  ) {
    return {
      id: `isg_board_${Date.now()}`,
      baslik: 'İSG Kurul Toplantısı & Karar Defteri Protokolü',
      kategori: 'İSG Kurulu & Defter',
      mevzuat_notu: 'İş Sağlığı ve Güvenliği Kurulları Hakkında Yönetmelik gereği 50 ve üzeri çalışanı olan işyerlerinde kurul toplanması zorunludur (Tehlikeli ve Çok Tehlikeli sınıfta ayda bir, Az Tehlikeli sınıfta 3 ayda bir); kararlar karar defterine imzalanır.',
      action_items: [
        { task: 'Toplantı tarihinden en az 48 saat önce kurul üyelerine resmi gündem maddelerini tebliğ et', is_completed: false },
        { task: 'Geçen ayın ramak kala, iş kazası ve açık DÖF raporlarını sunum haline getir', is_completed: false },
        { task: 'Toplantı açılışında salt çoğunluk nisabını ve çalışan temsilcisi katılımını kaydet', is_completed: false },
        { task: 'Görüşülen kararları, sorumlu kişileri ve termin sürelerini İSG Kurul Karar Defterine yaz', is_completed: false },
        { task: 'İşveren vekili, İSG uzmanı, hekim ve temsilcilerin ıslak imzalarını alarak kararları yürürlüğe koy', is_completed: false }
      ],
      zaman_etiketi: 'Aylık Kurul Saati (14:00)',
      tarih_iso: null,
      hazirlik_zamani: '48 saat önce',
      ikon: '📜',
      renk: '#FEF9C3',
      sesli_geribildirim: 'İSG Kurul toplantısı ve karar defteri protokolü oluşturuldu. 48 saat öncesi gündem tebliği devrede.'
    };
  }

  // 6. YILLIK ACİL DURUM TAHLİYE TATBİKATI & YANGIN TÜPÜ / EKİP KONTROLÜ
  if (
    text.includes('yangın tatbikatı') ||
    text.includes('yangin tatbikati') ||
    text.includes('tahliye tatbikatı') ||
    text.includes('tahliye tatbikati') ||
    text.includes('acil durum tatbikatı') ||
    text.includes('yangın söndürme ekibi') ||
    text.includes('toplanma alanı') ||
    text.includes('yangın tüpü basınç') ||
    text.includes('acil durum ekipleri')
  ) {
    return {
      id: `isg_drill_${Date.now()}`,
      baslik: 'Yıllık Acil Durum & Yangın Tahliye Tatbikatı',
      kategori: 'Acil Durum & Tatbikat',
      mevzuat_notu: 'İşyerlerinde Acil Durumlar Hakkında Yönetmelik m. 13 gereğince yılda en az bir defa acil durum tahliye tatbikatı yapılması, tatbikat tutanağı düzenlenmesi ve ekiplerin güncel tutulması zorunludur.',
      action_items: [
        { task: 'Acil Durum Ekiplerini (Arama-Kurtarma, Yangın, İlk Yardım, Koruma) listeleyip görevlerini teyit et', is_completed: false },
        { task: 'Saha sirenini çalarak kronometre ile tesisin toplanma bölgesine tam tahliye süresini ölç', is_completed: false },
        { task: 'Toplanma alanında yoklama alarak eksik personel olup olmadığını belirle', is_completed: false },
        { task: 'Yangın söndürme tüplerinin (6 kg ABC/CO2) manometre ibrelerini ve yıllık hidrostatik test tarihlerini kontrol et', is_completed: false },
        { task: 'Tatbikat fotoğrafları ile süre ölçümlerini içeren Tatbikat Değerlendirme Raporunu imzala', is_completed: false }
      ],
      zaman_etiketi: 'Yıllık Tatbikat Saati (11:00)',
      tarih_iso: null,
      hazirlik_zamani: '1 gün önce',
      ikon: '🚒',
      renk: '#FECACA',
      sesli_geribildirim: 'Yıllık acil durum ve yangın tahliye tatbikatı protokolü hazırlandı.'
    };
  }

  // 7. İŞ KAZASI BİLDİRİMİ: KRİTİK 3 İŞ GÜNÜ SGK & İBYS PROTOKOLÜ
  if (
    text.includes('iş kazası') ||
    text.includes('is kazasi') ||
    text.includes('kaza bildirimi') ||
    text.includes('sgk kaza bildirimi') ||
    text.includes('3 iş günü kuralı') ||
    text.includes('kaza tahkikat')
  ) {
    const deadline = new Date(now);
    deadline.setDate(deadline.getDate() + 3);
    deadline.setHours(17, 0, 0, 0);

    return {
      id: `isg_accident_${Date.now()}`,
      baslik: 'SGK İş Kazası Bildirimi (Kritik 3 İş Günü)',
      kategori: 'İş Kazası Bildirimi',
      mevzuat_notu: '5510 sayılı Kanun m. 13 ve 6331 sayılı Kanun m. 14 uyarınca: İş kazaları kolluk kuvvetine derhal, SGK\'ya ise kazadan sonraki 3 iş günü içinde e-Sigorta üzerinden bildirilmek zorundadır. Gecikmelerde ağır idari para cezası kesilir.',
      action_items: [
        { task: 'KIRMIZI ALARM: Kazalıya derhal ilk yardım sağlayıp 112 ile sağlık kuruluşuna sevk et; adli vakalarda polise/jandarmaya bilgi ver', is_completed: false },
        { task: 'Kaza mahallini korumaya al; fotoğraf, video, makine durumu ve tanık ifadeleriyle Kaza Tahkikat Tutanağını hazırla', is_completed: false },
        { task: 'SGK e-Bildirge portalı üzerinden en geç 3 iş günü dolmadan \'İş Kazası ve Meslek Hastalığı Bildirim Formu\'nu onayla', is_completed: false },
        { task: 'İşyeri hekimi ile birlikte kazalının geçici iş göremezlik rapor durumunu takip et', is_completed: false },
        { task: 'Noter onaylı Tespit ve Öneri Defterine kazanın oluş şeklini ve alınan önleyici kararları işle', is_completed: false }
      ],
      zaman_etiketi: 'Son Tarih: 3 İş Günü (17:00)',
      tarih_iso: deadline.toISOString(),
      hazirlik_zamani: 'Derhal',
      ikon: '⏱️',
      renk: '#FEE2E2',
      sesli_geribildirim: 'İş kazası protokolü açıldı. SGK 3 iş günü yasal bildirim sayacı başlatıldı.'
    };
  }

  // 8. KKD (KİŞİSEL KORUYUCU DONANIM) ZİMMET & EN/CE STANDART DENETİMİ
  if (
    text.includes('kkd') ||
    text.includes('kişisel koruyucu') ||
    text.includes('kisisel koruyucu') ||
    text.includes('emniyet kemeri') ||
    text.includes('paraşüt tipi') ||
    text.includes('baret kontrol') ||
    text.includes('iş ayakkabısı') ||
    text.includes('kkd zimmet')
  ) {
    return {
      id: `isg_ppe_${Date.now()}`,
      baslik: 'KKD Zimmet & CE/EN Standart Uygunluk Kontrolü',
      kategori: 'KKD & Ekipman Uygunluğu',
      mevzuat_notu: 'Kişisel Koruyucu Donanımların İşyerlerinde Kullanılması Hakkında Yönetmelik gereği tüm KKD\'ler CE belgeli ve EN standartlarına (Baret: EN 397, Kemer: EN 361) uygun olmalı; çalışanlara zimmet tutanağı ve eğitimi karşılığı verilmelidir.',
      action_items: [
        { task: 'Baretlerin son kullanma tarihi (üretimden 3-5 yıl) ve darbe/çatlak durumunu kontrol et (EN 397)', is_completed: false },
        { task: 'Yüksekte çalışma emniyet kemerlerinin dikiş, toka ve lanyard şok emicilerini fiziki test et (EN 361)', is_completed: false },
        { task: 'S3 kompozit/çelik burunlu iş ayakkabısı ve taban delinme korumasını denetle (EN ISO 20345)', is_completed: false },
        { task: 'Yeni işe giren veya ekipmanı eskiyen çalışanlara KKD Zimmet ve Taahhüt Tutanağını imzalat', is_completed: false },
        { task: 'Kullanım ömrü dolan, hasar gören KKD\'leri imha kutusuna ayırıp yenileriyle değiştir', is_completed: false }
      ],
      zaman_etiketi: 'KKD Denetim Saati (09:30)',
      tarih_iso: null,
      hazirlik_zamani: '30 dk önce',
      ikon: '🛡️',
      renk: '#FEF3C7',
      sesli_geribildirim: 'KKD standart kontrol ve zimmet taahhüt adımları hazırlandı.'
    };
  }

  // 9. SICAK İŞ İZNİ (HOT WORK PERMIT) & KAPALI ALAN ÇALIŞMA PROTOKOLÜ
  if (
    text.includes('sıcak iş') ||
    text.includes('sicak is') ||
    text.includes('kaynak izni') ||
    text.includes('kapalı alan') ||
    text.includes('kapali alan') ||
    text.includes('gaz ölçümü') ||
    text.includes('gaz olcumu') ||
    text.includes('çalışma izni') ||
    text.includes('calisma izni') ||
    text.includes('ptw')
  ) {
    return {
      id: `isg_permit_${Date.now()}`,
      baslik: 'Sıcak İş & Kapalı Alan Çalışma İzni (PTW)',
      kategori: 'Sıcak İş & İzinli Çalışma',
      mevzuat_notu: 'Kaynak, kesme veya tank/menhol içi kapalı alan çalışmalarında İş İzin Formu (PTW) tanzim edilmeden; gaz ölçümü (O2, LEL, CO, H2S) yapılmadan ve yangın gözcüsü atanmadan çalışma başlatılamaz.',
      action_items: [
        { task: 'Kaynak/kesme alanının 15 metre yarıçapındaki yanıcı-parlayıcı malzemeleri arındır ve yangın battaniyesi ser', is_completed: false },
        { task: 'Kapalı alanda kalibre edilmiş çoklu gaz detektörü ile Oksijen (%19.5 - 23.5) ve LEL (<%10) seviyelerini ölç ve kaydet', is_completed: false },
        { task: 'Çalışma alanında en az 2 adet dolu 6 kg ABC KKT yangın söndürücü ve nöbetçi yangın gözcüsü konuşlandır', is_completed: false },
        { task: 'Kapalı alana inen personelin paraşüt tipi kemerini ve kurtarma tripodu vinç bağlantısını test et', is_completed: false },
        { task: 'Sıcak İş / Kapalı Alan İzin Formunu (PTW) saha mühendisi ve İSG uzmanı imzasıyla onaylayıp panoya as', is_completed: false }
      ],
      zaman_etiketi: 'Çalışma Başlangıcı (Ön Onay)',
      tarih_iso: null,
      hazirlik_zamani: '45 dk önce',
      ikon: '🔥',
      renk: '#FECACA',
      sesli_geribildirim: 'Sıcak iş ve kapalı alan çalışma izni protokolü açıldı. Gaz ölçümü ve yangın gözcüsü adımları devrede.'
    };
  }

  // İSG domaininde genel iş güvenliği kelimeleri
  if (
    userDomain === 'ISG' ||
    text.includes('iş güvenliği') ||
    text.includes('is güvenliği') ||
    text.includes('isg uzmanı')
  ) {
    return {
      id: `isg_gen_${Date.now()}`,
      baslik: 'İş Sağlığı ve Güvenliği Saha Denetimi',
      kategori: 'İSG Kurulu & Defter',
      mevzuat_notu: '6331 sayılı İş Sağlığı ve Güvenliği Kanunu hükümlerine göre saha denetimi ve mevzuat kayıtları tamamlanmalıdır.',
      action_items: [
        { task: 'Sahada baret, yelek ve uygun KKD kullanımını kontrol et', is_completed: false },
        { task: 'Tehlikeli durum veya ramak kala varsa tespit tutanağına işle', is_completed: false },
        { task: 'Onaylı deftere tespit ve önerileri kaydet', is_completed: false }
      ],
      zaman_etiketi: 'Saha Turu',
      tarih_iso: null,
      ikon: '🦺',
      renk: '#FEF3C7',
      sesli_geribildirim: 'İSG saha kontrol kartı oluşturuldu.'
    };
  }

  return null;
}
