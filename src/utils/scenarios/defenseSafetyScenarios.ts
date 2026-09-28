import type { ShortScenarioMatch } from '../scenarioDatabase.ts';

/**
 * Notivia Bilişsel Modülü: ADALET_GUVENLIK, SAVUNMA, ISG
 * Toplam 165 Bilişsel Senaryo
 */
export const DEFENSE_SAFETY_SCENARIOS: ShortScenarioMatch[] = [
  {
    "id": "savunma_gbt_uyap_yakalama_emri",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "gbt yakalama emri",
      "cmk 94 sorgu",
      "aranan şahıs teslim",
      "uyap yakalama müzekkeresi",
      "gbt aranıyor"
    ],
    "baslik": "GBT / UYAP Yakalama Emri & CMK 94 İnfazı",
    "ikon": "👮",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Yakalama Anından İtibaren 24 Saat",
    "hazirlikZamani": "Kolluk Üst Araması & Sağlık Raporu",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "👮 CMK m. 94 gereğince yakalanan kişi en geç 24 saat içinde yetkili mahkeme veya SEGBİS ile en yakın nöbetçi hakimlik önüne çıkarılmalıdır.",
    "oncedenYapilacaklar": [
      "POLNET / GBT sorgusunda aranan şahsın kimliğini ve UYAP yakalama emrinin güncelliğini teyit et",
      "Şahsın kaba üst aramasını yap, kesici/delici alet ve suç unsurlarını muhafaza altına al",
      "Giriş adli muayene raporu için şahsı derhal devlet hastanesi adli tabipliğine sevk et",
      "Yakalama müzekkeresini çıkaran mahkeme veya savcılık ile irtibata geçerek 24 saat dolmadan SEGBİS sorgusuna hazırla"
    ]
  },
  {
    "id": "savunma_arazoz_afff_kopuk_testi",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "arazöz köpük testi",
      "afff %3 köpük",
      "proportioner oranı",
      "itfaiye köpük işleme",
      "yangın köpüğü arazöz"
    ],
    "baslik": "Arazöz AFFF Köpük Oranlayıcı (Proportioner) Testi",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "Haftalık Araç & Pompa Bakımı",
    "hazirlikZamani": "Tatbikat Alanı Güvenlik Şeridi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🚒 Akaryakıt ve kimyasal yangınlarda kullanılan AFFF köpüğün oranlayıcı vanası su ile %3-%6 oranında karışmalı; köpük lansı hava emişi açık olmalıdır.",
    "oncedenYapilacaklar": [
      "Arazöz köpük tankı seviyesini ve köpük konsantresi viskozitesini gözle muayene et",
      "Yangın tulumbasını çalıştırarak su basıncını 8-10 Bar aralığına getir",
      "Otomatik/manuel oranlayıcı (proportioner) vanasını %3 konumuna alarak köpük lansından test atışı yap",
      "Köpüğün homojen genleşme oranını ve örtücülüğünü kontrol ettikten sonra hattı temiz suyla yıka (flush)"
    ]
  },
  {
    "id": "savunma_muhimmat_sandik_kursun_muhur",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "mühimmat sandığı sayımı",
      "kurşun mühür kontrolü",
      "silahlık cephanelik sayım",
      "mühür pensesi numara",
      "fişek sandığı mühür"
    ],
    "baslik": "Cephanelik Mühimmat Sandığı & Kurşun Mühür Denetimi",
    "ikon": "🛡️",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Haftalık / Nöbetçi Subayı Devri",
    "hazirlikZamani": "Cephanelik Çift Kilit Açılışı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🛡️ TSK Cephanelik Yönergesi uyarınca mühimmat sandıklarındaki kurşun mühürler kırılmadan, mühür numaraları kayıt cetveliyle birebir fiziki kontrol edilir.",
    "oncedenYapilacaklar": [
      "Cephanelik kilitli demir kapısını Nöbetçi Amiri ve Nöbetçi Astsubayı nezaretinde aç",
      "Her mühimmat sandığının çelik tel ve kurşun mührünün kopuk veya ezik olmadığını büyüteçle incele",
      "Kurşun mühür üzerindeki birlik damga numarasını Silahlık Mühimmat İcmal Cetveliyle karşılaştır",
      "Vukuat yoksa cephanelik gözetleme defterine kurşun mühürlerin tam olduğunu yazıp ıslak imza at"
    ]
  },
  {
    "id": "savunma_parmak_izi_afis_eslestirme",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "parmak izi eşleştirme",
      "afis sistemi",
      "apfis karşılaştırma",
      "olay yeri parmak izi",
      "parmak izi mukayese raporu"
    ],
    "baslik": "Parmak İzi AFIS / APFIS Biyometrik Eşleştirme Raporu",
    "ikon": "🔍",
    "renk": "#BFDBFE",
    "varsayilanZaman": "İnceleme Talebinden Sonra 24 Saat",
    "hazirlikZamani": "Olay Yeri Jelatin Transferi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🔍 Olay yerinden manyetik pudra ile kaldırılan latent parmak izleri AFIS sisteminde en az 12 karakteristik nokta (minutiae) eşleşmesiyle doğrulanır.",
    "oncedenYapilacaklar": [
      "Olay yerinden kaldırılan parmak izi transfer jelatinini yüksek çözünürlüklü makro tarayıcıda sayısallaştır",
      "Görüntü üzerindeki ada, çatal, sonlanma gibi karakteristik tepe noktalarını (minutiae) yazılımda işaretle",
      "Otomatik Parmak İzi Teşhis Sistemi (AFIS/APFIS) veri tabanında biyometrik eşleştirme algoritmasını çalıştır",
      "Eşleşen şüphelinin 10 parmak kartıyla mukayese ederek adli uzmanlık raporunu tanzim et"
    ]
  },
  {
    "id": "savunma_k9_kopek_kondisyon_saklama",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "k9 köpek eğitimi",
      "narkotik köpek saklama",
      "patlayıcı kokusu eğitimi",
      "k-9 kondisyon parkuru",
      "dedektör köpek test"
    ],
    "baslik": "K-9 Dedektör Köpek Arama & Hedef Koku Saklama Eğitimi",
    "ikon": "🐕",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Günlük Sabah İntikal Saati",
    "hazirlikZamani": "Eğitim Odası & Numune Saklama",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🐕 Dedektör görev köpeklerinin koku körlüğünü önlemek için her gün farklı lokasyonlara hedef koku (narkotik/patlayıcı) saklanarak ödüllü arama yaptırılır.",
    "oncedenYapilacaklar": [
      "Hedef koku tüpünü (narkotik veya patlayıcı simülatörü) eldivenle eğitim aracına/odasına gizle",
      "Köpeğin kondisyon parkurunda çeviklik ve komut dinleme egzersizlerini tamamlat",
      "Köpeğe rüzgarı arkasına almayacak açıyla arama komutunu verip pasif/aktif alarm tepkisini izle",
      "Hedef kokuyu bulduğu anda tıklatıcı (clicker) ve ödül topuyla pekiştirip eğitim defterini puanla"
    ]
  },
  {
    "id": "isg_sicak_is_izni_fire_watch",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "sıcak iş izni",
      "hot work permit",
      "yangın gözcüsü fire watch",
      "kaynak iş izni",
      "kıvılcım örtüsü yanmaz"
    ],
    "baslik": "Sıcak İş İzni (Hot Work) & Yangın Gözcüsü (Fire Watch)",
    "ikon": "🔥",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kaynak / Kesim Başlangıcında",
    "hazirlikZamani": "11 Metre Çap Temizliği & Gaz Ölçümü",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🦺 Sıcak çalışma alanının 11 metre yarıçapındaki tüm yanıcılar temizlenmeli; çalışma bitiminden sonra en az 60 dakika yangın gözcüsü nöbet tutmalıdır.",
    "oncedenYapilacaklar": [
      "Kaynak/kesim yapılacak noktanın etrafını yanmaz branda veya kaynak battaniyesi ile izole et",
      "Atmosferde parlayıcı gaz/buhar olmadığını patlayıcı gaz dedektörüyle (LEL %0) doğrula",
      "Çalışma noktasına en az 2 adet 6 kg ABC tozlu ve CO2 yangın tüpünü hazır konuma getir",
      "İş bitiminde en az 60 dakika boyunca kıvılcım için yangın nöbeti (Fire Watch) tutup izin formunu kapat"
    ]
  },
  {
    "id": "isg_kapali_alan_giris_izni_gaz",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "kapalı alan giriş izni",
      "enclosed space permit",
      "4 gaz ölçüm cihazı",
      "oksijen %20.9",
      "tripod kurtarma vinci"
    ],
    "baslik": "Kapalı Alan Giriş İzni & 4'lü Gaz Ölçümü (O2, LEL, CO, H2S)",
    "ikon": "🕳️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Girişten Hemen Önce",
    "hazirlikZamani": "Cebri Havalandırma (Min. 30 Dk)",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🦺 Tank, kanalizasyon ve silo girişlerinde O2 seviyesi %19.5 - %23.5 olmalı; tripod kurtarma vinci ve dış gözlemci olmadan girilemez.",
    "oncedenYapilacaklar": [
      "Kapalı alan kapağını açarak fan ve esnek boru ile en az 30 dakika taze hava bas (cebri ventilasyon)",
      "Kalibrasyonlu 4'lü gaz dedektörü pompalı probu ile dip, orta ve üst seviyelerden gaz ölçümü yap",
      "O2 (%20.9), LEL (%0), H2S (0 ppm) ve CO (0 ppm) değerlerinin güvenli olduğunu doğrula",
      "Çalışana paraşüt tipi emniyet kemeri giydirip tripod kurtarma vinci halatına bağla ve kapıda gözlemci görevlendir"
    ]
  },
  {
    "id": "isg_iskele_kurulum_scafftag_yesil",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "iskele kontrol etiketi",
      "yeşil scaftag",
      "scafftag onayı",
      "iskele topraklaması",
      "cephe iskelesi muayene"
    ],
    "baslik": "Cephe İskelesi Kontrolü & Yeşil Etiket (Scafftag) Onayı",
    "ikon": "🪜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Haftalık / Fırtına Sonrası",
    "hazirlikZamani": "İskele Yetkili Uzman Muayenesi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🦺 Yapı İşlerinde İSG Yönetmeliği gereği cephe iskeleleri yetkili teknik eleman tarafından haftada bir ve fırtına sonrası denetlenip yeşil etiket asılmalıdır.",
    "oncedenYapilacaklar": [
      "İskelenin binaya ankraj bağlantı noktalarının (min. her 4 direkte bir) sağlamlığını tork anahtarıyla kontrol et",
      "Yürüme platformlarında boşluk olmadığını, çift sıra korkuluk ve 15 cm topuk levhası (tekmelik) olduğunu teyit et",
      "İskele ayaklarının taban plakası ve ahşap takozlar üzerine bastığını, gövde topraklamasının yapıldığını doğrula",
      "İskele merdiven girişindeki Scafftag tutucusuna yetkili imzasını taşıyan Yeşil Kullanım Etiketini tak"
    ]
  },
  {
    "id": "isg_dikey_yasam_hatti_lanyard",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "dikey yaşam hattı",
      "çift kollu lanyard",
      "şok emici lanyard",
      "paraşüt tipi emniyet kemeri",
      "en 355 lanyard"
    ],
    "baslik": "Yüksekte Çalışma Dikey Yaşam Hattı & EN 355 Şok Emici",
    "ikon": "🪢",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yüksekte İşe Başlamadan Önce",
    "hazirlikZamani": "Kemer & Halat Gözle Muayenesi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🦺 2 metreyi aşan seviye farklarında düşmeyi durdurucu EN 361 paraşüt tipi kemer ve EN 355 çift kollu şok emicili lanyard zorunludur.",
    "oncedenYapilacaklar": [
      "Emniyet kemerinin dikişlerinde sökük, metal D halkalarında çatlak veya kimyasal yanık olmadığını incele",
      "Çift kollu lanyardın şok emici paketinin daha önce açılmamış olduğunu ve karabina emniyet kilitlerini test et",
      "Paslanmaz çelik/halat dikey yaşam hattına takılan halat tutucunun (kılavuzlu düşme önleyici) kilitleme mekanizmasını sına",
      "Merdiven tırmanışında daima %100 bağlı kalma kuralına (en az bir kanca ankrajda) riayet et"
    ]
  },
  {
    "id": "isg_sgk_is_kazasi_3_gun",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "iş kazası bildirimi",
      "sgk 3 iş günü",
      "kaza araştırma raporu",
      "iş kazası vizite",
      "sgk kaza bildirimi"
    ],
    "baslik": "SGK İş Kazası Bildirimi & Kaza Araştırma Raporu (3 İş Günü)",
    "ikon": "📋",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kazadan Sonraki 3 İş Günü İçinde",
    "hazirlikZamani": "Olay Yeri Fotoğraf & Şahit İfadeleri",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🦺 5510 sayılı Kanun m. 13 uyarınca iş kazası meydana geldiği tarihten itibaren en geç 3 iş günü içinde SGK e-Sigorta portalına bildirilmelidir.",
    "oncedenYapilacaklar": [
      "Kazazedenin ilk yardım ve hastaneye sevk sürecini organize edip genel sağlık durumunu takip et",
      "Olay yerini güvenlik şeridine alarak fotoğraflar çek, kazanın oluş anındaki ekipman ve zemin durumunu tespit et",
      "Görgü tanıklarının ıslak imzalı kaza beyan tutanaklarını al ve Kök Neden Analizi (Kaza Raporu) düzenle",
      "SGK İş Kazası ve Meslek Hastalığı e-Bildirge sistemine 3 iş günü dolmadan veri girişini tamamla"
    ]
  },
  {
    "id": "guvenlik_olay_yeri_inceleme_kriminal_parmak_izi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "olay yeri inceleme",
      "parmak izi transfer folyosu",
      "delil numaralandırma üçgeni",
      "sarı güvenlik şeridi",
      "kriminal kovan zarflama"
    ],
    "baslik": "Olay Yeri İnceleme, Güvenlik Şeridi & Kriminal Delil Zinciri",
    "ikon": "🔍",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Olay Bildirildiğinde Derhal",
    "hazirlikZamani": "Çevre Emniyeti & Kontamine Olmamış Koridor",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "👮 Olay yerinde tek giriş-çıkışlı güvenli koridor açılmalı; deliller numaralandırılmadan ve 3 açılı fotoğraflanmadan kesinlikle yerinden oynatılamaz.",
    "oncedenYapilacaklar": [
      "\"Polis Girilmez\" sarı şeridini geniş yarıçaplı çekerek meraklı kalabalık ve ilgisiz personeli dışarıda tut",
      "Tulum, eldiven, maske ve galoş giyerek delil kontaminasyonunu önle",
      "Kovan, mermi çekirdeği ve kan izlerinin yanına sarı numaralı delil üçgenlerini koyup genel, orta ve makro fotoğraflarını çek",
      "Parmak izi manyetik tozuyla tespit edilen gizli izleri folyoya alıp delil torbasına barkod ve mühürle koy"
    ]
  },
  {
    "id": "guvenlik_arac_arama_adli_onleme_aramalari_pvska",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "adli ve önleme araması",
      "pvsk m. 9",
      "araç kontrol noktası",
      "hâkim arama kararı",
      "bagaj torpido arama tutanağı"
    ],
    "baslik": "Yol Kontrol Noktası & Önleme/Adli Araç Arama Protokolü (PVSK 9)",
    "ikon": "🛑",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Uygulama Başlama Saati",
    "hazirlikZamani": "Kapan, Reflektif Yelek & İkiz Görevli Emniyeti",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👮 PVSK Ek m. 9 uyarınca gecikmesinde sakınca bulunan haller hariç, araçların kapalı bagaj ve torpido bölmeleri hakim veya mülki amir kararı olmadan aranamaz.",
    "oncedenYapilacaklar": [
      "Yol kontrol noktasında en az 100 metre önceden ışıklı uyarı levhaları, dubalar ve tepe lambalı ekip otosunu konuşlandır",
      "Nöbetçi savcılık veya mülki amirlik önleme arama kararının tarih ve saat geçerliliğini teyit et",
      "Durdurulan aracın motorunu durdurtup kontak anahtarını aldırt; sürücü ve yolcuları güvenli alana al",
      "Aramayı araç sahibinin bizzat gözü önünde yap ve arama tutanağını taraflara imzalat"
    ]
  },
  {
    "id": "guvenlik_hava_savunma_stinger_manpads_nisangah",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "alçak irtifa hava savunma",
      "stinger manpads",
      "dost düşman tanıma iff",
      "termal nişangah kilitlenme",
      "hava gözetleme radarı"
    ],
    "baslik": "Portatif Hava Savunma (MANPADS) & IFF Sorgulama Nöbeti",
    "ikon": "🎯",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Hava İkaz / Alarm Durumunda",
    "hazirlikZamani": "Batarya-Soğutucu Ünite (BCU) Montajı",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "🪖 Alçak irtifa hava savunmada IFF (Dost-Düşman Tanıma) sorgulaması olumsuz sonuçlanmadan ve angajman onayı gelmeden atış yapılamaz.",
    "oncedenYapilacaklar": [
      "Füze lançerine Batarya Soğutucu Üniteyi (BCU) takarak arayıcı başlığın argon gazıyla soğutulmasını başlat",
      "Erken ihbar radarından gelen temas verilerini (irtifa, yaklaşma sürati ve kerteriz) taktik telsizden al",
      "Hedef tespit edildiğinde optik nişangah ile takip et ve IFF sorgu butonuna basarak \"Dost\" sinyali olmadığını doğrula",
      "Sesli kilitlenme tonu (lock-on audio) duyulduğunda süpersonik fırlatma motoru tetiğini emniyet mandalından çıkar"
    ]
  },
  {
    "id": "guvenlik_yangin_arama_kurtarma_duman_havalandirma_ppv",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "pozitif basınçlı havalandırma ppv",
      "yangında duman tahliyesi",
      "termal kamera ile canlı arama",
      "flashover engelleme",
      "itfaiye arama kurtarma"
    ],
    "baslik": "İtfaiye Pozitif Basınçlı Havalandırma (PPV) & Flashover Engelleme",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "İçeri Girişten Hemen Önce",
    "hazirlikZamani": "Egzoz Açıklığı (Tahliye Penceresi) Tespiti",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🚒 PPV fanı çalıştırmadan önce içeride mutlaka çıkış/egzoz açıklığı oluşturulmalıdır; aksi takdirde sıcak gazlar flashover yaratıp itfaiyeciyi yakar.",
    "oncedenYapilacaklar": [
      "Giriş kapısı önüne yüksek debili benzinli veya elektrikli PPV fanını kapıyı tam kapatacak koni şeklinde yerleştir",
      "Yangın odasının rüzgar altı yönünde bir pencere veya çatı kapağı açarak çıkış yolu sağla",
      "Fanı çalıştırarak temiz hava bas ve dumanı dışarı süpürürken termal kamera ile taban seviyesinden ilerle",
      "Sıcaklık düşüşünü takip ederek arama-kurtarma ekibini kılavuz ipi eşliğinde odaya sok"
    ]
  },
  {
    "id": "guvenlik_hava_us_kurtarma_pararescue_triage",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "muharebe arama kurtarma mak",
      "csar harekatı",
      "kaza kırım triage",
      "helikopter vinç tahliye hoist",
      "paraşütlü arama kurtarma"
    ],
    "baslik": "Muharebe Arama Kurtarma (MAK/CSAR) & Helikopter Vinç Tahliyesi",
    "ikon": "🚁",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Düşen Hava Unsuru Sinyalinde",
    "hazirlikZamani": "Kişisel Kurtarma Feneri & Şifreli Kimlik Teyidi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🪖 Pilotun kaza koordinatına inildiğinde önce şifreli soru-cevap ile kimlik teyidi yapılır; düşman pusu ihtimaline karşı helikopter vinç operasyonu 2 dakikayı geçemez.",
    "oncedenYapilacaklar": [
      "Acil durum lokasyon vericisi (ELT) sinyalini radyo yön bulucu ile triangüle et",
      "Kurtarma personeli helikopter vinç halatıyla (hoist) ağaçlık veya engebeli araziye iniş yapsın",
      "Yaralı pilotun boyunluk ve omurga tahtasıyla stabilizasyonunu sağla ve kurtarma sepetine (stokes litter) bağla",
      "Helikopter kabinine \"çek\" komutunu verip telsizle güvenli bölgeye intikali başlat"
    ]
  },
  {
    "id": "isg_gurultu_dozimetresi_ve_maruziyet_sinir_degeri",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "gürültü kişisel maruziyet dozimetresi",
      "lex 8 saat gürültü",
      "en yüksek maruziyet eylem değeri 85 dba",
      "kulak koruyucu snr değeri",
      "odyometri işitme testi"
    ],
    "baslik": "Gürültü Kişisel Dozimetre Ölçümü & 85 dBA Eylem Düzeyi",
    "ikon": "🎧",
    "renk": "#FEF3C7",
    "varsayilanZaman": "8 Saatlik Vardiya Süresince",
    "hazirlikZamani": "Tip 2 Akustik Kalibratör (94 dB) Ayarı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🦺 Çalışanların Gürültüden Korunması Yönetmeliği gereği günlük maruziyet 85 dBA aşıldığında kulak koruyucu kullanımı kanunen zorunludur (Sınır değer 87 dBA).",
    "oncedenYapilacaklar": [
      "Gürültü dozimetresini 94 dB kalibratör ile kalibre edip çalışanın omzuna (kulağa 10 cm mesafede) tak",
      "Vardiya boyunca gürültünün Lex 8 saat eşdeğer sürekli ses düzeyini (dBA) kaydet",
      "85 dBA eylem değerini aşan pres ve kırma bölümlerine gürültü haritası ve koruyucu donanım levhası as",
      "İşitme kaybı riskine karşı çalışanların periyodik odyometri testlerini İşyeri Hekimine ilet"
    ]
  },
  {
    "id": "isg_titresim_maruziyeti_hav_vibration_el_kol",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "el kol titreşimi hav",
      "günlük maruziyet sınır değeri 5 m/s2",
      "beyaz parmak sendromu raynaud",
      "titreşim önleyici eldiven",
      "titreşim ivmeölçer"
    ],
    "baslik": "El-Kol Titreşimi (HAV) Maruziyet Ölçümü & İvmeölçer Analizi",
    "ikon": "🔨",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kırıcı / Taşlama Operasyonlarında",
    "hazirlikZamani": "Üç Eksenli (X,Y,Z) İvmeölçer Sensörü Montajı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🦺 El-Kol Titreşim Yönetmeliği uyarınca 8 saatlik maruziyet eylem değeri 2.5 m/s2, maruziyet sınır değeri ise 5 m/s2'dir; aşılması halinde rotasyon zorunludur.",
    "oncedenYapilacaklar": [
      "Pnömatik veya elektrikli el aletinin kabzasına 3 eksenli titreşim sensörünü kelepçele",
      "Operatörün fiili alet kullanma süresini kronometre ile ölçüp A(8) eşdeğer ivme değerini hesapla",
      "Vibrasyon azaltıcı (anti-vibe) tutamak ve ISO 10819 onaylı titreşim eldivenlerini temin et",
      "Reynaud (Beyaz Parmak) sendromuna karşı çalışanların çalışma-dinlenme periyotlarını düzenle"
    ]
  },
  {
    "id": "isg_kimyasal_depolama_seveso_uyumsuzluk_matrisi",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "kimyasal depolama matrisi",
      "seveso büyük endüstriyel kaza",
      "asit baz birlikte depolanamaz",
      "kimyasal döküntü kiti absorban",
      "ex-proof kimyasal depo havalandırma"
    ],
    "baslik": "Kimyasal Depolama Çapraz Uyumsuzluk Matrisi & SEVESO",
    "ikon": "🧪",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Depo Mal Kabulünde",
    "hazirlikZamani": "MSDS Güvenlik Bilgi Formu İncelemesi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🦺 Asitler ve bazlar, yanıcı sıvılar ve oksitleyiciler ASLA aynı tavada depolanamaz; aralarında sızdırmaz toplama havuzu (drip tray) ve yangın duvarı olmalıdır.",
    "oncedenYapilacaklar": [
      "Gelen kimyasalların Türkçe Güvenlik Bilgi Formlarındaki (GBF/MSDS) 7. ve 10. maddeleri kontrol et",
      "Kimyasal Depolama Matrisine göre yeşil (birlikte depolanabilir) ve kırmızı (yasak) sınıfları eşle",
      "Kimyasal tepsisinin (havuzunun) kapasitesinin depolanan en büyük kabın hacminin en az %110'unu karşıladığını doğrula",
      "Depo içine ex-proof alttan süpürmeli havalandırma ve kimyasal döküntü kiti (absorban sosis ve pedler) yerleştir"
    ]
  },
  {
    "id": "isg_forklift_yaya_ayrimi_mavi_isik_blue_spot",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "forklift mavi spot ışık",
      "yaya yürüme yolu çizgisi",
      "forklift yaya çarpışma önleme",
      "kör nokta konveks ayna",
      "forklift hız sınırlayıcı 10 km"
    ],
    "baslik": "Depo İçi Forklift-Yaya Ayrımı, Blue Spot Işık & Hız Sınırı (10 km/h)",
    "ikon": "🚜",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Vardiya Başlangıcında",
    "hazirlikZamani": "Zemin Çizgileri ve Güvenlik Sensörleri",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🦺 Depo içi forklift kazalarını önlemek için forkliftin 5 metre önüne/arkasına vuran mavi spot (Blue Spot) ışık ve fiziksel bariyerli yaya yolları zorunludur.",
    "oncedenYapilacaklar": [
      "Forkliftin yere vuran mavi/kırmızı güvenlik lazer ve LED projeksiyonunun çalıştığını teyit et",
      "Depo içi forklift hız limitörünün 10 km/saat hızına kilitli olduğunu kontrol et",
      "Kör noktalarda geniş açılı konveks güvenlik aynalarının temizliğini ve görüş açısını sağla",
      "Sarı epoksi boyalı yaya yürüyüş yollarının malzeme veya paletlerle işgal edilmediğini denetle"
    ]
  },
  {
    "id": "isg_biyolojik_risk_etmenleri_hepa_filtrasyon_bsl",
    "category": "saglik",
    "domain": "ISG",
    "keywords": [
      "biyolojik risk etmenleri",
      "bsl-2 bsl-3 laboratuvar güvenliği",
      "biyogüvenlik kabini hepa",
      "negatif basınçlı laboratuvar",
      "tıbbi atık otoklav sterilizasyon"
    ],
    "baslik": "Biyolojik Risk Etmenleri & Sınıf II Biyogüvenlik Kabini (BSL)",
    "ikon": "☣️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Mikrobiyoloji Çalışması Öncesi",
    "hazirlikZamani": "Laminer Akış Hızı & HEPA Filtre Duman Testi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🦺 Biyolojik Etkenlere Maruziyet Yönetmeliği uyarınca Grup 2 ve 3 patojenlerle çalışırken Sınıf II Biyogüvenlik Kabini laminer hava perdesi bozulmadan çalışılmalıdır.",
    "oncedenYapilacaklar": [
      "Biyogüvenlik kabinini çalıştırmadan önce UV sterilizasyon lambasını kapatıp fanı 10 dakika önceden aç",
      "Giriş hava hızı bariyerini (inflow min. 0.45 m/s) ve dikey hava akışını (downflow) kalibre anemometre ile doğrula",
      "Kabin içine gereksiz malzeme sokmayarak hava akım kanallarının (grates) kapanmasını engelle",
      "Çalışma bitiminde tüm yüzeyleri %70 etil alkol ile dezenfekte edip tıbbi atıkları sarı otoklav poşetine al"
    ]
  },
  {
    "id": "guvenlik_uyusturucu_madde_narkotik_hizli_test_kiti",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "narkotik hızlı test kiti",
      "şüpheli beyaz toz reaktif test",
      "marquis reaktifi uyuşturucu",
      "adli tıp numune mühürleme",
      "narkotik madde tartım tutanağı"
    ],
    "baslik": "Narkotik Saha Test Kiti (Reaktif Renk) & Hassas Terazi Tartımı",
    "ikon": "🧪",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Şüpheli Madde Ele Geçirildiğinde",
    "hazirlikZamani": "Nitelikli Eldiven & Kalibre Hassas Terazi",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "👮 Şüpheli maddeye asla çıplak elle dokunulmaz (Fentanil emilim riski!); reaktif test tüpü renk değişimi ön tespittir, esas rapor Adli Tıp Kimya İhtisasınca verilir.",
    "oncedenYapilacaklar": [
      "Çift kat nitril eldiven ve FFP3 maske takarak tozu soluma veya ciltten emilme riskini sıfırla",
      "Ambalajlı ve brüt ağırlığı kalibre edilmiş dara düşmeli hassas terazide tartıp fotoğrafla",
      "Numuneden mikrogram düzeyinde alıp Marquis/Duquenois reaktif tüpüne koyarak renk reaksiyonunu gözlemle",
      "Maddeyi adli emanet torbasına koyup güvenlik şeridi ve ıslak imzalı tutanakla mühürle"
    ]
  },
  {
    "id": "guvenlik_cezaevi_x_ray_ve_kacak_esya_aramasi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "cezaevi x-ray bagaj cihazı",
      "kapı tipi metal dedektörü",
      "koğuş arama tutanağı",
      "cezaevi yasaklı madde infaz koruma",
      "el dedektörü üst araması"
    ],
    "baslik": "Ceza İnfaz Kurumu X-Ray Giriş Kontrolü & Koğuş Genel Araması",
    "ikon": "🏢",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Vardiya Girişinde / Ayda Bir Genel Arama",
    "hazirlikZamani": "El Dedektörleri Kalibrasyonu & Arama Heyeti",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👮 Cezaevine giren tüm koli ve eşyalar çift açılı X-Ray cihazından geçer; personelin dahi cep telefonu, akıllı saat veya flash bellek sokması kanunen yasaktır.",
    "oncedenYapilacaklar": [
      "Giriş kapısındaki kapı tipi metal dedektörü ve bagaj X-Ray cihazının organik/inorganik renk ayrımını test et",
      "Kuruma giren tüm ziyaretçi ve avukatların eşyalarını X-Ray konveyörüne alıp monitörden organik gizleme bölgelerini tara",
      "Hükümlü koğuşlarında arama ekibiyle birlikte ranzaların altı, pencere korkulukları ve priz yuvalarını el dedektörüyle kontrol et",
      "Bulunan yasaklı eşya varsa infaz koruma başmemuru refakatinde \"Koğuş Arama ve Zapt Tutanağı\" tanzim et"
    ]
  },
  {
    "id": "guvenlik_hava_indirme_komando_statik_parasut_talimi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "statik hatlı paraşüt atlayışı",
      "t-11 paraşüt kontrolü",
      "c-130 uçaktan atlayış jumpmaster",
      "paraşüt yedek açma kilit mandalı",
      "paraşütçü iniş rüzgar limiti"
    ],
    "baslik": "Komando Hava İndirme: Statik Hatlı Askeri Paraşüt Atlayışı",
    "ikon": "🪂",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Atlayış İrtifasına (1200 Feet) Ulaşıldığında",
    "hazirlikZamani": "Jumpmaster Buddy Check (Kuşanma Kontrolü)",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🪖 Atlayıştan önce Jumpmaster statik kanca, göğüs tokası, bacak kolonları ve yedek paraşüt pimini fiziksel çekerek kontrol eder; yer rüzgarı >15 knot ise atlayış iptal edilir.",
    "oncedenYapilacaklar": [
      "T-11 ana ve T-11R yedek paraşüt kuşamının bacak ve göğüs kilitlerini tam oturt",
      "Uçak kapısına yaklaşırken statik hat kancasını uçağın çelik teline (anchor cable) takıp emniyet pimini kilitle",
      "Jumpmaster'ın \"Yeşil Işık - ÇIK\" komutuyla 45 derece açıyla çıkış yapıp \"Bin bir, bin iki, bin üç, bin dört\" sayarak kubbeyi kontrol et",
      "Yere inişte bacaklar bitişik ve dizler hafif bükülü şekilde 5 nokta taklası ile darbeyi em"
    ]
  },
  {
    "id": "guvenlik_kBRN_dekontaminasyon_ve_kimyasal_koruyucu_c_tipi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "kbrn dekontaminasyon çadırı",
      "kimyasal gaz seviye a tulumu",
      "ap4c kimyasal ajan dedektörü",
      "kbrn arındırma duşu",
      "sarın gazı hardal gazı tespiti"
    ],
    "baslik": "KBRN Olay Yeri Yönetimi, AP4C Gaz Tespiti & Dekontaminasyon Çadırı",
    "ikon": "☣️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "KBRN Şüphesinde Derhal",
    "hazirlikZamani": "Seviye A Gaz Geçirmez Tulum & SCBA Tüpü",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🪖 Sinir gazı (Sarin/VX) ve hardal gazı şüphesinde sıcak bölgeye sadece pozitif basınçlı Seviye A tulumla girilir; çıkışta KBRN arındırma duşu zorunludur.",
    "oncedenYapilacaklar": [
      "Sıcak, ılık ve soğuk bölgeleri rüzgar yönüne göre belirleyip arındırma çadırını rüzgar üstüne kur",
      "AP4C kimyasal dedektörü alev spektrofotometresi ile fosfor, kükürt ve klor ajanlarını tara",
      "Sıcak bölgeden çıkan personeli ve yaralıları nötralize edici solüsyonlu dekontaminasyon duşundan geçir",
      "Kirlenmiş elbiseleri çift kat KBRN atık varillerine basıp mühürle"
    ]
  },
  {
    "id": "guvenlik_sahil_guvenlik_denizde_can_kurtarma_sar_arama_desen",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "sahil güvenlik sar harekatı",
      "denizde arama kurtarma deseni",
      "expanding square arama modeli",
      "denize adam düştü mob şamandırası",
      "termal flir kamera deniz"
    ],
    "baslik": "Sahil Güvenlik: Denizde Arama Kurtarma (SAR) & Arama Deseni",
    "ikon": "🚤",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Denize Adam Düştü (MOB) İhbarında",
    "hazirlikZamani": "IAMSAR Koordinatları & Akıntı/Rüzgar Sapma Hesabı",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "⚓ IAMSAR Kılavuzu uyarınca son görülen mevkide rüzgar ve akıntı sürüklenme vektörleri hesaplanıp \"Genişleyen Kare\" (Expanding Square) arama rotası çizilir.",
    "oncedenYapilacaklar": [
      "Kazazedenin son koordinatını (Datum Point) girip deniz akıntısı ve rüzgar şiddetine göre sürüklenme alanını çiz",
      "Sahil Güvenlik botunda FLIR gece görüş termal kamerasını ve yüksek güçlü arama projektörlerini devreye al",
      "Genişleyen Kare (SS) veya Paralel Hat (PS) arama modelini otopilota girerek 90 derecelik dönüşlerle alanı tara",
      "Kazazede görüldüğünde rüzgar altına manevra yapıp kurtarma ağı veya zodyak bot ile denizden al"
    ]
  },
  {
    "id": "isg_loto_etiketleme_kilitleme_valf_ve_salter_kaseti",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "loto sistemi kilit kutusu",
      "hasp çoklu kilit kilitleme",
      "loto master asma kilit",
      "sıfır enerji doğrulama testi",
      "tehlikeli enerji izolasyonu loto"
    ],
    "baslik": "LOTO (Lockout-Tagout): Çoklu Kilit (Hasp), Vana Kilidi & Sıfır Enerji",
    "ikon": "🔒",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Müdahaleden Hemen Önce",
    "hazirlikZamani": "Kişisel Asma Kilitler, Hasp & İkaz Etiketleri",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🦺 LOTO uygulamasında her teknisyen çoklu kilit aparatına (Hasp) kendi kişisel kilidini takar; enerji kesildikten sonra anahtar çevrilerek sıfır enerji denenmelidir.",
    "oncedenYapilacaklar": [
      "Müdahale edilecek hattın elektrik şalterini indir, hidrolik/pnömatik vanalarını kapat",
      "Şaltere veya vana simidine kelepçe takıp çoklu kilit aparatına (Hasp) her çalışan kendi asma kilidini taksın",
      "Kilit üzerine çalışanın adı, tarihi ve telefonunun yazılı olduğu \"TEHLİKE - ÇALIŞMA VAR DOKUNMA\" etiketini as",
      "Makinenin start butonuna basarak veya multimetre ile gerilim/basınç olmadığını test edip \"Sıfır Enerji Durumu\"nu teyit et"
    ]
  },
  {
    "id": "isg_statik_elektrik_ve_topraklama_pens_tanker_dolum",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "tanker topraklama pensesi",
      "statik elektrik kıvılcım patlama",
      "atex ex-proof dolum kolu",
      "topraklama direnci <10 ohm",
      "parlayıcı sıvı transferi topraklama"
    ],
    "baslik": "Parlayıcı Sıvı Transferi: Tanker Topraklama Pensesi & ATEX Güvenliği",
    "ikon": "⚡",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Dolum Hortumu Bağlanmadan Önce",
    "hazirlikZamani": "Topraklama Pensesi & Süreklilik İkaz Işığı",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "🦺 Akaryakıt/tiner tanker dolumunda hortum bağlanmadan önce topraklama pensesi araca takılmalı; yeşil onay ışığı yanmadan dolum vanası açılamaz.",
    "oncedenYapilacaklar": [
      "Tankerin şasisindeki boyasız metal topraklama noktasına interlock kilitli topraklama pensesini kıskaçla bağla",
      "Otomasyon panosunda topraklama direncinin <10 Ohm olduğunu ve yeşil onay ışığının yandığını teyit et",
      "Dolum operatörünün antistatik ayakkabı ve pamuklu kıyafet giydiğini doğrula",
      "Dolum bittikten sonra önce hortumu sök, damlama tavasına koy ve en son topraklama pensesini çıkar"
    ]
  },
  {
    "id": "isg_is_ekipmani_periyodik_kontrol_fenni_muayene",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "iş ekipmanı periyodik kontrol",
      "fenni muayene raporu akredite",
      "vinç caraskal periyodik test",
      "kompresör hidrostatik basınç testi",
      "ekipnet kayıt numarası kontrol"
    ],
    "baslik": "İş Ekipmanlarının Periyodik Kontrolü & EKİPNET Fenni Muayene",
    "ikon": "📋",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıllık Periyot Dolan Günde",
    "hazirlikZamani": "Test Yükleri (Ağırlıklar) & EKİPNET Uzmanı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🦺 İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği uyarınca vinçler 1.25 katı statik yükle test edilir; raporu EKİPNET kayıtlı uzman vermelidir.",
    "oncedenYapilacaklar": [
      "Muayeneyi yapacak makine mühendisinin Çalışma Bakanlığı EKİPNET kayıt numarasını sorgula",
      "Tavan vinci için nominal kaldırma kapasitesinin 1.25 katı onaylı test ağırlıklarını hazırla",
      "Statik yük testi (10 dakika havada asılı tutma) ve dinamik test (1.1 katı yükle hareket) uygulamalarını izle",
      "Kusursuz çıkan \"Periyodik Kontrol Raporu\"nu onaylatıp vinç üzerine bir sonraki muayene tarih etiketini yapıştır"
    ]
  },
  {
    "id": "isg_acil_durum_kriz_yonetimi_tahliye_ve_toplanma",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "acil durum toplanma bölgesi",
      "fabrika tahliye tatbikatı",
      "acil durum ekipleri yoklama listesi",
      "yangın merdiveni kaçış yönü",
      "tatbikat senaryosu ve raporu"
    ],
    "baslik": "Acil Durum Yönetmeliği: Yılda Bir Tahliye Tatbikatı & Sayım",
    "ikon": "🏃‍♂️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Planlanan Tatbikat Saati (Siren Çaldığında)",
    "hazirlikZamani": "Toplanma Bölgesi Şefi & Güncel Vardiya Personel Listesi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🦺 Binaların Yangından Korunması Yönetmeliği uyarınca yılda en az 1 kez tahliye tatbikatı yapılmalı, toplanma alanında 3 dakikada kafa sayımı tamamlanmalıdır.",
    "oncedenYapilacaklar": [
      "Acil durum sirenini çalarak personelin panik yapmadan acil çıkış yönlendirme tabelalarını izlemesini sağla",
      "Asansörlerin kullanılmadığını, yangın kaçış merdivenlerinin açık olduğunu denetle",
      "Güvenli Acil Durum Toplanma Bölgesinde her bölüm şefinin elindeki güncel vardiya listesiyle kafa sayımı yapmasını sağla",
      "Eksik personel varlığını arama-kurtarma ekibine bildir ve tatbikat süresini tutanakla raporla"
    ]
  },
  {
    "id": "isg_termal_konfor_ve_isi_stresi_wbgt_indeksi",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "wbgt ısı stresi indeksi",
      "termal konfor ölçümü",
      "yaş küre sıcaklığı dökümhane",
      "sıcak çarpması rotasyon molası",
      "nem ve hava akım hızı anemometre"
    ],
    "baslik": "Termal Konfor & WBGT (Yaş Hazneli Küre Sıcaklığı) Isı Stresi",
    "ikon": "🌡️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Yaz Aylarında / Dökümhane Vardiyasında",
    "hazirlikZamani": "WBGT Isı İndeksi Ölçüm Cihazı Kalibrasyonu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🦺 Ağır iş kollarında WBGT indeksi 28°C'yi aştığında her saat başı 15-30 dakika serin dinlenme molası ve elektrolitli sıvı desteği kanunen zorunludur.",
    "oncedenYapilacaklar": [
      "WBGT cihazının doğal yaş hazne, siyah küre ve kuru termometre haznelerini doldurup ortamda 15 dk dengele",
      "Güneşli veya kapalı mekan formülüne göre WBGT indeksini hesapla",
      "Çalışanın fiziksel iş yüküne göre (hafif, orta, ağır) izin verilen maksimum maruziyet sınırını denetle",
      "Eşik aşıldığında çalışanlara serin dinlenme odası, gölgelik ve tuzlu ayran/elektrolit takviyesi organize et"
    ]
  },
  {
    "id": "guvenlik_bomba_imha_uzaktan_fuze_ve_jammer_frekans",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "şüpheli paket bomba imha",
      "radyo frekans jammer sinyal kesici",
      "bomba imha su topu robotu",
      "300 metre emniyet çemberi bomba",
      "bomba uzmanı zırhlı kıyafet eod"
    ],
    "baslik": "Bomba İmha: Şüpheli Paket, RF Jammer & Su Topu (Water Cannon)",
    "ikon": "💣",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Şüpheli Paket İhbarında Derhal",
    "hazirlikZamani": "300 Metre Tahliye & Jammer Sinyal Bastırma",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "👮 Şüpheli pakete cep telefonuyla yaklaşılmaz; taşınabilir Jammer açılarak telsiz/GSM frekansları kesilir ve robot su topuyla paket uzaktan etkisiz kılınır.",
    "oncedenYapilacaklar": [
      "Olay yerini çevre binaları tahliye ederek en az 300 metrelik güvenlik kordonuna al",
      "Radyo kontrollü el yapımı patlayıcı (RCIED) riskine karşı sırt tipi RF Jammer cihazını devreye al",
      "Bomba imha robotunu (EOD Robot) uzaktan kumandayla paketin yanına sürerek kamera ile fünye ve kablo yapısını incele",
      "Robot üzerindeki yönlendirilmiş su topunu (disrupter) ateşleyerek devreleri milisaniyede tahrip et"
    ]
  },
  {
    "id": "guvenlik_trafik_alkol_promil_ve_uyusturucu_test_cihazi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "alkolmetre promil sınırı 0.50",
      "uyuşturucu test kiti tükürük drager",
      "alkol ölçümünü reddetme 2 yıl ceza",
      "adli kan örneği promil tespiti",
      "ktk 48/5 sürücü belgesi geri alma"
    ],
    "baslik": "Trafik Denetimi: Dijital Alkolmetre & Tükürükten Uyuşturucu Analizi (KTK 48)",
    "ikon": "🛑",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yol Uygulaması Sırasında",
    "hazirlikZamani": "Steril Ağızlık & Dijital Alkolmetre Kalibrasyonu",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "👮 Hususi araçta 0.50 promil, ticari araçta 0.20 promil yasal sınırdır; ölçümü reddeden sürücünün ehliyetine 2 yıl el konur ve en yakın hastaneye sevk edilir.",
    "oncedenYapilacaklar": [
      "Sürücünün önünde ambalajından steril plastik ağızlığı çıkarıp alkolmetre yuvasına tak",
      "Sürücüye ciğerlerindeki derin havayı 5 saniye kesintisiz üfleterek promil sonucunu cihaz ekranında gör",
      "Uyuşturucu şüphesinde tükürük numunesi toplama kitiyle 8 farklı etken maddeyi 5 dakikada tara",
      "0.50 promil üzeri tespit halinde idari para cezası ve ehliyet geri alma tutanağını tebliğ edip aracı trafikten men et"
    ]
  },
  {
    "id": "guvenlik_hudut_sinir_devriyesi_termal_durbun_ve_kobra",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "hudut devriyesi termal kamera",
      "sınır hattı pusulama gözetleme",
      "modüler beton duvar devriyesi",
      "yasadışı sınır geçişi engelleme",
      "zırhlı kobra araç kule nöbeti"
    ],
    "baslik": "Hudut Güvenliği: Elektro-Optik Kule Gözetleme & Zırhlı Devriye",
    "ikon": "🪖",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Gece Görüş Devriye Saatlerinde",
    "hazirlikZamani": "Soğutmalı Termal Dürbün & Taktik Telsiz Frekansı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🪖 Sınır hattında modüler beton duvar ve jiletli teller üzerinde termal kamera ile gece boyu sürekli 360 derece sektör taraması yapılır; temas derhal üsse raporlanır.",
    "oncedenYapilacaklar": [
      "Elektro-optik gözetleme kulesindeki termal kameranın odak ve kontrast ayarlarını kalibre et",
      "Zırhlı devriye aracının (Kobra/Vuran) telsiz irtibatını ve kule silah kulesi mühimmatını kontrol et",
      "Sınır fiziki güvenlik hattı (SFGS) boyunca tel örgü ve aydınlatma direklerinin sağlamlığını gözle",
      "Termal ekranda insan/ısı silueti tespit edildiğinde koordinatı ani müdahale timine (AMT) telsizle bildir"
    ]
  },
  {
    "id": "guvenlik_yangin_arama_kurtarma_dalgic_su_alti_bot",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "kurbağa adam su altı arama",
      "itfaiye su altı arama kurtarma",
      "baraj gölü ceset arama dedektör",
      "tam yüz dalış maskesi aga mask",
      "dalgıç güvenlik kılavuz ipi"
    ],
    "baslik": "İtfaiye / Polis Su Altı Arama Kurtarma: Kurbağa Adam & Dalış Emniyeti",
    "ikon": "🤿",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Suda Boğulma / Kayıp İhbarında",
    "hazirlikZamani": "Dalış Tüpleri (200 Bar) & Kuru Elbise Kuşanma",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👮 Akıntılı veya görüş mesafesi sıfır sularda dalgıç kılavuz ipi (line) olmadan ASLA suya giremez; bot üzerindeki nöbetçi dalgıç hazır bekler.",
    "oncedenYapilacaklar": [
      "Dalış tüplerinin manometre basıncını (min. 200 Bar) ve regülatör hava akışını test et",
      "Kuru elbise (drysuit) ve haberleşme sistemli tam yüz (Aga) maskesini kuşan",
      "Kıyıdan veya zodyak bottan suya giren dalgıcın beline emniyet kılavuz ipini bağlayıp dış gözlemciye teslim et",
      "Dairesel veya süpürme arama modeliyle taban çamurunu elle tarayarak arama faaliyetini icra et"
    ]
  },
  {
    "id": "guvenlik_savci_nezaretinde_olu_muayenesi_ve_otopsi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "ölü muayene tutanağı",
      "adli tıp otopsi cmk 87",
      "ölüm katılığı rigor mortis",
      "ölüm morluğu livor mortis",
      "savcı adli tıp uzmanı tutanak"
    ],
    "baslik": "Adli Soruşturma: Ölü Muayenesi & Klasik Otopsi Protokolü (CMK 87)",
    "ikon": "🔍",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Şüpheli Ölüm Vakalarında Derhal",
    "hazirlikZamani": "Adli Tıp Hekimi & Olay Yeri Savcısı Koordinasyonu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "👮 CMK m. 87 gereğince ölü muayenesi Cumhuriyet Savcısı ve hekim huzurunda yapılır; ölüm belirtileri (morluk, katılık, ısı) tutanağa ayrıntılı işlenir.",
    "oncedenYapilacaklar": [
      "Cesedin bulunduğu ortamın ortam ısısını, ceset rektal ısısını ve post-mortem aralığı kaydet",
      "Ölüm morluklarının (livor mortis) basmakla solup solmadığını ve ölüm katılığını (rigor mortis) muayene et",
      "Dış muayenede travmatik lezyon, ateşli silah giriş-çıkış deliği veya kesici alet izlerini fotoğrafla",
      "Kesin ölüm sebebinin belirlenememesi halinde savcılık talimatıyla cesedi sistematik otopsi için Adli Tıp Kurumuna sevk et"
    ]
  },
  {
    "id": "isg_kapali_alan_giris_izni_4_gaz_olcum",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "kapalı alan giriş izni",
      "4 gaz ölçüm cihazı",
      "lel oksijen hidrojen sülfür",
      "confined space permit",
      "kapalı alan gözlemci ve tripod"
    ],
    "baslik": "Kapalı Alan Giriş İzni (Confined Space) & 4 Gaz Ölçüm Güvenlik Protokolü",
    "ikon": "🪖",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Girişten Hemen Önce (0-15 Dakika)",
    "hazirlikZamani": "Kalibre Edilmiş Portatif 4 Gaz Ölçüm Cihazı (Bump Test)",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "☣️ Kapalı alana girmeden önce O2 (%19.5 - %23.5), Patlayıcı Gaz (LEL <%10), Karbonmonoksit (CO < 25 ppm) ve H2S (< 5 ppm) seviyeleri ölçülmeden asla girilemez.",
    "oncedenYapilacaklar": [
      "Giriş öncesi gaz dedektörü pompalı probu ile derinlik, orta ve tavan seviyelerinde ayrı ayrı gaz ölçümü yap",
      "Cebri havalandırma (salyangoz fan ve esnek boru) ile ortamı sürekli taze havayla besle",
      "Giriş ağzına kurtarma tripodu, mekanik vinç, geri sarımlı düşüş durdurucu ve dışarıda bekleyen eğitimli nöbetçi (gözlemci) konuşlandır",
      "Tüm çalışanlar ve İSG uzmanı/mühendis tarafından imzalanmış \"Kapalı Alan Çalışma İzin Belgesi\"ni girişe as"
    ]
  },
  {
    "id": "isg_iskele_yesil_etiket_scafftag_ankraj_denetimi",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "iskele yeşil etiket scafftag",
      "ts en 12810 iskele kontrol",
      "iskele ankraj testi",
      "kırmızı etiketli iskele kullanılmaz",
      "haftalık iskele muayene formu"
    ],
    "baslik": "Ön Yapımlı Cephe İskelesi Yeşil Etiket (Scafftag) & Ankraj Periyodik Denetimi",
    "ikon": "🪜",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Haftalık Denetim & Fırtına Sonrası İlk Mesai",
    "hazirlikZamani": "Tork Anahtarı, Su Terazisi ve İskele Kontrol Formu",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏗️ TS EN 12810 standartlarına göre yetkili teknik eleman tarafından haftada en az bir kez ve her şiddetli fırtına sonrasında denetlenmeyen iskelede Yeşil Etiket (Scafftag) geçerliliğini yitirir.",
    "oncedenYapilacaklar": [
      "İskele taban plakalarının sağlam zemine oturduğunu ve kriko millerinin aşırı açılmadığını kontrol et",
      "Binaya yapılan mekanik ankraj bağlantılarının yeterli sayıda ve sağlam olduğunu tork anahtarıyla yokla",
      "Tüm çalışma platformlarında çift sıra korkuluk, topuk levhası (tekmelik - min 15 cm) ve kapaklı merdivenleri denetle",
      "Uygunsa \"KULLANILABİLİR - YEŞİL ETİKET\"i giriş noktasına as ve imzanı at"
    ]
  },
  {
    "id": "isg_is_kazasi_bildirimi_sgk_3_is_gunu_isg_katip",
    "category": "resmi",
    "domain": "ISG",
    "keywords": [
      "iş kazası bildirimi sgk",
      "3 iş günü iş kazası",
      "isg katip kaza bildirimi",
      "6331 sayılı kanun madde 14",
      "iş kazası kaza araştırma tutanağı"
    ],
    "baslik": "6331 Sayılı Kanun Kapsamında İş Kazası SGK Bildirimi (3 İş Günü) & Kök Neden Analizi",
    "ikon": "⚠️",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Kazadan Sonraki 3 İş Günü İçinde",
    "hazirlikZamani": "Görgü Tanığı İfadeleri & Kaza Yeri Fotoğrafları",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "⚖️ 6331 sayılı İSG Kanunu m. 14 ve 5510 sayılı Kanun m. 13 uyarınca iş kazası, kazadan sonraki 3 iş günü içinde SGK’ya elektronik ortamda bildirilmek zorundadır.",
    "oncedenYapilacaklar": [
      "Kazazedenin ilk yardım ve hastaneye sevkini sağla; genel adli muayene raporunu temin et",
      "Kaza mahallinde olay yeri incelemesi yaparak emniyetsiz durum ve hareketleri fotoğrafla",
      "İSG kurulu üyeleriyle \"Balık Kılçığı\" veya \"5 Neden\" kök neden analiz raporunu hazırla",
      "SGK e-Bildirge portalı ve İSG-KATİP üzerinden 3 iş günlük yasal süreyi geçirmeden bildirimi onayla"
    ]
  },
  {
    "id": "isg_kimyasal_gbf_sds_16_baslik_maruziyet",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "güvenlik bilgi formu gbf sds",
      "kimyasal madde 16 başlık sds",
      "mesleki maruziyet sınır değeri oel",
      "kimyasal depolama matrisi",
      "türkçe sds kontrolü"
    ],
    "baslik": "Kimyasal Maddelerle Çalışmalarda Güvenlik Bilgi Formu (GBF/SDS) Denetimi",
    "ikon": "☣️",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Kimyasal Sahaya Girmeden Önce",
    "hazirlikZamani": "Akredite Türkçe 16 Başlıklı GBF/SDS Dosyası",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🧪 Kimyasalların SDS belgeleri akredite uzman tarafından hazırlanmış Türkçe ve 16 başlıktan oluşmalı; Bölüm 8 Mesleki Maruziyet Sınır Değerleri (OEL/TWA) sahada uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Sahaya gelen boya, solvent veya asitlerin Türkçe SDS Bölüm 2 Tehlike Tanıtımı ve P/H ifadelerini incele",
      "Kimyasal depolama alanında birbiriyle reaksiyona girebilecek (uyumsuz) maddeleri uyumluluk matrisine göre ayır",
      "Bölüm 8’de belirtilen solunum koruyucu maske filtre tipini (A, B, E, K, P3) çalışanlara zimmetle",
      "Acil durum göz/vücut duşlarının ve döküntü kitlerinin hazır olduğunu doğrula"
    ]
  },
  {
    "id": "isg_yangin_tahliye_tatbikati_senaryo_rapor_yillik",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "yangın tahliye tatbikatı",
      "yıllık acil durum tatbikatı",
      "toplanma bölgesi yoklama",
      "tatbikat raporu formu",
      "binaların yangından korunması yönetmeliği"
    ],
    "baslik": "Yıllık Acil Durum Yangın ve Tahliye Tatbikatı & Raporlama Protokolü",
    "ikon": "🔥",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Yıllık Planlanan Tatbikat Günü (14:30)",
    "hazirlikZamani": "Acil Durum Ekipleri Görev Listesi & Kronometre",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🚒 Binaların Yangından Korunması Hakkında Yönetmelik ve İSG Acil Durumlar Yönetmeliği gereği tatbikatlar yılda en az 1 kez yapılmalı ve raporlanmalıdır.",
    "oncedenYapilacaklar": [
      "Yangın, arama-kurtarma, ilk yardım ve tahliye ekiplerine tatbikat senaryo brifingi ver",
      "Alarm çalınmasıyla birlikte tüm personelin kaçış merdivenlerinden toplanma bölgesine intikal süresini kronometreyle ölç",
      "Toplanma alanında kat sorumluları eşliğinde personel yoklaması yap",
      "Tatbikat sonrası aksayan yönleri, yangın kapılarının kapanma durumunu tutanağa geçirip İSG kurulunda görüş"
    ]
  },
  {
    "id": "guvenlik_parmak_izi_afis_sistemi_on_parmak_alma",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "afis parmak izi alma",
      "on parmak yuvarlama baskı",
      "avuç içi tarama adli",
      "pvska m. 5 parmak izi alma",
      "kriminal polis veri tabanı afis"
    ],
    "baslik": "Kriminalistik: AFİS On Parmak & Avuç İçi Biyometrik Kayıt (PVSK 5)",
    "ikon": "🔍",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Gözaltı / Kimlik Tespiti İşlemlerinde",
    "hazirlikZamani": "Elektronik Canlı Parmak İzi Tarayıcı (LiveScan)",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "👮 PVSK m. 5 gereği gözaltına alınanların parmak izi tırnak kenarından tırnak kenarına yuvarlanarak eksiksiz alınır; AFİS veri tabanında faili meçhullerle otomatik sorgulanır.",
    "oncedenYapilacaklar": [
      "Kişinin ellerini ıslak mendille temizleyip ter ve yağ kalıntılarından arındır",
      "Canlı optik tarayıcı üzerinde baş parmaktan serçe parmağa kadar her parmağı 180 derece yuvarlayarak düzgün delta ve göbek paternini yakala",
      "Dört parmak eşzamanlı basma ve ayası/avuç içi taramasını tamamla",
      "AFİS sistemine kaydedip geçmiş suç kayıtları veya olay yeri parmak izleriyle eşleşme (Hit) sorgusunu al"
    ]
  },
  {
    "id": "guvenlik_keskin_nisanci_sniper_ruzgar_kestirimi_mrad",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "keskin nişancı dürbün ayarı",
      "mil-dot mrad klik hesabı",
      "kestrel anemometre rüzgar",
      "balistik hesaplayıcı mermi düşümü",
      "spotter gözetleyici nişancı koordinasyon"
    ],
    "baslik": "Özel Kuvvetler: Keskin Nişancı Balistik Rüzgar & MRAD Klik Hesabı",
    "ikon": "🎯",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Mevziye Yerleşildiğinde / Hedef Takibinde",
    "hazirlikZamani": "Lazer Mesafe Ölçer, Kestrel Hava İstasyonu & Balistik Tablo",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🪖 800 metre üzeri atışta Coriolis kuvveti, hava basıncı ve çapraz rüzgar mermiyi metrelerce saptırır; Spotter Kestrel rüzgar okumasıyla dürbüne MRAD taret kliği verir.",
    "oncedenYapilacaklar": [
      "Lazer telemetre ile hedefe olan net mesafeyi (slant range) ve atış açısını ölç",
      "Kestrel balistik cihazından hava sıcaklığı, barometrik basınç, nem ve rüzgar saat yönünü (örn: saat 3 yönü 4 m/s) al",
      "Merminin kovan çıkış hızına (Muzzle Velocity) göre dikey düşüm (Elevation) ve yatay rüzgar (Windage) MRAD kliklerini dürbün taretine işle",
      "Spotter ve Nişancı \"Hazır - Atış - Vuruş\" disipliniyle hedefi nefes verme anında etkisiz hale getirsin"
    ]
  },
  {
    "id": "guvenlik_patlayici_madde_eod_supheli_paket_jammer",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "şüpheli paket fünye ile patlatma",
      "bomba imha uzmanı eod",
      "radyo frekans jammer bomba",
      "su jeti ile şüpheli paket etkisiz",
      "bomba koruyucu kıyafet eod-9"
    ],
    "baslik": "Bomba İmha (EOD): Şüpheli Paket, RF Sinyal Kesici (Jammer) & Su Jeti",
    "ikon": "💣",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İhbar Alındığında Derhal",
    "hazirlikZamani": "EOD-9 Ağır Koruyucu Bomba Elbisesi & Robot Hazırlığı",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "👮 Şüpheli pakete uzaktan kumandalı patlatma riskine karşı geniş bant Jammer açılmadan yaklaşılmaz; paket taşınmaz, bomba robotu su jeti (disrupter) ile vurulur.",
    "oncedenYapilacaklar": [
      "Olay yeri çevresinde en az 100 metrelik güvenlik kordonu çekip gaz ve elektrik vanalarını kestir",
      "Telsiz ve cep telefonu sinyallerini körleştirmek için sırt tipi yüksek güçlü Jammer cihazını devreye al",
      "Bomba imha robotunu (EOD Robot) uzaktan kumandayla paketin yanına sürerek X-Ray görüntüsü al",
      "Paketin fünye devresini sıvı dinamik darbe ile parçalamak için yüksek basınçlı su jeti disrupter atışı yap"
    ]
  },
  {
    "id": "guvenlik_helikopter_inme_bolgesi_lz_landing_zone_isaretleme",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "helikopter iniş alanı lz",
      "landing zone duman kandili",
      "gece iniş feneri kaza kırım",
      "helikopter rüzgar yönü başa alma",
      "yabancı madde fodu temizliği heliped"
    ],
    "baslik": "Taktik İntikal: Helikopter İniş Alanı (LZ) Seçimi & Dumanla İşaretleme",
    "ikon": "🚁",
    "renk": "#FED7AA",
    "varsayilanZaman": "Helikopter İntikalinden 15 Dk Önce",
    "hazirlikZamani": "Turuncu/Yeşil Sis Kandili & 30x30 Metre Düz Alan",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🪖 Helikopter her zaman rüzgarı başa alarak iner; yer ekibi rüzgar altı kenarında sırtını rüzgara dönüp durur ve renkli sis kandiliyle pilota rüzgar yönünü gösterir.",
    "oncedenYapilacaklar": [
      "En az 30x30 metre ebadında, eğimi %7'den az, tel ve yüksek ağaç engeli olmayan açık alan seç",
      "Rotor rüzgarıyla uçuşup motora kaçabilecek çöp, taş, dal ve gevşek malzemeleri (FOD) sahadan temizle",
      "Helikopter yaklaşma sesini duyduğunda rüzgar yönünü belirtmek için renkli sis (duman) kandilini ateşle",
      "Gece operasyonunda alanı \"Y\" veya \"T\" şeklinde kimyasal ışık çubukları (ChemLight) veya araç farlarıyla aydınlat"
    ]
  },
  {
    "id": "guvenlik_yangin_itfaiye_merdiveni_sepet_ve_kurtarma_akslari",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "itfaiye merdivenli araç hidrolik ayak",
      "otomatik dengeleme outrigger",
      "sepet kurtarma kapasitesi 300 kg",
      "rüzgar limiti 12 m/s itfaiye merdiven",
      "yüksek kat yangın tahliyesi"
    ],
    "baslik": "İtfaiye: Hidrolik Merdivenli Araç Dengeleme (Outrigger) & Sepet Kurtarma",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "Yüksek Kat Yangını / Kurtarma İhbarında",
    "hazirlikZamani": "Denge Ayakları (Outrigger) Açımı & Zemin Takozları",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🚒 İtfaiye merdiveni yükseltilmeden önce 4 adet hidrolik denge ayağı (outrigger) zemin takozları üzerine tam açılıp tekerlekler yerden kesilmeli ve terazi yeşil olmalıdır.",
    "oncedenYapilacaklar": [
      "Aracı bina cephesine uygun açıda ve yangın penceresine 10-15 metre mesafede konumlandır",
      "PTO pompasını devreye alıp hidrolik yatay ve dikey ayakları çelik pabuçlar üzerine tam basarak aracı askıya al",
      "Merdiven kontrol kulesinden otomatik zemin yataylama (self-levelling) onayını ekrandan doğrula",
      "Merdiveni rüzgar hızı <12 m/s sınırındayken uzatıp kurtarma sepetini mahsur kalanların balkon hizasına yanaştır"
    ]
  },
  {
    "id": "isg_gurultu_maruziyeti_ve_sekiz_saatlik_lex_olcumu",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "gürültü maruziyet eylem değeri",
      "lex 8 saatlik gürültü ölçümü",
      "85 dba en yüksek maruziyet",
      "80 dba kulak koruyucu bulundurma",
      "kişisel gürültü dozimetresi"
    ],
    "baslik": "İş Hijyeni: 8 Saatlik Gürültü Maruziyeti (LEX 8h) & Kulak Koruyucu Eşiği",
    "ikon": "🎧",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Periyodik Ortam Ölçümünde / Saha Denetiminde",
    "hazirlikZamani": "Kişisel Gürültü Dozimetresi & Akustik Kalibratör",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🦺 Çalışanların Gürültü ile İlgili Risklerden Korunmalarına Dair Yönetmelik uyarınca LEX 80 dB(A) değerinde kulak koruyucu temin edilir, 85 dB(A) değerinde kullanımı mecburidir.",
    "oncedenYapilacaklar": [
      "Çalışanın omzuna kulak seviyesine 10 cm mesafede mikrofonu olan gürültü dozimetresini tak",
      "Vardiya öncesi ve sonrası cihazı 94 dB / 114 dB akustik kalibratör ile doğrula",
      "8 saatlik vardiya sonunda kümülatif LEX değerini hesaplayıp raporla",
      "Ölçüm sonucu 85 dB(A) üzerinde ise mühendislik önlemlerini (ses izolasyon kabini, akustik perde) başlat ve kulaklık zorunluluğu tabelası as"
    ]
  },
  {
    "id": "isg_sicak_is_izni_hot_work_permit_kaynak_yangin_gozculugu",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "sıcak iş izni hot work permit",
      "kaynak kesme yangın gözcüsü fire watch",
      "11 metre yarıçap yanıcı malzeme temizliği",
      "kaynak sonrası 60 dakika yangın nöbeti",
      "alev tutucu emniyet valfi oksijen asetilen"
    ],
    "baslik": "Sıcak İş Güvenliği: Kaynak İzni (Hot Work Permit) & 60 Dk Yangın Gözcülüğü",
    "ikon": "🔥",
    "renk": "#FED7AA",
    "varsayilanZaman": "Alevli / Kıvılcımlı İşe Başlamadan Önce",
    "hazirlikZamani": "Sıcak Çalışma İzin Formu & 6 Kg ABC Kuru Kimyevi Tozlu Yangın Tüpü",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🦺 Kıvılcım çıkan kaynak ve taşlama işlerinde çalışma noktasının 11 metre çevresindeki tüm yanıcılar temizlenmeli; iş bittikten sonra en az 60 dakika yangın gözcüsü nöbet tutmalıdır.",
    "oncedenYapilacaklar": [
      "Kaynak yapılacak noktanın alt ve çevresindeki ahşap, kimyasal ve karton malzemeleri uzaklaştır veya kaynak battaniyesiyle ört",
      "Oksiasetilen hortumlarında alev geri tepme emniyet valflerinin (flashback arrestor) takılı olduğunu gör",
      "Yangın söndürme tüpünü kaynakçının hemen 2 metre yanına hazır koy",
      "İş tamamlandıktan sonra kor kalıntılarının içten içe tutuşmasını izlemek üzere belirlenen yangın gözcüsünün 1 saat sahada beklemesini sağla"
    ]
  },
  {
    "id": "isg_forklift_guvenligi_mavi_isik_blue_spot_ve_hiz_limiti",
    "category": "arac_ulasim",
    "domain": "ISG",
    "keywords": [
      "forklift mavi nokta ışığı blue spot",
      "fabrika içi forklift hız limiti 10 km",
      "forklift çatalları yerden 15 cm yükseklik",
      "forklift geri vites sireni",
      "yaya forklift ayrılmış yollar"
    ],
    "baslik": "Depo & Fabrika: Forklift Blue Spot (Mavi Işık), Yaya Yolu & Hız Limiti",
    "ikon": "🚜",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Vardiya Başlangıcı & Saha İçi Trafik Düzeninde",
    "hazirlikZamani": "Operatör G Belgesi & Günlük Forklift Kontrol Formu",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🦺 Kapalı depo ve tesis içinde forklift hızı azami 10 km/s ile sınırlandırılmalı; kör koridor köşelerine yaklaşırken forkliftin önünden 5 metre ileriyi aydınlatan Mavi Işık (Blue Spot) olmalıdır.",
    "oncedenYapilacaklar": [
      "Forkliftin korna, geri vites sesli ikaz sireni ve tepe sarı döner lambasının çalıştığını test et",
      "Zemine düşen Blue Spot mavi ışığın yayaların görebileceği mesafeye odaklandığını kontrol et",
      "Forklift hareket halindeyken yükün yerden 15-20 cm yukarıda ve geriye doğru eğik (mast tilt back) taşınmasını sağla",
      "Yaya yollarının sarı çizgilerle ve çarpma koruyucu çelik bariyerlerle forklift koridorundan fiziki ayrıldığını doğrula"
    ]
  },
  {
    "id": "isg_biyolojik_risk_etmenleri_hepatit_b_ve_kesici_delici_kutusu",
    "category": "saglik",
    "domain": "ISG",
    "keywords": [
      "biyolojik risk etmenleri yönetmeliği",
      "tıbbi atık kesici delici kutusu sarı kova",
      "iğne ucunu geri kapatmama kuralı no recapping",
      "hepatit b titrasyon anti-hbs testi",
      "biyolojik maruziyet acil kan protokolü"
    ],
    "baslik": "Sağlık Çalışanları İSG: Kesici-Delici Yaralanma & Hepatit B Titrasyonu",
    "ikon": "💉",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Klinik Atık Yönetimi ve Çalışan İşe Girişinde",
    "hazirlikZamani": "Delinmeye Dirençli Sarı Kesici Tıbbi Atık Kutusu",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "🦺 Enjektör kapağını tek elle kapatmaya çalışmak (recapping) en sık iğne batması nedenidir ve yasaktır; iğneler doğrudan sarı kesici atık kovasının kilitli kapağından düşürülür.",
    "oncedenYapilacaklar": [
      "Çalışanın kan tetkikinde Anti-HBs antikor seviyesinin >10 mIU/mL olduğunu gör (bağışıklık yoksa 3 doz aşı başlat)",
      "Kullanılmış iğne uçlarını asla bükme, kırma veya kapağını takmaya çalışma",
      "Sarı kesici delici kutusunu hacminin 3/4'ü dolduğunda kilitleyip kırmızı tıbbi atık poşetine teslim et",
      "İğne batması durumunda yarayı sıkmadan sabunlu suyla yıka, kaynak hastanın HBsAg, Anti-HCV ve Anti-HIV testlerini acilen çalıştır"
    ]
  },
  {
    "id": "isg_kisisel_koruyucu_donanim_kkd_ce_kategori_3_uygunluk",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "kkd kategori 3 uygunluk belgesi",
      "ölümcül risklere karşı kkd",
      "paraşüt tipi emniyet kemeri en 361",
      "kkd zimmet tutanağı ıslak imza",
      "onaylanmış kuruluş 4 haneli ce kodu"
    ],
    "baslik": "KKD Yönetmeliği: Kategori III (Ölümcül Risk) Donanımları & CE Uygunluğu",
    "ikon": "🛡️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Malzeme Satın Alma & Personele Zimmet Anında",
    "hazirlikZamani": "AB Tip İnceleme Belgesi & Kişisel KKD Zimmet Formu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🦺 Yüksekten düşme, elektrik arkı ve zehirli gaz maskeleri Kategori III (en yüksek risk) sınıfındadır; CE logosunun yanında 4 haneli Onaylanmış Kuruluş (Notified Body) numarası zorunludur.",
    "oncedenYapilacaklar": [
      "Satın alınan paraşüt tipi emniyet kemerinde EN 361 standardı ve CE yanındaki 4 haneli onay kodunu kontrol et",
      "Üretici kullanma kılavuzunun Türkçe olduğunu ve 5 yıllık azami kullanım ömrü etiketini teyit et",
      "Personele sahada bizzat doğru kuşanma ve şok emici lanyard bağlama tatbikatı yaptır",
      "Çalışana teslim edilen tüm KKD'leri standartları ve tarihleriyle \"KKD Zimmet ve Taahhüt Formu\"na yazdırıp imza al"
    ]
  },
  {
    "id": "guvenlik_cmk119_arama_karari_ve_avukat_nezareti_tutanagi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "cmk 119 adli arama kararı",
      "gecikmesinde sakınca bulunan hal savcı arama emri",
      "avukat nezaretinde ev araması tutanağı",
      "arama tanıkları ihtiyar heyeti",
      "arama el koyma tutanağı itiraz"
    ],
    "baslik": "Ceza Muhakemesi: CMK 119 Adli Arama Kararı & Arama-El Koyma Tutanağı",
    "ikon": "👮",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Arama İcra Edilmeden Hemen Önce",
    "hazirlikZamani": "Sulh Ceza Hakimliği Arama Kararı, Tutanak Formları & Şüpheli Müdafii İletişimi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👮 CMK m. 119 uyarınca konutta arama hakim kararı veya gecikmesinde sakınca bulunan halde savcının yazılı emriyle yapılır; aramada ihtiyar heyetinden 2 kişi veya komşu hazır bulundurulmalıdır.",
    "oncedenYapilacaklar": [
      "Arama kararındaki adres, isim, arama gerekçesi ve geçerlilik süresini kontrol et",
      "Kapı açıldığında şüpheliye veya hazır bulunanlara arama kararının bir suretini tebliğ et",
      "Avukatın hazır bulunma hakkını hatırlat ve mahalle muhtarı/ihtiyar heyetinden 2 tanığı hazır tut",
      "Ele geçirilen suç delillerini numaralandırıp delil poşetine koyarak tarafların ıslak imzasıyla tutanağa bağla"
    ]
  },
  {
    "id": "guvenlik_adli_bilisim_imaj_alma_write_blocker_ve_md5_sha256",
    "category": "is_kariyer",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "adli bilişim imaj alma e01 raw",
      "write blocker yazma koruyucu donanım",
      "md5 sha256 hash doğrulama zinciri",
      "cmk 134 bilgisayar kütüklerinde arama",
      "delil bütünlüğü zinciri chain of custody"
    ],
    "baslik": "Adli Bilişim: CMK 134 Dijital Delil İmaj Alma & SHA-256 Hash Bütünlüğü",
    "ikon": "💻",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Dijital Materyale El Koyma ve Laboratuvar İncelemesinde",
    "hazirlikZamani": "Donanımsal Write-Blocker, Adli Klonlama Cihazı (Tableau/Atola) & Steril Hedef Disk",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "👮 CMK m. 134 uyarınca dijital materyalin orijinaline asla doğrudan dokunulmaz; donanımsal yazma koruyucu ile birebir bit-stream imajı (E01) alınır ve MD5/SHA256 hash değerleri tutanağa yazılır.",
    "oncedenYapilacaklar": [
      "Ele geçirilen telefon/bilgisayarı dış sinyal müdahalelerine karşı Faraday çantasına koy",
      "İmaj alma işleminden önce ve sonra kaynak medyanın SHA-256 hash özetini hesapla",
      "İmaj dosyasının hash değeri ile orijinal medyanın hash değerinin birebir eşleştiğini doğrula",
      "Şüpheli müdafiine talep halinde imajın bir kopyasını (klon disk) tutanakla teslim et"
    ]
  },
  {
    "id": "guvenlik_askeri_atıs_emniyeti_ve_poligon_gozcu_flama_nobeti",
    "category": "is_kariyer",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "askeri atış emniyet subayı",
      "poligon kırmızı flama emniyet nöbeti",
      "doldur boşalt istasyonu emniyet kontrolü",
      "silah muayenesi ve namlu emniyeti",
      "atış hattı hazır tekmili"
    ],
    "baslik": "Askeri Harekât / Eğitim: Atış Alanı Emniyet Protokolü & Kırmızı Flama",
    "ikon": "🎯",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Atış Eğitimi Başlamadan 30 Dakika Önce",
    "hazirlikZamani": "Kırmızı Emniyet Flamaları, Ambulans/Tabip, Çelik Yelek & Balistik Gözlük",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🪖 Atış alanında kırmızı flama göndere çekilmeden ve sağlık ekibi sahada hazır bulunmadan tek bir mermi dahi atılamaz; doldur-boşalt istasyonunda emniyet subayı bizzat nezaret eder.",
    "oncedenYapilacaklar": [
      "Atış poligonunun tepe noktalarına ve giriş yollarına kırmızı ikaz flamalarını çekip nöbetçi muhafızları yerleştir",
      "Sahada tam donanımlı sıhhiye ambulansı ve askeri tabibin hazır bulunduğunu teyit et",
      "Atış hattına giren tüm personelin doldur-boşalt istasyonunda namlu hedefe bakacak şekilde emniyet kontrolünü yap",
      "Atış sonunda boş kovanları sayarak sarfiyat tutanağı ile mühimmat sandıklarını mutabık kıl"
    ]
  },
  {
    "id": "guvenlik_itfaiye_yangin_yeri_inceleme_ve_kundaklama_arson",
    "category": "is_kariyer",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "yangın yeri inceleme raporu itfaiye",
      "kundaklama arson hızlandırıcı tespiti",
      "yangın başlangıç odağı v paterni",
      "elektrik kontağı ark küreciği tespiti",
      "yangın raporu itfaiye tutanağı"
    ],
    "baslik": "Yangın & Kurtarma: Yangın Yeri İnceleme, Başlangıç Odağı (V-Paterni) & Rapor",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "Yangın Tamamen Söndürülüp Soğutma Yapıldıktan Sonra",
    "hazirlikZamani": "Foto iyonizasyon Gaz Dedektörü (PID), Delil Numune Kavanozları & Şerit Metre",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🚒 Yangın yeri incelemesinde duvardaki kömürleşme V-paterni takip edilerek yangının ilk çıkış odağı bulunur; hızlandırıcı (benzin/tiner) şüphesinde PID dedektörüyle numune alınır.",
    "oncedenYapilacaklar": [
      "Soğutma bitiminde yapının statik çökme riskine karşı güvenlik şeridi çekerek alanı koruma altına al",
      "Duvarlardaki duman ve kömürleşme izlerinin en alçak noktasını (yanma odağını) tespit et",
      "Elektrik panosu ve sigortaları inceleyerek kısa devre ark erimesi mi yoksa dış kaynaklı yangın mı olduğunu ayırt et",
      "Hazırlanan Resmi İtfaiye Yangın Raporunu savcılık ve sigorta eksperine teslim edilmek üzere onayla"
    ]
  },
  {
    "id": "guvenlik_olay_yeri_inceleme_ve_vucut_dokusu_parmak_izi_fsa",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "olay yeri inceleme parmak izi afis",
      "biyolojik delil dna swap alma",
      "balistik kovan çekirdek karşılaştırma",
      "olay yeri güvenlik şeridi delil numaralandırma",
      "adli tıp ölü muayene ve otopsi tutanağı"
    ],
    "baslik": "Kriminoloji: Olay Yeri İnceleme, AFIS Parmak İzi & DNA Swap Alma",
    "ikon": "🔬",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Olay Bildirildikten Sonraki İlk Dakikalarda",
    "hazirlikZamani": "Steril DNA Svapları, Manyetik Parmak İzi Tozu, Sarı Delil Plakaları & Lazer Mesafe Ölçer",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👮 Olay yerinde Locard'ın Değişim Prensibi geçerlidir (Her temas bir iz bırakır); steril tulum giyilmeden alana girilmez, parmak izleri AFIS veri tabanında taranır.",
    "oncedenYapilacaklar": [
      "Olay yerini iç ve dış güvenlik şeridiyle çevreleyerek görevli harici herkesin girişini engelle",
      "Olay yerini geniş açı, orta mesafe ve makro ölçekli cetvelle fotoğraflayıp krokisini çiz",
      "Kapı kolları ve cam yüzeylerden manyetik tozla gizil parmak izlerini kaldırıp AFIS sistemine aktar",
      "Kan ve biyolojik sıvı örneklerini steril eküvyon çubuğuyla alarak soğuk zincirde kriminal laboratuvara sevk et"
    ]
  },
  {
    "id": "isg_onayli_tespit_ve_oneri_defteri_noter_ve_teblig",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "isg tespit ve öneri defteri onay",
      "onaylı defter noter işkur mührü",
      "iş güvenliği uzmanı tespit defteri imza",
      "işveren vekili onaylı defter tebliğ",
      "6331 sayılı isg kanunu defter"
    ],
    "baslik": "6331 İSG Kanunu: Onaylı Tespit ve Öneri Defteri Yazımı & İşveren Tebliği",
    "ikon": "📝",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Saha Denetimini İzleyen Mesai Saati İçinde",
    "hazirlikZamani": "Noter/İŞKUR Mühürlü Onaylı Defter, Saha Fotoğrafları & Mevzuat Maddeleri",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🛡️ 6331 sayılı İSG Kanunu m. 8 gereği onaylı deftere yazılan tespit ve öneriler işverene resmen tebliğ edilmiş sayılır; hayati tehlikeler giderilmezse Bakanlığa bildirim zorunludur.",
    "oncedenYapilacaklar": [
      "Saha teftişinde tespit edilen uygunsuzlukları (yüksekten düşme riski, açık elektrik panosu) fotoğrafla belgele",
      "Onaylı defterin otokopili sayfasına tehlikeyi, alınması gereken önlemi ve makul termin süresini net yaz",
      "İş Güvenliği Uzmanı, İşyeri Hekimi ve İşveren/İşveren Vekilinin üçlü ıslak imzasını tamamla",
      "İşverenin imzadan imtina etmesi halinde durumu tutanakla tespit edip Çalışma ve İŞKUR İl Müdürlüğüne bildir"
    ]
  },
  {
    "id": "isg_kapali_kisitli_alan_gaz_olcumu_lel_o2_h2s_ve_calisma_izni",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "kapalı alan gaz ölçümü leel o2 h2s",
      "menhol kuyu giriş gaz dedektörü",
      "patlayıcı gaz lel alt patlama sınırı",
      "kapalı kısıtlı alan çalışma izni ptw",
      "cebri mekanik havalandırma fanı"
    ],
    "baslik": "Yüksek Riskli İşler: Kapalı Alan (Kuyu/Tank) Gaz Ölçümü & Giriş İzni (PTW)",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kapalı Alana Giriş Yapılmadan 15 Dakika Önce",
    "hazirlikZamani": "Kalibre 4'lü Gaz Dedektörü (O2, CO, H2S, LEL), Kurtarma Vinci & Tripod",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🛡️ Oksijen seviyesi %19.5 altına düştüğünde veya yanıcı gaz konsantrasyonu LEL'in %10'unu aştığında alana giriş kesinlikle yasaktır; cebri havalandırma kesintisiz çalışmalıdır.",
    "oncedenYapilacaklar": [
      "Pompajlı gaz dedektörünün hortumunu kuyu tabanına, orta seviyeye ve tepeye salarak 3 derinlikte ölçüm yap",
      "Oksijenin %20.9, CO < 25 ppm, H2S < 10 ppm ve LEL %0 olduğunu teyit et",
      "Kuyu ağzına emniyet tripodu ve otomatik kilitli kurtarma vinci kurarak çalışanın paraşüt tipi kemerini bağla",
      "Kapalı Alan Çalışma İzin Formunu (Permit-to-Work) nöbetçi gözcü nezaretinde onaylayıp girişe izin ver"
    ]
  },
  {
    "id": "isg_ramak_kala_olay_bildirimi_5_neden_kok_analiz_ve_dof",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "ramak kala formu bildirim inceleme",
      "near miss kaydı ramak kala kutusu",
      "iş kazası önleme ramak kala kök analiz",
      "ramak kala olay yeri foto ve cap",
      "düzeltici önleyici faaliyet döf"
    ],
    "baslik": "Kaza Önleme: Ramak Kala (Near-Miss) Bildirimi & 5-Neden Kök Analizi",
    "ikon": "🛡️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Olayın Bildirildiği Gün İçinde (24 Saat)",
    "hazirlikZamani": "Ramak Kala Bildirim Formu, Kök Neden Analiz Şablonu (Fishbone/5-Why) & DÖF Formu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🛡️ Heinrich Kaza Piramidine göre her 300 ramak kala olayına müdahale edilmezse 1 ağır yaralanmalı kaza meydana gelir; ramak kala formları cezalandırma değil önleme aracıdır.",
    "oncedenYapilacaklar": [
      "Çalışan tarafından doldurulan ramak kala formundaki lokasyonu ve tehlike kaynağını yerinde incele",
      "Olayın neden gerçekleştiğini sorgulamak üzere \"5 Neden (5-Why)\" kök analiz tekniğini uygula",
      "Mühendislik koruması veya idari önlem içeren Düzeltici ve Önleyici Faaliyet (DÖF) aksiyonu aç",
      "Alınan aksiyonu bir sonraki İSG Kurulu toplantısında görüşerek şirket içi bültenle tüm personele duyur"
    ]
  },
  {
    "id": "isg_gurultu_maruziyeti_kisisel_dozimetri_ve_85dba_eylem",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "gürültü dozimetri ve ortam haritası",
      "85 dba en yüksek maruziyet eylem",
      "kulak koruyucu kkdy ses ölçümü leq",
      "gürültü haritası odyometri testi",
      "87 dba en yüksek maruziyet sınır değeri"
    ],
    "baslik": "Fiziksel Riskler: Kişisel Gürültü Dozimetrisi (Lex 8h) & Odyometri",
    "ikon": "🎧",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Tam Kapasite Üretim Vardiyasında (8 Saatlik Ölçüm)",
    "hazirlikZamani": "Kalibre Kişisel Gürültü Dozimetresi, Akustik Kalibratör & Odyometri Odası",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🛡️ Gürültü Yönetmeliği uyarınca 85 dB(A) en yüksek maruziyet eylem değeridir ve kulak koruyucu kullanımı zorunludur; 87 dB(A) sınır değeri hiçbir şartta aşılamaz.",
    "oncedenYapilacaklar": [
      "Dozimetre mikrofonunu pres/dokuma operatörünün kulak hizasından 10 cm mesafede yakasına sabitle",
      "8 saatlik vardiya boyunca eşdeğer sürekli ses basınç seviyesini (Lex, 8h) ve tepe ses basıncını (Ppeak) kaydet",
      "85 dB(A) üzerindeki alanları gürültü ikaz levhalarıyla işaretleyip SNR değeri uygun kulaklık zimmetle",
      "Çalışanların periyodik sağlık muayenesinde işitme kaybı olup olmadığını odyometri testleriyle takip et"
    ]
  },
  {
    "id": "isg_dis_cephe_iskelesi_ankraj_ve_yesil_scafftag_etiket",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "iskele etiketleme yeşil kırmızı scafftag",
      "flanşlı cephe iskelesi ankraj testi",
      "iskele günlük kontrol formu isg",
      "güvenli iskele etiketi çift korkuluk",
      "ahşap kalas yasağı çelik platform"
    ],
    "baslik": "Yüksekte Çalışma: Flanşlı Cephe İskelesi Ankraj Testi & Scafftag Etiketi",
    "ikon": "🏗️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Sabah İskelede Çalışmaya Başlamadan Önce",
    "hazirlikZamani": "İskele Kontrol Çizelgesi, Yeşil/Kırmızı Scafftag Kartları & Çekme Test Krikosu",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🛡️ İskele girişinde yetkili imzalı YEŞİL Scafftag etiketi bulunmadıkça iskeleye çıkış yasaktır; her 4 metrede bir duvara ankraj yapılmalı ve ahşap kalas kesinlikle kullanılmamalıdır.",
    "oncedenYapilacaklar": [
      "İskele ayaklarının çelik taban plakası ve ahşap takozlar üzerinde tam teraziye oturduğunu kontrol et",
      "Ana korkuluk (100 cm), ara korkuluk (50 cm) ve tekmelik topuk levhasının (15 cm) eksiksiz olduğunu doğrula",
      "Duvar ankraj bulonlarına tork ve çekme testi uygulayarak yük taşıma kapasitesini teyit et",
      "Kontroller uygunsa kırmızı \"Kullanılamaz\" kartını çıkartıp yetkili imzalı Yeşil Scafftag etiketini tak"
    ]
  },
  {
    "id": "polis_trafik_kazasi_olumlu_kaza_tespit",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "ölümlü trafik kazası",
      "kaza tespit tutanağı resmi",
      "fren izi ölçümü",
      "cumhuriyet savcısı kaza"
    ],
    "baslik": "Ölümlü/Yaralanmalı Trafik Kazası Adli Tahkikatı",
    "ikon": "🚓",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Olay Anı Acil İntikal",
    "akilliFisilti": "👮 Ölümlü kazalarda yol trafiğe kapatılır, fren izi ve çarpışma noktası krokisi çıkarılıp Nöbetçi Savcıya bilgi verilir.",
    "oncedenYapilacaklar": [
      "Trafik akışını koni ve tepe lambalı araçla geriden keserek ikinci bir kaza riskine karşı çevre emniyeti al",
      "112 Sağlık ekibi intikalini ve yaralıların sevk edildiği hastanelerin protokol numaralarını kaydet",
      "Lazer metre/şerit metre ile fren izi uzunluğunu, sürtünme izlerini, görüş açısını ve yol eğimini tespit edip krokiye işle",
      "Nöbetçi Cumhuriyet Savcısının talimatıyla sürücülerin alkol/uyuşturucu kan tahlillerini yaptırıp araçları otoparka çektir"
    ]
  },
  {
    "id": "asker_hudut_devriye_termal_kamera_nobet",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "hudut devriyesi",
      "termal kamera gözetleme",
      "sınır hattı vukuat",
      "hudut nöbet devri"
    ],
    "baslik": "Hudut Sınır Hattı Termal Gözetleme & Devriye",
    "ikon": "🪖",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Gece Görüş Devriyesi",
    "akilliFisilti": "🪖 Hudut hattında termal kamera ve elektro-optik kuleler ile kör nokta kalmayacak şekilde 360° gözetleme yapılır.",
    "oncedenYapilacaklar": [
      "Devriye öncesi gece görüş dürbünleri, termal silah dürbünleri ve yedek bataryaların şarjını kontrol et",
      "Telsiz kripto anahtarlarını, parola-işaret çizelgesini ve acil durum temas kodlarını takım personeline ezberlet",
      "Sınır fiziki güvenlik sistemi (Modüler beton duvar, jiletli tel, aydınlatma ve sismik sensörler) bütünlüğünü teyit et",
      "Şüpheli şahıs/araç tespitinde temas hattına yaklaşmadan Nöbetçi Amirine ve komşu karakola anında koordinat bildir"
    ]
  },
  {
    "id": "itfaiye_endustriyel_kimyasal_hazmat_yangini",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "hazmat yangını",
      "kimyasal yangın",
      "kbrn itfaiye",
      "tehlikeli madde un kodu"
    ],
    "baslik": "KBRN / Endüstriyel Tehlikeli Madde (HAZMAT) Müdahalesi",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "Anında Özel Ekip İntikali",
    "akilliFisilti": "🚒 Kimyasal tank yangınlarında UN turuncu plaka kodu belirlenmeden SU SIKILMAZ; rüzgar arkaya alınarak yaklaşılır.",
    "oncedenYapilacaklar": [
      "Dürbün ile tank/araç üzerindeki turuncu Tehlike Tanımlama Numarası (Kemler Kodu) ve 4 haneli UN Kodunu oku",
      "Acil Müdahale Rehberi (ERG) üzerinden kimyasalın suyla reaksiyon verip vermediğini (Örn: AFFF Köpük, KKT ihtiyacı) teyit et",
      "Müdahale personelinin Seviye A / Seviye B gaz geçirmez kimyasal koruyucu elbise ve SCBA solunum seti giymesini sağla",
      "Rüzgar yönü ve tahliye yarıçapına göre (Hot Zone / Warm Zone / Cold Zone) 500-1000 metre çevre emniyet şeridi çektir"
    ]
  },
  {
    "id": "guvenlik_para_nakil_cit_guvenlik_protokolu",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "para nakil güvenliği",
      "cit zırhlı araç",
      "banka para transferi",
      "atm para yükleme"
    ],
    "baslik": "Zırhlı Araç Değerli Eşya ve Nakit (CIT) Transferi",
    "ikon": "🛡️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Transfer Öncesi & Seyir",
    "akilliFisilti": "🛡️ Para nakil aracında sürücü kesinlikle araçtan inmez; transfer personeli çapraz koruma açısıyla hareket eder.",
    "oncedenYapilacaklar": [
      "Zırhlı aracın kurşun geçirmez cam, hidrolik kapı kilitleri, GPS takip ve uzaktan motor durdurma sistemini test et",
      "Transfer güzergahını değişken tut; aynı saat ve aynı rotayı üst üste kullanmaktan kaçın",
      "Banka/ATM girişinde birinci güvenlik görevlisi kapıyı ve çevre hareketliliğini kontrol ederken kurye kasayı taşısın",
      "Herhangi bir tehdit veya araç durdurma girişiminde panik butonu ile Operasyon Merkezine ve Polise anında sinyal gönder"
    ]
  },
  {
    "id": "olay_yeri_balistik_kovan_mermi_tespiti",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "balistik kovan tespit",
      "olay yeri kovan numaralandırma",
      "giriş çıkış deliği açı ölçer",
      "atış artığı svap"
    ],
    "baslik": "Olay Yeri İnceleme Kovan, Mermi Çekirdeği & Balistik Açı",
    "ikon": "🔍",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Olay Yeri İntikali",
    "akilliFisilti": "👮 Boş kovanlar parmak izi bozulmayacak şekilde kenarından pensetle alınıp steril delil zarfına konur.",
    "oncedenYapilacaklar": [
      "Olay yerine basılmayacak yürüyüş yolu (Stepping Plates) kurup kovan ve çekirdeklerin yanına sarı delil numarası koy",
      "Lazer çubukları ve klinometre ile mermi giriş-çıkış deliklerinden atış açısı ve muhtemel atıcı konumunu tespit et",
      "Kovan tırnak, iğne ve çıkarıcı izlerinin karşılaştırılması için Kriminal Polis Laboratuvarına balistik talep yaz",
      "Şüphelilerin el üstü ve avuç içlerinden atomik absorpsiyon / SEM-EDX için Atış Artığı (GSR) svap kitini al"
    ]
  },
  {
    "id": "isg_risk_degerlendirmesi_fine_kinney_5x5",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "risk değerlendirme raporu",
      "fine kinney risk matrisi",
      "5x5 l tipi matris",
      "isg risk analizi"
    ],
    "baslik": "6331 İSG Risk Değerlendirmesi & Fine-Kinney / 5x5 Matris",
    "ikon": "🛡️",
    "renk": "#F1F5F9",
    "varsayilanZaman": "2/4/6 Yılda Bir veya Revizyon",
    "akilliFisilti": "🛡️ Çok tehlikeli sınıfta 2 yıl, tehlikeli sınıfta 4 yıl, az tehlikeli sınıfta en geç 6 yılda bir risk analizi yenilenir.",
    "oncedenYapilacaklar": [
      "İşveren vekili, İSG Uzmanı, İşyeri Hekimi ve Çalışan Temsilcisinden oluşan Risk Değerlendirme Ekibini kur",
      "Saha tehlikelerini belirle: İhtimal (Olasılık), Şiddet ve Frekans çarpanlarıyla risk skorlarını hesapla",
      "Kabul edilemez yüksek riskler için hiyerarşik kontrol adımlarını (Eliminasyon -> İkame -> Mühendislik -> KKD) uygula",
      "Hazırlanan Risk Değerlendirme Raporunu tüm ekip üyelerine ıslak imzalatıp işverene resmi teslim tutanağı ile tebliğ et"
    ]
  },
  {
    "id": "isg_patlamadan_korunma_dokumani_atex",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "patlamadan korunma dokümanı",
      "atex bölge zone 0 1 2",
      "toz patlaması zone 20",
      "ex-proof ekipman"
    ],
    "baslik": "ATEX Patlamadan Korunma Dokümanı (PKD) & Zone Haritası",
    "ikon": "💥",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Tesis Kurulum / Kimyasal Değişim",
    "akilliFisilti": "🛡️ Parlayıcı gaz ve toz ortamlarında Zone 0, 1, 2 ve Zone 20, 21, 22 patlama risk haritası çıkarılır.",
    "oncedenYapilacaklar": [
      "Tesiste kullanılan solvent, boya, gaz veya tozların Alt Patlama Sınırını (LEL) ve Parlama Noktasını (Flash Point) belirle",
      "Havalandırma debilerine göre salınım kaynaklarını derecelendirip (Zone 0/1/2 veya Zone 20/21/22) tehlikeli bölgeleri çiz",
      "Zone sınırları içinde kullanılan tüm motor, aydınlatma ve şalterlerin ATEX Ex-proof sertifikalarını teyit et",
      "Statik elektrik birikimini önlemek için metal hatların eşpotansiyel topraklama sürekliliğini denetle"
    ]
  },
  {
    "id": "isg_is_kazasi_sgk_bildirimi_3_is_gunu",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "iş kazası sgk bildirimi",
      "3 iş günü iş kazası",
      "kaza araştırma raporu",
      "iş kazası şahit tutanağı"
    ],
    "baslik": "İş Kazası SGK Bildirimi (Yasal 3 İş Günü) & Kaza Raporu",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kazadan Sonraki 3 İş Günü",
    "akilliFisilti": "🛡️ İş kazası gerçekleştikten sonra en geç 3 iş günü içinde SGK elektronik ortamında bildirilmek zorundadır.",
    "oncedenYapilacaklar": [
      "Kazanın meydana geldiği yeri ve ekipmanları bozmadan fotoğrafla ve güvenlik kamerası kaydını yedekle",
      "Kazazedenin, şahitlerin ve vardiya amirinin ıslak imzalı kaza beyan tutanaklarını al",
      "İşyeri Hekimi ve İSG Uzmanı refakatinde \"Kök Neden Analizi (5 Neden / Balık Kılçığı)\" raporunu tamamla",
      "SGK E-Bildirge portalından \"İş Kazası ve Meslek Hastalığı Bildirimi\"ni 3 iş günü dolmadan onayla"
    ]
  },
  {
    "id": "isg_acil_durum_tahliye_tatbikati_yillik",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "acil durum tatbikatı",
      "tahliye tatbikat tutanağı",
      "acil toplanma alanı sayım",
      "söndürme kurtarma ekibi"
    ],
    "baslik": "Yıllık Yangın/Deprem Acil Durum Tahliye Tatbikatı",
    "ikon": "📢",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yılda En Az 1 Kez",
    "akilliFisilti": "🛡️ 6331 sayılı Kanun gereği yılda en az bir defa acil durum tatbikatı yapılarak tutanağı düzenlenmelidir.",
    "oncedenYapilacaklar": [
      "Söndürme, Kurtarma, Koruma ve İlk Yardım ekiplerinin güncel personel listesini ve yeleklerini hazırla",
      "Acil durum sirenini çalarak binanın tahliye süresini (Hedef: < 3 dakika) kronometre ile ölç",
      "Güvenli Acil Toplanma Bölgesinde yoklama yaparak içeride kalan personel olup olmadığını say",
      "Yangın söndürme cihazı (KKT/CO₂) ile kontrollü alev söndürme eğitimi verip fotoğraflı resmi tatbikat tutanağını imzalat"
    ]
  },
  {
    "id": "isg_ergonomi_agir_yuk_kaldirma_niosh",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "elle taşıma yönetmeliği",
      "ağır yük kaldırma sınırı",
      "niosh kaldırma denklemi",
      "ergonomik risk analizi"
    ],
    "baslik": "Elle Taşıma İşleri Yönetmeliği & NIOSH Kaldırma Denklemi",
    "ikon": "📦",
    "renk": "#F1F5F9",
    "varsayilanZaman": "İş İstasyonu Tasarımı / Muayene",
    "akilliFisilti": "🛡️ Erkek çalışanlar için ideal şartlarda tek kişi azami yük sınırı 25 kg, kadın çalışanlar için 15 kg’dır.",
    "oncedenYapilacaklar": [
      "Yükün ağırlığını, kavrama kollarını, gövdeden mesafesini ve dikey kaldırma yüksekliğini ölç",
      "NIOSH Kaldırma Denklemi ile Önerilen Ağırlık Limitini (RWL) ve Kaldırma İndeksini (LI > 1) hesapla",
      "Sürekli tekrar eden ağır yükler için vakumlu yük kaldırıcı veya hidrolik transfer masaları projelendir",
      "Çalışanlara doğru kaldırma (Dizleri bükerek bacak kaslarıyla kaldırma) uygulamalı ergonomi eğitimi ver"
    ]
  },
  {
    "id": "polis_asayis_uyusturucu_arama_kopegi_k9",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "narkotik dedektör köpek k9",
      "araç zula arama",
      "uyuşturucu madde tespiti",
      "k9 köpek tepki tutanağı"
    ],
    "baslik": "Narkotik Dedektör Köpek (K-9) Refakatinde Zula Arama",
    "ikon": "🐕‍🦺",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Yol Kontrol / Şüpheli Araç",
    "akilliFisilti": "👮 Dedektör köpeğin pasif/aktif tepki verdiği zula noktası kamera kaydı altına alınarak sökülür.",
    "oncedenYapilacaklar": [
      "Şüpheli aracın etrafında dış koku taraması yaptırarak köpeğin rüzgar yönüne göre ilk temasını sağla",
      "Araç kapı döşemeleri, torpido arkası, stepne boşluğu ve yakıt deposu çevresinde köpeğin tepkisini (oturma/tırmalama) izle",
      "Tepki verilen bölgeyi açmadan önce Cumhuriyet Savcısının yazılı arama kararını ve araç sahibini hazır bulundur",
      "Ele geçirilen maddeyi hassas terazide tartıp mühürlü delil poşetine koyarak \"K-9 Arama ve Yakalama Tutanağı\"nı imzalat"
    ]
  },
  {
    "id": "asker_gece_intikali_pusu_karsi_koyma",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "gece yaya intikali",
      "pusuya karşı koyma drili",
      "askeri intikal düzeni kol",
      "karartma disiplini ışık ses"
    ],
    "baslik": "Yaya Gece İntikali & Pusuya Karşı Koyma Harekâtı",
    "ikon": "🪖",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Gece Operasyonu",
    "akilliFisilti": "🪖 İntikal esnasında tam ışık/ses karartması uygulanır; temas anında derhal ateş üstünlüğü kurulup pusu yarılarak çıkılır.",
    "oncedenYapilacaklar": [
      "Personel teçhizatında ses çıkarabilecek metal parçaları bez bantla sustur ve fosforlu işaretleri kapat",
      "Arazi yapısına göre Açık Kol veya Avcı Zinciri intikal düzenini alıp timler arası emniyet mesafesini (5-10 m) koru",
      "Öncü ve artçı unsurların termal gözetleme ile sırt ve yan emniyetini kesintisiz sağladığını doğrula",
      "Düşman ateşi temasında \"Yat-Sürün-Ateş Et\" driliyle en yakın siper hattına geçip telsizle anında ateş destek koordinatı bildir"
    ]
  },
  {
    "id": "itfaiye_yuksek_kat_kurtarma_hava_yastigi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "itfaiye atlama yatağı",
      "hava yastığı kurtarma",
      "merdivenli itfaiye aracı sepet",
      "yüksekten atlama emniyet"
    ],
    "baslik": "Yüksek Kattan Atlama Yatağı (Hava Yastığı) Kurulumu",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "Olay Yeri İlk 3 Dakika",
    "akilliFisilti": "🚒 Atlama yatağı binaya çok yakın kurulmaz; hava tüpleriyle 45-60 saniyede tam basınca ulaştırılır.",
    "oncedenYapilacaklar": [
      "Atlama yatağını zemindeki cam kırığı ve kesici cisimlerden arındırılmış düz bir alana ser",
      "Basınçlı hava tüplerini veya elektrikli körükleri bağlayarak yastığın 60 saniyede tam şişmesini sağla",
      "Yastığın merkezindeki hedef noktasını kazazedenin düşüş açısına göre hizala ve 4 köşeden gerdirme halatlarıyla sabitle",
      "İlk kişi atladıktan sonra hava tahliyesinin ardından yastığın tekrar şişmesi için (yaklaşık 10-15 sn) ikinci kişiye bekleme komutu ver"
    ]
  },
  {
    "id": "guvenlik_avm_stadyum_xray_kapi_dedektor",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "kapı tipi metal dedektörü",
      "x-ray cihazı bagaj kontrolü",
      "el dedektörü arama",
      "yasaklı madde stadyum giriş"
    ],
    "baslik": "Hassas Tesis Girişi X-Ray Cihazı & Kapı Dedektörü Ayarı",
    "ikon": "🛡️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Vardiya Başlangıcı & Etkinlik Öncesi",
    "akilliFisilti": "🛡️ Kapı dedektörü test parçasını (STP) algılayacak hassasiyete ayarlanır; X-Ray organik maddeleri turuncu gösterir.",
    "oncedenYapilacaklar": [
      "Kapı dedektörünün hassasiyet kademesini test çubuğuyla kalibre et ve bölge (Multi-Zone) LED göstergelerini sına",
      "X-Ray konveyör bandını çalıştırıp inorganik maddelerin (Mavi: Silah, metal), karışık maddelerin (Yeşil) ve organiklerin (Turuncu: Patlayıcı/Uyuşturucu) renk ayrımını doğrula",
      "Şüpheli yoğunluk (Siyah/Koyu leke) görülen paketleri derhal durdurup konveyörde geri çek ve manuel fiziki aramaya yönlendir",
      "Vardiya süresince her saat başı X-Ray operatörünü dikkat dağınıklığını önlemek için el dedektörü personeliyle rotasyona sok"
    ]
  },
  {
    "id": "olay_yeri_kan_lekesi_morfoloji_spatter",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "kan lekesi desen analizi",
      "bloodstain pattern analysis",
      "luminol reaksiyonu gizli kan",
      "kan damlası açı hesabı"
    ],
    "baslik": "Olay Yeri Kan Lekesi Morfolojisi (BPA) & Luminol Taraması",
    "ikon": "🔬",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Olay Yeri İntikali",
    "akilliFisilti": "👮 Kan damlasının en-boy oranından çarpma açısı (sin θ = Genişlik / Uzunluk) hesaplanarak kaynak nokta belirlenir.",
    "oncedenYapilacaklar": [
      "Temizlenmiş veya silinmiş kan şüphesinde karanlık ortamda Luminol / BlueStar solüsyonu sıkarak kemilüminesans ışımasını fotoğrafla",
      "Duvardaki ve zemindeki kan lekelerini sıçrama (Spatter), damlama (Drip) ve silinme (Wipe/Swipe) olarak sınıflandır",
      "Eliptik kan damlalarının kuyruk yönlerinden hareket yönünü ve açılarını tebeşir/ip yöntemiyle birleştirerek orijin noktasını bul",
      "Steril svap çubuğu ile DNA profillemesi için referans kan örneği alıp soğuk zincirle biyoloji laboratuvarına sevk et"
    ]
  },
  {
    "id": "isg_forklift_periyodik_kontrol_fren_ayna",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "forklift periyodik kontrol",
      "forklift çatal çatlak testi",
      "forklift tepe lambası mavi ışık",
      "iş makinesi fenni muayene"
    ],
    "baslik": "Forklift & İstif Makinesi Yıllık Fenni Muayenesi",
    "ikon": "🚜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yılda En Az 1 Kez",
    "akilliFisilti": "🛡️ Forklift çatallarında kalınlık kaybı %10’u geçerse çatal derhal yenilenir; mavi nokta (Blue Spot) ışığı zorunludur.",
    "oncedenYapilacaklar": [
      "Forklift çatal topuğunda kumpasla aşınma ölçümü yap (Orijinal kalınlığın %10’undan fazla aşınma ıskarta sebebidir)",
      "Geri vites sesli ikaz sireni, sarı tepe çakar lambası ve zemine yansıtılan mavi güvenlik spotunun çalıştığını sına",
      "Kaldırma zincirlerinde uzama/aşınma kontrolü yap ve hidrolik hortumlarda kaçak/çatlak muayenesi gerçekleştir",
      "Akredite A-Tipi Muayene Kuruluşundan \"İş Ekipmanı Periyodik Kontrol Raporu\"nu alıp İSG kuruluna sun"
    ]
  },
  {
    "id": "isg_loto_etiketleme_kilitleme_istasyonu",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "loto kilitleme etiketleme",
      "enerji kesme prosedürü loto",
      "asma kilit hasp istasyonu",
      "sıfır enerji durumu doğrulama"
    ],
    "baslik": "Bakım-Onarımda LOTO (Kilitleme-Etiketleme) Güvenlik Protokolü",
    "ikon": "🔒",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Müdahale Öncesi Zorunlu",
    "akilliFisilti": "🛡️ Bakım öncesi elektrik, hidrolik, pnömatik tüm enerjiler kesilir, her çalışan kendi asma kilidini Hasp’a takar.",
    "oncedenYapilacaklar": [
      "Makinenin ana şalterini kapat, hidrolik ve pnömatik basınç tahliye vanalarını açarak artık enerjiyi boşalt",
      "Çoklu kilitleme aparatı (Hasp) üzerine bakımda çalışan her bir teknisyenin kendi kişisel kırmızı emniyet kilidini takmasını sağla",
      "Kilit üzerine teknisyenin adını, fotoğrafını ve tarihini içeren \"TEHLİKE - ÇALIŞMA VAR ŞALTERİ AÇMA\" etiketini bağla",
      "Sıfır enerji durumunu (Zero Energy State) başlatma butonuna basarak makinenin kesinlikle çalışmadığını fiziksel test et"
    ]
  },
  {
    "id": "isg_kaynak_sicak_is_izni_hot_work_permit",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "sıcak iş izni hot work",
      "kaynak yangın nöbetçisi fire watch",
      "kaynak çadırı yangın battaniyesi",
      "patlayıcı ortam gaz ölçümü"
    ],
    "baslik": "Sıcak İş İzni (Hot Work Permit) & Yangın Nöbetçisi (Fire Watch)",
    "ikon": "🔥",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kaynak/Taşlama Başlamadan 1 Saat Önce",
    "akilliFisilti": "🛡️ Kaynak alanının 11 metre çevresindeki tüm yanıcı maddeler uzaklaştırılır ve işlem sonrası 60 dk yangın nöbeti tutulur.",
    "oncedenYapilacaklar": [
      "Çalışma alanında 4 gazlı dedektör ile LEL (Patlayıcı gaz) ölçümü yap ve %0 olduğunu doğrula",
      "Taşınamayan yanıcı yüzeyleri onaylı silikon kaplı Yangın Battaniyeleri ile tamamen ört",
      "En az 2 adet 6 kg ABC Kuru Kimyevi Tozlu yangın söndürme cihazını kaynak noktasının 2 metre yanına yerleştir",
      "İSG Uzmanı onaylı \"Sıcak İş İzin Formu\"nu imzala ve çalışma bittikten sonra 60 dakika boyunca kıvılcım nöbetçisi (Fire Watch) beklet"
    ]
  },
  {
    "id": "isg_lehim_duman_tahliye_kolu_filtre",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "lehim duman emiş sistemi",
      "akrobat emiş kolu",
      "rosin flux dumanı astım",
      "hepa karbon duman filtresi"
    ],
    "baslik": "Elektronik Üretim Lehim Dumanı Tahliyesi & HEPA/Karbon Filtre",
    "ikon": "💨",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Haftalık / Filtre Doluluğu",
    "akilliFisilti": "🛡️ Lehim pastasındaki (Rosin/Flux) kolofon dumanı mesleki astıma yol açar; noktasal akrobat emiş kolu zorunludur.",
    "oncedenYapilacaklar": [
      "Akrobat emiş davlumbazını lehimleme noktasının en fazla 10-15 cm yukarısına konumlandır",
      "Lokal emiş ünitesinin emiş debisini (Hava hızı: en az 0.5 m/s) anemometre ile ölç",
      "Ünitedeki HEPA filtre ve aktif granül karbon filtrenin diferansiyel basınç göstergesini kontrol ederek tıkalı filtreleri değiştir",
      "Elektronik montaj teknisyenlerine yıllık Solunum Fonksiyon Testi (SFT) taraması planla"
    ]
  },
  {
    "id": "isg_is_ekipmani_guvenlik_isik_bariyeri_type4",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "pres ışık bariyeri optik perde",
      "type 4 emniyet ışık bariyeri",
      "pres çift el kumanda",
      "güvenli duruş mesafesi hesabı"
    ],
    "baslik": "Eksantrik/Hidrolik Pres Emniyet Işık Bariyeri (Type 4) & Çift El",
    "ikon": "🛑",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Vardiya Başlangıcı & Kalıp Değişimi",
    "akilliFisilti": "🛡️ Işık perdesine el girdiğinde pres koçu tehlikeli noktaya ulaşamadan milisaniyeler içinde durmalıdır (EN ISO 13855).",
    "oncedenYapilacaklar": [
      "EN ISO 13855 standardına göre Güvenlik Mesafesini (S = K x T + C) presin durma süresine göre hesapla",
      "Test çubuğunu ışık perdesinin tüm optik ışınları arasından geçirerek presin anında acil stop yaptığını doğrula",
      "Çift el kumanda butonlarının aynı anda 0.5 saniye içinde iki elle basılmasını zorunlu kılan senkronizasyon rölesini test et",
      "Mekanik volan ve kavrama muhafazalarının kapalı ve emniyet kilitlemeli (Interlock) olduğunu teyit et"
    ]
  },
  {
    "id": "sec_olay_yeri_balistik_kovan_numaralama_swap",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "olay yeri balistik kovan numaralama",
      "swap el svap alma kiti",
      "gözle görülmeyen parmak izi ninhidrin",
      "adli delil zinciri torbası"
    ],
    "baslik": "Olay Yeri İnceleme: Balistik Kovan Numaralama & GSR Swab",
    "ikon": "🚔",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Olay Anı / Derhal",
    "akilliFisilti": "👮 Delil numaralandırma sarı üçgen plaketler soldan sağa ve girişten merkeze doğru sırayla yerleştirilmeli, kovanlar elle tutulmamalıdır.",
    "oncedenYapilacaklar": [
      "Olay yerini güvenlik şeridiyle çevreleyip adli giriş-çıkış kontrol tutanağı (Kayıt Defteri) oluştur",
      "Boş kovan, mermi çekirdeği ve kan izlerini numaralı plaketlerle işaretleyip ölçekli metrik fotoğraflarını çek",
      "Şüphelinin el ve parmaklarından atış artığı (GSR) tespiti için yapışkanlı karbon bantlarla swap numuneleri al",
      "Her bir kovanı barkodlu delil poşetine koyup mühürlü delil zinciri teslim tutanağı ile Kriminal Laboratuvara sevk et"
    ]
  },
  {
    "id": "sec_yangin_flashover_backdraft_ventilasyon_taktigi",
    "category": "ev_teknik",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "yangın flashover backdraft",
      "hidrolik ventilasyon duman tahliyesi",
      "kapalı alan yangın 3d su sıkma",
      "itfaiye puls tekniği"
    ],
    "baslik": "İtfaiye Taktikleri: Flashover/Backdraft Önleme & 3D Su Sıkma",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "Müdahale Anı",
    "akilliFisilti": "🚒 Kararmış camlar ve kapı altından içeri hava çekilmesi Backdraft belirtisidir; kapıyı doğrudan açmayın, üstten soğutma yapın.",
    "oncedenYapilacaklar": [
      "Kapıya dokunmadan termal kamera ile üst bölgedeki ısı tabakasını ve dumanın rengini/yoğunluğunu analiz et",
      "Duman katmanının alev almasını (Flashover) önlemek için tavana kısa süreli darbeli sis (3D Pulsing) su atışı yap",
      "Kapalı alana temiz hava girişi yapmadan önce çatı veya üst pencerelerden dikey duman tahliye (ventilasyon) hattı aç",
      "SCBA solunum tüpü basıncı 100 Bar altına düşmeden ekibin tahliye güvenlik sınırını (Kişisel Güvenlik Kuralı) işlet"
    ]
  },
  {
    "id": "sec_asker_gece_gorus_nvd_sifirlama_lazer_peq",
    "category": "ev_teknik",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "gece görüş sıfırlama nvd",
      "peq 15 ir lazer hizalama",
      "askeri pvs 14 gece optiği",
      "kızılötesi aydınlatıcı hedefleme"
    ],
    "baslik": "Askeri Gece Görüş (NVG) & IR Lazer / PEQ-15 Sıfırlama",
    "ikon": "🪖",
    "renk": "#E2E8D5",
    "varsayilanZaman": "İntikal Öncesi",
    "akilliFisilti": "🪖 Gece görüş tüpleri (Gen 3) yoğun ışık altında kalırsa fosfor tabakası yanar; gündüz kapaklarını sadece karanlıkta çıkarın.",
    "oncedenYapilacaklar": [
      "PVS-14 / binoküler gece görüş cihazının dioptri ve sonsuz netlik odaklama ayarını karanlık odada yap",
      "Silah üzerindeki PEQ-15 / DBAL ünitesinin görünmez IR lazerini gece poligonunda 100 metre hedefine göre sıfırla",
      "Yedek lityum CR123A pilleri ve lens buğu önleyici kaplamaları teçhizat hücum yeleğine yerleştir",
      "Dost birlik ayrımı için kask arkasındaki IR reflektif bayrak ve IFF çakar (strobe) cihazlarının frekansını test et"
    ]
  },
  {
    "id": "sec_cezaevi_acik_kapali_sayim_ve_arama_rutini",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "cezaevi sayım rutini",
      "infaz koruma koğuş araması",
      "cezaevi yasak madde dedektör",
      "infaz mevzuatı nöbet devri"
    ],
    "baslik": "İnfaz Koruma: Sabah/Akşam Sayımı & Koğuş Güvenlik Taraması",
    "ikon": "🏢",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Sabah 08:00 / Akşam 20:00",
    "akilliFisilti": "👮 Sayım esnasında tüm hükümlü ve tutukluların bizzat yüzleri ve fiziki varlıkları görülmeden sayım defteri kesinlikle imzalanmaz.",
    "oncedenYapilacaklar": [
      "Koğuş kapılarını açarak hükümlüleri teker teker fiziki olarak sayıp UYAP Ceza İnfaz modülündeki mevcuttan düş",
      "Dedektör köpekler, el ve duvar tipi metal detektörleri ile koğuş pencereleri, priz yuvaları ve zemin mazgallarını ara",
      "Hükümlülerin teslim aldığı reçeteli ilaçların ağız içi kontrolünü yaparak biriktirme ve takas riskini önle",
      "Sayım sonuçlarını ve vukuat durumunu nöbetçi müdür ve infaz başmemuru huzurunda tutanağa bağla"
    ]
  },
  {
    "id": "sec_sahil_guvenlik_deniz_denetim_botu_sarr_plani",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "sahil güvenlik sar arama kurtarma",
      "deniz hudut güvenliği bot devriyesi",
      "ais transponder kapatma kontrol",
      "deniz kirliliği denetimi"
    ],
    "baslik": "Sahil Güvenlik: Deniz Sınır Güvenliği & SAR Arama Kurtarma",
    "ikon": "🚤",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Devriye Görevi",
    "akilliFisilti": "⚓ Karasularımızda AIS cihazını kapatan veya rota dışına çıkan şüpheli deniz araçlarına telsiz ikazı verip aborda olun.",
    "oncedenYapilacaklar": [
      "Sahil Güvenlik botunun radar, termal FLIR ve uydu haberleşme sistemlerinin operasyonel hazırlığını denetle",
      "SAR (Arama Kurtarma) grid haritasını rüzgar yönü ve akıntı sürüklenme modellerine (drift model) göre çiz",
      "Şüpheli teknelerin aborda denetiminde can yelekleri, pasaport/denizci cüzdanı ve gemi adamı belgelerini sorgula",
      "Kaçak avcılık ve deniz kirliliği tespitlerinde 1380 Sayılı Su Ürünleri Kanunu gereği idari para cezası ve tutanak düzenle"
    ]
  },
  {
    "id": "isg_kapali_alan_giris_izin_formu_oksijen_gaz_olcum",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "kapalı alan giriş izin formu",
      "isg kapalı alan gaz ölçümü",
      "oksijen seviyesi %19.5 23.5",
      "h2s co lell patlayıcı gaz testi"
    ],
    "baslik": "İSG Kapalı Alan (Confined Space) Giriş İzni & Çoklu Gaz Ölçümü",
    "ikon": "⚠️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Giriş Öncesi (0-15 Dk)",
    "akilliFisilti": "🛡️ Oksijen oranı %19.5 altında veya %23.5 üzerindeyse ya da LEL %10 üzerindeyse kapalı alana kesinlikle giriş izni verilemez.",
    "oncedenYapilacaklar": [
      "Kalibrasyonlu 4'lü gaz dedektörü (O2, LEL, CO, H2S) ile tank/kuyu girişinin taban, orta ve tavan seviyelerinden örnekleme yap",
      "Cebri havalandırma fanı (Ex-proof blower) bağlayarak kapalı alan havasını sürekli taze hava ile süpür",
      "Giriş yapacak personele paraşüt tipi emniyet kemeri, kaçış maskesi ve üçayak (tripod) kurtarma vinci bağla",
      "Dışarıda eğitimli bir nöbetçi (gözlemci) görevlendirerek süreli \"Kapalı Alana Giriş İzin Formu\"nu imzala"
    ]
  },
  {
    "id": "isg_is_kazasi_sgk_bildirimi_3_is_gunu_kok_sebep",
    "category": "resmi",
    "domain": "ISG",
    "keywords": [
      "iş kazası sgk bildirimi 3 iş günü",
      "isg iş kazası kök sebep analizi",
      "iş kazası 5 neden balık kılçığı",
      "iş kazası tutanağı"
    ],
    "baslik": "İş Kazası: 3 İş Günü SGK Yasal Bildirimi & Kök Sebep Analizi",
    "ikon": "📋",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kaza Sonrası İlk 72 Saat",
    "akilliFisilti": "🛡️ 6331 Sayılı Kanun gereği iş kazaları en geç kazadan sonraki 3 İŞ GÜNÜ içinde SGK portalına bildirilmek zorundadır.",
    "oncedenYapilacaklar": [
      "Kazazedeye ilk yardımın uygulanması ve sağlık kuruluşuna sevkini sağlayıp hastane epikrizini dosyala",
      "Olay yerinin fotoğraflarını çekip görgü tanıklarının yazılı ve imzalı ifadelerini kaza tutanağına bağla",
      "SGK İş Kazası ve Meslek Hastalığı e-Bildirim Sistemi üzerinden 3 iş günü dolmadan yasal bildirimi onayla",
      "İSG kurulu ile \"5 Neden (5 Why)\" veya Balık Kılçığı kök sebep analizi yaparak düzeltici önleyici faaliyet (DÖF) başlat"
    ]
  },
  {
    "id": "isg_gurultu_ve_titresim_maruziyet_leyd_olcumu",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "gürültü maruziyet ölçümü leyd",
      "isg 85 dba kulaklık zorunluluğu",
      "el kol tüm vücut titreşimi ölçümü",
      "dozimetre ortam ölçümü"
    ],
    "baslik": "Fiziksel Riskler: Kişisel Gürültü Dozimetresi & Titreşim Analizi",
    "ikon": "🎧",
    "renk": "#FED7AA",
    "varsayilanZaman": "Periyodik Ortam Ölçümü",
    "akilliFisilti": "🛡️ Günlük gürültü maruziyet düzeyi (LEX, 8h) 85 dB(A) değerini aştığında kulak koruyucu donanım kullanımı yasal zorunluluktur.",
    "oncedenYapilacaklar": [
      "Akredite laboratuvar cihazı (Kişisel Gürültü Dozimetresi) ile çalışanın omuz bölgesinden 8 saatlik maruziyet kaydı al",
      "Gürültü haritası çıkararak 80 dB(A) (Alt eylem), 85 dB(A) (Üst eylem) ve 87 dB(A) (Sınır değer) alanlarını işaretle",
      "Pnömatik kırıcı ve forklift operatörlerinde El-Kol (5 m/s²) ve Bütün Vücut (1.15 m/s²) titreşim sınırlarını kontrol et",
      "Teknik tedbirler (akustik kabin, titreşim sönümleyici eldiven) ve rotasyonlu çalışma planını devreye al"
    ]
  },
  {
    "id": "isg_ramak_kala_olay_bildirim_karti_ve_risk_degerlendirme",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "ramak kala olay bildirimi",
      "isg ramak kala kutusu",
      "near miss risk değerlendirme",
      "döf ramak kala formu"
    ],
    "baslik": "Proaktif İSG: Ramak Kala (Near-Miss) Bildirimi & DÖF Takibi",
    "ikon": "⚡",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Tespit Anı",
    "akilliFisilti": "🛡️ Heinrich Piramidi kuralına göre bildirilen her 300 ramak kala olay, 1 ölümlü/ağır kazanın önlenmesini sağlar.",
    "oncedenYapilacaklar": [
      "Çalışan tarafından doldurulan veya mobil İSG uygulamasından girilen Ramak Kala Olay Bildirim Formunu incele",
      "Tehlikeli durum ve tehlikeli davranışı yerinde inceleyerek risk matrisinde (Olasılık x Şiddet) skorla",
      "İlgili bölüm sorumlusu ve teknik ekibe acil Düzeltici Önleyici Faaliyet (DÖF) termin süresi (24-48 saat) ata",
      "Tamamlanan aksiyonun fotoğraflarını çekip İSG panosunda \"Önlenen Tehlike\" olarak çalışanlarla paylaş"
    ]
  },
  {
    "id": "isg_patlamadan_korunma_dokumani_pkd_zone_haritasi",
    "category": "resmi",
    "domain": "ISG",
    "keywords": [
      "patlamadan korunma dokümanı pkd",
      "isg atex zone hesaplaması",
      "toz patlaması lfl ufl analizi",
      "bölge 0 1 2 zone sınıflandırması"
    ],
    "baslik": "PKD: Patlamadan Korunma Dokümanı & Bölge (Zone) Haritalama",
    "ikon": "💥",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Yıllık / Tesis Değişikliği",
    "akilliFisilti": "🛡️ Yanıcı sıvı, gaz ve patlayıcı toz bulunan işletmelerde EN 60079-10 standartlarına uygun PKD hazırlanması zorunludur.",
    "oncedenYapilacaklar": [
      "Tesisteki kimyasal maddelerin alev alma noktası, alt ve üst patlama limitleri (LFL/UFL) ve buharlaşma hızlarını belirle",
      "Gaz ve buharlar için Zone 0, Zone 1, Zone 2; yanıcı tozlar için Zone 20, Zone 21, Zone 22 tehlikeli bölge yarıçaplarını hesapla",
      "Tehlikeli bölgelerde çalışan elektrik motorları, aydınlatmalar ve anahtarların ATEX sertifika uygunluğunu doğrula",
      "Patlama baskılama, alev tutucu (flame arrester) ve statik topraklama protokollerini içeren PKD dosyasını onayla"
    ]
  },
  {
    "id": "emniyet_olay_yeri_parmak_izi_daktiloskopi_mukayese",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "olay yeri parmak izi daktiloskopi",
      "afis parmak izi sorgulama",
      "parmak izi mukayese raporu",
      "olay yeri folyo transfer daktiloskopi"
    ],
    "baslik": "Olay Yeri İnceleme: Daktiloskopi (Parmak İzi) Tespiti & AFİS Mukayesesi",
    "ikon": "🔍",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Olay Yeri Müdahale Anı",
    "akilliFisilti": "👮 Parmak izi yüzeyden manyetik tozla transfer edilir, APFIS/AFİS sisteminde en az 12 karakteristik nokta ile eşleştirilir.",
    "oncedenYapilacaklar": [
      "Olay yerindeki cam, kapı kolu ve kasa yüzeylerine siyah manyetik daktiloskopi tozu ve devekuşu tüyü fırça ile müdahale et",
      "Geliştirilen gizli (latent) parmak izlerini daktiloskopi transfer bandı (folyo) ile kaldırıp asetat kartına yapıştır",
      "İz kartına numara vererek makro lens ve milimetrik cetvelle yüksek çözünürlüklü fotoğraflarını çek",
      "AFİS (Otomatik Parmak İzi Teşhis Sistemi) veri tabanına yükleyip 12 delta/adacık benzerlik noktası raporunu hazırla"
    ]
  },
  {
    "id": "emniyet_trafik_uyusturucu_test_cihazi_dsk_raporu",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "tck 179 trafik uyuşturucu testi",
      "tükürükten uyuşturucu tespit kiti",
      "adli tıp kan idrar teyidi",
      "uyuşturucu etkisinde araç kullanma 5 yıl ceza"
    ],
    "baslik": "KTK 48/8 Uyuşturucu/Uyarıcı Madde Denetimi & Tükürük Test Cihazı (DSK)",
    "ikon": "🚔",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Yol Kontrol / Şüpheli Sürücü Durdurma",
    "akilliFisilti": "👮 Tükürük test kitiyle uyuşturucu pozitif çıkarsa sürücü belgesi 5 yıl geri alınır ve adli tabipliğe sevk edilir.",
    "oncedenYapilacaklar": [
      "Sürücüye tek kullanımlık steril tükürük numune alma çubuğunu (Uyuşturucu/Uyarıcı Test Kiti) uygula",
      "Mobil analizör cihazında THC, Kokain, Opiat, Amfetamin panellerinin pozitif/negatif sonuç çıktısını al",
      "Sonucun pozitif çıkması durumunda sürücüyü kesin teyit için 2 saat içinde Adli Tıp / Devlet Hastanesine kan/idrar tahliline sevk et",
      "KTK 48/8 maddesince idari para cezası ve 5 yıl ehliyete el koyma tutanağı tanzim et, aracı otoparka çektir"
    ]
  },
  {
    "id": "emniyet_onleme_aramasi_ve_hukuki_karar_denetimi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "pvska önleme araması kararı",
      "hakim önleme araması müzekkeresi",
      "gecikmesinde sakınca bulunan hal arama",
      "üst ve araç arama tutanağı"
    ],
    "baslik": "PVSK 9 & Adli Önleme Aramaları Yönetmeliği Uygulaması",
    "ikon": "👮",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Genel Asayiş Uygulaması Başlangıcı",
    "akilliFisilti": "👮 Önleme araması için Sulh Ceza Hakimliği kararı veya mülki amirin yazılı emri zorunludur; tutanak tanzim edilir.",
    "oncedenYapilacaklar": [
      "Kaymakamlık/Valilik onaylı ve Sulh Ceza Hakimliği kararına bağlanmış geçerli Önleme Araması Karar metnini kontrol et",
      "Arama yapılacak cadde, meydan, umuma açık yer ve zaman aralığının karar kapsamı içinde olduğunu teyit et",
      "Şahısların kaba üst aramasını hemcins personel marifetiyle yap; araç aramalarında bagaj ve torpido kontrollerini gerçekleştir",
      "Ele geçirilen suç unsuru (kesici alet, ruhsatsız silah, madde) için \"Yakalama ve Muhafaza Altına Alma Tutanağı\" düzenle"
    ]
  },
  {
    "id": "emniyet_kayip_sahis_ve_cocuk_alarmi_sistemi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "kayıp çocuk alarmı ilk 24 saat",
      "kayıp şahıs sistem girişi kps",
      "hts baz istasyonu sinyal takibi",
      "kayıp ihbarı güvenlik kamerası taraması"
    ],
    "baslik": "Kayıp Şahıs & Çocuk İhbarı: İlk 24 Saatlik Acil Eylem Protokolü",
    "ikon": "🚨",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İhbarın Alındığı An (0. Dakika)",
    "akilliFisilti": "👮 Çocuk ve alzheimer vakalarında ilk 24 saat hayati önemdedir; bekleme süresi olmaksızın derhal sisteme işlenir.",
    "oncedenYapilacaklar": [
      "Kayıp şahsın güncel fotoğraflarını, giysi eşkalini, fiziksel/medikal durumunu Pol-Net Kayıp Şahıslar Modülüne anında gir",
      "Gecikmesinde sakınca bulunan hal kapsamında Nöbetçi Savcılıktan GSM HTS/Sinyal Baz istasyonu konum tespiti talep et",
      "Şahsın son görüldüğü noktadaki KGYS (Kent Güvenlik Yönetim Sistemi) ve esnaf güvenlik kameralarını geriye dönük tara",
      "Otogar, tren garı, havalimanı ve hastane acil servislerine kayıp şahıs bilgi formunu telsiz ve data üzerinden anons et"
    ]
  },
  {
    "id": "emniyet_fiziki_ve_teknik_takip_tutanak_zinciri",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "cmk 140 teknik araçlarla izleme",
      "fiziki takip tarassut tutanağı",
      "hakim onaylı teknik takip süresi",
      "iletişimin tespiti cmk 135"
    ],
    "baslik": "CMK 140 Teknik Araçlarla İzleme & Fiziki Takip (Tarassut) Tutanağı",
    "ikon": "🕵️",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Operasyonel Takip Süreci",
    "akilliFisilti": "👮 CMK 140 teknik izleme kararı en fazla 3 haftalık sürelerle alınır; fiziki temaslar dakika dakika tutanağa bağlanır.",
    "oncedenYapilacaklar": [
      "Sulh Ceza veya Ağır Ceza Mahkemesinden alınan teknik izleme ve ses/görüntü kaydı kararının güncel süresini kontrol et",
      "Hedef şahsın giriş-çıkış yaptığı adresler, bindiği araçlar ve buluştuğu şahısları \"Fiziki Takip ve Tarassut Tutanağı\"na kronolojik yaz",
      "Fotoğraf ve video kayıtlarını hash (MD5/SHA256) doğrulamasıyla dijital delil torbasına aktar",
      "Süre bitiminde elde edilen delil durumunu fezlekeye bağlayarak Nöbetçi Cumhuriyet Savcısına sun"
    ]
  },
  {
    "id": "itfaiye_kapali_alan_yangin_backdraft_flashover_belirtisi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "backdraft patlama belirtileri",
      "flashover tavan duman sıcaklığı",
      "kapı sıcaklık kontrolü sırtı",
      "kapalı alan yangın termal kamera"
    ],
    "baslik": "Kapalı Alan Yangınları: Backdraft/Flashover Teşhisi & Kapı Açma Güvenliği",
    "ikon": "🔥",
    "renk": "#FECACA",
    "varsayilanZaman": "Daire/Depo Yangın Giriş Anı",
    "akilliFisilti": "🚒 İçeri hava girdiğinde Backdraft patlamasını önlemek için kapı arkası tavanına darbeli su püskürtülür (Pencere testi).",
    "oncedenYapilacaklar": [
      "Giriş kapısının sıcaklığını eldivenin dış yüzeyi (tersi) ile alt, orta ve üst kısımlardan dokunarak kontrol et",
      "Kapı altından veya anahtar deliğinden dumanın içe doğru emilip emilmediğini (Pulsing / Nefes alma hareketi) gözlemle",
      "Kapıyı gövdenin arkasına siper alarak sadece 5 cm arala ve tavan bölgesine kısa süreli sisleme (Pulsing) su atışı yap",
      "Termal kamera (TIC) ile tavan sıcaklığının 500°C üzerinde olup olmadığını kontrol ederek Flashover riskini değerlendir"
    ]
  },
  {
    "id": "itfaiye_endustriyel_yangin_kopuk_oranlama_proporisyoner",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "yangın köpüğü afff fluoroprotein %3 %6",
      "köpük melanjörü proporziyoner ayarı",
      "akaryakıt tank yangını köpük battaniyesi",
      "orta genleşmeli köpük lansı"
    ],
    "baslik": "Endüstriyel Akaryakıt Yangını: AFFF %3-%6 Köpük Melanjörü & Lansı",
    "ikon": "🧯",
    "renk": "#FECACA",
    "varsayilanZaman": "Akaryakıt / Kimyasal Yangın Müdahalesi",
    "akilliFisilti": "🚒 Sıvı hidrokarbon yangınlarında AFFF köpük lansı %3 oranında ayarlanır ve yakıt yüzeyine çarptırılarak battaniye serilir.",
    "oncedenYapilacaklar": [
      "Yanan hidrokarbon türüne göre polar çözücü ise AR-AFFF (Alkol Dirençli), petrol ise standart AFFF köpük konsantresi seç",
      "Arazöz hat melanjörü (Proporziyoner) üzerindeki emiş oranını %3 veya %6 pozisyonuna ayarla",
      "Köpük lansını doğrudan alevin göbeğine değil, tank çeperine veya zemine çarptırarak köpüğün yakıt üzerine yumuşak akmasını sağla",
      "Yakıt yüzeyindeki buharlaşmayı kesen köpük örtüsünün (Battaniye) bozulmadığını sürekli takviye ile izle"
    ]
  },
  {
    "id": "itfaiye_arac_ici_sikisma_holmatro_kesici_ayirici",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "araç içi sıkışmalı kaza kurtarma",
      "hidrolik kesici ayırıcı holmatro",
      "araç akü kutup başı kesme",
      "cam kırma ve boyunluk takma"
    ],
    "baslik": "Trafik Kazası Sıkışma: Araç Sabitleme, Akü Kesme & Hidrolik Kurtarma",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "Kaza Yeri Müdahale Anı",
    "akilliFisilti": "🚒 Hava yastığı patlama riskine karşı önce araç takozlanır, 12V akü kutup başı kesilir ve C-boyunluk takılır.",
    "oncedenYapilacaklar": [
      "Kaza yapan aracı kademeli ahşap takozlar (Chock) ve sabitleme kayışları ile tamamen hareketsiz hale getir",
      "Airbag sensörlerinin devre dışı kalması ve yangın riskini önlemek için 12V servis aküsünün eksi kutbunu kes",
      "Yaralının üzerine koruma örtüsü serip cam kırıcı ile arka kelebek camını patlatarak acil tıp teknisyenini içeri al",
      "Hidrolik ayırıcı/kesici ile B sütununu ve menteşeleri keserek tavanı tamamen geriye katla (Roof Flapping)"
    ]
  },
  {
    "id": "itfaiye_tehlikeli_madde_hazmat_turuncu_tabela_ve_zonlama",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "hazmat turuncu tabela kemler un no",
      "tehlikeli madde sıcak ılık soğuk zon",
      "hazmat seviye a gaz sızdırmaz elbise",
      "dekontaminasyon arındırma çadırı"
    ],
    "baslik": "HAZMAT Seviye A Müdahalesi: UN Kodu Tespiti & Sıcak/Soğuk Zon Ayrımı",
    "ikon": "☣️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kimyasal Sızıntı / Kaza Anı",
    "akilliFisilti": "🚒 Turuncu tabeladaki üst numara (Kemler Kodu) tehlike tipini, alt numara UN kimyasal maddesini tanımlar.",
    "oncedenYapilacaklar": [
      "Dürbünle tanker üzerindeki turuncu tabelayı oku (Örn: Üst 33 = Çok Parlayıcı Sıvı, Alt 1203 = Benzin) ve ERG rehberini aç",
      "Rüzgarı arkaya alarak olay yerini \"Sıcak Zon\" (Giriş Yasağı), \"Ilık Zon\" (Dekontaminasyon) ve \"Soğuk Zon\" olarak şeritle",
      "Müdahale ekibine Seviye A tam gaz sızdırmaz kimyasal koruyucu elbise ve SCBA solunum seti giydir",
      "Çıkış noktasına kimyasal nötralizasyon sağlayan Dekontaminasyon (Arındırma) duş çadırını kur"
    ]
  },
  {
    "id": "itfaiye_yuksek_kat_kurtarma_ipu_makara_ve_istasyon",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "ipte erişim kurtarma makara palanga",
      "ana emniyet istasyonu çift nokta",
      "sedye tahliyesi kılavuz ipi",
      "itfaiye statik ip en 1891"
    ],
    "baslik": "Yüksek Açı İple Kurtarma: Çift Emniyetli İstasyon & 3:1 Z-Rig Palanga",
    "ikon": "🧗",
    "renk": "#FECACA",
    "varsayilanZaman": "Kuyu/Yüksek Bina Kurtarma",
    "akilliFisilti": "🚒 İple kurtarmada ana hat ve emniyet hattı (Back-up) olmak üzere bağımsız iki ankraj noktası oluşturulur.",
    "oncedenYapilacaklar": [
      "EN 1891 Type A 11 mm statik kurtarma iplerini iki farklı bağımsız yapısal kolona veya araç çeki demirine bağla",
      "Yükü %33 hafifletmek için ana hatta 3:1 mekanik avantajlı Z-Rig makara ve kilitli kavrayıcı (Prusik/ID) sistemini kur",
      "Vakum sedyeye sabitlenen kazazedenin yatay dengesini sağlamak için kılavuz yönlendirme iplerini bağla",
      "Kenar koruyucu makaralar (Edge Roller) kullanarak iplerin parapet ve beton köşelerinde aşınmasını engelle"
    ]
  },
  {
    "id": "isg_risk_degerlendirmesi_fine_kinney_matris",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "fine kinney risk analizi",
      "5x5 l tipi matris isg",
      "isg risk değerlendirme raporu",
      "isg tehlike frekans şiddet olasılık"
    ],
    "baslik": "6331 Sayılı Kanun Risk Değerlendirmesi: Fine-Kinney / 5x5 L-Matris",
    "ikon": "⚠️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yıllık Güncelleme / Yeni Makine Kurulumu",
    "akilliFisilti": "⚠️ Fine-Kinney yönteminde Risk Skoru = Olasılık x Frekans x Şiddet formülüyle hesaplanır ve 400 üzeri derhal durdurulur.",
    "oncedenYapilacaklar": [
      "İşyerindeki tüm prosesleri, kimyasal maruziyetleri ve mekanik tehlikeleri saha turuyla listele",
      "İSG Risk Değerlendirme Ekibi (Uzman, Hekim, Çalışan Temsilcisi, Destek Elemanı) ile puanlama toplantısı yap",
      "Skoru yüksek çıkan tehlikeler için Kaynakta Yok Etme > İkame > Mühendislik Önlemi > KKD hiyerarşisini uygula",
      "İBYS (İş Sağlığı ve Güvenliği Bilgi Yönetim Sistemi) üzerinden risk değerlendirme özetini bakanlığa bildir"
    ]
  },
  {
    "id": "isg_kapali_alan_calisma_izni_ve_4_gaz_olcumu",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "kapalı alan çalışma izni ptw",
      "4 lü gaz dedektörü leler o2 h2s co",
      "menhol silo çalışma havalandırma",
      "kapalı alan gözlemcisi nöbetçi"
    ],
    "baslik": "Kapalı Alan Çalışma İzni (PTW): 4 Gaz Ölçümü (O2, LEL, CO, H2S)",
    "ikon": "🛑",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Menhol/Kazan Girişinden 15 Dk Önce",
    "akilliFisilti": "⚠️ Oksijen oranı %19.5 - %23.5 aralığında, LEL patlama sınırı <%10 olmalıdır; dışarıda yedek kurtarıcı nöbet tutar.",
    "oncedenYapilacaklar": [
      "Kalibreli 4’lü gaz dedektörü pompalı probu ile menhol tabanı, ortası ve tavanından hava numunesi ölçümü yap",
      "Alan içine patlamaya dayanıklı (Ex-Proof) cebri havalandırma fanı (Salyangoz fan) bağlayarak sürekli temiz hava bas",
      "İçeri girecek personele paraşüt tipi emniyet kemeri, kurtarma vinci (Tripod) çelik halatı ve kaçış maskesi tak",
      "İSG Uzmanı, Vardiya Amiri ve Çalışan imzalı \"Kapalı Alan Sıcak/Soğuk Çalışma İzin Formu\"nu girişe as"
    ]
  },
  {
    "id": "isg_gurultu_ve_titresim_kisisel_maruziyet_olcumu",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "gürültü maruziyet eylem değeri 85 dba",
      "kişisel gürültü dozimetresi lex 8h",
      "el kol tüm vücut titreşimi hdv",
      "kulak koruyucu snr değeri"
    ],
    "baslik": "Fiziksel Risk Etmenleri: Gürültü (85 dBA) & Titreşim Dozimetresi",
    "ikon": "🎧",
    "renk": "#FEF3C7",
    "varsayilanZaman": "8 Saatlik Vardiya Süresince",
    "akilliFisilti": "⚠️ Günlük gürültü maruziyet en yüksek eylem değeri 85 dBA, sınır değeri 87 dBA’dır; aşımda kulaklık kullanımı zorunludur.",
    "oncedenYapilacaklar": [
      "Çalışanın omuz hizasına Tip 2 Kişisel Gürültü Dozimetresi takarak 8 saatlik LEX, 8h değerini logla",
      "Gürültü haritası çıkararak 85 dBA üzerindeki alanları \"Zorunlu Kulak Koruyucu Bölgesi\" olarak işaretle",
      "Pnömatik kırıcı ve kompresör kullananlarda El-Kol Titreşim maruziyetini (Sınır Değer: 5 m/s²) triaksiyal ivmeölçerle ölç",
      "Odyometri (İşitme testi) sonuçlarında eşik kayması olan personeli rotasyonla sessiz bölümlere kaydır"
    ]
  },
  {
    "id": "isg_is_kazasi_sgk_ve_bakanlik_bildirim_protokolu",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "iş kazası sgk bildirimi 3 iş günü",
      "kök neden analizi 5 neden balık kılçığı",
      "ramak kala formu near miss",
      "iş kazası kaza araştırma tutanağı"
    ],
    "baslik": "6331 İSG İş Kazası İncelemesi, Kök Neden Analizi & 3 İş Günü SGK Bildirimi",
    "ikon": "📋",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kaza Anından İtibaren İlk 72 Saat",
    "akilliFisilti": "⚠️ İş kazası meydana geldiği tarihten itibaren en geç 3 iş günü içinde SGK elektronik portalına bildirilmek zorundadır.",
    "oncedenYapilacaklar": [
      "Yaralıya ilk yardım müdahalesini yaptırıp 112 ile hastaneye sevk et ve Olay Yeri Kaza Fotoğraflarını çek",
      "Görgü tanıklarının yazılı ifadelerini alarak Olay Yeri Kaza Araştırma Tutanağını düzenle",
      "Kazanın kök nedenini ortaya çıkarmak için \"5 Neden (5 Why)\" veya \"Balık Kılçığı (Ishikawa)\" analizini tamamla",
      "SGK E-Bildirge portalı üzerinden resmi \"İş Kazası ve Meslek Hastalığı Bildirim Formu\"nu 3 iş günü dolmadan onayla"
    ]
  },
  {
    "id": "isg_iskele_guvenlik_etiketi_yesil_kirmizi_scafftag",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "iskele scafftag yeşil etiket",
      "flanşlı kamalı cephe iskelesi ts en 12810",
      "iskele topukluk ana ara korkuluk",
      "iskele periyodik kontrol raporu"
    ],
    "baslik": "TS EN 12810 Güvenli İskele Kontrolü & Scafftag (Yeşil/Kırmızı) Etiketleme",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Haftalık Kontrol / Fırtına Sonrası",
    "akilliFisilti": "⚠️ İskelede 100 cm ana korkuluk, 50 cm ara korkuluk ve 15 cm topukluk şarttır; onaylı iskeleye Yeşil Scafftag asılır.",
    "oncedenYapilacaklar": [
      "İskele ayaklarının çelik taban plakası (Base Plate) ve ahşap taban kalasları üzerine tam bastığını kontrol et",
      "Binaya yapılan ankraj (Tie Point) bağlantı sıklığının statik hesap raporuna uygunluğunu tork anahtarıyla sık",
      "Platform kalasları arasında boşluk olmadığını, merdiven ve yaylı kapıların çalıştığını doğrula",
      "Yetkili iskele denetçisi tarafından kontrol formu imzalanarak iskele girişine \"KULLANILABİLİR - YEŞİL ETİKET\" tak"
    ]
  },
  {
    "id": "emniyet_olay_yeri_inceleme_delil_zinciri_cmk_134",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "olay yeri inceleme delil zinciri",
      "cmk 134 dijital materyal el koyma",
      "parmak izi transfer folyosu",
      "balistik kovan çekirdek zarflama",
      "olay yeri emniyet şeridi girilmez"
    ],
    "baslik": "Olay Yeri İnceleme: Güvenlik Şeridi, Delil Güvenlik Zinciri & CMK 134 Dijital El Koyma",
    "ikon": "👮",
    "renk": "#BFDBFE",
    "varsayilanZaman": "İlk Müdahale / Olay Anı",
    "akilliFisilti": "👮 Delil zincirinin (Chain of Custody) bozulmaması için her delil numaralandırılarak tutanağa bağlanmalı, dijital cihazların derhal adli imajı (hash) alınmalıdır.",
    "oncedenYapilacaklar": [
      "Geniş açılı olay yeri güvenlik şeridini çekerek yetkisiz kişilerin ve personelin girişini engelle",
      "Kovan, mermi çekirdeği ve biyolojik bulguları sarı delil numaralarıyla işaretleyip fotoğrafla",
      "Biyolojik swap örneklerini ve parmak izlerini steril delil torbalarına mühürlü olarak koy",
      "CMK 134 gereği hakim kararıyla el konulan dijital cihazların Faraday torbasına alınmasını ve MD5/SHA256 hash çıktısını hazırla"
    ]
  },
  {
    "id": "emniyet_pvska_onleme_aramasi_ve_durdurma_yetkisi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "pvska madde 4/a durdurma ve kimlik sorma",
      "önleme araması hakim kararı",
      "makul şüphe kaba üst yoklaması",
      "şüpheli şahıs gbt sorgusu",
      "silah arama emniyet tedbiri"
    ],
    "baslik": "PVSK Madde 4/A Durdurma, Kimlik Sorma, Makul Şüphe & Kaba Üst Yoklaması",
    "ikon": "🛡️",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Devriye / Yol Uygulaması",
    "akilliFisilti": "🛡️ Durdurma yetkisinde kişiye durdurma sebebi açıkça bildirilir; kaba üst yoklaması sadece silah veya tehlikeli alet kontrolü ile sınırlıdır.",
    "oncedenYapilacaklar": [
      "Durdurulan şahsa resmi sıfatı ve durdurma gerekçesini açık, nazik bir dille bildir",
      "Şahsın ellerini görünür yerde tutmasını isteyerek kendi can emniyetini ve çevre güvenliğini sağla",
      "Dıştan sıvazlama yoluyla silah/tehlikeli cisim olup olmadığını kontrol et (Giysi altı aranamaz)",
      "POLNET/GBT üzerinden kimlik sorgulaması yaparak arama/yakalama kaydını doğrula"
    ]
  },
  {
    "id": "emniyet_gozalti_nezarethane_talimati_ve_doktor_raporu",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "gözaltı nezarethane talimatı",
      "adli muayene giriş çıkış raporu",
      "cmk 91 gözaltı süresi 24 saat",
      "yakalama gözaltı tutanağı",
      "nezarethane üst arama emanet"
    ],
    "baslik": "CMK 91 Gözaltı Süreci: Giriş/Çıkış Adli Muayene & Nezarethane Güvenlik Protokolü",
    "ikon": "⚖️",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Karakol / Nezarethane Girişi",
    "akilliFisilti": "⚖️ Gözaltına alınan kişi nezarethaneye konulmadan önce ve salıverilirken/adliyeye sevk edilirken hekim muayenesinden geçirilmesi yasal zorunluluktur.",
    "oncedenYapilacaklar": [
      "Cumhuriyet Savcısına bilgi vererek yazılı/sözlü gözaltı talimatını al ve Yakalama Tutanağını düzenle",
      "Şahsı derhal sağlık kuruluşuna sevk ederek hekim eşliğinde Giriş Adli Muayene Raporunu aldır",
      "Şahsın kemer, bağcık, saat, kesici eşyalarını tutanakla teslim alıp nezarethane emanetine kaydet",
      "Gözaltı süresi 24 saati (toplu suçlarda savcı uzatmasıyla 48-96 saati) geçmeyecek şekilde evrakı hazırla"
    ]
  },
  {
    "id": "emniyet_meskun_mahal_baskin_operasyonu_ve_kocbasi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "özel harekat meskun mahal operasyon",
      "koçbaşı ile kapı kırma giriş",
      "taktik balistik kalkan koçbaşı",
      "oda temizleme fatal funnel",
      "şüpheli kelepçeleme emniyet"
    ],
    "baslik": "Özel Harekât / Asayiş: Meskûn Mahal Dinamik Giriş & Hücre Temizleme",
    "ikon": "🪖",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Operasyon Başlangıcı / Şafak",
    "akilliFisilti": "🪖 Kapı eşiği (Fatal Funnel) en tehlikeli bölgedir; balistik kalkan eşliğinde dinamik hızla içeri girilmeli ve kör noktalar paylaşılmalıdır.",
    "oncedenYapilacaklar": [
      "Hedef binanın çevre emniyetini ve kaçış güzergahlarını kapat",
      "Koçbaşı veya hidrolik kırıcı ile kapı kilidine sert müdahale yapıp dinamik giriş sağla",
      "Giriş timi 1 numaralı kalkan personelini takip ederek çapraz ve derin köşe sektörlerini emniyete al",
      "Şahısların ellerini baş arkasına aldırıp plastik kelepçe ile etkisiz hale getirerek güvenli tahliye yap"
    ]
  },
  {
    "id": "emniyet_trafik_alkol_promil_ve_uyusturucu_testi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "trafik alkolmetre üfleme testi",
      "2918 ktk 48/5 alkollü araç kullanma",
      "0.50 promil hususi araç sınırı",
      "uyuşturucu test kiti tükürük",
      "alkolmetre reddi ehliyet 2 yıl"
    ],
    "baslik": "2918 Sayılı KTK m.48 Alkolmetre & Tükürükten Uyuşturucu Test Kiti Denetimi",
    "ikon": "🚦",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Gece Uygulaması / Trafik Denetimi",
    "akilliFisilti": "🚦 Alkolmetreye üflemeyi reddeden sürücünün sürücü belgesine doğrudan 2 yıl süreyle el konulur ve ağır idari para cezası uygulanır.",
    "oncedenYapilacaklar": [
      "Sürücüye kalibrasyonlu alkolmetre cihazına hijyenik tek kullanımlık ağızlıkla üflemesini söyle",
      "Ölçüm sonucunu yazıcıdan iki nüsha çıktı alarak sürücüye imzalat",
      "Hususi araçlarda 0.50 promil, ticari araçlarda 0.20 promil üzeri alkol tespitinde aracı bağla ve ehliyeti geçici geri al",
      "Uyuşturucu şüphesinde mobil uyuşturucu tespit cihazıyla (Draeger vb.) tükürük numunesi al"
    ]
  },
  {
    "id": "itfaiye_flasover_backdraft_ventilasyon_taktigi",
    "category": "saglik",
    "domain": "SAVUNMA",
    "keywords": [
      "flashover backdraft yangın emniyet",
      "pozitif basınçlı ventilatör ppv",
      "pulsing darbe su atış tekniği",
      "termal kamera yangın tarama",
      "kapı kontrolü yangın sıcaklık"
    ],
    "baslik": "Kapalı Alan Yangınları: Flashover / Backdraft Tespiti & PPV Taktik Ventilasyon",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "Yangına Giriş Öncesi",
    "akilliFisilti": "🚒 Kararmış camlar, kapı altından içeri hava çekilmesi ve sarı-gri duman backdraft işaretidir; kapı aniden açılmamalı, üstten darbe soğutma (pulsing) yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Giriş kapısını açmadan elin tersiyle ve termal kamera ile kapı üstü sıcaklığını kontrol et",
      "Kapıyı aralayarak tavana doğru kısa darbeli sis nozulu atışları (Pulsing) ile duman tabakasını soğut",
      "Çıkış açıklığı oluşturulmadan önce asla içeri Pozitif Basınçlı Fan (PPV) ile hava basma",
      "Giriş yapan 2 kişilik timin SCBA tüp basınçlarını (Min 250 Bar) ve manometrelerini eşleştir"
    ]
  },
  {
    "id": "itfaiye_kimyasal_hazmat_a_seviye_elbise_ve_dekon",
    "category": "saglik",
    "domain": "SAVUNMA",
    "keywords": [
      "hazmat kimyasal sızıntı müdahale",
      "seviye a tam gaz sızdırmaz elbise",
      "kimyasal dekontaminasyon çadırı",
      "ph ölçüm klor amonyak dedektörü",
      "sıcak bölge sınırlandırma hazmat"
    ],
    "baslik": "Tehlikeli Madde (HAZMAT): Seviye A Gaz Sızdırmaz Elbise & Dekontaminasyon",
    "ikon": "☣️",
    "renk": "#FECACA",
    "varsayilanZaman": "Kimyasal Kaza / Acil Durum",
    "akilliFisilti": "☣️ Gaz ve buhar sızıntısı olan Sıcak Bölgeye sadece dahili SCBA içeren Seviye A gaz sızdırmaz tulumla girilir; çıkışta dekon zorunludur.",
    "oncedenYapilacaklar": [
      "Rüzgarı arkaya alarak Sıcak, Ilık ve Soğuk bölgeleri emniyet şeritleriyle sınırla",
      "Müdahale timine Seviye A tulumu ve pozitif basınçlı solunum setini basınç testiyle giydir",
      "Ilık bölge sınırında 3 aşamalı Dekontaminasyon (Yıkama, nötralizasyon, soyunma) koridorunu kur",
      "Fotoiyonizasyon (PID) ve 4’lü gaz dedektörü ile sızıntı merkezinde gaz konsantrasyonunu belirle"
    ]
  },
  {
    "id": "itfaiye_arac_ici_sikisma_holmatro_kesici_ayirici",
    "category": "saglik",
    "domain": "SAVUNMA",
    "keywords": [
      "trafik kazası kurtarma kesici ayırıcı",
      "holmatro lukas hidrolik ayırıcı",
      "araç sabitleme takozlama cribbing",
      "cam patlatma cam testeresi",
      "tavan kesme kaza kurtarma"
    ],
    "baslik": "Trafik Kazası Kurtarma (Extrication): Hidrolik Kesici-Ayırıcı & Tavan Kesme",
    "ikon": "🚗",
    "renk": "#FECACA",
    "varsayilanZaman": "Kaza Yeri Müdahale",
    "akilliFisilti": "🚗 Kesme işlemine başlamadan önce aracın akü kutup başı sökülmeli ve patlamamış hava yastığı (Airbag) tüpleri kontrol edilmelidir.",
    "oncedenYapilacaklar": [
      "Aracı step takozları ve sabitleme gergileri (cribbing) ile tamamen sabitle",
      "Aracın 12V akü bağlantısını keserek elektrik ve hava yastığı tetikleme riskini sıfırla",
      "Yaralının üzerine koruma örtüsü ser ve yan camları merkez zımbasıyla (punç) kırarak uzaklaştır",
      "B ve C sütunlarını hidrolik makasla keserek tavanı geriye doğru katla ve yaralıyı KED yeleğiyle çıkar"
    ]
  },
  {
    "id": "itfaiye_derin_kuyu_ve_kapali_alan_tripod_kurtarma",
    "category": "saglik",
    "domain": "SAVUNMA",
    "keywords": [
      "kuyu kurtarma kurtarma tripodu",
      "kapalı alan gaz ölçümü o2 h2s co",
      "kurtarma vinci çelik halat",
      "temiz hava beslemeli maske kuyu",
      "üçayak kuyu kurtarma tatbikatı"
    ],
    "baslik": "Derin Kuyu ve Menfez Kurtarma: Kurtarma Tripodu, Gaz Ölçümü & Vinci",
    "ikon": "🕳️",
    "renk": "#FECACA",
    "varsayilanZaman": "Kuyu Kurtarma İhbarı",
    "akilliFisilti": "🕳️ Kuyuya inmeden önce mutlaka 4 gaz ölçümü yapılmalı; Oksijen <%19.5 veya H2S > 10 ppm ise harici hava beslemesi olmadan inilmemelidir.",
    "oncedenYapilacaklar": [
      "Kuyu ağzına kurtarma tripodunu (üçayak) kur ve ayak kilit pimlerini emniyete al",
      "Teleskopik prob ile kuyunun taban, orta ve üst seviyelerindeki gaz konsantrasyonunu ölç",
      "Kurtarıcı personele paraşüt tipi emniyet kemeri giydirip çift emniyet halatına (Ana hat + Emniyet kilidi) bağla",
      "Temiz hava körüklü fan ile kuyu içine kesintisiz taze hava basarak tahliye vinci ile yaralıyı yukarı al"
    ]
  },
  {
    "id": "itfaiye_orman_yangini_karsidan_atesleme_ve_helikopter",
    "category": "saglik",
    "domain": "SAVUNMA",
    "keywords": [
      "orman yangını karşı ateş tekniği",
      "helikopter bambi bucket su atımı",
      "orman yangın emniyet şeridi dozer",
      "pulaski çapa tırmık yangın",
      "orman yangın rüzgar fırtına kaçış"
    ],
    "baslik": "Orman Yangınları: Karşı Ateş (Backfire), Dozer Emniyet Şeridi & Bambi Bucket",
    "ikon": "🌲",
    "renk": "#FECACA",
    "varsayilanZaman": "Orman Yangını Müdahale",
    "akilliFisilti": "🌲 Karşı ateş taktiği sadece yetkili amir onayıyla ve rüzgar ana yangına doğru eserken yangının önündeki yanıcı maddeyi tüketmek için uygulanır.",
    "oncedenYapilacaklar": [
      "Dozer ve greyderler ile yangın ilerleme hattının önüne 10-20 metre genişliğinde mineral toprak şeridi aç",
      "Hava araçları (Helikopter Bambi Bucket / Uçak) için su alma havuzu ve GPS koordinatlarını pilotlara telsizle bildir",
      "Müdahale arazöz ekipleri için LCES (Lookouts, Communications, Escape routes, Safety zones) güvenlik çemberini belirle",
      "Yangın atlamalarını (Spot Fire) önlemek için sırttan pülverizatör ve Pulaski çapalarla tırmıklama yap"
    ]
  },
  {
    "id": "askeri_gece_gorus_nvg_ve_pes_pesi_intikal",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "nvg gece görüş gözlüğü intikal",
      "taktik tek sıra yürüyüş kolu",
      "sessiz intikal ışık disiplini",
      "ir lazer fener dost tanıma",
      "gece pusu ve sızma taktiği"
    ],
    "baslik": "Askeri Taktik: NVG (Gece Görüş) Gece İntikali, Işık/Ses Disiplini & IR İşaretleme",
    "ikon": "🪖",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Alacakaranlık / İntikal Başlangıcı",
    "akilliFisilti": "🪖 Gece intikalinde tam ışık ve ses disiplini esastır; dost unsurların tanınması için kask arkası IR flaşörler (IFF) senkronize edilir.",
    "oncedenYapilacaklar": [
      "NVG (Night Vision Goggles) cihazlarının batarya seviyesini ve odaklama diyoptrisini test et",
      "Tüm personelin kask IR reflektörlerini ve dost-düşman tanıma (IFF) flaşörlerini aktif hale getir",
      "Silahların optik ve lazer hedefleme modlarını görünmez IR lazer (Infrared Laser) konumuna al",
      "İntikal kolunda personel arası mesafeyi (5-10 metre) koruyarak arazi örtü ve gizleme kurallarını uygula"
    ]
  },
  {
    "id": "askeri_havan_topu_81mm_ates_idare_ve_pusula",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "81mm havan mevzilendirme",
      "nişangah tamburası artık yükseliş",
      "havan nişan çubuğu nişanlama",
      "ateş idare merkezi koordinat hesap",
      "havan tanzim ve tahrip atışı"
    ],
    "baslik": "Havan & Topçu: 81mm/120mm Havan Mevzilendirme, Nişan Çubuğu & Tanzim Atışı",
    "ikon": "🎯",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Mevziye Giriş / Atış Görevi",
    "akilliFisilti": "🎯 Taban tablası ve çatal ayak teraziye alınmadan ve nişan çubukları dikilmeden yapılan atışlarda ilk mermi yüksek sapma gösterir.",
    "oncedenYapilacaklar": [
      "Havan taban tablasını yumuşak toprakta geri tepmeye dayanacak açıyla göm ve su terazisini kur",
      "Nişangah tamburasını sıfırlayarak 50 metre ileriye kırmızı ve beyaz nişan çubuklarını dik",
      "İleri Gözetleyiciden gelen hedef koordinatlarını ve mesafe açılarını balistik tabloyla yükselişe çevir",
      "İlk tanzim mermisi sonrası gözetleme raporuna göre mesafe ve yön düzeltmesi verip tahrip görevine geç"
    ]
  },
  {
    "id": "askeri_helikopter_lz_inis_yeri_ve_smoke_grenade",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "helikopter indirme alanı lz güvenliği",
      "iniş zonu sis bombası rüzgar",
      "helikopter medevac tahliye",
      "lz sinyalci marsaling personeli",
      "helikopter çevre emniyet 360"
    ],
    "baslik": "Helikopter İniş Bölgesi (LZ - Landing Zone) Emniyeti & Medevac Tahliyesi",
    "ikon": "🚁",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Helikopter Yaklaşma / İniş",
    "akilliFisilti": "🚁 Pilot iniş yaparken rüzgar yönünü ve iniş noktasını görmek için LZ merkezinin rüzgar altı yönüne renkli sis bombası atılmalıdır.",
    "oncedenYapilacaklar": [
      "İniş alanı içindeki gevşek taş, dal, tel ve yabancı maddeleri (FOD) temizle",
      "İniş noktasının 360 derece çevre emniyetini nöbetçi personelle sağla",
      "Helikopter yaklaşırken rüzgar yönünü göstermek için renkli sis kutusunu (Smoke Grenade) ateşle",
      "Yaralı sedyeli personeli helikopter pervanesi tamamen kontrol altına alındıktan sonra baş hizasında eğilerek taşı"
    ]
  },
  {
    "id": "askeri_telsiz_kriptolu_kod_sozlesmesi_ve_frekans",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "aselsan 9661 telsiz frekans atlama",
      "kripto anahtar yükleme kfd",
      "telsiz çağrı kodları parolas",
      "muhabere karıştırma jammer tespiti",
      "telsiz batarya şarj emniyeti"
    ],
    "baslik": "Taktik Muhabere: ASELSAN HF/VHF Kriptolu Telsiz, Frekans Atlama & KFD Dolumu",
    "ikon": "📻",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Harekât Öncesi Muhabere Kontrol",
    "akilliFisilti": "📻 Kripto anahtarının (Fill Device) güvenliği esastır; düşman eline geçme şüphesinde telsiz üzerinden Zeroize (Kripto Sıfırlama) yapılmalıdır.",
    "oncedenYapilacaklar": [
      "KFD cihazı ile telsize güncel günün kripto şifre anahtarlarını ve frekans atlama tablolarını yükle",
      "Telsiz gücünü (Low/Med/High) mesafeye göre ayarla ve ses/veri muhabere denemesini yap",
      "Günün parola ve işaretlerini, çağrı kodlarını içeren gizli muhabere kartını kontrol et",
      "Yedek lityum bataryaların tam şarjlı ve sızdırmaz çantada olduğunu teyit et"
    ]
  },
  {
    "id": "askeri_mayin_el_yapimi_patlayici_eyp_tedbirleri",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "eyp el yapımı patlayıcı tespit",
      "dedektör ile yol mayın araması",
      "şüpheli menfez kablo taraması",
      "eyp tespitinde 5-25 kuralı",
      "jammer araç konvoy güvenliği"
    ],
    "baslik": "METİ / Mayın Arama: EYP Tespiti, 5-25 Metre Güvenlik Kuralı & Jammer",
    "ikon": "💣",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İntikal / Yol Arama Taraması",
    "akilliFisilti": "💣 Şüpheli düzenek görüldüğünde telsiz/cep telefonu kullanılmaz; derhal 5-25 metre kuralı ile geri çekilinir ve uzman ekip beklenir.",
    "oncedenYapilacaklar": [
      "Menfez, köprü altı, yol kenarı taze kazılmış toprak ve kablo izlerini dedektör ve gözle tara",
      "Araç üzerindeki frekans karıştırıcı (Jammer) antenlerinin aktif yayın yaptığını doğrula",
      "Şüpheli bir cisim veya misina teli görüldüğünde \"DUR\" komutu vererek konvoyu durdur",
      "Telsiz ve elektronik cihazları kapatarak çevre emniyetini en az 300 metre mesafede kur"
    ]
  },
  {
    "id": "isg_iskele_etiketleme_scafftag_ve_ankraj",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "iskele kontrol scafftag yeşil etiket",
      "iskele kırmızı etiket kullanılamaz",
      "ts en 12810 ön yapımlı cephe iskelesi",
      "iskele ankraj çekme testi kn",
      "paraşüt tipi emniyet kemeri çift lanyard"
    ],
    "baslik": "TS EN 12810 Cephe İskelesi Güvenliği: Scafftag Yeşil/Kırmızı Etiket & Ankraj",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Haftalık / İskele Kurulum Sonrası",
    "akilliFisilti": "🏗️ İskele uzman tarafından denetlenip Yeşil Scafftag asılmadan işçiler iskeleye çıkarılamaz; her fırtına ve tadilattan sonra yeniden etiketlenir.",
    "oncedenYapilacaklar": [
      "İskele ayak taban plakalarını ve ayar millerini ahşap takozlar üzerinde teraziye al",
      "Ankraj noktalarını hidrolik çekme cihazı ile test et (Min 5 kN çekme dayanımı)",
      "Ana korkuluk (100 cm), ara korkuluk (50 cm) ve 15 cm topuk levhasının (tekmelik) tam olduğunu doğrula",
      "İskele merdiven girişine denetim tarihini içeren Yeşil Scafftag etiketini as"
    ]
  },
  {
    "id": "isg_loto_kilitleme_etiketleme_enerji_izolasyonu",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "loto kilitleme etiketleme prosedürü",
      "ekipman enerji izolasyonu loto",
      "asma kilit emniyet makası hasp",
      "loto tehlike etiketi bakımda",
      "sıfır enerji durumu doğrulama"
    ],
    "baslik": "LOTO (Lockout / Tagout) Tehlikeli Enerji Kontrolü & Sıfır Enerji Doğrulaması",
    "ikon": "🔒",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Bakım Onarım Öncesi",
    "akilliFisilti": "🔒 Bakıma girmeden önce tüm enerji kaynakları (Elektrik, Pnömatik, Hidrolik, Yerçekimi) kilitlenmeli ve sıfır enerji testi yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Ekipmanın ana şalterini indir ve üzerine personel adını taşıyan LOTO asma kilidini ve makasını tak",
      "Pnömatik ve hidrolik hat vanalarını kapatıp artık basıncı tahliye vanalarından sıfırla",
      "Mekanik ve yerçekimi riskine karşı pres koçuna güvenlik takozu yerleştir",
      "Başlatma butonuna basarak makinenin kesinlikle enerjisiz kaldığını (Sıfır Enerji Testi) doğrula"
    ]
  },
  {
    "id": "isg_kapali_alan_calisma_izni_ve_surekli_havalandirma",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "kapalı alan çalışma izni formu",
      "sürekli cebri havalandırma kapalı alan",
      "4 lü gaz dedektörü kalibrasyon",
      "kapalı alan nöbetçisi gözlemci",
      "acil kaçış maskesi kapalı alan"
    ],
    "baslik": "Kapalı ve Kısıtlı Alanlarda Çalışma: Sıcak Çalışma İzni, Gaz Ölçümü & Dış Nöbetçi",
    "ikon": "🕳️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Giriş Öncesi İzin Formu",
    "akilliFisilti": "🕳️ Kapalı alana giren çalışan içerideyken dışarıda eğitimli bir nöbetçi kesintisiz gözlem yapmalı; telsiz ve kurtarma ipi hazır olmalıdır.",
    "oncedenYapilacaklar": [
      "İSG Uzmanı, Saha Şefi ve Çalışan imzalı \"Kapalı Alan Giriş İzin Formu\"nu doldur",
      "Ex-proof fan ve esnek kanallar ile alana sürekli cebri temiz hava beslemesi yap",
      "4 gaz dedektörü (O2, LEL, CO, H2S) ile çalışma boyunca sürekli aktif gaz ölçümü sağla",
      "Giriş yapan personelin kurtarma vinci ve acil kaçış solunum setini kontrol et"
    ]
  },
  {
    "id": "isg_sicak_calisma_kaynak_ve_yangin_gozlemcisi",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "sıcak çalışma izni hot work permit",
      "yangın gözlemcisi fire watch",
      "kaynak yangın battaniyesi izolasyon",
      "kaynak dumanı emiş ünitesi",
      "sıcak çalışma bitimi 60 dk kontrol"
    ],
    "baslik": "Sıcak Çalışma İzni (Hot Work): Kaynak/Kesme, Yangın Battaniyesi & 60 Dk Nöbet",
    "ikon": "🔥",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kaynak Öncesi / Çalışma Sonu",
    "akilliFisilti": "🔥 Sıcak çalışma bittikten sonra yangın gözlemcisi (Fire Watch) çalışma alanını en az 60 dakika boyunca gizli alevlenme ve duman yönünden izlemelidir.",
    "oncedenYapilacaklar": [
      "Çalışma alanının 11 metre yarıçapındaki tüm yanıcı, parlayıcı malzemeleri uzaklaştır veya yangın battaniyesiyle ört",
      "Çalışma noktasına minimum 1 adet 6 kg ABC KKT ve 1 adet CO2 yangın söndürücü yerleştir",
      "Mobil kaynak dumanı emiş ünitesini kaynak noktasına 15 cm mesafede konumlandır",
      "İş bitiminde termal kamera ile kontrol yapıp 60 dakikalık yangın nöbetini tamamla"
    ]
  },
  {
    "id": "isg_ramak_kala_olay_bildirimi_ve_kok_neden_analizi",
    "category": "is_kariyer",
    "domain": "ISG",
    "keywords": [
      "ramak kala olay bildirim formu near miss",
      "5 neden analizi balık kılçığı isg",
      "güvensiz durum ve davranış tespiti",
      "isg kurulu toplantı gündemi ramak kala",
      "düzeltici önleyici faaliyet döf isg"
    ],
    "baslik": "6331 Sayılı İSG Kanunu: Ramak Kala (Near-Miss) Bildirimi & 5-Neden Kök Analizi",
    "ikon": "⚠️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Olay Anı / 24 Saat İçinde",
    "akilliFisilti": "⚠️ Her 300 ramak kala olayından 1 tanesi ölümlü veya ağır iş kazasıyla sonuçlanır (Heinrich Piramidi); bildirimler gecikmeksizin DÖF sürecine alınmalıdır.",
    "oncedenYapilacaklar": [
      "Ramak kala olayını fotoğraflarla ve görgü tanığı ifadeleriyle sisteme kaydet",
      "İSG Kurulu ve saha mühendisleri ile toplanarak \"5-Neden (5-Why)\" veya Ishikawa Kök Neden Analizi yap",
      "Güvensiz durum ve davranışı ortadan kaldıran Düzeltici Önleyici Faaliyet (DÖF) termin tarihini ve sorumlusunu ata",
      "Alınan aksiyonu bir sonraki İSG Kurul Toplantı Tutanağında onaylayıp çalışanlara duyur"
    ]
  },
  {
    "id": "emniyet_cmk_91_gozalti_uzatma_ve_savcilik_fezlekesi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "cmk 91 gözaltı süresi uzatma savcılık",
      "bireysel suç 24 saat toplu suç 48 saat gözaltı",
      "savcılık fezlekesi ve şüpheli ifade tutanağı",
      "sağlık raporu giriş ve çıkış adli muayene",
      "avukat eşliğinde müdafi huzurunda ifade alma"
    ],
    "baslik": "CMK m.91 Gözaltı Süreleri: 24/48 Saat Takibi, Giriş-Çıkış Adli Raporu & Savcılık Fezlekesi",
    "ikon": "👮",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Yakalama Anından İtibaren 24 Saat",
    "akilliFisilti": "👮 Bireysel suçlarda yakalama anından itibaren 24 saat içinde şüpheli hâkim önüne çıkarılmalı; toplu suçlarda savcı kararıyla uzatma süresi işletilmelidir.",
    "oncedenYapilacaklar": [
      "Yakalama ve Gözaltına Alma Tutanağı ile şüphelinin ilk hastane giriş adli muayene raporunu tanzim et",
      "Gözaltı süresi bitimine en az 4 saat kala tahkikat evrakı ve Savcılık Fezlekesini tamamla",
      "Şüphelinin baro veya özel müdafi huzurunda CMK hakları hatırlatılarak sesli/görüntülü (SEGBİS) ifadesini al",
      "Gözaltından adliyeye sevk öncesi son sağlık (çıkış) raporunu alarak şüpheliyi adli makamlara teslim et"
    ]
  },
  {
    "id": "emniyet_adli_arama_ve_el_koyma_cmk_119_ve_onleme_aramasi",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "cmk 116 adli arama kararı hakim savcı",
      "gecikmesinde sakınca bulunan hal yazılı arama emri",
      "cmk 119 arama tutanağı komşu ihtiyar heyeti",
      "el koyma tutanağı ve adli emanet teslim makbuzu",
      "pvska önleme araması kararı mülki amir"
    ],
    "baslik": "CMK m.116-119 Adli Arama & El Koyma: Hâkim Kararı, İki Tanık İmzası & Adli Emanet",
    "ikon": "🔍",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Arama Kararı İntikali / Olay Anı",
    "akilliFisilti": "🔍 Konutta yapılan adli aramalarda mutlaka hâkim kararı veya gecikmesinde sakınca bulunan hallerde savcı yazılı emri ile 2 komşu/ihtiyar heyeti tanığı bulunmalıdır.",
    "oncedenYapilacaklar": [
      "Hâkim arama kararındaki veya savcı yazılı arama emrindeki kişi adı, adres ve arama kapsamını kontrol et",
      "Aramaya başlarken konut sahibi, müdafi ve hazır bulundurulan 2 tanığın kimlik tespitini yap",
      "Ele geçirilen suç unsuru dijital/fiziki delilleri numaratajlı delil torbasına koyup mühürlü Delil Teslim Tutanağı hazırla",
      "El konulan materyalleri 24 saat içinde hâkim onayına sunulmak üzere Adli Emanet Memurluğuna teslim et"
    ]
  },
  {
    "id": "emniyet_olay_yeri_inceleme_delil_guvenligi_ve_dna_swap",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "olay yeri inceleme şeridi güvenlik çemberi",
      "parmak izi afis sistemi transferi ve mukayese",
      "biyolojik delil dna kan tükürük swap numune",
      "balistik kovan çekirdek atış mesafesi tespiti",
      "olay yeri krokisi 3 boyutlu lazer tarama"
    ],
    "baslik": "Olay Yeri İnceleme (OYİ): Güvenlik Çemberi, Biyolojik DNA Swap Numunesi & Balistik Eşleme",
    "ikon": "🔬",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Olay İhbarından Sonra İlk 30 Dakika",
    "akilliFisilti": "🔬 Olay yerine ilk intikal eden ekip alanı sarı emniyet şeridiyle kapatmalı; DNA kontaminasyonunu önlemek için tulum ve çift eldiven kullanılmalıdır.",
    "oncedenYapilacaklar": [
      "Geniş güvenlik çemberi çekerek olay yerine yetkisiz personelin ve basın mensuplarının girişini engelle",
      "Delil numaralandırma plakalarını yerleştirip 360 derece fotoğraf ve 3D lazer kroki taramasını tamamla",
      "Steril swap çubukları ile kan, tükürük ve temas DNA örneklerini alıp soğuk zincir numune zarfına mühürle",
      "Kovan ve mermi çekirdeklerini balistik inceleme için Kriminal Polis Laboratuvarına teslim tutanağı ile gönder"
    ]
  },
  {
    "id": "emniyet_siber_suc_dijital_materyal_adli_kopya_image",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "siber suçlar dijital delil el koyma cmk 134",
      "adli kopya image alma write blocker donanım",
      "md5 ve sha256 hash değeri delil bütünlüğü",
      "telefon imajı alma celebrate oxygene adli bilişim",
      "ram dump canlı bellek dökümü uçucu veri"
    ],
    "baslik": "CMK m.134 Dijital Delil İnceleme: Write-Blocker, Adli Kopya (İmaj) & SHA-256 Hash Doğrulama",
    "ikon": "💻",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Dijital Materyal Ele Geçirme Anı",
    "akilliFisilti": "💻 CMK m.134 gereği dijital materyaller donanımsal yazma koruyucu (Write-Blocker) ile kopyalanmalı, SHA-256 hash özeti tutanağa yazılıp bir kopya şüpheliye verilmelidir.",
    "oncedenYapilacaklar": [
      "Bilgisayar açık ise uçucu verileri (RAM Dump) ve şifreli disk anahtarlarını canlı adli bilişim aracıyla al",
      "Cihazı kapatıp diskleri donanımsal Write-Blocker cihazına bağlayarak bit-bit RAW/E01 formatında adli imajını al",
      "Orijinal disk ve alınan imaj dosyasının MD5 / SHA-256 hash değerlerini hesaplayıp birebir eşleştiğini tutanağa geçir",
      "Şüphelinin veya müdafiinin talebi halinde alınan adli kopyanın (imajın) bir örneğini harici medyada teslim et"
    ]
  },
  {
    "id": "emniyet_trafik_kaza_raporu_kusur_orani_ve_promil",
    "category": "arac_ulasim",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "ölümlü yaralamalı trafik kazası tahkikatı",
      "kaza tespit tutanağı kroki ve kusur oranı tespiti",
      "alkolmetre promil ölçümü ve kan alkol sevki",
      "fren izi ölçümü ve hız tayini formülü",
      "ktk 2918 asli ve tali kusur maddeleri"
    ],
    "baslik": "Trafik Kazası Tahkikatı: Fren İzi Ölçümü, Kusur Oranı Dağılımı & Promil Raporu",
    "ikon": "🚗",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kaza İhbarı / Olay Yeri Müdahale",
    "akilliFisilti": "🚗 Yaralamalı kazalarda sürücülerin alkol/uyuşturucu ölçümü ivedilikle yapılmalı; fren izi kumpas ve tekerlek metre ile ölçülerek hız hesaplanmalıdır.",
    "oncedenYapilacaklar": [
      "Kaza mahallinde ikinci bir kazayı önlemek amacıyla reflektör, duba ve trafik emniyet tedbirlerini al",
      "Sürücülerin kalibre alkolmetre ile promil ölçümünü yap; üflemeyi reddedenleri kan testi için adli tabipliğe sevk et",
      "Asfalt üzerindeki fren izi uzunluğunu (L) ve sürtünme katsayısını ölçerek çarpışma anı hızını formülle hesapla",
      "2918 sayılı KTK asli/tali kusur maddelerini (Örn: KTK 84/c) belirterek resmi Kaza Tespit Tutanağını düzenle"
    ]
  },
  {
    "id": "itfaiye_scba_solunum_tupu_300_bar_ve_deadman_testi",
    "category": "saglik",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "scba temiz hava solunum seti 300 bar",
      "dead-man pass cihazı hareketsizlik alarmı",
      "itfaiyeci tam yüz maskesi sızdırmazlık testi",
      "solunum tüpü hava tüketim hesabı 45 dakika",
      "istasyon nöbet devir teslim scba basınç kontrolü"
    ],
    "baslik": "SCBA Solunum Cihazı: 300 Bar Basınç, PASS Hareketsizlik Alarmı & Maske Sızdırmazlığı",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "Nöbet Devir Teslimi (Her Sabah 08:00)",
    "akilliFisilti": "🚒 SCBA kompozit tüp basıncı 280-300 Bar altında ise derhal kompresörde doldurulmalı; PASS (Dead-Man) hareketsizlik alarmı sesli test edilmelidir.",
    "oncedenYapilacaklar": [
      "Tüp manometresini açarak basıncın en az 280-300 Bar seviyesinde olduğunu doğrula",
      "Yüz maskesini takıp nefes alarak negatif basınç testi ile maske kenar sızdırmazlığını kontrol et",
      "PASS cihazını açıp 30 saniye hareketsiz kalarak 95 dB ön alarm ve tam tahliye alarmının çaldığını teyit et",
      "Nöbet defterine her bir personelin SCBA seri numarası, tüp basıncı ve maske durumunu imza altına al"
    ]
  },
  {
    "id": "itfaiye_endustriyel_yangin_kopuklu_sondurme_ve_arff",
    "category": "ev_teknik",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "b sınıfı akaryakıt yangını köpük konsantresi",
      "afff sentetik film oluşturucu köpük yüzde 3 6",
      "ağır orta yüksek genleşmeli köpük lansı",
      "yangın pompası debi gpm ve bar basınç kontrolü",
      "endüstriyel tesis tank yangını soğutma perdesi"
    ],
    "baslik": "B Sınıfı Akaryakıt Yangını: AFFF %3-%6 Köpük Karışımı, Genleşme Lansı & Tank Soğutma",
    "ikon": "🔥",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yangın İhbarı / Müdahale Anı",
    "akilliFisilti": "🔥 Akaryakıt yangınlarında asla doğrudan su sıkılmaz; AFFF köpük lansı ile alevin üzerine film tabakası serilmeli ve komşu tanklara su perdesi soğutması yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Arazöz veya köpük kulesindeki indüktör vanasını köpük konsantresine (%3 veya %6) göre ayarla",
      "Köpüğü alevin merkezine değil, tank duvarına çarptırarak yumuşak bir örtü şeklinde sıvı yüzeyine yaydır",
      "Radyasyon ısısından korunmak için bitişik tanklara monitör nozulu ile sürekli soğutma suyu sık",
      "Statik elektrik ve patlama riskine karşı tüm müdahale ekipmanının topraklama bağlantısını sağla"
    ]
  },
  {
    "id": "itfaiye_kbrn_seviye_a_gaz_gecirmez_elbise_ve_dekontaminasyon",
    "category": "saglik",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "kbrn kimyasal biyolojik radyolojik nükleer müdahale",
      "seviye a tam sızdırmaz gaz geçirmez elbise",
      "kbrn dekontaminasyon çadırı arındırma solüsyonu",
      "çoklu gaz dedektörü pid voc ve radyasyon dozimetresi",
      "kbrn sıcak ılık soğuk bölge triyaj çemberi"
    ],
    "baslik": "KBRN Müdahale Protokolü: Seviye A Gaz Geçirmez Elbise, Dedektör & Dekontaminasyon Çadırı",
    "ikon": "☣️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "KBRN İhbarı / Olay Yeri Giriş",
    "akilliFisilti": "☣️ Kimyasal/Radyolojik sızıntılarda rüzgar arkaya alınmalı, Seviye A tulum ile sıcak bölgeye girilmeli ve çıkışta personel dekontaminasyon çadırında arındırılmalıdır.",
    "oncedenYapilacaklar": [
      "Rüzgar yönü ve meteorolojik verilere göre Sıcak (Kırmızı), Ilık (Sarı) ve Soğuk (Yeşil) sınır bölgelerini kur",
      "Müdahale ekibine Seviye A gaz sızdırmaz kimyasal koruyucu tulum ve dahili SCBA tüpünü giydir",
      "PID (Fotoiyonizasyon) ve çoklu gaz dedektörü ile havadaki LEL, H2S, CO ve Toksik Gaz PPM değerlerini ölç",
      "Sıcak bölgeden dönen personeli Dekontaminasyon Çadırında nötralize edici kimyasal duştan geçir"
    ]
  },
  {
    "id": "itfaiye_arac_ici_sikisma_ve_hidrolik_kesici_ayirici_kurtarma",
    "category": "arac_ulasim",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "trafik kazası araç içi sıkışma kurtarma extrication",
      "hidrolik kesici ayırıcı ram pompası holmatro",
      "araç akü kutup başı kesme ve lpg vana kapatma",
      "c-omurga boyunluk ve ked kurtarma yeleği",
      "tavan kesme ve cam patlatma yaylı zımba"
    ],
    "baslik": "Araç İçi Sıkışma Kurtarma (Extrication): Hidrolik Kesici/Ayırıcı, KED Yeleği & Tavan Kesme",
    "ikon": "🦺",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kaza İhbarı / Olay Yerine Varış",
    "akilliFisilti": "🦺 Kurtarma başlamadan önce araç takozlarla stabilize edilmeli, akü kutup başı sökülmeli ve kazazedeye mutlaka servikal boyunluk takılmalıdır.",
    "oncedenYapilacaklar": [
      "Basamaklı takozlar ve sabitleme krikoları ile kazalı aracın 4 noktadan beşik hareketini sıfırla",
      "Hava yastığı (Airbag) patlamamış tüpleri ve emniyet kemeri fişeklerini tespit ederek kesme hattından kaçın",
      "Yaylı cam kırma zımbası ile yan camları kırıp kazazedeyi KED kurtarma yeleği ve boyunlukla sabitle",
      "Hidrolik kesici ile A-B-C direklerini kesip tavanı kaldırarak yaralıyı omurga tahtası (Spine Board) üzerinde tahliye et"
    ]
  },
  {
    "id": "itfaiye_yangin_raporu_ve_kundaklama_yangin_sebebi_tahkikat",
    "category": "resmi",
    "domain": "ADALET_GUVENLIK",
    "keywords": [
      "resmi itfaiye yangın raporu tanzimi",
      "yangın çıkış noktası v-pattern ve pourover izi",
      "kundaklama hızlandırıcı madde hidrokarbon dedektörü",
      "elektrik kontağı ark izi ve erime analizi",
      "yangın sigorta eksper raporu resmi tebliğ"
    ],
    "baslik": "İtfaiye Yangın Tahkikat Raporu: Yangın Başlangıç Odağı, V-Deseni & Hızlandırıcı Tespiti",
    "ikon": "📝",
    "renk": "#FEF08A",
    "varsayilanZaman": "Soğutma Tamamlandıktan Sonra 24 Saat",
    "akilliFisilti": "📝 Yangın raporunda başlangıç odağı duvardaki V-Deseni ve taban erime derinliği ile tespit edilir; kundaklama şüphesinde fotoiyonizasyon dedektörü ile numune alınır.",
    "oncedenYapilacaklar": [
      "Yangın mahallinde duman ve alev izlerini (V-Pattern) takip ederek yangının başladığı ilk odak noktasını bul",
      "Elektrik panosu ve prizlerdeki erimeleri inceleyerek primer ark (kısa devre) ile sekonder yangın erimesini ayırt et",
      "Tabanda \"Pour-Over\" yanık izi varsa hidrokarbon gaz dedektörü ile tiner/benzin numunesi alıp kavanozda mühürle",
      "Yangının çıkış sebebi, müdahale süresi, harcanan su/köpük miktarı ve tahmini hasarı içeren Resmi İtfaiye Raporunu imzala"
    ]
  },
  {
    "id": "askeri_ictima_mevcut_alma_ve_tekmil_protokolu",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "tabur bölük içtiması mevcut sayımı",
      "nöbetçi subay tekmil verme protokolü",
      "künye yoklama ve izinli raporlu personel teyidi",
      "içtima kılık kıyafet kompozit başlık denetimi",
      "içtima öncesi hazırlık 20 dakika kuralı"
    ],
    "baslik": "Askeri İçtima & Tekmil Protokolü: Mevcut Sayımı, Raporlu/Nöbetçi Ayrımı & Kılık Kıyafet",
    "ikon": "🪖",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Sabah & Akşam İçtima Saati (T-20 Dakika)",
    "akilliFisilti": "🪖 İçtima saatinden 20 dakika önce takım mevcutları alınmalı, izinli/raporlu/nöbetçi personel teyit edilerek amire eksiksiz tekmil verilmelidir.",
    "oncedenYapilacaklar": [
      "Bölük nöbetçi çavuşu eşliğinde koğuş ve nöbet yerlerindeki tüm personelin fiziki sayımını yap",
      "Revir sevkli, istirahatli, izinli ve nöbetteki personelin isimlerini yoklama defterine kaydet",
      "Teçhizat, hücum yeleği, matara, kompozit başlık ve kamuflaj kılık-kıyafet uygunluğunu denetle",
      "Bölük/Tabur Komutanının içtima alanına gelişinde nizami esas duruşa geçip mevcut tekmilini arz et"
    ]
  },
  {
    "id": "askeri_nobetci_amiri_silahlik_ve_muhimmat_sayimi",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "nöbetçi amiri nöbet devir teslim silahlık",
      "silahlık sayım cetveli seri no fişek sayımı",
      "kurşun mühürlü mühimmat sandığı kontrolü",
      "doldur boşalt istasyonu namlu 45 derece emniyet",
      "vukuat raporu nöbet defteri ıslak imza"
    ],
    "baslik": "Nöbetçi Amiri Silahlık & Mühimmat Denetimi: Seri No Sayımı, Sandık Mührü & Doldur-Boşalt",
    "ikon": "🛡️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Nöbet Devir-Teslim Saati",
    "akilliFisilti": "🛡️ Silahlıktaki her tüfek ve tabancanın seri numarası sayım cetvelinden kontrol edilmeli; mühimmat sandıklarının kurşun mühürleri fiziki incelenmelidir.",
    "oncedenYapilacaklar": [
      "Silahlık sayım defterindeki zimmetli piyade tüfeği, tabanca ve optik cihazları birebir seri no ile say",
      "Mühimmat deposundaki acil durum sandıklarının kurşun güvenlik mühürlerini ve tel bütünlüğünü denetle",
      "Nöbetçilerin doldur-boşalt istasyonunda namluyu 45° kum havuzuna tutarak doldur-boşalt yaptığını bizzat gözle",
      "Son 24 saatin vukuatlarını nöbet defterine işleyip yeni Nöbetçi Amirine ıslak imzayla devret"
    ]
  },
  {
    "id": "askeri_atiss_poligon_emniyeti_ve_sarfiyat_tutanagi",
    "category": "is_kariyer",
    "domain": "SAVUNMA",
    "keywords": [
      "atış poligonu emniyet kuralları kırmızı flama",
      "atış emniyet subayı ve hat gözetleyicisi",
      "poligon ambulans tabip ve sıhhiye hazırlığı",
      "boş kovan toplama ve sarfiyat tutanağı tanzimi",
      "atış yolu ve hedef hattı kör bölge kontrolü"
    ],
    "baslik": "Atış Poligonu & Arazi Eğitimi: Kırmızı Flama, Tabip/Ambulans & Boş Kovan Sarfiyatı",
    "ikon": "🎯",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Atış Başlama Saatinden 30 Dk Önce",
    "akilliFisilti": "🎯 Poligonda kırmızı flama çekilmeden ve sıhhiye ambulansı hazır olmadan tek bir fişek dahi atılamaz; atış sonu boş kovan sayımı tam olmalıdır.",
    "oncedenYapilacaklar": [
      "Poligon tepe gözetleme kulelerine kırmızı flamaları astırıp çevre emniyet nöbetçilerini yerleştir",
      "Müdahale çantalı tabip ve tam donanımlı sıhhiye ambulansının poligon sahasında konuşlandığını teyit et",
      "Atış hattında atıcıların kulaklık, gözlük takmasını ve emniyet mandalı kurallarına uymasını sağla",
      "Atış bitiminde atılan fişek sayısı ile toplanan boş kovanları sayıp Mühimmat Sarfiyat Tutanağını imzala"
    ]
  },
  {
    "id": "askeri_kademe_arac_bakimi_ve_konvoy_emniyeti",
    "category": "arac_ulasim",
    "domain": "SAVUNMA",
    "keywords": [
      "askeri taktik araç konvoy emniyeti",
      "kademe araç bakım çizelgesi yağ su fren kontrolü",
      "araç takip defteri görev emri ve kilometre fişi",
      "konvoy seyir hızı takip mesafesi eskort aracı",
      "taktik araç yangın söndürme ve çekme halatı"
    ],
    "baslik": "Kademe & Motorlu İntikal: Taktik Araç Kontrolü, Görev Emri & Konvoy Emniyeti",
    "ikon": "🚛",
    "renk": "#FED7AA",
    "varsayilanZaman": "İntikalden 1 Saat Önce",
    "akilliFisilti": "🚛 Konvoy intikallerinde araçların lastik basıncı, fren hidroliği, çekme halatı ve ilk yardım çantası kontrol edilmeli; konvoy takip mesafesi korunmalıdır.",
    "oncedenYapilacaklar": [
      "Kademe astsubayı ile araçların motor yağı, antifriz, şanzıman ve lastik diş derinliğini kontrol et",
      "Araç Görev Emri belgesinin onaylandığını ve görevli sürücü askeri ehliyetinin vizeli olduğunu doğrula",
      "Konvoy komutanı telsiz çevrimini test et; öncü ve artçı eskort araçlarının flaşörlerini kontrol et",
      "İntikal güzergahındaki dinlenme noktalarını, hız limitlerini ve olası pusu/arıza senaryo planını brife et"
    ]
  },
  {
    "id": "askeri_muhabere_kripto_telsiz_ve_kod_tablosu",
    "category": "is_kariyer",
    "domain": "SAVUNMA",
    "keywords": [
      "askeri muhabere telsiz çevrimi aselsan",
      "kriptolu telsiz frekans yükleme fill gun",
      "günlük kod tablosu ve parola işaret teyidi",
      "elektronik harp karıştırma jammer protokolü",
      "muhabere sessizliği ve acil durum frekansı"
    ],
    "baslik": "Muhabere & Taktik Haberleşme: Kriptolu Telsiz Frekansı, Günlük Parola & Çevrim Testi",
    "ikon": "📻",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Vardiya Değişimi / Görev Öncesi",
    "akilliFisilti": "📻 Kriptolu telsizlere günlük frekans ve anahtar (Fill Gun) yüklenmeli; parola-işaret teyidi yapılmadan açık kanaldan operasyonel bilgi verilmemelidir.",
    "oncedenYapilacaklar": [
      "ASELSAN telsiz cihazlarına günlük kripto anahtarlarını (Fill Gun) yetkili muhabere subayı ile yükle",
      "Tüm üs bölgeleri ve ileri gözetleme unsurlarıyla telsiz çevrim kontrolü (Ses 5/5) icra et",
      "Günün resmi Parola-İşaret tablosunu nöbetçi ve devriye personeline kapalı zarfla tebliğ et",
      "Elektronik karıştırma (Jammer) durumunda kullanılacak alternatif frekans ve atlamalı kanal protokolünü hazır tut"
    ]
  },
  {
    "id": "isg_atex_patlamadan_korunma_dokumani_ve_zone_haritasi",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "atex patlamadan korunma dokümanı pkd",
      "zone 0 zone 1 zone 2 gaz patlama bölgesi",
      "zone 20 zone 21 zone 22 toz patlama tehlikesi",
      "ex-proof ekipman kıvılcım çıkarmaz atex etiket",
      "statik elektrik topraklama iletkenlik ölçümü"
    ],
    "baslik": "ATEX Patlamadan Korunma Dokümanı (PKD): Zone 0/1/2 ve Zone 20/21/22 Bölge Haritalandırması",
    "ikon": "💥",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yıllık Güncelleme / Tesis Revizyonu",
    "akilliFisilti": "💥 Yanıcı sıvı ve toz bulunan tesislerde ATEX Yönetmeliği uyarınca Zone bölgeleri haritalandırılmalı, tüm motor ve aydınlatmalar Ex-Proof sertifikalı olmalıdır.",
    "oncedenYapilacaklar": [
      "Tesis kimyasallarının alt patlama limitlerini (LEL) ve parlama noktalarını (Flash Point) MSDS'ten analiz et",
      "Tehlikeli alanları Zone 0 (sürekli), Zone 1 (kesikli), Zone 2 (nadir) ve Toz zonları olarak çizimlere işle",
      "Bölgedeki elektrik motorları, armatürler ve panoların Ex d / Ex e / Ex i Atex sertifika kodlarını denetle",
      "Tüm tank, boru hattı ve aktarma pompalarının eşpotansiyel statik topraklama geçiş direncini (< 10 Ω) ölç"
    ]
  },
  {
    "id": "isg_kapali_kalan_calisma_izni_ve_oksijen_olcumu",
    "category": "saglik",
    "domain": "ISG",
    "keywords": [
      "kapalı kısıtlı alan çalışma izni formu permit",
      "4 lü gaz dedektörü oksijen lel h2s co ölçümü",
      "oksijen seviyesi 19.5 ve 23.5 güvenli aralık",
      "tripod kurtarma vinci ve tam gövde emniyet kemeri",
      "gözlemci nöbetçi personel kapalı alan girişi"
    ],
    "baslik": "Kapalı Alanda Çalışma İzni: Oksijen (%19.5-%23.5), 4'lü Gaz Ölçümü & Tripod Vinç",
    "ikon": "🕳️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kapalı Alana Girişten Hemen Önce",
    "akilliFisilti": "🕳️ Kuyu/depoya girmeden önce oksijen (%19.5-%23.5), LEL (<%10), H2S (<10 ppm) ve CO (<30 ppm) ölçülmeli; tripod vinç ve dış gözlemci olmadan girilmemelidir.",
    "oncedenYapilacaklar": [
      "Hortumlu 4'lü gaz ölçüm cihazını kuyu tabanı, ortası ve üst seviyesine daldırarak gaz konsantrasyonunu ölç",
      "Giriş noktasına acil durum kurtarma vinçli kurtarma tripodunu ve tam gövde paraşüt tipi kemeri kur",
      "Kapalı alan girişine sürekli temiz hava basan ex-proof cebri havalandırma fanını (körük) devreye al",
      "İSG Uzmanı, Vardiya Amiri ve Giriş Gözlemcisinin ıslak imzasıyla \"Kapalı Alan Çalışma İzni\" formunu onayla"
    ]
  },
  {
    "id": "isg_gurultu_ve_titresim_maruziyet_eylem_sinir_degerleri",
    "category": "saglik",
    "domain": "ISG",
    "keywords": [
      "gürültü yönetmeliği en yüksek maruziyet eylem değeri 85 dba",
      "günlük gürültü maruziyet sınırı 87 dba lexd",
      "kişisel dozimetre ölçümü a ağırlıklı ses basıncı",
      "el-kol titreşimi 5 m s2 ve bütün vücut titreşimi 1.15",
      "odyometri işitme testi periyodik sağlık muayenesi"
    ],
    "baslik": "Fiziksel Risk Etmenleri: Gürültü (80/85/87 dBA), Titreşim Dozimetresi & Odyometri Takibi",
    "ikon": "🎧",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Yıllık Ortam Ölçümü / Sağlık Taraması",
    "akilliFisilti": "🎧 Günlük gürültü maruziyeti 85 dBA aşıldığında kulak koruyucu kullanımı zorunludur; 87 dBA yasal maruziyet sınır değeri hiçbir şartta aşılamaz.",
    "oncedenYapilacaklar": [
      "İşyerinde Tip 1 gürültü dozimetresi ile çalışanların 8 saatlik LEX,8h gürültü maruziyet haritasını çıkar",
      "85 dBA üzerindeki çalışma alanlarına ses yutucu akustik paneller ve susturuculu makineler planla",
      "Titreşimli el aletlerinde el-kol titreşim ivmesini (m/s²) ölçerek 5 m/s² yasal sınırını denetle",
      "Gürültülü alanda çalışan personelin periyodik odyometri (işitme) test sonuçlarını İşyeri Hekimiyle değerlendir"
    ]
  },
  {
    "id": "isg_kimyasal_maddeler_msds_guvenlik_bilgi_formu_ve_kisisel_koruyucu",
    "category": "saglik",
    "domain": "ISG",
    "keywords": [
      "kimyasal maddelerle çalışmalarda isg yönetmeliği",
      "msds gbf 16 maddelik güvenlik bilgi formu",
      "mesleki maruziyet sınır değeri oel twa stel ppm",
      "kimyasal dökülme kiti nötralizasyon ve göz duşu",
      "organik buhar ve asit gazı a2b2e2k2 filtreli maske"
    ],
    "baslik": "Kimyasal Risk Yönetimi: 16 Maddelik SDS/MSDS, TWA/STEL Maruziyet Sınırları & Acil Göz Duşu",
    "ikon": "☣️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Kimyasal Kabulü / Günlük Vardiya",
    "akilliFisilti": "☣️ Tesis içindeki tüm kimyasalların Türkçe Güvenlik Bilgi Formları (MSDS) hazır olmalı; kimyasal dolaplarının yanında acil göz ve vücut duşları çalışır durumda olmalıdır.",
    "oncedenYapilacaklar": [
      "Kullanılan kimyasalların CLP yönetmeliğine uygun piktogram ve H/P risk cümlelerini içeren etiketlerini kontrol et",
      "Ortam havasındaki uçucu organik bileşik (VOC) seviyesinin TWA (8 saatlik) ve STEL (15 dk) sınırlarında kaldığını doğrula",
      "Acil göz yıkama çeşmeleri ve boy duşlarının su basıncını her pazartesi test edip bakım kartına işle",
      "Çalışanlara kimyasal türüne uygun nitril eldiven, kimyasal sıçrama gözlüğü ve ABEK filtreli maske zimmetle"
    ]
  },
  {
    "id": "isg_is_kazasi_bildirimi_sgk_ve_kok_neden_analizi_isg_katip",
    "category": "resmi",
    "domain": "ISG",
    "keywords": [
      "iş kazası bildirimi sgk 3 iş günü yasal süre",
      "isg-katip iş kazası tespit ve tutanak formu",
      "kök neden analizi 5 neden balık kılçığı ishikawa",
      "ramak kala olayı bildirim kutusu ve analizi",
      "iş kazası kaza araştırma komisyonu toplantısı"
    ],
    "baslik": "İş Kazası & Ramak Kala Yönetimi: SGK 3 İş Günü Bildirimi, Kök Neden (5 Neden) Analizi & İSG-KATİP",
    "ikon": "📋",
    "renk": "#FEF08A",
    "varsayilanZaman": "Kaza Anından İtibaren 3 İş Günü",
    "akilliFisilti": "📋 5510 ve 6331 sayılı Kanunlar uyarınca iş kazaları kazadan sonraki 3 iş günü içinde SGK elektronik sistemine bildirilmeli ve kök neden analizi yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Kazanın hemen ardından olay yerini fotoğrafla, tanık ifadelerini al ve Kaza Tespit Tutanağını tanzim et",
      "SGK e-Bildirge İş Kazası ve Meslek Hastalığı Bildirim ekranından 3 iş günü içinde resmi bildirimi yap",
      "İSG Kurulu ile \"5 Neden (5 Whys)\" veya \"Balık Kılçığı\" yöntemini kullanarak kazanın kök nedenini belirle",
      "Benzer kazaların tekrarlanmaması için DÖF (Düzeltici Önleyici Faaliyet) planını başlatıp İSG-KATİP sistemine işle"
    ]
  },
  {
    "id": "savunma_olay_yeri_kriminal_balistik_ve_delil_zinciri",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "olay yeri inceleme şeridi güvenlik çemberi",
      "kriminal balistik kovan mermi çekirdeği mukayesesi",
      "delil zinciri tutanağı ve parmak izi transfer folyosu",
      "adli tıp biyolojik dna swap numune tüpü",
      "kriminal polis laboratuvarı ekspertiz raporu"
    ],
    "baslik": "Kriminal & Olay Yeri: Delil Zinciri, Balistik İnceleme & Biyolojik Numune",
    "ikon": "🔍",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Olay Anı & Adli Soruşturma",
    "akilliFisilti": "🔍 Olay yerinde delil kirlenmesini önlemek için çift kat güvenlik çemberi kurulmalı; tüm bulgular delil torbalarına mühürlenerek Delil Zinciri Tutanağı tanzim edilmelidir.",
    "oncedenYapilacaklar": [
      "Olay yerini güvenlik şeridiyle izole ederek yetkisiz personelin girişini engelle ve koruyucu tulum/eldiven giy",
      "Boş kovan, çekirdek ve atış artıklarını numaralandırılmış delil plakalarıyla fotoğraflayarak delil torbasına mühürle",
      "Kan ve biyolojik doku örneklerini steril pamuklu swap ile alıp soğuk zincir transfer tüpüne yerleştir",
      "Cumhuriyet Savcısına ve Kriminal Polis Laboratuvarına teslim edilmek üzere resmi \"Delil Teslim-Tesellüm Tutanağını\" imzalat"
    ]
  },
  {
    "id": "savunma_sinir_karakolu_termal_kamera_ve_anti_drone_tarama",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "hudut sınır karakolu termal kamera gözetleme",
      "anti drone jammer sinyal karıştırıcı frekans kesme",
      "keşif gözetleme radarı ve sınır ihlali erken uyarı",
      "gece görüş dürbünü ve mevzi nöbet devir teslimi",
      "hudut birliği hazır kıta alarmı ve takviye tim intikali"
    ],
    "baslik": "Hudut Emniyeti: Termal Kamera Gözetleme, Jammer & Dron Savar Erken Uyarı",
    "ikon": "🪖",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Gece Nöbeti & Hudut Devriyesi",
    "akilliFisilti": "🪖 Hudut hattında elektro-optik kule ve termal kameralarla 360° sektör taraması yapılmalı; İHA tehdidine karşı dron-savar frekans karıştırıcılar hazır tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Termal kamera ve radar sektör sınırlarını kalibre ederek kör nokta kontrollerini yap",
      "Yetkisiz mini İHA yaklaşması durumunda anti-drone jammer cihazını hedef frekans bandına yönlendir",
      "Mevzi nöbet defterine her saat başı vukuat durumunu, telsiz çevrim testini ve hava koşullarını işle",
      "Sınır ihlali ikazında Hazır Kıta timini mevziye sevk ederek üst komutanlığa ivedi durum raporu geç"
    ]
  },
  {
    "id": "savunma_5188_ozel_guvenlik_denetimi_ve_silah_ruhsat_kontrolu",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "5188 sayılı özel güvenlik hizmetlerine dair kanun",
      "özel güvenlik kimlik kartı ve silah taşıma ruhsatı yenileme",
      "özel güvenlik nöbet devir defteri ve x-ray cihazı testi",
      "emniyet özel güvenlik şube müdürlüğü denetim tutanağı",
      "güvenlik kamera kayıtları 30 günlük geçmiş yedek"
    ],
    "baslik": "5188 Özel Güvenlik: Kimlik Yenileme, Silah Denetimi & X-Ray Güvenlik Testi",
    "ikon": "🛡️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Aylık Rutin & Polis Denetimi Öncesi",
    "akilliFisilti": "🛡️ 5188 sayılı Kanun kapsamında güvenlik personelinin kimlik/silah ruhsat süreleri denetlenmeli; kamera kayıtlarının geriye dönük en az 30 gün saklandığı doğrulanmalıdır.",
    "oncedenYapilacaklar": [
      "Görevli tüm personelin 5188 Özel Güvenlik Kimlik Kartı geçerlilik ve 5 yıllık yenileme eğitim tarihlerini kontrol et",
      "Kurum demirbaşındaki silah ve mühimmatların seri numaralarını Silah Bulundurma/Taşıma Belgeleriyle fiziki eşleştir",
      "Giriş kapılarındaki Boy Dedektörü ve X-Ray cihazlarının STP (Standard Test Piece) test bloklarıyla hassasiyetini sına",
      "Kamera güvenlik odasında DVR/NVR sunucularının 30 günlük kesintisiz kayıt yaptığını ve saat senkronizasyonunu teyit et"
    ]
  },
  {
    "id": "savunma_vip_yakin_koruma_guzergah_kesfi_ve_safe_haven",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "vip yakın koruma güzergah keşfi route reconnaissance",
      "güvenli bölge safe haven ve acil tahliye planı",
      "koruma düzeni elmas kutu v formasyonu",
      "konvoy eskort araç mesafesi ve zırhlı araç özellikleri",
      "hastane acil servis ve tahliye helikopter koordinatları"
    ],
    "baslik": "VIP Koruma: Güzergah Keşfi (Route Recon), Güvenli Bölge (Safe Haven) & Konvoy",
    "ikon": "🚔",
    "renk": "#E0E7FF",
    "varsayilanZaman": "İntikal & VIP Ziyaret Öncesi",
    "akilliFisilti": "🚔 VIP intikali öncesinde ana ve alternatif güzergahlar keşfedilmeli; acil durumlar için en yakın hastane ve Safe Haven (Güvenli Sığınak) lokasyonları belirlenmelidir.",
    "oncedenYapilacaklar": [
      "Ziyaret edilecek bina ve güzergahta fiziki keşif yaparak dar boğazları (Chokepoints) ve kör noktaları haritalandır",
      "Acil saldırı veya kaza senaryosunda gidilecek en az 2 adet alternatif \"Güvenli Sığınak (Safe Haven)\" noktasını teyit et",
      "Koruma konvoyu zırhlı araçlarının lastik, fren, telsiz ve jammer sistemlerini göreve hazırla",
      "Etkinlik alanında yerel emniyet unsurlarıyla telsiz kanalı ve acil helikopter iniş alanı (Helipad) koordinasyonunu kur"
    ]
  },
  {
    "id": "savunma_muhimmat_sayim_cetveli_ve_kursun_muhur_denetimi",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "birlik silahlık mühimmat sandığı kurşun mühür",
      "günlük silah mühimmat fiziki sayım tutanağı ıslak imza",
      "doldur boşalt istasyonu doldur boşalt emniyet talimatı",
      "kademe bakım silah sıfırlama ve parça değişimi",
      "nöbetçi amiri silahlık devir teslim vukuat defteri"
    ],
    "baslik": "Silahlık & Mühimmat: Kurşun Mühür Denetimi, Fiziki Sayım Cetveli & Doldur-Boşalt",
    "ikon": "🎯",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Nöbet Devir-Teslim & Günlük Sayım",
    "akilliFisilti": "🎯 Silahlık devir-tesliminde tüm tabanca/tüfek seri numaraları ve mühimmat sandığı kurşun mühürleri fiziki sayılarak ıslak imzalı tutanağa bağlanmalıdır.",
    "oncedenYapilacaklar": [
      "Silahlık nöbetçi amiri nezaretinde raf ve kilitlerdeki tüm silahları seri numarası bazında fiziki say",
      "Mühimmat sandıklarının tel ve kurşun mühür numaralarının mühür defteriyle birebir eşleştiğini doğrula",
      "Nöbete giden ve dönen personelin doldur-boşalt istasyonunda namluyu kum havuzuna tutarak emniyet kontrolü yapmasını sağla",
      "Nöbet devir-teslim defterine vukuat durumunu işleyip Nöbetçi Subayı ve Amiriyle karşılıklı imzala"
    ]
  },
  {
    "id": "isg_kapali_alana_giris_izni_ve_4_gaz_olcum_cihazi",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "kapalı kısıtlı alana giriş izni confined space permit",
      "4 gaz ölçüm cihazı o2 lel co h2s kalibrasyonu",
      "patlayıcı gaz alt patlama limiti lel yüzde 10 altı",
      "oksijen seviyesi yüzde 19 5 ile 23 5 aralığı",
      "kapalı alan gözlemcisi nöbetçi ve kurtarma tripodu vinç"
    ],
    "baslik": "İSG Kapalı Alan: Giriş İzni (PTW), 4-Gaz Ölçümü (O2/LEL/CO/H2S) & Kurtarma Tripodu",
    "ikon": "☣️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kuyu, Tank, Menhol Girişi Öncesi",
    "akilliFisilti": "☣️ Kapalı alana girmeden önce portatif 4-gaz dedektörüyle üst-orta-alt seviyeden ölçüm yapılmalı; O2 (%19.5-23.5) ve LEL (<%10) limitleri sağlanıp izin formu imzalanmalıdır.",
    "oncedenYapilacaklar": [
      "4-gaz ölçüm cihazının Bump Testini ve temiz hava sıfırlamasını (Fresh Air Calibration) tamamla",
      "Tank/kuyu girişinde emiş probu ile Oksijen, Yanıcı Gaz (LEL), Karbonmonoksit ve H2S seviyelerini ölçüp forma yaz",
      "Giriş noktasına acil kurtarma tripodu, emniyet kemerine bağlı kurtarma vinci ve cebri havalandırma fanı kur",
      "Giriş ağzına görevlendirilen Kapalı Alan Gözlemcisine telsiz ve acil durum düdüğü teslim et"
    ]
  },
  {
    "id": "isg_iskele_guvenligi_yesil_etiket_scafftag_ve_ankraj",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "ön yapımlı çelik cephe iskelesi ts en 12810 standardı",
      "iskele kontrol kartı yeşil etiket scafftag haftalık denetim",
      "iskele duvar ankrajı çekme testi ve çapraz kuşaklar",
      "tam vücut koruma paraşüt tipi emniyet kemeri çift lanyart",
      "iskele topuk levhası tekme tahtası ve korkuluk yüksekliği"
    ],
    "baslik": "Yüksekte Çalışma: İskele Yeşil Etiketi (Scafftag), TS EN 12810 & Ankraj Çekme Testi",
    "ikon": "🧗",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Haftalık İskele Denetimi / Fırtına Sonrası",
    "akilliFisilti": "🧗 İskeleler TS EN 12810 standardına uygun kurulmalı, ankraj çekme testleri yapılmalı ve haftalık/fırtına sonrası denetlenerek Scafftag Yeşil Etiketi imzalanmalıdır.",
    "oncedenYapilacaklar": [
      "İskele ayaklarının taban plakaları ve krikolarla teraziye alındığını, ayar millerinin limit içinde olduğunu denetle",
      "Tüm çalışma platformlarında ana korkuluk (110 cm), ara korkuluk ve en az 15 cm'lik topuk levhası (toeboard) varlığını teyit et",
      "Tork anahtarı ve hidrolik test kiti ile iskele duvar ankraj kancalarının çekme dayanımını test et",
      "Yetkili İSG Uzmanı veya İnşaat Teknikeri imzalı \"İskele Güvenli Kullanım Kartını\" (Yeşil Scafftag) iskele girişine as"
    ]
  },
  {
    "id": "isg_is_kazasi_sgk_3_is_gunu_ve_kok_neden_analizi",
    "category": "resmi",
    "domain": "ISG",
    "keywords": [
      "6331 sayılı isg kanunu iş kazası bildirimi",
      "sgk iş kazası bildirimi 3 iş günü yasal hak düşürücü süre",
      "iş kazası kök neden analizi 5 neden ve balık kılçığı",
      "kaza araştırma raporu olay yeri krokisi ve tanık beyanları",
      "düzeltici önleyici faaliyet döf takibi ve isg kurulu"
    ],
    "baslik": "6331 İSG: SGK 3 İş Günü Kaza Bildirimi, 5-Neden Kök Neden Analizi & DÖF",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İş Kazası Meydana Geldiğinde (İlk 3 İş Günü)",
    "akilliFisilti": "⚠️ İş kazaları kazadan sonraki 3 İŞ GÜNÜ içinde SGK e-Bildirim portalından bildirilmeli; kazanın tekrarlanmaması için 5-Neden kök analiz raporu hazırlanmalıdır.",
    "oncedenYapilacaklar": [
      "Yaralı personele ilk yardım müdahalesini yaptırıp derhal sağlık kuruluşuna intikalini sağla",
      "Kaza anını, ekipman durumunu ve kişisel koruyucu donanımları gösteren olay yeri fotoğrafları ve krokisini çıkar",
      "e-Devlet SGK İş Kazası ve Meslek Hastalığı e-Bildirim sistemine 3 iş günü dolmadan resmi girişi yap",
      "Kaza İnceleme Komisyonu toplayarak \"5 Neden (5-Whys)\" analiziyle kök nedeni bulup DÖF (Düzeltici Önleyici Faaliyet) planla"
    ]
  },
  {
    "id": "isg_atex_patlamadan_korunma_dokumani_ve_zone_siniflandirma",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "atex patlayıcı ortamlar direktifi ve pkd dokümanı",
      "bölge zone 0 zone 1 zone 2 gaz buhar sınıflandırması",
      "zone 20 zone 21 zone 22 toz patlama tehlikesi",
      "ex-proof atex sertifikalı elektrik motoru aydınlatma",
      "statik elektrik topraklama ve antistatik iş ayakkabısı"
    ],
    "baslik": "ATEX & PKD: Patlamadan Korunma Dokümanı, Zone 0/1/2 Ayrımı & Ex-Proof Ekipman",
    "ikon": "💥",
    "renk": "#FED7AA",
    "varsayilanZaman": "Tesis Kurulumu & Periyodik PKD Revizyonu",
    "akilliFisilti": "💥 Yanıcı kimyasal ve solvent kullanılan alanlarda Patlamadan Korunma Dokümanı (PKD) hazırlanmalı, tehlike bölgeleri (Zone 0/1/2) belirlenip Ex-Proof ekipman seçilmelidir.",
    "oncedenYapilacaklar": [
      "Kimyasalların alev alma noktası, alt patlama limiti (LEL) ve buhar yoğunluğuna göre Zone haritasını çiz",
      "Zone 1 ve Zone 2 alanlarında kullanılan tüm armatür, motor ve butonların ATEX Ex d / Ex e sertifikalarını denetle",
      "Statik elektrik birikimini önlemek için tüm boru flanşlarında topraklama köprülerini (Jumper) kontrol et",
      "Patlayıcı ortama girecek personelin antistatik ESD iş kıyafeti ve ayakkabısı giydiğini zorunlu kıl"
    ]
  },
  {
    "id": "isg_ergonomi_risk_analizi_reba_rula_ve_agir_yuk_kaldirma",
    "category": "saglik",
    "domain": "ISG",
    "keywords": [
      "ergonomi risk analizi rula reba skorlama tablosu",
      "elle taşıma işleri yönetmeliği azami yük kaldırma sınırı 25 kg",
      "nıosh kaldırma indeksi ve tekrarlayan hareketler",
      "kas iskelet sistemi rahatsızlıkları montaj hattı ergonomisi",
      "ayarlanabilir çalışma masası ve anti-yorgunluk paspası"
    ],
    "baslik": "Ergonomi: REBA / RULA Skorlaması, NIOSH Yük Kaldırma (25kg) & Hat Optimizasyonu",
    "ikon": "🧍",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İş İstasyonu İyileştirme & Yıllık Risk Analizi",
    "akilliFisilti": "🧍 Manuel kaldırma işlerinde azami yük erkekler için 25 kg sınırında tutulmalı; postür analizi için RULA/REBA skoru yüksek çıkan istasyonlara mekanik kaldırıcı eklenmelidir.",
    "oncedenYapilacaklar": [
      "Çalışanların gövde, boyun, bacak ve kol açılarını video/fotoğrafla kaydederek REBA/RULA skorunu hesapla",
      "NIOSH Kaldırma Denklemi (RWL) ile yatay mesafe, dikey yükseklik ve kaldırma sıklığına göre güvenli sınırları belirle",
      "Ağır parça montaj hatlarına pnömatik vakumlu manipülatör veya hidrolik yük asansörleri dahil et",
      "Sürekli ayakta duran operatörlere anti-yorgunluk matı ve periyodik kas esnetme molaları tanımla"
    ]
  },
  {
    "id": "savunma_supheli_paket_eyp_ve_bomba_imha_protokolu",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "şüpheli paket el yapımı patlayıcı eyp ihbarı",
      "bomba imha ve inceleme uzmanı çağrısı",
      "300 metre emniyet çemberi tahliye ve çevre güvenliği",
      "jamming sinyal kesici jammer aktif etme",
      "su topu ve robotik müdahale tutanağı"
    ],
    "baslik": "Asayiş & Bomba İmha: Şüpheli Paket, 300m Güvenlik Çemberi, Jammer & Robot",
    "ikon": "💣",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Şüpheli Paket İhbarı Anı",
    "akilliFisilti": "💣 Şüpheli pakete ASLA dokunulmaz; telsiz/telefon sinyali kesilip en az 300 metrelik tahliye çemberi oluşturulur ve Bomba İmha Uzmanı beklenir.",
    "oncedenYapilacaklar": [
      "Olay yerini merkez alarak 360 derece en az 300 metre yarıçapında emniyet şeridi çek ve alanı tahliye et",
      "Uzaktan telsiz/cep telefonuyla patlatılma riskine karşı taşınabilir Jammer (Sinyal Kesici) cihazını aç",
      "112 ve İl Emniyet Haberleşme Merkezi üzerinden Bomba İmha Uzmanı ve İtfaiye/Sağlık ekibini ivedi sevk et",
      "Bomba uzmanı robotik su topuyla paketi etkisiz hale getirdikten sonra Olay Yeri İnceleme ekibiyle parça topla"
    ]
  },
  {
    "id": "savunma_afis_biyometrik_parmak_izi_ve_gozalti_cikisi",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "otomatik parmak izi teşhis sistemi afis apfis",
      "şüpheli biyometrik fotoğraf ve on parmak izi alma",
      "gözaltı giriş çıkış adli muayene raporu tabip",
      "üst arama ve eşya teslim tesellüm tutanağı",
      "nezarethane defteri kayıt ve kamera gözetimi"
    ],
    "baslik": "Emniyet & Parmak İzi: AFIS Biyometrik Kayıt, Nezarethane Defteri & Çıkış Muayenesi",
    "ikon": "👮",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Gözaltı İşlemleri & Savcılık Sevki Öncesi",
    "akilliFisilti": "👮 Şüphelinin AFIS sistemine 10 parmak ve avuç içi izi taranmalı; Savcılık sevki öncesinde zorunlu Adli Tabip Çıkış Muayene Raporu aldırılmalıdır.",
    "oncedenYapilacaklar": [
      "Şüphelinin kaba üst aramasını yapıp üzerindeki ziynet, kemer ve telefonları Eşya Teslim Tutanağına bağla",
      "Canlı parmak izi tarayıcısı ile AFIS sistemine 10 parmak, avuç içi ve cepheden/profillerden biyometrik fotoğrafını kaydet",
      "Nezarethane Defterine giriş saati, beslenme ve avukat görüşmelerini eksiksiz işle",
      "Nezaretten çıkarılıp adliyeye sevk edilmeden hemen önce devlet hastanesinden \"Adli Çıkış Raporunu\" al"
    ]
  },
  {
    "id": "savunma_taktik_telsiz_kripto_ve_eccm_frekans_atlama",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "askeri taktik telsiz aselsan hf vhf uhf",
      "frekans atlama eccm elektronik koruma tedbiri",
      "kripto anahtarı yükleme fill device anahtar silme zeroize",
      "telsiz çevrim testi ve muhabere nöbetçi subayı",
      "acil durum imha prosedürü kripto cihazı tahrip"
    ],
    "baslik": "Askeri Muhabere: Taktik Telsiz, ECCM Frekans Atlama & Kripto Anahtar Yükleme",
    "ikon": "📻",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Harekât Öncesi Muhabere Hazırlığı",
    "akilliFisilti": "📻 Düşman dinlemesini ve karıştırmasını engellemek için telsizlere güncel kripto anahtarları Fill Device ile yüklenmeli ve ECCM Frekans Atlama modu açılmalıdır.",
    "oncedenYapilacaklar": [
      "Kripto Subayından teslim alınan günlük kripto ve kanal anahtarlarını veri aktarma cihazıyla (Fill Gun) telsize yükle",
      "Telsizi Elektronik Koruma (ECCM - Frequency Hopping) moduna alarak birlik komuta kanalıyla çevrim denemesini yap",
      "Düşman eline geçme tehlikesi belirdiğinde telsizin \"ZEROIZE\" acil silme butonuna basarak tüm kriptoyu imha et",
      "Muhabere jurnal defterine telsiz batarya voltajı ve batarya şarj değişim periyotlarını kaydet"
    ]
  },
  {
    "id": "savunma_termal_durbun_sifirlama_ve_batarya_yonetimi",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "soğutmalı soğutmasız termal dürbün elektro-optik",
      "termal sıfırlama kalibrasyon nuc non-uniformity correction",
      "lityum batarya soğuk hava performansı yedek batarya",
      "lazer mesafe ölçer lrf ve gece görüş gözlüğü nvg",
      "hedef tespit teşhis tanıma dori kriterleri"
    ],
    "baslik": "Elektro-Optik: Termal Dürbün NUC Kalibrasyonu, LRF Mesafe & Soğuk Hava Bataryası",
    "ikon": "🔭",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Gece Görevi & Pusu/Devriye Öncesi",
    "akilliFisilti": "🔭 Termal sensör homojenliği için NUC kalibrasyonu yapılmalı; -20°C kış şartlarında lityum bataryalar vücut ısısında taşınarak göreve çıkılmalıdır.",
    "oncedenYapilacaklar": [
      "Dürbün merceğini kapatarak sensör homojenizasyonunu (NUC/Klak Tetikleme) yap ve termal kontrastı ayarla",
      "Lazer Mesafe Ölçer (LRF) ile bilinen referans koordinatlarda mesafe doğrulaması yap",
      "Yedek bataryaları soğukta voltaj düşümünü engellemek için iç cepte termal kılıfında muhafaza et",
      "NATO DORI (Tespit, Teşhis, Tanıma) menzillerine göre hedef sektör gözetleme kartını hazırla"
    ]
  },
  {
    "id": "savunma_cmk_119_adli_arama_ve_elkoyma_karari",
    "category": "resmi",
    "domain": "SAVUNMA",
    "keywords": [
      "cmk 119 adli arama kararı hakim kararı savcı emri",
      "avukat ve muhtar ihtiyar heyeti nezaretinde arama",
      "adli arama ve elkoyma tutanağı arama tanıkları",
      "gece vakti konutta arama yasağı ve suçüstü istisnası",
      "bilişim sistemlerinde arama ve kopya alma imaj cmk 134"
    ],
    "baslik": "CMK m.119 Adli Arama: Hakim/Savcı Kararı, Muhtar/İhtiyar Heyeti & Tutanak",
    "ikon": "⚖️",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Arama Kararı İcrası & Delil Toplama",
    "akilliFisilti": "⚖️ Konutta arama ancak Hakim kararı (gecikmesinde sakınca varsa Savcı emriyle) ve hazır bulunan Muhtar/İhtiyar Heyeti veya 2 tanık huzurunda icra edilebilir.",
    "oncedenYapilacaklar": [
      "Sulh Ceza Hakimliği Arama Kararı ve Savcılık Yazılı Emrinin tarih, saat ve adres doğruluğunu teyit et",
      "Aramaya başlamadan önce mahalle muhtarı veya ihtiyar heyetinden 2 kişiyi arama tanığı olarak hazır bulundur",
      "Şüpheli veya avukatına arama kararını ibraz ederek eşyaların tek tek arama tutanağına geçirilmesini sağla",
      "Ele geçirilen dijital materyallerde (CMK 134) adli bilişim personeli eşliğinde Hash (MD5/SHA256) değeri alarak kopyala"
    ]
  },
  {
    "id": "isg_sicak_is_izni_hot_work_ve_yangin_gozlemcisi",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "sıcak iş izni hot work permit kaynak kesme taşlama",
      "yangın gözlemcisi fire watch ve 6 kg abc yangın tüpü",
      "yanıcı patlayıcı madde 10 metre güvenlik mesafesi",
      "kaynak perdesi ve yanmaz yangın battaniyesi örtme",
      "iş bitimi 60 dakika süresince yangın soğuma nöbeti"
    ],
    "baslik": "İSG Sıcak İş İzni: 10m Yanıcı Madde İzolasyonu, Yangın Nöbeti & Yangın Battaniyesi",
    "ikon": "🔥",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kaynak / Kesme Öncesi & İş Bitimi",
    "akilliFisilti": "🔥 Kaynak ve taşlama yapılan yerin 10 metre çevresindeki tüm yanıcı maddeler uzaklaştırılmalı, 6 kg ABC tüpü hazır tutulmalı ve iş bitiminden sonra 60 dk yangın nöbeti tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Sıcak İş İzni Formunu (Hot Work Permit) İSG Uzmanı ve Alan Sorumlusuna imzalat",
      "Çalışma alanındaki kanal, ızgara ve açıklıkları kıvılcım geçirmeyen yanmaz yangın battaniyeleriyle kapat",
      "Görevlendirilen Yangın Gözlemcisine (Fire Watch) manometresi yeşilde 6 kg ABC KKT söndürücü teslim et",
      "İş tamamlandıktan sonra gizli alevlenme riskine karşı çalışma alanını 60 dakika boyunca gözlemle"
    ]
  },
  {
    "id": "isg_forklift_gunluk_kontrol_listesi_ve_catik_asinma",
    "category": "ev_teknik",
    "domain": "ISG",
    "keywords": [
      "forklift günlük kontrol formu operatör kontrol listesi",
      "çatal aşınması kumpasla topuk kalınlığı yüzde 10 sınırı",
      "fren hidroliği direksiyon boşluğu ve korna testi",
      "tepe lambası geri vites ikaz sireni ve mavi güvenlik ışığı",
      "forklift periyodik kontrol etiket geçerlilik süresi 1 yıl"
    ],
    "baslik": "Kaldırma Ekipmanı: Forklift Günlük Kontrolü, Çatal Aşınması & Mavi Emniyet Işığı",
    "ikon": "🚜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Vardiya Başlangıcı & Operatör Teslimi",
    "akilliFisilti": "🚜 Forklift çatallarında topuk aşınması %10'u geçerse çatal derhal yenilenmeli; mavi spot güvenlik ışığı ve geri vites sesli ikazı faal olmadan çalıştırılmamalıdır.",
    "oncedenYapilacaklar": [
      "Operatör tarafından lastik basıncı, kaldırma zincirleri, asansör rayları ve hidrolik kaçakları gözle kontrol et",
      "Çatal topuk kalınlığını kumpasla ölçerek orijinal et kalınlığına göre aşınmanın limit içinde olduğunu onayla",
      "Fren pedal testi, park freni, geri vites alarmı ve yaya uyarıcı Mavi Emniyet Işığını çalıştır",
      "Forklift Günlük Vardiya Kontrol Formunu imzalayıp kabin içine as"
    ]
  },
  {
    "id": "isg_kimyasal_maruziyet_twa_stel_ve_ortam_numunesi",
    "category": "saglik",
    "domain": "ISG",
    "keywords": [
      "kimyasal maddelerle çalışmalarda sağlık ve güvenlik önlemleri",
      "mesleki maruziyet sınır değerleri oel twa 8 saatlik",
      "kısa süreli maruziyet sınırı stel 15 dakikalık",
      "akredite iş hijyeni laboratuvarı kişisel maruziyet pompası",
      "voc uçucu organik bileşikler ve tüp numune analizi"
    ],
    "baslik": "İş Hijyeni & Kimyasallar: 8 Saatlik TWA, 15 Dakikalık STEL & Kişisel Pompa Ölçümü",
    "ikon": "☣️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıllık İş Hijyeni Ölçümü & Ortam Değişimi",
    "akilliFisilti": "☣️ Kimyasal buhar ve solvent maruziyetinde personelin solunum seviyesinden 8 saatlik TWA ve 15 dakikalık STEL ölçümleri akredite laboratuvar pompalarıyla yapılır.",
    "oncedenYapilacaklar": [
      "Kullanılan kimyasalların Güvenlik Bilgi Formlarındaki (MSDS) 8. Bölüm Mesleki Maruziyet Limitlerini (OEL) çıkar",
      "Çalışanın yakasına aktif karbon tüp ve kalibre kişisel hava örnekleme pompasını takarak 8 saatlik numune topla",
      "Gaz Kromatografisi (GC-MS) analiz sonuçlarını yönetmelikteki TWA ve STEL sınırlarıyla karşılaştır",
      "Sınır aşımlarında lokal cebri emiş davlumbazı kur ve uygun gaz filtreli (A1/A2/B/E/K) maske tahsis et"
    ]
  },
  {
    "id": "isg_acil_durum_ekipleri_ve_yillik_tatbikat_raporu",
    "category": "resmi",
    "domain": "ISG",
    "keywords": [
      "işyerlerinde acil durumlar hakkında yönetmelik",
      "acil durum ekipleri arama kurtarma yangın ilk yardım",
      "her 10 veya 20 çalışana 1 ilk yardımcı personeli belgesi",
      "yıllık acil durum tatbikatı ve video kamera kaydı",
      "acil durum eylem planı kroki toplanma alanı tahliye"
    ],
    "baslik": "6331 Acil Durum: Ekiplerin Görevlendirilmesi, İlkyardımcı Oranı & Tatbikat",
    "ikon": "🚨",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yılda En Az 1 Kez (Tatbikat)",
    "akilliFisilti": "🚨 Çok tehlikeli sınıfta her 30 çalışana, tehlikeli sınıfta her 40 çalışana 1 söndürme/kurtarma personeli ve Sağlık Bakanlığı onaylı İlkyardımcı görevlendirilmelidir.",
    "oncedenYapilacaklar": [
      "İşyerinin tehlike sınıfına ve çalışan sayısına göre Acil Durum Ekipleri listesini ve yedeklerini güncelle",
      "İlkyardımcı personelin 3 yıllık Sağlık Bakanlığı geçerlilik kartlarını kontrol edip yenileme eğitimine sevk et",
      "Sirenle başlatılan genel tahliye ve yangın söndürme tatbikatını senaryoya uygun kronometre ve kamerayla yönet",
      "Tatbikattaki aksaklıkları ve tahliye süresini \"Acil Durum Tatbikat Sonuç Raporuna\" işleyip İSG Kurulunda onayla"
    ]
  },
  {
    "id": "isg_gurultu_maruziyeti_80_85_dba_ve_odyometrik_test",
    "category": "saglik",
    "domain": "ISG",
    "keywords": [
      "çalışanların gürültü ile ilgili risklerden korunması yönetmeliği",
      "en düşük maruziyet eylem değeri 80 dba kulak tıkacı temini",
      "en yüksek maruziyet eylem değeri 85 dba kulak koruyucu zorunlu",
      "maruziyet sınır değeri 87 dba kesin sınır",
      "periyodik odyometri işitme testi saf ses işitme kaybı"
    ],
    "baslik": "Fiziksel Risk: Gürültü Sınırları (80 / 85 dBA), Kulak Koruyucu & Odyometri Testi",
    "ikon": "🎧",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Gürültü Haritası & Yıllık İşitme Taraması",
    "akilliFisilti": "🎧 80 dBA'da kulak koruyucu temin edilmeli, 85 dBA üzerinde kulaklık takılması ZORUNLU kılınmalı; kulak içi gürültü asla 87 dBA Maruziyet Sınırını aşmamalıdır.",
    "oncedenYapilacaklar": [
      "Akredite gürültü dozeri ile vardiya süresince personelin kişisel gürültü maruziyetini (Lex, 8h) ölç",
      "85 dBA üzerindeki makineleri akustik kabin ve titreşim takozları ile izole et",
      "İşyeri hekimi gözetiminde personelin yılda bir Saf Ses Odyometri işitme testini (4000 Hz çentik kontrolü) yaptır",
      "SNR değeri çalışma ortamı gürültüsünü 75 dBA altına indirecek CE sertifikalı kulaklık/tıkaç zimmetle"
    ]
  }
];
