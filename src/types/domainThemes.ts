export type ProfessionDomain =
  | 'HUKUK'
  | 'SAGLIK'
  | 'TEKNIK'
  | 'LOJISTIK'
  | 'EMNIYET'
  | 'HAVACILIK'
  | 'MUTFAK'
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
      { id: 'uyap', label: 'UYAP Taslağı', icon: '⚖️', actionType: 'COPY_TEMPLATE' },
      { id: 'client_msg', label: 'Müvekkile Bildir', icon: '💬', actionType: 'WHATSAPP' }
    ]
  },
  SAGLIK: {
    domain: 'SAGLIK',
    displayName: 'Klinik & Sağlık',
    bgCard: 'bg-cyan-50/70 border-cyan-200',
    borderAccent: 'border-l-cyan-600',
    badgeBg: 'bg-cyan-100',
    badgeText: 'text-cyan-800',
    btnPrimaryBg: 'bg-cyan-700 hover:bg-cyan-800',
    btnPrimaryText: 'text-white',
    actions: [
      { id: 'sbar', label: 'SBAR Teslim Notu', icon: '📋', actionType: 'COPY_TEMPLATE' },
      { id: 'timer_check', label: 'Dekübitus Sayacı', icon: '⏱️', actionType: 'TIMER' }
    ]
  },
  TEKNIK: {
    domain: 'TEKNIK',
    displayName: 'Teknik & Bakım',
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
  EMNIYET: {
    domain: 'EMNIYET',
    displayName: 'Asayiş & Emniyet',
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
  HAVACILIK: {
    domain: 'HAVACILIK',
    displayName: 'Uçuş & Kokpit',
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
  MUTFAK: {
    domain: 'MUTFAK',
    displayName: 'Mutfak & Servis',
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

export function detectDomainFromNote(note: { ikon?: string; baslik?: string; anomali_notu?: string | null; teshis_notu?: string | null; renk?: string }): ProfessionDomain {
  const icon = note.ikon || '';
  const text = `${note.baslik || ''} ${note.anomali_notu || ''} ${note.teshis_notu || ''}`.toLowerCase();

  if (icon === '⚖️' || icon === '🏛️' || icon === '📜' || text.includes('hukuk') || text.includes('duruşma') || text.includes('uyap') || text.includes('istinaf') || text.includes('tebligat') || text.includes('noter') || text.includes('beyanname')) {
    return 'HUKUK';
  }
  if (icon === '🩺' || icon === '💉' || icon === '🦷' || icon === '💊' || text.includes('ilaç') || text.includes('hasta') || text.includes('doktor') || text.includes('hemşire') || text.includes('klinik') || text.includes('sbar') || text.includes('dekübitus')) {
    return 'SAGLIK';
  }
  if (icon === '🔧' || icon === '🛠️' || icon === '⚡' || icon === '⚙️' || icon === '📐' || icon === '💻' || text.includes('loto') || text.includes('arıza') || text.includes('bakım') || text.includes('şantiye') || text.includes('mimar') || text.includes('teknik') || text.includes('tamir')) {
    return 'TEKNIK';
  }
  if (icon === '🚛' || text.includes('takograf') || text.includes('aetr') || text.includes('kantar') || text.includes('dorse') || text.includes('şoför') || text.includes('lojistik') || text.includes('sevkiyat')) {
    return 'LOJISTIK';
  }
  if (icon === '👮' || icon === '🪖' || icon === '🛡️' || icon === '🎯' || text.includes('gözaltı') || text.includes('fezleke') || text.includes('polis') || text.includes('asker') || text.includes('emniyet') || text.includes('nöbet')) {
    return 'EMNIYET';
  }
  if (icon === '✈️' || text.includes('pilot') || text.includes('kokpit') || text.includes('fdp') || text.includes('ofp') || text.includes('metar') || text.includes('uçuş')) {
    return 'HAVACILIK';
  }
  if (icon === '👨‍🍳' || icon === '🔪' || icon === '❄️' || icon === '🍽️' || text.includes('haccp') || text.includes('mise en place') || text.includes('aşçı') || text.includes('mutfak') || text.includes('soğuk oda')) {
    return 'MUTFAK';
  }

  return 'GENEL';
}
