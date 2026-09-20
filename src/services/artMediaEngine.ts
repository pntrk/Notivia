// src/services/artMediaEngine.ts

import { matchShortScenario } from '../utils/scenarioDatabase.ts';

export interface ArtMediaTask {
  id: string;
  baslik: string;
  kategori:
    | 'Sinema & Dizi (Call Sheet & Çekim Planı)'
    | 'DIT & Kamera Veri Yedekleme'
    | 'Kurgu, Render & Broadcast Master (-23 LUFS)'
    | 'Renk Düzenleme (Color Grading) & LUT'
    | 'Konser, Soundcheck & Teknik Rider'
    | 'Müzik Dağıtımı, ISRC & Telif (MESAM/MSG)'
    | 'Stüdyo Fotoğrafı & RAW Retouch'
    | 'Sergi, Vernisaj & Fine Art Galeri'
    | 'Basın Bülteni & Medya Ambargosu'
    | 'Canlı Yayın, Reji Akışı (Rundown) & LiveU'
    | 'Tiyatro & Sahne Sanatları Genel Prova'
    | '5846 FSEK Telif & Eser Sahibi Sözleşmesi'
    | 'Senaryo, Tretman & Sinema Destekleme'
    | 'Film Festivali Başvurusu & DCP Paketleme'
    | 'Podcast & Sesli Kitap Prodüksiyonu'
    | 'VFX, Chroma Key & 3D CGI Çekimi'
    | 'Moda, Defile & Backstage Yönetimi'
    | 'RTÜK & Akıllı İşaretler Yayın Denetimi'
    | 'Reels, TikTok & Shorts (Kanca / Hook & Retention)'
    | 'Influencer & Sponsorlu İçerik (#İşbirliği Mevzuatı)'
    | 'Sosyal Medya Reklamı (Meta Ads, ROAS & Pixel)'
    | 'İçerik Takvimi, Prime Time & Carousel Tasarımı'
    | 'Sosyal Medya Kriz Yönetimi & Topluluk Moderasyonu'
    | 'YouTube Video SEO, Thumbnail & CTR Optimizasyonu'
    | 'Canlı Yayın (TikTok/IG/Twitch Live) & İnteraktif Etkileşim';
  mevzuat_notu: string;
  action_items: { task: string; is_completed: boolean }[];
  zaman_etiketi: string;
  tarih_iso: string | null;
  hazirlik_zamani?: string;
  ikon: string;
  renk: string;
  sesli_geribildirim: string;
  anomali_notu?: string;
}

/**
 * Sanat, Medya, Prodüksiyon ve Sahne Sanatları Bilişsel Motoru (Art & Media Cognitive Engine)
 * Sinema, Dizi, Televizyon, Kurgu/Montaj, Müzik, Fotoğrafçılık, Sahne Sanatları ve Basın/Yayıncılık
 */
export function parseArtMediaIntent(
  rawText: string,
  now: Date = new Date(),
  userDomain?: string
): ArtMediaTask | null {
  if (!rawText || typeof rawText !== 'string') return null;
  const text = rawText
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFC')
    .trim();

  // 0. HIZLI SENARYO VERİTABANI KONTROLÜ (matchShortScenario - SANAT_MEDYA)
  const shortMatch = matchShortScenario(rawText, 'SANAT_MEDYA');
  if (shortMatch && (shortMatch.domain === 'SANAT_MEDYA' || shortMatch.id.startsWith('sanat_') || shortMatch.id.startsWith('medya_'))) {
    return {
      id: `art_media_scenario_${Date.now()}`,
      baslik: shortMatch.baslik,
      kategori: 'Sinema & Dizi (Call Sheet & Çekim Planı)',
      mevzuat_notu: shortMatch.akilliFisilti || 'Sanat ve medya prodüksiyon standartlarına uygun iş akışı kurgulandı.',
      action_items: (shortMatch.oncedenYapilacaklar || []).map((t) => ({ task: t, is_completed: false })),
      zaman_etiketi: shortMatch.varsayilanZaman || 'Set Saati',
      tarih_iso: null,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      ikon: shortMatch.ikon || '🎬',
      renk: shortMatch.renk || '#FFE4E6',
      sesli_geribildirim: shortMatch.akilliFisilti || `${shortMatch.baslik} planlandı.`
    };
  }

  // 1. SET ÇAĞRISI / CALL SHEET, ÇEKİM PLANI & REJİ KOORDİNASYONU
  if (
    text.includes('call sheet') ||
    text.includes('callsheet') ||
    text.includes('çekim planı') ||
    text.includes('cekim plani') ||
    text.includes('set çağrısı') ||
    text.includes('set cagrisi') ||
    text.includes('çağrı kağıdı') ||
    text.includes('cagri kagidi') ||
    text.includes('klaket') ||
    (text.includes('set') && (text.includes('reji') || text.includes('çekim') || text.includes('sahne dökümü') || text.includes('oyuncu')))
  ) {
    const callDate = new Date(now);
    callDate.setHours(6, 30, 0, 0); // Standart sabah set çağrısı
    if (callDate.getTime() <= now.getTime()) {
      callDate.setDate(callDate.getDate() + 1);
    }

    return {
      id: `art_callsheet_${Date.now()}`,
      baslik: 'Günlük Call Sheet & Set Çekim Planı',
      kategori: 'Sinema & Dizi (Call Sheet & Çekim Planı)',
      mevzuat_notu: 'Prodüksiyon Standardı: Call sheet en geç çekimden önceki akşam 20:00\'de tüm ekibe dağıtılmalı; valilik/belediye çekim izinleri ve ambulans/itfaiye koordinasyonu sette hazır tutulmalıdır.',
      action_items: [
        { task: 'Günlük sahne numaraları, mekan adresleri, hava durumu ve hastane/acil iletişim bilgilerini call sheet\'e işle', is_completed: false },
        { task: 'Oyuncu saç, makyaj, kostüm hazırlık saatleri ve set çağrı (call time) saatlerini teyit et', is_completed: false },
        { task: 'Valilik/Belediye kamu alanı çekim izin belgesi ve jeneratör/park iznini prodüksiyon amirine imzalat', is_completed: false },
        { task: 'Kamera, ışık (gaffer), ses ve grip departmanlarına telsiz (walkie-talkie) kanal listesini dağıt', is_completed: false },
        { task: 'Catering, set su/çay istasyonu ve karavan hazır oluşunu T-1 saat önce kontrol et', is_completed: false }
      ],
      zaman_etiketi: 'Set Çağrısı: Sabah 06:30',
      tarih_iso: callDate.toISOString(),
      hazirlik_zamani: '45 dk önce',
      ikon: '🎬',
      renk: '#FFE4E6',
      sesli_geribildirim: 'Günlük call sheet ve set çekim planı hazırlandı. Telsiz kanalları, izinler ve oyuncu çağrı saatleri ajandaya alındı.'
    };
  }

  // 2. DIT (DIGITAL INTERMEDIATE TECHNICIAN), ÇİFT SSD YEDEKLEME & VERİ GÜVENLİĞİ
  if (
    text.includes('dit') ||
    text.includes('veri aktarımı') ||
    text.includes('veri aktarimi') ||
    text.includes('kart boşalt') ||
    text.includes('kart bosalt') ||
    text.includes('checksum') ||
    text.includes('yedekleme') && (text.includes('kamera') || text.includes('raw') || text.includes('ssd') || text.includes('çekim')) ||
    text.includes('timecode jam') ||
    text.includes('ses senkron')
  ) {
    return {
      id: `art_dit_${Date.now()}`,
      baslik: 'DIT Veri Aktarımı & Çift SSD Checksum Doğrulama',
      kategori: 'DIT & Kamera Veri Yedekleme',
      mevzuat_notu: 'Sinema ve Reklam Veri Güvenliği Protokolü: Kamera CFexpress/SD kartları kesinlikle çift harici RAID/NVMe SSD\'ye MD5/XXHash checksum doğrulaması tamamlanmadan silinemez veya formatlanamaz.',
      action_items: [
        { task: 'Kamera kartlarındaki RAW/ProRes görüntüleri Silverstack/ShotPut Pro ile çift SSD\'ye eşzamanlı kopyala', is_completed: false },
        { task: 'MD5 / XXHash checksum doğrulama raporunu kontrol et; bit-by-bit hata olmadığını doğrula', is_completed: false },
        { task: 'Ses kayıtçısı (WAV 24-bit 48kHz / 32-bit float) timecode eşleşmesini ve jam-sync doğruluğunu denetle', is_completed: false },
        { task: 'Yönetmen ve görüntü yönetmeni (DP) için günlük luts ve proxy (H.264/ProRes Proxy) dökümünü hazırla', is_completed: false },
        { task: 'Kamera asistanına format onay bandı vermeden önce kartın yedeklendiğini fiziksel etiketiyle mühürle', is_completed: false }
      ],
      zaman_etiketi: 'Set Bitimi & Kart Değişimi',
      tarih_iso: null,
      hazirlik_zamani: '15 dk önce',
      ikon: '💾',
      renk: '#FEE2E2',
      sesli_geribildirim: 'DIT veri yedekleme protokolü devrede. Çift SSD checksum doğrulaması yapılmadan kart formatlanamaz.'
    };
  }

  // 3. KURGU, RENDER & BROADCAST MASTER EXPORT (-23 LUFS / PRORES)
  if (
    text.includes('render') ||
    text.includes('export') ||
    text.includes('kurgu') ||
    text.includes('montaj') ||
    text.includes('broadcast master') ||
    text.includes('-23 lufs') ||
    text.includes('ebu r128') ||
    text.includes('premiere') ||
    text.includes('after effects') ||
    text.includes('final cut') ||
    text.includes('dcp master') ||
    text.includes('altyazı srt')
  ) {
    const renderDate = new Date(now);
    renderDate.setHours(19, 0, 0, 0);

    return {
      id: `art_render_${Date.now()}`,
      baslik: 'Kurgu Kapanışı & Broadcast Master Render (-23 LUFS)',
      kategori: 'Kurgu, Render & Broadcast Master (-23 LUFS)',
      mevzuat_notu: 'EBU R128 & RTÜK Yayın Standardı: Televizyon ve dijital yayınlarda entegre ses seviyesi -23 LUFS (±0.5 LUFS), maksimum True Peak -1 dBTP sınırında olmalıdır. Master video Apple ProRes 422 HQ / Rec.709 profiline tam uymalıdır.',
      action_items: [
        { task: 'Timeline\'daki tüm proxy medyaları kamera orijinal RAW dosyalarına relink (conform) et', is_completed: false },
        { task: 'Ses miksajını EBU R128 (-23 LUFS TV broadcast) veya -14 LUFS (Web/YouTube) standartlarında normalize et', is_completed: false },
        { task: 'Broadcast Safe renk filtresi uygulayarak luma (%0-100) ve kroma sınırlarının taşmadığını doğrula', is_completed: false },
        { task: 'Master export al: Apple ProRes 422 HQ / DNxHR + Clean Feed (yazısız) ve Texted (yazılı) versiyonlar', is_completed: false },
        { task: 'SRT / XML altyazı senkronunu ve 24fps / 25fps zaman kodu uyumluluğunu video üzerinde kontrol et', is_completed: false }
      ],
      zaman_etiketi: 'Akşam Render Kapanışı (19:00)',
      tarih_iso: renderDate.toISOString(),
      hazirlik_zamani: '30 dk önce',
      ikon: '🖥️',
      renk: '#F3E8FF',
      sesli_geribildirim: 'Kurgu render ve broadcast master protokolü açıldı. EBU R128 ses ve ProRes teslim kontrol adımları eklendi.'
    };
  }

  // 4. DA VINCI RESOLVE RENK DÜZENLEME (COLOR GRADING) & SHOW LUT
  if (
    text.includes('color grading') ||
    text.includes('renk düzenleme') ||
    text.includes('renk duzenleme') ||
    text.includes('davinci resolve') ||
    text.includes('davinci') ||
    text.includes('lut') ||
    text.includes('vectorscope') ||
    text.includes('cilt tonu') ||
    text.includes('colorist') ||
    text.includes('aces') ||
    text.includes('rec.709') ||
    text.includes('hdr grading')
  ) {
    return {
      id: `art_color_${Date.now()}`,
      baslik: 'DaVinci Resolve Renk Oturumu & LUT Doğrulama',
      kategori: 'Renk Düzenleme (Color Grading) & LUT',
      mevzuat_notu: 'Renk Standardizasyonu: Referans monitör kalibrasyonu (Calman / X-Rite) yapılmalı, ACES veya DaVinci YRGB Color Managed renk uzayı kullanılarak cilt tonu skintone line vektörskobunda sabitlenmelidir.',
      action_items: [
        { task: 'Kalibre edilmiş OLED/IPS referans monitöründe gri kart ve ColorChecker tablosunu doğrula', is_completed: false },
        { task: 'Proje renk yönetimini ACEScc veya DaVinci Wide Gamut / Intermediate olarak yapılandır', is_completed: false },
        { task: 'Sahneler arası pozlama ve beyaz dengesini (shot matching) eşitle; ten renklerini skintone line\'a hizala', is_completed: false },
        { task: 'Yönetmen ve görüntü yönetmeni onaylı Show LUT\'unu sahnelere kontrollü uygula', is_completed: false },
        { task: 'SDR (Rec.709 G2.4) ve HDR (PQ/HLG) teslim türevlerini ayrı ayrı kontrol edip export al', is_completed: false }
      ],
      zaman_etiketi: 'Renk Oturumu (Color Session)',
      tarih_iso: null,
      hazirlik_zamani: '20 dk önce',
      ikon: '🎨',
      renk: '#E0E7FF',
      sesli_geribildirim: 'Renk düzenleme ve color grading oturumu planlandı. Vektörskop ve ACES renk uzayı kontrolleri devrede.'
    };
  }

  // 5. KONSER, SOUNDCHECK & TEKNİK RIDER
  if (
    text.includes('soundcheck') ||
    text.includes('sound check') ||
    text.includes('teknik rider') ||
    text.includes('rider') && (text.includes('sahne') || text.includes('konser') || text.includes('müzik') || text.includes('ses')) ||
    text.includes('stage plot') ||
    text.includes('sahne planı') ||
    text.includes('sahne plani') ||
    text.includes('ses provası') ||
    text.includes('ses provasi') ||
    text.includes('konser') ||
    text.includes('in-ear') ||
    text.includes('telsiz frekans') ||
    text.includes('rf tarama')
  ) {
    const scDate = new Date(now);
    scDate.setHours(16, 0, 0, 0);

    return {
      id: `art_soundcheck_${Date.now()}`,
      baslik: 'Konser Soundcheck & Sahne Teknik Rider Kontrolü',
      kategori: 'Konser, Soundcheck & Teknik Rider',
      mevzuat_notu: 'Canlı Müzik & Sahne Standardı: Konser başlangıcından en geç 3 saat önce sahne kurulumu bitmeli; FOH mikser, in-ear monitör miksleri ve kablosuz mikrofon RF frekans taraması tamamlanmalıdır.',
      action_items: [
        { task: 'Teknik rider uyarınca FOH ve Monitör mikser kanal listesini (Patch List) mekana teyit ettir', is_completed: false },
        { task: 'Telsiz mikrofonlar ve in-ear sistemleri için RF taraması (RF scan) yaparak enterferanssız temiz frekans ata', is_completed: false },
        { task: 'Davul, bas, gitar, klavye ve vokallerin bağımsız monitör dengelerini müzisyenlerle tek tek doğrula', is_completed: false },
        { task: 'Sahne DI Box bağlantılarını, enstrüman pillerini ve yedek kablo/mikrofonları sahne amirine teslim et', is_completed: false },
        { task: 'Kapı açılışından 30 dk önce sahneyi temizleyip kulis (hospitality rider) ikram ve havlu kontrollerini bitir', is_completed: false }
      ],
      zaman_etiketi: 'Soundcheck: 16:00 (Kapı Öncesi)',
      tarih_iso: scDate.toISOString(),
      hazirlik_zamani: '45 dk önce',
      ikon: '🎙️',
      renk: '#CFFAFE',
      sesli_geribildirim: 'Konser soundcheck ve sahne teknik rider protokolü kaydedildi. RF frekans taraması ve kanal patch kontrolleri devrede.'
    };
  }

  // 6. DİJİTAL MÜZİK DAĞITIMI, ISRC KODU & TELİF (MESAM / MSG / MÜYAP)
  if (
    text.includes('isrc') ||
    text.includes('müzik dağıtım') ||
    text.includes('muzik dagitim') ||
    text.includes('mesam') ||
    text.includes('msg') && (text.includes('telif') || text.includes('müzik') || text.includes('eser')) ||
    text.includes('müyap') ||
    text.includes('muyap') ||
    text.includes('single lansman') ||
    text.includes('albüm lansman') ||
    text.includes('album lansman') ||
    text.includes('spotify pitch') ||
    text.includes('split sheet')
  ) {
    const distDate = new Date(now);
    distDate.setDate(distDate.getDate() + 21); // Dijital dağıtım için 3 hafta kuralı

    return {
      id: `art_music_dist_${Date.now()}`,
      baslik: 'Dijital Dağıtım, ISRC Kodlama & Telif Bildirimi',
      kategori: 'Müzik Dağıtımı, ISRC & Telif (MESAM/MSG)',
      mevzuat_notu: '5846 sayılı FSEK & Dijital Müzik Standardı: Parçaların Spotify/Apple Music editör listelerine girebilmesi için çıkış tarihinden en az 3-4 hafta önce ISRC ve UPC kodlarıyla dağıtıma iletilmesi; MESAM/MSG beyannamelerinin verilmesi gerekir.',
      action_items: [
        { task: 'Kültür Bakanlığı tescilli yapımcı kodu üzerinden parçaya özel ISRC kodu ve albüm UPC/EAN barkodu üret', is_completed: false },
        { task: 'Beste ve söz yazarları arasında imzalı Şarkı Payı Sözleşmesini (Split Sheet) hazırla ve taraflara imzalat', is_completed: false },
        { task: 'MESAM veya MSG sistemine eserin nota, söz ve hak sahipliği beyannamesini (Telif Tescili) gir', is_completed: false },
        { task: 'WAV 24-bit 44.1kHz master dosyasını ve 3000x3000px RGB kapak görselini dağıtıcıya (DistroKid/Believe vb.) yükle', is_completed: false },
        { task: 'Spotify for Artists paneli üzerinden editoryal çalma listesi öneri formunu (Pitch) doldur', is_completed: false }
      ],
      zaman_etiketi: 'Yayın Tarihinden 3 Hafta Önce',
      tarih_iso: distDate.toISOString(),
      hazirlik_zamani: '1 gün önce',
      ikon: '🎵',
      renk: '#FEE2E2',
      sesli_geribildirim: 'Dijital müzik dağıtımı, ISRC kodları ve MESAM/MSG telif tescil protokolü ajandaya alındı.'
    };
  }

  // 7. STÜDYO FOTOĞRAFI, DIŞ ÇEKİM & RAW RETOUCH TESLİMİ
  if (
    text.includes('fotoğraf çekimi') ||
    text.includes('fotograf cekimi') ||
    text.includes('stüdyo çekimi') ||
    text.includes('studyo cekimi') ||
    text.includes('retouch') ||
    text.includes('rötuş') ||
    text.includes('rotus') ||
    text.includes('lightroom') ||
    text.includes('photoshop') ||
    text.includes('deklanşör') ||
    text.includes('paraflaş') ||
    text.includes('colorchecker') ||
    text.includes('gri kart')
  ) {
    const photoDate = new Date(now);
    photoDate.setHours(10, 0, 0, 0);

    return {
      id: `art_photo_${Date.now()}`,
      baslik: 'Fotoğraf Çekimi & RAW Retouch Teslim Protokolü',
      kategori: 'Stüdyo Fotoğrafı & RAW Retouch',
      mevzuat_notu: 'Profesyonel Fotoğrafçılık Standardı: Çekim öncesi sensör tozu temizliği, çift kart yuvası (SD/CFexpress aynalama) ve stüdyo paraflaş tetikleyici pilleri test edilmeli; renk doğruluğu gri kartla kilitlenmelidir.',
      action_items: [
        { task: 'Kamera sensörünü f/16 diyafram testiyle toz kontrolünden geçir; lens optiklerini temizle', is_completed: false },
        { task: 'Kamera yuvalarını çift kart yedekli (Slot 1 RAW, Slot 2 Backup) formatlayıp hazırla', is_completed: false },
        { task: 'Işık kurulumunda ColorChecker veya %18 gri kart çekimi alarak özel beyaz ayarı profilini kaydet', is_completed: false },
        { task: 'Çekim biter bitmez fotoğrafları müşteri seçimi için düşük çözünürlüklü filigranlı proofing galerisine yükle', is_completed: false },
        { task: 'Seçilen kareleri Capture One / Photoshop ile cildin dokusunu bozmadan High-End Retouch yapıp teslim et', is_completed: false }
      ],
      zaman_etiketi: 'Çekim Günü: Sabah 10:00',
      tarih_iso: photoDate.toISOString(),
      hazirlik_zamani: '30 dk önce',
      ikon: '📸',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Stüdyo fotoğraf çekimi ve RAW retouch teslim adımları oluşturuldu. Gri kart ve çift hafıza kartı kontrolleri hazır.'
    };
  }

  // 8. SERGİ, VERNİSAJ & FINE ART BASKI / GALERİ AÇILIŞI
  if (
    text.includes('vernisaj') ||
    text.includes('sergi açılışı') ||
    text.includes('sergi acilisi') ||
    text.includes('galeri açılışı') ||
    text.includes('galeri acilisi') ||
    text.includes('küratör') ||
    text.includes('kurator') ||
    text.includes('fine art baskı') ||
    text.includes('fine art baski') ||
    text.includes('paspartu') ||
    text.includes('sanat eseri') ||
    text.includes('sergi') && (text.includes('davetiye') || text.includes('kokteyl') || text.includes('künye') || text.includes('baskı'))
  ) {
    const vernisajDate = new Date(now);
    vernisajDate.setHours(18, 30, 0, 0);

    return {
      id: `art_exhibition_${Date.now()}`,
      baslik: 'Sergi Açılışı, Vernisaj & Eser Künyeleri',
      kategori: 'Sergi, Vernisaj & Fine Art Galeri',
      mevzuat_notu: 'Galeri & Sanat Yönetimi Standardı: Eser künyeleri (sanatçı adı, teknik, boyut, edisyon no), küratör metni ve sigorta nakliye tutanakları eksiksiz olmalı; fine art baskılar asitsiz pamuklu kağıtta sergilenmelidir.',
      action_items: [
        { task: 'Eserlerin asitsiz pamuklu Fine Art (Giclée) baskı ve paspartu/çerçeve kalitesini büyüteçle denetle', is_completed: false },
        { task: 'Her eserin yanındaki duvara takılacak Türkçe/İngilizce eser künyesini ve fiyat/edisyon listesini hazırla', is_completed: false },
        { task: 'Galeri spot aydınlatmalarını eser üzerine 30-45 derece açıyla parlama yapmayacak şekilde ayarla', is_completed: false },
        { task: 'Koleksiyoner, basın ve sanat eleştirmenleri VIP davetli listesini ve kokteyl ikramını teyit et', is_completed: false },
        { task: 'Eser satış rezervasyon fişleri ve sergi kataloglarının resepsiyon masasında yerini almasını sağla', is_completed: false }
      ],
      zaman_etiketi: 'Vernisaj Akşamı: 18:30',
      tarih_iso: vernisajDate.toISOString(),
      hazirlik_zamani: '2 saat önce',
      ikon: '🖼️',
      renk: '#FEF08A',
      sesli_geribildirim: 'Sergi vernisajı ve galeri açılış protokolü planlandı. Eser künyeleri ve aydınlatma açıları kontrol listesine alındı.'
    };
  }

  // 9. BASIN BÜLTENİ DAĞITIMI, AMBARGO & MEDYA LİSTESİ
  if (
    text.includes('basın bülteni') ||
    text.includes('basin bulteni') ||
    text.includes('ambargo') ||
    text.includes('medya dağıtım') ||
    text.includes('medya dagitim') ||
    text.includes('basın toplantısı') ||
    text.includes('basin toplantisi') ||
    text.includes('röportaj') ||
    text.includes('roportaj') ||
    text.includes('tekzip')
  ) {
    const prDate = new Date(now);
    prDate.setHours(9, 30, 0, 0); // Sabah medya servis saati

    return {
      id: `art_pr_${Date.now()}`,
      baslik: 'Basın Bülteni Servisi & Ambargo Takibi',
      kategori: 'Basın Bülteni & Medya Ambargosu',
      mevzuat_notu: 'Medya İlişkileri Standardı: Basın bültenleri 5N1K kuralına uygun yazılmalı, haber ajansları (AA, DHA, İHA) ve gazete editörlerine ambargo saati büyük puntolarla kırmızı vurgulanarak servis edilmelidir.',
      action_items: [
        { task: 'Bülten metnini 5N1K formatında net başlık, spot ve iletişim kişisi (telefon/e-posta) ile finalize et', is_completed: false },
        { task: 'Yüksek çözünürlüklü yatay/dikey basın fotoğraflarını süresiz bulut linki (Google Drive/WeTransfer) olarak ekle', is_completed: false },
        { task: 'Eğer haber erken sızdırılmamalıysa metnin başına kırmızı "AMBARGOLUDUR: [Tarih/Saat] ÖNCESİ YAYINLANAMAZ" ibaresi koy', is_completed: false },
        { task: 'Güncel medya dağıtım listesine (Kültür-Sanat / Ekonomi / Magazin editörleri) bülteni sabah 09:30\'da gönder', is_completed: false },
        { task: 'Öğleden sonra medya takip merkezi (MTM/Ajans Press) üzerinden çıkan haber ve kupür taramasını başlat', is_completed: false }
      ],
      zaman_etiketi: 'Sabah Basın Servisi (09:30)',
      tarih_iso: prDate.toISOString(),
      hazirlik_zamani: '30 dk önce',
      ikon: '📰',
      renk: '#FED7AA',
      sesli_geribildirim: 'Basın bülteni ve ambargo takvimi kuruldu. 5N1K formatı ve medya dağıtım adımları ajandaya alındı.'
    };
  }

  // 10. CANLI YAYIN, REJİ AKIŞI (RUNDOWN) & LIVEU BAĞLANTISI
  if (
    text.includes('canlı yayın') ||
    text.includes('canli yayin') ||
    text.includes('reji akışı') ||
    text.includes('reji akisi') ||
    text.includes('rundown') ||
    text.includes('liveu') ||
    text.includes('tvu') ||
    text.includes('kj') ||
    text.includes('altyazı rejisi') ||
    text.includes('prompter') ||
    text.includes('spiker')
  ) {
    const liveDate = new Date(now);
    liveDate.setHours(19, 30, 0, 0);

    return {
      id: `art_live_${Date.now()}`,
      baslik: 'Canlı Yayın Reji Akışı (Rundown) & LiveU Bağlantısı',
      kategori: 'Canlı Yayın, Reji Akışı (Rundown) & LiveU',
      mevzuat_notu: 'Televizyon ve Canlı Yayın Protokolü: Yayın akışı (Rundown) saniye saniye planlanmalı, LiveU/TVU hücresel bağlantı gecikmesi (delay) test edilmeli ve KJ altyazıları hukuki incelemeden geçirilmelidir.',
      action_items: [
        { task: 'Haber/Program akış çizelgesini (Rundown) reji masası, yönetmen, teknik yönetmen ve spikere senkronize et', is_completed: false },
        { task: 'Canlı bağlantı noktasındaki LiveU/TVU cihazının 4G/5G hatlarını test et; yayın gecikmesini (delay) 1.5 sn altına sabitle', is_completed: false },
        { task: 'Spiker prompter metnini ve KJ (Karakter Jeneratörü / Alt yazı) yazımlarını imla ve hukuki açıdan denetle', is_completed: false },
        { task: 'Yaka mikrofonu pillerini sıfırla, stüdyo kulaklık (intercom) bağlantısını reji operatörleriyle teyit et', is_completed: false },
        { task: 'Yayına 5 dakika kala ana ve yedek video/ses kayıt cihazlarını (Master Rec) eşzamanlı başlat', is_completed: false }
      ],
      zaman_etiketi: 'Canlı Yayın Öncesi (T-30 Dk)',
      tarih_iso: liveDate.toISOString(),
      hazirlik_zamani: '45 dk önce',
      ikon: '📡',
      renk: '#FEE2E2',
      sesli_geribildirim: 'Canlı yayın reji akışı ve LiveU bağlantı kontrolü hazırlandı. Gecikme testi ve KJ kontrolleri devrede.'
    };
  }

  // 11. TİYATRO & SAHNE SANATLARI GENEL PROVA (DRESS REHEARSAL)
  if (
    text.includes('genel prova') ||
    text.includes('dress rehearsal') ||
    text.includes('tiyatro') ||
    text.includes('prömiyer') ||
    text.includes('promiyer') ||
    text.includes('suflör') ||
    text.includes('suflor') ||
    text.includes('ışık masası') ||
    text.includes('isik masasi') ||
    text.includes('cue') ||
    text.includes('oyun provası')
  ) {
    const rehearsalDate = new Date(now);
    rehearsalDate.setHours(19, 0, 0, 0);

    return {
      id: `art_theatre_${Date.now()}`,
      baslik: 'Tiyatro Genel Prova (Dress Rehearsal) & Işık/Ses Cueleri',
      kategori: 'Tiyatro & Sahne Sanatları Genel Prova',
      mevzuat_notu: 'Sahne Sanatları Standardı: Genel prova kesintisiz, gerçek sahne saatinde, tam kostüm, makyaj ve ışık/ses cueleriyle icra edilmeli; sahne amiri cue defterini finalize etmelidir.',
      action_items: [
        { task: 'Işık masası operatörü ile tüm sahne ışık geçişlerini (Cue listesi) saniyesine göre test et', is_completed: false },
        { task: 'Sahne arkası kostüm hızlı değişim (quick-change) alanını ve aksesuarların yerleşimini kontrol et', is_completed: false },
        { task: 'Suflör, reji asistanı ve sahne amiri telsiz bağlantılarını ve kulis anons sistemini doğrula', is_completed: false },
        { task: 'Oyun boyunca kesinti yapmadan baştan sona kronometreyle genel akışı tamamla', is_completed: false },
        { task: 'Prova bitiminde yönetmen notlarını (Director\'s notes) tüm oyuncu ve teknik ekiple sahnede değerlendir', is_completed: false }
      ],
      zaman_etiketi: 'Genel Prova: 19:00 (Perde)',
      tarih_iso: rehearsalDate.toISOString(),
      hazirlik_zamani: '1 saat önce',
      ikon: '🎭',
      renk: '#EDE9FE',
      sesli_geribildirim: 'Tiyatro genel provası ve sahne ışık/ses cue listesi hazırlandı. Kesintisiz akış ve kostüm adımları ajandada.'
    };
  }

  // 12. 5846 SAYILI FSEK TELİF, MUVAFAKATNAME & ESER SAHİBİ SÖZLEŞMESİ
  if (
    text.includes('fsek') ||
    text.includes('telif sözleşmesi') ||
    text.includes('telif sozlesmesi') ||
    text.includes('muvafakatname') && (text.includes('oyuncu') || text.includes('görüntü') || text.includes('ses') || text.includes('eser')) ||
    text.includes('eser sahibi') ||
    text.includes('mali hak devri') ||
    text.includes('telif hakkı') ||
    text.includes('telif hakki')
  ) {
    return {
      id: `art_copyright_${Date.now()}`,
      baslik: '5846 Sayılı FSEK Telif & Mali Hak Devir Sözleşmesi',
      kategori: '5846 FSEK Telif & Eser Sahibi Sözleşmesi',
      mevzuat_notu: '5846 sayılı Fikir ve Sanat Eserleri Kanunu (FSEK) m. 52 uyarınca mali haklara (işleme, çoğaltma, yayma, temsil, umuma iletim) ilişkin sözleşmelerin yazılı olması ve devredilen hakların tek tek açıkça sayılması zorunludur.',
      action_items: [
        { task: 'FSEK m. 52 uyarınca işleme, çoğaltma, yayma, temsil ve umuma iletim haklarını sözleşmede ayrı ayrı belirt', is_completed: false },
        { task: 'Sözleşmenin coğrafi yer (dünya çapında), süre ve mecra (dijital, TV, sinema, VOD) kapsamını netleştir', is_completed: false },
        { task: 'Oyuncu, seslendirmen ve model muvafakatnamelerini (Görsel ve İşitsel Hak İzni) çekimden önce ıslak imzalat', is_completed: false },
        { task: 'Eser sahipliği (yönetmen, senarist, besteci, diyalog yazarı) mali hak devir belgelerini noter tasdikli arşivle', is_completed: false },
        { task: 'Kültür ve Turizm Bakanlığı Telif Hakları Genel Müdürlüğü kayıt-tescil belgesini dosyalayarak sakla', is_completed: false }
      ],
      zaman_etiketi: 'Sözleşme Kapanışı (Hukuki İnceleme)',
      tarih_iso: null,
      hazirlik_zamani: '1 gün önce',
      ikon: '📜',
      renk: '#E0E7FF',
      sesli_geribildirim: '5846 sayılı FSEK telif ve mali hak devir protokolü oluşturuldu. Yasal sözleşme şartları hazırlandı.'
    };
  }

  // 13. SENARYO, TRETMAN & KÜLTÜR BAKANLIĞI SİNEMA GENEL MÜDÜRLÜĞÜ DESTEK BAŞVURUSU
  if (
    text.includes('senaryo') ||
    text.includes('tretman') ||
    text.includes('sinopsis') ||
    text.includes('logline') ||
    text.includes('sinema genel müdürlüğü') ||
    text.includes('sinema genel mudurlugu') ||
    text.includes('sinema destekleme') ||
    text.includes('bakanlık destek') ||
    text.includes('bakanlik destek')
  ) {
    const deadline = new Date(now);
    deadline.setDate(deadline.getDate() + 14);

    return {
      id: `art_screenplay_${Date.now()}`,
      baslik: 'Senaryo, Tretman & Kültür Bakanlığı Destek Başvurusu',
      kategori: 'Senaryo, Tretman & Sinema Destekleme',
      mevzuat_notu: '5224 Sayılı Sinema Filmlerinin Değerlendirilmesi ve Sınıflandırılması ile Desteklenmesi Kanunu: Başvurularda standart Courier 12pt Amerikan formatı senaryo, bütçe tablosu, yönetmen vizyonu ve yerli yapım uygunluk beyanı aranır.',
      action_items: [
        { task: 'Senaryoyu uluslararası standartta (Courier 12pt, sahne başlıkları EXT/INT, karakter ve diyalog marjları) formatla', is_completed: false },
        { task: 'Tek sayfalık logline, 2 sayfalık sinopsis ve 15-20 sayfalık ayrıntılı tretman metnini finalize et', is_completed: false },
        { task: 'Yönetmenin sanatsal yaklaşımını (Director\'s Vision & Moodboard) ve renk/kamera paleti dosyasını hazırla', is_completed: false },
        { task: 'Sinema Genel Müdürlüğü resmi bütçe şablonuna (pre-prodüksiyon, prodüksiyon, post) göre yapım bütçesi çıkar', is_completed: false },
        { task: 'E-Devlet / Sinema Portalı üzerinden başvuru formunu ve yapımcı-yönetmen sözleşmelerini sisteme yükle', is_completed: false }
      ],
      zaman_etiketi: 'Bakanlık Başvuru Takvimi',
      tarih_iso: deadline.toISOString(),
      hazirlik_zamani: '3 gün önce',
      ikon: '📑',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Sinema destek başvuru ve senaryo/tretman kontrol protokolü hazırlandı.'
    };
  }

  // 14. FİLM FESTİVALİ BAŞVURUSU & DCP PAKETLEME (FilmFreeway, Altın Portakal, İKSV vb.)
  if (
    text.includes('dcp') ||
    text.includes('filmfreeway') ||
    text.includes('film festivali') ||
    text.includes('festival başvuru') ||
    text.includes('festival basvuru') ||
    text.includes('kdm') ||
    text.includes('epk') ||
    text.includes('press kit') ||
    text.includes('altın portakal') ||
    text.includes('altin portakal') ||
    text.includes('iksv')
  ) {
    const festDate = new Date(now);
    festDate.setDate(festDate.getDate() + 7);

    return {
      id: `art_fest_dcp_${Date.now()}`,
      baslik: 'Film Festivali Başvurusu, EPK & DCI DCP Paketleme',
      kategori: 'Film Festivali Başvurusu & DCP Paketleme',
      mevzuat_notu: 'DCI (Digital Cinema Initiatives) Standardı: Sinema salonu gösterimleri için SMPTE/InterOP uyumlu 2K/4K DCI DCP paketlenmeli, 24fps kare hızı kilitlenmeli, KDM şifreleme ve İngilizce altyazı timecode senkronu test edilmelidir.',
      action_items: [
        { task: 'Filmi DCI uyumlu (24.00 fps, XYZ renk uzayı, DCI 2K/4K Flat veya Scope) DCP formatında paketle', is_completed: false },
        { task: 'DCP paketini sinema sunucusunda veya yazılımsal DCI oynatıcıda (DCP-o-matic / EasyDCP) baştan sona test et', is_completed: false },
        { task: 'Timecode gömülü İngilizce diyalog altyazılarını (DCP XML / CineCanvas) sahne geçişlerine göre senkronla', is_completed: false },
        { task: 'Elektronik Basın Kiti (EPK): Yüksek çözünürlüklü afiş (300 DPI), set fotoğrafları ve yönetmen biyografisini hazırla', is_completed: false },
        { task: 'FilmFreeway veya festival portalına şifreli vimeo linki, trailer ve festival teknik formunu yükle', is_completed: false }
      ],
      zaman_etiketi: 'Festival Erken Başvuru Tarihi',
      tarih_iso: festDate.toISOString(),
      hazirlik_zamani: '2 gün önce',
      ikon: '🏆',
      renk: '#FEF08A',
      sesli_geribildirim: 'Film festivali başvurusu, EPK basın kiti ve DCI DCP paketleme adımları ajandaya alındı.'
    };
  }

  // 15. PODCAST & SESLİ KİTAP PRODÜKSİYONU (ACX / Audible / Spotify Standardı)
  if (
    text.includes('podcast') ||
    text.includes('sesli kitap') ||
    text.includes('audible') ||
    text.includes('acx') ||
    text.includes('dublaj') ||
    text.includes('seslendirme') ||
    text.includes('de-esser') ||
    text.includes('noise floor') ||
    text.includes('id3 tag')
  ) {
    const podDate = new Date(now);
    podDate.setHours(podDate.getHours() + 4);

    return {
      id: `art_podcast_${Date.now()}`,
      baslik: 'Podcast & Sesli Kitap Prodüksiyonu (ACX / EBU Standardı)',
      kategori: 'Podcast & Sesli Kitap Prodüksiyonu',
      mevzuat_notu: 'ACX/Audible & Spotify Podcast Standardı: Entegre RMS -23 dB ile -18 dB arasında olmalı, True Peak en fazla -3.0 dBTP seviyesini aşmamalı, gürültü tabanı (noise floor) -60 dBFS altında kalmalıdır.',
      action_items: [
        { task: 'Mikrofon kaydında patlama (Plosive) ve ağız şapırtılarını De-Click ve Pop-Filter ile filtrele', is_completed: false },
        { task: 'Diyalog kanalına De-Esser uygulayarak tiz sibilans patlamalarını (5-8 kHz) yumuşat', is_completed: false },
        { task: 'Oda gürültüsünü (Noise Floor) spectral de-noise ile -60 dBFS altına indir; sessiz bölümlerde room tone kullan', is_completed: false },
        { task: 'Genel ses çıkışını ACX / Audible kuralına göre RMS -20 dB ve True Peak -3 dBTP sınırında kitle', is_completed: false },
        { task: 'Bölüm kapak görselini 3000x3000px RGB ve ID3v2 metadata etiketlerini (bölüm no, başlık, yazar) eksiksiz yaz', is_completed: false }
      ],
      zaman_etiketi: 'Ses Prodüksiyon Teslimi',
      tarih_iso: podDate.toISOString(),
      hazirlik_zamani: '1 saat önce',
      ikon: '🎙️',
      renk: '#CFFAFE',
      sesli_geribildirim: 'Podcast ve sesli kitap prodüksiyonu ACX ve -60dB noise floor standardına göre planlandı.'
    };
  }

  // 16. VFX, CHROMA KEY (YEŞİL PERDE) & 3D CGI ÇEKİMİ
  if (
    text.includes('greenbox') ||
    text.includes('green box') ||
    text.includes('chroma key') ||
    text.includes('chromakey') ||
    text.includes('yeşil perde') ||
    text.includes('yesil perde') ||
    text.includes('vfx') ||
    text.includes('camera tracking') ||
    text.includes('hdri') ||
    text.includes('krom top')
  ) {
    const vfxDate = new Date(now);
    vfxDate.setHours(9, 0, 0, 0);

    return {
      id: `art_vfx_${Date.now()}`,
      baslik: 'VFX, Chroma Key & Camera Tracking Çekim Protokolü',
      kategori: 'VFX, Chroma Key & 3D CGI Çekimi',
      mevzuat_notu: 'Görsel Efekt (VFX) & Kompozit Standardı: Yeşil perde aydınlatması dalga formu (waveform) üzerinde homojen (±0.5 stop) olmalı, oyuncu üzerine yeşil yansıma (green spill) engellenmeli ve lens ızgarası çekilmelidir.',
      action_items: [
        { task: 'Yeşil perde fon aydınlatmasını spotmetre veya dalga formuyla (Waveform) tamamen homojen ayarla', is_completed: false },
        { task: 'Oyuncu ile yeşil perde arasına en az 2-3 metre mesafe koyarak arka ışıkla (rim light) green spill sızıntısını kes', is_completed: false },
        { task: '3D kamera takibi (Matchmove) için perdeye yüksek kontrastlı X veya + tracking marker bantları yerleştir', is_completed: false },
        { task: 'Her lens değişiminde VFX lens distorsiyon ızgarasını (Lens Grid Chart) düz açıdan çekerek arşivle', is_completed: false },
        { task: 'Sahne merkezinde krom/gri top ve 360° balıkgözü HDRI braket çekimi alarak CGI ışıklandırma referansı kaydet', is_completed: false }
      ],
      zaman_etiketi: 'VFX Set Çekim Saati',
      tarih_iso: vfxDate.toISOString(),
      hazirlik_zamani: '45 dk önce',
      ikon: '🟩',
      renk: '#DCFCE7',
      sesli_geribildirim: 'VFX ve Chroma Key yeşil perde çekim protokolü oluşturuldu. Homojen ışık ve tracking adımları devrede.'
    };
  }

  // 17. MODA, DEFİLE & BACKSTAGE YÖNETİMİ
  if (
    text.includes('defile') ||
    text.includes('podyum') ||
    text.includes('backstage') ||
    text.includes('lookbook') ||
    text.includes('model kadrosu') ||
    text.includes('koleksiyon sunumu')
  ) {
    const fashionDate = new Date(now);
    fashionDate.setHours(17, 0, 0, 0);

    return {
      id: `art_fashion_${Date.now()}`,
      baslik: 'Moda Defilesi, Backstage & Podyum Akış Yönetimi',
      kategori: 'Moda, Defile & Backstage Yönetimi',
      mevzuat_notu: 'Moda & Sahne Prodüksiyonu: Model giyinme sırası (line-up), lookbook numaraları, hızlı değişim (quick-change) kabinleri ve podyum ışık-müzik cueleri saniyesine göre senkronize edilmelidir.',
      action_items: [
        { task: 'Model çıkış sırasını (Line-up) ve her modele ait lookbook fotoğraflı giysi askılarını numaralandır', is_completed: false },
        { task: 'Backstage saç ve makyaj ekibi için model başı zaman çizelgesini (slot) denetle', is_completed: false },
        { task: 'Podyum U-turn dönüş noktalarında zemin kaymazlık bandı ve aydınlatma renk sıcaklığı (5600K gün ışığı) testini yap', is_completed: false },
        { task: 'Podyum yürüyüş temposuna göre DJ müzik geçişleri ve final selamlaması (Finale walk) provasını tamamla', is_completed: false },
        { task: 'Basın ve foto-muhabir pit alanı akreditasyon kartlarını ve açılarını kontrol et', is_completed: false }
      ],
      zaman_etiketi: 'Defile Başlangıcı (17:00)',
      tarih_iso: fashionDate.toISOString(),
      hazirlik_zamani: '2 saat önce',
      ikon: '👗',
      renk: '#FCE7F3',
      sesli_geribildirim: 'Moda defilesi ve backstage line-up akışı planlandı. Lookbook ve podyum kontrolleri hazır.'
    };
  }

  // 18. RTÜK & AKILLI İŞARETLER YAYIN DENETİMİ
  if (
    text.includes('rtük') ||
    text.includes('rtuk') ||
    text.includes('akıllı işaret') ||
    text.includes('akilli isaret') ||
    text.includes('ürün yerleştirme') ||
    text.includes('urun yerlestirme') ||
    text.includes('mozaikleme') ||
    text.includes('koruyucu sembol')
  ) {
    return {
      id: `art_rtuk_${Date.now()}`,
      baslik: 'RTÜK Yayın İlkeleri & Akıllı İşaretler Denetimi',
      kategori: 'RTÜK & Akıllı İşaretler Yayın Denetimi',
      mevzuat_notu: '6112 Sayılı Radyo ve Televizyonların Kuruluş ve Yayın Hizmetleri Hakkında Kanun: Yayın öncesinde koruyucu sembol sistemi (Genel İzleyici, 7+, 13+, Şiddet/Korku, Olumsuz Örnek) ve ticari iletişim uyarıları zorunludur.',
      action_items: [
        { task: 'Yayın içeriğini analiz ederek yaş sınıflandırmasını (Genel İzleyici, 7+, 13+, 18+) ve içerik ikonlarını belirle', is_completed: false },
        { task: 'Program başında ve her reklam kuşağı dönüşünde koruyucu sembol logosunu ekranda en az 5 saniye tut', is_completed: false },
        { task: 'Ürün yerleştirme bulunan yapımlarda program başında ve sonunda "Bu programda ürün yerleştirme bulunmaktadır" logosunu yerleştir', is_completed: false },
        { task: 'Tütün, alkol, şiddet ve marka logolarının hukuki mozaikleme kontrollerini timecode bazında tara', is_completed: false },
        { task: 'RTÜK sayısal yayın arşivleme kopyasını yayın tarih ve saat damgasıyla yedekle', is_completed: false }
      ],
      zaman_etiketi: 'Yayın Öncesi Hukuki Onay',
      tarih_iso: null,
      hazirlik_zamani: 'Yayın öncesi',
      ikon: '📺',
      renk: '#FEE2E2',
      sesli_geribildirim: '6112 sayılı RTÜK yayın ilkeleri ve akıllı işaretler uyum kontrolü oluşturuldu.'
    };
  }

  // 19. REELS, TIKTOK & SHORTS (KANCA / HOOK & RETENTION & 9:16 DİKEY VİDEO)
  if (
    text.includes('reels') ||
    text.includes('tiktok') ||
    text.includes('shorts') ||
    text.includes('kanca') ||
    text.includes('hook') ||
    text.includes('retention') ||
    text.includes('dikey video') ||
    text.includes('trend ses') ||
    text.includes('auto caption') ||
    text.includes('dinamik altyazı')
  ) {
    const reelsDate = new Date(now);
    reelsDate.setHours(19, 0, 0, 0);

    return {
      id: `art_reels_tiktok_${Date.now()}`,
      baslik: 'Reels, TikTok & Shorts Kanca (Hook) & Retention Optimizasyonu',
      kategori: 'Reels, TikTok & Shorts (Kanca / Hook & Retention)',
      mevzuat_notu: 'Sosyal Medya Algoritma & Tutundurma Standardı: İlk 3 saniyede izleyiciyi yakalayan görsel/metinsel kanca (Hook), 1080x1920 9:16 format, hızlı kesmeler (jump-cut) ve platform içi trend lisanslı ses kullanımı erişimi %300 artırır.',
      action_items: [
        { task: 'İlk 0-3 saniyeye merak uyandıran güçlü metinsel veya görsel kanca (Hook) yerleştir', is_completed: false },
        { task: 'Dikey 9:16 (1080x1920 px, 60fps) formatta alt ve üst UI butonlarını kapatmayacak safe zone sınırlarına uy', is_completed: false },
        { task: 'Sessiz izleyenler için CapCut / Premiere ile kelime vurgulu dinamik renkli altyazı (Auto-Captions) ekle', is_completed: false },
        { task: 'Platform içi trend olan telifsiz/ticari lisanslı arka plan müziğini (Trending Audio) bağla', is_completed: false },
        { task: 'Videonun sonuna yorum veya kaydetme tetikleyen net bir eylem çağrısı (CTA - Call to Action) koy', is_completed: false }
      ],
      zaman_etiketi: 'Prime Time Paylaşım Saati (19:00 - 21:00)',
      tarih_iso: reelsDate.toISOString(),
      hazirlik_zamani: '1 saat önce',
      ikon: '📱',
      renk: '#FFE4E6',
      sesli_geribildirim: 'Reels, TikTok ve Shorts kanca ve retention optimizasyonu hazırlandı. 9:16 ve altyazı kontrolleri devrede.'
    };
  }

  // 20. INFLUENCER & SPONSORLU İÇERİK (#İŞBİRLİĞİ TİCARET BAKANLIĞI MEVZUATI)
  if (
    text.includes('influencer') ||
    text.includes('işbirliği') ||
    text.includes('isbirligi') ||
    text.includes('#işbirliği') ||
    text.includes('#isbirligi') ||
    text.includes('sponsorlu') ||
    text.includes('ürün tanıtımı') ||
    text.includes('urun tanitimi') ||
    text.includes('hediye ürün') ||
    text.includes('affiliate') ||
    text.includes('link kaydır')
  ) {
    return {
      id: `art_influencer_${Date.now()}`,
      baslik: 'Influencer Sponsorluk & Ticaret Bakanlığı #İşbirliği Protokolü',
      kategori: 'Influencer & Sponsorlu İçerik (#İşbirliği Mevzuatı)',
      mevzuat_notu: 'Ticaret Bakanlığı Sosyal Medya Etkileyicileri Kılavuzu: Paylaşımlarda #işbirliği, #reklam veya #ortaklık etiketi ilk bakışta açıkça görülebilir olmalı, filtre/efekt ile yanıltıcı sonuç gösterilmemeli ve hediye/deneyim ürünleri açıkça belirtilmelidir.',
      action_items: [
        { task: 'Story veya post metninin en başına/üzerine okunabilir puntoda "#işbirliği" veya "#reklam" etiketini ekle', is_completed: false },
        { task: 'İçerikte kozmetik veya estetik ürün tanıtılıyorsa güzellik filtresi kullanılmadığını veya filtre adını belirt', is_completed: false },
        { task: 'Hediye gönderilen ürün veya ücretsiz davetlerde "#Hediye" veya "#Davet" açıklamasını şeffafça yaz', is_completed: false },
        { task: 'Sağlık beyanı içeren ifadelerden (hastalık tedavi eder, kesin zayıflatır vb.) hukuken kesinlikle kaçın', is_completed: false },
        { task: 'Marka onaylı briefe uygun swipe-up / bio link ve UTM takip parametreli kampanya kodunu entegre et', is_completed: false }
      ],
      zaman_etiketi: 'Sponsorlu Paylaşım Onayı',
      tarih_iso: null,
      hazirlik_zamani: 'Paylaşım öncesi',
      ikon: '🤝',
      renk: '#FEF3C7',
      sesli_geribildirim: 'Ticaret Bakanlığı kılavuzuna uygun #işbirliği ve sponsorlu içerik mevzuat kontrolü tamamlandı.'
    };
  }

  // 21. SOSYAL MEDYA REKLAMI (META ADS, ROAS, PIXEL & CONVERSIONS API)
  if (
    text.includes('meta ads') ||
    text.includes('facebook reklam') ||
    text.includes('instagram reklam') ||
    text.includes('tiktok ads') ||
    text.includes('roas') ||
    text.includes('ctr') ||
    text.includes('cpc') ||
    text.includes('pixel') ||
    text.includes('reklam bütçesi') ||
    text.includes('lookalike') ||
    text.includes('retargeting')
  ) {
    return {
      id: `art_social_ads_${Date.now()}`,
      baslik: 'Meta & TikTok Ads Kampanya, ROAS & Piksel Optimizasyonu',
      kategori: 'Sosyal Medya Reklamı (Meta Ads, ROAS & Pixel)',
      mevzuat_notu: 'Dijital Performans Pazarlama: Meta Pixel & Conversions API (CAPI) ile sunucu taraflı dönüşüm takibi, A/B kreatif testi (Hook vs Thumbnail) ve minimum 3.0+ ROAS hedefli bütçe optimizasyonu (CBO/ABO) esastır.',
      action_items: [
        { task: 'Meta Pixel ve CAPI (Conversions API) dönüşüm olaylarını (Purchase / Lead / AddToCart) doğrula', is_completed: false },
        { task: 'En az 3 farklı kreatif varyasyonu (UGC video, tek görsel, carousel) ile A/B test reklam seti kur', is_completed: false },
        { task: 'Hedef kitle segmentasyonu: Sıcak kitleye Retargeting, soğuk kitleye %1-2 Lookalike benzer kitle ata', is_completed: false },
        { task: 'Kampanya bütçesi optimizasyonunda (CBO) günlük harcama ve hedef ROAS / EBM (CPA) eşiklerini ayarla', is_completed: false },
        { task: 'Reklam metinlerinde yüksek CTR tetikleyen kanca başlık ve CTA yönlendirme butonunu kitle', is_completed: false }
      ],
      zaman_etiketi: 'Reklam Kampanyası Başlatma',
      tarih_iso: null,
      hazirlik_zamani: 'Kampanya öncesi',
      ikon: '📈',
      renk: '#DCFCE7',
      sesli_geribildirim: 'Meta Ads ve TikTok reklam kampanyası ROAS ve piksel takip parametreleriyle yapılandırıldı.'
    };
  }

  // 22. İÇERİK TAKVİMİ, PRIME TIME & CAROUSEL TASARIMI
  if (
    text.includes('içerik takvimi') ||
    text.includes('icerik takvimi') ||
    text.includes('prime time') ||
    text.includes('carousel') ||
    text.includes('kaydırmalı post') ||
    text.includes('kaydirmali post') ||
    text.includes('grid planı') ||
    text.includes('sosyal medya planı') ||
    text.includes('sosyal medya plani')
  ) {
    return {
      id: `art_content_calendar_${Date.now()}`,
      baslik: 'Aylık İçerik Takvimi, Carousel & Prime Time Dağıtımı',
      kategori: 'İçerik Takvimi, Prime Time & Carousel Tasarımı',
      mevzuat_notu: 'Sosyal Medya Yayıncılığı: Platform bazlı prime-time saatleri (Instagram 19:30-21:00, LinkedIn 08:30-10:00, X anlık gündem), 1080x1350 px 4:5 dikey post formatı ve kaydırma tetikleyici carousel okları etkileşimi maksimize eder.',
      action_items: [
        { task: 'Haftalık/Aylık içerik sütunlarını (Eğitici, İlham Verici, Ürün/Hizmet, Eğlence) takvime dağıt', is_completed: false },
        { task: 'Carousel (Kaydırmalı) postları 1080x1350 px (4:5 dikey) oranında tasarlayarak son slayta kaydetme CTA\'sı koy', is_completed: false },
        { task: 'Instagram prime-time (19:30), LinkedIn iş saatleri (08:45) için otomatik planlama araçlarına (Buffer/Later/Meta Suite) gir', is_completed: false },
        { task: 'Her görsel altına okunabilir paragraflar, boşluklar ve 3-5 adet niş hashtag ekle', is_completed: false },
        { task: 'Profil grid düzeninin renk ve tipografi bütünlüğünü önizleme (preview) ile kontrol et', is_completed: false }
      ],
      zaman_etiketi: 'Haftalık İçerik Planlama',
      tarih_iso: null,
      hazirlik_zamani: 'Pazar akşamı',
      ikon: '🗓️',
      renk: '#E0F2FE',
      sesli_geribildirim: 'İçerik takvimi ve carousel paylaşım planı prime time saatlerine göre hazırlandı.'
    };
  }

  // 23. SOSYAL MEDYA KRİZ YÖNETİMİ & TOPLULUK MODERASYONU
  if (
    text.includes('linç') ||
    text.includes('linc') ||
    text.includes('sosyal medya kriz') ||
    text.includes('negatif yorum') ||
    text.includes('troll saldırısı') ||
    text.includes('bot saldırısı') ||
    text.includes('topluluk yönetimi') ||
    text.includes('moderasyon') ||
    text.includes('kara liste')
  ) {
    return {
      id: `art_social_crisis_${Date.now()}`,
      baslik: 'Sosyal Medya Kriz Yönetimi & Topluluk Moderasyonu',
      kategori: 'Sosyal Medya Kriz Yönetimi & Topluluk Moderasyonu',
      mevzuat_notu: 'Sosyal Medya İtibar & Kriz Protokolü: Negatif PR veya linç durumlarında ilk 15 dakikada resmi duruş (holding statement) yayımlanmalı, yorumlar silinmeden hukuki sınırlar ve kara liste filtreleriyle sakin, kurumsal tonda yönetilmelidir.',
      action_items: [
        { task: 'Yorum filtreleme ayarlarına küfür, hakaret ve manipülatif anahtar kelimeleri kara liste (Blacklist) olarak ekle', is_completed: false },
        { task: 'Kriz anında planlanmış olan tüm neşeli/otomatik reklam ve story paylaşımlarını derhal durdur (Pause)', is_completed: false },
        { task: 'Hukuk ve PR departmanı onaylı resmi açıklama metnini (Holding Statement) hazırlayıp sabitle (Pin)', is_completed: false },
        { task: 'Haklı tüketici şikayetlerine DM üzerinden 15 dakika içinde çözüm odaklı kurumsal dönüş yap', is_completed: false },
        { task: 'Sosyal medya takip ve duygu analizi (Sentiment Analysis) ile krizin yayılma hızını saatlik raporla', is_completed: false }
      ],
      zaman_etiketi: 'Acil Kriz Müdahalesi (İlk 15 Dk)',
      tarih_iso: null,
      hazirlik_zamani: 'Derhal',
      ikon: '🛡️',
      renk: '#FEE2E2',
      sesli_geribildirim: 'Sosyal medya kriz yönetimi devrede. Otomatik paylaşımlar durduruldu ve moderasyon protokolü açıldı.'
    };
  }

  // 24. YOUTUBE VİDEO SEO, THUMBNAIL & CTR OPTİMİZASYONU
  if (
    text.includes('youtube') ||
    text.includes('thumbnail') ||
    text.includes('kapak fotoğrafı') ||
    text.includes('kapak fotografi') ||
    text.includes('youtube seo') ||
    text.includes('video açıklaması') ||
    text.includes('video aciklamasi') ||
    text.includes('chapters') ||
    text.includes('end screen')
  ) {
    return {
      id: `art_youtube_seo_${Date.now()}`,
      baslik: 'YouTube Video SEO, Thumbnail (CTR) & Bölüm (Chapters) Optimizasyonu',
      kategori: 'YouTube Video SEO, Thumbnail & CTR Optimizasyonu',
      mevzuat_notu: 'YouTube Algoritma & Arama Optimizasyonu: 1280x720 px yüksek kontrastlı thumbnail ile >%8 CTR hedefi, ilk 30 saniye kancası, timecode gömülü video bölümleri (Chapters) ve kart/bitiş ekranı entegrasyonu.',
      action_items: [
        { task: 'Yüksek kontrastlı, büyük yüz ifadeli ve maksimum 3 kelimeli Thumbnail (1280x720 px) tasarla', is_completed: false },
        { task: 'Açıklama kutusuna timecode tabanlı bölümleri (00:00 Giriş, 02:15 Detay...) ekleyerek Chapters özelliğini aç', is_completed: false },
        { task: 'Video başlığını arama hacmi yüksek anahtar kelimeler ve merak unsuru ile optimize et', is_completed: false },
        { task: 'Videonun son 20 saniyesine Bitiş Ekranı (End Screen) ve ilgili oynatma listesi kartlarını yerleştir', is_completed: false },
        { task: 'Video etiketlerine (Tags) ve açıklamaya sponsorluk/bağlantı linklerini UTM etiketleriyle gir', is_completed: false }
      ],
      zaman_etiketi: 'Video Yayına Alma Saati',
      tarih_iso: null,
      hazirlik_zamani: 'Yayından 2 saat önce',
      ikon: '🔴',
      renk: '#FEE2E2',
      sesli_geribildirim: 'YouTube video SEO, thumbnail CTR ve Chapters bölümleme kontrolleri hazırlandı.'
    };
  }

  // 25. CANLI YAYIN (TIKTOK LIVE, IG LIVE, TWITCH) & ETKİLEŞİM
  if (
    text.includes('tiktok live') ||
    text.includes('instagram live') ||
    text.includes('twitch') ||
    text.includes('kick') ||
    text.includes('canlı yayın sohbet') ||
    text.includes('yayıncı') ||
    text.includes('stream key') ||
    text.includes('obs studio') ||
    text.includes('hediye hedefi')
  ) {
    return {
      id: `art_social_stream_${Date.now()}`,
      baslik: 'Sosyal Medya Canlı Yayını (OBS / Live Stream & İnteraktif Sohbet)',
      kategori: 'Canlı Yayın (TikTok/IG/Twitch Live) & İnteraktif Etkileşim',
      mevzuat_notu: 'Canlı Yayın & İnteraktif Etkileşim: Dikey/yatay stream key bağlantısı, moderatör ataması, canlı anket ve Q&A sabitleme ile izleyici tutundurma yönetimi.',
      action_items: [
        { task: 'OBS / Streamlabs üzerinde mikrofon seviyesi, kamera açısı ve canlı yayın stream key bağlantısını test et', is_completed: false },
        { task: 'Sohbet kanalına en az 1 aktif moderatör atayarak spam/troll filtresini aktifleştir', is_completed: false },
        { task: 'Yayın başında önemli duyuruyu, soru-cevap konusunu veya hediye hedefini ekrana/sohbete sabitle (Pin)', is_completed: false },
        { task: 'İzleyici etkileşimi için her 10 dakikada bir canlı anket veya soru-cevap çağrısı yap', is_completed: false },
        { task: 'Yayın bitiminde canlı yayın kaydını (VOD) indirip öne çıkan anlardan (Highlights) Reels/Shorts kurgula', is_completed: false }
      ],
      zaman_etiketi: 'Canlı Yayın Başlangıcı',
      tarih_iso: null,
      hazirlik_zamani: '30 dk önce',
      ikon: '🎙️',
      renk: '#EDE9FE',
      sesli_geribildirim: 'Sosyal medya canlı yayın protokolü, OBS bağlantısı ve moderatör yönetimi hazırlandı.'
    };
  }

  return null;
}

/**
 * Sanat ve Medya Prodüksiyonu için Profesyonel Kopyalanabilir Şablonlar (Production Templates)
 */
export const PRODUCTION_TEMPLATES = {
  call_sheet: `[NOTIVIA PRODÜKSİYON - GÜNLÜK CALL SHEET]
Proje Adı: ________________________  Çekim Günü: ___ / ___
Tarih: ___ / ___ / 2026               Genel Set Çağrısı: 06:30
Lokasyon: ________________________  En Yakın Acil: 112 / _________ Hastanesi
Hava Durumu: Parçalı Bulutlu / Rüzgar: 8 km/s / Gün Doğumu: 06:12 - Gün Batımı: 19:48

KADEMELİ ÇAĞRI SAATLERİ:
- 06:00: Prodüksiyon, Reji & Işık/Kamera Kamyon Açılışı
- 06:30: Açık Büfe Set Kahvaltısı
- 07:00: Saç, Makyaj & Kostüm Başlangıcı
- 07:45: Işık & Ses Provası (Stand-in)
- 08:15: İlk Kayıt (Scene: 14 - Shot: 1 - Take: 1)
- 13:00: Set Yemek Molası (Zorunlu T-6 Kuralı - 60 Dakika)
- 19:30: Gün Sonu (Wrap)`,

  fsek_muvafakatname: `5846 SAYILI FSEK UYARINCA OYUNCU / MODEL GÖRSEL VE İŞİTSEL HAK İZİN BELGESİ (MUVAFAKATNAME)

İşbu muvafakatname ile; [Yapım Şirketi Adı] tarafından üretilen [Eser / Proje Adı] isimli yapımdaki görüntü, ses ve icralarımın; 5846 sayılı Fikir ve Sanat Eserleri Kanunu'nun 52. maddesine uygun olarak; işleme, çoğaltma, yayma, temsil ve umuma iletim hakları dahil olmak üzere dünya çapında, süresiz olarak dijital platformlar, TV, sinema ve internet mecralarında kullanılmasına gayrikabili rücu muvafakat ederim.

Tarih: ___ / ___ / 2026
Hak Sahibi / İcracı: ____________________   İmza: ___________`,

  basin_bulteni: `AMBARGOLUDUR: [Tarih - Saat: 09:30] ÖNCESİ YAYINLANAMAZ!

BASIN BÜLTENİ
BAŞLIK: [ÇARPICI VE NET 5N1K BAŞLIĞI BURAYA YAZIN]
Spot: [Haberin en can alıcı 2 cümlelik özeti]

[ŞEHİR] – [Giriş Paragrafı: Kim, Ne Zaman, Nerede, Ne Yaptı?]
[Gelişme Paragrafı: Detaylar, alıntılar, röportaj sözleri ve arka plan verileri]
[Sonuç Paragrafı: Gelecek takvim, bilet/yayın bilgileri ve web sitesi]

Yüksek Çözünürlüklü Basın Fotoğrafları & Video Linki: https://...
Basın İletişim: [İsim Soyisim] | [E-posta] | [Telefon]`,

  split_sheet: `MÜZİK ESERİ ŞARKI PAYI SÖZLEŞMESİ (SPLIT SHEET)

Eser Adı: ___________________________  ISRC Kodu: TR-___-26-_____
Kayıt Tarihi: ___ / ___ / 2026         Stüdyo: ___________________

HAK SAHİPLERİ VE PAY DAĞILIMI:
1. Besteci: [Ad Soyad] | Telif Kurumu: MESAM | Pay: %50 | İmza: _______
2. Söz Yazarı: [Ad Soyad] | Telif Kurumu: MSG | Pay: %50 | İmza: _______

Taraflar, yukarıdaki eserin dijital ve mekanik gelirlerinin yukarıda belirtilen oranlarda dağıtılacağını kabul ve beyan ederler.`,

  influencer_isbirligi: `TİCARET BAKANLIĞI UYUMLU INFLUENCER SPONSORLUK VE İŞBİRLİĞİ BRİEFİ

Kampanya / Marka: _______________________
Influencer / Hesap: ____________________
Yayın Tarihi & Saati: ___ / ___ / 2026 - 19:30 (Prime Time)
Mecra: Instagram Story (3 Adet) + Reels (1 Adet) + TikTok

YASAL ZORUNLU İFADELER (DISCLOSURES):
1. Story Paylaşımlarında: Ekranın sol üst veya orta alanında, arka planla yüksek kontrastlı "#işbirliği" veya "#reklam" etiketi bulunmalıdır.
2. Reels / Video Paylaşımlarında: Başlığın ilk 3 kelimesi içinde "#işbirliği" etiketi yer almalı, videoda ürün deneyimi şeffaf aktarılmalıdır.
3. Kozmetik/Cilt Bakımı: Hiçbir filtre, pürüzsüzleştirici efekt veya yanıltıcı müdahale kullanılmayacaktır.
4. Takip Linki: https://marka.com/urun?utm_source=instagram&utm_medium=influencer&utm_campaign=[KOD]`,

  reels_hook_script: `[30 SANİYELİK YÜKSEK RETENTION REELS / TIKTOK SCRIPTI]

[00:00 - 00:03] KANCA (HOOK):
"Sosyal medyada izlenmeleriniz düştüyse yaptığınız bu 1 hatayı hemen düzeltin!"
(Ekranda büyük punto ve hareketli sarı/beyaz altyazı)

[00:03 - 00:18] DEĞER SUNUMU & ÇÖZÜM (VALUE):
"Videolarınızın ilk 3 saniyesine boş giriş koymak yerine doğrudan sonuca odaklanın. 9:16 dikey kadrajı doldurun ve altyazı ekleyin."

[00:18 - 00:27] KANIT / TÜYO (PROOF):
"Bu yöntemle erişim oranınızı 3 katına çıkarabilirsiniz."

[00:27 - 00:30] EYLEM ÇAĞRISI (CTA):
"Sen bu yöntemi denedin mi? Fikrini yoruma yaz ve kaydetmeyi unutma!"`,

  social_crisis_statement: `SOSYAL MEDYA KRİZ YÖNETİMİ KURUMSAL İLK YANIT METNİ (HOLDING STATEMENT)

"Kamuoyunun ve Değerli Takipçilerimizin Dikkatine,

Sosyal medyada yer alan [Konu / Olay Başlığı] hakkındaki geri bildirimleri ve paylaşımları büyük bir hassasiyet ve dikkatle takip etmekteyiz.

Müşteri/topluluk memnuniyeti ve şeffaflık ilkemiz gereğince; ilgili birimlerimiz konuyu ivedilikle incelemeye almış olup, gerekli tüm araştırmalar titizlikle yürütülmektedir.

Süreçle ilgili detaylı ve şeffaf bilgilendirme en kısa sürede resmi kanallarımız üzerinden paylaşılacaktır.

Anlayışınız ve hassasiyetiniz için teşekkür ederiz.

[Şirket / Marka / Kurum Adı]"`
};

