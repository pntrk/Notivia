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
  hazirlikZamani?: string; // Örn: "1 Gün Önce 16:00" veya "3 Saat Önce"
  hazirlikSaatOncesi?: number; // Ana etkinlikten kaç saat önce hatırlatılsın
  oncedenYapilacaklar: string[]; // Alt kontrol adımları
  akilliFisilti: string; // Kart üzerine eklenen rehberlik notu
  oneriAksiyonu?: {
    baslik: string;
    url?: string;
  };
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

import { matchShortScenario } from './scenarioDatabase.ts';

/**
 * Kullanıcı girdisini analiz ederek gizli ön koşulları ve hazırlık adımlarını çıkarır.
 */
export function inferPredictiveActions(text: string): PredictiveInference | null {
  if (!text) return null;
  const lower = text.toLowerCase();

  for (const pattern of PREDICTIVE_GRAPH_PATTERNS) {
    if (pattern.matcher(lower)) {
      return pattern.inference;
    }
  }

  // 2. Genişletilmiş Kısa Senaryo Veritabanından (Scenario Database) çıkarım yap
  const shortMatch = matchShortScenario(text);
  if (shortMatch) {
    return {
      domain: shortMatch.id,
      hazirlikZamani: shortMatch.hazirlikZamani,
      hazirlikSaatOncesi: shortMatch.hazirlikSaatOncesi,
      oncedenYapilacaklar: shortMatch.oncedenYapilacaklar,
      akilliFisilti: shortMatch.akilliFisilti
    };
  }

  return null;
}
