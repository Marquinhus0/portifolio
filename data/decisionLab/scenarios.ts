import type { Locale } from "@/context/LanguageContext";
import type {
  DecisionScenarioConfig,
  RawDecisionScenarioConfig,
  ScenarioProblem,
  SolutionAlternative,
  StepDefinition,
} from "./types";
import { SCENARIOS_PT } from "./scenarios-pt";
import { SCENARIOS_EN } from "./scenarios-en";
import { ENRICHMENTS_PT, type ScenarioEnrichment } from "./enrichments-pt";
import { ENRICHMENTS_EN } from "./enrichments-en";

function composeScenarioList(
  rawList: RawDecisionScenarioConfig[],
  enrichMap: Record<DecisionScenarioConfig["code"], ScenarioEnrichment>
): DecisionScenarioConfig[] {
  return rawList.map((raw) => {
    const enrich = enrichMap[raw.code];
    const problems: ScenarioProblem[] = raw.problems.map((p) => {
      const baseAlts: SolutionAlternative[] = p.alternatives.map((a) => ({
        ...a,
        risks: a.risks || enrich.risksByAlternative[a.id] || [a.limitation],
      }));
      const extraAlt = enrich.extraAlternativesByProblem[p.id];
      const allAlts = extraAlt ? [...baseAlts, extraAlt] : baseAlts;

      return {
        ...p,
        justification:
          p.justification || enrich.problemJustifications[p.id] || p.operationalImpactDetail,
        alternatives: allAlts,
      };
    });

    const qaScenarios = [
      ...raw.qaScenarios.map((q) => ({
        ...q,
        linkedProblemCodes:
          q.linkedProblemCodes || enrich.qaLinkedProblems[q.id] || ["P-01"],
      })),
      enrich.extraQaScenario,
    ];

    return {
      ...raw,
      domainDisclaimer: enrich.domainDisclaimer,
      asIsToBe: raw.asIsToBe || enrich.asIsToBe,
      problems,
      qaScenarios,
    };
  });
}

export const DECISION_SIMULATOR_SCENARIOS: Record<Locale, DecisionScenarioConfig[]> = {
  pt: composeScenarioList(SCENARIOS_PT, ENRICHMENTS_PT),
  en: composeScenarioList(SCENARIOS_EN, ENRICHMENTS_EN),
};

export const SIMULATOR_STEPS: Record<Locale, StepDefinition[]> = {
  pt: [
    {
      id: "scenario",
      number: "01",
      title: "Seleção de Cenário",
      shortTitle: "Cenário",
      purpose: "Escolha o contexto operacional (PDV, Estoque ERP ou CRM Comercial).",
    },
    {
      id: "context",
      number: "02",
      title: "Contexto de Negócio",
      shortTitle: "Contexto",
      purpose: "Compreenda atores, escala e restrições inegociáveis do sistema.",
    },
    {
      id: "investigation",
      number: "03",
      title: "Investigação de Problemas",
      shortTitle: "Investigação",
      purpose: "Inspecione sintomas, frequência, impacto humano e justificativa antes de priorizar.",
    },
    {
      id: "prioritization",
      number: "04",
      title: "Priorização Interativa",
      shortTitle: "Priorização",
      purpose: "Construa e ordene sua fila prioritária e compare com a referência.",
    },
    {
      id: "solution",
      number: "05",
      title: "Alternativas de Solução",
      shortTitle: "Soluções",
      purpose: "Compare 3 alternativas por problema (benefícios, riscos, dependências) e escolha.",
    },
    {
      id: "tradeoffs",
      number: "06",
      title: "Fluxo As-Is → To-Be & Trade-offs",
      shortTitle: "As-Is/To-Be",
      purpose: "Compare fluxo visual, pontos de fricção, mudanças de estado e conflitos de objetivos.",
    },
    {
      id: "acceptance",
      number: "07",
      title: "Critérios de Aceite & QA",
      shortTitle: "QA & Aceite",
      purpose: "Selecione cenários de erro/carregamento alinhados às decisões tomadas.",
    },
    {
      id: "review",
      number: "08",
      title: "Relatório Dinâmico",
      shortTitle: "Relatório",
      purpose: "Revise decisões, alternativas descartadas, QA e diferenças vs referência.",
    },
  ],
  en: [
    {
      id: "scenario",
      number: "01",
      title: "Scenario Selection",
      shortTitle: "Scenario",
      purpose: "Pick the B2B system context (POS, Inventory ERP, or Commercial CRM).",
    },
    {
      id: "context",
      number: "02",
      title: "Business Context",
      shortTitle: "Context",
      purpose: "Review operational scale, stakeholders, and hard constraints.",
    },
    {
      id: "investigation",
      number: "03",
      title: "Problem Investigation",
      shortTitle: "Investigate",
      purpose: "Inspect symptoms, frequency, user impact, and rationale.",
    },
    {
      id: "prioritization",
      number: "04",
      title: "Interactive Prioritization",
      shortTitle: "Prioritize",
      purpose: "Build and rank your own priority list and compare against reference.",
    },
    {
      id: "solution",
      number: "05",
      title: "Solution Alternatives",
      shortTitle: "Solutions",
      purpose: "Compare 3 options per problem (benefits, risks, dependencies) and select.",
    },
    {
      id: "tradeoffs",
      number: "06",
      title: "As-Is → To-Be Flow & Trade-offs",
      shortTitle: "As-Is/To-Be",
      purpose: "Inspect visual flow nodes, friction hotspots, state transitions, and conflicts.",
    },
    {
      id: "acceptance",
      number: "07",
      title: "Acceptance Criteria & QA",
      shortTitle: "QA Suite",
      purpose: "Select validation scenarios matching your prioritized product decisions.",
    },
    {
      id: "review",
      number: "08",
      title: "Dynamic Decision Report",
      shortTitle: "Report",
      purpose: "Inspect choices, discarded options, QA specs, and reference contrast.",
    },
  ],
};
