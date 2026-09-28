import type { ShortScenarioMatch } from '../scenarioDatabase.ts';

/**
 * Notivia Bilişsel Modülü: TICARET, EMLAK, GUMRUK, DENIZCILIK, HAVACILIK, LOJISTIK, ULASTIRMA_LOJISTIK, OTOMOTIV
 * Toplam 261 Bilişsel Senaryo
 */
export const TRADE_TRANSPORT_SCENARIOS: ShortScenarioMatch[] = [
  {
    "id": "ticaret_otomatik_sanziman_yikama",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "şanzıman yağı değişimi",
      "tork konvertörü yıkama",
      "şanzıman adaptasyon sürüşü",
      "atf yağ değişimi",
      "otomatik şanzıman bakım"
    ],
    "baslik": "Otomatik Şanzıman ATF Yağ Değişimi & Adaptasyon",
    "ikon": "🔧",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Servis Randevu Saati",
    "hazirlikZamani": "Şanzıman Sıcaklık Kontrolü (40-50°C)",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🔧 Otomatik şanzıman yağı makineyle tam tahliye edilmeli; değişim sonrası diagnostik cihazla debriyaj kavrama adaptasyon sürüşü yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Otomatik şanzıman yağ sıcaklığının (ATF temp) diyagnostik cihazdan 40°C - 50°C aralığında olduğunu doğrula",
      "Diyaliz makinesini şanzıman soğutucu hatlarına bağlayarak eski yağı tork konvertöründen vakumla",
      "Üretici onaylı sentetik ATF yağını ve yeni şanzıman filtre/karter contasını tak",
      "Test cihazı ile şanzıman adaptasyon değerlerini sıfırlayıp 15 dakikalık yol adaptasyon sürüşünü tamamla"
    ]
  },
  {
    "id": "ticaret_cek_senet_ibraz_10gun",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "çek ibraz süresi",
      "10 gün çek ibrazı",
      "ttk 708",
      "senet protestosu",
      "çek takasa verme"
    ],
    "baslik": "TTK 708 Çek İbraz Süresi (10 Gün) & Takas",
    "ikon": "🧾",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Keşide Tarihinden İtibaren 10 Gün",
    "hazirlikZamani": "Çek Aslı ve Ciro Zinciri Kontrolü",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🧾 TTK m. 708 gereği aynı yerde keşide edilen çekler 10 gün içinde muhatap bankaya ibraz edilmelidir; süre aşılırsa müracaat hakkı düşer.",
    "oncedenYapilacaklar": [
      "Müşteri çekinin keşide yerini ve keşide tarihini kontrol et (Aynı yer 10 gün, başka yer 1 ay kuralı)",
      "Arka yüzdeki ciro silsilesinin tam ve kesintisiz olduğunu büyüteçle doğrula",
      "Bankalararası Takas Odası (BÇM) aracılığıyla tahsilata verilmek üzere banka şubesine teslim et",
      "Karşılıksız çıkması halinde bankaca çek arkasına karşılıksızdır kaşesi vurdurarak icra takibini başlat"
    ]
  },
  {
    "id": "ticaret_tuketici_hakem_heyeti_savunma",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "tüketici hakem heyeti savunma",
      "thh 30 gün",
      "ayıplı mal savunması",
      "6502 sayılı kanun",
      "tüketici şikayeti"
    ],
    "baslik": "Tüketici Hakem Heyeti Savunması (30 Gün)",
    "ikon": "⚖️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Tebligattan İtibaren 30 Gün",
    "hazirlikZamani": "Servis Formu & Kullanıcı Hatası Raporu",
    "hazirlikSaatOncesi": 72,
    "akilliFisilti": "⚖️ 6502 sayılı Tüketicinin Korunması Kanunu gereğince Hakem Heyeti savunma istemine 30 gün içinde teknik raporla cevap verilmelidir.",
    "oncedenYapilacaklar": [
      "Tüketici Bilgi Sistemi (TÜBİS) üzerinden intikal eden şikayet konusunu ve tüketici talebini incele",
      "Yetkili teknik servis istasyonundan alınan 'Kullanıcı Hatası / Sıvı Teması / Darbe' ekspertiz raporunu dosyala",
      "Ürünün faturası, garanti belgesi ve teslim tesellüm tutanaklarını savunma dilekçesine iliştir",
      "TÜBİS portalına veya Kaymakamlık Hakem Heyetine yazılı savunma dilekçesini teslim et"
    ]
  },
  {
    "id": "ticaret_irsaliye_fatura_7gun",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "irsaliye faturalaştırma",
      "7 gün fatura kesme",
      "vuk 230",
      "sevk irsaliyesi fatura",
      "irsaliye tarihi"
    ],
    "baslik": "VUK 230 İrsaliyenin Faturaya Dönüştürülmesi (7 Gün)",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İrsaliye Tarihinden İtibaren 7 Gün",
    "hazirlikZamani": "Teslim İmzalı İrsaliye Nüshası",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "📑 VUK m. 231/5 uyarınca malın tesliminden itibaren en geç 7 gün içinde faturanın düzenlenmesi şarttır; ay sonu aşımı özel usulsüzlük cezasıdır.",
    "oncedenYapilacaklar": [
      "Müşteri imzasını taşıyan sevk irsaliyesi teslim nüshasını muhasebeye al",
      "İrsaliye tarihinden itibaren geçen süreyi takip et (Ay atlamalarında ayın son gününü aşmama kuralı)",
      "Muhasebe/e-Fatura programında irsaliye numarası ve tarihini fatura dipnotuna bağlayarak e-Faturayı kes",
      "e-Faturayı GİB üzerinden onaylayıp müşterinin sistemine otomatik ilet"
    ]
  },
  {
    "id": "ticaret_pos_komisyon_valör_hesaplama",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "pos komisyon oranı",
      "pos valör hesabı",
      "ertesi gün hesap takas",
      "blokeli pos çözümü",
      "pos erken bloke"
    ],
    "baslik": "POS Komisyon Oranı & Blokeli / Valör Çözümü",
    "ikon": "💳",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Valör Bitiş Günü (Örn: 28. Gün)",
    "hazirlikZamani": "Banka POS Mutabakat Raporu",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "💳 Banka POS sözleşmelerinde blokeli gün sayısı (valör) ile erken bloke çözüm komisyonu kıyaslanarak nakit akışı optimize edilmelidir.",
    "oncedenYapilacaklar": [
      "Bankanın POS ekstresindeki taksitli ve tek çekim komisyon kesintilerini oran bazında incele",
      "Blokede bekleyen ciroların hesaba serbest geçiş tarihini banka nakit akış takvimine kaydet",
      "Acil nakit ihtiyacında erken bloke bozum maliyetini banka ticari kredisi faiziyle kıyasla",
      "Ay sonu banka POS hesap özeti ile ERP kasa hesaplarını kuruşu kuruşuna mutabık kıl"
    ]
  },
  {
    "id": "lojistik_adr_sinif_3_tremcard",
    "category": "arac_ulasim",
    "domain": "LOJISTIK",
    "keywords": [
      "adr sınıf 3",
      "turuncu plaka tak",
      "yazılı talimat tremcard",
      "yanıcı sıvı taşıma",
      "src 5 belgesi"
    ],
    "baslik": "ADR Sınıf 3 Yanıcı Sıvı & Yazılı Talimat (Tremcard)",
    "ikon": "🔥",
    "renk": "#FED7AA",
    "varsayilanZaman": "Yükleme Öncesi Kontrol",
    "hazirlikZamani": "ADR Çantası & KKD Muayenesi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🚛 ADR mevzuatı uyarınca yanıcı sıvı taşımalarında turuncu plaka açılmalı, sürücü kabininde 4 dilde yazılı talimat (Tremcard) bulundurulmalıdır.",
    "oncedenYapilacaklar": [
      "Çekici ve dorsenin önüne/arkasına reflektörlü boş/numaralı turuncu plakaları tak",
      "Sürücünün SRC-5 Tehlikeli Madde Taşıma Sertifikasını ve taşıma evrakını (Taşıma Belgesi) kontrol et",
      "ADR çantasındaki göz yıkama şişesi, kıvılcım çıkarmaz kürek, drenaj örtüsü ve tekerlek takozunu doğrula",
      "Aracın 2 adet 6 kg'lık kuru kimyevi tozlu yangın söndürme tüplerinin basınç manometresini yeşilde teyit et"
    ]
  },
  {
    "id": "lojistik_frigo_atp_kalibrasyon",
    "category": "arac_ulasim",
    "domain": "LOJISTIK",
    "keywords": [
      "frigo atp sertifikası",
      "termokin kalibrasyonu",
      "soğuk zincir derece logu",
      "-18 dondurulmuş taşıma",
      "atp muayenesi"
    ],
    "baslik": "Frigorifik Kasa ATP Sertifikası & Termokin Testi",
    "ikon": "❄️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Yüklemeye 2 Saat Kala (Ön Soğutma)",
    "hazirlikZamani": "Kasa İç Dezenfeksiyonu",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🚛 ATP Konvansiyonu uyarınca dondurulmuş gıdalarda kasa yükleme öncesi -18°C'ye ön soğutulmalı; kalibre datalogger ısı kaydı vermelidir.",
    "oncedenYapilacaklar": [
      "Termokin soğutucu ünitesini çalıştırarak kasayı yükleme sıcaklığına (Donuk: -18°C / Taze: +4°C) ön soğut",
      "Dorse içindeki hava sirkülasyon kanallarının ve kapı conta fitillerinin sızdırmazlığını denetle",
      "ATP Tip Onay Sertifikasının ve kalibrasyonlu yazıcının (Datalogger) kağıt rulosunu hazırla",
      "Yükleme anında paletlerin çekirdek ısısını batırma prob termometreyle ölçüp sevk irsaliyesine şerh et"
    ]
  },
  {
    "id": "lojistik_demuraj_detention_freetime",
    "category": "arac_ulasim",
    "domain": "LOJISTIK",
    "keywords": [
      "demuraj süresi",
      "detention serbest süre",
      "freetime bitişi",
      "konteyner gecikme ücreti",
      "liman demuraj"
    ],
    "baslik": "Konteyner Demuraj / Detention & Free Time Takibi",
    "ikon": "🚢",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Free Time Son Günü (17:00)",
    "hazirlikZamani": "Tahliye Tarihinden İtibaren Gün Sayımı",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🚢 Armatörün tanıdığı serbest süre (Free Time - genelde 7-14 gün) aşıldığında günlük 100-250$ demuraj/detention cezası kesilir.",
    "oncedenYapilacaklar": [
      "Geminin limana yanaşma ve konteyner tahliye tarihine göre Free Time bitiş gününü netleştir",
      "Gümrük müşaviriyle irtibata geçerek ithalat beyannamesinin kapanışını hızlandır",
      "Konteynerin liman dışına çıkışı (gate-out) ve fabrikada boşaltılıp depoya iadesi (gate-in) için nakliye randevusunu al",
      "Boş konteynerin armatörün anlaşmalı konteyner deposuna (Depot) teslim fişini (EIR) alıp dosyayı kapat"
    ]
  },
  {
    "id": "lojistik_src4_psikoteknik_yenileme",
    "category": "arac_ulasim",
    "domain": "LOJISTIK",
    "keywords": [
      "src 4 belgesi",
      "psikoteknik raporu yenileme",
      "5 yıllık psikoteknik",
      "şoför ehliyet kartı",
      "src belgesi kontrol"
    ],
    "baslik": "Sürücü SRC-3/4 & Psikoteknik Raporu Yenileme",
    "ikon": "🪪",
    "renk": "#FED7AA",
    "varsayilanZaman": "Geçerlilik Bitişinden 1 Ay Önce",
    "hazirlikZamani": "Psikoteknik Merkez Randevusu",
    "hazirlikSaatOncesi": 72,
    "akilliFisilti": "🚛 Karayolu Taşıma Yönetmeliği gereğince ticari araç sürücülerinin 5 yılda bir psikoteknik değerlendirme ve e-Devlet onaylı sağlık raporu alması zorunludur.",
    "oncedenYapilacaklar": [
      "Filo sürücülerinin ehliyet, SRC ve Psikoteknik belgelerinin son geçerlilik tarihlerini sistemden listele",
      "Süresi dolacak şoförler için Sağlık Bakanlığı onaylı yetkili Psikoteknik Değerlendirme Merkezinden randevu al",
      "Simülatör testinden başarılı olan sürücünün raporunu e-Devlet sisteminden hekim onayına sevk ettir",
      "Yenilenen raporu şirket filo yönetim yazılımına tarayarak arşivle"
    ]
  },
  {
    "id": "lojistik_gemi_ows_sintine_kalibrasyon",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "ows kalibrasyon sertifikası",
      "15 ppm alarm testi",
      "sintine separatör filtresi",
      "marpol mepc 107",
      "makine dairesi ows"
    ],
    "baslik": "Gemi OWS 15 PPM Sintine Alarmı & Kalibrasyon Sertifikası",
    "ikon": "⚓",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Periyodik Yıllık Kalibrasyon",
    "hazirlikZamani": "Filtre Kartuş Değişimi & Temiz Su Yıkaması",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚓ MARPOL MEPC.107(49) standardı uyarınca 15 PPM sintine separatörü alarm ünitesi (OCM) yıllık kalibre edilmeli ve sertifikası denetime hazır tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Sintine seperatörünün koalesans filtre elemanlarını ve yağ sıyırıcı sensörlerini temizle",
      "15 PPM Oil Content Meter (OCM) cihazını temiz tatlı suyla sıfırlayarak zero-check doğrulamasını yap",
      "Test numunesi ile sensörü tetikleyerek 15 PPM üzerinde otomatik 3 yollu tahliye vanasının kapandığını sına",
      "Yetkili servis tarafından düzenlenen 15 PPM kalibrasyon sertifikasını Oil Record Book klasörüne ekle"
    ]
  },
  {
    "id": "emlak_kmk_olagan_genel_kurul",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "kmk genel kurul",
      "site genel kurul çağrısı",
      "15 gün çağrı şartı",
      "kat mülkiyeti toplantı",
      "yönetim kurulu ibra"
    ],
    "baslik": "KMK Site Olağan Genel Kurulu & 15 Gün Çağrı Şartı",
    "ikon": "🏢",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Toplantı Tarihinden 15 Gün Önce",
    "hazirlikZamani": "Denetim Raporu & İşletme Projesi",
    "hazirlikSaatOncesi": 72,
    "akilliFisilti": "🏢 634 sayılı KMK uyarınca kat malikleri kurul çağrısı taahhütlü mektupla veya imza karşılığı toplantıdan en az 15 gün önce tebliğ edilmelidir.",
    "oncedenYapilacaklar": [
      "Geçmiş yıl gelir-gider kesin hesap tablosunu ve Denetim Kurulu raporunu hazırla",
      "Gelecek yıl tahmini İşletme Projesini (bütçe ve avans payları) kat malikleri listesiyle hazırla",
      "Toplantı yeri, günü, saati ve ilk toplantıda çoğunluk sağlanamazsa 2. toplantı tarihini çağrı mektubuna yaz",
      "Tüm kat maliklerine taahhütlü mektupla veya imza karşılığı tebligatı 15 gün önceden ulaştır"
    ]
  },
  {
    "id": "emlak_iskan_yapi_kullanim_ekb",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "yapı kullanma izin belgesi",
      "iskan raporu sorgu",
      "enerji kimlik belgesi ekb",
      "belediye iskan harcı",
      "iskanlı tapu"
    ],
    "baslik": "Yapı Kullanma İzin Belgesi (İskan) & EKB Teyidi",
    "ikon": "🏠",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Mülk Alım/Satım Öncesi",
    "hazirlikZamani": "Belediye İmar Arşivi Dosyası",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏠 İskansız (kat irtifaklı) binalarda şantiye elektriği/suyu kullanılır ve cezai risk vardır; Enerji Kimlik Belgesi (EKB) alım-satımda zorunludur.",
    "oncedenYapilacaklar": [
      "İlgili Belediye İmar Müdürlüğünden binaya ait resmi Yapı Kullanma İzin Belgesini (İskan) sorgula",
      "Sığınak, otopark, yangın merdiveni gibi ortak alanlarda mimari projeye aykırı kaçak eklenti olmadığını denetle",
      "Binanın Enerji Kimlik Belgesini (EKB) Çevre ve Şehircilik Bakanlığı portalından (A-G sınıfı) doğrula",
      "Tapuda kat irtifakından kat mülkiyetine resen geçiş durumunu tapu kütüğünden kontrol et"
    ]
  },
  {
    "id": "emlak_site_aidat_icra_kmk20",
    "category": "finans",
    "domain": "EMLAK",
    "keywords": [
      "site aidat icrası",
      "kmk 20 gecikme tazminatı",
      "aylık %5 gecikme faizi",
      "aidat borcu takip",
      "yönetici icra takibi"
    ],
    "baslik": "KMK 20 Site Aidat Borcu & Aylık %5 Gecikme Tazminatı",
    "ikon": "⚖️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Vade Sonunu İzleyen Ayın İlk Haftası",
    "hazirlikZamani": "Banka Ekstresi & Borçlu Listesi",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ 634 sayılı KMK m. 20 uyarınca ortak gider avansını ödemeyen kat malikine aylık %5 gecikme tazminatı uygulanır ve icra takibi açılır.",
    "oncedenYapilacaklar": [
      "Site yönetim programından ödenmeyen aidat, demirbaş avansı ve yakıt gideri borçlularını dök",
      "Borçlu malike WhatsApp veya iadeli taahhütlü mektupla 7 günlük yasal ödeme ihtarnamesi gönder",
      "Süre dolduğunda Genel Kurulda yöneticiye verilen yetkiye dayanarak UYAP üzerinden ilamsız icra takibi aç",
      "Takip talebine asıl alacakla birlikte aylık %5 gecikme tazminatını işleterek ödeme emrini tebliğe çıkar"
    ]
  },
  {
    "id": "emlak_tufe_kira_artis_tebligi",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "tüfe kira artışı",
      "12 aylık tüfe ortalaması",
      "kira zam hesaplama",
      "kira yenileme ihtarname",
      "yasal kira artış oranı"
    ],
    "baslik": "12 Aylık TÜFE Ortalaması Kira Artış Tebligatı",
    "ikon": "📈",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Kira Yenileme Ayının İlk Günü",
    "hazirlikZamani": "TÜİK Enflasyon Bülteni Açıklandığında (Ayın 3'ü)",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "📜 TBK m. 344 uyarınca konut ve çatılı işyeri kira artışları TÜİK tarafından açıklanan 12 aylık TÜFE ortalamasını kesinlikle aşamaz.",
    "oncedenYapilacaklar": [
      "TÜİK'in ayın 3'ünde açıkladığı resmi 12 Aylık TÜFE Değişim Oranını (Örn: %62.51) not et",
      "Mevcut kira bedelini resmi TÜFE oranıyla çarparak yeni dönem yasal azami kira tutarını kuruşuna kadar hesapla",
      "Kiracıya yeni dönem kira bedelini ve banka IBAN numarasını içeren resmi bilgilendirme mesajını/ihtarını ilet",
      "Kira farkının takip eden ayın kira ödeme gününde eksiksiz yatırıldığını banka hesabından takip et"
    ]
  },
  {
    "id": "emlak_intifa_ve_ipotek_fekki",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "ipotek fek yazısı",
      "ipotek fekki",
      "banka fek müzekkeresi",
      "intifa hakkı terkini",
      "takyidatsız tapu"
    ],
    "baslik": "Banka İpotek Fek Müzekkeresi & İntifa Terkini",
    "ikon": "🏦",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Kredi Borcu Kapanışında",
    "hazirlikZamani": "Banka Kredi Kapanış Dekontu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏦 Konut kredisi bittiğinde banka ipoteği otomatik kalkmaz; bankadan Web-Tapu üzerinden elektronik fek müzekkeresi işletilmelidir.",
    "oncedenYapilacaklar": [
      "Banka konut kredisi erken kapama veya son taksit ödeme dekontunu alarak borcu sıfırla",
      "İlgili banka şubesine müracaat ederek Tapu Müdürlüğüne hitaben 'Elektronik İpotek Terkin (Fek) Bildirimi' yaptır",
      "Web-Tapu üzerinden ipotek fek harcını yatırıp ipoteğin kütükten silindiğini doğrula",
      "Taşınmaz üzerinde intifa veya sükna hakkı varsa hak sahibinin noterden terkin feragatnamesini tapuya ibraz et"
    ]
  },
  {
    "id": "denizcilik_acil_durum_dumen_testi",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "acil durum dümen testi",
      "solas reg 26",
      "dümen dairesi testi",
      "liman öncesi dümen",
      "emergency steering drill"
    ],
    "baslik": "SOLAS Reg. 26 Acil Durum Dümen Testi (Liman Öncesi 12 Saat)",
    "ikon": "🚢",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Limana Girişten 12 Saat Önce",
    "hazirlikZamani": "Dümen Dairesi Haberleşme Testi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚓ SOLAS Ch. V Reg. 26 gereği kalkıştan ve liman girişinden önceki 12 saat içinde dümen dairesinden acil durum dümen testi yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Köprüüstü ile Dümen Dairesi (Steering Gear Room) arasındaki dahili telefon ve telsiz irtibatını sına",
      "Ana hidrolik dümen pompalarını devreden çıkarıp acil durum hidrolik pompasını ve yerel kumanda kolunu devreye al",
      "Dümeni iskele 35° dereceden sancak 30° dereceye en geç 28 saniyede bastığını kronometreyle ölç",
      "Dümen açısı müşirinin köprüüstü göstergesiyle birebir eşleştiğini teyit edip Gemi Jurnaline (Logbook) işle"
    ]
  },
  {
    "id": "denizcilik_krank_saft_defleksiyon",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "krank şaft defleksiyonu",
      "crankshaft deflection",
      "ana makine yatak aşınması",
      "komparatör ölçümü krank",
      "çarkçıbaşı defleksiyon"
    ],
    "baslik": "Ana Makine Krank Şaftı Defleksiyon Ölçümü (Komparatör)",
    "ikon": "⚙️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Periyodik 3 Aylık / Liman Yatma",
    "hazirlikZamani": "Makine Soğuma & Tırnak Kilitleme",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "⚓ Ana yatak aşınması veya gövde distorsiyonunu önlemek için krank kolları arasına komparatör bağlanarak her silindirin defleksiyonu ölçülür.",
    "oncedenYapilacaklar": [
      "Makine karter kapaklarını açmadan önce yağlama pompasını durdur ve tırnak emniyet kilidini (Turning Gear) tak",
      "Silindir krank kolları arasına hassas mekanik komparatörü yerleştir ve sıfırla",
      "Tornagark motoruyla volanı yavaşça çevirerek ÜÖN (TDC), AÖN (BDC), İskele ve Sancak açılarında sapmaları kaydet",
      "Ölçülen değerleri üreticinin tolerans sınırlarıyla karşılaştırıp Class sörvey defterine aktar"
    ]
  },
  {
    "id": "denizcilik_kapali_mahal_enclosed_space",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "kapalı mahal giriş izni",
      "enclosed space entry",
      "balast tankına giriş",
      "tank havalandırma gemi",
      "imo kapalı mahal"
    ],
    "baslik": "Gemi Kapalı Mahal (Enclosed Space) Giriş İzni & Emniyet",
    "ikon": "🕳️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Tanka Girmeden Hemen Önce",
    "hazirlikZamani": "24 Saat Fan Havalandırması",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚓ IMO Res. A.1050(27) gereği çift dip, balast ve zincirlik tanklarına girişlerde O2 %20.9 teyit edilmeden izin formu imzalanamaz.",
    "oncedenYapilacaklar": [
      "Tank menhol kapaklarını açarak pnomatik hava fanlarıyla mahal içini en az 24 saat kesintisiz havalandır",
      "Kalibrasyonlu çoklu gaz dedektörüyle tankın dip, orta ve üst kesitlerinde O2, LEL, CO ve toksik gazları ölç",
      "Girecek personele kişisel gaz dedektörü, EEBD acil kaçış seti ve emniyet kemeri tak",
      "Tank menhol başında kesintisiz haberleşecek ve can halatını tutacak vardiyacı gözlemci personeli konuşlandır"
    ]
  },
  {
    "id": "denizcilik_kopruustu_vardiya_devri",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "köprüüstü vardiya devir",
      "oow vardiya teslimi",
      "gece görme adaptasyonu",
      "stcw köprüüstü nöbet",
      "vardiya zabiti teslim"
    ],
    "baslik": "Köprüüstü Seyir Vardiyası Devir Teslimi (OOW)",
    "ikon": "🧭",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Vardiya Saatinden 15 Dk Önce (00, 04, 08, 12, 16, 20)",
    "hazirlikZamani": "Karanlığa Göz Adaptasyonu (15 Dk)",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "⚓ STCW gereği vardiyayı devralacak zabit köprüüstüne 15 dk önce gelmeli, gece görüş adaptasyonunu tamamlamadan nöbeti teslim almamalıdır.",
    "oncedenYapilacaklar": [
      "Vardiyayı devralmadan önce köprüüstü kırmızı ışığında en az 10-15 dakika gözün karanlığa alışmasını sağla",
      "Radar/ARPA ekranından CPA (En Yakın Yaklaşma Noktası) ve TCPA riskli hedefleri ve çatışma olasılıklarını incele",
      "GPS mevkisini, rota açısını, gyro/manyetik pusula hatasını ve ECDIS emniyet konturunu doğrula",
      "Mevcut gemi draftı, kısıtlı görüş durumu ve Kaptan daimi talimatlarını okuyup karşılıklı imzayla vardiyayı devral"
    ]
  },
  {
    "id": "denizcilik_bwm_balast_degisimi_d2",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "bwm balast değişimi",
      "d-2 arıtma sistemi",
      "balast suyu jurnali",
      "bwm d-1 derin deniz",
      "liman balast tahliye"
    ],
    "baslik": "BWM Sözleşmesi Balast Suyu Arıtma (D-2) & Jurnal Kaydı",
    "ikon": "🌊",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Balast Alma / Basma İşlemi Anında",
    "hazirlikZamani": "BWTS UV / Elektroliz Sistemi Hazırlığı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚓ BWM Konvansiyonu uyarınca arıtmasız balast suları en yakın karadan en az 200 deniz mili açıkta ve 200 metre derinlikte değiştirilmelidir.",
    "oncedenYapilacaklar": [
      "Gemide kurulu onaylı Balast Suyu Arıtma Sistemini (BWTS - D-2 standardı) UV/klor dozajı için devreye al",
      "Arıtmasız D-1 balast değişimi yapılacaksa geminin mevkisinin en yakın karaya 200 milden uzak ve su derinliğinin >200 m olduğunu haritadan onayla",
      "Pompalanan veya yerçekimiyle tahliye edilen balast tanklarının numaralarını, başlangıç/bitiş koordinat ve hacimlerini kaydet",
      "Resmi Balast Suyu Kayıt Defterini (Ballast Water Record Book) ilgili operasyon kodlarıyla eksiksiz doldurup imzala"
    ]
  },
  {
    "id": "gumruk_diib_kapatma_sarfiyat",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "diib kapatma",
      "dahilde işleme izin belgesi",
      "hammadde sarfiyat tablosu",
      "dış ticaret diib taahhüt",
      "diib teminat çözümü"
    ],
    "baslik": "DİİB Dahilde İşleme İzin Belgesi Kapatma & Sarfiyat İcmali",
    "ikon": "📦",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Belge Süresi Bitişinden İtibaren 3 Ay",
    "hazirlikZamani": "Gümrük Çıkış Beyannameleri (GÇB) Derleme",
    "hazirlikSaatOncesi": 72,
    "akilliFisilti": "🛃 İhracatı taahhüt edilen malların hammaddeleri gümrüksüz ithal edilir; DİİB süresi bitiminde sarfiyat tablosuyla Ticaret Bakanlığına kapatma verilir.",
    "oncedenYapilacaklar": [
      "İthalat gümrük beyannameleri ile ihracat gümrük çıkış beyannamelerini (GÇB) sistemde eşleştir",
      "Ekspertiz raporuna ve kapasite raporuna uygun Hammadde Sarfiyat ve Fire Tablosunu hazırla",
      "DİİB kapsamındaki yurt içi alım faturalarını ve döviz transfer belgelerini dosyala",
      "Ticaret Bakanlığı İhracat Bilgi Sistemi üzerinden kapatma müracaatını yapıp gümrükteki nakit/mektup teminatı çözdür"
    ]
  },
  {
    "id": "gumruk_bill_of_lading_ordino_ciro",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "konşimento cirosu",
      "ordino teslim formu",
      "bill of lading bl",
      "orijinal konşimento teslimi",
      "acente ordino ücreti"
    ],
    "baslik": "Konşimento (B/L) Cirosu & Acente Ordino Teslimi",
    "ikon": "📜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Gemi Tahliyesinden Hemen Sonra",
    "hazirlikZamani": "Orijinal 3/3 B/L Banka Cirosu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🛃 Denizyolu ithalatında emre yazılı orijinal 3/3 konşimento banka cirosuyla hat acentesine verilmeden Ordino (Teslim Emri) alınamaz.",
    "oncedenYapilacaklar": [
      "Akreditifli işlemlerde amir bankadan cirolanmış orijinal Konşimento (Bill of Lading) nüshalarını teslim al",
      "Gemi acentesine lokal masraflar, ardiye ve terminal ücreti ödemesini yaparak dekontu ilet",
      "Cirolu konşimento aslını acenteye ibraz ederek resmi Teslim Emri (Ordino) belgesini tanzim ettir",
      "Gümrük memurunun BİLGE sisteminde ordino onayını görerek fiziki/belge muayeneyi tamamlamasını sağla"
    ]
  },
  {
    "id": "gumruk_supalan_muayene_bosaltma",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "supalan muayene",
      "taşıt üstü gümrükleme",
      "antrepo dışı supalan",
      "ağır tonaj supalan izni",
      "sahada supalan"
    ],
    "baslik": "Supalan Muayene (Taşıt Üstü Gümrükleme) İzni",
    "ikon": "🚛",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Araç Gümrüğe Geldiğinde (İvedi)",
    "hazirlikZamani": "Gümrük Müdürlüğü Supalan Dilekçesi",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🛃 Bozulabilir, ağır tonajlı veya dökme yüklerde gümrük antreposuna indirilmeden TIR/vagon üzerinde muayene için Supalan İzni alınır.",
    "oncedenYapilacaklar": [
      "Eşyanın niteliği gereği (bozulabilir gıda, kimyasal tanker, ağır makine) antrepoya inemeyeceğine dair supalan gerekçe yazısını yaz",
      "Gümrük İdaresine Supalan İzin Dilekçesini vererek sistemde supalan meşruhatını açtır",
      "Gümrük muayene memuru ve gümrük müşaviri nezaretinde araç dorsesi üzerindeki mühürleri açarak muayeneyi tamamlat",
      "Vergilerin ödenmesini müteakip aracı fabrikaya veya boşaltma sahasına doğrudan sevk et"
    ]
  },
  {
    "id": "gumruk_mense_kumulasyonu_tedarikci",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "menşe kümülasyonu",
      "tedarikçi beyanı",
      "pan-avrupa menşe",
      "uzun dönemli tedarikçi beyanı",
      "tercihli menşe"
    ],
    "baslik": "Pan-Avrupa Akdeniz Menşe Kümülasyonu & Tedarikçi Beyanı",
    "ikon": "🌐",
    "renk": "#FEF3C7",
    "varsayilanZaman": "EUR-MED Düzenleme Öncesi",
    "hazirlikZamani": "Alt Tedarikçi Beyanname Dosyası",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🛃 İhracatta çapraz kümülasyondan yararlanıp EUR-MED belgesi düzenleyebilmek için girdi sağlayan tedarikçilerden geçerli Tedarikçi Beyanı alınmalıdır.",
    "oncedenYapilacaklar": [
      "İhraç edilecek mamulün üretiminde kullanılan ithal girdilerin menşe ülkelerini (PAAMK üyesi ülkeler) doğrula",
      "Yurtiçi hammadde tedarikçilerinden ıslak kaşeli Uzun Dönemli Tedarikçi Beyanını (Long-term Supplier's Declaration) topla",
      "Menşe kuralları listesindeki katma değer kuralını (üçüncü ülke girdi oranı sınırı) maliyet tablosunda sına",
      "Ticaret Odasından onaylı EUR-MED menşe belgesini gümrük vizesine sun"
    ]
  },
  {
    "id": "gumruk_kiymet_bildirimi_navlun_royalti",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "gümrük kıymet bildirimi",
      "royalti lisans ücreti gümrük",
      "navlun sigorta eklemesi",
      "gümrük kıymeti hesabı",
      "cif kıymet tespiti"
    ],
    "baslik": "Gümrük Kıymet Bildirimi (Navlun, Sigorta, Royalti Eklemeleri)",
    "ikon": "🛃",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Beyanname Tescilinden Önce",
    "hazirlikZamani": "Fatura, Navlun Makbuzu & Lisans Sözleşmesi",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🛃 4458 sayılı Gümrük Kanunu m. 27 uyarınca royalti, lisans payı ve CIF teslim navlun/sigorta tutarları ithal eşyasının gümrük kıymetine eklenir.",
    "oncedenYapilacaklar": [
      "İthal faturası bedeline (FOB/EXW) nakliye navlun faturasını ve emtia nakliyat sigorta poliçesi primini ekle",
      "İthal eşyası için yurtdışındaki marka sahibine ödenen royalti veya patent lisans payı olup olmadığını sözleşmeden denetle",
      "Kıymet Bildirim Formunda (Form A) tüm ekleme ve indirim kalemlerini kuruşu kuruşuna beyan et",
      "Vergilendirmeye esas CIF Gümrük Kıymeti üzerinden Gümrük Vergisi, ÖTV ve KDV matrahlarını hesapla"
    ]
  },
  {
    "id": "ticaret_fatura_iptal_portal_e_arsiv_8gun",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "e-fatura itiraz portalı",
      "fatura iptal süresi 8 gün",
      "ttk 21/2 fatura itiraz",
      "kep üzerinden fatura itiraz",
      "e-arşiv fatura iptali"
    ],
    "baslik": "e-Fatura / e-Arşiv 8 Günlük Yasal İtiraz & İptal Portalı (TTK 21/2)",
    "ikon": "🧾",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Fatura Tebliğinden İtibaren 8 Gün",
    "hazirlikZamani": "İtiraz Gerekçesi & Fatura No Tespiti",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "🧾 TTK m. 21/2 uyarınca tebliğ alınan faturaya 8 gün içinde itiraz edilmezse faturanın içeriği ve fiyatı kayıtsız şartsız kabul edilmiş sayılır.",
    "oncedenYapilacaklar": [
      "Gelen ticari e-Faturayı sistemde \"Kabul\" veya \"Red\" durumuna göre derhal işaretle",
      "Temel e-Fatura veya e-Arşiv faturası ise GİB e-Fatura İptal/İtiraz Portalı üzerinden itiraz talebi oluştur",
      "Karşı tarafın itirazı onaylamaması riskine karşı noter veya KEP üzerinden 8 gün dolmadan ihtarname çek",
      "Fatura tutarını cari hesap mutabakatında ihtilaflı bakiye olarak işaretle"
    ]
  },
  {
    "id": "ticaret_garanti_belgesi_6502_tuketici_hakem_heyeti",
    "category": "resmi",
    "domain": "TICARET",
    "keywords": [
      "garanti belgesi yönetmeliği",
      "6502 sayılı kanun ayıplı mal",
      "tüketici hakem heyeti savunma",
      "azami tamir süresi 20 iş günü",
      "ürün değişim talebi"
    ],
    "baslik": "6502 Tüketici Kanunu Azami Tamir Süresi (20 İş Günü) & Değişim",
    "ikon": "⚖️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Servis Girişinden İtibaren 20 İş Günü",
    "hazirlikZamani": "Servis Giriş Formu & İkame Cihaz Temini",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "💼 Yetkili serviste 20 iş günü içinde tamir edilemeyen ürün için tüketici bedel iadesi veya sıfır ürün değişimi talep etme konusunda yasal hak kazanır.",
    "oncedenYapilacaklar": [
      "Cihazın servis giriş tarihini ve iş günü takvimini (resmi tatiller hariç) hesapla",
      "10 iş gününü aşan arızalarda tüketiciye benzer özelliklerde geçici ikame ürün tahsis et",
      "20 iş günü dolmadan parça temin edilemiyorsa distribütörden sıfır kapalı kutu muadil cihaz talep et",
      "Tüketici Hakem Heyetine intikal eden şikayette 15 günlük yasal savunma süresi içinde servis formlarını ibraz et"
    ]
  },
  {
    "id": "ticaret_pos_cihazi_dcc_komisyon_valor",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "pos blokeli çalışma",
      "pos valör hesabı",
      "ertesi gün pos komisyonu",
      "yabancı kart dcc kuru",
      "pos takas mutabakatı"
    ],
    "baslik": "Banka POS Valör & Komisyon Optimizasyonu (Bloke / Ertesi Gün)",
    "ikon": "💳",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Haftalık Finansman Raporlamasında",
    "hazirlikZamani": "Banka Üye İşyeri Sözleşmesi Oranları",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "💼 Yüksek komisyon ödemek yerine nakit akışına göre 28-32 gün blokeli veya ertesi gün düşük kesintili POS seçenekleri haftalık olarak dengelenmelidir.",
    "oncedenYapilacaklar": [
      "Banka üye işyeri portalından kesilen POS komisyon oranlarını ve ek hizmet bedellerini dök",
      "Nakit ihtiyacı olmayan tahsilatları blokeli hesaba yönlendirerek komisyon maliyetini sıfırla",
      "Yurtdışı kartlarda Dinamik Kur Dönüşümü (DCC) özelliğini açarak ilave esnaf gelir payını aktifleştir",
      "Gün sonu Z raporu slipleri ile banka ekstresindeki hesaba geçen net tutarları mutabakatla eşle"
    ]
  },
  {
    "id": "lojistik_havayolu_awb_tehlikeli_madde_dgr_dgr_shippers_dec",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "iata dgr kuralları",
      "shipper's declaration dangerous goods",
      "tehlikeli madde hava kargo",
      "un 3481 lityum iyon pil",
      "havayolu kargo awb"
    ],
    "baslik": "IATA DGR Havayolu Tehlikeli Madde Bildirimi & Shipper's Dec",
    "ikon": "✈️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Kargo Kabulünden 12 Saat Önce",
    "hazirlikZamani": "BM Onaylı Paketleme (UN Packaging)",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "✈️ Lityum batarya ve kimyasallarda kırmızı çizgili \"Shipper's Declaration\" formu yetkili IGR uzmanı imzası taşımadıkça uçağa yüklenemez.",
    "oncedenYapilacaklar": [
      "Maddenin Güvenlik Bilgi Formundan (MSDS) UN numarasını, ambalaj grubunu (Packing Group I/II/III) doğrula",
      "IATA DGR ambalaj talimatına (Packing Instruction) uygun UN onaylı kutu ve iç emici malzeme kullan",
      "Paketin üzerine Tehlikeli Madde sınıf etiketini ve \"Cargo Aircraft Only\" piktogramını yapıştır",
      "Kırmızı kenarlı DGR Shipper's Declaration formunu 2 nüsha tanzim edip Master Air Waybill (AWB) ile birleştir"
    ]
  },
  {
    "id": "lojistik_demiryolu_cim_hamule_senedi",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "demiryolu cim belgesi",
      "hamule senedi demiryolu",
      "cotif sözleşmesi",
      "vagon mühürleme tutanağı",
      "uluslararası tren yükü"
    ],
    "baslik": "Demiryolu CIM Hamule Senedi & Vagon Aks Yükü Emniyeti",
    "ikon": "🚆",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Tren Hareketinden 4 Saat Önce",
    "hazirlikZamani": "Vagon Yükleme & Dara / Net Ağırlık Ölçümü",
    "hazirlikSaatOncesi": 3,
    "akilliFisilti": "🚛 COTIF Sözleşmesi kapsamında düzenlenen CIM Hamule Senedi, demiryolu taşıma sözleşmesinin kesin delilidir; vagon aşırı yüklemesi raydan çıkma riskidir.",
    "oncedenYapilacaklar": [
      "Vagonun dingil basınç sınıfına (A, B, C, D) göre azami yükleme kapasitesini kontrol et",
      "Yükün vagon tabanına homojen dağıtıldığını ve çelik halat gergilerle sabitlendiğini denetle",
      "Vagon kapaklarını cırcırlı kilit ve TCDD/demiryolu idaresi güvenlik mührü ile mühürle",
      "Yeşil renkli CIM Hamule Senedini doldurup sınır geçiş istasyonları gümrük kodlarını işle"
    ]
  },
  {
    "id": "lojistik_konteyner_vgm_dolu_agirlik_solas_tartim",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "vgm doğrulanmış brüt ağırlık",
      "solas vgm tartım belgesi",
      "liman konteyner tartımı",
      "yöntem 1 konteyner kantar",
      "gemiye yükleme onayı vgm"
    ],
    "baslik": "SOLAS Konteyner Doğrulanmış Brüt Ağırlık (VGM) Sertifikası",
    "ikon": "⚓",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Liman Cut-Off Süresinden Önce",
    "hazirlikZamani": "Kantar Tartım Fişi & Yöntem 1/2 Hesaplaması",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🚛 SOLAS Kural VI/2 gereğince resmi VGM sertifikası olmayan hiçbir konteyner gemiye yüklenemez; tartım beyanı ile kantar farkı %5'i geçemez.",
    "oncedenYapilacaklar": [
      "Yöntem 1 (Konteynerin kantarda tartılması) veya Yöntem 2 (Paketlerin toplanıp konteyner darası eklenmesi) tercihini yap",
      "Ulaştırma Bakanlığı onaylı lisanslı kantar istasyonundan tartım çıktısı al",
      "Liman ve acente sistemine konteyner numarası, mühür numarası ve VGM kilogram değerini ilet",
      "Gemi yükleme planı (stowage plan) onayını alıp gümrük kapama işlemini tamamla"
    ]
  },
  {
    "id": "lojistik_depo_wms_fifo_fefo_lot_izlenebilirlik",
    "category": "is_kariyer",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "depo wms sistemi",
      "fifo fefo kuralı",
      "lot parti izlenebilirliği",
      "raf ömrü son kullanma",
      "depo adresleme barkod"
    ],
    "baslik": "WMS Akıllı Depo Yönetimi: FEFO / FIFO & Lot Takibi",
    "ikon": "📦",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sipariş Toplama (Picking) Emrinde",
    "hazirlikZamani": "Palet Barkod Okutma & Raf Adresleme",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "📦 Gıda ve ilaç lojistiğinde FEFO (İlk Miadı Dolan İlk Çıkar) kuralı zorunludur; aksi takdirde rafta miadı dolan ürün imha maliyetine yol açar.",
    "oncedenYapilacaklar": [
      "El terminali (RF Terminal) ile toplanacak siparişin SKT ve lot numarasını doğrula",
      "Sistemin önerdiği en yakın miatlı raf lokasyonuna (Aisle-Bay-Level) git",
      "Palet barkodunu okutarak partinin blokeli veya karantinada olmadığını teyit et",
      "Toplanan kolileri sevk konsolidasyon alanına indirip sevk irsaliyesi ile eşle"
    ]
  },
  {
    "id": "lojistik_kabotaj_ve_yol_boyu_takip_mobil_geofence",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "araç takip geofence",
      "güzergah dışına çıkma alarmı",
      "rota sapması lojistik",
      "soğuk zincir sıcaklık sensörü gps",
      "filo panik butonu"
    ],
    "baslik": "Filo GPS Geofence (Güvenli Rota) & Canlı Sıcaklık Telemetrisi",
    "ikon": "🛰️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Sevkiyat Süresince Kesintisiz",
    "hazirlikZamani": "Güzergah Koridoru ve İhlal Toleransı (500 Metre)",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🚛 Yüksek değerli veya soğuk zincirli yüklerde tanımlı geofence koridoru dışına çıkıldığında veya sıcaklık 1°C saptığında filo merkezine anlık SMS alarmı düşer.",
    "oncedenYapilacaklar": [
      "Telematik sisteminde kalkış ve varış noktası arasına 500 m yarıçaplı sanal çit (geofence) rotası çiz",
      "Dorsedeki sıcaklık sensörünün alt ve üst limitlerini (-18°C / -22°C) sisteme tanıt",
      "Şoförün mola verebileceği onaylı güvenli TIR parklarını rota üzerine işaretle",
      "Acil durum butonunun ve kapı açıldı sensörünün sinyal gönderimini test et"
    ]
  },
  {
    "id": "gayrimenkul_kat_irtifaki_kat_mulkiyeti_cins_tashih",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "cins tashihi kat mülkiyeti",
      "kat irtifakından kat mülkiyetine",
      "yapı kullanma izin belgesi iskan",
      "belediye iskan cins değişikliği",
      "tapu cins tashihi harcı"
    ],
    "baslik": "Kat İrtifakından Kat Mülkiyetine Geçiş (Cins Tashihi & İskan)",
    "ikon": "🏢",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İskan Belgesi Alındığında",
    "hazirlikZamani": "Yapı Kullanma İzin Belgesi & Döner Sermaye",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏠 634 sayılı Kat Mülkiyeti Kanunu m. 10 uyarınca Yapı Kullanma İzin Belgesi (İskan) alındığında belediye resen tapuya bildirerek kat mülkiyetine resen tescil ettirir.",
    "oncedenYapilacaklar": [
      "Belediye İmar Müdürlüğünden onaylı Yapı Kullanma İzin Belgesi (İskan) suretini al",
      "Binanın röperli krokisi, mimari projesi ve bağımsız bölüm listesi mutabakatını sağla",
      "Web-Tapu üzerinden \"Cins Değişikliği (Cins Tashihi)\" başvurusunu başlat",
      "Tapu döner sermaye harcını ödeyip kat mülkiyeti tapu senetlerinin maliklere teslimini koordine et"
    ]
  },
  {
    "id": "gayrimenkul_onsozlesme_gayrimenkul_satis_vaadi_noter",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "gayrimenkul satış vaadi sözleşmesi",
      "noterde satış vaadi",
      "tapuya şerh verme 5 yıl",
      "tbk 237 satış vaadi",
      "ön ödemeli konut satışı"
    ],
    "baslik": "Noter Onaylı Gayrimenkul Satış Vaadi Sözleşmesi & Tapu Şerhi",
    "ikon": "📜",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Noter Randevu Saati",
    "hazirlikZamani": "Tapu Kayıt Örneği & İnşaat Tamamlama Teminatı",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🏠 TBK m. 237 ve TMK m. 1009 uyarınca gayrimenkul satış vaadi noter huzurunda düzenleme şeklinde yapılmazsa geçersizdir; tapuya şerh verilmezse 3. kişilere karşı korunmaz.",
    "oncedenYapilacaklar": [
      "Taşınmazın güncel takyidatlı tapu kaydını sorgulayarak üzerinde haciz/ipotek olmadığını gör",
      "Noterde düzenleme şeklinde Gayrimenkul Satış Vaadi Sözleşmesini taraflara okutup imzalattır",
      "Sözleşmeyi Tapu Sicil Müdürlüğüne götürerek tapu kütüğünün şerhler sütununa (5 yıl geçerli) işlet",
      "Ödeme takvimine göre banka dekontlarını sözleşme ekine iliştir"
    ]
  },
  {
    "id": "gayrimenkul_kira_tespit_davasi_5yil_tbk344",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "kira tespit davası",
      "5 yılı dolduran kiracı",
      "tbk 344/3 kira artışı",
      "emsal kira rayiç bedeli",
      "hakkaniyet indirimi kira"
    ],
    "baslik": "5 Yılı Dolan Kiracı İçin Kira Tespit Davası & Rayiç Belirleme (TBK 344)",
    "ikon": "📈",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yeni Kira Döneminden En Az 30 Gün Önce",
    "hazirlikZamani": "Emsal Kira Sözleşmeleri & İhtarname",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏠 TBK m. 344/3 gereği 5 yılı dolduran kira sözleşmelerinde TÜFE oranıyla bağlı kalmaksızın hakim emsal rayiç kira bedeline göre hakkaniyete uygun kira belirler.",
    "oncedenYapilacaklar": [
      "Kira sözleşmesinin 5. yıl dönümünü hesapla ve yeni dönemden en az 30 gün önce noterden ihtarname tebliğ ettir",
      "Bölgedeki emsal kiralık taşınmaz ilanlarını ve sahibinden rayiç kontrat örneklerini dosyala",
      "Sulh Hukuk Mahkemesinde Kira Tespit Davası açarak keşif ve bilirkişi incelemesi talep et",
      "Bilirkişi raporunda hesaplanan rayiçten hakkaniyet indirimi (%10-20) düşülerek belirlenen yeni kiranın geriye dönük farkını talep et"
    ]
  },
  {
    "id": "gayrimenkul_parselasyon_18_madde_dop_uygulamasi",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "imar kanunu 18. madde",
      "düzenleme ortaklık payı dop",
      "parselasyon planı askı",
      "kadastro ifraz tevhid",
      "30 gün askı süresi itiraz"
    ],
    "baslik": "İmar Kanunu 18. Madde Parselasyon & DOP Kesintisi İtirazı",
    "ikon": "📐",
    "renk": "#FED7AA",
    "varsayilanZaman": "Belediye Askı İlanında (30 Gün)",
    "hazirlikZamani": "Eski Kadastro ve Yeni İmar Parseli Çakıştırma",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🏠 3194 sayılı İmar Kanunu 18. madde uygulamasında Düzenleme Ortaklık Payı (DOP) en fazla %45 kesilebilir; 30 günlük askı süresinde itiraz edilmezse plan kesinleşir.",
    "oncedenYapilacaklar": [
      "Belediye ilan panosunda veya internet sitesinde parselasyon cetvelini ve dağıtım krokisini incele",
      "Taşınmazdan kesilen DOP oranının yasal sınır olan %45'i aşıp aşmadığını hesapla",
      "Kök parselin yerinden çok uzak ve değersiz bir bölgeden hisseli verilip verilmediğini kontrol et",
      "30 günlük yasal askı süresi dolmadan Belediye Encümenine gerekçeli itiraz dilekçesini ver"
    ]
  },
  {
    "id": "gayrimenkul_intifa_hakkı_kuru_mulkiyet_tescili",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "intifa hakkı tesisi",
      "çıplak mülkiyet kuru mülkiyet",
      "tmk 794 intifa",
      "tapuda intifa hakkı harcı",
      "intifa terkin ölüm"
    ],
    "baslik": "Tapuda İntifa Hakkı & Çıplak (Kuru) Mülkiyet Devri (TMK 794)",
    "ikon": "🔑",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Tapu Devir Randevusunda",
    "hazirlikZamani": "İntifa / Kuru Mülkiyet Değerleme Oranları (1/3 - 2/3)",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🏠 TMK m. 794 gereği intifa hakkı sahibi taşınmazdan tam yararlanma ve kira gelirini toplama hakkına sahiptir; vefatı halinde hak kendiliğinden sona erer.",
    "oncedenYapilacaklar": [
      "Web-Tapu üzerinden intifa hakkının saklı tutulması ve çıplak mülkiyetin devri başvurusunu seç",
      "Emlak beyan değerinin 2/3'ü intifa, 1/3'ü çıplak mülkiyet esasına göre tapu harcını hesapla",
      "Resmi senette intifa hakkı süresini (ömür boyu veya belirli yıl) açıkça belirt",
      "Tapu tescilinden sonra emlak vergisi mükellefiyetinin intifa hakkı sahibine ait olduğunu belediyeye bildir"
    ]
  },
  {
    "id": "denizcilik_filika_indirme_solas_matafora_talimi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "filika indirme talimi",
      "matafora serbest bırakma kancası",
      "solas abandon ship drill",
      "filika motoru çalıştırma",
      "haftalık can filikası kontrolü"
    ],
    "baslik": "SOLAS Terk-i Sefine (Abandon Ship) & Matafora Filika İndirme",
    "ikon": "🚢",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Her Hafta / Liman Devleti Denetiminde",
    "hazirlikZamani": "Can Yelekleri & Telsiz SART / EPIRB Kontrolü",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚓ SOLAS Bölüm III gereği her mürettebat ayda en az bir kez can filikası talimine katılmalı, filika 3 ayda bir denize indirilip suda yüzdürülmelidir.",
    "oncedenYapilacaklar": [
      "Gemi genel alarm zilini (7 kısa 1 uzun düdük) çalarak mürettebatın filika istasyonunda toplanmasını sağla",
      "Matafora emniyet pimlerini çıkarıp filikayı güverte borda seviyesine mayna et",
      "Filikanın su altı tahliye tapasının sıkıca takılı olduğunu ve motorun aküsünü kontrol et",
      "On-load / off-load hidrolik serbest bırakma kancasını emniyet kilidinden açıp tatbikatı gemi jurnaline (Log Book) kaydet"
    ]
  },
  {
    "id": "denizcilik_separatör_purifier_agir_yakit_hfo",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "yakıt separatörü arıtma",
      "hfo purifier çamur atma",
      "gravite diski seçimi",
      "ağır yakıt santrifüj separatör",
      "makine dairesi separatör şoklama"
    ],
    "baslik": "Ağır Yakıt (HFO) Santrifüj Separatörü (Purifier) & Su Tahliyesi",
    "ikon": "⚙️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Yakıt Servis Tankına Basım Sırasında",
    "hazirlikZamani": "Yakıt Yoğunluğu & Sıcaklık (98°C) Ayarı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚓ HFO separatöründe yakıt sıcaklığı 98°C'de sabit tutulmalı ve yakıt yoğunluğuna uygun gravite diski takılmalıdır; aksi takdirde su ana makineye yürür.",
    "oncedenYapilacaklar": [
      "HFO ağır yakıt ön ısıtıcısını 98°C'ye ayarlayarak viskozitenin santrifüj arıtma seviyesine düşmesini sağla",
      "Bunker analiz raporundaki yakıt yoğunluğuna göre doğru iç çaptaki gravite diskini hazneye tak",
      "Separatör devrinin nominal hıza (8000-10000 RPM) ulaştığını ve titreşimin yeşil aralıkta olduğunu gör",
      "Su kilidi oluşturmak için kaseye sıcak su verip ardından yakıt giriş valfini aç ve saatlik otomatik çamur atma (desludge) süresini kur"
    ]
  },
  {
    "id": "denizcilik_kolreg_catisma_onleme_tcpa_dcpa",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "colreg çatışmayı önleme tüzüğü",
      "tcpa ve dcpa alarmı radar",
      "hedef yaklaşma mesafesi arpa",
      "aykırı geçen tekne kuralı",
      "pruva rotası sancak sancak"
    ],
    "baslik": "COLREG Kural 15-16: Çatışma Riski, Radar ARPA DCPA/TCPA Sınırı",
    "ikon": "🧭",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Seyir Vardiyası Süresince",
    "hazirlikZamani": "ARPA Radar Vektörleri & CPA Sınır Ayarı (Min 1.5 NM)",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "⚓ COLREG uyarınca sancağında diğer tekneyi gören gemi yol vermekle yükümlüdür; DCPA < 1.0 Deniz Mili ve TCPA < 15 dakika ise erken ve belirgin rota değişikliği şarttır.",
    "oncedenYapilacaklar": [
      "ARPA radar üzerinde emniyetli yaklaşma mesafesini (DCPA min. 1.5 NM, TCPA min. 12 dk) limitle",
      "Kesişen rotada sancak tarafından yaklaşan hedef geminin kerterizinin değişmediğini optik pelorus ile doğrula",
      "Yol hakkı olmayan gemi olarak diğer geminin pruvasından geçmekten kaçınacak şekilde sancağa rota değiştir",
      "Yapılan manevranın diğer gemi radarında net görülmesi için en az 20-30 derecelik cüretkar dümen açısı ver"
    ]
  },
  {
    "id": "denizcilik_isps_kod_guvenlik_seviyesi_2_marsa",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "isps gemi güvenlik planı",
      "güvenlik seviyesi security level 2",
      "marsa liman giriş kontrolü",
      "gemi güvenlik zabiti sso",
      "bordaya tırmanma engeli jiletli tel"
    ],
    "baslik": "ISPS Kodu Uluslararası Gemi Güvenliği & Seviye 2 (Security Level 2)",
    "ikon": "🛡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Riskli Liman / Bölgeye Girişte",
    "hazirlikZamani": "Borda Çarmıhı Koruması & Güvenlik Nöbetçisi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚓ Liman veya bayrak devleti Security Level 2 ilan ettiğinde tüm kilitli kapılar kilitlenir, borda aydınlatması açılır ve güverteye giriş yapan herkes aranır.",
    "oncedenYapilacaklar": [
      "Gemi Güvenlik Zabiti (SSO) tarafından mürettebata Güvenlik Seviyesi 2 bilgilendirmesi yap",
      "Borda iskelesi haricindeki tüm giriş noktalarını, ambar kapaklarını ve başaltı girişlerini kilitle",
      "Gemiye gelen ziyaretçilerin, kumanyacıların ve çantalarının %100 kimlik ve dedektör aramasını yap",
      "Korsanlık riski olan sularda güverte küpeştelerine jiletli tel ve tazyikli yangın hortumu bariyeri kur"
    ]
  },
  {
    "id": "denizcilik_demirleme_kaloma_zincir_kilidi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "demirleme kaloma miktarı",
      "zincir kilit sayısı kilit 27.5 m",
      "ırgat freni demir atma",
      "demir tarama alarmı gps",
      "su derinliğinin 4 katı kaloma"
    ],
    "baslik": "Demirleme Manevrası: Kaloma Miktarı & Irgat Fren Emniyeti",
    "ikon": "⚓",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Demir Sahasına Girişte",
    "hazirlikZamani": "Derinlik İskandili & Başüstü İletişimi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "⚓ Normal havada su derinliğinin 4 katı, fırtınalı havada 6-7 katı zincir (1 kilit = 27.5 metre) kaloma verilmelidir; GPS demir tarama alarmı kurulmalıdır.",
    "oncedenYapilacaklar": [
      "Başüstü personeli ırgat hidroliğini çalıştırıp demir tırnağını loçadan suya kadar viraya alsın",
      "Köprüüstü rüzgarı ve akıntıyı başa alıp gemiyi geri yola geçirdiği anda ırgat frenini gevşeterek demiri funda et",
      "Hedeflenen kilit sayısına (örn: 6 kilit suda) ulaşıldığında ırgat frenini sıkıp zincir kastanyolasını kilitle",
      "Köprüüstü ECDIS sisteminde demir dairesini (swing circle) çizip demir tarama (anchor watch) alarmını aktifleştir"
    ]
  },
  {
    "id": "gumruk_antrepo_7100_antrepo_beyannamesi_teminat",
    "category": "arac_ulasim",
    "domain": "GUMRUK",
    "keywords": [
      "antrepo beyannamesi 7100",
      "a tipi genel antrepo",
      "antrepo elleçleme izni",
      "gümrük gözetimi antrepo",
      "antrepo süresiz kalış"
    ],
    "baslik": "Antrepo Rejimi (7100 Rejim Kodu) & Gümrük Teminatı",
    "ikon": "🏬",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Eşya Antrepoya Boşaltılmadan Önce",
    "hazirlikZamani": "Özet Beyan & Antrepo Giriş Sayım Tutanağı",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🛃 7100 rejiminde eşya vergileri ödenmeksizin antrepoda süresiz kalabilir; ithalat vergilerinin tamamını karşılayan toplu veya münferit teminat bloke edilir.",
    "oncedenYapilacaklar": [
      "Özet beyan ile gelen eşya kap/kilo adetlerini antrepo işleticisiyle beraber fiziki sayımla karşılaştır",
      "Gümrük sisteminde 7100 rejim kodlu Antrepo Beyannamesini tescil et",
      "İthalat vergileri ve KDV tutarı kadar banka teminat mektubunu gümrük veznesinde bloke et",
      "Gümrük muhafaza memuru gözetiminde araç mührünü söküp eşyayı antrepo gözüne (lokasyonuna) istifle"
    ]
  },
  {
    "id": "gumruk_yetkilendirilmis_yukumlu_yys_yesil_hat",
    "category": "arac_ulasim",
    "domain": "GUMRUK",
    "keywords": [
      "yetkilendirilmiş yükümlü statüsü yys",
      "yeşil hat gümrükleme",
      "yerinde gümrükleme izni",
      "yys emniyet ve güvenlik kriteri",
      "gümrüksüz doğrudan sevk"
    ],
    "baslik": "Yetkilendirilmiş Yükümlü Statüsü (YYS) & Yeşil Hat Kolaylığı",
    "ikon": "🟢",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İhracat/İthalat Beyannamesi Tescilinde",
    "hazirlikZamani": "YYS İzinli Gönderici Sertifika Kontrolü",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🛃 YYS sertifikasına sahip firmaların beyannameleri doğrudan Yeşil Hatta düşer; belge kontrolü ve fiziki muayeneye tabi tutulmadan sınıra sevk edilir.",
    "oncedenYapilacaklar": [
      "İhracat beyannamesini YYS sahibi firma sicil numarası ve Yeşil Hat yetkisiyle sistemden gönder",
      "Sistemin otomatik olarak \"Yeşil Hat\" statüsü verdiğini ve bloke konulmadığını teyit et",
      "Fabrika sahasında aracın kapılarını mühürleyip \"Özel Mühür Takma Tutanağı\"nı düzenle",
      "TIR'ı iç gümrük idaresine uğratmadan doğrudan sınır çıkış kapısına sevk et"
    ]
  },
  {
    "id": "gumruk_bedelsiz_ithalat_garanti_ikame_parca",
    "category": "arac_ulasim",
    "domain": "GUMRUK",
    "keywords": [
      "bedelsiz ithalat beyannamesi",
      "garanti kapsamında parça değişimi",
      "bedelsiz fatura customs value only",
      "ithalat garanti belgesi arıza tutanağı",
      "gümrük kıymet tespiti bedelsiz"
    ],
    "baslik": "Garanti Kapsamında Bedelsiz İthalat & Gümrük Kıymet Tespiti",
    "ikon": "📦",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Kargo Girişinde",
    "hazirlikZamani": "Yurtdışı Arıza Formu & Bedelsiz Fatura",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "🛃 Bedelsiz gelse bile faturada \"Value for Customs Purposes Only\" ibaresiyle gümrük kıymeti gösterilmeli ve garanti kapsamında olduğu yetkili servis raporuyla belgelenmelidir.",
    "oncedenYapilacaklar": [
      "Yurtdışı tedarikçiden gelen fatura üzerinde mal bedelinin garanti gereği bedelsiz olduğunu belirten şerhi kontrol et",
      "Orijinal cihazın daha önceki ithalat beyannamesi numarasını ve garanti belgesi fotokopisini dosyala",
      "Gümrük Kanunu m. 24 gereği emsal kıymet üzerinden gümrük vergisi ve KDV matrahını hesapla",
      "Gümrük muayene memuruna arızalı eski parçanın yurtdışına iade edileceği veya imha edileceği taahhütnamesini sun"
    ]
  },
  {
    "id": "gumruk_tasfiye_45_gun_sure_asimi_antrepo_tasfiyelik",
    "category": "arac_ulasim",
    "domain": "GUMRUK",
    "keywords": [
      "tasfiyelik eşya gümrük",
      "45 günlük gümrük bekleme süresi",
      "denizyolu 45 gün tasfiye",
      "tasfiye işletme müdürlüğü tasiş",
      "süre uzatım dilekçesi gümrük"
    ],
    "baslik": "Gümrük Kanunu 45 Günlük Bekleme Süresi & TASİŞ Tasfiye Riski",
    "ikon": "⏳",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Özet Beyandan İtibaren 45. Günde",
    "hazirlikZamani": "Gümrük Süre Uzatım Başvurusu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🛃 Gümrük Kanunu m. 46 gereğince denizyoluyla gelen eşyaya 45 gün içinde bir gümrük rejimi tayin edilmezse eşya TASİŞ'e devredilip kamulaştırılır.",
    "oncedenYapilacaklar": [
      "Özet beyan tescil tarihinden itibaren geçen takvim gününü sistemden takip et",
      "45 gün dolmadan ithalat beyannamesi tescil edilemiyorsa gümrük idaresine 30 günlük ek süre talep dilekçesi ver",
      "Eşyanın tasfiye listesine düşüp düşmediğini Gümrük Muhafaza sisteminden teyit et",
      "Gecikme zammı ve ardiye cezalarını ödeyerek tasfiyeye kalma kararını düşür"
    ]
  },
  {
    "id": "gumruk_atr_dolasim_belgesi_vize_ve_sonradan_kontrol",
    "category": "arac_ulasim",
    "domain": "GUMRUK",
    "keywords": [
      "a.tr dolaşım belgesi",
      "türkiye ab gümrük birliği",
      "a.tr gümrük vizesi",
      "serbest dolaşım belgesi",
      "a.tr sonradan kontrol talebi"
    ],
    "baslik": "Türkiye-AB Gümrük Birliği: A.TR Dolaşım Belgesi & Gümrük Vizesi",
    "ikon": "📜",
    "renk": "#DDD6FE",
    "varsayilanZaman": "İhracat Çıkışından Önce",
    "hazirlikZamani": "Ticaret Odası Onayı & Gümrük Memuru Mührü",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🛃 Türkiye ile AB arasındaki sanayi ürünlerinde gümrük vergisiz serbest dolaşım için A.TR belgesinin Ticaret Odası ve Gümrükçe onaylanıp vize edilmesi şarttır.",
    "oncedenYapilacaklar": [
      "İhraç edilecek sanayi ürününün Türkiye'de serbest dolaşımda (üretilmiş veya ithal vergisi ödenmiş) olduğunu teyit et",
      "MEDOS (Elektronik Menşe Sistemi) üzerinden A.TR belgesini doldurup bağlı bulunulan Ticaret Odasına elektronik onaya gönder",
      "Oda onayından sonra gümrük muayene memurunun elektronik vize kodunu (yeşil damga) al",
      "Belge numarasını ihracat beyannamesinin 44 nolu hanesine tescil et"
    ]
  },
  {
    "id": "ticaret_stok_sayim_farki_fire_ve_zayiat_tutanagi",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "yıl sonu stok sayımı",
      "stok sayım farkı tutanağı",
      "fire ve zayiat sınırları ticaret odası",
      "stok noksanı ve fazlası kaydı",
      "153 hesap sayım düzeltmesi"
    ],
    "baslik": "Yıl Sonu Fiziki Stok Sayımı, Fire Oranları & Zayiat Tutanağı",
    "ikon": "📦",
    "renk": "#DCFCE7",
    "varsayilanZaman": "31 Aralık Tarihi İtibarıyla",
    "hazirlikZamani": "El Terminalleri & Sayım Heyeti Görevlendirmesi",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "💼 Ticaret Odası resmi fire oranlarını aşmayan fireler gider yazılır; normal dışı zayiat veya çalınma durumunda takdir komisyonu kararı olmadan KDV indirimi yapılamaz.",
    "oncedenYapilacaklar": [
      "Depodaki tüm rafların barkodlu sayımını yaparak fiili envanter listesi çıkar",
      "Muhasebe programındaki ERP kayıtlı stok ile sayım sonucu arasındaki artı/eksi farkları tespit et",
      "Bozulma, ezilme veya fire kaynaklı eksilmeleri Ticaret Odası azami fire hadleriyle karşılaştır",
      "Fire ve Zayiat Tespit Tutanağını sayım komisyonu ve şirket yetkilisiyle birlikte imzalayıp kayıtlara geçir"
    ]
  },
  {
    "id": "ticaret_fason_tekstil_uretim_ve_tevkifatli_fatura",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "fason tekstil faturası",
      "fason dikim kdv tevkifatı 7/10",
      "tekstil fason işçilik sözleşmesi",
      "fason numune onay formu",
      "ihracat kayıtlı fason kesim"
    ],
    "baslik": "Fason Tekstil Üretimi & 7/10 KDV Tevkifatlı Fatura Tanzimi",
    "ikon": "🧵",
    "renk": "#EDE9FE",
    "varsayilanZaman": "İş Teslimi ve İrsaliye Kesiminde",
    "hazirlikZamani": "Pastal Planı & Fire/Kumaş Sarfiyat Mutabakatı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "💼 Fason tekstil ve konfeksiyon işlerinde KDV Genel Uygulama Tebliği uyarınca faturada 7/10 oranında KDV tevkifatı uygulanması yasal zorunluluktur.",
    "oncedenYapilacaklar": [
      "Müşterinin sağladığı ham kumaş irsaliyesi ile kesim/dikim pastal verimini eşle",
      "Fason faturasında işçilik bedeli üzerinden hesaplanan %20 KDV'nin 7/10'unu alıcı adına tevkif et",
      "Fatura üzerine \"KDV Kanunu m. 9 uyarınca 7/10 tevkifat uygulanmıştır\" kaşesini ekle",
      "e-Faturayı GİB portalı üzerinden onaylayıp sevk irsaliyesi fotokopisini faturaya ekle"
    ]
  },
  {
    "id": "ticaret_cek_senet_protesto_noter_ihbar_ttk720",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "karşılıksız çek şerhi",
      "ttk 720 çek protestosu",
      "çek arkası yazdırma banka",
      "bankanın ödemekle yükümlü olduğu asgari tutar",
      "protesto süresi 2 iş günü"
    ],
    "baslik": "Karşılıksız Çek Banka Şerhi & TTK m. 720 Protesto İşlemleri",
    "ikon": "💳",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İbraz Süresinin Ertesi İş Günü",
    "hazirlikZamani": "Çek Aslı & Banka Gişe İbrazı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💼 5941 sayılı Çek Kanunu gereği banka çek yaprağı başına yasal garanti tutarını ödemek zorundadır; müracaat hakkı için karşılıksız kaşesi aynı gün vurdurulmalıdır.",
    "oncedenYapilacaklar": [
      "Çeki yasal ibraz süresinde muhatap banka şubesine ibraz ederek karşılığını sor",
      "Hesapta para yoksa bankadan yasal yaprak garanti tutarının (örn: 9.270 TL) tahsilatını yap",
      "Çekin arka yüzüne bankaca resmi \"Karşılıksızdır\" kaşesi, tarih ve yetkili imzasını işlettir",
      "Cirantalara rücu edebilmek için TTK m. 720 gereği protesto veya banka tespiti belgesiyle icra takibi aç"
    ]
  },
  {
    "id": "lojistik_incoterms_ddp_ithalat_gumruk_vergisi_ve_teslim",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "incoterms ddp teslim",
      "delivered duty paid",
      "ithalat vergileri satıcıya ait",
      "ddp varış yeri teslim",
      "kapıdan kapıya ddp nakliye"
    ],
    "baslik": "Incoterms 2020: DDP (Gümrük Vergileri Ödenmiş Teslim) Kuralları",
    "ikon": "🌍",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Alıcı Adresine Boşaltma Öncesinde",
    "hazirlikZamani": "Varış Ülkesi İthalat Vergileri & KDV Ödemesi",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🚛 DDP teslimde satıcı, varış ülkesindeki tüm ithalat gümrük vergilerini ve formalitelerini üstlenir; alıcı sadece aracı boşaltmaktan sorumludur.",
    "oncedenYapilacaklar": [
      "Varış ülkesindeki yerel gümrük müşaviri ile irtibata geçerek gümrük vergisi ve KDV tutarını peşin öde",
      "Taşıma belgesi (CMR/AWB/B/L) üzerine açıkça \"Incoterms 2020 DDP (Alıcı Fabrika Adresi)\" şerhini yazdır",
      "İthalat gümrük beyannamesi kapandıktan sonra serbest dolaşıma giriş belgesini al",
      "Aracı alıcının deposuna sevk edip teslim tutanağını (POD) hasarsız teslim şerhiyle imzalattır"
    ]
  },
  {
    "id": "lojistik_havayolu_uld_konteyner_kontur_agirlik_dengesi",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "hava kargo uld konteyner",
      "ake palet hava kargo",
      "uçak ağırlık denge loadsheet",
      "uld kilit mandalı emniyeti",
      "hava kargo file bağlama"
    ],
    "baslik": "Hava Kargo: ULD Palet Yükleme, Kontur Uyumu & Loadsheet",
    "ikon": "✈️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Uçak Yükleme Saatinden 3 Saat Önce",
    "hazirlikZamani": "Konteyner Darası & Güvenlik Filesi (Net) Kontrolü",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "✈️ ULD konteynerin gövde konturu uçak kabin eğrisine tam uymalı; kargo fileleri sıkılmalı ve kilit mandalları kilitlenmeden uçuş emniyeti verilemez.",
    "oncedenYapilacaklar": [
      "AKE veya PMC paletin tabanında çatlak veya eğrilik olmadığını gözle muayene et",
      "Paketleri ağır olanlar tabanda olacak şekilde istifleyip uçak tavan kontur şablonuna göre diz",
      "Onaylı hava kargo bağlama filesini palet tırnaklarına geçirip gergilerini sıkarak kitle",
      "Tartılan brüt palet ağırlığını ve ULD numarasını uçağın Load Control merkezine bildirip Loadsheet'e işle"
    ]
  },
  {
    "id": "lojistik_demiryolu_blok_tren_intermodal_huckepack",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "intermodal taşımacılık",
      "huckepack treyler vagonu",
      "blok tren lojistik",
      "vinçle dorse kaldırma intermodal",
      "cep vagonu cep vagonu tır"
    ],
    "baslik": "Intermodal Taşımacılık: Huckepack Cep Vagonu Dorse Yükleme",
    "ikon": "🚆",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Tren Yükleme Slotunda",
    "hazirlikZamani": "P400 Onaylı Vinç Kaldırma Noktaları",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🚛 Huckepack taşımada sadece P400 sertifikalı dorseler vinçle kaldırılabilir; dorse king-pin pimi vagonun beşik kilidine kilitlenmeden tren hareket edemez.",
    "oncedenYapilacaklar": [
      "Dorsenin yan yüzeyindeki sarı işaretli vinç kaldırma kıskaç noktalarının temizliğini kontrol et",
      "Dorse havalı süspansiyonunu indirip çekiciyi dorse altından ayır",
      "Gantry vinç (portal vinç) kıskaçlarıyla dorseyi havaya kaldırıp trenin cep vagonuna (pocket wagon) oturt",
      "King-pin kilidini çevirip tekerlek takozlarını yerleştirerek tren kalkış formunu imzala"
    ]
  },
  {
    "id": "lojistik_denizyolu_konismento_fbl_fiata_multimodal",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "fiata konşimentosu fbl",
      "multimodal bill of lading",
      "cirolanabilir konşimento negotiable",
      "forwarder taşıma senedi",
      "akreditif uyumlu fiata b/l"
    ],
    "baslik": "FIATA Multimodal Taşıma Senedi (FBL) & Akreditif Uyumu",
    "ikon": "🚢",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yük Gemisi Limandan Kalktığında",
    "hazirlikZamani": "Mate's Receipt (Yükleme Ordinosu) Mutabakatı",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "⚓ FIATA FBL konşimentosu taşıma komisyoncusunun taşıyıcı sorumluluğunu üstlendiği cirolanabilir bir kıymetli evraktır; ICC ve banka akreditiflerinde tam geçerlidir.",
    "oncedenYapilacaklar": [
      "Konteynerlerin gemiye yüklendiğine dair birinci zabit imzalı \"Clean On Board\" şerhini al",
      "Orijinal FIATA FBL formunu 3 asıl (Original) ve 3 suret (Copy) olarak düzenle",
      "Akreditif şartlarında (L/C 46A) belirtilen mal tanımı, mühür no ve Notify Party bilgilerini harfiyen eşle",
      "Original konşimentoları cirolanmak üzere bankaya veya kargo sahibine elden/kurye ile teslim et"
    ]
  },
  {
    "id": "lojistik_dorse_king_pin_ve_besinci_teker_kilit_testi",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "5. tekerlek kilit mekanizması",
      "king pin kilitleme testi",
      "dorse çekici bağlantı testi",
      "dorse çekici tug test",
      "dorse elektrik ve hava hortumu"
    ],
    "baslik": "Çekici-Dorse Bağlantısı: 5. Teker (Fifth Wheel) & Tug Testi",
    "ikon": "🚛",
    "renk": "#FED7AA",
    "varsayilanZaman": "Dorseye Bağlanma Anında",
    "hazirlikZamani": "Pleyt Yağlama & Emniyet Mandalı Kontrolü",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "🚛 Dorse takıldıktan sonra mutlaka ileri viteste frenli \"Tug Test\" (Çekme Testi) yapılmalıdır; kilit çenesi tam oturmazsa seyir halinde dorse ayrılıp felakete yol açar.",
    "oncedenYapilacaklar": [
      "Çekici 5. teker (tabla) pleytinin yüzeyinde yeterli gres yağı olduğunu doğrula",
      "Çekiciyi dorse altına geri geri yanaştırıp kilit çenesinin king-pin etrafında \"klik\" sesiyle kapandığını duy",
      "El feneriyle tablanın altına bakarak kilit mandalının tam kilitli ve emniyet piminin kapalı olduğunu gözle teyit et",
      "Dorse ayaklarını kaldırmadan önce çekiciyi 1. viteste hafifçe ileri asılarak (Tug Test) kilidin bırakmadığını test et ve sarı/kırmızı hava hortumlarını bağla"
    ]
  },
  {
    "id": "emlak_surufat_vakif_taviz_bedeli_ve_serh_terkini",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "vakıf şerhi taviz bedeli",
      "vakıflar genel müdürlüğü taviz bedeli",
      "tapuda vakıf şerhi terkin",
      "asli vakıf taviz oranı %20",
      "vakıf şerhi temizleme"
    ],
    "baslik": "Tapuda Vakıf Şerhi Terkini & %20 Vakıf Taviz Bedeli Hesabı",
    "ikon": "🏛️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Satıştan Önce Tapu Hazırlığında",
    "hazirlikZamani": "Vakıflar Bölge Müdürlüğü Borç Sorgulaması",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏠 5737 sayılı Vakıflar Kanunu m. 18 uyarınca üzerinde vakıf şerhi bulunan taşınmazlarda emlak rayiç değerinin %20'si taviz bedeli olarak ödenmedikçe mülkiyet devredilemez.",
    "oncedenYapilacaklar": [
      "Tapu kütüğünün beyanlar veya şerhler hanesindeki vakıf adını (Sultan Beyazıt, Mazbut Vakıf vb.) tespit et",
      "Vakıflar Bölge Müdürlüğüne dilekçe vererek güncel taviz bedeli hesap tablosunu talep et",
      "Belediye emlak rayiç değerinin %20'si oranındaki taviz bedelini Vakıflar veznesine veya banka hesabına yatır",
      "Alınan \"Taviz Bedeli Ödenmiştir, Şerh Terkin Edilebilir\" resmi yazısını Tapu Müdürlüğüne ibraz et"
    ]
  },
  {
    "id": "emlak_ecrimisil_haksiz_isgal_tazminati_ve_ihtar",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "ecrimisil ihtarnamesi",
      "haksız işgal tazminatı ecrimisil",
      "intifadan men şartı",
      "ecrimisil 5 yıllık zamanaşımı",
      "fuzuli şagil tahliye"
    ],
    "baslik": "Ecrimisil (Haksız İşgal Tazminatı) & İntifadan Men İhtarnamesi",
    "ikon": "📜",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İşgalin Öğrenildiği Anda Derhal",
    "hazirlikZamani": "Noter İntifadan Men İhtarı Hazırlığı",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🏠 Hissedarlar arasında ecrimisil talep edebilmek için \"İntifadan Men\" şarttır; noter ihtarnamesi tebliğ edilmeden önceki dönem için tazminat istenemez (Zamanaşımı 5 yıl).",
    "oncedenYapilacaklar": [
      "Taşınmazı rıza dışı tek başına kullanan haksız işgalciye (fuzuli şagil) noterden \"İntifadan Men\" ihtarnamesi çek",
      "Taşınmazın geriye dönük 5 yıllık emsal kira rayiç bedellerini gösteren uzman değerleme raporu al",
      "Asliye Hukuk Mahkemesinde Ecrimisil Davası açarak haksız işgal tazminatı ve yasal faiz talep et",
      "Mahkemece yaptırılacak keşifte taşınmazın tarımsal veya kira getirisini bilirkişiye hesaplat"
    ]
  },
  {
    "id": "emlak_site_yonetimi_kat_malikleri_isletme_projesi_iik68",
    "category": "finans",
    "domain": "EMLAK",
    "keywords": [
      "site işletme projesi",
      "kat mülkiyeti kanunu m. 37",
      "aidat avans payı tebliği",
      "kesinleşmiş işletme projesi iik 68",
      "aidat icra takibi 7 gün"
    ],
    "baslik": "Site Yönetimi: KMK m. 37 İşletme Projesi & İcra Gücü (İİK 68)",
    "ikon": "🏢",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıllık Genel Kurul Sonrası",
    "hazirlikZamani": "Tahmini Bütçe & Arsa Payı Dağıtım Tablosu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏠 Kat Mülkiyeti Kanunu m. 37 uyarınca tüm kat maliklerine imza karşılığı veya taahhütlü mektupla tebliğ edilip 7 günde itiraz edilmeyen işletme projesi İİK 68 niteliğinde ilam sayılır.",
    "oncedenYapilacaklar": [
      "Site genel kurulunda kabul edilen tahmini gelir-gider bütçesini ve arsa payı aidat tablosunu tanzim et",
      "İşletme projesini tüm bağımsız bölüm maliklerine taahhütlü mektup veya imza karşılığı tebliğ et",
      "Tebliğden itibaren 7 günlük yasal itiraz süresinin dolmasını bekle",
      "Aidatını ödemeyen maliklere aylık %5 gecikme tazminatı ile doğrudan ilamsız icra takibi aç"
    ]
  },
  {
    "id": "emlak_harita_aplikasyon_ve_sinir_krokisi_shkmmb",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "aplikasyon krokisi",
      "parsel sınır kazığı çakma",
      "lisanslı harita bürosu lihkab",
      "shkmmb harita mühendisi",
      "kadastro sınır uyuşmazlığı"
    ],
    "baslik": "LİHKAB / Kadastro Aplikasyon Krokisi & Parsel Sınır Kazıkları",
    "ikon": "📐",
    "renk": "#FED7AA",
    "varsayilanZaman": "İnşaat / Çit Çekimi Öncesinde",
    "hazirlikZamani": "Kadastro Müdürlüğü Sayısal Parsel Verileri",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🏠 Komşu parsele tecavüzü önlemek için inşaat öncesinde LİHKAB lisanslı harita bürosunca RTK GPS ile parsel köşe noktalarına demir sınır kazıkları çakılmalıdır.",
    "oncedenYapilacaklar": [
      "İlgili Lisanslı Harita Kadastro Mühendislik Bürosuna (LİHKAB) aplikasyon başvurusu yap",
      "Harita mühendisi eşliğinde arazide Total Station veya RTK GPS ile parsel köşe koordinatlarını aplike et",
      "Köşe noktalarına betonlu demir boru veya ahşap sınır kazıklarını çak",
      "Hazırlanan Aplikasyon Krokisi ve Parsel Teslim Tutanağını taraflarca imzalayıp belediye imar dosyasına koy"
    ]
  },
  {
    "id": "emlak_yabanciya_konut_satisi_vatandaslik_uygunluk",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "yabancıya satış 400 bin dolar",
      "vatandaşlık uygunluk belgesi",
      "spk onaylı gayrimenkul değerleme",
      "döviz alım belgesi dab",
      "tapuya 3 yıl satılamaz şerhi"
    ],
    "baslik": "Yabancıya Konut Satışı & 400.000$ Vatandaşlık Uygunluk Belgesi",
    "ikon": "🌐",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Tapu Devir Randevusunda",
    "hazirlikZamani": "Döviz Alım Belgesi (DAB) & SPK Değerleme Raporu",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🏠 Türk Vatandaşlığı Kanunu Uygulama Yönetmeliği gereği konut bedeli (min. 400.000 USD) Merkez Bankasına bozdurulup DAB belgesi alınmalı ve tapuya 3 yıl satılamaz şerhi konmalıdır.",
    "oncedenYapilacaklar": [
      "SPK lisanslı değerleme kuruluşundan taşınmazın piyasa değerinin 400.000 USD üzerinde olduğunu teyit eden rapor al",
      "Yabancı alıcının dövizini banka aracılığıyla TCMB kurundan bozdurarak \"Döviz Alım Belgesi\" (DAB) tanzim ettir",
      "Web-Tapu üzerinden satış ve tapu kütüğüne \"3 yıl süreyle satılmayacağına dair taahhüt\" şerhini işlet",
      "Tapu tescilinden sonra Çevre, Şehircilik ve İklim Değişikliği Bakanlığından \"Uygunluk Belgesi\" başvurusunu yap"
    ]
  },
  {
    "id": "denizcilik_ecdis_elektronik_harita_guvenlik_konturu",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "ecdis emniyet derinliği safety contour",
      "elektronik harita enc güncelleme",
      "gemi su çekimi draft hesabı",
      "karaya oturma alarmı ecdis",
      "catzoc veri güvenilirliği"
    ],
    "baslik": "Seyir Vardiyası: ECDIS Safety Contour (Emniyet Derinliği) & CATZOC",
    "ikon": "🗺️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Liman Kalkışından Önce Rota Planlamasında",
    "hazirlikZamani": "Gemi Statik/Dinamik Draftı & Çökelme (Squat) Hesabı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚓ ECDIS üzerinde Safety Depth ve Safety Contour gemi draftı + squat + emniyet payına göre ayarlanmazsa sistem sığ su karaya oturma alarmı üretemez.",
    "oncedenYapilacaklar": [
      "Geminin maksimum statik su çekimine sığ su çökelme (squat) payı ve dinamik payı ekleyerek Safety Contour değerini hesapla",
      "ECDIS cihazında Safety Contour, Safety Depth ve Shallow Contour derinlik çizgilerini gir",
      "Rota koridorunda ENC resmi vektör haritaların en son Notice to Mariners (NtM) düzeltmelerini kontrol et",
      "CATZOC harita doğruluk kategorisini inceleyerek konumsal hata payı yüksek bölgelerde rotayı açık denizden geçir"
    ]
  },
  {
    "id": "denizcilik_sintine_separatörü_15_ppm_marpol_annex_1",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "sintine separatörü 15 ppm",
      "marpol ek 1 yağ kayıt defteri",
      "yağ içeriği ölçer ocm alarmı",
      "üç yollu otomatik geri dönüş vanası",
      "sintine basma izni makine"
    ],
    "baslik": "MARPOL Ek I: 15 PPM Sintine Separatörü (OWS) & Yağ Kayıt Defteri",
    "ikon": "🛢️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Denize Sintine Basımı Sırasında",
    "hazirlikZamani": "15 PPM Monitörü (OCM) Kalibrasyonu & GPS Konumu",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "⚓ MARPOL Ek I gereğince denize basılan sintine suyundaki yağ oranı ASLA 15 ppm'i geçemez; 15 ppm aşılırsa 3 yollu vana tahliyeyi anında sintine tankına geri çevirir.",
    "oncedenYapilacaklar": [
      "Geminin en yakın karadan 12 deniz mili açıkta ve seyir halinde olduğunu köprüüstünden teyit et",
      "15 PPM Yağ İçeriği Ölçüm cihazının (OCM) temiz su ile sıfırlama testini yap",
      "Sintine separatörünü çalıştırıp denize basılan suyun 15 ppm altında kaldığını sürekli monitörden izle",
      "Operasyon bitiminde başlangıç/bitiş saati, m3 miktarı ve koordinatları Yağ Kayıt Defterine (Oil Record Book Part I) Başmühendis imzasıyla işle"
    ]
  },
  {
    "id": "denizcilik_draft_survey_gemi_yuk_hesabi_plimsoll",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "draft survey yük hesabı",
      "plimsoll markası su çekimi",
      "deniz suyu yoğunluğu hidrometre",
      "trim ve hogging sagging düzeltmesi",
      "draft survey hesap tablosu"
    ],
    "baslik": "Dökme Yük: Draft Survey (Hog/Sag Düzeltmeli) Yük Ağırlığı Hesabı",
    "ikon": "⚖️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yükleme Öncesi ve Sonrası",
    "hazirlikZamani": "Draft Okuma Botu & Hassas Deniz Suyu Hidrometresi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚓ Dökme yük gemilerinde yük miktarı kantarla değil, geminin 6 draft noktasından batma miktarı ve deniz suyu yoğunluğu ölçülerek hidrostatiğinden hesaplanır.",
    "oncedenYapilacaklar": [
      "Hizmet botu ile geminin baş, vasat ve kıç bordalarından (sancak/iskele) 6 draft değerini gözle oku",
      "Gemi bordasından alınan deniz suyu numunesinin yoğunluğunu kalibre hidrometre ile ölç",
      "Gövdedeki esnemeyi (Hogging / Sagging) vasat draft ortalamasıyla düzelterek Quarter Mean Draft'ı hesapla",
      "Hidrostatik tablodan bulunan deplasman farkından yakıt, tatlı su ve balast tankı iskandil değişimlerini düşerek net yükü bul"
    ]
  },
  {
    "id": "denizcilik_makine_dairesi_yangin_co2_total_flooding",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "co2 total flooding yangın",
      "makine dairesi karbondioksit basma",
      "co2 oda kilit anahtarı siren",
      "makine hava damperleri kapatma",
      "quick closing acil yakıt kesme"
    ],
    "baslik": "SOLAS Acil Durum: Makine Dairesi Sabit CO2 Gaz Boşaltma (Total Flooding)",
    "ikon": "🚨",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kontrol Edilemeyen Makine Yangınında",
    "hazirlikZamani": "Personel Sayımı & Havalandırma Damperlerinin Kapatılması",
    "hazirlikSaatOncesi": 0.1,
    "akilliFisilti": "⚓ CO2 basma emrini SADECE gemi kaptanı verir; tüm personel tahliye edilmeden, hava damperleri ve quick-closing yakıt vanaları çekilmeden CO2 tüpleri patlatılamaz.",
    "oncedenYapilacaklar": [
      "Makine dairesindeki tüm personelin çıktığını acil toplanma alanında kafa sayımıyla kesinleştir",
      "Köprüüstü dışındaki acil panodan Quick-Closing hızlı kapatma kollarını çekerek tüm yakıt tankı çıkışlarını kilitle",
      "Makine dairesi fanlarını durdurup tüm havalandırma kapaklarını ve yangın damperlerini sızdırmaz kapat",
      "CO2 kontrol kabinini açarak tahliye uyarı sirenini başlat ve gecikme süresi sonunda pilot silindir kollarını çekerek gazı boşalt"
    ]
  },
  {
    "id": "denizcilik_klavuz_kaptan_pilot_carmihi_ve_kombinezon",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "pilot çarmıhı pilot ladder",
      "kılavuz kaptan alma hazırlığı",
      "solas kural 23 çarmıh",
      "kombinezon merdiven borda iskelesi",
      "çarmıh basamak ipi emniyeti"
    ],
    "baslik": "SOLAS Kural 23: Kılavuz Kaptan (Pilot) Çarmıhı & Borda Emniyeti",
    "ikon": "🪜",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Pilot İstasyonuna Gelmeden 30 Dk Önce",
    "hazirlikZamani": "Can Yelekli Güverte Zabiti & Işıklı Can Simidi",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "⚓ SOLAS Reg. V/23 uyarınca serbest borda yüksekliği 9 metreyi aşarsa pilot çarmıhı borda iskelesiyle birleştirilerek (Combination Ladder) donatılmalıdır.",
    "oncedenYapilacaklar": [
      "Pilot çarmıhının temiz, basamaklarının yatay ve kauçuk alt basamaklarının sağlam olduğunu denetle",
      "Çarmıh yüksekliğini pilot botunun borda yüksekliğine göre su seviyesinden tam 1.5 - 2 metre yukarıda ayarla",
      "Borda girişinde güverte zabiti, iki gemici, el incesi, ışıklı can simidi ve can halatlarını hazır bulundur",
      "Gece operasyonunda çarmıhı yukarıdan aşağıya aydınlatan ancak kılavuz kaptanın gözünü almayan projektörü aç"
    ]
  },
  {
    "id": "gumruk_ithalat_kdv_matrahi_yurtici_yurtdisi_giderler",
    "category": "arac_ulasim",
    "domain": "GUMRUK",
    "keywords": [
      "ithalat kdv matrahı hesabı",
      "gümrük beyannamesi 47 nolu kutu",
      "yurt dışı gider navlun sigorta",
      "yurt içi gider ardiye ordino",
      "gümrük vergisi ötv matrahı"
    ],
    "baslik": "Gümrük Kanunu m. 24-27: İthalat KDV Matrahı & Gider Unsurları",
    "ikon": "🧮",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Beyanname Tescilinden Önce",
    "hazirlikZamani": "Ordino, Ardiye, Navlun ve Banka Masraf Belgeleri",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🛃 İthalatta KDV matrahına sadece mal bedeli değil; gümrük vergisi, ÖTV, liman ardiye ücreti, ordino ve tescile kadar yapılan tüm masraflar dahil edilir.",
    "oncedenYapilacaklar": [
      "FOB fatura bedeline CIF kıymeti oluşturmak için konşimento navlun faturasını ve sigorta poliçesini ekle",
      "Gümrük vergisi, İlave Gümrük Vergisi (İGV) ve varsa Ek Mali Yükümlülük tutarlarını hesapla",
      "Malın gümrüğe girişinden tescil anına kadar oluşan yurt içi masrafları (antrepo, ordino, tahmil/tahliye) matraha kat",
      "Gümrük beyannamesinin 47 nolu vergi tablosunda KDV matrahını ve tahakkuk eden toplam vergileri kontrol et"
    ]
  },
  {
    "id": "gumruk_antrepo_rejiminde_ellecleme_izni_ve_tutanak",
    "category": "arac_ulasim",
    "domain": "GUMRUK",
    "keywords": [
      "antrepo elleçleme izni",
      "gümrük gözetiminde elleçleme",
      "ambalaj değiştirme etiketleme gümrük",
      "elleçleme izin formu",
      "antrepo muayene memuru tutanağı"
    ],
    "baslik": "Gümrük Kanunu m. 102: Antrepoda Elleçleme (Handling) İzni & Tescil",
    "ikon": "📦",
    "renk": "#EDE9FE",
    "varsayilanZaman": "İşlem Başlamadan En Az 24 Saat Önce",
    "hazirlikZamani": "Elleçleme Talep Dilekçesi & Yapılacak İşlem Şeması",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🛃 Antrepodaki eşyanın ambalajının değiştirilmesi, etiketlenmesi veya havalandırılması Gümrük Müdürlüğü yazılı izni ve muayene memuru gözetimiyle yapılabilir.",
    "oncedenYapilacaklar": [
      "Yapılacak elleçleme faaliyetinin (etiketleme, paletleme, koruyucu bakım) Gümrük Yönetmeliği Ek-63 kapsamında olduğunu teyit et",
      "Bağlı bulunulan Gümrük Müdürlüğüne gerekçeli \"Elleçleme İzin Başvuru Dilekçesi\" ver",
      "Gümrük muayene memuru ve antrepo işleticisi refakatinde antrepo gözünü açtır",
      "İşlem bittiğinde eşyanın niteliğinin değişmediğini belirten \"Elleçleme Sonuç Tutanağı\"nı imzalayıp antrepo defterine işlet"
    ]
  },
  {
    "id": "gumruk_dahilde_isleme_diib_yillik_sarfiyat_ve_fire",
    "category": "arac_ulasim",
    "domain": "GUMRUK",
    "keywords": [
      "dahilde işleme izin belgesi diib",
      "diib hammadde sarfiyat tablosu",
      "sanayi odası ekspertiz raporu fire",
      "ihracat taahhüt kapatma diib",
      "ikincil işlem görmüş ürün"
    ],
    "baslik": "DİİB Kapanış Dosyası: Sanayi Odası Ekspertiz Raporu & Sarfiyat Hesabı",
    "ikon": "🏭",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Belge Süresi Bitiminden İtibaren 3 Ay İçinde",
    "hazirlikZamani": "İthalat/İhracat Gümrük Beyannameleri Listesi",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🛃 DİİB taahhüt kapatmada Sanayi Odası onaylı Kapasite Raporu ve Ekspertiz Raporundaki yasal fire oranlarına göre hammadde sarfiyatı hesaplanmalı, fire aşılmamalıdır.",
    "oncedenYapilacaklar": [
      "Belge kapsamında ithal edilen hammaddeler ile ihraç edilen mamullerin gümrük beyanname listesini çıkar",
      "Sanayi Odasından eksper heyeti talep ederek fiili üretim ve resmi fire oranlarını tespit ettir",
      "Hammadde Sarfiyat Tablosunu (HST) hazırlayıp ithal edilen girdinin mamul bünyesinde ihraç edildiğini eşleştir",
      "Ticaret Bakanlığı İhracat Bilgi Sistemi üzerinden elektronik belge kapatma müracaatını yap"
    ]
  },
  {
    "id": "gumruk_tasima_senedi_cmr_rezerve_ve_hasar_ihtari",
    "category": "arac_ulasim",
    "domain": "GUMRUK",
    "keywords": [
      "cmr hasar rezerv şerhi",
      "uluslararası karayolu cmr sözleşmesi",
      "açık hasar teslim anında şerh",
      "gizli hasar 7 gün içinde ihbar",
      "cmr taşıyıcı sorumluluk sınırı sdr"
    ],
    "baslik": "Uluslararası Karayolu CMR: Hasar Şerhi (Rezerv) & 7 Günlük İhbar",
    "ikon": "📋",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Eşya Teslim Alındığı Anda / 7 Gün İçinde",
    "hazirlikZamani": "CMR Belgesi 24 Nolu Kutu & Hasar Fotoğrafları",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🚛 CMR Sözleşmesi m. 30 gereği açık hasarda teslim anında CMR'ye şerh düşülmeli; gizli hasarda ise en geç 7 gün içinde taşıyıcıya yazılı ihtar çekilmelidir.",
    "oncedenYapilacaklar": [
      "TIR dorsesi açıldığında kolilerde ıslanma, ezilme veya yırtılma varsa şoförün CMR belgesindeki 24 nolu haneye hasar şerhini yazdır",
      "Hasarlı palet ve paketlerin şoförle birlikte fotoğraflarını çekip \"Hasar Tespit Tutanağı\" tanzim et",
      "Koli içi açıldığında ortaya çıkan gizli hasarlarda teslim tarihinden itibaren 7 gün dolmadan nakliyeciye noter/iadeli taahhütlü ihtar gönder",
      "CMR Sigortacısına hasar dosyasını (Fatura, Çeki Listesi, CMR, Tutanak) ileterek kg başına 8.33 SDR tazminat sürecini başlat"
    ]
  },
  {
    "id": "gumruk_on_inceleme_baglayici_tarife_bilgisi_btb",
    "category": "arac_ulasim",
    "domain": "GUMRUK",
    "keywords": [
      "bağlayıcı tarife bilgisi btb",
      "gtip tespiti gümrük genel müdürlüğü",
      "3 yıl geçerli btb kararı",
      "kimyasal numune analiz gtip",
      "bağlayıcı menşe bilgisi bmb"
    ],
    "baslik": "Gümrük Kanunu m. 9: Bağlayıcı Tarife Bilgisi (BTB) Başvurusu",
    "ikon": "📑",
    "renk": "#FED7AA",
    "varsayilanZaman": "İthalattan En Az 2 Ay Önce",
    "hazirlikZamani": "Teknik Ürün Kataloğu & Laboratuvar Analiz Raporu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🛃 GTİP ihtilaflarını ve cezaları önlemek için Gümrükler Genel Müdürlüğünden alınan BTB kararı verildiği tarihten itibaren tüm gümrüklerde 3 yıl boyunca bağlayıcıdır.",
    "oncedenYapilacaklar": [
      "İthal edilecek ürünün kimyasal bileşenlerini, fonksiyonel şemasını ve kullanım amacını gösteren teknik dosyayı derle",
      "Gerekli hallerde gümrük kimyahanesinde incelenmek üzere eşyadan mühürlü numune al",
      "e-Devlet Gümrük portalı üzerinden BTB Başvuru Formunu doldurup ekleri sisteme yükle",
      "Karar onaylandığında 12 haneli kesin GTİP kodunu ve BTB karar numarasını beyannamenin ilgili hanesine yaz"
    ]
  },
  {
    "id": "ticaret_franchise_bayilik_sozlesmesi_ve_royalty_fee",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "franchise sözleşmesi",
      "royalty fee ciro primi",
      "bayilik giriş bedeli franchise",
      "bölge koruma exclusivity",
      "marka kullanım kılavuzu denetim"
    ],
    "baslik": "Ticaret Hukuku: Franchise (Bayilik) Sözleşmesi & Royalty Bedeli",
    "ikon": "🤝",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Bayi Açılışından Önce",
    "hazirlikZamani": "Fizibilite Raporu & Marka El Kitabı (Manual)",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "💼 Franchise sözleşmesinde münhasır bölge koruması (radius) ve aylık ciro payı (Royalty Fee %3-5) maddeleri noter tasdikli sözleşmeyle tanzim edilmelidir.",
    "oncedenYapilacaklar": [
      "Bayiye tanınan coğrafi bölge koruma sınırını (örn: 3 km yarıçap) sözleşme krokisine işle",
      "İsim hakkı giriş bedeli ve aylık ciro üzerinden ödenecek royalty fee oranını belirle",
      "Hammadde tedarikinde sadece ana merkezin onaylı ürünlerinin kullanılacağını bağlayıcı madde yap",
      "Gizlilik ve sözleşme bitiminde 2 yıl süreyle rekabet etmeme taahhüdünü taraflara imzalat"
    ]
  },
  {
    "id": "ticaret_e_ticaret_pazaryeri_komisyon_ve_iade_kesintisi",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "pazaryeri komisyon mutabakatı",
      "trendyol hepsiburada fatura kesintisi",
      "iade kargo faturası itiraz",
      "pazaryeri hak ediş valörü",
      "kargo desi barem farkı"
    ],
    "baslik": "E-Ticaret Pazaryeri Finansmanı: Hak Ediş, Komisyon & Kargo Desi İtirazı",
    "ikon": "🛒",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Haftalık Pazaryeri Fatura Kesiminde",
    "hazirlikZamani": "Pazaryeri Finans Raporu & Kargo Desi Listesi",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "💼 Pazaryerlerinde kargo şirketlerinin kestiği fahiş desi barem farkları ve iade kargo faturaları 7 gün içinde incelenip platform üzerinden itiraz edilmelidir.",
    "oncedenYapilacaklar": [
      "Pazaryeri yönetim panelinden kesilen haftalık komisyon faturasını kategori oranlarıyla eşleştir",
      "Kargo firmasının fatura ettiği desi ölçümleri ile ürünün gerçek koli desilerini karşılaştırıp desi itirazı aç",
      "Müşteri iadelerinde hasarlı veya kullanılmış dönen ürünler için pazaryeri satıcı koruma talebi oluştur",
      "Net hesaba geçen hak ediş tutarını banka hareketleriyle eşleyip muhasebe cari kartını kapat"
    ]
  },
  {
    "id": "ticaret_rekabet_kurumu_dikey_anlasma_ve_yeniden_satis",
    "category": "resmi",
    "domain": "TICARET",
    "keywords": [
      "yeniden satış fiyatını belirleme yasağı",
      "4054 sayılı kanun rekabet",
      "dikey anlaşmalara ilişkin grup muafiyeti",
      "tavsiye edilen raf fiyatı rrp",
      "rekabet kurumu idari para cezası"
    ],
    "baslik": "4054 Sayılı Kanun: Yeniden Satış Fiyatı Tespiti (RPM) Yasağı & Uyum",
    "ikon": "⚖️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Bayi Fiyat Listesi Gönderiminde",
    "hazirlikZamani": "Fiyat Sirküleri & Rekabet Hukuku Uyum Denetimi",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "💼 Üretici/dağıtıcı bayi veya perakendecinin nihai satış fiyatını sabit veya asgari olarak belirleyemez; sadece \"Tavsiye Edilen Fiyat\" ibaresi kullanılabilir.",
    "oncedenYapilacaklar": [
      "Tüm bayilere gönderilen fiyat sirkülerlerinin üzerine açıkça \"Tavsiye Edilen Perakende Satış Fiyatıdır\" şerhini koy",
      "Düşük fiyata satan bayiye mal vermeme veya iskonto kesme gibi cezai yaptırımların yazışmalarda kesinlikle yer almamasını sağla",
      "2002/2 sayılı Dikey Anlaşmalara İlişkin Grup Muafiyeti Tebliği pazar payı eşiklerini (%30) denetle",
      "Şirket içi satış temsilcilerine Rekabet Hukuku İhlalleri Uyum Eğitimi verip taahhütname al"
    ]
  },
  {
    "id": "lojistik_havayolu_palet_net_ve_strapping_gergi_emniyeti",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "hava kargo palet bağlama file net",
      "hava kargo cırcırlı kayış strap",
      "pallet load contour kontrolü",
      "uçak kargo kilidi latch kontrol",
      "havayolu kargo ağır parça bağlama"
    ],
    "baslik": "Hava Kargo: Palet Filesi (Net), Cırcırlı Kayış (Strap) & Kilit (Latch)",
    "ikon": "✈️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Uçak Altına Sevkten 1 Saat Önce",
    "hazirlikZamani": "Sertifikalı Palet Filesi & Yük Gerdirme Kayışları",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "✈️ Havada ani türbülans ve 9G ivmeye dayanması için kargo paletleri onaylı hava kargo filesi ve cırcırlı kayışlarla palet raylarına sıkıca kilitlenmelidir.",
    "oncedenYapilacaklar": [
      "Kargo palet filesinin (Cargo Net) yırtık olmadığını ve TSO C90 etiket tarihini kontrol et",
      "Palet üzerine dizilen yükün kontur eğrisine taştığı noktalara köşebent koyup file kancalarını palet kenarına geçir",
      "Ağır kolilerde her biri en az 2250 kg taşıma kapasiteli cırcırlı uçak kayışlarıyla çapraz gerdirme yap",
      "Uçağın kargo kompartımanındaki otomatik palet kilit mandallarının (latch) palet tırnağına tam oturduğunu teyit et"
    ]
  },
  {
    "id": "lojistik_demiryolu_rid_tehlikeli_madde_tank_vagon",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "rid demiryolu tehlikeli madde",
      "tank vagon dip vanası kontrol",
      "turuncu plaka demiryolu rid",
      "tehlike tanımlama numarası kemler",
      "tehlikeli madde demiryolu güvenlik danışmanı"
    ],
    "baslik": "Demiryolu Tehlikeli Madde (RID): Tank Vagon Dolumu & Kemler Kodu",
    "ikon": "🚆",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Vagon Dolumu Tamamlandığında",
    "hazirlikZamani": "Topraklama Kablosu & Üç Kademeli Sızdırmazlık Vanaları",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🚛 RID mevzuatı uyarınca gaz ve kimyasal tank vagonlarının 3 kademeli (iç vana, dış vana, kör flanş) sızdırmazlığı sağlanmalı ve turuncu Kemler levhaları takılmalıdır.",
    "oncedenYapilacaklar": [
      "Tank vagonun periyodik test tarihini ve tank kodu etiketini (örn: L4BH) doğrula",
      "Dolum bittiğinde dip tahliye vanasını kapat, emniyet pimini tak ve kör flanş civatalarını torkla",
      "Vagonun her iki yanına maddenin UN numarası ve Kemler Tehlike Numarasını içeren reflektif turuncu plakayı tak",
      "Tehlikeli Madde Güvenlik Danışmanı (TMGD) onaylı RID Taşıma Belgesini tren şefine teslim et"
    ]
  },
  {
    "id": "lojistik_karayolu_lowbed_agir_nakliyat_ozel_izin_belgesi",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "lowbed ağır nakliyat",
      "karayolları özel yük taşıma izin belgesi",
      "gabari dışı yük eskort araç",
      "köprü altı gabari yüksekliği",
      "gece ağır nakliye seyir yasağı"
    ],
    "baslik": "Ağır & Gabari Dışı Nakliyat: Karayolları Özel İzin Belgesi & Öncü Araç",
    "ikon": "🚛",
    "renk": "#FED7AA",
    "varsayilanZaman": "Yola Çıkıştan En Az 3 Gün Önce",
    "hazirlikZamani": "Güzergah Köprü/Tünel Etüdü & Dingil Başı Ağırlık Hesabı",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🚛 Genişliği 2.55 m, yüksekliği 4.00 m veya toplam ağırlığı 40 tonu aşan yüklerde Karayolları Genel Müdürlüğünden güzergah izin belgesi ve tepe lambalı eskort araç zorunludur.",
    "oncedenYapilacaklar": [
      "Karayolları Genel Müdürlüğüne müracaat ederek belirlenen güzergah için \"Özel İzin Belgesi\" al",
      "Güzergah üzerindeki üst geçit, tünel ve elektrik tellerinin net yüksekliklerini güzergah ön keşfiyle doğrula",
      "TIR'ın önüne ve arkasına sarı tepe lambalı ve \"GENİŞ ARAÇ\" tabelalı eskort araçları görevlendir",
      "İzin belgesinde belirtilen saat kısıtlamalarına (genelde sadece gündüz aydınlığında seyir) titizlikle uy"
    ]
  },
  {
    "id": "lojistik_denizyolu_konteyner_flexitank_sivi_yukleme",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "flexitank sıvı yükleme konteyner",
      "zeytinyağı şarap flexitank",
      "konteyner dalgakıran bariyeri bulkhead",
      "flexitank hava tahliyesi",
      "konteyner taban oluklu karton"
    ],
    "baslik": "Konteyner İçi Sıvı Lojistiği: Flexitank Kurulumu & Bulkhead Bariyeri",
    "ikon": "🛢️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Dolum Başlamadan 2 Saat Önce",
    "hazirlikZamani": "Konteyner Çapak Muayenesi & Taban Kraft Kağıdı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚓ Flexitank balonunun patlamasını önlemek için konteyner tabanı kraft kağıdıyla kaplanmalı; kapı önüne çelik takviyeli kompozit Bulkhead barikatı kurulmalıdır.",
    "oncedenYapilacaklar": [
      "20' standart konteynerin iç duvarlarını ve tabanını çivi, pas veya sivri çıkıntı riskine karşı incele",
      "Konteyner içine koruyucu oluklu mukavva ve taban kraft kağıdını ser",
      "Flexitank torbasını düzgünce açıp kapı önüne çelik profilli Bulkhead (dalgakıran bariyeri) yerleştir",
      "Hortumu alt vanaya bağlayıp azami 24.000 litreye kadar sıvıyı kontrollü hızda bas ve hava tahliye valfini kitle"
    ]
  },
  {
    "id": "lojistik_cross_docking_capraz_sevkiyat_sifir_stok",
    "category": "is_kariyer",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "cross docking çapraz sevkiyat",
      "depolama yapmadan aktarma",
      "mal kabulden direkt sevkiyata transfer",
      "palet barkod çapraz sevkiyat",
      "dağıtım merkezi dock-to-dock"
    ],
    "baslik": "Tedarik Zinciri: Cross-Docking (Çapraz Sevkiyat) & Sıfır Stok Aktarımı",
    "ikon": "📦",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Tedarikçi Kamyonu Rampaya Yanaştığında",
    "hazirlikZamani": "WMS Konsolide Sevkiyat Kapıları Eşleştirmesi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "📦 Cross-docking operasyonunda ürünler depolama rafına kaldırılmaz; mal kabul rampasından indirildiği an barkodu okutulup doğrudan dağıtım aracına yüklenir.",
    "oncedenYapilacaklar": [
      "Gelen tedarikçi kamyonunun geliş saati ile çıkış yapacak dağıtım araçlarının rampa saatlerini senkronize et",
      "İndirilen palet veya kolileri el terminali ile okutup WMS sisteminde \"Doğrudan Çapraz Sevkiyat\" emrini tetikle",
      "Ürünleri kalite kontrolden geçirdikten sonra mağaza/bölge sevkiyat kapısındaki paletlere konsolide et",
      "En fazla 4 saatlik rampa transit süresini aşmadan dağıtım tırının kapaklarını kapatıp mühürle"
    ]
  },
  {
    "id": "emlak_sufa_on_alim_davasi_tmk_733_sure",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "önalım davası tmk 733",
      "şufa hakkı davası",
      "hisseli taşınmaz önalım",
      "noter ihtarlı 3 ay önalım",
      "satıştan itibaren 2 yıl şufa"
    ],
    "baslik": "Yasal Önalım (Şufa) Davası & Hak Düşürücü Süre Takibi (TMK 733)",
    "ikon": "🏡",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Noter Bildiriminden 3 Ay / Satıştan 2 Yıl",
    "hazirlikZamani": "Hisseli Tapu Kaydı & Satış Bedeli Tespiti",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ TMK m. 733 uyarınca noter aracılığıyla bildirilen satışlarda 3 ay, bildirilmemişse satış tarihinden itibaren 2 yıl içinde dava açılmazsa şufa hakkı düşer.",
    "oncedenYapilacaklar": [
      "Taşınmazın paylı mülkiyete tabi olduğunu ve fiili taksim bulunmadığını tapu ve zilyetlik araştırmasıyla doğrula",
      "Pay satışının noter vasıtasıyla diğer paydaşlara bildirilip bildirilmediğini tespit et",
      "Asliye Hukuk Mahkemesinde dava açarak tapuda gösterilen satış bedeli ve alım masraflarını mahkeme veznesine depo etmeye hazırla",
      "Taşınmazın payı üzerine üçüncü kişilere devri engellemek adına HMK m. 389 gereğince ihtiyati tedbir talep et"
    ]
  },
  {
    "id": "emlak_kat_karsiligi_insaat_sozlesmesi_feshi",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "kat karşılığı inşaat feshi",
      "arsa payı karşılığı sözleşme feshi",
      "müteahhit temerrüdü fesih",
      "inşaat gecikmesi noter ihtarı",
      "geriye etkili fesih"
    ],
    "baslik": "Kat Karşılığı İnşaat Sözleşmesinin Temerrüt Nedeniyle Feshi",
    "ikon": "🏗️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Noter İhtarı Akabinde 30 Gün",
    "hazirlikZamani": "İnşaat Seviye Tespit Raporu & Noter Sözleşmesi",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "📜 Arsa payı karşılığı inşaat sözleşmelerinde fesih ancak mahkeme kararı veya tarafların noter huzurundaki ortak iradesiyle geçerli olur.",
    "oncedenYapilacaklar": [
      "Sulh Hukuk Mahkemesi delil tespitiyle inşaatın fiziki gerçekleşme oranını (yüzde seviyesini) kesinleştir",
      "Müteahhide noterden TBK m. 123-125 uyarınca gecikme cezası ve makul mehil içeren temerrüt ihtarnamesi keşide et",
      "İnşaat seviyesi %90 altındaysa geriye etkili fesih ve tapu iptal-tescil davası hazırlığını başlat",
      "Arsa sahiplerinin hisselerine müteahhidin 3. kişilere yaptığı gayriresmi satışların şerh durumunu sorgula"
    ]
  },
  {
    "id": "emlak_meskeni_isyerine_cevirme_kmk_24_oybirligi",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "meskeni işyerine çevirme kmk 24",
      "kat mülkiyeti oybirliği",
      "apartmanda ofis açma muvafakat",
      "yönetim planı mesken maddesi",
      "apartman malikleri izin belgesi"
    ],
    "baslik": "Meskenin İşyerine Dönüştürülmesi & KMK 24 Muvafakat Süreci",
    "ikon": "🏢",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kat Malikleri Genel Kurulunda Karar Alınması",
    "hazirlikZamani": "Apartman Yönetim Planı İncelemesi",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏢 KMK m. 24 uyarınca mesken olarak kayıtlı bağımsız bölümün klinik, ofis vb. işyerine çevrilmesi için tüm kat maliklerinin oybirliği şarttır.",
    "oncedenYapilacaklar": [
      "Tapu müdürlüğünden apartmanın güncel Yönetim Planını çekerek bağımsız bölümlerin kullanım yasaklarını denetle",
      "Tüm maliklerin ıslak imzalı muvafakatini veya noter onaylı Genel Kurul oybirliği kararını tanzim et",
      "Belediye ruhsat müdürlüğüne başvurarak işyeri açma ve çalışma ruhsatı ön şartlarını doğrula",
      "Gürültü, atık ve ortak gider payı artışlarına dair yönetim kurulu onay protokolünü hazırla"
    ]
  },
  {
    "id": "emlak_imar_kanunu_15_16_ifraz_tevhid_kadastro",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "3194 madde 15 16 ifraz",
      "parsel tevhid ifraz işlemi",
      "encümen onaylı ayırma birleştirme",
      "kadastro tescil beyannamesi",
      "imar kanunu ifraz harcı"
    ],
    "baslik": "İmar Kanunu 15-16. Madde Kapsamında İfraz/Tevhid ve Kadastro Tescili",
    "ikon": "📐",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Encümen Kararı Sonrası 30 Gün İçinde",
    "hazirlikZamani": "LİHKAB/SHKMMB Tarafından Hazırlanan Değişiklik Tasarımı",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🗺️ 3194 sayılı İmar Kanunu m. 15 ve 16 uyarınca encümen kararından itibaren 30 gün içinde tapu tescili talep edilmezse encümen kararı hükümsüz kalır.",
    "oncedenYapilacaklar": [
      "Serbest Harita Mühendisi (SHKMMB) veya LİHKAB tarafından hazırlanan değişiklik tasarısını belediyeye sun",
      "Belediye veya İl Encümeninden 3194 m. 15-16 ifraz/tevhid onay kararını al",
      "Kadastro Müdürlüğünden kontrol ve tescil bildirimini (beyannamesini) onaylat",
      "Harç ve döner sermaye ödemeleriyle birlikte 30 günlük hak düşürücü sürede Tapu Müdürlüğüne tescil başvurusunu ilet"
    ]
  },
  {
    "id": "emlak_yapi_kayit_belgesi_iptali_yurutmeyi_durdurma",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "yapı kayıt belgesi iptali davası",
      "imar barışı iptali yürütmeyi durdurma",
      "yıkım kararına karşı idari dava",
      "3194 sayılı kanun geçici 16",
      "çevre şehircilik ykb iptal"
    ],
    "baslik": "Yapı Kayıt Belgesi İptali ve Yıkım Kararına Karşı İdare Mahkemesi Davası",
    "ikon": "📑",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Tebliğden İtibaren 30 Gün (İvedi Yargılama)",
    "hazirlikZamani": "Uydu Fotoğrafları & 31.12.2017 Öncesi Elektrik-Su Abonelik Faturaları",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ Yıkım kararları 2577 sayılı İYUK m. 20/A kapsamında ivedi yargılama usulüne tabi olup dava açma süresi tebliğden itibaren 30 gündür.",
    "oncedenYapilacaklar": [
      "Yapının 31.12.2017 tarihinden önce yapıldığını kanıtlayan harita genel müdürlüğü ortofoto ve abonelik kayıtlarını topla",
      "Belediye encümeni yıkım ve idari para cezası kararına karşı İdare Mahkemesinde Yürütmeyi Durdurma talepli iptal davası aç",
      "Savunma süresinin kısaltılmasını ve mahallinde ivedi bilirkişi keşfi icrasını talep et",
      "Yürütmeyi durdurma kararı alınıncaya kadar belediye zabıta ve fen işlerine dava açıldığına dair derkenar sun"
    ]
  },
  {
    "id": "denizcilik_psc_paris_mou_denetim_hazirlik_ism",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "liman devleti denetimi psc",
      "paris mou ism checklist",
      "gemi tutulma detention riski",
      "solas yangın donanımı psc",
      "marpol denetimi liman"
    ],
    "baslik": "Liman Devleti Denetimi (PSC - Paris MoU) Ön Hazırlık & ISM Kod Doğrulaması",
    "ikon": "⚓",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Limana Varmadan 24 Saat Önce",
    "hazirlikZamani": "PSC Hazırlık Kontrol Listesi & Sertifika Dosyaları",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🚢 PSC denetiminde tespit edilecek Kod 30 (Gemi Tutulma - Detention) eksikliği, geminin limandan kalkışını yasaklar ve armatöre ağır mali yaptırım getirir.",
    "oncedenYapilacaklar": [
      "Acil yangın pompası (Emergency Fire Pump) ve acil durum jeneratörünü yük altında test et",
      "Köprüüstü seyir fenerlerini, manyetik pusula aydınlatmasını ve düdük/siren sistemini kontrol et",
      "Makine dairesi sintine seviyelerini, Quick Closing (Acil Yakıt Kesme) valflerini ve yağlı su separatörünü (OWS 15 ppm) sına",
      "Mürettebatın STCW sertifikalarının, gemi klas ve uluslararası emniyet belgelerinin geçerlilik tarihlerini teyit et"
    ]
  },
  {
    "id": "denizcilik_solas_filika_indirme_davit_3_aylik_tatbikat",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "filika indirme tatbikatı solas",
      "lifeboat drill 3 aylık",
      "matafora teli serbest bırakma",
      "free fall filika tatbikatı",
      "solas gemiyi terk tatbikatı"
    ],
    "baslik": "SOLAS Kapsamında 3 Aylık Filika İndirme ve Matafora (Davit) Tatbikatı",
    "ikon": "🛶",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Limanda veya Demirde 3 Ayda Bir",
    "hazirlikZamani": "Filika Motor Yakıtı, Can Yelekleri ve Emniyet Pimleri",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🌊 SOLAS Bölüm III uyarınca filikalar en az 3 ayda bir suya indirilmeli ve motoru çalıştırılarak suda manevra kabiliyeti mürettebatla test edilmelidir.",
    "oncedenYapilacaklar": [
      "Filika matafora kollarının, düşme tellerinin ve hidrostatik serbest bırakma kilitlerinin durumunu gözle muayene et",
      "Filikayı emniyet pimleri çıkarılmış halde su seviyesine kadar kontrollü indir",
      "Suya temas anında kanca serbest bırakma (on-load/off-load release) mekanizmasını açarak motoru çalıştır",
      "Tatbikat detaylarını, harcanan süreyi ve katılan personeli resmi Güverte Jurnaline (Deck Log Book) işle"
    ]
  },
  {
    "id": "denizcilik_ecdis_safety_contour_emniyet_derinligi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "ecdis emniyet derinliği safety contour",
      "draft ukc hesabı ecdis",
      "safety depth hesabı seyir",
      "elektronik harita rotalama ecdis",
      "sığlık alarmı catzoc"
    ],
    "baslik": "Köprüüstü ECDIS Emniyet Derinliği (Safety Contour & Depth) Hesap Protokolü",
    "ikon": "🧭",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Sefer Planlaması (Passage Plan) Aşamasında",
    "hazirlikZamani": "Gemi Maksimum Su Çekimi (Draft), Çökelme (Squat) ve Gel-Git Tablosu",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🗺️ ECDIS Safety Contour formülü: [Maksimum Draft + Tahmini Squat + Emniyet Payı (UKC) - Gel-Git Yüksekliği] formülüne göre tam hesaplanmalı ve harita katmanına girilmelidir.",
    "oncedenYapilacaklar": [
      "Seyir yapılacak bölgenin CATZOC (veri güvenilirliği) değerini ve harita ölçeğini denetle",
      "Hesaplanan Safety Depth ve Safety Contour değerlerini ECDIS ayar menüsüne girerek sığlık alarmını aktive et",
      "Rotanın geçtiği su yollarındaki izole tehlike işaretleri ve köprü/kablo yükseklik (air draft) kısıtlarını işaretle",
      "Köprüüstü Vardiya Zabiti (OOW) ve Süvari (Kaptan) tarafından onaylanan Sefer Planını sisteme kilitle"
    ]
  },
  {
    "id": "denizcilik_ana_makine_krank_saft_defleksiyon_olcum",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "krank şaft defleksiyon ölçümü",
      "crankshaft deflection gauge",
      "ana makine yatak aşınması",
      "defleksiyon saat komparatörü",
      "makine jurnali kank ölçüm"
    ],
    "baslik": "Gemi Ana Makine Krank Şaft Defleksiyon Ölçümü & Yatak Aşınma Kontrolü",
    "ikon": "⚙️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Her 6 Ayda Bir / 3000 Çalışma Saati Sonunda",
    "hazirlikZamani": "Defleksiyon Komparatör Saati & Virador (Turning Gear)",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "🔧 Defleksiyon ölçümü krank şaftın ana yataklarındaki aşınmayı ve hiza bozukluğunu gösterir; makine soğuk ve sıcak durumda ayrı ayrı ölçülüp klas sınırları denetlenmelidir.",
    "oncedenYapilacaklar": [
      "Ana makine viradorunu (turning gear) devreye alarak volanı çevirme emniyetini sağla",
      "Komparatör saatini 1. silindirin krank kolları arasına zımba noktalarına sıfırlayarak yerleştir",
      "Volanı döndürerek Alt Ölü Nokta (BDC), İskele (Port), Üst Ölü Nokta (TDC) ve Sancak (Starboard) değerlerini mikrometre cinsinden kaydet",
      "Tüm silindirler için işlemi tekrarlayıp üretici limitleri (fark > 0.1 mm) aşılmışsa ana yatak söküm planını yap"
    ]
  },
  {
    "id": "denizcilik_marpol_annex_v_cop_kayit_defteri_grb",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "marpol annex v çöp kaydı",
      "garbage record book grb",
      "denize çöp atma kısıtlaması",
      "özel alanlar marpol çöp",
      "liman çöp teslim makbuzu"
    ],
    "baslik": "MARPOL Ek V Çöp Yönetim Planı & Garbage Record Book (GRB) Kayıtları",
    "ikon": "🗑️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Her Atık İşleminde / Liman Çöp Tesliminde",
    "hazirlikZamani": "Atık Kategorizasyonu (Plastik, Gıda, Evsel vb.) ve Hacim Hesabı",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🌊 MARPOL Ek V uyarınca plastik maddelerin denize atılması tamamen yasaktır; gıda atıkları Özel Alanlar dışında kıyıdan en az 12 mil açıkta ve öğütülmüş olarak tahliye edilebilir.",
    "oncedenYapilacaklar": [
      "Gemideki atıkları kategorilerine göre (A: Plastikler, B: Gıda Atıkları, C: Evsel Atıklar vb.) renkli konteynerlerde ayrıştır",
      "Atık tahliyesinde geminin enlem, boylam, mesafe ve seyir hızını kaydet",
      "Liman atık alım tesisine verilen çöpler için \"Garbage Delivery Receipt\" (GDR) makbuzunu teslim al",
      "Garbage Record Book Kısım I ve II sayfalarına Kaptan onaylı ıslak imzalı kayıtları eksiksiz işle"
    ]
  },
  {
    "id": "gumruk_mense_sahadetnamesi_eur1_dolasim_vize",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "eur 1 dolaşım belgesi vize",
      "menşe şahadetnamesi onay",
      "tercihli ticaret gümrük muafiyeti",
      "medos sistemi eur 1",
      "ticaret odası menşe tasdiki"
    ],
    "baslik": "Tercihli Ticaret Kapsamında EUR.1 / A.TR Dolaşım Belgesi Vize ve Onayı",
    "ikon": "📄",
    "renk": "#FED7AA",
    "varsayilanZaman": "İhracat Beyannamesi Tescili Öncesinde",
    "hazirlikZamani": "İhracat Faturası & İmalatçı Menşe Kriteri Kanıtları",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🌍 EUR.1 veya A.TR dolaşım belgesi alıcı ülkede gümrük vergisi muafiyeti sağlar; MEDOS sistemi üzerinden Ticaret Odası ve Gümrük İdaresi vizesi zorunludur.",
    "oncedenYapilacaklar": [
      "İhraç ürününün Pan-Avrupa-Akdeniz Menşe Kümülasyonu kurallarına göre menşe statüsünü teyit et",
      "Türkiye Odalar ve Borsalar Birliği MEDOS sistemi üzerinden elektronik dolaşım belgesini doldur",
      "Ticaret ve Sanayi Odası onayını müteakip Gümrük Müdürlüğü muayene memuruna elektronik vize onayını ilet",
      "Belge üzerindeki mal tanımı, GTİP ve fatura numaralarının ihracat beyannamesiyle birebir tuttuğunu kontrol et"
    ]
  },
  {
    "id": "gumruk_gtip_itirazi_242_madde_uzlasma_komisyonu",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "gtip itirazı gümrük kanunu 242",
      "tarife uyuşmazlığı gümrük",
      "ek tahakkuk ve para cezası itiraz",
      "gümrük uzlaşma komisyonu başvuru",
      "bağlayıcı tarife bilgisi btb"
    ],
    "baslik": "Gümrük Kanunu 242. Madde GTİP İtirazı & Uzlaşma Komisyonu Müracaatı",
    "ikon": "⚖️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Tebliğ Tarihinden İtibaren 15 Gün İçinde",
    "hazirlikZamani": "Ek Tahakkuk/Ceza Kararı & Ürün Teknik Broşür/Katalogu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ Gümrük Kanunu m. 242 uyarınca ek tahakkuk ve ceza kararlarına karşı 15 gün içinde üst makama itiraz edilmeli veya Uzlaşma Yönetmeliğine göre uzlaşma talep edilmelidir.",
    "oncedenYapilacaklar": [
      "Gümrük müdürlüğü tarafından re’sen değiştirilen GTİP pozisyonunun Armonize Sistem İzahnamesi notlarını incele",
      "Ürünün teknik fonksiyonunu gösteren üniversite/laboratuvar analiz raporlarını dosyala",
      "15 günlük hak düşürücü süre geçirilmeden Bölge Müdürlüğüne itiraz dilekçesini ver veya Uzlaşma Komisyonuna başvur",
      "İtiraz reddedilirse 30 gün içinde Vergi Mahkemesinde dava açma takvimini kur"
    ]
  },
  {
    "id": "gumruk_ata_karnesi_gecici_ithalat_fuar_malzemesi",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "ata karnesi geçici ithalat",
      "fuar malzemesi ata karnesi",
      "tobb ata karnesi teminatı",
      "ata karnesi geçerlilik süresi 1 yıl",
      "gümrük giriş çıkış koçanı ata"
    ],
    "baslik": "ATA Karnesi Kapsamında Geçici İthalat/İhracat (Fuar & Numune) Takibi",
    "ikon": "🧳",
    "renk": "#FED7AA",
    "varsayilanZaman": "Fuar Sevk Öncesi & 1 Yıllık Süre Takibi",
    "hazirlikZamani": "TOBB ATA Karnesi Defteri & Malzeme Çeki Listesi",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "📦 ATA Karnesi malların gümrük vergisi ödenmeksizin geçici ithalat/ihracatını sağlar; karne süresi en fazla 1 yıldır ve yurda geri dönüş koçanı mutlaka mühürletilmelidir.",
    "oncedenYapilacaklar": [
      "TOBB veya yetkili Ticaret Odasından nakit teminat veya banka teminat mektubu mukabilinde ATA Karnesini al",
      "Çıkış gümrüğünde malların fiziki kontrolüyle birlikte sarı ihraç koçanını gümrük memuruna tasdik ettir",
      "Gidilen ülkede beyaz ithalat koçanıyla geçici girişi sağla; süre aşımına (re-exportation date) dikkat et",
      "Fuar bitiminde malları Türkiye’ye eksiksiz getirip sarı yeniden ithalat koçanını mühürleterek teminatı çözdür"
    ]
  },
  {
    "id": "gumruk_laboratuvar_tahlili_itiraz_ikinci_tahlil",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "gümrük laboratuvar tahlili",
      "ikinci tahlil talebi gümrük kanunu",
      "kimyahane tahlil raporu itiraz",
      "gümrük numune alma tutanağı",
      "15 gün içinde ikinci tahlil"
    ],
    "baslik": "Gümrük Laboratuvarı Tahlil Sonucuna İtiraz & İkinci Tahlil Talebi",
    "ikon": "🧪",
    "renk": "#FED7AA",
    "varsayilanZaman": "Rapor Tebliğinden İtibaren 15 Gün",
    "hazirlikZamani": "Şahit Numune Tutanağı & İthalatçı İtiraz Dilekçesi",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🔬 Gümrük Kanunu m. 66 uyarınca laboratuvar tahlil sonucuna 15 gün içinde itiraz edilerek gümrükte saklanan şahit numune üzerinden ikinci tahlil talep edilebilir.",
    "oncedenYapilacaklar": [
      "Gümrük Laboratuvar Müdürlüğü tarafından verilen kimyasal/fiziksel analiz raporunu teknik açıdan incele",
      "15 günlük yasal süre içinde ilgili Gümrük Müdürlüğüne ikinci tahlil başvuru dilekçesi ver",
      "İkinci tahlilin bölge laboratuvarı dışında referans veya üniversite laboratuvarında yapılmasını talep et",
      "İkinci tahlil sonucunun kesin olduğunu ve nihai tarife sınıflandırmasına esas teşkil edeceğini unutma"
    ]
  },
  {
    "id": "gumruk_yys_aeo_yillik_faaliyet_raporu_soru_formu",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "yetkilendirilmiş yükümlü statüsü yys",
      "aeo yıllık faaliyet raporu",
      "yys soru formu güncelleme",
      "yeşil hat gümrük kolaylığı",
      "yys emniyet ve güvenlik denetimi"
    ],
    "baslik": "Yetkilendirilmiş Yükümlü Statüsü (YYS / AEO) Yıllık Faaliyet Raporu & Özdenetim",
    "ikon": "⭐",
    "renk": "#FED7AA",
    "varsayilanZaman": "Her Yıl Yetki Belgesi Tarihini Takip Eden Ayda",
    "hazirlikZamani": "İç Denetim Raporları, Güvenlik Kamera Kayıtları ve Personel Sicil Belgeleri",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "🛡️ YYS belgesine sahip firmalar her yıl düzenli iç denetim yaparak \"YYS Yıllık Faaliyet Raporu\"nu Ticaret Bakanlığına sunmak zorundadır; aksaklıkta yeşil hat askıya alınır.",
    "oncedenYapilacaklar": [
      "Gümrük işlemlerinin mevzuata uygunluğunu Yetkilendirilmiş Gümrük Müşaviri (YGM) raporuyla denetle",
      "Tesis fiziki güvenlik kriterlerini (kamera arşivi 30 gün, kartlı geçiş, çevre çitleri) kontrol et",
      "Dış ticaret ve lojistik personelinin yıllık \"Kaçakçılıkla Mücadele ve Narkotik Farkındalık\" eğitimlerini tamamla",
      "Hazırlanan Yıllık Faaliyet Raporu ve Soru Formunu e-Devlet YYS portalı üzerinden Bakanlığa yükle"
    ]
  },
  {
    "id": "ticaret_fatura_iskonto_iskontolu_fatura_ve_kdv_matrahi",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "fatura altı iskonto muhasebesi",
      "kdv matrahından iskonto düşümü",
      "kasa iskontosu ciro primi",
      "faturada satır iskontosu",
      "611 satış iskontoları hesabı"
    ],
    "baslik": "Ticari Satış: Fatura Altı / Satır İskontosu & KDV Matrahı (KDV m. 25)",
    "ikon": "🏷️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Toplu Satış Faturası Düzenlenirken",
    "hazirlikZamani": "Müşteri Bayilik Sözleşmesi İskonto Oranları",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "💼 KDV Kanunu m. 25/a uyarınca faturada ayrıca gösterilen ticari teamüllere uygun iskontolar doğrudan KDV matrahından indirilir; fatura sonradan kesilirse KDV düzeltmesi gerekir.",
    "oncedenYapilacaklar": [
      "Müşteri cari sözleşmesindeki basamaklı iskonto oranını (%5 peşin, %10 bayi iskontosu) belirle",
      "Satır iskontosunu veya fatura altı genel iskontoyu KDV hesaplanmadan önceki ara toplama uygula",
      "İskonto düşüldükten sonra kalan net tutar üzerinden yürürlükteki KDV oranını hesaplat",
      "Satış muhasebe kaydında brüt satışı 600 Yurtiçi Satışlar, iskontoyu 611 Satış İskontoları hesabına borç kaydet"
    ]
  },
  {
    "id": "ticaret_ambalaj_atiklari_ve_gekap_beyannamesi",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "gekap beyannamesi",
      "geri kazanım katılım payı",
      "plastik poşet beyanı gekap",
      "ambalaj atığı geri dönüşüm vergisi",
      "üç aylık gekap bildirimi"
    ],
    "baslik": "Çevre Kanunu: GEKAP (Geri Kazanım Katılım Payı) Beyannamesi",
    "ikon": "♻️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Dönemi Takip Eden Ayın Son Gününde",
    "hazirlikZamani": "Piyasaya Sürülen Plastik, Karton, Metal Ambalaj Kg Listesi",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "💼 Ürünlerini ambalajlı olarak piyasaya süren veya plastik poşet kullanan tüm işletmeler üç ayda bir GİB üzerinden GEKAP beyannamesi vermek zorundadır.",
    "oncedenYapilacaklar": [
      "Dönem içinde yurt içine satılan ürünlerin ambalaj türlerini (plastik, cam, kompozit, ahşap) kilogram bazında dök",
      "Piyasaya verilen ücretsiz veya ücretli taşıma poşetlerinin adet sayımını yap",
      "Çevre Kanununa ekli (1) sayılı listedeki güncel birim tutarlarla GEKAP payını hesapla",
      "GİB Beyanname Düzenleme Programından GEKAP beyannamesini onaylayıp tahakkuk eden bedeli öde"
    ]
  },
  {
    "id": "ticaret_gumruk_antrepo_ardiye_ve_demuraj_hesabi",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "demuraj faturası demurrage",
      "antrepo ardiye hesaplama",
      "konteyner serbest süre free time",
      "ardiye kdv tevkifatı",
      "gözetim ve bekleme ücreti liman"
    ],
    "baslik": "Dış Ticaret: Konteyner Demuraj (Demurrage) & Liman Ardiye Kontrolü",
    "ikon": "🚢",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Konteyner Gemi Boşaltmasından Sonra",
    "hazirlikZamani": "Acente Free-Time (Serbest Gün) Süresi Sorgulaması",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "💼 Acentenin tanıdığı Free-Time süresi (genelde 7-14 gün) aşıldığında günlük yüzlerce dolar demuraj cezası işler; gümrükleme işlemleri serbest süre dolmadan bitirilmelidir.",
    "oncedenYapilacaklar": [
      "Konşimento acentesiyle konteyner serbest bekleme gününü (Free Time) teyit et",
      "Liman terminalinin ardiye tarifesini ve son serbest günü lojistik operasyon takvimine işle",
      "Gümrük muayene ve tescil sürecini hızlandırarak demuraja girmeden konteyneri limandan kapı çıkışı yaptır",
      "Acenteden gelen demuraj ve detention faturalarını navlun sözleşmesi şartlarıyla karşılaştırıp mutabakat sağla"
    ]
  },
  {
    "id": "lojistik_parsiyel_yuk_desisi_ve_hacimsel_agirlik_cbm",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "hacimsel ağırlık desi hesabı",
      "kargo desi formülü en boy yükseklik",
      "cbm metreküp hesabı konteyner",
      "havayolu 1/6000 katsayısı",
      "karayolu 1 m3 333 kg katsayısı"
    ],
    "baslik": "Kargo & Parsiyel Taşımacılık: Desi (Volumetrik Ağırlık) & CBM Hesabı",
    "ikon": "📦",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kargo Kabul ve Fiyatlandırma Aşamasında",
    "hazirlikZamani": "Lazer Şeritmetre & Kantar Ağırlık Tartımı",
    "hazirlikSaatOncesi": 0.2,
    "akilliFisilti": "🚛 Taşımacılıkta navlun gerçek kilo ile hacimsel kilonun (desi) yüksek olanından hesaplanır; karayolunda `1 m3 = 333 kg`, havayolunda `En x Boy x Yükseklik / 6000` kullanılır.",
    "oncedenYapilacaklar": [
      "Kolinin veya paletin en, boy ve yükseklik ölçülerini santimetre cinsinden ölç",
      "Yurtiçi kargo için `(En x Boy x Yükseklik) / 3000` formülüyle paket desisini bul",
      "Uluslararası parsiyelde paketlerin toplam hacmini metreküp (CBM) cinsinden topla",
      "Kantar brüt ağırlığı ile hacimsel ağırlığı karşılaştırıp yüksek olan değere göre sevk irsaliyesi navlununu yaz"
    ]
  },
  {
    "id": "lojistik_lojistikte_cross_docking_capraz_sevkiyat",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "cross-docking operasyonu",
      "çapraz sevkiyat depo",
      "depolama yapmadan doğrudan aktarma",
      "palet ayrıştırma dağıtım rampası",
      "stoksuz aktarma merkezi hub"
    ],
    "baslik": "Lojistik Hub: Çapraz Sevkiyat (Cross-Docking) & Sıfır Stok Aktarımı",
    "ikon": "🔄",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Tedarikçi Kamyonu Rampaya Yanaştığında",
    "hazirlikZamani": "Çıkış Kamyonları Rampa Eşleştirmesi & Dağıtım Etiketleri",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "📦 Cross-docking sisteminde gelen mallar depolama rafına girmeden doğrudan giren araçtan çıkan dağıtım araçlarına aktarılır; ürün depoda en fazla 12-24 saat kalabilir.",
    "oncedenYapilacaklar": [
      "WMS sisteminde gelen ürünlerin sevk emriyle ve varış mağaza kodlarıyla eşleştiğini doğrula",
      "Giriş rampasında boşaltılan paletleri bekleme yapmadan konsolidasyon alanında mağaza bazında ayrıştır",
      "Barkodları el terminaliyle okutarak doğrudan ilgili rotanın giden kamyonuna yüklet",
      "Depolama maliyetini ve bekleme süresini sıfırlayarak anlık sevk irsaliyelerini kes"
    ]
  },
  {
    "id": "lojistik_demiryolu_lokomotif_atp_ats_sinyalizasyon_ve_fren",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "demiryolu ats sinyalizasyon",
      "otomatik tren durdurma balizi",
      "lokomotif hava fren basıncı 5 bar",
      "makinist uyanıklık butonu deadman",
      "tren seyir kayıt bandı hasler"
    ],
    "baslik": "Demiryolu Operasyonu: Lokomotif ATS Sinyalizasyonu & Pnömatik Fren Testi",
    "ikon": "🚆",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Gardan / Lojistik Merkezinden Kalkıştan Önce",
    "hazirlikZamani": "Ana Depo Basıncı (8-10 Bar) & Tren Fren Hattı (5 Bar)",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🚆 ATS (Otomatik Tren Durdurma) balizinden kırmızı sinyal geçilirse sistem treni acil frenle durdurur; kalkıştan önce son vagona kadar fren süreklilik testi zorunludur.",
    "oncedenYapilacaklar": [
      "Ana hava deposu basıncının 9-10 bar, fren genel borusu basıncının tam 5.0 bar olduğunu manometreden gör",
      "Kuyruk vagonuna kadar hava hortumlarının bağlı olduğunu ve son vagon musluğunun açık olduğunu doğrula",
      "Makinist acil fren kolunu çekerek tüm tekerlek balatalarının diske bastığını fiziki kontrolden geçir",
      "ATS baliz alıcısının ve Deadman (uyanıklık pedalı) butonunun fonksiyon testini tamamla"
    ]
  },
  {
    "id": "lojistik_havayolu_palet_net_file_ve_strap_lashing_guvenligi",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "hava kargo bağlama kayışı strap",
      "hava kargo palet filesi net",
      "5000 lbs gergi kayışı",
      "hava kargo devrilme kilit açısı",
      "kargo uçağı taban kilit rayı"
    ],
    "baslik": "Hava Kargo: Ağır Yük Strap / Kayış Bağlama & Uçuş Emniyeti (5000 lbs)",
    "ikon": "✈️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Palet Üzerine Ağır Yük Yerleştirildiğinde",
    "hazirlikZamani": "TSO-C90 Onaylı Bağlama Kayışları (Straps) & Köşebentler",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "✈️ Ağır hava kargo parçalarında sadece file yetersizdir; uçuş sırasında türbülansta yukarı ve yana ivmelenmeyi karşılamak için onaylı 5000 lbs bağlama kayışları (straps) çekilmelidir.",
    "oncedenYapilacaklar": [
      "Yükün ağırlık merkezini paletin tam ortasına denk getir ve taban yük dağıtım kalaslarını koy",
      "Yükün sivri kenarlarına alüminyum veya sert kauçuk köşebentler yerleştir",
      "Palet kenar raylarına çift tırnaklı kancalarla en az 45 derece açıyla çapraz gergi kayışlarını bağla",
      "Cırcırlı gergileri sıkarak kargonun ileri (9G), geri (1.5G) ve yukarı (2G) kuvvetlere karşı rijitlendiğini doğrula"
    ]
  },
  {
    "id": "lojistik_karayolu_adr_src5_sofor_ve_arac_guvenlik_tehcizati",
    "category": "arac_ulasim",
    "domain": "ULASTIRMA_LOJISTIK",
    "keywords": [
      "adr çantası içeriği",
      "src5 belgesi şoför",
      "tehlikeli madde göz yıkama şişesi",
      "kıvılcım çıkarmaz el feneri ex",
      "kanalizasyon örtüsü ve toplama kabı"
    ],
    "baslik": "Tehlikeli Madde (ADR): SRC-5 Şoför Belgesi & Araç ADR Çantası Denetimi",
    "ikon": "🦺",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Dolum Tesisine Girmeden Önce",
    "hazirlikZamani": "ADR Güvenlik Teçhizat Çantası & Kişisel Koruyucu Donanımlar",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🚛 ADR m. 8.1.5 gereği araçta kıvılcımsız el feneri, göz yıkama sıvısı, acil durum kaçış maskesi, tekerlek takozu ve kanalizasyon tahliye örtüsü eksiksiz bulunmalıdır.",
    "oncedenYapilacaklar": [
      "Şoförün geçerli SRC-5 Tehlikeli Madde Taşıma Belgesini ve ADR Yazılı Talimat belgesini denetle",
      "ADR çantasını açarak göz yıkama şişesi, reflektif yelek, portatif aydınlatma ve kaçış maskesini kontrol et",
      "Sızıntı anında yağmur suyu kanallarını tıkamak için neopren kanalizasyon örtüsü ve toplama küreğini hazır tut",
      "Araçta en az 2 adet taşınabilir metal tekerlek takozunun ve 2 adet yangın söndürme tüpünün basıncını doğrula"
    ]
  },
  {
    "id": "emlak_tasinmaz_ticareti_yetki_sozlesmesi_3_aylik_sure",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "taşınmaz ticareti yetki sözleşmesi",
      "emlakçı yetkilendirme sözleşmesi 3 ay",
      "tek yetkili emlak sözleşmesi",
      "emlak komisyon oranı azami %4",
      "yetki sözleşmesi fesih ihbarı"
    ],
    "baslik": "Taşınmaz Ticareti Yönetmeliği: Yetkilendirme Sözleşmesi & 3 Aylık Süre",
    "ikon": "📜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Portföy Alımında ve İlan Öncesinde",
    "hazirlikZamani": "Tapu Fotokopisi, Mal Sahibi Kimliği & Yetki Metni",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏡 Taşınmaz Ticareti Yönetmeliği m. 15 gereğince yetkilendirme sözleşmesi yazılı yapılır, süresi en fazla 3 aydır ve toplam hizmet bedeli satış bedelinin %4'ünü geçemez.",
    "oncedenYapilacaklar": [
      "Tapu kaydındaki hak sahipleri ile mülk sahibi kimliğini eşleştir",
      "Yönetmeliğe uygun basılı yetkilendirme sözleşmesine net pazarlama satış bedelini ve %2 + %2 komisyon oranını yaz",
      "Sözleşme süresini azami 3 ay olarak belirleyip tarafların ıslak imzalarını al",
      "Portföyü Taşınmaz Ticareti Bilgi Sistemi (TTBS) ve kurumsal ilan portallarına yetki numarasıyla ekle"
    ]
  },
  {
    "id": "emlak_kira_sozlesmesinde_kefalet_el_yazisi_kurali_tbk583",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "kira sözleşmesi kefil el yazısı",
      "tbk 583 kefalet geçerlilik şekli",
      "kefilin azami sorumluluk miktarı",
      "müteselsil kefil el yazılı beyan",
      "eşin rızası kefalet sözleşmesi"
    ],
    "baslik": "Kira Hukuku: Kefaletin Geçerlilik Şartı & El Yazısı Zorunluluğu (TBK 583)",
    "ikon": "✍️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Kira Sözleşmesi İmzalanırken",
    "hazirlikZamani": "Kefilin Kimliği, Gelir Belgesi & Eş Muvafakatnamesi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🏡 TBK m. 583 uyarınca kefilin sorumlu olduğu azami tutar, kefalet tarihi ve müteselsil kefil olduğu ibaresi kefilin KENDİ EL YAZISIYLA yazılmazsa kefalet kesinlikle geçersizdir.",
    "oncedenYapilacaklar": [
      "Kira kontratının kefalet bölümüne matbu yazı koyma; kefilin kendi el yazısıyla yazmasını sağla",
      "Kefile \"Azami ... TL tutara kadar, ... tarihinden itibaren müteselsil kefil olarak kefilim\" cümlesini bizzat yazdır",
      "Kefil evliyse TBK m. 584 gereği eşinin yazılı onayını (eş muvafakatnamesi) sözleşmeye eklet",
      "Tahliye taahhüdünü kira sözleşmesiyle aynı gün değil, mecurun tesliminden sonraki bir tarihte tanzim ettir"
    ]
  },
  {
    "id": "emlak_bina_isi_yalitimi_ve_enerji_kimlik_belgesi_ekb",
    "category": "ev_teknik",
    "domain": "EMLAK",
    "keywords": [
      "enerji kimlik belgesi ekb",
      "bina enerji sınıfı a b c",
      "tapuda ekb ibraz zorunluluğu",
      "binalarda enerji performansı yönetmeliği",
      "isı yalıtım mantolama belgesi"
    ],
    "baslik": "Binalarda Enerji Performansı: Enerji Kimlik Belgesi (EKB) Sınıfı & Tapu",
    "ikon": "🏢",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Bina Alım-Satım / Kiralama ve Ruhsat Aşamasında",
    "hazirlikZamani": "Mimari, Mekanik ve Yalıtım Uygulama Projeleri",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏡 Binalarda Enerji Performansı Yönetmeliği uyarınca yeni binalar en az C sınıfı EKB almak zorundadır; alım-satım ve kiralamalarda EKB sınıfı alıcıya beyan edilir.",
    "oncedenYapilacaklar": [
      "Çevre ve Şehircilik Bakanlığı lisanslı EKB uzmanına binanın BEP-TR hesaplama dosyasını hazırlat",
      "Duvar, çatı mantolama kalınlıkları ve pencere ısı geçirgenlik katsayılarını (U değerleri) projeden teyit et",
      "Kazan, VRF veya ısı pompası sisteminin mevsimsel verimlilik sınıfını sisteme işle",
      "Üretilen karekodlu resmi Enerji Kimlik Belgesini bina girişine as ve tapu devir dosyasında hazır bulundur"
    ]
  },
  {
    "id": "emlak_hisseli_tarla_ve_toprak_koruma_kanunu_5403",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "5403 sayılı toprak koruma kanunu",
      "asgari tarımsal arazi büyüklüğü",
      "tarla hisse satışı yasağı",
      "tarımsal gelir arazisi bölünemez",
      "il tarım hisseli satış onayı"
    ],
    "baslik": "Tarım Arazileri: 5403 Sayılı Kanun Asgari Büyüklük & Bölünemez Parsel",
    "ikon": "🌾",
    "renk": "#FED7AA",
    "varsayilanZaman": "Tarla / Arazi Alım-Satım Sözleşmesi Öncesi",
    "hazirlikZamani": "İl/İlçe Tarım Müdürlüğü İzin Yazısı",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🏡 5403 sayılı Kanun gereği mutlak tarım arazileri 20 dekardan, dikili araziler 5 dekardan küçük parçalara bölünemez ve hisse satışı yapılamaz.",
    "oncedenYapilacaklar": [
      "Tapu müdürlüğüne gitmeden önce arazinin niteliğini (kuru tarım, sulu tarım, dikili bağ/bahçe) kadastrodan kontrol et",
      "Taşınmazın asgari tarımsal arazi büyüklüğü sınırının altında kalıp kalmadığını hesapla",
      "Hisseli arazide sadece diğer hissedarlara satış yapılabileceğini veya tüm hissedarların birlikte tek alıcıya satabileceğini bil",
      "İlçe Tarım ve Orman Müdürlüğünden tapu devri için zorunlu \"Tarımsal Arazi Satış İzin Yazısı\"nı al"
    ]
  },
  {
    "id": "emlak_site_yonetimi_isletme_projesi_ve_kesinlesme_kmk37",
    "category": "finans",
    "domain": "EMLAK",
    "keywords": [
      "işletme projesi kmk 37",
      "aidat tebliği site yönetimi",
      "7 gün işletme projesine itiraz",
      "kat mülkiyeti kesinleşen aidat icrası",
      "gecikme tazminatı %5 site aidatı"
    ],
    "baslik": "Site Yönetimi: KMK m. 37 İşletme Projesi Tebliği & Kesinleşme Süreci",
    "ikon": "📊",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Yıllık Genel Kurul Sonrası / Yeni Bütçe Döneminde",
    "hazirlikZamani": "Tahmini Gider Bütçesi & Arsa Payı Aidat Dağıtım Tablosu",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "🏡 KMK m. 37 gereği işletme projesi kat maliklerine taahhütlü mektupla tebliğ edilir; 7 gün içinde itiraz edilmezse kesinleşir ve icra takibine doğrudan esas olur.",
    "oncedenYapilacaklar": [
      "Yıllık tahmini yakıt, güvenlik, temizlik ve bakım giderlerini içeren işletme projesini hazırla",
      "Giderleri arsa payı veya bağımsız bölüm eşitliği esasına göre her daireye paylaştır",
      "Projeyi tüm kat maliklerine elden imza karşılığı veya noter/iadeli taahhütlü mektupla tebliğ et",
      "7 gün içinde Sulh Hukuk Mahkemesine iptal davası açılmamışsa projeyi kesinleştirip ödemeyenlere aylık %5 gecikme tazminatıyla icra takibi aç"
    ]
  },
  {
    "id": "denizcilik_demirleme_operasyonu_ve_kaloma_miktari_hesabi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "gemi demirleme kaloma hesabı",
      "kilit hesabı demir zinciri",
      "su derinliğinin 4 katı kaloma",
      "fırtınalı havada 6-7 kat kaloma",
      "ırgat freni kastanyola demir atma"
    ],
    "baslik": "Gemi Manevrası: Demirleme Operasyonu, Kaloma Miktarı & Kilit Hesabı",
    "ikon": "⚓",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Demir Sahasına Yanaşırken / Rüzgar Üstünden",
    "hazirlikZamani": "Başüstü Ekibi, Irgat Hidroliği & Fener/Düdük İrtibatı",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "⚓ 1 kilit demir zinciri 27.5 metredir; normal havada su derinliğinin en az 4-5 katı, fırtınalı havada 7 katı kaloma (denize zincir) verilmelidir.",
    "oncedenYapilacaklar": [
      "VHF telsizle VTS (Gemi Trafik Hizmetleri) merkezinden demirleme sahası ve koordinat tahsisini al",
      "Başüstü ekibini başa sevk ederek ırgatın kastanyola frenini çözdür ve demiri su hizasına kadar fondo yapmaya hazırla",
      "Gemi tornistan ile geriye doğru hafif yol alırken kaptan emriyle \"Fondo Demir\" komutunu ver",
      "Su derinliğini iskandilden okuyup derinliğin 5 katı kadar kilidi (örn: 20m derinlik için 4 kilit = 110m) kaloma vererek kastanyolayı sık"
    ]
  },
  {
    "id": "denizcilik_marpol_ek1_yagli_su_ayristirici_ows_15ppm",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "marpol ek 1 sintine basma",
      "ows 15 ppm yağlı su ayrıştırıcı",
      "oil record book yağı kayıt jurnali",
      "15 ppm alarmı 3 yollu vana",
      "makine dairesi sintine tahliyesi"
    ],
    "baslik": "MARPOL Ek I: Sintine Separatörü (OWS 15 PPM) & Yağ Kayıt Jurnali",
    "ikon": "🛢️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Denizde Sintine Boşaltma Operasyonunda",
    "hazirlikZamani": "Petrol Kayıt Jurnali (Oil Record Book Part I) & Kalibre 15 PPM Monitörü",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "⚓ MARPOL Ek I gereği denize basılan sintine suyundaki yağ oranı kesinlikle 15 PPM altında olmalıdır; 15 PPM aşılırsa 3 yollu vana denize çıkışı kapatıp suyu sintineye geri basar.",
    "oncedenYapilacaklar": [
      "Gemi karadan en az 12 deniz mili açıkta ve seyir halinde (yolu varken) operasyonu planla",
      "15 PPM sintine alarm cihazının optik hücresini temizleyip sıfır kalibrasyon testini yap",
      "OWS separatörünü devreye alarak denize tahliye vanasını aç ve debimetre kayıtlarını izle",
      "Tahliye bittiğinde Başmühendis imzasıyla Oil Record Book Part I'e başlangıç/bitiş saati, gemi koordinatı ve basılan metreküp miktarını işle"
    ]
  },
  {
    "id": "denizcilik_pilot_card_ve_kilavuz_kaptan_barmasi_pilot_ladder",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "kılavuz kaptan çarmıhı pilot ladder",
      "solas pilot çarmıhı kuralları",
      "pilot çarmıhı denizden 9 metre kuralı",
      "kılavuzluk botu transferi",
      "pilot card gemi manevra bilgileri"
    ],
    "baslik": "Liman Girişi: Kılavuz Kaptan Çarmıhı (Pilot Ladder) Donatımı & Pilot Card",
    "ikon": "🪜",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Pilot İstasyonuna 1 Saat Kala",
    "hazirlikZamani": "Solas Onaylı Pilot Çarmıhı, Can Simidi & Güverte Zabiti Refakati",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚓ SOLAS Kural V/23 uyarınca pilot çarmıhı basamakları temiz sert ahşap olmalı, bordaya tam yaslanmalı ve güverte yüksekliği 9 metreyi aşarsa borda iskelesiyle kombine edilmelidir.",
    "oncedenYapilacaklar": [
      "Köprüüstünde geminin draftı, boyu, pervane dönüş yönü ve durma mesafesini gösteren \"Pilot Card\"ı doldur",
      "Rüzgar altı bordadan pilot botunun dalgadan korunacağı tarafa pilot çarmıhını sarkıt",
      "Çarmıhın su seviyesinden yüksekliğini kılavuzluk istasyonunun VHF ile bildirdiği yüksekliğe (örn: 1.5 metre) ayarla",
      "Çarmıh başında can simidi, savlo ve kendinden yanan ışık bulundurarak bir zabiti telsizle hazır beklet"
    ]
  },
  {
    "id": "denizcilik_balast_suyu_yonetimi_bwms_ve_d2_standardi",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "balast suyu arıtma sistemi bwms",
      "imo bwm konvansiyonu d-2 standardı",
      "uv balast arıtma nötralizasyon",
      "ballast water record book",
      "tro toplam artık oksidan seviyesi"
    ],
    "baslik": "Çevre Hukuku: Balast Suyu Yönetimi (BWMS) & D-2 Deşarj Standardı",
    "ikon": "🌊",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Liman Operasyonunda Balast Alırken / Basarken",
    "hazirlikZamani": "BWMS Filtrasyon & UV / Elektro-Klorinasyon Ünitesi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚓ İstilacı türlerin taşınmasını önleyen IMO D-2 standardı gereğince arıtılmamış balast suyu hiçbir limanda basılamaz; sistem arızalanırsa denizde derin su değişimi (D-1) yapılır.",
    "oncedenYapilacaklar": [
      "Balast pompalarını çalıştırmadan önce BWMS 40 mikronluk otomatik ters yıkamalı filtreyi devreye al",
      "UV reaktörünün lamba gücünü veya elektro-klorlama ünitesinin TRO seviyesini panelden izle",
      "Tanklara alınan veya denize basılan suyun debisini ve kümülatif tonajını BWMS veri kayıt cihazına kaydet",
      "Operasyonu \"Ballast Water Record Book\" jurnaline tank numarası ve koordinat belirterek imzala"
    ]
  },
  {
    "id": "denizcilik_yakit_ikmali_bunker_operasyonu_ve_marpol_numunesi",
    "category": "finans",
    "domain": "DENIZCILIK",
    "keywords": [
      "bunker yakıt ikmali gemi",
      "marpol yakıt numunesi şişesi",
      "bunker delivery note bdn",
      "yakıt taşması scupper tapaları",
      "bunker checklist kontrol listesi"
    ],
    "baslik": "Bunker Operasyonu: Yakıt İkmali, MARPOL Şişesi & Taşma Güvenliği",
    "ikon": "⛽",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Bunker Barcı Bordaya Yanaştığında",
    "hazirlikZamani": "Güverte Frengi Delikleri (Scupper) Tapaları & SOPEP Kiti",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚓ Yakıt ikmali boyunca güvertedeki tüm frengi delikleri (scupper) sızdırmaz tapalarla kapatılır; barçtan alınan mühürlü MARPOL numunesi gemide 12 ay saklanmak zorundadır.",
    "oncedenYapilacaklar": [
      "Gemi ile barç arasında emniyet kontrol listesini (Ship-Shore Safety Checklist) karşılıklı imzala",
      "Güverte frengi deliklerini kauçuk tapalarla kapatıp manifold altına talaş ve sızıntı tepsisi koy",
      "Manifolddan damlama yöntemiyle kesintisiz olarak 4 adet resmi MARPOL yakıt numunesi al ve mühürle",
      "Yakıt alımı bitince barçtan teslim alınan BDN (Bunker Delivery Note) üzerindeki kükürt (%S) oranını doğrula"
    ]
  },
  {
    "id": "gumruk_dahilde_isleme_rejimi_dir_dii_ve_ihracat_taahhudu",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "dahilde işleme izin belgesi diib",
      "dir kapsamında vergisiz hammadde",
      "dii ihracat taahhüt hesabı kapatma",
      "eşdeğer eşya kullanımı dir",
      "yurt içi alımda tecil terkin dir"
    ],
    "baslik": "Gümrük Rejimi: Dahilde İşleme İzin Belgesi (DİİB) & Taahhüt Kapatma",
    "ikon": "🏭",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Hammadde İthalatında & Belge Süresi Bitiminde",
    "hazirlikZamani": "Ticaret Bakanlığı DİİB İhracat/İthalat Listeleri & Gümrük Beyannameleri",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "📦 DİİB kapsamında ithal edilen hammaddenin vergileri teminata bağlanır; taahhüt edilen mamul mal ihraç edildiğinde taahhüt hesabı kapatılarak teminat çözülür.",
    "oncedenYapilacaklar": [
      "DİİB kapsamında tescil edilen ithalat beyannamesinde muafiyet kodunu ve teminat mektubunu uygula",
      "Üretim sürecinde hammadde sarfiyatını ve fire oranlarını Sanayi Sicil Kapasite Raporuyla eşle",
      "İhracat beyannamelerinin 44 nolu hanesine DİİB belge tarih ve numarasını mutlaka yazdır",
      "Belge süresi dolmadan Ticaret Bakanlığı Bölge Müdürlüğüne yeminli mali müşavir raporu ile müracaat edip taahhüdü kapattır"
    ]
  },
  {
    "id": "gumruk_antrepo_rejimi_7100_antrepo_beyannamesi_ve_kolileme",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "7100 antrepo beyannamesi",
      "a tipi genel antrepo giriş",
      "antrepoda elleçleme izni ek-63",
      "gümrük gözetiminde etiketleme",
      "antrepo süresiz bekleme hakkı"
    ],
    "baslik": "Gümrük Kanunu m. 93: Antrepo Rejimi (7100 Kod) & Elleçleme İzni",
    "ikon": "🏬",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Mallar Limandan Antrepoya Sevk Edildiğinde",
    "hazirlikZamani": "Antrepo Taşıma İrsaliyesi & 7100 Kodlu Beyanname",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "📦 Eşya antrepoda kaldığı sürece gümrük vergileri ve KDV ödenmez; ambalaj değiştirme veya etiketleme yapılacaksa gümrük müdürlüğünden Ek-63 Elleçleme İzni alınmalıdır.",
    "oncedenYapilacaklar": [
      "Özet beyan açıldıktan sonra A Tipi Genel Antrepoya sevki için 7100 kodlu Antrepo Beyannamesini tescil ettir",
      "Yetkilendirilmiş Gümrük Müşaviri (YGM) nezaretinde eşyanın mühür açımını ve kap/koli sayımını yap",
      "Türkçe tanıtım veya parti etiketi basılacaksa Gümrük Yönetmeliği Ek-63 formunu doldurarak gümrükten onay al",
      "Yurtiçine çekilecek kısım için 4071 kodlu Serbest Dolaşıma Giriş beyannamesi açarak vergilerini kısmi öde"
    ]
  },
  {
    "id": "gumruk_ithalatta_kaynak_kullanimi_destekleme_fonu_kkdf",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "ithalatta kkdf fonu %6",
      "vadeli ithalat kkdf kesintisi",
      "mal mukabili ödemede kkdf",
      "peşin ödeme transfer bildirimi banka",
      "kabul kredili poliçeli ithalat kkdf"
    ],
    "baslik": "Dış Ticaret Finansmanı: İthalatta %6 KKDF Kesintisi & Muafiyet Şartı",
    "ikon": "💸",
    "renk": "#FED7AA",
    "varsayilanZaman": "İthalat Gümrük Vergileri Tahakkuk Ederken",
    "hazirlikZamani": "Banka Döviz Satım / Transfer Belgesi (Gümrük Tescilinden Önce)",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "📦 Vadeli, mal mukabili veya kabul kredili ithalatta fatura bedeli üzerinden %6 KKDF ödenir; KKDF'den muaf olmak için ödemenin gümrük tescil tarihinden ÖNCE bankadan transfer edilmesi şarttır.",
    "oncedenYapilacaklar": [
      "Yurtdışı tedarikçiye yapılan banka transferinin (SWIFT) gümrük beyannamesi tescil saatinden önce yapıldığını teyit et",
      "Banka transfer dekontu üzerindeki fatura numarası ve döviz tutarı eşleşmesini kontrol et",
      "Peşin ödeme yapılmışsa beyannamenin 44 nolu hanesine banka referans numarasını yazarak %6 KKDF muafiyetini işlet",
      "Mal bedeli gümrük tescilinden sonra ödenecekse gümrük veznesine ithalat bedeli üzerinden %6 KKDF tahakkukunu yatır"
    ]
  },
  {
    "id": "gumruk_ihracat_bedellerinin_yurda_getirilmesi_ve_ibkb",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "ihracat bedeli kabul belgesi ibkb",
      "180 gün ihracat bedeli getirme",
      "%40 tcmb döviz satışı zorunluluğu",
      "vergi dairesi ihracat açık hesap takibi",
      "tpkk 32 sayılı karar ihracat"
    ],
    "baslik": "TCMB İhracat Genelgesi: İBKB Düzenleme (180 Gün) & %40 Zorunlu Satış",
    "ikon": "📑",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Fiili İhraç Tarihinden İtibaren En Geç 180 Gün İçinde",
    "hazirlikZamani": "Kapanan Gümrük Çıkış Beyannamesi (GB) & Gelen SWIFT",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "📦 Fiili ihraçtan itibaren 180 gün içinde bedel yurda getirilmezse vergi dairesince 90 günlük ihtarname çekilir; bankaya gelen ihracat bedelinin %40'ı zorunlu olarak TCMB'ye satılır.",
    "oncedenYapilacaklar": [
      "Yurtdışından gelen ihracat dövizinin SWIFT mesajındaki alıcı beyanname numarası eşleşmesini gör",
      "İlgili bankaya müracaat ederek İhracat Bedeli Kabul Belgesi (İBKB) düzenlet",
      "Gelen dövizin %40'lık kısmını TCMB Merkez Bankası kuru üzerinden TL'ye dönüştürerek satışı onayla",
      "Kalan dövizi serbest şirket hesabına aktar ve İBKB numarasını GİB sistemine işletip ihracat hesabını kapat"
    ]
  },
  {
    "id": "gumruk_gözetim_belgesi_ve_referans_kiymet_fark_kdv",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "ithalatta gözetim uygulaması",
      "referans kıymet birim fiyat dolar/kg",
      "gözetim farkı kdv matrahı",
      "gözetim belgesi ticaret bakanlığı",
      "haksız gözetim kdv iadesi davası"
    ],
    "baslik": "Gözetim Tebliği: Referans Kıymet, Birim Fiyat (Kg/$) & Yurtiçi Fark KDV",
    "ikon": "⚖️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "İthalat Gümrük Tarife Cetveli Kontrolünde",
    "hazirlikZamani": "Fatura Birim Fiyatı ile Tebliğdeki Asgari Kıymet Kıyaslaması",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "📦 Gerçek fatura fiyatı tebliğdeki birim kıymetin (örn: 5$/kg) altında ise fark tutar \"Yurtiçi Gider\" olarak matraha eklenir ve vergileri ödenir; aksi halde Gözetim Belgesi istenir.",
    "oncedenYapilacaklar": [
      "İthal edilecek ürünün GTİP numarasının İthalatta Gözetim Uygulanmasına İlişkin Tebliğ listesinde olup olmadığını sorgula",
      "Ürünün brüt ağırlığına göre tebliğdeki asgari kıymet eşiğini hesapla",
      "Fatura fiyatı düşükse gümrükte ceza ve bekleme yaşamamak için beyannamede farkı \"Gözetim Kaynaklı İlave Kıymet\" olarak beyan et",
      "Ödenen fazladan KDV ve vergileri sonradan Vergi Mahkemesinde dava yoluyla geri almak için beyannameye \"İhtirazi Kayıt Şerhi\" koydur"
    ]
  },
  {
    "id": "ticaret_gun_sonu_z_raporu_ve_pos_mali_mutabakati",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "gün sonu z raporu alma",
      "yazar kasa pos mali hafıza raporu",
      "pos gün sonu mutabakatı slip",
      "kasa fiziki nakit sayım farkı",
      "e-arşiv fatura ve perakende satış fişi"
    ],
    "baslik": "Perakende & Kasa: Gün Sonu Z Raporu & POS Slip Mali Mutabakatı",
    "ikon": "🧾",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Mağaza/Dükkan Kapanış Saatinde (21:30 - 22:30)",
    "hazirlikZamani": "Kasa Nakit Çekmecesi, POS Gün Sonu Raporları & Kasa Defteri",
    "hazirlikSaatOncesi": 0.5,
    "akilliFisilti": "🏪 Mali mevzuat gereği her gün sonunda ÖKC yazar kasadan Z Raporu alınması ve POS slipleri toplamı ile banka hesabı arasındaki mutabakatın sağlanması zorunludur.",
    "oncedenYapilacaklar": [
      "ÖKC yeni nesil yazar kasadan günlük Z Raporunu çıkartarak kümülatif mali hafıza tutarını kontrol et",
      "Tüm banka POS cihazlarından ayrı ayrı \"Gün Sonu\" işlemi yaparak gün içi kredi kartı satış toplamlarını al",
      "Çekmecedeki madeni ve kağıt paraları sayarak gün başı devir avansını ayır ve net nakit hasılatı bul",
      "Kasa fazlası veya kasa noksanı varsa kasa defterine gerekçesiyle işleyip yöneticinin onayına sun"
    ]
  },
  {
    "id": "ticaret_stok_sayimi_fifo_ve_barkodlu_depo_mutabakati",
    "category": "is_kariyer",
    "domain": "TICARET",
    "keywords": [
      "periyodik stok sayımı fifo",
      "el terminali barkod depo sayımı",
      "stok fire ve zayi oranı hesabı",
      "kritik stok sipariş seviyesi min-max",
      "depo stok mutabakat raporu"
    ],
    "baslik": "Lojistik & Depo: FIFO Kuralı, El Terminaliyle Stok Sayımı & Fire Tespiti",
    "ikon": "📦",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Ay Sonu Kapanışında / Pazar Akşamı",
    "hazirlikZamani": "Endüstriyel El Terminali, Barkod Okuyucu & ERP Stok Listesi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "🏪 Depolarda İlk Giren İlk Çıkar (FIFO) kuralı uygulanmalı; el terminali ile yapılan fiili sayım sonuçları ERP sistemindeki kayıtlı stokla satır satır mutabık kılınmalıdır.",
    "oncedenYapilacaklar": [
      "Depo reyonlarındaki tüm ürün barkodlarını el terminaliyle okutarak fiili adetleri kaydet",
      "Son kullanma tarihi yaklaşan ürünleri FIFO kuralına göre ön raflara ve promosyon alanına çek",
      "Sistem stoğu ile fiili sayım arasındaki eksi/artı farkları (envanter sayım farkı) listele",
      "Hasarlı ve kırık ürünler için Fire/Zayi Tutanağı düzenleyerek muhasebe stok düşümünü yap"
    ]
  },
  {
    "id": "ticaret_b2b_satis_teklifi_opsiyon_suresi_ve_iskonto_matrisi",
    "category": "is_kariyer",
    "domain": "TICARET",
    "keywords": [
      "b2b satış teklif formu opsiyon",
      "fiyat teklifi geçerlilik süresi 15 gün",
      "kademeli iskonto matrisi vade farkı",
      "müşteri cari hesap kredi limiti dbs",
      "teklif onay ve satış sözleşmesi"
    ],
    "baslik": "Kurumsal Satış: B2B Fiyat Teklifi, Opsiyon Süresi & İskonto Matrisi",
    "ikon": "💼",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Müşteri Talebini İzleyen 24 Saat İçinde",
    "hazirlikZamani": "Maliyet Analiz Tablosu, Stok Miktarları & Kur Riski Hesap Cetveli",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🏪 Döviz kuru ve hammadde dalgalanmalarına karşı B2B tekliflerine mutlaka azami 7-15 günlük opsiyon süresi konulmalı ve müşterinin DBS kredi limiti kontrol edilmelidir.",
    "oncedenYapilacaklar": [
      "Müşterinin talep ettiği ürün hacmine göre kademeli iskonto oranını ve brüt kâr marjını hesapla",
      "Teklif formuna net teslim süresi, nakliye şartı (Incoterms) ve ödeme vadesini (30/60/90 gün) açıkça yaz",
      "Teklifin geçerlilik süresini (opsiyon) belirterek olası hammadde zamlarından korun",
      "Kurumsal müşteriye PDF formatında teklifi ileterek 48 saat sonra sıcak takip (follow-up) araması planla"
    ]
  },
  {
    "id": "ticaret_garanti_belgesi_ve_ayipli_mal_iade_degisim_sureci",
    "category": "resmi",
    "domain": "TICARET",
    "keywords": [
      "6502 sayılı tüketici kanunu ayıplı mal",
      "garanti belgesi 2 yıl zorunluluğu",
      "tüketici seçimlik hakları iade değişim",
      "tüketici hakem heyeti savunma dilekçesi",
      "servis azami tamir süresi 20 iş günü"
    ],
    "baslik": "Müşteri Hizmetleri: 6502 Ayıplı Mal İadesi, 20 Günlük Servis Süresi & THH",
    "ikon": "🔄",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Müşteri Arıza / İade Talebinde Bulunduğu Gün",
    "hazirlikZamani": "Fatura Sureti, Garanti Belgesi, Servis Giriş Fişi & İade Formu",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🏪 6502 sayılı Kanun gereğince teslimden itibaren 6 ay içinde ortaya çıkan ayıpların teslim anında var olduğu kabul edilir; yetkili serviste azami tamir süresi 20 iş günüdür.",
    "oncedenYapilacaklar": [
      "Müşterinin fatura ve garanti belgesini sistemden sorgulayarak 2 yıllık yasal garanti süresini teyit et",
      "Ürünü yetkili teknik servise sevk ederek arızanın kullanıcı hatası mı yoksa fabrikasyon kusur mu olduğunu tespit ettir",
      "20 iş günü içinde tamir edilemeyen ürün için müşteriye bedel iadesi veya birebir sıfır ürün değişimi teklif et",
      "Tüketici Hakem Heyetine (THH) yansıyan uyuşmazlıklarda 15 günlük yasal süre içinde savunma ve servis raporunu sisteme yükle"
    ]
  },
  {
    "id": "denizcilik_marpol_annex_vi_vlsfo_yakit_bdn_ve_muhurlu_numune",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "marpol annex 6 vlsfo yakıt bdn numune",
      "bunker delivery note bdn 3 yıl saklama",
      "yakıt kükürt oranı yüzde 0.50 marpol",
      "marpol örnek yakıt mühürleme",
      "gemi yakıt ikmali bunker tutanağı"
    ],
    "baslik": "MARPOL Konvansiyonu: Annex VI Düşük Kükürtlü Yakıt (VLSFO) & BDN Numunesi",
    "ikon": "⛽",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yakıt İkmali (Bunkering) Sırasında ve Liman Çıkışında",
    "hazirlikZamani": "MARPOL Onaylı Damla Numune Alma Cihazı, Mühürlü Numune Şişeleri & BDN Belgesi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚓ MARPOL Annex VI gereği açık deniz yakıtlarında kükürt oranı azami %0.50 olmalıdır; Bunker Delivery Note (BDN) ve mühürlü yakıt numunesi gemide 3 yıl boyunca saklanmak zorundadır.",
    "oncedenYapilacaklar": [
      "Bunker Delivery Note (BDN) belgesindeki kükürt oranının %0.50 sınırını aşmadığını doğrula",
      "Yakıt ikmal manifoldundan sürekli damla yöntemiyle alınan MARPOL mühürlü numuneyi bunker barç yetkilisiyle imzala",
      "Gemi Yağ Kayıt Defterine (Oil Record Book Part I) ikmal edilen tonajı, tank numaralarını ve BDN numarasını işle",
      "Liman Devleti Denetimi (PSC) kontrollerine sunulmak üzere numuneyi mühürlü dolapta muhafaza et"
    ]
  },
  {
    "id": "denizcilik_solas_can_filikasi_ve_yangin_acil_durum_talimi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "solas can filikası ve yangın talimi",
      "lifeboat drill solas 1 ay kuralı",
      "gemi terk talimi jurnal kayıt",
      "filika matafora kanca bırakma testi",
      "solas bölüm iii can kurtarma araçları"
    ],
    "baslik": "SOLAS Konvansiyonu: Can Filikası İndirme, Yangın Talimi & Jurnal Kaydı",
    "ikon": "🦺",
    "renk": "#FED7AA",
    "varsayilanZaman": "Ayda En Az 1 Kez ve Mürettebatın %25'i Değiştiğinde 24 Saat İçinde",
    "hazirlikZamani": "Can Yelekleri, Daldırma Giysileri (Immersion Suit), Filika Mataforaları & Gemi Jurnali",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚓ SOLAS Bölüm III uyarınca tüm mürettebat her ay en az 1 kez can filikası ve yangın talimine katılmalıdır; filikalar 3 ayda bir suya indirilip manevra motoru test edilmelidir.",
    "oncedenYapilacaklar": [
      "Genel acil durum alarmını (7 kısa 1 uzun düdük) çalarak mürettebatın toplanma istasyonunda (Muster Station) yoklamasını al",
      "Can filikası matafora kilitlerini açıp filikayı borda seviyesine indir ve motoru çalıştır",
      "Yangın timinin SCBA solunum tüplerini kuşanarak nozul basınç testini uygulamasını sağla",
      "Talim senaryosunu, başlangıç/bitiş saatini ve katılımcı listesini Resmi Gemi Jurnaline (Logbook) kaydet"
    ]
  },
  {
    "id": "denizcilik_bwm_konvansiyonu_d2_aritma_ve_balast_kayit_defteri",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "balast suyu yönetimi bwm d2 standart",
      "bwts uv filtre çalışma kayıt",
      "balast suyu değişim jurnali bwrb",
      "liman öncesi balast arıtma deşarj",
      "balast suyu yönetim planı bwmp"
    ],
    "baslik": "Deniz Çevresi: BWM D-2 Balast Suyu Arıtma Sistemi & BWRB Kayıt Defteri",
    "ikon": "🌊",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Limana Giriş Öncesinde / Balast Operasyonunda",
    "hazirlikZamani": "Balast Suyu Arıtma Sistemi (BWTS - UV/Elektroklorinasyon), Akışmetre & BWRB Defteri",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚓ BWM Konvansiyonu D-2 biyolojik standardına göre liman sularına basılan balast suyu onaylı BWTS arıtma sisteminden geçmek ve Balast Kayıt Defterine (BWRB) koordinatlarıyla yazılmak zorundadır.",
    "oncedenYapilacaklar": [
      "Balast basma operasyonunda BWTS sisteminin UV lamba dozu ve nötralizasyon sensörlerinin devrede olduğunu doğrula",
      "Alınan ve basılan balast suyunun miktarını, tarihini, saatini ve coğrafi koordinatlarını BWRB defterine kaydet",
      "Arıtılmamış balast suyunun acil durum by-pass vanasının mühürlü olduğunu kontrol et",
      "Varış limanı PSC denetçisine sunulmak üzere Balast Suyu Yönetim Planını ve log çıktısını hazırla"
    ]
  },
  {
    "id": "denizcilik_ecdis_seyir_plani_ukc_ve_emniyet_konturu_safety_depth",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "ecdis seyir planı kedi ukc hesap",
      "under keel clearance ukc draft sığ su",
      "ecdis güvenlik konturu safety depth",
      "vardiya zabiti geçiş planı passage plan",
      "elektronik harita enc güncelleme"
    ],
    "baslik": "Seyir Güvenliği: ECDIS Geçiş Planı (Passage Plan) & UKC Omurga Emniyet Payı",
    "ikon": "🧭",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Limandan Kalkıştan Önce / Seyir Vardiyası Öncesinde",
    "hazirlikZamani": "Güncel ENC Elektronik Haritalar, Gel-Git Tabloları & Kaptanın Seyir Talimatı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚓ ECDIS üzerinde Safety Contour (Emniyet Konturu) dinamik draft ve UKC payına göre ayarlanmalıdır; omurga altı emniyet payı (UKC) sığ sularda statik draftın %10'unun altına düşemez.",
    "oncedenYapilacaklar": [
      "Kalkış draftı, squat (hıza bağlı çökelme) ve gel-git yüksekliğini hesaplayarak kritik sığlıklarda UKC'yi belirle",
      "ECDIS cihazında Safety Depth ve Safety Contour derinlik parametrelerini ayarla",
      "Seyir rotası üzerindeki sığlık, batık ve yasaklı sahaları kapsayan rota güvenlik kontrolünü (Check Route) çalıştır",
      "Kaptanın onayladığı Voyage Passage Plan dosyasını tüm vardiya zabitlerine imzalatarak köprüüstünde hazır tut"
    ]
  },
  {
    "id": "denizcilik_ism_kodu_dpa_ic_denetimi_ve_sms_uygunsuzluk_car",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "gemi ism kodu dpa iç denetim",
      "designated person ashore dpa denetim",
      "ism sms uygunsuzluk raporu car",
      "gemi emniyetli yönetim sertifikası smc",
      "solas bölüm ix ism kodu denetim"
    ],
    "baslik": "Uluslararası Emniyet Yönetimi: ISM Kodu DPA İç Denetimi & SMS Uygunsuzluğu",
    "ikon": "⚓",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Yıllık Şirket İçi ISM Denetim Döneminde",
    "hazirlikZamani": "Emniyetli Yönetim Sistemi (SMS) El Kitapları, PMS Bakım Kayıtları & Denetim Soru Listesi",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚓ ISM Kodu gereğince Karadaki Emniyet Temsilcisi (DPA) gemideki SMS sistemini yılda en az 1 kez denetler; kapatılmayan majör uygunsuzluklar Emniyetli Yönetim Sertifikasının (SMC) iptaline yol açar.",
    "oncedenYapilacaklar": [
      "DPA ile birlikte köprüüstü, makine dairesi ve güverte emniyet prosedürlerinin SMS'e uygunluğunu denetle",
      "Planlı Bakım Sistemindeki (PMS) kritik ekipmanların (dümen motoru, acil jeneratör) test kayıtlarını incele",
      "Tespit edilen aksaklıklar için Düzeltici Faaliyet Talebi (CAR - Corrective Action Request) aç",
      "İç Denetim Raporunu tamamlayarak Şirket Uygunluk Belgesi (DOC) ve SMC sertifikasyon dosyasında muhafaza et"
    ]
  },
  {
    "id": "gumruk_bilge_sistemi_kirmizi_hat_fiziki_muayene_ve_tespit",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "gümrük beyannamesi kırmızı hat muayene",
      "bilge sistemi kırmızı hat fiziki muayene",
      "gümrük muayene memuru tam tespit",
      "ithalat eşyası numune alma kırmızı hat",
      "antrepo konteyner açma tutanağı"
    ],
    "baslik": "Gümrük Mevzuatı: BİLGE Kırmızı Hat Fiziki Muayene & Tam Tespit",
    "ikon": "🔍",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Beyanname Kırmızı Hatta Yönlendirildiğinde (Mesai Başlangıcı)",
    "hazirlikZamani": "Tescilli Gümrük Beyannamesi, Orijinal Fatura, Konşimento & Antrepo Giriş Fişi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "🏢 BİLGE sisteminde kırmızı hatta düşen eşya muayene memuru refakatinde fiziki olarak açılır; beyan harici fazla kap veya farklı GTİP çıkması Kaçakçılık Kanunu (5607) suçu doğurur.",
    "oncedenYapilacaklar": [
      "Gümrük muayene memuru ile randevulaşarak antrepodaki konteyner mührünü memur huzurunda açtır",
      "Eşyanın marka, model, seri numarası, menşe ülkesi ve GTİP tarife pozisyonunu fiziki eşyayla karşılaştır",
      "Laboratuvar tahlili gereken kimyevi ve tekstil ürünlerinden mühürlü resmi numune alınmasını sağla",
      "Muayene memurunun sisteme \"Tam Tespit Yapılmıştır - Beyana Uygundur\" meşruhatını düşmesini takip et"
    ]
  },
  {
    "id": "gumruk_diib_dahilde_isleme_izin_belgesi_kapatma_ve_teminat",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "di̇i̇b dahilde işleme izin belgesi kapatma",
      "diib hammadde ithalat ihracat taahhüt",
      "ticaret bakanlığı diib teminat çözüm",
      "dahilde işleme yurt içi alım kapama",
      "ihracat sayılan satış ve teslimler"
    ],
    "baslik": "Dış Ticaret Teşvikleri: DİİB Kapatma Müracaatı & Gümrük Teminatının Çözümü",
    "ikon": "🏭",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Belge Süresi Bitiminden İtibaren En Geç 3 Ay İçinde",
    "hazirlikZamani": "DİİB İthalat/İhracat Listeleri, Gümrük Çıkış Beyannameleri (GÇB) & YMM İnceleme Raporu",
    "hazirlikSaatOncesi": 72,
    "akilliFisilti": "🏢 Dahilde İşleme İzin Belgesi (DİİB) kapsamında gümrüksüz ithal edilen hammadde mamule dönüştürülüp ihraç edilmeden belge kapatılamaz; taahhüt açığında vergi 2 katı cezayla tahsil edilir.",
    "oncedenYapilacaklar": [
      "Gümrük Çıkış Beyannameleri (GÇB) üzerindeki DİİB satır kodları ile fiili ihracat tutarlarını eşleştir",
      "Kullanılan hammadde sarfiyatını Kapasite Raporundaki fire oranlarıyla uyumlu olarak hesapla",
      "Ticaret Bakanlığı Bölge Müdürlüğüne elektronik ortamda Belge Kapatma Müracaatını yap",
      "Kapatma yazısını ilgili Gümrük Müdürlüğüne ibraz ederek bloke edilen banka teminat mektubunu iade al"
    ]
  },
  {
    "id": "gumruk_ucp600_akreditif_rezerv_giderme_ve_vesaik_duzeltme",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "akreditif rezerv uyarısı ucp 600",
      "lc akreditif vesaik tutarsızlığı rezerv",
      "ucp 600 konşimento fatura uyuşmazlığı",
      "rezerv kaldırma amir banka teleks",
      "akreditifli ödeme vesaik ibraz süresi"
    ],
    "baslik": "Uluslararası Ticaret Finansmanı: UCP 600 Akreditif (L/C) Rezerv Çözümü",
    "ikon": "💳",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Amir Bankadan Rezerv Bildirimi Geldiği Gün İçinde",
    "hazirlikZamani": "Orijinal Akreditif Metni (MT700), Konşimento (B/L), Menşe Şahadetnamesi & Düzeltme Yazısı",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🏢 ICC UCP 600 kurallarına göre vesaikler akreditif şartlarıyla harfiyen uyuşmalıdır (Strict Compliance); tek bir harf veya tarih tutarsızlığı bankaya ödeme reddi (rezerv) hakkı verir.",
    "oncedenYapilacaklar": [
      "Amir bankanın Swift MT734 mesajındaki rezerv bildirim gerekçelerini (örn. Geç yükleme, konşimento meşruhatı) incele",
      "Düzeltilebilir belgeleri (Fatura, Çeki Listesi, Menşe Şahadetnamesi) akreditif metnine birebir uyarlayarak yeniden düzenle",
      "İthalatçı (Alıcı) firma ile temasa geçerek bankasına \"Rezerv Kabul Onayı\" teleksini çekmesini sağla",
      "Vesaik ibraz süresi (konşimento tarihinden itibaren 21 gün) aşılmadan düzeltilmiş nüshaları bankaya teslim et"
    ]
  },
  {
    "id": "gumruk_a_tipi_genel_antrepo_fiziki_stok_sayimi_ve_kolasasyon",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "antrepo sayımı ve stok mutabakatı",
      "a tipi genel antrepo gümrük sayım",
      "antrepo defteri stok fiziki eşleşme",
      "gümrük denetmeni antrepo kolaşasyon",
      "antrepo kaçak zayi cezası"
    ],
    "baslik": "Gümrük Lojistiği: A Tipi Genel Antrepo Stok Mutabakatı & Kolaşasyon",
    "ikon": "📦",
    "renk": "#E0F2FE",
    "varsayilanZaman": "6 Aylık Dönem Sonu ve Yetkilendirilmiş Gümrük Müşaviri (YGM) Sayımında",
    "hazirlikZamani": "Antrepo Stok Defteri (BİLGE), Barkod Terminali & YGM Tespit Raporu Formu",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "🏢 Gümrük Kanunu m. 236 uyarınca antrepoda kayıtsız noksan çıkan eşya gümrükten kaçırılmış sayılarak 3 kat vergi cezası kesilir; fazlalık çıkan eşya ise tasfiyeye alınır.",
    "oncedenYapilacaklar": [
      "BİLGE sistemindeki antrepo giriş beyannameleri ile fiili antrepo stok adreslerini satır satır kolaşasyon yap",
      "Kırık, hasarlı veya ambalajı yırtık kaplar için gümrük muhafaza memuru nezaretinde Hasar Tespit Tutanağı düzenle",
      "YGM (Yetkilendirilmiş Gümrük Müşaviri) refakatinde altı aylık AN6 Stok Tespit Raporunu tanzim et",
      "Gümrük Müdürlüğü Denetim Şubesine onaylı stok mutabakat raporunu sun"
    ]
  },
  {
    "id": "gumruk_yetkilendirilmis_yukumlu_statusu_yys_yesil_hat_denetimi",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "yys yetkilendirilmiş yükümlü statüsü",
      "aeo yetkilendirilmiş yükümlü öztüketim",
      "yeşil hat otomatik geçiş yys",
      "yys yıllık faaliyet raporu güvenlik",
      "gümrükte yerinde gümrükleme izni"
    ],
    "baslik": "Gümrük Güvenliği: YYS (Yetkilendirilmiş Yükümlü) Yeşil Hat İç Denetimi",
    "ikon": "🛡️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıllık YYS Öz Değerlendirme ve Emniyet Denetiminde",
    "hazirlikZamani": "YYS Güvenlik Soru Formu, Tesis Kamera Arşivi (90 Gün), Biyometrik Giriş Logları & Eğitim Dosyaları",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "🏢 YYS sertifikası firmalara Yeşil Hat (muayenesiz doğrudan ithalat/ihracat) hakkı tanır; tesis çevre güvenliği ve ISO 27001 bilgi güvenliği şartlarının ihlali statünün askıya alınmasına yol açar.",
    "oncedenYapilacaklar": [
      "Fabrika çevre tel örgüleri, aydınlatma ve 7/24 güvenlik kamera kayıtlarının 90 gün saklandığını teyit et",
      "Yeşil hat kapsamında yerinde gümrükleme yapılan tırların mühürleme ve çıkış kontrol prosedürlerini denetle",
      "Tüm dış ticaret personelinin YYS Kaçakçılık ve Güvenlik Farkındalık eğitim sertifikalarını güncelle",
      "Ticaret Bakanlığı Rehberlik ve Teftiş Başkanlığına yıllık YYS Faaliyet Raporunu sun"
    ]
  },
  {
    "id": "ticaret_restoran_yag_tutucu_atik_yag",
    "category": "is_kariyer",
    "domain": "TICARET",
    "keywords": [
      "yağ tutucu temizliği",
      "bitkisel atık yağ",
      "restoran kanalizasyon koku",
      "atık yağ ulusal kayıt"
    ],
    "baslik": "Restoran Mutfak Yağ Tutucu & Bitkisel Atık Yağ Kaydı",
    "ikon": "🍳",
    "renk": "#FED7AA",
    "varsayilanZaman": "Haftalık / Lisanslı Toplama",
    "akilliFisilti": "👨‍🍳 Kızartma yağları asla lavaboya dökülemez; yağ tutucu periyodik temizlenip atık yağ lisanslı firmaya teslim edilir.",
    "oncedenYapilacaklar": [
      "Mutfak ana giderindeki paslanmaz yağ tutucu haznesinde biriken donmuş yağ katmanını sıyırarak temizle",
      "Fritöz kızartma yağının Polar Madde oranını (%TPM) test cihazıyla ölç; %25’i geçen yağı kullanımdan çıkar",
      "Kullanılmış bitkisel atık yağları mavi lisanslı sızdırmaz varillerde biriktir",
      "Çevre Bakanlığı MOTAT sistemi üzerinden lisanslı geri kazanım firmasına teslim edip \"Atık Taşıma Formu\"nu arşivle"
    ]
  },
  {
    "id": "ticaret_magaza_barkod_fiyat_etiket_yonetmeligi",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "fiyat etiketi yönetmeliği",
      "kasa raf fiyat farkı",
      "ürün etiket zorunlu bilgi",
      "yerli üretim logosu"
    ],
    "baslik": "Fiyat Etiketi Yönetmeliği & Raf-Kasa Fiyat Uyumu",
    "ikon": "🏷️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sabah Açılış / Fiyat Değişimi",
    "akilliFisilti": "🧾 Raf fiyatı ile kasa fiyatı arasında fark olursa tüketici lehine olan düşük fiyat uygulanmak zorundadır.",
    "oncedenYapilacaklar": [
      "Tüm ürün etiketlerinde malın satış fiyatı, birim fiyatı (TL/kg, TL/Litre), menşei ve Yerli Üretim logosunu kontrol et",
      "ERP sisteminde yapılan fiyat artışlarında el terminaliyle anında yeni raf etiketi basıp eski etiketi değiştir",
      "Kasa POS sistemi ile reyon raf barkodlarını rastgele 20 üründe okutarak sıfır hata mutabakatı yap",
      "Ticaret Bakanlığı / Belediye Zabıta denetim tutanağı riskine karşı etiket fiyatı değişim tarihlerini logla"
    ]
  },
  {
    "id": "ticaret_e_ticaret_pazaryeri_komisyon_mutabakati",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "pazaryeri komisyon mutabakatı",
      "trendyol hepsiburada hakediş",
      "kargo kesintisi mutabakat",
      "pazaryeri fatura"
    ],
    "baslik": "E-Ticaret Pazaryeri Hakediş, Komisyon & Kargo Kesintisi",
    "ikon": "📦",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Haftalık Hakediş Günü",
    "akilliFisilti": "💼 Pazaryeri hakediş ödemelerinde kesilen komisyon, kargo barem aşımı ve reklam faturaları sipariş bazında eşleştirilir.",
    "oncedenYapilacaklar": [
      "Pazaryeri finans panelinden haftalık ödeme ve kesinti Excel dökümünü (Hakediş Raporu) indir",
      "Kargo desi barem aşımı cezalarını ve iade kargo maliyetlerini fiili sevk irsaliyeleriyle karşılaştır",
      "Pazaryeri tarafından şirket adına kesilen komisyon ve hizmet faturalarını 740/760 gider hesaplarına işle",
      "Banka hesabına yatan net nakit tutar ile cari hesap mutabakatını tamamlayıp varsa itiraz biletlerini 7 gün içinde aç"
    ]
  },
  {
    "id": "ticaret_depo_raf_statik_periyodik_kontrol_en15635",
    "category": "is_kariyer",
    "domain": "TICARET",
    "keywords": [
      "depo raf kontrolü",
      "en 15635",
      "endüstriyel raf hasarı",
      "raf yeşil sarı kırmızı etiket"
    ],
    "baslik": "TS EN 15635 Depo Ağır Yük Raf Sistemleri Muayenesi",
    "ikon": "🏢",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Haftalık Görsel / Yıllık Uzman Kontrol",
    "akilliFisilti": "🏢 Forklift çarpmalarında raf ayaklarındaki 3 mm üzerindeki eğilmeler kırmızı alarm kabul edilir ve boşaltılır.",
    "oncedenYapilacaklar": [
      "Raf ayak koruyucularını ve dikme profillerini şakül/cetvel ile eğilme ve burulma yönünden kontrol et",
      "Travers emniyet pimlerinin (Safety Pin) her iki uçta da takılı olduğunu ve düşmediğini doğrula",
      "Her kat traversi üzerindeki azami yük taşıma kapasite etiketlerinin (SWL - Safe Working Load) görünürlüğünü teyit et",
      "Hasar derecesine göre Yeşil (İzle), Sarı (4 haftada onar) veya Kırmızı (Derhal boşalt) etiketini rafa yapıştır"
    ]
  },
  {
    "id": "ticaret_pos_cihaz_gun_sonu_bloke_cozum",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "pos gün sonu alma",
      "pos bloke çözüm",
      "kredi kartı takas banka",
      "pos slip toplamı"
    ],
    "baslik": "Banka POS Cihazı Gün Sonu & Bloke Çözüm Takibi",
    "ikon": "💳",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Gece Kapanış Öncesi",
    "akilliFisilti": "🧾 POS cihazından gün sonu alınmadığı takdirde işlemler takasa iletilemez ve hesaplara bloke girişi gecikir.",
    "oncedenYapilacaklar": [
      "İşletmedeki tüm sabit ve mobil fiziki POS cihazlarından sırayla \"Gün Sonu / Kapanış\" raporu al",
      "POS gün sonu slip toplamlarını (Tek Çekim / Taksitli) muhasebe kasa defteri satış kayıtlarıyla eşleştir",
      "Banka üye işyeri portalına girerek işlemlerin ertesi gün veya blokeli valör tarihini (Örn: 28 gün / 35 gün) teyit et",
      "Slip rulosu azalan cihazlara orijinal termal rulo tak ve iletişim hatası veren cihazları yeniden başlat"
    ]
  },
  {
    "id": "deniz_draft_survey_deplasman_hesabi",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "draft survey hesabı",
      "gemi draft okuma",
      "deplasman hesabı kargo",
      "gemi trim list hydrostatik"
    ],
    "baslik": "Gemi Kargo Yükleme/Tahliye Öncesi Draft Survey Hesabı",
    "ikon": "⚓",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Yanaşma Sonrası / Kalkış Öncesi",
    "akilliFisilti": "⚓ Baş, kıç ve vasat draftlar iskele-sancak okunup deniz suyu yoğunluğu hidrometreyle ölçülerek yük miktarı hesaplanır.",
    "oncedenYapilacaklar": [
      "Gemi bordasından Baş, Kıç ve Vasat (İskele/Sancak) olmak üzere toplam 6 noktadan draft değerlerini milimetrik oku",
      "Deniz suyu numunesi alarak kalibre refraktometre/hidrometre ile suyun fiili yoğunluğunu (Density) ölç",
      "Draft değerlerini trim, eğilme (Hogging/Sagging) ve deformasyon düzeltmeleriyle ortalama drafta (Quarter Mean Draft) indirge",
      "Geminin stabilite ve hidrostatik cetvelinden (Hydrostatic Tables) deplasmanı çıkararak yük ağırlığı mutabakatını imzala"
    ]
  },
  {
    "id": "deniz_psc_paris_mou_liman_denetimi",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "psc liman denetimi",
      "paris mou psc",
      "liman devleti kontrolü",
      "gemi tutulma detaining"
    ],
    "baslik": "Paris MoU / Liman Devleti Denetimi (PSC) Hazırlığı",
    "ikon": "⚓",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Limana Yanaşmadan 24 Saat Önce",
    "akilliFisilti": "⚓ PSC denetiminde eksiklik (Deficiency) çıkmaması için acil durum yangın pompası, filika ve OWS test edilir.",
    "oncedenYapilacaklar": [
      "Acil yangın pompasını (Emergency Fire Pump) ve dümen dairesi acil yekesini (Emergency Steering) çalıştır",
      "Sintine Yağ Ayırıcısının (OWS 15 ppm) 3 yollu otomatik geri dönüş valfini ve alarmını test et",
      "Gemi zabitanının STCW sertifikalarını, Gemi Sağlık Cüzdanlarını ve SOLAS talim kayıtlarını klasörle hazırla",
      "Köprüüstü seyir fenerlerinin, manyetik pusula sapma tablosunun ve güncel seyir haritalarının eksiksiz olduğunu teyit et"
    ]
  },
  {
    "id": "deniz_sintine_yag_kayit_defteri_orb",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "oil record book",
      "orb kısım 1 makine",
      "sintine basma 15 ppm",
      "marpol yağ kayıt defteri"
    ],
    "baslik": "MARPOL Annex I Petrol/Yağ Kayıt Defteri (Oil Record Book Part I)",
    "ikon": "📖",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Her Sintine/Sludge Transferi Sonrası",
    "akilliFisilti": "⚓ Yağ Kayıt Defterine (ORB) yapılan tüm kayıtlar Başmühendis ve Kaptan tarafından silintisiz imzalanır.",
    "oncedenYapilacaklar": [
      "Sintine suyu veya slaç yakma (İnsineratör) işlemi öncesi tank seviyelerini iskandil metreyle ölç",
      "İşlem tamamlandığında harfi ve madde kodunu (Örn: Code C, Code D) uluslararası standart formatta yaz",
      "Denize 15 ppm ayırıcıyla tahliye yapılmışsa geminin GPS enlem/boylam koordinatlarını ve gemi hızını kaydet",
      "Her sayfa dolduğunda Gemi Kaptanı tarafından resmi mühür ve ıslak imza ile kapatıldığını doğrula"
    ]
  },
  {
    "id": "deniz_bogaz_gecisi_vts_sp1_sp2_raporu",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "istanbul boğazı geçişi",
      "vts sp1 raporu",
      "türk boğazları tss",
      "kılavuz kaptan çarmıhı"
    ],
    "baslik": "Türk Boğazları VTS Geçişi (SP1, SP2 Raporu) & Kılavuz Alma",
    "ikon": "🚢",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Girişten 24 & 2 Saat Önce",
    "akilliFisilti": "⚓ Boğaz girişinden 24 saat önce SP1, giriş hattına 2 saat kala VHF Kanal 16/11 üzerinden SP2 raporu verilir.",
    "oncedenYapilacaklar": [
      "VTS Merkezine geminin boyu, draftı, yük tipi ve manevra kabiliyetini içeren SP1 formunu ilet",
      "Giriş noktasına 20 mil kala VHF Kanal 11/12/13/14 üzerinden Sektör Merkezine SP2 mevki raporu ver",
      "Kılavuz kaptan (Pilot) çarmıhını SOLAS kurallarına göre (Su seviyesinden 1.5-2 metre yukarıda) bordaya donat",
      "Ana makineyi manevra devrine al, çift dümen motorunu devreye sok ve pruva demirini funda etmeye hazır tut"
    ]
  },
  {
    "id": "deniz_gemide_kapali_mahal_giris_enclosed_space",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "kapalı mahal giriş izni",
      "gemi zincirlik tank giriş",
      "oksijen ölçümü gemi tank",
      "enclosed space permit"
    ],
    "baslik": "Gemide Kapalı Mahale (Zincirlik, Çift Dip, Balast Tankı) Giriş İzni",
    "ikon": "🤿",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Girişten 1 Saat Önce",
    "akilliFisilti": "⚓ Balast tankı ve zincirliğe girmeden önce en az 24 saat cebri havalandırma yapılır ve O₂ %20.9 ölçülür.",
    "oncedenYapilacaklar": [
      "Tank menhol kapaklarını açıp patlamaya dayanıklı fanlarla (Blower) sürekli temiz hava bas",
      "Çoklu gaz dedektörü ile dip ve orta seviyelerde Oksijen (%20.9), Yanıcı Gaz (%0 LEL), H₂S ve CO ölç",
      "Gemi Kaptanı veya 2. Kaptan onaylı \"Kapalı Mahale Giriş İzin Belgesi (Enclosed Space Permit)\" düzenle",
      "Menhol başında SCBA solunum seti ve kurtarma halatıyla nöbetçi zabit beklet; her 10 dakikada bir telsiz teyidi al"
    ]
  },
  {
    "id": "gumruk_antrepo_an9_devir_beyannamesi",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "antrepoda mal devri",
      "an9 devir faturası",
      "antrepo devir beyannamesi",
      "gümrüklü mal satışı"
    ],
    "baslik": "Gümrüklü Antrepoda Eşya Devri (AN9) & Fatura Mutabakatı",
    "ikon": "🏢",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Devir Anlaşması Günü",
    "akilliFisilti": "💼 Antrepoda bulunan eşyanın devrinde devreden ve devralan adına AN9 devir beyannamesi tescil edilir.",
    "oncedenYapilacaklar": [
      "Devreden firma tarafından devralan firmaya KDV’siz (Gümrük Kanunu m. 16) antrepo içi devir faturası tanzim et",
      "BİLGE sisteminden AN9 rejim kodlu antrepo devir beyannamesini girip Yetkilendirilmiş Gümrük Müşaviri (YGM) onayına sun",
      "Devralan firmanın 30 gün içinde eşyayı yeni bir rejime (İthalat, transit, yeni antrepo) tabi tutmasını izle",
      "Antrepo işleticisine devir onay yazısını ileterek stok kartındaki alıcı unvanını güncelle"
    ]
  },
  {
    "id": "gumruk_menşe_ispati_eur1_atr_med",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "atr belgesi onayı",
      "eur1 dolaşım belgesi",
      "pan avrupa akdeniz menşe",
      "menşe şahadetnamesi ticaret odası"
    ],
    "baslik": "A.TR / EUR.1 / EUR-MED Dolaşım Belgesi & Menşe İspatı",
    "ikon": "📜",
    "renk": "#E0E7FF",
    "varsayilanZaman": "İhracat GÇB Tescili Öncesi",
    "akilliFisilti": "💼 AB ülkelerine sanayi ürünü ihracatında A.TR; Serbest Ticaret Anlaşmalı ülkelere EUR.1 belgesi düzenlenir.",
    "oncedenYapilacaklar": [
      "İhraç edilecek ürünün GTİP numarasına göre hedef ülkenin tercihli ticaret anlaşmasını (Gümrük Birliği / STA) kontrol et",
      "Üretici firmadan Türk Menşeli olduğuna dair Menşe Kriteri (Wholly Obtained / Yeterli İşçilik) formunu temin et",
      "MEDOS sistemi üzerinden A.TR veya EUR.1 belgesi başvurusunu yapıp Ticaret Odası elektronik onayını al",
      "Gümrük memuru e-İmza vizesi ile onaylanan dolaşım belgesini orijinal ihracat vesaikine ekle"
    ]
  },
  {
    "id": "gumruk_tareks_guvenlik_denetimi_ithalat",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "tareks başvurusu",
      "ithalat ürün denetimi",
      "tse tareks muafiyet",
      "ce işareti teknik dosya"
    ],
    "baslik": "Ticaret Bakanlığı TAREKS Ürün Güvenliği Denetimi",
    "ikon": "🔍",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Gümrük Beyanından Önce",
    "akilliFisilti": "💼 CE işaretli makineler, oyuncaklar ve tekstil ürünleri gümrükten çekilmeden önce TAREKS onayından geçer.",
    "oncedenYapilacaklar": [
      "İthal edilecek ürünün CE Uygunluk Beyanını (Declaration of Conformity), test raporlarını ve Türkçe kullanım kılavuzunu topla",
      "Ticaret Bakanlığı TAREKS portalına ürün görselini, etiket fotoğrafını ve teknik dosyasını yükle",
      "Sistemden doğrudan \"03 - Denetleme Kabul\" kodu mu yoksa fiili TSE/Laboratuvar denetimi mi çıktığını sorgula",
      "Fiili denetim çıkarsa numune alma heyeti oluşturup TSE uzmanına antrepoda ürün tespiti yaptır"
    ]
  },
  {
    "id": "gumruk_sonradan_kontrol_gumruk_mufettisi",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "gümrük sonradan kontrol",
      "gümrük müfettişi denetimi",
      "gtip beyan hatası",
      "royalti lisans ücreti gümrük"
    ],
    "baslik": "Gümrük Müfettişi Sonradan Kontrol & Risk Denetimi Hazırlığı",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Geçmiş 3 Yıllık İthalat Evrakı",
    "akilliFisilti": "💼 Sonradan kontrolde royalty/lisans ödemeleri, transfer fiyatlandırması ve GTİP uygunluğu geriye dönük incelenir.",
    "oncedenYapilacaklar": [
      "İncelenecek döneme ait Gümrük Beyannameleri, orijinal üretici faturaları, Swift ödeme dekontları ve konşimentoları eşleştir",
      "Yurtdışı ana firmaya ödenen know-how, marka, patent ve yönetim giderlerinin gümrük kıymetine eklenip eklenmediğini denetle",
      "Eşyaların GTİP tarifelerinin Bağlayıcı Tarife Bilgisi (BTB) ve İzahname fasıl notlarıyla uyumunu teyit et",
      "Olası eksik beyan durumunda Gümrük Kanunu m. 234 cezalarından korunmak için Uzlaşma / Pişmanlık hazırlığı yap"
    ]
  },
  {
    "id": "gumruk_transit_rejimi_t1_t2_ncts",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "ncts t1 beyannamesi",
      "transit ref no mrn",
      "ortak transit sözleşmesi",
      "gümrük transit teminatı"
    ],
    "baslik": "NCTS Ortak Transit Rejimi (T1 / T2) & MRN Kapatma",
    "ikon": "🚛",
    "renk": "#FED7AA",
    "varsayilanZaman": "Sınır / İç Gümrük Çıkışı",
    "akilliFisilti": "💼 Transit rejiminde taşınan eşya için verilen rotaya ve azami sevk süresine (Örn: 48 saat) tam uyulmalıdır.",
    "oncedenYapilacaklar": [
      "Gümrük hareket idaresinden NCTS sistemi üzerinden T1 beyannamesini açıp MRN (Movement Reference Number) takip kodunu al",
      "Araca gümrük memuru refakatinde kurşun/plastik gümrük mührü taktırıp mühür numarasını sisteme işlet",
      "Sürücüye transit güzergahını ve hedef gümrük idaresine varış için tanımlanan yasal süreyi tebliğ et",
      "Varış gümrüğünde tescil ve mühür kontrolü tamamlandıktan sonra teminatın sistemden otomatik çözüldüğünü doğrula"
    ]
  },
  {
    "id": "ticaret_restoran_soguk_hava_deposu_defrost",
    "category": "is_kariyer",
    "domain": "TICARET",
    "keywords": [
      "soğuk hava deposu karlanma",
      "evaporatör defrost rezistansı",
      "et donuk oda -18",
      "soğuk oda kapı rezistansı"
    ],
    "baslik": "Restoran Et/Donuk Oda (-18°C) Defrost & Kapı Rezistansı",
    "ikon": "🥩",
    "renk": "#FED7AA",
    "varsayilanZaman": "Günlük Sıcaklık & Defrost Kontrolü",
    "akilliFisilti": "👨‍🍳 Donuk depoda kapı contası donmaması için çerçeve rezistansı açık olmalı ve günde 4 kez otomatik defrost yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Dijital kontrol ünitesinden oda sıcaklığının -18°C ile -22°C arasında sabit olduğunu ve karlanma durumunu kontrol et",
      "Kapı çerçevesindeki ısıtıcı rezistansın çalıştığını ve kapı contalarının hava sızdırmadığını teyit et",
      "Evaporatör fanlarının defrost sonrasında damlamayı bitirdikten sonra (Drip Time: 3 dk) gecikmeli devreye girdiğini gözlemle",
      "İçeride personelin kilitli kalmasını önleyen fosforlu Acil Kurtarma Butonunu (Push Button) her hafta fiziksel test et"
    ]
  },
  {
    "id": "ticaret_magaza_stok_sayim_rfid_el_terminali",
    "category": "is_kariyer",
    "domain": "TICARET",
    "keywords": [
      "rfid stok sayımı",
      "mağaza envanter sayım açığı",
      "rfid etiket okuma saniyede 500",
      "stok mutabakatı erp"
    ],
    "baslik": "Perakende Mağazacılık RFID Toplu Stok Sayımı",
    "ikon": "📡",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Haftalık / Aylık Kapanış Sonrası",
    "akilliFisilti": "🧾 RFID el terminali ile askıdaki ürünler saniyeler içinde taranarak ERP sistemindeki envanter açığı anında çıkarılır.",
    "oncedenYapilacaklar": [
      "UHF RFID el terminalini mağaza reyonları arasında gezdirerek tüm ürün çiplerini temassız olarak oku",
      "Okunan toplam adet ile ERP mağaza stok kayıtlarını tek tuşla karşılaştır",
      "Eksik veya farklı reyonlara konulmuş ürünleri terminalin sinyal gücü (Geiger Sayacı modu) ile tespit et",
      "Kayıp/çalıntı ürün farklarını \"Mağaza Fire ve Envanter Fark Tutanağı\" ile şirket merkezine raporla"
    ]
  },
  {
    "id": "ticaret_gida_alerjen_etiketleme_14_temel",
    "category": "is_kariyer",
    "domain": "TICARET",
    "keywords": [
      "gıda alerjen uyarısı",
      "14 temel alerjen listesi",
      "menü alerjen tablosu",
      "glüten laktoz fıstık çapraz bulaşma"
    ],
    "baslik": "Türk Gıda Kodeksi 14 Temel Alerjen Menü Yönetimi",
    "ikon": "🌾",
    "renk": "#FED7AA",
    "varsayilanZaman": "Menü Güncelleme / Servis",
    "akilliFisilti": "👨‍🍳 Restoran menüsünde Glüten, Kabuklular, Yumurta, Balık, Fıstık, Soya, Süt gibi 14 alerjen açıkça belirtilmelidir.",
    "oncedenYapilacaklar": [
      "Menüdeki tüm reçetelerin içerik analizini yaparak 14 temel alerjen bileşenini (Koyu/Altı çizili yazı ile) menüye işle",
      "Mutfakta glütensiz ve alerjenik siparişler için ayrı hazırlık tezgahı, bıçak ve kesme tahtası (Çapraz bulaşma engeli) kullan",
      "Servis personeline misafirlerin alerjen sorularına doğru cevap vermesi için reçete içerik kartı eğitimi ver",
      "Paketli ürünlerde \"Eser miktarda fındık/fıstık içerebilir\" ibaresinin etiket üzerinde mevzuata uygunluğunu denetle"
    ]
  },
  {
    "id": "ticaret_kasa_nakit_avans_sahte_para_uv",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "sahte para tespiti uv",
      "manyetik mürekkep para kontrol",
      "kasa devir teslim avans",
      "kasiyer gün ortası tahsilat"
    ],
    "baslik": "Kasa Sahte Para Güvenlik Kontrolü (UV / Manyetik) & Devir",
    "ikon": "💵",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Vardiya Değişimi & Yüksek Tutar",
    "akilliFisilti": "🧾 200 TL ve 100 TL banknotlarda emniyet şeridi, filigran, mikro yazı ve UV parlaması sahte para cihazıyla test edilir.",
    "oncedenYapilacaklar": [
      "Alınan yüksek tutarlı banknotları optik UV ve manyetik mürekkep (MG/IR) dedektöründen geçir",
      "Şüpheli banknot tespitinde parayı müşteriye iade etmeden derhal mağaza müdürüne ve Polise haber ver",
      "Vardiya değişiminde kasadaki nakit, kredi kartı slipleri, yemek kartı toplamları ve avans miktarını sayarak tutanağa bağla",
      "Kasadaki biriken nakit parayı gün ortasında çelik para kasasına aktararak kasa risk limitini aşma"
    ]
  },
  {
    "id": "ticaret_b2b_bayilik_teminat_mektubu_dbs",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "bayi teminat mektubu",
      "doğrudan borçlandırma sistemi dbs",
      "bayi açık hesap kredi limiti",
      "faktoring vadesi"
    ],
    "baslik": "B2B Bayi Ağı Doğrudan Borçlandırma Sistemi (DBS) & Teminat",
    "ikon": "🤝",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Bayi Sözleşmesi / Sipariş Onayı",
    "akilliFisilti": "💼 Bayi mal sevkiyatından önce banka DBS limiti veya kesin/süresiz Teminat Mektubu teyidi alınmalıdır.",
    "oncedenYapilacaklar": [
      "Bayinin bankadaki DBS (Doğrudan Borçlandırma Sistemi) açık kredi limitini ve risk durumunu finans panelinden sorgula",
      "Fiziki teminat mektubu alınmışsa ilgili banka şubesinden mektubun teyit mektubunu (teyit yazısı) yazılı olarak al",
      "Sipariş tutarının bayinin mevcut kullanılabilir teminat limitini aşmadığını ERP üzerinde kontrol et",
      "Vadesi gelen faturaların DBS havuzundan otomatik tahsil edilerek cari hesabın kapatıldığını doğrula"
    ]
  },
  {
    "id": "deniz_ism_kod_safety_management_audit",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "ism kod iç denetim",
      "safety management system sms",
      "dpa kural dışılık non-conformity",
      "smc sertifikası gemi"
    ],
    "baslik": "Uluslararası Güvenli Yönetim (ISM Code) Gemi İçi SMS Denetimi",
    "ikon": "⚓",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Yıllık / Periyodik Denetim",
    "akilliFisilti": "⚓ ISM Kod denetiminde Kaptan ve Zabitanın Emniyetli Yönetim Sistemi (SMS) prosedürlerine hakimiyeti sorgulanır.",
    "oncedenYapilacaklar": [
      "Kritik operasyon checklist’lerinin (Sıcak İş, Kapalı Mahal, Kötü Hava, Demirlenme) eksiksiz imzalandığını incele",
      "Gemi acil durum jeneratörü, filika motoru ve acil dümen talimlerinin SMS takvimine uygun yapıldığını doğrula",
      "Tespit edilen uygunsuzluklar (Non-Conformity) için DPA (Designated Person Ashore) onaylı DÖF formu aç",
      "Gemi Güvenlik Yönetim Sertifikasının (SMC) ve Şirket Uygunluk Belgesinin (DOC) geçerlilik tarihlerini denetle"
    ]
  },
  {
    "id": "deniz_radar_arpa_cpa_tcpa_catisma_onleme",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "arpa radar cpa tcpa",
      "denizde çatışmayı önleme colreg",
      "hedef gemi rota vektörü",
      "radar kör sektör"
    ],
    "baslik": "Köprüüstü ARPA Radar CPA/TCPA & COLREG Çatışma Analizi",
    "ikon": "🚢",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Seyir Vardiyası Boyunca",
    "akilliFisilti": "⚓ ARPA radarda CPA (En Yakın Geçiş Mesafesi: < 1 Deniz Mili) ve TCPA alarmı veren gemiler için derhal rota değiştirilir.",
    "oncedenYapilacaklar": [
      "X-Band ve S-Band radarların deniz ve yağmur paraziti (Sea/Rain Clutter) ayarlarını optimize et",
      "ARPA radar üzerinde tehlikeli yaklaşan tüm AIS/Radar hedeflerini otomatik izlemeye (Target Tracking) al",
      "CPA güvenlik sınırını açık denizde en az 1.5-2.0 deniz mili, dar kanallarda 0.5 deniz mili olarak sabitle",
      "Denizde Çatışmayı Önleme Tüzüğü (COLREG) Kural 15-16 uyarınca \"Yol Veren Tekne\" isen erken ve belirgin rota/hız değişikliği yap"
    ]
  },
  {
    "id": "deniz_ana_makine_kankeyz_patlama_oil_mist",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "oil mist detector omd alarm",
      "karter patlaması ana makine",
      "kankeyz emniyet valfi",
      "yatak sıcaklık artışı"
    ],
    "baslik": "Gemi Ana Makine Yağ Sisi Dedektörü (OMD) & Karter Emniyeti",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "OMD Alarmı Çaldığında",
    "akilliFisilti": "⚓ OMD alarmında ana makine derhal stop edilir; karter kapakları patlama riskine karşı EN AZ 30 DAKİKA AÇILMAZ.",
    "oncedenYapilacaklar": [
      "OMD (Oil Mist Detector) alarmı geldiğinde köprüüstüne haber vererek ana makine devrini düşür ve acil stop et",
      "Karter kapaklarındaki alev tutuculu aşırı basınç tahliye valflerinin sağlamlığını görsel olarak kontrol et",
      "Kartere taze oksijen girip patlamayı (Crankcase Explosion) tetiklememesi için makinenin en az 30-45 dk soğumasını bekle",
      "Soğuma sonrası karter kapaklarını açıp fenerle ana yatak ve kol yataklarında aşırı ısınma (Hotspot/Aşınma) kontrolü yap"
    ]
  },
  {
    "id": "deniz_gemi_demirleme_kaloma_zincir_hesabi",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "demirleme kaloma hesabı",
      "kilit zincir uzunluğu fersah",
      "demir tarama alarmı anchor watch",
      "funda demir vira"
    ],
    "baslik": "Emniyetli Demirleme & Derinliğe Göre Kaloma Zincir Hesabı",
    "ikon": "⚓",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Demirleme Öncesi Hazırlık",
    "akilliFisilti": "⚓ Normal hava şartlarında derinliğin 4-5 katı, fırtınalı havalarda derinliğin 7-10 katı zincir kaloması denize verilir.",
    "oncedenYapilacaklar": [
      "Demir sahası derinliğini iskandilden oku (Örn: 20 metre derinlikte normal havada 4 kilit / 110 metre zincir döşe)",
      "Demir ırgatının hidrolik/elektrik frenini gevşeterek demiri su seviyesine kadar kontrollü (Walk-back) indir",
      "Geminin tornistan hareketiyle birlikte \"Funda Demir\" komutunu vererek zincirin üst üste yığılmadan serilmesini sağla",
      "GPS ve Radarda \"Anchor Watch (Demir Tarama Alarmı)\" çemberi kurarak geminin tarayıp taramadığını kesintisiz izle"
    ]
  },
  {
    "id": "deniz_bunker_yakit_alma_marpol_numune",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "bunker yakıt ikmali checklist",
      "marpol yakıt numunesi damla",
      "bunker delivery note bdn",
      "yakıt taşma scupper tıkacı"
    ],
    "baslik": "Gemi Bunker (Yakıt İkmali) Emniyet Protokolü & MARPOL Numunesi",
    "ikon": "⛽",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Yakıt Hortumu Bağlanmadan Önce",
    "akilliFisilti": "⚓ Güverte frengi delikleri (Scuppers) sızdırmaz tıkaçla kapatılır ve yakıt ikmali boyunca sürekli damla numunesi alınır.",
    "oncedenYapilacaklar": [
      "Gemi ve ikmal barıcı arasında \"Ship-Shore Safety Checklist\" formunu karşılıklı madde madde imzala",
      "Güvertedeki tüm yağmur/su tahliye deliklerini (Scuppers) kauçuk tıkaçlarla kapat ve sintine tepsilerini boşalt",
      "Bunker manifolduna sürekli damla akıtmalı (Continuous Drip Sampler) numune cihazını bağla ve 4 adet MARPOL numune şişesini mühürle",
      "İkmal tamamlandığında barıç kaptanından imzalı ve mühürlü BDN (Bunker Delivery Note) belgesini teslim al"
    ]
  },
  {
    "id": "gumruk_antidamping_ek_mali_yukumluluk",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "dampinge karşı vergi antidumping",
      "ek mali yükümlülük ilave gümrük vergisi",
      "menşe saptırma soruşturması",
      "ticaret savunma araçları"
    ],
    "baslik": "Ticaret Bakanlığı Dampinge Karşı Vergi & İlave Gümrük Vergisi (İGV)",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Maliyet ve Beyan Öncesi",
    "akilliFisilti": "💼 İthal edilecek ürünün menşeine göre %20-80 oranında Dampinge Karşı Vergi ve İGV matraha eklenir.",
    "oncedenYapilacaklar": [
      "İthalat GTİP numarasının İthalat Rejimi Kararı Ek Listelerindeki İlave Gümrük Vergisi (İGV) oranını doğrula",
      "Ürünün menşe ülkesine (Örn: Çin, Hindistan) yönelik yürürlükte bir Dampinge Karşı Kesin Önlem Tebliği olup olmadığını kontrol et",
      "Menşe saptırma şüphesine karşı üretici firmanın fabrika üretim kapasite raporunu ve Ticaret Odası menşe şahadetnamesini dosyala",
      "Gümrük KDV matrahına Gümrük Vergisi, İGV, Damping Vergisi ve KKDF tutarlarını ekleyerek kesin ithalat maliyetini çıkar"
    ]
  },
  {
    "id": "gumruk_dahilde_isleme_diib_sarfiyat_tablosu",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "diib sarfiyat tablosu",
      "hammadde fire oranı eksper",
      "dahilde işleme kapatma müracaatı",
      "ikincil işlem görmüş ürün"
    ],
    "baslik": "DİİB Sarfiyat Tablosu & Kapasite Raporu Fire Oranı Hesabı",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "DİİB Belge Kapatma Aşaması",
    "akilliFisilti": "💼 İthal edilen hammaddenin ihraç edilen mamul bünyesinde kullanımı Sanayi Odası onaylı fire oranlarıyla ispatlanır.",
    "oncedenYapilacaklar": [
      "Sanayi ve Teknoloji İl Müdürlüğü onaylı geçerli Şirket Kapasite Raporundaki standart hammadde kullanım ve fire oranlarını çek",
      "İthal edilen hammadde miktarını ihraç edilen mamul sayısı ve net ağırlığıyla çarparak \"Hammadde Sarfiyat Tablosu\"nu tanzim et",
      "Üretim artığı (Kırpıntı/Cüruf) oluşmuşsa \"İkincil İşlem Görmüş Ürün\" beyanını yaparak gümrük vergisini tahakkuk ettir",
      "E-Birlik portalı üzerinden DİİB kapatma müracaatını tamamlayıp Gümrük İdaresine teminat çözümü yazısı yaz"
    ]
  },
  {
    "id": "gumruk_incoterms_dap_ddp_navlun_sigorta",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "incoterms 2020 dap ddp",
      "teslim şekli gümrük vergisi",
      "cif fob navlun ayrıştırma",
      "ithalat sigorta poliçesi"
    ],
    "baslik": "Incoterms 2020 Teslim Şekilleri & Gümrük Kıymetine Navlun İlavesi",
    "ikon": "🚢",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Fatura ve GÇB Düzenleme",
    "akilliFisilti": "💼 FOB teslimlerde navlun ve sigorta bedeli gümrük kıymetine eklenir; DDP teslimlerde yerel vergiler faturadan düşülür.",
    "oncedenYapilacaklar": [
      "Orijinal ticari faturadaki teslim kuralını (EXW, FOB, CIF, DAP, DDP) ve teslim yerini Incoterms 2020’ye göre teyit et",
      "FOB veya FCA teslimlerde yurtdışı navlun faturasını ve emtia nakliyat sigorta poliçesini gümrük matrahına dahil et",
      "DAP teslimde varış gümrüğüne kadar olan taşıma maliyetlerinin ürün fiyatına dahil olduğunu konşimentodan doğrula",
      "Gümrük Kanunu m. 24 uyarınca satıcının sunduğu iskonto oranlarının gerçek ve şartsız olduğunu beyannameye işle"
    ]
  },
  {
    "id": "gumruk_tasfiye_45_gun_suresi_arastirma",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "gümrük tasfiye süresi 45 gün",
      "antrepoda bekleme süresi aşımı",
      "tasfiyelik eşya gümrük",
      "süre uzatım talebi dilekçe"
    ],
    "baslik": "Gümrük Kanunu m. 46 Tasfiyelik Eşya & 45 Günlük Yasal Süre",
    "ikon": "⏳",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Özet Beyan Sonrası 45 Gün",
    "akilliFisilti": "💼 Denizyoluyla gelen eşya 45 gün, diğer yollarla gelen eşya 20 gün içinde bir gümrük rejimine tabi tutulmazsa tasfiyeye düşer.",
    "oncedenYapilacaklar": [
      "Özet beyan tescil tarihini sistemden sorgulayarak 45 günlük yasal bekleme süresinin dolmasına 10 gün kala alarm kur",
      "Laboratuvar tahlili veya izin belgeleri gecikiyorsa süresi dolmadan Gümrük Müdürlüğüne 30 günlük \"Ek Süre Dilekçesi\" ver",
      "Tasfiyeye kalmış eşya için Tasfiye İşletme Müdürlüğüne (TASİŞ) devredilmeden önce tescil dilekçesi ve ceza yatırarak eşyayı kurtar",
      "Antrepo işleticisine ardiye ve bekleme ücreti mutabakatını yaparak eşyayı derhal millileştir"
    ]
  },
  {
    "id": "gumruk_yetkilendirilmis_gumruk_musaviri_an1_an8",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "yetkilendirilmiş gümrük müşaviri ygm",
      "antrepo açılış tespit an1",
      "stok tespit raporu an6",
      "antrepo sonlandırma an8"
    ],
    "baslik": "Yetkilendirilmiş Gümrük Müşaviri (YGM) Tespit Raporları & Denetim",
    "ikon": "📜",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Aylık Antrepo Denetimi",
    "akilliFisilti": "💼 Özel ve genel antrepoların giriş-çıkış sayımları ve fiziki şartları YGM tarafından denetlenip AN raporu düzenlenir.",
    "oncedenYapilacaklar": [
      "Antrepo girişlerinde AN7 antrepoya eşya giriş tespit raporunun 24 saat içinde sisteme girildiğini denetle",
      "6 aylık periyotlarda antrepodaki fiziki stoklar ile gümrük kütük kayıtlarını AN6 Raporu ile birebir sayarak karşılaştır",
      "Kamera kayıtlarının kesintisiz 7/24 çalıştığını ve yedeklerinin 1 yıl boyunca saklandığını teyit et",
      "Yıllık antrepo uygunluk denetimi için AN1 raporunu hazırlayarak Bölge Gümrük Müdürlüğüne onaylat"
    ]
  },
  {
    "id": "tic_pos_gun_sonu_z_raporu_kasa_mutabakati",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "pos gün sonu z raporu",
      "yeni nesil ökc gün sonu",
      "kasa fiziki nakit sayımı açık fazlalık",
      "slip mutabakatı"
    ],
    "baslik": "ÖKC Gün Sonu Z Raporu & POS / Kasa Nakit Mutabakatı",
    "ikon": "🧾",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Gün Sonu (23:00)",
    "akilliFisilti": "🏪 Z raporu alınmadan gün kapatılamaz; POS gün sonu toplamları ile muhasebe kasa defteri arasındaki fark 0 TL olmalıdır.",
    "oncedenYapilacaklar": [
      "Tüm Yeni Nesil Ödeme Kaydedici Cihazlardan (ÖKC) günlük Z Raporunu yazdırıp GİB bildirim durumunu doğrula",
      "Banka POS terminallerinden Gün Sonu (Batch Settlement) sliplerini alarak banka bazlı toplamları çıkar",
      "Çekmecedeki madeni ve kağıt paraları fiziki olarak sayıp günlük devir nakit (avans) tutarını düş",
      "Nakit / Kredi Kartı / Yemek Kartı tahsilatlarını ERP satış raporuyla karşılaştırıp kasa mutabakat tutanağını imzala"
    ]
  },
  {
    "id": "tic_perakende_fifo_stok_sayimi_sayim_farki_fire",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "fifo stok sayımı",
      "mağaza sayım farkı envanter",
      "ürün fire ve zayi oranı",
      "barkodlu el terminali stok sayımı"
    ],
    "baslik": "Perakende Mağaza Stok Sayımı & Fire / Zayi Mutabakatı",
    "ikon": "📦",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Ay Sonu Sayımı",
    "akilliFisilti": "🏪 Barkodsuz veya rafta eksik çıkan ürünler anında sistem stoklarından düşülmemeli, arka depo ve reyonlar çapraz taranmalıdır.",
    "oncedenYapilacaklar": [
      "El terminalleri ile mağaza ve depo raflarındaki tüm barkodlu ürünlerin fiili sayımını (adet/koli) gerçekleştir",
      "ERP sistemindeki teorik stok ile fiili sayım arasındaki eksi/artı varyans farklarını listele",
      "Son kullanma tarihi (SKT) yaklaşan veya hasarlı ürünleri tespit edip Fire/Zayi Tutanağı düzenle",
      "FIFO (İlk Giren İlk Çıkar) kuralına göre yeni gelen partileri reyonun arkasına, eski partileri ön sıraya diz"
    ]
  },
  {
    "id": "tic_b2b_cari_hesap_mutabakati_ba_bs_formu",
    "category": "finans",
    "domain": "TICARET",
    "keywords": [
      "cari hesap mutabakatı",
      "tedarikçi bakiye teyidi",
      "b2b e-mutabakat sistemi",
      "cari ekstre karşılaştırma"
    ],
    "baslik": "B2B Tedarikçi Cari Hesap & Bakiye E-Mutabakatı",
    "ikon": "🤝",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Her Ayın İlk Haftası",
    "akilliFisilti": "🏪 Mutabakatsız bakiye ödemesi yapmak mükerrer fatura veya kayıp iade alacaklarının gözden kaçmasına sebep olur.",
    "oncedenYapilacaklar": [
      "Tedarikçi ve kurumsal müşterilere ay sonu bakiyesini gösteren resmi E-Mutabakat mektubunu sistemden gönder",
      "Karşı taraftan gelen bakiye uyuşmazlığında tarih ve fatura no bazında detaylı cari ekstre (ledger) karşılaştırması yap",
      "İade faturaları, fiyat farkı faturaları ve banka havale dekontlarındaki tarih sapmalarını tespit et",
      "Her iki tarafın kaşe ve imzasıyla nihai mutabakat belgesini onaylayıp muhasebe arşivine ekle"
    ]
  },
  {
    "id": "tic_e_ticaret_pazaryeri_iade_kargo_hasar_tutonagi",
    "category": "ev_teknik",
    "domain": "TICARET",
    "keywords": [
      "pazaryeri iade kontrolü",
      "kargo hasar tespit tutanağı",
      "müşteri cayma hakkı 14 gün",
      "e-ticaret kusurlu ürün itiraz"
    ],
    "baslik": "E-Ticaret Müşteri İadesi & Kargo Hasar Tespit Süreci",
    "ikon": "🔄",
    "renk": "#FED7AA",
    "varsayilanZaman": "Paket Teslim Anı",
    "akilliFisilti": "🏪 Kargo görevlisi ayrılmadan hasarlı koliye Zabıt/Hasar Tespit Tutanağı tutturulmazsa tazmin talebi kargo şirketi tarafından reddedilir.",
    "oncedenYapilacaklar": [
      "Gelen iade kargosunun koli bant ve dış ambalaj durumunu kurye önünde kontrol et; yırtık/ezik varsa zabıt tut",
      "Paket açılışını güvenlik kamerası altında yaparak ürün seri numarası ve orijinal aksesuarlarını doğrula",
      "Kullanılmış veya orijinalliği bozulmuş ürünler için pazaryeri portalı üzerinden fotoğraflı red itirazı oluştur",
      "Kusursuz ürünlerde 14 günlük yasal cayma hakkı kapsamında müşterinin iade ücret onayını sisteme gir"
    ]
  },
  {
    "id": "tic_gida_soguk_zincir_haccp_sicaklik_takip_cizelgesi",
    "category": "saglik",
    "domain": "TICARET",
    "keywords": [
      "soğuk zincir haccp sıcaklık çizelgesi",
      "market şarküteri dolap derecesi",
      "derin dondurucu -18 kontrolü",
      "süt et dolap ısı kaydı"
    ],
    "baslik": "Gıda Perakendesi: Soğuk Zincir (HACCP) Sıcaklık Takibi",
    "ikon": "🥩",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Günde 3 Kez (09:00, 14:00, 19:00)",
    "akilliFisilti": "🏪 Şarküteri ve süt ürünleri dolapları +2°C ile +4°C arasında, donuk reyonlar -18°C'de sabit tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Tüm süt, et, tavuk ve balık reyonu teşhir dolaplarının dijital termometre değerlerini çizelgeye işle",
      "Derin dondurucu (-18°C) dikey ve yatay dolapların karlanma/defrost durumunu kontrol et",
      "+4°C üzerine çıkan dolaplarda ürün iç çekirdek sıcaklığını prob termometre ile ölçerek kritik eşiği denetle",
      "Sıcaklık anomalisi durumunda ürünleri derhal yedek soğuk hava deposuna transfer edip teknik servis çağır"
    ]
  },
  {
    "id": "den_solas_can_kurtarma_lsa_filika_indirme_drilli",
    "category": "ev_teknik",
    "domain": "DENIZCILIK",
    "keywords": [
      "solas filika indirme talimi",
      "lsa can kurtarma can salı bakımı",
      "serbest düşmeli free fall filika testi",
      "gemi yangın ve terk talimi"
    ],
    "baslik": "SOLAS / LSA: Can Kurtarma Araçları & Filika İndirme Talimi",
    "ikon": "🚢",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Aylık / Liman Öncesi",
    "akilliFisilti": "⚓ SOLAS Bölüm III gereği her gemi adamı ayda en az bir kez Terk-i Sefine ve Yangın talimine fiilen katılmak zorundadır.",
    "oncedenYapilacaklar": [
      "Gemi genel alarmını (7 kısa 1 uzun düdük) çalarak mürettebatın can yelekleri ve daldırma giysileriyle (Immersion Suit) toplanmasını sağla",
      "Filika mataforasının (davit) fren mandallarını kontrol edip filikayı su seviyesine kadar kontrollü olarak indir",
      "Filika içten takma dizel motorunu en az 3 dakika çalıştırıp dümen yekesi ve su püskürtme/hava tüpü sistemini test et",
      "Talim detaylarını, katılan personel listesini ve kronometre sürelerini resmi Gemi Jurnaline (Deck Logbook) işle"
    ]
  },
  {
    "id": "den_marpol_ek_1_yag_kayit_defteri_orb_ve_owd_ayristirici",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "marpol ek 1 yağ kayıt defteri orb",
      "sintine separatörü 15 ppm alarmı",
      "oil record book part 1",
      "sintine basma yasağı marpol"
    ],
    "baslik": "MARPOL Ek I: Yağ Kayıt Defteri (ORB) & 15 PPM Sintine Separatörü",
    "ikon": "🛢️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sintine Transferi / Tahliye Anı",
    "akilliFisilti": "⚓ 15 PPM OWS separatörü ve otomatik 3 yollu durdurma vanası test edilmeden denize sintine basılması uluslararası çevre suçudur.",
    "oncedenYapilacaklar": [
      "Sintine suyu seperatörünün (OWS) 15 PPM yağ içerik monitörü (OCM) kalibrasyonunu ve kayıt hafızasını denetle",
      "Denize basma vanasının mühür numarasını kontrol ederek otomatik kesme selonoidinin çalıştığını test et",
      "Tank transferi veya atık alım tesisine (Sludge/Bilge) teslimatı Oil Record Book Part I'e standart kodlarla (Kod C, D, H) kaydet",
      "ORB kayıtlarını Baş Mühendis ve Gemi Kaptanı tarafından ıslak imza ve gemi mühürüyle onaylat"
    ]
  },
  {
    "id": "den_ism_kod_safety_management_gemide_ic_denetim",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "ism kod gemi iç denetimi",
      "safety management system sms denetim",
      "dpa designated person ashore",
      "ism uygunsuzluk car raporu"
    ],
    "baslik": "ISM Kodu: Emniyetli Yönetim Sistemi (SMS) & Gemi İç Denetimi",
    "ikon": "📋",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıllık Periyot",
    "akilliFisilti": "⚓ ISM Kodu iç denetiminde tespit edilen minör uygunsuzluklar DPA koordinasyonuyla 30 gün içinde DÖF ile kapatılmalıdır.",
    "oncedenYapilacaklar": [
      "Gemi Emniyetli Yönetim Sistemi (SMS) kontrol listeleri üzerinden köprüüstü, makine dairesi ve güverteyi denetle",
      "Kritik yedek parça listesi, acil durum jeneratörü aküleri ve acil yangın pompasının hazır olduğunu teyit et",
      "Tespit edilen uygunsuzluklar için Düzeltici Faaliyet Raporu (CAR) açarak Karadaki Yetkili Kişiye (DPA) raporla",
      "Gemi Kaptanının ISM Kodu kapsamında Ezici Yetki (Overriding Authority) beyanını ve personelin farkındalığını sorgula"
    ]
  },
  {
    "id": "den_colreg_catismayi_onleme_gecis_ustunlugu_ve_fenerler",
    "category": "ev_teknik",
    "domain": "DENIZCILIK",
    "keywords": [
      "colreg çatışmayı önleme kuralları",
      "denizde yol hakkı borda fenerleri",
      "iskele sancak geçiş üstünlüğü colreg",
      "dar kanalda seyir kuralları"
    ],
    "baslik": "COLREG 72: Çatışmayı Önleme Tüzüğü, Seyir Fenerleri & Rota Değişimi",
    "ikon": "🧭",
    "renk": "#FED7AA",
    "varsayilanZaman": "Seyir Vardiyası Sürekli",
    "akilliFisilti": "⚓ Aykırı geçiş durumunda diğer tekneyi sancak (sağ) bordasında gören tekne yol vermekle yükümlüdür; erken ve belirgin rota değiştirin.",
    "oncedenYapilacaklar": [
      "ARPA Radar üzerinde karşı hedefin CPA (En Yakın Yaklaşma Noktası) ve TCPA (CPA'e Kalan Zaman) parametrelerini takip et",
      "Çatışma riski varsa COLREG Kural 8 gereği tereddüde yer vermeyecek büyüklükte (en az 20-30 derece) sancak rotası ver",
      "Gece seyrinde silyon feneri, borda fenerleri (kırmızı/yeşil) ve pupa fenerinin yedek ampul ve devrelerini kontrol et",
      "Kısıtlı görüşte (sis) COLREG Kural 35 gereği 2 dakikada bir en az 1 uzun düdük ses işareti vererek gözcülüğü artır"
    ]
  },
  {
    "id": "den_draft_survey_deplasman_ve_yuk_miktari_hesabi",
    "category": "finans",
    "domain": "DENIZCILIK",
    "keywords": [
      "draft survey yük hesabı",
      "gemi draft okuma deplasman",
      "tahmil tahliye surveyörü draft",
      "su yoğunluğu hidrometre hesaplama"
    ],
    "baslik": "Yük Operasyonu: Draft Survey (Hassas Deplasman & Tonaj) Hesabı",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Yükleme Öncesi ve Sonrası",
    "akilliFisilti": "⚓ Deniz suyunun yoğunluğu (Density) hidrometre ile ölçülmeden yapılan Draft Survey hesaplarında yüzlerce tonluk ticari hata oluşur.",
    "oncedenYapilacaklar": [
      "Gemi baş (FP), vasat (MP) ve kıç (AP) iskele ve sancak draft rakamlarını sakin havada hizmet botundan bizzat oku",
      "Gemi bordasından farklı derinliklerden su numunesi alarak kalibre deniz hidrometresi ile suyun yoğunluğunu (örnek 1.025) ölç",
      "Gemi hidrostatik tablolarından (Hydrostatic Tables) trim, meyil, çökme (hogging/sagging) ve draft düzeltmelerini yap",
      "Boş ve dolu deplasman farkından ballast suyu, yakıt ve tatlı su tüketimini düşerek nihai yük miktarını tarafsız sörveyörle mutabık kal"
    ]
  },
  {
    "id": "gum_gtip_kodu_tarife_tespiti_btb_baglayici_tarife",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "gtip kodu tarife tespiti",
      "btb bağlayıcı tarife bilgisi gümrük",
      "gümrük tarife cetveli izahnamesi",
      "12 haneli gtip sınıflandırması"
    ],
    "baslik": "Gümrük Tarife Cetveli: 12 Haneli GTİP Sınıflandırması & BTB",
    "ikon": "📦",
    "renk": "#FEF9C3",
    "varsayilanZaman": "İthalat Öncesi",
    "akilliFisilti": "🌐 Yanlış GTİP beyanı 4458 Sayılı Gümrük Kanunu Madde 234 gereği vergi farkının 3 katı ceza ve ek mali yükümlülük doğurur.",
    "oncedenYapilacaklar": [
      "Eşyanın ticari tanımı, teknik veri sayfası (TDS), malzeme içeriği ve kullanım amacını üreticiden temin et",
      "Türk Gümrük Tarife Cetveli İzahnamesi ve Genel Yorum Kuralları (GYK 1-6) çerçevesinde 12 haneli GTİP kodunu belirle",
      "Tereddütlü ve karmaşık eşyalarda Gümrükler Genel Müdürlüğüne resmi Bağlayıcı Tarife Bilgisi (BTB) başvurusu yap",
      "GTİP'e bağlı ilave gümrük vergisi (İGV), dampinge karşı vergi ve ihtisas gümrüğü zorunluluğunu denetle"
    ]
  },
  {
    "id": "gum_dahilde_isleme_rejimi_dir_dii_belgesi_kapatma",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "dahilde işleme izin belgesi diib",
      "dii belgesi kapatma müracaatı",
      "şartlı muafiyet sistemi gümrük vergisi teminatı",
      "dir telafi edici vergi tev"
    ],
    "baslik": "DİİB: Dahilde İşleme Rejimi (DİR) Belge Takibi & Kapatma Müracaatı",
    "ikon": "🔄",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Süre Bitiminden 1 Ay Önce",
    "akilliFisilti": "🌐 DİİB süresi içinde ihracat taahhüdü tamamlanmazsa ithalattaki gümrük vergisi ve KDV gecikme faizi ve cezasıyla tahsil edilir.",
    "oncedenYapilacaklar": [
      "Dahilde İşleme İzin Belgesi (DİİB) kapsamında gümrük vergisi ve KDV muafiyetiyle ithal edilen ham maddeleri kaydet",
      "Hammadde sarfiyatını Kapasite Raporu ve Ekspertiz Raporundaki fire oranları ile eşleştir",
      "Mamul ürünlerin ihracat beyannamelerini (0300 rejim kodu) DİİB satır kodlarıyla sistemde ilişkilendir",
      "Belge süresi dolmadan Ticaret Bakanlığı DİR Otomasyon Sistemi üzerinden resen Belge Kapatma Müracaatını yap"
    ]
  },
  {
    "id": "gum_antrepo_rejim_kodu_7100_antrepo_giris_cikis_stok",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "antrepo rejim kodu 7100",
      "antrepo stok defteri mutabakatı",
      "gümrük antrepo elleçleme izni",
      "antrepodan millileştirme 4071"
    ],
    "baslik": "Antrepo Rejimi (7100): Eşya Kabul, Stok Defteri & Millileştirme",
    "ikon": "🏬",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Eşya Boşaltma Günü",
    "akilliFisilti": "🌐 Antrepodaki eşyada gümrük idaresinden izin alınmadan etiketleme veya elleçleme yapılması kaçakçılık mevzuatı kapsamına girer.",
    "oncedenYapilacaklar": [
      "Gümrüklü tırın antrepoya varışında mühür kontrolü yaparak 7100 Rejim kodlu Antrepo Beyannamesini tescil et",
      "Eşyaları muayene memuru ve yetkilendirilmiş gümrük müşaviri (YGM) gözetiminde boşaltıp hasar/miktar tespiti yap",
      "Kabul edilen tüm kap/koli adetlerini Gümrük Antrepo Stok Takip Programına ve resmi deftere kaydet",
      "Antrepodan kısmi çekilişlerde (4071 Rejim Kodu) ithalat vergilerini yatırıp serbest dolaşıma giriş işlemlerini tamamla"
    ]
  },
  {
    "id": "gum_atr_eur1_mense_sahadetnamesi_ve_capraz_kumulasyon",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "a tr dolaşım belgesi",
      "eur 1 menşe belgesi pan avrupa akdeniz",
      "menşe şahadetnamesi vize onayı",
      "tedarikçi beyanı gümrük"
    ],
    "baslik": "Menşe & Dolaşım Belgeleri: A.TR, EUR.1 & Menşe Şahadetnamesi",
    "ikon": "📑",
    "renk": "#E0E7FF",
    "varsayilanZaman": "İhracat Çıkışı Öncesi",
    "akilliFisilti": "🌐 AB ülkelerine sanayi ürünü ihracatında A.TR Dolaşım Belgesi sıfır gümrük vergisi sağlarken; Serbest Ticaret Anlaşması olan ülkelerde EUR.1 zorunludur.",
    "oncedenYapilacaklar": [
      "İhracat yapılacak ülkenin STA (Serbest Ticaret Anlaşması) veya Gümrük Birliği kapsamını denetle",
      "İlgili Ticaret ve Sanayi Odasından elektronik A.TR, EUR.1 veya Menşe Şahadetnamesi taslağını oluştur",
      "Gerekiyorsa eşyanın yerli girdi oranını kanıtlayan Tedarikçi Beyanı (Supplier's Declaration) evrakını dosyaya koy",
      "Gümrük idaresinde belgeyi onaylatıp (vize ettirip) orijinal nüshaları alıcıya ulaştırılmak üzere kargo zarfına ekle"
    ]
  },
  {
    "id": "gum_kambiyo_mevzuati_ibkb_ihracat_bedeli_terkini_180_gun",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "ibkb ihracat bedeli kabul belgesi",
      "ihracat bedeli 180 gün yurda getirme",
      "ihracat bedeli terkin sınırı 30000 dolar",
      "tcmb döviz satım zorunluluğu"
    ],
    "baslik": "Kambiyo Mevzuatı: 180 Günlük İhracat Bedeli Kapatma & İBKB",
    "ikon": "💵",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Fiili İhracattan Sonraki 180 Gün",
    "akilliFisilti": "🌐 Fiili ihraç tarihinden itibaren 180 gün içinde bedeli yurda getirilmeyen ve İBKB bağlanmayan ihracat dosyaları Vergi Dairesine ihbar edilir.",
    "oncedenYapilacaklar": [
      "Gümrük Beyannamesi (GB) fiili ihraç kapanış tarihini ve 180 günlük yasal kambiyo takvimini sisteme işle",
      "Yurtdışı alıcıdan bankaya SWIFT ile gelen döviz tutarı için aracı bankada İhracat Bedeli Kabul Belgesi (İBKB) düzenlet",
      "TCMB'nin güncel döviz satım zorunluluğu kuralına göre belirlenen döviz oranını TCMB kurundan bozdur",
      "Açıkta kalan bakiye 30.000 USD terkin sınırının altındaysa bankadan resen terkin ile dosyayı kapattır"
    ]
  },
  {
    "id": "lojistik_aetr_takograf_surus_dinlenme_kurallari",
    "category": "arac_ulasim",
    "domain": "LOJISTIK",
    "keywords": [
      "takograf sürüş süresi aetr",
      "4.5 saat sürüş 45 dakika mola",
      "haftalık 56 saat sürüş limiti",
      "takograf kartı veri indirme 28 gün"
    ],
    "baslik": "Uluslararası AETR & Takograf: 4.5 Saat Sürüş, 45 Dk Mola & Veri İndirme",
    "ikon": "🚛",
    "renk": "#FED7AA",
    "varsayilanZaman": "Sürüş Esnası / Günlük Rutin",
    "akilliFisilti": "🚛 Kesintisiz 4.5 saat sürüş sonrası en az 45 dk (veya 15+30 dk) mola zorunludur; günlük sürüş 9 saati geçemez.",
    "oncedenYapilacaklar": [
      "Dijital takograf cihazına sürücü kartını takarak manuel giriş (Dinlenme/İş) onayını tamamla",
      "4 saat 15 dakika sürüş dolduğunda en yakın emniyetli TIR parkına yanaşma planı yap",
      "Günlük 11 saatlik kesintisiz dinlenme süresini (veya 3+9 saat bölünmüş) takograf ekranından takip et",
      "Sürücü kartı verilerini 28 günde bir, araç takograf verilerini 90 günde bir kurumsal arşive indir"
    ]
  },
  {
    "id": "lojistik_cmr_sevk_irsaliyesi_ve_rezerv_koyma",
    "category": "arac_ulasim",
    "domain": "LOJISTIK",
    "keywords": [
      "cmr karayolu taşıma senedi",
      "cmr hasar çekincesi rezerv",
      "e-irsaliye kabul red süresi 7 gün",
      "gümrük t1 t2 transit beyannamesi"
    ],
    "baslik": "Uluslararası Karayolu Taşıma Senedi (CMR) & Hasar Rezerv Şerhi",
    "ikon": "📄",
    "renk": "#FED7AA",
    "varsayilanZaman": "Yükleme / Boşaltma Teslim Anı",
    "akilliFisilti": "🚛 Ambalajda yırtık veya eksik kap varsa teslim anında CMR belgesinin 18. kutusuna yazılı \"Rezerv / Çekince\" düşülür.",
    "oncedenYapilacaklar": [
      "CMR belgesindeki gönderici, alıcı, brüt kilo ve mal cinsinin fiziksel yük ve fatura ile uyumunu doğrula",
      "Yükleme anında paletlerin ıslak, hasarlı veya bantlarının açılmış olduğunu görürsen CMR üzerine şerh düş ve imzalattır",
      "Varış noktasında alıcı kaşesi, teslim tarihi ve imzasını CMR nüshasına eksiksiz al",
      "Gümrük Transit Beyannamesi (T1/T2) ve MRN numarasının sınır kapısında sistemden düşümünü teyit et"
    ]
  },
  {
    "id": "lojistik_dorse_yuk_baglama_lashing_spanzet_hesabi",
    "category": "arac_ulasim",
    "domain": "LOJISTIK",
    "keywords": [
      "dorse yük sabitleme lashing",
      "spanzet cırcırlı kayış lc 2500 dan",
      "en 12195 yük bağlama sürtünme katsayısı",
      "kaymaz paspas friksiyon matı"
    ],
    "baslik": "EN 12195 Standartlarında Dorse Yük Emniyeti (Lashing) & Spanzet Hesabı",
    "ikon": "🔒",
    "renk": "#FED7AA",
    "varsayilanZaman": "Yükleme Bitimi / Hareket Öncesi",
    "akilliFisilti": "🚛 Ani frende yükün öne kaymasını önlemek için sürtünme paspasları ve LC 2500 daN onaylı spanzet kayışları kullanılır.",
    "oncedenYapilacaklar": [
      "Palet tabanlarına sürtünme katsayısını artıran (µ=0.6) kauçuk kaymaz friksiyon matları yerleştir",
      "Yük ağırlığına göre gerekli spanzet adedini hesapla ve kayışları dorse bağlama halkalarına (Lashing Points) 45-60 dereceyle sabitle",
      "Köşe koruyucu plastik köşebentler (Edge Protector) kullanarak kayışların palet kenarlarını ezmesini ve aşınmasını engelle",
      "Cırcır mekanizmasını gerdirerek STF (Standart Gerdirme Kuvveti) değerini kilitli pozisyona al"
    ]
  },
  {
    "id": "lojistik_frigorifik_tasima_atp_ve_sicaklik_datalogger",
    "category": "arac_ulasim",
    "domain": "LOJISTIK",
    "keywords": [
      "frigo dorse atp sertifikası frc",
      "soğuk zincir lojistik datalogger",
      "termo king soğutucu set sıcaklığı",
      "donuk gıda -18 derece taşıma"
    ],
    "baslik": "Frigorifik Taşımacılık: ATP/FRC Sertifikası & Termo King -18°C Kayıt",
    "ikon": "🧊",
    "renk": "#FED7AA",
    "varsayilanZaman": "Yükleme Öncesi / Yol Boyunca",
    "akilliFisilti": "🚛 Donuk gıdada dorse içi -18°C’ye ön soğutma (Pre-cooling) yapılmadan yükleme yapılmaz; DataLogger sürekli kaydeder.",
    "oncedenYapilacaklar": [
      "Dorse ATP uygunluk sertifikasının (FRC sınıfı: Güçlendirilmiş Soğutucu) geçerlilik tarihini denetle",
      "Soğutucu üniteyi (Thermo King / Carrier) çalıştırıp dorse iç sıcaklığını hedef dereceye (-18°C veya +4°C) getir",
      "Hava sirkülasyonunun tıkanmaması için yükün tavan evaporatör çıkışına en az 30 cm mesafede istiflenmesini sağla",
      "Teslimat noktasında alıcıya sunulmak üzere soğutucu ünitenin yazıcısından sıcaklık grafik çıktısını al"
    ]
  },
  {
    "id": "lojistik_adr_tehlikeli_madde_turuncu_plaka_ve_src5",
    "category": "arac_ulasim",
    "domain": "LOJISTIK",
    "keywords": [
      "adr tehlikeli madde taşıma src5",
      "adr çantası göz duşu kıvılcımsız fener",
      "tanker topraklama zinciri",
      "tehlikeli madde yazılı talimat ek-3"
    ],
    "baslik": "ADR Karayolu Tehlikeli Madde Taşımacılığı & SRC-5 Güvenlik Protokolü",
    "ikon": "☣️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Dolum Tesisi Çıkışı / Sefer Öncesi",
    "akilliFisilti": "🚛 ADR taşımacılığında sürücünün SRC-5 belgesi, araçta ADR çantası, 2 adet yangın tüpü ve Yazılı Talimat şarttır.",
    "oncedenYapilacaklar": [
      "Sürücünün geçerli SRC-5 Mesleki Yeterlilik ve ADR Eğitim Sertifikasını kontrol et",
      "Araçtaki ADR Çantası içeriğini (Göz yıkama sıvısı, kıvılcımsız fener, drenaj örtüsü, toplama kabı, maske) tam say",
      "Aracın ön ve arkasına reflektif turuncu tehlike plakalarını ve yanlarına sınıf etiketlerini (Placard) tak",
      "Sürücü kabininde 4 dilde hazırlanmış ADR Yazılı Talimat (Kaza Eylem Rehberi) belgesini hazır bulundur"
    ]
  },
  {
    "id": "denizcilik_solas_filika_ve_yangin_talimi_kaydi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "solas filika talimi gemi jurnali",
      "gemiyi terk talimi her ay",
      "yangın talimi can simidi can yeleği",
      "marpol denetimi psc port state"
    ],
    "baslik": "SOLAS Kapsamında Filika (Gemiyi Terk) & Yangın Talimi (Drill)",
    "ikon": "🚢",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Aylık Rutin / Liman Ayrılışından 24 Saat Sonra",
    "akilliFisilti": "⚓ SOLAS uyarınca mürettebatın %25’i değiştiğinde limandan ayrılışı izleyen 24 saat içinde gemiyi terk talimi zorunludur.",
    "oncedenYapilacaklar": [
      "Genel Acil Durum Alarmını (7 kısa 1 uzun düdük) çalarak mürettebatın Muster Station’da toplanmasını sağla",
      "Can yelekleri, daldırma giysileri (Immersion Suit) ve EPIRB/SART cihazlarının kontrolünü yap",
      "Kapalı tip can filikasını (Lifeboat) matafora kancalarından borda seviyesine indirip motorunu çalıştır",
      "Talimin başlama/bitiş saatini, personelin katılımını ve eksiklikleri resmi Güverte Jurnaline (Logbook) işle"
    ]
  },
  {
    "id": "denizcilik_colreg_catismayi_onleme_ve_fenerler",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "colreg çatışmayı önleme tüzüğü",
      "borda fenerleri silyon feneri",
      "yol hakkı kuralı rota değiştirme",
      "arpa radar cpa tcpa alarmı"
    ],
    "baslik": "COLREG 72 Çatışmayı Önleme: Silyon Fenerleri & ARPA Radar CPA/TCPA",
    "ikon": "🧭",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Köprüüstü Vardiyası / Seyir Esnası",
    "akilliFisilti": "⚓ Çatışma riskinde en yakın geçiş mesafesi (CPA) ve zamanı (TCPA) izlenir; yol veren gemi erken ve belirgin rota değiştirir.",
    "oncedenYapilacaklar": [
      "Güneş batımı ile doğumu arasında Silyon (Beyaz 225°), Borda (Sancak Yeşil/İskele Kırmızı 112.5°) ve Pupa fenerlerini yak",
      "ARPA Radarda hedef gemileri işaretleyip CPA (En az 1.5 Deniz Mili) ve TCPA güvenlik limitlerini ayarla",
      "Kuvvetle yürütülen teknelerin pruva pruvaya karşılaşmasında (Kural 14) her iki geminin rotasını sancağa almasını sağla",
      "Sis ve kısıtlı görüş şartlarında 2 dakikayı aşmayan aralıklarla 1 uzun düdük ses işaretini ver"
    ]
  },
  {
    "id": "denizcilik_marpol_ek1_yag_kayit_defteri_oil_record_book",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "marpol ek 1 oil record book",
      "sintine seperatörü 15 ppm alarmı",
      "sludge tankı yakma insineratör",
      "gemi yağ kayıt defteri mühür"
    ],
    "baslik": "MARPOL Ek-1: 15 PPM Sintine Seperatörü & Yağ Kayıt Defteri (ORB)",
    "ikon": "🛢️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Sintine Basma / Sludge Boşaltma Anı",
    "akilliFisilti": "⚓ Denize basılan sintine suyu petrol oranı 15 PPM’i geçemez; Oily Water Separator otomatik kesme valfi devrededir.",
    "oncedenYapilacaklar": [
      "15 PPM Sintine Seperatörü (OWS) alarm ve 3 yollu otomatik durdurma valfinin çalışırlığını test et",
      "Makine dairesi sintine kuyularındaki yağlı su transferini ve Sludge tankı yakma/boşaltma miktarını m³ olarak ölç",
      "Oil Record Book (Bölüm 1 - Makine Dairesi) sayfasına operasyon kodunu (Code C/D/E), tank no ve koordinatı silinmez mürekkeple yaz",
      "Sayfa sonunu Baş Mühendis ve Süvari (Gemi Kaptanı) ıslak imzasıyla mühürle"
    ]
  },
  {
    "id": "denizcilik_demirleme_ve_kaloma_miktari_hesabi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "demirleme kaloma hesabı kilit",
      "demir tarama alarmı gps anchor watch",
      "fırdöndü ırgat freni",
      "su derinliği 4 6 katı kaloma"
    ],
    "baslik": "Demirleme Operasyonu: Su Derinliğine Göre Kaloma (Kilit) Hesabı & Demir Nöbeti",
    "ikon": "⚓",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Demir Yerine Varış / Rüzgarlı Hava",
    "akilliFisilti": "⚓ Sakin havada derinliğin 4-5 katı, fırtınalı havada 7-8 katı zincir (1 Kilit = 27.5 metre) denize kaloma verilir.",
    "oncedenYapilacaklar": [
      "Eskandil (Echo Sounder) ile demir atılacak noktanın su derinliğini ve deniz tabanı yapısını (Kum/Balçık/Kaya) belirle",
      "Derinliğe göre gerekli kilit sayısını hesapla; demir ırgatının hidrolik frenini açarak demiri su seviyesine indir (Walk back)",
      "Gemi tornistan yol alırken demiri fundoya bırak ve zincirin serilmesini kontrol ederek fırdöndü ve kastanyola ile sık",
      "GPS/ECDIS üzerinde \"Anchor Watch (Demir Tarama Alarmı)\" çemberini 0.1 NM toleransla kur"
    ]
  },
  {
    "id": "denizcilik_ecdis_elektronik_harita_seyir_plani",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "ecdis elektronik harita güncelleme enc",
      "passage plan limandan limana seyir planı",
      "güvenlik derinliği safety contour",
      "sığlık izobatı no go area"
    ],
    "baslik": "IMO Uygunluklu ECDIS Seyir Planı (Passage Plan: Berth to Berth)",
    "ikon": "🗺️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Kalkıştan Önce / Sefer Hazırlığı",
    "akilliFisilti": "⚓ Seyir planı 4 aşamadan (Appraisal, Planning, Execution, Monitoring) oluşur ve gemi draftına göre Safety Contour girilir.",
    "oncedenYapilacaklar": [
      "ECDIS cihazındaki resmi ENC (Elektronik Seyir Haritaları) haftalık Notices to Mariners (NtM) düzeltmelerini güncelle",
      "Geminin statik ve dinamik draftına squat payı ekleyerek Emniyetli Su Derinliği (Safety Contour) ve İzolasyon Alanlarını belirle",
      "Sığlıklar, batıklar ve askeri yasak sahaları \"No-Go Area (Girilmez Bölge)\" olarak haritaya kırmızı poligonla işle",
      "Köprüüstü Vardiya Zabiti ve Kaptan tarafından onaylanan rotayı köprüüstü seyir defterine bağla"
    ]
  },
  {
    "id": "gumruk_gtip_armonize_tarife_tespiti_baglayici_tarife",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "gtip tespiti 12 haneli",
      "bağlayıcı tarife bilgisi btb",
      "gümrük genel yorum kuralları gyk",
      "ithalat rejim kararı gümrük vergisi"
    ],
    "baslik": "Gümrük Tarife İstatistik Pozisyonu (GTİP 12 Hane) & BTB Başvurusu",
    "ikon": "📦",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İthalat/İhracat Öncesi Sınıflandırma",
    "akilliFisilti": "🌐 Ürünün kimyasal/teknik yapısına göre 12 haneli GTİP tespiti yapılır; belirsizlikte Gümrükten BTB talep edilir.",
    "oncedenYapilacaklar": [
      "Eşyanın teknik kataloğunu, malzeme güvenlik bilgi formunu (MSDS) ve kullanım amacını detaylı incele",
      "Gümrük Tarife Cetveli İzahnamesi ve Genel Yorum Kurallarını (GYK 1-6) uygulayarak 12 haneli milli GTİP kodunu belirle",
      "İthalat Rejimi Kararından Gümrük Vergisi, İlave Gümrük Vergisi (İGV), KDV ve damping önlemlerini sorgula",
      "İhtilaflı durumlarda Ticaret Bakanlığı Gümrükler Genel Müdürlüğüne 3 yıl geçerli \"Bağlayıcı Tarife Bilgisi (BTB)\" başvurusu yap"
    ]
  },
  {
    "id": "gumruk_dahilde_isleme_rejimi_dii_ve_kapatma",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "dahilde işleme izin belgesi diib",
      "dii kapatma müracaatı teminat iadesi",
      "ithal hammadde ihracat taahhüdü",
      "vergi muafiyeti şartlı muafiyet"
    ],
    "baslik": "Dahilde İşleme Rejimi (DİİB): Hammadde Şartlı Muafiyeti & Belge Kapatma",
    "ikon": "🏭",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Belge Süresi Bitişi / İhracat Tamamlanması",
    "akilliFisilti": "🌐 DİİB ile ithal edilen hammadde gümrük vergisi ve KDV ödenmeden teminatla alınır, ihracat sonrası teminat çözülür.",
    "oncedenYapilacaklar": [
      "DİİB kapsamında yurda giren ithalat beyannameleri ile işlem görmüş ürün ihracat beyannamelerini eşleştir",
      "Fire oranları ve hammadde sarfiyat tablosunu (Kapasite Raporu bazlı) eksiksiz hesapla",
      "Belge süresi dolmadan Ticaret Bakanlığı DYS (Destek Yönetim Sistemi) üzerinden \"Belge Kapatma Müracaatı\"nı yap",
      "Kapatma yazısının Gümrük Müdürlüğüne intikali ile vezneye yatırılan nakit/banka teminat mektubunu iade al"
    ]
  },
  {
    "id": "gumruk_atr_eur1_mense_ispati_ve_pan_avrupa_akdeniz",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "a.tr dolaşım belgesi gümrük birliği",
      "eur.1 menşe ispat belgesi serbest ticaret",
      "tedarikçi beyanı pan avrupa akdeniz",
      "menşe şahadetnamesi tasdiki"
    ],
    "baslik": "Tercihli Ticaret: A.TR Dolaşım Belgesi & EUR.1 Menşe İspatı",
    "ikon": "📜",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İhracat Yükleme Öncesi",
    "akilliFisilti": "🌐 AB ülkelerine sanayi ürünü ihracatında serbest dolaşım için A.TR, STA ülkelerine tercihli vergi için EUR.1 düzenlenir.",
    "oncedenYapilacaklar": [
      "Eşyanın Türkiye’de elde edildiğini veya serbest dolaşımda olduğunu kanıtlayan Tedarikçi Beyanını doğrula",
      "İhracatçı Birliği (MEDOS sistemi) üzerinden elektronik A.TR / EUR.1 / Menşe Şahadetnamesi taslağını oluştur",
      "Gümrük memurunun yeşil/sarı hat yönlendirmesine göre elektronik vize onayını al",
      "İthalatçı ülkenin gümrüğünde sıfır veya indirimli gümrük vergisi uygulanması için belgenin orijinalini alıcıya kargola"
    ]
  },
  {
    "id": "gumruk_kirmizi_hat_fiziki_muayene_ve_laboratuvar",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "gümrük kırmızı hat fiziki muayene",
      "gümrük sarı hat belge kontrolü",
      "gümrük laboratuvar tahlili gtal",
      "konteyner x-ray taraması"
    ],
    "baslik": "Gümrük Kırmızı Hat: Konteyner Açma, Fiziki Muayene & GTAL Tahlili",
    "ikon": "🔍",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Gümrük Tescil Sonrası / Muayene Aşaması",
    "akilliFisilti": "🌐 Kırmızı hatta düşen beyannamede gümrük muayene memuru konteyneri sahada açtırır, gerekirse kimyevi tahlile (GTAL) gönderir.",
    "oncedenYapilacaklar": [
      "Gümrük İdaresi BİLGE sisteminde beyannamenin Kırmızı Hat (Fiziki Kontrol) kriterine yönlendirildiğini tespit et",
      "Liman/Antrepo işletmesinden konteynerin muayene peronuna indirilmesi (Supalan / Açma) talebini oluştur",
      "Gümrük Muayene Memuru eşliğinde konteyner mührünü keserek koli sayımı, marka, menşe ve etiket denetimini yaptır",
      "Kimyevi veya tekstil ürünlerinde çift şahit numune alınarak Gümrük Kimya Laboratuvarına (GTAL) teslimini sağla"
    ]
  },
  {
    "id": "gumruk_antrepo_ve_ozet_beyan_sure_asim_takibi",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "özet beyan süresi denizyolu 45 gün",
      "özel antrepo genel antrepo devir",
      "tasfiyelik eşya gümrük kanunu 177",
      "antrepo elleçleme izni 71. madde"
    ],
    "baslik": "Gümrük Kanunu 46 & 177: Özet Beyan Süreleri & Tasfiyeye Düşmeyi Önleme",
    "ikon": "⏳",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Eşyanın Limana/Antrepoya Girişinden İtibaren",
    "akilliFisilti": "🌐 Denizyoluyla gelen eşyaya özet beyan verildiği tarihten itibaren 45 gün, diğer yollarda 20 gün içinde rejim belirlenmelidir.",
    "oncedenYapilacaklar": [
      "Liman geçici depolama sahasına inen eşyanın 45 günlük yasal bekleme süresinin son gününü takvime işle",
      "Süre bitmeden eşyayı Antrepo Rejimine alarak bekleme süresini süresiz hale getir veya serbest dolaşıma giriş beyannamesi aç",
      "Gerekli hallerde Gümrük Müdürlüğüne dilekçe vererek 30 günlük ek süre talebinde bulun",
      "Süresi geçen ve tasfiyelik hale gelen eşyalar için Gümrük Kanunu 177 kapsamında Tasfiye İdaresine devrini engelle"
    ]
  },
  {
    "id": "havacilik_metar_taf_notam_ofp_ucus_plani",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "metar taf hava durumu çözme",
      "ofp operasyonel uçuş planı",
      "notam analizi pist kapalılığı",
      "yakıt hesabı trip cont alternate final",
      "aip jeppesen yaklaşma chartı"
    ],
    "baslik": "Uçuş Öncesi Brifing: OFP (Operational Flight Plan), METAR/TAF & Kritik NOTAM Analizi",
    "ikon": "✈️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Uçuştan 90 Dk Önce / Dispatch",
    "akilliFisilti": "✈️ Kalkış, varış ve yedek (alternate) meydan hava durumunda TAF görünürlüğü ve tavanı iniş minimumlarının altında ise ikinci bir yedek meydan seçilmelidir.",
    "oncedenYapilacaklar": [
      "Kalkış, varış ve en-route yedek havalimanlarının güncel METAR, SPECI ve TAF raporlarını analiz et",
      "Rota ve havalimanı kısıtlamalarını içeren aktif NOTAM bültenini incele",
      "OFP yakıt hesabını doğrula: Trip Fuel + Contingency (%5) + Alternate Fuel + Final Reserve (30 dk)",
      "Jeppesen / LIDO yaklaşma, kalkış (SID) ve rota (STAR) chartlarını EFB (Elektronik Uçuş Çantası) tabletine yükle"
    ]
  },
  {
    "id": "havacilik_kokpit_walkaround_harici_kontrol_ve_mel",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "uçak harici kontrol walkaround",
      "pitot statik tüp kılıfı kontrol",
      "lastik aşınma fren balata pini",
      "mel cdk asgari teçhizat listesi",
      "motor paller yabancı madde fod"
    ],
    "baslik": "Uçak Harici Kontrolü (Walkaround), Pitot Kılıfları & MEL (Minimum Equipment List)",
    "ikon": "🛫",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Uçuştan 45 Dk Önce",
    "akilliFisilti": "🛫 Pitot tüpleri ve statik portların tıkalı olmaması hız ve irtifa göstergelerinin doğruluğu için hayati önem taşır; tüm kapaklar ve pinler çıkarılmış olmalıdır.",
    "oncedenYapilacaklar": [
      "Gövde, kanatlar ve kontrol yüzeylerinde (Aileron, Flap, Rudder) yapısal hasar ve perçin kontrolü yap",
      "Pitot tüpleri, AoA (Hücum Açısı) sensörleri ve statik deliklerin temizliğini görsel olarak teyit et",
      "Ana iniş takımı lastik diş derinliğini, hidrolik sızıntıyı ve fren aşınma indikatör pinini ölç",
      "Uçaktaki arızalı ekipmanların MEL (Asgari Teçhizat Listesi) kategorisine (A, B, C, D) ve uçuşa elverişliliğe uygunluğunu Teknik Kütükten (Tech Log) imzala"
    ]
  },
  {
    "id": "havacilik_agirlik_ve_denge_loadsheet_ve_trim",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "loadsheet ağırlık ve denge hesabı",
      "mac cg ağırlık merkezi yüzdesi",
      "zfw zero fuel weight tow",
      "stab trim kalkış ayarı",
      "bagaj kargo yerleşimi lmc"
    ],
    "baslik": "Ağırlık ve Denge: Loadsheet, Ağırlık Merkezi (%MAC) & Kalkış Stabilizer Trim",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Kapı Kapanışı / Motor Çalıştırma",
    "akilliFisilti": "⚖️ Ağırlık merkezi (%MAC) limitler dışındaysa uçak kalkışta kontrol edilemez; Loadsheet üzerindeki CG değerine göre Stab Trim ayarı set edilmelidir.",
    "oncedenYapilacaklar": [
      "Yolcu sayısı, kargo/bagaj dağılımı ve yakıt miktarına göre Nihai Loadsheet belgesini doğrula",
      "Zero Fuel Weight (ZFW), Takeoff Weight (TOW) ve Landing Weight (LAW) limit aşımı olmadığını kontrol et",
      "Hesaplanan %MAC (Mean Aerodynamic Chord) değerine karşılık gelen Kalkış Trim derecesini (THS / Stab Trim) ayarla",
      "Son dakika yük değişikliklerini (LMC - Last Minute Change) 500 kg limitine göre loadsheete el yazısıyla işle ve imzala"
    ]
  },
  {
    "id": "havacilik_ils_cat_iii_dusuk_gorus_proseduru_lvp",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "ils cat iii yaklaşma autoland",
      "düşük görüş prosedürleri lvp rvr 75m",
      "decision height dh radio altimeter",
      "dual channel fail operational otopilot",
      "sisli havada otomatik iniş"
    ],
    "baslik": "Kategori III ILS Hassas Yaklaşma (CAT IIIB Autoland) & Düşük Görüş Prosedürleri (LVP)",
    "ikon": "🌫️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Yaklaşma Brifingi / Son Yaklaşma",
    "akilliFisilti": "🌫️ Meydanda LVP aktifken RVR 75 metreye kadar CAT IIIB otomatik iniş (Autoland) yapılır; Karar Yüksekliğinde (DH) tekerlek teması doğrulanmalıdır.",
    "oncedenYapilacaklar": [
      "Meydan ATIS bilgisinden LVP (Low Visibility Procedures) aktif durumunu ve pist RVR değerlerini al",
      "Her iki otopilotu (Dual Autopilot / Fail Operational) ILS frekansına kilitle",
      "Radyo Altimetre Karar Yüksekliğini (DH: 50 ft veya No DH) brifingde set et",
      "Touchdown noktasında FLARE ve ROLLOUT modlarının devreye girdiğini PFD ekranından doğrula"
    ]
  },
  {
    "id": "havacilik_kokpit_crm_ve_acil_durum_qrh_memory_items",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "kokpit crm kaynak yönetimi",
      "qrh quick reference handbook arıza",
      "memory items ezbere yapılacaklar",
      "mayday pan pan acil durum çağrısı",
      "uçuşta motor arızası tek motor"
    ],
    "baslik": "Uçuş Güvenliği: CRM (Crew Resource Management), QRH & Ezber Eylemler (Memory Items)",
    "ikon": "🚨",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Acil Durum / Simülatör",
    "akilliFisilti": "🚨 Motor yangını veya kabin basınç kaybında önce ezbere adımlar (Memory Items) uygulanır, uçak kontrolü sağlandıktan sonra QRH kontrol listesi okunur.",
    "oncedenYapilacaklar": [
      "Acil durumda Pilot Flying (PF) uçağın kontrolünü korur; Pilot Monitoring (PM) iletişimi ve sistemleri yönetir",
      "Motor yangını/hasarı durumunda gaz kolunu rölantiye al, yakıt kesiciyi kapat ve yangın tüpünü patlat",
      "Uçak güvenli irtifaya tırmandıktan sonra QRH (Hızlı Başvuru El Kitabı) arıza çeklistini oku ve uygula",
      "ATC kulesine \"MAYDAY MAYDAY MAYDAY\" çağrısı yaparak niyetini, yakıt durumunu ve iniş talebini bildir"
    ]
  },
  {
    "id": "denizcilik_ecdis_rota_planlama_ve_catzoc",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "ecdis rota planlama passage planning",
      "catzoc veri doğruluğu derinlik",
      "emniyet derinliği safety contour ecdis",
      "xte cross track error limiti",
      "imo ecdis seyir vardiyası"
    ],
    "baslik": "ECDIS Elektronik Harita: Sefer Planı (Passage Planning), Safety Contour & CATZOC",
    "ikon": "🧭",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Limandan Kalkış Öncesi",
    "akilliFisilti": "🧭 ECDIS üzerinde Emniyet Derinliği (Safety Contour) geminin statik draftı + dinamik squat payı + minimum UKC formülüyle hesaplanmalıdır.",
    "oncedenYapilacaklar": [
      "Elektronik Seyir Haritalarının (ENC) güncel Notice to Mariners (NtM) düzeltmelerini yükle",
      "Rotayı (Waypoints) çizerek XTE (Cross Track Error) emniyet koridorunu dar kanallara göre sınırla",
      "Harita derinlik güvenilirliğini (CATZOC A1/A2/B/C) kontrol ederek sığlık geçiş riskini belirle",
      "Anti-grounding alarm parametrelerini (Safety Depth, Look-ahead time: 10 dk) aktif et"
    ]
  },
  {
    "id": "denizcilik_marpol_ek_1_15_ppm_sintine_ve_orb",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "marpol ek 1 sintine ayrıştırıcı 15 ppm",
      "oil record book orb kayıt kısmı",
      "yağlı su separatörü ows alarmı",
      "marpol özel alanlar tahliye yasağı",
      "sintine tankı seviye ve transfer"
    ],
    "baslik": "MARPOL Ek-1: 15 PPM Sintine Separatörü (OWS) & Yağ Kayıt Defteri (ORB Bölüm I)",
    "ikon": "🚢",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Sintine Tahliyesi / Vardiya",
    "akilliFisilti": "🚢 Yağlı su separatörü sadece açık denizlerde ve yağ içeriği < 15 ppm olduğunda denize tahliye yapabilir; MARPOL özel alanlarında tahliye tamamen yasaktır.",
    "oncedenYapilacaklar": [
      "15 PPM Sintine Alarm Ünitesinin (OCM) kalibrasyonunu ve otomatik 3 yollu durdurma vanasını test et",
      "Yağlı Su Separatörünü (OWS) çalıştırarak sintine tutma tankından ayrıştırmayı başlat",
      "Tahliyenin başlama/bitiş saati, gemi GPS koordinatları ve tahliye edilen miktarı ORB Bölüm I’e işle",
      "Kayıtları Başmühendis ve Gemi Kaptanı imzasıyla mühürle"
    ]
  },
  {
    "id": "denizcilik_gemi_demirleme_ve_kaloma_miktari",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "gemi demirleme prosedürü ırgat",
      "kaloma miktarı su derinliği 6-7 katı",
      "demir ırgatı fren balatası kilit",
      "demir tarama tespiti ecdis radar",
      "funda demir vira demir komutu"
    ],
    "baslik": "Gemi Manevrası: Demirleme, Su Derinliğine Göre Kaloma Hesabı & Demir Nöbeti",
    "ikon": "⚓",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Demir Mevkiine Yaklaşma",
    "akilliFisilti": "⚓ Normal hava ve dip tabiatında kaloma miktarı su derinliğinin 5-6 katı, fırtınalı havalarda 7-8 katı (Kilit cinsinden) olarak denize verilir.",
    "oncedenYapilacaklar": [
      "Demir ırgatı hidrolik/elektrik gücünü devreye al ve ırgat fren balatasını test et",
      "Gemi rüzgara/akıntıya karşı durdurulduğunda \"Funda Demir\" komutu ile demiri serbest bırak",
      "Verilen zincir kilit miktarını (1 kilit = 27.5 metre) güvertedeki renkli halkalardan say",
      "ECDIS ve radar üzerinde demirleme daresi (Anchor Watch Ring) çizerek demir tarama alarmını kur"
    ]
  },
  {
    "id": "denizcilik_solas_filika_ve_can_sali_servis_testi",
    "category": "saglik",
    "domain": "DENIZCILIK",
    "keywords": [
      "solas can filikası indirme talimi",
      "can salı hidrostatik kilit hru",
      "filika motoru çalıştırma haftalık",
      "gemiyi terk talimi solas",
      "can yeleği ve daldırma giysisi immersion suit"
    ],
    "baslik": "SOLAS Can Kurtarma Araçları: Can Filikası Matafor İndirme & Can Salı HRU Kilidi",
    "ikon": "🚤",
    "renk": "#FED7AA",
    "varsayilanZaman": "Aylık SOLAS Talimi / Denetim",
    "akilliFisilti": "SOLAS kuralı gereği her ay tüm mürettebatın katılımıyla gemiyi terk talimi yapılmalı; filika motoru haftalık 3 dakika çalıştırılmalıdır.",
    "oncedenYapilacaklar": [
      "Can salı hidrostatik serbest bırakma ünitesinin (HRU) geçerlilik tarihini ve zayıf halkasını (Weak Link) kontrol et",
      "Kapalı tip can filikasının hava tüpü basıncını ve sprinkler su püskürtme pompasını test et",
      "Matafor kollarını serbest bırakıp filikayı güverte bordası seviyesine indirerek biniş provası yap",
      "Tüm personelin immersion suit (daldırma giysisi) ve can yeleği ışık/düdüklerini denetle"
    ]
  },
  {
    "id": "denizcilik_ism_ve_psc_liman_devleti_denetimi",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "psc liman devleti denetimi paris mou",
      "ism kod emniyetli yönetim sistemi",
      "psc eksiklik listesi form a b",
      "geminin tutulması detention riski",
      "emergency fire pump acil yangın pompası"
    ],
    "baslik": "Liman Devleti Denetimi (PSC / Paris MoU) & ISM Güvenli Yönetim Sistemi",
    "ikon": "📋",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Limana Varış Öncesi PSC Hazırlığı",
    "akilliFisilti": "📋 Acil durum yangın pompası (Emergency Fire Pump) veya acil jeneratörün çalışmaması geminin limanda doğrudan tutulma (Detention) sebebidir.",
    "oncedenYapilacaklar": [
      "Acil yangın pompasını bağımsız dizel motorundan çalıştırarak en üst güvertedeki nozuldan 2 bar basınç üret",
      "Acil durum jeneratörünün (Emergency Generator) 45 saniyede otomatik devreye girdiğini test et",
      "Dümen dairesinde acil yekeyle (Emergency Steering) köprüüstü irtibatını ve manevra açısını sına",
      "Gemi sertifikalarının, personel STCW belgelerinin ve ISM Denetim Listesinin (Pre-Arrival Checklist) eksiksiz olduğunu doğrula"
    ]
  },
  {
    "id": "gumruk_gtip_kodu_tarife_tespiti_ve_btb",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "gtip kodu bağlayıcı tarife bilgisi btb",
      "gümrük tarife cetveli 12 haneli gtip",
      "menşe şahadetnamesi eur.1 dolaşım",
      "ithalat vergisi ilave gümrük vergisi igv",
      "antrepo beyannamesi tarife tespiti"
    ],
    "baslik": "4458 Sayılı Gümrük Kanunu: GTİP Kodu Tespiti, Bağlayıcı Tarife Bilgisi (BTB) & İGV",
    "ikon": "📦",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İthalat Öncesi / Beyanname",
    "akilliFisilti": "📦 Yanlış GTİP beyanı vergi ziyaı ve 3 katı para cezasına yol açar; tereddütlü ürünlerde Gümrükler Genel Müdürlüğünden BTB alınmalıdır.",
    "oncedenYapilacaklar": [
      "Ürünün teknik veri föyü (TDS), malzeme içeriği ve fonksiyonuna göre 12 haneli GTİP kodunu belirle",
      "Gümrük Tarife Cetvelindeki Gümrük Vergisi, İlave Gümrük Vergisi (İGV) ve ÖTV oranlarını hesapla",
      "Serbest Ticaret Anlaşması (STA) olan ülkeler için EUR.1 / A.TR / Menşe Belgesi muafiyetini kontrol et",
      "Gerekli hallerde Bölge Gümrük Müdürlüğüne BTB (Bağlayıcı Tarife Bilgisi) başvuru dosyasını sun"
    ]
  },
  {
    "id": "gumruk_antrepo_rejim_7100_ve_teminat_mektubu",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "antrepo rejimi 7100 beyanname",
      "gümrük antrepo teminat mektubu",
      "antrepo stok takip defteri",
      "antrepodan serbest dolaşıma giriş 4071",
      "antrepo elleçleme izni gümrük"
    ],
    "baslik": "Gümrük Rejimi 7100: Genel/Özel Antrepo Girişi, Teminat Yönetimi & Elleçleme",
    "ikon": "🏢",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Antrepo Giriş / Çıkış",
    "akilliFisilti": "🏢 Antrepoya alınan eşyalar için tahakkuk edebilecek gümrük vergileri tutarında toplu veya münferit teminat verilmesi yasal zorunluluktur.",
    "oncedenYapilacaklar": [
      "7100 rejim kodu ile Antrepo Giriş Beyannamesini BİLGE sisteminde tescil et",
      "Eşyanın gümrük vergileri toplamı kadar banka teminat mektubunu gümrük muhasebe veznesine bloke et",
      "Eşya antrepoya fiziki giriş yaparken ambar sorumlusu ve muayene memuru eşliğinde tutanak tut",
      "Kısmi çekimlerde 4071 Serbest Dolaşıma Giriş beyannamesi açarak vergileri öde ve teminattan düşüm yap"
    ]
  },
  {
    "id": "gumruk_dahilde_isleme_rejimi_dir_ve_dii_belgesi",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "dahilde işleme rejimi dir belgesi",
      "dii belgesi kapatma taahhüt hesabı",
      "şartlı muafiyet sistemi hammadde ithalat",
      "ihracat taahhüdü döviz kullanım",
      "eşdeğer eşya kullanımı dir"
    ],
    "baslik": "Dahilde İşleme Rejimi (DİR): Şartlı Muafiyet, İhracat Taahhüdü & Belge Kapatma",
    "ikon": "🏭",
    "renk": "#DCFCE7",
    "varsayilanZaman": "DİİB Süresi / Kapatma Aşaması",
    "akilliFisilti": "🏭 DİR kapsamında vergisiz ithal edilen hammadde mamul haline getirilip süresi içinde ihraç edilmezse gecikme zammıyla birlikte gümrük vergisi tahsil edilir.",
    "oncedenYapilacaklar": [
      "Ticaret Bakanlığı portalından Dahilde İşleme İzin Belgesi (DİİB) ithalat/ihracat kontenjanlarını aç",
      "5100 rejim kodu ile hammadde ithalatını şartlı muafiyet kapsamında teminatla tamamla",
      "Üretilen mamulün 3151 rejim koduyla fiili ihracat gümrük beyannamelerini belgeye bağla",
      "Belge süresi bitiminden itibaren 3 ay içinde Bölge Müdürlüğüne Belge Kapatma ve Teminat İadesi müracaatı yap"
    ]
  },
  {
    "id": "gumruk_kırmızı_hat_muayene_tam_fiziki_tespit",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "kırmızı hat muayene tam tespit",
      "sarı hat belge kontrolü gümrük",
      "yeşil hat mavi hat oys yetkilendirilmiş",
      "gümrük muayene memuru tutanak",
      "x-ray araç tarama sevki"
    ],
    "baslik": "Gümrük Hat Kriterleri: Kırmızı Hat Fiziki Muayene, X-Ray & Numune Alma",
    "ikon": "🚨",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Beyanname Tescil / Muayene",
    "akilliFisilti": "🚨 Kırmızı hatta düşen beyannamelerde konteyner X-Ray taramasına sevk edilir ve muayene memuru huzurunda kapaklar açılarak tam fiziki tespit yapılır.",
    "oncedenYapilacaklar": [
      "BİLGE sisteminden atanan hat kriterini kontrol et (Yeşil: Belgesiz Geçiş, Sarı: Belge Kontrolü, Kırmızı: Fiziki Muayene)",
      "Konteyneri liman X-Ray tarama ünitesine sevk ederek yoğunluk görüntüsü raporunu al",
      "Muayene peronunda konteyner mührünü memur gözetiminde kırarak kap/koli/marka sayımı yap",
      "Kimyasal veya gıda maddelerinde laboratuvar tahlili için gümrük mühürlü 3 adet şahit numune çıkar"
    ]
  },
  {
    "id": "gumruk_incoterms_2020_cif_fob_ddp_navlun_sigorta",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "incoterms 2020 teslim şekilleri",
      "cif navlun ve sigorta dahil ithalat",
      "fob gemi bordasında teslimat",
      "ddp gümrük vergileri ödenmiş teslim",
      "ithalat kıymeti navlun sigorta emsal"
    ],
    "baslik": "Uluslararası Ticaret: Incoterms 2020 (FOB / CIF / DDP / EXW) & Gümrük Kıymeti",
    "ikon": "🌐",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Dış Ticaret Sözleşmesi / Fatura",
    "akilliFisilti": "🌐 FOB veya EXW ithalatlarda navlun faturası ve sigorta poliçesi gümrük matrahına (CIF kıymete) zorunlu olarak eklenir.",
    "oncedenYapilacaklar": [
      "Dış ticaret proforma faturasındaki Incoterms 2020 teslim kuralını (EXW, FOB, CFR, CIF, DAP, DDP) doğrula",
      "FOB alımlarda konşimento (Bill of Lading) navlun tutarını ve deniz nakliye sigorta poliçesini temin et",
      "Gümrük Kıymet Bildirim Formunda fatura bedeli üzerine royalti, komisyon, navlun ve sigortayı ekleyerek CIF kıymeti hesapla",
      "DDP teslimatlarda gümrük vergilerinin satıcı tarafından ödendiğini kanıtlayan gümrük makbuzlarını dosyala"
    ]
  },
  {
    "id": "havacilik_ofp_metar_taf_notam_ve_dispatch_brifingi",
    "category": "is_kariyer",
    "domain": "HAVACILIK",
    "keywords": [
      "ofp operasyonel uçuş planı dispatch",
      "metar taf hava durumu rvr görüş mesafesi",
      "notam havacılık bildirimi pist kapalılığı",
      "yakıt planlaması trip contingency alternate final reserve",
      "uçuş öncesi brifing t-90 dakika pilot"
    ],
    "baslik": "Uçuş Öncesi Brifingi (T-90): OFP Operasyonel Uçuş Planı, METAR/TAF, NOTAM & Yakıt Hesabı",
    "ikon": "✈️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Uçuş Saatinden 90 Dakika Önce (T-90)",
    "akilliFisilti": "✈️ Kalkış, varış ve yedek meydan METAR/TAF ve NOTAM'ları incelenmeli; Minimum Kalkış Yakıtı (Trip + Contingency + Alternate + 30 Dk Final Reserve) onaylanmalıdır.",
    "oncedenYapilacaklar": [
      "OFP üzerindeki rota, uçuş seviyesi (FL), rüzgar bileşenleri ve ağırlık/denge (Loadsheet) limitlerini analiz et",
      "Meydan METAR, TAF, SIGMET ve rüzgar makası (Windshear) raporlarını değerlendir",
      "Pist, seyrüsefer yardımcısı arızaları ve hava sahası kısıtlamalarını içeren aktif NOTAM'ları filtrele",
      "Kaptan Pilot ve First Officer mutabakatıyla resmi OFP uçuş planını ve yakıt siparişini e-imza ile onayla"
    ]
  },
  {
    "id": "havacilik_kokpit_walkaround_ve_dis_kontrol_t-45",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "pilot dış kontrol walkaround uçağın etrafı",
      "pitot statik tüp kılıfları ve aoa sensörü",
      "uçak lastik aşınması fren balatası aşınma pimi",
      "motor pylon fan pallerinde fods kuş çarpması",
      "gövde statik deşarj telleri ve flap slot mekanizması"
    ],
    "baslik": "Uçak Dış Kontrolü (Walkaround - T-45): Pitot Tüpleri, Fan Palleleri, Fren Pimi & Gövde",
    "ikon": "🛩️",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Kalkıştan 45 Dakika Önce (T-45)",
    "akilliFisilti": "🛩️ Dış kontrolde Pitot-Statik tüplerin açık olduğu, AoA hücum açısı sensörleri, fren aşınma pimleri ve fan pallerinde FOD hasarı olmadığı gözle doğrulanmalıdır.",
    "oncedenYapilacaklar": [
      "Burun iniş takımı takozları, emniyet pimleri ve pitot tüp kılıflarının söküldüğünü kontrol et",
      "Motor hava girişinde fan pallerini tek tek çevirerek çentik, çatlak ve kuş çarpması (FOD) izi ara",
      "Ana iniş takımı fren balatası aşınma pimlerinin (Brake Wear Pin) dışarıda olduğunu doğrula",
      "Kanat hücum kenarı slatları, flap mekanizmaları ve firar kenarındaki statik deşarj püsküllerini incele"
    ]
  },
  {
    "id": "havacilik_fdp_ucus_gorev_suresi_ve_dinlenme_shgm_talimati",
    "category": "is_kariyer",
    "domain": "HAVACILIK",
    "keywords": [
      "fdp uçuş görev süresi sınırlaması shgm sht-ftll",
      "asgari dinlenme süresi rest period 12 saat",
      "sektör sayısı ve maksimum blok uçuş saati",
      "uçuş nöbeti standby göreve çağrılma kuralı",
      "yorgunluk risk yönetimi frms pilot raporu"
    ],
    "baslik": "SHT-FTL Uçuş & Görev Süresi (FDP): 12 Saatlik Asgari Dinlenme & Sektör Limitleri",
    "ikon": "⏱️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Görev Atama / Uçuş Sonu Raporu",
    "akilliFisilti": "⏱️ SHGM SHT-FTL talimatına göre iki uçuş görevi arasındaki asgari dinlenme süresi en az 12 saat veya önceki görev süresi kadar (hangisi büyükse) olmalıdır.",
    "oncedenYapilacaklar": [
      "Planlanan FDP süresinin başlama saatine ve icra edilecek sektör sayısına göre yasal limitleri denetle",
      "Önceki görev bitiş saati ile yeni görev başlangıcı arasında kesintisiz dinlenme süresini doğrula",
      "Uçuşta rötar veya beklenmedik gecikme halinde Kaptan Yetkisi (Commander's Discretion) sınırlarını hesapla",
      "Aşırı yorgunluk hissedilmesi durumunda FRMS (Yorgunluk Risk Yönetimi) kapsamında görevi reddetme hakkını kullan"
    ]
  },
  {
    "id": "havacilik_de_icing_anti_icing_ve_holdover_time_hesabi",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "de-icing buz çözme anti-icing buz önleme",
      "tip 1 sıcak su glikol karışımı turuncu",
      "tip 4 yeşil anti-icing holdover time hot süresi",
      "temiz uçak konsepti clean aircraft concept",
      "kabin ve kanat buzlanma kontrolü pilot"
    ],
    "baslik": "Kış Operasyonları: De-icing/Anti-icing (Tip 1 / Tip 4), Holdover Time (HOT) & Temiz Uçak Kuralı",
    "ikon": "❄️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Buzlanma / Kar Yağışı Koşullarında",
    "akilliFisilti": "❄️ \"Temiz Uçak Konsepti\" gereği kanat veya kuyrukta kar/buz varken kalkış yapılamaz; Tip 4 sıvısı uygulandığı andan itibaren Holdover Time (HOT) kronometresi başlatılır.",
    "oncedenYapilacaklar": [
      "De-icing kamyonu ile kanat ve kuyruk yüzeylerindeki karları sıcak Tip 1 sıvısıyla tamamen temizlet",
      "Buzlanmanın yeniden oluşmasını engellemek için kalın viskoz Tip 4 sıvısı püskürtülmesini sağla",
      "Hava sıcaklığı ve yağış türüne (kar, sulu sepken, donan sis) göre HOT tablosundan geçerlilik süresini hesapla",
      "Kalkıştan önce HOT süresi dolduysa pist başından geri dönerek uçağı yeniden De-icing işlemine al"
    ]
  },
  {
    "id": "havacilik_kokpit_crm_ve_sterile_cockpit_10000_feet",
    "category": "is_kariyer",
    "domain": "HAVACILIK",
    "keywords": [
      "crm ekip kaynak yönetimi kokpit iletişimi",
      "sterile cockpit 10000 feet altı sessizlik kuralı",
      "cross-check ve challenge response checklist",
      "standart operasyon usulleri sop ihlali uyarısı",
      "takeoff briefing ve reject takeoff rto kararı"
    ],
    "baslik": "Kokpit CRM & Sterile Cockpit: 10.000 Feet Altı Kuralı, Cross-Check & Challenge-Response",
    "ikon": "🎙️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Taksi, Kalkış & İniş Aşaması",
    "akilliFisilti": "🎙️ 10.000 feet irtifanın altında \"Sterile Cockpit\" kuralı geçerlidir; sadece uçuş emniyetini ilgilendiren teknik konuşmalar yapılabilir.",
    "oncedenYapilacaklar": [
      "Taksiye başlamadan önce kalkış pisti, motor arızası (V1/Vr/V2) ve acil dönüş planını içeren Takeoff Briefing'i tamamla",
      "Tüm kontrol listelerini (Before Start, After Takeoff, Landing) \"Challenge-Response\" yöntemiyle sesli oku ve karşılaştır",
      "10.000 feet geçilene kadar kabin ekibi ve kokpit içi gereksiz sohbet ve telefon kullanımını tamamen yasakla",
      "PFI (Pilot Flying) ve PM (Pilot Monitoring) arasında irtifa, rota ve hız değişikliklerinde standart çağrıları (Callout) uygula"
    ]
  },
  {
    "id": "denizcilik_ecdis_seyir_plani_passage_plan_ve_notam",
    "category": "is_kariyer",
    "domain": "DENIZCILIK",
    "keywords": [
      "ecdis elektronik harita seyir planı passage plan",
      "solas bolum 5 seyir emniyeti rota planlama",
      "apts s57 s63 enc elektronik seyir haritası güncelleme",
      "ukc omurga altı emniyet derinliği draft hesabı",
      "ntm denizcilere ilanlar ve navtex seyrüsefer ikazı"
    ],
    "baslik": "SOLAS Passage Planning: ECDIS Elektronik Rota, UKC Omurga Altı Derinliği & NAVTEX",
    "ikon": "⚓",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Limandan Ayrılmadan Önce (Berth to Berth)",
    "akilliFisilti": "⚓ SOLAS Ch.V gereği rota rıhtımdan rıhtıma (Berth-to-Berth) planlanmalı; ECDIS ENC haritaları güncel olmalı ve UKC (Omurga altı derinlik) minimum %10-15 korunmalıdır.",
    "oncedenYapilacaklar": [
      "Appraisal, Planning, Execution, Monitoring (APEM) 4 aşamalı seyir planı dokümanını hazırla",
      "ECDIS üzerindeki S-57 / S-63 ENC elektronik haritalarını en son Admiralty NtM düzeltmeleriyle güncelle",
      "Sığlık geçişlerinde dinamik squat (çökme) payı ekleyerek UKC omurga altı emniyet payını hesapla",
      "Rota boyunca aktif NAVTEX mesajları ve meteorolojik fırtına uyarılarını seyir planına işle"
    ]
  },
  {
    "id": "denizcilik_marpol_ek_1_yag_kayit_defteri_ve_owss",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "marpol ek 1 petrol kirliliğini önleme kuralları",
      "oil record book orb yağ kayıt defteri kısım 1",
      "sintine seperatörü ows 15 ppm alarm ünitesi",
      "sintine suyu basma 12 mil açık ve seyir halinde",
      "sludge tankı slaç yakma insineratör tutanağı"
    ],
    "baslik": "MARPOL Ek-I Yağ Kayıt Defteri (ORB): 15 PPM Sintine Seperatörü (OWS) & Slaç Takibi",
    "ikon": "🛢️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Sintine Basma / Slaç Transferi Anı",
    "akilliFisilti": "🛢️ Denize sintine basımı sadece 15 PPM OWS seperatörü çalışırken, gemi seyir halindeyken ve özel alanlar dışında yapılabilir; her işlem anında ORB Defterine yazılır.",
    "oncedenYapilacaklar": [
      "15 PPM Sintine Alarm Ünitesinin (OCM) kalibrasyonunu ve 3 yollu otomatik geri dönüş vanasını test et",
      "Sintine veya Slaç transferinde tank seviyelerini iskandil metre ile ölçüp m³ miktarını kaydet",
      "Yağ Kayıt Defterine (Oil Record Book Part I) standart kod ve harflerle (Örn: Code C 11.1) hatasız kayıt gir",
      "Liman atık kabul tesisine verilen slaç ve yağlı atıklar için resmi Atık Teslim Makbuzunu (BDR) dosyala"
    ]
  },
  {
    "id": "denizcilik_solas_filika_ve_denize_adam_dustu_mob_talimi",
    "category": "saglik",
    "domain": "DENIZCILIK",
    "keywords": [
      "solas can kurtarma filikası indirme talimi",
      "denize adam düştü mob manevrası williamson dönüşü",
      "can filikası motoru çalıştırma ve hidrostatik kilit",
      "can salı liferaft hidrostatik bırakma ünitesi hru",
      "gemi yangın ve terk talimi resmi jurnali kayıt"
    ],
    "baslik": "SOLAS Can Kurtarma: Filika İndirme, Williamson Manevrası & Aylık Yangın/Terk Talimi",
    "ikon": "🛟",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Aylık Periyodik Gemi Talimi",
    "akilliFisilti": "🛟 SOLAS gereği her gemide ayda en az 1 kez Yangın ve Gemiyi Terk talimi yapılmalı, filika 3 ayda bir denize indirilerek motoru test edilmelidir.",
    "oncedenYapilacaklar": [
      "Gemi genel alarm zilini (7 kısa 1 uzun) çalarak tüm mürettebatı can yeleğiyle toplanma istasyonuna (Muster Station) çağır",
      "Kurtarma botu ve can filikasını matafora kancalarından neta edip motorun marşına basarak çalıştır",
      "MOB (Man Overboard) durumunda ECDIS üzerinde MOB tuşuna basıp acil \"Williamson Dönüşü\" manevrasını simüle et",
      "Talime katılan personelin görev dağılımını, süresini ve eksikliklerini resmi Gemi Seyir Jurnaline (Logbook) işle"
    ]
  },
  {
    "id": "denizcilik_isps_kodu_guvenlik_seviyesi_ve_gangway_nobeti",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "isps kod uluslararası gemi ve liman tesisi güvenliği",
      "güvenlik seviyesi security level 1 2 3",
      "gangway borda iskelesi ziyaretçi kimlik ve çanta araması",
      "sso gemi güvenlik zabiti ve ssp güvenlik planı",
      "gemi bordası aydınlatma ve kaçak yolcu stowaway araması"
    ],
    "baslik": "ISPS Kodu & Gemi Güvenliği: Güvenlik Seviyesi (Level 1/2/3), İskele Nöbeti & Kaçak Araması",
    "ikon": "🛡️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Limana Yanaşma / Güvenlik Seviyesi Değişimi",
    "akilliFisilti": "🛡️ ISPS Level 1/2 kurallarına göre borda iskelesinde (Gangway) 24 saat nöbet tutulmalı; tüm ziyaretçiler kimlik kartı ve çanta kontrolü yapılarak ISPS defterine işlenmelidir.",
    "oncedenYapilacaklar": [
      "Liman Tesisi Güvenlik Zabiti (PFSO) ile görüşerek limanın aktif ISPS Güvenlik Seviyesini doğrula",
      "Borda iskelesi başına ISPS nöbetçi kulübesi, ziyaretçi defteri ve metal arama dedektörünü yerleştir",
      "Tüm giriş-çıkış yapan personel ve taşeronların ISPS Güvenlik Kartını kontrol edip ziyaretçi kartı ver",
      "Kalkıştan önce geminin tüm ambar, makine dairesi ve kilitli kompartımanlarında Kaçak Yolcu (Stowaway) araması yap"
    ]
  },
  {
    "id": "denizcilik_balast_suyu_yonetimi_bwms_ve_d2_standardi",
    "category": "ev_teknik",
    "domain": "DENIZCILIK",
    "keywords": [
      "balast suyu yönetimi sözleşmesi bwm",
      "bwms balast suyu arıtma sistemi uv elektro-klorinasyon",
      "imo d-2 biyolojik deşarj standardı canlı organizma",
      "balast kayıt defteri ballast water record book",
      "balast suyu değişimi d-1 açık deniz derin su kuralı"
    ],
    "baslik": "IMO BWM Sözleşmesi: Balast Suyu Arıtma Sistemi (BWMS D-2 Standardı) & Balast Defteri",
    "ikon": "💧",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Balast Alma / Deşarj Operasyonu",
    "akilliFisilti": "💧 BWM Sözleşmesi gereği balast operasyonları IMO D-2 standardına uygun BWMS arıtma cihazı ile yapılmalı; her operasyon Balast Kayıt Defterine işlenmelidir.",
    "oncedenYapilacaklar": [
      "Yükleme/Tahliye planına göre geminin trim, meyil ve boyuna mukavemet (Bending Moment) hesaplarını yap",
      "UV filtreli veya Elektro-klorinasyonlu BWMS sistemini otomatik arıtma modunda devreye al",
      "Balast deşarjı esnasında nötralizasyon ünitesinin aktif klor oranını (< 0.1 ppm) sensör üzerinden doğrula",
      "Alınan veya basılan balastın tank adı, coğrafi koordinatı, m³ miktarı ve süresini Balast Kayıt Defterine yaz"
    ]
  },
  {
    "id": "gumruk_gtip_tespiti_ve_baglayici_tarife_bilgisi_btb",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "gtip gümrük tarife istatistik pozisyonu 12 hane",
      "btb bağlayıcı tarife bilgisi gümrükler genel müdürlüğü",
      "türk gümrük tarife cetveli tgtt fasıl pozisyon",
      "ithalat rejim kararı ilave gümrük vergisi igv",
      "tareks ürün güvenliği ve denetimi tebliği tse"
    ],
    "baslik": "Gümrük Tarife Tespiti: 12 Haneli GTİP, Bağlayıcı Tarife Bilgisi (BTB) & İGV Analizi",
    "ikon": "📦",
    "renk": "#FED7AA",
    "varsayilanZaman": "İthalat/İhracat Öncesi / Beyanname Aşaması",
    "akilliFisilti": "📦 Eşyanın 12 haneli GTİP kodu doğru tespit edilmeli; tereddütlü durumlarda cezai yaptırımlardan korunmak için Gümrükler Genel Müdürlüğünden BTB talep edilmelidir.",
    "oncedenYapilacaklar": [
      "Ürünün teknik veri föyü, malzeme bileşim yüzdeleri ve kullanım amacını Türk Gümrük Tarife Cetvelinde incele",
      "Fasıl, pozisyon ve alt pozisyon notlarına göre 12 haneli GTİP kodunu belirle",
      "GTİP üzerinden İthalat Rejimi Kararı eki İGV, dampinge karşı vergi ve TAREKS/TSE denetim zorunluluklarını sorgula",
      "Gümrük Müşaviri e-İmzası ile Bağlayıcı Tarife Bilgisi (BTB) başvurusunu Bilge sistemine gönder"
    ]
  },
  {
    "id": "gumruk_mense_ispati_eur1_atr_ve_form_a_dolasim_belgesi",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "a.tr dolaşım belgesi ab serbest dolaşım",
      "eur.1 dolaşım sertifikası çapraz kümülasyon pamk",
      "menşe şahadetnamesi certificate of origin ticaret odası",
      "tedarikçi beyanı ve uzun dönemli tedarikçi beyanı",
      "tercihli ticaret anlaşması gümrük vergisi muafiyeti"
    ],
    "baslik": "Menşe İspat Belgeleri: A.TR Dolaşım Belgesi, EUR.1 / EUR-MED & Tercihli Tarife Muafiyeti",
    "ikon": "📜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Sevkiyat Öncesi / Gümrük Çıkışı",
    "akilliFisilti": "📜 AB ülkelerine sanayi ürünü ihracatında A.TR Dolaşım Belgesi; STA olan ülkelere ise EUR.1/EUR-MED belgesi düzenlenerek sıfır gümrük vergisi avantajı sağlanır.",
    "oncedenYapilacaklar": [
      "İhraç edilecek ürünün menşe kazanma kriterlerini (Yeterli işçilik ve işleme kuralı) hesapla",
      "AB ile Gümrük Birliği kapsamındaki sanayi ürünleri için elektronik MEDOS sistemi üzerinden A.TR belgesi düzenle",
      "Serbest Ticaret Anlaşması (STA) olan ülkelere EUR.1 / EUR-MED Dolaşım Sertifikasını Ticaret Odasına onaylat",
      "İthalatçı ülkedeki gümrük idaresinin sonradan kontrol talebi riskine karşı Tedarikçi Beyanlarını 5 yıl süreyle arşivle"
    ]
  },
  {
    "id": "gumruk_antrepo_rejim_7100_ve_ellecleme_izni",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "antrepo rejimi 7100 gümrük beyannamesi",
      "a tipi genel antrepo ve özel antrepo teminatı",
      "antrepo elleçleme izni ek 63 izin yazısı",
      "antrepo giriş çıkış stok takip defteri bilge",
      "antrepoda kalış süresi sınırsız ve sayım tutanağı"
    ],
    "baslik": "Gümrük Antrepo Rejimi (Kod: 7100): Teminat Mektubu, Elleçleme İzni & Stok Takibi",
    "ikon": "🏬",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Eşyanın Antrepoya Girişi / Elleçleme",
    "akilliFisilti": "🏬 Antrepo rejimine (7100) tabi eşyada ithalat vergileri ertelenir; etiketleme, paletleme gibi elleçleme işlemleri için gümrük idaresinden izin alınması zorunludur.",
    "oncedenYapilacaklar": [
      "Eşyanın gümrük vergileri tutarında global veya münferit Gümrük Teminat Mektubunu sisteme tanıt",
      "7100 rejim kodlu Antrepo Beyannamesini tescil edip eşyayı gümrük gözetiminde antrepoya aldır",
      "Gümrük Yönetmeliği Ek-63 kapsamında etiketleme, ambalaj değiştirme veya ayırma için Elleçleme İzin Dilekçesi ver",
      "Antrepo Stok Takip Defteri ile BİLGE sistemindeki fiili envanter mutabakatını düzenli olarak denetle"
    ]
  },
  {
    "id": "gumruk_diiy_dahilde_isleme_rejimi_ve_kapatma_raporu",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "dahilde işleme izin belgesi diib 3151 rejim",
      "şartlı muafiyet sistemi ham madde ithalatı",
      "verimlilik ve fire oranları kapasite raporu hesabı",
      "diib kapatma müracaatı ticaret bakanlığı süresi",
      "eşdeğer eşya kullanımı ve telafi edici vergi tev"
    ],
    "baslik": "Dahilde İşleme Rejimi (DİİB): Şartlı Muafiyet, Fire Oranları & Belge Kapatma Müracaatı",
    "ikon": "🏭",
    "renk": "#DCFCE7",
    "varsayilanZaman": "DİİB Süre Sonu (En Geç 1 Ay İçinde Kapatma)",
    "akilliFisilti": "🏭 DİİB kapsamında ithal edilen ham maddeler işlenip ihraç edildikten sonra belge süresi bitiminden itibaren 1 ay içinde Ticaret Bakanlığına kapatma müracaatı yapılmalıdır.",
    "oncedenYapilacaklar": [
      "3151 rejim kodu ile vergisiz ithal edilen ham maddelerin gümrük beyannamelerini ve teminatlarını kontrol et",
      "Sanayi Kapasite Raporundaki sarfiyat ve fire oranlarına göre mamul ürün ihracat beyannamelerini (Rejim: 1000/3151) eşle",
      "AB dışı üçüncü ülkelerden temin edilen ham maddelerin AB'ye ihracatında Telafi Edici Vergi (TEV) doğup doğmadığını hesapla",
      "DİİB Kapatma Formu, İthalat/İhracat Listeleri ve YMM Raporu ile Ticaret Bakanlığı Bölge Müdürlüğüne belge kapatmayı ver"
    ]
  },
  {
    "id": "gumruk_yetkilendirilmis_yukumlu_statusu_aeo_ve_yesil_hat",
    "category": "is_kariyer",
    "domain": "GUMRUK",
    "keywords": [
      "yetkilendirilmiş yükümlü statüsü yys aeo belgesi",
      "yeşil hat gümrük muayenesiz doğrudan geçiş",
      "yerinde gümrükleme ihracat ithalat izinli gönderici",
      "yys yıllık faaliyet raporu ve emniyet güvenlik soru formu",
      "gümrük kaçakçılığı 5607 sayılı kanun denetimi"
    ],
    "baslik": "Yetkilendirilmiş Yükümlü Statüsü (YYS / AEO): Yeşil Hat, Yerinde Gümrükleme & Yıllık Özdenetim",
    "ikon": "🟢",
    "renk": "#FEF08A",
    "varsayilanZaman": "YYS Yıllık Denetimi / Yeşil Hat Sevk",
    "akilliFisilti": "🟢 YYS (Yetkilendirilmiş Yükümlü) sahibi firmalar Yeşil Hat sayesinde fiziki muayene ve belge kontrolü olmaksızın kendi tesislerinden doğrudan yerinde gümrükleme yapabilir.",
    "oncedenYapilacaklar": [
      "Tesisin çevre emniyeti, CCTV kamera kayıtları (en az 30 gün) ve biyometrik giriş güvenliğini kontrol et",
      "Yetkilendirilmiş Yükümlü Soru Formundaki (YYS Soru Formu) emniyet ve izlenebilirlik kriterlerini güncelle",
      "İhracatta \"İzinli Gönderici\" yetkisiyle fabrikanın kendi antreposundan araca doğrudan gümrük mührü tak",
      "Yıllık YYS Özdenetim Faaliyet Raporunu YYS Denetçisi ile hazırlayıp Gümrük Bölge Müdürlüğüne sun"
    ]
  },
  {
    "id": "emlak_tasinmaz_ticareti_yetki_belgesi_ve_yer_gosterme_formu",
    "category": "is_kariyer",
    "domain": "EMLAK",
    "keywords": [
      "taşınmaz ticareti yetki belgesi ttbs onaylı",
      "taşınmaz gösterme belgesi yer gösterme formu ıslak imza",
      "hizmet bedeli komisyon oranı yüzde 2 artı kdv",
      "yetkilendirme sözleşmesi süresi maksimum 3 ay",
      "sahibinden veya portaldan emlak ilanı e-devlet eids teyidi"
    ],
    "baslik": "Taşınmaz Ticareti: Yetkilendirme Sözleşmesi, Yer Gösterme Formu & EİDS Teyidi",
    "ikon": "🏡",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Portföy Alımı & Müşteri Ziyareti Öncesi",
    "akilliFisilti": "🏡 Taşınmaz Ticareti Yönetmeliği gereğince her yer gösterme öncesinde \"Taşınmaz Gösterme Belgesi\" imzalatılmalı; ilanlar EİDS sistemi üzerinden yetki doğrulamalı girilmelidir.",
    "oncedenYapilacaklar": [
      "Mülk sahibiyle azami 3 aylık resmi \"Taşınmaz Yetkilendirme Sözleşmesini\" tanzim et ve EİDS üzerinden yetki onayı al",
      "Alıcı adayı ile gayrimenkulü fiziki gezmeden önce ıslak imzalı veya doğrulanmış dijital \"Taşınmaz Gösterme Formunu\" düzenle",
      "Yasal komisyon oranının (Alıcıdan %2 + Satıcıdan %2 + KDV) sözleşmede açıkça belirtildiğini denetle",
      "İlan portallarındaki gayrimenkul ada/parsel, metrekare ve tapu takyidat bilgilerinin doğruluğunu tapu kaydıyla eşleştir"
    ]
  },
  {
    "id": "emlak_spk_lisansli_gayrimenkul_degerleme_ve_ina_yontemi",
    "category": "finans",
    "domain": "EMLAK",
    "keywords": [
      "spk lisanslı gayrimenkul değerleme uzmanı raporu",
      "emsal karşılaştırma yöntemi ve satış kabiliyeti analizi",
      "indirgenmiş nakit akışı ina ve gelir kapitalizasyonu",
      "maliyet yöntemi arsa payı ve yapı yaklaşık birim maliyeti",
      "belediye imar durumu encümen kararı ve tapu kütüğü şerhleri"
    ],
    "baslik": "SPK Değerleme: Emsal Karşılaştırma, Gelir İNA Yöntemi & İmar Takyidat İncelemesi",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Ekspertiz Talebi & Rapor Tanzim Süresi",
    "akilliFisilti": "📑 SPK standartlarına uygun değerleme raporunda; Tapu takyidatları, Belediye İmar Durumu, Emsal Karşılaştırma ve İndirgenmiş Nakit Akımları (İNA) yöntemi bir arada sunulur.",
    "oncedenYapilacaklar": [
      "İlgili Tapu Müdürlüğünde taşınmaz kütüğündeki ipotek, haciz, intifa ve şufa haklarını incele",
      "İlgili Belediyenin İmar Müdürlüğünde onaylı mimari proje, tadilat projeleri ve ruhsat/iskan durumunu tetkik et",
      "Bölgedeki en az 3 adet gerçekleşmiş veya güncel emsal taşınmaz satış fiyatını şerefiye farklarıyla düzelt",
      "Ticari veya kira getirili mülklerde İndirgenmiş Nakit Akışı (İNA) ile nihai piyasa değerini takdir et"
    ]
  },
  {
    "id": "emlak_imar_barisi_yapi_kayit_belgesi_ve_kat_mulkiyeti",
    "category": "resmi",
    "domain": "EMLAK",
    "keywords": [
      "imar barışı yapı kayıt belgesi 3194 geçici 16",
      "cins değişikliği ve kat mülkiyetine geçiş lhkmmb",
      "mimar onaylı zemin tespit tutanağı ve röleve projesi",
      "yapı kayıt belgesi iptali davası ve aykırılık tespiti",
      "belediye yıkım ve para cezalarının terkin edilmesi"
    ],
    "baslik": "İmar Barışı & Cins Değişikliği: Yapı Kayıt Belgesi, Zemin Tespiti & Kat Mülkiyeti",
    "ikon": "🏛️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Kat Mülkiyeti Tesis & Tapu Tescil Aşaması",
    "akilliFisilti": "🏛️ Yapı Kayıt Belgesi alınan binalarda kat mülkiyetine geçiş için LİHKAB/kadastro zemin tespit tutanağı ve mimar onaylı röleve projesi ile tapu müdürlüğüne başvurulur.",
    "oncedenYapilacaklar": [
      "e-Devlet üzerinden alınan Yapı Kayıt Belgesindeki bağımsız bölüm metrekare ve kullanım amacını yerinde teyit et",
      "Lisanslı Harita Kadastro Mühendislik Bürosuna (LİHKAB) zemin tespit tutanağını tanzim ettir",
      "Mimar tarafından çizilen tüm katların ve bağımsız bölümlerin mimari röleve projesini tüm maliklere imzalat",
      "Tapu Müdürlüğünde cins değişikliği harcını yatırarak Yapı Kayıtlı taahhütnameyle Kat Mülkiyeti tapularını al"
    ]
  },
  {
    "id": "emlak_arsa_payi_karsiligi_insaat_sozlesmesi_ve_teminat",
    "category": "finans",
    "domain": "EMLAK",
    "keywords": [
      "arsa payı karşılığı inşaat sözleşmesi noter resmi senet",
      "müteahhit kesin teminat mektubu ve inşaat tamamlama sigortası",
      "kat irtifakı pay devir tablosu ve teknik şartname kalitesi",
      "gecikme cezası rayiç kira tazminatı ve mücbir sebep",
      "iskan alma yükümlülüğü ve yüklenici payı tapu devri"
    ],
    "baslik": "Kat Karşılığı İnşaat: Noter Sözleşmesi, Teminat Mektubu & Kademeli Tapu Devri",
    "ikon": "📜",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kentsel Dönüşüm / Sözleşme Müzakeresi",
    "akilliFisilti": "📜 Arsa Payı Karşılığı İnşaat Sözleşmeleri kanunen NOTERDE DÜZENLEME şeklinde yapılmak zorundadır; müteahhitten teminat mektubu veya tamamlama sigortası alınmalıdır.",
    "oncedenYapilacaklar": [
      "Noter huzurunda bağımsız bölüm paylaşım krokisini, mahal listesini ve cezai şart maddelerini içeren sözleşmeyi imzala",
      "Müteahhit payına düşen bağımsız bölümlerin tapu devirlerini inşaat seviyesine (%20 kaba, %60 ince, %100 iskan) bağla",
      "Gecikilen her ay için daire başına güncel rayiç kira bedeli tazminatını sözleşmeye bağlayıcı olarak ekle",
      "Müteahhitten banka Kesin Teminat Mektubu veya Bina Tamamlama Sigortası poliçesini teslim al"
    ]
  },
  {
    "id": "emlak_yabanciya_konut_satisi_vatandaslik_uygunluk_ve_dab",
    "category": "finans",
    "domain": "EMLAK",
    "keywords": [
      "yabancıya gayrimenkul satışı vatandaşlık 400 bin dolar",
      "döviz alım belgesi dab türkiye cumhuriyet merkez bankası",
      "spk lisanslı değerleme raporu tkgm portalı",
      "tapu siciline 3 yıl satılamaz şerhi konulması",
      "uygunluk belgesi çevre şehircilik ve iklim değişikliği bakanlığı"
    ],
    "baslik": "Yabancıya Satış & Vatandaşlık: 400.000$ Şartı, TCMB DAB Belgesi & 3 Yıl Satılamaz Şerhi",
    "ikon": "🌍",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Döviz Bozdurma & Tapu Devir Aşaması",
    "akilliFisilti": "🌍 Vatandaşlık amaçlı konut satışında minimum 400.000 USD bedel TCMB'ye satılarak Döviz Alım Belgesi (DAB) alınmalı; tapuya 3 YIL SATILAMAZ şerhi işletilmelidir.",
    "oncedenYapilacaklar": [
      "Taşınmazın SPK lisanslı değerleme kuruluşunca düzenlenen raporunun TKYM sistemine onaylandığını teyit et",
      "Alıcının bankası aracılığıyla dövizi Merkez Bankasına bozdurarak üzerinde kimlik/pasaport bilgisi olan DAB Belgesini al",
      "Tapu devir işlemi sırasında resmi senede \"Türk Vatandaşlığı Kanununun Uygulanmasına İlişkin Yönetmelik gereği 3 yıl satılmayacaktır\" şerhini yazdır",
      "Tapu tescil evraklarını Çevre, Şehircilik ve İklim Değişikliği Bakanlığına ileterek resmi \"Uygunluk Belgesini\" temin et"
    ]
  },
  {
    "id": "havacilik_rvsm_ve_altimetre_capraz_karsilastirma",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "rvsm azaltılmış dikey ayırma minimumu fl290 fl410",
      "birinci ve ikinci altimetre çapraz kontrolü 200 feet fark",
      "otomatik irtifa kontrol sistemi ap altitude hold",
      "standart altimetre ayarı 1013 hpa 29 92 inhg geçiş irtifası",
      "tcass uyarısı ve irtifa sapma raporlama prosedürü"
    ],
    "baslik": "RVSM Operasyonu: FL290-FL410 Dikey Ayırma, 1013 QNE & Altimetre Toleransı",
    "ikon": "✈️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Tırmanış & Seyir (Cruising) Fazı",
    "akilliFisilti": "✈️ RVSM hava sahasında Kaptan ve FO altimetreleri arasındaki fark azami 200 ft olmalı; Geçiş İrtifasında (Transition Altitude) standart 1013 hPa / 29.92 InHg bağlanmalıdır.",
    "oncedenYapilacaklar": [
      "Meydan kalkış öncesinde her iki primer altimetrenin meydan rakımıyla toleransını (maks 75 ft) doğrula",
      "Geçiş irtifası geçilirken altimetreleri Standart Basınca (QNE - 1013.25 hPa) bağlayıp sesli teyit et",
      "FL290 üzerine çıkıldığında otomatik irtifa tutma (Altitude Hold) ve irtifa ikaz sisteminin devrede olduğunu teyit et",
      "Seyir süresince saat başı primer altimetreler arasındaki farkı kaydedip 200 ft aşımında ATC'ye RVSM ihlali bildir"
    ]
  },
  {
    "id": "havacilik_etops_yedek_meydan_ve_yakit_senaryosu",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "etops çift motorlu uçak menzil uzatma standardı",
      "etops en-route alternate yedek meydan hava durumu",
      "tek motor kritik yakıt hesabı critical fuel scenario",
      "etops yetki süresi 120 dakika 180 dakika limitleri",
      "uçuş planı ofp etops giriş eep ve çıkış exp noktaları"
    ],
    "baslik": "ETOPS Operasyonu: Kritik Yakıt Senaryosu, EEP/EXP Giriş-Çıkış & Yedek Meydanlar",
    "ikon": "🛫",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Uçuş Öncesi Brifing & Okyanus Aşırı Uçuş",
    "akilliFisilti": "🛫 ETOPS uçuş planında (120/180 dk) EEP giriş noktasından önce seçilen ETOPS En-Route Alternate meydanlarının hava koşullarının limit üstü olduğu teyit edilmelidir.",
    "oncedenYapilacaklar": [
      "Uçuş harekat planında (OFP) ETOPS Giriş Noktası (EEP) ve ETOPS Çıkış Noktası (EXP) koordinatlarını incele",
      "Seçilen yedek meydanların TAF/METAR raporlarında tavan ve görüşün ETOPS planlama minimumlarının üzerinde olduğunu teyit et",
      "Tek motor arızası + kabin basınç kaybı (Driftdown) durumunda kritik yakıt rezerv miktarını doğrula",
      "Uçak ETOPS teknik log defterinde sistem yedekliliklerinin (APU, Jeneratör, Hidrolik) faal olduğunu denetle"
    ]
  },
  {
    "id": "havacilik_deicing_antiicing_holdover_time_hot_ve_tip4",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "uçak buz çözme de-icing tip 1 sıvı sıcak yıkama",
      "anti-icing tip 4 sıvı yeşil holdover time hot hesabı",
      "kalkış öncesi temiz uçak konsepti clean aircraft concept",
      "hot süresi aşımı ve pre-takeoff contamination check",
      "kanat hücum kenarı ve kuyruk donma buzlanma kontrolü"
    ],
    "baslik": "Uçuş Emniyeti: De-Icing / Anti-Icing (Tip I & Tip IV), HOT Süresi & Temiz Uçak Kuralı",
    "ikon": "❄️",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Kış Operasyonu / De-Icing İstasyonu",
    "akilliFisilti": "❄️ Anti-Icing Tip IV sıvı uygulandığında Holdover Time (HOT) süresi başlatılır; kalkış bu süre dolmadan yapılmalı, aksi halde yeniden De-Icing uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "De-Icing pedinde sıcak Tip I sıvısıyla kanat, gövde ve kuyruk yüzeylerindeki don/kar birikintilerini temizlet",
      "Anti-Icing koruması için Tip IV sıvısının püskürtülmeye başlandığı saati kokpitte kaydederek HOT tablosunu aç",
      "Dış ortam sıcaklığı ve yağış türüne (Hafif Kar/Dondurucu Yağmur) göre azami koruma süresini (HOT) hesapla",
      "Kalkış öncesi kabin veya kokpitten kanat üstü temizliğini (Pre-Takeoff Contamination Check) gözle doğrula"
    ]
  },
  {
    "id": "havacilik_tcas_resolution_advisory_ra_ve_kaza_raporlama",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "tcas trafik uyarı ve çarpışma önleme sistemi",
      "tcas resolution advisory ra climb descend kaçınma manevrası",
      "otopilot devreden çıkarma ve tcas fly-to green band",
      "atc hava trafik kontrolörüne tcas ra bildirimi",
      "uçuş emniyet olayı asr air safety report formu doldurma"
    ],
    "baslik": "TCAS RA: Çarpışma Önleme Manevrası (Fly-To), Otopilot Ayrılması & ASR Raporu",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Havadaki Trafik Çatışması Anı",
    "akilliFisilti": "⚠️ TCAS Resolution Advisory (RA) ikazında ATC talimatı derhal bırakılır, otopilot kapatılarak PFD'deki yeşil kaçınma bandına manuel uçulur ve ATC'ye bildirilir.",
    "oncedenYapilacaklar": [
      "TCAS \"CLIMB\" veya \"DESCEND\" sesli ikazı duyulduğu anda otopilotu ve otomatik gazı (Autothrottle) devreden çıkar",
      "Uçuş kumandasını hızla PFD ekranındaki yeşil dikey hız bandına getirerek dikey kaçınma manevrasını yap",
      "Telsizden ivedilikle \"TCAS RA\" çağrısı yaparak ATC'yi rotadan sapma konusunda anlık bilgilendir",
      "Çatışma sonlanıp \"Clear of Conflict\" duyulduğunda tahsisli irtifaya dön ve iniş sonrası Air Safety Report (ASR) doldur"
    ]
  },
  {
    "id": "havacilik_loadsheet_weight_and_balance_ve_trim_ayari",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "yük ve denge formu loadsheet ağırlık merkezi cg",
      "sıfır yakıt ağırlığı zfw ve maksimum kalkış ağırlığı mtow",
      "yolcu bagaj dağılımı kargo ambarı trim hesabı mac",
      "fmc perf init kalkış ağırlığı ve flap konfigürasyonu",
      "yatay stabilize ths kalkış trim açısı derece ayarı"
    ],
    "baslik": "Uçuş Öncesi: Loadsheet (Ağırlık ve Denge), %MAC, MTOW & Kalkış Trim Ayarı",
    "ikon": "⚖️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kapı Kapanışı & Motor Çalıştırma Öncesi",
    "akilliFisilti": "⚖️ Nihai Loadsheet onaylanarak Sıfır Yakıt Ağırlığı (ZFW), Kalkış Ağırlığı (TOW) ve Ağırlık Merkezi (%MAC) FMC'ye girilmeli, THS kalkış trim açısı ayarlanmalıdır.",
    "oncedenYapilacaklar": [
      "Yer harekat görevlisinden gelen Nihai Yük Bildirim Formundaki (Final Loadsheet) yolcu ve kargo dağılımını kontrol et",
      "Hesaplanan Ağırlık Merkezinin (%MAC) kalkış ve iniş zarfı sınırları içerisinde olduğunu doğrula",
      "FMC / MCDU sistemine ZFW, Block Fuel ve Flap seçimini girerek V1, VR, V2 referans kalkış süratlerini hesaplat",
      "Loadsheet'te belirtilen Kalkış Trimi (THS - Trimmable Horizontal Stabilizer) derecesini kokpit kumandasından set et"
    ]
  },
  {
    "id": "denizcilik_psc_paris_mou_denetimi_ve_yangin_damperleri",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "liman devleti denetimi psc port state control paris mou",
      "yoğunlaştırılmış odak denetimi cic yangın emniyeti solas",
      "otomatik yangın damperleri ve acil durum yangın pompası",
      "can filikası serbest bırakma mekanizması lifeboat drill",
      "psc tutulma detention önleme ve eksiklik raporu form a b"
    ],
    "baslik": "PSC Denetimi: Paris MoU, Yangın Damperleri, Acil Yangın Pompası & Can Filikası",
    "ikon": "⚓",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Limana Varış Öncesi PSC Hazırlığı",
    "akilliFisilti": "⚓ Paris MoU PSC denetiminde geminin tutulmasını (Detention) önlemek için acil yangın pompası, yangın damperleri ve can filikası serbest bırakma sistemi yerinde test edilmelidir.",
    "oncedenYapilacaklar": [
      "Gemi bacasındaki ve makine dairesindeki havalandırma yangın damperlerinin manuel ve pnömatik kapandığını test et",
      "Acil durum yangın pompasını (Emergency Fire Pump) çalıştırarak iki nozuldan yeterli deniz suyu basıldığını doğrula",
      "Can filikası serbest bırakma kancalarını (On-Load Release) ve matafora tel halatlarının sertifikalarını kontrol et",
      "SOLAS/MARPOL sertifikalarının, GMDSS telsiz bataryalarının ve ISM Dokümantasyonunun Form A/B listesini gözden geçir"
    ]
  },
  {
    "id": "denizcilik_balast_suyu_bwm_d2_ve_uv_klorlama_sistemi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "balast suyu yönetimi sözleşmesi bwm konvansiyonu d-2",
      "balast suyu arıtma sistemi bwts uv filtrasyon klorlama",
      "balast kayıt defteri ballast water record book bwsb",
      "tro toplam artık oksitleyici nötralizasyonu sodyum tiyosülfat",
      "liman balast basma operasyonu ve debi log kaydı"
    ],
    "baslik": "BWM Konvansiyonu: D-2 Balast Suyu Arıtma (BWTS), UV Filtrasyon & Kayıt Defteri",
    "ikon": "🌊",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Liman Balast Alma / Tahliye Operasyonu",
    "akilliFisilti": "🌊 IMO BWM D-2 standardı uyarınca tüm balast suyu alma ve tahliye operasyonları BWTS ünitesinden geçirilerek Balast Kayıt Defterine (BWRB) koordinatlarıyla yazılmalıdır.",
    "oncedenYapilacaklar": [
      "Balast basma öncesinde BWTS otomatik UV dozu veya elektro-klorlama jeneratörünü devreye al",
      "Elektro-klorlama sisteminde deşarj öncesi TRO (Toplam Artık Oksitleyici) nötralizasyonunun <0.1 ppm olduğunu ölç",
      "Balast operasyonunun başlama-bitiş zamanını, tank numarasını, m³ hacmini ve GPS koordinatlarını BWRB defterine işle",
      "BWTS arıtma sisteminin sensör kalibrasyon ve filtre ters yıkama kayıtlarını denetim için hazır tut"
    ]
  },
  {
    "id": "denizcilik_colreg_catisma_rotasi_ve_arpa_radar_takibi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "denizde çatışmayı önleme tüzüğü colreg kuralları",
      "arpa radar hedef takibi cpa ve tcpa emniyet mesafesi",
      "aykırı geçen tekneler sancaktan gelen gemiye yol verme",
      "dar kanal ve trafik ayırım düzeni tss seyir kuralları",
      "sisli havada kısıtlı görüşte sesli işaretler düdük çalma"
    ],
    "baslik": "COLREG & Seyir: ARPA Radar CPA/TCPA Hesabı, Sancak Önceliği & TSS Düzeni",
    "ikon": "🧭",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Köprüüstü Vardiyası & Çatışma Riski Anı",
    "akilliFisilti": "🧭 ARPA radarında hedef teknenin CPA (En Yakın Yaklaşma Mesafesi) ve TCPA süresi hesaplanmalı; çatışma rotasında COLREG Kural 15 uyarınca erkenden sancaktan neta olunmalıdır.",
    "oncedenYapilacaklar": [
      "ARPA radar ve ECDIS üzerinde diğer gemileri hedefe alarak CPA (< 1.5 NM) ve TCPA (< 15 dk) alarmlarını kur",
      "Kesişen rotalarda sancak tarafınızdan yaklaşan gemiye yol verme yükümlüsü (Give-Way Vessel) olduğunu teyit et",
      "Trafik Ayırım Düzeninde (TSS) şerit yönüne paralel seyret ve genel trafik akışına engel olacak manevralardan kaçın",
      "Kısıtlı görüş şartlarında otomatik sis düdüğünü (2 dakikada bir 1 uzun düdük) devreye al"
    ]
  },
  {
    "id": "denizcilik_ana_makine_supurme_havasi_ve_silindir_yaglama",
    "category": "ev_teknik",
    "domain": "DENIZCILIK",
    "keywords": [
      "2 zamanlı gemi ana dizel makinesi silindir gömleği aşınması",
      "süpürme havası manifoldu yangın tespiti scavenge fire",
      "silindir yağı bn bazı numarası feed rate besleme oranı",
      "krank mili defleksiyon ölçümü ve ana yatak sıcaklıkları",
      "ağır yakıt hfo seperatör sıcaklığı 98 derece ve viskozite"
    ],
    "baslik": "Gemi Makineleri: Süpürme Havası Yangın Emniyeti, Silindir Yağlama (BN) & Defleksiyon",
    "ikon": "⚙️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Makine Dairesi Vardiyası & Periyodik Bakım",
    "akilliFisilti": "⚙️ Süpürme havası sıcaklık artışında Scavenge Yangını prosedürü uygulanmalı; kükürt oranına uygun Baz Numaralı (BN) silindir yağı dozajı ayarlanmalıdır.",
    "oncedenYapilacaklar": [
      "Süpürme manifoldu sıcaklık sensörlerini izle; ani sıcaklık yükselmesinde yakıtı kesip CO2/buhar söndürmeyi hazırla",
      "Kullanılan yakıtın kükürt yüzdesine göre silindir yağlama pompası Feed Rate (g/kWh) ayarını optimize et",
      "Liman kalışında krank şaftı çevirme dişlisi (Turning Gear) ile krank mili defleksiyon komparatör ölçümünü al",
      "HFO yakıt seperatörü çıkış sıcaklığını 98°C'de sabit tutarak viskozite kontrolörünün 12-14 cSt sağladığını doğrula"
    ]
  },
  {
    "id": "denizcilik_marpol_annex_6_dusuk_kukurt_ve_scrubber_kaydi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "marpol annex 6 hava kirliliğini önleme kuralları",
      "düşük kükürtlü yakıt vlsfo yüzde 0 50 ve seca yüzde 0 10",
      "bunker teslim notu bdn ve marpol yakıt şahit numunesi",
      "egzoz gazı temizleme sistemi egcs scrubber ph ve pah ölçümü",
      "yakıt değişim prosedürü fuel changeover calculator log defteri"
    ],
    "baslik": "MARPOL Annex VI: %0.50 VLSFO / %0.10 SECA Kükürt Limiti, BDN & Scrubber",
    "ikon": "🚢",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Yakıt İkmali (Bunker) & SECA Bölgesi Girişi",
    "akilliFisilti": "🚢 MARPOL Ek VI gereği küresel kükürt limiti %0.50, ECA bölgelerinde %0.10'dur; BDN ve mühürlü şahit yakıt numuneleri en az 1 yıl gemide muhafaza edilmelidir.",
    "oncedenYapilacaklar": [
      "Bunker ikmali sırasında teslim edilen Bunker Delivery Note (BDN) belgesindeki kükürt oranını teyit et",
      "MARPOL şahit numune şişesini ikmalciyle birlikte mühürleyip numune dolabında 12 ay sakla",
      "SECA bölgesine (Kuzey Denizi, Baltık) girmeden önce yakıt değişim (Changeover) hesaplamasını yapıp Makine Jurnaline yaz",
      "Scrubber (Egzoz Yıkama) donanımlı gemilerde yıkama suyu deşarj pH, PAH ve bulanıklık sürekli analizör kayıtlarını arşivle"
    ]
  },
  {
    "id": "gumruk_gtip_siniflandirma_ve_baglayici_tarife_btb",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "gümrük tarife istatistik pozisyonu gtip 12 haneli",
      "bağlayıcı tarife bilgisi btb başvurusu e-devlet",
      "tarife cetveli izahnamesi genel yorum kuralları gyorum",
      "laboratuvar tahlil raporu kimyasal madde gtip tespiti",
      "gtip uyuşmazlığı ek tahakkuk ve ceza kararı itirazı 242"
    ],
    "baslik": "Gümrük Hukuku: 12 Haneli GTİP Tespiti, Bağlayıcı Tarife (BTB) & Gümrük Kanunu m.242",
    "ikon": "📦",
    "renk": "#E0F2FE",
    "varsayilanZaman": "İthalat Öncesi Tarife Tespiti & İtiraz",
    "akilliFisilti": "📦 12 haneli GTİP tespiti Tarife Cetveli İzahnamesi ve Genel Yorum Kurallarına göre yapılır; tereddütlü eşyada 3 yıl geçerli resmi Bağlayıcı Tarife Bilgisi (BTB) alınmalıdır.",
    "oncedenYapilacaklar": [
      "İthal edilecek ürünün teknik veri föyü (TDS), bileşen oranları ve kullanım amacına göre 12 haneli GTİP kodunu belirle",
      "Riskli ve yüksek vergili eşyalar için Gümrükler Genel Müdürlüğüne numuneyle birlikte BTB başvurusunda bulun",
      "Gümrük idaresi tarafından yapılan ek vergi tahakkuku ve cezalara karşı GK m.242 uyarınca 15 gün içinde İtiraz Dilekçesi ver",
      "Gümrük laboratuvarı tahlil sonuçlarına karşı 15 gün içinde Bölge Laboratuvarına İkinci Tahlil talebinde bulun"
    ]
  },
  {
    "id": "gumruk_dahilde_isleme_rejimi_dir_kapanis_ve_ikincil_islem",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "dahilde işleme izin belgesi diib d1 d3 kapanış",
      "şartlı muafiyet sistemi gümrük vergisi teminat mektubu",
      "hammadde sarfiyat tablosu ve hammadde fire oranı",
      "ikincil işlem görmüş ürün beyanı ve serbest dolaşıma giriş",
      "diib taahhüt hesabı kapatma müracaatı ticaret bakanlığı"
    ],
    "baslik": "DİR & DİİB: Dahilde İşleme Kapanışı, İkincil İşlem Görmüş Ürün & Teminat İadesi",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Belge Süresi Sonu & Taahhüt Kapatma",
    "akilliFisilti": "📑 DİİB kapsamında vergisi teminata bağlanarak ithal edilen hammadde mamul olarak ihraç edildikten sonra belge süresi bitiminden itibaren 3 AY içinde kapatma müracaatı yapılmalıdır.",
    "oncedenYapilacaklar": [
      "İthalat ve İhracat Gümrük Beyannamelerini (GÇB) DİİB satır kodlarıyla eşleştirerek gerçekleşme tablosunu oluştur",
      "Üretim prosesinde ortaya çıkan fire ve ikincil işlem görmüş ürünlerin gümrük vergilerini ödeyerek serbest dolaşıma sok",
      "Ticaret Bakanlığı Destek Yönetim Sistemi (DYS) üzerinden Hammadde Sarfiyat Tablosuyla Taahhüt Kapatma başvurusu yap",
      "Kapatma yazısı tebliğ edildikten sonra ilgili Gümrük Müdürlüğünden bloke edilen Banka Teminat Mektubunu çözdür"
    ]
  },
  {
    "id": "gumruk_mense_sahadetnamesi_eur1_tedarikci_beyani",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "mense sahadetnamesi certificate of origin menşe kuralı",
      "eur 1 ve eur med dolaşım belgesi gümrük vizesi",
      "avrupa birliği pan avrupa akdeniz kümülasyonu",
      "uzun dönem tedarikçi beyanı ltsd fatura beyanı",
      "tercihli ticaret anlaşması sıfır gümrük vergisi menşe ispatı"
    ],
    "baslik": "Dış Ticaret Menşe: EUR.1 / EUR-MED Dolaşım Belgesi, Tedarikçi Beyanı & Menşe Kuralları",
    "ikon": "🌍",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Gümrük Çıkış / Giriş Beyannamesi Tescili",
    "akilliFisilti": "🌍 Tercihli ticaret anlaşmalarında indirimli/sıfır gümrük vergisinden yararlanmak için EUR.1 / EUR-MED dolaşım belgesi gümrük vizesiyle tescil edilmelidir.",
    "oncedenYapilacaklar": [
      "İhraç edilecek ürünün yerli girdi oranını ve Gümrük Tarife Pozisyon Değişimi (CTH) kuralını sağlayıp sağlamadığını hesapla",
      "MEDOS sistemi üzerinden elektronik EUR.1 / EUR-MED belgesini düzenleyip Ticaret Odası onayına gönder",
      "Gümrük memurunun e-İmza ile onayladığı dolaşım belgesini alıcı ülke gümrüğüne ibraz edilmek üzere ihracat evraklarına ekle",
      "Geriye dönük menşe sonradan kontrol taleplerine (Post-Clearance) karşı Tedarikçi Beyanlarını 3 yıl arşivle"
    ]
  },
  {
    "id": "gumruk_laboratuvar_tahlili_ve_ikinci_analiz_itirazi",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "gümrük tahlil raporu gümrük laboratuvarı kimyager",
      "ikinci tahlil talebi gümrük kanunu m 197",
      "şahit numune açılması ve bölge laboratuvarı analizi",
      "itiraz süresi tahlil sonucunun tebliğinden itibaren 15 gün",
      "eşyanın tahlil sonucuna kadar teminatla teslimi gümrükleme"
    ],
    "baslik": "Gümrük Tahlili: Laboratuvar Analizi, 15 Günlük İkinci Tahlil İtirazı & Şahit Numune",
    "ikon": "🧪",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Tahlil Sonucu Tebliğinden İtibaren 15 Gün",
    "akilliFisilti": "🧪 Gümrük laboratuvarı tahlil raporuna itiraz, sonucun tebliğinden itibaren 15 GÜN içinde yapılmalı; mühürlü şahit numuneyle ikinci tahlil talep edilmelidir.",
    "oncedenYapilacaklar": [
      "Gümrük laboratuvarından çıkan tahlil raporu ile beyan edilen GTİP/ürün spektini karşılaştır",
      "Tahlil sonucunda vergi farkı veya tarife değişikliği varsa 15 gün içinde Gümrük Müdürlüğüne İkinci Tahlil dilekçesi ver",
      "Gümrükte saklanan 1. Şahit Numunenin mühür bütünlüğünü kontrol ederek Üst Laboratuvara sevk edilmesini sağla",
      "Eşyanın limanda bekleme ardiye/demuraj maliyetini önlemek için fark vergileri teminata bağlayarak eşyayı çek"
    ]
  },
  {
    "id": "gumruk_ibkb_ihracat_bedeli_kabul_belgesi_180_gun_kambiyo",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "ihracat bedeli kabul belgesi ibkb tcmb döviz bozdurma",
      "türk parası kıymetini koruma hakkında 32 sayılı karar",
      "180 günlük ihracat bedeli getirme yasal süresi",
      "ihracat bedelinin yüzde 30 40 ını merkez bankasına satma zorunluluğu",
      "vergi dairesi kambiyo ihbarı ve 90 günlük ek terkin süresi"
    ],
    "baslik": "Kambiyo & İBKB: 180 Günlük İhracat Bedeli Getirme, TCMB Döviz Satışı & Terkin",
    "ikon": "💵",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Fiili İhraç Tarihinden İtibaren 180 Gün",
    "akilliFisilti": "💵 İhracat bedelleri fiili ihraçtan itibaren 180 gün içinde yurda getirilmeli, bankada İBKB düzenletilerek mevzuat gereği belirlenen TCMB döviz satışı yapılmalıdır.",
    "oncedenYapilacaklar": [
      "GÇB fiili ihraç tarihini baz alarak yurtdışı alıcıdan gelen SWIFT transferini aracı bankaya bildir",
      "Yürürlükteki TCMB Genelgesi oranında (%30-40) döviz bedelini Merkez Bankasına satıp İBKB Belgesi düzenlet",
      "180 gün içinde getirilemeyen ihracat bedelleri için Vergi Dairesi Başkanlığına mücbir sebep başvurusuyla 90 günlük ek süre al",
      "30.000 USD altındaki açık hesap ihracat bakiyelerinin terkin işlemlerini banka aracılığıyla kapat"
    ]
  },
  {
    "id": "teknik_common_rail_enjektor_kacak_ve_ima_kodlama",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "common rail dizel enjektör geri dönüş kaçak testi",
      "enjektör kodlama ima qr kod ecu tanıtma",
      "yüksek basınç pompası 2000 bar rail basınç sensörü",
      "dizel vuruntusu ve siyah duman enjektör işemesi",
      "enjektör pulu bakır sızdırmazlık pulu değişimi"
    ],
    "baslik": "Dizel Mekatronik: Common-Rail Enjektör Geri Dönüş Testi, IMA Kodlama & Rail Basıncı",
    "ikon": "🔧",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Enjektör Değişimi & Vuruntu Teşhisi",
    "akilliFisilti": "🔧 Common-Rail enjektör montajında yeni bakır pul takılmalı, yüzey torklanmalı ve enjektör üstündeki IMA kalibrasyon kodu arıza tespit cihazıyla ECU'ya tanıtılmalıdır.",
    "oncedenYapilacaklar": [
      "Geri dönüş ölçüm tüplerini (Manifold test kiti) enjektörlere bağlayarak rölantide kaçak miktarını mililitre cinsinden karşılaştır",
      "Arızalı enjektörü söküp yuvasını özel rayba aparatı ile karbon birikintilerinden temizle",
      "Yeni enjektörü orijinal kalınlıkta sıfır bakır pulla takarak üretici tork değerinde torkla",
      "Diyagnostik cihazla motor beynine (ECU) girip her silindire ait 6-8 haneli IMA/QR kodunu yaz"
    ]
  },
  {
    "id": "teknik_otomatik_sanziman_tork_konvertoru_ve_flush_yag",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "otomatik şanzıman dinamik yağ değişim cihazı atf flush",
      "tork konvertörü kilitleme debriyajı lock-up sarsıntısı",
      "şanzıman valf gövdesi mekatronik solenoid basınç testi",
      "şanzıman adaptasyonu kavrama noktası sıfırlama",
      "şanzıman filtresi ve mıknatıslı karter temizliği"
    ],
    "baslik": "Şanzıman Mekatronik: ATF Dinamik Yağ Değişimi (Flush), Tork Konvertörü & Adaptasyon",
    "ikon": "🚗",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Periyodik 60.000 km Şanzıman Bakımı",
    "akilliFisilti": "🚗 Otomatik şanzıman yağı dinamik Flush makinesiyle tork konvertörü dahil %100 değiştirilmeli; işlem sonrası arıza tespit cihazıyla yol adaptasyonu yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Dinamik şanzıman yıkama makinesini soğutucu hatlarına bağlayarak eski yağı emerken aynı anda taze ATF pompalat",
      "Şanzıman karterini söküp iç mıknatıslardaki metal çapaklarını temizle ve iç filtreyi yenile",
      "Şanzıman yağ sıcaklığını (35-45°C) diyagnostik cihazdan okuyarak seviye taşma tapasından yağ seviyesini doğrula",
      "Vites geçiş adaptasyonlarını sıfırlayıp üretici protokolüne göre test sürüşünde vitesleri kademeli öğret"
    ]
  },
  {
    "id": "teknik_dpf_diferansiyel_basinc_ve_servis_rejenerasyonu",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "dizel partikül filtresi dpf kurum doluluk gramı",
      "dpf diferansiyel basınç sensörü mbar ölçümü",
      "cihazla dpf servis rejenerasyonu 600 derece egzoz sıcaklığı",
      "dpf temizleme sıvısı kimyasal yıkama makinesi",
      "düşük küllü low-saps motor yağı dpf ömrü"
    ],
    "baslik": "Egzoz Emisyon: DPF Kurum Yükü, Diferansiyel Basınç & Servis Rejenerasyonu",
    "ikon": "💨",
    "renk": "#FED7AA",
    "varsayilanZaman": "DPF İkaz Lambası Yandığında & Rejenerasyon",
    "akilliFisilti": "💨 DPF kurum doluluğu > %80 olduğunda araç sürüş rejenerasyonu yapamaz; statik servis rejenerasyonu açık alanda 600°C egzoz sıcaklığı güvenliğiyle başlatılmalıdır.",
    "oncedenYapilacaklar": [
      "Diyagnostik cihazla DPF kurum yükünü (Soot Mass - gram) ve rölanti Diferansiyel Basıncını (maks 10-15 mbar) oku",
      "Motor yağı seviyesinin yükselmediğini (mazot karışması kontrolü) ve yakıt deposunun en az yarım dolu olduğunu doğrula",
      "Aracı yanıcı maddelerden uzak açık alana çekip cihaz üzerinden \"Statik DPF Servis Rejenerasyonunu\" başlat",
      "Rejenerasyon tamamlanınca motor yağını Low-SAPS (Düşük Küllü) C3/C4 onaylı yağ ile yenile"
    ]
  },
  {
    "id": "teknik_lazerli_rot_balans_kamber_kaster_toe_ayari",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "3d lazerli rot ayarı rot balans ön düzen ayarı",
      "kamber açısı kaster açısı ve toe-in toe-out ayarı",
      "direksiyon açı sensörü sas sıfırlama ve kalibrasyonu",
      "lastik düzensiz omuz aşınması ve çekme problemi",
      "salıncak burçları rot başı rotil boşluk kontrolü"
    ],
    "baslik": "Şasi & Ön Düzen: 3D Lazerli Rot-Balans, Kamber/Kaster & SAS Sensör Sıfırlama",
    "ikon": "🎯",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Lastik Değişimi & Süspansiyon Bakımı",
    "akilliFisilti": "🎯 Ön düzen ayarı öncesinde rot başı ve salıncak boşlukları kontrol edilmeli; rot ayarı bitiminde Direksiyon Açı Sensörü (SAS) sıfırlanmalıdır.",
    "oncedenYapilacaklar": [
      "Aracı rot liftine alıp ön takım bilye, rotil ve rot kollarında mekanik boşluk olmadığını levye ile sına",
      "4 tekerleğe 3D hedef aynalarını takıp lazer kameralarla Kamber, Kaster ve Total Toe açılarını ölç",
      "Rot kollarından Toe açısını ve ayarlıysa kamber cıvatalarını fabrika yeşil tolerans değerlerine getir",
      "ESP/ABS kontrol ünitesine bağlanarak Direksiyon Açı Sensörünü (Steering Angle Sensor - 0.0°) sıfırla"
    ]
  },
  {
    "id": "teknik_hibrit_elektrikli_arac_servis_fisi_ve_0v_testi",
    "category": "arac_ulasim",
    "domain": "OTOMOTIV",
    "keywords": [
      "elektrikli ve hibrit araç yüksek gerilim servisi",
      "yüksek gerilim servis fişi service plug sökme emniyeti",
      "1000v izole eldiven ark yüz siperliği ve kedi bastonu",
      "sıfır gerilim izolasyon testi multimetre cat 4 1000v",
      "kondansatör deşarj bekleme süresi 10 dakika"
    ],
    "baslik": "Elektrikli Araç Emniyeti: Yüksek Gerilim Servis Fişi (MSD), 0-Volt Testi & CAT IV",
    "ikon": "⚡",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Elektrikli Araç Bakım & Akü Müdahalesi",
    "akilliFisilti": "⚡ Yüksek gerilimli (400V/800V) araçlarda önce 12V akü kutup başı ayrılır, Servis Fişi (MSD) sökülür, 10 dk kondansatör deşarjı beklenir ve 0 Volt testi yapılır.",
    "oncedenYapilacaklar": [
      "Çalışma alanını yüksek gerilim emniyet bariyeriyle çevirip 1000V izole eldiven ve ark siperliğini tak",
      "Aracın kontağını kapatıp 12V akü şasesini ayır ve turuncu Manuel Servis Fişini (Service Plug / MSD) söküp kilitle",
      "İnvertör içindeki yüksek gerilim kondansatörlerinin kendiliğinden deşarj olması için en az 10 dakika bekle",
      "CAT IV 1000V çift problu gerilim test cihazı ile invertör terminallerinde 0 Volt olduğunu teyit et"
    ]
  },
  {
    "id": "havacilik_ils_cat3b_dusuk_gorus_lvo_ve_rvr",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "ils aletli iniş sistemi kategori 3 cat 3b",
      "düşük görüş operasyonları lvo low visibility procedures",
      "pist görüş mesafesi rvr 75 metre karar yüksekliği dh 50 ft",
      "otomatik iniş autoland çift otopilot dual channel",
      "rollout yön kontrolü ve pist terk taksi rehber ışıkları"
    ],
    "baslik": "Kritik İniş: ILS CAT IIIb, Düşük Görüş (LVO), Autoland & RVR 75m",
    "ikon": "🛬",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Sisli Hava / Düşük Görüşte Son Yaklaşma",
    "akilliFisilti": "🛬 CAT IIIb yaklaşmasında her iki otopilot (Dual Channel) devrede olmalı; RVR pist görüşü minimum 75m üzerinde teyit edilerek Autoland ve Rollout icra edilmelidir.",
    "oncedenYapilacaklar": [
      "Meydan LVO (Düşük Görüş Usulleri) ilan ettiğinde CAT IIIb yaklaşma brifingini ve DH/Alert Height ayarını tamamla",
      "Her iki otopilotu (CMD A + CMD B) devreye alarak Autoland durum göstergesinin (LAND 3 / FLARE) yeşile döndüğünü gör",
      "Pist RVR değerlerinin (Touchdown, Midpoint, Rollout) şirket operasyonel limitlerinin üzerinde olduğunu kuleyle doğrula",
      "Piste teker koyduktan sonra otopilotun Rollout modunda istikameti koruduğunu izle ve pisti terk ışıklarını takip et"
    ]
  },
  {
    "id": "havacilik_walkaround_dis_hat_pitot_statik_port_kontrol",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "uçuş öncesi dış hat harici kontrol walkaround checklist",
      "pitot tüpü ve statik port kılıf tıkanıklık kontrolü",
      "hücum kenarı slat flap kanat yüzeyi ve iniş takımı pinleri",
      "motor pallerinde fods kuş çarpması çentik çatlak kontrolü",
      "lastik diş derinliği ve fren aşınma indikatör pini"
    ],
    "baslik": "Harici Kontrol (Walkaround): Pitot/Statik Portlar, İniş Takımı Pinleri & Motor Palleleri",
    "ikon": "✈️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Kalkıştan 45 Dakika Önce (Uçak Başı)",
    "akilliFisilti": "✈️ Harici kontrolde (Walkaround) Pitot tüpü kılıflarının çıkarıldığı, statik portların açık olduğu ve iniş takımı emniyet pinlerinin toplandığı gözle teyit edilir.",
    "oncedenYapilacaklar": [
      "Burun kısmında Pitot tüpleri, AOA hücum açısı sensörleri ve Statik Port deliklerinin açık olduğunu denetle",
      "Ana iniş takımlarında emniyet kilit pinlerinin (Gear Pins) çıkarıldığını ve fren aşınma pim boyunu kontrol et",
      "Jet motoru fan pallerini (Fan Blades) döndürerek yabancı madde hasarı (FOD) ve çatlak kontrolü yap",
      "Kanat hücum kenarı Slat/Flap mekanizmalarını ve yakıt tahliye drenaj vanalarında sızıntı olmadığını doğrula"
    ]
  },
  {
    "id": "havacilik_windshear_ruzgar_kirilmasi_ve_toga_kacinma",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "windshear rüzgar kırılması ikazı kokpit uyarısı",
      "reaktif ve prediktif windshear pws radar uyarısı",
      "windshear kaçınma manevrası toga maksimum itki",
      "lövyeyi çekme pitch 15 derece ve kanat konfigürasyonunu koruma",
      "yere yakınlık uyarı sistemi egpws terrain pull up"
    ],
    "baslik": "Acil Durum: Windshear Kaçınma Manevrası, TOGA Maksimum İtki & Pitch 15°",
    "ikon": "⚠️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kalkış / İnişte Windshear Uyarısı Anı",
    "akilliFisilti": "⚠️ \"WINDSHEAR\" sesli ikazı alındığında derhal TOGA butonlarına basılarak motorlara azami itki verilir, lövye 15° çekilir ve konfigürasyon (Flap/Gear) ASLA değiştirilmez.",
    "oncedenYapilacaklar": [
      "İkaz anında otopilotu devreden çıkarıp gaz kollarını (Thrust Levers) en ileri azami TOGA pozisyonuna it",
      "Uçağın burnunu sürat göstergesine bakılmaksızın Alpha Margin limitinde 15° yukarıya (Pitch Up) çek",
      "İrtifa kazanılana kadar iniş takımlarını ve flap kolunu pozisyonunda sabit tut (sürükleme değişimini önle)",
      "Rüzgar kırılması bölgesi terk edilip pozitif tırmanış sağlandığında normal tırmanış profiline dön ve ATC'ye rapor et"
    ]
  },
  {
    "id": "havacilik_crm_ve_tehdit_hata_yonetimi_tem_brifingi",
    "category": "resmi",
    "domain": "HAVACILIK",
    "keywords": [
      "ekip kaynak yönetimi crm kuralları kokpit disiplini",
      "tehdit ve hata yönetimi tem brifingi uçuş öncesi",
      "steril kokpit kuralı 10000 feet altı gereksiz konuşma yasağı",
      "standart operasyonel usuller sop ve çapraz kontrol",
      "kaptan ve fo arasında durumsal farkındalık ve açık iletişim"
    ],
    "baslik": "Uçuş Disiplini: CRM / TEM Brifingi, Steril Kokpit Kuralı (10.000 ft) & SOP",
    "ikon": "🧑‍✈️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Uçuş Öncesi Kokpit Brifingi & Kritik Uçuş Fazı",
    "akilliFisilti": "🧑‍✈️ Kalkış brifinginde olası tehditler (Hava durumu, Notamlar, Meydan kısıtları) TEM ile konuşulmalı; 10.000 ft altında Steril Kokpit kuralı uygulanmalıdır.",
    "oncedenYapilacaklar": [
      "Kaptan ve İkinci Pilot uçuş öncesi rota üzerindeki CB bulutları, türbülans ve NOTAM risklerini analiz et",
      "Motor arızası kalkış vazgeçme (RTO) karar hızı (V1) öncesi ve sonrası görev paylaşımını brife et",
      "Taksi, kalkış ve 10.000 ft irtifa altına kadar kokpitte uçuş harici tüm konuşmaları (Steril Kokpit) yasakla",
      "Uçuş aletleri ve otopilot mod değişikliklerinde (FMA) sesli teyit (Readback / Cross-check) disiplinini koru"
    ]
  },
  {
    "id": "havacilik_fuel_jettison_yakit_bosaltma_ve_mlw_hesabi",
    "category": "arac_ulasim",
    "domain": "HAVACILIK",
    "keywords": [
      "uçak yakıt boşaltma fuel jettison sistemi",
      "maksimum iniş ağırlığı mlw ve fazla yakıt tahliyesi",
      "acil geri dönüş overweight landing aşırı ağırlıkla iniş",
      "hava trafik kontrolü atc yakıt boşaltma irtifa ve sahası",
      "yakıt nozulları açma ve minimum rezerv yakıt koruma"
    ],
    "baslik": "Acil Durum: Fuel Jettison (Yakıt Boşaltma), MLW Sınırı & Overweight Landing",
    "ikon": "⛽",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kalkış Sonrası Acil Geri Dönüş Durumu",
    "akilliFisilti": "⛽ Kalkış sonrası acil iniş gerektiğinde MLW sınırını sağlamak için ATC tahsisli sahada ve 6000 ft üzerinde Fuel Jettison ile yakıt tahliye edilir.",
    "oncedenYapilacaklar": [
      "Uçağın mevcut ağırlığını hesaplayıp Maksimum İniş Ağırlığından (MLW) ne kadar fazla olduğunu belirle",
      "ATC'ye acil durum (PAN PAN / MAYDAY) bildirerek yakıt boşaltma hava sahası ve irtifası talep et",
      "Yakıt paneli üzerindeki Fuel Jettison anahtarlarını açarak hedef ağırlığa kadar otomatik boşaltmayı başlat",
      "Yakıt tahliyesinin rezerve yakıt seviyesinde (Standpipe koruması) otomatik durduğunu göstergelerden doğrula"
    ]
  },
  {
    "id": "denizcilik_demirleme_kaloma_ve_demir_taramasi_alarmi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "gemi demirleme manevrası kaloma miktarı su derinliği",
      "demir taraması anchor dragging radar gps nöbeti",
      "ırgat freni kavrama ve zincir kilidi kilit pimi",
      "fırtınalı havada çift demir veya makine hazır bekleme",
      "demir vardiyası çapraz kerteriz ve derinlik ölçümü"
    ],
    "baslik": "Gemi Manevrası: Demirleme, Kaloma Hesabı (6x Derinlik) & Demir Tarama Takibi",
    "ikon": "⚓",
    "renk": "#BFDBFE",
    "varsayilanZaman": "Demirleme Sahasına Giriş & Demir Nöbeti",
    "akilliFisilti": "⚓ Demirlerken derinliğin 5-7 katı kaloma (zincir baklası) denize verilmeli; GPS ve radar koruma çemberi kurularak Demir Taraması (Dragging) izlenmelidir.",
    "oncedenYapilacaklar": [
      "Demir atılacak mevkideki dip yapısını (kum/balçık), akıntıyı ve su derinliğini ECDIS haritasından tetkik et",
      "Başüstü ekibine kaç kilit kaloma (1 kilit = 27.5 metre) koyverileceğini bildirip ırgat frenini aç",
      "Demir tuttuğunda zincir borusuna (Hawse Pipe) zincir stoperini tak ve ırgatı devreden çıkar",
      "ECDIS ve ARPA radarda demirleme emniyet yarıçapını (Swing Circle) çizerek tarama alarmını kur"
    ]
  },
  {
    "id": "denizcilik_ism_sms_ic_denetim_ve_non_conformity_raporu",
    "category": "resmi",
    "domain": "DENIZCILIK",
    "keywords": [
      "ism kodu uluslararası emniyetli yönetim kodu sms",
      "dpa atanmış kişi designated person ashore iletişimi",
      "gemi iç denetimi uygunsuzluk raporu non-conformity ncr",
      "düzeltici önleyici faaliyet dpa şirket onay süreci",
      "doküman kontrolü güvenlik yönetim sistemi el kitabı"
    ],
    "baslik": "ISM Kodu: Gemi Emniyet Yönetimi (SMS), DPA İletişimi & NCR Uygunsuzluk",
    "ikon": "📜",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıllık ISM İç Denetimi & DPA Raporu",
    "akilliFisilti": "📜 ISM Kodu gereği gemideki tüm emniyet ve çevre prosedürleri SMS kılavuzuna uygun yürütülür; uygunsuzluklar (NCR) DPA (Atanmış Kişi) onayına sunulur.",
    "oncedenYapilacaklar": [
      "SMS (Safety Management System) el kitabındaki kontrol listelerine göre güverte ve makine jurnallerini denetle",
      "Gemide tespit edilen güvenlik ve çevre açıklarını \"Uygunsuzluk Raporu (NCR)\" formuna işle",
      "Şirket DPA yetkilisine resmi bildirimde bulunarak DÖF (Düzeltici Önleyici Faaliyet) termin süresi belirle",
      "Kaptanın yönetim gözden geçirme toplantısını zabitanla birlikte yaparak tutanağı şirket merkezine ilet"
    ]
  },
  {
    "id": "denizcilik_gmdss_vhf_dsc_kanal70_ve_epirb_sart_testi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "küresel deniz tehlike ve güvenlik sistemi gmdss",
      "vhf dsc kanal 70 sayısal seçmeli çağrı testi",
      "acil durum konum belirten telsiz vericisi epirb hidrostatik kilit",
      "sart radar arama kurtarma vericisi batarya süresi",
      "navtex meteoroloji seyir uyarısı mesaj çıktısı"
    ],
    "baslik": "GMDSS Haberleşme: VHF DSC Kanal 70, EPIRB Hidrostatik Kilit & SART Testi",
    "ikon": "📡",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Haftalık GMDSS Testi & Seyir Öncesi",
    "akilliFisilti": "📡 GMDSS cihazlarında haftalık DSC telsiz testi kıyı istasyonuyla yapılmalı; EPIRB cihazının batarya ve hidrostatik serbest bırakma kilidi kontrol edilmelidir.",
    "oncedenYapilacaklar": [
      "VHF/MF DSC cihazı ile en yakın Türk Radyo / Sahil Güvenlik istasyonuna \"Test Çağrısı\" göndererek alındı onayını al",
      "Köprüüstü kanadındaki EPIRB cihazının hidrostatik kilit pimi (HRU) geçerlilik tarihini ve kendi kendini testini (Self-Test) yap",
      "SART (Arama Kurtarma Radar Vericisi) cihazını test moduna alıp X-Band radarda 12 nokta ekosunu doğrula",
      "Navtex alıcısındaki seyir sahası (Navarea III) seyir ve fırtına uyarı mesajlarını çıktı alıp haritaya işle"
    ]
  },
  {
    "id": "denizcilik_tanker_inert_gas_igs_ve_cow_yikama",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "ham petrol tankeri inert gaz sistemi igs oksijen yüzde 5 altı",
      "ham petrolle tank yıkama cow crude oil washing",
      "tank içi hidrokarbon gaz konsantrasyonu ve patlama emniyeti",
      "güverte su sızdırmazlık vanası deck water seal ve p/v valfi",
      "isgott uluslararası petrol tankerleri güvenlik kılavuzu"
    ],
    "baslik": "Tanker Operasyonu (ISGOTT): İnert Gaz (O2 < %5), COW Yıkama & P/V Valfi",
    "ikon": "🛢️",
    "renk": "#FED7AA",
    "varsayilanZaman": "Tank Tahliyesi & COW Tank Yıkama Aşaması",
    "akilliFisilti": "🛢️ Ham petrol tankeri tahliyesinde tank içi O2 seviyesi %5'in altında tutulmalı; ISGOTT kurallarına uygun olarak COW (Crude Oil Washing) yıkanmalıdır.",
    "oncedenYapilacaklar": [
      "İnert Gaz Jeneratörü (IGS) çıkışındaki oksijen analizörünün O2 < %5 olduğunu kalibre gazla doğrula",
      "Güverte Su İzolasyon Vanasının (Deck Water Seal) su seviyesini ve geri tepme önleyici çekvalfini kontrol et",
      "COW yıkama makinelerinin dönüş hızlarını ve yıkama hattı basıncını (8-10 bar) izle",
      "Tankların Basınç/Vakum (P/V) nefesliklerinin serbest çalıştığını ve alev tutucu tel filtrelerini temizle"
    ]
  },
  {
    "id": "denizcilik_manyetik_pusula_sapma_tablosu_ve_gunes_rasadi",
    "category": "arac_ulasim",
    "domain": "DENIZCILIK",
    "keywords": [
      "ana manyetik pusula deviasyon sapma tablosu",
      "güneş azimut rasadı amplitüd hesabı pusula hatası",
      "cayro pusula gyro compass ile manyetik pusula karşılaştırma",
      "filika manyetik pusulası ve binnacle pusula aydınlatması",
      "sapma eğrisi deviation curve 2 yılda bir pusula ayarı"
    ],
    "baslik": "Klasik Seyir: Manyetik Pusula Sapma Tablosu (Deviasyon), Azimut Rasadı & Gyro",
    "ikon": "🧭",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Gün Doğumu / Batımı Rasat Zamanı",
    "akilliFisilti": "🧭 Her vardiyada Güneş Amplitüd veya Azimut rasadı yapılarak pusula hatası hesaplanmalı; Cayro ve Manyetik Pusula farkı Seyir Jurnaline yazılmalıdır.",
    "oncedenYapilacaklar": [
      "Güneşin doğuş/batış anında pelorus ile kerteriz alarak astronomik tablolardan (Nautical Almanac) hakiki kerterizi hesapla",
      "Hesaplanan Hakiki Kerteriz ile okunan Pusula Kerterizi arasındaki toplam pusula hatasını (Compass Error) bul",
      "Haritadaki Doğal Sapmayı (Variation) düşerek gemi gövde manyetizmasından kaynaklanan Deviasyonu (Sapma) tespit et",
      "Tespit edilen değeri Pusula Deviasyon Tablosuyla karşılaştırıp vardiya jurnaline \"Gyro Hatası: 0.5°W\" olarak işle"
    ]
  },
  {
    "id": "gumruk_antrepo_rejimi_a_tipi_ve_ellecleme_izni",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "gümrük antrepo rejimi a tipi genel özel antrepo",
      "antrepo beyannamesi antrepoya eşya giriş ve stok kaydı",
      "elleçleme faaliyeti izin dilekçesi etiketleme ambalajlama",
      "antrepo devir faturası gümrük vergileri teminatı",
      "antrepodan serbest dolaşıma giriş veya transit çıkış"
    ],
    "baslik": "Gümrük Antrepo Rejimi: A Tipi Antrepo Girişi, Elleçleme İzni & Stok Takibi",
    "ikon": "📦",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Eşyanın Antrepoya Alınması & Elleçleme",
    "akilliFisilti": "📦 Antrepodaki eşyalar için gümrük idaresinden izin alınarak koruyucu elleçleme (etiketleme, ayrıştırma) yapılabilir; antrepo stok süre kısıtı bulunmaz.",
    "oncedenYapilacaklar": [
      "Eşyayı A Tipi Genel Antrepoya alırken Antrepo Giriş Beyannamesini tescil ettirip gümrük muayenesini yaptır",
      "Eşyada etiketleme, barkodlama veya ambalaj değişimi gerekiyorsa Gümrük Müdürlüğüne \"Elleçleme İzin Dilekçesi\" ver",
      "Antrepo işleticisi stok defterine mühür ve kap/koli adetlerini birebir işlet",
      "Antrepodan kısmi çekimlerde Serbest Dolaşıma Giriş Beyannamesi açarak ithalat vergilerini yatır"
    ]
  },
  {
    "id": "gumruk_ithalatta_gozetim_ve_kayit_belgesi_tps",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "ithalatta gözetim uygulaması tebliği kg başına birim kıymet",
      "ticaret bakanlığı gözetim kayıt belgesi tps başvurusu",
      "fatura kıymetinin gözetim kıymetine yükseltilmesi yurt dışı gider",
      "kayıt belgesi muafiyeti e-devlet tek pencere sistemi",
      "kdv matrahı artırımı ve gözetim farkı beyanı"
    ],
    "baslik": "Gözetim & TPS: İthalat Kayıt Belgesi Başvurusu & Gözetim Farkı KDV Matrahı",
    "ikon": "🛡️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İthalat Beyannamesi Tescili Öncesi",
    "akilliFisilti": "🛡️ Gözetim tebliğindeki birim kıymetin altındaki eşyalar için ya Ticaret Bakanlığından Kayıt Belgesi alınmalı ya da kıymet farkı beyannameye dahil edilmelidir.",
    "oncedenYapilacaklar": [
      "Ürünün GTİP bazında İthalatta Gözetim Tebliği kapsamındaki asgari birim gümrük kıymetini ($/kg) hesapla",
      "Kayıt Belgesi alınacaksa Tek Pencere Sistemi (TPS) üzerinden e-İmza ile Ticaret Bakanlığına başvuru yap",
      "Kayıt Belgesi beklenmeyecekse aradaki kıymet farkını gümrük beyannamesinde \"Yurtdışı Diğer Gider\" satırına ekle",
      "Gözetim farkı üzerinden hesaplanan KDV ve ek gümrük vergilerini tahakkuk ettirerek tescili tamamla"
    ]
  },
  {
    "id": "gumruk_yetkilendirilmis_gonderici_yerinde_gumrukleme",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "yetkilendirilmiş gönderici izni yerinde gümrükleme ihracat",
      "fabrikadan araca doğrudan mühürleme ve atr eur1 basma",
      "gümrük idaresine gitmeden sınır kapısına doğrudan sevk",
      "yetkilendirilmiş yükümlü yys sertifikası güvenlik şartları",
      "ncts sistemi üzerinden yerinde ihracat beyanı onayı"
    ],
    "baslik": "YYS İhracat: Yetkilendirilmiş Gönderici, Yerinde Mühürleme & Yeşil Hat Sevk",
    "ikon": "🚚",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Fabrikadan İhracat Yükleme Aşaması",
    "akilliFisilti": "🚚 Yetkilendirilmiş Gönderici statüsündeki ihracatçı, gümrük idaresine gitmeksizin kendi tesisinde aracı mühürleyip doğrudan sınır gümrüğüne sevk eder.",
    "oncedenYapilacaklar": [
      "Fabrika YYS güvenli yükleme alanında aracı yükleyip onaylı gümrük kurşun mührünü tak",
      "NCTS sistemi üzerinden \"Yetkilendirilmiş Gönderici İhracat Beyanını\" elektronik ortamda tescil et",
      "Sistemin verdiği otomatik kontrol süresi (Örn: 30 dakika) içinde fiziki müdahale gelmezse aracı yola çıkar",
      "Dolaşım belgelerini (ATR/EUR.1) yetkili firma olarak kendi ofisinde kaşeleyip şoföre teslim et"
    ]
  },
  {
    "id": "gumruk_tasfiye_rejimi_ve_45_gunluk_bekleme_sure_sonu",
    "category": "resmi",
    "domain": "GUMRUK",
    "keywords": [
      "gümrük kanunu tasfiye rejimi ve tasfiyelik eşya",
      "geçici depolama yeri 45 günlük bekleme süresi deniz yolu",
      "tasfiyeye kalan eşyanın ihaleyle satışı e-ihale e-tasfiye",
      "tasfiyenin durdurulması ve eşyaya yeniden rejim tayini",
      "tasfiye idaresi e-ihale teminatı ve eşya teslimi"
    ],
    "baslik": "Gümrük Tasfiye: 45 Günlük Geçici Depolama Süresi, e-İhale & Tasfiyeyi Durdurma",
    "ikon": "🏛️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Depolama Süresi Sonu (45 Gün)",
    "akilliFisilti": "🏛️ Denizyoluyla gelen eşya geçici depolama yerinde 45 gün içinde bir rejime tabi tutulmazsa tasfiyelik hale gelir; ek süre veya tasfiye durdurma dilekçesi verilmelidir.",
    "oncedenYapilacaklar": [
      "Özet Beyan tarihinden itibaren denizyolunda 45, diğer yollarda 20 günlük yasal bekleme süresini takip et",
      "Süre dolmadan önce Gümrük Müdürlüğüne mücbir sebep göstererek 30 günlük \"Ek Süre Talebi\" ver",
      "Tasfiyeye ayrılan eşyalar için e-Tasfiye ihale ilanından önce tescil dilekçesi vererek tasfiyeyi durdur",
      "Tasfiye ambar masrafları ve ceza bedellerini yatırarak eşyayı Serbest Dolaşıma Giriş rejimiyle millileştir"
    ]
  },
  {
    "id": "gumruk_transit_rejimi_ncts_t1_t2_ve_kapsamli_teminat",
    "category": "finans",
    "domain": "GUMRUK",
    "keywords": [
      "ortak transit sözleşmesi ncts sistemi t1 t2 belgesi",
      "transit rejimi kapsamlı teminat mektubu indirimli teminat",
      "hareket gümrük idaresi ve varış gümrük idaresi mühür kontrolü",
      "transit refakat belgesi trb ve mrn takip numarası",
      "transit süresi ihlali ve gümrük vergilerinin asıl sorumludan tahsili"
    ],
    "baslik": "NCTS Transit Rejimi: T1 / T2 Beyanı, Kapsamlı Teminat & MRN Varış Onayı",
    "ikon": "🚛",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Transit Yükleme & Sınır Geçişi",
    "akilliFisilti": "🚛 NCTS T1/T2 beyanlarında Kapsamlı Teminat Mektubu kullanılır; taşıyıcı belirlenen güzergah ve süre sınırı içinde varış gümrüğüne mührü açılmadan ulaşmalıdır.",
    "oncedenYapilacaklar": [
      "Gümrük NCTS sistemi üzerinden T1 (Birlik Dışı) veya T2 (Birlik İçi) transit beyannamesini aç",
      "Gümrük vergileri toplamını karşılayacak Kapsamlı Teminat referans numarasını (GRN) beyannameye bağla",
      "Gümrük memurunun taktığı araç mühür numarasını ve MRN Transit Refakat Belgesini (TRB) şoföre teslim et",
      "Varış gümrük idaresinde mührün sağlam olduğunu onaylatıp NCTS sisteminde transit kapanış mesajını (IE045) al"
    ]
  }
];
