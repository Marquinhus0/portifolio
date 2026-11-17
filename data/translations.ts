import type { ExperienceItem, SkillCategory } from "@/types";
import type { Locale } from "@/context/LanguageContext";
import { CANONICAL_EXPERIENCE } from "@/data/careerProfile";

export const NAV_TRANSLATIONS = {
  pt: {
    links: {
      home: "Início",
      work: "Projetos",
      decisionLab: "Decision Lab",
      about: "Sobre",
      contact: "Contato",
    },
    available: "Disponível",
    availableTitle: "Disponível para novas oportunidades e projetos",
    resume: "Currículo",
    openMenu: "Abrir menu",
    brandAria: "Marcus Ritta — Início",
    mainNavAria: "Navegação principal",
  },
  en: {
    links: {
      home: "Home",
      work: "Projects",
      decisionLab: "Decision Lab",
      about: "About",
      contact: "Contact",
    },
    available: "Available",
    availableTitle: "Open to new roles and B2B product engagements",
    resume: "Resume",
    openMenu: "Toggle menu",
    brandAria: "Marcus Ritta — Home",
    mainNavAria: "Main navigation",
  },
} as const;

export const FOOTER_TRANSLATIONS = {
  pt: {
    tagline: "Sistemas de Gestão • Plataformas B2B • Produtos Digitais Complexos",
    navAria: "Navegação do rodapé",
    links: [
      { name: "Início", href: "/" },
      { name: "Projetos", href: "/work" },
      { name: "Decision Lab", href: "/decision-lab" },
      { name: "Sobre", href: "/about" },
      { name: "Currículo", href: "/resume" },
      { name: "Contato", href: "/contact" },
    ],
    rights: "Todos os direitos reservados.",
    location: "Brasil • Remoto / Híbrido",
  },
  en: {
    tagline: "Management Systems • B2B Platforms • Complex Digital Products",
    navAria: "Footer navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Projects", href: "/work" },
      { name: "Decision Lab", href: "/decision-lab" },
      { name: "About", href: "/about" },
      { name: "Resume", href: "/resume" },
      { name: "Contact", href: "/contact" },
    ],
    rights: "All rights reserved.",
    location: "Brazil • Remote / Hybrid",
  },
} as const;

export const HERO_TRANSLATIONS = {
  pt: {
    topDomain: "Especialização // ERP, SaaS B2B e Sistemas Complexos",
    eyebrow: "Product Designer // Sistemas Corporativos",
    subtitleHero: "especializado em ERP, SaaS B2B e sistemas complexos",
    quote:
      "Transformo regras de negócio complexas e rotinas operacionais densas em fluxos digitais claros e confiáveis.",
    bio: "Na ALFA Software desde 2020: uni vivência em 15+ implantações de ERP à prática de Product Design — conduzindo discovery, arquitetura de informação, Figma, critérios de aceite e QA com engenharia.",
    exploreProjects: "Explorar Case Real de ERP",
    contactMe: "Explorar Todos os Cases",
    resumeCta: "Currículo / CV",
    dossierLabel: "Dossiê Profissional",
    dossierYears: "2020 — PRESENTE",
    credentials: [
      {
        label: "Atuação Atual (2023 — Presente)",
        value: "Product Designer — ALFA Software",
        meta: "Pesquisa, Fluxos, Figma, Critérios de Aceite & QA",
      },
      {
        label: "Base em Negócios ERP (2020 — 2023)",
        value: "Analista de Negócios ERP — ALFA Software",
        meta: "15+ Implantações B2B, Regras Fiscais & Go-Live",
      },
      {
        label: "Entrega & Execução",
        value: "Arquitetura de Informação & Prototipação React",
        meta: "Figma + TypeScript + Alinhamento com Engenharia",
      },
    ],
    tags: [
      "Product Discovery",
      "ERP & Regras de Negócio",
      "Arquitetura de Informação",
      "Design Systems",
      "Figma + React/TS",
      "Critérios QA",
    ],
  },
  en: {
    topDomain: "Specialization // ERP, B2B SaaS & Complex Systems",
    eyebrow: "Product Designer // Enterprise Systems",
    subtitleHero: "specialized in ERP, B2B SaaS, and complex systems",
    quote:
      "I turn intricate business rules and dense operational workflows into clear, dependable digital products.",
    bio: "At ALFA Software since 2020: combining 15+ ERP implementations with end-to-end Product Design—research, information architecture, Figma systems, acceptance criteria, and engineering QA.",
    exploreProjects: "Explore Real ERP Case",
    contactMe: "Browse All Case Studies",
    resumeCta: "Resume / CV",
    dossierLabel: "Executive Dossier",
    dossierYears: "2020 — PRESENT",
    credentials: [
      {
        label: "Current Role (2023 — Present)",
        value: "Product Designer — ALFA Software",
        meta: "Research, Workflows, Figma, Acceptance Criteria & QA",
      },
      {
        label: "ERP Business Foundation (2020 — 2023)",
        value: "ERP Business Analyst — ALFA Software",
        meta: "15+ B2B Rollouts, Tax Rules & Go-Live Delivery",
      },
      {
        label: "Delivery & Execution",
        value: "Information Architecture & React Prototyping",
        meta: "Figma + TypeScript + Engineering Alignment",
      },
    ],
    tags: [
      "Product Discovery",
      "ERP Business Rules",
      "Information Architecture",
      "Design Systems",
      "Figma + React/TS",
      "QA Acceptance",
    ],
  },
} as const;

export const HOME_TRANSLATIONS = {
  pt: {
    workEyebrow: "[Experiência em Produção • ALFA Software]",
    workTitle: "Case real em destaque",
    workCountNote: "Fluxos reais de ERP (NDA-Safe) seguidos por 4 estudos autorais",
    workAllLink: "Ver índice completo",
    ndaTitle: "Estudos Autorais & Protótipos Funcionais Interativos",
    ndaDesc:
      "Os 4 projetos abaixo são explorações autorais com dados sintéticos em React/TypeScript para demonstrar arquitetura, estados de borda e prototipação interativa.",
    ndaCta: "Ver Experiência",
  },
  en: {
    workEyebrow: "[Production Track Record • ALFA Software]",
    workTitle: "Featured real-world case",
    workCountNote: "Real ERP workflows (NDA-Safe) followed by 4 self-directed studies",
    workAllLink: "View full index",
    ndaTitle: "Self-Directed Studies & Interactive Functional Prototypes",
    ndaDesc:
      "The 4 projects below are authorial explorations built with synthetic data in React/TypeScript to demonstrate architecture, edge states, and live prototyping.",
    ndaCta: "View Experience",
  },
} as const;

export const CASE_CARD_COPY: Record<
  Locale,
  Record<string, { title: string; subtitle: string; domainLabel: string; cta: string; year?: string }>
> = {
  pt: {
    "pulse-social-network": {
      title: "PULSE — Rede Social Focada em Presença",
      subtitle:
        "Rede social mobile-first desenhada para leitura calma, publicações intencionais e conexões por interesse sem ruído algorítmico.",
      domainLabel: "Consumer Social • Mobile App",
      cta: "Ver Estudo de Caso",
      year: "2024 — Estudo Autoral",
    },
    "frame-interactive-video": {
      title: "FRAME — Streaming Cinemático & Notas Vivas",
      subtitle:
        "Plataforma de cinema e arquitetura onde cada segundo do vídeo carrega plantas interativas, contexto histórico e caderno de estudos.",
      domainLabel: "Cinema & Mídia Interativa",
      cta: "Ver Case & Protótipo Interativo",
      year: "2024 — Estudo Autoral",
    },
    "flow-crm-b2b": {
      title: "FLOW CRM — Pipeline & Operação Comercial B2B",
      subtitle:
        "Estudo autoral com sandbox navegável em React para gestão visual de oportunidades, funil Kanban e alertas de follow-up em dados demonstrativos.",
      domainLabel: "CRM Comercial B2B",
      cta: "Ver Estudo & Sandbox Interativo",
      year: "2024 — Estudo Autoral",
    },
    "supplyhub-procurement-b2b": {
      title: "SupplyHub — Procurement & Cotações B2B",
      subtitle:
        "Suite conceitual enterprise com sandbox navegável para gestão de cotações, mapa comparativo de preços e ordens de compra.",
      domainLabel: "Compras & Suprimentos B2B",
      cta: "Ver Estudo & Sandbox Interativo",
      year: "2024 — Estudo Autoral",
    },
    "erp-enterprise-redesign": {
      title: "ERP Corporativo B2B — Arquitetura & Antes/Depois (NDA-Safe)",
      subtitle:
        "Evolução real de fluxos de Compras, Vendas, Estoque e Faturamento unindo 15+ implantações em campo e Product Design padronizado (reconstrução anonimizada).",
      domainLabel: "ERP Corporativo • NDA-Safe",
      cta: "Explorar Antes & Depois NDA-Safe",
      year: "2020 — Presente",
    },
  },
  en: {
    "pulse-social-network": {
      title: "PULSE — Calm Presence Social App",
      subtitle:
        "Mobile-first social app crafted for calm reading, intentional publishing, and interest-driven communities without algorithmic noise.",
      domainLabel: "Consumer Social • Mobile App",
      cta: "Read Case Study",
      year: "2024 — Authorial Study",
    },
    "frame-interactive-video": {
      title: "FRAME — Cinematic Streaming & Living Notes",
      subtitle:
        "Cinema and architecture platform where every video timestamp carries interactive blueprints, historical context, and live study notes.",
      domainLabel: "Cinema & Interactive Media",
      cta: "View Case & Functional Prototype",
      year: "2024 — Authorial Study",
    },
    "flow-crm-b2b": {
      title: "FLOW CRM — B2B Revenue Pipeline & Operations",
      subtitle:
        "Authorial study with a navigable React sandbox for B2B pipeline tracking, Kanban stages, and SLA follow-ups using synthetic demo data.",
      domainLabel: "B2B Sales CRM",
      cta: "View Study & Interactive Sandbox",
      year: "2024 — Authorial Study",
    },
    "supplyhub-procurement-b2b": {
      title: "SupplyHub — B2B Procurement & RFQ Matrix",
      subtitle:
        "Conceptual B2B procurement suite with an interactive sandbox unifying RFQ collection, side-by-side matrices, and approval tiers.",
      domainLabel: "Procurement & Supply B2B",
      cta: "View Study & Interactive Sandbox",
      year: "2024 — Authorial Study",
    },
    "erp-enterprise-redesign": {
      title: "Enterprise B2B ERP — Architecture & Before/After (NDA-Safe)",
      subtitle:
        "Real-world evolution of Purchasing, Sales, Inventory, and Billing flows combining 15+ field rollouts with standardized Product Design (anonymized reconstruction).",
      domainLabel: "Enterprise ERP • NDA-Safe",
      cta: "Explore Before & After NDA-Safe",
      year: "2020 — Present",
    },
  },
};

export const INTRO_TRANSLATIONS = {
  pt: {
    eyebrow: "[Posicionamento & Atuação]",
    titleLine1: "Entre a complexidade",
    titleLine2: "e o fluxo claro.",
    body: "Softwares corporativos acumulam camadas complexas de negócio. Meu papel é estruturar essa densidade com arquitetura de informação precisa, prototipação iterativa e empatia real com quem opera o sistema diariamente.",
    pillarsHeader: "// 4 Pilares de Atuação",
    pillarsMeta: "PROCESSO → ENTREGA",
    impactLabel: "Impacto Prático:",
    pillars: [
      {
        code: "DISCOVERY",
        label: "Levantamento & Estratégia",
        desc: "Entendimento profundo das regras operacionais, rotinas reais de clientes e gargalos de processos antes de qualquer tela.",
        impact: "Direcionamento exato de produto e economia de esforço",
      },
      {
        code: "ARQUITETURA",
        label: "Fluxos & Sistemas Densos",
        desc: "Simplificação de módulos críticos como Compras, Vendas, Financeiro e Estoque garantindo clareza e eficiência na tarefa.",
        impact: "Redução de atrito operacional e curva de aprendizado",
      },
      {
        code: "COMPONENTES",
        label: "Sistemas Escaláveis no Figma",
        desc: "Construção de bibliotecas modulares, consistentes e protótipos interativos de alta fidelidade que guiam a evolução do produto.",
        impact: "Consistência sistêmica e escalabilidade ágil de design",
      },
      {
        code: "EXECUÇÃO",
        label: "Validação Técnica & QA",
        desc: "Documentação estruturada de requisitos funcionais e testes práticos em interface junto ao time de desenvolvimento.",
        impact: "Alinhamento consistente com engenharia e qualidade no Go-Live",
      },
    ],
  },
  en: {
    eyebrow: "[Positioning & Practice]",
    titleLine1: "Between business density",
    titleLine2: "and clear execution.",
    body: "Enterprise tools accumulate dense business rules over years. My role is to structure that complexity with crisp information architecture, interactive prototyping, and real empathy for daily operators.",
    pillarsHeader: "// 4 Core Pillars",
    pillarsMeta: "DISCOVERY → DELIVERY",
    impactLabel: "Practical Impact:",
    pillars: [
      {
        code: "DISCOVERY",
        label: "Research & Product Strategy",
        desc: "Deep understanding of operational rules, real customer routines, and workflow bottlenecks before drawing a single frame.",
        impact: "Focused product direction and leaner engineering handoffs",
      },
      {
        code: "ARCHITECTURE",
        label: "Flows & High-Density UI",
        desc: "Simplifying critical ERP modules like Procurement, Sales, Finance, and Inventory to keep daily execution fast and legible.",
        impact: "Lower operational friction and shorter onboarding curves",
      },
      {
        code: "SYSTEMS",
        label: "Scalable Figma Libraries",
        desc: "Building modular component foundations and interactive high-fidelity prototypes that guide sustainable product evolution.",
        impact: "Systemic UI consistency and steadier feature delivery",
      },
      {
        code: "EXECUTION",
        label: "Technical Validation & QA",
        desc: "Structured functional specs, acceptance criteria, and hands-on interface QA alongside engineering teams.",
        impact: "Tight engineering alignment and dependable Go-Live quality",
      },
    ],
  },
} as const;

export const EXPERIENCE_TRANSLATIONS: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    respLabel: string;
    impactLabel: string;
    itemsEn?: ExperienceItem[];
  }
> = {
  pt: {
    eyebrow: "[Trajetória Profissional]",
    title: "Experiência",
    subtitle:
      "Vivência sólida no desenvolvimento de sistemas complexos, da análise de regras de negócio de ERP ao design de produto de ponta a ponta.",
    respLabel: "Responsabilidades:",
    impactLabel: "Resultados & Impacto:",
  },
  en: {
    eyebrow: "[Professional Track Record]",
    title: "Experience",
    subtitle:
      "Hands-on track record building complex enterprise software, bridging ERP business rules and end-to-end Product Design.",
    respLabel: "Responsibilities:",
    impactLabel: "Outcomes & Impact:",
    itemsEn: CANONICAL_EXPERIENCE.en,
  },
};

export const SKILLS_TRANSLATIONS: Record<
  Locale,
  { eyebrow: string; title: string; subtitle: string; itemsEn?: SkillCategory[] }
> = {
  pt: {
    eyebrow: "[Domínio & Ferramentas]",
    title: "Competências",
    subtitle:
      "Habilidades e ferramentas organizadas por área, com foco em softwares de gestão, plataformas B2B e rotinas de trabalho.",
  },
  en: {
    eyebrow: "[Capabilities & Stack]",
    title: "Skills",
    subtitle:
      "Capabilities organized by discipline, focused on enterprise management tools, B2B SaaS, and real delivery workflows.",
    itemsEn: [
      {
        category: "PRODUCT",
        description:
          "Strategic product framing, impact-oriented prioritization, and continuous de-risking.",
        skills: [
          "Product Discovery",
          "Product Strategy",
          "Prioritization",
          "Problem Framing",
          "Product Thinking",
          "Data-Informed Decisions",
        ],
      },
      {
        category: "UX & RESEARCH",
        description:
          "User investigation, journey mapping, and clear architecture for complex workflows.",
        skills: [
          "User Research",
          "User Interviews",
          "Field Observation",
          "Usability Testing",
          "User Flows",
          "Information Architecture",
          "Journey Mapping",
        ],
      },
      {
        category: "DESIGN",
        description:
          "High-fidelity visual systems, scalable component libraries, and accessibility.",
        skills: [
          "Figma",
          "Prototyping",
          "Design Systems",
          "UI Design",
          "Wireframes",
          "Accessibility",
          "Design QA",
        ],
      },
      {
        category: "TECHNOLOGY",
        description:
          "Fluency in front-end structures, APIs, data contracts, and engineering collaboration.",
        skills: [
          "HTML",
          "CSS",
          "Vue.js",
          "APIs",
          "Postman",
          "Technical Collaboration",
        ],
      },
      {
        category: "QUALITY",
        description:
          "UI consistency checks, functional testing, and thorough edge-case mapping.",
        skills: [
          "Functional Testing",
          "UX Testing",
          "Edge Cases",
          "Acceptance Criteria",
          "Regression Testing",
          "Quality Assurance",
        ],
      },
    ],
  },
};

export const PHILOSOPHY_TRANSLATIONS = {
  pt: {
    eyebrow: "[Filosofia de Design]",
    quote:
      "Bom design de produto conecta as necessidades do usuário, os objetivos estratégicos do negócio e a viabilidade da tecnologia.",
  },
  en: {
    eyebrow: "[Design Philosophy]",
    quote:
      "Good product design aligns real user needs, business strategy, and engineering feasibility into software teams actually enjoy using.",
  },
} as const;

export const CONTACT_BLOCK_TRANSLATIONS = {
  pt: {
    eyebrow: "[Contato Direto]",
    titleLine1: "Tem um desafio no seu produto?",
    titleLine2: "Vamos torná-lo mais simples de usar.",
    desc: "Ajudo times e empresas a desenharem interfaces claras para sistemas de gestão, plataformas B2B e ferramentas de trabalho.",
    primaryChannel: "Canal Principal:",
    copied: "Copiado",
    copyAria: "Copiar endereço de e-mail",
    emailBtn: "Entrar em Contato",
    briefBtn: "Montar briefing rápido",
    linksLabel: "Redes & Canais:",
  },
  en: {
    eyebrow: "[Direct Contact]",
    titleLine1: "Solving friction in your product?",
    titleLine2: "Let's make it effortless to operate.",
    desc: "I help product teams design crisp, resilient interfaces for enterprise systems, B2B SaaS, and daily operational tools.",
    primaryChannel: "Direct Channel:",
    copied: "Copied",
    copyAria: "Copy email address",
    emailBtn: "Send Email",
    briefBtn: "Build Quick Brief",
    linksLabel: "Links & Channels:",
  },
} as const;

export const WORK_PAGE_TRANSLATIONS = {
  pt: {
    eyebrow: "[Índice de Projetos]",
    title: "Projetos selecionados",
    subtitle:
      "Estudos de caso de Product Design e UX para softwares de gestão, plataformas B2B e mídia interativa, com documentação de arquitetura e protótipos funcionais.",
    filterLabel: "Filtrar por:",
    showing: (shown: number, total: number) => `Exibindo ${shown} de ${total} cases`,
    filters: {
      all: "Todos",
      b2b: "B2B & Enterprise",
      consumer: "Consumer & Mídia",
      live: "Protótipo Interativo",
    },
    ndaEyebrow: "Experiência Profissional em Produção • ALFA Software",
    ndaTitle: "Evolução Real de Sistema Corporativo (Case [01] NDA-Safe)",
    ndaDesc:
      "O Case [01] documenta fluxos reais do ERP da ALFA Software via comparador antes/depois anonimizado. Os projetos [02] a [05] são estudos autorais com dados sintéticos e protótipos interativos em React.",
    ndaCta: "Abrir Case Real (ERP NDA-Safe)",
  },
  en: {
    eyebrow: "[Project Directory]",
    title: "Selected work",
    subtitle:
      "Product Design and UX case studies spanning enterprise ERP, B2B SaaS, and interactive media—complete with system architecture and live React prototypes.",
    filterLabel: "Filter:",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total} cases`,
    filters: {
      all: "All",
      b2b: "B2B & Enterprise",
      consumer: "Consumer & Media",
      live: "Interactive Prototype",
    },
    ndaEyebrow: "Production Enterprise Track Record • ALFA Software",
    ndaTitle: "Real Enterprise System Evolution (Case [01] NDA-Safe)",
    ndaDesc:
      "Case [01] documents real ERP workflows at ALFA Software via an anonymized before/after prototype. Projects [02]–[05] are self-directed authorial studies built with synthetic data in React.",
    ndaCta: "Open Real Case (ERP NDA-Safe)",
  },
} as const;
