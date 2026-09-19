/**
 * Notivia Çok Aşamalı Süreç Zincirleri Motoru (Sequential Milestone Engine)
 * Karmaşık mesleki süreçleri (Adli tebligat, Beton kırım, Cerrahi pansuman-dikiş, Sınav okuma-eOkul, Kombi kaçak)
 * birbirini tetikleyen ardışık aşamalara dönüştürür.
 */

import { MilestoneChain, MilestoneStep } from '../types/notivia.ts';

export function detectMilestoneChain(text: string, baseDate: Date = new Date()): MilestoneChain | null {
  const lower = text.toLowerCase();

  // 1. HUKUK: UYAP Tebligat & Yasal İtiraz / İstinaf Zinciri
  if (lower.includes('tebligat') || lower.includes('tebliğ') || lower.includes('uyap tebligat') || lower.includes('istinaf süresi')) {
    const day0Iso = baseDate.toISOString();
    const day5 = new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    const day19 = new Date(baseDate.getTime() + 19 * 24 * 60 * 60 * 1000);
    const day20 = new Date(baseDate.getTime() + 20 * 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-law-1',
        order: 1,
        title: 'Tebligat İnceleme ve Süre Başlangıcı',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'Bugün',
        isCompleted: true,
        icon: '📩',
        description: 'Elektronik Tebligat Kanunu 7/a uyarınca posta kutusuna ulaştığı gün.'
      },
      {
        id: 'ms-law-2',
        order: 2,
        title: 'Yasal Tebliğ Sayılma Günü',
        targetOffsetDays: 5,
        targetDateIso: day5.toISOString(),
        targetText: '5 Gün Sonra',
        isCompleted: false,
        icon: '⚖️',
        description: 'Tebligatın 5. günün sonunda resmen tebliğ edilmiş sayıldığı tarih.'
      },
      {
        id: 'ms-law-3',
        order: 3,
        title: 'İstinaf / İtiraz Dilekçesi Son Teslim',
        targetOffsetDays: 19,
        targetDateIso: day19.toISOString(),
        targetText: '14 Gün Süre Sonu (19. Gün)',
        isCompleted: false,
        icon: '📝',
        description: 'UYAP üzerinden e-imzalı istinaf başvuru dilekçesinin mahkemeye sunulması.'
      },
      {
        id: 'ms-law-4',
        order: 4,
        title: 'Harç ve İstinaf Gider Avansı Tamamlama',
        targetOffsetDays: 20,
        targetDateIso: day20.toISOString(),
        targetText: '20. Gün',
        isCompleted: false,
        icon: '💳',
        description: 'Vezne / UYAP harç makbuzunun dosyaya eklenmesi ve derkenar teyidi.'
      }
    ];

    return {
      chainId: `chain-law-tebligat-${Date.now()}`,
      chainName: 'UYAP Tebligat & Yasal İtiraz Zinciri (7/a)',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  // 2. İNŞAAT & ŞANTİYE: Beton Dökümü & Kürleme & Kırım Testi Zinciri
  if (lower.includes('beton dök') || lower.includes('beton dökül') || lower.includes('küp numune') || lower.includes('kırım testi')) {
    const day0Iso = baseDate.toISOString();
    const day3 = new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    const day7 = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const day28 = new Date(baseDate.getTime() + 28 * 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-con-1',
        order: 1,
        title: 'Beton Dökümü & Küp/Silindir Numune Alımı',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'Bugün',
        isCompleted: true,
        icon: '🏗️',
        description: 'İrsaliye kontrolü, slump testi ve numunelerin etiketlenip küvet havuzuna alınması.'
      },
      {
        id: 'ms-con-2',
        order: 2,
        title: '3 Günlük Nem & Kürleme Sulaması',
        targetOffsetDays: 3,
        targetDateIso: day3.toISOString(),
        targetText: '3 Gün Boyunca',
        isCompleted: false,
        icon: '💧',
        description: 'Yüzey çatlaklarını önlemek için sabah ve akşam düzenli kür sulaması.'
      },
      {
        id: 'ms-con-3',
        order: 3,
        title: '7 Günlük 1. Laboratuvar Kırım Testi',
        targetOffsetDays: 7,
        targetDateIso: day7.toISOString(),
        targetText: '7. Gün 10:00',
        isCompleted: false,
        icon: '🧪',
        description: 'Tasarım dayanımının yaklaşık %70 mertebesine ulaşıldığının laboratuvar teyidi.'
      },
      {
        id: 'ms-con-4',
        order: 4,
        title: '28 Günlük Nihai Basınç Dayanım Raporu',
        targetOffsetDays: 28,
        targetDateIso: day28.toISOString(),
        targetText: '28. Gün',
        isCompleted: false,
        icon: '📊',
        description: 'Yapı Denetim ve Çevre Şehircilik EBİS sistemine nihai dayanım onayı.'
      }
    ];

    return {
      chainId: `chain-con-beton-${Date.now()}`,
      chainName: 'Beton Dökümü, Kürleme & EBİS Kırım Testi Zinciri',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  // 3. SAĞLIK & CERRAHİ: Operasyon / Pansuman / Dikiş Alma Zinciri
  if (lower.includes('ameliyat') || lower.includes('cerrahi') || lower.includes('implant') || lower.includes('dikiş') || lower.includes('operasyon')) {
    const day0Iso = baseDate.toISOString();
    const day2 = new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    const day7 = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const day30 = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-med-1',
        order: 1,
        title: 'Cerrahi Operasyon & Taburculuk',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'Bugün',
        isCompleted: true,
        icon: '🩺',
        description: 'Epikriz, order ve post-op antibiyotik/ağrı kesici kullanım protokolü.'
      },
      {
        id: 'ms-med-2',
        order: 2,
        title: '48 Saatlik İlk Pansuman & Dren Kontrolü',
        targetOffsetDays: 2,
        targetDateIso: day2.toISOString(),
        targetText: '48 Saat Sonra',
        isCompleted: false,
        icon: '🩹',
        description: 'Kesi hattında hiperemi, akıntı veya hematom kontrolü.'
      },
      {
        id: 'ms-med-3',
        order: 3,
        title: '7. Gün Dikiş Alma & Yara İyileşmesi',
        targetOffsetDays: 7,
        targetDateIso: day7.toISOString(),
        targetText: '7. Gün',
        isCompleted: false,
        icon: '✂️',
        description: 'Cerrahi dikişlerin alınması ve skar dokusu takibi.'
      },
      {
        id: 'ms-med-4',
        order: 4,
        title: '1. Ay Genel Kontrol & Patoloji Sonucu',
        targetOffsetDays: 30,
        targetDateIso: day30.toISOString(),
        targetText: '30 Gün Sonra',
        isCompleted: false,
        icon: '📋',
        description: 'Patoloji biyopsi raporunun sisteme düşmesi ve hekim değerlendirmesi.'
      }
    ];

    return {
      chainId: `chain-med-op-${Date.now()}`,
      chainName: 'Post-Op Klinik İyileşme & Dikiş Alma Zinciri',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  // 4. EĞİTİM: Yazılı Sınav & e-Okul Not Girişi Zinciri
  if (lower.includes('sınav yap') || lower.includes('yazılı yap') || lower.includes('sınav bitti') || lower.includes('vize okuma')) {
    const day0Iso = baseDate.toISOString();
    const day5 = new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    const day10 = new Date(baseDate.getTime() + 10 * 24 * 60 * 60 * 1000);
    const day12 = new Date(baseDate.getTime() + 12 * 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-edu-1',
        order: 1,
        title: 'Sınav Uygulaması & Evrak Tasnifi',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'Bugün',
        isCompleted: true,
        icon: '📚',
        description: 'Sınav kağıtlarının toplanması ve yoklama tutanağının imzalanması.'
      },
      {
        id: 'ms-edu-2',
        order: 2,
        title: 'Puanlama Baremi & Kağıt Okuma',
        targetOffsetDays: 5,
        targetDateIso: day5.toISOString(),
        targetText: '5 Gün İçinde',
        isCompleted: false,
        icon: '🖋️',
        description: 'Zümre cevap anahtarına göre yazılı kağıtlarının okunup puanlanması.'
      },
      {
        id: 'ms-edu-3',
        order: 3,
        title: 'e-Okul Not Girişi & Kazanım Analizi',
        targetOffsetDays: 10,
        targetDateIso: day10.toISOString(),
        targetText: 'Yasal 10. Gün (Son)',
        isCompleted: false,
        icon: '💻',
        description: 'MEB mevzuatı gereği 10 gün içinde e-Okul sistemine notların işlenmesi.'
      },
      {
        id: 'ms-edu-4',
        order: 4,
        title: 'Zümre Başkanına Arşiv Teslimi',
        targetOffsetDays: 12,
        targetDateIso: day12.toISOString(),
        targetText: '12. Gün',
        isCompleted: false,
        icon: '🗂️',
        description: 'Kağıtların, cevap anahtarının ve analiz çıktılarının idareye teslimi.'
      }
    ];

    return {
      chainId: `chain-edu-exam-${Date.now()}`,
      chainName: 'Yazılı Sınav, e-Okul Not Girişi & Zümre Teslim Zinciri',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  // 5. GENEL & DONANIM: Kombi / Su Tesisatı & 48 Saat Kaçak Testi Zinciri
  if (lower.includes('kombi') || lower.includes('su bas') || lower.includes('su arıtma filtre') || lower.includes('tesisat')) {
    const day0Iso = baseDate.toISOString();
    const day2 = new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    const day180 = new Date(baseDate.getTime() + 180 * 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-home-1',
        order: 1,
        title: 'Bakım / Su Basma / Filtre Değişimi',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'Bugün',
        isCompleted: true,
        icon: '🔧',
        description: 'Kombi basıncının 1.5 Bar seviyesine getirilmesi veya ön filtre değişimi.'
      },
      {
        id: 'ms-home-2',
        order: 2,
        title: '48 Saat Sonra Basınç Düşüşü & Kaçak Testi',
        targetOffsetDays: 2,
        targetDateIso: day2.toISOString(),
        targetText: '48 Saat Sonra',
        isCompleted: false,
        icon: '⏱️',
        description: 'Genleşme tankı veya tesisat kaçak kontrolü için bar göstergesi denetimi.'
      },
      {
        id: 'ms-home-3',
        order: 3,
        title: '6 Aylık Periyodik Filtre & Bakım Döngüsü',
        targetOffsetDays: 180,
        targetDateIso: day180.toISOString(),
        targetText: '6 Ay Sonra',
        isCompleted: false,
        icon: '🔄',
        description: 'Cihaz ömrünü korumak için 180 günlük bir sonraki periyodik kontrol.'
      }
    ];

    return {
      chainId: `chain-home-repair-${Date.now()}`,
      chainName: 'Ev Tesisat & 48 Saat Kaçak Testi Takip Zinciri',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  return null;
}
