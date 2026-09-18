// src/services/advancedProfessionEngine.ts

import type { ActionItem } from '../types/notivia.ts';
import type { ProfessionDomain } from '../types/domainThemes.ts';

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
  // 5. ZİRAAT, TARIM & VETERİNER HEKİMLİK MOTORU
  // =========================================================================

  // 5.1 ÇKS & TARSİM Tarım Sigortası
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
        { task: 'TARSİM acentesinden ürün verim ve dolu/don risk teminat poliçesini kes', is_completed: false }
      ],
      zaman_etiketi: 'Başvuru Dönemi (Mesai Bitimi)',
      tarih_iso: null,
      ikon: '🌾',
      renk: '#DCFCE7',
      sesli_geribildirim: 'ÇKS yenileme ve TARSİM sigorta protokolü oluşturuldu.'
    };
  }

  // 5.2 Veteriner Hekim & TÜRKVET Küpeleme / Aşılama
  if (
    text.includes('veteriner') ||
    text.includes('türkvet') ||
    text.includes('turkvet') ||
    text.includes('küpeleme') ||
    text.includes('kupeleme') ||
    text.includes('şap aşısı') ||
    text.includes('kuduz aşısı') ||
    text.includes('hayvan sevk')
  ) {
    return {
      id: `vet_${Date.now()}`,
      baslik: 'TÜRKVET Küpe Kaydı & Aşılama Takvimi',
      kategori: 'Veteriner & Hayvancılık',
      domain: 'ZIRAAT',
      mevzuat_notu: '5996 sayılı Kanun uyarınca yeni doğan buzağı/kuzular yasal süre içinde küpelenmeli, aşı kayıtları TÜRKVET veri tabanına işlenmelidir.',
      action_items: [
        { task: 'Yeni doğan yavruların kulak küpesi takımı ve eşgali kaydet', is_completed: false },
        { task: 'Şap/Brucella ve Kuduz koruyucu aşılarını uygula ve soğuk zincir kayıtlarını tut', is_completed: false },
        { task: 'İlçe Tarım TÜRKVET portalına küpe ve aşı seri numaralarını kaydet', is_completed: false },
        { task: 'İller arası hayvan nakli için Veteriner Sağlık Raporu (VSR) tanzim et', is_completed: false }
      ],
      zaman_etiketi: 'Saha Ziyareti (09:00)',
      tarih_iso: null,
      ikon: '🐄',
      renk: '#DCFCE7',
      sesli_geribildirim: 'Veteriner klinik ve TÜRKVET kayıt adımları sisteme işlendi.'
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

  return null;
}
