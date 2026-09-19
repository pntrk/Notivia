import type { ProfessionDomain } from '../types/domainThemes.ts';

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
  domain?: ProfessionDomain; // Eşleştiği mesleki veya yaşam alanı
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
    keywords: ['tapu', 'tapu harç', 'webtapu', 'gayrimenkul devir', 'tapu devri', 'tapu randevu'],
    baslik: 'Tapu Devir & Harç İşlemi',
    ikon: '🏛️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Randevu Saati',
    hazirlikZamani: 'Randevu Günü Sabah',
    hazirlikSaatOncesi: 3,
    akilliFisilti: '🏛️ Tapu harcını alıcı ve satıcı eşit öder; güncel DASK poliçesi ve belediye rayiç bedel yazısı olmadan işlem yapılamaz.',
    oncedenYapilacaklar: [
      'Belediyeden rayiç bedel belgesi (emlak borçsuzluk yazısı) al',
      'Güncel DASK (Deprem Sigortası) poliçesini kontrol et',
      'GİB üzerinden tapu harcı SMS bildirimini ve döner sermaye ödemesini yap',
      'Alıcı ve satıcı fotoğraflı T.C. kimlik asıllarını hazırla'
    ]
  },
  {
    id: 'ehliyet_yenileme',
    category: 'resmi',
    keywords: ['ehliyet', 'sürücü belgesi', 'ehliyet yenile', 'ehliyet randevu', 'yeni tip ehliyet'],
    baslik: 'Ehliyet Yenileme Başvurusu',
    ikon: '🪪',
    renk: '#E0F2FE',
    varsayilanZaman: 'Randevu Günü 10:00',
    hazirlikZamani: '1 Gün Önce 16:00',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '🪪 Sağlık raporu (Sürücü olur) ve harç/vakıf payı dekontu olmadan randevuda işlem yapılmaz.',
    oncedenYapilacaklar: [
      'Aile hekiminden e-Rapor formatında "Sürücü Olur" sağlık raporu al',
      'Vergi dairesi harç ve Polis Teşkilatı Vakıf payını banka/GİB üzerinden ödeyip dekont al',
      'Son 6 ayda çekilmiş 1 adet biyometrik fotoğraf hazırla',
      'Mevcut eski ehliyet ve T.C. Kimlik kartının aslını çantaya koy'
    ]
  },
  {
    id: 'noter_islem',
    category: 'resmi',
    keywords: ['noter', 'vekalet', 'vekaletname', 'araç satış noter', 'noter randevu', 'noterde'],
    baslik: 'Noter İşlemi & Vekaletname',
    ikon: '🏛️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Hafta İçi 11:00',
    hazirlikZamani: '1 Saat Önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '🏛️ Araç satışında alıcı ve satıcı T.C. kimlik aslı ve tescil belgesi (ruhsat) olmadan işlem yapılamaz.',
    oncedenYapilacaklar: [
      'Vekalet verilecek kişinin T.C. Kimlik no ve doğru unvan/ad-soyad bilgilerini teyit et',
      'Fotoğraflı T.C. Kimlik kartı asıllarını hazırla',
      'Araç satışı ise ruhsat ve plaka borçsuzluk durumunu kontrol et',
      'Noter masrafları ve harç ödemesi için nakit veya banka kartı hazır bulundur'
    ]
  },
  {
    id: 'nobet_gorevi',
    category: 'resmi',
    keywords: ['nöbet', 'okul nöbeti', 'hastane nöbeti', 'öğretmen nöbet', 'nöbetçi öğretmen', 'nöbetçiyim', 'kat nöbeti'],
    baslik: 'Nöbet Görevi & Çizelge',
    ikon: '📋',
    renk: '#E0F2FE',
    varsayilanZaman: 'Nöbet Günü 08:00',
    hazirlikZamani: 'Önceki Akşam 20:00',
    hazirlikSaatOncesi: 12,
    akilliFisilti: '📋 Nöbet başlangıcında nöbet defterinin imzalanması ve acil durum anahtarlarının teslim alınması şarttır.',
    oncedenYapilacaklar: [
      'Nöbet defterini idareden alıp gün başı imzasını at',
      'Kat/blok ve bahçe giriş-çıkış güvenlik kontrollerini sağla',
      'İlk yardım dolabı ve acil durum çıkış kapılarının açık olduğunu teyit et',
      'Nöbet bitiminde vukuat ve teslim tutanağını doldurup imzala'
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
  },
  {
    id: 'ev_tasinma',
    category: 'ev_teknik',
    keywords: ['taşınma', 'ev taşıma', 'nakliye', 'nakliyat', 'yeni eve taşın', 'koli yap', 'kiralık eve çık'],
    baslik: 'Ev Taşıma & Nakliyat Planı',
    ikon: '📦',
    renk: '#FEF3C7',
    varsayilanZaman: 'Taşınma Günü 08:30',
    hazirlikZamani: '3 Gün Önce 10:00',
    hazirlikSaatOncesi: 72,
    akilliFisilti: '📦 Yeni adrese geçtikten sonra 20 iş günü içinde e-Devletten adres beyanı yapılması kanuni zorunluluktur.',
    oncedenYapilacaklar: [
      'Kırılacak cam ve porselenleri havalı naylonla sarıp kolileri etiketle',
      'Eski evin elektrik, su ve doğalgaz aboneliklerini son endeksle kapattırıp depozito iadesi talep et',
      'İnternet ve TV servis sağlayıcısına yeni adres nakil randevusu oluştur',
      'Taşınmadan sonra 20 iş günü içinde Nüfus/e-Devlet üzerinden adres değişikliği bildirimi yap'
    ]
  },
  {
    id: 'kira_sozlesmesi',
    category: 'finans',
    keywords: ['kira kontratı', 'kira sözleşmesi', 'depozito', 'tüfe kira artış', 'ev kiralama'],
    baslik: 'Kira Sözleşmesi & Depozito',
    ikon: '🏠',
    renk: '#E0F2FE',
    varsayilanZaman: 'Sözleşme Günü',
    hazirlikZamani: '1 Gün Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '🏠 Yasa gereği kira ödemelerinin banka kanalıyla ve açıklama belirtilerek yapılması zorunludur.',
    oncedenYapilacaklar: [
      'TÜFE 12 aylık ortalamayı kontrol ederek yasal tavan kira artış oranını hesapla',
      'Evdeki mevcut hasar, kombi ve demirbaşların fotoğraflı teslim tutanağını hazırla',
      'Depozito tutarını ve iade koşullarını sözleşmeye madde olarak ekle',
      'Kira ödemelerini bankadan açıklama kısmına ay belirterek transfer et'
    ]
  },
  {
    id: 'schengen_vize',
    category: 'resmi',
    keywords: ['vize', 'schengen', 'vize randevu', 'vfs', 'idata', 'konsolosluk', 'pasaport vize'],
    baslik: 'Vize Başvuru & Dosya Hazırlığı',
    ikon: '🇪🇺',
    renk: '#E0F2FE',
    varsayilanZaman: 'Randevu Saati',
    hazirlikZamani: '3 Gün Önce 14:00',
    hazirlikSaatOncesi: 72,
    akilliFisilti: '🇪🇺 Banka hesap dökümünün randevu tarihinden en fazla 7-10 gün önce ıslak imza/kaşeyle alınması gerekir.',
    oncedenYapilacaklar: [
      'Son 3 aylık kaşeli ve ıslak imzalı banka hesap dökümü ile imza sirkülerini al',
      'Uçak ve otel rezervasyonlarının barkodlu dökümlerini dosyaya ekle',
      'En az 30.000 € teminatlı Seyahat Sağlık Sigortası poliçesini hazırla',
      'e-Devletten barkodlu SGK hizmet dökümü ve iş yeri izin yazısını al'
    ]
  },
  {
    id: 'arac_kasko_sigorta',
    category: 'arac_ulasim',
    keywords: ['kasko', 'trafik sigortası', 'sigorta yenile', 'hasarsızlık indirim', 'poliçe yenile'],
    baslik: 'Kasko & Trafik Sigortası Yenileme',
    ikon: '🛡️',
    renk: '#FEF3C7',
    varsayilanZaman: 'Poliçe Bitiş Günü 11:00',
    hazirlikZamani: '3 Gün Önce',
    hazirlikSaatOncesi: 72,
    akilliFisilti: '🛡️ Zorunlu trafik sigortası gecikmelerinde her ay için %5 gecikme zammı uygulanır.',
    oncedenYapilacaklar: [
      'Hasarsızlık indirim kademesini (1-8. basamak) teyit et ve çoklu teklif al',
      'Kasko poliçesinde ikame araç sınıfını ve orijinal cam muafiyetini kontrol et',
      'Eski poliçenin bittiği gün saat 12:00 olmadan yeni poliçeyi onaylat',
      'Poliçe PDF kopyasını torpido ve telefona kaydet'
    ]
  },
  {
    id: 'arac_kis_antifriz',
    category: 'arac_ulasim',
    keywords: ['antifriz', 'kış hazırlığı araba', 'silecek suyu', 'cam suyu', 'kışlık bakım'],
    baslik: 'Kışlık Araç & Antifriz Hazırlığı',
    ikon: '❄️',
    renk: '#FEF3C7',
    varsayilanZaman: 'Hafta Sonu 11:00',
    hazirlikZamani: 'Öncesinde',
    akilliFisilti: '❄️ Saf su eklemek antifriz derecesini düşürür; motor bloğu çatlamasını önlemek için dereceyi en az -25°C tutun.',
    oncedenYapilacaklar: [
      'Bomometre ile radyatör antifriz koruma derecesini ölçtür (en az -25°C)',
      'Silecek haznesine donmayan -20°C kışlık cam suyu doldur',
      'Silecek lastiklerinin cama yapışıp yırtılmadığını kontrol et',
      'Bagaja çekme halatı, buz kazıyıcı ve takoz koy'
    ]
  },
  {
    id: 'bebek_cocuk_asi',
    category: 'saglik',
    keywords: ['bebek aşı', 'çocuk aşı', 'aile hekimi aşı', 'rotavirüs', 'menenjit', 'bebek aşı takvimi'],
    baslik: 'Bebek / Çocuk Aşı Takibi',
    ikon: '👶',
    renk: '#F3E8FF',
    varsayilanZaman: 'Aşı Günü 09:30',
    hazirlikZamani: '1 Gün Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '👶 Özel aşılar (rotavirüs/menenjit) soğuk zincirle taşınmalı; aşı kartı mutlaka yanınızda olmalıdır.',
    oncedenYapilacaklar: [
      'Sağlık ocağı / hastane aşı kartını çantaya koy',
      'Özel aşı ise eczaneden soğuk zincir buz aküsüyle teslim al',
      'Aşı sonrası olası ateş için doktor önerili parasetamol şurubu hazır bulundur',
      'Aşı yapılan kola/bacağa o gün su değdirmemeye özen göster'
    ]
  },
  {
    id: 'osym_sinav_hazirlik',
    category: 'resmi',
    keywords: ['yks', 'kpss', 'ales', 'ehliyet sınavı', 'ösym sınavı', 'sınav giriş belgesi', 'msü'],
    baslik: 'ÖSYM / Resmi Sınav Hazırlığı',
    ikon: '📝',
    renk: '#E0F2FE',
    varsayilanZaman: 'Sınav Günü 08:45',
    hazirlikZamani: '1 Gün Önce 18:00',
    hazirlikSaatOncesi: 15,
    akilliFisilti: '📝 Sınav binalarına girişler 10:00 itibarıyla kapatılır; fotoğraflı T.C. kimlik kartı aslı zorunludur.',
    oncedenYapilacaklar: [
      'ÖSYM / MEB Sınav Giriş Belgesini barkodlu ve fotoğraflı olarak yazdır',
      'Fotoğraflı T.C. Kimlik Kartının aslını hazırla (Sürücü belgesi geçerli değildir)',
      'Metal toka, takı, saat veya elektronik eşyaları evde bırak',
      'En geç 09:30’da sınav binasında olacak şekilde ulaşım planı yap'
    ]
  },
  {
    id: 'goz_muayenesi',
    category: 'saglik',
    keywords: ['göz randevu', 'göz muayenesi', 'gözlük', 'kontakt lens', 'göz doktoru'],
    baslik: 'Göz Muayenesi & Reçete',
    ikon: '👓',
    renk: '#F3E8FF',
    varsayilanZaman: 'Randevu Saati',
    hazirlikZamani: '24 Saat Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '👓 Damlalı göz dibi taraması sonrası 4-6 saat bulanık görme ve ışık hassasiyeti oluşacağından araçla gitmeyiniz.',
    oncedenYapilacaklar: [
      'Kontakt lens kullanıyorsan kornea şeklinin dinlenmesi için 24 saat önceden çıkarıp gözlük tak',
      'Güneş gözlüğünü yanına al (Damlalı muayene sonrası ışık hassasiyeti için)',
      'Mevcut kullandığın gözlük ve eski reçeteni hekime göstermek üzere al',
      'Muayene sonrası araç kullanmamak üzere toplu taşıma veya refakatçi planla'
    ]
  },
  {
    id: 'mtv_vergi_odeme',
    category: 'finans',
    keywords: ['mtv öde', 'vergi öde', 'motorlu taşıtlar vergisi', 'gelir vergisi', 'yapılandırma taksit'],
    baslik: 'MTV / Vergi Taksiti Ödemesi',
    ikon: '💳',
    renk: '#DCFCE7',
    varsayilanZaman: 'Son Gün 14:00',
    hazirlikZamani: '2 Gün Önce',
    hazirlikSaatOncesi: 48,
    akilliFisilti: '💳 Vergi ödemelerinde son gün sistem tıkanıklığı yaşamamak adına işlemi erkenden tamamlayın.',
    oncedenYapilacaklar: [
      'GİB İnteraktif Vergi Dairesi üzerinden güncel tahakkuk tutarını sorgula',
      'Bankaların kredi kartı ücretsiz taksit kampanyalarını kontrol et',
      'Ödeme sonrası sistemden barkodlu tahsilat makbuzunu PDF olarak indir',
      'Araç satış veya muayene öncesi borçsuzluk durumunu teyit et'
    ]
  },
  {
    id: 'ev_ilaclama_temizlik',
    category: 'ev_teknik',
    keywords: ['böcek ilaçlama', 'haşere', 'ilaçlama', 'derin temizlik', 'koltuk yıkama'],
    baslik: 'Ev İlaçlama & Derin Temizlik',
    ikon: '🧹',
    renk: '#FEF3C7',
    varsayilanZaman: 'Uygulama Günü 10:00',
    hazirlikZamani: '1 Saat Önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '⚠️ İlaçlama esnasında açıkta hiçbir gıda veya evcil hayvan maması bırakılmamalı; ev en az 2 saat terk edilmelidir.',
    oncedenYapilacaklar: [
      'Mutfaktaki açık gıdaları, tabakları ve evcil hayvan mama kaplarını dolaplara kapat',
      'Uygulama bittikten sonra evi en az 2 saat boş bırak ve evcil hayvanları uzak tut',
      'Dönüşte tüm pencereleri açarak en az 1 saat cereyanlı havalandırma yap',
      'Mutfak tezgahı ve yemek masası yüzeylerini sabunlu bezle sil'
    ]
  },

  // 7. BOTANİK & BİTKİ BAKIMI (Şiveye Duyarlı ve Botanik Zekalı)
  {
    id: 'cicek_sulama_genel',
    category: 'ev_teknik',
    keywords: [
      'suvar', 'suvarıver', 'suvarıve', 'verive gari', 'sulayuver', 'sulayıver', 'sulayıve',
      'çiçee su', 'çiçeğe su', 'çiçek sula', 'çiçekleri sula', 'boynunu bükmüş',
      'çiçekler susamış', 'saksının dibi', 'saksı sula', 'su sal', 'çiçek sulama'
    ],
    baslik: 'Akşam Çiçek Sulama',
    ikon: '🪴',
    renk: '#DCFCE7',
    varsayilanZaman: 'Bugün 19:30',
    hazirlikZamani: 'Öğle Güneşi Sonrası',
    hazirlikSaatOncesi: 0,
    akilliFisilti: '🪴 Güneş yaprakları yakmasın diye sulama akşam 19:30 serinliğine kuruldu.',
    oncedenYapilacaklar: [
      'Doğrudan saksı toprağına dök, yapraklara ve çiçeklere su değdirme',
      'Kök çürümesini önlemek için saksı altlığında biriken suyu 15 dk sonra dök',
      'Oda sıcaklığında dinlenmiş kireçsiz su kullan',
      'Toprağın üst yüzeyi hafif kurudukça sulama döngüsünü tekrarla'
    ]
  },
  {
    id: 'orkide_bakim',
    category: 'ev_teknik',
    keywords: ['orkide', 'orkide sula', 'orkide bakımı', 'orkide sulama'],
    baslik: 'Sabah Orkide Sulama',
    ikon: '🌸',
    renk: '#DCFCE7',
    varsayilanZaman: 'Yarın 09:30',
    hazirlikZamani: 'Sabah 09:00',
    hazirlikSaatOncesi: 0,
    akilliFisilti: '🌸 Orkide gece kök mantarı yapar; sulamayı asla akşama bırakmayın, sabah 09:30 en idealidir.',
    oncedenYapilacaklar: [
      'Şeffaf saksıyı 10-15 dk dinlenmiş oda sıcaklığındaki ılık suda beklet (daldırma yöntemi)',
      'Saksıdaki fazla suyu tamamen süzdürerek altlığa yerleştir',
      'Doğrudan yakıcı güneş almayan aydınlık bir pencere önüne koy',
      'Kökler yeşilden gümüşi griye döndüğünde yeniden sula'
    ]
  },
  {
    id: 'sardunya_petunya_bakim',
    category: 'ev_teknik',
    keywords: ['sardunya', 'petunya', 'balkon çiçeği', 'balkon çiçekleri'],
    baslik: 'Akşam Sardunya Bakımı',
    ikon: '🌺',
    renk: '#DCFCE7',
    varsayilanZaman: 'Bugün 19:30',
    hazirlikZamani: 'Akşam Serinliği',
    hazirlikSaatOncesi: 0,
    akilliFisilti: '🌺 Sardunyalar öğle güneşinde sulanırsa haşlanır; akşam 19:30 serinliği idealdir.',
    oncedenYapilacaklar: [
      'Güneş tamamen çekildikten sonra kök boğazına su ver',
      'Kurumuş çiçek başlarını ve sararmış yaprakları kopar',
      'Saksı tabağındaki fazla suyu dök'
    ]
  },
  {
    id: 'kaktus_sukulent_bakim',
    category: 'ev_teknik',
    keywords: ['kaktüs', 'kaktus', 'sukulent', 'paşa kılıcı', 'pasa kilici', 'barış çiçeği', 'baris cicegi'],
    baslik: 'Kaktüs & Sukulent Bakımı',
    ikon: '🌵',
    renk: '#DCFCE7',
    varsayilanZaman: 'Sabah 10:00',
    hazirlikZamani: 'Sabah',
    hazirlikSaatOncesi: 0,
    akilliFisilti: '🌵 Kaktüs ve sukulentler 2-3 haftada bir ve mutlaka sabah saatinde sulanmalıdır.',
    oncedenYapilacaklar: [
      'Toprağın tamamen kuruduğundan emin olmadan su verme',
      'Oda sıcaklığında bekletilmiş kireçsiz su kullan',
      'Gövdeye su değdirmeden yalnızca toprağı nemlendir',
      'Saksı altlığında su bekletme'
    ]
  },

  // 8. KUAFÖR, GÜZELLİK & KİŞİSEL BAKIM MOTORU (HAIR SALON & BEAUTY)
  {
    id: 'kuafor_dip_acma',
    category: 'is_kariyer',
    keywords: ['dip açma', 'açıcı', 'dip boya', 'oryal', 'saç açma', 'dip açıcı', 'platin açma'],
    baslik: 'Dip Açma & Nötralizasyon',
    ikon: '💇‍♀️',
    renk: '#FDF2F8',
    varsayilanZaman: 'Bugün 15:45',
    hazirlikZamani: 'Bugün 15:25 (Elastikiyet Kontrolü)',
    hazirlikSaatOncesi: 0.33,
    akilliFisilti: '💇‍♀️ 30 volüm açıcı hassas saçta 35 dakikayı aşarsa saç kopabilir; 15. dakikada elastikiyet testi şarttır.',
    oncedenYapilacaklar: [
      '15. dakika: Ense ve şakaktan tutam çekerek saçın elastikiyetini ve sararma tonunu kontrol et',
      '35. dakika: Açıcıyı bekletmeden lavaboya al, ılık suyla tamamen durula ve mor şampuanla tonla',
      'Dip ton açıldıktan sonra saç yapısını onarmak için pleks/keratin bakım maskesi uygula',
      'Sonraki randevulu müşteri için tezgahı temizle, fırça ve tarakları dezenfekte et'
    ]
  },
  {
    id: 'kuafor_keratin_fon',
    category: 'is_kariyer',
    keywords: ['keratin bakım', 'keratin botoks', 'brezilya fönü', 'kalıcı fön'],
    baslik: 'Keratin Bakım & Pres',
    ikon: '✨',
    renk: '#FDF2F8',
    varsayilanZaman: 'Bugün 16:30',
    hazirlikZamani: 'İşlem Öncesi Arındırma',
    akilliFisilti: '✨ Keratin uygulamasında saç tuzsuz şampuanla 2 kez yıkanıp %100 kurutulmalıdır.',
    oncedenYapilacaklar: [
      'Arındırıcı (clarifying) tuzsuz şampuan ile saç pullarını aç',
      'Keratini diplere değdirmeden ince tutamlar halinde eşit sür',
      '20-30 dakika bekleme süresi sonrası fön çekip 230°C titanyum presle mühürle',
      'Müşteriye 48 saat saçı bağlamaması ve ıslatmaması uyarısını ilet'
    ]
  },

  // 9. OTOMOTİV & MEKANİK ACİL DURUM (BATARYA, BALATA, AKÜ)
  {
    id: 'oto_aku_degisim',
    category: 'arac_ulasim',
    keywords: ['akü bitti', 'akü bitti araba', 'akü takviye', 'marş basmıyor', 'akü değişimi', 'akü aldım'],
    baslik: 'Akü Takviye & Değişim',
    ikon: '🔋',
    renk: '#FEF3C7',
    varsayilanZaman: 'Hemen',
    hazirlikZamani: 'Takviye Öncesi',
    akilliFisilti: '🔋 Takviyede önce kırmızı (+) kutup, sonra siyah (-) şasi kutbu bağlanır.',
    oncedenYapilacaklar: [
      'Kırmızı kabloyu (+) kutuplara, siyah kabloyu verici araç (-) ve alıcı araç motor şasisine bağla',
      'Çalıştırdıktan sonra kabloları ters sırayla çıkar',
      'Yeni akü takıldıysa radyo kodunu ve cam otomatiklerini sıfırla',
      'Şarj dinamosunun (alternatör) 13.8 - 14.4V şarj voltajını ölçtür'
    ]
  },
  {
    id: 'oto_fren_balata',
    category: 'arac_ulasim',
    keywords: ['fren ötüyor', 'balata bitti', 'fren balatası', 'balata değiştim', 'disk taşlama', 'fren pedalı yumuşak'],
    baslik: 'Fren Balata & Disk Değişimi',
    ikon: '🛑',
    renk: '#FEF3C7',
    varsayilanZaman: 'Servis / Değişim',
    hazirlikZamani: 'İlk 200 Km Alıştırma',
    akilliFisilti: '🛑 Yeni balatalarda ilk 200 km ani sert frenden kaçınılmalıdır, aksi halde diskler camlaşır.',
    oncedenYapilacaklar: [
      'Ön ve arka balata aşınma sensör kablolarını yenile',
      'Fren hidrolik seviyesini (DOT4) kontrol et ve gerekirse tazele',
      'Kaliper pimlerini yüksek ısı gresi ile yağla',
      'İlk 200 km boyunca rodaj için yumuşak frenleme yap'
    ]
  },

  // 10. İNŞAAT, ŞANTİYE & MÜHENDİSLİK (BETON, LOTO, TRAFO)
  {
    id: 'insaat_beton_dokum',
    category: 'is_kariyer',
    keywords: ['beton döktük', 'beton döküldü', 'şantiye beton', 'c30 beton', 'c35 beton', 'slump testi', 'beton kırım'],
    baslik: 'Beton Dökümü & Laboratuvar',
    ikon: '🏗️',
    renk: '#FEF3C7',
    varsayilanZaman: 'Döküm Günü',
    hazirlikZamani: 'Dökümden 1 Saat Önce',
    akilliFisilti: '🏗️ Beton döküm anından itibaren 7. ve 28. günlerde laboratuvar kırım testi ve 3 gün kür sulaması şarttır.',
    oncedenYapilacaklar: [
      'Transmikser irsaliyelerinden C30/C35 sınıfı ve slump değerini kontrol et',
      'Yapı denetim eşliğinde küp/silindir numuneleri etiketle ve su havuzuna al',
      '7 gün ve 28 gün sonraki laboratuvar basınç dayanım kırım tarihlerini takvime işle',
      'Dökümden sonraki ilk 72 saat sabah-akşam düzenli kür sulaması yap'
    ]
  },
  {
    id: 'elektrik_loto_trafo',
    category: 'is_kariyer',
    keywords: ['trafo bakım', 'loto', 'yüksek gerilim', 'pano bakım', 'şalter indi', 'kompanzasyon'],
    baslik: 'Elektrik Pano Bakım & LOTO',
    ikon: '⚡',
    renk: '#FEE2E2',
    varsayilanZaman: 'Planlı Kesinti Saati',
    hazirlikZamani: 'Müdahale Öncesi Emniyet',
    akilliFisilti: '⚡ Can güvenliği gereği panoda LOTO (Kilitleme-Etiketleme) yapılmadan ve sıfır gerilim ölçülmeden müdahale edilemez.',
    oncedenYapilacaklar: [
      'Ana kesiciyi aç ve asma kilit ile etiket (LOTO) uygulayarak kilitle',
      'Çift kutuplu gerilim kontrol kalemiyle fazlarda sıfır enerji teyidi yap',
      'İzole halı, dielektrik eldiven ve ark siperliği kuşan',
      'Kompanzasyon panosunda endüktif %20, kapasitif %15 cezai sınırları denetle'
    ]
  },

  // 11. HUKUK & ADLİYE (DURUŞMA, TEBLİGAT, İSTİNAF, İCRA)
  {
    id: 'hukuk_uyap_tebligat',
    category: 'resmi',
    domain: 'HUKUK',
    keywords: ['uyap tebligat', 'uets', 'e-tebligat', 'tebligat geldi', 'istinaf süresi', 'istinafı', 'gerekçeli karar istinaf', 'cevap dilekçesi'],
    baslik: 'Asliye Hukuk Gerekçeli Karar İstinafı',
    ikon: '⚖️',
    renk: '#E0E7FF',
    varsayilanZaman: '06 Ekim 2026 Salı 23:59 (İstinaf Son Gün)',
    hazirlikZamani: '05 Ekim Pazartesi (Dilekçe & Harç Hazırlığı)',
    akilliFisilti: '⚖️ Tebligat Kanunu 7/a gereğince tebliğ 22 Eylül Salı gecesi yapılmış sayılır; süre 23 Eylül Çarşamba başlar ve 06 Ekim Salı 23:59\'da biter.',
    oncedenYapilacaklar: [
      'UETS Mazbatası: 17 Eylül\'ü izleyen 5. günün sonu (22 Eylül Salı 23:59) tebliğ sayılır',
      '23 Eylül Çarşamba: 2 haftalık yasal istinaf süresi fiilen başlar',
      'Müvekkile istinaf harç ve gider avansı masraf bildirimini WhatsApp\'tan ilet',
      'İstinaf başvuru dilekçesini gerekçeli karardaki delil hatalarına göre tanzim et',
      '06 Ekim Salı 23:59 öncesi: UYAP Avukat Portal\'dan e-İmza ile sisteme gönder'
    ]
  },
  {
    id: 'hukuk_durusma_adliye',
    category: 'resmi',
    domain: 'HUKUK',
    keywords: ['duruşma', 'duruşmam var', 'ağır ceza duruşma', 'asliye ceza duruşma', 'iş mahkemesi duruşma'],
    baslik: 'Adliye Mahkeme Duruşması',
    ikon: '🏛️',
    renk: '#E0E7FF',
    varsayilanZaman: 'Duruşma Günü (30 Dk Önce)',
    hazirlikZamani: 'Duruşmadan 30 Dk Önce Adliye',
    akilliFisilti: '🏛️ Çakışan duruşma ihtimaline karşı mazeret dilekçesi hazırda tutulmalı, cübbe ve dosya kontrol edilmelidir.',
    oncedenYapilacaklar: [
      'Duruşma saatinden 30 dakika önce duruşma salonu kapısında hazır bulun',
      'Mübaşire vekaletname veya yetki belgesini ibraz et',
      'Çakışma varsa diğer mahkemeye önceden UYAP mazeret dilekçesi gönder',
      'Duruşma zaptı ve ara kararları UYAP üzerinden gecikmeksizin kaydet'
    ]
  },

  // 12. MALİ MÜŞAVİRLİK & VERGİ (BEYANNAME, SGK, KDV)
  {
    id: 'smmm_kdv_beyanname',
    category: 'finans',
    domain: 'FINANS',
    keywords: ['kdv beyanname', 'muhsgk', 'muhtasar beyanname', 'kdv son gün', 'eylül dönemi kdv', 'beyanname onay', 'tahakkuk bitişi'],
    baslik: 'Eylül Dönemi KDV & MUHSGK Beyanı',
    ikon: '📊',
    renk: '#DCFCE7',
    varsayilanZaman: '28 Eylül 2026 Pazartesi 23:59 (Tahakkuk Bitişi)',
    hazirlikZamani: '24 Eylül Perşembe (Fatura & Ön Matrah Teyidi)',
    akilliFisilti: '📊 Ayın 26\'sı Cumartesi\'ye rastladığı için yasal beyan süresi VUK gereğince 28 Eylül Pazartesi 23:59\'a sarkmıştır.',
    oncedenYapilacaklar: [
      '26 Eylül Cumartesi gününe denk geldiği için beyanname son günü 28 Eylül Pazartesi\'ye uzamıştır',
      'Mükelleflerin eksik e-Fatura, e-Arşiv ve banka ekstrelerini topla',
      'Zirve/Luca muhasebe fişlerini kes ve KDV matrah kontrol raporunu dök',
      'MUHSGK bordro bildirgelerini SGK ve Muhtasar yönünden eşitle',
      'e-Beyanname sisteminden tahakkukları alıp mükelleflere PDF olarak ilet'
    ]
  },
  {
    id: 'smmm_sgk_e_defter',
    category: 'finans',
    domain: 'FINANS',
    keywords: ['sgk prim', 'e-defter berat', 'bağkur öde', 'ay sonu bordro'],
    baslik: 'SGK Prim & e-Defter Beratı',
    ikon: '📈',
    renk: '#DCFCE7',
    varsayilanZaman: 'Ayın Son Günü 23:59',
    hazirlikZamani: 'Ay Sonundan 2 Gün Önce',
    akilliFisilti: '📈 e-Defter berat yüklemeleri ve SGK prim ödemeleri ayın son günü mesai bitimine kadar yapılmalıdır.',
    oncedenYapilacaklar: [
      'SGK tahakkuklarını kontrol et ve otomatik ödeme talimatını teyit et',
      'e-Defter beratlarını mali mühür ile imzalayıp GİB sistemine yükle',
      'Yükleme onay beratlarını arşiv klasörüne ve buluta yedekle'
    ]
  },

  // 13. EĞİTİM & ÖĞRETMENLİK (SINAV OKUMA, E-OKUL, NÖBET)
  {
    id: 'egitim_tasimali_yemek_nobet',
    category: 'resmi',
    keywords: ['taşımalı yemek', 'tasimali yemek', 'yemek numune', 'yemek numunesi', 'taşımalı servis', '72 saat numune', 'öğle yemeği numune', 'taşımalı yemek & nöbet kontrolü'],
    baslik: 'Taşımalı Yemek & Nöbet Kontrolü',
    ikon: '🍱',
    renk: '#DCFCE7',
    varsayilanZaman: '18 Eylül 2026 Cuma 08:15',
    hazirlikZamani: 'Yemek Öncesi / Sabah 08:15',
    akilliFisilti: '🍱 Gıda güvenliği mevzuatı gereği taşımalı yemek numuneleri 72 saat boyunca +4°C saklanmak zorundadır.',
    oncedenYapilacaklar: [
      'Gelen öğle yemeğinden her çeşitten steril numune al, etiketle ve +4°C\'de 72 saat sakla',
      'Taşımalı servis araçlarının yangın tüpü, emniyet kemeri ve şoför föyünü imzala',
      'Raporlu öğretmenlerin sınıflarını tespit et ve boş derslere nöbetçi öğretmen görevlendir'
    ]
  },
  {
    id: 'ogretmen_sinav_e_okul',
    category: 'resmi',
    domain: 'EGITIM',
    keywords: ['sınav okuma', 'yazılı okuma', 'e-okul not', 'not girişi', 'sınav bitti', 'sınav yaptık', 'yazılı sınav not kilidi', 'yazılı sınav'],
    baslik: 'Yazılı Sınav Not Kilidi (e-Okul)',
    ikon: '✍️',
    renk: '#FEF08A',
    varsayilanZaman: '27 Eylül 2026 Pazar 17:00 (10. Gün)',
    hazirlikZamani: '20 Eylül Pazar (Kağıt Okuma Başlangıcı)',
    akilliFisilti: '✍️ MEB Yönetmeliği uyarınca sınav sonuçları sınav tarihini takip eden en geç 10 gün içinde e-Okul\'a işlenmelidir.',
    oncedenYapilacaklar: [
      'Sınav cevap anahtarı ve puanlama baremini okul panosuna as',
      'Yazılı kağıtlarını oku ve kazanım analiz tablosunu doldur',
      '27 Eylül öncesi: e-Okul sistemine notları ve analizleri girip kilitle',
      'Sınav kağıtlarını ve analiz çıktısını ıslak imzayla zümre başkanına teslim et'
    ]
  },

  // 14. POLİS, İTFAİYE & ACİL DURUM (GÖZALTI, SCBA, DEVRİYE)
  {
    id: 'asayis_gozalti_fezleke',
    category: 'resmi',
    keywords: ['gözaltı', 'yakalama tutanağı', 'adli muayene', 'fezleke'],
    baslik: 'Gözaltı & Savcılık Fezlekesi',
    ikon: '👮',
    renk: '#BFDBFE',
    varsayilanZaman: '24 Saat Yasal Süre',
    hazirlikZamani: 'Gözaltı Bitimine 6 Saat Kala',
    akilliFisilti: '👮 24 saatlik yasal gözaltı süresi aşılmamalı; giriş ve çıkış adli muayene raporları eksiksiz alınmalıdır.',
    oncedenYapilacaklar: [
      'Şüphelinin giriş adli muayene raporunu hastaneden temin et',
      'Üst arama ve adli emanet teslim-tesellüm tutanağını tanzim et',
      'İfade alma işlemi sonrası avukat eşliğinde imzaları tamamla',
      'Süre bitimine en az 6 saat kala savcılık fezlekesini hazırla'
    ]
  },
  {
    id: 'itfaiye_scba_nobet',
    category: 'resmi',
    keywords: ['itfaiye nöbet', 'scba', 'solunum tüpü', 'arazöz', 'yangın tüpü basınç'],
    baslik: 'İtfaiye Nöbet & SCBA Kontrolü',
    ikon: '🚒',
    renk: '#FECACA',
    varsayilanZaman: 'Nöbet Devir 08:00',
    hazirlikZamani: 'Nöbet Başlangıcı',
    akilliFisilti: '🚒 SCBA solunum tüpü basınçları 300 Bar altında olmamalı; arazöz su-köpük vanaları kontrol edilmelidir.',
    oncedenYapilacaklar: [
      'SCBA tüp manometrelerini kontrol et (En az 300 Bar)',
      'Arazöz su tankı, köpük seviyesi ve hidrolik kesici ayırıcı bataryalarını test et',
      'Yangın tulumu, baret, çizme ve nomex başlık kondisyonunu denetle',
      'Nöbet devir-teslim defterini kaşeleyip imzala'
    ]
  },

  // 15. MUTFAK & ŞEF (MİSE EN PLACE, HACCP)
  {
    id: 'sef_mise_en_place',
    category: 'is_kariyer',
    keywords: ['mise en place', 'servis hazırlık', 'restoran servis', 'soğuk oda kontrol', 'haccp'],
    baslik: 'Mutfak Mise en Place & Hazırlık',
    ikon: '👨‍🍳',
    renk: '#FED7AA',
    varsayilanZaman: 'Servis Öncesi 16:30',
    hazirlikZamani: 'Servisten 3 Saat Önce',
    akilliFisilti: '👨‍🍳 Soğuk oda sıcaklığı +4°C, derin dondurucu -18°C olmalı; FIFO kuralı titizlikle uygulanmalıdır.',
    oncedenYapilacaklar: [
      'Soğuk oda ve dipfriz derece çizelgelerini doldur (+4°C / -18°C)',
      'Tüm sos, garnitür ve proteinlerin mise en place hazırlığını tamamla',
      'Bıçakları bileyleyip kesme tahtalarını çapraz bulaşma renk koduna göre hazırla',
      'Servisten 45 dakika önce servis ekibiyle tadım brifingi yap'
    ]
  },

  // 16. HAVACILIK & PİLOT (OFP, METAR, BRİFİNG)
  {
    id: 'pilot_ucushazirlik_ofp',
    category: 'is_kariyer',
    keywords: ['ofp', 'metar', 'taf', 'kokpit brifing', 'walkaround', 'ucuş brifing'],
    baslik: 'Uçuş Öncesi OFP & METAR Brifingi',
    ikon: '✈️',
    renk: '#E0E7FF',
    varsayilanZaman: 'Kalkıştan 90 Dk Önce',
    hazirlikZamani: 'Uçuştan 2 Saat Önce',
    akilliFisilti: '✈️ FDP dinlenme süresi ihlal edilmemeli; meydan METAR/TAF ve yedek meydan yakıt planı onaylanmalıdır.',
    oncedenYapilacaklar: [
      'Kalkış, varış ve yedek meydan METAR/TAF ve NOTAM bültenlerini incele',
      'OFP (Operasyonel Uçuş Planı) yakıt ve rüzgar hesaplamalarını imzala',
      'Kalkıştan 45 dakika önce uçağın fiziki dış kontrolünü (walkaround) tamamla',
      'Kabin amiriyle uçuş emniyet ve türbülans brifingi gerçekleştir'
    ]
  },

  // 17. KLİNİK, HEMŞİRE, DOKTOR & ECZANE (ORDER, SBAR, KONSÜLTASYON, SOĞUK ZİNCİR)
  {
    id: 'doktor_acil_konsultasyon',
    category: 'saglik',
    keywords: ['acil konsültasyon', 'acil konsultasyon', 'genel cerrahi acil', 'stat kons', '30 dk sla', 'akut batın'],
    baslik: 'Genel Cerrahi Acil Konsültasyon',
    ikon: '🚨',
    renk: '#FEE2E2',
    varsayilanZaman: 'Bugün 14:45 (30 Dk SLA Sonu)',
    hazirlikZamani: '30 Dk İçinde SLA',
    akilliFisilti: '🚨 Acil konsültasyonlarda yasal yanıt süresi 30 dakikadır. Değerlendirme 30 dk içinde tamamlanmalıdır.',
    oncedenYapilacaklar: [
      'Acil servise intikal et ve hastanın akut batın muayenesini yap',
      'Hemogram, CRP, Amilaz ve batın BT görüntülerini PACS üzerinden incele',
      'Gerekliyse ameliyathane ekibine pre-op hazırlık bilgisini ilet',
      'Konsültasyon kanaatini 30 dakika dolmadan HBYS\'ye işle ve kaydet'
    ]
  },
  {
    id: 'hemsire_sbar_devir',
    category: 'saglik',
    keywords: ['sbar', 'hemşire devir', 'hasta order', 'vital bulgu', 'pansuman'],
    baslik: 'Hemşire Vardiya & SBAR Devri',
    ikon: '💉',
    renk: '#CCFBF1',
    varsayilanZaman: 'Vardiya Sonu 07:30',
    hazirlikZamani: 'Vardiyadan 45 Dk Önce',
    akilliFisilti: '💉 İlaç uygulamalarında 5 Doğru Kuralı gözetilmeli; kritik hasta bilgileri SBAR yöntemiyle devredilmelidir.',
    oncedenYapilacaklar: [
      'Hasta vital bulgularını (tansiyon, nabız, ateş, SpO2) sisteme işle',
      'Doktor order kontrolü ve 5 Doğru Kuralı teyidi yap',
      '2 saatte bir yatan hastaların dekübitus pozisyon değişimini sağla',
      'Vardiya bitiminde yeni ekibe yatak başı SBAR devri gerçekleştir'
    ]
  },
  {
    id: 'eczane_soguk_zincir',
    category: 'saglik',
    keywords: ['soğuk zincir', 'its bildirim', 'medula döküm', 'miad kontrol', 'eczane ilaç'],
    baslik: 'Eczane Soğuk Zincir & İTS',
    ikon: '💊',
    renk: '#FEE2E2',
    varsayilanZaman: 'Her Sabah 08:30',
    hazirlikZamani: 'Açılışta',
    akilliFisilti: '💊 Aşı ve biyolojik ürün dolapları 2-8°C arasında tutulmalı; sabah/akşam derece kaydı alınmalıdır.',
    oncedenYapilacaklar: [
      'İlaç buzdolabının sabah ve akşam ısı derecelerini (2-8°C) deftere işle',
      'İlaç Takip Sistemi (İTS) üzerinden karekod satış ve mal alım bildirimlerini onayla',
      'Miadı yaklaşan (son 3 ay) ilaçları raftan ayırıp iade listesine ekle',
      'Ayın ilk haftası Medula reçete dökümünü SGK’ya teslim et'
    ]
  },

  // 18. DEVLET MEMURU & RESMİ EVRAK (EBYS, CİMER, DOĞRUDAN TEMİN)
  {
    id: 'memur_ebys_evrak',
    category: 'resmi',
    keywords: ['ebys', 'belgenet', 'günlü evrak', 'acele yazı', 'paraf zinciri', 'cimer cevap'],
    baslik: 'EBYS Günlü Evrak & Paraf',
    ikon: '🗂️',
    renk: '#FEF9C3',
    varsayilanZaman: 'Son Gün 16:00',
    hazirlikZamani: '1 İş Günü Önce',
    akilliFisilti: '🗂️ Günlü ve süreli yazılarda yasal süre aşılmamalı; e-İmza sertifikası takılı olmalıdır.',
    oncedenYapilacaklar: [
      'Yazı taslağını hazırlayıp Standart Dosya Kodu (SDP) seçimi yap',
      'Şef ve Şube Müdürü paraf zincirine sun',
      'Nitelikli elektronik sertifika (e-İmza) ile nihai onayı alıp sayı/tarih ver',
      'CİMER veya mahkeme bilgi talebi ise yasal süre sayacını kapat'
    ]
  },

  // 19. ASKERİYE & TEKMİL (İÇTİMA, NÖBET, SİLAHLIK)
  {
    id: 'askeriye_ictima_nobet',
    category: 'resmi',
    keywords: ['içtima', 'tekmil', 'silahlık sayımı', 'doldur boşalt', 'nöbet devir teslim askeriye'],
    baslik: 'Askeri İçtima & Silahlık Devri',
    ikon: '🪖',
    renk: '#E2E8D5',
    varsayilanZaman: 'İçtima Öncesi (20 Dk Önce)',
    hazirlikZamani: 'Faaliyetten 25 Dk Önce',
    akilliFisilti: '🪖 İçtima saatinden 20 dakika önce mevcut ve künye sayımı tamamlanmalı, doldur-boşalt bizzat denetlenmelidir.',
    oncedenYapilacaklar: [
      'Mevcut ve künye kontrolü yap (Raporlu, izinli, nöbetçi personeli tespit et)',
      'Kompozit başlık, hücum yeleği ve teçhizat denetimini sağla',
      'Silahlık sayım cetvelini ve mühimmat sandığı kurşun mühürlerini fiziki say',
      'Doldur-boşalt istasyonunda doldur-boşalt emniyetini bizzat denetle'
    ]
  },

  // 20. PROJE, LOJİSTİK & ŞOFÖR (TAKOGRAF, AETR, TAKİP)
  {
    id: 'sofor_takograf_aetr',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['takograf', 'aetr', 'kantar', 'cmr', 'irsaliye', 'tır şoförü', 'uzun yol sürüş'],
    baslik: 'Takograf & AETR Sürüş Takibi',
    ikon: '🚛',
    renk: '#FED7AA',
    varsayilanZaman: 'Yola Çıkış',
    hazirlikZamani: 'Kalkıştan 45 Dk Önce',
    akilliFisilti: '🚛 AETR kuralları gereği 4.5 saatlik sürüşe 45 dakika mola verilmelidir; günlük azami sürüş 9 saattir.',
    oncedenYapilacaklar: [
      'Dijital takograf sürücü kartını tak ve günlük mod kontrolü yap',
      'Dorse lastik havaları, pleyt kilidi ve emniyet zincirini kontrol et',
      'İrsaliye, CMR ve kantar evraklarını araç torpidosuna al',
      '4.5 saat dolmadan dinlenme tesisi ve güvenli park alanı planla'
    ]
  },

  // 21. EMEKLİ YAŞAMI & SAĞLIK MOTORU (RETIRED LIFE & SENIOR HEALTH)
  {
    id: 'emekli_maas_tahsis',
    category: 'finans',
    domain: 'GENEL',
    keywords: ['emekli maaş', 'emekli maaşı', 'tahsis no', 'maaş günü', 'maaş çek', 'emekli bayram ikramiye', 'ikramiye yattı'],
    baslik: 'Emekli Maaşı & İkramiye Çekimi',
    ikon: '🏖️',
    renk: '#FEF3C7',
    varsayilanZaman: 'Maaş Günü 10:30',
    hazirlikZamani: '1 Gün Önce Hesap Kontrolü',
    akilliFisilti: '🏖️ Tahsis numarasının son hanesine göre maaş günü belirlenir; bankamatik yoğun saatlerinden kaçınılmalıdır.',
    oncedenYapilacaklar: [
      'e-Devlet 4A/4B/4C Emekli Aylık Bilgisi üzerinden kesin tahsis tutarını kontrol et',
      'Promosyon veya bayram ikramiyesi farkının hesaba yansıyıp yansımadığını gör',
      'Banka kartı şifresini ve günlük para çekme limitini teyit et',
      'Yoğunluk olmaması için sabah 10:30 - 11:30 arası sakin bankamatiği tercih et'
    ]
  },
  {
    id: 'emekli_raporlu_ilac',
    category: 'saglik',
    domain: 'GENEL',
    keywords: ['raporlu ilaç', 'ilaç yazdırma', 'sağlık ocağı ilaç', 'tansiyon ilacı bitti', 'şeker ilacı bitti', 'ilaç raporu'],
    baslik: 'Raporlu İlaç & Sağlık Ocağı',
    ikon: '💊',
    renk: '#F3E8FF',
    varsayilanZaman: 'Bugün 09:30',
    hazirlikZamani: 'İlaç Bitiminden 3 Gün Önce',
    akilliFisilti: '💊 Raporlu ilaçlar bitmeden 15 gün önce Medula sisteminden tekrar reçete ettirilebilir.',
    oncedenYapilacaklar: [
      'e-Nabız üzerinden ilaç raporunun geçerlilik süresini denetle',
      'Aile hekiminden sabah saatine sıra al ve aç karnına tahlil varsa planla',
      'Reçete kodunu SMS olarak al ve eczaneden temin et',
      'Kutu üzerindeki sabah/akşam doz talimatlarını eczacıya teyit ettir'
    ]
  },
  {
    id: 'emekli_hobi_yuruyus',
    category: 'kisisel_yasam',
    domain: 'GENEL',
    keywords: ['yürüyüş', 'sabah yürüyüşü', 'park yürüyüş', 'hobi bahçesi', 'tansiyon ölçümü'],
    baslik: 'Sabah Yürüyüşü & Tansiyon',
    ikon: '🌿',
    renk: '#DCFCE7',
    varsayilanZaman: 'Sabah 08:30',
    hazirlikZamani: 'Kahvaltıdan 45 Dk Sonra',
    akilliFisilti: '🌿 Sabah serinliğinde 30-45 dakikalık tempolu yürüyüş ve ardından istirahat tansiyonu dengeler.',
    oncedenYapilacaklar: [
      'Sabah tansiyon ilacını 1 bardak ılık su ile al',
      'Rahat yürüyüş ayakkabısı ve mevsime uygun pamuklu kıyafet seç',
      '30-40 dakikalık düz parkurda yürüyüş yap, su matarası taşı',
      'Dinlendikten sonra dijital tansiyon aletiyle ölçüm yapıp deftere yaz'
    ]
  },

  // 22. ÖĞRENCİ & KAMPÜS MOTORU (STUDENT & ACADEMIC LIFE)
  {
    id: 'ogrenci_vize_final_sinav',
    category: 'resmi',
    domain: 'OGRENCI',
    keywords: ['vize sınavı', 'vize', 'final sınavı', 'final', 'bütünleme', 'sınav giriş belgesi', 'ders sınavı'],
    baslik: 'Vize / Final Sınavı & Giriş',
    ikon: '🎓',
    renk: '#DDD6FE',
    varsayilanZaman: 'Sınav Saati (30 Dk Önce)',
    hazirlikZamani: 'Sınavdan 1 Gün Önce',
    akilliFisilti: '🎓 Sınav giriş belgesi, geçerli öğrenci kimliği ve yumuşak kurşun kalem önceden hazır edilmelidir.',
    oncedenYapilacaklar: [
      'OBS üzerinden sınav salonunu, sıra numarasını ve saatini kontrol et',
      'Öğrenci kimlik kartını ve fotoğraflı sınav giriş belgesini çantaya koy',
      'Yedek kurşun kalem, silgi, kalemtıraş ve izin veriliyorsa hesap makinesini hazırla',
      'Sınav başlamadan en az 25 dakika önce derslik kapısında hazır bulun'
    ]
  },
  {
    id: 'ogrenci_odev_proje_teslim',
    category: 'is_kariyer',
    domain: 'OGRENCI',
    keywords: ['ödev teslim', 'proje teslim', 'lab raporu', 'intihal raporu', 'turnitin', 'ödevi yükle'],
    baslik: 'Ödev & Proje Teslimi (Turnitin)',
    ikon: '📝',
    renk: '#DDD6FE',
    varsayilanZaman: 'Teslim Günü 23:59',
    hazirlikZamani: 'Teslimden 4 Saat Önce',
    akilliFisilti: '📝 Turnitin intihal oranı %20 sınırını aşmamalı ve dosya formatı PDF olarak sisteme yüklenmelidir.',
    oncedenYapilacaklar: [
      'Turnitin veya intihal yazılımında benzerlik oranını (%20 altı) test et',
      'Kaynakça ve APA formatı standartlarını gözden geçir',
      'Word dosyasını PDF formatına dönüştürüp dosya boyutunu küçült',
      'Üniversite Uzaktan Eğitim Sistemi (LMS/Canvas) üzerinden son teslimden önce yükle'
    ]
  },
  {
    id: 'ogrenci_kyk_ders_kaydi',
    category: 'resmi',
    domain: 'OGRENCI',
    keywords: ['ders kaydı', 'ders seçimi', 'harç ödeme', 'kyk burs', 'kyk yurt', 'danışman onayı'],
    baslik: 'Ders Kaydı & Danışman Onayı',
    ikon: '🏫',
    renk: '#DDD6FE',
    varsayilanZaman: 'Kayıt Haftası Son Gün',
    hazirlikZamani: 'Sistem Açılış Saati',
    akilliFisilti: '🏫 Kontenjan dolmadan ders seçimi yapılmalı ve danışman onayına gönderilmelidir.',
    oncedenYapilacaklar: [
      'Varsa katkı payı / harç ücretini ATM veya internet bankacılığından yatır',
      'Müfredat zorunlu ve seçmeli AKTS kredi toplamını hesapla',
      'OBS üzerinden dersleri seçip danışman onayına ilet',
      'Danışman onay durumunu OBS ve üniversite e-postasından takip et'
    ]
  },

  // 23. GENEL & EV YAŞAMI MOTORU (HOME LIFE / PERSONAL ROUTINES / JOB SEEKING)
  {
    id: 'calismiyorum_is_basvurusu_cv',
    category: 'is_kariyer',
    domain: 'GENEL',
    keywords: ['iş başvurusu', 'cv güncelle', 'cv hazırla', 'özgeçmiş', 'iş ilanı', 'kariyer net', 'linkedin başvuru'],
    baslik: 'İş Başvurusu & CV Güncelleme',
    ikon: '💼',
    renk: '#CCFBF1',
    varsayilanZaman: 'Bugün 14:00',
    hazirlikZamani: 'Başvuru Öncesi',
    akilliFisilti: '💼 İlan anahtar kelimeleri CV’ye uyarlanmalı ve ön yazı firma özelinde kişiselleştirilmelidir.',
    oncedenYapilacaklar: [
      'CV’deki son tecrübeleri, eğitim ve yetkinlikleri güncelle',
      'İlana özel anahtar kelimeleri ön yazıya (cover letter) entegre et',
      'Referans kişilerin güncel telefon ve unvan bilgilerini doğrula',
      'LinkedIn ve Kariyer portallarından PDF olarak başvuruyu tamamla'
    ]
  },
  {
    id: 'calismiyorum_mulakat_prova',
    category: 'is_kariyer',
    domain: 'GENEL',
    keywords: ['mülakat', 'iş mülakatı', 'iş görüşmesi', 'online mülakat', 'hr görüşme', 'ik mülakatı'],
    baslik: 'İş Mülakatı & Online Görüşme',
    ikon: '🎯',
    renk: '#CCFBF1',
    varsayilanZaman: 'Görüşme Saati (15 Dk Önce)',
    hazirlikZamani: 'Görüşmeden 1 Gün Önce',
    akilliFisilti: '🎯 Şirket projeleri incelenmeli; mikrofon, kamera ve aydınlatma test edilmelidir.',
    oncedenYapilacaklar: [
      'Şirketin son faaliyetlerini, vizyonunu ve sektördeki yerini araştır',
      'Klasik mülakat sorularına (STAR tekniği) yanıt provaları yap',
      'Zoom / Teams / Google Meet kamera, kulaklık ve internet bağlantısını sına',
      'Sessiz, arka planı derli toplu ve iyi ışık alan bir çalışma köşesi hazırla'
    ]
  },
  {
    id: 'calismiyorum_gunluk_rutin_ev',
    category: 'kisisel_yasam',
    domain: 'GENEL',
    keywords: ['ev işleri', 'günlük rutin', 'haftalık plan', 'ev düzeni', 'kişisel hedef', 'kendime vakit'],
    baslik: 'Günlük Yaşam Rutini & Hedefler',
    ikon: '🏠',
    renk: '#CCFBF1',
    varsayilanZaman: 'Bugün 11:00',
    hazirlikZamani: 'Sabah Planlama',
    akilliFisilti: '🏠 Günlük yapılandırılmış rutin odaklanmayı ve zindeliği korumanın en etkili yoludur.',
    oncedenYapilacaklar: [
      'Günün en kritik 3 ana hedefini belirle (Örn: Eğitim, spor, ev)',
      '1 saatlik odaklı öğrenme / kişisel gelişim veya yabancı dil pratiği yap',
      'Ev düzeni, yemek hazırlığı veya alışveriş listesini tamamla',
      'Akşam günün kazanımlarını ve yarının planını değerlendir'
    ]
  },

  // 24. TİCARET & ESNAF MOTORU (SALES & LOCAL SHOP)
  {
    id: 'ticaret_teklif_sicak_takip',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['satış teklif', 'teklif takibi', 'fiyat teklifi', 'müşteri arama', 'teklif attım', 'opsiyon süresi'],
    baslik: 'Teklif Sıcak Takibi (Follow-Up)',
    ikon: '💼',
    renk: '#FEF3C7',
    varsayilanZaman: '24-48 Saat Sonra',
    hazirlikZamani: 'Görüşme Öncesi Notlar',
    akilliFisilti: '💼 Gönderilen teklifin 24-48 saat içinde nazikçe sorgulanması kapanış oranını %40 artırır.',
    oncedenYapilacaklar: [
      'Teklif detaylarını, iskonto oranını ve opsiyon bitiş tarihini aç',
      'Müşterinin kritik beklentilerini ve bütçe hassasiyetini hatırla',
      'Telefon veya WhatsApp ile nazik bir hatırlatma ve teyit mesajı ilet',
      'Görüşme sonucunu CRM veya müşteri kartına not et'
    ]
  },
  {
    id: 'ticaret_kasa_z_raporu',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['z raporu', 'kasa sayımı', 'pos gün sonu', 'kasa kapat', 'gün sonu hasılat'],
    baslik: 'Gün Sonu Kasa & Z Raporu',
    ikon: '🧾',
    renk: '#DCFCE7',
    varsayilanZaman: 'Kapanış 20:30',
    hazirlikZamani: 'Kapanıştan 15 Dk Önce',
    akilliFisilti: '🧾 POS cihazlarından gün sonu alınmalı ve çekmecedeki fiziki nakit ile sistem mutabakatı yapılmalıdır.',
    oncedenYapilacaklar: [
      'Tüm POS cihazlarından Gün Sonu slip dökümlerini al',
      'Yazar kasadan mali Z Raporu alıp günlük deftere zımbala',
      'Kasada kalan avans bozuk parayı ayırıp günün net nakit cirosunu say',
      'Kasa mutabakat tutanağını doldurup kasayı kilitle'
    ]
  },

  // 25. ZİRAAT & BOTANİK MOTORU (AGRICULTURE & BOTANY)
  {
    id: 'ziraat_aksam_sulama',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['çiçek sula', 'sulama', 'bahçe sula', 'suvarıver', 'sulayuver', 'çiçekler susamış', 'domates sula'],
    baslik: 'Akşam Serinliği Sulaması',
    ikon: '🌿',
    renk: '#DCFCE7',
    varsayilanZaman: 'Akşam 19:30',
    hazirlikZamani: 'Güneş Battıktan Sonra',
    akilliFisilti: '🌿 Güneş altında sulanan yapraklar mercek etkisiyle yanar; sulama daima akşam serinliğinde yapılmalıdır.',
    oncedenYapilacaklar: [
      'Toprağın 3-4 cm derinine parmak batırarak nem kontrolü yap',
      'Güneşin tamamen batmasını ve toprağın soğumasını bekle (19:30)',
      'Suyu doğrudan yapraklara değil, kök boğazına dinlendirilmiş suyla ver',
      'Saksı tabağında biriken fazla suyu kök çürümesini önlemek için boşalt'
    ]
  },
  {
    id: 'ziraat_orkide_daldirma',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['orkide sulama', 'orkide bakım', 'orkide su', 'orkide kökleri gri'],
    baslik: 'Orkide Daldırma Sulama',
    ikon: '🌸',
    renk: '#FDF2F8',
    varsayilanZaman: 'Yarın Sabah 09:30',
    hazirlikZamani: 'Sabah Işığı',
    akilliFisilti: '🌸 Orkideler gece ıslak kalırsa kök mantarı oluşur; işlem sabah 15 dk daldırma yöntemiyle yapılmalıdır.',
    oncedenYapilacaklar: [
      'Kök renginin yeşilden gümüş-griye döndüğünü kontrol et',
      'Oda sıcaklığındaki dinlenmiş su dolu kaba saksıyı 15 dakika daldır',
      'Sudan çıkarıp tüm fazla suyun süzülmesini bekle (Damlamasın)',
      'Güneş alan ancak doğrudan yakıcı güneş almayan aydınlık yere koy'
    ]
  },

  // 26. HUKUK & ADLİYE EK MOTORU (LEGAL SUITE EXPANDED)
  {
    id: 'hukuk_icra_haciz_talep',
    category: 'resmi',
    domain: 'HUKUK',
    keywords: ['icra takibi', 'icra', 'ödeme emri', 'haciz talebi', 'ilamsız icra', 'icra dairesi'],
    baslik: 'İcra Takibi & Ödeme Emri',
    ikon: '⚖️',
    renk: '#E0E7FF',
    varsayilanZaman: 'Bugün 15:00',
    hazirlikZamani: 'Takip Öncesi',
    akilliFisilti: '⚖️ İcra takibinde borçlu TC/VKN ve faiz başlangıç tarihi UYAP İcra Portalında doğrulanmalıdır.',
    oncedenYapilacaklar: [
      'Alacak belgelerini, sözleşme veya faturayı UYAP İcra Portalına yükle',
      'Harç ve gider avansını vakıfbank/UYAP üzerinden online öde',
      'Tebligat zarfını tanzim edip PTT barkod takibine al',
      'Ödeme emri kesinleştiğinde 7 günlük itiraz süresini takvime kur'
    ]
  },
  {
    id: 'hukuk_ihtarname_noter',
    category: 'resmi',
    domain: 'HUKUK',
    keywords: ['ihtarname', 'noter ihtarname', 'tahliye ihtarnamesi', 'ihtar çek'],
    baslik: 'Noter İhtarnamesi & PTT Şerhi',
    ikon: '📜',
    renk: '#E0E7FF',
    varsayilanZaman: 'Mesai Bitimi 16:30',
    hazirlikZamani: 'Noterden 1 Gün Önce',
    akilliFisilti: '📜 İhtarnamenin muhataba tebliğ edildiği PTT tebliğ şerhi dava şartı ispatı için mutlaka temin edilmelidir.',
    oncedenYapilacaklar: [
      'İhtarname metnini ve fesih/talep maddelerini kanuni sürelere göre hazırla',
      'Noterden 3 nüsha halinde tasdik ve tebliğ işlemlerini tamamla',
      'PTT tebligat takip numarasıyla teslim gününü sistemden takip et',
      'Tebliğ şerhli nüshayı noterden teslim alıp dava dosyasına ekle'
    ]
  },

  // 27. BİYOLOJİK VE AİLE YAŞAMI MOTORU (FAMILY & HOUSEHOLD ENGINE)
  {
    id: 'bebek_asi_takvimi',
    category: 'saglik',
    domain: 'GENEL',
    keywords: ['bebek aşı', 'çocuk aşı', 'aylık aşı', 'karma aşı', 'kpa aşısı', 'verem aşısı', 'aşı randevusu', 'bebek 2 aylık', 'bebek 4 aylık', 'bebek 6 aylık', 'kkk aşısı', 'aşı takvimi'],
    baslik: 'Bebek & Çocuk Aşı Takvimi',
    ikon: '👶',
    renk: '#FDF2F8',
    varsayilanZaman: 'Aşı Günü 09:30',
    hazirlikZamani: '1 Gün Önce 18:00',
    hazirlikSaatOncesi: 15,
    akilliFisilti: '👶 Aşı sonrası hafif ateş ihtimaline karşı çocuk doktorunun önerdiği ateş düşürücü şurup ve dijital ateşölçer hazır bulundurulmalıdır.',
    oncedenYapilacaklar: [
      'Aşı kartı ve T.C. kimlik kartını bebek çantasına koy',
      'Ateş düşürücü parasetamol şurup ve dijital ateşölçer kontrolü yap',
      'Aşı sonrası giydirmek üzere kolay çıkarılabilir pamuklu giysi hazırla',
      'Aşıdan sonra 24-48 saat ateş ve aşı yeri hassasiyeti takibi yap'
    ]
  },
  {
    id: 'evcil_hayvan_parazit_asi',
    category: 'ev_teknik',
    domain: 'GENEL',
    keywords: ['kedi aşı', 'köpek aşı', 'iç parazit', 'dış parazit', 'kuduz aşısı', 'veteriner aşı', 'parazit damlası', 'veteriner kontrol', 'veterinere gideceğiz', 'hayvan aşısı'],
    baslik: 'Evcil Hayvan Aşı & Parazit',
    ikon: '🐾',
    renk: '#FEF3C7',
    varsayilanZaman: 'Veteriner Randevusu 11:00',
    hazirlikZamani: '1 Gün Önce 19:00',
    hazirlikSaatOncesi: 16,
    akilliFisilti: '🐾 İç-dış parazit uygulamaları 2-3 ayda bir periyodik tekrarlanmalıdır; aşı karnesi mutlaka yanınızda olmalıdır.',
    oncedenYapilacaklar: [
      'Veteriner aşı karnesini ve hayvan pasaportunu hazırla',
      'Taşıma çantasını (box/boxer) ve emniyet kemeri bağlantısını kontrol et',
      'Uygulama sonrası 24 saat su temasını engelle (Dış parazit damlası)',
      '3 ay sonrası için bir sonraki periyodik parazit alarmını kur'
    ]
  },
  {
    id: 'ev_su_aritma_filtre',
    category: 'ev_teknik',
    domain: 'GENEL',
    keywords: ['su arıtma', 'arıtma filtre', 'su arıtma filtre', 'filtre değişecek', 'arıtma filtresi', 'sediment filtre', 'membran filtre'],
    baslik: 'Su Arıtma Filtre Değişimi',
    ikon: '💧',
    renk: '#E0F2FE',
    varsayilanZaman: 'Hafta Sonu 14:00',
    hazirlikZamani: 'Değişim Öncesi',
    akilliFisilti: '💧 Sediment ve karbon filtreler 6 ayda bir değiştirilmezse membran tıkanır ve su kalitesi düşer.',
    oncedenYapilacaklar: [
      'Cihazın ana su giriş vanasını ve elektrik adaptörünü kapat',
      'Sediment, aktif karbon ve blok karbon ön filtrelerini yenile',
      'Filtre haznesi contalarını vazelinleyip kaçak testi yap',
      'İlk 10 litre suyu durulama amacıyla döküp tankı doldur'
    ]
  },
  {
    id: 'kombi_petek_yillik_bakim',
    category: 'ev_teknik',
    domain: 'GENEL',
    keywords: ['kombi bakım', 'kombi periyodik', 'petek temizliği', 'kombi yıllık', 'kombi basınç', 'petekler ısınmıyor'],
    baslik: 'Kombi & Petek Yıllık Bakımı',
    ikon: '🔥',
    renk: '#FEF3C7',
    varsayilanZaman: 'Hafta Sonu 11:30',
    hazirlikZamani: 'Servis Öncesi',
    akilliFisilti: '🔥 Kombi su basıncı 1.5 bar olmalı, genleşme tankı havası ve petek hava pürjörleri kış öncesi kontrol edilmelidir.',
    oncedenYapilacaklar: [
      'Kombi su basıncını 1.5 bar seviyesine getir (Doldurma musluğu)',
      'Yetkili servis tarafından brülör, fan ve genleşme tankı bakımı yaptır',
      'Peteklerin üst hava pürjör vanalarından havayı tahliye et',
      'Müdahaleden 48 saat sonra basınç göstergesinde düşme/kaçak testi yap'
    ]
  },

  // 28. MALİYE, VERGİ VE ABONELİK AKILLI BELLEĞİ (FINANCE & RECURRING BILLS ENGINE)
  {
    id: 'abonelik_deneme_iptal_korumasi',
    category: 'finans',
    domain: 'FINANS',
    keywords: ['deneme sürümü', 'ücretsiz deneme', 'netflix deneme', 'spotify deneme', 'abonelik iptal', 'karttan çekilmeden', 'ücretsiz 30 gün', 'trial iptal', 'abonelik yenileme', 'chatgpt plus iptal'],
    baslik: 'Abonelik & Deneme İptal Uyarısı',
    ikon: '⏱️',
    renk: '#FEE2E2',
    varsayilanZaman: 'Yenilemeden 3 Gün Önce',
    hazirlikZamani: '3 Gün Önce 10:00',
    hazirlikSaatOncesi: 72,
    akilliFisilti: '⏱️ Deneme süresi bitmeden 3 gün önce bildirim kuruldu; otomatik kart çekimini önlemek için abonelik ayarlarını denetleyin.',
    oncedenYapilacaklar: [
      'App Store, Google Play veya ilgili web paneli abonelik menüsünü aç',
      'Hizmetin devam edip etmeyeceğini değerlendir',
      'Devam edilmeyecekse "Aboneliği İptal Et" butonuna basıp teyit al',
      'İlgili sanal kart limitini veya provizyon onayını kapat'
    ]
  },
  {
    id: 'mtv_sigorta_kasko_yenileme',
    category: 'finans',
    domain: 'FINANS',
    keywords: ['mtv ödeme', 'motorlu taşıtlar vergisi', 'trafik sigortası yenileme', 'kasko yenileme', 'kasko bitti', 'sigorta bitti', 'mtv 1. taksit', 'mtv 2. taksit', 'mtv öde'],
    baslik: 'MTV & Sigorta / Kasko Yenileme',
    ikon: '💳',
    renk: '#FEE2E2',
    varsayilanZaman: 'Vade Tarihi 17:00',
    hazirlikZamani: 'Vadeden 3 Gün Önce',
    hazirlikSaatOncesi: 72,
    akilliFisilti: '💳 MTV Ocak ve Temmuz aylarında 2 taksittir; sigortasız araçlar trafiğe çıkamaz ve muayeneden geçemez.',
    oncedenYapilacaklar: [
      'İnteraktif Vergi Dairesi (İVD) üzerinden araç plakasıyla vergi borcu sorgula',
      'Trafik sigortası ve kasko için en az 3 farklı şirketten teklif karşılaştır',
      'Hasarsızlık indirim basamağının (1-8. basamak) doğru aktarıldığını teyit et',
      'Ödeme dekontunu ve yeni poliçeyi e-Devlet üzerinden kontrol et'
    ]
  },

  // 29. ZİRAİ, TARIM VE BAHÇE MOTORU (AGRICULTURE & SMART GARDENING ENGINE)
  {
    id: 'zirai_ilaclama_hava_sarti',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['ilaçlama', 'mantar ilacı', 'böcek ilacı', 'bordo bulamacı', 'zeytin ilaçlama', 'ağaç ilaçlama', 'tarla ilaçlama', 'pestisit', 'fungisit', 'zirai ilaç'],
    baslik: 'Zirai İlaçlama & Koşul Takibi',
    ikon: '🌿',
    renk: '#DCFCE7',
    varsayilanZaman: 'Sabah Serinliği 07:30',
    hazirlikZamani: 'İlaçlama Günü 06:30',
    akilliFisilti: '🌿 İlaçlama sonrası ilk 24 saat yağmur yağarsa ilaç yıkanır; rüzgarsız sabah erken saatte uygulanmalıdır.',
    tetikleyici: {
      tip: 'durum',
      sart: 'yagmursuz_ruzgarsiz',
      etiket: 'Hava Koşulu: Rüzgarsız & Yağışsız'
    },
    oncedenYapilacaklar: [
      'Meteoroloji 48 saatlik yağış ve rüzgar (10 km/s altı) tahminini denetle',
      'Maske, koruyucu tulum, gözlük ve kimyasal eldiven ekipmanını kuşan',
      'Dozajı ziraat mühendisi reçetesine ve su pH dengesine göre ayarla',
      'İlaçlama sonrası çevre arıcılara haber ver ve hasat bekleme süresine (PHI) riayet et'
    ]
  },
  {
    id: 'zirai_budama_gubreleme',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['ağaç budama', 'zeytin budama', 'asma budama', 'gübre atma', 'taban gübresi', 'yaprak gübresi', 'azot gübre', 'budama zamanı', 'ağaçları buda'],
    baslik: 'Mevsimlik Budama & Gübreleme',
    ikon: '🌾',
    renk: '#FEF3C7',
    varsayilanZaman: 'Sabah 08:30',
    hazirlikZamani: '1 Gün Önce 18:00',
    akilliFisilti: '🌾 Ağaçlar uyanmadan kış sonu budama yapılmalı ve kalın kesik yüzeylere aşı macunu sürülmelidir.',
    oncedenYapilacaklar: [
      'Budama makası ve testereleri çamaşır suyuyla dezenfekte et',
      'Kuru, hastalıklı ve içe bakan obur dalları dipten kes',
      'Kalın kesim yaralarına mantar önleyici aşı macunu / bordo bulamacı sür',
      'Toprak analizine uygun taban/azot gübresini taç izdüşümüne göm'
    ]
  },

  // 30. SPOR, ANTRENMAN VE BESLENME RUTİNLERİ (ATHLETIC & FITNESS ENGINE)
  {
    id: 'spor_overload_recovery',
    category: 'saglik',
    domain: 'GENEL',
    keywords: ['bacak çalıştım', 'ağır antrenman', 'göğüs antrenmanı', 'sırt çalıştım', 'leg day', 'kas ağrısı', 'overload', 'ağır idman', 'squat yaptık', 'deadlift yaptık', 'ağır spor'],
    baslik: 'Kas Toparlanma & Dinlenme (Recovery)',
    ikon: '🏋️',
    renk: '#F3E8FF',
    varsayilanZaman: 'Ertesi Gün Dinlenme',
    hazirlikZamani: 'Antrenmandan 24 Saat Sonra',
    akilliFisilti: '🏋️ Çalıştırılan ana kas grubu 48 saat dinlenmelidir; ertesi gün bol su, protein ve hafif esneme önerilir.',
    oncedenYapilacaklar: [
      'Hedef kas grubunu 48 saat boyunca ağır dirence maruz bırakma',
      'Günlük minimum 3-3.5 litre su ve 1.6g/kg protein alımını sağla',
      'Kas lifi toparlanması için 15-20 dakika foam roller ve hafif esneme yap',
      'En az 7.5-8 saat kesintisiz derin uyku uyu'
    ]
  },
  {
    id: 'spor_supplement_su_dongusu',
    category: 'saglik',
    domain: 'GENEL',
    keywords: ['kreatin', 'protein tozu', 'pre workout', 'pre-workout', 'bcaa', 'antrenman suyu', 'supplement takvimi', 'kreatin yükleme'],
    baslik: 'Sporcu Beslenme & Su Rutini',
    ikon: '💧',
    renk: '#E0F2FE',
    varsayilanZaman: 'Antrenman Öncesi & Sonrası',
    hazirlikZamani: 'İdmandan 30 Dk Önce',
    akilliFisilti: '💧 Kreatin kullanımında böbrek sağlığı için günde en az 3.5 litre su tüketilmeli, pre-workout aç karnına alınmalıdır.',
    oncedenYapilacaklar: [
      'Antrenmandan 30-45 dk önce pre-workout / hafif karbonhidrat tüket',
      'Antrenman esnası ve sonrasında elektrolit dengesini koru',
      'Antrenman bitiminde 5g kreatin ve whey protein dozunu al',
      'Günlük su hedefini (3.5 Litre) tamamla'
    ]
  },

  // 31. ÇOKLU ADIMLI SEYAHAT & BİLET REZERVASYON MOTORU (TRIP & TRANSIT SUITE)
  {
    id: 'seyahat_ucak_zincirleme',
    category: 'arac_ulasim',
    domain: 'HAVACILIK',
    keywords: ['uçağım var', 'uçuşum var', 'uçak bileti', 'uçağa bineceğim', 'havalimanına gideceğim', 'uçuş saati', 'uçağım saat', 'uçak yolculuğu'],
    baslik: 'Uçuş Seyahat Zinciri',
    ikon: '✈️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Uçuş Saati',
    hazirlikZamani: 'Uçuştan 24 Saat Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '✈️ T-24 saatte online check-in, T-3 saatte evden çıkış, T-90 dakikada bagaj/güvenlik adımları planlandı.',
    oncedenYapilacaklar: [
      'T-24 Saat: Online check-in yap, biniş kartını telefona ve cüzdana kaydet',
      'T-3.5 Saat: Evden çıkış (Havalimanı yolu trafik payı ve otopark)',
      'T-90 Dakika: Bagaj teslimi, kimlik/pasaport kontrolü ve x-ray güvenlik geçişi',
      'T-45 Dakika: Biniş kapısında (Gate) hazır bulun, kapı kapanışını kaçırma'
    ]
  },
  {
    id: 'seyahat_yht_otobus_zincirleme',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['yht bileti', 'hızlı tren', 'otobüs bileti', 'gara gideceğim', 'otogara gideceğim', 'tren kalkıyor', 'otobüs kalkıyor', 'yht saat', 'otobüs saat'],
    baslik: 'YHT / Tren & Otobüs Seyahati',
    ikon: '🚆',
    renk: '#FEF3C7',
    varsayilanZaman: 'Kalkış Saati',
    hazirlikZamani: 'Kalkıştan 2 Saat Önce',
    hazirlikSaatOncesi: 2,
    akilliFisilti: '🚆 YHT tren kapıları kalkıştan 5 dakika önce kilitlenir; garda en az 30 dakika önce olunmalıdır.',
    oncedenYapilacaklar: [
      'PNR kodu, vagon ve koltuk numarasını telefona kaydet',
      'Fotoğraflı T.C. Kimlik kartını kolay erişilebilir cebe koy',
      'Kalkıştan 45 dk önce gar/otogar x-ray kontrolünden geçip peronu bul',
      'Kulaklık, şarj aleti ve seyahat suyunu el çantasına al'
    ]
  }
];

/**
 * Kullanıcının söylediği 2-3 kelimelik kısa ve eksik ifadeleri
 * gelişmiş yaşam senaryolarıyla eşleştirip tam teşekküllü bir karta dönüştürür.
 * 
 * @param text Kullanıcı girdisi
 * @param userDomain Kullanıcının ayarlardan seçtiği çalışma/uzmanlık alanı (Örn: 'HUKUK', 'OGRENCI', 'EMEKLİ')
 */
export function matchShortScenario(text: string, userDomain?: ProfessionDomain | string): ShortScenarioMatch | null {
  if (!text || text.trim().length === 0) return null;
  let lower = text.toLowerCase().trim();
  
  // Kelime bazlı göreceli süreleri dakikaya dönüştür
  lower = lower
    .replace(/yarım\s*saat\s*sonra/gi, '30 dakika sonra')
    .replace(/çeyrek\s*saat\s*sonra/gi, '15 dakika sonra')
    .replace(/bir\s*buçuk\s*saat\s*sonra/gi, '90 dakika sonra')
    .replace(/uyandır/gi, 'alarm kur');

  const words = lower.split(/\s+/);

  // TEMEL İLKE: KULLANICIYA YAPAY İŞ ÇIKARMA (MİKRO GÖREV KURALI)
  // Tekil alarmlar, süreli sayaçlar, tekil tansiyon/vitamin, çamaşır/fırın/ocak, çöp ve standart randevularda
  // veritabanındaki 4-5 adımlık ağır senaryolar tetiklenmemeli, mikro-görev motoruna bırakılmalıdır.
  const isMicroTaskCandidate =
    lower.includes('alarm') ||
    lower.includes('kaldır') ||
    /(\d+)\s*(dakika|dk|saat)\s*sonra/.test(lower) ||
    lower.includes('tansiyon ilac') ||
    lower.includes('vitamin') ||
    lower.includes('çamaşır') ||
    lower.includes('ocağın altı') ||
    lower.includes('fırını kapat') ||
    lower.includes('çöpü çıkar') ||
    lower.includes('çöp') ||
    (lower.includes('diş') && (lower.includes('randevu') || lower.includes('hekim') || lower.includes('salı') || lower.includes('çarşamba') || lower.includes('perşembe') || lower.includes('cuma') || lower.includes('yarın') || lower.includes('bugün'))) ||
    (lower.includes('doktor') && lower.includes('randevu'));

  if (isMicroTaskCandidate && !lower.includes('vize') && !lower.includes('final') && !lower.includes('ameliyat') && !lower.includes('cerrahi') && !lower.includes('implant cerrahi')) {
    return null;
  }

  const hasDomainPriority = userDomain && userDomain !== 'GENEL';

  // 1. ÖNCELİKLİ AŞAMA: Eğer kullanıcı belirli bir mesleki/yaşam alanı seçtiyse,
  // ilk olarak O ALANA ait senaryoları test et! Böylece örneğin 'HUKUK' seçen avukat için
  // hukuk kuralları en tepede önceliklendirilir.
  if (hasDomainPriority) {
    const domainScenarios = SCENARIO_DATABASE.filter(s => s.domain === userDomain);

    // 1.a: Tam anahtar kelime eşleşmesi
    for (const scenario of domainScenarios) {
      if (scenario.matcher && scenario.matcher(lower, words)) {
        return scenario;
      }
      for (const kw of scenario.keywords) {
        if (lower.includes(kw)) {
          return scenario;
        }
      }
    }

    // 1.b: Kök kelime veya benzerlik araması
    for (const scenario of domainScenarios) {
      for (const kw of scenario.keywords) {
        const kwWords = kw.split(' ');
        if (kwWords.every(w => words.some(userWord => userWord.startsWith(w) || userWord.includes(w)))) {
          return scenario;
        }
      }
    }
  }

  // 2. GENEL AŞAMA: Tüm senaryolar arasında eşleşme ara
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

  // 3. Kök kelime veya benzerlik araması (Tüm veritabanı)
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
