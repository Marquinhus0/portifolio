import type { ExperienceItem } from "@/types";
import type { Locale } from "@/context/LanguageContext";

export interface CareerMetricItem {
  value: string;
  label: string;
  sub: string;
}

export interface AlfaNarrativeContent {
  eyebrow: string;
  heading: string;
  summary: string;
  paragraphs: string[];
  quote: string;
}

export const CAREER_METRICS: Record<Locale, CareerMetricItem[]> = {
  pt: [
    {
      value: "2020 — Presente",
      label: "Vivência em ERP & Operações B2B",
      sub: "ALFA Software • Negócios + Design",
    },
    {
      value: "2023 — Presente",
      label: "Atuação em Product Design",
      sub: "Pesquisa, Fluxos, Figma & Critérios QA",
    },
    {
      value: "2020 — 2023",
      label: "Analista de Negócios ERP",
      sub: "Regras Fiscais, Processos & Documentação",
    },
    {
      value: "15+",
      label: "Implantações B2B Conduzidas",
      sub: "Compras, Vendas, Financeiro e Estoque",
    },
  ],
  en: [
    {
      value: "2020 — Present",
      label: "ERP & B2B Domain Experience",
      sub: "ALFA Software • Business + Design",
    },
    {
      value: "2023 — Present",
      label: "Dedicated Product Design",
      sub: "Research, Flows, Figma & QA Criteria",
    },
    {
      value: "2020 — 2023",
      label: "ERP Business Analyst",
      sub: "Business Rules, Workflows & Docs",
    },
    {
      value: "15+",
      label: "Field B2B ERP Rollouts",
      sub: "Purchasing, Sales, Finance & Inventory",
    },
  ],
};

export const ALFA_NARRATIVE: Record<Locale, AlfaNarrativeContent> = {
  pt: {
    eyebrow: "[Trajetória na ALFA Software]",
    heading: "Design forjado na realidade da operação.",
    summary:
      "Na ALFA Software desde 2020: comecei conduzindo mais de 15 implantações de ERP como Analista de Negócios (2020–2023) e, desde 2023, atuo como Product Designer conectando pesquisa em campo, arquitetura de informação, padronização de componentes no Figma, critérios de aceite e QA junto à engenharia.",
    paragraphs: [
      "Minha trajetória em produtos corporativos começou dentro da operação real na ALFA Software (2020–2023): atuando como Analista de Negócios ERP em mais de 15 implantações completas — do levantamento de processos de Compras, Vendas, Financeiro e Estoque ao acompanhamento de go-live, suporte especializado e criação de método próprio de coleta de feedbacks.",
      "Desde 2023, como Product Designer na própria ALFA Software, aplico essa base de negócio na condução de entrevistas e testes de usabilidade, redesenho de fluxos densos no Figma, padronização de componentes, definição de requisitos funcionais e critérios de aceite com PMs e desenvolvedores, além de testes funcionais com perspectiva de QA e apoio em demonstrações e implantações.",
    ],
    quote:
      "Conecto descoberta com usuários reais, regras fiscais e de negócio do ERP e validação funcional com engenharia e QA antes da entrega em produção.",
  },
  en: {
    eyebrow: "[ALFA Software Track Record]",
    heading: "Design forged in daily operational reality.",
    summary:
      "At ALFA Software since 2020: started leading 15+ full ERP rollouts as a Business Analyst (2020–2023), and since 2023 serve as Product Designer uniting field research, information architecture, standardized Figma components, acceptance criteria, and engineering QA.",
    paragraphs: [
      "My enterprise product career started inside real operations at ALFA Software (2020–2023), working as an ERP Business Analyst across 15+ end-to-end implementations—mapping Purchasing, Sales, Finance, and Inventory rules from requirements gathering through go-live and creating an internal user feedback collection method.",
      "Since 2023 as Product Designer at ALFA Software, I translate that domain foundation into user interviews and usability testing, dense workflow redesigns and interactive Figma prototypes, shared component libraries, functional requirements and acceptance criteria with PMs and developers, and QA-minded validation before release.",
    ],
    quote:
      "I connect real user discovery, ERP business and tax rules, and functional QA collaboration with engineering ahead of production delivery.",
  },
};

export const RESUME_SUMMARY: Record<Locale, string> = {
  pt: "Product Designer na ALFA Software (2023 — Presente) com base prévia como Analista de Negócios ERP (2020 — 2023) e mais de 15 implantações B2B conduzidas. Atuação entre pesquisa com usuários, arquitetura de informação, prototipação e componentes no Figma, critérios de aceite e validação funcional com engenharia.",
  en: "Product Designer at ALFA Software (2023 — Present) with prior foundation as an ERP Business Analyst (2020 — 2023) across 15+ full B2B rollouts. Focused on user research, information architecture, Figma components and prototypes, acceptance criteria, and engineering QA collaboration.",
};

export const CANONICAL_EXPERIENCE: Record<Locale, ExperienceItem[]> = {
  pt: [
    {
      period: "2023 — Presente",
      company: "ALFA Software",
      role: "Product Designer",
      domain: "ERP / B2B / SaaS",
      description:
        "Responsável pelo design de produto do ERP da empresa, atuando desde a pesquisa com clientes até a validação funcional com desenvolvedores. Desenho fluxos, protótipos interativos e componentes no Figma, acompanhando a entrega em produção.",
      responsibilities: [
        "Condução contínua de pesquisa com usuários (entrevistas em profundidade, observação em campo e testes de usabilidade)",
        "Redesenho de fluxos e interfaces ponta a ponta no Figma (arquitetura de informação, wireframes, protótipos navegáveis e padronização de componentes)",
        "Alinhamento de regras de negócio, requisitos funcionais e critérios de aceite junto a Product Managers, engenharia e stakeholders",
        "Validação funcional com perspectiva de QA antes do deploy e estruturação contínua de feedbacks de uso",
        "Participação em demonstrações com clientes corporativos e processos de implantação assistida (go-live e treinamentos)",
      ],
      impacts: [
        "Padronização de componentes e especificação de estados críticos (erro fiscal, vazio e carregamento) entre Figma e engenharia",
        "Incorporação de testes de usabilidade e critérios de aceite na rotina ágil antes de ir para produção",
        "Simplificação de telas densas de balcão, fechamento de pedido e sugestão de compra para reduzir dúvidas operacionais pós-implantação",
      ],
      technologies: [
        "Figma",
        "Product Discovery",
        "UX Research",
        "Design Systems",
        "Usability Testing",
        "QA & Criteria",
        "B2B ERP",
        "JIRA",
      ],
    },
    {
      period: "2020 — 2023",
      company: "ALFA Software",
      role: "Analista de Negócios / Business Analyst",
      domain: "ERP / Business / Product",
      description:
        "Atuação na ponte entre clientes corporativos, desenvolvimento e design. Responsável por levantamento de processos, validação de regras de negócio de ERP e condução de implantações completas.",
      responsibilities: [
        "Condução de 15+ processos de implantação completos de ERP, do levantamento de requisitos ao go-live com usuários",
        "Desenvolvimento de método proprietário de coleta e estruturação de feedbacks que se tornou padrão oficial na empresa",
        "Criação de documentação técnica ilustrada (wireframes, diagramas e fluxos) para regras de negócio e funcionalidades complexas",
        "Atuação no site institucional da empresa com foco em arquitetura da informação e jornada de conversão",
        "Estruturação de base de conhecimento visual com manuais práticos, tutoriais em vídeo e guias operacionais",
        "Suporte técnico especializado e análise de processos nos módulos vitais: Compras, Vendas, Financeiro e Estoque",
      ],
      impacts: [
        "15+ implantações completas de ERP conduzidas em clientes B2B (Compras, Vendas, Financeiro e Estoque)",
        "Método próprio de coleta e triagem de feedbacks adotado como padrão oficial da empresa",
        "Base de conhecimento ilustrada com guias operacionais e arquitetura do site institucional estruturada",
      ],
      technologies: [
        "Business Analysis",
        "Process Mapping",
        "ERP Systems",
        "Information Architecture",
        "QA & Testing",
        "Wireframing",
        "Go-Live Delivery",
      ],
    },
    {
      period: "2020 (6 meses)",
      company: "ISBET — Instituto Brasileiro Pró-Educação",
      role: "Auxiliar Administrativo & Suporte a Sistemas",
      domain: "Operações / Sistemas / Infra",
      description:
        "Operação e controle de sistemas internos, governança de documentação cadastral e suporte técnico a hardware e redes, consolidando base em rotinas administrativas e rigor com dados.",
      responsibilities: [
        "Controle, conferência e governança de dados no sistema de gestão de jovens aprendizes",
        "Estruturação e arquivamento padronizado de documentos corporativos",
        "Suporte técnico operacional a equipamentos, periféricos e manutenção de rede interna",
      ],
      impacts: [
        "Padronização no fluxo de atualização cadastral e manutenção da integridade dos registros operacionais",
      ],
      technologies: [
        "Sistemas Operacionais",
        "Governança de Dados",
        "Suporte Técnico",
        "Redes & Infra",
      ],
    },
  ],
  en: [
    {
      period: "2023 — Present",
      company: "ALFA Software",
      role: "Product Designer",
      domain: "ERP / B2B / SaaS",
      description:
        "Responsible for Product Design across the company's ERP suite, partnering from customer research through engineering validation. Designing workflows, interactive prototypes, and Figma component standards while supporting production rollouts.",
      responsibilities: [
        "Ongoing user research through in-depth interviews, field observation, and usability testing",
        "End-to-end flow and interface redesign in Figma (information architecture, wireframes, navigable prototypes, and component standardization)",
        "Aligning business rules, functional requirements, and acceptance criteria with PMs, engineering, and stakeholders",
        "Functional validation from a QA perspective ahead of release along with structured feedback triage",
        "Enterprise client demos and assisted go-live onboarding & operational training",
      ],
      impacts: [
        "Standardized UI components and critical state specs (tax error, empty, loading) shared between Figma and engineering",
        "Embedded usability checks and acceptance criteria into agile delivery prior to production deployment",
        "Simplified high-density POS counter, order closing, and restock workflows to reduce recurring post-rollout operator questions",
      ],
      technologies: [
        "Figma",
        "Product Discovery",
        "UX Research",
        "Design Systems",
        "Usability Testing",
        "QA & Criteria",
        "B2B ERP",
        "JIRA",
      ],
    },
    {
      period: "2020 — 2023",
      company: "ALFA Software",
      role: "Business Analyst (ERP)",
      domain: "ERP / Business / Product",
      description:
        "Bridge between enterprise clients, engineering, and design—leading process discovery, ERP business rules validation, and full-cycle implementations.",
      responsibilities: [
        "Led 15+ full-cycle ERP implementations, from requirements gathering to operator go-live",
        "Created an internal user feedback collection & triage method adopted as company standard",
        "Authored illustrated technical documentation (wireframes, diagrams, flows) for complex business rules",
        "Worked on the company institutional website focused on information architecture and conversion flow",
        "Structured a visual knowledge base with practical manuals, video tutorials, and operational guides",
        "Specialized technical support and workflow analysis across Purchasing, Sales, Finance, and Inventory",
      ],
      impacts: [
        "Delivered 15+ full-cycle ERP rollouts across Purchasing, Sales, Finance, and Inventory for B2B clients",
        "Internal user feedback intake & triage method adopted as company standard",
        "Built visual operational guides and restructured corporate site information architecture",
      ],
      technologies: [
        "Business Analysis",
        "Process Mapping",
        "ERP Systems",
        "Information Architecture",
        "QA & Testing",
        "Wireframing",
        "Go-Live Delivery",
      ],
    },
    {
      period: "2020 (6 mos)",
      company: "ISBET — Instituto Brasileiro Pró-Educação",
      role: "Administrative & Systems Support Assistant",
      domain: "Operations / Systems / Infra",
      description:
        "Internal systems operation, registration data governance, and hardware/network support, establishing discipline with operational data integrity.",
      responsibilities: [
        "Verification and data governance in the apprenticeship management system",
        "Standardized structuring and filing of corporate records",
        "Hands-on technical support for workstations, peripherals, and internal network",
      ],
      impacts: [
        "Standardized registration update workflows and maintained operational record integrity",
      ],
      technologies: [
        "Operating Systems",
        "Data Governance",
        "Tech Support",
        "Network & Infra",
      ],
    },
  ],
};
