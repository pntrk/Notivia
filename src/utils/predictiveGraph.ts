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
  if (d.includes('klinik') || d.includes('hemsire') || d.includes('doktor') || d.includes('cerrahi') || d.includes('preop') || d.includes('postop') || d.includes('hbys') || d.includes('order')) {
    let ikon = '🩺';
    if (d.includes('hemsire') || d.includes('tedavi') || d.includes('enjeksiyon') || d.includes('tetkik') || d.includes('order')) ikon = '💉';
    else if (d.includes('nobet') || d.includes('servis') || d.includes('hastane')) ikon = '🏥';
    return { ikon, renk: '#CCFBF1' };
  }
  if (d.includes('emniyet') || d.includes('polis') || d.includes('asayis') || d.includes('kolluk') || d.includes('gozalti') || d.includes('cevik')) {
    let ikon = '🚔';
    if (d.includes('ek_gorev') || d.includes('nobet') || d.includes('cevik')) ikon = '👮‍♂️';
    else if (d.includes('adli') || d.includes('sevk')) ikon = '⚖️';
    return { ikon, renk: '#DBEAFE' };
  }
  if (d.includes('hukuk') || d.includes('dava') || d.includes('durusma') || d.includes('mahkeme') || d.includes('avukat')) {
    return { ikon: '⚖️', renk: '#FEF3C7' };
  }
  if (d.includes('kuafor') || d.includes('kuaför') || d.includes('berber') || d.includes('guzellik') || d.includes('güzellik') || d.includes('sac') || d.includes('saç') || d.includes('ombre') || d.includes('balyaj') || d.includes('oryal')) {
    let ikon = '✂️';
    if (d.includes('tirnak') || d.includes('tırnak') || d.includes('oje') || d.includes('manikur') || d.includes('pedikur')) ikon = '💅';
    else if (d.includes('cilt') || d.includes('lazer') || d.includes('epilasyon')) ikon = '✨';
    return { ikon, renk: '#FCE7F3' };
  }
  if (d.includes('saglik') || d.includes('medikal') || d.includes('tahlil') || d.includes('asi') || d.includes('mr') || d.includes('ameliyat') || d.includes('ilac') || d.includes('alacak')) {
    let ikon = '🩺';
    if (d.includes('goz')) ikon = '👁️';
    else if (d.includes('implant') || d.includes('dis')) ikon = '🦷';
    else if (d.includes('endoskopi')) ikon = '🩺';
    else if (d.includes('alacak')) ikon = '💰';
    else if (d.includes('ilac')) ikon = '💊';
    return { ikon, renk: '#F3E8FF' };
  }
  if (d.includes('polis') || d.includes('emniyet') || d.includes('asayis') || d.includes('gozalti') || d.includes('gözaltı') || d.includes('nezaret') || d.includes('fezleke')) {
    return { ikon: '👮', renk: '#BFDBFE' };
  }
  if (d.includes('itfaiye') || d.includes('yangin') || d.includes('yangın') || d.includes('scba') || d.includes('arazoz') || d.includes('arazöz') || d.includes('arama_kurtarma')) {
    return { ikon: '🚒', renk: '#FECACA' };
  }
  if (d.includes('asci') || d.includes('aşçı') || d.includes('sef') || d.includes('şef') || d.includes('mutfak') || d.includes('mise_en_place') || d.includes('haccp') || d.includes('fifo') || d.includes('culinary')) {
    return { ikon: '👨‍🍳', renk: '#FED7AA' };
  }
  if (d.includes('pilot') || d.includes('ucus') || d.includes('uçuş') || d.includes('kokpit') || d.includes('dispatch') || d.includes('ofp') || d.includes('fdp') || d.includes('havacilik') || d.includes('havacılık')) {
    return { ikon: '✈️', renk: '#E0E7FF' };
  }
  if (d.includes('asker') || d.includes('ictima') || d.includes('tekmil') || d.includes('tabur') || d.includes('boluk') || d.includes('silahlik') || d.includes('muhimmat') || d.includes('poligon') || d.includes('tatbikat') || d.includes('kademe')) {
    let ikon = '🪖';
    let renk = '#E2E8D5';
    if (d.includes('silahlik') || d.includes('muhimmat') || d.includes('nobet') || d.includes('doldur')) {
      ikon = '🛡️';
      renk = '#E2E8D5';
    } else if (d.includes('atis') || d.includes('poligon') || d.includes('hedef')) {
      ikon = '🎯';
      renk = '#E2E8D5';
    } else if (d.includes('kademe') || d.includes('arac') || d.includes('bakim')) {
      ikon = '🪖';
      renk = '#E2E8F0';
    }
    return { ikon, renk };
  }
  if (d.includes('avukat') || d.includes('hakim') || d.includes('hâkim') || d.includes('smmm') || d.includes('mali_musavir') || d.includes('noter') || d.includes('durusma') || d.includes('duruşma') || d.includes('istinaf') || d.includes('temyiz') || d.includes('icra') || d.includes('tebligat') || d.includes('ihtarname') || d.includes('defter_tasdik') || d.includes('beyanname')) {
    let ikon = '⚖️';
    let renk = '#E0E7FF'; // Avukat / Hukuk İndigosu
    if (d.includes('hakim') || d.includes('hâkim') || d.includes('gerekceli_karar') || d.includes('hukum')) {
      ikon = '🏛️';
      renk = '#FEF3C7'; // Adalet Sarısı
    } else if (d.includes('smmm') || d.includes('mali_musavir') || d.includes('beyanname') || d.includes('kdv') || d.includes('muhsgk') || d.includes('edefter') || d.includes('berat')) {
      ikon = '📊';
      renk = '#DCFCE7'; // Finans Yeşili
    } else if (d.includes('noter') || d.includes('ihtarname') || d.includes('defter_tasdik') || d.includes('yevmiye')) {
      ikon = '📜';
      renk = '#F1F5F9'; // Mühür Grisi
    }
    return { ikon, renk };
  }
  if (d.includes('doktor') || d.includes('hekim') || d.includes('hemsire') || d.includes('hemşire') || d.includes('eczac') || d.includes('eczane') || d.includes('dis_hekimi') || d.includes('diş') || d.includes('dis') || d.includes('klinik') || d.includes('saglik') || d.includes('sağlık')) {
    let ikon = '🩺';
    let renk = '#E0F2FE';
    if (d.includes('dis') || d.includes('diş') || d.includes('implant') || d.includes('protez') || d.includes('otoklav')) {
      ikon = '🦷';
      renk = '#EDE9FE';
    } else if (d.includes('eczac') || d.includes('eczane') || d.includes('its') || d.includes('soguk_zincir') || d.includes('soğuk_zincir')) {
      ikon = '💊';
      renk = '#FEE2E2';
    } else if (d.includes('hemsire') || d.includes('hemşire') || d.includes('dekubitus') || d.includes('dekübitus') || d.includes('sbar')) {
      ikon = '💉';
      renk = '#CCFBF1';
    }
    return { ikon, renk };
  }
  if (d.includes('deniz') || d.includes('gemi') || d.includes('kaptan') || d.includes('maritime') || d.includes('psc') || d.includes('liman') || d.includes('balast') || d.includes('draft') || d.includes('carkci') || d.includes('zabit') || d.includes('bunkering') || d.includes('passage') || d.includes('sintine') || d.includes('ows') || d.includes('isps') || d.includes('solas') || d.includes('marpol')) {
    let ikon = '⚓';
    if (d.includes('draft') || d.includes('yukleme') || d.includes('tahliye')) ikon = '🚢';
    else if (d.includes('balast') || d.includes('sintine') || d.includes('bwm')) ikon = '🌊';
    else if (d.includes('passage') || d.includes('seyir') || d.includes('rota') || d.includes('ecdis')) ikon = '🧭';
    else if (d.includes('pilot') || d.includes('kilavuz') || d.includes('carmıh')) ikon = '🧑‍✈️';
    else if (d.includes('bunker') || d.includes('yakit')) ikon = '⛽';
    else if (d.includes('tatbikat') || d.includes('filika') || d.includes('terk')) ikon = '🛟';
    else if (d.includes('kapali_mahal') || d.includes('sicak_calisma')) ikon = '🦺';
    else if (d.includes('isps') || d.includes('gangway') || d.includes('guvenlik')) ikon = '🛡️';
    else if (d.includes('ordino') || d.includes('pratique') || d.includes('evrak') || d.includes('gumruk')) ikon = '📑';
    return { ikon, renk: '#CFFAFE' };
  }
  if (d.includes('insaat') || d.includes('beton') || d.includes('santiye') || d.includes('donati') || d.includes('kurleme') || d.includes('kirim')) {
    return { ikon: '🏗️', renk: '#FEF3C7' };
  }
  if (d.includes('akademi') || d.includes('gozetmen') || d.includes('makale') || d.includes('hakemlik') || d.includes('peer') || d.includes('tubitak') || d.includes('bap') || d.includes('tez')) {
    let ikon = '🎓';
    let renk = '#DDD6FE';
    if (d.includes('makale') || d.includes('hakem') || d.includes('peer') || d.includes('arastirma')) {
      ikon = '🔬';
      renk = '#DDD6FE';
    } else if (d.includes('proje') || d.includes('tubitak') || d.includes('bap')) {
      ikon = '🎓';
      renk = '#E0E7FF';
    }
    return { ikon, renk };
  }
  if (d.includes('ogretmen') || d.includes('eokul') || d.includes('e-okul') || d.includes('sinav') || d.includes('yazili') || d.includes('kazanim')) {
    return { ikon: '📚', renk: '#FEF08A' };
  }
  if (d.includes('ek_ders') || d.includes('kbs') || d.includes('puantaj')) {
    return { ikon: '📋', renk: '#FEF3C7' };
  }
  if (d.includes('tasimali') || d.includes('yemek_numune') || d.includes('servis_denetim')) {
    return { ikon: '🍱', renk: '#DCFCE7' };
  }
  if (d.includes('devamsizlik') || d.includes('disiplin')) {
    return { ikon: '🏫', renk: '#FEE2E2' };
  }
  if (d.includes('tatbikat') || d.includes('okul_guvenlik') || d.includes('isg')) {
    return { ikon: '🛡️', renk: '#F1F5F9' };
  }
  if (d.includes('elektrik') || d.includes('trafo') || d.includes('pano') || d.includes('loto') || d.includes('kompanzasyon') || d.includes('yuksek_gerilim')) {
    return { ikon: '⚡', renk: '#FEE2E2' };
  }
  if (d.includes('makine') || d.includes('kompresor') || d.includes('kazan') || d.includes('hidrostatik') || d.includes('vibrasyon')) {
    return { ikon: '⚙️', renk: '#E2E8F0' };
  }
  if (d.includes('yazilim') || d.includes('deploy') || d.includes('migration') || d.includes('rollback') || d.includes('staging') || d.includes('semver')) {
    return { ikon: '💻', renk: '#E0F2FE' };
  }
  if (d.includes('mimar') || d.includes('mimarlik') || d.includes('ruhsat') || d.includes('clash') || d.includes('cakisma') || d.includes('çakışma') || d.includes('render') || d.includes('mahal_listesi') || d.includes('metraj')) {
    return { ikon: '📐', renk: '#FEF08A' };
  }
  if (d.includes('sofor') || d.includes('şoför') || d.includes('tir') || d.includes('tır') || d.includes('dorse') || d.includes('takograf') || d.includes('aetr') || d.includes('kantar') || d.includes('lojistik') || d.includes('sevkiyat') || d.includes('cmr') || d.includes('adr') || d.includes('frigo') || d.includes('wms') || d.includes('vgm') || d.includes('lashing') || d.includes('intermodal')) {
    if (d.includes('adr') || d.includes('tehlikeli')) {
      return { ikon: '☣️', renk: '#FEE2E2' };
    }
    if (d.includes('frigo') || d.includes('soguk_zincir') || d.includes('soğuk_zincir') || d.includes('atp')) {
      return { ikon: '❄️', renk: '#E0F2FE' };
    }
    if (d.includes('cmr') || d.includes('irsaliye')) {
      return { ikon: '📄', renk: '#FEF3C7' };
    }
    if (d.includes('konteyner') || d.includes('vgm') || d.includes('demuraj')) {
      return { ikon: '🚢', renk: '#CFFAFE' };
    }
    if (d.includes('wms') || d.includes('depo') || d.includes('mal_kabul')) {
      return { ikon: '🏬', renk: '#FEF3C7' };
    }
    if (d.includes('lashing') || d.includes('spanzet')) {
      return { ikon: '⛓️', renk: '#E2E8F0' };
    }
    if (d.includes('transit') || d.includes('t1') || d.includes('ncts')) {
      return { ikon: '🛂', renk: '#E0E7FF' };
    }
    if (d.includes('lastmile') || d.includes('kurye') || d.includes('dagitim') || d.includes('dağıtım')) {
      return { ikon: '📦', renk: '#DCFCE7' };
    }
    return { ikon: '🚛', renk: '#FED7AA' };
  }
  if (d.includes('teknisyen') || d.includes('saha_servisi') || d.includes('is_emri') || d.includes('iş_emri') || d.includes('sla') || d.includes('dbm') || d.includes('fiber_ek') || d.includes('gerilim_sifirlama')) {
    return { ikon: '🛠️', renk: '#CFFAFE' };
  }
  if (d.includes('tamir') || d.includes('tamirci') || d.includes('usta') || d.includes('balata') || d.includes('obd') || d.includes('tork') || d.includes('oto_servis')) {
    return { ikon: '🔧', renk: '#FEF3C7' };
  }
  if (d.includes('satis') || d.includes('satış') || d.includes('danisman') || d.includes('danışman') || d.includes('teklif') || d.includes('follow_up') || d.includes('cross_sell')) {
    return { ikon: '💼', renk: '#E0E7FF' };
  }
  if (d.includes('kasiyer') || d.includes('kasa_avansi') || d.includes('kasa_avansı') || d.includes('ara_tahliye') || d.includes('kasa_sayimi') || d.includes('kasa_sayımı')) {
    return { ikon: '🧾', renk: '#DCFCE7' };
  }
  if (d.includes('esnaf') || d.includes('dukkan') || d.includes('veresiye') || d.includes('toptanci') || d.includes('tedarik') || d.includes('z_raporu') || d.includes('pos_kapanis') || d.includes('bagkur')) {
    let ikon = '🏪';
    let renk = '#FEF3C7';
    if (d.includes('veresiye') || d.includes('defter') || d.includes('kazanc')) {
      ikon = '📓';
      renk = '#DCFCE7';
    } else if (d.includes('toptan') || d.includes('tedarik') || d.includes('siparis')) {
      ikon = '📦';
      renk = '#FEF3C7';
    } else if (d.includes('odeme') || d.includes('borc') || d.includes('cek')) {
      ikon = '💸';
      renk = '#FEE2E2';
    }
    return { ikon, renk };
  }
  if (d.includes('ebys') || d.includes('cimer') || d.includes('belgenet') || d.includes('dogrudan_temin') || d.includes('kamu') || d.includes('memur') || d.includes('tif') || d.includes('mys') || d.includes('paraf')) {
    let ikon = '🗂️';
    if (d.includes('imza') || d.includes('paraf') || d.includes('yazi')) ikon = '🖋️';
    else if (d.includes('cimer') || d.includes('kurum') || d.includes('maliye')) ikon = '🏛️';
    return { ikon, renk: '#FEF9C3' };
  }
  if (d.includes('burokrasi') || d.includes('resmi') || d.includes('hukuk') || d.includes('tapu') || d.includes('ehliyet') || d.includes('pasaport') || d.includes('vize') || d.includes('noter') || d.includes('kurum') || d.includes('egitim') || d.includes('zumre') || d.includes('kpss') || d.includes('nobet') || d.includes('rapor')) {
    let ikon = '🏛️';
    if (d.includes('pasaport') || d.includes('vize')) ikon = '🛂';
    else if (d.includes('ehliyet')) ikon = '🪪';
    else if (d.includes('egitim') || d.includes('zumre') || d.includes('kpss') || d.includes('nobet') || d.includes('rapor')) ikon = '📋';
    return { ikon, renk: '#E0F2FE' };
  }
  if (d.includes('market') || d.includes('alisveris') || d.includes('alışveriş') || d.includes('pazar') || d.includes('liste') || d.includes('bakkal') || d.includes('envanter') || d.includes('eksik')) {
    return { ikon: '🛒', renk: '#DCFCE7' };
  }
  if (
    d.includes('botanik') || d.includes('ziraat') || d.includes('tarim') || d.includes('tarım') ||
    d.includes('cicek') || d.includes('çiçek') || d.includes('bitki') || d.includes('sula') ||
    d.includes('bahce') || d.includes('bahçe') || d.includes('sera') || d.includes('tarla') ||
    d.includes('orkide') || d.includes('sardunya') || d.includes('kaktus') || d.includes('sukulent') ||
    d.includes('budama') || d.includes('ilac') || d.includes('ilaç') || d.includes('tarsim') ||
    d.includes('cks') || d.includes('çks') || d.includes('fertigasyon') || d.includes('fidan') ||
    d.includes('cim') || d.includes('çim') || d.includes('pasa_kilici') || d.includes('baris_cicegi')
  ) {
    let ikon = '🌿';
    let renk = '#DCFCE7';
    if (d.includes('orkide') || d.includes('petunya')) {
      ikon = '🌸';
      renk = '#FDF2F8';
    } else if (d.includes('sardunya') || d.includes('baris_cicegi') || d.includes('cicek') || d.includes('çiçek')) {
      ikon = '🌺';
    } else if (d.includes('kaktus') || d.includes('sukulent')) {
      ikon = '🌵';
      renk = '#FEF3C7';
    } else if (d.includes('ilac') || d.includes('ilaç') || d.includes('pestisit') || d.includes('fungisit')) {
      ikon = '🧪';
    } else if (d.includes('budama')) {
      ikon = '✂️';
      renk = '#FEF3C7';
    } else if (d.includes('don')) {
      ikon = '❄️';
      renk = '#E0F2FE';
    } else if (d.includes('tarsim') || d.includes('cks') || d.includes('çks')) {
      ikon = '🌾';
      renk = '#FEF3C7';
    } else if (d.includes('damlama') || d.includes('fertigasyon')) {
      ikon = '💧';
    } else if (d.includes('fidan') || d.includes('cim') || d.includes('çim')) {
      ikon = '🌱';
    }
    return { ikon, renk };
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
    matcher: (l) => l.includes('toplantı') || l.includes('toplanti') || l.includes('kurul') || (l.includes('müdür') && !l.includes('borç') && !l.includes('öde')) || l.includes('veli görüşme') || l.includes('öğretmenler kurul'),
    inference: {
      domain: 'yonetim_toplanti',
      hazirlikZamani: 'Toplantıdan 30 Dakika Önce',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'Toplantı gündem maddelerini ve görüşülecek konuları belirle',
        'Önceki dönem karar tutanaklarını ve geçmiş notları incele',
        'Islak imzalı hazirun listesi ve resmi evrak çıktılarını hazırla'
      ],
      akilliFisilti: '🤝 Toplantı öncesi gündem maddelerini, önceki tutanakları ve hazirun listesini gözden geçirmek faydalı olacaktır.'
    }
  },

  // 2. Seyahat, Tatil & Uçak Yolculuğu
  {
    matcher: (l) => l.includes('seyahat') || l.includes('tatil') || l.includes('yolculuk') || l.includes('uçak') || l.includes('uçuş') || l.includes('havaliman') || l.includes('bilet al') || l.includes('havaalanı'),
    inference: {
      domain: 'ucak_seyahat',
      hazirlikZamani: 'Yola Çıkmadan 24 Saat Önce',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Pasaport / vize ve kimlik belgelerinin geçerlilik süresini kontrol et',
        'Yurt dışı çıkış harç pulunu temin et / online check-in yap',
        'Hattın yurt dışı dolaşım (roaming) paketini aktif et',
        'Evden çıkarken ana su vanasını kapat ve prizleri prizden çek'
      ],
      akilliFisilti: '✈️ Seyahat öncesi pasaport geçerliliği, roaming paketi, su vanası ve priz kontrollerini tamamlayın.'
    }
  },

  // 3. Araç Muayenesi & Bakımı (TÜVTÜRK / Servis)
  {
    matcher: (l) => l.includes('araç muayene') || l.includes('tüvtürk') || l.includes('araba muayene') || (l.includes('muayene') && l.includes('araç')) || l.includes('araç bakım') || l.includes('periyodik bakım'),
    inference: {
      domain: 'arac_muayene',
      hazirlikZamani: '2 Gün Önce 14:00',
      hazirlikSaatOncesi: 48,
      oncedenYapilacaklar: [
        'MTV ve HGS/OGS trafik cezası borcu sorgula (Borç varsa muayene/işlem yapılmaz)',
        'İlk yardım çantası, yangın tüpü ve 2 adet reflektörün bagajda olduğunu teyit et',
        'Araç ruhsatı ve güncel zorunlu trafik sigortası poliçesini hazırla',
        'Tüm far, sinyal, fren lambası ve plaka aydınlatmalarını kontrol et'
      ],
      akilliFisilti: '🚗 MTV veya ceza borcu olan araçlar muayeneye alınmaz. Önceden borç sorgulaması yapın.',
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
        '48 saat sonra bar basıncı kontrolü yap (Kaçak ve basınç düşme testi)'
      ],
      akilliFisilti: '🔧 Kombi barı 1.0’ın altına düştüğünde cihaz korumaya geçer. Su bastıktan 48 saat sonra barı tekrar gözlemleyin.'
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
  },

  // 10. EBYS / Belgenet Günlü Evrak & Paraf Zinciri
  {
    matcher: (l) => l.includes('ebys') || l.includes('belgenet') || l.includes('dys') || l.includes('günlü evrak') || l.includes('gunlu evrak') || l.includes('paraf zinciri') || l.includes('acele yazı'),
    inference: {
      domain: 'kamu_ebys',
      hazirlikZamani: '1 İş Günü Önce 16:30',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Yazı taslağını hazırlayıp Standart Dosya Planı (SDP) kodunu seç',
        'Şef, Şube Müdürü ve Daire Başkanı hiyerarşik paraf zincirine sun',
        'Ekli belgelerin (CD, cetvel, fiziki dosya) üst yazıya tam iliştirildiğini kontrol et',
        'Nitelikli elektronik sertifika (e-İmza) ile nihai makam olurunu alıp giden evrak sayı/tarihini ver',
        'Muhatap idareye veya UETS/KEP adresine teslim teyidini alarak arşive kaldır'
      ],
      akilliFisilti: '🖋️ Günlü ve ivedi yazılarda gecikmeye meydan vermemek için son tarihten en az 1 iş günü önce iç paraf zinciri tamamlanmalıdır.'
    }
  },

  // 11. CİMER & 3071 Bilgi Edinme Yasal Süreci
  {
    matcher: (l) => l.includes('cimer') || l.includes('çimer') || l.includes('bilgi edinme') || l.includes('3071') || l.includes('4982'),
    inference: {
      domain: 'kamu_cimer',
      hazirlikZamani: 'İlk 3 İş Gününde Alt Birim Yazışması',
      hazirlikSaatOncesi: 72,
      oncedenYapilacaklar: [
        'CİMER başvuru konusunu incele; gerekiyorsa 3 iş günü içinde ilgili birim veya taşra teşkilatına ara yazı yaz',
        'Alt birimden gelen bilgi ve belgeleri mevzuat süzgecinden geçirerek gerekçeli cevap taslağını hazırla',
        'Kişisel veriler (KVKK) ve ticari sır teşkil eden bilgileri karartarak metni nihai hale getir',
        'Şube Müdürü parafı ve Makam Onayı ile CİMER sistemine cevabı yükleyip başvuruyu kapat',
        'Vatandaşa sistem üzerinden bilgilendirme SMS/e-postası düştüğünü teyit et'
      ],
      akilliFisilti: '🏛️ 4982 sayılı Kanunda 15 gün, 3071 sayılı Kanunda 30 günlük yasal cevap süresi esastır; ara yazışmalar ilk 3 günde çıkmalıdır.'
    }
  },

  // 12. 4734 Sayılı KİK 22/d Doğrudan Temin & TİF / MYS V2
  {
    matcher: (l) => l.includes('doğrudan temin') || l.includes('dogrudan temin') || l.includes('22/d') || l.includes('22-d') || l.includes('tkys') || (l.includes('tif') && (l.includes('kes') || l.includes('ambar'))) || (l.includes('mys') && l.includes('ödeme emri')),
    inference: {
      domain: 'kamu_dogrudan_temin',
      hazirlikZamani: 'Fatura & Muayene Kabul Aşaması',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Harcama yetkilisinden onaylı Harcama Talimatını al ve en az 3 firmadan kaşeli piyasa teklif mektubu topla',
        'Piyasa Fiyat Araştırma Tutanağını tanzim edip en uygun teklif sahibiyle sözleşme/sipariş oluştur',
        'Mal/hizmet tesliminde Muayene ve Kabul Komisyonu Tutanağını komisyon üyelerine ıslak imzalattır',
        'Taşınır Kayıt ve Yönetim Sistemi (TKYS) üzerinden Taşınır İşlem Fişi (TİF) kes ve ambar kaydını yap',
        'MYS V2 üzerinden Ödeme Emri Belgesi (ÖEB) düzenleyip fatura aslıyla birlikte Malmüdürlüğü/Muhasebeye teslim et'
      ],
      akilliFisilti: '🗂️ 4734 sayılı KİK 22/d alımlarında piyasa fiyat araştırma tutanağı, fatura tarihi, Muayene Kabul ve TİF tarihleri birebir uyumlu olmalıdır.'
    }
  },

  // 13. İK: 5510 Sayılı Kanun SGK İşe Giriş Bildirgesi
  {
    matcher: (l) => l.includes('işe giriş') || l.includes('ise giris') || l.includes('sgk işe giriş') || l.includes('5510 işe giriş'),
    inference: {
      domain: 'kurumsal_sgk_ise_giris',
      hazirlikZamani: 'İşe Başlamadan 24 Saat Önce (T-1 Gün Zorunluluğu)',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'KIRMIZI ALARM: İşe başlama tarihinden en az 1 gün önce SGK e-Bildirge üzerinden işe giriş bildirgesini onayla',
        'Belirli/belirsiz süreli iş sözleşmesi, KVKK açık rıza metni ve şirket iç yönetmeliğini ıslak imzalattır',
        'Sağlık raporu, adli sicil kaydı, diploma ve ikametgah evraklarını özlük klasörüne tak',
        'Zimmet teslim tutanağıyla laptop, telefon, şirket kredi kartı ve giriş kartını teslim et',
        'İşe giriş tarihinden 45 gün sonrasına \'Deneme Süresi Performans Değerlendirme\' hatırlatması kur'
      ],
      akilliFisilti: '⚠️ 5510 sayılı Kanun uyarınca sigortalı işe giriş bildirgesi çalışanın işe fiilen başlamasından en az 1 gün önce (T-1 gün) e-Bildirge üzerinden onaylanmalıdır.'
    }
  },

  // 14. VIP Yönetici Ajandası, Brifing & Toplantı Tamponu
  {
    matcher: (l) => l.includes('sekreter') || l.includes('yönetici asistanı') || l.includes('yonetici asistani') || l.includes('vip brifing') || l.includes('toplantı tamponu') || l.includes('brifing dosyası'),
    inference: {
      domain: 'kurumsal_yonetici_brifing',
      hazirlikZamani: 'Toplantıdan 2 Saat Önce',
      hazirlikSaatOncesi: 2,
      oncedenYapilacaklar: [
        'Arka arkaya toplantılar arasına min. 30 dakika seyahat, toparlanma ve nefeslenme tamponu koy',
        'Üst düzey görüşmeden 2 saat önce: Katılımcı özgeçmişleri, toplantı bilgi notu ve ikram teyidini sağla',
        'Uçuşlu seyahatlerde T-24 saatte online check-in yap, VIP lounge ve havalimanı transferini teyit et',
        'Toplantı bitiminde MoM (Minutes of Meeting - Toplantı Tutanağı) ve aksiyon sahipleri listesini ilgili yöneticilere dağıt'
      ],
      akilliFisilti: '🗂️ Yönetici ajandasında ardışık toplantılar arasına min. 30 dakika tampon konulmalı, brifing dosyası 2 saat önce masaya sunulmalıdır.'
    }
  }
];

// src/utils/predictiveGraph.ts dosyasına eklenecek yeni yaşam alanları:
export const EXPANDED_LIFE_DOMAINS = [
  // 1. Tapu, Web-Tapu & Gayrimenkul Devri
  {
    matcher: (l: string) => l.includes('tapu') || l.includes('webtapu') || l.includes('web-tapu') || l.includes('ev sat') || l.includes('rayiç') || l.includes('dask'),
    inference: {
      domain: 'gayrimenkul_tapu',
      hazirlikZamani: 'Randevudan 24 Saat Önce',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Web-Tapu sistemine DASK poliçesi ve belediye rayiç belgesini yükle',
        'Gelen SMS takip numarası ile alıcı/satıcı tapu harcı ve döner sermayesini yatır',
        'Para transferini güvene almak için Takasbank TapuTakas veya bloke çek hazırla',
        'Randevudan 15 dk önce kimlik asılları ve fotoğraf ile hazır bulun'
      ],
      akilliFisilti: '🏢 Tapu randevusu öncesi belediye rayiç belgesi ve DASK olmadan harç SMS\'i gelmez; para transferi Takasbank veya bloke çekle korunmalıdır.'
    }
  },
  // 1.1. Kira Sözleşmesi & Tahliye Taahhütnamesi
  {
    matcher: (l: string) => l.includes('kira sözleşmesi') || l.includes('kira kontratı') || l.includes('kiraya verdik') || l.includes('yeni kiracı'),
    inference: {
      domain: 'gayrimenkul_kira',
      hazirlikZamani: 'İmza Öncesi',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Kiracının kimlik, gelir ve kefil bilgilerini kontrol et',
        'Demirbaş teslim tutanağı ile kombi, armatür ve duvar boyasını fotoğrafla',
        'Elektrik, su, doğalgaz sayaç ilk endekslerini tutanağa bağla',
        'Tahliye taahhütnamesini Yargıtay kuralı gereği teslimden sonraki güne tanzim et'
      ],
      akilliFisilti: '📝 Kira sözleşmesiyle aynı gün tarihli tahliye taahhütnamesi baskı altında imzalanmış sayılarak geçersiz sayılabilir.'
    }
  },
  // 1.2. Taşınmaz Gösterme & Sunum
  {
    matcher: (l: string) => l.includes('yer gösterme') || l.includes('yer gosterme') || l.includes('evi göstereceğiz') || l.includes('portföy sunumu'),
    inference: {
      domain: 'gayrimenkul_sunum',
      hazirlikZamani: 'Sunumdan 1 Saat Önce',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'Mülk sahibi veya mevcut kiracıyla randevuyu teyit et ve site güvenliğini bilgilendir',
        'Daireye 15 dk önce varıp pencereleri açarak havalandır ve aydınlatmaları yak',
        'Müşteriye Taşınmaz Gösterme Belgesini sunum başlamadan önce imzalat',
        'Net/brüt m2, bina yaşı, aidat ve tapu takyidat bilgilerini eksiksiz aktar'
      ],
      akilliFisilti: '🤝 Taşınmaz Ticareti Yönetmeliği md. 19 gereği yer gösterme belgesi imzalatılmadan yapılan sunumlarda komisyon hakkı korunamaz.'
    }
  },
  // 1.3. İpotek Fekki & Kredi Kapanışı
  {
    matcher: (l: string) => l.includes('ipotek fek') || l.includes('ipotek terkin') || l.includes('ipotek kaldırma') || l.includes('kredi kapandı'),
    inference: {
      domain: 'gayrimenkul_ipotek',
      hazirlikZamani: 'Kredi Kapanış Sonrası',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Bankadan kredi borcunun kapandığını gösteren tasfiye dekontunu al',
        'Bankanın Web-Tapu/TAKPAS üzerinden elektronik fek yazısı göndermesini sağla',
        'Tapu fek terkin harcını yatır ve kütükten ipotek şerhinin silindiğini teyit et'
      ],
      akilliFisilti: '🏛️ Borç bitse bile banka fek yazısı göndermez ve harç ödenmezse ipotek kütükte kalmaya devam eder.'
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
        'Voltmetre ile alternatör voltajını (13.8 - 14.4V) ölçtür',
        'Start-Stop özelliği varsa AGM/EFB uyumlu akü modeli taktır',
        '48 saat sonra kutup başlarını ve marş voltajını tekrar kontrol et'
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
        '48 saat sonra fren pedal hissi ve balata alışma performansını kontrol et'
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
  },

  // 37. Ziraat: Zirai İlaçlama, Rüzgarsız Saat & PHI Bekleme Süresi
  {
    matcher: (l: string) =>
      l.includes('ilaçlama') || l.includes('ilaclama') || l.includes('pestisit') || l.includes('fungisit') ||
      l.includes('böcek ilacı') || l.includes('mantar ilacı') || l.includes('kırmızı örümcek') || l.includes('phi süresi'),
    inference: {
      domain: 'ziraat_ilaclama',
      baslik: 'Zirai İlaçlama & Meteoroloji Takibi',
      hazirlikZamani: 'İlaçlama Öncesi 45 Dk (06:15)',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'Meteoroloji rüzgar hızını (<10 km/s) ve 24 saatlik yağışsızlık durumunu teyit et',
        'Kimyasal buhar maskesi (A2P3), koruyucu tulum, gözlük ve nitril eldiven kuşan',
        'İlaçlama suyu pH değerini (5.5 - 6.5 aralığı) kontrol et; etiket reçete dozajına uy',
        'Komşu arıcılara haber ver; etiket üzerindeki PHI (hasat öncesi bekleme süresi) gününü kaydet',
        'İlaçlama bitiminde pülverizatör tankını ve memelerini bol temiz suyla yıka'
      ],
      akilliFisilti: '⚠️ Rüzgarlı havada ilaçlama sürüklenme zehirlenmesine, yağmur ise ilacın yıkanmasına yol açar. PHI bekleme süresine uyulmalıdır.',
      sesliFisilti: 'Rüzgarsız hava şartı, İSG donanımı ve PHI hasat bekleme takvimli ilaçlama kartı açıldı.',
      ikon: '🧪',
      renk: '#DCFCE7'
    }
  },

  // 38. Ziraat: Mevsimlik Budama, Yara Bakımı & Bordo Bulamacı
  {
    matcher: (l: string) =>
      l.includes('budama') || l.includes('bordo bulamacı') || l.includes('bordo bulamaci') ||
      l.includes('aşı macunu') || l.includes('asi macunu') || l.includes('ardıç katranı') || l.includes('ağaçları budadık'),
    inference: {
      domain: 'ziraat_budama',
      baslik: 'Budama & Bordo Bulamacı Koruma',
      hazirlikZamani: 'Budamadan Hemen Sonra (İlk 48 Saat)',
      hazirlikSaatOncesi: 2,
      oncedenYapilacaklar: [
        'Budama aletlerini %10 çamaşır suyu veya alkolle dezenfekte et (kanser bulaşmasını önle)',
        'Kuru, hastalıklı, obur ve içe bakan dalları tırnak bırakmadan dipten kes',
        '2 cm üzerindeki kalın kesim yaralarını aşı macunu (ardıç katranı) ile hava almayacak şekilde kapat',
        'Budama biter bitmez gövdeye bakteri/mantar girişini önleyen %1.5-2 Bordo Bulamacı püskürt',
        'Budanan hastalıklı dal artıklarını bahçeden uzaklaştırarak imha et'
      ],
      akilliFisilti: '🌳 Kalın kesik yüzeyleri aşı macunuyla kapatılmazsa ağaçlar dal kanseri (Pseudomonas) kapar.',
      sesliFisilti: 'Budama alet dezenfeksiyonu, yara macunu ve Bordo Bulamacı koruma adımları hazırlandı.',
      ikon: '✂️',
      renk: '#FEF3C7'
    }
  },

  // 39. Ziraat: Damlama Sulama & Fertigasyon Protokolü
  {
    matcher: (l: string) =>
      l.includes('damlama') || l.includes('fertigasyon') || l.includes('taban gübre') ||
      l.includes('yaprak gübre') || l.includes('toprak tahlili'),
    inference: {
      domain: 'ziraat_fertigasyon',
      baslik: 'Damlama Sulama & Fertigasyon Protokolü',
      hazirlikZamani: 'Sulama Öncesi Filtre Kontrolü',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'Toprak tahlili sonuçlarına göre N-P-K gübre dozunu tankta tamamen erit',
        'İlk 15-20 dk sistemi temiz suyla doldurup manometreden 1.5-2.0 bar çalışma basıncını sağla',
        'Gübre enjeksiyonu bittikten sonra hatlarda kristal kalmaması için 20-30 dk temiz su bas',
        'Damlatıcıların tıkanmaması için disk/kum filtrelerini ters yıkama ile temizle',
        'Kireç birikimlerine karşı damlama borularına düşük doz fosforik asit şoku ver'
      ],
      akilliFisilti: '💧 Fertigasyon sonrasında damlama borularına temiz su basılmazsa damlatıcı memeleri gübre tuzlarıyla tıkanır.',
      sesliFisilti: 'Fertigasyon dozu, hat basınç kontrolü ve filtre temizleme adımları planlandı.',
      ikon: '💧',
      renk: '#DCFCE7'
    }
  },

  // 40. Ziraat: Zirai Don Nöbeti & Sera Isıtma
  {
    matcher: (l: string) =>
      l.includes('zirai don') || l.includes('don tehlikesi') || l.includes('serayı ısıt') ||
      l.includes('don nöbeti') || l.includes('dona karşı') || l.includes('don vuracak') || l.includes('sera don'),
    inference: {
      domain: 'ziraat_don_nobeti',
      baslik: 'Zirai Don Nöbeti & Sera Isıtma',
      hazirlikZamani: 'Akşam 21:00 (Soba & Termometre)',
      hazirlikSaatOncesi: 6,
      oncedenYapilacaklar: [
        'Gece sıcaklıklarının 0°C altına düşüş hızını dijital termometreden anlık takip et',
        'Seralarda soba veya sıcak hava üreteçlerini saat 02:00 itibarıyla ateşle',
        'Açık meyve bahçelerinde don öncesi hafif sulama yap (ıslak toprak gündüz ısısını geceye taşır)',
        'Aşırı donda yağmurlama sisleme sistemini açarak donma gizli ısısıyla tomurcukları koru',
        'Don hasarı sonrasında bitkiyi toparlamak için yapraktan amino asit takviyesi ver'
      ],
      akilliFisilti: '❄️ Kuru toprak gece ıslak topraktan 1.5-2°C daha soğuk olur; don gecesinde nem ve sisleme kritik koruma sağlar.',
      sesliFisilti: 'Gece zirai don nöbeti, sera ısıtma ve bitki don koruma protokolü devreye alındı.',
      ikon: '❄️',
      renk: '#E0F2FE'
    }
  },

  // 41. Ziraat: ÇKS (Çiftçi Kayıt Sistemi) & TARSİM Sigortası
  {
    matcher: (l: string) =>
      l.includes('çks') || l.includes('cks') || l.includes('tarsim') ||
      l.includes('tarım sigortası') || l.includes('çiftçi kayıt sistemi') || l.includes('mazot gübre desteği'),
    inference: {
      domain: 'ziraat_cks_tarsim',
      baslik: 'ÇKS Dosyası & TARSİM Sigorta Başvurusu',
      hazirlikZamani: 'Son Başvuru Tarihinden 3 Gün Önce',
      hazirlikSaatOncesi: 48,
      oncedenYapilacaklar: [
        'Tapu fotokopileri, muvafakatnameler ve kira sözleşmelerini Ziraat Odasına onaylat',
        'İlçe Tarım Müdürlüğüne ÇKS formlarını ve parsel beyanlarını teslim et',
        'TARSİM yetkili acentesinden don, dolu, fırtına ve yangın risk poliçesini kestir',
        'Doğal afet hasarında en geç 10 gün içinde TARSİM çağrı merkezine hasar ihbarı yap',
        'e-Devlet üzerinden Mazot-Gübre ve prim destekleme hakediş durumunu sorgula'
      ],
      akilliFisilti: '🌾 ÇKS kaydı süresinde yenilenmeyen araziler mazot-gübre devlet desteğinden ve TARSİM prim indiriminden faydalanamaz.',
      sesliFisilti: 'ÇKS dosya yenileme, mazot-gübre desteği ve TARSİM tarım sigortası adımları açıldı.',
      ikon: '🌾',
      renk: '#FEF3C7'
    }
  },

  // 42. Ziraat: Fidan Dikimi & Can Suyu
  {
    matcher: (l: string) =>
      l.includes('fidan diktik') || l.includes('fidan dikimi') || l.includes('ağaç diktik') ||
      l.includes('tüplü fidan') || l.includes('can suyu'),
    inference: {
      domain: 'ziraat_fidan_dikimi',
      baslik: 'Fidan Dikimi & Can Suyu Protokolü',
      hazirlikZamani: 'Dikimden Hemen Sonra',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'Dikim çukurunu fidan kökünden 2 kat geniş kaz; tabanına yanmış çiftlik gübresi harmanla',
        'Açık köklü fidanlarda kök tuvaleti yap (kırık ve hasarlı kökleri steril makasla kes)',
        'Fidan aşı noktasının toprak yüzeyinden en az 5-10 cm yukarıda kalmasına dikkat et',
        'Fidanı destek hereğine rüzgar yönüne göre esnek iple 8 şeklinde bağla',
        'Topraktaki hava boşluklarını kapatmak için bol miktarda ilk CAN SUYU ver'
      ],
      akilliFisilti: '🌱 Fidan aşı noktası toprağa gömülürse fidan anaç özelliğini kaybeder veya gövde çürüyerek kurur.',
      sesliFisilti: 'Kök tuvaleti, aşı boğazı hizası ve ilk can suyu dikim protokolü oluşturuldu.',
      ikon: '🌱',
      renk: '#DCFCE7'
    }
  },

  // 43. Ziraat: Çim Alan Bakımı & Verticut
  {
    matcher: (l: string) =>
      l.includes('çim biçme') || l.includes('cim bicme') || l.includes('çim havalandırma') ||
      l.includes('verticut') || l.includes('çim sarardı'),
    inference: {
      domain: 'ziraat_cim_bakimi',
      baslik: 'Çim Alan Bakımı & Verticut Protokolü',
      hazirlikZamani: 'Sabah Erken 07:30',
      hazirlikSaatOncesi: 0,
      oncedenYapilacaklar: [
        'Çim biçme makinesi bıçaklarının keskin olduğunu kontrol et (kör bıçak çimi sarartır)',
        'Çim boyunun 1/3\'ünden fazlasını tek seferde kesme (kademeli biçim)',
        'Çimleri sabah erken saatte sula; akşam sulamasından kaçın (ıslak yaprak pas mantarı yapar)',
        'Yılda iki kez keçe tabakasını temizlemek için verticut havalandırma yap',
        'Seyrelen kel bölgelere ara ekim tohumu serpip ince torfla ört'
      ],
      akilliFisilti: '🌱 Çimler akşam sulanırsa sabaha kadar ıslak kalan yapraklarda kahverengi yama ve pas mantarı oluşur.',
      sesliFisilti: 'Sabah erken fıskiye sulaması, 1/3 boy kesim ve verticut çim bakım kartı açıldı.',
      ikon: '🌱',
      renk: '#DCFCE7'
    }
  },

  // 44. Denizcilik: PSC Liman Devleti Denetimi & Paris MoU
  {
    matcher: (l: string) =>
      l.includes('psc') || l.includes('paris mou') || l.includes('med mou') || l.includes('liman devleti denetim'),
    inference: {
      domain: 'denizcilik_psc_paris_mou',
      baslik: 'PSC Liman Devleti Denetimi & Paris MoU',
      hazirlikZamani: 'Liman Öncesi 24 Saat (Gemi İçi Denetim)',
      hazirlikSaatOncesi: 24,
      oncedenYapilacaklar: [
        'Can filikaları indirme donanımı, motor çalıştırma ve acil durum dümen tatbikatını icra et',
        '15 PPM sintine separatörü (OWS) 3 yollu vana alarm ve otomatik durdurma testini doğrula',
        'Yağ Kayıt Jurnali (ORB Part I) ve Çöp Kayıt Jurnalini Başmühendis ve Kaptan imzalı hazırla',
        'Yangın damperleri, manyetik pusula deviasyon kartı, acil yangın pompası ve navigasyon fenerlerini test et',
        'Gemi adamları STCW ehliyetleri, MLC 2006 çalışma sözleşmeleri ve klas sertifikalarını denetim masasına aç'
      ],
      akilliFisilti: '⚓ Paris MoU ve Akdeniz MoU denetimlerinde filika indirme, yangın tatbikatı ve 15 PPM OWS arızası doğrudan geminin tutulmasına (detention) yol açar.',
      sesliFisilti: 'PSC Paris MoU denetimi için filika, OWS ve SOLAS emniyet çeklisti oluşturuldu.',
      ikon: '⚓',
      renk: '#CFFAFE'
    }
  },

  // 45. Denizcilik: Draft Survey & Yükleme Balans Hesabı
  {
    matcher: (l: string) =>
      l.includes('draft survey') || l.includes('draft hesabı') || l.includes('draft okuma') || l.includes('densimetre'),
    inference: {
      domain: 'denizcilik_draft_survey',
      baslik: 'Draft Survey & Yükleme Balans Hesabı',
      hazirlikZamani: 'Ölçümden 1 Saat Önce',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'Baş, kıç ve vasat (Forward, Aft, Midship) sancak/iskele draft değerlerini draft iskelesi veya botla oku',
        'Borda iskelesinden numune alarak kalibre densimetre ile deniz suyu yoğunluğunu (Specific Gravity) ölç',
        'Tüm balast, tatlı su, yakıt (FO/DO) ve sintine tanklarının iskandillerini (sounding) alarak hacimleri belirle',
        'Hogging/sagging omurga sehimi düzeltmesini uygulayarak gemi net deplasmanını ve yük miktarını hesapla',
        'Yükleyici/tahliye sörveyörü ile müşterek draft survey tutanağını (Survey Report) karşılıklı imza altına al'
      ],
      akilliFisilti: '🚢 Draft survey hesaplarında deniz suyu yoğunluğu (SG) densimetre ile yerinde ölçülmeden yapılan ağırlık hesabı binlerce tonluk navlun ihtilafına sebep olur.',
      sesliFisilti: 'Draft survey okuma, densimetre ve iskandil yük balans protokolü hazırlandı.',
      ikon: '🚢',
      renk: '#E0F2FE'
    }
  },

  // 46. Denizcilik: Balast Suyu Yönetimi & BWM Jurnali
  {
    matcher: (l: string) =>
      l.includes('balast jurnali') || l.includes('bwm') || l.includes('balast basma') || l.includes('balast tahliyesi') || l.includes('ballast water'),
    inference: {
      domain: 'denizcilik_bwm_balast_jurnali',
      baslik: 'Balast Suyu Yönetimi & BWM Jurnali',
      hazirlikZamani: 'Operasyon Öncesi (D-2 Standart Testi)',
      hazirlikSaatOncesi: 1,
      oncedenYapilacaklar: [
        'BWM D-2 arıtma sistemi (BWTS) UV lambaları ve filtrasyon basınç farkını operasyon öncesi test et',
        'Açık deniz derin su balast değişimini (Ballast Exchange) kıyıdan en az 200 deniz mili açıkta ve 200 metre derinlikte tamamla',
        'Balast Kayıt Jurnaline (BWRB) başlangıç/bitiş koordinatları, tank numaraları ve metreküp hacmini eksiksiz işle',
        'Pompa emiş ve basma basınçlarını sürekli izleyerek tank taşması veya havalık tıkanıklığını engelle',
        'Liman otoritesine ve PSC müfettişine ibraz edilmek üzere güncel Balast Su Bildirim Formunu hazırla'
      ],
      akilliFisilti: '🌊 IMO BWM Sözleşmesi uyarınca açık denizde derin su balast değişimi en az 200 mil açıkta ve 200 metre derinlikte yapılmalıdır.',
      sesliFisilti: 'BWM D-2 standart testi ve balast kayıt jurnali operasyon kartı oluşturuldu.',
      ikon: '🌊',
      renk: '#CFFAFE'
    }
  },

  // 47. Denizcilik: Passage Plan & Seyir Çeklisti
  {
    matcher: (l: string) =>
      l.includes('passage plan') || l.includes('sefer planı') || l.includes('kalkış hazırlığı') || l.includes('dümen testi') || l.includes('ecdis rota'),
    inference: {
      domain: 'denizcilik_passage_plan_kalkis',
      baslik: 'Passage Plan & Kalkış Seyir Çeklisti',
      hazirlikZamani: 'Kalkıştan 2 Saat Önce',
      hazirlikSaatOncesi: 2,
      oncedenYapilacaklar: [
        'Berthing to Berthing (Rıhtımdan rıhtıma) ECDIS rota planını, No-Go Area ve Squat derinlik paylarını onayla',
        'SOLAS kuralı: Dümen motorları (Steering Gear) ana/acil durum geçişini, tele-motor ve dümen açısı müşirini test et',
        'Manyetik pusula ve Gyro pusula repeater eşitlemesini yap; seyir fenerleri ve sesli sis düdüğünü dene',
        'VHF, GMDSS Navtex, EPIRB ve SART cihazlarının batarya ve alıcı testlerini gerçekleştir',
        'Liman kontrol (VTS) ile irtibata geçerek kalkış izni (Departure Clearance) ve römorkör/palamar koordinasyonunu sağla'
      ],
      akilliFisilti: '🧭 SOLAS Chapter V uyarınca kalkıştan en geç 12 saat önce acil durum dümen donanımı ve telsiz teçhizatı bizzat test edilmelidir.',
      sesliFisilti: 'SOLAS 12 saatlik acil dümen testi ve ECDIS passage plan çeklisti hazırlandı.',
      ikon: '🧭',
      renk: '#E0F2FE'
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
export function inferPredictiveActions(text: string, now: Date = new Date(), userDomain?: string): PredictiveInference | null {
  if (!text) return null;
  let lower = text.toLowerCase();
  
  // Kelime bazlı göreceli süreleri dakikaya dönüştür
  lower = lower
    .replace(/yarım\s*saat\s*sonra/gi, '30 dakika sonra')
    .replace(/çeyrek\s*saat\s*sonra/gi, '15 dakika sonra')
    .replace(/bir\s*buçuk\s*saat\s*sonra/gi, '90 dakika sonra')
    .replace(/uyandır/gi, 'alarm kur');

  // TEMEL İLKE: KULLANICIYA YAPAY İŞ ÇIKARMA (MİKRO GÖREV KURALI)
  // Tekil alarmlar, süreli sayaçlar, tekil tansiyon/vitamin, çamaşır/fırın/ocak, çöp ve standart randevularda
  // kullanıcıya yapay iş çıkarılmamalı, alt adımlar üretilmemelidir.
  const isMicroTaskCandidate =
    lower.includes('alarm') ||
    lower.includes('kaldır') ||
    /(\d+)\s*(dakika|dk|saat)\s*sonra/.test(lower) ||
    lower.includes('tansiyon ilac') ||
    lower.includes('vitamin') ||
    lower.includes('çamaşır') ||
    lower.includes('ocağın altı') ||
    lower.includes('fırını kapat') ||
    lower.includes('çöpü çıkar') ||
    lower.includes('çöp') ||
    (lower.includes('diş') && (lower.includes('randevu') || lower.includes('hekim') || lower.includes('salı') || lower.includes('çarşamba') || lower.includes('perşembe') || lower.includes('cuma') || lower.includes('yarın') || lower.includes('bugün'))) ||
    (lower.includes('doktor') && lower.includes('randevu'));

  if (isMicroTaskCandidate && !lower.includes('vize') && !lower.includes('final') && !lower.includes('ameliyat') && !lower.includes('cerrahi') && !lower.includes('implant cerrahi')) {
    return null;
  }

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
    const shortMatch = matchShortScenario(text, userDomain);
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
