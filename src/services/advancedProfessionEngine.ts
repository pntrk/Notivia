// src/services/advancedProfessionEngine.ts

import type { ActionItem } from '../types/notivia.ts';
import type { ProfessionDomain } from '../types/domainThemes.ts';
import { parseVeterinaryIntent } from './veterinaryEngine.ts';

export interface AdvancedProfessionTask {
  id: string;
  baslik: string;
  kategori: string;
  domain: ProfessionDomain;
  mevzuat_notu: string;
  action_items: ActionItem[];
  zaman_etiketi: string;
  tarih_iso: string | null;
  ikon: string;
  renk: string;
  sesli_geribildirim: string;
  anomali_notu?: string;
}

export function parseAdvancedProfessionIntent(
  rawText: string,
  baseDate: Date = new Date()
): AdvancedProfessionTask | null {
  if (!rawText || typeof rawText !== 'string') return null;
  const text = rawText.toLowerCase().trim();

  // =========================================================================
  // 1. DERİNLEŞTİRİLMİŞ OKUL İDARESİ & MEB EKOSİSTEMİ
  // =========================================================================

  // 1.1 TEFBİS & Okul Aile Birliği Bağış ve Bütçe Süreci
  if (
    text.includes('tefbis') ||
    text.includes('okul aile birliği') ||
    text.includes('okul aile birligi') ||
    (text.includes('bağış') && (text.includes('makbuz') || text.includes('okul') || text.includes('hesap')))
  ) {
    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + 3); // 3 gün içinde TEFBİS kaydı kuralı
    targetDate.setHours(16, 0, 0, 0);

    return {
      id: `tefbis_${Date.now()}`,
      baslik: 'TEFBİS Bağış ve Gider Kayıt Kapanışı',
      kategori: 'Okul Aile Birliği & Bütçe',
      domain: 'EGITIM',
      mevzuat_notu: 'MEB Okul Aile Birliği Yönetmeliği gereği bağış ve harcama makbuzları en geç 3 gün içinde TEFBİS modülüne işlenmelidir.',
      action_items: [
        { task: 'Okul Aile Birliği banka hesap ekstresindeki bağışları kontrol et', is_completed: false },
        { task: 'Mükerrer veya eksik kayıt olmaksızın TEFBİS modülüne gelir/gider girişini yap', is_completed: false },
        { task: 'Harcama faturaları ve tahsilat makbuzlarını OAB dosyasında arşivle', is_completed: false },
        { task: 'Aylık gelir-gider tablosunu veli panosuna asmak üzere çıktı al', is_completed: false }
      ],
      zaman_etiketi: '3 Gün İçinde (16:00)',
      tarih_iso: targetDate.toISOString(),
      ikon: '🏫',
      renk: '#FEF08A',
      sesli_geribildirim: 'TEFBİS ve Okul Aile Birliği süreci kaydedildi. 3 günlük yasal kayıt takvimi başlatıldı.'
    };
  }

  // 1.2 LGS / YKS / MEB Sınav Binası ve Komisyon Süreci
  if (
    (text.includes('lgs') || text.includes('yks') || text.includes('bina sınav')) &&
    (text.includes('komisyon') || text.includes('görev') || text.includes('mühür') || text.includes('evrak'))
  ) {
    return {
      id: `exam_comm_${Date.now()}`,
      baslik: 'Bina Sınav Komisyonu & Evrak Güvenliği',
      kategori: 'Sınav Hizmetleri',
      domain: 'EGITIM',
      mevzuat_notu: 'MEB Merkezi Sistem Sınav Yönergesi uyarınca Bina Sınav Komisyonu sınavdan 2 saat önce toplanmalı, kurye teslim tutanakları eksiksiz tanzim edilmelidir.',
      action_items: [
        { task: 'Sınavdan 2 saat önce Bina Komisyonu ve salon başkanları brifingini yap', is_completed: false },
        { task: 'Emniyet kuryesinden sınav güvenlik poşetlerini ıslak imzalı tutanakla teslim al', is_completed: false },
        { task: 'Saat, metal dedektör ve salon numarataj kontrollerini tamamla', is_completed: false },
        { task: 'Sınav bitiminde salon evrak poşetlerini mühürleyip kuryeye teslim tutanağını imzala', is_completed: false }
      ],
      zaman_etiketi: 'Sınav Sabahı (T-2 Saat)',
      tarih_iso: null,
      ikon: '📝',
      renk: '#FEF08A',
      sesli_geribildirim: 'Bina sınav komisyonu güvenlik adımları ve kurye teslim protokolü ajandaya alındı.'
    };
  }

  // 1.3 DYK & Sosyal Etkinlikler Modülü
  if (
    text.includes('dyk') ||
    text.includes('destekleme yetiştirme') ||
    text.includes('e-kurs') ||
    text.includes('sosyal etkinlikler modülü')
  ) {
    return {
      id: `dyk_${Date.now()}`,
      baslik: 'DYK Kurs Onayları ve e-Kurs Puantajı',
      kategori: 'Öğrenci & Kurs İşleri',
      domain: 'EGITIM',
      mevzuat_notu: 'MEB Destekleme ve Yetiştirme Kursları e-Kılavuzu uyarınca ders onayları, öğrenci devam takibi ve ek ders katsayıları denetlenmelidir.',
      action_items: [
        { task: 'e-Kurs modülü üzerinden öğretmen ve derslik planlamasını doğrula', is_completed: false },
        { task: 'İlçe MEM onaylı haftalık DYK ders programı çıktısını al', is_completed: false },
        { task: 'Öğrenci devamsızlık defterlerini ve DYK yoklama föylerini arşivle', is_completed: false }
      ],
      zaman_etiketi: 'Dönemsel Kontrol',
      tarih_iso: null,
      ikon: '📚',
      renk: '#FEF08A',
      sesli_geribildirim: 'DYK kurs onayları ve e-Kurs denetim basamakları oluşturuldu.'
    };
  }

  // 1.4 Norm Kadro & Haftalık Ders Dağıtım Çizelgeleri
  if (
    text.includes('norm kadro') ||
    text.includes('ders dağıtım') ||
    text.includes('ders programı') ||
    text.includes('zümre öğretmenler kurulu')
  ) {
    return {
      id: `norm_${Date.now()}`,
      baslik: 'Norm Kadro & Haftalık Ders Programı',
      kategori: 'Yönetim & Kadro',
      domain: 'EGITIM',
      mevzuat_notu: 'Milli Eğitim Bakanlığına Bağlı Eğitim Kurumları Yönetici ve Öğretmenlerinin Norm Kadrolarına İlişkin Yönetmelik kuralları gözetilmelidir.',
      action_items: [
        { task: 'Şube ve ders yükü bazında branş ders saatlerini hesapla', is_completed: false },
        { task: 'MEBBİS Norm Kadro Modülü veri girişini ve doğruluğunu kontrol et', is_completed: false },
        { task: 'Öğretmenler kurulunda ders dağıtım çizelgelerini tebliğ et', is_completed: false }
      ],
      zaman_etiketi: 'Dönem Başı / Ekim',
      tarih_iso: null,
      ikon: '📋',
      renk: '#FEF08A',
      sesli_geribildirim: 'Norm kadro ve ders dağıtım kontrol listesi hazırlandı.'
    };
  }

  // =========================================================================
  // 2. AİLE HEKİMLİĞİ (ASM) & 112 / ACİL SAĞLIK MOTORU
  // =========================================================================

  // 2.1 ASM Gebe / Bebek İzlemi & Aşı Kaçırma / Negatif Performans
  if (
    text.includes('gebe izlem') ||
    text.includes('bebek izlem') ||
    text.includes('asm aşı') ||
    text.includes('negatif performans') ||
    text.includes('hyp tarama') ||
    (text.includes('aşı') && (text.includes('bebek') || text.includes('izlem') || text.includes('gebe') || text.includes('asm')))
  ) {
    return {
      id: `asm_izlem_${Date.now()}`,
      baslik: 'ASM Gebe/Bebek İzlemi & Aşı Takvimi',
      kategori: 'Aile Hekimliği / ASM',
      domain: 'SAGLIK',
      mevzuat_notu: 'Aile Hekimliği Ödeme ve Sözleşme Yönetmeliği gereği aşı ve izlemlerin vaktinde yapılmaması negatif performans puan kesintisine yol açar.',
      action_items: [
        { task: 'Kayıtlı hastanın aşı ve izlem aralığını Aile Hekimliği Bilgi Sistemi (AHBS) üzerinden kontrol et', is_completed: false },
        { task: 'Gelmeyen hasta veya velisiyle telefonla iletişime geçip davet et', is_completed: false },
        { task: 'Gelmemesi halinde aşı/izlem ret tutanağını imzalat veya tebligat gönder', is_completed: false },
        { task: 'HYP (Hastalık Yönetim Platformu) kronik hasta tarama verilerini sisteme işle', is_completed: false }
      ],
      zaman_etiketi: 'Haftalık İzlem Takvimi',
      tarih_iso: null,
      ikon: '🩺',
      renk: '#E0F2FE',
      sesli_geribildirim: 'ASM gebe-bebek izlem ve aşı koruma süreci tanımlandı. Negatif performans denetim adımları eklendi.'
    };
  }

  // 2.2 112 Acil & Ambulans Nöbet Devri / Narkotik İlaç Sayımı
  if (
    text.includes('112') ||
    text.includes('ambulans') ||
    text.includes('paramedik') ||
    text.includes('narkotik sayım') ||
    text.includes('yeşil reçete ilaç dolabı') ||
    text.includes('acil vaka formu')
  ) {
    return {
      id: `ems_shift_${Date.now()}`,
      baslik: '112 Nöbet Devri & Kırmızı Reçete Dolap Sayımı',
      kategori: 'Acil Sağlık Hizmetleri',
      domain: 'SAGLIK',
      mevzuat_notu: '112 Acil Sağlık Hizmetleri Yönetmeliği gereği nöbet devirlerinde yeşil/kırmızı reçeteli narkotik ampuller fiziksel sayılarak tutanak imzalanmalıdır.',
      action_items: [
        { task: 'Ambulans medikal çantasındaki narkotik ve psikotrop ampulleri fiziki say', is_completed: false },
        { task: 'Defibrilatör batarya testi, monitör ve aspiratör basınç kontrollerini yap', is_completed: false },
        { task: 'Oksijen tüpleri bar basıncını kontrol et ve nöbet devir defterini karşılıklı imzala', is_completed: false },
        { task: 'Kullanılan vaka formları ile sarf edilen ilaçların ASOS/KKM bildirimini yap', is_completed: false }
      ],
      zaman_etiketi: 'Nöbet Başlangıcı (08:00)',
      tarih_iso: null,
      ikon: '🚑',
      renk: '#CCFBF1',
      sesli_geribildirim: '112 acil ambulans devir teslim ve narkotik dolap kontrol listesi oluşturuldu.'
    };
  }

  // =========================================================================
  // 3. ARABULUCULUK, UZLAŞTIRMA & İCRA HUKUKU MOTORU
  // =========================================================================

  // 3.1 Arabuluculuk & Uzlaştırma (3+1 Hafta Yasal Süre)
  if (
    text.includes('arabulucu') ||
    text.includes('arabuluculuk') ||
    text.includes('uzlaştırma') ||
    text.includes('uzlaştırmacı') ||
    text.includes('ilk oturum tutanağı') ||
    text.includes('son tutanak')
  ) {
    const deadline = new Date(baseDate);
    deadline.setDate(deadline.getDate() + 21); // 3 hafta yasal süre
    deadline.setHours(17, 0, 0, 0);

    return {
      id: `mediat_${Date.now()}`,
      baslik: 'Arabuluculuk Süreci & Son Tutanak Kapanışı',
      kategori: 'Alternatif Uyuşmazlık Çözümü',
      domain: 'HUKUK',
      mevzuat_notu: '6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu: Dava şartı arabuluculukta yasal süre 3 haftadır (zorunlu hallerde en fazla 1 hafta uzatılabilir).',
      action_items: [
        { task: 'Taraflara ilk oturum davet mektubu ve bilgilendirme tutanağını tebliğ et', is_completed: false },
        { task: 'İlk oturum görüşmelerini gerçekleştirip oturum tutanağını imzalat', is_completed: false },
        { task: 'Anlaşma veya anlaşamama son tutanağını taraflarla birlikte tanzim et', is_completed: false },
        { task: 'Son tutanağı UYAP Arabulucu Portalı üzerinden sisteme yükleyip dosyayı kapat', is_completed: false }
      ],
      zaman_etiketi: '3 Hafta Yasal Süre (17:00)',
      tarih_iso: deadline.toISOString(),
      ikon: '⚖️',
      renk: '#E0E7FF',
      sesli_geribildirim: 'Arabuluculuk dosyası açıldı. 3 haftalık yasal takvim ve UYAP son tutanak adımları tanımlandı.'
    };
  }

  // 3.2 İcra Hukuku (Kıymet Takdiri, 103 Davetiyesi, Fiili Haciz, Satış)
  if (
    text.includes('kıymet takdiri') ||
    text.includes('kiymet takdiri') ||
    text.includes('103 davetiyesi') ||
    text.includes('fiili haciz') ||
    text.includes('satış ilanı') ||
    text.includes('icra dairesi')
  ) {
    return {
      id: `icra_${Date.now()}`,
      baslik: 'İcra Takibi: Kıymet Takdiri & Haciz İşlemleri',
      kategori: 'İcra ve İflas Hukuku',
      domain: 'HUKUK',
      mevzuat_notu: 'İİK m. 128/a uyarınca kesinleşen kıymet takdirinin geçerlilik süresi 2 yıldır; 2 yıl geçmeden satış istenmelidir.',
      action_items: [
        { task: 'Kıymet takdiri raporunun borçluya ve ilgililere tebliğini sağla', is_completed: false },
        { task: '7 günlük kıymet takdirine itiraz süresinin kesinleşmesini bekle', is_completed: false },
        { task: 'UYAP üzerinden fiili haciz yolluğu veya satış avansı yatır', is_completed: false },
        { task: 'Elektronik Satış Portalı (esatis.uyap.gov.tr) üzerinden ilan şartnamesini hazırla', is_completed: false }
      ],
      zaman_etiketi: 'Yasal İcra Takvimi',
      tarih_iso: null,
      ikon: '🏛️',
      renk: '#E0E7FF',
      sesli_geribildirim: 'İcra takibi ve kıymet takdiri adımları kaydedildi. 2 yıllık geçerlilik ve tebligat süreçleri başlatıldı.'
    };
  }

  // =========================================================================
  // 4. YEMİNLİ MALİ MÜŞAVİR (YMM) & BAĞIMSIZ DENETİM MOTORU
  // =========================================================================

  // 4.1 YMM KDV İadesi & Karşıt İnceleme Tutanakları
  if (
    text.includes('kdv iadesi') ||
    text.includes('karşıt inceleme') ||
    text.includes('karsit inceleme') ||
    text.includes('ymm tasdik') ||
    text.includes('yeminli mali müşavir')
  ) {
    return {
      id: `ymm_kdv_${Date.now()}`,
      baslik: 'KDV İadesi & Karşıt İnceleme Raporu (YMM)',
      kategori: 'YMM & Vergi Tasdiki',
      domain: 'MALIYE',
      mevzuat_notu: 'KDV Genel Uygulama Tebliği uyarınca alt mükellef karşıt inceleme tutanakları toplanarak YMM KDV İadesi Tasdik Raporu vergi dairesine teslim edilmelidir.',
      action_items: [
        { task: 'Alt mükellef karşıt inceleme talep yazılarını ve fatura dökümlerini hazırla', is_completed: false },
        { task: 'Gelen karşıt inceleme cevapları ile Ba-Bs ve KDV beyannamelerini çapraz doğrula', is_completed: false },
        { task: 'YMM KDV İadesi Tasdik Raporu metnini tanzim et ve e-İmza ile imzala', is_completed: false },
        { task: 'İnternet Vergi Dairesi (İVD) üzerinden raporu sisteme yükle ve vergi dairesine sevk et', is_completed: false }
      ],
      zaman_etiketi: 'Raporlama Dönemi',
      tarih_iso: null,
      ikon: '📊',
      renk: '#DCFCE7',
      sesli_geribildirim: 'YMM KDV iadesi ve karşıt inceleme süreci ajandaya eklendi. İVD onay basamakları kuruldu.'
    };
  }

  // 4.2 Bağımsız Denetim (KGK) & Çalışma Kağıtları
  if (
    text.includes('bağımsız denetim') ||
    text.includes('bagimsiz denetim') ||
    text.includes('kgk denetim') ||
    text.includes('çalışma kağıdı') ||
    text.includes('dipnot mutabakat')
  ) {
    return {
      id: `audit_${Date.now()}`,
      baslik: 'Bağımsız Denetim & KGK Çalışma Kağıtları',
      kategori: 'Denetim & Güvence',
      domain: 'MALIYE',
      mevzuat_notu: 'Türkiye Denetim Standartları (BDS) gereği denetim kanıtları çalışma kağıtlarında arşivlenmeli, finansal tablo dipnot mutabakatları tamamlanmalıdır.',
      action_items: [
        { task: 'Banka teyit mektupları (mutabakat) ve avukat teyit yazılarını topla', is_completed: false },
        { task: 'Stok sayım tutanağı ve maddi duran varlık amortisman kontrollerini yap', is_completed: false },
        { task: 'Bağımsız denetçi görüşü (Olumlu/Şartlı) taslağını ve dipnotları hazırla', is_completed: false },
        { task: 'Nihai Bağımsız Denetim Raporunu KGK ve KAP sistemine yükle', is_completed: false }
      ],
      zaman_etiketi: 'Yıl Sonu Denetim Takvimi',
      tarih_iso: null,
      ikon: '📑',
      renk: '#DCFCE7',
      sesli_geribildirim: 'Bağımsız denetim çalışma kağıtları ve KGK onay süreci kaydedildi.'
    };
  }

  // =========================================================================
  // 5. ZİRAAT, TARIM, BOTANİK & VETERİNER HEKİMLİK MOTORU
  // =========================================================================

  // 5.1 Zirai İlaçlama, Bitki Koruma & PHI Hasat Bekleme Süresi
  if (
    text.includes('ilaçlama') ||
    text.includes('ilaclama') ||
    text.includes('pestisit') ||
    text.includes('fungisit') ||
    text.includes('phi süresi') ||
    text.includes('kırmızı örümcek') ||
    text.includes('unlu bit') ||
    text.includes('zirai ilaç')
  ) {
    return {
      id: `ziraat_ilac_${Date.now()}`,
      baslik: 'Zirai İlaçlama & PHI Hasat Bekleme Protokolü',
      kategori: 'Bitki Koruma & İlaçlama',
      domain: 'ZIRAAT',
      mevzuat_notu: 'Bitki Koruma Ürünleri (BKÜ) Uygulama Usul ve Esasları uyarınca ilaçlama rüzgarsız havada (<10 km/s) yapılmalı, etiket üzerindeki PHI (hasat öncesi bekleme süresi) ve arıcı bilgilendirme kurallarına uyulmalıdır.',
      action_items: [
        { task: 'Meteoroloji 48 saatlik yağış ve rüzgar (<10 km/s) tahminini teyit et', is_completed: false },
        { task: 'A2P3 buhar maskesi, kimyasal tulum, koruyucu gözlük ve eldiven donanımını kuşan', is_completed: false },
        { task: 'İlaçlama suyu pH değerini (5.5 - 6.5) ayarla ve etiket dozunu aşma', is_completed: false },
        { task: 'Komşu arıcılara haber ver; etiket üzerindeki PHI bekleme süresini kaydet', is_completed: false },
        { task: 'Pülverizatör tankı ve memelerini uygulama bitiminde temiz suyla arındır', is_completed: false }
      ],
      zaman_etiketi: 'Sabah Serinliği 07:00 (Rüzgarsız)',
      tarih_iso: null,
      ikon: '🧪',
      renk: '#DCFCE7',
      sesli_geribildirim: 'Rüzgarsız hava şartı, İSG koruma donanımı ve PHI hasat bekleme takvimli zirai ilaçlama kartı açıldı.'
    };
  }

  // 5.2 Mevsimlik Budama & Bordo Bulamacı Protokolü
  if (
    text.includes('budama') ||
    text.includes('bordo bulamacı') ||
    text.includes('bordo bulamaci') ||
    text.includes('aşı macunu') ||
    text.includes('ardıç katranı') ||
    text.includes('ağaçları budadık')
  ) {
    return {
      id: `ziraat_budama_${Date.now()}`,
      baslik: 'Budama Dezenfeksiyonu & Bordo Bulamacı',
      kategori: 'Bahçe & Budama',
      domain: 'ZIRAAT',
      mevzuat_notu: 'Budama aletleri ağaçtan ağaca dezenfekte edilmeli, 2 cm üzerindeki kalın kesikler aşı macunuyla kapatılıp bakteri ve mantar girişine karşı Bordo Bulamacı (%1.5-2) uygulanmalıdır.',
      action_items: [
        { task: 'Budama aletlerini %10 çamaşır suyu veya alkolle dezenfekte et', is_completed: false },
        { task: 'Kuru, hastalıklı, obur ve içe gelişen dalları tırnak bırakmadan kes', is_completed: false },
        { task: '2 cm üzerindeki tüm kalın yaraları hava almayacak şekilde aşı macunuyla kapat', is_completed: false },
        { task: 'Budama biter bitmez gövdeye bakteri/mantar önleyici Bordo Bulamacı püskürt', is_completed: false },
        { task: 'Budanan hastalıklı dal artıklarını bahçeden uzaklaştırarak imha et', is_completed: false }
      ],
      zaman_etiketi: 'Budama Sonrası (İlk 48 Saat)',
      tarih_iso: null,
      ikon: '✂️',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Budama alet dezenfeksiyonu, yara aşı macunu ve Bordo Bulamacı adımları oluşturuldu.'
    };
  }

  // 5.3 ÇKS & TARSİM Tarım Sigortası
  if (
    text.includes('çks') ||
    text.includes('tarsim') ||
    text.includes('tarım sigortası') ||
    text.includes('çiftçi kayıt sistemi')
  ) {
    return {
      id: `tarsim_${Date.now()}`,
      baslik: 'ÇKS Dosya Yenileme & TARSİM Sigorta Poliçesi',
      kategori: 'Tarım & Destekleme',
      domain: 'ZIRAAT',
      mevzuat_notu: 'Tarım ve Orman Bakanlığı ÇKS Yönetmeliği uyarınca güncellenmeyen araziler mazot-gübre desteğinden faydalanamaz; TARSİM poliçeleri don/dolu riskine karşı son tarihe kadar onaylanmalıdır.',
      action_items: [
        { task: 'Tapu kayıtları ve kira sözleşmelerini Ziraat Odasından onaylat', is_completed: false },
        { task: 'İlçe Tarım Müdürlüğüne ÇKS başvuru dosyasını teslim et', is_completed: false },
        { task: 'TARSİM acentesinden ürün verim ve dolu/don risk teminat poliçesini kes', is_completed: false },
        { task: 'Doğal afet hasarı durumunda en geç 10 gün içinde TARSİM çağrı merkezine hasar ihbarı yap', is_completed: false }
      ],
      zaman_etiketi: 'Başvuru Dönemi (Mesai Bitimi)',
      tarih_iso: null,
      ikon: '🌾',
      renk: '#FEF3C7',
      sesli_geribildirim: 'ÇKS yenileme ve TARSİM sigorta protokolü oluşturuldu.'
    };
  }

  // 5.4 Veteriner Hekim & Hayvan Sağlığı Protokolleri
  const vetTask = parseVeterinaryIntent(rawText, baseDate);
  if (vetTask) {
    return {
      id: vetTask.id,
      baslik: vetTask.baslik,
      kategori: vetTask.kategori,
      domain: 'VETERINER',
      mevzuat_notu: vetTask.mevzuat_notu,
      action_items: vetTask.action_items,
      zaman_etiketi: vetTask.zaman_etiketi,
      tarih_iso: vetTask.tarih_iso,
      ikon: vetTask.ikon,
      renk: vetTask.renk,
      sesli_geribildirim: vetTask.sesli_geribildirim,
      anomali_notu: vetTask.anomali_notu
    };
  }

  // =========================================================================
  // 6. İSG (İŞ SAĞLIĞI VE GÜVENLİĞİ) & ŞANTİYE DENETİM MOTORU
  // =========================================================================

  // 6.1 İSG Uzmanı & İBYS Onaylı Defter / Ramak Kala
  if (
    text.includes('isg') ||
    text.includes('iş güvenliği') ||
    text.includes('ibys') ||
    text.includes('onaylı defter') ||
    text.includes('ramak kala') ||
    text.includes('risk analizi')
  ) {
    return {
      id: `isg_${Date.now()}`,
      baslik: 'İSG Tespit ve Öneri Defteri (İBYS) Kaydı',
      kategori: 'İş Sağlığı ve Güvenliği',
      domain: 'MUHENDISLIK',
      mevzuat_notu: '6331 sayılı İSG Kanunu m. 11 uyarınca sahada tespit edilen uygunsuzluklar noter onaylı Tespit ve Öneri Defterine yazılıp işverene tebliğ edilmelidir.',
      action_items: [
        { task: 'Saha denetim turunu tamamlayıp KKD (baret, emniyet kemeri, yelek) kullanımını fotoğrafla', is_completed: false },
        { task: 'Tespit edilen tehlikeleri ve ramak kala olaylarını İSG tutanağına geçir', is_completed: false },
        { task: 'Noter onaylı Tespit ve Öneri Defterine maddeleri yazıp işveren vekiline imzalat', is_completed: false },
        { task: 'İBYS (İş Sağlığı ve Güvenliği Bilgi Yönetim Sistemi) üzerinden dijital kaydı tamamla', is_completed: false }
      ],
      zaman_etiketi: 'Haftalık Saha Turu',
      tarih_iso: null,
      ikon: '🦺',
      renk: '#FEF3C7',
      sesli_geribildirim: 'İSG denetim ve onaylı defter süreci kaydedildi. Yasal iş güvenliği adımları aktif.'
    };
  }

  // 6.2 Yapı Denetim & Donatı Kabul Vizesi & Beton İzni
  if (
    text.includes('yapı denetim') ||
    text.includes('yapi denetim') ||
    text.includes('donatı vizesi') ||
    text.includes('demir teslim') ||
    text.includes('şantiye defteri') ||
    text.includes('hakediş onayı')
  ) {
    return {
      id: `struct_audit_${Date.now()}`,
      baslik: 'Demir Donatı Kabul Vizesi & Şantiye Günlüğü',
      kategori: 'Yapı Denetim & İnşaat',
      domain: 'MUHENDISLIK',
      mevzuat_notu: '4708 sayılı Yapı Denetimi Kanunu uyarınca donatı kontrol tutanağı yapı denetim mühendisi ve şantiye şefince imzalanmadan beton dökümüne izin verilemez.',
      action_items: [
        { task: 'Kolon, perde ve kiriş donatılarının statik projeye göre çap ve aralıklarını ölç', is_completed: false },
        { task: 'Paspayı elemanları, pilye ve etriye kıvrımlarını bizzat denetle', is_completed: false },
        { task: 'Donatı Kabul Tutanağını (Demir Vizesi) şantiye şefiyle karşılıklı imzala', is_completed: false },
        { task: 'Şantiye defterine günlük hava durumu, çalışan usta sayısı ve beton iznini kaydet', is_completed: false }
      ],
      zaman_etiketi: 'Beton Öncesi (Sabah)',
      tarih_iso: null,
      ikon: '🏗️',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Yapı denetim demir vizesi ve şantiye günlüğü protokolü kaydedildi.'
    };
  }

  // =========================================================================
  // 7. KAMU BÜROKRASİSİ, DEVLET MEMURU & KURUMSAL OFİS MOTORU
  // =========================================================================

  // 7.1 4734 Sayılı KİK 22/d Doğrudan Temin, TİF, TKYS ve MYS V2 Harcama Süreci
  if (
    text.includes('doğrudan temin') ||
    text.includes('dogrudan temin') ||
    text.includes('22/d') ||
    text.includes('22-d') ||
    text.includes('4734') ||
    text.includes('tkys') ||
    (text.includes('tif') && (text.includes('kes') || text.includes('taşınır') || text.includes('ambar'))) ||
    (text.includes('mys') && (text.includes('ödeme emri') || text.includes('harcama') || text.includes('malmüdürlüğü'))) ||
    (text.includes('piyasa fiyat') && text.includes('araştırma'))
  ) {
    return {
      id: `kamu_temin_${Date.now()}`,
      baslik: 'Doğrudan Temin (22/d) & TİF / MYS V2 Süreci',
      kategori: 'Mali Hizmetler & Satın Alma',
      domain: 'KAMU',
      mevzuat_notu: '4734 sayılı KİK m. 22/d uyarınca harcama talimatı, en az 3 teklifli piyasa fiyat araştırma tutanağı, Muayene ve Kabul Tutanağı, TKYS TİF belgesi ve MYS V2 Ödeme Emri Belgesi mevzuata eksiksiz bağlanmalıdır.',
      action_items: [
        { task: 'Harcama yetkilisinden onaylı Harcama Talimatını al ve en az 3 firmadan kaşeli piyasa teklif mektubu topla', is_completed: false },
        { task: 'Piyasa Fiyat Araştırma Tutanağını tanzim edip en uygun teklif sahibi firmayla alımı başlat', is_completed: false },
        { task: 'Mal veya hizmet tesliminde Muayene ve Kabul Komisyonu Tutanağını komisyon üyelerine ıslak imzalattır', is_completed: false },
        { task: 'Taşınır Kayıt ve Yönetim Sistemi (TKYS) üzerinden Taşınır İşlem Fişi (TİF) kes ve ambar kaydını tamamla', is_completed: false },
        { task: 'MYS V2 Harcama Yönetim Sistemi üzerinden Ödeme Emri Belgesi düzenleyip fatura aslıyla Malmüdürlüğü/Muhasebeye teslim et', is_completed: false }
      ],
      zaman_etiketi: 'Fatura & Hakediş Süresi',
      tarih_iso: null,
      ikon: '🗂️',
      renk: '#FEF9C3',
      sesli_geribildirim: '4734 KİK 22/d doğrudan temin, TİF ve MYS V2 ödeme emri basamakları sisteme işlendi.'
    };
  }

  // 7.2 CİMER & 3071 / 4982 Bilgi Edinme Yasal Süreci
  if (
    text.includes('cimer') ||
    text.includes('çimer') ||
    text.includes('bilgi edinme') ||
    text.includes('3071') ||
    text.includes('4982') ||
    (text.includes('dilekçe hakkı') && text.includes('kamu'))
  ) {
    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + 15); // 15 gün yasal süre
    targetDate.setHours(17, 0, 0, 0);

    return {
      id: `kamu_cimer_${Date.now()}`,
      baslik: 'CİMER & Bilgi Edinme Yasal Cevap Süreci',
      kategori: 'Halkla İlişkiler & Hukuk',
      domain: 'KAMU',
      mevzuat_notu: '4982 sayılı Bilgi Edinme Kanunu gereğince 15 gün, 3071 sayılı Dilekçe Hakkı Kanunu gereğince 30 gün içinde gerekçeli cevap verilmesi yasal zorunluluktur; gecikmeler idari soruşturma konusudur.',
      action_items: [
        { task: 'CİMER başvuru konusunu incele; gerekiyorsa ilk 3 iş günü içinde ilgili birim veya taşra teşkilatına ara yazı yaz', is_completed: false },
        { task: 'Alt birimden intikal eden bilgi, belge ve mevzuat dayanaklarını derleyerek gerekçeli cevap taslağını oluştur', is_completed: false },
        { task: 'Kişisel Verilerin Korunması Kanunu (KVKK) ve ticari sır teşkil eden bilgileri karart', is_completed: false },
        { task: 'Şube Müdürü parafı ve Makam Onayı ile CİMER sistemine cevabı yükleyip başvuruyu süresinde kapat', is_completed: false },
        { task: 'Vatandaşa sistem üzerinden bilgilendirme SMS/e-postası düştüğünü teyit et', is_completed: false }
      ],
      zaman_etiketi: 'Yasal Süre: 15 Gün (17:00)',
      tarih_iso: targetDate.toISOString(),
      ikon: '🏛️',
      renk: '#FEF9C3',
      sesli_geribildirim: 'CİMER ve Bilgi Edinme yasal cevap süreci başlatıldı. 15 günlük geri sayım devrede.'
    };
  }

  // 7.3 EBYS / Belgenet / DYS Günlü Evrak, Standart Dosya Planı (SDP) & Paraf Zinciri
  if (
    text.includes('ebys') ||
    text.includes('belgenet') ||
    text.includes('dys') ||
    text.includes('günlü evrak') ||
    text.includes('gunlu evrak') ||
    text.includes('acele yazı') ||
    text.includes('paraf zinciri') ||
    text.includes('standart dosya planı') ||
    text.includes('sdp')
  ) {
    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + 2); // Günlü evrak iç onay süresi
    targetDate.setHours(16, 30, 0, 0);

    return {
      id: `kamu_ebys_${Date.now()}`,
      baslik: 'EBYS Günlü & İvedi Evrak Parafı',
      kategori: 'Yazı İşleri & Evrak',
      domain: 'KAMU',
      mevzuat_notu: 'Resmi Yazışmalarda Uygulanacak Usul ve Esaslar Hakkında Yönetmelik uyarınca günlü/ivedi yazılarda teslim gününden önce iç paraf zinciri tamamlanmalı ve e-İmza ile tescil edilmelidir.',
      action_items: [
        { task: 'Yazı taslağını hazırlayıp Standart Dosya Planı (SDP) kodunu (Örn: 900-Özlük, 805-Bütçe) seç', is_completed: false },
        { task: 'Şef, Şube Müdürü ve Daire Başkanı hiyerarşik paraf zincirine sun', is_completed: false },
        { task: 'Ekli belgelerin (fiziki evrak, CD, cetvel) üst yazıya tam iliştirildiğini kontrol et', is_completed: false },
        { task: 'Nitelikli elektronik sertifika (e-İmza) ile nihai makam olurunu alıp giden evrak sayı/tarihini ver', is_completed: false },
        { task: 'Muhatap idareye veya UETS/KEP adresine teslim teyidini alarak arşive kaldır', is_completed: false }
      ],
      zaman_etiketi: 'İç Onay: Son 2 Gün (16:30)',
      tarih_iso: targetDate.toISOString(),
      ikon: '🖋️',
      renk: '#FEF9C3',
      sesli_geribildirim: 'EBYS günlü evrak ve paraf zinciri kaydedildi. e-İmza ve SDP basamakları hazır.'
    };
  }

  // 7.4 657 Sayılı DMK Sağlık Raporu, Tek Hekim Sınırı (10 Gün) & İzin Bildirimi
  if (
    (text.includes('sağlık raporu') || text.includes('saglik raporu') || text.includes('istirahat raporu') || text.includes('rapor aldım')) &&
    (text.includes('memur') || text.includes('kamu') || text.includes('dmk') || text.includes('amir') || text.includes('ebys'))
  ) {
    return {
      id: `kamu_rapor_${Date.now()}`,
      baslik: '657 DMK Sağlık Raporu & İzin İntikali',
      kategori: 'Özlük & İnsan Kaynakları',
      domain: 'KAMU',
      mevzuat_notu: 'Devlet Memurlarına Verilecek Hastalık Raporları ile Hastalık ve Refakat İznine İlişkin Yönetmelik gereği tek hekim raporu azami 10 gündür (yılda tek hekim 40 gün sınırı); rapor mesai bitimine kadar amire intikal ettirilmelidir.',
      action_items: [
        { task: 'Mesai başlangıç saatinde birim amirine sözlü ve mesaj yoluyla istirahat raporu bilgisini ver', is_completed: false },
        { task: 'EBYS veya kurum portalı üzerinden \'Sağlık İzni Talep Formu\' doldurarak rapor görselini sisteme yükle', is_completed: false },
        { task: 'Tek hekim raporu 10 günü, tek hekim yıllık toplamı 40 günü aşıyorsa Sağlık Kurulu Raporu zorunluluğunu gözet', is_completed: false },
        { task: 'Rapor bitiminde fiilen göreve başlama bildirimini özlük birimine teslim et', is_completed: false }
      ],
      zaman_etiketi: 'Mesai Başlangıcı (İvedi)',
      tarih_iso: null,
      ikon: '📋',
      renk: '#FEF9C3',
      sesli_geribildirim: '657 DMK sağlık raporu ve izin intikal adımları oluşturuldu.'
    };
  }

  // 7.5 657 Sayılı DMK Disiplin Soruşturması & 7 Günlük Yasal Savunma İstemi
  if (
    text.includes('disiplin soruşturması') ||
    text.includes('disiplin savunma') ||
    text.includes('savunma istem') ||
    text.includes('muhakkik') ||
    text.includes('disiplin amiri') ||
    text.includes('657 disiplin')
  ) {
    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + 7); // 7 gün savunma süresi
    targetDate.setHours(17, 0, 0, 0);

    return {
      id: `kamu_disiplin_${Date.now()}`,
      baslik: 'Disiplin Soruşturması & Yasal Savunma İstemi',
      kategori: 'Disiplin & Hukuk',
      domain: 'KAMU',
      mevzuat_notu: '657 sayılı DMK m. 130 uyarınca memura en az 7 gün süre verilmeden disiplin cezası verilemez. Savunma hakkı kısıtlanamaz; 7 gün içinde cevap verilmezse savunma hakkından vazgeçilmiş sayılır.',
      action_items: [
        { task: 'Savunma istem yazısının tebellüğ tarihini kaydet (7 günlük yasal süreyi başlat)', is_completed: false },
        { task: 'Soruşturma dosyasındaki iddia tutanaklarını, tanık ifadelerini ve delilleri bizzat incele', is_completed: false },
        { task: 'Hukuki ve somut delillere dayalı yazılı savunma dilekçesini hazırla', is_completed: false },
        { task: 'Disiplin amiri veya muhakkike savunmayı EBYS kaydıyla veya imza karşılığı teslim et', is_completed: false },
        { task: 'Disiplin cezası zamanaşımı sürelerini (öğrenmeden itibaren 1 ay, fiilden itibaren 2 yıl) denetle', is_completed: false }
      ],
      zaman_etiketi: 'Yasal Süre: 7 Gün (17:00)',
      tarih_iso: targetDate.toISOString(),
      ikon: '⚖️',
      renk: '#FEF9C3',
      sesli_geribildirim: '657 DMK disiplin soruşturması ve 7 günlük yasal savunma sayacı başlatıldı.'
    };
  }

  // 7.6 Sayıştay Denetimi, Teftiş Sorgusu & 30 Günlük Savunma Layihası
  if (
    text.includes('sayıştay') ||
    text.includes('sayistay') ||
    text.includes('denetçi sorgusu') ||
    text.includes('sorgu layihası') ||
    (text.includes('teftiş') && (text.includes('müfettiş') || text.includes('savunma') || text.includes('kamu zararı')))
  ) {
    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + 30); // 30 gün yasal süre
    targetDate.setHours(17, 0, 0, 0);

    return {
      id: `kamu_sayistay_${Date.now()}`,
      baslik: 'Sayıştay Sorgusu & Teftiş Savunma Layihası',
      kategori: 'Mali Denetim & Teftiş',
      domain: 'KAMU',
      mevzuat_notu: '6085 sayılı Sayıştay Kanunu uyarınca denetçi sorgularına tebliğden itibaren 30 gün içinde belgeli ve gerekçeli savunma layihası sunulması yasal zorunluluktur.',
      action_items: [
        { task: 'Sayıştay Denetçi Sorgusu veya Teftiş Raporundaki kamu zararı ve usulsüzlük iddialarını maddeler halinde çıkar', is_completed: false },
        { task: 'İddia edilen harcama kalemlerine ait kanıtlayıcı belgeleri (hakediş, ihale onayı, piyasa araştırması, mevzuat) derle', is_completed: false },
        { task: 'Sayıştay içtihatları ve Danıştay emsal kararları ışığında savunma layihası taslağını oluştur', is_completed: false },
        { task: 'Harcama Yetkilisi ve Gerçekleştirme Görevlisiyle müşterek savunma metnini parafe edip resmi yazıyla Sayıştay Dairesine ilet', is_completed: false }
      ],
      zaman_etiketi: 'Yasal Süre: 30 Gün (17:00)',
      tarih_iso: targetDate.toISOString(),
      ikon: '🏛️',
      renk: '#FEF9C3',
      sesli_geribildirim: 'Sayıştay denetçi sorgusu savunma layihası adımları oluşturuldu. 30 günlük yasal süre başlatıldı.'
    };
  }

  // 7.7 İK: 5510 Sayılı Kanun SGK İşe Giriş Bildirgesi (T-1 Gün Zorunluluğu) & Özlük
  if (
    text.includes('işe giriş') ||
    text.includes('ise giris') ||
    text.includes('sgk işe giriş') ||
    text.includes('5510 işe giriş') ||
    (text.includes('yeni çalışan') && text.includes('özlük'))
  ) {
    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + 1);
    targetDate.setHours(23, 59, 0, 0);

    return {
      id: `corp_sgk_in_${Date.now()}`,
      baslik: '5510 SGK İşe Giriş Bildirgesi (T-1 Gün Kuralı)',
      kategori: 'İnsan Kaynakları & Bordro',
      domain: 'KAMU',
      mevzuat_notu: '5510 sayılı Kanun m. 8 uyarınca sigortalı işe giriş bildirgesi çalışanın işe fiilen başlamasından en az 1 gün önce (T-1 gün) e-Bildirge üzerinden onaylanmalıdır; aksi takdirde asgari ücret tutarında idari para cezası kesilir.',
      action_items: [
        { task: 'KIRMIZI ALARM: İşe başlama tarihinden en az 1 gün önce e-Bildirge üzerinden SGK işe giriş bildirgesini onayla', is_completed: false },
        { task: 'İş sözleşmesi, KVKK açık rıza metni ve şirket iç yönetmeliğini adaya ıslak imzalattır', is_completed: false },
        { task: 'Sağlık raporu, adli sicil kaydı, diploma ve ikametgah evraklarını özlük klasörüne tak', is_completed: false },
        { task: 'Zimmet teslim tutanağıyla laptop, telefon, şirket kredi kartı ve giriş kartını teslim et', is_completed: false },
        { task: 'İşe giriş tarihinden 45 gün sonrasına \'Deneme Süresi Performans Değerlendirme\' hatırlatması kur', is_completed: false }
      ],
      zaman_etiketi: 'T-1 Gün Öncesi (23:59 Son)',
      tarih_iso: targetDate.toISOString(),
      ikon: '👥',
      renk: '#E0E7FF',
      sesli_geribildirim: '5510 SGK işe giriş bildirgesi T-1 gün zorunluluk uyarısıyla kaydedildi.'
    };
  }

  // 7.8 İK: SGK İşten Çıkış Bildirgesi (10 Gün Yasal Süre) & İbraname
  if (
    text.includes('işten çıkış') ||
    text.includes('isten cikis') ||
    text.includes('işten ayrılış bildirgesi') ||
    text.includes('istifa') ||
    text.includes('ibraname') ||
    (text.includes('tazminat bordrosu') && text.includes('çıkış'))
  ) {
    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + 10);
    targetDate.setHours(18, 0, 0, 0);

    return {
      id: `corp_sgk_out_${Date.now()}`,
      baslik: 'SGK İşten Çıkış Bildirgesi (10 Gün) & İbraname',
      kategori: 'İnsan Kaynakları & Bordro',
      domain: 'KAMU',
      mevzuat_notu: '5510 sayılı Kanun uyarınca sigortalı işten ayrılış bildirgesi fesih tarihinden itibaren 10 gün içinde verilmelidir; doğru fesih kodu ve ibraname imzalanması yasal güvencedir.',
      action_items: [
        { task: 'SGK e-Bildirge üzerinden 10 gün içinde uygun fesih koduyla işten ayrılış bildirgesini ver', is_completed: false },
        { task: 'BT ve idari işlerden zimmet iade formunu (bilgisayar, araç, kart vb.) ve kurumsal hesap iptalini tamamla', is_completed: false },
        { task: 'Kıdem tazminatı, ihbar tazminatı ve kullanılmayan yıllık izin ücreti bordrosunu hesaplayıp imzalat', is_completed: false },
        { task: 'İş Kanunu m. 19 uyarınca İbraname ve Çalışma Belgesini (Hizmet Belgesi) ıslak imzalı olarak özlük dosyasına kaldır', is_completed: false }
      ],
      zaman_etiketi: 'Yasal Süre: 10 Gün (18:00)',
      tarih_iso: targetDate.toISOString(),
      ikon: '👥',
      renk: '#E0E7FF',
      sesli_geribildirim: 'SGK işten ayrılış bildirgesi ve 10 günlük yasal süre protokolü oluşturuldu.'
    };
  }

  // 7.9 VIP Yönetici Ajandası, 30 Dk Tampon & T-2 Saat Brifing Dosyası
  if (
    text.includes('sekreter') ||
    text.includes('yönetici asistanı') ||
    text.includes('yonetici asistani') ||
    text.includes('vip brifing') ||
    text.includes('toplantı tamponu') ||
    text.includes('brifing dosyası') ||
    (text.includes('yönetici') && text.includes('ajanda'))
  ) {
    return {
      id: `corp_exec_${Date.now()}`,
      baslik: 'VIP Yönetici Ajandası & Brifing Protokolü',
      kategori: 'Yönetici Asistanlığı & Protokol',
      domain: 'KAMU',
      mevzuat_notu: 'Kurumsal protokol standardı: Arka arkaya üst düzey toplantılar arasına min. 30 dakika tampon konulmalı, brifing dosyası T-2 saat önce masaya sunulmalıdır.',
      action_items: [
        { task: 'Arka arkaya toplantılar arasına min. 30 dakika seyahat, toparlanma ve nefeslenme tamponu koy', is_completed: false },
        { task: 'Üst düzey görüşmeden 2 saat önce: Katılımcı özgeçmişleri, toplantı bilgi notu ve ikram teyidini sağla', is_completed: false },
        { task: 'Uçuşlu seyahatlerde T-24 saatte online check-in yap, VIP lounge ve havalimanı transferini teyit et', is_completed: false },
        { task: 'Toplantı bitiminde MoM (Minutes of Meeting - Toplantı Tutanağı) ve aksiyon sahipleri listesini ilgili yöneticilere dağıt', is_completed: false }
      ],
      zaman_etiketi: 'Toplantı Öncesi (T-2 Saat)',
      tarih_iso: null,
      ikon: '🗂️',
      renk: '#EDE9FE',
      sesli_geribildirim: 'VIP yönetici ajandası, 30 dakika toplantı tamponu ve brifing adımları hazırlandı.'
    };
  }

  // 7.10 Şirket Yönetim Kurulu (Board) Karar Defteri, Noter Onayı & TTSG
  if (
    text.includes('yönetim kurulu') ||
    text.includes('yonetim kurulu') ||
    text.includes('karar defteri') ||
    text.includes('yk kararı') ||
    text.includes('imza sirküleri') ||
    (text.includes('genel kurul') && text.includes('karar'))
  ) {
    return {
      id: `corp_board_${Date.now()}`,
      baslik: 'Yönetim Kurulu (Board) & Karar Defteri',
      kategori: 'Şirket Yönetimi & Hukuk',
      domain: 'KAMU',
      mevzuat_notu: 'Türk Ticaret Kanunu (TTK) uyarınca Yönetim Kurulu kararları noter tasdikli ciltli Karar Defterine yapıştırılıp üyelerce ıslak imzalanmalıdır; tescile tabi hususlar 15 gün içinde TTSG\'de ilan ettirilmelidir.',
      action_items: [
        { task: 'Toplantıdan en az 3-7 gün önce gündem maddelerini, sunumları ve finansal tabloları üyelere tebliğ et', is_completed: false },
        { task: 'Toplantı açılışında Hazirun Cetvelini (Katılımcı Listesi) ve toplantı nisabını kontrol et', is_completed: false },
        { task: 'Alınan kararları TTK ve şirket ana sözleşmesine uygun şekilde resmi karar metnine dönüştür', is_completed: false },
        { task: 'Noter onaylı Karar Defterine metni aktarıp tüm yönetim kurulu üyelerine ıslak imza attır', is_completed: false },
        { task: 'Tescile tabi kararlarda Ticaret Sicil randevusu alıp Türkiye Ticaret Sicili Gazetesi (TTSG) ilanını takip et', is_completed: false }
      ],
      zaman_etiketi: 'Toplantı Günü (15:00)',
      tarih_iso: null,
      ikon: '📜',
      renk: '#EDE9FE',
      sesli_geribildirim: 'Yönetim kurulu karar defteri, noter onayı ve TTSG tescil adımları hazırlandı.'
    };
  }

  return null;
}

