import type { ShortScenarioMatch } from '../scenarioDatabase.ts';

/**
 * Notivia Bilişsel Modülü: HUKUK, MALIYE, FINANS
 * Toplam 140 Bilişsel Senaryo
 */
export const LEGAL_FINANCE_SCENARIOS: ShortScenarioMatch[] = [
  {
    "id": "hukuk_ilamli_icra_emri",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ilamlı icra",
      "örnek no 4-5",
      "icra emri tebliği",
      "iik 32",
      "ilam icraya koy"
    ],
    "baslik": "İlama Bağlı İcra Takibi (İcra Emri)",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "İlam Kesinleşme Takvimi",
    "hazirlikZamani": "İlam ve Vekalet Sureti Taraması",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ İİK m. 32 uyarınca ilamlı icrada borçluya 7 günlük icra emri gönderilir; borç ödenmez veya tehir-i icra kararı getirilmezse haciz istenebilir.",
    "oncedenYapilacaklar": [
      "Mahkeme gerekçeli kararı ve kesinleşme şerhini UYAP sisteminden doğrula",
      "İlam vekalet ücreti ve yargılama gideri faiz hesabını (yasal/ticari avans) hazırla",
      "UYAP üzerinden İcra Emri (Örnek No: 4-5) takip talebini açıp icra harcını yatır",
      "Borçluya icra emri tebliğ mazbatasının UETS üzerinden dönüşünü izle"
    ]
  },
  {
    "id": "hukuk_istinaf_sure_tutum",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "süre tutum dilekçesi",
      "istinaf süre tutum",
      "hmk 342",
      "gerekçeli istinaf dilekçesi",
      "istinaf 2 hafta"
    ],
    "baslik": "İstinaf Süre Tutum & Gerekçeli İstinaf",
    "ikon": "📜",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Tefhimden 2 Hafta Sonra",
    "hazirlikZamani": "Kısa Karar Duruşması Günü",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "📜 HMK 342 uyarınca kısa kararın tefhiminden itibaren 2 hafta içinde süre tutum verilmeli, gerekçeli karar tebliğinde 2 haftada gerekçeli dilekçe sunulmalıdır.",
    "oncedenYapilacaklar": [
      "Duruşma zaptı (kısa karar) tarihine göre 2 haftalık süreyi başlatarak süre tutum dilekçesini ver",
      "İstinaf karar harcı ve istinaf kanun yolu başvuru harcını vezneye yatır",
      "Gerekçeli karar UETS ile tebliğ edildiğinde 2 haftalık kesin süreyi UYAP ajandasına işle",
      "Mahkemenin delil değerlendirme hatalarını ve usul ihlallerini içeren gerekçeli istinaf dilekçesini sun"
    ]
  },
  {
    "id": "hukuk_tedbir_nafakasi_tazyik",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "tedbir nafakası icrası",
      "nafaka tazyik hapsi",
      "iik 344",
      "ara karar nafakası",
      "nafaka şikayeti"
    ],
    "baslik": "Tedbir Nafakası & İİK 344 Tazyik Hapsi",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Aylık Ödeme Günü (Ayın 1'i)",
    "hazirlikZamani": "Nafaka Ara Kararı Alındığında",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "⚖️ İİK m. 344 gereğince nafaka borcunu ödemeyen borçlu hakkında alacaklının şikayeti üzerine 3 aya kadar tazyik hapsi verilir.",
    "oncedenYapilacaklar": [
      "Aile Mahkemesinin tedbir nafakası ara kararını ilamsız/ilamlı icra takibine koy",
      "Borçluya ödeme emri tebliğ edildikten sonra en az birikmiş ve cari ay nafakasının ödenmediğini bankadan teyit et",
      "İcra Ceza Mahkemesine 3 aylık hak düşürücü süre dolmadan nafaka ödememe şikayet dilekçesini aç",
      "Tazyik hapsi kararının infazı için dosyayı İcra Ceza'dan savcılık infaz bürosuna sevk ettir"
    ]
  },
  {
    "id": "hukuk_tapu_iptal_davali_serhi",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "davalıdır şerhi",
      "tmk 1010",
      "tapu iptal tescil",
      "muris muvazaası",
      "ihtiyati tedbir tapu"
    ],
    "baslik": "Tapu İptali & TMK 1010 Davalıdır Şerhi",
    "ikon": "🏛️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Dava Açılış Günü (İvedi)",
    "hazirlikZamani": "Dava Öncesi Tapu Kayıt İnceleme",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "🏛️ Taşınmazın 3. kişilere devrini ve iyiniyet iddiasını önlemek için dava dilekçesiyle birlikte tapu kaydına derhal tedbir/davalıdır şerhi konulmalıdır.",
    "oncedenYapilacaklar": [
      "Tapu ve Kadastro Bilgi Sistemi (TAKBİS) üzerinden taşınmazın güncel mülkiyet ve takyidat dökümünü çıkar",
      "Dava harcını taşınmazın keşfen belirlenecek değeri üzerinden nispi olarak yatır",
      "Mahkeme tensip zaptı ile Tapu Müdürlüğüne ihtiyati tedbir veya TMK 1010 şerhi müzekkeresini yazdır",
      "Tapu sicilinde davalıdır şerhinin fiilen işlendiğini tapu kütüğünden teyit et"
    ]
  },
  {
    "id": "hukuk_seri_muhakeme_teklif",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "seri muhakeme",
      "cmk 250",
      "seri muhakeme teklifi",
      "yaptırım indirimi müdafi",
      "seri muhakeme kabul"
    ],
    "baslik": "CMK 250 Seri Muhakeme & Müdafi Teyidi",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Savcılık Davet Saati",
    "hazirlikZamani": "Teklif Öncesi Şüpheli Görüşmesi",
    "hazirlikSaatOncesi": 1,
    "akilliFisilti": "⚖️ CMK m. 250 uyarınca seri muhakeme usulü ancak müdafi huzurunda teklif edilebilir; kabul halinde sonuç ceza yarı oranında indirilir.",
    "oncedenYapilacaklar": [
      "Cumhuriyet Savcılığı Seri Muhakeme Bürosundaki soruşturma evrakını ve delilleri müdafi olarak incele",
      "Şüpheliye suçun unsurları, ceza indirimi (%50) ve adli sicile etkisi hakkında hukuki aydınlatma yap",
      "Savcılıkça teklif edilen ceza veya güvenlik tedbiri protokol tutanağını şüpheliyle birlikte imzala",
      "Asliye Ceza Mahkemesinin aynı gün yapacağı seri muhakeme duruşmasında kararı onaylat"
    ]
  },
  {
    "id": "finans_kurumlar_vergisi_kkeg",
    "category": "finans",
    "domain": "FINANS",
    "keywords": [
      "kurumlar vergisi beyannamesi",
      "kkeg mutabakatı",
      "kanunen kabul edilmeyen gider",
      "kvk 14",
      "30 nisan kurumlar"
    ],
    "baslik": "Yıllık Kurumlar Vergisi & KKEG Mutabakatı",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "30 Nisan 23:59",
    "hazirlikZamani": "Nisan Başı Yıl Sonu Kapanış Fişleri",
    "hazirlikSaatOncesi": 72,
    "akilliFisilti": "📊 KVK m. 14 uyarınca Kurumlar Vergisi Beyannamesi hesap dönemini izleyen 4. ayın son gününe kadar onaylanmalı; KKEG kalemleri tek tek ayrıştırılmalıdır.",
    "oncedenYapilacaklar": [
      "Özel işlem vergileri, gecikme zamları, bağışlar ve binek oto gider kısıtlaması KKEG tutarlarını mizanla eşleştir",
      "Yıl içinde ödenen 4 dönem Geçici Vergi mahsuplarını beyanname tablosunda teyit et",
      "Ar-Ge indirimi, yatırım teşvik indirimi ve istisnaları tevsik edici raporlarla beyannameye bağla",
      "Kurumlar Vergisi Beyannamesini e-Beyanname portalından tahakkuk fişiyle birlikte onayla"
    ]
  },
  {
    "id": "finans_gekap_ambalaj_beyani",
    "category": "finans",
    "domain": "FINANS",
    "keywords": [
      "gekap beyannamesi",
      "geri kazanım katılım payı",
      "ambalaj beyanı",
      "poşet beyannamesi gekap",
      "çevre gekap"
    ],
    "baslik": "GEKAP Beyannamesi & Ambalaj İcmali",
    "ikon": "♻️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Dönem Sonu (Üç Aylık)",
    "hazirlikZamani": "Depo Ambalaj Çıkış Sayımı",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "♻️ Çevre Kanunu Ek-1 sayılı liste uyarınca piyasaya sürülen plastik, cam, metal ambalaj ve lastik/akü için GEKAP beyanı ve ödemesi zorunludur.",
    "oncedenYapilacaklar": [
      "Piyasaya sürülen ürünlerin birincil ve ikincil ambalaj ağırlıklarını (kg/adet) ERP stoktan çek",
      "Tedarikçilerden temin edilen ambalaj malzemelerinin depozitolu/depozitosuz statüsünü doğrula",
      "Vergi Dairesi e-Beyanname sistemi üzerinden GEKAP Beyannamesini doldurup tahakkukunu al",
      "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Çevre Bilgi Sistemi ambalaj bildirimini tamamla"
    ]
  },
  {
    "id": "finans_kar_dagitimi_stopaj",
    "category": "finans",
    "domain": "FINANS",
    "keywords": [
      "kar dağıtımı stopaj",
      "kar payı stopajı %10",
      "temettü ödemesi",
      "kar dağıtım tablosu",
      "stopaj beyanı"
    ],
    "baslik": "Kar Dağıtımı & Temettü Stopajı (%10)",
    "ikon": "💰",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Genel Kurul Karar Tarihi + Ödeme",
    "hazirlikZamani": "Genel Kurul Karar Metni ve Bilanço",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "💰 GVK m. 94/6-b uyarınca gerçek kişi ortaklara dağıtılan kar payları üzerinden %10 gelir vergisi stopajı kesilip MUHSGK ile beyan edilir.",
    "oncedenYapilacaklar": [
      "Genel Kurulda onaylanan Kar Dağıtım Tablosuna göre 1. ve 2. tertip yasal yedek akçeleri ayır",
      "Ortaklara ödenecek net temettü tutarlarını ve %10 yasal vergi tevkifatını hesapla",
      "Temettü ödemelerini ortakların banka hesaplarına banka transferiyle gerçekleştir",
      "İlgili ayın MUHSGK beyannamesinde tevkif edilen kar dağıtım stopajını beyan et"
    ]
  },
  {
    "id": "finans_supheli_alacak_karsiligi",
    "category": "finans",
    "domain": "FINANS",
    "keywords": [
      "şüpheli ticari alacak",
      "vuk 323",
      "karşılık ayırma icra",
      "dava aşamasındaki alacak",
      "128 şüpheli alacaklar"
    ],
    "baslik": "VUK 323 Şüpheli Alacak Karşılığı & İcra Şartı",
    "ikon": "📑",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Geçici Vergi / Yıl Sonu Dönemi",
    "hazirlikZamani": "İcra Takip Dosyası İncelemesi",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "📑 VUK 323 uyarınca ticari alacağa karşılık ayrılabilmesi için dava veya icra safhasında olması ve protesto edilmiş olması yasal şarttır.",
    "oncedenYapilacaklar": [
      "Vadesinde ödenmeyen fatura alacağına ilişkin icra takip talebi ve ödeme emri tensibini dosyala",
      "Alacağın teminatsız kısmını belirleyip 120 Alıcılar hesabından 128 Şüpheli Alacaklar hesabına virmanla",
      "Aynı tutarda 654 Karşılık Gideri ve 129 Şüpheli Alacaklar Karşılığı muhasebe kaydını oluştur",
      "Borçludan sonradan yapılan tahsilatları 644 Konusu Kalmayan Karşılıklar hesabına gelir kaydet"
    ]
  },
  {
    "id": "finans_kidem_tazminati_fon_tms19",
    "category": "finans",
    "domain": "FINANS",
    "keywords": [
      "kıdem tazminatı karşılığı",
      "tms 19 aktüeryal",
      "kıdem fonu hesaplama",
      "aktüeryal kazanç kayıp",
      "kıdem tavanı"
    ],
    "baslik": "TMS 19 Kıdem Tazminatı Karşılığı (Aktüeryal)",
    "ikon": "💼",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıl Sonu Bilanço Kapanışı",
    "hazirlikZamani": "Personel Hizmet Çizelgesi & Kıdem Tavanı",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "💼 Bağımsız denetim ve TMS 19 standardı gereği personelin kıdem tazminatı yükümlülüğü iskonto oranı ve kıdem tavanı gözetilerek aktüeryal hesaplanır.",
    "oncedenYapilacaklar": [
      "Şirket personelinin işe giriş tarihleri, brüt ücretleri ve kıdem sürelerini güncel bordrodan çıkar",
      "Hazine tahvil faiz oranları ve enflasyon beklentilerine göre net aktüeryal iskonto oranını uygula",
      "Hazine ve Maliye Bakanlığı güncel 6 aylık Kıdem Tazminatı Tavan sınırını aşmayan brüt matrahı esas al",
      "Dönem karşılık giderini ve özkaynaklarda aktüeryal kazanç/kayıp kalemini bilançoya yansıt"
    ]
  },
  {
    "id": "hukuk_ihtiyati_haciz_teminat_iik257",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ihtiyati haciz kararı",
      "iik 257",
      "iik 259 teminat mektubu",
      "haciz mahalline intikal",
      "muaccel alacak ihtiyati haciz"
    ],
    "baslik": "İhtiyati Haciz Kararı & İcra Dairesi İnfazı (İİK 257-259)",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Mahkeme Kararından İtibaren 10 Gün",
    "hazirlikZamani": "%15 Teminat Yatırılması & İnfaz Talebi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚖️ İİK m. 261 uyarınca ihtiyati haciz kararı verildiği tarihten itibaren 10 gün içinde icra dairesine başvurulup infaz istenmezse karar kendiliğinden hükümsüz kalır.",
    "oncedenYapilacaklar": [
      "Mahkeme veznesine %15 kesin ve gayrikabili rücu banka teminat mektubunu veya nakit teminatı depo et",
      "İİK m. 261 uyarınca 10 günlük yasal hak düşürücü süre geçmeden UYAP üzerinden icra dairesine infaz talebi gönder",
      "Borçlunun banka hesaplarına, taşınmazlarına ve MERNİS adresine fiili haciz müzekkeresi işlet",
      "İnfazdan itibaren 7 gün içinde esas takibe geçiş (ödeme emri tebliği veya dava açma) dilekçesini dosyaya sun"
    ]
  },
  {
    "id": "hukuk_bilirbisi_ek_rapor_hmk281",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "bilirkişi raporuna itiraz",
      "hmk 281",
      "ek rapor talebi",
      "2 hafta bilirkişi itiraz",
      "çelişkili bilirkişi raporu"
    ],
    "baslik": "Bilirkişi Raporuna İtiraz & Ek Rapor Talebi (HMK 281)",
    "ikon": "📑",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Tebliğden İtibaren 2 Hafta",
    "hazirlikZamani": "Teknik/Hesap Çelişki Tespiti",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ HMK m. 281 gereğince bilirkişi raporu tebliğinden itibaren iki hafta içinde itiraz edilmezse rapordaki aleyhe tespitlere itiraz hakkı düşer.",
    "oncedenYapilacaklar": [
      "Bilirkişi raporunun UETS tebliğ tarihini kontrol edip 2 haftalık kesin itiraz süresini UYAP takvimine işle",
      "Raporda maddi hataya veya fahiş eksik hesaplamaya yol açan teknik parametreleri tespit et",
      "Önceki keşif tutanakları ve delillerle çelişen kısımları tablo halinde itiraz dilekçesinde gerekçelendir",
      "Mahkemeden aynı bilirkişiden ek rapor alınmasını veya yeni bir uzman heyetine dosyanın tevdiini talep et"
    ]
  },
  {
    "id": "hukuk_cumhurbaskanligi_kararnamesi_iptal_aym",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "somut norm denetimi",
      "anayasaya aykırılık iddiası",
      "aym 152",
      "def'i yolu anayasa",
      "mahkemece aymye basvuru"
    ],
    "baslik": "Somut Norm Denetimi & AYM'ye Aykırılık Başvurusu (AYM m. 152)",
    "ikon": "🏛️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Davanın Her Aşamasında",
    "hazirlikZamani": "Anayasa İhlal Metni Gerekçelendirme",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "⚖️ Anayasa m. 152 uyarınca davada uygulanacak normun Anayasa'ya aykırı olduğu iddiası ciddi bulunursa, mahkeme AYM kararına kadar 5 ay davayı geri bırakır.",
    "oncedenYapilacaklar": [
      "Uyuşmazlıkta uygulanacak kanun hükmünün Anayasa'nın 2, 10, 13 veya 36. maddelerine aykırılığını tespit et",
      "Gerekçeli ve içtihat destekli \"Anayasa'ya Aykırılık Def'i\" dilekçesini mahkemeye sun",
      "Hakimin aykırılık iddiasını ciddi bulması halinde dosyanın Anayasa Mahkemesi'ne sevk tensip zaptını kontrol et",
      "AYM'nin 5 aylık karar bekleme süresini UYAP dosya takip sistemine kaydet"
    ]
  },
  {
    "id": "hukuk_icra_istihkak_iddiasi_iik97",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "üçüncü şahıs istihkak iddiası",
      "iik 96-97",
      "hacizde istihkak davası",
      "7 gün istihkak davası süresi",
      "yediemin üçüncü kişi"
    ],
    "baslik": "Hacizde 3. Kişi İstihkak İddiası & Takibin Ertelenmesi (İİK 96-97)",
    "ikon": "📦",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Tebliğden İtibaren 7 Gün",
    "hazirlikZamani": "Fatura ve Cari Defter Tespiti",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "⚖️ İİK m. 96-97 gereği haczedilen malın borçluya değil 3. kişiye ait olduğu iddiasında icra müdürü dosyayı İcra Mahkemesine sevk eder; 7 günlük dava süresi kritiktir.",
    "oncedenYapilacaklar": [
      "Haciz zaptında 3. şahıs istihkak şerhinin düşülüp düşülmediğini kontrol et",
      "İcra Mahkemesi takibin taliki veya devamı kararı vermeden önce fatura, irsaliye ve noter devir belgelerini derle",
      "İcra Mahkemesi kararının tebliğinden itibaren 7 gün içinde İcra Hukuk Mahkemesinde İstihkak Davası aç",
      "Haczedilen menkulün satılmasını önlemek için teminat mukabili takibin durdurulmasını talep et"
    ]
  },
  {
    "id": "hukuk_ceza_seri_muhakeme_usulu_cmk250",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "seri muhakeme usulü",
      "cmk 250",
      "savcılık yaptırım teklifi",
      "seri muhakeme kabul",
      "asliye ceza onay duruşması"
    ],
    "baslik": "Seri Muhakeme Usulü & Yaptırım Teyidi (CMK 250)",
    "ikon": "⚖️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Savcılık Davet Saati",
    "hazirlikZamani": "Müdafi Eşliğinde Bilgilendirme",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚖️ CMK m. 250 uyarınca seri muhakemede şüpheli müdafii huzurunda teklifi kabul ederse cezada yarı oranında indirim uygulanır ve aynı gün mahkemece onaylanır.",
    "oncedenYapilacaklar": [
      "Suçun CMK 250 kapsamındaki katalog suçlardan olduğunu (örn: parada sahtecilik, ruhsatsız silah, mühür bozma vb.) teyit et",
      "Cumhuriyet Savcısının teklif ettiği yaptırım ve sonuç ceza indirimi (%50) hesap cetvelini incele",
      "Şüpheli ile müdafi görüşme odasında hakları ve sonuçları hakkında ön mülakat yap",
      "Asliye Ceza Mahkemesinde aynı gün yapılacak Seri Muhakeme duruşmasında teklifin serbest iradeyle kabulünü zapta geçirt"
    ]
  },
  {
    "id": "maliye_e_defter_berat_zaman_damgasi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "e-defter berat yükleme",
      "zaman damgalı berat",
      "gelir idaresi e-defter",
      "yevmiye kebir beratı",
      "mücbir sebep berat"
    ],
    "baslik": "e-Defter & Berat Dosyaları Gönderimi (GİB Zaman Damgası)",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İlgili Ayı Takip Eden 3. Ayın Sonu",
    "hazirlikZamani": "Yevmiye ve Kebir Bütünlük Kontrolü",
    "hazirlikSaatOncesi": 8,
    "akilliFisilti": "📊 e-Defter Genel Tebliği gereğince yevmiye ve kebir beratlarının GİB sistemine süresinde yüklenmesi şarttır; GİB sistem arızasında zaman damgası zorunludur.",
    "oncedenYapilacaklar": [
      "Muhasebe programında ay sonu yevmiye numaralandırma ve bakiye kapatma işlemlerini tamamla",
      "e-Defter XML şemasına uygunluğunu GİB e-Defter doğrulama aracıyla test et",
      "Mali mühür veya nitelikli elektronik sertifika ile Yevmiye ve Kebir beratlarını imzala",
      "GİB e-Defter portalına yükleyip GİB onaylı berat dosyalarını ve onay barkodlarını indirip arşivle"
    ]
  },
  {
    "id": "maliye_7440_matrah_artirimi_taksit",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "matrah artırımı taksiti",
      "7440 sayılı kanun",
      "yapılandırma bozulma riski",
      "vergi barışı taksit ödeme",
      "matrah tecil terkin"
    ],
    "baslik": "Vergi Yapılandırması & Matrah Artırımı Taksit Denetimi",
    "ikon": "💰",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Vade Günü Saat 23:59",
    "hazirlikZamani": "İnteraktif Vergi Dairesi Ödeme Doğrulama",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "📊 7440/7326 yapılandırma kanunlarında bir takvim yılında 3'ten fazla taksitin süresinde ödenmemesi halinde yapılandırma hakkı tamamen iptal olur.",
    "oncedenYapilacaklar": [
      "İnteraktif Vergi Dairesi (İVD) üzerinden mükellefin kalan yapılandırma taksit tablosunu sorgula",
      "Kalan hak ihlali sayısını denetle (bir takvim yılında en fazla 2 aksatma toleransı)",
      "GİB veznesi veya anlaşmalı bankalar üzerinden taksit tutarını son gün sistem yoğunluğuna kalmadan tahsil et",
      "Ödeme makbuzunu (alındı belgesi) indirip mükellef cari dosyasına işle"
    ]
  },
  {
    "id": "maliye_arge_5746_bordro_istisnasi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "5746 arge teşviki",
      "arge bordro istisnası",
      "teknokent gelir vergisi stopaj",
      "sgk 5746 primi muafiyeti",
      "arge kart basma"
    ],
    "baslik": "5746 Sayılı Kanun Ar-Ge & Teknokent Bordro Teşvikleri",
    "ikon": "🔬",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Her Ayın 20'si Bordro Onayı",
    "hazirlikZamani": "Turnike & Kartlı Geçiş Log Mutabakatı",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "📊 5746 sayılı Kanun ve Teknokent Kanununda araştırmacı ve teknisyen personelin fiziki/uzaktan çalışma saatleri bordroda dakika hassasiyetiyle ayrıştırılmalıdır.",
    "oncedenYapilacaklar": [
      "Bakanlık portalı ve Ar-Ge merkezi turnike log kayıtlarını indirip net fiili çalışma saatlerini hesapla",
      "Gelir vergisi stopajı teşviki, damga vergisi istisnası ve %50 SGK işveren hissesi desteğini bordroda işlet",
      "Doktoralı veya temel bilimler mezunu araştırmacıların ek teşvik oranlarını kontrol et",
      "MUHSGK bildiriminde ilgili muafiyet kodlarını seçerek Ar-Ge teşvikli bildirgeyi onaylat"
    ]
  },
  {
    "id": "maliye_vergi_mukellefiyet_resen_terk",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "re'sen terk",
      "vuk 160/a",
      "vergi dairesi yoklama fişi",
      "gayrifaal mükellefiyet",
      "adreste bulunamama tutanağı"
    ],
    "baslik": "VUK 160/A Re'sen Terk Riski & Fiili Yoklama Tespiti",
    "ikon": "🏢",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yoklama Tebliğinden Sonra 30 Gün",
    "hazirlikZamani": "Kira Sözleşmesi & İşyeri Levha Tespiti",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "📊 VUK m. 160/A gereğince adresinde bulunamayan ve beyanname vermeyen mükellefler re'sen terk ettirilir; e-Faturaları iptal edilip kod listesine alınırlar.",
    "oncedenYapilacaklar": [
      "Vergi dairesi yoklama memurunun düzenlediği \"Adreste Bulunmama Yoklama Fişi\"ni temin et",
      "İşyerinin fiilen faal olduğunu kanıtlayan güncel kira sözleşmesi, elektrik/su faturası ve POS cihazı sliplerini derle",
      "Mükellefin faal olduğuna dair fotoğraflı tespit tutanağı hazırlayıp bağlı vergi dairesine itiraz dilekçesi ver",
      "Vergi Dairesi Müdürü onayından sonra mükellefiyetin aktif duruma getirildiğini sorgula"
    ]
  },
  {
    "id": "maliye_otv_1_sayili_liste_teminat",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "ötv 1 sayılı liste",
      "akaryakıt ötv beyanı",
      "ötv teminat çözümü",
      "ithalatta ötv teminatı",
      "ötv bildirimi vergi dairesi"
    ],
    "baslik": "ÖTV (I) Sayılı Liste Akaryakıt/Madeni Yağ Beyanı & Teminat",
    "ikon": "⛽",
    "renk": "#FED7AA",
    "varsayilanZaman": "Ayın 10. ve 25. Günleri",
    "hazirlikZamani": "Rafineri & Dağıtıcı Sayaç Verileri",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "📊 ÖTV Kanunu (I) sayılı listedeki petrol ürünleri tesliminde 15 günlük vergilendirme dönemleri geçerlidir; süresinde beyan edilmezse teminat mektubu paraya çevrilir.",
    "oncedenYapilacaklar": [
      "15 günlük dönemde teslim edilen motorin, benzin ve madeni yağ litre hacimlerini EPDK otomasyonundan çek",
      "ÖTV (I) Sayılı Liste Beyannamesini vergi türü koduyla doldurup tahakkuk ettir",
      "İthalat aşamasında gümrüğe verilen banka teminat mektubunun vergi dairesi mahsubuyla çözümü için yazı hazırla",
      "Tahakkuk eden ÖTV tutarını aynı gün saat 23:59'a kadar kamu bankaları üzerinden ödet"
    ]
  },
  {
    "id": "hukuk_delil_tespiti_hmk400_kesif",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "delil tespiti talebi",
      "hmk 400 delil tespiti",
      "mahkemece delil tespiti",
      "delilin kaybolma tehlikesi",
      "delil tespiti bilirkişi keşif"
    ],
    "baslik": "Delil Tespiti & Acil Bilirkişi Keşfi (HMK 400-405)",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Delil Kaybolmadan Önce Derhal",
    "hazirlikZamani": "Hukuki Yarar & Aciliyet Gerekçelendirmesi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚖️ HMK m. 400 uyarınca delilin kaybolması veya gösterilmesinde güçlük doğacağı ihtimalinde dava açılmadan önce Sulh Hukuk Mahkemesinden acil tespit istenir.",
    "oncedenYapilacaklar": [
      "Delilin zamanla bozulacağını (inşaat ayıbı, kira tahliyesi, su sızıntısı vb.) fotoğraflarla belgele",
      "Sulh Hukuk Mahkemesine karşı tarafa tebligat beklenmeksizin keşif icrası talepli dilekçeyi ver",
      "Keşif ve bilirkişi gider avansını mahkeme veznesine aynı gün nakit depo et",
      "Bilirkişi refakatinde olay yerinde inceleme yapılıp tespit zaptının imzalanmasını sağla"
    ]
  },
  {
    "id": "hukuk_menfi_tespit_davasi_iik72_yuzde15",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "menfi tespit davası",
      "iik 72 borçtan kurtulma",
      "icra takibinden önce menfi tespit",
      "%15 teminatla icra durdurma",
      "borçlu olmadığının tespiti"
    ],
    "baslik": "Menfi Tespit Davası & %15 Teminatla İcra Tedbiri (İİK 72)",
    "ikon": "📜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İcra Takibinden Önce / Sonra",
    "hazirlikZamani": "Banka Teminat Mektubu (%15) Hazırlığı",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "⚖️ İİK m. 72/2 gereği icra takibinden önce açılan menfi tespit davasında alacağın %15'i teminat yatırılarak takibin durdurulması yönünde ihtiyati tedbir alınabilir.",
    "oncedenYapilacaklar": [
      "Sahte senet, hatır çeki veya ödenmiş borca ilişkin delilleri (banka dekontu, ibraname) dosyala",
      "Asliye Ticaret veya Asliye Hukuk Mahkemesinde Menfi Tespit Davası aç",
      "Mahkemenin tensip zaptında belirlediği %15 nakit veya banka teminat mektubunu vezneye sun",
      "Tedbir kararını icra dairesine ibraz ederek takibin durdurulmasını sağla ve %20 tazminat talebini saklı tut"
    ]
  },
  {
    "id": "hukuk_itirazin_iptali_davasi_iik67_yuzde20",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "itirazın iptali davası",
      "iik 67",
      "1 yıllık hak düşürücü süre itirazın iptali",
      "yüzde 20 icra inkar tazminatı",
      "itirazın tebliğinden itibaren dava"
    ],
    "baslik": "İtirazın İptali Davası & %20 İcra İnkar Tazminatı (İİK 67)",
    "ikon": "⚖️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İtiraz Tebliğinden İtibaren 1 Yıl",
    "hazirlikZamani": "İtiraz Dilekçesi & Cari Hesap Taraması",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ İİK m. 67 uyarınca borçlunun itirazının tebliğinden itibaren 1 yıl içinde itirazın iptali davası açılmazsa ilamsız takip tamamen hükümsüz kalır.",
    "oncedenYapilacaklar": [
      "Borçlunun itiraz dilekçesinin alacaklı vekiline UETS tebliğ tarihini netleştir",
      "Ticari defterler, faturalar, irsaliyeler ve banka hareketleriyle likit alacağı ispatla",
      "Dava dilekçesinde haksız itiraz nedeniyle asgari %20 İcra İnkar Tazminatı talep et",
      "Dava kabul edildiğinde kesinleşmeyi beklemeden icra dosyasına kararı sunup haciz safhasına geç"
    ]
  },
  {
    "id": "hukuk_tasinmaz_satis_vaadi_ve_ferag_zorlama_tmk716",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ferağa icbar davası",
      "tmk 716 tescile zorlama",
      "satış vaadi tapu tescil davası",
      "mülkiyetin mahkemece tescili",
      "satıcının tapuyu vermemesi"
    ],
    "baslik": "Ferağa İcbar (Tescile Zorlama) Davası (TMK 716 & TBK 237)",
    "ikon": "🏛️",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Satıcının Temerrüde Düşmesinde",
    "hazirlikZamani": "Noter Satış Vaadi & Ödeme Dekontları",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ TMK m. 716 gereğince geçerli bir mülkiyet devir borcu doğuran satış vaadine rağmen satıcı tapuyu devretmezse hakim hükmüyle mülkiyet doğrudan alıcıya geçer.",
    "oncedenYapilacaklar": [
      "Noterde resmi şekilde yapılmış gayrimenkul satış vaadi sözleşmesinin geçerlilik şartlarını denetle",
      "Sözleşmede kararlaştırılan satış bedelinin tamamının ödendiğini banka dekontlarıyla kanıtla",
      "Taşınmazın 3. kişilere devrini engellemek için tapu kaydı üzerine \"İhtiyati Tedbir\" talep et",
      "Mahkeme kararının kesinleşmesiyle birlikte kararı Tapu Sicil Müdürlüğüne tescil için sevk et"
    ]
  },
  {
    "id": "hukuk_ceza_hukukunda_hukuka_aykiri_delil_cmk206",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "hukuka aykırı delil",
      "cmk 206 delilin reddi",
      "zehirli ağacın meyvesi",
      "yasak sorgu yöntemleri cmk 148",
      "hukuka aykırı arama delili"
    ],
    "baslik": "Hukuka Aykırı Delillerin Dosyadan Çıkarılması (CMK 206 & 217)",
    "ikon": "🚫",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Tensip Zaptından Hüküm Anına Kadar",
    "hazirlikZamani": "Arama Kararı & İfade Tutanakları Karşılaştırması",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "⚖️ Anayasa m. 38 ve CMK m. 217/2 gereğince kanuna aykırı olarak elde edilen deliller hiçbir mahkeme kararında hükme esas alınamaz ve dosyadan ayıklanır.",
    "oncedenYapilacaklar": [
      "Arama, el koyma veya ortam dinlemesinin hakim kararı olmaksızın yapılıp yapılmadığını incele",
      "Müdafi hazır bulunmaksızın kollukça alınan şüpheli ifadesinin tek başına delil olamayacağını vurgula",
      "CMK m. 206/2-a uyarınca delilin hukuka aykırı yollarla elde edildiğini belirten itiraz dilekçesini mahkemeye ver",
      "Zehirli ağacın meyvesi ilkesi gereği yasa dışı delile dayanan diğer yan delillerin de hükümden çıkarılmasını iste"
    ]
  },
  {
    "id": "maliye_supheli_alacak_karsiligi_vuk323",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "şüpheli ticari alacak karşılığı",
      "vuk 323",
      "protestolu senet karşılık",
      "icra takibine başlanan alacak",
      "karşılık gideri 654 hesap"
    ],
    "baslik": "VUK 323 Şüpheli Ticari Alacak Karşılığı Ayrılması & Gider Kaydı",
    "ikon": "📉",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Dönem Sonu / Takip Başlatıldığında",
    "hazirlikZamani": "İcra Takip Talebi veya Dava Açma Tutanağı",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "📊 VUK m. 323 gereğince bir alacağa şüpheli karşılığı ayrılabilmesi için dava veya icra safhasında olması ve ticari kazancın elde edilmesine yönelik olması şarttır.",
    "oncedenYapilacaklar": [
      "Alacağın daha önce hasılat yazıldığını fatura ve yevmiye kaydıyla doğrula",
      "Borçlu aleyhine açılmış icra takibi takip talebini veya mahkeme dava tevzi formunu dosyala",
      "Alacak tutarı kadar 128 Şüpheli Ticari Alacaklar hesabına virman yap",
      "Dönem sonunda 654 Karşılık Giderleri hesabı borçlu, 129 Şüpheli Alacak Karşılığı hesabı alacaklı kaydını at"
    ]
  },
  {
    "id": "maliye_finansal_kiralama_leasing_260_hesap_tms16",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "finansal kiralama muhasebesi",
      "leasing 260 haklar hesabı",
      "leasing faiz anapara ayrımı",
      "leasing 301 borç hesabı",
      "tms 16 kiralama"
    ],
    "baslik": "Finansal Kiralama (Leasing) VUK & TMS 16 Muhasebeleştirilmesi",
    "ikon": "🚜",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Leasing Sözleşmesi İmzalandığında",
    "hazirlikZamani": "Ödeme Planı İtfa Tablosu Analizi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "📊 VUK Mükerrer 290 uyarınca finansal kiralamaya konu iktisadi kıymet rayiç bedel veya kira ödemelerinin bugünkü değerinden düşük olanıyla aktifleştirilir.",
    "oncedenYapilacaklar": [
      "Leasing şirketinin gönderdiği itfa tablosunda anapara ve faiz bileşenlerini ayrıştır",
      "Varlığı 260 Haklar hesabına borç, kira ödemelerini 301/401 Finansal Kiralama Borçlarına alacak kaydet",
      "Ertelenmiş finansal kiralama borçlanma maliyetlerini 302/402 hesaplarda takip et",
      "Aktife alınan kıymet için amortisman listesine ekleyip faydalı ömrüne göre amortisman ayır"
    ]
  },
  {
    "id": "maliye_ortulu_sermaye_faiz_kur_farki_kvk12",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "örtülü sermaye hesabı",
      "kvk 12 örtülü sermaye",
      "özsermayenin 3 katı borç",
      "ortaklara borçlar 331 hesap",
      "kanunen kabul edilmeyen gider kkg"
    ],
    "baslik": "KVK m. 12 Örtülü Sermaye Denetimi & KKEG Düzeltmesi",
    "ikon": "⚖️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Geçici Vergi ve Kurumlar Vergisi Döneminde",
    "hazirlikZamani": "Dönem Başı Özsermaye & İlişkili Kişi Borçları",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "📊 KVK m. 12 gereğince kurumun ortaklardan veya ilişkili kişilerden yaptığı borçlanmalar dönem başı özsermayenin 3 katını aşarsa aşan kısım örtülü sermaye sayılır.",
    "oncedenYapilacaklar": [
      "Şirketin dönem başı bilançosundaki özsermaye tutarını tespit et ve 3 katını hesapla",
      "Ortaklardan, ana şirketten ve ilişkili şirketlerden alınan borçların dönem içi toplamını karşılaştır",
      "Özsermayenin 3 katını aşan borç kısmına isabet eden faiz ve kur farkı giderlerini belirle",
      "Aşan kısma ait faiz giderlerini Kanunen Kabul Edilmeyen Gider (KKEG) olarak beyannameye ekle"
    ]
  },
  {
    "id": "maliye_kidem_ve_ihbar_tazminati_muhasebe_karsiligi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "kıdem tazminatı karşılığı",
      "aktüeryal kazanç kayıp tms 19",
      "kıdem tavanı hesabı maliye",
      "ihbar tazminatı bordro",
      "kıdem karşılığı kkg"
    ],
    "baslik": "Kıdem Tazminatı Karşılığı & TMS 19 Aktüeryal Değerleme",
    "ikon": "💼",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Yıl Sonu Kapanış Kayıtlarında",
    "hazirlikZamani": "Tüm Personel Hizmet Yılı & Güncel Kıdem Tavanı",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "📊 VUK kurallarına göre ayrılan kıdem tazminatı karşılıkları KKEG'dir; ancak TMS/TFRS uygulayan şirketlerde çalışan hakları yükümlülüğü olarak kayıtlara alınır.",
    "oncedenYapilacaklar": [
      "Personelin brüt ücret ve ek menfaatlerini (yemek, yol, ikramiye) güncel kıdem tavanını aşmayacak şekilde hesapla",
      "TMS 19 kapsamında iskonto oranı, enflasyon ve işten ayrılma olasılığı ile aktüeryal karşılığı belirle",
      "Dönem karşılık giderini 472 Kıdem Tazminatı Karşılığı hesabına alacak kaydet",
      "VUK beyannamesinde ticari kazançtan indirilmeyip vergi matrahına KKEG olarak ilave et"
    ]
  },
  {
    "id": "maliye_gecmis_yil_zararlari_5_yil_mahsubu_kvk9",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "geçmiş yıl zararları mahsubu",
      "kvk 9 zarar mahsubu",
      "5 yıllık zarar mahsup süresi",
      "zarar mahsubu beyanname sırası",
      "zamanaşımına uğrayan zarar"
    ],
    "baslik": "KVK m. 9 Geçmiş Yıl Mali Zararlarının 5 Yıllık Mahsubu",
    "ikon": "📊",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kurumlar Vergisi Beyannamesinde",
    "hazirlikZamani": "Son 5 Yılın Beyannamelerindeki Mali Zararlar",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "📊 KVK m. 9 uyarınca mali zararlar en fazla 5 yıl süreyle mahsup edilebilir; karlı yılda mahsup edilmeyen geçmiş yıl zararı sonraki yıllarda bir daha mahsup edilemez.",
    "oncedenYapilacaklar": [
      "Önceki 5 takvim yılına ait Kurumlar Vergisi beyannamelerindeki \"Gelecek Yıla Devreden Cari Yıl Zararı\" satırlarını dök",
      "Ticari bilanço zararı ile mali zarar (KKEG eklenmiş, istisnalar düşülmüş) farkını doğrula",
      "Kronolojik sıra takip edilerek en eski yıldan başlayarak cari yıl kurum kazancından mahsup et",
      "Mahsup edilen zararların 5 yıllık zamanaşımı denetim evraklarını vergi dairesi inceleme dosyasına hazırla"
    ]
  },
  {
    "id": "hukuk_tasinmaz_tahliye_iik_272_yazili_tahliye_taahhudu",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "örnek no 14 tahliye emri",
      "iik 272 tahliye",
      "yazılı tahliye taahhüdü takibi",
      "15 gün tahliye emri",
      "tahliye taahhüdü 1 ay içinde takip"
    ],
    "baslik": "Yazılı Tahliye Taahhüdüne Dayalı Tahliye Takibi (İİK 272 & Örnek 14)",
    "ikon": "🏠",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Taahhüt Tarihinden İtibaren 1 Ay İçinde",
    "hazirlikZamani": "Tahliye Taahhüdü Aslı & Kira Kontratı Taraması",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ İİK m. 272 uyarınca tahliye taahhüdünde belirtilen tarihten itibaren 1 ay içinde icra takibi açılmazsa taahhütnameye dayanarak tahliye hakkı düşer.",
    "oncedenYapilacaklar": [
      "Tahliye taahhüdünün kira sözleşmesi yapıldıktan sonraki bir tarihte tanzim edildiğini teyit et",
      "Taahhüt tarihinden itibaren 1 aylık hak düşürücü süreyi UYAP üzerinden hesapla",
      "İcra dairesine başvurarak borçluya \"Örnek No: 14 Tahliye Emri\" (15 gün içinde tahliye/itiraz) tebliğ ettir",
      "7 gün içinde itiraz edilmezse 15 günlük süre sonunda icra memuru refakatinde çilingirli fiili tahliyeyi talep et"
    ]
  },
  {
    "id": "hukuk_ticari_sirket_genel_kurul_iptali_ttk445",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "genel kurul kararının iptali davası",
      "ttk 445",
      "3 aylık hak düşürücü süre genel kurul",
      "genel kurulda muhalefet şerhi",
      "anonim şirket genel kurul butlan"
    ],
    "baslik": "Anonim Şirket Genel Kurul Kararının İptali Davası (TTK 445-448)",
    "ikon": "🏢",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Genel Kuruldan İtibaren 3 Ay İçinde",
    "hazirlikZamani": "Hazirun Cetveli & Muhalefet Şerhi Tutanağı",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "⚖️ TTK m. 445 gereğince kanuna, esas sözleşmeye ve dürüstlük kuralına aykırı genel kurul kararlarına karşı 3 ay içinde Asliye Ticaret Mahkemesinde iptal davası açılmalıdır.",
    "oncedenYapilacaklar": [
      "Toplantı tutanağına karara olumsuz oy verildiğinin ve muhalefet şerhinin zapta geçirildiğini doğrula",
      "Genel kurul tarihinden itibaren 3 aylık kesin hak düşürücü süreyi takvime kaydet",
      "Şirketin merkezinin bulunduğu yer Asliye Ticaret Mahkemesinde İptal Davası aç",
      "Kararın icrasının telafisi güç zararlar doğurmaması için mahkemeden \"Yürütmenin Geri Bırakılması\" tedbirini iste"
    ]
  },
  {
    "id": "hukuk_is_mahkemesi_ise_iade_ve_bostagecen_sure_is_k_20",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "işe iade davası",
      "iş kanunu 20. madde",
      "1 ay içinde arabuluculuk işe iade",
      "4 aya kadar boşta geçen süre ücreti",
      "işe başlatmama tazminatı 4-8 ay"
    ],
    "baslik": "İşe İade Davası: 1 Aylık Arabuluculuk Süresi & Tazminatlar (İş K. 20-21)",
    "ikon": "👔",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Fesih Bildiriminden İtibaren 1 Ay",
    "hazirlikZamani": "Yazılı Fesih Bildirimi & Kıdem/İhbar Bordroları",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ İş Kanunu m. 20 gereği fesih bildiriminin tebliğinden itibaren 1 ay içinde arabulucuya başvurulmazsa işe iade davası açma hakkı tamamen düşer.",
    "oncedenYapilacaklar": [
      "İş sözleşmesi feshinin tebliğ tarihini netleştirerek 1 aylık arabuluculuk başvuru süresini başlat",
      "İşyerinde en az 30 işçi çalıştığını ve işçinin en az 6 aylık kıdemi olduğunu SGK dökümünden doğrula",
      "Arabuluculukta anlaşma sağlanamazsa son tutanak tarihinden itibaren 2 hafta içinde İş Mahkemesinde dava aç",
      "Dava dilekçesinde 4 aya kadar boşta geçen süre ücreti ve 4-8 aylık işe başlatmama tazminatını talep et"
    ]
  },
  {
    "id": "hukuk_tapu_iptali_ve_tescili_muris_muvazaasi",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "muris muvazaası davası",
      "mirastan mal kaçırma",
      "1.4.1974 tarihli içtihadı birleştirme",
      "saklı pay miras tapu iptali",
      "mirasbırakan muvazaalı satış"
    ],
    "baslik": "Muris Muvazaası (Mirastan Mal Kaçırma) Tapu İptal ve Tescil Davası",
    "ikon": "📜",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Mirasbırakanın Vefatından Sonra",
    "hazirlikZamani": "Veraset İlamı & Tarihsel Tapu Kayıtları (Resmi Senet)",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "⚖️ 01.04.1974 tarihli İBK gereğince murisin diğer mirasçılardan mal kaçırmak amacıyla yaptığı bağışı satış gibi göstermesi halinde herhangi bir zamanaşımı olmaksızın tapu iptali istenebilir.",
    "oncedenYapilacaklar": [
      "Sulh Hukuk Mahkemesinden veya noterden mirasçılık belgesini (veraset ilamı) temin et",
      "Murisin devir tarihindeki banka hesap hareketleri ile devralanın alım gücünü karşılaştır",
      "Resmi senetteki satış bedeli ile taşınmazın gerçek rayiç değeri arasındaki fahiş farkı bilirkişiyle belgele",
      "Asliye Hukuk Mahkemesinde dava açarak taşınmaz kaydı üzerine 3. kişilere devri önleyen İhtiyati Tedbir şerhi koydur"
    ]
  },
  {
    "id": "hukuk_ceza_tutukluluga_itiraz_cmk101",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "tutukluluğa itiraz",
      "cmk 101/5",
      "7 günlük tutukluluk itiraz süresi",
      "adli kontrolle tahliye talebi",
      "asliye ceza üst mahkeme itiraz"
    ],
    "baslik": "Tutuklama Kararına İtiraz & Adli Kontrol Talebi (CMK 101/5 & 267)",
    "ikon": "⚖️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Kararın Yüze Okunmasından İtibaren 7 Gün",
    "hazirlikZamani": "Sorgu Zaptı & Kaçma Şüphesi Bulunmadığı Belgeleri",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "⚖️ CMK m. 101/5 uyarınca tutuklama kararına karşı 7 gün içinde bir üst numaralı Sulh Ceza Hakimliğine veya Asliye Ceza Mahkemesine itiraz dilekçesi verilir.",
    "oncedenYapilacaklar": [
      "Sulh Ceza Hakimliği sorgu tutanağını ve tutuklama müzekkeresi tebliğ tarihini kontrol et",
      "Şüphelinin sabit ikametgah sahibi olduğunu, kaçma şüphesi veya delil karartma ihtimali olmadığını belgele",
      "Orantılılık ilkesi gereği tutuklama yerine adli kontrol tedbirlerinin (yurtdışı yasağı, imza yükümlülüğü) yeterli olacağını gerekçelendir",
      "7 günlük yasal süre dolmadan itiraz dilekçesini UYAP üzerinden nöbetçi mahkemeye sevk ettir"
    ]
  },
  {
    "id": "maliye_ihracat_bedeli_doviz_bozdurma_ibkb_ibkb_yuzde40",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "ihracat bedeli kabul belgesi ibkb",
      "ibkb yüzde 40 merkez bankası",
      "180 gün ihracat bedeli getirme süresi",
      "döviz dönüşüm desteği ibkb",
      "ihracat hesabı kapatma vergi dairesi"
    ],
    "baslik": "İhracat Bedeli Kabul Belgesi (İBKB) & TCMB %40 Döviz Bozdurma",
    "ikon": "💵",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Fiili İhraçtan İtibaren 180 Gün İçinde",
    "hazirlikZamani": "Gümrük Beyannamesi (GB) & Swift Dekontu",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "📊 Türk Parası Kıymetini Koruma Tebliği uyarınca ihracat bedelinin %40'ı İBKB düzenlenerek Merkez Bankasına satılmak zorundadır; hesap 180 günde kapatılmalıdır.",
    "oncedenYapilacaklar": [
      "Gümrük beyannamesinin kapanma tarihini (fiili ihraç) tespit ederek 180 günlük yasal süreyi izle",
      "Yurtdışı alıcıdan gelen döviz Swift mesajı ile ilgili gümrük beyannamesini aracı bankada eşleştir",
      "Bankaya talimat vererek döviz bedelinin %40'lık kısmını TCMB kuru üzerinden bozdurup İBKB düzenlet",
      "Kalan dövizi serbest şirket hesabına aktar ve İBKB numarasını ihracat kapanış dosyasına kaydet"
    ]
  },
  {
    "id": "maliye_finansman_gider_kisitlamasi_fgk_yuzde10_kkg",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "finansman gider kısıtlaması",
      "fgk yüzde 10 kkeg",
      "yabancı kaynak özsermaye kıyası",
      "kredi faiz ve komisyon kısıtlaması",
      "kurumlar vergisi fgk hesabı"
    ],
    "baslik": "Finansman Gider Kısıtlaması (FGK): %10 KKEG İlavesi (KVK 11/1-i)",
    "ikon": "📉",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Geçici Vergi & Kurumlar Vergisi Beyanında",
    "hazirlikZamani": "Bilanço Yabancı Kaynak / Özkaynak Oranı",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "📊 Kullanılan yabancı kaynaklar özkaynakları aşıyorsa aşan kısma isabet eden finansman giderlerinin (faiz, kur farkı, komisyon) %10'u KKEG olarak vergi matrahına eklenir.",
    "oncedenYapilacaklar": [
      "Bilanço dönemindeki toplam yabancı kaynaklar (Kısa + Uzun Vadeli) ile özsermaye toplamını karşılaştır",
      "Yabancı kaynakların özkaynakları aşan tutarının toplam yabancı kaynaklara oranını (Aşan Kısım / Toplam Kaynak) hesapla",
      "Dönem içinde katlanılan finansman giderleri toplamı ile aşan oranı çarparak net aşan finansman giderini bul",
      "Bulunan tutarın %10'luk kısmını hesaplayıp Kurumlar Vergisi beyannamesinde KKEG satırına intikal ettir"
    ]
  },
  {
    "id": "maliye_ar-ge_tasarim_indirim_5746_yilsonu_raporu",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "ar-ge indirimi beyanname",
      "5746 ar-ge harcamaları 750 hesap",
      "bakanlık ar-ge merkezi faaliyet raporu",
      "ar-ge personeli zaman tahsis",
      "teknoloji geliştirme bölgesi muafiyet"
    ],
    "baslik": "5746 Ar-Ge İndirimi: 750 Hesap Harcamaları & Faaliyet Raporu",
    "ikon": "🔬",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Yıllık Kurumlar Vergisi Beyannamesinde",
    "hazirlikZamani": "750 Ar-Ge Gider Dökümü & Proje Çıktıları Dosyası",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "📊 5746 sayılı Kanun uyarınca yapılan Ar-Ge harcamalarının %100'ü kurum kazancından indirilir; kazanç yetersizse indirim hakkı endekslenerek devredilir.",
    "oncedenYapilacaklar": [
      "Muhasebede 750 Araştırma ve Geliştirme Giderleri hesabındaki proje bazlı harcamaları (personel, malzeme, amortisman) listele",
      "Sanayi ve Teknoloji Bakanlığı portalına yıllık Ar-Ge Merkezi Faaliyet Raporunu süresinde yükle",
      "Kurumlar Vergisi beyannamesinde Ar-Ge İndirimi satırına harcama tutarını yazarak matrahtan tenzil et",
      "Kazanç yetersizliği nedeniyle indirilemeyen kısmı Yİ-ÜFE oranında endeksleyerek gelecek yıla devret"
    ]
  },
  {
    "id": "maliye_nakit_sermaye_artirimi_faiz_indirimi_kvk10",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "nakit sermaye faiz indirimi",
      "kvk 10/1-ı sermaye indirimi",
      "tcmb ticari kredi faiz oranı",
      "nakden ödenen sermaye tescili",
      "kurumlar vergisi teşvik indirimi"
    ],
    "baslik": "KVK m. 10/1-ı: Nakit Sermaye Artırımı Faiz İndirimi (%50 / %75)",
    "ikon": "💰",
    "renk": "#FED7AA",
    "varsayilanZaman": "Kurumlar Vergisi Beyannamesi Döneminde",
    "hazirlikZamani": "Ticaret Sicil Gazetesi & Banka Sermaye Dekontları",
    "hazirlikSaatOncesi": 8,
    "akilliFisilti": "📊 Ticaret siciline tescil edilen ve bankaya fiilen nakit yatırılan sermaye artırımı için TCMB ticari kredi faizi üzerinden hesaplanan tutarın %50'si kurum kazancından düşülür.",
    "oncedenYapilacaklar": [
      "Ticaret Sicil Gazetesinde ilan edilen sermaye artırım kararını ve ortakların nakit banka dekontlarını dosyala",
      "Nakit sermayenin banka hesabına fiilen yattığı aydan itibaren yıl sonuna kadar kalan ay sayısını (kıst süre) hesapla",
      "TCMB tarafından yıl için açıklanan \"Bankalarca Açılan TL Cinsi Ticari Kredilere Uygulanan Ağırlıklı Ortalama Faiz Oranı\"nı esas al",
      "Formülle hesaplanan indirim tutarını Kurumlar Vergisi beyannamesinde ilgili indirim satırında göster"
    ]
  },
  {
    "id": "maliye_amortisman_yenileme_fonu_549_hesap_vuk328",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "yenileme fonu 549 hesap",
      "vuk 328 amortisman fonu",
      "sabit kıymet satış karı 3 yıl pasifte",
      "yeni iktisadi kıymet amortisman mahsubu",
      "3 yıl içinde kullanılmayan yenileme fonu"
    ],
    "baslik": "VUK m. 328 Sabit Kıymet Satış Karı & 549 Yenileme Fonu (3 Yıl)",
    "ikon": "🔄",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Sabit Kıymet Satışı ve Dönem Sonunda",
    "hazirlikZamani": "Yönetim Kurulu Yenileme Kararı & Satış Faturası",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "📊 Satılan amortismana tabi iktisadi kıymetin karı, yönetim kurulu kararıyla yeni kıymet alımında kullanılmak üzere 3 yıl süreyle 549 Yenileme Fonunda vergilenmeden bekletilebilir.",
    "oncedenYapilacaklar": [
      "Şirket yönetim organınca satılan taşıt/makinenin yenilenmesine dair resmi karar al",
      "Satış karını 679 hesaba gelir yazmak yerine bilançonun pasifinde 549 Özel Fonlar (Yenileme Fonu) hesabına alacak kaydet",
      "Satışın yapıldığı yılı takip eden 3 yıl içinde yeni kıymet alındığında ayrılacak amortismanları bu fondan mahsup et",
      "3 yıl içinde yeni kıymet alınmazsa fon tutarını 3. yılın gelir tablosuna aktararak vergilendir"
    ]
  },
  {
    "id": "hukuk_tasinmaz_ipoteginin_paraya_cevrilmesi_iik149",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ipoteğin paraya çevrilmesi yoluyla takip",
      "iik 149 icra emri",
      "örnek no 6 icra emri",
      "ipotek akit tablosu kesinleşme",
      "30 gün ödeme süresi ipotek"
    ],
    "baslik": "İpoteğin Paraya Çevrilmesi Yoluyla Takip & İcra Emri (İİK 149)",
    "ikon": "🏦",
    "renk": "#E0E7FF",
    "varsayilanZaman": "İpotek Borcunun Muacceliyetinde",
    "hazirlikZamani": "İpotek Akit Tablosu & Noter Hesap Kat İhtarı",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ İİK m. 149 gereği cari hesap veya kredi borcunda noterden hesap kat ihtarı tebliğ edilip 8 gün geçtikten sonra icra müdürü borçluya 30 günlük icra emri (Örnek 6) gönderir.",
    "oncedenYapilacaklar": [
      "Tapu Sicil Müdürlüğünden onaylı İpotek Resmi Senedi (Akit Tablosu) suretini temin et",
      "Borçluya noter aracılığıyla çekilen hesap kat ihtarının tebliğ şerhini dosyala",
      "UYAP üzerinden İpoteğin Paraya Çevrilmesi (Örnek No: 6) takip talebini aç",
      "Borçluya 30 günlük ödeme süresi tanıyan icra emrinin tebliğini izle ve süre bitiminde doğrudan kıymet takdiri ve satış safhasına geç"
    ]
  },
  {
    "id": "hukuk_vesayet_altindaki_kisinin_tasinmaz_satisi_tmk444",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "kısıtlının taşınmaz satışı",
      "vesayet makamı izin kararı",
      "tmk 444 vesayet satışı",
      "denetim makamı asliye hukuk onayı",
      "açık artırmayla vesayet satışı"
    ],
    "baslik": "Vesayet Altındaki Kısıtlının Taşınmaz Satışı & Çift Mahkeme İzni (TMK 444)",
    "ikon": "⚖️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İhtiyaç Halinde / Bakım Masrafları İçin",
    "hazirlikZamani": "Bilirkişi Değerleme Raporu & Vasi Raporu",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "⚖️ TMK m. 444 gereği vesayet altındaki kişinin taşınmazı pazarlıkla satılamaz; Sulh Hukuk Mahkemesi izni ve Asliye Hukuk onayından sonra mahkemece açık artırmayla satılır.",
    "oncedenYapilacaklar": [
      "Kısıtlının sağlık/bakım giderleri için satışın zorunlu olduğunu gösteren gerekçeli vasi dilekçesi hazırla",
      "Vesayet makamı olan Sulh Hukuk Mahkemesinden kıymet takdiri ve satış izin kararı talep et",
      "Sulh Hukuk kararını denetim makamı olan Asliye Hukuk Mahkemesine onaylat (çift mahkeme onayı)",
      "Satış memuru refakatinde ihale gününü ilan ettirip açık artırma tutanağını tescil için tapuya sevk et"
    ]
  },
  {
    "id": "hukuk_kamulastirmasiz_el_atma_fiili_ve_hukuki_tazminat",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "kamulaştırmasız el atma davası",
      "fiili el atma tazminatı",
      "hukuki el atma imar kısıtlılığı",
      "kamulaştırma kanunu ek 1",
      "belediye yol yeşil alan el atma"
    ],
    "baslik": "Kamulaştırmasız El Atma Davası & İmar Kısıtlılığı Tazminatı",
    "ikon": "📐",
    "renk": "#DCFCE7",
    "varsayilanZaman": "El Atmanın Tespiti / 5 Yıllık İmar Planı Bitimi",
    "hazirlikZamani": "İmar Durum Belgesi & Arazide Fiili Yol/Park Tespiti",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ İmar planında okul/park/yol olarak ayrılıp 5 yıl kamulaştırılmayan arazilerde veya idarenin fiilen yol geçirdiği hallerde idareye karşı mülkiyet tazminatı davası açılır.",
    "oncedenYapilacaklar": [
      "Belediyeden parselin 1/1000 ölçekli uygulama imar planındaki kamu donatı lejantını al",
      "Arazide fiili yol, su isale hattı veya park yapılıp yapılmadığını harita mühendisiyle fotoğraflayarak tutanakla tespit et",
      "Kamulaştırma Kanunu Geçici m. 6 uyarınca idareye uzlaşma başvurusunda bulun",
      "Uzlaşma sağlanamazsa Asliye Hukuk Mahkemesinde bedel tespiti ve mülkiyetin idareye terki talepli dava aç"
    ]
  },
  {
    "id": "hukuk_ticari_davada_defater_teslimi_ve_ibraz_hmk222",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ticari defterlerin ibrazı",
      "hmk 222 ticari defter delili",
      "defter teslimi ihtarı mahkeme",
      "yevmiye kapanış tasdiki eksik",
      "defter ibrazından kaçınma aleyhe delil"
    ],
    "baslik": "Ticari Defterlerin Mahkemeye İbrazı & Kesin Delil Şartı (HMK 222)",
    "ikon": "📖",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Mahkemenin Verdiği Kesin Süre İçinde (2 Hafta)",
    "hazirlikZamani": "Yevmiye Açılış/Kapanış Noter Tasdik Şerhleri Taraması",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "⚖️ HMK m. 222 gereğince ticari defterlerin sahibi lehine delil olabilmesi için kanuna uygun tutulmuş ve yevmiye kapanış tasdiklerinin süresinde yapılmış olması şarttır.",
    "oncedenYapilacaklar": [
      "İhtilaflı yıla ait yevmiye, kebir ve envanter defterlerinin noter tasdik şerhlerini kontrol et",
      "Mahkemenin tensip zaptıyla verdiği kesin süre içinde defterleri mahkeme kalemine veya bilirkişiye teslim et",
      "Karşı taraf süresinde defterlerini ibraz etmezse HMK m. 222/5 uyarınca müvekkil defterindeki kayıtların kesinleştiğini ileri sür",
      "Bilirkişi inceleme günü şirket mali müşavirini defterlerin başında hazır bulundur"
    ]
  },
  {
    "id": "hukuk_ceza_hukukunda_onodeme_ve_kamu_davasi_cmk75",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "önödeme teklifi tck 75",
      "cumhuriyet savcılığı önödeme ihtarı",
      "10 gün önödeme süresi",
      "kamu davasının açılmasının ertelenmesi",
      "adli para cezası önödeme makbuzu"
    ],
    "baslik": "Ceza Muhakemesi: Önödeme Müessesesi & Dava Açılmasının Önlenmesi (TCK 75)",
    "ikon": "⚖️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Önödeme İhtarı Tebliğinden İtibaren 10 Gün",
    "hazirlikZamani": "Savcılık Önödeme İhtar Kağıdı & Malmüdürlüğü Veznesi",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "⚖️ TCK m. 75 kapsamındaki uzlaşmaya tabi olmayan hafif suçlarda tebliğ edilen para cezası ve yargılama gideri 10 gün içinde ödenirse kamu davası açılmaz, kovuşturmaya yer olmadığı kararı verilir.",
    "oncedenYapilacaklar": [
      "Suçun sadece adli para cezasını gerektiren veya üst sınırı 6 ayı aşmayan katalog suçlardan olduğunu teyit et",
      "Savcılıkça hesaplanan önödeme miktarını ve soruşturma giderini tebliğ belgesinden doğrula",
      "10 günlük kesin hak düşürücü süre geçmeden adliye/vergi dairesi veznesine ödemeyi yap",
      "Ödeme makbuzunu soruşturma savcılığı kalemine sunarak \"Kovuşturmaya Yer Olmadığına Dair Karar\" (KYOK) al"
    ]
  },
  {
    "id": "maliye_finansman_gider_kisitlamasi_fgk_kvk11",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "finansman gider kısıtlaması",
      "fgk hesabı",
      "yabancı kaynak özkaynak kıyası",
      "kvk 11/1-i gider kısıtlaması",
      "%10 finansman gider kkeg"
    ],
    "baslik": "KVK m. 11 Finansman Gider Kısıtlaması (FGK) & %10 KKEG Hesabı",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Geçici ve Kurumlar Vergisi Beyan Döneminde",
    "hazirlikZamani": "Bilanço Yabancı Kaynak / Özkaynak Oranı Kontrolü",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "📊 KVK m. 11/1-i uyarınca yabancı kaynakları özkaynaklarını aşan kurumlarda, aşan kısma münhasır finansman giderlerinin %10'u KKEG olarak matraha eklenir.",
    "oncedenYapilacaklar": [
      "Geçici vergi dönemi bilançosunda Toplam Yabancı Kaynaklar (Kısa + Uzun) ile Özkaynaklar toplamını karşılaştır",
      "Yabancı kaynaklar özkaynakları aşıyorsa aşan kısmın toplam yabancı kaynaklara oranını tespit et",
      "Dönem içinde tahakkuk eden kredi faizi, komisyon ve kur farkı net giderlerini formüle uygula",
      "Hesaplanan tutarın %10'luk kısmını Kanunen Kabul Edilmeyen Gider (KKEG) satırına yaz"
    ]
  },
  {
    "id": "maliye_indirimli_orana_tabi_kdv_iadesi_talep_ve_ypo",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "indirimli oran kdv iadesi",
      "%1 ve %10 kdv iadesi",
      "kdv iade talep dilekçesi",
      "yüklenilen kdv listesi ypo",
      "ymm kdv iade raporu"
    ],
    "baslik": "İndirimli Orana Tabi (%1 - %10) KDV İadesi & Yüklenilen KDV Listesi",
    "ikon": "💰",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Takip Eden Takvim Yılının Kasım Ayı Sonuna Kadar",
    "hazirlikZamani": "Yüklenilen KDV, İndirilecek KDV & Satış Faturaları Exceli",
    "hazirlikSaatOncesi": 8,
    "akilliFisilti": "📊 İndirimli orana tabi işlemlerde kümülatif KDV iade alt sınırını aşan kısım için en geç takip eden yılın Kasım beyannamesinde iade talep edilmelidir.",
    "oncedenYapilacaklar": [
      "Gıda, konut veya tekstil teslimlerindeki indirimli oranlı satış faturalarını dök",
      "Bu malların üretim ve tedarikinde ödenen KDV'leri fatura bazında \"Yüklenilen KDV Listesi\"ne bağla",
      "İnternet Vergi Dairesi KDVİRA sistemine İndirilecek KDV, Yüklenilen KDV ve İndirimli Oran Satış Listesini yükle",
      "Yeminli Mali Müşavir (YMM) KDV İadesi Tasdik Raporunu vergi dairesine ibraz ederek nakden/mahsuben iadeyi talep et"
    ]
  },
  {
    "id": "maliye_binek_oto_amortisman_ve_gider_kisitlamasi_vuk",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "binek oto gider kısıtlaması",
      "%70 yakıt gider kabulü",
      "%30 binek oto kkg",
      "binek araç amortisman tavanı",
      "kıst amortisman binek oto"
    ],
    "baslik": "Binek Otomobil Gider Kısıtlaması & %70 / %30 Ayrımı (GVK m. 40/5)",
    "ikon": "🚗",
    "renk": "#FED7AA",
    "varsayilanZaman": "Aylık Fatura Girişlerinde & Amortisman Döneminde",
    "hazirlikZamani": "Yakıt, Kasko, Bakım Faturaları & Vergi Tavanları",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "📊 Binek otomobillerin yakıt, otopark, sigorta ve bakım giderlerinin en fazla %70'i gider yazılabilir; kalan %30'u ve aşan amortisman tutarı KKEG'dir.",
    "oncedenYapilacaklar": [
      "Şirket aktifindeki veya kiralanan binek araçlara ait akaryakıt ve servis faturalarını ayıkla",
      "Fatura tutarının %70'ini 760/770 ilgili gider hesabına borç, %30'unu KKEG hesabına kaydet",
      "KDV'nin de sadece %70'lik kısmını 191 İndirilecek KDV'ye al, kalan %30 KDV'yi KKEG yap",
      "Yıl sonunda aracın iktisap bedeline göre VUK Genel Tebliği ile belirlenen amortisman tavanını aşan amortismanı KKEG'e ekle"
    ]
  },
  {
    "id": "maliye_ticari_alacak_temliki_ve_faktoring_muhasebesi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "faktoring muhasebe kaydı",
      "alacak temliki sözleşmesi",
      "faktoring komisyon faturası bsmv",
      "120 alıcılar temlik virmanı",
      "faktoring finansman gideri"
    ],
    "baslik": "Faktoring İşlemleri & Ticari Alacak Temliki Muhasebeleştirilmesi",
    "ikon": "📑",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Faktoring Şirketi İle Sözleşme İmzalandığında",
    "hazirlikZamani": "Fatura Temlik Onayı & Faktoring Cari Hesabı",
    "hazirlikSaatOncesi": 2,
    "akilliFisilti": "📊 Faktoringe devredilen alacaklar 120 Alıcılar hesabından 120.XX Temlikli Alacaklar alt hesabına aktarılır; kesilen komisyon ve BSMV doğrudan giderleştirilir.",
    "oncedenYapilacaklar": [
      "Faktoring şirketine devredilen müşteri e-Faturalarının barkodlu temlik şerhini al",
      "Müşteri carisini 120.01 Normal Alıcılar'dan 120.05 Faktoringe Temlik Edilen Alacaklar hesabına virmanla",
      "Banka hesabına geçen ön ödeme tutarını 102 Bankalar borçlu, 320 Faktoring Şirketi alacaklı kaydet",
      "Faktoring şirketinin kestiği finansman komisyonu faturasını 780 Finansman Giderleri hesabına işle"
    ]
  },
  {
    "id": "maliye_kendi_hisselerini_iktisap_eden_sirket_stopaj_kvk22",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "kendi hissesini geri alan şirket",
      "hisse geri alımında stopaj %15",
      "kvk 22 hisse itfası",
      "sermaye azaltımı stopaj",
      "şirketin kendi paylarını iktisabı"
    ],
    "baslik": "Şirketin Kendi Paylarını (Hisselerini) Geri Alımı & %15 Stopaj (KVK 22)",
    "ikon": "📉",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Hisselerin İktisap Edildiği / İtfa Edildiği Ayda",
    "hazirlikZamani": "Genel Kurul Yetki Kararı & Hisse Alış Fiyatı Mutabakatı",
    "hazirlikSaatOncesi": 6,
    "akilliFisilti": "📊 Tam mükellef sermaye şirketlerinin kendi hisselerini iktisap etmesi halinde, iktisap bedeli ile nominal bedel arasındaki fark üzerinden %15 stopaj kesintisi yapılır.",
    "oncedenYapilacaklar": [
      "Genel kuruldan yönetim kuruluna verilen pay geri alım yetki kararının ticaret sicil tescilini kontrol et",
      "Ortaktan geri satın alınan hisselerin nominal bedeli ile şirketin ödediği iktisap bedeli arasındaki müspet farkı hesapla",
      "KVK m. 22 uyarınca bu fark tutarını kâr payı dağıtımı sayarak %15 oranında tevkifat (stopaj) hesapla",
      "Muhtasar ve Prim Hizmet Beyannamesinde (MUHSGK) ilgili kodla beyan edip süresinde vergi dairesine öde"
    ]
  },
  {
    "id": "hukuk_kira_tespit_davasi_5_yil_kurali_tbk344",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "kira tespit davası 5 yıl",
      "emsal kira rayiç bedel tespiti",
      "tbk 344 hakkaniyet indirimi",
      "tüfe üzeri kira artış tespiti",
      "5 yılı dolduran kiracı kira uyarlama"
    ],
    "baslik": "Kira Hukuku: 5 Yıllık Kira Tespit Davası & Hakkaniyet İndirimi (TBK 344)",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Yeni Kira Döneminden En Az 30 Gün Önce",
    "hazirlikZamani": "Eski Kira Kontratı, Banka Dekontları & Emsal Kira İlanları",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "⚖️ TBK m. 344/3 gereğince 5 yılı dolduran kira sözleşmelerinde hakim, TÜFE artış oranıyla bağlı olmaksızın emsal rayiçler ve hakkaniyet indirimiyle yeni kira bedelini belirler.",
    "oncedenYapilacaklar": [
      "Kiralanan taşınmazın 5 yıllık kira süresini doldurduğunu sözleşme başlangıç tarihiyle tespit et",
      "Yeni kira döneminin başlangıcından en az 30 gün önce kiracıya kira tespit ihtarnamesi tebliğ ettir",
      "Taşınmazın bulunduğu caddedeki emsal kiralık taşınmaz sözleşmelerini ve ilan ekran görüntülerini delil olarak topla",
      "Sulh Hukuk Mahkemesinde dava açarak bilirkişi marifetiyle boş alan rayici üzerinden %10-20 hakkaniyet indirimiyle kira bedelinin tespitini talep et"
    ]
  },
  {
    "id": "hukuk_menfi_tespit_davasi_ve_yuzde15_teminatla_tedbir_iik72",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "menfi tespit davası iik 72",
      "sahte senet borçlu olunmadığının tespiti",
      "%15 teminatla icra veznesinden para çekilmesinin durdurulması",
      "icra takibinden sonra menfi tespit",
      "bedelsiz kalan senet menfi tespit"
    ],
    "baslik": "İcra İflas Hukuku: Menfi Tespit Davası & %15 Teminatla İhtiyati Tedbir (İİK 72)",
    "ikon": "📜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İcra Takibi Kesinleşmeden / Satıştan Önce",
    "hazirlikZamani": "Senet Aslı İncelemesi, Ödeme Belgeleri & %15 Teminat Mektubu",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ İİK m. 72 uyarınca takipten sonra açılan menfi tespit davasında icra durmaz; ancak alacağın en az %15'i oranında teminat yatırılarak veznedeki paranın alacaklıya ödenmesi tedbiren durdurulabilir.",
    "oncedenYapilacaklar": [
      "Takibe konu kambiyo senedi veya sözleşmenin hükümsüzlüğünü gösteren banka havale dekontlarını ve yazışmaları derle",
      "Asliye Ticaret Mahkemesinde borçlu olunmadığının tespiti (menfi tespit) davası aç",
      "Mahkemeden takdir edilecek en az %15 nakit veya banka teminat mektubunu mahkeme veznesine depo et",
      "İcra dairesine müzekkere yazdırarak icra veznesine girecek paraların alacaklıya ödenmeyip nemalandırılmasını sağla"
    ]
  },
  {
    "id": "hukuk_arabuluculuk_son_tutanak_ve_icra_edilebilirlik_serhi",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "arabuluculuk anlaşma belgesi",
      "arabuluculuk icra edilebilirlik şerhi",
      "sulh hukuk arabuluculuk şerhi",
      "ilam niteliğinde arabuluculuk belgesi",
      "avukat ve arabulucu ortak imzalı tutanak"
    ],
    "baslik": "Dava Şartı Arabuluculuk: Anlaşma Belgesi & İcra Edilebilirlik Şerhi",
    "ikon": "🤝",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Arabuluculuk Müzakeresi Sonunda",
    "hazirlikZamani": "Taraf Vekaletnameleri, Yetki Belgeleri & Anlaşma Protokolü Taslağı",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "⚖️ Arabuluculuk tutanağını taraflar ve avukatları birlikte imzalarsa belge doğrudan ilam niteliğindedir; aksi halde Sulh Hukuk Mahkemesinden icra edilebilirlik şerhi alınması zorunludur.",
    "oncedenYapilacaklar": [
      "Müzakere sonucunda varılan mutabakatı (tazminat tutarı, taksit vadeleri, tahliye tarihi) net ve infaza elverişli şekilde yaz",
      "Taraf asilleri ve vekillerinin tamamının arabulucu huzurunda ıslak/e-İmza ile son tutanağı imzalamasını sağla",
      "Avukatsız imzalanan hallerde Sulh Hukuk Mahkemesine maktu harçla başvurarak icra edilebilirlik şerhi talep et",
      "İhlal halinde ilamlı icra takibi (Örnek No: 4-5) başlatmak üzere belgeyi icra dosyasına ekle"
    ]
  },
  {
    "id": "hukuk_is_kanunu_gecersiz_fesih_ve_ise_iade_davasi_arabuluculuk",
    "category": "is_kariyer",
    "domain": "HUKUK",
    "keywords": [
      "işe iade davası 1 aylık süre",
      "iş güvencesi 30 işçi 6 ay kıdem",
      "işe iade arabuluculuk başvurusu",
      "4 aylık boşta geçen süre ücreti",
      "işe başlatmama tazminatı 4-8 ay"
    ],
    "baslik": "İş Hukuku: İşe İade Davası, 1 Aylık Hak Düşürücü Süre & İşe Başlatmama",
    "ikon": "👔",
    "renk": "#FEF9C3",
    "varsayilanZaman": "Fesih Bildiriminin Tebliğinden İtibaren 1 Ay İçinde",
    "hazirlikZamani": "Fesih Bildirimi, SGK İşe Giriş-Çıkış Bildirgesi & Bordrolar",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "⚖️ İş Kanunu m. 20 gereği iş sözleşmesi feshedilen işçi, fesih bildiriminin tebliğinden itibaren 1 ay içinde arabulucuya başvurmak zorundadır; süre kaçırılırsa dava hakkı tamamen düşer.",
    "oncedenYapilacaklar": [
      "İşyerinde en az 30 işçi çalışıp çalışmadığını ve işçinin 6 aylık kıdemini SGK dökümünden doğrula",
      "Fesih bildiriminin tebellüğ edildiği tarihten itibaren 1 ay dolmadan Arabuluculuk Bürosuna işe iade başvurusu yap",
      "Anlaşamama tutanağının düzenlendiği tarihten itibaren 2 hafta içinde İş Mahkemesinde işe iade davası aç",
      "Kararın kesinleşmesinden sonra 10 iş günü içinde işverene noterden işe başlama başvurusu çek"
    ]
  },
  {
    "id": "hukuk_tasinmaz_satis_vaadi_ve_arsa_payi_karsiligi_insaat_serhi",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "noterde gayrimenkul satış vaadi",
      "kat karşılığı inşaat sözleşmesi tapu şerhi",
      "tapu siciline şerh 5 yıllık süre",
      "arsa payı karşılığı inşaat tescil davası",
      "müteahhitten daire alımı temlik"
    ],
    "baslik": "Taşınmaz Hukuku: Gayrimenkul Satış Vaadi & Tapuya Şerh (5 Yıllık Süre)",
    "ikon": "🏗️",
    "renk": "#F1F5F9",
    "varsayilanZaman": "Noter Sözleşmesi İmzalandığı Gün",
    "hazirlikZamani": "Noter Satış Vaadi Senedi, Tapu Fotokopisi & Şerh Harç Makbuzu",
    "hazirlikSaatOncesi": 4,
    "akilliFisilti": "⚖️ Noterde yapılan satış vaadi sözleşmesi tapu siciline şerh edilirse 3. kişilere karşı ayni hak doğurur; ancak tapu şerhi 5 yıl içinde satışa dönüştürülmezse tapu müdürlüğünce resen terkin edilir.",
    "oncedenYapilacaklar": [
      "Noter huzurunda re'sen tanzim şeklinde Gayrimenkul Satış Vaadi ve Arsa Payı Karşılığı İnşaat Sözleşmesi akdet",
      "Sözleşmede yer alan tapuya şerh koydurma yetkisine istinaden derhal Tapu Sicil Müdürlüğüne şerh talebinde bulun",
      "Tapu kütüğünün şerhler sütununa satış vaadi şerhinin işlendiğini teyit et",
      "5 yıllık yasal şerh süresi dolmadan önce müteahhidin teslim temerrüdüne karşı nama ifa ve tapu iptal-tescil davasını ikame et"
    ]
  },
  {
    "id": "maliye_vuk359_sahte_fatura_smiyb_ve_komisyon_raporu",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "sahte fatura smiyb",
      "vuk 359 vergi kaçakçılığı suçu",
      "vergi tekniği raporu vtr",
      "kod listesi kdv iadesi blokajı",
      "özel esaslara alınma smiyb"
    ],
    "baslik": "Vergi Ceza Hukuku: VUK 359 Sahte Belge (SMİYB) & Vergi Tekniği Raporu",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Vergi Müfettişi İnceleme Yazısı Tebliğinde",
    "hazirlikZamani": "Mal Alış Faturaları, Sevk İrsaliyeleri, Banka Ödeme Dekontları & Taşıma İrsaliyesi",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "📊 VUK m. 359 uyarınca sahte veya muhteviyatı itibarıyla yanıltıcı belge (SMİYB) kullanımı 3 yıldan 8 yıla kadar hapis ve 3 kat vergi ziyaı cezası doğurur; fiili mal teslimi ispatlanmalıdır.",
    "oncedenYapilacaklar": [
      "Hakkında VTR (Vergi Tekniği Raporu) düzenlenen alt mükelleften alınan faturaları tespit et",
      "Faturalara konu malların fiilen işletmeye girdiğini kanıtlayan kantar fişi, güvenlik kamera kaydı ve sevk irsaliyelerini dosyala",
      "Ödemelerin satıcının resmi banka hesabına çek/havale ile yapıldığını gösteren banka ekstrelerini hazırla",
      "Vergi Denetim Kurulu rapor değerlendirme komisyonuna ve uzlaşma komisyonuna detaylı savunma dilekçesi sun"
    ]
  },
  {
    "id": "maliye_transfer_fiyatlandirmasi_ortulu_kazanc_raporu_kvk13",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "transfer fiyatlandırması raporu",
      "ilişkili kişilerle emsallere uygunluk ilkesi",
      "kvk 13 örtülü kazanç dağıtımı",
      "karşılaştırılabilir fiyat yöntemi",
      "yıllık transfer fiyatlandırması formu"
    ],
    "baslik": "Kurumlar Vergisi: Transfer Fiyatlandırması Raporu & Örtülü Kazanç (KVK 13)",
    "ikon": "📑",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Kurumlar Vergisi Beyanname Verme Süresi Sonuna Kadar (25-30 Nisan)",
    "hazirlikZamani": "İlişkili Şirket Sözleşmeleri, Emsal Fiyat Veri Tabanı Analizi & Bilanço",
    "hazirlikSaatOncesi": 72,
    "akilliFisilti": "📊 KVK m. 13 uyarınca ilişkili kişilerle yapılan mal/hizmet alım-satımında emsallere uygunluk ilkesine aykırı fiyat tespiti örtülü kazanç sayılarak kâr payı stopajı ve kurumlar vergisi tarhiyatına yol açar.",
    "oncedenYapilacaklar": [
      "Grup şirketleri ve ortaklarla yapılan tüm borç-alacak, faiz, yönetim gider payı ve mal alım-satım işlemlerini listele",
      "Emsallere uygunluk analizi için Karşılaştırılabilir Fiyat veya Maliyet Artı Yöntemine göre benchmark raporu hazırla",
      "Kurumlar Vergisi beyannamesi ekinde Form-2 Transfer Fiyatlandırması Bildirimini eksiksiz doldur",
      "Büyük Mükellefler Vergi Dairesi mükellefleri için Yıllık Transfer Fiyatlandırması Raporunu onaylayıp arşivle"
    ]
  },
  {
    "id": "maliye_supheli_ticari_alacaklar_ve_karsilik_ayirma_vuk323",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "şüpheli ticari alacak karşılığı",
      "vuk 323 icra takibi karşılık ayırma",
      "dava safhasındaki alacaklar karşılık",
      "protesto edilmiş senet karşılığı",
      "alacağın şüpheli hale geldiği dönem"
    ],
    "baslik": "Vergi Usul Kanunu: Şüpheli Ticari Alacak Karşılığı & İcra Takibi (VUK 323)",
    "ikon": "📉",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Geçici Vergi Dönem Sonu / Yıl Sonu Kapanışı",
    "hazirlikZamani": "Dava Dilekçesi, İcra Takip Talebi & Protesto Evrakı",
    "hazirlikSaatOncesi": 24,
    "akilliFisilti": "📊 VUK m. 323 gereği bir alacağa şüpheli alacak karşılığı ayrılabilmesi için alacağın ticari ve zirai kazancın elde edilmesiyle ilgili olması ve dava veya icra safhasında bulunması zorunludur.",
    "oncedenYapilacaklar": [
      "Vadesi geçtiği halde ödenmeyen faturalı ticari alacak için borçlu aleyhine UYAP üzerinden icra takibi başlat",
      "İcra takip talebi ve ödeme emrinin borçluya tebliğe çıkarıldığını gösteren tensip tutanağını al",
      "Karşılığı sadece alacağın şüpheli hale geldiği takvim yılında gider yaz; sonraki yıllarda karşılık ayrılamaz kuralına dikkat et",
      "Dönem sonunda \"128 Şüpheli Ticari Alacaklar\" ve \"654 Karşılık Giderleri\" muhasebe fişini kaydet"
    ]
  },
  {
    "id": "maliye_kdv_tevkifati_iadesi_ve_karsit_inceleme_tutanaklari",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "kdv tevkifatı iade talebi",
      "yeminli mali müşavir kdv raporu",
      "karşıt inceleme tutanağı tevkifat",
      "kdv genel uygulama tebliği tevkifat",
      "indirilecek kdv listesi geçmiş dönem"
    ],
    "baslik": "KDV İadesi: Kısmi Tevkifat İadesi & YMM Karşıt İnceleme Raporu",
    "ikon": "🧾",
    "renk": "#CFFAFE",
    "varsayilanZaman": "Tevkifatlı Satışın Yapıldığı Dönemi İzleyen Aylarda",
    "hazirlikZamani": "Tevkifatlı Faturalar, Yüklenilen KDV Listesi, İndirilecek KDV Listesi & Karşıt İnceleme Teyitleri",
    "hazirlikSaatOncesi": 48,
    "akilliFisilti": "📊 Kısmi tevkifata tabi işlemlerden doğan KDV iade taleplerinde, alıcının 2 No.lu KDV beyannamesiyle vergiyi beyan edip ödediği vergi dairesi sisteminden teyit edilmelidir.",
    "oncedenYapilacaklar": [
      "Tevkifat uygulanan fason tekstil, temizlik, güvenlik veya yapım işi faturalarını KDV Beyannamesinde Tevkifatlı İşlemler tablosuna işle",
      "İade talep edilen döneme ait Yüklenilen KDV ve İndirilecek KDV listelerini İnternet Vergi Dairesi (GİB) sistemine XML olarak yükle",
      "Alt tedarikçi firmalara YMM Karşıt İnceleme Tutanaklarını göndererek fatura ve defter kayıtlarını teyit ettir",
      "YMM KDV İadesi Tasdik Raporunu vergi dairesine teslim ederek teminatsız mahsuben veya nakden iadeyi sonuçlandır"
    ]
  },
  {
    "id": "maliye_finansman_gider_kisitlamasi_ve_kanunen_kabul_edilmeyen_gider",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "finansman gider kısıtlaması",
      "kvk 11/1-i yabancı kaynak özkaynak aşımı",
      "%10 kükeg finansman gideri",
      "özkaynakları aşan yabancı kaynak faiz kur farkı",
      "geçici vergi finansman kısıtlaması hesabı"
    ],
    "baslik": "Kurumlar Vergisi: Finansman Gider Kısıtlaması (%10 KKEG Hesabı)",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Her Geçici Vergi Dönemi ve Yıllık Kurumlar Vergisi Kapanışında",
    "hazirlikZamani": "Bilanço Yabancı Kaynaklar (Kısa + Uzun Vadeli) & Özkaynak Tablosu",
    "hazirlikSaatOncesi": 12,
    "akilliFisilti": "📊 Kullanılan yabancı kaynakları özkaynaklarını aşan işletmelerde, aşan kısma münhasır finansman giderlerinin (faiz, komisyon, kur farkı) %10'u Kanunen Kabul Edilmeyen Gider (KKEG) olarak matraha eklenir.",
    "oncedenYapilacaklar": [
      "Bilançodaki Kısa Vadeli Yabancı Kaynaklar (3xx) ve Uzun Vadeli Yabancı Kaynaklar (4xx) toplamını Özkaynaklar (5xx) toplamı ile karşılaştır",
      "Yabancı kaynaklar özkaynakları aşıyorsa aşan oranı (Aşan Kısım / Toplam Yabancı Kaynak) hesapla",
      "Dönem içinde katlanılan finansman giderleri toplamının aşan kısma isabet eden tutarının %10'unu belirle",
      "Hesaplanan %10'luk tutarı beyannamede \"Kanunen Kabul Edilmeyen Giderler\" satırına ekleyerek matraha dahil et"
    ]
  },
  {
    "id": "hukuk_kira_tahliye_ihtari_352",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "tahliye taahhütnamesi",
      "tbk 352",
      "tahliye takibi",
      "örnek no 14",
      "kiracı tahliyesi"
    ],
    "baslik": "TBK 352 Tahliye Taahhüdü İcra Takibi",
    "ikon": "📜",
    "renk": "#E0E7FF",
    "varsayilanZaman": "1 Ay İçinde Takip Açılmalı",
    "akilliFisilti": "⚖️ Tahliye taahhüdünde belirtilen tarihten itibaren 1 ay içinde icra takibi veya tahliye davası açılmalıdır.",
    "oncedenYapilacaklar": [
      "Tahliye taahhütnamesindeki tahliye tarihini ve kira sözleşmesi başlangıç tarihini karşılaştır (Aynı tarihli olmamalı)",
      "Taahhüt tarihinden itibaren 30 günlük hak düşürücü süre geçmeden İcra Müdürlüğünden Örnek No: 14 tahliye emri talep et",
      "Kiracıya tebligatın PTT UETS / memur eliyle yapıldığını teyit et ve 15 günlük itiraz süresini UYAP’tan izle",
      "İtiraz edilmezse derhal icra dairesinden taşınmazın tahliyesi için tahliye memuru ve çilingir randevusu oluştur"
    ]
  },
  {
    "id": "hukuk_ihtiyati_haciz_iik257",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ihtiyati haciz",
      "iik 257",
      "haciz teminatı",
      "ihtiyati tedbir haciz"
    ],
    "baslik": "İİK 257 İhtiyati Haciz & %15-20 Teminat",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "10 Günlük İcra İnfaz Süresi",
    "akilliFisilti": "⚖️ Mahkemeden ihtiyati haciz kararı alındıktan sonra 10 gün içinde icra dairesine infaz talebinde bulunulmalıdır.",
    "oncedenYapilacaklar": [
      "Mahkeme tensip zaptındaki %15 veya %20 nakdi/teminat mektubunu mahkeme veznesine depo et",
      "10 günlük yasal hak düşürücü süre dolmadan yetkili İcra Müdürlüğüne başvurarak menkul/gayrimenkul/banka haciz müzekkerelerini işlet",
      "Haciz uygulandıktan sonra 7 gün içinde esas takibe geç (İlamsız takip veya dava aç)",
      "Borçlunun İİK 265 uyarınca yetki, teminat ve sebebe itiraz ihtimaline karşı duruşma dosyasını hazırla"
    ]
  },
  {
    "id": "hukuk_vesayet_vasi_raporu_tmk454",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "vasi yıllık rapor",
      "vesayet raporu",
      "tmk 454",
      "vesayet defteri",
      "sulh hukuk vasi"
    ],
    "baslik": "TMK 454 Yıllık Vasi Hesap Raporu",
    "ikon": "🏛️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Yılda 1 Kez (Ocak-Şubat)",
    "akilliFisilti": "🏛️ Vasi, kısıtlının malvarlığı idaresine ilişkin yıllık hesap raporunu Sulh Hukuk Mahkemesine sunmalıdır.",
    "oncedenYapilacaklar": [
      "Kısıtlının banka hesap hareketlerini, maaş ekstrelerini ve kira/taşınmaz gelir belgelerini toparla",
      "Yıl boyunca kısıtlı adına yapılan sağlık, bakım ve iaşe giderlerinin fatura/makbuz dökümünü hazırla",
      "Sulh Hukuk Mahkemesi onaylı vesayet defteri formatına uygun gelir-gider tablosunu tanzim et",
      "Olağanüstü tasarruflar (araç/gayrimenkul alım-satımı) varsa mahkemenin ön izin kararlarını rapora ekle"
    ]
  },
  {
    "id": "hukuk_kamulastirma_bedel_tespiti",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "kamulaştırma bedel tespiti",
      "2942 sayılı kanun",
      "kamulaştırma tescil",
      "acele kamulaştırma"
    ],
    "baslik": "2942 Sayılı Kanun Kamulaştırma Bedeli",
    "ikon": "📐",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Duruşma Öncesi Hazırlık",
    "akilliFisilti": "⚖️ Kamulaştırma bedel tespiti ve tescil davalarında idarenin teklifi ile emsal rayiç analizleri kıyaslanır.",
    "oncedenYapilacaklar": [
      "Dava konusu taşınmazın cinsi, imar durumu, topoğrafik yapısı ve ana yollara cephesini gösteren çap ve imar krokisini al",
      "Değerleme tarihinden önceki yakın tarihli tapu emsal satış sözleşmelerini ve mahkeme emsal bedellerini dosyaya sun",
      "Bilirkişi keşfi öncesinde zemin üzerindeki müştemilat, ağaç, kuyu ve yapıların fotoğraflı tespit listesini hazırla",
      "Mahkemece belirlenen kamulaştırma bedelinin ilgililer adına vadeli banka hesabına bloke edilmesini teyit et"
    ]
  },
  {
    "id": "hukuk_marka_itiraz_tpe_smdk",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "marka bülten itirazı",
      "türkpatent marka itiraz",
      "sınai mülkiyet 6769",
      "marka iltibas"
    ],
    "baslik": "6769 SMK TürkPatent Marka Bülten İtirazı",
    "ikon": "®️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "2 Aylık Bülten Süresi",
    "akilliFisilti": "⚖️ Marka bülteninde yayımlanan benzer markaya karşı 2 ay içinde TürkPatent nezdinde itiraz edilmelidir.",
    "oncedenYapilacaklar": [
      "Resmi Marka Bültenindeki başvuru ile müvekkil markasının NICE sınıflarını ve görsel/işitsel iltibas düzeyini analiz et",
      "Müvekkilin öncelikli tescil belgesini, piyasadaki bilinirlik ve tanınmışlık kanıtlarını (fatura, reklam, katalog) derle",
      "EPATS sistemi üzerinden resmi itiraz formunu doldurarak itiraz harcını yatır",
      "Karşı tarafın 5 yıllık tescil savunması (kullanım ispatı talebi) yapma riskine karşı kullanım kanıtlarını hazır tut"
    ]
  },
  {
    "id": "maliye_enflasyon_duzeltmesi_vuk298",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "enflasyon düzeltmesi",
      "vuk 298",
      "parasal olmayan kıymetler",
      "düzeltme katsayısı",
      "enflasyon fark hesabı"
    ],
    "baslik": "VUK 298 Enflasyon Düzeltmesi Hesabı",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Geçici / Yıllık Vergi Dönemi",
    "akilliFisilti": "📊 Parasal olmayan kıymetler Yİ-ÜFE endeks katsayısı ile düzeltilerek 698 Enflasyon Düzeltme Hesabına aktarılır.",
    "oncedenYapilacaklar": [
      "Bilanço aktif ve pasifindeki tüm kalemleri parasal ve parasal olmayan (Stoklar, Maddi Duran Varlıklar, Özkaynaklar) olarak ayrıştır",
      "Parasal olmayan kıymetlerin deftere giriş tarihlerini ve ROFM (Reel Olmayan Finansman Maliyeti) ayrıştırmasını tamamla",
      "TÜİK Yİ-ÜFE endeks katsayılarını uygulayarak dönem sonu düzeltilmiş değerleri ve fark kayıtlarını (502, 503, 698) oluştur",
      "Vergili enflasyon düzeltmesinde 698 hesap bakiyesinin 648/658 hesaplar üzerinden dönem kâr/zararına etkisini kontrol et"
    ]
  },
  {
    "id": "maliye_arge_5746_bordro_muafiyeti",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "5746 arge teşviki",
      "arge bordro",
      "teknokent gelir vergisi istisnası",
      "arge sgk muafiyeti"
    ],
    "baslik": "5746 Sayılı Ar-Ge & Teknokent Teşvik Bordrosu",
    "ikon": "🔬",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Ayın 26’sına Kadar",
    "akilliFisilti": "📊 Ar-Ge ve tasarım personelinin proje bazlı fiziki/uzaktan çalışma saatleri bordro teşvik oranlarını belirler.",
    "oncedenYapilacaklar": [
      "PDKS ve Teknopark/Bakanlık portalı kart basım kayıtlarından personelin Ar-Ge iç ve dış çalışma saatlerini çek",
      "Yüksek lisans ve doktora yapan araştırmacıların ek istisna oranlarını ve %100 Gelir Vergisi stopaj teşvikini uygula",
      "Damga vergisi ve SGK %50 işveren hissesi prim muafiyeti hesaplamalarını bordroya yansıt",
      "AGY (Ar-Ge ve Tasarım Merkezi Yıllık Faaliyet Raporu) için aylık proje adam/saat dağılım tablosunu arşivle"
    ]
  },
  {
    "id": "maliye_ithalat_kkdf_gumruk_kesintisi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "kkdf kesintisi",
      "vadeli ithalat",
      "kkdf %6",
      "kabul kredili ithalat"
    ],
    "baslik": "Vadeli İthalatta %6 KKDF ve Vergi Matrahı",
    "ikon": "🚢",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Gümrük Beyannamesi Tescili",
    "akilliFisilti": "📊 Mal mukabili veya kabul kredili vadeli ithalatlarda %6 Kaynak Kullanımını Destekleme Fonu doğar.",
    "oncedenYapilacaklar": [
      "Ödeme şeklinin peşin mi yoksa vadeli (mal mukabili/kabul kredili) mi olduğunu proforma fatura ve swift ile teyit et",
      "Vadeli ise CIF bedel üzerinden %6 KKDF tahakkukunu hesapla ve gümrük KDV matrahına dahil edildiğini kontrol et",
      "KKDF’nin süresinde gümrük veznesine yatırıldığını ve 153 Ticari Mallar / Stok maliyetine intikalini sağla",
      "Peşin ödeme yapılmışsa transfer bildirim formunun gümrük tescilinden önce onaylandığını doğrula"
    ]
  },
  {
    "id": "maliye_ortaklar_cari_adat_faizi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "adat faizi",
      "131 ortaklar cari",
      "adatlandırma",
      "emsal faiz kdv"
    ],
    "baslik": "131 Ortaklardan Alacaklar Adat & KDV Hesabı",
    "ikon": "🧮",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Geçici Vergi Dönem Sonları",
    "akilliFisilti": "📊 Şirket ortaklarının şirketten çektiği nakit paralar için TCMB reeskont/avans faiz oranı ile adat faturası kesilir.",
    "oncedenYapilacaklar": [
      "131 ve 231 hesapların günlük bakiye hareketlerini çekerek kümülatif gün/tutar adat tablosunu çıkar",
      "TCMB ticari krediler ağırlıklı ortalama faiz oranı veya reeskont avans faiz oranını emsal oran olarak uygula",
      "Hesaplanan faiz tutarı üzerinden şirket adına ortağa %20 KDV’li adat faiz faturası tanzim et",
      "Faturayı 642 Faiz Gelirleri ve 391 Hesaplanan KDV hesaplarına kaydederek geçici vergi matrahına ekle"
    ]
  },
  {
    "id": "maliye_genel_kurul_tescil_ilan",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "olağan genel kurul",
      "genel kurul tescil",
      "mersis genel kurul",
      "ticaret sicil ilan"
    ],
    "baslik": "TTK Anonim/Limited Şirket Olağan Genel Kurulu",
    "ikon": "🏛️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Yıl İlk 3 Ay İçinde",
    "akilliFisilti": "📊 Şirketlerin faaliyet dönemini takip eden ilk 3 ay içinde genel kurul yaparak sicile tescil ettirmesi zorunludur.",
    "oncedenYapilacaklar": [
      "Yönetim kurulu yıllık faaliyet raporunu ve bağımsız denetim/finansal tabloları hazırla",
      "MERSİS sistemi üzerinden genel kurul toplantı başvurusu yap ve gündem maddelerini belirle",
      "Bakanlık temsilcisi (komiser) katılımı zorunlu bir karar varsa Ticaret İl Müdürlüğüne harç yatırıp komiser talep et",
      "Toplantı tutanağı, hazirun cetveli ve kâr dağıtım kararını Ticaret Sicil Müdürlüğüne tescil ve ilan ettir"
    ]
  },
  {
    "id": "hukuk_istinaf_kanun_yolu_hmk345",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "istinaf dilekçesi hmk 345",
      "istinaf süresi 2 hafta",
      "bölge adliye mahkemesi başvuru",
      "istinaf harcı tehir-i icra"
    ],
    "baslik": "HMK 345 İstinaf Kanun Yolu Başvurusu & Tehir-i İcra",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Gerekçeli Karar Tebliğinden İtibaren 2 Hafta",
    "akilliFisilti": "⚖️ İstinaf süresi gerekçeli kararın tebliğinden itibaren 2 haftadır; icra takibini durdurmak için tehiri icra kararı alınmalıdır.",
    "oncedenYapilacaklar": [
      "Gerekçeli kararın UETS / fiziki tebliğ tarihini tam gün ve saat olarak UYAP üzerinden doğrula",
      "İstinaf başvuru dilekçesini somut delil ve hukuki gerekçelerle (HMK 341-355) tanzim et",
      "İstinaf maktu/nispi başvuru ve karar harçları ile istinaf gider avansını mahkeme veznesine yatır",
      "İcra takibi başlamışsa İcra Müdürlüğüne derhal başvurarak dosya kapak hesabı tutarında nakit/teminat mektubu yatırıp Mehil Vesikası al"
    ]
  },
  {
    "id": "hukuk_sulh_hukuk_ortakligin_giderilmesi_izaleisyuyu",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ortaklığın giderilmesi davası",
      "izale-i şüyu satış",
      "hisseli taşınmaz satış memurluğu",
      "aynen taksim satış"
    ],
    "baslik": "TMK 698 Ortaklığın Giderilmesi (İzale-i Şüyu) & Satış",
    "ikon": "🏛️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Dava Açılışı / Satış Memurluğu",
    "akilliFisilti": "⚖️ Ortaklığın giderilmesinde öncelikle aynen taksim araştırılır; mümkün değilse Satış Memurluğu eliyle açık artırma yapılır.",
    "oncedenYapilacaklar": [
      "Tüm paydaşları ve mirasçıları gösteren güncel Tapu Kaydı ve Nüfus Kayıt Örneğini (Mirasçılık Belgesi) dosyaya ekle",
      "Kadastro Müdürlüğünden aplikasyon krokisi ve Belediye İmar Müdürlüğünden aynen taksimin imar açısından mümkün olup olmadığını sorgula",
      "Bilirkişi kıymet takdiri keşfinde taşınmazın güncel piyasa rayicini, üzerindeki muhdesatları ve ağaçları tespit ettir",
      "Kesinleşen karar sonrası Sulh Hukuk Satış Memurluğuna başvurarak UYAP e-Satış portalı üzerinden açık artırma ilanını yayınlat"
    ]
  },
  {
    "id": "hukuk_ceza_hukuku_hagm_itiraz_cmk231",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "hagm itiraz cmk 231",
      "hükmün açıklanmasının geri bırakılması",
      "ağır ceza hagm itiraz 7 gün",
      "hagm denetim süresi"
    ],
    "baslik": "CMK 231 Hükmün Açıklanmasının Geri Bırakılması (HAGB) İtirazı",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Tefhim/Tebliğden İtibaren 7 Gün",
    "akilliFisilti": "⚖️ HAGB kararlarına karşı tefhim veya tebliğden itibaren 7 gün içinde bir üst Ağır Ceza Mahkemesine itiraz edilebilir.",
    "oncedenYapilacaklar": [
      "Mahkeme duruşma tutanağındaki HAGB kararının sanığın açık rızası alınarak verilip verilmediğini kontrol et",
      "7 günlük hak düşürücü süre geçmeden kararı veren mahkemeye üst mahkeme incelenmek üzere İtiraz Dilekçesi sun",
      "Maddi ve hukuki incelemenin (delillerin takdiri ve sübut bulup bulmadığının) yapılmadığını itiraz gerekçelerinde vurgula",
      "İtiraz kabul edilmezse 5 yıllık denetim süresi boyunca kasıtlı bir suç işlenmemesi ve adli kontrol yükümlülüklerine uyulmasını müvekkile tebliğ et"
    ]
  },
  {
    "id": "hukuk_ticaret_hukuku_konkordato_komiser_raporu",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "konkordato geçici mühlet",
      "konkordato komiser raporu",
      "alacaklılar toplantısı iik 287",
      "konkordato projesi tasdik"
    ],
    "baslik": "İİK 287 Konkordato Geçici Mühlet & Komiser Denetimi",
    "ikon": "📊",
    "renk": "#E0E7FF",
    "varsayilanZaman": "3 Aylık Geçici Mühlet İçinde",
    "akilliFisilti": "⚖️ Asliye Ticaret Mahkemesinin verdiği geçici mühletle tüm icra takipleri ve ihtiyati hacizler durur.",
    "oncedenYapilacaklar": [
      "Bağımsız Denetim onaylı Konkordato Ön Projesini ve şirketin ayrıntılı bilanço/gelir tablolarını mahkemeye sun",
      "Mahkemece atanan 3 kişilik Konkordato Komiserler Kuruluna haftalık nakit akış ve stok hareket raporlarını ilet",
      "İİK 299 uyarınca alacaklıların 15 gün içinde alacaklarını kaydettirmesi için Basın İlan Kurumu ve Ticaret Sicil Gazetesinde ilan aç",
      "Alacaklılar toplantısında nisap çoğunluğunun (%50 alacaklı sayısı ve %50 alacak tutarı) sağlanması için revize ödeme planını hazırla"
    ]
  },
  {
    "id": "hukuk_tuketici_hakem_heyeti_itiraz_thh_6502",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "tüketici hakem heyeti kararına itiraz",
      "thh 15 günlük dava süresi",
      "tüketici mahkemesi thh iptal",
      "tüketici parasal sınır"
    ],
    "baslik": "6502 Sayılı Kanun Tüketici Hakem Heyeti (THH) Kararına İtiraz",
    "ikon": "📜",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Tebliğden İtibaren 15 Gün",
    "akilliFisilti": "⚖️ THH kararlarına karşı tebliğden itibaren 15 gün içinde Tüketici Mahkemesinde dava açılmalıdır; karar kesindir.",
    "oncedenYapilacaklar": [
      "İl/İlçe THH kararının tebliğ zarfındaki PTT barkod tarihini baz alarak 15 günlük dava açma süresini hesapla",
      "Uyuşmazlık bedelinin Ticaret Bakanlığınca ilan edilen yıllık THH zorunlu parasal sınır dahilinde olup olmadığını kontrol et",
      "Yetkili Tüketici Mahkemesinde \"THH Kararının İptali\" davası açarak dava dilekçesine ayıplı mal bilirkişi raporunu ekle",
      "Dava açıldığında icra takibini durdurmak için mahkemeden teminatsız/teminatlı \"İhtiyati Tedbir\" talep et"
    ]
  },
  {
    "id": "maliye_amortisman_azalan_bakiyeler_vuk315",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "azalan bakiyeler amortisman",
      "vuk 315 hızlandırılmış amortisman",
      "kıst amortisman binek oto",
      "amortismana tabi iktisadi kıymet"
    ],
    "baslik": "VUK 315 Azalan Bakiyeler (Hızlandırılmış) Amortisman Hesabı",
    "ikon": "📉",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Dönem Sonu / Geçici Vergi",
    "akilliFisilti": "📊 Azalan bakiyeler usulünde amortisman oranı normal oranın 2 katıdır ve %50 sınırını aşamaz.",
    "oncedenYapilacaklar": [
      "253, 254, 255 hesaplardaki iktisadi kıymetlerin faydalı ömür ve amortisman oranlarını VUK Genel Tebliği listesinden belirle",
      "Binek otomobillerde VUK 320 uyarınca aktife girdiği ay için \"Kıst Amortisman\" ve KKEG ayrıştırmasını yap",
      "Net defter değeri üzerinden amortisman tutarını hesaplayıp 770/760/730 borç, 257 Birikmiş Amortismanlar alacak kaydını aç",
      "Son faydalı ömür yılında kalan net defter değerinin tamamını o yılın amortisman gideri olarak kapat"
    ]
  },
  {
    "id": "maliye_kdvtutari_gecikme_zammi_6183",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "6183 gecikme zammı hesabı",
      "vergi borcu yapılandırma",
      "gecikme faizi günlük oran",
      "tecil terkin 6183 m48"
    ],
    "baslik": "6183 Sayılı Kanun Vergi Borcu Gecikme Zammı & Tecil (m. 48)",
    "ikon": "🧮",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Vade Aşımı Günü",
    "akilliFisilti": "📊 Vadesinde ödenmeyen amme alacaklarına Resmi Gazete’de ilan edilen aylık ve günlük gecikme zammı işletilir.",
    "oncedenYapilacaklar": [
      "İnteraktif Vergi Dairesi (İVD) üzerinden mükellefin tahakkuk fişlerindeki kesinleşmiş vade tarihlerini çıkar",
      "Vade tarihi ile ödeme tarihi arasındaki gün sayısı üzerinden kümülatif gecikme zammı tutarını simüle et",
      "Mükellef ödeme güçlüğü içindeyse 6183 sayılı Kanun m. 48 kapsamında 36 aya kadar \"Çok Zor Durum Tecil Başvurusu\" hazırla",
      "Tecil için vergi dairesine sunulacak teminat mektubu, gayrimenkul ipoteği veya menkul haciz listesini tamamla"
    ]
  },
  {
    "id": "maliye_gecici_vergi_yanilma_payi_yuzde10",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "geçici vergi %10 yanılma payı",
      "eksik beyan cezası",
      "geçici vergi matrah farkı",
      "vuk 344 vergi ziyaı geçici"
    ],
    "baslik": "Geçici Vergide %10 Yanılma Payı & Re’sen Tarhiyat Riski",
    "ikon": "⚠️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Geçici Vergi Beyan Dönemi",
    "akilliFisilti": "📊 Geçici vergi matrahının %10’u aşan oranda eksik beyan edildiği tespit edilirse vergi ziyaı cezası kesilir.",
    "oncedenYapilacaklar": [
      "Dönem sonu geçici mizanında gelir-gider hesaplarını, mali kâr ve ticari kâr mutabakatını yap",
      "KKEG (Kanunen Kabul Edilmeyen Giderler) ve istisna/indirim kalemlerini matraha doğru ekle",
      "Dönem sonu stok sayım farklarını ve değerleme kayıtlarını inceleyerek matrahın %10 hata payı sınırında kalmadığını doğrula",
      "Eski dönemlerde eksik beyan fark edilmişse cezasız VUK 371 Pişmanlık ve Islah dilekçesiyle düzeltme beyannamesi ver"
    ]
  },
  {
    "id": "maliye_bagimsiz_denetim_hadleri_kgk",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "bağımsız denetim hadleri",
      "kgk tms tfrs zorunluluk",
      "aktif toplamı ciro çalışan sayısı",
      "türk ticaret kanunu 398"
    ],
    "baslik": "TTK 398 & KGK Bağımsız Denetim Kriterleri Tespiti",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Yıl Sonu Bilanço Kapanışı",
    "akilliFisilti": "📊 Aktif toplamı, yıllık net satış hasılatı ve çalışan sayısı kriterlerinden en az ikisini üst üste 2 yıl aşan şirketler denetime tabidir.",
    "oncedenYapilacaklar": [
      "Şirketin son 2 yıla ait Yıllık Gelir Tablosu net satış hasılatını ve Bilanço aktif toplamını KGK güncel limitleriyle kıyasla",
      "SGK aylık prim ve hizmet bildirgelerinden yıl içi ortalama çalışan sayısını hesapla",
      "Limitleri aşan şirket için Genel Kurulda Bağımsız Denetçi seçim kararını alıp Ticaret Sicil Gazetesinde tescil ettir",
      "TFRS / BOBİ FRS uyumlu finansal tabloların ve denetim dipnotlarının denetim havuzuna aktarımını planla"
    ]
  },
  {
    "id": "maliye_muhtasar_sgk_sgk_tesvik_5510_tescil",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "5510 sgk %5 teşvik",
      "muhtasar ve prim hizmet beyannamesi",
      "sgk borcu teşvik iptali",
      "muhsgk onay"
    ],
    "baslik": "5510 Sayılı Kanun %5 Hazine Prim İndirimi & MUHSGK",
    "ikon": "👥",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Her Ayın 26’sı Saat 23:59",
    "akilliFisilti": "📊 Cari ay SGK prim borcu veya geçmiş dönem vadesi geçmiş borcu olan mükellefler %5 hazine teşvikinden yararlanamaz.",
    "oncedenYapilacaklar": [
      "SGK E-Borçsuzluk portalından işyerinin vadesi geçmiş prim ve idari para cezası borcu olmadığını teyit et",
      "MUHSGK XML dosyasında 05510 kanun numarasını seçerek %5 malullük/yaşlılık/ölüm sigortası işveren hissesi indirimini uygula",
      "Gelir vergisi stopajı ile SGK bildirimlerini tek beyannamede eşleştirip tahakkuk fişlerini al",
      "İndirimin yanmaması için SGK tahakkukunun en geç ayın son gününe kadar bankadan ödenmesini mükellefe bildir"
    ]
  },
  {
    "id": "hukuk_kira_ihtiyac_sebebiyle_tahliye_tbk350",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ihtiyaç sebebiyle tahliye tbk 350",
      "kendisi eşi çocuğu konut ihtiyacı",
      "dönem sonu 1 ay tahliye davası",
      "3 yıl yeniden kiralama yasağı"
    ],
    "baslik": "TBK 350 Gereksinim (İhtiyaç) Nedeniyle Tahliye Davası",
    "ikon": "🏠",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Kira Dönemi Bitiminden İtibaren 1 Ay",
    "akilliFisilti": "⚖️ Konut ihtiyacı samimi ve zorunlu olmalıdır; tahliye sonrası taşınmaz 3 yıl boyunca eski kiracı haricine kiralanamaz.",
    "oncedenYapilacaklar": [
      "Kira sözleşmesinin yenilenme tarihini kontrol ederek dönem sonundan itibaren 1 aylık hak düşürücü dava açma süresini hesapla",
      "İhtiyacın gerçek, samimi ve zorunlu olduğunu ispatlayan belgeleri (evlilik, tayin, kirada oturulduğuna dair kontrat) dosyaya ekle",
      "Dava açmadan önce zorunlu dava şartı arabuluculuk başvurusunu tamamlayıp son tutanağı al",
      "Sulh Hukuk Mahkemesinde tahliye davasını açıp taşınmazın 3 yıllık yeniden kiralama yasağını (TBK 355) müvekkile hatırlat"
    ]
  },
  {
    "id": "hukuk_icra_haciz_ihbarnamesi_89_1_2_3",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "89/1 haciz ihbarnamesi",
      "üçüncü şahıstaki hak ve alacak",
      "89/1 7 günlük itiraz süresi",
      "89/3 menfi tespit davası 15 gün"
    ],
    "baslik": "İİK 89 Üçüncü Şahıslara Gönderilen Haciz İhbarnameleri",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Tebliğden İtibaren 7 Gün",
    "akilliFisilti": "⚖️ 89/1 haciz ihbarnamesine 7 gün içinde itiraz edilmezse borç 3. kişinin zimmetinde sayılır ve 89/2 ihbarnamesi çıkar.",
    "oncedenYapilacaklar": [
      "Tebliğ edilen 89/1 ihbarnamesindeki borçlunun şirkette cari hesap, hak ediş veya maaş alacağı olup olmadığını mali kayıtlardan denetle",
      "Borçlunun alacağı yoksa 7 günlük yasal süre içinde İcra Müdürlüğüne \"Borçlunun Şirketimiz Nezdinde Alacağı Yoktur\" itirazını sun",
      "İtiraz süresi kaçırılmışsa 89/3 tebliğinden itibaren 15 gün içinde Asliye Hukuk Mahkemesinde Menfi Tespit Davası aç",
      "Borçlunun doğmuş ve kesinleşmiş alacağı varsa tutarı icra dairesinin banka IBAN hesabına bloke et"
    ]
  },
  {
    "id": "hukuk_aile_anlasmali_bosanma_protokolu_tmk166",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "anlaşmalı boşanma protokolü tmk 166",
      "en az 1 yıllık evlilik şartı",
      "velayet iştirak nafakası anlaşma",
      "maddi manevi tazminat feragat"
    ],
    "baslik": "TMK 166/3 Anlaşmalı Boşanma Protokolü & Duruşma",
    "ikon": "📜",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Duruşma Günü İki Taraf Bizzat Hazır",
    "akilliFisilti": "⚖️ Anlaşmalı boşanma için evlilik en az 1 yıl sürmüş olmalı ve taraflar hakim huzurunda iradelerini bizzat açıklamalıdır.",
    "oncedenYapilacaklar": [
      "Evlilik cüzdanı ve nüfus kaydından evliliğin 1 yılı doldurduğunu teyit et",
      "Protokolde velayet, kişisel ilişki günleri, iştirak/yoksulluk nafakası ve maddi-manevi tazminat şartlarını tereddütsüz netleştir",
      "Taşınmaz ve araç devirleri varsa tapu/ruhsat bilgilerini protokole harç ve masraf muafiyetini belirterek ekle",
      "Aile Mahkemesi duruşmasında her iki tarafın vekil ile temsil edilseler dahi bizzat hazır bulunmasını sağla"
    ]
  },
  {
    "id": "hukuk_ceza_tutukluluga_itiraz_cmk101",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "tutukluluğa itiraz dilekçesi cmk 101",
      "tutuklama 7 günlük itiraz süresi",
      "adli kontrol talep cmk 109",
      "kaçma şüphesi delil karartma"
    ],
    "baslik": "CMK 101/5 Tutuklama Kararına İtiraz & Adli Kontrol Talebi",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Karardan İtibaren 7 Gün",
    "akilliFisilti": "⚖️ Sulh Ceza Hakimliğinin tutuklama kararına karşı 7 gün içinde bir üst Sulh Ceza/Asliye Ceza Mahkemesine itiraz edilir.",
    "oncedenYapilacaklar": [
      "Müvekkilin sabit ikametgah sahibi olduğunu, delillerin toplandığını ve kaçma/karartma şüphesinin bulunmadığını belgele",
      "Katalog suçlar kapsamında dahi tutuklamanın ölçülülük ilkesine aykırı olduğunu Anayasa Mahkemesi emsal kararlarıyla vurgula",
      "Öncelikle tahliye, mahkeme aksi kanaatteyse CMK 109 uyarınca Yurt Dışı Çıkış Yasağı ve İmza Yükümlülüğü ile Adli Kontrol talep et",
      "İtiraz dilekçesini UYAP üzerinden üst mahkemeye gönderilmek üzere kararı veren Sulh Ceza Hakimliğine ilet"
    ]
  },
  {
    "id": "hukuk_is_kidem_ihbar_fazla_mesai_hesabi",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "kıdem tazminatı tavanı hesabı",
      "ihbar tazminatı bildirim süresi",
      "fazla mesai 270 saat sınırı",
      "ulusal bayram genel tatil ubgt"
    ],
    "baslik": "4857 Sayılı İş Kanunu Kıdem, İhbar & Fazla Mesai Bilirkişi Hesabı",
    "ikon": "💼",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Arabuluculuk / Dava Hazırlığı",
    "akilliFisilti": "⚖️ Kıdem tazminatı giydirilmiş brüt ücret üzerinden ve yasal tavanı aşmayacak şekilde hesaplanır.",
    "oncedenYapilacaklar": [
      "İşçinin SGK hizmet dökümündeki giriş-çıkış tarihlerinden net kıdem süresini (Yıl, Ay, Gün) çıkar",
      "Çıplak ücrete yol, yemek, ikramiye ve yakacak gibi düzenli ayni/nakdi yardımları ekleyerek Giydirilmiş Brüt Ücreti bul",
      "Haftalık 45 saati aşan çalışmalar için saatlik ücretin %50 artırımlı tutarı üzerinden Fazla Çalışma alacağını hesapla",
      "Damga Vergisi haricinde kıdem tazminatından Gelir Vergisi ve SGK primi kesintisi yapılmayacağını kontrol et"
    ]
  },
  {
    "id": "maliye_supheli_alacak_icra_karsilik_vuk323",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "şüpheli ticari alacak karşılığı",
      "vuk 323 icra takibi",
      "dava safhasındaki alacaklar",
      "654 karşılık gideri 128"
    ],
    "baslik": "VUK 323 Şüpheli Ticari Alacak Karşılığı & Karşılık İptali",
    "ikon": "📉",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Dava/İcra Açıldığı Dönem",
    "akilliFisilti": "📊 Alacağın şüpheli hale geldiği yılda karşılık ayrılması zorunludur; sonraki yıllarda geçmişe dönük karşılık ayrılamaz.",
    "oncedenYapilacaklar": [
      "Alacağın ticari ve zirai kazancın elde edilmesi ve idame ettirilmesiyle ilgili olduğunu fatura ve cari hesapla teyit et",
      "Borçlu aleyhine açılan icra takip talebini veya mahkeme dava tensip zaptını dosyalayarak şüpheli hali ispatla",
      "120 Alıcılar hesabındaki tutarı 128 Şüpheli Ticari Alacaklar hesabına virmanla ve 654 Karşılık Gideri kaydı aç",
      "Sonradan tahsil edilen tutarları 671 Önceki Dönem Gelir ve Kârları veya 644 Konusu Kalmayan Karşılıklar hesabına kaydet"
    ]
  },
  {
    "id": "maliye_finansman_gider_kisitlamasi_yuzde10_hesap",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "finansman gider kısıtlaması",
      "kvk 11/1-i gider kısıtlaması",
      "özkaynak yabancı kaynak oranı",
      "kkeg finansman faiz"
    ],
    "baslik": "KVK 11/1-i Finansman Gider Kısıtlaması (%10 KKEG)",
    "ikon": "🧮",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Geçici ve Yıllık Kurumlar Vergisi",
    "akilliFisilti": "📊 Yabancı kaynakları özkaynaklarını aşan kurumlarda, aşan kısma isabet eden faiz ve kur farklarının %10’u KKEG’dir.",
    "oncedenYapilacaklar": [
      "Bilanço pasifindeki Kısa ve Uzun Vadeli Yabancı Kaynaklar toplamını Özkaynaklar toplamı ile karşılaştır",
      "Yabancı kaynaklar > Özkaynaklar ise aşan tutarın toplam yabancı kaynaklara oranını (Aşım Oranı) hesapla",
      "Dönem içinde 780 Finansman Giderleri hesabına atılan faiz, komisyon ve kur farkı giderlerini listele",
      "Hesaplanan giderin aşım oranına düşen kısmının %10’unu bularak Kurumlar Vergisi beyannamesinde KKEG satırına ekle"
    ]
  },
  {
    "id": "maliye_ihracat_bedeli_ibkb_terkin_30bin_dolar",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "ihracat bedeli kabul belgesi ibkb",
      "tpkk ihracat 180 gün süresi",
      "ihracat bedeli terkin limiti 30000",
      "tcmb ihracat döviz satışı"
    ],
    "baslik": "TPKK İhracat Bedellerinin Yurda Getirilmesi (İBKB) & 180 Günlük Süre",
    "ikon": "🚢",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Fiili İhracattan İtibaren 180 Gün",
    "akilliFisilti": "📊 İhracat bedellerinin en az %80’i 180 gün içinde yurda getirilmeli ve TCMB zorunlu döviz satış oranı bankaca bozdurulmalıdır.",
    "oncedenYapilacaklar": [
      "GÇB (Gümrük Çıkış Beyannamesi) kapanma tarihinden itibaren 180 günlük yasal süreyi ERP üzerinde takip et",
      "Banka aracılığıyla gelen döviz için İBKB (İhracat Bedeli Kabul Belgesi) düzenlet ve güncel TCMB döviz satış oranını uygulat",
      "Açık kalan ihracat hesaplarında 30.000 USD’ye kadar olan tutarlar için banka nezdinde Terkin (Kapatma) işlemi yap",
      "Mücbir sebep durumunda Vergi Dairesi Başkanlığına başvurarak 24 aya kadar ek süre talep et"
    ]
  },
  {
    "id": "maliye_binek_oto_gider_kisitlamasi_amortisman_siniri",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "binek araç gider kısıtlaması",
      "akaryakıt bakım %70 gider %30 kkeg",
      "binek oto kiralama gider tavanı",
      "ötv kdv gider yazma sınırı"
    ],
    "baslik": "GVK 40/1 Binek Otomobil Gider Kısıtlaması (%70 Gider / %30 KKEG)",
    "ikon": "🚗",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Aylık Fatura Girişleri",
    "akilliFisilti": "📊 Binek otomobillerin akaryakıt, bakım, sigorta ve otopark giderlerinin en fazla %70’i gider yazılabilir, %30’u KKEG’dir.",
    "oncedenYapilacaklar": [
      "Şirket aktifinde kayıtlı veya kiralanan binek araçların benzin, HGS, kasko, yıkama ve bakım faturalarını ayrıştır",
      "Fatura KDV tutarının %70’ini 191 İndirilecek KDV’ye, %30’unu KKEG olarak gider hesaplarına kaydet",
      "Kiralık binek araçlarda aylık kira bedelinin Hazinece belirlenen yasal tavanı aşan kısmını doğrudan KKEG yap",
      "Yeni satın alınan binek araçlarda ÖTV ve KDV’nin doğrudan gider yazılabilecek azami tavan sınırını kontrol et"
    ]
  },
  {
    "id": "maliye_edefter_berat_yukleme_zaman_damgasi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "e-defter berat yükleme süresi",
      "yevmiye kebir beratı gib",
      "e-defter zaman damgası",
      "ikincil kopya gib saklama"
    ],
    "baslik": "GİB e-Defter Yevmiye/Kebir Berat Yükleme & Zaman Damgası",
    "ikon": "💾",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İlgili Ayı Takip Eden 3./4. Ayın Sonu",
    "akilliFisilti": "📊 e-Defter beratları aylık veya geçici vergi dönemleri bazında GİB sistemine yüklenmeli ve ikincil kopyaları arşivlenmelidir.",
    "oncedenYapilacaklar": [
      "Yevmiye defteri madde numaralarında boşluk, mükerrerlik veya tarih sırasızlığı olmadığını denetim modülüyle tara",
      "Mali Mühür veya e-İmza ile Yevmiye ve Defter-i Kebir XML dosyalarını imzalayıp e-Defter Beratlarını oluştur",
      "GİB e-Defter portalına beratları yükleyerek onaylı GİB Berat dosyalarını bilgisayara indir",
      "e-Defter ve berat dosyalarını \"GİB e-Defter Saklama Programı\" ile GİB bulut sistemine otomatik yedekle"
    ]
  },
  {
    "id": "hukuk_ise_iade_arabuluculuk_7036",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "işe iade davası arabuluculuk",
      "7036 sayılı kanun 1 ay süre",
      "iş güvencesi 30 işçi 6 ay kıdem",
      "boşta geçen süre 4 ay"
    ],
    "baslik": "7036 Sayılı Kanun İşe İade Zorunlu Arabuluculuk Başvurusu",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Fesih Bildiriminden İtibaren 1 Ay",
    "akilliFisilti": "⚖️ Fesih bildiriminin tebliğinden itibaren 1 ay içinde arabulucuya başvurulmalıdır; anlaşamama tutanağından sonra 2 hafta içinde dava açılır.",
    "oncedenYapilacaklar": [
      "İş sözleşmesinin fesih bildirim tarihini ve fesih gerekçesinin yazılı ve geçerli nedene dayanıp dayanmadığını incele",
      "İşyerinde en az 30 işçi çalışıp çalışmadığını ve işçinin en az 6 aylık kıdemi olup olmadığını (iş güvencesi şartları) doğrula",
      "Yetkili Adliye Arabuluculuk Bürosuna UYAP üzerinden zorunlu arabuluculuk başvuru formunu ilet",
      "Arabuluculukta anlaşma sağlanamazsa Son Tutanağın düzenlendiği tarihten itibaren 2 hafta içinde İş Mahkemesinde dava aç"
    ]
  },
  {
    "id": "hukuk_menfi_tespit_iik72_yuzde115_teminat",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "menfi tespit davası iik 72",
      "icra takibinden önce menfi tespit",
      "icra veznesi paranın alacaklıya ödenmemesi",
      "%115 teminat icrayı durdurma"
    ],
    "baslik": "İİK 72 Menfi Tespit Davası & İhtiyati Tedbir Teminatı",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "İcra Takibi Öncesi / Esnası",
    "akilliFisilti": "⚖️ İcra takibinden sonra açılan menfi tespit davasında takibi durdurmak için borcun en az %115’i oranında teminat yatırılır.",
    "oncedenYapilacaklar": [
      "Borçlunun borçlu olmadığını kanıtlayan sahtelik, ödeme dekontu, zamanaşımı veya bedelsizlik delillerini dava dilekçesine ekle",
      "Takip durdurma veya icra veznesindeki paranın alacaklıya ödenmesini engellemek için mahkemeden %115 teminatla İhtiyati Tedbir iste",
      "Mahkemece belirlenen nakit veya banka teminat mektubunu vezneye yatırıp icra müdürlüğüne tedbir müzekkeresini yazdır",
      "Davanın borçlu lehine sonuçlanması halinde alacaklı aleyhine en az %20 oranında Kötüniyet Tazminatı talep et"
    ]
  },
  {
    "id": "hukuk_tasinmaz_ongelim_sufa_tmk732",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "önalım şufa hakkı davası",
      "tmk 732 paylı mülkiyet",
      "noter bildiriminden itibaren 3 ay",
      "fiili taksim savunması"
    ],
    "baslik": "TMK 732 Yasal Önalım (Şüfa) Hakkı & Pay Satışı İptali",
    "ikon": "🏛️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Noter Tebliğinden İtibaren 3 Ay / Her Halde 2 Yıl",
    "akilliFisilti": "⚖️ Paydaş payını üçüncü kişiye satarsa diğer paydaşlar noter bildiriminden itibaren 3 ay, her halde 2 yıl içinde şüfa davası açabilir.",
    "oncedenYapilacaklar": [
      "Tapu Müdürlüğünden taşınmazın hisse satış yevmiye tarihini, resmi senetteki satış bedelini ve harçlarını tespit et",
      "Taşınmazın fiilen paydaşlar arasında parsellenip kullanılmadığını (Fiili Taksim savunmasını çürütmek için) yerinde fotoğrafla",
      "Asliye Hukuk Mahkemesinde dava açarak tapuda gösterilen resmi satış bedeli ve tapu masraflarını mahkeme veznesine depo et",
      "Taşınmazın üçüncü kişilere devrinin önlenmesi için tapu kaydına derhal \"İhtiyati Tedbir / Davalıdır Şerhi\" koydur"
    ]
  },
  {
    "id": "hukuk_kamu_denetciligi_ombudsmanlik_kdk",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "kamu denetçiliği kurumu kdk",
      "ombudsmanlık başvurusu 6 ay",
      "idari başvuru yollarının tüketilmesi",
      "kdk tavsiye kararı"
    ],
    "baslik": "6328 Sayılı Kanun Kamu Denetçiliği Kurumu (KDK) Başvurusu",
    "ikon": "🏛️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İdarenin Cevabından İtibaren 6 Ay",
    "akilliFisilti": "⚖️ İdarenin işlemine karşı KDK’ya başvuru yapıldığında İdare Mahkemesindeki 60 günlük dava açma süresi durur.",
    "oncedenYapilacaklar": [
      "İdareye yapılan resmi müracaata verilen ret cevabını veya 30 günlük zımni ret süresini dosyala",
      "KDK online başvuru sistemi üzerinden hakkaniyete aykırılık ve insan hakları ihlali gerekçelerini belirterek başvuru yap",
      "Başvuru sürecinde idari yargı dava açma süresinin durduğunu teyit et",
      "KDK tarafından verilen Tavsiye Kararını ilgili kamu idaresine tebliğ ettirerek 30 gün içinde işlem tesis edilmesini talep et"
    ]
  },
  {
    "id": "hukuk_adli_kontrol_imza_ihlali_cmk109",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "adli kontrol imza yükümlülüğü ihlali",
      "cmk 109 imza saatleri",
      "adli kontrol mazeret dilekçesi",
      "tutuklamaya sevk cmk 112"
    ],
    "baslik": "CMK 109 Adli Kontrol İmza Yükümlülüğü & İhlal Mazereti",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Belirtilen Gün Saat 08:00-20:00 / Mazeret Anı",
    "akilliFisilti": "⚖️ Adli kontrol imza yükümlülüğünü mazeretsiz ihlal eden şüpheli hakkında CMK 112 uyarınca tutuklama kararı verilebilir.",
    "oncedenYapilacaklar": [
      "Kolluk birimindeki Denetimli Serbestlik imza çizelgesinin haftalık gün ve saat aralığını şüpheliye yazılı tebliğ et",
      "Hastalık, kaza veya mücbir sebeple imza atılamamışsa resmi devlet hastanesi heyet/sağlık raporunu derhal temin et",
      "24 saat içinde Nöbetçi Sulh Ceza Hakimliği veya Denetimli Serbestlik Müdürlüğüne fotoğraflı \"Mazeret Bildirim Dilekçesi\" sun",
      "Kolluk kamera kayıtlarının ve polis merkezi imza föyünün sisteme düzenli işlendiğini UYAP üzerinden teyit et"
    ]
  },
  {
    "id": "maliye_finansman_gider_kisitlamasi_gvk41_9",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "finansman gider kısıtlaması",
      "gvk 41/9 kkeg",
      "özkaynak yabancı kaynak oranı",
      "kredi faiz gider kısıtlaması %10"
    ],
    "baslik": "GVK 41/9 Finansman Gider Kısıtlaması (%10 KKEG) Hesabı",
    "ikon": "📉",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Geçici Vergi / Yıllık Kurumlar",
    "akilliFisilti": "📊 Şirketin yabancı kaynakları özkaynaklarını aşıyorsa, aşan kısma ait finansman giderlerinin %10’u KKEG kaydedilir.",
    "oncedenYapilacaklar": [
      "Bilanço dönem sonu Kısa ve Uzun Vadeli Yabancı Kaynaklar toplamını Özkaynaklar toplamı ile karşılaştır",
      "Yabancı kaynaklar > Özkaynak ise aradaki aşan tutarın toplam yabancı kaynaklara oranını (Aşım Oranı) hesapla",
      "780 Finansman Giderleri hesabındaki faiz, komisyon ve kur farkı giderlerinden yatırımların maliyetine eklenenleri düş",
      "Hesaplanan giderin aşan kısma isabet eden tutarının %10’unu Kanunen Kabul Edilmeyen Gider (KKEG) olarak beyannameye ekle"
    ]
  },
  {
    "id": "maliye_binek_oto_gider_kisitlamasi_kdv_amortisman",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "binek oto gider kısıtlaması %70",
      "kiralık araç aylık gider sınırı",
      "binek oto kdv kkeg",
      "oto amortisman tavan tutarı"
    ],
    "baslik": "Binek Otomobil Gider Kısıtlaması (%70/30) & Amortisman Tavanı",
    "ikon": "🚗",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Aylık Fatura Girişi & Amortisman",
    "akilliFisilti": "📊 Binek otomobillerin akaryakıt, bakım, sigorta ve otopark giderlerinin en fazla %70’i gider yazılabilir, %30’u KKEG’dir.",
    "oncedenYapilacaklar": [
      "Kiralık binek araç faturalarında Hazine ve Maliye Bakanlığınca belirlenen aylık kira tavan sınırını aşan kısmı KKEG yap",
      "Akaryakıt, yıkama, lastik ve kasko faturalarının %70’ini 760/770 ilgili gider hesabına, %30’unu KKEG hesabına kaydet",
      "Faturadaki KDV tutarının da %70’ini 191 İndirilecek KDV’ye, %30’unu KKEG KDV’ye ayrıştır",
      "Satın alınan binek otomobillerde amortismana tabi azami iktisap bedeli tavanını aşan kısım için amortisman ayırma"
    ]
  },
  {
    "id": "maliye_serbest_meslek_makbuzu_smm_tevkifat",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "serbest meslek makbuzu stopaj %20",
      "smm kdv tevkifatı 5/10",
      "e-smm düzenleme süresi",
      "avukat doktor smm brüt net"
    ],
    "baslik": "e-SMM Düzenleme, %20 Gelir Vergisi Stopajı & KDV Tevkifatı",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Hizmet Bedeli Tahsilat Anı",
    "akilliFisilti": "📊 Serbest meslek kazancında tahsilat esastır; brüt tutar üzerinden %20 GV Stopajı ve kamu/şirketlerde KDV tevkifatı kesilir.",
    "oncedenYapilacaklar": [
      "Anlaşılan net tutardan brüt ücreti (Brüt = Net / 0.80 veya KDV dahil formülle) hassas hesapla",
      "GİB e-Arşiv / e-SMM portalı üzerinden %20 Gelir Vergisi Stopajı (099 kodu) ve varsa 5/10 KDV tevkifatını seç",
      "Hizmet alan vergi mükellefinin bu stopajı Muhtasar ve Prim Hizmet Beyannamesinde bildireceğini teyit et",
      "Tahsilatı banka kanalıyla yaparak açıklama kısmına e-SMM evrak numarası ve tarihini işlet"
    ]
  },
  {
    "id": "maliye_supheli_alacak_karsiligi_vuk323",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "şüpheli ticari alacaklar karşılığı",
      "vuk 323 dava icra safhası",
      "128 şüpheli ticari alacaklar",
      "karşılık gideri 654"
    ],
    "baslik": "VUK 323 Şüpheli Alacak Karşılığı Ayrılması & Dava Şartı",
    "ikon": "⚖️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Dava/İcra Açıldığı Dönem Sonu",
    "akilliFisilti": "📊 Karşılık ayrılabilmesi için alacağın teminatsız olması ve dava veya icra safhasına intikal etmiş olması zorunludur.",
    "oncedenYapilacaklar": [
      "Vadesinde ödenmeyen ticari alacağın daha önce 600 Gelir hesaplarına intikal ettiğini fatura kayıtlarından doğrula",
      "İcra Müdürlüğü takip talebi açılış tutanağını veya Mahkeme dava tensip zaptını dosya numarasıyla temin et",
      "Alacak tutarını 120 Alıcılar hesabından 128 Şüpheli Ticari Alacaklar hesabına virmanla",
      "Aynı dönemde 654 Karşılık Giderleri borç, 129 Şüpheli Alacaklar Karşılığı alacak kaydı açarak giderleştir"
    ]
  },
  {
    "id": "maliye_yurt_disi_hizmet_ihracati_kdv301",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "yurt dışı yazılım hizmet ihracatı",
      "kdv istisnası 301 kodu",
      "yurt dışı faydalanma kriteri",
      "yazılım kazanç istisnası %80"
    ],
    "baslik": "Yazılım & Mühendislik Hizmet İhracatı (KDV İstisnası & %80 İndirim)",
    "ikon": "💻",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Dönem Beyannamesi & Fatura Tanzimi",
    "akilliFisilti": "📊 Hizmetten yurt dışında faydalanılması şartıyla düzenlenen faturalar KDV’den istisnadır ve kazancın %80’i vergiden indirilir.",
    "oncedenYapilacaklar": [
      "Faturanın yurt dışındaki yabancı mukim şirket adına KDV’siz (301 - Hizmet İhracatı Kodu) olarak tanzim edildiğini teyit et",
      "Hizmet bedelinin Türkiye’deki banka hesabına döviz transferi (DAB / Swift) ile geldiğini tevsik et",
      "GVK m. 89/13 ve KVK m. 10/1-ğ kapsamında mimarlık, mühendislik, yazılım ve veri analizi kazançlarının %80’lik indirim tutarını hesapla",
      "Yüklenilen KDV listesini hazırlayarak vergi dairesinden nakden/mahsuben KDV İadesi talep dosyasını aç"
    ]
  },
  {
    "id": "hukuk_arabuluculuk_ilam_serhi_ve_icra",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "arabuluculuk anlaşma belgesi",
      "ilam niteliğinde belge",
      "icra edilebilirlik şerhi",
      "hukuk uyuşmazlıklarında arabuluculuk",
      "arabuluculuk tutanağı icra"
    ],
    "baslik": "6325 Sayılı HUAK Arabuluculuk İcra Edilebilirlik Şerhi & İlamlı Takip",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Sulh Hukuk / İcra Aşaması",
    "akilliFisilti": "⚖️ 6325 sayılı Kanun m.18 uyarınca arabulucu, taraflar ve avukatların birlikte imzaladığı belge doğrudan ilam niteliğindedir; mahkeme şerhi aranmaz.",
    "oncedenYapilacaklar": [
      "Taraflar ve vekillerince ıslak/e-imzalanan arabuluculuk anlaşma belgesini kontrol et",
      "Vekil imzası eksikse ilam niteliği için Sulh Hukuk Mahkemesinden icra edilebilirlik şerhi talep et",
      "Taraflar ve avukatlarının ortak imzası tam ise doğrudan İcra Müdürlüğünde ilamlı icra takibi (Örnek 4-5) aç",
      "Maktu harç muafiyeti ve damga vergisi makbuzunu UYAP icra dosyasına ekle"
    ]
  },
  {
    "id": "hukuk_muris_muvazaasi_tapu_iptal_tescil",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "muris muvazaası davası",
      "mirastan mal kaçırma",
      "tapu iptal ve tescil davası",
      "ölünceye kadar bakma muvazaa",
      "muris taşınmaz temliki"
    ],
    "baslik": "1.4.1974 İBK Kapsamında Muris Muvazaası Tapu İptal ve Tescil",
    "ikon": "📜",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Dava Açılış / Tedbir",
    "akilliFisilti": "📜 Muris muvazaasında saklı paylı olsun olmasın tüm mirasçılar zamanaşımına tabi olmaksızın tapu iptal davası açabilir.",
    "oncedenYapilacaklar": [
      "1.4.1974 tarih ve 1/2 sayılı İBK doğrultusunda gizli bağış ve muvazaa delillerini topla",
      "Taşınmaz kaydına HMK 389 uyarınca 3. kişilere devri önleyici ihtiyati tedbir koydur",
      "Murisin banka hesap hareketleri, tereke durumu ve semeni ödeme gücü araştırması talep et",
      "Tanık listesi, tapu resmi akit tablosu ve emsal rayiç bedel tespiti için keşif hazırla"
    ]
  },
  {
    "id": "hukuk_ecrimisil_intifadan_men_ihtarname",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ecrimisil davası",
      "haksız işgal tazminatı",
      "intifadan men koşulu",
      "ecrimisil ihtarnamesi",
      "fuzuli şagil ecrimisil"
    ],
    "baslik": "Ecrimisil (Haksız İşgal Tazminatı) & İntifadan Men İhtarnamesi",
    "ikon": "🏛️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İhtarname / 5 Yıl Geriye",
    "akilliFisilti": "🏛️ Paydaşlar arasında intifadan men koşulu noter ihtarnamesiyle tebliğ edilmeden ecrimisil istenemez; azami geriye dönük süre 5 yıldır.",
    "oncedenYapilacaklar": [
      "Diğer paydaşa intifadan men koşulunu sağlayan noter ihtarnamesini tebliğ ettir",
      "Geriye dönük azami 5 yıllık zamanaşımı dönemi için kira rayiç ecrimisil hesabı çıkar",
      "Taşınmazın fiili kullanım durumunu fotoğrafla ve emsal kira sözleşmelerini derle",
      "Asliye Hukuk Mahkemesinde ecrimisil ve kademeli yasal faiz istemli dava dilekçesini ver"
    ]
  },
  {
    "id": "hukuk_kamulastirmasiz_el_atma_bedel_tespiti",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "kamulaştırmasız el atma",
      "fiili el atma davası",
      "hukuki el atma imar planı",
      "kamulaştırma bedel artırımı",
      "imar kısıtlılığı tazminat"
    ],
    "baslik": "2942 Sayılı Kamulaştırma Kanunu & Kamulaştırmasız El Atma Davası",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Bilirkişi Keşif Aşaması",
    "akilliFisilti": "⚖️ Fiili el atmada adli yargı (Asliye Hukuk), 5 yılı aşan imar kısıtlılıklarında (hukuki el atma) idari yargı görevlidir.",
    "oncedenYapilacaklar": [
      "İdarenin fiili veya hukuki el atma durumunu kadastro ve imar çapı ile tespit et",
      "Kamulaştırma Kanunu Geçici 6. madde kapsamında idareye uzlaşma başvurusunda bulun",
      "Uzlaşmazlık tutanağı sonrası Asliye Hukuk Mahkemesinde bedel tespiti ve tescil davası aç",
      "Arsa payı emsal satış mukayesesi ve zemin tazminat kalemlerini bilirkişi keşfinde sun"
    ]
  },
  {
    "id": "hukuk_kiymetli_evrak_zayi_odeme_yasagi_ilan",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "çek iptali ve zayi davası",
      "kıymetli evrak zayi",
      "ödemeden men yasağı",
      "kayıp çek ilanı",
      "ticaret mahkemesi çek zayi"
    ],
    "baslik": "TTK 757-764 Kıymetli Evrak Zayi & Çek Ödemeden Men Yasağı",
    "ikon": "🧾",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İhtiyati Tedbir / TTSG İlan",
    "akilliFisilti": "🧾 Kayıp çekte muhatap bankaya ödeme yasağı aldırmak için Asliye Ticaret Mahkemesinden %15 teminatla ihtiyati tedbir kararı çıkarılır.",
    "oncedenYapilacaklar": [
      "Asliye Ticaret Mahkemesinde ödemeden men kararı ve çek iptal davası aç",
      "Mahkemece belirlenen nakit veya teminat mektubunu vezneye depo et",
      "Alınan ihtiyati tedbir kararını derhal muhatap bankanın genel müdürlüğüne tebliğ et",
      "Türkiye Ticaret Sicili Gazetesinde (TTSG) 3 kez zayi ve ibraz ilanı sürecini takip et"
    ]
  },
  {
    "id": "maliye_kdv_iadesi_yuklenilen_kdv_ve_geksis",
    "category": "finans",
    "domain": "FINANS",
    "keywords": [
      "kdv iadesi yüklenilen kdv listesi",
      "geksis kontrol raporu",
      "indirimli oran kdv iadesi",
      "ihracat istisnası kdv iade",
      "tam tasdik kdv raporu"
    ],
    "baslik": "KDV Genel Uygulama Tebliği Kapsamında Yüklenilen KDV & GEKSİS Kontrolü",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Ayın 20-25 Arası / Beyan Öncesi",
    "akilliFisilti": "📊 GEKSİS analizinde olumsuz segmentteki alt mükellef faturaları iade sürecini bloke edebilir; tenzil veya izahat hazırlanmalıdır.",
    "oncedenYapilacaklar": [
      "İhracat istisnası veya indirimli oran kapsamında Yüklenilen KDV Listesini excel formatında hazırla",
      "İndirilecek KDV Listesi ve Satış Faturaları Listesini İnternet Vergi Dairesine yükle",
      "GEKSİS (Gelir ve Kurumlar Vergisi Standart İade Sistemi) kontrol raporu çıktısını al ve tutarsızlıkları ayıkla",
      "Varsa YMM KDV İadesi Tasdik Raporunu veya teminat mektubunu vergi dairesine teslim et"
    ]
  },
  {
    "id": "maliye_transfer_fiyatlandirmasi_raporu_5520",
    "category": "finans",
    "domain": "FINANS",
    "keywords": [
      "transfer fiyatlandırması raporu",
      "ilişkili kişi emsallere uygunluk",
      "örten kazanç dağıtımı",
      "master file yerel dosya tf",
      "kurumlar vergisi ek transfer"
    ],
    "baslik": "5520 Sayılı KVK m.13 Transfer Fiyatlandırması & Emsallere Uygunluk Raporu",
    "ikon": "📑",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Kurumlar Vergisi Beyan Dönemi",
    "akilliFisilti": "📑 İlişkili kişilerle yapılan mal/hizmet alım satımlarında emsallere uygunluk ilkesi ve seçilen transfer fiyatlandırması yöntemi belgelenmelidir.",
    "oncedenYapilacaklar": [
      "Grup içi ilişkili şirket işlemlerini (Hizmet, borçlanma, royalty, lisans) dökümle",
      "Emsal fiyat aralığı tespiti için karşılaştırılabilirlik ve veri tabanı analizini yap",
      "Seçilen yöntemi (Karşılaştırılabilir Fiyat, Maliyet Artı, Kar Bölüşüm) Yerel Dosyada gerekçelendir",
      "Kurumlar Vergisi Beyannamesi ekindeki Transfer Fiyatlandırması Formunu doldur"
    ]
  },
  {
    "id": "maliye_enflasyon_duzeltmesi_vuk_mukerrer_298",
    "category": "finans",
    "domain": "FINANS",
    "keywords": [
      "enflasyon düzeltmesi vuk mükerrer 298",
      "parasal olmayan kıymetler taşıma katsayısı",
      "enflasyon fark hesapları 698",
      "düzeltilmiş bilanço özkaynak"
    ],
    "baslik": "VUK Mükerrer 298/A Enflasyon Düzeltmesi & Parasal Olmayan Kıymetler",
    "ikon": "🧮",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Geçici / Yıllık Bilanço Dönemi",
    "akilliFisilti": "🧮 Parasal olmayan aktif ve pasif kalemler Yİ-ÜFE düzeltme katsayısı ile taşınır; oluşan farklar 698 Enflasyon Düzeltme Hesabına aktarılır.",
    "oncedenYapilacaklar": [
      "Bilançodaki Parasal ve Parasal Olmayan kıymetleri (Stoklar, MDÖ, Sermaye, Geçmiş Yıl Karları) ayrıştır",
      "İlgili iktisap tarihlerine göre TÜİK Yİ-ÜFE endeksleri ile Taşıma/Düzeltme Katsayılarını hesapla",
      "Stoklarda Basit Ortalama veya Hareketli Ağırlıklı Ortalama yöntemini seçerek düzeltme yap",
      "698 Enflasyon Düzeltme Hesabı bakiyesini 590/591 Geçmiş Yıllar Kar/Zarar hesabına devret"
    ]
  },
  {
    "id": "maliye_kistas_donem_defter_tasdiki_kapanis_ve_acilis",
    "category": "finans",
    "domain": "FINANS",
    "keywords": [
      "defter tasdik zamanı aralık",
      "yevmiye defteri kapanış tasdiki haziran",
      "e-defter berat yükleme süreleri",
      "fiziki defter noter onay"
    ],
    "baslik": "TTK 64 & VUK 221 Yasal Defter Tasdiki & e-Defter Berat Yükleme Takvimi",
    "ikon": "📖",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Aralık Açılış / Haziran Kapanış",
    "akilliFisilti": "📖 Fiziki Yevmiye Defteri kapanış tasdiki izleyen yılın 6. ayı sonuna kadar notere yaptırılmalıdır; e-Defterde ise aylık berat yükleme süreleri esastır.",
    "oncedenYapilacaklar": [
      "Aralık ayı içinde gelecek yıla ait fiziki defterlerin açılış tasdikini notere yaptır",
      "Haziran ayı sonuna kadar bir önceki yılın fiziki Yevmiye defterinin noter kapanış tasdikini tamamla",
      "e-Defter kullanıcıları için ilgili aya ait Yevmiye ve Kebir beratlarını GİB sistemine yükle",
      "e-Defter İkincil Kopyalarını GİB Bilgi İşlem Sistemine süresinde aktar"
    ]
  },
  {
    "id": "maliye_supheli_alacak_karsiligi_vuk_323",
    "category": "finans",
    "domain": "FINANS",
    "keywords": [
      "şüpheli ticari alacak karşılığı vuk 323",
      "icra safhasındaki alacak",
      "dava aşamasında şüpheli alacak",
      "128 şüpheli alacak 129 karşılık",
      "protestolu senet karşılık"
    ],
    "baslik": "VUK 323 Şüpheli Ticari Alacak Karşılığı & İcra Takip Kaydı",
    "ikon": "📉",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Dönem Sonu Envanter / İcra Takibi",
    "akilliFisilti": "📉 Karşılık ayrılabilmesi için alacağın ticari kazancın elde edilmesiyle ilgili olması ve dava veya icra safhasında bulunması şarttır.",
    "oncedenYapilacaklar": [
      "Vadesi geçmiş ve tahsil edilemeyen alacak için icra takibi veya noter protestosu açıldığını teyit et",
      "Alacağı 120 Alıcılar hesabından 128 Şüpheli Ticari Alacaklar hesabına virmanla",
      "Dönem sonunda 654 Karşılık Giderleri borç, 129 Şüpheli Ticari Alacaklar Karşılığı alacak kaydı yap",
      "Teminatlı alacak kısmı varsa teminat tutarını karşılık matrahından düş"
    ]
  },
  {
    "id": "hukuk_hmk_341_istinaf_sure_ve_harc_muhtirasi",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "hmk 341 istinaf kanun yolu başvuru dilekçesi",
      "istinaf harç muhtırası 1 haftalık kesin süre",
      "bölge adliye mahkemesi bam başvuru harcı",
      "karar tebliği istinaf süresi hesabı hmk",
      "istinaf başvurusundan feragat beyanı"
    ],
    "baslik": "HMK m.341-345 İstinaf Kanun Yolu Başvurusu & İstinaf Harç Muhtırası Süresi",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Gerekçeli Karar Tebliğinden İtibaren 2 Hafta",
    "akilliFisilti": "⚖️ HMK m.345 gereği istinaf süresi gerekçeli kararın tebliğinden itibaren 2 haftadır; harç ikmal muhtırası ise 1 haftalık kesin süre içerir.",
    "oncedenYapilacaklar": [
      "Gerekçeli kararın UETS tebliğ tarihini ve 2 haftalık yasal istinaf süresinin son gününü hesapla",
      "İstinaf başvuru dilekçesinde somut vakıa, delil değerlendirme hataları ve kamu düzeni aykırılıklarını maddeleştir",
      "İstinaf harç ve gider avansının vezneye yatırıldığını teyit edip UYAP üzerinden makbuzu dosyaya ekle",
      "Karşı tarafın istinaf dilekçesine karşı 2 haftalık istinafa cevap ve katılma yoluyla istinaf hakkını denetle"
    ]
  },
  {
    "id": "hukuk_cmk_100_tutukluluga_itiraz_ve_adli_kontrol",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "cmk 100 tutukluluğa itiraz dilekçesi sulh ceza",
      "adli kontrol kararına itiraz yurt dışı çıkış yasağı",
      "tutuklama kararı orantılılık ve delil karartma şüphesi",
      "cmk 101 tutukluluk incelemesi ve tahliye talebi",
      "asliye ceza mahkemesi tutukluluk itiraz mercii"
    ],
    "baslik": "CMK m.100-101 Tutukluluğa İtiraz, Ölçülülük & CMK m.109 Adli Kontrol Talebi",
    "ikon": "🏛️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Karar Tebliği / Tevfimden İtibaren 7 Gün",
    "akilliFisilti": "🏛️ CMK m.268/1 uyarınca tutuklama veya adli kontrol kararlarına karşı kararın öğrenilmesinden itibaren 7 gün içinde itiraz edilmelidir.",
    "oncedenYapilacaklar": [
      "Sulh Ceza Hâkimliğinin tutuklama gerekçesindeki katalog suç, kaçma şüphesi ve somut delil yokluğunu analiz et",
      "Şüphelinin sabit ikametgahı, sabıkasızlık kaydı ve delillerin toplanmış olduğunu belgeleyerek tahliye dilekçesi hazırla",
      "Tutuklamanın ölçüsüz olduğunu belirterek CMK 109 uyarınca adli kontrol (imza yükümlülüğü/elektronik kelepçe) talep et",
      "Bir üst merci olan Asliye Ceza Mahkemesine iletilmek üzere UYAP Avukat Portalı üzerinden itirazı gönder"
    ]
  },
  {
    "id": "hukuk_iik_89_haciz_ihbarnamesi_ve_menfi_tespit",
    "category": "finans",
    "domain": "HUKUK",
    "keywords": [
      "iik 89 1 birinci haciz ihbarnamesi itiraz",
      "üçüncü şahıstaki hak ve alacak haczi itiraz süresi",
      "iik 89 2 ikinci haciz ihbarnamesi muhtıra",
      "iik 89 3 menfi tespit davası 15 günlük süre",
      "borçlunun banka mevduatına 89 1 haciz blokesi"
    ],
    "baslik": "İİK m.89 Üçüncü Şahıslara Haciz İhbarnamesi: 7 Günlük İtiraz & Menfi Tespit Süreci",
    "ikon": "📜",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Tebliğden İtibaren 7 Gün (Kesin Süre)",
    "akilliFisilti": "📜 İİK m.89/1 haciz ihbarnamesine tebliğden itibaren 7 gün içinde itiraz edilmezse, borç 3. şahsın zimmetinde sayılır.",
    "oncedenYapilacaklar": [
      "Müvekkil şirkete gelen İİK 89/1 ihbarnamesinde adı geçen borçlu ile cari hesap, mevduat veya alacak ilişkisini denetle",
      "Herhangi bir borç veya mevduat bulunmuyorsa 7 gün içinde icra dairesine itiraz dilekçesini UYAP üzerinden sun",
      "İkinci haciz ihbarnamesi (89/2) geldiyse aynı 7 günlük yasal sürede tekrar itiraz et",
      "89/3 ihbarnamesi tebliğ edildiyse 15 gün içinde Asliye Ticaret/Hukuk Mahkemesinde Menfi Tespit Davası aç"
    ]
  },
  {
    "id": "hukuk_ttk_410_genel_kurul_iptal_davasi_ve_butlan",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ttk 445 anonim şirket genel kurul kararı iptali",
      "ttk 447 genel kurul butlan tespiti davası",
      "genel kurul toplantısında muhalefet şerhi tutanağı",
      "ttk 448 iptal davası 3 aylık hak düşürücü süre",
      "azınlık hakları ttk 411 genel kurula çağrı"
    ],
    "baslik": "TTK m.445-448 Anonim Şirket Genel Kurul Kararlarının İptali & Muhalefet Şerhi",
    "ikon": "💼",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Genel Kurul Tarihinden İtibaren 3 Ay",
    "akilliFisilti": "💼 TTK m.445 gereği genel kurul karar iptali davası açabilmek için toplantıda karara muhalif kalıp tutanağa şerh düşürmek şarttır.",
    "oncedenYapilacaklar": [
      "Genel kurul divan tutanağında müvekkilin karara muhalefet şerhinin usulüne uygun yazıldığını kontrol et",
      "Toplantı çağrısının usulsüzlüğü, bilgi alma hakkının ihlali veya dürüstlük kuralına aykırılık gerekçelerini hazırla",
      "Genel kurul tarihinden itibaren 3 aylık hak düşürücü süre içinde Asliye Ticaret Mahkemesinde iptal davası aç",
      "Şirketin telafisi imkansız zarara uğramaması adına genel kurul kararının yürütülmesinin geri bırakılmasını talep et"
    ]
  },
  {
    "id": "hukuk_is_kanunu_20_ise_iade_ve_arabuluculuk_son_tutanak",
    "category": "is_kariyer",
    "domain": "HUKUK",
    "keywords": [
      "iş kanunu 20 işe iade davası arabuluculuk",
      "fesih bildiriminden itibaren 1 ay arabulucu başvurusu",
      "arabuluculuk son tutanak tarihinden 2 hafta dava süresi",
      "iş güvencesi 30 işçi ve 6 ay kıdem şartı",
      "boşta geçen süre ücreti ve işe başlatmama tazminatı"
    ],
    "baslik": "İş Kanunu m.20 İşe İade: 1 Aylık Arabuluculuk & Son Tutanaktan İtibaren 2 Hafta Dava Süresi",
    "ikon": "⚖️",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Fesih Tebliğinden 1 Ay / Son Tutanaktan 2 Hafta",
    "akilliFisilti": "⚖️ Fesih bildiriminin tebliğinden itibaren 1 ay içinde arabulucuya başvurulmalı; anlaşamama halinde son tutanak tarihinden itibaren 2 hafta içinde dava açılmalıdır.",
    "oncedenYapilacaklar": [
      "Fesih bildiriminin yazılı yapılıp yapılmadığını ve geçerli neden gösterilip gösterilmediğini denetle",
      "İşyerinde en az 30 işçi çalışıp çalışmadığını ve işçinin en az 6 aylık kıdemi olup olmadığını kontrol et",
      "Arabuluculuk sürecinde anlaşamama halinde son tutanağın imzalandığı günü milat alarak 2 haftalık dava süresini takvime işle",
      "İş Mahkemesinde 4 aya kadar boşta geçen süre ve 4-8 aylık işe başlatmama tazminatı talepli dava dilekçesini hazırla"
    ]
  },
  {
    "id": "maliye_vuk_359_sahte_fatura_komisyon_ve_vergi_teknik_raporu",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "vuk 359 sahte fatura ve muhteviyatı itibariyle yanıltıcı belge smyb",
      "vergi tekniği raporu vtr itiraz komisyonu",
      "vergi inceleme raporu vir dinlenme talebi",
      "tarhiyat öncesi uzlaşma talebi vuk ek 1",
      "vuk 370 izaha davet yazısı 30 günlük süre"
    ],
    "baslik": "VUK m.359 SMYB (Sahte Belge) İncelemesi: Vergi Tekniği Raporu & Rapor Değerlendirme Komisyonu",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Rapor Tebliğinden İtibaren 30 Gün",
    "akilliFisilti": "📊 Vergi İnceleme Raporuna karşı mükellefin Rapor Değerlendirme Komisyonunda dinlenme hakkı ve Tarhiyat Öncesi Uzlaşma talebi süresi 30 gündür.",
    "oncedenYapilacaklar": [
      "Vergi Tekniği Raporundaki (VTR) alt mükellef kodlarını ve karşıt inceleme tutanaklarını tek tek incele",
      "Mal ve hizmet alımlarına ait sevk irsaliyesi, banka havale/EFT dekontu ve kantar fişlerini dosyalayarak ticari fiiliyatı kanıtla",
      "Tarhiyat öncesi veya sonrası uzlaşma başvuru dilekçesini hazırla ya da Vergi Mahkemesinde dava açma süresini başlat",
      "VUK 359 cezalarında uzlaşma kapsamı dışında kalan hususlar için ceza hukuku savunma stratejisi oluştur"
    ]
  },
  {
    "id": "maliye_kdv_genel_uygulama_tebligi_ihrac_kayitli_ve_iade",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "kdv genel uygulama tebliği tecil terkin 11 1 c",
      "ihraç kayıtlı teslim kdv iade raporu ymm",
      "gümrük beyannamesi vedop intaç tarihi 3 ay",
      "kdv alt firma segment analizi risk raporu",
      "mahsuben kdv iadesi ve nakden iade teminat mektubu"
    ],
    "baslik": "KDVK m.11/1-c İhraç Kayıtlı Teslim: 3 Aylık İntaç Süresi, Tecil-Terkin & YMM İade Raporu",
    "ikon": "📑",
    "renk": "#FEF3C7",
    "varsayilanZaman": "İhraç Kayıtlı Fatura Tarihinden İtibaren 3 Ay",
    "akilliFisilti": "📑 İhraç kayıtlı teslim edilen malların fatura tarihini takip eden ay başından itibaren 3 ay içinde fiilen ihraç edilmesi ve VEDOP intaç kaydının alınması zorunludur.",
    "oncedenYapilacaklar": [
      "İmalatçı kapasite raporunun ve sanayi sicil belgesinin güncelliğini kontrol et",
      "GÇB (Gümrük Çıkış Beyannamesi) VEDOP kapanış intaç tarihini ihracatçı firmadan temin et",
      "İhracatın 3 ay içinde gerçekleşmemesi durumunda mücbir sebep ek süre talebini süresinde vergi dairesine bildir",
      "YMM KDV İadesi Tasdik Raporunu veya İndirimli Teminat Mektubunu hazırlayarak tecil edilen KDV terkinini tamamla"
    ]
  },
  {
    "id": "maliye_transfer_fiyatlandirmasi_ve_ortulu_sermaye",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "kvk 13 transfer fiyatlandırması raporu ilişkili kişi",
      "kvk 12 örtülü sermaye öz sermayenin 3 katı",
      "emsallere uygunluk ilkesi karşılaştırılabilir fiyat",
      "yıllık transfer fiyatlandırması formu kurumlar vergisi",
      "örtülü kazanç dağıtımı kdv ve stopaj düzeltmesi"
    ],
    "baslik": "KVK m.12-13 Transfer Fiyatlandırması Raporu & Örtülü Sermaye (3 Kat Öz Sermaye) Hesabı",
    "ikon": "📈",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Kurumlar Vergisi Beyanname Dönemi (25-30 Nisan)",
    "akilliFisilti": "📈 İlişkili kişilerden yapılan borçlanmaların dönem başı öz sermayenin 3 katını aşan kısmı örtülü sermaye sayılır ve faiz gideri kanunen kabul edilmez.",
    "oncedenYapilacaklar": [
      "Grup içi ilişkili şirketler arasındaki mal, hizmet, kredi ve gayri maddi hak sözleşmelerini topla",
      "Dönem başı öz sermayeyi hesaplayarak ilişkili şirket ortak cari hesap borçlanmalarının 3 kat sınırını test et",
      "Transfer fiyatlandırması emsal fiyat araştırması ve kar bölüşüm yöntemini yıllık raporda belgelendir",
      "Kurumlar Vergisi Beyannamesi ekindeki \"Transfer Fiyatlandırması, Kontrol Edilen Yabancı Kurum ve Örtülü Sermaye Formunu\" doldur"
    ]
  },
  {
    "id": "maliye_edefter_berat_ve_gib_ikincil_kopya_yedekleme",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "e-defter berat yükleme süresi son gün gib",
      "gib ikincil kopya saklama e-defter yedekleme",
      "yevmiye ve kebir defteri xml imzalama mali mühür",
      "zaman damgası e-defter berat onay süresi",
      "e-defter berat açılış kapanış beratı teyidi"
    ],
    "baslik": "GİB e-Defter Berat Yükleme & e-Defter İkincil Kopya Saklama Programı Senkronizasyonu",
    "ikon": "💾",
    "renk": "#E0F2FE",
    "varsayilanZaman": "İlgili Ayı Takip Eden 3. Ayın Son Günü",
    "akilliFisilti": "💾 e-Defter beratlarının GİB sistemine yüklenmesinin ardından, defter ve berat dosyalarının GİB İkincil Kopya Saklama Programına yedeklenmesi yasal zorunluluktur.",
    "oncedenYapilacaklar": [
      "Yevmiye ve Defter-i Kebir kayıtlarının KDV ve MUHSGK beyannameleriyle birebir tutarlılığını kontrol et",
      "Mali mühür / e-İmza ile e-Defter XML dosyalarını oluşturup şema ve şematron testlerini tamamla",
      "GİB e-Defter portalına berat dosyalarını yükleyip GİB onaylı beratları indir",
      "GİB İkincil Kopya Saklama Sistemini çalıştırarak bulut yedekleme durumunun \"Başarılı\" olduğunu teyit et"
    ]
  },
  {
    "id": "maliye_amortisman_enflasyon_duzeltmesi_vuk_mükerrer_298",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "vuk mükerrer 298 a enflasyon düzeltmesi bilanço",
      "düzeltme katsayısı ve yi-üfe endeksleme yöntemi",
      "parasal olmayan kıymetler sermaye ve stok düzeltmesi",
      "geçmiş yıl karları ve 698 enflasyon düzeltme hesabı",
      "enflasyon düzeltmesi kar zarar ve vergi matrahı etkisi"
    ],
    "baslik": "VUK Mükerrer m.298/A Enflasyon Düzeltmesi: Parasal Olmayan Kıymetler & 698 Enflasyon Hesabı",
    "ikon": "⚖️",
    "renk": "#FEF08A",
    "varsayilanZaman": "Dönem Sonu Bilanço Kapanışı",
    "akilliFisilti": "⚖️ Son 3 yılda Yİ-ÜFE %100 ve cari yılda %10 aşması halinde parasal olmayan kıymetlerin (Duran varlıklar, stoklar, sermaye) enflasyon düzeltmesine tabi tutulması zorunludur.",
    "oncedenYapilacaklar": [
      "Bilançodaki aktif ve pasif kalemleri \"Parasal\" ve \"Parasal Olmayan\" olarak ayrıştır",
      "Maddi duran varlıklar ve birikmiş amortismanların giriş tarihlerine göre Yİ-ÜFE düzeltme katsayılarını hesapla",
      "Ödenmiş sermaye, yasal yedekler ve stoklar için ROFM (Reel Olmayan Finansman Maliyeti) ayrıştırmasını yap",
      "Tüm fark kayıtlarını 698 Enflasyon Düzeltme Hesabına aktarıp net bakiyeyi Geçmiş Yıllar Karları/Zararlarına devret"
    ]
  },
  {
    "id": "hukuk_aym_bireysel_basvuru_ve_hak_ihlali_sureci",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "anayasa mahkemesi bireysel başvuru formu",
      "aym 30 günlük kesin hak düşürücü süre",
      "adil yargılanma hakkı makul sürede yargılanma ihlali",
      "iç hukuk yollarının tüketilmesi nihai karar tebliği",
      "tedbir talepli aym bireysel başvuru harç makbuzu"
    ],
    "baslik": "AYM Bireysel Başvuru: 30 Günlük Hak Düşürücü Süre, İç Hukuk Yolları & Tedbir Talebi",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Nihai Karar Tebliğinden İtibaren 30 Gün",
    "akilliFisilti": "⚖️ Anayasa Mahkemesi bireysel başvurusu, olağan kanun yollarının tüketilmesine ilişkin nihai kararın tebliğinden itibaren 30 GÜNLÜK KESİN süreye tabidir; form kılavuza harfiyen uygun tanzim edilmelidir.",
    "oncedenYapilacaklar": [
      "Yargıtay/Danıştay nihai onama ilamının tebliğ mazbatası veya UYAP tebellüğ tarihini kesinleştirerek 30 günlük süreyi hesapla",
      "AYM Bireysel Başvuru Formunu resmi yönergeye uygun olarak yapılandır, ihlal edilen temel anayasal hak maddelerini somutlaştır",
      "Başvuru harcını yatırarak vezne makbuzunu ve yerel mahkeme/istinaf/temyiz safahatı karar örneklerini başvuru ekine bağla",
      "Kişi hürriyeti veya telafisi imkansız zarar riski varsa başvuru dilekçesinde açıkça \"Geçici Tedbir\" talep et"
    ]
  },
  {
    "id": "hukuk_icra_iflas_konkordato_muhleti_ve_komiser_denetimi",
    "category": "finans",
    "domain": "HUKUK",
    "keywords": [
      "konkordato geçici mühlet kararı ticaret mahkemesi",
      "konkordato komiseri ara denetim raporu iik 287",
      "kesin mühlet talebi ve alacaklılar kurulu toplantısı",
      "konkordato ön projesi ve borç tasfiye planı",
      "iik 294 takiplerin durması ve ihtiyati haciz yasağı"
    ],
    "baslik": "İİK Konkordato Mühleti: Geçici/Kesin Mühlet, Komiser Raporu & Alacaklılar Kurulu",
    "ikon": "🏛️",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Mahkeme Mühlet Süresi Boyunca",
    "akilliFisilti": "🏛️ Asliye Ticaret Mahkemesince verilen 3 aylık geçici konkordato mühletinde takipler durur; komiser heyeti haftalık/aylık mali denetim raporunu düzenli mahkemeye sunmalıdır.",
    "oncedenYapilacaklar": [
      "İİK 286 uyarınca bağımsız denetim raporu, mali tablolar ve konkordato ön projesini ticaret mahkemesine tevdi et",
      "Geçici mühlet kararının Ticaret Sicil Gazetesi ve Basın İlan Kurumu portalında ilan edildiğini doğrula",
      "Konkordato komiserlerinin işletme nakit akışı ve tasarruf işlemlerine ilişkin onay süreçlerini koordine et",
      "Geçici mühlet dolmadan en az 1 ay önce 2 aylık uzatma veya 1 yıllık Kesin Mühlet talep dilekçesini hazırla"
    ]
  },
  {
    "id": "hukuk_rekabet_kurumu_yerinde_inceleme_ve_savunma_protokolu",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "rekabet kurumu yerinde inceleme 4054 sayılı kanun",
      "rekabet uzmanı adli bilişim e-posta kopya alma",
      "yerinde incelemenin engellenmesi cirosal idari para cezası",
      "avukat müvekkil gizliliği lpp privilege koruması",
      "rekabet soruşturması birinci ve ikinci yazılı savunma"
    ],
    "baslik": "4054 Rekabet Hukuku: Yerinde İnceleme (Dawn Raid), LPP İncelemesi & Yazılı Savunma",
    "ikon": "🛡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Yerinde İnceleme Anı & 30 Günlük Savunma",
    "akilliFisilti": "🛡️ Rekabet Kurumu uzmanlarının yerinde incelemesine engel olunması ciro üzerinden ağır idari para cezası doğurur; bağımsız avukat-müvekkil gizliliği (LPP) kapsamındaki belgeler ayrıştırılmalıdır.",
    "oncedenYapilacaklar": [
      "Kurul uzmanlarının resmi görevlendirme ve inceleme yetki belgelerini inceleyerek şirket hukuk müşavirini derhal çağır",
      "Adli bilişim imaj alma ve e-posta tarama adımlarını tutanağa geçirilmek üzere şirket bilişim ekibiyle eşlik et",
      "Şirket dışı bağımsız avukatla yapılan hukuki danışmanlık yazışmalarında \"Avukat-Müvekkil Gizliliği (LPP)\" itirazını tutanağa işlet",
      "Tebliğ edilen soruşturma bildirimine karşı 30 günlük yasal sürede 1. Yazılı Savunma dilekçesini ve delil eklerini tanzim et"
    ]
  },
  {
    "id": "hukuk_kvkk_kisisel_veri_ihlali_72_saat_ve_verbis_kaydi",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "kvkk 72 saatlik kişisel veri ihlal bildirimi",
      "veri ihlali bildirim formu verbis güncelleme",
      "ilgili kişilere veri ihlali duyurusu kvkk m 12",
      "kvkk idari para cezası ve kurul inceleme savunması",
      "veri sorumlusu irtibat kişisi ve aydınlatma metni"
    ],
    "baslik": "6698 KVKK: 72 Saatlik Veri İhlal Bildirimi, İlgili Kişi Duyurusu & Savunma",
    "ikon": "🔒",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İhlal Tespitinden İtibaren En Geç 72 Saat",
    "akilliFisilti": "🔒 Kişisel veri ihlali tespit edildiğinde gecikmeksizin ve en geç 72 saat içinde Kişisel Verileri Koruma Kurumuna resmi form ile bildirim yapılmalıdır.",
    "oncedenYapilacaklar": [
      "Siber güvenlik veya sızıntı tespit tutanağını alarak ihlalden etkilenen kişi sayısı ve veri kategorilerini (özel nitelikli veri kontrolü) belirle",
      "Kurulun resmi \"Veri İhlali Bildirim Formunu\" doldurarak 72 saat dolmadan KVKK Başkanlığına elektronik ilet",
      "İhlalden etkilenen müşterilere/çalışanlara makul sürede doğrudan veya web sitesi üzerinden resmi bilgilendirme metni yayımla",
      "VERBİS sicilindeki veri envanteri ile teknik/idari tedbirler taahhütlerini gözden geçirerek Kurul savunma dosyasını hazırla"
    ]
  },
  {
    "id": "hukuk_is_hukuku_ise_iade_dava_ve_arabuluculuk_protokolu",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "işe iade davası 1 aylık arabuluculuk başvuru süresi",
      "7036 sayılı kanun zorunlu dava şartı arabuluculuk",
      "arabuluculuk son tutanak tarihi ve 2 haftalık dava süresi",
      "4 aylık boşta geçen süre ücreti ve işe başlatmama tazminatı",
      "geçersiz fesih savunma istem yazısı 4857 m 19"
    ],
    "baslik": "7036 İş Hukuku: İşe İade Zorunlu Arabuluculuk (1 Ay) & 2 Haftalık Dava Açma Süresi",
    "ikon": "💼",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Fesih Tebliğinden İtibaren 1 Ay / Tutanaktan 2 Hafta",
    "akilliFisilti": "💼 Fesih bildiriminin tebliğinden itibaren 1 AY içinde arabulucuya başvurulmalı; arabuluculuk son tutanağının düzenlendiği tarihten itibaren 2 HAFTA içinde iş mahkemesinde dava açılmalıdır.",
    "oncedenYapilacaklar": [
      "İş sözleşmesi feshinin tebliğ tarihini netleştirerek 1 aylık hak düşürücü süre dolmadan adliye arabuluculuk bürosuna başvur",
      "İşverenin 4857 m.19/25 uyarınca yazılı fesih bildirimi ve usulüne uygun savunma alıp almadığını denetle",
      "Anlaşamama tutanağının UYAP'a yüklendiği tarihi esas alarak 2 haftalık kesin sürede iş mahkemesinde İşe İade Dava Dilekçesi ver",
      "Dilekçede 4 aya kadar boşta geçen süre ücreti ve 4-8 aylık iş güvencesi tazminatı taleplerini kalem kalem hesapla"
    ]
  },
  {
    "id": "maliye_vuk_transfer_fiyatlandirmasi_ve_ortuk_kazanc_raporu",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "transfer fiyatlandırması yıllık belgelendirme raporu",
      "ilişkili kişilerle mal ve hizmet alım satımı vuk 552",
      "emsallere uygunluk ilkesi karşılaştırılabilir fiyat",
      "örtülü sermaye ve örtülü kazanç dağıtımı denetimi",
      "büyük mükellefler transfer fiyatlandırması formu kurumlar vergisi"
    ],
    "baslik": "VUK Transfer Fiyatlandırması: İlişkili Kişi İşlemleri, Emsallere Uygunluk & Raporlama",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Kurumlar Vergisi Beyanname Verme Süresi Sonuna Kadar",
    "akilliFisilti": "📊 Kurumlar Vergisi mükelleflerinin ilişkili kişilerle yaptıkları işlemler için Transfer Fiyatlandırması Raporu beyanname verme süresi sonuna kadar hazırlanmalı ve istendiğinde ibraz edilmelidir.",
    "oncedenYapilacaklar": [
      "Şirketin grup içi ve ilişkili şirketlerle olan emtia, hizmet, finansman ve royalti işlem hacimlerini dökümle",
      "İşlemlerde uygulanan emsallere uygunluk yöntemini (Karşılaştırılabilir Fiyat / Maliyet Artı / Net Kar Marjı) analitik gerekçelendir",
      "Özkaynakların 3 katını aşan ilişkili kişi borçlanmalarında \"Örtülü Sermaye\" faiz/kur farkı kanunen kabul edilmeyen gider (KKEG) kontrolü yap",
      "Transfer Fiyatlandırması, Kontrol Edilen Yabancı Kurum ve Örtülü Sermayeye İlişkin Yıllık Formu KV beyannamesi ekinde onayla"
    ]
  },
  {
    "id": "maliye_kdv_iadesi_ymm_tasdik_raporu_ve_alt_firma_karsit_inceleme",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "kdv iadesi ymm tasdik raporu ihracat istisnası",
      "karşıt inceleme tutanağı ve alt mükellef teyidi",
      "indirimli orana tabi işlemler kdv iade talebi",
      "gekaş ve kdv iade kontrol raporu olumsuzluk cevaplama",
      "kdv tevkifatı ve yüklenilen kdv listesi excel"
    ],
    "baslik": "KDV İadesi & YMM Tasdik: Yüklenilen KDV Listesi, Karşıt İnceleme & GEKAS Kontrolü",
    "ikon": "💰",
    "renk": "#FEF3C7",
    "varsayilanZaman": "KDV İade Dosyası Hazırlama Dönemi",
    "akilliFisilti": "💰 İhracat istisnası veya indirimli orandan kaynaklanan KDV iadesi için Yüklenilen/İndirilecek KDV listeleri sisteme yüklenmeli ve YMM Karşıt İncelemeleri tamamlanmalıdır.",
    "oncedenYapilacaklar": [
      "GÇB (Gümrük Çıkış Beyannamesi) kapanış tarihlerine göre fiili ihraç bedelleri ile yüklenilen KDV tablosunu mutabık kıl",
      "İnternet Vergi Dairesi üzerinden İndirilecek KDV, Yüklenilen KDV ve Satış Faturaları listelerini e-beyan sistemine yükle",
      "GEKAS (Gelir İdaresi Kontrol Sistemi) tarafından üretilen KDV İadesi Kontrol Raporundaki uyumsuzluk kodlarını (Kod 1, 2) yanıtla",
      "Fatura tutarı limit üstü olan alt tedarikçi firmalara YMM Karşıt İnceleme Tutanaklarını göndererek ıslak imzalı onaylarını topla"
    ]
  },
  {
    "id": "maliye_enflasyon_duzeltmesi_mali_tablo_vuk_mukerrer_298",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "vuk mükerrer 298 enflasyon düzeltmesi bilanço",
      "parasal olmayan kıymetler düzeltme katsayısı yi-üfe",
      "geçmiş yıllar karları ve sermaye düzeltmesi olumlu farkı",
      "enflasyon düzeltme karı ve kkeq vergisel etki",
      "sabit kıymetler amortisman ve enflasyon farkı kaydı"
    ],
    "baslik": "VUK Mük. 298: Enflasyon Düzeltmesi, Parasal Olmayan Kalemler & Düzeltme Farkları",
    "ikon": "📈",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Dönem Sonu Bilanço Kapanış & Beyan",
    "akilliFisilti": "📈 Enflasyon düzeltmesinde bilançodaki parasal olmayan kıymetler (Stoklar, Maddi Duran Varlıklar, Özkaynaklar) Yİ-ÜFE katsayılarıyla düzeltilerek 698 Enflasyon Düzeltme Hesabına aktarılır.",
    "oncedenYapilacaklar": [
      "Bilançoyu parasal (kasa, banka, cari alacak/borç) ve parasal olmayan (stok, arsa, bina, tesis, sermaye) olarak tasnif et",
      "Parasal olmayan kıymetlerin deftere giriş tarihlerini baz alarak ilgili ay Yİ-ÜFE oranlarına göre düzeltme katsayılarını hesapla",
      "Maddi duran varlıklar ve birikmiş amortismanların enflasyon farklarını ayrı alt hesaplarda muhasebeleştir",
      "698 Enflasyon Düzeltme Hesabının bakiyesini 570/580 Geçmiş Yıllar Karları/Zararları veya Dönem Karı/Zararına intikal ettir"
    ]
  },
  {
    "id": "maliye_5746_arge_ve_teknokent_vergi_istisnasi_denetimi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "5746 sayılı arge ve tasarım merkezi kanunu",
      "4691 teknoloji geliştirme bölgeleri teknokent istisnası",
      "arge personeli gelir vergisi stopajı ve sgk primi muafiyeti",
      "proje bazlı adam ay efor takibi ve arge indirimi",
      "teknokent kazanç istisnası ve gayrimaddi hak lisans geliri"
    ],
    "baslik": "5746 / 4691 Ar-Ge & Teknokent: Gelir Vergisi Stopaj Teşviki, SGK Muafiyeti & İndirimler",
    "ikon": "🔬",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Aylık MUHSGK & Yıllık Beyanname Dönemi",
    "akilliFisilti": "🔬 Teknokent ve Ar-Ge Merkezi personellerinin fiziki/uzaktan çalışma eforları portal üzerinden onaylanmalı; Ar-Ge İndirimi Kurumlar Vergisi beyannamesinde istisna satırında gösterilmelidir.",
    "oncedenYapilacaklar": [
      "Ar-Ge ve yazılım personelinin kartlı geçiş veya uzaktan çalışma saatlerini portal zaman çizelgeleriyle (Timesheet) eşleştir",
      "Aylık MUHSGK beyannamesinde 5746/4691 teşvik kodlarını seçerek GV stopaj teşviki ve SGK işveren hissesi prim muafiyetini işlet",
      "Onaylı Ar-Ge projeleri kapsamında yapılan malzeme, amortisman ve genel giderleri Ar-Ge İndirimi matrahına dahil et",
      "Sanayi ve Teknoloji Bakanlığına sunulacak Yıllık Faaliyet Raporunu ve mali denetim eklerini hazırla"
    ]
  },
  {
    "id": "maliye_7326_7440_matrah_artirimi_ve_inceleme_bagisikligi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "7440 sayılı yapılandırma kanunu matrah artırımı",
      "kurumlar vergisi kdv gelir vergisi stopajı artırımı",
      "vergi incelemesi ve tarhiyat bağışıklığı şartları",
      "matrah artırımı taksit ödeme süresi ve hak kaybı",
      "geçmiş yıl mali zararlarının yüzde 50 mahsup kısıtı"
    ],
    "baslik": "7440 Matrah Artırımı: Vergi İnceleme Bağışıklığı, Taksit Ödemeleri & Zarar Mahsubu",
    "ikon": "🛡️",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Taksit Vade Tarihleri & İnceleme Taleplerinde",
    "akilliFisilti": "🛡️ Matrah ve vergi artırımında bulunulan yıllar için sonradan vergi incelemesi ve tarhiyat yapılamaz; artırım yapılan yıl zararlarının %50'sinin mahsup edilemeyeceği unutulmamalıdır.",
    "oncedenYapilacaklar": [
      "GİB sistemi üzerinden Gelir/Kurumlar, KDV ve Muhtasar türlerinde artırım tahakkuk fişlerini ve ödeme planını arşivle",
      "Olası vergi dairesi/denetim tebligatlarında ilgili dönem için matrah artırımı tahakkukunu ibraz ederek incelemeyi durdur",
      "Matrah artırımı yapılan yıllara ait geçmiş yıl zararlarının Kurumlar Vergisi beyannamesinde sadece %50'sini mahsup et",
      "Kanunda öngörülen taksit ödemelerinin süresinde yapıldığını kontrol ederek hak kaybı riskini bertaraf et"
    ]
  },
  {
    "id": "hukuk_hmk_ihtiyati_tedbire_itiraz_ve_teminat_iadesi",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ihtiyati tedbir kararına itiraz hmk 394",
      "ihtiyati tedbir itiraz süresi 1 haftalık hak düşürücü",
      "ihtiyati tedbir teminat mektubu iadesi",
      "haksız ihtiyati tedbir tazminat davası zamanaşımı",
      "tedbirin değiştirilmesi veya kaldırılması dilekçesi"
    ],
    "baslik": "HMK 394: İhtiyati Tedbire İtiraz (1 Hafta), Duruşma & Teminat İadesi",
    "ikon": "⚖️",
    "renk": "#E0E7FF",
    "varsayilanZaman": "Tedbir Tebliğinden İtibaren 1 Hafta",
    "akilliFisilti": "⚖️ İhtiyati tedbir kararına karşı tefhim veya tebliğden itibaren 1 HAFTA içinde mahkemeye itiraz edilmeli; itiraz dilekçesinde teminatın haksızlığı delillendirilmelidir.",
    "oncedenYapilacaklar": [
      "Mahkemenin ihtiyati tedbir tensip zaptı ve tensiple birlikte belirlenen teminat makbuzunu incele",
      "Tebliğ tarihinden itibaren 1 haftalık kesin süre içinde tedbire itiraz dilekçesini UYAP üzerinden sun",
      "Duruşmalı incelemede tedbirin telafisi güç zarar doğuracağını belirterek tedbirin teminatsız kaldırılmasını talep et",
      "Dava lehe sonuçlandığında bloke edilen banka teminat mektubunun iadesi için kesinleşme şerhini al"
    ]
  },
  {
    "id": "hukuk_avukatlik_kanunu_hapis_hakki_ve_akdi_vekalet_ucreti",
    "category": "finans",
    "domain": "HUKUK",
    "keywords": [
      "avukatlık kanunu 164 akdi vekalet ücreti sözleşmesi",
      "avukatın hapis hakkı 1136 sayılı kanun m 166",
      "vekalet ücreti alacağı icra takibi ve ilamsız takip",
      "azil ve istifa halinde vekalet ücretinin muacceliyeti",
      "hasma yükletilen karşı vekalet ücreti tahsilatı"
    ],
    "baslik": "Avukatlık Hukuku: m.166 Hapis Hakkı, Akdi Ücret & İtirazın İptali",
    "ikon": "📜",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Vekalet Sözleşmesi & Ücret Muacceliyeti",
    "akilliFisilti": "📜 Avukatlık Kanunu m.166 uyarınca avukat, vekalet ücreti ve masraf alacakları için müvekkiline ait para ve evrak üzerinde hapis hakkını kullanabilir.",
    "oncedenYapilacaklar": [
      "Yazılı Akdi Avukatlık Ücret Sözleşmesini ve serbest meslek makbuzu dökümlerini dosyala",
      "Müvekkile noter aracılığıyla muaccel vekalet ücreti ihtarnamesi çekerek hapis hakkı bildiriminde bulun",
      "Ödenmeyen vekalet ücreti için icra takibi açarak borçlunun itirazı halinde İtirazın İptali Davası ikame et",
      "Karşı taraf vekalet ücretini ilamlı icra dosyası üzerinden doğrudan icra veznesinden talep et"
    ]
  },
  {
    "id": "hukuk_iik_89_haciz_ihbarnameleri_ve_menfi_tespit_davasi",
    "category": "finans",
    "domain": "HUKUK",
    "keywords": [
      "iik 89 1 birinci haciz ihbarnamesi 7 günlük itiraz",
      "iik 89 2 ikinci haciz ihbarnamesi ve itiraz",
      "iik 89 3 üçüncü haciz ihbarnamesi bildirim",
      "iik 89 3 menfi tespit davası 15 günlük kesin hak düşürücü süre",
      "üçüncü şahıstaki mevduat ve hakların haczi banka cevabı"
    ],
    "baslik": "İİK m.89 Haciz İhbarname Zinciri: 1./2./3. İhbarname & 15 Günlük Menfi Tespit",
    "ikon": "🏦",
    "renk": "#FEE2E2",
    "varsayilanZaman": "İhbarname Tebliğinden İtibaren 7 / 15 Gün",
    "akilliFisilti": "🏦 İİK 89/1 ve 89/2 ihbarnamelerine 7 gün içinde itiraz edilmeli; 89/3 tebliğ edildiğinde 15 GÜN içinde genel mahkemede Menfi Tespit Davası açılmalıdır.",
    "oncedenYapilacaklar": [
      "İcra dairesinden gelen 89/1 Haciz İhbarnamesindeki borçlu cari hesap ve alacak bakiyesini muhasebeden kontrol et",
      "Borçlunun şirkette hiçbir hak ve alacağı bulunmadığını 7 gün içinde icra müdürlüğüne UETS ile bildir",
      "Süresi kaçırılan 89/3 ihbarnamelerinde zimmet sayılan tutar için 15 gün içinde Asliye Ticaret/Hukuk Mahkemesinde Menfi Tespit Davası aç",
      "Dava dilekçesi ve tensip zaptını icra dairesine sunarak icra veznesindeki paranın alacaklıya ödenmesini durdur"
    ]
  },
  {
    "id": "hukuk_ttk_ticari_defterlerin_kaybi_ve_zayi_belgesi_davasi",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "ttk 82 7 ticari defterlerin zayi belgesi davası",
      "yangın su baskını hırsızlık zayi belgesi 30 günlük süre",
      "yevmiye defteri kebir envanter defteri zayi istemi",
      "asliye ticaret mahkemesi hasımsız zayi belgesi dilekçesi",
      "mücbir sebep vergi usul kanunu ve zayi belgesi ibrazı"
    ],
    "baslik": "TTK m.82/7: Ticari Defter Zayi Belgesi Davası (30 Gün) & Mücbir Sebep İspatı",
    "ikon": "📚",
    "renk": "#EDE9FE",
    "varsayilanZaman": "Ziya Öğrenilmesinden İtibaren 30 Gün",
    "akilliFisilti": "📚 Yangın, sel veya hırsızlık sonucu ticari defterleri kaybolan tacir, öğrenme tarihinden itibaren 30 GÜN içinde Asliye Ticaret Mahkemesinden Zayi Belgesi istemelidir.",
    "oncedenYapilacaklar": [
      "Olay yeri itfaiye yangın raporu, polis hırsızlık tutanağı veya meteoroloji afet belgesini resmi olarak temin et",
      "30 günlük hak düşürücü süre dolmadan Asliye Ticaret Mahkemesinde hasımsız Zayi Belgesi Dava Dilekçesi aç",
      "Zayi olan yevmiye, envanter ve defter-i kebirin noter açılış-kapanış tasdik yevmiye numaralarını mahkemeye sun",
      "Alınan mahkeme Zayi Kararını olası vergi ve SGK incelemelerinde mücbir sebep delili olarak dosyala"
    ]
  },
  {
    "id": "hukuk_cmk_uzlastirma_raporu_ve_edimli_protokol",
    "category": "resmi",
    "domain": "HUKUK",
    "keywords": [
      "cmk 253 ceza muhakemesinde uzlaştırma yönetmeliği",
      "uzlaştırmacı raporu 30 günlük yasal süre ve ek süre",
      "edimli uzlaşma protokolü bağış özür dileme tazminat",
      "uzlaşma sağlanması kamu davasının düşmesi veya kovuşturmaya yer olmadığı",
      "uzlaştırma bürosu savcılık onay kararı"
    ],
    "baslik": "CMK m.253 Ceza Uzlaştırması: 30 Günlük Süre, Edimli Protokol & Savcılık Onayı",
    "ikon": "🤝",
    "renk": "#DCFCE7",
    "varsayilanZaman": "Uzlaştırma Görevlendirmesinden İtibaren 30 Gün",
    "akilliFisilti": "🤝 Uzlaştırmacı raporu 30 gün içinde (en fazla 20 gün ek süreyle) tamamlanmalı; edimli uzlaşma protokolü Savcılıkça onaylandığında ceza davası açılamaz.",
    "oncedenYapilacaklar": [
      "Uzlaştırma dosyasını adliye bürosundan teslim alıp şüpheli/sanık ve mağdur/müşteki taraflara resmi uzlaşma teklif formunu tebliğ et",
      "Taraflarla müzakere yürüterek maddi tazminat veya kamu yararına bağış içeren \"Uzlaştırma Protokolünü\" imzalat",
      "Süre bitmeden Uzlaştırma Raporunu ve ıslak imzalı protokolü Cumhuriyet Başsavcılığı Uzlaştırma Bürosuna tevdi et",
      "Savcılık onayı ile birlikte kovuşturmaya yer olmadığına dair karar (KYOK) veya davanın düşmesi kararını taraflara teyit et"
    ]
  },
  {
    "id": "maliye_vuk_371_pismanlik_ve_islah_ile_beyanname",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "vuk 371 pişmanlık ve ıslah beyannamesi",
      "vergi ziyaı cezası kesilmemesi ve pişmanlık zammı",
      "kendiliğinden verilen kdv muhtasar kurumlar beyanı",
      "pişmanlık şartlarının ihlali 15 günlük ödeme süresi",
      "vergi incelemesine başlanmadan önce pişmanlık başvurusu"
    ],
    "baslik": "VUK m.371: Pişmanlık ve Islah, 15 Günlük Ödeme & Ceza Muafiyeti",
    "ikon": "📊",
    "renk": "#DCFCE7",
    "varsayilanZaman": "İnceleme Öncesi Pişmanlık Beyanı",
    "akilliFisilti": "📊 VUK 371 uyarınca vergi incelemesine başlanmadan önce verilen pişmanlık beyannamelerinde vergi ziyaı cezası kesilmez; tahakkuk eden vergi ve pişmanlık zammı 15 GÜN içinde ödenmelidir.",
    "oncedenYapilacaklar": [
      "Mükellef hakkında herhangi bir vergi incelemesi veya ihbar bulunmadığını teyit et",
      "GİB e-Beyanname portalında \"PİŞ\" (Pişmanlık) ve \"DÜZ\" (Düzeltme) opsiyonlarını seçerek beyannameyi onayla",
      "Tahakkuk fişinde hesaplanan Pişmanlık Zammı ve vergi aslını 15 günlük yasal süre içinde ödet",
      "Ödeme süresinde yapılmazsa pişmanlık şartının ihlal edilip cezanın 1. derece usulsüzlüğe döneceğini mükellefe bildir"
    ]
  },
  {
    "id": "maliye_6183_aatudk_tecil_ve_taksitlendirme_talebi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "6183 sayılı kanun m 48 tecil ve taksitlendirme formu",
      "çok zor durum hali analitiği likidite oranı hesabı",
      "vergi dairesi borç yapılandırma teminat gösterme kuralı",
      "tecil faizi oranı ve 36 aya kadar taksitlendirme",
      "kamu hacizlerinin kaldırılması tecil onay yazısı"
    ],
    "baslik": "6183 m.48: Amme Alacağı Tecil ve Taksitlendirme, Çok Zor Durum & Teminat",
    "ikon": "💰",
    "renk": "#FEF3C7",
    "varsayilanZaman": "Haciz Öncesi Tecil Talebi",
    "akilliFisilti": "💰 Vadesi geçmiş vergi borçlarında mükellefin Çok Zor Durumda olduğu rasyolarla ispatlanmalı (Likidite < 1.0); 50.000 TL üzeri borçlarda %50 teminat gösterilmelidir.",
    "oncedenYapilacaklar": [
      "Mükellef bilançosundan Dönen Varlıklar ve Kısa Vadeli Yabancı Kaynakları oranlayarak Çok Zor Durum Rasyosunu hesapla",
      "Vergi Dairesi Tecil ve Taksitlendirme Talep Formunu doldurarak azami 36 aylık ödeme planını oluştur",
      "50.000 TL'yi aşan kısım için gayrimenkul ipoteği, banka teminat mektubu veya menkul rehni teminatını ibraz et",
      "Tecil onayı alındığında banka hesaplarındaki e-hacizlerin kaldırılması için vergi dairesine talep yazısı yaz"
    ]
  },
  {
    "id": "maliye_kvk_5_1_e_tasinmaz_ve_istirak_satisi_istisnasi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "kvk 5 1 e taşınmaz ve iştirak hissesi satış kazancı istisnası",
      "kurumlar vergisi yüzde 50 istisna oranı 2 tam yıl aktifte kalma",
      "özel fon hesabı 5 yıl süreyle sermayeye ilave dışında çekilemez",
      "satış bedelinin 2 yıl içinde tahsil edilmesi şartı",
      "maddi duran varlık yenileme fonu 549 hesap"
    ],
    "baslik": "KVK m.5/1-e: Taşınmaz/İştirak Satış Kazancı İstisnası (%50) & 5 Yıllık Fon",
    "ikon": "🏢",
    "renk": "#E0F2FE",
    "varsayilanZaman": "Taşınmaz Satış Dönemi & Beyan",
    "akilliFisilti": "🏢 En az 2 tam yıl aktifte kalan taşınmazların satış kazancının %50'si Kurumlar Vergisinden istisnadır; kazanç 5 yıl süreyle pasifte özel fon hesabında tutulmalıdır.",
    "oncedenYapilacaklar": [
      "Taşınmazın şirketin aktifine giriş tarihi ile tapu satış tarihi arasında en az 730 gün (2 tam yıl) olduğunu doğrula",
      "Satış bedelinin satışın yapıldığı yılı izleyen 2. takvim yılının sonuna kadar nakden tahsil edildiğini teyit et",
      "Hesaplanan satış karının %50'sini pasifte 549 Özel Fonlar Hesabına alıp 5 yıl sermaye dışında çekilmesini bloke et",
      "Kurumlar Vergisi beyannamesinde istisna tutarını \"Zarar Olsa Dahi İndirilecek İstisnalar\" satırında beyan et"
    ]
  },
  {
    "id": "maliye_e_irsaliye_7_gun_ve_fiili_sevk_eslestirmesi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "e-irsaliye fiili sevk tarihi ve saati kuralı",
      "e-irsaliye yanıt verme süresi 7 günlük yasal süre",
      "sevk irsaliyesi karekod karekodlu belge denetimi",
      "mal teslimi ret kabul kısmi kabul yanıtı gib portal",
      "yol denetimi maliye yoklama memuru e-irsaliye sorgulama"
    ],
    "baslik": "GİB e-İrsaliye: Fiili Sevk Saati, 7 Günlük Yanıt Süresi & Kabul/Ret Yanıtı",
    "ikon": "🚛",
    "renk": "#FED7AA",
    "varsayilanZaman": "Araç Yola Çıkmadan Önce & 7 Gün İçinde",
    "akilliFisilti": "🚛 e-İrsaliye araç yola çıkmadan önce düzenlenip GİB sistemine iletilmeli; alıcı firma teslimden itibaren 7 GÜN içinde uygulama yanıtı (Kabul/Ret/Kısmi Kabul) vermelidir.",
    "oncedenYapilacaklar": [
      "Mal sevkiyatından önce taşıyıcı plaka, şoför TC ve Fiili Sevk Zamanını (Saat/Dakika) e-İrsaliyeye işle",
      "Şoföre karekodlu e-İrsaliye çıktısını veya mobil cihaz görüntüsünü yol denetimleri için teslim et",
      "Gelen mallarda hasarlı/eksik ürün varsa 7 gün içinde GİB portalından \"Kısmi Kabul\" veya \"Ret\" yanıtı gönder",
      "7 gün içinde yanıt verilmeyen e-İrsaliyelerin sistem tarafından otomatikman tam teslim kabul edildiğini dikkate al"
    ]
  },
  {
    "id": "maliye_ba_bs_ve_e_fatura_capraz_mutabakat_denetimi",
    "category": "finans",
    "domain": "MALIYE",
    "keywords": [
      "form ba bs bildirim formu vuk genel tebliği",
      "e-fatura e-arşiv fatura çapraz mutabakat excel",
      "5000 tl üzeri fatura mutabakatı ve kdv hariç limit",
      "vuk mükerrer 355 özel usulsüzlük cezası ba bs",
      "cari hesap mutabakat mektubu ve ba bs uyuşmazlığı"
    ],
    "baslik": "VUK Ba-Bs & e-Fatura: 5.000 TL Çapraz Mutabakat, e-Belge İstisnası & Düzeltme",
    "ikon": "📑",
    "renk": "#FEE2E2",
    "varsayilanZaman": "Her Ayın Son Gününe Kadar",
    "akilliFisilti": "📑 5.000 TL üzeri e-Arşiv/Kağıt faturalar Form Ba-Bs ile bildirilir; elektronik faturalar Ba-Bs kapsamından çıkarılmış olsa da cari mutabakat 5 gün önceden tamamlanmalıdır.",
    "oncedenYapilacaklar": [
      "Alıcı ve satıcı cari hesap ekstrelerini KDV hariç fatura adet ve matrah bazında çapraz karşılaştır",
      "e-Fatura ve e-Arşiv faturaların Ba-Bs bildirimine dahil edilmediğini, yalnızca kağıt faturaların girildiğini teyit et",
      "Uyuşmazlık durumunda karşı firmayla yazılı Cari Mutabakat Mektubunu teyitleşerek arşivle",
      "Hatalı verilen Ba-Bs formunu cezalı duruma düşmemek için yasal süresini takip eden ilk 10 gün içinde düzelt"
    ]
  }
];
