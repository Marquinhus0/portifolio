export interface CaseStudy {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  company: string;
  role: string;
  duration: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
  isConcept?: boolean;
  conceptBadge?: string;
  conceptNote?: string;

  // Visão Geral & Contexto
  overview: string;
  context: string;
  problem: string;

  // Usuários e Pesquisa (com suporte explícito a Personas Conceituais)
  users: {
    target: string;
    needs: string;
    behaviors?: string;
    painPoints?: string;
  }[];
  research: {
    approach: string;
    keyQuestions: string[];
    activities: string[];
    benchmarkingNotes?: string[];
  };
  insights: {
    title: string;
    description: string;
  }[];

  // Hipóteses Conceituais & Regras de Negócio
  hypotheses?: {
    hypothesis: string;
    rationale: string;
  }[];
  businessRules?: {
    rule: string;
    trigger: string;
    impact: string;
  }[];

  // Oportunidade & Objetivos
  opportunity: string;
  goals: string[];
  constraints: string[];

  // Processo & Arquitetura
  process: string[];
  flows: {
    title: string;
    description: string;
    diagramSteps?: string[];
  };
  wireframes: {
    title: string;
    description: string;
    focusPoints: string[];
  };
  ui: {
    title: string;
    description: string;
    systemHighlights: string[];
  };
  systemStates?: {
    state: string;
    scenario: string;
    solution: string;
  }[];
  prototype: {
    description: string;
    type: string;
    linkPlaceholder?: string;
    interactionPoints?: string[];
  };
  validation: {
    method: string;
    description: string;
    findings: string[];
  };

  // Solução, Resultados e Aprendizados
  solution: {
    summary: string;
    keyFeatures: {
      title: string;
      description: string;
    }[];
  };
  results: {
    summary: string;
    metrics: {
      label: string;
      value: string;
      type: "placeholder" | "metric_goal";
    }[];
    metricsFramework?: {
      pillar: string;
      indicator: string;
      rationale: string;
    }[];
  };
  learnings: string[];
  galleryPlaceholders: {
    title: string;
    caption: string;
    type: "wireframe" | "flow" | "interface" | "architecture";
  }[];
}

export interface ExperienceItem {
  period: string;
  company: string;
  role: string;
  domain: string;
  description: string;
  responsibilities: string[];
  impacts: string[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
}
