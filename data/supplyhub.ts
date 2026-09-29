export interface SupplyHubFeature {
  icon: string;
  title: string;
  description: string;
}

export interface SupplyHubProblem {
  id: string;
  icon: string;
  title: string;
  description: string;
  detail: string;
}

export interface SupplyHubJourneyStep {
  number: string;
  title: string;
  description: string;
  action: string;
  uiSnippet: {
    label: string;
    value: string;
    tag?: string;
  };
}

export interface SupplyHubScreen {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  keyHighlights: string[];
  mockupData: {
    badge: string;
    title: string;
    subtitle: string;
    details: Array<{ label: string; value: string }>;
    actionText?: string;
  };
}

export interface SupplyHubBusinessRule {
  id: string;
  ruleNumber: string;
  title: string;
  description: string;
  solution: string;
  impact: string;
}

export interface SupplyHubRolePermission {
  role: string;
  title: string;
  description: string;
  badgeColor: string;
  permissions: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    aprovar: boolean;
    gerenciar: boolean;
  };
}

export interface SupplyHubStatePreview {
  id: string;
  label: string;
  badge: string;
  color: string;
  scenario: string;
  previewMessage: string;
  previewAction?: string;
}

export interface SupplyHubHypothesis {
  id: string;
  question: string;
  targetUser: string;
  method: string;
  metricCriteria: string;
}

export interface SupplyHubMetric {
  label: string;
  goal: string;
  definition: string;
  category: "eficiencia" | "adocao" | "qualidade";
}

export interface SupplyHubLearning {
  number: string;
  title: string;
  quote: string;
  description: string;
}

// =============================================================================
// SUPPLYHUB CASE DATA
// =============================================================================

export const supplyHubData = {
  hero: {
    badge: "PROJETO CONCEITUAL",
    category: "B2B MARKETPLACE",
    title: "Compras B2B",
    titleAccent: "mais simples,",
    titleEnd: "rápidas e seguras.",
    description:
      "O SupplyHub é uma plataforma de compras B2B que conecta empresas a fornecedores, simplificando cotação, negociação, aprovação e acompanhamento de pedidos em um único lugar.",
    features: [
      {
        icon: "⌕",
        title: "Pesquisa e comparação",
        description: "Catálogo unificado com busca de peças e especificações.",
      },
      {
        icon: "▤",
        title: "Cotações e negociação",
        description: "RFQs multilaterais e contrapropostas em tempo real.",
      },
      {
        icon: "✓",
        title: "Aprovação de compras",
        description: "Alçadas automatizadas por limites de valor e centro de custo.",
      },
      {
        icon: "▣",
        title: "Acompanhamento",
        description: "Rastreio de entregas e conferência de notas fiscais.",
      },
    ],
  },

  desktopMockup: {
    userName: "Marcus",
    userRole: "Comprador Sênior",
    company: "AutoBrasil Distribuição",
    kpis: [
      { label: "Cotações em andamento", value: "12", trend: "↑ 20%", positive: true },
      { label: "Pedidos ativos", value: "8", trend: "↑ 14%", positive: true },
      { label: "Aprovações pendentes", value: "3", trend: "↓ 25%", positive: false },
      { label: "Fornecedores ativos", value: "48", trend: "↑ 12%", positive: true },
    ],
    recentQuotes: [
      {
        id: "RFQ-2024-089",
        product: "Pastilhas de freio cerâmica",
        supplier: "AutoMax Distribuição",
        status: "Em negociação",
        statusColor: "bg-[#e7f7ee] text-[#145c43] border-[#ccebd8]",
        value: "R$ 2.450,00",
        updated: "Há 12 min",
      },
      {
        id: "RFQ-2024-088",
        product: "Óleo sintético 5W30 (Tambor 200L)",
        supplier: "Distribuidora Sul Lubrificantes",
        status: "Aguardando aprovação",
        statusColor: "bg-[#fff8e6] text-[#975a16] border-[#faecc5]",
        value: "R$ 1.320,00",
        updated: "Há 45 min",
      },
      {
        id: "RFQ-2024-087",
        product: "Amortecedor dianteiro pressurizado",
        supplier: "Peças Brasil Indústria",
        status: "Proposta recebida",
        statusColor: "bg-[#e7f7ee] text-[#145c43] border-[#ccebd8]",
        value: "R$ 980,00",
        updated: "Há 2 horas",
      },
      {
        id: "RFQ-2024-086",
        product: "Filtro de óleo blindado (Cx. 50 un)",
        supplier: "AutoParts Pro Logística",
        status: "Em cotação",
        statusColor: "bg-[#f1f4f2] text-[#4a5551] border-[#e0e7e3]",
        value: "R$ 450,00",
        updated: "Ontem às 17h",
      },
    ],
  },

  challenge: {
    sectionKicker: "01 — O desafio",
    title: "Um processo de compra fragmentado e ineficiente.",
    description:
      "Muitas empresas ainda gerenciam suas compras B2B por e-mail, planilhas e múltiplos canais, o que gera perda de tempo, falta de visibilidade e dificuldade na tomada de decisão.",
    problems: [
      {
        id: "manual",
        icon: "□",
        title: "Processos manuais",
        description: "Cotações e negociações descentralizadas.",
        detail:
          "Compradores gastam até 15 horas por semana trocando e-mails com diferentes distribuidores e copiando preços para planilhas que rapidamente ficam desatualizadas.",
      },
      {
        id: "visibility",
        icon: "◫",
        title: "Falta de visibilidade",
        description: "Dificuldade para acompanhar status e prazos.",
        detail:
          "Ninguém sabe ao certo onde uma compra está travada: se o fornecedor ainda não respondeu, se o gestor esqueceu de aprovar ou se o lote já está em transporte.",
      },
      {
        id: "risk",
        icon: "!",
        title: "Risco de decisões ruins",
        description: "Informações dispersas dificultam comparação.",
        detail:
          "Sem equalização de frete (CIF vs FOB), prazos de pagamento e lotes mínimos, a empresa frequentemente escolhe o menor preço aparente pagando mais caro no custo total.",
      },
    ],
    opportunity: {
      kicker: "A oportunidade",
      title: "Centralizar e simplificar toda a jornada de compra.",
      description:
        "Criar uma plataforma que conecte empresas e fornecedores, facilitando pesquisa, comparação, cotação, negociação, aprovação e acompanhamento de pedidos.",
    },
  },

  processJourney: {
    sectionKicker: "02 — O processo",
    title: "Da necessidade à entrega.",
    description:
      "Mapeamento da jornada de compra para identificar pontos de atrito e construir uma experiência fluida do início ao fim.",
    steps: [
      {
        number: "01",
        title: "Pesquisar",
        description: "Encontrar produtos e fornecedores homologados no catálogo.",
        action: "Busca por código OEM, fabricante ou aplicação veicular.",
        uiSnippet: {
          label: "Busca de Peça",
          value: "Pastilha Cerâmica #OEM-4890",
          tag: "8 fornecedores",
        },
      },
      {
        number: "02",
        title: "Comparar",
        description: "Analisar preços, prazos, fretes e condições comerciais.",
        action: "Equalização automática de impostos e custo de entrega.",
        uiSnippet: {
          label: "Menor TCO",
          value: "AutoMax: R$ 42,50/un (CIF)",
          tag: "Melhor Opção",
        },
      },
      {
        number: "03",
        title: "Solicitar cotação",
        description: "Enviar RFQ detalhada com volumes e prazos para parceiros.",
        action: "Disparo simultâneo para fornecedores selecionados.",
        uiSnippet: {
          label: "RFQ Emitida",
          value: "Lote de 100 unidades",
          tag: "Prazo: 24h",
        },
      },
      {
        number: "04",
        title: "Negociar",
        description: "Ajustar valores, condições de faturamento e prazo de entrega.",
        action: "Histórico auditável de propostas e contrapropostas.",
        uiSnippet: {
          label: "Contraproposta",
          value: "Desconto -8% para 60 dias",
          tag: "Aceito",
        },
      },
      {
        number: "05",
        title: "Aprovar",
        description: "Fluxo de aprovação interno conforme alçadas da empresa.",
        action: "Notificação imediata para gestores e diretores responsáveis.",
        uiSnippet: {
          label: "Alçada Gerência",
          value: "Valor R$ 4.250 < R$ 10k",
          tag: "Aprovado ✓",
        },
      },
      {
        number: "06",
        title: "Comprar",
        description: "Emissão oficial da Ordem de Compra (PO) vinculada.",
        action: "Geração de contrato e bloqueio de estoque no fornecedor.",
        uiSnippet: {
          label: "Ordem de Compra",
          value: "PO #89201 Emitida",
          tag: "Confirmado",
        },
      },
      {
        number: "07",
        title: "Acompanhar",
        description: "Monitorar despacho, transporte, recebimento e NF-e.",
        action: "Linha do tempo de rastreio e conferência no almoxarifado.",
        uiSnippet: {
          label: "Rastreio em Trânsito",
          value: "Previsão: Amanhã às 14h",
          tag: "Na Rota",
        },
      },
    ],
  },

  userFlow: {
    title: "Fluxo do Usuário de Ponta a Ponta",
    subtitle:
      "Como o comprador navega por todas as etapas sem perder o contexto de custos e prazos.",
    stages: [
      {
        stage: "01. Necessidade",
        tag: "Início",
        desc: "Identificação da falta de estoque ou requisição interna de compras.",
        miniUi: "Demanda: 120 un",
      },
      {
        stage: "02. Pesquisa",
        tag: "Catálogo",
        desc: "Filtros rápidos por disponibilidade imediata e distribuidores próximos.",
        miniUi: "Filtro: Entrega < 3d",
      },
      {
        stage: "03. Comparação",
        tag: "Matriz",
        desc: "Matriz comparativa de preços, certificações ISO e histórico de entrega.",
        miniUi: "3 Propostas Lado a Lado",
      },
      {
        stage: "04. Cotação",
        tag: "RFQ",
        desc: "Definição do prazo limite para envio de propostas e dados de faturamento.",
        miniUi: "RFQ Multi-fornecedor",
      },
      {
        stage: "05. Negociação",
        tag: "Acordo",
        desc: "Ajuste fino de margens e condições de pagamento em chat estruturado.",
        miniUi: "Desconto por volume",
      },
      {
        stage: "06. Aprovação",
        tag: "Compliance",
        desc: "Validação automática de orçamento e aprovação digital em 1-clique.",
        miniUi: "Alçada liberada",
      },
      {
        stage: "07. Compra",
        tag: "Pedido",
        desc: "Emissão da Ordem de Compra com faturamento e condições acordadas.",
        miniUi: "PO Gerada em PDF",
      },
      {
        stage: "08. Entrega",
        tag: "Conclusão",
        desc: "Acompanhamento da transportadora e conferência física com XML.",
        miniUi: "Recebimento OK",
      },
    ],
  },

  solution: {
    sectionKicker: "03 — Solução",
    title: "Uma experiência construída para reduzir complexidade.",
    description:
      "A interface organiza produtos, fornecedores, cotações, negociações, aprovações e pedidos em uma experiência unificada, permitindo que o comprador tome decisões rápidas com segurança.",
    pillars: [
      {
        title: "Catálogo Inteligente",
        desc: "Busca preditiva por código da peça, aplicação veicular e equivalências técnicas.",
      },
      {
        title: "Matriz de Equalização",
        desc: "Cálculo instantâneo de custo total (TCO), balanceando frete, impostos e prazos.",
      },
      {
        title: "Workflow de Alçadas",
        desc: "Roteamento inteligente de aprovações com regras flexíveis por cargo e valor.",
      },
      {
        title: "Gestão Unificada de Pedidos",
        desc: "Acompanhamento visual do status do pedido com alertas de atraso e histórico completo.",
      },
    ],
  },

  screens: [
    {
      id: "screen-01",
      number: "01",
      name: "Dashboard de Compras",
      category: "Visão Geral",
      description:
        "Painel centralizado com indicadores operacionais, cotações pendentes de ação e atalhos rápidos.",
      keyHighlights: [
        "KPIs de volume financeiro cotado vs aprovado no mês",
        "Tabela de cotações recentes com badges de status semânticos",
        "Acesso rápido à emissão de nova cotação (Ctrl+K)",
      ],
      mockupData: {
        badge: "PAINEL INICIAL",
        title: "Visão Consolidada de Suprimentos",
        subtitle: "Acompanhamento de 12 cotações em andamento e R$ 142k sob gestão",
        details: [
          { label: "Cotações Abertas", value: "12 RFQs" },
          { label: "Pedidos em Rota", value: "8 pedidos" },
          { label: "Aprovações Pendentes", value: "3 pendências" },
        ],
        actionText: "Ver cotações ativas",
      },
    },
    {
      id: "screen-02",
      number: "02",
      name: "Busca de Produtos & Catálogo",
      category: "Descoberta",
      description:
        "Busca avançada com filtros por montadora, código OEM, lote mínimo e prazo de entrega.",
      keyHighlights: [
        "Filtros laterais dinâmicos com contagem em tempo real",
        "Cards de itens com indicação imediata de múltiplos fornecedores disponíveis",
        "Comparativo rápido de disponibilidade em estoque",
      ],
      mockupData: {
        badge: "CATÁLOGO B2B",
        title: "Pesquisa por Código OEM e Aplicação",
        subtitle: "Resultado filtrado para: Linha Pesada / Freios / Pronta Entrega",
        details: [
          { label: "Itens Encontrados", value: "34 produtos" },
          { label: "Fornecedores Homologados", value: "12 distribuidores" },
          { label: "Média de Envio", value: "48 horas" },
        ],
        actionText: "Adicionar à RFQ",
      },
    },
    {
      id: "screen-03",
      number: "03",
      name: "Comparação de Fornecedores",
      category: "Tomada de Decisão",
      description:
        "Matriz comparativa de propostas lado a lado, calculando custo total, frete CIF/FOB e SLA de entrega.",
      keyHighlights: [
        "Cálculo de Custo Total (TCO) destacando a melhor proposta consolidada",
        "Classificação por reputação do fornecedor e índice de pontualidade",
        "Seleção da proposta vencedora com justificativa pré-preenchida",
      ],
      mockupData: {
        badge: "MATRIZ DE EQUALIZAÇÃO",
        title: "Comparação Lado a Lado (3 Propostas)",
        subtitle: "Equalização automática de frete, impostos e prazo de pagamento",
        details: [
          { label: "Melhor Preço", value: "AutoMax: R$ 2.450" },
          { label: "Melhor Prazo", value: "Peças Brasil: 2 dias" },
          { label: "Diferença Máxima", value: "14% entre propostas" },
        ],
        actionText: "Escolher proposta",
      },
    },
    {
      id: "screen-04",
      number: "04",
      name: "Solicitação de Cotação (RFQ)",
      category: "Cotação",
      description:
        "Formulário estruturado em etapas para disparo simultâneo de requisição a múltiplos parceiros.",
      keyHighlights: [
        "Seleção múltipla de fornecedores com 1 clique",
        "Definição de prazo limite para envio das propostas",
        "Anexo de desenhos técnicos e especificações de qualidade",
      ],
      mockupData: {
        badge: "NOVA COTAÇÃO",
        title: "Criação de RFQ Multi-Fornecedor",
        subtitle: "Solicitação de lote de 200 peças para 5 distribuidores selecionados",
        details: [
          { label: "Destinatários", value: "5 fornecedores" },
          { label: "Data Limite", value: "24h restantes" },
          { label: "Anexos", value: "Especificação Técnica .PDF" },
        ],
        actionText: "Disparar cotação",
      },
    },
    {
      id: "screen-05",
      number: "05",
      name: "Negociação & Contraproposta",
      category: "Negociação",
      description:
        "Canal direto e auditável para ajuste de preços por volume, frete e condições de pagamento.",
      keyHighlights: [
        "Simulador interativo de impacto no valor total por escala de lote",
        "Histórico imutável de todas as ofertas e respostas",
        "Aceite formal de novas condições comerciais pelo fornecedor",
      ],
      mockupData: {
        badge: "MESA DE NEGOCIAÇÃO",
        title: "Contraproposta de Condições Comerciais",
        subtitle: "Proposta: Desconto de 8% condicionado a faturamento em 60 dias",
        details: [
          { label: "Valor Original", value: "R$ 4.250,00" },
          { label: "Valor Negociado", value: "R$ 3.910,00 (-8%)" },
          { label: "Status", value: "Aceito pelo fornecedor" },
        ],
        actionText: "Formalizar acordo",
      },
    },
    {
      id: "screen-06",
      number: "06",
      name: "Central de Aprovação",
      category: "Governança",
      description:
        "Fluxo para gestores e diretores avaliarem requisições de compra com dados orçamentários claros.",
      keyHighlights: [
        "Demonstração do orçamento disponível no centro de custo",
        "Justificativa de compra e resumo da matriz de escolha",
        "Aprovação com assinatura digital ou rejeição com motivo",
      ],
      mockupData: {
        badge: "GOVERNANÇA & ALÇADAS",
        title: "Aprovação de Ordem de Compra",
        subtitle: "Requisição #89201 • Alçada Gerência de Operações",
        details: [
          { label: "Solicitante", value: "Marcus Ritta (Comprador)" },
          { label: "Valor da Compra", value: "R$ 18.420,00" },
          { label: "Saldo do Centro de Custo", value: "R$ 84.000,00 (Suficiente)" },
        ],
        actionText: "Aprovar compra",
      },
    },
    {
      id: "screen-07",
      number: "07",
      name: "Gestão de Pedidos (Orders)",
      category: "Operação",
      description:
        "Acompanhamento do ciclo de vida das ordens de compra emitidas, prazos de despacho e faturas.",
      keyHighlights: [
        "Linha do tempo visual do status do pedido (Emitido → Faturado → Despachado → Entregue)",
        "Download da Ordem de Compra oficial e do espelho fiscal",
        "Botão de confirmação de recebimento no almoxarifado",
      ],
      mockupData: {
        badge: "CICLO DO PEDIDO",
        title: "Ordem de Compra #PO-9410",
        subtitle: "Fornecedor: AutoMax Distribuidora • NF-e #104.992",
        details: [
          { label: "Status da Entrega", value: "Em trânsito (Previsão: 14h)" },
          { label: "Transportadora", value: "JadLog Express" },
          { label: "Conferência Física", value: "Pendente no recebimento" },
        ],
        actionText: "Rastrear carga",
      },
    },
    {
      id: "screen-08",
      number: "08",
      name: "Perfil do Fornecedor",
      category: "Parceiros",
      description:
        "Ficha cadastral completa da distribuidora com certificações ISO, histórico de pontualidade e avaliações.",
      keyHighlights: [
        "Score de pontualidade baseado nos últimos 50 pedidos entregues",
        "Certificados de conformidade e certidões negativas fiscais",
        "Catálogo completo de peças homologadas do fornecedor",
      ],
      mockupData: {
        badge: "HOMOLOGAÇÃO",
        title: "Apex Distribuição Industrial",
        subtitle: "Fornecedor Homologado Tier 1 • Desde 2021",
        details: [
          { label: "Índice de Pontualidade", value: "98.4% no prazo" },
          { label: "Certificações", value: "ISO 9001 / ISO 14001" },
          { label: "Volume Histórico", value: "142 pedidos concluídos" },
        ],
        actionText: "Ver catálogo completo",
      },
    },
    {
      id: "screen-09",
      number: "09",
      name: "Experiência Mobile",
      category: "Mobile",
      description:
        "Interface adaptada para compradores em campo e gestores que precisam aprovar pedidos pelo celular.",
      keyHighlights: [
        "Aprovação expressa de ordens com 1 toque no smartphone",
        "Consulta rápida de fornecedores e cotações ativas",
        "Notificações em tempo real sobre propostas recebidas e entregas",
      ],
      mockupData: {
        badge: "MOBILE COMPANION",
        title: "App SupplyHub para Gestão Rápida",
        subtitle: "Aprovações e monitoramento onde o usuário estiver",
        details: [
          { label: "Tempo Médio de Aprovação", value: "4 minutos no mobile" },
          { label: "Compatibilidade", value: "iOS e Android" },
          { label: "Uso Principal", value: "Aprovações e alertas urgentes" },
        ],
        actionText: "Explorar fluxo mobile",
      },
    },
  ],

  businessRules: [
    {
      id: "rule-1",
      ruleNumber: "01",
      title: "Uma cotação pode possuir múltiplos fornecedores simultâneos.",
      description:
        "Para evitar o retrabalho de criar cotações isoladas para cada empresa, a mesma solicitação de compra (RFQ) é disparada em paralelo para distribuidores concorrentes, garantindo sigilo entre eles.",
      solution:
        "Mecanismo de 'Blind RFQ' onde cada fornecedor vê apenas sua própria proposta, enquanto o comprador recebe todas unificadas na mesma tela.",
      impact: "Reduz o tempo de emissão de RFQ em 75%.",
    },
    {
      id: "rule-2",
      ruleNumber: "02",
      title: "Uma compra pode exigir aprovação por alçada de valor.",
      description:
        "Compras corporativas possuem tetos orçamentários rígidos. Gastos menores têm liberação expressa, enquanto valores elevados exigem a chancela de gerentes ou diretores.",
      solution:
        "Roteamento automático por matriz de alçadas (< R$ 5k direto; R$ 5k - R$ 25k gerência; > R$ 25k diretoria/CFO).",
      impact: "Elimina compras irregulares e mantém compliance orçamentário.",
    },
    {
      id: "rule-3",
      ruleNumber: "03",
      title: "O usuário pode equalizar condições comerciais antes de escolher.",
      description:
        "O menor preço de tabela não significa a compra mais vantajosa. Se um fornecedor cobra R$ 100 com frete grátis e outro cobra R$ 90 mais R$ 25 de frete, a primeira opção é mais econômica.",
      solution:
        "Cálculo de Custo Total (TCO) na interface somando valor do produto, impostos retidos e frete CIF/FOB.",
      impact: "Evita decisões erradas baseadas apenas no valor de etiqueta.",
    },
    {
      id: "rule-4",
      ruleNumber: "04",
      title: "Uma negociação pode alterar preço unitário, quantidade e prazo.",
      description:
        "B2B não é e-commerce de preço fixo. As condições dependem do tamanho do lote e do prazo de faturamento acordado entre as partes.",
      solution:
        "Mesa de contraproposta interativa onde o comprador propõe ajustes e o fornecedor aceita ou replica com nova oferta.",
      impact: "Agiliza negociações sem depender de reuniões ou dezenas de e-mails.",
    },
    {
      id: "rule-5",
      ruleNumber: "05",
      title: "Pedidos possuem estados finitos e auditáveis.",
      description:
        "Para garantir segurança fiscal e financeira, um pedido não pode saltar etapas nem ter suas informações alteradas após o faturamento.",
      solution:
        "Máquina de estados estrita: Rascunho → Em Cotação → Propostas Recebidas → Em Aprovação → Pedido Emitido → Faturado → Concluído.",
      impact: "Garante rastreabilidade total para auditoria contábil.",
    },
    {
      id: "rule-6",
      ruleNumber: "06",
      title: "Usuários possuem papéis e permissões distintas.",
      description:
        "Compradores negociam mas não aprovam seu próprio gasto. Aprovadores autorizam mas não alteram o valor da cotação. O financeiro faz a conciliação sem interferir no fornecedor.",
      solution:
        "Modelo de controle de acesso baseado em papéis (RBAC) com visão customizada para cada usuário.",
      impact: "Separação de funções obrigatória em governança corporativa.",
    },
  ],

  rolesPermissions: [
    {
      role: "comprador",
      title: "Comprador",
      description: "Pesquisa itens, cria cotações, negocia com fornecedores e emite ordens de compra.",
      badgeColor: "bg-[#e7f7ee] text-[#145c43]",
      permissions: {
        visualizar: true,
        criar: true,
        editar: true,
        aprovar: false,
        gerenciar: false,
      },
    },
    {
      role: "aprovador",
      title: "Aprovador / Gestor",
      description: "Avalia requisições que excedem a alçada do comprador e libera pedidos para emissão.",
      badgeColor: "bg-[#eaf4ff] text-[#1d4ed8]",
      permissions: {
        visualizar: true,
        criar: false,
        editar: false,
        aprovar: true,
        gerenciar: false,
      },
    },
    {
      role: "financeiro",
      title: "Analista Financeiro",
      description: "Monitora fluxo de caixa comprometido, valida faturamento e concilia notas fiscais.",
      badgeColor: "bg-[#fef3c7] text-[#92400e]",
      permissions: {
        visualizar: true,
        criar: false,
        editar: true,
        aprovar: false,
        gerenciar: false,
      },
    },
    {
      role: "admin",
      title: "Administrador",
      description: "Configura limites de alçadas, homologa novos fornecedores e cadastra usuários.",
      badgeColor: "bg-[#f3f4f6] text-[#1f2937]",
      permissions: {
        visualizar: true,
        criar: true,
        editar: true,
        aprovar: true,
        gerenciar: true,
      },
    },
  ],

  interfaceStates: [
    {
      id: "loading",
      label: "Loading Skeleton",
      badge: "Carregando",
      color: "bg-[#f1f4f2] text-[#4a5551]",
      scenario: "Durante a busca no banco de dados de mais de 50.000 peças de fornecedores.",
      previewMessage: "Carregando melhores propostas de fornecedores...",
    },
    {
      id: "empty",
      label: "Empty State",
      badge: "Sem Cotações",
      color: "bg-[#eef2f0] text-[#374151]",
      scenario: "Quando a empresa acabou de criar sua conta e ainda não disparou nenhuma cotação.",
      previewMessage: "Você ainda não tem cotações ativas. Crie sua primeira RFQ.",
      previewAction: "+ Nova Cotação",
    },
    {
      id: "success",
      label: "Success Feedback",
      badge: "Sucesso",
      color: "bg-[#e7f7ee] text-[#145c43]",
      scenario: "Ao finalizar a compra e emitir a Ordem de Compra oficial com sucesso.",
      previewMessage: "Ordem de Compra #PO-9410 emitida com sucesso! Fornecedor notificado.",
      previewAction: "Baixar PDF da PO",
    },
    {
      id: "pending_approval",
      label: "Pending Approval",
      badge: "Em Aprovação",
      color: "bg-[#fff8e6] text-[#975a16]",
      scenario: "Cotação que ultrapassou a alçada de R$ 5.000 e aguarda liberação do gestor.",
      previewMessage: "Aguardando aprovação do Gestor de Operações (Prazo: 2h restantes).",
    },
    {
      id: "approved",
      label: "Approved State",
      badge: "Aprovado",
      color: "bg-[#e7f7ee] text-[#145c43]",
      scenario: "Aprovador validou a requisição e liberou a compra para o fornecedor.",
      previewMessage: "Compra aprovada por Roberto Silveira (Gerente de Suprimentos).",
    },
    {
      id: "rejected",
      label: "Rejected State",
      badge: "Reprovado",
      color: "bg-[#fee2e2] text-[#991b1b]",
      scenario: "Gestor reprovou a cotação por falta de saldo orçamentário no mês.",
      previewMessage: "Cotação não aprovada: 'Orçamento do centro de custo excedido para este mês'.",
    },
    {
      id: "no_results",
      label: "No Results",
      badge: "Sem Resultados",
      color: "bg-[#f3f4f6] text-[#4b5563]",
      scenario: "Busca de peça por código com digitação incorreta ou sem distribuidor cadastrado.",
      previewMessage: "Nenhuma peça encontrada com este código OEM. Verifique a grafia ou consulte o catálogo geral.",
      previewAction: "Limpar filtros",
    },
    {
      id: "error",
      label: "Error State",
      badge: "Erro no Sistema",
      color: "bg-[#fef2f2] text-[#b91c1c]",
      scenario: "Falha de conexão temporária com a API do fornecedor para consulta de estoque.",
      previewMessage: "Não foi possível carregar o saldo do distribuidor. Tente novamente em alguns segundos.",
      previewAction: "Tentar novamente",
    },
  ],

  validation: {
    sectionKicker: "Como eu validaria a solução",
    tagline: "Validation Plan • Projeto Conceitual de Product Design",
    description:
      "Como este é um projeto conceitual, nenhum dado real de pesquisa ou resultado fictício foi inventado. Em vez disso, elaborei o plano estruturado de como eu conduziria a validação prática deste produto com usuários reais do mercado.",
    hypotheses: [
      {
        id: "h-1",
        question: "A comparação de fornecedores é compreensível no primeiro olhar?",
        targetUser: "Comprador Técnico",
        method: "Teste de Usabilidade Moderado",
        metricCriteria: "Identificação da opção mais vantajosa em menos de 45 segundos.",
      },
      {
        id: "h-2",
        question: "O usuário entende quando e por que uma aprovação é necessária?",
        targetUser: "Comprador e Gestor",
        method: "Entrevistas de Cenário Baseado em Tarefas",
        metricCriteria: "Zero dúvidas relatadas sobre motivo do bloqueio da compra.",
      },
      {
        id: "h-3",
        question: "A mecânica de contraproposta é ágil e transparente?",
        targetUser: "Comprador e Distribuidor Parceiro",
        method: "Teste de Fluxo de Negociação",
        metricCriteria: "Mais de 80% de conclusão do fluxo de ajuste de preço sem atrito.",
      },
      {
        id: "h-4",
        question: "O acompanhamento do status do pedido reduz a ansiedade de entrega?",
        targetUser: "Analista de Almoxarifado",
        method: "Acompanhamento Contextual de Rotina",
        metricCriteria: "Redução estimada de 60% em telefonemas de cobrança de entrega.",
      },
    ],
    methods: [
      {
        title: "Testes Práticos de Usabilidade",
        desc: "Sessões moderadas com 6 a 8 compradores corporativos realizando tarefas críticas de criação de cotação e escolha de propostas.",
      },
      {
        title: "Entrevistas em Profundidade",
        desc: "Conversas com gerentes de suprimentos para validar se as regras de alçada e TCO refletem as políticas reais das empresas.",
      },
      {
        title: "Análise de Métricas de Comportamento",
        desc: "Monitoramento de funis de conversão, mapas de calor e pontos de desistência durante cada fase do fluxo de compras.",
      },
    ],
  },

  metrics: {
    sectionKicker: "Como o sucesso seria medido",
    tagline: "Framework de Métricas de Sucesso do Produto",
    description:
      "Em um cenário de implementação real, estes seriam os indicadores-chave que eu acompanharia para avaliar o impacto do SupplyHub na rotina das empresas:",
    indicators: [
      {
        label: "Tempo Médio para Criar uma Cotação",
        goal: "Redução de 45 min para < 8 min",
        definition: "Mede a facilidade e rapidez do comprador ao buscar itens e emitir uma RFQ.",
        category: "eficiencia",
      },
      {
        label: "Taxa de Conclusão de RFQ",
        goal: "> 85% das cotações iniciadas",
        definition: "Percentual de cotações que chegam até o envio final sem abandono no formulário.",
        category: "adocao",
      },
      {
        label: "Tempo até Aprovação Interna",
        goal: "Redução de 48h para < 4h",
        definition: "Velocidade com que gestores liberam pedidos graças às notificações e acesso mobile.",
        category: "eficiencia",
      },
      {
        label: "Taxa de Conversão de Cotação em Pedido",
        goal: "> 60% de pedidos emitidos",
        definition: "Mede se as propostas recebidas atendem às expectativas comerciais dos compradores.",
        category: "qualidade",
      },
      {
        label: "Tempo Total do Ciclo de Compra (P2P)",
        goal: "Redução de 7 dias para 2 dias",
        definition: "Tempo transcorrido desde a identificação da necessidade até a confirmação da compra.",
        category: "eficiencia",
      },
      {
        label: "Taxa de Rejeição de Propostas por Erro",
        goal: "< 2% de pedidos corrigidos",
        definition: "Garante que dados fiscais, fretes e quantidades foram preenchidos corretamente.",
        category: "qualidade",
      },
    ],
  },

  learnings: [
    {
      number: "01",
      title: "Contexto é essencial.",
      quote:
        "Em produtos B2B, boa experiência não significa esconder a complexidade. Significa organizar essa complexidade de maneira que o usuário consiga tomar decisões com confiança.",
      description:
        "Ao projetar a matriz de equalização, percebi que compradores não querem uma tela vazia e minimalista; eles precisam ver preços, fretes e prazos de entrega no mesmo campo visual para decidir com segurança.",
    },
    {
      number: "02",
      title: "Regras de negócio fazem parte da UX.",
      quote:
        "Telas não existem no vácuo; elas refletem diretamente políticas fiscais, limites de gastos e regras corporativas.",
      description:
        "Projetar fluxos de compra sem compreender limites de alçada, tributação de frete (CIF vs FOB) e auditoria gera produtos bonitos que falham na vida real. Em Product Design para B2B, a regra de negócio é o núcleo da experiência.",
    },
    {
      number: "03",
      title: "Estados e exceções precisam ser desenhados desde o primeiro dia.",
      quote:
        "O caminho feliz é apenas uma pequena fração da rotina de um software de trabalho.",
      description:
        "O que acontece quando o fornecedor não responde no prazo? Ou quando a peça esgota no meio da negociação? Projetar telas de aviso, timeouts e fluxos de contingência desde os primeiros wireframes garante robustez ao produto.",
    },
  ],

  nextProject: {
    title: "ALFA ERP — Automotive Redesign",
    subtitle: "Modernização de um ERP corporativo para o setor de autopeças.",
    slug: "alfa-erp-automotive-redesign",
    buttonText: "Explorar Case ALFA ERP →",
  },
};
