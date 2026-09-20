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

  // 18. KAMU, DEVLET MEMURU & KURUMSAL OFİS MOTORU (CIVIL SERVANT, BUREAUCRACY & CORPORATE OFFICE)
  {
    id: 'kamu_ebys_gunlu_evrak',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['ebys', 'belgenet', 'dys', 'günlü evrak', 'gunlu evrak', 'acele yazı', 'paraf zinciri', 'sdp', 'standart dosya', 'e-imza evrak', 'sayı tarih al'],
    baslik: 'EBYS Günlü & İvedi Evrak Parafı',
    ikon: '🖋️',
    renk: '#FEF9C3',
    varsayilanZaman: 'Teslimden 1 Gün Önce 16:00',
    hazirlikZamani: 'İç Onay & Paraf Zinciri',
    akilliFisilti: '🖋️ Günlü ve ivedi yazılarda gecikmeye meydan vermemek için son tarihten en az 1 iş günü önce iç paraf zinciri tamamlanmalıdır.',
    oncedenYapilacaklar: [
      'Yazı taslağını hazırlayıp Başbakanlık/Cumhurbaşkanlığı Standart Dosya Planı (SDP) kodunu seç',
      'Şef, Şube Müdürü ve Daire Başkanı hiyerarşik paraf zincirine sun',
      'Ekli belgelerin (CD, cetvel, fiziki dosya) üst yazıya tam iliştirildiğini kontrol et',
      'Nitelikli elektronik sertifika (e-İmza) ile nihai makam olurunu alıp giden evrak sayı/tarihini ver',
      'Muhatap idareye veya UETS/KEP adresine teslim teyidini alarak arşive kaldır'
    ]
  },
  {
    id: 'kamu_cimer_bilgi_edinme',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['cimer', 'çimer', 'bilgi edinme', '3071', 'dilekçe hakkı', 'cimer başvuru', 'cimer cevap'],
    baslik: 'CİMER & Bilgi Edinme Yasal Süreci',
    ikon: '🏛️',
    renk: '#FEF9C3',
    varsayilanZaman: 'Yasal Süre (15-30 Gün)',
    hazirlikZamani: '3 İş Gününde Alt Birim Yazışması',
    akilliFisilti: '🏛️ 4982 sayılı Bilgi Edinme Hakkı Kanununda 15 gün, 3071 sayılı Dilekçe Kanununda 30 günlük yasal cevap süresi esastır.',
    oncedenYapilacaklar: [
      'CİMER başvuru konusunu incele; gerekiyorsa 3 iş günü içinde ilgili birim veya taşra teşkilatına ara yazı yaz',
      'Alt birimden gelen bilgi ve belgeleri mevzuat süzgecinden geçirerek gerekçeli cevap taslağını hazırla',
      'Kişisel veriler (KVKK) ve ticari sır teşkil eden bilgileri karartarak metni nihai hale getir',
      'Şube Müdürü parafı ve Makam Onayı ile CİMER sistemine cevabı yükleyip başvuruyu kapat',
      'Vatandaşa sistem üzerinden bilgilendirme SMS/e-postası düştüğünü teyit et'
    ]
  },
  {
    id: 'kamu_dogrudan_temin_tif',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['doğrudan temin', 'dogrudan temin', '4734', '22/d', 'tif', 'tkys', 'mys', 'mys v2', 'muayene kabul', 'piyasa fiyat araştırma', 'harcama talimatı'],
    baslik: 'Doğrudan Temin (22/d) & TİF Süreci',
    ikon: '🗂️',
    renk: '#FEF9C3',
    varsayilanZaman: 'Fatura / Hakediş Onayı',
    hazirlikZamani: 'Piyasa Araştırması & Muayene Kabul',
    akilliFisilti: '🗂️ 4734 sayılı KİK 22/d alımlarında piyasa fiyat araştırma tutanağı, fatura tarihi, Muayene Kabul ve TİF tarihleri birebir uyumlu olmalıdır.',
    oncedenYapilacaklar: [
      'Harcama yetkilisinden onaylı Harcama Talimatını al ve en az 3 firmadan kaşeli piyasa teklif mektubu topla',
      'Piyasa Fiyat Araştırma Tutanağını tanzim edip en uygun teklif sahibiyle sözleşme/sipariş oluştur',
      'Mal/hizmet tesliminde Muayene ve Kabul Komisyonu Tutanağını komisyon üyelerine ıslak imzalattır',
      'Taşınır Kayıt ve Yönetim Sistemi (TKYS) üzerinden Taşınır İşlem Fişi (TİF) kes ve ambar kaydını yap',
      'MYS V2 üzerinden Ödeme Emri Belgesi (ÖEB) düzenleyip fatura aslıyla birlikte Malmüdürlüğü/Muhasebeye teslim et'
    ]
  },
  {
    id: 'kamu_dmk_rapor_izin',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['sağlık raporu', 'saglik raporu', 'memur izin', 'rapor aldım', 'istirahat raporu', 'tek hekim raporu', 'dmk izin', '657 izin'],
    baslik: '657 DMK Sağlık Raporu & İzin Bildirimi',
    ikon: '📋',
    renk: '#FEF9C3',
    varsayilanZaman: 'Mesai Başlangıcı (İvedi)',
    hazirlikZamani: 'En Geç Mesai Bitimine Kadar İntikal',
    akilliFisilti: '📋 Devlet Memurları İzin Yönetmeliği uyarınca tek hekim raporu azami 10 gün verilebilir; rapor en geç mesai bitimine kadar kuruma ulaştırılmalıdır.',
    oncedenYapilacaklar: [
      'Mesai başlangıç saatinde birim amirine sözlü ve yazılı olarak istirahat raporu bilgisini ver',
      'EBYS veya kurum portalı üzerinden \'Sağlık İzni Talep Formu\' doldurarak rapor görselini sisteme yükle',
      'Tek hekim raporu 10 günü, yılda tek hekim toplamı 40 günü aşıyorsa Sağlık Kurulu Raporu zorunluluğunu gözet',
      'Rapor bitiminde görevine fiilen başlama yazısını veya izin onayının özlük birimince işlendiğini teyit et'
    ]
  },
  {
    id: 'kamu_dmk_disiplin_savunma',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['disiplin soruşturması', 'disiplin savunma', 'savunma istem', 'muhakkik', 'disiplin amiri', '657 disiplin', 'uyarma cezası', 'kınama'],
    baslik: 'Disiplin Soruşturması & Savunma Takvimi',
    ikon: '⚖️',
    renk: '#FEF9C3',
    varsayilanZaman: 'Yasal Savunma Süresi (7 Gün)',
    hazirlikZamani: 'Soruşturma Evrakı İnceleme (İlk 3 Gün)',
    akilliFisilti: '⚖️ 657 sayılı DMK m. 130 gereğince memura en az 7 gün süre verilmeden disiplin cezası verilemez; savunma hakkı kutsaldır.',
    oncedenYapilacaklar: [
      'Savunma istem yazısının tebellüğ tarihini kaydet (7 günlük yasal geri sayımı başlat)',
      'Soruşturma dosyasındaki iddia tutanaklarını, tanık ifadelerini ve delilleri bizzat incele',
      'Hukuki ve somut delillere dayalı yazılı savunma dilekçesini hazırla',
      'Disiplin amiri veya muhakkike savunmayı EBYS kaydıyla veya imza karşılığı teslim et',
      'Disiplin cezası zamanaşımı sürelerini (öğrenmeden itibaren 1 ay, fiilden itibaren 2 yıl) denetle'
    ]
  },
  {
    id: 'kamu_sayistay_teftis_layiha',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['sayıştay', 'sayistay', 'denetçi sorgusu', 'sorgu layihası', 'teftiş', 'müfettiş', 'iç denetim', 'kamu zararı', 'kişi borcu'],
    baslik: 'Sayıştay Sorgusu & Teftiş Savunma Layihası',
    ikon: '🏛️',
    renk: '#FEF9C3',
    varsayilanZaman: 'Yasal Cevap Süresi (30 Gün)',
    hazirlikZamani: 'Mali Veri & Dayanak Belgeleri Toplama',
    akilliFisilti: '🏛️ Sayıştay Kanunu gereği denetçi sorgularına 30 gün içinde gerekçeli ve belgeli savunma layihası verilmesi zorunludur.',
    oncedenYapilacaklar: [
      'Sayıştay Denetçi Sorgusu veya Teftiş Raporundaki kamu zararı/mevzuata aykırılık iddialarını maddeler halinde çıkar',
      'İddia edilen harcama kalemlerine ait kanıtlayıcı belgeleri (hakediş, meclis kararı, piyasa araştırması, mevzuat hükmü) derle',
      'Sayıştay içtihatları ve Danıştay emsal kararları ışığında savunma layihası taslağını oluştur',
      'Harcama Yetkilisi ve Gerçekleştirme Görevlisiyle müşterek savunma metnini parafe edip resmi yazıyla Sayıştay Dairesine ilet'
    ]
  },
  {
    id: 'kamu_resmi_protokol_toren',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['protokol', 'resmi tören', 'çelenk sunma', 'tebrikat', 'protokol listesi', 'oturma düzeni', 'valilik tören', 'bayramlaşma'],
    baslik: 'Resmi Tören & Protokol Oturma Düzeni',
    ikon: '🎖️',
    renk: '#FEF9C3',
    varsayilanZaman: 'Tören Saati (09:00)',
    hazirlikZamani: 'T-24 Saat Saha ve Ses Düzeni Provası',
    akilliFisilti: '🎖️ Ulusal ve Resmi Bayramlarda protokol oturma sırası Resmi Gazete\'de yayımlanan Yönetmelik hiyerarşisine harfiyen uygun olmalıdır.',
    oncedenYapilacaklar: [
      'Güncel İl/İlçe Protokol Listesine göre protokol tribünü isimliklerini ve oturma düzenini hazırla',
      'Çelenk sunma sırasını (Mülki İdare Amiri, Garnizon Komutanı, Belediye Başkanı) ve çelenk taşıyıcı personeli belirle',
      'Ses sistemi, İstiklal Marşı kaydı ve sunum metnini (tören programını) tören alanında prova et',
      'Tebrikat kabul salonu ikram ve kabul zincirini koordine et'
    ]
  },
  {
    id: 'kurumsal_yonetici_brifing_tampon',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['sekreter', 'yönetici asistanı', 'yonetici asistani', 'vip brifing', 'toplantı tamponu', 'brifing dosyası', 'toplantı tutanağı', 'mom'],
    baslik: 'VIP Yönetici Ajandası & Brifing Protokolü',
    ikon: '🗂️',
    renk: '#EDE9FE',
    varsayilanZaman: 'Toplantı Öncesi (T-2 Saat Brifing)',
    hazirlikZamani: '30 Dk Seyahat Tamponu',
    akilliFisilti: '🗂️ Yönetici ajandasında ardışık toplantılar arasına min. 30 dakika tampon konulmalı, brifing dosyası 2 saat önce sunulmalıdır.',
    oncedenYapilacaklar: [
      'Arka arkaya toplantılar arasına min. 30 dakika seyahat, toparlanma ve nefeslenme tamponu koy',
      'Üst düzey görüşmeden 2 saat önce: Katılımcı özgeçmişleri, toplantı bilgi notu ve ikram teyidini sağla',
      'Uçuşlu seyahatlerde T-24 saatte online check-in yap, VIP lounge ve havalimanı transferini teyit et',
      'Toplantı bitiminde MoM (Minutes of Meeting - Toplantı Tutanağı) ve aksiyon sahipleri listesini ilgili yöneticilere dağıt'
    ]
  },
  {
    id: 'kurumsal_sgk_ise_giris',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['sgk işe giriş', 'ise giris', 'işe başlama', 'özlük dosyası', '5510 işe giriş', 'e-bildirge giriş'],
    baslik: '5510 SGK İşe Giriş Bildirgesi & Özlük',
    ikon: '👥',
    renk: '#E0E7FF',
    varsayilanZaman: 'T-1 Gün Önce (SGK Yasal Zorunluluk)',
    hazirlikZamani: 'İşe Başlamadan 24 Saat Önce',
    akilliFisilti: '⚠️ 5510 sayılı Kanun uyarınca sigortalı işe giriş bildirgesi işe başlamadan en az 1 gün önce onaylanmalıdır; aksi takdirde idari para cezası kesilir.',
    oncedenYapilacaklar: [
      'KIRMIZI ALARM: İşe başlama tarihinden en az 1 gün önce SGK e-Bildirge üzerinden işe giriş bildirgesini onayla',
      'Belirli/belirsiz süreli iş sözleşmesi, KVKK açık rıza metni ve şirket iç yönetmeliğini ıslak imzalattır',
      'Sağlık raporu, adli sicil kaydı, diploma ve ikametgah evraklarını özlük klasörüne tak',
      'Zimmet teslim tutanağıyla laptop, telefon, şirket kredi kartı ve giriş kartını teslim et',
      'İşe giriş tarihinden 45 gün sonrasına \'Deneme Süresi Performans Değerlendirme\' hatırlatması kur'
    ]
  },
  {
    id: 'kurumsal_sgk_isten_cikis',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['sgk işten çıkış', 'isten cikis', 'işten ayrılış bildirgesi', 'istifa', 'ibraname', 'tazminat bordrosu', 'çıkış kodu'],
    baslik: 'SGK İşten Çıkış Bildirgesi & İbraname',
    ikon: '👥',
    renk: '#E0E7FF',
    varsayilanZaman: 'Yasal Süre: 10 Gün (SGK Çıkış)',
    hazirlikZamani: 'İstifa / Fesih İtibarıyla İlk 3 Gün',
    akilliFisilti: '👥 İşten ayrılış bildirgesi fesih tarihinden itibaren en geç 10 gün içinde SGK\'ya verilmelidir; doğru SGK çıkış kodu seçilmelidir.',
    oncedenYapilacaklar: [
      'SGK e-Bildirge üzerinden 10 gün içinde uygun fesih koduyla (Kod 03, 04 vb.) işten ayrılış bildirgesini ver',
      'BT ve idari işlerden zimmet iade formunu (bilgisayar, araç, kart vb.) ve kurumsal hesap iptalini tamamla',
      'Kıdem tazminatı, ihbar tazminatı ve kullanılmayan yıllık izin ücreti bordrosunu hesaplayıp imzalat',
      'İş Kanunu m. 19 uyarınca İbraname ve Çalışma Belgesini (Hizmet Belgesi) ıslak imzalı olarak özlük dosyasına kaldır'
    ]
  },
  {
    id: 'kurumsal_deneme_suresi_kpi',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['deneme süresi', 'deneme suresi', '2 aylık deneme', 'deneme süresi formu', 'performans değerlendirme'],
    baslik: '2 Aylık Deneme Süresi Değerlendirmesi',
    ikon: '📝',
    renk: '#E0E7FF',
    varsayilanZaman: '45. Gün (2 Ay Dolmadan)',
    hazirlikZamani: '15 Günlük Karar Tamponu',
    akilliFisilti: '📝 4857 sayılı İş Kanununda deneme süresi azami 2 aydır; değerlendirme 45. günde tamamlanmazsa standart fesih hükümleri yürürlüğe girer.',
    oncedenYapilacaklar: [
      'Bölüm yöneticisine \'Deneme Süresi Performans & Yetkinlik Değerlendirme Formunu\' ilet',
      'Yöneticinin KPI hedefleri, uyum ve teknik yeterlilik notlarını analiz et',
      'Olumsuz kararda bildirimsiz ve tazminatsız fesih tebligatını 60. gün dolmadan önce çalışana yazılı ilet',
      'Olumlu kararda bordro ve kariyer planlama sistemine daimi kadro onayını düş'
    ]
  },
  {
    id: 'kurumsal_yonetim_kurulu_karar',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['yönetim kurulu', 'yonetim kurulu', 'karar defteri', 'yk kararı', 'genel kurul', 'hazirun cetveli', 'imza sirküleri', 'ttsg'],
    baslik: 'Yönetim Kurulu (Board) & Karar Defteri',
    ikon: '📜',
    renk: '#EDE9FE',
    varsayilanZaman: 'Toplantı Günü (Mesai 15:00)',
    hazirlikZamani: 'Toplantıdan 3 Gün Önce Gündem Dağıtımı',
    akilliFisilti: '📜 Türk Ticaret Kanunu (TTK) uyarınca Yönetim Kurulu kararları noter tasdikli ciltli Karar Defterine yapıştırılıp üyelerce ıslak imzalanmalıdır.',
    oncedenYapilacaklar: [
      'Toplantıdan en az 3-7 gün önce gündem maddelerini, sunumları ve finansal tabloları üyelere tebliğ et',
      'Toplantı açılışında Hazirun Cetvelini (Katılımcı Listesi) ve toplantı nisabını kontrol et',
      'Alınan kararları TTK ve şirket ana sözleşmesine uygun şekilde resmi karar metnine dönüştür',
      'Noter onaylı Karar Defterine metni aktarıp tüm yönetim kurulu üyelerine ıslak imza attır',
      'Tescile tabi kararlarda (imza sirküleri, temsil ilzam, adres değişikliği) Ticaret Sicil randevusu alıp TTSG ilanını takip et'
    ]
  },
  {
    id: 'kurumsal_satinalma_teklif_nda',
    category: 'resmi',
    domain: 'KAMU',
    keywords: ['satın alma', 'satinalma', 'tedarikçi teklif', 'teklif karşılaştırma', 'nda', 'gizlilik sözleşmesi', 'masraf formu', 'purchase order'],
    baslik: 'Kurumsal Satın Alma & Tedarikçi NDA',
    ikon: '💼',
    renk: '#E0E7FF',
    varsayilanZaman: 'Sipariş Onayı (PO)',
    hazirlikZamani: '3 Teklif Karşılaştırma Matrisi',
    akilliFisilti: '💼 Şirket satın alma prosedürü gereği gizli teknik veriler paylaşılmadan önce karşılıklı Gizlilik Sözleşmesi (NDA) akdedilmeli, min. 3 teklif alınmalıdır.',
    oncedenYapilacaklar: [
      'Tedarikçiyle şirketler arası Gizlilik Sözleşmesini (NDA) karşılıklı imza altına al',
      'Teknik şartnameye uygun en az 3 bağımsız tedarikçiden kaşeli teklif topla ve Karşılaştırma Matrisi hazırla',
      'Departman bütçe koduna uygun Satın Alma Sipariş Formunu (PO) ERP sisteminde aç ve onaylat',
      'Malzeme teslim fişi, irsaliye ve e-faturayı kontrol ederek muhasebe masraf kapatmasını yap'
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
    id: 'lojistik_aetr_takograf',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['takograf', 'aetr', 'sürüş süresi', 'sürüş mola', 'takograf kartı', '4.5 saat sürüş', 'takograf verisi', '9 saat sürüş'],
    baslik: 'AETR Takograf Sürüş & Mola Takvimi',
    ikon: '🚛',
    renk: '#FED7AA',
    varsayilanZaman: 'Yola Çıkış',
    hazirlikZamani: 'Kalkıştan 45 Dk Önce',
    akilliFisilti: '🚛 AETR kuralları gereği 4.5 saatlik sürüşten sonra en az 45 dakika mola zorunludur; günlük azami sürüş 9 saattir.',
    oncedenYapilacaklar: [
      'Dijital takograf sürücü kartını tak ve günlük başlangıç ülke kodunu onayla',
      '4.5 saatlik sürüş sonrasında kesintisiz 45 dk (veya 15+30 dk) dinlenme molasını planla',
      'Günlük 9 saat (haftada en fazla 2 kez 10 saat) azami sürüş süresini aşma',
      '24 saatlik periyot içinde 11 saatlik kesintisiz günlük dinlenmeyi tamamla',
      'Takograf kart verisini en geç 28 günde bir şirket veri arşivine aktar'
    ]
  },
  {
    id: 'lojistik_cmr_irsaliye',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['cmr', 'sevk mektubu', 'sevk irsaliyesi', 'taşıma irsaliyesi', 'hasar rezerv', 'çekince şerhi', 'rezervasyon', 'eksik teslim'],
    baslik: 'CMR Sevk Mektubu & Hasar Rezervi',
    ikon: '📄',
    renk: '#FEF3C7',
    varsayilanZaman: 'Yükleme / Teslim Anı',
    hazirlikZamani: 'Yük Kabul Öncesi',
    akilliFisilti: '📄 CMR üzerine açık hasar veya koli eksiği için yazılı rezerv düşülmeden teslim alınan mallar kusursuz teslim kabul edilir.',
    oncedenYapilacaklar: [
      'CMR Sevk Mektubunun 1. (Gönderici), 2. (Alıcı) ve 3. (Taşıyıcı) nüshalarını eksiksiz kaşele',
      'Koli/palet yırtığı, ıslanma veya ambalaj hasarında CMR Kutu 18\'e gerekçeli rezerv düş',
      'e-İrsaliye karekodu, sevk irsaliyesi ve araç plaka/şoför TC kimlik eşleşmesini doğrula',
      'Gizli hasar durumunda teslimden sonraki 7 gün içinde yazılı ihbar süresini alıcıya hatırlat'
    ]
  },
  {
    id: 'lojistik_adr_tehlikeli_madde',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['adr', 'tehlikeli madde', 'un no', 'un numarası', 'src5', 'turuncu plaka', 'kemler', 'paketleme grubu', 'adr çantası'],
    baslik: 'ADR Tehlikeli Madde Taşıma Güvenliği',
    ikon: '☣️',
    renk: '#FEE2E2',
    varsayilanZaman: 'Yükleme Saati',
    hazirlikZamani: 'Kalkıştan 1 Saat Önce',
    akilliFisilti: '☣️ ADR gereği geçerli SRC-5 belgesi, turuncu tehlike levhaları, ADR yazılı talimatı ve mühürlü yangın tüpleri zorunludur.',
    oncedenYapilacaklar: [
      'UN numarası, teknik adı ve paketleme grubunu (PG I/II/III) ADR taşıma belgesiyle karşılaştır',
      'Çekici ve dorse ön/arka turuncu plakalarını (Kemler kodlu) ve yan tehlike etiketlerini tak',
      'Şoförün geçerli SRC-5 belgesini ve kabinde Türkçe/İngilizce ADR Yazılı Talimat föyünü bulundur',
      'Yangın tüplerinin basınçlarını (asgari 12 kg toplam) ve ADR emniyet çantasını kontrol et',
      'Tünel kısıtlama kodunu (B/C/D/E) güzergah planına işle ve meskun mahal park kurallarına uy'
    ]
  },
  {
    id: 'lojistik_frigo_soguk_zincir',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['frigo', 'soğuk zincir', 'soguk zincir', 'atp', 'data logger', 'termokin', 'reefer', 'dondurulmuş gıda', 'ısı sapması'],
    baslik: 'Frigorifik Soğuk Zincir & ATP Takibi',
    ikon: '❄️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Yükleme Öncesi',
    hazirlikZamani: 'Yüklemeden 2 Saat Önce',
    akilliFisilti: '❄️ ATP konvansiyonu gereği dorse set ısısına ulaşmadan (pre-cooling) yükleme yapılamaz; teslimde data logger çıktısı zorunludur.',
    oncedenYapilacaklar: [
      'Dorse içi ön soğutma (Pre-cooling) yap: Donuk -18°C / Taze +4°C set değerine ulaşmasını bekle',
      'Kalibrasyonlu Data Logger ve dorse içi dijital ısı sensörlerinin kayıt başlattığını teyit et',
      'Palet yüklemesinde tavan hava sirkülasyon kanalı ve taban hava ızgaralarını kapatma',
      'Teslim noktasında termokin yazıcısından sıcaklık grafiği çıktısını (printout) alıp teslim tutanağına ekle'
    ]
  },
  {
    id: 'lojistik_ncts_t1_transit',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['t1', 't2', 'ncts', 'mrn', 'tir karnesi', 'transit rejimi', 'gümrük mührü', 'varış gümrüğü', 'transit süresi'],
    baslik: 'Gümrük Transit & NCTS (T1/T2) Rejimi',
    ikon: '🛂',
    renk: '#E0E7FF',
    varsayilanZaman: 'Gümrük Çıkışı',
    hazirlikZamani: 'Çıkış Öncesi',
    akilliFisilti: '🛂 NCTS Transit Refakat Belgesindeki MRN numarası, varış gümrüğü yasal süresi ve gümrük mührü eksiksiz korunmalıdır.',
    oncedenYapilacaklar: [
      'MRN barkodlu Transit Refakat Belgesini (TRB) ve kapsam teminat mektubunu teslim al',
      'Gümrük muhafaza memurunun taktığı kurşun/plastik gümrük mührünün numarasını beyannameyle eşleştir',
      'Belirlenen seyahat güzergahına uyarak varış gümrüğü son teslim tarihini (transit süresi) aşma',
      'Mühür kopması veya kaza halinde güzergah üzerindeki en yakın gümrük veya kollukla tutanak tut'
    ]
  },
  {
    id: 'lojistik_wms_mal_kabul',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['wms', 'mal kabul', 'cross-docking', 'cross docking', 'depo', 'palet sayımı', 'fefo', 'fifo', 'rampa randevu', 'dock appointment'],
    baslik: 'Depo Mal Kabul & WMS Entegrasyonu',
    ikon: '🏬',
    renk: '#FEF3C7',
    varsayilanZaman: 'Rampa Randevu Saati',
    hazirlikZamani: 'Rampadan 30 Dk Önce',
    akilliFisilti: '🏬 WMS sisteminde lot, seri ve SKT eşleşmesi yapılmadan rampa mal kabulü tamamlanamaz; hasarlı palet sarı karantinaya alınır.',
    oncedenYapilacaklar: [
      'Rampa randevu (Dock Appointment) saatinde yanaş, teker takozunu koy ve kontak anahtarını güvenliğe teslim et',
      'Sevk irsaliyesi ile koli/palet adetlerini RF el terminaliyle barkod taratarak WMS sistemine işle',
      'Hasarlı, ıslak veya devrilmiş paletleri derhal sarı karantina alanına çekip fotoğraflı tutanak tut',
      'SKT kontrolü ile FEFO (First Expired First Out) kuralına göre paletleri adresli raf gözlerine yerleştir'
    ]
  },
  {
    id: 'lojistik_vgm_konteyner_demuraj',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['vgm', 'konteyner', 'demuraj', 'detention', 'ardiye', 'free time', 'bolt seal', 'cıvata mühür', 'eir', 'liman konteyner'],
    baslik: 'Konteyner VGM Tartım & Demuraj / Detention',
    ikon: '🚢',
    renk: '#CFFAFE',
    varsayilanZaman: 'Liman Girişi',
    hazirlikZamani: 'Tartımdan 2 Saat Önce',
    akilliFisilti: '🚢 SOLAS VGM sertifikası olmayan konteyner gemiye yüklenemez; free time aşımı günlük yüksek demuraj ve ardiye cezası üretir.',
    oncedenYapilacaklar: [
      'SOLAS Chapter VI gereği kantar istasyonundan onaylı Doğrulanmış Brüt Ağırlık (VGM) sertifikasını al',
      'ISO 17712 uyumlu yüksek güvenlikli cıvata mührünü (Bolt Seal) konteyner kapısına takıp konşimentoya işlet',
      'Acente serbest süresini (Free Time gün sayısı) takip ederek demuraj ve ardiye risk saati öncesi boşalt',
      'Boş konteyneri acente deposuna iade ederken EIR (Equipment Interchange Receipt) formuyla hasarsız teslim al'
    ]
  },
  {
    id: 'lojistik_pretrip_kingpin_kantar',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['pre-trip', 'king-pin', 'kingpin', 'beşinci teker', 'dorse pleyt', 'lastik basıncı', 'kantar tartım', 'aks ağırlığı', 'tonaj aşımı'],
    baslik: 'Ağır Vasıta Pre-Trip & Aks Kantar Kontrolü',
    ikon: '🚛',
    renk: '#FED7AA',
    varsayilanZaman: 'Kalkıştan 45 Dk Önce',
    hazirlikZamani: 'Kalkış Öncesi',
    akilliFisilti: '🚛 Dorse king-pin pleyt kilit mandalı fiziki kontrol edilmeden ve aks kantarı ölçülmeden yola çıkılması hayati tehlikedir.',
    oncedenYapilacaklar: [
      'Beşinci tekerlek (pleyt) king-pin kilidinin oturduğunu ve emniyet mandalının kilitlendiğini gözle doğrula',
      'Kırmızı ve sarı spiral hava fren hortumlarını, ABS/EBS elektrik soketlerini dorseye bağla',
      'Lastiklerin soğuk hava basınçlarını (110-120 PSI) ve diş derinliklerini (en az 1.6 mm / kış 4 mm) kontrol et',
      'Karayolları 40/44 ton sınırını aşmamak için kantar fişiyle çekici ve dorse aks yük dağılımını denetle'
    ]
  },
  {
    id: 'lojistik_lashing_spanzet',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['lashing', 'spanzet', 'yük emniyeti', 'gergi kayışı', 'cırcırlı kayış', 'en 12195', 'kaymaz paspas', 'köşe koruyucu', 'yük bağlama'],
    baslik: 'EN 12195 Yük Emniyeti & Lashing Planı',
    ikon: '⛓️',
    renk: '#E2E8F0',
    varsayilanZaman: 'Yükleme Bitimi',
    hazirlikZamani: 'Yükleme Esnasında',
    akilliFisilti: '⛓️ EN 12195 standardı gereği palet altı kaymaz kauçuk paspaslar yerleştirilmeli ve ilk 30 km sonra spanzet gergisi kontrol edilmelidir.',
    oncedenYapilacaklar: [
      'Palet ve rulo yüklerin altına sürtünme katsayısını artıran EN 12195 standardı kaymaz kauçuk paspaslar ser',
      'Kayış kesilmesini ve koli ezilmesini önlemek için plastik köşe koruyucuları palet kenarlarına yerleştir',
      'Spanzet cırcırlarını (ratchet) LC çekme kapasitesine göre gerdir ve şasi kancalarına tam oturt',
      'Kalkıştan sonraki ilk 25-50 km mesafede güvenli cebe girerek yük kayışlarının gerginliğini yeniden sık'
    ]
  },
  {
    id: 'lojistik_hava_kargo_iata',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['hava kargo', 'air cargo', 'iata', 'dgr', 'awb', 'air waybill', 'uld', 'kargo uçağı', 'bilinen gönderici'],
    baslik: 'Hava Kargo & IATA DGR Operasyonu',
    ikon: '✈️',
    renk: '#DDD6FE',
    varsayilanZaman: 'Uçuş Öncesi Teslim',
    hazirlikZamani: 'Uçuştan 6 Saat Önce',
    akilliFisilti: '✈️ IATA kuralları gereği tehlikeli madde içeren hava kargolarda DGD beyanı ve ULD kontur ölçüleri zorunludur.',
    oncedenYapilacaklar: [
      'Master AWB ve House AWB konşimento numaralarını kargo etiketleri ve çeki listesiyle eşleştir',
      'Tehlikeli madde içeren kargolarda IATA DGR kurallarına uygun Shipper\'s Declaration (DGD) föyünü tanzim et',
      'ULD (uçak konteyneri/paleti) kontur ölçülerini (aircraft contour) ve brüt ağırlık tartımını yap',
      'Havalimanı antrepo X-Ray güvenlik taramasını ve gümrük beyannamesi kapama onayını al'
    ]
  },
  {
    id: 'lojistik_intermodal_roro_swap',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['intermodal', 'ro-ro', 'ro-la', 'swap body', 'swap-body', 'kombine taşımacılık', 'treyler vinçleme', 'twist-lock', 'cim'],
    baslik: 'İntermodal & Ro-Ro / Ro-La Taşımacılığı',
    ikon: '🚆',
    renk: '#FEF08A',
    varsayilanZaman: 'Terminal Girişi',
    hazirlikZamani: 'Gemi/Tren Öncesi 3 Saat',
    akilliFisilti: '🚆 Ro-Ro güvertesinde çekici ayakları kilitlenmeli, Ro-La vagon yüklemesinde P400 gabari yüksekliği denetlenmelidir.',
    oncedenYapilacaklar: [
      'Ro-Ro gemi yüklemesinde dorse şasi lashing halkalarını ve çekici ayaklarını gemi güvertesine bağla',
      'Demiryolu Ro-La vagon yüklemesinde P400 gabari yüksekliğini ve treyler vinçleme ceplerini kontrol et',
      'Swap-body konteyner twist-lock kilitlerinin şasiye oturduğunu ve mandalların emniyete alındığını teyit et',
      'Demiryolu CIM taşıma senedini ve intermodal aktarma liman giriş barkodunu sürücüye teslim et'
    ]
  },
  {
    id: 'lojistik_lastmile_kurye_dagitim',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['last-mile', 'last mile', 'son kilometre', 'kurye', 'paket dağıtım', 'rota optimizasyonu', 'teslimat kodu', 'pod'],
    baslik: 'Son Kilometre Dağıtım & Teslimat (POD)',
    ikon: '📦',
    renk: '#DCFCE7',
    varsayilanZaman: 'Dağıtım Saati',
    hazirlikZamani: 'Yola Çıkıştan 15 Dk Önce',
    akilliFisilti: '📦 Alıcıya SMS teslimat penceresi gönderilmeli, temassız teslimat kodu veya dijital imza (POD) alınmadan paket teslim edilmemelidir.',
    oncedenYapilacaklar: [
      'Günlük dağıtım manifestosunu adres kümeleme ve trafik yoğunluğuna göre navigasyonda optimize et',
      'Alıcıya tahmini teslimat penceresini (ETA time-window) ve 4 haneli SMS teslimat kodunu ilet',
      'Kapıda teslimatta alıcı kodunu el terminaline gir veya dijital teslimat kanıtı (POD) imzasını kaydet',
      'Adreste bulunamayan veya hasarlı paketleri gün sonunda şube iade karantinasına teslim tutanağıyla bırak'
    ]
  },
  {
    id: 'lojistik_tuvturk_takograf_kalibrasyon',
    category: 'arac_ulasim',
    domain: 'LOJISTIK',
    keywords: ['tüvtürk muayene', 'tuvturk', 'ağır vasıta muayene', 'takograf kalibrasyon', 'k2 belgesi', 'psikoteknik', 'filo bakım'],
    baslik: 'TÜVTÜRK Muayene & Takograf Kalibrasyonu',
    ikon: '🔧',
    renk: '#FEF3C7',
    varsayilanZaman: 'Muayene Randevusu',
    hazirlikZamani: 'Randevudan 1 Gün Önce',
    akilliFisilti: '🔧 Ağır vasıta TÜVTÜRK muayenesi öncesi fren test merdanesi ölçümü ve 2 yıllık takograf periyodik kalibrasyon etiketi şarttır.',
    oncedenYapilacaklar: [
      'Yetkili serviste fren test merdanesiyle ön/çekici/dorse fren sapma yüzdesinin <%30 olduğunu doğrula',
      'Dijital takografın 2 yıllık periyodik kalibrasyonunu (W katsayısı ve plaka eşleşmesi) yetkili serviste yenilet',
      'K1/C2/L2 yetki belgesi taşıt kartı vizesini ve araç Zorunlu Trafik Sigortası poliçesini kontrol et',
      'Şoförlerin SRC mesleki yeterlilik ve psikoteknik değerlendirme raporlarının geçerliliğini filo sisteminde onayla'
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
    id: 'ticaret_veresiye_alacak',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['veresiye', 'deftere yaz', 'açık hesap', 'veresiye defteri', 'müşteri borcu', 'alacak tahsilat', 'hesaba yaz'],
    baslik: 'Veresiye / Müşteri Alacağı & Vade',
    ikon: '📓',
    renk: '#FEF3C7',
    varsayilanZaman: '14 Gün Sonra Vade',
    hazirlikZamani: '7. Gün Ara Bakiye Teyidi',
    akilliFisilti: '📓 Veresiye kayıtlarında ürün detayı ve vade tarihi açıkça belirtilmeli; 14 günlük vade aşılmadan ara teyit yapılmalıdır.',
    oncedenYapilacaklar: [
      'Deftere veya sisteme müşteri adı, borç kalemi, telefon ve net tutarı kaydet',
      'Müşteriye WhatsApp/SMS ile borç dökümü ve fiş detayını nezaketle teyit ettir',
      '7. günde ara bakiye kontrolü yaparak ihtilaflı kalem olup olmadığını gözden geçir',
      '14. gün vade bitiminde nazik bir hatırlatma ve hesap kapatma mesajı ilet'
    ]
  },
  {
    id: 'ticaret_toptanci_mal_kabul',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['toptancı geldi', 'mal kabul', 'koli geldi', 'irsaliye kontrolü', 'fatura geldi', 'gelen mal', 'koli indirdik'],
    baslik: 'Toptancı Mal Kabulü & İrsaliye',
    ikon: '📦',
    renk: '#FEF3C7',
    varsayilanZaman: 'Mal Kabul Anında',
    hazirlikZamani: 'Sipariş Listesiyle Karşılaştırma',
    akilliFisilti: '📦 Şoförün yanında irsaliye şerhi düşülmeyen eksik veya hasarlı malların sonradan toptancıya iadesi kabul edilmez; STT ve adet kontrolü zorunludur.',
    oncedenYapilacaklar: [
      'Şoför ayrılmadan gelen fiziki koli/kasa adedini ve ambalaj bütünlüğünü say',
      'İrsaliyedeki ürün çeşitlerini, adetleri ve birim fiyatları sipariş fişiyle tek tek eşleştir',
      'Raf ömrü olan ürünlerde Son Tüketim Tarihi (STT) ve parti numarasını denetle',
      'Varsa eksik, ezik veya kırık ürünleri irsaliye nüshasına şerh düşüp şoföre imzalatarak iade tutanağı düzenle',
      'Teslim alınan sağlam malları depoya FIFO (ilk giren ilk çıkar) kuralıyla yerleştir'
    ]
  },
  {
    id: 'ticaret_toptanci_siparis',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['toptancıya sipariş', 'eksik listesi', 'stok sayımı', 'mal siparişi', 'toptancı günü', 'koli sipariş', 'sipariş geç'],
    baslik: 'Toptancı Siparişi & Eksik Listesi',
    ikon: '📋',
    renk: '#FEF3C7',
    varsayilanZaman: 'Toptancı Gelmeden 1 Gün Önce',
    hazirlikZamani: 'Hızlı Tüketim & Raf Kontrolü',
    akilliFisilti: '📋 Toptancı gününden önce eksik sayımı yapılmazsa raf boşluğu ciro kaybına, gereksiz fazla sipariş ise nakit sıkışıklığına yol açar.',
    oncedenYapilacaklar: [
      'Kritik stok seviyesinin altına düşen raf ve depo ürünlerini sayarak listele',
      'Hızlı tüketilen çok satan (A grubu) ürünlerin tükenme hızını ve raf payını kontrol et',
      'Toptancının vadeli iskonto veya promosyonlu koli kampanyalarını değerlendir',
      'Net sipariş listesini toptancı temsilcisine WhatsApp veya sipariş portalından teyitli ilet'
    ]
  },
  {
    id: 'ticaret_cek_senet_vade',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['çek ödemesi', 'senet ödemesi', 'toptancı çeki', 'çek vadesi', 'senet vadesi', 'vade ödemesi', 'çek var', 'senet var'],
    baslik: 'Toptancı Çek / Senet & Vade Ödemesi',
    ikon: '💸',
    renk: '#FEE2E2',
    varsayilanZaman: 'Vadeden 1 Gün Önce (Nakit Akışı)',
    hazirlikZamani: 'Takas Saati (11:00) Öncesi Bakiye',
    akilliFisilti: '💸 Çek ve senet vadelerinde 1 gün önceden nakit provizyonu sağlanmazsa karşılıksız işlem cezası, protesto ve banka kredi sicili bozulması riski doğar.',
    oncedenYapilacaklar: [
      'Takas saati (11:00) öncesinde banka hesabındaki nakit bakiyeyi ve provizyon limitini teyit et',
      'Vadesi gelen çek/senet tutarını toptancı cari hesap mutabakatıyla eşleştir',
      'Havale/EFT yapılacaksa banka günlük EFT işlem limitlerini kontrol et',
      'Ödeme dekontunu ve tahsil makbuzunu cari hesap dosyasına arşivle'
    ]
  },
  {
    id: 'ticaret_kasa_avans_acilis',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['kasa avansı', 'kasa açılışı', 'bozuk para', 'bozukluk kalmadı', 'pos rulosu', 'sabah kasası', 'yazarkasa rulosu'],
    baslik: 'Kasa Açılışı & Bozuk Para Avansı',
    ikon: '🪙',
    renk: '#DCFCE7',
    varsayilanZaman: 'Açılış 08:30 (Vardiya Başı)',
    hazirlikZamani: 'Açılış Öncesi Sayım',
    akilliFisilti: '🪙 Güne bozuk para avansı ve yedek POS rulosu olmadan başlamak ilk müşteride para üstü verememe ve satış kaçırma krizine yol açar.',
    oncedenYapilacaklar: [
      'Madeni para ve küçük kupürlü kağıt para avansını sayarak yazar kasa sistemine gir',
      'Yazar kasa ve POS terminallerinin termal rulo seviyelerini kontrol et, yedeği çekmeceye koy',
      'Banka POS cihazlarının gün başı provizyon sinyalini ve internet bağlantısını test et',
      'Sahte para kontrol dedektörünü / mor ışığı bankoda hazırla'
    ]
  },
  {
    id: 'ticaret_teklif_sicak_takip',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['satış teklif', 'teklif takibi', 'fiyat teklifi', 'müşteri arama', 'teklif attım', 'opsiyon süresi', 'teklif verdik', 'follow-up'],
    baslik: 'Teklif Sıcak Takibi (Follow-Up)',
    ikon: '💼',
    renk: '#FEF3C7',
    varsayilanZaman: '24-48 Saat Sonra',
    hazirlikZamani: 'Görüşme Öncesi Notlar',
    akilliFisilti: '💼 Gönderilen teklifin 24-48 saat içinde nazikçe sorgulanması kapanış oranını %40 artırır; opsiyon süresi ve stok rezervasyonu unutulmamalıdır.',
    oncedenYapilacaklar: [
      'Müşteriye gönderilen teklifin ulaştığını ve opsiyon/fiyat geçerlilik süresini teyit et',
      'Teklifteki ürünlerin tükenmemesi için depo sistemine geçici stok rezervasyonu gir',
      '24-48 saat sonra arayarak soruları yanıtla, müşteri endişelerini gider ve karar sürecini nazikçe yokla',
      'Teklife tamamlayıcı sarf, garanti uzatımı veya montaj çapraz satış (cross-sell) alternatiflerini sun'
    ]
  },
  {
    id: 'ticaret_kasa_z_raporu',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['z raporu', 'kasa sayımı', 'pos gün sonu', 'kasa kapat', 'gün sonu hasılat', 'ara kasa tahliye', 'dükkanı kapattık'],
    baslik: 'Gün Sonu Kasa, Z Raporu & POS Mutabakatı',
    ikon: '🧾',
    renk: '#DCFCE7',
    varsayilanZaman: 'Kapanış 20:30',
    hazirlikZamani: 'Kapanıştan 15 Dk Önce (Ara Tahliye)',
    akilliFisilti: '🧾 Kasa açığı veya fazlası oluşmaması için Z raporu mali cirosu, POS gün sonu slipleri ve fiziki nakit mutabakatı her akşam sıcağı sıcağına yapılmalıdır.',
    oncedenYapilacaklar: [
      'Gün içinde biriken büyük kupürler için ara kasa tahliyesi tutarını denetle',
      'Tüm banka POS terminallerinden tek tek Gün Sonu slip dökümlerini al',
      'Mali yazar kasadan günlük Z Raporu çıktısını al ve tarihli koçana zımbala',
      'Kasada kalan avans bozuk parayı ayırıp günün net nakit cirosunu say ve Z raporuyla kuruşu kuruşuna mutabakat yap',
      'Ertesi günün açılış avansını çekmecede bırakıp net hasılatı çelik kasaya kilitle'
    ]
  },
  {
    id: 'ticaret_esnaf_ay_sonu',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['bağkur', 'bağ-kur', 'dükkan kirası', 'stopaj ödemesi', 'muhasebeciye fatura', 'esnaf mali', 'fatura teslim', 'z raporu teslim'],
    baslik: 'Esnaf Mali Takvimi (Kira, Bağ-Kur & Muhasebe)',
    ikon: '🏪',
    renk: '#FEF3C7',
    varsayilanZaman: 'Ayın 20\'si Evrak / Ay Sonu Ödeme',
    hazirlikZamani: 'Fatura & Z Raporu Dosyalama',
    akilliFisilti: '🏪 Dükkan kiralarının elden ödenmesi Vergi Usul Kanununa göre usulsüzlük cezası doğurur; Bağ-Kur ödemelerinin aksatılması prim teşvikini yakar.',
    oncedenYapilacaklar: [
      'Ayın 15-20\'si: Alış/satış faturalarını, POS sliplerini ve aylık Z raporlarını muhasebeciye teslim et',
      'Dükkan kira ödemesini yasa gereği mutlaka banka üzerinden "Kira Ödemesi" açıklamasıyla havale et',
      'Ayın son gününe kadar Bağ-Kur primini ve SGK çalışan primlerini bankadan/GİB\'den öde',
      'Muhasebeciden gelen KDV ve Stopaj (Muhtasar) tahakkuk fişlerinin ödemesini gerçekleştir'
    ]
  },
  {
    id: 'ticaret_tamir_usta_servis',
    category: 'ev_teknik',
    domain: 'TICARET',
    keywords: ['oto tamir', 'balata değişimi', 'yağ değişimi', 'obd arıza', 'arıza kodu', 'torklama', 'parça değişimi', 'oto servis', 'fren testi'],
    baslik: 'Araç / Cihaz Onarımı & Teslimat Protokolü',
    ikon: '🔧',
    renk: '#FEF3C7',
    varsayilanZaman: 'Teslimattan 45 Dk Önce (Test & OBD)',
    hazirlikZamani: 'Onarım Öncesi (Müşteri Onayı)',
    akilliFisilti: '🔧 Müşteri onayı alınmayan ilave parça değişimi hukuki ihtilaf doğurur; teslimat öncesi tork kontrolü ve OBD testi can güvenliği gereğidir.',
    oncedenYapilacaklar: [
      'Müşteri yazılı/sözlü teyidi ve tahmini parça/işçilik bütçe mutabakatı almadan söküme başlama',
      'Takılacak orijinal/OEM parçanın fatura, garanti belgesi ve eski çıkan parçayı müşteriye ayır',
      'Teslimattan 45 dk önce: Tork anahtarıyla kritik bağlantıları sık ve OBD cihazıyla arıza hafızasını sıfırla',
      'Sıvı kaçak kontrolü ve 5 km kısa yol testi gerçekleştirip aracı teslimat alanına çek'
    ]
  },
  {
    id: 'ticaret_reyon_etiket_iade',
    category: 'finans',
    domain: 'TICARET',
    keywords: ['fiyat etiketi', 'etiket kontrolü', 'raf fiyatı', 'ürün iadesi', 'değişim fişi', 'müşteri iadesi', 'reyon düzeni'],
    baslik: 'Reyon Etiket Kontrolü & İade / Değişim',
    ikon: '🏷️',
    renk: '#DCFCE7',
    varsayilanZaman: 'Haftalık Kontrol / İade Anında',
    hazirlikZamani: 'Barkod Karşılaştırması',
    akilliFisilti: '🏷️ Raf fiyatı ile kasa fiyatı arasındaki farklar Tüketici Hakem Heyeti ve Ticaret Bakanlığı denetiminde idari para cezasına tabidir.',
    oncedenYapilacaklar: [
      'Reyondaki raf etiket fiyatları ile kasa barkod sistemindeki fiyatları tek tek eşleştir',
      'İade veya değişim talebinde satış fişi/faturayı kontrol et ve ürünün ambalaj/hasar durumunu incele',
      'İade alınan ürün için iade gider pusulası düzenle ve ürünü hasarlı/sağlam reyonuna ayır',
      'Vitrin ve çok satan öne çıkan ürünlerin reyon aydınlatması ve dizilimini tazele'
    ]
  },

  // 25. ZİRAAT & BOTANİK MOTORU (AGRICULTURE & BOTANY SUITE)
  {
    id: 'ziraat_aksam_sulama',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['çiçek sula', 'sulama', 'bahçe sula', 'suvarıver', 'sulayuver', 'çiçekler susamış', 'domates sula', 'bostan sula', 'saksı sula', 'verive gari'],
    baslik: 'Akşam Serinliği Sulaması',
    ikon: '🌿',
    renk: '#DCFCE7',
    varsayilanZaman: 'Akşam 19:30',
    hazirlikZamani: 'Güneş Battıktan Sonra',
    akilliFisilti: '☀️ Güneş altında sulanan yapraklar mercek etkisiyle yanar ve kökler haşlanır; sulama daima akşam serinliğinde yapılmalıdır.',
    oncedenYapilacaklar: [
      'Toprağın 3-4 cm derinine parmak batırarak nem kontrolü yap (ıslaksa sulama yapma)',
      'Güneşin tamamen batmasını ve saksı/toprak sıcaklığının düşmesini bekle (19:30)',
      'Suyu doğrudan yapraklara değil, kök boğazına dinlendirilmiş kireçsiz suyla ver',
      'Saksı tabağında biriken fazla suyu kök çürümesini önlemek için 15 dakika sonra boşalt'
    ]
  },
  {
    id: 'ziraat_orkide_daldirma',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['orkide sulama', 'orkide bakım', 'orkide su', 'orkide kökleri gri', 'daldırma sulama'],
    baslik: 'Orkide Daldırma Sulama Protokolü',
    ikon: '🌸',
    renk: '#FDF2F8',
    varsayilanZaman: 'Yarın Sabah 09:30',
    hazirlikZamani: 'Sabah Filtrelenmiş Gün Işığı',
    akilliFisilti: '🌸 Orkideler gece ıslak kalırsa ve tabakta su bekletilirse hızla kök mantarı oluşur; işlem sabah 10-15 dk daldırma yöntemiyle yapılmalıdır.',
    oncedenYapilacaklar: [
      'Şeffaf saksıdaki köklerin gümüş-griye döndüğünü kontrol et (Kökler canlı yeşilse sulama yapma)',
      'Oda sıcaklığındaki dinlenmiş kireçsiz su dolu kaba şeffaf saksıyı 10-15 dakika daldır',
      'Sudan çıkarıp tüm fazla suyun tamamen süzülmesini bekle (Damlamasın)',
      'Yaprak göbeğine su kaçtıysa peçeteyle kurula ve tül arkası aydınlık konuma yerleştir'
    ]
  },
  {
    id: 'ziraat_ilaclama_ruzgar_phi',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['zirai ilaçlama', 'ilaçlama', 'pestisit', 'fungisit', 'kırmızı örümcek', 'yaprak biti', 'phi süresi', 'böcek ilacı'],
    baslik: 'Zirai İlaçlama & Meteoroloji Takibi',
    ikon: '🧪',
    renk: '#DCFCE7',
    varsayilanZaman: 'Sabah 07:00 (Rüzgarsız Saat)',
    hazirlikZamani: 'İlaçlama Öncesi 45 Dk (06:15)',
    akilliFisilti: '⚠️ Rüzgarlı havada ilaçlama sürüklenme zehirlenmesine, yağmur ise ilacın yıkanmasına yol açar. PHI hasat bekleme süresine titizlikle uyulmalıdır.',
    oncedenYapilacaklar: [
      'Meteoroloji rüzgar hızını (<10 km/s) ve 24 saatlik yağışsızlık durumunu teyit et',
      'Kimyasal buhar maskesi (A2P3), koruyucu tulum, gözlük ve nitril eldiven donanımını kuşan',
      'İlaçlama suyu pH değerini (5.5 - 6.5 aralığı) kontrol et; etiket reçete dozajını aşma',
      'Komşu arıcılara haber ver; etiket üzerindeki PHI (son ilaçlama ile hasat arası bekleme) gününü kaydet',
      'Pülverizatör tankı ve memelerini uygulama bitiminde bol temiz suyla yıkayarak arındır'
    ]
  },
  {
    id: 'ziraat_budama_bordo_bulamaci',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['ağaç budama', 'budama', 'bordo bulamacı', 'aşı macunu', 'ardıç katranı', 'zeytin budama', 'meyve budama'],
    baslik: 'Budama & Bordo Bulamacı Protokolü',
    ikon: '✂️',
    renk: '#FEF3C7',
    varsayilanZaman: 'Sabah 08:30 (Budama Sonrası)',
    hazirlikZamani: 'Budamadan Hemen Sonra (İlk 48 Saat)',
    akilliFisilti: '🌳 Kalın kesik yüzeyleri aşı macunuyla kapatılmazsa ve aletler dezenfekte edilmezse ağaçlar dal kanseri (Pseudomonas) kapar.',
    oncedenYapilacaklar: [
      'Budama makası, testere ve aletleri %10 çamaşır suyu veya alkolle dezenfekte et',
      'Kuru, hastalıklı, obur ve içe bakan dalları tırnak bırakmadan dipten kes',
      '2 cm üzerindeki kalın kesim yaralarını aşı macunu (ardıç katranı) ile hava almayacak şekilde kapat',
      'Budama biter bitmez gövdeye bakteri/mantar girişini önleyen %1.5-2 Bordo Bulamacı püskürt',
      'Budanan hastalıklı dal artıklarını bahçeden uzaklaştırarak imha et'
    ]
  },
  {
    id: 'ziraat_damlama_fertigasyon',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['damlama sulama', 'fertigasyon', 'taban gübresi', 'yaprak gübresi', 'damlatıcı tıkandı', 'asit şoku'],
    baslik: 'Damlama Sulama & Fertigasyon Protokolü',
    ikon: '💧',
    renk: '#DCFCE7',
    varsayilanZaman: 'Sabah 08:00 (Damlama Döngüsü)',
    hazirlikZamani: 'Sulama Öncesi Filtre & Basınç Kontrolü',
    akilliFisilti: '💧 Fertigasyon sonrasında damlama borularına temiz su basılmazsa damlatıcı memeleri gübre tuzları ve kireçle kalıcı olarak tıkanır.',
    oncedenYapilacaklar: [
      'Toprak ve yaprak tahlili sonuçlarına göre N-P-K gübre dozunu fertigasyon tankında tamamen erit',
      'İlk 15-20 dakikada hatları temiz suyla doldurup manometreden çalışma basıncını (1.5-2.0 bar) sağla',
      'Gübre enjeksiyonu bittikten sonra hatlarda kristal kalmaması için 20-30 dakika temiz su bas',
      'Damlatıcıların tıkanmaması için disk/kum filtrelerini ters yıkama (backwash) yaparak temizle',
      'Sezonluk kireç birikimlerine karşı damlama borularına düşük doz fosforik/nitrik asit şoku ver'
    ]
  },
  {
    id: 'ziraat_don_nobeti_sera',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['zirai don', 'don tehlikesi', 'serayı ısıt', 'don nöbeti', 'dona karşı sulama', 'don vuracak'],
    baslik: 'Zirai Don Nöbeti & Sera Isıtma Alarmı',
    ikon: '❄️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Gece Don Nöbeti (03:30)',
    hazirlikZamani: 'Akşam 21:00 (Termometre & Soba)',
    akilliFisilti: '❄️ Kuru toprak gece ıslak topraktan 1.5 - 2°C daha soğuk olur; don gecesinde don pervaneleri ve nem kritik hayati koruma sağlar.',
    oncedenYapilacaklar: [
      'Gece sıcaklıklarının 0°C ve altına düşüş hızını seradaki dijital termometreden anlık takip et',
      'Seralarda soba veya sıcak hava üreteçlerini saat 02:00 itibarıyla ateşle',
      'Açık meyve bahçelerinde don öncesi hafif sulama yap (Islak toprak gündüz ısısını geceye taşır)',
      'Aşırı don riskinde üstten yağmurlama sisleme sistemini açarak donma gizli ısısıyla tomurcukları koru',
      'Don hasarı sonrasında bitkinin toparlanması için yapraktan amino asit ve deniz yosunu takviyesi ver'
    ]
  },
  {
    id: 'ziraat_cks_tarsim_sigorta',
    category: 'resmi',
    domain: 'ZIRAAT',
    keywords: ['çks', 'cks', 'tarsim', 'çiftçi kayıt sistemi', 'tarım sigortası', 'mazot gübre desteği', 'ürün sigortası'],
    baslik: 'ÇKS Yenileme & TARSİM Sigorta Protokolü',
    ikon: '🌾',
    renk: '#FEF3C7',
    varsayilanZaman: 'Başvuru Dönemi (Mesai 16:00)',
    hazirlikZamani: 'Evrak Hazırlığı (Ziraat Odası & Tapu)',
    akilliFisilti: '🌾 ÇKS kaydı süresinde yenilenmeyen araziler mazot-gübre devlet desteğinden ve TARSİM prim indiriminden faydalanamaz.',
    oncedenYapilacaklar: [
      'Güncel tapu fotokopileri, muvafakatnameler ve kira sözleşmelerini bağlı bulunulan Ziraat Odasına onaylat',
      'İlçe Tarım ve Orman Müdürlüğüne ÇKS formlarını ve parsel beyanlarını teslim et',
      'TARSİM yetkili acentesinden don, dolu, fırtına ve yangın risk teminat poliçesini son tarihten önce kestir',
      'Doğal afet hasarı oluştuğunda en geç 10 gün içinde TARSİM çağrı merkezine ihbarda bulunarak ekspertiz talep et',
      'e-Devlet üzerinden Mazot-Gübre ve prim destekleme hakediş durumunu sorgula'
    ]
  },
  {
    id: 'ziraat_fidan_dikimi_cansuyu',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['fidan diktik', 'fidan dikimi', 'ağaç diktik', 'tüplü fidan', 'can suyu', 'fidan aldık'],
    baslik: 'Fidan Dikimi & Can Suyu Protokolü',
    ikon: '🌱',
    renk: '#DCFCE7',
    varsayilanZaman: 'Dikimden Hemen Sonra (İlk 24 Saat)',
    hazirlikZamani: 'Dikim Çukuru & Herek Hazırlığı',
    akilliFisilti: '🌱 Fidan aşı noktası toprağa gömülürse fidan asil kök verir, yabani anacın özelliği kaybolur veya gövde çürüyerek fidan kurur.',
    oncedenYapilacaklar: [
      'Dikim çukurunu fidan kökünden 2 kat geniş ve derin kaz; tabanına yanmış çiftlik gübresi harmanla',
      'Açık köklü fidanlarda kök tuvaleti yap (Ezilmiş ve hasarlı kökleri steril makasla buda)',
      'Fidan aşı noktasının toprak yüzeyinden en az 5-10 cm yukarıda kalmasına dikkat et (Aşı boğulmasın)',
      'Fidanı rüzgar yönüne göre destek hereğine (kazığa) 8 şeklinde esnek iple bağla',
      'Topraktaki hava boşluklarını kapatmak ve kökü sabitlemek için bol miktarda ilk CAN SUYU ver'
    ]
  },
  {
    id: 'ziraat_cim_verticut_havalandirma',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['çim biçme', 'cim bicme', 'çim havalandırma', 'verticut', 'çim sulama', 'çim sarardı'],
    baslik: 'Çim Alan Bakımı & Verticut Protokolü',
    ikon: '🌱',
    renk: '#DCFCE7',
    varsayilanZaman: 'Sabah Erken 07:30 (Çim Bakımı)',
    hazirlikZamani: 'Bıçak Bileme & Zemin Kontrolü',
    akilliFisilti: '🌱 Çimler akşam sulanırsa sabaha kadar ıslak kalan yapraklarda kahverengi yama (Brown Patch) ve pas mantarı oluşur.',
    oncedenYapilacaklar: [
      'Çim biçme makinesinin bıçaklarının keskin olduğunu kontrol et (Kör bıçak çim ucunu parçalar ve sarartır)',
      'Çim boyunun 1/3\'ünden fazlasını tek seferde kesme (Bitkiyi strese sokmamak için kademeli biç)',
      'Çimleri sabah erken saatte sula; akşam sulamasından kaçın (Sabaha kadar ıslak yaprak pas ve mantar yapar)',
      'Yılda iki kez keçe tabakasını temizlemek için verticut havalandırma ve silindirleme yap',
      'Seyrelen kel bölgelere ara ekim tohumu serpip üzerini ince elenmiş torf ve silis kumla ört'
    ]
  },
  {
    id: 'ziraat_kaktus_sukulent_kurakcil',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['kaktüs sulama', 'kaktus', 'sukulent', 'paşa kılıcı', 'yılan bitkisi', 'kaktüs bakım'],
    baslik: 'Kaktüs & Sukulent Kurakçıl Bakım',
    ikon: '🌵',
    renk: '#FEF3C7',
    varsayilanZaman: 'Sabah 10:00 (2-3 Haftada Bir)',
    hazirlikZamani: 'Tam Kuruluk Testi Sonrası',
    akilliFisilti: '🌵 Kaktüs ve sukulentlerin en yaygın ölüm sebebi aşırı sulamadır; toprak tamamen kurumadan kesinlikle su verilmemelidir.',
    oncedenYapilacaklar: [
      'Toprağın saksı dibine kadar tamamen kuruduğundan çöp şiş veya nem ölçerle emin ol',
      'Oda sıcaklığında dinlenmiş kireçsiz suyla sadece kök çevresine az miktarda su ver',
      'Gövdeye ve yaprak etli dokusuna su temas ettirme (Çürüme ve mantar lekesini önle)',
      'Saksı tabağında kesinlikle su bırakma, kış dinlenmesi döneminde sulamayı ayda bire düşür'
    ]
  },
  {
    id: 'ziraat_toprak_tahlili_numune',
    category: 'ev_teknik',
    domain: 'ZIRAAT',
    keywords: ['toprak tahlili', 'toprak analizi', 'toprak numunesi', 'gübre analizi', 'tarladan toprak'],
    baslik: 'Toprak Tahlili & Numune Alma Protokolü',
    ikon: '🧪',
    renk: '#DCFCE7',
    varsayilanZaman: 'Sonbahar / Ekim Öncesi',
    hazirlikZamani: 'Ekim Öncesi 30 Gün',
    akilliFisilti: '🧪 Gübreleme tahlil sonucuna göre yapılmazsa fazla gübre toprağı tuzlandırır ve bitki köklerini yakar.',
    oncedenYapilacaklar: [
      'Arazide zikzak (Z) çizerek homojen 10-15 farklı noktayı belirle (Yol kenarı ve gübre yığınından alma)',
      'Üst 3-5 cm bitki artıklarını sıyırıp V şeklinde 0-30 cm ve 30-60 cm derinlikte çukur kaz',
      'Çukurun yan duvarından kürekle 3-4 cm kalınlığında toprak dilimi kesip temiz plastik kovaya koy',
      'Tüm numuneleri kova içinde iyice harmanlayıp 1 kg\'lık temiz bez torbaya veya kilitli poşete aktar',
      'Mevki, ada/parsel, ön bitki ve ekilecek ürün etiketini poşetin içine ve dışına iliştirip yetkili laboratuvara teslim et'
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
  },

  // 32. BİLİŞİM MÜHENDİSLİĞİ & SİBER GÜVENLİK MOTORU (IT & CYBERSECURITY SUITE)
  {
    id: 'it_siem_kurulum_sunum',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['siem', 'siem kurulum', 'siem kurulumu', 'siemm', 'siemm kurulumu', 'siem sunumu', 'soc', 'log korelasyon'],
    matcher: (lower: string) =>
      (lower.includes('siem') || lower.includes('siemm') || lower.includes('soc')) &&
      (lower.includes('kurulum') || lower.includes('sunum') || lower.includes('poc') || lower.includes('artı') || lower.includes('kural') || lower.includes('müşteri')),
    baslik: 'SIEM Kurulumu & Müşteri Sunumu',
    ikon: '🛡️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Kurulum & Sunum Takvimi',
    hazirlikZamani: 'Kurulumdan 24 Saat Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '🛡️ SIEM projelerinde log kaynaklarının sürekliliği ve EPS lisansı kontrol edilmeli, sunum öncesi sahte alarm testi ile korelasyon doğrulanmalıdır.',
    oncedenYapilacaklar: [
      'SIEM log kaynaklarının (Syslog, Firewall, Windows Event, EDR) entegrasyonu ve agent kurulumu',
      'Kural seti, parsing/normalization ve korelasyon alarmlarının (Use-Case) konfigürasyonu',
      'Dashboard, SOC alarm paneli ve log saklama/indeksleme sağlığının doğrulanması',
      'Müşteri/Yönetim sunumu için POC raporu, tespit edilen kritik bulgular ve yönetici özeti hazırlığı',
      'Müşteriye canlı demo/sunum gerçekleştirilmesi ve UAT kabul tutanağının imzalatılması'
    ]
  },
  {
    id: 'it_firewall_kural_test',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['firewall', 'güvenlik duvarı', 'fortigate', 'palo alto', 'waf', 'kural testi', 'vpn tüneli'],
    baslik: 'Firewall & Ağ Güvenliği Yapılandırması',
    ikon: '🔥',
    renk: '#FEE2E2',
    varsayilanZaman: 'Konfigürasyon Saati',
    hazirlikZamani: '1 Saat Önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '🔥 Yeni firewall kuralı yazılırken Any-Any-Allow açılmamalı; kural öncesi ve sonrası log akışı doğrulanmalıdır.',
    oncedenYapilacaklar: [
      'Firewall erişim kuralı (ACL/Policy) ve NAT yapılandırmalarının yazımı',
      'IPS, SSL-Inspection ve Antivirus güvenlik profillerinin aktif edilmesi',
      'Site-to-Site IPsec veya SSL-VPN tünel bağlantı testi ve 2FA doğrulaması',
      'Kural çakışma (Shadow Rule) ve canlı trafik geçiş log testlerinin yapılması'
    ]
  },
  {
    id: 'it_active_directory_gpo',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['active directory', 'domain controller', 'gpo', 'ldap', 'ad kurulumu'],
    baslik: 'Active Directory & GPO Dağıtımı',
    ikon: '🏢',
    renk: '#E0F2FE',
    varsayilanZaman: 'Bakım Penceresi',
    hazirlikZamani: '2 Saat Önce',
    hazirlikSaatOncesi: 2,
    akilliFisilti: '🏢 GPO dağıtımlarında geniş kapsamlı OU uygulamadan önce test grubunda RSOP simülasyonu yapılmalıdır.',
    oncedenYapilacaklar: [
      'Domain Controller replikasyon sağlığı ve FSMO rolleri kontrolü',
      'Organizational Unit (OU) hiyerarşisi ve kullanıcı/grup yetkilendirmesi',
      'GPO parola karmaşıklığı, USB engelleme ve güvenlik kısıtlama dağıtımı',
      'İstemci makinelerde gpupdate /force ve RSOP politika uygulama testi'
    ]
  },
  {
    id: 'it_disaster_recovery_backup',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['veeam', 'disaster recovery', 'dr tatbikatı', 'yedekleme testi', 'dr testi', 'backup restore'],
    baslik: 'Yedekleme & DR Kurtarma Testi',
    ikon: '💾',
    renk: '#DCFCE7',
    varsayilanZaman: 'Planlanan DR Testi',
    hazirlikZamani: 'Testten 24 Saat Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '💾 Geri yüklenmeyen (Restore testi yapılmamış) yedek alınmış sayılmaz. Yılda en az 2 kez DR tatbikatı yapılmalıdır.',
    oncedenYapilacaklar: [
      '3-2-1 kuralı kontrolü: 3 kopya, 2 farklı medya, 1 offsite/bulut yedek',
      'Veeam snapshot ve incremental yedekleme zinciri bütünlük denetimi',
      'İzole laboratuvar ortamında (SureBackup/Sandbox) geri yükleme (Restore) testi',
      'RPO ve RTO sürelerinin hedeflenen SLA sınırlarında kaldığının raporlanması'
    ]
  },
  {
    id: 'it_cloud_k8s_deploy',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['kubernetes', 'k8s', 'docker', 'openshift', 'microservice', 'küme dağıtım'],
    baslik: 'Kubernetes & Bulut Dağıtımı',
    ikon: '☁️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Dağıtım Saati',
    hazirlikZamani: '1 Saat Önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '☁️ Resource limits tanımlanmamış podlar node üzerindeki diğer servislerin çökmesine yol açabilir.',
    oncedenYapilacaklar: [
      'K8s manifest/Helm chart konfigürasyonu ve ConfigMap/Secret denetimi',
      'Ingress controller, TLS sertifikası ve DNS yönlendirme ayarları',
      'Pod Resource Limit (CPU/Memory) ve HPA otomatik ölçekleme testi',
      'Rolling update sıfır kesinti pod geçişi ve liveness/readiness probe kontrolü'
    ]
  },
  {
    id: 'it_pentest_zafiyet_rapor',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['pentest', 'sızma testi', 'zafiyet tarama', 'vulnerability', 'owasp testi'],
    baslik: 'Sızma Testi & Zafiyet Raporu',
    ikon: '🎯',
    renk: '#FEE2E2',
    varsayilanZaman: 'Test Başlangıcı',
    hazirlikZamani: 'Testten 24 Saat Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '🎯 Pentest testleri öncesinde sistem yedekleri alınmalı ve test saatleri operasyon ekiplerine bildirilmelidir.',
    oncedenYapilacaklar: [
      'Kapsam belirleme, RoE (Rules of Engagement) ve yasal izin formunun imzalanması',
      'Dış/İç ağ zafiyet taraması (Vulnerability Scan) ve servis port keşfi',
      'OWASP Top 10 web/API güvenlik zafiyetlerinin manuel istismar ve kanıt toplama süreci',
      'Kritik/Yüksek seviye bulguların remediation (çözüm) önerileriyle yönetici raporuna dönüştürülmesi'
    ]
  },
  // 17. GELİŞMİŞ MESLEKİ SEZGİ SENARYOLARI (LEB DEMEDEN LEBLEBİYİ ANLAMA)
  {
    id: 'hukuk_tensip_zapti_cevap',
    category: 'resmi',
    domain: 'HUKUK',
    keywords: ['tensip zaptı', 'tensip zapti', 'tensip geldi', 'dava dilekçesi tebliği'],
    baslik: 'Tensip Zaptı & 2 Haftalık Cevap Süresi',
    ikon: '⚖️',
    renk: '#E0E7FF',
    varsayilanZaman: '2 Hafta Kesin Süre',
    hazirlikZamani: 'Süre Bitimine 3 Gün Kala',
    hazirlikSaatOncesi: 72,
    akilliFisilti: '⚖️ HMK uyarınca tensip zaptı tebliğinden itibaren cevap dilekçesi ve delil avansı süresi 2 haftadır.',
    oncedenYapilacaklar: [
      'HMK m. 127 uyarınca 2 haftalık kesin cevap süresini ve varsa ek süre talebini hesapla',
      'Tensip zaptındaki ara kararları ve delil/gider avansı vezne yatırma tutarını incele',
      'Müvekkilden savunma dayanağı ıslak imzalı delil ve tanık listesini temin et',
      'UYAP üzerinden cevap dilekçesini e-imzalı olarak mahkemeye sun ve derkenar al'
    ]
  },
  {
    id: 'hukuk_kesinlesen_icra_103',
    category: 'resmi',
    domain: 'HUKUK',
    keywords: ['icra takibi kesinleşti', 'icra kesinleşti', '103 davetiyesi', 'haciz talebi'],
    baslik: 'İcra Haciz Talebi & 103 Davetiyesi',
    ikon: '🏛️',
    renk: '#E0E7FF',
    varsayilanZaman: 'Derhal / 3 İş Günü',
    hazirlikZamani: '24 Saat İçinde',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '🏛️ İtiraz süresi dolup kesinleşen icra takibinde vakit kaybetmeden UYAP sorguları ve haciz talebi açılmalıdır.',
    oncedenYapilacaklar: [
      'UYAP üzerinden MERNİS, SGK çalışan, araç ve TAKBİS gayrimenkul sorgulaması yap',
      'Bankalara İİK 89/1 haciz ihbarnamesi müzekkeresi gönderilmesi talebi aç',
      'Borçluya İİK 103 davetiyesi çıkarılması ve menkul/gayrimenkul haciz şerhi işletilmesi',
      'Dosya kapak hesabı ve vekalet ücreti tahakkukunu denetle'
    ]
  },
  {
    id: 'it_vpn_ipsec_kesinti',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['vpn koptu', 'ipsec düştü', 'vpn kesildi', 'tünel koptu', 'site to site vpn'],
    baslik: 'IPsec / VPN Tünel Müdahalesi',
    ikon: '🛡️',
    renk: '#FEE2E2',
    varsayilanZaman: 'Acil Müdahale (SLA: 15 Dk)',
    hazirlikZamani: 'Derhal',
    akilliFisilti: '🛡️ VPN tünel kesintilerinde önce Faz 1/2 IKE Security Association ve WAN ISP ping durumu kontrol edilir.',
    oncedenYapilacaklar: [
      'Firewall üzerinde IKE Phase 1 ve Phase 2 durum loglarını kontrol et',
      'Uzak lokasyon WAN IP ping ve ISP hat erişilebilirliğini doğrula',
      'Pre-shared key (PSK), crypto profile ve lifetime süre uyumunu test et',
      'Yedek SD-WAN veya mobil APN failover hattının devreye girdiğini teyit et'
    ]
  },
  {
    id: 'it_ad_gpo_deployment',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['gpo basma', 'gpo dağıtımı', 'yeni sunucu kuruldu', 'active directory domain'],
    baslik: 'Domain & GPO Dağıtım Rutini',
    ikon: '💻',
    renk: '#E0F2FE',
    varsayilanZaman: 'Dağıtım Saati',
    hazirlikZamani: '1 Saat Önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '💻 GPO dağıtımı öncesinde test OU üzerinde gpupdate /force ve rsop.msc denetimi yapılmalıdır.',
    oncedenYapilacaklar: [
      'Yeni sunucuyu Active Directory domainine al ve doğru OU altına taşı',
      'Test grubu üzerinde gpupdate /force ile Group Policy etkinliğini doğrula',
      'EDR ve SIEM log iletim agentlarını kur ve merkezi konsoldan online teyidi al',
      'Veeam üzerinde yeni makine için otomatik yedekleme (Backup Job) tanımla'
    ]
  },
  {
    id: 'it_ssl_tls_renewal',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['ssl sertifikası bitiyor', 'ssl yenileme', 'tls sertifikası', 'wildcard ssl'],
    baslik: 'SSL / TLS Sertifika Yenileme',
    ikon: '🔒',
    renk: '#FEF3C7',
    varsayilanZaman: 'Süre Bitimine 7 Gün Kala',
    hazirlikZamani: '7 Gün Önce',
    hazirlikSaatOncesi: 168,
    akilliFisilti: '🔒 SSL sertifikası süresi dolduğunda tarayıcılar siteye erişimi "Güvenli Değil" uyarısıyla tamamen engeller.',
    oncedenYapilacaklar: [
      '2048-bit RSA veya ECC private key ile yeni CSR üret',
      'DNS TXT veya HTTP-01 doğrulama kaydını tamamla',
      'Nginx, Apache veya IIS web sunucu binding konfigürasyonunu güncelle',
      'HSTS başlıkları ve SSL Labs testinde A+ güvenlik derecesini doğrula'
    ]
  },
  {
    id: 'muhendislik_insaat_beton_kirim',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['beton döktük', 'beton döküldü', 'beton dökümü', 'kırım testi', 'küp numune', 'silindir numune', 'kürleme', 'beton kür'],
    baslik: 'Beton Dökümü & 7/28 Gün Kırım Testi',
    ikon: '🏗️',
    renk: '#FEF3C7',
    varsayilanZaman: '7. & 28. Gün Laboratuvar Kırımı',
    hazirlikZamani: 'İlk 3 Gün (Sabah/Akşam Kürleme)',
    hazirlikSaatOncesi: 72,
    akilliFisilti: '🏗️ TS EN 206 standardı uyarınca ilk 72 saat kürleme aksatılmamalı; 7. gün erken ve 28. gün nihai tasarım dayanımı basınç testleri laboratuvarda yapılmalıdır.',
    oncedenYapilacaklar: [
      'Küp/silindir beton numunelerinin şantiyede etiketlenmesi ve standart su kür havuzuna alınması',
      'İlk 72 saat boyunca günde en az iki kez düzenli beton kür sulaması veya kür membranı uygulaması',
      'Yapı denetim ve şantiye şefi ıslak imzalı beton döküm ve donatı teslim tutanağını dosyala',
      '7. gün akredite laboratuvarda erken dayanım (hedef: en az %70) kırım testi ve rapor onayı',
      '28. gün nihai karakteristik basınç dayanımı kırım testi ve statik uygunluk kabulü'
    ]
  },
  {
    id: 'muhendislik_insaat_kalip_donati_onam',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['donatı teslim', 'kalıp kontrolü', 'demir donatı', 'beton döküm izni', 'şantiye şefi onayı', 'yapı denetim donatı', 'paspayı kontrolü'],
    baslik: 'Kalıp-Donatı Kontrolü & Döküm Vizesi',
    ikon: '🏗️',
    renk: '#FEF3C7',
    varsayilanZaman: 'Dökümden 24 Saat Önce',
    hazirlikZamani: 'T-24 Saat (Proje Donatı Kontrolü)',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '🏗️ Donatı çapı, aralığı, paspayı ve etriye sıklaştırması yapı denetim ve şantiye şefince imzalanmadan beton mikseri sahaya sokulamaz.',
    oncedenYapilacaklar: [
      'Statik mimari projeye göre kolon, kiriş ve perde donatı çap ve adetlerinin bizzat sayımı',
      'Kolon-kiriş birleşim bölgelerinde etriye sıklaştırma aralıklarının ve gönyelerin kontrolü',
      'Kalıp altı ve yan yüzeylerde plastik paspayı takozlarının yerleşimi ve kalıp temizliği',
      'Yapı denetim mühendisi ile şantiye mahallinde donatı vize tutanağının müştereken imzalanması'
    ]
  },
  {
    id: 'muhendislik_elektrik_loto_guvenlik',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['loto prosedürü', 'trafo bakımı', 'pano bakımı', 'yüksek gerilim müdahale', 'kilitleme etiketleme', 'loto', 'enerji kesme'],
    baslik: 'Pano/Trafo Bakımı & LOTO Güvenliği',
    ikon: '⚡',
    renk: '#FEE2E2',
    varsayilanZaman: 'Müdahale Öncesi (İSG)',
    hazirlikZamani: 'T-30 Dk (Enerji Kesme & Ölçüm)',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '⚡ Can güvenliği için enerjinin kesildiği fiziksel gerilim kalemi ve multimetreyle ölçülmeden panoya asla dokunulmamalıdır.',
    oncedenYapilacaklar: [
      'LOTO Prosedürü: Ana kesici ve kompakt şalteri indir, asma kilitle kilitle ve ikaz levhasını as',
      'Gerilim kontrol kalemi ile baralarda 0V olduğunu doğrula ve seyyar topraklama donanımını tak',
      'Termal kamera ile bara bağlantıları, kontaktör ve klemenslerde aşırı ısınma/gevşeklik taraması yap',
      'Bakım bitiminde megger mego metre ile izolasyon direnci testi ve teslim tutanağını imzala'
    ]
  },
  {
    id: 'muhendislik_elektrik_kompanzasyon_sayac',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['kompanzasyon', 'reaktif ceza', 'endüktif sayaç', 'kapasitif sayaç', 'kondansatör kademe', 'sayaç okuma'],
    baslik: 'Kompanzasyon & Sayaç Takibi',
    ikon: '⚡',
    renk: '#FEE2E2',
    varsayilanZaman: 'Haftalık Sayaç Okuma',
    hazirlikZamani: 'Pazartesi 09:00',
    hazirlikSaatOncesi: 2,
    akilliFisilti: '⚡ Endüktif oran %20, kapasitif oran %15 sınırını aştığında elektrik faturasına ağır reaktif ceza yansır.',
    oncedenYapilacaklar: [
      'Aktif (T), reaktif endüktif (Ri) ve reaktif kapasitif (Rc) sayaç endekslerini haftalık olarak kaydet',
      'Reaktif oranları hesapla: Endüktif <%20 ve Kapasitif <%15 güvenlik sınırında olduğunu teyit et',
      'Reaktif güç kontrol rölesi (RGKR) kademe akımlarını ve arızalı kondansatörleri pensampermetre ile test et',
      'Yapışık kalan kontaktör veya deşarj direnci bozulmuş kondansatörlerin değişimini planla'
    ]
  },
  {
    id: 'muhendislik_makine_basincli_kap_hidrostatik',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['hidrostatik test', 'basınçlı kap', 'kompresör testi', 'kazan testi', 'emniyet ventili', 'hava tankı'],
    baslik: 'Basınçlı Kap Hidrostatik Testi',
    ikon: '⚙️',
    renk: '#E2E8F0',
    varsayilanZaman: 'Yıllık Yasal Periyodik Muayene',
    hazirlikZamani: 'Testten 24 Saat Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '⚙️ İş Ekipmanları Yönetmeliği uyarınca basınçlı kaplar yılda en az bir kez akredite kuruluşça işletme basıncının 1.5 katıyla hidrostatik teste tabi tutulmalıdır.',
    oncedenYapilacaklar: [
      'Tank veya kazanın havasını tahliye edip suyla doldurarak 1.5 x İşletme Basıncında hidrostatik test hazırla',
      'Emniyet ventili açma basıncını test standında doğrula ve kurşun mühür durumunu denetle',
      'Kaynak dikişleri, gövde korozyonu ve et kalınlığı ultrasonik kalınlık ölçüm cihazıyla tara',
      'TÜRKAK akredite A-Tipi muayene kuruluşundan periyodik kontrol uygunluk raporunu teslim al'
    ]
  },
  {
    id: 'muhendislik_makine_kestirimci_bakim_vibrasyon',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['vibrasyon analizi', 'titreşim ölçümü', 'yağ analizi', 'kestirimci bakım', 'rulman sıcaklığı'],
    baslik: 'Kestirimci Bakım & Vibrasyon Analizi',
    ikon: '⚙️',
    renk: '#E2E8F0',
    varsayilanZaman: 'Aylık Rutin Ölçüm',
    hazirlikZamani: 'Ölçümden 1 Saat Önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '⚙️ ISO 10816 standart limitleri aşıldığında rulman ve kaplin hasarı kaçınılmazdır; FFT spektrum analiziyle arıza kaynağı saptanmalıdır.',
    oncedenYapilacaklar: [
      'Motor ve pompa yatak noktalarından (Yatay, Dikey, Eksenel) titreşim ivme ve hız RMS değerlerini ölç',
      'Lazerli kaplin ayarı (şaft hizalama) ve balanssızlık açılarını kontrol et',
      'Redüktör ve hidrolik üniteden yağ numunesi alarak viskozite, aşınma metali ve partikül analizine gönder',
      'Kritik eşiği aşan rulmanlar için duruş planı oluştur ve yedek parça siparişini tetikle'
    ]
  },
  {
    id: 'muhendislik_yazilim_prod_deploy_cuma',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['prod deploy', 'canlıya alma', 'canliya alma', 'production deployment', 'release çıkışı', 'canlıya geçiş'],
    baslik: 'Production Deploy & Sürüm Yönetimi',
    ikon: '💻',
    renk: '#E0F2FE',
    varsayilanZaman: 'Deploy Saati / Bakım Penceresi',
    hazirlikZamani: 'T-1 Saat (DB Backup & Runbook)',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '💻 Canlıya geçiş öncesinde veri tabanı snapshot yedeği alınmalı, rollback adımları test edilmiş olmalıdır.',
    oncedenYapilacaklar: [
      'Production veritabanı anlık snapshot yedeğini al ve migration scriptlerinin geriye dönük uyumunu test et',
      'Staging ortamında E2E regresyon testlerinin ve ürün yöneticisi (PO) kabul onayının tamamlandığını doğrula',
      'SemVer standardına uygun Git tag/release etiketini oluştur ve PR onaylarını kilitle',
      'Deploy sonrası APM hata oranı, Sentry logları ve Kubernetes pod restart metriklerini 30 dakika canlı izle',
      'Kritik anomali durumunda otomatik/manuel rollback runbook prosedürünü hazır beklet'
    ]
  },
  {
    id: 'muhendislik_yazilim_hotfix_semver',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['hotfix', 'acil yama', 'semver tag', 'bugfix release', 'patch sürümü', 'acil hotfix'],
    baslik: 'Hotfix & SemVer Sürüm Dağıtımı',
    ikon: '💻',
    renk: '#E0F2FE',
    varsayilanZaman: 'Acil Yama (SLA: 2 Saat)',
    hazirlikZamani: 'Derhal',
    hazirlikSaatOncesi: 0,
    akilliFisilti: '💻 Hotfix ana dala (main) atıldıktan sonra mutlaka develop dalına da cherry-pick edilmeli ve patch sürüm etiketi verilmelidir.',
    oncedenYapilacaklar: [
      'Production crash/hata logunu (Sentry/Datadog) izole et ve lokal ortamda yeniden üret (reproduce)',
      'Hedefe yönelik minimal düzeltme kodunu yaz ve birim (unit) testlerini çalıştır',
      'Kodu main dalına squash/merge yapıp SemVer PATCH sürüm artırımını (vX.Y.Z) etiketle',
      'Düzeltmeyi develop dalına cherry-pick ile senkronize ederek regresyon oluşmasını engelle'
    ]
  },
  {
    id: 'muhendislik_jeoteknik_zemin_etudu',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['zemin etüdü', 'zemin sondajı', 'spt deneyi', 'jeoteknik rapor', 'taşıma gücü', 'spt'],
    baslik: 'Zemin Etüdü & SPT Sondaj Takibi',
    ikon: '📐',
    renk: '#FEF08A',
    varsayilanZaman: 'Sondaj Günü 09:00',
    hazirlikZamani: 'T-24 Saat (Yeraltı Altyapı Taraması)',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '📐 TBDY 2018 uyarınca zemin sınıfı, sıvılaşma riski ve yeraltı su seviyesi jeoteknik raporda netleşmeden temel statik projesi onaylanamaz.',
    oncedenYapilacaklar: [
      'Sondaj yapılacak parselde İSKİ, İGDAŞ ve Telekom altyapı çakışma taramasını tamamla',
      'Her 1.5 metrede bir Standart Penetrasyon Testi (SPT) darbe sayılarını (N30) log defterine kaydet',
      'Yeraltı su seviyesi (YASS) derinliğini ve karot numune tüplerini etiketleyip laboratuvara sevk et',
      'Zemin mekaniği laboratuvar deney sonuçlarıyla (Atterberg, elek, üç eksenli) jeoteknik raporu hazırla'
    ]
  },
  {
    id: 'muhendislik_biyomedikal_cihaz_kalibrasyon',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['biyomedikal kalibrasyon', 'tıbbi cihaz kalibrasyonu', 'iec 62353', 'elektriksel güvenlik testi', 'ventilatör kalibrasyonu'],
    baslik: 'Biyomedikal Cihaz Kalibrasyonu & İSG',
    ikon: '🔬',
    renk: '#CCFBF1',
    varsayilanZaman: 'Yıllık Periyodik Kalibrasyon',
    hazirlikZamani: 'Testten 2 Saat Önce',
    hazirlikSaatOncesi: 2,
    akilliFisilti: '🔬 Hastanelerde kritik yaşam destek cihazları IEC 62353 elektriksel güvenlik ve metrolojik kalibrasyon sertifikası olmadan hasta başında kullanılamaz.',
    oncedenYapilacaklar: [
      'IEC 62353 standardına göre kaçak akım ve gövde topraklama süreklilik testini analizörle ölç',
      'Ventilatör, defibrilatör veya anestezi cihazının basınç, debi ve enerji çıkış hassasiyetini kalibre et',
      'Kalibrasyon yeşil onay etiketini cihazın görünür yerine yapıştır ve sonraki test tarihini işle',
      'Klinik Mühendislik HBYS sistemine kalibrasyon sertifikasını yükleyip servise teslim imzasını al'
    ]
  },
  {
    id: 'muhendislik_endustri_5s_kaizen',
    category: 'is_kariyer',
    domain: 'TEKNIK',
    keywords: ['5s denetimi', 'kaizen', 'balık kılçığı', 'kök neden analizi', 'spc kontrolü', 'fmea analizi', '5s'],
    baslik: '5S Saha Denetimi & Kaizen Rutini',
    ikon: '📊',
    renk: '#DCFCE7',
    varsayilanZaman: 'Haftalık Saha Denetimi',
    hazirlikZamani: 'Denetimden 1 Gün Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '📊 Yalın üretimde 5S (Ayıkla, Düzenle, Temizle, Standartlaştır, Sürdür) panoları ve Kaizen aksiyonları periyodik denetimle canlı tutulur.',
    oncedenYapilacaklar: [
      'Üretim hattında kırmızı etiket (red-tag) uygulaması ile gereksiz malzeme ve aletleri ayıkla',
      'Alet panoları, zemin çizgileri ve malzeme stok alanlarının gölge pano standartlarına uygunluğunu denetle',
      'Haftalık 5S puanlama skorunu hesapla ve operatörlerle birlikte Kaizen iyileştirme panosuna as',
      'Kritik sapmalar için Balık Kılçığı (İshikawa) veya 5 Neden analiziyle kök neden aksiyon planı aç'
    ]
  },
  {
    id: 'smmm_sirket_kurulusu',
    category: 'finans',
    domain: 'MALIYE',
    keywords: ['şirket kuruluşu', 'ltd şti kurduk', 'mersis kuruluşu', 'yeni mükellef açılışı'],
    baslik: 'Şirket Kuruluşu & MERSİS Süreci',
    ikon: '📊',
    renk: '#DCFCE7',
    varsayilanZaman: '3 İş Günü',
    hazirlikZamani: 'Kuruluş Günü',
    akilliFisilti: '📊 MERSİS tescilinden sonra vergi dairesi e-yoklama randevusu ve imza sirküleri için 24 saat kuralı işler.',
    oncedenYapilacaklar: [
      'MERSİS ana sözleşme girişi ve unvan kontrolünün tamamlanması',
      'Potansiyel vergi kimlik numarası alımı ve kurucular sermaye bloke yazısı',
      'Ticaret Sicil randevusu ile tescil ve ilan evraklarının teslimi',
      'Vergi dairesi e-yoklama talebi açılması ve noter onaylı imza sirküleri çıkarılması'
    ]
  },
  {
    id: 'emlak_kiraci_tahliye_devir',
    category: 'finans',
    domain: 'EMLAK',
    keywords: ['kiracı çıktı', 'kiraci cikti', 'anahtarı teslim aldım', 'daireyi boşalttı'],
    baslik: 'Kiracı Tahliyesi & Sayaç / Depozito Devri',
    ikon: '🏢',
    renk: '#FEF3C7',
    varsayilanZaman: 'Tahliye Günü',
    hazirlikZamani: 'Teslim Öncesi',
    akilliFisilti: '🏢 Depozito iadesi yapılmadan önce elektrik, su, doğalgaz son endeksleri okunmalı ve yönetim borçsuzluk belgesi alınmalıdır.',
    oncedenYapilacaklar: [
      'Elektrik, su ve doğalgaz sayaçlarının son endeks fotoğraflarını çek ve tutanağa yaz',
      'Daire içi boya, kombi, ankastre ve armatür hasar tespit fotoğraflarını kaydet',
      'Apartman/site yönetiminden aidat borçsuzluk yazısını teyit et',
      'Hasar ve fatura mahsuplarını düşerek depozito iade mutabakat tutanağını imzalat'
    ]
  },
  {
    id: 'emlak_webtapu_satis_devir',
    category: 'finans',
    domain: 'EMLAK',
    keywords: ['tapu devri', 'webtapu başvuru', 'tapu günü', 'ev satışı tapu'],
    baslik: 'Web-Tapu Satış & Devir Protokolü',
    ikon: '🏢',
    renk: '#FEF3C7',
    varsayilanZaman: 'Tapu Randevu Saati',
    hazirlikZamani: 'Randevudan 24 Saat Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '🏢 DASK poliçesi olmadan ve belediye rayiç bedel yazısı sisteme yüklenmeden tapu harç SMS\'i gelmez.',
    oncedenYapilacaklar: [
      'Web-Tapu sistemine DASK poliçesi ve belediye rayiç belgesini yükle',
      'Gelen SMS takip numarası ile alıcı/satıcı tapu harcı ve döner sermayesini yatır',
      'Tapu dairesinde kimlik, fotoğraf ve vekaletname asıllarını hazır bulundur',
      'Bloke çek veya Güvenli Tapu Ödeme Sistemi üzerinden satış bedeli transferini sağla'
    ]
  },
  {
    id: 'emlak_kira_sozlesmesi_tahliye',
    category: 'finans',
    domain: 'EMLAK',
    keywords: ['kira sözleşmesi', 'kira kontratı', 'tahliye taahhütnamesi', 'yeni kiracı', 'kiraya verdik', 'daire kiralandı'],
    baslik: 'Kira Sözleşmesi & Tahliye Taahhütnamesi',
    ikon: '📝',
    renk: '#DCFCE7',
    varsayilanZaman: 'Sözleşme İmzası',
    hazirlikZamani: 'İmza Öncesi (Kimlik & Föy)',
    akilliFisilti: '📝 Yargıtay içtihatlarına göre kira kontratıyla aynı gün imzalanan tahliye taahhütnamesi geçersiz sayılabilir; tanzim tarihi teslim sonrasına bırakılmalıdır.',
    oncedenYapilacaklar: [
      'Kiracının T.C. kimlik, adli sicil ve düzenli gelir teyidini al',
      'Kira sözleşmesine net kira, artış oranı (TÜFE), ödeme günü ve IBAN bilgilerini yaz',
      'Demirbaş teslim tutanağı ile kombi, ankastre, armatür ve duvar boya durumunu fotoğrafla',
      'Elektrik, su, doğalgaz sayaç ilk endekslerini kaydederek aboneliklerin devrini şart koş',
      'Tahliye taahhütnamesini anahtar teslimi sonrası tarihe tanzim et ve tercihen noterde onaylat',
      'En fazla 3 aylık kira tutarındaki depozitoyu vadeli banka mevduat hesabına bloke ettir'
    ]
  },
  {
    id: 'emlak_yer_gosterme_sunum',
    category: 'finans',
    domain: 'EMLAK',
    keywords: ['yer gösterme', 'yer gosterme', 'evi göstereceğiz', 'sunum randevusu', 'portföy sunumu', 'daireyi gezdireceğiz'],
    baslik: 'Taşınmaz Gösterme Belgesi & Portföy Sunumu',
    ikon: '🤝',
    renk: '#E0E7FF',
    varsayilanZaman: 'Müşteri Randevu Saati',
    hazirlikZamani: 'Sunumdan 1 Saat Önce (Mülk Sahibi Teyidi)',
    akilliFisilti: '🤝 Taşınmaz Ticareti Yönetmeliği md. 19 uyarınca yer gösterme belgesi imzalatılmadan yapılan sunumlarda hizmet bedeli (komisyon) tahsilinde hukuki ihtilaf doğar.',
    oncedenYapilacaklar: [
      'Sunumdan 1 saat önce mülk sahibi veya kiracıyla randevuyu teyit et ve güvenliğe bildir',
      'Daireye 15 dk önce gidip pencereleri açarak havalandır ve aydınlatmaları hazırla',
      'Taşınmaz Ticareti Yönetmeliğine uygun Taşınmaz Gösterme Belgesini müşteriye imzalat',
      'Net/brüt metrekare, aidat, bina yaşı, cephe ve tapu takyidat durumunu şeffafça açıkla',
      'Müşterinin geri bildirimini ve teklif niyetini CRM takip föyüne kaydet'
    ]
  },
  {
    id: 'emlak_imar_iskan_takyidat',
    category: 'finans',
    domain: 'EMLAK',
    keywords: ['imar durumu', 'imar çapı', 'iskan raporu', 'kat irtifakı', 'kat mülkiyeti', 'takyidat', 'ada parsel sorgu'],
    baslik: 'İmar, İskan & Tapu Takyidat Denetimi',
    ikon: '📐',
    renk: '#FEF08A',
    varsayilanZaman: 'Belediye & Tapu Mesaisi',
    hazirlikZamani: 'Ekspertiz Öncesi (Ada/Parsel)',
    akilliFisilti: '📐 İskansız (yapı kullanma izinsiz) binalarda konut kredisi kısıtlaması yaşanır; tapu takyidatında görünmeyen kamu hacizleri satış anında devri kilitler.',
    oncedenYapilacaklar: [
      'TKGM Parsel Sorgu üzerinden ada, parsel, alan ve sınırları doğrula',
      'Web-Tapudan güncel Takyidat Belgesi alarak haciz, ipotek veya mahkeme şerhlerini incele',
      'İlgili belediyeden imar çapı, yapı ruhsatı ve İskan (Yapı Kullanma İzni) durumunu sorgula',
      'Belediye arşivinden onaylı mimari projeyi inceleyerek projeye aykırı kaçak büyüme olup olmadığını denetle',
      'Bölgedeki emsal satışları derleyerek gayrimenkul ekspertiz ve değerleme analizi hazırla'
    ]
  },
  {
    id: 'emlak_ipotek_fek_terkin',
    category: 'finans',
    domain: 'EMLAK',
    keywords: ['ipotek fek', 'ipotek kaldırma', 'kredi kapandı', 'ipotek terkin', 'banka ipotek fekki'],
    baslik: 'İpotek Fekki & Tapu Terkin Protokolü',
    ikon: '🏛️',
    renk: '#DCFCE7',
    varsayilanZaman: 'Kredi Kapanışı Sonrası',
    hazirlikZamani: 'Banka Borçsuzluk Teyidi',
    akilliFisilti: '🏛️ Kredi borcu kapansa dahi banka sisteme fek yazısı göndermez ve harç ödenmezse ipotek tapu kütüğünde kalmaya devam eder ve satışa engel teşkil eder.',
    oncedenYapilacaklar: [
      'Bankadan konut kredisinin sıfırlandığını ve borcun kapandığını teyit eden dekontu al',
      'Bankanın Genel Müdürlüğünden Tapu Müdürlüğüne TAKPAS üzerinden elektronik İpotek Fekki göndermesini talep et',
      'Tapu fek terkin harcının tahakkukunu kontrol et ve ödemesini tamamla',
      'Web-Tapu üzerinden güncel tapu kaydı alarak ipotek şerhinin silindiğini doğrula',
      'Temiz, takyidatsız tapu senedini mülk sahibine veya alıcıya teslim et'
    ]
  },
  {
    id: 'emlak_tufe_kira_artisi',
    category: 'finans',
    domain: 'EMLAK',
    keywords: ['kira artışı', 'kira artisi', 'tüfe kira', 'tufe kira', 'kira zammı', 'kira yenileme'],
    baslik: 'TÜFE Kira Artışı & Yenileme Bildirimi',
    ikon: '📈',
    renk: '#FEF3C7',
    varsayilanZaman: 'Sözleşme Bitişinden 30 Gün Önce',
    hazirlikZamani: 'TÜİK 12 Aylık TÜFE Açıklanması',
    akilliFisilti: '📈 TBK md. 344 uyarınca konut kiralarında artış oranı son 12 aylık TÜFE ortalamasını aşamaz; kira bedellerinin elden ödenmesi VUK uyarınca usulsüzlük cezasına tabidir.',
    oncedenYapilacaklar: [
      'TÜİK tarafından açıklanan son 12 Aylık TÜFE Ortalaması yasal tavan artış oranını belirle',
      'Mevcut kira bedeline yasal tavanı uygulayarak yeni dönem net aylık kira rakamını hesapla',
      'Kira yenileme gününden en az 30 gün önce kiracıya yeni dönem kirasını ve banka IBAN hesabını yazılı bildir',
      'Ödemelerin dekontta "X Ayı Kira Bedeli" açıklamasıyla bankadan yapılmasını hatırlat',
      'Yeni kira bedeline göre depozito tamamlama farkını ve kefil durumunu gözden geçir'
    ]
  },
  {
    id: 'emlak_eids_yetki_ilani',
    category: 'finans',
    domain: 'EMLAK',
    keywords: ['yetki belgesi', 'yetki sözleşmesi', 'eids', 'ilan girişi', 'satılık ilanı', 'kiralık ilanı', 'portföy aldık'],
    baslik: 'EİDS Yetkilendirme & Portföy İlan Protokolü',
    ikon: '📸',
    renk: '#E0F2FE',
    varsayilanZaman: 'İlan Yayını Öncesi',
    hazirlikZamani: 'Portföy Çekimi & Evrak Toplama',
    akilliFisilti: '📸 EİDS yetkilendirmesi veya yazılı yetki sözleşmesi olmayan gayrimenkullerin portallarda ilana verilmesi Ticaret Bakanlığı tarafından idari para cezasına tabidir.',
    oncedenYapilacaklar: [
      'Mülk sahibinden e-Devlet EİDS üzerinden işletmeye yetkilendirme onayını aldır',
      'Taşınmaz Ticareti Yönetmeliğine uygun Yetkilendirme Sözleşmesini ıslak imzalı tanzim et',
      'Dairenin profesyonel geniş açı fotoğraf, video ve kat planı çekimlerini hazırla',
      'Tapudaki net ve brüt m2, ada/parsel, bina yaşı, ısıtma ve aidat bilgilerini ilana gir',
      'İlanı portallarda ve web sitesinde EİDS yetki onay koduyla yayına al'
    ]
  },
  {
    id: 'saglik_postop_vital_izlem',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['hasta servise çıktı', 'post-op hasta', 'ameliyattan çıktı', 'cerrahi servis yatış'],
    baslik: 'Post-Op Vital & Cerrahi Servis İzlemi',
    ikon: '🩺',
    renk: '#E0F2FE',
    varsayilanZaman: '15 Dk / Saatlik Rutin',
    hazirlikZamani: 'Servis Kabul Anında',
    akilliFisilti: '🩺 Post-op ilk 2 saat 15 dakikada bir, sonraki 4 saatte yarım saatte bir vital bulgu (TA, Nabız, SpO2) takibi yapılır.',
    oncedenYapilacaklar: [
      'İlk 2 saat 15 dakikada bir vital bulgu (Tansiyon, Nabız, SpO2, Solunum) kaydet',
      'Cerrahi dren miktarı, rengi ve pansuman kanama sızıntı kontrolünü yap',
      'Hastanın post-op aldığı-çıkardığı (AÇT) sıvı dengesini order föyüne işle',
      'Cerrahi hekimin post-op analjezik ve antibiyotik orderını 5 Doğru Kuralı ile uygula'
    ]
  },
  {
    id: 'saglik_acil_konsultasyon_stat',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['acil konsültasyon', 'acil konsultasyon', 'stat kons', 'kırmızı alan kons', 'acil hekim kons', 'konsültasyon istendi'],
    baslik: 'Acil Konsültasyon (30 Dk SLA)',
    ikon: '🚨',
    renk: '#FEE2E2',
    varsayilanZaman: '30 Dk İçinde (Kritik SLA)',
    akilliFisilti: '🩺 Sağlık Bakanlığı Kalite Standartları gereği acil konsültasyon yanıt süresi en fazla 30 dakikadır.',
    oncedenYapilacaklar: [
      '30 dakika içinde hastayı bizzat değerlendir ve konsültasyon notunu HBYS\'ye işle',
      'İsteyen acil/servis hekimi ile sözlü iletişim kur ve tedavi revizyonunu planla',
      'Gerekli acil görüntüleme, EKG ve laboratuvar istemlerini HBYS üzerinden onayla'
    ]
  },
  {
    id: 'saglik_mavi_kod_cpr',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['mavi kod', 'code blue', '2222', 'cpr resüsitasyon', 'kardiyak arrest', 'kalp masajı'],
    baslik: 'Mavi Kod (Code Blue) & CPR',
    ikon: '🚨',
    renk: '#BFDBFE',
    varsayilanZaman: '3 Dk İntikal SLA',
    akilliFisilti: '🚨 Mavi Kod çağrısında ekibin olay yerine intikal süresi maksimum 3 dakikadır. 30:2 göğüs basısı ve 2 dakikada bir ritim analizi esastır.',
    oncedenYapilacaklar: [
      'Mavi kod çağrı saatini ve olay yerine intikal süresini (maksimum 3 dk) tutanağa kaydet',
      '30:2 göğüs basısı / solutma döngüsü ve 2 dakikada bir ritim/nabız analizi sağla',
      'İlk 3-5 dakika içinde 1 mg IV Epinefrin (Adrenalin) ve defibrilasyon hazırlığı yap',
      'Mavi Kod Müdahale Formunu eksiksiz doldurup Kalite Yönetim Birimine teslim et'
    ]
  },
  {
    id: 'saglik_adli_vaka_muayene',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['adli vaka', 'adli rapor', 'adli muayene', 'darp raporu', 'trafik kazası raporu', 'adli emanet'],
    baslik: 'Adli Vaka & Tıbbi Raporlama',
    ikon: '⚖️',
    renk: '#FEF3C7',
    varsayilanZaman: 'Derhal (Resmi Bildirim)',
    akilliFisilti: '⚖️ Adli vakalarda geçici/kesin hekim raporu 2 nüsha tanzim edilir ve resmi kolluğa (hastane polisi) gecikmeksizin teslim edilir.',
    oncedenYapilacaklar: [
      'Hastanın kimlik tespitini ve kolluk (polis/jandarma) sevk müzekkeresini kontrol et',
      'Lezyonların milimetrik boyut, renk ve anatomik lokalizasyonunu adli rapora 2 nüsha kaydet',
      'Elbise, mermi çekirdeği veya biyolojik delilleri adli emanet torbasında mühürle',
      'Raporu hastane polisine zimmet karşılığı teslim edip HBYS adli vaka kutucuğunu işaretle'
    ]
  },
  {
    id: 'saglik_preop_cerrahi_hazirlik',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['pre-op hasta', 'preop hazırlık', 'ameliyat hazırlığı', 'ameliyata gidecek', 'cerrahi hazırlık', 'ameliyathane hazırlığı'],
    baslik: 'Pre-Op Cerrahi Hazırlık',
    ikon: '🏥',
    renk: '#E0F2FE',
    varsayilanZaman: 'Ameliyattan 8 Saat Önce (NPO)',
    hazirlikZamani: 'Operasyondan 8 Saat Önce',
    akilliFisilti: '🏥 Elektif cerrahi öncesi en az 8 saatlik NPO mutlak açlık, anestezi onamı ve cross-match teyidi zorunludur.',
    oncedenYapilacaklar: [
      'T-8 saat: Ameliyat saatinden en az 8 saat önce tüm oral alımı (su dahil) kes (NPO)',
      'Kan grubu, cross-match ve Kan Merkezinden ayrılan kan torbalarını teyit et',
      'Aydınlatılmış cerrahi ve anestezi onam formlarının ıslak imzalı olduğunu dosyala',
      'Cerrahi taraf işaretleme ve premedikasyon tedavisini hekim orderına göre uygula'
    ]
  },
  {
    id: 'saglik_taburculuk_epikriz',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['hasta taburcu', 'taburculuk işlemleri', 'epikriz yazılacak', 'taburcu edilecek', 'çıkış özeti'],
    baslik: 'Hasta Taburculuk & Epikriz',
    ikon: '🩺',
    renk: '#E0F2FE',
    varsayilanZaman: 'Taburculuk Saati (10 Gün Kontrol)',
    akilliFisilti: '🩺 Epikriz raporu, Medula e-Reçete ve 10 gün sonraki poliklinik kontrol randevusu kapatılmadan taburculuk tamamlanamaz.',
    oncedenYapilacaklar: [
      'Detaylı klinik epikriz raporunu HBYS üzerinde tamamla ve e-İmza ile mühürle',
      'SGK Medula e-Reçetesini düzenleyip reçete numarasını hastaya/yakınına ilet',
      'Taburculuk tarihinden 10 gün sonrasına ilgili poliklinikten kontrol randevusu planla',
      'Bekleyen patoloji, mikrobiyoloji ve laboratuvar sonuç onaylarını kapat'
    ]
  },
  {
    id: 'saglik_hemsire_dekubitus',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['dekübitus', 'dekubitus', 'bası yarası', 'pozisyon değişim', 'pozisyon ver', 'immobil hasta'],
    baslik: 'Dekübitus Pozisyon Değişimi',
    ikon: '💉',
    renk: '#CCFBF1',
    varsayilanZaman: '2 Saatte Bir (Periyodik)',
    akilliFisilti: '💉 İmmobil hastalarda bası yarasını önlemek için en geç 2 saatte bir vücut pozisyonu değiştirilir ve Braden skalası puanlanır.',
    oncedenYapilacaklar: [
      'Hastanın vücut pozisyonunu sırayla değiştir (Sol lateral / Supine / Sağ lateral)',
      'Kemik çıkıntıları (Sakrum, iskium, topuklar, skapula) kızarıklık yönünden denetle ve bariyer krem sür',
      'Pozisyon değişim saatini ve Braden bası yarası risk skorunu hemşire takip formuna işle',
      'Havalı yatak basınç ayarını ve çarşaf kırışıklık kontrolünü tamamla'
    ]
  },
  {
    id: 'saglik_hemsire_sbar_teslim',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['sbar teslim', 'hemşire devir', 'nöbet devri hemşire', 'hasta teslimi sbar', 'narkotik sayımı'],
    baslik: 'SBAR Nöbet Devir-Teslim Föyü',
    ikon: '💉',
    renk: '#CCFBF1',
    varsayilanZaman: 'Nöbet Bitimine 45 Dk Kala',
    akilliFisilti: '💉 Nöbet devrinde SBAR standardı ve yeşil/kırmızı reçeteli narkotik dolabının çift imza ile devri zorunludur.',
    oncedenYapilacaklar: [
      'SBAR (Durum, Arka Plan, Değerlendirme, Öneri) formatında hasta devir föyünü hazırla',
      'Kırmızı/yeşil reçeteli narkotik ampul sayımını devralan hemşireyle bizzat sayıp çift imza at',
      'Kritik laboratuvar sonuçları, vital trendler, açık mayiler ve orderları yeni ekibe aktar',
      'Servis genel düzeni, arızalı cihazlar ve acil arabası (crash cart) mührünü teyit et'
    ]
  },
  {
    id: 'saglik_kan_transfuzyon',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['kan transfüzyon', 'eritrosit süspansiyonu', 'kan takılacak', 'tdp takılacak', 'transfüzyon reaksiyonu'],
    baslik: 'Kan Transfüzyonu & Çift Hemşire Teyidi',
    ikon: '🩸',
    renk: '#FECACA',
    varsayilanZaman: 'Transfüzyon Başlangıcı (İlk 15 Dk Gözlem)',
    akilliFisilti: '🩸 Kan ürünü dolaptan çıktıktan sonra 30 dk içinde başlanmalı, ilk 15 dakika yatak başında vital izlenmeli ve 4 saati aşmamalıdır.',
    oncedenYapilacaklar: [
      'İki sağlık personeli ile hasta kimliği, kan grubu, torba numarası ve cross-match teyidi yap',
      'Transfüzyon öncesi başlangıç vital bulgularını (Ateş, TA, Nabız) kaydet',
      'İlk 15 dakika hastanın başında kalarak anafilaksi ve transfüzyon reaksiyonu gözlemi yap',
      'İnfüzyon süresinin maksimum 4 saati aşmamasını sağla ve boş torbayı 24 saat sakla'
    ]
  },
  {
    id: 'saglik_eczane_soguk_zincir',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['soğuk zincir kontrolü', 'aşı dolabı ısısı', '2-8 derece kontrol', 'eczane buzdolabı log', 'aşı dolabı log'],
    baslik: 'Eczane Soğuk Zincir (2-8°C) Logu',
    ikon: '💊',
    renk: '#FEE2E2',
    varsayilanZaman: 'Sabah 09:00 & Akşam 18:00',
    akilliFisilti: '💊 Soğuk zincir ilaç ve aşıları için dijital termometre sıcaklığı (2-8°C) sabah ve akşam günde iki kez log defterine işlenir.',
    oncedenYapilacaklar: [
      'Sabah 09:00: Dijital göstergedeki anlık, minimum ve maksimum sıcaklığı log defterine kaydet',
      'Akşam 18:00: İkinci sıcaklık ve nem ölçümünü yapıp imzanı at',
      '2-8°C dışı bir sapma varsa aşı/ilaçları acil soğuk kutusuna alıp İTS bildirimini başlat',
      'Haftalık buzdolabı içi hava sirkülasyonu ve buzlanma kontrolünü yap'
    ]
  },
  {
    id: 'saglik_eczane_medula_miad',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['medula döküm', 'sgk fatura teslim', 'reçete dökümü', 'miad kontrolü eczane', 'depo iade eczane'],
    baslik: 'Medula Reçete & Miad Kontrolü',
    ikon: '💊',
    renk: '#FEE2E2',
    varsayilanZaman: 'Ayın 1-7\'si / Ay Sonu',
    akilliFisilti: '💊 SGK Medula reçete evrakları her ayın ilk haftasında teslim edilir; miadı 3 aydan az kalan ürünler ecza depolarına iade edilir.',
    oncedenYapilacaklar: [
      'Ayın ilk haftası: Medula A-B grubu reçete döküm çıktılarını alıp faturalandır',
      'Döküm özetlerini, reçete ve kupürleri klasörleyip SGK Sağlık Sosyal Güvenlik Merkezine teslim et',
      'Ay sonu: Miadı 3 ay kalan ürünlerin fiziki sayımını yapıp İTS iade faturasını düzenle',
      'Renkli Reçete Sistemi (RRS) uyuşturucu/psikotrop aylık satış mutabakatını mühürle'
    ]
  },
  {
    id: 'saglik_dis_otoklav_spor',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['otoklav spor testi', 'biyolojik indikatör diş', 'sterilizasyon kontrolü diş', 'otoklav döngüsü'],
    baslik: 'Otoklav Spor Testi & Sterilizasyon',
    ikon: '🦷',
    renk: '#EDE9FE',
    varsayilanZaman: 'Haftalık Biyolojik / Günlük Kimyasal',
    akilliFisilti: '🦷 Otoklav sterilizasyonunda haftalık Bacillus stearothermophilus biyolojik spor testi ve her çevrimde Class 5 indikatör takibi zorunludur.',
    oncedenYapilacaklar: [
      'Haftalık biyolojik spor test ampulünü en zorlu pakete yerleştirip otoklav döngüsünü çalıştır',
      'Çevrim bitiminde test ampulünü inkübatörde 24-48 saat üremeye bırakıp kontrol tüpüyle kıyasla',
      'Günlük paketleme indikatör şeritlerinin renk değişimini Class 5 parametresine göre onayla',
      'Steril paketlerin üzerine sterilizasyon ve 30 günlük son kullanım tarihini etiketle'
    ]
  },
  {
    id: 'saglik_dis_implant_dikis',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['implant dikiş alma', 'diş dikiş alınacak', 'protez prova randevusu', 'implant cerrahi kontrol'],
    baslik: 'Dental İmplant & 7. Gün Dikiş Alma',
    ikon: '🦷',
    renk: '#EDE9FE',
    varsayilanZaman: 'Operasyondan 7 Gün Sonra',
    akilliFisilti: '🦷 İmplant cerrahisinden 7 gün sonra dikişler alınır, diş eti primer iyileşmesi ve osteoentegrasyon stabilitesi denetlenir.',
    oncedenYapilacaklar: [
      'Operasyonun 7. gününde cerrahi dikişleri steril aletlerle al ve diş eti cep derinliğini yokla',
      'Gerekiyorsa kontrol periapikal/panoramik röntgen çekerek kemik seviyesini değerlendir',
      'Protez ölçü modeli için diş protez laboratuvarı ile prova takvimini netleştir',
      'Hastaya klorheksidinli gargara ve arayüz fırçası kullanım talimatlarını yenile'
    ]
  },
  {
    id: 'saglik_lab_panik_deger',
    category: 'saglik',
    domain: 'SAGLIK',
    keywords: ['panik değer bildirimi', 'kritik laboratuvar sonucu', 'troponin pozitif çıktı', 'potasyum panik değer', 'kan gazı kritik'],
    baslik: 'Laboratuvar Panik Değer Bildirimi',
    ikon: '⚠️',
    renk: '#FEE2E2',
    varsayilanZaman: 'Derhal (Read-Back Telefonla)',
    akilliFisilti: '⚠️ Panik değerlerde (Kritik Sonuç) hastanın hekimine veya servis sorumlu hemşiresine telefonla ulaşılarak geri okuma (Read-Back) yöntemiyle bildirim yapılır.',
    oncedenYapilacaklar: [
      'Analiz sonucunu cihazda ve ikinci testle (serum kontrolü) derhal doğrula',
      'Hastanın sorumlu hekimi veya servis hemşiresine doğrudan telefonla ulaş',
      'Hasta adı, protokol numarası ve test değerini okuyup karşı tarafa aynen geri okut (Read-Back)',
      'Bildirimi alan kişinin adı, unvanı, arama saati ve dakikasını HBYS panik değer modülüne işle'
    ]
  },
  {
    id: 'ziraat_ekim_can_suyu',
    category: 'is_kariyer',
    domain: 'ZIRAAT',
    keywords: ['mısır ektik', 'buğday ekildi', 'arpa ektik', 'tarla ekimi bitti', 'tohum ekildi'],
    baslik: 'Ekim Sonrası Can Suyu & Ot Kontrolü',
    ikon: '🌾',
    renk: '#DCFCE7',
    varsayilanZaman: '24 Saat İçinde Can Suyu',
    hazirlikZamani: 'Ekimden 15 Gün Sonra',
    hazirlikSaatOncesi: 360,
    akilliFisilti: '🌾 Ekimden sonraki ilk 24 saat içinde verilecek can suyu çimlenme oranını %35 artırır.',
    oncedenYapilacaklar: [
      'Ekimden hemen sonra ilk can suyu sulamasını damlama/yağmurlama ile başlat',
      'Tohum çimlenme derinliğini ve toprak tavını sahada kontrol et',
      '15 gün sonraki dar ve geniş yapraklı yabancı ot (herbisit) çıkışını denetle',
      'ÇKS (Çiftçi Kayıt Sistemi) parsel beyanını ilçe tarım müdürlüğüne bildir'
    ]
  },
  {
    id: 'ziraat_budama_bordo_bulamaci',
    category: 'is_kariyer',
    domain: 'ZIRAAT',
    keywords: ['ağaçları budadık', 'budama bitti', 'fidan budaması', 'zeytin budama'],
    baslik: 'Budama Sonrası Bordo Bulamacı & Yara Bakımı',
    ikon: '🌿',
    renk: '#DCFCE7',
    varsayilanZaman: 'Budamadan Hemen Sonra',
    hazirlikZamani: '48 Saat İçinde',
    hazirlikSaatOncesi: 48,
    akilliFisilti: '🌿 Budama kesiklerinden mantar ve bakteri girişini önlemek için %1.5-2\'lik bordo bulamacı uygulanmalıdır.',
    oncedenYapilacaklar: [
      'Kalın kesim yüzeylerini aşı macunu (ardıç katranı) ile hava almayacak şekilde kapat',
      'Hava sıcaklığı 5°C üzerindeyken rüzgarsız havada %2\'lik Bordo Bulamacı püskürt',
      'Budanan hastalıklı dal ve artıkları bahçeden uzaklaştırıp imha et',
      'Budama makas ve testerelerini çamaşır suyu veya alkolle dezenfekte et'
    ]
  },
  {
    id: 'veteriner_asi_parazit_bakim',
    category: 'saglik',
    domain: 'VETERINER',
    keywords: ['kediye aşı', 'köpeğe aşı', 'pire damlası sıktım', 'iç parazit yapıldı'],
    baslik: 'Aşı / Parazit Sonrası 48 Saat Bakımı',
    ikon: '🐾',
    renk: '#CCFBF1',
    varsayilanZaman: '48 Saat Takip',
    hazirlikZamani: '60 Gün Sonraki Rapel',
    hazirlikSaatOncesi: 1440,
    akilliFisilti: '🐾 Dış parazit damlası sonrası 48 saat hayvan yıkanmamalı ve aşı sonrası halsizlik yakından izlenmelidir.',
    oncedenYapilacaklar: [
      'Ense bölgesine uygulanan dış parazit damlasını 48 saat suyla temas ettirme ve yıkama',
      'Hayvanın damla bölgesini yalamasını engelle (Gerekirse Elizabeth yakalığı tak)',
      'İlk 24 saat içinde gelişebilecek alerjik reaksiyon, iştahsızlık ve ateşi gözlemle',
      'Petvet çip sistemine ve aşı karnesine 2 ay sonraki rapel takvimini işle'
    ]
  },
  {
    id: 'vet_petvet_mikrocip',
    category: 'saglik',
    domain: 'VETERINER',
    keywords: ['petvet mikroçip', 'çip taktık', 'çip takıldı', 'evcil hayvan pasaportu', 'kediye çip'],
    baslik: 'PETVET Mikroçip & Pasaport Tescili',
    ikon: '🐾',
    renk: '#CCFBF1',
    varsayilanZaman: 'PETVET Kayıt Saati',
    hazirlikZamani: 'İmplantasyon Öncesi Çip Barkod Testi',
    akilliFisilti: '🐾 5199 sayılı Kanun gereğince mikroçip implantasyonu ve PETVET sistem kaydı resmi pasaportla belgelenmelidir.',
    oncedenYapilacaklar: [
      '15 haneli mikroçipi enjektörden çıkarmadan önce okuyucuyla test et',
      'Sol skapular bölgeye aseptik mikroçip implantasyonu uygula ve ardından tekrar tara',
      'Bakanlık PETVET sistemine sahip, ırk, doğum tarihi ve aşı bilgilerini kaydet',
      'Resmi Evcil Hayvan Pasaportuna barkodu yapıştır ve kaşe/imza ile mühürle'
    ]
  },
  {
    id: 'vet_kuduz_titrasyon',
    category: 'saglik',
    domain: 'VETERINER',
    keywords: ['kuduz titrasyon testi', 'rnatt testi', 'yurt dışı çıkış kedi', 'yurt dışı köpek kuduz', 'titre testi'],
    baslik: 'Kuduz Titrasyon (RNATT) Protokolü',
    ikon: '✈️',
    renk: '#E0F2FE',
    varsayilanZaman: '30 Gün Sonra Kan Alımı (90 Gün Karantina)',
    hazirlikZamani: 'Kuduz Aşısından En Az 30 Gün Sonra',
    akilliFisilti: '✈️ Kuduz titrasyon testinde antikor seviyesi ≥0.50 IU/mL çıkmalı ve kan alımından itibaren 3 ay beklenmelidir.',
    oncedenYapilacaklar: [
      'Kuduz aşısının çip takıldıktan sonra yapıldığını ve 30 gün geçtiğini doğrula',
      'Jelli tüpe kan al, santrifüj edip serumu ayır ve soğuk zincirde Yetkili Enstitüye gönder',
      'Sonucun ≥0.50 IU/mL olduğunu resmi raporla onayla ve 90 günlük bekleme sayacını başlat',
      'Uçuş öncesi 48 saat içinde İlçe Tarımdan Uluslararası Sağlık Sertifikası (VSR) al'
    ]
  },
  {
    id: 'vet_preop_onam',
    category: 'saglik',
    domain: 'VETERINER',
    keywords: ['ameliyat öncesi açlık', 'pre-op açlık', 'kısırlaştırma açlık', 'cerrahi onam formu'],
    baslik: 'Pre-Op Cerrahi Açlık & Anestezi Onamı',
    ikon: '🩺',
    renk: '#FEF3C7',
    varsayilanZaman: 'Operasyon Sabahı (09:00)',
    hazirlikZamani: '12 Saat Önceden Mama, 2 Saat Önceden Su Kesimi',
    akilliFisilti: '🩺 Aspirasyon pnömonisi riskine karşı 8-12 saat mama açlığı sağlanmalı ve aydınlatılmış cerrahi onam imzalatılmalıdır.',
    oncedenYapilacaklar: [
      '8-12 saat mama ve 2 saat su açlığı protokolünü teyit et',
      'Pre-anestetik Hemogram ve ALT, AST, BUN, Cre biyokimya paneli çalış',
      'Hasta sahibine Aydınlatılmış Cerrahi ve Anestezi Onam Formunu imzalat',
      'IV damar yolu kanülü takarak izotonik sıvı infüzyonu ve premedikasyonu başlat'
    ]
  },
  {
    id: 'vet_turkvet_kupe',
    category: 'saglik',
    domain: 'VETERINER',
    keywords: ['türkvet küpeleme', 'buzağı küpeleme', 'kuzu küpeleme', 'turkvet kayıt'],
    baslik: 'TÜRKVET Küpeleme & Doğum Tescili',
    ikon: '🐄',
    renk: '#DCFCE7',
    varsayilanZaman: 'Saha Küpeleme Ziyareti',
    hazirlikZamani: 'Doğumdan İtibaren İlk 30 Gün',
    akilliFisilti: '🐄 5996 sayılı Kanun uyarınca buzağılar 30 gün içinde küpelenmeli ve TÜRKVET sistemine kaydedilmelidir.',
    oncedenYapilacaklar: [
      'Kulak küpesini dezenfektan sıkarak aseptik pens ile tak',
      'Doğum tarihi, ana kulak no, ırk ve cinsiyeti Doğum Bildirim Formuna işle',
      'İlçe Tarım TÜRKVET portalına küpe seri numarasını tescil et',
      'Satış veya kesime giden hayvanların TÜRKVET düşüm işlemlerini tamamla'
    ]
  },
  {
    id: 'vet_cmt_mastitis_sut',
    category: 'saglik',
    domain: 'VETERINER',
    keywords: ['cmt testi yaptık', 'mastitis tedavisi', 'antibiyotikli süt', 'süt arınma süresi'],
    baslik: 'CMT & Süt Arınma Karantinası',
    ikon: '🥛',
    renk: '#FEE2E2',
    varsayilanZaman: 'Sağım Saati (72 Saat Süt İmhası)',
    hazirlikZamani: 'Tedavi Süresince Sağım Sırası En Son',
    akilliFisilti: '🥛 Türk Gıda Kodeksi uyarınca antibiyotikli sütler tanka dökülemez; yasal arınma süresi (72-96 saat) boyunca imha edilmelidir.',
    oncedenYapilacaklar: [
      '4 meme lobundan ön sütleri atıp CMT reaktifi ile jelleşmeyi skorla',
      'Klinik mastitisli lobdan steril süt numunesi alarak antibiyograma gönder',
      'Antibiyotik uygulanan ineğe renkli bacak bandı takarak sağım sonuna al',
      'İlacın yasal arınma süresi dolana kadar (72-96 saat) sütü imha et'
    ]
  },
  {
    id: 'kuafor_acici_ombre_keratin',
    category: 'kisisel_yasam',
    domain: 'KUAFOR',
    keywords: [
      'ombre', 'sombre', 'röfle', 'rofle', 'balyaj', 'oryal', 'açıcı', 'acici',
      'platin açıcı', 'saça ombre', 'saç açıldı', 'saç açtık', 'saç açma',
      'ombre yapıldı', 'ombre yaptık', 'sombre yapıldı', 'sombre yaptık',
      'röfle yapıldı', 'röfle yaptık', 'balyaj yapıldı', 'balyaj yaptık',
      'açıcı sürüldü', 'açıcı yapıldı', 'oryal sürüldü', 'oryal yapıldı'
    ],
    matcher: (lower: string) => {
      return (
        lower.includes('ombre') ||
        lower.includes('sombre') ||
        lower.includes('röfle') ||
        lower.includes('rofle') ||
        lower.includes('balyaj') ||
        lower.includes('oryal') ||
        (lower.includes('açıcı') && (lower.includes('saç') || lower.includes('platin') || lower.includes('boya') || lower.includes('sür') || lower.includes('yap'))) ||
        (lower.includes('saç') && (lower.includes('açıldı') || lower.includes('açtık') || lower.includes('açma') || lower.includes('açtırma')))
      );
    },
    baslik: 'Açıcı / Ombre Sonrası 48 Saat & Keratin',
    ikon: '✂️',
    renk: '#FCE7F3',
    varsayilanZaman: '48 Saat Yıkama Yasağı',
    hazirlikZamani: '3 Hafta Sonra Keratin',
    hazirlikSaatOncesi: 504,
    akilliFisilti: '✂️ Oryal veya açıcı uygulanan saç 48 saat yıkanmamalı; sararma önleyici mor şampuan ve 3 hafta sonra nem yüklemesi yapılmalıdır.',
    oncedenYapilacaklar: [
      'Müşteriye ilk 48 saat saçı yıkamaması ve sıcak fön çekmemesi talimatını ver',
      'Turunculaşma ve sararmayı önlemek için sülfatsız mor şampuan kullanımını tavsiye et',
      'Açma işlemi sonrası saç elastikiyetini korumak için 3 hafta sonrasına keratin/botoks seansı planla',
      'Dip boya ve cila tazeleme randevusunu 5 hafta sonrasına kaydet'
    ]
  },
  {
    id: 'kuafor_dip_boya_cila',
    category: 'kisisel_yasam',
    domain: 'KUAFOR',
    keywords: [
      'dip boya', 'dip boyası', 'cila', 'cila atıldı', 'cila yaptık', 'beyaz kapama',
      'dip açma', 'dip boyandı', 'dip boyadık', 'saç boyandı', 'saç boyadık', 'renk tazeleme'
    ],
    matcher: (lower: string) => {
      return (
        lower.includes('dip boya') ||
        lower.includes('cila atıldı') ||
        lower.includes('cila yap') ||
        lower.includes('beyaz kapama') ||
        (lower.includes('dip') && lower.includes('boya')) ||
        (lower.includes('saç') && (lower.includes('boyandı') || lower.includes('boyadık') || lower.includes('cila')))
      );
    },
    baslik: 'Dip Boya & Renk Koruma Takvimi',
    ikon: '✂️',
    renk: '#FCE7F3',
    varsayilanZaman: '4 Hafta Sonra Dip Tazeleme',
    hazirlikZamani: '48 Saat Renk Kilitleme',
    hazirlikSaatOncesi: 48,
    akilliFisilti: '✂️ Boya pigmentlerinin kilitlenmesi için ilk 48 saat sıcak sudan kaçınılmalı, 4 hafta sonrasına dip tazeleme planlanmalıdır.',
    oncedenYapilacaklar: [
      'İlk 48 saat aşırı sıcak su ve agresif sülfatlı şampuan kullanımından kaçınma uyarısı yap',
      'Renk pigmenti solmasını önlemek için asidik renk koruyucu saç bakım kremi tavsiye et',
      'Dip çıkış periyoduna göre 4-5 hafta sonrasına dip boya tazeleme randevusunu oluştur',
      'Saç derisinde olası boya hassasiyeti ve alerji takibini sağla'
    ]
  },
  {
    id: 'kuafor_brezilya_fonu_keratin',
    category: 'kisisel_yasam',
    domain: 'KUAFOR',
    keywords: [
      'brezilya fönü', 'brezilya fonu', 'kalıcı fön', 'keratin düzleştirme',
      'düzleştirici keratin', 'keratin yükleme', 'keratin botoks'
    ],
    matcher: (lower: string) => {
      return (
        lower.includes('brezilya fön') ||
        lower.includes('brezilya fon') ||
        lower.includes('kalıcı fön') ||
        lower.includes('kalici fon') ||
        (lower.includes('keratin') && (lower.includes('düzleştir') || lower.includes('botoks') || lower.includes('yükleme')))
      );
    },
    baslik: 'Brezilya Fönü & Keratin Sabitleme',
    ikon: '✂️',
    renk: '#FCE7F3',
    varsayilanZaman: '72 Saat Toka & Islanma Yasağı',
    hazirlikZamani: '3 Gün Sonra Sabitleme Yıkaması',
    hazirlikSaatOncesi: 72,
    akilliFisilti: '✂️ Brezilya fönü sonrası ilk 72 saat saç kesinlikle ıslanmamalı, toka takılmamalı ve kulak arkası yapılmamalıdır.',
    oncedenYapilacaklar: [
      'İlk 72 saat saça toka, mandal takılmaması ve kulak arkasına atılmaması kuralını ilet',
      'Nem, terleme veya temas durumunda hemen kurutulup titanyum presle geçilmesini hatırlat',
      'İlk yıkamayı 72 saat sonra sülfatsız ve tuzsuz şampuan ile salonda uygula',
      '4-6 ay pürüzsüzlük koruması için haftalık ev devam maskesi takvimi oluştur'
    ]
  },
  {
    id: 'kuafor_lazer_epilasyon_cilt',
    category: 'kisisel_yasam',
    domain: 'KUAFOR',
    keywords: [
      'lazer epilasyon', 'lazer yapıldı', 'lazer yaptık', 'epilasyon seansı',
      'cilt bakımı', 'hydrafacial', 'dermapen', 'altın iğne', 'iğneli epilasyon'
    ],
    matcher: (lower: string) => {
      return (
        lower.includes('lazer') ||
        lower.includes('epilasyon') ||
        lower.includes('hydrafacial') ||
        lower.includes('dermapen') ||
        lower.includes('cilt bakımı') ||
        lower.includes('cilt bakimi')
      );
    },
    baslik: 'Lazer & Cilt Koruma Protokolü',
    ikon: '✨',
    renk: '#FCE7F3',
    varsayilanZaman: '24 Saat Sıcak Duş Yasağı',
    hazirlikZamani: '4-6 Hafta Sonraki Seans',
    hazirlikSaatOncesi: 672,
    akilliFisilti: '✨ Lazer ve derin cilt bakımı sonrası 24 saat sıcak su ve kese yasaktır; leke kalmaması için SPF 50+ güneş kremi zorunludur.',
    oncedenYapilacaklar: [
      'İlk 24 saat sıcak duş, sauna, terletici spor ve kese uygulamasından kesinlikle kaçın',
      'Hiperpigmentasyon ve güneş lekesi oluşmaması için SPF 50+ koruyucu kremi her 3 saatte bir tazele',
      'Cilt bariyerini onarmak için yatıştırıcı panthenol veya centella jel kullan',
      'Kıl kökü veya cilt hücre yenilenme periyoduna göre 4-6 hafta sonrasına sonraki seansı takvimle'
    ]
  },
  {
    id: 'gumruk_tahliye_ordino_demuraj',
    category: 'is_kariyer',
    domain: 'GUMRUK',
    keywords: ['gemi limana yanaştı', 'tahliye başladı', 'konşimento geldi', 'ordino teslimi'],
    baslik: 'Gemi Tahliyesi, Ordino & Demuraj Sayacı',
    ikon: '📦',
    renk: '#E0E7FF',
    varsayilanZaman: 'Serbest Süre (Demurrage: 7 Gün)',
    hazirlikZamani: 'Serbest Süre Bitimine 2 Gün Kala',
    hazirlikSaatOncesi: 48,
    akilliFisilti: '📦 Konteyner serbest süresi aşıldığında armatör tarafından günlük yüksek dövizli Demurrage faturası kesilir.',
    oncedenYapilacaklar: [
      'Acenteden ordino belgesini al ve konşimento asıllarını ciro ettir',
      'Serbest süre (Free Time) bitiş tarihini takvime işle ve geri sayım başlat',
      'Gümrük beyannamesini tescil ettirip supalan muayene veya antrepo kaydını aç',
      'Liman ardiye ve terminal ücretleri dekontunu sisteme yükleyerek çıkış kapı fişi al'
    ]
  },
  {
    id: 'ev_kurban_et_dinlendirme',
    category: 'ev_teknik',
    domain: 'GENEL',
    keywords: ['kurban eti', 'et geldi', 'kurban payı', 'et doğrandı', 'eti poşetledik'],
    baslik: 'Et Dinlendirme & Dondurucu Porsiyonlama',
    ikon: '🥩',
    renk: '#FEE2E2',
    varsayilanZaman: '24 Saat Dinlendirme (+4°C)',
    hazirlikZamani: '24 Saat Sonra',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '🥩 Sıcak et asla hemen poşetlenip dondurucuya atılmaz; yeşillenmemesi için +4°C\'de 24 saat dinlendirilmelidir.',
    oncedenYapilacaklar: [
      'Etleri sıcakken poşetleme; tepsilere yayarak serin yerde veya dolapta (+4°C) 24 saat dinlendir',
      'Ölüm sertliği (Rigor Mortis) geçtikten sonra kıyma, kuşbaşı ve kemikli olarak porsiyonla',
      'Hava almayacak kilitli buzdolabı poşetlerine tarih ve porsiyon etiketi yapıştır',
      'Derin dondurucuya (-18°C) tek sıra halinde yerleştirerek hızlı şoklama sağla'
    ]
  },
  {
    id: 'yasam_yurtdisi_seyahat_hazirlik',
    category: 'kisisel_yasam',
    domain: 'GENEL',
    keywords: ['yurtdışına uçuş', 'roma bileti', 'avrupa seyahati', 'yurtdışına seyahat'],
    baslik: 'Yurtdışı Seyahat & Ev Güvenlik Kontrolü',
    ikon: '✈️',
    renk: '#E0E7FF',
    varsayilanZaman: 'Uçuş Günü',
    hazirlikZamani: 'Uçuştan 48 Saat Önce',
    hazirlikSaatOncesi: 48,
    akilliFisilti: '✈️ Pasaport geçerlilik süresi 6 aydan az ise birçok ülke ülkeye giriş izni vermez.',
    oncedenYapilacaklar: [
      'Pasaport geçerlilik süresinin en az 6 ay olduğunu ve vize tarihlerini doğrula',
      'İnteraktif Vergi Dairesi üzerinden yurtdışı çıkış harç pulunu online öde',
      'Operatörden yurtdışı / roaming internet paketini aktif et',
      'Evden çıkarken ana su vanasını kapat, prizleri çek ve kombiyi yaz moduna al'
    ]
  },

  // ==========================================
  // DENİZCİLİK & GEMİ İDARESİ SENARYOLARI (MARITIME & NAUTICAL SUITE)
  // ==========================================
  {
    id: 'denizcilik_psc_denetim',
    category: 'resmi',
    domain: 'DENIZCILIK',
    keywords: ['psc denetimi', 'psc kontrolü', 'liman devleti denetimi', 'paris mou', 'med mou', 'psc müfettişi', 'psc teftiş', 'psc tutulma'],
    baslik: 'PSC Liman Devleti Denetimi & Paris MoU',
    ikon: '⚓',
    renk: '#CFFAFE',
    varsayilanZaman: 'Varışta / Denetim Saati',
    hazirlikZamani: 'Liman Öncesi 24 Saat (Gemi İçi Denetim)',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '⚓ Paris MoU ve Akdeniz MoU denetimlerinde filika indirme, yangın tatbikatı ve 15 PPM OWS arızası doğrudan geminin tutulmasına (detention) yol açar.',
    oncedenYapilacaklar: [
      'Can filikaları indirme donanımı, motor çalıştırma ve acil durum dümen tatbikatını icra et',
      '15 PPM sintine separatörü (OWS) 3 yollu vana alarm ve otomatik durdurma testini doğrula',
      'Yağ Kayıt Jurnali (ORB Part I) ve Çöp Kayıt Jurnalini (Garbage Log) Başmühendis ve Kaptan imzalı hazırla',
      'Yangın damperleri, manyetik pusula deviasyon kartı, acil durum yangın pompası ve navigasyon fenerlerini test et',
      'Gemi adamları STCW ehliyetleri, MLC 2006 çalışma sözleşmeleri ve gemi klas sertifikalarını denetim masasına aç'
    ]
  },
  {
    id: 'denizcilik_draft_survey',
    category: 'ev_teknik',
    domain: 'DENIZCILIK',
    keywords: ['draft survey', 'draft okuma', 'draft hesabı', 'yük hesabı', 'gemiye yük alıyoruz', 'tahliye draftı', 'densimetre', 'hidrometre'],
    baslik: 'Draft Survey & Yükleme Balans Hesabı',
    ikon: '🚢',
    renk: '#E0F2FE',
    varsayilanZaman: 'Yükleme Öncesi / Bitiminde',
    hazirlikZamani: 'Ölçümden 1 Saat Önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '🚢 Draft survey hesaplarında deniz suyu yoğunluğu (SG) densimetre ile yerinde ölçülmeden yapılan ağırlık hesabı binlerce tonluk navlun ihtilafına sebep olur.',
    oncedenYapilacaklar: [
      'Baş, kıç ve vasat (Forward, Aft, Midship) sancak/iskele draft değerlerini draft iskelesi veya botla oku',
      'Borda iskelesinden numune alarak kalibre densimetre ile deniz suyu yoğunluğunu (Specific Gravity) ölç',
      'Tüm balast, tatlı su, yakıt (FO/DO) ve sintine tanklarının iskandillerini (sounding) alarak tank tablolarıyla hacmi belirle',
      'Hogging/sagging omurga sehimi düzeltmesini uygulayarak gemi net deplasmanını ve yük miktarını hesapla',
      'Yükleyici/tahliye sörveyörü ile müşterek draft survey tutanağını (Survey Report) karşılıklı imza altına al'
    ]
  },
  {
    id: 'denizcilik_bwm_balast_jurnali',
    category: 'resmi',
    domain: 'DENIZCILIK',
    keywords: ['balast jurnali', 'bwm', 'balast basma', 'balast tahliyesi', 'balast değişimi', 'ballast water', 'bwts'],
    baslik: 'Balast Suyu Yönetimi & BWM Jurnali',
    ikon: '🌊',
    renk: '#CFFAFE',
    varsayilanZaman: 'Operasyon Saati',
    hazirlikZamani: 'Operasyon Öncesi (D-2 Standart Testi)',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '🌊 IMO BWM Sözleşmesi uyarınca açık denizde derin su balast değişimi en az 200 mil açıkta ve 200 metre derinlikte yapılmalıdır.',
    oncedenYapilacaklar: [
      'BWM D-2 arıtma sistemi (BWTS) UV lambaları ve filtrasyon basınç farkını operasyon öncesi test et',
      'Açık deniz derin su balast değişimini (Ballast Exchange) kıyıdan en az 200 deniz mili açıkta ve 200 metre derinlikte tamamla',
      'Balast Kayıt Jurnaline (BWRB) başlangıç/bitiş koordinatları, tank numaraları ve metreküp hacmini eksiksiz işle',
      'Pompa emiş ve basma basınçlarını sürekli izleyerek tank taşması veya havalık (air pipe) tıkanıklığını engelle',
      'Liman otoritesine ve PSC müfettişine ibraz edilmek üzere güncel Balast Su Bildirim Formunu (BW Reporting Form) hazırla'
    ]
  },
  {
    id: 'denizcilik_ows_sintine_orb',
    category: 'ev_teknik',
    domain: 'DENIZCILIK',
    keywords: ['ows', 'sintine basılacak', 'sintine separatörü', '15 ppm', 'yağ jurnali', 'oil record book', 'orb', 'sludge yakımı'],
    baslik: 'OWS 15 PPM & Yağ Jurnali (ORB)',
    ikon: '⚓',
    renk: '#E2E8F0',
    varsayilanZaman: 'Açık Deniz Seyrinde',
    hazirlikZamani: 'T-30 Dk (Sintine Seviye & Kalibrasyon)',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '⚠️ MARPOL Annex I uyarınca özel alanlarda (Akdeniz, Karadeniz) ve 15 PPM üzeri sintine basılması uluslararası çevre suçudur ve gemiye el konulma nedenidir.',
    oncedenYapilacaklar: [
      '15 PPM sintine alarm ünitesi (OCM) temiz su sıfırlamasını ve 3 yollu geri dönüş vanası solenoid testini tamamla',
      'Geminin özel alan dışında (Outside Special Area), seyir halinde (en route) ve hızının en az 4 knot olduğunu teyit et',
      'Yağ Kayıt Jurnali Part I içine Code D (Sintine tahliyesi) veya Code C (Sludge toplama/yakma) kayıtlarını hatasız işle',
      'İşlem bitiminde separatör sintine basma valfini kapatıp asma kilitle emniyete al ve sayaç değerini kaydet',
      'Her sayfa bitiminde jurnali Başmühendis ve Gemi Kaptanına ıslak imzayla mühürlet'
    ]
  },
  {
    id: 'denizcilik_passage_plan_kalkis',
    category: 'ev_teknik',
    domain: 'DENIZCILIK',
    keywords: ['passage plan', 'sefer planı', 'kalkış hazırlığı', 'seyre kalkış', 'köprüüstü çeklist', 'dümen testi', 'ecdis rota'],
    baslik: 'Passage Plan & Kalkış Seyir Çeklisti',
    ikon: '🧭',
    renk: '#E0F2FE',
    varsayilanZaman: 'Kalkıştan 2 Saat Önce',
    hazirlikZamani: 'T-2 Saat (Köprüüstü Kontrolü)',
    hazirlikSaatOncesi: 2,
    akilliFisilti: '🧭 SOLAS Chapter V uyarınca kalkıştan en geç 12 saat önce acil durum dümen donanımı ve telsiz teçhizatı bizzat test edilmelidir.',
    oncedenYapilacaklar: [
      'Berthing to Berthing (Rıhtımdan rıhtıma) ECDIS rota planını, No-Go Area ve Squat derinlik paylarını onayla',
      'SOLAS kuralı: Dümen motorları (Steering Gear) ana/acil durum geçişini, tele-motor ve dümen açısı müşirini test et',
      'Manyetik pusula ve Gyro pusula repeater eşitlemesini yap; seyir fenerleri ve sesli sis düdüğünü dene',
      'VHF, GMDSS Navtex, EPIRB ve SART cihazlarının batarya ve alıcı testlerini gerçekleştir',
      'Liman kontrol (VTS) ile irtibata geçerek kalkış izni (Departure Clearance) ve römorkör/palamar koordinasyonunu sağla'
    ]
  },
  {
    id: 'denizcilik_pilot_carmıh_mpx',
    category: 'ev_teknik',
    domain: 'DENIZCILIK',
    keywords: ['pilot çarmıhı', 'pilot alacağız', 'kılavuz kaptan', 'pilot ladder', 'boğaz geçişi', 'mpx', 'pilot card'],
    baslik: 'Kılavuz Kaptan (Pilot) & Çarmıh Emniyeti',
    ikon: '🧑‍✈️',
    renk: '#FEF3C7',
    varsayilanZaman: 'Pilot İstasyonuna Varışta',
    hazirlikZamani: 'Varıştan 45 Dk Önce (Çarmıh Donatma)',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '🧑‍✈️ SOLAS Reg V/23 ve IMPA standardına aykırı bağlanan çarmıhlar kılavuz kaptanın gemiye çıkışını reddetmesine ve boğaz sıra kaybına yol açar.',
    oncedenYapilacaklar: [
      'Pilot çarmıhını SOLAS ve IMPA kurallarına göre su seviyesinden istenen yükseklikte (genellikle 1.5 - 2m) donat',
      'Çarmıh başında ışıklı ve kendinden duman kandilli can simidi, heman halatları ve güverte zabiti bulundur',
      'Gemi draft, boy, makine gücü ve manevra özelliklerini içeren Pilot Card föyünü hazırla',
      'Köprüüstünde Kaptan-Kılavuz Kaptan Bilgi Değişimi (MPX) formunu doldur ve rota/akıntı brifingini al',
      'VHF Kanal 16 ve yerel sektör kanalından VTS/Pilot botu ile sürekli telsiz temasını sürdür'
    ]
  },
  {
    id: 'denizcilik_bunkering_yakit',
    category: 'ev_teknik',
    domain: 'DENIZCILIK',
    keywords: ['bunkering', 'bunker alacağız', 'yakıt ikmali', 'barçtan yakıt', 'marpol bdn', 'bunker checklist'],
    baslik: 'Bunkering Yakıt İkmali & MARPOL BDN',
    ikon: '⛽',
    renk: '#FED7AA',
    varsayilanZaman: 'Bunker Barç Yanaşmasında',
    hazirlikZamani: 'T-1 Saat (Scupper & İSG Kontrolü)',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '⛽ Yakıt ikmalinde güvertedeki tüm frengi (scupper) delikleri mekanik tapalarla tıkanmalı, taşma tepsilerinde yangın söndürücüler hazır tutulmalıdır.',
    oncedenYapilacaklar: [
      'Gemi ve barç arasında Ship-Shore Safety Checklist (SSSCL) formunu müştereken imzala',
      'Güverte frengi deliklerini (scupper) plastik/mekanik tapalarla kapat ve yakıt manifoldu taşma tavasını denetle',
      'Manifold flanş civatalarını tam sıkıp topraklama kablosunu bağla; acil stop (Emergency Stop) butonunu test et',
      'Manifold damlama vanasından sürekli akışla mühürlü MARPOL şahit yakıt numunesi (Drip Sample) al',
      'BDN (Bunker Delivery Note) üzerindeki kükürt oranını (%0.50 VLSFO veya ECA %0.10 ULSFO) ve yoğunluğu teyit et'
    ]
  },
  {
    id: 'denizcilik_solas_tatbikat_filika',
    category: 'resmi',
    domain: 'DENIZCILIK',
    keywords: ['filika tatbikatı', 'yangın tatbikatı', 'boat drill', 'terk-i sefine', 'abandon ship', 'solas tatbikat'],
    baslik: 'SOLAS Terk & Yangın Tatbikatı',
    ikon: '🛟',
    renk: '#FEE2E2',
    varsayilanZaman: 'Aylık Zorunlu Emniyet Saati',
    hazirlikZamani: 'Tatbikattan 30 Dk Önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '🛟 SOLAS Chapter III uyarınca mürettebatın en az %25’i değiştiğinde liman kalkışını takip eden 24 saat içinde terk-i sefine ve yangın tatbikatı zorunludur.',
    oncedenYapilacaklar: [
      'Genel alarmı (General Emergency Alarm: 7 kısa 1 uzun düdük) çal ve toplanma mahallinde (Muster Station) yoklama al',
      'Can filikası indirme mekanizmasını (davit) çalıştır, filikayı su seviyesine indir ve filika motorunu test et',
      'Yangın timi solunum cihazlarını (SCBA/BA set) ve acil durum yangın pompasını (Emergency Fire Pump) iki koldan basınçla dene',
      'Denize adam düştü (MOB) can simidi, duman kandili ve kurtarma botu (Rescue Boat) acil indirme simülasyonunu yap',
      'Tatbikat başlangıç, bitiş saatlerini ve tespit edilen eksiklikleri Gemi Seyir Jurnaline (Deck Log Book) kaydet'
    ]
  },
  {
    id: 'denizcilik_kapali_mahal_hotwork',
    category: 'ev_teknik',
    domain: 'DENIZCILIK',
    keywords: ['kapalı mahal', 'tanka girilecek', 'enclosed space', 'sıcak çalışma', 'hot work', 'gaz ölçümü', 'tank temizliği'],
    baslik: 'Kapalı Mahal Girişi & Sıcak Çalışma',
    ikon: '🦺',
    renk: '#FEE2E2',
    varsayilanZaman: 'Giriş Öncesi (İSG İzni)',
    hazirlikZamani: 'T-2 Saat (Cebri Havalandırma)',
    hazirlikSaatOncesi: 2,
    akilliFisilti: '⚠️ Kapalı mahallerde (tank, zincirlik, çifte dip) oksijen oranı %20.9 ve patlayıcı gaz %0 LEL seviyesine gelmeden içeriye tek bir adım dahi atılamaz.',
    oncedenYapilacaklar: [
      'Mahalli en az 24 saat boyunca cebri mekanik fanlarla havalandır ve boru devrelerini kör flanşla izole et',
      'Kalibre 4 gaz dedektörü ile dip, orta ve üst seviyelerden Oksijen (%20.9), LEL (%0), H2S (0 ppm) ve CO ölçümü yap',
      'Kapalı Mahal Giriş İznini (Enclosed Space Entry Permit) Başmühendis ve Kaptana onaylat',
      'Giriş kapısında can halatı, acil kaçış solunum seti (EEBD) ve telsizli nöbetçi personel (Standby person) konuşlandır',
      'Sıcak çalışma varsa 10 metre çapındaki yanıcı malzemeleri uzaklaştır ve yangın devresini basınçlandır'
    ]
  },
  {
    id: 'denizcilik_demirleme_anchor_watch',
    category: 'ev_teknik',
    domain: 'DENIZCILIK',
    keywords: ['demir atacağız', 'demirleme', 'anchor watch', 'demir nöbeti', 'zincir kaloma', 'demir tarama', 'demir mevkii'],
    baslik: 'Demirleme & Demir Nöbeti (Anchor Watch)',
    ikon: '⚓',
    renk: '#CFFAFE',
    varsayilanZaman: 'Demir Mevkiine Varışta',
    hazirlikZamani: 'T-30 Dk (Irgat & Başüstü Hazırlığı)',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '⚓ Demir taraması ani karaya oturma riskidir; radar guard zone ve GPS anchor watch alarmı köprüüstünde sürekli aktif tutulmalıdır.',
    oncedenYapilacaklar: [
      'Başüstü ırgat hidrolik/elektrik gücünü devreye al, feneri aç ve loça kapağını sök',
      'Derinliğin en az 5-7 katı kadar zincir kalomasını (kilit adedini) su derinliği ve hava koşullarına göre fundala',
      'Irgat frenini sıkıp bosa donanımını (chain stopper) bağla ve demirin tuttuğunu (bitter end) teyit et',
      'ECDIS ve radarda çapa alarmını (Anchor Watch Guard Zone) kur; sahil fenerlerinden transit kerteriz al',
      'VHF Kanal 16 ve yerel VTS kanalından demir atılan mevkiyi (enlem/boylam) ve demirleme saatini raporla'
    ]
  },
  {
    id: 'denizcilik_isps_gangway_guvenlik',
    category: 'resmi',
    domain: 'DENIZCILIK',
    keywords: ['isps', 'güvenlik seviyesi', 'gangway nöbeti', 'borda iskelesi', 'ziyaretçi defteri', 'gemi güvenliği', 'security level'],
    baslik: 'ISPS Gemi Güvenliği & Gangway Nöbeti',
    ikon: '🛡️',
    renk: '#E0E7FF',
    varsayilanZaman: 'Liman Boyunca (7/24 Nöbet)',
    hazirlikZamani: 'Rıhtıma Yanaşmada',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '🛡️ ISPS Kodu gereği borda iskelesinde (Gangway) kimlik kontrolü yapılmadan ve ziyaretçi kartı verilmeden hiç kimse gemiye kabul edilemez.',
    oncedenYapilacaklar: [
      'Borda iskelesi altına can kurtarma güvenlik ağını (Safety Net) usulüne uygun ger',
      'Gangway nöbetçi kulübesinde kimlik kontrol föyü, ziyaretçi giriş-çıkış defteri ve metal el dedektörünü hazırla',
      'Geminin aktif ISPS Güvenlik Seviyesine (Security Level 1/2/3) uygun borda aydınlatması ve giriş kapısı kilitlerini denetle',
      'Gemi Güvenlik Zabiti (SSO) ile Liman Güvenlik Zabiti (PFSO) arasında Güvenlik Deklarasyonu (DoS) imzala',
      'Kaçak yolcu (Stowaway) taramasını kalkış öncesi ambarlar, makine dairesi ve filikalarda tamamla'
    ]
  },
  {
    id: 'denizcilik_liman_ordino_pratique',
    category: 'resmi',
    domain: 'DENIZCILIK',
    keywords: ['free pratique', 'sağlık bildirimi', 'gemi acentesi', 'crew list', 'liman çıkış belgesi', 'deniz sağlık beyanı', 'gümrük muhafaza gemi'],
    baslik: 'Liman Giriş-Çıkış & Free Pratique Evrakı',
    ikon: '📑',
    renk: '#F1F5F9',
    varsayilanZaman: 'Varış / Kalkış Saati',
    hazirlikZamani: 'Varıştan 24 Saat Önce (ETA Bildirimi)',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '📑 Gemiye sarı karantina sancağı (Q Flag) çekilip Free Pratique (Serbest Pratika) onayı alınmadan rıhtımdan kimse gemiye çıkamaz, temas kurulamaz.',
    oncedenYapilacaklar: [
      'Sağlık Denetleme Merkezine Deniz Sağlık Bildirimini (Maritime Declaration of Health) ve aşı listesini ilet',
      'Mürettebat Listesi (Crew List), Yolcu Listesi ve Son 10 Liman Listesini (Last 10 Ports of Call) kaşe-imzalı hazırla',
      'Gümrük Muhafaza için Gemi Mağazası (Ship Stores - alkol/sigara kilit altına alma) ve Personel Eşya Beyanını düzenle',
      'Liman Başkanlığına varış öncesi ISPS Pre-Arrival Formunu ve yük manifestosunu acente kanalıyla ulaştır',
      'Tüm liman harçları ve kontroller bitiminde Yola Elverişlilik Belgesini (Port Clearance) teslim al'
    ]
  },
  // ECZACILIK & MEDULA SUT SENARYOLARI
  {
    id: 'eczacilik_soguk_zincir_takip',
    category: 'saglik',
    domain: 'ECZACILIK',
    keywords: ['soğuk zincir', 'soguk zincir', 'aşı dolabı', 'asi dolabi', '2-8 derece', 'ısı takip çizelgesi', 'data logger'],
    baslik: '2-8°C Soğuk Zincir & Isı Takip Kaydı',
    ikon: '❄️',
    renk: '#E0F2FE',
    varsayilanZaman: 'Sabah (09:00) & Akşam (18:00)',
    hazirlikZamani: 'Mesai Başlangıcı',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '❄️ Aşı ve insülinlerin bozulmaması için sıcaklık 2-8°C aralığında olmalı, günde 2 kez çizelgeye ıslak imza atılmalıdır.',
    oncedenYapilacaklar: [
      'Buzdolabının dijital data-logger ve termometresini oku (2-8°C aralığı kontrolü)',
      'Sabah ve akşam sıcaklık/nem değerlerini İlçe Sağlık takip formuna işle',
      'Olası elektrik kesintisi için akü ve SMS uyarı mekanizmasını test et',
      'İlaçların buzdolabı iç duvarlarına ve dondurucu kanallarına değmediğini kontrol et'
    ]
  },
  {
    id: 'eczacilik_medula_fatura_kolileme',
    category: 'finans',
    domain: 'ECZACILIK',
    keywords: ['medula', 'sut provizyon', 'sgk fatura', 'reçete kolisi', 'fatura sonlandırma', 'a grubu reçete', 'b grubu reçete'],
    baslik: 'Medula SGK Fatura Sonlandırma & Reçete Kolisi',
    ikon: '📑',
    renk: '#FEE2E2',
    varsayilanZaman: 'Ayın 1-15 Takvimi (17:00)',
    hazirlikZamani: 'Teslimden 1 Gün Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '📑 SUT kuralları gereği katılım payı muafiyeti, doktor kaşesi ve ICD-10 teşhis kodu kontrol edilmeden koli kapatılamaz.',
    oncedenYapilacaklar: [
      'Medula sisteminden A, B ve C grubu döküm listesi ve fatura çıktısını al',
      'Reçeteler üzerindeki doktor kaşesi, ıslak imza veya e-Reçete onayını doğrula',
      'Raporlu ilaçlarda SUT EK-4/D katılım payı muafiyet kodlarını kontrol et',
      'e-Faturayı SGK Sağlık Sosyal Güvenlik Merkezine hitaben düzenle',
      'Reçeteleri koliye yerleştirip koli teslim föyünü imzala'
    ]
  },
  {
    id: 'eczacilik_renkli_recete_its',
    category: 'resmi',
    domain: 'ECZACILIK',
    keywords: ['kırmızı reçete', 'kirmizi recete', 'yeşil reçete', 'yesil recete', 'renkli reçete', 'rrs', 'narkotik ilaç', 'kontrole tabi'],
    baslik: 'Renkli Reçete (RRS) & İTS Satış Onayı',
    ikon: '💊',
    renk: '#FEE2E2',
    varsayilanZaman: 'Anlık İşlem (RRS)',
    hazirlikZamani: 'Derhal',
    akilliFisilti: '💊 Uyuşturucu ve psikotrop ilaçlar kilitli çelik kasada saklanmalı; RRS onayı ve kimlik tespiti yapılmadan teslim edilemez.',
    oncedenYapilacaklar: [
      'Renkli Reçete Sisteminde (RRS) e-Reçete doğrulaması yap',
      'Teslim alan kişinin T.C. Kimlik Numarasını ve imzasını sisteme kaydet',
      'İTS (İlaç Takip Sistemi) üzerinden karekod satış bildirimini sonlandır',
      'İlacı kilitli çelik ecza dolabından çıkarıp Uyuşturucu Defterine kaydet'
    ]
  },
  {
    id: 'eczacilik_majistral_laboratuvar',
    category: 'saglik',
    domain: 'ECZACILIK',
    keywords: ['majistral', 'havan', 'laboratuvar defteri', 'merhem hazırla', 'salisilik asit', 'pomad', 'bud süresi'],
    baslik: 'Majistral Formül Hazırlığı & Defter Kaydı',
    ikon: '⚗️',
    renk: '#EDE9FE',
    varsayilanZaman: 'Hazırlık Önceliği (13:30)',
    hazirlikZamani: '30 dk önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '⚗️ Türk Farmakopesine göre hazırlanan formül Majistral Defterine işlenmeli, dahili kırmızı veya harici beyaz etiket yapıştırılmalıdır.',
    oncedenYapilacaklar: [
      'Hassas terazi kalibrasyonunu kontrol et ve laboratuvarı sterilize et',
      'Hammaddelerin analiz sertifikası ve miad uygunluğunu doğrula',
      'Maksimum tek ve günlük doz Farmakope kontrollerini yap',
      'Majistral Kayıt Defterine reçete no, doktor, hasta ve bileşenleri işle',
      'Dahili veya Harici etiketi yapıştırıp BUD tüketim tarihini yaz'
    ]
  },
  // İSG (İŞ SAĞLIĞI VE GÜVENLİĞİ) SENARYOLARI
  {
    id: 'isg_ibys_egitim_bildirimi',
    category: 'resmi',
    domain: 'ISG',
    keywords: ['ibys', 'isg eğitimi', 'is güvenliği eğitimi', 'çalışan eğitimi bildirimi', '16 saat eğitim', 'temel isg'],
    baslik: 'İBYS Çalışan Eğitimi & Yasal Bildirim',
    ikon: '🦺',
    renk: '#FEF3C7',
    varsayilanZaman: 'Eğitim Bildirim Süresi (17:00)',
    hazirlikZamani: 'Eğitimden 1 Gün Önce',
    hazirlikSaatOncesi: 24,
    akilliFisilti: '🦺 Çok Tehlikeli sınıfta yılda 16 saat, Tehlikeli sınıfta 12 saat, Az Tehlikeli sınıfta 8 saat eğitim tamamlanıp İBYS\'ye bildirilmelidir.',
    oncedenYapilacaklar: [
      'Tehlike sınıfına uygun eğitim sunumu ve müfredatını hazırla',
      'Katılımcıların ıslak imzalı Eğitim Katılım Tutanaklarını tanzim et',
      'Ölçme-değerlendirme sınavı uygulayarak puanları kaydet',
      'İSG-KATİP / İBYS sistemine T.C. Kimlik Numaraları ile eğitim bildirimini yap'
    ]
  },
  {
    id: 'isg_ramak_kala_dof',
    category: 'resmi',
    domain: 'ISG',
    keywords: ['ramak kala', 'ramakkala', 'ucuz atlattık', 'kaza tehlikesi', 'döf formu', 'kök neden analizi'],
    baslik: 'Ramak Kala Olay Tutanağı & DÖF Başlatma',
    ikon: '⚠️',
    renk: '#FEE2E2',
    varsayilanZaman: 'Aynı Gün İçinde (İvedi)',
    hazirlikZamani: 'Derhal',
    akilliFisilti: '⚠️ Ramak kala olayları gelecekteki ölümcül iş kazalarının habercisidir; olay yeri fotoğraflanmalı ve 5 Neden analiziyle DÖF açılmalıdır.',
    oncedenYapilacaklar: [
      'Olay yerini fotoğrafla ve tanık çalışanların ifadelerini al',
      'Ramak Kala Olay Bildirim Tutanağını düzenle',
      '5 Neden (5 Why) yöntemiyle kök neden analizini yap',
      'Düzeltici ve Önleyici Faaliyet (DÖF) açıp termin tarihi belirle',
      'İSG Onaylı Defterine ve Kurul gündemine kaydet'
    ]
  },
  {
    id: 'isg_is_kazasi_sgk_bildirimi',
    category: 'resmi',
    domain: 'ISG',
    keywords: ['iş kazası', 'is kazasi', 'sgk kaza bildirimi', '3 iş günü kuralı', 'kaza tahkikat'],
    baslik: 'SGK İş Kazası Bildirimi (Kritik 3 İş Günü)',
    ikon: '⏱️',
    renk: '#FEE2E2',
    varsayilanZaman: 'Son Tarih: 3 İş Günü (17:00)',
    hazirlikZamani: 'Kaza Anında Derhal',
    akilliFisilti: '⏱️ 5510 sayılı Kanun gereği iş kazası kolluğa derhal, SGK\'ya en geç 3 iş günü içinde bildirilmelidir; aksi halde ağır para cezası uygulanır.',
    oncedenYapilacaklar: [
      'İlk yardım uygulayıp 112 ile hastaneye sevk et; adli vakada kolluğa haber ver',
      'Kaza mahallini muhafaza edip Kaza İnceleme Tutanağını tanzim et',
      'SGK e-Bildirge portalından İş Kazası Bildirim Formunu onaylat',
      'İşyeri hekimi ile istirahat rapor sürecini takip et',
      'Tespit ve Öneri Defterine kazayı ve önlemleri işle'
    ]
  },
  {
    id: 'isg_sicak_is_kapali_alan_izni',
    category: 'ev_teknik',
    domain: 'ISG',
    keywords: ['sıcak iş', 'sicak is', 'kaynak izni', 'kapalı alan', 'gaz ölçümü', 'çalışma izni', 'ptw'],
    baslik: 'Sıcak İş & Kapalı Alan İzni (PTW)',
    ikon: '🔥',
    renk: '#FECACA',
    varsayilanZaman: 'Çalışma Başlangıcı (Ön Onay)',
    hazirlikZamani: 'Çalışmadan 45 dk Önce',
    hazirlikSaatOncesi: 1,
    akilliFisilti: '🔥 Kaynak öncesi 15 metredeki yanıcılar temizlenmeli; kapalı alanda gaz ölçümü yapılmadan ve yangın gözcüsü olmadan girilemez.',
    oncedenYapilacaklar: [
      '15 m yarıçaptaki yanıcı maddeleri kaldır ve yangın battaniyesi ser',
      'Çoklu gaz dedektörü ile Oksijen (%19.5-23.5) ve LEL (<%10) ölçümü yap',
      'En az 2 adet 6 kg ABC KKT yangın söndürücü ve yangın gözcüsü yerleştir',
      'Paraşüt tipi emniyet kemeri ve kurtarma tripodu vinç bağlantısını test et',
      'Sıcak İş İzin Belgesini (PTW) imzalayıp çalışma noktasına as'
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
