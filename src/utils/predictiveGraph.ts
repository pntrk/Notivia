/**
 * Notivia Bilişsel Çıkarım Motoru: Predictive Action Graph (Ön Hazırlık ve Zincirleme Eylemler)
 * 
 * "Leb demeden leblebiyi anlama" mimarisi:
 * Kullanıcı sadece nihai bir hedef söylediğinde ("Pasaport randevusu cuma", "Yarın sabah uçuş var", "Kombiden ses geliyor"):
 * 1. O hedefin gerçekleşebilmesi için gereken görünmez ön koşulları çıkarır (Gereken belgeler, online işlemler, hazırlıklar).
 * 2. Ana etkinlikten önce tetiklenecek "Tersine Zamanlanmış Ön Hatırlatıcı" (Pre-emptive alarm) üretir.
 * 3. Kullanıcıya yük olmadan kartın içine hazır kontrol listesi (Checklist) yerleştirir.
 */

export interface PredictiveInference {
  domain: string;
  baslik?: string;
  zaman?: string;
  tarih_iso?: string;
  hazirlikZamani?: string; // Örn: "1 Gün Önce 16:00" veya "3 Saat Önce"
  hazirlikSaatOncesi?: number; // Ana etkinlikten kaç saat önce hatırlatılsın
  oncedenYapilacaklar: string[]; // Alt kontrol adımları
  akilliFisilti: string; // Kart üzerine eklenen rehberlik notu
  sesliFisilti?: string; // Kulaktan verilecek sesli teyit fısıltısı
  oneriAksiyonu?: {
    baslik: string;
    url?: string;
  };
  ikon?: string;
  renk?: string;
}

/**
 * Domain'e ve senaryoya göre tam uyumlu pastel tema rengi ve sembolik emoji eşler.
 * Resmi/Bürokrasi: #E0F2FE (🏛️/🛂/🪪/📋)
 * Sosyal/Tören: #DCFCE7 (🤝/💍/💐/🕊️)
 * Teknik/Bakım: #FEF3C7 (🔧/🚗/⚙️/🔋)
 * Finansal/Ödeme/Borç: #FEE2E2 (💳/💸/⚠️/🚨)
 * Sağlık/Medikal/Alacak: #F3E8FF (🩺/💊/👁️/🦷/💰)
 */
export function getDomainTheme(domain: string): { ikon: string; renk: string } {
  const d = domain.toLowerCase();
  if (d.includes('saglik') || d.includes('medikal') || d.includes('tahlil') || d.includes('asi') || d.includes('mr') || d.includes('ameliyat') || d.includes('ilac') || d.includes('alacak')) {
    let ikon = '🩺';
    if (d.includes('goz')) ikon = '👁️';
    else if (d.includes('implant') || d.includes('dis')) ikon = '🦷';
    else if (d.includes('endoskopi')) ikon = '🩺';
    else if (d.includes('alacak')) ikon = '💰';
    else if (d.includes('ilac')) ikon = '💊';
    return { ikon, renk: '#F3E8FF' };
  }
  if (d.includes('burokrasi') || d.includes('resmi') || d.includes('hukuk') || d.includes('tapu') || d.includes('ehliyet') || d.includes('pasaport') || d.includes('vize') || d.includes('noter') || d.includes('kurum') || d.includes('egitim') || d.includes('zumre') || d.includes('kpss') || d.includes('nobet') || d.includes('rapor')) {
    let ikon = '🏛️';
    if (d.includes('pasaport') || d.includes('vize')) ikon = '🛂';
    else if (d.includes('ehliyet')) ikon = '🪪';
    else if (d.includes('egitim') || d.includes('zumre') || d.includes('kpss') || d.includes('nobet') || d.includes('rapor')) ikon = '📋';
    return { ikon, renk: '#E0F2FE' };
  }
  if (d.includes('botanik') || d.includes('cicek') || d.includes('bitki') || d.includes('sula') || d.includes('bahce') || d.includes('orkide') || d.includes('sardunya') || d.includes('kaktus') || d.includes('sukulent') || d.includes('pasa_kilici') || d.includes('baris_cicegi')) {
    let ikon = '🪴';
    if (d.includes('orkide') || d.includes('petunya')) ikon = '🌸';
    else if (d.includes('sardunya') || d.includes('baris_cicegi')) ikon = '🌺';
    else if (d.includes('kaktus') || d.includes('sukulent')) ikon = '🌵';
    return { ikon, renk: '#DCFCE7' };
  }
  if (d.includes('sosyal') || d.includes('iletisim') || d.includes('toren') || d.includes('nikah') || d.includes('dugun') || d.includes('taziye') || d.includes('sunnet') || d.includes('ziyaret')) {
    let ikon = '🤝';
    if (d.includes('nikah') || d.includes('evlilik')) ikon = '💍';
    else if (d.includes('dugun') || d.includes('sunnet')) ikon = '💐';
    else if (d.includes('taziye')) ikon = '🕊️';
    return { ikon, renk: '#DCFCE7' };
  }
  if (d.includes('tasit') || d.includes('arac') || d.includes('enerji') || d.includes('donanim') || d.includes('muayene') || d.includes('bakim') || d.includes('kombi') || d.includes('klima') || d.includes('aku') || d.includes('lastik') || d.includes('panel') || d.includes('aritma') || d.includes('kasko')) {
    let ikon = '🔧';
    if (d.includes('aku') || d.includes('enerji') || d.includes('panel')) ikon = '🔋';
    else if (d.includes('tasit') || d.includes('muayene') || d.includes('kasko') || d.includes('lastik') || d.includes('arac')) ikon = '🚗';
    else if (d.includes('kombi') || d.includes('aritma') || d.includes('filtre')) ikon = '⚙️';
    return { ikon, renk: '#FEF3C7' };
  }
  if (d.includes('finans') || d.includes('borc') || d.includes('odeme') || d.includes('icra') || d.includes('kira') || d.includes('aidat') || d.includes('mtv') || d.includes('kart') || d.includes('vergi')) {
    let ikon = '💳';
    if (d.includes('icra') || d.includes('haciz')) ikon = '🚨';
    else if (d.includes('borc') || d.includes('fatura') || d.includes('odeme')) ikon = '💸';
    return { ikon, renk: '#FEE2E2' };
  }
  return { ikon: '📌', renk: '#E0F2FE' };
}

// Bilişsel Yaşam Grafiği ve Senaryo Şablonları
const PREDICTIVE_GRAPH_PATTERNS: Array<{
  matcher: (lower: string) => boolean;
  inference: PredictiveInference;
}> = [
  // 1. Pasaport Randevusu & Vize İşlemleri
  {
    matcher: (l) => l.includes('pasaport') || l.includes('vize randevu') || l.includes('vize görüşme'),
    inference: {
      domain: 'pasaport_vize',
      hazirlikZamani: '1 Gün Önce 17:00',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Harç ve defter bedeli dekontu hazır mı? (Gelir İdaresi / Banka)',
        'Son 6 ay içinde çekilmiş 2 adet biyometrik fotoğraf',
        'Eski pasaportun aslı ve T.C. kimlik kartı',
        'Varsa öğrenci belgesi (Harç muafiyeti için)'
      ],
      akilliFisilti: '💡 Randevudan önce biyometrik fotoğraf ve harç dekontunu dosyalamayı unutmayın.',
      oneriAksiyonu: {
        baslik: 'Nüfus Randevu Sistemi',
        url: 'https://randevu.nvi.gov.tr/'
      }
    }
  },

  // 1b. Toplantı, Yönetim ve İş Görüşmeleri (Müdür, Veli, Kurul vb.)
  {
    matcher: (l) => l.includes('toplantı') || (l.includes('müdür') && !l.includes('borç') && !l.includes('öde')) || l.includes('veli görüşme') || l.includes('öğretmenler kurul'),
    inference: {
      domain: 'yonetim_toplanti',
      hazirlikZamani: 'Toplantıdan 30 Dakika Önce',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'Toplantı gündem maddelerini ve görüşülecek konuları hazırla',
        'Gerekli evrak, dosya veya rapor çıktılarını hazır bulundur',
        'Gündemle ilgili geçmiş notları gözden geçir'
      ],
      akilliFisilti: '🤝 Toplantı öncesi gündem maddelerini ve evrakları gözden geçirmek faydalı olacaktır.'
    }
  },

  // 2. Uçak Yolculuğu / Uçuş / Seyahat
  {
    matcher: (l) => l.includes('uçak') || l.includes('uçuş') || l.includes('havaliman') || l.includes('bilet al') || l.includes('havaalanı'),
    inference: {
      domain: 'ucak_seyahat',
      hazirlikZamani: 'Uçuştan 24 Saat Önce',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Online check-in yap ve biniş kartını cüzdana kaydet',
        'Kimlik veya pasaportun geçerlilik süresini teyit et',
        'Kabin bagajı sıvı kısıtlamalarına dikkat et (100ml)',
        'Uçuştan en az 2 saat önce havalimanında olacak şekilde çıkış saatini ayarla'
      ],
      akilliFisilti: '✈️ 24 saat kala online check-in açılır. Koltuğunuzu seçmeyi unutmayın.'
    }
  },

  // 3. Araç Muayenesi (TÜVTÜRK)
  {
    matcher: (l) => l.includes('araç muayene') || l.includes('tüvtürk') || l.includes('araba muayene') || (l.includes('muayene') && l.includes('araç')),
    inference: {
      domain: 'arac_muayene',
      hazirlikZamani: '2 Gün Önce 14:00',
      hazirlikSaatOncesi: 48,
      oncedenYapilacaklar: [
        'Trafik sigortası poliçesi güncel mi?',
        'MTV veya HGS/OGS trafik cezası borcu sorgula (Borç varsa muayene yapılmaz)',
        'Yangın tüpü, ilk yardım çantası ve 2 adet reflektör bagajda mı?',
        'Tüm far, sinyal, stop ve plaka aydınlatmalarını yakıp kontrol et'
      ],
      akilliFisilti: '🚗 Borcu olan araçlar muayeneye alınmaz. Borç sorgulamasını mutlaka önceden yapın.',
      oneriAksiyonu: {
        baslik: 'TÜVTÜRK Randevu & Borç Sorgula',
        url: 'https://www.tuvturk.com.tr/'
      }
    }
  },

  // 4. Doktor / Tahlil / Kan Verme Randevusu
  {
    matcher: (l) => (l.includes('kan') && (l.includes('tahlil') || l.includes('verme'))) || l.includes('aç karnına') || l.includes('dahiliye') || l.includes('ultrason') || l.includes('check-up'),
    inference: {
      domain: 'saglik_tahlil',
      hazirlikZamani: '12 Saat Önce (Akşam 22:00)',
      hazirlikSaatOncesi: 12,
      oncedenYapilacaklar: [
        'Akşam 22:00’den itibaren yiyecek tüketimini durdur (10-12 saat açlık gereklidir)',
        'Sadece az miktarda su tüketilebilir, şekerli ve kafeinli içecek içme',
        'Düzenli kullandığın ilaçlar varsa doktora danışmadan kesme',
        'Eski tahlil ve epikriz sonuçlarını yanına al'
      ],
      akilliFisilti: '🩸 Kan tahlilleri için en az 10-12 saatlik açlık şarttır.'
    }
  },

  // 5. İş Mülakatı / Kritik Müşteri Görüşmesi
  {
    matcher: (l) => l.includes('mülakat') || l.includes('iş görüşme') || l.includes('sunum') || l.includes('demo yap'),
    inference: {
      domain: 'is_mulakat',
      hazirlikZamani: 'Görüşmeden 3 Saat Önce',
      hazirlikSaatOncesi: 3,
      oncedenYapilacaklar: [
        'Şirketin son duyurularını ve ürünlerini gözden geçir',
        'Güncel özgeçmiş (CV) ve portfolyo linklerini hazırla',
        'Online görüşme ise kamera, mikrofon ve arka planı test et',
        'Görüşme sonunda sorulacak 2 akıllı soru hazırla'
      ],
      akilliFisilti: '💼 Görüşme öncesi kısa bir şirket taraması ve soru listesi özgüveninizi artırır.'
    }
  },

  // 6. Müfettiş / Resmi Kurum Evrak Denetimi
  {
    matcher: (l) => l.includes('müfettiş') || l.includes('denetim') || l.includes('sayıştay') || l.includes('maliye') || l.includes('teftiş'),
    inference: {
      domain: 'kurumsal_denetim',
      hazirlikZamani: '1 Gün Önce 16:00',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'İmza sirküleri, karar defteri ve yetki belgelerini hazırla',
        'Son döneme ait fatura ve onaylı evrak klasörlerini masaya çıkar',
        'Dijital yedekleri harici diske al',
        'Karşılama ve toplantı odası düzenini sağla'
      ],
      akilliFisilti: '📁 Denetim öncesi eksik imzalı evrak kalmadığından emin olun.'
    }
  },

  // 7. Kombi / Kalorifer Arızası veya Su Basıncı
  {
    matcher: (l) => l.includes('kombi') || (l.includes('petek') && l.includes('ısınmıyor')) || l.includes('bar düştü') || l.includes('kombi su'),
    inference: {
      domain: 'kombi_bakim',
      hazirlikZamani: 'Hemen',
      hazirlikSaatOncesi: 0,
      oncedenYapilacaklar: [
        'Kombi altındaki manometre ibresini kontrol et (1.2 - 1.5 Bar olmalı)',
        'Basınç 1 barın altındaysa alt doldurma musluğunu yavaşça açarak su bas',
        'Isınmayan peteklerin purjör anahtarıyla havasını al',
        'Filtre tıkanıklığı veya hata kodu (E01, F5 vb.) varsa not al'
      ],
      akilliFisilti: '🔧 Kombi barı 1.0’ın altına düştüğünde cihaz korumaya geçer.'
    }
  },

  // 8. Kışlık / Yazlık Lastik Değişimi
  {
    matcher: (l) => l.includes('lastik') && (l.includes('değiş') || l.includes('kışlık') || l.includes('yazlık') || l.includes('balans')),
    inference: {
      domain: 'lastik_degisimi',
      hazirlikZamani: 'Randevu Günü 08:30',
      hazirlikSaatOncesi: 3,
      oncedenYapilacaklar: [
        'Lastik otelinde veya depodaki lastikleri kontrol et',
        'Şifreli bijon anahtarını torpidoya veya bagaja koy',
        'Değişim sonrası balans ayarı ve hava basınçlarını teyit et',
        'Çıkan lastiklerin poşetlenip etiketlendiğini kontrol et'
      ],
      akilliFisilti: '🛞 Şifreli bijon anahtarı olmadan servis lastikleri sökemez.'
    }
  },

  // 9. Ev Taşıma / Nakliyat
  {
    matcher: (l) => l.includes('taşın') || l.includes('nakliyat') || l.includes('ev taşı'),
    inference: {
      domain: 'ev_tasima',
      hazirlikZamani: '3 Gün Önce',
      hazirlikSaatOncesi: 72,
      oncedenYapilacaklar: [
        'Elektrik, su, doğalgaz ve internet abonelik nakillerini başlat',
        'Kırılacak eşyalar için koli ve balonlu naylon temin et',
        'Bina yönetimine asansörlü taşıma için bilgi ver',
        'Değerli eşya ve takıları ayrı özel bir çantada kendin taşı'
      ],
      akilliFisilti: '📦 İnternet ve elektrik nakil randevuları 2-3 gün sürebilir.'
    }
  }
];

// src/utils/predictiveGraph.ts dosyasına eklenecek yeni yaşam alanları:
export const EXPANDED_LIFE_DOMAINS = [
  // 1. Tapu & Gayrimenkul
  {
    matcher: (l: string) => l.includes('tapu') || l.includes('ev sat') || l.includes('rayiç'),
    inference: {
      domain: 'gayrimenkul_tapu',
      hazirlikZamani: '1 Gün Önce 14:00',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'DASK deprem sigortası poliçesi güncel mi?',
        'Belediyeden emlak beyan değeri (rayiç) belgesi al',
        'Döner sermaye ve tapu harcı SMS kodunu bekle ve öde',
        'Kimlik asılları ve tapu senedini dosyala'
      ],
      akilliFisilti: '💡 Tapu randevusu öncesi döner sermaye harcının yatırılması zorunludur.'
    }
  },
  // 2. Ehliyet & Sürücü Belgesi
  {
    matcher: (l: string) => l.includes('ehliyet') || l.includes('sürücü belgesi'),
    inference: {
      domain: 'ehliyet_yenileme',
      hazirlikZamani: '1 Gün Önce 16:00',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Aile hekiminden "Sürücü Olur" sağlık raporu al',
        'Vergi dairesi/banka üzerinden vakıf ve değerli kağıt bedelini yatır',
        'Son 6 ayda çekilmiş 1 adet biyometrik fotoğraf hazırla',
        'Eski sürücü belgesi ve kimlik kartını yanına al'
      ],
      akilliFisilti: '💡 Sağlık raporu e-Rapor sistemine işlenmeden nüfus müdürlüğü işlem yapmaz.'
    }
  },
  // 3. Nikah & Evlilik İşlemleri
  {
    matcher: (l: string) => l.includes('nikah') || l.includes('evlilik başvuru'),
    inference: {
      domain: 'nikah_evlilik',
      hazirlikZamani: '2 Gün Önce',
      hazirlikSaatOncesi: 48,
      oncedenYapilacaklar: [
        'Sağlık ocağından evlilik kan tahlili ve sağlık raporunu tamamla',
        'Çiftlerin 4\'er adet vesikalık fotoğrafını ayır',
        'Nüfus kayıt örneği ve ikametgah belgelerini e-Devlet\'ten çıkart',
        'Nikah şahitlerinin T.C. kimlik numaralarını hazırla'
      ],
      akilliFisilti: '💡 Evlilik sağlık raporu kan tahlili sonuçları 1-2 gün sürebilir.'
    }
  },
  // 4. Kasko & Sigorta Yenileme
  {
    matcher: (l: string) => l.includes('kasko') || l.includes('sigorta yenile'),
    inference: {
      domain: 'sigorta_kasko',
      hazirlikZamani: '3 Gün Önce',
      hazirlikSaatOncesi: 72,
      oncedenYapilacaklar: [
        'Mevcut hasarsızlık indirim basamağını teyit et',
        'İMM (İhtiyari Mali Mesuliyet) limitinin sınırsız olduğunu doğrula',
        'Orijinal cam değişimi ve yetkili servis klozu olup olmadığını incele',
        'En az 3 farklı şirketten teklif alıp karşılaştır'
      ],
      akilliFisilti: '💡 Poliçe bitiş gününden önce yenilenmeyen kaskolarda hasarsızlık hakkı kaybolabilir.'
    }
  },
  // 5. Noter & Vekaletname
  {
    matcher: (l: string) => l.includes('noter') || l.includes('vekalet'),
    inference: {
      domain: 'noter_hukuk',
      hazirlikZamani: '2 Saat Önce',
      hazirlikSaatOncesi: 2,
      oncedenYapilacaklar: [
        'Vekalet verilecek kişinin T.C. kimlik no ve tam adını not al',
        'İşlem konusu taşınmaz veya araç ise ruhsat/tapu fotokopisini al',
        'T.C. kimlik kartının fiziksel olarak yanında olduğunu doğrula'
      ],
      akilliFisilti: '💡 Vekalet verilecek kişinin bilgileri harfiyen kimlikteki gibi olmalıdır.'
    }
  },

  // 6. Sağlık: Endoskopi & Kolonoskopi
  {
    matcher: (l: string) => l.includes('endoskopi') || l.includes('kolonoskopi'),
    inference: {
      domain: 'saglik_endoskopi',
      hazirlikZamani: '12 Saat Önce (Önceki Akşam 20:00)',
      hazirlikSaatOncesi: 12,
      oncedenYapilacaklar: [
        'En az 8-12 saat boyunca katı gıda tüketimini tamamen kes',
        'Aspirin/kan sulandırıcı kullanıyorsan doktor onayıyla kesildiğini teyit et',
        'İşlem sonrası sedasyon nedeniyle araç kullanamayacağın için refakatçi ayarla',
        'Önceki mide/bağırsak raporları ve tahlil sonuçlarını dosyala'
      ],
      akilliFisilti: '💡 Sedasyon (uyutma) uygulanacağı için işlem sonrası araç kullanılamaz; refakatçi zorunludur.'
    }
  },

  // 7. Sağlık: Göz Muayenesi & Göz Dibi
  {
    matcher: (l: string) => l.includes('göz muayen') || l.includes('göz dibi') || l.includes('damlalı muayene'),
    inference: {
      domain: 'saglik_goz',
      hazirlikZamani: '1 Gün Önce 20:00',
      hazirlikSaatOncesi: 14,
      oncedenYapilacaklar: [
        'Kontakt lens kullanıyorsan en az 24 saat önceden çıkar',
        'Damlalı muayene sonrası oluşacak ışık hassasiyeti için güneş gözlüğü hazırla',
        'Mevcut gözlük ve eski reçetelerini çantana koy',
        'Muayene sonrası araç kullanmamak için toplu taşıma veya refakatçi planla'
      ],
      akilliFisilti: '💡 Göz bebeğini büyüten damla sonrası 4-6 saat bulanık görme oluşur, araç kullanmayın.'
    }
  },

  // 8. Sağlık: MR (Manyetik Rezonans) & Tomografi
  {
    matcher: (l: string) => l.includes(' mr') || l.includes('emar') || l.includes('tomografi'),
    inference: {
      domain: 'saglik_mr',
      hazirlikZamani: '6 Saat Önce',
      hazirlikSaatOncesi: 6,
      oncedenYapilacaklar: [
        'Üzerindeki tüm metal eşyaları, takıları, saat ve tokayı çıkar',
        'Vücutta kalp pili, protez, platin veya şarapnel parçası varsa görevliye bildir',
        'İlaçlı (kontrastlı) çekim yapılacaksa son böbrek (kreatinin) tahlilini hazırla',
        'En az 4-6 saatlik açlık kuralına uy'
      ],
      akilliFisilti: '💡 Manyetik alana metal ve manyetik kartlarla girilmesi kesinlikle yasaktır.'
    }
  },

  // 9. Sağlık: İmplant & Diş Cerrahisi
  {
    matcher: (l: string) => l.includes('implant') || l.includes('diş cerrahi') || l.includes('20lik diş'),
    inference: {
      domain: 'saglik_implant',
      hazirlikZamani: '1 Gün Önce 18:00',
      hazirlikSaatOncesi: 16,
      oncedenYapilacaklar: [
        'Hekim kontrolünde kan sulandırıcı ilaç kısıtlamasını sağla',
        'Operasyon sonrası ilk 24 saat için buz jeli / kompres hazırla',
        'Operasyon günü için yumuşak ve ılık tüketilecek çorba/püre menüsü hazırla',
        'Kullanılacak antibiyotik ve ağrı kesicileri önceden temin et'
      ],
      akilliFisilti: '💡 Cerrahi müdahale öncesi kan sulandırıcı ilaçlar hekim izni olmadan kesilmemelidir.'
    }
  },

  // 10. Sağlık: Ameliyat & Operasyon Hazırlığı
  {
    matcher: (l: string) => l.includes('ameliyat') || l.includes('operasyon') || l.includes('hastane yatış'),
    inference: {
      domain: 'saglik_ameliyat',
      hazirlikZamani: 'Önceki Gece 00:00',
      hazirlikSaatOncesi: 8,
      oncedenYapilacaklar: [
        'Gece 00:00 itibarıyla su dahi içilmemeli (mutlak anestezi açlığı)',
        'Anestezi onay onam formunu ve tahlil dosyasını çantaya koy',
        'Hastane yatışı için önden düğmeli rahat kıyafet ve terlik hazırla',
        'Refakatçi olacak yakınının bilgilerini ve iletişimini teyit et'
      ],
      akilliFisilti: '💡 Genel anestezi öncesi en ufak bir yudum su dahi operasyonun ertelenmesine yol açar.'
    }
  },

  // 11. Taşıt: Egzoz Gazı Emisyon Ölçümü
  {
    matcher: (l: string) => l.includes('egzoz') || l.includes('emisyon'),
    inference: {
      domain: 'tasit_egzoz',
      hazirlikZamani: 'Randevu Öncesi 1 Saat',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'Araç tescil belgesini (ruhsat) hazır bulundur',
        'Katalitik konvertör ve susturucuda delik/kaçak olmadığını teyit et',
        'Ölçüm istasyonuna girmeden önce motoru çalışma sıcaklığına getir (ısınmış motor)',
        'E-Devletten önceki egzoz emisyon pulu geçerlilik tarihini doğrula'
      ],
      akilliFisilti: '💡 Egzoz emisyon ölçümü olmadan periyodik TÜVTÜRK muayenesi ağır kusur sayılır.'
    }
  },

  // 12. Taşıt: Akü Kontrolü & Değişimi
  {
    matcher: (l: string) => l.includes('akü') || l.includes('aku') || l.includes('marş basm'),
    inference: {
      domain: 'tasit_aku',
      hazirlikZamani: 'Servis Öncesi 2 Saat',
      hazirlikSaatOncesi: 2,
      oncedenYapilacaklar: [
        'Akü kutup başlarında oksitlenme ve korozyon olup olmadığını incele',
        'Voltmetre ile şarj dinamosunun alternatör voltajını (13.8 - 14.4V) ölçtür',
        'Aracın Start-Stop özelliği varsa AGM/EFB uyumlu akü modeli seç',
        'Eski akünün depozito bedelini yeni fiyattan düşür'
      ],
      akilliFisilti: '💡 4 yıldan eski aküler kış soğuklarında aniden voltaj bırakıp yolda bırakabilir.'
    }
  },

  // 13. Taşıt: Fren Balata & Disk Değişimi
  {
    matcher: (l: string) => l.includes('balata') || l.includes('fren disk') || l.includes('fren ötüyor'),
    inference: {
      domain: 'tasit_balata',
      hazirlikZamani: '1 Gün Önce',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Ön ve arka balataların aşınma payını (3 mm altı kritik) kontrol ettir',
        'Fren hidrolik yağının nem oranını ölçtür (2 yılda bir değişim)',
        'Değişim sonrası ilk 200 km sert ve ani frenden kaçın (rodaj süresi)',
        'Fren disklerinde fatura/çizik varsa taşlama veya değişim kararı al'
      ],
      akilliFisilti: '💡 Yeni takılan fren balatalarının diske alışması için ilk 200 km ani frenden kaçının.'
    }
  },

  // 14. Donanım & Enerji: Güneş Paneli Bakımı
  {
    matcher: (l: string) => l.includes('güneş paneli') || l.includes('solar panel') || l.includes('inverter'),
    inference: {
      domain: 'enerji_gunes_paneli',
      hazirlikZamani: 'Sabah Erken 07:00',
      hazirlikSaatOncesi: 2,
      oncedenYapilacaklar: [
        'Temizliği sadece sabah erken veya akşam serinliğinde şebeke kapalıyken yap',
        'Saf su ve yumuşak mikrofiber fırça kullan (asla kimyasal sıkma)',
        'İnverter hata kayıtlarını ve günlük kWh üretim grafiğini incele',
        'Mevsimsel açı ayarı (kışın dik, yazın yatay açı) mekanizmasını kontrol et'
      ],
      akilliFisilti: '💡 Güneş panelleri sıcakken soğuk suyla yıkanırsa termal şokla hücreler çatlayabilir.'
    }
  },

  // 15. Donanım: Su Arıtma Cihazı Filtre Değişimi
  {
    matcher: (l: string) => l.includes('su arıtma') || l.includes('arıtıcı filtre') || l.includes('membran'),
    inference: {
      domain: 'donanim_su_aritma',
      hazirlikZamani: 'Değişim Günü 10:00',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'Sediment, granül karbon ve blok karbon ön filtrelerini sırasıyla tak',
        'Filtre değişiminden sonra su deposunu açmadan ilk 10 dakika durulama suyu akıt',
        'TDS metre ile çıkan arıtılmış suyun ppm değerini (20-60 ppm ideal) ölç',
        'Yeni filtre takıldıktan sonra ilk 2 depo suyu içme, lavaboya tahliye et'
      ],
      akilliFisilti: '💡 Yeni takılan su arıtma filtrelerinde ilk 2 depo su tüketilmeden lavaboya dökülmelidir.'
    }
  },

  // 16. Bürokrasi & Hukuk: Veraset İlamı & İntikal
  {
    matcher: (l: string) => l.includes('veraset') || l.includes('mirasçılık') || l.includes('intikal'),
    inference: {
      domain: 'hukuk_veraset',
      hazirlikZamani: '2 Gün Önce',
      hazirlikSaatOncesi: 48,
      oncedenYapilacaklar: [
        'Noterden veya Sulh Hukuk Mahkemesinden mirasçılık belgesi (veraset ilamı) al',
        'Vefat tarihinden itibaren 4 ay içinde Veraset ve İntikal Vergisi beyannamesini ver',
        'Tapu dairesi için taşınmazların belediye emlak borçsuzluk yazılarını topla',
        'Bankalardaki mevduat tespiti için vergi dairesi ilişik kesme yazısını hazırla'
      ],
      akilliFisilti: '💡 Vefat tarihinden itibaren 4 ay içinde veraset ve intikal vergisi beyannamesi verilmelidir.'
    }
  },

  // 17. Bürokrasi: İkametgah & Adres Beyanı
  {
    matcher: (l: string) => l.includes('ikametgah') || l.includes('adres beyan') || l.includes('nüfus adres'),
    inference: {
      domain: 'burokrasi_ikametgah',
      hazirlikZamani: '1 Gün Önce 15:00',
      hazirlikSaatOncesi: 20,
      oncedenYapilacaklar: [
        'Taşınma tarihinden itibaren 20 iş günü yasal süresini geçirme',
        'Adınıza kayıtlı elektrik, su, doğalgaz faturası veya kira kontratını hazırla',
        'Birlikte oturulacaksa ev sahibinin veya ana hak sahibinin muvafakatini al',
        'e-Devlet üzerinden mobil imza veya NVİ randevusuyla beyanı tamamla'
      ],
      akilliFisilti: '💡 Adres değişikliğini 20 iş günü içinde bildirmeyenlere idari para cezası uygulanır.'
    }
  },

  // 18. Hukuk: Tahliye Taahhütnamesi
  {
    matcher: (l: string) => l.includes('tahliye taahhüt') || l.includes('tahliye taahhüdü'),
    inference: {
      domain: 'hukuk_tahliye',
      hazirlikZamani: 'İmza Öncesi 1 Gün',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Taahhütname tanzim (imza) tarihinin kira sözleşmesinden SONRAKİ bir gün olduğunu teyit et',
        'Tahliye tarihini gün, ay ve yıl olarak net biçimde yaz',
        'Kiracının kendi el yazısıyla ad-soyad ve imzasını al (mümkünse noter onaylı yap)',
        'Taahhütname metninde taşınmazın tam adres ve bağımsız bölüm numarasını doğrula'
      ],
      akilliFisilti: '💡 Kira sözleşmesiyle aynı tarihte imzalanan tahliye taahhütnameleri yargıda geçersiz sayılabilir.'
    }
  },

  // 19. Bürokrasi: Adli Sicil & Sabıka Kaydı
  {
    matcher: (l: string) => l.includes('sabıka') || l.includes('adli sicil') || l.includes('arşiv kaydı'),
    inference: {
      domain: 'burokrasi_adli_sicil',
      hazirlikZamani: '1 Saat Önce',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'e-Devletten belgenin nereye verileceğini (Resmi / Özel / Yurt Dışı) doğru seç',
        'Yurt dışı vize/konsolosluk içinse mutlaka "Apostilli" seçeneğini işaretle',
        'Barkodlu ve karekodlu PDF çıktısını indirip doğruluğunu test et',
        'Arşiv kaydı görünüyorsa adli sicil silinme başvuru dilekçesi hazırla'
      ],
      akilliFisilti: '💡 Yurt dışı vize ve konsolosluk başvurularında adli sicil kaydı apostil şerhli istenmektedir.'
    }
  },

  // 20. Finans: Kira Gelir Vergisi (Kira Beyannamesi)
  {
    matcher: (l: string) => l.includes('kira beyan') || l.includes('kira gelir vergi') || l.includes('kira vergi'),
    inference: {
      domain: 'finans_kira_beyani',
      hazirlikZamani: '1 Hafta Önce',
      hazirlikSaatOncesi: 168,
      oncedenYapilacaklar: [
        'GİB Hazır Beyan Sisteminden yıllık toplam kira tahsilatını kontrol et',
        'Mesken kira istisna haddini (yıllık muafiyet) aşıp aşmadığını kıyasla',
        'Gerçek gider mi yoksa %15 götürü gider yöntemi mi seçeceğini belirle',
        '1. taksit ödemesini Mart ayı sonuna kadar tamamla'
      ],
      akilliFisilti: '💡 İstisna haddini aşan konut kira gelirlerinin Mart ayı sonuna kadar beyan edilmesi zorunludur.'
    }
  },

  // 21. Finans: Apartman & Site Aidatı
  {
    matcher: (l: string) => l.includes('aidat') || l.includes('site aidat') || l.includes('apartman aidat'),
    inference: {
      domain: 'finans_aidat',
      hazirlikZamani: 'Vade Günü 10:00',
      hazirlikSaatOncesi: 2,
      oncedenYapilacaklar: [
        'Banka havalesi açıklamasına "Daire No - İlgili Ay Aidatı" yazmayı unutma',
        'Geciken aidatlarda kanuni %5 aylık gecikme tazminatını hesaba kat',
        'Yönetim kurulu işletme projesi veya genel kurul karar tutanağını incele',
        'Ödeme dekontunu dijital olarak arşivle'
      ],
      akilliFisilti: '💡 Geciken apartman/site aidatlarına yasa gereği aylık %5 kanuni gecikme tazminatı işler.'
    }
  },

  // 22. Finans: Kredi Kartı Ekstresi & Borcu
  {
    matcher: (l: string) => l.includes('kredi kart') || l.includes('kart borcu') || l.includes('ekstre'),
    inference: {
      domain: 'finans_kredi_karti',
      hazirlikZamani: 'Son Ödeme Günü 12:00',
      hazirlikSaatOncesi: 6,
      oncedenYapilacaklar: [
        'Sadece asgari tutarı değil, kalan dönem borcunun tamamını kapat',
        'Son ödeme saati (genellikle 23:59) öncesinde hesaba bakiye aktar',
        'Yurt dışı veya şüpheli çekim harcaması olup olmadığını incele',
        'Gelecek ay taksit yükünü ve kalan limit durumunu gözden geçir'
      ],
      akilliFisilti: '💡 Sadece asgari tutarın ödenmesi kalan bakiyeye en yüksek akdi faizin işlemesine yol açar.'
    }
  },

  // 23. Finans: İcra Takibi & Ödeme Emri
  {
    matcher: (l: string) => l.includes('icra') || l.includes('ödeme emri') || l.includes('haciz'),
    inference: {
      domain: 'finans_icra',
      hazirlikZamani: 'Tebligat Sonrası 2. Gün',
      hazirlikSaatOncesi: 48,
      oncedenYapilacaklar: [
        'Tebligat zarfının teslim alındığı tarihi not et (7 günlük itiraz süresi başlar)',
        'e-Devlet UYAP Vatandaş portalından icra dosyasının detayını ve dayanak evrakını incele',
        'Borç haksız ise 7 gün içinde İcra Dairesine yazılı itiraz dilekçesi ver',
        'Borç kabul edilecekse icra dairesi IBAN hesabına dosya kapama harcıyla öde'
      ],
      akilliFisilti: '💡 İlamsız icra ödeme emrine tebliğden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir.'
    }
  },

  // 24. Eğitim: Zümre Öğretmenler Kurulu
  {
    matcher: (l: string) => l.includes('zümre') || l.includes('zumre'),
    inference: {
      domain: 'egitim_zumre',
      hazirlikZamani: '1 Gün Önce 16:00',
      hazirlikSaatOncesi: 18,
      oncedenYapilacaklar: [
        'Zümre gündem maddelerini ve önceki dönem karar tutanaklarını hazırla',
        'Ders başarı analizi ve ortak yazılı sınav tarihlerini belirle',
        'Tüm zümre öğretmenlerinin ıslak imzasını al',
        'Zümre tutanağını okul müdürlüğüne EBYS veya fiziki olarak onaya sun'
      ],
      akilliFisilti: '💡 Zümre kararları okul idaresine teslim edilip onaylanmadan yürürlüğe girmez.'
    }
  },

  // 25. Eğitim: KPSS & ÖSYM Sınavı
  {
    matcher: (l: string) => l.includes('kpss') || l.includes('ösym') || l.includes('ales') || l.includes('yks'),
    inference: {
      domain: 'egitim_kpss_sinav',
      hazirlikZamani: '1 Gün Önce 17:00',
      hazirlikSaatOncesi: 16,
      oncedenYapilacaklar: [
        'Renkli veya siyah-beyaz barkodlu Sınav Giriş Belgesi çıktısını al',
        'Fotoğraflı, T.C. kimlik numaralı T.C. Kimlik Kartının aslını çantana koy',
        'Sınav binasına saat 10:00 kapı kapanma kuralı nedeniyle en geç 09:30\'da ulaş',
        'Metal toka, takı, saat, bozuk para ve anahtarı evde bırak'
      ],
      akilliFisilti: '💡 ÖSYM sınavlarında saat 10:00\'dan sonra binalara kesinlikle aday alınmaz.'
    }
  },

  // 26. Eğitim & Kurum: Müfettiş Denetimi
  {
    matcher: (l: string) => l.includes('müfettiş') || l.includes('mufettis') || l.includes('bakanlık denetim'),
    inference: {
      domain: 'kurum_mufettis',
      hazirlikZamani: '1 Gün Önce 15:00',
      hazirlikSaatOncesi: 20,
      oncedenYapilacaklar: [
        'Yıllık planlar, ders defterleri ve zümre tutanaklarını dosyala',
        'Yazılı sınav kağıtları, cevap anahtarları ve puan baremlerini hazırla',
        'Sosyal kulüp ve rehberlik evraklarının ıslak imzalı nüshalarını kontrol et',
        'Sınıf yoklama ve performans değerlendirme ölçeklerini düzenle'
      ],
      akilliFisilti: '💡 Müfettiş denetimi öncesi tüm evraklarda ıslak imza ve tarih eksiksiz olmalıdır.'
    }
  },

  // 27. Kurum: Rapor Teslimi & Resmi Evrak
  {
    matcher: (l: string) => l.includes('rapor teslim') || l.includes('üst yazı') || l.includes('resmi evrak'),
    inference: {
      domain: 'kurum_rapor_teslim',
      hazirlikZamani: 'Teslim Öncesi 2 Saat',
      hazirlikSaatOncesi: 2,
      oncedenYapilacaklar: [
        'İdareye hitaben yazılan üst yazıyı ve eklerini kontrol et',
        'Raporun her sayfasına parafe, son sayfasına ıslak imza at',
        'EBYS üzerinden evrak kayıt veya gelen evrak barkod numarasını al',
        'Teslim-tesellüm tutanağının bir nüshasını kendi arşivine kaldır'
      ],
      akilliFisilti: '💡 Resmi raporların tesliminde mutlaka EBYS sayı/barkod numarası veya teslim tutanağı alınmalıdır.'
    }
  },

  // 28. Sosyal & Tören: Düğün Organizasyonu
  {
    matcher: (l: string) => l.includes('düğün') || l.includes('dugun') || l.includes('kına gecesi'),
    inference: {
      domain: 'sosyal_dugun',
      hazirlikZamani: '3 Gün Önce',
      hazirlikSaatOncesi: 72,
      oncedenYapilacaklar: [
        'Nikah şahitlerinin ve evlenen çiftin T.C. kimlik asıllarını hazırla',
        'Gelinlik, damatlık ve aksesuarların son provasını tamamla',
        'Salon, müzisyen, fotoğrafçı ve servis koordinatörüyle akışı teyit et',
        'Düğün günü acil durum iğne-iplik ve ilk yardım çantasını oluştur'
      ],
      akilliFisilti: '💡 Düğün günü nikah memuru ve şahitlerin kimlik asıllarının hazır bulundurulması şarttır.'
    }
  },

  // 29. Sosyal: Taziye & Vefat İşlemleri
  {
    matcher: (l: string) => l.includes('taziye') || l.includes('cenaze') || l.includes('vefat'),
    inference: {
      domain: 'sosyal_taziye',
      hazirlikZamani: 'İlk 2 Saat',
      hazirlikSaatOncesi: 2,
      oncedenYapilacaklar: [
        'Belediye tabipliğinden defin ruhsatı ve ölüm belgesi işlemlerini başlat',
        'Cenaze nakil aracı, mezarlık yeri ve gasilhane randevusunu organize et',
        'Sela, taziye yeri ve yakınlara bilgilendirme mesajını paylaş',
        'Taziye evi ikram ve oturma düzenini koordine et'
      ],
      akilliFisilti: '💡 Cenaze işlemleri için belediye tabipliğinden defin ruhsatı alınması zorunludur.'
    }
  },

  // 30. Sosyal & Sağlık: Sünnet Operasyonu
  {
    matcher: (l: string) => l.includes('sünnet') || l.includes('sunnet'),
    inference: {
      domain: 'saglik_sunnet',
      hazirlikZamani: '1 Gün Önce 18:00',
      hazirlikSaatOncesi: 18,
      oncedenYapilacaklar: [
        'Operasyon öncesi çocuk cerrahı/üroloğundan pıhtılaşma (kanama zamanı) tahlili al',
        'Cerrahi müdahale öncesi açlık süresi talimatına uy',
        'Operasyon sonrası için sünnet külodu ve pansuman solüsyonlarını temin et',
        'Ağrı kesici ve antibiyotik reçetesini önceden hazır bulundur'
      ],
      akilliFisilti: '💡 Cerrahi müdahale öncesi kanama/pıhtılaşma testlerinin tamamlanması hayati önem taşır.'
    }
  },

  // 31. Tüketici & Alışveriş: Kargo İadesi (Cayma Hakkı)
  {
    matcher: (l: string) => l.includes('kargo iade') || l.includes('iade kargo') || l.includes('ürün iade') || l.includes('cayma hakkı'),
    inference: {
      domain: 'tuketici_iade',
      hazirlikZamani: 'Kargo Öncesi 2 Saat',
      hazirlikSaatOncesi: 2,
      oncedenYapilacaklar: [
        'Mesafeli sözleşmeler gereği 14 günlük yasal cayma hakkı süresini kontrol et',
        'E-ticaret platformundan anlaşmalı iade kargo kodunu al',
        'Ürünün faturası, orijinal kutusu ve tüm aksesuarlarıyla eksiksiz paketle',
        'Kargo teslim fişini veya takip numarasını iade onaylanana kadar sakla'
      ],
      akilliFisilti: '💡 İnternet alışverişlerinde mesafeli sözleşmeler gereği 14 gün içinde gerekçesiz iade hakkı vardır.'
    }
  },

  // 32. Seyahat: Uçuş & Uçak Yolculuğu
  {
    matcher: (l: string) => l.includes('uçuş') || l.includes('ucus') || l.includes('uçak bilet') || l.includes('havalimanı'),
    inference: {
      domain: 'seyahat_ucak',
      hazirlikZamani: '24 Saat Önce',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Uçuştan 24 saat önce açılan online check-in işlemini yap ve biniş kartını al',
        'Kabin bagajındaki sıvıların 100 ml şeffaf kilitli poşette olduğunu doğrula',
        'Fotoğraflı T.C. kimlik kartı veya pasaportunun yanında olduğunu teyit et',
        'Yurt içi için 2 saat, yurt dışı için en az 3 saat önce havalimanında ol'
      ],
      akilliFisilti: '💡 Yurt içi uçuşlarda uçuştan en az 45 dakika önce bagaj ve biniş işlemleri kapanır.'
    }
  },

  // 33. Botanik: Orkide Bakımı (Asla akşam sulanmaz - Kök mantarı riski)
  {
    matcher: (l: string) => l.includes('orkide'),
    inference: {
      domain: 'botanik_orkide',
      hazirlikZamani: 'Sabah 09:30',
      hazirlikSaatOncesi: 0,
      oncedenYapilacaklar: [
        'Daldırma yöntemiyle oda sıcaklığındaki dinlenmiş suda 10-15 dk beklet',
        'Saksı harcının fazla suyunu tamamen süzdür (kök mantarını önle)',
        'Doğrudan yakıcı güneş almayan tül arkası aydınlık konuma yerleştir',
        'Gece köklerde nem kalmaması için sulamayı asla akşama bırakma'
      ],
      akilliFisilti: '🌸 Orkide gece kök mantarı yapabileceğinden daima sabah 09:30 serinliğinde daldırma yöntemiyle sulanmalıdır.',
      ikon: '🌸',
      renk: '#DCFCE7'
    }
  },

  // 34. Botanik: Kaktüs, Sukulent & Paşa Kılıcı
  {
    matcher: (l: string) => l.includes('kaktüs') || l.includes('kaktus') || l.includes('sukulent') || l.includes('paşa kılıcı') || l.includes('pasa kilici'),
    inference: {
      domain: 'botanik_kaktus',
      hazirlikZamani: 'Sabah 10:00 (2-3 Haftada Bir)',
      hazirlikSaatOncesi: 0,
      oncedenYapilacaklar: [
        'Toprağın tamamen kuruduğundan emin ol (parmak testi yap)',
        'Oda sıcaklığında dinlenmiş kireçsiz su kullan',
        'Gövdeye ve yaprak aralarına su değdirmeden doğrudan toprağa ver',
        'Saksı tabağında biriken suyu 15 dk sonra mutlaka dök'
      ],
      akilliFisilti: '🌵 Kaktüs ve sukulentler fazla suyu sevmez; sabah saatinde ve 2-3 haftada bir sulama idealdir.',
      ikon: '🌵',
      renk: '#DCFCE7'
    }
  },

  // 35. Botanik: Balkon Çiçekleri, Sardunya & Petunya (Akşam Serinliği)
  {
    matcher: (l: string) => l.includes('sardunya') || l.includes('petunya') || l.includes('balkon çiçe') || l.includes('saksı çiçe'),
    inference: {
      domain: 'botanik_sardunya',
      hazirlikZamani: 'Bugün 19:30',
      hazirlikSaatOncesi: 0,
      oncedenYapilacaklar: [
        'Güneş çekildikten sonra akşam serinliğinde sula (yaprak yanmasını önle)',
        'Yaprak ve çiçek taçlarına değil, doğrudan kök boğazına dök',
        'Kuruyan ve solan çiçek başlarını temizle (yeni tomurcuk teşviki)',
        'Saksı altlığındaki durgun suyu boşalt'
      ],
      akilliFisilti: '🌺 Sardunya ve balkon çiçekleri öğle sıcağında sulanırsa yaprakları yanar; akşam 19:30 serinliği idealdir.',
      ikon: '🌺',
      renk: '#DCFCE7'
    }
  },

  // 36. Botanik & Şive / Yöresel Ağız: Çiçek Sulama / Suvarma (Ege, Akdeniz, İç Anadolu, Doğu, Karadeniz)
  {
    matcher: (l: string) =>
      l.includes('suvar') || l.includes('sulayuver') || l.includes('sulayıver') || l.includes('sulayıve') ||
      l.includes('çiçee su') || l.includes('çiçeğe su') || l.includes('çiçek sula') || l.includes('çiçekleri sula') ||
      l.includes('boynunu bükmüş') || l.includes('çiçekler susamış') || l.includes('saksının dibi') ||
      l.includes('saksı sula') || l.includes('verive gari') || l.includes('su sal'),
    inference: {
      domain: 'botanik_cicek_sulama',
      hazirlikZamani: 'Bugün 19:30',
      hazirlikSaatOncesi: 0,
      oncedenYapilacaklar: [
        'Güneş yakmasın diye akşam serinliğinde (19:30-20:00) sulama yap',
        'Suyu doğrudan saksı toprağına dök, yapraklara su sıçratma',
        'Kök çürümesini önlemek için saksı altlığındaki fazla suyu 15 dk sonra dök',
        'Oda sıcaklığında dinlenmiş kireçsiz su tercih et'
      ],
      akilliFisilti: '🪴 Güneş yaprakları yakmasın ve kökler sıcaktan haşlanmasın diye sulama akşam 19:30 serinliğine planlandı.',
      ikon: '🪴',
      renk: '#DCFCE7'
    }
  }
];

// src/utils/predictiveGraph.ts içine eklenecek botanik kuralı
export const BOTANICAL_DIALECT_DOMAIN = {
  matcher: (l: string) => 
    // Şive ve varyasyon kalıpları
    /\b(çiçek|cicek|saksı|saksi|orkide|sardunya|kaktüs|kaktus|gül|bostan|petunya|bitki)\b/i.test(l) &&
    /\b(sula|sulama|suvar|suvarıver|suver|verive|dök|dok|kurudu|susamış|su sal|sulayuver|sulayıver|sulayıve|bakıve)\b/i.test(l),
  
  inference: (text: string, now: Date = new Date()): PredictiveInference => {
    const lower = text.toLowerCase();
    const currentHour = now.getHours();

    // 1. Orkide tespiti (Sabah sulanmalıdır)
    if (lower.includes('orkide')) {
      const target = new Date(now);
      if (currentHour >= 12) target.setDate(target.getDate() + 1); // Öğleden sonraysa yarına
      target.setHours(9, 30, 0, 0);

      return {
        domain: 'botanik_orkide',
        baslik: 'Orkide Sulama',
        zaman: currentHour >= 12 ? 'Yarın Sabah 09:30' : 'Bugün Sabah 09:30',
        tarih_iso: target.toISOString(),
        hazirlikZamani: 'Sabah Dinlenmiş Su',
        oncedenYapilacaklar: [
          'Köklerin grileştiğini kontrol et (Yeşilse sulama)',
          'Saksıyı oda sıcaklığında dinlenmiş suya 10 dk daldır',
          'Göbek kısmında su birikmemesine dikkat et'
        ],
        akilliFisilti: '💡 Orkide gece ıslak kalırsa kök çürümesi yapar; sabah sulanmalıdır.',
        sesliFisilti: 'Orkide gece ıslak kalmayı sevmez, yarın sabah 09:30 serinliğine kurdum.',
        ikon: '🌸',
        renk: '#F3E8FF'
      };
    }

    // 2. Genel veya Balkon Çiçekleri (Güneş Kuralı: Öğlen sulatılmaz, akşama alınır)
    const target = new Date(now);
    let zamanText = 'Bu Akşam 19:30';

    if (currentHour < 10) {
      // Sabah erken ise hemen sabah serinliğine
      target.setHours(8, 30, 0, 0);
      zamanText = 'Bugün 08:30';
    } else if (currentHour >= 20) {
      // Gece geç saatse yarın sabah serinliğine
      target.setDate(target.getDate() + 1);
      target.setHours(8, 30, 0, 0);
      zamanText = 'Yarın Sabah 08:30';
    } else {
      // Öğlen veya ikindi ise akşam serinliğine
      target.setHours(19, 30, 0, 0);
      zamanText = 'Bu Akşam 19:30';
    }

    return {
      domain: 'botanik_sulama',
      baslik: 'Çiçekleri Sulama',
      zaman: zamanText,
      tarih_iso: target.toISOString(),
      oncedenYapilacaklar: [
        'Toprağın 2-3 cm kuruduğundan emin ol',
        'Suyu yapraklara değil doğrudan kök boğazına ver',
        'Saksı tabağındaki fazla suyu boşalt'
      ],
      akilliFisilti: '💡 Öğlen sıcağında sulama yaprakları yakar; en verimli vakit akşam serinliğidir.',
      sesliFisilti: 'Güneş yaprakları yakmasın diye sulama saatini akşam 19:30 serinliğine kurdum.',
      ikon: '🪴',
      renk: '#DCFCE7'
    };
  }
};

import { matchShortScenario } from './scenarioDatabase.ts';

/**
 * Kullanıcı girdisini analiz ederek gizli ön koşulları ve hazırlık adımlarını çıkarır.
 */
export function inferPredictiveActions(text: string, now: Date = new Date()): PredictiveInference | null {
  if (!text) return null;
  const lower = text.toLowerCase();

  let matched: PredictiveInference | null = null;

  // 0. Botanik & Şive Alanı Doğrudan Çözümlemesi
  if (BOTANICAL_DIALECT_DOMAIN.matcher(lower)) {
    matched = BOTANICAL_DIALECT_DOMAIN.inference(text, now);
  }

  // 1. Yeni Yaşam Alanları (Expanded Life Domains)
  if (!matched) {
    for (const pattern of EXPANDED_LIFE_DOMAINS) {
      if (pattern.matcher(lower)) {
        matched = { ...pattern.inference };
        break;
      }
    }
  }

  // 2. Temel Yaşam Alanları (Predictive Graph Patterns)
  if (!matched) {
    for (const pattern of PREDICTIVE_GRAPH_PATTERNS) {
      if (pattern.matcher(lower)) {
        matched = { ...pattern.inference };
        break;
      }
    }
  }

  // 3. Genişletilmiş Kısa Senaryo Veritabanından (Scenario Database) çıkarım yap
  if (!matched) {
    const shortMatch = matchShortScenario(text);
    if (shortMatch) {
      matched = {
        domain: shortMatch.id,
        hazirlikZamani: shortMatch.hazirlikZamani,
        hazirlikSaatOncesi: shortMatch.hazirlikSaatOncesi,
        oncedenYapilacaklar: shortMatch.oncedenYapilacaklar,
        akilliFisilti: shortMatch.akilliFisilti
      };
    }
  }

  if (matched) {
    const theme = getDomainTheme(matched.domain);
    if (!matched.ikon) matched.ikon = theme.ikon;
    if (!matched.renk) matched.renk = theme.renk;
    return matched;
  }

  return null;
}
