import type { ShortScenarioMatch } from '../scenarioDatabase.ts';
import { LEGAL_FINANCE_SCENARIOS } from './legalFinanceScenarios.ts';
import { HEALTH_LIFE_SCENARIOS } from './healthLifeScenarios.ts';
import { ENGINEERING_TECH_SCENARIOS } from './engineeringTechScenarios.ts';
import { EDUCATION_PUBLIC_SCENARIOS } from './educationPublicScenarios.ts';
import { DEFENSE_SAFETY_SCENARIOS } from './defenseSafetyScenarios.ts';
import { TRADE_TRANSPORT_SCENARIOS } from './tradeTransportScenarios.ts';
import { AGRICULTURE_GASTRONOMY_SCENARIOS } from './agricultureGastronomyScenarios.ts';

export {
  LEGAL_FINANCE_SCENARIOS,
  HEALTH_LIFE_SCENARIOS,
  ENGINEERING_TECH_SCENARIOS,
  EDUCATION_PUBLIC_SCENARIOS,
  DEFENSE_SAFETY_SCENARIOS,
  TRADE_TRANSPORT_SCENARIOS,
  AGRICULTURE_GASTRONOMY_SCENARIOS
};

/**
 * Belirli bir mesleki uzmanlık veya yaşam alanı için ilgili senaryo paketini
 * doğrudan ve anında döndürür. Gereksiz 35.000 elemanlık taranmayı engeller.
 */
export function getDomainConsolidatedScenarios(domain?: string): ShortScenarioMatch[] {
  if (!domain) return [];
  const d = domain.toUpperCase();
  switch (d) {
    case 'HUKUK':
    case 'YARGI':
    case 'FINANS':
    case 'MALIYE':
    case 'NOTER':
    case 'HUKUK_FINANS_CLUSTER':
      return LEGAL_FINANCE_SCENARIOS;
    case 'SAGLIK':
    case 'HEKIM':
    case 'HEMSIRE':
    case 'ECZACILIK':
    case 'DIS_HEKIMI':
    case 'VETERINER':
    case 'SAGLIK_CLUSTER':
      return HEALTH_LIFE_SCENARIOS;
    case 'TEKNIK':
    case 'INSAAT':
    case 'ELEKTRIK':
    case 'MAKINE':
    case 'YAZILIM':
    case 'BILISIM':
    case 'BILISIM_CLUSTER':
    case 'SANAYI_CLUSTER':
    case 'YAPI_CLUSTER':
      return ENGINEERING_TECH_SCENARIOS;
    case 'EGITIM':
    case 'OGRETMEN':
    case 'AKADEMI':
    case 'OKUL_YONETIMI':
    case 'KAMU':
    case 'EGITIM_CLUSTER':
      return EDUCATION_PUBLIC_SCENARIOS;
    case 'SAVUNMA':
    case 'POLIS':
    case 'ASAYIS':
    case 'ITFAIYE':
    case 'ASKERI':
    case 'GUVENLIK':
    case 'GUVENLIK_CLUSTER':
      return DEFENSE_SAFETY_SCENARIOS;
    case 'TICARET':
    case 'LOJISTIK':
    case 'TASIMACILIK':
    case 'SOFOR':
    case 'KASIYER':
    case 'SATIS':
    case 'ULASIM_CLUSTER':
      return TRADE_TRANSPORT_SCENARIOS;
    case 'ZIRAAT':
    case 'TARIM':
    case 'MUTFAK':
    case 'GASTRONOMI':
    case 'ASCI':
    case 'HIZMET_CLUSTER':
      return [...AGRICULTURE_GASTRONOMY_SCENARIOS, ...TRADE_TRANSPORT_SCENARIOS];
    default:
      return [];
  }
}

let _cachedAllScenarios: ShortScenarioMatch[] | null = null;

export function getAllConsolidatedScenarios(): ShortScenarioMatch[] {
  if (!_cachedAllScenarios) {
    _cachedAllScenarios = [
      ...LEGAL_FINANCE_SCENARIOS,
      ...HEALTH_LIFE_SCENARIOS,
      ...ENGINEERING_TECH_SCENARIOS,
      ...EDUCATION_PUBLIC_SCENARIOS,
      ...DEFENSE_SAFETY_SCENARIOS,
      ...TRADE_TRANSPORT_SCENARIOS,
      ...AGRICULTURE_GASTRONOMY_SCENARIOS
    ];
  }
  return _cachedAllScenarios;
}

export const ALL_CONSOLIDATED_SCENARIOS: ShortScenarioMatch[] = new Proxy([] as ShortScenarioMatch[], {
  get(_target, prop, receiver) {
    const list = getAllConsolidatedScenarios();
    return Reflect.get(list, prop, receiver);
  }
});
