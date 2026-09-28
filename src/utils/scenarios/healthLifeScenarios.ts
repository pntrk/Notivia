import type { ShortScenarioMatch } from '../scenarioDatabase.ts';

/**
 * Notivia Bilişsel Modülü: SAGLIK, ECZACILIK, VETERINER
 * Toplam 205 Bilişsel Senaryo
 */
export const HEALTH_LIFE_SCENARIOS: ShortScenarioMatch[] = [
  {
    "id": "saglik_kan_gazi_laktat_analizi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "kan gazı analizi",
      "arter kan gazı",
      "akg analizi",
      "laktat seviyesi",
      "metabolik asidoz"
    ],
    "baslik": "Arter Kan Gazı (AKG) & Laktat / Asit-Baz Analizi",
    "ikon": "🩸",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Numune Alımından İtibaren 15 Dk",
    "hazirlikZamani": "Heparinli Enjektör & Allen Testi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩸 Arter ponksiyonu öncesi kollateral dolaşım için Allen Testi yapılmalı; kan gazı enjektörü hava kabarcığı kalmadan buz içinde 15 dk'da çalışılmalıdır.",
    "oncedenYapilacaklar": [
      "Radyal arter ponksiyonu öncesi ulnar arter dolaşımını teyit etmek için modifiye Allen Testini uygula",
      "Lityum heparinli kan gazı enjektörüyle 1-2 ml arteriyel kan örneği al ve iğne ucunu hava almayacak şekilde mühürle",
      "pH (7.35-7.45), PaCO2, PaO2, HCO3 ve Laktat (>2 mmol/L sepsis alarmı) değerlerini kan gazı cihazında okut",
      "Sonuçları hasta başı monitör parametreleri ve mekanik ventilatör PEEP/FiO2 ayarlarıyla korele et"
    ]
  },
  {
    "id": "saglik_dekubitus_pozisyon_cizelgesi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "dekübitus pozisyonu",
      "bası yarası önleme",
      "2 saatte bir pozisyon",
      "havalı yatak kontrolü",
      "braden skalası"
    ],
    "baslik": "Dekübitus Bası Yarası Önleme & 2 Saatlik Pozisyon",
    "ikon": "🛏️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "2 Saatte Bir (Gündüz & Gece)",
    "hazirlikZamani": "Vardiya Başı Cilt Değerlendirmesi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🩺 İmmobil hastalarda sakrum, trokanter ve topuklarda iskemi ve doku nekrozunu önlemek için kesintisiz 2 saatte bir 30° lateral pozisyon verilmelidir.",
    "oncedenYapilacaklar": [
      "Braden Bası Riski Değerlendirme Skalası ile hastanın bası yarası risk puanını belirle",
      "Dinamik basınçlı boru tipi havalı yatağın motor basınç ayarını hastanın kilosuna göre kalibre et",
      "Hastaya sırasıyla Sırtüstü, 30° Sol Yan ve 30° Sağ Yan pozisyonlarını verip destek yastıkları yerleştir",
      "Kemik çıkıntılarını bariyer kremle nemlendirip pozisyon takip saatini hasta başı föyüne paraf et"
    ]
  },
  {
    "id": "saglik_trombolitik_tpa_inme",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "kapi-iğne zamanı",
      "tpa trombolitik",
      "akut iskemik inme",
      "nihss skoru",
      "beyin bt anjiyo"
    ],
    "baslik": "Akut İnme & Trombolitik Tedavi (Kapı-İğne < 60 Dk)",
    "ikon": "🧠",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Semptomdan Sonraki İlk 4.5 Saat",
    "hazirlikZamani": "Acil Triyaj & Kontrastsız Beyin BT",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🧠 Akut iskemik inmede 'Zaman Beyindir'; semptom başlangıcından sonraki ilk 4.5 saat içinde IV tPA (Alteplase) başlanmalı, kapı-iğne süresi <60 dk olmalıdır.",
    "oncedenYapilacaklar": [
      "Nörolojik muayene ile NIHSS (National Institutes of Health Stroke Scale) skorunu hesapla",
      "Kanama ekarte etmek için ivedilikle kontrastsız Kraniyal BT ve kan glukoz ölçümünü tamamla",
      "Trombolitik tedavi kontrendikasyonlarını (Tansiyon >185/110, antikoagülan kullanımı, major cerrahi) sorgula",
      "Hekim kararıyla IV tPA (0.9 mg/kg) dozunun %10'unu bolus, kalanını 60 dakikada infüzyon pompasıyla ver"
    ]
  },
  {
    "id": "saglik_topuk_kani_guthrie",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "topuk kanı alma",
      "guthrie kartı",
      "fenilketonüri taraması",
      "yenidoğan tarama",
      "ilk 72 saat topuk kanı"
    ],
    "baslik": "Yenidoğan Topuk Kanı (Guthrie Kartı) Taraması",
    "ikon": "👶",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Doğumdan Sonra 48-72. Saat",
    "hazirlikZamani": "Bebek En Az 24 Saat Beslendikten Sonra",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "👶 Fenilketonüri ve konjenital hipotiroidi taraması için topuk kanı bebek en az 24 saat anne sütü/mama ile beslendikten sonra özel filtre kağıdına alınır.",
    "oncedenYapilacaklar": [
      "Bebeğin topuğunun lateral veya medyal kenarını ılık bezle ısıtıp aseptik solüsyonla temizle ve kurut",
      "Steril otomatik lanset ile ponksiyon yap, ilk kan damlasını kuru gazlı bezle sil",
      "Guthrie filtre kağıdındaki 4 adet dairenin her birini arkaya geçecek şekilde tek damla kanla doyur",
      "Kartı yatay şekilde oda ısısında 3 saat kurutarak Halk Sağlığı Laboratuvarı transfer zarfına koy"
    ]
  },
  {
    "id": "saglik_kemoterapi_ekstravazasyon",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "ekstravazasyon kiti",
      "vezikan ilaç sızıntısı",
      "kemoterapi kaçması",
      "antidot uygulama",
      "soğuk uygulama ekstravazasyon"
    ],
    "baslik": "Kemoterapi Ekstravazasyonu Acil Müdahale Protokolü",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Sızıntı Anında (Saniyeler İçinde)",
    "hazirlikZamani": "İnfüzyon Öncesi Damar Yolu Güvenliği",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "⚠️ Vezikan antineoplastik ilaç cilt altına sızarsa doku nekrozu yapar; infüzyon derhal durdurulmalı, kanül çekilmeden aspirasyon yapılmalıdır.",
    "oncedenYapilacaklar": [
      "İnfüzyon pompasını derhal durdur; iğneyi/kanülü yerinden çıkarmadan 3-5 ml kan ve ilacı aspire et",
      "Ekstravazasyon acil kitini aç, ilacın vezikan tipine göre (Antrasiklin: Soğuk + DMSO / Vinka: Sıcak + Hiyaluronidaz) antidot uygula",
      "Ekstravazasyon alanının sınırlarını cerrahi kalemle çiz ve kolu kalp seviyesinin üzerine eleve et",
      "Onkoloji hekimine haber verip vakanın fotoğrafını çekerek İlaç Güvenliği Ekstravazasyon Formuna kaydet"
    ]
  },
  {
    "id": "veteriner_hipokalsemi_sut_hummasi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "hipokalsemi",
      "süt humması",
      "kalsiyum boroglukonat",
      "doğum felci inek",
      "yatan inek kalsiyum"
    ],
    "baslik": "Büyükbaş Hipokalsemi (Süt Humması) & IV Kalsiyum İnfüzyonu",
    "ikon": "🐄",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Doğumdan Sonraki İlk 48 Saat",
    "hazirlikZamani": "Vücut Sıcaklığında Kalsiyum Şişesi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🐾 Yüksek verimli ineklerde doğum felcinde kalsiyum boroglukonat vücut ısısında yavaş (15-20 dk) IV verilmeli, kalp steteskopla dinlenmelidir.",
    "oncedenYapilacaklar": [
      "Hastanın sternal yatış, başını göğsüne yaslama ve kulaklarda soğukluk semptomlarını kontrol et",
      "Kalsiyum çözeltisini 38°C vücut sıcaklığına kadar ılık suda beklet",
      "Juguler venadan geniş çaplı kanülle serumu yavaş damla hızında (dakikada 20-30 ml) başlat",
      "Aritmi veya bradikardi gelişirse infüzyonu derhal durdurup kalp ritmini steteskopla izle"
    ]
  },
  {
    "id": "veteriner_flutd_uretral_sondalama",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "flutd kedi",
      "üretral obstrüksiyon",
      "kedi idrar sondası",
      "tom cat kateter",
      "mesane yıkama"
    ],
    "baslik": "Kedi FLUTD Üretral Tıkanıklık & Tom-Cat Sondalama",
    "ikon": "🐱",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Acil Başvuru Anında",
    "hazirlikZamani": "Sedasyon & Steril Kateter Seti",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🐾 Tıkalı erkek kedilerde 24 saat içinde üre/kreatinin ve potasyum yükselerek kardiyak arreste yol açar; acil sondalama ve lavaj şarttır.",
    "oncedenYapilacaklar": [
      "Palpasyonla aşırı gergin ve sert taş mesaneyi (glob vesicale) hisset, serum potasyumunu ölç",
      "Hafif analjezi/sedasyon altında steril Tom-Cat açık uçlu kateteri üretraya kayganlaştırıcı jelle yerleştir",
      "Kristal ve müküs tıkacını ılık steril salin solüsyonuyla nazikçe yıkayarak geri çek",
      "Kateteri prepüsyuma dikişle sabitleyip kapalı idrar toplama torbasına bağla"
    ]
  },
  {
    "id": "veteriner_cmt_subklinik_mastitis",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "california mastitis testi",
      "cmt testi",
      "subklinik mastitis",
      "meme lop reaktifi",
      "somatik hücre sayısı"
    ],
    "baslik": "California Mastitis Testi (CMT) & Somatik Hücre Taraması",
    "ikon": "🥛",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Sabah Sağımı Öncesi",
    "hazirlikZamani": "CMT Pleyti & Mor Reaktör Sıvısı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🐾 Subklinik mastitiste süt dışarıdan normal görünür; CMT reaktifi lökosit DNA'sı ile birleşerek jel kıvamı alır ve erken teşhis sağlar.",
    "oncedenYapilacaklar": [
      "İlk 2-3 daldırma sağım sütünü daldırma kabına sıkarak at (ön sağım)",
      "4 gözlü CMT pleytinin her gözüne ilgili meme lobundan (Sağ Ön/Arka, Sol Ön/Arka) 2 ml süt sağ",
      "Süt miktarı kadar mor renkli CMT reaktifini pleyte ekle ve dairesel hareketle 15 saniye çalkala",
      "Jelleşme ve renk koyulaşmasını (Negatif, Eser, +, ++, +++) skorlayıp enfekte meme lobunu tedaviye ayır"
    ]
  },
  {
    "id": "veteriner_distosi_sezaryen_operasyon",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "güç doğum distosi",
      "veteriner sezaryen",
      "uterus histerotomi",
      "yavru canlandırma",
      "doğum sancısı durması"
    ],
    "baslik": "Güç Doğum (Distosi) Müdahalesi & Sezaryen Histerotomi",
    "ikon": "🩺",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Sancı Başlangıcından 2 Saat Sonra",
    "hazirlikZamani": "Cerrahi Masa & Oksijen Hazırlığı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🐾 2 saati aşan aralıksız ıkınmaya rağmen yavru gelmiyorsa uterus torsiyonu veya dar pelvis sebebiyle acil sezaryene geçilmelidir.",
    "oncedenYapilacaklar": [
      "Vajinal muayene ile fetusun geliş pozisyonunu (anterior/posterior) ve kalp atışını ultrasonla teyit et",
      "Fetus canlıysa sol flank (büyükbaş) veya linea alba (küçükbaş/pet) bölgesini tıraş edip dezenfekte et",
      "Uterus kornusunu cerrahi insizyonla aç, yavruyu amnion zarı ve sıvısından arındırarak kordonu klemple",
      "Yavruların ağız/burun mukusunu puarla çekip canlandırma (doxapram/kalp masajı) masasına teslim et"
    ]
  },
  {
    "id": "veteriner_baryum_kontrast_rontgen",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "baryumlu röntgen",
      "yabancı cisim pasaj grafisi",
      "baryum sülfat kedi",
      "barsak obstrüksiyonu röntgen",
      "kontrast film"
    ],
    "baslik": "Gastrointestinal Yabancı Cisim & Baryumlu Pasaj Grafisi",
    "ikon": "🩻",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Baryum İçirildikten Sonra (0, 30, 120, 240 Dk)",
    "hazirlikZamani": "Düz Karın Röntgeni (Direkt Grafi)",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🐾 Radyoopak olmayan plastik/kumaş yabancı cisimlerde baryum sülfat süspansiyonu içirilerek zamana bağlı pasaj gecikmesi izlenir.",
    "oncedenYapilacaklar": [
      "Önce yabancı cisim veya gaz paternini görmek için doğal direkt lateral ve VD karın grafisi çek",
      "Hastaya şırıngayla oral yoldan vücut ağırlığına uygun dozda (%30 baryum sülfat süspansiyonu) içir",
      "0. dakika, 30. dakika, 2. saat ve 4. saat aralıklarıyla seri abdominal radyografiler al",
      "Baryumun ilerlemesinin durduğu obstrüksiyon seviyesini saptayarak acil cerrahi laparotomi kararı ver"
    ]
  },
  {
    "id": "eczacilik_bud_kullanim_suresi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "bud süresi majistral",
      "koruyucusuz çözelti 14 gün",
      "beyond use date",
      "majistral son kullanma",
      "su içeren formülasyon bud"
    ],
    "baslik": "Majistral İlaç Kullanım Süresi (BUD) & Etiketleme",
    "ikon": "🧪",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Majistral Teslim Anında",
    "hazirlikZamani": "USP 795 Standart Tablosu Kontrolü",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💊 USP 795 gereğince su içeren koruyucusuz oral majistral preparatların son kullanma tarihi (BUD) buzdolabında en fazla 14 gündür.",
    "oncedenYapilacaklar": [
      "Majistral formülasyonda koruyucu madde (paraben/benzoat) ve su içeriğini formülden incele",
      "Su içeren oral sıvılarda buzdolabında saklanmak şartıyla azami 14 gün BUD tarihi belirle",
      "Susuz merhem ve fitil preparatlarında en erken bileşenin miadını veya en fazla 6 ayı BUD olarak ata",
      "Şişe üzerine kırmızı renkte 'Kullanmadan Önce Çalkalayınız' ve 'Buzdolabında Saklayınız' etiketlerini yapıştır"
    ]
  },
  {
    "id": "eczacilik_uyusturucu_defteri_kasa_sayimi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "uyuşturucu defteri",
      "kırmızı reçete kasa sayımı",
      "narkotik ampul sayımı",
      "morfin çelik kasa",
      "titck uyuşturucu kaydı"
    ],
    "baslik": "Narkotik / Psikotrop İlaç Defteri & Çelik Kasa Sayımı",
    "ikon": "🔐",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Ayın Son Günü / Nöbet Devri",
    "hazirlikZamani": "Kasa Anahtarı & İlaç Kutuları",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💊 2313 sayılı Uyuşturucu Maddelerin Murakabesi Kanunu gereği kırmızı reçeteli ilaçlar kilitli çelik kasada saklanır ve defterle denk sayılır.",
    "oncedenYapilacaklar": [
      "Kilitli çelik kasayı açarak morfin, fentanil, metilfenidat kutularını fiziksel olarak tek tek say",
      "İlçe Sağlık Müdürlüğü mühürlü Uyuşturucu ve Psikotrop İlaç Kayıt Defterindeki mevcudu kontrol et",
      "Renkli Reçete Sistemi (RRS) üzerindeki dijital stok ile fiziki ampul ve tablet adetlerini eşleştir",
      "Sarfiyat ve kalan stok cetvelini eczacı mesul müdür ıslak imzası ve kaşesi ile tasdik et"
    ]
  },
  {
    "id": "eczacilik_mor_recete_hetas_sistemi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "mor reçete hetas",
      "faktör reçetesi",
      "hemofili takip sistemi",
      "hemofili karne onay",
      "kan ürünü mor reçete"
    ],
    "baslik": "Mor Reçete Faktör İlaçları & HETAS Kayıt Onayı",
    "ikon": "🩸",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İlaç Tesliminden Önce",
    "hazirlikZamani": "Hemofili Takip Sistemi (HETAS) Girişi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💊 Hemofili hastalarının Faktör VIII/IX ve kan ürünleri Sağlık Bakanlığı HETAS portalına ve mor reçete karnesine işlenmeden verilemez.",
    "oncedenYapilacaklar": [
      "Hastanın hematoloji uzman hekimi onaylı güncel Faktör Sağlık Kurulu Raporunu Medula'dan doğrula",
      "Sağlık Bakanlığı Hemofili Takip Sistemi (HETAS) portalına hasta TC'si ve reçete takip numarasıyla giriş yap",
      "Verilecek her bir flakonun karekod ve seri numarasını HETAS ekranında tekil olarak eşleştir",
      "Faktör takip karnesinin ilgili sayfasına teslim edilen ünite ve kutu sayılarını yazıp eczane kaşesini bas"
    ]
  },
  {
    "id": "eczacilik_titck_ilac_geri_cekme_recall",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "ilaç geri çekme",
      "titck recall",
      "sınıf 1 geri çekme",
      "karantina kutusu ilaç",
      "parti no geri çağırma"
    ],
    "baslik": "TİTCK İlaç Geri Çekme (Recall Sınıf 1/2) & Karantina Tutanağı",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Duyuru Geldiği Anda (İvedi)",
    "hazirlikZamani": "Depo Raflarında Parti No Taraması",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚠️ TİTCK Sınıf 1 geri çekmelerde hayati risk vardır; belirtilen parti numaralı ilaçlar derhal raflardan indirilip karantinaya alınmalıdır.",
    "oncedenYapilacaklar": [
      "TİTCK ve Eczacı Odası resmi portalından gelen ilaç geri çekme duyurusundaki ilaç adı ve Parti Numarasını al",
      "Eczane raf ve çekmecelerindeki kutuları kontrol ederek eşleşen parti numaralı ürünleri derhal satıştan çek",
      "İlaçları 'GERİ ÇEKME / SATILAMAZ' etiketli kırmızı karantina kutusuna koy",
      "Karekodlarını İTS portalında geri çekme statüsüne alıp ecza deposuna iade teslim tutanağını hazırla"
    ]
  },
  {
    "id": "eczacilik_uts_tibbi_cihaz_tekil_bildirim",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "üts tekil bildirim",
      "tıbbi cihaz üts",
      "enjektör üts kabul",
      "hasta alt bezi üts",
      "üts stok düşümü"
    ],
    "baslik": "ÜTS Tıbbi Cihaz & Medikal Sarf Malzeme Tekil Bildirimi",
    "ikon": "🩺",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Mal Kabul / Satış Anında",
    "hazirlikZamani": "Karekod / DataMatrix Okutma",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💊 Ürün Takip Sistemi (ÜTS) kapsamındaki enjektör, şeker stripi, hasta alt bezi gibi medikal ürünler ÜTS üzerinden alma/verme bildirimiyle satılır.",
    "oncedenYapilacaklar": [
      "Depodan gelen medikal sarf malzemelerin üzerindeki ÜTS karekodlarını el terminaliyle tara",
      "ÜTS portalına kurumsal e-Devlet veya e-İmza ile bağlanarak 'Alma Bildirimi'ni onaylayıp stoğa ekle",
      "Hastaya Medula medikal reçetesi karşılığı teslimatta 'Verme / Tüketiciye Satış Bildirimi'ni yap",
      "Medula tıbbi malzeme ekranına onaylanan ÜTS tekil takip numarasını aktararak provizyonu kapat"
    ]
  },
  {
    "id": "saglik_derin_ven_trombozu_dvt_profilaksi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "dvt profilaksisi",
      "düşük molekül ağırlıklı heparin",
      "dmahe enoksaparin",
      "varis çorabı anti-emboli",
      "caprini skoru"
    ],
    "baslik": "Post-Op DVT Profilaksisi & Düşük Molekül Ağırlıklı Heparin (DMAH)",
    "ikon": "💉",
    "renk": "#CCFBF1",
    "varsayilanZaman": "Ameliyattan 12 Saat Sonra",
    "hazirlikZamani": "Caprini Tromboemboli Risk Skoru",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🩺 Majör ortopedi ve genel cerrahi sonrası Caprini skoru >5 olan hastalarda DMAH subkutan enjeksiyonu ve anti-embolik çorap hayat kurtarır.",
    "oncedenYapilacaklar": [
      "Hastanın kanama kontrolü ve drenaj takibini yapıp aktif hemoraji olmadığını doğrula",
      "Hekim orderına göre Enoksaparin/Dalteparin dozunu subkutan (göbek çevresi) olarak uygula",
      "Kademeli kompresyon (anti-embolik) çoraplarının bacak çapına tam oturduğunu ve kırışıklık olmadığını denetle",
      "Hastanın erken mobilizasyonu için fizyoterapist eşliğinde yatak içi ayak bileği pompalama egzersizlerini başlat"
    ]
  },
  {
    "id": "saglik_diyabetik_ketoasidoz_dka_protokol",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "diyabetik ketoasidoz dka",
      "kan şekeri >250",
      "idrarda keton pozitif",
      "iv kristalize insülin infüzyonu",
      "arteriyel kan gazı ph"
    ],
    "baslik": "Diyabetik Ketoasidoz (DKA) Yönetimi & İnsülin İnfüzyon Protokolü",
    "ikon": "🩺",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Acil Girişinde Derhal",
    "hazirlikZamani": "Arteriyel Kan Gazı & Potasyum Takibi",
    "hazirlikSaatOncesi": 0,
    "akilliFisilti": "🩺 DKA tablosunda potasyum düzeyi <3.3 mEq/L ise ASLA insülin başlanmaz; önce potasyum replasmanı yapılmalı, ardından saatlik insülin infüzyonu açılmalıdır.",
    "oncedenYapilacaklar": [
      "Kan şekerinde (>250 mg/dL), idrar/kan ketonunda ve arteriyel kan gazında (pH <7.30, HCO3 <18) DKA teyidi yap",
      "Serum potasyum (K+) düzeyini acil laboratuvarda doğrula; hipokalemi varsa infüzyona potasyum ekle",
      "0.9% SF ile agresif hidrasyon başlat ve hekim orderı doğrultusunda 0.1 ünite/kg/saat regüler insülin infüzyon pompası kur",
      "Saatlik kapiller kan şekeri ve 2 saatlik kan gazı/elektrolit takibini yoğun bakım föyüne kaydet"
    ]
  },
  {
    "id": "saglik_santral_venoz_kateter_svk_bakimi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "santral venöz kateter bakımı",
      "svk pansumanı",
      "klorheksidinli örtü",
      "kateter ilişkili kan dolaşımı enfeksiyonu",
      "heparinli kilit"
    ],
    "baslik": "Santral Venöz Kateter (SVK) Pansumanı & Kİ-KDE Önleme",
    "ikon": "🩹",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Haftada Bir / Kirlendiğinde",
    "hazirlikZamani": "Steril Bariyer & Klorheksidin Solüsyonu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🩺 Kateter İlişkili Kan Dolaşımı Enfeksiyonunu (Kİ-KDE) önlemek için %2 klorheksidin glukonat ile 30 saniye ovalanıp tamamen kuruması beklenmelidir.",
    "oncedenYapilacaklar": [
      "Steril eldiven, maske ve bone takıp eski şeffaf pansuman örtüsünü kateteri oynatmadan nazikçe çıkar",
      "Giriş yerinde eritem, pürülan akıntı, hassasiyet veya dikiş atması olup olmadığını değerlendir",
      "%2 klorheksidin glukonatlı antiseptik ile dairesel hareketle merkezden dışa doğru cilt antisepsisi uygula ve kurumasını bekle",
      "Steril yarı geçirgen şeffaf pansuman örtüsünü yapıştırıp üzerine pansuman tarihi ve saati etiketini koy"
    ]
  },
  {
    "id": "saglik_morfin_narkotik_devir_kirmizi_dolap",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "narkotik ilaç devri",
      "kırmızı reçeteli ilaç dolabı",
      "morfin ampul sayımı",
      "çift kilitli narkotik dolabı",
      "narkotik zayiat tutanağı"
    ],
    "baslik": "Narkotik & Psikotrop İlaç Vardiya Devri (Çift Hemşire Sayımı)",
    "ikon": "🔐",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Her Vardiya Değişiminde (08:00 - 16:00 - 24:00)",
    "hazirlikZamani": "Çift Anahtar ile Dolap Açımı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 Sağlık Bakanlığı mevzuatı gereği yeşil ve kırmızı reçeteli ampuller (Morfin, Fentanil, Aldolan) her vardiyada 2 hemşire tarafından tek tek sayılıp deftere ıslak imzayla kaydedilmelidir.",
    "oncedenYapilacaklar": [
      "Önceki vardiya ve yeni vardiya sorumlu hemşireleri çift kilitli çelik dolap başında hazır bulun",
      "Morfin, Fentanil, Pethidin ve Diazem ampul adetlerini defterdeki düşümlerle fiziksel olarak karşılaştır",
      "Kırılan, arta kalan veya zayi olan ampul varsa 2 hekim ve 2 hemşire imzalı \"Narkotik Zayiat Tutanağı\"nı dosyala",
      "Narkotik İlaç Kayıt Defterini devreden ve devralan hemşire olarak karşılıklı ıslak imza ile kapat"
    ]
  },
  {
    "id": "saglik_yenidogan_fototerapi_sarilik_biluribin",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "yenidoğan fototerapi",
      "total serum bilirubin tsb",
      "bebek göz bandı fototerapi",
      "fototerapi mavi ışık",
      "sarılık fototerapi takibi"
    ],
    "baslik": "Yenidoğan Hiperbilirubinemisi & Fototerapi Protokolü",
    "ikon": "👶",
    "renk": "#FEF08A",
    "varsayilanZaman": "TSB Eşik Değerini Aştığında",
    "hazirlikZamani": "Göz Koruyucu Bant & Radyasyon Ölçer",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 Fototerapide retinayı korumak için opak göz bantları şarttır; bebeğin hidrasyonu için 2 saatte bir beslenme veya IV sıvı takviyesi yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Bebeğin gestasyonel haftası ve doğum sonrası saatine göre Türk Neonatoloji Derneği eğrisinde TSB değerini plot et",
      "Bebeğin gözlerine opak fototerapi koruyucu göz bandını kaymayacak ve burnu tıkamayacak şekilde bağla",
      "Fototerapi lambasını (460-490 nm dalga boyu) bebeğe 30-40 cm mesafede konumlandır",
      "Her 6-8 saatte bir TSB kontrolü için ışığı kapatıp kan örneği al ve idrar çıkışını takip et"
    ]
  },
  {
    "id": "veteriner_buyukbas_gucluk_dogum_distosi_sezaryen",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "güç doğum distosi",
      "buzağı çekme krikosu",
      "inekte sezaryen operasyonu",
      "uterus torsiyonu inek",
      "epidural anestezi veteriner"
    ],
    "baslik": "Sığırlarda Güç Doğum (Distosi), Malprezentasyon & Sezaryen",
    "ikon": "🐄",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Doğum Sancıları Başladığında",
    "hazirlikZamani": "Doğum Halatları & Epidural Blokaj",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🐾 Buzağının ayakları ve başı doğum kanalına girmemişse krikoyla çekilmez; vajinal rektifikasyon denenmeli, başarısızsa sol açlık çukurluğundan sezaryene geçilmelidir.",
    "oncedenYapilacaklar": [
      "Kuyruk sokumu aralığından (C1-C2) %2 Lidokain ile kaudal epidural anestezi uygulayarak ıkınmaları hafiflet",
      "Doğum kanalını dezenfektanlı kayganlaştırıcı jel ile sıvazlayıp fötüsün pozisyon ve duruşunu (malprezentasyon) palpe et",
      "Baş veya bacak sapması varsa düzeltip doğum halatlarını eklem üzerinden bağla",
      "Uterus torsiyonu veya dar pelvis durumunda operasyon sahasını tıraşlayıp steril sol flank laparotomi (sezaryen) setini hazırla"
    ]
  },
  {
    "id": "veteriner_kedi_uretral_obstruksiyon_sonda_flush",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi idrar tıkanması",
      "flutd üretra tıkanıklığı",
      "kediye idrar sondası takma",
      "tom cat kateteri",
      "post-renal azotemi potasyum"
    ],
    "baslik": "Kedilerde Akut Üretral Obstrüksiyon & İdrar Sondası (FLUTD)",
    "ikon": "🐈",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Acil Başvurusunda Derhal",
    "hazirlikZamani": "Sedasyon & Steril Tom-Cat Kateteri",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🐾 Tıkalı erkek kedilerde hiperkalemi ve mesane rüptürü dakikalar içinde kardiyak arreste yol açar; acilen dekompresyon ve sonda uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Serum potasyum (K+) ve kreatinin düzeylerini acil biyokimya analizörüyle kontrol et",
      "Hafif sedasyon altında penisi dışarı manipüle ederek steril Tom-Cat açık uçlu kateteri üretraya ilerlet",
      "Tıkaç oluşturan strüvit kristallerini ılık steril SF ile flush yaparak geri yıka ve mesaneyi boşalt",
      "Kateteri prepüsyuma kelebek dikişle sabitleyip kapalı idrar toplama torbasına bağla ve Elisabeth yakalığı tak"
    ]
  },
  {
    "id": "veteriner_at_akut_kolik_nazogastrik_sonda",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "at kolik sancısı",
      "at nazogastrik sonda",
      "çekum gaz trokarı",
      "mide dekompresyonu at",
      "at rektal muayene kolik"
    ],
    "baslik": "Atlarda Akut Kolik (Sancı) Yönetimi & Nazogastrik Dekompresyon",
    "ikon": "🐎",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kolik Belirtisi Görüldüğünde Derhal",
    "hazirlikZamani": "Nazogastrik Hortum & Rektal Eldiven",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🐾 Atlar kusamaz; mide dilatasyonunda mide rüptürünü önlemek için nazogastrik hortum burun deliğinden mideye derhal salınarak reflü boşaltılmalıdır.",
    "oncedenYapilacaklar": [
      "Kalp frekansını (>60 atım/dk tehlikeli), mukoza rengini ve bağırsak seslerini (borborigmi) oskülte et",
      "Kayganlaştırılmış nazogastrik tüpü ventral burun geçidinden özofagusa ve mideye ileterek gaz/sıvı dekompresyonu yap",
      "Rektal palpasyon ile çekum gerginliğini, pelvik fleksura tıkanmasını veya barsak yer değiştirmesini kontrol et",
      "Flunixin meglumine analjezisi uygula; medikal tedaviye yanıt vermeyen strangülasyon şüphesinde cerrahi kliniğine sevk et"
    ]
  },
  {
    "id": "veteriner_kan_biyokimya_ve_hematoloji_idexx",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "veteriner tam kan sayımı",
      "idexx biyokimya analizörü",
      "kedi köpek alt ast üre",
      "hematokrit anemi veteriner",
      "trombosit agregasyonu kedi"
    ],
    "baslik": "Klinik Laboratuvar: Hemogram (CBC) & Serum Biyokimya Analizi",
    "ikon": "🔬",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Anestezi Öncesi / Teşhis Aşamasında",
    "hazirlikZamani": "EDTA'lı ve Düz Serum Tüpü Kan Alımı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🐾 Kedilerde stres kaynaklı lökogram ve trombosit kümeleşmesi sık görülür; kan yayması mikroskopta doğrulanmadan trombositopeni teşhisi konulmamalıdır.",
    "oncedenYapilacaklar": [
      "Vena jugularis veya vena cephalica'dan hemoliz yapmadan kan örneğini al",
      "Lazer akış sitometrisi ile lökosit formülü, eritrosit indeksleri ve hematokrit (%HCT) değerlerini tara",
      "Santrifüj edilmiş serumda ALT, AST, BUN, Kreatinin, Total Protein ve Albumin parametrelerini analiz et",
      "Cerrahi risk skoru (ASA) belirleyerek pre-op anestezi protokolünü hastanın organ fonksiyonuna göre seç"
    ]
  },
  {
    "id": "veteriner_rotgen_hd_kalca_displazisi_norberg",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kalça displazisi röntgeni",
      "norberg açısı köpek",
      "ventrodorsal röntgen çekimi",
      "sedasyonlu kalça filmi",
      "fci kalça displazisi skoru"
    ],
    "baslik": "Köpeklerde Kalça Displazisi Taraması & Norberg Açısı Ölçümü",
    "ikon": "🦴",
    "renk": "#DDD6FE",
    "varsayilanZaman": "12-18 Aylık Yaşta",
    "hazirlikZamani": "Derin Sedasyon & Simetrik Konumlandırma",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🐾 FCI kuralları gereği kalça displazisi röntgeni derin sedasyon altında bacaklar tam paralel ve patellalar troklea üzerinde ortalanmış çekilmelidir.",
    "oncedenYapilacaklar": [
      "Köpeğe kas gevşetici ve sedatif enjeksiyonu yaparak tam simetrik sırtüstü (ventrodorsal) pozisyon ver",
      "Arka bacakları içe doğru rotasyon yaptırıp femurların birbirine ve omurgaya paralel olmasını sağla",
      "Dijital röntgende pelvis simetrisini (obturatör foramenlerin eşitliği) kontrol ederek şutlama yap",
      "Femur başı merkezleri ile asetabulum kenarları arasındaki Norberg açısını (>105 derece normal) ölç ve FCI derecelendirme formunu doldur"
    ]
  },
  {
    "id": "eczacilik_majistral_merhem_supozituvar_kakao_yagi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "majistral supozituvar",
      "kakao yağı fitil dökümü",
      "supozituvar kalıbı parafin",
      "yer değiştirme faktörü fitil",
      "majistral supozituvar hesabı"
    ],
    "baslik": "Majistral Supozituvar (Fitil) Hazırlama & Yer Değiştirme Faktörü",
    "ikon": "💊",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Reçete Karşılandığında",
    "hazirlikZamani": "Fitil Kalıbı Sıvı Parafinleme & Su Banyosu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💊 Kakao yağı polimorfik bir maddedir; 34°C üzerinde aşırı ısıtılırsa metastabil forma dönüşür ve oda sıcaklığında bir daha katılaşmaz.",
    "oncedenYapilacaklar": [
      "Etken maddenin kalıp hacmine göre yer değiştirme faktörünü (f) hesaplayarak gereken kakao yağı miktarını tart",
      "Metal fitil kalıbını sıvı parafine batırılmış pamukla yağlayıp ters çevirerek süzdür",
      "Kakao yağını su banyosunda 32-33°C'yi geçmeyecek şekilde eritip ince toz edilmiş etken maddeyi homojen karıştır",
      "Kalıp yuvalarına hafif taşacak şekilde dök, buzdolabında dondur ve spatulayla fazlalıkları traşlayıp çıkart"
    ]
  },
  {
    "id": "eczacilik_flakon_liyofilize_cozucu_sulandirma",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "liyofilize flakon sulandırma",
      "antibiyotik flakon köpürtmeden",
      "enjeksiyonluk su sulandırma",
      "sulandırılmış flakon stabilite",
      "flakon partikül kontrolü"
    ],
    "baslik": "Liyofilize Toz Flakon Sulandırma & Stabilite Protokolü",
    "ikon": "💉",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İlaç Hazırlama Anında",
    "hazirlikZamani": "Steril Enjeksiyonluk Su & Kalın İğne Ucu",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💊 Protein veya antibiyotik tozları sulandırılırken flakon ASLA çalkalanmaz; köpük ve denatürasyonu önlemek için cidar boyunca yavaşça döndürülmelidir.",
    "oncedenYapilacaklar": [
      "Flakon kauçuk tıpasını %70 alkollü svap ile silip kurumasını bekle",
      "Ampuldeki çözücüyü (steril apirojen su) enjektöre çekip iğneyi flakon duvarına 45 derece açıyla yönlendirerek yavaşça sık",
      "Flakonu iki avuç arasında nazikçe yuvarlayarak tozun tamamen berrak çözünmesini sağla",
      "Işık altında ters çevirerek yabancı partikül kontrolü yap ve sulandırma tarihi/saatini flakon etiketine yaz"
    ]
  },
  {
    "id": "eczacilik_antikoagulan_inr_varfarin_etkilesim_danismanligi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "varfarin inr takibi",
      "coumadin k vitamini etkileşimi",
      "inr hedef 2.0-3.0",
      "varfarin kanama belirtileri",
      "yeşil yapraklı sebze k vitamini"
    ],
    "baslik": "Varfarin (Coumadin) Hasta Danışmanlığı & Besin-İlaç Etkileşimi (INR)",
    "ikon": "🩸",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İlaç Teslimi Sırasında",
    "hazirlikZamani": "Reçete Teşhis & Son INR Değeri Sorgulama",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💊 Varfarin kullanan hastalarda ıspanak, brokoli gibi K vitamini zengini gıdaların ani tüketimi ilacın etkisini sıfırlar; hedef INR (2.0 - 3.0) bozulur.",
    "oncedenYapilacaklar": [
      "Hastanın en son laboratuvar INR değerini ve hedef aralığını sorgula",
      "Haftalık K vitamini tüketiminin sabit tutulması gerektiğini, aşırı veya sıfır tüketimden kaçınmasını anlat",
      "Ağrı kesici olarak aspirin ve NSAİİ (ibuprofen) yerine parasetamol tercih etmesi gerektiğini vurgula",
      "Diş eti kanaması, ciltte sebepsiz morarma veya siyah dışkı durumunda derhal acile başvurması uyarısını yap"
    ]
  },
  {
    "id": "eczacilik_astim_kuafor_inhaler_kuru_toz_kullanim_teknigi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "inhaler kullanım eğitimi",
      "turbuhaler diskus aerochamber",
      "inhaler sonrası ağız çalkalama",
      "oral kandida pamukçuk önleme",
      "kuru toz inhaler dpi"
    ],
    "baslik": "İnhaler Cihaz Eğitimi (Turbuhaler/Diskus) & Ağız Çalkalama",
    "ikon": "🫁",
    "renk": "#CFFAFE",
    "varsayilanZaman": "İlaç Teslimi Sırasında",
    "hazirlikZamani": "Eğitim Demoları (Plasebo Cihaz)",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💊 Kortikosteroidli inhaler (Diskus, Turbuhaler) çekildikten sonra ağız mutlaka suyla çalkalanıp tükürülmelidir; aksi halde boğazda pamukçuk ve ses kısıklığı oluşur.",
    "oncedenYapilacaklar": [
      "Hastaya plasebo cihaz üzerinde derin nefes verme, ağızlığı dudaklarla sıkıca sarma ve hızlı-derin çekme hareketini göster",
      "İlacı çektikten sonra nefesini 10 saniye tutması gerektiğini izah et",
      "İnhalasyon bittikten hemen sonra ağzını bol su ile çalkalayıp suyu yutmadan lavaboya tükürmesini tembihle",
      "Doz sayacındaki kırmızı bölgeye gelindiğinde yedek reçeteyi yazdırması gerektiğini hatırlat"
    ]
  },
  {
    "id": "eczacilik_glukometre_kalibrasyon_ve_stript_kodlama",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "şeker ölçüm cihazı kalibrasyonu",
      "glukometre kontrol solüsyonu",
      "stript kod çipi",
      "glukometre son kullanma tarihi",
      "kan şekeri cihazı doğruluğu"
    ],
    "baslik": "Glukometre (Şeker Ölçer) Kontrol Solüsyonu & Strip Doğrulama",
    "ikon": "🩸",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yeni Kutu Strip Açıldığında",
    "hazirlikZamani": "Standart Kontrol Solüsyonu",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💊 Şeker ölçüm stripleri kutu kapağı açık kalırsa nemden bozulur; yeni kutu açıldığında kontrol solüsyonu damlatılarak referans aralık doğrulanmalıdır.",
    "oncedenYapilacaklar": [
      "Glukometre yuvasına yeni test stripini takıp cihazın otomatik açıldığını gör",
      "Test stribine kan yerine glukometre kontrol sıvısından 1 damla damlat",
      "Ekranda okunan glukoz değerinin strip kutusu arkasındaki kontrol aralığında (örn: 96-130 mg/dL) olduğunu teyit et",
      "Hastaya parmak ucunu alkolle sildikten sonra tamamen kurutmadan delmemesi gerektiğini hatırlat"
    ]
  },
  {
    "id": "saglik_septik_sok_surviving_sepsis_saatlik_paket",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "septik şok protokolü",
      "surviving sepsis 1 saat paketi",
      "laktat düzeyi >2",
      "kristaloid 30 ml/kg sıvı",
      "noradrenalin vazopresör"
    ],
    "baslik": "Septik Şok & Surviving Sepsis İlk 1 Saat Resüsitasyon Paketi",
    "ikon": "🩺",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Sepsis Şüphesinde İlk 60 Dakikada",
    "hazirlikZamani": "Kan Kültürü Şişeleri & Santral Damar Yolu",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🩺 Sepsiste ilk 1 saat hayatidir: Laktat ölç, antibiyotikten önce kan kültürü al, 30 ml/kg dengeli kristaloid başla ve MAP <65 mmHg ise Noradrenalin aç.",
    "oncedenYapilacaklar": [
      "Venöz/arteriyel kan gazında serum laktat düzeyini (>2 mmol/L ise kritik) derhal ölç",
      "Antibiyotik başlamadan önce en az iki farklı venden periferik ve kateter kan kültürlerini al",
      "Hipotansiyon veya laktat >4 ise ilk 3 saatte 30 mL/kg dengeli kristaloid (İzotonik/Ringer Laktat) infüzyonuna başla",
      "Sıvı yüklemesine rağmen ortalama arter basıncı (MAP) <65 mmHg kalırsa infüzyon pompasıyla Noradrenalin titre et"
    ]
  },
  {
    "id": "saglik_akut_koroner_sendrom_ekg_st_elevasyonu",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "st elevasyonlu mi stemi",
      "10 dakikada 12 derivasyonlu ekg",
      "troponin t/i kardiyak enzim",
      "koroner anjiyografi kapı-balon 90 dk",
      "aspirin klopidogrel yükleme"
    ],
    "baslik": "Akut Koroner Sendrom (STEMI) & Kapı-Balon Süresi (90 Dk)",
    "ikon": "❤️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Göğüs Ağrısı Başvurusunda İlk 10 Dk",
    "hazirlikZamani": "12 Derivasyonlu EKG & Defibrilatör Hazırlığı",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🩺 STEMI vakalarında acil kapı-balon süresi 90 dakikayı geçemez; ilk 10 dakikada 12 derivasyonlu EKG çekilmeli ve anjiyo kateter laboratuvarı aktive edilmelidir.",
    "oncedenYapilacaklar": [
      "Hasta acil kapısından girdiği ilk 10 dakika içinde 12 derivasyonlu EKG çekip ST elevasyonunu hekime göster",
      "Hekim orderıyla 300 mg çiğneme Aspirin ve P2Y12 inhibitörü (Ticagrelor / Klopidogrel) yükleme dozunu ver",
      "Acil kan grubu, Hemogram ve Troponin T/I biyokimya tüplerini laboratuvara gönder",
      "Anjiyografi ekibine haber verip hastayı monitörize ve defibrilatör refakatinde doğrudan anjiyo salonuna transfer et"
    ]
  },
  {
    "id": "saglik_mekanik_ventilator_weaning_sbt_protokol",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "mekanik ventilatör weaning",
      "spontan solunum denemesi sbt",
      "t-tüp testi",
      "tobin f/vt indeksi <105",
      "ekstübasyon kriterleri"
    ],
    "baslik": "Yoğun Bakım: Mekanik Ventilatörden Ayırma (Weaning) & SBT Testi",
    "ikon": "🫁",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Sabah Vizitinde Sedasyon Kesilince",
    "hazirlikZamani": "Sedasyon Tatili (Sedation Holiday) & Aspirasyon",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🩺 Tobin Hızlı Sığ Soluma İndeksi (RSBI: f/Vt) 105'in altında olmalı; 30 dakikalık SBT spontan solunum denemesini geçen hasta ekstübe edilebilir.",
    "oncedenYapilacaklar": [
      "GCS >8, PaO2/FiO2 >200 ve PEEP <=5 cmH2O kriterlerinin sağlandığını kan gazından doğrula",
      "Sedatif infüzyonunu kapatarak hastanın uyanmasını ve komutlara uymasını bekle",
      "CPAP modunda veya T-Tüp ile 30-120 dakika boyunca Spontan Solunum Denemesini (SBT) izle",
      "Kaf sızıntı testini (Cuff Leak Test) pozitif gördükten sonra orofarenksi aspire edip tüpü çek ve nazal kanülle oksijen bağla"
    ]
  },
  {
    "id": "saglik_periferik_arter_hastaligi_abi_ankle_brachial",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "ayak bileği kol indeksi abi",
      "dopler ultrason akım sesi",
      "periferik arter darlık oranı",
      "abi <0.9 darlık iskemi",
      "yürüme mesafesi kladikasyo"
    ],
    "baslik": "Periferik Arter Taraması: Ayak Bileği-Kol İndeksi (ABI) Ölçümü",
    "ikon": "🦶",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Damar Cerrahisi Polikliniğinde",
    "hazirlikZamani": "El Dopleri & Tansiyon Manşonu",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 Ayak Bileği-Kol İndeksi (ABI) <0.90 periferik arter hastalığını, <0.40 ise kritik bacak iskemisini gösterir; manşon basıncı el dopleri ile dinlenmelidir.",
    "oncedenYapilacaklar": [
      "Hastayı sırtüstü yatırıp 10 dakika oda sıcaklığında dinlendirerek hemodinamiyi sabitle",
      "Her iki kolda brakiyal arter sistolik basınçlarını dopler probu ve sfigmomanometre ile ölçüp yüksek olanı kaydet",
      "Her iki bacakta arteria dorsalis pedis ve arteria tibialis posterior sistolik basınçlarını doplerle oku",
      "Ayak bileği en yüksek basıncını kol en yüksek basıncına bölerek ABI skorunu (Normal: 1.0 - 1.3) hesapla"
    ]
  },
  {
    "id": "saglik_diyaliz_arteriyovenoz_fistul_avf_thrill",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "av fistül bakımı diyaliz",
      "fistül trili palpe etme",
      "fistül bruits üfürüm dinleme",
      "fistüllü koldan tansiyon yasak",
      "fistül trombozu önleme"
    ],
    "baslik": "Hemodiyaliz Arteriyovenöz (AV) Fistül Muayenesi & Thrill Kontrolü",
    "ikon": "🩹",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Her Diyaliz Seansı Öncesinde",
    "hazirlikZamani": "Stetoskop ile Bruit & Parmak Ucuyla Thrill Palpasyonu",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "🩺 Fistül trili (titreşimi) parmakla hissedilmez veya stetoskopla üfürüm (bruit) duyulmazsa fistül tromboze olmuştur; derhal acil anjiyo/trombektomi gereklidir.",
    "oncedenYapilacaklar": [
      "AV fistüllü koldan ASLA tansiyon ölçülmemesi, kan alınmaması veya serum takılmaması kuralını uygula",
      "Anastomoz hattı üzerinden parmak uçlarıyla kontinü titreşim (thrill) dalgasını palpe et",
      "Stetoskop çanı ile tiz makine uğultusu şeklindeki vasküler üfürümü (bruit) dinle",
      "Kolda şişlik, kızarıklık, hematom veya darlık (steal sendromu) belirtilerini hemodiyaliz takip formuna yaz"
    ]
  },
  {
    "id": "veteriner_kopek_mide_donmesi_gdv_gastropeksi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "mide dönmesi gdv",
      "gastrik dilatasyon volvulus",
      "köpek karın şişmesi öğürme",
      "trokar ile mide gazı boşaltma",
      "profilaktik gastropeksi cerrahisi"
    ],
    "baslik": "Akut Gastrik Dilatasyon Volvulus (GDV - Mide Dönmesi) & Dekompresyon",
    "ikon": "🐕",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Hemen / Acil Müdahale Odasında",
    "hazirlikZamani": "Geniş Çaplı IV Kateterler & 16G Mide Trokarı",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🐾 İri ırk köpeklerde yemekten sonra koşma ile tetiklenen GDV ölümcüldür; sağ karın duvarından trokarla gaz boşaltılıp acil derotasyon ve gastropeksi yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Ön bacaklardan çift damar yolu açıp agresif şok sıvı tedavisi (kristaloid) başlat",
      "Sağ son kosta arkasında perküsyonla davul sesi (timpani) alınan noktayı tıraşlayıp 14-16G anjiyoket ile mideyi dekomprese et",
      "Sol yan lateral batın röntgeninde \"çift balon / Popeye işareti\" ile volvulus tanısını doğrula",
      "Acil laparotomiye alarak mideyi anatomik yerine çevir, dalak nekrozunu kontrol et ve sağ karın duvarına dikerek kalıcı gastropeksi yap"
    ]
  },
  {
    "id": "veteriner_inek_hipokalsemi_sut_hummasi_kalsiyum_boroglukonat",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "süt humması hipokalsemi",
      "yatan inek kalkamıyor",
      "iv kalsiyum boroglukonat infüzyonu",
      "stetoskopla kalp ritmi dinleme",
      "doğum felci inek"
    ],
    "baslik": "Sığırlarda Süt Humması (Hipokalsemi / Doğum Felci) & IV Kalsiyum",
    "ikon": "🐄",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Doğumdan Sonraki İlk 48 Saatte",
    "hazirlikZamani": "Vücut Sıcaklığında Kalsiyum Boroglukonat & Serum Hortumu",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "🐾 Hipokalsemide kalsiyum boroglukonat IV uygulanırken stetoskopla kalp ARALIKSIZ dinlenmelidir; hızlı verilirse aritmi ve ani kardiyak arrest gelişir.",
    "oncedenYapilacaklar": [
      "İneğin soğuk kulaklarını, S duruşunu ve pupiller ışık refleksi tembelliğini muayene et",
      "Şişedeki kalsiyum çözeltisini su banyosunda 38°C vücut sıcaklığına getir",
      "Vena jugularis üzerinden yerçekimiyle çok yavaş (en az 15-20 dakikada) infüzyona başla",
      "Stetoskopla kalp ritmini oskülte et; taşikardi veya ekstrasistol duyulduğunda infüzyonu derhal durdur"
    ]
  },
  {
    "id": "veteriner_kedi_kronik_bobrek_yetmezligi_ckd_iris_evreleme",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi kronik böbrek yetmezliği",
      "iris ckd evrelemesi",
      "sdma ve kreatinin testi",
      "böbrek maması renal diyet",
      "deri altı sf sıvı desteği"
    ],
    "baslik": "Kedilerde Kronik Böbrek Yetmezliği (CKD) IRIS Evrelemesi & SDMA",
    "ikon": "🐈",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Geriatrik Check-Up / Rutin Kontrolde",
    "hazirlikZamani": "12 Saat Açlık Kanı & Sabah İlk İdrar Numunesi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🐾 IRIS kılavuzuna göre SDMA böbrek fonksiyon kaybını kreatininden aylar önce (%25 kayıpta) yakalar; Evre 2-3 CKD kedilerde fosfor kısıtlaması ömrü uzatır.",
    "oncedenYapilacaklar": [
      "Serum SDMA ve Kreatinin düzeyleri ile idrar dansitesini (refraktometre USG <1.035) ölç",
      "Tansiyon aletinde sistolik kan basıncını (>160 mmHg hedef organ hasarı) ölçerek hipertansiyonu sub-evrele",
      "İdrar protein/kreatinin oranını (UPC) test ederek proteinüri varlığını belirle",
      "Düşük fosforlu/proteinli renal medikal mamaya geçiş ve evde haftalık deri altı sıvı takviyesi protokolü planla"
    ]
  },
  {
    "id": "veteriner_cerrahi_capraz_bag_tplo_artroskopi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "tplo ameliyatı köpek",
      "ön çapraz bağ kopması cclr",
      "tibial plateau leveling osteotomy",
      "çekmece testi cranial drawer",
      "tibia kemik kesme testeresi"
    ],
    "baslik": "Ortopedi: Ön Çapraz Bağ Kopması & TPLO (Tibial Plato Düzleştirme)",
    "ikon": "🦴",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Pre-Op Planlama ve Ameliyat Günü",
    "hazirlikZamani": "Radyografik Plato Açısı Ölçümü (TPA) & TPLO Plak Seti",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🐾 TPLO cerrahisinde amaç çapraz bağı onarmak değil, tibial plato açısını 5-6 dereceye düşürerek yürüyüşte eklemin öne kaymasını (cranial thrust) biyomekanik engellemektir.",
    "oncedenYapilacaklar": [
      "Sedasyon altında diz ekleminde Cranial Drawer (Çekmece) ve Tibial Kompresyon testini pozitif doğrula",
      "Mediolateral diz röntgeninde Tibial Plato Açısını (TPA) ortopedik yazılımla ölç",
      "Radyal kemik testeresi ile tibiada kavisli osteotomi yapıp kemik segmentini hesaplanan milimetre kadar döndür",
      "Kilitli anatomik TPLO titanyum plak ve vidalarla kemiği sabitleyip post-op kontrol filmini çek"
    ]
  },
  {
    "id": "veteriner_zoonoz_bruselloz_ve_tüberküloz_tarama_ppd",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "sığır tüberküloz ppd testi",
      "tek intradermal tüberkülin",
      "boyun derisi kalınlık kumpası",
      "brusella rose bengal testi",
      "bulaşıcı hayvan hastalıkları tazminatı"
    ],
    "baslik": "Bulaşıcı Zoonoz Taraması: Tek İntradermal PPD Tüberkülin & Rose Bengal",
    "ikon": "🛡️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Tarım İlçe Yıllık Tarama Takviminde",
    "hazirlikZamani": "Deri Kalınlığı Kumpası (Kalliper) & Bovine PPD Tüberkülin",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🐾 Sığır tüberkülozunda boyun derisine 0.1 ml Bovine PPD verilir; tam 72 saat sonra kumpasla deri kalınlığı ölçülür, 4 mm ve üzeri artış pozitif kabul edilir.",
    "oncedenYapilacaklar": [
      "Boynun orta 1/3 bölgesini tıraşlayıp kumpas (kalliper) ile başlangıç deri katlantı kalınlığını mm olarak ölç",
      "Özel tüberkülin enjektörü ile derinin tam içine (intradermal) 0.1 mL sığır PPD tüberkülin enjekte et",
      "Kan serumu örneklerinde Rose Bengal antijeni ile Bruselloz aglütinasyon taramasını yap",
      "Tam 72 saat (3 gün) sonra enjeksiyon yerini yeniden kumpasla ölçüp reaksiyon farkını Bakanlık VETBİS sistemine kaydet"
    ]
  },
  {
    "id": "eczacilik_sitostatik_kemoterapi_ilac_hazirlama_cadd",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "kemoterapi ilaç hazırlama",
      "sitostatik güvenlik kabini sınıf 2b",
      "kemoterapi döküntü kiti chemo spill",
      "kemoterapi luer lock enjektör",
      "biyotehlike torbası sitostatik"
    ],
    "baslik": "Onkoloji Eczacılığı: Sitostatik İlaç Hazırlama & Sınıf II-B Kabin",
    "ikon": "☣️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Hasta Randevusu Öncesi Hazırlıkta",
    "hazirlikZamani": "Çift Kat Kemoterapi Eldiveni & Negatif Basınç Odası",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💊 Sitostatik ilaçlar sadece dışarıya %100 egzozlu Sınıf II Tip B2 dikey laminer kabinlerde hazırlanır; kazaen dökülmede derhal kemoterapi döküntü kiti kullanılır.",
    "oncedenYapilacaklar": [
      "Geçirimsiz lamineli kemoterapi önlüğü, çift kat kemoterapi onaylı nitril eldiven ve FFP3 maske kuşan",
      "Vial adaptörü ve kapalı sistem transfer cihazı (CSTD) ile aerosolleşmeyi sıfıra indir",
      "Hazırlanan serum torbasını ışıktan koruyucu kılıfa (amber torba) sarıp sitostatik uyarı etiketi yapıştır",
      "Atıkları ve enjektörleri kalın cidarlı sarı sitotoksik tıbbi atık kutusuna at"
    ]
  },
  {
    "id": "eczacilik_insülin_kalemi_ve_lipodistrofi_bolge_rotasyonu",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "insülin kalemi kullanımı",
      "lipodistrofi önleme rotasyon",
      "insülin iğne ucu 4mm tek kullanım",
      "insülin enjeksiyon açısı 90 derece",
      "açılmış insülin oda sıcaklığı 28 gün"
    ],
    "baslik": "Diyabet Danışmanlığı: İnsülin Kalem Eğitimi & Lipodistrofi Rotasyonu",
    "ikon": "💉",
    "renk": "#CFFAFE",
    "varsayilanZaman": "İlaç Teslimi Sırasında",
    "hazirlikZamani": "Enjeksiyon Bölgesi Rotasyon Şablonu",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💊 İnsülin aynı noktaya sürekli vurulursa cilt altında yağ bezesi (lipodistrofi) oluşur ve insülin emilemez; açılan kalem oda sıcaklığında 28 gün saklanabilir.",
    "oncedenYapilacaklar": [
      "Hastaya göbek, uyluk, kol ve kalça enjeksiyon bölgeleri arasında haftalık saat yönünde rotasyon yapmasını anlat",
      "Her enjeksiyonda iğne ucunun (4 mm) mutlaka yenilenmesi gerektiğini, tekrar kullanımın dokuyu yırttığını vurgula",
      "Dozu ayarladıktan sonra iğneyi 90 derece dik batırıp pistona basarak ilacın sızmaması için 10 saniye beklemesini göster",
      "Yedek kalemlerin buzdolabı rafında (2-8°C), kullanılan kalemin ise oda sıcaklığında (<25°C) 28 gün saklanabileceğini hatırlat"
    ]
  },
  {
    "id": "eczacilik_pediyatrik_parasetamol_ibuprofen_kilo_dozu",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "pediatrik parasetamol dozu",
      "çocuk şurup kilo hesabı 15 mg/kg",
      "ibuprofen çocuk dozu 10 mg/kg",
      "ateş düşürücü ölçek enjektörü",
      "parasetamol 4-6 saat aralık"
    ],
    "baslik": "Pediyatrik Doz Güvenliği: Çocuklarda Kilo Başına Ateş Düşürücü Hesabı",
    "ikon": "👶",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Reçete Tesliminde",
    "hazirlikZamani": "Çocuğun Güncel Tartı Ağırlığı (Kg) Sorgulaması",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "💊 Çocuklarda şurup dozu ASLA yaşa göre değil, kiloya göre verilir: Parasetamol tek doz 10-15 mg/kg (maks 4 kez), İbuprofen tek doz 5-10 mg/kg (6 aydan büyük).",
    "oncedenYapilacaklar": [
      "Ebeveyne çocuğun en son tartıldığı net kilogram ağırlığını sor",
      "Parasetamol için kg başına 10-15 mg hesabıyla süspansiyonun 5 mL'sindeki etken maddeye göre tam mL ölçeğini hesapla",
      "Kutudan çıkan mililitrik doz pipetinin nasıl çekileceğini ebeveyne kutu üzerinde göster",
      "Aynı anda iki farklı ateş düşürücünün karıştırılmaması ve doz aralığının en az 4-6 saat olması gerektiğini tembihle"
    ]
  },
  {
    "id": "eczacilik_goz_damlasi_sterilite_ve_nazolakrimal_okluzyon",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "göz damlası kullanım tekniği",
      "nazolakrimal oklüzyon 2 dakika",
      "açılan göz damlası 15 gün",
      "iki göz damlası arası 5 dakika",
      "göz damlası damlalık ucu teması"
    ],
    "baslik": "Oftalmik İlaç Eğitimi: Göz Damlası Tekniği & Nazolakrimal Oklüzyon",
    "ikon": "👁️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Göz İlacı Tesliminde",
    "hazirlikZamani": "Hasta Bilgilendirme Broşürü",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "💊 Göz damlası damlatıldıktan sonra göz pınarına (burun köküne) 2 dakika parmakla basılmalıdır; bu sayede ilaç kana karışmaz ve sistemik yan etki yapmaz.",
    "oncedenYapilacaklar": [
      "Damlatırken damlalık ucunun göze, kirpiğe veya parmağa temas ettirilmemesi kuralını anlat",
      "Alt göz kapağını aşağı çekip oluşan cebe tam 1 damla damlatıp gözü yavaşça kapatmasını söyle",
      "İlacın boğaza akmasını ve kana geçmesini önlemek için göz pınarına 2 dakika parmakla hafifçe bastırmasını tembihle",
      "Birden fazla göz damlası varsa aralarında en az 5-10 dakika beklenmesi ve açılan şişenin 1 ay sonra atılması gerektiğini hatırlat"
    ]
  },
  {
    "id": "eczacilik_transdermal_terapotik_sistem_tts_bant_rotasyon",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "tts yara bandı fentanil",
      "transdermal flaster kullanımı",
      "flaster bölge rotasyonu 7 gün",
      "tts bandı üzerine sıcak su yasak",
      "kullanılmış fentanil flaster katlama"
    ],
    "baslik": "Transdermal Flaster (TTS - Fentanil / Nitrogliserin) Hasta Güvenliği",
    "ikon": "🩹",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Flaster Değişim Gününde (72 Saatte Bir)",
    "hazirlikZamani": "Eski Flasterin Çıkarılması & Bölge Kontrolü",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💊 Fentanil flaster üzerine sıcak su torbası koymak veya sıcak banyo yapmak ilacın ani salınmasına ve ölümcül doz aşımına yol açar; çıkarılan flaster ikiye katlanıp atılır.",
    "oncedenYapilacaklar": [
      "Flasterin tüysüz, kuru ve tahriş olmamış göğüs/üst kol bölgesine 30 saniye avuç içiyle bastırılarak yapıştırılmasını anlat",
      "Yeni bant yapıştırılmadan önce eski bandın mutlaka çıkarılması ve aynı bölgeye 7 gün boyunca tekrar yapıştırılmaması kuralını vurgula",
      "Flaster takılıyken sauna, sıcak su banyosu ve elektrikli battaniyeden kesinlikle kaçınması uyarısını yap",
      "Kullanılmış fentanil bandını yapışkan yüzeyleri birbirine gelecek şekilde ikiye katlayarak çocukların ve evcil hayvanların erişemeyeceği çöpe atmasını söyle"
    ]
  },
  {
    "id": "saglik_inme_akut_iskemik_trombolitik_rtpa_kapi_igne",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "akut inme kodu 4.5 saat",
      "rtpa alteplase trombolitik",
      "kapı-iğne süresi 60 dakika inme",
      "nihss inme skoru",
      "beyin bt kanama ekarte"
    ],
    "baslik": "Akut İskemik İnme: 4.5 Saatlik Trombolitik (rtPA) & Kapı-İğne Süresi",
    "ikon": "🧠",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Semptom Başlangıcından İlk 4.5 Saatte",
    "hazirlikZamani": "Kontrastsız Beyin BT & NIHSS Skoru Değerlendirmesi",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🩺 İskemik inmede ilk 4.5 saatte IV Alteplase (rtPA) hayat kurtarır; intrakraniyal kanama BT ile ekarte edilmeli, kapı-iğne süresi 60 dakikanın altında tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Hastanın semptom başlangıç saatini kesinleştir; son normal görüldüğü saat 4.5 saati aşmamış olmalıdır",
      "Acil Nörolojik muayene ile NIHSS skorunu (4-25 arası ideal) hesapla",
      "Kontrastsız Acil Beyin BT çekerek hemorajik inme (kanama) olmadığını teyit et",
      "Kan basıncı <185/110 mmHg kontrolü altında 0.9 mg/kg Alteplase dozunun %10'unu bolus, kalanını 60 dakikada infüze et"
    ]
  },
  {
    "id": "saglik_anafilaksi_adrenalin_im_uyluk_lateral",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "anafilaktik şok adrenalin",
      "im adrenalin uyluk 0.5 mg",
      "hava yolu stridor anafilaksi",
      "antihistaminik ve steroid ikinci basamak",
      "anafilaksi 5-15 dakika adrenalin tekrar"
    ],
    "baslik": "Akut Anafilaksi Yönetimi & Uyluktan İntramusküler (IM) Adrenalin",
    "ikon": "💉",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Alerjen Teması ve Stridor Başladığında Derhal",
    "hazirlikZamani": "1:1000 Adrenalin Ampul & 1 mL Enjektör",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🩺 Anafilakside ilk ve en kritik ilaç Adrenalin'dir; ASLA damar yolunu beklemeyin, 1:1000'lik Adrenalin 0.5 mg derhal vastus lateralis kasına IM yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Hastayı sırtüstü yatırıp bacaklarını yükselt (Trendelenburg), solunum sıkıntısı varsa yarı oturur pozisyona al",
      "Erişkine 1:1000'lik konsantrasyondan 0.5 mg (0.5 mL) Adrenalini uyluğun ön-dış yanından (Vastus Lateralis) IM uygula",
      "Yüksek akımlı (10-15 L/dk) geri solumasız maske ile oksijen bağla ve IV damar yolu açarak kristaloid infüzyonuna başla",
      "Cevap alınamazsa Adrenalin dozunu 5-15 dakika sonra tekrarla; ikinci basamakta Avil ve Dekort uygula"
    ]
  },
  {
    "id": "saglik_toraks_tupu_su_alti_drenaji_bualu_fokurdama",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "su altı göğüs drenajı bualu",
      "pnömotoraks hava kaçağı kabarcık",
      "toraks tüpü sağma stripping yasak",
      "su altı seviyesi 2 cm",
      "göğüs tüpü klempleme yasağı"
    ],
    "baslik": "Göğüs Cerrahisi: Toraks Tüpü Su Altı Drenajı (Bülau) Takibi",
    "ikon": "🫁",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Vardiya Boyunca Saatlik Takipte",
    "hazirlikZamani": "Steril Su Seviyesi (2 cm H2O) Kontrolü",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 Su altı drenaj şişesi daima göğüs seviyesinin altında tutulmalıdır; öksürme esnasında odacıktaki hava kabarcığı akciğerdeki devam eden hava kaçağını gösterir.",
    "oncedenYapilacaklar": [
      "Drenaj şişesindeki steril distile su seviyesinin tam 2 cm çizgisinde olduğunu kontrol et",
      "Drenaj tüpünün hastanın yatak seviyesinden aşağıda ve kıvrılmamış olduğunu doğrula",
      "Solunumla birlikte su kolonundaki salınımı (tidal dalgalanma) gözlemle",
      "Öksürürken veya ıkınırken hava kaçağı kabarcıklarını (air leak) derecelendir ve saatlik gelen hemorajik drenaj miktarını kaydet"
    ]
  },
  {
    "id": "saglik_yenidogan_apgar_skoru_1_ve_5_dakika",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "apgar skoru 1 ve 5 dakika",
      "yenidoğan kalp tepe atımı",
      "bebek solunum çabası ve renk",
      "yenidoğan resüsitasyonu nls",
      "apgar skoru <7 canlandırma"
    ],
    "baslik": "Doğum Odası: Yenidoğan APGAR Skoru (1. ve 5. Dakika) Değerlendirmesi",
    "ikon": "👶",
    "renk": "#FEF08A",
    "varsayilanZaman": "Doğumdan Tam 1 ve 5 Dakika Sonra",
    "hazirlikZamani": "Radyan Isıtıcı & Kronometre",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🩺 APGAR skoru doğumun tam 1. ve 5. dakikasında hesaplanır: Kalp atımı, solunum, kas tonusu, refleks uyarılabilirlik ve cilt rengi 0-10 puan arası skorlanır.",
    "oncedenYapilacaklar": [
      "Doğum anında kronometreyi başlatıp bebeği önceden ısıtılmış radyan ısıtıcı altına alıp kurula",
      "1. dakikada: KTA (>100/dk), spontan ağlama, ekstremite fleksiyonu, burun kateterine reaksiyon ve gövde pembe/morluğunu değerlendir",
      "5. dakikada değerlendirmeyi tekrarlayarak skorun yükseldiğini (hedef 8-10) doğrula",
      "5. dakika skoru <7 olan bebeklerde pozitif basınçlı ventilasyon ve resüsitasyon adımlarını sürdür"
    ]
  },
  {
    "id": "saglik_bel_ponksiyonu_lp_bos_basinç_ve_hucre_sayimi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "lomber ponksiyon lp",
      "bos açılış basıncı manometre",
      "l3-l4 omurga aralığı",
      "menenjit bos lökosit glukoz",
      "lp sonrası baş ağrısı post-dural"
    ],
    "baslik": "Nöroloji: Lomber Ponksiyon (LP) BOS Açılış Basıncı & Analizi",
    "ikon": "🧪",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Menenjit / SAK Şüphesinde Acilde",
    "hazirlikZamani": "Steril LP İğnesi (22G Kademeli), Manometre & 4 Tüp",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 LP öncesi kafa içi basınç artışı (KİBA) fundoskopi veya beyin BT ile ekarte edilmelidir; manometreyle BOS açılış basıncı (Normal: 10-20 cmH2O) ölçülmelidir.",
    "oncedenYapilacaklar": [
      "Hastaya yan yatarak fetal pozisyon (çene göğse, dizler karına çekili) aldır",
      "L3-L4 veya L4-L5 vertebral aralığı palpe edip cildi povidon iyot ile steril et ve lokal anestezik uygula",
      "22G spinal iğneyi umbilikus yönünde ilerletip subaraknoid mesafeye gir ve manometreyle BOS basıncını ölç",
      "Biyokimya (glukoz, protein), mikrobiyoloji (gram boyama, kültür), hücre sayımı ve saklama için 4 ayrı tüpe BOS damlat"
    ]
  },
  {
    "id": "veteriner_kedi_panleukopeni_izolasyon_fpv_testi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi genç hastalığı panleukopeni",
      "fpv ag hızlı test",
      "lökopeni kan tablosu kedi",
      "panleukopeni izolasyon karantina",
      "kedi kanlı ishal kusma"
    ],
    "baslik": "Kedi Panleukopeni (Genç Hastalığı - FPV) İzolasyon ve Yoğun Bakım Protokolü",
    "ikon": "🐱",
    "renk": "#CCFBF1",
    "varsayilanZaman": "Klinik Kabul Anında Acil",
    "hazirlikZamani": "FPV Ag Hızlı Test Kiti & Hemogram Cihazı Hazırlığı",
    "hazirlikSaatOncesi": 0,
    "akilliFisilti": "🚨 FPV aşırı bulaşıcı ve dayanıklı bir parvovirüstür; pozitif hastayı derhal negatif basınçlı enfeksiyon odasına al, hipoklorit ile dezenfekte et.",
    "oncedenYapilacaklar": [
      "Rektal sürüntüden FPV Antijen hızlı testini yap ve tam kan sayımında (WBC < 2000/μL) lökopeniyi teyit et",
      "Hastayı diğer kedi ve yatan hastalardan tamamen izole karantina ünitesine al",
      "İntravenöz damar yolu açarak Ringer Laktat ile agresif sıvı resüsitasyonu ve antiemetik (maropitant) başla",
      "Sekonder bakteriyel sepsisi önlemek için geniş spektrumlu IV antibiyotik ve plazma transfüzyon hazırlığı yap"
    ]
  },
  {
    "id": "veteriner_inek_retensiyo_sekundinarum_son_es_atamama",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "retensiyo sekundinarum",
      "inek sonunu atamadı",
      "doğum sonrası eş atamama",
      "uterus içi antibiyotik köpük",
      "metrit profilaksisi inek"
    ],
    "baslik": "Sığır Retensiyo Sekundinarum (Doğum Sonrası Son/Eş Atamama) Müdahalesi",
    "ikon": "🐄",
    "renk": "#CCFBF1",
    "varsayilanZaman": "Doğumdan Sonraki 12-24 Saat İçinde",
    "hazirlikZamani": "Rektal Muayene Eldiveni & Uterus İçi Antibiyotikli Köpük Tablet",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚠️ Yavru zarlarını zorla elle koparmak endometriyumda ağır kanama, septisemi ve kalıcı kısırlık yapar; nazik manevra ve intrauterin tedavi uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "İneğin rektal beden ısısını ölçerek septik ateş (Toksemi > 39.5°C) varlığını denetle",
      "Zorlamadan serbest kalan kotiledon kısımlarını çek; ayrılmayan dokular için zorlama yapma",
      "Uterus içine oksitetrasiklin içerikli intrauterin tablet veya köpük uygula",
      "PGF2alfa veya oksitosin analogları ile uterus kontraksiyonunu destekle ve sistemik NSAID uygula"
    ]
  },
  {
    "id": "veteriner_kopek_gdv_mide_donmesi_acil_gastropeksi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "mide dönmesi köpek gdv",
      "gastrik dilatasyon volvulus",
      "trokar ile mide gaz dekompresyonu",
      "acil gastropeksi ameliyatı",
      "köpek karın şişmesi boş kusma"
    ],
    "baslik": "Köpek Gastrik Dilatasyon Volvulus (GDV / Mide Dönmesi) Acil Dekompresyonu",
    "ikon": "🐕",
    "renk": "#CCFBF1",
    "varsayilanZaman": "Hayati Acil (0-15 Dakika İçinde Müdahale)",
    "hazirlikZamani": "Geniş Çaplı Trokar İğne & Orotrakeal/Mide Tüpü & Şok Sıvı Hazırlığı",
    "hazirlikSaatOncesi": 0,
    "akilliFisilti": "🚨 GDV ölümcül bir cerrahi acildir; vena cava tıkanması sonucu kardiyojenik şok gelişir, acilen perkütan trokar ile mide dekomprese edilip ameliyata alınmalıdır.",
    "oncedenYapilacaklar": [
      "Ön bacaklardan çift damar yolu açarak 90 ml/kg/saat şok dozu kristaloid sıvı infüzyonunu başlat",
      "Sağ lateral karın duvarında en belirgin timpanik alandan 14-16G anjiyokat ile mide gazını boşalt",
      "Sağ lateral abdominal röntgen çekerek \"çift balon / Popeye işareti\" ile volvulusu kesinleştir",
      "Kardiyak aritmi (VPC) takibi için EKG bağla ve derhal cerrahi derotasyon ve profilaktik gastropeksiye al"
    ]
  },
  {
    "id": "veteriner_at_kolik_nazogastrik_sonda_lavaj",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "at kolik sancı",
      "nazogastrik sonda at",
      "at mide yıkama reflü",
      "barsak düğümlenmesi at",
      "at rektal muayene kolik"
    ],
    "baslik": "At Kolik (Akut Abdomen) Muayenesi & Nazogastrik Sonda ile Mide Dekompresyonu",
    "ikon": "🐎",
    "renk": "#CCFBF1",
    "varsayilanZaman": "Akut Sancı Anında Acil",
    "hazirlikZamani": "Nazogastrik At Sondası & Ilık Su Lavaj Pompası",
    "hazirlikSaatOncesi": 0,
    "akilliFisilti": "⚠️ Atlar anatomik olarak kusamaz; midede gaz ve sıvı birikmesi mide rüptürüne yol açar, nazogastrik sonda ile dekompresyon hayati ilk adımdır.",
    "oncedenYapilacaklar": [
      "Kalp frekansını, solunum sayısını, mukoza rengini ve kapiller dolum süresini (CRT) ölç",
      "Nazogastrik sondayı ventral nazal meatustan geçirerek mideye ulaştır ve spontan reflü olup olmadığını kontrol et",
      "Spontan reflü yoksa ılık su ve sodyum sülfat / mineral yağ ile impaksiyonu yumuşatıcı lavaj uygula",
      "Rektal muayene ile çekum gazı ve fleksura pelvina impaksiyonunu palpe et; cerrahi sevk kriterlerini değerlendir"
    ]
  },
  {
    "id": "veteriner_ciftlik_mastitis_cmt_testi_somatik_hucre",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "california mastitis testi cmt",
      "gizli mastitis inek",
      "somatik hücre sayımı shs",
      "meme lobu jel oluşumu cmt",
      "sağım hijyeni mastitis"
    ],
    "baslik": "Süt Sığırcılığı Subklinik Mastitis Tespiti (CMT Testi) & Sağım Protokolü",
    "ikon": "🥛",
    "renk": "#CCFBF1",
    "varsayilanZaman": "Haftalık Sağım Öncesi Kontrol",
    "hazirlikZamani": "4 Gözlü CMT Paleti & CMT Ayıracı Reaktif",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🧪 CMT paletinde reaktif ile süt karıştığında jel kıvamı (morlaşma/ağdalaşma) subklinik mastitisi ve yüksek somatik hücre sayısını (SHS > 400.000) gösterir.",
    "oncedenYapilacaklar": [
      "İlk 3 sıkım sütü ön sağım kabına alarak pıhtı ve renk anomalisini kontrol et",
      "Her meme lobundan eşit miktarda (yaklaşık 2 ml) sütü paletin 4 ayrı gözüne sağ",
      "Üzerine eşit miktarda CMT reaktifi ilave edip 10 saniye dairesel hareketle çalkalayarak vizkoziteyi gözlemle",
      "Pozitif loblar için steril numune alarak antibiyogram ve kuru dönem/laktasyon içi tüp tedavisini planla"
    ]
  },
  {
    "id": "eczacilik_kirmizi_yesil_renkli_recete_sistemi_rrs",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "renkli reçete sistemi rrs",
      "kırmızı yeşil reçete kontrol",
      "narkotik psikotrop ilaç kayıt",
      "titck renkli reçete aylık döküm",
      "kontrole tabi ilaç zayi"
    ],
    "baslik": "Renkli Reçete Sistemi (RRS) Narkotik/Psikotrop İlaç Kayıt ve Doğrulaması",
    "ikon": "🔴",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Reçete Karşılama Anında & Ay Sonu",
    "hazirlikZamani": "E-İmza & TİTCK RRS Portalı Girişi",
    "hazirlikSaatOncesi": 0,
    "akilliFisilti": "🔒 Uyuşturucu ve psikotrop ilaçlar hastaya teslim edilmeden önce RRS sistemine kimlik ve İTS karekod eşleşmesiyle işlenmeli, elden teslimde kimlik fotokopisi alınmalıdır.",
    "oncedenYapilacaklar": [
      "Hekim tarafından yazılan reçetenin RRS onay kodunu ve hekim branş kısıtlamalarını sistemden kontrol et",
      "Kırmızı/Yeşil reçeteli ilacın İTS karekodunu okutarak sisteme çıkış kaydını yap",
      "Kağıt reçete düzenlenmişse reçete aslını, teslim alanın TC kimlik numarasını ve imzasını 5 yıl saklanmak üzere dosyala",
      "Ay sonunda RRS icmal çıktısı alarak fiziki kasa stoku ile sistem stokunu karşılaştır ve İlçe Sağlık Müdürlüğüne sun"
    ]
  },
  {
    "id": "eczacilik_ilac_geri_cekme_recall_1_sinif_titck",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "ilaç geri çekme recall",
      "titck 1 sınıf geri çekme",
      "ilaç toplatma acil bildirim",
      "itk karekod blokajı",
      "depoya iade tutanağı geri çekme"
    ],
    "baslik": "TİTCK 1. Sınıf Acil İlaç Geri Çekme (Recall) & Karantina Protokolü",
    "ikon": "⛔",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Bakanlık Duyurusu Akabinde 2 Saat İçinde",
    "hazirlikZamani": "Raf ve Çekmece Seri/Parti No Taraması",
    "hazirlikSaatOncesi": 0,
    "akilliFisilti": "🚨 1. Sınıf geri çekmelerde (hayati tehlike arz eden safsızlık vb.) ilaç derhal satıştan çekilmeli, İTS üzerinde \"Karantina/Geri Çekme\" statüsüne alınmalıdır.",
    "oncedenYapilacaklar": [
      "TİTCK duyurusunda belirtilen etken madde, ticari isim, parti/seri (Lot) numaralarını eczane yazılımına gir",
      "Raflardaki ve depodaki ilgili serileri derhal toplayarak üzerine \"SATILAMAZ - GERİ ÇEKME İLACI\" etiketi yapıştır",
      "İTS portalında \"Geri Çekme İadesi\" bildirimi oluşturarak toptan ecza deposuna iade sürecini başlat",
      "İl Sağlık Müdürlüğü teftişine sunulmak üzere Geri Çekme Tutanağını imzalayıp eczane denetim dosyasına koy"
    ]
  },
  {
    "id": "eczacilik_majistral_solusyon_alkol_derecesi_gay_lussac",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "majistral solüsyon hazırlama",
      "alkol derecesi seyreltme",
      "gay-lussac alkolometre",
      "majistral defter kayıt",
      "70 derece etil alkol hazırlama"
    ],
    "baslik": "Majistral Alkol Seyreltme (Gay-Lussac) & Laboratuvar Defter Kayıt Protokolü",
    "ikon": "🧪",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Majistral Reçete Tanzimi Anında",
    "hazirlikZamani": "96° Etil Alkol, Distile Su, Dereceli Mezür ve Alkolometre",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚗️ Alkol ve su karıştığında hacim büzüşmesi (kontraksiyon) meydana gelir; hesaplama Türk Farmakopesi Alkol Seyreltme Tablosuna göre ağırlık esasıyla yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Hedeflenen alkol derecesi (örn. 70° Gay-Lussac) için farmakope tablosundan 96° alkol ve distile su gramajlarını hesapla",
      "Gay-Lussac alkolometresi ve termometre ile nihai karışımın 20°C standart sıcaklıkta derecesini doğrula",
      "Reçete formülünü, hasta adı ve doktor kaşesini \"Eczane Majistral Defteri\"ne sıra numarasıyla kaydet",
      "Şişe üzerine kırmızı (haricen kullanılır) etiket yapıştırarak parti no ve son kullanma tarihini yaz"
    ]
  },
  {
    "id": "eczacilik_kronik_raporlu_ilac_sut_gun_sayimi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "kronik ilaç raporu sut",
      "ilaç bitim süresi hesaplama",
      "medula raporlu ilaç son 15 gün",
      "sut katılım payı muafiyeti",
      "3 aylık ilaç dozajı medula"
    ],
    "baslik": "Kronik İlaç Raporu Takibi, SUT Gün Sayımı ve Erken Reçete Karşılama",
    "ikon": "📋",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Medula Girişi ve Hasta Bilgilendirme",
    "hazirlikZamani": "Medula Rapor ve İlaç Geçmişi İncelemesi",
    "hazirlikSaatOncesi": 0,
    "akilliFisilti": "💊 SUT kuralları gereği raporlu kronik ilaçlar, bir önceki ilacın bitiş tarihine en fazla 15 gün kala yazdırılıp eczaneden temin edilebilir.",
    "oncedenYapilacaklar": [
      "Medula sisteminden hastanın ilacı en son aldığı tarihi ve reçete edilen kutu/gün dozajını kontrol et",
      "İlacın bitmesine 15 günden fazla süre varsa Medula provizyon reddi (\"İlaç bitiş tarihi gelmemiştir\") vereceğinden tarihi teyit et",
      "Raporun ICD-10 tanı kodunun ve etken madde kullanım miktarının SUT ekinde belirtilen kriterlere tam uyduğunu denetle",
      "Rapor bitim süresi 30 günden az kalan hastaya hekim yenileme randevusu alması için bilgilendirme notu ilet"
    ]
  },
  {
    "id": "eczacilik_biyolojik_ajan_soguk_zincir_termal_canta",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "soğuk zincir ilaç teslimi",
      "biyolojik ajan insülin taşıma",
      "termal çanta buz aküsü",
      "2-8 derece soğuk zincir",
      "dondurmadan taşıma uyarısı"
    ],
    "baslik": "Biyolojik Ajan ve Soğuk Zincir İlaçların Termal Çanta Teslim Protokolü",
    "ikon": "🧊",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Hasta Teslim Anında",
    "hazirlikZamani": "Donmuş Jel Akü & İzolasyonlu Termal Taşıma Poşeti",
    "hazirlikSaatOncesi": 0,
    "akilliFisilti": "❄️ Biyolojik ajanlar ve insülinler doğrudan buz aküsüne temas ederse donar ve protein yapısı bozularak etkinliğini kaybeder; araya mutlaka strafor veya kabarcıklı naylon konulmalıdır.",
    "oncedenYapilacaklar": [
      "İlacı 2-8°C buzdolabından çıkararak sıcaklık indikatörünün normal renkte olduğunu kontrol et",
      "Termal poşet içine buz aküsünü yerleştirip ilacın buzla doğrudan temas etmesini engelleyici bariyer koy",
      "Hastaya ilacın eve varıncaya kadar poşetten çıkarılmaması ve eve ulaşır ulaşmaz buzdolabının kapağına (asla buzluğa değil) konulması gerektiğini vurgula",
      "İTS karekod satış bildirimini tamamla"
    ]
  },
  {
    "id": "saglik_malign_hipertermi_dantrolen_sodyum_acili",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "malign hipertermi acili",
      "dantrolen sodyum hazırlama",
      "anestezi sırasında hiperkapni",
      "etco2 ani yükselmesi anestezi",
      "buzlu sf ile soğutma ameliyathane"
    ],
    "baslik": "Anestezi Acili: Malign Hipertermi & Dantrolen Sodyum Protokolü",
    "ikon": "🌡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İnhalasyon Anestezisinde EtCO2 Ani Yükseldiğinde",
    "hazirlikZamani": "Malign Hipertermi Kiti (Dantrolen Flakonları & Steril Saf Su)",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🩺 Malign Hipertermide ilk bulgu vücut ısısından önce EtCO2 fırlaması ve çene kası rijiditesidir; derhal anestezik gaz kesilmeli ve 2.5 mg/kg IV Dantrolen başlanmalıdır.",
    "oncedenYapilacaklar": [
      "Uçucu anestezik gazı (Sevofluran/İzofluran) ve süksinilkolini derhal kes, anestezi devresini temiz devreyle değiştir",
      "Hastayı %100 O2 ile hiperventile et (dakika ventilasyonunu 2-3 katına çıkar)",
      "Her bir 20 mg Dantrolen flakonunu 60 mL steril apirojen saf su ile çözerek hızla IV puşe uygula",
      "Hastanın mesane, mide ve koltuk altlarına buzlu izotonik torbalarıyla aktif soğutma uygula ve kan gazı elektrolit takibi yap"
    ]
  },
  {
    "id": "saglik_akut_pulmoner_emboli_masif_pesi_skoru_tromboliz",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "masif pulmoner emboli",
      "pesi emboli risk skoru",
      "sağ ventrikül yüklenmesi eko",
      "alteplaz tpa pulmoner emboli",
      "heparin infüzyonu aptt takibi"
    ],
    "baslik": "Masif Pulmoner Emboli (PE): PESI Skoru & Sistemik Trombolitik",
    "ikon": "🫁",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Şok / Hipotansiyon Tablosunda Acilen",
    "hazirlikZamani": "Toraks BT Anjiyografi & Yatak Başı EKO",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "🩺 Masif pulmoner embolide hipotansiyon (sistolik <90 mmHg) varsa mortalite çok yüksektir; kontrendikasyon yoksa 100 mg Alteplaz (tPA) 2 saatte IV infüze edilir.",
    "oncedenYapilacaklar": [
      "Hipotansiyon, taşikardi, hipoksi ve PESI risk skorunu (Pulmonary Embolism Severity Index) değerlendir",
      "Yatak başı EKO ile sağ ventrikül dilatasyonunu ve McConnell işaretini doğrula",
      "Aktif kanama veya intrakraniyal kanama riski yoksa hekim orderıyla 100 mg Alteplaz infüzyonunu başlat",
      "Trombolitik sonrası aPTT takibi (hedef 1.5 - 2.5 kat) ile kesintisiz fraksiyone olmayan heparin infüzyonuna geç"
    ]
  },
  {
    "id": "saglik_spinal_kord_yaralanmasi_脊髄_asias_skorlamasi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "spinal kord yaralanması",
      "asia nörolojik değerlendirme",
      "motor duyu seviyesi belirleme",
      "spinal şok priapizm",
      "log roll kütük yuvarlama"
    ],
    "baslik": "Omurilik Travması: ASIA Nörolojik Skalası & Kütük Yuvarlama (Log-Roll)",
    "ikon": "🦴",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Travma Acil Girişinde",
    "hazirlikZamani": "Sert Servikal Boyunluk & Travma Tahtası",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🩺 Omurga travmalı hasta 4 sağlık personeli koordinasyonunda boyun-omurga aksı bozulmadan \"Log-Roll\" (kütük) tekniğiyle çevrilir; ASIA skalası ile duyu seviyesi haritalanır.",
    "oncedenYapilacaklar": [
      "Servikal omurga sert boyunluk ve kum torbalarıyla nötral pozisyonda rijit şekilde sabit tutulsun",
      "Hasta çevrilirken lider (anestezi/hekim) başı tutarak \"1-2-3\" komutuyla gövdeyi tek parça çevirsin",
      "Omurga boyunca basamak deformitesi, krepitasyon ve rektal tonus/anal sfinkter refleksini muayene et",
      "ASIA skalasına göre C2-S5 dermatomlarında hafif dokunma ve iğne batırma duyusu seviyesini kaydet"
    ]
  },
  {
    "id": "saglik_yenidogan_resusitasyonu_nrp_t_parca_resusitator",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "yenidoğan resüsitasyonu nrp",
      "t-parça canlandırıcı neopuff",
      "apgar skoru 1. ve 5. dakika",
      "bebek kalp tepe atımı <60",
      "pozitif basınçlı ventilasyon bebek"
    ],
    "baslik": "Yenidoğan Canlandırma Programı (NRP) & T-Parça Canlandırıcı (Neopuff)",
    "ikon": "👶",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Doğum Odasında Doğum Anında",
    "hazirlikZamani": "Radyan Isıtıcı, Isıtılmış Havlular & Neopuff PEEP/PIP Ayarı",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "🩺 Yenidoğan solumuyorsa veya KTA <100 ise ilk 60 saniyede (Altın Dakika) T-Parça canlandırıcı ile PIP 20-25 cmH2O ve PEEP 5 cmH2O ile PBV başlanmalıdır.",
    "oncedenYapilacaklar": [
      "Bebeği önceden ısıtılmış radyan ısıtıcı altına alıp ıslak havluları derhal uzaklaştırarak kurula",
      "Baş koklama (sniffing) pozisyonundayken gerekiyorsa ağız ve burnu puarla nazikçe aspire et",
      "Solunum yoksa veya Kalp Tepe Atımı (KTA) <100 ise Neopuff maskesiyle 40-60/dakika frekansında Pozitif Basınçlı Ventilasyon ver",
      "30 saniyelik etkin ventilasyona rağmen KTA <60 atım/dakika ise 3:1 oranında göğüs kompresyonuna başla"
    ]
  },
  {
    "id": "saglik_akut_bobrek_hasari_aki_kdigo_idrar_cikis",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "akut böbrek hasarı kdigo",
      "idrar çıkışı <0.5 ml/kg/saat",
      "kreatinin 0.3 mg artışı",
      "nefrofrotik ilaç kesilmesi",
      "santral venöz basınç svb sıvı takibi"
    ],
    "baslik": "Akut Böbrek Hasarı (ABH): KDIGO Kriterleri & Saatlik İdrar Takibi",
    "ikon": "🩺",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Yoğun Bakım ve Klinik Takiplerinde",
    "hazirlikZamani": "Saatlik Ölçümlü İdrar Torbası (Urometre)",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🩺 KDIGO kriterlerine göre idrar çıkışının 6 saat boyunca <0.5 mL/kg/saat olması veya kreatininin 48 saatte >=0.3 mg/dL artması Evre 1 ABH tanısı koydurur.",
    "oncedenYapilacaklar": [
      "Hastanın kuru kilosuna göre saatlik idrar hedef eşiğini (0.5 mL x kg) hesaplayıp urometreye işaretle",
      "Nefrotoksik ilaçları (NSAİİ, Aminoglikozid, Vankomisin, IV kontrast) hekime danışarak derhal stopla veya doz ayarla",
      "Prerenal / renal ayrımı için fraksiyonel sodyum ekskresyonunu (FeNa <%1 prerenal) laboratuvarda hesapla",
      "Hipovolemi varsa dengeli elektrolit sıvı yüklemesi yap, hipervolemi ve oligüri gelişirse acil hemodiyaliz endikasyonunu değerlendir"
    ]
  },
  {
    "id": "veteriner_kopek_parvoviral_enterit_kanli_ishal_protokolu",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "parvoviral enterit kanlı ishal köpek",
      "parvo hızlı antijen testi",
      "nötropeni şiddetli lökopeni",
      "maropitant cerenia kusma önleyici",
      "parvo hiperimmün serum plazma"
    ],
    "baslik": "Küçük Hayvan Acili: Parvoviral Enterit (Kanlı İshal) & Yoğun Bakım",
    "ikon": "🐶",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kusma ve Kötü Kokulu Kanlı İshal Başladığında",
    "hazirlikZamani": "İzolasyon Karantina Kafesi, IV Kateter & İzotonik Sıvı",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "🐾 Parvovirüs bağırsak villuslarını ve kemik iliğini yok eder; tedavi oral hiçbir şey vermemek (NPO), agresif IV sıvı, antiemetik (Maropitant) ve erken antibiyotik profilaksisidir.",
    "oncedenYapilacaklar": [
      "Rektal sürüntüden 10 dakikalık kaset testle Parvo Ag pozitifliğini teyit et",
      "Hemogramda lökosit/nötrofil çöküşünü ve hematokrit dehidrasyon seviyesini değerlendir",
      "Damar yolu açıp şok/dehidrasyon açığını Ringer Laktat ve dekstroz takviyesiyle infüze et",
      "Kusmayı durdurmak için Maropitant (Cerenia) ve sekonder sepsisi önlemek için geniş spektrumlu IV antibiyotik uygula"
    ]
  },
  {
    "id": "veteriner_sigir_abomazum_deplasmani_lda_ping_sesi_ameliyati",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "abomazum deplasmanı lda",
      "sol abomazum deplasmanı ping sesi",
      "abomazopeksi omentopeksi ameliyatı",
      "inek doğum sonrası iştahsızlık ketozis",
      "trokar ile perkütan abomazopeksi"
    ],
    "baslik": "Büyükbaş Cerrahi: Sol Abomazum Deplasmanı (LDA) & \"Ping\" Testi",
    "ikon": "🐄",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Doğumdan Sonraki İlk 3 Hafta İçinde",
    "hazirlikZamani": "Stetoskop, Perküsyon Parmaklığı & Trokar Dikiş Kiti",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🐾 İnekte sol 9-12. kaburga aralığında parmakla vururken (perküsyon) stetoskopla dinlendiğinde basketbol topu yankısı gibi \"Ping\" sesi duyulması LDA için patognomoniktir.",
    "oncedenYapilacaklar": [
      "Sol açlık çukurluğu ve kostalar üzerinde perküsyon-oskültasyon yaparak karakteristik yüksek perdeli çınlama sesini haritalandır",
      "İdrar stripi ile sekonder gelişen ketonemi/asidoz tablosunu kontrol et",
      "Cerrahi sağ fossa paralumbalis laparotomi ile omentopeksi veya sırtüstü yatırarak perkütan kör dikiş (toggle pin) yöntemine karar ver",
      "Gazı dekomprese edip abomazumu anatomik sağ taban pozisyonuna dikerek sabitle"
    ]
  },
  {
    "id": "veteriner_kedi_uretral_obstruksiyon_flutd_sonda_acili",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "erkek kedi idrar tıkanması flutd",
      "kedide taş idrar kesesi patlaması",
      "üretral tıkanıklık tomcat kateter",
      "hiperkalemi ekg t dalgası sivrilmesi",
      "sedasyon altında idrar sondası açma"
    ],
    "baslik": "Kedi Ürolojik Sendromu (FLUTD): Akut Üretral Tıkanıklık & Kateterizasyon",
    "ikon": "🐱",
    "renk": "#EDE9FE",
    "varsayilanZaman": "İdrar Yapamama / Acil Mesane Büyümesinde",
    "hazirlikZamani": "Tomcat Üretral Kateteri, Steril Kayganlaştırıcı & İdrar Torbası",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🐾 24 saatten uzun süren idrar tıkanması hiperkalemiye bağlı kardiyak arreste yol açar; önce EKG çekilip potasyum düşürülmeli, ardından steril lavajla tıkaç açılmalıdır.",
    "oncedenYapilacaklar": [
      "Palpasyonda portakal sertliğindeki dolu gergin mesaneyi tespit et; mesaneyi zorla sıkma (rüptür riski)",
      "Kanda K+ seviyesine bak; hiperkalemi varsa kalsiyum glukonat ve insülin/dekstroz ile kalbi koru",
      "Hafif sedasyon altında steril Tomcat üretral kateteri nazikçe ilerletip ılık steril SF ile üretral tıkacı geri yıka",
      "İdrarı boşaltıp kanlı bulanık idrar berraklaşana kadar mesaneyi yıka ve kapalı idrar torbası sistemini bağla"
    ]
  },
  {
    "id": "veteriner_at_tetanoz_ve_profilaksi_cerrahi_yara_antiserum",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "at tetanoz aşısı ve antiserumu",
      "tırmık çivi batması at",
      "üçüncü göz kapağı prolapsusu tetanoz",
      "trismus çene kilitlenmesi tahta at duruşu",
      "tetanoz antitoksini tat 1500 iu"
    ],
    "baslik": "At Hekimliği: Çivi Batması / Delici Yara & Acil Tetanoz Profilaksisi",
    "ikon": "🐴",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Delici Tırnak/Deri Yaralanmasından Sonra Derhal",
    "hazirlikZamani": "Tetanoz Antitoksini (TAT), Toksoid Aşı & Oksijenli Su",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🐾 Atlar dünyadaki tetanoz toksinine (Clostridium tetani) en duyarlı canlıdır; delici yaralarda yara anaerobik kalmamalı, derin debride edilip acil antitetanik serum yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Tırnak tabanındaki veya bacaktaki batıcı cismi çıkarıp yara kanalını hidrojen peroksit (oksijenli su) ile derinlemesine yıka",
      "Atın aşı geçmişi bilinmiyorsa 1500-3000 IU Tetanoz Antitoksini (TAT) uygula",
      "Eşzamanlı olarak farklı bir bölgeden aktif bağışıklık için Tetanoz Toksoid aşısını yap",
      "Ağır ses ve ışıktan korumak için atı sessiz loş bir boksa al ve 3. göz kapağı düşüşü refleksini izle"
    ]
  },
  {
    "id": "veteriner_kanatli_newcastle_yalanci_veba_ve_suru_asi_kurali",
    "category": "is_kariyer",
    "domain": "VETERINER",
    "keywords": [
      "newcastle yalancı veba aşısı",
      "tavuk içme suyu ile aşı uygulama",
      "aşılama öncesi 2 saat susuz bırakma",
      "klor nötralizasyonu yağsız süt tozu",
      "tortikolis boyun bükülmesi tavuk"
    ],
    "baslik": "Kanatlı Sağlığı: Newcastle (Yalancı Veba) İçme Suyu Sürü Aşılaması",
    "ikon": "🐔",
    "renk": "#FED7AA",
    "varsayilanZaman": "Rutin Aşı Takviminde Sabah Erken Saatte",
    "hazirlikZamani": "Canlı B1/LaSota Liyofilize Aşı Şişeleri & Yağsız Süt Tozu",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🐾 İçme suyu ile aşılamada şebeke kloru canlı aşı virüsünü anında öldürür; suya litre başına 2-2.5 gram yağsız süt tozu eklenmeli ve tavuklar 2 saat önceden susuz bırakılmalıdır.",
    "oncedenYapilacaklar": [
      "Aşılamadan 2 saat önce damlalık hatlarını (nippelleri) kapatarak tüm sürünün susamasını sağla",
      "Aşı kazanındaki suyun klorsuz ve oda sıcaklığında (18-20°C) olduğunu test stripi ile doğrula",
      "Canlı aşı virüsünü korumak için suya yağsız süt tozu ekleyip aşı şişesini su altında açarak çöz",
      "Nipel hatlarına aşı suyunu basıp tüm sürünün en geç 2 saat içinde aşı suyunu tüketmesini sağla"
    ]
  },
  {
    "id": "eczacilik_sitostatik_ve_onkoloji_ilac_hazirlama_biyoguvenlik",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "sitotoksik kemoterapi ilaç hazırlama",
      "sınıf 2 tip b2 biyogüvenlik kabini",
      "negatif basınçlı oda onkoloji",
      "kemoterapi dökülme kiti spill kit",
      "kapalı sistem ilaç transfer aparatı cstd"
    ],
    "baslik": "Hastane Eczacılığı: Sitotoksik/Kemoterapi İlaç Hazırlama & Güvenlik Kabini",
    "ikon": "☣️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Günlük Kemoterapi Tedavi Protokolü Hazırlanırken",
    "hazirlikZamani": "Sınıf II Tip B2 Biyogüvenlik Kabini & Çift Kat Kemoterapi Eldiveni",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💊 Sitotoksik ilaçlar teratojenik ve karsinojeniktir; %100 dışarı egzozlu Biyogüvenlik Kabini ve aerosol sızdırmaz Kapalı Sistem İlaç Transfer Aparatı (CSTD) ile hazırlanmalıdır.",
    "oncedenYapilacaklar": [
      "Onkoloji hazırlama odasının negatif basınç farkını (-15 Pascal) diferansiyel manometreden doğrula",
      "Özel lamine kemoterapi önlüğü, FFP3 partikül maskesi ve çift kat kemosertifikalı eldiven giy",
      "Kabinde flakon havasını basarken CSTD adaptörleri kullanarak basınç dengelemesini sağla ve aerosol kaçışını sıfırla",
      "Hazırlanan serum torbasını UV korumalı ışıktan koruyucu siyah kılıfa koyup üzerine sitotoksik uyarı etiketi yapıştır"
    ]
  },
  {
    "id": "eczacilik_medula_etken_madde_ve_doz_asim_kontrolleri",
    "category": "resmi",
    "domain": "ECZACILIK",
    "keywords": [
      "medula doz aşımı uyarısı",
      "sut maksimum günlük doz",
      "raporlu ilaç kullanım dozu",
      "medula kesinti risk kontrolü",
      "aynı gruptan birden fazla ilaç kesişimi"
    ],
    "baslik": "Eczane Provizyon: Medula Doz Aşımı & SUT Günlük Maksimum Doz Denetimi",
    "ikon": "💻",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Reçete Medula Girişi Yapılırken",
    "hazirlikZamani": "Hasta Rapor Açıklaması & Hekim Teşhis Kodu Eşleşmesi",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "💊 Hekimin reçeteye yazdığı doz raporlu maksimum dozu aşarsa Medula öder görünse bile SGK geriye dönük reçete incelemesinde kesinti yapar ve faiziyle tahsil eder.",
    "oncedenYapilacaklar": [
      "Reçetedeki kullanım dozunu (örn: 3x1) hastanın e-Raporundaki onaylı doz ile harfiyen karşılaştır",
      "SUT eki listelerde yer alan etken maddenin azami günlük tedavi doz sınırını aşmadığını teyit et",
      "Aynı terapötik sınıftan iki farklı ilacın (örn: iki farklı PPI mide koruyucu) mükerrer girilmediğini denetle",
      "Farklılık varsa reçete hekimine bilgi verip sistemde doz revizyonu yaptırarak hastaya ilacı teslim et"
    ]
  },
  {
    "id": "eczacilik_pediatrik_antibiyotik_suspansiyon_sulandirma",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "antibiyotik süspansiyon hazırlama",
      "toz antibiyotiğe kaynatılmış soğutulmuş su",
      "çizgiye kadar iki kademeli sulandırma",
      "sulandırılan antibiyotik 14 gün buzdolabı",
      "her kullanımdan önce çalkalama uyarısı"
    ],
    "baslik": "Farmasötik Danışmanlık: Pediatrik Süspansiyon Sulandırma & Stabilite",
    "ikon": "🧪",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İlaç Hastaya / Veliye Teslim Edilirken",
    "hazirlikZamani": "Kaynatılmış ve Oda Sıcaklığına Soğutulmuş Saf/İçme Suyu",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "💊 Toz antibiyotikler ılık suyla sulandırılırsa molekül anında bozulur; mutlaka kaynatılıp oda sıcaklığına inmiş suyla, iki kademede işaret çizgisine kadar sulandırılmalıdır.",
    "oncedenYapilacaklar": [
      "Şişeyi ters çevirip hafifçe vurarak dibe çökmüş kuru tozun topaklarını dağıt",
      "Önceden kaynatılıp soğutulmuş suyun yarısını ekleyip şişeyi kuvvetlice çalkala",
      "Köpüklerin inmesi için 1 dakika bekledikten sonra şişedeki işaret çizgisine kadar su ekleyip tekrar çalkala",
      "Veliyi ilacın buzdolabı kapağında (+2 ile +8°C) saklanması, en fazla 10-14 gün geçerli olduğu ve her kaşıktan önce çalkalanması konusunda uyar"
    ]
  },
  {
    "id": "eczacilik_kontrole_tabi_madde_ve_itirazsiz_sayim_tutanagi",
    "category": "resmi",
    "domain": "ECZACILIK",
    "keywords": [
      "kontrole tabi ilaçlar defteri",
      "il sağlık müdürlüğü eczane denetimi",
      "psikotrop ilaç fiziki stok sayımı",
      "yeşil reçete reçete koçanı",
      "stok ve rrs kayıt mutabakatı"
    ],
    "baslik": "Eczacılık Mevzuatı: Kontrole Tabi / Uyuşturucu İlaç Fiziki Stok Mutabakatı",
    "ikon": "📋",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Aylık Rutin Kontrolde ve İl Sağlık Denetiminde",
    "hazirlikZamani": "Kırmızı/Yeşil Reçete Arşivi & Kilitli Çelik Kasa",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💊 Eczacılar ve Eczaneler Hakkında Yönetmelik gereği kontrole tabi ilaçlar kilitli dolapta saklanır; fiziki kutu sayısı ile İTS/Renkli Reçete Sistemindeki stok birebir eşit olmalıdır.",
    "oncedenYapilacaklar": [
      "Kilitli dolaptaki tüm narkotik ve psikotrop ampul/tabletleri tek tek sayarak fiziki envanter listesi çıkar",
      "Renkli Reçete Sistemi (RRS) ve İlaç Takip Sistemi (İTS) üzerindeki anlık kayıtlı kutu adetlerini dök",
      "Fiziki stok ile sistem stoğunu karşılaştırıp fire, kırılma veya eksik karekod bildirimini araştır",
      "Kırılan ampul varsa iki eczacı veya sağlık personeli imzasıyla resmi \"Zayi Tutanak\" düzenleyip İl Sağlık Müdürlüğüne bildir"
    ]
  },
  {
    "id": "eczacilik_gebelikte_teratojenite_kategorisi_fda_abcdx",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "gebelik ilaç güvenlik kategorisi",
      "fda kategori x ilaçlar",
      "roaccutane isotretinoin gebelik testi",
      "gebelikte parasetamol güvenliği",
      "teratojenite risk sorgulama"
    ],
    "baslik": "Klinik Danışmanlık: Gebelikte İlaç Güvenliği (Kategori X) & İkna Protokolü",
    "ikon": "🤰",
    "renk": "#FED7AA",
    "varsayilanZaman": "Doğurganlık Çağındaki Kadın Hastaya İlaç Verilirken",
    "hazirlikZamani": "Reçete Molekülü & Gebelik / Emzirme Durumu Sorgusu",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "💊 İzotretinoin, Metotreksat, Statinler ve Varfarin gibi Kategori X ilaçlar gebelikte kesinlikle kontrendikedir; fetüste ağır uzuv ve kraniofasial anomaliye yol açar.",
    "oncedenYapilacaklar": [
      "Hastanın son adet tarihini ve olası gebelik/emzirme durumunu nazikçe sorgula",
      "Sistemik retinoid (sivilce ilacı) reçetelerinde son 30 gün içinde yapılmış negatif gebelik testini ve bilgilendirilmiş onam formunu teyit et",
      "Hastaya ilacın kullanımı süresince ve ilacı kestikten sonraki 1 ay boyunca çift bariyerli doğum kontrolü uygulaması gerektiğini açıkla",
      "Gebe hastada hekimle iletişime geçerek ilacı Kategori B güvenli eşdeğeriyle revize ettir"
    ]
  },
  {
    "id": "saglik_akut_inme_alteplaz_trombolitik_tedavi_4buçuk_saat",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "akut iskemik inme trombolitik",
      "rt-pa alteplaz 4.5 saat penceresi",
      "nihss inme skalası skorlama",
      "kontrastsız beyin bt kanama dışlama",
      "trombolitik tedavi kan basıncı 185/110"
    ],
    "baslik": "Nöroloji / Acil: Akut İskemik İnme, Trombolitik (rt-PA) & 4.5 Saat Altın Pencere",
    "ikon": "🧠",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Semptom Başlangıcından İtibaren İlk 4.5 Saat İçinde (Kritik Acil)",
    "hazirlikZamani": "Kontrastsız Beyin BT, Kan Şekeri, INR/aPTT & NIHSS Skorlama",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 Akut iskemik inmede IV trombolitik (Alteplaz/Tenekteplaz) tedavisi semptom başlangıcından sonraki ilk 4.5 saat içinde verilmelidir; kontrastsız BT ile hemoraji mutlak dışlanmalıdır.",
    "oncedenYapilacaklar": [
      "Hastanın son normal görüldüğü kesin saati belirle ve semptom başlangıç süresini hesapla",
      "Kontrastsız Beyin BT çekerek intrakraniyal kanamayı ekarte et ve ASPECTS skorunu değerlendir",
      "Tansiyonun 185/110 mmHg altında olduğunu teyit et (yüksekse Labetalol/Nikardipin ile düşür)",
      "0.9 mg/kg Alteplaz dozunun %10'unu 1 dakikada bolus, kalan %90'ını 60 dakikada IV infüzyonla uygula"
    ]
  },
  {
    "id": "saglik_diyabetik_ketoasidoz_dka_protokolu_ve_potasyum",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "diyabetik ketoasidoz dka protokolü",
      "anyon açığı metabolik asidoz",
      "iv regüler insülin infüzyonu potasyum",
      "dka serum potasyum 3.3 altı insülin durdur",
      "serum bikarbonat ketonüri"
    ],
    "baslik": "Endokrinoloji / Acil: Diyabetik Ketoasidoz (DKA) Protokolü & Potasyum Takibi",
    "ikon": "💉",
    "renk": "#FEF3C7",
    "varsayilanZaman": "DKA Tanısı Konulduğu An",
    "hazirlikZamani": "Kan Gazı (pH, HCO3), Kan Şekeri, Serum Ketonu, Elektrolitler & İdrar Sondası",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🩺 DKA tedavisinde serum potasyumu 3.3 mEq/L altında ise kesinlikle insülin başlanmaz; ölümcül aritmileri önlemek için önce potasyum replasmanı yapılır.",
    "oncedenYapilacaklar": [
      "Arteryel/venöz kan gazında pH < 7.30, HCO3 < 18 ve idrarda keton pozitifliğini doğrula",
      "Serum potasyumunu kontrol et (K < 3.3 ise önce 20-30 mEq/saat KCL infüzyonu ver, K > 3.3 olunca insülin başla)",
      "0.1 Ünite/kg/saat regüler kristalize insülin IV infüzyonunu başlat ve saatlik glukoz düşüşünü (50-75 mg/dL/saat) izle",
      "Glukoz 200 mg/dL altına indiğinde beyin ödemini önlemek için sıvıya %5 Dekstroz ekle"
    ]
  },
  {
    "id": "saglik_derin_ven_trombozu_ve_pulmoner_emboli_wells_skoru",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "pulmoner emboli wells skoru",
      "d-dimer elisa testi negatif prediktif",
      "toraks bt anjiyografi pe protokolü",
      "düşük molekül ağırlıklı heparin dmah enoksaparin",
      "sağ ventrikül yüklenmesi eko"
    ],
    "baslik": "Göğüs / Kardiyoloji: Pulmoner Emboli Şüphesi, Wells Skoru & BT Anjiyo",
    "ikon": "🫁",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Akut Nefes Darlığı / Göğüs Ağrısında",
    "hazirlikZamani": "Wells Skorlama Formu, D-Dimer Testi, EKG & Kreatinin Düzeyi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🩺 Wells skoru yüksek pulmoner emboli şüphesinde D-Dimer ile vakit kaybetmeden doğrudan Kontrastlı Toraks BT Anjiyografi çekilmeli ve kontrendikasyon yoksa derhal DMAH başlanmalıdır.",
    "oncedenYapilacaklar": [
      "Hastanın Wells klinik skorunu (Taşikardi, DVT bulgusu, immobilizasyon, hemoptizi) hesapla",
      "Düşük-orta riskte D-Dimer çalış (negatifse emboliyi dışla); yüksek riskte doğrudan Toraks BT Anjiyo planla",
      "Böbrek fonksiyonu (eGFR) uygunsa kontrastlı pulmoner arter BT anjiyografide dolum defektini göster",
      "Masif emboli ve hemodinamik instabilite (hipotansiyon) varsa trombolitik tedavi veya kateter embolektomi hazırla"
    ]
  },
  {
    "id": "saglik_sepsis_qsofa_ve_1_saatlik_sagkalim_paketi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "sepsis 1 saatlik sağkalım paketi",
      "qsofa solunum tansiyon bilinç",
      "serum laktat düzeyi 2 mmol üzeri",
      "kan kültürü sonrası geniş spektrumlu antibiyotik",
      "kristaloid sıvı resüsitasyonu 30 ml/kg"
    ],
    "baslik": "Yoğun Bakım / Enfeksiyon: Sepsis Tanısı, qSOFA & 1 Saatlik Müdahale Paketi",
    "ikon": "🩸",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Sepsis Şüphesinin İlk 1 Saati İçinde (Hour-1 Bundle)",
    "hazirlikZamani": "Kan Kültürü Şişeleri (Aerob/Anaerob), Kan Gazı (Laktat) & IV Kristaloid Sıvı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 Sepsiste her 1 saatlik antibiyotik gecikmesi mortaliteyi %8 artırır; ilk 1 saatte kan kültürü alınıp geniş spektrumlu antibiyotik başlanmalı ve 30 ml/kg kristaloid sıvı verilmelidir.",
    "oncedenYapilacaklar": [
      "qSOFA skorunu tara (Solunum sayısı >= 22, Değişmiş mental durum, Sistolik TA <= 100 mmHg)",
      "Serum laktat düzeyini ölç (Laktat > 2 mmol/L ise doku hipoperfüzyonunu gösterir)",
      "Antibiyotik öncesinde en az 2 set periferik kan kültürü ve odak kültürlerini (idrar, trakeal) al",
      "Hipotansiyon veya laktat >= 4 mmol/L varsa ilk 3 saat içinde 30 ml/kg dengeli kristaloid (İzotonik/Ringer) infüze et"
    ]
  },
  {
    "id": "saglik_pediyatrik_febril_konvulziyon_ve_menenjit_ayirici_tanisi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "febril konvülsiyon basit komplike",
      "ateşli havale rektal diazepam",
      "menenjit ense sertliği brudzinski kernig",
      "lomber ponksiyon lp endikasyonu süt çocuğu",
      "ateş düşürücü parasetamol ibuprofen"
    ],
    "baslik": "Pediatri: Febril Konvülsiyon (Ateşli Havale) & Menenjit Dışlama",
    "ikon": "👶",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Nöbet Esnasında / Nöbet Sonrası Acil Değerlendirmede",
    "hazirlikZamani": "Rektal Diazepam Desitin, Ateş Ölçer & LP İğnesi Seti",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 5 dakikayı geçen konvülsiyonlarda rektal diazepam (0.5 mg/kg) uygulanır; 18 aydan küçük bebeklerde ateş ve nöbet varsa menenjiti dışlamak için lomber ponksiyon (LP) düşünülmelidir.",
    "oncedenYapilacaklar": [
      "Çocuğun hava yolunu açık tut, yan yatır (koma pozisyonu) ve nöbet süresini kronometreyle kaydet",
      "Nöbet 5 dakikayı aşarsa rektal diazepam veya bukkal midazolam uygula",
      "Postiktal dönemde fontanel kabarıklığı, ense sertliği, Kernig ve Brudzinski belirtilerini muayene et",
      "Enfeksiyon odağını (akut otit, tonsillit, İYE) tespit ederek yaşına uygun ateş düşürücü tedavisini düzenle"
    ]
  },
  {
    "id": "veteriner_kedi_fiv_felv_snap_test_ve_retroviral_protokol",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedide fiv felv snap test pozitif",
      "retroviral bileşik fiv felv izolasyon",
      "felv aşısı öncesi hızlı test",
      "retrovirol negatif kontrol kan",
      "kedi lösemi ve immün yetmezlik testi"
    ],
    "baslik": "Kedi Hekimliği: FIV / FeLV Kombine Snap Test & Aşı Öncesi Protokol",
    "ikon": "🐱",
    "renk": "#EDE9FE",
    "varsayilanZaman": "İlk Aşılama Öncesi / Şüpheli Stomatit-Anemi Tablosunda",
    "hazirlikZamani": "EDTA Tam Kan Tüpü, Kombine FIV Ab / FeLV Ag Snap Kit & Santrifüj",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 FeLV (Lösemi) pozitif bir kediye lösemi aşısı uygulanması akut immün felce yol açar; aşı öncesinde mutlaka hızlı antijen/antikor Snap testiyle negatiflik doğrulanmalıdır.",
    "oncedenYapilacaklar": [
      "Hastadan 1 ml tam kan alarak santrifüjde plazmayı veya serumu ayır",
      "Snap test kitinin kuyucuğuna 3 damla serum ve 4 damla konjugat damlatarak aktivatörü kır",
      "10 dakika sonra kontrol (C) ve test çizgilerini (T1/T2) değerlendir",
      "FeLV pozitif çıkan kediyi diğer kedilerden izole et ve canlı aşı protokollerini derhal iptal et"
    ]
  },
  {
    "id": "veteriner_kopek_akut_pankreatit_cpl_testi_ve_batin_usg",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "köpekte batın usg pankreatit cpl",
      "köpek spesifik lipaz cpl test",
      "akut batın kusma lipaz",
      "cpl hızlı test çizgi yoğunluğu",
      "pankreatit buprenorfin ağrı yönetimi"
    ],
    "baslik": "Küçük Hayvan Dahiliye: Akut Pankreatit, cPL Testi & Batın Ultrasonu",
    "ikon": "🐕",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Akut Kusma ve Dua Pozisyonu Karın Ağrısında",
    "hazirlikZamani": "Kantitatif cPL Kiti, Mikrokonveks USG Probu & IV Kristaloid İnfüzyon",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 Köpek spesifik pankreas lipazı (cPL) > 400 ug/L çıkması akut pankreatit için patognomoniktir; kusma kontrol altına alınana kadar oral besleme kesilmeli ve güçlü analjezi başlanmalıdır.",
    "oncedenYapilacaklar": [
      "Kanda cPL kantitatif seviyesini ölçerek pankreatit tanısını doğrula",
      "Ultrasonografide pankreas parankim hipoekojenitesini ve peripankreatik yağ dokusu hiperekojenitesini (saponifikasyon) görüntüle",
      "Hastanın ağrısını dindirmek için Buprenorfin veya Fentanil infüzyonu başlat",
      "Kayıp sıvı ve elektrolitleri yerine koymak için saatlik 4-6 ml/kg dengeli Ringer Laktat infüzyonu planla"
    ]
  },
  {
    "id": "veteriner_sigir_sol_abomazum_deplasmani_lda_ve_omentopeksi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "sığırda sol abomazum deplasmanı lda",
      "lda ping sesi steteskop perküsyon",
      "abomazum deplasmanı omentopeksi",
      "inek iştahsızlık sol açlık ping",
      "abomazum cerrahi düzeltme"
    ],
    "baslik": "Büyükbaş Cerrahi: Sol Abomazum Deplasmanı (LDA) & Omentopeksi Operasyonu",
    "ikon": "🐄",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Doğum Sonrası İlk 3 Hafta İçinde / Teşhis Anında",
    "hazirlikZamani": "Steteskop-Pleksimetre, Lokal Anestezi (Lidokain), Trokar & Omentopeksi Dikiş Seti",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🩺 Sol 9-12. kaburga aralığında steteskopla perküsyon yapıldığında tipik çelik tencere tınlaması (Ping Sesi) LDA tanısını koydurur; cerrahi omentopeksi ile organ yerine dikilmelidir.",
    "oncedenYapilacaklar": [
      "Sol açlık çukurluğunda steteskop eşliğinde parmak perküsyonu yaparak metalik ping sesinin sınırlarını çiz",
      "Sağ fossa paralumbalis bölgesini tıraş edip paravertebral lokal anestezi ile uyuştur",
      "Laparotomi insizyonu açarak sol tarafta gazla şişen abomazumu steril trokarla dekomprese et",
      "Abomazumu anatomik pozisyonuna çekip omentum majusu sağ peritona tespit ederek (omentopeksi) nüksü önle"
    ]
  },
  {
    "id": "veteriner_at_akut_kolik_sancisi_ve_nazogastrik_sonda_lavaj",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "atta kolik rektal muayene cecum gaz",
      "at sancısı nazogastrik sonda lavaj",
      "kolik reflü kontrolü nabız 60",
      "at spazmotik kolik fluniksin",
      "at mide dekompresyonu"
    ],
    "baslik": "At Hekimliği: Akut Kolik (Sancı) Acil Müdahale & Nazogastrik Sonda Lavajı",
    "ikon": "🐎",
    "renk": "#FED7AA",
    "varsayilanZaman": "At Yere Yatma, Eşinme ve Karına Bakma Belirtisi Gösterdiğinde",
    "hazirlikZamani": "At Tipi Nazogastrik Sonda, Sifon Pompası, Rektal Eldiven & Fluniksin Meglumin",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🩺 Atlarda kusma refleksi anatomik olarak yoktur; aşırı gaz ve sıvı mideyi patlatabilir. Kolikte ilk yapılması gereken acilen nazogastrik sonda salıp mide reflüsünü boşaltmaktır.",
    "oncedenYapilacaklar": [
      "Nazogastrik sondayı ventral burun kanalından mideye kadar iterek spontan sıvı ve gaz çıkışını kontrol et",
      "Rektal palpasyon yaparak çekum gaz gerginliği, pelvik fleksura tıkanması veya torsiyon bulgusunu araştır",
      "Mide yırtılma riskine karşı sondadan berrak sıvı gelene kadar asla oral mineral yağ verme",
      "Bağırsak motilitesini ve ağrıyı kontrol altına almak için IV Fluniksin Meglumin veya Ksilozi uygulamasını yap"
    ]
  },
  {
    "id": "veteriner_turkvet_hayvan_sevk_ve_yurtici_veteriner_saglik_raporu",
    "category": "resmi",
    "domain": "VETERINER",
    "keywords": [
      "türkvet hayvan sevk raporu onay",
      "kulak küpe türkvet ilçe tarım sevk",
      "vetbis aşı kaydı ve pasaport çıkışı",
      "damızlık büyükbaş nakil veteriner raporu",
      "5996 sayılı kanun hayvan nakil"
    ],
    "baslik": "Resmi Veterinerlik: TÜRKVET Canlı Hayvan Sevk Raporu & Nakil İzni",
    "ikon": "📋",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Hayvanların Kamyona Yüklenmesinden Önceki 24 Saat İçinde",
    "hazirlikZamani": "Kulak Küpe Listesi, Şap/Brusella Aşı Kayıtları & TÜRKVET/VETBİS e-İmza Girişi",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🩺 5996 sayılı Kanun gereğince küpesiz, aşısız veya TÜRKVET sisteminde kaydı bulunmayan hayvanların il dışı nakli yasaktır; kaçak nakillerde araç ve hayvanlara el konulur.",
    "oncedenYapilacaklar": [
      "Nakledilecek büyükbaş/küçükbaş hayvanların kulak küpe numaralarını TÜRKVET veri tabanından tek tek doğrula",
      "Son 6 ay içinde Şap (FMD), LSD ve Koyun-Keçi Çiçeği aşılarının yapıldığını sistemden teyit et",
      "Klinik muayenede yüksek ateş, şap vezikülü veya bulaşıcı hastalık belirtisi olmadığını tespit et",
      "İlçe Tarım Müdürlüğü adına Yurtiçi Veteriner Sağlık Raporunu e-İmza ile tanzim edip nakil şoförüne teslim et"
    ]
  },
  {
    "id": "eczacilik_titck_renkli_recete_sistemi_rrs_uyusturucu_kaydi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "renkli reçete sistemi uyuşturucu yeşil kırmızı",
      "rrs sentetik opioid giriş",
      "kırmızı reçete morfin fentanil kayıt",
      "titck rrs günlük reçete sonlandırma",
      "uyuşturucu madde defteri karekod"
    ],
    "baslik": "Eczane Mevzuatı: TİTCK Renkli Reçete Sistemi (RRS) Kırmızı/Yeşil Reçete",
    "ikon": "💊",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İlacın Hastaya Teslim Edildiği Anda (Aynı Gün İçinde)",
    "hazirlikZamani": "TİTCK RRS Portalı, İTS Karekod Okuyucu & Kilitli Çelik Kasa",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💊 Narkotik ve psikotrop (Kırmızı/Yeşil reçeteli) ilaçların RRS sistemine karekod bildirimi yapılmadan ve hekim/hasta doğrulanmadan teslimi ağır hapis ve ruhsat iptali cezası doğurur.",
    "oncedenYapilacaklar": [
      "Kırmızı/Yeşil reçeteli opioid veya sedatif ilacın İTS karekodunu okutarak kutu seri numarasını teyit et",
      "TİTCK Renkli Reçete Sistemine (RRS) hekim diploma tescil numarasını ve hasta kimlik bilgilerini gir",
      "İlacı teslim alan kişinin T.C. kimlik numarasını sisteme işleyip imzasını al",
      "Günübirlik RRS icmalini alıp fiziki reçete nüshasını çelik dolapta 5 yıl saklanmak üzere arşivle"
    ]
  },
  {
    "id": "eczacilik_majistral_formulasyon_ve_turk_farmakopesi_defteri",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "majistral solüsyon hazırlama formüler",
      "türk farmakopesi 2024 majistral hesap",
      "salisilik asit rezorsin alkol yapımı",
      "majistral defter sıra no ve etiketleme",
      "haricen kırmızı etiket majistral"
    ],
    "baslik": "Laboratuvar: Majistral Formülasyon Hazırlığı & Türk Farmakopesi Kaydı",
    "ikon": "🧪",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Reçete Kabul Edildikten Sonra 2 Saat İçinde",
    "hazirlikZamani": "Kalibre Hassas Terazi (0.001g), Havan, Manyetik Karıştırıcı & Majistral Defteri",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💊 Haricen kullanılacak majistral preparatlara mutlaka Kırmızı Haricen etiketi yapıştırılmalı; formülün gramajları ve hesaplanan hammadde maliyeti Majistral Reçete Defterine yazılmalıdır.",
    "oncedenYapilacaklar": [
      "Dermatoloğun yazdığı formüldeki etken maddeleri (salisilik asit, rezorsin) kalibre hassas terazide tart",
      "Hammadde çözünürlüğüne göre saf su, alkol veya vazelin bazında homojen karışım elde et",
      "Şişenin üzerine hastanın adı, kullanım şekli, imal tarihi ve 30 günlük son kullanma süresi yazılı kırmızı etiket yapıştır",
      "Majistral Deftere reçete sıra numarasını, doktor adını ve kullanılan hammadde miktarlarını kaydet"
    ]
  },
  {
    "id": "eczacilik_ilac_takip_sistemi_its_karekod_deaktivasyon_ve_mal_alim",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "ilaç takip sistemi its karekod deaktivasyon",
      "its satış bildirimi başarısız paket",
      "karekod zayi bildirim titck",
      "its sunucu doğrulama seri no",
      "eczaneler arası takas its onayı"
    ],
    "baslik": "Bilişim & Mevzuat: İlaç Takip Sistemi (İTS) Karekod Doğrulama & Satış",
    "ikon": "📦",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Depo Mal Kabulünde ve Reçete Karşılamada",
    "hazirlikZamani": "İTS Web Servis Entegrasyonu, 2D DataMatrix Karekod Okuyucu & GLN Kodu",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💊 İTS sisteminde ecza deposundan eczaneye devri onaylanmamış hiçbir karekod hastaya satılamaz veya Medula sisteminden SGK'ya fatura edilemez.",
    "oncedenYapilacaklar": [
      "Ecza deposundan gelen fatura kolisindeki karekodları toplu okutarak İTS Mal Alım onayını tamamla",
      "Eczaneler arası takasla gelen ürünlerde karşı eczanenin sistemden takas çıkışı yaptığını teyit et",
      "Reçete satışında karekodun İTS Deaktivasyon (Satış Bildirimi) işlemini başarıyla sonuçlandır",
      "Hatalı veya zayi karekodlar için TİTCK portalından düzeltme ve iptal talebi aç"
    ]
  },
  {
    "id": "eczacilik_resmi_gece_nobeti_e_logo_ve_acil_stok_hazirligi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "eczane nöbeti kasa avans ve panosu",
      "nöbet levhası aydınlatma led açılış",
      "nöbetçi eczane kapı zili ve kamera",
      "nöbet sırasında acil ilaç temini",
      "eczaneler odası nöbet listesi"
    ],
    "baslik": "Eczane İşletmesi: Resmi Gece Nöbet Hazırlığı, E-Logo & Acil Stoklar",
    "ikon": "🚨",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Nöbet Günü Saat 18:30 (Mesai Kapanışında)",
    "hazirlikZamani": "Nöbetçi Eczane Işıklı Panosu, Güvenlik Servis Kepengi & Bozuk Para Kasası",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💊 Eczacılar Odası mevzuatına göre nöbetçi eczane ışıklı E-Logosunun ve nöbet tabelasının karanlıkta en az 50 metreden net okunabilir aydınlatmada tutulması zorunludur.",
    "oncedenYapilacaklar": [
      "Dış cephe nöbetçi eczane LED panosunu ve çevre eczanelerin nöbet çizelgesini camda aydınlat",
      "Gece servis penceresi, interkom diyafonu ve acil çağrı butonunun çalıştığını test et",
      "Nöbette en sık reçete edilen parenteral antibiyotik, ateş düşürücü şurup, serum ve nebül stoklarını tezgah altına hazırla",
      "Gece boyunca POS cihazlarının hücresel yedek hat bağlantısını ve kasa nakit avansını kontrol et"
    ]
  },
  {
    "id": "eczacilik_miadi_gecmis_ilac_imha_komisyonu_ve_its_zayi_cikisi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "miadı dolan ilaç imha komisyon tutanağı",
      "its miad zayi çıkışı il sağlık",
      "atık ilaç imha tutanak eczacı odası",
      "son kullanma tarihi geçmiş ilaç ayırma",
      "tehlikeli atık lisanslı bertaraf"
    ],
    "baslik": "Çevre & Kalite: Miadı Dolan İlaç Karantinası, İTS Zayi Bildirimi & İmha",
    "ikon": "🗑️",
    "renk": "#F1F5F9",
    "varsayilanZaman": "6 Aylık Periyotlarla ve Yıl Sonu Envanterinde",
    "hazirlikZamani": "Miadı Dolan İlaç Karantina Kolisi, İTS Çıkış Listesi & İmha Tutanağı",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "💊 Rafta miadı geçmiş tek bir ilaç bulundurulması dahi İl Sağlık Müdürlüğü teftişinde ağır para cezası doğurur; bu ilaçlar derhal \"Miadı Dolan İlaç\" dolabına kaldırılmalıdır.",
    "oncedenYapilacaklar": [
      "Son kullanma tarihi geçen kutuları raflardan toplayıp etiketli kırmızı karantina kolisine kaldır",
      "İlaç Takip Sistemi (İTS) üzerinden \"Miad Sebebiyle Deaktivasyon/Zayi\" kaydını oluştur",
      "Eczacı Odası ve İl Sağlık Müdürlüğü yetkilileri huzurunda İmha Komisyon Tutanağını imzalat",
      "İlaçları lisanslı tıbbi atık bertaraf tesisine teslim ederek Çevre ve Şehircilik MoTAT atık teslim makbuzunu al"
    ]
  },
  {
    "id": "saglik_anafilaksi_adrenalin_protokolu",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "anafilaksi",
      "anafilaktik şok",
      "adrenalin otoenjektör",
      "epinefrin intramuskuler"
    ],
    "baslik": "Akut Anafilaksi & Acil İM Adrenalin",
    "ikon": "💉",
    "renk": "#E0F2FE",
    "varsayilanZaman": "0. Dakika Acil Müdahale",
    "akilliFisilti": "🩺 Anafilakside ilk tercih uyluk anterolateraline (vastus lateralis) 1:1000 intramusküler Adrenalin uygulamasıdır.",
    "oncedenYapilacaklar": [
      "Hava yolu açıklığını sağla, yüksek akımlı 10-15 L/dk O₂ maskesi tak ve hastayı sırtüstü yatırıp bacaklarını kaldır (Trendelenburg)",
      "Erişkinde 0.5 mg (1:1000), çocukta 0.01 mg/kg İM Adrenalin uygula (Gerekirse 5-15 dakikada bir tekrarla)",
      "İki geniş damar yolu (16-18G) açarak 10-20 dk içinde 1000-2000 ml SF/Ringer Laktat yüklemesi yap",
      "İkincil tedavi olarak İV Antihistaminik (Feniramin) ve İV Kortikosteroid (Metilprednizolon) uygula; bifazik reaksiyon için en az 8-24 saat gözlemde tut"
    ]
  },
  {
    "id": "saglik_hipertansif_acil_urgency_emergency",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "hipertansif acil",
      "hipertansif kriz",
      "tansiyon 180/120",
      "hedef organ hasarı"
    ],
    "baslik": "Hipertansif Kriz & Hedef Organ Hasarı Yönetimi",
    "ikon": "🩺",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Acil Gözlem (İlk 1 Saat)",
    "akilliFisilti": "🩺 Hipertansif acilde (Emergency) ilk 1 saat içinde ortalama arteriyel basınç (OAB) en fazla %20-25 düşürülmelidir.",
    "oncedenYapilacaklar": [
      "Hedef organ hasarı taraması yap: Akut koroner sendrom, aort diseksiyonu, pulmoner ödem, ensefalopati, akut böbrek yetmezliği",
      "Hedef organ hasarı yoksa (Urgency) agresif İV tedaviden kaçın; oral antihipertansif ile 24-48 saatte kademeli düşür",
      "Hedef organ hasarı varsa (Emergency) İV infüzyon (Esmolol, Nitrogliserin, Labetalol) başlat ve arteryel kan basıncını monitörize et",
      "İntrakraniyal kanama veya aort diseksiyonu şüphesinde acil BT anjiyografi planla"
    ]
  },
  {
    "id": "saglik_derin_ven_trombozu_dvt_skorlama",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "derin ven trombozu",
      "dvt şüphesi",
      "wells dvt",
      "bacakta şişlik homans"
    ],
    "baslik": "DVT Şüphesi, Wells Skoru & Kompresyon USG",
    "ikon": "🩺",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Aynı Gün Acil Görüntüleme",
    "akilliFisilti": "🩺 Tek taraflı baldır ödeminde Wells skoru hesaplanıp Kompresyon Venöz Doppler USG ile trombüs doğrulanır.",
    "oncedenYapilacaklar": [
      "Wells DVT risk skorunu değerlendir (Aktif kanser, paralizi/alçı, yatağa bağımlılık, baldır çevre farkı >3 cm)",
      "Düşük olasılıkta D-Dimer testi ile dışla; orta/yüksek olasılıkta acil Alt Ekstremite Venöz Doppler USG çek",
      "Trombüs doğrulanırsa kontrendikasyon yoksa derhal DMAH (Düşük Molekül Ağırlıklı Heparin) veya DOAK başla",
      "Akut dispne, göğüs ağrısı veya taşikardi gelişimini Pulmoner Emboli riski yönünden sürekli takip et"
    ]
  },
  {
    "id": "saglik_akut_apandisit_alvarado_skoru",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "apandisit şüphesi",
      "sağ alt kadran ağrısı",
      "alvarado skoru",
      "mcburney hassasiyeti"
    ],
    "baslik": "Akut Karın & Akut Apandisit (Alvarado Skoru)",
    "ikon": "🩺",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Acil Cerrahi Konsültasyon",
    "akilliFisilti": "🩺 Göbek çevresinden sağ alt kadrana göç eden ağrıda McBurney hassasiyeti ve Alvarado skoru değerlendirilir.",
    "oncedenYapilacaklar": [
      "Fizik muayenede McBurney, Rovsing, Psoas ve Obturator bulgularını kontrol et; defans ve rebound varlığını kaydet",
      "Hemogramda lökositoz (WBC > 10.000) ve sola kayma (nötrofili) ile CRP yüksekliğini tespit et",
      "Oral alımı (NPO) derhal durdur, İV hidrasyon başlat ve kesin teşhis için Kontrastlı Batın BT / USG iste",
      "Genel Cerrahi konsültasyonu tamamlanmadan teşhisi maskeleyecek güçlü analjeziklerden kaçın"
    ]
  },
  {
    "id": "saglik_transfuzyon_reaksiyonu_protokolu",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "kan transfüzyon reaksiyonu",
      "hemolitik reaksiyon",
      "transfüzyon durdur",
      "kan nakli alerji"
    ],
    "baslik": "Akut Kan Transfüzyon Reaksiyonu Yönetimi",
    "ikon": "🩸",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Anında Acil Müdahale",
    "akilliFisilti": "🩺 Kan transfüzyonu sırasında ateş, titreme, sırt ağrısı veya dispne geliştiğinde TRANSFÜZYON ANINDA DURDURULUR.",
    "oncedenYapilacaklar": [
      "Transfüzyonu derhal durdur, damar yolunu açık tutmak için yeni bir set ile Serum Fizyolojik (%0.9 NaCl) infüzyonuna geç",
      "Hasta kimlik barkodu ile kan torbası etiketini ve Cross-Match uyumluluk formunu tekrar eşleştir",
      "Kalan kan torbasını, seti ve hastadan alınan yeni kan/idrar numunelerini hemoliz testi için Transfüzyon Merkezine gönder",
      "Hayati bulguları (TA, Nabız, SpO₂, Ateş) 15 dakikada bir kaydet ve idrar çıkışını (hemoglobinüri takibi) izle"
    ]
  },
  {
    "id": "veteriner_kopek_gd_mide_donmesi_acil_peksi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "mide dönmesi köpek",
      "gdv acil",
      "gastrik dilatasyon volvulus",
      "gastropeksi"
    ],
    "baslik": "Köpekte Gastrik Dilatasyon Volvulus (GDV) Acil Müdahalesi",
    "ikon": "🐕",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Dakikalar İçinde Acil Operasyon",
    "akilliFisilti": "🩺 İlerleyici karın şişliği ve verimsiz kusma çabalarında acil trokar dekompresyonu ve gastropeksi gerekir.",
    "oncedenYapilacaklar": [
      "Geniş çaplı kanülle (14-16G) uyluk veya göğüs duvarından mideye perkütan trokar batırarak aşırı gaz basıncını boşalt",
      "İki damar yolu açarak agresif şok dozu sıvı tedavisi (60-90 ml/kg/saat kristaloid) ve EKG aritmisi (VPC) takibi başlat",
      "Sağ lateral batın radyografisinde mide üzerinde çift kubbe (Double Bubble / Popeye Hat) görüntüsünü doğrula",
      "Acil laparatomiye geçerek mideyi 360° anatomik konumuna çevir, splenik nekrozu kontrol et ve kalıcı Gastropeksi yap"
    ]
  },
  {
    "id": "veteriner_kedi_flutd_uretral_tikaniklik",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi idrar yapamama",
      "flutd üretra tıkanıklığı",
      "idrar sondası kedi",
      "potasyum kardiyak arrest kedi"
    ],
    "baslik": "Erkek Kedide Akut Üretral Obstrüksiyon & İdrar Sondası",
    "ikon": "🐈",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İlk 24 Saat Hayati Risk",
    "akilliFisilti": "🩺 Tıkalı kedide hiperkalemi kardiyotoksik etki yapar; idrar sondası öncesi EKG ve serum potasyumu kontrol edilir.",
    "oncedenYapilacaklar": [
      "Sert ve gergin idrar kesesini palpasyonla tespit et; rüptür riskine karşı aşırı manuel sıkıştırmadan KAÇIN",
      "EKG’de sivri T dalgası veya bradikardi varsa hiperkalemiye karşı %10 Kalsiyum Glukonat ve İnsülin/Glukoz infüzyonu yap",
      "Hafif sedasyon altında steril tomcat/kayganlaştırıcı kateter ile üretradaki mukus/strüvit tıkaçlarını SF ile geriye yıka",
      "Sondayı idrar kesesine yerleştirip idrar torbasına bağla; 48 saat boyunca idrar çıkışını ve post-obstrüktif diürezi izle"
    ]
  },
  {
    "id": "veteriner_buyukbas_hipokalsemi_sut_hummasi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "süt humması",
      "hipokalsemi inek",
      "doğum felci kalsiyum",
      "kalsiyum boroglukonat iv"
    ],
    "baslik": "Süt İneğinde Doğum Felci (Hipokalsemi / Süt Humması)",
    "ikon": "🐄",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Doğum Sonrası İlk 48 Saat",
    "akilliFisilti": "🩺 Yatan inekte \"S\" şeklinde boyun eğriliği ve kulak soğukluğunda İV Kalsiyum Boroglukonat yavaşça verilir.",
    "oncedenYapilacaklar": [
      "Beden ısısını, pupilla refleksini ve rumen hareketlerinin tamamen durduğunu (atoni) teyit et",
      "500 ml %20-40 Kalsiyum Boroglukonat solüsyonunu vücut sıcaklığına ısıt",
      "İV juguler venden en az 15-20 dakikaya yayarak çok yavaş infüze et (Hızlı verilirse kardiyak arrest gelişir)",
      "İnfüzyon sırasında stetoskopla kalp ritmini dinle; aritmi veya bradikardi gelişirse infüzyonu durdur"
    ]
  },
  {
    "id": "veteriner_asi_takvimi_kuduz_karma_protokol",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi köpek aşı takvimi",
      "kuduz aşısı yasal süre",
      "karma aşı yavru",
      "mikroçip aşı kayıt"
    ],
    "baslik": "Evcil Hayvan Temel Aşılama & Yasal Kuduz Protokolü",
    "ikon": "💉",
    "renk": "#DCFCE7",
    "varsayilanZaman": "8. Haftadan İtibaren",
    "akilliFisilti": "🩺 5996 sayılı Kanun gereği 3 aylıktan büyük kedi ve köpeklerde yıllık Kuduz aşısı ve mikroçip zorunludur.",
    "oncedenYapilacaklar": [
      "Aşı öncesi genel klinik muayene yap (Ateş > 39.2°C ise veya paraziter enfeksiyon varsa aşıyı ertele)",
      "Yavru köpeklerde 8. haftada DHPPi-L karma aşı, yavru kedilerde Karma (FVRCP) ve Lösemi (FeLV) aşılarını uygula",
      "12. haftayı dolduran tüm hayvanlara yasal Kuduz aşısını yap ve Bakanlık E-Islem / Tarım portalına mikroçiple işle",
      "Aşı sonrası anaflaktik şok riskine karşı hayvan sahibini klinikte 15-20 dakika beklet"
    ]
  },
  {
    "id": "veteriner_cerrahi_anestezi_izofluran_entubasyon",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "veteriner gaz anestezi",
      "kedi köpek entübasyon",
      "izofluran vaporizatör",
      "anestezi kapnografi"
    ],
    "baslik": "Küçük Hayvan İnhalasyon Anestezisi & Endotrakeal Entübasyon",
    "ikon": "🐾",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Operasyon Öncesi Hazırlık",
    "akilliFisilti": "🩺 İnhalasyon anestezisinde endotrakeal tüp kafı kaçak yapmayacak şekilde şişirilir ve kapnografiyle EtCO₂ izlenir.",
    "oncedenYapilacaklar": [
      "Hastanın kilosuna ve ırkına uygun çapta (3.0 - 9.0 mm) endotrakeal tüp ve laringoskop hazırla",
      "Propofol/Alfaxalone indüksiyonu sonrası larinksi doğrudan görerek tüpü trakeya yerleştir ve kafı nazikçe şişir",
      "İzofluran/Sevofluran vaporizatörünü %1.5-2.5 idame seviyesine ve O₂ akışını 1-2 L/dk’ya ayarla",
      "Monitörden SpO₂ (>%95), EtCO₂ (35-45 mmHg), Non-invaziv Tansiyon ve EKG dalgalarını her 5 dakikada bir kaydet"
    ]
  },
  {
    "id": "eczane_kirmizi_recete_morfin_stok_titck",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "kırmızı reçete morfin",
      "kontrole tabi ilaç defteri",
      "uyuşturucu ilaç teslim",
      "titck rrs bildirimi"
    ],
    "baslik": "Uyuşturucu (Kırmızı Reçete) İlaç Giriş-Çıkış & Kasa Saklama",
    "ikon": "💊",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Aynı Gün İTS/RRS Girişi",
    "akilliFisilti": "💊 Morfin, Fentanil ve Oksikodon türevi uyuşturucu ilaçlar kilitli çelik kasada saklanır ve RRS’ye anında işlenir.",
    "oncedenYapilacaklar": [
      "Kırmızı reçeteli ilacın Renkli Reçete Sisteminde (RRS) hekim ve hasta TC kimlik onayını kontrol et",
      "İlacı teslim alan kişinin (hasta veya 1. derece yakını) kimlik fotokopisini ve imzasını teslim föyüne al",
      "İTS sistemi üzerinden karekod satış onayını alıp sistem stok düşümünü anında gerçekleştir",
      "İl Sağlık Müdürlüğü yıllık teftişi için \"Uyuşturucu ve Psikotrop İlaç Kayıt Defteri\"ne reçete protokol no ve kalan fiziki stok adedini yaz"
    ]
  },
  {
    "id": "eczane_soguk_zincir_insülin_isi_nem_takibi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "soğuk zincir ilaç dolabı",
      "insülin saklama sıcaklığı 2-8",
      "eczane buzdolabı alarmı",
      "datalogger kalibrasyon"
    ],
    "baslik": "Eczane Soğuk Zincir (+2°C ile +8°C) İlaç & Aşı Yönetimi",
    "ikon": "❄️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Sabah & Akşam Günlük Kontrol",
    "akilliFisilti": "💊 İnsülin ve biyolojik aşılar buzdolabı kapağında değil; orta rafta +2°C ile +8°C arasında saklanmalıdır.",
    "oncedenYapilacaklar": [
      "Kalibre edilmiş Datalogger cihazından sabah ve akşam sıcaklık/nem değerlerini kontrol et ve çizelgeye kaydet",
      "Sıcaklık +8°C üzerine çıktığında veya +2°C altına düştüğünde SMS/Arama alarm sisteminin çalıştığını teyit et",
      "Elektrik kesintisi durumunda buzdolabı kapağını kesinlikle açma ve UPS/Jeneratör beslemesini kontrol et",
      "Hastaya teslim ederken ilacın buz aküsü ve strafor termal poşet içinde donmayacak şekilde taşınmasını sağla"
    ]
  },
  {
    "id": "eczane_medula_fatura_sgk_kesinti_itiraz",
    "category": "finans",
    "domain": "ECZACILIK",
    "keywords": [
      "medula eczane fatura",
      "sgk reçete teslimi",
      "medula kesinti itirazı",
      "eczane döküm listesi"
    ],
    "baslik": "Aylık SGK Medula Eczane Döküm Listesi & Fatura Teslimi",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Ayın 1-15’i Arası",
    "akilliFisilti": "💊 Medula döküm listesi, A/B/C grubu reçeteleri ve e-Fatura her ayın 15’ine kadar SGK İl Müdürlüğüne teslim edilir.",
    "oncedenYapilacaklar": [
      "Medula sisteminden A Grubu (Normal), B Grubu (Sıralı Dağıtım) ve C Grubu (Kan Ürünü/Yurtdışı) dökümlerini kapat",
      "Manuel kupürlü veya raporlu reçetelerdeki hekim kaşesi, aslı gibidir onayı ve hasta imza eksiklerini gider",
      "Eczacı Odası onaylı sıralı dağıtım tevzi formlarını ilgili reçete grubunun üzerine ekle",
      "Oluşturulan e-Faturayı SGK Muhasebe birimine gönderip koli teslim tutanağını SGK koli teslim merkezine teslim et"
    ]
  },
  {
    "id": "eczane_ilac_takas_gln_transfer",
    "category": "finans",
    "domain": "ECZACILIK",
    "keywords": [
      "eczane takas its",
      "gln transfer ilaç",
      "eczacı odası takas",
      "its deaktivasyon iptal"
    ],
    "baslik": "Eczaneler Arası İlaç Takası & İTS GLN Transferi",
    "ikon": "🔄",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İlaç Teslim Anında",
    "akilliFisilti": "💊 Eczaneler arası takasta ilaç fiziki olarak çıkmadan önce İTS portalından alıcı eczanenin GLN koduna transfer edilmelidir.",
    "oncedenYapilacaklar": [
      "Alıcı eczanenin İl Sağlık/Bakanlık tescilli resmi GLN (Global Location Number) numarasını doğrula",
      "İlaç Takip Sistemi (İTS) üzerinden \"Eczaneden Eczaneye Devir/Takas\" bildirimini karekodları okutarak yap",
      "Karşı eczanenin İTS ekranından transfer onayını verdiğini teyit etmeden ilacı kuryeye teslim etme",
      "Takas faturasını veya Eczacı Odası onaylı takas pusulasını tanzim ederek muhasebe kayıtlarına intikal ettir"
    ]
  },
  {
    "id": "eczane_majistral_laboratuvar_steril_solusyon",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "majistral reçete hazırlama",
      "majistral laboratuvar",
      "lugol solüsyonu",
      "majistral alkol kaydı"
    ],
    "baslik": "Majistral İlaç Yapımı, Tartım & Türk Farmakopesi Etiketi",
    "ikon": "🧪",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Reçete Karşılanırken",
    "akilliFisilti": "💊 Majistral formüllerde kullanılan kimyasal hammaddelerin sertifikalı ve kalibre hassas terazide tartılması zorunludur.",
    "oncedenYapilacaklar": [
      "Hekimin reçetedeki etken madde oranlarını ve aşırı doz (Dosis Maxima) sınırlarını Türk Farmakopesinden denetle",
      "0.001g hassasiyetli dijital terazinin kalibrasyonunu kontrol edip etken maddeleri sırasıyla homojen karıştır",
      "Haricen kullanılacak preparatlara KIRMIZI etiket, dahilen kullanılacaklara BEYAZ etiket yapıştır",
      "Kullanılan etil alkol miktarını \"Saf Alkol Sarf Defteri\"ne, hazırlanan ilacı ise resmi \"Majistral Reçete Defteri\"ne kaydet"
    ]
  },
  {
    "id": "saglik_kardiyak_arrest_acls_resusitasyon",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "kardiyak arrest acls",
      "ileri yaşam desteği",
      "vf vt defibrilasyon 200j",
      "asistoli adrenalin 3-5 dk"
    ],
    "baslik": "İleri Kardiyak Yaşam Desteği (ACLS / CPR) Protokolü",
    "ikon": "⚡",
    "renk": "#E0F2FE",
    "varsayilanZaman": "0. Saniye Acil Müdahale",
    "akilliFisilti": "🩺 VF/Nabızsız VT şoklanabilir ritimdir (200J Bifazik); Asistoli/NEA durumunda ŞOK VERİLMEZ, her 3-5 dk’da 1 mg Adrenalin uygulanır.",
    "oncedenYapilacaklar": [
      "Kaliteli göğüs kompresyonuna başla: Dakikada 100-120 bası, en az 5 cm derinlik ve göğsün tam geri dönmesine izin ver",
      "Monitör/Defibrilatörü bağlayarak ritmi analiz et: VF/VT ise 200J Bifazik şok uygula ve ardından 2 dakika kesintisiz CPR yap",
      "3. şoktan sonra dirençli VF/VT için 300 mg İV Amiodaron (Gerekirse 150 mg tekrar) veya Lidokain yükle",
      "Geri döndürülebilir nedenleri (5H - 5T: Hipovolemi, Hipoksi, Hidrojen iyonu/Asidoz, Hipo/Hiperkalemi, Hipotermi | Tansiyon pnömotoraks, Tamponad, Toksin, Tromboz koroner/pulmoner) tara"
    ]
  },
  {
    "id": "saglik_diyabetik_ayak_wagner_skorlama",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "diyabetik ayak wagner",
      "nöropatik ülser osteomiyelit",
      "diyabetik yara debridman",
      "ayak bileği kol indeksi abi"
    ],
    "baslik": "Diyabetik Ayak Ülseri & Wagner Derecelendirmesi",
    "ikon": "🩺",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Pansuman & Klinik Muayene",
    "akilliFisilti": "🩺 Wagner Evre 3 (Derin apse/osteomiyelit) ve üzeri lezyonlarda cerrahi debridman ve parenteral geniş spektrumlu antibiyoterapi şarttır.",
    "oncedenYapilacaklar": [
      "Yara derinliğini monofilaman his testi, prob ile kemik teması (Probe-to-bone) ve direkt ayak grafisiyle incele",
      "Arteryel dolaşım yetmezliğini dışlamak için Doppler USG ve Ayak Bileği-Kol İndeksi (ABI: 0.9-1.3) ölçümü yap",
      "Yara tabanındaki hiperkeratoz ve nekrotik dokuları cerrahi debridmanla uzaklaştırıp steril derin doku kültürü al",
      "Basıyı ortadan kaldırmak için tam temaslı alçı (Total Contact Cast) veya özel ortopedik tabanlık planla"
    ]
  },
  {
    "id": "saglik_pnömotoraks_tup_torakostomi_su_alti",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "tansiyon pnömotoraks iğne dekompresyon",
      "tüp torakostomi",
      "göğüs tüpü su altı drenaj",
      "akciğer kollapsı"
    ],
    "baslik": "Tansiyon Pnömotoraks İğne Dekompresyonu & Göğüs Tüpü",
    "ikon": "🫁",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Anında Acil Girişim",
    "akilliFisilti": "🩺 Trakea deviasyonu ve hipotansiyonda 2. İnterkostal aralıktan acil iğne dekompresyonu yapılıp ardından 5. İKA’dan göğüs tüpü takılır.",
    "oncedenYapilacaklar": [
      "Tansiyon pnömotoraks şüphesinde grafi beklemeden 14-16G anjiyoket ile 2. İnterkostal aralık orta klavikuler hattan havayı boşalt",
      "Kesin tedavi için 5. İnterkostal aralık ön/orta aksiller çizgi kesişiminden (Güvenli Üçgen) Tüp Torakostomi uygula",
      "Göğüs tüpünü tek yönlü su altı drenaj sistemine (Bülau Drenajı) bağlayarak su kabarcığı salınımını ve akciğer ekspansiyonunu gözle",
      "İşlem sonrası akciğerin re-ekspanse olduğunu teyit etmek için kontrol Akciğer Grafisi (PA-AC) çek"
    ]
  },
  {
    "id": "saglik_neonatal_yenidogan_sariligi_fototerapi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "yenidoğan sarılığı fototerapi",
      "total serum bilirubin nomogramı",
      "kernikterus riski",
      "kan değişimi bilirubin"
    ],
    "baslik": "Yenidoğan Hiperbilirubinemisi & Bhutani Nomogramı",
    "ikon": "👶",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Doğum Sonrası 24-72. Saat",
    "akilliFisilti": "🩺 İlk 24 saatte gelişen sarılık patolojiktir; saatlik Total Serum Bilirubin (TSB) değeri Bhutani eğrisinde fototerapi eşiğine göre izlenir.",
    "oncedenYapilacaklar": [
      "Transkütan veya kandan Total/Direkt Bilirubin, anne-bebek kan grubu (ABO/Rh) ve Direkt Coombs testi çalış",
      "Bebeğin postnatal yaşını (saat) ve risk faktörlerini (prematürite, hemoliz, sefal hematom) Amerikan Pediatri (AAP) nomogramına yerleştir",
      "Fototerapi endikasyonu varsa gözleri özel koruyucu bantla kapatıp 460-490 nm mavi LED fototerapi cihazı altına al",
      "Bilirubin düzeyi kan değişimi (Exchange Transfusion) sınırına yaklaşıyorsa acil kan merkeziyle Cross-Match uyumlu kan hazırla"
    ]
  },
  {
    "id": "saglik_glokom_akut_kriz_goz_ici_basinc",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "akut açı kapanması glokomu",
      "göz içi basınç 40 mmhg",
      "midriatik pupil göz ağrısı",
      "iv mannitol timolol pilokarpin"
    ],
    "baslik": "Akut Açı Kapanması Glokom Krizi & İntraoküler Basınç",
    "ikon": "👁️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "İlk 2-4 Saat Görme Kurtarma",
    "akilliFisilti": "🩺 Şiddetli göz/baş ağrısı, taş gibi sert göz küresi ve fiks orta dilate pupilde acil İV Mannitol ve topikal damlalar başlanır.",
    "oncedenYapilacaklar": [
      "Aplanasyon veya Tonopen tonometrisi ile Göz İçi Basıncını (GİB) ölç (Genellikle > 40-50 mmHg)",
      "GİB’i hızla düşürmek için İV %20 Mannitol infüzyonu (1-2 g/kg) ve oral/İV Asetazolamid (Karbonik anhidraz inhibitörü) uygula",
      "Topikal %0.5 Timolol (Beta bloker), Apraklonidin ve %2 Pilokarpin damlaları 15 dakika arayla göze damlat",
      "Basınç kontrol altına alındıktan sonra kalıcı blokajı önlemek için Göz Hastalıkları uzmanınca Lazer Periferik İridektomi planla"
    ]
  },
  {
    "id": "veteriner_kedi_panlokopeni_genclik_hastaligi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi gençlik hastalığı",
      "feline panlökopeni fplv",
      "lökopeni kan tablosu kedi",
      "kanlı ishal kedi serum"
    ],
    "baslik": "Kedi Panlökopeni Virüsü (FPLV) & Agresif İzolasyon",
    "ikon": "🐈",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İlk Semptom / Anında Karantina",
    "akilliFisilti": "🩺 FPLV aşırı bulaşıcıdır; lökopeni (WBC < 2000), kusma ve ateşte hasta derhal negatif basınçlı karantinaya alınır.",
    "oncedenYapilacaklar": [
      "Dışkıdan hızlı FPLV antijen snap test kiti ve tam kan sayımında (Hemogram) şiddetli panlökopeniyi doğrula",
      "Hastayı diğer kedi temasından tamamen izole et; dezenfeksiyonda sadece Virkon-S veya %10 sodyum hipoklorit kullan",
      "Şiddetli dehidrasyona karşı İV Kristalloid (İzotonik/Ringer Laktat) ve kolloid sıvı desteği başlat",
      "Sekonder bakteriyel sepsisi önlemek için geniş spektrumlu İV antibiyotik ve İV Maropitant (kusma önleyici) uygula"
    ]
  },
  {
    "id": "veteriner_kopek_capraz_bag_tplo_ameliyati",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "köpek ön çapraz bağ kopması",
      "tplo ameliyatı köpek",
      "tibial plato açısı",
      "çekmece testi pozitif"
    ],
    "baslik": "Köpek Ön Çapraz Bağ Kopması & TPLO Cerrahi Planlaması",
    "ikon": "🐕",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Operasyon Öncesi Radyoloji",
    "akilliFisilti": "🩺 Pozitif Kraniyal Çekmece bulgusunda Tibial Plato Seviyeleme Osteotomisi (TPLO) ile açı 5-6°’ye indirgenir.",
    "oncedenYapilacaklar": [
      "Sedasyon altında dize Kraniyal Çekmece (Drawer Test) ve Tibial Kompresyon testi uygulayarak instabiliteyi sına",
      "Dizin tam 90° fleksiyon ve ekstansiyon lateral radyografisini çekerek Tibial Plato Açısını (TPA) dijital ölç",
      "Osteotomi için kavisli TPLO testere bıçağı çapını ve kilitli TPLO titanyum anatomik plağını hazırla",
      "Operasyon sonrası 8 hafta boyunca hastanın tasmalı kontrollü yürüyüş ve kafes istirahatinde kalmasını protokolize et"
    ]
  },
  {
    "id": "veteriner_buyukbas_akut_mastitis_cmt_testi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kaliforniya mastitis testi cmt",
      "büyükbaş akut mastitis",
      "somatik hücre sayısı shs",
      "meme içi antibiyotik"
    ],
    "baslik": "Süt İneğinde Akut Mastitis Teşhisi & CMT Testi",
    "ikon": "🐄",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sağım Öncesi Kontrol",
    "akilliFisilti": "🩺 Sağım öncesi 4 meme lobundan alınan ilk süte CMT reaktifi damlatılarak jel kıvamı ve somatik hücre artışı incelenir.",
    "oncedenYapilacaklar": [
      "Dört gözlü CMT paletine her memeden 2’şer ml süt sağ ve üzerine eşit miktarda CMT mor reaktifi ekle",
      "Dairesel hareketle karıştırarak sütün jelleşme derecesini (Negatif, Eser, 1, 2, 3) puanla",
      "Klinik mastitisli şiş ve sıcak memeden steril süt numunesi alarak antibiyogram için laboratuvara gönder",
      "Etkilenen loba meme içi antibiyotik infüzyonu yap ve süt arınma süresi (Yasal Kalıntı Süresi) boyunca sütü imha et"
    ]
  },
  {
    "id": "veteriner_koyun_enterotoksemi_pulpy_kidney",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "koyun yumuşak böbrek hastalığı",
      "enterotoksemi clostridium perfringens",
      "çelme hastalığı aşı",
      "ani kuzu ölümü"
    ],
    "baslik": "Koyun/Kuzularda Enterotoksemi (Çelme Hastalığı) & Aşı Takvimi",
    "ikon": "🐑",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yem Değişikliği Öncesi / İlkbahar",
    "akilliFisilti": "🩺 Tane yem ve taze meraya geçişte Clostridium toksin patlamasını önlemek için 21 gün arayla karma aşı şarttır.",
    "oncedenYapilacaklar": [
      "Ani ölen kuzuların nekropsisinde perikardiyal sıvı artışı ve böbreklerde yumuşama (Pulpy Kidney) bulgusunu incele",
      "Sürüye ani tane mısır/arpa veya taze yonca yüklemesini durdurup rasyona kuru kaba ot ekle",
      "Tüm damızlık koyunlara doğuma 4-6 hafta kala Clostridial karma aşı yaparak kolostrum yoluyla kuzuya bağışıklık aktar",
      "Sütten kesilen kuzulara 2-3 haftalıkken ilk doz aşıyı yapıp 21 gün sonra rapel (tekrar) dozunu uygula"
    ]
  },
  {
    "id": "veteriner_dis_tedavisi_kedi_forl_dis_emilimi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi forl diş rezorpsiyonu",
      "veteriner diş çekimi dental röntgen",
      "kedi diş taşı temizliği kavitron",
      "gingivit kedi"
    ],
    "baslik": "Kedi Feline Odontoklastik Rezorptif Lezyon (FORL) & Çekim",
    "ikon": "🦷",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Dental Muayene / Genel Anestezi",
    "akilliFisilti": "🩺 FORL aşırı ağrılıdır; diş minesi ve kök kemikleştiği için dental röntgen çekilerek kök amputasyonu veya tam çekim yapılır.",
    "oncedenYapilacaklar": [
      "Dental kavitron cihazı ve subgingival küretlerle tüm diş taşlarını ultrasonik olarak temizle",
      "İntraoral dental dijital sensörle şüpheli dişlerin kök rezorpsiyonunu (Tip 1 veya Tip 2 FORL) radyografik incele",
      "Kökü erimiş ve ankiloz olmuş dişlerde diş eti flebi açarak yüksek devirli su soğutmalı mikromotorla kök amputasyonu yap",
      "Çekim boşluğunu emilebilir süturla (4-0 / 5-0 Monocryl) kapatıp işlem sonrası lokal bupivakain sinir bloğu uygula"
    ]
  },
  {
    "id": "eczane_yurtdisi_ilac_teb_ithalat_onay",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "yurtdışı ilaç temini teb",
      "sağlık bakanlığı endikasyon dışı onay",
      "ithal ilaç talep formu",
      "nadir hastalık ilacı"
    ],
    "baslik": "Türk Eczacıları Birliği (TEB) Yurtdışı İlaç Temini & Onay",
    "ikon": "🌍",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Reçete ve Rapor İntikali",
    "akilliFisilti": "💊 Türkiye’de ruhsatlı olmayan yetim ilaçlar TİTCK Endikasyon Dışı İzin Belgesi ile TEB üzerinden ithal edilir.",
    "oncedenYapilacaklar": [
      "Hastanın Üniversite/Eğitim Araştırma Hastanesinden alınan Sağlık Kurulu Raporunu ve e-Reçetesini kontrol et",
      "TİTCK (Türkiye İlaç ve Tıbbi Cihaz Kurumu) resmi \"Yurtdışı İlaç Kullanım İzin Belgesi\"nin süresini teyit et",
      "TEB Yurtdışı İlaç İthalat Portalı üzerinden hasta adına ithalat başvuru formunu ve kimlik fotokopisini yükle",
      "Gümrükten soğuk zincirle gelen ilacın barkod ve ısı takip kayıtlarını doğrulayarak hastaya teslim et"
    ]
  },
  {
    "id": "eczane_biyobenzer_ilac_degisimi_kurallari",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "biyobenzer ilaç ikamesi",
      "orijinal biyolojik referans ürün",
      "biyobenzer değiştirilebilirlik",
      "immünite monoklonal antikor"
    ],
    "baslik": "Biyolojik ve Biyobenzer İlaçlarda İkame & Takip Protokolü",
    "ikon": "🧬",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Reçete Karşılama Sırası",
    "akilliFisilti": "💊 Biyobenzer ilaçlar küçük moleküllü jenerikler gibi serbestçe ikame edilemez; hekim onayı ve marka takibi esastır.",
    "oncedenYapilacaklar": [
      "Reçetedeki ilacın biyolojik referans ürün mü yoksa biyobenzer mi olduğunu SUT (Sağlık Uygulama Tebliği) listesinden kontrol et",
      "İlaç Güvenlik İzlem Formu gerektiren monoklonal antikorlarda hastanın Bakanlık onaylı takip kodunu doğrula",
      "Eczanede hastaya verilen ilacın ticari adını, serisini ve İTS karekodunu hasta profiline açıkça kaydet",
      "Olası immünojenisite ve yan etki durumunda TÜFAM (Türkiye Farmakovijilans Merkezi) bildirim formunu hazırla"
    ]
  },
  {
    "id": "eczane_kan_urunu_faktör_hemofili_takip",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "hemofili faktör reçetesi",
      "kan ürünü teslim takip defteri",
      "faktör 8 faktör 9 its",
      "hemofili takip karnesi"
    ],
    "baslik": "Hemofili Faktör / Kan Ürünü Reçetesi & Karne Doğrulama",
    "ikon": "🩸",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Teslim Anı / Medula Onayı",
    "akilliFisilti": "💊 Faktör VIII ve IX reçetelerinde hastanın resmi Hemofili Takip Karnesi hekim tarafından kaşeli olmak zorundadır.",
    "oncedenYapilacaklar": [
      "Hastanın fiziki veya e-Hemofili Takip Karnesindeki kalan ünite sayısı ile reçete edilen dozu karşılaştır",
      "Kan ürünlerinin İTS karekodlarını \"Kan Ürünü Bildirimi\" modülünden teker teker okutarak sisteme düş",
      "Reçete arkasına faktör flakonlarının üzerindeki seri no/lot barkodlarını yapıştırıp hastaya ıslak imza attır",
      "İl Sağlık Müdürlüğü ve SGK Teftişi için \"Mor Reçete / Kan Ürünleri Kayıt Defteri\"ne işleyip kilitli dolapta sakla"
    ]
  },
  {
    "id": "eczane_enteral_beslenme_mama_hesabi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "enteral beslenme maması reçetesi",
      "günlük kalori hesabı medula",
      "mama raporu sut kriteri",
      "oral beslenme solüsyonu"
    ],
    "baslik": "Enteral Beslenme Ürünü / Tıbbi Mama Reçetesi & Kalori Hesabı",
    "ikon": "🥛",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Aylık Reçete Karşılama",
    "akilliFisilti": "💊 Enteral beslenme raporunda hastanın boy, kilo, VKİ değeri ve günlük alması gereken net kalori/kutu adedi yazmalıdır.",
    "oncedenYapilacaklar": [
      "Sağlık raporundaki Vücut Kitle İndeksinin (VKİ < 18.5 veya son 3 ayda %10 kilo kaybı) SUT kriterlerine uyduğunu doğrula",
      "Raporda belirtilen günlük kalori miktarı (Örn: 1500 kcal/gün) ile kutu kalori değerini oranlayarak aylık azami kutu sayısını hesapla",
      "Medula sistemine reçete girişini yapıp hekim kaşesi ve hastanın maluliyet raporunu dosyaya iliştir",
      "Hastaya/yakınına mamanın açıldıktan sonra buzdolabında saklanması ve 24 saat içinde tüketilmesi gerektiğini anlat"
    ]
  },
  {
    "id": "eczane_glukometre_stripi_sgk_odeme_sut",
    "category": "finans",
    "domain": "ECZACILIK",
    "keywords": [
      "şeker ölçüm çubuğu strip",
      "glukometre stripi sgk",
      "insülin kullanan hasta strip adedi",
      "medula medikal malzeme"
    ],
    "baslik": "Diyabet Şeker Ölçüm Çubuğu (Strip) & Medula Medikal Reçete",
    "ikon": "🩸",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Reçete Girişi Sırasında",
    "akilliFisilti": "💊 Günde 4 kez insülin kullanan diyabet hastasına 3 ayda en fazla 300 adet strip SGK tarafından karşılanır.",
    "oncedenYapilacaklar": [
      "Hastanın diyabet sağlık raporundaki insülin kullanım rejimini (Tekli, İkili, Yoğun/Günde 4 Doz) kontrol et",
      "Medula Medikal Malzeme ekranından hastanın son 3 ayda başka bir eczaneden strip alıp almadığını (zaman aşımı) sorgula",
      "Kutu üzerindeki UBB/ÜTS barkodunu okutarak Sosyal Güvenlik Kurumu geri ödeme listesinde aktif olduğunu doğrula",
      "Medula medikal sözleşmesi gereği hastadan alınan e-Reçete çıktısını ve taahhütnameyi imzalatarak arşive ekle"
    ]
  },
  {
    "id": "saglik_menenjit_bakteriyel_lomber_ponksiyon_lp",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "bakteriyel menenjit şüphesi",
      "ense sertliği kernig brudzinski",
      "lomber ponksiyon bos basıncı",
      "menenjit deksametazon seftriakson"
    ],
    "baslik": "Akut Bakteriyel Menenjit & Acil Lomber Ponksiyon (LP)",
    "ikon": "🧠",
    "renk": "#E0F2FE",
    "varsayilanZaman": "İlk 30 Dakika Acil Müdahale",
    "akilliFisilti": "🩺 Ateş, ense sertliği ve bilinç bulanıklığında kitle etkisi kranial BT ile dışlandıktan sonra acil LP yapılır ve antibiyotik başlanır.",
    "oncedenYapilacaklar": [
      "Fizik muayenede Ense Sertliği, Kernig ve Brudzinski belirtilerini ve peteşiyal/purpurik döküntüleri kontrol et",
      "Papilödem veya fokal nörolojik defisit varsa herniasyon riskine karşı LP öncesi acil Kontrastsız Beyin BT çek",
      "L3-L4 veya L4-L5 aralığından BOS basıncını ölçerek 4 tüp BOS numunesi (Direkt mikroskopi, Gram boyama, Biyokimya, Kültür) al",
      "İlk antibiyotik dozu ile birlikte işitme kaybı ve mortaliteyi azaltmak için İV Deksametazon uygula"
    ]
  },
  {
    "id": "saglik_diyabetik_hipoglisemi_dekstroz_glukagon",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "ağır hipoglisemi koması",
      "kan şekeri < 50 mg/dl",
      "iv %20 dekstroz puşe",
      "glukagon im otoenjektör"
    ],
    "baslik": "Ağır Hipoglisemi Koması & Acil İV %20 Dekstroz Protokolü",
    "ikon": "💉",
    "renk": "#E0F2FE",
    "varsayilanZaman": "0. Dakika Acil Müdahale",
    "akilliFisilti": "🩺 Bilinci kapalı hipoglisemik hastada oral hiçbir şey verilmez; acil İV %20 Dekstroz puşe veya İM Glukagon yapılır.",
    "oncedenYapilacaklar": [
      "Glukometre ile kapiller kan şekerini ölç (< 54 mg/dL ise ağır nöroglikopeni tablosu)",
      "Damar yolu açıksa 50-100 ml %20 Dekstroz (veya 150-200 ml %10 Dekstroz) İV hızlı puşe uygula",
      "Damar yolu açılamıyorsa uyluk bölgesine 1 mg Glukagon İM enjeksiyonu yap",
      "15 dakika sonra kan şekerini tekrar ölç ve bilinç açıldığında uzun etkili kompleks karbonhidratlı gıda ver"
    ]
  },
  {
    "id": "saglik_epistaksis_burun_kanamasi_on_arka_tampon",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "şiddetli burun kanaması",
      "kiesselbach pleksusu koterizasyon",
      "merocel ön burun tamponu",
      "arka burun tamponu foley"
    ],
    "baslik": "Masif Epistaksis (Burun Kanaması) & Merocel / Arka Tampon",
    "ikon": "🩺",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Acil Poliklinik / KBB Müdahale",
    "akilliFisilti": "🩺 Hasta başını öne eğmeli ve burun kanatları 10 dk sıkılmalıdır; durmayan kanamada Merocel veya pnömatik tampon takılır.",
    "oncedenYapilacaklar": [
      "Hastanın vital bulgularını (Tansiyon ölçümü) kontrol et; hipertansif krizi varsa antihipertansif müdahale planla",
      "Burun içindeki pıhtıları aspire edip topikal dekonjestan/lokal anestezikli pamukla Kiesselbach alanına bası yap",
      "Görünen kanama odağını Gümüş Nitrat çubuğu veya bipolar koter ile koterize et",
      "Yaygın sızıntıda Merocel ön tampon yerleştirip SF ile şişir; arka kanamada çift lümenli pnömatik/Foley kateter tampon uygula"
    ]
  },
  {
    "id": "saglik_karaciger_sirozu_ozofagus_varis_kanamasi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "özofagus varis kanaması siroz",
      "endoskopik bant ligasyonu",
      "terlipressin somatostatin iv",
      "sengstaken-blakemore tüpü"
    ],
    "baslik": "Akut Özofagus Varis Kanaması & Acil Endoskopik Bant Ligasyonu",
    "ikon": "🩸",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İlk 6-12 Saat Acil Endoskopi",
    "akilliFisilti": "🩺 Sirozlu hastada hematemez acil tablodur; anında İV Terlipressin/Oktreotid başlanır ve endoskopik bant ligasyonu yapılır.",
    "oncedenYapilacaklar": [
      "Hava yolunu korumak için gerekirse acil endotrakeal entübasyon yap ve 2 geniş damar yolu ile kristaloid başla",
      "Hedef Hemoglobin seviyesini (7-8 g/dL) koruyacak şekilde kısıtlayıcı kan transfüzyonu uygula",
      "Splanik vazokonstriksiyon sağlamak için acil İV Terlipressin veya Somatostatin infüzyonu başlat",
      "Gastroenteroloji ekibince ilk 12 saatte acil gastroskopi yapılarak kanayan varis paketlerine Endoskopik Bant Ligasyonu (EVL) uygulat"
    ]
  },
  {
    "id": "saglik_status_epileptikus_direncli_nobet_lorazepam",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "status epileptikus 5 dakika",
      "dirençli epilepsi nöbeti",
      "iv diazepam midazolam puşe",
      "levetirasitam fenitoin yükleme"
    ],
    "baslik": "Status Epileptikus (> 5 Dk Nöbet) & Acil İV Antiepileptik Protokolü",
    "ikon": "⚡",
    "renk": "#E0F2FE",
    "varsayilanZaman": "5. Dakika Acil Müdahale Eşiği",
    "akilliFisilti": "🩺 5 dakikayı aşan jeneralize konvülsif nöbet Status Epileptikus kabul edilir ve derhal İV Benzodiazepin uygulanır.",
    "oncedenYapilacaklar": [
      "Hava yolu açıklığını sağla, aspire etmemesi için hastayı sol yan (koma) pozisyonuna al ve yüksek akımlı O₂ ver",
      "0-5. dakikada İV 10 mg Diazepam veya İV 4 mg Lorazepam (veya İM 10 mg Midazolam) uygula",
      "10-20. dakikada nöbet durmazsa 60 mg/kg İV Levetirasetam (Keppra) veya 20 mg/kg İV Fenitoin infüzyonuna geç",
      "30. dakikayı geçen dirençli nöbette genel anestezi (Propofol/Tiopental) altında yoğun bakım entübasyonuna hazırlan"
    ]
  },
  {
    "id": "vet_kopek_gdve_mide_donmesi_trokar_gastropeksi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "gdve mide dönmesi dilatasyon",
      "mide torsiyonu trokar dekompresyon",
      "akut karın şişliği köpek",
      "acil gastropeksi ameliyatı"
    ],
    "baslik": "Acil GDV: Mide Genişlemesi / Torsiyonu & Acil Gastropeksi",
    "ikon": "🐕",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Acil / İlk 1 Saat",
    "akilliFisilti": "🩺 GDV hiperakut ölümcül bir tablodur; splenik nekroz ve kardiyak aritmileri önlemek için derhal trokar ile mide dekompresyonu yapın.",
    "oncedenYapilacaklar": [
      "Geniş çaplı (18G) çift venöz damar yolu açıp şok dozunda dengeli kristalloid sıvı replasmanı ve EKG takibi başlat",
      "Sol karın duvarından perküsyonla en belirgin timpanik alana 14-16G steril kanül batırarak mide gazını trokarize et",
      "Sağ lateral radyografide çift kese (Double Bubble / Popeye işareti) ile pilor yerleşimini teyit et",
      "Acil laparatomiye girerek mide ve dalağı derotasyon yap, nekrotik dokuları rezeke edip sağ karın duvarına kalıcı Gastropeksi dik"
    ]
  },
  {
    "id": "vet_kedi_flutd_uretral_obstruksiyon_idrar_sondasi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi üretra tıkanıklığı flutd",
      "kedide idrar yapamama sonda",
      "hiperpotasemi kedi ekg bradikardi",
      "tom cat kateter takma"
    ],
    "baslik": "Kedi FLUTD: Akut Üretral Obstrüksiyon & İdrar Sondası",
    "ikon": "🐈",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Acil Müdahale",
    "akilliFisilti": "🩺 Tıkalı kedide hiperpotasemi ölümcül kardiyotoksiktir; potasyum seviyesini düşürmek için Kalsiyum Glukonat ve Dekstroz-İnsülin hazır bulundurun.",
    "oncedenYapilacaklar": [
      "Mesanenin aşırı gerginliğini palpasyonla kontrol et; sistosentez ile acil dekompresyon yaparak mesane içi basıncı düşür",
      "Sedasyon altında steril Tom-Cat veya açık uçlu üretral kateteri ılık steril serumla yıkayarak (flushing) üretradaki tıkacı aç",
      "Kateteri prepusyuma sütüre edip kapalı idrar torbası sistemine bağlayarak 48-72 saatlik idrar çıkışını takip et",
      "İdrar sedimentinde struvit/okzalat kristal analizine göre özel reçeteli üriner diyete ve ağrı kesici (buprenorfin) protokolüne başla"
    ]
  },
  {
    "id": "vet_buyukbas_abomazum_deplasmani_lda_rda_ping",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "abomazum deplasmanı lda rda",
      "inek mide dönmesi ping sesi",
      "sol abomazum deplasmanı ameliyatı",
      "abomazopeksi omentopeksi"
    ],
    "baslik": "Büyükbaş Süt İneği: Sol/Sağ Abomazum Deplasmanı (LDA/RDA)",
    "ikon": "🐄",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Erken Teşhis / Ameliyat",
    "akilliFisilti": "🩺 9.-12. kaburgalar arasında stetoskop ve perküsyonda duyulan metalik \"Ping\" sesi gazlı abomazum yer değiştirmesinin kesin kanıtıdır.",
    "oncedenYapilacaklar": [
      "Sol karın duvarında perkütan oskültasyon yaparak sol abomazum deplasmanı (LDA) metalik ping sesini sınırla",
      "Hipokalemik, hipokloremik metabolik alkaloz tablosunu düzeltmek için yüksek hacimli IV izotonik NaCl ve KCL infüzyonu yap",
      "Sağ fossa paralumbalis üzerinden laparotomi veya yuvarlama-trokar yöntemiyle abomazumdaki gazı boşalt",
      "Abomazumu anatomik konumuna çekip omentopeksi veya abomazopeksi dikişleriyle karın tabanına sabitle"
    ]
  },
  {
    "id": "vet_at_akut_kolik_nazogastrik_sonda_reklam_muayenesi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "at sancısı kolik nazogastrik sonda",
      "at rektal palpasyon kramplı kolik",
      "at mide lavajı mineral yağ",
      "at bağırsak tıkanması"
    ],
    "baslik": "At Hekimliği: Akut Sancı (Kolik) & Nazogastrik Sonda Protokolü",
    "ikon": "🐎",
    "renk": "#FED7AA",
    "varsayilanZaman": "Acil Müdahale",
    "akilliFisilti": "🩺 Atlar kusamaz; mide rüptürünü önlemek için kolikli her atta ilk adım derhal nazogastrik sonda takıp mide sıvısını sifone etmektir.",
    "oncedenYapilacaklar": [
      "Nazogastrik sondayı burun deliğinden ventral meatus boyunca mideye ilerletip mide gaz ve reflü içeriğini boşalt",
      "Rektal palpasyon muayenesi ile çekum, kolon pelvik fleksura sıkışması veya mezenterik volvulus varlığını değerlendir",
      "Karın içi organ seslerini (borborigmi) 4 kadranda dinleyip barsak motilitesini skorla",
      "Mide reflüsü yoksa sonda yoluyla mineral yağ ve elektrolitli su lavajı verip sedatif/analjezik (Flunixin Meglumine) uygula"
    ]
  },
  {
    "id": "vet_kuduz_suphesi_ve_resmi_karantina_10_gun",
    "category": "resmi",
    "domain": "VETERINER",
    "keywords": [
      "kuduz şüphesi 10 gün karantina",
      "ısırık vakası veteriner gözetimi",
      "kuduz müşahede tutanağı",
      "tarım ilçe kuduz bildirimi"
    ],
    "baslik": "Kuduz Şüpheli Isırık Vakası: 10 Günlük Resmi Müşahede & Karantina",
    "ikon": "⚠️",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Vaka Anı (10 Günlük Takip)",
    "akilliFisilti": "🩺 İnsanı ısıran kedi/köpek derhal resmi tecrite alınmalı; 10 günlük müşahede süresince kesinlikle aşı veya ötenazi uygulanmamalıdır.",
    "oncedenYapilacaklar": [
      "Isırılan kişinin sağlık kuruluşuna kuduz profilaksisi (tetanoz, yara temizliği, aşı/serum) için sevkini sağla",
      "Isıran hayvanı kliniğin resmi karantina kafesine alıp Tarım ve Orman İlçe Müdürlüğüne Kuduz Müşahede İhbarı yap",
      "1., 3., 5. ve 10. günlerde hayvanın klinik nörolojik bulgularını (hidrofobi, agresyon, salya, felç) kayıt defterine işle",
      "10. gün sonunda sağlıklı çıkan hayvana Resmi Müşahede Sağlık Raporu düzenleyip sahibine teslim et"
    ]
  },
  {
    "id": "ecz_ilac_takip_sistemi_its_karekod_deaktivasyon",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "its karekod deaktivasyon",
      "ilaç takip sistemi zayi bildirimi",
      "its iptal mal alım bildirimi",
      "its karekod uyuşmazlığı"
    ],
    "baslik": "İlaç Takip Sistemi (İTS): Karekod Doğrulama & Zayi/İade Bildirimi",
    "ikon": "💊",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İşlem Anı",
    "akilliFisilti": "💊 Karekodu İTS üzerinde kayıtlı olmayan veya sahte/mükerrer uyarısı veren ilaçların hastalara satışı kanunen suçtur.",
    "oncedenYapilacaklar": [
      "Depodan gelen tüm ilaç kolilerini 2D karekod barkod okuyucu ile tarayıp İTS Mal Alım onayını sisteme kaydet",
      "Kırılan, miadı dolan veya fiziksel hasar gören ilaçları İTS üzerinden \"Zayi Bildirimi\" ile stoktan düş",
      "Sosyal Güvenlik Kurumu Medula provizyon sistemiyle karekod eşleşmesini kontrol edip reçete çıkışını doğrula",
      "İTS sistemi arızası durumunda manuel karekod serbest bırakma talep kayıtlarını Sağlık Bakanlığı portalına ilet"
    ]
  },
  {
    "id": "ecz_majistral_formul_alkollu_tentur_ve_pomad_hazirlama",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "majistral ilaç yapımı",
      "majistral formül pomad tartım",
      "havanda majistral karışım hazırlama",
      "majistral defteri kayıt"
    ],
    "baslik": "Majistral Formülasyon: Hassas Tartım, Homojenizasyon & Etiketleme",
    "ikon": "🧪",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Reçete Karşılama Anı",
    "akilliFisilti": "💊 Majistral formüllerde aktif maddeler analitik terazide 0.001g hassasiyetle tartılmalı ve majistral defterine sıra no ile kaydedilmelidir.",
    "oncedenYapilacaklar": [
      "Reçetedeki etken madde çözünürlüklerini ve farmakope geçimsizliklerini (inkompatibilite) kontrol et",
      "Analitik hassas terazide kalibrasyon kontrolü yaparak toz etken maddeleri sırasıyla tart",
      "Porselen/cam havanda geometrik seyreltme yöntemiyle homojen pomad veya solüsyon karışımını hazırla",
      "Kırmızı (haricen) veya beyaz (dahilen) majistral etiketini kullanım talimatı ve son tüketim tarihiyle şişeye yapıştır"
    ]
  },
  {
    "id": "ecz_soguk_zincir_asi_sicaklik_takip_ve_ats_cihazi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "eczane aşı dolabı ats",
      "soğuk zincir 2 8 derece takip",
      "aşı takip sistemi alarmı",
      "aşı dolabı kalibrasyon sertifikası"
    ],
    "baslik": "Aşı & Biyolojik Ürünler: 2-8°C ATS Sıcaklık Takip & Alarm Protokolü",
    "ikon": "💉",
    "renk": "#CCFBF1",
    "varsayilanZaman": "Sürekli / Günlük 09:00 - 18:00",
    "akilliFisilti": "💊 Aşı dolabı sıcaklığı +2°C altına inerse donma, +8°C üzerine çıkarsa denatürasyon oluşur; ATS SMS uyarısında derhal jeneratör devreye alınmalıdır.",
    "oncedenYapilacaklar": [
      "Sağlık Bakanlığı Aşı Takip Sistemi (ATS) sensör verilerini sabah ve akşam düzenli olarak onaylayıp kaydet",
      "Aşıları buzdolabı kapaklarına veya evaporatörün doğrudan üflediği dip noktaya değil, orta raflara aralıklı yerleştir",
      "Elektrik kesintisi veya sıcaklık sapması durumunda aşıları acil transfer buz akülü taşıma çantasına aktar",
      "Bozulma şüphesi olan aşıları kırmızı karantina poşetine koyup İlçe Sağlık Müdürlüğüne tutanakla bildir"
    ]
  },
  {
    "id": "ecz_uyusturucu_ve_psikotrop_ilac_renkli_recete_sistemi",
    "category": "resmi",
    "domain": "ECZACILIK",
    "keywords": [
      "renkli reçete sistemi kırmızı yeşil reçete",
      "uyuşturucu ilaç kilitli dolap",
      "mor reçete kan ürünleri",
      "psikotrop defteri sayımı"
    ],
    "baslik": "Kırmızı & Yeşil Reçete: Renkli Reçete Sistemi (RRS) & Kilitli Dolap",
    "ikon": "🔒",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Reçete Giriş Anı",
    "akilliFisilti": "💊 Kırmızı ve yeşil reçeteli ilaçlar çift kilitli çelik dolapta muhafaza edilmeli; fiili stok ile RRS sistem stoğu birebir tutmalıdır.",
    "oncedenYapilacaklar": [
      "Renkli Reçete Sisteminde (RRS) hekim e-imzasını ve hastanın T.C. kimlik doğrulamasını tamamla",
      "İlaçları çift kilitli uyuşturucu/psikotrop dolabından bizzat mesul müdür eczacı gözetiminde çıkar",
      "İlacı teslim alan kişinin kimlik fotokopisi veya imzasını reçete arkasına tanzim et",
      "Ay sonunda fiili ampul/tablet sayılarını RRS ve resmi uyuşturucu kayıt defteriyle karşılaştırıp onay ver"
    ]
  },
  {
    "id": "ecz_yurtdisi_ilac_teb_ithal_ilac_tedarik_dosyasi",
    "category": "resmi",
    "domain": "ECZACILIK",
    "keywords": [
      "yurtdışı ilaç teb ithalat",
      "türk eczacıları birliği ithal ilaç",
      "yurtdışı ilaç endikasyon dışı onay",
      "nadir hastalık ilacı talep"
    ],
    "baslik": "Nadir Hastalıklar: TEB Yurtdışı İlaç Temini & TİTCK Onay Süreci",
    "ikon": "🌍",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Dosya Başvuru Günü",
    "akilliFisilti": "💊 Türkiye'de ruhsatı olmayan yetim ilaçlar için TİTCK şahsi tedavi ek-onayı ve TEB İthal İlaç Birimi sistemi üzerinden başvuru yapılır.",
    "oncedenYapilacaklar": [
      "Üniversite veya eğitim araştırma hastanesi sağlık kurulu raporu ve reçetesini TİTCK Endikasyon Dışı portalına yükle",
      "Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK) onay evrakı ile hastanın kimlik/ikametgah belgelerini dosyala",
      "Türk Eczacıları Birliği (TEB) Yurtdışı İlaç Sistemi üzerinden sipariş kaydı açarak proforma faturayı takip et",
      "Gümrükten soğuk zincir/özel kargo ile gelen ilacın hastaya teslimini resmi teslim tesellüm tutanağıyla gerçekleştir"
    ]
  },
  {
    "id": "saglik_sepsis_qsofa_1saat_demeti",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "sepsis 1 saat demeti",
      "qsofa skorlama",
      "laktat yüksekliği sepsis",
      "kristalloid 30 ml kg yükleme"
    ],
    "baslik": "Sepsis & Septik Şok \"1 Saat Demeti (Hour-1 Bundle)\" Protokolü",
    "ikon": "🩺",
    "renk": "#E0F2FE",
    "varsayilanZaman": "İlk 60 Dakika Hayati Müdahale",
    "akilliFisilti": "🩺 qSOFA ≥ 2 olan septik hastada ilk 1 saatte kan kültürü alınıp geniş spektrumlu antibiyotik ve 30 ml/kg SF başlanır.",
    "oncedenYapilacaklar": [
      "qSOFA kriterlerini değerlendir: Solunum sayısı ≥ 22/dk, Değişmiş bilinç durumu (GKS < 15), Sistolik kan basıncı ≤ 100 mmHg",
      "Venöz/Arteryel kan gazında Laktat düzeyini ölç (Laktat > 2 mmol/L ise doku hipoperfüzyonu)",
      "Antibiyotik başlamadan önce en az iki farklı odaktan steril Kan Kültürü (Aerob/Anaerob) al",
      "Geniş spektrumlu İV antibiyotiği ilk 60 dk içinde tak ve hipotansiyon varsa 30 ml/kg dengeli kristalloid infüzyonuna başla"
    ]
  },
  {
    "id": "saglik_akut_inme_trombolitik_tpa_penceresi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "akut iskemik inme rtpa",
      "trombolitik tedavi 4.5 saat",
      "nihss inme skoru",
      "beyin bt hemoraji dışlama"
    ],
    "baslik": "Akut İskemik İnme & 4.5 Saatlik İV Trombolitik (rt-PA) Penceresi",
    "ikon": "🧠",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Semptom Başlangıcından İtibaren 4.5 Saat",
    "akilliFisilti": "🩺 İskemik inmede ilk 4.5 saat içinde kranial BT ile kanama dışlanarak İV Alteplase (rt-PA) veya trombektomi uygulanır.",
    "oncedenYapilacaklar": [
      "FAST ve NIHSS inme skorunu hesapla, semptomların kesin başlangıç saatini (Last Known Normal) kaydet",
      "Acil Beyin BT / BT Anjiyografi çekerek intrakraniyal kanamayı ve geniş enfarkt alanını kesin olarak dışla",
      "Trombolitik kontrendikasyonlarını (Kanama diyatezi, son 3 ayda majör cerrahi/kafa travması, TA > 185/110 mmHg) tara",
      "Uygun hastada 0.9 mg/kg İV Alteplase (%10 bolus, kalanı 60 dk infüzyon) başlat ve mekanik trombektomi için anjiyo ekibini uyar"
    ]
  },
  {
    "id": "saglik_status_epileptikus_lorazepam_fenitoin",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "status epileptikus tedavi algoritması",
      "dirençli nöbet diazepam",
      "fenitoin levotirasetam yükleme",
      "5 dakikayı geçen nöbet"
    ],
    "baslik": "Status Epileptikus & 5. Dakika Acil Nöbet Durdurma Algoritması",
    "ikon": "⚡",
    "renk": "#E0F2FE",
    "varsayilanZaman": "5. Dakikadan İtibaren Kademeli Müdahale",
    "akilliFisilti": "🩺 5 dakikayı geçen jeneralize nöbet status kabul edilir; ilk basamakta İV Midazolam/Diazepam, 2. basamakta Levetirasetam yüklenir.",
    "oncedenYapilacaklar": [
      "Hava yolu emniyetini sağla, aspirasyonu engellemek için başı yana çevir ve yüksek akımlı O₂ maskesi tak",
      "Parmak ucu kan şekeri ölç (Hipoglisemi varsa derhal %20 Dekstroz ver)",
      "0-5. dakikada İV 0.1 mg/kg Lorazepam veya İV 10 mg Diazepam uygula (Gerekirse 5 dk sonra tekrarla)",
      "10-20. dakikada nöbet durmazsa 2. basamak antiepileptik olarak 60 mg/kg İV Levetirasetam veya 20 mg/kg İV Fenitoin infüzyonuna geç"
    ]
  },
  {
    "id": "saglik_zehirlenme_parasetamol_asetilsistein",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "parasetamol zehirlenmesi",
      "n-asetilsistein nac protokolü",
      "rumack matthew nomogramı",
      "hepatotoksisite alt ast"
    ],
    "baslik": "Akut Parasetamol Toksisitesi & Rumack-Matthew Nomogramı",
    "ikon": "🧪",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Alımdan Sonraki 4. Saat Serum Düzeyi",
    "akilliFisilti": "🩺 Alımdan 4 saat sonra ölçülen serum parasetamol düzeyi Rumack-Matthew eğrisinde toksik hatta ise İV N-Asetilsistein (NAC) başlanır.",
    "oncedenYapilacaklar": [
      "İlk 1-2 saatte gelmişse 1 g/kg dozunda Aktif Kömür uygula ve mide lavajı yap",
      "Alımın 4. saatinde kanda Parasetamol konsantrasyonu, ALT/AST, INR ve kreatinin düzeylerini çalış",
      "Nomogramda toksisite çizgisi üzerindeyse 21 saatlik 3 aşamalı İV N-Asetilsistein (NAC) infüzyon protokolünü başlat",
      "Fulminan karaciğer yetmezliği riskine karşı PT/INR uzaması ve ensefalopati bulgularını yoğun bakımda takip et"
    ]
  },
  {
    "id": "saglik_yanik_parkland_formulu_sivi_resusitasyon",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "parkland formülü yanık",
      "ikinci üçüncü derece yanık sıvı",
      "dokuzlar kuralı yanık yüzdesi",
      "ringer laktat idrar çıkışı"
    ],
    "baslik": "Majör Yanık & Parkland Formülü Sıvı Resüsitasyonu",
    "ikon": "🔥",
    "renk": "#E0F2FE",
    "varsayilanZaman": "İlk 24 Saatlik Sıvı Protokolü",
    "akilliFisilti": "🩺 %20 üzeri 2. ve 3. derece yanıklarda Parkland Formülü (4 ml x kg x %Yanık) ile hesaplanan Ringer Laktatın yarısı ilk 8 saatte verilir.",
    "oncedenYapilacaklar": [
      "Wallace Dokuzlar Kuralı ile 2. ve 3. derece yanık yüzdesini (%TBSA) kesin olarak hesapla",
      "Parkland Formülü ile toplam 24 saatlik sıvı miktarını bul: 4 ml x Vücut Ağırlığı (kg) x %Yanık Alanı",
      "Hesaplanan sıvının %50’sini yanığın oluştuğu andan itibaren İLK 8 SAATTE, kalan %50’sini takip eden 16 saatte infüze et",
      "İdrar sondası takarak sıvı tedavisinin yeterliliğini saatlik idrar çıkışını (Erişkinde 0.5 - 1.0 ml/kg/saat) izleyerek titre et"
    ]
  },
  {
    "id": "veteriner_kedi_kopek_karma_ve_kuduz_asisi_protokolu",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi köpek karma aşı protokolü",
      "kuduz aşısı 3 ay üzeri",
      "iç dış parazit damlası",
      "evcil hayvan aşı karnesi petvet"
    ],
    "baslik": "PetVet Aşı Protokolü: Karma (DHPPi/FVRCP), Kuduz & Çip Kaydı",
    "ikon": "🐾",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Yavru 8. Hafta / Yıllık Tekrar",
    "akilliFisilti": "🩺 Aşı öncesi hastanın ateşi (38.0-39.2°C) ölçülmeli, iç parazit uygulaması tamamlanmış ve hasta stabil olmalıdır.",
    "oncedenYapilacaklar": [
      "Klinik muayenede rektal ateş, lenf yumruları, mukozalar ve kalp/akciğer oskültasyonunu değerlendir",
      "Endoparazit tedavisinden en az 7-10 gün sonra liyofilize karma aşı flakonunu soğuk zincirden çıkarıp sulandır",
      "Mikroçip okuyucu ile ISO 11784 standardındaki 15 haneli transponder numarasını doğrula ve Tarım Bakanlığı PetVet sistemine kaydet",
      "Aşı sonrası anafilaksi riskine karşı 15 dakika klinikte gözlem altında tut, aşı karnesini onayla"
    ]
  },
  {
    "id": "veteriner_buyukbas_guclukle_dogum_distosi_sezaryen",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "sığır distosi güç doğum",
      "buzağı çekme krikosu halat",
      "veteriner sezaryen operasyonu büyükbaş",
      "retensiyo sekundinarum son atamama"
    ],
    "baslik": "Büyükbaş Doğum Müdahalesi (Distosi): Pozisyon Düzeltme & Sezaryen",
    "ikon": "🐄",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Doğum Sancıları Başlangıcı (0. Saat)",
    "akilliFisilti": "🩺 Yavru geliş pozisyonu düzeltilemezse (Baş/bacak bükülmesi) vakit kaybetmeden sol açlık çukurundan sezaryene geçilir.",
    "oncedenYapilacaklar": [
      "Doğum kanalını ve serviksi steril eldiven ve doğum jeliyle muayene ederek açılma derecesini ve yavrunun canlılığını kontrol et",
      "Geliş anomalisi varsa (Anterior/Posterior sapma) yavruyu iterek bacak ve başı steril doğum zinciriyle pelvise yönlendir",
      "Uterus torsiyonu varsa döş tahtası veya mekanik çevirme manevrasıyla torsiyonu çöz",
      "Doğum sonrası 12-24 saat içinde sonun (Plasenta) atılmasını ve uterus içi antibakteriyel tablet uygulamasını takip et"
    ]
  },
  {
    "id": "veteriner_kedi_alt_uriner_sistem_flutd_sonda",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi idrar yapamama flutd",
      "kedi üretra tıkanıklığı sonda",
      "kedi mesane delinmesi sistosentez",
      "struvit taş üriner mama"
    ],
    "baslik": "Kedi FLUTD / Üretra Tıkanıklığı: Acil Üriner Kateterizasyon & Lavaj",
    "ikon": "🐈",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Acil Klinik Müdahale",
    "akilliFisilti": "🩺 24 saatten uzun süren idrar tıkanıklığı hiperkalemi ve üremiye yol açar; sedasyon altında tomcat sonda takılır.",
    "oncedenYapilacaklar": [
      "Abdominal palpasyonda taş sertliğinde büyümüş mesaneyi kontrol et ve acil biyokimyada potasyum/kreatinin seviyelerine bak",
      "Hafif sedasyon altında steril Tomcat/Slippery-Sam kateter ile üretral tıkacı (Mukus/Struvit) ılık steril SF ile yıkayarak aç",
      "Kateteri prepusyuma sütüre ederek kapalı idrar toplama torbasına bağla ve idrar çıkış debisini izle",
      "Mesane spazmını önlemek için prazosin/NSAID tedavisi başla ve idrar pH’ını 6.2-6.5 tutacak üriner diyete geçir"
    ]
  },
  {
    "id": "veteriner_ortopedi_capraz_bag_tplo_ve_ronken",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "köpek ön çapraz bağ kopması tplo",
      "çekmece testi ortopedi kranial",
      "tibial plato açısı tpa",
      "veteriner ortopedik kilitli plak"
    ],
    "baslik": "Ortopedi: Ön Çapraz Bağ (Cranial Cruciate) Kopması & TPLO Cerrahisi",
    "ikon": "🦮",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Sedasyon / Cerrahi Planlama",
    "akilliFisilti": "🩺 Pozitif Kranial Çekmece ve Tibial Kompresyon testi tanıyı koydurur; TPLO ile plato açısı 5-6 dereceye indirilir.",
    "oncedenYapilacaklar": [
      "Hasta sedasyonunda diz eklemine Kranial Çekmece (Drawer Test) ve Tibial İtme testi uygulayarak instabiliteyi doğrula",
      "90 derece fleksiyonda hassas diz röntgeni çekerek Tibial Plato Açısını (TPA) dijital ortopedik cetvelle ölç",
      "Kemik osteotomisi için uygun açılı dairesel testere bıçağı ve kilitli TPLO titanyum anatomik plağını hazırla",
      "Post-op 8 hafta kafes istirahati ve eklem takviyesi (Kondroitin / Glukozamin / Hyaluronik Asit) protokolünü başlat"
    ]
  },
  {
    "id": "veteriner_kanatli_kumes_newcastle_ve_gumboro_asi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "broiler aşı programı içme suyu",
      "newcastle yalancı veba aşısı",
      "gumboro ıbd antikor titresi",
      "kümes biyogüvenlik klorlama"
    ],
    "baslik": "Broiler / Yumurtacı Sürüsü: Newcastle & Gumboro İçme Suyu Aşılaması",
    "ikon": "🐔",
    "renk": "#EDE9FE",
    "varsayilanZaman": "10. ve 18. Gün Sabah Erken Saat",
    "akilliFisilti": "🩺 Aşı virüsünün ölmemesi için içme suyu hattındaki klor sıfırlanmalı, aşıya mavi boya ve yağsız süt tozu katılmalıdır.",
    "oncedenYapilacaklar": [
      "Aşılamadan 2-3 saat önce kümes suluklarını kaldırarak sürüde kontrollü susama sağla",
      "Ana su deposundaki klorlama cihazını kapat ve klor giderici mavi aşı stabilizatörü ekle",
      "Canlı Newcastle (LaSota/Clone 30) ve Gumboro (IBD) aşı flakonlarını su altında açarak homojen karıştır",
      "Aşılamadan 45 dakika sonra rastgele 50 tavuğun dil ve kursağını kontrol ederek aşı boyasının yayılım yüzdesini (%95+) teyit et"
    ]
  },
  {
    "id": "eczacilik_its_karekod_deaktivasyon_ve_medula_fatura",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "its karekod bildirimi iptal",
      "medula reçete sonlandırma döküm",
      "its mal alım satış bildirimi",
      "sgk fatura teslimi her ayın 15i"
    ],
    "baslik": "İTS Karekod Doğrulama & Medula SGK Aylık Fatura Teslimi",
    "ikon": "💊",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Her Ayın 1-15 Arası / Günlük Satış",
    "akilliFisilti": "💊 Reçeteli ilaçlar İTS (İlaç Takip Sistemi) üzerinden anında satıldı bildirimi yapılır; aylık döküm SGK’ya teslim edilir.",
    "oncedenYapilacaklar": [
      "Optik karekod okuyucu ile GTIN, Seri No, Son Kullanma ve Parti No bilgilerini İTS sistemine ilet",
      "Medula Eczane provizyon ekranında dozaj, rapor teşhis kodu ve doktor e-imza geçerliliğini denetle",
      "Ay sonu SGK A-B-C grubu ve Kan Ürünü reçete döküm listelerini sistemden alıp faturalandır",
      "Reçete poşetlerini klasörleyerek her ayın 15’ine kadar ilgili SGK Sağlık Sosyal Güvenlik Merkezine teslim et"
    ]
  },
  {
    "id": "eczacilik_majistral_recete_havan_ve_alkol_hesabi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "majistral ilaç yapımı havan",
      "salisilik asit vazelin pomad",
      "majistral alkol seyreltme hesabı",
      "majistral kırmızı beyaz etiket"
    ],
    "baslik": "Majistral Formülasyon: Salisilik Asitli Pomad & Alkol Seyreltme",
    "ikon": "⚗️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Reçete Kabul / Laboratuvar Hazırlığı",
    "akilliFisilti": "💊 Majistral preparatlarda dahilen kullanılacaklar Beyaz Etiket, haricen kullanılacaklar Kırmızı Etiket ile etiketlenir.",
    "oncedenYapilacaklar": [
      "Hassas terazi (0.001g) kalibrasyonunu dara alarak doğrula ve reçetedeki etken maddeyi (Örn: Salisilik Asit) tart",
      "Toz maddeyi porselen havanda sıvı parafin ile ıslatıp mikronize ezerek vazelin bazı ile homojen karıştır",
      "Alkol seyreltmelerinde Gay-Lussac tablosu ve Gay-Lussac piknometresi ile %96’lık etil alkolü istenen dereceye düşür",
      "Majistral kayıt defterine kayıt numarasını, doktor adını ve saklama koşullarını işleyip ambalajı mühürle"
    ]
  },
  {
    "id": "eczacilik_soguk_zincir_isi_nem_takip_ve_kalibrasyon",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "eczane buzdolabı 2-8 derece alarm",
      "soğuk zincir aşı takip sistemi ats",
      "sıcaklık nem takip cihazı kalibrasyonu",
      "insülin soğuk zincir kırılması"
    ],
    "baslik": "Soğuk Zincir Yönetimi (2-8°C) & TİTCK Sıcaklık/Nem Kayıt Protokolü",
    "ikon": "❄️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Günde 2 Kez (Sabah 09:00 - Akşam 18:00)",
    "akilliFisilti": "💊 İlaç buzdolabı 2°C - 8°C, eczane ortamı maksimum 25°C ve nem %60 sınırında tutulmalı, veriler 1 yıl saklanmalıdır.",
    "oncedenYapilacaklar": [
      "Buzdolabı içi dijital kalibreli termometre ve ATS (Aşı Takip Sistemi) veri kaydedicisinin min/max değerlerini oku",
      "Sıcaklık 2°C altına veya 8°C üstüne çıktığında SMS/Sesli alarm sisteminin çalıştığını test et",
      "Gelen soğuk zincir kolisindeki termal indikatör etiketini ve buz aküsü durumunu teslim anında kontrol et",
      "Buzdolabı sıcaklık kayıt çizelgesini sabah ve akşam mesai saatlerinde ıslak imzalı onay defterine işle"
    ]
  },
  {
    "id": "eczacilik_kirmizi_yesil_recete_ve_renkli_recete_sistemi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "renkli reçete sistemi rrs uyuşturucu",
      "kırmızı reçete morfin fentanil",
      "yeşil reçete benzodiazepin xanax",
      "kontrole tabi ilaç çelik kasa"
    ],
    "baslik": "TİTCK Renkli Reçete Sistemi (RRS) & Uyuşturucu/Psikotrop İlaç Sayımı",
    "ikon": "🚨",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Haftalık / Aylık Kasa Mutabakatı",
    "akilliFisilti": "💊 Kırmızı ve Yeşil reçeteli ilaçlar kilitli çelik kasada saklanır; fiziki stok ile RRS sistem stoku birebir eşit olmalıdır.",
    "oncedenYapilacaklar": [
      "Kırmızı/Yeşil reçete girişini TİTCK Renkli Reçete Sistemi üzerinden hasta T.C. kimlik ve doktor e-imzası ile onayla",
      "İlacı teslim alan 1. derece yakınının veya vasisinin kimlik bilgilerini ve ıslak imzasını reçete arkasına kaydet",
      "Çelik kasadaki narkotik ve psikotrop ampul/tabletleri tek tek sayarak Uyuşturucu Madde Kayıt Defteri ile mutabakat yap",
      "Zayi, kırılma veya süresi dolan kontrole tabi ilaçlar için İlçe Sağlık Müdürlüğü Eczacılık Birimine imha tutanağı bildir"
    ]
  },
  {
    "id": "eczacilik_ilac_etkilesimi_ve_kontrendikasyon_uyarisi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "varfarin k vitamini etkileşimi",
      "greyfurt suyu statin cyp3a4",
      "ssri maoi serotonin sendromu",
      "ilaç besin etkileşim danışmanlığı"
    ],
    "baslik": "Klinik Eczacılık: CYP450 İlaç-İlaç & İlaç-Besin Etkileşim Taraması",
    "ikon": "🩺",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İlaç Teslim / Danışmanlık Anı",
    "akilliFisilti": "💊 Varfarin kullanan hastalarda K vitamini ve NSAID grubu ağrı kesiciler kanama riskini ölümcül düzeyde artırır.",
    "oncedenYapilacaklar": [
      "Hastanın kullandığı tüm reçeteli ve OTC (Tezgah üstü) takviyeleri eczane yazılımında çapraz etkileşim taramasına sok",
      "Statin kullanan hastayı greyfurt suyu tüketmemesi (CYP3A4 inhibisyonu ve rabdomiyoliz riski) konusunda uyar",
      "Demir preparatı alan hastaya süt, çay ve antasit ilaçlarla arasında en az 2 saat süre bırakmasını tembihle",
      "Etiket üzerine büyük harflerle kullanım zamanı (Aç/Tok/Gece) ve saklama koşulu piktogramlarını yapıştır"
    ]
  },
  {
    "id": "saglik_diyabetik_ketoasidoz_dka_protokolu",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "diyabetik ketoasidoz dka protokolü",
      "kan gazı anyon açığı dka",
      "kristalize insülin infüzyonu 0.1 ünite",
      "potasyum takibi dka",
      "serum keton glukoz izlem"
    ],
    "baslik": "Diyabetik Ketoasidoz (DKA) Yönetimi, Sıvı Rehidrasyonu & İnsülin İnfüzyonu",
    "ikon": "🩺",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Acil Giriş / Yoğun Bakım",
    "akilliFisilti": "🩺 Potasyum düzeyi 3.3 mEq/L altına düşerse insülin infüzyonu derhal durdurulmalı; önce potasyum replasmanı yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Kan gazı (pH < 7.30, HCO3 < 18), kan şekeri (>250 mg/dL) ve idrar/serum keton değerini tespit et",
      "İlk 1 saatte 1000-1500 mL %0.9 NaCl (İzotonik) ile agresif sıvı rehidrasyonu başlat",
      "Serum potasyumu > 3.3 mEq/L ise 0.1 IU/kg/saat Kristalize İnsülin IV infüzyonuna geç",
      "Kan şekeri 200-250 mg/dL seviyesine indiğinde hipoglisemiyi önlemek için sıvıya %5 Dekstroz ekle"
    ]
  },
  {
    "id": "saglik_trombolitik_tedavi_rtpa_akut_inme",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "rtpa trombolitik tedavi akut inme",
      "kapı iğne zamanı 4.5 saat",
      "nihss skoru akut iskemik inme",
      "beyin bt hemoraji ekarte",
      "alteplaz 0.9 mg kg"
    ],
    "baslik": "Akut İskemik İnme IV Trombolitik (rtPA - Alteplaz) Protokolü (İlk 4.5 Saat)",
    "ikon": "🧠",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Acil İnme Kırmızı Alan",
    "akilliFisilti": "🧠 Semptom başlangıcından itibaren ilk 4.5 saat altın penceredir; kapı-iğne (door-to-needle) süresi 60 dakikanın altında olmalıdır.",
    "oncedenYapilacaklar": [
      "Hızlı kontrastsız Beyin BT ile intrakraniyal hemoraji ve geniş enfarkt bulgularını ekarte et",
      "NIHSS (National Institutes of Health Stroke Scale) nörolojik skorlamasını yap",
      "Tansiyonu 185/110 mmHg altına düşür; kan şekeri ve trombosit sayısını doğrula",
      "0.9 mg/kg Alteplaz dozunun %10’unu 1 dakikada IV bolus, kalan %90’ını 60 dakikada IV infüze et"
    ]
  },
  {
    "id": "saglik_postoperatif_multimodal_analjezi_ve_nrs",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "postoperatif multimodal analjezi",
      "hasta kontrollü analjezi hka pca",
      "nrs ağrı skalası post-op",
      "parasetamol nsaid tramadol kombinasyon",
      "opioid yan etki izlem"
    ],
    "baslik": "Postoperatif Multimodal Analjezi Protokolü & Hasta Kontrollü Analjezi (HKA/PCA)",
    "ikon": "💊",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Post-Op 0-48 Saat İzlem",
    "akilliFisilti": "💊 Multimodal analjezi ile opioid tüketimi azaltılır; sedasyon skoru ve solunum sayısı saatlik takip edilmelidir.",
    "oncedenYapilacaklar": [
      "Hastanın NRS (0-10) sayısal ağrı skorunu ve Ramsay sedasyon seviyesini değerlendir",
      "Bazal IV Parasetamol (1g/6s) + NSAID (kontrendikasyon yoksa) protokolünü başlat",
      "Orta-şiddetli ağrıda HKA (PCA) cihazını kilit süresi (Lockout time: 8-10 dk) ile ayarla",
      "Solunum depresyonu riski için Nalokson ampulü acil çekmecede hazır bulundur"
    ]
  },
  {
    "id": "saglik_kemoterapi_ekstravazasyonu_ve_antidot",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "kemoterapi ekstravazasyonu protokolü",
      "vezikan ilaç doku nekrozu",
      "antrasiklin dmsi soğuk uygulama",
      "vinka alkaloid sıcak uygulama hyaluronidaz",
      "damar yolu sızıntı onkoloji"
    ],
    "baslik": "Vezikan Kemoterapötik Ekstravazasyonu Acil Müdahale & Antidot Yönetimi",
    "ikon": "💉",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İnfüzyon Sırası Acil",
    "akilliFisilti": "💉 İnfüzyon anında yanma/şişlik görülürse infüzyon derhal durdurulur; iğne çekilmeden aspire edilip spesifik antidot uygulanır.",
    "oncedenYapilacaklar": [
      "İnfüzyonu derhal durdur, iğneyi çıkarmadan 3-5 mL kan/ilaç aspire et",
      "İlacın türünü belirle: Antrasiklin ise Soğuk Uygulama + Deksrazoksan/DMSO uygula",
      "Vinka Alkaloidi ise Sıcak Uygulama + Hyaluronidaz SC enjekte et (Asla soğuk uygulama yapma)",
      "Ekstravazasyon bölgesini steril işaretle, ekstremiteyi eleve et ve onkoloji vaka tutanağı tut"
    ]
  },
  {
    "id": "saglik_ventilator_iliskili_pnomoni_vapsepsis_paketi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "ventilatör ilişkili pnömoni vip paketi",
      "yatak başı 30-45 derece elevasyon",
      "klorheksidin ağız bakımı entübe",
      "kaf basıncı 20-30 cmh2o",
      "subglottik sekresyon aspirasyonu"
    ],
    "baslik": "Yoğun Bakım Ventilatör İlişkili Pnömoni (VİP) Önleme Paketi (Care Bundle)",
    "ikon": "🫁",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Vardiya Başı / 4 Saatte Bir",
    "akilliFisilti": "🫁 Entübe hastalarda VİP insidansını düşürmek için yatak başı açısı minimum 30-45° tutulmalı ve kaf basıncı 20-30 cmH2O arasında kalmalıdır.",
    "oncedenYapilacaklar": [
      "Hasta yatak başını 30°-45° dik açıya getir (Aspirasyon pnömonisini önleme)",
      "Manometre ile endotrakeal tüp kaf basıncını ölç ve 20-30 cmH2O aralığında sabitle",
      "%0.12-0.20 Klorheksidin solüsyonu ile 8 saatte bir oral dekontaminasyon sağla",
      "Günlük sedasyon tatili uygula ve spontan solunum denemesi (SBT) kriterlerini değerlendir"
    ]
  },
  {
    "id": "veteriner_tplo_ve_capraz_bag_cerrahisi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "tplo ameliyatı köpek çapraz bağ",
      "tibial plateau leveling osteotomy",
      "tibial plato açısı ölçümü tpa",
      "pre-op sefazolin antibiyotik",
      "tplo kilitli kemik plağı"
    ],
    "baslik": "Ortopedik Cerrahi: TPLO (Tibial Plateau Leveling Osteotomy) & Kilitli Titanyum Plak",
    "ikon": "🐕",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Pre-Op Planlama / Operasyon",
    "akilliFisilti": "🐕 TPLO cerrahisinde amaç Tibial Plato Açısını (TPA) 5-6.5 dereceye indirerek ön çapraz bağ üzerindeki kraniyal itme kuvvetini sıfırlamaktır.",
    "oncedenYapilacaklar": [
      "Mediolateral ve kraniyokaudal dijital röntgen çekerek pre-operatif Tibial Plato Açısını (TPA) hesapla",
      "İnsizyondan 30 dakika önce IV Sefazolin (22 mg/kg) profilaktik antibiyotik uygula",
      "Radyal testere ile osteotomi hattını açıp kilitli TPLO titanyum kompresyon plağını vidala",
      "Post-op kontrol grafisi ile kemik hattını ve vida tutunmasını doğrula; 8 hafta kafes istirahati planla"
    ]
  },
  {
    "id": "veteriner_kedi_alt_uriner_sistem_flutd_uretral_obstruksiyon",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi flutd üretral tıkanıklık acil",
      "kedi idrar sondası takılması tomcat",
      "potasyum kardiyotoksisite kedi",
      "idrar sedimenti struvit kristali",
      "retrograd ürohidropropülsiyon"
    ],
    "baslik": "Feline Alt Üriner Sistem Hastalığı (FLUTD): Tıkalı Kedi, Sonda & Ürohidropropülsiyon",
    "ikon": "🐈",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Acil Giriş / Sondalama",
    "akilliFisilti": "🐈 Tıkalı kedilerde hiperkalemi kardiyotoksiktir; EKG’de sivri T dalgaları ve bradikardi varsa sedasyon öncesi Kalsiyum Glukonat verilmelidir.",
    "oncedenYapilacaklar": [
      "Mesane palpasyonunda sert distansiyon tespitinde serum potasyum ve kreatinin/üre seviyesini ölç",
      "Kardiyotoksisiteyi önlemek için IV sıvı sağaltımını başlat (%0.9 NaCl)",
      "Hafif sedasyon altında steril Tomcat kateter ve ılık steril salin ile retrograd hidropropülsiyon yaparak tıkacı aç",
      "Kapalı drenaj torbası bağlayarak idrar sedimentinde struvit/okzalat kristali analizi yap"
    ]
  },
  {
    "id": "veteriner_sigir_abomazum_deplasmani_lda_ve_rda",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "sığır abomazum deplasmanı lda rda",
      "sol abomazum deplasmanı ping sesi",
      "abomazopeksi omentopeksi ameliyatı",
      "ketozis ve hipokalsemi doğum sonrası",
      "trokar perkütan abomazopeksi"
    ],
    "baslik": "Sığır Hekimliği: Sol/Sağ Abomazum Deplasmanı (LDA/RDA) & Omentopeksi Cerrahisi",
    "ikon": "🐄",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Laktasyon Başı / Teşhis Anı",
    "akilliFisilti": "🐄 Sol açlık çukurluğunda 9-12. kaburgalar arasında oskültasyon-perküsyon ile metalik çınlama (Ping sesi) abomazum deplasmanının kesin tanısıdır.",
    "oncedenYapilacaklar": [
      "Stetoskop ve parmak perküsyonu ile sol/sağ abdominal duvarda gaz birikim sesini (Ping) haritalandır",
      "Kan/idrar keton çubuğu ile sekonder Ketozis ve Hipokalsemi tablosunu tespit et",
      "Sağ fossa paralumbalis insizyonu ile laparotomi yaparak omentopeksi veya abomazopeksi dikişi koy",
      "Post-op dönemde elektrolit dengesi için IV Kalsiyum, Dekstroz ve rumen güçlendirici maya ver"
    ]
  },
  {
    "id": "veteriner_kopek_parvoviral_enterit_kanli_ishal",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "köpek parvoviral enterit kanlı ishal",
      "parvo hızlı antijen test kiti",
      "agresif iv sıvı izotonik potasyum",
      "maropitant antiemetik cerenia",
      "lökopeni sepsis parvovirüs izole"
    ],
    "baslik": "Enfeksiyöz Hastalıklar: Köpek Parvoviral Enterit (Kanlı İshal) Yoğun Bakım Protokolü",
    "ikon": "🐕",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İzolasyon Kliniği / Acil",
    "akilliFisilti": "🐕 Parvovirüslü yavrularda mortalitenin ana sebebi dehidrasyon ve sepsistir; oral besleme kesilmeli, agresif IV kristaloid sıvı ve antiemetik başlanmalıdır.",
    "oncedenYapilacaklar": [
      "Fekal hızlı antijen kiti ile CPV-2 pozitifliğini teyit et ve hastayı negatif basınçlı izolasyon kabinine al",
      "Hemogramda lökopeni (<3000 WBC) ve hipoglisemi/hipokalemi kontrolü yap",
      "IV damar yolu açarak Ringer Laktat + %5 Dekstroz + KCl infüzyonunu saatlik sıvı ihtiyacına göre bağla",
      "Maropitant (Cerenia) antiemetik ve geniş spektrumlu bakteriyel translokasyon önleyici antibiyoterapiyi uygula"
    ]
  },
  {
    "id": "veteriner_at_kolik_sancisi_nazogastrik_sonda",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "at kolik sancısı teşhis",
      "nazogastrik sonda mide yıkama at",
      "rektal muayene bağırsak torsiyonu",
      "flunixin meglumine analjezi",
      "at bağırsak sesleri oskültasyon"
    ],
    "baslik": "At Hekimliği: Akut Kolik (Sancı) Yönetimi, Nazogastrik Sonda & Rektal Muayene",
    "ikon": "🐎",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Acil Vaka Müdahalesi",
    "akilliFisilti": "🐎 Atlar kusamaz; midede gaz ve sıvı birikimi mide rüptürüne (yırtılmasına) yol açabileceğinden ilk adım Nazogastrik Sonda ile mide dekompresyonudur.",
    "oncedenYapilacaklar": [
      "Kalp frekansını (>60 atım/dk ise cerrahi şüphe), mukozaları ve bağırsak peristaltik seslerini (4 kadranda) değerlendir",
      "Nazogastrik sondayı burundan mideye kadar ilerleterek gaz ve mide sıvısı geri gelişini (reflux) tahliye et",
      "Rektal muayene ile çekum gazı, kalın bağırsak yer değiştirmesi veya impaksiyon varlığını palpe et",
      "Ağrı kontrolü için Flunixin Meglumine (NSAID) uygula; medikal tedaviye yanıt vermeyen durumlarda acil laparotomiye sevk et"
    ]
  },
  {
    "id": "eczacilik_its_karekod_deaktivasyon_ve_mal_alim",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "its karekod bildirimi mal alım",
      "ilaç takip sistemi deaktivasyon",
      "karekod satış bildirimi sgk medula",
      "its sahte ilaç doğrulaması",
      "eczane karekod okuyucu 2d"
    ],
    "baslik": "İlaç Takip Sistemi (İTS): 2D Karekod Doğrulama, Mal Alım & SGK Deaktivasyon",
    "ikon": "💊",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Fatura Kabul / Reçete Teslim",
    "akilliFisilti": "💊 Depodan gelen tüm ilaçların GTIN, Seri No, Son Kullanma Tarihi ve Parti No karekod üzerinden İTS mal alım bildirimiyle sisteme işlenmelidir.",
    "oncedenYapilacaklar": [
      "Depo e-faturası ile gelen ilaç kolilerini 2D optik karekod okuyucu ile taratarak İTS Mal Alım Onayı ver",
      "Medula eczane provizyon sistemi üzerinden reçete girişi yapıldığında İTS Satış Bildirimi deaktivasyonunu sağla",
      "Sistemde \"Karekod bulunamadı\" veya \"Bu ürün daha önce satılmış\" uyarısı veren şüpheli kutuları karantinaya al",
      "Miadı dolan veya hasarlı ilaçların İTS üzerinden Zayi/İade bildirimini TİTCK mevzuatına göre yap"
    ]
  },
  {
    "id": "eczacilik_majistral_formulasyon_ve_laboratuvar",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "majistral ilaç yapımı formül",
      "majistral laboratuvar defteri kayıt",
      "hassas terazi 0.001g kalibrasyon",
      "havan porselen cam merhem hazırlama",
      "majistral etiket kırmızı beyaz"
    ],
    "baslik": "Majistral İlaç Hazırlama: Hassas Terazi Kalibrasyonu, Havan & Majistral Defter Kaydı",
    "ikon": "🧪",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Majistral Reçete / İmalat",
    "akilliFisilti": "🧪 Majistral preparatlarda dahilen kullanılacak ilaçlara beyaz zeminli, haricen kullanılacak ilaçlara kırmızı zeminli etiket yapıştırılmalıdır.",
    "oncedenYapilacaklar": [
      "0.001g hassasiyetli elektronik terazinin su terazisi ve kalibrasyon ağırlığını kontrol et",
      "Hekim reçetesindeki etken madde ve sıvağ oranlarını (Örn: Salisilik asitli vazelin) hesapla",
      "Porselen havan ve spatül ile geometrik seyreltme yöntemini kullanarak homojen karışım elde et",
      "Hazırlanan preparatı Majistral Deftere sıra numarası, hekim adı, tarih ve formülle kaydet"
    ]
  },
  {
    "id": "eczacilik_kirmizi_yesil_recete_renkli_recete_sistemi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "renkli reçete sistemi rrs titck",
      "kırmızı reçete narkotik teslim",
      "yeşil reçete psikotrop kısıtlama",
      "mor turuncu reçete kan ürünü faktör",
      "kontrole tabi ilaç kilitli dolap"
    ],
    "baslik": "TİTCK Renkli Reçete Sistemi (RRS): Kırmızı/Yeşil Reçete & Kilitli Dolap Sayımı",
    "ikon": "🔐",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Reçete Karşılama / Aylık Sayım",
    "akilliFisilti": "🔐 Narkotik ve psikotrop ilaçlar mutlaka kilitli çelik dolapta saklanmalı; fiziki stok ile RRS sistem stoku her ay sonu birebir mutabakat sağlamalıdır.",
    "oncedenYapilacaklar": [
      "TİTCK Renkli Reçete Sistemine (RRS) hekim e-imzası ile yazılan reçete kodunu gir",
      "İlacı teslim alan kişinin T.C. kimlik numarası ve imzasını teslim tutanağına al",
      "Kırmızı/Yeşil reçeteli ilaçların kilitli dolaptaki fiziki ampul ve tablet sayımını yap",
      "Aylık Renkli Reçete döküm cetvelini İl Sağlık Müdürlüğüne süresinde teslim et"
    ]
  },
  {
    "id": "eczacilik_soguk_zincir_asi_sicaklik_takip_ve_ats",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "aşı dolabı 2-8 derece sıcaklık",
      "ats aşı takip sistemi kalibrasyon",
      "soğuk zincir kırılması durumunda tutanak",
      "data logger sıcaklık kayıt dökümü",
      "insülin ve aşı buz aküsü transfer"
    ],
    "baslik": "Soğuk Zincir Yönetimi: Aşı Dolabı (2-8°C), ATS Cihazı & Sıcaklık Sapma Tutanağı",
    "ikon": "❄️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Sabah / Akşam Isı Kontrolü",
    "akilliFisilti": "❄️ Aşı ve biyolojik ürün dolaplarında sıcaklık +2°C ile +8°C arasında tutulmalı; dolap kapağına asla aşı/insülin konulmamalıdır.",
    "oncedenYapilacaklar": [
      "Aşı Takip Sistemi (ATS) ve Data Logger cihazının sabah-akşam sıcaklık grafiklerini kontrol et",
      "Olası elektrik kesintisine karşı UPS veya jeneratör devreye girme alarmını test et",
      "Hasta teslimatında aşıları ve insülinleri izolasyonlu soğuk zincir poşetine buz aküsü ile yerleştir",
      "Isı sapması durumunda ürünleri derhal karantinaya alıp İl Sağlık Müdürlüğüne formla bildir"
    ]
  },
  {
    "id": "eczacilik_medula_fatura_sonlandirma_ve_kesinti_itiraz",
    "category": "finans",
    "domain": "ECZACILIK",
    "keywords": [
      "medula eczane fatura sonlandırma",
      "sgk reçete teslim zarfı barkod",
      "medula kesinti itiraz dilekçesi",
      "katkı payı ve muayene ücreti mutabakat",
      "eczacı odası reçete onay tevzi"
    ],
    "baslik": "SGK Medula Dönem Sonu Fatura Sonlandırma, Zarf Teslimi & Kesinti İtirazı",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Ayın 1-15 Arası",
    "akilliFisilti": "📑 Dönem sonlandırma yapıldıktan sonra oluşturulan fatura ve eki reçeteler SGK Sağlık Sosyal Güvenlik Merkezine teslim bordrosuyla verilir.",
    "oncedenYapilacaklar": [
      "İlgili aya ait tüm A, B ve C grubu reçetelerin Medula dökümünü alıp fiziksel reçetelerle eşleştir",
      "Muayene ücreti, ilaç fiyat farkı ve katılım payı tutarlarını muhasebe kayıtlarıyla doğrula",
      "Medula sisteminden \"Dönem Sonlandırma\" butonuna basarak e-Fatura oluştur ve SGK portalına yükle",
      "SGK denetiminde kesinti yapılan reçeteler için 15 iş günü içinde İtiraz Komisyonuna dilekçe ver"
    ]
  },
  {
    "id": "saglik_cerrahi_guvenlik_kontrol_listesi_who_timeout",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "who cerrahi güvenlik kontrol listesi ameliyathane",
      "time-out ameliyat öncesi son mola hasta kimliği",
      "sign-in anestezi öncesi taraf doğrulama",
      "sign-out ameliyat sonu gazlı bez alet sayımı",
      "cerrahi alan enfeksiyonu profilaktik antibiyotik 60 dk"
    ],
    "baslik": "WHO Ameliyathane Cerrahi Güvenlik Kontrol Listesi: Sign-in, Time-out & Sign-out Protokolü",
    "ikon": "🩺",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Ameliyathane Giriş / İnsizyon Öncesi",
    "akilliFisilti": "🩺 İnsizyon öncesi tüm ameliyat ekibiyle sesli \"Time-out\" yapılarak hasta adı, cerrahi taraf, işlem ve profilaktik antibiyotik zamanı onaylanmalıdır.",
    "oncedenYapilacaklar": [
      "Sign-in: Hasta kimliği, ameliyat bölgesi işaretlemesi, anestezi güvenlik kontrolü ve pulse oksimetre takibini doğrula",
      "Time-out: Cerrahi kesiden hemen önce tüm ekip sesli olarak hastayı, tarafı ve kritik adımları teyit etsin",
      "İnsizyondan en fazla 60 dakika önce intravenöz profilaktik antibiyotik uygulandığını doğrula",
      "Sign-out: Kapatmadan önce alet, kompres ve iğne sayımının tam olduğunu cerrahi hemşiresiyle tutanağa bağla"
    ]
  },
  {
    "id": "saglik_klinik_kan_transfuzyon_cross_match_ve_reaksiyon",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "kan transfüzyon protokolü cross-match uygunluk",
      "eritrosit süspansiyonu es transfüzyon takip formu",
      "transfüzyon reaksiyonu ateş titreme hemoliz",
      "çift hemşire kimlik ve kan grubu doğrulama",
      "transfüzyon ilk 15 dakika vital bulgu takibi"
    ],
    "baslik": "Güvenli Kan Transfüzyon Protokolü: Cross-Match, Çift Hemşire Doğrulaması & Transfüzyon İzlemi",
    "ikon": "🩸",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Transfüzyon Başlangıcı / İlk 15 Dakika",
    "akilliFisilti": "🩸 Transfüzyon reaksiyonlarının %90'ı ilk 15 dakikada görülür; bu sürede damla hızı yavaş tutulmalı ve vital bulgular 5. ve 15. dakikada kaydedilmelidir.",
    "oncedenYapilacaklar": [
      "Kan torbasındaki ISBT 128 barkodu, hasta kol bandı, dosya numarası ve cross-match raporunu iki yetkili sağlık personeliyle kontrol et",
      "Transfüzyon öncesi başlangıç tansiyon, nabız, ateş ve solunum değerlerini transfüzyon izlem formuna kaydet",
      "İlk 15 dakika transfüzyonu 10-15 damla/dakika hızında başlatıp hastayı titreme, kaşıntı ve göğüs ağrısı yönünden gözlemle",
      "Reaksiyon gelişirse derhal transfüzyonu durdurup damar yolunu %0.9 NaCl ile açık tut ve kan merkezine numune gönder"
    ]
  },
  {
    "id": "saglik_aydinlatilmis_onam_ve_malpraktis_risk_yonetimi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "aydınlatılmış onam formu malpraktis koruma",
      "tıbbi müdahale komplikasyon aydınlatması hekim",
      "hasta hakları yönetmeliği rıza ve onay",
      "acil cerrahi müdahale 2 hekim imzalı tutanak",
      "tereddütlü onam ve tercüman eşliğinde bilgilendirme"
    ],
    "baslik": "Hasta Hakları & Aydınlatılmış Onam: Tıbbi Risk/Komplikasyon Bilgilendirmesi & Malpraktis Kalkanı",
    "ikon": "📋",
    "renk": "#EDE9FE",
    "varsayilanZaman": "İnvaziv Girişim Öncesi (En Az 24 Saat Önce)",
    "akilliFisilti": "📋 Elektif cerrahi girişimlerde aydınlatılmış onam hastaya en az 24 saat önce, kendi ana dilinde, tüm risk ve alternatifleri açıklanarak bizzat hekimce imzalatılmalıdır.",
    "oncedenYapilacaklar": [
      "Girişimin amacı, beklenen faydaları, olası riskleri ve alternatif tedavi seçeneklerini hastanın anlayacağı dille açıkla",
      "Form üzerindeki \"Okudum, anladım, kabul ediyorum\" ifadesinin hastanın kendi el yazısıyla yazıldığını kontrol et",
      "Acil ve şuuru kapalı hastalarda birinci derece vasi veya 2 uzman hekim onaylı Acil Tıbbi Müdahale Tutanağı tanzim et",
      "İmzalı onam formunun bir nüshasını hastaya verip diğer nüshayı resmi hasta dosyasına ve HBYS sistemine arşivle"
    ]
  },
  {
    "id": "saglik_kvc_postop_antikoagulan_inr_ve_heparin_protokolu",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "postop inr takibi kumadin coumadin dozu",
      "heparin infüzyonu aptt takibi 6 saatlik",
      "heparin köprüleme tedavisi lwmh enoksaparin",
      "mekanik kapak protezi hedef inr 2.5 3.5",
      "kanama diyatezi ve antidot protamin sülfat k vitamini"
    ],
    "baslik": "KVC & Cerrahi Postop Antikoagülan Protokolü: INR, aPTT Monitörizasyonu & Heparin Köprüleme",
    "ikon": "💉",
    "renk": "#CCFBF1",
    "varsayilanZaman": "Günlük Sabah 06:00 Kan Alma / Doz Ayarı",
    "akilliFisilti": "💉 Mekanik kalp kapağı olan hastalarda INR hedef aralığı 2.5-3.5 olup, oral antikoagülana geçişte terapötik INR sağlanana kadar Heparin/LMWH köprülemesi sürdürülür.",
    "oncedenYapilacaklar": [
      "Sabah 06:00 bazal INR ve aPTT laboratuvar kan sonucunu HBYS üzerinden doğrula",
      "Hedef INR aralığına göre günlük Warfarin (Kumadin) dozunu order et ve her gün aynı saatte (18:00) verilmesini sağla",
      "IV Heparin infüzyonunda hedef aPTT değerine (kontrolün 1.5 - 2.5 katı) göre infüzyon hızını titre et",
      "Akut majör kanama riski durumunda Protamin Sülfat veya K Vitamini / Taze Donmuş Plazma hazırlığını hazır tut"
    ]
  },
  {
    "id": "saglik_enfeksiyon_surveyans_izolasyon_ve_sterilizasyon",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "hastane enfeksiyon kontrol komitesi surveyansı",
      "temas damlacık solunum izolasyon odası renkli kart",
      "santral venöz kateter enfeksiyonu bundle paketi",
      "otoklav prion programı ve bowie-dick kimyasal indikatör",
      "mrsa vre c difficile temas izolasyonu"
    ],
    "baslik": "Enfeksiyon Kontrol Komitesi (EKK): İzolasyon Kartları, Kateter Bundle & Otoklav İndikatör Takibi",
    "ikon": "🛡️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Günlük Servis Viziti & Sterilizasyon Kapanışı",
    "akilliFisilti": "🛡️ Çoklu ilaca dirençli (MRSA/VRE) üreyen hasta odalarına Kırmızı Temas İzolasyonu kartı asılmalı, önlük ve eldiven izolasyonu eksiksiz uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Laboratuvarda dirençli mikroorganizma üreyen hastalar için HBYS üzerinden otomatik izolasyon bayrağı aç",
      "Hasta odası kapısına uygun izolasyon figürünü (Sarı Yaprak: Solunum, Mavi Çiçek: Damlacık, Kırmızı Yıldız: Temas) as",
      "Santral venöz kateter ve ventilatör ilişkili pnömoni (VİP) günlük bakım bundle kontrol listesini doldur",
      "Merkezi Sterilizasyon Ünitesi (MSÜ) Bowie-Dick test kağıdı ve biyolojik spor indikatör inkübasyon sonuçlarını onayla"
    ]
  },
  {
    "id": "veteriner_buyukbas_kolostrum_ve_yeni_dogan_buzagi_bakimi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "yeni doğan buzağı bakımı göbek kordonu tentürdiyot",
      "kolostrum ağız sütü refraktometre brix 22",
      "buzağı ilk 2 saat içinde 4 litre kolostrum",
      "buzağı septisemi aşısı ve pasif transfer yetersizliği",
      "buzagı kulak küpesi türkvet kayıt sistemi"
    ],
    "baslik": "Büyükbaş Doğum & Buzağı Sağlığı: Brix Kolostrum Testi (>%22), Göbek Kordonu & TÜRKVET",
    "ikon": "🐄",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Doğum Anı / İlk 2 Saat",
    "akilliFisilti": "🐄 Buzağı doğduktan sonraki ilk 2 saat içinde Brix değeri >%22 olan kaliteli kolostrumdan (ağız sütü) en az 4 litre içirilmeli; göbek kordonu %7 tentürdiyotla daldırılmalıdır.",
    "oncedenYapilacaklar": [
      "Doğum sonrası buzağının ağız/burun mukusunu temizleyip solunumunu ve canlılık reflekslerini kontrol et",
      "Göbek kordonunu batikon/%7 tentürdiyot içine daldırarak kordon dezenfeksiyonunu tamamla",
      "Optik Brix refraktometresi ile annenin ağız sütü kalitesini ölç (>%22 Brix yüksek immünoglobulin)",
      "TÜRKVET Hayvan Kayıt Sistemine buzağının doğum tarihini, anne numarasını ve resmi kulak küpesini kaydet"
    ]
  },
  {
    "id": "veteriner_klinik_anestezi_entubasyon_ve_vital_monitor",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "kedi köpek genel anestezi indüksiyon propofol",
      "endotrakeal entübasyon balonlu kaf şişirme",
      "izofluran gaz anestezisi kapnografi etco2",
      "anestezi vital monitör spo2 ekg tansiyon",
      "postop hipotermi ısıtıcı mat ve uyanma takibi"
    ],
    "baslik": "Klinik Cerrahi & Gaz Anestezisi: Endotrakeal Entübasyon, Kapnografi (EtCO2) & Vital İzlem",
    "ikon": "🐾",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Operasyon Öncesi / Cerrahi Süresi",
    "akilliFisilti": "🐾 Gaz anestezisinde endotrakeal tüp kafı tam sızdırmaz şişirilmeli; kapnografide EtCO2 (35-45 mmHg) ve SpO2 (%95 üzeri) anestezi teknisyeniyle izlenmelidir.",
    "oncedenYapilacaklar": [
      "Preanestezi muayenesinde ASA skorunu belirle, kan tablosunu (Hemogram, Biyokimya) incele",
      "IV propofol indüksiyonu sonrası uygun çapta endotrakeal tüp ile laringoskop eşliğinde trakeayı entübe et",
      "İzofluran/Sevofluran gaz anestezisi devresini bağlayıp oksijen akış metresini ve solunum balonunu ayarla",
      "Operasyon boyunca her 5 dakikada bir EKG, tansiyon, EtCO2 ve vücut sıcaklığını anestezi izlem formuna kaydet"
    ]
  },
  {
    "id": "veteriner_kuduz_karma_ve_parazit_asi_takvimi",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "petvet kedi köpek mikroçip kayıt sistemi",
      "kuduz aşısı yasal zorunluluk 5996 sayılı kanun",
      "karma aşı dhppi l kedi karma fvrcp",
      "iç dış parazit uygulaması tablet damla",
      "aşı karnesi soğuk zincir barkod yapıştırma"
    ],
    "baslik": "PETVET Mikroçip & Aşılama: 5996 Sayılı Kanun Kuduz Aşısı, Karma Aşı & Parazit Protokolü",
    "ikon": "💉",
    "renk": "#CCFBF1",
    "varsayilanZaman": "Aşı Randevusu / 8. Hafta Başlangıcı",
    "akilliFisilti": "💉 5996 sayılı Kanun gereği 3 aylık tüm kedi ve köpeklere mikroçip takılması, PETVET sistemine kaydedilmesi ve yıllık kuduz aşısının yapılması yasal zorunluluktur.",
    "oncedenYapilacaklar": [
      "Hastanın sol boyun bölgesine ISO 11784/11785 uyumlu mikroçipi uygulayıp okuyucu ile 15 haneli kodu doğrula",
      "Tarım ve Orman Bakanlığı PETVET sistemine hasta ve sahip bilgilerini eksiksiz kaydet",
      "Soğuk zincirde muhafaza edilen karma ve kuduz aşılarının flakon barkodlarını resmi aşı karnesine yapıştır",
      "Endoparazit ve ektoparazit ilaç uygulamasını yaparak sahibine 3 aylık rutin periyot hatırlatması kur"
    ]
  },
  {
    "id": "veteriner_ciftlik_mastitis_cmt_testi_ve_somatik_hucre",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "süt sığırcılığı subklinik mastitis cmt testi",
      "california mastitis test 4 meme lobu jelimsi",
      "somatik hücre sayısı shs 200 bin sınırı",
      "sağım hijyeni ön daldırma ve son daldırma iyot",
      "antibiyotikli süt tanka katmama süresi arınma"
    ],
    "baslik": "Süt Hijyeni & Mastitis Kontrolü: California Mastitis Testi (CMT), SHS & Sağım Hijyeni",
    "ikon": "🥛",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık CMT Taraması / Sağım Öncesi",
    "akilliFisilti": "🥛 Somatik Hücre Sayısı (SHS) 200.000 üzerine çıktığında subklinik mastitis başlamıştır; CMT testi ile reaksiyon veren meme lobuna intramammar tüp uygulanır.",
    "oncedenYapilacaklar": [
      "CMT paletinin 4 gözüne her meme lobundan ilk sütü sıktıktan sonra eşit miktarda reaktif damlat",
      "Paleti dairesel hareketle çevirerek jel kıvamı (morlaşma/pıhtılaşma) oluşan meme lobunu tespit et",
      "Sağım öncesi köpüklü ön daldırma ve sağım sonrası koruyucu iyotlu son daldırma dezenfektanını uygula",
      "Antibiyotik tedavisi uygulanan ineklerin sütünü arınma süresi (Withdrawal Period) boyunca imha tankına yönlendir"
    ]
  },
  {
    "id": "veteriner_zoonoz_brusella_ve_tuberkuloz_tarama_raporu",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "zoonoz hastalıklar tüberküloz tüberkülin testi",
      "brusella rose bengal ve serum aglütinasyon testi",
      "hastalıktan ari işletme belgesi denetimi",
      "karşılaştırmalı tüberkülin testi deri kalınlığı kumpas",
      "ilçe tarım müdürlüğü ihbarı mecburi hastalık bildirimi"
    ],
    "baslik": "Zoonoz Mücadele: İhbarı Mecburi Brusella Rose-Bengal, Tüberkülin Testi & Ari İşletme",
    "ikon": "🔬",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yıllık Periyodik Zoonoz Taraması",
    "akilliFisilti": "🔬 Brusella ve Tüberküloz ihbarı mecburi zoonoz hastalıklardır; tüberkülin enjeksiyonundan 72 saat sonra kumpasla deri kalınlığı ölçülerek reaksiyon değerlendirilir.",
    "oncedenYapilacaklar": [
      "Sığırların boyun bölgesine Avian ve Bovine tüberkülin antijenlerini intradermal olarak enjekte et",
      "Enjeksiyondan tam 72 saat sonra kalibre kumpas ile enjeksiyon bölgesindeki deri kalınlık artışını (mm) ölç",
      "Brusella taraması için alınan kan serumlarında Rose-Bengal lam aglütinasyon testini uygula",
      "Pozitif çıkan hayvanları derhal karantinaya alıp 24 saat içinde resmi yazıyla İlçe Tarım Müdürlüğüne ihbar et"
    ]
  },
  {
    "id": "eczacilik_sgk_medula_fatura_ve_kesinti_itiraz_komisyonu",
    "category": "finans",
    "domain": "ECZACILIK",
    "keywords": [
      "sgk medula eczane fatura teslimi ayın 15 i",
      "reçete inceleme komisyonu kesinti itiraz dilekçesi",
      "sut sağlık uygulama tebliği katılım payı muafiyet",
      "manuel reçete aslı ve hekim kaşe imza teyidi",
      "e-reçete onay kodu ve medula dönem sonlandırma"
    ],
    "baslik": "SGK Medula Fatura Teslimi: Dönem Sonlandırma, SUT Uygunluk & Kesinti İtiraz Komisyonu",
    "ikon": "📑",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Her Ayın 1-15'i Arası Fatura Teslimi",
    "akilliFisilti": "📑 SGK Medula reçete dönem sonlandırma ve faturalama her ayın 15'ine kadar tamamlanmalı; haksız kesintilere karşı 15 gün içinde İtiraz Komisyonuna başvurulmalıdır.",
    "oncedenYapilacaklar": [
      "Medula sisteminde fatura dönemini sonlandırıp döküm listesindeki reçete sıra numaralarını fiziki kontrol et",
      "Manuel kağıt reçetelerdeki hekim ıslak imza, kaşe, teşhis ve SUT katılım payı muafiyet kodlarını doğrula",
      "SGK e-Faturasını GİB portalı üzerinden düzenleyip zarf barkoduyla birlikte SGK Sağlık Sosyal Güvenlik Merkezine teslim et",
      "SGK tarafından yapılan kesinti bildirimlerine karşı reçete ekleriyle birlikte 15 gün içinde İtiraz Komisyonuna dilekçe ver"
    ]
  },
  {
    "id": "eczacilik_farmakovijilans_ve_advers_etki_sari_kart_tufam",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "tufam türkiye farmakovijilans merkezi bildirim",
      "advers reaksiyon sarı kart advers etki formu",
      "ciddi beklenmeyen ilaç yan etkisi hekim eczacı",
      "ilaç etkileşimi sitokrom p450 cyp enzim inhibisyonu",
      "biyobenzer ilaç ve biyolojik ürün takip formu"
    ],
    "baslik": "TÜFAM Farmakovijilans: Şüpheli Advers Etki (Sarı Kart) Bildirimi & İlaç Etkileşim Analizi",
    "ikon": "⚠️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Advers Etki Bildirildiğinde (En Geç 15 Gün)",
    "akilliFisilti": "⚠️ Ciddi ve beklenmeyen advers ilaç reaksiyonları en geç 15 gün içinde TİTCK TÜFAM Sarı Kart formu doldurularak elektronik ortamda bildirilmelidir.",
    "oncedenYapilacaklar": [
      "Hastada gelişen şüpheli advers reaksiyonun semptomlarını, başlama saatini ve kullanılan tüm eşzamanlı ilaçları kaydet",
      "TİTCK Türkiye Farmakovijilans Merkezi (TÜFAM) \"Advers Etki Bildirim Formunu\" (Sarı Kart) doldur",
      "Reçete kontrolünde Sitokrom P450 (CYP3A4 / CYP2D6) inhibitör/indükleyici ilaç etkileşimlerini analiz et",
      "Hastanın hekimi ile iletişime geçerek ilacın kesilmesi veya alternatif moleküle geçişini koordine et"
    ]
  },
  {
    "id": "eczacilik_sitotoksik_ve_onkoloji_ilac_hazirlama_kabin",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "sitotoksik onkoloji kemoterapi ilaç hazırlama",
      "biyogüvenlik kabini sınıf 2 tip b2 hepa filtre",
      "kapalı sistem ilaç transfer cihazı cstd",
      "kemoterapi dökülme saçılma kiti spill kit",
      "kemoterapi dozu vücut yüzey alanı bsa hesabı"
    ],
    "baslik": "Onkoloji & Klinik Eczacılık: Biyogüvenlik Kabini (Sınıf II B2), CSTD & BSA Doz Hesabı",
    "ikon": "🧪",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Kemoterapi Reçetesi / İlaç Hazırlama",
    "akilliFisilti": "🧪 Sitotoksik ilaçlar %100 dışarı egzozlu Sınıf II Tip B2 Biyogüvenlik Kabininde ve CSTD kapalı transfer aparatıyla hazırlanmalı, BSA (m²) dozu hekimle çift kontrol edilmelidir.",
    "oncedenYapilacaklar": [
      "Hastanın boy ve kilosuna göre Mosteller formülü ile Vücut Yüzey Alanını (BSA - m²) hesapla",
      "Onkolog protokolündeki antineoplastik ilaç dozunu ve infüzyon sıvısı (SF / %5 Dekstroz) geçimliliğini kontrol et",
      "Sınıf II Tip B2 kabinde çift eldiven ve CSTD (Kapalı Sistem Transfer Cihazı) kullanarak ilacı seyrelt",
      "Olası kırılma ve dökülmelere karşı Onkoloji İlaç Saçılma Kitini (Spill Kit) hazırlama odasında hazır bulundur"
    ]
  },
  {
    "id": "eczacilik_hastane_eczanesi_kpi_ve_stok_miad_rotasyonu",
    "category": "finans",
    "domain": "ECZACILIK",
    "keywords": [
      "hastane eczanesi hbys ilaç stok yönetimi",
      "miadı yaklaşan ilaç sarı kırmızı etiket 6 ay",
      "yüksek riskli ilaçlar konsantre elektrolit potasyum",
      "ilaç sarfiyatı otomatik ilaç dağıtım istasyonu pyxis",
      "imhalık ilaç titck il sağlık müdürlüğü tutanağı"
    ],
    "baslik": "Hastane Eczanesi Stok & Güvenlik: Yüksek Riskli İlaçlar, Miad Rotasyonu & İmha Protokolü",
    "ikon": "🏥",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Aylık Eczane Stok & Miad Denetimi",
    "akilliFisilti": "🏥 Yüksek riskli konsantre elektrolitler (KCl %15, NaCl %20) servis dolaplarında kilitli ve kırmızı etiketli olmalı; 6 aydan az kalan ilaçlara sarı miad etiketi yapıştırılmalıdır.",
    "oncedenYapilacaklar": [
      "HBYS üzerinden son kullanma tarihine 3 ve 6 ay kalan ilaçların dökümünü alıp depoda ön sıralara çek",
      "Kliniklerdeki Yüksek Riskli İlaçların (Konsantre elektrolit, Narkotik, Kemoterapötik) kilitli dolaplarını denetle",
      "Görünüşü ve Okunuşu Benzer İlaçları (LASA) ayrı raflara dizip belirgin uyarı etiketleri yapıştır",
      "Miadı dolan ilaçları karantina dolabına alıp İl Sağlık Müdürlüğü komisyonu nezaretinde resmi imha sürecini başlat"
    ]
  },
  {
    "id": "eczacilik_biyobenzer_ve_soguk_zincir_biyoteknolojik_ilac",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "biyoteknolojik ilaç monoklonal antikor mab saklama",
      "biyobenzer ilaç değişimi otomatik ikame kısıtı",
      "soğuk zincir 2-8 derece çalkalamama uyarısı köpürme",
      "enjektör kalem subkutan uygulama hasta eğitimi",
      "ats sıcaklık takip sensörü kayıt dökümü"
    ],
    "baslik": "Biyoteknolojik & Biyobenzer İlaçlar: Monoklonal Antikor Saklama, 2-8°C & Hasta Eğitimi",
    "ikon": "🧬",
    "renk": "#CCFBF1",
    "varsayilanZaman": "İlaç Teslimi / Hasta Danışmanlığı",
    "akilliFisilti": "🧬 Biyolojik ürünler (Monoklonal Antikorlar, İnsülinler) asla dondurulmamalı ve çalkalanmamalıdır (protein yapısı bozulur); 2-8°C soğuk zincir çantasıyla teslim edilmelidir.",
    "oncedenYapilacaklar": [
      "Biyoteknolojik ilacı soğuk akülü termal taşıma çantası içinde ısı takip kartı ile birlikte hazırla",
      "Hastaya ilacın buzdolabının kapağında değil orta rafında 2-8°C'de saklanması gerektiğini açıkla",
      "Subkutan enjeksiyon öncesi ilacın oda sıcaklığına gelmesi için 15-20 dakika beklenmesini tembihle",
      "Flakonun asla çalkalanmaması, köpürtülmemesi ve berraklığının bozulması halinde kullanılmaması uyarısını yap"
    ]
  },
  {
    "id": "saglik_malpraktis_komplikasyon_ayrimi_ve_aydinlatilmis_onam",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "aydınlatılmış onam formu malpraktis dava savunması",
      "tıbbi komplikasyon ve tıbbi uygulama hatası ayrımı",
      "sağlık bakanlığı mesleki sorumluluk kurulu msk",
      "ameliyat öncesi bilgilendirilmiş rıza belgesi ıslak imza",
      "epikriz ameliyat notu ve hasta dosyası arşivi saklama"
    ],
    "baslik": "Klinik Hukuk & Malpraktis: Aydınlatılmış Onam, Komplikasyon Yönetimi & MSK Savunması",
    "ikon": "🩺",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Cerrahi/Girişim Öncesi & Hukuki Talep Halinde",
    "akilliFisilti": "🩺 Aydınlatılmış onam formunda girişimin tüm riskleri, alternatifleri ve komplikasyonları hastaya anlatılarak imzalatılmalı; ameliyat notu detaylı tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Hastanın kendi el yazısıyla \"Okudum, anladım, kabul ediyorum\" ibaresini içeren cerrahi onam formunu hasta dosyasına ekle",
      "Operasyon sırasında gelişen beklenmeyen anatomik varyasyon veya komplikasyonları ameliyat raporuna (epikriz) saat ve teknikle işle",
      "Mesleki Sorumluluk Kuruluna (MSK) sunulmak üzere kılavuzlara uygun tıbbi endikasyon ve konsültasyon belgelerini derle",
      "Zorunlu Hekim Mesleki Sorumluluk Sigortası poliçe süresini ve ihbar bildirimini teyit et"
    ]
  },
  {
    "id": "saglik_organ_nakli_ve_beyin_olumu_donor_protokolu",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "beyin ölümü tespit kurulu 4 hekim imzası",
      "apne testi beyin anjiyografisi eeg teyidi",
      "organ bağışı donör bakım protokolü ulusal koordinasyon",
      "yoğun bakım hemodinamik stabilite organ perfüzyonu",
      "organ nakli koordinatörü aile görüşmesi ve rıza tutanağı"
    ],
    "baslik": "Yoğun Bakım & Organ Nakli: Beyin Ölümü Kurulu (4 Hekim), Apne Testi & Donör Bakımı",
    "ikon": "🫀",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Beyin Ölümü Şüphesi / Donör Bildirimi",
    "akilliFisilti": "🫀 Beyin ölümü; Nörolog, Beyin Cerrahı, Anesteziyolog ve Kardiyolog/Yoğun Bakım uzmanı 4 hekim kurulu tarafından klinik testler ve apne testiyle oybirliğiyle tespit edilir.",
    "oncedenYapilacaklar": [
      "GKS 3 ve beyin sapı refleksleri kaybolan hastada normotermi ve normotansiyon sağlayarak resmi Apne Testini uygula",
      "Gerektiğinde yardımcı konfirmasyon testini (BT Anjiyografi, Transkraniyal Doppler veya Sintigrafi) tamamla",
      "4 uzman hekim imzalı resmi Beyin Ölümü Bildirim Tutanağını Sağlık Bakanlığı UKM (Ulusal Koordinasyon Merkezi) portalına gir",
      "Donör adayı için organ perfüzyonunu korumak amacıyla MAP > 65 mmHg, idrar çıkışı > 1 ml/kg/saat ve hormon replasmanını yönet"
    ]
  },
  {
    "id": "saglik_yenidogan_yogun_bakim_apgar_ve_surfaktan_tedavisi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "yenidoğan canlandırma programı nrp apgar skoru",
      "respiratuar distres sendromu rds surfaktan uygulaması",
      "küvöz ısısı hipotermi yönetimi ve tünel hattı umbilikal kateter",
      "prematüre retinopatisi rop muayenesi ve kan gazı hedefi",
      "yenidoğan sarılığı fototerapi ve exchange transfüzyon eğrisi"
    ],
    "baslik": "Neonatoloji & YYBÜ: NRP Canlandırma, APGAR Skoru, RDS Sürfaktan & Umbilikal Kateter",
    "ikon": "👶",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Doğum Anı & Yenidoğan Yoğun Bakım Takibi",
    "akilliFisilti": "👶 1. ve 5. dakika APGAR skorlaması yapılmalı; RDS tanılı prematüre bebeğe ilk 2 saat içinde LISA/InSurE tekniğiyle trakeal sürfaktan verilmelidir.",
    "oncedenYapilacaklar": [
      "Doğum salonunda NRP kılavuzuna göre radyant ısıtıcı altında kurulama, pozisyon verme ve SpO2 hedefleriyle canlandırmayı başlat",
      "Preterm bebekte RDS tablosunda CPAP altında LISA (Less Invasive Surfactant Administration) ile intratrakeal sürfaktan uygula",
      "Umbilikal ven ve arter kateterizasyonunu steril şartlarda açarak invaziv kan basıncı ve parenteral beslenme hattını kur",
      "Hedef oksijen saturasyonunu (%90-94) koruyarak hiperoksik ROP (Retinopati) ve hipoksik hasar riskini monitörize et"
    ]
  },
  {
    "id": "saglik_kvc_koroner_bypass_cabg_ve_ecmo_yonetimi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "koroner arter bypass greft cabg ameliyatı",
      "ekstrakorporeal membran oksijenasyonu ecmo kanülasyonu",
      "kardiyopulmoner bypass pompası kpb heparin akt",
      "akt aktif pıhtılaşma zamanı protamin sülfat nötralizasyonu",
      "kvc yoğun bakım mediastinal drenaj kanama takibi"
    ],
    "baslik": "KVC & Kalp Cerrahisi: CABG, Kardiyopulmoner Bypass, ACT Heparinizasyon & ECMO",
    "ikon": "🫁",
    "renk": "#EDE9FE",
    "varsayilanZaman": "KVC Operasyonu & Ameliyat Sonrası Yoğun Bakım",
    "akilliFisilti": "🫁 Kardiyopulmoner Bypass girişinde ACT > 480 saniye tutulmalı; post-op dönemde mediastinal drenaj saatte > 200 ml olursa revizyon kanama değerlendirilmelidir.",
    "oncedenYapilacaklar": [
      "Pompa öncesi 300-400 IU/kg Heparin uygulayıp ACT (Aktif Pıhtılaşma Zamanı) değerinin 480 sn üzerinde olduğunu doğrula",
      "Sol internal torasik arter (LIMA) ve safen ven grefti distal/proksimal anastomozlarını tamamla",
      "Pompaya son verirken Protamin Sülfat ile heparini 1:1 titre ederek ACT'yi bazal seviyeye indir",
      "Dirençli kardiyojenik şok veya ARDS durumunda Veno-Arteriyel (VA) veya Veno-Venöz (VV) ECMO devresini devreye al"
    ]
  },
  {
    "id": "saglik_inme_trombolitik_rtpa_ve_trombektomi_kapi_igne_zamani",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "akut iskemik inme kapı iğne zamanı 4 5 saat",
      "intravenöz rt-pa alteplaz trombolitik tedavi",
      "mekanik trombektomi anjiyo soliter stent anjiyografi",
      "nihss inme ölçeği skoru ve difüzyon mr penumbra",
      "serebral kanama riski tansiyon hedefi 185 110 mmhg"
    ],
    "baslik": "Nöroloji & İnme: 4.5 Saatlik Trombolitik (rt-PA), NIHSS Skoru & Mekanik Trombektomi",
    "ikon": "🧠",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Semptom Başlangıcından İtibaren İlk 4.5 Saat",
    "akilliFisilti": "🧠 Akut iskemik inmede IV rt-PA (Alteplaz) ilk 4.5 saatte uygulanmalı; Kapı-İğne Zamanı (Door-to-Needle) 60 dakikanın altında tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Hastanın NIHSS inme ölçeği puanını hesapla ve acil kontrastsız Beyin BT ile intrakraniyal kanamayı ekarte et",
      "Kan basıncını < 185/110 mmHg sınırında tutarak 0.9 mg/kg IV Alteplaz (%10 bolus, %90 1 saatlik infüzyon) başlat",
      "Büyük damar oklüzyonu (LVO - ICA, M1) saptanan hastalarda ilk 6-24 saatte girişimsel radyoloji ile Mekanik Trombektomiyi planla",
      "Tedavi sonrası 24 saat içinde antikoagülan/antiagregan vermeden önce kontrol Beyin BT çek"
    ]
  },
  {
    "id": "eczacilik_majistral_formul_hazirlama_ve_stabilite_etiketi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "majistral ilaç formülü hazırlama eczane laboratuvarı",
      "havanda homojenizasyon geometrik seyreltme yöntemi",
      "majistral tarife fiyat hesaplama ve kodeks uygunluğu",
      "kırmızı etiket haricen kullanılır beyaz etiket dahilen",
      "majistral ilaç kullanım süresi beyond use date bud"
    ],
    "baslik": "Majistral Eczacılık: Laboratuvar Hazırlama, Geometrik Seyreltme, Tarife & BUD Etiketi",
    "ikon": "🧪",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Majistral Reçete Karşılama",
    "akilliFisilti": "🧪 Majistral ilaçlar farmasötik kodekse göre geometrik seyreltmeyle hazırlanmalı; haricen kullanılanlara KIRMIZI, dahilen kullanılanlara BEYAZ etiket ve BUD son kullanma tarihi yapıştırılmalıdır.",
    "oncedenYapilacaklar": [
      "Reçetedeki etken madde ve sıvağların (Vazelin, Alkol, Distile Su) geçimliliğini ve doz aşımını kontrol et",
      "Hassas analitik terazide tartılan toz maddeleri havanda geometrik seyreltme (Geometric Dilution) kuralıyla homojen karıştır",
      "Majistral Tarife Kitabına göre hammadde ve hazırlama emek bedelini hesaplayıp reçete arkasına kaydet",
      "İlacın türüne göre (Haricen: Kırmızı / Dahilen: Beyaz) etiket düzenleyip BUD (Beyond Use Date) saklama şartlarını yaz"
    ]
  },
  {
    "id": "eczacilik_soguk_zincir_data_logger_ve_sapma_protokolu",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "soğuk zincir ilaç dolabı 2 ila 8 derece takibi",
      "usb data logger sıcaklık kaydedici kalibrasyon belgesi",
      "soğuk zincir kırılması ve sıcaklık sapma tutanağı",
      "aşı dolabı ups kesintisiz güç kaynağı ve gsm sıcaklık alarmı",
      "biyolojik ürünler insülin ve aşıların karantinaya alınması"
    ],
    "baslik": "Soğuk Zincir & Aşı: 2-8°C Data Logger Takibi, GSM Sıcaklık Alarmı & Sapma Karantinası",
    "ikon": "❄️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Günlük Sıcaklık Takibi & Alarm Anı",
    "akilliFisilti": "❄️ Aşı ve biyolojik ürünler +2°C ile +8°C arasında saklanmalı; sıcaklık sapması durumunda ürünler derhal karantinaya alınıp üretici/İl Sağlık Müdürlüğü ile temasa geçilmelidir.",
    "oncedenYapilacaklar": [
      "İlaç buzdolabının sabah ve akşam sıcaklık göstergelerini kontrol edip resmi Sıcaklık Takip Çizelgesine işle",
      "USB Data Logger cihazını bilgisayara bağlayarak 24 saatlik sürekli sıcaklık grafik eğrisini ve min/max değerleri arşivle",
      "Sıcaklık 8°C üzerine çıktığında veya 2°C altına indiğinde GSM bildirim modülünün sorumlu eczacıya SMS attığını doğrula",
      "Olası elektrik kesintisi/sapmada ürünleri dondurucu akülü izotermal çantaya alıp \"Karantina - Satılamaz\" etiketi koy"
    ]
  },
  {
    "id": "eczacilik_akilci_ilac_ve_beers_kriterleri_geriatri",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "akılcı ilaç kullanımı aiku geriatrik hasta ilaç danışmanlığı",
      "beers kriterleri yaşlılarda potansiyel uygunsuz ilaçlar",
      "polifarmasi antikolinerjik yük ve düşme riski sedatif",
      "renal doz ayarlaması kreatinin klerensi cockcroft gault",
      "ilaç uyum kutusu haftalık dozaj düzenleyici taksimat"
    ],
    "baslik": "Akılcı İlaç Danışmanlığı: Beers Kriterleri, Geriatrik Polifarmasi & Renal Doz Takibi",
    "ikon": "💊",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Reçete Danışmanlığı & Yaşlı Hasta Kabulü",
    "akilliFisilti": "💊 65 yaş üzeri hastalarda Beers Kriterlerine göre yüksek riskli ilaçlar (sedatifler, antikolinerjikler) taranmalı; kreatinin klerensine göre doz ayarlaması hekime önerilmelidir.",
    "oncedenYapilacaklar": [
      "Hastanın kullandığı tüm reçeteli ve OTC ilaçları listeyerek Polifarmasi ve ilaç-ilaç etkileşimlerini tara",
      "Amerikan Geriatri Derneği (AGS) Beers Kriterleri listesindeki sakıncalı molekülleri (Antihistaminik, Benzodiazepin vb.) tespit et",
      "Hastanın böbrek fonksiyon testlerine (eGFR / CrCl) bakarak nefrotoksik ilaç dozlarının uygunluğunu teyit et",
      "İlaçların günün hangi saatinde (Aç/Tok) alınacağını anlatan haftalık doz kutusu ve kullanım şemasını hastaya/yakınına açıkla"
    ]
  },
  {
    "id": "eczacilik_biyobenzer_ilac_ve_ikame_guvenlik_denetimi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "biyobenzer ilaç biyolojik referans ürün karşılaştırması",
      "biyobenzer ikame ve hekim onayı kuralı titck",
      "monoklonal antikor mab ve immünojenite takip protokolü",
      "biyolojik ilaç soğuk zincir transfer ve enjeksiyon eğitimi",
      "titck biyobenzer kılavuzu ve reçete eşdeğerlik kontrolü"
    ],
    "baslik": "Biyoteknoloji & İlaç: Biyobenzer İkame Kuralı, İmmünojenite & Hasta Enjeksiyon Eğitimi",
    "ikon": "🧬",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Biyolojik İlaç Reçetesi & Dağıtım",
    "akilliFisilti": "🧬 Biyobenzer ilaçlar kimyasal jeneriklerden farklıdır; TİTCK mevzuatı gereği biyolojik ürünlerde eczacı düzeyinde otomatik ikame yapılamaz, hekim onayı aranır.",
    "oncedenYapilacaklar": [
      "Reçetede yazılı biyolojik ilacın ticari markası ile referans/biyobenzer durumunu İTS üzerinden doğrula",
      "Eczanede otomatik marka ikamesi yapmadan önce reçeteyi yazan uzman hekimin onay ve talimatını ara",
      "Hastaya subkutan enjeksiyon kaleminin (Pen) doğru uygulanması ve enjeksiyon yeri rotasyonunu göster",
      "Olası immünojenik reaksiyon veya etkinlik kaybı durumlarında TÜFAM farmakovijilans bildirim formunu hazırla"
    ]
  },
  {
    "id": "eczacilik_its_karekod_deaktivasyon_ve_iadeler",
    "category": "finans",
    "domain": "ECZACILIK",
    "keywords": [
      "ilaç takip sistemi its karekod deaktivasyonu satış iptali",
      "ecza deposu miad yaklaşan ilaç iade faturası",
      "its mal alım bildirimi ve gln global lokasyon numarası",
      "karekodsuz ürün manuel barkod giriş ve titck onayı",
      "eczaneler arası takas ve its devir işlemi"
    ],
    "baslik": "İTS & Stok: Karekod Deaktivasyonu, Ecza Deposu Miad İadesi & GLN Doğrulama",
    "ikon": "📦",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Stok Giriş/Çıkış & Dönem Sonu Miad İadesi",
    "akilliFisilti": "📦 Ecza deposundan gelen ilaçlar GLN koduyla İTS sisteminden teslim alınmalı; miadı 3 aydan az kalan ilaçlar depoya İTS iade bildirimiyle faturalandırılmalıdır.",
    "oncedenYapilacaklar": [
      "Depodan gelen koli karekodlarını 2D optik okuyucuyla tarayarak İTS Mal Alım Bildirimini tamamla",
      "Hatalı veya iade edilen reçetelerde İTS Satış İptal / Deaktivasyon işlemini yaparak karekodu yeniden stoğa al",
      "Son kullanma tarihine 90 gün kalan ilaçları raftan ayırıp ecza deposuna İTS İade Bildirimi ve iade faturası düzenle",
      "İki eczane arasındaki takas işlemlerinde İTS Eczaneler Arası Takas bildirimini her iki tarafın GLN numarasıyla eşle"
    ]
  },
  {
    "id": "saglik_sepsis_ve_sofa_erken_resusitasyon_protokolu",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "sepsis protokolü quick sofa qsofa skoru",
      "septik şok laktat düzeyi 2 mmol üzeri",
      "erken sıvı resüsitasyonu 30 ml kg kristaloid izotonik",
      "ilk 1 saatte geniş spektrumlu antibiyotik kan kültürü",
      "noradrenalin vazopresör map 65 mmhg hedefi"
    ],
    "baslik": "Acil & Yoğun Bakım: Sepsis 1-Saat Paketi, qSOFA, Kristaloid (30ml/kg) & Noradrenalin",
    "ikon": "🩺",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Sepsis Şüphesi / İlk 1 Saat (Golden Hour)",
    "akilliFisilti": "🩺 Sepsis 1-Saat Paketinde; kan laktatı ölçülmeli, kan kültürü alınıp ilk 60 dakikada geniş spektrumlu antibiyotik başlanmalı ve 30 ml/kg sıvı yüklenmelidir.",
    "oncedenYapilacaklar": [
      "qSOFA skorunu (Solunum > 22, Bilinç değişikliği, Sistolik KB < 100) acil serviste triyajda değerlendir",
      "Antibiyotik öncesi 2 set periferik kan kültürü al ve venöz kan gazında laktat seviyesini ölç",
      "Hipotansiyon veya Laktat >= 4 mmol/L ise derhal 30 ml/kg Dengeli Kristaloid infüzyonunu başlat",
      "Sıvıya yanıtsız hipotansiyonda OAB (MAP) >= 65 mmHg hedefi için santral yoldan Noradrenalin infüzyonuna geç"
    ]
  },
  {
    "id": "saglik_acil_triyaj_kirmizi_alan_hizli_seri_induksiyon_rsi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "acil servis triyaj kırmızı alan acil entübasyon",
      "glasgow koma skoru gks 8 altı hava yolu emniyeti",
      "hızlı seri indüksiyon rsi sedasyon ve kas gevşetici",
      "video laringoskop endotrakeal tüp kaf basıncı 25 cmh2o",
      "zor havayolu arabası bougie ve lma hazırlığı"
    ],
    "baslik": "Acil Tıp & RSI: Kırmızı Alan, GKS < 8 Acil Entübasyon & Zor Havayolu Kiti",
    "ikon": "🚨",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kritik Travma / Solunum Yetmezliği Anı",
    "akilliFisilti": "🚨 GKS <= 8 olan veya solunum arresti gelişen kırmızı alan hastasında Hızlı Seri İndüksiyon (RSI) ile endotrakeal entübasyon gecikmeksizin uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Zor havayolu kriterlerini (LEMON skoru) hızlıca değerlendirip Video Laringoskop ve Bougie kılavuzunu hazırla",
      "3 dakika boyunca %100 O2 ile preoksijenizasyon sağlayarak gastrik aspirasyon riskini azalt",
      "Sedatif (Ketamin/Etomidat) ve nöromüsküler blokör (Süksinilkolin/Rokuronyum) ile RSI protokolünü başlat",
      "Entübasyon sonrası kaf basıncını 20-30 cmH2O aralığında şişirip ETCO2 ve akciğer oskültasyonuyla tüpü doğrula"
    ]
  },
  {
    "id": "saglik_usg_rehberliginde_santral_venoz_kateter_svk",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "santral venöz kateter svk iç juguler ven kanülasyonu",
      "ultrasonografi usg rehberliğinde seldinger tekniği",
      "kateter ilişkili kan dolaşımı enfeksiyonu kiked paketi",
      "santral ven basıncı svb ve vazopresör infüzyon hattı",
      "kontrol akciğer grafisi pnömotoraks ve kateter ucu kontrolü"
    ],
    "baslik": "Girişimsel Tıp: USG Eşliğinde SVK (Seldinger Tekniği), KİKED & Grafi Kontrolü",
    "ikon": "💉",
    "renk": "#E0F2FE",
    "varsayilanZaman": "İnvaziv Girişim & Yoğun Bakım Takibi",
    "akilliFisilti": "💉 SVK takılırken karotis ponksiyonunu önlemek için USG rehberliği kullanılmalı, maksimum steril bariyer sağlanmalı ve post-op kontrol grafi çekilmelidir.",
    "oncedenYapilacaklar": [
      "Hastayı Trendelenburg pozisyonuna alıp lineer USG probu ile Vena Jugularis Interna anatomisini ve kompresibilitesini doğrula",
      "Maksimum steril bariyer (steril önlük, tam boy örtü, maske, klorheksidin cilt antisepsisi) uygula",
      "Seldinger tekniğiyle kılavuz tel üzerinden 3 lümenli kateteri takıp kan aspirasyonu ile lümenleri yıka",
      "İşlem sonrası PA Akciğer Grafisi çektirerek kateter ucunun Vena Cava Superior - Atriyum bileşkesinde olduğunu teyit et"
    ]
  },
  {
    "id": "saglik_diyabetik_ketoasidoz_dka_insulin_ve_anyon_acigi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "diyabetik ketoasidoz dka tedavi protokolü",
      "anyon açığı anyon gap hesabı ve metabolik asidoz",
      "iv kristalize regüler insülin 0 1 ünite kg saat",
      "potasyum takibi hipokalemi kalsiyum glukonat",
      "kan şekeri 200 mg dl altına indiğinde yüzde 5 dekstroz ekleme"
    ],
    "baslik": "Endokrin & DKA: Anyon Açığı Takibi, IV İnsülin İnfüzyonu & Hipokalemi Yönetimi",
    "ikon": "🩸",
    "renk": "#FEF3C7",
    "varsayilanZaman": "DKA Tanısı & Yoğun Glukoz/Elektrolit Takibi",
    "akilliFisilti": "🩸 DKA yönetiminde Potasyum < 3.3 mEq/L ise insülin ASLA başlanmaz; serum K+ düzeltildikten sonra 0.1 U/kg/saat regüler insülin infüzyonuna geçilir.",
    "oncedenYapilacaklar": [
      "Kan gazı, keton, elektrolitler ile Anyon Açığını [Na - (Cl + HCO3)] hesaplayıp başlangıç asidoz tablosunu kaydet",
      "Serum Potasyum seviyesi 3.3 mEq/L üzerinde olduğunu teyit ettikten sonra 0.1 U/kg/saat IV Regüler İnsülin başlat",
      "Kan şekeri saatte 50-75 mg/dL hızla düşürülecek şekilde titre et; glukoz 200-250 mg/dL'ye indiğinde mayiye %5 Dekstroz ekle",
      "Hasta oral beslenmeye geçene ve anyon açığı kapanana (<= 12 mEq/L) kadar IV insülini kesme"
    ]
  },
  {
    "id": "saglik_postop_dvt_profilaksisi_ve_dmah_tedavisi",
    "category": "saglik",
    "domain": "SAGLIK",
    "keywords": [
      "derin ven trombozu dvt profilaksisi caprini skoru",
      "düşük molekül ağırlıklı heparin dmah enoksaparin",
      "anti-embolik kompresyon çorabı ve aralıklı pnömatik kompresyon",
      "pulmoner emboli pe erken uyarı taşikardi dispne",
      "kanama riski hemoglobin hematokrit ve trombosit takibi"
    ],
    "baslik": "Cerrahi İyileşme: Caprini DVT Risk Skoru, DMAH Enoksaparin & Pnömatik Çorap",
    "ikon": "🧦",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Ameliyat Sonrası İlk 12-24 Saat",
    "akilliFisilti": "🧦 Yüksek riskli cerrahi hastalarda post-op 12-24. saatte DMAH (Enoksaparin) başlanmalı ve erken mobilizasyon ile dereceli kompresyon çorabı uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Hastanın Caprini Tromboemboli Risk Skorunu hesaplayarak risk derecesini (Düşük/Orta/Yüksek) belirle",
      "Ameliyattan 12 saat sonra cerrahi kanama kontrolünü yapıp subkutan DMAH (Örn: Enoksaparin 40 mg/gün) profilaksisini başlat",
      "Yatakta aralıklı pnömatik kompresyon cihazını (IPC) takarak baldır kas pompası dolaşımını destekle",
      "Hastayı ameliyat sonrası ilk 24 saat içinde mutlaka refakatçi eşliğinde ayağa kaldırarak mobilize et"
    ]
  },
  {
    "id": "eczacilik_tpn_parenteral_nutrisyon_ve_gecimlilik_analizi",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "total parenteral nütrisyon tpn hazırlama laminer akış",
      "kalsiyum fosfat çökelti riski osmolarite hesabı",
      "tpn aminoasit dekstroz ve lipid emülsiyonu 3ü bir arada",
      "santral venöz yol gereksinimi osmolarite 900 mosm üstü",
      "tpn mikronik filtre 1 2 mikron lipid ve 0 22 mikron"
    ],
    "baslik": "Klinik Farmasi & TPN: Kalsiyum-Fosfat Çökeltisi, Osmolarite (>900) & Mikronik Filtre",
    "ikon": "🧪",
    "renk": "#EDE9FE",
    "varsayilanZaman": "TPN Reçetesi & Hazırlama",
    "akilliFisilti": "🧪 TPN solüsyonlarında Ca ve Fosfat çökeltisini önlemek için karıştırma sırası yönetilmeli; >900 mOsm/L osmolariteli torbalar mutlaka santral venöz hattan verilmelidir.",
    "oncedenYapilacaklar": [
      "Hastanın günlük kalori, protein, sıvı ve elektrolit gereksinimini klinik farmasist yazılımıyla hesapla",
      "Kalsiyum Glukonat ve Potasyum Fosfat tuzlarının çökelti eğrisini (Solubility Curve) kontrol et",
      "Sınıf 100 / ISO Sınıf 5 Laminer Hava Akımlı Kabinde aseptik teknikle TPN torbasını hazırla",
      "Torba etiketine infüzyon süresi, saklama sıcaklığı (+2-8°C) ve 1.2 µm lipidli filtre kullanım uyarısını yaz"
    ]
  },
  {
    "id": "eczacilik_renkli_recete_sistemi_rrs_ve_kirmizi_yesil_devir",
    "category": "resmi",
    "domain": "ECZACILIK",
    "keywords": [
      "renkli reçete sistemi rrs titck uyuşturucu ilaç",
      "kırmızı reçete narkotik ve yeşil reçete psikotrop devir",
      "kırmızı reçete defteri aylık sarfiyat ve devir teslim",
      "metadon fentanil flaster morfin ampul karekod sonlandırma",
      "titck il sağlık müdürlüğü uyuşturucu ilaç denetimi"
    ],
    "baslik": "TİTCK Renkli Reçete (RRS): Kırmızı/Yeşil Reçete Defteri, Fentanil & Aylık Sayım",
    "ikon": "🔒",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Narkotik Reçete Girişi & Aylık Devir",
    "akilliFisilti": "🔒 Kırmızı ve yeşil reçeteli ilaçlar kilitli çelik dolapta saklanmalı; RRS portalına aynı gün girilmeli ve fiziki stokla reçete defteri her ay mutabık kılınmalıdır.",
    "oncedenYapilacaklar": [
      "Hasta TC ve hekim kaşesini doğrulayarak TİTCK Renkli Reçete Sisteminden (RRS) e-reçete onay kodunu al",
      "İlacı kilitli narkotik dolabından çıkarıp kutu karekodunu İTS ve RRS sisteminde eşzamanlı sonlandır",
      "Kırmızı Reçete Kayıt Defterine hasta adı, protokol no, hekim adı ve verilen ampul/flaster adedini işle",
      "Ay sonunda fiziki ampul sayımı ile defter bakiyesini eşleştirip İl Sağlık Müdürlüğü teftiş dosyasını güncelle"
    ]
  },
  {
    "id": "eczacilik_tdm_terapotik_ilac_duzeyi_ve_vankomisin_toksisite",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "terapötik ilaç düzeyi izlemi tdm vankomisin çukur düzeyi",
      "vankomisin trough düzeyi 15 ila 20 mcg ml hedefi",
      "aminoglikozit gentamisin amikasin nefrotoksisite ototoksisite",
      "karbamazepin digoksin lityum kan konsantrasyonu takibi",
      "farmakokinetik eğri altındaki alan auc mic oranı"
    ],
    "baslik": "Klinik Farmakokinetik: TDM Vankomisin Çukur Düzeyi (Trough), AUC/MIC & Toksisite",
    "ikon": "📈",
    "renk": "#FEF3C7",
    "varsayilanZaman": "4. Doz Öncesi Çukur Kanı Alımı",
    "akilliFisilti": "📈 Vankomisin çukur düzeyi (Trough) 4. dozdan tam 30 dakika önce alınmalı; hedef aralık (15-20 µg/mL) dışına çıkıldığında doz aralığı yeniden hesaplanmalıdır.",
    "oncedenYapilacaklar": [
      "Hemşirelik ekibiyle koordine olarak 4. antibiyotik dozundan hemen önce çukur kan numunesini aldır",
      "Laboratuvardan gelen serum konsantrasyonu ile AUC/MIC (> 400 hedefi) değerini hesapla",
      "Trough düzeyi > 20 µg/mL ise nefrotoksisiteyi önlemek için doz aralığını (q12h -> q24h) genişletilmesini hekime öner",
      "Hastanın günlük serum kreatinin ve idrar çıkışını takip ederek renal klerens değişimini modelle"
    ]
  },
  {
    "id": "eczacilik_steril_goz_damlasi_ve_0_22_membran_filtrasyon",
    "category": "saglik",
    "domain": "ECZACILIK",
    "keywords": [
      "steril oftalmik solüsyon göz damlası majistral",
      "0 22 mikron steril membran şırınga ucu filtre",
      "laminer hava akımlı kabin steril hazırlama",
      "izotonik sodyum klorür ve göz ph 7 4 tamponlama",
      "oftalmik preparat saklama süresi açıldıktan sonra 15 gün"
    ],
    "baslik": "Majistral Oftalmoloji: 0.22µm Membran Filtrasyon, pH 7.4 Tampon & Steril Şişeleme",
    "ikon": "👁️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Steril Reçete Hazırlama",
    "akilliFisilti": "👁️ Majistral göz damlaları Laminer Kabinde 0.22 mikron steril membran filtreden geçirilerek partikül ve bakterilerden arındırılmalı, pH'ı gözyaşına (7.4) ayarlanmalıdır.",
    "oncedenYapilacaklar": [
      "Göz damlası formülasyonunun izotonisini (%0.9 NaCl eşdeğeri) ve pH tamponunu (Borat/Fosfat) hesapla",
      "Solüsyonu steril şırıngaya çekip 0.22 µm PES membran filtreden geçirerek steril damlalıklı şişeye aktar",
      "Şişeyi kapatıp üzerine \"Steril Oftalmik Solüsyon - Açıldıktan Sonra 15 Gün Geçerlidir\" kırmızı etiketini yapıştır",
      "Hastaya damlalık ucunu göze veya kirpiğe değdirmemesi ve +4°C buzdolabında saklaması uyarısını ver"
    ]
  },
  {
    "id": "eczacilik_titck_ilac_geri_cekme_recall_ve_karantina",
    "category": "resmi",
    "domain": "ECZACILIK",
    "keywords": [
      "titck ilaç geri çekme duyurusu recall 1 sınıf 2 sınıf",
      "hatalı seri parti no ilaçların karantinaya alınması",
      "ilaç geri çekme formu ve ecza deposuna iade tutanağı",
      "its sisteminde bloke edilen seri numarası uyarısı",
      "hastaya ulaşma ve geri çekilen ilacın imhası"
    ],
    "baslik": "TİTCK İlaç Geri Çekme (Recall): Sınıf 1/2 Geri Çekme, İTS Blokajı & Karantina",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "TİTCK Geri Çekme Duyurusu Anı",
    "akilliFisilti": "⚠️ TİTCK 1. Sınıf Geri Çekme (Hayati Risk) duyurusu yayımlandığında ilgili parti numaralı ilaçlar DERHAL raftan indirilip İTS'de bloke edilerek depoya iade edilir.",
    "oncedenYapilacaklar": [
      "TİTCK duyurusundaki ilaç adı, ambalaj boyutu ve Parti/Seri Numaralarını eczane otomasyonunda sorgula",
      "İlgili partideki kutuları raftan toplayıp \"Karantina - İade Ürün Satılamaz\" etiketli alana koy",
      "İTS sistemi üzerinden geri çekilen parti karekodlarını depoya iade bildirimiyle düş",
      "Son 1 ayda o seriden ilaç alan kronik hastaları tespit ederek hekimiyle görüşüp ilacın değişimini sağla"
    ]
  },
  {
    "id": "veteriner_parvoviral_enterit_ve_genclik_hastaligi_izolasyon",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "köpek parvoviral enterit kanlı ishal hızlı test kiti",
      "gençlik hastalığı distemper izolasyon karantina ünitesi",
      "agresif iv sıvı sağaltımı izolat ringer laktat",
      "anti-viral interferon ve geniş spektrumlu antibiyotik",
      "klinik dezenfeksiyonu potasyum peroksimonosülfat virkon s"
    ],
    "baslik": "Küçük Hayvan Hekimliği: Parvoviral Enterit, İzolasyon, Agresif Sıvı & Virkon-S",
    "ikon": "🐕",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Akut Kusma/İshal Geliştiğinde",
    "akilliFisilti": "🐕 Parvoviral enteritte hasta derhal enfeksiyon izolasyon odasına alınmalı; dehidrasyon şokunu önlemek için IV Ringer Laktat ve anti-emetik tedavi başlatılmalıdır.",
    "oncedenYapilacaklar": [
      "Rektal sürüntüden 10 dakikada sonuç veren Parvo Ag Hızlı Test Kitini uygulayarak tanıyı kesinleştir",
      "Hastayı diğer yatan hastalardan izole edilmiş negatif basınçlı enfeksiyon ünitesine yatır",
      "Dehidrasyon derecesine (%8-10) göre saatlik IV Ringer Laktat + Glukoz + Klorür infüzyonunu damla ayarıyla başlat",
      "Muayene masası ve ekipmanları zarflı/zarfsız virüslere etkili Virkon-S solüsyonu ile dezenfekte et"
    ]
  },
  {
    "id": "veteriner_hipokalsemi_sut_hummasi_kalsiyum_boroglukonat",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "büyükbaş doğum felci süt humması hipokalsemi",
      "yatan inek s pozisyonu kafa kıvrılması koma",
      "yavaş iv kalsiyum boroglukonat kalp oskültasyonu",
      "bradikardi ve kardiyak arrest kalsiyum infüzyonu riski",
      "doğum sonrası anyonik rasyon ve kalsiyum bolus"
    ],
    "baslik": "Büyükbaş Hekimliği: Süt Humması (Hipokalsemi), Yavaş IV Kalsiyum & Kalp Dinleme",
    "ikon": "🐄",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Doğum Sonrası İlk 48 Saat",
    "akilliFisilti": "🐄 Doğum felcinde Kalsiyum Boroglukonat kesinlikle YAVAŞ (15-20 dakikada) IV verilmeli; aritmi veya bradikardi gelişirse infüzyon hemen durdurulmalıdır.",
    "oncedenYapilacaklar": [
      "Doğum yapmış ineğin soğuk kulaklar, titreme, S-şeklinde boyun kıvrılması ve kalkamama semptomlarını muayene et",
      "Stetoskopla kalp atım frekansını dinleyerek 500 ml Kalsiyum Boroglukonat solüsyonunu 38°C vücut ısısına getir",
      "Vena Jugularis yolundan solüsyonu kalbi sürekli dinleyerek yavaş IV damla olarak ver",
      "Kalan kalsiyumun yarısını nüksü önlemek için subkutan (SC) dokuya enjekte edip hayvanı altlıklı alanda ayağa kaldır"
    ]
  },
  {
    "id": "veteriner_kuduz_supheli_isirik_ve_10_gunluk_resmi_musahade",
    "category": "resmi",
    "domain": "VETERINER",
    "keywords": [
      "kuduz şüpheli ısırık vakası tarım ve orman ilçe müdürlüğü",
      "kuduz 10 günlük resmi müşahede ve tecrit süresi",
      "kuduz aşı karnesi mikroçip sorgulama petvet",
      "ısırılan vatandaşın kuduz aşı merkezine ivedi sevki",
      "müşahede sonu resmi sağlık raporu tanzimi"
    ],
    "baslik": "Zoonoz & Kuduz: 10 Günlük Resmi Müşahede, İlçe Tarım Bildirimi & PETVET Teyidi",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Isırık Olayı Anı & 10 Günlük Takip",
    "akilliFisilti": "⚠️ İnsan ısıran kedi/köpek kanunen 10 GÜN boyunca veteriner hekim gözetiminde tecrit edilerek müşahede altında tutulur ve İlçe Tarım Müdürlüğüne bildirilir.",
    "oncedenYapilacaklar": [
      "Isırılan kişiyi yara yerini bol sabunlu suyla yıkamasını söyleyerek derhal Sağlık Bakanlığı Kuduz Aşı Merkezine sevk et",
      "Isıran hayvanın PETVET sisteminden mikroçip numarasını ve son 1 yıllık Kuduz Aşısı geçerlilik tarihini sorgula",
      "İlçe Tarım ve Orman Müdürlüğüne \"Isırık Bildirim Formu\" ile resmi bildirimde bulunarak hayvanı 10 gün tecrit kafesine al",
      "10. günün sonunda hayvanda hiçbir nörolojik/kuduz semptomu görülmediğini resmi \"Müşahede Sonu Sağlık Raporu\" ile onayla"
    ]
  },
  {
    "id": "veteriner_pet_pasaportu_mikrocip_ve_petvet_kayit",
    "category": "resmi",
    "domain": "VETERINER",
    "keywords": [
      "ev hayvanı kayıt sistemi petvet mikroçip implantasyonu",
      "iso 11784 11785 uyumlu 15 haneli mikroçip",
      "tarım ve orman bakanlığı onaylı resmi pet pasaportu",
      "yurtdışı çıkış kuduz titrasyon testi favn rffit",
      "sahip değişikliği ve kayıp hayvan bildirimi petvet"
    ],
    "baslik": "Resmi Mevzuat: 15 Haneli ISO Mikroçip, PETVET Kaydı & Kuduz Titrasyon Testi",
    "ikon": "🐱",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Mikroçip Uygulaması & Pasaport Tanzimi",
    "akilliFisilti": "🐱 Evcil hayvanlara sol kürek kemiği arasına ISO 11784/11785 uyumlu 15 haneli mikroçip takılarak PETVET sistemine ve resmi Pasaporta kaydedilir.",
    "oncedenYapilacaklar": [
      "Mikroçip okuyucu ile hayvanın daha önceden çip taşımadığını vücudun farklı bölgelerinden tara",
      "Sol boyun/scapula bölgesine deri altı enjektörle steril mikroçipi uygulayıp okuyucudan 15 haneli kodu teyit et",
      "Bakanlık PETVET portalına hayvan sahibi kimlik bilgileri, hayvanın ırkı, rengi ve aşılarıyla birlikte kaydet",
      "Yurtdışına seyahat edecek petler için akredite laboratuvara Kuduz Antikor Titrasyon (FAVN) kan serumu gönder"
    ]
  },
  {
    "id": "veteriner_cerrahi_gaz_anestezi_ve_kapnografi_etco2",
    "category": "saglik",
    "domain": "VETERINER",
    "keywords": [
      "veteriner gaz anestezi cihazı izofluran sevofluran",
      "kapnografi dalga formu ve end-tidal co2 etco2 35-45 mmhg",
      "hastabaşı monitörü ekg spo2 invaziv olmayan tansiyon nibp",
      "pre-medikasyon sedasyon ve endotrakeal tüp kaflama",
      "anestezi derinliği palpebral refleks ve çene tonusu"
    ],
    "baslik": "Veteriner Anesteziyoloji: İzofluran Gaz Anestezisi, Kapnografi (EtCO2) & NIBP",
    "ikon": "🐾",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Operasyon Öncesi & Cerrahi Boyunca",
    "akilliFisilti": "🐾 Gaz anestezisinde EtCO2 (35-45 mmHg) ve SpO2 sürekli izlenmeli; hipotansiyonda (MAP < 60 mmHg) izofluran yüzdesi düşürülüp sıvı hızı artırılmalıdır.",
    "oncedenYapilacaklar": [
      "Pre-op kan biyokimyası ve hemogram sonuçlarına göre ASA anestezi risk sınıfını belirle",
      "Propofol indüksiyonu sonrası uygun çaplı endotrakeal tüp ile entübe edip hava kaçırmayacak şekilde kafı şişir",
      "Kapnografiyi solunum devresine bağlayarak EtCO2 dalga boyunu ve solunum sayısını monitörize et",
      "Operasyon bitiminde izofluranı kapatıp en az 5 dakika saf oksijen vererek hayvan yutkunma refleksini kazanınca ekstübe et"
    ]
  }
];
