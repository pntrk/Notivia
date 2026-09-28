import type { ShortScenarioMatch } from '../scenarioDatabase.ts';

/**
 * Notivia Bilişsel Modülü: ZIRAAT, TARIM_AV_BALIK, GASTRONOMI, TURIZM_KONAKLAMA_YIYECEK, GIDA
 * Toplam 116 Bilişsel Senaryo
 */
export const AGRICULTURE_GASTRONOMY_SCENARIOS: ShortScenarioMatch[] = [
  {
    "id": "gastronomi_blast_chiller_soklama",
    "category": "is_kariyer",
    "domain": "TURIZM_KONAKLAMA_YIYECEK",
    "keywords": [
      "blast chiller şoklama",
      "+60 dereceden +10 dereceye",
      "hızlı soğutma süresi",
      "tehlikeli sıcaklık bölgesi",
      "şok soğutucu"
    ],
    "baslik": "Blast Chiller Hızlı Soğutma (+60°C → +10°C < 120 Dk)",
    "ikon": "❄️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Pişirme Bitiminden İtibaren 2 Saat",
    "hazirlikZamani": "Gastro Tepsi Porsiyonlama",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Bakteriyel üremeyi (+5°C ile +60°C tehlikeli bölge) önlemek için sıcak pişen yemekler en geç 120 dakikada +10°C'nin altına şoklanmalıdır.",
    "oncedenYapilacaklar": [
      "Pişen yemeği ısının hızlı dağılması için sığ (maks. 5 cm) paslanmaz gastronom küvetlere yay",
      "Blast Chiller şok soğutucu dolabın batırma probunu yemeğin merkezine sapla",
      "Hızlı soğutma programını başlatarak sıcaklığın 90 dakikada +3°C'ye düştüğünü izle",
      "Şoklanan küvetlerin üzerine parti no, üretim saati ve STT etiketini basıp +4°C soğuk odaya kaldır"
    ]
  },
  {
    "id": "gastronomi_fritoz_yagi_tpm_olcum",
    "category": "is_kariyer",
    "domain": "TURIZM_KONAKLAMA_YIYECEK",
    "keywords": [
      "fritöz yağı tpm",
      "toplam polar madde %24",
      "kızartma yağı ölçüm cihazı",
      "yağ kalitesi testi",
      "fritöz yağ değişimi"
    ],
    "baslik": "Kızartma Yağı TPM (Toplam Polar Madde) Ölçümü",
    "ikon": "🍟",
    "renk": "#FED7AA",
    "varsayilanZaman": "Servis Öncesi (11:00 & 18:00)",
    "hazirlikZamani": "Yağ Isısının 160°C-180°C Olması",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Tarım ve Orman Bakanlığı tebliği gereği kızartma yağlarında TPM oranı %24'ü, polarite asitliği 2.5'i aştığında yağ derhal imha edilmelidir.",
    "oncedenYapilacaklar": [
      "Fritöz yağını çalışma sıcaklığına (170°C) getirip tortuları tel kevgirle süz",
      "Elektronik TPM yağ ölçüm cihazının sensörünü yağın orta seviyesine daldırıp hafifçe karıştır",
      "Dijital ekranda TPM değerini oku (%1-%18 Yeni/İdeal, %19-%24 Kritik, >%24 Kanserojen/İmha)",
      "TPM %24 üzerindeyse yağı atık yağ bidonuna tahliye et ve atık yağ teslim tutanağını imzala"
    ]
  },
  {
    "id": "gastronomi_72_saat_sahit_numune",
    "category": "is_kariyer",
    "domain": "TURIZM_KONAKLAMA_YIYECEK",
    "keywords": [
      "şahit numune kabı",
      "72 saat yemek numunesi",
      "zehirlenme şahit numune",
      "steril numune kavanozu",
      "toplu yemek numune"
    ],
    "baslik": "72 Saat Yemek Şahit Numune Alma Protokolü (+4°C)",
    "ikon": "🍱",
    "renk": "#FED7AA",
    "varsayilanZaman": "Servis Başlangıcında (Her Parti)",
    "hazirlikZamani": "Steril Numune Kavanozları & Etiket",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Toplu beslenme mevzuatı gereği her yemekten en az 250 gram steril kaplara alınıp +4°C dolapta 72 saat saklanması yasal zorunluluktur.",
    "oncedenYapilacaklar": [
      "Günün menüsündeki tüm sıcak, soğuk, salata ve tatlı çeşitlerinden steril kepçeyle 250 gr al",
      "Tek kullanımlık kilitli steril numune kavanozuna yemeği koyup kapağını hava almayacak şekilde kapat",
      "Kavanoz üzerine yemek adı, aşçı adı, üretim tarihi ve saatini gösteren barkodlu etiketi yapıştır",
      "Numune dolabına (+4°C) kaldır ve 72 saat dolduğunda imha tutanağıyla bertaraf et"
    ]
  },
  {
    "id": "gastronomi_dry_aged_nem_isi_kontrol",
    "category": "is_kariyer",
    "domain": "TURIZM_KONAKLAMA_YIYECEK",
    "keywords": [
      "dry-aged dolabı",
      "et dinlendirme nemi %80",
      "kuru dinlendirme sıcaklığı 1 derece",
      "himalaya tuzu et dolabı",
      "dry aged et"
    ],
    "baslik": "Dry-Aged Kuru Dinlendirme Nem (%80-85) & Isı (0-2°C) Takibi",
    "ikon": "🥩",
    "renk": "#FED7AA",
    "varsayilanZaman": "Günde 2 Kez (Sabah & Akşam)",
    "hazirlikZamani": "Himalaya Tuzu Tuğla Kontrolü",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Kuru et dinlendirmede sıcaklık 0°C - +2°C, bağıl nem %80-%85 ve hava akışı 0.5-2 m/s olmalıdır; sapma çürümeye yol açar.",
    "oncedenYapilacaklar": [
      "Özel camlı Dry-Aged dolabının dijital higrometre nem göstergesini (%80-%85) kontrol et",
      "Dolap içi hava sirkülasyon fanlarının ve UV-C sterilizasyon lambasının devrede olduğunu doğrula",
      "Etlerin üzerinde gri/beyaz faydalı küf tabakasının (Thamnidium) homojen gelişimini gözlemle",
      "Dinlenme gün sayısını (21, 28 veya 45 gün) etiket üzerinden takip ederek servis kesimini planla"
    ]
  },
  {
    "id": "gastronomi_atp_hijyen_swab_testi",
    "category": "is_kariyer",
    "domain": "TURIZM_KONAKLAMA_YIYECEK",
    "keywords": [
      "atp swab testi",
      "yüzey hijyen testi",
      "rlu değeri < 30",
      "tezgah temizlik kontrolü",
      "atp biyolüminesans"
    ],
    "baslik": "Mutfak Yüzey Hijyeni ATP Biyolüminesans Swab Testi",
    "ikon": "🧪",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kapanış Dezenfeksiyonu Sonrası",
    "hazirlikZamani": "Luminometre & Steril Swab Çubuğu",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Doğrama tahtaları ve tezgah temizliğinde ATP luminometre değeri <30 RLU olmalıdır; >100 RLU durumunda kimyasal dezenfeksiyon tekrarlanır.",
    "oncedenYapilacaklar": [
      "Temizlenip dezenfekte edilmiş paslanmaz çelik tezgah veya kesme tahtasından 10x10 cm alanda swab çubuğunu gezdir",
      "Swab çubuğunu reaktif tüpünün içine sokarak reaktif sıvıyla lüminesans reaksiyonunu aktive et",
      "Tüpü ATP Luminometre cihazına yerleştirip 15 saniyede RLU (Relative Light Unit) değerini oku",
      "Değer 30 RLU üzerindeyse yüzeyi klorlu/alkollü dezenfektanla yeniden yıkat ve test föyünü imzala"
    ]
  },
  {
    "id": "ziraat_feromon_tuzak_elma_ickurdu",
    "category": "resmi",
    "domain": "TARIM_AV_BALIK",
    "keywords": [
      "feromon tuzak sayımı",
      "elma içkurdu ilaçlama",
      "etkili sıcaklıklar toplamı",
      "eşeysel feromon",
      "kurt ilacı zamanı"
    ],
    "baslik": "Eşeysel Feromon Tuzağı & Elma İçkurdu İlaçlama Eşiği",
    "ikon": "🍎",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftada 2 Kez Tuzak Kontrolü",
    "hazirlikZamani": "Feromon Kapsül Yenileme (4-6 Hafta)",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🌿 Feromon tuzakta haftada parsel başına 2-3 ergin kelebek yakalandığında ve etkili sıcaklıklar toplamı aşıldığında ilaçlama başlatılır.",
    "oncedenYapilacaklar": [
      "Ağacın hakim rüzgar yönüne yerden 1.5-2 metre yükseklikte delta tipi yapışkan feromon tuzağı as",
      "Pazartesi ve Perşembe günleri yapışkan tablayı kontrol ederek yakalanan kelebek sayılarını föye yaz",
      "İlkbaharda kelebek uçuş eğrisinde tepe noktası (pik) görüldüğünde yumurta açılımı öncesi ilaçlama kararını al",
      "Arıların çalışmadığı akşam serinliğinde biyolojik veya hedef odaklı insektisit uygulamasını yap"
    ]
  },
  {
    "id": "ziraat_fertigasyon_ec_ph_dengesi",
    "category": "resmi",
    "domain": "TARIM_AV_BALIK",
    "keywords": [
      "fertigasyon ec ph",
      "damlama gübreleme ec",
      "gübre tankı ph 5.5",
      "azot potasyum oranı",
      "damlama gübre hesabı"
    ],
    "baslik": "Damlama Gübreleme (Fertigasyon) EC / pH & Besin Dengesi",
    "ikon": "🧪",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sulama Partisi Başlangıcı",
    "hazirlikZamani": "A ve B Gübre Tankı Karışımı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🌿 Kalsiyum ile fosfat/sülfat aynı tankta çöker (kireçleşme); fertigasyon suyu pH'ı 5.5-6.2, EC değeri 1.8-2.5 mS/cm olmalıdır.",
    "oncedenYapilacaklar": [
      "A tankına azot, potasyum ve mikro elementleri; B tankına kalsiyum nitratı ayrı ayrı çözdür",
      "Damlama besleme hattının çıkış suyundan numune alarak el tipi EC/pH metre ile ölç",
      "pH yüksekse sisteme nitrik/fosforik asit dozajını artırarak pH'ı 5.8 seviyesine düşür",
      "Sulama bitiminde borularda gübre kalıntısı kalmaması için hattı 15 dakika temiz suyla yıka"
    ]
  },
  {
    "id": "ziraat_sune_emgi_oran_tespiti",
    "category": "resmi",
    "domain": "TARIM_AV_BALIK",
    "keywords": [
      "süne emgi oranı",
      "buğday süne mücadelesi",
      "metrekarede süne sayımı",
      "nimf yoğunluğu",
      "süne ilaçlama kararı"
    ],
    "baslik": "Hububat Süne Nimf Yoğunluğu & İlaçlama Karar Eşiği",
    "ikon": "🌾",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sabah 08:00 - 11:00 Arası",
    "hazirlikZamani": "Atrap & 1/4 m² Çerçeve Sayımı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🌾 Süne emgi oranı %1.5'i aşarsa buğdayın ekmeklik gluten kalitesi sıfırlanır; metrekarede 10 veya daha fazla nimf ilaçlama eşiğidir.",
    "oncedenYapilacaklar": [
      "Tarlanın farklı noktalarında 1/4 m²'lik sayım kasnağını rastgele atarak kışlamış ergin ve nimfleri say",
      "1. ila 3. dönem nimf oranı %50'yi geçtiğinde İlçe Tarım Müdürlüğü survey ekipleriyle mutabık kal",
      "Ekonomik zarar eşiğine (m²'de ≥10 nimf) ulaşıldığında süneye ruhsatlı ilacı traktör pülverizatörüne doldur",
      "Komşu arıcılara 48 saat önceden haber vererek rüzgarsız havada ilaçlamayı tamamla"
    ]
  },
  {
    "id": "ziraat_zeytin_sinegi_vuruk_sayimi",
    "category": "resmi",
    "domain": "TARIM_AV_BALIK",
    "keywords": [
      "zeytin sineği vuruk sayımı",
      "zeytin sineği tuzağı",
      "vuruk oranı %1",
      "zeytin ilaçlama zamanı",
      "sofralık zeytin vuruk"
    ],
    "baslik": "Zeytin Sineği Vuruk Sayımı & İlaçlama Zamanı",
    "ikon": "🫒",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık Meyve Kontrolü",
    "hazirlikZamani": "100 Adet Rastgele Zeytin Toplama",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🫒 Sofralık zeytinlerde %1, yağlık zeytinlerde %6-8 vuruk (yumurta yarası) tespit edildiğinde zeytin sineği ilaçlaması başlatılır.",
    "oncedenYapilacaklar": [
      "Zeytinliğin 4 köşesinden ve ortasından rastgele 100 adet zeytin meyvesi topla",
      "Büyüteç altında zeytin kabuğundaki üçgen şeklindeki 'Vuruk' (sineğin yumurta bıraktığı yer) izlerini say",
      "McPhail sarı tuzaklardaki ergin sinek popülasyonunu ve vuruk oranını eşleştir",
      "Eşik aşıldığında zehirli yem kısmi dal ilaçlaması veya kaplama ilaçlama yöntemini uygula"
    ]
  },
  {
    "id": "ziraat_toprak_solarizasyonu_sera",
    "category": "resmi",
    "domain": "TARIM_AV_BALIK",
    "keywords": [
      "toprak solarizasyonu",
      "şeffaf polietilen örtü",
      "sera dezenfeksiyonu",
      "nematod solarizasyon",
      "temmuz ağustos solarizasyon"
    ],
    "baslik": "Sera Toprak Solarizasyonu & Nematod Kalkanı (4-6 Hafta)",
    "ikon": "☀️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Temmuz / Ağustos Sıcakları",
    "hazirlikZamani": "Toprağı Derin Sürüp Doygun Sulama",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🌿 Kimyasalsız toprak dezenfeksiyonu için Temmuz-Ağustos güneşinde tarla suyla doyurulup şeffaf 0.05 mm naylonla 4-6 hafta hava almayacak kapatılır.",
    "oncedenYapilacaklar": [
      "Sera toprağını 30-40 cm derinlikte sürerek kesekleri parçala ve tesviye et",
      "Damlama boruları döşeyip toprağı tarla kapasitesine gelene kadar derinlemesine sula",
      "0.03-0.05 mm kalınlığında UV katkılı şeffaf polietilen örtüyü gergin serip kenarlarını 20 cm toprağa göm",
      "Toprak altı 10 cm derinlik sıcaklığının 45°C - 55°C'ye ulaştığını termometreyle haftalık denetle"
    ]
  },
  {
    "id": "gastronomi_kombine_buharli_firin_nem_prob_core_temp",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "kombine fırın probu",
      "core probe pişirme",
      "fırın nem kontrolü",
      "delta-t pişirme",
      "et iç sıcaklık probu"
    ],
    "baslik": "Kombi Buharlı Fırın Delta-T Pişirme & Çekirdek Isı Probu",
    "ikon": "👨‍🍳",
    "renk": "#FED7AA",
    "varsayilanZaman": "Büyük Parça Et Pişiriminde",
    "hazirlikZamani": "Fırın Ön Isıtma & Prob Kalibrasyonu",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Delta-T pişirmede kabin sıcaklığı etin çekirdek sıcaklığıyla senkron yükselir; etin iç sıcaklığı 56°C olduğunda roast-beef mükemmel sululukta kalır.",
    "oncedenYapilacaklar": [
      "Çekirdek sıcaklık probunu etin en kalın merkez noktasına, kemiğe ve yağ tabakasına temas etmeyecek şekilde sapla",
      "Fırın panelinden Delta-T modunu ve hedef çekirdek sıcaklığını (dana antrikot için 56°C) seç",
      "Kabin nem oranını %60 olarak ayarlayarak et yüzeyinin kurumasını engelle",
      "Pişirme bittiğinde eti fırından çıkarıp iç suların liflere geri dağılması için 15 dakika oda sıcaklığında dinlendir (resting)"
    ]
  },
  {
    "id": "gastronomi_sicak_tutma_benmari_haccp_63derece",
    "category": "saglik",
    "domain": "GASTRONOMI",
    "keywords": [
      "benmari sıcaklık kontrolü",
      "haccp 63 derece kuralı",
      "sıcak servis benmari",
      "gıda zehirlenmesi sıcaklık",
      "benmari su seviyesi"
    ],
    "baslik": "Benmari Servis Sıcaklığı & HACCP 63°C Kritik Kontrol Noktası",
    "ikon": "🍲",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Açık Büfe & Tabldot Servis Süresince",
    "hazirlikZamani": "Daldırma Termometre ile Saatlik Ölçüm",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Gıda Hijyeni Yönetmeliği gereği pişmiş sıcak yemekler serviste ASLA 63°C'nin altına düşürülemez; 2 saatten fazla 63°C altında kalan yemek imha edilir.",
    "oncedenYapilacaklar": [
      "Benmari haznesindeki suyun sıcaklığını rezistans termostatından kontrol edip 85°C'ye getir",
      "Gastronorm küvetlerdeki çorba, sos ve sulu yemeklerin merkez sıcaklığını kalibre dijital termometre ile ölç",
      "Her 1 saatte bir yemek sıcaklıklarının 63°C ve üzerinde olduğunu HACCP Sıcak Servis Çizelgesine kaydet",
      "Yemek seviyesi azaldığında taze sıcak partiyle harmanlamak yerine küveti tamamen yeni partiyle değiştir"
    ]
  },
  {
    "id": "gastronomi_cikolata_temperleme_tabling_kristalizasyon",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "çikolata temperleme",
      "mermer tezgah tabling",
      "beta 5 kristali kakao yağı",
      "temperleme eğrisi 45-27-31",
      "parlak çıtır çikolata"
    ],
    "baslik": "Çikolata Temperleme (Tabling) & Beta V Kristalizasyonu",
    "ikon": "🍫",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Kalıplama Öncesi",
    "hazirlikZamani": "Mermer Tezgah Temizliği & Spatula Hazırlığı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Çikolatanın parlak olması ve oda sıcaklığında erimemesi için kakao yağının Beta V kristali formuna getirilmesi (45°C eritme -> 27°C soğutma -> 31°C çalışma) şarttır.",
    "oncedenYapilacaklar": [
      "Kuvertür bitter çikolatayı benmaride su buharı kaçırmadan 45°C'ye kadar homojen erit",
      "Erimiş çikolatanın 2/3'ünü temiz kuru granit/mermer tezgaha döküp spatulalarla 27°C'ye kadar yayarak soğut",
      "Soğuyan kısmı kaptaki 1/3 sıcak çikolatayla birleştirip spatula ile karıştırarak çalışma sıcaklığı olan 31-32°C'ye getir",
      "Bıçak ucuna sürüp 3 dakikada lekesiz, matlaşmadan donduğunu test ettikten sonra polikarbonat kalıplara dök"
    ]
  },
  {
    "id": "gastronomi_sarkuteri_pastirma_nitrit_tuzlama_kuru_kurutma",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "pastırma çemeni",
      "şarküteri kuru kürleme",
      "nitritli kürleme tuzu",
      "su aktivitesi aw pastırma",
      "botulizm önleme nitrit"
    ],
    "baslik": "Geleneksel Pastırma & Fermente Et Kürleme (Su Aktivitesi Aw < 0.90)",
    "ikon": "🥩",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Tuzlama ve Presleme Periyodu",
    "hazirlikZamani": "Kürleme Tuzu (Prague Powder) & Çemen Formülasyonu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "👨‍🍳 Clostridium botulinum bakterisini engellemek için kürleme tuzu yasal limitlerde kullanılmalı; pastırmanın su aktivitesi (Aw) 0.90 altına inene kadar kurutulmalıdır.",
    "oncedenYapilacaklar": [
      "Dana antrikot/kontrfile etini sinirlerinden ayırıp yüzeyine 2 cm derinliğinde dikey çizikler at",
      "Kaya tuzu ve gıda tipi sodyum nitrit karışımını etin her yerine ovarak yedir ve 48 saat tuzlama teknesinde beklet",
      "Eti yıkayıp fazla tuzunu attıktan sonra ahşap presler altında kan ve acı suyunu sık (denkleme)",
      "Gölgede rüzgarlı havada kurutup su aktivitesini ölçtükten sonra çemen harcıyla (sarımsak, çemen tohumu, tatlı toz biber) kapla"
    ]
  },
  {
    "id": "gastronomi_espresso_ekstraksiyon_tds_refraktometre",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "espresso ekstraksiyon",
      "kahve refraktometresi tds",
      "ekstraksiyon verimi ey",
      "9 bar pompa basıncı",
      "naked portafiltre channelling"
    ],
    "baslik": "Nitelikli Kahve: Espresso Ekstraksiyonu & TDS Refraktometresi",
    "ikon": "☕",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Sabah Açılış Kalibrasyonunda",
    "hazirlikZamani": "Değirmen Mikrometrik Dişli Ayarı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "☕ SCA standartlarına göre ideal espresso: 18g kahve, 36g çıktı, 25-28 saniye akış, %9-10 TDS ve %18-22 Ekstraksiyon Verimi (EY) aralığında olmalıdır.",
    "oncedenYapilacaklar": [
      "Hassas teraziye portafiltreyi koyup tam 18.0 gram taze çekilmiş kahve dozla",
      "WDT iğneli dağıtıcı ile topakları açıp düzleştirici ve 15 kg sabit basınçlı tamper ile sıkıştır",
      "Grup başlığını 2 saniye boş akıtıp portafiltreyi tak ve kronometre ile terazide 36 gram likit çıktıyı (1:2 oran) ölç",
      "Alınan espresso damlasını kahve refraktometresine damlatıp TDS değerini oku ve öğütücü dişlisini kalibre et"
    ]
  },
  {
    "id": "tarim_sera_iklimlendirme_co2_zenginlestirme",
    "category": "saglik",
    "domain": "ZIRAAT",
    "keywords": [
      "sera co2 zenginleştirme",
      "fotosentez karbondioksit dozu",
      "ppm sera gazı ölçer",
      "gece sera havalandırması",
      "sera tepe havalandırma"
    ],
    "baslik": "Topraksız Tarım Seralarında CO2 Zenginleştirme (1000 ppm)",
    "ikon": "🍅",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Güneş Doğduktan 1 Saat Sonra",
    "hazirlikZamani": "CO2 Analizörü & Selenoid Vana Kontrolü",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🌾 Kapalı serada fotosentez başladığında ortamdaki CO2 hızla tükenir; verimi %30 artırmak için CO2 seviyesi 800-1000 ppm aralığında tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Güneş ışınımı 200 W/m2 üzerine çıktığında tepe havalandırma pencerelerinin kapalı olduğunu doğrula",
      "Sıvı CO2 tankı veya kazan baca gazı hattındaki selenoid vanaları açarak borularla bitki kök hizasına CO2 bas",
      "Sera içi CO2 sensörlerini kontrol edip 1000 ppm eşiğinde enjeksiyonu otomatik durdur",
      "Öğlen havalandırma pencereleri açıldığında gaz israfını önlemek için sistemi kapat"
    ]
  },
  {
    "id": "tarim_hububat_sune_kimildan_kurtulma_zararli",
    "category": "saglik",
    "domain": "ZIRAAT",
    "keywords": [
      "buğday süne mücadelesi",
      "kımıl süne nimf sayımı",
      "m2'de süne yoğunluğu",
      "süne ilacı zamanı",
      "ekmeklik buğday gluten süne zararı"
    ],
    "baslik": "Hububatta Süne (Eurygaster) Nimf Sayımı & İlaçlama Eşiği",
    "ikon": "🌾",
    "renk": "#FEF3C7",
    "varsayilanZaman": "2. Dönem Nimf Görüldüğünde",
    "hazirlikZamani": "Çerçeve ile m2 Zararlı Sayımı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🌾 Süne nimfleri buğday tanesini sokup enzim salgılayarak gluteni parçalar; m2'de 7-10 adet 1-3. dönem nimf görüldüğünde derhal ilaçlama yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Tarlada 1/4 m2'lik demir çerçeveyi rastgele 10 farklı noktaya atıp nimf adetlerini say",
      "Ortalama yoğunluk ekonomik zarar eşiğini (m2'de 10 adet nimf) aştığında Tarım İlçe Müdürlüğüne haber ver",
      "Ruhsatlı sentetik piretroid grubu ilacı rüzgarsız havada traktör pülverizatörüyle homojen püskürt",
      "Parazitoit faydalı böceklerin korunması için Tarım Bakanlığı toplu mücadele takvimine uy"
    ]
  },
  {
    "id": "tarim_meyve_goz_asisi_t_asi_fidan",
    "category": "saglik",
    "domain": "ZIRAAT",
    "keywords": [
      "t göz aşısı",
      "fidan aşılama",
      "anaç aşı bıçağı",
      "aşı bandı sarma",
      "kambiyum dokusu çakışması"
    ],
    "baslik": "Meyve Fidanlarında Durgun T Göz Aşısı & Kambiyum Teması",
    "ikon": "🍏",
    "renk": "#FED7AA",
    "varsayilanZaman": "Ağustos - Eylül (Kabuk Kalkma Dönemi)",
    "hazirlikZamani": "Aşı Kalemi Seçimi & Nemli Beze Sarma",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🌾 T göz aşısında başarının sırrı, aşı gözünün kambiyum tabakası ile anaç gövdesinin kambiyumunun hava almadan tam temas etmesidir.",
    "oncedenYapilacaklar": [
      "Güneş görmeyen sürgünlerden pişkin ve sağlıklı aşı gözü içeren damızlık sürgünleri kes",
      "Anaç gövdesinde topraktan 15 cm yukarıda T şeklinde kesik atarak aşı çakısıyla kabuğu kanat gibi kaldır",
      "Aşı gözünü odun dokusuz (kalkan şeklinde) kesip anacın T yarığının içine sıkıca oturt",
      "Hava ve su sızdırmaz aşı bağı ile aşı gözünü açıkta bırakacak şekilde düğümle ve 15 gün sonra tutma kontrolü yap"
    ]
  },
  {
    "id": "tarim_silaj_yapimi_paketleme_laktik_asit_fermantasyonu",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "mısır silajı yapımı",
      "silaj sıkıştırma traktör",
      "silaj nem oranı %65",
      "anaerobik fermantasyon silaj",
      "silaj inokulantı bakteri"
    ],
    "baslik": "Mısır Silajı Sıkıştırma & Anaerobik Laktik Asit Fermantasyonu",
    "ikon": "🌽",
    "renk": "#FEF08A",
    "varsayilanZaman": "Koçan Daneleri Hamur Olumunda",
    "hazirlikZamani": "Silaj Çukuru & Ağır Silindirli Traktör",
    "hazirlikSaatOncesi": 3,
    "akilliFisilti": "🌾 Silajda küflenmeyi ve mikotoksin oluşumunu önlemek için nem %65 olmalı, traktörle havası tamamen ezilip 2 saat içinde hava geçirmez naylonla kapatılmalıdır.",
    "oncedenYapilacaklar": [
      "Mısırın kuru madde oranını (%30-35) ve dane süt çizgisini tarlada test et",
      "Kıyıcı makinede partikül boyutunu 1-2 cm olarak ayarlayıp laktik asit bakteri inokulantı püskürt",
      "Silaj çukuruna dökülen her 30 cm'lik tabakayı ağır tonajlı traktör tekerlekleriyle ileri-geri ezerek havayı tahliye et",
      "Üzerini UV dayanımlı çift kat silaj naylonu ve kum torbalarıyla kapatıp kenarlarını hava almayacak şekilde göm"
    ]
  },
  {
    "id": "tarim_ari_kovan_varroa_oksaliik_asit_buharlastirma",
    "category": "saglik",
    "domain": "ZIRAAT",
    "keywords": [
      "varroa mücadelesi",
      "oksalik asit buharlaştırma",
      "arı kovanı yavrusuz dönem",
      "sublimatör oksalik asit",
      "balda kalıntı yapmayan varroa"
    ],
    "baslik": "Arıcılıkta Varroa Destructor & Oksalik Asit Buharlaştırma",
    "ikon": "🐝",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Sonbahar Yavrusuz Dönemde (Kasım-Aralık)",
    "hazirlikZamani": "Gaz Maskesi & Kovan Giriş Süngeri",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🌾 Varroaya karşı oksalik asit süblimleştirmesi kovanda yavru olmadığı (kuluçkasız) kış başlangıcında yapılmalıdır; arıcı mutlaka tam yüz gaz maskesi takmalıdır.",
    "oncedenYapilacaklar": [
      "Kovan içinde açık ve kapalı yavru olmadığını kontrol et (yavru varken asit sır altı varroayı öldürmez)",
      "Arıcı tam yüz organik gaz filtreli maskesini ve koruyucu deri eldivenlerini taksın",
      "12V elektrikli buharlaştırıcı aparat haznesine 2 gram saf oksalik asit dihidrat koyup kovan uçuş deliğinden içeri sok",
      "Giriş deliğini süngerle kapatıp 2.5 dakika akım vererek buharlaştır ve kovanı 10 dakika kapalı tut"
    ]
  },
  {
    "id": "gastronomi_sous_vide_yumurta_63_derece_jelasyon",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "63 derece yumurta sous vide",
      "yumurta akı ovotransferrin",
      "on-sen tamago yumurta",
      "hassas su sirkülatörü yumurta",
      "kusursuz poşe yumurta sous vide"
    ],
    "baslik": "Moleküler Gastronomi: 63.5°C Sous-Vide Yumurta & Protein Jelasyonu",
    "ikon": "🥚",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Kahvaltı / Brunch Servisinden 45 Dk Önce",
    "hazirlikZamani": "Sirkülatör Su Banyosu Sıcaklık Sabitleme",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Yumurta sarısı 65°C'de, beyazındaki ovotransferrin ise 62°C'de jelleşir; 63.5°C'de 45 dakika pişen yumurta kremsi dokuda akışkan sarılığa kavuşur.",
    "oncedenYapilacaklar": [
      "Daldırma sous-vide sirkülatörünü su dolu polikarbon kaba monte edip 63.5°C'ye ayarla",
      "Buzdolabından çıkan oda sıcaklığına gelmiş taze serbest gezen tavuk yumurtalarını su banyosuna bırak",
      "Kronometreyi 45 dakikaya kurarak su sirkülasyonunun kesintisiz sürdüğünü kontrol et",
      "Süre dolduğunda yumurtayı buzlu suya 30 saniye şoklayıp dikkatlice kırarak sıcak tabakta servis et"
    ]
  },
  {
    "id": "gastronomi_ekmek_firin_tasinda_buhar_puskurtme_crost",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "fırın taşı ekmek pişirme",
      "ekmek kabuğunda çıtırlık buhar",
      "fırına buhar verme ilk 10 dk",
      "ekmekte kabarcıklı kabuk blister",
      "fırın taban sıcaklığı 240"
    ],
    "baslik": "Artizan Ekmekçilik: Fırın Taşı, İlk 10 Dk Buhar Enjeksiyonu & Kabuk",
    "ikon": "🥖",
    "renk": "#FED7AA",
    "varsayilanZaman": "Hamur Fırına Verildiği İlk Saniyede",
    "hazirlikZamani": "Fırın Taşı Ön Isıtma (240°C) & Buhar Tavası",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "👨‍🍳 İlk 10 dakikada buhar verilmezse hamur kabuğu erken katılaşır ve fırın sıçraması (oven spring) gerçekleşemez; buhar çıtır ve parlak kabuğun (blister) anahtarıdır.",
    "oncedenYapilacaklar": [
      "Fırın taşını fırının orta rafında 240°C'de en az 45 dakika kızdır",
      "Fırının tabanına demir döküm buhar tepsisini koyup içine lav taşları yerleştir",
      "Hamuru fırın küreğiyle taşın üzerine aktarıp jiletle (lame) 45 derece açıyla skorlama kesiği at",
      "Fırın kapağını açıp döküm tepsiye 1 su bardağı kaynar su dökerek anında buhar üret ve kapağı kapat; 10 dk sonra buharı tahliye et"
    ]
  },
  {
    "id": "gastronomi_tereyagi_berrak_ghee_netlestirme_klarifiye",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "sade yağ yapımı ghee",
      "klarifiye tereyağı",
      "tereyağı süt köpüğü kazein",
      "yanma noktası 250 derece sade yağ",
      "baklava sade yağı"
    ],
    "baslik": "Geleneksel Sade Yağ (Klarifiye Tereyağı / Ghee) & Kazein Ayrımı",
    "ikon": "🧈",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Büyük Parti Yemek Hazırlığında",
    "hazirlikZamani": "Tuzsuz Köy Tereyağı & Kalın Tabanlı Tencere",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "👨‍🍳 Tereyağındaki su buharlaştırılıp kazein (süt proteini) ve laktoz ayrıştırıldığında yanma noktası 175°C'den 250°C'ye çıkar; acılaşmadan yüksek ısıda kızartma sağlar.",
    "oncedenYapilacaklar": [
      "Tuzsuz kaliteli tereyağını kısık ateşte karıştırmadan erimeye bırak",
      "Yüzeyde biriken beyaz süt proteini köpüklerini (kazein) kevgir yardımıyla dikkatlice topla",
      "Yağın dibe çöken süt tortularının kahverengileşmesine izin vermeden altın sarısı berrak yağı tülbentten süz",
      "Steril kavanoza doldurarak oda sıcaklığında bozulmadan 6 ay saklanabilecek sade yağı mühürle"
    ]
  },
  {
    "id": "gastronomi_sushi_pirinci_shari_hangiri_fan_soğutma",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "sushi pirinci shari",
      "hangiri ahşap tekne",
      "pirinç sirkesi awasezu",
      "yelpaze ile suşi pirinci soğutma",
      "vücut sıcaklığında suşi pirinci"
    ],
    "baslik": "Geleneksel Suşi: Hangiri Ahşap Tekne, Awasezu Sirkesi & Shari",
    "ikon": "🍣",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Servisten 1 Saat Önce",
    "hazirlikZamani": "Pirinç Sirkesi, Şeker ve Tuz Karışımı (Awasezu)",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "👨‍🍳 Suşi pirinci (Shari) ASLA ezilmeden tahta spatulayla kesme hareketiyle sirkeyle harmanlanmalı, yelpazeyle vücut ısısına (36°C) hızla soğutulup nemli bezle örtülmelidir.",
    "oncedenYapilacaklar": [
      "Kısa taneli Japon pirincini nişastası gidene kadar berrak su akana kadar yıkayıp buharda pişir",
      "Sıcak pirinci nemlendirilmiş çam ağacından Hangiri teknesine boşalt",
      "Pirinç sirkesi, şeker ve tuzdan oluşan Awasezu karışımını ahşap spatulanın üzerinden gezdir",
      "Pirinç tanelerini ezmeden kılıç sallar gibi 45 derece açıyla keserek karıştırırken diğer elle yelpaze sallayarak taneleri parlak şekilde soğut"
    ]
  },
  {
    "id": "gastronomi_blast_chiller_sok_sogutucu_haccp_90dk",
    "category": "saglik",
    "domain": "GASTRONOMI",
    "keywords": [
      "blast chiller şok soğutma",
      "haccp 90 dakikada 70 dereceden 3 dereceye",
      "bakteriyel üreme tehlike bölgesi",
      "şok dondurma -18 derece",
      "cook and chill sistemi"
    ],
    "baslik": "HACCP Şok Soğutma (Blast Chiller): +70°C'den +3°C'ye 90 Dakikada İndirme",
    "ikon": "❄️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Pişirme Bittikten Sonraki İlk 15 Dk İçinde",
    "hazirlikZamani": "Gıda İçi Sıcaklık Probu Yerleşimi",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "👨‍🍳 Gıda güvenliğinde tehlikeli bakteri üreme bölgesi (+60°C ile +10°C arası) en fazla 90 dakika içinde aşılmalı; aksi halde gıda zehirlenmesi riski doğar.",
    "oncedenYapilacaklar": [
      "Pişmiş sıcak yemek küvetlerini derinliği 5 cm'yi geçmeyecek şekilde sığ kaplara aktar",
      "Yemeğin tam merkezine şok soğutucu iğne probunu sokup kapısını kapat",
      "Blast Chiller kontrol panelinden \"Soft Chill\" veya \"Hard Chill\" döngüsünü başlat",
      "90 dakikada merkez ısısının +3°C'ye ulaştığını doğrulayıp parti etiketi basarak soğuk depoya (+4°C) kaldır"
    ]
  },
  {
    "id": "ziraat_damla_sulama_kum_filtresi_ters_yikama",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "kum çakıl filtre ters yıkama",
      "damla sulama basınç farkı delta p",
      "hidrosiklon kum tutucu",
      "damlatıcı tıkanması klorlama",
      "disk filtre temizliği tarım"
    ],
    "baslik": "Damla Sulama Filtrasyon Sistemi: Kum Filtresi Ters Yıkama & Asitleme",
    "ikon": "💧",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Giriş-Çıkış Basınç Farkı >0.5 Bar Olduğunda",
    "hazirlikZamani": "Geri Yıkama Vanaları & Manometre Basınç Farkı Kontrolü",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🌾 Giriş ve çıkış manometreleri arasındaki fark 0.5 barı aştığında filtreler tıkanmıştır; kum tankları ters yıkanmalı, sezonda bir nitrik asitle kireç açılmalıdır.",
    "oncedenYapilacaklar": [
      "Giriş ve çıkış manometrelerindeki basınç farkını (Delta P) oku; >0.6 bar ise otomatik veya manuel yıkamayı başlat",
      "Ters yıkama vanasını açarak temiz suyun kum yatağının altından girip pisliği drenaja atmasını sağla",
      "Hidrosiklon tabanındaki tortu toplama haznesini açıp biriken kumu temizle",
      "Damlatıcı memelerindeki kireç tıkanmasını önlemek için sisteme sulama sonunda pH 2.0 olacak şekilde seyreltik fosforik/nitrik asit dozla"
    ]
  },
  {
    "id": "ziraat_bag_kullemelesi_ve_mildiyo_ilaclama_fenoloji",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "bağ küllemesi uncinula",
      "bağ mildiyosu kükürtleme",
      "bağ fenolojik dönemleri",
      "sürgün 25-30 cm ilaçlama",
      "asma yaprak altı beyaz küf"
    ],
    "baslik": "Bağcılık: Külleme (Oidium) & Mildiyö Mücadelesi (Fenolojik Takvim)",
    "ikon": "🍇",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Sürgünler 25-30 cm Olduğunda / Çiçek Öncesi",
    "hazirlikZamani": "Islanabilir Toz Kükürt (WP) & Pülverizatör",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🌾 Bağ küllemesinde 1. ilaçlama sürgünler 25-30 cm olunca, 2. ilaçlama çiçek taç yaprakları dökülünce, 3. ilaçlama koruk ben düşme döneminde yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Bağdaki fenolojik evreyi gözlemle: Sürgün boyu 25-30 cm olduğunda ilk koruyucu kükürt uygulamasını planla",
      "Sıcaklığın 30°C'yi aştığı saatlerde kükürt yanıklığı riskine karşı ilaçlamayı sabah serinliğinde (06:00-09:00) yap",
      "Mildiyö (Plasmopara viticola) riski için 10-10-10 kuralını (10 cm sürgün, 10°C sıcaklık, 10 mm yağış) takip et",
      "Sistemik ve kontak etkili fungisitleri çapraz rotasyonla kullanarak direnç gelişimini engelle"
    ]
  },
  {
    "id": "ziraat_findik_don_zarari_ve_dumanlama_tuleme",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "fındık ilkbahar geç donları",
      "bahçede saman dumanlama tüleme",
      "fındık karanfillenme don riski",
      "radyasyon donu parafin mumu",
      "don pervanesi tarım"
    ],
    "baslik": "Fındık & Meyvede İlkbahar Geç Donları: Dumanlama / Tüleme Nöbeti",
    "ikon": "🌰",
    "renk": "#FED7AA",
    "varsayilanZaman": "Gece Sıcaklık +1°C'ye Düştüğünde (Saat 03:00-06:00)",
    "hazirlikZamani": "Nemli Saman Baleleri, Talaş & Eski Lastik Hazırlığı",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🌾 Açık ve rüzgarsız gecelerde radyasyon donu -1°C altına indiğinde karanfil ve körpe sürgünler yanar; bahçe kenarlarında nemli saman yakılarak duman perdesi çekilmelidir.",
    "oncedenYapilacaklar": [
      "Meteoroloji zirai don uyarılarını ve bahçedeki kuru/ıslak termometre değerlerini gece boyu takip et",
      "Bahçenin hakim rüzgar yönüne 15-20 metre aralıklarla nemli saman, talaş ve organik atık balyaları yerleştir",
      "Sıcaklık +0.5°C seviyesine indiğinde balyaları alevsiz sadece yoğun beyaz duman çıkaracak şekilde tutuştur",
      "Güneş doğup sıcaklık +3°C üzerine çıkana kadar duman perdesini bahçe üzerinde tutarak ani çözünmeyi engelle"
    ]
  },
  {
    "id": "ziraat_pamuk_hasat_oncesi_defoliant_yaprak_dokucu",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "pamuk defoliant uygulaması",
      "yaprak dökücü pamuk",
      "pamuk koza açtırma ethephon",
      "%60 koza açımı defoliant",
      "makineli pamuk hasadı yaprak lekesi"
    ],
    "baslik": "Pamukta Hasat Öncesi Defoliant (Yaprak Dökücü) & Koza Açıcı",
    "ikon": "🌱",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Kozaların %60-70'i Açıldığında",
    "hazirlikZamani": "Bıçakla Koza Olgunluk Testi & Hava Sıcaklığı (>18°C)",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🌾 Defoliant uygulandıktan 10-14 gün sonra yapraklar dökülür; makineyle hasatta yaprak çöpü lifi lekelemez ve lif kalitesi düşmez.",
    "oncedenYapilacaklar": [
      "Tarlada rastgele seçilen kozaları bıçakla enine kes; çekirdek kabuğu kahverengileşmişse olgunluğu onayla",
      "Defoliant (Thidiazuron) ve koza açıcıyı (Ethephon) gece sıcaklığının 16-18°C üzerinde olduğu günlerde pülverize et",
      "Uygulamadan sonra 10-14 gün boyunca yaprak saplarının dökülme tabakasından düşüşünü gözlemle",
      "Yaprakların %90'ı döküldüğünde çiğ kalkar kalkmaz makineli pamuk hasadını başlat"
    ]
  },
  {
    "id": "ziraat_zeytin_hasadi_zeytinyagi_soguk_sikim_malaksasyon",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "soğuk sıkım zeytinyağı cold press",
      "malaksör sıcaklığı 27 derece",
      "malaksasyon süresi 40 dakika",
      "zeytin dip zeytini ayırma",
      "serbest yağ asitliği oleik asit"
    ],
    "baslik": "Zeytinyağı Soğuk Sıkım (Cold Press): 27°C Malaksasyon & Asitlik",
    "ikon": "🫒",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Hasattan Sonraki İlk 12 Saat İçinde",
    "hazirlikZamani": "Kasalarda Taşıma & Malaksör Termostat Kalibrasyonu",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🌾 Soğuk sıkım ekstra sızma zeytinyağı için zeytin hasattan sonra çuvallara değil hava alan kasalara konmalı; malaksör sıcaklığı ASLA 27°C'yi geçmemelidir.",
    "oncedenYapilacaklar": [
      "Toplanan zeytinleri dip zeytini ve dal zeytini olarak ayrıştırıp plastik havalandırmalı kasalara koy",
      "Zeytinleri yıkama ve yaprak ayırma ünitesinden geçirerek kırıcı değirmene sevk et",
      "Malaksör teknesinde yoğurma sıcaklığını dijital termostatla 25-27°C aralığına kilitle ve 35-40 dakika yoğur",
      "Dekantörde ayrıştırılan taze zeytinyağının serbest asitlik derecesini (<%0.8 oleik asit) laboratuvarda ölç"
    ]
  },
  {
    "id": "gastronomi_tereyagi_kruvasan_tur_laminasyon_katlama",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "kruvasan hamuru laminasyon",
      "tereyağı bloğu tur katlama",
      "fransız kuruvasan katı",
      "laminasyon sıcaklığı 16 derece",
      "hamur dinlendirme şok soğutma"
    ],
    "baslik": "Viyana Hamur İşi: Kruvasan Laminasyonu, Tekli/Çiftli Tur & Katlama",
    "ikon": "🥐",
    "renk": "#FED7AA",
    "varsayilanZaman": "Fermantasyon ve Pişirmeden 1 Gün Önce",
    "hazirlikZamani": "Kuru Kuruvasan Tereyağı (%84 Yağ) & Hamur Açma Makinesi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "👨‍🍳 Kruvasanda kat kat petek doku elde etmek için hamur ve tereyağı bloğu aynı sertlikte ve 14-16°C'de olmalıdır; turlar arasında hamur buzdolabında dinlendirilir.",
    "oncedenYapilacaklar": [
      "Yüksek kuru madde içeren (%84 süt yağı) kuru tereyağını yağlı kağıt arasında kare blok halinde merdaneyle ez",
      "Mayalı soğuk hamuru açıp içine tereyağı bloğunu zarf şeklinde yerleştirip kenarlarını sızdırmaz kapat",
      "Hamur açma makinesinde (laminatör) kademeli incelterek bir basit tur ve bir çiftli kitap tur katlaması yap",
      "Turlar arasında tereyağının erimesini engellemek için hamuru streçleyip +2°C buzdolabında 45 dakika dinlendir"
    ]
  },
  {
    "id": "gastronomi_fermente_kombucha_scoby_ve_ph_kontrolu",
    "category": "saglik",
    "domain": "GASTRONOMI",
    "keywords": [
      "kombucha yapımı scoby",
      "kombucha ph 2.5-3.5",
      "kombu çayı fermantasyonu 1. ve 2.",
      "cam kavanoz kombucha tülbent",
      "kombucha küf aspergillus kontrolü"
    ],
    "baslik": "Probiyotik İçecek: Kombucha Fermantasyonu, SCOBY Mantarı & pH",
    "ikon": "🍵",
    "renk": "#DCFCE7",
    "varsayilanZaman": "7-14 Günlük Fermantasyon Süresince",
    "hazirlikZamani": "Steril Cam Kavanoz & Dijital pH Metre",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "👨‍🍳 Kombucha fermantasyonunda pH 2.5 - 3.5 arasında olmalıdır; pH 4.0 üzerine çıkarsa zararlı küfler ve patojenler ürer, içecek bozulur.",
    "oncedenYapilacaklar": [
      "Demlenmiş siyah/yeşil çayı şekerle tatlandırıp oda sıcaklığına (20-25°C) kadar soğut",
      "Cam kavanoza çayı doldurup sağlıklı açık renkli canlı SCOBY diskini ve %10 marşlama sıvısını ekle",
      "Kavanozun ağzını toz ve sinek girmemesi için hava alan sık dokulu tülbent ve paket lastiğiyle kapat",
      "7. günden itibaren dijital pH metre ile tadım yap; pH 3.0 seviyesinde şişeleyip meyve püresiyle 2. fermantasyona al"
    ]
  },
  {
    "id": "gastronomi_vakum_marine_et_infuzyon_chamber_sealer",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "vakumlu marine infüzyon",
      "hazneli vakum makinesi chamber",
      "et marinasyonu gözenek açma",
      "hızlı marinasyon sous vide",
      "et dokusu marinat çekme"
    ],
    "baslik": "Hazneli Vakum Makinesi (Chamber Sealer) ile Hızlı İnfüzyon & Marinasyon",
    "ikon": "🥩",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Servis Öncesi Et Hazırlığında",
    "hazirlikZamani": "Marine Sosu (Asit, Yağ, Baharat) & Vakum Torbası",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Hazneli vakum makinesinde uygulanan 999 mbar negatif basınç etin hücrelerindeki havayı çeker; basınç bırakıldığında marinat saniyeler içinde liflerin merkezine dolar.",
    "oncedenYapilacaklar": [
      "Et dilimlerini ve taze otlu marine sosunu sızdırmaz tırtıksız vakum poşetine koy",
      "Poşeti hazneli (chamber) vakum makinesinin içine yerleştirip ağzını kaynak çenesine sabitle",
      "Makineyi \"Marinate / Infusion\" moduna alarak 3 çevrim boyunca vakum-basınç döngüsü uygulat",
      "İşlem bittiğinde 24 saatlik geleneksel marinasyona denk lezzet nüfuzunu 5 dakikada tamamla"
    ]
  },
  {
    "id": "gastronomi_deniz_urunu_istiridye_canlilik_ve_acma_teknigi",
    "category": "saglik",
    "domain": "GASTRONOMI",
    "keywords": [
      "canlı istiridye açma shucking",
      "istiridye bıçağı ve zırh eldiven",
      "canlı istiridye vurma testi",
      "buz yatağında istiridye servis",
      "istiridye suyu liquor berraklığı"
    ],
    "baslik": "Kabuklu Deniz Mahsulleri: Canlı İstiridye Açma (Shucking) & Emniyet",
    "ikon": "🦪",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Sipariş Alındığında Derhal Canlı Açılır",
    "hazirlikZamani": "Çelik Örgü Zırh Eldiven & Özel İstiridye Bıçağı",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "👨‍🍳 İstiridye açılmadan önce kabuğu hafif aralıksa üzerine tıklandığında anında kapanmalıdır; kapanmayan istiridye ölmüştür ve KESİNLİKLE servis edilmez.",
    "oncedenYapilacaklar": [
      "İstiridyeleri koklayıp kabuklarına vurarak reflex testi yap; kapanmayan veya kırık olanları derhal çöpe at",
      "Sol ele paslanmaz çelik örgü kasap zırh eldiveni giyerek bıçak kayma yaralanmalarını önle",
      "Kısa ve sivri uçlu istiridye bıçağını kabuğun menteşe (hinge) kısmına sokup çevirerek kabuğu çatlat",
      "Kabuk içi adduktor kasını kesip içindeki doğal lezzetli deniz suyunu (liquor) dökmeden bol kırık buz üzerinde limonla sun"
    ]
  },
  {
    "id": "gastronomi_peynir_olgunlastirma_affınage_nem_kuf_yikama",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "peynir olgunlaştırma affinage",
      "peynir mahzeni nem %85-95",
      "yıkanmış kabuklu peynir brevibacterium",
      "çam tahtası raf peynir",
      "peynir tekeri çevirme ve fırçalama"
    ],
    "baslik": "Artizan Peynircilik: Affinage (Mahzen Olgunlaştırma) & Kabuk Yıkama",
    "ikon": "🧀",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Haftalık Rutin Bakımında",
    "hazirlikZamani": "Tuzlu Su / Şarap Salamurası & Doğal Kıl Fırça",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "👨‍🍳 Peynir mahzeninde nem %90, sıcaklık 11-13°C olmalıdır; tekerler haftada iki kez ters yüz edilip tuzlu suyla yıkanarak Brevibacterium linens florası geliştirilir.",
    "oncedenYapilacaklar": [
      "Olgunlaştırma mahzeninin nemini (%85-92) ve sıcaklığını (12°C) higrometre ile denetle",
      "Peynir tekerlerini doğal çam raflar üzerinde ters yüz ederek hava almasını ve şekil simetrisini sağla",
      "%3'lük kaya tuzu salamurasına batırılmış fırça ile peynir kabuğundaki istenmeyen yabani küfleri temizle",
      "Teker üzerinde portakal-kırmızımsı koruyucu doğal kabuk oluşumunu ve göbek yumuşamasını takip et"
    ]
  },
  {
    "id": "ziraat_feromon_tuzak_akdeniz_meyve_sinegi_monitorizasyon",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "feromon tuzak sayımı",
      "akdeniz meyve sineği ceratitis capitata",
      "tuzak tepe noktası ilaçlama",
      "biyoteknik mücadele tuzak",
      "meyve sineği eşik tespiti"
    ],
    "baslik": "Feromon Tuzak Monitörizasyonu & Akdeniz Meyve Sineği Eşik Takibi",
    "ikon": "🍊",
    "renk": "#FEF08A",
    "varsayilanZaman": "Haftalık Tuzak Sayımı (Pazartesi 08:00)",
    "hazirlikZamani": "Tuzak Yapışkan Kart & Feromon Kapsülü Değişimi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🔬 Ceratitis capitata tuzaklarında haftada tuzak başına 1 sinek görüldüğünde ve meyveler vurma olgunluğuna geldiğinde kaplama ilaçlama başlatılmalıdır.",
    "oncedenYapilacaklar": [
      "Bahçenin hâkim rüzgâr yönüne ve ağaçların güneydoğu dallarına 1.5-2 metre yüksekliğe tuzakları as",
      "Haftalık sayımlarda yakalanan ergin dişi/erkek sayısını kayıt altına al",
      "Ekonomik zarar eşiği aşıldığında zehirli yem kısmi dal ilaçlaması veya kitlesel yakalama tuzaklarını aktif et",
      "Hasat öncesi son ilaçlama ile hasat arasındaki bekleme süresine (PHI) kesinlikle riayet et"
    ]
  },
  {
    "id": "ziraat_cks_urun_guncelleme_mazot_gubre_destek",
    "category": "resmi",
    "domain": "ZIRAAT",
    "keywords": [
      "çks ürün güncelleme",
      "çiftçi kayıt sistemi son gün",
      "mazot gübre desteği icmali",
      "çks form a b c",
      "tarım ilçe müdürlüğü çks onay"
    ],
    "baslik": "Çiftçi Kayıt Sistemi (ÇKS) Ürün Güncellemesi & Tarımsal Destek Başvurusu",
    "ikon": "🚜",
    "renk": "#FEF08A",
    "varsayilanZaman": "Yasal ÇKS Başvuru Takviminde",
    "hazirlikZamani": "Tapu ve Kira Sözleşmeleri (Muvafakatname-1/2) Hazırlığı",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🌾 ÇKS yönetmeliği gereğince ekim dönemi ürün değişiklik bildirimleri belirlenen takvim dışında yapılırsa mazot, gübre ve fark desteğinden yararlanılamaz.",
    "oncedenYapilacaklar": [
      "Hisseli veya kiralık araziler için noter onaylı veya köy muhtarlığı tasdikli kira taahhütnamelerini hazırla",
      "e-Devlet veya İlçe Tarım ve Orman Müdürlüğü üzerinden parsel bazlı münavebe (ürün ekim) bilgilerini gir",
      "Askıya çıkan Birinci ve İkinci Fark Ödemesi İcmallerini (İcmal-1) kontrol ederek ada/parsel hatalarına 5 gün içinde itiraz et",
      "Gübre ve mazot desteği fatura barkodlarının sistemle eşleştiğini doğrula"
    ]
  },
  {
    "id": "ziraat_damla_sulama_venturi_fertigasyon_ec_ph_denge",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "venturi fertigasyon",
      "damla sulama ec ph dengesi",
      "gübre tankı enjeksiyon",
      "azot fosfor fertigasyon",
      "damlatıcı debi tıkanıklık testi"
    ],
    "baslik": "Damla Sulamada Venturi Fertigasyonu & Çözelti EC/pH Kalibrasyonu",
    "ikon": "💧",
    "renk": "#FEF08A",
    "varsayilanZaman": "Sulama Öncesi Sabah 06:30",
    "hazirlikZamani": "El Tipi EC/pH Metre Elektrot Kalibrasyonu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🧪 Fertigasyon çözeltisinin pH değeri 5.5-6.5, EC değeri ise bitki türüne göre 1.5-2.2 mS/cm aralığında tutulmalı; kalsiyum ile fosfat aynı tankta karıştırılmamalıdır.",
    "oncedenYapilacaklar": [
      "A ve B stok tanklarında çökelme yapabilecek kalsiyum nitrat ile sülfat/fosfat tuzlarını ayrı tanklarda erit",
      "Venturi enjektör vakum vanasını ayarlayarak ana boru debisine oranla gübre çekişini sağla",
      "Sulama hattının en uç damlatıcısından örnek alarak EC ve pH değerini ölç",
      "Gübreleme bitiminde en az 20 dakika temiz su geçirerek borularda tuz çökelmesi ve tıkanmayı engelle"
    ]
  },
  {
    "id": "ziraat_sera_biyolojik_mucadele_yararli_bocek_salimi",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "yararlı böcek salımı sera",
      "nesidiocoris tenuis salımı",
      "tuta absoluta biyolojik mücadele",
      "encarsia formosa beyazsinek",
      "avcı böcek popülasyon kurma"
    ],
    "baslik": "Örtüaltı Serada Biyolojik Mücadele & Avcı Böcek (Nesidiocoris) Salımı",
    "ikon": "🐞",
    "renk": "#FEF08A",
    "varsayilanZaman": "Akşamüstü Güneş Batımına Doğru (18:00)",
    "hazirlikZamani": "Sera İçi Kimyasal Kalıntı Süresi & Soğuk Zincir Kutu Kontrolü",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🌿 Yararlı avcı böcekler yüksek güneş ışığı ve sıcaklıkta ölür veya kaçar; salım serin saatlerde yapılmalı ve serada en az 10 gün geniş spektrumlu kimyasal atılmamış olmalıdır.",
    "oncedenYapilacaklar": [
      "Gelen kutuların strafor ve buz aküsü sıcaklığının 8-10°C bandında olduğunu kontrol et",
      "Salım öncesinde bitkilere Ephestia (un güvesi) yumurtası yem takviyesi serperek avcı popülasyonun tutunmasını sağla",
      "Metrekareye 1-2 adet ergin düşecek şekilde seranın homojen noktalarına kutuları aç",
      "Sera havalandırma pencerelerindeki tül (insect-proof net) açıklıklarını denetle"
    ]
  },
  {
    "id": "ziraat_soguk_hava_deposu_1mcp_etilen_blokaj_elma",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "1-mcp uygulaması",
      "etilen blokajı elma",
      "soğuk hava deposu gazlama",
      "1-metilsiklopropen dozajı",
      "elma sertlik nişasta testi"
    ],
    "baslik": "Soğuk Hava Deposu Elma 1-MCP (Etilen Blokajı) Gazlama Protokolü",
    "ikon": "🍏",
    "renk": "#FEF08A",
    "varsayilanZaman": "Oda Dolumundan Sonraki 7 Gün İçinde (24 Saat Gazlama)",
    "hazirlikZamani": "Depo Sızdırmazlık Testi & Elma İyot Nişasta İndeksi Ölçümü",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "❄️ 1-MCP uygulaması odanın sızdırmazlığı tam sağlandıktan sonra 24 saat boyunca 625 ppb konsantrasyonda tutulmalı, gazlama sonrası oda 30 dk havalandırılmalıdır.",
    "oncedenYapilacaklar": [
      "Hasat edilen elmaların Streif indeksini (refraktometre Brix, penetrometre sertlik, iyot testi) doğrula",
      "Depo kapı contalarını, basınç tahliye sübaplarını ve menfezleri sızdırmazlık macunuyla mühürle",
      "1-MCP jeneratörünü depoya yerleştirerek fanları tam devirde sirkülasyona ayarla",
      "24 saatlik işlem tamamlandığında odayı havalandırıp ULO (Ultra Low Oxygen: %1-1.5 O2, %1-1.5 CO2) rejimine al"
    ]
  },
  {
    "id": "gastronomi_meyve_sebze_ozonlu_su_ile_dezenfeksiyon",
    "category": "saglik",
    "domain": "GASTRONOMI",
    "keywords": [
      "ozonlu su sebze yıkama",
      "pestisit kalıntısı giderme ozon",
      "gıda güvenliği ozon jeneratörü",
      "sebze dezenfeksiyon ppm",
      "klor kalıntısız yeşillik yıkama"
    ],
    "baslik": "Gıda Güvenliği: Sebze-Meyve Ozonlu Suyla Yıkama & Pestisit Arındırma",
    "ikon": "🥗",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Mise en Place Hazırlık Aşamasında",
    "hazirlikZamani": "Ozonlama Tankı & Suda Çözünmüş Ozon Ölçer (ORP)",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Ozonlu su klordan 3000 kat daha hızlı dezenfeksiyon sağlar, kimyasal kalıntı bırakmaz ve yeşilliklerin raf ömrünü iki katına çıkarır.",
    "oncedenYapilacaklar": [
      "Sebze yıkama evyesindeki suya ozon jeneratöründen difüzör taşlarıyla ozon gazı ver",
      "Suda çözünmüş ozon konsantrasyonunu test kitiyle 0.5 - 1.5 ppm aralığında doğrula",
      "Marul, ıspanak ve meyveleri 5-10 dakika süreyle ozonlu suda bekleterek yüzey bakteri ve pestisitlerini parçala",
      "Yeşillikleri santrifüjlü kurutucuda kurutup hava almayan gastronorm küvetlerde +4°C'ye kaldır"
    ]
  },
  {
    "id": "gastronomi_vakumlu_marine_etme_tumbler_masajlama",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "vakumlu et marinasyonu",
      "et tamburlama tumbler masaj",
      "marinasyon penetrasyonu vakum",
      "et liflerini gevşetme marine",
      "kebap marine vakum kazanı"
    ],
    "baslik": "Et Teknolojisi: Vakumlu Tamburlama (Tumbler) & Hızlı Marinasyon",
    "ikon": "🥩",
    "renk": "#FED7AA",
    "varsayilanZaman": "Pişirmeden 2-4 Saat Önce",
    "hazirlikZamani": "Marine Sosu Formülasyonu & Vakumlu Tambur Kazanı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "👨‍🍳 Normalde 24 saat süren marinasyon, vakum tamburunda 40 dakikada biter; negatif basınç etin gözeneklerini açarak sosu liflerin merkezine kadar emer.",
    "oncedenYapilacaklar": [
      "Kuşbaşı veya bifteklik etleri marine sosu (zeytinyağı, yoğurt suyu, soğan ekstraktı ve baharat) ile tambura koy",
      "Tambur kapağını kilitleyip -0.8 bar vakum çekerek kazan içindeki havayı tahliye et",
      "Kazanı 15-20 devir/dakika hızında çift yönlü masaj döngüsünde 45 dakika döndür",
      "Etin sosu tamamen emdiğini ve ağırlığının %8-10 arttığını tartarak doğrula ve soğuk dolaba al"
    ]
  },
  {
    "id": "gastronomi_pasta_krema_pastorizasyonu_ve_salmonella_anglaise",
    "category": "saglik",
    "domain": "GASTRONOMI",
    "keywords": [
      "crème anglaise pişirme",
      "krema pastörizasyonu 82 derece",
      "yumurta kesilmesini önleme",
      "salmonella öldürme sıcaklığı krema",
      "ahşap kaşık arkasını kaplama nappé"
    ],
    "baslik": "Pastacılık: Crème Anglaise Pastörizasyonu (82°C) & Nappé Testi",
    "ikon": "🍮",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sos / Krema Pişirme Sırasında",
    "hazirlikZamani": "Hassas Dijital Termometre & Buz Banyosu (Ice Bath)",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "👨‍🍳 Salmonella riskini yok etmek için yumurtalı krema 82°C'ye çıkarılmalıdır; 85°C aşılırsa yumurta pıhtılaşır ve krema omlete döner.",
    "oncedenYapilacaklar": [
      "Süt ve kremayı vanilya ile kaynama noktasına getirip çırpılmış yumurta sarısı ve şekere yavaşça ekle (temperleme)",
      "Karışımı kısık ateşte spatulayla sürekli karıştırarak 82°C - 84°C aralığına kadar dikkatle ısıt",
      "Spatulanın arkasına parmakla çizgi çekerek kremanın akmayıp sabit kaldığını (Nappé kıvamı) test et",
      "Tencereyi derhal buzlu su banyosuna oturtarak pişmeyi anında durdur ve pürüzsüzlük için ince süzgeçten geçir"
    ]
  },
  {
    "id": "gastronomi_kuru_buz_ile_dondurma_ve_kokteyl_sis_efekti",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "kuru buz kullanımı restoranda",
      "katı karbondioksit -78 derece",
      "kuru buz sis duman efekti",
      "kuru buz yanığı kriyojenik eldiven",
      "kuru buz yutulma tehlikesi"
    ],
    "baslik": "Kriyomutfak: Kuru Buz (-78.5°C) ile Sis Efekti & Güvenlik Protokolü",
    "ikon": "💨",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Özel Sunum ve Servis Anında",
    "hazirlikZamani": "Kriyojenik Termal Eldiven & Izgaralı Koruyucu Sunum Kabı",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "👨‍🍳 Kuru buz (-78.5°C) cilde çıplak elle değerse anında doku donması yapar; misafire sunulurken yutulmayı önlemek için mutlaka süzgeçli çift taban kap kullanılmalıdır.",
    "oncedenYapilacaklar": [
      "Kuru buza sadece kriyojenik kalın koruyucu eldiven veya maşa yardımıyla müdahale et",
      "Kuru buzu asla gaz geçirmez kapalı cam kavanoza koyma (patlama riski)",
      "Sunum çanağının alt gizli haznesine kuru buz parçaları koyup üzerine ılık aromatik su dökerek sis çıkışını başlat",
      "Servis personeline misafirin kuru buza dokunmaması veya içmemesi gerektiği uyarısını yaptır"
    ]
  },
  {
    "id": "gastronomi_taze_makarna_semolina_nem_ve_ekstruzyon_bronz",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "bronz kalıp taze makarna",
      "durum buğdayı irmik semolina",
      "makarna ekstrüzyon basıncı",
      "pürüzlü makarna sos tutuşu",
      "taze makarna nem oranı %30"
    ],
    "baslik": "Artizan İtalyan: Bronz Kalıp (Trafilata al Bronzo) Taze Makarna",
    "ikon": "🍝",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Öğle / Akşam Servis Öncesi Üretimde",
    "hazirlikZamani": "%100 İtalyan Semolina İrmiği & Bronz Matris Kalıplar",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "👨‍🍳 Bronz kalıptan basılan makarna yüzeyi mikro pürüzlü ve mat çıkar; bu sayede sos makarnanın üzerinden kayıp gitmez, mükemmel şekilde yüzeye tutunur.",
    "oncedenYapilacaklar": [
      "Durum buğdayı irmiğini (Semolina) ve taze yumurtayı %30-32 nem oranında ufalanan kum kıvamına gelene kadar yoğur",
      "Ekstrüzyon makinesinin başlığına istenen makarna tipine uygun (Rigatoni/Tagliatelle) ağır bronz kalıbı tak",
      "Kalıp içindeki sürtünme ısısını kontrol ederek hamurun pişmesini önle",
      "Dönen otomatik bıçakla istenen boyda kesilen taze makarnaları irmik serpilmiş ahşap kurutma kasalarına diz"
    ]
  },
  {
    "id": "ziraat_hububat_saripas_ve_septorya_fungisit_zamanlamasi",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "buğday sarı pas mücadelesi",
      "septorya yaprak lekesi ilacı",
      "bayrak yaprak koruması buğday",
      "fungisit kın dönemi buğday",
      "pas püstülleri sarı toz"
    ],
    "baslik": "Tahıl Koruma: Buğdayda Sarı Pas (Puccinia) & Bayrak Yaprak İlaçlaması",
    "ikon": "🌾",
    "renk": "#FEF9C3",
    "varsayilanZaman": "İlkbaharda Kın Dönemi / Bayrak Yaprak Çıkışında",
    "hazirlikZamani": "Traktör Pülverizatörü & Triazol Grubu Sistemik Fungisit",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🌾 Verimi belirleyen bayrak yaprağın pas hastalığıyla kapanması durumunda rekolte %50 düşer; tarlada sarı püstül çizgileri görüldüğü an sistemik fungisit atılmalıdır.",
    "oncedenYapilacaklar": [
      "Tarlaya girip zig-zag yürüyüşle alt yapraklarda ve sapta sıra halinde sarı dikiş izi püstüllerini kontrol et",
      "Gündüz sıcaklığı 15-20°C ve yüksek nispi nem koşullarında spor yayılım hızını değerlendir",
      "Rüzgarsız sabah saatlerinde Bayrak Yaprak döneminde triazol veya strobilurin etken maddeli fungisit uygula",
      "İlaçlamadan sonra yağış düşme ihtimaline karşı sistemik ilacın yaprağa nüfuz etmesi için en az 4 saatlik kuru periyot bekle"
    ]
  },
  {
    "id": "ziraat_zeytin_halkali_leke_bordo_bulamaci_yuzde2",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "zeytin halkalı leke mücadelesi",
      "%2 bordo bulamacı hazırlama",
      "göztaşı kireç karışımı oran",
      "zeytinde bakırlı mücadele zamanı",
      "hasat sonrası bordo bulamacı"
    ],
    "baslik": "Zeytincilik: Halkalı Leke (Spilocaea oleagina) & %2 Bordo Bulamacı",
    "ikon": "🫒",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sonbaharda Hasat Sonrası & İlkbaharda Sürgün Öncesi",
    "hazirlikZamani": "Bakır Sülfat (Göztaşı) & Sönmüş Kireç",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🌾 %2'lik Bordo Bulamacı için 100 litre suya 2 kg göztaşı ve 1 kg sönmüş kireç kullanılır; bakır çözeltisi kireç sütü üzerine yavaşça dökülerek nötr pH elde edilir.",
    "oncedenYapilacaklar": [
      "Göztaşını tahta veya plastik kapta ılık suyla erit (asla metal kap kullanma)",
      "Ayrı bir kapta sönmüş kireci süzerek kireç ayranı hazırla",
      "Mavi göztaşı eriyiğini karıştırarak kireç ayranının üzerine yavaşça ilave et",
      "Turnusol kağıdı veya passız çivi batırarak bulamacın asidik olmadığını (çivinin kararmadığını) teyit edip ağaçları yıkar gibi ilaçla"
    ]
  },
  {
    "id": "ziraat_topraksiz_tarim_drenaj_orani_ve_ec_ph_yonetimi",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "topraksız tarım drenaj kontrolü",
      "kokopit kaya yünü drenaj %30",
      "drenaj ec artışı tuzlanma",
      "drenaj ph yükselmesi besin kilitlenmesi",
      "otomatik fertigasyon sulama frekansı"
    ],
    "baslik": "Modern Sera: Topraksız Tarımda Drenaj Yüzdesi (%30) & EC Dengesi",
    "ikon": "🍅",
    "renk": "#FED7AA",
    "varsayilanZaman": "Günlük Sulama Periyotları Arasında (Öğle Saatleri)",
    "hazirlikZamani": "Drenaj Toplama Tepsisi & Kalibre EC/pH Metre",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🌾 Kök bölgesinde tuz birikmesini önlemek için verilen gübreli suyun %25-35'i drenajdan geri akmalıdır; drenaj EC'si giriş EC'sinden 0.5 mS fazla ise sulama dozu artırılır.",
    "oncedenYapilacaklar": [
      "Sabah ilk sulamadan sonra drenaj tepsisine gelen solüsyon hacmini ölçerek drenaj yüzdesini hesapla",
      "Giriş besin solüsyonu EC'si ile drenaj tablasından alınan suyun EC ve pH değerini karşılaştır",
      "Drenaj pH'ı 6.5 üzerine çıkarsa nitrik asit dozajını artırarak pH'ı 5.8 bandına çek",
      "Güneş radyasyon sensöründen (Joule/cm2) gelen kümülatif enerjiye göre sulama start frekansını otomatik ayarla"
    ]
  },
  {
    "id": "ziraat_tarimsal_dron_ile_ultra_dusuk_hacimli_ulv_ilaclama",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "zirai insansız hava aracı dron ilaçlama",
      "ulv ultra düşük hacimli ilaçlama",
      "dron santrifüj nozul mikron",
      "dron uçuş yüksekliği 3 metre",
      "zirai dron rtk hassas koordinat"
    ],
    "baslik": "Akıllı Tarım: Zirai İHA (Dron) ile ULV İlaçlama & RTK Santimetre Hassasiyet",
    "ikon": "🚁",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Rüzgarsız Sabah Erken veya Gün Batımında",
    "hazirlikZamani": "RTK Baz İstasyonu, Lityum Bataryalar & ULV Formülasyonu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🌾 Zirai dron ile dekara sadece 1-2 litre su ile ilaçlama yapılır; pervanelerin oluşturduğu aşağı yönlü hava akımı (downwash) ilacı yaprağın alt yüzeyine yapıştırır.",
    "oncedenYapilacaklar": [
      "RTK baz istasyonunu tarlanın açık noktasına kurup santimetre hassasiyetinde parsel sınırlarını dron kumandasına yükle",
      "Uçuş yüksekliğini bitki tepesinden 2.5 - 3.0 metre, hat aralığını (swath) 5 metre olarak ayarla",
      "Santrifüj atomizer nozulların damlacık çapını rüzgar sürüklenmesini önlemek için 150-200 mikron aralığına getir",
      "Rüzgar hızı 4 m/s üzerine çıkarsa sürüklenme (drift) riski nedeniyle uçuşu derhal durdur"
    ]
  },
  {
    "id": "ziraat_silajlik_misir_hasat_kuru_madde_ve_inokulant",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "mısır silajı biçim zamanı",
      "kuru madde oranı %32-35",
      "mısır süt çizgisi 1/2 dönemi",
      "silaj inokulantı laktik asit bakterisi",
      "silaj çukuru traktörle sıkıştırma"
    ],
    "baslik": "Yem Bitkileri: Mısır Silajı Hasadı, Süt Çizgisi (%35 KM) & Fermantasyon",
    "ikon": "🌽",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Tane Süt Çizgisi 1/2 ile 2/3 Seviyesine Geldiğinde",
    "hazirlikZamani": "Silaj Kıyıcı Slotted Bıçaklar & Laktik Asit İnokulantı",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🌾 Silajda optimum fermantasyon için kuru madde oranı %30-35 olmalıdır; danenin süt çizgisi yarıya indiğinde biçilmeli ve silaj çukuru hava kalmayacak şekilde ağır traktörle çiğnenmelidir.",
    "oncedenYapilacaklar": [
      "Tarladan rastgele koçanlar kırarak taneyi boyuna kesip süt çizgisinin (nişasta birikimi) seviyesini kontrol et",
      "Kıyıcı makinenin partikül boyutunu 10-15 mm ve dane patlatıcı (corn cracker) silindir açıklığını 2 mm'ye ayarla",
      "Silaj çukuruna dökülen materyale ton başına homojen şekilde laktik asit inokulantı püskürt",
      "Traktörle sıkıştırıp hava temasını tamamen kesmek için 150 mikronluk siyah/beyaz UV dayanımlı silaj naylonuyla kapatıp üzerine kum torbaları diz"
    ]
  },
  {
    "id": "ticaret_haccp_gida_guvenligi_ve_soguk_zincir_sicaklik_takibi",
    "category": "saglik",
    "domain": "GIDA",
    "keywords": [
      "haccp kritik kontrol noktası ccp",
      "soğuk hava deposu +4 -18 derece",
      "soğuk zincir sıcaklık takip datalogger",
      "fifo gıda rotasyonu ve çapraz bulaşma",
      "tarım bakanlığı gıda denetim formu"
    ],
    "baslik": "Gıda Perakendeciliği: HACCP Soğuk Zincir (+4°C / -18°C) & Datalogger",
    "ikon": "❄️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Günde 3 Kez (Sabah, Öğle, Akşam) Rutin Kontrol",
    "hazirlikZamani": "Kalibre Lazer Termometre, Datalogger Sıcaklık Kayıt Cihazı & Kontrol Çizelgesi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🏪 Süt ve et ürünleri dolapları +4°C, dondurucular ise -18°C altında tutulmalıdır; sıcaklık 2 saatten fazla +8°C üzerine çıkarsa bakteriyel bozulma nedeniyle ürünler imha edilmelidir.",
    "oncedenYapilacaklar": [
      "Şarküteri, sütlük ve dondurucu reyonlarının dijital termometre değerlerini çizelgeye saatlik işle",
      "Mal kabul sırasında gelen soğuk hava frigorifik araçların sıcaklık datalogger dökümünü incele",
      "Çiğ et ve tavuk ürünlerinin pişmiş gıdalarla temas etmesini önleyecek renk kodlu paletleme düzenini denetle",
      "HACCP kritik kontrol noktası (CCP) sapmalarında dolap soğutma kompresörüne acil teknik servis çağır"
    ]
  },
  {
    "id": "ziraat_damla_sulama_ec_ve_tuz_yikamasi_flush",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "damla sulama ec değeri",
      "damla sulama ec 2.4 ms",
      "kök bölgesi tuzlanma kök yanması",
      "ec metre kalibrasyon yıkama suyu",
      "serada fertigasyon tuz birikimi"
    ],
    "baslik": "Topraksız Tarım: Drenaj EC Değeri & Kök Bölgesi Tuz Yıkaması (Flush)",
    "ikon": "🌱",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Öğleden Sonraki Fertigasyon Rutininde",
    "hazirlikZamani": "Kalibre El Tipi EC/pH Metre & Saf Sulama Suyu Deposu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🌾 Kök bölgesi drenaj EC'si 2.5 mS/cm üzerine çıktığında ozmotik basınç tersine döner ve bitki su alamaz; acilen gübresiz saf suyla yıkama (flush) yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Drenaj tablasından toplanan solüsyonun EC ve pH değerlerini kalibre el tipi metre ile ölç",
      "EC değeri giriş solüsyonundan 0.8 mS daha yüksek çıkarsa gübre dozajlama enjeksiyonunu %30 kıs",
      "Kök ucu nekrozu ve tuz kristali birikimini saçak köklerde mikroskop/büyüteçle incele",
      "Bir sonraki sulama periyodunda 15 dakika boyunca sadece arıtılmış dinlendirilmiş saf su vererek substratı yıka"
    ]
  },
  {
    "id": "ziraat_pamuk_koza_kurdu_ve_delta_feromon_tuzagi_esigi",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "pamukta koza kurdu helicopter",
      "helicoverpa armigera eşik",
      "feromon tuzağı sayım koza kurdu",
      "koza delinme yumurta tespiti",
      "pamuk zararlıları entegre mücadele"
    ],
    "baslik": "Bitki Koruma: Pamukta Koza Kurdu (Helicoverpa) & Feromon Tuzağı Sayımı",
    "ikon": "🐛",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Güneş Doğarken Sabah Erken Saatlerde",
    "hazirlikZamani": "Delta Tipi Feromon Tuzakları, Sayım Cetveli & Biyolojik Mücadele İlacı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🌾 Koza kurdu mücadelesinde 100 bitkide 2 adet larva veya yumurta görüldüğünde ekonomik zarar eşiği aşılmış sayılır; ilaçlama larvalar kozaya girmeden yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Tarlaya asılı delta tipi cinsel çekici feromon tuzaklarındaki ergin kelebek sayısını sayıp kaydet",
      "Tarlada zikzak çizerek 100 bitkinin tepe sürgünlerini ve genç taraklarını yumurta yönünden incele",
      "Larvalar koza kabuğunu delip içeri girmeden önce ruhsatlı kitin sentezi inhibitörü veya Bacillus thuringiensis hazırla",
      "İlaçlamayı faydalı böcek popülasyonunu korumak için arıların uçuş yapmadığı akşam serinliğinde uygula"
    ]
  },
  {
    "id": "ziraat_serada_bombus_arisi_ve_pestisit_karantina_kapama",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "serada bombus arısı kovan giriş çıkış",
      "bombus polenleme aktivitesi",
      "pestisit öncesi kovan kapatma",
      "uçuşlar durdu kovan kilitlendi",
      "arı dostu biyolojik ilaçlama"
    ],
    "baslik": "Örtüaltı Yetiştiricilik: Bombus Arısı Koruma Protokolü & İlaçlama Kilidi",
    "ikon": "🐝",
    "renk": "#FEF08A",
    "varsayilanZaman": "İlaçlama Yapılmadan 2 Saat Önce (Akşamüstü)",
    "hazirlikZamani": "Kovan Uçuş Kilit Mandalları & Arı Şerbeti Besleme Solüsyonu",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🌾 Serada kimyasal ilaçlama öncesi kovan mandalı tek yönlü içeriye giriş pozisyonuna alınmalı; tüm işçi arılar kovana dönünce kapak tamamen kilitlenip 48 saat karantinada tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Güneş batımına yakın kovan giriş mandalını \"Sadece Giriş\" konumuna getirerek tarladaki işçilerin dönmesini sağla",
      "Kovan içinde arıların aç kalmaması için glukoz/fruktoz besleme solüsyonu tankını doldur",
      "İlaçlamadan sonra seranın havalandırma fanlarını çalıştırarak kimyasal gaz konsantrasyonunu düşür",
      "Pestisit bekleme süresi (48-72 saat) tamamlandıktan sonra kovan mandallarını çift yönlü aç"
    ]
  },
  {
    "id": "ziraat_zeytin_periyodisite_budamasi_ve_bordo_bulamaci",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "zeytinde periyodisite budaması",
      "var yılı yok yılı filiz alma",
      "zeytin halkalı leke bordo bulamacı",
      "hasat sonu taç havalandırma",
      "zeytin dal kanseri aşı macunu"
    ],
    "baslik": "Meyvecilik: Zeytin Periyodisite Budaması & %1.5 Bordo Bulamacı",
    "ikon": "🫒",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Hasat Bitimi Sonrası / İlkbahar Don Tehlikesi Geçince",
    "hazirlikZamani": "Dezenfekte Budama Makası, Aşı Macunu & %1.5'lik Bordo Bulamacı Pülverizatörü",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🌾 Zeytinde var yılı / yok yılı dalgalanmasını önlemek için taç içini havalandıran obur dal budaması yapılmalı; yaralardan dal kanseri girmemesi için derhal Bordo Bulamacı atılmalıdır.",
    "oncedenYapilacaklar": [
      "Ağaç tacının merkezinde güneşlenmeyi engelleyen dik obur sürgünleri dipten kes",
      "Budama aletlerini her ağaç geçişinde %10'luk çamaşır suyu veya alkolle dezenfekte et",
      "2 cm'den kalın budama kesiklerine mantar enfeksiyonunu önleyici bakırlı aşı macunu sür",
      "Budama bitiminde halkalı leke ve dal kanserine karşı tüm ağaç aksamına %1.5 dozda taze Bordo Bulamacı püskürt"
    ]
  },
  {
    "id": "ziraat_bugday_kardeslenme_ve_can26_ust_gubreleme",
    "category": "is_kariyer",
    "domain": "ZIRAAT",
    "keywords": [
      "hububat süzenk kalsiyum amonyum nitrat",
      "can 26 üst gübreleme yağmur önü",
      "buğday kardeşlenme nitrojen",
      "kuru tarım üst gübre zamanlaması",
      "fırfır gübre serpme kalibrasyonu"
    ],
    "baslik": "Tarla Bitkileri: Buğday Kardeşlenme Dönemi CAN 26 Üst Gübrelemesi",
    "ikon": "🌾",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Meteorolojik Yağıştan 24-48 Saat Önce",
    "hazirlikZamani": "Kalsiyum Amonyum Nitrat (CAN %26) Çuvalları & Santrifüj Serpme Gübre Dağıtıcı",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🌾 Azotlu üst gübre kuru toprağa atılır ve yağmur yağmazsa gaz halinde havaya uçar; en az 10-15 mm yağış öncesinde dekara 15-20 kg CAN 26 atılmalıdır.",
    "oncedenYapilacaklar": [
      "Meteoroloji radarından 2 gün içinde beklenen yağış miktarını ve toprak nemini teyit et",
      "Traktör arkası gübre serpme makinesini (fırfır) dekar başına 18 kg homojen atışa kalibre et",
      "Buğdayın kardeşlenme ve ilk sapa kalkma döneminde azot ihtiyacını karşılamak üzere uygulamayı tamamla",
      "Tarlanın taban suyu biriken çukur yerlerinde azot yıkanması riskine karşı drenaj kanallarını aç"
    ]
  },
  {
    "id": "ziraat_damla_sulama_asit_yikama_kirec",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "damla sulama asit yıkama",
      "damlatıcı kireç açma",
      "nitrik asit fosforik asit",
      "sulama borusu tıkanıklık"
    ],
    "baslik": "Damla Sulama Hatlarında Nitrik/Fosforik Asit ile Kireç Açma",
    "ikon": "🌱",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sezon Sonu / Ayda 1",
    "akilliFisilti": "🌱 Damlatıcı labirentlerindeki kalsiyum karbonat kirecini eritmek için hat sonu pH 4.0-4.5 seviyesinde asitlenir.",
    "oncedenYapilacaklar": [
      "Sistemi normal basınçta çalıştırarak tüm boruların suyla dolmasını sağla",
      "Venturi veya gübre tankı ile %56-68 konsantrasyondaki Nitrik Asit veya Fosforik Asiti kontrollü enjekte et",
      "En uzak lateral borunun sonundaki tahliye tapasını açıp pH kağıdı ile suyun pH 4.0-4.5 olduğunu doğrula",
      "Sistemi kapatıp asitli suyu 60-90 dakika borularda beklettikten sonra hat sonlarını açarak temiz suyla 30 dk yıka"
    ]
  },
  {
    "id": "ziraat_meyve_agaci_goz_asisi_t_asi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "t göz aşısı",
      "durgun göz aşısı",
      "fidan aşılama",
      "aşı bağı parafilm"
    ],
    "baslik": "Meyve Ağaçlarında T Göz Aşısı (Sürgün/Durgun)",
    "ikon": "🌿",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Ağustos-Eylül (Durgun) / Mayıs (Sürgün)",
    "akilliFisilti": "🌱 T göz aşısında anaç kabuğunun kambiyum dokusuna yapışması için aşı bağı hava almayacak şekilde sarılır.",
    "oncedenYapilacaklar": [
      "Anaç gövdesinde pürüzsüz bir noktada aşı çakısıyla 2.5 cm boyunda \"T\" şeklinde kesi yap ve kabuğu hafifçe kaldır",
      "Damızlık sürgünden üzerinde odun dokusu bulunmayan dolgun bir yaprak gözünü (kalkan şeklinde) keserek çıkar",
      "Gözü anaçtaki T yarığının içine kambiyum katmanları tam çakışacak şekilde yerleştirip fazlalığı üstten kes",
      "Gözün ucunu dışarıda bırakacak şekilde elastik aşı bağı veya parafilm ile sıkıca sarıp 15-20 gün sonra kaynaşmayı kontrol et"
    ]
  },
  {
    "id": "ziraat_sera_sera_gazi_nem_botrytis_havalandirma",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "sera botrytis",
      "kurşuni küf domates",
      "sera bağıl nem",
      "sera çatı havalandırma"
    ],
    "baslik": "Örtüaltı Serada Bağıl Nem (>%85) & Botrytis (Kurşuni Küf) Önleme",
    "ikon": "🍅",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sabah Gün Doğumu & Akşam",
    "akilliFisilti": "🌱 Serada nem %85 üzerine çıkarsa çiy yoğuşmasıyla Botrytis cinerea mantarı patlar; sabah erken havalandırma şarttır.",
    "oncedenYapilacaklar": [
      "Higrometre ile gece-sabah bağıl nem eğrisini izle; %80 üzerine çıktığında sirkülasyon fanlarını devreye sok",
      "Sabah güneş doğmadan önce çatı pencerelerini ve yan perdeleri 15-30 dakika açarak nemli havayı tahliye et",
      "Bitki alt yapraklarında budama yaparak hava sirkülasyonunu ve güneş ışığı geçirgenliğini artır",
      "Gövde yaralanmalarında koruyucu bakır veya spesifik botrytis fungisitini lokal olarak uygula"
    ]
  },
  {
    "id": "ziraat_toprak_analizi_numune_alma_burgu",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "toprak numunesi alma",
      "toprak tahlili laboratuvar",
      "zikzak numune",
      "toprak burgusu 0-30 30-60"
    ],
    "baslik": "Gübreleme Öncesi 0-30 / 30-60 cm Toprak Numunesi Alma",
    "ikon": "🌾",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Hasat Sonrası / Ekim Öncesi",
    "akilliFisilti": "🌱 Tarlanın farklı noktalarından \"Z\" çizerek alınan topraklar karıştırılıp 1 kg kompozit numune hazırlanır.",
    "oncedenYapilacaklar": [
      "Tarlada gübre yığını, çit kenarı, yol boyu ve su biriken çukur yerlerden numune ALMAKTAN KAÇIN",
      "Zikzak çizerek belirlenen 15-20 noktadan kürekle 0-30 cm ve 30-60 cm derinlikten V şeklinde toprak dilimleri çıkar",
      "Alınan tüm alt numuneleri temiz bir branda üzerinde iyice harmanlayıp taş ve bitki köklerini ayıkla",
      "Temiz bez/plastik torbaya 1 kg toprak koyup tarla ada/parsel ve yetiştirilecek ürün etiketini yazarak yetkili laboratuvara teslim et"
    ]
  },
  {
    "id": "ziraat_hububat_surene_kurt_ilaclama_esigi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "buğday süne mücadelesi",
      "süne nimf sayımı",
      "süne ekonomik zarar eşiği",
      "kımıl süne ilaçlama"
    ],
    "baslik": "Buğdayda Süne (Eurygaster) Nimf Sayımı & İlaçlama Kararı",
    "ikon": "🌾",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Başaklanma / Süt Olum Dönemi",
    "akilliFisilti": "🌱 Süne kışlamış erginlerinde değil; m²’de 10 adet 1.-3. dönem nimf görüldüğünde ilaçlama kararı alınır.",
    "oncedenYapilacaklar": [
      "Tarlada 1/4 m²’lik atrape çerçevesini rastgele 10 farklı noktaya atarak nimf sayımı yap",
      "Metrekarede ortalama 10 ve üzeri 1-3. dönem nimf varsa Tarım İlçe Müdürlüğü ilaçlama ilanını kontrol et",
      "Faydalı parazitoit arıların (Trissolcus) zarar görmemesi için arı dostu selektif insektisit tercih et",
      "Süne emgisi oranını %1.5 altında tutarak un kalitesinin (sedimantasyon/gluten bozulması) korunmasını sağla"
    ]
  },
  {
    "id": "ziraat_hububat_saripas_puccinia_fungisit",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "buğday sarı pas hastalığı",
      "puccinia striiformis",
      "buğday pas ilaçlama",
      "triazol grubu fungisit"
    ],
    "baslik": "Buğdayda Sarı Pas (Puccinia) & Triazol Fungisit İlaçlaması",
    "ikon": "🌾",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İlk Püstül Görülünce / Bayrak Yaprak",
    "akilliFisilti": "🌱 Yapraklarda dikiş makinesi izi gibi sarı püstüller görüldüğünde bayrak yaprağı korumak için sistemik fungisit atılır.",
    "oncedenYapilacaklar": [
      "Tarlada rastgele seçilen 100 yaprakta sarı pas püstül yoğunluğunu say; %1-5 bulaşıklıkta derhal ilaçlama başlat",
      "Tebuconazole veya Epoxiconazole etken maddeli sistemik triazol fungisitini rüzgarsız havada (Rüzgar < 10 km/s) uygula",
      "Hastalığın tekrar nüksetmesini önlemek için 15-20 gün sonra yeni çıkan üst yaprakları kontrol et",
      "Traktör tekerlek izlerinin tarlada ezdiği buğday oranını düşürmek için geniş kollu (18-24 metre) pülverizatör kullan"
    ]
  },
  {
    "id": "ziraat_sera_isitma_don_pervane_sisi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "serada don tehlikesi",
      "sera don pervanesi",
      "sera sobası don nöbeti",
      "radyasyon donu 0 derece"
    ],
    "baslik": "Örtüaltı Serada Radyasyon Donu & Termal Perde Alarmı",
    "ikon": "❄️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Gece Saat 02:00 - 07:00",
    "akilliFisilti": "🌱 Açık ve rüzgarsız gecelerde sera içi sıcaklık +2°C’ye düştüğünde don pervaneleri ve ısıtıcılar devreye sokulur.",
    "oncedenYapilacaklar": [
      "Meteoroloji don uyarısını ve seradaki kablosuz sıcaklık sensörlerini (Termokupl) sürekli izle",
      "Sıcaklık +3°C altına indiğinde çift kat termal enerji perdelerini kapatıp sera tavanından ısı kaybını kes",
      "Sera içi sıcak hava üfleme kazanlarını (Kömürlü/Gazlı Isıtıcılar) ateşle ve sirkülasyon fanlarını çalıştır",
      "Aşırı don riskinde çatı üstü yağmurlama sistemini çalıştırarak donan suyun gizli ısısıyla (0°C faz değişimi) bitkiyi koru"
    ]
  },
  {
    "id": "ziraat_bagcilik_mildiyo_plasmopara_yag_lekesi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "bağda mildiyö hastalığı",
      "plasmopara viticola yağ lekesi",
      "bağ bakır ilaçlama",
      "10-10-10 kuralı mildiyö"
    ],
    "baslik": "Bağda Mildiyö (Plasmopara Viticola) & \"10-10-10\" Kuralı",
    "ikon": "🍇",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İlkbahar Yağışları Sonrası",
    "akilliFisilti": "🌱 Sürgün boyu 10 cm, sıcaklık 10°C ve yağış en az 10 mm olduğunda bağda mildiyö enfeksiyonu başlar.",
    "oncedenYapilacaklar": [
      "Asma yapraklarının üst yüzeyinde sarımsı \"Yağ Lekesi\", alt yüzeyinde beyaz mantar örtüsü kontrolü yap",
      "İlk lezyonlar görülmeden önce koruyucu Bakır Oksiklorür veya Mancozeb ile ilk koruyucu ilaçlamayı tamamla",
      "Hastalık başladıktan sonra yaprak içine nüfuz eden sistemik (Metalaxyl, Fosetyl-Al) fungisitlere geç",
      "Salkımların hava alması ve güneşlenmesi için cibre ve dip sürgün alma (uç alma) budamalarını aksatma"
    ]
  },
  {
    "id": "ziraat_misir_kocan_kurdu_sesamia_biyolojik",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "mısır koçan kurdu sesamia",
      "mısır kurdu ostrinia",
      "trichogramma yumurta parazitoiti",
      "mısır feromon tuzak"
    ],
    "baslik": "Mısırda Koçan Kurdu (Sesamia) & Trichogramma Biyolojik Mücadele",
    "ikon": "🌽",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Tepe Püskülü Çıkarma Dönemi",
    "akilliFisilti": "🌱 Mısır kurduna karşı kimyasal yerine tarlaya Trichogramma yumurta parazitoiti salınarak %90 başarı sağlanır.",
    "oncedenYapilacaklar": [
      "Işıklı veya eşeysel çekici feromon tuzakları kurarak ergin kelebek uçuş eğrisini ve tepe noktasını tespit et",
      "İlk yumurta paketleri yaprak altlarında görüldüğünde dekar başına 3-5 adet Trichogramma parazitoid kartı as",
      "Koçan içine larva girmeden önce gerekiyorsa çevre dostu Bacillus thuringiensis (Bt) biyopreparatı uygula",
      "Hasat sonrası tarladaki mısır anızlarını sap parçalayıcı ile parçalayarak kışlayan larvaları imha et"
    ]
  },
  {
    "id": "ziraat_zeytin_kara_kosnil_saisssetia_yazlik_yag",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "zeytinde kara koşnil",
      "fumajin mantarı zeytin",
      "yazlık beyaz yağ koşnil",
      "hareketli larva dönemi"
    ],
    "baslik": "Zeytinde Kara Koşnil (Saissetia Oleae) & Yazlık Beyaz Yağ",
    "ikon": "🫒",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Larva Çıkışında (Temmuz-Ağustos)",
    "akilliFisilti": "🌱 Koşnil kabuk bağlamadan önce, yumurtadan %50-70 hareketli larva çıktığı dönemde yazlık beyaz yağ atılır.",
    "oncedenYapilacaklar": [
      "Ağaç yapraklarında ve sürgünlerinde kara koşnil kabuklarını büyüteçle kontrol ederek altındaki yumurta açılışını izle",
      "Koşnilin salgıladığı tatlımsı madde nedeniyle oluşan kara is (Fumajin) örtüsünü havalandırma budamasıyla azalt",
      "Hareketsiz ergin dönemde ilaçlama yapma; sadece hareketli 1. dönem larvalarda %1.5 konsantrasyonunda Yazlık Beyaz Yağ uygula",
      "Hava sıcaklığının 32°C’yi aştığı günlerde yaprak yanmasını önlemek için ilaçlamayı akşam serinliğine ertele"
    ]
  },
  {
    "id": "zir_toprak_tuzlulugu_ec_ve_ph_kirec_analizi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "toprak tuzluluk ec ölçümü",
      "toprak ph kireç analizi",
      "toprak doymuşluk kireçleme",
      "taban gübresi toprak tahlili"
    ],
    "baslik": "Toprak Tahlili: EC Tuzluluk, pH & Kireç Düzeltme Reçetesi",
    "ikon": "🌱",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Ekim Öncesi",
    "akilliFisilti": "🌾 EC değeri 2 dS/m üzerindeyse osmotik basınç köklerin su almasını engeller; kükürt ve jips uygulaması ile tuz yıkanmalıdır.",
    "oncedenYapilacaklar": [
      "Tarlanın farklı noktalarından 0-30 cm ve 30-60 cm derinlikten temsili karma toprak numuneleri al",
      "Laboratuvarda doymuşluk çamuru ekstraktında elektriksel iletkenlik (EC) ve aktif pH ölçümü yap",
      "Yüksek pH (kireçli topraklar) için dekara saf elementel toz kükürt veya leonardit organik madde dozu hesapla",
      "Tuzlu topraklarda taban drenaj hatlarını kontrol ederek tuz yıkama suyu (leaching) sulama periyodunu planla"
    ]
  },
  {
    "id": "zir_damla_sulama_asit_yikama_nitrik_fosforik",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "damla sulama asit yıkama",
      "damlatıcı kireç tıkanıklığı",
      "nitrik asit fosforik asit boru temizleme",
      "sulama debi düşüşü"
    ],
    "baslik": "Damla Sulama Hatlarında Kireç Açma & Asit Yıkama",
    "ikon": "💧",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Sezon Arası / Ay Sonu",
    "akilliFisilti": "🌾 Asit enjeksiyonu sulamanın son 20 dakikasında sisteme verilmeli, hatlarda asitli su 1 saat bekletilip temiz suyla durulanmalıdır.",
    "oncedenYapilacaklar": [
      "Sulama borularının son kör tapalarını açıp hat içindeki çökelti ve kum tortularını yüksek debiyle tahliye et",
      "Kireç ve demir tıkanıklıkları için gübre tankından sulama suyuna %55-68 konsantre Nitrik veya Fosforik asit enjekte et",
      "Hat sonundaki suyun pH değerini turnusol kağıdı/pH metre ile 2.5 - 3.0 seviyesine kadar düşürüp asidi 60 dk beklet",
      "Tüm lateral boruları en az 15 dakika temiz kuyu suyu ile durulayarak damlatıcı debi eşitliğini kontrol et"
    ]
  },
  {
    "id": "zir_zeytin_sinegi_feromon_tuzagi_vuruk_sayimi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "zeytin sineği feromon tuzağı",
      "zeytin vuruk oranı ilaçlama eşiği",
      "bactrocera oleae sarı yapışkan tuzak",
      "zeytin ilaçlama zamanı"
    ],
    "baslik": "Zeytin Sineği (Bactrocera oleae) Tuzak Sayımı & Mücadele",
    "ikon": "🫒",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Haftalık Kontrol",
    "akilliFisilti": "🌾 Zeytinde vuruk oranı %1 (sofralık) veya %3 (yağlık) seviyesine ulaştığında ruhsatlı insektisit veya zehirli yem kısmi ilaçlaması başlatılır.",
    "oncedenYapilacaklar": [
      "Bahçeye hektar başına 1 adet sarı yapışkan feromon tuzağı ve McPhail şişe tuzağı asarak haftalık ergin sayımı yap",
      "Ağaçların güney-güneydoğu yönündeki olgunlaşan zeytin tanelerinden 100'er adet toplayıp vuruk/yumurta kontrolü yap",
      "Ekonomik zarar eşiği aşıldığında çevre dostu Spinosad etkili zehirli yem kısmi dal ilaçlaması planla",
      "Hasat öncesi son ilaçlama ile hasat arasındaki yasal bekleme süresine (PHI) kesinlikle uy"
    ]
  },
  {
    "id": "zir_sera_otomasyonu_vpd_buhar_basinci_acigi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "sera vpd buhar basıncı açığı",
      "sera nem sisleme otomasyonu",
      "transpirasyon yaprak sıcaklığı",
      "sera havalandırma fan ped"
    ],
    "baslik": "Akıllı Sera İklimlendirme: VPD (Buhar Basıncı Açığı) Kontrolü",
    "ikon": "🌡️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Gündüz Sürekli",
    "akilliFisilti": "🌾 VPD değeri 0.8 - 1.2 kPa ideal aralıkta tutulmalıdır; çok yüksek VPD yaprak stomasını kapatarak fotosentezi durdurur.",
    "oncedenYapilacaklar": [
      "Sera iç ortam sıcaklığı, bağıl nem ve kızılötesi yaprak sıcaklık sensöründen anlık VPD değerini hesapla",
      "VPD 1.4 kPa üzerine çıktığında yüksek basınçlı sisleme (fogging) ve tepe gölgeleme perdelerini devreye al",
      "Düşük VPD (<0.4 kPa) ve yüksek nem durumunda külleme ve botrytis mantarını önlemek için havalandırma pencerelerini kademeli aç",
      "Fan-ped soğutma sisteminin su devirdaim debisini ve pedlerdeki kireçlenme durumunu kontrol et"
    ]
  },
  {
    "id": "zir_bugday_sure_kurtulma_nimf_populasyon_sayimi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "buğday süne kışlamış ergin sayımı",
      "süne nimf ilaçlama eşiği",
      "metrekarede süne sayısı",
      "buğday kalitesi gluten hasarı"
    ],
    "baslik": "Hububat: Süne (Eurygaster) Kışlamış Ergin & Nimf Sayımı",
    "ikon": "🌾",
    "renk": "#FED7AA",
    "varsayilanZaman": "İlkbahar / Başak Dönemi",
    "akilliFisilti": "🌾 Süne nimfleri başak süt olum döneminde taneyi emerse gluten yapısını parçalar ve unun ekmeklik kalitesi tamamen yok olur.",
    "oncedenYapilacaklar": [
      "Kışlaktan ovaya iniş döneminde tarlada 1/4 m² çerçeve atarak metrekarede kışlamış ergin yoğunluğunu tespit et",
      "Yumurta parazitoit (Trissolcus) çıkış oranını inceleyerek faydalı böcek popülasyonunu koruma kararı al",
      "Metrekarede 10 veya daha fazla 1.-3. dönem nimf görüldüğünde Tarım İlçe Müdürlüğü koordinasyonuyla toplu ilaçlama ilan et",
      "Ruhsatlı sentetik piretroid grubu ilaçlamayı rüzgarsız sabah saatlerinde pülverizatörle uygula"
    ]
  },
  {
    "id": "ziraat_damla_sulama_ec_ph_ve_ferti_gasyon",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "fertigasyon ec ph ayarı",
      "damla sulama asit yıkama nitrik",
      "topraksız tarım besin solüsyonu",
      "sulama suyu ec 1.8 ms"
    ],
    "baslik": "Damla Sulama Fertigasyon: EC/pH Dengesi & Nitrik Asit Yıkama",
    "ikon": "🌱",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sabah 06:00-09:00 Sulaması",
    "akilliFisilti": "🌱 Damla sulamada besinli su pH’ı 5.8-6.2, EC değeri 1.8-2.2 mS/cm olmalı; kireç tıkanmasına karşı nitrik asit uygulanır.",
    "oncedenYapilacaklar": [
      "A ve B stok tanklarındaki gübre konsantrasyonlarını kontrol et, kalsiyum nitrat ile sülfatlı gübreleri ayrı tut",
      "Venturi / Dozaj pompası çıkışındaki pH probu (Hedef: 5.8 - 6.2) ve EC probu (Hedef: 2.0 mS/cm) kalibrasyonunu yap",
      "Damlatıcı memelerde kireç ve yosun birikimini çözmek için sulama sonunda sisteme %60’lık Nitrik Asit (pH 4.5 şoklaması) enjekte et",
      "Hat sonundaki kör tapaları açarak tahliye (Flushing) yap ve hat basıncının 1.5 - 2.0 Bar olduğunu manometreden oku"
    ]
  },
  {
    "id": "ziraat_hububat_saripasa_ve_septorya_fungisit",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "buğday sarı pas ilacı tebuconazole",
      "septorya yaprak lekesi azoxystrobin",
      "hububat bayrak yaprak ilaçlaması",
      "fungisit rüzgar hızı 15 km"
    ],
    "baslik": "Hububatta Sarı Pas & Septorya: Bayrak Yaprağı Koruma İlaçlaması",
    "ikon": "🌾",
    "renk": "#FEF08A",
    "varsayilanZaman": "Bayrak Yaprak Çıkışı / Yağış Sonrası",
    "akilliFisilti": "🌾 Verimi belirleyen bayrak yaprağını korumak için sarı pas püstülleri görüldüğünde sistemik triazol/strobilurin uygulanır.",
    "oncedenYapilacaklar": [
      "Tarlada Z-şeklinde yürüyerek yapraklarda sarı-turuncu pas çizgileri ve kahverengi Septoria lekelerini say",
      "Traktör pülverizatörünün memelerini (Sarı konik uç veya hava emişli nozul) kalibre et ve dekara 20-30 litre su ayarla",
      "Geniş spektrumlu sistemik fungisit (Tebuconazole / Epoxiconazole + Azoxystrobin) tank karışımını hazırla",
      "Rüzgar hızı < 12 km/s ve hava sıcaklığı < 25°C iken yaprak alt ve üst yüzeylerine homojen pülverize et"
    ]
  },
  {
    "id": "ziraat_meyve_agaci_goz_asisi_ve_kalem_asisi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "meyve ağacı t göz aşısı",
      "yarma kalem aşısı aşı macunu",
      "aşı bağı rafya kamufle",
      "anaç kambiyum dokusu teması"
    ],
    "baslik": "Meyve Ağaçlarında T-Göz ve Yarma Kalem Aşısı Uygulaması",
    "ikon": "🌳",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İlkbahar Uyanma / Ağustos Sürgün Dönemi",
    "akilliFisilti": "🌱 Aşı başarısının anahtarı anaç ile kalemin kambiyum (Yeşil büyüme dokusu) tabakalarının milimetrik temas etmesidir.",
    "oncedenYapilacaklar": [
      "Aşı çakısını sterilize et; anaç gövdesine kabuk kalkacak şekilde T kesiği aç veya gövdeyi yarma şeklinde böl",
      "Damızlık ağaçtan alınan dolgun gözü kalkan şeklinde çıkar veya kalemi 2 gözlü kama şeklinde yont",
      "Kalem/göz kambiyum tabakasını anaç kabuk altı ile hava boşluğu kalmayacak biçimde sıfıra sıfır bitiştir",
      "Aşı bağı (Parafilm / Aşı bandı) ile hava almayacak şekilde sıkıca sarıp açık yarayı aşı macunuyla mühürle"
    ]
  },
  {
    "id": "ziraat_toprak_tahlili_numune_alma_ve_kirecleme",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "toprak analizi burgu numune",
      "toprak ph kireçleme kükürtleme",
      "0-30 30-60 cm toprak numunesi",
      "organik madde solucan gübresi"
    ],
    "baslik": "Toprak Verimlilik Analizi: 0-30 cm Numune Alma & pH Regülasyonu",
    "ikon": "🧪",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Hasat Sonrası / Sonbahar",
    "akilliFisilti": "🌱 Parselin 15-20 farklı noktasından zikzak çizerek 0-30 cm derinlikten alınan kompozit toprak laboratuvara gönderilir.",
    "oncedenYapilacaklar": [
      "Toprak burgusu veya bel küreği ile 0-30 cm ve 30-60 cm derinlikten V-şeklinde kesit alıp 1 kg kompozit numune poşetle",
      "Laboratuvar raporundaki pH, EC, Kireç (CaCO3), Organik Madde ve N-P-K yarayışlılık oranlarını incele",
      "Asidik topraklarda (pH < 6.0) tarım kireci (Kalsiyum Karbonat), alkali topraklarda (pH > 7.8) granül kükürt reçetesi yaz",
      "Toprak hazırlığında dekara 3-4 ton yanmış çiftlik gübresi veya leonardit serimini planla"
    ]
  },
  {
    "id": "ziraat_biyolojik_mucadele_feromon_ve_faydali_bocek",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "feromon tuzak elma iç kurdu",
      "biyolojik mücadele faydalı böcek",
      "sarı yapışkan tuzak trips beyazsinek",
      "kalıntısız entegre mücadele ipm"
    ],
    "baslik": "IPM Biyolojik Mücadele: Eşey Feromon Tuzakları & Predatör Salımı",
    "ikon": "🐞",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İlk Kelebek Uçuşu / Çiçeklenme Sonu",
    "akilliFisilti": "🌱 Biyoteknik mücadelede delta feromon tuzaklarında haftalık eşik yakalaması (Örn: 5 kelebek/tuzak) ile ilaçlama zamanlanır.",
    "oncedenYapilacaklar": [
      "Dekara 1-2 adet Delta tipi eşey feromon tuzağını ağaçların güneydoğu yönüne, 1.5-2 metre yüksekliğe as",
      "Haftalık tuzak sayımı yaparak popülasyon pik yaptığı gün Biyolojik Bakteriyel Preparat (Bacillus thuringiensis) uygula",
      "Serada beyazsinek ve yaprak galeri sineğine karşı sarı/mavi yapışkan tuzakları bitki tepe seviyesine yerleştir",
      "Kırmızı örümcek istilasına karşı predatör akar (Phytoseiulus persimilis) salım protokolünü başlat"
    ]
  },
  {
    "id": "gastronomi_sous_vide_vakumlu_pisirme_ve_pastorizasyon",
    "category": "ev_teknik",
    "domain": "GASTRONOMI",
    "keywords": [
      "sous vide vakumlu pişirme sıcaklık",
      "et pastörizasyon süresi sous vide",
      "daldırma sirkülatör termostat",
      "vakum poşeti sızdırmazlık gıda",
      "haccp sous vide tehlike bölgesi"
    ],
    "baslik": "Sous-Vide Hassas Pişirme: Daldırma Sirkülatörü, Çekirdek Isı & Pastörizasyon",
    "ikon": "👨‍🍳",
    "renk": "#FED7AA",
    "varsayilanZaman": "Mise en Place / Servis Hazırlığı",
    "akilliFisilti": "👨‍🍳 5°C ile 55°C arası tehlike bölgesidir; sous-vide et piştikten sonra hemen servis edilmeyecekse 2 saat içinde buzlu suda +3°C altına soğutulmalıdır.",
    "oncedenYapilacaklar": [
      "Oda tipi vakum makinesi ile gıdayı marinasyonla birlikte %99.9 vakum seviyesinde poşetle",
      "Daldırma sirkülatörünü hedeflenen çekirdek ısıya (Örn: Dana bonfile için 54.5°C) sabitle",
      "İğne tipi su geçirmez termokupl prob ile etin merkez sıcaklığını ve pastörizasyon logunu tut",
      "Servis öncesi döküm tavada veya pürmüz ile 45 saniyelik Maillard reaksiyonu kabuğu oluştur"
    ]
  },
  {
    "id": "gastronomi_kuru_yaslandirma_dry_aged_nem_sicaklik",
    "category": "ev_teknik",
    "domain": "GASTRONOMI",
    "keywords": [
      "dry aged kuru dinlendirme dolabı",
      "et dinlendirme 0-2 derece nem %75-80",
      "himalaya tuzu dry aged kabin",
      "küf oluşumu kabuk traşlama et",
      "28 gün dry aged bonfile antrikot"
    ],
    "baslik": "Dry-Aged Kuru Yaşlandırma: Nem Kontrolü (%75-80), Sıcaklık (0-2°C) & 28 Gün",
    "ikon": "🥩",
    "renk": "#FED7AA",
    "varsayilanZaman": "Dinlendirme Takibi / Haftalık",
    "akilliFisilti": "🥩 Kuru dinlendirmede hava sirkülasyon hızı 0.5-1.5 m/s, bağıl nem %75-80 ve sıcaklık 0°C ile +2°C arasında sabit kalmalıdır.",
    "oncedenYapilacaklar": [
      "Dry-aged dolabının sıcaklık sensörünü +1.5°C ve higrometresini %78 nem seviyesine ayarla",
      "Himalaya tuz bloklarının nem dengeleyici yüzeyini temizle ve hava fanlarını kontrol et",
      "Et bloklarını (Antrikot/T-Bone) askılara birbirine temas etmeyecek aralıklarla yerleştir",
      "28. gün sonunda dış kabuk sertleşmesini (pellicle) steril et bıçağıyla traşlayarak porsiyonla"
    ]
  },
  {
    "id": "gastronomi_haccp_soguk_zincir_fifo_sicaklik_kaydi",
    "category": "ev_teknik",
    "domain": "GASTRONOMI",
    "keywords": [
      "haccp soğuk oda sıcaklık takip çizelgesi",
      "+4 derece soğuk oda -18 derin dondurucu",
      "fifo kuralı ilk giren ilk çıkar",
      "çapraz bulaşma renkli kesme tahtaları",
      "gıda güvenliği denetim hazırlığı"
    ],
    "baslik": "HACCP Gıda Güvenliği: Kritik Kontrol Noktaları (CCP), FIFO & Soğuk Zincir (+4°C / -18°C)",
    "ikon": "📋",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sabah / Akşam Vardiya Rutini",
    "akilliFisilti": "📋 Çiğ et ve kanatlı ürünler soğuk odada en alt raflarda saklanmalı; sebze ve pişmiş ürünler üst raflara yerleştirilerek çapraz bulaşma önlenmelidir.",
    "oncedenYapilacaklar": [
      "Soğuk odaların (+2°C ile +4°C) ve derin dondurucuların (-18°C ile -22°C) dijital ısı loglarını imzala",
      "Tüm hammadde ve yarı mamullere üretim/açılış tarihi ve son tüketim tarihi (STT) FIFO etiketi yapıştır",
      "Renkli kesme tahtası standardını denetle (Kırmızı: Çiğ Kırmızı Et, Sarı: Çiğ Tavuk, Yeşil: Sebze, Mavi: Balık, Beyaz: Süt Ürünleri)",
      "Bulaşıkhane konveyörlü bulaşık makinesi durulama sıcaklığının minimum 82°C (termal dezenfeksiyon) olduğunu test et"
    ]
  },
  {
    "id": "gastronomi_eksi_mayali_ekmek_otoliz_ve_baking",
    "category": "ev_teknik",
    "domain": "GASTRONOMI",
    "keywords": [
      "ekşi maya besleme hidrasyon %75",
      "otoliz aşaması ekşi maya",
      "katlama laminasyon bulk fermentasyon",
      "döküm tencere fırın buhar ekmek",
      "jiletleme scoring ekmek kulak"
    ],
    "baslik": "Artisan Ekşi Maya Ekmekçiliği: %75+ Hidrasyon, Otoliz, Katlama & Fırın Taşında Pişirme",
    "ikon": "🍞",
    "renk": "#FED7AA",
    "varsayilanZaman": "Hamur Hazırlık & Fermentasyon",
    "akilliFisilti": "🍞 Otoliz süresi (un ve suyun 45 dk beklemesi) gluten bağlarını güçlendirir; jiletleme (scoring) fırın kabarmasında ekmeğin kontrollü kulak yapmasını sağlar.",
    "oncedenYapilacaklar": [
      "Ana ekşi mayayı 1:2:2 oranında besleyerek zirve noktasına (Float testi - suda yüzme) ulaşmasını sağla",
      "Yüksek proteinli ekmeklik un ile suyu karıştırarak 45 dakika otoliz dinlenmesine bırak",
      "Maya ve tuzu ekledikten sonra 30 dakikada bir 4 set coil-fold (katlama) uygulayarak bulk fermentasyonu tamamla",
      "Sepette +4°C’de 16 saat soğuk fermantasyondan çıkan hamuru 240°C buharlı fırında pişir"
    ]
  },
  {
    "id": "gastronomi_molekuler_kureleme_sferifikasyon_aljinat",
    "category": "ev_teknik",
    "domain": "GASTRONOMI",
    "keywords": [
      "moleküler gastronomi sferifikasyon",
      "sodyum aljinat kalsiyum laktat banyosu",
      "ters küreleme reverse spherification",
      "havagazı sifon espuma köpük",
      "sıvı nitrojen dondurma tekniği"
    ],
    "baslik": "Moleküler Gastronomi: Doğrudan / Ters Sferifikasyon (Aljinat & Kalsiyum Laktat)",
    "ikon": "🧪",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Fine Dining Hazırlık",
    "akilliFisilti": "🧪 Kalsiyum oranı yüksek gıdalarda (süt, yoğurt, alkol) ters küreleme (gıda içine kalsiyum laktat, banyoya aljinat) uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Aljinat banyosunu (5g Sodyum Aljinat / 1000g Düşük Kalsiyumlu Su) daldırma blender ile çırpıp hava kabarcıklarını vakumla",
      "Lezzet sıvısına %1-2 Kalsiyum Laktat Glukonat ekleyerek pH seviyesini 4.5 üzerine ayarla",
      "Dozaj kaşığı ile lezzet sıvısını aljinat banyosuna damlatarak 2 dakika jel kabuğu oluşmasını bekle",
      "Oluşan küreleri saf su banyosunda durulayarak servis yağı veya aromatik şurup içinde muhafaza et"
    ]
  },
  {
    "id": "ziraat_damla_sulama_fertigasyon_ve_ec_ph",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "damla sulama fertigasyon gübreleme",
      "sulama suyu ec ve ph kontrolü",
      "venturi gübre enjektörü dozaj",
      "kalsiyum nitrat fosfat çökelme",
      "otomasyonlu sera fertigasyon"
    ],
    "baslik": "Modern Fertigasyon: Damla Sulama Gübreleme, EC/pH Sensörleri & Çökelme Önleme",
    "ikon": "🌱",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sulama / Gübreleme Periyodu",
    "akilliFisilti": "🌱 Kalsiyum içeren gübreler ile Fosfat ve Sülfat içeren gübreler aynı stok tankında karıştırılmaz; aksi halde kalsiyum fosfat çöker ve damlatıcıları tıkar.",
    "oncedenYapilacaklar": [
      "A Tankına Demir şelat ve Kalsiyum Nitrat, B Tankına Fosfor, Potasyum ve Magnezyum gübrelerini hazırla",
      "Damla sulama hattı çıkışında EC (1.5 - 2.5 mS/cm) ve pH (5.5 - 6.5) değerlerini kalibre elektrotla ölç",
      "Basınç ayarlı (PC) damlatıcı hatlarında filtre geri yıkama (backwash) sistemini çalıştır",
      "Kök bölgesi nemini tensiyometre veya toprak nem sensörü ile takip ederek fertigasyonu sonlandır"
    ]
  },
  {
    "id": "ziraat_entegre_zararli_yonetimi_ipm_ve_feromon",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "entegre zararlı yönetimi ipm",
      "eşeysel feromon tuzağı sayımı",
      "ekonomik zarar eşiği eze",
      "biyolojik mücadele faydalı böcek",
      "pestisit kalıntı mrl limiti"
    ],
    "baslik": "Entegre Zararlı Yönetimi (IPM): Eşeysel Çekici Feromon Tuzakları & Ekonomik Zarar Eşiği",
    "ikon": "🐛",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık Zararlı Sayımı",
    "akilliFisilti": "🌱 İlaçlama sadece tuzaktaki böcek sayısı Ekonomik Zarar Eşiğini (EZE) aştığında ve arı faaliyetinin olmadığı akşam saatlerinde yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Dekara 1-2 adet delta tipi eşeysel feromon tuzağı asarak haftalık ergin sayımı yap",
      "Faydalı böcek popülasyonunu (Avcı akar, Uğur böceği, Orius) kontrol et",
      "EZE aşıldığında hedef zararlıya spesifik ve arılara zararsız biyolojik/biyoteknik preparat seç",
      "Hasat ile son ilaçlama arasındaki bekleme süresine (PHI) ve MRL kalıntı limitlerine tam uyum sağla"
    ]
  },
  {
    "id": "ziraat_toprak_analizi_numune_alma_ve_taban_gubre",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "toprak tahlili numune alma burgu",
      "taban gübresi 18-46 dap kompoze",
      "kireçli toprak kükürt ph düşürme",
      "organik madde humik asit leonardit",
      "toprak doymuşluk katsayısı tahlil"
    ],
    "baslik": "Toprak Verimliliği: Zikzak Yöntemiyle Toprak Örneği, Analiz & Taban Gübreleme",
    "ikon": "🌾",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Ekim / Dikim Öncesi Sonbahar",
    "akilliFisilti": "🌾 Toprak numunesi tarlayı temsil edecek şekilde zikzak çizilerek 0-30 cm ve 30-60 cm derinlikten paslanmaz burgu ile alınır; gübreli yerlerden alınmaz.",
    "oncedenYapilacaklar": [
      "Tarlanın 10-15 farklı noktasından alınan alt numuneleri temiz kovada karıştırıp 1 kg kompozit numune çıkar",
      "Laboratuvar analiz raporundaki pH, Kireç (%CaCO3), Organik Madde ve Yarışabilir Fosfor değerlerini incele",
      "Yüksek pH (>7.8) durumunda kükürt veya leonardit kaynaklı hümik asit uygulamasını hesapla",
      "Ekim mibzeri ile tohumun 5 cm altına gelecek derinlikte taban gübresini (DAP / 20-20-0) bant usulü ver"
    ]
  },
  {
    "id": "ziraat_hububat_sari_pas_ve_septorya_fungusit",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "buğday sarı pas hastalığı puccinia",
      "septorya yaprak lekesi buğday",
      "bayrak yaprak koruma fungusit",
      "triazol strobilurin etken madde",
      "kardeşlenme sapa kalkma ilaçlama"
    ],
    "baslik": "Hububat Hastalıkları: Buğday Sarı Pas (Puccinia) & Bayrak Yaprak Fungusit Koruması",
    "ikon": "🌾",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sapa Kalkma / Başaklanma Öncesi",
    "akilliFisilti": "🌾 Verimin %70’ini sağlayan Bayrak Yaprağın pas ve septoryadan korunması için sapa kalkma döneminde sistemik fungusit uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Tarlada yaprak altlarında sarı püstüller (Pas sporu) veya nekrotik lekeler olup olmadığını kontrol et",
      "Hava sıcaklığı 15-20°C ve bağıl nem yüksek seyrederken koruyucu/tedavi edici triazol+strobilurin kombinasyonu seç",
      "Traktör pülverizatörünün meme kalibrasyonunu yaparak dekara 20-30 litre su düşecek şekilde ayarla",
      "Geniş yapraklı ve dar yapraklı yabancı ot ilacı ile tank karışımı uyumluluğunu test et"
    ]
  },
  {
    "id": "ziraat_meyve_agaci_budama_ve_bordo_bulamaci",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "meyve ağacı kış budaması",
      "göztaşı kireç bordo bulamacı %2",
      "aşı macunu kalın dal kesimi",
      "budama makası alkolle dezenfeksiyon",
      "ağaç kanseri monilya mücadelesi"
    ],
    "baslik": "Meyve Yetiştiriciliği: Kış Budaması, Aşı Macunu & %2’lik Bordo Bulamacı",
    "ikon": "🍎",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Durgun Dönem / Gözler Uyanmadan",
    "akilliFisilti": "🍎 Budamadan sonra 3 cm’den kalın tüm kesim yaraları aşı macunu ile kapatılmalı; ardından ağaçlar %2’lik Bordo Bulamacı ile yıkanmalıdır.",
    "oncedenYapilacaklar": [
      "Budama aletlerini (makas, testere) ağaçtan ağaca geçerken %70’lik alkol veya çamaşır suyu ile sterilize et",
      "Ağacın içini açacak şekilde obur dalları, kuru, hastalıklı ve birbirini gölgeleyen sürgünleri çıkar",
      "Kalın kesik yüzeylerine fungisit katkılı aşı macunu sürerek mantar enfeksiyonlarını engelle",
      "Gözler patlamadan önce bakır sülfat (Göztaşı) ve sönmüş kireç ile taze hazırlanan %2’lik Bordo Bulamacını ağaca pülverize et"
    ]
  },
  {
    "id": "gastronomi_haccp_soguk_oda_sicaklik_ve_fifo_rotasyonu",
    "category": "saglik",
    "domain": "GASTRONOMI",
    "keywords": [
      "haccp kritik kontrol noktası ccp soğuk oda",
      "soğuk hava deposu artı 4 derece dondurucu eksi 18",
      "fifo ilk giren ilk çıkar ürün etiketleme",
      "çapraz bulaşma risk analizi çiğ et sebze",
      "günlük sıcaklık takip çizelgesi dijital datalogger"
    ],
    "baslik": "HACCP & Gıda Güvenliği: Soğuk Oda (+4°C / -18°C), FIFO Rotasyonu & Çapraz Bulaşma",
    "ikon": "❄️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Her Sabah 07:00 & Akşam Kapanış",
    "akilliFisilti": "❄️ Soğuk hava depoları +4°C altında, derin dondurucular -18°C'de tutulmalı; tüm ürünler açılış ve SKT etiketli olarak FIFO kuralıyla dizilmelidir.",
    "oncedenYapilacaklar": [
      "Soğuk oda ve şok dondurucu sıcaklıklarını kalibre prob ile ölçüp HACCP çizelgesine işle",
      "Tüm sos, şarküteri ve et preparatlarına \"Üretim Tarihi / SKT / Hazırlayan\" renkli etiketlerini yapıştır",
      "Çiğ kırmızı et, tavuk, balık ve sebzeleri ayrı raflarda tutarak damlama ve çapraz bulaşmayı engelle",
      "Buzdolabı kapı contalarının sızdırmazlığını ve otomatik defrost drenaj hatlarını kontrol et"
    ]
  },
  {
    "id": "gastronomi_mise_en_place_ve_servis_brifingi",
    "category": "is_kariyer",
    "domain": "GASTRONOMI",
    "keywords": [
      "mise en place hazırlık mutfak şefi",
      "servis öncesi tadım brifingi ve 86 listesi",
      "garnitür sos stok ve porsiyonlama hazırlığı",
      "alerjen tablosu glüten laktoz kuruyemiş uyarısı",
      "bıçak bileme masat ve kesme tahtası renk kodları"
    ],
    "baslik": "Mise en Place Hazırlığı: Renk Kodlu Kesme Tahtaları, Stoklar & Servis Öncesi Tadım",
    "ikon": "👨‍🍳",
    "renk": "#FED7AA",
    "varsayilanZaman": "Servisten 3-4 Saat Önce (11:00 / 18:00)",
    "akilliFisilti": "👨‍🍳 Servisten 45 dakika önce tüm mise en place tamamlanmalı, günün 86 listesi (tükenenler) ve alerjen uyarısı içeren servis tadım brifingi yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Kesme tahtalarını renk kodlarına göre hazırla (Kırmızı: Çiğ Et, Sarı: Tavuk, Mavi: Balık, Yeşil: Sebze, Beyaz: Peynir)",
      "Ana soslar (Demi-glace, Beşamel, Hollandez) ve garnitür porsiyonlarını sıcak/soğuk istasyonlara diz",
      "Tüm mutfak ekibi ve salon şefiyle servis tadımını yapıp pişirme sürelerini ve tuz/asidite dengesini onayla",
      "Günün menüsündeki 14 temel alerjen (Glüten, Süt, Kabuklu vb.) tablosunu garsonlara bildir"
    ]
  },
  {
    "id": "gastronomi_sous_vide_dusuk_sicaklik_ve_pastorizasyon",
    "category": "saglik",
    "domain": "GASTRONOMI",
    "keywords": [
      "sous-vide vakumda düşük sıcaklıkta pişirme",
      "roner termal sirkülatör su banyosu kalibrasyonu",
      "et iç sıcaklık probu pastörizasyon tablosu",
      "şok soğutucu blast chiller artı 3 dereceye indirme",
      "vakum poşeti bpa free gıdaya uygun sertifika"
    ],
    "baslik": "Sous-Vide & Roner Pişirme: Hassas Sıcaklık Kontrolü, Termal Şok & Pastörizasyon",
    "ikon": "🥩",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Üretim Hazırlığı / Pişirme Döngüsü",
    "akilliFisilti": "🥩 Sous-vide et pişiriminde Roner su sıcaklığı 0.1°C hassasiyetle kontrol edilmeli; pişen ürün servis edilmeyecekse Blast Chiller'da 90 dk içinde +3°C'ye indirilmelidir.",
    "oncedenYapilacaklar": [
      "Roner su banyosunun sıcaklık kalibrasyonunu dijital referans termometre ile doğrula",
      "Marinasyonu tamamlanan etleri gıdaya uygun BPA içermeyen vakum poşetlerinde 99.8% vakumla mühürle",
      "Hedef iç sıcaklık pastörizasyon süresini (Örn: 56.5°C orta-pişmiş bonfile 90 dk) tamamla",
      "Saklanacak ürünleri derhal Blast Chiller şok soğutucuya alarak gıda zehirlenmesi riskini sıfırla"
    ]
  },
  {
    "id": "gastronomi_pastacilik_temperleme_ve_brik_seker_olcumu",
    "category": "ev_teknik",
    "domain": "GASTRONOMI",
    "keywords": [
      "kuvertür çikolata temperleme tablolama yöntemi",
      "çikolata çalışma sıcaklığı 31-32 derece bitter",
      "refraktometre brix şeker derecesi şurup sorbe",
      "jelatin bloom derecesi 200 bloom soğuk suda açma",
      "fırın nem ve konveksiyonel hava hızı kruvasan"
    ],
    "baslik": "Artisan Pastacılık: Çikolata Temperleme (31°C), Brix Şeker Derecesi & Jelatin Bloom Hesabı",
    "ikon": "🍫",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Tatlı & Çikolata İmalatı",
    "akilliFisilti": "🍫 Bitter çikolata 45-50°C'de eritilip 27°C'ye soğutulmalı ve 31-32°C'de kristalize edilmelidir; aksi halde yüzeyde beyaz yağ kusması (fat bloom) oluşur.",
    "oncedenYapilacaklar": [
      "Mermer tezgahta tablolama yöntemi veya tohumlama tekniği ile çikolatanın beta kristal yapısını oluştur",
      "Lazer termometre ile temperleme sıcaklık eğrisini kontrol et (Bitter: 31-32°C, Sütlü: 29-30°C, Beyaz: 28-29°C)",
      "Sorbe ve şurupların şeker yoğunluğunu optik refraktometre ile ölçerek 28-32° Brix aralığında tut",
      "Yaprak jelatinleri buzlu suda 10 dakika yumuşatıp fazla suyunu sıkarak 60°C üstü kremalara ekle"
    ]
  },
  {
    "id": "gastronomi_yag_tutucu_atikhane_ve_davlumbaz_yangin_sondurme",
    "category": "ev_teknik",
    "domain": "GASTRONOMI",
    "keywords": [
      "mutfak yağ tutucu atık yağ bertarafı tutanağı",
      "davlumbaz otomatik ansul r-102 yangın söndürme",
      "kızartma yağı tpm toplam polar madde testi 24",
      "bulaşıkhane durulama sıcaklığı 82 derece sanitasyon",
      "belediye çevre ve atık yönetimi lisanslı yağ toplama"
    ],
    "baslik": "Mutfak Altyapısı: Yağ Tutucu, TPM Polar Madde Yağ Testi & Ansul Otomatik Söndürme",
    "ikon": "🛢️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık Mutfak Altyapı Kontrolü",
    "akilliFisilti": "🛢️ Fritöz yağlarındaki Toplam Polar Madde (TPM) %24'ü geçerse kanserojendir ve derhal lisanslı atık yağ firmasına teslim edilmelidir.",
    "oncedenYapilacaklar": [
      "Elektronik yağ kalitesi ölçüm cihazı ile fritözlerin TPM değerini (%24 sınırı) ve asiditeyi ölç",
      "Yağ tutucu (Grease Trap) tankının katı yağ tabakasını temizleyip atık bertaraf formunu imzalat",
      "Mutfak davlumbazı içi Ansul yangın söndürme sistemi tüp basınç manometresini kontrol et",
      "Endüstriyel bulaşık makinesinin son durulama suyu sıcaklığını (+82°C sanitasyon) doğrula"
    ]
  },
  {
    "id": "ziraat_toprak_analizi_ph_ec_ve_taban_gubreleme",
    "category": "ev_teknik",
    "domain": "TARIM_AV_BALIK",
    "keywords": [
      "toprak tahlili laboratuvar raporu ph ec kireç",
      "taban gübresi 15 15 15 kompoze dap gübresi",
      "organik madde miktarı ve kireçleme ihtiyacı kalsiyum",
      "yarayışlı fosfor p2o5 ve potasyum k2o hesabı",
      "toprak numunesi alma zikzak yöntemi 30 cm"
    ],
    "baslik": "Toprak Tahlili & Taban Gübrelemesi: pH, EC, Organik Madde & DAP/15-15-15 Dozajı",
    "ikon": "🌾",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Ekim / Dikim Öncesi (Sonbahar/İlkbahar)",
    "akilliFisilti": "🌾 Toprak tahlili yapılmadan taban gübresi atılmamalıdır; pH 7.5 üzeri kireçli topraklarda kükürt, asitli topraklarda tarım kireci ile pH regüle edilmelidir.",
    "oncedenYapilacaklar": [
      "Araziden zikzak yöntemiyle 0-30 cm ve 30-60 cm derinlikten temsili toprak numunelerini toplayıp laboratuvara gönder",
      "Analiz sonucundaki toprak pH, EC (tuzluluk), serbest kireç ve organik madde yüzdesini değerlendir",
      "Dekara saf azot (N), fosfor (P2O5) ve potasyum (K2O) ihtiyacını hesaplayıp taban gübresini (DAP veya 20-20-0) belirle",
      "Taban gübresini tohum ekim derinliğinin 5-6 cm altına gelecek şekilde mibzerle uygulattır"
    ]
  },
  {
    "id": "ziraat_damla_sulama_fertigasyon_ve_ec_ph_ayari",
    "category": "ev_teknik",
    "domain": "TARIM_AV_BALIK",
    "keywords": [
      "damla sulama fertigasyon gübreleme tankı venturi",
      "sulama suyu ec ve ph kontrolü nitrik asit",
      "kalsiyum nitrat ve magnezyum sülfat çökelme",
      "damlatıcı debi kontrolü lph ve filtre ters yıkama",
      "toprak nem tansiyometresi centibar takibi"
    ],
    "baslik": "Damla Sulama Fertigasyonu: A-B Gübre Tankı, Venturi Enjeksiyonu, pH (5.5-6.5) & EC Takibi",
    "ikon": "💧",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık Sulama & Besleme Programı",
    "akilliFisilti": "💧 Kalsiyum içeren gübreler ile fosfat/sülfat içeren gübreler asla aynı tankta karıştırılmaz (çökelir); su pH'ı nitrik asitle 5.5-6.5 arasına çekilmelidir.",
    "oncedenYapilacaklar": [
      "A Tankında Kalsiyum Nitrat ve Demir Şelatını; B Tankında Potasyum Nitrat, MAP ve Magnezyumu hazırla",
      "Damla sulama sisteminde gübre enjeksiyonu esnasında suyun EC (1.8 - 2.5 mS/cm) ve pH (5.8) değerlerini dijital probla ölç",
      "Diskli ve hidrosiklon filtrelerin giriş-çıkış manometre fark basıncını kontrol edip otomatik ters yıkama yap",
      "Toprak tansiyometresinde 20-30 centibar aralığına ulaşıldığında sulama döngüsünü başlat"
    ]
  },
  {
    "id": "ziraat_bitki_koruma_entegre_mucadele_ve_hasat_araligi",
    "category": "saglik",
    "domain": "TARIM_AV_BALIK",
    "keywords": [
      "bitki koruma ürünü bkü reçetesi ziraat mühendisi",
      "hasat bekleme süresi phi phi gün sayısı aralığı",
      "kırmızı örümcek afit külleme pas hastalığı ilacı",
      "entegre zararlı yönetimi ipm feromon tuzak",
      "ilaçlama rüzgar hızı 15 km altı ve arı koruma"
    ],
    "baslik": "Entegre Zararlı Yönetimi (IPM): BKÜ Reçetesi, Feromon Tuzak & Hasat Bekleme Süresi (PHI)",
    "ikon": "🌱",
    "renk": "#FEF08A",
    "varsayilanZaman": "Zararlı Eşik Tespiti / Sabah Erken İlaçlama",
    "akilliFisilti": "🌱 İlaçlamalarda Son İlaçlama ile Hasat Arasındaki Süreye (PHI) kesinlikle uyulmalı; rüzgar hızı 15 km/s altında ve arı uçuşunun olmadığı akşamüstü uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Sarı yapışkan tuzaklar ve delta feromon tuzaklarında ekonomik zarar eşiğini aşan zararlı sayımı yap",
      "Gıda ve Kontrol Genel Müdürlüğü onaylı ruhsatlı BKÜ preparatını Ziraat Mühendisi e-Reçetesi ile temin et",
      "İlaçlama pülverizatörünün nozul debi ve basınç kalibrasyonunu yaparak dekara 30-40 litre su sarfiyatını sağla",
      "Kullanılan ilacın etiketindeki PHI (Hasat Bekleme Süresi) gün sayısını çiftçi kayıt defterine işle"
    ]
  },
  {
    "id": "ziraat_sera_iklimlendirme_ve_sera_gazi_co2_zenginlestirme",
    "category": "ev_teknik",
    "domain": "TARIM_AV_BALIK",
    "keywords": [
      "modern cam sera iklim kontrol bilgisayarı",
      "sera co2 karbondioksit zenginleştirme 1000 ppm",
      "oransal nem vpd buhar basıncı açığı kpa",
      "sera termal perde ve gölgeleme perdesi açma",
      "gece gündüz sıcaklık farkı dif diferansiyel"
    ],
    "baslik": "Modern Sera Otomasyonu: Buhar Basıncı Açığı (VPD), CO2 (1000 ppm) & Termal Perde Kontrolü",
    "ikon": "🌿",
    "renk": "#CCFBF1",
    "varsayilanZaman": "Günlük Sera İklim Kontrolü",
    "akilliFisilti": "🌿 Fotosentez verimini maksimize etmek için sera içi CO2 seviyesi 800-1000 ppm seviyesinde tutulmalı; VPD (Buhar Basıncı Açığı) 0.8 - 1.2 kPa aralığında olmalıdır.",
    "oncedenYapilacaklar": [
      "İklim bilgisayarından bağıl nem ve sıcaklığa bağlı VPD (Vapor Pressure Deficit) grafiğini takip et",
      "Güneş doğumundan itibaren kazan baca gazı veya sıvı CO2 ile sera içine 1000 ppm CO2 gazı basılmasını sağla",
      "Öğle saatlerinde aşırı radyasyonu engellemek için %50 gölgeleme perdesini otomatik devreye al",
      "Gece don riskine karşı termal enerji perdesini kapatıp ısıtma ray borusu su sıcaklığını (+45°C) ayarla"
    ]
  },
  {
    "id": "ziraat_meyve_agaci_budama_ve_bordo_bulamaci_kis_bakimi",
    "category": "ev_teknik",
    "domain": "TARIM_AV_BALIK",
    "keywords": [
      "meyve ağacı kış budaması taç oluşturma",
      "bordo bulamacı yüzde 2 bakır sülfat kireç",
      "budama macunu aşı macunu yara kapatıcı fungisit",
      "ağaç dip kurdu ve kabuklu bit kışlık yağ ilaçlaması",
      "gözler uyanmadan önce kış mücadelesi meyvecilik"
    ],
    "baslik": "Meyvecilik Kış Bakımı: Ağaç Budama, %2 Bordo Bulamacı & Aşı Macunuyla Yara Kapatma",
    "ikon": "🌳",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Kış Dinlenmesi / Gözler Uyanmadan Önce (Şubat)",
    "akilliFisilti": "🌳 Ağaçlar kış uykusundayken budanmalı, kalın kesim yaralarına derhal mantar öldürücülü aşı macunu sürülmeli ve %2'lik Bordo Bulamacı ile yıkanmalıdır.",
    "oncedenYapilacaklar": [
      "Budama makası ve testeresini her ağaç geçişinde %70 alkol veya çamaşır suyu solüsyonu ile dezenfekte et",
      "Ağacın ışık almasını engelleyen obur dalları, içe yönelen sürgünleri ve hastalıklı kurumuş dalları kes",
      "Çapı 2 cm'den büyük tüm kesim yaralarını kuruyup çatlamaması için aşı/budama macunu ile kapat",
      "Gözler uyanmadan önce fungal ve bakteriyel hastalıklara karşı ağacın tüm gövdesine %2'lik Bordo Bulamacı uygula"
    ]
  },
  {
    "id": "gastronomi_sous_vide_dusuk_sicaklik_ve_pastorizasyon_tablosu",
    "category": "kisisel_yasam",
    "domain": "GASTRONOMI",
    "keywords": [
      "sous vide vakumda düşük sıcaklıkta pişirme",
      "termosirkülatör su banyosu hassas derece 0 1 c",
      "pastörizasyon zaman sıcaklık eğrisi gıda güvenliği",
      "et pişirme iç sıcaklık probu termokupl teyidi",
      "buzlu şok havuzu blast chiller soğutma kuralı"
    ],
    "baslik": "Sous-Vide Mutfak: Termosirkülatör, Pastörizasyon Tablosu & Blast Chiller",
    "ikon": "🥩",
    "renk": "#FED7AA",
    "varsayilanZaman": "Mise en Place & Servis Öncesi Pişirme",
    "akilliFisilti": "🥩 Sous-vide pişirmede patojen (Salmonella, Listeria) riskine karşı hedef iç sıcaklıkta pastörizasyon süresi tutulmalı; servis edilmeyecek ürün 90 dakikada +3°C'ye şoklanmalıdır.",
    "oncedenYapilacaklar": [
      "Gıdayı gıda sınıfı vakum poşetine marinasyonla koyup hazne tipi vakum makinesinde %99.9 vakumla",
      "Termosirkülatör su banyosu sıcaklığını kalibre et (Örn: Dana Bonfile 54°C, Tavuk Göğsü 64.5°C)",
      "Hedef iç sıcaklığa ulaşıldığında tablodaki minimum pastörizasyon tutma süresini kronometreyle bekle",
      "Depolanacak ürünleri vakum poşetiyle buzlu su banyosunda veya Blast Chiller'da hızla soğut"
    ]
  },
  {
    "id": "gastronomi_eksi_mayali_ekmek_otoliz_ve_buharli_firin",
    "category": "kisisel_yasam",
    "domain": "GASTRONOMI",
    "keywords": [
      "ekşi mayalı ekmek yapımı aktif ekşi maya besleme",
      "un su otoliz süresi 60 dakika ve gluten ağı gelişimi",
      "hamur hidrasyon oranı yüzde 75 yüzde 80 hesaplama",
      "döküm tencere fırın tabanı buhar verme 250 derece",
      "soğuk fermantasyon retarder buzdolabı 16 saat"
    ],
    "baslik": "Artizan Ekmekçilik: Ekşi Maya Besleme, %75+ Hidrasyon, Otoliz & Buharlı Pişirme",
    "ikon": "🥖",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Hamur Hazırlık & Pişirme Günü",
    "akilliFisilti": "🥖 Ekşi maya tepe noktasındayken (Peak) hamura katılmalı; otoliz sonrası laminasyon ve katlamalarla gluten ağı güçlendirilip fırında ilk 20 dk yoğun buhar verilmelidir.",
    "oncedenYapilacaklar": [
      "Ana ekşi mayayı 1:2:2 oranında tazeleyerek oda sıcaklığında hacminin 2-3 katına çıkmasını bekle",
      "Un ve suyu 45-60 dakika yoğurmadan bekleterek (Otoliz) enzimatik gluten gelişimini başlat",
      "Tuz ve aktif mayayı ekleyip 30 dakika arayla 3-4 tur Stretch & Fold (uzat-katla) işlemi yap",
      "Banneton sepette şekil verilen hamuru +4°C dolapta 12-16 saat soğuk fermantasyona bırakıp buharla pişir"
    ]
  },
  {
    "id": "gastronomi_haccp_alerjen_ve_renk_kodlu_kesme_tahtasi",
    "category": "saglik",
    "domain": "GASTRONOMI",
    "keywords": [
      "haccp 14 temel gıda alerjeni listesi menü ikazı",
      "çapraz bulaşma önleme renk kodlu kesme tahtaları",
      "kırmızı et sarı tavuk mavi balık yeşil sebze tahtası",
      "soğuk oda sıcaklık takip çizelgesi artı 4 eksi 18",
      "fifo ilk giren ilk çıkar etiketleme ve son tüketim tarihi"
    ],
    "baslik": "HACCP & Gıda Güvenliği: 14 Alerjen Matrisi, Renk Kodlu Tahtalar & FIFO Takibi",
    "ikon": "👨‍🍳",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Günlük Mutfak Operasyonu & Mal Kabul",
    "akilliFisilti": "👨‍🍳 Çapraz bulaşmayı önlemek için Renk Kodlu Kesme Tahtaları (Kırmızı: Çiğ Et, Sarı: Tavuk, Mavi: Balık, Yeşil: Sebze) kullanılmalı; 14 alerjen menüde işaretlenmelidir.",
    "oncedenYapilacaklar": [
      "Menüdeki tüm reçeteleri 14 resmi gıda alerjeni (Gluten, Laktoz, Fıstık, Kabuklu vb.) açısından analiz et",
      "Mutfak istasyonlarında renk kodlu polietilen kesme tahtalarını ve renkli bıçakları kullanıma tahsis et",
      "Mal kabulde dondurulmuş ürünlerin (-18°C) ve taze ürünlerin (+4°C) sıcaklıklarını infrared termometreyle ölç",
      "Tüm hazırlık kaplarına içeriğin adı, üretim tarihi ve SKT bilgisini içeren FIFO etiketlerini yapıştır"
    ]
  },
  {
    "id": "gastronomi_cikolata_temperleme_beta_kristalleri_ve_tablolama",
    "category": "kisisel_yasam",
    "domain": "GASTRONOMI",
    "keywords": [
      "kuvertür çikolata temperleme beta 5 kristali",
      "mermer tezgahta tablolama yöntemi spatula ile yayma",
      "çikolata eritme benmari 45 derece soğutma 27 derece",
      "çalışma sıcaklığı bitter 31 sütlü 29 derece",
      "parlak çikolata çıtırtısı ve kalıptan pürüzsüz çıkma"
    ],
    "baslik": "Pastacılık & Çikolata: Beta-V Kristalizasyonu, Mermer Tablolama & Temperleme",
    "ikon": "🍫",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Çikolata & Pralin Üretimi",
    "akilliFisilti": "🍫 Kusursuz parlaklık ve çıtırtı için çikolata 45°C'de eritilip mermerde 27°C'ye soğutulmalı ve Form V (Beta) kristalleri oluşturularak 31°C çalışma sıcaklığına ısıtılmalıdır.",
    "oncedenYapilacaklar": [
      "Kuvertür çikolatayı su buharı temas etmeyecek benmari kabında 45-48°C'ye kadar homojen erit",
      "Eriyen çikolatanın 2/3'ünü soğuk mermer tezgaha döküp spatulalarla sürekli hareket ettirerek 27°C'ye indir",
      "Mermerde kristalleşen çikolatayı kalan sıcak çikolatayla karıştırıp çalışma sıcaklığına (Bitter: 31-32°C) getir",
      "Bıçak ucuna sürülen çikolatanın oda sıcaklığında 3 dakika içinde matlaşmadan donduğunu test et"
    ]
  },
  {
    "id": "gastronomi_fine_dining_tabak_tasarimi_ve_servis_cikis_kordinasyonu",
    "category": "kisisel_yasam",
    "domain": "GASTRONOMI",
    "keywords": [
      "fine dining tabak sunumu sos çekme kaşığı cımbız",
      "tabak ısıtma dolabı sıcak tabak servisi",
      "pass istasyonu ve sous chef servis koordinasyonu",
      "tekstür dengesi çıtır püre asidite ve umami",
      "mikro filiz yenilebilir çiçek garnitür yerleşimi"
    ],
    "baslik": "Fine Dining: Pass Koordinasyonu, Sıcak Tabak & Mikro Filiz Tabak Sunumu",
    "ikon": "🍽️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Akşam Servisi & Tabaklama Aşaması",
    "akilliFisilti": "🍽️ Sıcak ana yemekler 65°C ısıtılmış tabaklarda sunulmalı; Pass noktasında Sous Chef koordinasyonuyla masa siparişi aynı anda sıcak ve kusursuz çıkmalıdır.",
    "oncedenYapilacaklar": [
      "Porselen servis tabaklarını servis öncesinde sıcak tutma dolabında (Hot Pass) 60-65°C'ye getir",
      "Tabakta lezzet dengesini sağlamak için protein, püre, kıtırlık, asidite sosu ve aromatik yağı planla",
      "Hassas mutfak cımbızı ile mikro yeşillik ve taze çiçek garnitürlerini kompozisyona uygun yerleştir",
      "Masanın tüm tabakları tamamlandığında kenar temizliğini kontrol edip servis garsonuna \"Service!\" çağrısı yap"
    ]
  },
  {
    "id": "ziraat_ipm_feromon_tuzak_sayimi_ve_zarar_esigi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "entegre zararlı yönetimi ipm feromon tuzak",
      "elma içkurdu zeytin sineği salkım güvesi tuzak sayımı",
      "ekonomik zarar eşiği eze ve kümülatif etkili sıcaklık toplamı",
      "biyoteknik mücadele ve faydalı böcek salımı",
      "bitki koruma ürünü reçetesi bkü takip sistemi"
    ],
    "baslik": "Ziraat & IPM: Feromon Tuzak Sayımı, Ekonomik Zarar Eşiği (EZE) & BKÜ Reçetesi",
    "ikon": "🪤",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık Tuzak Kontrolü & İlaçlama Kararı",
    "akilliFisilti": "🪤 Entegre Zararlı Mücadelesinde (IPM) feromon tuzaklar haftalık sayılmalı; popülasyon Ekonomik Zarar Eşiğini (EZE) aştığında ruhsatlı BKÜ reçetesi düzenlenmelidir.",
    "oncedenYapilacaklar": [
      "Bahçeye asılan eşeysel çekici delta tipi feromon tuzaklardaki ergin zararlı birey sayısını haftalık kaydet",
      "Meteoroloji istasyonundan Gelişme Eşik Sıcaklığı üzerinden Etkili Sıcaklıklar Toplamını (Gün-Derece) hesapla",
      "İlk larva çıkışı veya tepe uçuşu tespit edildiğinde Bakanlık BKÜ sistemine ruhsatlı ilaç reçetesini gir",
      "Arı ve faydalı böcek popülasyonunu korumak için ilaçlamayı akşam serinliğinde rüzgarsız havada uygula"
    ]
  },
  {
    "id": "ziraat_damla_sulama_fertigasyon_ec_ve_ph_otomasyonu",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "damla sulama fertigasyon gübreleme otomasyonu",
      "sulama suyu elektriksel iletkenlik ec ve ph sensörü",
      "a tankı kalsiyum nitrat ve b tankı fosfat sülfat çökelti önleme",
      "venturi gübre enjektörü ve hidrosiklon kum çakıl filtresi",
      "toprak tansiyometresi kök bölgesi nem ölçümü centibar"
    ],
    "baslik": "Akıllı Tarım & Fertigasyon: EC / pH Otomasyonu, A/B Tank Ayrımı & Filtrasyon",
    "ikon": "🌱",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Günlük Sulama Programı & Gübre Dozajı",
    "akilliFisilti": "🌱 Fertigasyonda Ca ve Sülfat/Fosfat çökelmesini önlemek için A ve B tankları ayrılmalı; sulama suyu pH'ı 5.5-6.5 ve EC seviyesi bitki fenolojisine göre ayarlanmalıdır.",
    "oncedenYapilacaklar": [
      "A Tankında Kalsiyum ve Demir Şelatını, B Tankında Fosfor ve Sülfatlı gübreleri ayrı ayrı çöz",
      "Fertigasyon otomasyon bilgisayarında hedef pH (5.8) ve EC (1.8-2.2 mS/cm) parametrelerini reçetelendir",
      "Ana boru hattı girişindeki kum-çakıl ve disk filtrelerin ters yıkama (Backwash) basınç farkını denetle",
      "Toprak derinliğine yerleştirilen tansiyometrelerden kök bölgesi su tansiyonunu (Centibar) okuyarak sulama süresini başlat"
    ]
  },
  {
    "id": "ziraat_toprak_analizi_npk_ve_taban_gubreleme_recetesi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "toprak numunesi alma 0-30 cm 30-60 cm zikzak yöntemi",
      "laboratuvar toprak tahlili npk organik madde kireç",
      "taban gübreleme reçetesi 15-15-15 kompoze gübre",
      "toprak ph düzenleme tarım kireci veya toz kükürt",
      "katyon değişim kapasitesi kdk ve mikro element çinko bor"
    ],
    "baslik": "Toprak Verimliliği: NPK Toprak Tahlili, pH Islahı & Taban Gübreleme Reçetesi",
    "ikon": "🌾",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Ekim / Dikim Öncesi Toprak Hazırlığı",
    "akilliFisilti": "🌾 Parselden zikzak çizerek 0-30 ve 30-60 cm derinlikten alınan kompozit toprak numunesi tahlil ettirilmeli; NPK ve kireç/kükürt miktarı rapora göre hesaplanmalıdır.",
    "oncedenYapilacaklar": [
      "Parseli temsil eden en az 10-15 farklı noktadan V şeklinde çukur açıp 0-30 cm derinlikten toprak numunesi topla",
      "Akredite toprak analiz laboratuvarından bünye, pH, kireç, organik madde, N-P-K ve mikro element raporunu temin et",
      "Yüksek pH'lı (>7.8) topraklarda kükürt, asidik topraklarda (<6.0) tarım kireci ile toprak pH düzenleme miktarını belirle",
      "Kök gelişimini desteklemek için fosfor ağırlıklı kompoze taban gübresini pulluk derinliğine uygulayarak toprağa karıştır"
    ]
  },
  {
    "id": "ziraat_soguk_hava_deposu_dca_ve_meyve_solunum_takibi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "meyve soğuk hava deposu dinamik kontrollü atmosfer dca",
      "oksijen seviyesi yüzde 1 karbondioksit yüzde 1 kontrolü",
      "etilen absorbanı ve 1-mcp akıllı taze uygulaması",
      "meyve eti sertliği penetrometre ve brix suda çözünür kuru madde",
      "soğuk hava deposu nem oranı yüzde 90 yüzde 95 ve defrost"
    ],
    "baslik": "Hasat Sonrası: DCA Dinamik Kontrollü Atmosfer, 1-MCP & Brix Ölçümü",
    "ikon": "🍎",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Hasat Kabulü & Depolama Sezonu",
    "akilliFisilti": "🍎 DCA Dinamik Atmosferli depolarda O2 seviyesi %0.8-1.2 aralığında tutularak meyve solunumu durdurulmalı; depoya girmeden önce 1-MCP etilen blokajı uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Gelen meyve partilerinde el penetrometresi ile meyve eti sertliğini (kg/cm²) ve refraktometre ile Briks şeker oranını ölç",
      "Depo kapıları kapatıldıktan sonra etilen sentezini durdurmak için 1-MCP (1-Metilsiklopropen) gazlaması yap",
      "Azot jeneratörü ile ortam oksijenini hızla %1-1.5 seviyesine çekip CO2 yıkayıcı scrubber'ları devreye al",
      "Depo içi bağıl nemin %90-95 ve hava sirkülasyonunun homojen olduğunu sensörlerden 24 saat izle"
    ]
  },
  {
    "id": "ziraat_iyi_tarim_uygulamalari_itu_ve_globalgap_denetimi",
    "category": "resmi",
    "domain": "ZIRAAT",
    "keywords": [
      "iyi tarım uygulamaları itu sertifikasyon denetimi",
      "globalgap tarımsal üretim standartları kontrol listesi",
      "tarımsal ilaç kalıntı pestisit mrl analizi akredite laboratuvar",
      "bkü boş ambalaj yönetimi üçlü yıkama ve atık bertarafı",
      "çalışan hijyen eğitimi ve tarla ilk yardım kiti kontrolü"
    ],
    "baslik": "İTU & GlobalGAP: Tarımsal Sertifikasyon, Pestisit MRL Kalıntı Analizi & Boş Ambalaj",
    "ikon": "📜",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Hasat Öncesi Sertifikasyon Denetimi",
    "akilliFisilti": "📜 GlobalGAP/İTU denetimi öncesinde pestisit MRL kalıntı analiz raporu alınmalı; ilaç ambalajlarında \"Üçlü Yıkama\" yapılarak kilitli atık alanında toplanmalıdır.",
    "oncedenYapilacaklar": [
      "Üretim sezonu boyunca kullanılan tüm tohum, gübre ve ruhsatlı ilaç kayıtlarını Parsel Kayıt Defterine günü gününe işle",
      "Hasat öncesinde üründen numune aldırarak akredite laboratuvarda LC-MS/MS ile 500+ etken madde MRL pestisit analizini yaptır",
      "Boş zirai ilaç kutularının basınçlı suyla 3 kez yıkandığını ve delinerek kilitli tehlikeli atık deposunda tutulduğunu doğrula",
      "Tarlada çalışan işçilerin hijyen, KKD kullanımı ve ilk yardım eğitim tutanaklarını denetim dosyasına koy"
    ]
  },
  {
    "id": "gastronomi_dry_aged_kuru_dinlendirme_ve_himalaya_tuzu",
    "category": "kisisel_yasam",
    "domain": "GASTRONOMI",
    "keywords": [
      "dry aged kuru et dinlendirme dolabı himalaya tuz tuğlası",
      "kontrollü nem oranı yüzde 75-80 ve sıcaklık 1-2 derece",
      "dana antrikot t-bone tomahawk 28 gün 45 gün dinlendirme",
      "faydalı küf tabakası thalassomyces ve dış kabuk kesme",
      "et ph değeri ve enzimatik miyoglobin lezzet yoğunlaşması"
    ],
    "baslik": "Et Ustalığı & Dry-Aged: 28-45 Gün Kuru Dinlendirme, %80 Nem & Enzim Gelişimi",
    "ikon": "🥩",
    "renk": "#FED7AA",
    "varsayilanZaman": "Dry-Aged Dolaba Alma & Günlük Kontrol",
    "akilliFisilti": "🥩 Dry-Aged dolabında sıcaklık +1°C/+2°C ve nem %75-80 aralığında sabit tutulmalı; etin üzerindeki kuruyan koruyucu kabuk pişirme öncesi temizlenmelidir.",
    "oncedenYapilacaklar": [
      "Dry-Aged dolabının tabanındaki Himalaya tuz bloklarının kuru olduğunu ve UV sterilizasyon lambasını kontrol et",
      "Kemikli bütün antrikot veya pirzolalık karkası hava akışını engellemeyecek şekilde askılara as",
      "Haftalık olarak et yüzeyinde faydalı beyaz küf tabakası gelişimini ve nem/sıcaklık data logger grafiğini izle",
      "28. veya 45. günde eti çıkarıp dış kısımdaki kurumuş sert kabuğu (bark) keserek taze mermerimsi eti porsiyonla"
    ]
  },
  {
    "id": "gastronomi_soguk_dumanlama_cold_smoking_ve_telas",
    "category": "kisisel_yasam",
    "domain": "GASTRONOMI",
    "keywords": [
      "soğuk fümeleme cold smoking somon füme peynir",
      "duman tabancası tütsüleme fırını kayın kiraz talaşı",
      "füme fırını sıcaklık kontrolü maksimum 30 derece altı",
      "kürleme işlemi kaya tuzu esmer şeker ve dereotu",
      "duman penetrasyonu ve kurutma pellicle zarı oluşumu"
    ],
    "baslik": "Tütsüleme & Soğuk Duman: Cold Smoking (<30°C), Kayın Talaşı & Kürleme Zarı",
    "ikon": "💨",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kürleme & Fümeleme Süreci",
    "akilliFisilti": "💨 Soğuk fümelemede fırın sıcaklığı 30°C'yi ASLA geçmemelidir (protein pişmemeli); duman tutunması için etin üzerinde önce parlak bir kuruma zarı (Pellicle) oluşturulur.",
    "oncedenYapilacaklar": [
      "Taze somon balığını kaya tuzu ve şeker karışımıyla 12-24 saat tuzlayarak suyunu çektir (Kürleme)",
      "Kürlenmiş balığı yıkayıp soğuk hava akımında 6 saat kurutarak yüzeyde parlak Pellicle zarı oluştur",
      "Tütsü haznesine reçinesiz kayın veya elma ağacı talaşı koyup soğuk duman jeneratörünü çalıştır",
      "20-25°C sıcaklıkta 8-12 saat aralıklı duman vererek balığın aromayı içine çekmesini sağla"
    ]
  },
  {
    "id": "gastronomi_molekuler_sferifikasyon_ve_kalsiyum_banyosu",
    "category": "kisisel_yasam",
    "domain": "GASTRONOMI",
    "keywords": [
      "moleküler gastronomi direkt ve ters sferifikasyon",
      "sodyum aljinat yüzde 0 5 çözeltisi el blenderı ile çırpma",
      "kalsiyum laktat glukonat banyosu kalsiyum klorür",
      "sıvı çekirdekli havyar inci damlatma şırıngası",
      "saf su banyosunda durulama ve asitlik ph dengeleme"
    ],
    "baslik": "Moleküler Gastronomi: Sferifikasyon (Sodyum Aljinat & Kalsiyum Banyosu) İnci Havyar",
    "ikon": "🧪",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Mise en Place & Servis Öncesi",
    "akilliFisilti": "🧪 Sferifikasyonda meyve/sos püresi Sodyum Aljinat ile homojenleştirilir, Kalsiyum Laktat banyosuna damlatılarak ince jelatinimsi zarlı patlayan havyarlar elde edilir.",
    "oncedenYapilacaklar": [
      "Hedef meyve suyuna %0.5 oranında Sodyum Aljinat ekleyip el blenderıyla çırp ve hava kabarcıklarının sönmesi için 2 saat beklet",
      "Geniş bir kasede %1 oranında Kalsiyum Laktat Glukonatlı su banyosu hazırla",
      "Dozaj şırıngası ile aljinatlı karışımı kalsiyum banyosuna damla damla bırakıp 2 dakika jelleşmesini bekle",
      "Oluşan incileri delikli kaşıkla çıkarıp saf su dolu durulama kabına aktararak kimyasal reaksiyonu durdur"
    ]
  },
  {
    "id": "gastronomi_taze_makarna_semolina_ve_laminasyon_dinlendirme",
    "category": "kisisel_yasam",
    "domain": "GASTRONOMI",
    "keywords": [
      "taze el yapımı makarna hamuru tipo 00 un semolina",
      "yumurta sarısı oranı 100 gram una 1 yumurta kuralı",
      "hamur yoğurma gluten aktivasyonu ve streç film dinlendirme",
      "makarna açma makinesi kademeli silindir laminasyon inceltme",
      "tagliatelle ravioli dolgusu ve al dente haşlama süresi 2 dk"
    ],
    "baslik": "İtalyan Mutfağı: Taze Makarna Hamuru (Tipo 00 + Semolina), 30dk Dinlendirme & Laminasyon",
    "ikon": "🍝",
    "renk": "#FEF08A",
    "varsayilanZaman": "Mutfak Hazırlık & Servis Öncesi",
    "akilliFisilti": "🍝 Kusursuz taze makarna için 100 gr una 1 tam yumurta (veya ekstra sarı) konulur; hamur yoğrulduktan sonra elastikiyetini bırakması için en az 30 dk streçte dinlendirilir.",
    "oncedenYapilacaklar": [
      "Tipo 00 un ve İtalyan durum buğdayı irmiğini (Semolina) tezgaha yanardağ şeklinde açıp ortasına yumurtaları kır",
      "Çatalla içten dışa karıştırıp en az 10 dakika elastik ve pürüzsüz bir kıvam alana kadar yoğur",
      "Hamuru streç filme sarıp oda sıcaklığında 30-45 dakika gluten ağının gevşemesi için dinlendir",
      "Makarna merdanesi makinesinde 0'dan 7 numaraya kadar kademeli laminasyon ve katlama yaparak 1 mm incelikte aç"
    ]
  },
  {
    "id": "gastronomi_cost_food_maliyet_ve_menu_muhendisligi",
    "category": "finans",
    "domain": "GASTRONOMI",
    "keywords": [
      "restoran food cost yemek maliyeti hesaplama excel",
      "reçete gramaj standardı porsiyon maliyeti ve kdv",
      "hammadde fire yüzdesi yield management temizleme kaybı",
      "menü mühendisliği yıldız iş atı bulmaca köpek yemekler",
      "hedef food cost oranı yüzde 28 yüzde 32 aralığı"
    ],
    "baslik": "Restoran Yönetimi: Food Cost Analizi (%28-32), Fire Hesabı (Yield) & Menü Mühendisliği",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Menü Değişimi & Aylık Maliyet Kapanışı",
    "akilliFisilti": "📊 Başarılı restoranda Food Cost hedefi %28-32 aralığında tutulmalıdır; porsiyon maliyetine hammadde temizleme fireleri (Yield Loss) mutlaka eklenmelidir.",
    "oncedenYapilacaklar": [
      "Menüdeki her bir yemeğin reçete kartını gramaj, marinasyon, garnitür ve sos bazında kuruşu kuruşuna çıkar",
      "Et, balık ve sebzelerin ayıklama ve pişme sonrası fire oranlarını (Yield %) hesaplayarak net birim maliyeti bul",
      "Satış fiyatını belirlerken `Maliyet / Hedef Cost Oranı (0.30)` formülüyle satış fiyatı ve brüt kar marjını analiz et",
      "Menü Mühendisliği Matrisi (Boston Matrisi) ile popülerliği ve karlılığı yüksek \"Yıldız (Star)\" yemekleri menüde öne çıkar"
    ]
  },
  {
    "id": "ziraat_sera_iklimlendirme_fan_pad_ve_co2_gubreleme",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "akıllı sera otomasyonu fan-pad evaporatif soğutma",
      "sera içi karbondioksit co2 gübreleme 1000 ppm hedefi",
      "bağıl nem kontrolü sisleme sistemi fogging ve termal perde",
      "fotosentez ışık doygunluğu lüks metre ve par radyasyon",
      "sera havalandırma tepe ve yan pencereleri rüzgar sensörü"
    ],
    "baslik": "Örtüaltı Tarım: Sera İklimlendirme, Fan-Pad Evaporatif Soğutma & 1000 ppm CO2",
    "ikon": "🌱",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Günlük Sera Otomasyonu Takibi",
    "akilliFisilti": "🌱 Serada fotosentezi maksimize etmek için güneşli saatlerde CO2 seviyesi 1000 ppm'e yükseltilmeli; sıcaklıkta Fan-Pad ve termal gölgeleme perdesi devreye girmelidir.",
    "oncedenYapilacaklar": [
      "Sera otomasyon bilgisayarında CO2 enjeksiyon vanalarını gündüz saatleri için 800-1000 ppm set değerine ayarla",
      "Yüksek yaz sıcaklıklarında Fan-Pad peteklerindeki su devridaim pompasını ve egzoz fanlarını devreye sok",
      "Bağıl nemin %85 üzerine çıkıp mantari hastalık yapmasını önlemek için tepe pencerelerini kademeli havalandırmaya al",
      "Fotosentetik Aktif Radyasyon (PAR) sensörüne göre otomatik termal gölgeleme perdesini aç/kapa"
    ]
  },
  {
    "id": "ziraat_meyve_kis_budamasi_ve_bordo_bulamaci_uygulamasi",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "meyve ağaçlarında kış budaması taçlandırma lider dal",
      "obur sürgün çıkarma ışık alma ve dal açma açısı 45-60",
      "budama yarası aşı macunu sürme fungal enfeksiyon önleme",
      "kış mücadelesi yüzde 2lik bordo bulamacı bakır sülfat kireç",
      "budama makası dezenfeksiyonu çamaşır suyu solüsyonu"
    ],
    "baslik": "Meyvecilik: Kış Budaması, Dal Açma (45-60°), Aşı Macunu & %2 Bordo Bulamacı",
    "ikon": "🌳",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Ağaçlar Uyku Dönemindeyken (Ocak - Şubat)",
    "akilliFisilti": "🌳 Kış budaması sonrası kalın kesim yüzeylerine aşı macunu sürülmeli; ağaçlar uyanmadan önce fungal ve bakteriyel hastalıklara karşı %2'lik Bordo Bulamacı atılmalıdır.",
    "oncedenYapilacaklar": [
      "Budama aletlerini (makas, testere) ağaçtan ağaca geçerken %10'luk çamaşır suyu solüsyonuna batırarak dezenfekte et",
      "Ağacın merkezini açacak şekilde içe doğru büyüyen, birbirine sürtünen ve obur dalları dipten kes",
      "Çapı 2 cm'den kalın tüm kesik yaralarını fungisit içerikli aşı macunu ile hava almayacak şekilde kapat",
      "Gözler kabarmadan önce kuru havada %2'lik hazır veya taze hazırlanmış Bordo Bulamacı ile ağacı yıkar gibi ilaçla"
    ]
  },
  {
    "id": "ziraat_hububat_tohumluk_ilaclama_ve_surme_rastik",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "hububat buğday arpa tohumluk ilaçlama selektör",
      "sürme kör rastık ve kök boğazı çürüklüğü tohum ilacı",
      "fungisit tohum kaplama fludioxonil tebuconazole",
      "tohum çimlenme testi yüzde 95 çimlenme gücü",
      "mibzer ekim derinliği 4-5 cm ve dekara tohum miktarı kg"
    ],
    "baslik": "Tarla Bitkileri: Tohum İlaçlama (Selektör), Sürme/Rastık Önleme & Mibzer Ayarı",
    "ikon": "🌾",
    "renk": "#E2E8D5",
    "varsayilanZaman": "Ekimden 1-2 Gün Önce",
    "akilliFisilti": "🌾 Buğday ekimi öncesinde tohumlar Sürme ve Rastık hastalıklarına karşı selektörde sistemik fungisitle homojen kaplanmalı; mibzer ekim derinliği 4-5 cm'ye ayarlanmalıdır.",
    "oncedenYapilacaklar": [
      "Sertifikalı tohumluk partisinden numune alıp ıslak kurutma kağıdında Çimlenme Gücünü (%90+) test et",
      "Selektör makinesinde 100 kg tohum için önerilen dozda sıvı tohum ilacını suyla seyreltip tohum yüzeyine homojen püskürt",
      "İlaçlanan tohumları gölgede havalandırıp kurutarak mibzer tohum gözlerine aktar",
      "Mibzer tekerlek kalibrasyonunu yaparak dekara atılacak tohum miktarını (Örn: 20-22 kg/da) ayarla"
    ]
  },
  {
    "id": "ziraat_zeytinde_periyodisite_ve_bor_cinko_besleme",
    "category": "ev_teknik",
    "domain": "ZIRAAT",
    "keywords": [
      "zeytin ağacı periyodisite var yılı yok yılı kırma",
      "yapraktan bor ve çinko gübreleme çiçeklenme öncesi",
      "zeytin güvesi çiçek nesli ilaçlama zamanı",
      "zeytin halkalı leke hastalığı bakırlı mücadele sonbahar",
      "hasat silkme makinesi ve zeytin dal kırılmasını önleme"
    ],
    "baslik": "Zeytincilik: Periyodisite Kırma, Çiçeklenme Öncesi Bor-Çinko & Halkalı Leke",
    "ikon": "🫒",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Çiçeklenme Öncesi (Nisan) & Hasat Sonrası",
    "akilliFisilti": "🫒 Zeytinde periyodisiteyi (yok yılını) azaltmak için çiçek somakları belirdiğinde yapraktan Bor ve Çinko uygulanmalı; hasatta dallar zedelenmemelidir.",
    "oncedenYapilacaklar": [
      "Çiçek tomurcukları patlamadan 2 hafta önce polen tüpü gelişimi ve meyve tutumu için yapraktan Bor + Çinko pülverize et",
      "Zeytin Güvesi (Prays oleae) çiçek nesli için çiçeklerin %5-10'u açtığında biyolojik preparat (Bacillus thuringiensis) uygula",
      "Mekanik sarsıcı ile hasat yaparken kabuk soyulmasını ve sürgün kırılmasını engelleyecek kauçuk koruyucu pabuç tak",
      "Sonbahar yağmurlarından önce ve kış çıkışında Zeytin Halkalı Leke hastalığına karşı bakırlı preparatla koruma sağla"
    ]
  },
  {
    "id": "ziraat_organik_tarim_sertifikasyon_ve_gecis_sureci",
    "category": "resmi",
    "domain": "ZIRAAT",
    "keywords": [
      "organik tarım kanunu ve organik tarım yönetmeliği",
      "organik tarım müteşebbis sertifikası ve sözleşmesi",
      "geçiş süreci 1 geçiş süreci 2 ve organik ürün logosu",
      "organik tarımda yasaklı sentetik gübre ve kimyasal pestisit",
      "organik tarım bilgi sistemi otbis ve sertifikasyon kuruluşu denetimi"
    ],
    "baslik": "Organik Tarım: OTBİS Kaydı, 2-3 Yıllık Geçiş Süreci & Yasaklı Girdi Denetimi",
    "ikon": "📜",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sertifikasyon Denetimi & Hasat Beyanı",
    "akilliFisilti": "📜 Organik tarımda tek yıllık bitkilerde 2 yıl, çok yıllıklarda 3 yıl Geçiş Süreci (Geçiş-1, Geçiş-2) uygulanır; sentetik kimyasal kullanımı kesinlikle yasaktır.",
    "oncedenYapilacaklar": [
      "Yetkilendirilmiş Kontrol ve Sertifikasyon Kuruluşu (KSK) ile sözleşme imzalayıp parseli Bakanlık OTBİS sistemine kaydet",
      "Komşu konvansiyonel arazilerden kimyasal bulaşmasını önlemek için en az 5-10 metrelik Tampon Bölge (Bariyer) bırak",
      "Yalnızca Organik Tarım Yönetmeliği Ek-1 ve Ek-2'de izin verilen organik gübre ve biyolojik mücadele ajanlarını kullan",
      "Tüm gübreleme, ilaçlama ve hasat miktarlarını Arazi Kayıt Defterine günü gününe işleyip denetçiye sun"
    ]
  }
];
