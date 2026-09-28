// ============================================================================
// ALFA FLOW CRM — Data & Type Definitions
// Ecossistema ALFA ERP AutoPeças — Módulo Comercial B2B
// ============================================================================

export type CrmStageId =
  | "novo_lead"
  | "qualificacao"
  | "contato"
  | "oportunidade"
  | "proposta"
  | "negociacao"
  | "ganho"
  | "perdido";

export type AutomotiveSegment =
  | "Varejo de Autopeças"
  | "Distribuidora Atacadista"
  | "Rede de Auto Center"
  | "Motopeças & Acessórios"
  | "Linha Pesada & Diesel"
  | "Auto Elétrica & Baterias";

export type LeadSource =
  | "Google Ads"
  | "WhatsApp Balcão"
  | "Indicação de Loja"
  | "Evento / Automec"
  | "Outbound / Balconista"
  | "Site Orgânico"
  | "Representante Comercial";

export type AlfaErpModule =
  | "ERP AutoPeças (Core)"
  | "Balcão PDV Rápido"
  | "Estoque & Curva ABC"
  | "Compras Inteligentes"
  | "Financeiro Avançado"
  | "B2B E-commerce de Peças"
  | "BI & Métricas Gerenciais"
  | "Fiscal & SPED Automotivo"
  | "CRM Flow Integrado";

export interface CrmLead {
  id: string;
  name: string;
  role: string;
  company: string;
  cnpj: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;
  segment: AutomotiveSegment;
  storesCount: number;
  source: LeadSource;
  campaign?: string;
  owner: string;
  ownerAvatar: string;
  status: "Novo" | "Qualificação" | "Contato Realizado" | "Oportunidade" | "Cliente" | "Perdido";
  interestModules: AlfaErpModule[];
  dealValue: number;
  lastContact: string;
  nextAction: string;
  nextActionDate: string;
  priority: "Alta" | "Média" | "Baixa";
  notes: string;
  createdAt: string;
}

export interface CrmDeal {
  id: string;
  title: string;
  company: string;
  contactName: string;
  contactRole: string;
  contactPhone: string;
  contactEmail: string;
  segment: AutomotiveSegment;
  storesCount: number;
  city: string;
  state: string;
  value: number;
  probability: number; // e.g. 60
  weightedValue: number; // calculated: value * (probability / 100)
  stageId: CrmStageId;
  owner: string;
  ownerAvatar: string;
  source: LeadSource;
  campaign?: string;
  daysInStage: number;
  lastActivity: string;
  nextAction: string;
  nextActionDate: string;
  health: "on-track" | "attention" | "urgent";
  interestModules: AlfaErpModule[];
  lossReason?: string;
  lossObservation?: string;
  closedAt?: string;
}

export interface CrmTask {
  id: string;
  title: string;
  company: string;
  contact: string;
  dueTime: string;
  dueDate: string;
  priority: "Alta" | "Média" | "Baixa";
  owner: string;
  completed: boolean;
  type: "Ligar" | "WhatsApp" | "Proposta" | "Reunião" | "Follow-up" | "Visita";
}

export interface CrmActivity {
  id: string;
  type: "whatsapp" | "call" | "email" | "meeting" | "stage_change" | "proposal" | "task" | "note";
  title: string;
  description: string;
  company: string;
  contact?: string;
  author: string;
  timestamp: string;
  timeAgo: string;
  badge?: string;
}

export interface CrmCompany {
  id: string;
  name: string;
  cnpj: string;
  city: string;
  state: string;
  segment: AutomotiveSegment;
  storesCount: number;
  owner: string;
  status: "Prospect" | "Em Negociação" | "Cliente Ativo" | "Inativo";
  mainContact: string;
  contactPhone: string;
  contactEmail: string;
  totalDealsValue: number;
  activeModules: AlfaErpModule[];
}

export interface CrmProposal {
  id: string;
  proposalNumber: string;
  company: string;
  contact: string;
  setupValue: number;
  monthlyValue: number;
  storesCovered: number;
  modules: AlfaErpModule[];
  status: "Rascunho" | "Enviada" | "Em Revisão" | "Aprovada" | "Recusada";
  sentDate: string;
  validUntil: string;
  owner: string;
}

export interface CrmAutomationRule {
  id: string;
  title: string;
  trigger: string;
  conditions: string;
  actions: string[];
  active: boolean;
  category: "lead_routing" | "followup_sla" | "pipeline_advance" | "erp_sync";
}

// ============================================================================
// INITIAL MOCK DATASETS (Realistic Auto-Parts Context)
// ============================================================================

export const INITIAL_LEADS: CrmLead[] = [
  {
    id: "lead-01",
    name: "Carlos Silva",
    role: "Gerente de Compras & Sócio",
    company: "Auto Peças Silva",
    cnpj: "18.492.301/0001-44",
    phone: "(11) 3922-8400",
    whatsapp: "(11) 98412-3344",
    email: "carlos@autopecassilva.com.br",
    city: "São Paulo",
    state: "SP",
    segment: "Varejo de Autopeças",
    storesCount: 3,
    source: "Google Ads",
    campaign: "ERP AutoPeças — Balcão Rápido",
    owner: "João Silva",
    ownerAvatar: "JS",
    status: "Oportunidade",
    interestModules: ["ERP AutoPeças (Core)", "Balcão PDV Rápido", "Estoque & Curva ABC"],
    dealValue: 18500,
    lastContact: "Hoje, 10:32",
    nextAction: "Ligar para confirmar módulos de curva ABC",
    nextActionDate: "Hoje, 14:30",
    priority: "Alta",
    notes: "Possuem 3 lojas na Zona Leste de SP. Sofrem com furos de estoque em pastilhas e amortecedores.",
    createdAt: "2024-03-20",
  },
  {
    id: "lead-02",
    name: "Marcelo Souza",
    role: "Sócio-Diretor Comercial",
    company: "Distribuidora Motor Sul",
    cnpj: "04.819.221/0001-89",
    phone: "(41) 3341-9000",
    whatsapp: "(41) 99123-5566",
    email: "marcelo@motorsulpecas.com.br",
    city: "Curitiba",
    state: "PR",
    segment: "Distribuidora Atacadista",
    storesCount: 2,
    source: "WhatsApp Balcão",
    campaign: "WhatsApp — Catálogo & B2B",
    owner: "Ana Souza",
    ownerAvatar: "AS",
    status: "Qualificação",
    interestModules: ["ERP AutoPeças (Core)", "B2B E-commerce de Peças", "Compras Inteligentes"],
    dealValue: 28000,
    lastContact: "Hoje, 09:10",
    nextAction: "Enviar proposta comercial com catálogo B2B",
    nextActionDate: "Hoje, 16:00",
    priority: "Alta",
    notes: "Distribuidor atacadista de componentes de motor. Querem catálogo online integrado para oficinas parceiras.",
    createdAt: "2024-03-21",
  },
  {
    id: "lead-03",
    name: "Ricardo Costa",
    role: "Diretor Geral de Operações",
    company: "Auto Center Brasil",
    cnpj: "23.948.110/0001-32",
    phone: "(19) 3810-7700",
    whatsapp: "(19) 98765-4321",
    email: "ricardo.costa@autocenterbrasil.com",
    city: "Campinas",
    state: "SP",
    segment: "Rede de Auto Center",
    storesCount: 6,
    source: "Indicação de Loja",
    campaign: "Indicação Direta — Rede Toledo",
    owner: "João Silva",
    ownerAvatar: "JS",
    status: "Oportunidade",
    interestModules: ["ERP AutoPeças (Core)", "Financeiro Avançado", "Balcão PDV Rápido", "Fiscal & SPED Automotivo"],
    dealValue: 24000,
    lastContact: "Ontem, 16:42",
    nextAction: "Apresentar demonstração do PDV integrado à ordem de serviço",
    nextActionDate: "Hoje, 15:00",
    priority: "Alta",
    notes: "Rede com 6 oficinas e lojas integradas. Precisam de fechamento de caixa unificado e controle de comissão de mecânicos.",
    createdAt: "2024-03-18",
  },
  {
    id: "lead-04",
    name: "Fernando Alves",
    role: "Gerente Geral de Compras",
    company: "Grupo Paulista de Motopeças",
    cnpj: "31.092.483/0001-50",
    phone: "(16) 3612-4040",
    whatsapp: "(16) 99811-2233",
    email: "fernando@paulistamotopecas.com.br",
    city: "Ribeirão Preto",
    state: "SP",
    segment: "Motopeças & Acessórios",
    storesCount: 4,
    source: "Google Ads",
    campaign: "Google Ads — Motopeças & Gestão",
    owner: "Carlos Ferreira",
    ownerAvatar: "CF",
    status: "Oportunidade",
    interestModules: ["ERP AutoPeças (Core)", "Estoque & Curva ABC", "B2B E-commerce de Peças"],
    dealValue: 32000,
    lastContact: "Ontem, 11:20",
    nextAction: "Validar integração de curva ABC com fornecedores de motopeças",
    nextActionDate: "Amanhã, 10:00",
    priority: "Alta",
    notes: "4 lojas na região de Ribeirão Preto. Foco em reposição rápida de kits de transmissão e pneus.",
    createdAt: "2024-03-17",
  },
  {
    id: "lead-05",
    name: "Eduardo Lima",
    role: "Gerente Comercial",
    company: "Auto Peças Gaúcha",
    cnpj: "09.112.544/0001-19",
    phone: "(51) 3224-8899",
    whatsapp: "(51) 98112-9900",
    email: "eduardo@autopecasgaucha.com.br",
    city: "Porto Alegre",
    state: "RS",
    segment: "Varejo de Autopeças",
    storesCount: 2,
    source: "Google Ads",
    campaign: "Google Ads — Varejo Automotivo",
    owner: "Mariana Lima",
    ownerAvatar: "ML",
    status: "Oportunidade",
    interestModules: ["ERP AutoPeças (Core)", "Financeiro Avançado", "Balcão PDV Rápido"],
    dealValue: 21500,
    lastContact: "Há 2 dias",
    nextAction: "Enviar simulação de parcelamento de implantação",
    nextActionDate: "Amanhã, 14:00",
    priority: "Média",
    notes: "Estão migrando de software legado local que trava na emissão de NFC-e.",
    createdAt: "2024-03-15",
  },
  {
    id: "lead-06",
    name: "Paulo Mendes",
    role: "Sócio-Proprietário",
    company: "Rede Auto Sul",
    cnpj: "15.772.339/0001-92",
    phone: "(47) 3433-2211",
    whatsapp: "(47) 99778-1122",
    email: "paulo@redeautosul.com.br",
    city: "Joinville",
    state: "SC",
    segment: "Varejo de Autopeças",
    storesCount: 5,
    source: "Evento / Automec",
    campaign: "Feira Automec 2024",
    owner: "João Silva",
    ownerAvatar: "JS",
    status: "Oportunidade",
    interestModules: ["ERP AutoPeças (Core)", "BI & Métricas Gerenciais", "Estoque & Curva ABC", "Compras Inteligentes"],
    dealValue: 16800,
    lastContact: "Há 3 dias",
    nextAction: "Fazer follow-up da proposta de 5 lojas",
    nextActionDate: "Hoje, 16:30",
    priority: "Alta",
    notes: "Conheceram nosso estande na Automec. Querem centralizar compras entre as 5 lojas de SC.",
    createdAt: "2024-03-12",
  },
  {
    id: "lead-07",
    name: "André Martins",
    role: "Supervisor de Suprimentos",
    company: "Master Auto Peças",
    cnpj: "21.665.412/0001-76",
    phone: "(31) 3290-6000",
    whatsapp: "(31) 98445-6677",
    email: "andre@masterautopecas.com.br",
    city: "Belo Horizonte",
    state: "MG",
    segment: "Linha Pesada & Diesel",
    storesCount: 2,
    source: "Indicação de Loja",
    campaign: "Indicação de Clientes MG",
    owner: "Carlos Ferreira",
    ownerAvatar: "CF",
    status: "Oportunidade",
    interestModules: ["ERP AutoPeças (Core)", "Fiscal & SPED Automotivo", "Balcão PDV Rápido"],
    dealValue: 12500,
    lastContact: "Há 4 dias",
    nextAction: "Confirmar reunião técnica com time fiscal",
    nextActionDate: "Amanhã, 11:30",
    priority: "Média",
    notes: "Especialistas em suspensão e freios para caminhões. Precisam de agilidade na consulta de códigos OEM e paralelos.",
    createdAt: "2024-03-10",
  },
  {
    id: "lead-08",
    name: "Juliana Rocha",
    role: "Gerente Administrativa",
    company: "Catarina Autopeças & Acessórios",
    cnpj: "19.332.901/0001-11",
    phone: "(48) 3244-1000",
    whatsapp: "(48) 99182-3344",
    email: "juliana@catarinaautopecas.com.br",
    city: "Florianópolis",
    state: "SC",
    segment: "Varejo de Autopeças",
    storesCount: 3,
    source: "WhatsApp Balcão",
    campaign: "WhatsApp Ativo",
    owner: "Ana Souza",
    ownerAvatar: "AS",
    status: "Contato Realizado",
    interestModules: ["ERP AutoPeças (Core)", "Balcão PDV Rápido"],
    dealValue: 19800,
    lastContact: "Hoje, 11:45",
    nextAction: "Agendar demonstração do sistema para sócios",
    nextActionDate: "Quinta-feira, 09:30",
    priority: "Média",
    notes: "Buscam sistema rápido para o balcão que não trave em horários de pico.",
    createdAt: "2024-03-22",
  },
  {
    id: "lead-09",
    name: "Roberto Guimarães",
    role: "Diretor Comercial",
    company: "Real Peças Linha Pesada",
    cnpj: "28.114.773/0001-08",
    phone: "(62) 3512-8800",
    whatsapp: "(62) 98122-4455",
    email: "roberto@realpecaspesada.com.br",
    city: "Goiânia",
    state: "GO",
    segment: "Linha Pesada & Diesel",
    storesCount: 2,
    source: "Outbound / Balconista",
    campaign: "Prospecção Linha Diesel Centro-Oeste",
    owner: "Mariana Lima",
    ownerAvatar: "ML",
    status: "Novo",
    interestModules: ["ERP AutoPeças (Core)", "Compras Inteligentes", "Estoque & Curva ABC", "B2B E-commerce de Peças"],
    dealValue: 35000,
    lastContact: "Ontem, 14:00",
    nextAction: "Fazer qualificação com o sócio-proprietário",
    nextActionDate: "Hoje, 17:00",
    priority: "Alta",
    notes: "Grande distribuidor de peças para transportadoras e frotistas em GO.",
    createdAt: "2024-03-23",
  },
  {
    id: "lead-10",
    name: "Marcos Valério",
    role: "Proprietário",
    company: "Nacional Auto Elétrica & Baterias",
    cnpj: "07.443.219/0001-65",
    phone: "(43) 3321-9988",
    whatsapp: "(43) 99611-8899",
    email: "marcos@nacionalautoeletrica.com.br",
    city: "Londrina",
    state: "PR",
    segment: "Auto Elétrica & Baterias",
    storesCount: 2,
    source: "Indicação de Loja",
    campaign: "Parceria Moura / Heliar",
    owner: "João Silva",
    ownerAvatar: "JS",
    status: "Contato Realizado",
    interestModules: ["ERP AutoPeças (Core)", "Balcão PDV Rápido", "Financeiro Avançado"],
    dealValue: 14200,
    lastContact: "Hoje, 08:30",
    nextAction: "Enviar proposta de 2 terminais PDV",
    nextActionDate: "Amanhã, 16:00",
    priority: "Baixa",
    notes: "Foco em baterias e componentes elétricos. Querem controle de garantia por número de série.",
    createdAt: "2024-03-24",
  },
];

export const INITIAL_DEALS: CrmDeal[] = [
  {
    id: "deal-01",
    title: "Implantação ERP AutoPeças — 3 Lojas",
    company: "Auto Peças Silva",
    contactName: "Carlos Silva",
    contactRole: "Gerente de Compras",
    contactPhone: "(11) 98412-3344",
    contactEmail: "carlos@autopecassilva.com.br",
    segment: "Varejo de Autopeças",
    storesCount: 3,
    city: "São Paulo",
    state: "SP",
    value: 18500,
    probability: 60,
    weightedValue: 11100,
    stageId: "novo_lead",
    owner: "João Silva",
    ownerAvatar: "JS",
    source: "Google Ads",
    campaign: "ERP AutoPeças — Balcão Rápido",
    daysInStage: 1,
    lastActivity: "Hoje, 10:32",
    nextAction: "Ligar para alinhar módulos de curva ABC",
    nextActionDate: "Hoje, 14:30",
    health: "on-track",
    interestModules: ["ERP AutoPeças (Core)", "Balcão PDV Rápido", "Estoque & Curva ABC"],
  },
  {
    id: "deal-02",
    title: "Expansão Catálogo B2B + Compras",
    company: "Distribuidora Motor Sul",
    contactName: "Marcelo Souza",
    contactRole: "Sócio-Diretor",
    contactPhone: "(41) 99123-5566",
    contactEmail: "marcelo@motorsulpecas.com.br",
    segment: "Distribuidora Atacadista",
    storesCount: 2,
    city: "Curitiba",
    state: "PR",
    value: 9800,
    probability: 40,
    weightedValue: 3920,
    stageId: "novo_lead",
    owner: "Ana Souza",
    ownerAvatar: "AS",
    source: "WhatsApp Balcão",
    campaign: "WhatsApp — Catálogo & B2B",
    daysInStage: 2,
    lastActivity: "Hoje, 09:10",
    nextAction: "Enviar proposta de portal B2B",
    nextActionDate: "Hoje, 16:00",
    health: "on-track",
    interestModules: ["ERP AutoPeças (Core)", "B2B E-commerce de Peças"],
  },
  {
    id: "deal-03",
    title: "ALFA ERP Completo — Rede 6 Lojas",
    company: "Auto Center Brasil",
    contactName: "Ricardo Costa",
    contactRole: "Diretor de Operações",
    contactPhone: "(19) 98765-4321",
    contactEmail: "ricardo.costa@autocenterbrasil.com",
    segment: "Rede de Auto Center",
    storesCount: 6,
    city: "Campinas",
    state: "SP",
    value: 24000,
    probability: 50,
    weightedValue: 12000,
    stageId: "qualificacao",
    owner: "João Silva",
    ownerAvatar: "JS",
    source: "Indicação de Loja",
    campaign: "Indicação Direta",
    daysInStage: 3,
    lastActivity: "Ontem, 16:42",
    nextAction: "Demonstração do Balcão PDV integrado a OS",
    nextActionDate: "Hoje, 15:00",
    health: "on-track",
    interestModules: ["ERP AutoPeças (Core)", "Balcão PDV Rápido", "Financeiro Avançado", "Fiscal & SPED Automotivo"],
  },
  {
    id: "deal-04",
    title: "Implantação 4 Filiais Motopeças",
    company: "Grupo Paulista de Motopeças",
    contactName: "Fernando Alves",
    contactRole: "Gerente Geral",
    contactPhone: "(16) 99811-2233",
    contactEmail: "fernando@paulistamotopecas.com.br",
    segment: "Motopeças & Acessórios",
    storesCount: 4,
    city: "Ribeirão Preto",
    state: "SP",
    value: 32000,
    probability: 70,
    weightedValue: 22400,
    stageId: "oportunidade",
    owner: "Carlos Ferreira",
    ownerAvatar: "CF",
    source: "Google Ads",
    campaign: "Google Ads — Motopeças",
    daysInStage: 5,
    lastActivity: "Ontem, 11:20",
    nextAction: "Validar integração de curva ABC com fornecedores",
    nextActionDate: "Amanhã, 10:00",
    health: "on-track",
    interestModules: ["ERP AutoPeças (Core)", "Estoque & Curva ABC", "B2B E-commerce de Peças"],
  },
  {
    id: "deal-05",
    title: "Migração Sistema Legado 2 Lojas",
    company: "Auto Peças Gaúcha",
    contactName: "Eduardo Lima",
    contactRole: "Gerente Comercial",
    contactPhone: "(51) 98112-9900",
    contactEmail: "eduardo@autopecasgaucha.com.br",
    segment: "Varejo de Autopeças",
    storesCount: 2,
    city: "Porto Alegre",
    state: "RS",
    value: 21500,
    probability: 75,
    weightedValue: 16125,
    stageId: "proposta",
    owner: "Mariana Lima",
    ownerAvatar: "ML",
    source: "Google Ads",
    campaign: "Google Ads — Varejo",
    daysInStage: 7,
    lastActivity: "Há 2 dias",
    nextAction: "Enviar proposta formal revisada",
    nextActionDate: "Amanhã, 14:00",
    health: "attention",
    interestModules: ["ERP AutoPeças (Core)", "Financeiro Avançado", "Balcão PDV Rápido"],
  },
  {
    id: "deal-06",
    title: "Centralização de Estoque 5 Lojas",
    company: "Rede Auto Sul",
    contactName: "Paulo Mendes",
    contactRole: "Sócio-Proprietário",
    contactPhone: "(47) 99778-1122",
    contactEmail: "paulo@redeautosul.com.br",
    segment: "Varejo de Autopeças",
    storesCount: 5,
    city: "Joinville",
    state: "SC",
    value: 16800,
    probability: 80,
    weightedValue: 13440,
    stageId: "negociacao",
    owner: "João Silva",
    ownerAvatar: "JS",
    source: "Evento / Automec",
    campaign: "Feira Automec",
    daysInStage: 9,
    lastActivity: "Há 3 dias",
    nextAction: "Reunião de alinhamento com financeiro",
    nextActionDate: "Hoje, 16:30",
    health: "urgent",
    interestModules: ["ERP AutoPeças (Core)", "BI & Métricas Gerenciais", "Estoque & Curva ABC", "Compras Inteligentes"],
  },
  {
    id: "deal-07",
    title: "Gestão Fiscal & Linha Pesada",
    company: "Master Auto Peças",
    contactName: "André Martins",
    contactRole: "Supervisor de Compras",
    contactPhone: "(31) 98445-6677",
    contactEmail: "andre@masterautopecas.com.br",
    segment: "Linha Pesada & Diesel",
    storesCount: 2,
    city: "Belo Horizonte",
    state: "MG",
    value: 12500,
    probability: 85,
    weightedValue: 10625,
    stageId: "negociacao",
    owner: "Carlos Ferreira",
    ownerAvatar: "CF",
    source: "Indicação de Loja",
    campaign: "Indicação Clientes",
    daysInStage: 11,
    lastActivity: "Há 4 dias",
    nextAction: "Confirmar minuta contratual",
    nextActionDate: "Amanhã, 11:30",
    health: "attention",
    interestModules: ["ERP AutoPeças (Core)", "Fiscal & SPED Automotivo", "Balcão PDV Rápido"],
  },
  {
    id: "deal-08",
    title: "Implantação Completa Matriz + 2 Filiais",
    company: "Distribuidora Real Autopeças",
    contactName: "Gustavo Borges",
    contactRole: "Diretor Comercial",
    contactPhone: "(11) 99876-1234",
    contactEmail: "gustavo@realautopecas.com.br",
    segment: "Distribuidora Atacadista",
    storesCount: 3,
    city: "Guarulhos",
    state: "SP",
    value: 72000,
    probability: 100,
    weightedValue: 72000,
    stageId: "ganho",
    owner: "João Silva",
    ownerAvatar: "JS",
    source: "Google Ads",
    campaign: "Campanha Distribuidoras",
    daysInStage: 16,
    lastActivity: "Hoje, 11:00",
    nextAction: "Início do onboarding técnico ALFA ERP",
    nextActionDate: "Concluído",
    health: "on-track",
    interestModules: ["ERP AutoPeças (Core)", "Estoque & Curva ABC", "B2B E-commerce de Peças", "Fiscal & SPED Automotivo"],
    closedAt: "2024-03-24",
  },
];

export const INITIAL_TASKS: CrmTask[] = [
  {
    id: "task-01",
    title: "Ligar para Carlos Silva — Confirmar módulos Curva ABC e Balcão",
    company: "Auto Peças Silva",
    contact: "Carlos Silva (Gerente de Compras)",
    dueTime: "Hoje, 14:30",
    dueDate: "2024-03-27",
    priority: "Alta",
    owner: "João Silva",
    completed: false,
    type: "Ligar",
  },
  {
    id: "task-02",
    title: "Enviar proposta comercial com catálogo B2B integrado",
    company: "Auto Center Brasil",
    contact: "Ricardo Costa (Diretor)",
    dueTime: "Hoje, 15:00",
    dueDate: "2024-03-27",
    priority: "Alta",
    owner: "João Silva",
    completed: false,
    type: "Proposta",
  },
  {
    id: "task-03",
    title: "Fazer follow-up com Paulo Mendes sobre migração de base de peças",
    company: "Rede Auto Sul",
    contact: "Paulo Mendes (Sócio-Proprietário)",
    dueTime: "Hoje, 16:30",
    dueDate: "2024-03-27",
    priority: "Alta",
    owner: "João Silva",
    completed: false,
    type: "Follow-up",
  },
  {
    id: "task-04",
    title: "Confirmar reunião técnica com time fiscal e contábil",
    company: "Master Auto Peças",
    contact: "André Martins (Supervisor)",
    dueTime: "Amanhã, 11:30",
    dueDate: "2024-03-28",
    priority: "Média",
    owner: "Carlos Ferreira",
    completed: false,
    type: "Reunião",
  },
  {
    id: "task-05",
    title: "Demonstração do PDV integrado à ordem de serviço mecânica",
    company: "Auto Center Brasil",
    contact: "Ricardo Costa",
    dueTime: "Amanhã, 15:30",
    dueDate: "2024-03-28",
    priority: "Média",
    owner: "João Silva",
    completed: false,
    type: "Reunião",
  },
  {
    id: "task-06",
    title: "Enviar comparação técnica ALFA ERP vs Software Legado",
    company: "Auto Peças Gaúcha",
    contact: "Eduardo Lima",
    dueTime: "Sexta-feira, 10:00",
    dueDate: "2024-03-29",
    priority: "Baixa",
    owner: "Mariana Lima",
    completed: true,
    type: "WhatsApp",
  },
];

export const INITIAL_ACTIVITIES: CrmActivity[] = [
  {
    id: "act-01",
    type: "stage_change",
    title: "Oportunidade avançada de estágio",
    description: "João Silva moveu Auto Peças Silva para Oportunidade após validação do número de lojas.",
    company: "Auto Peças Silva",
    contact: "Carlos Silva",
    author: "João Silva",
    timestamp: "10:32",
    timeAgo: "há 8 minutos",
    badge: "Oportunidade",
  },
  {
    id: "act-02",
    type: "whatsapp",
    title: "WhatsApp comercial enviado",
    description: "Ana Souza enviou apresentação do catálogo B2B de motopeças e tabela de implantação.",
    company: "Distribuidora Motor Sul",
    contact: "Marcelo Souza",
    author: "Ana Souza",
    timestamp: "10:09",
    timeAgo: "há 23 minutos",
    badge: "WhatsApp",
  },
  {
    id: "act-03",
    type: "proposal",
    title: "Nova proposta comercial gerada",
    description: "Proposta #PROP-2024-089 criada no valor de R$ 32.000 para o Grupo Paulista de Motopeças (4 lojas).",
    company: "Grupo Paulista de Motopeças",
    contact: "Fernando Alves",
    author: "Carlos Ferreira",
    timestamp: "09:51",
    timeAgo: "há 41 minutos",
    badge: "R$ 32.000",
  },
  {
    id: "act-04",
    type: "call",
    title: "Ligação comercial registrada",
    description: "Cliente informou alto interesse no módulo de compras com reposição automática e sugestão de estoque.",
    company: "Auto Center Brasil",
    contact: "Ricardo Costa",
    author: "João Silva",
    timestamp: "09:15",
    timeAgo: "há 1h 17min",
    badge: "Sucesso",
  },
  {
    id: "act-05",
    type: "meeting",
    title: "Reunião de demonstração concluída",
    description: "Apresentado o módulo Balcão PDV Rápido com simulação de busca de pastilha por placa do veículo.",
    company: "Rede Auto Sul",
    contact: "Paulo Mendes",
    author: "João Silva",
    timestamp: "Ontem, 16:42",
    timeAgo: "Ontem",
    badge: "Demo ERP",
  },
];

export const INITIAL_COMPANIES: CrmCompany[] = [
  {
    id: "comp-01",
    name: "Auto Peças Silva Ltda.",
    cnpj: "18.492.301/0001-44",
    city: "São Paulo",
    state: "SP",
    segment: "Varejo de Autopeças",
    storesCount: 3,
    owner: "João Silva",
    status: "Em Negociação",
    mainContact: "Carlos Silva",
    contactPhone: "(11) 98412-3344",
    contactEmail: "carlos@autopecassilva.com.br",
    totalDealsValue: 18500,
    activeModules: ["ERP AutoPeças (Core)", "Balcão PDV Rápido"],
  },
  {
    id: "comp-02",
    name: "Motor Sul Distribuidora de Peças S.A.",
    cnpj: "04.819.221/0001-89",
    city: "Curitiba",
    state: "PR",
    segment: "Distribuidora Atacadista",
    storesCount: 2,
    owner: "Ana Souza",
    status: "Em Negociação",
    mainContact: "Marcelo Souza",
    contactPhone: "(41) 99123-5566",
    contactEmail: "marcelo@motorsulpecas.com.br",
    totalDealsValue: 28000,
    activeModules: ["ERP AutoPeças (Core)", "B2B E-commerce de Peças"],
  },
  {
    id: "comp-03",
    name: "Rede Auto Center Brasil Eireli",
    cnpj: "23.948.110/0001-32",
    city: "Campinas",
    state: "SP",
    segment: "Rede de Auto Center",
    storesCount: 6,
    owner: "João Silva",
    status: "Em Negociação",
    mainContact: "Ricardo Costa",
    contactPhone: "(19) 98765-4321",
    contactEmail: "ricardo.costa@autocenterbrasil.com",
    totalDealsValue: 24000,
    activeModules: ["ERP AutoPeças (Core)", "Financeiro Avançado"],
  },
  {
    id: "comp-04",
    name: "Distribuidora Real Autopeças",
    cnpj: "12.876.543/0001-90",
    city: "Guarulhos",
    state: "SP",
    segment: "Distribuidora Atacadista",
    storesCount: 3,
    owner: "João Silva",
    status: "Cliente Ativo",
    mainContact: "Gustavo Borges",
    contactPhone: "(11) 99876-1234",
    contactEmail: "gustavo@realautopecas.com.br",
    totalDealsValue: 72000,
    activeModules: ["ERP AutoPeças (Core)", "Estoque & Curva ABC", "B2B E-commerce de Peças", "Fiscal & SPED Automotivo"],
  },
];

export const INITIAL_PROPOSALS: CrmProposal[] = [
  {
    id: "prop-01",
    proposalNumber: "PROP-2024-092",
    company: "Auto Peças Silva",
    contact: "Carlos Silva",
    setupValue: 6500,
    monthlyValue: 1200,
    storesCovered: 3,
    modules: ["ERP AutoPeças (Core)", "Balcão PDV Rápido", "Estoque & Curva ABC"],
    status: "Enviada",
    sentDate: "2024-03-26",
    validUntil: "2024-04-10",
    owner: "João Silva",
  },
  {
    id: "prop-02",
    proposalNumber: "PROP-2024-089",
    company: "Grupo Paulista de Motopeças",
    contact: "Fernando Alves",
    setupValue: 12000,
    monthlyValue: 2200,
    storesCovered: 4,
    modules: ["ERP AutoPeças (Core)", "Estoque & Curva ABC", "B2B E-commerce de Peças"],
    status: "Em Revisão",
    sentDate: "2024-03-24",
    validUntil: "2024-04-08",
    owner: "Carlos Ferreira",
  },
  {
    id: "prop-03",
    proposalNumber: "PROP-2024-085",
    company: "Distribuidora Real Autopeças",
    contact: "Gustavo Borges",
    setupValue: 24000,
    monthlyValue: 4800,
    storesCovered: 3,
    modules: ["ERP AutoPeças (Core)", "Estoque & Curva ABC", "B2B E-commerce de Peças", "Fiscal & SPED Automotivo"],
    status: "Aprovada",
    sentDate: "2024-03-10",
    validUntil: "2024-03-25",
    owner: "João Silva",
  },
];

export const INITIAL_AUTOMATIONS: CrmAutomationRule[] = [
  {
    id: "auto-01",
    title: "Distribuição Inteligente por Região e Qtd de Lojas",
    trigger: "Novo lead entra via formulário web ou WhatsApp Balcão",
    conditions: "Se Estado = 'SP' e Lojas >= 3",
    actions: [
      "Atribuir automaticamente ao Vendedor Sênior João Silva",
      "Criar tarefa de primeiro contato com prazo de 15 minutos",
      "Enviar mensagem de boas-vindas institucional no WhatsApp com catálogo",
    ],
    active: true,
    category: "lead_routing",
  },
  {
    id: "auto-02",
    title: "Alerta de Estagnação (Follow-up 3 Dias Sem Resposta)",
    trigger: "Lead permanece 3 dias sem nova atividade registrada no estágio",
    conditions: "Estágio in ['Qualificação', 'Oportunidade', 'Proposta']",
    actions: [
      "Gerar tarefa de follow-up prioritário com badge 'URGENTE'",
      "Notificar o vendedor responsável e gestor comercial no Header",
      "Sugerir modelo de mensagem 'Reativação de Orçamento de Autopeças'",
    ],
    active: true,
    category: "followup_sla",
  },
  {
    id: "auto-03",
    title: "Follow-up Automático 48h Pós-Proposta Comercial",
    trigger: "Proposta enviada para o cliente",
    conditions: "Sem retorno registrado após 48 horas úteis",
    actions: [
      "Criar tarefa de ligação de alinhamento com decisor",
      "Enviar e-mail automático com comparativo de retorno de investimento (ROI)",
    ],
    active: true,
    category: "pipeline_advance",
  },
  {
    id: "auto-04",
    title: "Sincronização Automática Lead Ganho → ALFA ERP",
    trigger: "Oportunidade movida para o estágio 'Ganho'",
    conditions: "Contrato assinado e CNPJ validado na Receita Federal",
    actions: [
      "Converter Lead em Cliente Ativo na base unificada",
      "Criar cadastro da empresa no ALFA ERP com filiais e parâmetros fiscais",
      "Notificar equipe de Onboarding Técnico e Implantação de Balcão",
    ],
    active: true,
    category: "erp_sync",
  },
];

export const LOSS_REASONS = [
  { id: "preco", label: "Preço / Custo de implantação acima do orçamento" },
  { id: "concorrente", label: "Optou por concorrente especializado (Linx / Totvs / Senior)" },
  { id: "sem_orcamento", label: "Sem verba ou congelamento de investimentos" },
  { id: "sem_retorno", label: "Decisor não respondeu contatos após múltiplas tentativas" },
  { id: "timing", label: "Projeto adiado para o próximo semestre" },
  { id: "funcionalidade", label: "Falta de recurso específico ou integração de catálogo" },
  { id: "outro", label: "Outro motivo (especificar nas observações)" },
];

export const WHATSAPP_TEMPLATES = [
  {
    id: "apresentacao",
    title: "Apresentação ALFA ERP AutoPeças",
    text: "Olá {nome}, tudo bem? Aqui é o {vendedor} da ALFA Sistemas. Vi que você busca modernizar o controle de estoque e balcão da {empresa}. Temos uma solução especializada para autopeças com busca por placa e curva ABC automática. Podemos conversar 10 minutos hoje?",
  },
  {
    id: "reuniao",
    title: "Confirmação de Demonstração",
    text: "Olá {nome}, confirmando nossa demonstração online do ALFA ERP para a {empresa} hoje às {horario}. Vou te mostrar como funciona a emissão de NFC-e em menos de 3 segundos no balcão!",
  },
  {
    id: "proposta",
    title: "Envio de Proposta Comercial",
    text: "Olá {nome}, acabei de gerar a proposta especial para as {lojas} lojas da {empresa}. Nela incluímos o Balcão PDV, Curva ABC e integração fiscal. Já está no seu e-mail e posso te explicar cada ponto por aqui!",
  },
  {
    id: "reativacao",
    title: "Follow-up / Reativação",
    text: "Olá {nome}, como estão os negócios na {empresa}? Conseguiram avaliar a proposta do ALFA ERP? Lançamos uma nova condição de parcelamento da implantação válida para este mês.",
  },
];
