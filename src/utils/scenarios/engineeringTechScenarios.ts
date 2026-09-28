import type { ShortScenarioMatch } from '../scenarioDatabase.ts';

/**
 * Notivia Bilişsel Modülü: INSAAT, ELEKTRIK_ELEKTRONIK, MAKINE, BILISIM, ENERJI, TEKNIK, OTOMOTIV
 * Toplam 218 Bilişsel Senaryo
 */
export const ENGINEERING_TECH_SCENARIOS: ShortScenarioMatch[] = [
  {
    "id": "muhendislik_oyun_gelistirme_proseduru",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "oyun geliştirme",
      "oyun geliştirme prosedürü",
      "oyun gelistirme proseduru",
      "game development",
      "game dev",
      "oyun yapımı",
      "oyun motoru",
      "gdd",
      "game design document",
      "unity geliştirme",
      "unreal engine geliştirme",
      "level design",
      "playtest"
    ],
    "baslik": "Oyun Geliştirme Prosedürü & Pipeline",
    "ikon": "🎮",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Geliştirme / Sprint Fazı",
    "hazirlikZamani": "GDD & Çekirdek Mekanik Prototipi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🎮 Oyun Geliştirme Standardı: GDD (Game Design Document) kilitlenmeden asset üretimine geçilmemeli; temel mekanikler gri kutu (Graybox) seviyesinde doğrulanıp 60 FPS profil testleri yapılmalıdır.",
    "oncedenYapilacaklar": [
      "GDD (Game Design Document) dokümanında çekirdek oyun döngüsü (Core Loop) ve kontrol mekaniklerini netleştir",
      "Gri kutu (Graybox) sahnesinde fizik, çarpışma (Collision) ve girdi (Input) mekaniklerini prototiple",
      "2D/3D varlıkları (Assets, Sprite Atlas, Rigged Modeller) oyun motoruna (Unity/Unreal/Godot) import et",
      "Draw call, occlusion culling, shader ve hedef 60/120 FPS optimizasyon profil testlerini (Profiler) tamamla",
      "Oynanış testleri (Playtest), dengeleme (Balancing) ve platform (Steam/Mobil/Konsol) build dağıtımını hazırla"
    ]
  },
  {
    "id": "muhendislik_blue_green_deployment",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "blue-green deployment",
      "zero-downtime deploy",
      "dns switch",
      "green environment",
      "kesintisiz canlıya alma"
    ],
    "baslik": "Blue-Green Deployment & DNS Switch (Sıfır Kesinti)",
    "ikon": "🚀",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Canlıya Alma Penceresi",
    "hazirlikZamani": "Green Ortam Smoke Testi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💻 Blue-Green mimarisinde aktif trafik Blue ortamındayken Green ortama deploy yapılır; smoke testler geçince Load Balancer 0 kesintiyle Green'e çevrilir.",
    "oncedenYapilacaklar": [
      "Green ortamında yeni sürüm container imajlarını ayağa kaldır ve DB migration geriye dönük uyumluluğunu test et",
      "Green URL üzerinden otomatik uçtan uca (E2E) smoke ve regresyon testlerini koştur",
      "Cloudflare / AWS Route 53 veya Nginx Load Balancer yönlendirme kuralını Blue'dan Green'e çevir",
      "Canlı loglarda HTTP 5xx hata izlemesi yap, beklenmeyen bir durumda 30 saniye içinde trafiği tekrar Blue'ya çevir"
    ]
  },
  {
    "id": "muhendislik_trafo_yag_delinme_gerilimi",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "trafo yağ delinme testi",
      "dielektrik dayanım 50 kv",
      "iec 60156",
      "trafo yağ asitliği",
      "yüksek gerilim trafo bakımı"
    ],
    "baslik": "Trafo Yağı Dielektrik Delinme Gerilimi Testi (IEC 60156)",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yıllık Periyodik Trafo Bakımı",
    "hazirlikZamani": "İzolasyon ve LOTO Kilitleme",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚡ IEC 60156 standardı uyarınca işletmedeki yüksek gerilim trafo yağının dielektrik delinme gerilimi en az 50 kV seviyesinde olmalıdır.",
    "oncedenYapilacaklar": [
      "Trafo yüksek ve alçak gerilim kesicilerini açıp LOTO ile kilitle, topraklama bıçaklarını kapat",
      "Trafo alt vanasından 1 litre yağ akıtarak tortuyu boşalt, ardından cam şişeye steril yağ numunesi al",
      "Laboratuvar test cihazında küresel elektrotlar arasında (2.5 mm aralık) gerilimi saniyede 2 kV artırarak delinme noktasını 6 kez test et",
      "Ortalama delinme gerilimi <40 kV ise yağı tasfiye (filtre/degazör) ünitesine bağlama kararı al"
    ]
  },
  {
    "id": "muhendislik_celik_torklama_kontrol",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "çelik konstrüksiyon torklama",
      "tork anahtarı kalibrasyonu",
      "10.9 kalite cıvata",
      "torklama tutanağı",
      "çelik montaj kontrolü"
    ],
    "baslik": "Çelik Konstrüksiyon Cıvata Torklama & Kalibrasyon Kontrolü",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Montaj Bitişi / Gün Sonu",
    "hazirlikZamani": "Tork Anahtarı Kalibrasyon Sertifikası",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🏗️ TS EN 1090 standardı uyarınca 8.8 ve 10.9 kalite yüksek mukavemetli yapı cıvataları statik projede belirtilen Nm tork değerinde sıkılmalı ve işaretlenmelidir.",
    "oncedenYapilacaklar": [
      "Kalibrasyonlu dijital/mekanik tork anahtarının sertifika geçerlilik tarihini teyit et",
      "Statik çelik projeden kolon-kiriş birleşim noktalarındaki hedef tork değerini (Örn: 450 Nm) doğrula",
      "Cıvataları çapraz sırayla sıkarak tork anahtarının klik/sinyal sesini al",
      "Torklanan her somun ve dişli üzerine beyaz/kırmızı kontrol boyası (Torque Seal) çekerek şantiye tutanağını imzala"
    ]
  },
  {
    "id": "muhendislik_kuyu_temel_ankraj_testi",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "ankraj çekme testi",
      "kuyu temel iksa",
      "geoteknik ankraj germe",
      "manometre çekme yükü",
      "iksa emniyeti"
    ],
    "baslik": "Kuyu Temel & Öngermeli Ankraj Çekme Testi",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Enjeksiyon Sertleşmesinden Sonra (7 Gün)",
    "hazirlikZamani": "Hidrolik Kriko Kalibrasyonu",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏗️ Derin kazı iksa sistemlerinde öngermeli geçici zemin ankrajları proje yükünün 1.25 katı ile çekme testine tabi tutularak kilitlenmelidir.",
    "oncedenYapilacaklar": [
      "Ankraj delgisi içine basılan çimento enjeksiyonunun priz alma süresini (min. 7 gün) bekle",
      "Çelik halat başlıklarına hidrolik krikoyu ve kalibre basınç manometresini yerleştir",
      "Kademeli olarak yükü artır (0.25P, 0.50P, 0.75P, 1.00P, 1.25P) ve komparatörle uzama değerini milimetrik oku",
      "Kabul kriterleri sağlandığında kama kilitlemesini yapıp geoteknik muayene raporunu onayla"
    ]
  },
  {
    "id": "muhendislik_sonarqube_quality_gate",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "sonarqube quality gate",
      "sast güvenlik taraması",
      "blocker bug kodu",
      "kod kapsamı %80",
      "ci/cd pipeline blocker"
    ],
    "baslik": "CI/CD Pipeline SAST & SonarQube Quality Gate",
    "ikon": "💻",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Pull Request / Merge Fazı",
    "hazirlikZamani": "Unit Test & Coverage Koşumu",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💻 Clean Code standardı: SonarQube Quality Gate başarısız (Failed) olursa CI/CD pipeline otomatik kesilmeli, Blocker/Critical zafiyetler sıfırlanmalıdır.",
    "oncedenYapilacaklar": [
      "Git feature branch üzerinde birim testleri koşturarak test kapsamının (coverage) ≥ %80 olduğunu doğrula",
      "Statik kod analizi (SAST) taramasını tetikleyip güvenlik açığı (Vulnerability) ve kod kokusu (Code Smell) analizini başlat",
      "Quality Gate kriterlerinde 0 Blocker ve 0 Security Hotspot koşulunun sağlandığını kontrol et",
      "Tarama geçtiğinde (Passed) PR onayını aç, geçmediğinde ilgili geliştiriciye Jira güvenlik bug'ı ata"
    ]
  },
  {
    "id": "muhendislik_asenkron_motor_yildiz_ucgen_yolverme",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "yıldız üçgen yol verme",
      "motor termik röle ayarı",
      "yıldız üçgen zaman rölesi",
      "demeraj akımı sınırlama",
      "kontaktör kilit devresi"
    ],
    "baslik": "Asenkron Motor Yıldız-Üçgen (Y-Δ) Yol Verme & Termik Ayar",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Motor Devreye Alma Sırasında",
    "hazirlikZamani": "Nominal Akım (In) & Zaman Rölesi Hesabı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚡ 5.5 kW üzeri motorlarda şebekeden 6-8 kat demeraj akımı çekilmesini önlemek için yıldız kontaktöründen üçgene geçiş süresi motor ataletine göre ayarlanmalıdır.",
    "oncedenYapilacaklar": [
      "Motor etiketindeki nominal akım (In) ve gerilim değerlerini (400V Üçgen) doğrula",
      "Yıldız-üçgen zaman rölesi süresini motorun kalkış devrine ulaşma süresine göre (genelde 4-8 sn) ayarla",
      "Ana ve üçgen kontaktörleri arasındaki elektriksel ve mekanik kilitlemeyi (interlock) test et",
      "Termik manyetik motor koruma şalterini nominal akımın 0.58 katına (üçgen faz akımı In * 0.58) ayarla"
    ]
  },
  {
    "id": "muhendislik_derin_kazi_iksa_ankraj_gergi_testi",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "öngerilmeli zemin ankrajı",
      "iksa perdesi ankraj gergi",
      "ankraj yükleme testi",
      "kiriş kilit kafası tork",
      "derin kazı deplasman"
    ],
    "baslik": "Derin Kazı İksa Öngerilmeli Zemin Ankrajı Gergi & Yükleme Testi",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Enjeksiyon Sertleşmesinden (7 Gün) Sonra",
    "hazirlikZamani": "Hidrolik Krikolar ve Manometre Kalibrasyonu",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏗️ Zemin ankrajı öngerme testinde tasarım yükünün 1.25 katına kadar aşamalı yükleme yapılarak sünme ve oturma kriteri onaylanmadan kilitleme yapılamaz.",
    "oncedenYapilacaklar": [
      "Enjeksiyon priz süresinin dolduğunu ve beton basınç dayanımının min. 25 MPa olduğunu teyit et",
      "İçi boş hidrolik krikoyu ankraj çelik halatlarına (strand) bağlayıp manometreyi sıfırla",
      "Yükü %25, %50, %75, %100 ve %125 kademeleriyle artırıp deplasman komparatör saatini oku",
      "Kilit kafasını (anchor head) takozlar üzerine kilitledikten sonra tork değerini ölçüp kayıt altına al"
    ]
  },
  {
    "id": "muhendislik_havalandirma_hvac_hava_debisi_tab",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "hvac tab testi",
      "hava kanalı debi ölçümü",
      "anemometre pitot tüpü",
      "menfez hava debisi balans",
      "klima santrali debi"
    ],
    "baslik": "HVAC Test, Ayar ve Dengeleme (TAB) & Pitot Tüpü Hava Debisi",
    "ikon": "💨",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Mekanik İmalat Tamamlandığında",
    "hazirlikZamani": "Kanal Kesit Alanı & Pitot Tüpü Kalibrasyonu",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚙️ ASHRAE 111 standardı gereğince her bir hava kanalındaki statik ve dinamik basınçlar ölçülerek menfez debileri proje değerlerinin ±%10 sınırına getirilmelidir.",
    "oncedenYapilacaklar": [
      "Klima santrali (AHU) filtrelerinin temiz olduğunu ve fan kayış gerginliğini kontrol et",
      "Ana dağıtım kanallarında açılan deliklerden Pitot tüpü ve mikro-manometre ile hava hızını (m/s) ölç",
      "Her mahalin emiş ve üfleme difüzörlerinde balometre (flow hood) ile m3/h cinsinden debiyi kaydet",
      "Ayarlı hava damperlerini sıkarak projede öngörülen debi dengesini (balans) sağla ve delikleri sızdırmaz tıkalarla kapat"
    ]
  },
  {
    "id": "muhendislik_yazilim_redis_cluster_failover",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "redis cluster failover",
      "redis sentinel replikasyon",
      "master node çökmesi",
      "redis cluster split-brain",
      "cache invalidation"
    ],
    "baslik": "Redis Cluster Otomatik Yük Devretme (Failover) & Replikasyon",
    "ikon": "💻",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Sunucu Kesintisi Anında",
    "hazirlikZamani": "Sentinel Quorum & Timeout Yapılandırması",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "💻 Redis Master düştüğünde Sentinel veya Cluster Raft konsensüsü ile yeni Slave milisaniyeler içinde Master rolüne terfi eder; client bağlantıları güncellenir.",
    "oncedenYapilacaklar": [
      "Redis cluster durumunu `redis-cli cluster nodes` veya `cluster info` ile denetle",
      "Master node'a `DEBUG SLEEP` veya stop sinyali göndererek failover senaryosunu simüle et",
      "Slave node'un oy çokluğuyla (quorum) otomatik yeni Master olduğunu doğrula",
      "Uygulama tarafındaki bağlantı havuzunun (connection pool) kesintisiz yeni Master IP'ye bağlandığını loglardan izle"
    ]
  },
  {
    "id": "muhendislik_biyomedikal_rontgen_kursun_zirhlama",
    "category": "saglik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "radyoloji kurşun zırhlama",
      "röntgen odası zırhlama testi",
      "taek tenmak zırhlama raporu",
      "2 mm kurşun levha",
      "radyasyon sızıntı ölçümü"
    ],
    "baslik": "Radyoloji Odası Kurşun Zırhlama & TENMAK Radyasyon Sızıntı Testi",
    "ikon": "☢️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Röntgen Cihazı Kurulum Öncesi",
    "hazirlikZamani": "Geiger-Müller Sayacı & Dozimetre Kalibrasyonu",
    "hazirlikSaatOncesi": 3,
    "akilliFisilti": "☢️ TENMAK mevzuatı gereği röntgen odası duvar ve kapılarında en az 2 mm saf kurşun levha bindirmeli monte edilmeli, operatör kabininde sızıntı sıfır olmalıdır.",
    "oncedenYapilacaklar": [
      "Kurşun levha birleşim yerlerinde en az 1.5 cm bindirme yapıldığını ve vida deliklerinin kurşun pul ile kapatıldığını doğrula",
      "Kurşunlu camın kurşun eşdeğerlik sertifikasını (min. 2.0 mm Pb) denetle",
      "Maksimum kVp ve mAs değerlerinde boş şutlama yaparak dış koridordan ve komşu odalardan iyon odalı dedektörle doz hızını ölç",
      "TENMAK Lisanslama Başvuru Dosyasına zırhlama uygunluk raporunu ve oda mimari planını ekle"
    ]
  },
  {
    "id": "ticaret_common_rail_dizel_enjektor_kodlama",
    "category": "is_kariyer",
    "domain": "OTOMOTIV",
    "keywords": [
      "enjektör kodlama",
      "ima kodu dizel enjektör",
      "common rail basınç testi",
      "enjektör geri dönüş testi",
      "delphi bosch enjektör kod"
    ],
    "baslik": "Common Rail Dizel Enjektör Değişimi & IMA/EMA Kodlama",
    "ikon": "🔧",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Enjektör Montajı Sonrası",
    "hazirlikZamani": "Yüksek Basınç Hattı Havasının Alınması",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🔧 Her yeni dizel enjektörün üzerindeki 16-20 haneli IMA kodu motor kontrol ünitesine (ECU) tanıtılmazsa motor şakırdar, duman atar ve rölanti dalgalanır.",
    "oncedenYapilacaklar": [
      "Enjektör yuvalarını özel freze ucuyla temizleyip yeni bakır pulları takarak tork anahtarıyla sık",
      "Yeni enjektör gövdelerindeki alfanümerik IMA/EMA kalibrasyon kodlarını not et",
      "OBD diyagnostik cihazını bağlayarak motor ECU'suna silindir sırasına göre enjektör kodlarını tanıt",
      "Mazot pompasını diyagnostik üzerinden çalıştırıp ray hattı havasını al ve test sürüşünde enjektör sapma (öğrenme) değerlerini kontrol et"
    ]
  },
  {
    "id": "ticaret_triger_kayisi_sente_ayar_aparat",
    "category": "is_kariyer",
    "domain": "OTOMOTIV",
    "keywords": [
      "triger kayışı değişimi",
      "sente kilit aparatı",
      "kam mili kilitleme",
      "triger gergi rulmanı tork",
      "subap vurma sente"
    ],
    "baslik": "Triger Kayışı & Devirdaim Pompası Değişimi (Sente Kilitleme)",
    "ikon": "⚙️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Km / Yıl Bakım Periyodunda",
    "hazirlikZamani": "Özel Krank ve Kam Mili Kilit Aparatları",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🔧 Krank ve eksantrik milleri özel kilit aparatlarıyla sabitlenmeden triger sökülürse subaplar piston tepesine vurarak motoru kırar.",
    "oncedenYapilacaklar": [
      "Motoru 1. silindir Üst Ölü Noktaya (ÜÖN) getirip krank mili ve kam mili sabitleme pimlerini tak",
      "Eski triger kayışını, gergi bilyasını, avare kasnakları ve devirdaim su pompasını sök",
      "Yeni triger kayışını dönüş yönü oklarına dikkat ederek tak ve otomatik gergiyi işaretli çentiğe getirip torkla",
      "Kilit pimlerini çıkarıp krankı elle 2 tam tur (720 derece) çevirerek sente çakışmasını gözle doğrula"
    ]
  },
  {
    "id": "muhendislik_trafo_yagi_delinme_gerilimi_iec60156",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "trafo yağı delinme testi",
      "dielektrik delinme gerilimi",
      "iec 60156 trafo testi",
      "trafo gaz analizi dga",
      "trafo yağı saflaştırma filtrasyon"
    ],
    "baslik": "Güç Trafosu İzolasyon Yağı Dielektrik Delinme Gerilimi Testi (IEC 60156)",
    "ikon": "⚡",
    "renk": "#FEF08A",
    "varsayilanZaman": "Yıllık Periyodik Trafo Bakımında",
    "hazirlikZamani": "Steril Cam Yağ Numune Şişesi & Test Cihazı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚡ IEC 60156 uyarınca trafo yağı dielektrik delinme dayanımı işletmedeki trafolarda en az 40-50 kV olmalıdır; 30 kV altına düşerse yağ degaze/filtre edilmelidir.",
    "oncedenYapilacaklar": [
      "Trafo alt vanasından önce 2-3 litre yağı boşaltıp atık kaba alarak tortuyu temizle",
      "Hava kabarcığı oluşturmadan özel cam numune kabına trafo izolasyon yağını doldur",
      "Yağ test cihazı hücresinde 2.5 mm küresel elektrot aralığını kalibrasyon mastarı ile doğrula",
      "Gerilimi 2 kV/saniye hızla artırarak 6 ardışık delinme testinin ortalamasını al ve raporla"
    ]
  },
  {
    "id": "muhendislik_betonarme_kolon_mantolama_epoksi_filiz",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "kolon mantolama",
      "epoksi donatı filiz ekimi",
      "tbd 2018 güçlendirme",
      "kolon beton kabuk kırma",
      "çekme testi pull-out testi"
    ],
    "baslik": "Deprem Güçlendirme: Kolon Mantolama & Kimyasal Ankraj (Pull-Out)",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Donatı İmalatı Öncesinde",
    "hazirlikZamani": "Beton Kırımı & Delik Basınçlı Hava Temizliği",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🏗️ TBDY 2018 gereğince epoksi filiz ekiminde delik içi tel fırça ve kompresörle tozdan tamamen arındırılmalı; çekme (Pull-Out) testiyle aderans doğrulanmalıdır.",
    "oncedenYapilacaklar": [
      "Mevcut betonarme kolonun dış sıvasını ve zayıf beton kabuğunu paspayı sıyrılana kadar kır",
      "Kiriş ve temele açılan filiz deliklerini endüstriyel tel fırça ve basınçlı hava tabancasıyla 3 kez temizle",
      "Çift bileşenli saf epoksi reçineyi tabancayla deliğin 2/3'ü dolana kadar enjekte et ve nervürlü demiri çevirerek sok",
      "Reçine kuruduktan 24 saat sonra hidrolik kriko ile donatıda Pull-Out çekme testini gerçekleştir"
    ]
  },
  {
    "id": "muhendislik_kazan_emniyet_ventili_blöf_ve_acma_testi",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "kazan emniyet ventili testi",
      "buhar kazanı blöf vanası",
      "emniyet ventili açma basıncı",
      "periyodik kazan hidrostatik test",
      "kazan aşırı basınç koruma"
    ],
    "baslik": "Buhar Kazanı Emniyet Ventili Patlama Testi & Yüzey/Dip Blöf",
    "ikon": "♨️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Haftalık / Periyodik Muayenede",
    "hazirlikZamani": "İşletme Basıncına Ulaşılması & Manuel Açma Kolu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚙️ Buhar kazanında emniyet ventili işletme basıncının %10 üzerinde tam debiyle açmalıdır; ventiller kireçlenmeye karşı haftada bir manuel test koluyla blöflenmelidir.",
    "oncedenYapilacaklar": [
      "Kazan basınç göstergesi manometresinin kalibrasyon mührünü kontrol et",
      "Kazan işletme basıncına ulaştığında manuel kaldırma kolunu hafifçe çekerek buhar blöfü yap ve tortuyu temizle",
      "Basıncı aşamalı yükselterek emniyet ventilinin ayarlandığı patlama basıncında otomatik tahliye yaptığını doğrula",
      "Kazan tabanındaki çamur blöf vanasını 3-5 saniye süreyle ani açıp dip tortusunu blöf tankına at"
    ]
  },
  {
    "id": "muhendislik_kubernetes_hpa_otomatik_olceklendirme",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "kubernetes hpa autoscaling",
      "pod yatay ölçeklendirme",
      "cpu bellek eşik değeri",
      "k8s metrics-server",
      "replica sayısı ölçekleme"
    ],
    "baslik": "Kubernetes Pod Yatay Otomatik Ölçeklendirme (HPA & K8s)",
    "ikon": "☸️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Yüksek Trafik / Kampanya Döneminde",
    "hazirlikZamani": "Metrics-Server & Resource Limits (CPU/RAM)",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💻 Pod deployment dosyasında CPU ve RAM limit/request tanımlı değilse K8s Metrics-Server metrik toplayamaz ve HPA ölçeklendirmesi çalışmaz.",
    "oncedenYapilacaklar": [
      "Cluster genelinde `kubectl top nodes` ve `kubectl top pods` komutlarıyla metrik akışını doğrula",
      "Deployment manifestosunda CPU request (örn: 200m) ve limit (örn: 500m) değerlerini tanımla",
      "HPA kaynağını `%70 CPU hedefi, min 2 - max 20 pod` kuralıyla oluştur (`kubectl autoscale`)",
      "Yük testi aracıyla (k6/JMeter) suni trafik oluşturup pod sayısının otomatik arttığını izle"
    ]
  },
  {
    "id": "muhendislik_fiber_optik_otdr_ve_optik_ek_kayip_olcumu",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "otdr fiber testi",
      "fiber füzyon ek cihazı",
      "ek yeri zayıflaması db",
      "optik geri dönüş kaybı orl",
      "fiber kopuk mesafesi tespiti"
    ],
    "baslik": "Fiber Optik Füzyon Eki & OTDR Reflektometre Zayıflama Testi",
    "ikon": "📡",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Fiber Eki Tamamlandığında",
    "hazirlikZamani": "Hassas Fiber Bıçak (Cleaver) & Alkolle Temizlik",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "⚡ İdeal fiber füzyon ek noktasında zayıflama <0.05 dB olmalıdır; OTDR cihazı 1310/1550 nm dalga boylarında fiber hattının metre metre zayıflama haritasını çıkarır.",
    "oncedenYapilacaklar": [
      "Fiber optik kablo soyucu ile zırhı soyup lifi izopropil alkollü tüy bırakmaz mendille sil",
      "Hassas elmas cleaver ile lifi tam 90 derece açıyla kırıp füzyon ek cihazının V yuvasına yerleştir",
      "Cihazın elektrik arkı ile kaynağı yapıp ek zayıflamasını (<0.03 dB) ekranda kontrol et ve ısıyla daralan ısıyla koruyucu kovanı fırınla",
      "Hattın ucuna OTDR optik zaman reflektometresini bağlayıp fiber boyunu, ek kayıplarını ve konnektör yansımalarını grafik olarak kaydet"
    ]
  },
  {
    "id": "otomotiv_fren_hidroligi_kaynama_noktasi_dot4",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "fren hidroliği kaynama noktası",
      "fren hidroliği test kalemi",
      "dot 4 hidrolik nem oranı",
      "fren hidroliği hava alma vakum",
      "buhar kilidi vapor lock fren"
    ],
    "baslik": "Fren Hidroliği Nem Tayini, Kaynama Noktası & Vakumlu Değişim",
    "ikon": "🛑",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Periyodik 2 Yıl / 40.000 Km Bakımında",
    "hazirlikZamani": "Dijital Kaynama Noktası Ölçer & Basınçlı Vakum Cihazı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🔧 Fren hidroliğinde nem %3'ü aştığında kaynama noktası 150°C'ye düşer; yokuş aşağı inişte hidrolik kaynayarak pedal boşa düşer (buhar kilidi).",
    "oncedenYapilacaklar": [
      "Rezervuar kapağını açıp optik refraktometre veya kaynama noktası test cihazı probunu daldır",
      "Nem oranının %3 altında ve ıslak kaynama noktasının 155°C üzerinde olduğunu doğrula",
      "Fren hidroliği dolum cihazını rezervuara 1.5 bar basınçla bağlayıp yeni DOT 4 hidroliği bas",
      "Tekerlek kaliper rekorlarını sırayla (en uzaktan en yakına) açarak berrak sıvı gelene kadar eski sıvıyı tahliye et"
    ]
  },
  {
    "id": "otomotiv_direksiyon_aci_sensoru_sas_kalibrasyonu",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "direksiyon açı sensörü sas",
      "esp lambası yanıyor direksiyon",
      "ön düzen rot ayarı sonrası sas",
      "sas sıfırlama obd",
      "direksiyon tork sensörü adaptasyon"
    ],
    "baslik": "Direksiyon Açı Sensörü (SAS) Sıfırlama & ESP Adaptasyonu",
    "ikon": "🛞",
    "renk": "#FED7AA",
    "varsayilanZaman": "Rot-Balans veya Direksiyon Kutusu Onarımı Sonrası",
    "hazirlikZamani": "Aracın Düz Konumlandırılması & Lastik Basınçları",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🔧 Ön takım veya rot ayarı sonrası direksiyon açı sensörü sıfırlanmazsa ESP sistemi aracı virajda sanıp tekerleklere istemsiz fren müdahalesi yapar.",
    "oncedenYapilacaklar": [
      "Aracı tam düz zemine alıp ön tekerlekleri su terazisiyle sıfır derece düz doğrultuya getir",
      "Diyagnostik cihazını OBD soketine bağlayıp ABS/ESP kontrol ünitesi canlı verilerine gir",
      "Direksiyon simidini tam merkezde sabitleyip \"SAS Calibration / Zero Point\" fonksiyonunu çalıştır",
      "Direksiyonu tam sol ve tam sağ dayayarak uç noktaları hafızaya aldır ve arıza kodunu (DTC) sil"
    ]
  },
  {
    "id": "muhendislik_paratoner_topraklama_direnci_meger_nfc17102",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "paratoner topraklama ölçümü",
      "topraklama megeri direnç <10 ohm",
      "erken akış uyarımlı ese paratoner",
      "nfc 17-102 paratoner testi",
      "yıldırımdan korunma test klemensi"
    ],
    "baslik": "Yıldırımdan Korunma: ESE Paratoner & Topraklama Direnci Ölçümü (<10 Ω)",
    "ikon": "⚡",
    "renk": "#FEF08A",
    "varsayilanZaman": "Yıllık Periyodik Yıldırımdan Korunma Muayenesinde",
    "hazirlikZamani": "Topraklama Megeri Kazıkları & Test Klemensi Açımı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚡ NFC 17-102 standardı gereği paratoner topraklama geçiş direnci 10 Ohm'un altında olmalıdır; ölçüm yapılırken test klemensi mutlaka açılarak bina şebekesinden ayrılır.",
    "oncedenYapilacaklar": [
      "Paratoner iniş iletkeni üzerindeki test klemensini civatasını sökerek sistemden ayır",
      "Topraklama megerinin yardımcı akım ve gerilim kazıklarını elektrottan 10 ve 20 metre mesafede toprağa çak",
      "Cihazın test butonuna basarak omik direnç değerini oku; 10 Ohm üzerindeyse bentonit/topraklama çubuğu ilavesi planla",
      "Paratoner başlığının kıvılcım test cihazıyla iyon yayma fonksiyonunu çatıda test et ve tutanak düzenle"
    ]
  },
  {
    "id": "muhendislik_betonarme_slump_cokme_ve_sicaklik_deneyi",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "slump çökme testi beton",
      "abrams konisi 3 kademe 25 şişleme",
      "taze beton sıcaklığı en çok 32 derece",
      "transmikser numune alma en 12350",
      "betona su katılması yasak"
    ],
    "baslik": "Taze Beton Şantiye Kabulü: Slump (Çökme) Deneyi & Sıcaklık Kontrolü",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Transmikser Şantiyeye Girdiğinde",
    "hazirlikZamani": "Abrams Konisi, Şişleme Çubuğu & Cetvel",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "🏗️ TS EN 12350-2 gereği slump testi transmikserin ortasından alınan betonla 3 kademede 25'er kez şişlenerek yapılır; şantiyede transmiksere su katılması KESİNLİKLE yasaktır.",
    "oncedenYapilacaklar": [
      "İrsaliye üzerindeki beton sınıfını (C30/37 vb.), santral çıkış saatini ve su/çimento oranını kontrol et",
      "Transmikser oluğunu temizletip beton akışının 1/3'ü geçtikten sonra temiz tekneye taze beton al",
      "Abrams konisini 3 eşit tabakada doldurarak her tabakayı standart demir çubukla 25 kez şişle",
      "Koniyi dikey olarak 5 saniyede kaldırıp cetvelle çökme miktarını (hedef S3: 100-150 mm) ve termometreyle sıcaklığı (<32°C) ölç"
    ]
  },
  {
    "id": "muhendislik_chiller_sogutma_grubu_superheat_subcooling",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "chiller superheat kızdırma",
      "subcooling aşırı soğutma",
      "soğutma gazı r134a r410a manometre",
      "evaporatör yaklaşım farkı approach",
      "chiller kompresör yağ basıncı"
    ],
    "baslik": "Endüstriyel Chiller: Superheat & Subcooling Soğutma Gazı Verimi",
    "ikon": "❄️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Chiller Devreye Alma / Sezon Bakımında",
    "hazirlikZamani": "Dijital Manifold Manometre & Yüzey Sıcaklık Probları",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚙️ İdeal soğutma döngüsünde evaporatör Superheat değeri 4-6°C, kondenser Subcooling değeri 3-5°C olmalıdır; sapma varsa gaz kaçağı veya genleşme vanası arızası vardır.",
    "oncedenYapilacaklar": [
      "Dijital manifold problarını emme ve basma servis vanalarına bağlayarak doymuş buharlaşma/yoğuşma basıncını ölç",
      "Boru yüzeyine temas eden dijital termokupl ile kompresör emiş ve likit hattı sıcaklıklarını al",
      "Superheat (Emiş Sıcaklığı - Doyma Sıcaklığı) ve Subcooling farklarını hesapla",
      "Termostatik genleşme vanasını (TXV) tornavida ile ince ayarlayarak kompresöre sıvı soğutucu akışkan yürümesini önle"
    ]
  },
  {
    "id": "muhendislik_postgresql_vacuum_analyze_bloat_temizligi",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "postgresql vacuum analyze",
      "table bloat ölü satır temizliği",
      "pg_stat_user_tables ölü tuple",
      "autovacuum parametreleri ayarı",
      "postgresql index reindex"
    ],
    "baslik": "PostgreSQL Veritabanı: VACUUM ANALYZE & Table Bloat Temizliği",
    "ikon": "🐘",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Düşük Trafikli Gece Saatlerinde (03:00)",
    "hazirlikZamani": "Ölü Satır (Dead Tuples) Oranı Sorgulaması",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💻 PostgreSQL MVCC mimarisinde silinen veya güncellenen satırlar diskte ölü satır (dead tuple) bırakır; periyodik VACUUM yapılmazsa sorgular fahiş yavaşlar.",
    "oncedenYapilacaklar": [
      "`pg_stat_user_tables` görünümünden tablolardaki `n_dead_tup` ve `n_live_tup` oranlarını sorgula",
      "Ölü satır oranı %20'yi aşan tablolarda kilitlenme yaratmayan `VACUUM (ANALYZE, VERBOSE)` komutunu çalıştır",
      "Sorgu planlayıcısının güncel istatistiklere sahip olması için `pg_class` ve histogram verilerini tazele",
      "Ağır şişmiş tablolarda bakım penceresi dahilinde `REINDEX TABLE CONCURRENTLY` ile indeksleri yeniden inşa et"
    ]
  },
  {
    "id": "muhendislik_termal_kamera_elektrik_panosu_isi_anomali",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "termal kamera pano denetimi",
      "şalter gevşek klemens ısınma",
      "delta t sıcaklık farkı pano",
      "kontaktör aşırı ısınma faz dengesizliği",
      "termografik muayene raporu"
    ],
    "baslik": "Elektrik Panoları Termografik Muayenesi & Sıcak Nokta (Hot-Spot) Analizi",
    "ikon": "🌡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Tesis Tam Yükte Çalışırken",
    "hazirlikZamani": "Kalibre Termal Kamera & Ark Flash Koruyucu Vizör",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "⚡ Elektrik panosu termal taramasında fazlar arası veya klemensler arası sıcaklık farkı (Delta T) >15°C ise kritik yangın tehlikesi vardır; derhal torklanmalıdır.",
    "oncedenYapilacaklar": [
      "Pano kapaklarını açarken ark flash koruyucu başlık, vizör ve 1000V dielektrik eldiven kuşan",
      "Termal kamerada emisivite katsayısını (bakır bara ve PVC yalıtkan için 0.95) ayarla",
      "Ana kompakt şalter giriş-çıkış pabuçları, sigortalar ve kablo bağlantı noktalarını tarayarak azami sıcaklığı oku",
      "Benzer yük altındaki fazlar arası Delta T >15°C olan gevşek klemensleri termogram fotoğrafıyla acil bakım listesine al"
    ]
  },
  {
    "id": "otomotiv_klima_gazi_r1234yf_kacak_testi_ve_dolum",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "r1234yf klima gazı",
      "klima kaçak testi azot hidrojen",
      "klima vakum süresi 20 dk",
      "pag klima kompresör yağı",
      "klima gaz dolum istasyonu"
    ],
    "baslik": "Otomotiv İklimlendirme: R1234yf Çevreci Gaz Dolumu & Azot Kaçak Testi",
    "ikon": "❄️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Yaz Bakımında / Soğutmama Şikayetinde",
    "hazirlikZamani": "Otomatik Gaz Dolum Cihazı & UV Kaçak Dedektörü",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🔧 Yeni nesil araçlarda yanıcı R1234yf gazı kullanılır; gaz basılmadan önce sisteme 15 bar azot-hidrojen basılarak kaçak testi yapılmalı ve 20 dk vakum çekilmelidir.",
    "oncedenYapilacaklar": [
      "Kaput altı etiketinden klima gazı cinsini (R134a veya R1234yf) ve gramaj miktarını (örn: 550g) doğrula",
      "Sisteme 15 bar kuru azot gazı basarak manometrede basınç düşüşü olup olmadığını kontrol et",
      "Otomatik dolum istasyonuyla en az 20 dakika vakum yaparak sistemdeki tüm nemi tahliye et",
      "Gereken gramajda taze gazı ve UV boyalı PAG kompresör yağını şarj edip ızgara çıkış sıcaklığını (hedef 4-7°C) ölç"
    ]
  },
  {
    "id": "otomotiv_turbo_sarj_wastegate_ve_vnt_geometri_ayari",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "turbo wastegate ayarı",
      "vnt değişken geometri turbo kanatçık",
      "turbo basınç sensörü map bar",
      "turbo mili eksenel boşluk",
      "turbo aşırı basınç limp mode"
    ],
    "baslik": "Dizel/Benzinli Turboşarj: Değişken Geometri (VNT) & Wastegate Kalibrasyonu",
    "ikon": "🌀",
    "renk": "#FED7AA",
    "varsayilanZaman": "Turbo Revizyonu Sonrasında",
    "hazirlikZamani": "Vakum Pompası (Mityvac) & Komparatör Saati",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🔧 VNT kanatçıkları kurum bağlarsa araç arıza lambası yakıp korumaya (Limp Mode) geçer; aktüatör çubuğu vakum saatiyle mikrometrik kalibre edilmelidir.",
    "oncedenYapilacaklar": [
      "Turbo emiş hortumunu söküp milin radyal ve eksenel boşluğunu komparatör saatiyle kontrol et",
      "Vakum aktüatörüne el tipi vakum pompası bağlayıp kanatçık mekanizmasının takılmadan hareket ettiğini doğrula",
      "Hedef vakum değerinde (örn: 18 inHg) aktüatör kolunun dayama civatasına tam temas ettiğini ayarla",
      "Test sürüşünde OBD canlı verilerinden istenen (specified) ve gerçekleşen (actual) turbo boost basıncını karşılaştır"
    ]
  },
  {
    "id": "muhendislik_topraklama_ozgul_direnc_wenner_dort_nokta",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "toprak özgül direnci wenner",
      "dört kazık wenner metodu",
      "topraklama meğeri ölçümü",
      "elektrik tesislerinde topraklamalar yönetmeliği",
      "özgül direnç ohm-metre"
    ],
    "baslik": "Topraklama Tasarımı: Wenner 4 Nokta Metodu ile Toprak Özgül Direnci",
    "ikon": "⚡",
    "renk": "#FEF08A",
    "varsayilanZaman": "Proje Tasarım Aşamasında / Saha Etüdünde",
    "hazirlikZamani": "Topraklama Meğeri, 4 Adet Çelik Kazık & Eşit Mesafeli Makaralar",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚡ Elektrik Tesislerinde Topraklamalar Yönetmeliği gereği trafo veya santral sahasında 4 kazık arası eşit (a) mesafesinde Wenner ölçümü yapılmadan topraklama projesi çizilemez.",
    "oncedenYapilacaklar": [
      "Düz bir hat üzerinde 4 adet çelik elektrodu aralarında eşit \"a\" mesafesi (örn: 2m, 4m, 6m, 8m) olacak şekilde toprağa 20 cm çak",
      "Dış elektrotlara (C1-C2) akım kablolarını, iç elektrotlara (P1-P2) gerilim kablolarını bağla",
      "Topraklama meğerinden okunan R direnç değerini `Rho = 2 * pi * a * R` formülüyle ohm-metre cinsinden hesapla",
      "Farklı derinlik profilleri için mesafeleri artırarak çok katmanlı zemin özdirenç raporunu hazırla"
    ]
  },
  {
    "id": "muhendislik_celik_yapilarda_torklu_bulon_montaj_en1090",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "torklu bulon montajı",
      "10.9 kalite çelik civata",
      "tork anahtarı kalibrasyon sertifikası",
      "en 1090 çelik yapı montajı",
      "ön gerilmeli bulon sıkma kuralı"
    ],
    "baslik": "Çelik Konstrüksiyon: 10.9 Kalite Bulon Ön Germe & Tork Kontrolü (EN 1090-2)",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Çelik Kolon-Kiriş Birleşim Montajında",
    "hazirlikZamani": "Kalibre Dijital Tork Anahtarı & DTI İndikatör Pulları",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🏗️ TS EN 1090-2 gereği yüksek mukavemetli (8.8 veya 10.9) bulonlar tork kontrol yöntemiyle sıkılmalı; bağlantı plakaları arasında boşluk ve boya çapağı kalmamalıdır.",
    "oncedenYapilacaklar": [
      "Bulon paketlerindeki kalite belgesini (EN 14399 HV veya HR serisi) ve katsayı k-sınıfını kontrol et",
      "Birleşim yüzeylerindeki sürtünme katsayısını bozacak pas, yağ veya fazla boyayı raspala",
      "İlk aşamada tasarım torkunun %75'ini çapraz sıra ile uygula",
      "İkinci aşamada kalibrasyonlu tork anahtarı ile tam hedef tork değerine (Nm) ulaşıp bulon kafalarını boya kalemiyle işaretle"
    ]
  },
  {
    "id": "muhendislik_pompa_kavitasyon_npsh_hesabi_ve_basincli_hat",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "pompa kavitasyon önleme",
      "npsh hesabı net pozitif emme yüksekliği",
      "pompa çarkında aşınma erozyon",
      "emme hattı vakum manometresi",
      "buharlaşma basıncı kavitasyon"
    ],
    "baslik": "Hidrolik & Akışkan: Pompa Kavitasyonu & NPSH (Net Pozitif Emme) Hesabı",
    "ikon": "⚙️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Pompa Seçimi ve Devreye Alma Aşamasında",
    "hazirlikZamani": "Emme Hattı Basınç & Sıcaklık Ölçümü",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚙️ Kavitasyonu önlemek için sistemin sağladığı NPSHa değeri, pompanın istediği NPSHr değerinden en az 0.5 - 1.0 metre daha yüksek olmalıdır.",
    "oncedenYapilacaklar": [
      "Akışkanın çalışma sıcaklığındaki doymuş buhar basıncını (Pv) buhar tablosundan oku",
      "Emme tankı statik yüksekliği, atmosferik basınç ve emme borusu sürtünme kayıplarından mevcut NPSHa değerini hesapla",
      "Pompa üretici eğrisinden debiye karşılık gelen gerekli NPSHr değerini doğrula (NPSHa > NPSHr + 0.5m)",
      "Pompa çalışırken çakıl taşı çarpması sesi veya anormal titreşim olup olmadığını titreşim probu ile denetle"
    ]
  },
  {
    "id": "muhendislik_yazilim_kafka_event_streaming_consumer_lag",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "kafka consumer lag izleme",
      "partition rebalance kafka",
      "kafka offset commit",
      "event streaming kafka kuyruk",
      "dead letter queue dlq"
    ],
    "baslik": "Dağıtık Sistemler: Apache Kafka Consumer Lag & Partition Rebalance",
    "ikon": "💻",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Yüksek Veri Akışı ve Mikroservis Takiplerinde",
    "hazirlikZamani": "Grafana / Prometheus Kafka Exporter Dashboard",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💻 Kafka Consumer Lag sürekli artıyorsa consumer grubu mesaj tüketim hızına yetişemiyordur; partition sayısı artırılmalı veya consumer podları ölçeklenmelidir.",
    "oncedenYapilacaklar": [
      "`kafka-consumer-groups.sh --describe` komutu ile topic bazında current-offset ve log-end-offset farkını (Lag) izle",
      "İşlenemeyen hatalı mesajları sonsuz döngüye girmeden Dead Letter Queue (DLQ) topic'ine yönlendir",
      "Heartbeat timeout nedeniyle istemsiz partition rebalance yaşanmaması için `max.poll.interval.ms` süresini optimize et",
      "Veri kaybını önlemek için `acks=all` (tüm replikalar onayladı) ve `enable.idempotence=true` yapılandırmasını doğrula"
    ]
  },
  {
    "id": "muhendislik_asansor_periyodik_kontrol_yesil_etiket_tsen81",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "asansör yeşil etiket kontrolü",
      "ts en 81-20 asansör güvenlik",
      "paraşüt fren testi asansör",
      "akredite a tipi muayene kuruluşu",
      "asansör aşırı yük testi %125"
    ],
    "baslik": "Asansör Güvenliği: TS EN 81-20/50 Yeşil Etiket & Paraşüt Fren Testi",
    "ikon": "🛗",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıllık Periyodik Muayenede",
    "hazirlikZamani": "Kabin İçine %125 Nominal Test Yükü (Ağırlıklar)",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚙️ Asansör Yönetmeliği uyarınca A Tipi Muayene Kuruluşunca kabin %125 yükle aşağı yönde hız regülatörü tetiklenerek paraşüt fren mekanik kilitlenmesi test edilir.",
    "oncedenYapilacaklar": [
      "A Tipi Akredite Muayene Kuruluşu mühendisleri ile bina yöneticisini makine dairesinde hazır bulundur",
      "Hız regülatörünün (Governor) halatını manuel olarak kilitleyerek kabin güvenlik tertibatının (paraşüt blokları) rayı ısırdığını doğrula",
      "Kabin aşırı yük kontağının (%110 yükte kapıları kapatmayıp sesli ikaz verdiği) testi yap",
      "Kuyu altı tamponları, fotosel kapı dedektörleri ve çift yönlü interkom acil kurtarma butonunu onaylayıp Yeşil Etiket yapıştır"
    ]
  },
  {
    "id": "otomotiv_klima_gazi_vakum_ve_kacak_testi_r134a_r1234yf",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "oto klima gazı dolumu",
      "klima vakum kaçak testi 20 dakika",
      "r134a gaz dolumu gramaj",
      "r1234yf yeni nesil gaz",
      "klima uv boyalı kaçak tespiti"
    ],
    "baslik": "Oto İklimlendirme: R134a/R1234yf Gaz Dolumu, 20 Dk Vakum & UV Kaçak",
    "ikon": "❄️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Klima Bakım Sezonunda / Gaz Eksikliğinde",
    "hazirlikZamani": "Klima İstasyonu Bağlantı Rekorları (Yüksek/Alçak Basınç)",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🔧 Sistemde hava ve nem varken gaz basılırsa kompresör asit üretip kilitlenir; en az 20 dakika vakumda bekletilip kaçak testi geçilmeden gaz basılamaz.",
    "oncedenYapilacaklar": [
      "Kaput altındaki etiketten aracın orijinal gaz tipini (R134a veya R1234yf) ve net gramajını (örn: 500g ± 15g) doğrula",
      "Klima dolum cihazının kırmızı (yüksek basınç) ve mavi (alçak basınç) vanalarını servis portlarına kilitle",
      "Eski gazı ve yağı geri kazanım tankına çekip en az 20 dakika boyunca -1 bar vakum altında kaçak testi yap",
      "Gramajında yeni sentetik PAG kompresör yağı, UV floresan kaçak boyası ve saf klima gazını sisteme enjekte et"
    ]
  },
  {
    "id": "otomotiv_akilli_far_kalibrasyonu_matrix_led_adas",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "matrix led far ayarı",
      "far ayar cihazı optik lüksmetre",
      "akıllı uzun far kamerası kalibrasyonu",
      "far yükseklik sensörü sıfırlama",
      "dinamik viraj farı kalibrasyon"
    ],
    "baslik": "Matrix LED & Akıllı Far Sistemi Optik Ayarı & Kamera Eşleştirmesi",
    "ikon": "💡",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Far / Ön Cam Değişimi veya Amortisör Onarımı Sonrası",
    "hazirlikZamani": "Lastik Basınçları Tam, Şoför Koltuğunda 75 Kg Yük Simülasyonu",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🔧 Matrix LED far ayarında optik lüksmetre cihazı araç önüne paralel çekilmeli; diyagnostik cihazdan \"Temel Far Ayar Konumu\" açılmadan tornavidayla ayar yapılmaz.",
    "oncedenYapilacaklar": [
      "Aracı tam terazideki düz zemine alıp lastik basınçlarını fabrika değerlerine getir ve yakıt deposunun dolu olduğunu gör",
      "Dijital far ayar cihazını lazer kılavuzuyla far merkezine tam paralel mesafede konumlandır",
      "OBD cihazından Far Kontrol Modülüne (Headlight ECU) bağlanarak farları \"Temel Kalibrasyon Modu\"na al",
      "Kesilme çizgisini (cut-off line) optik ekrandan -%1.0 eğime ayarlayıp ön cam ADAS kamerasıyla dinamik maskelemeyi test et"
    ]
  },
  {
    "id": "insaat_jet_grouting_zemin_iyilestirme_ve_kolon_süreklilik_testi",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "jet grouting zemin iyileştirme",
      "çimento enjeksiyon basıncı 400 bar",
      "jet grout kolon çapı ve boyu",
      "kolon süreklilik basınç dayanım testi",
      "zemin sıvılaşması jet grout"
    ],
    "baslik": "Geoteknik Mühendisliği: Jet Grouting Zemin İyileştirme & Kolon Testi",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Temel Kazısı Öncesinde / Sondaj Aşamasında",
    "hazirlikZamani": "Zemin Etüt Raporu, Çimento Silosu & Yüksek Basınç Pompası",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🏗️ Jet Grout imalatında 400-500 bar yüksek basınçla zemin yırtılarak çimento şerbetiyle karıştırılır; imalat sonrası karot numunesi alınarak 28 günlük basınç dayanımı teyit edilmelidir.",
    "oncedenYapilacaklar": [
      "Zemin profilindeki sıvılaşma derinliğine göre jet grout kolon boyunu ve delgi çapını projeden kontrol et",
      "Çimento/su karışım oranını (W/C: 1.0) ve nozul çekme hızını (cm/dk) enjeksiyon panelinde sabitle",
      "İmalat esnasında yüzeye çıkan geri akış (slurry) çamurunu çevre kirliliğini önlemek için çöktürme havuzuna yönlendir",
      "Prizini alan kolonlardan karot aldırarak tek eksenli basınç dayanımı (UCS) laboratuvar testine gönder"
    ]
  },
  {
    "id": "insaat_artgerme_post_tensioning_halat_germe_ve_enjeksiyon",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "art germe post tensioning beton",
      "çelik halat germe krikosu manometre",
      "art germe uzama elongasyon hesabı",
      "grout enjeksiyonu korozyon önleme",
      "bina döşemesi ard germe gerilme"
    ],
    "baslik": "Statik / Yapı: Ard-Germe (Post-Tensioning) Halat Germe & Grout Enjeksiyonu",
    "ikon": "📐",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Beton Dayanımı %75'e Ulaştığında (3-5. Gün)",
    "hazirlikZamani": "Kalibre Hidrolik Germe Krikosu, Kumpas & Yüksek Mukavemetli Grout Harcı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏗️ Ard-germe çelik halatları gerilirken ölçülen uzama (elongasyon) ile teorik hesap arasındaki fark %7'yi geçemez; germe bitince korozyonu önlemek için kanallara derhal grout enjekte edilir.",
    "oncedenYapilacaklar": [
      "Beton dökümünden alınan erken kırım küp numunelerinin proje transfer mukavemetine (örn. 25 MPa) ulaştığını doğrula",
      "Hidrolik kriko manometresini proje germe kuvvetine (kN) göre ayarla ve her halatın uzama miktarını kumpasla ölç",
      "Uzama paylarını germe protokolüne kaydederek yapı denetim ve statik proje müellifine imzalat",
      "Halat kılıfı (duct) içine hava kabarcığı kalmayacak şekilde çimento esaslı genleşen grout harcını bas ve tapala"
    ]
  },
  {
    "id": "insaat_istinat_duvari_ankraj_ve_inklinometre_deplasman_olcum",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "derin kazı iksa ankraj imalatı",
      "öngermeli geçici zemin ankrajı",
      "inklinometre yatay deplasman okuması",
      "kazı aynası iksa çökme uyarısı",
      "ankraj çekme yükleme testi"
    ],
    "baslik": "Derin Kazı & İksa: Öngermeli Ankraj Testi & İnklinometre Deplasmanı",
    "ikon": "🛡️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Haftalık Periyotlarla ve Her Kademe Kazı Sonrasında",
    "hazirlikZamani": "İnklinometre Probu, Dijital Okuyucu & Ankraj Test Krikosu",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏗️ Derin kazı iksa sistemlerinde inklinometre yatay deplasman artış hızı günde 2 mm'yi veya kümülatif 25 mm'yi aşarsa acil durum alarmı verilmeli ve kazı derhal durdurulmalıdır.",
    "oncedenYapilacaklar": [
      "İnklinometre borusuna probu salarak derinlik boyunca A ve B eksenlerinde yatay sapma değerlerini oku",
      "İmal edilen zemin ankrajlarının %10'una proje yükünün 1.25 katı ile kabul çekme testi uygula",
      "Kuşak kirişleri ve püskürtme beton (shotcrete) yüzeyinde çatlak ve su sızıntısı olup olmadığını denetle",
      "Ölçüm verilerini haftalık İksa Deplasman İzleme Raporu haline getirip belediye ve yapı denetime sun"
    ]
  },
  {
    "id": "insaat_celik_yapi_tork_kontrolu_ve_kaynak_ultrasonik_ndt",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "çelik konstrüksiyon tork kontrolü",
      "10.9 kalite yüksek mukavemetli civata",
      "tork anahtarı kalibrasyon kontrolü",
      "kaynak tahribatsız muayene ndt ultrasonik",
      "manyetik parçacık kaynak testi"
    ],
    "baslik": "Çelik Yapılar: Yüksek Mukavemetli Civata Torku & Ultrasonik Kaynak (NDT)",
    "ikon": "🔩",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Çelik Kolon-Kiriş Montajı Tamamlandığında",
    "hazirlikZamani": "Kalibre Tork Anahtarı, Ultrasonik Kusur Dedektörü (UT) & Jel",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏗️ Çelik yapılarda 8.8 ve 10.9 kalite ön gerilmeli civatalar tork anahtarıyla sıkılmalı; kritik tam penetrasyonlu küt kaynakların %100'ü Ultrasonik (UT) testinden geçmelidir.",
    "oncedenYapilacaklar": [
      "Montajı yapılan birleşim noktalarındaki civataların standart tork değerinde (Nm) sıkıldığını kalibre torkmetre ile test et",
      "Kiriş-kolon alın birleşimlerindeki küt kaynakları cüruf ve pastan temizle",
      "Seviye II sertifikalı NDT uzmanına kaynak dikişlerinde gözenek, çatlak ve nüfuziyetsizlik taraması (UT) yaptır",
      "Tahribatsız Muayene Uygunluk Raporunu çelik montaj kalite kontrol dosyasına ekle"
    ]
  },
  {
    "id": "insaat_yapi_denetim_hakedis_onay_ve_seviye_tespit_tutanagi",
    "category": "resmi",
    "domain": "INSAAT",
    "keywords": [
      "yapı denetim hakediş onayı",
      "yds seviye tespit tutanağı",
      "çevre şehircilik yds sistem girişi",
      "laboratuvar beton demir test raporları",
      "yapı denetim hizmet bedeli hakediş"
    ],
    "baslik": "Yapı Denetim: YDS Seviye Tespit Tutanağı & Hakediş Onayı",
    "ikon": "📋",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Kat Betonu Dökülüp 28 Günlük Kırım Sonuçları Çıktığında",
    "hazirlikZamani": "Laboratuvar Beton-Çelik Çekme Raporları, Şantiye Fotoğrafları & Hakediş İcmali",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏗️ Yapı Denetim Sistemi (YDS) üzerinden hakediş düzenlenebilmesi için ilgili kata ait 28 günlük beton kırım sonuçlarının projede öngörülen karakteristik mukavemeti (fck) sağlaması şarttır.",
    "oncedenYapilacaklar": [
      "Bakanlık lisanslı yapı laboratuvarından gelen 7 ve 28 günlük basınç dayanımı raporlarını kontrol et",
      "Şantiyede mimari, statik ve mekanik imalatların tamamlanma yüzdesini gösteren Seviye Tespit Tutanağı tanzim et",
      "Fotoğraflı seviye dosyasını Çevre, Şehircilik ve İklim Değişikliği Bakanlığı YDS portalına yükle",
      "İlgili Belediye İmar Müdürlüğüne hakediş dosyasını sevk ederek denetim bedelinin emanet hesabından ödenmesini sağla"
    ]
  },
  {
    "id": "elektrik_yuksek_gerilim_isletme_sorumlulugu_trafo_ve_sf6",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "yg işletme sorumluluğu raporu",
      "34.5 kv trafo sf6 gazlı kesici",
      "trafo yağı delinme gerilimi testi",
      "emo yüksek gerilim işletme belgesi",
      "kesici açma kapama röle testi"
    ],
    "baslik": "Yüksek Gerilim: YG İşletme Sorumluluğu & Trafo Yağı Delinme Testi",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Aylık Rutin Denetim ve Yıllık Bakım Döneminde",
    "hazirlikZamani": "İzole Eldiven (36 kV), Istanka, Topraklama Teçhizatı & Yağ Numune Kabı",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "⚡ EMO mevzuatı gereği 1 kV üzeri tesislere YG İşletme Sorumlusu atanması zorunludur; trafo yağının dielektrik delinme gerilimi minimum 30 kV/2.5 mm üzerinde olmalıdır.",
    "oncedenYapilacaklar": [
      "Trafo hücresindeki SF6 gazlı kesicinin gaz basınç manometresini ve yay kurma mekanizmasını gözle",
      "Trafo tankından alttan numune alarak dielektrik yağ test cihazında delinme dayanımını ölç",
      "Aşırı akım ve toprak koruma rölelerinin (Sekonder Koruma) açma zamanı testlerini kontrol et",
      "YG İşletme Sorumlusu Aylık Denetim Raporunu düzenleyip tesis sahibine ve dağıtım şirketine (EDAŞ) ilet"
    ]
  },
  {
    "id": "elektrik_topraklama_ve_artik_akim_rcd_acma_zamani_olcumu",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "topraklama ölçüm raporu emo",
      "artık akım anahtarı kaçak akım rcd açma",
      "çevrim empedansı loop testi",
      "30 ma hayat koruma kaçak akım testi",
      "tn-s topraklama geçiş direnci"
    ],
    "baslik": "Elektrik Güvenliği: Topraklama Ölçümü & 30mA Kaçak Akım (RCD) Testi",
    "ikon": "🔌",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yıllık Periyodik İSG Denetiminde",
    "hazirlikZamani": "Kalibre Çok Fonksiyonlu Tesisat Test Cihazı (Multifunction Tester) & Problar",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚡ 30 mA kaçak akım koruma şalteri (RCD) anma akımında en geç 300 ms içinde devreyi açmalıdır; yıllık topraklama ölçüm raporu kalibre cihazla EMO üyesi mühendisçe onaylanmalıdır.",
    "oncedenYapilacaklar": [
      "Ana dağıtım panosu ve tali panolarda toprak çevrim empedansını (Loop Impedance) ölç",
      "Tüm priz linyelerindeki 30 mA RCD kaçak akım rölelerine 1x ve 5x test akımı uygulayarak açma süresini (ms) kaydet",
      "Eşpotansiyel bara ile bina metal aksamı, boru ve kolon demirleri arasındaki sürekliliği doğrula",
      "Elektrik Tesislerinde Topraklamalar Yönetmeliğine uygun onaylı Topraklama Ölçüm Raporunu tanzim et"
    ]
  },
  {
    "id": "elektrik_ges_gunes_enerji_santrali_iv_egrisi_ve_termal_dron",
    "category": "is_kariyer",
    "domain": "ENERJI",
    "keywords": [
      "ges i-v eğrisi ölçümü",
      "termal dron fotovoltaik panel denetimi",
      "güneş paneli hotspot sıcak nokta",
      "inverter mppt verimlilik analizi",
      "ges kabul ve performans oranı pr"
    ],
    "baslik": "Yenilenebilir Enerji: GES Panel I-V Eğrisi & Termal Dron Hotspot Taraması",
    "ikon": "☀️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Güneş Işınımı En Az 700 W/m2 Olduğu Öğle Saatlerinde",
    "hazirlikZamani": "I-V Eğrisi Çizici Test Cihazı, Işınım Sensörü & Radyometrik Termal Dron",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚡ Fotovoltaik panellerde 10°C'yi aşan sıcaklık farkları (Hotspot) hücre çatlağı veya bypass diyot arızasını gösterir; I-V eğrisi ile string bazında güç kayıpları tespit edilir.",
    "oncedenYapilacaklar": [
      "Işınım ölçer sensörü panel açısına monte ederek güneş ışımasının stabil olduğunu doğrula",
      "Dizi (String) bağlantılarını DC panosundan ayırıp I-V test cihazıyla açık devre gerilimi (Voc) ve kısa devre akımını (Isc) ölç",
      "Radyometrik termal dron ile santral üzerinde otonom uçuş yaparak arızalı panellerin GPS koordinatlarını çıkar",
      "Santralin Performans Oranını (PR - Performance Ratio) hesaplayarak garanti kapsamındaki modül değişim raporunu hazırla"
    ]
  },
  {
    "id": "elektrik_harmonik_olcumu_ve_aktif_harmonik_filtre_thdv",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "harmonik ölçüm raporu thdv thdi",
      "aktif harmonik filtre ahf",
      "sürücü vfd kaynaklı 5. ve 7. harmonik",
      "nötr iletkeni aşırı ısınma harmonik",
      "enerji kalitesi analizörü class a"
    ],
    "baslik": "Enerji Kalitesi: Harmonik Ölçümü (THD) & Aktif Harmonik Filtre (AHF)",
    "ikon": "📈",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Tesis Tam Yük Altında Çalışırken (7 Günlük Kayıt)",
    "hazirlikZamani": "Class A Enerji Kalitesi Analizörü & Rogowski Akım Probları",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚡ Dağıtım şebekesi yönetmeliğine göre bağlantı noktasındaki Toplam Gerilim Harmonik Bozulması (THDv) %5'i geçemez; aşırı harmonikler trafo ve kompanzasyon kondansatörlerini patlatabilir.",
    "oncedenYapilacaklar": [
      "Enerji analizörünü ana bara akım ve gerilim trafolarına bağlayarak 7 gün boyunca EN 50160 standardında kayıt al",
      "Motor sürücüleri (VFD) ve UPS yüklerinden kaynaklanan 3, 5, 7 ve 11. akım harmoniklerini (THDi) analiz et",
      "Nötr iletkeninden geçen 3. harmonik (Triplen) akımının faz akımını aşıp aşmadığını denetle",
      "Kondansatörleri rezonanstan korumak için harmonik filtreli kompanzasyon veya Aktif Harmonik Filtre (AHF) kapasitesini boyutlandır"
    ]
  },
  {
    "id": "elektrik_jenerator_senkronizasyon_ve_otomatik_transfer_ats",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "otomatik transfer panosu ats",
      "jeneratör şebeke senkronizasyonu",
      "kesintisiz geçiş closed transition",
      "jeneratör yük bankası load bank testi",
      "statik transfer anahtarı sts"
    ],
    "baslik": "Yedek Güç Sistemleri: ATS Transfer Panosu & Senkronizasyon Testi",
    "ikon": "⚙️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Aylık Rutin Yüklü Test / Periyodik Bakım",
    "hazirlikZamani": "Jeneratör Senkronizasyon Kontrol Ünitesi & Yük Bankası (Load Bank)",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚡ Kritik tesislerde ATS şalteri şebeke kesildiğinde en geç 10-15 saniyede jeneratörü devreye almalıdır; motor sağlığı için jeneratör yılda en az bir kez %100 yük bankasında test edilmelidir.",
    "oncedenYapilacaklar": [
      "Şebeke enerjisi kesilerek ATS panosunun jeneratöre otomatik start verme ve yükü aktarma süresini kronometreyle ölç",
      "Çift jeneratörlü sistemlerde frekans, gerilim ve faz açısının sıfır hatayla senkronize olduğunu kontrol et",
      "Dizel motorun yağ basıncı, hararet, akü şarj voltajı ve yakıt seviyesi sensörlerini denetle",
      "Egzozda karbon birikmesini (wet stacking) önlemek için harici Yük Bankası (Load Bank) ile 2 saat %100 yükleme testi yap"
    ]
  },
  {
    "id": "makine_titresim_analizi_ve_rulman_hasar_frekansi_vibrasyon",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "titreşim analizi vibrasyon ölçümü",
      "rulman dış bilezik hasar frekansı bpfo",
      "iso 10816 titreşim şiddeti tablosu",
      "ivmeölçer fft spektrum analizi",
      "kestirimci bakım rulman boşluğu"
    ],
    "baslik": "Kestirimci Bakım: Titreşim (Vibrasyon) Analizi & Rulman Hasar Frekansı",
    "ikon": "⚙️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Aylık Rutin Kestirimci Bakım Rotasında",
    "hazirlikZamani": "Manyetik Tabanlı İvmeölçer (Piezoelektrik Sensör) & FFT Titreşim Cihazı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚙️ ISO 10816 standardına göre elektrik motoru ve pompalarda titreşim hızının (RMS) 4.5 mm/s üzerine çıkması alarm durumudur; FFT spektrumundaki tepe frekansları rulman hasarını gösterir.",
    "oncedenYapilacaklar": [
      "Sensörü rulman yatağına yatay, dikey ve eksenel yönlerde temas ettirerek titreşim hız (mm/s) ve ivme (g) değerlerini kaydet",
      "FFT spektrumunda BPFO (dış bilezik), BPFI (iç bilezik) ve BSF (bilye) hasar frekanslarının pik yapıp yapmadığını incele",
      "Rulman yağlama durumunu ve rezonans riskini kontrol et",
      "Kritik eşiği aşan ekipman için plansız duruşu önlemek amacıyla planlı rulman değişim iş emri aç"
    ]
  },
  {
    "id": "makine_lazerli_mil_eksenel_hizalama_ve_termal_buyume_hesabi",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "lazerli mil hizalama laser alignment",
      "açısal ve paralel eksen kaçıklığı",
      "termal büyüme toleransı şim sacı",
      "yumuşak ayak soft foot testi",
      "motor pompa kaplin ayarı"
    ],
    "baslik": "Mekanik Montaj: Lazerli Kaplin/Mil Hizalama & Yumuşak Ayak (Soft Foot)",
    "ikon": "📏",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Motor/Pompa Revizyonu ve Kaplin Montajında",
    "hazirlikZamani": "Lazerli Mil Hizalama Cihazı, Paslanmaz Şim Seti & Tork Anahtarı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚙️ 3000 d/dk dönen millerde paralel eksen kaçıklığı azami 0.04 mm olmalıdır; motor ayaklarındaki soft foot (yumuşak ayak) giderilmeden yapılan kaplin ayarı vibrasyonu önleyemez.",
    "oncedenYapilacaklar": [
      "Motor ayak cıvatalarını tek tek gevşetip sıkarak komparatör veya lazerle Soft Foot (yumuşak ayak) kontrolü yap",
      "Lazer alıcı ve verici kafalarını kaplinin iki tarafındaki millere sabitleyip mili 360 derece döndür",
      "Yatay ve dikey eksendeki açısal ve paralel kaçıklıkları cihaz ekranından oku",
      "Motor ayakları altına hassas paslanmaz şim sacı yerleştirerek kaçıklığı 0.03 mm toleransı altına indir"
    ]
  },
  {
    "id": "makine_basincli_kap_ve_buhar_kazani_hidrostatik_testi",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "buhar kazanı hidrostatik test",
      "basınçlı kap 1.5 katı test basıncı",
      "emniyet ventili açma basıncı kalibrasyonu",
      "akredite a tipi muayene kuruluşu kazan",
      "kazan kışır ve korozyon kontrolü"
    ],
    "baslik": "Basınçlı Kaplar: Buhar Kazanı Hidrostatik Testi (1.5x İşletme Basıncı)",
    "ikon": "🛢️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yıllık Yasal Periyodik Kontrol Döneminde",
    "hazirlikZamani": "Manuel/Elektrikli Hidrolik Test Pompası, Kalibre Manometre & Kör Flanşlar",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "⚙️ İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği uyarınca buhar kazanları yılda 1 kez işletme basıncının 1.5 katı basınçta hidrostatik teste tabi tutulur.",
    "oncedenYapilacaklar": [
      "Kazanın tüm emniyet ventillerini, seviye şişelerini ve buhar çıkış hatlarını kör flanşla kapat",
      "Kazanı tamamen suyla doldurarak hava tahliye vanasından içerideki tüm havayı boşalt",
      "Hidrolik test pompasıyla basıncı işletme basıncının 1.5 katına çıkartıp 30 dakika boyunca basınç düşüşünü izle",
      "Kaynak dikişleri ve alev-duman borularında sızıntı/deformasyon olmadığını teyit ederek periyodik kontrol raporunu imzalat"
    ]
  },
  {
    "id": "makine_cnc_tezgah_renishaw_ballbar_dairesellik_ve_backlash",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "renishaw ballbar qc20 dairesellik testi",
      "cnc işleme merkezi eksen boşluğu backlash",
      "karelik ve diklik hatası ballbar",
      "vidalı mil aşınma ve interpolasyon",
      "cnc tezgah kalibrasyon raporu"
    ],
    "baslik": "Talaşlı İmalat: CNC Tezgah Renishaw Ballbar & Eksen Boşluğu (Backlash)",
    "ikon": "🗜️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "6 Aylık Tezgah Hassasiyet Bakımı / Çarpma Sonrasında",
    "hazirlikZamani": "Renishaw QC20-W Kablosuz Ballbar Kiti, Manyetik Merkez & Kalibrasyon Yazılımı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚙️ CNC dik işleme merkezlerinde dairesel interpolasyon testi (Ballbar) ile vidalı mil boşlukları (backlash), eksen diklik hataları ve servo kazanç uyumsuzlukları mikron mertebesinde tespit edilir.",
    "oncedenYapilacaklar": [
      "Manyetik merkez kaidesini tezgah tablasına, prob ucunu ise iş mili pensine bağla",
      "Tezgaha 100-150 mm yarıçapında XY, XZ ve YZ düzlemlerinde dairesel hareket G-kodu programını yükle",
      "Test yazılımında dairesellik (circularity) hatasını, eksenler arası diklik açısını ve ters yön boşluklarını analiz et",
      "Tespit edilen boşluk değerlerini CNC kontrol ünitesinin (Fanuc/Siemens) backlash parametrelerine girerek kompanse et"
    ]
  },
  {
    "id": "makine_hidrolik_oransal_valf_ve_servo_valf_lvd_histerezis",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "oransal yön kontrol valfi kalibrasyonu",
      "servo valf histerezis ve lvd geribildirim",
      "hidrolik yağ temizlik sınıfı nas 1638 iso 4406",
      "oransal valf sürücü kartı kazanç ayarı",
      "hidrolik oransal basınç ayarı"
    ],
    "baslik": "Akışkan Gücü: Oransal/Servo Valf Kalibrasyonu & Yağ Kirlilik Sınıfı (NAS 6)",
    "ikon": "💧",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Sistemde Konumlandırma Hatası / Basınç Dalgalanmasında",
    "hazirlikZamani": "LVDT Sinyal Kalibratörü (4-20mA / +/-10V), Lazer Partikül Sayıcı & Osiloskop",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚙️ Oransal ve servo valflerin sorunsuz çalışması için hidrolik yağ kirliliği ISO 4406 16/14/11 (NAS 1638 Sınıf 6) seviyesinden temiz olmalıdır; kirli yağ sürgü sıkışmasına ve kararsızlığa yol açar.",
    "oncedenYapilacaklar": [
      "Lazer partikül sayıcı ile tanktan numune alarak mikron bazında partikül sayımı ve su içeriğini ölç",
      "Oransal valf elektronik sürücü kartının sıfır noktası (Zero/Null) ve kazanç (Gain) potansiyometrelerini ayarla",
      "Sürgü konumu geri bildirim sinyalini (LVDT) referans komutla karşılaştırarak histerezis eğrisini kontrol et",
      "Basınç ve debi rampalarını yumuşatarak hidrolik şokları ve koç darbesini önle"
    ]
  },
  {
    "id": "bilisim_kubernetes_etcd_yedekleme_ve_felaket_kurtarma_dr",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "kubernetes etcd snapshot yedekleme",
      "etcdctl snapshot restore felaket kurtarma",
      "k8s master node disaster recovery",
      "etcd cluster health endpoint kontrolü",
      "kubernetes control plane yedeği"
    ],
    "baslik": "DevOps: Kubernetes etcd Snapshot Yedeği & Felaket Kurtarma (DR)",
    "ikon": "☸️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Her Gün Otomatik CronJob & Cluster Güncellemesi Öncesinde",
    "hazirlikZamani": "Master Node SSH Erişimi, etcd CA/Client Sertifikaları & S3 Bucket",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💻 Kubernetes cluster durumunun tamamı etcd veri tabanında tutulur; snapshot alınmadan yapılan control plane yükseltmeleri cluster'ın tamamen çökmesine neden olabilir.",
    "oncedenYapilacaklar": [
      "Master node üzerinde `etcdctl snapshot save` komutu ile TLS sertifikalarını kullanarak anlık durum yedeği al",
      "Alınan snapshot dosyasının bütünlüğünü `etcdctl snapshot status` komutuyla doğrula",
      "Yedek dosyasını şifreleyerek cluster dışındaki güvenli bir S3 object storage havuzuna arşivle",
      "Felaket anında yeni master node üzerinde `etcdctl snapshot restore` prosedürünü simüle et"
    ]
  },
  {
    "id": "bilisim_oauth2_jwt_token_rotasyonu_ve_jwks_dogrulama",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "jwt token rotasyonu refresh token",
      "jwks public key endpoint doğrulama",
      "oauth2 pkce authorization code flow",
      "jwt replay attack ve token revocation",
      "asimetrik rsa rs256 imza doğrulama"
    ],
    "baslik": "Siber Güvenlik: OAuth 2.0 / OIDC, JWT Token Rotasyonu & JWKS İmzası",
    "ikon": "🔐",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yetkilendirme Mimarisi Geliştirme & Güvenlik Denetiminde",
    "hazirlikZamani": "OpenID Connect Configuration Endpoint, RSA Key Pair & Redis Kara Liste",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "💻 SPA ve mobil uygulamalarda Refresh Token Rotation (RTR) zorunlu tutulmalı; JWT doğrulamaları IdP'nin JWKS endpoint'inden asimetrik RS256 açık anahtarıyla yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Kimlik sağlayıcının (Keycloak/Auth0) `.well-known/jwks.json` endpoint'inden güncel açık anahtarları önbelleğe al",
      "Kullanılan her Refresh Token için tek kullanımlık rotasyon uygula; eski refresh token tekrar kullanılırsa ailenin tüm tokenlarını iptal et",
      "Token içinde issuer (iss), audience (aud) ve expire (exp) iddialarını (claims) sıkı kontrolden geçir",
      "Logout işlemlerinde Access Token'ı kalan süresi kadar Redis üzerinde Revocation List'e (Kara Liste) ekle"
    ]
  },
  {
    "id": "bilisim_postgresql_wal_arsivleme_ve_point_in_time_recovery_pitr",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "postgresql pitr point in time recovery",
      "wal segment arşivleme archive_command",
      "pg_basebackup tam yedek alma",
      "veritabanı belirli bir ana geri dönme",
      "postgresql recovery.signal hedef zaman"
    ],
    "baslik": "Veri Tabanı: PostgreSQL WAL Arşivleme & Point-in-Time Recovery (PITR)",
    "ikon": "🐘",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Haftalık Tam Yedek + Kesintisiz WAL Arşivleme",
    "hazirlikZamani": "pg_basebackup Yedeği, WAL Arşiv Deposu & Test Veri Tabanı Sunucusu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💻 PITR mimarisi ile veri tabanı geçmişteki herhangi bir saniyeye (örn. hatalı DROP TABLE komutundan 1 saniye öncesine) sıfır veri kaybıyla geri döndürülebilir.",
    "oncedenYapilacaklar": [
      "`archive_command` parametresini aktif ederek üretilen 16 MB'lık WAL dosyalarının anında uzak depoya aktarılmasını sağla",
      "Haftalık olarak `pg_basebackup -Ft -z` ile sıkıştırılmış taban yedek al",
      "Geri yükleme senaryosunda taban yedeği açıp `recovery.signal` dosyasına `recovery_target_time` hedefini yaz",
      "PostgreSQL servisini başlatarak WAL kayıtlarının hedeflenen zaman damgasına kadar oynatılmasını izle"
    ]
  },
  {
    "id": "bilisim_ddos_korumasi_rate_limiting_ve_waf_kurali",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "waf kuralı cloudflare rate limiting",
      "ddos saldırısı layer 7 koruma",
      "ip başına istek sınırlama token bucket",
      "sql injection xss waf modsecurity kuralı",
      "bot koruması ve challenge captcha"
    ],
    "baslik": "Siber Savunma: WAF (Web Application Firewall) & Layer-7 Rate Limiting",
    "ikon": "🛡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Saldırı Tespiti / Prodüksiyon Öncesi Güvenlik Sıkılaştırmada",
    "hazirlikZamani": "WAF Yönetim Paneli, Log Analizörü & Rate Limit Konfigürasyon Dosyası",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💻 Layer 7 uygulama katmanı saldırılarına karşı API endpoint'lerinde IP ve Token bazlı Rate Limiting (örn. 100 istek/dakika) ve OWASP Top 10 WAF kuralları aktif edilmelidir.",
    "oncedenYapilacaklar": [
      "Giriş ve ödeme endpoint'lerine IP ve User-Agent bazında agresif Rate Limiting kuralı koy",
      "WAF üzerinde OWASP Core Rule Set (CRS) paketini devreye alarak SQLi ve XSS girişimlerini blokla",
      "Olağandışı trafik artışlarında otomatik Managed Challenge (JS/Captcha) tetikleme seviyesini ayarla",
      "Meşru müşteri trafiğinin etkilenmemesi için CDN ve WAF loglarını gerçek zamanlı analiz et"
    ]
  },
  {
    "id": "bilisim_blue_green_deployment_ve_istio_canary_trafik_bolme",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "canary deployment istio virtualservice",
      "blue green kesintisiz canlıya alma",
      "trafik ağırlıklandırma %90-%10 canarya",
      "prometheus hata oranı rollback tetikleme",
      "argo rollouts k8s canary"
    ],
    "baslik": "Sürekli Dağıtım: İstio Service Mesh ile Canary Deployment & Trafik Bölme",
    "ikon": "🚀",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yeni Sürüm Prodüksiyon Canlıya Alma Aşamasında",
    "hazirlikZamani": "İstio VirtualService, DestinationRule & Prometheus Metrik Panoları",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💻 Canary mimarisiyle yeni sürüm önce trafiğin sadece %10'una açılır; hata oranı (5xx) veya gecikme (p99) eşiği aşarsa sistem kullanıcı fark etmeden saniyede eski sürüme döner.",
    "oncedenYapilacaklar": [
      "İstio VirtualService üzerinde v1 ve v2 podları için ağırlık oranını %90 / %10 olarak ayarla",
      "Yeni sürüm üzerinde HTTP 5xx hata oranı ve yanıt sürelerini Prometheus/Grafana üzerinden 15 dakika izle",
      "Hata oranı %0.1 altında kalırsa trafiği kademeli olarak %25 -> %50 -> %100 seviyesine çıkar",
      "Anomali tespit edilirse Argo Rollouts veya CI/CD boru hattı üzerinden tek tıkla otomatik rollback çalıştır"
    ]
  },
  {
    "id": "insaat_kalip_demir_teslim_donati",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "demir teslim tutanağı",
      "kalıp donatı teslim",
      "paspayı kontrolü",
      "yapı denetim demir vizesi"
    ],
    "baslik": "Kalıp-Donatı Kontrolü & Yapı Denetim Vizesi",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Beton Dökümünden 4 Saat Önce",
    "akilliFisilti": "🏗️ Donatı çapı, aralığı, bindirme boyu ve paspayı kontrol edilip Yapı Denetim onayı alınmadan beton dökülemez.",
    "oncedenYapilacaklar": [
      "Statik projeye göre kolon-kiriş düğüm noktalarındaki etriye sıklaştırmalarını ve çirozları tek tek say",
      "Kiriş ve döşeme donatılarında plastik paspayı elemanlarının (en az 2.5-3 cm) yerleştirildiğini teyit et",
      "Kalıp içi temizliğini (toz, tahta talaşı, tel artıkları) basınçlı hava/su ile yaptır",
      "Yapı Denetim Uygulama Denetçisi ile \"Kalıp ve Donatı İnceleme Tutanağı\"nı ıslak imzayla onayla"
    ]
  },
  {
    "id": "insaat_geoteknik_kazik_süreklilik_pit",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "kazık bütünlük testi",
      "pit testi",
      "pile integrity test",
      "fore kazık süreklilik"
    ],
    "baslik": "Fore Kazık Düşük Şekil Değiştirmeli Bütünlük (PIT) Testi",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Beton Dökümünden 7 Gün Sonra",
    "akilliFisilti": "🏗️ Fore kazıklarda süreklilik, boyun verme veya çatlak kontrolü için PIT ivmeölçer testi uygulanır.",
    "oncedenYapilacaklar": [
      "Test yapılacak fore kazık başını sağlam beton yüzeyine kadar kırıp (kırım başlığı) pürüzsüz taşla",
      "Kazık başına piezoelektrik ivmeölçer sensörü özel vakum macunuyla sabitle",
      "Özel kalibreli el çekici ile dikey darbe uygulayarak yansıyan ses dalgalarının hız ve yansıma profilini kaydet",
      "Kazık boyu, boyun daralması (necking) veya beton süreksizliği anomalilerini geoteknik raporda işaretle"
    ]
  },
  {
    "id": "insaat_su_yalitimi_membran_su_havuzlama",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "su yalıtımı testi",
      "havuzlama testi",
      "bodrum membran su testi",
      "teras su sızdırmazlık"
    ],
    "baslik": "Teras & Islak Hacim 48 Saatlik Su Havuzlama Testi",
    "ikon": "💧",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Seramik Öncesi 48 Saat",
    "akilliFisilti": "🏗️ Membran ve sürme yalıtım sonrası zemin 48 saat suyla doldurularak alt kata sızıntı testi yapılır.",
    "oncedenYapilacaklar": [
      "Gider süzgeçlerini sızdırmaz test tapası ile kapatıp parapet pah bantlarını kontrol et",
      "Alana en az 5-10 cm yüksekliğinde su doldurarak su seviyesini cetvelle işaretle",
      "48 saat boyunca su seviyesindeki buharlaşma harici düşüşü ve alt tavan döşemesindeki nem/damlamayı gözlemle",
      "Sızdırmazlık onay tutanağı imzalanmadan şap ve seramik kaplama imalatına kesinlikle izin verme"
    ]
  },
  {
    "id": "insaat_harita_nivo_plankote_kot",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "plankote ölçümü",
      "nivo kot kontrolü",
      "total station aplikasyon",
      "subasman kotu"
    ],
    "baslik": "Harita Nivo Plankote & Subasman Kot Kontrolü",
    "ikon": "📐",
    "renk": "#FEF08A",
    "varsayilanZaman": "Temel Aplikasyon Aşaması",
    "akilliFisilti": "🏗️ Belediye onaylı mimari projedeki ±0.00 röper kotuna göre subasman ve kazı kotları nivo ile doğrulanır.",
    "oncedenYapilacaklar": [
      "Belediye poligon noktasından şantiye sabit röper noktasına nivo ile kot taşıma okuması yap",
      "Temel hafriyat derinliğinin ve grobeton üst kotunun projeyle milimetrik uyumunu mira ile kontrol et",
      "Subasman perdesi dökülmeden önce köşe kazıkları Total Station ile aplike et",
      "İmar Müdürlüğü \"Subasman Vizesi\" için resmi aplikasyon krokisini dosyaya ekle"
    ]
  },
  {
    "id": "insaat_yangin_kapi_manson_yangin_durdurucu",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "yangın durdurucu harç",
      "yangın manşonu",
      "şaft yangın yalıtımı",
      "yangın kapısı panik bar"
    ],
    "baslik": "Mekanik/Elektrik Şaft Yangın Durdurucu İzolasyon",
    "ikon": "🔥",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İç Tesisat Tamamlanınca",
    "akilliFisilti": "🏗️ Kat geçişlerindeki boru ve kablo şaftları EI 120 sınıfı intümesan yangın durdurucu harç ve manşonla kapatılır.",
    "oncedenYapilacaklar": [
      "Plastik boru geçişlerine yangın anında genleşerek deliği tıkayan intümesan yangın manşonlarını tak",
      "Kablo tavası ve busbar kat geçiş boşluklarını 120 dakika yangına dayanıklı mineral taşyünü ve yangın macunu ile doldur",
      "Yangın kaçış merdiveni kapılarının duman sızdırmaz contalarını ve panik bar kilit mekanizmasını test et",
      "İtfaiye yangın uygunluk raporu için kullanılan yangın durdurucu malzemelerin CE ve TSE test sertifikalarını arşivle"
    ]
  },
  {
    "id": "elektrik_scada_rtu_haberlesme_iec60870",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "scada rtu",
      "iec 60870-5-104",
      "trafo scada haberleşme",
      "modbus rtu tcp",
      "fider uzaktan açma"
    ],
    "baslik": "SCADA RTU & IEC 60870-5-104 Haberleşme Testi",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Devreye Alma / Bakım",
    "akilliFisilti": "⚡ Trafo merkezi fider kesici konumları ve enerji analizör verileri IEC 104 protokolüyle SCADA merkezine aktarılır.",
    "oncedenYapilacaklar": [
      "RTU panosu Ethernet ve RS485 seri port bağlantılarını, polarite ve sonlandırma dirençlerini (120 Ohm) kontrol et",
      "IEC 60870-5-104 konfigürasyon dosyasındaki ASDU adreslerini ve nokta listesi (Single Point, Measured Value) tablosunu doğrula",
      "SCADA ana kumanda merkezinden uzaktan kesici açma/kapama ve durum teyit (telekomut/telesinyal) testini simüle et",
      "Olay sırası kaydı (SOE - Sequence of Events) için GPS/NTP zaman senkronizasyonunun 1 ms hassasiyette olduğunu doğrula"
    ]
  },
  {
    "id": "elektrik_ups_aku_desarj_kapasite_testi",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "ups akü testi",
      "kesintisiz güç kaynağı akü",
      "akü deşarj testi",
      "ups akü empedans"
    ],
    "baslik": "Statik UPS Akü Grubu Yük Altında Deşarj Testi",
    "ikon": "🔋",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yıllık Periyodik Bakım",
    "akilliFisilti": "⚡ UPS akü gruplarında hücre empedans ölçümü ve nominal yükte deşarj testi yapılarak ölü hücreler belirlenir.",
    "oncedenYapilacaklar": [
      "Tüm VRLA akü hücrelerinin açık devre gerilimlerini ve dahili iç dirençlerini (milliOhm) tek tek ölçüp kaydet",
      "UPS’i şebekeden ayırarak sunucu odası/hastane kritik yükünü nominal akü deşarj moduna geçir",
      "Deşarj süresince hücreler arası sıcaklık farklarını ve 10.5V altına erken çöken zayıf hücreleri termal kamerayla tara",
      "Test sonrası akü grubunun şamandıra şarj (float charge) akım ve gerilim seviyesine güvenle döndüğünü teyit et"
    ]
  },
  {
    "id": "elektrik_paratoner_radyoaktif_franklin_olcum",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "paratoner ölçümü",
      "yıldırımdan korunma",
      "franklin çubuğu",
      "paratoner topraklama direnci"
    ],
    "baslik": "Yıldırımdan Korunma & Paratoner Topraklama Ölçümü",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yılda 1 Kez (Nisan-Mayıs)",
    "akilliFisilti": "⚡ ESE aktif paratoner ve yakalama çubuklarının geçiş direnci 10 Ohm altında olmalı ve test klemensinden ölçülmelidir.",
    "oncedenYapilacaklar": [
      "Çatı üstü yakalama ucu ve aktif paratoner başlığının fiziksel korozyon ve gevşeklik kontrolünü yap",
      "Test klemensini açarak iniş iletkenini bina ana topraklama ağından izole et",
      "Meger (Toprak direnci test cihazı) ile kazıklı ölçüm yöntemini uygulayarak direncin < 10 Ohm olduğunu doğrula",
      "Yıldırım darbe sayacını (Lightning Counter) kontrol edip darbe sayısını EMO onaylı test raporuna kaydet"
    ]
  },
  {
    "id": "elektrik_motor_surucu_vfd_parametre",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "vfd parametre ayarı",
      "frekans invertörü",
      "sürücü devreye alma",
      "motor sürücü arıza"
    ],
    "baslik": "Asenkron Motor VFD / Sürücü Devreye Alma",
    "ikon": "⚙️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Montaj Sonrası Test",
    "akilliFisilti": "⚡ Sürücüye motor etiket değerleri (kW, Cosφ, RPM, Akım) girilerek otomatik motor tanıma (Auto-tuning) yapılır.",
    "oncedenYapilacaklar": [
      "Motor etiketindeki nominal voltaj (Yıldız/Üçgen bağlantı), frekans, devir sayısı ve tam yük akımını sürücüye kaydet",
      "Yüksüz durumda otomatik motor tanıma (Stationary/Rotational Auto-Tuning) rutinini çalıştır",
      "Hızlanma (Ramp Up) ve yavaşlama (Ramp Down) sürelerini mekanik atalet ve yük tipine göre ayarla",
      "Aşırı gerilim rejenerasyonunu önlemek için frenleme direnci (Braking Resistor) bağlantısını ve ohm değerini kontrol et"
    ]
  },
  {
    "id": "elektrik_panosu_termografik_termal_kamera",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "pano termal kamera",
      "termografik muayene",
      "şalter aşırı ısınma",
      "kontaktör sıcaklık"
    ],
    "baslik": "Ana Dağıtım Panosu Termografik Muayene & Sıcak Nokta",
    "ikon": "🔥",
    "renk": "#FEE2E2",
    "varsayilanZaman": "En Az %50 Yük Altında",
    "akilliFisilti": "⚡ Şalter, bara ve klemens bağlantılarındaki gevşeklik veya faz dengesizliği termal kamera sıcaklık farkıyla tespit edilir.",
    "oncedenYapilacaklar": [
      "Panonun en az %40-50 nominal yük altında çalıştığı puant saatte ölçüm yapıldığını teyit et",
      "Radyometrik termal kamera ile bara ek yerlerini, kompakt şalter giriş-çıkışlarını ve kablo pabuçlarını tara",
      "Ortam sıcaklığına göre ΔT > 15°C olan bağlantı noktalarını \"Acil Torklama / Değişim\" listesine al",
      "Bakım ekibine haber vererek enerjisiz ortamda LOTO kilidi altında pabuç ve cıvata torklamalarını yenilet"
    ]
  },
  {
    "id": "makine_hidrolik_basinc_akümülatör_azot",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "hidrolik akümülatör",
      "azot dolumu",
      "hidrolik basınç dalgalanması",
      "akümülatör ön dolum basıncı"
    ],
    "baslik": "Hidrolik Akümülatör Azot (N₂) Ön Dolum Kontrolü",
    "ikon": "⚙️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "6 Aylık Periyodik Bakım",
    "akilliFisilti": "⚙️ Hidrolik akümülatör diyaframına ASLA oksijen basılmaz; sadece saf Kuru Azot (N₂) gazı doldurulmalıdır.",
    "oncedenYapilacaklar": [
      "Hidrolik sistem ana basıncını sıfırlayarak tahliye vanasından tanka tüm yağı boşalt",
      "Özel azot dolum ve test aparatını (Charging Kit) akümülatör gaz valfine sızdırmaz şekilde bağla",
      "Manometreden okunan azot ön dolum basıncını (P₀) sistem etiket değeriyle (%90 minimum işletme basıncı) karşılaştır",
      "Azot eksikse regülatörlü kuru azot tüpü ile istenen bar seviyesine kadar dolum yap ve sabunlu köpükle sızdırmazlığı sına"
    ]
  },
  {
    "id": "makine_chiller_sogutma_freon_gaz_kacak",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "chiller gaz kaçağı",
      "soğutma kulesi chiller",
      "r134a gaz şarjı",
      "kompresör karter ısıtıcı"
    ],
    "baslik": "Chiller Soğutma Grubu Freon Kaçak & Yağ Asiditesi",
    "ikon": "❄️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Sezon Öncesi / 3 Aylık",
    "akilliFisilti": "⚙️ Chiller vidalı/scroll kompresör karter yağ seviyesi, superheat/subcooling değerleri ve soğutucu akışkan kaçağı izlenir.",
    "oncedenYapilacaklar": [
      "Elektronik halojen gaz kaçak dedektörü ile evaporatör, kondanser boru aynaları ve servis valflerini tara",
      "Kompresör emiş ve basma basınçlarından aşırı kızdırma (Superheat: 5-8K) ve aşırı soğutma (Subcooling: 3-5K) değerlerini hesapla",
      "Kompresör karter gözetleme camından POE sentetik yağın berraklığını incele ve asit test kitiyle asiditesini ölç",
      "Evaporatör su giriş-çıkış fark basıncını ölçerek plakalı/kovanlı eşanjörde kirlilik veya tıkanma olup olmadığını teyit et"
    ]
  },
  {
    "id": "makine_pnomatik_sartlandirici_frl_filtre",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "şartlandırıcı frl",
      "pnömatik filtre regülatör",
      "hava kurutucu çiğ noktası",
      "pnömatik yağlayıcı"
    ],
    "baslik": "Pnömatik FRL Şartlandırıcı & Basınçlı Hava Kurutucu",
    "ikon": "💨",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Haftalık / Aylık Kontrol",
    "akilliFisilti": "⚙️ Pnömatik valf ve pistonların ömrü için basınçlı hava kurutucusu +3°C çiğ noktası (Dew Point) sağlamalıdır.",
    "oncedenYapilacaklar": [
      "FRL şartlandırıcı su tutucu haznesindeki yoğuşma suyunun otomatik tahliye (Auto-drain) ile atıldığını kontrol et",
      "Hava hattı basınç regülatörünü sisteme uygun nominal 6-6.3 bar seviyesine sabitle",
      "Pnömatik yağlayıcı haznesine uygun ISO VG 32 viskoziteli pnömatik yağ ekle ve dakikada 1-2 damla ayarını yap",
      "Basınçlı hava soğutmalı kurutucusunun evaporatör sıcaklığını (+3°C) ve hat sonu partikül filtre kirlilik göstergesini kontrol et"
    ]
  },
  {
    "id": "makine_santrifuj_pompa_kavitasyon_mekanik_salmastra",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "pompa kavitasyon",
      "mekanik salmastra kaçak",
      "santrifüj pompa debi",
      "npsh kontrolü"
    ],
    "baslik": "Santrifüj Pompa NPSH, Kavitasyon & Mekanik Salmastra",
    "ikon": "🔄",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Aylık Muayene",
    "akilliFisilti": "⚙️ Emiş basıncı buharlaşma basıncının altına düşerse kavitasyon (çakıl taşı sesi) başlar ve çarka zarar verir.",
    "oncedenYapilacaklar": [
      "Pompa emiş manometresini ve mevcut NPSH değerinin gerekli NPSHr değerinden en az 0.5-1 metre yüksek olduğunu doğrula",
      "Mekanik salmastra soğutma/yıkama (Plan 11/53) hattındaki sirkülasyonu ve damlama sızıntısını denetle",
      "Pompa yatak gövdesi sıcaklığını (Max 70°C) ve rulman yuvalarındaki eksenel vibrasyonu ölç",
      "Giriş-çıkış diferansiyel basıncından debi-basma yüksekliği eğrisini (Q-H) çıkararak tıkanıklık kontrolü yap"
    ]
  },
  {
    "id": "makine_tavan_vinci_halat_kanca_swl_testi",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "tavan vinci periyodik kontrol",
      "çelik halat tel kopması",
      "vinç aşırı yük sınırlayıcı",
      "kanca emniyet mandalı"
    ],
    "baslik": "Gezer Köprülü Tavan Vinci & 1.25x Yük Testi",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yıllık Periyodik Kontrol",
    "akilliFisilti": "⚙️ Vinç periyodik kontrolünde 1.25 katı statik ve 1.1 katı dinamik yük testi uygulanarak fren kayması test edilir.",
    "oncedenYapilacaklar": [
      "Çelik kaldırma halatında ezilme, korozyon ve adım boyundaki izin verilen tel kopukluğu sayısını (ISO 4309) denetle",
      "Kanca ağız açılmasını kumpasla ölç (Orijinal ölçüye göre %10’dan fazla genişleme varsa kanca ıskartaya ayrılır)",
      "Aşırı yük sınırlayıcının (Load Limiter) nominal kapasitenin %110’unda kaldırmayı kestiğini test et",
      "Üst ve alt kaldırma sınır kesici (Limit Switch) mekanizmalarının ve acil stop butonlarının anında kestiğini doğrula"
    ]
  },
  {
    "id": "bilisim_redis_cluster_failover_bellek",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "redis cluster failover",
      "redis bellek şişmesi",
      "maxmemory allkeys lru",
      "redis sentinel"
    ],
    "baslik": "Redis Cluster Bellek Doluluğu & Otomatik Failover",
    "ikon": "⚡",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Anlık Alert Müdahalesi",
    "akilliFisilti": "💻 Redis bellek doluluğu %85 eşiğini aştığında Maxmemory tahliye politikası ve Sentinel/Cluster sağlığı izlenir.",
    "oncedenYapilacaklar": [
      "`INFO memory` ve `used_memory_rss` ile bellek tüketimini ve fragmantasyon oranını (mem_fragmentation_ratio) kontrol et",
      "Büyük anahtarları tespit etmek için `redis-cli --bigkeys` ve `MEMORY USAGE <key>` komutlarını çalıştır",
      "Master düğüm yanıt vermezse Sentinel veya Raft protokolünün replica düğümü 3-5 saniye içinde Master yaptığını teyit et",
      "Bellek aşımında OOM killer çökmesini önlemek için `maxmemory-policy volatile-lru` veya `allkeys-lru` ayarını doğrula"
    ]
  },
  {
    "id": "bilisim_docker_image_trivy_cve_taramasi",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "docker güvenlik taraması",
      "trivy container scan",
      "cve güvenlik açığı",
      "base image güncelleme"
    ],
    "baslik": "Docker Container İmajı Trivy CVE Güvenlik Taraması",
    "ikon": "🛡️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "CI/CD Pipeline Aşaması",
    "akilliFisilti": "💻 Production container imajlarında CRITICAL ve HIGH seviye CVE güvenlik açığı bulunması build’i durdurmalıdır.",
    "oncedenYapilacaklar": [
      "`trivy image --severity HIGH,CRITICAL <image_name>` komutuyla işletim sistemi paketleri ve bağımlılıkları tara",
      "Root kullanıcısı yerine `USER appuser` tanımlandığını ve multi-stage build ile gereksiz derleme araçlarının atıldığını doğrula",
      "Base image sürümünü güncel minimal alpine veya distroless imaj ile güncelle",
      "Container imajını cosign veya Notary ile dijital olarak imzalayıp şirket özel registry’sine (Harbor/GAR) push et"
    ]
  },
  {
    "id": "bilisim_kafka_consumer_lag_rebalance",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "kafka consumer lag",
      "kafka rebalance",
      "partition consumer gecikmesi",
      "kafka offset commit"
    ],
    "baslik": "Apache Kafka Consumer Group Lag & Rebalance Yönetimi",
    "ikon": "📊",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Kuyruk Şişmesi Anında",
    "akilliFisilti": "💻 Partition başına düşen Consumer Lag arttığında tüketici işlem süreleri ve auto-rebalance fırtınası önlenmelidir.",
    "oncedenYapilacaklar": [
      "`kafka-consumer-groups.sh --describe --group <group_id>` ile partition bazında LAG sayılarını listele",
      "Consumer pod’larının `max.poll.interval.ms` süresini aşarak heartbeat kaybetmesini ve rebalance tetiklemesini engelle",
      "Mesaj işleme süresini düşürmek için veritabanı toplu yazma (Batch Bulk Insert) ve thread pool paralelleştirmesini aç",
      "İşlenemeyen zehirli mesajları (Poison Pill) sonsuz döngüye girmeden Dead Letter Queue (DLQ) topic’ine yönlendir"
    ]
  },
  {
    "id": "bilisim_clickhouse_veritabani_partisyon",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "clickhouse optimizasyon",
      "clickhouse partition pruning",
      "mergetree parçalama",
      "olap sorgu yavaşlığı"
    ],
    "baslik": "ClickHouse MergeTree Partisyon & Sıkıştırma Ayarı",
    "ikon": "💾",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Haftalık / Veri Büyümesi",
    "akilliFisilti": "💻 ClickHouse’ta aşırı küçük partisyonlar (Too many parts) disk I/O ve RAM tüketimini artırır; aylık partisyon tercih edilir.",
    "oncedenYapilacaklar": [
      "`system.parts` tablosundan aktif partisyon sayılarını ve arka plan `OPTIMIZE TABLE ... FINAL` birleşme durumunu incele",
      "PARTITION BY ifadesinde aşırı granüler (günlük yerine aylık `toYYYYMM(event_date)`) partisyonlama kullanıldığını doğrula",
      "Sık kullanılan filtre sütunlarını ORDER BY birincil anahtarına (Primary Key) ekleyerek sparse index verimini artır",
      "ZSTD veya LZ4 sıkıştırma algoritmalarıyla disk boyutunu ve TTL otomatik eski veri silme kurallarını kontrol et"
    ]
  },
  {
    "id": "bilisim_grpc_http2_protobuff_stream",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "grpc microservice",
      "protobuf derleme",
      "http/2 multiplexing",
      "grpc keepalive timeout"
    ],
    "baslik": "gRPC Mikroservis İletişimi, Protobuf & Keepalive",
    "ikon": "🔌",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Servis Entegrasyonu",
    "akilliFisilti": "💻 gRPC servisleri HTTP/2 multiplexing kullanır; yük dengeleyicilerde L7 (gRPC Aware) proxy yapılandırılmalıdır.",
    "oncedenYapilacaklar": [
      "`.proto` arayüz tanımlarında geriye dönük uyumluluk için (Field Tag sıralaması ve Reserved Field) kurallarına uy",
      "gRPC Channel Keepalive parametrelerini (`keepalive_time_ms`, `keepalive_timeout_ms`) yük dengeleyici timeout’u ile eşitle",
      "Client-side Load Balancing için Envoy veya Headless Kubernetes Service DNS yapılandırmasını doğrula",
      "gRPC Interceptor ekleyerek OpenTelemetry Distributed Tracing (Trace ID / Span ID) bağlamını otomatik taşı"
    ]
  },
  {
    "id": "insaat_hazir_beton_slump_vebe_sicaklik",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "beton slump testi",
      "çökme konisi ölçümü",
      "beton döküm sıcaklığı 5-30",
      "betona su katma yasağı"
    ],
    "baslik": "TS EN 12350-2 Taze Beton Slump (Çökme) & Sıcaklık Testi",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Transmikser Şantiye Girişi",
    "akilliFisilti": "🏗️ Şantiyeye gelen transmikserde slump konisiyle çökme ölçülür; miksere ASLA harici su eklenemez.",
    "oncedenYapilacaklar": [
      "Transmikser irsaliyesindeki beton sınıfını (Örn: C30/37), kıvam sınıfını (S3/S4) ve santral çıkış saatini (Max 90-120 dk) kontrol et",
      "Slump konisini 3 kademede 25’er şişleme ile doldurup koniyi kaldırarak çökme miktarını milimetre cinsinden ölç",
      "Daldırma dijital termometre ile taze beton sıcaklığının +5°C ile +30°C arasında olduğunu teyit et",
      "Kıvamı veya sıcaklığı uygun olmayan, su katılmış mikseri tutanak tutarak derhal şantiyeden iade et"
    ]
  },
  {
    "id": "insaat_istinat_duvari_drenaj_barbakan",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "istinat duvarı barbakan borusu",
      "arka dolgu drenaj geotekstil",
      "istinat hidrostatik basınç",
      "topuk drenaj borusu"
    ],
    "baslik": "Betonarme İstinat Duvarı Barbakan & Arka Dolgu Drenajı",
    "ikon": "🧱",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Duvar İmalatı & Dolgu Sırası",
    "akilliFisilti": "🏗️ İstinat duvarı arkasında biriken suyun hidrostatik basıncını sıfırlamak için barbakan ve geotekstilli çakıl drenajı şarttır.",
    "oncedenYapilacaklar": [
      "Duvar gövdesine her 2-3 metrede bir %2-3 dışa eğimli 100 mm çapında PVC barbakan tahliye boruları yerleştir",
      "Duvar arkasına en az 30-50 cm kalınlığında kademeli filtre kırma taş/çakıl dolgusu yap",
      "İnce kil partiküllerinin drenaj çakılını tıkamaması için toprak ile çakıl arasına geotekstil keçe ser",
      "Duvar taban topuğuna delikli (koruge) drenaj borusu döşeyerek suyu ana yağmur suyu hattına tahliye et"
    ]
  },
  {
    "id": "insaat_celik_yapi_kaynak_penetrant_muayene",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "sıvı penetrant testi pt",
      "çelik kaynak dikiş çatlağı",
      "kaynak ndt kontrolü",
      "görsel kaynak muayenesi vt"
    ],
    "baslik": "Çelik Konstrüksiyon Kaynak Sıvı Penetrant (PT) Muayenesi",
    "ikon": "🔥",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kaynak Soğuduktan Sonra",
    "akilliFisilti": "🏗️ Kaynak dikişlerindeki kılcal yüzey çatlakları ve gözenekler kırmızı penetrant ve beyaz geliştirici sprey ile saptanır.",
    "oncedenYapilacaklar": [
      "Kaynak yüzeyindeki curuf, yağ ve pası tel fırça ve Cleaner sprey ile tamamen temizleyip kurut",
      "Kırmızı renkli Penetrant sıvısını kaynak dikişine püskürtüp 15-20 dakika nüfuz etmesini bekle",
      "Yüzeydeki fazla penetrantı tüy bırakmayan bezle temizleyip beyaz renkli Developer (Geliştirici) spreyi sık",
      "10-30 dakika içinde beyaz zemin üzerinde beliren kırmızı kılcal çatlak indikasyonlarını NDT Seviye II raporuna işle"
    ]
  },
  {
    "id": "insaat_alcipan_asma_tavan_sismik_askı",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "alçıpan asma tavan sismik askı",
      "tc profili askı teli aralığı",
      "asma tavan yük taşıma",
      "yangına dayanıklı alçıpan"
    ],
    "baslik": "Alçıpan Asma Tavan Sismik Askı & Karkas İmalat Muayenesi",
    "ikon": "📐",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Alçıpan Kapama Öncesi",
    "akilliFisilti": "🏗️ Asma tavan ana taşıyıcı askı çubukları en fazla 90-100 cm aralıkla çelik dübelle tavana sabitlenir.",
    "oncedenYapilacaklar": [
      "Ana taşıyıcı ve tali TC profillerinin aks aralıklarının (60x60 veya 40x120 cm) projeye uygunluğunu lazer metreyle kontrol et",
      "Tavan askı tellerinin ucunda çelik dübel kullanıldığını (plastik dübel kesinlikle yasaktır) teyit et",
      "Deprem anında salınımı engellemek için her 4 metrede bir 45° açılı çapraz sismik askı tijleri monte et",
      "Havalandırma menfezleri ve ağır aydınlatma armatürlerinin asma tavana değil, bağımsız askılarla döşemeye bağlandığını doğrula"
    ]
  },
  {
    "id": "insaat_gecici_kabul_eksiklik_listesi_snagging",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "şantiye geçici kabul komisyonu",
      "snagging eksiklik listesi",
      "hakediş teminat kesintisi",
      "yapı kullanım izin belgesi iskan"
    ],
    "baslik": "Kamu/Özel Şantiye Geçici Kabul Heyeti & Eksik İmalat (Snagging)",
    "ikon": "📋",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İnşaat Tamamlanma Aşaması",
    "akilliFisilti": "🏗️ Geçici kabulde yapının güvenliğini engellemeyen küçük kusurlar için yükleniciye en fazla 30-60 gün süre verilir.",
    "oncedenYapilacaklar": [
      "İşveren, müşavir ve müteahhit teknik heyetinden oluşan \"Geçici Kabul Komisyonu\"nu sahada topla",
      "Tüm mekanik, elektrik ve mimari imalatları mahal listesi üzerinden oda oda gezerek fotoğraflı Snag List (Eksiklik Listesi) çıkar",
      "İskan (Yapı Kullanım İzin Belgesi) için SGK ilişiksizlik belgesi ve itfaiye/sığınak onaylarını dosyala",
      "Eksikliklerin giderilmesi süresince kesin teminat mektubunu blokede tutarak Geçici Kabul Tutanağını şerhli imzala"
    ]
  },
  {
    "id": "elektrik_busbar_ek_noktasi_tork_kontrolu",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "busbar tork kontrolü",
      "busbar çift başlı cıvata",
      "busbar izolasyon direnci megger",
      "akım taşıma kapasitesi busbar"
    ],
    "baslik": "Busbar Dağıtım Kanalı Ek Noktası Tork & Meger Testi",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Enerjilendirme Öncesi Test",
    "akilliFisilti": "⚡ Busbar ek noktalarında tork cıvatasının üst kafası koparılmalı ve 1000V DC Meger izolasyon testi yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Busbar ek bloklarındaki çift başlıklı tork cıvatalarını özel lokma anahtarıyla dış kafa kopana kadar (Tork: 50-60 Nm) sık",
      "Enerji verilmeden önce faz-faz ve faz-toprak arası 1000V İzolasyon Direncinin (en az > 100 MegaOhm) olduğunu doğrula",
      "Dilatasyon geçişlerinde esnek genleşme elemanlarının (Flexible Expansion) doğru monte edildiğini kontrol et",
      "Yük altında ilk 24 saat içinde termal kamera ile ek bloklarında aşırı ısınma (Hotspot) taraması yap"
    ]
  },
  {
    "id": "elektrik_jenerator_senkronizasyon_kosullari",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "jeneratör senkronizasyon şartları",
      "senkronoskop lambaları",
      "frekans gerilim faz açısı",
      "otomatik yük paylaşımı deif"
    ],
    "baslik": "Çoklu Dizel Jeneratör Paralelleme & Senkronizasyon Testi",
    "ikon": "⚡",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Devreye Alma / 6 Aylık Test",
    "akilliFisilti": "⚡ Jeneratörlerin paralel bağlanabilmesi için Gerilim, Frekans, Faz Sırası ve Faz Açısı birebir eşit olmalıdır.",
    "oncedenYapilacaklar": [
      "Senkronizasyon kontrol ünitesinde (Örn: ComAp, Dief, Woodward) gerilim farkının < %1, frekans farkının < 0.1 Hz olduğunu ayarla",
      "Senkronoskop ve faz sırası göstergesinin saat 12 yönünde (0° açı) kapama komutu verdiğini test et",
      "Yük bankası bağlanarak jeneratörler arasında aktif (kW) ve reaktif (kVAR) yük paylaşımının orantılı yapıldığını doğrula",
      "Bir jeneratör devreden çıktığında diğerinin kritik yükü taşımaya devam ettiğini (Blackout engelleme) sına"
    ]
  },
  {
    "id": "elektrik_trafo_buchholz_rolesi_gaz_alarm",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "buchholz rölesi açma",
      "trafo gaz birikmesi",
      "trafo basınç tahliye valfi",
      "buchholz açma trip"
    ],
    "baslik": "Yağlı Güç Trafosu Buchholz Rölesi Gaz & Açma Analizi",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Röle Alarmı Anında",
    "akilliFisilti": "⚡ Buchholz rölesi açma (Trip) verdiğinde trafoya ASLA tekrar enerji verilmez; yağda çözünmüş gaz analizi (DGA) yapılır.",
    "oncedenYapilacaklar": [
      "Buchholz rölesinin gözetleme camından gazın rengini ve miktarını incele (Yanıcı gaz ark göstergesidir)",
      "Röle üst test vanasından özel şırınga ile gaz numunesi alıp alev alma testi ve laboratuvar kromatografi analizi yap",
      "Trafonun sargı izolasyon direncini ve DC sargı direncini ölçerek sargı kısa devresi olup olmadığını belirle",
      "Hermetik/genleşme depolu trafonun yağ seviyesi ve silikajel (nem alıcı) renk değişimini kontrol et"
    ]
  },
  {
    "id": "elektrik_otomasyon_plc_analog_kalibrasyon_4_20ma",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "plc analog giriş kalibrasyonu",
      "4-20ma akım döngüsü loop",
      "hart transmitter kalibrasyon",
      "0-10v analog ölçekleme"
    ],
    "baslik": "PLC Analog Giriş (4-20 mA / 0-10V) Sinyal Kalibrasyonu",
    "ikon": "⚙️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Sensör Montajı / Yıllık Ayar",
    "akilliFisilti": "⚡ 4-20 mA akım döngüsünde 4 mA altı (örneğin 3.6 mA) kablo kopukluğu alarmı olarak PLC tarafından algılanır.",
    "oncedenYapilacaklar": [
      "Proses kalibratörü (Fluke Loop Calibrator) ile transmitter yerine 4 mA, 12 mA ve 20 mA test akımları enjekte et",
      "PLC yazılımındaki analog ölçekleme bloğunun (Scale / Unscale) mühendislik birimini (Bar, °C, m³/h) %0.1 hassasiyetle okuduğunu doğrula",
      "Sinyal kablolarının blendaj (Shield) topraklamasının sadece tek taraftan panoda toprak barasına bağlandığını teyit et",
      "Transmitter üzerindeki HART protokolü ile sıfır (Zero) ve aralık (Span) değerlerini proses sınırlarıyla eşleştir"
    ]
  },
  {
    "id": "elektrik_kompanzasyon_svc_tristor_kondansator",
    "category": "is_kariyer",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "tristörlü kompanzasyon",
      "hızlı değişen yükler svc",
      "reaktif ceza önleme",
      "endüktif kapasitif oran"
    ],
    "baslik": "Tristörlü Dinamik Kompanzasyon & SVC Şönt Reaktör Ayarı",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık Sayaç Takibi",
    "akilliFisilti": "⚡ Hızlı devreye giren vinç ve punto kaynak makinelerinde tristör anahtarlamalı kompanzasyon ile sıfır ceza sağlanır.",
    "oncedenYapilacaklar": [
      "Elektrik sayacından Endüktif Reaktif (< %20) ve Kapasitif Reaktif (< %15) tüketim oranlarını günlük logla",
      "Kondansatör kademelerinin akım değerlerini pensampermetre ile ölçerek kapasite kaybı yaşayan tüpleri yenile",
      "SVC sürücüsü üzerinden şönt reaktörlerin yük durumuna göre 20 milisaniyede dinamik olarak devreye girdiğini kontrol et",
      "Harmonik filtreli reaktörlerin (189 Hz / %7 p faktörü) rezonansı engellediğini ve aşırı ısınmadığını doğrula"
    ]
  },
  {
    "id": "makine_vidali_kompresor_yag_seviye_filtre",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "vidalı kompresör bakımı",
      "seperatör filtre değişimi",
      "kompresör vida bloğu sıcaklığı",
      "kompresör yağ filtresi"
    ],
    "baslik": "Endüstriyel Vidalı Kompresör 2000/4000 Saatlik Bakımı",
    "ikon": "💨",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Çalışma Saati Esaslı",
    "akilliFisilti": "⚙️ Kompresör vida bloğu yağlama yağı ve separatör filtresi vaktinde değiştirilmezse aşırı hararetle kilitlenir.",
    "oncedenYapilacaklar": [
      "Kompresörü durdurup iç basıncın tamamen sıfırlandığını manometreden teyit ettikten sonra emniyet kilidini al",
      "Hava/yağ separatör filtresini, yağ filtresini ve panel hava emiş filtresini yenileriyle değiştir",
      "Kompresör vida bloğuna özel sentetik kompresör yağı doldur ve yağ seviye camının ortasında olduğunu kontrol et",
      "Minimum basınç çekvalfi, termostatik valf ve emiş regülatörü oringlerini yağlayarak montajı tamamla"
    ]
  },
  {
    "id": "makine_esneme_koruk_kompansator_boru",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "boru kompansatör montajı",
      "metal körüklü genleşme parçası",
      "boru termal uzama hesabı",
      "sabit mesnet kayar mesnet"
    ],
    "baslik": "Boru Hatlarında Eksenel Kompansatör & Sabit Mesnet Kontrolü",
    "ikon": "🔧",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Hat Montajı & Test",
    "akilliFisilti": "⚙️ Sıcak su ve buhar hatlarında kompansatörün doğru çalışması için iki tarafına rijit Sabit Mesnet konulmalıdır.",
    "oncedenYapilacaklar": [
      "Akışkan sıcaklığına göre boru hattının lineer termal uzama miktarını (ΔL = L x α x ΔT) hesapla",
      "Kompansatörün üzerindeki akış yönü okunun hat akışıyla aynı yöne baktığını doğrula",
      "Kompansatörün her iki yanındaki ilk kayar mesnetlerin boru çapının 4 katı ve 14 katı mesafeye yerleştirildiğini kontrol et",
      "Test basıncında körüğün aşırı açılmasını önleyen montaj rotlarını (Tie-rod) işletmeye almadan önce sök veya ayarla"
    ]
  },
  {
    "id": "makine_sogutma_kulesi_lejyonella_biyosit",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "soğutma kulesi bakımı",
      "lejyonella analizi su",
      "biyosit klorlama soğutma",
      "damla tutucu drift eliminator"
    ],
    "baslik": "Açık Devre Soğutma Kulesi Lejyonella Önleme & Biyosit Dozajı",
    "ikon": "❄️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Aylık Su Analizi & Klorlama",
    "akilliFisilti": "⚙️ Soğutma kulelerinde Legionella pneumophila bakterisine karşı sürekli biyosit dozajı ve damla tutucu kontrolü şarttır.",
    "oncedenYapilacaklar": [
      "Havuz suyundan steril numune alarak akredite laboratuvarda Legionella bakteri sayımı (< 1000 CFU/L) yaptır",
      "Otomatik iletkenlik blöf sistemi ile kule suyu konsantrasyon katsayısını (Cycles of Concentration) 3-5 aralığında tut",
      "Kule dolgu peteklerindeki kireç ve biyofilm birikintilerini basınçlı suyla temizle",
      "Damla tutucuların (Drift Eliminator) sağlamlığını kontrol ederek çevreye su zerreciği saçılmasını engelle"
    ]
  },
  {
    "id": "makine_konveyor_bant_kaymasi_gergi_tamburu",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "konveyör bant kayması",
      "gergi tamburu ayarı",
      "bant sıyırıcı scraper",
      "konveyör acil stop halatı"
    ],
    "baslik": "Endüstriyel Konveyör Bant Hizalama & Gergi Tamburu Ayarı",
    "ikon": "🔄",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Haftalık Muayene",
    "akilliFisilti": "⚙️ Konveyör bant kaydığı yöndeki avara rulo açısı ileri alınarak veya gergi cıvatalarıyla merkezlenir.",
    "oncedenYapilacaklar": [
      "Konveyör boyunca uzanan Acil İpli Çekme Anahtarının (Pull-Cord Switch) anında motoru kestiğini test et",
      "Kuyruk tamburundaki mekanik/hidrolik gergi vidalarını her iki tarafta eşit torkla sıkarak bant sarkmasını önle",
      "Bant temizleme sıyırıcısının (Primer Scraper) poliüretan bıçağını aşınmaya karşı kontrol edip baskısını ayarla",
      "Bant ek yerindeki vulkanize veya mekanik kilitlerin açılma yapmadığını görsel olarak denetle"
    ]
  },
  {
    "id": "makine_buhar_kondanstopu_termik_kacak_testi",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "buhar kapanı kondenstop testi",
      "termodinamik kondenstop kaçak",
      "ultrasonik kondenstop muayenesi",
      "buhar kaçağı enerji kaybı"
    ],
    "baslik": "Buhar Kapanı (Kondenstop) Ultrasonik Kaçak Muayenesi",
    "ikon": "♨️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "3 Aylık Enerji Verimliliği Taraması",
    "akilliFisilti": "⚙️ Arızalı açık kalan kondenstop canlı buharı kondens hattına kaçırarak devasa yakıt israfına yol açar.",
    "oncedenYapilacaklar": [
      "Ultrasonik dinleme cihazının temas probunu kondenstop gövdesine dokundurarak açma-kapama ses ritmini dinle",
      "Termal kamera ile giriş ve çıkış sıcaklık farkını (ΔT) ölç (Giriş ile çıkış aynı yüksek sıcaklıktaysa buhar kaçağı vardır)",
      "Termodinamik disk veya şamandıralı mekanizmayı söküp pislik tutucu filtresini temizle",
      "Kaçıran veya tıkalı kalan kondenstopları etiketleyerek \"Acil Değişim / Tamir Kiti Listesi\"ne al"
    ]
  },
  {
    "id": "bilisim_vault_hashicorp_secret_rotation",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "hashicorp vault secret rotation",
      "dinamik veritabanı şifresi",
      "vault approle authentication",
      "api token rotasyonu"
    ],
    "baslik": "HashiCorp Vault ile Otomatik Secret Rotasyonu",
    "ikon": "🔐",
    "renk": "#E0F2FE",
    "varsayilanZaman": "30/90 Günlük Otomatik Döngü",
    "akilliFisilti": "💻 Production veritabanı şifreleri ve API anahtarları Vault dynamic secrets motoruyla otomatik döndürülür.",
    "oncedenYapilacaklar": [
      "Vault üzerinde Database Secrets Engine yapılandırmasını ve TTL sürelerini (Örn: 1 saatlik dinamik kullanıcı) kontrol et",
      "Kubernetes pod’larının Vault Agent Sidecar veya CSI Driver ile şifreleri belleğe enjekte ettiğini doğrula",
      "Kök yetkili anahtarları (Unseal Keys) Shamir Secret Sharing yöntemiyle 3 farklı sistem yöneticisine dağıt",
      "Rotasyon sonrası eski tokenların geçersiz kılındığını ve uygulamanın yeni şifreyle kesintisiz bağlandığını izle"
    ]
  },
  {
    "id": "bilisim_opensearch_elastic_ilm_index_lifecycle",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "elasticsearch ilm politikası",
      "opensearch index lifecycle",
      "hot warm cold tier",
      "index rollover sharding"
    ],
    "baslik": "Elasticsearch / OpenSearch İndeks Yaşam Döngüsü (ILM)",
    "ikon": "🔍",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Haftalık / Boyut Aşımı",
    "akilliFisilti": "💻 Log indeksleri 50 GB veya 30 günü aştığında Rollover ile Warm/Cold katmanlara taşınıp disk maliyeti düşürülür.",
    "oncedenYapilacaklar": [
      "Hot tier indekslerinin shard boyutlarının ideal 30-50 GB aralığında tutulduğunu `_cat/shards` ile denetle",
      "ILM politikasında 7 günden eski indekslerin Warm düğümlere taşınmasını ve replica sayısının 1’e indirilmesini ayarla",
      "30 günden eski indeksleri `read_only` yaparak force-merge (1 segment) çalıştır ve Cold S3 snapshot deposuna taşı",
      "Disk doluluğu %85 (watermark low) ve %90 (watermark high) eşiklerini geçmeden otomatik retention kurallarını doğrula"
    ]
  },
  {
    "id": "bilisim_zero_trust_mfa_saml_okta",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "zero trust erişim politikası",
      "okta saml sso yapılandırma",
      "mfa fido2 webauthn",
      "koşullu erişim conditional access"
    ],
    "baslik": "Zero-Trust Mimarisi, SAML 2.0 SSO & FIDO2/WebAuthn",
    "ikon": "🛡️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Kimlik ve Erişim Yönetimi (IAM)",
    "akilliFisilti": "💻 Asla güvenme, her zaman doğrula: Şirket içi ağda dahi donanım anahtarlı (FIDO2) MFA zorunlu tutulmalıdır.",
    "oncedenYapilacaklar": [
      "IdP (Okta/Azure AD) üzerinden uygulamaya özel SAML 2.0 / OIDC entegrasyon metadata XML’ini bağla",
      "SMS tabanlı güvensiz 2FA yerine donanım anahtarı (YubiKey) veya Authenticator Push bildirimini zorunlu kıl",
      "Koşullu Erişim (Conditional Access) kurallarıyla şirket dışı veya uyumsuz cihazlardan girişte VPN ve cihaz sertifikası iste",
      "İlişiği kesilen personelin tek tıkla SCIM protokolü üzerinden tüm SaaS araçlarından yetkilerinin anında düşmesini sağla"
    ]
  },
  {
    "id": "bilisim_nginx_ingress_ssl_letsencrypt_certmanager",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "cert-manager letsencrypt",
      "ssl sertifikası otomatik yenileme",
      "nginx ingress tls",
      "http01 challenge acme"
    ],
    "baslik": "Kubernetes Cert-Manager & Let’s Encrypt Otomatik TLS",
    "ikon": "🔒",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Sertifika Bitişine 30 Gün Kala",
    "akilliFisilti": "💻 TLS sertifikaları Cert-Manager ACME HTTP-01 / DNS-01 challenge ile 60. günde otomatik yenilenmelidir.",
    "oncedenYapilacaklar": [
      "`kubectl get certificate` komutuyla sertifikanın `READY=True` durumunu ve kalan geçerlilik gün sayısını kontrol et",
      "ClusterIssuer kaynağındaki Let’s Encrypt production API adresini ve ACME e-posta bildirimini doğrula",
      "Nginx Ingress annotations altına `cert-manager.io/cluster-issuer` etiketini ekle",
      "Yenilenen TLS secret’ının ingress controller tarafından pod yeniden başlatılmadan sıcak yüklendiğini test et"
    ]
  },
  {
    "id": "bilisim_prometheus_alertmanager_oncall_pagerduty",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "prometheus alertmanager kuralı",
      "pagerduty nöbet alarmı",
      "slo sli hata bütçesi",
      "grafana alert route"
    ],
    "baslik": "Prometheus Alertmanager & PagerDuty Nöbetçi Alarm Rotası",
    "ikon": "🚨",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Sistem Alert Tetiklenmesi",
    "akilliFisilti": "💻 Kritik servislerde 5 dakikalık hata bütçesi (SLO) aşımında nöbetçi mühendisin telefonu otomatik aranır.",
    "oncedenYapilacaklar": [
      "PromQL ile `rate(http_requests_total{status=~\"5..\"}[5m])` sorgusu üzerinden hata oranı kuralını (%1 üzeri) tanımla",
      "Alertmanager `routes` ve `inhibit_rules` ile ana veritabanı çöktüğünde yüzlerce alt mikroservis alarm gürültüsünü filtrele",
      "PagerDuty / Opsgenie webhook entegrasyonu ile çağrı eskalasyon politikasını (1. Mühendis -> 2. Mühendis -> Yönetici) kur",
      "Tatbikat amacıyla haftalık sahte kritik alarm (Synthetic Alert) göndererek alarm zincirini test et"
    ]
  },
  {
    "id": "insaat_zemin_sikisma_proctor_nukleer_troxler",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "proctor sıkışma testi",
      "troxler nükleer yoğunluk ölçer",
      "dolgu zemin %95 modifiye proctor",
      "optimum su içeriği dolgu"
    ],
    "baslik": "Zemin Dolgusu Modifiye Proctor & Nükleer Yoğunluk (Troxler) Testi",
    "ikon": "🚜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Her 30 cm Dolgu Katmanı Sonrası",
    "akilliFisilti": "🏗️ Karayolu ve temel altı dolgularında sıkışma derecesi en az %95 Modifiye Proctor yoğunluğunu sağlamalıdır.",
    "oncedenYapilacaklar": [
      "Laboratuvar deneyinden dolgu malzemesinin Maksimum Kuru Yoğunluğunu (MKY) ve Optimum Su İçeriğini (wopt) al",
      "Sıkıştırılmış dolgu katmanında kalibre Nükleer Nem-Yoğunluk Ölçer (Troxler) ile yerinde kuru yoğunluğu ölç",
      "Sıkışma derecesi (Kuru Yoğunluk / MKY x 100) %95’in altındaysa silindirle kompaksiyonu tekrarlat veya nem takviyesi yap",
      "Geoteknik kontrol mühendisi onaylı \"Dolgu Sıkışma Test Tutanağı\" imzalanmadan bir sonraki tabaka serimine izin verme"
    ]
  },
  {
    "id": "insaat_epoksi_zemin_nem_testi_kalsiyum_klorur",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "epoksi öncesi beton nemi",
      "kalsiyum klorür nem testi astm f1869",
      "beton nem oranı max %4",
      "epoksi kabarma delaminasyon"
    ],
    "baslik": "Endüstriyel Epoksi Zemin Kaplama Öncesi Beton Nem Testi",
    "ikon": "🧪",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Epoksi Astarı Öncesi",
    "akilliFisilti": "🏗️ Beton nemi ağırlıkça %4’ün üzerindeyse epoksi kaplama buhar basıncıyla kabarır (Osmotik Blistering); kaplama yapılmaz.",
    "oncedenYapilacaklar": [
      "Beton yüzey sıcaklığını ve ortam çiğ noktası sıcaklığını (Dew Point: en az 3°C fark olmalı) ölç",
      "ASTM F1869 Kalsiyum Klorür nem test kiti veya dijital higrometre ile betonun nem salınım oranını belirle",
      "Nem %4 üzerindeyse epoksi astarı ertele veya neme dayanıklı özel nem bariyeri (Epoxy Moisture Barrier) astarı tercih et",
      "Yüzeydeki şerbet tabakasını (Laittance) elmas uçlu silim makinesi (Shot-blasting) ile pürüzlendirip vakumla temizle"
    ]
  },
  {
    "id": "insaat_prefabrik_kolon_soket_grout_harci",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "prefabrik kolon montajı",
      "kolon soket bağlantısı",
      "rötresiz akıcı grout harcı",
      "prefabrik şakül ayarı"
    ],
    "baslik": "Prefabrik Betonarme Kolon Soket Montajı & Rötresiz Grout",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kolon Dikimi Sırasında",
    "akilliFisilti": "🏗️ Prefabrik kolon soketine yerleştirilip çelik kamalarla şaküle alındıktan sonra C60 yüksek mukavemetli grout dökülür.",
    "oncedenYapilacaklar": [
      "Vinçle indirilen prefabrik kolonun soket taban kotunu ve aks çizgilerini nivo ile kontrol et",
      "Kolonun 4 köşesine çelik ayar kamaları yerleştirerek teodolit/şakül ile düşey doğrultusunu milimetrik hizala",
      "Soket içindeki toz ve yabancı maddeleri basınçlı havayla temizleyip yüzeyi suya doygun hale getir",
      "Kendiliğinden yerleşen rötresiz (Non-shrink) C60 grout harcını hava boşluğu bırakmayacak şekilde sokete doldur"
    ]
  },
  {
    "id": "insaat_cephe_iskele_topraklama_paratoner",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "dış cephe iskele topraklaması",
      "iskele yıldırımdan korunma",
      "iskele topraklama direnci < 5 ohm",
      "cephe iskelesi statik elektrik"
    ],
    "baslik": "Metal Dış Cephe İskelesi Topraklama & Yıldırım Emniyeti",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İskele Kurulumu Biter Bitmez",
    "akilliFisilti": "🏗️ Metal dış cephe iskeleleri yıldırım ve kaçak akım riskine karşı en az iki noktadan topraklama çubuğuna bağlanmalıdır.",
    "oncedenYapilacaklar": [
      "İskelenin her 20 metresinde bir ve köşe noktalardan 50 mm² kesitli bakır örgülü iletkenle ana karkası bağla",
      "Topraklama kazıklarını (Som bakır veya galvaniz çubuk) zemine en az 1.5 metre derinlikte çak",
      "Toprak megeri cihazı ile ölçüm yaparak iskele geçiş direncinin 5 Ohm altında olduğunu doğrula",
      "Elektrik Mühendisleri Odası (EMO) onaylı \"İskele Topraklama Uygunluk Raporu\"nu şantiye İSG panosuna as"
    ]
  },
  {
    "id": "insaat_hakedis_yesil_defter_atase_metraj",
    "category": "finans",
    "domain": "INSAAT",
    "keywords": [
      "şantiye hakediş hazırlama",
      "yeşil defter ataşe metraj",
      "fiyat farkı kararnamesi",
      "kamu ihale hakediş kesintileri"
    ],
    "baslik": "Kamu/Özel Şantiye Aylık Hakediş & Yeşil Defter İcmali",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Ayın Son Günü",
    "akilliFisilti": "🏗️ İmalat ataşmanları ve röleveler Yeşil Deftere işlenir; kümülatif metraj üzerinden hakediş özeti çıkarılır.",
    "oncedenYapilacaklar": [
      "Sahada fiilen tamamlanan imalatların ölçümlerini Yapı Denetim/Müşavir ile ortak ataşe tutanağına bağla",
      "Yeşil Deftere işlenen birim fiyatlı imalat kalemlerini bir önceki hakediş metrajından düşerek cari dönem imalatını bul",
      "TÜİK endekslerine göre resmi Fiyat Farkı (Faktör hesabı) ve stopaj (%3-5), avans, teminat kesintilerini uygula",
      "Hakediş Kapak Sayfasını Şantiye Şefi, Kontrol Amiri ve Harcama Yetkilisine e-İmzalı onaylat"
    ]
  },
  {
    "id": "elk_og_kesici_sf6_gaz_basinc_kacak_testi",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "sf6 gaz basınç kontrolü",
      "orta gerilim kesici sf6 kaçağı",
      "sf6 densimetre 5 bar",
      "og hücresi gaz basınç alarmı"
    ],
    "baslik": "OG SF6 Gazlı Kesici Basınç & Kaçak Denetimi",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Periyodik / Alarm Anı",
    "akilliFisilti": "⚡ SF6 gaz basıncı kritik seviye altına düşerse kesicinin açma-kapama ark söndürme yeteneği kaybolur; derhal hücreyi devre dışı bırakıp tecrit edin.",
    "oncedenYapilacaklar": [
      "Orta gerilim hücresindeki kesici manometre/densimetre değerini (standart 5.0 - 6.0 Bar) kontrol et",
      "Basınç düşümü varsa SF6 gaz kaçak dedektörü (sniffer) veya lazer optik kamera ile flanş ve vana contalarını tara",
      "Kritik kaçak durumunda kesicinin enerjisini uzaktan manevra ile kesip LOTO kilitleme protokolünü uygula",
      "Üretici toleransına göre saf SF6 gaz dolumunu nem ve saflık testi (%99.9) eşliğinde tamamlayıp test protokolü imzala"
    ]
  },
  {
    "id": "elk_harmonik_olcumu_thd_filtre_kompanzasyon",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "thd harmonik ölçümü",
      "harmonik filtre kompanzasyon",
      "thdv thdi sınır aşımı",
      "akım gerilim harmoniği reaktör"
    ],
    "baslik": "Şebeke Harmonik Analizi & Pasif/Aktif Filtre Ayarı",
    "ikon": "📈",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Ölçüm Günü",
    "akilliFisilti": "⚡ THD-V %5 ve THD-I %8 limitlerinin aşılması trafolarda aşırı ısınmaya ve kondansatör patlamalarına yol açar.",
    "oncedenYapilacaklar": [
      "Enerji analizörü ile ana dağıtım panosunda 24 saatlik Class A gerilim (THD-V) ve akım (THD-I) harmonik kaydı al",
      "3., 5., 7. ve 11. tek harmonik bileşenlerin tepe değerlerini IEC 61000-2-4 standart sınırlarıyla kıyasla",
      "Kondansatör grupları önündeki anti-rezonans harmonik filtre reaktörlerinin p faktörünü (%5.67, %7 veya %14) kontrol et",
      "Gerekli noktalara Aktif Harmonik Filtre (AHF) dinamik kompanzasyon entegrasyonu için akım trafosu yön ve oranlarını doğrula"
    ]
  },
  {
    "id": "elk_paratoner_radyoaktif_degisim_eriksson",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "paratoner radyoaktif değişimi",
      "ese erken akış uyarımlı paratoner",
      "yıldırımdan korunma nfc 17 102",
      "paratoner iniş iletkeni testi"
    ],
    "baslik": "Yıldırımdan Korunma & ESE Paratoner Montajı",
    "ikon": "🌩️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Planlı Montaj",
    "akilliFisilti": "⚡ Eski tip radyoaktif (Am-241, Ra-226) paratonerler TAEK/TENMAK mevzuatı gereği lisanslı firmalarca sökülüp ESE tipine dönüştürülmelidir.",
    "oncedenYapilacaklar": [
      "Mevcut çatıda radyoaktif başlık varsa TENMAK lisanslı uzmanlarca söküm ve radyoaktif atık bertaraf protokolünü tanzim et",
      "NFC 17-102 standardına uygun ESE (Erken Akış Uyarımlı) paratoner başlığını koruma yarıçapı hesabına göre dikmeye monte et",
      "İniş iletkeninin (en az 2x50 mm² som bakır) kesintisizliğini ve test klemensini çatı parapetlerinden izole ederek çek",
      "Paratoner topraklama geçiş direncinin 10 Ohm altında olduğunu yüksek frekanslı darbe ölçeriyle teyit edip raporla"
    ]
  },
  {
    "id": "elk_ups_kesintisiz_guc_kaynagi_aku_ic_direnc",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "ups akü iç direnç ölçümü",
      "kesintisiz güç kaynağı deşarj testi",
      "vrla agm akü empedans testi",
      "ups statik bypass testi"
    ],
    "baslik": "UPS Kesintisiz Güç Kaynağı & VRLA Akü Empedans Testi",
    "ikon": "🔋",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıllık Periyodik Bakım",
    "akilliFisilti": "⚡ Dizideki tek bir zayıf akü hücresi tüm UPS sisteminin yük altındayken çökmesine neden olur; iç direnci %25 artan hücreyi değiştirin.",
    "oncedenYapilacaklar": [
      "UPS akü grubundaki her bir 12V VRLA/AGM bloğunun iç direnç (milli-ohm) ve kutup başı gerilimini akü test cihazıyla kaydet",
      "Kritik yükleri korumak için UPS statik bypass hattının çalışabilirliğini ve transfer süresini (<4ms) test et",
      "Yapay yük bankası (Load Bank) bağlayarak %100 nominal güç altında 30 dakikalık kontrollü deşarj eğrisi çıkar",
      "Termal kamera ile akü ara köprü bağlantı torklarını ve aşırı ısınan kutup başlarını kontrol edip rapor hazırla"
    ]
  },
  {
    "id": "elk_exproof_ateks_zone_panosu_gland_sizdirmazlik",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "exproof pano atex zone 1",
      "patlamaya dayanıklı ex-d gland",
      "zone 2 kıvılcım sızdırmazlık",
      "atex sertifikalı kablo rakoru"
    ],
    "baslik": "ATEX / Ex-Proof Pano & Sızdırmaz Kablo Rakoru Montajı",
    "ikon": "🧯",
    "renk": "#FED7AA",
    "varsayilanZaman": "İş Emri Günü",
    "akilliFisilti": "⚡ Zone 1 / Zone 2 patlayıcı ortamlarda kullanılan Ex-d panolarında standart rakor kullanımı patlama bariyerini tamamen geçersiz kılar.",
    "oncedenYapilacaklar": [
      "Patlayıcı ortam tehlike sınıfına (Zone 0/1/2, Gaz Grubu IIA/IIB/IIC, Sıcaklık T3/T4) uygun ATEX sertifikasını doğrula",
      "Kablo girişlerinde sertifikalı Ex-d bariyer tipi zırhlı kablo rakorları ve reçine/epoksi dolgu hamurunu hazırla",
      "Pano kapağının alev sızdırmaz taşlanmış işleme yüzeylerini (flamepath) temizleyip iletken korozyon önleyici gres sür",
      "Topraklama sürekliliğini zırh tutucu pabuçlarla sağlayıp IP66 sızdırmazlık contalarını tork anahtarıyla kapat"
    ]
  },
  {
    "id": "mak_cnc_freze_5eksen_kinematik_kalibrasyon",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "cnc 5 eksen kinematik kalibrasyon",
      "rtcp ballbar testi",
      "cnc dairesellik hatası iso 230",
      "freze iş mili salgı ölçümü"
    ],
    "baslik": "5 Eksen CNC Kinematik & Ballbar Dairesellik Kalibrasyonu",
    "ikon": "⚙️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Haftalık / Hassas İş Öncesi",
    "akilliFisilti": "⚙️ RTCP (Rotational Tool Center Point) sapması mikron düzeyindeki kalıp işleme toleranslarını doğrudan bozar.",
    "oncedenYapilacaklar": [
      "Teleskopik Ballbar cihazını CNC tablaya ve iş miline bağlayarak XY, YZ ve ZX düzlemlerinde ISO 230-4 dairesellik testi yap",
      "A ve C döner eksenlerin dönüş merkez kaçıklığını kinematik prob ve hassas kalibrasyon küresi ile otomatik offsetle",
      "İş mili koniğinin iç salgısını (runout) binde bir mikrometre ve test mastarı ile kontrol et (<3 mikron)",
      "Tüm eksenlerin vidalı mil boşluk (backlash) ve hatve kompanzasyon değerlerini CNC kontrol ünitesine girip onayla"
    ]
  },
  {
    "id": "mak_hidrolik_oransal_valf_lvd_histerezis_ayari",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "hidrolik oransal valf ayarı",
      "proportional valve lvd sıfırlama",
      "hidrolik histerezis rampa ayarı",
      "valf spool sürücü kartı kalibrasyon"
    ],
    "baslik": "Oransal Hidrolik Valf & Sürücü Kartı Sıfırlama Kalibrasyonu",
    "ikon": "🎛️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Devreye Alma / Arıza",
    "akilliFisilti": "⚙️ Oransal sürgü (spool) sıfır geçiş ve histerezis ayarı doğru yapılmazsa hidrolik silindirlerde darbeli ve titreşimli hareket oluşur.",
    "oncedenYapilacaklar": [
      "Valf üzerindeki LVDT konum geribildirim sensörünün sıfır voltaj (0 VDC / 4 mA) mekanik orta pozisyonunu doğrula",
      "Elektronik sürücü kartı üzerinden minimum akım (deadband/bias) ve maksimum kazanç (gain) potanslarını ayarla",
      "Sarsıntısız kalkış ve duruş için hızlanma/yavaşlama rampa sürelerini (ramp up/down) sisteme uyarla",
      "Hidrolik yağ sıcaklığı 45-50°C çalışma bandındayken sistem basınç ve debi tepki eğrilerini osiloskop ile kaydet"
    ]
  },
  {
    "id": "mak_basincli_hava_kurutucu_desikant_cig_noktasi",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "desikant kurutucu çiğ noktası",
      "basınçlı hava dew point -40",
      "adsorpsiyonlu kurutucu silikajel değişimi",
      "hava kurutucu rejenerasyon"
    ],
    "baslik": "Adsorpsiyonlu Hava Kurutucu & Çiğ Noktası (Dew Point) Testi",
    "ikon": "💨",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Periyodik Kontrol",
    "akilliFisilti": "⚙️ Basınçlı hava çiğ noktası (Dew Point) -40°C altına inmezse pnömatik valflerde paslanma ve lazer kesim kafalarında odaklama lensi kirlenir.",
    "oncedenYapilacaklar": [
      "Çıkış hattındaki higrometre/dew-point sensöründen basınçlı hava çiğ noktası değerini (ISO 8573-1 Sınıf 1/2) kontrol et",
      "Desikant kulelerindeki aktif alümina / silikajel dolgusunun doygunluğunu ve kuleler arası geçiş basınç döngüsünü incele",
      "Ön filtre (0.01 mikron) ve son toz tutucu partikül filtrelerinin diferansiyel basınç manometrelerini kontrol et",
      "Rejenerasyon egzoz susturucularının temizliğini ve otomatik tahliye valflerinin kondens atımını doğrula"
    ]
  },
  {
    "id": "mak_kaynakli_imalat_wps_wpqr_kaynak_talimati",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "wps kaynak prosedürü",
      "wpqr kaynak onay testi",
      "asme sec ix en iso 15614",
      "kaynakçı sertifikasyon standardı"
    ],
    "baslik": "Kaynak Prosedürü Şartnamesi (WPS) & WPQR Doğrulaması",
    "ikon": "👨‍🏭",
    "renk": "#FED7AA",
    "varsayilanZaman": "İmalat Öncesi",
    "akilliFisilti": "⚙️ Onaylı bir WPQR olmadan hazırlanan WPS ile yapılan basınçlı kap ve çelik konstrüksiyon kaynakları CE/TÜV denetiminde reddedilir.",
    "oncedenYapilacaklar": [
      "Ana malzeme ve dolgu teli grubuna uygun EN ISO 15614-1 / ASME Sec IX onaylı WPQR test raporunu aç",
      "Akım, gerilim, kaynak hızı, koruyucu gaz debisi ve ön ısıtma/pasolar arası sıcaklık sınırlarını içeren WPS formunu hazırla",
      "İmalata girecek kaynakçıların EN ISO 9606-1 sertifikalarının pozisyon ve malzeme kapsamını denetle",
      "Kaynak sonrası tahribatsız muayene (NDT) planını (VT, UT, RT) kalite kontrol dosyasına bağla"
    ]
  },
  {
    "id": "mak_vibrasyon_spektrum_rulman_hasar_frekansi",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "vibrasyon spektrum analizi rulman",
      "bpfi bpfo kafes frekansı",
      "kestirimci bakım ivmeölçer",
      "rulman zarflama demodülasyon"
    ],
    "baslik": "Kestirimci Bakım: Rulman Hasar Frekansı & Spektrum Analizi",
    "ikon": "📡",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Aylık Ölçüm Rotası",
    "akilliFisilti": "⚙️ BPFO (Dış bilezik) veya BPFI (İç bilezik) tepe noktalarının spektrumda belirmesi rulmanda 2-4 hafta içinde mekanik kilitlenme riski olduğunu gösterir.",
    "oncedenYapilacaklar": [
      "Manyetik piezoelektrik ivmeölçeri yatak yuvasına dik (radyal) ve paralel (eksenel) temas ettirerek titreşim hızı (mm/s RMS) al",
      "Zarfleme (Demodulation/PeakVue) spektrumunda rulmanın BPFO, BPFI, BSF ve FTF arıza karakteristik tepe frekanslarını tara",
      "ISO 10816-3 standart titreşim şiddeti sınır tablosuna göre yatak titreşim seviyesini Sınıf I/II/III kategorisinde değerlendir",
      "Yağlama eksikliği veya hasar ilerlemesi tespit edilirse rulman değişim iş emrini planlı duruş listesine ekle"
    ]
  },
  {
    "id": "it_k8s_hpa_cluster_autoscaling_kaynak_limiti",
    "category": "ev_teknik",
    "domain": "BILISIM",
    "keywords": [
      "k8s hpa autoscaling",
      "kubernetes kaynak limitleri oomkilled",
      "cpu throttling pod scale",
      "cluster autoscaler node havuzu"
    ],
    "baslik": "Kubernetes HPA (Pod Autoscaling) & Kaynak Limit Ayarı",
    "ikon": "☸️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Dağıtım Öncesi",
    "akilliFisilti": "💻 Pod memory limitinin eksik bırakılması node üzerindeki diğer servislerin OOMKilled olmasına yol açar.",
    "oncedenYapilacaklar": [
      "Deployment manifestosunda CPU ve Memory requests/limits değerlerini (QoS Burstable/Guaranteed) tanımla",
      "HorizontalPodAutoscaler (HPA v2) nesnesini CPU %70 ve Memory %80 eşikleri ile min/max replica sınırlarına bağla",
      "Metrik sunucusunun (Metrics Server) Prometheus adapter üzerinden pod metriklerini eksiksiz topladığını doğrula",
      "Node havuzunun otomatik genişlemesi için Cloud Cluster Autoscaler eşiklerini ve max-node kotasını test et"
    ]
  },
  {
    "id": "it_siber_soc_mitre_attck_edr_tehdit_avi",
    "category": "ev_teknik",
    "domain": "BILISIM",
    "keywords": [
      "mitre attck edr tehdit avı",
      "soc analizi lateral movement",
      "powershell zararlı komut edr alert",
      "pass the hash tespit"
    ],
    "baslik": "SOC Tehdit Avı: MITRE ATT&CK & EDR Saldırı İzolasyonu",
    "ikon": "🛡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Acil Alarm Anı",
    "akilliFisilti": "💻 Saldırganın ağda yayılmasını (Lateral Movement) önlemek için şüpheli uç noktayı derhal EDR üzerinden ağdan izole edin.",
    "oncedenYapilacaklar": [
      "EDR konsolundan şüpheli uç noktayı tek tıkla ağ izolasyonuna alarak domain kontrolcüye erişimini kes",
      "MITRE ATT&CK T1059 (Command Line) ve T1550 (Pass the Hash) taktiklerine ait proses ağacı ve bellek dökümünü incele",
      "Kompromize olan kullanıcı hesabının Active Directory oturum biletlerini (Kerberos TGT) iptal edip parolayı sıfırla",
      "C2 (Command & Control) IP ve domain adreslerini şirket firewall ve proxy sınırlarında küresel olarak engelle"
    ]
  },
  {
    "id": "it_postgresql_vacuum_full_bloat_pg_stat_activity",
    "category": "ev_teknik",
    "domain": "BILISIM",
    "keywords": [
      "postgres vacuum full bloat",
      "pg stat activity kilitli sorgu",
      "dead tuples autovacuum ayarı",
      "postgresql tablo şişmesi pg_repack"
    ],
    "baslik": "PostgreSQL Tablo Bloat Temizliği & Autovacuum Optimizasyonu",
    "ikon": "🐘",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Gece Bakım Penceresi",
    "akilliFisilti": "💻 Canlı üretimde VACUUM FULL çalıştırmak tabloyu kilitler (AccessExclusiveLock); çevrimiçi temizlik için pg_repack kullanın.",
    "oncedenYapilacaklar": [
      "pg_stat_user_tables görünümünden n_dead_tup oranı %20'yi aşan şişmiş (bloat) tabloları listele",
      "Uzun süredir çalışan ve vacuum'u engelleyen kilitli sorguları pg_stat_activity üzerinden tespit et",
      "Canlı tablo kilitlenmesini önlemek için pg_repack aracı ile indeks ve tabloları arka planda çevrimiçi yeniden oluştur",
      "postgresql.conf dosyasında autovacuum_vacuum_scale_factor ve autovacuum_vacuum_cost_limit parametrelerini optimize et"
    ]
  },
  {
    "id": "it_jwt_rs256_public_key_rotasyonu_oauth",
    "category": "ev_teknik",
    "domain": "BILISIM",
    "keywords": [
      "jwt rs256 key rotasyonu",
      "jwks oauth public key",
      "token imza anahtarı yenileme",
      "jwks json web key set"
    ],
    "baslik": "OAuth / JWT RS256 Asimetrik Anahtar Rotasyonu & JWKS Güncelleme",
    "ikon": "🔑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Güvenlik Döngüsü",
    "akilliFisilti": "💻 Eski JWT anahtarını kaldırmadan önce yeni anahtarı JWKS dizinine ekleyin; aksi takdirde canlı kullanıcı oturumları anında düşer.",
    "oncedenYapilacaklar": [
      "Yeni 2048-bit RSA anahtar çifti (Private/Public Key) üretip Key Vault üzerinde güvenli sakla",
      "Yeni açık anahtarı (kid parametresi ile) /.well-known/jwks.json endpoint dizinine ikinci anahtar olarak ekle",
      "Auth sunucusunun yeni token imzalama işlemlerini yeni anahtara yönlendirdiğini doğrula",
      "Eski token'ların geçerlilik süresi (TTL: 24 saat) dolduktan sonra eski anahtarı JWKS üzerinden kaldır"
    ]
  },
  {
    "id": "it_cdn_origin_shield_cache_invalidation_purge",
    "category": "ev_teknik",
    "domain": "BILISIM",
    "keywords": [
      "cdn cache purge invalidate",
      "origin shield önbellek temizleme",
      "cloudflare cloudfront cache miss",
      "stale while revalidate cdn"
    ],
    "baslik": "CDN Cache Invalidation (Purge) & Origin Shield Koruma",
    "ikon": "🌐",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Sürüm Dağıtım Sonrası",
    "akilliFisilti": "💻 Toplu Cache Purge (Wildcard /*) işlemi ana sunucuya (Origin) devasa trafik bindirip çökertebilir; Origin Shield ve tag-based purge kullanın.",
    "oncedenYapilacaklar": [
      "Yeni frontend dağıtımı sonrası sürüm hash'ine göre hedefli Cache-Tag / Surrogate-Key purge isteği gönder",
      "Origin Shield katmanının aktif olduğunu ve ana sunucu CPU yükünün %30 altında kaldığını kontrol et",
      "HTTP response başlıklarında Cache-Control: public, max-age=31536000, immutable veya stale-while-revalidate kontrolü yap",
      "Edge sunucuların 200 OK yanıtlarını ve TTFB (Time to First Byte) gecikmelerini küresel izleme ile test et"
    ]
  },
  {
    "id": "insaat_epoksi_zemin_nem_olcum_nem_bariyeri",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "epoksi zemin nem ölçümü %4",
      "kalsiyum karbür nem testi cmit",
      "nem bariyeri astar",
      "epoksi kabarma önleme"
    ],
    "baslik": "Epoksi Zemin Kaplama Öncesi Beton Nem Testi (%4 Sınırı)",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Astar Uygulamasından 24 Saat Önce",
    "akilliFisilti": "🏗️ Beton nemi %4’ün üzerindeyse standart epoksi astar uygulanamaz; kabarmayı önlemek için Nem Bariyeri gerekir.",
    "oncedenYapilacaklar": [
      "Beton döşemenin en az 28 günlük kürlenme süresini tamamladığını şantiye döküm tutanağından teyit et",
      "CMIT (Kalsiyum Karbür Nem Ölçer) veya elektronik beton nem ölçer probu ile zeminde nemin < %4 olduğunu doğrula",
      "Nem %4-6 arasındaysa solventsiz 3 bileşenli Epoksi Nem Bariyeri astarı planla",
      "Zemin pürüzlendirmesini (Shot-Blasting / Elmas Taşlama) tamamlayıp endüstriyel vakumla tozdan tamamen arındır"
    ]
  },
  {
    "id": "insaat_celik_hasir_hasir_donati_bindirme_boyu",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "çelik hasır bindirme boyu",
      "hasır donatı göz aralığı",
      "saha betonu çelik hasır",
      "hasır bindirme en az 2 göz"
    ],
    "baslik": "TS 4559 Çelik Hasır Donatı Yerleşimi & 2 Göz Bindirme",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Saha Betonu Dökümünden Önce",
    "akilliFisilti": "🏗️ Çelik hasır ek yerlerinde çekme kuvvetini aktarabilmek için hasırlar en az 2 göz (30-40 cm) üst üste bindirilir.",
    "oncedenYapilacaklar": [
      "Projeye göre çelik hasır tipini (Örn: Q188, Q221, R335) ve tel çaplarını kumpasla ölç",
      "Ek yerlerinde hasırların en az 2 göz (en az 50xÇap veya 30 cm) bindirildiğini ve tavlı telle bağlandığını denetle",
      "Hasırın toprak/grobeton tabanına yapışmasını önlemek için plastik donatı paspayı sehpalarını (en az 3 cm) yerleştir",
      "Derz kesim yerlerinde donatının sürekliliğini projeye göre derz donatısı (Dowel Bar) ile koordine et"
    ]
  },
  {
    "id": "insaat_cati_sandvic_panel_egim_ve_vida",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "sandviç panel çatı eğimi %7",
      "panel semerli vida montajı",
      "mahya sünger su sızdırmazlık",
      "sandviç panel aşık aralığı"
    ],
    "baslik": "Çatı Sandviç Panel Montajı, Minimum %7 Eğim & Semerli Vida",
    "ikon": "🏠",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Çelik Karkas Üzeri Montaj",
    "akilliFisilti": "🏗️ Sandviç panel çatılarda su sızdırmazlığı için minimum %7 eğim şarttır; vidalar hadve tepesinden semerle atılır.",
    "oncedenYapilacaklar": [
      "Çelik aşık profil aralıklarının (Purlin: 1.5 - 2.0 metre) panel taşıma tablosuna uygunluğunu doğrula",
      "Panellerin boyuna ek yerlerinde rüzgar yönünün tersine binme payı (Overlap) bırakılarak butil bant yapıştırıldığını denetle",
      "Kendinden delmeli EPDM contalı semerli vidaların hadve çukuruna değil, hadve tepesine aşırı sıkılmadan atıldığını kontrol et",
      "Mahya ve parapet birleşimlerinde intümesan sünger ve poliüretan mastik izolasyonunu tamamla"
    ]
  },
  {
    "id": "insaat_grobeton_temel_alti_tesviye_kotu",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "grobeton dökümü c16",
      "temel altı tesviye betonu",
      "grobeton mastar kot kontrolü",
      "membran altı pürüzsüz yüzey"
    ],
    "baslik": "Temel Altı Grobeton (C16/20) Dökümü & Helikopter Perdahlama",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Hafriyat Sonrası / Yalıtım Öncesi",
    "akilliFisilti": "🏗️ Su yalıtım membranının delinmemesi için grobeton yüzeyi pürüzsüz mastarlanmalı ve helikopterle perdahlanmalıdır.",
    "oncedenYapilacaklar": [
      "Temel kazı tabanında gevşek toprak kalmadığını ve silindirle kompaktajın sağlandığını kontrol et",
      "Nivo ile çelik kot kazıkları çakılarak grobeton kalınlığının en az 10-15 cm olmasını ayarla",
      "Dökülen C16/C20 sınıfı grobetonu mastarlayarak yüzey dalgalanmalarını sıfırla",
      "Yüzey sertleştiğinde membran yırtılmalarını önlemek için perdah makinesi (Helikopter) ile tesviye et"
    ]
  },
  {
    "id": "insaat_dilatasyon_derzi_sismik_profil_mastik",
    "category": "is_kariyer",
    "domain": "INSAAT",
    "keywords": [
      "bina dilatasyon derzi 5 cm",
      "sismik dilatasyon profili",
      "yangın bariyeri dilatasyon fitili",
      "poliüretan dilatasyon mastiği"
    ],
    "baslik": "Bina Sismik Dilatasyon Derzi (5-10 cm) & Su/Yangın İzolasyonu",
    "ikon": "🏢",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kaba Yapı Sonrası / Kaplama Aşaması",
    "akilliFisilti": "🏗️ Bloklar arasındaki dilatasyon boşluğuna yangın şiltesi, sızdırmazlık bandı ve hareketli sismik profil monte edilir.",
    "oncedenYapilacaklar": [
      "Statik projede belirtilen dilatasyon aralığının (5-10 cm) kat boyunca kesintisiz devam ettiğini teyit et",
      "Dilatasyon boşluğuna duman ve alev geçişini önleyen EI 120 sınıfı yangın durdurucu dilatasyon fitili (şiltesi) yerleştir",
      "Islak hacim ve dış cephe geçişlerine EPDM genleşme bandı ve çift komponentli poliüretan dilatasyon mastiği uygula",
      "Zemin ve duvar kaplamasında deprem salınımlarını tolere eden alüminyum/kauçuk sismik dilatasyon kapak profilini sabitle"
    ]
  },
  {
    "id": "elektrik_topraklama_direnci_olcum_mevzuat",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "topraklama direnci ölçümü meger",
      "topraklama 1 ohm altı",
      "toroid röle toprak yayılma direnci",
      "tesisat topraklama raporu"
    ],
    "baslik": "Elektrik Tesislerinde Topraklamalar Yönetmeliği & Meger Ölçümü",
    "ikon": "⚡",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Periyodik Yıllık Ölçüm / Devreye Alma",
    "akilliFisilti": "⚡ Topraklama yayılma direnci trafo nötr noktası için < 1 Ω, bina işletme topraklaması için < 2-5 Ω sınırındadır.",
    "oncedenYapilacaklar": [
      "Topraklama megeri (Kazıklı test cihazı) problarını 5-10 metre mesafelerle toprağa çak ve kalibrasyonunu doğrula",
      "Ana eşpotansiyel bara ile koruma iletkenleri arasındaki süreklilik ve geçiş direncini ölç",
      "Artık akım anahtarı (30mA kaçak akım rölesi ve 300mA yangın koruma) açma akım ve milisaniye sürelerini test et",
      "EMO onaylı \"Elektrik İç Tesisleri Topraklama Ölçüm ve Uygunluk Raporu\"nu düzenle"
    ]
  },
  {
    "id": "elektrik_kompanzasyon_reaktif_ceza_oranlari",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "reaktif ceza sınırları %20 %15",
      "reaktif güç kontrol rölesi kademe",
      "kondansatör harmonik filtre reaktörü",
      "endüktif reaktif oran cezası"
    ],
    "baslik": "EPDK Reaktif Enerji Oranları (Endüktif %20 / Kapasitif %15) Takibi",
    "ikon": "⚡",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sayaç Okuma Öncesi / Günlük Rutin",
    "akilliFisilti": "⚡ Reaktif ceza sınırı sözleşme gücü 50 kVA üstü abonelerde Endüktif %20, Kapasitif %15 olarak denetlenir.",
    "oncedenYapilacaklar": [
      "Ana sayaçtaki Aktif (T), Endüktif (Ri) ve Kapasitif (Rc) endekslerini oku ve Ri/T ile Rc/T yüzde oranlarını hesapla",
      "Reaktif güç kontrol rölesinin Cosφ hedef ayarını (0.98 - 1.00) ve devreye giren kondansatör kademelerini denetle",
      "Harmonik bozulma (THD-V > %5, THD-I > %10) olan hatlarda kondansatör patlamasını önleyen harmonik filtre reaktörlerini kontrol et",
      "Şönt reaktör ve tristörlü hızlı kompanzasyon sürücülerinin çalışma durumunu kaydet"
    ]
  },
  {
    "id": "elektrik_ups_kesintisiz_guc_kaynagi_aku_akuye_sarj",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "ups akü testi deşarj",
      "kesintisiz güç kaynağı statik bypass",
      "ups akü empedans ölçümü",
      "redresör şarj gerilimi float"
    ],
    "baslik": "Endüstriyel UPS & Akü Grubu Yıllık Deşarj / Kapasite Testi",
    "ikon": "🔋",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Hafta Sonu / Planlı Bakım",
    "akilliFisilti": "⚡ UPS akülerinde hücre empedans testi ve %80 kontrollü deşarj yapılarak zayıf bataryalar tespit edilir.",
    "oncedenYapilacaklar": [
      "UPS cihazını Manuel/Statik By-Pass moduna almadan önce yük transfer senkronizasyonunu kontrol et",
      "Her bir VRLA/Jel akü hücresinin açık devre voltajını, iç direncini (mΩ) ve kutup başı sıcaklıklarını termal kamerayla tara",
      "Yapay yük bankası bağlayarak 1 saatlik deşarj eğrisi çıkar ve nominal kapasite kaybını raporla",
      "Şarjör (Float Charge) gerilimini 2.27V/hücre ve sıcaklık kompanzasyon katsayısını ayarla"
    ]
  },
  {
    "id": "elektrik_kesici_vakum_gaz_izolasyonlu_kesici",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "orta gerilim kesici bakım sf6",
      "og vakumlu kesici kontak direnci",
      "kesici açma kapama bobin akımı",
      "hücre kilitleme interlock"
    ],
    "baslik": "OG Vakumlu/SF6 Kesici Kontak Direnci (Mikroohm) & Açma Testi",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Planlı OG Şebeke Kesintisi",
    "akilliFisilti": "⚡ OG kesici ana kontak geçiş direnci mikroohmmetre ile ölçülür ve 50 µΩ sınırının altında olmalıdır.",
    "oncedenYapilacaklar": [
      "Hücre giriş ve çıkış ayırıcılarını açıp hattın topraklama ayırıcısını kapatarak LOTO kilitlemesi yap",
      "Kesici kutup başları arasına 100A DC akım uygulayarak dinamik kontak geçiş direncini (µΩ) ölç",
      "Açma ve kapama bobinlerinin çekme akımlarını, yay kurma motorunun mekanik çalışma süresini test et",
      "Hücre kapak ve topraklama mekanik interlock (güvenlik kilit) mandallarını kontrol et"
    ]
  },
  {
    "id": "elektrik_gunes_enerjisi_ges_inverter_string_voc_isc",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "ges dizi voc isc ölçümü",
      "solar inverter dc izolasyon direnci",
      "fotovoltaik panel sıcak nokta hot spot",
      "ges topraklama eşpotansiyel"
    ],
    "baslik": "Güneş Enerji Santrali (GES) Dizi Voc/Isc Testi & DC İzolasyon",
    "ikon": "☀️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Güneş Işınımı > 800 W/m² Saatleri",
    "akilliFisilti": "⚡ GES dizilerinde açık devre gerilimi (Voc) ve kısa devre akımı (Isc) ölçülerek arızalı fotovoltaik modüller belirlenir.",
    "oncedenYapilacaklar": [
      "Işınım ölçer (Piranometre) ile güneş ışımasının test için yeterli (>800 W/m²) olduğunu doğrula",
      "Dizi kutusu (Combiner Box) veya dizi inverter girişinde string bazlı Voc ve Isc değerlerini pens ampermetreyle ölç",
      "DC kablolar ile toprak arasında 1000V DC Meger uygulayarak izolasyon direncini (>1 MΩ) doğrula",
      "Termal dron/kamera ile panel yüzeylerindeki Hot-Spot (ısınan kusurlu hücre) noktalarını tara"
    ]
  },
  {
    "id": "makine_cnc_freze_takim_sifirlama_prob_g54",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "cnc iş parçası sıfırlama g54",
      "takım boy ve çap ofseti",
      "3d touch prob eksen sıfırlama",
      "cnc kumpas mikrometre mastar"
    ],
    "baslik": "CNC Dik İşleme Merkezi G54 İş Parçası & Takım Boyu Sıfırlama",
    "ikon": "⚙️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "İş Parçası Bağlama / Yeni Parça Başlangıcı",
    "akilliFisilti": "⚙️ 3D optik prob ile parçanın X/Y/Z sıfırları G54 ofsetine aktarılır, takım boy farkları Z ofset tablosuna girilir.",
    "oncedenYapilacaklar": [
      "Mengene ve iş parçasını komparatör saati ile tabladan salgı kontrolü yaparak 0.005 mm paralellikte sık",
      "3D Touch Prob veya mekanik prob kullanarak parçanın referans köşesinden X, Y ve Z sıfırını alıp G54 sayfasına kaydet",
      "Takım boy probu (Z-Setter) üzerinde her bir kesici ucun (Freze, Matkap, Kılavuz) takım boyunu ve yarıçapını otomatik ölçtür",
      "G-Kodu simülasyonunu \"Dry Run\" (Boşta Çalıştırma) ve Z+50 mm mesafe ile güvenli modda başlat"
    ]
  },
  {
    "id": "makine_hidrolik_guvenlik_valfi_ve_yag_analizi",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "hidrolik basınç emniyet valfi ayarı",
      "hidrolik yağ partikül nas 1638",
      "hidrolik filtre basınç farkı dP",
      "hidrolik akümülatör azot dolumu"
    ],
    "baslik": "Hidrolik Güç Ünitesi Emniyet Valfi Ayarı & ISO 4406 Yağ Kirlilik Analizi",
    "ikon": "⚙️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Periyodik 1000 Saat Bakımı",
    "akilliFisilti": "⚙️ Hidrolik oransal valf ve pompa aşınmasını önlemek için yağ temizlik sınıfı ISO 4406 (18/16/13) sınırında tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Ana emniyet basınç valfini manometre üzerinden sistem çalışma basıncının maksimum %10 üzerine ayarla",
      "Hidrolik dönüş ve basınç hatlarındaki filtrelerin fark basınç göstergelerini (Clogging Indicator) kontrol et",
      "Yağ numunesi alarak lazer partikül sayıcı ile NAS 1638 / ISO 4406 sınıflarına göre partikül ve su miktarı testi yap",
      "Hidrolik azot akümülatörünün ön dolum basıncını (N2 şarj kiti ile) servis kitabına göre tamamla"
    ]
  },
  {
    "id": "makine_kaynak_pqr_wps_nitelendirme_ve_ndt",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "kaynak wps pqr şartnamesi",
      "kaynak tahribatsız muayene ndt",
      "kaynak radyografi ultrason testi",
      "kaynakçı sertifikası ts en iso 9606"
    ],
    "baslik": "TS EN ISO 15614 Kaynak Yöntem Onayı (WPS/PQR) & Tahribatsız Muayene",
    "ikon": "👨‍🏭",
    "renk": "#FED7AA",
    "varsayilanZaman": "İmalat Başlangıcı / Kalite Onayı",
    "akilliFisilti": "⚙️ Basınçlı kap ve çelik konstrüksiyon kaynaklarında onaylı WPS ve sertifikalı (EN ISO 9606) kaynakçı zorunludur.",
    "oncedenYapilacaklar": [
      "Ana malzeme ve ilave dolgu teli analiz sertifikalarını (3.1 EN 10204) proje şartnamesi ile karşılaştır",
      "Ön ısıtma (Preheat) ve pasolar arası sıcaklıkları dijital temaslı pirometre ile takip et",
      "Kaynak dikişine görsel (VT), manyetik parçacık (MT) ve penetrant (PT) yüzey kontrollerini uygula",
      "Kritik alın kaynaklarında iç süreksizlikler için ultrasonik (UT) veya radyografik (RT) NDT raporunu hazırla"
    ]
  },
  {
    "id": "makine_rulman_montaji_induksiyon_isitici_bosluk",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "rulman indüksiyon ısıtıcı 110 derece",
      "rulman radyal iç boşluk c3",
      "rulman çektirme hidrolik somun",
      "rulman yağlama gres dolum %30"
    ],
    "baslik": "İndüksiyonla Rulman Isıtma (110°C), Boşluk Ölçümü & Gresleme",
    "ikon": "⚙️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Pompa/Redüktör Revizyonu",
    "akilliFisilti": "⚙️ Rulman metal yapısının bozulmaması için ısıtma sıcaklığı 110-120°C’yi geçmemeli, gres dolumu hacmin %30’u kadar olmalıdır.",
    "oncedenYapilacaklar": [
      "Rulman iç bileziğini indüksiyon ısıtıcı cihazına yerleştirip sıcaklık probunu 110°C limitine ayarla",
      "Isınan rulmanı mile taktıktan sonra soğuma esnasında mile omuz dayamasına tam oturacak şekilde bastır",
      "Radyal iç boşluğu (C3/C4 boşluk sınıfı) yaprak sentil çakısıyla iç bilezik-masura arasından ölç",
      "Yüksek devirli uygulamalarda rulman boşluğuna üretici onaylı lityum/sentetik gresi hacmin %30-%50 oranında bas"
    ]
  },
  {
    "id": "makine_pnomatik_sartlandirici_ve_silindir_hiz_ayari",
    "category": "is_kariyer",
    "domain": "MAKINE",
    "keywords": [
      "pnömatik şartlandırıcı frl ünitesi",
      "pnömatik regülatör 6 bar ayarı",
      "pnömatik silindir hız ayar valfi",
      "otomasyon valf adası profinet"
    ],
    "baslik": "Pnömatik FRL Şartlandırıcı (Filtre-Regülatör-Yağlayıcı) & 6 Bar Ayarı",
    "ikon": "💨",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Haftalık Hat Devreye Alma",
    "akilliFisilti": "⚙️ Pnömatik otomasyon hatlarında optimum çalışma basıncı 6.0 Bar’dır; su tahliyesi ve yağlama mikro damla olarak ayarlanır.",
    "oncedenYapilacaklar": [
      "Pnömatik ana hat filtre haznesindeki biriken yoğuşma suyunu otomatik/manuel tahliye valfinden boşalt",
      "Hassas basınç regülatörü üzerinden hat basıncını 6.0 - 6.3 Bar aralığına kilitle",
      "Hava silindirlerinin strok sonu darbe emici yastıklamalarını ve tek yönlü hız ayar (Kısma) valflerini tornavidayla ayarla",
      "Valf adası (Valve Island) solenoid bobinlerinin LED sinyal ve Fieldbus haberleşme durumunu test et"
    ]
  },
  {
    "id": "bilisim_tls_ssl_sertifika_yenileme_certbot_acme",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "ssl sertifika yenileme certbot",
      "lets encrypt acme renewal",
      "tls 1.3 cipher suite",
      "ssl sertifika süresi 90 gün"
    ],
    "baslik": "Automated TLS/SSL Certificate Renewal (ACME/Certbot) & TLS 1.3 Hardening",
    "ikon": "🔒",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Sertifika Bitişine 30 Gün Kala / Cron Rutini",
    "akilliFisilti": "💻 TLS sertifikaları 90 günde bir otomatik yenilenmeli, zayıf şifrelemeler engellenerek TLS 1.2 ve 1.3 zorunlu kılınmalıdır.",
    "oncedenYapilacaklar": [
      "Certbot / ACME istemcisi ile \"dry-run\" sertifika yenileme komutunu çalıştırarak DNS-01 veya HTTP-01 doğrulamasını test et",
      "Nginx / HAProxy / Traefik ters vekil yapılandırmasında SSL sertifika zincir dosya yollarını doğrula",
      "Eski TLS 1.0/1.1 protokollerini kapatıp HSTS (Strict-Transport-Security) başlığını 31536000 saniyeye ayarla",
      "Web sunucu servisini kesintisiz (Reload/Graceful) yeniden başlatıp SSL Labs üzerinden A+ derecesini teyit et"
    ]
  },
  {
    "id": "bilisim_postgresql_wal_arsivleme_point_in_time_recovery",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "postgresql pitr point in time recovery",
      "wal arşivleme pg_basebackup",
      "veritabanı felaket kurtarma rpo rto",
      "postgresql barman wal-g"
    ],
    "baslik": "PostgreSQL WAL Arşivleme & Point-in-Time Recovery (PITR) Testi",
    "ikon": "🗄️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Aylık Felaket Kurtarma (DR) Tatbikatı",
    "akilliFisilti": "💻 WAL arşivleme ile veritabanında son dakikaya kadar Point-in-Time Recovery (PITR) yapılarak sıfır veri kaybı (RPO ≈ 0) hedeflenir.",
    "oncedenYapilacaklar": [
      "pg_basebackup ile tam taban yedeği al ve S3/NFS depolama alanına şifreli aktarımı doğrula",
      "archive_command ile WAL segmentlerinin sürekli arşivleme dizinine yazıldığını izle",
      "İzole test sunucusunda recovery.signal dosyası ve recovery_target_time belirterek PITR geri yükleme simülasyonu yap",
      "Kurtarılan veritabanının bütünlüğünü, tablo satır sayılarını ve indeks tutarlılığını doğrula"
    ]
  },
  {
    "id": "bilisim_k8s_kubernetes_pod_hpa_resource_limits",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "kubernetes hpa yatay olcekleme",
      "k8s resource requests limits",
      "k8s pod disruption budget pdb",
      "k8s liveness readiness probe"
    ],
    "baslik": "Kubernetes Pod HPA (Horizontal Pod Autoscaler) & Kaynak Sınırları",
    "ikon": "☸️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Prod Canlıya Alım Öncesi",
    "akilliFisilti": "💻 Pod çökmesi ve OOMKilled riskini önlemek için CPU/RAM Resource Limits, Readiness Probes ve PDB tanımlanmalıdır.",
    "oncedenYapilacaklar": [
      "Deployment manifestosunda her container için cpu/memory request ve limit değerlerini yük profiline göre ayarla",
      "Trafik ani artışlarına karşı CPU %70 eşikli Horizontal Pod Autoscaler (HPA min: 3, max: 20) kuralını devreye al",
      "Kesintisiz sürüm güncellemesi (Rolling Update) için PodDisruptionBudget (minAvailable: 2) yapılandır",
      "Liveness ve Readiness Probes uç noktalarının HTTP 200 durum kodunu yanıtladığını doğrula"
    ]
  },
  {
    "id": "bilisim_siber_guvenlik_soc_siem_log_korelasyon_brute_force",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "siem log korelasyon kuralı",
      "soc brute force tespit alarmı",
      "edr xdr uç nokta izleme",
      "firewall ip ban fail2ban"
    ],
    "baslik": "SIEM Kuralı: Dağıtık Brute-Force & Anomali Korelasyon Alarmı",
    "ikon": "🛡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "SOC 7/24 İzleme / Alarm Anı",
    "akilliFisilti": "💻 SIEM üzerinde 5 dakika içinde 10’dan fazla başarısız oturum açma tespiti IP engelleme ve SOC eskalasyonunu tetikler.",
    "oncedenYapilacaklar": [
      "Active Directory, VPN ve SSH log kaynaklarının Syslog/WEC ile SIEM’e kesintisiz aktığını doğrula",
      "Dağıtık brute-force saldırılarını yakalamak için kaynak IP ve hedef hesap bazlı korelasyon kuralını güncelle",
      "Şüpheli IP adresini güvenlik duvarı (Firewall / WAF) kara listesine otomatik ekleyen SOAR senaryosunu çalıştır",
      "Etkilenen kullanıcı hesabının oturumunu sonlandırıp parolasını sıfırla ve zorunlu MFA doğrulaması iste"
    ]
  },
  {
    "id": "bilisim_redis_cluster_sentinel_memory_eviction",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "redis cluster failover sentinel",
      "redis maxmemory allkeys-lru",
      "redis bellek şişmesi latency",
      "redis rdb aof kalıcılık"
    ],
    "baslik": "Redis Cluster / Sentinel Yüksek Erişilebilirlik & Bellek Tahliye Ayarı",
    "ikon": "⚡",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Haftalık Performans Denetimi",
    "akilliFisilti": "💻 Redis bellek şişmesinde Out of Memory çökmesini önlemek için maxmemory-policy allkeys-lru veya volatile-lru olarak seçilir.",
    "oncedenYapilacaklar": [
      "Redis master-slave replikasyon gecikmesini (Replication Lag < 100ms) ve Sentinel oylama çoğunluğunu (Quorum) denetle",
      "Bellek dolduğunda en az kullanılan önbellek verilerini silmek için maxmemory-policy politikasını ayarla",
      "AOF (Append-Only File) ve RDB anlık görüntü dosyalarının disk I/O darboğazı oluşturmadığını doğrula",
      "Redis SLOWLOG komutu ile 10 ms üzerinde süren hantal sorguları analiz edip temizle"
    ]
  },
  {
    "id": "insaat_epoksi_zemin_nem_testi_shot_blasting",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "epoksi zemin kaplama uygulaması",
      "endüstriyel zemin astarı",
      "epoksi self leveling",
      "beton nem ölçümü epoksi",
      "helikopter zemin epoksi"
    ],
    "baslik": "Endüstriyel Epoksi Zemin Kaplama, Nem Ölçümü (<%4) & Shot-Blasting",
    "ikon": "🧪",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Uygulama & Kürlenme",
    "akilliFisilti": "🧪 Beton nemi %4’ün üzerindeyse veya alttan su buharı yükselmesi varsa nem bariyeri uygulanmadan epoksi yapılamaz; aksi takdirde kabarma yapar.",
    "oncedenYapilacaklar": [
      "Beton yüzey nemini elektronik nemölçer ile ölç (Nem <%4 olmalıdır)",
      "Beton yüzeyindeki şerbet tabakasını elmas bilyalama (shot-blasting) ile pürüzlendir ve tozu vakumla",
      "Solventsiz epoksi astar uygulayıp üzerine silis kumu serperek aderans köprüsü oluştur",
      "Self-leveling epoksi son katı kirpi rulo ile tarayarak hava kabarcıklarını gider"
    ]
  },
  {
    "id": "insaat_mekanik_havalandirmali_dis_cephe_karkas",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "dış cephe mekanik seramik kaplama",
      "alüminyum alt karkas cephe",
      "klipsli seramik montajı",
      "taşyünü mantolama cephe",
      "rüzgar yükü cephe ankraj"
    ],
    "baslik": "Mekanik Havalandırmalı Dış Cephe (Taşyünü + Alüminyum Alt Karkas)",
    "ikon": "🧱",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Karkas / Montaj",
    "akilliFisilti": "🧱 Havalandırmalı cephelerde taşyünü ile kaplama paneli arasında minimum 3-5 cm kesintisiz hava boşluğu bırakılmalıdır.",
    "oncedenYapilacaklar": [
      "L-braket ankrajları betonarme yüzeye çelik dübellerle şakülünde monte et",
      "150 kg/m³ yoğunluklu siyah tüllü su itici taşyünü levhaları mantolama dübelleriyle sabitle",
      "Düşey T ve L alüminyum profilleri rüzgar ve sismik genleşme payı (dilatasyon) ile bağla",
      "Porselen seramik veya kompakt laminat panelleri gizli klips/agraflarla kilitle"
    ]
  },
  {
    "id": "insaat_fore_kazik_ve_tremie_beton_dokumu",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "fore kazık baret kazık uygulaması",
      "bentonit sirkülasyonu kazık",
      "donatı kafesi indirme kazık",
      "tremie borusuyla beton dökümü",
      "kazık süreklilik integrity testi"
    ],
    "baslik": "Fore Kazık İmalatı, Bentonit Çamuru & Tremie Borusuyla Sualtı Betonlama",
    "ikon": "🚜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sondaj & Döküm",
    "akilliFisilti": "🚜 Tremie borusu beton dökümü sırasında asla beton yüzeyinin üzerine çıkarılmamalıdır; aksi halde kuyu çamuru betona karışır ve kazık boğulur.",
    "oncedenYapilacaklar": [
      "Fore kazık makinesi ile proje derinliğine kadar sondaj yap ve bentonit çamuru desanding kontrolü sağla",
      "Silindirik donatı kafesini vinçle kuyuya paspayı tekerlekleriyle merkezleyerek indir",
      "Tremie borusunu tabana indirip döküm boyunca beton içinde en az 2-3 metre gömülü tut",
      "Kazık başı kırım kotu sonrası PIT (Pile Integrity Test - Kazık Süreklilik Testi) uygula"
    ]
  },
  {
    "id": "insaat_betonarme_yuzme_havuzu_su_yalitimi",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "havuz betonarme su yalıtımı",
      "kristalize su yalıtımı havuz",
      "pah bandı dilatasyon havuz",
      "havuz su kaçak sızdırmazlık testi",
      "çift bileşenli çimento esaslı yalıtım"
    ],
    "baslik": "Betonarme Yüzme Havuzu Kristalize Su Yalıtımı & 72 Saat Sızdırmazlık Testi",
    "ikon": "🏊",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Yalıtım & 72 Saat Test",
    "akilliFisilti": "🏊 Su tutma testi (72 saat) yapılmadan seramik veya mozaik kaplama işlemine kesinlikle başlanmamalıdır.",
    "oncedenYapilacaklar": [
      "Tie-rod deliklerini hidrolik harç ile tıka ve tüm iç köşelere elastik pah bandı uygula",
      "Kristalize ve çift bileşenli elastik çimento esaslı yalıtımı 2 kat halinde fileli sür",
      "Yalıtım kürünü tamamladıktan sonra havuzu suyla doldurarak 72 saat su tutma testi yap",
      "Kaçak olmadığı onaylandıktan sonra esnek epoksi esaslı seramik yapıştırıcı ve derz dolguya geç"
    ]
  },
  {
    "id": "insaat_dilatasyon_fuji_ve_yangin_bariyeri",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "bina dilatasyon profili montajı",
      "sismik dilatasyon yangın bariyeri",
      "dilatasyon bandı epoksi yapıştırma",
      "su sızdırmaz dilatasyon profili",
      "genleşme derzi kapatma"
    ],
    "baslik": "Sismik Dilatasyon Derzi Montajı, Su İzolasyon Bandı & Yangın Bariyeri",
    "ikon": "🏢",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kaba Yapı / İnce İşler",
    "akilliFisilti": "🏢 Binaların Yangından Korunması Hakkında Yönetmelik gereği dilatasyon boşluklarında katlar arası yangın geçişini önleyen yangın bariyeri zorunludur.",
    "oncedenYapilacaklar": [
      "Bloklar arasındaki sismik genleşme (dilatasyon) aralığını temizle ve polietilen fitil yerleştir",
      "Epoksi esaslı yapıştırıcı ile omega tipi elastik dilatasyon bandını (TPE bant) derze sabitle",
      "Döşeme ve duvar geçişlerine 120 dakika yangına dayanıklı seramik yünü yangın bariyeri monte et",
      "Yüzeye sismik hareket kabiliyetli ağır yük/yaya tipi alüminyum dilatasyon kapağını vidala"
    ]
  },
  {
    "id": "elektrik_scada_rtu_iec_60870_5_104_protokolu",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "scada rtu iec 60870 5 104",
      "trafo merkezi tele-kontrol",
      "kesici açma kapama komutu scada",
      "dNP3 modbus tcp rtu haberleşme",
      "scada telemetri sinyal testi"
    ],
    "baslik": "SCADA & RTU IEC 60870-5-104 / DNP3 Telemetri ve Kesici Kontrolü",
    "ikon": "⚡",
    "renk": "#FEF3C7",
    "varsayilanZaman": "SCADA Devreye Alma / Bakım",
    "akilliFisilti": "⚡ Trafo merkezi SCADA üzerinden uzaktan kesici açma/kapama komutlarında interlock kilitlerinin aktif olduğu doğrulanmalıdır.",
    "oncedenYapilacaklar": [
      "RTU (Remote Terminal Unit) ile SCADA Kontrol Merkezi arasındaki IEC 104 TCP/IP bağlantısını ping ve soket testiyle doğrula",
      "Dijital giriş (DI) sinyallerini (Kesici Açık/Kapalı, Yay Kuruldu, Gaz Basıncı Düşük) panodan simüle et",
      "Analog ölçümleri (MW, MVAR, Akım, Gerilim, Frekans) transducer kalibrasyonu ile karşılaştır",
      "Seç-Kontrol-Çalıştır (Select-Before-Operate) algoritması ile uzaktan manevra testini emniyetle tamamla"
    ]
  },
  {
    "id": "elektrik_kisadevre_hesabi_iec_60909_ik_ip",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "kısa devre hesabı iec 60909",
      "simetrik kısa devre akımı ik",
      "darbe kısa devre akımı ip",
      "bara termik dinamik dayanım",
      "kesici kesme kapasitesi ics icu"
    ],
    "baslik": "IEC 60909 Üç Fazlı Kısa Devre Hesabı & Kesici Kesme Kapasitesi (Icu/Ics)",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Projelendirme / Pano Kabul",
    "akilliFisilti": "⚡ Seçilen kompakt veya açık tip şalterlerin Icu kesme kapasitesi, montaj noktasındaki maksimum Ik” kısa devre akımından büyük olmalıdır.",
    "oncedenYapilacaklar": [
      "Şebeke kısa devre gücü (Sk) ve trafo empedans gerilimi (%Uk) üzerinden maksimum Ik\" hesapla",
      "Bara sisteminin tepe darbe akımına (ip) karşı mekanik ve dinamik dayanım mesnet aralıklarını kontrol et",
      "Kabloların kısa devre anındaki termik sınırını (k²S² >= I²t) formülüyle doğrula",
      "Ana dağıtım şalterlerinin Icu (Kayıpsız Kesme) ve Ics (Servis Kesme) değerlerini onaylı projeye işle"
    ]
  },
  {
    "id": "elektrik_ges_dizi_inverter_iv_curve_izleyici",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "ges i-v eğrisi ölçümü tracer",
      "fotovoltaik dizi açık devre gerilimi voc",
      "kısa devre akımı isc ges",
      "mppt dizi verimlilik testi",
      "panel hotspot termal ges"
    ],
    "baslik": "Güneş Enerjisi (GES) I-V Curve Eğri Testi & String Açık Devre Gerilimi (Voc)",
    "ikon": "☀️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Kabul / Yıllık GES Bakımı",
    "akilliFisilti": "☀️ I-V Curve ölçümü güneş ışınımının minimum 700 W/m² olduğu saatlerde yapılmalı ve STC şartlarına göre normalize edilmelidir.",
    "oncedenYapilacaklar": [
      "Referans ışınım sensörü ve pirometre ile panel yüzey ışınımını (W/m²) ve hücre sıcaklığını ölç",
      "I-V Tracer cihazını dizi konnektörlerine bağlayarak Voc, Isc, Pmax ve Dolum Faktörünü (FF) kaydet",
      "Dizi eğrisindeki basamaklanma veya bükülmeleri analiz ederek gölgelenme ve baypas diyot arızalarını tespit et",
      "İnverter DC giriş sigortalarını ve Tip 1+2 DC parafudr kartuşlarını kontrol et"
    ]
  },
  {
    "id": "elektrik_harmonik_thd_pasif_aktif_filtre",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "harmonik ölçümü thd-v thd-i",
      "aktif harmonik filtre ahf",
      "5. ve 7. harmonik bastırma",
      "nötr iletkeni aşırı akım harmonik",
      "enerji kalitesi analizörü"
    ],
    "baslik": "Enerji Kalitesi & Aktif Harmonik Filtre (AHF / THD-V <%5, THD-I <%8)",
    "ikon": "⚡",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Enerji Kalitesi Analizi",
    "akilliFisilti": "⚡ Non-lineer yükler (sürücüler, UPS, LED) nötr hattında 3. harmonik birikimine yol açar; THD-V %5 üzerine çıkarsa AHF devreye alınmalıdır.",
    "oncedenYapilacaklar": [
      "A Sınıfı Enerji Kalite Analizörünü ana besleme barasına bağla ve 7 günlük kayıt al",
      "Tekil gerilim/akım harmonik spektrumunu (3, 5, 7, 11, 13) ve toplam THD değerlerini çıkar",
      "Kondansatör gruplarında rezonans riskine karşı seri bağlı demanyetizasyon reaktörlerini denetle",
      "Aktif Harmonik Filtrenin (AHF) akım trafosu (CT) yönlerini ve kompanzasyon tepki süresini ayarla"
    ]
  },
  {
    "id": "elektrik_yildirimdan_korunma_faraday_kafesi",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "yıldırımdan korunma faraday kafesi",
      "ts en 62305 yıldırım risk analizi",
      "iniş iletkeni test klemensi",
      "temel topraklama yıldırım irtibatı",
      "tip 1 ag parafudr b sınıfı"
    ],
    "baslik": "TS EN 62305 Yıldırımdan Korunma: Faraday Kafesi & Tip 1 Parafudr",
    "ikon": "⚡",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Dış Yıldırımlık Montaj / Yıllık Test",
    "akilliFisilti": "⚡ TS EN 62305 gereği Faraday kafesi iniş iletkenleri her 10-20 metrede bir indirilmeli ve bina ana eşpotansiyel barasına bağlanmalıdır.",
    "oncedenYapilacaklar": [
      "Çatı yakalama uçlarını ve bakır/alüminyum iletken ağ gözü mesafelerini (LPS Sınıfına göre 5x5m veya 10x10m) döşe",
      "İniş iletkenleri üzerindeki test klemenslerini açarak her bir inişin topraklama direncini tek tek ölç",
      "Bina elektrik ana dağıtım panosuna 10/350 µs dalga formuna dayanıklı Tip 1 (B Sınıfı) AG Parafudr tak",
      "Metal çatı elemanları, klima dış üniteleri ve havalandırma kanallarını eşpotansiyel hatta irtibatla"
    ]
  },
  {
    "id": "makine_cnc_5_eksen_rtcp_ve_takim_ofseti",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "cnc 5 eksen rtcp kalibrasyon",
      "takım sıfırlama probu renishaw",
      "g43.4 rtcp rotasyon merkez ofseti",
      "kinematik kalibrasyon 5 eksen",
      "cnc işleme merkezi koordinat"
    ],
    "baslik": "5 Eksen CNC İşleme: RTCP (Rotasyonel Takım Uç Noktası Kontrolü) & Kinematik",
    "ikon": "⚙️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Tezgah Ayar / Parça Sıfırlama",
    "akilliFisilti": "⚙️ 5 eksen simultane işlemede RTCP (G43.4 / Traori) aktif edilmeden tabla/kafa döndürülürse takım parçaya dalar ve spindle kırılır.",
    "oncedenYapilacaklar": [
      "Renishaw kinematik kalibrasyon küresi ve probu ile A/C döner eksenlerinin merkez sapmalarını ölç",
      "Takım ön ayarlama (Tool Setter) lazer probu ile takım boy ve radyüs aşınma ofsetlerini kaydet",
      "CAM yazılımında post-processor kinematik limitlerini ve çarpışma kontrolü (Collision Check) simülasyonunu çalıştır",
      "İş parçası G54 sıfır noktasını 3D temaslı prob ile parçanın referans yüzeylerinden al"
    ]
  },
  {
    "id": "makine_hidrolik_oransal_valf_lvd_ve_basinc",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "hidrolik oransal valf ayarı",
      "lvd pozisyon sensörü hidrolik",
      "rexroth oransal yön valfi kartı",
      "hidrolik pilot basıncı 50 bar",
      "oransal basınç emniyet valfi"
    ],
    "baslik": "Oransal ve Servo Hidrolik Valf Kalibrasyonu (LVDT & Rampa Sinyalleri)",
    "ikon": "🔧",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Hidrolik Devreye Alma / Bakım",
    "akilliFisilti": "🔧 Oransal valflerde LVDT pozisyon geri besleme voltajı (±10V veya 4-20mA) rampa eğrileri osiloskop veya sürücü yazılımıyla kalibre edilmelidir.",
    "oncedenYapilacaklar": [
      "Hidrolik güç ünitesi pilot basıncını ve ana hat basıncını manometre ile doğrula",
      "Valf amplifikatör kartındaki ölü bant (deadband) ve rampa zamanı (accel/decel) potansiyometrelerini ayarla",
      "Sürgü (spool) konum LVDT sensörünün sıfır (0V) ve maksimum (±10V) strok sinyallerini test et",
      "Yağ temizlik sınıfının ISO 4406 standardına göre minimum 16/14/11 seviyesinde olduğunu teyit et"
    ]
  },
  {
    "id": "makine_titresim_vibrasyon_fft_spektrumu_rulman",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "kestirimci bakım vibrasyon analizi",
      "fft ivme spektrumu rulman",
      "bpfo bpfi bsf ftf frekansları",
      "lazerli kaplin ayarı mils",
      "rulman zarf analizi demodulation"
    ],
    "baslik": "Kestirimci Bakım: FFT Titreşim Spektrumu & Rulman Hata Frekansları (BPFO/BPFI)",
    "ikon": "📈",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Aylık Kestirimci Bakım",
    "akilliFisilti": "📈 Rulman dış bilezik (BPFO) ve iç bilezik (BPFI) pik frekansları zarf (demodülasyon) spektrumunda erken evrede yakalanarak plansız duruş önlenir.",
    "oncedenYapilacaklar": [
      "Piezoelektrik ivmeölçer sensörünü rulman yatağına yatay, dikey ve eksenel olarak manyetik tabanla sabitle",
      "FFT analizöründen hız (RMS mm/s) ve ivme zarfı (gE) değerlerini ISO 10816-3 standardına göre kaydet",
      "1X ve 2X devir frekansı piklerini kontrol ederek balanssızlık ve kaplin eksen kaçıklığını ayırt et",
      "Rulman karakteristik pikleri eşik değerleri aşmışsa yağlama veya rulman değişim iş emri aç"
    ]
  },
  {
    "id": "makine_enjeksiyon_kaliplama_yolluk_sicak_sicaklik",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "plastik enjeksiyon kalıplama parametreleri",
      "sıcak yolluk kontrol ünitesi pid",
      "tutma basıncı ütüleme zamanı",
      "enjeksiyon vida geri emme dekompresyon",
      "çöküntü ve çapak önleme plastik"
    ],
    "baslik": "Plastik Enjeksiyon Prosesi: Sıcak Yolluk, Enjeksiyon Hızı & Ütüleme Basıncı",
    "ikon": "🏭",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kalıp Bağlama / Baskı Başlangıcı",
    "akilliFisilti": "🏭 Ütüleme (tutma) basıncı ve süresi parça üzerindeki çöküntü ve çekme payını belirler; yolluk donma süresi tartım yöntemiyle doğrulanmalıdır.",
    "oncedenYapilacaklar": [
      "Kalıp sıcak yolluk (Hot Runner) bölgelerini PID kontrol cihazı ile kademeli olarak çalışma sıcaklığına ısıt",
      "Enjeksiyon hız profili ve geçiş basıncını (V-P Switchover) kalıp hacminin %95 dolum noktasına ayarla",
      "Kalıp kilitleme tonajını (Clamping force) projeksiyon alanına göre hesapla ve kalıp koruma basıncını kur",
      "İlk baskılardan numune alarak kumpas ve 3D optik tarama ile parça geometrisini doğrula"
    ]
  },
  {
    "id": "makine_kompresor_vidalı_hava_debisi_ve_kurutucu",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "vidalı hava kompresörü bakımı",
      "basınçlı hava çiğlenme noktası dew point +3c",
      "hava tankı emniyet ventili kontrol",
      "kompresör yağ separatörü dp",
      "basınçlı hava kaçak testi ultrasonik"
    ],
    "baslik": "Basınçlı Hava Sistemi: Vidalı Kompresör, Separatör & Gazlı Kurutucu (+3°C)",
    "ikon": "💨",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Periyodik Kompresör Bakımı",
    "akilliFisilti": "💨 ISO 8573-1 Sınıf 4 basınçlı hava için kurutucu basınç çiğlenme noktası (Dew Point) +3°C olmalı ve otomatik tahliye tahliyesi çalışmalıdır.",
    "oncedenYapilacaklar": [
      "Kompresör hava/yağ separatör filtresi basınç farkını (ΔP < 0.8 bar) kontrol et",
      "Kurutucu evaporatör sıcaklığı ve gaz basıncı ile basınçlı çiğlenme noktasını (+3°C) doğrula",
      "Basınçlı hava tankının tabanındaki otomatik kondenstop tahliyesini test et ve su/yağ birikimini boşalt",
      "Hava hatlarında ultrasonik akustik kamera ile kaçak taraması yap ve bar kayıplarını önle"
    ]
  },
  {
    "id": "yazilim_kubernetes_istio_service_mesh_mutual_tls",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "kubernetes istio service mesh",
      "mutual tls mtls strict mode",
      "istio ingress gateway virtualservice",
      "pod network policy calico",
      "envoy proxy sidecar injection"
    ],
    "baslik": "Kubernetes Microservices: Istio Service Mesh & STRICT mTLS Şifreleme",
    "ikon": "☸️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "K8s Cluster Konfigürasyon",
    "akilliFisilti": "☸️ PeerAuthentication kaynağında mTLS modu STRICT yapıldığında, sidecar proxy taşımayan eski podların trafiği anında kesilir.",
    "oncedenYapilacaklar": [
      "Namespace üzerinde `istio-injection=enabled` etiketini kontrol et ve sidecar pod injection doğrula",
      "Tüm podlar arası iletişimi çift yönlü şifrelemek için `PeerAuthentication` YAML dosyasında `STRICT` mod tanımla",
      "Dış trafik için `Istio Ingress Gateway` ve `VirtualService` yönlendirme kurallarını yaz",
      "Kiali ve Jaeger panelleri üzerinden microservice çağrı zincirini ve gecikme (latency) grafiğini izle"
    ]
  },
  {
    "id": "yazilim_siem_soc_soc_wazuh_splunk_kural_yazimi",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "siem soc korelasyon kuralı",
      "brute force ssh rdp tespit kuralı",
      "wazuh rule sigma rule splunk",
      "mitre att&ck t1110 brute force",
      "soc alert triage l1 analist"
    ],
    "baslik": "SOC & SIEM: Sigma / Wazuh Korelasyon Kuralı & MITRE ATT&CK Eşlemesi",
    "ikon": "🛡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "SOC Kural Geliştirme / Triage",
    "akilliFisilti": "🛡️ Brute-force kuralında 5 dakikada 10 başarısız giriş sonrası 1 başarılı giriş durumunda yüksek öncelikli (Severity: High) SOC alarmı tetiklenmelidir.",
    "oncedenYapilacaklar": [
      "Sigma formatında kural oluştur ve MITRE ATT&CK T1110 (Brute Force) tekniği ile etiketle",
      "Wazuh/Splunk log kaynaklarından (Syslog, Windows Event ID 4625/4624) log akışını doğrula",
      "Yanlış pozitifleri (False Positive) önlemek için yetkili IP ve servis hesaplarını whitelist listesine ekle",
      "Tetiklenen alarm senaryosunda SOAR playbook ile saldırgan IP adresini güvenlik duvarında otomatik karantinaya al"
    ]
  },
  {
    "id": "yazilim_postgresql_patroni_etcd_high_availability",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "postgresql patroni etcd ha",
      "patroni auto failover raft",
      "postgresql wal replikasyon lag",
      "pgbouncer connection pooler",
      "leader election patroni"
    ],
    "baslik": "PostgreSQL High Availability: Patroni, etcd Dağıtık Konsensüs & Otomatik Failover",
    "ikon": "🐘",
    "renk": "#CFFAFE",
    "varsayilanZaman": "DB Cluster Kurulum / Failover Testi",
    "akilliFisilti": "🐘 Patroni lider seçiminde Split-Brain durumunu önlemek için etcd düğüm sayısı tek sayı (3 veya 5 node) olmalıdır.",
    "oncedenYapilacaklar": [
      "etcd cluster sağlık durumunu (`etcdctl endpoint health`) kontrol et",
      "PostgreSQL streaming replikasyon gecikmesini (WAL replication lag < 16MB) izle",
      "`patronictl topology` komutu ile Lider ve Replica node durumlarını doğrula",
      "PgBouncer bağlantı havuzu yapılandırmasını VIP (Virtual IP / Keepalived) arkasına bağla"
    ]
  },
  {
    "id": "yazilim_oauth2_oidc_pkce_authorization_code",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "oauth2 pkce authorization code flow",
      "code verifier code challenge sha256",
      "openid connect id_token jwt validation",
      "spa mobile auth flow pkce",
      "refresh token rotation"
    ],
    "baslik": "OAuth 2.0 & OpenID Connect: PKCE (Proof Key for Code Exchange) Güvenli Akışı",
    "ikon": "🔐",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Auth Entegrasyonu / API Security",
    "akilliFisilti": "🔐 SPA ve mobil uygulamalarda gizli anahtar (client secret) saklanamayacağı için PKCE akışı zorunludur; Authorization Code ele geçirilse dahi takas edilemez.",
    "oncedenYapilacaklar": [
      "İstemci tarafında kriptografik rastgele `code_verifier` ve SHA-256 tabanlı `code_challenge` üret",
      "Yetkilendirme sunucusuna `/authorize` isteğini `code_challenge_method=S256` parametresiyle gönder",
      "Dönen authorization code ile `/token` uç noktasına `code_verifier` göndererek access ve id_token al",
      "Refresh Token Rotation (RTR) mekanizmasını aktif ederek sızan tokenların yeniden kullanımını engelle"
    ]
  },
  {
    "id": "yazilim_terraform_hcl_iac_state_locking_aws",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "terraform state locking dynamodb",
      "terraform s3 backend remote state",
      "terraform plan apply ci/cd",
      "iac infrastructure as code drift",
      "terraform module best practice"
    ],
    "baslik": "Terraform IaC: Remote S3 Backend, DynamoDB State Locking & Drift Detection",
    "ikon": "☁️",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Altyapı Dağıtımı / CI-CD Pipeline",
    "akilliFisilti": "☁️ Birden fazla mühendisin aynı anda apply çalıştırmasını önlemek için DynamoDB State Lock tablosu zorunlu tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Terraform backend bloğunda şifrelenmiş AWS S3 bucket ve DynamoDB LockID yapılandır",
      "`terraform plan -out=tfplan` çıktısını inceleyerek silinecek veya değişecek kaynakları doğrula",
      "CI/CD pipeline üzerinde `terraform fmt -check` ve `tflint` statik kod analizini çalıştır",
      "Bulut ortamında manuel yapılan değişiklikleri tespit etmek için `drift detection` raporu al"
    ]
  },
  {
    "id": "insaat_geoteknik_fore_kazik_ve_iksa_ankraj_gergi_testi",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "fore kazık geoteknik iksa projesi kuyu",
      "öngermeli geçici zemin ankrajı çekme testi",
      "inklinometre deplasman okuması derin kazı",
      "bentonit çamuru viskozite kum oranı testi",
      "püskürtme beton shotcrete ve hasır çelik montajı"
    ],
    "baslik": "Geoteknik Derin Kazı İksası: Fore Kazık, Öngermeli Ankraj Çekme Testi & İnklinometre",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kazı Aşaması / Ankraj İmalatı Sonrası",
    "akilliFisilti": "🏗️ Öngermeli zemin ankrajlarında proje tasarım yükünün %120 - %150'si ile kilit yükleme (çekme) testi yapılmadan kazı kademesine inilemez.",
    "oncedenYapilacaklar": [
      "Fore kazık delgisinde bentonit çamur yoğunluğu ve dip temizliği kontrolünü şantiyede yap",
      "Ankraj halatlarının korozyon korumalı manşonlarını yerleştirip enjeksiyon priz süresini (7 gün) bekle",
      "Hidrolik kriko ile ankraj kilitleme çekme testini yapıp basınç manometre değerlerini tutanağa bağla",
      "İnklinometre borusundan haftalık deplasman okuması alarak komşu parsellerdeki oturma riskini izle"
    ]
  },
  {
    "id": "insaat_yapi_denetim_demir_donati_paspayi_ve_vize",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "yapı denetim demir donatı vizesi kontrolü",
      "paspayı elemanı betonarme kolon kiriş perde",
      "boyuna donatı bindirme boyu 50 fi kenetlenme",
      "etrier sıklaştırma bölgesi ve 135 derece kanca",
      "donatı teslim tutanağı e-dağıtım şantiye şefi"
    ],
    "baslik": "Yapı Denetim Demir Donatı Vizesi: Paspayı, 135° Etriye Kancası & Bindirme Boyu Kontrolü",
    "ikon": "📐",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Beton Dökümünden 24 Saat Önce",
    "akilliFisilti": "📐 TBDY 2018 gereği etriye kancaları mutlaka 135 derece kıvrılmalı, kolon-kiriş düğüm noktalarında sıklaştırma ve minimum 3-5 cm paspayı sağlanmalıdır.",
    "oncedenYapilacaklar": [
      "Statik proje detaylarına göre kolon ve perde filiz boylarını, bindirme boyu (en az 50Ø) kurallarını ölç",
      "Kiriş ve kolon etriyelerinin 135° gönyeli büküldüğünü ve düğüm noktası sıklaştırma aralıklarını denetle",
      "Plastik paspayı takozlarının donatı altına ve yanlarına standart aralıklarla yerleştirildiğini kontrol et",
      "Yapı Denetim Uygulama Sistemi (EBİS) üzerinden kontrol mühendisi ile yerinde Demir Teslim Tutanağını imzala"
    ]
  },
  {
    "id": "insaat_c35_c40_hazir_beton_ebis_cip_ve_karot_testi",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "elektronik beton izleme sistemi ebis rfid çip",
      "c35 45 hazır beton slamp ve kıvam ölçümü",
      "küp numune 150x150 7 ve 28 günlük kırım",
      "şüpheli beton karot numune alma ts en 12504",
      "taze beton sıcaklığı soğuk derz vibratör uygulaması"
    ],
    "baslik": "EBİS Çipli Hazır Beton Dökümü: Slamp Testi, 7-28 Günlük Kırım & Şüpheli Karot Süreci",
    "ikon": "🧱",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Transmikser Girişi / Döküm Anı",
    "akilliFisilti": "🧱 Beton mikserinden slamp konisi ile kıvam ölçülmeli, Yapı Denetim laboratuvar teknisyeni RFID çipli küp numuneleri döküm anında bizzat almalıdır.",
    "oncedenYapilacaklar": [
      "İrsaliyedeki beton sınıfı (C30/37, C35/45), su/çimento oranı ve kimyasal katkı türünü kontrol et",
      "Slamp hunisi ile taze beton çökme (kıvam) testini yap; şantiyede kesinlikle su ekletme",
      "EBİS sistemi için 6 adet 150x150 mm küp kalıba çipli numuneleri doldurup 24 saat sonra kür havuzuna al",
      "7 ve 28 günlük basınç dayanımı sonuçlarını takip et; mukavemet düşük çıkarsa TS EN 12504 karot sürecini başlat"
    ]
  },
  {
    "id": "insaat_bina_su_ve_isi_yalitimi_membran_mantolama",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "temel bohçalama bitümlü membran su yalıtımı",
      "dış cephe mantolama eps taşyünü yangın bariyeri",
      "dübel sayısı m2 başına 6 adet ve fileli sıva",
      "su yalıtımı 48 saat su göllendirme sızdırmazlık testi",
      "bina enerji kimlik belgesi ekb b sınıfı"
    ],
    "baslik": "Binalarda Su & Yangın Yalıtımı: Temel Bohçalama, Taşyünü Mantolama & Göllendirme Testi",
    "ikon": "🏠",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Temel İmalatı / Dış Cephe Kaplama",
    "akilliFisilti": "🏠 Teras ve temel su yalıtımı sonrası koruma betonu atılmadan önce en az 48 saat su göllendirme testi yapılarak alt kata sızdırmazlık teyit edilmelidir.",
    "oncedenYapilacaklar": [
      "Temel grobetonu üzerine çift kat polyester keçeli polimer bitümlü membran uygulamasını ve ek yeri bindirmelerini denetle",
      "Teras ve ıslak hacimlerde 48 saatlik su sızdırmazlık test tutanağını şantiye denetçisiyle tanzim et",
      "Dış cephede A1 sınıfı yanmaz taşyünü levhaları ve kat arası yangın bariyerlerini şartnameye göre uygulat",
      "m² başına en az 6 adet çelik/plastik çivili dübel montajı ve alkali dayanımlı fileli sıva katmanını kontrol et"
    ]
  },
  {
    "id": "insaat_celik_yapi_kaynak_ndt_ve_torklu_civata_kontrolu",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "çelik konstrüksiyon montajı kolon kiriş birleşimi",
      "kaynak tahribatsız muayene ndt ultrasonik ut radyografik rt",
      "10.9 kalite yüksek mukavemetli bulon tork kontrolü",
      "manyetik parçacık mt ve penetrant pt kaynak testi",
      "korozyon koruma yangın geciktirici intümesan boya"
    ],
    "baslik": "Çelik Yapı & Konstrüksiyon: NDT Kaynak Kontrolü (UT/RT), 10.9 Kalite Torklu Bulon & İntümesan Boya",
    "ikon": "🔩",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Çelik Montaj & Birleşim Aşaması",
    "akilliFisilti": "🔩 Çelik yapılarda 10.9 kalite ön germeli bulonlar kalibre tork anahtarı ile sıkılmalı; kritik kaynak dikişlerine %100 Ultrasonik (UT) test yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Şantiye ve fabrika kaynaklarında EN ISO 9712 Seviye 2 uzmanı tarafından Tahribatsız Muayene (NDT) raporunu al",
      "Alın ve gövde birleşim plakalarındaki yüksek mukavemetli bulonların torkmetre ile tork değerini ölç",
      "Kolon taban plakası (base plate) altına büzülmeyen (non-shrink) yüksek mukavemetli grout harcı uygulamasını sağla",
      "Yangın yönetmeliğine uygun kalınlıkta intümesan yangın geciktirici boya mikron ölçümünü (DFT) gerçekleştir"
    ]
  },
  {
    "id": "elektrik_yg_hucresi_sf6_gaz_basinici_ve_kesici_bakimi",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "orta gerilim og hücresi kesici bakım",
      "sf6 gaz basıncı manometre yeşil bölge",
      "vakumlu kesici kontak direnci mikro-ohm ölçümü",
      "aşırı akım ve toprak koruma rölesi sekonder test",
      "loto kilitleme yüksek gerilim topraklama ayırıcısı"
    ],
    "baslik": "OG / YG Hücre & Kesici Bakımı: SF6 Gaz Basıncı, Kontak Direnci (µΩ) & Sekonder Röle Testi",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Periyodik Trafo Merkezi Bakımı",
    "akilliFisilti": "⚡ Kesici açma-kapama kontak geçiş direnci mikro-ohmmetre ile ölçülmeli; SF6 gaz basınç manometresi mutlaka yeşil bölgede olmalıdır.",
    "oncedenYapilacaklar": [
      "LOTO prosedürü uyarınca enerjiyi kesip hücrayı topraklama ayırıcısı ile toprağa bağla",
      "SF6 gazlı kesicilerde gaz yoğunluk ve manometre basınç seviyesini kontrol et",
      "Mikro-ohmmetre cihazı ile ana kontak geçiş direncini (R < 50 µΩ) test et ve sınır değerleri karşılaştır",
      "Sekonder koruma rölesine akım enjeksiyon cihazı ile test akımı vererek açma eğrisini ve zamanını doğrula"
    ]
  },
  {
    "id": "elektrik_kompanzasyon_ve_reaktif_ceza_oranlari",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "kompanzasyon panosu reaktif ceza kontrolü",
      "endüktif reaktif yüzde 20 sınır aşımı",
      "kapasitif reaktif yüzde 15 sınır aşımı epdk",
      "reaktif güç kontrol rölesi kademe testi",
      "harmonik filtreli kompanzasyon kondansatör kontaktörü"
    ],
    "baslik": "Kompanzasyon & Reaktif Ceza Önleme: Endüktif (%20) / Kapasitif (%15) EPDK Sınır Takibi",
    "ikon": "📊",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Haftalık Sayaç Okuma / Ay Sonu",
    "akilliFisilti": "📊 EPDK mevzuatına göre 50 kVA üstü abonelerde endüktif oran %20'yi, kapasitif oran %15'i geçerse fatura ceza tarifesinden kesilir.",
    "oncedenYapilacaklar": [
      "Elektronik elektrik sayacından aktif (T), endüktif (Ri) ve kapasitif (Rc) endeks değerlerini oku",
      "Endüktif/Aktif ve Kapasitif/Aktif oranlarını hesaplayarak yasal sınırların altında kaldığını teyit et",
      "Reaktif Güç Kontrol Rölesinin (RGKR) kademe akımlarını ve kondansatör deşarj dirençlerini kontrol et",
      "Şişmiş veya kapasite kaybetmiş kondansatörleri pens ampermetre ile ölçerek yenileriyle değiştir"
    ]
  },
  {
    "id": "elektrik_ups_kesintisiz_guc_kaynagi_ve_aku_desarj",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "ups kesintisiz güç kaynağı akü deşarj testi",
      "statik bypass ve manuel bakım bypass geçişi",
      "vrla jel akü iç direnç ve gerilim ölçümü",
      "ups yük testi yapay yük bankası dummy load",
      "akü odası hidrojen gazı algılama ve havalandırma"
    ],
    "baslik": "Modüler UPS & Akü Grubu: VRLA İç Direnç Ölçümü, Yük Bankası & Deşarj Testi",
    "ikon": "🔋",
    "renk": "#E0F2FE",
    "varsayilanZaman": "6 Aylık Periyodik UPS Bakımı",
    "akilliFisilti": "🔋 Akü gruplarında tek bir arızalı hücre tüm dizeyi düşürür; iletkenlik/iç direnç ölçümü ile zayıf aküler tespit edilip deşarj testi yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Akü izleme cihazı ile her bir VRLA bloğunun açık devre gerilimini ve iç direncini (milli-ohm) ölç",
      "Yapay yük bankası (Load Bank) bağlayarak %100 nominal yükte akü otonomi süresini test et",
      "Statik Bypass ve Manuel Bypass anahtarlarının kesintisiz transfer senkronizasyonunu kontrol et",
      "Akü odası ATEX uyumlu egzoz fanını ve hidrojen (H2) gazı algılama dedektörünü test et"
    ]
  },
  {
    "id": "elektrik_topraklama_ve_paratoner_meger_olcumu",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "topraklama direnci ölçümü meger toprak megeri",
      "aktif paratoner eyt radyoaktif olmayan ölçüm",
      "çevrim empedansı loop impedance ve kaçak akım rölesi",
      "eşpotansiyel bara ve koruma topraklaması raporu",
      "emo onaylı fenni muayene topraklama raporu"
    ],
    "baslik": "Topraklama & Paratoner Tesisatı: Toprak Megeri, Çevrim Empedansı (Loop) & EMO Raporu",
    "ikon": "⚡",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıllık Periyodik Muayene",
    "akilliFisilti": "⚡ Elektrik Tesislerinde Topraklamalar Yönetmeliği uyarınca trafo koruma topraklaması < 1 Ω, bina işletme topraklaması < 2 Ω olmalıdır.",
    "oncedenYapilacaklar": [
      "Toprak megeri problarını 5-10-15 metre aralıklarla çakarak kazıklı yöntemle toprak yayılma direncini ölç",
      "Ana dağıtım panosunda loop tester ile çevrim empedansını ölçüp 30mA kaçak akım rölelerinin açma süresini test et",
      "Paratoner iniş iletkeni test klemensini ayırıp aktif paratoner topraklama geçiş direncini (< 5 Ω) doğrula",
      "Tüm ölçüm noktalarını krokiye işleyip EMO onaylı yetkili mühendis kaşeli periyodik muayene raporunu hazırla"
    ]
  },
  {
    "id": "elektrik_ges_fotovoltaik_dizi_voc_isc_ve_termal_drone",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "güneş enerji santrali ges pv dizi testi",
      "voc açık devre gerilimi ve isc kısa devre akımı",
      "fotovoltaik panel termal drone incelemesi hot-spot",
      "inverter mppt verimlilik ve izolasyon direnci",
      "ges ac dc aşırı gerilim parafudr kontrolü"
    ],
    "baslik": "Güneş Enerji Santrali (GES): PV Dizi Voc/Isc Testi, İnverter İzolasyonu & Termal Drone İncelemesi",
    "ikon": "☀️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Aylık GES Santral Denetimi",
    "akilliFisilti": "☀️ GES panellerindeki hot-spot (kızışma) hücreleri termal drone ile tespit edilmeli; Voc gerilimleri dizi bazında %5 tolerans içinde olmalıdır.",
    "oncedenYapilacaklar": [
      "Işınım ölçer (piranometre) eşliğinde stringlerin Voc açık devre gerilimi ve Isc kısa devre akımını ölç",
      "İnverterlerin DC izolasyon direnci (Riso > 1 MΩ) ve MPPT çalışma parametrelerini SCADA üzerinden doğrula",
      "Termal kamera veya termal drone uçuşu ile bypass diyot arızası ve panel hot-spot hücrelerini haritalandır",
      "DC String combiner box ve AC panolardaki Tip 1+2 parafudrların durum göstergelerini kontrol et"
    ]
  },
  {
    "id": "makine_cnc_isleme_merkezi_sifirlama_ve_takim_ofseti",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "cnc freze işleme merkezi sıfırlama g54 g55",
      "takım boy ve çap ofseti ölçüm probu renishaw",
      "spindle salgısı ve koniklik mikrometre ölçümü",
      "cnc kesme sıvısı refraktometre brix bor yağı",
      "g-kod simülasyonu ve kuru çalışma dry run"
    ],
    "baslik": "5 Eksen CNC Freze / Torna: G54 İş Parçası Sıfırlama, Renishaw Prob & Brix Yağ Ölçümü",
    "ikon": "⚙️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "İmalat Başlangıcı / Yeni Parça Bağlama",
    "akilliFisilti": "⚙️ Talaşlı imalatta parça işlemeden önce G54 sıfırı optik prob ile doğrulanmalı, bor yağı konsantrasyonu optik refraktometre ile %6-8 Brix olmalıdır.",
    "oncedenYapilacaklar": [
      "İş parçası sıfırını 3D Renishaw prob ile prob döngüsü çalıştırarak CNC kontrol ünitesine (G54) kaydet",
      "Takım magazini boy ve yarıçap ofsetlerini lazer takım ölçme probu ile sıfırla",
      "Refraktometre ile kesme sıvısı (bor yağı) emülsiyon oranını (%6 - %8) ve pH değerini test et",
      "CAM yazılımından aktarılan NC kodunu önce \"Dry Run\" (kuru simülasyon) modunda talaş kaldırmadan çalıştır"
    ]
  },
  {
    "id": "makine_hidrolik_guvenlik_oransal_valf_ve_partikul_sayimi",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "hidrolik güç ünitesi hpu yağ partikül sayımı",
      "iso 4406 yağ kirlilik sınıfı 16 14 11",
      "oransal valf ve servo valf lvdt sıfır kalibrasyonu",
      "hidrolik akümülatör azot n2 ön dolum basıncı",
      "hidrolik yağ soğutucu sıcaklık ve emiş filtre vakumu"
    ],
    "baslik": "Ağır Hidrolik Güç Ünitesi (HPU): ISO 4406 Yağ Kirliliği, Azot Akümülatör & Oransal Valf",
    "ikon": "🛢️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Aylık Hidrolik Sistem Bakımı",
    "akilliFisilti": "🛢️ Hidrolik servo-oransal sistemlerde yağ kirliliği ISO 4406 uyarınca en az 16/14/11 standardında tutulmalı, aksi halde oransal valf çekirdeği kilitlenir.",
    "oncedenYapilacaklar": [
      "Lazer partikül sayıcı ile hidrolik tanktan numune alıp ISO 4406 / NAS 1638 kirlilik seviyesini analiz et",
      "Azot (N2) doldurma kiti ile hidrolik akümülatörün ön dolum basıncını manometre ile kontrol et",
      "Oransal yön kontrol valflerinin bobin akımını ve LVDT konum geribildirim sinyalini (4-20mA / 0-10V) doğrula",
      "Dönüş ve emiş filtrelerindeki fark basınç göstergelerini (kirlilik bayrağı) kontrol edip filtre elemanlarını yenile"
    ]
  },
  {
    "id": "makine_titresim_vibrasyon_analizi_ve_rulman_hasari",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "titreşim vibrasyon analizi fft spektrum",
      "rulman hasar frekansları bpfo bpfi bsf ftf",
      "lazerli şaft kaplin hizalama laser alignment",
      "balanssızlık ve eksenel kaçıklık hız rms mm s",
      "iso 10816-3 titreşim şiddeti sınır değerleri"
    ],
    "baslik": "Kestirimci Bakım: FFT Titreşim Spektrumu, Rulman BPFO/BPFI Hasar Analizi & Lazer Kaplin Ayarı",
    "ikon": "🎛️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Periyodik Döner Ekipman İzleme",
    "akilliFisilti": "🎛️ ISO 10816-3 standardına göre endüstriyel pompalarda titreşim hızı (RMS) 4.5 mm/s üzerine çıkarsa rulmanda dış/iç bilezik hasarı başlar.",
    "oncedenYapilacaklar": [
      "İvmeölçer sensör ile motor ve pompa rulman yataklarından yatay, dikey ve eksenel FFT vibrasyon sinyali topla",
      "Spektrumda 1X (balanssızlık), 2X (hizalama hatası) ve yüksek frekans BPFO/BPFI rulman frekanslarını ayrıştır",
      "Lazerli kaplin ayar cihazı ile açısal ve paralel kaçıklığı 0.05 mm toleransının altına indir",
      "Ultrasonik ses analiz cihazı ile rulman yağlama durumunu dinleyerek doğru miktarda gres basılmasını sağla"
    ]
  },
  {
    "id": "makine_kompresor_ve_basincli_hava_kacak_ve_hidrostatik",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "vidalı hava kompresörü periyodik bakım",
      "basınçlı hava tankı hidrostatik test 1.5 katı",
      "ultrasonik hava kaçak dedektörü akustik kamera",
      "hava kurutucu çiğlenme noktası dew point eksi 40",
      "emniyet ventili açma basıncı akredite test raporu"
    ],
    "baslik": "Basınçlı Hava Tesisatı: 1.5 Kat Hidrostatik Tank Testi, Akustik Kaçak & Çiğlenme Noktası",
    "ikon": "💨",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıllık Basınçlı Kap Muayenesi",
    "akilliFisilti": "💨 Basınçlı Kaplar Yönetmeliği gereği hava tankı çalışma basıncının 1.5 katı su basıncı ile hidrostatik teste tabi tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Hava tankını tamamen suyla doldurup test pompası ile tasarım basıncının 1.5 katında 30 dakika hidrostatik basınçta tut",
      "Tank üzerindeki yaylı emniyet ventilinin kalibrasyonunu ve etiket mühür tarihini kontrol et",
      "Kurutucunun basınçlı çiğlenme noktasını (Dew Point -40°C) sensör üzerinden doğrula",
      "Ultrasonik akustik kaçak kamerası ile fabrika basınçlı hava hatlarındaki kaçakları tespit edip enerji kaybını önle"
    ]
  },
  {
    "id": "makine_enjeksiyon_kaliplama_sicak_yolluk_ve_cevre_zamani",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "plastik enjeksiyon kalıplama parametreleri",
      "sıcak yolluk hot runner ısı kontrol cihazı",
      "enjeksiyon ütüleme basıncı ve soğuma süresi",
      "kalıp kilitleme tonajı ve itici pim mesafesi",
      "çapak çöküntü ve yanık izi plastik parça hatası"
    ],
    "baslik": "Plastik Enjeksiyon İmalatı: Sıcak Yolluk (PID), Ütüleme Basıncı, Soğuma & Çevrim Süresi",
    "ikon": "🔧",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Kalıp Bağlama / Seri Üretim Başlangıcı",
    "akilliFisilti": "🔧 Enjeksiyon ütüleme basıncı ve süresi doğru ayarlanmazsa parçada çöküntü ve boyutsal çekme meydana gelir; kalıp sıcaklığı termoregülatörle sabitlenmelidir.",
    "oncedenYapilacaklar": [
      "Kalıp bağlama cıvatalarını ve hidrolik mengene kilitleme tonajını (kN) kalıp alanına göre ayarla",
      "Sıcak yolluk manifold rezistanslarının PID sıcaklık kontrol ünitesinde set değerlerine ulaştığını teyit et",
      "Hammadde kurutma fırınındaki (nem alma kurutucusu) rezidüel nem oranını (< %0.02) kontrol et",
      "İlk baskılarda parçayı kumpas ve 3D CMM ölçüm cihazı ile kontrol edip çapak veya çöküntü toleranslarını ayarla"
    ]
  },
  {
    "id": "bilisim_soc_siem_olay_mudahale_ve_brute_force_engelleme",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "siem log analizi soc güvenlik alarmı",
      "brute force kaba kuvvet saldırısı ip engelleme",
      "edr uç nokta tehdit algılama ve karantinaya alma",
      "cve zafiyet istismarı exploit tespiti",
      "olay müdahale incident response planı pci-dss"
    ],
    "baslik": "SOC & SIEM Olay Müdahalesi: Brute-Force Tespiti, EDR Karantina & Firewall IP Ban",
    "ikon": "🛡️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Gerçek Zamanlı / 15 Dakika İçinde Müdahale",
    "akilliFisilti": "🛡️ SIEM üzerinde kritik seviyeli korelasyon alarmı tetiklendiğinde enfekte uç nokta EDR ile ağdan izole edilmeli ve saldırgan IP firewall'da bloklanmalıdır.",
    "oncedenYapilacaklar": [
      "SIEM konsolundaki kural tetikleyici loglarını (Event ID 4625 vb.) ve kaynak IP coğrafi konumunu incele",
      "Etkilenen host makinesini EDR konsolu üzerinden tek tuşla ağdan izole et (Network Isolation)",
      "Yeni Nesil Güvenlik Duvarı (NGFW) üzerinde saldırgan IP adresini dinamik kara listeye (Blocklist) ekle",
      "Bellek dökümü (Memory Dump) ve zararlı dosya karmasını (Hash) Sandbox ortamında analiz ederek Olay Raporunu yaz"
    ]
  },
  {
    "id": "bilisim_k8s_kubernetes_pod_crashloop_ve_hpa_olcekleme",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "kubernetes pod crashloopbackoff hata ayıklama",
      "kubectl describe pod ve kubectl logs analiz",
      "horizontal pod autoscaler hpa cpu bellek ölçekleme",
      "liveness ve readiness probe sağlık kontrolü",
      "oomkilled 137 bellek sınırı yetersizliği k8s"
    ],
    "baslik": "Kubernetes (K8s) Cluster: CrashLoopBackOff Giderme, OOMKilled & HPA Otomatik Ölçekleme",
    "ikon": "💻",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Canlı Ortam İhlali / Anlık Müdahale",
    "akilliFisilti": "💻 Pod Exit Code 137 (OOMKilled) alıyorsa container memory limit değeri aşılmıştır; resources.limits.memory güncellenmeli ve HPA tetiklenmelidir.",
    "oncedenYapilacaklar": [
      "`kubectl describe pod <pod-name>` ile pod olaylarını ve en son exit code durumunu incele",
      "`kubectl logs <pod-name> --previous` komutu ile çöken uygulamanın son stack trace loglarını al",
      "Liveness/Readiness probe timeout ve initialDelaySeconds sürelerini uygulamanın ayağa kalkışına göre optimize et",
      "HPA (Horizontal Pod Autoscaler) metriklerini kontrol ederek CPU/Memory eşiğinde otomatik pod artışını doğrula"
    ]
  },
  {
    "id": "bilisim_postgresql_pgvector_ve_index_vakum_optimizasyonu",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "postgresql yavaş sorgu pg_stat_statements",
      "autovacuum dead tuples temizleme ve bloat",
      "pgvector hnsw index embedding benzerlik araması",
      "explain analyze sorgu planı maliyet optimizasyonu",
      "wal write ahead log replikasyon gecikmesi lag"
    ],
    "baslik": "PostgreSQL Veritabanı: EXPLAIN ANALYZE, pgvector HNSW İndeks & Autovacuum Bloat Bakımı",
    "ikon": "🗄️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık DB Bakımı / Ağır Yük Dönemi",
    "akilliFisilti": "🗄️ pgvector tablosundaki vektör benzerlik aramalarında HNSW indeksi oluşturulmalı; ölü satırlar (dead tuples) için VACUUM ANALYZE çalıştırılmalıdır.",
    "oncedenYapilacaklar": [
      "`pg_stat_statements` görünümünden en çok CPU ve IO tüketen yavaş sorguları tespit et",
      "Ağır sorguları `EXPLAIN (ANALYZE, BUFFERS)` ile çalıştırıp Seq Scan yerine Index Scan kullanıldığını doğrula",
      "Vektörel arama tablolarında `CREATE INDEX ON table USING hnsw (embedding vector_cosine_ops)` indeksini inşa et",
      "Tablolardaki şişmeyi (bloat) gidermek için autovacuum scale factor parametrelerini optimize et"
    ]
  },
  {
    "id": "bilisim_ci_cd_gitlab_actions_ve_sonarqube_kod_guvenligi",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "ci cd pipeline gitlab actions derleme hatası",
      "sonarqube statik kod analizi sAST quality gate",
      "dependency vulnerability snyk npm audit tarama",
      "docker container image trivy güvenlik taraması",
      "semantic versioning ve otomatik tag release"
    ],
    "baslik": "DevSecOps & CI/CD Pipeline: SonarQube Quality Gate, Snyk Bağımlılık & Trivy İmaj Taraması",
    "ikon": "🚀",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Pull Request / Master Branch Merge",
    "akilliFisilti": "🚀 Quality Gate başarısız olan veya kritik CVE zafiyeti bulunan container imajları production pipeline'ında otomatik olarak engellenmelidir.",
    "oncedenYapilacaklar": [
      "SonarQube SAST taramasında Kod Kokuları, Bug ve Güvenlik Açıklarının (Security Hotspots) durumunu kontrol et",
      "`snyk test` veya `npm audit` ile projedeki açık kaynak kütüphane zafiyetlerini (CVE) tara",
      "Trivy CLI ile Docker base image içerisindeki OS seviyesi güvenlik açıklarını tespit et",
      "Tüm testler ve güvenlik kapıları yeşil yandığında üretim ortamına sıfır kesinti (Blue/Green Deployment) ile deploy et"
    ]
  },
  {
    "id": "bilisim_ssl_tls_sertifika_yenileme_ve_dnssec_yapilandirma",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "ssl tls sertifika süresi bitişi yenileme",
      "let's encrypt certbot otomatik yenileme cron",
      "dnssec kayıtları ds rrset ve dkim spf dmarc",
      "hsts preload ve tls 1.3 güvenlik yapılandırması",
      "wildcard ssl csr oluşturma ve ca doğrulaması"
    ],
    "baslik": "Web Güvenliği & Altyapı: Let's Encrypt SSL/TLS Yenileme, DNSSEC & DMARC/SPF Sıkılaştırma",
    "ikon": "🔐",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Sertifika Bitişine 15 Gün Kala",
    "akilliFisilti": "🔐 SSL/TLS sertifikası bitmeden önce yenilenmeli; e-posta güvenliği için DMARC \"p=reject\" ve DNSSEC DS kayıtları doğrulanmalıdır.",
    "oncedenYapilacaklar": [
      "`certbot renew --dry-run` komutu ile otomatik SSL yenileme cron job döngüsünü test et",
      "Nginx / HAProxy yapılandırmasında TLS 1.0 ve 1.1 protokollerini kapatıp sadece TLS 1.2 ve 1.3'ü aktif tut",
      "HSTS (Strict-Transport-Security) başlığını `max-age=31536000; includeSubDomains; preload` olarak ekle",
      "Alan adı DNS panelinde DNSSEC, SPF, DKIM ve DMARC kayıtlarının geçerliliğini MXToolbox üzerinden doğrula"
    ]
  },
  {
    "id": "insaat_geoteknik_jet_grouting_ve_kazik_yukleme_deneyi",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "jet grouting zemin iyileştirme kolon çapı",
      "fore kazık statik eksenel yükleme deneyi astm d1143",
      "zemin etüdü sondaj logu ve srvt penetrasyon testi",
      "derin kazı iksa sistemi ankraj germe kuvveti",
      "inklinometre deplasman ölçümü ve oturma kontrolü"
    ],
    "baslik": "Geoteknik & İksa: Jet Grouting, Kazık Eksenel Yükleme Deneyi & İnklinometre",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Temel & Zemin İyileştirme Fazı",
    "akilliFisilti": "🏗️ Zemin iyileştirmede Jet Grout basınç/debi parametreleri kayıt altına alınmalı; test kazıklarında tasarım yükünün 1.5-2.0 katı Statik Yükleme Deneyi (ASTM D1143) yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Jet Grouting imalatında çimento şerbeti su/çimento oranını ve enjeksiyon bar basıncını monitörize et",
      "Fore kazıklarda süreklilik testini (PIT - Pile Integrity Test) tamamlayarak gövde sürekliliğini doğrula",
      "Statik eksenel yükleme deneyinde hidrolik kriko ve komparatör saatleri ile kademeli yükleme-oturma eğrisini çiz",
      "Derin kazı iksa perdesinde inklinometre borularından haftalık yatay deplasman okumalarını yap"
    ]
  },
  {
    "id": "insaat_tbdy_2018_mevcut_bina_performans_analizi_ve_karot",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "tbdy 2018 türkiye bina deprem yönetmeliği performans",
      "mevcut bina deprem güvenliği raporu ve karot alımı",
      "donatı korozyonu paspayı ve ferroskan donatı tarama",
      "doğrusal olmayan artımsal itme analizi pushover",
      "kontrollü hasar hedef performans düzeyi göçmenin önlenmesi"
    ],
    "baslik": "TBDY 2018: Mevcut Bina Performans Analizi, Karot Testi & Pushover Analizi",
    "ikon": "🏢",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Riskli Yapı Tespiti & Güçlendirme Projesi",
    "akilliFisilti": "🏢 TBDY 2018 Bölüm 15 uyarınca kapsamlı bilgi düzeyinde her kattan en az 3 adet karot alınmalı, donatı röntgeni ile sıyırma yapılarak korozyon tespit edilmelidir.",
    "oncedenYapilacaklar": [
      "Binanın taşıyıcı kolon ve perdelerinden TS EN 12504-1 standardına uygun karot numuneleri alarak laboratuvara sevk et",
      "Manyetik donatı tarama cihazı (Ferroscan) ile paspayı, etriye aralığı ve kanca açısını belirle",
      "Doğrusal veya Doğrusal Olmayan İtme (Pushover) Analizi ile yapının Göçmenin Önlenmesi (GÖ) veya Kontrollü Hasar (KH) durumunu hesapla",
      "Yapı Denetim ve Çevre Şehircilik Bakanlığı formatına uygun Teknik Deprem Performans Raporunu tanzim et"
    ]
  },
  {
    "id": "insaat_santiye_hakedis_yesil_defter_ve_atasman_roleveleri",
    "category": "finans",
    "domain": "INSAAT",
    "keywords": [
      "şantiye aylık hakediş raporu yeşil defter",
      "ataşman röleve krokisi ve demir metraj cetveli",
      "revize birim fiyat ve yeni fiyat analizi yfa",
      "yapı denetim hak ediş onay formu ve şantiye şefi",
      "kesinti ve cezalar ihzarat faturası kontrolü"
    ],
    "baslik": "Şantiye Hakediş: Yeşil Defter, Demir Metrajı, Ataşman Röleveleri & YFA",
    "ikon": "📐",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Ayın 25-30'u Arası Hakediş Dönemi",
    "akilliFisilti": "📐 Aylık şantiye hakedişi; yerinde alınan ataşman röleveleri, demir metraj cetveli ve Yeşil Defter kümülatif miktarları üzerinden idareye/işverene sunulur.",
    "oncedenYapilacaklar": [
      "Ay içinde dökülen beton, döşenen donatı ve imalat kalemlerinin yerinde ölçüm krokilerini (ataşman) hazırla",
      "Yeşil Deftere kümülatif imalat metrajlarını işleyerek önceki hakediş farkını netleştir",
      "Projeden farklı gelişen veya sözleşmede bulunmayan yeni imalat kalemleri için Yeni Fiyat Analizi (YFA) tutanağı düzenle",
      "Şantiye Şefi ve Yapı Denetim Kontrol Mühendisi onayını alarak Fatura ve Hakediş İcmalini muhasebeye teslim et"
    ]
  },
  {
    "id": "insaat_celik_yapi_kaynak_ndt_ve_torklu_bulon_montaji",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "çelik konstrüksiyon montajı tork kontrollü bulon",
      "kaynak tahribatsız muayene ndt ultrasonik ut testi",
      "manyetik parçacık mt ve penetrant pt kontrolü",
      "en 1090 çelik yapı imalat uygunluk belgesi",
      "epoksi astar ve yangın geciktirici intümesan boya mikron"
    ],
    "baslik": "Çelik Yapı: EN 1090 İmalat, Torklu Bulon, NDT Kaynak Muayenesi & İntümesan Boya",
    "ikon": "🔩",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Çelik Montajı & Kaynak Muayene Aşaması",
    "akilliFisilti": "🔩 Taşıyıcı çelik kaynak birleşimlerinde Seviye 2 NDT uzmanı tarafından UT/MT testleri yapılmalı; tork anahtarı ile bulon sıkma momentleri kalibre edilmelidir.",
    "oncedenYapilacaklar": [
      "Taşıyıcı kolon-kiriş alın birleşimlerinde 10.9 kalite bulonları kalibre edilmiş tork anahtarı ile torkla",
      "Tam penetrasyonlu küt kaynak dikişlerinde Ultrasonik Muayene (UT) ve Manyetik Parçacık (MT) raporlarını arşivle",
      "Çelik profillerin kuru film boya kalınlığını (DFT) manyetik mikron ölçer ile ölç",
      "Yangın dayanımı için şartnamede belirtilen R60/R120 intümesan yangın geciktirici boya sertifikasını dosyala"
    ]
  },
  {
    "id": "insaat_bim_lod350_lod400_clash_detection_navisworks",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "bim bina bilgi modellemesi lod 350 lod 400",
      "navisworks çakışma testi clash detection raporu",
      "revit mimari statik mekanik elektrik mep koordinasyonu",
      "bim uygulama planı bep ve ortak veri ortamı cde",
      "as-built model ve ifc dosya formatı ihracı"
    ],
    "baslik": "BIM Koordinasyonu: LOD 350/400, Navisworks Çakışma Analizi (MEP) & As-Built",
    "ikon": "💻",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Proje Koordinasyonu & İmalat Çizimi Öncesi",
    "akilliFisilti": "💻 İmalat öncesi Mimari, Statik ve MEP disiplin modelleri Navisworks ortamında birleştirilerek Sıfır-Çakışma (Zero-Clash) koordinasyon raporu üretilmelidir.",
    "oncedenYapilacaklar": [
      "Mimari, Statik ve Mekanik/Elektrik (MEP) Revit modellerini Ortak Veri Ortamında (CDE) senkronize et",
      "Navisworks Manage üzerinde Hard Clash ve Clearance tolerans testlerini çalıştırarak çakışma matrisini oluştur",
      "LOD 350/400 seviyesinde askı, ankraj ve boru/kanal geçiş rezervasyonlarını modelde netleştir",
      "Haftalık BIM Koordinasyon toplantısında revizyonları BCF (BIM Collaboration Format) ile disiplin liderlerine ata"
    ]
  },
  {
    "id": "elektrik_ges_scada_mppt_ve_pr_performans_orani_analizi",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "güneş enerji santrali ges scada izleme sistemi",
      "invertör mppt verimi ve dc ac güç oranı",
      "santral performans oranı pr ratio analizi iec 61724",
      "pv dizi termal kamera drone ile hotspot tespiti",
      "og trafo köşkü kesici açma ve izole eldiven manevrası"
    ],
    "baslik": "GES & Güneş Enerjisi: SCADA İzleme, MPPT Dizi Analizi, PR Hesabı & Hotspot Taraması",
    "ikon": "☀️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Günlük SCADA İzleme & Periyodik Bakım",
    "akilliFisilti": "☀️ Santral Performans Oranı (PR) IEC 61724 standardına göre günlük takip edilmeli; drone termal kamera ile panellerdeki Hotspot ve baypas diyot arızaları taranmalıdır.",
    "oncedenYapilacaklar": [
      "SCADA sistemi üzerinden invertör string DC akım/gerilim eğrilerini kontrol ederek arızalı dizileri izole et",
      "Işınım sensörü (Piranometre) ve meteoroloji istasyonu verileriyle günlük Performans Oranını (PR) hesapla",
      "Termal kameralı İHA ile PV panel dizilerinde hücre yanması ve mikrokırık (Hotspot) taramasını tamamla",
      "OG hücrelerinde SF6 gaz basıncı, röle ayar setleri ve topraklama sürekliliğini kontrol et"
    ]
  },
  {
    "id": "elektrik_trafo_yagi_dga_cozunmus_gaz_ve_dielektrik_testi",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "güç transformatörü yağı çözünmüş gaz analizi dga",
      "trafo yağı dielektrik delinme gerilimi testi iec 60156",
      "buchholz rölesi gaz birikmesi ve termik açma alarmı",
      "sargı izolasyon direnci meger ve polarizasyon indeksi pi",
      "kademe değiştirici oltc kontak direnci ölçümü"
    ],
    "baslik": "Yüksek Gerilim & Trafo: Yağ Çözünmüş Gaz Analizi (DGA), Dielektrik Test & Meger",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yıllık Trafo Bakımı / Alarm Durumunda",
    "akilliFisilti": "⚡ Trafo yağında DGA gaz analizi (Asetilen, Hidrojen, Metan) ark ve aşırı ısınmayı erken teşhis eder; yağ delinme gerilimi minimum 50 kV seviyesinde olmalıdır.",
    "oncedenYapilacaklar": [
      "Transformatör alt numune alma vanasından steril cam tüpe hava almadan yağ numunesi al",
      "Laboratuvarda Gaz Kromatografisi ile IEC 60599 standardına göre Duval Üçgeni çözünmüş gaz analizini (DGA) yaptır",
      "Otomatik yağ test cihazında IEC 60156 delinme gerilimi (Breakdown Voltage) ölçümünü gerçekleştir",
      "Primer ve sekonder sargıların Meger ile İzolasyon Direnci (IR) ve Polarizasyon İndeksi (PI) değerlerini kaydet"
    ]
  },
  {
    "id": "elektrik_bina_otomasyonu_knx_bacnet_ddc_panosu",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "bina otomasyon sistemi bms ddc pano montajı",
      "knx aydınlatma ve iklimlendirme otomasyonu ets5",
      "bacnet ip modbus rtu haberleşme ağ geçidi gateway",
      "fancoil vrf 0-10v oransal vana motoru kalibrasyonu",
      "enerji analizörü modbus register adresi sorgulama"
    ],
    "baslik": "Bina Otomasyonu: KNX / BACnet Entegrasyonu, DDC Pano & 0-10V Kalibrasyon",
    "ikon": "🏢",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Otomasyon Devreye Alma & Test",
    "akilliFisilti": "🏢 DDC panosunda analog giriş/çıkış (0-10V / 4-20mA) sinyalleri kalibre edilmeli, BACnet IP/Modbus gateway üzerinden SCADA merkeziyle haberleşme doğrulanmalıdır.",
    "oncedenYapilacaklar": [
      "KNX bus hattında polarite ve hat sonlandırıcı direncini kontrol ederek ETS yazılımıyla adreslemeyi yükle",
      "DDC panolarında sıcaklık sensörleri (PT1000/NTC) ve damper motorlarının (0-10V) sinyal testlerini yap",
      "Modbus enerji sayaçlarının baud rate ve parity parametrelerini ayarlayarak BMS sunucusuna bağla",
      "Yangın otomasyonu senaryosunda klima santrallerinin (AHU) durdurulması ve yangın damperlerinin kapanma testini yap"
    ]
  },
  {
    "id": "elektrik_faraday_kafesi_ve_espotansiyel_kusaklama_olcumu",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "yıldırımdan korunma faraday kafesi ts en 62305",
      "yakalama ucu indirme iletkeni ve test klemensi",
      "temel topraklaması ve eşpotansiyel dengeleme barası",
      "toprak geçiş direnci meger ölçümü 4 kazıklı wenner",
      "parafudur tip 1 tip 2 b c sınıfı aşırı gerilim koruma"
    ],
    "baslik": "TS EN 62305: Faraday Kafesi, Eşpotansiyel Kuşaklama & Toprak Direnci Ölçümü",
    "ikon": "⚡",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Periyodik Yıllık İSG/Elektrik Kontrolü",
    "akilliFisilti": "⚡ Yıldırımdan korunma sistemi indirme iletkenleri sürekliliği ve test klemensinden ölçülen geçiş direnci TS EN 62305 gereği 10 Ohm'un altında olmalıdır.",
    "oncedenYapilacaklar": [
      "Çatı üstü yakalama uçları ve iletken ağ gözü mesafelerini (Risk seviyesine göre 5x5m veya 10x10m) denetle",
      "Test klemenslerini ayırarak kalibre edilmiş Toprak Megeri ile 3/4 kazıklı yöntemle direnç ölçümünü yap",
      "Ana pano girişine Tip 1+Tip 2 (B+C Sınıfı) AG Parafudur takıldığını ve topraklama barasına bağlandığını doğrula",
      "Elektrik Mühendisleri Odası (EMO) onaylı \"Yıldırımdan Korunma ve Topraklama Ölçüm Raporunu\" tanzim et"
    ]
  },
  {
    "id": "elektrik_ups_jenerator_ats_otomatik_transfer_salteri_testi",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "kesintisiz güç kaynağı ups akü deşarj testi",
      "dizel jeneratör ats otomatik transfer şalteri motorlu şalter",
      "statik bypass anahtarı ve akü iç direnç empedans ölçümü",
      "şebeke kesintisi yük altında jeneratör devreye girme süresi",
      "ups harmonik thdv thdi aktif güç faktörü düzeltme"
    ],
    "baslik": "Kritik Güç: UPS Akü Empedans Testi, Dizel Jeneratör & ATS Senkronizasyonu",
    "ikon": "🔋",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Aylık Yük Testi & Yıllık Bakım",
    "akilliFisilti": "🔋 Kritik veri merkezlerinde ve hastanelerde ATS transfer süresi (10-15 saniye) simüle edilmeli; UPS akü gruplarında tek tek iç direnç ve deşarj testi uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Akü bloklarının tek tek iç direnç (mOhm) ve kutup gerilimlerini kalibre akü test cihazıyla kaydet",
      "Şebeke enerjisini ana kesiciden keserek ATS transfer şalterinin jeneratörü start etme ve yükü alma süresini kronometreyle ölç",
      "UPS statik bypass ve inverter mod geçişlerini yük altında kesintisiz (0 ms) olarak test et",
      "Jeneratör karter ısıtıcısı, yakıt seviyesi, akü şarj redresörü ve motor yağ basıncını kontrol et"
    ]
  },
  {
    "id": "makine_cnc_5_eksen_sifirlama_ve_tool_setter_olcum",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "5 eksen cnc işleme merkezi iş parçası sıfırlama",
      "otomatik takım boyu ve yarıçapı ölçümü tool setter",
      "spindle salgısı komparatör saati mikron ölçümü",
      "g-kodu simülasyonu vericut çarpışma kontrolü",
      "kesici uç aşınması ve takım ömrü kompanzasyonu"
    ],
    "baslik": "CNC 5-Eksen: Sıfırlama (WCS), Tool Setter Takım Ölçümü & Salgı Kontrolü",
    "ikon": "⚙️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "İş Parçası Bağlama & Parça İşleme Öncesi",
    "akilliFisilti": "⚙️ 5 eksen işlemede döner tabla kinematik sıfır noktası ve takım boyu lazer/dokunmatik prob ile mikron mertebesinde kalibre edilmeli, CAM çarpışma testi onaylanmalıdır.",
    "oncedenYapilacaklar": [
      "3D Renishaw prob ile iş parçasının G54/G55 referans koordinatlarını otomatik olarak bul ve tezgaha aktar",
      "Takım magazindeki tüm freze uçlarının boy ve radyüs değerlerini dahili Tool Setter ile ölçerek ofset tablosuna yaz",
      "Spindle şaftına komparatör dayayarak dinamik salgının (Run-out) 3 mikronu geçmediğini doğrula",
      "İşlemeye başlamadan önce NC kodunu CAM/Vericut yazılımında çarpışma (Collision) analizinden geçir"
    ]
  },
  {
    "id": "makine_hidrolik_oransal_valf_kalibrasyon_ve_iso_4406_yag_partikul",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "hidrolik güç ünitesi oransal valf kalibrasyonu",
      "iso 4406 hidrolik yağ partikül kirlilik sınıfı 16 14 11",
      "hidrolik akümülatör azot n2 basınç dolumu",
      "emme ve dönüş filtreleri diferansiyel basınç göstergesi",
      "hidrolik pompa debi basınç testi ve kavitasyon sesi"
    ],
    "baslik": "Hidrolik Sistem: Oransal Valf Kalibrasyonu, ISO 4406 Partikül Sayımı & Azot Akümülatör",
    "ikon": "🛢️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Periyodik Hidrolik Bakım & Yağ Kontrolü",
    "akilliFisilti": "🛢️ Oransal ve servo valflerin ömrü için hidrolik yağ kirliliği ISO 4406 standardında en az 16/14/11 sınıfında tutulmalı; akümülatör N2 ön dolum basıncı kontrol edilmelidir.",
    "oncedenYapilacaklar": [
      "Online lazer partikül sayıcı ile hidrolik yağ numunesinin ISO 4406 (4µm, 6µm, 14µm) temizlik kodunu belirle",
      "Servo/Oransal yön denetim valflerinin sürücü kartı sıfır noktası ve akım-debi karakteristiğini kalibre et",
      "Azot dolum aparatı ve manometre ile hidrolik akümülatörün N2 gaz basıncını sistem gereksinimine göre tamamla",
      "Basınç ve dönüş hattı mikronik filtrelerinin tıkanıklık indikatörlerini fiziki muayene et"
    ]
  },
  {
    "id": "makine_kompresor_ciy_noktasi_dewpoint_ve_kacak_taramasi",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "vidalı hava kompresörü basınçlı hava kaçak tespiti",
      "ultrasonik kaçak dedektörü desibel ve debi kaybı",
      "kimyasal adsorpsiyonlu hava kurutucusu çiğ noktası dew point",
      "basınçlı hava tankı periyodik hidrostatik test ve emniyet ventili",
      "kompresör vida grubu yağ seperatörü ve vida sıcaklığı"
    ],
    "baslik": "Basınçlı Hava: Ultrasonik Kaçak Taraması, Dew Point (-40°C) & Seperatör Bakımı",
    "ikon": "💨",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Enerji Verimliliği Taraması & Aylık Bakım",
    "akilliFisilti": "💨 Basınçlı hava hatlarında ultrasonik dedektörle kaçak taraması yapılarak enerji kaybı önlenmeli; kurutucu çıkış çiy noktası (Pressure Dew Point) izlenmelidir.",
    "oncedenYapilacaklar": [
      "Ultrasonik akustik kaçak tespit cihazı ile fabrika basınçlı hava boru hattındaki kaçak noktalarını desibel/maliyet olarak etiketle",
      "Kurutucu çıkışındaki Çiy Noktası (Dew Point) sensörünün -40°C Class 1-2 hava kalitesini sağladığını teyit et",
      "Vidalı kompresörün yağ seperatörü fark basıncını ve vida bloku basma sıcaklığını (85-95°C) kontrol et",
      "Hava tankı otomatik tahliye (drain) valfinin çalıştığını ve yoğuşma suyunun yağ ayırıcıya gittiğini doğrula"
    ]
  },
  {
    "id": "makine_endustriyel_kazan_su_sartlandirma_tds_ve_blof",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "buhar kazanı su şartlandırma kimyasalları oksijen tutucu",
      "otomatik yüzey ve dip blöf sistemi iletkenlik tds",
      "kazan besi suyu sertlik ölçümü fransız sertliği",
      "emniyet ventili açma basıncı testi ve seviye elektrotları",
      "degazör kulesi sıcaklığı 102 derece ve korozyon önleme"
    ],
    "baslik": "Buhar Kazanı: Su Şartlandırma, TDS Otomatik Blöf, Degazör & Seviye Emniyeti",
    "ikon": "🔥",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Günlük Kazan İşletme & Su Analiz Rutini",
    "akilliFisilti": "🔥 Buhar kazanında kışır ve korozyonu önlemek için besi suyu sertliği 0 °Fr olmalı, Degazör 102°C'de çalıştırılmalı ve TDS iletkenlik değerine göre otomatik blöf yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Besi suyu yumuşatma ünitesi çıkışından numune alarak toplam sertliğin 0 Fransız derecesi olduğunu titrasyonla ölç",
      "Kazan suyu iletkenliğini (TDS) ölçerek yüzey blöf kontrolörü set değerini (maks 3000-4000 µS/cm) ayarla",
      "Kazan düşük/yüksek su seviye elektrotlarını (Magnezyum/Mekanik Seviye Şalteri) manuel test butonlarıyla simüle et",
      "Degazör sıcaklığının en az 102°C olduğunu teyit ederek oksijen tutucu (Sodyum Sülfit/Tannin) dozaj pompasını kontrol et"
    ]
  },
  {
    "id": "makine_titresim_fft_spektrum_ve_rulman_hasar_analizi",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "kestirimci bakım titreşim analizi vibration fft",
      "rulman hasar frekansları bpfo bpfi bsf ftf",
      "akselerometre titreşim hızı rms mm saniye iso 10816",
      "lazerli kaplin ve şaft hizalama tolerans cetveli",
      "dinamik balans alma yerinde balans tek düzlem çift düzlem"
    ],
    "baslik": "Kestirimci Bakım: FFT Titreşim Analizi (ISO 10816), Rulman Hasar Frekansı & Balans",
    "ikon": "📈",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Aylık Kestirimci Bakım Ölçümü",
    "akilliFisilti": "📈 Motor ve pompa yataklarından alınan titreşim ivme spektrumunda (FFT) BPFO/BPFI frekansları rulman iç/dış bilezik hasarını rulman kilitlenmeden aylar önce haber verir.",
    "oncedenYapilacaklar": [
      "Manyetik tabanlı piezoelektrik ivmeölçer (akselerometre) ile yataklardan yatay, dikey ve eksenel titreşim topla",
      "ISO 10816-3 standardına göre Titreşim Hızı RMS (mm/s) değerini sınıf sınırlarıyla karşılaştır",
      "Titreşim spektrumundaki tepe noktalarından 1X/2X dönme frekansı (balanssızlık/hizalamasızlık) ve harmonikleri incele",
      "Lazerli şaft hizalama cihazı ile motor-pompa kaplin eksen kaçıklığını 0.05 mm toleransına getir"
    ]
  },
  {
    "id": "bilisim_kubernetes_zero_downtime_upgrade_ve_etcd_backup",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "kubernetes küme yükseltme zero downtime rolling upgrade",
      "etcd snapshot yedekleme ve felaket kurtarma disaster recovery",
      "k8s node cordon drain ve uncordon komutları",
      "ingress controller sertifika yenileme cert manager",
      "pod disruption budget pdb ve readiness probe kontrolü"
    ],
    "baslik": "DevOps & K8s: Kubernetes Sıfır-Kesinti Yükseltme, etcd Snapshot & PDB",
    "ikon": "☸️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Küme Yükseltme Penceresi / Bakım Saati",
    "akilliFisilti": "☸️ Kubernetes yükseltmesi öncesinde etcd snapshot yedeği alınmalı; Node'lar tek tek `drain` edilip Pod Disruption Budget (PDB) ile sıfır kesinti garanti edilmelidir.",
    "oncedenYapilacaklar": [
      "`etcdctl snapshot save` komutuyla tüm küme durumunun şifreli yedek snapshot'ını alıp uzak depolamaya aktar",
      "Hedef Node üzerindeki iş yüklerini güvenli tahliye etmek için `kubectl cordon` ve `kubectl drain` çalıştır",
      "Kubeadm ve Kubelet paketlerini bir üst minor sürüme yükseltip Pod Readiness Probe'ların yeşile dönmesini bekle",
      "Yükseltme tamamlanınca Node'u `kubectl uncordon` ile yeniden trafiğe aç ve sıradaki Node'a geç"
    ]
  },
  {
    "id": "bilisim_owasp_top10_penetrasyon_ve_guvenlik_yama_sureci",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "owasp top 10 web güvenlik açığı taraması zapp",
      "sql injection xss csrf ssrf güvenlik yaması",
      "snyk sonarqube statik kod analizi sast dast",
      "penetrasyon sızma testi bulgu raporu kapatma",
      "jwt token gizli anahtar rotasyonu ve rbac izin kontrolü"
    ],
    "baslik": "Siber Güvenlik: OWASP Top 10 Zafiyet Taraması, SAST/DAST & Pen-Test İyileştirmesi",
    "ikon": "🔒",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Güvenlik Denetimi & Sürüm Öncesi Tarama",
    "akilliFisilti": "🔒 CI/CD boru hattına entegre SAST/DAST tarayıcıları ve Pen-Test raporundaki kritik/yüksek zafiyetler (SQLi, IDOR, SSRF) üretime çıkış öncesi zorunlu kapatılmalıdır.",
    "oncedenYapilacaklar": [
      "SonarQube ve Snyk raporlarındaki kritik güvenlik açıklarını ve savunmasız bağımlılık kütüphanelerini güncelle",
      "Kullanıcı girdi doğrulama katmanında parametrik sorgular ve sanitization uygulayarak SQLi ve XSS açıklarını gider",
      "API uç noktalarında Broken Object Level Authorization (BOLA/IDOR) kontrollerini yetki middleware'i ile sıkılaştır",
      "Üçüncü taraf sızma testi firmasına doğrulama testi (Re-test) yaptırarak temiz güvenlik raporunu arşivle"
    ]
  },
  {
    "id": "bilisim_postgresql_pgbouncer_connection_pooling_ve_vacuum",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "postgresql connection pooling pgbouncer ayarları",
      "autovacuum analyze ve tablo şişmesi bloat temizliği",
      "pg_stat_statements yavaş sorgu slow query optimizasyonu",
      "b-tree indeks rebuild reindex ve explain analyze",
      "veritabanı replikasyonu streaming replication lag takibi"
    ],
    "baslik": "Veritabanı Mühendisliği: PostgreSQL PgBouncer, Autovacuum & İndeks Optimizasyonu",
    "ikon": "🐘",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık DB Bakımı & Yüksek Trafik Optimizasyonu",
    "akilliFisilti": "🐘 Yüksek eşzamanlı trafikte PgBouncer ile bağlantı havuzlama yapılandırılmalı; `pg_stat_statements` ile yavaş sorgular EXPLAIN ANALYZE edilerek indekslenmelidir.",
    "oncedenYapilacaklar": [
      "PgBouncer üzerinde transaction pooling modunu aktif ederek veritabanı max_connections tüketimini sınırla",
      "Yoğun UPDATE/DELETE alan tablolarda ölü satırları (Dead Tuples) temizlemek için Vacuum Analyze parametrelerini tune et",
      "En çok CPU/IO tüketen sorguları `pg_stat_statements` tablosundan tespit edip eksik indeksleri (B-Tree/GIN) ekle",
      "Standby replika sunucularındaki Replication Lag (Replay Lag) süresinin milisaniyeler seviyesinde olduğunu doğrula"
    ]
  },
  {
    "id": "bilisim_kafka_consumer_lag_ve_partition_rebalance_yonetimi",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "apache kafka consumer group lag izleme prometheus",
      "partition sayısı ve rebalance storm fırtınası önleme",
      "kafka offset commit ve at least once at most once delivery",
      "dead letter queue dlq ve zehirli mesaj poison pill",
      "kafka cluster broker jvm heap ve disk iops optimizasyonu"
    ],
    "baslik": "Mesaj Kuyrukları: Apache Kafka Consumer Lag, Rebalance Önleme & DLQ Mimarisi",
    "ikon": "📨",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Gerçek Zamanlı Kuyruk & Olay İzleme",
    "akilliFisilti": "📨 Kafka tüketici gruplarında (Consumer Group) Lag artışı anında tüketici instance sayısı partition adedine kadar ölçeklendirilmeli; hatalı mesajlar DLQ kuyruğuna alınmalıdır.",
    "oncedenYapilacaklar": [
      "Grafana/Prometheus üzerinden topic bazlı Consumer Lag ve mesaj üretim/tüketim hızını izle",
      "Aşırı uzun süren iş parçacıklarının `max.poll.interval.ms` süresini aşarak Rebalance fırtınası yaratmasını engelle",
      "İşlenemeyen hatalı veya bozuk payload'ları sistemin kilitlenmemesi için Dead Letter Queue (DLQ) topic'ine yönlendir",
      "Broker disk doluluk oranlarını ve JVM Garbage Collection (GC) duraklama sürelerini optimize et"
    ]
  },
  {
    "id": "bilisim_terraform_iac_drift_detection_ve_state_kilidi",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "terraform altyapı kodlama iac drift tespiti",
      "terraform state s3 backend ve dynamodb state locking",
      "terraform plan apply pipeline ve sentinel ilke denetimi",
      "cloudflare aws gcp kaynak provizyonu ve terraform modülleri",
      "terraform destroy önleme lifecycle prevent_destroy"
    ],
    "baslik": "Bulut Altyapısı: Terraform IaC Drift Tespiti, State Locking & Modül Mimarisi",
    "ikon": "☁️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Altyapı Değişikliği & CI/CD Pipeline",
    "akilliFisilti": "☁️ Bulut altyapı değişiklikleri yalnızca Terraform IaC üzerinden yapılmalı; uzaktan state kilit mekanizması (DynamoDB) ve `terraform plan` çıktısı onaylanarak uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Terraform backend olarak S3/GCS ve eşzamanlı çakışmaları önlemek için DynamoDB Lock tablosunu yapılandır",
      "Planlı CI/CD boru hattında `terraform plan -detailed-exitcode` çalıştırarak konfigürasyon kaymalarını (Drift) yakala",
      "Kritik veritabanı ve depolama kaynaklarına `lifecycle { prevent_destroy = true }` bloğu ekle",
      "Güvenlik ve maliyet politikaları için Open Policy Agent (OPA) veya Sentinel ile kural uyumluluğunu doğrula"
    ]
  },
  {
    "id": "teknik_itfaiye_hazmat_seviye_a_ve_notralizasyon",
    "category": "ev_teknik",
    "domain": "TEKNIK",
    "keywords": [
      "itfaiye tehlikeli madde sızıntısı hazmat seviye a tulumu",
      "gaz dedektörü toxic kimyasal madde kaçak tespiti",
      "scba pozitif basınçlı solunum tüpü 300 bar",
      "kimyasal döküntü nötralizasyonu ve dekontaminasyon çadırı",
      "un numarası ve tehlikeli madde güvenlik bilgi formu msds"
    ],
    "baslik": "İtfaiye & HAZMAT: Seviye A Gaz Geçirmez Tulum, Dekontaminasyon & Kimyasal Nötralizasyon",
    "ikon": "🚒",
    "renk": "#FECACA",
    "varsayilanZaman": "Tehlikeli Madde Sızıntısı & Yangın Müdahalesi",
    "akilliFisilti": "🚒 Kimyasal sızıntılarda Seviye A tam sızdırmaz tulum ve pozitif basınçlı SCBA ile müdahale edilmeli; çıkışta zorunlu dekontaminasyon duşu kurulmalıdır.",
    "oncedenYapilacaklar": [
      "Sızan maddenin UN numarasını ve MSDS formundaki acil müdahale kılavuzunu (ERG) tespit et",
      "300 Bar SCBA solunum tüpü ve tam sızdırmaz Seviye A kimyasal koruyucu tulumu giy",
      "Sızıntı alanının rüzgar yönüne göre sıcak/ılık/soğuk bölgelerini belirleyip Dekontaminasyon Çadırını kur",
      "Kimyasal döküntüyü uygun nötralizan bariyer/absorban ile çevreleyip Tehlikeli Atık fıçısına izole et"
    ]
  },
  {
    "id": "teknik_oto_can_bus_osiloskop_ve_iletisim_hatasi_teshisi",
    "category": "arac_ulasim",
    "domain": "TEKNIK",
    "keywords": [
      "araç can-bus iletişim ağı osiloskop dalga formu",
      "can-high ve can-low sinyal gerilimi 2 5v diferansiyel",
      "120 ohm hat sonlandırma direnci multimetre ölçümü",
      "obd2 u-kodları ağ iletişim hatası teşhisi",
      "ecu kontrol ünitesi haberleşme kopukluğu şase kontrolü"
    ],
    "baslik": "Oto Mekatronik: CAN-Bus Osiloskop Sinyal Analizi, 120Ω Direnç & U-Kod Teşhisi",
    "ikon": "🔧",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Ağ Arızası & Gösterge Arıza Lambaları Yandığında",
    "akilliFisilti": "🔧 Araçta ağ iletişim hatalarında (U-Kodları) CAN-H (3.5V) ve CAN-L (1.5V) sinyal kare dalgaları osiloskop ile incelenmeli; hat sonlandırma direnci 60 Ohm ölçülmelidir.",
    "oncedenYapilacaklar": [
      "OBD portundan CAN-High (Pin 6) ve CAN-Low (Pin 14) arasına multimetre bağlayıp 60 Ohm (2x120Ω paralel) direncini doğrula",
      "2 kanallı dijital osiloskop ile CAN-H ve CAN-L diferansiyel sinyal dalga formlarını, parazit ve şaseye kısa devreleri görüntüle",
      "Arıza teşhis cihazı (DTC) ile modüller arası veri iletişimini kesen arızalı kontrol ünitesini (ECU/ABS/BCM) izole et",
      "Kablo demetindeki soket oksitlenmelerini ve şase bağlantı cıvatalarını torklayarak iletişim ağını yeniden başlat"
    ]
  },
  {
    "id": "teknik_chiller_freon_ve_superheat_subcooling_olcum",
    "category": "ev_teknik",
    "domain": "TEKNIK",
    "keywords": [
      "endüstriyel soğutma chiller grubu r134a r410a şarjı",
      "superheat kızgınlık ve subcooling aşırı soğutma hesabı",
      "dijital manifold manometre ve boru kelepçeli sıcaklık probu",
      "termostatik genleşme valfi txv ayarı ve kompresör akımı",
      "soğutma kulesi kireç temizliği ve kondenser basıncı"
    ],
    "baslik": "Endüstriyel Soğutma: Chiller Superheat / Subcooling, Gaz Şarjı & TXV Ayarı",
    "ikon": "❄️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Sezonluk Devreye Alma & Performans Ölçümü",
    "akilliFisilti": "❄️ Chiller verimi için evaporatör çıkışında Superheat (5-8 K) ve kondenser çıkışında Subcooling (3-6 K) değerleri dijital manifold ile hassas ölçülerek gaz dengesi sağlanmalıdır.",
    "oncedenYapilacaklar": [
      "Dijital manometreyi emme ve basma servis vanalarına bağlayarak doymuş buharlaşma/yoğuşma sıcaklıklarını oku",
      "Boru sıcaklık probları ile emme borusu sıcaklığını ölçüp Doyma Sıcaklığından çıkararak Superheat değerini hesapla",
      "Termostatik Genleşme Valfini (TXV) ayarlayarak kompresöre sıvı freon yürümesini (sıvı darbesi) engelle",
      "Soğutucu gaz kaçak dedektörü ile flanş ve rekor bağlantılarında sızdırmazlık testini tamamla"
    ]
  },
  {
    "id": "teknik_asansor_periyodik_kirmizi_etiket_ve_parasut_fren_testi",
    "category": "ev_teknik",
    "domain": "TEKNIK",
    "keywords": [
      "asansör periyodik kontrol yönetmeliği a tipi muayene",
      "kırmızı etiket giderme ve 60 günlük yasal süre",
      "hız regülatörü ve paraşüt fren mekanizması aşırı hız testi",
      "asansör kuyu dibi tampon mesafesi ve halat klemensleri",
      "kabin kapısı çift emniyet kontağı ve acil kurtarma devresi"
    ],
    "baslik": "Asansör Bakımı: Kırmızı Etiket Giderme, Paraşüt Fren & Regülatör Testi",
    "ikon": "🛗",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yıllık A Tipi Muayene / 60 Günlük Kusur Süresi",
    "akilliFisilti": "🛗 Kırmızı etiketli asansörlerin kusurları 60 gün içinde giderilmezse mühürlenir; Hız Regülatörü ve Paraşüt Güvenlik Freni testi mühendis kontrolünde yapılmalıdır.",
    "oncedenYapilacaklar": [
      "A Tipi Muayene Kuruluşu raporundaki uygunsuzlukları (Kırmızı/Sarı etiket) kalem kalem incele",
      "Kabin askı çelik halatlarının çap aşınmasını kumpasla ölç ve halat klemens torklarını kontrol et",
      "Hız regülatörünü tetikleyerek kabin paraşüt fren bloklarının raylara kilitlendiğini boş/yüklü test et",
      "Kat kapı kilit kontaklarının ve kuyu dibi sınır emniyet şalterlerinin elektriksel devresini doğrula"
    ]
  },
  {
    "id": "teknik_dogalgaz_rmsa_istasyonu_regulator_ve_slam_shut",
    "category": "ev_teknik",
    "domain": "TEKNIK",
    "keywords": [
      "doğalgaz rms-a rms-b basınç düşürme ve ölçüm istasyonu",
      "slam-shut emniyet kapatma vanası set basıncı",
      "doğalgaz regülatörü membran ve pilot vana temizliği",
      "koku verme ünitesi tht tetrahidrotiyofen dozajı",
      "istasyon filtre seperatör fark basıncı dp manometresi"
    ],
    "baslik": "Doğalgaz RMS-A: Basınç Regülatörü, Slam-Shut Emniyet Vanası & THT Koku",
    "ikon": "🔥",
    "renk": "#FED7AA",
    "varsayilanZaman": "Aylık Gaz Dağıtım İstasyonu Bakımı",
    "akilliFisilti": "🔥 RMS istasyonunda Slam-Shut aşırı/düşük basınç kapatma vanaları test edilmeli; şehir şebekesine verilen gaz THT (Tetrahidrotiyofen) ile standart oranda kokulandırılmalıdır.",
    "oncedenYapilacaklar": [
      "Giriş ve çıkış manometrelerini kontrol ederek regülatörün istenen şebeke basıncını sabit tuttuğunu teyit et",
      "Slam-Shut emniyet kapatma vanasını basınç yükselterek/düşürerek tetikle ve anında kapattığını doğrula",
      "Kartuş filtre seperatör Diferansiyel Basınç (dP) göstergesini okuyarak tıkanıklık durumunda filtreyi yenile",
      "THT koku dozaj pompasını kontrol ederek gaz kokululuk seviyesini burun/cihaz test cihazıyla ölç"
    ]
  },
  {
    "id": "insaat_natm_tunel_puskurtme_beton_ve_celik_hasir",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "natm yeni avusturya tünel açma yöntemi",
      "püskürtme beton shotcrete priz hızlandırıcı katkı",
      "tünel iksa çelik hasır q ve süren boru umbrellapole",
      "konverjans ölçümü tünel içi deformasyon lazer tarayıcı",
      "kaya kütle sınıflandırması rmr ve q sistemi"
    ],
    "baslik": "Tünel Mühendisliği (NATM): Shotcrete, Süren Boru & Lazer Konverjans Ölçümü",
    "ikon": "🚇",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Tünel Kazı Ayna İlerlemesi & İksa Fazı",
    "akilliFisilti": "🚇 NATM tünel kazısında ayna açıldıktan sonra ilk 2 saat içinde çelik hasır, süren borular ve priz hızlandırıcılı püskürtme beton (Shotcrete) uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Ayna jeolojisini inceleyerek RMR kaya kütle puanına göre birincil iksa sınıfını (Kategori B/C) belirle",
      "Tünel tavanına süren boruları (Umbrella Arch) çakıp çimento enjeksiyonuyla tahkimatı sağla",
      "Robotik püskürtme beton kolu ile tasarım kalınlığında (15-25 cm) lif takviyeli püskürtme betonu uygula",
      "Tünel kesitine takılan 3D prizma hedeflerinden total station ile günlük konverjans (oturma/daralma) okumalarını yap"
    ]
  },
  {
    "id": "insaat_zemin_civilemesi_soil_nailing_ve_sev_stabilitesi",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "zemin çivilemesi soil nailing iksa sistemi",
      "şev stabilitesi güvenlik katsayısı limit denge bishop",
      "zemin çivisi korozyon korumalı donatı enjeksiyonu",
      "şev yüzeyi drenaj boruları barbakan ve geotekstil keçe",
      "çekme testi pull out test çivi taşıma gücü"
    ],
    "baslik": "Geoteknik & Şev Emniyeti: Soil Nailing, Bishop Stabilite Analizi & Barbakan",
    "ikon": "⛰️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Kazı Kademesi & Şev Güvenliği",
    "akilliFisilti": "⛰️ Derin kazı şevlerinde Soil Nailing zemin çivileri kademeli uygulanmalı, su basıncını tahliye etmek için delikli barbakan boruları yerleştirilmelidir.",
    "oncedenYapilacaklar": [
      "Geoteknik stabilite yazılımında (GeoStudio/Slide) şev Güvenlik Katsayısının (FOS >= 1.5) sağlandığını modelle",
      "Delgi makinesiyle 15° aşağı eğimle açılan deliklere korozyon kılıflı donatıları yerleştirip çimento şerbeti enjekte et",
      "Test çivilerinde hidrolik kriko ile Pull-Out (Çekme) deneyi yaparak tasarım sürtünme direncini doğrula",
      "Shotcrete yüzeyine hidrostatik basıncı düşürmek için 2 metre aralıklarla geotekstil filtreli barbakan boruları tak"
    ]
  },
  {
    "id": "insaat_taze_beton_slump_cokme_ve_hava_miktari_testi",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "taze beton çökme slump deneyi ts en 12350 2",
      "abrams konisi 3 kademe 25er şişleme standardı",
      "taze betonda hava miktarı tayini basınç yöntemi",
      "transmikser irsaliyesi su çimento oranı ve beton sıcaklığı",
      "şantiyede betona yetkisiz su katma yasağı"
    ],
    "baslik": "TS EN 12350-2: Abrams Konisi Slump Deneyi, Hava Miktarı & Numune Alma",
    "ikon": "🏗️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Beton Mikseri Şantiye Kabulü",
    "akilliFisilti": "🏗️ Transmikser şantiyeye geldiğinde Abrams konisi ile 3 kademede 25'er kez şişlenerek Slump (Kıvam) ölçülmeli; betona ASLA ilave su katılmamalıdır.",
    "oncedenYapilacaklar": [
      "Hazır beton irsaliyesindeki sınıfı (C30/37), kıvam sınıfını (S4: 160-210 mm) ve çıkış saatini denetle",
      "Abrams konisini düz bir sac üzerine koyup 3 eşit tabakada 25'er vuruşla standart şişleme yaparak slump yüksekliğini ölç",
      "Hava sürüklenmiş dış saha betonlarında basınç tipi hava ölçer ile taze hava yüzdesini (%4-6) kontrol et",
      "Küp/silindir numune kalıplarını yağlayıp numuneleri alarak 24 saat sonra 20°C su kür havuzuna aktar"
    ]
  },
  {
    "id": "insaat_mantolama_isi_yalitimi_dubel_cekme_ve_yangin_barProgress",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "dış cephe ısı yalıtımı mantolama ts en 13499",
      "taşyünü yangın bariyeri pencere üstü kuşağı",
      "mantolama dübel çekme testi m2ye minimum 6 adet",
      "donatı filesi alkali dayanımlı 160 gr ve fileli köşe profili",
      "mineral sıva ve dış cephe son kat boya uygulaması"
    ],
    "baslik": "Dış Cephe Mantolama: Taşyünü Yangın Kuşağı, Dübel Çekme Testi & Donatı Filesi",
    "ikon": "🏢",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Dış Cephe İskele İmalat Aşaması",
    "akilliFisilti": "🏢 Binaların Yangından Korunması Yönetmeliği gereğince kat aralarında ve pencere üstlerinde A1 sınıfı Taşyünü Yangın Bariyeri yapılmalı; m²'ye en az 6 dübel atılmalıdır.",
    "oncedenYapilacaklar": [
      "EPS/Taşyünü levhaları çerçeve-nokta yöntemiyle yapıştırma harcı sürerek cepheye mastarında yapıştır",
      "Pencere üstü ve kat geçişlerinde en az 30 cm genişliğinde yanmaz taşyünü yangın şeritlerini kesintisiz dön",
      "Harç prizini aldıktan sonra gazbeton/tuğla zemin yapısına uygun çelik/plastik çivili dübelleri m²'ye 6-8 adet çak",
      "160 gr/m² alkali dayanımlı cam elyaf fileyi 10 cm bindirme payı ile sıva katı içerisine göm"
    ]
  },
  {
    "id": "insaat_kule_vinc_ankraj_ruzgar_kilidi_ve_periyodik_muayene",
    "category": "ev_teknik",
    "domain": "INSAAT",
    "keywords": [
      "şantiye kule vinç montajı temel gömme ankrajı",
      "kule vinç rüzgar serbesti fren açma rüzgar kilidi",
      "akredite a tipi muayene periyodik kontrol raporu",
      "yük ve moment sınırlayıcı sınır şalteri testi",
      "kule vinç bom halatı kanca emniyet mandalı ve topraklama"
    ],
    "baslik": "Şantiye Vinç Güvenliği: Temel Ankrajı, Moment Sınırlayıcı & Rüzgar Serbesti",
    "ikon": "🏗️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Vinç Kurulumu & Günlük Vardiya Sonu",
    "akilliFisilti": "🏗️ Kule vinç vardiya bitiminde rüzgar yönüne serbest dönecek şekilde Rüzgar Kilidi (Fren) açık bırakılmalı; moment ve aşırı yük şalterleri periyodik test edilmelidir.",
    "oncedenYapilacaklar": [
      "Kule vinç temel ankraj pabuçlarının statik hesaplara ve tork değerlerine uygunluğunu kontrol et",
      "Yük kaldırma kancasında emniyet mandalı, aşırı yük kesici (Load Limiter) ve Bom eğim şalterlerini test et",
      "Makine Mühendisleri Odası / Akredite kuruluş onaylı \"Kule Vinç Periyodik Kontrol Raporunu\" dosyala",
      "Vardiya sonunda kancayı en üst seviyeye çekip dönüş frenini serbest (Weather-vaning) konumuna al"
    ]
  },
  {
    "id": "elektrik_res_pitch_yaw_ve_ruzgar_yonlendirme_kontrolu",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "rüzgar türbini res kanat pitch açısı kontrolü",
      "yaw yönlendirme motoru rüzgar gülü anomometre",
      "rüzgar türbini kule titreşimi ve jeneratör sargı sıcaklığı",
      "res trafo köşkü sf6 kesici ve scada şebeke senkronizasyonu",
      "fırtına modu kanatları bayraklama feathering durdurma"
    ],
    "baslik": "RES & Rüzgar Türbini: Kanat Pitch Açısı, Yaw Yönlendirme & Bayraklama Modu",
    "ikon": "💨",
    "renk": "#CFFAFE",
    "varsayilanZaman": "SCADA RES İzleme & Fırtına Alarmı",
    "akilliFisilti": "💨 Fırtına rüzgar hızında (>25 m/s) türbin kanatları 90° bayraklama (Feathering) pozisyonuna alınarak aerodinamik frenleme ile güvenli duruşa geçirilmelidir.",
    "oncedenYapilacaklar": [
      "Anemometre ve rüzgar bayrağından gelen verilere göre Yaw dişlisinin nasel yönünü rüzgara dik tuttuğunu doğrula",
      "Rüzgar hızına göre bağımsız hidrolik/elektrikli Pitch motorlarının kanat hücum açısını optimum güçte tuttuğunu izle",
      "Türbin ana şaft, dişli kutusu ve jeneratör rulman titreşim seviyelerini SCADA'dan takip et",
      "25 m/s üstü fırtına ikazında otomatik Cut-Out frenleme ve şebeke ayrılma senaryosunu test et"
    ]
  },
  {
    "id": "elektrik_harmonik_filtre_kompanzasyon_ve_thd_analizi",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "aktif harmonik filtre ahf ve pasif filtre reaktörü",
      "toplam harmonik bozulma thd-v yüzde 3 thd-i yüzde 5 sınırları",
      "şönt kondansatör rezonans önleme harmonik blokaj reaktörü",
      "enerji analizörü 51 inci harmoniğe kadar fft ölçümü",
      "epdk elektrik piyasası şebeke yönetmeliği reaktif ceza"
    ],
    "baslik": "Güç Kalitesi: Aktif Harmonik Filtre (AHF), THD Sınırları & Rezonans Önleme",
    "ikon": "⚡",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Enerji Analizörü Ölçümü & Pano Bakımı",
    "akilliFisilti": "⚡ EPDK Şebeke Yönetmeliği uyarınca THD-V <%3 ve THD-I <%5 seviyesinde tutulmalı; harmonikli tesislerde kondansatörler harmonik filtre reaktörüyle korunmalıdır.",
    "oncedenYapilacaklar": [
      "Sınıf A enerji analizörünü ana dağıtım panosu baralarına bağlayıp 24 saatlik harmonik spektrum kaydı al",
      "5., 7., 11. ve 13. baskın akım harmoniklerini Aktif Harmonik Filtre (AHF) akım trafolarıyla kompanze et",
      "Kondansatör kademelerinde rezonans riskini önlemek için p=%7 veya p=%14 harmonik blokaj reaktörlerini kontrol et",
      "Endüktif ve kapasitif reaktif oranların (Endüktif <%20, Kapasitif <%15) ceza sınırları altında kaldığını teyit et"
    ]
  },
  {
    "id": "elektrik_osos_uzaktan_sayac_okuma_ve_rs485_modem",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "otomatik sayaç okuma sistemi osos modem haberleşmesi",
      "rs-485 iletken polarite ve 120 ohm sonlandırma direnci",
      "elektronik elektrik sayacı optik port ve dlms cosem protokolü",
      "epiaş uzaktan sayaç veri aktarımı ve günlük profil eğrisi",
      "gsm gprs endüstriyel modem ve sim kart data hattı"
    ],
    "baslik": "EPİAŞ OSOS: Sayaç Otomasyonu, RS-485 / DLMS-COSEM & GPRS Modem",
    "ikon": "📟",
    "renk": "#DCFCE7",
    "varsayilanZaman": "OSOS Devreye Alma & Gün Sonu Veri Aktarımı",
    "akilliFisilti": "📟 OSOS sisteminde sayaçlar RS-485 veri yolu üzerinden DLMS protokolüyle okunur; her gece saat 24:00 profil yük eğrisi EPİAŞ portalına aktarılmalıdır.",
    "oncedenYapilacaklar": [
      "RS-485 A(+) ve B(-) sinyal kablolarının ekranlı (STP) çekildiğini ve hatta 120Ω sonlandırma direnci takıldığını teyit et",
      "Optik okuma başlığı ve yazılımı ile sayacın baud rate (9600 bps) ve seri numara parametrelerini yapılandır",
      "GPRS endüstriyel modemin APN ayarlarını yaparak Dağıtım Şirketi OSOS sunucusuyla ping testini doğrula",
      "EPİAŞ portalından günlük 15 dakikalık periyotlarla Reaktif/Aktif tüketim profilinin okunduğunu onayla"
    ]
  },
  {
    "id": "elektrik_yg_bara_ayiricisi_ve_topraklama_bicagi_kilitleme",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "yüksek gerilim trafo merkezi bara ayırıcısı manevrası",
      "topraklama bıçağı mekanik kilit castell kilit sistemi",
      "kesici açık pozisyonunda ayırıcı açma manevra sırası",
      "5 güvenlik kuralı gerilimin kesilmesi ve emniyet kilidi",
      "yüksek gerilim manevra yetki belgesi ve manevra formu"
    ],
    "baslik": "Yüksek Gerilim Emniyeti: Ayırıcı / Kesici Manevra Sırası, Topraklama Bıçağı & Kilit",
    "ikon": "🔒",
    "renk": "#FEE2E2",
    "varsayilanZaman": "YG Manevra & Trafo Bakım Öncesi",
    "akilliFisilti": "🔒 YG hücresinde manevra sırası: ÖNCE Kesici açılır, SONRA Ayırıcı açılır, EN SON Topraklama Bıçağı kapatılır ve kilitlenir; tersi ASLA yapılamaz.",
    "oncedenYapilacaklar": [
      "İşletme Teknisyeni ve YG Sorumlu Mühendisi imzalı resmi \"Manevra Talimat Formunu\" hazırla",
      "Yük altında ark patlamasını önlemek için SF6/Vakumlu Kesiciyi açıp göstergeden açık konumunu doğrula",
      "Hat ve Bara Ayırıcılarını açıp mekanik kilit (Castell Kilit) anahtarını çıkar",
      "Yüksek Gerilim Dedektörü ile 0 Volt testi yapıp Topraklama Bıçağını kapat ve LOTO asma kilidini tak"
    ]
  },
  {
    "id": "elektrik_yangin_algilama_adresli_loop_ve_kisa_devre_izolator",
    "category": "ev_teknik",
    "domain": "ELEKTRIK_ELEKTRONIK",
    "keywords": [
      "adresli yangın algılama paneli loop çevrim hattı",
      "kısa devre izolatör modülü ve açık devre arıza tespiti",
      "optik duman ve sıcaklık dedektörü adresleme dip switch",
      "yangın senaryosu duman tahliye fanı ve asansör acil iniş",
      "en 54 standartlarına uygun yangın alarm testi"
    ],
    "baslik": "EN 54 Yangın Otomasyonu: Adresli Çevrim (Loop), İzolatör Modülü & Duman Senaryosu",
    "ikon": "🔥",
    "renk": "#FED7AA",
    "varsayilanZaman": "Aylık Yangın Paneli Testi & Devreye Alma",
    "akilliFisilti": "🔥 Yangın Loop çevriminde kısa devre izolatör modülleri hattı korur; duman test gazıyla tetiklenen dedektör yangın senaryosunu (fan açma/asansör çağırma) çalıştırmalıdır.",
    "oncedenYapilacaklar": [
      "Loop çevrim kablosunda (J-Y(St)Y veya LIHCH) toprak kaçağı ve direnç sürekliliğini multimetreyle doğrula",
      "Her 20-25 dedektör arasına konulan Kısa Devre İzolatörünün hattı izole etme kabiliyetini simüle et",
      "Test gazı sıkarak duman dedektörünün adresi ve oda numarasının yangın santral ekranında doğru yandığını gör",
      "Yangın röle modülünün havalandırma klima santrallerini durdurup acil anons ve turnikeleri serbest bıraktığını sına"
    ]
  },
  {
    "id": "makine_enjeksiyon_sicak_yolluk_ve_mengene_tonaj_hesabi",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "plastik enjeksiyon makinesi mengene kilitleme tonajı",
      "sıcak yolluk hot runner pid sıcaklık kontrol cihazı",
      "enjeksiyon basıncı ütüleme tutma basıncı ve soğuma süresi",
      "kalıp göz sayısı ve izdüşüm alanı cm2 tonaj hesabı",
      "vida geri dönüş emiş ve hammadde nem alma kurutucu kurutma"
    ],
    "baslik": "Plastik Enjeksiyon: Hot Runner PID Kontrolü, Mengene Tonajı & Ütüleme Basıncı",
    "ikon": "⚙️",
    "renk": "#E2E8F0",
    "varsayilanZaman": "Kalıp Bağlama & Üretim Başlangıcı",
    "akilliFisilti": "⚙️ Kalıp çapaklanmasını ve parça çarpılmasını önlemek için izdüşüm alanına göre mengene kilitleme tonajı hesaplanmalı; Hot Runner bölgeleri PID ile ısıtılmalıdır.",
    "oncedenYapilacaklar": [
      "Kalıptaki ürün ve yolluğun toplam izdüşüm alanını (cm²) plastik akış basıncıyla çarparak gerekli mengene tonajını hesapla",
      "Sıcak yolluk kontrol ünitesindeki (Hot Runner) meme ve manifold ısıtıcılarını kademeli olarak (180°C -> 230°C) ısıt",
      "Kalıp kapatma sonu yavaşlama ve kalıp koruma emniyet basıncını mikron bazlı cetvelden ayarla",
      "Hammadde (PA/ABS/PP) nem alma kurutucu (Dehumidifier) süresini ve çiğ noktasını (-40°C) kontrol et"
    ]
  },
  {
    "id": "makine_pnomatik_frl_sartlandirici_ve_yaglayici_dozu",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "pnömatik şartlandırıcı frl filtre regülatör yağlayıcı",
      "pnömatik silindir hava basıncı 6 bar regülasyonu",
      "otomatik su tahliye otomatik drain filtre haznesi",
      "pnömatik yağlama damla ayarı dakikada 1-2 damla iso vg 32",
      "pnömatik valf adası ve susturucu tıkanıklık kontrolü"
    ],
    "baslik": "Pnömatik Sistem: FRL Şartlandırıcı, 6-Bar Basınç Regülasyonu & Yağlayıcı Dozajı",
    "ikon": "💨",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık Makine Bakımı & Hat Kontrolü",
    "akilliFisilti": "💨 Pnömatik piston ve yön valflerinin ömrü için FRL ünitesi 6.0 Bar basınca kilitlenmeli; yağlayıcı haznesi ISO VG 32 yağ ile dakikada 1-2 damlaya ayarlanmalıdır.",
    "oncedenYapilacaklar": [
      "Hava regülatörü kilit mekanizmasını çekerek hat basıncını 6.0 Bar seviyesine ayarla ve kilitle",
      "5 mikronluk filtre haznesindeki yoğuşma suyunun otomatik tahliye valfinden atıldığını doğrula",
      "Pnömatik yağlayıcı ayar vidasını ayarlayarak silindir hareket sıklığına göre optik damla göstergesini izle",
      "Valf adası egzoz susturucularını (Silencer) kontrol ederek tıkanma nedeniyle hız kaybı oluşmasını engelle"
    ]
  },
  {
    "id": "makine_mekanik_salmastra_ve_api_plan_yikama_sistemleri",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "santrifüj pompa mekanik salmastra mechanical seal",
      "api plan 11 api plan 53a bariyer sıvı termosifon tankı",
      "salmastra sürtünme yüzeyleri silisyum karbür karbon",
      "pompa mil salgısı ve kavitasyon kaynaklı salmastra sızıntısı",
      "bariyer sıvı azot basınçlandırma ve seviye şalteri"
    ],
    "baslik": "Akışkan Emniyeti: Mekanik Salmastra (Mechanical Seal), API Plan 53A & Bariyer Sıvısı",
    "ikon": "🛢️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Pompa Devreye Alma & Periyodik Kaçak Kontrolü",
    "akilliFisilti": "🛢️ Tehlikeli kimyasal pompalarda çift mekanik salmastra API Plan 53A termosifon tankı ile korunmalı; bariyer sıvı basıncı pompa basıncının 1.5 bar üzerinde tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Salmastra montajında silisyum karbür ve tungsten karbür sürtünme yüzeylerine kesinlikle elle değmeden temiz alkolle sil",
      "API Plan 53A termosifon tankını sentetik bariyer sıvısıyla doldurup azot regülatöründen basınçlandır",
      "Pompa miline komparatör bağlayarak eksenel gezinti ve radyal salgının (Run-out < 0.04 mm) toleransta olduğunu teyit et",
      "Pompayı ilk çalıştırmada salmastra odasının havasını (Vent) tahliye ederek kuru çalışma hasarını önle"
    ]
  },
  {
    "id": "makine_rockwell_hrc_ve_vickers_sertlik_olcumu",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "metal sertlik ölçüm cihazı rockwell hrc vickers hv",
      "elmas koni uç 150 kg ön yük ve ana yük uygulaması",
      "ısıl işlem sementasyon ıslah çeliği sertlik derinliği",
      "kalibrasyon mastar bloğu doğrulama testi astm e18",
      "yüzey pürüzlülüğü ra rz ve taşlama kalitesi"
    ],
    "baslik": "Malzeme Muayenesi: Rockwell C (HRC) Sertlik Ölçümü, ASTM E18 & Kalibrasyon Mastarı",
    "ikon": "💎",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Isıl İşlem Sonrası Kalite Kontrol",
    "akilliFisilti": "💎 Isıl işlem gören parçalarda Rockwell HRC sertliği standart mastar blokla doğrulanmış cihazda 3 farklı noktadan ölçülerek ortalaması alınır.",
    "oncedenYapilacaklar": [
      "Cihazı bilinen sertlikteki (Örn: 62.5 HRC) referans kalibrasyon mastar bloğuyla test ederek doğrula",
      "Ölçüm yapılacak numune yüzeyini zımparalayarak tufal ve oksit tabakasını temizle",
      "120° elmas koni ucu parçaya temas ettirip 10 kg ön yük ve 140 kg ana yükü otomatik uygulatarak HRC değerini oku",
      "Kenar etkisini önlemek için parça kenarından ve diğer basma izinden en az 3 kat uç çapı mesafede ölçüm yap"
    ]
  },
  {
    "id": "makine_endustriyel_robot_tcp_ve_eksen_mastering",
    "category": "ev_teknik",
    "domain": "MAKINE",
    "keywords": [
      "endüstriyel 6 eksen robot kolu kuka abb fanuc",
      "takım merkez noktası tcp tool center point 4 nokta yöntemi",
      "robot eksen sıfırlama mastering kalibrasyon probu",
      "robotik kaynak punta boya yörünge doğruluğu tekrarlanabilirlik",
      "güvenlik çemberi emniyet lazer alan tarayıcısı interlock"
    ],
    "baslik": "Robotik Otomasyon: 6-Eksen Robot TCP Kalibrasyonu, Mastering & Emniyet Lazer",
    "ikon": "🤖",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Robotik Hücre Kurulumu & Fener Değişimi",
    "akilliFisilti": "🤖 Robot kaynak torcu veya tutucu (Gripper) değişiminde 4-Nokta Yöntemiyle TCP kalibre edilmeli; eksen kaymalarında EMD/Mastering probuyla sıfırlama yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Referans sabit sivri uç etrafında robot bileğini 4 farklı oryantasyonda yaklaştırarak TCP koordinatlarını hesaplat",
      "Hesaplanan TCP hata yarıçapının (Error < 0.2 mm) üretim toleransı dahilinde olduğunu doğrula",
      "Robot kol mekanik çentik veya optik kalibrasyon probu ile 6 eksenin mekanik sıfır (Mastering) noktalarını güncelle",
      "Hücre giriş emniyet kilidini (Interlock) ve lazer alan tarayıcı yavaşlama/durma bölgelerini (Safety Zone) test et"
    ]
  },
  {
    "id": "bilisim_redis_eviction_policy_ve_sentinel_failover",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "redis dağıtık bellek önbellek mimarisi maxmemory",
      "redis bellek tahliye politikası allkeys-lru volatile-lfu",
      "redis sentinel otomatik failover master slave replikasyon",
      "redis cluster sharding ve hash slot dağılımı",
      "cache stampede önleme ve mutex lock desenleri"
    ],
    "baslik": "Veri Mimarisi: Redis Dağıtık Önbellek, allkeys-LRU & Sentinel Otomatik Yük Devri",
    "ikon": "🔴",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yüksek Trafik & Önbellek Optimizasyonu",
    "akilliFisilti": "🔴 Redis maxmemory dolduğunda OOM hatası almamak için `allkeys-lru` tahliye politikası yapılandırılmalı; Sentinel ile Master çökmesinde otomatik Failover sağlanmalıdır.",
    "oncedenYapilacaklar": [
      "`redis.conf` dosyasında RAM sınırını (`maxmemory 8gb`) ve tahliye kuralını (`maxmemory-policy allkeys-lru`) tanımla",
      "En az 3 adet Redis Sentinel düğümü kurarak Quorum sayısını 2 olarak ayarla",
      "Master düğümü durdurarak Sentinel'in Slave düğümü saniyeler içinde yeni Master olarak terfi ettirdiğini doğrula",
      "Cache Stampede etkisini engellemek için arka planda asenkron yenileme veya Dağıtık Kilit (Redlock) mekanizması ekle"
    ]
  },
  {
    "id": "bilisim_graphql_dataloader_ve_n1_sorgu_cozumu",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "graphql api sorgu optimizasyonu n+1 query problemi",
      "dataloader kütüphanesi toplu getirme batching memoization",
      "graphql karmaşıklık analizi query complexity and depth limit",
      "graphql federation ve microservices schema stitching",
      "apollo server tracing ve resolver execution time profiling"
    ],
    "baslik": "API Mühendisliği: GraphQL N+1 Problemi, DataLoader Batching & Derinlik Limiti",
    "ikon": "🕸️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "API Geliştirme & Veritabanı Yük Analizi",
    "akilliFisilti": "🕸️ GraphQL resolver'larında iç içe sorgularda veritabanını boğan N+1 problemini çözmek için DataLoader ile sorgular tek bir `WHERE IN (?)` batching işlemine dönüştürülür.",
    "oncedenYapilacaklar": [
      "İlişkisel verileri çeken field resolver'larda tek tek SQL çalıştırmak yerine DataLoader instance'ı oluştur",
      "DataLoader'ın `batchFn` fonksiyonu ile istek bazında ID listesini toplayıp tek seferde toplu veritabanı sorgusu at",
      "Kötü niyetli derin iç içe sorguları engellemek için `graphql-depth-limit` kuralını maksimum 5 derinliğe ayarla",
      "Apollo Tracing ile resolver yürütme sürelerini profilleyerek 50ms üzerindeki darboğazları tespit et"
    ]
  },
  {
    "id": "bilisim_nginx_upstream_keepalive_ssl_stapling_http2",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "nginx reverse proxy ters vekil sunucu yapılandırması",
      "upstream keepalive bağlantı havuzu ve socket tüketimi",
      "ocsp stapling ssl tls el sıkışma hızlandırma",
      "http 2 protokolü multiplexing ve gzip brotli sıkıştırma",
      "ddos koruması limit_req_zone ve limit_conn_zone rate limiting"
    ],
    "baslik": "Web Performansı: NGINX Ters Proxy, Upstream Keepalive, HTTP/2 & OCSP Stapling",
    "ikon": "🌐",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Üretim Sunucusu Dağıtımı & Web Sunucu Ayarı",
    "akilliFisilti": "🌐 NGINX konfigürasyonunda arka uç sunucularla TCP el sıkışma yükünü azaltmak için `upstream` bloğuna `keepalive 64` eklenmeli, HTTP/2 ve OCSP Stapling açılmalıdır.",
    "oncedenYapilacaklar": [
      "NGINX upstream bloğunda backend sunucularla bağlantıyı sıcak tutmak için `keepalive 32;` ve `proxy_http_version 1.1;` ayarla",
      "`ssl_stapling on;` ve `ssl_stapling_verify on;` direktifleriyle istemci SSL doğrulama süresini hızlandır",
      "Hızlı sayfa yükleme için `listen 443 ssl http2;` ve statik dosyalar için Brotli/Gzip sıkıştırmasını aktif et",
      "API uç noktalarında brute-force saldırılarını önlemek için `limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;` kur"
    ]
  },
  {
    "id": "bilisim_argocd_gitops_ve_otomatik_rollback",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "gitops mimarisi argocd sürekli dağıtım cd",
      "kubernetes manifest senkronizasyonu autosync ve self-heal",
      "argocd rollback ve git commit geçmişine geri dönme",
      "helm chart ve kustomize overlay ortam yönetimi dev prod",
      "argocd rbac sso entegrasyonu ve github actions pipeline"
    ],
    "baslik": "GitOps & CD: ArgoCD Deklaratif Senkronizasyon, Self-Heal & Otomatik Geri Alma",
    "ikon": "🐙",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Canlıya Çıkış & Altyapı Yönetimi",
    "akilliFisilti": "🐙 ArgoCD ile Kubernetes kümeleri Git reposundaki deklaratif manifestolarla senkronize edilir; manuel müdahaleler Self-Heal ile düzeltilir ve bozuk sürüm anında Rollback edilir.",
    "oncedenYapilacaklar": [
      "Kubernetes Deployment, Service ve Ingress Helm chart'larını Git reposunda ana dalda versiyonla",
      "ArgoCD üzerinde `syncPolicy: { automated: { prune: true, selfHeal: true } }` aktif ederek drift oluşmasını engelle",
      "CI pipeline'ının (GitHub Actions) yeni Docker imaj etiketini Git manifest reposuna commit etmesini sağla",
      "Canlı ortamda sağlık kontrolü (Health Check) başarısız olduğunda ArgoCD arayüzünden tek tıkla önceki stabil commit'e dön"
    ]
  },
  {
    "id": "bilisim_elasticsearch_ilm_ve_shard_boyut_yonetimi",
    "category": "is_kariyer",
    "domain": "BILISIM",
    "keywords": [
      "elasticsearch kümesi indeks yaşam döngüsü ilm politikası",
      "shard boyut optimizasyonu ideal 30gb 50gb aralığı",
      "hot warm cold frozen tier veri katmanlaması",
      "logstash ve filebeat log indeksleme rollover indeksi",
      "elasticsearch cluster health red yellow green durum teşhisi"
    ],
    "baslik": "Büyük Veri & Arama: Elasticsearch ILM Yaşam Döngüsü, Shard Boyutu & Tier Katmanlama",
    "ikon": "🔍",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Log Yönetimi & Küme Sağlığı Denetimi",
    "akilliFisilti": "🔍 Elasticsearch shard boyutları 30-50 GB aralığında tutulmalı; eskiyen log indeksleri ILM politikasıyla Hot -> Warm -> Cold -> Delete aşamalarından geçirilmelidir.",
    "oncedenYapilacaklar": [
      "İndeks Yaşam Döngüsü Yönetimi (ILM) politikası oluşturup indeks boyutu 50 GB veya yaşı 30 güne ulaştığında Rollover tetikle",
      "Performansı artırmak için aktif logları SSD diskli Hot Tier düğümlere, 30 gün üzeri logları HDD diskli Cold Tier düğümlere taşı",
      "Küme durumunun (Cluster Health) `Yellow` veya `Red` olmasını önlemek için unassigned shard'ları `_cluster/reroute` ile onar",
      "Arama sorgularında CPU yükünü azaltmak için `match_phrase` yerine uygun analizörlü (ngram/edge_ngram) mapping tasarla"
    ]
  }
];
