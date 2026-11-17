import type { Locale } from "@/context/LanguageContext";
import type { DecisionScenarioConfig, StepDefinition } from "./types";
import { SCENARIOS_PT } from "./scenarios-pt";
import { SCENARIOS_EN } from "./scenarios-en";

export const DECISION_SIMULATOR_SCENARIOS: Record<Locale, DecisionScenarioConfig[]> = {
  pt: SCENARIOS_PT,
  en: SCENARIOS_EN,
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
      purpose: "Inspecione sintomas, impacto humano e risco antes de priorizar.",
    },
    {
      id: "prioritization",
      number: "04",
      title: "Priorização Explicável",
      shortTitle: "Priorização",
      purpose: "Compare dimensões e escolha quais problemas atacar neste ciclo.",
    },
    {
      id: "solution",
      number: "05",
      title: "Decisão de Solução",
      shortTitle: "Soluções",
      purpose: "Avalie alternativas e inspecione consequências específicas.",
    },
    {
      id: "tradeoffs",
      number: "06",
      title: "Análise de Trade-offs",
      shortTitle: "Trade-offs",
      purpose: "Visualize as tensões e concessões geradas pelas suas escolhas.",
    },
    {
      id: "acceptance",
      number: "07",
      title: "Critérios de Aceite & QA",
      shortTitle: "QA & Aceite",
      purpose: "Defina a proposta de cobertura de testes e estados de erro.",
    },
    {
      id: "review",
      number: "08",
      title: "Relatório de Decisão",
      shortTitle: "Revisão",
      purpose: "Compare sua estratégia com a trilha de referência sem julgamento.",
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
      purpose: "Inspect symptoms, user impact, and operational risk.",
    },
    {
      id: "prioritization",
      number: "04",
      title: "Problem Prioritization",
      shortTitle: "Prioritize",
      purpose: "Compare explainable rubric factors and select cycle priorities.",
    },
    {
      id: "solution",
      number: "05",
      title: "Solution Decision",
      shortTitle: "Solutions",
      purpose: "Evaluate solution options and read contextual consequences.",
    },
    {
      id: "tradeoffs",
      number: "06",
      title: "Trade-off Analysis",
      shortTitle: "Trade-offs",
      purpose: "Examine objective conflicts created by your choices.",
    },
    {
      id: "acceptance",
      number: "07",
      title: "Acceptance Criteria & QA",
      shortTitle: "QA Suite",
      purpose: "Define which edge cases belong in the proposed test suite.",
    },
    {
      id: "review",
      number: "08",
      title: "Decision Review",
      shortTitle: "Review",
      purpose: "Compare your strategy objectively against the reference path.",
    },
  ],
};
