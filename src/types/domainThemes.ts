export type ProfessionDomain =
  | 'OGRENCI'
  | 'CALISMIYORUM'
  | 'HUKUK'
  | 'FINANS'
  | 'MALIYE'
  | 'SAGLIK'
  | 'EGITIM'
  | 'TEKNIK'
  | 'MUHENDISLIK'
  | 'SAVUNMA'
  | 'LOJISTIK'
  | 'TICARET'
  | 'GASTRONOMI'
  | 'KUAFOR'
  | 'HAVACILIK'
  | 'KAMU'
  | 'ZIRAAT'
  | 'GENEL';

export interface ActionButtonConfig {
  id: string;
  label: string;
  icon: string;
  actionType: 'WHATSAPP' | 'TIMER' | 'LOTO_CHECK' | 'NAVIGATE' | 'COPY_TEMPLATE';
  payload?: string;
}

export interface DomainThemeConfig {
  domain: ProfessionDomain;
  displayName: string;
  bgCard: string;          // Kart arka planı (Soft pastel)
  borderAccent: string;    // Sol vurgu çizgisi ve border
  badgeBg: string;         // Kategori rozeti arka planı
  badgeText: string;       // Rozet yazı rengi
  btnPrimaryBg: string;    // Ana eylem butonu arka planı
  btnPrimaryText: string;  // Ana eylem butonu yazı rengi
  actions: ActionButtonConfig[];
}

export const DOMAIN_REGISTRY: Record<ProfessionDomain, DomainThemeConfig> = {
  OGRENCI: {
    domain: 'OGRENCI',
    displayName: 'Öğrenci',
    bgCard: 'bg-purple-50/70 border-purple-200',
    borderAccent: 'border-l-purple-500',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-900',
    btnPrimaryBg: 'bg-purple-600 hover:bg-purple-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'exam_camp', label: 'Sınav Kampı Kur', icon: '📚', actionType: 'COPY_TEMPLATE' },
      { id: 'lms_deadline', label: 'Turnitin / LMS', icon: '📝', actionType: 'NAVIGATE' },
      { id: 'absent_check', label: 'Devamsızlık Sayacı', icon: '⏱️', actionType: 'TIMER' }
    ]
  },

  CALISMIYORUM: {
    domain: 'CALISMIYORUM',
    displayName: 'Kişisel Yaşam & Ev',
    bgCard: 'bg-slate-50/80 border-slate-200',
    borderAccent: 'border-l-slate-400',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    btnPrimaryBg: 'bg-slate-700 hover:bg-slate-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'bill_track', label: 'Fatura & Kira', icon: '💳', actionType: 'COPY_TEMPLATE' },
      { id: 'contract_end', label: 'Taahhüt Bitişi', icon: '📅', actionType: 'TIMER' },
      { id: 'home_cycle', label: 'Periyodik Bakım', icon: '🔄', actionType: 'LOTO_CHECK' }
    ]
  },

  HUKUK: {
    domain: 'HUKUK',
    displayName: 'Hukuk & Adalet',
    bgCard: 'bg-indigo-50/70 border-indigo-200',
    borderAccent: 'border-l-indigo-600',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    btnPrimaryBg: 'bg-indigo-600 hover:bg-indigo-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'uets_calc', label: 'UETS 7/a Süre Hesabı', icon: '⚖️', actionType: 'COPY_TEMPLATE' },
      { id: 'mazeret_draft', label: 'Mazeret Dilekçesi', icon: '📄', actionType: 'COPY_TEMPLATE' },
      { id: 'court_nav', label: 'Adliye / Duruşma', icon: '🏛️', actionType: 'NAVIGATE' }
    ]
  },

  FINANS: {
    domain: 'FINANS',
    displayName: 'Mali Müşavir & SMMM',
    bgCard: 'bg-emerald-50/70 border-emerald-200',
    borderAccent: 'border-l-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    btnPrimaryBg: 'bg-emerald-600 hover:bg-emerald-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'kdv_counter', label: "26'sı KDV Sayacı", icon: '📊', actionType: 'TIMER' },
      { id: 'sgk_end', label: 'Ay Sonu SGK & Berat', icon: '📑', actionType: 'TIMER' },
      { id: 'request_docs', label: 'Evrak İsteme Şablonu', icon: '💬', actionType: 'WHATSAPP' }
    ]
  },

  MALIYE: {
    domain: 'MALIYE',
    displayName: 'Mali Müşavir & SMMM',
    bgCard: 'bg-emerald-50/70 border-emerald-200',
    borderAccent: 'border-l-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    btnPrimaryBg: 'bg-emerald-600 hover:bg-emerald-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'kdv_counter', label: "26'sı KDV Sayacı", icon: '📊', actionType: 'TIMER' },
      { id: 'sgk_end', label: 'Ay Sonu SGK & Berat', icon: '📑', actionType: 'TIMER' },
      { id: 'request_docs', label: 'Evrak İsteme Şablonu', icon: '💬', actionType: 'WHATSAPP' }
    ]
  },

  SAGLIK: {
    domain: 'SAGLIK',
    displayName: 'Sağlık, Klinik & Tıp',
    bgCard: 'bg-teal-50/70 border-teal-200',
    borderAccent: 'border-l-teal-600',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-900',
    btnPrimaryBg: 'bg-teal-600 hover:bg-teal-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'urgent_consult', label: '30 Dk Acil Konsültasyon', icon: '🚨', actionType: 'TIMER' },
      { id: 'sbar_handover', label: 'SBAR Nöbet Devri', icon: '📋', actionType: 'COPY_TEMPLATE' },
      { id: 'cold_chain', label: '2-8°C Soğuk Zincir', icon: '❄️', actionType: 'LOTO_CHECK' }
    ]
  },

  EGITIM: {
    domain: 'EGITIM',
    displayName: 'Eğitim & Okul Yönetimi',
    bgCard: 'bg-amber-50/70 border-amber-200',
    borderAccent: 'border-l-amber-500',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    btnPrimaryBg: 'bg-amber-600 hover:bg-amber-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'kbs_counter', label: '20-27 Ek Ders / KBS', icon: '📋', actionType: 'TIMER' },
      { id: 'exam_10days', label: '10 Gün Sınav Sayacı', icon: '✍️', actionType: 'TIMER' },
      { id: 'food_sample', label: '72s Yemek Numunesi', icon: '🍱', actionType: 'LOTO_CHECK' },
      { id: 'proctor_alarm', label: 'Gözetmenlik (T-25)', icon: '🎓', actionType: 'TIMER' }
    ]
  },

  TEKNIK: {
    domain: 'TEKNIK',
    displayName: 'Mühendislik & Teknik',
    bgCard: 'bg-amber-50/70 border-amber-200',
    borderAccent: 'border-l-amber-500',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    btnPrimaryBg: 'bg-amber-600 hover:bg-amber-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'loto', label: 'LOTO Teyit Et', icon: '🔒', actionType: 'LOTO_CHECK' },
      { id: 'client_quote', label: 'Müşteri Onayı İste', icon: '📞', actionType: 'WHATSAPP' }
    ]
  },

  MUHENDISLIK: {
    domain: 'MUHENDISLIK',
    displayName: 'Mühendislik & Teknik',
    bgCard: 'bg-amber-50/70 border-amber-200',
    borderAccent: 'border-l-amber-500',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    btnPrimaryBg: 'bg-amber-600 hover:bg-amber-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'loto', label: 'LOTO Teyit Et', icon: '🔒', actionType: 'LOTO_CHECK' },
      { id: 'client_quote', label: 'Müşteri Onayı İste', icon: '📞', actionType: 'WHATSAPP' }
    ]
  },

  SAVUNMA: {
    domain: 'SAVUNMA',
    displayName: 'Savunma & Emniyet',
    bgCard: 'bg-blue-50/70 border-blue-200',
    borderAccent: 'border-l-blue-700',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-900',
    btnPrimaryBg: 'bg-blue-800 hover:bg-blue-900',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'cmk_timer', label: '24s Gözaltı Sayacı', icon: '⏱️', actionType: 'TIMER' },
      { id: 'fezleke', label: 'Fezleke Başlığı Al', icon: '📂', actionType: 'COPY_TEMPLATE' }
    ]
  },

  LOJISTIK: {
    domain: 'LOJISTIK',
    displayName: 'Lojistik & Ağır Vasıta',
    bgCard: 'bg-orange-50/70 border-orange-200',
    borderAccent: 'border-l-orange-600',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-900',
    btnPrimaryBg: 'bg-orange-600 hover:bg-orange-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'tacho_rest', label: 'Takograf 45dk Mola', icon: '🛑', actionType: 'TIMER' },
      { id: 'ramp_nav', label: 'Rampaya Rota Aç', icon: '📍', actionType: 'NAVIGATE' }
    ]
  },

  TICARET: {
    domain: 'TICARET',
    displayName: 'Ticaret & Esnaf',
    bgCard: 'bg-amber-50/70 border-amber-200',
    borderAccent: 'border-l-amber-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    btnPrimaryBg: 'bg-amber-600 hover:bg-amber-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'follow_quote', label: 'Teklif Sıcak Takip', icon: '💼', actionType: 'TIMER' },
      { id: 'z_report', label: 'Z Raporu & Kasa', icon: '🧾', actionType: 'COPY_TEMPLATE' }
    ]
  },

  GASTRONOMI: {
    domain: 'GASTRONOMI',
    displayName: 'Gastronomi & Mutfak',
    bgCard: 'bg-emerald-50/70 border-emerald-200',
    borderAccent: 'border-l-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    btnPrimaryBg: 'bg-emerald-700 hover:bg-emerald-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'misenplace', label: 'Mise en Place Bitiş', icon: '🔪', actionType: 'TIMER' },
      { id: 'haccp', label: 'HACCP Isı Kaydı', icon: '❄️', actionType: 'COPY_TEMPLATE' }
    ]
  },

  KUAFOR: {
    domain: 'KUAFOR',
    displayName: 'Kuaför & Güzellik',
    bgCard: 'bg-pink-50/70 border-pink-200',
    borderAccent: 'border-l-pink-500',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-900',
    btnPrimaryBg: 'bg-pink-600 hover:bg-pink-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'oryal_timer', label: 'Oryal / Açma Sayacı (40 Dk)', icon: '⏱️', actionType: 'TIMER' },
      { id: 'elastic_check', label: '15. Dk Elastikiyet Kontrolü', icon: '✂️', actionType: 'TIMER' },
      { id: 'sterilize_stock', label: 'Sterilizasyon & Sarf Stok', icon: '🧴', actionType: 'COPY_TEMPLATE' }
    ]
  },

  HAVACILIK: {
    domain: 'HAVACILIK',
    displayName: 'Havacılık & Kokpit',
    bgCard: 'bg-slate-50/80 border-slate-300',
    borderAccent: 'border-l-slate-800',
    badgeBg: 'bg-slate-200',
    badgeText: 'text-slate-800',
    btnPrimaryBg: 'bg-slate-900 hover:bg-black',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'briefing', label: 'Dispatch / OFP', icon: '✈️', actionType: 'NAVIGATE' },
      { id: 'fdp_check', label: 'FDP Dinlenme Teyidi', icon: '🛡️', actionType: 'LOTO_CHECK' }
    ]
  },

  KAMU: {
    domain: 'KAMU',
    displayName: 'Kamu & Kurumsal Ofis',
    bgCard: 'bg-purple-50/70 border-purple-200',
    borderAccent: 'border-l-purple-600',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-900',
    btnPrimaryBg: 'bg-purple-700 hover:bg-purple-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'sgk_check', label: 'SGK İşe Giriş Bildirgesi', icon: '👥', actionType: 'TIMER' },
      { id: 'meeting_buffer', label: 'Toplantı Brifing Dosyası', icon: '🗂️', actionType: 'COPY_TEMPLATE' },
      { id: 'trial_eval', label: 'Deneme Süresi Formu', icon: '📝', actionType: 'COPY_TEMPLATE' }
    ]
  },

  ZIRAAT: {
    domain: 'ZIRAAT',
    displayName: 'Ziraat & Peyzaj',
    bgCard: 'bg-lime-50/70 border-lime-200',
    borderAccent: 'border-l-lime-600',
    badgeBg: 'bg-lime-100',
    badgeText: 'text-lime-900',
    btnPrimaryBg: 'bg-lime-700 hover:bg-lime-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'sunset_water', label: 'Akşam Serinliği (19:30)', icon: '🌿', actionType: 'TIMER' },
      { id: 'orchid_submerge', label: 'Daldırma Sulama', icon: '🌸', actionType: 'COPY_TEMPLATE' }
    ]
  },

  GENEL: {
    domain: 'GENEL',
    displayName: 'Kişisel Asistan',
    bgCard: 'bg-stone-50/80 border-stone-200',
    borderAccent: 'border-l-stone-500',
    badgeBg: 'bg-stone-200',
    badgeText: 'text-stone-800',
    btnPrimaryBg: 'bg-stone-800 hover:bg-stone-900',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'share', label: 'Paylaş', icon: '↗️', actionType: 'COPY_TEMPLATE' }
    ]
  }
};

export interface WorkDomainOption {
  id: ProfessionDomain;
  label: string;
  sublabel: string;
  icon: string;
  category: 'meslek' | 'ozel';
}

export const WORK_DOMAIN_OPTIONS: WorkDomainOption[] = [
  { id: 'GENEL', label: 'Genel / Kişisel', sublabel: 'Dengeli kişisel yaşam asistanı (Tüm alanlar eşit)', icon: '🌐', category: 'ozel' },
  { id: 'OGRENCI', label: 'Öğrenci', sublabel: 'Vize/final sınavları, ders kaydı, ödev teslimi, burs/KYK', icon: '🎓', category: 'ozel' },
  { id: 'CALISMIYORUM', label: 'Kişisel Yaşam & Ev', sublabel: 'Abonelik takibi, fatura & kira, periyodik ev bakımı, rutinler', icon: '🏠', category: 'ozel' },
  { id: 'HUKUK', label: 'Hukuk & Adalet', sublabel: 'Avukat, Hakim, Noter (UYAP, duruşma, tebligat öncelikli)', icon: '⚖️', category: 'meslek' },
  { id: 'FINANS', label: 'Mali Müşavir & Finans', sublabel: 'SMMM, Muhasebe (KDV, SGK, e-Defter, beyanname öncelikli)', icon: '📊', category: 'meslek' },
  { id: 'SAGLIK', label: 'Sağlık, Klinik & Tıp', sublabel: 'Doktor, Hemşire, Eczacı (SBAR, order, soğuk zincir öncelikli)', icon: '🩺', category: 'meslek' },
  { id: 'EGITIM', label: 'Eğitim & Okul Yönetimi', sublabel: 'Öğretmen, Müdür, Akademisyen (e-Okul, sınav okuma, KBS)', icon: '📚', category: 'meslek' },
  { id: 'TEKNIK', label: 'Mühendislik & Teknik', sublabel: 'İnşaat, Elektrik, Makine, Yazılım (Beton, LOTO, deploy)', icon: '🏗️', category: 'meslek' },
  { id: 'SAVUNMA', label: 'Savunma & Emniyet', sublabel: 'Polis, İtfaiye, Asker (Gözaltı, SCBA, içtima, tekmil)', icon: '👮', category: 'meslek' },
  { id: 'LOJISTIK', label: 'Lojistik & Otomotiv', sublabel: 'Ağır Vasıta Şoförü, Oto Tamircisi (Takograf, muayene, akü)', icon: '🚛', category: 'meslek' },
  { id: 'TICARET', label: 'Ticaret, Satış & Esnaf', sublabel: 'Satış Danışmanı, Kasiyer, Dükkan Sahibi (Teklif, kasa, Z raporu)', icon: '💼', category: 'meslek' },
  { id: 'GASTRONOMI', label: 'Gastronomi & Mutfak', sublabel: 'Şef, Aşçı, Mutfak Ekibi (Mise en place, HACCP, tadım)', icon: '👨‍🍳', category: 'meslek' },
  { id: 'KUAFOR', label: 'Kuaför & Güzellik', sublabel: 'Saç Tasarım, Kuaför, Renk Uzmanı (Dip açma, keratin, oryal)', icon: '✂️', category: 'meslek' },
  { id: 'HAVACILIK', label: 'Havacılık & Kokpit', sublabel: 'Pilot, Uçuş Operasyon (OFP, METAR, FDP dinlenme)', icon: '✈️', category: 'meslek' },
  { id: 'KAMU', label: 'Kamu & Kurumsal Ofis', sublabel: 'Devlet Memuru, İK, Bürokrasi (EBYS, CİMER, doğrudan temin)', icon: '🗂️', category: 'meslek' },
  { id: 'ZIRAAT', label: 'Ziraat & Botanik', sublabel: 'Bahçıvan, Peyzaj, Çiçekçi (Güneş kuralı, sulama serinliği)', icon: '🌿', category: 'meslek' },
];

export function detectDomainFromNote(note: { ikon?: string; baslik?: string; anomali_notu?: string | null; teshis_notu?: string | null; renk?: string }): ProfessionDomain {
  const icon = note.ikon || '';
  const text = `${note.baslik || ''} ${note.anomali_notu || ''} ${note.teshis_notu || ''}`.toLowerCase();

  if (icon === '🎓' || text.includes('vize') || text.includes('final') || text.includes('büt') || text.includes('ödev') || text.includes('turnitin') || text.includes('intihal') || text.includes('ders kaydı') || text.includes('kyk') || text.includes('burs') || text.includes('öğrenci') || text.includes('kampüs') || text.includes('gano') || text.includes('obs')) {
    return 'OGRENCI';
  }
  if (icon === '🏠' || text.includes('taahhüt') || text.includes('abonelik') || text.includes('gss') || text.includes('işkur') || text.includes('su arıtma') || text.includes('kombi bakımı') || text.includes('derin dondurucu') || text.includes('ecza dolabı') || text.includes('kira') || text.includes('aidat') || text.includes('iş başvurusu') || text.includes('mülakat') || text.includes('cv güncelle') || text.includes('özgeçmiş') || text.includes('emekli')) {
    return 'CALISMIYORUM';
  }
  if (icon === '⚖️' || icon === '📜' || (icon === '🏛️' && (text.includes('hukuk') || text.includes('mahkeme') || text.includes('savcı') || text.includes('hâkim') || text.includes('hakim'))) || text.includes('hukuk') || text.includes('duruşma') || text.includes('uyap') || text.includes('istinaf') || text.includes('tebligat') || text.includes('noter') || text.includes('beyanname')) {
    return 'HUKUK';
  }
  if (icon === '📊' || icon === '📈' || text.includes('kdv') || text.includes('muhsgk') || text.includes('smmm') || text.includes('beyanname') || text.includes('e-defter') || text.includes('berat') || text.includes('mali müşavir') || text.includes('finans')) {
    return 'FINANS';
  }
  if (icon === '🩺' || icon === '💉' || icon === '🦷' || icon === '💊' || text.includes('ilaç') || text.includes('hasta') || text.includes('doktor') || text.includes('hemşire') || text.includes('klinik') || text.includes('sbar') || text.includes('dekübitus')) {
    return 'SAGLIK';
  }
  if (icon === '📚' || icon === '🏫' || icon === '🍱' || (icon === '🏛️' && (text.includes('dys') || text.includes('okul') || text.includes('mem') || text.includes('müdür'))) || text.includes('e-okul') || text.includes('ek ders') || text.includes('kbs') || text.includes('devamsızlık mektubu') || text.includes('öğretmen') || text.includes('zümre') || text.includes('taşımalı') || text.includes('okul')) {
    return 'EGITIM';
  }
  if (icon === '🔧' || icon === '🛠️' || icon === '⚡' || icon === '⚙️' || icon === '📐' || icon === '💻' || text.includes('loto') || text.includes('arıza') || text.includes('bakım') || text.includes('şantiye') || text.includes('mimar') || text.includes('teknik') || text.includes('tamir')) {
    return 'TEKNIK';
  }
  if (icon === '👮' || icon === '🪖' || icon === '🛡️' || icon === '🎯' || text.includes('gözaltı') || text.includes('fezleke') || text.includes('polis') || text.includes('asker') || text.includes('emniyet') || text.includes('nöbet') || text.includes('savunma')) {
    return 'SAVUNMA';
  }
  if (icon === '🚛' || text.includes('takograf') || text.includes('aetr') || text.includes('kantar') || text.includes('dorse') || text.includes('şoför') || text.includes('lojistik') || text.includes('sevkiyat')) {
    return 'LOJISTIK';
  }
  if (icon === '💼' || icon === '🧾' || text.includes('teklif') || text.includes('z raporu') || text.includes('kasa') || text.includes('müşteri takibi') || text.includes('pos gün sonu')) {
    return 'TICARET';
  }
  if (icon === '👨‍🍳' || icon === '🔪' || icon === '❄️' || icon === '🍽️' || text.includes('haccp') || text.includes('mise en place') || text.includes('aşçı') || text.includes('mutfak') || text.includes('soğuk oda') || text.includes('gastronomi')) {
    return 'GASTRONOMI';
  }
  if (icon === '✂️' || text.includes('kuaför') || text.includes('kuafor') || text.includes('oryal') || text.includes('saç açma') || text.includes('sac acma') || text.includes('röfle') || text.includes('boya') || text.includes('keratin') || text.includes('fön') || text.includes('sterilizasyon')) {
    return 'KUAFOR';
  }
  if (icon === '✈️' || text.includes('pilot') || text.includes('kokpit') || text.includes('fdp') || text.includes('ofp') || text.includes('metar') || text.includes('uçuş')) {
    return 'HAVACILIK';
  }
  if (icon === '👥' || (icon === '🗂️' && (text.includes('sekreter') || text.includes('yönetici') || text.includes('brifing') || text.includes('vip') || text.includes('toplantı') || text.includes('kamu') || text.includes('memur'))) || text.includes('sekreter') || text.includes('insan kaynakları') || text.includes('işe giriş') || text.includes('işten çıkış') || text.includes('ebys') || text.includes('cimer') || text.includes('deneme süresi') || text.includes('yönetici asistanı') || text.includes('vip karşılama')) {
    return 'KAMU';
  }
  if (icon === '🌿' || icon === '🌱' || icon === '🌸' || text.includes('sulama') || text.includes('orkide') || text.includes('bahçe') || text.includes('çiçek')) {
    return 'ZIRAAT';
  }

  return 'GENEL';
}
