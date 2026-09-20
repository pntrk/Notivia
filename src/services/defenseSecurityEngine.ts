// src/services/defenseSecurityEngine.ts

import { matchShortScenario } from '../utils/scenarioDatabase.ts';

export interface DefenseSecurityTask {
  id: string;
  baslik: string;
  kategori:
    | 'Polis & Asayiş (CMK 91 Gözaltı & Fezleke)'
    | 'Olay Yeri İnceleme (OYİ) & Kriminal'
    | 'Adli Arama & Suç Eşyası'
    | 'Yol Kontrol & Asayiş Uygulama'
    | 'Askeri İçtima & Tekmil'
    | 'Silahlık, Mühimmat & Doldur-Boşalt'
    | 'Poligon & Atış Tatbikatı'
    | 'Kule/Mevzi Nöbeti & Parola-İşaret'
    | 'Kademe & Askeri Araç Bakımı'
    | 'Jandarma Karakol & Devriye'
    | 'İtfaiye Nöbet Devri & SCBA 300 Bar'
    | 'Yangın Güvenlik & Baca Denetimi'
    | 'Özel Güvenlik (5188 & X-Ray)';
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
 * Savunma, Emniyet, Askeriye ve Operasyonel Güvenlik Bilişsel Motoru (Defense & Security Cognitive Engine)
 * Polis (EGM), Jandarma (JGK), Askeriye (TSK - Kara/Deniz/Hava), İtfaiye, Özel Güvenlik (5188 ÖGG)
 */
export function parseDefenseSecurityIntent(
  rawText: string,
  now: Date = new Date(),
  userDomain?: string
): DefenseSecurityTask | null {
  if (!rawText || typeof rawText !== 'string') return null;
  const text = rawText
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFC')
    .trim();

  // 0. HIZLI SENARYO VERİTABANI KONTROLÜ (matchShortScenario - SAVUNMA)
  const shortMatch = matchShortScenario(rawText, 'SAVUNMA');
  if (shortMatch && (shortMatch.domain === 'SAVUNMA' || shortMatch.id.startsWith('savunma_') || shortMatch.id.startsWith('askeriye_'))) {
    return {
      id: `savunma_scenario_${Date.now()}`,
      baslik: shortMatch.baslik,
      kategori: 'Askeri İçtima & Tekmil',
      mevzuat_notu: shortMatch.akilliFisilti || 'Savunma ve emniyet mevzuatına uygun operasyonel teyit zorunludur.',
      action_items: (shortMatch.oncedenYapilacaklar || []).map((t) => ({ task: t, is_completed: false })),
      zaman_etiketi: shortMatch.varsayilanZaman || 'Operasyon Saati',
      tarih_iso: null,
      hazirlik_zamani: shortMatch.hazirlikZamani,
      ikon: shortMatch.ikon || '🛡️',
      renk: shortMatch.renk || '#E2E8D5',
      sesli_geribildirim: shortMatch.akilliFisilti || `${shortMatch.baslik} planlandı.`
    };
  }

  // 1. POLİS: CMK 91 GÖZALTI, NEZARETHANE & SAVCILIK FEZLEKESİ
  if (
    text.includes('gözaltı') ||
    text.includes('gozalti') ||
    text.includes('nezaret') ||
    text.includes('nezarethane') ||
    text.includes('yakalama') ||
    text.includes('yakaladık') ||
    text.includes('yakaladik') ||
    text.includes('şüpheli hakları') ||
    text.includes('supheli haklari') ||
    text.includes('fezleke') ||
    text.includes('cmk 91') ||
    (text.includes('şüpheli') && (text.includes('savcı') || text.includes('doktor') || text.includes('rapor') || text.includes('adli muayene')))
  ) {
    const isGroup =
      text.includes('toplu') ||
      text.includes('örgüt') ||
      text.includes('orgut') ||
      text.includes('çete') ||
      text.includes('48 saat');
    const hours = isGroup ? 48 : 24;
    const due = new Date(now);
    due.setHours(due.getHours() + hours);
    const dueFormatted = `${due.getHours().toString().padStart(2, '0')}:${due.getMinutes().toString().padStart(2, '0')}`;

    return {
      id: `police_custody_${Date.now()}`,
      baslik: isGroup ? 'Toplu Suç Gözaltı & Fezleke (48s)' : 'Gözaltı & Savcılık Sevk (24s)',
      kategori: 'Polis & Asayiş (CMK 91 Gözaltı & Fezleke)',
      mevzuat_notu: `CMK Madde 91 uyarınca yakalanan kişi ${hours} saat içinde hakim önüne çıkarılmalıdır. Yakalama anında derhal giriş adli muayene raporu alınmalı, süre bitimine en az 6 saat kala fezleke Cumhuriyet Savcılığına intikal ettirilmelidir.`,
      action_items: [
        { task: 'Sağlık kuruluşundan giriş adli muayene (darp-cebir yokluğu) raporunun alınması', is_completed: false },
        { task: 'Şüpheli Hakları Bildirgesi (CMK 147) tebliği ve Yakalama-Gözaltı Defterine kayıt', is_completed: false },
        { task: 'Şüpheli müdafi (Baro/OCAS) talep teyidi veya SEGBİS bağlantı hazırlığı', is_completed: false },
        { task: `Süre bitimine 6 saat kala (${hours - 6}. saat) fezleke ve eklerinin Cumhuriyet Savcısına sunulması`, is_completed: false },
        { task: 'Savcılık/Mahkeme sevki öncesi çıkış doktor raporunun eksiksiz temini', is_completed: false }
      ],
      zaman_etiketi: `Yasal Süre: ${hours} Saat (Son: ${dueFormatted})`,
      tarih_iso: due.toISOString(),
      hazirlik_zamani: `Süre Bitimine 6 Saat Kala Fezleke Tamamlama`,
      ikon: '👮',
      renk: '#BFDBFE',
      sesli_geribildirim: `CMK 91 gereği ${hours} saatlik yasal gözaltı süreci başlatıldı. 6 saat kala savcılık fezlekesi alarmı kuruldu.`,
      anomali_notu: 'Şüphelinin avukatsız ifadesi alınamaz; gözaltı süresi aşımı durumunda hürriyeti tahdit suçu oluşur.'
    };
  }

  // 2. OLAY YERİ İNCELEME (OYİ), BALİSTİK & DELİL ZİNCİRİ
  if (
    text.includes('olay yeri') ||
    text.includes('olay yeri inceleme') ||
    text.includes('oyi') ||
    text.includes('delil numaralandırma') ||
    text.includes('balistik') ||
    text.includes('kovan') ||
    text.includes('mermi çekirdeği') ||
    text.includes('daktiloskopi') ||
    text.includes('parmak izi') ||
    text.includes('svap') ||
    text.includes('dna örneği') ||
    text.includes('kriminal laboratuvar') ||
    text.includes('kpl')
  ) {
    return {
      id: `police_csi_${Date.now()}`,
      baslik: 'Olay Yeri İnceleme & Delil Güvenliği',
      kategori: 'Olay Yeri İnceleme (OYİ) & Kriminal',
      mevzuat_notu: 'CMK 153 ve Adli ve Önleme Aramaları Yönetmeliği gereği olay yerinin kontaminasyonunu önlemek ve delil zincirini korumak amirin birincil sorumluluğundadır.',
      action_items: [
        { task: 'Olay yerini güvenlik şeridiyle en az 50 metre kordon altına alarak yetkisiz girişleri yasakla', is_completed: false },
        { task: 'Delil plaketleriyle (sarı numarataj) kovan, kan lekesi ve biyolojik bulguları etiketle', is_completed: false },
        { task: 'Eldiven ve steril tulumla parmak izi (daktiloskopi) ve DNA swap örneklerini mühürlü delil torbasına koy', is_completed: false },
        { task: 'Olay Yeri Teslim-Tesellüm ve Delil Tespit Tutanağını tanzim edip Kriminal Polis Laboratuvarına sevk et', is_completed: false }
      ],
      zaman_etiketi: 'Olay Anı / İvedilikle',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Olay Yerine İntikal Anı',
      ikon: '🔍',
      renk: '#BFDBFE',
      sesli_geribildirim: 'Olay yeri inceleme kordon protokolü, delil numaralandırma ve kriminal sevk zinciri oluşturuldu.',
      anomali_notu: 'Delil zinciri kesintiye uğrarsa mahkemede delil geçersiz sayılır; mühürlü delil torbası formu zorunludur.'
    };
  }

  // 3. ADLİ ARAMA, ÜST/ARAÇ ARAMA & SUÇ EŞYASI MAKBUZU
  if (
    text.includes('arama kararı') ||
    text.includes('üst arama') ||
    text.includes('araç arama') ||
    text.includes('arac arama') ||
    text.includes('konut arama') ||
    text.includes('adli arama') ||
    text.includes('önleme araması') ||
    text.includes('onleme aramasi') ||
    text.includes('suç eşyası') ||
    text.includes('suc esyasi') ||
    text.includes('adli emanet') ||
    text.includes('pvsk 4/a') ||
    text.includes('pvsk 9') ||
    text.includes('cmk 116') ||
    text.includes('cmk 119')
  ) {
    return {
      id: `police_search_${Date.now()}`,
      baslik: 'Adli Arama & Suç Eşyası Emanet Tutanağı',
      kategori: 'Adli Arama & Suç Eşyası',
      mevzuat_notu: 'CMK 116-122 ve PVSK 4/A uyarınca hakim kararı veya gecikmesinde sakınca bulunan hallerde savcının yazılı emri şarttır. Konut aramasında ihtiyar heyetinden en az 2 kişi veya komşu hazır bulunmalıdır.',
      action_items: [
        { task: 'Sulh Ceza Hakimliği arama kararını veya savcılık yazılı emrini kontrol et ve tebliğ et', is_completed: false },
        { task: 'Konut aramasında ihtiyar heyetinden 2 aza veya 2 komşu hazır bulundurarak kimliklerini tutanağa bağla', is_completed: false },
        { task: 'Ele geçirilen suç unsuru eşyayı Suç Eşyası Teslim ve Adli Emanet Tutanağına seri numarasıyla yaz', is_completed: false },
        { task: 'Arama yapılan şahsa arama tutanağının ve teslim edilen eşya makbuzunun bir suretini imza karşılığı ver', is_completed: false }
      ],
      zaman_etiketi: 'Arama Başlangıç Saati',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Arama Öncesi Karar Teyidi',
      ikon: '📑',
      renk: '#BFDBFE',
      sesli_geribildirim: 'Adli arama kararı teyidi, 2 tanık eşliği ve suç eşyası emanet makbuzu adımları hazırlandı.',
      anomali_notu: 'Kararsız yapılan aramalar hukuka aykırı delil oluşturur; gecikmesinde sakınca olan hallerde savcı emri 24 saatte hakime onaylatılmalıdır.'
    };
  }

  // 4. YOL KONTROLÜ, HUZUR GÜVENLİK UYGULAMASI & GBT SORGUSU
  if (
    text.includes('yol kontrol') ||
    text.includes('uygulama noktası') ||
    text.includes('asayiş uygulaması') ||
    text.includes('huzur uygulaması') ||
    text.includes('gbt sorgu') ||
    text.includes('polnet') ||
    text.includes('kapan tertibatı') ||
    text.includes('dur ihtarı') ||
    text.includes('çelik yelek') ||
    text.includes('celik yelek') ||
    text.includes('trafik denetim noktası')
  ) {
    return {
      id: `police_checkpoint_${Date.now()}`,
      baslik: 'Asayiş & Yol Kontrol Uygulama Noktası',
      kategori: 'Yol Kontrol & Asayiş Uygulama',
      mevzuat_notu: 'PVSK ve Karayolları Trafik Kanunu uyarınca yol arama ve kontrol noktalarında can güvenliği gereği çelik yelek ve uzun namlulu çevre emniyeti zorunludur.',
      action_items: [
        { task: 'Tüm görevli personele çelik yelek, balistik kask ve teçhizat denetimi yap', is_completed: false },
        { task: 'Dur ihtarı ışıklı uyarı levhaları, reflektör duba ve seyyar kapan tertibatını konuşlandır', is_completed: false },
        { task: 'Uzun namlulu silahlı 2 nöbetçiyle derinlikte çevre emniyeti ve yaklaşma istikametini koru', is_completed: false },
        { task: 'PolNet / GBT / UYAP sorgulama cihazı üzerinden şahıs ve araç arama kaydı sorgusu yap', is_completed: false },
        { task: 'Uygulama sonu aranan şahıs, ceza ve el konulan eşyaları Uygulama Sonuç Tutanağına bağla', is_completed: false }
      ],
      zaman_etiketi: 'Uygulama Başlama Saati',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Nokta Konuşlanmasından 20 Dk Önce',
      ikon: '🚔',
      renk: '#BFDBFE',
      sesli_geribildirim: 'Asayiş uygulama noktası, kapan tertibatı ve GBT çevre emniyet kontrol listesi açıldı.',
      anomali_notu: 'Uygulama noktasında tek memur duramaz; dur ihtarına uymayan araçlara karşı kademeli kapan ve telsiz koordinasyonu esastır.'
    };
  }

  // 5. ASKERİYE: İÇTİMA & TEKMİL PROTOKOLÜ (TSK / BÖLÜK / TABUR)
  if (
    text.includes('içtima') ||
    text.includes('ictima') ||
    text.includes('tekmil') ||
    text.includes('tabur içtima') ||
    text.includes('bölük içtima') ||
    text.includes('takım içtima') ||
    text.includes('sabah içtiması') ||
    text.includes('akşam içtiması') ||
    text.includes('yoklama') && (text.includes('asker') || text.includes('birlik') || text.includes('koğuş'))
  ) {
    const ictimaDate = new Date(now);
    ictimaDate.setMinutes(ictimaDate.getMinutes() - 20); // 20 dk önce takım hazırlığı

    return {
      id: `military_formation_${Date.now()}`,
      baslik: 'Birlik İçtiması & Tekmil Hazırlığı',
      kategori: 'Askeri İçtima & Tekmil',
      mevzuat_notu: 'TSK İç Hizmet Kanunu ve Yönetmeliği uyarınca birlik içtimasından en az 20 dakika önce takım mevcutları alınmış, teçhizat ve kılık-kıyafet denetimi tamamlanmış olmalıdır.',
      action_items: [
        { task: 'Mevcut ve künye kontrolü (Raporlu, izinli, nöbetçi, istirahatli personelin tespiti)', is_completed: false },
        { task: 'Teçhizat, kompozit başlık, hücum yeleği, matara ve kılık-kıyafet intizam denetimi', is_completed: false },
        { task: 'Bölük/Tabur komutanına sunulacak mevcut tekmil kartının doldurulması', is_completed: false },
        { task: 'İçtima alanında hiza, istikamet ve sessizlik disiplininin sağlanması', is_completed: false }
      ],
      zaman_etiketi: 'İçtimadan 20 Dk Önce (Takım Hazırlığı)',
      tarih_iso: ictimaDate.toISOString(),
      hazirlik_zamani: 'Faaliyetten 25 Dk Önce',
      ikon: '🪖',
      renk: '#E2E8D5',
      sesli_geribildirim: 'İçtima öncesi mevcut sayımı, teçhizat denetimi ve tekmil kartı hazırlığı planlandı.',
      anomali_notu: 'İçtima alanında mevcudu tam olmayan veya izinsiz koğuşta kalan personel disiplin suçuna tabidir.'
    };
  }

  // 6. ASKERİYE: SİLAHLIK, MÜHİMMAT & DOLDUR-BOŞALT EMNİYETİ
  if (
    text.includes('silahlık') ||
    text.includes('silahlik') ||
    text.includes('mühimmat') ||
    text.includes('muhimmat') ||
    text.includes('doldur-boşalt') ||
    text.includes('doldur boşalt') ||
    text.includes('doldur bosalt') ||
    text.includes('silahlık sayımı') ||
    text.includes('kurşun mühür') ||
    text.includes('mühür kontrol') ||
    (text.includes('nöbet') && (text.includes('silah') || text.includes('şarjör') || text.includes('sarjor') || text.includes('piyade tüfeği')))
  ) {
    return {
      id: `military_armory_${Date.now()}`,
      baslik: 'Silahlık Sayımı & Doldur-Boşalt Protokolü',
      kategori: 'Silahlık, Mühimmat & Doldur-Boşalt',
      mevzuat_notu: 'TSK Silah ve Mühimmat Yönergesi uyarınca nöbet devir-tesliminde silahlık sayım cetveli ıslak imzayla fiziki sayılmalı, doldur-boşalt istasyonunda doldur-boşalt emniyeti nöbetçi amir gözetiminde yapılmalıdır.',
      action_items: [
        { task: 'Silahlık sayım cetvelini açarak piyade tüfeği ve tabancaların seri numaralarını fiziki say', is_completed: false },
        { task: 'Mühimmat sandıklarının kurşun mühürlerini ve mühür pensi izlerini kontrol et', is_completed: false },
        { task: 'Doldur-boşalt istasyonunda şarjör çıkar, kurma kolunu çek, namluyu kontrol et, tetiği düşür ve emniyete al', is_completed: false },
        { task: 'Nöbet Defterine vukuat kaydını (silah ve mühimmat adedi tam) düşerek devir-teslimi imzala', is_completed: false }
      ],
      zaman_etiketi: 'Nöbet Devir-Teslim Saati',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Devirden 15 Dk Önce',
      ikon: '🛡️',
      renk: '#E2E8D5',
      sesli_geribildirim: 'Silahlık sayımı, mühür denetimi ve doldur-boşalt emniyet protokolü hazırlandı.',
      anomali_notu: 'Doldur-boşalt istasyonu haricinde silah kurcalanamaz; kırık mühür derhal tutanakla birlik komutanına bildirilir.'
    };
  }

  // 7. POLİGON & ATIŞ EĞİTİMİ / ARAZİ TATBİKATI
  if (
    text.includes('atış') ||
    text.includes('atis') ||
    text.includes('poligon') ||
    text.includes('tatbikat') ||
    text.includes('atış hattı') ||
    text.includes('hedef kağıdı') ||
    text.includes('kovan sayımı') ||
    text.includes('mühimmat sarfiyat') ||
    text.includes('sıhhiye ambulans')
  ) {
    return {
      id: `military_shooting_${Date.now()}`,
      baslik: 'Poligon Atış & Arazi Tatbikat Protokolü',
      kategori: 'Poligon & Atış Tatbikatı',
      mevzuat_notu: 'TSK Atış Yönergesi gereği poligon sahasında nöbetçi tabip ve sıhhiye ambulansı hazır bulunmadan, emniyet bayrağı çekilmeden kesinlikle tek bir el dahi atış yapılamaz.',
      action_items: [
        { task: 'Poligon emniyet subayı, flama ve gözetleme kulesi nöbetçilerini yerleştir; kırmızı flama çek', is_completed: false },
        { task: 'Nöbetçi tabip/sağlık astsubayı ve tam donanımlı sıhhiye ambulansının poligonda yerini aldığını teyit et', is_completed: false },
        { task: 'Atış hattı öncesinde atıcılara kulaklık ve balistik gözlük KKD denetimi yap', is_completed: false },
        { task: 'Atış sonrasında boş kovanları toplat, mermi-kovan sayım mutabakatını yap ve Sarfiyat Tutanağını tanzim et', is_completed: false }
      ],
      zaman_etiketi: 'Atış Faaliyeti Öncesi',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Atıştan 30 Dk Önce (Sıhhiye & Flama)',
      ikon: '🎯',
      renk: '#E2E8D5',
      sesli_geribildirim: 'Poligon emniyeti, sıhhiye ambulans koordinasyonu ve kovan sarfiyat kontrol adımları oluşturuldu.',
      anomali_notu: 'Kovan sayısı verilen mermi sayısıyla eşleşmek zorundadır; eksik kovan bulunana kadar poligon terk edilemez.'
    };
  }

  // 8. KULE/MEVZİ NÖBETİ, PAROLA-İŞARET & AMM HAZIR KITA
  if (
    text.includes('kule nöbeti') ||
    text.includes('mevzi nöbeti') ||
    text.includes('parola işaret') ||
    text.includes('parola ve işaret') ||
    text.includes('gece görüş') ||
    text.includes('termal kamera') ||
    text.includes('hazır kıta') ||
    text.includes('hazirkita') ||
    text.includes('amm') ||
    text.includes('devriye nöbeti') && (text.includes('asker') || text.includes('birlik') || text.includes('sınır') || text.includes('hudut'))
  ) {
    return {
      id: `military_guard_post_${Date.now()}`,
      baslik: 'Kule/Mevzi Nöbeti & Parola-İşaret Devri',
      kategori: 'Kule/Mevzi Nöbeti & Parola-İşaret',
      mevzuat_notu: 'TSK Nöbet Hizmetleri Talimatnamesi uyarınca nöbet kulelerinde 2 saatlik periyot uygulanır. Günlük parola ve işaret nöbetçi personeline gizli tebliğ edilir; gece görüş bataryaları tam dolu olmalıdır.',
      action_items: [
        { task: 'Günün güncel parola ve işaretini nöbetçi personeline gizli tebliğ et', is_completed: false },
        { task: 'Termal kamera ve gece görüş cihazı (GGD) batarya seviyelerini kontrol et', is_completed: false },
        { task: 'Telsiz yedek bataryasını ve çevre aydınlatma projektörlerini test et', is_completed: false },
        { task: 'Acil Müdahale Mangası (AMM) hazır kıta personelinin teçhizat ve silah hazırlığını denetle', is_completed: false }
      ],
      zaman_etiketi: 'Nöbet Çizelgesi Başlangıcı (2 Saatlik Periyot)',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Nöbete Çıkıştan 15 Dk Önce',
      ikon: '🪖',
      renk: '#E2E8D5',
      sesli_geribildirim: 'Nöbet mevzii, güncel parola-işaret ve termal gece görüş batarya teyidi sağlandı.',
      anomali_notu: 'Parola ve işaret yabancı şahıslara veya telsiz üzerinden açık kanaldan kesinlikle söylenemez.'
    };
  }

  // 9. KADEME, ASKERİ ARAÇ (TTZA / KİRPİ / KOBRA) & BAKIM
  if (
    text.includes('kademe') ||
    text.includes('askeri araç') ||
    text.includes('askeri arac') ||
    text.includes('ttza') ||
    text.includes('kirpi') ||
    text.includes('kobra') ||
    text.includes('araç takip defteri') ||
    text.includes('arac takip defteri') ||
    text.includes('jammer') ||
    text.includes('sinyal kesici') ||
    text.includes('konvoy emniyeti')
  ) {
    return {
      id: `military_vehicle_${Date.now()}`,
      baslik: 'Kademe & Taktik Araç Bakım Protokolü',
      kategori: 'Kademe & Askeri Araç Bakımı',
      mevzuat_notu: 'TSK Bakım ve İkmal Yönergesi uyarınca göreve çıkacak taktik tekerlekli zırhlı araçların takip defteri imzalı, kule silahı ve jammer sistemi çalışır durumda olmalıdır.',
      action_items: [
        { task: 'Araç Takip Defterini, kilometre fişlerini ve görev görevlendirme emrini kontrol et', is_completed: false },
        { task: 'Taktik araç sinyal kesici (jammer) ve telsiz muhabere testini yap', is_completed: false },
        { task: 'Yangın söndürme tüpü, ilk yardım çantası ve patlak-gider lastik basınçlarını muayene et', is_completed: false },
        { task: 'Motor yağı, hidrolik seviyeleri ve kule silah bağlantı torklarını kontrol et', is_completed: false }
      ],
      zaman_etiketi: 'Göreve Çıkıştan Önce',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Kalkıştan 30 Dk Önce',
      ikon: '🪖',
      renk: '#E2E8F0',
      sesli_geribildirim: 'Kademe zırhlı araç bakım, jammer testi ve takip defteri kontrol listesi hazırlandı.',
      anomali_notu: 'Jammer veya telsiz testi başarısız olan zırhlı araç kesinlikle konvoy intikaline çıkarılamaz.'
    };
  }

  // 10. JANDARMA: KARAKOL NÖBETÇİ ASTSUBAYI & ASAYİŞ TİMİ
  if (
    text.includes('jandarma') ||
    text.includes('jgk') ||
    text.includes('karakol komutanı') ||
    text.includes('karakol nöbetçi') ||
    text.includes('asayiş timi') ||
    text.includes('kırsal devriye') ||
    text.includes('orman devriyesi') ||
    text.includes('hudut devriyesi')
  ) {
    return {
      id: `gendarme_patrol_${Date.now()}`,
      baslik: 'Jandarma Karakol & Asayiş Timi Devriyesi',
      kategori: 'Jandarma Karakol & Devriye',
      mevzuat_notu: '2803 sayılı Jandarma Teşkilat, Görev ve Yetkileri Kanunu uyarınca karakol nöbetçi astsubayı nezarethane, silahlık ve devriye timlerinin sevk ve idaresinden sorumludur.',
      action_items: [
        { task: 'Karakol silahlığı, mühimmat sandıkları ve nezarethane kontrolünü tamamla', is_completed: false },
        { task: 'Asayiş devriye timine görev bölgesi, rota ve telsiz kodu brifingini ver', is_completed: false },
        { task: 'Kırsal alan kontrolünde çelik yelek, balistik plaka ve ilk yardım çantasını teyit et', is_completed: false },
        { task: 'Devriye dönüşünde Vukuat ve Faaliyet Sonuç Raporunu tanzim edip İlçe Jandarma Komutanlığına ilet', is_completed: false }
      ],
      zaman_etiketi: 'Devriye / Nöbet Saati',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Devriyeden 20 Dk Önce',
      ikon: '🛡️',
      renk: '#E2E8D5',
      sesli_geribildirim: 'Jandarma karakol nöbeti ve asayiş timi devriye brifing adımları planlandı.',
      anomali_notu: 'Kırsal devriyede en az iki personel ve muhabere irtibatı kesilmeyecek şekilde konuşlanma esastır.'
    };
  }

  // 11. İTFAİYE: SCBA 300 BAR, ARAZÖZ & NÖBET DEVRİ
  if (
    text.includes('itfaiye') ||
    text.includes('itfaiyeci') ||
    text.includes('scba') ||
    text.includes('solunum tüpü') ||
    text.includes('solunum tupu') ||
    text.includes('arazöz') ||
    text.includes('arazoz') ||
    text.includes('hidrolik kesici') ||
    text.includes('yangın nöbeti') ||
    text.includes('yangin nobeti')
  ) {
    return {
      id: `firefighter_handover_${Date.now()}`,
      baslik: 'İtfaiye Nöbet & SCBA 300 Bar Devir Teslimi',
      kategori: 'İtfaiye Nöbet Devri & SCBA 300 Bar',
      mevzuat_notu: 'İtfaiye Teşkilat Yönetmeliği gereği vardiya devrinde SCBA temiz hava solunum tüplerinin 300 Bar basınç ve maske sızdırmazlık kontrolü, arazöz su-köpük seviyeleri 1. sıraya alınmalıdır.',
      action_items: [
        { task: 'SCBA temiz hava solunum tüplerinin 300 Bar basınç ve pozitif basınçlı maske sızdırmazlık testi', is_completed: false },
        { task: 'Arazöz su ve köpük tank seviyeleri ile motopomp basınç vanalarının kontrolü', is_completed: false },
        { task: 'Hidrolik ayırıcı/kesici batarya şarj durumu ve hidrolik hortum sızdırmazlık muayenesi', is_completed: false },
        { task: 'Vardiya Defterine araç ve teçhizat durumunun vukuatsız olarak işlenip imzalanması', is_completed: false }
      ],
      zaman_etiketi: 'Vardiya Devir Saati (08:00)',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Devirden 15 Dk Önce',
      ikon: '🚒',
      renk: '#FECACA',
      sesli_geribildirim: 'SCBA 300 Bar, arazöz su-köpük ve hidrolik kesici kontrolleri 1. sıraya alınarak itfaiye devir listesi açıldı.',
      anomali_notu: 'Solunum tüplerinde 270 Bar altındaki tüpler derhal kompresör odasında doldurulmalıdır.'
    };
  }

  // 12. YANGIN GÜVENLİK & İŞYERİ BACA DENETİMİ
  if (
    text.includes('yangın denetim') ||
    text.includes('yangin denetim') ||
    text.includes('baca denetim') ||
    text.includes('yangın uygunluk') ||
    text.includes('yangin uygunluk') ||
    text.includes('yangın raporu') ||
    text.includes('sprinkler denetim') ||
    text.includes('yangın kapısı')
  ) {
    const reportDate = new Date(now);
    reportDate.setDate(reportDate.getDate() + 3);

    return {
      id: `fire_inspection_${Date.now()}`,
      baslik: 'Yangın Güvenlik & Baca Uygunluk Raporu',
      kategori: 'Yangın Güvenlik & Baca Denetimi',
      mevzuat_notu: 'Binaların Yangından Korunması Hakkında Yönetmelik gereği işyeri yangın uygunluk raporları en geç 3 iş günü içinde tanzim edilmeli, eksikliklerde 15 günlük yasal süre tanınmalıdır.',
      action_items: [
        { task: 'İşyeri yangın algılama butonları, sirenleri, sprinkler ve acil çıkış kapı yönlendirmelerini denetle', is_completed: false },
        { task: 'Endüstriyel mutfak/baca yağ tutucu filtrelerini ve yangın damperi mekaniklerini kontrol et', is_completed: false },
        { task: 'Yangın söndürme tüplerinin (KKT/Karbondioksit) hidrostatik test ve dolum tarihlerini incele', is_completed: false },
        { task: 'İtfaiye Yangın Güvenlik Uygunluk Raporunu sisteme yükleyip ilgili belediye ruhsat birimine ilet', is_completed: false }
      ],
      zaman_etiketi: '3 Gün İçinde (Yasal Raporlama)',
      tarih_iso: reportDate.toISOString(),
      hazirlik_zamani: 'Denetim Öncesi Dosya İnceleme',
      ikon: '🚒',
      renk: '#FECACA',
      sesli_geribildirim: 'Yangın güvenlik ve baca uygunluk denetimi adımları başlatıldı.',
      anomali_notu: 'Acil çıkış kapısı kilitli veya kapalı olan işletmelere doğrudan idari para cezası ve süre verilir.'
    };
  }

  // 13. ÖZEL GÜVENLİK (5188 SAYILI KANUN & X-RAY KONTROLÜ)
  if (
    text.includes('özel güvenlik') ||
    text.includes('ozel guvenlik') ||
    text.includes('ögg') ||
    text.includes('ogg') ||
    text.includes('5188') ||
    text.includes('x-ray') ||
    text.includes('xray') ||
    text.includes('kapı dedektörü') ||
    text.includes('kapi dedektoru') ||
    text.includes('el dedektörü') ||
    text.includes('devriye tur kalemi') ||
    text.includes('tom kalemi') ||
    text.includes('ziyaretçi defteri') ||
    text.includes('emanet teslim')
  ) {
    return {
      id: `private_security_5188_${Date.now()}`,
      baslik: '5188 Özel Güvenlik & X-Ray Kontrol Protokolü',
      kategori: 'Özel Güvenlik (5188 & X-Ray)',
      mevzuat_notu: '5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca görevli personelin kimlik kartı görünür şekilde takılı olmalı, X-Ray ve kapı dedektörleri her vardiya başında test edilmelidir.',
      action_items: [
        { task: 'ÖGG kimlik kartı ve üniforma kontrolü yap; kimliksiz nöbet tutulmasını engelle', is_completed: false },
        { task: 'X-Ray bagaj arama cihazını C-10 test çantasıyla (STP testi) ve kapı dedektörünü kalibrasyonla test et', is_completed: false },
        { task: 'Ziyaretçi kimlik kayıt defterini ve emanet eşya teslim makbuzlarını eksiksiz işlet', is_completed: false },
        { task: 'Kamera izleme odası (CCTV) 24 saat kesintisiz kayıt teyidi ve yangın paneli kontrolünü sağla', is_completed: false },
        { task: 'RFID devriye tur kalemi (Tom kalemi) ile tüm kontrol noktalarını belirlenen saatlerde oku', is_completed: false }
      ],
      zaman_etiketi: 'Vardiya Başlangıcı',
      tarih_iso: now.toISOString(),
      hazirlik_zamani: 'Vardiyadan 15 Dk Önce',
      ikon: '🛡️',
      renk: '#BFDBFE',
      sesli_geribildirim: '5188 sayılı Kanun gereği ÖGG kimlik kontrolü, X-Ray testi ve devriye tur listesi açıldı.',
      anomali_notu: '5188 sayılı Kanun Madde 19 uyarınca kimlik kartı yakasında takılı olmayan özel güvenlik görevlisi yetkilerini kullanamaz.'
    };
  }

  return null;
}
