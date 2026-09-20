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

  // 7. BİLİŞİM MÜHENDİSLİĞİ: SIEM Kurulumu, Korelasyon & Müşteri Sunum Zinciri
  if (
    (lower.includes('siem') || lower.includes('siemm') || lower.includes('soc')) &&
    (lower.includes('kurulum') || lower.includes('sunum') || lower.includes('poc') || lower.includes('artı') || lower.includes('kural') || lower.includes('müşteri'))
  ) {
    const day0Iso = baseDate.toISOString();
    const day2 = new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    const day4 = new Date(baseDate.getTime() + 4 * 24 * 60 * 60 * 1000);
    const day7 = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-it-1',
        order: 1,
        title: 'Log Kaynakları Entegrasyonu & Agent Kurulumu',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'Aşama 1 (Başlangıç)',
        isCompleted: true,
        icon: '🔌',
        description: 'Syslog, Firewall, Windows Event ve EDR log kaynaklarının SIEM sunucusuna yönlendirilmesi.'
      },
      {
        id: 'ms-it-2',
        order: 2,
        title: 'Parsing, Kural Seti & Korelasyon Alarmları',
        targetOffsetDays: 2,
        targetDateIso: day2.toISOString(),
        targetText: '2. Gün',
        isCompleted: false,
        icon: '⚙️',
        description: 'Normalizasyon, MITRE ATT&CK use-case kural altyapısı ve sahte alarm (False-Positive) filtreleri.'
      },
      {
        id: 'ms-it-3',
        order: 3,
        title: 'POC Test Raporu & Yönetici Özeti',
        targetOffsetDays: 4,
        targetDateIso: day4.toISOString(),
        targetText: '4. Gün',
        isCompleted: false,
        icon: '📊',
        description: 'Yakalanan güvenlik olayları, EPS performans grafikleri ve yönetici özet sunumunun hazırlanması.'
      },
      {
        id: 'ms-it-4',
        order: 4,
        title: 'Müşteriye Canlı Demo Sunumu & UAT Kabulü',
        targetOffsetDays: 7,
        targetDateIso: day7.toISOString(),
        targetText: '7. Gün (Final)',
        isCompleted: false,
        icon: '🛡️',
        description: 'Müşteri teknik ve yönetim heyetine canlı sistem sunumu ve UAT kabul tutanağı imzalatılması.'
      }
    ];

    return {
      chainId: `chain-it-siem-${Date.now()}`,
      chainName: 'SIEM Kurulumu & Müşteri POC Sunum Zinciri',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  // 8. EMLAK & GAYRİMENKUL: Kiracı Tahliyesi & Depozito Mahsup Zinciri
  if (
    (lower.includes('kiracı') || lower.includes('kiraci') || lower.includes('tahliye')) &&
    (lower.includes('çıktı') || lower.includes('cikti') || lower.includes('anahtar') || lower.includes('boşalttı') || lower.includes('depozito'))
  ) {
    const day0Iso = baseDate.toISOString();
    const day3 = new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    const day7 = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-re-1',
        order: 1,
        title: 'Anahtar Teslimi & Sayaç Endeks Tespiti',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'Aşama 1 (Tahliye Anı)',
        isCompleted: true,
        icon: '🔑',
        description: 'Elektrik, su ve doğalgaz sayaç fotoğraflarının çekilmesi ve anahtar teslim tutanağının imzalanması.'
      },
      {
        id: 'ms-re-2',
        order: 2,
        title: 'Boya, Armatür Hasar & Yönetim Borç Kontrolü',
        targetOffsetDays: 3,
        targetDateIso: day3.toISOString(),
        targetText: '3. Gün',
        isCompleted: false,
        icon: '📋',
        description: 'Daire hasar tespiti, usta tamir maliyet hesabı ve site yönetiminden aidat borçsuzluk belgesi temini.'
      },
      {
        id: 'ms-re-3',
        order: 3,
        title: 'Fatura Mahsubu & Kalan Depozito İadesi',
        targetOffsetDays: 7,
        targetDateIso: day7.toISOString(),
        targetText: '7. Gün',
        isCompleted: false,
        icon: '💳',
        description: 'Son faturaların ve tamir masraflarının depozitodan düşülerek kalan tutarın kiracıya iadesi.'
      }
    ];

    return {
      chainId: `chain-re-eviction-${Date.now()}`,
      chainName: 'Kiracı Tahliyesi & Depozito Mahsup Zinciri',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  // 8.1. EMLAK: Web-Tapu Satış & Mülkiyet Devir Zinciri
  if (
    lower.includes('webtapu') || lower.includes('web-tapu') || lower.includes('tapu devri') ||
    lower.includes('tapu randevusu') || (lower.includes('tapu') && (lower.includes('satış') || lower.includes('satis') || lower.includes('devir')))
  ) {
    const day0Iso = baseDate.toISOString();
    const day1 = new Date(baseDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    const day2 = new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    const day5 = new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-wt-1',
        order: 1,
        title: 'Web-Tapu Başvurusu, DASK & Rayiç Yükleme',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'Aşama 1 (Başvuru)',
        isCompleted: true,
        icon: '📑',
        description: 'Web-Tapu sistemine güncel DASK poliçesi, belediye rayiç bedel belgesi ve taraf kimliklerinin yüklenmesi.'
      },
      {
        id: 'ms-wt-2',
        order: 2,
        title: 'Harç SMS\'i, Takasbank / Bloke Çek Transferi',
        targetOffsetDays: 1,
        targetDateIso: day1.toISOString(),
        targetText: '1. Gün',
        isCompleted: false,
        icon: '💳',
        description: 'Alıcı/satıcı tapu harcı ve döner sermayenin yatırılması, Takasbank TapuTakas veya bloke çekin hazırlanması.'
      },
      {
        id: 'ms-wt-3',
        order: 3,
        title: 'Tapu Müdürlüğü Resmi İmzalar & Tapu Teslimi',
        targetOffsetDays: 2,
        targetDateIso: day2.toISOString(),
        targetText: '2. Gün (Randevu Saati)',
        isCompleted: false,
        icon: '🏢',
        description: 'Kimlik asılları ile müdür huzurunda resmi senedin imzalanması ve yeni tapu senedinin teslim alınması.'
      },
      {
        id: 'ms-wt-4',
        order: 4,
        title: 'Abonelik Devirleri & Belediye Emlak Beyanı',
        targetOffsetDays: 5,
        targetDateIso: day5.toISOString(),
        targetText: '5. Gün',
        isCompleted: false,
        icon: '⚡',
        description: 'Elektrik, su, doğalgaz sayaç devirleri ve belediyeye yeni malik emlak vergisi beyan bildirimi.'
      }
    ];

    return {
      chainId: `chain-re-webtapu-${Date.now()}`,
      chainName: 'Web-Tapu Satış & Mülkiyet Devir Zinciri',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  // 8.2. EMLAK: Kira Sözleşmesi & Tahliye Taahhüt Zinciri
  if (
    (lower.includes('kira sözleşmesi') || lower.includes('kira kontratı') || lower.includes('yeni kiracı') || lower.includes('kiraya verdik'))
  ) {
    const day0Iso = baseDate.toISOString();
    const day3 = new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    const day30 = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-rk-1',
        order: 1,
        title: 'Kira Sözleşmesi, Demirbaş Tespiti & Depozito',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'Aşama 1 (İmza & Anahtar)',
        isCompleted: true,
        icon: '📝',
        description: 'Kontratın imzalanması, kombi/demirbaş fotoğraf föyü, sayaç ilk endeksleri ve vadeli mevduat depozitosu.'
      },
      {
        id: 'ms-rk-2',
        order: 2,
        title: 'Abonelik Devir Teyidi & Noter Tahliye Taahhüdü',
        targetOffsetDays: 3,
        targetDateIso: day3.toISOString(),
        targetText: '3. Gün',
        isCompleted: false,
        icon: '📜',
        description: 'Kiracının sayaçları üzerine alma teyidi ve Yargıtay kuralı gereği teslimden sonraki tarihli tahliye taahhütnamesi tanzimi.'
      },
      {
        id: 'ms-rk-3',
        order: 3,
        title: '1. Ay Kira Ödemesi & Banka Dekont Takibi',
        targetOffsetDays: 30,
        targetDateIso: day30.toISOString(),
        targetText: '30. Gün',
        isCompleted: false,
        icon: '🏦',
        description: 'İlk kiranın banka üzerinden yasal açıklamayla yatırılmasının teyidi ve cari kira takip kartının güncellenmesi.'
      }
    ];

    return {
      chainId: `chain-re-lease-${Date.now()}`,
      chainName: 'Kira Sözleşmesi & Tahliye Taahhüt Zinciri',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  // 9. SAĞLIK & CERRAHİ: Post-Op İyileşme & Dikiş Alma Zinciri
  if (
    (lower.includes('post-op') || lower.includes('postop') || lower.includes('ameliyat') || lower.includes('cerrahi')) &&
    (lower.includes('çıktı') || lower.includes('yattı') || lower.includes('dikiş') || lower.includes('servis'))
  ) {
    const day0Iso = baseDate.toISOString();
    const day1 = new Date(baseDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    const day7 = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const day14 = new Date(baseDate.getTime() + 14 * 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-med-1',
        order: 1,
        title: 'Post-Op Vital & Dren / Kanama İzlemi',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'İlk 24 Saat',
        isCompleted: true,
        icon: '🩺',
        description: 'İlk 2 saat 15 dk bir, sonra saatlik vital takibi, dren akışı ve pansuman kanama kontrolü.'
      },
      {
        id: 'ms-med-2',
        order: 2,
        title: 'Mobilizasyon & Oral Beslenme Başlangıcı',
        targetOffsetDays: 1,
        targetDateIso: day1.toISOString(),
        targetText: '1. Gün',
        isCompleted: false,
        icon: '🚶‍♂️',
        description: 'Bağırsak seslerinin dinlenmesi, gaz çıkışı, ilk adım mobilizasyonu ve sulu gıda orderı.'
      },
      {
        id: 'ms-med-3',
        order: 3,
        title: '7. Gün Dikiş Alma & Pansuman Kontrolü',
        targetOffsetDays: 7,
        targetDateIso: day7.toISOString(),
        targetText: '7. Gün',
        isCompleted: false,
        icon: '✂️',
        description: 'Cerrahi yara hattı enfeksiyon/skar kontrolü ve poliklinikte dikişlerin alınması.'
      },
      {
        id: 'ms-med-4',
        order: 4,
        title: 'Patoloji Raporu & Nihai Epikriz Kapanışı',
        targetOffsetDays: 14,
        targetDateIso: day14.toISOString(),
        targetText: '14. Gün',
        isCompleted: false,
        icon: '🔬',
        description: 'Ameliyat materyali patoloji tetkik sonucunun hekimce değerlendirilmesi ve epikriz onayı.'
      }
    ];

    return {
      chainId: `chain-med-postop-${Date.now()}`,
      chainName: 'Post-Op Cerrahi İyileşme & Dikiş Zinciri',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  // 10. EMNİYET & ASAYİŞ: Gözaltı & 24 Saat Savcılık Fezleke Zinciri
  if (
    lower.includes('gözaltı') || lower.includes('gozalti') ||
    lower.includes('yakalama') || lower.includes('nezarethane')
  ) {
    const day0Iso = baseDate.toISOString();
    const hr6 = new Date(baseDate.getTime() + 6 * 60 * 60 * 1000);
    const hr18 = new Date(baseDate.getTime() + 18 * 60 * 60 * 1000);
    const hr24 = new Date(baseDate.getTime() + 24 * 60 * 60 * 1000);

    const steps: MilestoneStep[] = [
      {
        id: 'ms-law-enf-1',
        order: 1,
        title: 'Yakalama Tutanağı & Giriş Adli Muayenesi',
        targetOffsetDays: 0,
        targetDateIso: day0Iso,
        targetText: 'Gözaltı Başlangıcı',
        isCompleted: true,
        icon: '👮',
        description: 'Şüphelinin üst araması, adli emanet teslimi ve hastaneden giriş adli muayene raporu alımı.'
      },
      {
        id: 'ms-law-enf-2',
        order: 2,
        title: 'Baro Avukatı Eşliğinde İfade Alma',
        targetOffsetDays: 0,
        targetDateIso: hr6.toISOString(),
        targetText: '6. Saat',
        isCompleted: false,
        icon: '⚖️',
        description: 'Müdafi huzurunda şüpheli ifade tutanağının tanzimi ve şüpheli hakları formunun imzalatılması.'
      },
      {
        id: 'ms-law-enf-3',
        order: 3,
        title: 'Savcılık Soruşturma Fezlekesi Tanzimi',
        targetOffsetDays: 0,
        targetDateIso: hr18.toISOString(),
        targetText: '18. Saat (Kritik)',
        isCompleted: false,
        icon: '📄',
        description: '24 saatlik yasal süre dolmadan önce tüm delil, kamera ve tutanakların fezlekeye bağlanması.'
      },
      {
        id: 'ms-law-enf-4',
        order: 4,
        title: 'Çıkış Adli Raporu & Adliyeye Sevk',
        targetOffsetDays: 1,
        targetDateIso: hr24.toISOString(),
        targetText: '24. Saat (Süre Sonu)',
        isCompleted: false,
        icon: '🏛️',
        description: 'Hastaneden çıkış hekim raporunun alınması ve şüphelinin adliyede nöbetçi savcılığa teslimi.'
      }
    ];

    return {
      chainId: `chain-police-custody-${Date.now()}`,
      chainName: '24 Saat Yasal Gözaltı & Fezleke Zinciri',
      currentStepIndex: 1,
      steps,
      autoProgress: true
    };
  }

  return null;
}
