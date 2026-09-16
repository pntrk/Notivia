/**
 * Notivia Bilişsel Çıkarım Motoru: "Leb Demeden Leblebiyi Anlama" Senaryo Veritabanı
 * 
 * Kullanıcı 2-3 kelime ile devrik, eksik veya gündelik bir ifade söylese dahi:
 * 1. Derin niyet ve eylemi anında yakalar.
 * 2. Eksik tüm alanları (Özne, Nesne, Aksiyon, Zamanlama, Ön Hazırlık, Checklist) tamamlar.
 * 3. Kullanıcıya sıfır zahmetle profesyonel bir yaşam asistanı kartı oluşturur.
 */

export interface ShortScenarioMatch {
  id: string;
  category: 'resmi' | 'saglik' | 'ev_teknik' | 'arac_ulasim' | 'finans' | 'is_kariyer' | 'kisisel_yasam' | 'sosyal';
  keywords: string[]; // Eşleşecek mikro kelimeler ve kökler
  matcher?: (lower: string, words: string[]) => boolean;
  baslik: string;
  ikon: string;
  renk: string;
  varsayilanZaman: string;
  hazirlikZamani?: string;
  hazirlikSaatOncesi?: number;
  akilliFisilti: string;
  oncedenYapilacaklar: string[];
  tetikleyici?: {
    tip: 'finansal' | 'mekan' | 'kisi' | 'durum' | 'zincirleme';
    sart: string;
    etiket: string;
  };
}

export const SCENARIO_DATABASE: ShortScenarioMatch[] = [
  // 1. ARAÇ & ULAŞIM
  {
    id: 'arac_muayene',
    category: 'arac_ulasim',
    keywords: ['muayene', 'tüvtürk', 'tuvturk', 'muayenesi bitiyor', 'vize bitiyor'],
    baslik: 'TÜVTÜRK Araç Muayenesi',
    ikon: '🚗',
    renk: '#FEF3C7',
    varsayilanZaman: 'Randevu Alınacak',
    hazirlikZamani: 'Randevudan 2 Gün Önce',
    hazirlikSaatOncesi: 48,
    akilliFisilti: '🚗 Ceza veya MTV borcu olan araçlar muayeneye alınmaz.',
    oncedenYapilacaklar: [
      'MTV ve trafik cezası borcu sorgula (Borçsuzluk şart)',
      'Trafik sigortası poliçesi geçerlilik kontrolü',
      'Yangın tüpü, ilk yardım çantası ve 2 adet reflektör teyidi',
      'Far, sinyal, fren lambaları ve emniyet kemerleri testi'
    ]
  },
  {
    id: 'lastik_degisim',
    category: 'arac_ulasim',
    keywords: ['lastik', 'kışlık', 'yazlık lastik', 'balans', 'rot balans'],
    baslik: 'Mevsimlik Lastik Değişimi',
    ikon: '🛞',
    renk: '#FEF3C7',
    varsayilanZaman: 'Hafta Sonu 10:00',
    hazirlikZamani: 'Değişim Günü Sabah',
    hazirlikSaatOncesi: 3,
    akilliFisilti: '🛞 Şifreli bijon anahtarını yanınıza almayı unutmayın.',
    oncedenYapilacaklar: [
      'Şifreli bijon anahtarını torpidoya koy',
      'Lastik otelindeki lastiklerin kondisyonunu kontrol et',
      'Balans ayarı ve hava basınçlarını fabrika değerine ayarla',
      'Çıkarılan lastikleri poşetleyip tarih etiketi yapıştır'
    ]
  },
  {
    id: 'yag_bakim',
    category: 'arac_ulasim',
    keywords: ['yağ bakım', 'periyodik bakım', 'yağ değiş', 'filtreler değiş', '10 bin bakım'],
    baslik: '10.000 Km Araç Bakımı',
    ikon: '🛢️',
    renk: '#FEF3C7',
    varsayilanZaman: 'Cumartesi 09:30',
    hazirlikZamani: '1 Gün Önce 17:00',
    hazirlikSaatOncesi: 18,
    akilliFisilti: '🛢️ Araç kitapçığına uygun vizkozitede motor yağı seçilmelidir.',
    oncedenYapilacaklar: [
      'Motor yağı, yağ filtresi, hava ve polen filtresi temin et',
      'Fren balata kalınlıklarını ve hidrolik seviyesini kontrol ettir',
      'Servis bakım defterine veya uygulamaya kilometre kaydet',
      'Antifriz derece ölçümü yaptır'
    ]
  },
  {
    id: 'ucak_bilet',
    category: 'arac_ulasim',
    keywords: ['uçuş', 'uçak', 'biniş', 'checkin', 'check-in', 'havalimanı', 'havaalanı', 'pegasus', 'thy'],
    baslik: 'Uçak Seyahati & Uçuş',
    ikon: '✈️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Uçuş Günü',
    hazirlikZamani: 'Uçuştan 24 Saat Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '✈️ 24 saat kala online check-in açılır; koltuk seçmeyi unutmayın.',
    oncedenYapilacaklar: [
      'Online check-in yap ve biniş kartını telefona kaydet',
      'Kimlik kartı veya pasaportu çantanın ön gözüne koy',
      'Kabin bagajında 100ml üzeri sıvı bulunmadığından emin ol',
      'Uçuştan en az 2 saat önce terminalde olacak rota planı yap'
    ]
  },

  // 2. RESMİ & BÜROKRASİ
  {
    id: 'pasaport_islemi',
    category: 'resmi',
    keywords: ['pasaport', 'nüfus randevu', 'harç yatır', 'vize randevu'],
    baslik: 'Pasaport Başvuru Randevusu',
    ikon: '🛂',
    renk: '#E0F2FE',
    varsayilanZaman: 'Hafta İçi 10:00',
    hazirlikZamani: '1 Gün Önce 17:00',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '💡 Harç dekontu ve biyometrik fotoğraf olmadan başvuru alınmaz.',
    oncedenYapilacaklar: [
      'Harç ve defter bedelini banka/GİB üzerinden yatırıp dekont al',
      'Son 6 ayda çekilmiş 2 adet biyometrik fotoğraf hazırla',
      'T.C. Kimlik kartı ve varsa eski pasaportun aslını al',
      'Öğrenciysen öğrenci belgesi çıktısı al (Harç muafiyeti)'
    ]
  },
  {
    id: 'mufettis_denetim',
    category: 'resmi',
    keywords: ['müfettiş', 'denetmen', 'sayıştay', 'teftiş', 'vergi denetim', 'denetim'],
    baslik: 'Kurumsal Denetim Hazırlığı',
    ikon: '📁',
    renk: '#E0F2FE',
    varsayilanZaman: 'Denetim Günü 09:00',
    hazirlikZamani: '1 Gün Önce 16:00',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '📁 Denetim öncesi eksik imzalı evrak veya tutanak kalmamalıdır.',
    oncedenYapilacaklar: [
      'İmza sirküleri, karar defteri ve yetki belgelerini dosyala',
      'İlgili döneme ait muhasebe ve onaylı fatura klasörlerini çıkar',
      'Dijital veri yedeklerini harici diske aktar',
      'Toplantı odası ve evrak sunum alanını düzenle'
    ]
  },
  {
    id: 'tapu_devir',
    category: 'resmi',
    keywords: ['tapu', 'harç', 'webtapu', 'gayrimenkul devir', 'noter vekalet'],
    baslik: 'Tapu Devir & Noter İşlemi',
    ikon: '🏛️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Randevu Saati',
    hazirlikZamani: 'Randevu Günü Sabah',
    hazirlikSaatOncesi: 3,
    akilliFisilti: '🏛️ DASK poliçesi ve belediye rayiç bedel yazısı olmadan işlem yapılamaz.',
    oncedenYapilacaklar: [
      'Belediyeden rayiç bedel belgesi (borçsuzluk) al',
      'Güncel DASK (Deprem Sigortası) poliçesini kontrol et',
      'Tapu harcı SMS bildirimini ve döner sermaye ödemesini yap',
      'Alıcı ve satıcı T.C. kimlik asıllarını hazırla'
    ]
  },

  // 3. EV & TEKNİK
  {
    id: 'kombi_bar',
    category: 'ev_teknik',
    keywords: ['kombi', 'kombi bar', 'petek ısınmıyor', 'bar düştü', 'basınç düşük', 'kombi su'],
    baslik: 'Kombi Su Basınç Dengeleme',
    ikon: '🔧',
    renk: '#FEF3C7',
    varsayilanZaman: 'Hemen Kontrol',
    hazirlikZamani: 'Hemen',
    hazirlikSaatOncesi: 0,
    akilliFisilti: '🔧 İdeal basınç 1.2 - 1.5 Bar arasıdır; 1 bar altında kombi arızaya geçer.',
    oncedenYapilacaklar: [
      'Kombinin altındaki mavi/siyah doldurma musluğunu bul',
      'Musluğu yavaşça sola çevirerek ibreyi 1.5 bar çizgisine getir',
      'Doldurma musluğunu sıkıca kapatmayı unutma',
      'Peteklerin üst purjör vidasından hava tahliyesi yap'
    ]
  },
  {
    id: 'su_aritma_filtre',
    category: 'ev_teknik',
    keywords: ['filtre', 'arıtma', 'su filtresi', 'filtre değiştim', 'filtre değiştirdim', 'filtreyi değiştirdim'],
    baslik: 'Su Arıtma Filtre Değişimi',
    ikon: '💧',
    renk: '#E0F2FE',
    varsayilanZaman: 'Servis / Değişim',
    hazirlikZamani: 'Değişim Günü',
    akilliFisilti: '💧 İlk 15-20 litre su tortulardan arınması için doğrudan lavaboya akıtılmalıdır.',
    oncedenYapilacaklar: [
      'Ana su vanasını ve arıtma tank vanasını kapat',
      'Filtre kaplarını anahtarla gevşetip eski sediment/karbon filtreleri sök',
      'Yeni filtreleri sırasıyla takıp O-ring contaları sızdırmazlık için kontrol et',
      'İlk 3 tank suyu içmeden dökerek filtreyi durula'
    ]
  },
  {
    id: 'klima_temizlik',
    category: 'ev_teknik',
    keywords: ['klima', 'klima filtre', 'klima koku', 'klima soğutmuyor'],
    baslik: 'Klima Filtre & Sezon Bakımı',
    ikon: '❄️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Hafta Sonu',
    hazirlikZamani: 'Uygulama Öncesi',
    akilliFisilti: '❄️ Nemli filtreler bakteri üretir; tamamen kurumadan klimaya takmayın.',
    oncedenYapilacaklar: [
      'Ön kapağı kaldırıp toz filtrelerini dikkatlice çıkar',
      'Ilık su ve nötr sabunla yıkayıp gölgede kurut',
      'Evaporatör ızgaralarına klima dezenfektan sprey sık',
      'Dış ünite tahliye hortumunun tıkanık olmadığını kontrol et'
    ]
  },

  // 4. SAĞLIK & MEDİKAL
  {
    id: 'kan_tahlili',
    category: 'saglik',
    keywords: ['tahlil', 'kan ver', 'kan tahlili', 'aç karnına', 'check up', 'check-up', 'dahiliye'],
    baslik: 'Kan Tahlili & Açlık Takibi',
    ikon: '🩸',
    renk: '#F3E8FF',
    varsayilanZaman: 'Yarın 08:30',
    hazirlikZamani: 'Önceki Gece 22:00',
    hazirlikSaatOncesi: 11,
    akilliFisilti: '🩸 Doğru sonuç için en az 10-12 saat boyunca su hariç hiçbir şey tüketilmemelidir.',
    oncedenYapilacaklar: [
      'Akşam 22:00 itibarıyla yemek, çay, kahve ve sigarayı bırak',
      'Gece ve sabah sadece birkaç yudum sade su iç',
      'Sürekli kullanılan tansiyon/tiroid ilaçlarını doktora sorarak al',
      'Eski laboratuvar sonuçlarını e-Nabız üzerinden hazırla'
    ]
  },
  {
    id: 'dis_hekim',
    category: 'saglik',
    keywords: ['dişçi', 'diş hekim', 'dolgu', 'kanal tedavi', 'diş ağrısı', 'diş randevu'],
    baslik: 'Diş Hekimi Randevusu',
    ikon: '🦷',
    renk: '#F3E8FF',
    varsayilanZaman: 'Randevu Saati',
    hazirlikZamani: 'Randevudan 1 Saat Önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '🦷 Tedaviden 1 saat önce hafif bir şeyler yemek uyuşukluk öncesi faydalıdır.',
    oncedenYapilacaklar: [
      'Dişleri ve diş ipiyle arayüzleri özenle fırçala',
      'Varsa daha önce çekilmiş panoramik diş röntgenini yanına al',
      'Lokal anestezi ihtimaline karşı tok karnına git',
      'Düzenli kan sulandırıcı kullanıyorsan hekime önceden bildir'
    ]
  },
  {
    id: 'ilac_kullanim',
    category: 'saglik',
    keywords: ['antibiyotik', 'tok karnına', 'günde 2 kez', 'günde 3 kez', 'hap', 'reçete'],
    baslik: 'Düzenli İlaç / Antibiyotik Kürü',
    ikon: '💊',
    renk: '#F3E8FF',
    varsayilanZaman: 'Her Gün 09:00 - 21:00',
    hazirlikZamani: 'Doz Öncesi',
    akilliFisilti: '💊 Antibiyotiklerde saat aralıklarına (12 saatte bir) sadık kalmak direnci önler.',
    oncedenYapilacaklar: [
      'İlacı mutlaka yemekten 15-20 dk sonra bol suyla iç',
      'Doz saatleri için telefona 12 saatlik tekrarlayan alarm kur',
      'Kendini iyi hissetsen dahi kutu bitene kadar tedaviyi yarıda kesme',
      'Mide koruyucu gerekiyorsa sabah aç karnına al'
    ]
  },

  // 5. İŞ & KARİYER
  {
    id: 'is_gorusmesi',
    category: 'is_kariyer',
    keywords: ['mülakat', 'iş görüşmesi', 'iş mülakatı', 'ik görüşmesi', 'teknik mülakat'],
    baslik: 'İş Mülakatı & Sunum',
    ikon: '💼',
    renk: '#DCFCE7',
    varsayilanZaman: 'Mülakat Saati',
    hazirlikZamani: 'Görüşmeden 3 Saat Önce',
    hazirlikSaatOncesi: 3,
    akilliFisilti: '💼 Görüşme öncesi şirket hakkında en az 2 vizyon sorusu hazırlayın.',
    oncedenYapilacaklar: [
      'Şirketin son çeyrek hedeflerini, ürünlerini ve LinkedIn sayfasını incele',
      'Online görüşme ise kamera, kulaklık ve arka plan aydınlatmasını test et',
      'CV ve portfolyo dokümanlarını sekmede açık tut',
      'Mülakat sonunda soracağın 2-3 profesyonel soru hazırla'
    ]
  },
  {
    id: 'fatura_kes',
    category: 'finans',
    keywords: ['fatura kes', 'fatura kesilecek', 'e-arşiv', 'stopaj', 'hakediş'],
    baslik: 'E-Arşiv / Hakediş Faturası',
    ikon: '🧾',
    renk: '#DCFCE7',
    varsayilanZaman: 'Ay Sonu 16:00',
    hazirlikZamani: 'Fatura Öncesi',
    akilliFisilti: '🧾 Karşı tarafın güncel vergi dairesi ve unvan bilgilerini teyit edin.',
    oncedenYapilacaklar: [
      'Müşterinin güncel vergi no / TCKN ve unvanını kontrol et',
      'KDV oranı ve varsa tevkifat kodunu doğrula',
      'GİB e-Arşiv / entegratör portalından taslağı oluştur',
      'Faturayı imzalayıp PDF nüshasını muhasebeye ve müşteriye ilet'
    ]
  },

  // 6. SOSYAL & AİLE
  {
    id: 'veli_toplanti',
    category: 'sosyal',
    keywords: ['veli toplantı', 'veli toplantısı', 'okul toplantı', 'öğretmenle görüşme'],
    baslik: 'Okul Veli Toplantısı',
    ikon: '🎒',
    renk: '#FEF3C7',
    varsayilanZaman: 'Toplantı Saati',
    hazirlikZamani: '1 Gün Önce 18:00',
    hazirlikSaatOncesi: 20,
    akilliFisilti: '🎒 Çocuğunuzun ders durumu ve sosyal uyumuyla ilgili notlarınızı yanınıza alın.',
    oncedenYapilacaklar: [
      'Çocukla konuşup öğretmene iletmek istediği bir durum var mı sor',
      'Ders başarı çizelgesi ve devamsızlık durumunu e-Okul’dan incele',
      'Branş öğretmenlerine sorulacak özel soruları listele',
      'Toplantı saati için okul bahçesi park durumunu önceden hesaba kat'
    ]
  },
  {
    id: 'kuafor_randevu',
    category: 'kisisel_yasam',
    keywords: ['kuaför', 'berber', 'saç sakal', 'fön', 'saç kesim'],
    baslik: 'Berber / Kuaför Randevusu',
    ikon: '✂️',
    renk: '#FEF3C7',
    varsayilanZaman: 'Randevu Saati',
    hazirlikZamani: '30 Dk Önce',
    akilliFisilti: '✂️ İstediğiniz saç modelinin referans fotoğrafını önceden kaydedin.',
    oncedenYapilacaklar: [
      'Gitmeyi planladığın saç/sakal model görselini telefona kaydet',
      'Randevu saatinden 10 dk önce salonda olacak şekilde çık',
      'Nakit veya IBAN ödemesi için hazırlık yap'
    ]
  },
  {
    id: 'kargo_iade',
    category: 'kisisel_yasam',
    keywords: ['kargo', 'kargo iade', 'iade et', 'iade kodu', 'trendyol iade', 'amazon iade'],
    baslik: 'E-Ticaret Kargo İadesi',
    ikon: '📦',
    renk: '#F5F5F4',
    varsayilanZaman: 'Bugün / Yarın',
    hazirlikZamani: 'Evden Çıkmadan',
    akilliFisilti: '📦 İade kargo kodunun süresi dolmadan şubeye teslim edilmelidir.',
    oncedenYapilacaklar: [
      'Uygulamadan iade takip kodunu alıp ekran görüntüsü kaydet',
      'Ürünü orijinal kutusuna fatura çıktısıyla birlikte koy',
      'Kutuyu koli bandıyla sağlam şekilde bantla',
      'Kargo şubesinden teslim tesellüm fişi veya SMS onayı al'
    ]
  },
  {
    id: 'veteriner_asi',
    category: 'saglik',
    keywords: ['veteriner', 'kedi aşı', 'köpek aşı', 'kuduz aşısı', 'iç dış parazit', 'parazit damlası'],
    baslik: 'Veteriner & Aşı Takvimi',
    ikon: '🐾',
    renk: '#F3E8FF',
    varsayilanZaman: 'Randevu Saati',
    hazirlikZamani: '1 Saat Önce',
    akilliFisilti: '🐾 Aşı karnesi ve evcil hayvan çip numarasını yanınıza almayı unutmayın.',
    oncedenYapilacaklar: [
      'Evcil hayvan sağlık/aşı karnesini çantaya koy',
      'Taşıma çantasının (box) kilitlerini ve taban örtüsünü hazırla',
      'Aşı sonrası 24 saat halsizlik veya ateş takibi yap',
      'Sonraki karma/kuduz aşı tarihini karneden doğrula'
    ]
  },
  {
    id: 'abonelik_nakil',
    category: 'ev_teknik',
    keywords: ['abonelik iptal', 'internet nakil', 'elektrik açtır', 'doğalgaz açtır', 'su sayacı'],
    baslik: 'Abonelik & Sayaç İşlemleri',
    ikon: '💡',
    renk: '#FEF3C7',
    varsayilanZaman: 'İş Günü 10:00',
    hazirlikZamani: '1 Gün Önce',
    akilliFisilti: '💡 Eski abonenin son endeks fotoğrafı ve tesisat/sayaç numarası gereklidir.',
    oncedenYapilacaklar: [
      'Mevcut sayacın son endeks değerini fotoğrafla',
      'Kira kontratı veya tapu fotokopisini hazırla',
      'Eski güvence bedeli iadesi için IBAN numarasını not et',
      'DASK poliçe numarasını temin et (Elektrik/Gaz zorunluluğu)'
    ]
  },
  {
    id: 'dogum_gunu_hediye',
    category: 'sosyal',
    keywords: ['doğum günü', 'hediye al', 'yıldönümü', 'kutlama'],
    baslik: 'Doğum Günü & Hediye Hazırlığı',
    ikon: '🎁',
    renk: '#FCE7F3',
    varsayilanZaman: 'Kutlama Günü',
    hazirlikZamani: '3 Gün Önce',
    hazirlikSaatOncesi: 72,
    akilliFisilti: '🎁 Kargo gecikmelerine karşı hediyeyi en az 3 gün önceden temin edin.',
    oncedenYapilacaklar: [
      'Hediye siparişini teslimat süresini gözeterek erkenden ver',
      'Tebrik kartı veya hediye paketi hazırla',
      'Pasta veya restoran rezervasyonunu teyit et'
    ]
  }
];

/**
 * Kullanıcının söylediği 2-3 kelimelik kısa ve eksik ifadeleri
 * gelişmiş yaşam senaryolarıyla eşleştirip tam teşekküllü bir karta dönüştürür.
 */
export function matchShortScenario(text: string): ShortScenarioMatch | null {
  if (!text || text.trim().length === 0) return null;
  const lower = text.toLowerCase().trim();
  const words = lower.split(/\s+/);

  // 1. Doğrudan anahtar kelime eşleşmesi
  for (const scenario of SCENARIO_DATABASE) {
    if (scenario.matcher && scenario.matcher(lower, words)) {
      return scenario;
    }

    for (const kw of scenario.keywords) {
      if (lower.includes(kw)) {
        return scenario;
      }
    }
  }

  // 2. Kök kelime veya benzerlik araması
  for (const scenario of SCENARIO_DATABASE) {
    for (const kw of scenario.keywords) {
      const kwWords = kw.split(' ');
      if (kwWords.every(w => words.some(userWord => userWord.startsWith(w) || userWord.includes(w)))) {
        return scenario;
      }
    }
  }

  return null;
}
