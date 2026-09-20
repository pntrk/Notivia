export type ProfessionDomain =
  | 'SADE'
  | 'GENEL'
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
  | 'VETERINER'
  | 'EMLAK'
  | 'DENIZCILIK'
  | 'GUMRUK'
  | 'ECZACILIK'
  | 'ISG';

export interface ActionButtonConfig {
  id: string;
  label: string;
  icon: string;
  actionType: 'WHATSAPP' | 'TIMER' | 'LOTO_CHECK' | 'NAVIGATE' | 'COPY_TEMPLATE' | 'CHECKLIST';
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
  SADE: {
    domain: 'SADE',
    displayName: 'Sade Not',
    bgCard: 'bg-stone-50/80 border-stone-200',
    borderAccent: 'border-l-stone-400',
    badgeBg: 'bg-stone-200/80',
    badgeText: 'text-stone-700',
    btnPrimaryBg: 'bg-stone-800 hover:bg-stone-900',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'share', label: 'Paylaş', icon: '↗️', actionType: 'COPY_TEMPLATE' }
    ]
  },

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
    displayName: 'Genel',
    bgCard: 'bg-stone-50/80 border-stone-200',
    borderAccent: 'border-l-stone-500',
    badgeBg: 'bg-stone-200',
    badgeText: 'text-stone-800',
    btnPrimaryBg: 'bg-stone-800 hover:bg-stone-900',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'bill_track', label: 'Fatura & Kira', icon: '💳', actionType: 'COPY_TEMPLATE' },
      { id: 'contract_end', label: 'Taahhüt Bitişi', icon: '📅', actionType: 'TIMER' },
      { id: 'home_cycle', label: 'Periyodik Bakım', icon: '🔄', actionType: 'LOTO_CHECK' },
      { id: 'share', label: 'Paylaş', icon: '↗️', actionType: 'COPY_TEMPLATE' }
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
    displayName: 'Savunma, Emniyet & Askeriye',
    bgCard: 'bg-blue-50/70 border-blue-200',
    borderAccent: 'border-l-blue-700',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-900',
    btnPrimaryBg: 'bg-blue-800 hover:bg-blue-900',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'cmk_timer', label: '24s Gözaltı Sayacı', icon: '⏱️', actionType: 'TIMER' },
      { id: 'silahlik_sayim', label: 'Silahlık & Doldur-Boşalt', icon: '🛡️', actionType: 'COPY_TEMPLATE' },
      { id: 'fezleke', label: 'Fezleke & Adli Emanet', icon: '📂', actionType: 'COPY_TEMPLATE' },
      { id: 'scba_check', label: 'SCBA 300 Bar & Arazöz', icon: '🚒', actionType: 'CHECKLIST' },
      { id: 'ictima_tekmil', label: 'İçtima & Künye Sayımı', icon: '🪖', actionType: 'CHECKLIST' },
      { id: 'xray_5188', label: '5188 ÖGG & X-Ray Testi', icon: '🔍', actionType: 'CHECKLIST' }
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
      { id: 'pretrip_check', label: 'Pre-Trip & King-Pin', icon: '🚛', actionType: 'LOTO_CHECK' },
      { id: 'cmr_reserve', label: 'CMR Rezerv & Şerh', icon: '📄', actionType: 'COPY_TEMPLATE' },
      { id: 'adr_check', label: 'ADR & UN Levha Kontrol', icon: '☣️', actionType: 'LOTO_CHECK' },
      { id: 'cold_chain', label: 'Frigo ATP & Isı Grafiği', icon: '❄️', actionType: 'LOTO_CHECK' },
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
      { id: 'ebys_paraf', label: 'EBYS / e-İmza Parafı', icon: '🖋️', actionType: 'COPY_TEMPLATE' },
      { id: 'cimer_track', label: 'CİMER Yasal Takip', icon: '🏛️', actionType: 'TIMER' },
      { id: 'temin_22d', label: '22/d Temin & TİF', icon: '🗂️', actionType: 'LOTO_CHECK' },
      { id: 'sgk_check', label: '5510 SGK İşe Giriş (T-1)', icon: '👥', actionType: 'TIMER' },
      { id: 'meeting_buffer', label: 'VIP Brifing & Tampon', icon: '🗂️', actionType: 'COPY_TEMPLATE' },
      { id: 'trial_eval', label: 'Deneme Süresi Formu', icon: '📝', actionType: 'COPY_TEMPLATE' },
      { id: 'board_decision', label: 'Yönetim Kurulu Karar Defteri', icon: '📜', actionType: 'COPY_TEMPLATE' }
    ]
  },

  ZIRAAT: {
    domain: 'ZIRAAT',
    displayName: 'Ziraat & Botanik',
    bgCard: 'bg-lime-50/70 border-lime-200',
    borderAccent: 'border-l-lime-600',
    badgeBg: 'bg-lime-100',
    badgeText: 'text-lime-900',
    btnPrimaryBg: 'bg-lime-700 hover:bg-lime-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'sunset_water', label: 'Akşam Sulama Hatırlatıcısı (19:30)', icon: '🌿', actionType: 'TIMER' },
      { id: 'orchid_morning', label: 'Orkide Sabah Daldırma (09:30)', icon: '🌸', actionType: 'TIMER' },
      { id: 'zirai_spray_wind', label: 'İlaçlama & Rüzgar Kontrolü', icon: '💨', actionType: 'COPY_TEMPLATE' },
      { id: 'bordo_bulamaci', label: 'Bordo Bulamacı & Aşı Macunu', icon: '🧪', actionType: 'COPY_TEMPLATE' },
      { id: 'tarsim_cks', label: 'ÇKS & TARSİM Takvimi', icon: '🌾', actionType: 'WHATSAPP' }
    ]
  },

  VETERINER: {
    domain: 'VETERINER',
    displayName: 'Veteriner Hekim & Hayvan Sağlığı',
    bgCard: 'bg-teal-50/75 border-teal-200',
    borderAccent: 'border-l-teal-600',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-800',
    btnPrimaryBg: 'bg-teal-700 hover:bg-teal-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'petvet_chip', label: 'Petvet Mikroçip & Pasaport', icon: '🐾', actionType: 'COPY_TEMPLATE' },
      { id: 'rabies_titer', label: 'Kuduz Titrasyon (3 Ay)', icon: '✈️', actionType: 'TIMER' },
      { id: 'preop_fasting', label: 'Pre-Op Açlık & Onam', icon: '🩺', actionType: 'COPY_TEMPLATE' },
      { id: 'postop_suture', label: 'Post-Op 8. Gün Dikiş', icon: '🧵', actionType: 'TIMER' },
      { id: 'turkvet_tag', label: 'TÜRKVET Küpeleme & Aşı', icon: '🐄', actionType: 'COPY_TEMPLATE' },
      { id: 'cmt_mastitis', label: 'CMT & Süt Arınma Karantinası', icon: '🥛', actionType: 'LOTO_CHECK' }
    ]
  },

  EMLAK: {
    domain: 'EMLAK',
    displayName: 'Gayrimenkul & Emlak',
    bgCard: 'bg-amber-50/75 border-amber-200',
    borderAccent: 'border-l-amber-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    btnPrimaryBg: 'bg-amber-700 hover:bg-amber-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'webtapu_submit', label: 'Web-Tapu Harç Mesajı', icon: '🏢', actionType: 'WHATSAPP' },
      { id: 'yer_gosterme', label: 'Yer Gösterme Tutanağı', icon: '🤝', actionType: 'COPY_TEMPLATE' },
      { id: 'dask_renewal', label: 'DASK & Rayiç Bedel', icon: '📑', actionType: 'COPY_TEMPLATE' },
      { id: 'mortgage_release', label: 'İpotek Fek Yazısı', icon: '🏛️', actionType: 'COPY_TEMPLATE' }
    ]
  },

  DENIZCILIK: {
    domain: 'DENIZCILIK',
    displayName: 'Denizcilik & Gemi',
    bgCard: 'bg-cyan-50/75 border-cyan-200',
    borderAccent: 'border-l-cyan-600',
    badgeBg: 'bg-cyan-100',
    badgeText: 'text-cyan-800',
    btnPrimaryBg: 'bg-cyan-700 hover:bg-cyan-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'psc_check', label: 'PSC Denetim Kontrolü', icon: '⚓', actionType: 'LOTO_CHECK' },
      { id: 'draft_survey', label: 'Draft Survey Yük Hesabı', icon: '🚢', actionType: 'COPY_TEMPLATE' },
      { id: 'ballast_log', label: 'Sintine & Balast Jurnali', icon: '🌊', actionType: 'COPY_TEMPLATE' },
      { id: 'passage_plan', label: 'Passage Plan & Seyir', icon: '🧭', actionType: 'COPY_TEMPLATE' },
      { id: 'pilot_ladder', label: 'Pilot Çarmıhı & MPX', icon: '🧑‍✈️', actionType: 'LOTO_CHECK' }
    ]
  },

  GUMRUK: {
    domain: 'GUMRUK',
    displayName: 'Gümrük & Dış Ticaret',
    bgCard: 'bg-indigo-50/75 border-indigo-200',
    borderAccent: 'border-l-indigo-600',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    btnPrimaryBg: 'bg-indigo-700 hover:bg-indigo-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'red_line_inspect', label: 'Kırmızı Hat Fiziki Muayene', icon: '📦', actionType: 'LOTO_CHECK' },
      { id: 'ordino_handover', label: 'Ordino & Konşimento Teslim', icon: '📑', actionType: 'COPY_TEMPLATE' },
      { id: 'atr_origin', label: 'ATR & Menşe Belgesi', icon: '🌐', actionType: 'COPY_TEMPLATE' }
    ]
  },

  ECZACILIK: {
    domain: 'ECZACILIK',
    displayName: 'Eczacılık & Medula SUT',
    bgCard: 'bg-rose-50/70 border-rose-200',
    borderAccent: 'border-l-rose-600',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-900',
    btnPrimaryBg: 'bg-rose-600 hover:bg-rose-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'cold_chain_check', label: '2-8°C Soğuk Zincir', icon: '❄️', actionType: 'LOTO_CHECK' },
      { id: 'medula_claim', label: 'Medula Provizyon & SUT', icon: '📑', actionType: 'COPY_TEMPLATE' },
      { id: 'rrs_red_rx', label: 'Renkli Reçete (RRS) & İTS', icon: '💊', actionType: 'TIMER' },
      { id: 'magistral_record', label: 'Majistral Formül Defteri', icon: '⚗️', actionType: 'COPY_TEMPLATE' }
    ]
  },

  ISG: {
    domain: 'ISG',
    displayName: 'İş Sağlığı ve Güvenliği (İSG)',
    bgCard: 'bg-amber-50/80 border-amber-300',
    borderAccent: 'border-l-amber-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    btnPrimaryBg: 'bg-amber-700 hover:bg-amber-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'ibys_training_rec', label: 'İBYS Eğitim Bildirimi', icon: '🦺', actionType: 'COPY_TEMPLATE' },
      { id: 'near_miss_dof', label: 'Ramak Kala & DÖF Tutanağı', icon: '⚠️', actionType: 'COPY_TEMPLATE' },
      { id: 'accident_3day', label: '3 Gün SGK Kaza Bildirimi', icon: '⏱️', actionType: 'TIMER' },
      { id: 'hot_work_permit', label: 'Sıcak İş & Kapalı Alan İzni', icon: '🔥', actionType: 'LOTO_CHECK' }
    ]
  },

  GENEL: {
    domain: 'GENEL',
    displayName: 'Genel',
    bgCard: 'bg-stone-50/80 border-stone-200',
    borderAccent: 'border-l-stone-500',
    badgeBg: 'bg-stone-200',
    badgeText: 'text-stone-800',
    btnPrimaryBg: 'bg-stone-800 hover:bg-stone-900',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'bill_track', label: 'Fatura & Kira', icon: '💳', actionType: 'COPY_TEMPLATE' },
      { id: 'contract_end', label: 'Taahhüt Bitişi', icon: '📅', actionType: 'TIMER' },
      { id: 'home_cycle', label: 'Periyodik Bakım', icon: '🔄', actionType: 'LOTO_CHECK' },
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
  { id: 'SADE', label: 'Sade Not (Motorsuz)', sublabel: 'Bilişsel motorlar kapalı; yalnızca söylediğiniz ham metni doğrudan not olarak kaydeder', icon: '📝', category: 'ozel' },
  { id: 'GENEL', label: 'Genel Yaşam', sublabel: 'Kişisel yaşam, ev, fatura & kira, abonelikler, alışveriş ve günlük rutinler', icon: '🏠', category: 'ozel' },
  { id: 'OGRENCI', label: 'Öğrenci', sublabel: 'Vize/final sınavları, ders kaydı, ödev teslimi, burs/KYK', icon: '🎓', category: 'ozel' },
  { id: 'HUKUK', label: 'Hukuk & Adalet', sublabel: 'Avukat, Hakim, Noter, Arabulucu (UYAP, duruşma, 89/1, tebligat öncelikli)', icon: '⚖️', category: 'meslek' },
  { id: 'FINANS', label: 'Mali Müşavir & Finans', sublabel: 'SMMM, Muhasebe (KDV tevkifatı, VUK 33, SGK, e-Defter, beyanname)', icon: '📊', category: 'meslek' },
  { id: 'SAGLIK', label: 'Sağlık, Klinik & Tıp', sublabel: 'Doktor, Hemşire, Eczacı (SBAR, aydınlatılmış onam, kan transfüzyon)', icon: '🩺', category: 'meslek' },
  { id: 'EGITIM', label: 'Eğitim & Okul Yönetimi', sublabel: 'Öğretmen, Müdür, Akademisyen (e-Okul, BEP, TEFBİS, sınav okuma, KBS)', icon: '📚', category: 'meslek' },
  { id: 'TEKNIK', label: 'Mühendislik & Şantiye', sublabel: 'İnşaat, Elektrik, Makine, Yazılım (SPT zemin, 30mA kaçak akım, LOTO, deploy)', icon: '🏗️', category: 'meslek' },
  { id: 'VETERINER', label: 'Veteriner & Hayvan Sağlığı', sublabel: 'Klinik Hekim (Petvet mikroçip, kuduz titrasyon, aşı takvimi, post-op)', icon: '🐾', category: 'meslek' },
  { id: 'EMLAK', label: 'Gayrimenkul & Emlak', sublabel: 'Emlak Danışmanı (Yetki belgesi, Web-Tapu harç, DASK, ipotek fek)', icon: '🏢', category: 'meslek' },
  { id: 'GUMRUK', label: 'Gümrük & Dış Ticaret', sublabel: 'Gümrük Müşaviri (Kırmızı hat muayene, ATR, konşimento, ordino teslim)', icon: '📦', category: 'meslek' },
  { id: 'DENIZCILIK', label: 'Denizcilik & Gemi İdaresi', sublabel: 'Kaptan, Gemi Zabitleri (PSC denetimi, ISM, draft survey, balast jurnali)', icon: '⚓', category: 'meslek' },
  { id: 'SAVUNMA', label: 'Savunma, Emniyet & Askeriye', sublabel: 'Polis, Jandarma, Asker, İtfaiye, Özel Güvenlik (CMK 91 gözaltı, fezleke, OYİ, içtima, silahlık, SCBA, 5188 ÖGG)', icon: '👮', category: 'meslek' },
  { id: 'LOJISTIK', label: 'Lojistik & Otomotiv', sublabel: 'Ağır Vasıta Şoförü, Oto Tamircisi (Takograf, muayene, CMR, akü)', icon: '🚛', category: 'meslek' },
  { id: 'TICARET', label: 'Ticaret, Satış & Esnaf', sublabel: 'Satış Danışmanı, Kasiyer, Dükkan Sahibi (Teklif, kasa, Z raporu)', icon: '💼', category: 'meslek' },
  { id: 'GASTRONOMI', label: 'Gastronomi & Mutfak', sublabel: 'Şef, Aşçı, Mutfak Ekibi (Mise en place, HACCP, soğuk oda, tadım)', icon: '👨‍🍳', category: 'meslek' },
  { id: 'KUAFOR', label: 'Kuaför & Güzellik', sublabel: 'Saç Tasarım, Kuaför, Renk Uzmanı (Dip açma, keratin, oryal)', icon: '✂️', category: 'meslek' },
  { id: 'HAVACILIK', label: 'Havacılık & Kokpit', sublabel: 'Pilot, Uçuş Operasyon (OFP, METAR, FDP dinlenme)', icon: '✈️', category: 'meslek' },
  { id: 'KAMU', label: 'Kamu & Kurumsal Ofis', sublabel: 'Devlet Memuru, İK, Bürokrasi (EBYS, CİMER, doğrudan temin 22/d)', icon: '🗂️', category: 'meslek' },
  { id: 'ZIRAAT', label: 'Ziraat & Botanik', sublabel: 'Bahçıvan, Peyzaj, Çiçekçi (Güneş kuralı, sulama serinliği)', icon: '🌿', category: 'meslek' },
  { id: 'ECZACILIK', label: 'Eczacılık & Medula SUT', sublabel: 'Eczacı, Eczane Teknikeri (Soğuk zincir 2-8°C, Medula SUT, kırmızı reçete İTS, majistral)', icon: '💊', category: 'meslek' },
  { id: 'ISG', label: 'İş Sağlığı ve Güvenliği (İSG)', sublabel: 'İSG Uzmanı, İşyeri Hekimi (İBYS eğitimi, periyodik muayene, ramak kala, 6331 risk)', icon: '🦺', category: 'meslek' },
];

export function detectDomainFromNote(note: { ikon?: string; baslik?: string; anomali_notu?: string | null; teshis_notu?: string | null; renk?: string }): ProfessionDomain {
  const icon = note.ikon || '';
  const text = `${note.baslik || ''} ${note.anomali_notu || ''} ${note.teshis_notu || ''}`.toLowerCase();

  if (icon === '📝' && !note.anomali_notu && !note.teshis_notu) {
    return 'SADE';
  }

  if (
    icon === '💊' || icon === '⚗️' ||
    text.includes('eczane') || text.includes('eczacı') || text.includes('medula') ||
    text.includes('sut provizyon') || text.includes('kırmızı reçete') || text.includes('kirmizi recete') ||
    text.includes('yeşil reçete') || text.includes('renkli reçete') || text.includes('rrs') ||
    text.includes('majistral') || text.includes('its karekod') || text.includes('soğuk zincir') ||
    text.includes('soguk zincir') || text.includes('aşı dolabı') || text.includes('miad')
  ) {
    return 'ECZACILIK';
  }

  if (
    icon === '🦺' ||
    text.includes('isg') || text.includes('iş sağlığı') || text.includes('is sagligi') ||
    text.includes('iş güvenliği') || text.includes('is guvenligi') || text.includes('ibys') ||
    text.includes('ramak kala') || text.includes('ramakkala') || text.includes('6331') ||
    text.includes('onaylı defter') || text.includes('risk değerlendirmesi') || text.includes('risk analizi') ||
    text.includes('kkd') || text.includes('periyodik muayene') || text.includes('sıcak iş') ||
    text.includes('kapalı alan') || text.includes('kaza bildirimi') || text.includes('iş kazası')
  ) {
    return 'ISG';
  }

  if (icon === '🐾' || text.includes('petvet') || text.includes('mikroçip') || text.includes('kuduz titrasyon') || text.includes('veteriner') || text.includes('kedi aşı') || text.includes('köpek aşı') || text.includes('parazit')) {
    return 'VETERINER';
  }
  if (
    icon === '🏢' ||
    text.includes('web-tapu') || text.includes('webtapu') || text.includes('dask') ||
    text.includes('ipotek fek') || text.includes('taşınmaz ticareti') || text.includes('rayiç bedel') ||
    text.includes('tapu harcı') || text.includes('cayma akçesi') || text.includes('tahliye taahhüt') ||
    text.includes('yer gösterme') || text.includes('kira sözleşmesi') || text.includes('kira kontratı') ||
    text.includes('emlak') || text.includes('gayrimenkul') || text.includes('takyidat') ||
    text.includes('imar durumu') || text.includes('iskan raporu') || text.includes('ada parsel') ||
    text.includes('taputakas') || text.includes('güvenli tapu') || text.includes('kiracı tahliye')
  ) {
    return 'EMLAK';
  }
  if (
    icon === '⚓' ||
    icon === '🚢' ||
    icon === '🌊' ||
    icon === '🧭' ||
    icon === '🧑‍✈️' ||
    text.includes('psc denetim') ||
    text.includes('draft survey') ||
    text.includes('sintine') ||
    text.includes('balast') ||
    text.includes('gemi') ||
    text.includes('kaptan') ||
    text.includes('denizcilik') ||
    text.includes('çarkçı') ||
    text.includes('zabit') ||
    text.includes('bunkering') ||
    text.includes('passage plan') ||
    text.includes('pilot çarmıh') ||
    text.includes('free pratique') ||
    text.includes('isps') ||
    text.includes('solas') ||
    text.includes('marpol')
  ) {
    return 'DENIZCILIK';
  }
  if (icon === '📦' || text.includes('kırmızı hat') || text.includes('antrepo') || text.includes('konşimento') || text.includes('ordino') || text.includes('atr belgesi') || text.includes('gümrük') || text.includes('supalan')) {
    return 'GUMRUK';
  }
  if (icon === '🎓' || text.includes('vize') || text.includes('final') || text.includes('büt') || text.includes('ödev') || text.includes('turnitin') || text.includes('intihal') || text.includes('ders kaydı') || text.includes('kyk') || text.includes('burs') || text.includes('öğrenci') || text.includes('kampüs') || text.includes('gano') || text.includes('obs')) {
    return 'OGRENCI';
  }
  if (icon === '🏠' || text.includes('taahhüt') || text.includes('abonelik') || text.includes('gss') || text.includes('işkur') || text.includes('su arıtma') || text.includes('kombi bakımı') || text.includes('derin dondurucu') || text.includes('ecza dolabı') || text.includes('kira') || text.includes('aidat') || text.includes('iş başvurusu') || text.includes('mülakat') || text.includes('cv güncelle') || text.includes('özgeçmiş') || text.includes('emekli')) {
    return 'GENEL';
  }
  if (icon === '⚖️' || icon === '📜' || (icon === '🏛️' && (text.includes('hukuk') || text.includes('mahkeme') || text.includes('savcı') || text.includes('hâkim') || text.includes('hakim'))) || text.includes('hukuk') || text.includes('duruşma') || text.includes('uyap') || text.includes('istinaf') || text.includes('tebligat') || text.includes('noter') || text.includes('beyanname') || text.includes('89/1') || text.includes('haciz ihbarnamesi') || text.includes('arabuluculuk') || text.includes('cmk 100') || text.includes('kyok')) {
    return 'HUKUK';
  }
  if (icon === '📊' || icon === '📈' || text.includes('kdv') || text.includes('muhsgk') || text.includes('smmm') || text.includes('beyanname') || text.includes('e-defter') || text.includes('berat') || text.includes('mali müşavir') || text.includes('finans') || text.includes('tevkifat') || text.includes('vuk 33') || text.includes('enflasyon düzeltmesi')) {
    return 'FINANS';
  }
  if (icon === '🩺' || icon === '💉' || icon === '🦷' || icon === '💊' || text.includes('ilaç') || text.includes('hasta') || text.includes('doktor') || text.includes('hemşire') || text.includes('klinik') || text.includes('sbar') || text.includes('dekübitus') || text.includes('aydınlatılmış onam') || text.includes('transfüzyon')) {
    return 'SAGLIK';
  }
  if (icon === '📚' || icon === '🏫' || icon === '🍱' || (icon === '🏛️' && (text.includes('dys') || text.includes('okul') || text.includes('mem') || text.includes('müdür'))) || text.includes('e-okul') || text.includes('ek ders') || text.includes('kbs') || text.includes('devamsızlık mektubu') || text.includes('öğretmen') || text.includes('zümre') || text.includes('taşımalı') || text.includes('okul') || text.includes('bep') || text.includes('tefbis')) {
    return 'EGITIM';
  }
  if (icon === '🔧' || icon === '🛠️' || icon === '⚡' || icon === '⚙️' || icon === '📐' || icon === '💻' || text.includes('loto') || text.includes('arıza') || text.includes('bakım') || text.includes('şantiye') || text.includes('mimar') || text.includes('teknik') || text.includes('tamir') || text.includes('spt') || text.includes('kaçak akım')) {
    return 'TEKNIK';
  }
  if (
    icon === '👮' || icon === '🪖' || icon === '🛡️' || icon === '🎯' || icon === '🚒' ||
    text.includes('gözaltı') || text.includes('gozalti') || text.includes('fezleke') ||
    text.includes('nezarethane') || text.includes('polis') || text.includes('asker') ||
    text.includes('emniyet') || text.includes('jandarma') || text.includes('itfaiye') ||
    text.includes('scba') || text.includes('içtima') || text.includes('tekmil') ||
    text.includes('silahlık') || text.includes('doldur-boşalt') || text.includes('doldur boşalt') ||
    text.includes('özel güvenlik') || text.includes('5188') || text.includes('x-ray') ||
    text.includes('olay yeri inceleme') || text.includes('adli emanet') || text.includes('savunma')
  ) {
    return 'SAVUNMA';
  }
  if (
    icon === '🚛' ||
    icon === '🚚' ||
    text.includes('takograf') ||
    text.includes('aetr') ||
    text.includes('kantar') ||
    text.includes('dorse') ||
    text.includes('treyler') ||
    text.includes('şoför') ||
    text.includes('sofor') ||
    text.includes('çekici') ||
    text.includes('cekici') ||
    text.includes('lojistik') ||
    text.includes('sevkiyat') ||
    text.includes('cmr') ||
    text.includes('sevk irsaliyesi') ||
    text.includes('taşıma irsaliyesi') ||
    text.includes('hasar rezerv') ||
    text.includes('adr') ||
    text.includes('tehlikeli madde') ||
    text.includes('un no') ||
    text.includes('src5') ||
    text.includes('src-5') ||
    text.includes('turuncu plaka') ||
    text.includes('kemler') ||
    text.includes('frigo') ||
    text.includes('soğuk zincir') ||
    text.includes('soguk zincir') ||
    text.includes('atp') ||
    text.includes('data logger') ||
    text.includes('termokin') ||
    text.includes('ncts') ||
    text.includes('t1') ||
    text.includes('mrn') ||
    text.includes('tir karnesi') ||
    text.includes('wms') ||
    text.includes('cross-docking') ||
    text.includes('mal kabul') ||
    text.includes('rampa randevu') ||
    text.includes('solas vgm') ||
    text.includes('vgm') ||
    text.includes('demuraj') ||
    text.includes('detention') ||
    text.includes('ardiye') ||
    text.includes('lashing') ||
    text.includes('spanzet') ||
    text.includes('en 12195') ||
    text.includes('hava kargo') ||
    text.includes('iata') ||
    text.includes('awb') ||
    text.includes('intermodal') ||
    text.includes('ro-ro') ||
    text.includes('ro-la') ||
    text.includes('swap body') ||
    text.includes('last-mile') ||
    text.includes('last mile') ||
    text.includes('kurye') ||
    text.includes('teslimat kodu') ||
    text.includes('pod') ||
    text.includes('tüvtürk') ||
    text.includes('tuvturk') ||
    text.includes('king-pin') ||
    text.includes('kingpin')
  ) {
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
  if (
    icon === '🌿' || icon === '🌱' || icon === '🌸' || icon === '🌾' ||
    text.includes('sulama') || text.includes('orkide') || text.includes('bahçe') || text.includes('çiçek') ||
    text.includes('suvar') || text.includes('sulayuver') || text.includes('suver') || text.includes('çiçekler susamış') ||
    text.includes('budama') || text.includes('gübre') || text.includes('gubre') || text.includes('zirai') ||
    text.includes('pestisit') || text.includes('fungisit') || text.includes('herbisit') || text.includes('bordo bulamacı') ||
    text.includes('aşı macunu') || text.includes('çks') || text.includes('tarsim') || text.includes('damlama') ||
    text.includes('kaktüs') || text.includes('sukulent') || text.includes('sardunya') || text.includes('tarla') ||
    text.includes('hasat') || text.includes('fidan') || text.includes('peyzaj') || text.includes('botanik') ||
    text.includes('seracılık') || text.includes('sera') || text.includes('zirai don')
  ) {
    return 'ZIRAAT';
  }

  return 'GENEL';
}
