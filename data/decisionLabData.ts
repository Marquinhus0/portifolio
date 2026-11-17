import type { Locale } from "@/context/LanguageContext";
import { DECISION_SIMULATOR_SCENARIOS } from "@/data/decisionLab/scenarios";
import type { DecisionScenarioConfig } from "@/data/decisionLab/types";

export type AxisLevel = "low" | "medium" | "high";

export interface DecisionOption {
  id: "A" | "B" | "C";
  title: string;
  summary: string;
  isRecommended: boolean;
}

export interface DecisionScenarioPreview {
  id: string;
  code: string;
  domain: string;
  originTag: string;
  title: string;
  dilemma: string;
  stakeholders: string[];
  relatedCaseSlug: string;
  relatedCaseLabel: string;
  options: DecisionOption[];
  thinkingFlow: { id: string }[];
}

export const DECISION_LAB_COPY = {
  pt: {
    eyebrow: "[UX Decision Lab • Simulador Interativo em 8 Etapas]",
    pageTitle: "Simulador interativo de decisões em ERP, Estoque e CRM.",
    pageSubtitle:
      "Conduza uma simulação prática em 8 etapas: investigue sintomas operacionais, priorize problemas em matriz explicável, decida soluções, analise trade-offs e monte a proposta de cobertura QA.",
    ndaNotice:
      "Simulação autoral determinística executada no navegador: cenários didáticos de sistemas corporativos para demonstrar raciocínio de produto, sem expor dados ou telas de clientes.",
    preview: {
      eyebrow: "[UX Decision Lab • Simulador Interativo]",
      title: "Tome decisões de produto e veja os trade-offs ao vivo.",
      subtitle:
        "Em sistemas corporativos, cada escolha altera a velocidade do operador, a integridade dos dados e o esforço técnico. Experimente o simulador em 8 etapas com 3 cenários B2B.",
      cta: "Iniciar Simulador em 8 Etapas",
      promptLabel: "Escolha um cenário da simulação:",
      recommendedNote: "Simulação interativa • 8 etapas",
    },
  },
  en: {
    eyebrow: "[UX Decision Lab • Interactive 8-Step Simulator]",
    pageTitle: "Interactive product decision simulator across POS, Inventory & CRM.",
    pageSubtitle:
      "Run an end-to-end 8-step product thinking simulation: investigate friction, prioritize via an explainable matrix, pick solutions, analyze trade-offs, and build a QA test coverage proposal.",
    ndaNotice:
      "Deterministic browser-side authorial simulation: didactic B2B scenarios illustrating Product Design reasoning without exposing proprietary client screens or real data.",
    preview: {
      eyebrow: "[UX Decision Lab • Interactive Simulator]",
      title: "Make product decisions and inspect trade-offs live.",
      subtitle:
        "In enterprise software, every UX choice shifts frontline speed, data integrity, and engineering effort. Run the 8-step interactive simulator across 3 B2B scenarios.",
      cta: "Launch 8-Step Simulator",
      promptLabel: "Pick a simulation scenario:",
      recommendedNote: "Interactive simulation • 8 steps",
    },
  },
} as const;

function toPreviewScenario(cfg: DecisionScenarioConfig): DecisionScenarioPreview {
  const leadProblem = cfg.problems[0];
  const mappedOptions: DecisionOption[] = leadProblem.alternatives.map((alt) => ({
    id: alt.label,
    title: alt.title,
    summary: alt.description,
    isRecommended: Boolean(alt.isReferenceChoice),
  }));

  return {
    id: cfg.id,
    code: cfg.code,
    domain: cfg.domain,
    originTag: cfg.originTag,
    title: cfg.name,
    dilemma: cfg.dilemma,
    stakeholders: cfg.businessContext.stakeholders,
    relatedCaseSlug: cfg.relatedCaseSlug,
    relatedCaseLabel: cfg.relatedCaseLabel,
    options: mappedOptions,
    thinkingFlow: Array.from({ length: 8 }, (_, idx) => ({ id: `step-${idx + 1}` })),
  };
}

export const DECISION_SCENARIOS: Record<Locale, DecisionScenarioPreview[]> = {
  pt: DECISION_SIMULATOR_SCENARIOS.pt.map(toPreviewScenario),
  en: DECISION_SIMULATOR_SCENARIOS.en.map(toPreviewScenario),
};
