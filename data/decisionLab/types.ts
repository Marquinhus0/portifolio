import type { Locale } from "@/context/LanguageContext";

export type ScenarioCode = "DL-01" | "DL-02" | "DL-03";

export type StepId =
  | "scenario"
  | "context"
  | "investigation"
  | "prioritization"
  | "solution"
  | "tradeoffs"
  | "acceptance"
  | "review";

export type ScaleLevel = 1 | 2 | 3 | 4 | 5;

export interface ProblemScores {
  userImpact: ScaleLevel;
  operationalImpact: ScaleLevel;
  frequency: ScaleLevel;
  businessRisk: ScaleLevel;
  implementationEffort: ScaleLevel;
}

export interface TradeOffDelta {
  speedVsValidation: number; // -2 (more validation) .. +2 (more speed)
  flexibilityVsControl: number; // -2 (more control) .. +2 (more flexibility)
  simplicityVsDensity: number; // -2 (more density) .. +2 (more simplicity)
  autonomyVsGovernance: number; // -2 (more governance) .. +2 (more autonomy)
  easeVsTraceability: number; // -2 (more traceability) .. +2 (more ease)
}

export interface SolutionAlternative {
  id: string;
  label: "A" | "B" | "C";
  title: string;
  description: string;
  expectedBenefit: string;
  limitation: string;
  userImpact: string;
  operationalImpact: string;
  estimatedComplexity: "Baixa" | "Média" | "Alta" | "Low" | "Medium" | "High";
  dependencies: string[];
  consequenceAnalysis: string;
  tradeOffShift: TradeOffDelta;
  isReferenceChoice?: boolean;
}

export interface ScenarioProblem {
  id: string;
  code: string;
  title: string;
  symptom: string;
  userImpactDetail: string;
  operationalImpactDetail: string;
  evidenceCue: string;
  scores: ProblemScores;
  alternatives: SolutionAlternative[];
}

export interface QaTestScenarioItem {
  id: string;
  category:
    | "normal_operation"
    | "missing_required"
    | "communication_failure"
    | "unauthorized_user"
    | "inconsistent_data"
    | "duplicate_operation";
  title: string;
  scenarioDescription: string;
  expectedUiState: string;
  givenWhenThen: string;
  recommendedCriticality: "essential" | "recommended";
}

export interface TradeOffAxisMeta {
  id: keyof TradeOffDelta;
  leftPole: string;
  rightPole: string;
  criteriaNote: string;
}

export interface DecisionScenarioConfig {
  id: string;
  code: ScenarioCode;
  domain: string;
  originTag: string;
  name: string;
  dilemma: string;
  businessContext: {
    overview: string;
    operationScale: string;
    stakeholders: string[];
    constraints: string[];
    keyMetricsWatch: string[];
  };
  problems: ScenarioProblem[];
  tradeOffAxes: TradeOffAxisMeta[];
  qaScenarios: QaTestScenarioItem[];
  referenceStrategy: {
    recommendedProblemIds: string[];
    title: string;
    summary: string;
    reasoning: string[];
  };
  relatedCaseSlug: string;
  relatedCaseLabel: string;
}

export interface SimulationState {
  selectedScenarioCode: ScenarioCode;
  currentStepIndex: number;
  maxReachedStepIndex: number;
  contextAcknowledged: boolean;
  inspectedProblemIds: string[];
  compareProblemIds: [string | null, string | null];
  prioritizedProblemIds: string[];
  selectedSolutionsByProblem: Record<string, string>;
  tradeOffAcknowledged: boolean;
  selectedQaIds: string[];
  strategyNotes: string;
  validationError: string | null;
}

export interface StepDefinition {
  id: StepId;
  number: string;
  title: string;
  shortTitle: string;
  purpose: string;
}

export type LocalizedScenarioMap = Record<Locale, DecisionScenarioConfig[]>;
