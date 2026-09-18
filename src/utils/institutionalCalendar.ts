/**
 * Resmi & Akademik Kurum Takvimi Motoru (Institutional & Regulatory Calendar Engine)
 * Türkiye resmi kurum takvimlerini (MEB çalışma takvimi, Adli Tatil [20 Temmuz - 31 Ağustos],
 * Gelir İdaresi vergi günleri, resmi tatiller) bilişsel olarak çözümler ve kesin tarihlere dönüştürür.
 */

export interface InstitutionalDateResolution {
  matched: boolean;
  institutionType?: 'MEB' | 'YARGI' | 'GIB' | 'RESMI_TATIL';
  label: string;
  resolvedDate?: Date;
  resolvedIso?: string;
  displayTimeText?: string;
  officialNote?: string;
}

/**
 * Kullanıcı girdisindeki resmi kurum ve akademik takvim terimlerini kesin tarihlere dönüştürür.
 */
export function resolveInstitutionalReference(
  rawText: string,
  baseDate: Date = new Date()
): InstitutionalDateResolution {
  const lower = rawText.toLowerCase();
  const year = baseDate.getFullYear();

  // 1. ADLİ TATİL (20 Temmuz - 31 Ağustos)
  if (lower.includes('adli tatil') || lower.includes('adli tatilde') || lower.includes('adli tatil bitim')) {
    if (lower.includes('bitim') || lower.includes('sonra') || lower.includes('dönüş')) {
      // Adli tatil bitimi: 1 Eylül (Süreler 7 gün uzar -> 7 Eylül)
      const target = new Date(year, 8, 1, 9, 0, 0); // 1 Eylül 09:00
      if (target.getTime() < baseDate.getTime()) {
        target.setFullYear(year + 1);
      }
      return {
        matched: true,
        institutionType: 'YARGI',
        label: 'Adli Tatil Bitimi (Yeni Adli Yıl)',
        resolvedDate: target,
        resolvedIso: target.toISOString(),
        displayTimeText: `1 Eylül ${target.getFullYear()} (09:00)`,
        officialNote: 'HMK ve İYUK uyarınca adli tatile rastlayan süreler tatilin bittiği günden itibaren 7 gün (7 Eylül) uzamış sayılır.',
      };
    }

    // Adli tatil başlangıcı (20 Temmuz)
    const target = new Date(year, 6, 20, 9, 0, 0); // 20 Temmuz
    if (target.getTime() < baseDate.getTime()) {
      target.setFullYear(year + 1);
    }
    return {
      matched: true,
      institutionType: 'YARGI',
      label: 'Adli Tatil Başlangıcı',
      resolvedDate: target,
      resolvedIso: target.toISOString(),
      displayTimeText: `20 Temmuz ${target.getFullYear()}`,
      officialNote: '20 Temmuz - 31 Ağustos arası adli tatildir. Nöbetçi mahkemeler hariç duruşma yapılmaz.',
    };
  }

  // 2. MEB ARA TATİLLER VE SÖMESTR
  if (lower.includes('ara tatil') || lower.includes('kasım ara tatil') || lower.includes('nisan ara tatil')) {
    const isNov = lower.includes('kasım') || (!lower.includes('nisan') && baseDate.getMonth() >= 8);
    const month = isNov ? 10 : 3; // 10: Kasım, 3: Nisan
    const day = isNov ? 10 : 7; // Kasım ortası veya Nisan başı
    const target = new Date(year, month, day, 9, 0, 0);
    if (target.getTime() < baseDate.getTime()) {
      target.setFullYear(year + 1);
    }

    return {
      matched: true,
      institutionType: 'MEB',
      label: isNov ? '1. Dönem Ara Tatili' : '2. Dönem Ara Tatili',
      resolvedDate: target,
      resolvedIso: target.toISOString(),
      displayTimeText: `${day} ${isNov ? 'Kasım' : 'Nisan'} ${target.getFullYear()}`,
      officialNote: 'MEB Çalışma Takvimi: Ara tatil haftasında öğretmen mesleki çalışma seminerleri yürütülür.',
    };
  }

  if (lower.includes('sömestr') || lower.includes('somestr') || lower.includes('yarıyıl tatil') || lower.includes('yariyil tatil')) {
    const target = new Date(year, 0, 20, 9, 0, 0); // 20 Ocak
    if (target.getTime() < baseDate.getTime()) {
      target.setFullYear(year + 1);
    }
    return {
      matched: true,
      institutionType: 'MEB',
      label: 'MEB Yarıyıl (Sömestr) Tatili',
      resolvedDate: target,
      resolvedIso: target.toISOString(),
      displayTimeText: `20 Ocak ${target.getFullYear()}`,
      officialNote: 'MEB Yarıyıl Tatili: 2 hafta sürer; e-Okul karne ve devamsızlık basımları tamamlanmış olmalıdır.',
    };
  }

  if (lower.includes('karne günü') || lower.includes('karne haftası')) {
    const target = new Date(year, 5, 14, 9, 0, 0); // 14 Haziran
    if (target.getTime() < baseDate.getTime()) {
      target.setFullYear(year + 1);
    }
    return {
      matched: true,
      institutionType: 'MEB',
      label: 'Dönem Sonu & Karne Günü',
      resolvedDate: target,
      resolvedIso: target.toISOString(),
      displayTimeText: `14 Haziran ${target.getFullYear()}`,
      officialNote: 'Karne günü öncesinde e-Okul şube başarı belgeleri, iftihar belgeleri ve karne basımları kilitlenir.',
    };
  }

  // 3. GELİR İDARESİ / VERGİ VE SGK DÖNGÜSÜ
  if (lower.includes('kdv beyanname') || lower.includes('muhsgk') || lower.includes('vergi günü')) {
    // Her ayın 26'sı
    const target = new Date(year, baseDate.getMonth(), 26, 17, 0, 0);
    if (target.getTime() < baseDate.getTime()) {
      target.setMonth(target.getMonth() + 1);
    }
    return {
      matched: true,
      institutionType: 'GIB',
      label: 'KDV / MUHSGK Beyanname Son Onay Günü',
      resolvedDate: target,
      resolvedIso: target.toISOString(),
      displayTimeText: `${target.getDate()} ${new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(target)} (17:00)`,
      officialNote: 'Gelir İdaresi Başkanlığı: Aylık KDV ve MUHSGK beyanname verme ve onay son günüdür.',
    };
  }

  if (lower.includes('sgk prim') || lower.includes('e-defter berat') || lower.includes('ay sonu mali')) {
    // Ayın son iş günü
    const lastDayOfMonth = new Date(year, baseDate.getMonth() + 1, 0, 18, 0, 0);
    return {
      matched: true,
      institutionType: 'GIB',
      label: 'SGK Prim & e-Defter Berat Kapanışı',
      resolvedDate: lastDayOfMonth,
      resolvedIso: lastDayOfMonth.toISOString(),
      displayTimeText: `${lastDayOfMonth.getDate()} ${new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(lastDayOfMonth)} (18:00)`,
      officialNote: 'Ayın son günü saat 23:59 a kadar SGK prim ödemeleri ve e-Defter berat yüklemeleri tamamlanmalıdır.',
    };
  }

  return { matched: false, label: '' };
}
