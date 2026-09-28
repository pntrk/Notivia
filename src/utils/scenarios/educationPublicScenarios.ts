import type { ShortScenarioMatch } from '../scenarioDatabase.ts';

/**
 * Notivia Bilişsel Modülü: EGITIM, KAMU, SANAT_MEDYA, MEDYA_ILETISIM_YAYIN, KUAFOR
 * Toplam 235 Bilişsel Senaryo
 */
export const EDUCATION_PUBLIC_SCENARIOS: ShortScenarioMatch[] = [
  {
    "id": "egitim_odul_disiplin_savunma",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "ödül ve disiplin kurulu",
      "öğrenci disiplin savunması",
      "3 gün savunma süresi",
      "disiplin cezası kararı",
      "disiplin kurulu toplanması"
    ],
    "baslik": "Ödül ve Disiplin Kurulu & 3 Günlük Savunma Tebliği",
    "ikon": "🏫",
    "renk": "#FEF08A",
    "varsayilanZaman": "Olaydan İtibaren 3 İş Günü",
    "hazirlikZamani": "Nöbetçi Öğretmen ve Görgü Tutanakları",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏫 MEB Ortaöğretim Kurumları Yönetmeliği gereğince öğrenciye en az 3 iş günü süre verilmeden savunması alınamaz ve ceza kararı tesis edilemez.",
    "oncedenYapilacaklar": [
      "Nöbetçi öğretmen ve okul idaresi tarafından tutulan disiplin olay tutanağını incele",
      "Hakkında soruşturma açılan öğrenciye ve velisine yazılı Savunma İstem Tebligatını imzalat",
      "Rehberlik ve Psikolojik Danışma servisinden öğrenci gelişim ve gözlem raporunu talep et",
      "3 iş günü sonunda Disiplin Kurulunu toplayıp veli ve öğrenci savunmasını zapta bağlayarak kararı oyla"
    ]
  },
  {
    "id": "egitim_tasimali_servis_denetimi",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "okul servis denetimi",
      "taşımalı eğitim föyü",
      "okul taşıtı yazısı",
      "dur lambası kontrolü",
      "rehber personel servis"
    ],
    "baslik": "Taşımalı Eğitim Okul Servis Aracı Denetimi",
    "ikon": "🚌",
    "renk": "#FEF08A",
    "varsayilanZaman": "Sabah Servis İndirme Saati (08:00)",
    "hazirlikZamani": "Denetim Föyü & Araç Belgeleri",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🚌 Okul Servis Araçları Yönetmeliği uyarınca dur lambası, okul taşıtı yazısı, 3 noktalı emniyet kemeri ve rehber personel (hostes) denetimi zorunludur.",
    "oncedenYapilacaklar": [
      "Servis aracının D9/yetki belgesini, şoförün SRC-2 ve adli sicil kaydını kontrol et",
      "Araç arkasındaki ışıklı 'DUR' lambasının frene basıldığında yandığını bizzat gözlemle",
      "Öğrencilerin tamamının emniyet kemerlerini takılı olduğunu ve ayakta yolcu bulunmadığını teyit et",
      "Rehber personelin araçta fiilen bulunduğunu doğrulayıp Servis Denetim Formunu şoförle karşılıklı imzala"
    ]
  },
  {
    "id": "egitim_tubitak_proje_kapanis",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "tübitak 2209",
      "tübitak 4006",
      "proje kapanış raporu",
      "tübitak harcama faturası",
      "bap sonuç raporu"
    ],
    "baslik": "TÜBİTAK Proje Başvuru & Fatura Kapanış Raporu",
    "ikon": "🔬",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Proje Bitiş Tarihinden İtibaren 30 Gün",
    "hazirlikZamani": "Faturalar & Harcama Pusulaları İcmali",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🔬 TÜBİTAK mevzuatı uyarınca destek bütçesinden yapılan tüm harcama faturaları proje yürütücüsü adına kesilmeli ve sisteme taranarak yüklenmelidir.",
    "oncedenYapilacaklar": [
      "Proje bütçe fasıllarına (kırtasiye, seyahat, sarf malzeme) ait faturaları vergi numarası ve kalem bazında derle",
      "Öğrenci bursiyer bordrolarını ve banka dekontlarını harcama dosyasına iliştir",
      "Proje araştırma sonuçlarını ve yayın/patent çıktılarını içeren Sonuç Raporu taslağını oluştur",
      "TÜBİTAK ARBİS/PRODİS portalına mali ve teknik raporları e-İmza ile yükleyip bakiye fonu iade et"
    ]
  },
  {
    "id": "egitim_evde_egitim_hizmeti_onay",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "evde eğitim",
      "evde eğitim haftalık ders",
      "ram evde eğitim kararı",
      "sağlık kurulu raporu evde eğitim",
      "özel eğitim komisyonu"
    ],
    "baslik": "e-Okul Evde Eğitim Hizmeti & Ders Programı Onayı",
    "ikon": "🏠",
    "renk": "#FEF08A",
    "varsayilanZaman": "Dönem Başı / Rapor Onayında",
    "hazirlikZamani": "RAM Kararı & Hekim Heyet Raporu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏫 En az 4 ay süreyle örgün eğitime devam edemeyecek durumda olan öğrenciler için İlçe Özel Eğitim Hizmetleri Kurulu kararıyla evde eğitim açılır.",
    "oncedenYapilacaklar": [
      "Öğrencinin en az 4 aylık durum bildirir sağlık kurulu raporunu ve veli başvuru dilekçesini dosyala",
      "Rehberlik ve Araştırma Merkezi (RAM) tarafından düzenlenen Evde Eğitim Raporunu incele",
      "Öğrencinin sınıf seviyesine göre haftalık 10-18 saatlik branş öğretmeni görevlendirme çizelgesini yap",
      "Kaymakamlık onayı sonrası e-Okul sisteminde öğrenciyi 'Evde Eğitim Alıyor' olarak işaretle ve ek ders onayını aç"
    ]
  },
  {
    "id": "egitim_mebbis_hizmetici_egitim_faaliyet",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "mebbis hizmetiçi eğitim",
      "kurs katılım belgesi",
      "hizmetiçi onay",
      "öba seminer",
      "mahalli hizmetiçi"
    ],
    "baslik": "MEBBİS Hizmetiçi Eğitim & Katılım Belgesi Onayı",
    "ikon": "🎓",
    "renk": "#FEF08A",
    "varsayilanZaman": "Seminer / Kurs Bitiş Günü",
    "hazirlikZamani": "Devam Takip Föyü & Sınav Değerlendirme",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🏫 MEB Hizmetiçi Eğitim Yönetmeliği uyarınca kurs ve seminerlerde %80 devam şartı aranır; sınavdan 70 ve üzeri alanlara MEBBİS belgesi onaylanır.",
    "oncedenYapilacaklar": [
      "Eğitim yöneticisi tarafından günlük sabah ve öğleden sonra ıslak imzalı yoklama föylerini topla",
      "Faaliyet sonu ölçme değerlendirme sınav sonuçlarını sisteme işle (Asgari 70 başarı puanı)",
      "MEBBİS Hizmetiçi Eğitim Modülü üzerinden kursiyerlerin devam durumunu ve kurs sonu notunu onayla",
      "Karekodlu Katılım/Başarı Belgelerini e-Devlet ve MEBBİS üzerinden öğretmenlerin erişimine aç"
    ]
  },
  {
    "id": "kamu_ekap_acik_ihale_komisyon",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "ekap açık ihale",
      "ihale komisyon kararı",
      "aşırı düşük teklif",
      "4734 sayılı kanun m 19",
      "ekap e-teklif"
    ],
    "baslik": "4734 KİK Açık İhale & EKAP Komisyon Kararı",
    "ikon": "🏛️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "İhale Saati (EKAP Açılışı)",
    "hazirlikZamani": "Yaklaşık Maliyet & Şartname Kontrolü",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏛️ 4734 sayılı Kanun m. 19 uyarınca e-İhalelerde teklifler EKAP üzerinden eş zamanlı açılır, geçici teminat ve riyazi hata denetimi yapılır.",
    "oncedenYapilacaklar": [
      "Yaklaşık maliyet hesap cetvelini ve ihale onay belgesini İhale Komisyonu üyelerine imzalat",
      "İhale saatinde EKAP portalı üzerinden şifreleri çözerek firmaların e-teklif mektuplarını ve geçici teminatlarını listele",
      "Varsa aşırı düşük teklif sorgulaması (m. 38) için isteklilere analiz ve fiyat bileşenleri tebligatı çıkar",
      "İhale Komisyonu Kararını tanzim edip Harcama Yetkilisinin onayına sunarak kesinleşen ihale kararını EKAP'tan bildir"
    ]
  },
  {
    "id": "kamu_protokol_celenk_oturan_duzen",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "protokol oturma düzeni",
      "çelenk sunma töreni",
      "devlet protokolü",
      "mülki idare amiri karşılama",
      "ulusal bayram töreni"
    ],
    "baslik": "Resmi Devlet Protokolü & Çelenk Sunma / Oturma Düzeni",
    "ikon": "🎖️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Tören Saati (09:00)",
    "hazirlikZamani": "Protokol Listesi & Ses/Kürsü Provasi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏛️ Ulusal ve Resmi Bayramlar Yönetmeliği gereği çelenk sunma sırası Mülki İdare Amiri, Garnizon Komutanı ve Belediye Başkanı hiyerarşisindedir.",
    "oncedenYapilacaklar": [
      "Protokol Listesine göre protokol tribünü isimliklerini (Protokol Sıralaması: Valilik/Kaymakamlık, Garnizon, Belediye) yerleştir",
      "Atatürk Anıtı çelenk sunumunda çelenk taşıyıcı personelin kılık-kıyafet ve çelenk kurdelelerini denetle",
      "İstiklal Marşı ses sistemi, saygı duruşu sireni ve bando koordinasyonunu telsizle sağla",
      "Makam aracının tören alanına intikal güzergahını ve karşılama heyetini hazırla"
    ]
  },
  {
    "id": "kamu_yillik_izin_devri_dmk102",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "yıllık izin devri",
      "657 dmk 102",
      "cari yıl izni",
      "yanan yıllık izin",
      "izin talep formu ebys"
    ],
    "baslik": "657 DMK 102 Yıllık İzin Devri (Cari Yıl + 1 Yıl Kuralı)",
    "ikon": "📅",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Aralık Ayı Kapanışı (Yıl Sonu)",
    "hazirlikZamani": "Özlük Birimi İzin Bakiye Çizelgesi",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏛️ 657 sayılı DMK m. 102 uyarınca memurların cari yıl ile bir önceki yıla ait yıllık izinleri birleştirilebilir; daha önceki yılların izni yanar.",
    "oncedenYapilacaklar": [
      "Personelin hizmet yılına göre (1-10 yıl arası 20 gün, 10 yıldan fazla 30 gün) izin hakkını hesapla",
      "Bir önceki yıldan devreden izin gün sayısını belirle ve 31 Aralık tarihine kadar kullanılmasını planla",
      "EBYS üzerinden İzin Talep Formunu tanzim edip birim amiri ve vekalet bırakılacak personeli seç",
      "İzin onay belgesinin asalet ve özlük dosyasına tescil edildiğini teyit et"
    ]
  },
  {
    "id": "kamu_mal_bildirimi_beyannamesi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "mal bildirimi formu",
      "3628 sayılı kanun",
      "sonu 0 ve 5 ile biten yıllar",
      "ek mal bildirimi",
      "kapalı zarf mal beyanı"
    ],
    "baslik": "3628 Sayılı Kanun Mal Bildirimi Beyannamesi",
    "ikon": "📜",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Şubat Ayı Sonu (Genel Beyan Yılı)",
    "hazirlikZamani": "Tapu, Araç ve Banka Varlık Dökümü",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🏛️ 3628 sayılı Kanun gereği memurlar sonu (0) ve (5) ile biten yıllarda genel mal beyanı verir; net maaşın 5 katını aşan artışta 1 ayda ek beyan şarttır.",
    "oncedenYapilacaklar": [
      "Memur, eşi ve velayeti altındaki çocuklarına ait taşınmaz, taşıt, kooperatif ve altın/nakit varlıklarını listele",
      "Net aylık maaşın 5 katını aşan borç ve alacak kalemlerini resmi Mal Bildirimi Formuna işle",
      "Formu doldurup imzaladıktan sonra kapalı mühürlü zarfa koyarak zarfın üzerine kimlik bilgilerini yaz",
      "Kapalı zarfı zimmet karşılığı Kurum Teftiş / Özlük Birimine teslim edip alındı belgesini al"
    ]
  },
  {
    "id": "kamu_resmi_muhur_darphane_tutanak",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "resmi mühür beratı",
      "darphane resmi mühür",
      "mühür devir teslim tutanağı",
      "mühür kaybolması",
      "resmi mühür yönetmeliği"
    ],
    "baslik": "Resmi Mühür Beratı & Darphane Devir-Teslim Tutanağı",
    "ikon": "🖋️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Yönetici Değişikliği / Mühür Yenileme",
    "hazirlikZamani": "Mühür Beratı & Çelik Kasa Muhafazası",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏛️ Resmi Mühür Yönetmeliği uyarınca resmi mühürler Darphane ve Damga Matbaası tarafından üretilir; devir-teslimi beratı ile birlikte tutanakla yapılır.",
    "oncedenYapilacaklar": [
      "Resmi mühür ile birlikte Darphanece verilen Mühür Beratının aslı ve numarasını karşılaştır",
      "Görevi devreden ve devralan harcama yetkilileri arasında 3 nüsha Resmi Mühür Devir-Teslim Tutanağı düzenle",
      "Eski veya aşınmış mühür varsa Darphane Genel Müdürlüğüne imha edilmek üzere resmi yazıyla gönder",
      "Mührün mesai saatleri dışında kilitli çelik kasada muhafaza edildiğini emniyet altına al"
    ]
  },
  {
    "id": "sanat_medya_ebu_r128_lufs_master",
    "category": "is_kariyer",
    "domain": "MEDYA_ILETISIM_YAYIN",
    "keywords": [
      "ebu r128 ses",
      "-23 lufs normalizasyon",
      "max true peak -1",
      "loudness radar ölçümü",
      "broadcast ses master"
    ],
    "baslik": "EBU R128 Ses Yüksekliği (-23 LUFS / -1 dBTP) Normalizasyonu",
    "ikon": "🎛️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Final Audio Master Export",
    "hazirlikZamani": "Loudness Meter Plugin Analizi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🎬 RTÜK ve EBU R128 televizyon yayın standardı gereği entegre ses yüksekliği -23.0 LUFS (±0.5), Max True Peak ise -1.0 dBTP olmalıdır.",
    "oncedenYapilacaklar": [
      "DAW veya DaVinci Resolve Fairlight mikserinin master kanalına TC Electronic Loudness Radar eklentisini tak",
      "Program boyunca entegre ses yüksekliğinin (Integrated Loudness) -23 LUFS seviyesini tutturmasını sağla",
      "Diyalog ve müzik patlamalarında Max True Peak değerinin -1 dBTP'yi kesinlikle aşmadığını limitleyici ile doğrula",
      "Export edilen 24-bit 48kHz WAV dosyasının loudness compliance raporunu arşivle"
    ]
  },
  {
    "id": "sanat_medya_3_nokta_isik_kelvin",
    "category": "is_kariyer",
    "domain": "MEDYA_ILETISIM_YAYIN",
    "keywords": [
      "3 nokta ışık kurulumu",
      "key light ana ışık",
      "fill light dolgu",
      "back light saç ışığı",
      "renk sıcaklığı kelvin 5600k"
    ],
    "baslik": "3 Nokta Işık Kurulumu (Key, Fill, Back) & Kelvin Dengesi",
    "ikon": "💡",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Röportaj / Stüdyo Çekim Öncesi",
    "hazirlikZamani": "Işık Ayakları & Softbox Montajı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🎬 Konuğun yüzünde derinlik yaratmak için Ana Işık (Key) 45°, Dolgu Işığı (Fill) %50 güçte ve Saç Işığı (Back Light) arkadan 5600K gün ışığında kurulur.",
    "oncedenYapilacaklar": [
      "Karakterin burnunun baktığı yöne 45 derece açıyla ana ışığı (Key Light) softbox ile kur",
      "Karşı tarafa gölgeleri yumuşatmak için 2:1 oranında daha düşük güçte dolgu ışığını (Fill Light) veya reflektörü yerleştir",
      "Karakteri arka plandan ayırmak için arkadan tepe hizasından saç ve omuz ışığını (Rim/Hair Light) ayarla",
      "Tüm ışık kaynaklarının renk sıcaklığını (3200K Tungsten veya 5600K Daylight) renk ölçer ile eşitle"
    ]
  },
  {
    "id": "sanat_medya_proxy_workflow_conforming",
    "category": "is_kariyer",
    "domain": "MEDYA_ILETISIM_YAYIN",
    "keywords": [
      "proxy iş akışı",
      "prores proxy kurgu",
      "conforming online kurgu",
      "raw kurgu relink",
      "dnxhr lb proxy"
    ],
    "baslik": "Offline/Online Kurgu Proxy İş Akışı & Conforming",
    "ikon": "🖥️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Kurgu Başlangıcı ve Renk Fazı",
    "hazirlikZamani": "DIT Batch Proxy Render",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🎬 4K/8K RAW dosyalar ProRes Proxy formatında hafif kurgulanır; kurgu kilitlendiğinde (Picture Lock) conforming ile orijinal RAW medyaya bağlanır.",
    "oncedenYapilacaklar": [
      "DaVinci Resolve veya Media Encoder ile orijinal çekimlerden 1080p ProRes Proxy veya DNxHR LB kopyalar oluştur",
      "Dosya isimleri, timecode ve ses kanallarının orijinal RAW klip ile birebir aynı kaldığını doğrula",
      "Kurgucuya proxy medyayı vererek akıcı kurgu yapmasını sağla ve Picture Lock (Kurgu Kilidi) al",
      "Color Grading aşamasında projeyi tek tıkla orijinal kamera RAW ve Log dosyalarına relink (conforming) yap"
    ]
  },
  {
    "id": "sanat_medya_srt_rtmp_canli_yayin_yedek",
    "category": "is_kariyer",
    "domain": "MEDYA_ILETISIM_YAYIN",
    "keywords": [
      "srt canlı yayın",
      "rtmp akış anahtarı",
      "canlı yayın yedekleme",
      "obs studio gecikme",
      "bonding internet"
    ],
    "baslik": "SRT / RTMP Canlı Yayın Yayını & Çift Hat Yedekleme (Bonding)",
    "ikon": "📡",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Yayından 45 Dk Önce Test Yayını",
    "hazirlikZamani": "Encoder & Stream Key Doğrulama",
    "hazirlikSaatOncesi": 1.5,
    "akilliFisilti": "🎬 Canlı yayınlarda paket kaybını önlemek için SRT protokolü ve 2 ayrı GSM hattını birleştiren Bonding internet router kullanılmalıdır.",
    "oncedenYapilacaklar": [
      "YouTube/Twitch/Sosyal Medya kontrol panelinden birincil (Primary) ve yedek (Backup) RTMP/SRT URL ve akış anahtarını al",
      "Donanımsal video encoder cihazına (LiveU/Kiloview/OBS) video girişini SDI üzerinden ver",
      "İnternet bağlantısını 4.5G bonding cihazı veya fiber hat ile en az 10 Mbps upload hızına sabitle",
      "Yayından 30 dakika önce gizli test yayını başlatıp ses/görüntü senkronunu ve kare düşmesini (Dropped Frames 0) doğrula"
    ]
  },
  {
    "id": "sanat_medya_drone_iha1_shgm_notam",
    "category": "is_kariyer",
    "domain": "MEDYA_ILETISIM_YAYIN",
    "keywords": [
      "drone uçuş izni",
      "shgm iha-1 kaydı",
      "notam kısıtlı bölge",
      "yeşil bölge drone",
      "drone sigortası"
    ],
    "baslik": "SHGM İHA-1 Ticari Drone Uçuş İzni & NOTAM Kontrolü",
    "ikon": "🚁",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Uçuştan En Az 5 İş Günü Önce",
    "hazirlikZamani": "Uçuş Koordinatları & Harita Çizimi",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🎬 SHGM İHA Talimatı uyarınca meskun mahalde veya kırmızı/notamlı bölgede çekim yapabilmek için 5 iş günü önceden Valilik/SHGM izni şarttır.",
    "oncedenYapilacaklar": [
      "SHGM İHA Kayıt Sistemi üzerinden drone pilot lisansını ve İHA-1 ticari sigorta poliçesini doğrula",
      "Çekim yapılacak alanın koordinatlarını (Poligon) çizerek sistemdeki kırmızı/yeşil bölge durumunu sorgula",
      "Kırmızı/özel izinli bölgeler için İl Emniyet Müdürlüğü ve Mülki İdare Amirliği uçuş izin yazısını al",
      "Uçuş günü güncel havacılık NOTAM bültenini ve rüzgar/K-indeks jeomanyetik fırtına değerlerini kontrol et"
    ]
  },
  {
    "id": "kuafor_fitzpatrick_lazer_joule",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "fitzpatrick cilt tipi",
      "lazer epilasyon joule",
      "alexandrite lazer joule",
      "cilt tipi analizi",
      "lazer yanık önleme"
    ],
    "baslik": "Fitzpatrick Cilt Tipi (I-VI) & Lazer Epilasyon Joule Ayarı",
    "ikon": "⚡",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Seans Başlangıcında",
    "hazirlikZamani": "Cilt Analizi & Test Atışı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💇 Koyu tenlerde (Tip IV-VI) Alexandrite yerine Nd:YAG lazer tercih edilmeli; cilt yanıklarını önlemek için enerji (Joule) kademeli artırılmalıdır.",
    "oncedenYapilacaklar": [
      "Hastanın ten ve kıl rengi skalasını Fitzpatrick Cilt Tipi Tablosuna (Tip I Çok Açık - Tip VI Çok Koyu) göre belirle",
      "Müşterinin son 1 ay içinde solaryum veya güneş banyosu yapmadığını sözlü ve yazılı teyit et",
      "Cilt tipine göre darbe genişliği (pulse duration ms) ve enerji akısını (Fluence J/cm²) cihazda ayarla",
      "Görünmeyen küçük bir bölgeye test atışı yap, 10 dakika eritem ve ödem reaksiyonunu gözlemleyip seansı başlat"
    ]
  },
  {
    "id": "kuafor_soguk_sari_cila_toner",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "soğuk sarı cila",
      "turunculaşma karşıtı toner",
      "mor şampuan cila",
      "9.1 10.21 cila formülü",
      "açma sonrası toner"
    ],
    "baslik": "Açma Sonrası Soğuk Sarı / Gri Cila (Toner) Nötralizasyonu",
    "ikon": "🎨",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Açıcı Yıkandıktan Sonra (Lavabo)",
    "hazirlikZamani": "Küllü/İrize Boya & 10 Volüm Karışımı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💇 Sarı saçta kalan çiğ sarı ve turuncu yansımaları nötralize etmek için renk çemberinde karşıt renk olan küllü (.1) ve irize (.2) cila 10 volümle sürülür.",
    "oncedenYapilacaklar": [
      "Oryal ile açılan saçı arındırıcı şampuanla yıkayıp nemini havluyla %80 oranında al",
      "9.1 (Küllü) ve 10.21 (İrize) tonlarını eşit miktarda ılık su ve 10 volüm (%3) aktivatörle emülsiyon kıvamında çırp",
      "Karışımı lavaboda saçın sarı kısımlarına masaj yaparak eşit şekilde yedir",
      "Aynada saçın gri/platin tonu yakaladığı anı (yaklaşık 5-10 dakika) gözlemleyip derhal durula ve asidik saç kremi uygula"
    ]
  },
  {
    "id": "kuafor_microblading_tek_kullanimlik_igne",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "microblading steril iğne",
      "kıl tekniği kaş",
      "kalıcı makyaj alerji formu",
      "tek kullanımlık microblading ucu",
      "kaş altın oran"
    ],
    "baslik": "Microblading Kıl Tekniği & Steril İğne / Alerji Onamı",
    "ikon": "✒️",
    "renk": "#F3E8FF",
    "varsayilanZaman": "İşlem Başlangıcı",
    "hazirlikZamani": "Altın Oran Kumpas Çizimi & Anestezi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💇 Enfeksiyon riskini sıfırlamak için microblading U-bıçakları müşterinin gözü önünde açılmalı, organik pigment alerji onam formu imzalatılmalıdır.",
    "oncedenYapilacaklar": [
      "Altın oran kumpası ve boyalı ip ile yüz simetrisine uygun kaş ön çizimini yapıp müşteriye aynada onaylat",
      "Bölgeye topikal anestezik krem sürüp streç film altında 20 dakika beklet",
      "Steril ambalajlı tek kullanımlık microblading iğnesini açıp tek kullanımlık kalem tutucuya tak",
      "Deriye epidermisi aşmayacak hafif kesilerle mineral pigmenti yerleştir ve işlem sonu antibiyotikli krem sür"
    ]
  },
  {
    "id": "kuafor_kimyasal_peeling_notralizasyon",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "kimyasal peeling nötralizasyon",
      "glikolik asit soyma",
      "peeling kronometre süresi",
      "spf 50 güneş koruyucu",
      "aha bha peeling"
    ],
    "baslik": "Kimyasal Peeling (AHA/BHA) & Bazik Nötralizasyon Protokolü",
    "ikon": "✨",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Uygulamadan Sonraki 2-5 Dakika",
    "hazirlikZamani": "Cilt Yağ Arındırma & Kronometre",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💇 Glikolik asit peelinginde kimyasal yanığı önlemek için kronometre 3 dakikayı aşmamalı, sodyum bikarbonatlı solüsyonla asit anında nötralize edilmelidir.",
    "oncedenYapilacaklar": [
      "Cildi pre-peel solüsyonu ile temizleyerek sebum ve yağ tabakasından tamamen arındır",
      "Göz çevresi ve dudak mukozasını vazelin ile koruma altına al",
      "%30 Glikolik asit veya salisilik asit solüsyonunu yelpaze fırçayla yüze eşit sür ve kronometreyi başlat",
      "Ciltte pembeleşme başladığında (maks. 3-4 dakika) bazik nötralizatör spreyi sıkarak asidi durdur ve SPF 50+ mineral güneş kremi uygula"
    ]
  },
  {
    "id": "kuafor_agda_tek_spatula_kurali",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "tek spatula kuralı",
      "sıcak ağda hijyeni",
      "ağda kazan temizliği",
      "çift daldırma yasağı",
      "ağda kıl dönmesi önleme"
    ],
    "baslik": "Sıcak Ağda Hijyeni & Tek Kullanımlık Spatula Protokolü",
    "ikon": "🍯",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Uygulama Süresince",
    "hazirlikZamani": "Ağda Isı Ayarı (42-45°C) & Pudralama",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💇 Hijyen standardı: Spatula asla ağda kazanına ikinci kez daldırılamaz (No Double-Dipping); her sürme için yeni ahşap spatula kullanılır.",
    "oncedenYapilacaklar": [
      "Sir ağda kazanının sıcaklığını termostatla cilt yakmayacak seviyeye (42°C-45°C) ayarla ve bilek içinde test et",
      "Uygulama yapılacak cildi talk pudrası ile kurulayarak ter ve nemi yok et",
      "Her sürüm için yeni steril tek kullanımlık tahta spatula kullan, spatulayı asla ağda kazanına geri sokma",
      "İşlem bitiminde kıl dönmesi ve batığı önleyici yatıştırıcı azulen yağı masajı uygula"
    ]
  },
  {
    "id": "egitim_erasmus_ogrenim_hareketliligi_ogrenim_anlasmasi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "erasmus learning agreement",
      "öğrenim anlaşması la",
      "akts kredi eşdeğerliği",
      "erasmus koordinatörü onay",
      "ects tanınırlık belgesi"
    ],
    "baslik": "Erasmus+ Öğrenim Anlaşması (Learning Agreement) & AKTS İntibakı",
    "ikon": "🌍",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Hareketlilik Başlamadan 60 Gün Önce",
    "hazirlikZamani": "Bölüm İntibak Komisyonu Kararı",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🎓 Erasmus+ Learning Agreement (Before Mobility) belgesinde 30 AKTS karşılığı ders eşleştirmesi Bölüm Kurulu kararıyla kesinleşmeden hibe ödemesi yapılamaz.",
    "oncedenYapilacaklar": [
      "Gidilecek üniversitenin ders bilgi paketini (Syllabus) inceleyip zorunlu ve seçmeli derslerle eşleştir",
      "Erasmus+ Online Learning Agreement (OLA) platformuna 30 ECTS ders listesini gir",
      "Bölüm Erasmus Koordinatörü ve Fakülte Yönetim Kurulu İntibak Kararı onayını al",
      "Karşı üniversite kurumsal koordinatörünün dijital imzasını tamamlatıp Uluslararası İlişkiler Ofisine ilet"
    ]
  },
  {
    "id": "egitim_tubitak_2209_universite_ogrenci_projesi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "tübitak 2209-a",
      "üniversite öğrenci projesi",
      "tybs sistem onay",
      "danışman onay formu 2209",
      "öğrenci araştırma bütçesi"
    ],
    "baslik": "TÜBİTAK 2209-A Üniversite Öğrencileri Araştırma Projesi Başvurusu",
    "ikon": "🔬",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Çağrı Takvimi Son Günü Saat 17:30",
    "hazirlikZamani": "Proje Önerisi Formu & İş-Zaman Çizelgesi",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🎓 TÜBİTAK 2209-A başvurusunda akademik danışman onayı TYBS sistemi üzerinden saat 17:30'a kadar verilmezse başvuru doğrudan elenir.",
    "oncedenYapilacaklar": [
      "TÜBİTAK Proje Öneri Formunda Özgün Değer, Yöntem, Proje Yönetimi ve Yaygın Etki bölümlerini yaz",
      "İş paketleri, Gantt iş-zaman şeması ve sarf malzeme bütçe tablosunu hazırla",
      "TYBS (TÜBİTAK Yönetim Bilgi Sistemi) üzerinden öğrenci başvurusunu sisteme yükle",
      "Akademik danışmanın e-imza veya sistem onayı vermesini sağlayıp başvuru belgesi çıktısını arşivle"
    ]
  },
  {
    "id": "egitim_meb_bep_bireysellestirilmis_egitim_plani",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "bireyselleştirilmiş eğitim planı bep",
      "bep birimi toplantı tutanağı",
      "özel eğitim ram raporu",
      "kaynaştırma öğrencisi planı",
      "bep kazanım tablosu"
    ],
    "baslik": "MEB Özel Eğitim BEP (Bireyselleştirilmiş Eğitim Planı) Hazırlama",
    "ikon": "📚",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Dönem Başından İtibaren İlk Ay",
    "hazirlikZamani": "RAM Raporu & Eğitsel Performans Tespiti",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "🎓 Özel Eğitim Hizmetleri Yönetmeliği uyarınca kaynaştırma/bütünleştirme öğrencisi için BEP Geliştirme Birimi toplanarak ders bazlı BEP planını imzalamalıdır.",
    "oncedenYapilacaklar": [
      "Rehberlik ve Araştırma Merkezi (RAM) raporundaki yetersizlik türü ve eğitsel önerileri incele",
      "Öğrencinin her ders için mevcut performans düzeyini belirle ve uzun/kısa dönemli hedefleri yaz",
      "Ders öğretmenleri, rehber öğretmen, okul müdür yardımcısı ve veli katılımıyla BEP Birim Toplantısını yap",
      "İmzalı BEP dosyasını okul rehberlik servisine ve e-Okul Özel Eğitim modülüne kaydet"
    ]
  },
  {
    "id": "egitim_okul_kantin_denetim_komisyonu",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "okul kantin denetimi",
      "okul gıdası logosu",
      "kantin hijyen denetim formu",
      "gazlı içecek satışı yasak",
      "kantin fiyat tarifesi"
    ],
    "baslik": "MEB Okul Kantini & Yemekhane Aylık Denetim Komisyonu",
    "ikon": "🥪",
    "renk": "#FED7AA",
    "varsayilanZaman": "Her Ayın Son Haftası",
    "hazirlikZamani": "Tarım İlçe & Sağlık Bakanlığı Kriterleri",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🎓 MEB Genelgesi uyarınca Okul Gıdası Logosu olmayan, cips, asitli içecek veya kızartma satan işletmelere ilk tespitte uyarı ve idari yaptırım uygulanır.",
    "oncedenYapilacaklar": [
      "Müdür yardımcısı, biyoloji/sağlık öğretmeni ve okul aile birliği üyesinden oluşan heyeti topla",
      "Kantin işletmecisinin portör muayene kartı ve hijyen eğitimi belgelerini kontrol et",
      "Buzdolaplarının sıcaklıklarını (+4°C soğuk, -18°C donuk) termometre ile ölçüp son kullanma tarihlerini denetle",
      "Denetim tutanağını 3 nüsha imzalayarak bir suretini kantin panosuna as, bir suretini İlçe MEM'e gönder"
    ]
  },
  {
    "id": "egitim_universite_akademik_tesvik_yoksis",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "akademik teşvik ödeneği",
      "yöksis yayın puanı",
      "akademik teşvik komisyonu",
      "makale doi doçentlik",
      "30 puan teşvik barajı"
    ],
    "baslik": "Akademik Teşvik Ödeneği Başvurusu & YÖKSİS Puan Doğrulama",
    "ikon": "🎖️",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Her Yıl 1-15 Ocak Arası",
    "hazirlikZamani": "Yayın DOI, İndeks (SCI/SSCI) Kanıt Dosyası",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🎓 Akademik Teşvik Yönetmeliği uyarınca en az 30 puan barajı aşılmalı; uluslararası makalelerin WoS/Scopus Q çeyreklik çıktıları dosyaya eklenmelidir.",
    "oncedenYapilacaklar": [
      "Önceki takvim yılına ait tüm makale, bildiri, kitap, patent ve projeleri YÖKSİS sistemine gir",
      "Web of Science / Scopus veri tabanından indeks tarama belgesi ve DOI ekran görüntülerini PDF yap",
      "Akademik Teşvik Başvuru Beyan Formunu imzalayarak Birim Akademik Teşvik Başvuru ve İnceleme Komisyonuna sun",
      "İlan edilen ön değerlendirme puanına gerekirse 5 iş günü içinde itiraz dilekçesi ver"
    ]
  },
  {
    "id": "kamu_resmi_yazisma_gizlilik_dereceleri_kisisel_veri",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "gizlilik dereceli evrak",
      "çok gizli gizli özel hizmete özel",
      "resmi yazışma yönetmeliği gizlilik",
      "kırmızı mühürlü zarf kamu",
      "kriptolu evrak zimmet"
    ],
    "baslik": "Resmi Yazışmalarda Gizlilik Dereceleri & Kriptolu Zarflama",
    "ikon": "🔒",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Evrak Hazırlık ve Postalamada",
    "hazirlikZamani": "Çift Zarf Usulü & Kırmızı Mum Mühür",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏛️ Resmi Yazışma Yönetmeliği m. 16 gereği \"Çok Gizli\" ve \"Gizli\" evraklar çift zarf usulüyle postalanır; iç zarf mühürlenir, dış zarfta gizlilik derecesi yer almaz.",
    "oncedenYapilacaklar": [
      "Evrakın başlık üstü orta kısmına ve sayfa altına büyük harflerle kırmızı renkli gizlilik derecesi kaşesini vur",
      "Evrakı iç zarfa koyup yapıştırma yerlerini kapatıp kurum güvenlik mühür mumu veya güvenlik bandı ile mühürle",
      "İç zarfı dış zarfa yerleştirerek sadece alıcı makam adresini ve evrak numarasını yaz",
      "Gizli Dereceli Evrak Kayıt Defterine zimmet kaydını açıp kuryeye imza karşılığı teslim et"
    ]
  },
  {
    "id": "kamu_harcirah_kanunu_6245_yolluk_bildirimi",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "6245 harcırah kanunu",
      "geçici görev yolluğu bildirimi",
      "yevmiye ve konaklama faturası kamu",
      "harcırah bütçe tertibi",
      "rayiç şehirlerarası otobüs bileti"
    ],
    "baslik": "6245 Sayılı Harcırah Kanunu Geçici Görev Yolluğu Bildirimi",
    "ikon": "💼",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Görev Bitiminden İtibaren 1 Ay İçinde",
    "hazirlikZamani": "Otobüs/Uçak Bileti & Otel Faturası Taraması",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🏛️ 6245 Harcırah Kanunu uyarınca görev bitiminde yolluk bildirimi verilir; konaklama bedeli bütçe kanunundaki gündeliğin %50 artırımlı miktarını geçemez.",
    "oncedenYapilacaklar": [
      "Görevlendirme olurunu (Makam Oluru) ve göreve başlama-ayrılış saatlerini evraka ekle",
      "Şehirlerarası ulaşım biletlerini ve otel konaklama faturasını HYS/MYS sistemine tara",
      "Bütçe Kanunu H Cetvelinde belirtilen memur kadro derecesine uygun yevmiye tutarını hesapla",
      "Harcırah Bildirim Formunu harcama yetkilisi ve muhasebe yetkilisine onaylatıp banka hesabına aktar"
    ]
  },
  {
    "id": "kamu_lojman_tahsisi_puanlama_cetveli_sira_gorev",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "kamu lojman tahsisi",
      "kamu konutları sıra tahsisli",
      "lojman puanlama cetveli",
      "görev tahsisli konut",
      "lojman 5 yıl oturma süresi"
    ],
    "baslik": "Kamu Konutları Yönetmeliği Sıra Tahsisli Lojman Puanlaması",
    "ikon": "🏠",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yıllık Ocak Ayı Başvurularında",
    "hazirlikZamani": "Hizmet Yılı & Aile Bildirimi Belgeleri",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🏛️ Kamu Konutları Yönetmeliği (4) sayılı cetvel uyarınca sıra tahsisli konutlarda oturma süresi kesin 5 yıldır; süre sonunda tebligatla tahliye istenir.",
    "oncedenYapilacaklar": [
      "Memurun toplam hizmet yılı, eşin çalışıp çalışmadığı ve bakmakla yükümlü olduğu çocuk sayısını belgele",
      "Daha önce lojmanda oturulan her yıl için düşülecek eksi puanları cetvelde hesapla",
      "Lojman Tahsis Komisyonu puan sıralama listesini ilan panosunda askıya çıkar",
      "5 günlük itiraz süresi geçtikten sonra boşalan daire için tahsis kararını tebliğ et"
    ]
  },
  {
    "id": "kamu_faaliyet_raporu_ve_performans_programi_5018",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "5018 kamu mali yönetimi",
      "birim faaliyet raporu",
      "performans göstergeleri hedef sapması",
      "iç kontrol güvence beyanı",
      "stratejik plan performans"
    ],
    "baslik": "5018 Sayılı Kanun Birim Faaliyet Raporu & İç Kontrol Güvencesi",
    "ikon": "📊",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Her Yıl Şubat Ayı Sonu",
    "hazirlikZamani": "Bütçe Gerçekleşmeleri & Hedef Göstergeleri",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏛️ 5018 sayılı Kanun m. 41 gereğince harcama yetkilisi tarafından imzalanan \"İç Kontrol Güvence Beyanı\" faaliyet raporunun ayrılmaz ve zorunlu parçasıdır.",
    "oncedenYapilacaklar": [
      "Stratejik plandaki yıllık performans hedeflerinin gerçekleşme yüzdelerini ve sapma nedenlerini raporla",
      "Yıl içi bütçe başlangıç ödeneği, eklenen/düşülen ödenek ve yıl sonu harcama tutarlarını mali tablolara dök",
      "Harcama yetkilisinin ıslak imzalı veya e-imzalı \"İç Kontrol Güvence Beyanı\"nı hazırla",
      "Raporu Strateji Geliştirme Daire Başkanlığına üst yazı ile teslim et"
    ]
  },
  {
    "id": "kamu_devlet_arsiv_ayiklama_ve_imha_komisyonu",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "devlet arşivleri imha komisyonu",
      "saklama süreli evrak ayıklama",
      "arşiv imha tutanağı",
      "tarihi belge kütüphane devir",
      "evrak kırpma imha makinesi"
    ],
    "baslik": "Devlet Arşiv Hizmetleri Ayıklama, İmha Komisyonu & Tutanak",
    "ikon": "🗄️",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Yıllık Arşiv Ayıklama Döneminde",
    "hazirlikZamani": "Saklama Süresi Dolan Klasör Listesi",
    "hazirlikSaatOncesi": 8,
    "akilliFisilti": "🏛️ Devlet Arşivleri Yönetmeliği gereğince saklama süresi dolan evraklar 3 kişilik komisyon kararı ve Devlet Arşivleri Başkanlığı uygunluk görüşü olmadan imha edilemez.",
    "oncedenYapilacaklar": [
      "Birim arşivinde saklama süresi (1, 5, 10, 15 yıl) dolmuş evrakların listesini dosya tasnif planına göre çıkar",
      "Tarihi, hukuki veya bilimsel değeri olan kalıcı evrakları Devlet Arşivine devredilecekler olarak ayır",
      "İmha edilecek evraklar için 3 nüsha \"İmha Listesi ve İmha Tutanağı\" tanzim et",
      "Evrakları kağıt kırpma makinesinde okunamaz parçalara bölerek geri dönüşüme teslim et"
    ]
  },
  {
    "id": "sanat_sinema_kamera_shutter_angle_180_derece",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "180 derece enstantane kuralı",
      "shutter angle sinema",
      "doğal hareket bulanıklığı motion blur",
      "24 fps 1/48 enstantane",
      "stroboskopik ışık titremesi flicker"
    ],
    "baslik": "Sinematografi: 180° Shutter Angle & Doğal Hareket Bulanıklığı",
    "ikon": "🎬",
    "renk": "#FED7AA",
    "varsayilanZaman": "Çekim Öncesi Kamera Kalibrasyonunda",
    "hazirlikZamani": "Kamera Sensör Frekansı & Shutter Senkronizasyonu",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🎬 Sinema standardında gözün alıştığı doğal motion blur için deklanşör açısı 180° (24 fps'te 1/48 saniye) sabit tutulmalı; ışık titremesinde açı kalibre edilmelidir.",
    "oncedenYapilacaklar": [
      "Sinema kamerasının kare hızını (24.000 fps veya 25.000 fps) proje standardına göre ayarla",
      "Deklanşör modunu Shutter Speed yerine Shutter Angle seçeneğine getirip tam 180.0° değerine kilitle",
      "Mekan aydınlatmasında 50 Hz şebeke frekansından kaynaklanan flicker (titreme) varsa Clear Scan ile açıyı ince ayarla (172.8° vb.)",
      "Pozlamayı diyafram ve dahili ND filtrelerle (ND 0.6 / 1.2 / 2.1) dengele"
    ]
  },
  {
    "id": "sanat_ses_lufs_loudness_ebur128_yayinci_standart",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "ebu r128 ses standardı",
      "lufs entegre ses şiddeti",
      "true peak -1 dbtp",
      "spotify youtube -14 lufs",
      "tv yayını -23 lufs loudness"
    ],
    "baslik": "Audio Mastering: EBU R128 & Dijital Platform LUFS Loudness",
    "ikon": "🎚️",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Mastering Teslimi Sırasında",
    "hazirlikZamani": "Loudness Radar Ölçer & True-Peak Limiter",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🎧 TV yayınında EBU R128 (-23 LUFS ±0.5), dijital müzik platformlarında (Spotify/Apple Music) ise -14 LUFS ve -1.0 dB True-Peak sınırına uyulmalıdır.",
    "oncedenYapilacaklar": [
      "Mastering kanalına ITU-R BS.1770 / EBU R128 uyumlu Loudness Meter eklentisini ekle",
      "Tüm parçayı baştan sona çalarak Integrated Loudness değerini ölç",
      "Dijital kırpılmayı (inter-sample peak) önlemek için True Peak Limiter tavanını -1.0 dBTP'ye çek",
      "Hedef mecra profiline (YouTube: -14 LUFS, Netflix: -27 LUFS, TRT/TV: -23 LUFS) göre limiter kazancını ayarla"
    ]
  },
  {
    "id": "sanat_fotograf_profesyonel_flas_hss_senkronizasyon",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "yüksek hız senkronizasyonu hss",
      "flaş x-sync hızı 1/250",
      "gün ışığını karartma flaş",
      "ttl flaş tetikleyici transmetr",
      "stüdyo paraflaş hss modu"
    ],
    "baslik": "Moda/Portre Fotoğrafı: Yüksek Hız Senkronizasyonu (HSS Flaşı)",
    "ikon": "📸",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Dış Çekim Gün Işığında",
    "hazirlikZamani": "Flaş Tetikleyici & HSS Modu Eşleştirmesi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "📸 1/250 sn üzerindeki enstantanelerde perde şerit halinde açılır; HSS modu açılmazsa fotoğrafın yarısı siyah perde gölgesiyle kapanır.",
    "oncedenYapilacaklar": [
      "Kamera gövdesindeki ve harici paraflaş tetikleyicisindeki HSS (High Speed Sync) modunu aktif et",
      "Arka planı bulanıklaştırmak için açık diyafram (f/1.4 - f/2.0) ve yüksek enstantane (1/4000 sn) ayarla",
      "Paraflaşın stroboskopik darbe moduna geçtiğini ve model yüzünde homojen aydınlatma sağladığını test et",
      "Işık ayağına devrilmeyi önlemek için kum torbası asıp difüzör softbox açısını ayarla"
    ]
  },
  {
    "id": "sanat_tiyatro_sahne_dizilimi_dijital_dmx512_isik",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "dmx512 sahne ışık masası",
      "robot ışık universe adresleme",
      "tiyatro sahne cue listesi",
      "art-net ışık ağı",
      "dmx sonlandırıcı 120 ohm"
    ],
    "baslik": "Sahne Sanatları: DMX512 Robot Işık Evreni (Universe) & Cue Masası",
    "ikon": "🎭",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Genel Prova ve Prömiyer Öncesi",
    "hazirlikZamani": "DMX Kanal Adresleme & Terminatör Takımı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🎭 DMX512 hattında sinyal yansımasını ve titreşimi önlemek için zincirin son armatürüne mutlaka 120 Ohm DMX sonlandırıcı (terminatör) takılmalıdır.",
    "oncedenYapilacaklar": [
      "Her robot kafa ve profil spotun DMX dip-switch veya dijital ekranından başlangıç adresini (Universe 1: Kanal 1-512) ata",
      "Işık masasında (GrandMA / Avolites) sahne geçişlerini ve kararmaları içeren Cue Listesini programla",
      "Oyuncunun repliklerine göre odaklanan takip spotu (follow spot) rengini ve iris çapını kalibre et",
      "Son armatürün DMX çıkışına 120 Ohm terminatör direnci takıp sinyal paraziti olmadığını doğrula"
    ]
  },
  {
    "id": "sanat_yayinevi_isbn_ve_kultur_bakanligi_bandrol",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "isbn numarası alma",
      "kültür bakanlığı bandrol sistemi",
      "yayımcı sertifikası",
      "derleme müdürlüğü 6 adet kitap",
      "kitap barkod basımı"
    ],
    "baslik": "Yayıncılık: ISBN Tahsisi, Bandrol Talebi & Derleme Nüshaları",
    "ikon": "📖",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Kitap Baskıya Girmeden Önce",
    "hazirlikZamani": "Kültür Bakanlığı Yayımcı Portalı Başvurusu",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "📚 5846 sayılı FSEK uyarınca bandrolsüz kitap basımı korsan sayılır; basımdan itibaren 15 gün içinde 6 adet derleme nüshası Kütüphaneler Müdürlüğüne teslim edilmelidir.",
    "oncedenYapilacaklar": [
      "Kültür ve Turizm Bakanlığı ISBN portalından esere ait 13 haneli ISBN numarasını ve barkodunu al",
      "Matbaa sözleşmesi ve kaşe onaylı fatura ile Bakanlık Bandrol Sisteminden bandrol siparişi oluştur",
      "Bandrolleri kitabın arka kapağına veya iç kapak sayfasına deforme olmayacak şekilde yapıştırt",
      "6279 sayılı Çoğaltılmış Fikir ve Sanat Eserlerini Derleme Kanunu gereği 6 adet kitabı tutanakla Derleme Müdürlüğüne ver"
    ]
  },
  {
    "id": "kuafor_keratin_botoks_formaldehit_fume_extractor",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "keratin botoks uygulaması",
      "formaldehit duman tahliyesi",
      "keratin pres derecesi 230",
      "duman emici aspiratör kuaför",
      "saç keratin mühürleme"
    ],
    "baslik": "Saç Keratin Botoksu & Formaldehit Duman Tahliyesi (230°C)",
    "ikon": "💇‍♀️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Presleme ve Fön Sırasında",
    "hazirlikZamani": "Aktif Karbon Filtreli Duman Emici & Maske",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💇 Titanyum presle 230°C'de keratin mühürlenirken açığa çıkan gazı solumamak için duman emici filtre tezgah başına konmalı ve kuaför maske takmalıdır.",
    "oncedenYapilacaklar": [
      "Saçı arındırıcı şampuanla (Clariying) 2 kez yıkayıp saç pulcuklarının (kutikula) açılmasını sağla",
      "Keratin solüsyonunu saç diplerine 1 cm mesafe bırakacak şekilde ince tutamlar halinde sür ve 30 dk beklet",
      "Duman emici aspiratörü müşterinin baş hizasına yaklaştırıp FFP2 koruyucu maskeleri tak",
      "Titanyum kaplama düzleştirici ile her tutamı 7-10 kez 210-230°C sıcaklıkta presleyerek keratini liflere mühürle"
    ]
  },
  {
    "id": "kuafor_hydrafacial_vakumlu_cilt_bakimi_asit_protokol",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "hydrafacial cilt bakımı",
      "vortex vakum başlığı",
      "salisilik laktik asit solüsyon",
      "cilt sebum temizleme",
      "led terapi mavi ışık akne"
    ],
    "baslik": "Hydrafacial Medikal Cilt Bakımı & Vortex Vakum Protokolü",
    "ikon": "🧖‍♀️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Seans Randevu Saati",
    "hazirlikZamani": "Cihaz Solüsyon Kartuşları & Tek Kullanımlık Vortex Ucu",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💇 Hydrafacial uygulamasında vakum basıncı cildin kılcal damar hassasiyetine göre ayarlanmalıdır; işlem sonrası 48 saat boyunca doğrudan güneşe çıkılmamalıdır.",
    "oncedenYapilacaklar": [
      "Adım 1: Laktik asitli (Activ-4) solüsyon ve mavi vortex uç ile ölü hücrelerin dökülmesini ve eksfoliasyonu sağla",
      "Adım 2: Salisilik asitli (Beta-HD) solüsyon ile T bölgesindeki siyah nokta ve komedonları vakumla tahliye et",
      "Adım 3: Cilde hyalüronik asit, peptit ve antioksidan içerikli serum infüzyonu yap",
      "Kızarıklığı yatıştırmak ve bakterileri temizlemek için 10 dakika mavi/kırmızı LED ışık terapisi uygula ve SPF 50+ sür"
    ]
  },
  {
    "id": "kuafor_ipl_fotoepilasyon_cilt_lekesi_cooling_gel",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "ipl fotoepilasyon",
      "ultrason jeli soğutma ipl",
      "cilt yanığı önleme ipl",
      "atım penceresi quartz filtre",
      "ipl leke tedavisi protokol"
    ],
    "baslik": "IPL Fotoepilasyon & Akustik Soğutucu Jel Protokolü",
    "ikon": "✨",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Atış Öncesinde",
    "hazirlikZamani": "Buz Dolabında Soğutulmuş Jel & Koruyucu Gözlük",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💇 IPL uygulamasında ışık enerjisi epidermisi yakmasın diye en az 2 mm kalınlığında soğuk medikal jel sürülmeli; danışan ve uzman koruyucu yeşil gözlük takmalıdır.",
    "oncedenYapilacaklar": [
      "Uygulama yapılacak bölgedeki kılların 1 gün önceden jiletle sıfırlanmış olduğunu kontrol et",
      "Kuvars filtreli atış başlığına uygun dalga boyu filtresini (epilasyon için 640 nm, leke için 530 nm) tak",
      "Cilt üzerine 2-3 mm kalınlığında buzdolabından çıkarılmış soğuk ultrason jeli yay",
      "Danışana ve uzmana OD5+ dalga boyu filtreli koruyucu gözlük takıp enerji test atışı (spot test) sonrası seriye geç"
    ]
  },
  {
    "id": "kuafor_tirnak_protez_kuru_manikur_freze_kombine",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "protez tırnak jel",
      "kombine kuru manikür",
      "freze elmas uç tırnak eti",
      "tırnak bazı primer ph bonder",
      "uv led lamba polimerizasyon"
    ],
    "baslik": "Kombine Kuru Manikür, Freze Elmas Uç & Jel Tırnak Polimerizasyonu",
    "ikon": "💅",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Protez Tırnak Randevusunda",
    "hazirlikZamani": "Steril Freze Uçları (Otoklav Poşetli)",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💅 Tırnak etlerinin (kutikula) elmas alev freze ucuyla temizlenmesinde matris dokusuna baskı yapılmamalıdır; jel altına sürülen Dehydrator/Primer hava kabarcığını önler.",
    "oncedenYapilacaklar": [
      "Müşterinin önünde sterilizasyon poşetini açarak kırmızı kuşaklı elmas alev freze ucunu mikromotora tak",
      "Tırnak plağını inceltmeden 180 grit törpüyle matlaştırıp tozu temizle",
      "Dehydrator ve asitsiz Primer sürerek tırnağın doğal nemini ve yağını dengele",
      "İnşaat jelini şablon üzerine yerleştirip 48W UV/LED lambada 60 saniye tam polimerize et"
    ]
  },
  {
    "id": "kuafor_kalici_dalga_perma_tiyoglikolat_notralizator",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "perma ilacı tiyoglikolat",
      "saç perma nötralizatörü",
      "disülfit bağları kırma",
      "perma bigudisi sarma",
      "hidrojen peroksit perma sabitleyici"
    ],
    "baslik": "Klasik Perma: Amonyum Tiyoglikolat & Hidrojen Peroksit Nötralizasyon",
    "ikon": "🦱",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Bigudi Sarımı Sonrasında",
    "hazirlikZamani": "Boyun Lastiği, Pamuk Şerit & Sünger Aplikatör",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💇 Perma ilacı saçtaki disülfit (S-S) bağlarını kırar; asidik nötralizatör (sabitleyici) sürülmeden bigudiler açılırsa dalga tutmaz ve saç yanar.",
    "oncedenYapilacaklar": [
      "Saç çizgisi boyunca alına ve enseye koruyucu krem sürüp pamuk şerit sararak cildi kimyasal temastan koru",
      "Nemli saçı istenen dalga çapına uygun perma bigudilerine eşit gerginlikte sar",
      "Tiyoglikolatlı perma losyonunu her bigudiye doygun şekilde damlatıp bone altında 15-20 dakika beklet",
      "Sıcak su ile 5 dakika durulayıp fazla suyu havluyla çektikten sonra nötralizatörü süngerle köpürterek 10 dakika sabitle"
    ]
  },
  {
    "id": "egitim_meb_ogretmen_performans_adaylik_kaldirma",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "aday öğretmenlik dosyası",
      "meb adaylık kaldırma sınavı aks",
      "danışman öğretmen gözlem formu",
      "aday öğretmen ders izleme",
      "adaylık değerlendirme komisyonu"
    ],
    "baslik": "MEB Aday Öğretmenlik Dosyası & Danışman İzleme Değerlendirmesi",
    "ikon": "📚",
    "renk": "#FEF3C7",
    "varsayilanZaman": "1. Yıl Dönem Sonu Değerlendirmesinde",
    "hazirlikZamani": "Ders İçi Gözlem Formları & Seminer Belgeleri",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🎓 MEB Öğretmen Atama ve Yer Değiştirme Yönetmeliği gereği aday öğretmenin adaylığı, danışman öğretmen ve maarif müfettişinin formları sonucunda kalkar.",
    "oncedenYapilacaklar": [
      "Aday öğretmenin haftalık ders gözlem föylerini ve danışman değerlendirme notlarını MEBBİS'e gir",
      "Okul dışı faaliyetler, zümre toplantı tutanakları ve veli görüşme kayıtlarını adaylık klasöründe topla",
      "Adaylık Değerlendirme Komisyonu üyeleriyle ders denetimini gerçekleştirip puanlama formunu imzala",
      "Komisyon nihai onay tutanağını İl/İlçe Milli Eğitim Müdürlüğü Personel Şubesine resmi yazıyla gönder"
    ]
  },
  {
    "id": "egitim_universite_akademik_kadro_on_degerlendirme",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "öğretim görevlisi ön değerlendirme",
      "2547 sayılı kanun kadro ilanı",
      "ales ve yabancı dil puan hesabı",
      "ön değerlendirme sıralama listesi",
      "giriş sınavı jürisi üniversite"
    ],
    "baslik": "Üniversite Akademik Kadro İlanı Ön Değerlendirme & Sınav Sıralaması",
    "ikon": "🎓",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Başvuru Bitiminden İtibaren 10 Gün",
    "hazirlikZamani": "ALES (%60) & Dil (%40) Puan Hesap Tablosu",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "🎓 Öğretim Üyesi Dışındaki Kadrolara Atama Yönetmeliği gereği ALES (%60) ve Dil (%40) toplamına göre ilan edilen kadro sayısının 4 katı aday sınava çağrılır.",
    "oncedenYapilacaklar": [
      "Adayların lisans mezuniyet transkripti, ALES sonuç belgesi ve YDS/YÖKDİL belgelerinin doğruluğunu sorgula",
      "Ön Değerlendirme Puan Formülüyle (ALES * 0.60 + Dil * 0.40) tüm adayların net skorunu hesapla",
      "Kadro sayısının 4 katı kadar adayı içeren sıralı Ön Değerlendirme Sonuç Listesini rektörlük web sitesinde ilan et",
      "Yazılı giriş sınavı salonunu, jüri soru zarfını ve sınav tutanaklarını mühürlü hazırla"
    ]
  },
  {
    "id": "egitim_meb_tasimali_egitim_servis_sofor_egitimi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "taşımalı eğitim servis denetimi",
      "okul servis şoförü gbt sorgusu",
      "servis aracı emniyet kemeri sensörü",
      "rehber personel belgesi meb",
      "öğrenci servis yoklama fişi"
    ],
    "baslik": "MEB Taşımalı Eğitim Servis Aracı & Şoför Güvenlik Denetimi",
    "ikon": "🚌",
    "renk": "#FED7AA",
    "varsayilanZaman": "Haftalık Rutin / Dönem Başı",
    "hazirlikZamani": "Şoför Sabıka Kaydı, SRC-2 & Muayene Belgeleri",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🎓 Okul Servis Araçları Yönetmeliği uyarınca 12 yaşından büyük araçlar kullanılamaz; araç takip sistemi, üç nokta emniyet kemeri ve rehber personel zorunludur.",
    "oncedenYapilacaklar": [
      "Şoförün SRC-2, Psikoteknik belgesi ve adli sicil kaydının mevzuata uygunluğunu denetle",
      "Araçta \"DUR\" kırmızı ışıklı levhası, okul taşıtı yazısı ve kapı sensörlerinin faal olduğunu kontrol et",
      "Tüm koltuklarda üç noktalı emniyet kemerlerinin sağlamlığını ve çalışır vaziyette olduğunu teyit et",
      "Okul Servis Araçları Denetim Formunu imzalayıp eksikliği olan araçlara süre verip İlçe MEM'e bildir"
    ]
  },
  {
    "id": "egitim_tubitak_4006_bilim_fuari_proje_sergisi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "tübitak 4006 bilim fuarı",
      "öğrenci alt proje sayısı",
      "tübitak fuar izleyicisi denetimi",
      "bilim fuarı poster şablonu",
      "tubitak fatura sisteme yükleme"
    ],
    "baslik": "TÜBİTAK 4006 Bilim Fuarı Proje Sergisi & İzleyici Denetimi",
    "ikon": "🔬",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Fuarın Açılış Gününde",
    "hazirlikZamani": "Öğrenci Posterleri & Deney Düzenekleri Kurulumu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🎓 TÜBİTAK 4006 fuarlarında sözleşmede taahhüt edilen alt proje sayısı (asgari 15-20) eksiksiz sergilenmeli ve TÜBİTAK İzleyicisi gelip tek tek onaylamalıdır.",
    "oncedenYapilacaklar": [
      "Öğrencilerin hazırladığı araştırma, tasarım ve inceleme posterlerini TÜBİTAK standart şablonuna göre bastır",
      "Okul spor salonunda veya fuar alanında her standa elektrik ve sunum masası tahsis et",
      "TÜBİTAK Temsilcisi/İzleyicisi geldiğinde öğrencilerin projeyi bizzat sözlü olarak sunmasını sağla",
      "TÜBİTAK İzleyici Sonuç Raporu ve fatura harcama belgelerini sisteme yükleyip proje kapanışını yap"
    ]
  },
  {
    "id": "egitim_lise_ogrenci_disiplin_kurulu_karari",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "öğrenci disiplin kurulu",
      "ortaöğretim kurumları yönetmeliği disiplin",
      "savunma istem yazısı 3 gün",
      "disiplin ceza kararı kınama uzaklaştırma",
      "disiplin üst kurul itiraz"
    ],
    "baslik": "MEB Öğrenci Ödül ve Disiplin Kurulu Kararı & Yasal Savunma",
    "ikon": "⚖️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Olayın Bildirilmesinden Sonra 7 Gün İçinde",
    "hazirlikZamani": "Nöbetçi Öğretmen Tutanağı & Kamera Kayıtları",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "🎓 Ortaöğretim Kurumları Yönetmeliği m. 165 gereğince öğrenciye yazılı savunma hakkı verilmeden ceza verilemez; savunma süresi en az 3 iş günüdür.",
    "oncedenYapilacaklar": [
      "Nöbetçi öğretmen ve görgü tanığı öğrencilerin yazılı tutanaklarını topla",
      "Öğrenciye ve velisine isnat edilen fiili açıkça belirten yazılı \"Savunma İstem Yazısı\"nı tebliğ et",
      "Öğrencinin 3 iş günü içinde verdiği yazılı savunmasını Disiplin Kurulu dosyasında birleştir",
      "Disiplin Kurulunu toplayarak gerekçeli ceza kararını oyla, okul müdürü onayından sonra veliye iadeli taahhütlü tebliğ et"
    ]
  },
  {
    "id": "kamu_ihale_kanunu_4734_yaklasik_maliyet_hesabi",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "yaklaşık maliyet hesabı 4734",
      "ihale yaklaşık maliyet gizliliği",
      "piyasa fiyat araştırması kamu ihale",
      "resmi rayiç çevre şehircilik",
      "yaklaşık maliyet onay belgesi"
    ],
    "baslik": "4734 Sayılı KİK: Yaklaşık Maliyet Tespiti & Gizlilik İlkesi",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İhale İlanından Önce",
    "hazirlikZamani": "En Az 3 Gerçekçi Fiyat Teklifi & Resmi Rayiçler",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏛️ 4734 sayılı Kamu İhale Kanunu m. 9 uyarınca yaklaşık maliyet ihale komisyonunca gizli tutulur; teklif zarfları açılana kadar açıklanması suç teşkil eder.",
    "oncedenYapilacaklar": [
      "Kamu kurum ve kuruluşlarının resmi birim fiyatları, ticaret odası rayiçleri ve piyasa proforma tekliflerini derle",
      "Katma Değer Vergisi (KDV) hariç olarak yaklaşık maliyet hesap cetvelini oluştur",
      "Hesaplanan yaklaşık maliyet rakamını mühürlü zarfa koyarak ihale işlem dosyasına gizlilik kaşesiyle ekle",
      "İhale onay belgesini harcama yetkilisine imzalatıp EKAP sistemi üzerinden ihale kaydı al"
    ]
  },
  {
    "id": "kamu_mal_bildirimi_kanunu_3628_sonu_0_ve_5",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "mal bildirimi beyannamesi",
      "3628 sayılı kanun",
      "sonu 0 ve 5 ile biten yıllar",
      "ek mal bildirimi 1 ay",
      "memur taşınmaz altın beyanı"
    ],
    "baslik": "3628 Sayılı Kanun Genel Mal Bildirimi (Sonu 0 ve 5 Yılları) & Ek Beyan",
    "ikon": "💼",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Şubat Ayı Sonuna Kadar / Mal Ediniminden 1 Ay İçinde",
    "hazirlikZamani": "Tapu, Ruhsat, Banka Mevduat Dökümleri",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🏛️ Memurlar sonu (0) ve (5) ile biten yıllarda genel mal bildirimi verir; maaşın 5 katını aşan mal artışlarında ise 1 ay içinde ek mal bildirimi zorunludur.",
    "oncedenYapilacaklar": [
      "Kendisine, eşine ve velayeti altındaki çocuklarına ait taşınmaz, araç, altın ve hisse senedi dökümlerini çıkar",
      "Mal Bildirim Formunu kapalı zarf içinde doldurarak imza altına al",
      "Net maaşın 5 katını aşan taşınmaz veya taşıt alımında 1 ay içinde \"Ek Mal Bildirimi\" düzenle",
      "Zarfı birim amiri ve özlük şubesine zimmetle teslim edip gizli sicil dosyasına kaldırt"
    ]
  },
  {
    "id": "kamu_657_adaylik_ve_yemin_belgesi_asalet_tasdiki",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "memur asalet tasdiki",
      "657 yemin belgesi",
      "aday memurluk eğitimi temel hazırlayıcı",
      "asalet tasdiki 1-2 yıl",
      "memur yemin merasimi"
    ],
    "baslik": "657 Sayılı DMK: Aday Memurluk Asalet Tasdiki & Yemin Merasimi",
    "ikon": "📜",
    "renk": "#E0E7FF",
    "varsayilanZaman": "1 Yılın Bitiminde (En Fazla 2 Yıl)",
    "hazirlikZamani": "Temel ve Hazırlayıcı Eğitim Sınav Notları",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏛️ 657 DMK m. 54-58 gereği adaylık süresi 1 yıldan az, 2 yıldan çok olamaz; asil memurluğa atanan memur Türk Bayrağı üzerine el basarak yemin eder.",
    "oncedenYapilacaklar": [
      "Aday memurun Temel Eğitim ve Hazırlayıcı Eğitim sınav başarı belgelerini (min. 60 puan) kontrol et",
      "Disiplin cezası almadığını ve staj değerlendirme notunun olumlu olduğunu teyit et",
      "Disiplin amirinin asalet tasdiki teklif yazısını atamaya yetkili amirin onayına sun",
      "Yemin Belgesini bayrak huzurunda imzalatarak memurun özlük dosyasına tescil et"
    ]
  },
  {
    "id": "kamu_sendika_uyelik_ve_istifa_formu_4688",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "sendika üyelik formu kamu",
      "4688 kamu görevlileri sendikaları",
      "sendika istifa formu 30 gün",
      "sendika kesintisi bordro",
      "3 nüsha sendika formu"
    ],
    "baslik": "4688 Sayılı Kanun Sendika Üyeliği & İstifa Süreci (30 Gün Kuralı)",
    "ikon": "🤝",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Formun Kurum Evrakına Girişinde",
    "hazirlikZamani": "3 Nüsha Islak İmzalı Form & EBYS Zimmeti",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏛️ 4688 sayılı Kanun uyarınca sendika istifası kuruma verildikten 30 gün sonra geçerli olur; 30 gün boyunca sendika aidat kesintisi bordroda devam eder.",
    "oncedenYapilacaklar": [
      "Memurun 3 nüsha doldurduğu Sendika Üyelik veya Çekilme (İstifa) Formunu evrak kaydına al",
      "Bir nüshasını memura ver, bir nüshasını 15 gün içinde ilgili sendika genel merkezine üst yazıyla postala",
      "İstifa başvurusunda 30 günlük bekleme süresini KBS maaş modülü takvimine kaydet",
      "30 gün dolduğunda bir sonraki ay maaş bordrosundan sendika kesinti kodunu kaldır"
    ]
  },
  {
    "id": "kamu_lojman_kira_ve_yakit_kesintisi_kbs_maas",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "lojman kira kesintisi kbs",
      "kamu konutları yakıt gideri",
      "milli emlak lojman metrekare birim fiyatı",
      "lojman tahliye tutanağı",
      "maaştan lojman stopajı"
    ],
    "baslik": "Kamu Konutları: KBS Maaş Modülü Lojman Kira & Yakıt Kesintisi",
    "ikon": "🏠",
    "renk": "#FED7AA",
    "varsayilanZaman": "Her Ayın 10-14'ü Arası Maaş Girişinde",
    "hazirlikZamani": "Milli Emlak m2 Fiyatı & Bağımsız Bölüm Alanı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏛️ Milli Emlak Tebliği ile belirlenen metrekare kira bedeli ve merkezi ısıtmalı konutlarda yakıt gideri memurun maaşından KBS sistemiyle re'sen kesilir.",
    "oncedenYapilacaklar": [
      "Lojmanın net metrekare kullanım alanını tahsis belgesinden doğrula",
      "Milli Emlak Genel Tebliğindeki güncel kaloriferli/kalorifersiz m2 kira katsayısını uygula",
      "KBS sisteminde \"Personel Lojman Bilgileri\" sekmesine sayaç ve metrekare verilerini işle",
      "Daireden tahliye halinde \"Konut Geri Teslim Tutanağı\" düzenlenene kadar kesintiyi sonlandırma"
    ]
  },
  {
    "id": "sanat_sinema_kamera_odak_takibi_focus_pulling_wireless",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "focus puller netlik takibi",
      "kablosuz follow focus",
      "lens kalibrasyonu mikron",
      "lazer mesafe ölçer c-ine tape",
      "derinlik hissi sığ alan dof"
    ],
    "baslik": "Sinematografi: Kablosuz Follow Focus & 1. Asistan (Focus Puller)",
    "ikon": "🎥",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kayıt Başlamadan Önceki Prova Anında",
    "hazirlikZamani": "Lens Dişli Motoru Kalibrasyonu & Mesafe Ölçümü",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🎬 Sığ alan derinliğinde (T1.4 diyafram) netlik toleransı santimetredir; oyuncunun ayak bastığı markörler lazer metreyle ölçülüp el ünitesi skalasına işaretlenir.",
    "oncedenYapilacaklar": [
      "Sinema lensinin sonsuz ve en yakın netlik tırnaklarını kablosuz motora otomatik kalibre et",
      "Lazer telemetre (Cinetape/Arri UDM) ile kameradan oyuncunun yüzüne olan mesafeyi ölç",
      "Focus çarkındaki beyaz halka üzerine prova adımlarına göre renkli fosforlu kalemle netlik marklarını koy",
      "Kayıt sırasında monitördeki peaking/false-color odak çizgilerini gözleyerek akıcı netlik kaydırmasını (rack focus) icra et"
    ]
  },
  {
    "id": "sanat_studyo_kayit_akustik_izolasyon_stc_ve_rt60",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "stüdyo akustik rt60 süresi",
      "ses yalıtımı stc değeri",
      "bas tuzağı bass trap",
      "oda akustiği çınlama süresi",
      "oda modu standing wave"
    ],
    "baslik": "Müzik Stüdyosu: Akustik RT60 Çınlama Süresi & Bass Trap",
    "ikon": "🎙️",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Akustik Tasarım ve Miksaj Öncesi",
    "hazirlikZamani": "Ölçüm Mikrofonu & Pembe Gürültü (Pink Noise)",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🎧 Profesyonel kayıt kontrol odasında RT60 yankılanma süresi tüm frekanslarda 0.2-0.3 saniye olmalıdır; köşelere konan Bass Trap bas yığılmalarını önler.",
    "oncedenYapilacaklar": [
      "Kalibre çok yönlü (omni) ölçüm mikrofonunu dinleme pozisyonuna kulak hizasında yerleştir",
      "REW yazılımı ile sweep test sinyali göndererek oda frekans cevabını ve şelale (waterfall) grafiğini çıkar",
      "Düşük frekans rezonanslarını (standing wave) yutmak için odanın 4 dikey köşesine yoğun taşyünü bas tuzakları yerleştir",
      "Erken yansımaları (early reflections) engellemek için tavan bulutu ve yan yansıma panellerini ayna tekniğiyle konumlandır"
    ]
  },
  {
    "id": "sanat_fotograf_profesyonel_baski_icc_profil_soft_proofing",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "icc renk profili baskı",
      "soft proofing ekran prova",
      "cmyk adobe rgb dönüşümü",
      "fine art pamuklu kağıt baskı",
      "monitör kalibrasyon cihazı x-rite"
    ],
    "baslik": "Fine Art Fotoğraf Baskısı: ICC Kağıt Profili & Soft Proofing",
    "ikon": "🖼️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Baskı Gönderimi Öncesinde",
    "hazirlikZamani": "Donanımsal Monitör Kalibrasyonu (120 cd/m2)",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "📸 Ekranda görülen renk ile pamuklu kağıttaki renk tonunun birebir tutması için yazıcı ve kağıda özel ICC profili yüklenmeli ve Soft Proofing ile prova edilmelidir.",
    "oncedenYapilacaklar": [
      "Monitörü kolorimetre cihazı ile D65 beyaz noktası, 2.2 gamma ve 120 cd/m2 parlaklıkta kalibre et",
      "Fine art kağıt üreticisinin (Hahnemühle/Canson) yazıcıya özel ICC renk profilini indirip sisteme kur",
      "Photoshop/Lightroom üzerinde \"Proof Colors\" modunu açarak baskı simülasyonunu ekranda gör",
      "Taşan ve basılamayacak renkleri (Gamut Warning) doygunluk ve ton eğrisiyle düzeltip 16-bit TIFF olarak yazdır"
    ]
  },
  {
    "id": "sanat_tiyatro_kablosuz_yaka_mikrofonu_rf_anten_splitter",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "tiyatro telsiz mikrofon rf",
      "anten çoklayıcı splitter",
      "intermodülasyon frekans çakışması",
      "telsiz mikrofon ter bandı koruyucu",
      "yaka kapsülü saç içine gizleme"
    ],
    "baslik": "Sahne Ses Teknolojisi: Telsiz Mikrofon RF Koordinasyonu & Anten Splitter",
    "ikon": "🎭",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Oyuncular Makyaja Girmeden Önce",
    "hazirlikZamani": "RF Spektrum Taraması & Şarjlı Batarya Ölçümü",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🎭 Çoklu telsiz mikrofonlarda intermodülasyon parazitini önlemek için Wireless Workbench ile frekans koordinasyonu yapılmalı ve aktif yönlü anten kullanılmalıdır.",
    "oncedenYapilacaklar": [
      "RF spektrum tarayıcısı ile sahnede boş UHF TV kanallarını tarayıp frekans planını oluştur",
      "Her mikrofon bel paketine sıfır lityum batarya takıp verici gücünü (10/50 mW) ayarla",
      "Yaka mikrofon kapsülünü oyuncunun alnına veya saç dibine su/ter geçirmez şeffaf bantla sabitle",
      "Anten kablolarını düşük kayıplı RG-213 ile aktif kürek antenlere bağlayıp sahnede kör nokta yürüyüş testi yap"
    ]
  },
  {
    "id": "sanat_sinema_telif_oyuncu_muvafakatnamesi_fsek",
    "category": "resmi",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "oyuncu muvafakatnamesi fsek",
      "5846 sayılı kanun icracı sanatçı",
      "mali hakların devri sözleşmesi",
      "görüntü ve ses kullanım izni",
      "teselsül ve fesih hakkı feragat"
    ],
    "baslik": "Film / Prodüksiyon: FSEK Oyuncu Muvafakatnamesi & Hak Devri",
    "ikon": "📜",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sete Girmeden Önce İmzalanmalı",
    "hazirlikZamani": "Karakter Sözleşmesi & Hak Kalemleri (İşleme, Çoğaltma, Yayma)",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🎬 5846 sayılı FSEK m. 52 gereği mali hak devirleri yazılı olmak ve işleme, çoğaltma, yayma, temsil hakları tek tek açıkça sayılmak zorundadır; aksi halde devir geçersizdir.",
    "oncedenYapilacaklar": [
      "Oyuncu ve figürasyon için FSEK uyumlu \"İcracı Sanatçı Hak Devir Sözleşmesi\" hazırla",
      "Sözleşmede çoğaltma, yayma, umuma iletim, dijital platform ve yurt dışı gösterim haklarını ayrı ayrı belirt",
      "İleride doğacak yeni yayın teknolojilerini (streaming, VOD vb.) kapsayan ibareleri ekle",
      "Her sayfasını oyuncuya paraflatıp ıslak imzalı orijinal nüshayı yapımcı telif arşivine kaldır"
    ]
  },
  {
    "id": "kuafor_sac_kaynak_italyan_keratin_ultrasonik_sokum",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "mikro kaynak saç",
      "italyan keratin saç kaynak",
      "ultrasonik kaynak makinesi",
      "kaynak sökücü alkollü solüsyon",
      "kaynak pensesi kırma"
    ],
    "baslik": "Mikro Saç Kaynak: İtalyan Keratin Montajı & Ultrasonik Söküm",
    "ikon": "💇‍♀️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kaynak Takma / Bakım Randevusunda",
    "hazirlikZamani": "İnce Tutam Ayrımı & Koruyucu Plastik Disk",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💇 İtalyan şeffaf keratin ısı tabancasıyla saça yapıştırılırken diplere 0.5 cm pay bırakılmalı; sökümde keratin ezici pense ve özel sökücü sıvı kullanılmalıdır.",
    "oncedenYapilacaklar": [
      "Saç tutamını şeffaf koruyucu ayırıcı disk deliğinden geçirerek klipsle sabitle",
      "Mikro kaynak tutamını doğal saçın 0.5 cm altına yerleştirip keratin maşasıyla 180°C'de homojen eriterek parmakla pirinç tanesi şeklinde yuvarla",
      "Söküm işleminde keratin bağına alkol bazlı sökücü damlatıp kırma pensesiyle keratini ufala ve saçı çekmeden tıkacı kaydır",
      "İşlem sonrası saç diplerini arındırıcı şampuanla yıkayıp dökülen serbest saç tellerini ince tarakla tara"
    ]
  },
  {
    "id": "kuafor_cilt_bakimi_dermapen_mikroigneleme_derinlik",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "dermapen mikroiğneleme",
      "fraksiyonel iğne derinliği mm",
      "hyalüronik asit mezoterapi serumu",
      "dermapen sonrası güneş yasağı",
      "cilt kolajen indüksiyonu"
    ],
    "baslik": "Medikal Estetik: Dermapen Mikroiğneleme & Kolajen İndüksiyonu",
    "ikon": "🧖‍♀️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Cilt Bakım Seansında",
    "hazirlikZamani": "Steril 12/36 İğne Kartuşu & Topikal Anestezi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "💇 Dermapende alın ve burunda 0.25-0.5 mm, yanakta 1.0-1.5 mm derinlik seçilir; seans sonrası 24 saat su değdirilmemeli ve 48 saat güneşe çıkılmamalıdır.",
    "oncedenYapilacaklar": [
      "Danışanın yüzüne topikal lidokain anestezik krem sürüp 20 dakika beklettikten sonra cildi dezenfekte et",
      "Müşterinin gözü önünde tek kullanımlık steril 36'lı titanyum iğne kartuşunu cihaza tak",
      "Cilde saf hyalüronik asit serumu damlatarak 90 derece dik açıyla dairesel ve yıldız hareketlerle mikro kanallar aç",
      "İşlem bittiğinde yatıştırıcı soğuk kolajen maskesi uygula ve mineral içerikli SPF 50+ fiziksel güneş kremi sür"
    ]
  },
  {
    "id": "kuafor_ipek_kirpik_izolasyon_ve_siyanurilat_yapistirici",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "ipek kirpik uygulaması",
      "kirpik izolasyon cımbızı",
      "siyanoakrilat medikal yapıştırıcı",
      "alt kirpik hidrojelli göz pedi",
      "kirpik nem ölçer higrometre %50"
    ],
    "baslik": "Göz Estetiği: İpek Kirpik / Volume Lash İzolasyonu & Nem Ayarı",
    "ikon": "👁️",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Kirpik Randevu Saati",
    "hazirlikZamani": "Alt Kirpik Hidrojel Pedi & Higrometre Nem Ölçümü (%45-60)",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💅 Kirpik yapıştırıcısının (siyanoakrilat) ideal polimerizasyonu için oda nemi %50-60 olmalıdır; tek bir doğal kirpiğe yapıştırılmazsa kirpik dökülmesine yol açar.",
    "oncedenYapilacaklar": [
      "Alt kirpikleri korumak ve yapışmayı önlemek için göz altına kolajenli hidrojel ped yapıştır",
      "Doğal kirpikleri kir ve yağdan arındırmak için kirpik şampuanı ve primer (astar) ile temizle",
      "Kavisli izolasyon cımbızı ile tek bir doğal kirpiği tamamen izole et",
      "0.07 mm kalınlığındaki ipek kirpik demetini medikal yapıştırıcıya batırıp doğal kirpiğe dip mesafesinde (0.5 mm) hava kabarcığı bırakmadan yapıştır"
    ]
  },
  {
    "id": "kuafor_erkek_sakal_sicak_havlu_ustura_tiras_rutini",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "geleneksel sıcak havlu tıraşı",
      "ustura jilet takma steril",
      "sakala sıcak havlu buhar kompres",
      "şap taşı kan taşı hemostatik",
      "tıraş sonrası balsam kolonya"
    ],
    "baslik": "Geleneksel Berberlik: Sıcak Buharlı Havlu Kompresi & Ustura Tıraşı",
    "ikon": "💈",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sakal Tıraşı Başlangıcında",
    "hazirlikZamani": "Sıcak Havlu Makinesi (60°C) & Tek Kullanımlık Jilet",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💈 Sıcak havlu gözenekleri açar ve sakal kıllarını yumuşatır; müşterinin gözü önünde sıfır kırık jilet usturaya takılmalı ve sakalın çıkış yönüne tıraş edilmelidir.",
    "oncedenYapilacaklar": [
      "Okaliptüs ve nane esanslı sıcak nemli havluyu müşterinin yüzüne 3 dakika kompres yaparak sakalları yumuşat",
      "Porsuk kılı fırça ve geleneksel tıraş sabunu ile yüz üzerinde sıcak köpük tabakası oluştur",
      "Tek kullanımlık paslanmaz çelik yaprak jileti müşterinin gözü önünde kırıp çelik usturaya tak",
      "Tıraş sonrası cildi soğuk havluyla şoklayıp mikro kesiklere karşı doğal potasyum şap taşı uygula ve alkolsüz balsam sür"
    ]
  },
  {
    "id": "kuafor_kirpik_lifting_ve_laminasyon_keratin_botoks",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "kirpik lifting perması",
      "silikon ped kirpik yapıştırma",
      "kirpik laminasyon 1 ve 2 numara solüsyon",
      "keratin kirpik botoksu",
      "lifting sonrası 24 saat su yasağı"
    ],
    "baslik": "Kirpik Lifting & Kaş Laminasyonu: Keratinli Kıvırma Protokolü",
    "ikon": "✨",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Lifting Seansında",
    "hazirlikZamani": "Göz Kapağı Boyutuna Uygun Silikon Ped (S/M/L)",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "💅 Kirpik liftingde 1 numara (perma losyonu) ve 2 numara (sabitleyici) bekleme süreleri (10-12 dk) kronometreyle tutulmalı; kirpik uçlarına solüsyon sürülmemelidir.",
    "oncedenYapilacaklar": [
      "Göz kapağına uygun ölçüdeki silikon pedi su bazlı yapıştırıcı ile yerleştir",
      "Doğal kirpikleri cımbız ve Y tarak yardımıyla birbirine paralel şekilde ped üzerine yapıştır",
      "1 Nolu kıvırıcı perma losyonunu sadece kirpik diplerine sürüp 10 dakika kronometre ile beklet",
      "2 Nolu sabitleyici losyon ve ardından keratin besleyici botoks serumu sürerek 24 saat su değdirmeme uyarısı yap"
    ]
  },
  {
    "id": "egitim_meb_ogrenci_nakil_komisyonu_kontenjan",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "e-okul öğrenci nakil kabul",
      "ortaöğretim nakil geçiş komisyonu",
      "haftalık nakil başvuru onayı",
      "okul kontenjan puan dengi nakil",
      "lgs nakil takvimi meb"
    ],
    "baslik": "MEB e-Okul Haftalık Nakil ve Geçiş İşlemleri & Komisyon Onayı",
    "ikon": "🏫",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Her Cuma Günü Saat 17:00'de",
    "hazirlikZamani": "e-Okul Kontenjan Belirleme & Puan Sıralaması",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🎓 MEB Ortaöğretim Kurumları Yönetmeliği uyarınca nakil başvuruları her hafta cuma günü saat 17:00'de e-Okul sistemi tarafından puan üstünlüğüne göre otomatik sonuçlandırılır.",
    "oncedenYapilacaklar": [
      "Hafta başında şube bazında boş kontenjan sayılarını e-Okul modülünde güncelle",
      "Hafta boyunca velilerce yapılan nakil müracaatlarının sistemde onay beklediğini teyit et",
      "Cuma mesai bitiminde sistem tarafından LGS taban puanı veya OBP üstünlüğüne göre yapılan yerleştirmeyi kontrol et",
      "Kayıt kabul hakkı kazanan öğrencilerin nakil kabul onayını verip önceki okulundan resmi nakil dosyasını iste"
    ]
  },
  {
    "id": "egitim_universite_farabi_mevlana_degisim_protokolu",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "farabi değişim programı",
      "mevlana öğrenci protokolü",
      "yök farabi hibe ödemesi",
      "üniversitelerarası protokol anlaşması",
      "farabi transkript intibakı"
    ],
    "baslik": "YÖK Farabi Değişim Programı: Öğrenim Protokolü & İntibak",
    "ikon": "🌍",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Bahar Dönemi Başvuru Takviminde",
    "hazirlikZamani": "Bölüm Ders Müfredatları & Farabi Koordinatör Onayı",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🎓 Farabi Değişim Programında öğrencinin alacağı derslerin kendi üniversitesindeki derslere tam karşılık geldiğini belirten \"Öğrenim Protokolü\" Fakülte Yönetim Kurulunca onaylanmalıdır.",
    "oncedenYapilacaklar": [
      "Gidilecek üniversitenin aynı yarıyıldaki haftalık ders programını ve kredi yüklerini incele",
      "Öğrencinin genel akademik not ortalamasının (en az 2.00/4.00) şartı sağladığını doğrula",
      "Farabi Koordinatörlüğü onaylı 3 nüsha Öğrenim Protokolü formunu düzenle",
      "Dönem sonunda gelen resmi transkripti Fakülte İntibak Komisyonundan geçirerek notları sisteme işlet"
    ]
  },
  {
    "id": "egitim_meb_ogretmenler_kurulu_donem_basi_kararlari",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "sene başı öğretmenler kurulu",
      "kurul gündem maddeleri meb",
      "öğretmenler kurulu tutanağı imza",
      "okul zümre başkanları kurulu",
      "öğrenci başarı analizi kurul"
    ],
    "baslik": "MEB Sene Başı Öğretmenler Kurulu Toplantısı & Karar Tutanağı",
    "ikon": "📋",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Eylül Ayının İlk İş Gününde",
    "hazirlikZamani": "Toplantı Gündemi Tebliği (En Az 2 Gün Önce)",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🎓 MEB Yönetmeliği uyarınca kurul gündemi toplantıdan en az iki gün önce imza karşılığı öğretmenlere duyurulur; kararlar oy çokluğuyla alınıp ıslak imzayla deftere yapıştırılır.",
    "oncedenYapilacaklar": [
      "Toplantı gündem maddelerini (başarı durumu, nöbet çizelgeleri, sosyal kulüpler, projeler) hazırla",
      "Gündemi en az 48 saat önceden tüm öğretmenlere DYS ve imza sirküsüyle duyur",
      "Toplantı esnasında alınan kararları raportör öğretmen aracılığıyla tutanağa geçir",
      "Tüm öğretmenlerin toplantı tutanağını ve hazır bulunanlar listesini imzalamasını sağlayıp DYS'ye yükle"
    ]
  },
  {
    "id": "egitim_okul_aile_birligi_oab_tefe_bis_gelir_gider",
    "category": "finans",
    "domain": "EGITIM",
    "keywords": [
      "okul aile birliği tefbis sistemi",
      "tefbis fatura girişi gelir gider",
      "okul aile birliği genel kurulu",
      "bağış ve kantin payı tefbis",
      "oab banka hesap mutabakatı"
    ],
    "baslik": "Okul Aile Birliği: TEFBİS Gelir-Gider Kayıtları & Denetim Kurulu",
    "ikon": "🤝",
    "renk": "#FED7AA",
    "varsayilanZaman": "Her Fatura Kesildiğinde / Ay Sonu",
    "hazirlikZamani": "Banka Ekstresi & Kaşeli Mal/Hizmet Faturaları",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🎓 MEB Okul Aile Birliği Yönetmeliği gereğince tüm bağış, kantin kira payı ve bakım harcamaları TEFBİS modülüne girilmeli; banka bakiyesiyle kuruşu kuruşuna tutmalıdır.",
    "oncedenYapilacaklar": [
      "Okul Aile Birliği banka hesabına gelen şartlı/şartsız bağış makbuzlarını TEFBİS Gelir Modülüne işle",
      "Okulun temizlik, kırtasiye ve onarım faturalarını onaylı şekilde TEFBİS Gider Modülüne fatura numarasıyla kaydet",
      "Her ayın son iş gününde TEFBİS kasa mevcudu ile banka hesap ekstresi bakiyesini karşılaştır",
      "Yılda iki kez toplanan Denetim Kuruluna gelir-gider defterini ve fatura klasörünü ibraz et"
    ]
  },
  {
    "id": "egitim_universite_fakulte_yonetim_kurulu_fyk_karari",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "fakülte yönetim kurulu fyk",
      "2547 sayılı kanun m. 15",
      "fyk gündem ve karar defteri",
      "öğrenci mazeret sınavı fyk onayı",
      "akademik izin ve görevlendirme fyk"
    ],
    "baslik": "Üniversite: Fakülte Yönetim Kurulu (FYK) Kararları & Defter Tescili",
    "ikon": "🏛️",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Haftalık Rutin Toplantı Gününde",
    "hazirlikZamani": "Bölüm Kurulu Yazıları & Dekanlık Gündem Özeti",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "🎓 2547 sayılı Kanun m. 15 gereğince mazeret sınavları, intibaklar ve 39. madde görevlendirmeleri FYK kararı olmadan yürürlüğe giremez; kararlar ciltli deftere yapıştırılır.",
    "oncedenYapilacaklar": [
      "Bölüm başkanlıklarından gelen öğrenci mazeret dilekçeleri ve intibak raporlarını gündeme al",
      "Dekan başkanlığında toplanan Fakülte Yönetim Kurulunda maddeleri tek tek oylamaya sun",
      "Alınan kararları Yıl/Sayı formatında (Örn: FYK-2026/14-02) resmi karar formatında kaleme al",
      "Kurul üyelerinin tamamına imzalatıp Rektörlük Öğrenci İşleri veya Personel Dairesine üst yazıyla ilet"
    ]
  },
  {
    "id": "kamu_657_disiplin_sorusturmasi_7_gun_savunma",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "657 disiplin soruşturması",
      "7 gün savunma istemi kamu",
      "devlet memuru disiplin cezası",
      "657 madde 130 savunma hakkı",
      "muhakkik soruşturma raporu"
    ],
    "baslik": "657 Sayılı DMK m. 130 Uyarınca Disiplin Soruşturması Savunma İstemi",
    "ikon": "⚖️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Tebliğden İtibaren 7 Gün",
    "hazirlikZamani": "İsnat Edilen Fiil Dosyası & İfadelerin İncelenmesi",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "📜 657 sayılı DMK m. 130 uyarınca memura en az 7 gün süre verilmeden disiplin cezası verilemez; süresi içinde savunma yapmayan hakkından vazgeçmiş sayılır.",
    "oncedenYapilacaklar": [
      "Muhakkik veya Disiplin Kurulu tarafından isnat edilen fiilin hangi alt bende (uyarma, kınama, aylıktan kesme vb.) uyduğunu netleştir",
      "Yazılı tebligat belgesini teslim alıp 7 günlük yasal savunma süresini hesapla",
      "Soruşturma dosyasındaki aleyhte delilleri ve tanık ifadelerini inceleyerek yazılı savunma metnini hazırla",
      "Varsa lehte tanık, kamera kaydı veya resmi evrak delillerini savunma ekine iliştirerek evrak kaydından geçir"
    ]
  },
  {
    "id": "kamu_mal_bildirimi_3628_sayili_kanun_sonu_0_5",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "mal bildirimi yenileme",
      "3628 sayılı kanun mal bildirimi",
      "sonu 0 ve 5 ile biten yıllar",
      "ek mal bildirimi 1 ay",
      "genel mal beyanı şubat sonu"
    ],
    "baslik": "3628 Sayılı Kanun Kapsamında Genel Mal Bildirimi Yenileme (0 ve 5 Yılları)",
    "ikon": "📑",
    "renk": "#FEF9C3",
    "varsayilanZaman": "İlgili Yılın Şubat Ayı Sonuna Kadar",
    "hazirlikZamani": "Tapu, Banka Mevduat, Araç ve Menkul Kıymet Bilgileri",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🏛️ 3628 sayılı Kanun gereği tüm kamu görevlileri sonu (0) ve (5) ile biten yılların Şubat ayı sonuna kadar genel mal bildirimini kapalı zarf içinde yenilemek zorundadır.",
    "oncedenYapilacaklar": [
      "Memurun kendisi, eşi ve velayeti altındaki çocuklarına ait taşınmaz, taşıt ve altın/mevduat dökümlerini çıkar",
      "Genel beyan dönemleri haricinde net maaşın 5 katını aşan mal artışlarında 1 ay içinde \"Ek Mal Bildirimi\" verilmiş olduğunu doğrula",
      "Resmi Mal Bildirimi Formunu doldurup imzalayarak kapalı ve mühürlü zarfa koy",
      "Kurum Özlük/Personel İşleri Şube Müdürlüğüne teslim edip alındı belgesini muhafaza et"
    ]
  },
  {
    "id": "kamu_mys_v2_avans_kredi_mahsup_kapatma",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "mys v2 avans kapatma",
      "kamu harcama yönetim sistemi kredi mahsubu",
      "harcama yetkilisi avans mahsup",
      "muhasebat kontrolü harcama talimatı",
      "bütçe emaneti mahsup"
    ],
    "baslik": "Kamu Harcama Yönetim Sistemi (MYS v2) Avans/Kredi Mahsubu ve Kapatılması",
    "ikon": "💳",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Harcamadan Sonraki 1 Ay / Mali Yıl Sonu",
    "hazirlikZamani": "Faturalar, Muayene Kabul Tutanağı ve Harcama Talimatı",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "💼 5018 sayılı Kanun uyarınca açılan avans veya krediler en geç 1 ay içinde, her halükarda mali yılın son iş gününde fatura ve kanıtlayıcı belgelerle mahsup edilmelidir.",
    "oncedenYapilacaklar": [
      "Mutemet üzerine açılan avans tutarından yapılan harcamalara ait e-Arşiv / e-Faturaları topla",
      "MYS v2 portalında Harcama Talimatı ilişkilendirmesiyle \"Mahsup Harcama Talimatı\" oluştur",
      "Muayene ve Kabul Komisyonu Tutanağını MYS v2 sistemine tarayarak ekle",
      "Gerçekleştirme Görevlisi ve Harcama Yetkilisi e-İmza onaylarıyla Muhasebe Müdürlüğüne ilet"
    ]
  },
  {
    "id": "kamu_resmi_yazisma_gizlilik_dereceli_evrak_yonetimi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "gizlilik dereceli evrak",
      "çok gizli gizli özel hizmete özel",
      "çift zarf usulü resmi yazı",
      "gizlilik dereceli evrak zimmet defteri",
      "ebys gizli evrak yetkisi"
    ],
    "baslik": "Resmi Yazışmalarda Gizlilik Dereceli Evrak (Çift Zarf) & Arşiv Güvenliği",
    "ikon": "🔒",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Evrak Hazırlık ve Sevk Anında",
    "hazirlikZamani": "Kırmızı Gizlilik Derecesi Kaşesi & İç-Dış Zarf",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "📜 Resmi Yazışma Yönetmeliğine göre \"Çok Gizli\" veya \"Gizli\" evraklar fiziki gönderimde mutlaka çift zarf usulüyle kapatılmalı, dış zarfa gizlilik derecesi asla yazılmamalıdır.",
    "oncedenYapilacaklar": [
      "Evrakın başlık üstü ve sayfa altına ortalı olarak kırmızı damgayla gizlilik derecesini (GİZLİ / ÇOK GİZLİ) bas",
      "Evrakı iç zarfa koyarak zarfın kapanma yerlerini mühürle ve gizlilik kaşesini vur",
      "İç zarfı dış zarfa koy; dış zarf üzerine sadece alıcı kurum ve adres bilgilerini yazarak kurye zimmet defteriyle teslim et",
      "EBYS üzerinde belgenin görme yetkisini sadece ilgili şef ve amirlerin profiline sınırla"
    ]
  },
  {
    "id": "kamu_sayistay_denetimi_savunma_layihasi_sorgu_kagidi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "sayıştay sorgu kağıdı cevabı",
      "savunma layihası sayıştay",
      "kamu zararı sorgusu",
      "sayıştay yargılaması ilam",
      "30 gün sayıştay savunma süresi"
    ],
    "baslik": "Sayıştay Denetimi Sorgu Kağıdı Cevaplandırması & Savunma Layihası",
    "ikon": "🏛️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Sorgu Tebliğinden İtibaren 30 Gün",
    "hazirlikZamani": "İhale, Hakediş ve Ödeme Emri Belgeleri Arşiv Dosyası",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "⚖️ 6085 sayılı Sayıştay Kanunu gereği Sayıştay Denetçisi tarafından tebliğ edilen sorgu kağıdına 30 gün içinde gerekçeli ve mevzuat dayanaklı savunma layihası sunulmalıdır.",
    "oncedenYapilacaklar": [
      "Sayıştay denetçisinin tespit ettiği kamu zararı veya mevzuata aykırılık iddiasını incele",
      "Harcamanın yapıldığı tarihteki Cumhurbaşkanlığı Kararnamesi, Bütçe Kanunu ve KİK Genel Tebliğlerini tara",
      "Harcama Yetkilisi, Gerçekleştirme Görevlisi ve Muhasebe Yetkilisi ortak imzalı savunma layihasını tanzim et",
      "Eğer sehven fazla ödeme varsa tahsilat makbuzunu ekleyerek konunun ilama dönüşmeden kapanmasını sağla"
    ]
  },
  {
    "id": "sanat_film_cekim_izinleri_valilik_belediye_il_kultur",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "film çekim izni valilik",
      "dizi çekimi mekan izinleri",
      "belediye işgaliye çekim izin",
      "il kültür turizm çekim bildirimi",
      "drone çekim izni shgm ihamm"
    ],
    "baslik": "Film/Dizi Prodüksiyonu Mekan İzinleri, Valilik & SHGM Drone İzni Süreci",
    "ikon": "🎬",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Çekim Tarihinden En Az 7 İş Günü Önce",
    "hazirlikZamani": "Senaryo Özeti, Ekip Listesi ve Prodüksiyon Sigorta Poliçesi",
    "hazirlikSaatOncesi": 72,
    "akilliFisilti": "🎥 Halka açık alanlarda çekim yapabilmek için Valilik, Emniyet ve ilgili Belediye Zabıta Müdürlüğünden izin alınmalı; drone uçuşu için SHGM sisteminden İHA izin onayı çıkmalıdır.",
    "oncedenYapilacaklar": [
      "İl Kültür ve Turizm Müdürlüğüne senaryo özeti ve çekim planıyla resmi müracaatı yap",
      "İlgili İlçe Emniyet Müdürlüğü ve Trafik Şubeye set araçlarının konuşlanacağı sokak için yol kapama bildirimi ver",
      "SHGM (Sivil Havacılık) İHA Kayıt Sistemi üzerinden İHA2/İHA1 pilotu lisansı ve koordinat bazlı uçuş iznini al",
      "Belediyeye işgaliye bedelini yatırarak çekim onay yazısının çıktısını set amirine teslim et"
    ]
  },
  {
    "id": "sanat_set_isik_gaffer_jenerator_faz_denge",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "gaffer ışık şefi",
      "jeneratör faz dengeleme set",
      "hmi ışık balast frekans",
      "3 faz güç dağıtımı set",
      "kamera titremesi flicker free"
    ],
    "baslik": "Film Seti Işık Departmanı (Gaffer) & 3-Faz Jeneratör Yük Dengeleme",
    "ikon": "💡",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Set Kurulumu Sırasında (Motor Demeden Önce)",
    "hazirlikZamani": "Pens Ampermetre, Dağıtım Panosu (Distro) ve Ağır Akım Kabloları",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚡ Film jeneratöründe R, S, T fazları arasındaki akım farkı %15’i aşarsa jeneratör nötr kayması yaşar, hassas HMI balastlar ve kamera elektroniği yanabilir.",
    "oncedenYapilacaklar": [
      "Toplam HMI ve Tungsten/LED ışık yükünü R, S, T fazlarına dengeli olarak dağıt",
      "Pens ampermetre ile faz başına çekilen akımı (Amper) ölçerek fazlar arası dengeyi doğrula",
      "Yüksek kare (High-Speed) çekimler için HMI balastlarını \"Flicker-Free\" (1000 Hz) moduna al",
      "Jeneratörün topraklama kazığının nemli toprağa en az 1 metre çakıldığını teyit et"
    ]
  },
  {
    "id": "sanat_ses_timecode_jam_sync_tentacle_esleme",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "timecode jam sync",
      "ses kamera timecode eşleme",
      "tentacle sync montaj senkron",
      "25 fps ltc timecode",
      "slate klaket eşzamanlama"
    ],
    "baslik": "Prodüksiyon Ses Kaydı Timecode Jam Sync (Kamera & Ses Eşleme)",
    "ikon": "🎙️",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Sabah İlk Kamera Kurulumunda & Batarya Değişiminde",
    "hazirlikZamani": "Master Ses Kayıtçı (Sound Devices/Zaxcom) & LTC Timecode Kutuları",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🎧 Timecode drift (zaman kayması) montajda günlerce sync kaybına yol açar; master ses kayıtçısından kameralara her sabah ve öğle paydosunda Jam-Sync yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Proje kare hızını (Örn: 25.00 fps veya 24.00 fps) ses kayıtçısı ve tüm A/B kameralarda birebir aynı ayarla",
      "Master ses kayıtçısını Real-Time Clock ile başlatıp Tentacle/Denecke timecode kutularını BNC/Lemo kabloyla Jam et",
      "Kameraların AUX veya TC IN portlarına kutuları bağlayıp kameranın \"Ext-TC\" ibaresini gördüğünü doğrula",
      "Sahne başında akıllı klaket (Smart Slate) çakarak hem görsel hem sesli yedek sync noktası oluştur"
    ]
  },
  {
    "id": "sanat_renk_color_grading_aces_rec2020_hdr",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "acescc renk yönetimi",
      "davinci resolve color grading",
      "rec 2020 hdr teslimat",
      "aces idt odt dönüşümü",
      "1000 nit master monitör kalibrasyonu"
    ],
    "baslik": "Post Prodüksiyon ACES Renk Alanı (Color Management) & HDR/SDR Mastering",
    "ikon": "🎨",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Post Prodüksiyon Renk Aşaması Başlangıcında",
    "hazirlikZamani": "Kalibre Edilmiş Mastering Referans Monitörü & DaVinci Resolve",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🖥️ ACEScc iş akışında her kameranın RAW/Log formatı doğru IDT (Input Device Transform) ile dönüştürülmeli, teslimat formatına göre ODT (Rec.709 veya Rec.2020) seçilmelidir.",
    "oncedenYapilacaklar": [
      "DaVinci Resolve proje ayarlarında Color Science’ı \"ACEScc\" veya \"DaVinci YRGB Color Managed\" olarak ayarla",
      "Kamera ham görüntülerini ARRI LogC, Sony S-Log3, RED Log3G10 doğru IDT profiliyle eşleştir",
      "Monitör probu (Calibrite/X-Rite) ile referans OLED monitörün 100 nit Rec.709 ve 1000 nit ST.2084 PQ hedeflerini doğrula",
      "Yayın standartlarına uygunluk için yazılımsal ve donanımsal Waveform / Vectorscope sınırlarını denetle"
    ]
  },
  {
    "id": "sanat_fsek_senaryo_telif_haklari_tescil",
    "category": "resmi",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "senaryo telif hakkı tescili",
      "fsek eser sahipliği tescili",
      "telif hakları genel müdürlüğü tescil",
      "5846 sayılı fikir ve sanat eserleri",
      "noter senaryo tasdiki"
    ],
    "baslik": "5846 Sayılı FSEK Kapsamında Senaryo Eser Sahipliği ve İsteğe Bağlı Kayıt-Tescil",
    "ikon": "📜",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Senaryonun 3. Kişilere Sunulmasından Önce",
    "hazirlikZamani": "Senaryo Metni PDF, Tretman ve E-İmzalı Başvuru Formu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ 5846 sayılı FSEK uyarınca telif hakkı eserin yaratılmasıyla doğar; ancak ispat kolaylığı açısından Kültür ve Turizm Bakanlığı İsteğe Bağlı Kayıt Tescil Belgesi alınmalıdır.",
    "oncedenYapilacaklar": [
      "Senaryonun sinopsis, tretman ve tam metnini tarih ve yazar ismi belirterek son taslağa getir",
      "Kültür ve Turizm Bakanlığı Telif Hakları Genel Müdürlüğü e-Devlet portalından başvuru yap",
      "Tescil harcını yatırarak sisteme eserin PDF nüshasını yükle ve resmi tescil belgesini edin",
      "Yapım şirketiyle sözleşme yaparken mali hakların (işleme, çoğaltma, yayma, temsil) devir sınırlarını netleştir"
    ]
  },
  {
    "id": "kuafor_perma_tiyoglikolik_asit_notralizasyon_ph",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "soğuk perma uygulaması",
      "tiyoglikolik asit perma solüsyonu",
      "perma nötralizasyon süresi",
      "hidrojen peroksit sabitleyici",
      "saç disülfit bağı kırma"
    ],
    "baslik": "Soğuk Perma Kimyasal Süreci & Nötralizasyon (Disülfit Bağı) Protokolü",
    "ikon": "💇‍♀️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "İşlem Başlangıcında Titiz Kronometre",
    "hazirlikZamani": "Perma Losyonu (pH 8.5-9.5), Nötralizatör, Bigudi ve Koruyucu Krem",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⏳ Perma losyonu saçtaki disülfit bağlarını kırar; belirlenen süreden 5 dakika fazla bekletmek saçın lastikleşip kopmasına yol açar, nötralizasyon tam yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Saç derisine koruyucu bariyer krem sürerek kimyasal yanık riskini engelle",
      "Bigudilere sarılmış saça perma losyonunu homojen dağıt ve 15-20 dakikalık kontrol süresini başlat",
      "Test buklesi açarak S-dalga formunun oluştuğunu gözlemle ve saçı en az 5 dakika ılık suyla durula",
      "Nötralizatörü (oksitleyici) uygulayıp bağların kilitlenmesi için tam 10 dakika bekletip nazikçe aç"
    ]
  },
  {
    "id": "kuafor_protez_tirnak_jel_polimerizasyon_isi_reaksiyonu",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "protez tırnak jel polimerizasyon",
      "uv led tırnak lambası 365nm",
      "jel tırnak ısı reaksiyonu yanma",
      "tırnak dehidaratör ve primer",
      "tırnak yatağı onikoliz koruması"
    ],
    "baslik": "Protez Tırnak Jel Polimerizasyonu & UV/LED Isı Reaksiyonu Kontrolü",
    "ikon": "💅",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Tırnak Uygulaması Sırasında",
    "hazirlikZamani": "UV/LED Lamba (48W Çift Dalga Boyu), Asitsiz Primer, Builder Jel",
    "hazirlikSaatOncesi": 0,
    "akilliFisilti": "💡 Kalın sürülen builder jel UV ışık altında ani ekzotermik reaksiyon vererek tırnak yatağında termal yanık ve onikolize (tırnak ayrılması) sebep olur; düşük ısı (Low Heat) modu kullanılmalıdır.",
    "oncedenYapilacaklar": [
      "Doğal tırnak yüzeyini hafifçe matlaştırıp yağdan arındırmak için dehidaratör ve asitsiz primer sür",
      "Builder jeli tek seferde aşırı kalın değil, mimari tepe noktası (Apex) kuralına göre ince katmanlarla yerleştir",
      "Lambayı \"Low Heat Mode\" (99 saniye kademeli güç) ayarına alarak müşterinin elini yerleştirmesini sağla",
      "Yanma hissi olduğu anda müşterinin elini 3 saniye lambanın dışına çekip tekrar sokmasını tembihle"
    ]
  },
  {
    "id": "kuafor_dermapen_mikro_igneleme_derinlik_steril_serum",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "dermapen mikroiğneleme derinliği",
      "steril titanyum iğne kartuşu",
      "medikal cilt gençleştirme dermapen",
      "hyaluronik asit mezoterapi dermapen",
      "lokal anestezik krem cilt"
    ],
    "baslik": "Dermapen (Mikroiğneleme) Protokolü & Bölgesel İğne Derinlik Kalibrasyonu",
    "ikon": "✨",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Randevu Başlangıcında (60 Dakika)",
    "hazirlikZamani": "Tek Kullanımlık 12/36 Pin Titanyum Kartuş & Steril Hyaluronik Asit Flakonu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚠️ Alın ve burun gibi kemikli bölgelerde iğne derinliği 0.25-0.5 mm, yanakta ise en fazla 1.0-1.5 mm olmalıdır; işlem sonrası 24 saat su değdirilmemelidir.",
    "oncedenYapilacaklar": [
      "Danışanın onam formunu alarak aktif sivilce, keloid veya açık yara olmadığını kontrol et",
      "Bölgeye lokal anestezik krem uygulayıp streç film altında 25 dakika beklet ve ardından antiseptikle sil",
      "Müşterinin gözü önünde tek kullanımlık steril iğne paketini açarak cihaza tak",
      "Steril hyaluronik asit damlatarak 90 derece dik açıyla epidermal mikro kanallar aç ve yatıştırıcı maske uygula"
    ]
  },
  {
    "id": "kuafor_ipek_kirpik_siyanoakrilat_nem_sicaklik_ayar",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "ipek kirpik yapıştırıcı nem",
      "siyanoakrilat buhar tahrişi",
      "kirpik uzatma nem ölçer higrometre",
      "ipek kirpik kuruma süresi",
      "kirpik nano mist buhar"
    ],
    "baslik": "İpek Kirpik Uygulamasında Siyanoakrilat Yapıştırıcı & Ortam Nem Kalibrasyonu",
    "ikon": "👁️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "İşlem Başlangıcında",
    "hazirlikZamani": "Dijital Higrometre, Medikal Yapıştırıcı ve Göz Altı Hidrojeli Pedi",
    "hazirlikSaatOncesi": 0,
    "akilliFisilti": "🌡️ Siyanoakrilat yapıştırıcılar %45-%60 bağıl nem ve 20-22°C oda sıcaklığında 1 saniyede polimerleşir; düşük nemde yapıştırıcı donmaz, yüksek nemde şok beyazlama (blooming) yapar.",
    "oncedenYapilacaklar": [
      "İşlem odasındaki nem oranını higrometre ile ölçerek gerekirse ultrasonik hava nemlendiriciyi çalıştır",
      "Göz altı kirpiklerini korumak için kolajenli göz altı jel pedini yerleştir",
      "Yapıştırıcı damlasını her 15 dakikada bir yeşim taşı üzerinde tazeleyerek homojen vizkoziteyi koru",
      "İşlem bitiminde nano-mist soğuk buhar cihazıyla buharları 30 saniye nötralize ederek göz batmasını önle"
    ]
  },
  {
    "id": "kuafor_otoklav_alet_sterilizasyonu_biyolojik_spor_testi",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "otoklav sterilizasyonu kuaför",
      "manikür pedikür aletleri sterilizasyon",
      "b sınıfı otoklav 134 derece",
      "sterilizasyon rulo poşet renk indikatörü",
      "haftalık biyolojik spor testi"
    ],
    "baslik": "Güzellik Salonu B-Sınıfı Otoklav Alet Sterilizasyonu & İndikatör Takibi",
    "ikon": "✂️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Her Akşam Kapanışta & Haftalık Spor Testi",
    "hazirlikZamani": "Sterilizasyon Rulosu, Poşet Yapıştırma Cihazı ve İndikatör Şeritler",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🏥 Manikür, pedikür ve et pensleri hepatit ve mantar bulaş riski taşır; kuru hava veya UV dolap yetersizdir, B-Sınıfı otoklavda 134°C’de 18 dakika basınçlı buharla steril edilmelidir.",
    "oncedenYapilacaklar": [
      "Metal aletleri ultrasonik dezenfektan banyosunda 15 dakika yıkayarak organik kalıntıları fırçala",
      "Aletleri kurulayıp kimyasal indikatörlü sterilizasyon poşetlerine yerleştirerek ısıyla mühürle",
      "Otoklavı 134°C 2.1 bar \"Paketli Alet\" programında çalıştır",
      "Döngü sonunda poşet üzerindeki indikatörün pembeden kahverengi/siyaha döndüğünü teyit et ve sterilizasyon kayıt defterine işle"
    ]
  },
  {
    "id": "egitim_meb_ogretmen_ders_disi_egzersiz_planlama",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "ders dışı eğitim çalışmaları egzersiz",
      "meb egzersiz planı haftalık 6 saat",
      "satranç drama izcilik egzersiz",
      "öğrenci egzersiz veli izin belgesi",
      "ilçe mem egzersiz onay yazısı"
    ],
    "baslik": "MEB Ders Dışı Eğitim Çalışmaları (Egzersiz) & İlçe MEM Onayı",
    "ikon": "♟️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Ekim Ayı Başında / Eğitim Yılı Başında",
    "hazirlikZamani": "Eğitici Sertifikası & Yıllık Egzersiz Çalışma Planı",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🎓 MEB Genelgesi uyarınca haftalık en fazla 6 saat ders dışı egzersiz açılabilir; okulun toplam egzersiz saati okul ders yükünün %6'sını aşamaz.",
    "oncedenYapilacaklar": [
      "Açılacak alana (satranç, halk oyunları, tiyatro, spor) ait federasyon veya MEB onaylı eğitici belgesini dosyala",
      "Haftalık gün ve saat dağılımını gösteren yıllık çalışma planını ve kazanım tablosunu hazırla",
      "Egzersize katılacak en az 12-15 öğrencinin ıslak imzalı \"Veli İzin Dilekçeleri\"ni topla",
      "Okul müdürü üst yazısıyla İlçe Milli Eğitim Müdürlüğüne gönderip resmi onay geldikten sonra dersleri başlat"
    ]
  },
  {
    "id": "egitim_universite_yokak_kurumsal_akreditasyon_raporu",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "yökak kurumsal akreditasyon",
      "kidr kurumsal iç değerlendirme raporu",
      "yökak dış değerlendirici ziyareti",
      "puko döngüsü kalite güvencesi",
      "akademik program akreditasyonu"
    ],
    "baslik": "YÖKAK Kurumsal Akreditasyon & KİDR (İç Değerlendirme Raporu)",
    "ikon": "🏛️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Her Yıl Nisan Ayı Sonuna Kadar",
    "hazirlikZamani": "Tüm Fakültelerin PUKÖ Kanıt Belgeleri & Öğrenci Anketleri",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🎓 YÖKAK kriterlerine göre Liderlik, Eğitim-Öğretim, Ar-Ge ve Toplumsal Katkı başlıklarında PUKÖ (Planla-Uygula-Kontrol Et-Önlem Al) kanıtları sisteme yüklenmelidir.",
    "oncedenYapilacaklar": [
      "Üniversite Kalite Komisyonu eşgüdümünde birimlerden yıllık performans göstergelerini topla",
      "Program öğrenme çıktıları ile ders kazanımlarının matris eşleşmesini ve mezun anketlerini analiz et",
      "Kurumsal İç Değerlendirme Raporunu (KİDR) YÖKAK veri tabanına kanıt PDF bağlantılarıyla yükle",
      "Saha ziyareti yapacak YÖKAK Dış Değerlendirme Takımı için akademik personel ve öğrenci odak grup odalarını hazırla"
    ]
  },
  {
    "id": "egitim_meb_okul_aile_birligi_genel_kurul_ve_tefbist",
    "category": "finans",
    "domain": "EGITIM",
    "keywords": [
      "okul aile birliği genel kurulu",
      "tefbis gelir gider kaydı",
      "oab denetim kurulu raporu",
      "okul bağış dekontu tefbis",
      "ekim ayı okul aile birliği toplantısı"
    ],
    "baslik": "MEB Okul Aile Birliği Yıllık Genel Kurulu & TEFBİS Bütçe Kaydı",
    "ikon": "📋",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Yıl Ekim Ayı Sonuna Kadar",
    "hazirlikZamani": "Banka Hesap Ekstreleri & Harcama Faturaları Dosyası",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🎓 MEB Okul Aile Birliği Yönetmeliği gereğince tüm bağış, kantin kirası ve harcamalar TEFBİS sistemine kaydedilmek ve Genel Kurulda ibra edilmek zorundadır.",
    "oncedenYapilacaklar": [
      "Genel Kurul toplantı tarihini, yerini ve gündemini en az 15 gün önceden okul panosunda ve web sitesinde ilan et",
      "Önceki döneme ait tüm fatura ve makbuzları Denetim Kuruluna inceleterek \"Denetim Kurulu Raporu\"nu hazırlat",
      "Divan başkanı huzurunda yeni Yönetim ve Denetim Kurulu asil/yedek üyelerinin seçimini yap",
      "Toplantı tutanağını imzalayıp tüm mali bilançoyu MEB TEFBİS modülüne girerek onaylat"
    ]
  },
  {
    "id": "egitim_yabanci_uyruklu_ogrenci_yos_ve_denklik_meb",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "yabancı öğrenci denklik belgesi",
      "e-denklik meb",
      "yabancı pasaport tercüme noter",
      "uluslararası koruma yabancı öğrenci kaydı",
      "yöksis yabancı öğrenci yös"
    ],
    "baslik": "Yabancı Uyruklu Öğrenci e-Denklik Belgesi & e-Okul / YÖKSİS Tescili",
    "ikon": "🌐",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Kayıt Döneminde Başvuru Anında",
    "hazirlikZamani": "Apostil Şerhli Transkript & Yeminli Noter Tercümesi",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "🎓 MEB Denklik Yönetmeliği uyarınca İl Milli Eğitim Müdürlüğü Denklik Merkezinden e-Denklik Belgesi alınmadan yabancı öğrenci kesin kayıt statüsüne geçirilemez.",
    "oncedenYapilacaklar": [
      "Öğrencinin menşe ülkesinden aldığı orijinal karne/diplomadaki Apostil şerhini kontrol et",
      "Yeminli tercümandan Türkçe noter onaylı tercüme suretini temin et",
      "MEB e-Denklik modülü üzerinden online randevu alıp belgeleri tarayarak yükle",
      "Onaylanan denklik belgesindeki sınıf seviyesine (örn: 9. Sınıf) göre e-Okul sistemine geçici koruma/yabancı kimlik no ile kesin kaydı yap"
    ]
  },
  {
    "id": "egitim_ogrenci_kisisel_dosyasi_ve_rehberlik_mebbis_ram",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "öğrenci rehberlik dosyası",
      "mebbis ram modülü yönlendirme",
      "öğrenci gelişim raporu",
      "rehberlik psikolojik danışma formu",
      "gizli rehberlik görüşme notu"
    ],
    "baslik": "Okul Rehberlik Servisi: Gizlilik İlkeli Öğrenci Görüşme & RAM Sevk",
    "ikon": "🔒",
    "renk": "#FED7AA",
    "varsayilanZaman": "Gözlem / Yönlendirme Sürecinde",
    "hazirlikZamani": "Sınıf Rehber Öğretmeni Gözlem Formu",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🎓 PDR Hizmetleri Yönetmeliği m. 22 uyarınca rehberlik görüşme kayıtları kişisel veridir ve gizlidir; okul idaresine dahi özel detaylar değil sadece genel kanaat verilir.",
    "oncedenYapilacaklar": [
      "Görüşme içeriğini şifreli veya kilitli fiziki rehberlik dosyasında güvenli arşivle",
      "Akademik veya davranışsal gerilikte sınıf rehber öğretmeninden \"Eğitsel Değerlendirme İstek Formu\"nu al",
      "Öğrenci velisiyle görüşüp bilgilendirilmiş yazılı RAM Sevk Onay Belgesi imzalattır",
      "MEBBİS RAM Yönlendirme Modülü üzerinden sisteme eğitsel raporu girip randevu oluştur"
    ]
  },
  {
    "id": "kamu_aday_memur_asli_devlet_memurluguna_atanma_dmk54",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "aday memurluk süresi dmk 54",
      "en az bir en çok iki yıl adaylık",
      "temel eğitim hazırlayıcı eğitim staj",
      "aday memur yemin töreni",
      "asli devlet memurluğuna atanma teklifi"
    ],
    "baslik": "657 Sayılı DMK: Aday Memurluk Süreci, Sınavlar & Yemin Töreni (DMK 54)",
    "ikon": "🏛️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Adaylık Süresi Bitiminden 1 Ay Önce",
    "hazirlikZamani": "Temel ve Hazırlayıcı Eğitim Sınav Notları & Sicil Değerlendirmesi",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏛️ 657 sayılı DMK m. 54 gereği adaylık süresi 1 yıldan az, 2 yıldan çok olamaz; temel ve hazırlayıcı eğitim sınavından en az 60 alıp stajını tamamlayan memur asil kadroya atanır.",
    "oncedenYapilacaklar": [
      "Aday memurun temel eğitim (en az 10 gün) ve hazırlayıcı eğitim (en az 1 ay) sınav sonuç tutanaklarını kontrol et",
      "Birim amirince doldurulan \"Aday Memur Değerlendirme Formu\"nun olumlu notunu teyit et",
      "Disiplin amirinin ve atamaya yetkili amirin onayıyla \"Asli Devlet Memurluğuna Atanma Kararnamesi\"ni hazırla",
      "Türk Bayrağı üzerine el koyarak 657 m. 267 uyarınca resmi yemin metnini okutup özlük dosyasına kaldır"
    ]
  },
  {
    "id": "kamu_devlet_arsivleri_standart_dosya_plani_saklama_sureleri",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "devlet arşiv hizmetleri yönetmeliği",
      "standart dosya planı sdp kodu",
      "kurum arşivine devir süresi 5 yıl",
      "ayıklama ve imha komisyonu tutanağı",
      "devlet arşivleri başkanlığına devir"
    ],
    "baslik": "Resmi Arşiv: Standart Dosya Planı (SDP) & Belge İmha / Saklama Süresi",
    "ikon": "📂",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Yıl Sonu Evrak Ayıklama ve Arşiv Devir Döneminde",
    "hazirlikZamani": "Birim Evrak Kayıt Defterleri & Arşiv Saklama Planı",
    "hazirlikSaatOncesi": 8,
    "akilliFisilti": "🏛️ Resmi yazılar SDP koduna göre dosyalanır; birim arşivinde 1-5 yıl saklandıktan sonra kurum arşivine devredilir, saklama süresi dolanlar komisyon kararı olmadan imha edilemez.",
    "oncedenYapilacaklar": [
      "Gelen ve giden tüm yazıların konusuna uygun Standart Dosya Planı (SDP) kodunu (örn: 903.02) denetle",
      "Cari yılda işlemi biten dosyaları bağlayarak dosya sırtlığı ve birim arşiv listesini hazırla",
      "Ayıklama ve İmha Komisyonu teşkil ederek saklama süresi dolan rutin evraklar için resmi imha listesi hazırla",
      "Tarihi veya hukuki değeri olan kalıcı evrakları Devlet Arşivleri Başkanlığına devir protokolüyle teslim et"
    ]
  },
  {
    "id": "kamu_resmi_arac_gorev_emri_ve_tasit_kanunu_237",
    "category": "arac_ulasim",
    "domain": "KAMU",
    "keywords": [
      "237 sayılı taşıt kanunu",
      "resmi taşıt görev emri formu",
      "resmi plakalı araç hafta sonu kullanımı",
      "araç takip sistemi gps kamu taşıtı",
      "resmi araç akaryakıt taşıtmatik limit"
    ],
    "baslik": "237 Sayılı Taşıt Kanunu: Resmi Görev Emri Belgesi & Taşıt Takip",
    "ikon": "🚙",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Resmi Plakalı Araç Kurumdan Çıkmadan Önce",
    "hazirlikZamani": "Birim Amiri İmzalı Görev Emri & Kilometre Seyir Defteri",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🏛️ Taşıt Kanunu m. 16 gereğince resmi araçlar görev emri olmaksızın özel işlerde veya tatil günlerinde kullanılamaz; yakalanması halinde TCK görevi kötüye kullanma suçu doğar.",
    "oncedenYapilacaklar": [
      "Resmi Taşıt Görev Emri formuna görevin konusu, gidilecek güzergah, şoför ve personel isimlerini tam yaz",
      "Harcama yetkilisi veya görevlendirmeye yetkili amirin ıslak/elektronik imzasını al",
      "Çıkış kilometre sayacını araç seyir defterine kaydedip araç takip sisteminin (GPS) aktif olduğunu doğrula",
      "Dönüşte varış saatini, yapılan kilometreyi ve kullanılan akaryakıt miktarını taşıt karnesine işlet"
    ]
  },
  {
    "id": "kamu_bilgi_edinme_hakki_kanunu_15_gun_cevap_suresi_4982",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "4982 sayılı bilgi edinme hakkı kanunu",
      "bilgi edinme 15 iş günü cevap",
      "diğer kurumdan bilgi alma 30 iş günü",
      "ticari sır ve gizlilik istisnası bilgi edinme",
      "bedeli mukabili bilgi edinme evrakı"
    ],
    "baslik": "4982 Sayılı Bilgi Edinme Kanunu: 15 İş Günü Yasal Cevap & İstisnalar",
    "ikon": "ℹ️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Vatandaş / Tüzel Kişi Başvurusu Kayda Girdiğinde",
    "hazirlikZamani": "Gelen Evrak Tarih Damgası & İlgili Şube Dosyası",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏛️ Bilgi edinme başvurularına kurumlar 15 iş günü içinde cevap vermek zorundadır; başka bir kurumdan görüş gerekiyorsa başvuru sahibine gerekçesiyle 30 iş gününe uzatıldığı bildirilir.",
    "oncedenYapilacaklar": [
      "Başvurunun kurumun görev alanına girip girmediğini kontrol et (alan dışı ise 3 iş gününde yetkili kuruma gönder)",
      "Talep edilen bilginin devlet sırrı, ticari sır veya kişisel veri (KVKK) istisnası kapsamında olup olmadığını hukuk birimiyle incele",
      "Hazırlanan bilgi ve belgeleri 15 iş günü dolmadan resmi yazı veya e-Devlet üzerinden başvuru sahibine tebliğ et",
      "Belge sureti verilecekse Maliye Bakanlığı tebliğinde belirtilen resmi sayfa başı çoğaltma ücreti makbuzunu tahsil et"
    ]
  },
  {
    "id": "kamu_fazla_calisma_ve_nobet_ucreti_bordro_hesabi",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "fazla çalışma ücreti bütçe kanunu",
      "memur nöbet ücreti hesaplama",
      "aylık azami fazla mesai saati",
      "fazla mesai puantaj cetveli memur",
      "resmi tatil nöbet katsayısı"
    ],
    "baslik": "Bütçe Kanunu K-Cetveli: Fazla Çalışma & Sağlık/İtfaiye Nöbet Ücreti Bordrosu",
    "ikon": "⏱️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Ayın 1'i ile 5'i Arasında Puantaj Kapanışında",
    "hazirlikZamani": "Islak İmzalı Nöbet Defteri & Kartlı Geçiş Puantaj Kayıtları",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🏛️ Bütçe Kanunu K-Cetvelinde memurun saat başı fazla çalışma ücreti sabittir; nöbet listesi amir onaylı olmalı, fazla çalışma karşılığı izin kullanılmamışsa bordroya yansıtılmalıdır.",
    "oncedenYapilacaklar": [
      "Personelin aylık fiili nöbet çizelgesini vardiya amiri imzalı nöbet defteriyle teyit et",
      "Yıllık Merkezi Yönetim Bütçe Kanunundaki geçerli saatlik fazla çalışma gösterge katsayısını uygula",
      "Dini bayram ve resmi tatil günlerindeki nöbet saatlerini artırımlı katsayı ile ayrı satırda göster",
      "Puantaj icmalini KBS ve MYS üzerinden maaş mutemetliğine ileterek tahakkuk müzekkeresine bağla"
    ]
  },
  {
    "id": "medya_profesyonel_ses_dublaj_adr_automated_dialogue",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "adr diyalog dublajı",
      "automated dialogue replacement",
      "ses stüdyosu senkron dublaj",
      "beeps 3 bip sesi kulaklık",
      "set sesini stüdyoda temizleme adr"
    ],
    "baslik": "Post Prodüksiyon: ADR (Automated Dialogue Replacement) Stüdyo Dublajı",
    "ikon": "🎙️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Kurgu Kilitlendikten (Picture Lock) Sonra",
    "hazirlikZamani": "ADR Cue Listesi, Zaman Kodlu Video & Geniş Diyafram Kondenser Mikrofon",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🎬 ADR seansında oyuncu kulaklığa gelen 3 bip sesinin ardından 4. vuruşta ekrandaki dudak hareketine tam senkron olarak diyalogu stüdyoda yeniden okur.",
    "oncedenYapilacaklar": [
      "Set sesinde gürültü veya rüzgar nedeniyle anlaşılamayan sahneleri belirleyip ADR Cue Sheet listesini çıkar",
      "Stüdyoda oyuncunun ağzına sette kullanılan shotgun/yaka mikrofonuna benzer karakterde mikrofon konumlandır",
      "Oyuncunun monitörüne sahneyi döngüye (loop) alıp kılavuz bip (beeps) sesleriyle dudak hareketini prova ettir",
      "Alınan temiz ses kayıtlarını Pro Tools üzerinde faz uyumu ve oda akustiği (reverb) eşleyerek mikse hazırla"
    ]
  },
  {
    "id": "medya_gorsel_efekt_vfx_kamera_hareket_takibi_camera_tracking",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "vfx matchmove kamera takibi",
      "3d camera tracking",
      "set survey lidar tarama vfx",
      "lens bozulması distorsiyon ızgarası grid",
      "chroma key yeşil perde takip noktaları markers"
    ],
    "baslik": "Görsel Efekt (VFX): Matchmove (3D Kamera Takibi) & Lens Distorsiyonu",
    "ikon": "🪄",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Yeşil Perde / Canlı Kamera Çekiminde",
    "hazirlikZamani": "Dama Tahtası Lens Izgarası (Grid) & Yeşil Perde Takip Noktaları",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🎬 CGI öğelerin canlı çekime tam oturması için setin gerçek kamera hareketi pikseller üzerinden çözülür; çekim öncesi lens ızgarası (lens grid) çekilmeden distorsiyon sıfırlanamaz.",
    "oncedenYapilacaklar": [
      "Kullanılan her bir sinema lensi için f/stop ve odak mesafesinde dama tahtası lens kalibrasyon kartını kaydet",
      "Yeşil perdenin üzerine kameranın paralaksını ölçecek zıt renkte bantla takip işaretleri (tracking markers) yerleştir",
      "Kameranın sensör boyutunu, odak uzaklığını (focal length) ve yerden yüksekliğini VFX veri föyüne yaz",
      "Matchmove yazılımında (Syntheyes / PFTrack) 3D kamera yolunu çözerek 3D sahneye sanal kamera olarak aktar"
    ]
  },
  {
    "id": "medya_canli_yayin_rejisi_genlock_ve_tally_isik_sistemi",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "canlı yayın genlock senkronizasyonu",
      "blackburst tri-level sync canlı yayın",
      "tally ışığı kırmızı yeşil reji",
      "görüntü mikseri sdi frame sync",
      "canlı yayın interkom sistemi trs"
    ],
    "baslik": "Çoklu Kamera Rejisi: Genlock (Frame Sync) & Tally Kamera İkaz Sistemi",
    "ikon": "📡",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Canlı Yayına / Maç Yayınına 2 Saat Kala",
    "hazirlikZamani": "Master Sync Jeneratörü & BNC Koaksiyel Kablolar",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🎬 Kameralar arasında Genlock olmazsa görüntü mikserinde kamera değiştirirken ekranda 1 kare siyah kırpışma (glitch) olur; tüm kameralar tek master jeneratöre kilitlenmelidir.",
    "oncedenYapilacaklar": [
      "Master Senkron Jeneratöründen çıkan Tri-Level Sync sinyalini koaksiyel kabloyla tüm stüdyo kameralarının Genlock girişine bağla",
      "Görüntü mikseri (Vision Mixer) menüsünden tüm girişlerin referansa kilitlendiğini (Locked) gör",
      "Kameramanların vizöründeki ve gövdesindeki Tally lambalarını test et (Kırmızı: Yayında / Yeşil: Önizlemede)",
      "Reji yönetmeni ile tüm kamera operatörleri ve ses teknisyeni arasındaki matrix interkom hattını doğrula"
    ]
  },
  {
    "id": "medya_radyo_televizyon_rtuk_yayin_standartlari_ve_gecikme",
    "category": "resmi",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "rtük canlı yayın 7 saniye geciktirici",
      "profanity delay sistemi",
      "rtük akıllı işaretler şiddet cinsellik",
      "yayın kayıt arşivi saklama 1 yıl",
      "ses seviyesi r128 loudness entegrasyonu"
    ],
    "baslik": "Yayıncılık Mevzuatı: RTÜK Canlı Yayın 7 Saniye Geciktirici & R128 Loudness",
    "ikon": "📺",
    "renk": "#FED7AA",
    "varsayilanZaman": "Canlı Yayına Çıkmadan Önce",
    "hazirlikZamani": "Donanımsal Profanity Delay Cihazı & Loudness İşlemcisi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🎬 6112 sayılı RTÜK Kanunu gereğince canlı yayınlarda küfür veya şiddeti engellemek için 7-10 saniye yayın geciktirici (Profanity Delay) düğmesi reji masasında hazır tutulur.",
    "oncedenYapilacaklar": [
      "Yayın çıkış hattındaki donanımsal geciktiriciyi (Delay) 7 saniye tampon belleğe alarak devreye sok",
      "Reji operatörünün önündeki \"Panic / Dump\" butonunu test et (basıldığında anında stüdyo jeneriğine veya plana kaçış)",
      "EBU R128 standartlarına göre entegre ses şiddetinin (Integrated Loudness) tam -23 LUFS (±0.5) olduğunu ses işlemcisinden sınırla",
      "Program başlangıcında ekrana uygun RTÜK Akıllı İşaret sembolünü (Genel İzleyici / 7+ / Şiddet) yerleştir"
    ]
  },
  {
    "id": "medya_muzik_produksiyonu_mastering_dither_ve_lufs_hedefi",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "mastering lufs standardı spotify",
      "-14 lufs entegre ses seviyesi",
      "true peak -1.0 dbfs kuralı",
      "bit derinliği düşürme dither gürültüsü",
      "intersample peak klipleme önleme"
    ],
    "baslik": "Ses Mühendisliği: Dijital Platform Mastering (-14 LUFS) & True-Peak",
    "ikon": "🎛️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Miks Onaylandıktan Sonra Nihai Çıktıda",
    "hazirlikZamani": "True-Peak Limiter & Loudness Ölçer Analizörü",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🎬 Spotify ve Apple Music -14 LUFS seviyesini aşan parçaları otomatik kısar; MP3/AAC dönüştürmesinde distorsiyonu önlemek için True-Peak azami -1.0 dBTP olmalıdır.",
    "oncedenYapilacaklar": [
      "Şarkının en dinamik ve en sakin bölümlerini tarayarak parça genelinde Entegre Loudness değerini -14 LUFS seviyesine limitle",
      "Oversampling özellikli True-Peak Limiter ile tepe tavanını (Ceiling) -1.0 dBTP olarak sabitle",
      "32-bit float miks projesini 16-bit / 44.1 kHz CD/streaming formatına indirirken kuantizasyon hatasını önlemek için TPDF Dither uygula",
      "Parçayı mono uyumluluk (faz korelasyonu) ve farklı kulaklık referanslarında dinleyerek tescil et"
    ]
  },
  {
    "id": "kuafor_sac_acma_oryal_persulfat_ve_folyo_isi_kontrolu",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "saç açıcı oryalle yakma",
      "amonyaksız açıcı persülfat",
      "folyoda aşırı ısınma reaksiyonu",
      "saçta kopma lastikleşme elastikiyet",
      "açıcı sonrası ph dengeleyici şampuan"
    ],
    "baslik": "Kolorimetri: Saç Açma (Oryal/Persülfat), Folyo Isısı & Lastikleşme",
    "ikon": "💇‍♀️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Platin / Röfle Açma İşlemi Sırasında",
    "hazirlikZamani": "Açıcı Toz, 20/30 Volüm Oksidan & Metalik Olmayan Plastik Kase",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "✂️ Folyonun içi el yakacak derecede ısınıyorsa saçın disülfit bağları parçalanıyor demektir; derhal folyo açılmalı, soğuk suyla yıkanıp bağ koruyucu (Plex) sıkılmalıdır.",
    "oncedenYapilacaklar": [
      "Açma işleminden önce saçın ucundan ıslatarak çekme (elastikiyet) testi yap; uzayıp geri dönmüyorsa oryal sürme",
      "20 veya 30 volüm oksidanı 1:2 oranında homojen karıştır (asla metal fırça/kase kullanma)",
      "Folyoları 10 dakikada bir elle kontrol ederek ekzotermik aşırı ısınma olup olmadığını yokla",
      "İstenen 9-10 ton açık sarı fonuna ulaşıldığında saçı bekletmeden asidik pH (4.5) arındırıcı şampuanla yıka"
    ]
  },
  {
    "id": "kuafor_lazer_epilasyon_fitzpatrick_cilt_tipi_ve_joule_ayari",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "fitzpatrick cilt tipi skalası",
      "alexandrite diyot lazer joule ayarı",
      "cilt tipine göre milisaniye darbe süresi",
      "lazer epilasyon yanığı önleme",
      "lazer başlığı safir soğutma -5 derece"
    ],
    "baslik": "Medikal Estetik: Fitzpatrick Cilt Tipi Skalası & Lazer Epilasyon Joule Ayarı",
    "ikon": "✨",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Seans Öncesi Cilt Analizinde",
    "hazirlikZamani": "Safir Soğutmalı Lazer Başlığı & Beyaz Ten Kalemi",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "✂️ Fitzpatrick Tip IV ve V koyu tenlerde yüksek Joule veya kısa Pulse verilirse epidermal melanin ışığı emip yanık yapar; koyu tende Diyot lazer ve uzun pulse (ms) seçilmelidir.",
    "oncedenYapilacaklar": [
      "Danışanın cilt ve kıl tipini Fitzpatrick skalasında (Tip I çok açık ten - Tip VI çok koyu ten) tespit et",
      "Vücuttaki koyu benlerin ve lekelerin üzerini lazer ışığını emmemesi için beyaz cerrahi kalemle kapat",
      "Safir soğutma başlığının sıcaklığının -4°C ile -8°C arasında olduğunu kontrol et",
      "Görünmeyen küçük bir alanda test atışı yaparak 5 dakika sonra ciltte eritem veya vezikül oluşumunu gözlemle"
    ]
  },
  {
    "id": "kuafor_kimyasal_peeling_glikolik_asit_ve_sodyum_bikarbonat",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "kimyasal peeling nötralizasyon",
      "glikolik asit %30 soyma",
      "frosting beyazlaşma reaksiyonu",
      "sodyum bikarbonat nötralizatör sprey",
      "peeling sonrası 50 faktör güneş kremi"
    ],
    "baslik": "Cilt Bakımı: Glikolik Asit (%30-50) Peeling & Nötralizasyon Protokolü",
    "ikon": "🧴",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Leke ve Akne İzi Cilt Protokolünde",
    "hazirlikZamani": "Asidik Peeling Solüsyonu, Kronometre & Nötralizatör Sprey",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "✂️ Glikolik asit kendiliğinden durmaz, nötralize edilmelidir; ciltte beyaz donma noktaları (frosting) görüldüğü an sodyum bikarbonatlı nötralizatör sıkılarak asit durdurulur.",
    "oncedenYapilacaklar": [
      "Göz çevresi ve dudak kenarlarına koruyucu vazelin sürerek asidin hassas mukozaya temasını engelle",
      "Yelpaze fırça ile asidi alın, yanaklar ve çene sırasıyla 20 saniye içinde homojen sür",
      "Kronometreyi 2 ila 4 dakikaya kurup hastanın yanma hissini (1-10 skalası) sürekli sorgula",
      "Süre dolduğunda veya ani kızarma başladığında bazik nötralizatör solüsyonunu bolca sıkarak asidi köpürtüp yıka"
    ]
  },
  {
    "id": "kuafor_keratin_bakimi_formaldehit_guvenligi_ve_pres_derecesi",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "keratin botoks duman tahliyesi",
      "formaldehitsiz keratin bakımı",
      "titanyum pres 230 derece keratin",
      "keratin dumanı emiş cihazı",
      "yanmış saçta keratin presi düşürme"
    ],
    "baslik": "Saç Terapisi: Keratin Bakımı, Duman Tahliyesi & 230°C Titanyum Pres",
    "ikon": "💆‍♀️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Saç Düzleştirme / Botoks Seansında",
    "hazirlikZamani": "Titanyum Dijital Düzleştirici Pres & Karbon Tarak",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "✂️ Keratin buharı solunum için toksiktir; işlem mutlaka nokta duman emiş aspiratörü altında yapılmalı, platin röfleli saçta pres ısısı 190°C'yi kesinlikle geçmemelidir.",
    "oncedenYapilacaklar": [
      "Ürünün Sağlık Bakanlığı onaylı ve formaldehitsiz sertifikalı olduğunu doğrula",
      "Saçı tuzsuz arındırıcı şampuanla 2 kez yıkayıp saç kütiküllerini tamamen aç",
      "Keratini saç diplerine 1 cm mesafe bırakarak çok ince tutamlara sür ve fazla ürünü ince dişli tarakla sıyır",
      "Doğal saçta 230°C, işlem görmüş yıpranmış saçta 190-200°C titanyum pres ile her tutamı 7-10 kez presle"
    ]
  },
  {
    "id": "kuafor_microblading_kil_teknigi_ve_altin_oran_pergel_olcum",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "microblading kıl tekniği kaş",
      "altın oran pergeli kaş tasarımı",
      "tek kullanımlık steril microblading bıçağı",
      "epidermis derinlik kontrolü kaş",
      "pigment renk değişimi grileşme önleme"
    ],
    "baslik": "Kalıcı Makyaj: Altın Oran Kaş Tasarımı & Microblading Epidermis Çizimi",
    "ikon": "✒️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Kaş Çizimi ve İşleme Öncesinde",
    "hazirlikZamani": "Altın Oran Pergeli, İpli Çizim Cetveli & Steril U-Bıçak (Blade)",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "✂️ Kesiler dermise kadar inerse boya yayılır ve gri-maviye döner; bıçak sadece üst epidermiste çıtırtı sesi duyulacak derinlikte ve kılın çıkış açısında çizilmelidir.",
    "oncedenYapilacaklar": [
      "Danışanın burun kanadı, göz bebeği ve göz pınarından kılavuz hatlar alarak altın oran pergeliyle simetrik çizim yap",
      "Yüzün mimiksiz ve dik pozisyonunda çizimi aynada danışana onaylat",
      "Paketinden yeni çıkarılan tek kullanımlık steril U-bıçağı tutucu kaleme kilitle",
      "Kişinin ten rengi alt tonuna (sıcak/soğuk) uygun pigmenti seçerek doğal kıl yönünde kesi kanallarına boyayı doyur"
    ]
  },
  {
    "id": "egitim_bep_bireysellestirilmis_egitim_programi_ve_ram_raporu",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "bep bireyselleştirilmiş eğitim programı",
      "ram özel eğitim değerlendirme kurulu raporu",
      "kaynaştırma bütünleştirme öğrencisi bep",
      "bep birimi toplantı tutanağı",
      "özel eğitim hizmetleri yönetmeliği bep"
    ],
    "baslik": "Özel Eğitim: BEP (Bireyselleştirilmiş Eğitim Programı) Geliştirme & RAM",
    "ikon": "🎓",
    "renk": "#FEF08A",
    "varsayilanZaman": "Eğitim Öğretim Yılının İlk Ayı İçinde (Ekim Başı)",
    "hazirlikZamani": "RAM Eğitsel Değerlendirme Raporu, Kaba Değerlendirme Formu & Ders Kazanım Listeleri",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏫 Özel Eğitim Hizmetleri Yönetmeliği m. 64 uyarınca kaynaştırma öğrencilerine okul BEP birimi tarafından ders bazında uyarlanmış yıllık BEP planı hazırlanması ve yazılı sınavların BEP'e göre yapılması zorunludur.",
    "oncedenYapilacaklar": [
      "Rehberlik ve Araştırma Merkezinden (RAM) gelen özel eğitim kararını ve öğrenci yetersizlik türünü incele",
      "Okul BEP Geliştirme Birimini (Müdür yardımcısı, rehber öğretmen, ders öğretmenleri ve veli) toplantıya çağır",
      "Öğrencinin mevcut performans düzeyine uygun kısa ve uzun dönemli kazanımları belirleyerek BEP planını imzala",
      "Yazılı sınavlarda öğrenciye bireyselleştirilmiş sınav kağıdı ve gerekirse ek süre / okuyucu-kodlayıcı desteği sağla"
    ]
  },
  {
    "id": "egitim_tubitak_2209_universite_ogrencileri_arastirma_projesi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "tübitak 2209-a üniversite projesi",
      "tübitak 2209-b sanayiye yönelik araştırma",
      "proje öneri formu iş paketleri gantt",
      "akademik danışman onay formu tübitak",
      "tübitak bideb proje bütçesi"
    ],
    "baslik": "Akademik Araştırma: TÜBİTAK 2209-A/B Üniversite Öğrenci Projesi Başvurusu",
    "ikon": "🔬",
    "renk": "#DDD6FE",
    "varsayilanZaman": "TÜBİTAK Çağrı Kapanış Tarihinden En Az 1 Hafta Önce",
    "hazirlikZamani": "Proje Öneri Metni, Literatür Özeti, Gantt İş-Zaman Çizelgesi & Danışman Onayı",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🎓 TÜBİTAK 2209 başvurularında özgün değer, yöntem ve yaygın etki bölümleri somut çıktılarla yazılmalı; BİDEB sistemi üzerinden akademik danışman e-İmzası süresinde tamamlanmalıdır.",
    "oncedenYapilacaklar": [
      "Projenin amacını, araştırma sorusunu ve literatürdeki boşluğu ortaya koyan özgün değer metnini yaz",
      "İş paketlerini (İP), risk yönetim tablosunu (B Planı) ve başarı ölçütlerini Gantt şemasıyla detaylandır",
      "Bütçe tablosunda talep edilen sarf malzeme, kırtasiye ve analiz giderlerini proforma faturalarla gerekçelendir",
      "TÜBİTAK BİDEB (TYBS) sistemine proje dosyasını yükleyip öğrenci ve danışman onayını tamamla"
    ]
  },
  {
    "id": "egitim_yoksis_akademik_tesvik_odenegi_puan_hesaplama",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "akademik teşvik ödeneği başvurusu",
      "yöksis yayın teşvik puanı",
      "sci ssci q1 q2 dergi makale puanı",
      "akademik teşvik komisyonu kararı",
      "uluslararası tebliğ atıf puanlama"
    ],
    "baslik": "Yükseköğretim: Akademik Teşvik Ödeneği Dosyası & YÖKSİS Puanlama",
    "ikon": "📚",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Her Yıl Ocak Ayının İlk 15 Günü İçinde",
    "hazirlikZamani": "Makale PDF Suretleri, WoS İndeks Belgeleri, Bildiri Kitapçıkları & Atıf Raporları",
    "hazirlikSaatOncesi": 72,
    "akilliFisilti": "🎓 Akademik Teşvik Yönetmeliği gereği bir takvim yılı içinde en az 30 teşvik puanı toplayan öğretim elemanları teşvik ödeneğine hak kazanır; makalelerin Q1-Q4 indeks kanıtları dosyalanmalıdır.",
    "oncedenYapilacaklar": [
      "YÖKSİS özgeçmiş sistemine bir önceki yıl yayımlanan tüm makale, kitap, bildiri ve patentleri işle",
      "Web of Science ve Scopus üzerinden derginin tarandığı indeks kanıtı ve Q çeyreklik dilim belgesini al",
      "YÖKSİS Akademik Teşvik Başvuru Çıktısını alarak her faaliyetin altına kanıtlayıcı belgeleri ekle",
      "Bölüm Akademik Teşvik Ön İnceleme Komisyonuna ıslak imzalı başvuru dosyasını teslim et"
    ]
  },
  {
    "id": "egitim_lgs_yks_sinav_guvenligi_ve_bina_sinav_komisyonu",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "lgs bina sınav komisyonu başkanı",
      "yks bina sınav sorumlusu bss",
      "sınav evrakı kurye teslim tutanağı",
      "sınav salonu saat 10.00 kuralı kimlik",
      "cevap kağıdı poşetleme güvenlik kilidi"
    ],
    "baslik": "Merkezi Sınavlar: LGS/YKS Bina Sınav Komisyonu & Evrak Güvenliği",
    "ikon": "🏫",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sınav Günü Sabahı (07:30 - 13:30)",
    "hazirlikZamani": "Bina Güvenlik Görevlileri, Salon Görevli Listeleri & Sınav Kilitli Çelik Kutuları",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏫 Merkezi sınavlarda bina sınav komisyonu saat 07:30'da sınav evrakını kuryeden mühürlü teslim alır; saat 10:00'dan sonra gelen hiçbir aday sınav binasına kesinlikle alınmaz.",
    "oncedenYapilacaklar": [
      "İlçe emniyet ve kurye eşliğinde mühürlü sınav soru kutularını tutanakla teslim alıp sınav odasında muhafaza et",
      "Salon başkanı ve gözetmenlerle sınav öncesi brifing yaparak kimlik kontrolü ve saat kurallarını hatırlat",
      "Sınav salonlarından toplanan cevap kağıdı dönüş zarflarını salon görevlileri huzurunda güvenlik kilidiyle mühürle",
      "Sınav bitiminde Bina Sınav Tutanağını imzalayarak evrak kutularını sınav nakil kuryesine teslim et"
    ]
  },
  {
    "id": "egitim_meb_ucretsiz_ders_kitabi_ve_tif_tasinir_kayitlari",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "meb ücretsiz ders kitabı teslimi",
      "taşınır işlem fişi tif ders kitabı",
      "tkys ders kitabı giriş çıkış",
      "kitap ihtiyacı modülü mebbis",
      "ders kitabı imha ve geri dönüşüm"
    ],
    "baslik": "Okul Yönetimi: MEB Ücretsiz Ders Kitabı Kabulü & TKYS Taşınır Kaydı",
    "ikon": "📦",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Ağustos Sonu / Eylül Başı (Eğitim Başlamadan Önce)",
    "hazirlikZamani": "MEBBİS Kitap İhtiyaç Listesi, Nakliye İrsaliyesi & Taşınır Kayıt Yetkilisi Şifresi",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🏫 Okula teslim edilen ücretsiz ders kitapları ders bazında fiziki sayılarak irsaliye kontrolü yapılmalı ve Taşınır Kayıt ve Yönetim Sistemi (TKYS) üzerinden TİF girişi yapılarak onaylanmalıdır.",
    "oncedenYapilacaklar": [
      "Dağıtım yüklenicisi tarafından okula getirilen kitap koli adetlerini MEBBİS norm öğrenci sayılarıyla karşılaştır",
      "Eksik veya hasarlı basılan kitaplar için yüklenici kuryesine teslim tutanağında şerh düş",
      "TKYS sistemi üzerinden \"150.08 Ders Kitapları\" hesabına Taşınır İşlem Fişi (TİF) girişi yap",
      "Eğitim öğretimin ilk günü her öğrencinin sırasına poşetlenmiş ders kitabı setini yerleştir"
    ]
  },
  {
    "id": "kamu_sayistay_sorgusu_savunma_ve_5018_kamu_zarari",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "sayıştay sorgusu savunma hazırlığı",
      "sayıştay denetim bulgusu tazmin",
      "kamu zararı 5018 sayılı kanun",
      "harcama yetkilisi sayıştay yazısı",
      "gerçekleştirme görevlisi savunma ilam"
    ],
    "baslik": "Kamu Mali Yönetimi: Sayıştay Denetim Sorgusu & 30 Günlük Savunma",
    "ikon": "🏛️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sayıştay Denetçisi Sorgu Kağıdının Tebliğinden İtibaren 30 Gün İçinde",
    "hazirlikZamani": "İhale İşlem Dosyası, Hakediş Raporları, MYS Ödeme Emirleri & Mevzuat Gerekçesi",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🏛️ Sayıştay sorgusuna tebliğden itibaren 30 gün içinde gerekçeli ve belgeli savunma verilmezse denetim bulgusu ilama dönüşür ve kamu zararı sorumlulardan şahsen tazmin edilir.",
    "oncedenYapilacaklar": [
      "Sayıştay denetçisi tarafından iddia edilen mevzuata aykırılık ve kamu zararı tutarını analiz et",
      "Ödemeye dayanak teşkil eden ihale onay belgesi, kabul komisyonu tutanakları ve piyasa araştırma evraklarını topla",
      "Harcama Yetkilisi ve Gerçekleştirme Görevlisi adına mevzuat maddelerine dayalı resmi savunma metnini hazırla",
      "EBYS üzerinden resmi üst yazı ile Sayıştay Başkanlığı Denetim Grup Başkanlığına savunma dosyasını sun"
    ]
  },
  {
    "id": "kamu_657_dmk_muhakkik_sorusturmasi_ve_7_gunluk_savunma",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "disiplin soruşturması muhakkik görevlendirme",
      "muhakkik ifade alma 7 günlük savunma",
      "657 sayılı kanun 125 disiplin raporu",
      "disiplin amiri soruşturma zamanaşımı",
      "devlet memuru disiplin cezası"
    ],
    "baslik": "Devlet Memurları Hukuku: 657 Muhakkik Disiplin Soruşturması & Savunma",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Muhakkik Tayin Edildiği Tarihten İtibaren 30 Gün İçinde",
    "hazirlikZamani": "Disiplin Emri, Şikayet Dilekçesi, Yeminli Zabıt Varakası & Savunma İstem Yazısı",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏛️ 657 sayılı DMK m. 130 gereğince memura 7 günden az olmamak üzere yazılı savunma hakkı tanınmadan disiplin cezası verilemez; savunma istem yazısında suç isnadı açıkça belirtilmelidir.",
    "oncedenYapilacaklar": [
      "Disiplin amiri tarafından verilen muhakkik görevlendirme yazısını tebellüğ ederek soruşturma dosyasını aç",
      "Müşteki, tanık ve ilgili personelin ifadelerini yeminli zabıt katibi refakatinde tutanağa geçir",
      "Hakkında soruşturma yürütülen memura isnat edilen fiilleri bildirerek en az 7 gün süreli yazılı savunma istem yazısı tebliğ et",
      "Soruşturma Raporunu tanzim edip 657 m. 125 kapsamında ceza teklifini disiplin amirine sun"
    ]
  },
  {
    "id": "kamu_ekap_ihale_komisyon_karari_ve_10_gunluk_itiraz_askisi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "ekap ihale komisyon kararı kesinleşme",
      "ekap üzerinden ihale kararı tebliğ",
      "kik payı ve sözleşmeye davet 10 gün",
      "ihalelere yönelik başvurular şikayet süresi",
      "4734 sayılı kamu ihale kanunu"
    ],
    "baslik": "Kamu İhale Hukuku: EKAP İhale Komisyon Kararı Onayı & 10 Günlük Askı",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İhale Kararı Alındıktan Sonraki 3 İş Günü İçinde",
    "hazirlikZamani": "İhale Komisyonu Karar Tutanağı, EKAP e-İmza Tokenı & Yaklaşık Maliyet Cetveli",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🏛️ 4734 sayılı KİK uyarınca ihale kararı harcama yetkilisince onaylandıktan sonra EKAP'tan tüm isteklilere tebliğ edilir; 10 günlük yasal itiraz süresi dolmadan sözleşme imzalanamaz.",
    "oncedenYapilacaklar": [
      "İhale komisyonu kararını Harcama Yetkilisinin nitelikli e-İmzası ile EKAP üzerinden onayla",
      "Geçerli ve elenen tüm teklif sahiplerine kesinleşen ihale kararını aynı gün EKAP bildirimiyle tebliğ et",
      "İdareye şikayet ve KİK'e itirazen şikayet için tanınan 10 günlük yasal bekleme (standstill) süresini başlat",
      "Süre bitiminde şikayet yoksa ekonomik açıdan en avantajlı teklif sahibini 10 gün içinde sözleşmeye davet et"
    ]
  },
  {
    "id": "kamu_3628_sayili_kanun_genel_ve_ek_mal_bildirimi_beyani",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "mal bildirimi beyannamesi 0 ve 5 yıllar",
      "genel mal bildirimi formu tebliğ memur",
      "3628 sayılı rüşvet ve yolsuzluk beyan",
      "ek mal bildirimi 1 ay içinde artış",
      "kapalı zarf mal bildirimi özlük"
    ],
    "baslik": "3628 Sayılı Kanun: Genel Mal Bildirimi & Taşınmaz/Araç Ek Mal Beyanı",
    "ikon": "📂",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Sonu (0) ve (5) ile Biten Yılların Şubat Ayı Sonu / Mal İktisabından İtibaren 1 Ay",
    "hazirlikZamani": "Mal Bildirimi Formu, Tapu/Ruhsat Suretleri & Kapalı İmzalı Beyan Zarfı",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏛️ 3628 sayılı Kanun uyarınca memurlar sonu 0 ve 5 ile biten yıllarda genel mal beyanı verir; net maaşın 5 katını aşan taşınmaz veya araç alımlarında 1 ay içinde ek bildirim zorunludur.",
    "oncedenYapilacaklar": [
      "Genel beyan döneminde tüm personelden kapalı mühürlü zarf içinde Mal Bildirimi Formunu topla",
      "Yıl içinde gayrimenkul veya sıfır/ikinci el araç satın alan memurun 1 ay içinde ek mal bildirimi verip vermediğini denetle",
      "Kapalı zarfları açmadan özlük birimindeki çelik arşiv dolabında gizlilik dereceli olarak muhafaza et",
      "Süresinde beyanda bulunmayan memurlar hakkında adli ve disiplin soruşturması başlatılmak üzere amire bilgi ver"
    ]
  },
  {
    "id": "kamu_darphane_resmi_muhur_berati_ve_devir_teslim_tutanagi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "resmi mühür beratı devir teslim tutanağı",
      "darphane resmi mühür zimmet",
      "resmi mühür kaybolma zabıt ilanı",
      "kurum değişikliği mühür teslim",
      "resmi mühür yönetmeliği"
    ],
    "baslik": "Resmi Mühür Yönetmeliği: Darphane Mühür Beratı & Devir-Teslim Tutanağı",
    "ikon": "📜",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Birim Amiri / Müdür Değişikliği Gününde",
    "hazirlikZamani": "Darphane Resmi Mühür Beratı, Mühür Mum/Mürekkep Örneği & Zimmet Defteri",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏛️ Resmi Mühür Yönetmeliği uyarınca Darphane tarafından verilen resmi mühürler sadece berat sahibi amirce kullanılır; görev devrinde mühür baskı örneği alınarak devir tutanağı imzalanır.",
    "oncedenYapilacaklar": [
      "Darphane ve Damga Matbaası Genel Müdürlüğünce tanzim edilen Mühür Beratının aslı ile mührü karşılaştır",
      "Mührün net baskı örneğini temiz beyaz kağıda çıkartarak devir teslim tutanağına iliştir",
      "Görevi devreden ve devralan harcama yetkililerinin imzalarıyla Mühür Zimmet Defterini onayla",
      "Mührün kaybolması veya deforme olması halinde derhal Valiliğe ve Darphane Genel Müdürlüğüne bildirim yap"
    ]
  },
  {
    "id": "sanat_5846_fsek_mali_hak_devir_ve_lisans_sozlesmesi",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "fsek telif hakkı devir sözleşmesi",
      "mali hakların devri sözleşme fsek 52",
      "işlenme çoğaltma yayma temsil devir",
      "eser sahibi telif feragatname",
      "fsek mali haklar lisanslama"
    ],
    "baslik": "Fikri Mülkiyet: 5846 FSEK Madde 52 Mali Hak Devir & Lisans Sözleşmesi",
    "ikon": "🖋️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Eser Üretimi Öncesinde ve Telif Ödemesi Aşamasında",
    "hazirlikZamani": "FSEK Uyumlu Telif Devir Sözleşmesi Taslağı, Eser Örneği & Kimlik/Vergi Levhası",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🎬 5846 sayılı FSEK m. 52 uyarınca mali hakların devrinde işleme, çoğaltma, yayma, temsil ve dijital iletim hakları sözleşmede TEK TEK sayılmalıdır; genel devirler geçersizdir.",
    "oncedenYapilacaklar": [
      "Sözleşme metnine devredilen mali hakları (İşleme m. 21, Çoğaltma m. 22, Yayma m. 23, Temsil m. 24) ayrı fıkralar halinde yaz",
      "Mali hakkın yer, süre ve sayı yönünden sınırlarını (Dünya çapında, 70 yıllık yasal koruma süresince) belirle",
      "Eser sahibinin manevi haklarının (Adın belirtilmesi ve eserde değişiklik yapılmasını menetme) saklı olduğunu vurgula",
      "Telif bedeli ve stopaj/KDV kesintisini belirleyip tarafların ıslak imzalı sözleşmesini arşivle"
    ]
  },
  {
    "id": "sanat_ebu_r128_yayincilik_ses_loudness_kalibrasyonu_23lufs",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "canlı yayın ebu r128 ses loudness lufs",
      "entegre loudness -23 lufs yayın standardı",
      "true peak -1 dbfs ses limiti",
      "ses masası loudness desibel ayarı",
      "rtük ses seviyesi standardı"
    ],
    "baslik": "Yayıncılık Standardı: EBU R128 (-23 LUFS) Entegre Loudness & True Peak",
    "ikon": "🎛️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Canlı Yayın / Master Render ve Yayın Öncesi Kalibrasyonda",
    "hazirlikZamani": "EBU R128 Uyumlu Loudness Metre Eklentisi (TC Electronic / Waves WLM) & Ses Masası",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🎬 RTÜK ve Avrupa Yayın Birliği (EBU R128) standardına göre TV yayınlarında Entegre Ses Şiddeti -23.0 LUFS (+/- 0.5 LU) ve Maksimum True Peak -1.0 dBTP olmak zorundadır.",
    "oncedenYapilacaklar": [
      "Ana yayın miks çıkışına (Master Bus) EBU R128 kalibre loudness ölçüm analizörünü yerleştir",
      "Program boyunca entegre loudness değerinin -23.0 LUFS seviyesinde dengelendiğini izle",
      "Dinamik aralık sıkıştırması (Loudness Range - LRA) limitini TV için 10-14 LU aralığında tut",
      "Reklam ve program geçişlerinde anlık ses patlamalarını önlemek için True Peak Limiter eşiğini -1.0 dBTP'ye kilitle"
    ]
  },
  {
    "id": "sanat_konser_festival_teknik_rider_ve_foh_backline_plani",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "konser rider teknik gereksinimler",
      "sanatçı rider sahne foh monitör",
      "backline gereksinimleri ve psm kulak içi",
      "teknik rider truss ışık planı",
      "ses ışık sahne organizasyon rider"
    ],
    "baslik": "Canlı Etkinlik: Sanatçı Teknik Rider, FOH Mikser Kanal Listesi & Backline",
    "ikon": "🎸",
    "renk": "#FED7AA",
    "varsayilanZaman": "Konserden En Az 1 Hafta Önce & Soundcheck Günü",
    "hazirlikZamani": "Sanatçı Teknik & Kulis Riderı, Stage Plot (Sahne Yerleşimi) & Patch List",
    "hazirlikSaatOncesi": 8,
    "akilliFisilti": "🎬 Teknik rider sanatçı sözleşmesinin ayrılmaz ekidir; FOH dijital mikser markası, IEM kablosuz kulaklık frekansları ve talep edilen amfiler eksiksiz sağlanmalıdır.",
    "oncedenYapilacaklar": [
      "Grubun Input List (Kanal Giriş Listesi) ve Stage Plot krokisini sahne ses teknisyenine ilet",
      "Kablosuz mikrofon ve In-Ear Monitor (IEM) vericileri için yerel frekans spektrum taraması (RF scan) yap",
      "Backline davul kiti, lambalı gitar amfileri ve bas kabinlerinin rider markalarıyla birebir olduğunu doğrula",
      "Soundcheck saatinde FOH ve sahne monitör mikslerini tamamlayarak sahne elektrik besleme jeneratörünü kilitle"
    ]
  },
  {
    "id": "sanat_sinema_dci_dcp_master_paketleme_ve_sifreli_kdm_anahtari",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "sinema dcp master kdm anahtarı",
      "dcp paketleme 24 fps dci renk",
      "vizyon salon kdm lisans anahtarı",
      "sinema projektörü dcp yükleme",
      "dci smpte uyumlu sinema paketi"
    ],
    "baslik": "Sinema Post-Prodüksiyon: DCI Uyumlu DCP Master Paketleme & KDM Anahtarı",
    "ikon": "🎬",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Vizyon Tarihinden 3 Gün Önce (Salon Test Gösteriminde)",
    "hazirlikZamani": "DCI Standartlarında DCI/SMPTE DCP Paketi, Salon Sunucu Sertifikaları (pem) & KDM Yazılımı",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🎬 DCP sinema paketleri DCI renk uzayında (XYZ 12-bit) 24 fps taranır; şifreli filmler için vizyona girecek her salon projektörünün sunucu sertifikasına özel KDM vizyon anahtarı üretilir.",
    "oncedenYapilacaklar": [
      "Filmin 2K/4K DCI Flat veya Scope çözünürlükte JPEG 2000 resim ve 5.1/7.1 24-bit 48kHz ses DCP paketlemesini bitir",
      "Sinema salonunun DOREMI / Dolby / GDC sunucu sertifikasını (.pem) sisteme yükle",
      "Vizyon başlangıç ve bitiş saatini (UTC zaman diliminde) tanımlayarak şifreli KDM XML anahtarını üret",
      "KDM dosyasını salona e-posta ile ulaştırarak sinema projektöründe test oynatımını teyit ettir"
    ]
  },
  {
    "id": "sanat_kultur_bakanligi_isbn_ve_matbaa_bandrol_basvurusu",
    "category": "resmi",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "kitap bandrol başvurusu kültür bakanlığı",
      "telif hakları genel müdürlüğü bandrol",
      "isbn barkod ve matbaa sertifikası",
      "yeni baskı bandrol yapıştırma tutanağı",
      "yayıncı sertifikası bandrol sistemi"
    ],
    "baslik": "Yayıncılık Hukuku: Telif Hakları Genel Müdürlüğü ISBN & Bandrol Alımı",
    "ikon": "📚",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kitap Matbaada Baskıya Girmeden Önce",
    "hazirlikZamani": "Yayıncı Sertifikası, Matbaa Sertifikası, Telif Sözleşmesi & ISBN Tahsis Belgesi",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🎬 FSEK m. 81 gereğince bandrolsüz kitap basılması veya satılması doğrudan korsan yayın suçudur; bandrol başvurusu matbaanın sertifika numarası ve baskı adediyle yapılır.",
    "oncedenYapilacaklar": [
      "Kütüphaneler ve Yayımlar Genel Müdürlüğünden esere özel ISBN tahsisini al ve arka kapak barkodunu oluştur",
      "Telif Hakları Otomasyon Sistemi (THES) üzerinden matbaa sertifikasını seçerek baskı adedi kadar bandrol talebi aç",
      "Kültür ve Turizm Bakanlığı Döner Sermaye bandrol harcını yatırıp İl Kültür Müdürlüğünden bandrolleri teslim al",
      "Matbaada basılan her kitabın arka kapağına veya iç kapak sayfasına bandrollerin yapıştırılmasını denetle"
    ]
  },
  {
    "id": "estetik_fitzpatrick_cilt_fototipi_ve_lazer_dalga_boyu_secimi",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "lazer epilasyon fitzpatrick cilt tipi",
      "fitzpatrick tip 4 joule ayarı",
      "alexandrite ndyag dalga boyu seçimi",
      "lazer atım öncesi spot testi",
      "lazer epilasyon yanık riski"
    ],
    "baslik": "Medikal Estetik: Fitzpatrick Cilt Fototipi, Lazer Enerji Kalibrasyonu & Spot Test",
    "ikon": "✨",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İlk Seans Öncesi Konsültasyonda",
    "hazirlikZamani": "Fitzpatrick Skala Formu, Soğutucu Gaz Başlığı & Kalibre Lazer Cihazı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "✨ Fitzpatrick Tip IV ve üzeri koyu tenlerde 755nm Alexandrite lazer epidermal yanık ve leke (PIH) riski yaratır; bu ciltlerde 1064nm Nd:YAG dalga boyu seçilmeli ve önce spot test yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Danışanın güneşlenme geçmişi ve ten/kıl rengine göre Fitzpatrick cilt tipini (Tip I - VI) belirle",
      "Bronzlaşmış veya koyu tenli bölgelerde Nd:YAG veya Diode lazer parametrelerini joule ve milisaniye olarak ayarla",
      "Görünmeyen küçük bir alana tek atış (spot test) yaparak 15 dakika boyunca eritem ve ödem tepkisini izle",
      "Uygulama esnasında kontak soğutucu başlığı aktif tutarak epidermisi termal hasara karşı koru"
    ]
  },
  {
    "id": "estetik_disulfit_bag_koruyucu_ile_platin_sari_sac_acma",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "saç açma olaplex bond multiplier",
      "platin sarı açıcı volüm 20 30",
      "disülfit bağ koruyucu saç açma",
      "lastikleşme saç elastikiyet testi",
      "küllü sarı tonlama cila formülü"
    ],
    "baslik": "Kuaförlük & Saç: Disülfit Bağ Koruyucu (Bond Multiplier) & Platin Açma",
    "ikon": "💇‍♀️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Röfle / Ombre / Platin Sarı Renk Değişiminde",
    "hazirlikZamani": "Toz Açıcı (Bleach), 20/30 Volüm Oksidan, Bağ Koruyucu (No.1) & pH Dengeleyici Cila",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "✨ Yıpranmış saçlarda yüksek volüm oksidan kullanımı saçın korteksindeki disülfit bağlarını kopararak lastikleşmeye yol açar; açıcı harcına mutlaka bağ koruyucu katılmalıdır.",
    "oncedenYapilacaklar": [
      "Saç tutamına ıslak çekme elastikiyet testi uygulayarak gözeneklilik ve yıpranma derecesini ölç",
      "Açıcı karışıma üretici oranında Disülfit Bağ Koruyucu (Bond Multiplier) ekleyip homojen çırp",
      "Folyo aralarını her 10 dakikada bir kontrol ederek açılma tonunu (Seviye 9-10) izle",
      "Maksimum 45 dakika sonra saçı durulayıp sarı yansımaları nötralize eden asidik cila ile tonlama yap"
    ]
  },
  {
    "id": "estetik_kombi_kuru_manikur_freze_ve_apex_bombesi_polijel",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "protez tırnak kombi manikür freze",
      "elmas freze ucu kütikül temizliği",
      "tırnak apex bombesi polijel",
      "uv led kurutucu 60 saniye tırnak",
      "kalıcı oje tırnak bazı dehidrator"
    ],
    "baslik": "Protez Tırnak: Rus Kombi Manikür, Elmas Freze & Apex Mimarisi",
    "ikon": "💅",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Protez Tırnak / Kalıcı Oje Seansında",
    "hazirlikZamani": "Alev/Küre Uçlu Elmas Frezeler, Kombi Manikür Makası, Dehidratör, Primer & Polijel",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "✨ Tırnağın stres noktasına (merkez 1/3) Apex bombesi verilmezse protez tırnak en ufak darbede yataktan kırılarak doğal tırnağa zarar verir; freze ucu tırnak matrisine asla dik tutulmamalıdır.",
    "oncedenYapilacaklar": [
      "Alev uçlu elmas freze ile kütikül cebini kaldırıp kombi makasla ölü deriyi tek hat halinde kes",
      "Tırnak yüzeyini hafifçe matlaştırıp Dehidratör ve Asitsiz Primer ile yağdan arındır",
      "Kauçuk baz sürdükten sonra polijel ile tırnağın ağırlık merkezine doğal kavis (Apex) ver",
      "48W UV/LED lambada 60 saniye polimerize ederek formunu sabitle ve törpüyle simetri sağla"
    ]
  },
  {
    "id": "estetik_kimyasal_peeling_tca_frosting_ve_bazik_notralizasyon",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "kimyasal peeling tca noblans nötralizasyon",
      "glikolik asit salisilik asit peeling",
      "frosting beyazlaşma tca peeling",
      "peeling sonrası sodyum bikarbonat nötral",
      "kimyasal peeling güneş koruma spf50"
    ],
    "baslik": "Cilt Bakımı: Kimyasal Peeling (AHA/BHA/TCA), Frosting & Nötralizasyon",
    "ikon": "🧴",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Akne Skarları / Leke Tedavisi Seansında (Kış Aylarında)",
    "hazirlikZamani": "Pre-Peel Solüsyonu, %20-30 Asit Solüsyonu, Bazik Nötralizatör & Soğuk Kompres",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "✨ Kimyasal peelingte ciltte beyazlaşma (Frosting) görüldüğü an protein koagülasyonu başlamıştır; derin yanığı önlemek için anında bazik nötralizasyon solüsyonu sıkılarak asit durdurulmalıdır.",
    "oncedenYapilacaklar": [
      "Cildi pre-peel solüsyonu ile arındırıp dudak ve göz çevresine vazelin bariyer sür",
      "Glikolik veya Salisilik asidi yelpaze fırçayla eşit yayarak ciltteki eritem ve frosting reaksiyonunu kronometreyle izle",
      "Hedeflenen sürede (2-4 dakika) sodyum bikarbonatlı nötralizatör sıkarak asit reaksiyonunu tamamen sıfırla",
      "Cilde yatıştırıcı hyaluronik maske uygulayıp danışana SPF 50+ mineral güneş kremi zorunluluğunu tembihle"
    ]
  },
  {
    "id": "estetik_b_tipi_otoklav_sterilizasyon_ve_sinif4_indikator",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "otoklav pens sterilizasyon indikatör şerit",
      "güzellik salonu pens cımbız sterilizasyon",
      "134 derece b tipi otoklav paketleme",
      "sterilizasyon rulosu renk değişimi",
      "hepatit b çapraz bulaşma sterilizasyon"
    ],
    "baslik": "Hijyen Standartları: B Tipi Medikal Otoklavda 134°C Pens Sterilizasyonu",
    "ikon": "🧼",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Müşteri Sonrası ve Gün Sonu Kapanışında",
    "hazirlikZamani": "Ultrasonik Yıkama Banyosu, Medikal Kraft Poşetleri, Isı Yapıştırma & B Tipi Otoklav",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "✨ Pens ve makasların sadece alkole batırılması Hepatit B ve mantar sporlarını öldürmez; aletler medikal poşetlerde Sınıf 4 indikatörle 134°C B Tipi otoklavda steril edilmelidir.",
    "oncedenYapilacaklar": [
      "Kullanılan çelik pens, makas ve freze uçlarını enzimatik dezenfektanlı ultrasonik banyoda 15 dk yıka",
      "Aletleri kurulayıp medikal kraft sterilizasyon poşetine koy ve içine Sınıf 4 kimyasal indikatör şerit yerleştir",
      "Poşet ağzını ısı yapıştırma cihazıyla hava almayacak şekilde kapat",
      "B Tipi otoklavda 134°C sıcaklık ve 2.1 bar buhar basıncında 18 dakika sterilize ederek indikatör renk dönüşümünü teyit et"
    ]
  },
  {
    "id": "egitim_dys_resmi_yazi_sureli",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "dys resmi yazı",
      "günlü yazı cevap",
      "ilçe mem süre",
      "resmi yazışma dys"
    ],
    "baslik": "MEB DYS Süreli/Günlü Resmi Yazı Cevabı",
    "ikon": "📋",
    "renk": "#FEF08A",
    "varsayilanZaman": "Belirtilen Gün Saat 15:00",
    "akilliFisilti": "📚 Günlü resmi yazılarda yasal cevap süresi aşılmadan DYS üzerinden desimal dosya kodlu cevap iletilir.",
    "oncedenYapilacaklar": [
      "Gelen yazının sayı, tarih, ilgi ve yasal cevap verme süresini (İvedi/Günlü) not et",
      "Okul idaresi veya zümre öğretmenlerinden talep edilen sayısal veri/öğrenci bilgilerini topla",
      "Standart Dosya Planı (SDP) kodunu seçerek resmi yazı şablonunu DYS ortamında tanzim et",
      "Müdür yardımcısı parafı ve okul müdürü e-İmzası ile İlçe Milli Eğitim Müdürlüğüne sevk et"
    ]
  },
  {
    "id": "egitim_rehberlik_bap_yonlendirme",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "rehberlik yönlendirme",
      "ram sevk formu",
      "bep yönlendirme",
      "özel eğitim inceleme"
    ],
    "baslik": "MEB RAM Eğitsel Değerlendirme & Sevk Formu",
    "ikon": "🏫",
    "renk": "#FEF08A",
    "varsayilanZaman": "Kurul Kararı Sonrası 3 Gün",
    "akilliFisilti": "📚 RAM eğitsel değerlendirme isteğinde sınıf öğretmeni ve okul rehberlik servisinin ayrıntılı gözlem formu şarttır.",
    "oncedenYapilacaklar": [
      "Sınıf öğretmeninden öğrencinin akademik ve sosyal gelişimine ilişkin \"Eğitsel Değerlendirme İstek Formu\"nu al",
      "Okul Rehberlik ve Psikolojik Danışma Servisi görüşme ve test raporlarını dosyaya ekle",
      "Veli bilgilendirme ve onay tutanağını ıslak imzalı olarak tanzim et",
      "MEBBİS RAM modülü üzerinden resmi randevu başvurusu oluşturup evrakı kapalı zarf/DYS ile RAM’a ilet"
    ]
  },
  {
    "id": "egitim_ogretmen_ekders_kbs_kesinti",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "kbs ek ders",
      "ek ders puantajı",
      "öğretmen rapor kesintisi",
      "dyk ek ders"
    ],
    "baslik": "Aylık KBS Ek Ders Puantajı & Kesinti Hesaplama",
    "ikon": "📊",
    "renk": "#FEF08A",
    "varsayilanZaman": "Her Ayın 20-24’ü Arası",
    "akilliFisilti": "📚 Öğretmen ek ders puantajında sevkli/raporlu günler, nöbet ücretleri ve DYK çarpanları KBS’ye girilir.",
    "oncedenYapilacaklar": [
      "Aylık ders defterleri, nöbet çizelgeleri ve kulüp/rehberlik faaliyetlerini puantaj föyüyle karşılaştır",
      "Hastalık raporu alan, idari izinli olan veya sınav görevi çıkan öğretmenlerin ders kesintilerini düş",
      "DYK (Destekleme ve Yetiştirme Kursu) ders saatlerini %100 artırımlı katsayı ile hesapla",
      "KBS sistemine veri girişini tamamlayıp okul müdürü ve Malmüdürlüğü onayına sun"
    ]
  },
  {
    "id": "egitim_lise_ogrenci_disiplin_savunma",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "öğrenci disiplin kurulu",
      "disiplin savunma istemi",
      "ortaöğretim disiplin",
      "disiplin cezası itiraz"
    ],
    "baslik": "MEB Ortaöğretim Disiplin Kurulu Süreci",
    "ikon": "⚖️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Olaydan İtibaren 3 İş Günü",
    "akilliFisilti": "📚 Disiplin soruşturmasında öğrenciye en az 3 iş günü süre verilerek yazılı savunma hakkı tanınmalıdır.",
    "oncedenYapilacaklar": [
      "Nöbetçi öğretmen tutanağını, tanık öğrenci beyanlarını ve varsa kamera kayıtlarını incele",
      "Öğrenciye ve velisine isnat edilen fiili açıkça belirten \"Yazılı Savunma İstemi Tebligatı\"nı tebliğ et",
      "Rehberlik servisinden öğrencinin genel psikososyal durumunu içeren değerlendirme raporu talep et",
      "Disiplin Kurulu toplantısında karar verip kararı gerekçesiyle birlikte veliye ve İlçe Disiplin Kuruluna bildir"
    ]
  },
  {
    "id": "egitim_universite_tez_savunma_jurisi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "tez savunma sınavı",
      "yüksek lisans tez jürisi",
      "doktora jüri tutanağı",
      "enstitü tez teslim"
    ],
    "baslik": "Lisansüstü Tez Savunma Jürisi & Tutanak",
    "ikon": "🎓",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Sınavdan 1 Ay Önce / Sınav Günü",
    "akilliFisilti": "🎓 Tez savunma sınavı tutanağı ve intihal raporu sınav bitiminde enstitüye 3 gün içinde teslim edilir.",
    "oncedenYapilacaklar": [
      "Turnitin/iThenticate intihal benzerlik raporunun azami enstitü sınırının (%20) altında olduğunu doğrula",
      "Enstitü Yönetim Kurulu onaylı jüri üyelerine tezin basılı/dijital nüshalarını en az 15 gün önce ulaştır",
      "Sınav salonunda tez savunma tutanağı, oy birliği/oy çokluğu formları ve kişisel değerlendirme raporlarını hazır bulundur",
      "Başarılı/düzeltme kararını ıslak imzalı jüri tutanağı ile birlikte 3 iş günü içinde Enstitü Sekreterliğine teslim et"
    ]
  },
  {
    "id": "kamu_cimer_basvuru_3071_yasal_cevap",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "cimer cevap yazısı",
      "3071 dilekçe hakkı",
      "cimer yasal süre 30 gün",
      "bilgi edinme kanunu 4982"
    ],
    "baslik": "CİMER & 4982 Bilgi Edinme Başvurusu Yasal Cevabı",
    "ikon": "🏛️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "15 / 30 Günlük Yasal Süre",
    "akilliFisilti": "🏛️ CİMER başvurularına en geç 30 gün, Bilgi Edinme başvurularına ise 15 iş günü içinde gerekçeli cevap verilir.",
    "oncedenYapilacaklar": [
      "CİMER sistemi üzerinden gelen vatandaş başvurusunu ilgili şube müdürlüğü ve uzmana zimmetle",
      "Talep edilen bilgi/belgenin ticari sır, kişisel veri (KVKK) veya yargıya intikal etmiş konu olup olmadığını denetle",
      "Mevzuata uygun, net ve resmi üsluplu cevap taslağını Standart Dosya Planı koduyla hazırla",
      "Harcama yetkilisi / Kurum amiri onayından sonra cevabı CİMER portalına yükleyerek kaydı kapat"
    ]
  },
  {
    "id": "kamu_tkys_tasinir_hurda_dusum_komisyonu",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "tkys hurdaya ayırma",
      "taşınır terkin tutanağı",
      "hurda komisyon kararı",
      "demirbaş kayıttan düşme"
    ],
    "baslik": "TKYS Taşınır Mal Hurdaya Ayırma & Terkin Komisyonu",
    "ikon": "🗂️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Yıl Sonu / İhtiyaç Halinde",
    "akilliFisilti": "🏛️ Kullanılamaz hale gelen kamu demirbaşları en az 3 kişilik komisyon tutanağı ve harcama yetkilisi onayıyla kayıttan düşülür.",
    "oncedenYapilacaklar": [
      "Ekonomik ömrünü tamamlamış veya tamiri mümkün olmayan cihazlar için teknik servis \"Onarılamaz Raporu\" al",
      "Taşınır Kayıt ve Kontrol Yetkilisi koordinasyonunda 3 kişilik \"Taşınır Değerleme ve Hurda Komisyonu\" oluştur",
      "TKYS üzerinden \"Taşınır Kayıttan Düşme Teklif ve Onay Tutanağı\"nı düzenle",
      "Harcama Yetkilisinin onayından sonra Taşınır İşlem Fişi (TİF) keserek demirbaşı MKE Hurda İşletmesine sevk et veya imha et"
    ]
  },
  {
    "id": "kamu_ihale_yaklasik_maliyet_piyasa_fiyat",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "yaklaşık maliyet hesabı",
      "piyasa fiyat araştırması",
      "ihale onay belgesi",
      "kik yaklaşık maliyet"
    ],
    "baslik": "4734 Sayılı KİK Yaklaşık Maliyet & Piyasa Fiyat Araştırması",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İhale İlanından Önce",
    "akilliFisilti": "🏛️ Yaklaşık maliyet gizlidir; piyasa teklif mektupları, resmi birim fiyatlar ve TÜFE endeksiyle aritmetik hesaplanır.",
    "oncedenYapilacaklar": [
      "Teknik şartnameyi hazırlayıp en az 3 farklı yetkili firmaya resmi kaşeli proforma fatura/fiyat isteme yazısı gönder",
      "Varsa Çevre ve Şehircilik Bakanlığı veya DMO resmi birim fiyat rayiçlerini araştırmaya dahil et",
      "Tekliflerin aritmetik ortalamasını alarak KDV hariç \"Yaklaşık Maliyet Hesap Cetveli\"ni oluştur ve mühürlü zarfa koy",
      "Harcama yetkilisinden \"İhale Onay Belgesi\"ni (Piyasa Fiyat Araştırma Tutanağı ekli) imzalat"
    ]
  },
  {
    "id": "kamu_memur_adaylik_kaldirma_asli_memurluk",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "aday memurluk eğitimi",
      "adaylık kaldırma teklifi",
      "657 aday memur yemin",
      "asli memurluğa atanma"
    ],
    "baslik": "657 Sayılı Kanun Aday Memurluk Eğitimi & Asli Memurluğa Atanma",
    "ikon": "🖋️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "1. Yılın Sonunda (Max 2 Yıl)",
    "akilliFisilti": "🏛️ Adaylık süresi 1 yıldan az 2 yıldan çok olamaz; Temel ve Hazırlayıcı Eğitim sınavında en az 60 puan şarttır.",
    "oncedenYapilacaklar": [
      "Aday memurun Temel Eğitim ve Hazırlayıcı Eğitim sınav sonuç belgelerini ve staj değerlendirme notunu toparla",
      "Birim amirinden aday memur hakkında olumlu \"Adaylık Dönemi Değerlendirme Belgesi\"ni al",
      "Disiplin cezası almadığını ve süresini tamamladığını teyit ederek Atamaya Yetkili Amir onayına sun",
      "Yemin merasimi düzenleyerek \"Yemin Belgesi\"ni imzalatıp memurun özlük dosyasına kaldır"
    ]
  },
  {
    "id": "kamu_sayistay_harcama_evraki_arsiv",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "harcama pusulası kamu",
      "mys ödeme emri belgesi",
      "sayıştay denetim evrakı",
      "maliye arşiv 10 yıl"
    ],
    "baslik": "5018 Kamu Mali Yönetimi MYS Ödeme Emri & Arşivleme",
    "ikon": "🗂️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Ödeme Sonrası Arşiv",
    "akilliFisilti": "🏛️ Ödeme emri belgeleri ve kanıtlayıcı belgeler (fatura, hakediş, muayene kabul) Sayıştay denetimi için 10 yıl saklanır.",
    "oncedenYapilacaklar": [
      "MYS üzerinden düzenlenen Ödeme Emri Belgesine harcama talimatı, fatura, onay belgesi ve TİF’i eksiksiz bağla",
      "Gerçekleştirme Görevlisi ve Harcama Yetkilisinin e-İmzalarının tamamlandığını kontrol et",
      "Malmüdürlüğü veya Muhasebe Müdürlüğü yevmiye numarası ve banka ödeme dekontunu evrakla eşleştir",
      "Ödeme klasörünü yıl ve yevmiye sıra numarasına göre etiketleyerek yangına dayanıklı kurum arşivine yerleştir"
    ]
  },
  {
    "id": "sanat_muzik_daft_protokolu_telif_mesam_msg",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "mesam eser bildirimi",
      "msg telif kaydı",
      "iswc kodu",
      "şarkı söz yazarı pay dağılımı"
    ],
    "baslik": "MESAM / MSG Müzik Eseri Tescili & ISWC Kodu",
    "ikon": "🎵",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Şarkı Yayınından Önce",
    "akilliFisilti": "🎬 Şarkı söz yazarı, besteci ve aranjör telif oranları (%100 toplam) MESAM/MSG portalına tescil ettirilir.",
    "oncedenYapilacaklar": [
      "Eser sahipleri (Besteci, Söz Yazarı, Aranjör) arasındaki telif paylaşım yüzdelerini yazılı mutabakatla belirle",
      "MESAM veya MSG online portalından eserin adı, türü ve süre bilgilerini girerek \"Eser Bildirim Formu\"nu doldur",
      "Uluslararası standart müzik eseri kodu olan ISWC (International Standard Musical Work Code) üretimini sağla",
      "Radyo, TV ve dijital platform telif gelirlerinin banka hesabına doğru aktarımı için IPI numarasını eşleştir"
    ]
  },
  {
    "id": "sanat_video_renk_color_grading_rec709_hdr",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "color grading",
      "davinci resolve rec709",
      "aces cct renk uzayı",
      "hdr delivery nit"
    ],
    "baslik": "DaVinci Resolve Rec.709 & ACEScct Color Grading",
    "ikon": "🎨",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Post-Prodüksiyon Aşaması",
    "akilliFisilti": "🎬 Yayın standartlarında (SDR) Rec.709 / Gamma 2.4 ve 100 Nit tepe parlaklık limitlerine uyulmalıdır.",
    "oncedenYapilacaklar": [
      "Kamera RAW/Log çekim profillerini ACEScct veya DaVinci YRGB Color Managed renk uzayına dönüştür",
      "Dalga boyu (Waveform) ve Vektörskop monitörlerinde siyah seviyesinin (0 IRE) ve beyaz seviyesinin (100 IRE) kırpılmadığını doğrula",
      "Cilt tonu çizgisini (Skin Tone Indicator) vektörskop üzerinde kontrol ederek renk sapmalarını düzelt",
      "Yayın teslimi için yasal renk aralığı (Legal Video Levels: 64-940) kısıtlamasını uygulayıp ProRes 422 HQ / DNxHR render al"
    ]
  },
  {
    "id": "sanat_film_dizi_mekan_izin_belediye_valilik",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "film çekim izni",
      "dizi set mekan izni",
      "valilik sinema çekim",
      "belediye işgaliye dizi"
    ],
    "baslik": "Sinema/Dizi Çekimi Valilik & Belediye Kamusal Alan İzni",
    "ikon": "🎬",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Çekimden 7 İş Günü Önce",
    "akilliFisilti": "🎬 Kamusal alanlarda film çekimi için İl Kültür/Valilik ve ilgili İlçe Belediyesinden işgaliye izni alınır.",
    "oncedenYapilacaklar": [
      "Kültür ve Turizm Bakanlığı Sinema Genel Müdürlüğü \"Yerli/Yabancı Film Çekim İzin Belgesi\"ni hazırla",
      "Valilik ve Emniyet Müdürlüğüne çekim tarihleri, saatleri, kullanılacak sahte silah/üniforma ve jeneratör araç plakalarını bildir",
      "İlçe Belediyesine kamusal alan işgaliye harcını yatırıp temizlik ve zabıta eskort koordinasyonu sağla",
      "Set alanında çevre sakinlerini rahatsız etmemek için bilgilendirme afişleri as ve güvenlik şeritlerini çek"
    ]
  },
  {
    "id": "sanat_kitap_matbaa_cilt_prova_baski_ozalit",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "matbaa ozalit kontrolü",
      "kitap prova baskı",
      "forma ciltleme",
      "lak selefon prova"
    ],
    "baslik": "Kitap Matbaa Baskı Öncesi Ozalit & Forma Kontrolü",
    "ikon": "📖",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Seri Baskıdan Önce",
    "akilliFisilti": "🎬 Matbaada seri baskıya girmeden önce 16 sayfalık formaların katlama, forma sırası ve taşma payları ozalitten onaylanır.",
    "oncedenYapilacaklar": [
      "PDF dosyalarındaki tüm görsellerin CMYK formatında ve 300 DPI çözünürlükte olduğunu doğrula",
      "Kapak ve iç sayfalarda en az 3 mm kesim taşma payı (Bleed) ve güvenli marj alanlarını cetvelle ölç",
      "Matbaanın bastığı dijital ozalit provasından sayfaların forma sıralamasını ve sırt kalınlığı (Spine) hesabını kontrol et",
      "Kapak lak, gofre veya selefon uygulaması için lak filmini mizanpajla tam çakıştırıp ıslak imzalı \"Baskı Onayı\" ver"
    ]
  },
  {
    "id": "sanat_canli_yayin_obvan_uydu_uplink_srt",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "canlı yayın uplink",
      "obvan naklen yayın",
      "srt stream gecikme",
      "uydu transponder frekansı"
    ],
    "baslik": "Naklen Yayın OB-Van, Uydu Uplink & SRT Akış Testi",
    "ikon": "📡",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Yayından 2 Saat Önce",
    "akilliFisilti": "🎬 Naklen canlı yayın öncesinde uydu frekansı (Ku-Band) kilitlenir ve yedek SRT/Bonded internet akışı başlatılır.",
    "oncedenYapilacaklar": [
      "Türksat veya ilgili uydu operatöründen kiralanan transponder frekansı, polarizasyon ve sembol oranını (Symbol Rate) ayarla",
      "Uplink anteni spektrum analizörle uyduya kitleyip ana kumanda merkezine (MCR) test sinyali (Bars & Tone 1 kHz) gönder",
      "Yedek hat olarak 4G/5G çoklu hat birleştirici (Bonded Cellular / LiveU) cihazında SRT akışını başlat",
      "İnterkom (Riedel/Clear-Com) hattı üzerinden saha muhabiri, yönetmen ve stüdyo sunucusu ses bağlantısını teyit et"
    ]
  },
  {
    "id": "kuafor_keratin_botoks_formaldehit_guvenlik",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "keratin bakımı formaldehit",
      "saç botoksu düzleştirme",
      "keratin pres derecesi",
      "duman tahliye fanı keratin"
    ],
    "baslik": "Formaldehitsiz Keratin Bakımı & Titanyum Pres Uygulaması",
    "ikon": "💇‍♀️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İşlem Süresi: 2.5 Saat",
    "akilliFisilti": "✨ Keratin uygulamasında hava tahliye fanı açılmalı ve ince telli saçlarda pres ısısı 190°C üzerine çıkarılmamalıdır.",
    "oncedenYapilacaklar": [
      "Saçı arındırıcı tuzsuz şampuanla (Clarifying Shampoo) 2 kez yıkayarak kütikül pullarının tamamen açılmasını sağla",
      "Saçı %80 kurutup keratin losyonunu saç diplerine 1 cm mesafe bırakacak şekilde ince tutamlara fırçayla sür",
      "30-40 dakika bekleme süresinden sonra saçı fönle tamamen kurut ve lokal duman çekici fanı aktif et",
      "Titanyum pres ile her tutamı saçın yıpranma derecesine göre 180°C - 210°C arasında 7-10 kez presle"
    ]
  },
  {
    "id": "kuafor_ipek_kirpik_siyanokrilat_izolasyon",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "ipek kirpik uygulaması",
      "kirpik yapıştırıcı siyanoakrilat",
      "alt kirpik jel ped",
      "kirpik nem oranı"
    ],
    "baslik": "İpek Kirpik & Siyanoakrilat Yapıştırıcı İzolasyonu",
    "ikon": "👁️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Uygulama Süresi: 90 Dakika",
    "akilliFisilti": "✨ Kirpik yapıştırıcısının doğru kürlenmesi için oda nemi %45-60 ve sıcaklığı 20-22°C arasında sabitlenir.",
    "oncedenYapilacaklar": [
      "Alt kirpikleri ve göz altı derisini korumak için hidrojelli kolajen göz altı pedini yapıştır",
      "Doğal kirpikleri yağdan ve proteinden arındırmak için kirpik şampuanı ve primer solüsyonu ile temizle",
      "Medikal siyanoakrilat yapıştırıcıyı çalkalayıp her 20 dakikada bir yapışma damlasını yenile",
      "Her bir doğal kirpiğe tek bir ipek kirpiği (Classic/Volume) 0.5 mm dipten temas etmeyecek şekilde yapıştır ve nano sprey ile kürle"
    ]
  },
  {
    "id": "kuafor_hydrafacial_vakum_cilt_asit_protokol",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "hydrafacial cilt bakımı",
      "vakumlu cilt temizleme",
      "salisilik asit t bölgesi",
      "hyaluronik asit infüzyon"
    ],
    "baslik": "Hydrafacial Medikal Cilt Bakımı 4 Aşamalı Protokol",
    "ikon": "💆‍♀️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Seans Süresi: 45-60 Dk",
    "akilliFisilti": "✨ Vorteks vakum başlığı ile ölü deri arındırılır; T bölgesine Salisilik, yanaklara Glikolik Asit uygulanır.",
    "oncedenYapilacaklar": [
      "Aşama 1: Laktik Asit (AHA) solüsyonu ve mavi vorteks uç ile epidermal ölü hücreleri ve sebumu nazikçe soy",
      "Aşama 2: T bölgesindeki siyah nokta ve komedonlar için Salisilik Asit (BHA) ile derin gözenek vakumlaması yap",
      "Aşama 3: Antioksidan, peptit ve Hyaluronik Asit içeren nemlendirici serumu şeffaf uçla cilde infüze et",
      "Aşama 4: Cilt bariyerini sakinleştirmek için 15 dakika Kırmızı/Mavi LED Terapi ve SPF 50+ güneş kremi uygula"
    ]
  },
  {
    "id": "kuafor_sac_pigmentasyon_on_pigmentasyon_beyaz",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "ön pigmentasyon",
      "beyaz saç kapama",
      "ana ton boya 0 numara",
      "saç boyası oksidan seçimi"
    ],
    "baslik": "%100 İnatçı Beyaz Saç Ön Pigmentasyonu & Boyama",
    "ikon": "💇‍♀️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İşlem Süresi: 50 Dakika",
    "akilliFisilti": "✨ %50 üzeri beyaz saçlarda hedef tonun içine mutlaka aynı seviyede Ana Renk (.0) 1:1 oranında eklenir.",
    "oncedenYapilacaklar": [
      "Camlaşmış dirençli beyaz bölgelere oksidan katmadan saf ana ton boyayı ve az miktarda ılık suyu sürerek ön pigmentasyon yap",
      "Asıl boya karışımında hedef moda rengin yarısı kadar ana ton (Örn: 6.0 + 6.34) ve 20 Volüm (%6) oksidan kullan",
      "Boyayı önce beyazların en yoğun olduğu şakak ve ön saç çizgisine bol miktarda uygula",
      "Oda sıcaklığında 40-45 dakika beklettikten sonra asidik şampuanla yıkayıp renk sabitleyici emülsiyon sür"
    ]
  },
  {
    "id": "kuafor_agda_sir_agda_folikulit_hijyen",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "kartuş ağda sıcaklık",
      "sir ağda kıl batığı",
      "ağda sonrası folikülit",
      "tek kullanımlık spatula ağda"
    ],
    "baslik": "Sir Ağda Hijyeni, Isı Kontrolü & Folikülit Önleme",
    "ikon": "✨",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İşlem Öncesi & Sonrası",
    "akilliFisilti": "✨ Ağda kazanı sıcaklığı termostatla 45-48°C’de tutulur; asla aynı spatula kazana ikinci kez batırılmaz (Double-Dipping Yasağı).",
    "oncedenYapilacaklar": [
      "Ağdanın sıcaklığını müşterinin cildine sürmeden önce kendi bilek içinde test ederek yanık riskini sıfırla",
      "Cildi talk pudrası ile kurulayarak ter ve sebumu al; ağdanın yalnızca kıla yapışmasını sağla",
      "Kılların çıkış yönüne doğru ince tabaka sürüp tek hamlede çıkış yönünün tersine paralel çek",
      "İşlem sonrası gözenek enfeksiyonunu (Folikülit) önlemek için alkolsüz yatıştırıcı çay ağacı yağı veya azulen losyonu sür"
    ]
  },
  {
    "id": "egitim_maarif_surec_odakli_rubrik_analizi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "maarif modeli gelişim raporu",
      "süreç odaklı ölçme",
      "dereceli puanlama anahtarı analiz",
      "öğrenme kanıtları idare",
      "biçimlendirici değerlendirme analizi",
      "maarif rubrik raporu"
    ],
    "baslik": "Maarif Modeli Süreç Odaklı Ölçme & Rubrik Analizi",
    "ikon": "📊",
    "renk": "#FEF08A",
    "varsayilanZaman": "Dönem İçi / Ara Değerlendirme",
    "akilliFisilti": "📚 Türkiye Yüzyılı Maarif Modeli gereği tek sınav yerine süreç odaklı biçimlendirici rubrik verileri analiz edilir.",
    "oncedenYapilacaklar": [
      "Zümre öğretmenlerinin e-Okul sistemine işlediği Analitik ve Bütüncül Dereceli Puanlama Anahtarlarını (Rubrik) çek",
      "Öğrencilerin salt puanlarını değil; alt beceri alanlarındaki (anlama, yorumlama, analiz, sentez) öğrenme kanıtlarını ayrıştır",
      "Sınıf ve şube bazında kazanım eşiğinin altında kalan kritik beceri alanlarını tespit ederek okul başarı ısı haritasını çıkar",
      "Zümre Başkanları Kuruluna sunulmak üzere \"Süreç Odaklı Ölçme ve Beceri Edinim Raporu\"nu e-İmzalı olarak oluştur"
    ]
  },
  {
    "id": "egitim_maarif_sosyal_duygusal_egilim_analizi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "sosyal duygusal beceri raporu",
      "maarif eğilimler analizi",
      "erdem değer eylem çerçevesi",
      "öğrenci profil değerlendirme",
      "bütüncül gelişim izleme"
    ],
    "baslik": "Maarif Modeli Sosyal-Duygusal Eğilim & Erdem-Değer Raporu",
    "ikon": "🌱",
    "renk": "#FEF08A",
    "varsayilanZaman": "Dönem Ortası & Sonu",
    "akilliFisilti": "📚 Öğrencilerin öz yönetim, iletişim ve empati gibi sosyal-duygusal eğilimleri rehberlik servisiyle konsolide edilir.",
    "oncedenYapilacaklar": [
      "Ders öğretmenlerinin ve sınıf rehber öğretmenlerinin sisteme girdiği \"Gözlem ve Eğilim Ölçekleri\" verilerini topla",
      "Öğrencinin erdem-değer-eylem çerçevesindeki (sorumluluk, adalet, saygı, vatanseverlik) davranışsal gelişim grafiğini analiz et",
      "Akademik başarısı yüksek fakat sosyal uyum veya kaygı düzeyi riskli öğrencileri Rehberlik Servisi (PDR) ile eşleştir",
      "Okul idaresi adına veli bilgilendirme formatında \"Bütüncül Öğrenci Gelişim Profili\" özet bültenini tanzim et"
    ]
  },
  {
    "id": "egitim_maarif_farklilastirilmis_ogretim_destek",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "farklılaştırılmış öğretim planı",
      "zenginleştirme destekleme analizi",
      "maarif öğrenme eksikliği",
      "derinlemesine öğrenme müdahale",
      "bireyselleştirilmiş akademik destek"
    ],
    "baslik": "Farklılaştırılmış Öğretim: Zenginleştirme / Destekleme Matrisi",
    "ikon": "🎯",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Gelişim Raporu Sonrası 3 Gün",
    "akilliFisilti": "📚 Maarif Modeli uyarınca ileri düzey becerili öğrencilere zenginleştirme, güçlük çekenlere telafi modülü planlanır.",
    "oncedenYapilacaklar": [
      "Akademik gelişim raporundaki standart sapma ve persentil dağılımına göre öğrencileri 3 kademeye (Temel, İleri, Derinlemesine) ayır",
      "Temel düzeydeki öğrenciler için DYK (Destekleme ve Yetiştirme Kursları) veya okul içi telafi etüt programı oluştur",
      "İleri düzeydeki öğrencilere proje tabanlı, TÜBİTAK/BAP ve olimpiyat odaklı \"Zenginleştirilmiş Öğretim Modülleri\" ata",
      "Şube Öğretmenler Kurulunda (ŞÖK) her öğrenci grubu için belirlenen farklılaştırılmış öğretim aksiyonlarını protokole bağla"
    ]
  },
  {
    "id": "egitim_maarif_eokul_portfolyo_gelisim_dosyasi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "e-okul öğrenci gelişim dosyası",
      "öğrenci portfolyo denetimi",
      "öz değerlendirme akran değerlendirme",
      "maarif karne gelişim eki",
      "öğrenci ürün dosyası idare"
    ],
    "baslik": "e-Okul Maarif Portfolyo & Öğrenci Gelişim Dosyası Denetimi",
    "ikon": "📁",
    "renk": "#FEF08A",
    "varsayilanZaman": "Dönem Sonu / Karne Öncesi 2 Hafta",
    "akilliFisilti": "📚 Not karnesinin yanında yer alacak dijital portfolyo, öz ve akran değerlendirme kayıtları idarece onaylanır.",
    "oncedenYapilacaklar": [
      "Öğretmenlerin e-Okul Öğrenci Gelişim Dosyası modülüne yüklediği performans görevlerini ve öğrenci ürün seçkilerini denetle",
      "Öğrencinin kendi öğrenme sürecini yansıtan \"Öz Değerlendirme\" ve \"Akran Değerlendirme\" formlarının eksiksiz doldurulduğunu teyit et",
      "Sanatsal, sportif ve bilimsel etkinlik kayıtlarının e-Okul Sosyal Etkinlik Modülüyle entegrasyonunu doğrula",
      "Dönem sonu karnesi ile birlikte velilere takdim edilecek \"Maarif Modeli Resmi Gelişim Dosyası Raporu\" çıktısını onayla"
    ]
  },
  {
    "id": "egitim_maarif_zumre_ogrenme_kanitlari_eylem_plani",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "zümre öğrenme kanıtları analizi",
      "maarif kazanım açığı kapatma",
      "okul akademik gelişim eylem planı",
      "tematik öğrenme çıktısı idare",
      "maarif zümre koordinasyonu"
    ],
    "baslik": "Zümreler Arası Öğrenme Çıktıları & Akademik Eylem Planı",
    "ikon": "📈",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Her Ayın İlk Haftası",
    "akilliFisilti": "📚 Disiplinlerarası tematik öğrenme çıktıları analiz edilerek okul düzeyinde akademik gelişim eylem planı güncellenir.",
    "oncedenYapilacaklar": [
      "Matematik, Fen, Türkçe ve Sosyal Bilimler zümrelerinin ortak beceri çıktılarını (Veri okuma, eleştirel analiz) çapraz eşleştir",
      "Şubeler arasındaki başarı ve beceri edinim makasının %15’i aştığı durumlarda öğretmenler arası ortak ders planı koordinasyonu başlat",
      "Öğrenme açığı tespit edilen alanlarda dijital eğitim içerikleri (EBA/ÖBA Maarif Havuzu) üzerinden takviye ödevlendirmeleri aç",
      "İlçe Milli Eğitim Müdürlüğü AR-GE birimine gönderilmek üzere \"Okul Maarif Modeli Akademik İlerleme Bülteni\"ni tanzim et"
    ]
  },
  {
    "id": "egitim_butuncul_gelisim_endeksi_bge",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "bütüncül gelişim endeksi",
      "bge analizi",
      "öğrenci bütüncül endeks",
      "bütüncül gelişim skoru",
      "maarif bge raporu",
      "akademik sosyal gelişim katsayısı"
    ],
    "baslik": "Bütüncül Gelişim Endeksi (BGE) Çok Boyutlu Raporu",
    "ikon": "🎯",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Tek Dokunuşla Anlık Analiz",
    "akilliFisilti": "📚 Maarif Modeli BGE: Akademik alan becerileri, kavramsal derinlik ve erdem göstergeleri tek bir endekste konsolide edilir.",
    "oncedenYapilacaklar": [
      "e-Okul ve ders içi değerlendirme modülünden öğrencinin Alan Becerileri (%40), Kavramsal Becerileri (%30) ve Eğilim-Değer verilerini (%30) çek",
      "0-100 normalize skalada Bütüncül Gelişim Endeksi (BGE) skorunu hesaplayarak okul ve şube medyanıyla kıyasla",
      "BGE skoru < 65 olan öğrenciler için çoklu branş takip uyarısı, > 85 olan öğrenciler için zenginleştirilmiş proje havuzu öner",
      "Okul müdürü ve rehberlik servisi için tek sayfalık \"BGE Bütüncül Gelişim ve Karar Özeti\" grafiğini oluştur"
    ]
  },
  {
    "id": "egitim_oz_duzenleme_skalasi_ods",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "öz düzenleme skalası",
      "öds analizi",
      "öz düzenlemeli öğrenme",
      "öğrenme sorumluluğu göstergesi",
      "metabilişsel izleme skalası",
      "öds raporu"
    ],
    "baslik": "Öz-Düzenleme Skalası (ÖDS) & Metabilişsel İzleme",
    "ikon": "⏱️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Haftalık / Aylık İzleme",
    "akilliFisilti": "📚 Maarif Modeli ÖDS: Öğrencinin zaman yönetimi, ödev sorumluluğu ve kendi öğrenmesini izleme yetkinliği puanlanır.",
    "oncedenYapilacaklar": [
      "Öğretmen gözlem kayıtları, ödev teslim disiplini ve öğrenci öz değerlendirme formlarından ÖDS puanını çıkar",
      "Düşük ÖDS skoruna sahip (zaman yönetimi ve hedef belirlemede zorlanan) öğrencileri tespit et",
      "Sınıf rehber öğretmeni ile koordineli olarak öğrenciye \"Bireysel Öğrenme Takvimi ve Haftalık Görev Çizelgesi\" ata",
      "Şube Öğretmenler Kuruluna (ŞÖK) sunulmak üzere \"Öz-Düzenleme ve Sorumluluk Düzeyi Değişim Grafiği\"ni hazırla"
    ]
  },
  {
    "id": "egitim_kavramsal_beceri_tematik_harita",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "kavramsal beceri düzeyi",
      "tematik yetkinlik haritası",
      "kbd analiz",
      "disiplinlerarası transfer katsayısı",
      "beceri örüntü raporu",
      "kavramsal beceri haritası"
    ],
    "baslik": "Kavramsal Beceri Düzeyi (KBD) & Tematik Yetkinlik Haritası",
    "ikon": "🗺️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Zümre Değerlendirme Toplantısı",
    "akilliFisilti": "📚 KBD Analizi: Öğrencinin ezber yerine eleştirel düşünme, modelleme ve disiplinlerarası bilgi transferi gücünü ölçer.",
    "oncedenYapilacaklar": [
      "Fen, Matematik, Türkçe ve Sosyal Bilimler derslerindeki ortak kavramsal beceri (Analiz, Çıkarım Yapma, Sentez) çıktılarını filtrele",
      "Öğrencinin teorik bilgiyi yeni bir problem durumuna uygulama (Transfer Katsayısı) oranını hesapla",
      "Şube genelinde kavram yanılgısı (Misconception) yaşanan ortak tematik başlıkları kırmızı listeye al",
      "Zümre başkanlarına iletilmek üzere \"KBD Tematik Beceri Güçlendirme ve Ders İçi Uygulama Önerileri\" bültenini tanzim et"
    ]
  },
  {
    "id": "egitim_erdem_deger_eylem_gostergesi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "erdem değer eylem göstergesi",
      "edeg skoru",
      "maarif değer uyum analizi",
      "sosyal entegrasyon göstergesi",
      "değer eylem matrisi",
      "edeg raporu"
    ],
    "baslik": "Erdem-Değer-Eylem Göstergesi (EDEG) & Sosyal Uyum",
    "ikon": "🤝",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Dönem Sonu Karnesi Öncesi",
    "akilliFisilti": "📚 Maarif Modeli EDEG: Adalet, saygı, sorumluluk ve dayanışma değerlerinin somut okul içi eylemlere dönüşümünü modeller.",
    "oncedenYapilacaklar": [
      "Sosyal kulüp faaliyetleri, akran etkileşimi, nöbetçi öğretmen gözlemleri ve okul içi sosyal sorumluluk verilerini eşleştir",
      "Öğrencinin okul iklimine katkısını ve toplumsal değerlere uyum düzeyini 5 kademeli EDEG skalasında puanla",
      "Sosyal geri çekilme veya akran zorbalığı riski gösteren profilleri PDR servisiyle erken uyarı listesine al",
      "Veli karnesine eklenecek olan \"Sosyal Katılım ve Karakter Gelişim Gözlem Karnesi\"ni e-İmzaya hazırla"
    ]
  },
  {
    "id": "egitim_surec_odakli_kazanim_indeksi_soki",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "süreç odaklı kazanım indeksi",
      "soki analizi",
      "akademik ilerleme hızı",
      "learning velocity",
      "kazanım edinim katsayısı",
      "soki raporu"
    ],
    "baslik": "Süreç Odaklı Kazanım İndeksi (SOKİ) & İlerleme Hızı",
    "ikon": "📈",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Her Sınav/Etkinlik Sonrası",
    "akilliFisilti": "📚 SOKİ: Öğrencinin başlangıç düzeyine göre katettiği net akademik ilerleme hızını (Learning Velocity) analiz eder.",
    "oncedenYapilacaklar": [
      "Dönem başı tanılayıcı (diagnostik) değerlendirme ile güncel süreç değerlendirme puanları arasındaki fark türevini hesapla",
      "Mutlak notu düşük olsa dahi yüksek ilerleme hızı (SOKİ > +%25) kaydeden öğrencileri \"Takdir ve Motivasyon\" listesine dahil et",
      "İlerleme hızı durağanlaşan veya negatife dönen şubeler için branş öğretmenleriyle \"Kazanım Pekiştirme Eylem Planı\" başlat",
      "İl/İlçe Milli Eğitim Müdürlüğü akademik izleme portalı formatına uygun \"SOKİ Okul Başarı Trendi Raporu\"nu kaydet"
    ]
  },
  {
    "id": "egitim_okul_tasimasi_servis_sofor_denetimi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "okul servis araçları denetimi",
      "servis rehber personel şartı",
      "okul taşıtı kamera emniyet kemeri",
      "taşımalı eğitim puantaj"
    ],
    "baslik": "Okul Servis Araçları Yönetmeliği & Aylık Şoför Denetimi",
    "ikon": "🚌",
    "renk": "#FEF08A",
    "varsayilanZaman": "Her Ayın İlk Haftası",
    "akilliFisilti": "📚 Okul servislerinde 3 nokta emniyet kemeri, iç-dış kamera kayıt sistemi ve Rehber Personel (hostes) zorunludur.",
    "oncedenYapilacaklar": [
      "Servis şoförünün Mesleki Yeterlilik Belgesi, SRC-2, Psikoteknik ve Adli Sicil Kaydını denetle",
      "Rehber personelin (en az lise mezunu ve 22 yaşını doldurmuş) sözleşmesini ve görev kartını kontrol et",
      "Araç üzerindeki \"DUR\" kırmızı ışıklı işaretini, \"OKUL TAŞITI\" yazısını ve 30 günlük NVR kamera kayıtlarını fiziksel test et",
      "Okul Servis Denetim Komisyonu tutanağını imzalayıp eksiklik tespit edilen araçlara 7 günlük ihtar yaz"
    ]
  },
  {
    "id": "egitim_meb_isg_okul_tahliye_risk_haritasi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "okul isg risk haritası",
      "okul acil çıkış yönlendirme",
      "okul kazan dairesi denetimi",
      "öğrenci güvenlik komisyonu"
    ],
    "baslik": "MEB İSG Okul Binası Güvenliği & Merdiven Fileleri Kontrolü",
    "ikon": "🏫",
    "renk": "#FEF08A",
    "varsayilanZaman": "Dönem Başı / Aylık Rutin",
    "akilliFisilti": "📚 Merdiven boşluklarındaki güvenlik fileleri, acil çıkış kapıları panik barları ve pencere açılma stoperleri denetlenir.",
    "oncedenYapilacaklar": [
      "Tüm kat merdiven boşluklarında TS EN 1263-1 standardına uygun güvenlik koruma filelerinin gerginliğini test et",
      "Derslik pencerelerinin en fazla 10-15 cm açılmasını sağlayan pencere güvenlik kilitlerini ve stoperleri kontrol et",
      "Acil kaçış yönlendirme armatürlerinin (Yeşil Exit lambaları) elektrik kesintisinde en az 90 dk yandığını sına",
      "MEBBİS İSG modülüne okul risk değerlendirme ve tehlike bildirim raporunu fotoğraflarıyla kaydet"
    ]
  },
  {
    "id": "egitim_ogretmen_performans_adaylik_mebbis",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "öğretmen ders denetimi müdür",
      "ders içi rehberlik formu",
      "aday öğretmen danışman formu",
      "öğretmen yıllık çalışma planı"
    ],
    "baslik": "Okul Müdürü Ders Denetimi & Öğretmen Rehberlik Raporu",
    "ikon": "📚",
    "renk": "#FEF08A",
    "varsayilanZaman": "Dönemde En Az 1 Kez",
    "akilliFisilti": "📚 Okul müdürü eğitim-öğretim yılı içinde tüm öğretmenlerin dersini ziyaret ederek ders denetim ve rehberlik formu düzenler.",
    "oncedenYapilacaklar": [
      "Öğretmenin yıllık ünitelendirilmiş ders planı ile sınıftaki haftalık konu ilerlemesini karşılaştır",
      "Ders esnasında öğrenci katılımını, etkileşimli tahta (FATİH projesi) kullanımını ve ölçme-değerlendirme yöntemlerini gözlemle",
      "Ders bitiminde öğretmenle birebir görüşme yaparak güçlü ve gelişime açık alanlar hakkında yapıcı dönüt ver",
      "MEB Standart Denetim Kriterlerine uygun \"Öğretmen Ders İçi Gözlem ve Rehberlik Formu\"nu imzalayıp özlük dosyasına kaldır"
    ]
  },
  {
    "id": "egitim_tubitak_4006_bilim_fuari_onay",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "tübitak 4006 bilim fuarı",
      "tübitak okul proje başvurusu",
      "bilim fuarı alt proje",
      "tübitak yürütücü öğretmen"
    ],
    "baslik": "TÜBİTAK 4006 Bilim Fuarı Proje Başvurusu & İzleme",
    "ikon": "🔬",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Başvuru Dönemi & Fuar Günü",
    "akilliFisilti": "📚 TÜBİTAK 4006’da en az %50 oranında Araştırma Projesi bulunmalı ve 15-20 alt proje sisteme girilmelidir.",
    "oncedenYapilacaklar": [
      "Okul bünyesindeki farklı branş öğretmenlerinden Araştırma, İnceleme ve Tasarım kategorilerinde alt proje önerilerini topla",
      "Projelerin özgünlüğünü, etik kurul izni gerektirip gerektirmediğini ve amaç-yöntem tutarlılığını komisyonda incele",
      "TÜBİTAK Bilim ve Toplum portalı üzerinden proje yürütücüsü ve okul müdürü e-İmzası ile başvuruyu onayla",
      "Fuar günü sergi stantları düzeni, jüri/izleyici ağırlama ve TÜBİTAK İzleyicisi resmi değerlendirme tutanağını hazırla"
    ]
  },
  {
    "id": "egitim_ogrenci_meclisi_sosyal_etkinlik_modulu",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "e-okul sosyal etkinlik modülü",
      "kulüp faaliyetleri raporu",
      "sosyal sorumluluk projesi meb",
      "öğrenci topluluk belgesi"
    ],
    "baslik": "e-Okul Sosyal Etkinlik Modülü & Öğrenci Katılım Onayı",
    "ikon": "🎭",
    "renk": "#FEF08A",
    "varsayilanZaman": "Dönem Sonu Öncesi",
    "akilliFisilti": "📚 Öğrencilerin bilimsel, kültürel, sanatsal ve sportif başarıları e-Okul Sosyal Etkinlik Modülüne işlenip onaylanır.",
    "oncedenYapilacaklar": [
      "Kulüp danışman öğretmenlerinin dönem boyunca yürüttüğü sosyal sorumluluk ve toplum hizmeti evraklarını incele",
      "Yarışma, festival, turnuva katılım ve derece belgelerini (Okul içi / İlçe / İl / Uluslararası) doğrula",
      "e-Okul Sosyal Etkinlik Girişi ekranından her öğrencinin etkinliğini kategori ve temsil düzeyine göre sisteme kaydet",
      "Müdür yardımcısı onayından sonra öğrencilerin e-Portfolyo gelişim karnesine başarı belgelerini yansıt"
    ]
  },
  {
    "id": "kamu_harcirah_gecici_gorev_yollugu_6245",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "6245 geçici görev yolluğu",
      "harcırah beyannamesi kamu",
      "yevmiye ve konaklama bedeli hbys",
      "memur yolluk hesabı"
    ],
    "baslik": "6245 Sayılı Kanun Memur Geçici Görev Yolluğu & Harcırah Hesabı",
    "ikon": "💼",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Görev Dönüşünden İtibaren 1 Ay",
    "akilliFisilti": "🏛️ Memur görev dönüşü bilet, otel faturası ve görevlendirme onayını ekleyerek Harcırah Bildirimi vermelidir.",
    "oncedenYapilacaklar": [
      "Kaymakamlık/Valilik veya Harcama Yetkilisi onaylı \"Geçici Görevlendirme Oluru\"nun tarih ve saatlerini kontrol et",
      "Bütçe Kanunu H Cetvelinde unvana göre belirlenen günlük yevmiye ve %50 artırımlı azami konaklama tutarını hesapla",
      "Otobüs/Uçak bileti faturalarını ve otel faturasını \"Geçici Görev Yolluğu Bildirimi\" formuna ekle",
      "MYS üzerinden Ödeme Emri Belgesi düzenleyerek tahakkuku Malmüdürlüğü/Muhasebe birimine sevk et"
    ]
  },
  {
    "id": "kamu_resmi_yazisma_eimza_kep_yetki",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "nitelikli elektronik sertifika e-imza",
      "kamu kep adresi gönderim",
      "resmi yazışma yönetmeliği güvenlik",
      "ebys paraf zinciri"
    ],
    "baslik": "Resmi Yazışmalarda e-İmza Doğrulama & KEP İletimi",
    "ikon": "🖋️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Yazı Çıkışı Öncesi",
    "akilliFisilti": "🏛️ Resmi yazışmalarda 5070 sayılı Kanuna uygun Nitelikli Elektronik Sertifika (NES) ve Zaman Damgası kullanılır.",
    "oncedenYapilacaklar": [
      "Yazının EBYS üzerindeki paraf zincirinin (Memur -> Şef -> Şube Müdürü -> Daire Başkanı) tamamlandığını doğrula",
      "TÜBİTAK KamuSM onaylı e-İmza tokenını takarak belgenin CAdES / PAdES formatında imzalandığını teyit et",
      "Kurumlararası tebligatlarda karşı kurumun resmi KEP (Kayıtlı Elektronik Posta) veya DETSİS adresini seç",
      "Gönderim sonrası KEP delil kayıtlarının (Gönderi, Teslim, Okundu delili) EBYS veri tabanına indiğini kontrol et"
    ]
  },
  {
    "id": "kamu_etik_kurul_hediye_alma_yasagi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "kamu görevlileri etik kurulu",
      "hediye alma yasağı kamu",
      "çıkar çatışması bildirimi",
      "etik sözleşmesi memur"
    ],
    "baslik": "Kamu Görevlileri Etik Kurulu Hediye Alma Yasağı & Beyan",
    "ikon": "⚖️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Göreve Başlama & Olay Anı",
    "akilliFisilti": "🏛️ Memurlar kurumla iş veya hizmet ilişkisi olan kişilerden hiçbir şekilde hediye ve menfaat kabul edemez.",
    "oncedenYapilacaklar": [
      "Göreve yeni başlayan tüm memurlara \"Kamu Görevlileri Etik Sözleşmesi\"ni tebliğ edip imzalı nüshasını özlük dosyasına koy",
      "Bakanlık/Kurum Etik Komisyonu yıllık faaliyet ve eğitim takvimini tanzim et",
      "Kuruma nezaketen gönderilen ve reddedilemeyen protokol hediyelerini kayıt altına alarak Kurum Envanterine kaydet",
      "Etik dışı çıkar çatışması ihbarlarını gizlilik esasıyla inceleyip 15 gün içinde Kurul Raporuna bağla"
    ]
  },
  {
    "id": "kamu_sendika_uyelik_istifa_kesinti_listesi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "memur sendika üyelik formu",
      "sendika istifa dilekçesi 1 ay",
      "sendika aidat kesinti listesi",
      "4688 sayılı kamu sendikaları"
    ],
    "baslik": "4688 Sayılı Kanun Memur Sendika Üyelik & İstifa Takibi",
    "ikon": "👥",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Her Ayın 15’i Bordro Öncesi",
    "akilliFisilti": "🏛️ Sendika istifası kuruma verildiği tarihten itibaren 1 ay sonra yürürlüğe girer; bu süre içinde aidat kesilmeye devam eder.",
    "oncedenYapilacaklar": [
      "3 nüsha doldurulan \"Kamu Görevlileri Sendikalarına Üyelik Formu\"na evrak kayıt numarası ve tarih ver",
      "Sendika istifa dilekçesi verildiğinde 30 günlük yasal bekleme süresini KBS bordro sistemine not et",
      "Her ayın 15’inde sendika üyesi personelin net maaşından %0.5 oranındaki üyelik aidatını keserek sendika banka hesabına aktar",
      "Her yıl 15 Mayıs tarihi itibarıyla kurumdaki sendikalı memur sayılarını belirleyen \"Yetkili Sendika Tespit Tutanağı\"nı imzala"
    ]
  },
  {
    "id": "kamu_disiplin_ceza_itiraz_idare_mahkemesi_60gun",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "disiplin cezasına itiraz süresi 7 gün",
      "idare mahkemesi iptal davası 60 gün",
      "disiplin cezası sicilden silinme 5 yıl",
      "uyarma kınama aylıktan kesme"
    ],
    "baslik": "657 DMK Disiplin Cezasına İtiraz & İdare Mahkemesi Davası",
    "ikon": "⚖️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Tebliğden İtibaren 7 Gün İtiraz / 60 Gün Dava",
    "akilliFisilti": "🏛️ Disiplin cezasına 7 gün içinde Disiplin Kuruluna itiraz edilir; red halinde 60 gün içinde İdare Mahkemesinde dava açılır.",
    "oncedenYapilacaklar": [
      "Ceza kararının tebliğ edildiği tarihi tebellüğ belgesinden kontrol ederek 7 günlük itiraz süresini hesapla",
      "Disiplin cezası verilmeden önce 657 m. 130 uyarınca usulüne uygun 7 günlük yazılı savunma hakkı tanınıp tanınmadığını incele",
      "İtiraz reddedilirse 2577 sayılı İYUK m. 7 uyarınca 60 gün içinde İdare Mahkemesinde \"İptal Davası\" dilekçesini aç",
      "Cezanın kesinleşmesinden itibaren 5 yıl (uyarma-kınama) veya 10 yıl (aylıktan kesme-kademe ilerlemesi durdurma) sonra sicilden silinme takvimi kur"
    ]
  },
  {
    "id": "sanat_radyo_tv_rtuk_yayin_kayit_1yil",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "rtük yayın kayıt zorunluluğu",
      "yayın kütüğü log arşivi 1 yıl",
      "rtük ceza itiraz",
      "akıllı işaretler koruyucu sembol"
    ],
    "baslik": "6112 Sayılı Kanun RTÜK 1 Yıllık Kesintisiz Yayın Kaydı & Arşiv",
    "ikon": "📺",
    "renk": "#DDD6FE",
    "varsayilanZaman": "7/24 Kesintisiz Kayıt",
    "akilliFisilti": "🎬 Medya hizmet sağlayıcıları yayınladıkları tüm programları ses ve görüntüyle 1 yıl boyunca saklamak zorundadır.",
    "oncedenYapilacaklar": [
      "Yayın otomasyonu ve Logger kayıt sunucularının (TS Stream / H.264) disk kapasitesini ve senkronizasyonunu günlük doğrula",
      "Yayınlanan programların başında Akıllı İşaretler koruyucu sembollerinin (Genel İzleyici, 7+, 13+, Şiddet/Korku) yayınlandığını teyit et",
      "RTÜK İzleme ve Değerlendirme Dairesinden istenen resmi kayıt taleplerine 48 saat içinde zaman kodlu MP4 kopyasını hazırla",
      "Ticari iletişim (Reklam) sürelerinin 1 saatlik yayın diliminde azami 12 dakikayı aşmadığını otomatik logdan denetle"
    ]
  },
  {
    "id": "sanat_tiyatro_sahne_dante_isik_dmx512",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "sahne ışık dmx512",
      "art-net dmx evreni",
      "dante ses protokolü gigabit",
      "sahne cue list ışık masası"
    ],
    "baslik": "Sahne Işık Masası DMX512 / Art-Net & Dante Ses Testi",
    "ikon": "🎭",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Genel Prova Öncesi",
    "akilliFisilti": "🎬 DMX evrenlerinde (Universe) adres çakışması engellenir; Dante ses ağı yedekli (Redundant) Gigabit anahtarlarla çalışır.",
    "oncedenYapilacaklar": [
      "Işık konsolu (GrandMA / Avolites) üzerinde robotik spot ve profil ışıkların DMX başlangıç adreslerini (Patch) kontrol et",
      "DMX sinyal hattının sonundaki armatüre 120 Ohm DMX Sonlandırma Direncinin (Terminator) takıldığını doğrula",
      "Dante Controller yazılımında tüm kablosuz mikrofon alıcılarını ve sahne stage-box kanallarını mikserle eşleştir",
      "Oyunun Cue-List (Sahne Işık ve Ses İpucu Listesi) geçiş sürelerini (Fade In/Out) provada saniye saniye test et"
    ]
  },
  {
    "id": "sanat_fotograf_raw_dng_renk_kalibrasyon_xrite",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "renk kalibrasyon kartı x-rite",
      "monitör kalibratörü spyder",
      "raw dng profil oluşturma",
      "ürün çekimi doğru beyaz ayarı"
    ],
    "baslik": "Profesyonel Ürün Çekimi X-Rite Renk Kalibrasyonu & Beyaz Ayarı",
    "ikon": "📷",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Stüdyo Işık Kurulumu Sonrası",
    "akilliFisilti": "🎬 E-ticaret ürün çekimlerinde renk sapmasını sıfırlamak için X-Rite ColorChecker ile özel DNG kamera profili oluşturulur.",
    "oncedenYapilacaklar": [
      "Stüdyo flaş ışıklarının (5600K gün ışığı) sabit pozlamasında ürünün yanına 24 yamalı X-Rite ColorChecker kartını yerleştir",
      "Kameradan 14-bit sıkıştırmasız RAW formatında referans kare çekimi yap",
      "Yazılımda (ColorChecker Camera Calibration) renk yamalarını eşleştirerek Lightroom/Capture One için özel kamera profili üret",
      "Müşteri onayına sunmadan önce IPS grafik monitörünün donanımsal kalibrasyonunu (Delta-E < 2) kolorimetre ile doğrula"
    ]
  },
  {
    "id": "sanat_sinema_yapim_oyuncu_sozlesmesi_muvafakat",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "oyuncu sözleşmesi fsek",
      "icracı sanatçı muvafakatnamesi",
      "telif devir taahhüdü film",
      "figüran cast sözleşmesi"
    ],
    "baslik": "FSEK 80 İcracı Sanatçı (Oyuncu) Telif ve Muvafakat Sözleşmesi",
    "ikon": "🎬",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Set Başlamadan Önce",
    "akilliFisilti": "🎬 5846 sayılı FSEK gereği oyuncunun tespit, çoğaltma ve dijital yayma hakları yazılı ve süresiz olarak yapımcıya devredilir.",
    "oncedenYapilacaklar": [
      "Sözleşmede oyuncunun ses ve görüntüsünün TV, Sinema, VOD (Netflix vb.) ve tüm dijital mecralarda yayın hakkını açıkça tanımla",
      "Çalışma saatleri, dinlenme süreleri, set karavanı ve dublör/özel sahne güvenlik şartlarını protokole bağla",
      "18 yaşından küçük çocuk oyuncular için Aile ve Sosyal Hizmetler Bakanlığı Çocuk Oyuncu Çalışma İznini ve ebeveyn onayını al",
      "Islak imzalı oyuncu sözleşmesini ve kimlik fotokopisini yapım şirketi telif arşivine kaldır"
    ]
  },
  {
    "id": "sanat_muzik_plak_sirketi_isrc_kod_uretme",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "isrc kodu üretimi",
      "şarkı dijital dağıtım spotify",
      "fonogram yapımcı kodu",
      "ifpi türkiye tescil"
    ],
    "baslik": "Müzik Yapımcısı ISRC (International Standard Recording Code) Tescili",
    "ikon": "💿",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Mastering Sonrası / Dağıtım Öncesi",
    "akilliFisilti": "🎬 Her bir şarkı ve remix için benzersiz 12 haneli ISRC kodu (Örn: TR-XXX-26-00001) üretilerek ses dosyasına gömülür.",
    "oncedenYapilacaklar": [
      "Kültür Bakanlığı ve MÜ-YAP nezdinde şirketin 3 haneli Yapımcı Ön Kodunu (Registrant Code) kontrol et",
      "ISRC formatına göre Ülke Kodu (TR), Yapımcı Kodu, Yıl (26) ve 5 haneli Şarkı Sıra Numarasını oluştur",
      "WAV master dosyasına BWF (Broadcast Wave Format) meta verisi olarak ISRC kodunu ve şarkı künyesini işle",
      "Dijital dağıtıcıya (DistroKid/Believe) ISRC kodunu girerek Spotify, Apple Music ve YouTube Music sistemlerine hatasız dağıt"
    ]
  },
  {
    "id": "kuafor_lazer_epilasyon_cilt_yanigi_onleme",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "lazer epilasyon joule ayarı",
      "buz lazer başlık soğutma",
      "lazer cilt yanığı önleme",
      "cilt tipi fitzpatrick 1-6"
    ],
    "baslik": "Buz Başlıklı Diyot Lazer Epilasyon & Soğutma / Joule Kalibrasyonu",
    "ikon": "✨",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Atış Öncesi Test",
    "akilliFisilti": "✨ Cilt yanığını önlemek için buz başlık sıcaklığı -5°C olmalı ve bronzlaşmış cilde 4 hafta lazer uygulanmamalıdır.",
    "oncedenYapilacaklar": [
      "Müşterinin Fitzpatrick Cilt Tipini (I-VI) ve kıl kalınlığını analiz ederek uygun Joule/cm² ve darbe süresini (Pulse Width) ayarla",
      "Safir soğutma ucunun -4°C / -8°C seviyesine ulaştığını kontrol et ve cilde bol miktarda ultrasonik şeffaf jel sür",
      "Benler, açık yaralar, dövmeler ve kalıcı makyaj alanlarını beyaz kapatıcı kalem veya medikal bantla korumaya al",
      "Uygulama sonrasında cildi sakinleştirmek için 15 dakika saf Aloe Vera jeli sür ve 24 saat sıcak duş/kese yasağını hatırlat"
    ]
  },
  {
    "id": "kuafor_sac_ombre_sombre_krepe_balyaj",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "ombre krepe oranı",
      "sombre geçiş çizgisi önleme",
      "balyaj alüminyum folyo",
      "tonlama cila 9.1 10.2"
    ],
    "baslik": "Kusursuz Ombre/Sombre Geçişi & Krepe Balyaj Tekniği",
    "ikon": "💇‍♀️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Uygulama Süresi: 3 Saat",
    "akilliFisilti": "✨ Geçiş çizgisi (bantlaşma) oluşmaması için tutamlar %40 krepe yapılmalı ve fırça dikey açıyla sürülmelidir.",
    "oncedenYapilacaklar": [
      "Saçı 4 ana bölgeye ayırıp ense kısmından başlayarak 1 cm kalınlığında ince tutamlar al",
      "İnce dişli krepe tarağı ile diplere doğru sıkı krepe yaparak yumuşak geçiş bölgesini oluştur",
      "Toz açıcıyı folyo üzerine sürerken fırçayı yatay değil dikey hareketle yedirerek doğal degrade etkisi ver",
      "Yıkama setinde sarı pigmenti nötralize etmek için 9.1 veya 10.21 cila karışımını nemli saça 10 dakika uygula"
    ]
  },
  {
    "id": "kuafor_protez_tirnak_jel_akrilik_mantar_onleme",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "protez tırnak yeşil tırnak sendromu",
      "pseudomonas bakteri tırnak",
      "tırnak dehidaratör primer",
      "jel tırnak tırnak kalkması"
    ],
    "baslik": "Protez Tırnak Jel Mimarisi & Pseudomonas (Yeşil Leke) Önleme",
    "ikon": "💅",
    "renk": "#EDE9FE",
    "varsayilanZaman": "3-4 Haftada Bir Bakım",
    "akilliFisilti": "✨ Doğal tırnak ile jel arasında hava boşluğu kalırsa Pseudomonas bakterisi ürer; tırnak dehidratör ve asitsiz primer şarttır.",
    "oncedenYapilacaklar": [
      "Doğal tırnak yüzeyindeki parlaklığı 180 gritlik törpüyle nazikçe matlaştırıp tozunu fırçayla tamamen al",
      "Tırnak plağını nemden ve yağdan arındırmak için Nail Dehydrator (Kurutucu) ve ardından asitsiz Acid-Free Primer sür",
      "Base Coat baz jelini sürüp 48W UV/LED lambada 60 saniye kürle; ardından tırnak stres noktasına (Apex) yapı jeliyle kavis ver",
      "Yeşil/siyah leke görülen tırnaklara kesinlikle yeni jel kapatma yapma; jeli tamamen söküp antiseptik solüsyon uygula"
    ]
  },
  {
    "id": "kuafor_kalici_makyaj_microblading_steril_igne",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "microblading steril tek kullanımlık bıçak",
      "altın oran kaş tasarımı",
      "kalıcı makyaj pigment seçimi",
      "microblading kabuklanma"
    ],
    "baslik": "Microblading Kaş Tasarımı, Altın Oran & Biyouyumlu Pigment",
    "ikon": "✨",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İşlem Süresi: 2 Saat",
    "akilliFisilti": "✨ Microblading iğnesi tek kullanımlıktır ve müşteri önünde açılır; kıl atımları sadece epidermisin üst tabakasına çizilir.",
    "oncedenYapilacaklar": [
      "Altın oran kumpası ve ipli ölçüm cetveli ile yüz simetrisine uygun kaş ön çizimini yapıp müşteriye aynada onaylat",
      "Cilt alt tonuna (Sıcak/Soğuk) göre demir oksitsiz ve ağır metalsiz organik mikropigment tonunu seç",
      "Lokal anestezik krem ile 20 dakika beklettikten sonra tek kullanımlık U-blades iğne ile doğal kıl yönünde hafif çizikler aç",
      "İşlem sonrası ilk 7 gün su değdirmeme ve E vitamini/özel onarıcı bakım kremi kullanım protokolünü tebliğ et"
    ]
  },
  {
    "id": "kuafor_cilt_bakimi_dermapen_mikroigneleme",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "dermapen mikroiğneleme derinlik",
      "steril 12-36 pin kartuş",
      "hyaluronik asit mezoterapi",
      "dermapen sonrası güneş koruma"
    ],
    "baslik": "Dermapen Mikroiğneleme & Steril Mezoterapi Protokolü",
    "ikon": "💆‍♀️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Seans Süresi: 60 Dakika",
    "akilliFisilti": "✨ Alın ve burunda iğne derinliği 0.5 mm, yanaklarda 1.0-1.5 mm tutulur; işlem sonrası 48 saat makyaj ve güneş yasaktır.",
    "oncedenYapilacaklar": [
      "Cildi antiseptik solüsyonla derinlemesine dezenfekte et ve tek kullanımlık 12/36 pinlik steril kartuşu cihaza tak",
      "Cilde saf moleküler Hyaluronik Asit veya C Vitamini mezoterapi serumunu damlatarak cihazı 90° dik açıyla kaydır",
      "Epidermal mikro kanallar açılırken kanama noktacıklarının oluştuğu alanlarda aşırı baskı yapmaktan kaçın",
      "İşlem bitiminde steril soğutucu kolajen maske uygulayıp müşteriye mineral filtreli SPF 50+ güneş koruyucu sür"
    ]
  },
  {
    "id": "egitim_meb_norm_kadro_guncelleme_ekim",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "meb norm kadro güncellemesi",
      "haftalık ders yükü norm hesabı",
      "bölge norm fazlası öğretmen",
      "mebbis norm modülü ekim"
    ],
    "baslik": "MEB Norm Kadro Yönetmeliği & Yıllık Ders Yükü Güncellemesi",
    "ikon": "👥",
    "renk": "#FEF08A",
    "varsayilanZaman": "Her Yıl Ekim Ayı İçinde",
    "akilliFisilti": "📚 Şube ve öğrenci sayılarına göre branş bazında haftalık ders yükü hesaplanarak MEBBİS Norm modülüne işlenir.",
    "oncedenYapilacaklar": [
      "Okulun onaylı şube ve sınıf listelerindeki toplam öğrenci sayılarını e-Okul üzerinden doğrula",
      "Haftalık ders çizelgelerine göre her branşın toplam zorunlu ve seçmeli ders saatini hesapla",
      "21 saate 1 norm kuralına göre branş bazlı öğretmen ihtiyacını ve norm fazlası personeli belirle",
      "MEBBİS Norm İşlemleri modülünden veri girişini tamamlayıp İlçe MEM onayına sun"
    ]
  },
  {
    "id": "egitim_okul_aile_birligi_tefbik_gelir_gider",
    "category": "finans",
    "domain": "EGITIM",
    "keywords": [
      "okul aile birliği tefbis",
      "tefbis gelir gider kaydı",
      "kantin kira geliri tefbis",
      "okul aile birliği genel kurul ekim"
    ],
    "baslik": "MEB TEFBİS Okul Aile Birliği Gelir-Gider & Genel Kurul",
    "ikon": "🏛️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Yıl Ekim Ayında Genel Kurul",
    "akilliFisilti": "📚 Okul Aile Birliğinin tüm bağış, kantin kirası ve harcama faturaları TEFBİS sistemine kaydedilmek zorundadır.",
    "oncedenYapilacaklar": [
      "Ekim ayında veli katılımıyla Okul Aile Birliği Olağan Genel Kurulunu toplayıp yeni Yönetim ve Denetim Kurulunu seç",
      "Kantin kira bedellerinin %80 okul, %10 ilçe MEM, %10 il MEM paylarını hesaplayarak ilgili hesaplara aktar",
      "Harcama faturalarını ve bağış makbuzlarını TEFBİS (Türkiye’de Eğitimin Finansmanı ve Eğitim Harcamaları Bilgi Sistemi) modülüne işle",
      "Denetim Kurulu ara raporunu 3 ayda bir panoda ilan ederek şeffaflık ilkesini sağla"
    ]
  },
  {
    "id": "egitim_erasmus_ka122_ka220_okul_akreditasyon",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "erasmus ka122 okul eğitimi",
      "türkiye ulusal ajansı proje",
      "öğretmen işbaşı gözlem hareketliliği",
      "erasmus bütçe yönetim"
    ],
    "baslik": "Erasmus+ KA122 / KA220 Okul Eğitimi Proje Başvurusu & Hareketlilik",
    "ikon": "🇪🇺",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Ulusal Ajans Çağrı Takvimi (Şubat/Ekim)",
    "akilliFisilti": "📚 Türkiye Ulusal Ajansı formatında Avrupa Gelişim Planı, kazanımlar ve yaygınlaştırma adımları projelendirilir.",
    "oncedenYapilacaklar": [
      "Okulun OID (Organisation ID) numarasını ve PIC kaydını European Commission portalında doğrula",
      "Proje konusuyla ilgili yurtdışı ev sahibi okul veya akredite eğitim merkeziyle Ön Kabul Mektubu (Letter of Intent) imzala",
      "Öğretmen işbaşı gözlem ve öğrenci grup hareketliliği bütçesini (Seyahat, bireysel destek, kurs ücreti) hesapla",
      "Ulusal Ajans E-Form başvurusunu tamamlayıp e-İmzalı olarak resmi teslimi gerçekleştir"
    ]
  },
  {
    "id": "egitim_pansiyonlu_okul_belletici_nobet_iaşe",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "pansiyon belletici öğretmen nöbeti",
      "pansiyon günlük iaşe tabelası",
      "öğrenci pansiyon yoklama 23:00",
      "belletmen ek ders puantaj"
    ],
    "baslik": "MEB Pansiyonlu Okul Belletici Öğretmen Nöbeti & Günlük İaşe",
    "ikon": "🛏️",
    "renk": "#FEF08A",
    "varsayilanZaman": "24 Saatlik Nöbet Periyodu",
    "akilliFisilti": "📚 Belletici öğretmen pansiyonda 24 saat nöbet tutar; akşam etüdü, yat yoklaması ve iaşe tabelasını denetler.",
    "oncedenYapilacaklar": [
      "Günlük İaşe Tabelasında kişi başı gramaj ve kalori değerlerinin yemek listesine uygunluğunu kontrol et",
      "Akşam etüt saatlerinde (19:00 - 21:00) tüm öğrencilerin etüt salonlarında yoklamasını al",
      "Saat 23:00 gece yat yoklamasını yatakhanede fiziki olarak yapıp \"Pansiyon Nöbet Defteri\"ni imzala",
      "Nöbet süresince gelişen acil sağlık veya disiplin durumlarını derhal Nöbetçi Müdür Yardımcısına bildir"
    ]
  },
  {
    "id": "egitim_ortaogretim_sorumluluk_sinavlari_komisyon",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "sorumluluk sınavları takvimi",
      "sorumluluk sınav komisyon tutanağı",
      "ders yılı başı sorumluluk eylül",
      "sorumluluk not fişi e-okul"
    ],
    "baslik": "MEB Ortaöğretim Sorumluluk Sınavları & Komisyon Tutanakları",
    "ikon": "📝",
    "renk": "#FEF08A",
    "varsayilanZaman": "Eylül / Şubat Sınav Dönemi",
    "akilliFisilti": "📚 Başarısız dersi olan öğrencilerin sorumluluk sınavları ders yılı başında 2 öğretmenli komisyonca yapılır.",
    "oncedenYapilacaklar": [
      "e-Okul sisteminden okulda sorumlu dersi bulunan öğrencilerin branş bazlı listesini çıkar",
      "Her sınav için 2 asil 1 yedek branş öğretmeninden oluşan Sınav İhtisas Komisyonunu görevlendir",
      "Sınav soruları, cevap anahtarı ve puanlama baremini mühürlü zarf içinde okul müdürüne onaylat",
      "Sınav bitiminde sınav evrakı ve \"Sorumluluk Sınav Not Çizelgesi\"ni teslim alarak e-Okul sistemine notları işle"
    ]
  },
  {
    "id": "kamu_ebys_standart_dosya_plani_sdp_paraf_akisi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "ebys standart dosya planı sdp",
      "resmi yazı paraf silsilesi",
      "e-imza nitelikli elektronik sertifika",
      "belgenet evrak onay"
    ],
    "baslik": "EBYS / Belgenet: Standart Dosya Planı (SDP) & E-İmza Paraf Akışı",
    "ikon": "🏛️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Mesai İçi (17:00 Öncesi)",
    "akilliFisilti": "🏛️ Resmi Yazışmalarda Uygulanacak Usul ve Esaslar Yönetmeliğine göre yanlış SDP kodu seçilen evraklar arşivde tasnif dışı kalır.",
    "oncedenYapilacaklar": [
      "Yazının konusuna tam uyan Standart Dosya Planı (SDP) ana ve alt dosya kodunu (örneğin 903.02) sistemden seç",
      "Resmi yazı metnini kılavuzdaki font, satır aralığı, \"Rica ederim / Arz ederim\" hiyerarşi kurallarına uygun düzenle",
      "Yazıyı Şef, Şube Müdürü ve Daire Başkanı hiyerarşik paraf silsilesine (iş akışına) gönder",
      "Nitelikli Elektronik Sertifika (e-İmza) takılı token ile nihai imza atarak resmi evrak barkod ve sayı/tarihini al"
    ]
  },
  {
    "id": "kamu_4734_dogrudan_temin_22_d_piyasa_fiyat_arastirma",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "doğrudan temin 22 d piyasa fiyat araştırması",
      "ihale onay belgesi komisyon tutanağı",
      "harcama yetkilisi onay belgesi",
      "proforma fatura kamu"
    ],
    "baslik": "Kamu İhale: 4734 Sayılı Kanun 22/d Doğrudan Temin & Fiyat Araştırması",
    "ikon": "📜",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Alım Öncesi",
    "akilliFisilti": "🏛️ 22/d limitleri dahilinde yapılacak alımlarda en az 3 farklı firmadan kaşeli piyasa fiyat araştırma teklif mektubu toplanmalıdır.",
    "oncedenYapilacaklar": [
      "İhtiyaç duyulan mal/hizmet için teknik şartname ve Harcama Yetkilisince imzalı Onay Belgesini düzenle",
      "Piyasa Fiyat Araştırması Görevlendirme yazısıyla en az 3 yetkili satıcıdan proforma teklif mektubu topla",
      "Piyasa Fiyat Araştırma Tutanağını tanzim ederek en avantajlı teklifi sunan firmayı belirle ve komisyonca imzala",
      "Mal tesliminde Muayene ve Kabul Komisyon Tutanağını düzenleyip Taşınır İşlem Fişi (TİF) ile MYS sistemine bağla"
    ]
  },
  {
    "id": "kamu_cimer_bilgi_edinme_3071_yasal_cevap_suresi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "cimer başvuru cevaplama süresi",
      "3071 dilekçe hakkı yasal süre 30 gün",
      "bilgi edinme 15 gün cevap",
      "cimer ara cevap sevki"
    ],
    "baslik": "CİMER & Bilgi Edinme: Yasal 15/30 Gün Süre & Resmi Yanıt Tanzimi",
    "ikon": "📬",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Yasal Süre İçinde",
    "akilliFisilti": "🏛️ 4982 Sayılı Bilgi Edinme Kanununda 15 iş günü, CİMER/3071 Sayılı Dilekçe Kanununda 30 günlük kesin cevaplama süresi vardır.",
    "oncedenYapilacaklar": [
      "CİMER kurum koordinatör havuzuna düşen başvuruyu ilgili alt birime sevk ederek 3 iş günü içinde teknik bilgi iste",
      "İstenen bilgi başka kurumu ilgilendiriyorsa başvuru sahibine sistem üzerinden yasal sürede Görev Yönlendirme Bildirimi yap",
      "Vatandaşın talebine net, bürokratik dilden uzak, mevzuat dayanaklı resmi cevap taslağını hazırla",
      "Harcama Yetkilisi / Birim Amiri onayından sonra cevabı CİMER sistemine yükleyerek başvuruyu kapat"
    ]
  },
  {
    "id": "kamu_disiplin_sorusturmasi_657_savunma_istemi_7_gun",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "657 disiplin soruşturması savunma istemi",
      "7 gün savunma süresi kamu",
      "muhakkik görevlendirme raporu",
      "disiplin cezası itiraz"
    ],
    "baslik": "657 DMK: Disiplin Soruşturması, Muhakkik Atama & 7 Günlük Savunma",
    "ikon": "⚖️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Yasal Takvim",
    "akilliFisilti": "🏛️ 657 Sayılı Kanun Madde 130 gereği memura en az 7 GÜN süre verilmeden ve isnat edilen fiil açıkça belirtilmeden disiplin cezası verilemez.",
    "oncedenYapilacaklar": [
      "Disiplin Amiri tarafından soruşturulan memurdan kıdemce üst veya eşit düzeyde bağımsız bir Muhakkik görevlendir",
      "İddia edilen fiili, yeri ve zamanı açıkça belirten \"Savunma İstemi Yazısı\"nı memura tebliğ-tebellüğ belgesiyle imzalatarak tebliğ et",
      "Tebliğ tarihinden itibaren 7 günlük savunma süresini bekle; tanık ifadeleri ve kurum kayıtlarını dosyaya ekle",
      "Muhakkik Soruşturma Raporunu tamamlayarak Disiplin Kuruluna veya Disiplin Amirine karar için tevdi et"
    ]
  },
  {
    "id": "kamu_devlet_arsivleri_ayiklama_ve_imha_komisyonu",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "devlet arşivleri ayıklama imha komisyonu",
      "kurum arşivi saklama süresi",
      "arşiv malzemesi imha listesi",
      "devlet arşivleri başkanlığı onay"
    ],
    "baslik": "Devlet Arşivleri: Ayıklama, İmha Komisyonu & Saklama Planı",
    "ikon": "🗄️",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Yıllık Arşiv Dönemi",
    "akilliFisilti": "🏛️ Saklama süresi dolan evraklar Devlet Arşivleri Başkanlığı onayı ve 3 kişilik Ayıklama ve İmha Komisyonu tutanağı olmadan imha edilemez.",
    "oncedenYapilacaklar": [
      "Birim arşivlerinde 5 yıllık bekleme süresini tamamlayan dosyaları Kurum Arşivine devir-teslim listesiyle aktar",
      "Kurum Arşivinde saklama planına göre tarihi değeri olmayan ve yasal saklama süresi (10-15 yıl) dolan evrakları ayıkla",
      "Ayıklama ve İmha Komisyonu marifetiyle \"İmha Edilecek Evrak Listesi\"ni tanzim edip Devlet Arşivleri Başkanlığına gönder",
      "Onay geldikten sonra evrakları kağıt hamuru/kırma yöntemleriyle tutanak ve kamera kaydı eşliğinde imha et"
    ]
  },
  {
    "id": "med_ses_mastering_lufs_entegre_true_peak_itu_r_bs1770",
    "category": "ev_teknik",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "mastering lufs true peak ayarı",
      "spotify -14 lufs mastering",
      "itu r bs 1770 loudness standardı",
      "ebr 128 televizyon ses standardı"
    ],
    "baslik": "Audio Mastering: Entegre LUFS & True-Peak Limit Ayarı",
    "ikon": "🎚️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Mastering Çıktısı",
    "akilliFisilti": "🎙️ Dijital platformlarda dinamik aralık kaybını (Gain Reduction) önlemek için Spotify/Apple Music için -14 LUFS ve -1.0 dB True-Peak hedefleyin.",
    "oncedenYapilacaklar": [
      "Master kanalında ITU-R BS.1770 / EBU R128 uyumlu Loudness Meter açarak entegre ve anlık (Short-Term) LUFS değerini ölç",
      "True-Peak Limiter ile inter-sample pikleri önlemek için tavan seviyesini (Ceiling) -1.0 dBTP (veya -0.5 dBTP) olarak sınırla",
      "Yayın mecrasına göre hedefi ayarla: Dijital Müzik (-14 LUFS), YouTube Video (-14 LUFS), TV/Radyo Yayın (-23 LUFS)",
      "Mono uyumluluk (Correlation Meter +0.6 üstü) ve 24-bit / 48kHz WAV dither çıktısını doğrula"
    ]
  },
  {
    "id": "med_video_aces_renk_yonetimi_rec709_hdr_transform",
    "category": "ev_teknik",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "aces renk yönetimi video",
      "acescc idt odt renk dönüşümü",
      "rec 709 gamma 2.4 grading",
      "hdr pq st2084 renk ayarı"
    ],
    "baslik": "Sinematik Renk: ACES Renk Uzayı & Rec.709 / HDR ODT Dönüşümü",
    "ikon": "🎬",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Post-Prodüksiyon Renk Günü",
    "akilliFisilti": "🎥 ACES (Academy Color Encoding System) renk boru hattı kamera Log formatlarındaki dinamik aralığı kayıpsız korur.",
    "oncedenYapilacaklar": [
      "DaVinci Resolve / Premiere projesinde Renk Yönetimini (Color Management) ACEScc veya ACEScct olarak ayarla",
      "Kamera ham görüntülerinin (ARRI LogC, Sony S-Log3, RED Log3G10) Giriş Dönüşümünü (IDT) otomatik veya manuel ata",
      "Nihai teslimat ekranına göre Çıkış Cihaz Dönüşümünü (ODT) Rec.709 100 nit veya Rec.2100 PQ 1000 nit HDR olarak belirle",
      "Vektörskop ve dalga formu (Waveform) üzerinde ten rengi çizgisini (Skin Tone Indicator) ve siyah/beyaz kırpılmalarını kontrol et"
    ]
  },
  {
    "id": "med_matbaa_ofset_baski_cmyk_tram_nokta_kazanci",
    "category": "ev_teknik",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "ofset baskı cmyk nokta kazancı",
      "tram sıklığı 175 lpi matbaa",
      "toplam mürekkep yoğunluğu tic %300",
      "pantone renk ayrımı ctp"
    ],
    "baslik": "Matbaa & Ofset: CMYK Nokta Kazancı (Dot Gain) & CTP Kalıp Kontrolü",
    "ikon": "🖨️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Baskı Öncesi (Pre-Press)",
    "akilliFisilti": "🎨 Kuşe kağıtta toplam mürekkep yoğunluğu (TIC/TAC) %300'ü, 1. hamur kağıtta %260'ı geçerse mürekkep arka yüze geçer (lekeleme yapar).",
    "oncedenYapilacaklar": [
      "PDF/X-1a standart baskı dosyasında RGB ögeleri CMYK (ISO Coated v2 / FOGRA39) profiline dönüştür",
      "Metinlerdeki siyahların 4 renk (Cly C:60 M:50 Y:50 K:100) değil saf K:100 olduğundan ve Overprint Black açık olduğundan emin ol",
      "CTP (Computer to Plate) lazer kalıp pozlama cihazında 175 LPI tram sıklığı ve %50 kontrol noktası linearizasyonunu densitometreyle ölç",
      "Baskı makinesi haznesindeki mürekkep viskozitesi ve nemlendirme suyu alkol/pH (%10 alkol, 4.8 - 5.5 pH) dengesini ayarla"
    ]
  },
  {
    "id": "med_telif_haklari_fsek_eser_tescili_ve_muvafakatname",
    "category": "resmi",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "fsek telif hakkı devir sözleşmesi",
      "kültür bakanlığı eser tescili isteğe bağlı",
      "oyuncu muvafakatname telif devri",
      "müzik senkronizasyon lisansı"
    ],
    "baslik": "5846 FSEK: Eser Sahipliği Tescili & Hak Devir / Muvafakatname",
    "ikon": "📜",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yayın / Dağıtım Öncesi",
    "akilliFisilti": "🎙️ FSEK Madde 52 gereği mali hak devirleri yazılı olmak, devredilen hakları (İşleme, Çoğaltma, Yayma, Temsil) tek tek açıkça saymak zorundadır.",
    "oncedenYapilacaklar": [
      "Kültür ve Turizm Bakanlığı Telif Hakları Genel Müdürlüğü portalı üzerinden İsteğe Bağlı Kayıt Tescil başvurusunu yap",
      "Senarist, besteci, yönetmen ve oyuncularla süre, yer ve sayı bakımından sınırsız \"Mali Hak Devir Sözleşmesi\" imzala",
      "Video prodüksiyonunda kullanılan arka plan müzikleri için MESAM/MSG/MÜ-YAP lisanslama veya ticari Sync License belgesi al",
      "Seslendirme ve görüntü veren tüm şahıslardan KVKK ve ticari kullanım izin muvafakatnamesi dosyala"
    ]
  },
  {
    "id": "med_canli_yayin_ob_van_sdi_genlock_ve_srt_yedekleme",
    "category": "ev_teknik",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "canlı yayın genlock blackburst",
      "ob van sdi sinyal senkronizasyonu",
      "srt rtmp yayın iletim yedekliliği",
      "canlı yayın frame sync"
    ],
    "baslik": "Canlı Yayın (OB Van): Genlock Referans Kilitleme & SRT Yayın İletimi",
    "ikon": "📡",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Yayın Başlamadan 45 Dk Önce",
    "akilliFisilti": "🎥 Tüm kameralar ve mikser tek bir Blackburst/Tri-Level Genlock referans jeneratörüne kilitlenmezse görüntü geçişlerinde kare atlaması (glitch) olur.",
    "oncedenYapilacaklar": [
      "Tüm stüdyo ve saha kameralarına Tri-Level Sync / Blackburst referans BNC kablolarını bağlayarak Genlock kilidini doğrula",
      "Görüntü mikseri (Vision Mixer) girişlerindeki 12G/3G-SDI sinyal formatlarını (1080p50 veya 4K50) eşitle",
      "Ana iletim hattı (Satellite uplink veya Fiber) yanına internet üzerinden 1500ms tamponlu SRT (Caller/Listener) yedek akış aç",
      "Reji interkom kulaklık (Tally & Intercom) matrisini test edip geri sayım ile canlı yayına gir"
    ]
  },
  {
    "id": "kua_sac_rengi_tonlama_toner_ve_pigmentasyon_on_dolgu",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "saç ön dolgu repigmentasyon",
      "toner tonlama formülü kuaför",
      "açılmış saçta dorelik kırma",
      "küçük numara ile pigment yükleme"
    ],
    "baslik": "Renklendirme: Ön Dolgu (Repigmentasyon) & Toner Tonlama Formülü",
    "ikon": "🎨",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Boya Öncesi / Cila Anı",
    "akilliFisilti": "✂️ Açık sarıdan koyu kahveye geçerken ön dolgu (kırmızı/bakır pigment) yapılmazsa saç mat yeşil ve çamurlu bir tona dönüşür.",
    "oncedenYapilacaklar": [
      "Açılmış saçın hedef ton seviyesini (örneğin 9.0'dan 5.0'a iniş) ve kayıp sıcak alt tonunu (kırmızı/turuncu) belirle",
      "Sıcak tonlu boyayı suyla 1:2 seyrelterek saça kuru halde ön dolgu pigment yüklemesi yap ve 10 dk beklet",
      "Hedef ana rengi 10 veya 20 volüm oksidanla yıkanmamış saça uygulayarak pigmentin saça kilitlenmesini sağla",
      "Açma işlemlerinde sarılıkları nötralize etmek için 9.1 / 9.22 menekşe-kül bazlı toner ile lavaboda 5-10 dk cila geç"
    ]
  },
  {
    "id": "kua_sac_kaynak_italyan_keratin_ve_nano_halka_uygulamasi",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "keratin kaynak saç montajı",
      "mikro kaynak ultrasonik pres",
      "nano halka mikro boncuk kaynak",
      "saç kaynak söküm solüsyonu"
    ],
    "baslik": "Medikal Saç Uzatma: İtalyan Keratin Mikro Kaynak & Nano Halka",
    "ikon": "💇‍♀️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Randevu Süresi (2-3 Saat)",
    "akilliFisilti": "✂️ Keratin kapsül kafa derisinden tam 0.5 - 1.0 cm mesafede ve saçın doğal düşüş açısına uygun düzlükte monte edilmelidir.",
    "oncedenYapilacaklar": [
      "Müşterinin saçını sülfatsız arındırıcı şampuanla yıkayıp krem sürmeden fönle kurut",
      "Saç ayırma diski ve koruyucu plaket ile 1 cm²'lik temiz kare tutamlar ayır",
      "İtalyan sert şeffaf keratini 180°C sıcak pres maşasıyla eritip parmak koruyucu ile yuvarlak/yassı pirinç tanesi formunda sıkıştır",
      "Söküm işlemlerinde saç kökünü koparmamak için özel alkollü keratin sökücü sıvı ve pensesini kullan"
    ]
  },
  {
    "id": "kua_lazer_epilasyon_cilt_fitzpatrick_ve_joule_enerji",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "lazer epilasyon fitzpatrick cilt tipi",
      "alexandrite diyot lazer joule ayarı",
      "lazer epilasyon yanık testi",
      "lazer atım süresi pulse width"
    ],
    "baslik": "Lazer Epilasyon: Fitzpatrick Cilt Analizi & Spot/Joule Parametre Ayarı",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Seans Öncesi",
    "akilliFisilti": "✂️ Koyu tenli (Fitzpatrick Tip IV/V) danışanlarda yüksek Joule ve kısa Pulse süresi ciltte kalıcı leke ve 2. derece yanık oluşturur.",
    "oncedenYapilacaklar": [
      "Danışanın cilt fototipini (Tip I-VI), kıl kalınlığını ve melanin yoğunluğunu analiz et",
      "Güneşlenme/solaryum geçmişi (son 4 hafta) ve fotosensitizan ilaç (Roaccutane vb.) kullanımını sorgula",
      "Diyot veya Alexandrite cihazında güvenli Joule/cm², milisaniye (Pulse Width) ve buz başlık soğutmasını ayarla",
      "Küçük bir test atışı (Spot Test) yaparak 10 dakika boyunca eritem ve perifoliküler ödem tepkisini gözlemle"
    ]
  },
  {
    "id": "kua_ipek_kirpik_izolasyon_ve_siyanoakrilat_yapistirici",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "ipek kirpik izolasyon tekniği",
      "kirpik yapıştırıcı siyanoakrilat nem",
      "volume lash kirpik fanı",
      "kirpik alerji yaması"
    ],
    "baslik": "İpek Kirpik & Volume Lash: Cımbız İzolasyonu & Nemli Polimerizasyon",
    "ikon": "👁️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Uygulama Süresi (90 Dk)",
    "akilliFisilti": "✂️ Kirpik yapıştırıcısı (Siyanoakrilat) ortam nemi (%45-60) ile sertleşir; yapıştırıcı göze kaçmamalı ve doğal kirpik dibine 0.5mm mesafede takılmalıdır.",
    "oncedenYapilacaklar": [
      "Göz altına hidrojelli koruyucu pedi yerleştirerek alt kirpikleri tamamen izole et",
      "Sol eldeki kavisli cımbızla tek bir doğal kirpiği diğer tüm kirpiklerden %100 izole et",
      "Sağ eldeki hacim cımbızıyla alınan vizon/ipek kirpik fanının tabanını mikro damla medikal yapıştırıcıya batır",
      "Uygulama sonunda buhar jeneratörü (Nano Mister) ile 30 saniye buhar vererek yapıştırıcı buharını nötralize et"
    ]
  },
  {
    "id": "kua_manikur_otoklav_sterilizasyon_ve_freze_kuru_manikur",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "kuru kombi manikür freze ucu",
      "manikür aletleri otoklav sterilizasyon",
      "elmas freze kütikül temizliği",
      "tırnak mantarı tırnak eti bakımı"
    ],
    "baslik": "Kuru Kombi Manikür: Elmas Freze Uçları & Otoklav Sterilizasyonu",
    "ikon": "💅",
    "renk": "#F1F5F9",
    "varsayilanZaman": "İşlem Başı",
    "akilliFisilti": "✂️ Manikür pens ve freze uçları her müşteriden sonra ultrasonik yıkamadan geçirilip kilitli poşette 134°C otoklavda steril edilmelidir.",
    "oncedenYapilacaklar": [
      "Otoklavdan çıkan steril indikatörlü poşeti müşterinin gözü önünde aç",
      "Alev uçlu elmas freze ile 15.000 RPM devirde tırnak etini (eponikyum) tırnak plağından nazikçe kaldır",
      "Top (bilye) freze ucu ile ölü deriyi ve yan tırnak etlerini su değdirmeden pürüzsüzce temizle",
      "İşlem sonrası tırnak plağını izopropil alkol ve dehidaratör ile temizleyip tırnak eti besleyici yağ sür"
    ]
  },
  {
    "id": "egitim_meb_ucretli_ogretmenlik_sgk_sozlesme",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "ücretli öğretmenlik sözleşmesi",
      "ders saati ücreti sgk primi",
      "ücretli öğretmen puantaj",
      "mebbis ücretli öğretmen onay"
    ],
    "baslik": "MEB Ücretli Öğretmenlik Görevlendirme & SGK Puantajı",
    "ikon": "📋",
    "renk": "#FEF08A",
    "varsayilanZaman": "Dönem Başı & Aylık 20-25’i",
    "akilliFisilti": "📚 Ücretli öğretmenlerin SGK prim gün sayısı fiilen girdikleri haftalık ders saati toplamının 7.5’e bölünmesiyle hesaplanır.",
    "oncedenYapilacaklar": [
      "İlçe Milli Eğitim Müdürlüğü onaylı görevlendirme yazısını ve adli sicil/diploma evraklarını kontrol et",
      "Öğretmenin MEBBİS modülüne ders tanımlamasını yapıp e-Okul not giriş yetkilerini aç",
      "Aylık ek ders puantajında girilen toplam ders saatini hesaplayarak SGK E-Bildirge sistemine prim gün sayısını gir",
      "Dönem sonunda veya istifa halinde derhal SGK çıkış bildirgesini yasal 10 günlük sürede ver"
    ]
  },
  {
    "id": "egitim_okul_kantin_denetim_hijyen_logosu",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "okul kantini denetim formu",
      "kantin hijyen belgesi",
      "okul gıdası logosu denetim",
      "gazlı içecek cips yasağı"
    ],
    "baslik": "MEB & Tarım Bakanlığı Okul Kantini Aylık Hijyen Denetimi",
    "ikon": "🥪",
    "renk": "#FEF08A",
    "varsayilanZaman": "Her Ayın 2. Haftası",
    "akilliFisilti": "📚 Okul kantinlerinde satışı yasak olan gazlı içecek, cips ve kızartmalar denetlenir; Okul Gıdası Logosu aranır.",
    "oncedenYapilacaklar": [
      "Okul Kantin Denetim Komisyonu (Müdür Yrd., Biyoloji/Sağlık Öğretmeni, Okul Aile Birliği) heyetini topla",
      "Kantin çalışanlarının Hijyen Eğitimi Belgelerini, portör muayenelerini ve bone/önlük kullanımını kontrol et",
      "Buzdolabı sıcaklıklarını (+4°C şarküteri / -18°C dondurma) ve son kullanma tarihlerini tek tek incele",
      "MEB Standart Okul Kantini Denetim Formunu doldurarak işletmeciye tebliğ et ve kopyasını İlçe MEM’e gönder"
    ]
  },
  {
    "id": "egitim_universite_yoksis_akademik_tesvik",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "akademik teşvik ödeneği başvurusu",
      "yöksis puan hesaplama",
      "sci sci-e makale puanı",
      "akademik teşvik komisyonu"
    ],
    "baslik": "YÖK Akademik Teşvik Başvurusu & YÖKSİS Puan Doğrulama",
    "ikon": "🎓",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Her Yıl Ocak Ayı İçinde",
    "akilliFisilti": "📚 Akademik teşvik ödeneğinde SCI/SSCI makale, bildiri, patent ve atıf puanlarının toplamı en az 30 barajını geçmelidir.",
    "oncedenYapilacaklar": [
      "Geçmiş takvim yılına ait makale, kitap, bildiri ve proje kanıt belgelerini YÖKSİS sistemine PDF olarak yükle",
      "SCI/SSCI indeksli dergilerin Q1/Q2/Q3 çeyreklik dilimlerini ve WoS atıf raporlarını dosyaya bağla",
      "Bölüm ve Fakülte Akademik Teşvik Komisyonu ön inceleme raporunda ham puanların doğruluğunu kontrol et",
      "Rektörlük nihai onayından sonra kesinleşen akademik teşvik katsayısını üniversite personeline ilan et"
    ]
  },
  {
    "id": "egitim_meb_pansiyon_belletmenlik_nobet_cizelgesi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "pansiyon belletmen öğretmen nöbeti",
      "yatılı okul etüt yoklaması",
      "pansiyon revir ve iaşe föyü",
      "belletmen ek ders puantajı"
    ],
    "baslik": "MEB Yatılı Pansiyon Belletici Öğretmen Nöbeti & Etüt Föyü",
    "ikon": "🛏️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Haftalık / Günlük Saat 17:00-08:00",
    "akilliFisilti": "📚 Belletmen öğretmenler akşam etüdü yoklaması, yatakhane sayımı ve gece bina emniyetinden 24 saat sorumludur.",
    "oncedenYapilacaklar": [
      "Aylık pansiyon nöbet çizelgesini hazırlayıp öğretmenlerin 24 saatlik belletmenlik görevlendirme olurunu al",
      "Akşam etütlerinde öğrenci yoklamasını alıp katılmayan öğrencilerin durumunu nöbet defterine kaydet",
      "Gece saat 23:00 yatakhane sayımını bizzat yaparak dış kapıların ve yangın merdivenlerinin kilitli/açık durumunu kontrol et",
      "Sabah kahvaltı ve pansiyon devir-teslim tutanağını imzalayarak 6 saatlik belletmenlik ek ders ücretini puantaja işle"
    ]
  },
  {
    "id": "egitim_erasmus_plus_ka131_ogrenci_staj_hareketliligi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "erasmus öğrenim hareketliliği",
      "learning agreement la onayı",
      "erasmus hibe sözleşmesi",
      "ects kredi tanınırlığı"
    ],
    "baslik": "Üniversite Erasmus+ KA131 Öğrenci Öğrenim Hareketliliği & LA",
    "ikon": "🌍",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Dönem Öncesi / Seçim Takvimi",
    "akilliFisilti": "📚 Yurtdışında alınacak derslerin Learning Agreement (LA) ile bölüme intibakı yapılarak 30 ECTS tanınırlığı garanti edilir.",
    "oncedenYapilacaklar": [
      "Erasmus yabancı dil sınavı ve GANO puanı ağırlığı (%50 dil + %50 GANO) ile asil/yedek sıralama listesini ilan et",
      "Öğrencinin gideceği üniversitedeki ders programı ile kendi bölümü arasında ECTS eşdeğerlik \"Learning Agreement\" formunu imzalat",
      "Ulusal Ajans formatına uygun Erasmus+ Hibe Sözleşmesini düzenleyip vize kolaylaştırıcı resmi teyit mektubunu ver",
      "Dönüşte Transkript ve Katılım Sertifikasını (After the Mobility) alarak intibak kararını Fakülte Yönetim Kurulundan çıkar"
    ]
  },
  {
    "id": "medya_broadcast_ses_lufs_itu_r_bs1770_mastering",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "lufs ses seviyesi -23 lufs ebu r128",
      "itu r bs 1770 loudness",
      "true peak -1 dbfs limiter",
      "youtube loudness -14 lufs"
    ],
    "baslik": "EBU R128 & ITU-R BS.1770 Yayın Standartlarında Loudness (-23 LUFS / -14 LUFS)",
    "ikon": "🎙️",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Ses Post-Prodüksiyon / Export Öncesi",
    "akilliFisilti": "🎬 TV yayını için Entegre Loudness -23 LUFS (±0.5), YouTube/Spotify için -14 LUFS ve Max True Peak -1.0 dBFS olmalıdır.",
    "oncedenYapilacaklar": [
      "DAW üzerinde Loudness Meter eklentisini (Youlean / TC Electronic) ana master kanalına ekle",
      "Entegre Ses Şiddetini (Integrated Loudness) yayın platformuna göre ayarla (TV: -23 LUFS, Dijital: -14 LUFS)",
      "Dijital kırpılma ve distorsiyonu önlemek için True Peak Limiter tavanını -1.0 dBFS (veya -2.0 dBFS) seviyesine kilitle",
      "Loudness Range (LRA) dinamik aralığının diyalog netliği için 8-12 LU aralığında olduğunu doğrula"
    ]
  },
  {
    "id": "medya_renk_derecelendirme_aces_rec709_lut_dci_p3",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "aces renk uzayı color grading",
      "rec 709 dci p3 export",
      "davinci resolve cst color space transform",
      "log çekim lut uygulama"
    ],
    "baslik": "Renk Derecelendirme: ACEScc İş Akışı & Rec.709 / DCI-P3 Renk Uzayı",
    "ikon": "🎨",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Kurgu Kilitleme (Picture Lock) Sonrası",
    "akilliFisilti": "🎬 Log çekilen ham görüntüler ACES / CST dönüşümüyle Rec.709 Gamma 2.4 (Web/TV) veya DCI-P3 (Sinema) formatına dönüştürülür.",
    "oncedenYapilacaklar": [
      "Kamera ham Log formatını (Arri LogC, S-Log3, C-Log) Color Space Transform (CST) düğümü ile geniş gamutlu ACEScc uzayına al",
      "Vektörskop ve Dalga Formu (Waveform) üzerinde ten rengi çizgisini (Skin Tone Line) ve %70 IRE parlaklığını referansla",
      "Gölge ve parlak alanlarda klipleme (0 IRE altı veya 100 IRE üstü) olmaması için kontrast eğrisini sınırla",
      "Teslimat profiline göre Rec.709 / Rec.2020 / DCI-P3 kalibreli referans monitöründe renk onayını tamamla"
    ]
  },
  {
    "id": "medya_telif_haklari_fikir_ve_sanat_eserleri_muvafakat",
    "category": "resmi",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "5846 sayılı fsek muvafakatname",
      "oyuncu model release sözleşmesi",
      "müzik senkronizasyon telif hakkı",
      "fsek mali hak devir sözleşmesi"
    ],
    "baslik": "5846 Sayılı FSEK Kapsamında Model/Oyuncu Release & Mali Hak Devri",
    "ikon": "⚖️",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Çekim Başlangıcı / Set Öncesi",
    "akilliFisilti": "🎬 FSEK 52. madde uyarınca mali hak devirlerinin yazılı olması, işleme, çoğaltma, yayma haklarının tek tek sayılması şarttır.",
    "oncedenYapilacaklar": [
      "Görüntüsü ve sesi kaydedilen tüm oyuncu/figürasyon personeline ıslak imzalı \"Kişisel Veri ve Model Release Sözleşmesi\" imzalat",
      "Sözleşmede FSEK Madde 21-25 (İşleme, Çoğaltma, Yayma, Temsil, Umuma İletim) mali hak devirlerini süre/yer sınırlaması olmaksızın listele",
      "Kullanılan arka plan müzikleri için MESAM/MSG ve MÜ-YAP/Yapımcı senkronizasyon lisans belgelerini dosyala",
      "Marka logoları ve üçüncü şahıs sanat eserlerinin kadrajda telif riski oluşturmadığını denetle"
    ]
  },
  {
    "id": "medya_canli_yayin_ob_van_sdi_ve_srt_rtmp_yedeklilik",
    "category": "is_kariyer",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "canlı yayın sdi video sinyali",
      "srt rtmp yayın akışı encoder",
      "ob van reji uplink uydusu",
      "canlı yayın 1+1 yedekli internet"
    ],
    "baslik": "Canlı Yayın Rejisi: 12G-SDI Matris, SRT Protokolü & Yedekli (1+1) Uplink",
    "ikon": "📡",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Yayın Başlamadan 60 Dk Önce",
    "akilliFisilti": "🎬 Canlı yayında kesintiyi önlemek için birincil (Fiber/SDI) ve ikincil (Bonding LTE/SRT) bağımsız iletim hatları kurulur.",
    "oncedenYapilacaklar": [
      "Tüm kameraların 1080p50/4K sinyallerini Blackmagic/Grass Valley SDI matrisine girip Genlock ile senkronize et",
      "H.265 donanım kodlayıcı (Encoder) üzerinde düşük gecikmeli SRT (Secure Reliable Transport) veya RTMP akışını yapılandır",
      "Yedekli internet hattında (SIM Kartlı Bonding Cihazı) bant genişliği hız testini (Min: 20 Mbps Upload) doğrula",
      "Reji masası ile ana kumanda arasında interkom ve Tally ışıklarının çalıştığını test et"
    ]
  },
  {
    "id": "medya_gazetecilik_basin_ahlak_ve_tekzip_yayini",
    "category": "resmi",
    "domain": "SANAT_MEDYA",
    "keywords": [
      "5187 sayılı basın kanunu tekzip",
      "cevap ve düzeltme metni 3 gün",
      "basın ahlak esasları haber doğrulama",
      "masumiyet karinesi haber dili"
    ],
    "baslik": "5187 Sayılı Basın Kanunu: Cevap ve Düzeltme (Tekzip) Yayını & Etik",
    "ikon": "📰",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Noter İhtarı Tebliğinden İtibaren 3 Gün",
    "akilliFisilti": "🎬 Noter kanalıyla tebliğ edilen tekzip metni, internet medyasında 1 gün, basılı yayında en geç 3 gün içinde yayımlanır.",
    "oncedenYapilacaklar": [
      "Yayımlanacak haber metninde 5187 sayılı Basın Kanunu ve Masumiyet Karinesine aykırı kesin suçlama ifadelerini ayıkla",
      "Noterden gelen \"Cevap ve Düzeltme\" ihtarını hukuk danışmanına inceleterek Sulh Ceza Hakimliği kararını teyit et",
      "İnternet haber sitesinde tekzip metnini ilgili haberin bulunduğu URL altında, aynı puntolarla ve 1 hafta boyunca sabit tut",
      "Haber arşivinde düzeltme tarihini ve yargı karar numarasını şeffaf biçimde dipnot olarak ekle"
    ]
  },
  {
    "id": "guzellik_sac_acma_dekolorasyon_ve_olaplex_bag_koruyucu",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "saç açma dekolorasyon volüm",
      "oryal saç yanması elastikiyet testi",
      "olaplex bağ koruyucu bond multiplier",
      "saç tonlama cila 9.1"
    ],
    "baslik": "Kimyasal Saç Açma (Dekolorasyon): 20/30 Vol Oksidan & Bağ Koruyucu",
    "ikon": "💇‍♀️",
    "renk": "#F3E8FF",
    "varsayilanZaman": "İşlem Öncesi Test / Uygulama",
    "akilliFisilti": "💄 Saçın kopmasını önlemek için açıcı toz içine Pleks bağ koruyucu katılır ve 10 dakikada bir ıslak elastikiyet testi yapılır.",
    "oncedenYapilacaklar": [
      "İşlem öncesi saçın yıpranma durumunu analiz etmek için ense tutamından esneme/elastikiyet testi yap",
      "Açıcı pudra (Oryal) ile oksidanı (20 veya 30 Volüm) metal olmayan kapta 1:2 oranında homojen karıştır",
      "Karışıma saç disülfit bağlarını koruyan Bond Multiplier (Pleks) serumunu mililitrik olarak ilave et",
      "Kafa derisinden 1 cm uzaktan başlayarak sür; 40 dakikayı aşmadan ılık suyla durulayıp nötralize edici cila tonlamasını yap"
    ]
  },
  {
    "id": "guzellik_lazer_epilasyon_fitzpatrick_ve_joule_ayari",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "lazer epilasyon fitzpatrick cilt tipi",
      "aleksandrit diyot lazer joule ayarı",
      "lazer yanığı soğutma başlığı kriyo",
      "bronz tene lazer yapılmaz"
    ],
    "baslik": "Medikal Lazer Epilasyon: Fitzpatrick Cilt Tipi (I-VI) & Joule/Puls Ayarı",
    "ikon": "✨",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Seans Öncesi Cilt Analizi",
    "akilliFisilti": "💄 Fitzpatrick Cilt Tipi IV-VI (Koyu ten) olanlarda Alexandrite yerine Diode/Nd:YAG lazer ve düşük Joule seçilir.",
    "oncedenYapilacaklar": [
      "Danışanın cilt fototipini (Fitzpatrick I-VI) ve kıl melanin yoğunluğunu analiz ederek cihaz parametrelerini gir",
      "Son 4 hafta içinde güneşe maruz kalma/solaryum veya retinoik asit krem kullanımı olup olmadığını sorgula",
      "Cilt üzerindeki benleri ve kalıcı makyaj alanlarını beyaz medikal kapatıcı kalemle tamamen izole et",
      "Safir soğutma başlığının (-5°C) devrede olduğunu kontrol ederek atış aralıklarını üst üste binmeyecek (Overlap <%10) şekilde uygula"
    ]
  },
  {
    "id": "guzellik_hydrafacial_medikal_cilt_bakimi_asitler",
    "category": "saglik",
    "domain": "KUAFOR",
    "keywords": [
      "hydrafacial medikal cilt bakımı",
      "salisilik asit bha gözenek vakum",
      "glikolik asit aha peeling",
      "cilt bakımı led terapi maskesi"
    ],
    "baslik": "Hydrafacial Medikal Cilt Bakımı: Vortex Vakum & AHA/BHA Protokolü",
    "ikon": "🧖‍♀️",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Aylık Cilt Bakım Seansı (60 Dk)",
    "akilliFisilti": "💄 1. adımda Laktik Asit ile ölü deri arındırılır, 2. adımda Salisilik Asit ile T-bölgesi vakumlanır, 3. adımda Hyaluronik Asit infüze edilir.",
    "oncedenYapilacaklar": [
      "Cildi köpük temizleyici ile arındırıp dijital cilt analiz cihazında nem, yağ ve gözenek skorunu ölç",
      "Vortex spiral uç takılı vakum başlığı ile Solüsyon-1 (AHA/Glikolik Asit) vererek stratum corneum soyma işlemi yap",
      "T-bölgesi ve komedon yoğun alanlara Solüsyon-2 (BHA/Salisilik Asit) ile derin gözenek temizliği uygula",
      "Antioksidan ve Peptit solüsyonunu cilde yedirdikten sonra hücresel yenilenme için 15 dakika Kırmızı LED Işık Terapi uygula"
    ]
  },
  {
    "id": "guzellik_kalici_makyaj_microblading_sterilizasyon_ve_rotus",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "microblading kıl tekniği altın oran",
      "kalıcı makyaj pigment demir oksit",
      "tek kullanımlık mikro iğne ufp",
      "microblading 28 gün sonra rötuş"
    ],
    "baslik": "Microblading Kaş Tasarımı: Altın Oran Kumpası & 28 Günlük Rötuş",
    "ikon": "🪞",
    "renk": "#F3E8FF",
    "varsayilanZaman": "İlk Seans & 4 Hafta Sonrası",
    "akilliFisilti": "💄 Yüz simetrisi için altın oran kumpası ile ön çizim yapılır; epidermise atılan çizikler 28 günde kabuk atıp oturur.",
    "oncedenYapilacaklar": [
      "Altın oran kumpası ve ipli kaş cetveli ile danışanın yüz kemik yapısına uygun kaş formunu simetrik çizip onay al",
      "Tek kullanımlık steril U18 microblading bıçağını danışanın gözü önünde aç",
      "Cilt alt tonuna (Sıcak/Soğuk) uygun organik veya demir oksit bazlı pigment karışımını hazırla",
      "Epidermis tabakasına kontrollü kıl atışı yaptıktan sonra 28 gün sonrasına sabitleme ve rötuş seansını planla"
    ]
  },
  {
    "id": "guzellik_protez_tirnak_kuru_manikur_ve_otoklav_hijyen",
    "category": "kisisel_yasam",
    "domain": "KUAFOR",
    "keywords": [
      "protez tırnak kombi kuru manikür",
      "freze elmas uç kütikül temizleme",
      "otoklav cerrahi alet sterilizasyonu",
      "tırnak mantarı dehidrator asitsiz primer"
    ],
    "baslik": "Kombi Kuru Manikür, Freze Uç Hijyeni & Protez Tırnak Aplikasyonu",
    "ikon": "💅",
    "renk": "#F3E8FF",
    "varsayilanZaman": "Uygulama Öncesi Dezenfeksiyon",
    "akilliFisilti": "💄 Manikür aletleri her müşteride otoklav poşetinde 134°C’de sterilize edilir; tırnak plağına primer sürülerek mantar riski önlenir.",
    "oncedenYapilacaklar": [
      "Kullanılacak elmas ve karbid freze uçlarının Otoklavda sterilize edildiğini indikatör bandının renk değişiminden teyit et",
      "Freze alev uç ile kütikül ceplerini kaldırıp makasla tek hat halinde kuru manikür kesimini yap",
      "Tırnak plağının yağını almak için Dehydrator ve asitsiz Ph Bond Primer uygulayarak kurumaya bırak",
      "Jel/Akrilik tırnak modelajını UV/LED lambada 60 saniye polimerize edip kütikül besleyici yağ ile sonlandır"
    ]
  },
  {
    "id": "egitim_maarif_butuncul_gelisim_endeksi_analizi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "bütüncül gelişim endeksi maarif",
      "öz-düzenleme skalası maarif modeli",
      "akademik gelişim izleme karnesi",
      "öğrenci portfolyo değerlendirme",
      "sürece dayalı ölçme değerlendirme"
    ],
    "baslik": "Türkiye Yüzyılı Maarif Modeli: Bütüncül Gelişim & Süreç Odaklı Ölçme",
    "ikon": "📚",
    "renk": "#FEF08A",
    "varsayilanZaman": "Dönem İçi / Zümre Değerlendirme",
    "akilliFisilti": "📚 Maarif modelinde tek sınav odaklı not yerine bilişsel, sosyal ve duyuşsal becerileri kapsayan Bütüncül Gelişim Endeksi esas alınır.",
    "oncedenYapilacaklar": [
      "Öğrencinin Öz-Düzenleme Skalası ve sınıf içi etkileşim gözlem formlarını sisteme işle",
      "Kazanım bazlı süreç değerlendirme rubriklerini (Analitik dereceli puanlama) kontrol et",
      "Öğrenci gelişim portfolyosu (Gelişim Dosyası) ürün seçki kriterlerini doğrula",
      "Destekleme ve Yetiştirme Kursu (DYK) veya bireyselleştirilmiş gelişim takviye planı çıkar"
    ]
  },
  {
    "id": "egitim_belep_bireysellestirilmis_egitim_ve_ram_raporu",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "bireyselleştirilmiş eğitim programı bep",
      "ram eğitsel değerlendirme raporu",
      "özel eğitim bep birimi toplantısı",
      "kaynaştırma öğrencisi uyarlama",
      "destek eğitim odası planlama"
    ],
    "baslik": "Özel Eğitim Hizmetleri Yönetmeliği: BEP Geliştirme Birimi & RAM Rapor Takibi",
    "ikon": "🧩",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Eylül-Ekim / Dönem Başı",
    "akilliFisilti": "🧩 Kaynaştırma öğrencilerinin BEP planları RAM raporundaki eğitsel tanıya uygun olarak ders öğretmenleri ve rehberlik servisiyle birlikte hazırlanır.",
    "oncedenYapilacaklar": [
      "RAM Eğitsel Değerlendirme ve İzleme Raporundaki hedefleri incele",
      "BEP Geliştirme Birimi toplantısını organize et ve veli katılım tutanağını al",
      "Her ders için Uzun Dönemli (ÜDÖ) ve Kısa Dönemli (KDÖ) hedefleri içeren ders planı hazırla",
      "Destek Eğitim Odası haftalık ders saatlerini ve görev alacak öğretmenleri e-Müfredat üzerinden planla"
    ]
  },
  {
    "id": "egitim_dyk_kurs_modulu_ve_ogrenci_devam_takibi",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "dyk kurs modülü e-kurs meb",
      "destekleme ve yetiştirme kursu onay",
      "dyk öğrenci devamsızlık 1/5",
      "dyk denetim defteri e-müfredat",
      "kurs sınıfı açma onay"
    ],
    "baslik": "MEB Destekleme ve Yetiştirme Kursları (DYK) e-Kurs Modülü & Devamsızlık Takibi",
    "ikon": "📋",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Hafta Sonu / Kurs Başlangıcı",
    "akilliFisilti": "📋 DYK yönergesi gereği toplam ders saatinin 1/5’inden fazla mazeretsiz devamsızlık yapan öğrencinin kurs kaydı sistemden silinir.",
    "oncedenYapilacaklar": [
      "e-Kurs modülü üzerinden öğrenci tercih başvurularını ve sınıf mevcutlarını (12-24 kişi) onayla",
      "Kurs öğretmenlerinin e-Okul ve e-Müfredat ders defterlerini haftalık olarak kontrol et",
      "1/5 devamsızlık sınırını aşan öğrencilerin velilerine yazılı uyarı ve sistem düşümü yap",
      "Dönemlik DYK kazanım izleme sınavı sonuçlarını ve başarı analizlerini raporla"
    ]
  },
  {
    "id": "egitim_tubitak_4006_bilim_fuari_proje_protokolu",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "tübitak 4006 bilim fuarı",
      "tübitak proje yürütücüsü sözleşme",
      "araştırma tasarım inceleme alt projeleri",
      "tübitak fatura harcama kapatma",
      "bilim fuarı sergi izleme"
    ],
    "baslik": "TÜBİTAK 4006-A/B Bilim Fuarları Proje Yürütme & Mali Harcama Kapatma",
    "ikon": "🔬",
    "renk": "#DDD6FE",
    "varsayilanZaman": "Fuar Öncesi / Fatura Kapanış",
    "akilliFisilti": "🔬 Bilim fuarı harcamaları sadece TÜBİTAK proje hesabından yapılmalı; her harcamanın e-Fatura/e-Arşiv ve Vergi Kimlik No eşleşmesi şarttır.",
    "oncedenYapilacaklar": [
      "Onaylanan alt projelerin (Araştırma, Tasarım, İnceleme) öğrenci ve danışman görevlendirmelerini yap",
      "TÜBİTAK tarafından aktarılan destek tutarının harcamalarını faturalandır ve sistem yüklemesini yap",
      "Sergi alanında poster şablonu, stant düzeni ve güvenlik önlemlerini tamamla",
      "Fuar bitiminde TÜBİTAK İzleyicisi eşliğinde Sonuç Raporunu sisteme yükleyip mahsup işlemini kapat"
    ]
  },
  {
    "id": "egitim_meb_e_sinav_salon_baskanligi_ve_guvenlik",
    "category": "is_kariyer",
    "domain": "EGITIM",
    "keywords": [
      "meb e-sınav salon başkanlığı",
      "motorlu taşıt sürücü e-sınav",
      "e-sınav joker aday kontrolü",
      "e-sınav dedektör arama",
      "e-sınav tutanak kapatma"
    ],
    "baslik": "MEB e-Sınav Salon Başkanlığı, Biyometrik Kimlik & Güvenlik Protokolü",
    "ikon": "🖥️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Sınavdan 45 Dk Önce / Görev",
    "akilliFisilti": "🖥️ e-Sınav salonuna cep telefonu, akıllı saat veya dinleme cihazı sokulması durumunda sınav derhal iptal edilir ve 6114 sayılı Kanun gereği adli işlem başlatılır.",
    "oncedenYapilacaklar": [
      "Sınav başlama saatinden 45 dakika önce e-Sınav merkezinde hazır bulunup görev kartını tak",
      "Adayların fotoğraflı sınav giriş belgesi ve T.C. kimlik kartı doğrulamasını el dedektörü eşliğinde yap",
      "Dokunmatik sınav terminallerini kilit açma şifresiyle oturuma hazır hale getir",
      "Sınav bitiminde oturum sonlandırma tutanağını e-İmza veya fiziki imza ile mühürle"
    ]
  },
  {
    "id": "egitim_turkiye_yuzyili_maarif_modeli_beceri_temelli_olcme",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "türkiye yüzyılı maarif modeli beceri temelli program",
      "süreç odaklı değerlendirme dereceli puanlama anahtarı rubrik",
      "kavramsal beceriler ve eğilimler gözlem formu",
      "farklılaştırılmış öğretim zenginleştirme destekleme",
      "bütüncül gelişim profili e-portfolyo meb"
    ],
    "baslik": "Türkiye Yüzyılı Maarif Modeli: Süreç Odaklı Ölçme, Rubrik & Bütüncül Gelişim Raporu",
    "ikon": "🏫",
    "renk": "#FEF08A",
    "varsayilanZaman": "Zümre Toplantısı / Dönemlik Değerlendirme",
    "akilliFisilti": "🏫 Maarif Modelinde geleneksel sınav yerine süreç odaklı ölçme esastır; her kazanım için dereceli puanlama anahtarı (rubrik) ve beceri gözlem formu tanzim edilir.",
    "oncedenYapilacaklar": [
      "Ders zümrelerinde Maarif Modeli Taslak Öğretim Programı tema ve öğrenme çıktılarını incele",
      "Öğrencilerin kavramsal beceri, alan becerileri ve eğilimlerini ölçen Analitik Rubrik ölçeklerini hazırla",
      "Öğrenme güçlüğü çeken veya ileri düzey öğrencilere yönelik Farklılaştırılmış Öğretim planlarını oluştur",
      "e-Okul Sosyal Etkinlik ve Öğrenci Gelişim Dosyasına (e-Portfolyo) süreç kanıtlarını yükle"
    ]
  },
  {
    "id": "egitim_rehberlik_ram_yonlendirme_ve_bep_kurulu",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "bireyselleştirilmiş eğitim programı bep birimi toplantısı",
      "rehberlik ve araştırma merkezi ram eğitsel değerlendirme isteği",
      "özel eğitim ihtiyacı olan öğrenci destek eğitim odası",
      "bep gelişim izleme ve değerlendirme formu",
      "kaynaştırma bütünleştirme yoluyla eğitim tedbiri kararı"
    ],
    "baslik": "Özel Eğitim Hizmetleri: BEP Geliştirme Birimi, RAM Yönlendirme & Destek Eğitim Odası Planı",
    "ikon": "🤝",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Dönem Başı (İlk 1 Ay) & Yıl Sonu İnceleme",
    "akilliFisilti": "🤝 RAM raporu olan kaynaştırma öğrencileri için eğitim öğretim yılının ilk 1 ayı içinde BEP Birimi toplanarak Bireyselleştirilmiş Eğitim Planı onaylanmalıdır.",
    "oncedenYapilacaklar": [
      "Okul BEP Geliştirme Birimi (Müdür yrd, rehber öğretmen, sınıf öğretmeni, veli) toplantısını planla",
      "Öğrencinin performans düzeyine uygun ders bazlı yıllık BEP amaçlarını ve uyarlama yöntemlerini belirle",
      "Haftalık ders programında Destek Eğitim Odası ders saatlerini ve görev alacak öğretmenleri onayla",
      "Yıl sonunda RAM Eğitsel Değerlendirme İsteği Formunu doldurarak DYS üzerinden resmi sevk işlemini tamamla"
    ]
  },
  {
    "id": "egitim_meb_dys_resmi_yazisma_standart_dosya_plani_eimza",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "doküman yönetim sistemi dys gelen evrak havale",
      "standart dosya planı sdp kodu resmi yazı",
      "nitelikli elektronik sertifika e-imza onay akışı",
      "dys desimal dosya ve süreli evrak takibi meb",
      "ilçe milli eğitim müdürlüğü bilgi talebi günlü yazı"
    ],
    "baslik": "MEB DYS (Doküman Yönetim Sistemi): Standart Dosya Planı (SDP), Paraf Zinciri & e-İmza Akışı",
    "ikon": "🖋️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Günlük Mesai Başlangıcı (08:30 - 10:00)",
    "akilliFisilti": "🖋️ DYS üzerinden gelen \"Günlü ve İvedi\" ibareli resmi yazıların yasal süresi içinde cevaplandırılması ve SDP kodunun doğru seçilmesi idari zorunluluktur.",
    "oncedenYapilacaklar": [
      "DYS Gelen Evrak modülündeki yeni yazıları inceleyip ilgili müdür yardımcısına veya öğretmene havale et",
      "Kurum içi/dışı giden yazılarda Başbakanlık Standart Dosya Planı (SDP) desimal kodunu seç",
      "Yazı taslağını şef/müdür yardımcısı paraf zincirine sunup redaksiyon kontrolünü tamamla",
      "Okul Müdürü Nitelikli Elektronik Sertifikası (e-İmza) ile nihai imzayı atarak DYS üzerinden gönder"
    ]
  },
  {
    "id": "egitim_is_sagligi_ve_okul_guvenligi_risk_analizi",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "okul isg risk değerlendirme raporu mebbis",
      "yangın ve deprem tahliye tatbikatı tutanağı",
      "okul merdiven güvenlik filesi ve pencere kilit mandalı",
      "nöbetçi öğretmen nöbet defteri ve kat emniyet çizelgesi",
      "acil durum ekipleri söndürme kurtarma koruma ilk yardım"
    ],
    "baslik": "MEB İSG & Okul Güvenliği: MEBBİS Risk Analizi, Güvenlik Donatıları & Tahliye Tatbikatı",
    "ikon": "🛡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Dönem Başı / 6 Aylık Periyot",
    "akilliFisilti": "🛡️ MEB İSG yönergesi gereği okul merdiven boşluklarında güvenlik filesi, pencerelerde emniyet kilitleri ve dönemlik tahliye tatbikat tutanakları tam olmalıdır.",
    "oncedenYapilacaklar": [
      "MEBBİS İSG modülüne okulun güncel Risk Değerlendirme Raporu ve Acil Durum Eylem Planını gir",
      "Merdiven güvenlik fileleri, kazan dairesi havalandırması ve yangın dolabı basınçlarını kontrol et",
      "Dönemlik Deprem/Yangın Tahliye Tatbikatını icra edip tahliye süresini gösteren resmi tutanağı imzalat",
      "Nöbetçi öğretmenlerin bahçe, kat ve kantin nöbet yerlerini tebliğ edip Nöbet Defterini her gün denetle"
    ]
  },
  {
    "id": "egitim_ogrenci_odul_ve_disiplin_kurulu_savunma_tutanak",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "ortaöğretim ödül ve disiplin kurulu süreci",
      "öğrenci disiplin savunma istem yazısı 3 gün",
      "olay tespit ve tanık ifade tutanağı rehberlik görüşü",
      "disiplin cezası veli tebliği ve itiraz hakkı",
      "kınama okuldan kısa süreli uzaklaştırma kurul kararı"
    ],
    "baslik": "MEB Ödül ve Disiplin Kurulu: 3 Günlük Savunma Hakkı, Olay Tutanağı & Veli Tebliği",
    "ikon": "⚖️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Olay İntikalinden İtibaren 3 İş Günü",
    "akilliFisilti": "⚖️ Disiplin soruşturmasında öğrenciye yazılı olarak en az 3 iş günü savunma süresi verilmesi ve Rehberlik Servisi görüş raporunun alınması esastır.",
    "oncedenYapilacaklar": [
      "Nöbetçi öğretmen ve görgü tanıklarının imzalı Olay Tespit Tutanaklarını dosyaya al",
      "Rehberlik ve Psikolojik Danışma Servisinden öğrencinin sosyo-psikolojik gelişim raporunu talep et",
      "Öğrenciye ve velisine isnat edilen fiili açıklayan \"Yazılı Savunma İstemi\" yazısını tebliğ et (3 gün)",
      "Disiplin Kurulu toplantısını yapıp gerekçeli kararı karar defterine işle ve veliye resmi yazıyla bildir"
    ]
  },
  {
    "id": "egitim_dyk_kurslari_ekurs_ve_ogretmen_ek_ders_puantaji",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "meb destekleme ve yetiştirme kursları dyk kılavuzu",
      "e-kurs modülü öğrenci ve öğretmen ders seçimi",
      "dyk ek ders katsayısı yüzde 100 artırımlı ücret",
      "kurs sınıfı öğrenci sayısı minimum 12 ve devam takibi",
      "dyk denetim formu il ilçe milli eğitim müdürlüğü"
    ],
    "baslik": "MEB DYK: e-Kurs Modülü, %100 Artırımlı Ek Ders Puantajı & Sınıf Devam Takibi",
    "ikon": "📋",
    "renk": "#FEF08A",
    "varsayilanZaman": "Kurs Başlangıç & Aylık Ek Ders Dönemi",
    "akilliFisilti": "📋 DYK kurslarında fiilen okutulan ders saatleri %100 artırımlı ek ders olarak hesaplanır; sınıf mevcudunun 12'nin altına düşmemesi e-Kurs modülünden izlenmelidir.",
    "oncedenYapilacaklar": [
      "e-Kurs modülü üzerinden öğrenci başvurularını ders bazlı onaylayarak haftalık ders programını oluştur",
      "DYK ders defterlerinin öğretmenlerce günü gününe imzalandığını ve işlenen kazanımların müfredatla uyumunu kontrol et",
      "Aylık KBS ek ders puantajında DYK kodunu (Gündüz/Gece/Hafta sonu) %100 artırımlı katsayı ile tahakkuk ettir",
      "Dönem ortası denetimlerinde hazır bulundurulmak üzere DYK Kurs Planı, Öğrenci Devamsızlık Çizelgesi ve Zümre Tutanaklarını dosyala"
    ]
  },
  {
    "id": "egitim_erasmus_plus_ogrenci_hareketliligi_ve_ects_taninma",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "erasmus plus öğrenim staj hareketliliği sözleşmesi",
      "learning agreement la öğrenme anlaşması onay",
      "ects akts kredi transferi ve intibak yönetim kurulu kararı",
      "erasmus hibe sözleşmesi ve ulusal ajans portalı",
      "transcript of records tor not dönüşüm tablosu"
    ],
    "baslik": "Üniversite & Erasmus+: Learning Agreement, ECTS İntibakı & Fakülte Yönetim Kurulu",
    "ikon": "🌍",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Hareketlilik Öncesi & Dönüş İntibak Süreci",
    "akilliFisilti": "🌍 Erasmus+ giden öğrencilerin Learning Agreement (LA) belgesi Bölüm Koordinatörünce onaylanmalı; dönüşte alınan AKTS kredileri Fakülte Yönetim Kurulu Kararıyla intibak ettirilmelidir.",
    "oncedenYapilacaklar": [
      "Gidilecek partner üniversitenin ders içeriklerini inceleyerek 30 ECTS kredilik Online Learning Agreement (OLA) hazırla",
      "Bölüm Erasmus Koordinatörü ve Fakülte Dekanlığı imza zincirini tamamlayarak Hibe Sözleşmesini düzenle",
      "Dönüşte getirilen resmi Transkripti (Transcript of Records) not dönüşüm kılavuzuna göre eşdeğer Türk notlarına çevir",
      "Ders muafiyeti ve dönem intibakı için Fakülte Yönetim Kurulu Kararını (FYK) Öğrenci İşleri Daire Başkanlığına ilet"
    ]
  },
  {
    "id": "egitim_ozel_egitim_ve_bep_bireysellestirilmis_program_kurulu",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "özel eğitim bep bireyselleştirilmiş eğitim programı",
      "rehberlik ve araştırma merkezi ram raporu kaynaştırma",
      "bep geliştirme birimi toplantı tutanağı okul müdürü",
      "destek eğitim odası haftalık ders çizelgesi",
      "bep sınav uyarlama ve yazılı kağıdı değerlendirme baremi"
    ],
    "baslik": "Özel Eğitim & BEP: RAM Kaynaştırma Raporu, Destek Eğitim Odası & Sınav Uyarlaması",
    "ikon": "🤝",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Dönem Başı & Sınav Dönemleri",
    "akilliFisilti": "🤝 RAM raporlu tam zamanlı kaynaştırma öğrencileri için eğitim yılı başında BEP Geliştirme Birimi toplanarak her ders için bireyselleştirilmiş kazanım planı hazırlar.",
    "oncedenYapilacaklar": [
      "Rehberlik ve Araştırma Merkezi (RAM) eğitsel değerlendirme raporundaki özel eğitim tedbirini e-Okulda doğrula",
      "Müdür yardımcısı başkanlığında branş öğretmenleri, rehber öğretmen ve veli katılımıyla BEP Planını imzala",
      "Kaynaştırma öğrencisi için haftalık ders saatinin %40'ına kadar Destek Eğitim Odası öğretmen görevlendirmesini yap",
      "Ortak sınavlarda öğrencinin BEP kazanımlarına özel uyarlanmış sınav soruları, ek süre ve okutman/yazman desteği sağla"
    ]
  },
  {
    "id": "egitim_tubitak_2209_universite_ogrenci_arastirma_projesi",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "tübitak 2209 a üniversite öğrencileri araştırma projesi",
      "tübitak 2209 b sanayiye yönelik lisans araştırma",
      "proje danışmanı onay mektubu ve bütçe gerekçesi",
      "etik kurul onayı ve kurum izin belgesi tübitak bideb",
      "proje sonuç raporu ve harcama fatura dökümü"
    ],
    "baslik": "TÜBİTAK 2209-A/B: Lisans Araştırma Desteği, BİDEB Başvurusu & Sonuç Raporu",
    "ikon": "🔬",
    "renk": "#EDE9FE",
    "varsayilanZaman": "TÜBİTAK Çağrı Takvimi Boyunca",
    "akilliFisilti": "🔬 TÜBİTAK 2209-A öğrenci projelerinde proje özeti, yöntem, iş-zaman çubuğu (Gantt) ve danışman onay formu eksiksiz olarak BİDEB sistemine yüklenmelidir.",
    "oncedenYapilacaklar": [
      "Projenin özgün değerini, yöntemini ve yaygın etkisini TÜBİTAK proje şablonuna göre metne dök",
      "Anket veya deneysel çalışma içeriyorsa Üniversite Etik Kurul İzin Belgesini başvuru sistemine ekle",
      "Akademik danışman onayını alarak BİDEB e-bap portalı üzerinden başvuru formunu dijital onaylat",
      "Proje kabulü sonrası destek bütçesi harcamalarını faturalandırarak 12 aylık süre sonunda Sonuç Raporunu teslim et"
    ]
  },
  {
    "id": "egitim_okul_aile_birligi_tefbis_kayit_ve_denetim_raporu",
    "category": "finans",
    "domain": "EGITIM",
    "keywords": [
      "okul aile birliği yönetmeliği genel kurul toplantısı",
      "tefbis türkiye eğitim finansmanı ve eğitim harcamaları",
      "okul aile birliği gelir gider makbuzu ve banka hesabı",
      "denetleme kurulu 3 aylık ara denetim raporu tefbis",
      "kantin kira sözleşmesi ve okul servis ihale komisyonu"
    ],
    "baslik": "MEB TEFBİS: Okul Aile Birliği Gelir-Gider Kayıtları, Denetim Kurulu & Kantin Kirası",
    "ikon": "🏫",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Ekim Ayı Genel Kurul & Aylık Kayıtlar",
    "akilliFisilti": "🏫 Okul Aile Birliğinin tüm bağış, kantin kirası ve harcamaları en geç 10 gün içinde MEB TEFBİS modülüne girilmeli; Denetleme Kurulu 3 ayda bir rapor düzenlemelidir.",
    "oncedenYapilacaklar": [
      "Her yıl Ekim ayında Okul Aile Birliği Genel Kurulunu toplayarak yeni Yönetim ve Denetim Kurulunu seç",
      "Banka hesabına yatan tüm veli bağışları ve kantin kira bedellerini TEFBİS Gelir İşlemleri modülüne fatura/makbuzla işle",
      "Okulun temizlik, kırtasiye ve onarım harcamalarını harcama belgeleriyle (fatura) TEFBİS Gider İşlemleri ekranına kaydet",
      "Denetleme Kurulunun 3 aylık ara denetim raporunu düzenleyip okul panosunda ve web sitesinde ilan et"
    ]
  },
  {
    "id": "kamu_5018_stratejik_planlama_ve_faaliyet_raporu_hazirligi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "5018 sayılı kamu mali yönetimi ve kontrol kanunu",
      "kurumsal stratejik plan 5 yıllık performans programı",
      "yıllık idare faaliyet raporu ve iç kontrol güvence beyanı",
      "performans göstergesi hedef gerçekleşme yüzdesi",
      "sayıştay denetim bulgusu ve iç denetim birimi koordinasyonu"
    ],
    "baslik": "5018 Kamu Maliyesi: Stratejik Plan, Performans Programı & Faaliyet Raporu",
    "ikon": "🏛️",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Yıl Sonu Faaliyet & Dönemlik İzleme",
    "akilliFisilti": "🏛️ 5018 sayılı Kanun gereği idare faaliyet raporları performans hedeflerinin gerçekleşme sonuçlarını ve İç Kontrol Güvence Beyanını içererek Şubat ayı sonuna kadar yayımlanır.",
    "oncedenYapilacaklar": [
      "Harcama birimlerinden gelen yıllık performans göstergesi gerçekleşme verilerini ve bütçe icmallerini konsolide et",
      "Harcama yetkilileri tarafından imzalanan \"İç Kontrol Güvence Beyanlarını\" faaliyet raporunun ekine bağla",
      "Üst Yönetici onaylı İdare Faaliyet Raporunu Hazine ve Maliye Bakanlığı ile Sayıştay Başkanlığına resmi yazıyla gönder",
      "Sayıştay denetim raporlarında yer alan bulgulara karşı idare cevap ve eylem planı tablosunu hazırla"
    ]
  },
  {
    "id": "kamu_4734_kamu_ihale_acik_ihale_ve_ekap_ilan_sureci",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "4734 sayılı kamu ihale kanunu açık ihale usulü m 19",
      "ekap elektronik kamu alımları platformu ihale kaydı",
      "ihale dokümanı idari teknik şartname ve yaklaşık maliyet",
      "ihale ilan süresi ve kik payı bedeli yatırma",
      "ihale komisyon kararı ve 10 günlük kesinleşen ihale tebligatı"
    ],
    "baslik": "4734 KİK: Açık İhale Usulü (m.19), EKAP İlanı, Yaklaşık Maliyet & Komisyon Kararı",
    "ikon": "📑",
    "renk": "#E0E7FF",
    "varsayilanZaman": "İhale Takvimi & EKAP İlan Süresi Boyunca",
    "akilliFisilti": "📑 4734 sayılı Kanunun 19. maddesi açık ihale dokümanı EKAP üzerinden hazırlanmalı, yaklaşık maliyet gizliliği korunarak yasal ilan sürelerine uyulmalıdır.",
    "oncedenYapilacaklar": [
      "Piyasa fiyat araştırması ve resmi birim fiyatlarla Yaklaşık Maliyet Hesap Cetvelini hazırlayıp gizli zarfa al",
      "İdari Şartname, Teknik Şartname ve Sözleşme Tasarısını EKAP modülüne yükleyerek İKN (İhale Kayıt Numarası) al",
      "Yasal ilan süresi ve Resmi Gazete/KİK Bülteni ilanlarını tamamlayarak ihale teklif zarflarını e-İmza ile kabul et",
      "İhale Komisyon Kararı onaylandıktan sonra tüm isteklilere tebligat çıkararak 10 günlük şikayet başvuru süresini beklet"
    ]
  },
  {
    "id": "kamu_657_disiplin_sorusturmasi_ve_7_gunluk_savunma_istemi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "657 sayılı dmk disiplin soruşturması raporu",
      "disiplin cezası savunma istem yazısı 7 günlük kesin süre",
      "muhakkik görevlendirme onayı ve ifade alma tutanağı",
      "uyarma kınama aylıktan kesme kademe ilerlemesinin durdurulması",
      "disiplin kurulu kararı ve idare mahkemesi iptal davası"
    ],
    "baslik": "657 DMK Disiplin Soruşturması: Muhakkik Raporu, 7 Günlük Savunma & İtiraz",
    "ikon": "⚖️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Soruşturma Süreci & Tebliğden İtibaren 7 Gün",
    "akilliFisilti": "⚖️ 657 DMK m.130 uyarınca memura isnat edilen fiil açıkça belirtilerek en az 7 GÜNLÜK savunma süresi verilmeden disiplin cezası verilemez; aksi durum işlemi sakatlar.",
    "oncedenYapilacaklar": [
      "Disiplin amirinin muhakkik görevlendirme onayını ve soruşturma konusunu içeren resmi yazıyı tebliğ et",
      "Tanık beyanları, kamera/log kayıtları ve evrak incelemeleriyle hazırlanan Soruşturma Raporunu disiplin amirine sun",
      "Memura isnat edilen suç maddesini net belirten \"Savunma İstem Yazısını\" tebliğ mazbatasıyla ileterek 7 günlük süreyi başlat",
      "Verilen disiplin cezasına karşı 7 gün içinde Disiplin Kuruluna itiraz veya 60 gün içinde İdare Mahkemesinde İptal Davası hakkını bildir"
    ]
  },
  {
    "id": "kamu_ebys_standart_dosya_plani_ve_eyp_2_0_e_yazisma",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "resmi yazışmalarda uygulanacak usul ve esaslar yönetmeliği",
      "e-yazışma paketi eyp 2 0 nitelikli elektronik imza",
      "başbakanlık standart dosya planı sdp kodlama sistemi",
      "güvenli elektronik imza 5070 ve detsis kurum kodu",
      "gizli ve kişiye özel resmi yazı kaydı ve imha komisyonu"
    ],
    "baslik": "Resmi Yazışma Usulleri: e-Yazışma (EYP 2.0), SDP Dosya Kodu & Nitelikli e-İmza",
    "ikon": "🖋️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "EBYS Evrak Tanzimi & İmzaya Sunum",
    "akilliFisilti": "🖋️ Kurumlar arası resmi yazışmalar EYP 2.0 formatında, Standart Dosya Planı (SDP) koduyla ve 5070 sayılı Kanuna uygun Nitelikli Elektronik Sertifika (e-İmza) ile paraflanır.",
    "oncedenYapilacaklar": [
      "Yazının konusuna tam uyan ana ve alt Standart Dosya Kodunu (SDP) DETSİS sisteminden seç",
      "Yazı alanlarını Resmi Yazışma Yönetmeliği tip şablonuna göre (Sayı, Konu, Muhatap, İlgi, Metin, İmza Blokları) yapılandır",
      "Şef ve Şube Müdürü elektronik paraf zincirini tamamlayıp Harcama Yetkilisi/Müsteşar/Bakan e-İmzasına sun",
      "Gizlilik dereceli (Hizmete Özel, Gizli) evrakları kriptolu zarflama ve özel kayıt defteri protokolüyle sevk et"
    ]
  },
  {
    "id": "kamu_6245_harcirah_kanunu_yolluk_bildirimi_ve_avans_mahsubu",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "6245 sayılı harcırah kanunu geçici görev yolluğu",
      "yurtiçi yurtdışı geçici görevlendirme onayı oluru",
      "yolluk bildirimi seyahat kartı ve otel konaklama faturası",
      "harcırah avansı açılması ve 1 aylık mahsup süresi",
      "gündelik yevmiye katsayısı ve bütçe tertibi"
    ],
    "baslik": "6245 Harcırah Kanunu: Geçici Görev Yolluk Bildirimi, Konaklama & Avans Mahsubu",
    "ikon": "🚆",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Görev Bitiminden İtibaren 1 Ay İçinde",
    "akilliFisilti": "6245 sayılı Kanun gereği memuriyete ait geçici görev harcırahları görev bitiminden itibaren 1 AY içinde yolluk bildirimi ve faturalarla birlikte muhasebe birimine teslim edilmelidir.",
    "oncedenYapilacaklar": [
      "Görevlendirme öncesi Harcama Yetkilisinden \"Geçici Görevlendirme Oluru\" alarak gerekirse harcırah avansı talep et",
      "Görev dönüşü uçak biniş kartları (boarding pass), otobüs bileti ve otel konaklama faturalarını dökümle",
      "Katsayı cetveline göre günlük yevmiye ve yol giderlerini \"Yurtiçi Geçici Görev Yolluğu Bildirim Çizelgesine\" işle",
      "Yolluk bildirimini harcama yetkilisi ve gerçekleştirme görevlisine imzalatarak Malmüdürlüğü/Muhasebe Birimine teslim et"
    ]
  },
  {
    "id": "egitim_lgs_yks_tercih_danismanligi_ve_yuzdelik_dilim",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "meb lgs yks tercih danışmanlığı komisyonu",
      "genel yüzdelik dilim ve il yüzdelik dilimi analizi",
      "okul türleri anadolu fen mesleki teknik kontenjan",
      "e-okul e-tercih modülü veli onay çıktısı",
      "merkezi yerleştirme ve yerel yerleştirme kayıt alanı"
    ],
    "baslik": "MEB Rehberlik: LGS / YKS Tercih Danışmanlığı, Yüzdelik Dilim & e-Tercih",
    "ikon": "🎓",
    "renk": "#FEF08A",
    "varsayilanZaman": "Temmuz / Ağustos Tercih Dönemi",
    "akilliFisilti": "🎓 Tercihlerde puan yerine öğrencinin Genel Yüzdelik Dilimi baz alınmalı; tercih listesi e-Okul modülünden onaylatılarak ıslak imzalı çıktı veliye teslim edilmelidir.",
    "oncedenYapilacaklar": [
      "Öğrencinin LGS/YKS sınav sonuç belgesindeki Genel ve İl Yüzdelik Dilimini analiz et",
      "Öğrencinin başarı sırasının %20 üstü ve %20 altı aralığında dengeli tercih havuzu oluştur",
      "e-Okul / ÖSYM Tercih Sistemi üzerinden tercih kodlarını hatasız girip kaydet",
      "Okul idaresi tarafından sistemden alınan resmi \"Tercih Güvenlik Kodlu\" onay belgesini veliyle imzala"
    ]
  },
  {
    "id": "egitim_okul_kantini_hijyen_ve_gida_numune_denetimi",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "okul kantinleri denetim formu meb sağlık bakanlığı",
      "okul gıdası logosu ve satışı yasaklı ürünler listesi",
      "sıcak yemek şahit numune 72 saat artı 4 derece saklama",
      "kantin personeli hijyen belgesi ve portör muayenesi",
      "tarım ve orman ilçe müdürlüğü ortak denetim tutanağı"
    ],
    "baslik": "Okul Sağlığı: Kantin Hijyen Denetimi, Okul Gıdası Logosu & 72 Saatlik Şahit Numune",
    "ikon": "🍱",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Aylık Kantin Denetim Komisyonu",
    "akilliFisilti": "🍱 Okul kantinlerinde gazlı içecek ve kızartma satışı yasaktır; yemekhanede çıkan sıcak yemeklerden steril kavanozlara 72 saatlik (+4°C) şahit numune alınmalıdır.",
    "oncedenYapilacaklar": [
      "Okul Kantin Denetim Komisyonu ile kantin raflarındaki \"Okul Gıdası Logosu\" ve Tarım Bakanlığı onaylarını incele",
      "Kantin çalışanlarının resmi Hijyen Eğitimi Belgelerini ve temizlik/KKD (bone, eldiven) kullanımını denetle",
      "Yemekhanede her öğünden alınan şahit yemek numunelerini etiketleyip +4°C numune dolabında 72 saat saklat",
      "MEB Standart Kantin Denetim Formunu doldurup puanlayarak kantin işletmecisine tebliğ et"
    ]
  },
  {
    "id": "egitim_zumre_ogretmenler_kurulu_ve_ortak_sinav_kazanimi",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "zümre öğretmenler kurulu toplantı tutanağı",
      "ülke genel il genel ortak yazılı sınav kazanım tablosu",
      "ders yılı başı zümresi ünitelendirilmiş yıllık plan",
      "ölçme değerlendirme cevap anahtarı ve puanlama baremi",
      "başarıyı artırıcı tedbirler ve zümre başkanı onayı"
    ],
    "baslik": "MEB Zümre Kurulu: Ünitelendirilmiş Yıllık Plan, Ortak Sınav & Puanlama Baremi",
    "ikon": "📚",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Dönem Başı & Ortak Sınav Öncesi",
    "akilliFisilti": "📚 Zümre toplantısında Bakanlık Çerçeve Planına göre Ünitelendirilmiş Yıllık Plan onaylanır; ortak sınavlarda konu soru dağılım tablosu önceden ilan edilir.",
    "oncedenYapilacaklar": [
      "MEB Müfredatına uygun olarak ders bazında haftalık kazanım ve deney/proje takvimini planla",
      "İl/İlçe Milli Eğitim Müdürlüğü Ortak Sınav kazanım soru dağılım tablolarını zümre kararına bağla",
      "Yazılı sınavlar için açık uçlu soru havuzu, cevap anahtarı ve ayrıntılı puanlama baremini hazırla",
      "Zümre Karar Tutanağını tüm branş öğretmenleri imzalayıp Okul Müdürünün onayına sun"
    ]
  },
  {
    "id": "egitim_e_okul_sosyal_etkinlik_modulu_ve_belge_kaydi",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "meb sosyal etkinlikler yönetmeliği e-okul modülü",
      "kulüp çalışmaları ve öğrenci sosyal sorumluluk belgesi",
      "sosyal etkinlik türleri bilimsel sanatsal kültürel sportif",
      "etkinlik onay formu okul müdürü onay aşaması",
      "ortaöğretim e-portfolyo sosyal etkinlik kayıt girişi"
    ],
    "baslik": "e-Okul Sosyal Etkinlik: Kulüp Faaliyetleri, Belge Girişi & e-Portfolyo",
    "ikon": "🎨",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Dönem Sonu & Etkinlik Tamamlandığında",
    "akilliFisilti": "🎨 Öğrencilerin katıldığı bilimsel, sanatsal, kültürel ve sportif etkinlikler Sosyal Etkinlik Modülüne girilerek e-Portfolyo sistemine resmi olarak işlenmelidir.",
    "oncedenYapilacaklar": [
      "Sosyal Etkinlik Bilgilendirme Formu ve Veli İzin Belgesini etkinlik öncesinde topla",
      "e-Okul Yönetici/Öğretmen modülünde öğrencinin temsil düzeyini (Okul/İlçe/İl/Ulusal) seç",
      "Öğrencinin aldığı katılım/başarı sertifikasını tarayıp modüle etkinlik açıklamasıyla kaydet",
      "Kulüp danışman öğretmeni tarafından onaylanan etkinliği Okul Müdürlüğü ekranından nihai onayla"
    ]
  },
  {
    "id": "egitim_okul_tahliye_tatbikati_ve_acil_durum_plani",
    "category": "resmi",
    "domain": "EGITIM",
    "keywords": [
      "meb yangın ve deprem tahliye tatbikatı kronometre",
      "okul acil durum planı ve toplanma alanı güvenliği",
      "kat sorumlusu öğretmen ve sınıf tahliye sırası",
      "tatbikat sonuç raporu ve ilçe mem sivil savunma bildirimi",
      "yangın tüpü basınç kontrolü ve siren testi"
    ],
    "baslik": "İSG & Okul Emniyeti: Deprem/Yangın Tahliye Tatbikatı, Toplanma Alanı & Rapor",
    "ikon": "🛡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Deprem Haftası (Mart) & Dönemlik Tatbikat",
    "akilliFisilti": "🛡️ Tahliye tatbikatında sirenle birlikte sınıflar \"Çök-Kapan-Tutun\" yapmalı, ardından kat sorumluları eşliğinde paniksiz toplanma alanına kronometreyle tahliye edilmelidir.",
    "oncedenYapilacaklar": [
      "Tatbikat öncesi acil çıkış kapılarının, kaçış merdivenlerinin açık ve engelsiz olduğunu kontrol et",
      "Siren çaldığında sınıfların 2'şerli kollar halinde binayı tahliye etme süresini kronometreyle ölç",
      "Okul Bahçesi Acil Toplanma Alanında sınıf başkanları ve öğretmenlerce yoklama alarak eksik öğrenci kontrolü yap",
      "Tatbikat Süresi, Katılımcı Sayısı ve Değerlendirmeyi içeren resmi Tatbikat Tutanağını İlçe MEM'e gönder"
    ]
  },
  {
    "id": "kamu_4734_dogrudan_temin_22d_ve_piyasa_arastirmasi",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "4734 kamu ihale kanunu m 22 d doğrudan temin",
      "piyasa fiyat araştırma tutanağı en az 3 teklif mektubu",
      "harcama yetkilisi doğrudan temin onay belgesi",
      "muayene ve kabul komisyonu tutanağı taşınır işlem fişi",
      "doğrudan temin limit kontrolü ve kik payı muafiyeti"
    ],
    "baslik": "4734 m.22/d: Doğrudan Temin, Piyasa Fiyat Araştırma Tutanağı & MYS Ödeme",
    "ikon": "📑",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Mal/Hizmet Alımı Öncesi",
    "akilliFisilti": "📑 22/d Doğrudan Temin alımlarında Harcama Yetkilisi Onayı alınmalı, en az 3 firmadan teklif mektubu toplanarak Piyasa Fiyat Araştırması Tutanağı imzalanmalıdır.",
    "oncedenYapilacaklar": [
      "Alımı yapılacak mal/hizmetin Teknik Şartnamesini ve Harcama Talimatı Onay Belgesini hazırla",
      "Piyasadaki en az 3 yetkili satıcıdan kaşeli ve imzalı Teklif Mektuplarını topla",
      "Piyasa Fiyat Araştırma Komisyonu Tutanağını düzenleyip en avantajlı fiyatı veren firmayı belirle",
      "Mal tesliminde Muayene ve Kabul Komisyon Tutanağını imzalayıp MYS üzerinden ödeme emrini muhasebeye ilet"
    ]
  },
  {
    "id": "kamu_tkys_tasinir_kayit_yonetim_ve_yil_sonu_sayimi",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "taşınır kayıt ve yönetim sistemi tkys tif kesimi",
      "yıl sonu taşınır sayım tutanağı ve konsolide görevlisi",
      "demirbaş amortisman ve hurdaya ayırma hek komisyonu",
      "taşınır devir ve zimmet fişi personel değişikliği",
      "sayıştay taşınır yönetim hesabı cetvelleri"
    ],
    "baslik": "TKYS & Taşınır Mal: Taşınır İşlem Fişi (TİF), Yıl Sonu Sayımı & Zimmet Fişi",
    "ikon": "🗄️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıl Sonu (Aralık) & Mal Kabul Anı",
    "akilliFisilti": "🗄️ Kuruma alınan tüm demirbaş ve tüketim malzemeleri TKYS sistemine girilerek TİF kesilmeli; Aralık ayında Taşınır Sayım Kurulu fiziki sayım yapmalıdır.",
    "oncedenYapilacaklar": [
      "Faturası gelen taşınırların Taşınır Kod Listesine (Tüketim/Demirbaş) uygun Taşınır İşlem Fişini (TİF) kes",
      "Demirbaş eşyaları ilgili personele \"Taşınır Teslim Belgesi (Zimmet Fişi)\" ile imza karşılığı teslim et",
      "Yıl sonunda Taşınır Sayım Kurulunca ambar ve odalardaki fiziki mevcudu sayıp Sayım Tutanağını çıkar",
      "Kullanılamaz hale gelen malzemeleri Harcama Yetkilisi onayıyla H.E.K. (Hurda) komisyonu ile kayıttan düş"
    ]
  },
  {
    "id": "kamu_cimer_ve_3071_sayili_dilekce_cevabi",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "cimer cumhurbaşkanlığı iletişim merkezi başvuru takibi",
      "3071 sayılı dilekçe hakkının kullanılmasına dair kanun",
      "cimer 30 günlük yasal cevap verme süresi ve ara yazı",
      "kamu denetçiliği kurumu kdk ve bilgi edinme hakkı kanunu",
      "cimer nihai cevap metni kurum amiri onay süreci"
    ],
    "baslik": "CİMER & 3071: 30 Günlük Yasal Cevap Takvimi, Ara Yazı & Amire Sunum",
    "ikon": "🏛️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Başvuru İntikalinden İtibaren 30 Gün",
    "akilliFisilti": "🏛️ CİMER başvuruları 3071 sayılı Kanun gereği azami 30 GÜN içinde gerekçeli ve nazik bir dille yanıtlanmalı; ek bilgi gerekirse 15 gün içinde vatandaşa ara yazı verilmelidir.",
    "oncedenYapilacaklar": [
      "CİMER kurum sistemine düşen başvuruyu inceleyip ilgili alt birimlere resmi bilgi isteme yazısı çıkar",
      "Toplanan bilgi ve belgelerle mevzuat maddelerine dayalı net bir \"Nihai Cevap Taslağı\" hazırla",
      "Kurum Amiri / Harcama Yetkilisinin onayını alarak CİMER portalı üzerinden vatandaşa cevabı gönder",
      "Yasal sürenin aşılmaması için kalan süreyi sistemden günlük geri sayımla takip et"
    ]
  },
  {
    "id": "kamu_657_memur_izinleri_mazeret_ve_saglik_raporu_izne_cevirme",
    "category": "resmi",
    "domain": "KAMU",
    "keywords": [
      "657 dmk memur yıllık izin devri ve mazeret izni",
      "sağlık raporunun izne çevrilmesi onay formu",
      "tek hekim raporu azami 10 gün ve hakem hastane sevki",
      "analık babalık ve evlilik 7 günlük mazeret izni",
      "ebys izin talep formu birim amiri parafı"
    ],
    "baslik": "657 DMK Özlük: Yıllık İzin Devri, Sağlık Raporunu İzne Çevirme & Mazeret",
    "ikon": "🖋️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "İzin Talebi & Rapor Alındığı Gün",
    "akilliFisilti": "657 DMK gereği sağlık raporları mesai başlangıcına kadar kuruma bildirilmeli ve resmi onayla \"Hastalık İznine\" çevrilmelidir; yıllık izinler en fazla bir sonraki yıla devreder.",
    "oncedenYapilacaklar": [
      "Memurun getirdiği tek hekim sağlık raporunu (en fazla 10 gün) EBYS üzerinden \"Hastalık İzni Onayına\" bağla",
      "Raporun fenne aykırı olduğu şüphesi varsa memuru mesai bitimine kadar İl Sağlık Hakem Hastanesine sevk et",
      "Evlilik, ölüm (7 gün) veya babalık (10 gün) mazeret izinlerini belge ekleriyle izin formuna bağla",
      "Cari yıl kullanılmayan yıllık izinlerin bir sonraki yıla aktarımını özlük modülünden doğrula"
    ]
  },
  {
    "id": "kamu_kamu_zarari_ve_sayistay_ilami_tahsilati",
    "category": "finans",
    "domain": "KAMU",
    "keywords": [
      "5018 sayılı kanun kamu zararlarının tahsiline ilişkin usul ve esaslar",
      "sayıştay yargılama ilamı ve sorgu kağıdı cevabı",
      "kamu zararı tespit komisyonu raporu ve rızaen tahsilat",
      "yasal faiz hesabı borcun doğduğu tarihten itibaren",
      "harcama yetkilisi ve gerçekleştirme görevlisi müteselsil sorumluluk"
    ],
    "baslik": "5018 Kamu Zararı: Sayıştay İlamı, Sorgu Cevabı & Yasal Faizli Tahsilat",
    "ikon": "⚖️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İlam Tebliğinden İtibaren 1 Ay / Sorgu 30 Gün",
    "akilliFisilti": "⚖️ Sayıştay sorgularına 30 gün içinde gerekçeli cevap verilmeli; kesinleşen Sayıştay ilamlarındaki kamu zararı sorumlulardan faiziyle rızaen veya icraen tahsil edilmelidir.",
    "oncedenYapilacaklar": [
      "Sayıştay Denetçisi tarafından çıkarılan Sorgu Kağıdındaki mali mevzuat iddiasını harcama belgeleriyle yanıtla",
      "Kesinleşen Sayıştay İlamındaki tutarı borcun doğduğu tarihten itibaren yasal faiz ekleyerek borç tablosuna dök",
      "İlgili harcama yetkilisi ve gerçekleştirme görevlisine \"Kamu Zararı Ödeme Emri Tebligatını\" çıkar",
      "Rızaen taksitlendirme talebinde bulunulursa 6085 ve 5018 sayılı kanunlara göre taksit sözleşmesini imzalat"
    ]
  }
];
