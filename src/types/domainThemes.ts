export type ProfessionDomain =
  // Özel & Genel Modlar
  | 'SADE'
  | 'GENEL'
  | 'OGRENCI'
  | 'CALISMIYORUM'
  // MYK Resmî 27 Sektör Motoru
  | 'ADALET_GUVENLIK'
  | 'AGAC_KAGIT'
  | 'BILISIM'
  | 'CAM_CIMENTO_TOPRAK'
  | 'CEVRE'
  | 'EGITIM'
  | 'ELEKTRIK_ELEKTRONIK'
  | 'ENERJI'
  | 'FINANS'
  | 'GIDA'
  | 'INSAAT'
  | 'IS_YONETIM'
  | 'KIMYA_PETROL_PLASTIK'
  | 'KULTUR_SANAT_TASARIM'
  | 'MADEN'
  | 'MAKINE'
  | 'MEDYA_ILETISIM_YAYIN'
  | 'METAL'
  | 'OTOMOTIV'
  | 'SAGLIK_SOSYAL'
  | 'SPOR_REKREASYON'
  | 'TARIM_AV_BALIK'
  | 'TEKSTIL_GIYIM_DERI'
  | 'TICARET'
  | 'TOPLUMSAL_KISISEL'
  | 'TURIZM_KONAKLAMA_YIYECEK'
  | 'ULASTIRMA_LOJISTIK'
  // Geriye Dönük Uyumluluk (Legacy Aliases)
  | 'HUKUK'
  | 'MALIYE'
  | 'SAGLIK'
  | 'TEKNIK'
  | 'MUHENDISLIK'
  | 'SAVUNMA'
  | 'LOJISTIK'
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
  | 'ISG'
  | 'SANAT_MEDYA';

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

  SANAT_MEDYA: {
    domain: 'SANAT_MEDYA',
    displayName: 'Sanat & Medya',
    bgCard: 'bg-rose-50/70 border-rose-200',
    borderAccent: 'border-l-rose-500',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/40',
    badgeText: 'text-rose-900 dark:text-rose-200',
    btnPrimaryBg: 'bg-rose-600 hover:bg-rose-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'call_sheet_btn', label: 'Call Sheet & Set Planı', icon: '🎬', actionType: 'COPY_TEMPLATE' },
      { id: 'reels_hook_btn', label: 'Reels & TikTok Kanca (Hook)', icon: '📱', actionType: 'COPY_TEMPLATE' },
      { id: 'influencer_brief_btn', label: '#İşbirliği Yasal Briefi', icon: '🤝', actionType: 'COPY_TEMPLATE' },
      { id: 'fsek_copyright_btn', label: '5846 FSEK Telif Devri', icon: '📜', actionType: 'COPY_TEMPLATE' }
    ]
  },

  // =========================================================================
  // MYK RESMÎ 27 SEKTÖR STANDARDI (Mesleki Yeterlilik Kurumu)
  // =========================================================================

  ADALET_GUVENLIK: {
    domain: 'ADALET_GUVENLIK',
    displayName: 'Adalet ve Güvenlik',
    bgCard: 'bg-indigo-50/70 border-indigo-200',
    borderAccent: 'border-l-indigo-600',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    btnPrimaryBg: 'bg-indigo-600 hover:bg-indigo-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'uets_calc', label: 'UETS 7/a Süre Hesabı', icon: '⚖️', actionType: 'COPY_TEMPLATE' },
      { id: 'mazeret_draft', label: 'Mazeret Dilekçesi', icon: '📄', actionType: 'COPY_TEMPLATE' },
      { id: 'court_nav', label: 'Adliye / Duruşma', icon: '🏛️', actionType: 'NAVIGATE' },
      { id: 'gozalti_sayac', label: '24s Gözaltı Fezleke', icon: '⏱️', actionType: 'TIMER' }
    ]
  },

  AGAC_KAGIT: {
    domain: 'AGAC_KAGIT',
    displayName: 'Ağaç İşleri, Kağıt ve Kağıt Ürünleri',
    bgCard: 'bg-amber-50/75 border-amber-200',
    borderAccent: 'border-l-amber-700',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    btnPrimaryBg: 'bg-amber-800 hover:bg-amber-900',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'ebatlama_list', label: 'Ebatlama & Kesim Planı', icon: '🪵', actionType: 'COPY_TEMPLATE' },
      { id: 'nem_olcum', label: '%8-12 Ahşap Nem Testi', icon: '💧', actionType: 'LOTO_CHECK' },
      { id: 'kenar_bant', label: 'PVC Kenar Bantlama', icon: '📏', actionType: 'CHECKLIST' }
    ]
  },

  BILISIM: {
    domain: 'BILISIM',
    displayName: 'Bilişim Teknolojileri',
    bgCard: 'bg-sky-50/70 border-sky-200',
    borderAccent: 'border-l-sky-600',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-900',
    btnPrimaryBg: 'bg-sky-600 hover:bg-sky-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'deploy_check', label: 'Prod Deploy & Rollback', icon: '🚀', actionType: 'LOTO_CHECK' },
      { id: 'pr_review', label: 'PR Review & SemVer', icon: '💻', actionType: 'CHECKLIST' },
      { id: 'db_migration', label: 'DB Migration Yedek', icon: '🗄️', actionType: 'COPY_TEMPLATE' }
    ]
  },

  CAM_CIMENTO_TOPRAK: {
    domain: 'CAM_CIMENTO_TOPRAK',
    displayName: 'Cam, Çimento ve Toprak',
    bgCard: 'bg-stone-100/80 border-stone-300',
    borderAccent: 'border-l-stone-600',
    badgeBg: 'bg-stone-200',
    badgeText: 'text-stone-900',
    btnPrimaryBg: 'bg-stone-700 hover:bg-stone-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'firin_sicaklik', label: 'Klinker Fırın Isı Logu', icon: '🔥', actionType: 'LOTO_CHECK' },
      { id: 'basinc_test', label: 'Basınç Dayanımı Kontrolü', icon: '🧱', actionType: 'COPY_TEMPLATE' },
      { id: 'tavlama_gerilme', label: 'Cam Tavlama Gerilim Testi', icon: '🪟', actionType: 'CHECKLIST' }
    ]
  },

  CEVRE: {
    domain: 'CEVRE',
    displayName: 'Çevre',
    bgCard: 'bg-emerald-50/75 border-emerald-200',
    borderAccent: 'border-l-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    btnPrimaryBg: 'bg-emerald-600 hover:bg-emerald-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'ced_takip', label: 'ÇED & Emisyon İzin Süreci', icon: '📋', actionType: 'TIMER' },
      { id: 'atik_motat', label: 'MoTAT Atık Taşıma Formu', icon: '♻️', actionType: 'COPY_TEMPLATE' },
      { id: 'aritma_debi', label: 'Arıtma Çıkış pH/KOİ Analizi', icon: '🧪', actionType: 'LOTO_CHECK' }
    ]
  },

  ELEKTRIK_ELEKTRONIK: {
    domain: 'ELEKTRIK_ELEKTRONIK',
    displayName: 'Elektrik ve Elektronik',
    bgCard: 'bg-yellow-50/75 border-yellow-200',
    borderAccent: 'border-l-yellow-600',
    badgeBg: 'bg-yellow-100',
    badgeText: 'text-yellow-900',
    btnPrimaryBg: 'bg-yellow-600 hover:bg-yellow-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'loto_lock', label: 'LOTO Enerji İzolasyonu', icon: '🔒', actionType: 'LOTO_CHECK' },
      { id: 'kacak_akim', label: '30mA Kaçak Akım Testi', icon: '⚡', actionType: 'CHECKLIST' },
      { id: 'kompanzasyon_sayac', label: 'Endüktif/Kapasitif Sayaç', icon: '📊', actionType: 'COPY_TEMPLATE' }
    ]
  },

  ENERJI: {
    domain: 'ENERJI',
    displayName: 'Enerji',
    bgCard: 'bg-cyan-50/75 border-cyan-200',
    borderAccent: 'border-l-cyan-600',
    badgeBg: 'bg-cyan-100',
    badgeText: 'text-cyan-900',
    btnPrimaryBg: 'bg-cyan-600 hover:bg-cyan-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'epias_gop', label: 'EPİAŞ GÖP Teklif Girişi', icon: '⚡', actionType: 'TIMER' },
      { id: 'trafo_bakim', label: 'Trafo İzolasyon Yağ Testi', icon: '🔋', actionType: 'LOTO_CHECK' },
      { id: 'ges_inverter', label: 'İnvertör & Üretim İzleme', icon: '☀️', actionType: 'COPY_TEMPLATE' }
    ]
  },

  GIDA: {
    domain: 'GIDA',
    displayName: 'Gıda',
    bgCard: 'bg-lime-50/75 border-lime-200',
    borderAccent: 'border-l-lime-600',
    badgeBg: 'bg-lime-100',
    badgeText: 'text-lime-900',
    btnPrimaryBg: 'bg-lime-600 hover:bg-lime-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'haccp_ccp', label: 'HACCP Kritik Kontrol (CCP)', icon: '🌡️', actionType: 'LOTO_CHECK' },
      { id: 'parti_lot', label: 'Parti/Lot İzlenebilirlik', icon: '🌾', actionType: 'COPY_TEMPLATE' },
      { id: 'soguk_oda_log', label: '+4°C / -18°C Isı Çizelgesi', icon: '❄️', actionType: 'CHECKLIST' }
    ]
  },

  INSAAT: {
    domain: 'INSAAT',
    displayName: 'İnşaat',
    bgCard: 'bg-amber-50/75 border-amber-200',
    borderAccent: 'border-l-amber-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    btnPrimaryBg: 'bg-amber-600 hover:bg-amber-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'beton_kirim', label: '7 & 28 Gün Kırım Testi', icon: '🏗️', actionType: 'TIMER' },
      { id: 'donati_teslim', label: 'Demir Donatı & Paspayı', icon: '📐', actionType: 'CHECKLIST' },
      { id: 'hakedis_metraj', label: 'Metraj & Yeşil Defter', icon: '📑', actionType: 'COPY_TEMPLATE' }
    ]
  },

  IS_YONETIM: {
    domain: 'IS_YONETIM',
    displayName: 'İş ve Yönetim',
    bgCard: 'bg-slate-50/80 border-slate-200',
    borderAccent: 'border-l-slate-600',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-900',
    btnPrimaryBg: 'bg-slate-700 hover:bg-slate-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'ik_bordro', label: 'SGK İşe Giriş / Çıkış Bildirimi', icon: '👥', actionType: 'COPY_TEMPLATE' },
      { id: 'yonetim_kurul', label: 'Karar Defteri & Hazirun', icon: '🗂️', actionType: 'COPY_TEMPLATE' },
      { id: 'iso9001_dof', label: 'DÖF & İç Tetkik Takibi', icon: '📈', actionType: 'TIMER' }
    ]
  },

  KIMYA_PETROL_PLASTIK: {
    domain: 'KIMYA_PETROL_PLASTIK',
    displayName: 'Kimya, Petrol, Lastik ve Plastik',
    bgCard: 'bg-teal-50/75 border-teal-200',
    borderAccent: 'border-l-teal-600',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-900',
    btnPrimaryBg: 'bg-teal-600 hover:bg-teal-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'msds_kontrol', label: 'MSDS / Güvenlik Bilgi Formu', icon: '🧪', actionType: 'LOTO_CHECK' },
      { id: 'parlama_noktasi', label: 'Parlama & Statik Topraklama', icon: '⚠️', actionType: 'CHECKLIST' },
      { id: 'enjeksiyon_parametre', label: 'Enjeksiyon Kalıp Sıcaklık Logu', icon: '🛢️', actionType: 'COPY_TEMPLATE' }
    ]
  },

  KULTUR_SANAT_TASARIM: {
    domain: 'KULTUR_SANAT_TASARIM',
    displayName: 'Kültür, Sanat ve Tasarım',
    bgCard: 'bg-fuchsia-50/75 border-fuchsia-200',
    borderAccent: 'border-l-fuchsia-600',
    badgeBg: 'bg-fuchsia-100',
    badgeText: 'text-fuchsia-900',
    btnPrimaryBg: 'bg-fuchsia-600 hover:bg-fuchsia-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'fsek_telif', label: '5846 FSEK Telif Devir Sözleşmesi', icon: '📜', actionType: 'COPY_TEMPLATE' },
      { id: 'tasarim_pafta', label: 'Tasarım Pafta & Render Onayı', icon: '🎨', actionType: 'CHECKLIST' },
      { id: 'sergi_vernisaj', label: 'Sergi / Vernisaj Takvimi', icon: '🖼️', actionType: 'TIMER' }
    ]
  },

  MADEN: {
    domain: 'MADEN',
    displayName: 'Maden',
    bgCard: 'bg-zinc-100/80 border-zinc-300',
    borderAccent: 'border-l-zinc-700',
    badgeBg: 'bg-zinc-200',
    badgeText: 'text-zinc-900',
    btnPrimaryBg: 'bg-zinc-800 hover:bg-zinc-900',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'metan_gaz_olcum', label: 'CH4 / CO Gaz Ölçüm Defteri', icon: '⛏️', actionType: 'LOTO_CHECK' },
      { id: 'tahkimat_kontrol', label: 'Ayna & Tavan Tahkimat Denetimi', icon: '🛡️', actionType: 'CHECKLIST' },
      { id: 'patlatma_guvenlik', label: 'Patlatma Öncesi Emniyet Şeridi', icon: '💥', actionType: 'COPY_TEMPLATE' }
    ]
  },

  MAKINE: {
    domain: 'MAKINE',
    displayName: 'Makine',
    bgCard: 'bg-slate-100/80 border-slate-300',
    borderAccent: 'border-l-slate-600',
    badgeBg: 'bg-slate-200',
    badgeText: 'text-slate-900',
    btnPrimaryBg: 'bg-slate-700 hover:bg-slate-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'hidrostatik_test', label: 'Kazan Hidrostatik Basınç Testi', icon: '⚙️', actionType: 'LOTO_CHECK' },
      { id: 'vibrasyon_yag', label: 'Vibrasyon & Yağ Analizi', icon: '🔧', actionType: 'COPY_TEMPLATE' },
      { id: 'cnc_sifirlama', label: 'CNC Takım Boyu Sıfırlama', icon: '📐', actionType: 'CHECKLIST' }
    ]
  },

  MEDYA_ILETISIM_YAYIN: {
    domain: 'MEDYA_ILETISIM_YAYIN',
    displayName: 'Medya, İletişim ve Yayıncılık',
    bgCard: 'bg-rose-50/70 border-rose-200',
    borderAccent: 'border-l-rose-500',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-900',
    btnPrimaryBg: 'bg-rose-600 hover:bg-rose-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'call_sheet', label: 'Call Sheet & Set Planı', icon: '🎬', actionType: 'COPY_TEMPLATE' },
      { id: 'lufs_master', label: '-23 LUFS Yayın Standardı', icon: '🎙️', actionType: 'LOTO_CHECK' },
      { id: 'basin_ambargo', label: 'Basın Bülteni & Ambargo', icon: '📰', actionType: 'TIMER' }
    ]
  },

  METAL: {
    domain: 'METAL',
    displayName: 'Metal',
    bgCard: 'bg-zinc-100 border-zinc-300',
    borderAccent: 'border-l-zinc-600',
    badgeBg: 'bg-zinc-200',
    badgeText: 'text-zinc-900',
    btnPrimaryBg: 'bg-zinc-700 hover:bg-zinc-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'wps_kaynak', label: 'WPS / PQR Kaynak Onay Formu', icon: '🔩', actionType: 'COPY_TEMPLATE' },
      { id: 'ndt_muayene', label: 'NDT Tahribatsız Muayene Raporu', icon: '🔬', actionType: 'LOTO_CHECK' },
      { id: 'isil_islem', label: 'Isıl İşlem Sertlik Çizelgesi', icon: '🔥', actionType: 'CHECKLIST' }
    ]
  },

  OTOMOTIV: {
    domain: 'OTOMOTIV',
    displayName: 'Otomotiv',
    bgCard: 'bg-orange-50/75 border-orange-200',
    borderAccent: 'border-l-orange-600',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-900',
    btnPrimaryBg: 'bg-orange-600 hover:bg-orange-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'obd_ariza', label: 'OBD Hata Kodu Silme & Test', icon: '🚗', actionType: 'LOTO_CHECK' },
      { id: 'tork_kontrol', label: 'Bijon & Aks Torklama Kontrolü', icon: '🔧', actionType: 'CHECKLIST' },
      { id: 'tuvturk_sayac', label: 'TÜVTÜRK Periyodik Muayene', icon: '⏱️', actionType: 'TIMER' }
    ]
  },

  SAGLIK_SOSYAL: {
    domain: 'SAGLIK_SOSYAL',
    displayName: 'Sağlık ve Sosyal Hizmetler',
    bgCard: 'bg-teal-50/70 border-teal-200',
    borderAccent: 'border-l-teal-600',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-900',
    btnPrimaryBg: 'bg-teal-600 hover:bg-teal-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'sbar_devir', label: 'SBAR Vardiya / Nöbet Devri', icon: '📋', actionType: 'COPY_TEMPLATE' },
      { id: 'aydinlatilmis_onam', label: 'Aydınlatılmış Onam Formu', icon: '🩺', actionType: 'CHECKLIST' },
      { id: 'soguk_zincir_ilac', label: '2-8°C Aşı & İlaç Soğuk Zincir', icon: '❄️', actionType: 'LOTO_CHECK' }
    ]
  },

  SPOR_REKREASYON: {
    domain: 'SPOR_REKREASYON',
    displayName: 'Spor ve Rekreasyon',
    bgCard: 'bg-emerald-50/75 border-emerald-200',
    borderAccent: 'border-l-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    btnPrimaryBg: 'bg-emerald-600 hover:bg-emerald-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'antrenman_periyot', label: 'Yıllık Periyodizasyon Planı', icon: '⚽', actionType: 'COPY_TEMPLATE' },
      { id: 'laktat_nabiz', label: 'Laktat Eşiği & Nabız Bölgeleri', icon: '⏱️', actionType: 'TIMER' },
      { id: 'mac_esame', label: 'Müsabaka Esame Listesi & Rapor', icon: '📋', actionType: 'CHECKLIST' }
    ]
  },

  TARIM_AV_BALIK: {
    domain: 'TARIM_AV_BALIK',
    displayName: 'Tarım, Avcılık ve Balıkçılık',
    bgCard: 'bg-lime-50/75 border-lime-200',
    borderAccent: 'border-l-lime-600',
    badgeBg: 'bg-lime-100',
    badgeText: 'text-lime-900',
    btnPrimaryBg: 'bg-lime-700 hover:bg-lime-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'gunes_sulama', label: 'Güneş Kuralı (19:30 Sulama)', icon: '🌿', actionType: 'TIMER' },
      { id: 'zirai_don', label: 'Zirai Don & TARSİM Alarmı', icon: '❄️', actionType: 'LOTO_CHECK' },
      { id: 'phi_hasat', label: 'İlaç PHI Hasat Bekleme Süresi', icon: '🌾', actionType: 'COPY_TEMPLATE' }
    ]
  },

  TEKSTIL_GIYIM_DERI: {
    domain: 'TEKSTIL_GIYIM_DERI',
    displayName: 'Tekstil, Hazır Giyim, Deri',
    bgCard: 'bg-pink-50/75 border-pink-200',
    borderAccent: 'border-l-pink-600',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-900',
    btnPrimaryBg: 'bg-pink-600 hover:bg-pink-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'pastal_plani', label: 'Pastal Planı & Kumaş Fire Hesabı', icon: '🧵', actionType: 'COPY_TEMPLATE' },
      { id: 'cekmezlik_test', label: 'Yıkama & Çekmezlik Testi', icon: '📏', actionType: 'LOTO_CHECK' },
      { id: 'numune_onay', label: 'İlk Numune (Proto) Onayı', icon: '👗', actionType: 'CHECKLIST' }
    ]
  },

  TOPLUMSAL_KISISEL: {
    domain: 'TOPLUMSAL_KISISEL',
    displayName: 'Toplumsal ve Kişisel Hizmetler',
    bgCard: 'bg-violet-50/75 border-violet-200',
    borderAccent: 'border-l-violet-600',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-900',
    btnPrimaryBg: 'bg-violet-600 hover:bg-violet-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'oryal_sac_acma', label: 'Oryal Açma Süre Sayacı (45dk)', icon: '⏱️', actionType: 'TIMER' },
      { id: 'otoklav_steril', label: 'Otoklav & Alet Sterilizasyonu', icon: '✂️', actionType: 'LOTO_CHECK' },
      { id: 'leke_mudahale', label: 'Kuru Temizleme Leke Çözümü', icon: '🧺', actionType: 'COPY_TEMPLATE' }
    ]
  },

  TURIZM_KONAKLAMA_YIYECEK: {
    domain: 'TURIZM_KONAKLAMA_YIYECEK',
    displayName: 'Turizm, Konaklama, Yiyecek-İçecek Hizmetleri',
    bgCard: 'bg-orange-50/75 border-orange-200',
    borderAccent: 'border-l-orange-500',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-900',
    btnPrimaryBg: 'bg-orange-600 hover:bg-orange-700',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'mise_en_place', label: 'Mise en Place & Servis Hazırlığı', icon: '👨‍🍳', actionType: 'CHECKLIST' },
      { id: 'haccp_sicaklik', label: 'HACCP Soğuk Oda & Şoklama', icon: '❄️', actionType: 'LOTO_CHECK' },
      { id: 'housekeeping_check', label: 'Oda Teftiş Föyü & Minibar', icon: '🏨', actionType: 'COPY_TEMPLATE' }
    ]
  },

  ULASTIRMA_LOJISTIK: {
    domain: 'ULASTIRMA_LOJISTIK',
    displayName: 'Ulaştırma, Lojistik ve Haberleşme',
    bgCard: 'bg-amber-50/75 border-amber-200',
    borderAccent: 'border-l-amber-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    btnPrimaryBg: 'bg-amber-700 hover:bg-amber-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'aetr_takograf', label: '4.5s AETR Mola & Takograf', icon: '⏱️', actionType: 'TIMER' },
      { id: 'cmr_irsaliye', label: 'CMR & Hasar Rezerv Tutanağı', icon: '🚛', actionType: 'COPY_TEMPLATE' },
      { id: 'pretrip_kontrol', label: 'Pre-Trip Lastik & King-Pin Kilidi', icon: '🔍', actionType: 'LOTO_CHECK' },
      { id: 'psc_survey', label: 'PSC & Draft Survey', icon: '⚓', actionType: 'CHECKLIST' }
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
  // Özel & Genel Modlar
  { id: 'SADE', label: 'Sade Not (Motorsuz)', sublabel: 'Bilişsel motorlar kapalı; yalnızca söylediğiniz ham metni doğrudan not olarak kaydeder', icon: '📝', category: 'ozel' },
  { id: 'GENEL', label: 'Genel Yaşam', sublabel: 'Kişisel yaşam, ev, fatura & kira, abonelikler, alışveriş ve günlük rutinler', icon: '🏠', category: 'ozel' },
  { id: 'OGRENCI', label: 'Öğrenci', sublabel: 'Vize/final sınavları, ders kaydı, ödev teslimi, burs/KYK', icon: '🎓', category: 'ozel' },

  // MYK Resmî 27 Sektör Motoru (A'dan Z'ye Tam Sıralı)
  { id: 'ADALET_GUVENLIK', label: 'Adalet ve Güvenlik', sublabel: 'Avukat, Hakim, Savcı, Polis, Asker, İtfaiye, Özel Güvenlik (UYAP, duruşma, fezleke, SCBA, CMK)', icon: '⚖️', category: 'meslek' },
  { id: 'AGAC_KAGIT', label: 'Ağaç İşleri, Kağıt ve Kağıt Ürünleri', sublabel: 'Ahşap Mobilya, Doğrama, Kağıt & Ambalaj (Ebatlama, kesim planı, %8-12 ahşap nemi, kenar bantlama)', icon: '🪵', category: 'meslek' },
  { id: 'BILISIM', label: 'Bilişim Teknolojileri', sublabel: 'Yazılım Geliştirici, Sistem/Ağ, Siber Güvenlik, DevOps (Prod deploy, PR, SemVer, DB migration, API)', icon: '💻', category: 'meslek' },
  { id: 'CAM_CIMENTO_TOPRAK', label: 'Cam, Çimento ve Toprak', sublabel: 'Çimento, Hazır Beton, Seramik, Karo, Cam Sanayi (Klinker fırını, basınç dayanımı, tavlama)', icon: '🧱', category: 'meslek' },
  { id: 'CEVRE', label: 'Çevre', sublabel: 'Çevre Mühendisi, Atık Yönetimi, Arıtma Tesisi (ÇED raporu, emisyon ölçümü, MoTAT, sıfır atık)', icon: '♻️', category: 'meslek' },
  { id: 'EGITIM', label: 'Eğitim', sublabel: 'Öğretmen, Okul Müdürü, Akademisyen (e-Okul, MEBBİS, KBS ek ders, BEP, TEFBİS, sınav okuma)', icon: '📚', category: 'meslek' },
  { id: 'ELEKTRIK_ELEKTRONIK', label: 'Elektrik ve Elektronik', sublabel: 'Elektrik Mühendisi, Teknisyen, Pano Montörü (LOTO, 30mA kaçak akım, kompanzasyon, PLC, trafo)', icon: '⚡', category: 'meslek' },
  { id: 'ENERJI', label: 'Enerji', sublabel: 'GES, RES, HES, Doğalgaz, Şebeke Dağıtım (EPİAŞ GÖP, trafo izolasyon, enversör, megavat)', icon: '🔋', category: 'meslek' },
  { id: 'FINANS', label: 'Finans', sublabel: 'Mali Müşavir (SMMM), Muhasebeci, Denetçi, Bankacı (KDV, MUHSGK, e-Defter, tevkifat, VUK 33, SGK)', icon: '📊', category: 'meslek' },
  { id: 'GIDA', label: 'Gıda', sublabel: 'Gıda Mühendisi, Kalite Güvence, Üretim Operatörü (HACCP, CCP, parti/lot takibi, pastörizasyon, soğuk zincir)', icon: '🌾', category: 'meslek' },
  { id: 'INSAAT', label: 'İnşaat', sublabel: 'İnşaat Mühendisi, Şantiye Şefi, Mimar (Beton dökümü, 7/28 gün kırım testi, donatı, metraj, hakediş)', icon: '🏗️', category: 'meslek' },
  { id: 'IS_YONETIM', label: 'İş ve Yönetim', sublabel: 'Yönetici, İK Uzmanı, Proje Yöneticisi, Bordro (PMP, sprint, SGK işe giriş/çıkış, ISO 9001, DÖF)', icon: '🗂️', category: 'meslek' },
  { id: 'KIMYA_PETROL_PLASTIK', label: 'Kimya, Petrol, Lastik ve Plastik', sublabel: 'Kimyager, Rafineri, Plastik Enjeksiyon, Kauçuk (MSDS/GBF, parlama noktası, polimerizasyon, ekstrüzyon)', icon: '🧪', category: 'meslek' },
  { id: 'KULTUR_SANAT_TASARIM', label: 'Kültür, Sanat ve Tasarım', sublabel: 'Grafik Tasarımcı, Ressam, Mimar, Moda Tasarımcısı (5846 FSEK telif, pafta, render, vernisaj)', icon: '🎨', category: 'meslek' },
  { id: 'MADEN', label: 'Maden', sublabel: 'Maden Mühendisi, Ocak Çavuşu, Sondör (Metan/karbonmonoksit gaz ölçümü, tahkimat, patlatma emniyeti)', icon: '⛏️', category: 'meslek' },
  { id: 'MAKINE', label: 'Makine', sublabel: 'Makine Mühendisi, CNC Operatörü, Mekanik Bakımcı (Hidrostatik basınç testi, vibrasyon analizi, hidrolik)', icon: '⚙️', category: 'meslek' },
  { id: 'MEDYA_ILETISIM_YAYIN', label: 'Medya, İletişim ve Yayıncılık', sublabel: 'Gazeteci, Yönetmen, Kurgucu, İçerik Üreticisi (Call sheet, -23 LUFS, basın bülteni, ambargo, reji)', icon: '🎬', category: 'meslek' },
  { id: 'METAL', label: 'Metal', sublabel: 'Metalurji Mühendisi, Kaynakçı, Dökümcü (WPS/PQR kaynak onayı, NDT tahribatsız muayene, ısıl işlem)', icon: '🔩', category: 'meslek' },
  { id: 'OTOMOTIV', label: 'Otomotiv', sublabel: 'Oto Tamircisi, Servis Danışmanı, Ekspertiz (OBD arıza kodu silme, rot-balans, torklama, TÜVTÜRK)', icon: '🚗', category: 'meslek' },
  { id: 'SAGLIK_SOSYAL', label: 'Sağlık ve Sosyal Hizmetler', sublabel: 'Doktor, Hemşire, Eczacı, Diş Hekimi (SBAR devir, aydınlatılmış onam, Medula SUT, 2-8°C soğuk zincir)', icon: '🩺', category: 'meslek' },
  { id: 'SPOR_REKREASYON', label: 'Spor ve Rekreasyon', sublabel: 'Antrenör, Fitness Eğitmeni, Hakem, Tesis Yöneticisi (Periyodizasyon, laktat eşiği, esame listesi)', icon: '⚽', category: 'meslek' },
  { id: 'TARIM_AV_BALIK', label: 'Tarım, Avcılık ve Balıkçılık', sublabel: 'Ziraat Mühendisi, Çiftçi, Balıkçı (ÇKS, TARSİM zirai don, damlama sulama, güneş kuralı 19:30)', icon: '🌿', category: 'meslek' },
  { id: 'TEKSTIL_GIYIM_DERI', label: 'Tekstil, Hazır Giyim, Deri', sublabel: 'Modelist, Konfeksiyon, Kumaş & Deri Üretimi (Pastal planı, çekmezlik testi, numune/proto onayı)', icon: '🧵', category: 'meslek' },
  { id: 'TICARET', label: 'Ticaret (Satış ve Pazarlama)', sublabel: 'Satış Danışmanı, Kasiyer, Dükkan Sahibi, Pazarlamacı (Teklif takibi, Z raporu, kasa mutabakatı)', icon: '💼', category: 'meslek' },
  { id: 'TOPLUMSAL_KISISEL', label: 'Toplumsal ve Kişisel Hizmetler', sublabel: 'Kuaför, Berber, Güzellik Uzmanı, Kuru Temizleme (Oryal saç açma, otoklav sterilizasyon, leke çözümü)', icon: '✂️', category: 'meslek' },
  { id: 'TURIZM_KONAKLAMA_YIYECEK', label: 'Turizm, Konaklama, Yiyecek-İçecek Hizmetleri', sublabel: 'Şef, Aşçı, Garson, Otel/Resepsiyon (Mise en place, HACCP soğuk oda, overbooking, oda teftiş föyü)', icon: '👨‍🍳', category: 'meslek' },
  { id: 'ULASTIRMA_LOJISTIK', label: 'Ulaştırma, Lojistik ve Haberleşme', sublabel: 'Ağır Vasıta Şoförü, Kaptan, Pilot, Kurye, Telekom (Takograf 4.5s mola, CMR, kantar, PSC, METAR)', icon: '🚛', category: 'meslek' },
];

export const WORK_DOMAIN_OPTIONS_EN: WorkDomainOption[] = [
  // Special & General Modes
  { id: 'SADE', label: 'Plain Note (No Engine)', sublabel: 'Cognitive engines disabled; directly saves your exact spoken or typed text', icon: '📝', category: 'ozel' },
  { id: 'GENEL', label: 'General Life', sublabel: 'Personal life, home, bills & rent, subscriptions, shopping, and daily routines', icon: '🏠', category: 'ozel' },
  { id: 'OGRENCI', label: 'Student & Academic', sublabel: 'Midterms/finals, course registration, homework submissions, scholarships', icon: '🎓', category: 'ozel' },

  // Official 27 MYK Sectors (Alphabetical in EN)
  { id: 'TARIM_AV_BALIK', label: 'Agriculture, Hunting & Fisheries', sublabel: 'Agronomist, Farmer, Fisher (Crop registration, hail insurance, drip irrigation, sun rule)', icon: '🌿', category: 'meslek' },
  { id: 'OTOMOTIV', label: 'Automotive & Vehicle Service', sublabel: 'Auto Mechanic, Service Advisor (OBD fault clearing, wheel alignment, torque specs, inspection)', icon: '🚗', category: 'meslek' },
  { id: 'IS_YONETIM', label: 'Business & Corporate Management', sublabel: 'Manager, HR Specialist, Project Manager (PMP, sprint, onboarding/offboarding, ISO 9001)', icon: '🗂️', category: 'meslek' },
  { id: 'KIMYA_PETROL_PLASTIK', label: 'Chemical, Petroleum, Rubber & Plastics', sublabel: 'Chemist, Refinery, Injection Molding (MSDS/SDS, flash point, polymerization, extrusion)', icon: '🧪', category: 'meslek' },
  { id: 'TICARET', label: 'Commerce (Sales & Marketing)', sublabel: 'Sales Advisor, Cashier, Merchant (Quote follow-up, Z-report, cash reconciliation, stock count)', icon: '💼', category: 'meslek' },
  { id: 'TOPLUMSAL_KISISEL', label: 'Community & Personal Services', sublabel: 'Hairdresser, Barber, Esthetician, Dry Cleaning (Bleaching timer, autoclave sterilizer, stain removal)', icon: '✂️', category: 'meslek' },
  { id: 'INSAAT', label: 'Construction & Civil Engineering', sublabel: 'Civil Engineer, Site Chief, Architect (Concrete pour, 7/28 day break test, rebar inspection, progress billing)', icon: '🏗️', category: 'meslek' },
  { id: 'KULTUR_SANAT_TASARIM', label: 'Culture, Arts & Design', sublabel: 'Graphic Designer, Artist, Architect, Fashion Designer (Copyright law, portfolio renders, exhibitions)', icon: '🎨', category: 'meslek' },
  { id: 'EGITIM', label: 'Education', sublabel: 'Teacher, School Principal, Academic (Grading portal, lesson plans, payroll, IEP, exam evaluation)', icon: '📚', category: 'meslek' },
  { id: 'ELEKTRIK_ELEKTRONIK', label: 'Electrical & Electronics', sublabel: 'Electrical Engineer, Technician, Panel Builder (LOTO lock, 30mA residual current, compensation, PLC)', icon: '⚡', category: 'meslek' },
  { id: 'ENERJI', label: 'Energy & Power Systems', sublabel: 'Solar, Wind, Hydro, Natural Gas, Grid (Market bid submission, transformer oil test, inverters)', icon: '🔋', category: 'meslek' },
  { id: 'CEVRE', label: 'Environment & Waste Management', sublabel: 'Environmental Engineer, Waste Management (EIA report, emission test, waste transfer forms)', icon: '♻️', category: 'meslek' },
  { id: 'FINANS', label: 'Finance & Accounting', sublabel: 'CPA, Accountant, Auditor, Banker (VAT, payroll taxes, e-Ledger, withholding, tax audit)', icon: '📊', category: 'meslek' },
  { id: 'GIDA', label: 'Food Processing & Production', sublabel: 'Food Engineer, Quality Assurance, Production (HACCP, CCP, batch/lot tracking, cold chain)', icon: '🌾', category: 'meslek' },
  { id: 'CAM_CIMENTO_TOPRAK', label: 'Glass, Cement & Earth', sublabel: 'Cement, Ready-Mix, Ceramics, Glass Industry (Clinker kiln temperature, compressive strength)', icon: '🧱', category: 'meslek' },
  { id: 'SAGLIK_SOSYAL', label: 'Healthcare & Social Services', sublabel: 'Doctor, Nurse, Pharmacist, Dentist (SBAR handover, informed consent, medication claim, 2-8°C cold chain)', icon: '🩺', category: 'meslek' },
  { id: 'BILISIM', label: 'Information Technologies (IT)', sublabel: 'Software Engineer, DevOps, Cybersecurity (Prod deploy, PR review, SemVer, DB migration, API)', icon: '💻', category: 'meslek' },
  { id: 'ADALET_GUVENLIK', label: 'Justice & Security', sublabel: 'Lawyer, Judge, Police, Military, Firefighter, Security (Notifications, hearings, detention timer, SCBA)', icon: '⚖️', category: 'meslek' },
  { id: 'MAKINE', label: 'Machinery & Mechanical Engineering', sublabel: 'Mechanical Engineer, CNC Machinist, Maintenance (Hydrostatic pressure test, vibration analysis)', icon: '⚙️', category: 'meslek' },
  { id: 'MEDYA_ILETISIM_YAYIN', label: 'Media, Communications & Publishing', sublabel: 'Journalist, Director, Video Editor, Creator (Call sheet, -23 LUFS broadcast standard, press embargo)', icon: '🎬', category: 'meslek' },
  { id: 'METAL', label: 'Metal & Metallurgy', sublabel: 'Metallurgical Engineer, Welder, Foundryman (WPS/PQR weld procedure, NDT non-destructive testing)', icon: '🔩', category: 'meslek' },
  { id: 'MADEN', label: 'Mining & Mineral Extraction', sublabel: 'Mining Engineer, Quarry Foreman, Driller (CH4/CO gas testing, roof support, blasting safety)', icon: '⛏️', category: 'meslek' },
  { id: 'SPOR_REKREASYON', label: 'Sports & Recreation', sublabel: 'Coach, Fitness Trainer, Referee, Facility Manager (Periodization, lactate threshold, roster report)', icon: '⚽', category: 'meslek' },
  { id: 'TEKSTIL_GIYIM_DERI', label: 'Textiles, Apparel & Leather', sublabel: 'Pattern Maker, Garment, Fabric & Leather (Marker planning, shrinkage test, proto sample approval)', icon: '🧵', category: 'meslek' },
  { id: 'TURIZM_KONAKLAMA_YIYECEK', label: 'Tourism, Hospitality & Food Services', sublabel: 'Executive Chef, Cook, Hotel Staff (Mise en place, HACCP cold room, room inspection checklist)', icon: '👨‍🍳', category: 'meslek' },
  { id: 'ULASTIRMA_LOJISTIK', label: 'Transportation, Logistics & Communications', sublabel: 'Heavy Vehicle Driver, Captain, Pilot, Courier (Tachograph 4.5h break, CMR, weighbridge, PSC, METAR)', icon: '🚛', category: 'meslek' },
  { id: 'AGAC_KAGIT', label: 'Woodworking, Paper & Paper Products', sublabel: 'Furniture Maker, Millwork, Paper & Packaging (Panel sizing, cutting plan, %8-12 wood moisture)', icon: '🪵', category: 'meslek' },
];

export function getLocalizedWorkDomainOptions(language: string = 'tr'): WorkDomainOption[] {
  if (language === 'en') {
    return WORK_DOMAIN_OPTIONS_EN.filter((opt) => opt.id === 'SADE');
  }
  return WORK_DOMAIN_OPTIONS;
}

export function detectDomainFromNote(note: { ikon?: string; baslik?: string; anomali_notu?: string | null; teshis_notu?: string | null; renk?: string }): ProfessionDomain {
  const icon = note.ikon || '';
  const text = `${note.baslik || ''} ${note.anomali_notu || ''} ${note.teshis_notu || ''}`.toLowerCase();

  if (icon === '📝' && !note.anomali_notu && !note.teshis_notu) {
    return 'SADE';
  }

  if (
    icon === '🎬' || icon === '🎨' || icon === '📸' || icon === '🎥' || icon === '🎙️' || icon === '🎭' || icon === '🎞️' || icon === '📻' || icon === '📱' ||
    text.includes('call sheet') || text.includes('callsheet') || text.includes('çekim planı') || text.includes('cekim plani') ||
    text.includes('klaket') || text.includes('reji') || text.includes('gaffer') || text.includes('dit') ||
    text.includes('render') || text.includes('export') || text.includes('kurgu') || text.includes('montaj') ||
    text.includes('-23 lufs') || text.includes('ebu r128') || text.includes('color grading') || text.includes('davinci resolve') ||
    text.includes('soundcheck') || text.includes('teknik rider') || text.includes('stage plot') || text.includes('in-ear') ||
    text.includes('isrc') || text.includes('mesam') || text.includes('müyap') || text.includes('retouch') ||
    text.includes('vernisaj') || text.includes('küratör') || text.includes('fine art') || text.includes('basın bülteni') ||
    text.includes('ambargo') || text.includes('liveu') || text.includes('rundown') || text.includes('fsek') ||
    text.includes('tiyatro') || text.includes('dress rehearsal') || text.includes('prömiyer') ||
    text.includes('reels') || text.includes('tiktok') || text.includes('shorts') || text.includes('kanca') ||
    text.includes('hook') || text.includes('influencer') || text.includes('#işbirliği') || text.includes('#isbirligi') ||
    text.includes('meta ads') || text.includes('roas') || text.includes('içerik takvimi') || text.includes('carousel') ||
    text.includes('youtube') || text.includes('thumbnail')
  ) {
    return 'SANAT_MEDYA';
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
