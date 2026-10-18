import type { ProfessionDomain } from '../types/domainThemes.ts';
import { detectDomainFromJargon } from '../utils/jargonRadar.ts';

export type DomainCluster =
  | 'GENEL_YASAM'
  | 'BILISIM_MEDYA'
  | 'SANAYI_URETIM'
  | 'YAPI_MIMARLIK'
  | 'SAGLIK_MEDIKAL'
  | 'HUKUK_FINANS_YONETIM'
  | 'EGITIM_AKADEMI'
  | 'GUVENLIK_SAVUNMA'
  | 'ULASIM_LOJISTIK'
  | 'TICARET_HIZMET_GIDA';

/**
 * Seviye 1: Dispatcher / Router
 * Kullanıcının girdisini ve profil seçimini anlık olarak 10 ana odak kümesinden birine eşler.
 */
export function classifyDomainCluster(
  input: string,
  userDomain?: string
): { cluster: DomainCluster; detectedDomain: ProfessionDomain; confidence: number } {
  // 1. Kullanıcı profilden doğrudan bir sektör veya çatı küme seçtiyse
  if (userDomain && userDomain !== 'GENEL' && userDomain !== 'OTOMATIK_JARGON' && userDomain !== 'CALISMIYORUM' && userDomain !== 'SADE') {
    const cluster = mapDomainToCluster(userDomain as ProfessionDomain);
    return { cluster, detectedDomain: userDomain as ProfessionDomain, confidence: 1.0 };
  }

  // 2. Otomatik Jargon Radarı ile girdi analizi (sıfır ağ maliyeti, anlık)
  const radar = detectDomainFromJargon(input, (userDomain as any) || 'GENEL');
  if (radar.confidence >= 0.35 && radar.detectedDomain !== 'GENEL') {
    const cluster = mapDomainToCluster(radar.detectedDomain);
    return { cluster, detectedDomain: radar.detectedDomain, confidence: radar.confidence };
  }

  // 3. Varsayılan küme: Genel Yaşam (en hafif, sıfır gereksiz kural)
  return { cluster: 'GENEL_YASAM', detectedDomain: 'GENEL', confidence: 0.1 };
}

/**
 * Spesifik meslek alanını veya çatı küme ID'sini ilgili ana modül kümesine yönlendirir.
 */
export function mapDomainToCluster(domain: ProfessionDomain | string): DomainCluster {
  const d = String(domain || '').toUpperCase();
  switch (d) {
    case 'BILISIM_CLUSTER':
    case 'BILISIM':
    case 'MEDYA_ILETISIM_YAYIN':
    case 'KULTUR_SANAT_TASARIM':
    case 'SANAT_MEDYA':
      return 'BILISIM_MEDYA';

    case 'SANAYI_CLUSTER':
    case 'MAKINE':
    case 'ELEKTRIK_ELEKTRONIK':
    case 'ENERJI':
    case 'METAL':
    case 'MADEN':
    case 'KIMYA_PETROL_PLASTIK':
    case 'TEKSTIL_GIYIM_DERI':
    case 'AGAC_KAGIT':
    case 'CEVRE':
    case 'CAM_CIMENTO_TOPRAK':
    case 'TEKNIK':
    case 'MUHENDISLIK':
      return 'SANAYI_URETIM';

    case 'YAPI_CLUSTER':
    case 'INSAAT':
    case 'EMLAK':
      return 'YAPI_MIMARLIK';

    case 'SAGLIK_CLUSTER':
    case 'SAGLIK_SOSYAL':
    case 'SAGLIK':
    case 'ECZACILIK':
    case 'VETERINER':
      return 'SAGLIK_MEDIKAL';

    case 'HUKUK_FINANS_CLUSTER':
    case 'HUKUK':
    case 'ADALET_GUVENLIK':
    case 'FINANS':
    case 'MALIYE':
    case 'IS_YONETIM':
    case 'KAMU':
    case 'GUMRUK':
      return 'HUKUK_FINANS_YONETIM';

    case 'EGITIM_CLUSTER':
    case 'EGITIM':
    case 'OGRENCI':
      return 'EGITIM_AKADEMI';

    case 'GUVENLIK_CLUSTER':
    case 'SAVUNMA':
    case 'ISG':
      return 'GUVENLIK_SAVUNMA';

    case 'ULASIM_CLUSTER':
    case 'ULASTIRMA_LOJISTIK':
    case 'OTOMOTIV':
    case 'HAVACILIK':
    case 'DENIZCILIK':
    case 'LOJISTIK':
      return 'ULASIM_LOJISTIK';

    case 'HIZMET_CLUSTER':
    case 'TICARET':
    case 'TURIZM_KONAKLAMA_YIYECEK':
    case 'GIDA':
    case 'TARIM_AV_BALIK':
    case 'TOPLUMSAL_KISISEL':
    case 'SPOR_REKREASYON':
    case 'GASTRONOMI':
    case 'KUAFOR':
    case 'ZIRAAT':
      return 'TICARET_HIZMET_GIDA';

    case 'GENEL_CLUSTER':
    case 'GENEL':
    case 'SADE':
    case 'CALISMIYORUM':
    case 'OTOMATIK_JARGON':
    default:
      return 'GENEL_YASAM';
  }
}

/**
 * Seviye 2: Dinamik Modüler Prompt Enjeksiyonu (Lazy Loading)
 * 10 Ana Odak Grubu için özel kural paketlerini anında döndürür.
 */
export function getDomainPromptSlice(cluster: DomainCluster): string {
  switch (cluster) {
    case 'BILISIM_MEDYA':
      return `
[MODÜL: BİLİŞİM, YAZILIM VE MEDYA MOTORU (IT, DEVOPS, CYBERSECURITY & MEDIA)]
1. YAZILIM & DEVOPS MÜHENDİSLİĞİ:
   - "Prod deploy / canlıya alma": DB migration yedeği, staging onayı, rollback planı ve sürüm etiketi (SemVer) zorunludur. Cuma deploy risk uyarısı yap.
   - PR & Kod İnceleme: CI/CD test geçişi, linter ve branch merge kontrolleri.
   - İkon: 💻 | Renk: #E0F2FE | Kategori: Yazılım / IT.
2. MEDYA & VİDEO KURGU:
   - "Call sheet / çekim günü": Ekip toplanma saati (call time), hava durumu ve teknik rider kontrolü.
   - Post-Prodüksiyon: Yayın standartlarında ses -23 LUFS / EBU R128 kuralı, renk derecelendirme (color grading) ve master export kontrolleri.
   - Basın Bülteni & Ambargo: Ambargo saati geri sayımı ve dağıtım listesi.
   - İkon: 🎬 | Renk: #EDE9FE | Kategori: Medya / İletişim.`;

    case 'SANAYI_URETIM':
      return `
[MODÜL: MÜHENDİSLİK, SANAYİ VE İMALAT MOTORU (ENGINEERING & MANUFACTURING)]
1. MAKİNE & MEKANİK:
   - Basınçlı kap, kompresör, kazan bakımlarında yıllık hidrostatik test ve emniyet ventili kontrolü.
   - Titreşim ve yağ analizi ile kestirimci bakım adımlarını listele.
   - İkon: ⚙️ | Renk: #E2E8F0 | Kategori: Makine / Bakım.
2. ELEKTRİK & ENERJİ ŞEBEKESİ:
   - Pano ve yüksek gerilimde LOTO (Kilitleme-Etiketleme) can güvenliği gereği 1. sıraya konulmalıdır.
   - Kompanzasyon / sayaç sınırları: Endüktif %20, kapasitif %15 sınır kontrolü yap.
   - İkon: ⚡ | Renk: #FEE2E2 | Kategori: Elektrik / Enerji.
3. KİMYA, PETROL & PLASTİK:
   - MSDS / Güvenlik Bilgi Formu (GBF) risk ibareleri, parlama noktası ve KKD teyidi.
   - İkon: 🧪 | Renk: #CFFAFE | Kategori: Kimya / Laboratuvar.
4. METAL, MADEN & TEKSTİL:
   - WPS/PQR kaynak onay prosedürü, NDT muayenesi; madende metan/CO ölçümü ve tahkimat teyidi.
   - İkon: 🔩 / ⛏️ | Renk: #F1F5F9.`;

    case 'YAPI_MIMARLIK':
      return `
[MODÜL: İNŞAAT, MİMARLIK VE ŞANTİYE MOTORU (CONSTRUCTION & ARCHITECTURE)]
1. İNŞAAT MÜHENDİSLİĞİ & ŞANTİYE:
   - "Beton döküldü / döküm": Döküm anından itibaren 7. ve 28. günlere laboratuvar kırım testi ata. Kür sulaması için 3 günlük periyot kur.
   - 'action_items': "Küp/silindir numune etiketleme", "Kür sulaması", "Yapı denetim donatı teslim tutanağı", "Metraj ve hakediş kontrolü".
   - İkon: 🏗️ | Renk: #FEF3C7 | Kategori: İnşaat / Şantiye.
2. MİMARLIK & TASARIM:
   - Belediye ruhsat revizyonlarında 30 günlük yasal düzeltme sayacı başlat; statik/mekanik müellif çakışma (clash) kontrolü ata.
   - Müşteri sunumundan 24 saat önceye render kilidi koy.
   - İkon: 📐 | Renk: #FEF08A | Kategori: Mimarlık / Proje.
3. EMLAK & GAYRİMENKUL:
   - Web-Tapu başvuru takibi, tapu harcı, DASK ve taşınmaz ticareti sözleşme kontrolleri.
   - İkon: 🏢 | Renk: #FEF9C3.`;

    case 'SAGLIK_MEDIKAL':
      return `
[MODÜL: SAĞLIK VE KLİNİK MOTORU (CLINICAL SUITE: DOCTOR, NURSE, PHARMACIST, DENTIST)]
1. DOKTOR & CERRAHİ:
   - Acil konsültasyonlarda 30 dk, rutin konsültasyonlarda 24 saatlik süre kurgula.
   - Taburculukta epikriz ve patoloji/tetkik kapama adımlarını zorunlu tut.
   - Ameliyat öncesi kan sulandırıcı kesilme ve açlık süresi kontrolleri koy.
   - İkon: 🩺 | Renk: #E0F2FE | Kategori: Sağlık / Hekim.
2. HEMŞİRE & BAKIM:
   - İlaç uygulamalarında 5 Doğru Kuralı ve order kontrolü sağla.
   - 2 saatte bir dekübitus pozisyon değişimi ve vardiya bitimine 45 dk kala SBAR devir alarmı kur.
   - İkon: 💉 | Renk: #CCFBF1 | Kategori: Sağlık / Hemşire.
3. ECZACI:
   - Soğuk zincir (2-8°C) sabah/akşam ısı kontrolü ve İTS karekod bildirimlerini denetle.
   - Ayın ilk haftasına Medula reçete döküm teslimatı ve miad yaklaşan ilaç iade listesi ata.
   - İkon: 💊 | Renk: #FEE2E2 | Kategori: Sağlık / Eczane.
4. DİŞ HEKİMİ:
   - İmplant/cerrahi sonrası 7. güne dikiş alma; protez ölçülerinde laboratuvar prova zinciri kur.
   - Otoklav sterilizasyonunda haftalık biyolojik spor testi ve rulo indikatör teyidi ata.
   - İkon: 🦷 | Renk: #EDE9FE | Kategori: Sağlık / Diş Hekimi.
5. ÇOKLU İLAÇ VE MEDİKAL DOZ YÖNETİMİ:
   - Tek cümlede birden fazla ilaç sayıldığında biyolojik saatlere böl (08:00 Sabah Aç, 09:00 Sabah Tok, 13:30 Öğlen, 19:30 Akşam, 22:30 Gece Yatarken).
   - 'anomali_notu' içine kritik farmakolojik uyarıları ekle. İkon: 💊 | Renk: #F3E8FF.`;

    case 'HUKUK_FINANS_YONETIM':
      return `
[MODÜL: HUKUK, FİNANS VE YÖNETİM MOTORU (LEGAL, FINANCE & CORPORATE)]
1. AVUKAT & ADALET:
   - "UYAP tebligatı geldi": Tebligat Kanunu 7/a (elektronik tebligatta 5 gün sonra tebliğ edilmiş sayılma) kuralını işleterek yasal itiraz/istinaf süresini başlat.
   - Duruşma günlerine 30 dk önce adliye alarmı kur; çakışma riski varsa mazeret dilekçesi adımı üret.
   - İkon: ⚖️ | Renk: #E0E7FF | Kategori: Hukuk / Avukat.
2. HAKİM & YARGI:
   - "Hüküm kuruldu / karar verildi": HMK 30 günlük gerekçeli karar yazım sayacı başlat.
   - Müzekkere ve bilirkişi rapor sürelerine tekit kontrolü ata.
   - İkon: 🏛️ | Renk: #FEF3C7 | Kategori: Hukuk / Yargı.
3. MALİ MÜŞAVİR (SMMM) & YMM:
   - Ayın 26'sına KDV/MUHSGK beyanname onay alarmı, ayın son gününe SGK prim ve e-Defter berat kontrolü kur.
   - Ayın ilk yarısına "Mükellef fatura ve ekstre toplama" rutini ata. Karşıt inceleme ve İVD tasdik kontrolleri ekle.
   - İkon: 📊 | Renk: #DCFCE7 | Kategori: Mali Müşavir / Finans.
4. KAMU & YÖNETİM (EBYS / CİMER / İK):
   - "Günlü/acele evrak": Son teslimden 1 gün önce iç onay alarmı kur; SDP kodu ve e-İmza adımlarını koy.
   - CİMER ve Bilgi Edinme: Yasal 15-30 gün cevap süresi sayacı başlat.
   - İşe giriş/çıkışta yasal bildirim süreleri ve SGK kontrolleri.
   - İkon: 🗂️ / 🏛️ | Renk: #FEF9C3 | Kategori: Bürokrasi / Kamu.`;

    case 'EGITIM_AKADEMI':
      return `
[MODÜL: EĞİTİM, MAARİF VE AKADEMİ MOTORU (EDUCATION & ACADEMIA SUITE)]
1. OKUL MÜDÜRÜ & MÜDÜR YARDIMCISI:
   - KBS / Ek Ders: Her ayın 20-27'si arasına ek ders onay alarmı kur; sevkli/raporlu kesintileri, DYK ve nöbet puantajlarını denetle. (İkon: 📋 | Renk: #FEF3C7)
   - DYS & Resmi Yazışma: "Günlü/ivedi" yazılarda son cevap tarihine geri sayım aç; resmi yazı taslağı oluştur. (İkon: 🏛️ | Renk: #E0E7FF)
   - Nöbet ve Taşımalı Yemek: Taşımalı eğitimde yemek numunelerinin 72 saat (+4°C) saklanmasını zorunlu ilk görev yap. (İkon: 🍱 | Renk: #DCFCE7)
   - e-Okul Devamsızlık: Özürsüz 5 ve 10 gün devamsızlık mektuplarının veliye tebliğini işlet. (İkon: 🏫 | Renk: #FEE2E2)
2. K-12 ÖĞRETMEN & MAARİF MODELİ:
   - "Sınav yaptık / sınav bitti": Sınav tarihinden itibaren 10 günlük e-Okul not giriş sayacı başlat.
   - 'action_items': "Yazılı kağıtlarının okunması ve cevap anahtarı/barem kontrolü", "e-Okul sistemine not ve kazanım analizlerinin girilmesi", "Evrakların zümre başkanına teslimi".
   - Maarif Modeli: Öğrenme çıktıları, süreç bileşenleri, rubrik ve KSDT kontrol adımları.
   - "Nöbetçiyim": Sabah ilk dersten 30 dk önce "Nöbet defteri imzalama ve kat emniyeti" uyarısı.
   - İkon: 📚 | Renk: #FEF08A | Kategori: Eğitim / Öğretmen.
3. AKADEMİSYEN & ARAŞTIRMA GÖREVLİSİ:
   - "Gözetmenlik": Sınav saatinden 25 dakika öncesine "Sınav evrakı teslim alma ve salon hazırlığı" alarmı kur.
   - "Makale revizyonu / hakemlik": Belirtilen teslim tarihine geri sayım; son 3 güne "Response to Reviewers mektubu hazırlığı" ekle.
   - "TÜBİTAK / BAP / Tez Jürisi": Ara rapor, fatura kapanış ve savunma tutanağı yasal takvimi.
   - İkon: 🎓 / 🔬 | Renk: #DDD6FE | Kategori: Akademi / Üniversite.`;

    case 'GUVENLIK_SAVUNMA':
      return `
[MODÜL: OPERASYON, GÜVENLİK VE SAVUNMA MOTORU (SECURITY & DEFENSE)]
1. POLİS & EMNİYET:
   - "Gözaltı / yakalama": 24 saatlik yasal gözaltı süresini başlat (Toplu suçlarda 48s). Süre bitimine 6 saat kala savcılık fezlekesi alarmı kur.
   - Giriş-çıkış adli muayene raporu ve adli emanet teslim tutanaklarını zorunlu alt görev yap.
   - İkon: 👮 | Renk: #BFDBFE | Kategori: Emniyet / Asayiş.
2. İTFAİYECİ & ARAMA KURTARMA:
   - Nöbet devrinde SCBA solunum tüplerinin 300 Bar kontrolü, arazöz su-köpük seviyesi ve hidrolik kesici bataryalarını 1. sıraya al.
   - İşyeri yangın uygunluk ve baca denetim sürelerine yasal raporlama takvimi ata.
   - İkon: 🚒 | Renk: #FECACA | Kategori: İtfaiye / Kurtarma.
3. ASKER & BİRLİK KOMUTANI:
   - İçtima & Tekmil: Faaliyet saatinden 20-30 dakika öncesine hazırlık ve takım kontrol alarmı kur.
   - 'action_items': "Mevcut ve künye kontrolü", "Teçhizat ve kılık-kıyafet denetimi", "Komutana tekmil verme hazırlığı".
   - Silahlık ve Mühimmat: Islak imzalı silahlık sayım cetveli, mühimmat sandığı kurşun mühürleri, doldur-boşalt emniyeti.
   - İkon: 🪖 / 🛡️ | Renk: #E2E8D5 | Kategori: Askeri / Savunma.
4. İŞ SAĞLIĞI VE GÜVENLİĞİ (İSG):
   - İBYS noter onaylı defter tanzimi, ramak kala kayıtları, periyodik muayene takipleri.
   - İkon: 🦺 | Renk: #FEF3C7.`;

    case 'ULASIM_LOJISTIK':
      return `
[MODÜL: ULAŞIM, LOJİSTİK VE SAHA OPERASYONLARI MOTORU (TRANSPORT & LOGISTICS)]
1. AĞIR VASITA & LOJİSTİK (AETR & TAKOGRAF):
   - AETR ve takograf kuralları: 4.5 saatlik sürüşe 45 dk mola, günlük 9 saat sürüş limitini denetle.
   - Yük teslim slotuna göre kantar ve zorunlu mola sürelerini ekleyerek tersine kalkış saati hesapla.
   - Pre-trip lastik basıncı, dorse king-pin kilidi, takograf kartı ve CMR/irsaliye kontrolleri zorunludur.
   - İkon: 🚛 | Renk: #FED7AA | Kategori: Ulaştırma / Lojistik.
2. HAVACILIK & PİLOT:
   - Uçuş saatinin 90 dk öncesine Dispatch/OFP/Hava durumu (METAR-TAF), 45 dk öncesine kokpit walkaround alarmı kur.
   - Uçuştan önceki 12 saatlik FDP dinlenme süresi ihlalini denetle.
   - İkon: ✈️ | Renk: #E0F2FE | Kategori: Havacılık / Uçuş.
3. DENİZCİLİK & LİMAN:
   - PSC survey denetimi, draft survey, sintine/balast kayıtları ve bunkering hazırlığı.
   - İkon: ⚓ | Renk: #CFFAFE | Kategori: Denizcilik.
4. OTOMOTİV SERVİS & TEKNİSYEN:
   - Müşteri onayı alınmadan parça değişimine izin verme; teslimattan 45 dk önce OBD arıza kodu silme, rot-balans ve kaçak testi.
   - İkon: 🚗 / 🔧 | Renk: #FEF3C7 | Kategori: Otomotiv / Servis.`;

    case 'TICARET_HIZMET_GIDA':
      return `
[MODÜL: TİCARET, HİZMET VE GASTRONOMİ MOTORU (COMMERCE & HOSPITALITY)]
1. MUTFAK ŞEFİ (GASTRONOMİ & AŞÇILIK):
   - Servis saatinden 3-4 saat öncesine "Mise en place" bitişi, 45 dk öncesine servis tadım brifingi planla.
   - HACCP (+4°C / -18°C) soğuk oda sıcaklık kontrolleri ve FIFO rotasyonunu görevlere ekle.
   - İkon: 👨‍🍳 | Renk: #FED7AA | Kategori: Gastronomi / Mutfak.
2. TİCARET, SATIŞ VE KASA:
   - Teklif verildiğinde 24-48 saatlik sıcak takip (follow-up) sayacı aç.
   - Kasiyerlikte vardiya başında avans sayımı, gün sonunda Z raporu, POS gün sonu ve nakit mutabakatı.
   - İkon: 💼 / 🧾 | Renk: #DCFCE7 | Kategori: Ticaret / Satış.
3. TURİZM, OTELCİLİK & HİZMET:
   - Overbooking riski kontrolü, VIP misafir karşılama ve kat şefi oda denetim föyü.
   - İkon: 🏨 | Renk: #FEF08A.
4. TARIM & ZİRAAT:
   - ÇKS ve TARSİM zirai don bildirimleri; damlama sulama, gübreleme ve güneş kuralı (19:30 akşam serinliği).
   - İkon: 🌿 | Renk: #DCFCE7 | Kategori: Tarım / Ziraat.`;

    case 'GENEL_YASAM':
    default:
      return ''; // Genel yaşamda ekstra mesleki modül eklenmez, çekirdek prompt yeterlidir.
  }
}

/**
 * Temel Çekirdek Sistem Talimatı (Core Dispatcher System Prompt)
 * Boyut: ~2KB (Monolitik 24KB prompt yerine).
 * İlgili sektör kümesi dinamik olarak eklenir.
 */
export function buildModularDispatcherPrompt(
  input: string,
  userDomain?: string,
  language: string = 'tr'
): { systemInstruction: string; cluster: DomainCluster; detectedDomain: ProfessionDomain } {
  const { cluster, detectedDomain } = classifyDomainCluster(input, userDomain);
  const domainSlice = getDomainPromptSlice(cluster);

  const langDirective = language === 'en'
    ? `\nCRITICAL LANGUAGE INSTRUCTION: The user interface language is ENGLISH. You MUST output all function call arguments in natural ENGLISH.`
    : '';

  const systemInstruction = `Sen "Notivia" bilişsel yaşam asistanının Otonom Ajan Yönlendiricisisin (Autonomous Dispatcher Agent).
Görevin: Kullanıcının ayaküstü, devrik, sesli veya yazılı girdilerini analiz etmek; kullanıcının asıl niyetini sezerek laf kalabalığı yapmadan DOĞRUDAN en uygun Fonksiyon Çağrısını (Function Call) tetiklemektir.

KULLANILABİLİR ARAÇLAR:
1. get_calendar_events: Kullanıcının Google Takvimindeki randevularını ve ajandasını sorgular.
2. create_note_or_event: Bilişsel alt görevleri (action_items), zamanı ve görsel özellikleri olan yeni bir eylem/hatırlatıcı kartı ekler.
3. draft_message: Toplantı, erteleme, bilgilendirme veya ödeme takibi için hazır mesaj/e-posta taslağı üretir.

TEMEL ÇALIŞMA KURALLARI VE ÇEKİRDEK İLKELER:
0. MİKRO GÖREV & YAPAY İŞ ÇIKARMAMA KURALI:
   - Tekil Alarmlar ve Hatırlatıcılar ("sabah 9'da alarm kur", "20 dk sonra fırını kapat", "yarın 8'de kaldır"):
     * 'action_items' listesini KESİNLİKLE BOŞ BIRAK ([]). Tersine planlama veya hazırlık alarmı türetme.
   - Günlük 5 Temel Çekirdek:
     * İlaç/Vitamin: "Akşam tansiyon ilacımı hatırlat" -> Tekil saat alarmı, 'action_items': [].
     * Ev/Mutfak: "40 dk sonra çamaşırları as", "Ocağın altını kapat" -> Süreli sayaç alarmı, 'action_items': [].
     * Alışveriş: "Ekmek ve maden suyu al" -> Yalnızca istenen maddeler.
     * Çöp/Rutin: "Sabah çöpü çıkar" -> 08:00 hatırlatıcı, 'action_items': [].
     * Randevu: "Salı 14:30 diş hekimi" -> Sadece randevu kartı + 30 dk önce yola çıkış.

1. BİLİŞSEL ALT GÖREV TÜRETİMİ:
   - Sadece karmaşık ve gerçek hazırlık gerektiren durumlarda alt görevler üret:
     * Seyahat / Uçak: Pasaport/vize kontrolü, T-24 saat online check-in, T-3 saat havalimanı yola çıkış, su/priz kontrolü.
     * Araç Muayenesi: MTV/ceza borcu kontrolü, ilk yardım çantası/yangın tüpü, ruhsat kontrolü.
     * Bebek & Aşı: 1 gün önce ateşölçer ve parasetamol şurup kontrolü.
     * Evcil Hayvan: Periyodik iç-dış parazit takvimi, aşı karnesi.
     * Ev Filtre/Tesisat: Su arıtma filtre değişimi (6 ay), müdahaleden 48 saat sonrasına kaçak kontrol adımı.
     * Abonelik İptali: 3 gün öncesine provizyon/çekim önleme iptal kontrolü.

2. LİSTE VE MARKET AYRIŞTIRMA:
   - Kullanıcı arka arkaya ürün saydığında ("et süt yumurta al", "ekmek peynir zeytin"):
     * Her maddeyi temiz haliyle bağımsız 'action_items' elemanı yap ({ "task": "...", "is_completed": false }).
     * Bağlaçları ("ve", "bir de", "sonra") temizle. İkon: 🛒, Renk: #DCFCE7, Başlık: "Market Alışverişi".

3. ŞİVE TOLERANSI VE BOTANİK KURALI:
   - Yöresel ağızları ("suvarıver", "verive gari", "sulayuver") standart niyetle karşıla.
   - Çiçek sulama 11:00-17:00 arasına ASLA kurulmaz; yaprak yanmasını önlemek için AKŞAM SERİNLİĞİNE (19:30) ötele. Orkideyi sabah 09:30'a al.

4. HAVA DURUMU VE KOŞULLU TETİKLEYİCİLER:
   - Görev meteorolojik bir şarta bağlıysa ("yağmur yağarsa", "don olursa"):
     * "tetikleyici": { "tip": "hava", "sart": "yagmur" | "don", "aktif_mi": true }
     * Zaman metni: "Şart Gerçekleştiğinde".

5. EMANET, BORÇ VE ALACAK:
   - Biriyle paylaşılan eşya/para ("Ahmet'e lokma takımı verdim", "2000 TL borç verdim"):
     * Vade yoksa 14 gün sonrasına sessiz bir teyit görevi koy ("Emanet/Borç teslim alındı mı?").

6. EKSİK BİLGİ DİYALOG DÖNGÜSÜ (CLARIFICATION):
   - Kesin buluşma/randevu bildirilip gün/saat verilmediyse:
     * "eksik_bilgi": true
     * "netlestirme_sorusu": "Hangi gün ve saatte planlayalım?"
     * "tarih_iso": null
     * "sesli_fisilti": "Hangi gün ve saatte planlayalım?"

7. SESLİ FISILTI PROTOKOLÜ:
   - 'sesli_fisilti' alanında kulaklığa fısıldanacak sıcak, kısa (en fazla 1 cümle), robotik olmayan net teyit üret.

8. RENK PALETİ:
   - Yalnızca şu pastel renk kodlarından birini seç:
     #FEF3C7 (Sarı), #E0F2FE (Mavi), #DCFCE7 (Yeşil), #FEE2E2 (Kırmızı), #F3E8FF (Mor), #EDE9FE (Lila), #FEF08A (Not Sarısı), #FED7AA (Turuncu), #E2E8D5 (Haki), #CFFAFE (Camgöbeği), #F1F5F9 (Gri), #BFDBFE (Polis Mavisi).
${domainSlice}${langDirective}`;

  return { systemInstruction, cluster, detectedDomain };
}
