// src/services/pharmacyEngine.ts

import { matchShortScenario } from '../utils/scenarioDatabase.ts';

export interface PharmacyTask {
  id: string;
  baslik: string;
  kategori:
    | 'Soğuk Zincir & Isı Takip'
    | 'Medula & SUT Provizyon'
    | 'Renkli Reçete & İTS'
    | 'Miad & Depo İadesi'
    | 'Majistral & Laboratuvar'
    | 'Nöbet & Güvenlik'
    | 'Kronik Hasta & Rapor'
    | 'Mal Kabul & İTS Doğrulama';
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

export function parsePharmacyIntent(
  rawText: string,
  now: Date = new Date(),
  userDomain?: string
): PharmacyTask | null {
  if (!rawText || typeof rawText !== 'string') return null;
  const text = rawText.replace(/İ/g, 'i').replace(/I/g, 'ı').toLocaleLowerCase('tr-TR').normalize('NFC').trim();

  // 0. HIZLI SENARYO VERİTABANI KONTROLÜ (matchShortScenario - ECZACILIK / SAGLIK)
  const shortMatch = matchShortScenario(rawText, 'ECZACILIK') || matchShortScenario(rawText, 'SAGLIK');
  if (shortMatch && (shortMatch.domain === 'ECZACILIK' || shortMatch.baslik.toLowerCase().includes('eczane') || shortMatch.baslik.toLowerCase().includes('reçete') || shortMatch.baslik.toLowerCase().includes('soğuk zincir'))) {
    return {
      id: `pharma_scenario_${Date.now()}`,
      baslik: shortMatch.baslik,
      kategori: 'Medula & SUT Provizyon',
      mevzuat_notu: shortMatch.akilliFisilti || '6197 sayılı Eczacılar ve Eczaneler Hakkında Kanun ile SUT hükümlerine uygun işlem yürütülmelidir.',
      action_items: (shortMatch.oncedenYapilacaklar || []).map((t) => ({ task: t, is_completed: false })),
      zaman_etiketi: shortMatch.varsayilanZaman || 'Eczane Mesaisi',
      tarih_iso: null,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      ikon: shortMatch.ikon || '💊',
      renk: shortMatch.renk || '#FEE2E2',
      sesli_geribildirim: shortMatch.akilliFisilti || `${shortMatch.baslik} planlandı.`
    };
  }

  // 1. SOĞUK ZİNCİR (2-8°C) ALARMI, AŞI DOLABI & İLÇE SAĞLIK ISI TAKİP ÇİZELGESİ
  if (
    text.includes('soğuk zincir') ||
    text.includes('soguk zincir') ||
    text.includes('aşı dolabı') ||
    text.includes('asi dolabi') ||
    text.includes('2-8') ||
    text.includes('2 - 8') ||
    text.includes('ısı takip') ||
    text.includes('isi takip') ||
    text.includes('buzdolabı derece') ||
    text.includes('buzdolabi derece') ||
    (text.includes('sıcaklık') && (text.includes('eczane') || text.includes('insülin') || text.includes('aşı')))
  ) {
    return {
      id: `pharma_cold_${Date.now()}`,
      baslik: '2-8°C Soğuk Zincir & Sıcaklık Takip Kaydı',
      kategori: 'Soğuk Zincir & Isı Takip',
      mevzuat_notu: 'Eczacılar ve Eczaneler Hakkında Yönetmelik m. 20 gereği aşı, serum ve biyolojik ürünler 2-8°C arasında korunmalı; sıcaklık ve nem değerleri sabah-akşam günde iki kez kayıt altına alınıp İlçe Sağlık denetimine hazır tutulmalıdır.',
      action_items: [
        { task: 'İlaç buzdolabının dijital veri kaydedici (data-logger) ve termometre değerini oku (Hedef: 2°C - 8°C)', is_completed: false },
        { task: 'Sabah / Akşam sıcaklık ve nem takip formuna tarih, saat ve dereceyi ıslak imzayla kaydet', is_completed: false },
        { task: 'Olası elektrik kesintisi veya 8°C aşımı durumunda akü/jeneratör ve acil SMS uyarı sistemini doğrula', is_completed: false },
        { task: 'Buzdolabı içerisindeki insülin, aşı ve biyolojik ürünlerin hava sirkülasyon kanallarına temas etmediğini teyit et', is_completed: false },
        { task: 'Ay sonunda İlçe Sağlık Müdürlüğüne sunulmak üzere aylık soğuk zincir çizelgesi çıktısını arşivle', is_completed: false }
      ],
      zaman_etiketi: 'Sabah (09:00) & Akşam (18:00)',
      tarih_iso: null,
      hazirlik_zamani: '15 dk önce',
      ikon: '❄️',
      renk: '#E0F2FE',
      sesli_geribildirim: '2 ila 8 derece soğuk zincir ısı takip protokolü devrede. Günde iki kez kayıt ve data logger denetimi kaydedildi.'
    };
  }

  // 2. SGK MEDULA FATURA DÖKÜMÜ, SUT PROVİZYON & REÇETE KOLİLEME
  if (
    text.includes('medula') ||
    text.includes('sut provizyon') ||
    text.includes('reçete döküm') ||
    text.includes('recete dokum') ||
    text.includes('sgk fatura') ||
    text.includes('sgk teslim') ||
    text.includes('fatura sonlandırma') ||
    text.includes('a grubu reçete') ||
    text.includes('b grubu reçete') ||
    text.includes('c grubu reçete') ||
    text.includes('kan ürünü reçete')
  ) {
    const targetDate = new Date(now);
    targetDate.setDate(targetDate.getDate() + 5);
    targetDate.setHours(17, 0, 0, 0);

    return {
      id: `pharma_medula_${Date.now()}`,
      baslik: 'Medula SGK Fatura Sonlandırma & Reçete Kolisi',
      kategori: 'Medula & SUT Provizyon',
      mevzuat_notu: 'SGK Protokolü ve Sağlık Uygulama Tebliği (SUT) uyarınca fatura dökümleri her ayın belirlenen takviminde sonlandırılmalı; reçete arkası kaşe/imza, ICD-10 teşhis kodu ve rapor etken madde uyumu eksiksiz kontrol edilip SSGM\'ye kolilenmelidir.',
      action_items: [
        { task: 'Medula Eczane Provizyon Sisteminden A, B ve C Grubu dönem sonlandırma ve döküm listesini al', is_completed: false },
        { task: 'Reçeteler üzerindeki doktor kaşesi, ıslak imza veya e-Reçete onay kodlarının tamlığını doğrula', is_completed: false },
        { task: 'Raporlu ilaçlarda SUT eki katılım payı muafiyet kodlarını (EK-4/D) ve teşhis ICD-10 uyumunu denetle', is_completed: false },
        { task: 'e-Fatura veya e-Arşiv faturasını SGK Sağlık Sosyal Güvenlik Merkezine (SSGM) hitaben kes ve e-İmza ile mühürle', is_completed: false },
        { task: 'Reçete döküm özeti, fatura aslı ve reçeteleri mevzuat standart kolisine yerleştirip koli teslim föyünü imzala', is_completed: false }
      ],
      zaman_etiketi: 'Ayın 1-15 Takvimi (17:00)',
      tarih_iso: targetDate.toISOString(),
      hazirlik_zamani: '1 gün önce',
      ikon: '📑',
      renk: '#FEE2E2',
      sesli_geribildirim: 'Medula SGK fatura sonlandırma ve reçete koli teslim protokolü ajandaya eklendi.'
    };
  }

  // 3. KIRMIZI & YEŞİL REÇETE / RENKLİ REÇETE SİSTEMİ (RRS) & İTS KAREKOD SONLANDIRMA
  if (
    text.includes('renkli reçete') ||
    text.includes('renkli recete') ||
    text.includes('kırmızı reçete') ||
    text.includes('kirmizi recete') ||
    text.includes('yeşil reçete') ||
    text.includes('yesil recete') ||
    text.includes('narkotik ilaç') ||
    text.includes('psikotrop') ||
    text.includes('rrs') ||
    text.includes('kontrole tabi ilaç') ||
    text.includes('mor reçete') ||
    text.includes('turuncu reçete')
  ) {
    return {
      id: `pharma_rrs_${Date.now()}`,
      baslik: 'Renkli Reçete Sistemi (RRS) & İTS Satış Onayı',
      kategori: 'Renkli Reçete & İTS',
      mevzuat_notu: 'Uyuşturucu ve Psikotrop Maddelerin Murakabesi Hakkında Kanun uyarınca kırmızı/yeşil reçeteli ilaçlar Renkli Reçete Sistemi (RRS) üzerinden e-Reçete olarak onaylanmalı; hasta/yakını kimlik teyidi yapılmalı ve İlaç Takip Sistemi (İTS) satışı anlık sonlandırılmalıdır.',
      action_items: [
        { task: 'TİTCK Renkli Reçete Sistemine (RRS) giriş yaparak reçete numarasını ve hekim yetkisini sorgula', is_completed: false },
        { task: 'İlacı teslim alan kişinin T.C. Kimlik Numarası, adı-soyadı ve imzasını reçete arkasına / sisteme kaydet', is_completed: false },
        { task: 'İTS (İlaç Takip Sistemi) üzerinden kutu karekodunu okutup nihai tüketiciye satış bildirimini tamamla', is_completed: false },
        { task: 'Kırmızı reçeteli narkotik ampul/tabletleri kilitli çelik ecza dolabından çıkararak hasta güvenliğini sağla', is_completed: false },
        { task: 'Kırmızı Reçete Defteri ve Uyuşturucu Stok Kartına kutu düşümünü işleyip stok mutabakatını sağla', is_completed: false }
      ],
      zaman_etiketi: 'Anlık İşlem (RRS)',
      tarih_iso: null,
      hazirlik_zamani: 'Derhal',
      ikon: '💊',
      renk: '#FEE2E2',
      sesli_geribildirim: 'Renkli Reçete Sistemi ve İTS satış onay adımları hazırlandı. Kilitli dolap ve kimlik kayıt protokolü aktifleştirildi.'
    };
  }

  // 4. MİADI DOLAN İLAÇ İADESİ, DEPO TAKAS & İL SAĞLIK İMHA KOMİSYONU
  if (
    text.includes('miad') ||
    text.includes('miadı dolan') ||
    text.includes('miadi dolan') ||
    text.includes('son kullanma tarihi') ||
    text.includes('ilaç imha') ||
    text.includes('ilac imha') ||
    text.includes('depo iade') ||
    text.includes('miad takas') ||
    text.includes('ecza deposu iade')
  ) {
    const returnDate = new Date(now);
    returnDate.setDate(returnDate.getDate() + 7);
    returnDate.setHours(15, 0, 0, 0);

    return {
      id: `pharma_expiry_${Date.now()}`,
      baslik: 'Miadı Yaklaşan İlaç İadesi & İmha Bildirimi',
      kategori: 'Miad & Depo İadesi',
      mevzuat_notu: 'Miadı 3 ila 6 ay kalan ilaçlar ecza deposu iade şartnamesine uygun şekilde iade faturasıyla sevk edilmeli; miadı dolan ilaçlar İTS üzerinden \'İmha\' statüsüne alınıp İl Sağlık Müdürlüğü ve Eczacı Odası komisyonu gözetiminde imha edilmelidir.',
      action_items: [
        { task: 'Eczane otomasyonunda miadına 3-6 ay kalan ilaçların stok listesini ve karekod dökümünü çıkar', is_completed: false },
        { task: 'Ecza deposu (Selçuk, Alliance, Hedef vb.) iade şartnamesi kapsamında iade irsaliyesi/faturasını tanzim et', is_completed: false },
        { task: 'Miadı tamamen geçmiş ilaçları karantina kutusuna ayırıp İTS \'Deaktivasyon / İmha Bildirimi\' yap', is_completed: false },
        { task: 'İl Sağlık Müdürlüğü ve Eczacı Odasına İlaç İmha Komisyonu başvuru dilekçesini gönder', is_completed: false },
        { task: 'Komisyon huzurunda düzenlenen ıslak imzalı İmha Tutanağını vergi/muhasebe zayi kaydı için arşive kaldır', is_completed: false }
      ],
      zaman_etiketi: 'Haftalık İade Takvimi (15:00)',
      tarih_iso: returnDate.toISOString(),
      hazirlik_zamani: '2 gün önce',
      ikon: '📦',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Miadı yaklaşan ilaçların depo iadesi ve İTS imha bildirimi adımları oluşturuldu.'
    };
  }

  // 5. MAJİSTRAL FORMÜL HAZIRLIK, LABORATUVAR DEFTERİ & BUD KULLANIM SÜRESİ
  if (
    text.includes('majistral') ||
    text.includes('havan') ||
    text.includes('laboratuvar defteri') ||
    text.includes('laboratuvar calismasi') ||
    text.includes('reçete formülü') ||
    text.includes('alkol solüsyon') ||
    text.includes('merhem hazırla') ||
    text.includes('merhem hazirla') ||
    text.includes('pomad') ||
    text.includes('salisilik asit') ||
    text.includes('çinko oksit')
  ) {
    return {
      id: `pharma_magistral_${Date.now()}`,
      baslik: 'Majistral Formül Hazırlığı & Laboratuvar Kaydı',
      kategori: 'Majistral & Laboratuvar',
      mevzuat_notu: 'Türk Farmakopesi ve Eczaneler Hakkında Yönetmelik uyarınca majistral ilaçlar steril laboratuvarda sertifikalı hammaddelerle hazırlanmalı, Majistral Defterine kayıt numarası verilmeli ve dahili/harici etiketle BUD tüketim süresi belirtilmelidir.',
      action_items: [
        { task: 'Hassas terazi kalibrasyonunu kontrol et; havan, spatül ve mezürleri %70 alkolle dezenfekte et', is_completed: false },
        { task: 'Formül hammaddelerinin (etken ve yardımcı maddeler) analiz sertifikalarını ve miadlarını teyit et', is_completed: false },
        { task: 'Hekimin yazdığı doz hesaplamasını Farmakope maksimum tek ve günlük doz sınırlarına göre kontrol et', is_completed: false },
        { task: 'Majistral Kayıt Defterine reçete tarihi, hekim adı, hasta adı, tam formül ve hesaplanan fiyatı işle', is_completed: false },
        { task: 'Dahili (Kırmızı) veya Harici (Beyaz) etiket üzerine \'Çalkalayınız / Işıktan Koruyunuz\' ve BUD tüketim tarihini yaz', is_completed: false }
      ],
      zaman_etiketi: 'Hazırlık Önceliği (13:30)',
      tarih_iso: null,
      hazirlik_zamani: '30 dk',
      ikon: '⚗️',
      renk: '#EDE9FE',
      sesli_geribildirim: 'Majistral formül hazırlık ve resmi laboratuvar kayıt protokolü hazırlandı.'
    };
  }

  // 6. NÖBETÇİ ECZANE PROTOKOLÜ, E-PANO & GECE GÜVENLİK
  if (
    text.includes('nöbetçi eczane') ||
    text.includes('nobetci eczane') ||
    text.includes('eczane nöbeti') ||
    text.includes('eczane nobeti') ||
    text.includes('gece nöbeti') ||
    text.includes('nobet tabelasi') ||
    text.includes('nöbet panosu') ||
    text.includes('gece bankosu')
  ) {
    return {
      id: `pharma_shift_${Date.now()}`,
      baslik: 'Nöbetçi Eczane & Gece Hizmet Protokolü',
      kategori: 'Nöbet & Güvenlik',
      mevzuat_notu: 'Eczacılar ve Eczaneler Hakkında Yönetmelik gereği nöbet saatlerinde nöbet tabelası ve dış e-pano açık tutulmalı, acil durum zil ve gece bankosu güvenlik tertibatı eksiksiz çalışmalıdır.',
      action_items: [
        { task: 'Eczacı Odası onaylı nöbetçi eczane tabelasını ve dış LED bilgilendirme panosunu aydınlat', is_completed: false },
        { task: 'Gece bankosu emniyet camı, kapı kilidi, alarm ve güvenlik kamerası kayıt sistemini test et', is_completed: false },
        { task: 'Acil nöbet stoğunu (ateş düşürücü şuruplar, enjeksiyonluk ampuller, serum, antibiyotik) tezgah altına yerleştir', is_completed: false },
        { task: 'Nöbetçi kurye ve teknisyen personel görev dağılımı ile nöbet kumanyasını planla', is_completed: false },
        { task: 'Sabah nöbet bitiminde kasa ve Z raporu mutabakatını alarak nöbet devir tutanağını imzala', is_completed: false }
      ],
      zaman_etiketi: 'Nöbet Başlangıcı (18:30)',
      tarih_iso: null,
      hazirlik_zamani: '1 saat önce',
      ikon: '🌙',
      renk: '#F3E8FF',
      sesli_geribildirim: 'Nöbetçi eczane hazırlık protokolü devrede. Tabela aydınlatma, gece bankosu ve acil stok adımları oluşturuldu.'
    };
  }

  // 7. KRONİK HASTA İLAÇ RAPORU TAKİBİ & BİLGİLENDİRME
  if (
    text.includes('kronik hasta') ||
    text.includes('raporlu ilaç') ||
    text.includes('raporlu ilac') ||
    text.includes('ilaç raporu') ||
    text.includes('ilac raporu') ||
    text.includes('rapor bitişi') ||
    text.includes('rapor yenileme') ||
    text.includes('hasta bilgilendirme')
  ) {
    return {
      id: `pharma_chronic_${Date.now()}`,
      baslik: 'Kronik İlaç Raporu Takibi & Hasta Bilgilendirme',
      kategori: 'Kronik Hasta & Rapor',
      mevzuat_notu: 'SUT gereği raporlu ilaçların bitiş gününden önce hastaya rapor yenileme randevusu alması hatırlatılmalı; rapor süre uzatımı mevzuat tebliğleri doğrulanmalıdır.',
      action_items: [
        { task: 'Medula üzerinden rapor geçerlilik süresi 15 gün içinde sona erecek hastaları listele', is_completed: false },
        { task: 'Hastaya Aile Hekimi veya poliklinikten rapor yenileme randevusu alması için SMS / WhatsApp bilgilendirmesi yap', is_completed: false },
        { task: 'Hastanın elindeki kalan kutu sayısı ve günlük doz kullanımına göre tam ilaç tükenme tarihini hesapla', is_completed: false },
        { task: 'Yeni rapor çıktığında SUT etken madde ve muafiyet kodlarını sistemde güncelleyerek reçete provizyonu sağla', is_completed: false }
      ],
      zaman_etiketi: 'Rapor Takip Periyodu',
      tarih_iso: null,
      hazirlik_zamani: '15 gün önce',
      ikon: '📋',
      renk: '#DCFCE7',
      sesli_geribildirim: 'Kronik hasta ilaç rapor takip ve bilgilendirme adımları ajandaya eklendi.'
    };
  }

  // 8. ECZA DEPOSU MAL KABUL, İTS KAREKOD DOĞRULAMA & FATURA AKTARIMI
  if (
    text.includes('mal kabul') ||
    text.includes('depo sevkiyat') ||
    text.includes('depo faturası') ||
    text.includes('its karekod') ||
    text.includes('karekod doğrulama') ||
    text.includes('karekod okutma') ||
    text.includes('karekod uyuşmazlığı')
  ) {
    return {
      id: `pharma_stock_in_${Date.now()}`,
      baslik: 'Depo Mal Kabulü & İTS Karekod Doğrulama',
      kategori: 'Mal Kabul & İTS Doğrulama',
      mevzuat_notu: 'İlaç Takip Sistemi (İTS) mevzuatı gereği eczaneye giren her müstahzarın 2D karekodu İTS Alım Bildirimi ile eczane ruhsatına bağlanmalı; hasarlı ve eksik ürünler tutanakla depoya iade edilmelidir.',
      action_items: [
        { task: 'Ecza deposu taşıma kasalarını açıp sevk irsaliyesi ile koli üzerindeki fatura kalemlerini eşleştir', is_completed: false },
        { task: 'Gelen ürünlerin karekodlarını optik okuyucu ile taratarak İTS Alım Bildirimini onayla', is_completed: false },
        { task: 'Soğuk zincir ilaçların koli içi indikatör sıcaklık kartını kontrol edip derhal 2-8°C dolaba aktar', is_completed: false },
        { task: 'Hasarlı, ambalajı ezilmiş veya miadı yetersiz ürünler için şoförle birlikte İade / Hasar Tutanağı imzala', is_completed: false },
        { task: 'Fatura XML/e-Faturasını eczane otomasyon sistemine aktarıp stok ve perakende satış fiyatlarını güncelle', is_completed: false }
      ],
      zaman_etiketi: 'Sevkiyat Anı',
      tarih_iso: null,
      hazirlik_zamani: 'Hemen',
      ikon: '📦',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Depo mal kabul ve İTS karekod doğrulama süreci kaydedildi.'
    };
  }

  // Eczacılık domaininde genel eczane kelimeleri
  if (
    userDomain === 'ECZACILIK' ||
    text.includes('eczane') ||
    text.includes('eczacı') ||
    text.includes('müstahzar')
  ) {
    return {
      id: `pharma_gen_${Date.now()}`,
      baslik: 'Eczacılık & Klinik İlaç Operasyonu',
      kategori: 'Medula & SUT Provizyon',
      mevzuat_notu: '6197 sayılı Eczacılar ve Eczaneler Hakkında Kanun standartlarına tam uyum sağlanmalıdır.',
      action_items: [
        { task: 'Reçete provizyonu ve SUT kurallarını kontrol et', is_completed: false },
        { task: 'İTS karekod durumunu doğrula', is_completed: false },
        { task: 'Hasta bilgilendirme ve kullanım talimatlarını kutu üzerine etiketle', is_completed: false }
      ],
      zaman_etiketi: 'Eczane Mesaisi',
      tarih_iso: null,
      ikon: '💊',
      renk: '#FEE2E2',
      sesli_geribildirim: 'Eczane operasyon kartı oluşturuldu.'
    };
  }

  return null;
}
