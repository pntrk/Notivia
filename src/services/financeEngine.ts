// src/services/financeEngine.ts

import { matchShortScenario } from '../utils/scenarioDatabase.ts';
import { rollToNextBusinessDay, calculateUetsDeadline } from '../utils/date.ts';

export interface FinanceTask {
  id: string;
  baslik: string;
  kategori:
    | 'SMMM & e-Beyanname (KDV, MUHSGK, Geçici)'
    | 'e-Defter Beratı & Yasal Defter Tasdiki'
    | 'YMM & KDV İadesi (GEKSİS & Karşıt İnceleme)'
    | 'Hazine, Nakit Akışı & Takas Saati'
    | 'Çek / Senet Provizyonu & Protesto Önleme'
    | 'Bordro, SGK Prim & BES Ödemesi'
    | 'BIST Takas T+2 & VİOP Margin Call'
    | 'KAP Bildirimi & Şirket Finansı'
    | 'Döviz, Kur Riski & Forward / Hedge'
    | 'Ba-Bs Mutabakatı & e-Fatura Red Süresi (7 Gün)'
    | 'Kişisel Bütçe, Kredi Kartı & Findeks Skoru';
  mevzuat_notu: string;
  action_items: { task: string; is_completed: boolean }[];
  zaman_etiketi: string;
  tarih_iso: string | null;
  hazirlik_zamani?: string;
  hazirlik_iso?: string;
  ikon: string;
  renk: string;
  sesli_geribildirim: string;
  anomali_notu?: string;
  actionButtons?: { id: string; label: string; icon: string; actionType: string; payload?: string }[];
}

/**
 * Notivia Bilişsel Finans, Muhasebe, Vergi ve Sermaye Piyasaları Motoru (Cognitive Finance & Accounting Engine)
 * Kapsam: SMMM, YMM, Hazine, Nakit Akışı, Çek/Senet, Bordro/SGK, BIST/VİOP, KAP, Döviz/Hedge, Kişisel Finans
 */
export function parseFinanceIntent(
  rawText: string,
  now: Date = new Date(),
  userDomain?: string
): FinanceTask | null {
  if (!rawText || typeof rawText !== 'string') return null;
  const text = rawText
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFC')
    .trim();

  // 0. HIZLI SENARYO VERİTABANI KONTROLÜ (matchShortScenario - FINANS / MALIYE)
  const shortMatch = matchShortScenario(rawText, 'FINANS') || matchShortScenario(rawText, 'MALIYE');
  if (shortMatch && (shortMatch.domain === 'FINANS' || shortMatch.domain === 'MALIYE' || shortMatch.id.startsWith('finans_') || shortMatch.id.startsWith('maliye_'))) {
    return {
      id: `finans_scenario_${Date.now()}`,
      baslik: shortMatch.baslik,
      kategori: 'SMMM & e-Beyanname (KDV, MUHSGK, Geçici)',
      mevzuat_notu: shortMatch.akilliFisilti || 'Vergi Usul Kanunu ve finansal takvime uygun işlem zorunludur.',
      action_items: (shortMatch.oncedenYapilacaklar || []).map((t) => ({ task: t, is_completed: false })),
      zaman_etiketi: shortMatch.varsayilanZaman || 'Finansal Vade Saati',
      tarih_iso: null,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      ikon: shortMatch.ikon || '📊',
      renk: shortMatch.renk || '#DCFCE7',
      sesli_geribildirim: shortMatch.akilliFisilti || `${shortMatch.baslik} planlandı.`
    };
  }

  // 1. KDV & MUHSGK BEYANNAMESİ (HER AYIN 26'SI SAAT 23:59)
  if (
    text.includes('kdv') ||
    text.includes('muhsgk') ||
    text.includes('muhtasar') ||
    (text.includes('beyanname') && !text.includes('geçici') && !text.includes('gecici') && !text.includes('kurumlar') && !text.includes('gelir vergisi')) ||
    (text.includes('ayın 26') || text.includes('ayin 26'))
  ) {
    const rawKdv = new Date(now.getFullYear(), now.getMonth(), 26, 23, 59, 0);
    const { finalDate, isRolled } = rollToNextBusinessDay(rawKdv);
    const rolledNotice = isRolled ? ' (Hafta sonuna denk geldiği için ilk iş gününe ötelenmiştir.)' : '';

    return {
      id: `kdv_muhsgk_${Date.now()}`,
      baslik: 'KDV-1/2 & MUHSGK Beyannamesi',
      kategori: 'SMMM & e-Beyanname (KDV, MUHSGK, Geçici)',
      mevzuat_notu: `VUK ve 5510 sayılı Kanun uyarınca KDV ve MUHSGK beyannameleri her ayın 26. günü saat 23:59'a kadar e-Beyanname portalından onaylanmalıdır.${rolledNotice} Ödemesi ise ayın son günüdür.`,
      action_items: [
        { task: 'Mükelleflerin Z raporları, POS dökümleri ve alış/satış faturalarını Luca/Zirve/Logo sistemine işle', is_completed: false },
        { task: 'KDV-1 ve KDV-2 tevkifat matrah mutabakatını sağla, indirilecek KDV listesini doğrula', is_completed: false },
        { task: 'MUHSGK çalışan SGK prim bildirgeleri ve stopaj gelir vergisi kesintilerini bağdaştır', is_completed: false },
        { task: 'GİB e-Beyanname sistemine paketi yükle, tahakkuk fişlerini PDF olarak mükelleflere WhatsApp/e-posta ile ilet', is_completed: false }
      ],
      zaman_etiketi: `Son Gün: ${finalDate.toLocaleDateString('tr-TR')} 23:59`,
      tarih_iso: finalDate.toISOString(),
      hazirlik_zamani: 'Ayın 20\'sinden İtibaren Kontrol',
      ikon: '📊',
      renk: '#DCFCE7',
      sesli_geribildirim: `KDV ve MUHSGK beyanname onay alarmı ayın 26'sına (${finalDate.toLocaleDateString('tr-TR')}) kuruldu.`,
      anomali_notu: 'Süresinde verilmeyen beyannameler için VUK 355 özel usulsüzlük cezası ve vergi ziyaı cezası uygulanır.'
    };
  }

  // 2. e-DEFTER BERAT YÜKLEMESİ (AY SONU & 3 AYLIK DÖNEMLER)
  if (
    text.includes('e-defter') ||
    text.includes('edefter') ||
    text.includes('berat') ||
    text.includes('berat yükleme') ||
    text.includes('berat yukleme') ||
    text.includes('yevmiye beratı')
  ) {
    const rawEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 0);
    const { finalDate, isRolled } = rollToNextBusinessDay(rawEnd);
    const rolledNotice = isRolled ? ' (Hafta sonu nedeniyle ilk iş gününe ötelenmiştir.)' : '';

    return {
      id: `edefter_berat_${Date.now()}`,
      baslik: 'e-Defter Yevmiye/Kebir Beratı',
      kategori: 'e-Defter Beratı & Yasal Defter Tasdiki',
      mevzuat_notu: `Elektronik Defter Genel Tebliği uyarınca ilgili ayı takip eden 3. ayın son gününe (veya 3 aylık tercih edenlerde ilgili dönemin sonuna) kadar berat dosyaları GİB sistemine yüklenip zaman damgasıyla onaylanmalıdır.${rolledNotice}`,
      action_items: [
        { task: 'Ayın tüm yevmiye ve kebir kayıtlarının borç-alacak dengesini ve fiş numarası sıralamasını denetle', is_completed: false },
        { task: 'Mali mühür / e-İmza ile XML defter dosyalarını oluştur ve şema-schematron doğrulamasından geçir', is_completed: false },
        { task: 'GİB e-Defter Uygulaması üzerinden Yevmiye ve Kebir beratlarını yükle, GİB onaylı beratları indir', is_completed: false },
        { task: 'e-Defter ve berat dosyalarını ikincil kopya saklama (GİB Saklama Programı) sistemine yedekle', is_completed: false }
      ],
      zaman_etiketi: `Son Gün: ${finalDate.toLocaleDateString('tr-TR')} 23:59`,
      tarih_iso: finalDate.toISOString(),
      hazirlik_zamani: 'Ay Sonundan 3 Gün Önce',
      ikon: '📈',
      renk: '#DCFCE7',
      sesli_geribildirim: `e-Defter berat yükleme takvimi ${finalDate.toLocaleDateString('tr-TR')} için planlandı. İkincil saklama uyarısı eklendi.`,
      anomali_notu: 'Berat yüklenmeyen e-Defterler hukuken geçersiz sayılır; KDV indirimlerinin reddi ve usulsüzlük cezası doğabilir.'
    };
  }

  // 3. GEÇİCİ VERGİ BEYANNAMESİ (3 AYLIK DÖNEMLER - MAYIS, AĞUSTOS, KASIM, ŞUBAT 17'Sİ)
  if (
    text.includes('geçici vergi') ||
    text.includes('gecici vergi') ||
    text.includes('peşin vergi') ||
    text.includes('pesin vergi') ||
    text.includes('amortisman ayır') ||
    text.includes('mali kar')
  ) {
    const currentMonth = now.getMonth();
    const quarterMonth = currentMonth < 4 ? 4 : currentMonth < 7 ? 7 : currentMonth < 10 ? 10 : 1;
    const targetYear = quarterMonth === 1 && currentMonth >= 10 ? now.getFullYear() + 1 : now.getFullYear();
    const rawGecici = new Date(targetYear, quarterMonth, 17, 23, 59, 0);
    const { finalDate, isRolled } = rollToNextBusinessDay(rawGecici);

    return {
      id: `gecici_vergi_${Date.now()}`,
      baslik: 'Geçici Vergi Beyannamesi (3 Aylık)',
      kategori: 'SMMM & e-Beyanname (KDV, MUHSGK, Geçici)',
      mevzuat_notu: `Gelir ve Kurumlar Vergisi mükellefleri 3'er aylık dönem kazançları üzerinden hesaplanan Geçici Vergiyi ilgili dönemi izleyen 2. ayın 17. günü saat 23:59'a kadar beyan edip öderler.`,
      action_items: [
        { task: 'Dönem sonu fiili/kaydi stok sayım mutabakatını yap ve satılan malın maliyetini (SMM) kaydet', is_completed: false },
        { task: 'Sabit kıymet amortisman listelerini ve KKEG (Kanunen Kabul Edilmeyen Giderler) dökümünü çıkar', is_completed: false },
        { task: 'Kambiyo kâr/zararı reeskont ve değerleme işlemlerini tamamla', is_completed: false },
        { task: 'Önceki dönemlerde ödenen geçici vergileri mahsup ederek net ödenecek/devreden vergiyi tahakkuk ettir', is_completed: false }
      ],
      zaman_etiketi: `Son Gün: ${finalDate.toLocaleDateString('tr-TR')} 23:59`,
      tarih_iso: finalDate.toISOString(),
      hazirlik_zamani: 'Ayın 10\'undan İtibaren Bilanço Kontrolü',
      ikon: '💼',
      renk: '#DCFCE7',
      sesli_geribildirim: `3 aylık Geçici Vergi beyanname onay ve SMM maliyet hesaplama protokolü oluşturuldu.`,
      anomali_notu: '%10\'u aşan yanılma payı tespitinde eksik beyan edilen kısım için cezalı tarhiyat uygulanır.'
    };
  }

  // 4. KURUMLAR VERGİSİ & YILLIK GELİR VERGİSİ BEYANNAMESİ
  if (
    text.includes('kurumlar vergisi') ||
    text.includes('yıllık gelir vergisi') ||
    text.includes('yillik gelir vergisi') ||
    text.includes('gelir vergisi beyannamesi') ||
    text.includes('kurumlar beyannamesi') ||
    text.includes('bilanço dipnot') ||
    text.includes('kkeg')
  ) {
    const isCorp = text.includes('kurumlar');
    const dueMonth = isCorp ? 3 : 2; // Nisan (index 3) veya Mart (index 2)
    const targetDate = new Date(now.getFullYear(), dueMonth + 1, 0, 23, 59, 0);
    const { finalDate } = rollToNextBusinessDay(targetDate);

    return {
      id: `annual_tax_${Date.now()}`,
      baslik: isCorp ? 'Yıllık Kurumlar Vergisi Beyannamesi' : 'Yıllık Gelir Vergisi Beyannamesi',
      kategori: 'SMMM & e-Beyanname (KDV, MUHSGK, Geçici)',
      mevzuat_notu: isCorp
        ? `Kurumlar Vergisi Beyannamesi hesap döneminin kapandığı ayı izleyen 4. ayın (Nisan) son gününe kadar verilir ve tek taksitte ödenir.`
        : `Yıllık Gelir Vergisi Beyannamesi Mart ayının son gününe kadar verilir; Mart ve Temmuz aylarında 2 eşit taksitte ödenir.`,
      action_items: [
        { task: 'Mali Bilanço ve Gelir Tablosu dipnotlarını ve transfer fiyatlandırması formunu hazırla', is_completed: false },
        { task: 'KKEG, Ar-Ge / Teknopark istisnaları, indirimli kurumlar vergisi ve geçmiş yıl zararlarını mahsup et', is_completed: false },
        { task: 'Yıl içinde kesinti yoluyla ödenen stopaj vergileri ve geçici vergilerin mahsup kontrolünü yap', is_completed: false },
        { task: 'e-Beyanname sisteminden onaylayıp tahakkuk fişini mükellefe teslim et', is_completed: false }
      ],
      zaman_etiketi: `Son Gün: ${finalDate.toLocaleDateString('tr-TR')} 23:59`,
      tarih_iso: finalDate.toISOString(),
      hazirlik_zamani: 'Dönem Başından 15 Gün Önce',
      ikon: '🏛️',
      renk: '#DCFCE7',
      sesli_geribildirim: `${isCorp ? 'Kurumlar' : 'Gelir'} Vergisi yıllık beyanname hazırlık ve mahsup protokolü devrede.`,
      anomali_notu: 'Mahsup edilemeyen tevkifat tutarları için nakden veya mahsuben iade talep dilekçesi (1VCD) verilmelidir.'
    };
  }

  // 5. YMM, TAM TASDİK & KDV İADESİ (GEKSİS, KARŞIT İNCELEME TUTANAĞI)
  if (
    text.includes('ymm') ||
    text.includes('yeminli mali müşavir') ||
    text.includes('kdv iadesi') ||
    text.includes('kdv iade') ||
    text.includes('karşıt inceleme') ||
    text.includes('karsit inceleme') ||
    text.includes('geksis') ||
    text.includes('tam tasdik') ||
    text.includes('yüklenilen kdv') ||
    text.includes('iade talep')
  ) {
    return {
      id: `ymm_vat_refund_${Date.now()}`,
      baslik: 'YMM KDV İadesi & Karşıt İnceleme',
      kategori: 'YMM & KDV İadesi (GEKSİS & Karşıt İnceleme)',
      mevzuat_notu: 'KDV Genel Uygulama Tebliği uyarınca ihracat istisnası, indirimli oran veya tevkifattan doğan KDV iadelerinde YMM Raporu, İndirilecek/Yüklenilen KDV Listesi ve Karşıt İnceleme Tutanakları zorunludur.',
      action_items: [
        { task: 'İhracat gümrük beyannameleri (GÇB) intaç tarihleri ve İndirilecek/Yüklenilen KDV listelerini sisteme yükle', is_completed: false },
        { task: 'Alt tedarikçilere Karşıt İnceleme Tutanağı (KİT) göndererek defter ve fatura teyitlerini topla', is_completed: false },
        { task: 'GİB İnternet Vergi Dairesi üzerinden GEKSİS (KDV İadesi Risk Analizi) raporunu çalıştır ve segment hatalarını çöz', is_completed: false },
        { task: 'YMM KDV İadesi Tasdik Raporunu hazırlayıp Vergi Dairesi Müdürlüğü\'ne intikal ettir', is_completed: false }
      ],
      zaman_etiketi: 'KDV İade Dosya Süreci (Takip)',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Fatura Kesiminden Sonraki 10 Gün',
      ikon: '📑',
      renk: '#DCFCE7',
      sesli_geribildirim: 'YMM KDV iadesi, GEKSİS analiz doğrulaması ve Karşıt İnceleme adımları açıldı.',
      anomali_notu: 'Sahte veya muhteviyatı itibarıyla yanıltıcı belge (SMİYB) riski GEKSİS raporunda anında kırmızı bayrak üretir.'
    };
  }

  // 6. ÇEK & SENET PROVİZYONU, TAKAS SAATİ (11:00) & PROTESTO ENGELLEME
  if (
    text.includes('çek') ||
    text.includes('cek') ||
    text.includes('senet') ||
    text.includes('karşılıksız') ||
    text.includes('karsiliksiz') ||
    text.includes('protesto') ||
    text.includes('takasa verildi') ||
    text.includes('çek ödemesi') ||
    text.includes('cek odemesi') ||
    text.includes('senet vadesi')
  ) {
    const due = new Date(now);
    due.setDate(due.getDate() + 1);
    due.setHours(11, 0, 0, 0);

    return {
      id: `cheque_clearing_${Date.now()}`,
      baslik: 'Çek / Senet Provizyonu & Takas',
      kategori: 'Çek / Senet Provizyonu & Protesto Önleme',
      mevzuat_notu: '5941 sayılı Çek Kanunu uyarınca ibraz günü banka takas saati (11:00-14:00) itibarıyla karşılığı bulunmayan çekler için karşılıksız işlemi yapılır, adli para cezası ve çek düzenleme yasağı doğar.',
      action_items: [
        { task: 'Takas saati (11:00) öncesinde banka vadesiz hesabında çek tutarı kadar nakit provizyon sağla', is_completed: false },
        { task: 'Hesapta bakiye yetersizse rotatif kredi (BCH), KMH limiti veya grup şirket virmanını devreye al', is_completed: false },
        { task: 'Alacaklı toptancı/müşteri ile çek vadesi ve cari hesap mutabakatını teyit et', is_completed: false },
        { task: 'Takastan çıkan çekin ödendi dekontunu muhasebe ERP sistemine işleyip borç senedini kapat', is_completed: false }
      ],
      zaman_etiketi: 'Vadeden 1 Gün Önce (Takas: 11:00)',
      tarih_iso: due.toISOString(),
      hazirlik_zamani: 'Sabah 09:30 Bakiye Kontrolü',
      hazirlik_iso: new Date(due.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      ikon: '💸',
      renk: '#FEE2E2',
      sesli_geribildirim: 'Çek ve senet ödemesi için takas saati öncesine nakit provizyon ve karşılıksız engelleme alarmı kuruldu.',
      anomali_notu: 'Çekin karşılıksız çıkması şirketin KKB Findeks ve Bankalar Birliği Risk Merkezi kredibilitesini anında kilitler.'
    };
  }

  // 7. HAZİNE, NAKİT AKIŞI (CASH FLOW), FAST & EFT LİMİTLERİ (11:00 / 14:00)
  if (
    text.includes('nakit akışı') ||
    text.includes('nakit akisi') ||
    text.includes('cash flow') ||
    text.includes('hazine') ||
    text.includes('likidite') ||
    text.includes('valör') ||
    text.includes('valor') ||
    text.includes('eft saati') ||
    text.includes('fast limiti') ||
    text.includes('gecelik faiz') ||
    text.includes('overnight') ||
    text.includes('repo')
  ) {
    return {
      id: `treasury_cashflow_${Date.now()}`,
      baslik: 'Günlük Hazine & Nakit Akışı Yönetimi',
      kategori: 'Hazine, Nakit Akışı & Takas Saati',
      mevzuat_notu: 'Gün içi likidite yönetiminde FAST (100.000 TL üst limit) ve EFT kapanış saatleri (17:15) ile valör kayıpları titizlikle yönetilmeli, atıl nakit gecelik repo/mevduatta nemalandırılmalıdır.',
      action_items: [
        { task: 'Sabah 09:15: Tüm banka hesap bakiyelerini MT940 veya API üzerinden konsolide nakit tablosuna çek', is_completed: false },
        { task: 'Gün içi zorunlu ödemeleri (Maaş, vergi, çek, hammadde) nakit çıkış projeksiyonu ile eşleştir', is_completed: false },
        { task: 'Beklenen müşteri tahsilatlarını teyit et, geciken tahsilatlar için finans departmanına bildirim yap', is_completed: false },
        { task: 'Saat 16:30 itibarıyla fazla kalan nakdi gecelik (O/N) mevduat veya para piyasası fonuna bağla', is_completed: false }
      ],
      zaman_etiketi: 'Gün Boyu (16:30 Nemalandırma)',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Sabah 09:15 Bakiye Konsolidasyonu',
      ikon: '💰',
      renk: '#DCFCE7',
      sesli_geribildirim: 'Günlük hazine nakit akışı tablosu ve 16:30 gecelik nemalandırma kontrolü hazırlandı.',
      anomali_notu: 'Plansız EFT çıkışları gün içi eksi bakiye (kredili mevduat) faiz maliyeti oluşturur.'
    };
  }

  // 8. BORDRO, MAAŞ TRANSFERİ, SGK PRİMİ & OTOMATİK BES (%3)
  if (
    text.includes('maaş') ||
    text.includes('maas') ||
    text.includes('bordro') ||
    text.includes('sgk prim') ||
    text.includes('bes kesintisi') ||
    text.includes('otomatik bes') ||
    text.includes('agi') ||
    text.includes('avans') ||
    text.includes('ücret pusulası') ||
    text.includes('ucret pusulasi')
  ) {
    const rawPayDate = new Date(now.getFullYear(), now.getMonth() + (now.getDate() > 5 ? 1 : 0), 5, 10, 0, 0);
    const { finalDate } = rollToNextBusinessDay(rawPayDate);

    return {
      id: `payroll_salary_${Date.now()}`,
      baslik: 'Personel Bordro, Maaş & SGK Prim',
      kategori: 'Bordro, SGK Prim & BES Ödemesi',
      mevzuat_notu: '4857 sayılı İş Kanunu uyarınca 5 ve üzeri çalışanı olan işyerlerinde ücretler banka kanalıyla ödenmeli; %3 BES kesintisi ve SGK işveren primleri süresinde yatırılmalıdır.',
      action_items: [
        { task: 'Aylık puantaj dökümünü (Fazla mesai, rapor, ücretsiz izin, prim) doğrula ve bordroyu hesapla', is_completed: false },
        { task: '%3 Bireysel Emeklilik (BES) kesintilerini emeklilik şirketinin portalına aktar', is_completed: false },
        { task: 'Banka maaş ödeme dosyasını (disketi) banka kurumsal ekranından onaya sun', is_completed: false },
        { task: 'İmzalı/elektronik ücret hesap pusulalarını (e-Bordro) çalışanlara tebliğ et', is_completed: false }
      ],
      zaman_etiketi: `Maaş Günü: ${finalDate.toLocaleDateString('tr-TR')} 10:00`,
      tarih_iso: finalDate.toISOString(),
      hazirlik_zamani: 'Ayın 1\'i Puantaj Kapanışı',
      ikon: '💳',
      renk: '#DCFCE7',
      sesli_geribildirim: `Bordro hesaplama, BES aktarımı ve maaş banka transfer adımları ${finalDate.toLocaleDateString('tr-TR')} için kuruldu.`,
      anomali_notu: 'Ücreti 20 günden fazla mücbir sebep olmaksızın ödenmeyen işçinin iş görmekten kaçınma ve haklı fesih hakkı doğar.'
    };
  }

  // 9. BIST T+2 TAKAS, VİOP MARGIN CALL & TEMİNAT TAMAMLAMA (14:30)
  if (
    text.includes('bist') ||
    text.includes('borsa') ||
    text.includes('hisse') ||
    text.includes('t+2') ||
    text.includes('viop') ||
    text.includes('margin call') ||
    text.includes('teminat tamamlama') ||
    text.includes('takasbank') ||
    text.includes('kredili hisse') ||
    text.includes('halka arz') ||
    text.includes('ipo')
  ) {
    const isIPO = text.includes('halka arz') || text.includes('ipo');
    const isViop = text.includes('viop') || text.includes('margin call') || text.includes('teminat');

    return {
      id: `bist_securities_${Date.now()}`,
      baslik: isIPO ? 'Halka Arz (IPO) Talep Toplama' : (isViop ? 'VİOP Margin Call & Teminat Tamamlama' : 'BIST Hisse & T+2 Takas Yükümlülüğü'),
      kategori: 'BIST Takas T+2 & VİOP Margin Call',
      mevzuat_notu: isViop
        ? 'Takasbank VİOP kuralları gereği Margin Call çağrısı alan yatırımcılar saat 14:30\'a kadar nakit teminat yatırmak veya pozisyon kapatmak zorundadır.'
        : (isIPO
          ? 'SPK onaylı izahnameye göre talep toplama saatlerinde (10:30-13:00) T1-T2 bakiye uygunluğu kontrol edilmelidir.'
          : 'BIST Pay Piyasasında alım-satım işlemlerinin takası işlem gününü takip eden 2. iş gününde (T+2) gerçekleşir.'),
      action_items: isViop ? [
        { task: 'Saat 14:00 öncesi Takasbank teminat açığı (Margin Call) tutarını kontrol et', is_completed: false },
        { task: 'Aracı kurum VİOP hesabına EFT/FAST ile nakit teminat aktar veya ters pozisyonla riski düşür', is_completed: false },
        { task: 'Saat 14:30\'da teminat tamamlama teyidini alarak otomatik likidasyon (stop-out) riskini önle', is_completed: false }
      ] : (isIPO ? [
        { task: 'SPK onaylı izahname, konsorsiyum dağıtım yöntemi (Eşit/Oransal) ve fon kullanım raporunu incele', is_completed: false },
        { task: 'Yatırım hesabındaki nakit veya T1-T2 bakiye durumunu talep toplama saatine göre ayarla', is_completed: false },
        { task: 'Saat 10:30-13:00 arasında halka arz talep girişini aracı kurum/banka üzerinden tamamla', is_completed: false }
      ] : [
        { task: 'T+2 takas gününde hisse alım tutarı kadar nakdin hesapta hazır bulundurulmasını sağla', is_completed: false },
        { task: 'Kredili işlem özkaynak oranının SPK alt sınırı olan %35\'in altına düşmediğini teyit et', is_completed: false },
        { task: 'MKK (Merkezi Kayıt Kuruluşu) e-YATIRIMCI uygulamasından hisse blokaj ve portföy durumunu denetle', is_completed: false }
      ]),
      zaman_etiketi: isViop ? 'Bugün 14:30 (Kritik Son Saat)' : (isIPO ? 'Talep Toplama 10:30-13:00' : 'T+2 Takas Saati'),
      tarih_iso: now.toISOString(),
      hazirlik_zamani: isViop ? '14:00 Öncesi Nakit Aktarımı' : 'Sabah 10:00 Portföy Kontrolü',
      ikon: isIPO ? '🚀' : (isViop ? '⚠️' : '📈'),
      renk: isViop ? '#FEE2E2' : '#DCFCE7',
      sesli_geribildirim: isViop ? 'VİOP Margin Call teminat tamamlama alarmı saat 14:30 öncesi için kuruldu.' : 'BIST sermaye piyasası işlem ve takas takip kartı açıldı.',
      anomali_notu: isViop ? 'Saat 14:30\'a kadar tamamlanmayan teminatlarda Takasbank resen piyasa fiyatından pozisyon kapatır.' : undefined
    };
  }

  // 10. KAP BİLDİRİMİ, SPK MEVZUATI & İÇERİDEN ÖĞRENENLER LİSTESİ
  if (
    text.includes('kap') ||
    text.includes('kamuyu aydınlatma') ||
    text.includes('kamuyu aydinlatma') ||
    text.includes('özel durum açıklaması') ||
    text.includes('ozel durum aciklamasi') ||
    text.includes('içeriden öğrenenler') ||
    text.includes('iceriden ogrenenler') ||
    text.includes('spk bülteni')
  ) {
    return {
      id: `kap_disclosure_${Date.now()}`,
      baslik: 'KAP Özel Durum Açıklaması & SPK Bildirimi',
      kategori: 'KAP Bildirimi & Şirket Finansı',
      mevzuat_notu: 'II-15.1 sayılı Özel Durumlar Tebliği uyarınca hisse değerini, yatırımcı kararını etkileyebilecek her türlü önemli gelişme derhal KAP üzerinden kamuya duyurulmalıdır.',
      action_items: [
        { task: 'Özel Durum Açıklaması taslağını hukuk ve yatırımcı ilişkileri departmanı ile doğrula', is_completed: false },
        { task: 'İçeriden Öğrenenler Listesine (Insider List) yeni bilgiyi öğrenen kişileri MKK sistemine ekle', is_completed: false },
        { task: 'Seans saatleri içinde açıklama yapılacaksa BIST Borsa Başkanlığı ile koordinasyon sağla', is_completed: false },
        { task: 'e-İmza ile KAP bildirim portalına şablonu yükle ve yayını doğrula', is_completed: false }
      ],
      zaman_etiketi: 'Derhal / Seans Öncesi-Sonrası',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Duyuru Öncesi e-İmza Teyidi',
      ikon: '📢',
      renk: '#E0F2FE',
      sesli_geribildirim: 'KAP özel durum açıklaması ve SPK içeriden öğrenenler listesi bildirim protokolü oluşturuldu.',
      anomali_notu: 'Açıklanması gereken bilginin gizlenmesi veya manipülatif bildirim 6362 sayılı SPK uyarınca hapis cezasına tabidir.'
    };
  }

  // 11. DÖVİZ, KUR RİSKİ, FORWARD, HEDGE & İTHALAT-İHRACAT KUR FARKI
  if (
    text.includes('döviz') ||
    text.includes('doviz') ||
    text.includes('dolar') ||
    text.includes('euro') ||
    text.includes('forward') ||
    text.includes('hedge') ||
    text.includes('kur riski') ||
    text.includes('kur farkı faturası') ||
    text.includes('kur farki') ||
    text.includes('kambiyo') ||
    text.includes('ddkkm')
  ) {
    return {
      id: `fx_hedge_${Date.now()}`,
      baslik: 'Kur Riski, Forward & Kur Farkı Faturası',
      kategori: 'Döviz, Kur Riski & Forward / Hedge',
      mevzuat_notu: 'Yabancı para cinsinden vadeli borç ve alacaklarda kur dalgalanmalarına karşı vadeli döviz alım (Forward) veya Opsiyon sözleşmeleri ile kur riski kilitlenmeli, geçici vergi dönemlerinde kur farkı faturalaşması tamamlanmalıdır.',
      action_items: [
        { task: 'İthalat transferi veya dövizli kredi ödeme günündeki net döviz açık pozisyonunu tespit et', is_completed: false },
        { task: 'Bankalardan vadeli döviz (Forward) veya opsiyon prim tekliflerini alarak kur kilitlemesi yap', is_completed: false },
        { task: 'Dövizli cari hesaplar için TCMB döviz alış/satış kurlarıyla dönem sonu kur farkını hesapla', is_completed: false },
        { task: 'Lehte veya aleyhte oluşan kur farkı için KDV\'li Kur Farkı Faturası tanzim et', is_completed: false }
      ],
      zaman_etiketi: 'Valör Günü / Dönem Sonu',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Piyasa Açılışı 10:00',
      ikon: '💱',
      renk: '#DCFCE7',
      sesli_geribildirim: 'Kur riski yönetimi, Forward hedge ve kur farkı faturalandırma takibi açıldı.',
      anomali_notu: 'Kur farklarında KDV hesaplanması Katma Değer Vergisi Kanunu 24/c maddesi uyarınca yasal zorunluluktur.'
    };
  }

  // 12. BA-BS MUTABAKATI & e-FATURA 7 GÜNLÜK YASAL İTİRAZ / RED SÜRESİ
  if (
    text.includes('ba-bs') ||
    text.includes('babs') ||
    text.includes('mutabakat') ||
    text.includes('fatura reddi') ||
    text.includes('fatura red') ||
    text.includes('e-fatura red') ||
    text.includes('7 gün') ||
    text.includes('7 gunluk itiraz') ||
    text.includes('ticari fatura itiraz')
  ) {
    const due7Days = new Date(now);
    due7Days.setDate(due7Days.getDate() + 7);

    return {
      id: `babs_invoice_reconciliation_${Date.now()}`,
      baslik: 'Ba-Bs Mutabakatı & e-Fatura Red (7 Gün)',
      kategori: 'Ba-Bs Mutabakatı & e-Fatura Red Süresi (7 Gün)',
      mevzuat_notu: 'TTK Madde 21 uyarınca ticari e-Faturalara tebliğden itibaren 7 gün içinde KEP veya e-Fatura Portalı üzerinden itiraz edilmezse içeriği aynen kabul edilmiş sayılır. Ba-Bs formlarında 5.000 TL üzeri hadler esastır.',
      action_items: [
        { task: 'Gelen ticari e-Faturaların irsaliye, miktar ve birim fiyat kontrollerini 7 gün dolmadan tamamla', is_completed: false },
        { task: 'Hatalı/ihtilaflı faturalar için e-Fatura portalından "RED" yanıtı dön veya KEP üzerinden itiraz et', is_completed: false },
        { task: 'Aylık Ba-Bs mutabakat mektuplarını tedarikçi ve müşterilere e-posta/faks ile gönder', is_completed: false },
        { task: '5.000 TL üzerindeki faturalarda adet ve KDV hariç tutar farklarını muhasebe kayıtlarıyla eşitle', is_completed: false }
      ],
      zaman_etiketi: `Yasal Süre: 7 Gün (${due7Days.toLocaleDateString('tr-TR')})`,
      tarih_iso: due7Days.toISOString(),
      hazirlik_zamani: 'Fatura Tarihinden İtibaren 48 Saat',
      ikon: '📑',
      renk: '#FEF3C7',
      sesli_geribildirim: 'e-Fatura 7 günlük yasal itiraz süresi ve Ba-Bs mutabakat protokolü başlatıldı.',
      anomali_notu: '7 günlük sürenin kaçırılması durumunda faturaya itiraz ancak mahkemede menfi tespit davasıyla mümkündür.'
    };
  }

  // 13. KİŞİSEL BÜTÇE, KREDİ KARTI KESİMİ & FİNDEKS KREDİ NOTU KORUMASI
  if (
    text.includes('kredi kartı') ||
    text.includes('kredi karti') ||
    text.includes('hesap kesim') ||
    text.includes('asgari ödeme') ||
    text.includes('asgari odeme') ||
    text.includes('findeks') ||
    text.includes('kredi notu') ||
    text.includes('kkb skoru') ||
    text.includes('fatura son ödeme')
  ) {
    const rawDue = new Date(now);
    rawDue.setDate(rawDue.getDate() + 10);
    const { finalDate } = rollToNextBusinessDay(rawDue);

    return {
      id: `personal_credit_score_${Date.now()}`,
      baslik: 'Kredi Kartı & Findeks Skoru Koruması',
      kategori: 'Kişisel Bütçe, Kredi Kartı & Findeks Skoru',
      mevzuat_notu: 'Kredi kartı dönem borcunun son ödeme gününde en az asgari tutarının yatırılmaması durumunda gecikme faizi işler ve KKB Findeks kredi notu ciddi hasar alır.',
      action_items: [
        { task: 'Hesap kesim ekstresindeki dönem borcu ve asgari ödeme tutarını doğrula', is_completed: false },
        { task: 'Son ödeme gününden önce otomatik ödeme talimatını veya vadesiz hesap bakiyesini kontrol et', is_completed: false },
        { task: 'Faiz maliyetine girmemek için mümkünse borcun tamamını, değilse en az asgarisini yatır', is_completed: false },
        { task: 'Findeks raporu üzerinden kredi limit doluluk oranının %70\'in altında kaldığını teyit et', is_completed: false }
      ],
      zaman_etiketi: `Son Ödeme Günü: ${finalDate.toLocaleDateString('tr-TR')}`,
      tarih_iso: finalDate.toISOString(),
      hazirlik_zamani: 'Son Ödemeden 2 Gün Önce Bakiye',
      ikon: '💳',
      renk: '#DCFCE7',
      sesli_geribildirim: `Kredi kartı son ödeme (${finalDate.toLocaleDateString('tr-TR')}) ve Findeks notu koruma alarmı kuruldu.`,
      anomali_notu: 'Üst üste 3 dönem asgari ödenmezse kart nakit çekime ve kullanıma kapatılır.'
    };
  }

  // 14. EĞER GENEL FİNANS / ALAN EŞLEŞMESİ VARSA (Sadece metinde finansal kavramlar geçtiğinde)
  if (userDomain === 'FINANS' || userDomain === 'MALIYE') {
    const isFinanceRelated = /smmm|mali|kdv|muhsgk|vergi|fatura|beyanname|muhasebe|banka|bütçe|butce|kredi|borç|borc|öde|ode|para|dekont|ekstre|tahakkuk|hesap|financial|tax|budget|invoice|payment|accounting/i.test(text);
    if (isFinanceRelated) {
      return {
        id: `general_fin_${Date.now()}`,
        baslik: 'Finansal Görev & Vergi Takibi',
        kategori: 'SMMM & e-Beyanname (KDV, MUHSGK, Geçici)',
        mevzuat_notu: 'Mali mevzuat ve vergi takvimine uygun finansal mutabakat ve kayıt zorunludur.',
        action_items: [
          { task: 'İlgili finansal evrak veya banka dekontunu dosyala', is_completed: false },
          { task: 'Muhasebe cari hesap ve KDV mutabakatını sağla', is_completed: false },
          { task: 'Vade ve ödeme takvimini ajandaya işle', is_completed: false }
        ],
        zaman_etiketi: 'Finans Takvimi',
        tarih_iso: now.toISOString(),
        ikon: '📊',
        renk: '#DCFCE7',
        sesli_geribildirim: 'Finansal işlem kaydedildi, yasal mevzuat adımları oluşturuldu.'
      };
    }
  }

  return null;
}
