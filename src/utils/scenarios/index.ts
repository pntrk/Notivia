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

export const ALL_CONSOLIDATED_SCENARIOS: ShortScenarioMatch[] = [
  ...LEGAL_FINANCE_SCENARIOS,
  ...HEALTH_LIFE_SCENARIOS,
  ...ENGINEERING_TECH_SCENARIOS,
  ...EDUCATION_PUBLIC_SCENARIOS,
  ...DEFENSE_SAFETY_SCENARIOS,
  ...TRADE_TRANSPORT_SCENARIOS,
  ...AGRICULTURE_GASTRONOMY_SCENARIOS
];
