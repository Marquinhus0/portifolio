import type { Locale } from "@/context/LanguageContext";

export type AxisLevel = "low" | "medium" | "high";

export interface DecisionOption {
  id: "A" | "B" | "C";
  title: string;
  summary: string;
  isRecommended: boolean;
  badge: string;
  scores: {
    operationalSpeed: AxisLevel;
    businessSafety: AxisLevel;
    engineeringComplexity: AxisLevel;
  };
  gains: string[];
  sacrifices: string[];
  systemConsequence: string;
}

export interface ThinkingStepData {
  stepNumber: string;
  id: "diagnosis" | "rules" | "architecture" | "edgeStates" | "acceptance";
  title: string;
  subtitle: string;
  bullets: {
    label: string;
    detail: string;
  }[];
  engineeringNote: string;
}

export interface DecisionScenario {
  id: string;
  code: string;
  domain: string;
  originTag: string;
  title: string;
  dilemma: string;
  context: string;
  relatedCaseSlug: string;
  relatedCaseLabel: string;
  constraints: string[];
  stakeholders: string[];
  options: DecisionOption[];
  thinkingFlow: ThinkingStepData[];
}

export interface DecisionLabCopy {
  eyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  ndaNotice: string;
  pillarsLabel: {
    business: string;
    design: string;
    engineering: string;
  };
  modeTabs: {
    lab: string;
    thinking: string;
  };
  scenarioLabel: string;
  contextHeading: string;
  constraintsHeading: string;
  optionsHeading: string;
  optionsHint: string;
  recommendedTag: string;
  selectedTag: string;
  compareCta: string;
  relatedCaseCta: string;
  analysisHeading: string;
  scoreLabels: {
    operationalSpeed: string;
    businessSafety: string;
    engineeringComplexity: string;
  };
  levelLabels: Record<AxisLevel, string>;
  gainsHeading: string;
  sacrificesHeading: string;
  systemConsequenceHeading: string;
  thinkingHeading: string;
  thinkingSubtitle: string;
  engineeringNoteHeading: string;
  preview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    promptLabel: string;
    recommendedNote: string;
  };
}

export const DECISION_LAB_COPY: Record<Locale, DecisionLabCopy> = {
  pt: {
    eyebrow: "[UX Decision Lab & Product Thinking]",
    pageTitle: "Como tomo decisões em produtos complexos.",
    pageSubtitle:
      "Explore dilemas reais de ERP, Procurement e CRM B2B. Selecione alternativas para comparar trade-offs operacionais, regras de negócio e critérios de aceitação antes de escrever uma linha de UI.",
    ndaNotice:
      "Cenários baseados em padrões recorrentes de sistemas corporativos (NDA-safe • sem dados proprietários ou métricas inventadas).",
    pillarsLabel: {
      business: "Business & Regras",
      design: "UX & Arquitetura",
      engineering: "Engenharia & QA",
    },
    modeTabs: {
      lab: "01. UX Decision Lab (Trade-offs)",
      thinking: "02. Product Thinking Flow (Diagnóstico → QA)",
    },
    scenarioLabel: "Cenário",
    contextHeading: "Contexto & Tensão de Negócio",
    constraintsHeading: "Restrições Inegociáveis",
    optionsHeading: "Alternativas de Solução",
    optionsHint: "Selecione uma abordagem para inspecionar impactos e riscos",
    recommendedTag: "Decisão Adotada",
    selectedTag: "Selecionada",
    compareCta: "Ver decisão recomendada",
    relatedCaseCta: "Abrir estudo relacionado",
    analysisHeading: "Análise de Impacto & Trade-offs",
    scoreLabels: {
      operationalSpeed: "Fluidez Operacional",
      businessSafety: "Segurança da Regra",
      engineeringComplexity: "Esforço de Engenharia",
    },
    levelLabels: {
      low: "Baixo",
      medium: "Médio",
      high: "Alto",
    },
    gainsHeading: "O que você ganha",
    sacrificesHeading: "Risco ou Custo Assumido",
    systemConsequenceHeading: "Efeito na Experiência & Operação",
    thinkingHeading: "Fluxo Estruturado de Raciocínio",
    thinkingSubtitle:
      "Navegue pelas 5 camadas usadas para transformar um problema operacional ambíguo em especificação pronta para Engenharia e QA.",
    engineeringNoteHeading: "Alinhamento Design ↔ Engenharia",
    preview: {
      eyebrow: "[UX Decision Lab • Laboratório Interativo]",
      title: "Trade-offs reais antes da interface final.",
      subtitle:
        "Em software B2B, cada escolha de UX mexe com regra fiscal, alçada de aprovação ou débito técnico. Simule decisões em 3 cenários corporativos.",
      cta: "Explorar UX Decision Lab completo",
      promptLabel: "Teste um dilema rápido:",
      recommendedNote: "Arquitetura equilibrada",
    },
  },
  en: {
    eyebrow: "[UX Decision Lab & Product Thinking]",
    pageTitle: "How I make trade-off calls in complex products.",
    pageSubtitle:
      "Inspect real ERP, Procurement, and B2B CRM dilemmas. Switch between solution alternatives to evaluate operational speed, business safeguards, and engineering acceptance criteria.",
    ndaNotice:
      "Scenarios grounded in recurring enterprise patterns (NDA-safe • no proprietary client data or fabricated metrics).",
    pillarsLabel: {
      business: "Business Rules",
      design: "UX Architecture",
      engineering: "Engineering & QA",
    },
    modeTabs: {
      lab: "01. UX Decision Lab (Trade-offs)",
      thinking: "02. Product Thinking Flow (Diagnosis → QA)",
    },
    scenarioLabel: "Scenario",
    contextHeading: "Operational Context & Tension",
    constraintsHeading: "Hard Constraints",
    optionsHeading: "Solution Alternatives",
    optionsHint: "Pick an option below to inspect operational and technical consequences",
    recommendedTag: "Adopted Decision",
    selectedTag: "Selected",
    compareCta: "Jump to adopted decision",
    relatedCaseCta: "Open related case study",
    analysisHeading: "Impact & Trade-off Breakdown",
    scoreLabels: {
      operationalSpeed: "Operational Speed",
      businessSafety: "Rule Integrity",
      engineeringComplexity: "Engineering Effort",
    },
    levelLabels: {
      low: "Low",
      medium: "Medium",
      high: "High",
    },
    gainsHeading: "What improves",
    sacrificesHeading: "Trade-off / Risk assumed",
    systemConsequenceHeading: "System & Workflow Effect",
    thinkingHeading: "Structured Product Thinking Flow",
    thinkingSubtitle:
      "Walk through the 5 stages used to translate an ambiguous business bottleneck into UI architecture and QA acceptance criteria.",
    engineeringNoteHeading: "Design ↔ Engineering Alignment",
    preview: {
      eyebrow: "[UX Decision Lab • Interactive Simulation]",
      title: "Real trade-offs before high-fidelity UI.",
      subtitle:
        "In enterprise software, every UX choice affects tax rules, approval tiers, or technical complexity. Test real trade-offs across 3 B2B scenarios.",
      cta: "Open full UX Decision Lab",
      promptLabel: "Try a quick dilemma:",
      recommendedNote: "Balanced architecture",
    },
  },
};

export const DECISION_SCENARIOS: Record<Locale, DecisionScenario[]> = {
  pt: [
    {
      id: "erp-pdv-fiscal",
      code: "DL-01",
      domain: "ERP & Frente de Loja (PDV)",
      originTag: "Padrão Real • NDA-Safe",
      title: "Velocidade no Balcão vs. Integridade Fiscal em Tempo Real",
      dilemma:
        "Como impedir filas no caixa durante instabilidade de rede ou SEFAZ sem gerar passivo tributário nem inconsistência de estoque?",
      context:
        "Em operações de varejo e atacarejo B2B integradas ao ERP, o operador precisa concluir vendas em segundos pelo teclado. Porém, cada emissão envolve NCM, CFOP, ICMS-ST, reserva de estoque e comunicação com autorizador fiscal externo.",
      relatedCaseSlug: "erp-enterprise-redesign",
      relatedCaseLabel: "Case 01 — ERP Enterprise (NDA-Safe)",
      constraints: [
        "Operador não domina tributação; erro técnico críptico trava o atendimento presencial.",
        "Estoque reservado em venda abortada precisa ser liberado sem registro fantasma.",
        "Contingência offline não pode permitir divergência definitiva no fechamento contábil.",
      ],
      stakeholders: ["Operador de Caixa", "Gestor de Loja", "Contabilidade / Fiscal", "Engenharia Backend"],
      options: [
        {
          id: "A",
          title: "Bloqueio Síncrono Estrito",
          summary:
            "Travar o fechamento da venda até retorno completo da SEFAZ e validação síncrona de todas as regras tributárias no servidor.",
          isRecommended: false,
          badge: "Conservadora / Rígida",
          scores: {
            operationalSpeed: "low",
            businessSafety: "high",
            engineeringComplexity: "low",
          },
          gains: [
            "Zero notas emitidas em contingência ou pendentes de conciliação posterior.",
            "Fluxo linear no backend sem fila de reprocessamento assíncrono.",
          ],
          sacrifices: [
            "Qualquer oscilação externa gera fila física imediata e perda de venda no balcão.",
            "Operador tenta repetir cliques ou abrir novas abas, aumentando duplicidade de pedido.",
          ],
          systemConsequence:
            "Alta segurança fiscal teórica, mas inviável no pico operacional real — força a loja a usar anotações paralelas em papel ou planilhas fora do sistema.",
        },
        {
          id: "B",
          title: "Emissão Livre com Correção Posterior",
          summary:
            "Permitir fechar qualquer pedido no caixa sem validação prévia e delegar toda correção fiscal para a equipe contábil no fim do mês.",
          isRecommended: false,
          badge: "Rápida / Alto Passivo",
          scores: {
            operationalSpeed: "high",
            businessSafety: "low",
            engineeringComplexity: "low",
          },
          gains: [
            "Atendimento no balcão nunca para por erro de cadastro ou resposta externa.",
            "Menor atrito inicial para operadores recém-treinados.",
          ],
          sacrifices: [
            "Acumula dezenas de notas rejeitadas com cliente já tendo levado a mercadoria.",
            "Transfere erro evitável de cadastro (NCM/CFOP) para retrabalho caro na contabilidade.",
          ],
          systemConsequence:
            "Otimiza o curto prazo do operador criando um gargalo severo no fechamento fiscal e risco de autuação tributária.",
        },
        {
          id: "C",
          title: "Validação Local Crítica + Contingência Auditável",
          summary:
            "Validar localmente em <50ms os pré-requisitos estruturais (NCM, alíquota, estoque mínimo) e acionar fila controlada de contingência se a SEFAZ falhar.",
          isRecommended: true,
          badge: "Arquitetura Equilibrada",
          scores: {
            operationalSpeed: "high",
            businessSafety: "high",
            engineeringComplexity: "medium",
          },
          gains: [
            "Erros corrigíveis são barrados antes do envio com mensagem acionável em linguagem humana.",
            "Queda da SEFAZ ativa modo contingência explícito com indicador visual e sincronização automática.",
            "Retaguarda enxerga apenas exceções pendentes em fila priorizada para saneamento.",
          ],
          sacrifices: [
            "Exige máquina de estados explícita no front e contrato de idempotência no backend.",
            "Requer painel dedicado de conciliação de notas emitidas em contingência.",
          ],
          systemConsequence:
            "Protege o fluxo do balcão sem abrir mão da rastreabilidade contábil — design e engenharia compartilham estados explícitos de rede e fila.",
        },
      ],
      thinkingFlow: [
        {
          stepNumber: "01",
          id: "diagnosis",
          title: "Diagnóstico: Sintoma vs. Causa Raiz",
          subtitle: "Observação em campo + análise de logs de erro de implantação",
          bullets: [
            {
              label: "Sintoma relatado",
              detail: "“O sistema está lento no caixa e exibe códigos de rejeição incompreensíveis.”",
            },
            {
              label: "Causa raiz real",
              detail: "Validações estruturais básicas só aconteciam após o submit remoto síncrono, misturando erro de cadastro com indisponibilidade externa.",
            },
          ],
          engineeringNote:
            "Separamos códigos de rejeição determinísticos (cadastro local) de erros transientes (timeout SEFAZ) antes de desenhar os alertas.",
        },
        {
          stepNumber: "02",
          id: "rules",
          title: "Regras de Negócio & Salvaguardas",
          subtitle: "Contrato entre regra tributária e operação presencial",
          bullets: [
            {
              label: "Regra R1 — Pré-checagem",
              detail: "Item sem NCM/CFOP válido bloqueia inclusão no carrinho com atalho para ajuste gerencial, nunca apenas no momento de imprimir cupom.",
            },
            {
              label: "Regra R2 — Reserva de Estoque",
              detail: "Venda em contingência registra reserva transitória vinculada a token idempotente por venda para evitar baixa dupla.",
            },
          ],
          engineeringNote:
            "Chave de idempotência gerada no client evita emissão duplicada se o operador pressionar Enter duas vezes.",
        },
        {
          stepNumber: "03",
          id: "architecture",
          title: "Arquitetura de Informação As-Is → To-Be",
          subtitle: "Separação entre foco transacional e diagnóstico",
          bullets: [
            {
              label: "As-Is",
              detail: "Modal genérico “Erro 539 / Falha na transmissão” bloqueando a tela inteira sem ação clara.",
            },
            {
              label: "To-Be",
              detail: "Barra persistente discreta de status fiscal + drawer lateral apenas quando há erro corrigível, mantendo resumo da venda visível.",
            },
          ],
          engineeringNote:
            "Atalhos F2/F4/Esc preservados em foco previsível para uso contínuo sem mouse.",
        },
        {
          stepNumber: "04",
          id: "edgeStates",
          title: "Estados de Borda Mapeados (UX + QA)",
          subtitle: "Cobertura fora do happy path",
          bullets: [
            {
              label: "Timeout / Offline",
              detail: "Transição automática após 4s de timeout para Contingência com badge âmbar e contador de fila local.",
            },
            {
              label: "Rejeição Fiscal",
              detail: "Tradução do código técnico para orientação prática + opção “Salvar rascunho e liberar caixa”.",
            },
          ],
          engineeringNote:
            "Todos os estados documentados em matriz compartilhada com QA para testes automatizados de falha de rede.",
        },
        {
          stepNumber: "05",
          id: "acceptance",
          title: "Critérios de Aceitação (Given / When / Then)",
          subtitle: "Pronto para refinamento e entrega técnica",
          bullets: [
            {
              label: "Cenário A — Erro de cadastro",
              detail: "Dado um item com NCM incompleto, Quando o operador adicioná-lo, Então o alerta deve indicar exatamente qual campo impede emissão antes do pagamento.",
            },
            {
              label: "Cenário B — Queda externa",
              detail: "Dado timeout > 4s do autorizador, Quando concluir pagamento, Então a venda é gravada em fila local idempotente e o caixa é liberado imediatamente.",
            },
          ],
          engineeringNote:
            "Sem lacunas entre Figma e sprint: cada critério tem estado visual correspondente no Design System.",
        },
      ],
    },
    {
      id: "supplyhub-approvals",
      code: "DL-02",
      domain: "Procurement B2B & Compras",
      originTag: "Estudo Autoral B2B",
      title: "Autonomia do Comprador vs. Governança de Margem e Alçada",
      dilemma:
        "Como acelerar reposições recorrentes sem perder controle sobre desvios de preço, orçamento do centro de custo e alçadas?",
      context:
        "Em redes multi-filiais, compradores precisam responder cotações rápido para evitar ruptura de estoque, mas a diretoria financeira teme aprovar aumentos silenciosos fora do histórico ou acima do orçamento mensal.",
      relatedCaseSlug: "supplyhub-procurement-b2b",
      relatedCaseLabel: "Case 02 — SupplyHub B2B",
      constraints: [
        "Diretores não têm tempo de auditar centenas de pedidos rotineiros idênticos.",
        "Comprador precisa visualizar imediatamente se um preço subiu frente à última compra.",
        "Toda exceção aprovada precisa deixar trilha auditável de quem liberou e por quê.",
      ],
      stakeholders: ["Comprador B2B", "Gerente de Filial", "Diretoria Financeira", "Fornecedores"],
      options: [
        {
          id: "A",
          title: "Alçada Manual em 100% dos Pedidos",
          summary:
            "Exigir aprovação manual do gestor financeiro para qualquer ordem de compra emitida, independentemente de valor ou variação.",
          isRecommended: false,
          badge: "Gargalo Centralizado",
          scores: {
            operationalSpeed: "low",
            businessSafety: "high",
            engineeringComplexity: "low",
          },
          gains: [
            "Visibilidade direta da diretoria em todas as saídas de caixa.",
            "Regras simples de permissão binária (solicita / aprova).",
          ],
          sacrifices: [
            "Caixa de entrada do gestor lota com itens triviais, gerando aprovação no automático sem leitura real.",
            "Aumenta risco de ruptura em itens de alto giro enquanto o pedido aguarda assinatura.",
          ],
          systemConsequence:
            "Falsa sensação de governança: excesso de aprovações triviais reduz a atenção justamente nos pedidos críticos.",
        },
        {
          id: "B",
          title: "Liberação Total por Teto Mensal",
          summary:
            "Permitir compras automáticas sem revisão individual enquanto houver saldo genérico no orçamento mensal do departamento.",
          isRecommended: false,
          badge: "Cego para Preço Unitário",
          scores: {
            operationalSpeed: "high",
            businessSafety: "low",
            engineeringComplexity: "low",
          },
          gains: [
            "Velocidade máxima para o time de compras emitir pedidos recorrentes.",
            "Elimina fila de aprovação intermediária.",
          ],
          sacrifices: [
            "Um fornecedor pode reajustar preço unitário em 18% e passar despercebido dentro do teto mensal.",
            "Consumo rápido de verba no início do mês trava compras essenciais no fim do período.",
          ],
          systemConsequence:
            "Perde controle granular de margem unitária e favorece compras sem comparação histórica.",
        },
        {
          id: "C",
          title: "Roteamento por Exceção + Comparativo Histórico",
          summary:
            "Aprovação automática dentro da faixa de tolerância histórica e orçamento; desvios de preço, prazo ou centro de custo disparam aprovação contextual.",
          isRecommended: true,
          badge: "Arquitetura Equilibrada",
          scores: {
            operationalSpeed: "high",
            businessSafety: "high",
            engineeringComplexity: "medium",
          },
          gains: [
            "Pedidos rotineiros seguem sem fila, liberando tempo do gestor para exceções reais.",
            "Card de aprovação já destaca o delta exato (ex: +12% sobre última OC) e justificativa do comprador.",
            "Reduz vaivém por e-mail/WhatsApp com histórico estruturado no próprio pedido.",
          ],
          sacrifices: [
            "Requer definição clara de matriz de tolerância (% de variação e teto por categoria).",
            "Interface precisa explicar de forma transparente por que um pedido exigiu alçada.",
          ],
          systemConsequence:
            "Alinha velocidade operacional com governança auditável focada em desvios concretos.",
        },
      ],
      thinkingFlow: [
        {
          stepNumber: "01",
          id: "diagnosis",
          title: "Diagnóstico: Por que aprovações travam?",
          subtitle: "Mapeamento de fila e comunicação paralela",
          bullets: [
            {
              label: "Fricção observada",
              detail: "Gestores recebiam apenas o valor total da OC, precisando perguntar no WhatsApp “por que subiu?” ou “já fechamos com outro fornecedor?”.",
            },
            {
              label: "Oportunidade",
              detail: "Embutir o comparativo de preço histórico e o motivo do desvio diretamente na linha do pedido.",
            },
          ],
          engineeringNote:
            "Reutilizamos o endpoint de histórico da última compra homologada para calcular delta no momento da cotação.",
        },
        {
          stepNumber: "02",
          id: "rules",
          title: "Motor de Alçadas & Tolerância",
          subtitle: "Critérios determinísticos de roteamento",
          bullets: [
            {
              label: "Faixa verde (Auto)",
              detail: "Variação <= tolerância configurada E saldo disponível no centro de custo → emissão direta.",
            },
            {
              label: "Faixa âmbar (Exceção)",
              detail: "Ultrapassou variação ou orçamento → exige justificativa tipificada do comprador antes de enviar à alçada.",
            },
          ],
          engineeringNote:
            "Regra avaliada no servidor no POST da ordem de compra para evitar bypass no client.",
        },
        {
          stepNumber: "03",
          id: "architecture",
          title: "Arquitetura da Decisão para o Aprovador",
          subtitle: "Contexto em 10 segundos sem abrir 4 telas",
          bullets: [
            {
              label: "Bloco Superior",
              detail: "Motivo objetivo da trava (ex.: “Preço unitário +11,4% acima da referência”) + impacto no orçamento.",
            },
            {
              label: "Comparativo Lateral",
              detail: "Tabela compacta com última compra, fornecedor alternativo e campo de decisão (Aprovar / Devolver com ajuste).",
            },
          ],
          engineeringNote:
            "Componente de comparação compartilha tokens de tabela do Design System com ordenação e destaque semântico.",
        },
        {
          stepNumber: "04",
          id: "edgeStates",
          title: "Estados de Borda (UX + QA)",
          subtitle: "Conflitos simultâneos e orçamento esgotado",
          bullets: [
            {
              label: "Orçamento consumido durante espera",
              detail: "Se outro pedido consumiu o saldo antes da aprovação, exibir alerta de saldo atualizado antes de confirmar.",
            },
            {
              label: "Sem histórico prévio",
              detail: "Item novo no catálogo exibe selo explícito “Primeira Compra — Sem Referência Histórica” em vez de 0%.",
            },
          ],
          engineeringNote:
            "Controle otimista de versão (`updated_at`) impede aprovação sobre cotação editada paralelamente.",
        },
        {
          stepNumber: "05",
          id: "acceptance",
          title: "Critérios de Aceitação (Given / When / Then)",
          subtitle: "Contrato claro para Engenharia e QA",
          bullets: [
            {
              label: "Cenário A — Justificativa obrigatória",
              detail: "Dado desvio acima da faixa de tolerância, Quando o comprador submeter sem selecionar motivo, Então o botão permanece bloqueado com foco no campo obrigatório.",
            },
            {
              label: "Cenário B — Trilha de auditoria",
              detail: "Quando o gestor aprovar ou devolver uma exceção, Então o log imutável registra usuário, timestamp, delta percentual e observação.",
            },
          ],
          engineeringNote:
            "Critérios testáveis diretamente via testes de integração de workflow e UI.",
        },
      ],
    },
    {
      id: "enterprise-form-density",
      code: "DL-03",
      domain: "SaaS Corporativo & Cadastro Denso",
      originTag: "Padrão Real • NDA-Safe",
      title: "Densidade Operacional vs. Clareza em Telas de 45+ Campos",
      dilemma:
        "Como atender power users que operam 8h/dia via teclado sem esmagar novos operadores com formulários gigantes e erro silencioso?",
      context:
        "Telas de cadastro de clientes B2B, produtos com grade tributária e pipeline CRM corporativo misturam dados essenciais do dia a dia com exceções raras (regimes especiais, subcontas, endereços secundários).",
      relatedCaseSlug: "flow-crm-b2b",
      relatedCaseLabel: "Case 03 — Flow CRM B2B",
      constraints: [
        "Power users rejeitam wizards lentos que fragmentam dados consultados juntos.",
        "Erros de validação não podem ficar ocultos em abas fechadas sem sinalização.",
        "Fluxo precisa funcionar em notebooks 1366×768 usados em escritórios administrativos.",
      ],
      stakeholders: ["Operador Sênior (Power User)", "Analista Júnior", "Suporte / CS", "Frontend Engineering"],
      options: [
        {
          id: "A",
          title: "Wizard Sequencial Multi-Etapas",
          summary:
            "Dividir os 45 campos em 6 etapas sequenciais obrigatórias com botões Anterior / Próximo.",
          isRecommended: false,
          badge: "Bom p/ Onboarding, Ruim p/ Rotina",
          scores: {
            operationalSpeed: "low",
            businessSafety: "medium",
            engineeringComplexity: "medium",
          },
          gains: [
            "Baixíssima carga visual inicial para usuários ocasionais.",
            "Validação isolada etapa por etapa.",
          ],
          sacrifices: [
            "Operadores experientes perdem visão do todo e precisam clicar 5 vezes para conferir ou editar um único campo final.",
            "Dificulta conferência cruzada (ex.: comparar endereço de entrega com regime fiscal).",
          ],
          systemConsequence:
            "Excelente para software de consumo eventual, mas gera frustração crônica em operadores B2B de alta frequência.",
        },
        {
          id: "B",
          title: "Formulário Monolítico com Tudo Aberto",
          summary:
            "Renderizar todos os 45+ campos simultaneamente em grade única extensa com rolagem longa.",
          isRecommended: false,
          badge: "Alta Densidade / Alto Ruído",
          scores: {
            operationalSpeed: "medium",
            businessSafety: "low",
            engineeringComplexity: "low",
          },
          gains: [
            "Implementação direta e todos os inputs acessíveis no DOM de uma só vez.",
          ],
          sacrifices: [
            "Campos raramente usados competem visualmente com os 8 campos realmente obrigatórios.",
            "Em notebooks menores (1366×768), o usuário perde referência do botão Salvar e não encontra facilmente onde falhou a validação.",
          ],
          systemConsequence:
            "Aumenta taxa de erro de preenchimento e chamados de suporte perguntando quais campos são realmente necessários.",
        },
        {
          id: "C",
          title: "Núcleo Essencial Visível + Exceções Progressivas & Barra de Erros",
          summary:
            "Expor os dados primários em grade compacta teclado-primeiro, isolar exceções em seções recolhíveis com indicadores de preenchimento e resumo fixo de validação.",
          isRecommended: true,
          badge: "Arquitetura Equilibrada",
          scores: {
            operationalSpeed: "high",
            businessSafety: "high",
            engineeringComplexity: "medium",
          },
          gains: [
            "80% dos cadastros são concluídos no núcleo superior sem abrir nenhuma seção secundária.",
            "Power users navegam por atalhos e ainda visualizam resumo vivo no cabeçalho.",
            "Se uma seção recolhida tiver erro obrigatório, badge de erro abre ou ancora direto no campo exato.",
          ],
          sacrifices: [
            "Exige validação unificada no schema do formulário antes de decidir o que permanece colapsado.",
            "Requer cuidado rigoroso de acessibilidade (ARIA expanded, foco automático no erro).",
          ],
          systemConsequence:
            "Entrega fluidez para especialistas e segurança guiada para novos operadores no mesmo fluxo.",
        },
      ],
      thinkingFlow: [
        {
          stepNumber: "01",
          id: "diagnosis",
          title: "Diagnóstico: Frequência Real de Campos",
          subtitle: "Auditoria de uso em vez de opinião",
          bullets: [
            {
              label: "Descoberta",
              detail: "Dos 48 campos de um cadastro completo, 9 respondiam pela maior parte das operações cotidianas; os demais surgiam por exceção tributária ou contratual.",
            },
            {
              label: "Princípio",
              detail: "Agrupar por frequência operacional real e tarefa do usuário, não pela estrutura literal das tabelas do banco.",
            },
          ],
          engineeringNote:
            "Schema único (Zod/React state) garante que ocultar visualmente nunca apaga nem ignora valores salvos.",
        },
        {
          stepNumber: "02",
          id: "rules",
          title: "Regras de Obrigatoriedade & Dependência",
          subtitle: "Campos condicionais explícitos",
          bullets: [
            {
              label: "Derivação automática",
              detail: "CNPJ/CEP preenche razão social, UF e sugestão tributária para reduzir digitação manual repetitiva.",
            },
            {
              label: "Dependência condicional",
              detail: "Campos de exceção aparecem apenas quando o perfil selecionado exige (ex.: Contribuinte ICMS vs. Isento).",
            },
          ],
          engineeringNote:
            "Regras condicionais centralizadas evitam divergência entre máscara visual e validação da API.",
        },
        {
          stepNumber: "03",
          id: "architecture",
          title: "Layout Responsivo para Alta Densidade",
          subtitle: "Projetado para 1366×768 e mobile",
          bullets: [
            {
              label: "Navegação por âncoras + accordions",
              detail: "Barra de resumo fixa no rodapé exibe contagem de campos pendentes e botão primário sempre alcançável.",
            },
            {
              label: "Feedback imediato",
              detail: "Contadores discretos nos headers recolhidos mostram quantos campos estão preenchidos ou com pendência.",
            },
          ],
          engineeringNote:
            "Espaçamentos e tokens compactos mantêm conforto visual mesmo em resoluções corporativas padrão.",
        },
        {
          stepNumber: "04",
          id: "edgeStates",
          title: "Estados de Borda (UX + QA)",
          subtitle: "Sem erros silenciosos em blocos fechados",
          bullets: [
            {
              label: "Erro em seção recolhida",
              detail: "Ao tentar salvar, o sistema expande automaticamente o bloco com erro, destaca a borda e move o foco para o primeiro input inválido.",
            },
            {
              label: "Perda de dados ao sair",
              detail: "Alterações não salvas exibem indicador explícito (`Alterações pendentes`) e confirmação antes de descartar.",
            },
          ],
          engineeringNote:
            "Testado por teclado completo (`Tab`, `Shift+Tab`, `Enter`, `Esc`) sem armadilhas de foco.",
        },
        {
          stepNumber: "05",
          id: "acceptance",
          title: "Critérios de Aceitação (Given / When / Then)",
          subtitle: "Pronto para sprint e QA",
          bullets: [
            {
              label: "Cenário A — Erro fora da viewport",
              detail: "Dado um campo obrigatório inválido dentro de uma seção recolhida, Quando clicar em Salvar, Então a seção abre automaticamente e rola até o campo com mensagem específica.",
            },
            {
              label: "Cenário B — Alteração suja (Dirty state)",
              detail: "Quando editar qualquer campo, Então a barra fixa exibe o badge de alterações não salvas e impede navegação acidental sem confirmação.",
            },
          ],
          engineeringNote:
            "Critérios objetivos eliminam idas e vindas entre design, front-end e QA.",
        },
      ],
    },
  ],
  en: [
    {
      id: "erp-pdv-fiscal",
      code: "DL-01",
      domain: "ERP & Point of Sale (POS)",
      originTag: "Real Pattern • NDA-Safe",
      title: "Counter Speed vs. Real-Time Fiscal Integrity",
      dilemma:
        "How do you prevent checkout queues during network or tax-authority instability without creating fiscal compliance debt or ghost stock locks?",
      context:
        "In B2B retail and wholesale ERP workflows, cashiers must complete orders in seconds via keyboard. Yet every invoice validates tax codes (NCM/CFOP/ICMS), stock reservation, and external fiscal authorization.",
      relatedCaseSlug: "erp-enterprise-redesign",
      relatedCaseLabel: "Case 01 — Enterprise ERP (NDA-Safe)",
      constraints: [
        "Operators are not tax specialists; cryptic error codes freeze physical lines.",
        "Reserved stock on aborted orders must be cleanly released.",
        "Offline contingency cannot produce silent discrepancies during month-end accounting.",
      ],
      stakeholders: ["POS Operator", "Store Manager", "Fiscal / Accounting", "Backend Engineering"],
      options: [
        {
          id: "A",
          title: "Strict Synchronous Blocking",
          summary:
            "Lock order completion until external tax-authority authorization returns synchronously with full server validation.",
          isRecommended: false,
          badge: "Strict / Fragile",
          scores: {
            operationalSpeed: "low",
            businessSafety: "high",
            engineeringComplexity: "low",
          },
          gains: [
            "Zero contingency invoices needing later reconciliation.",
            "Linear backend flow without async retry queues.",
          ],
          sacrifices: [
            "Any external latency immediately creates physical queues and abandoned baskets.",
            "Cashiers retry clicks or open duplicate tabs, compounding order collisions.",
          ],
          systemConsequence:
            "Theoretically compliant, operationally fragile—pushes stores toward paper workarounds outside the ERP.",
        },
        {
          id: "B",
          title: "Unrestricted Sale + Month-End Fix",
          summary:
            "Allow any checkout to complete unvalidated and hand off all tax code fixes to accounting at month end.",
          isRecommended: false,
          badge: "Fast / High Liability",
          scores: {
            operationalSpeed: "high",
            businessSafety: "low",
            engineeringComplexity: "low",
          },
          gains: [
            "Checkout never stops due to catalog misconfigurations or API downtime.",
            "Lower upfront friction for newly onboarded staff.",
          ],
          sacrifices: [
            "Accumulates rejected invoices long after goods left the store.",
            "Turns preventable master-data fixes into expensive accounting rework.",
          ],
          systemConsequence:
            "Optimizes local cashier speed while creating severe downstream compliance exposure.",
        },
        {
          id: "C",
          title: "Critical Local Validation + Auditable Contingency",
          summary:
            "Validate structural tax/stock prerequisites locally in <50ms and fail over to an explicit idempotent contingency queue if external authorization times out.",
          isRecommended: true,
          badge: "Balanced Architecture",
          scores: {
            operationalSpeed: "high",
            businessSafety: "high",
            engineeringComplexity: "medium",
          },
          gains: [
            "Fixable data mistakes are caught early with human-readable next steps.",
            "External outages trigger explicit contingency mode with live sync badge.",
            "Backoffice sees a prioritized exception queue rather than digging through logs.",
          ],
          sacrifices: [
            "Requires explicit client state machine and idempotent backend keys.",
            "Needs a dedicated backoffice reconciliation queue view.",
          ],
          systemConsequence:
            "Protects physical counter throughput while preserving accounting auditability across network states.",
        },
      ],
      thinkingFlow: [
        {
          stepNumber: "01",
          id: "diagnosis",
          title: "Diagnosis: Symptom vs. Root Cause",
          subtitle: "Field shadowing + deployment error log review",
          bullets: [
            {
              label: "Reported symptom",
              detail: "“The POS hangs at checkout and shows cryptic rejection numbers.”",
            },
            {
              label: "Actual root cause",
              detail: "Basic catalog checks only ran on final synchronous submit, conflating missing master data with external network timeouts.",
            },
          ],
          engineeringNote:
            "Separated deterministic rejections (local product setup) from transient failures (external timeout) before designing UI states.",
        },
        {
          stepNumber: "02",
          id: "rules",
          title: "Business Rules & Safeguards",
          subtitle: "Contract between tax policy and live operations",
          bullets: [
            {
              label: "Rule R1 — Early Guard",
              detail: "Items missing valid tax setup block cart addition with supervisor quick-fix instead of failing after payment.",
            },
            {
              label: "Rule R2 — Idempotent Stock Lock",
              detail: "Contingency sales bind stock reservations to a unique idempotency token to prevent double deduction.",
            },
          ],
          engineeringNote:
            "Client-generated idempotency keys prevent duplicate invoice emissions on double Enter presses.",
        },
        {
          stepNumber: "03",
          id: "architecture",
          title: "Information Architecture As-Is → To-Be",
          subtitle: "Keeping transactional focus clear",
          bullets: [
            {
              label: "As-Is",
              detail: "Full-screen blocking modal with raw code 539 and zero recovery path.",
            },
            {
              label: "To-Be",
              detail: "Compact fiscal status bar + contextual drawer only for fixable blockers while keeping order summary visible.",
            },
          ],
          engineeringNote:
            "Keyboard shortcuts (F2/F4/Esc) stay predictable across every panel.",
        },
        {
          stepNumber: "04",
          id: "edgeStates",
          title: "Edge States Mapped (UX + QA)",
          subtitle: "Designing beyond the happy path",
          bullets: [
            {
              label: "Timeout / Offline",
              detail: "Automatic failover after 4s timeout into Contingency mode with amber indicator and queued count.",
            },
            {
              label: "Fiscal Rejection",
              detail: "Human translation of rejection + “Park draft and free register” fallback.",
            },
          ],
          engineeringNote:
            "Every edge state documented in a shared QA matrix for automated network-fault testing.",
        },
        {
          stepNumber: "05",
          id: "acceptance",
          title: "Acceptance Criteria (Given / When / Then)",
          subtitle: "Ready for sprint refinement",
          bullets: [
            {
              label: "Scenario A — Master data gap",
              detail: "Given an item with incomplete tax mapping, When added to the cart, Then UI blocks inclusion and pinpoints the exact missing attribute.",
            },
            {
              label: "Scenario B — External timeout",
              detail: "Given external authorization > 4s timeout, When payment confirms, Then sale commits to idempotent local queue and register unlocks immediately.",
            },
          ],
          engineeringNote:
            "Zero ambiguity between Figma specs and QA test cases.",
        },
      ],
    },
    {
      id: "supplyhub-approvals",
      code: "DL-02",
      domain: "B2B Procurement & Approvals",
      originTag: "Concept Product Study",
      title: "Buyer Autonomy vs. Margin & Budget Governance",
      dilemma:
        "How can multi-branch buyers close recurring restocks quickly while giving finance control over unit price hikes and budget caps?",
      context:
        "Branch buyers need fast PO turnaround to avoid stockouts, whereas finance teams want visibility whenever suppliers raise unit costs above historical baselines or monthly department budgets.",
      relatedCaseSlug: "supplyhub-procurement-b2b",
      relatedCaseLabel: "Case 02 — SupplyHub B2B",
      constraints: [
        "Executives cannot manually review hundreds of routine unchanged orders.",
        "Buyers need instant visual comparison against last approved price.",
        "Every exception needs an auditable trail of who approved and why.",
      ],
      stakeholders: ["B2B Buyer", "Branch Manager", "Finance Director", "Suppliers"],
      options: [
        {
          id: "A",
          title: "Manual Approval on 100% of POs",
          summary:
            "Require executive sign-off on every purchase order regardless of dollar amount or variance.",
          isRecommended: false,
          badge: "Central Bottleneck",
          scores: {
            operationalSpeed: "low",
            businessSafety: "high",
            engineeringComplexity: "low",
          },
          gains: [
            "Direct executive visibility across every cash outflow.",
            "Simple binary permission model.",
          ],
          sacrifices: [
            "Approver inbox floods with trivial restocks, leading to blind rubber-stamping.",
            "Stockouts increase while routine replenishment waits in queue.",
          ],
          systemConsequence:
            "Creates approval fatigue—high noise lowers scrutiny right where real exceptions hide.",
        },
        {
          id: "B",
          title: "Monthly Cap Auto-Release Only",
          summary:
            "Auto-approve any PO as long as remaining monthly department budget is positive.",
          isRecommended: false,
          badge: "Blind to Unit Price",
          scores: {
            operationalSpeed: "high",
            businessSafety: "low",
            engineeringComplexity: "low",
          },
          gains: [
            "Maximum buyer autonomy and zero queue latency.",
          ],
          sacrifices: [
            "An 18% supplier unit price hike passes unnoticed inside the broader budget.",
            "Early-month over-ordering starves critical end-of-month restocks.",
          ],
          systemConsequence:
            "Sacrifices SKU-level margin governance for raw speed.",
        },
        {
          id: "C",
          title: "Exception-Based Routing + Historical Delta",
          summary:
            "Auto-approve orders within historical price tolerance and budget; route only variance outliers with side-by-side price comparison.",
          isRecommended: true,
          badge: "Balanced Architecture",
          scores: {
            operationalSpeed: "high",
            businessSafety: "high",
            engineeringComplexity: "medium",
          },
          gains: [
            "Routine restocks flow immediately, keeping executive focus on true outliers.",
            "Approval card surfaces exact delta (e.g., +12% vs. last PO) and buyer rationale.",
            "Eliminates email/chat back-and-forth with structured audit history.",
          ],
          sacrifices: [
            "Requires clear tolerance thresholds by category.",
            "UI must explain transparently why an order triggered escalation.",
          ],
          systemConsequence:
            "Balances buyer speed with targeted, auditable financial oversight.",
        },
      ],
      thinkingFlow: [
        {
          stepNumber: "01",
          id: "diagnosis",
          title: "Diagnosis: Why Approvals Stall",
          subtitle: "Analyzing queue latency and off-system chat",
          bullets: [
            {
              label: "Observed friction",
              detail: "Approvers only saw a grand total, forcing WhatsApp follow-ups asking “why is this higher than last month?”",
            },
            {
              label: "Opportunity",
              detail: "Embed last approved unit cost delta and typed rationale right inside the PO line.",
            },
          ],
          engineeringNote:
            "Reuses historical approved PO endpoint to compute percentage variance at quote selection.",
        },
        {
          stepNumber: "02",
          id: "rules",
          title: "Tolerance & Escalation Matrix",
          subtitle: "Deterministic server-enforced rules",
          bullets: [
            {
              label: "Green lane (Auto)",
              detail: "Unit variance within configured band AND department budget available → instant release.",
            },
            {
              label: "Amber lane (Exception)",
              detail: "Variance or budget exceeded → buyer must select structured reason code before routing.",
            },
          ],
          engineeringNote:
            "Evaluated server-side on PO submission so UI shortcuts cannot bypass policy.",
        },
        {
          stepNumber: "03",
          id: "architecture",
          title: "Decision Architecture for Approvers",
          subtitle: "10-second context without switching tabs",
          bullets: [
            {
              label: "Header Summary",
              detail: "Exact escalation trigger + live department budget impact.",
            },
            {
              label: "Comparison Strip",
              detail: "Compact table comparing last order, competing quote, and Approve/Return actions.",
            },
          ],
          engineeringNote:
            "Shares semantic table tokens and keyboard controls across procurement views.",
        },
        {
          stepNumber: "04",
          id: "edgeStates",
          title: "Edge States (UX + QA)",
          subtitle: "Concurrency and first-time SKUs",
          bullets: [
            {
              label: "Budget consumed while waiting",
              detail: "Warn approver with updated available balance if concurrent POs reduced budget mid-review.",
            },
            {
              label: "No prior purchase",
              detail: "Display explicit “First Purchase — No Baseline” pill rather than misleading 0% delta.",
            },
          ],
          engineeringNote:
            "Optimistic concurrency token prevents approving stale edits.",
        },
        {
          stepNumber: "05",
          id: "acceptance",
          title: "Acceptance Criteria (Given / When / Then)",
          subtitle: "Sprint-ready test definitions",
          bullets: [
            {
              label: "Scenario A — Mandatory reason",
              detail: "Given variance above tolerance, When buyer submits without choosing a reason code, Then submission is blocked with focus on the required selector.",
            },
            {
              label: "Scenario B — Immutable audit log",
              detail: "When approver approves or returns an exception, Then immutable log stores actor, timestamp, percentage delta, and note.",
            },
          ],
          engineeringNote:
            "Directly translatable to end-to-end workflow and permission tests.",
        },
      ],
    },
    {
      id: "enterprise-form-density",
      code: "DL-03",
      domain: "Enterprise SaaS & Dense Forms",
      originTag: "Real Pattern • NDA-Safe",
      title: "High-Frequency Density vs. Clarity in 45+ Field Screens",
      dilemma:
        "How do you support power users operating 8 hours/day via keyboard without overwhelming newer operators or hiding validation errors?",
      context:
        "B2B customer setup, tax-mapped product catalogs, and corporate CRM records mix daily core attributes with rare exceptions (special tax regimes, secondary addresses, billing splits).",
      relatedCaseSlug: "flow-crm-b2b",
      relatedCaseLabel: "Case 03 — Flow CRM B2B",
      constraints: [
        "Power users hate multi-page wizards that fragment related fields.",
        "Validation errors cannot stay hidden inside collapsed sections.",
        "Layouts must remain comfortable on 1366×768 office laptops.",
      ],
      stakeholders: ["Senior Operator", "Junior Analyst", "Customer Support", "Frontend Engineering"],
      options: [
        {
          id: "A",
          title: "6-Step Mandatory Wizard",
          summary:
            "Split 45+ fields across 6 sequential pages with Next/Back navigation.",
          isRecommended: false,
          badge: "Friendly Onboarding / Slow Routine",
          scores: {
            operationalSpeed: "low",
            businessSafety: "medium",
            engineeringComplexity: "medium",
          },
          gains: [
            "Very low initial visual clutter for occasional users.",
            "Step-by-step isolated validation.",
          ],
          sacrifices: [
            "Power users click 5 times just to inspect or adjust a field at the end.",
            "Breaks side-by-side verification (e.g., comparing shipping state with tax profile).",
          ],
          systemConsequence:
            "Great for consumer signups, frustrating for repetitive daily backoffice work.",
        },
        {
          id: "B",
          title: "Flat Monolithic Scroll Form",
          summary:
            "Render all 45+ fields open simultaneously on a single long vertical grid.",
          isRecommended: false,
          badge: "High Density / High Noise",
          scores: {
            operationalSpeed: "medium",
            businessSafety: "low",
            engineeringComplexity: "low",
          },
          gains: [
            "Simple implementation with every control rendered in the DOM at once.",
          ],
          sacrifices: [
            "Rare exception fields compete visually with the 8–10 daily essentials.",
            "On 1366×768 screens, operators lose track of Save actions and validation failures.",
          ],
          systemConsequence:
            "Increases entry mistakes and support tickets asking which fields are truly required.",
        },
        {
          id: "C",
          title: "Visible Core + Progressive Exceptions & Error Bar",
          summary:
            "Keep daily core fields in a compact keyboard-first top grid, tuck exceptions into collapsible sections with completion badges, and anchor a live validation bar.",
          isRecommended: true,
          badge: "Balanced Architecture",
          scores: {
            operationalSpeed: "high",
            businessSafety: "high",
            engineeringComplexity: "medium",
          },
          gains: [
            "Most standard records finish in the visible top grid without opening secondary accordions.",
            "Power users keep full keyboard speed and live header summary.",
            "Errors inside collapsed sections auto-expand and focus the exact offending input.",
          ],
          sacrifices: [
            "Requires unified form schema state before deciding what starts collapsed.",
            "Demands strict ARIA attributes and automatic error-focus management.",
          ],
          systemConsequence:
            "Combines expert speed with guided safety inside one unified layout.",
        },
      ],
      thinkingFlow: [
        {
          stepNumber: "01",
          id: "diagnosis",
          title: "Diagnosis: Real Field Frequency",
          subtitle: "Auditing actual usage instead of mirroring DB tables",
          bullets: [
            {
              label: "Finding",
              detail: "Out of 48 customer record fields, 9 covered routine creation while the rest belonged to tax or billing edge cases.",
            },
            {
              label: "Principle",
              detail: "Group by operational frequency and user task, never 1-to-1 by database schema.",
            },
          ],
          engineeringNote:
            "Unified validation schema ensures collapsed sections never drop existing persisted data.",
        },
        {
          stepNumber: "02",
          id: "rules",
          title: "Conditional & Derived Field Rules",
          subtitle: "Removing manual repetition",
          bullets: [
            {
              label: "Auto-enrichment",
              detail: "Tax ID / Postal code lookups pre-fill legal entity, state, and default fiscal flags.",
            },
            {
              label: "Conditional exposure",
              detail: "Special regime fields mount only when the selected taxpayer profile requires them.",
            },
          ],
          engineeringNote:
            "Shared validation schema keeps UI masks and API contract 100% aligned.",
        },
        {
          stepNumber: "03",
          id: "architecture",
          title: "Dense Viewport Ergonomics",
          subtitle: "Tuned for 1366×768 and mobile",
          bullets: [
            {
              label: "Sticky action & error bar",
              detail: "Pinned bottom bar shows pending error count and primary Save action without scrolling.",
            },
            {
              label: "Quiet completion cues",
              detail: "Collapsed headers display filled vs. pending counts cleanly.",
            },
          ],
          engineeringNote:
            "Compact spacing tokens preserve visual breathing room under high density.",
        },
        {
          stepNumber: "04",
          id: "edgeStates",
          title: "Edge States (UX + QA)",
          subtitle: "Zero silent validation failures",
          bullets: [
            {
              label: "Error inside closed section",
              detail: "On submit, any section holding an invalid required field expands automatically and focuses that input.",
            },
            {
              label: "Unsaved changes guard",
              detail: "Dirty-state pill and confirmation prompt prevent accidental data loss on navigation.",
            },
          ],
          engineeringNote:
            "Verified end-to-end with keyboard-only navigation (`Tab`, `Shift+Tab`, `Enter`, `Esc`).",
        },
        {
          stepNumber: "05",
          id: "acceptance",
          title: "Acceptance Criteria (Given / When / Then)",
          subtitle: "Clear contract for Frontend & QA",
          bullets: [
            {
              label: "Scenario A — Off-screen validation",
              detail: "Given an invalid required field inside a collapsed accordion, When Save is triggered, Then the accordion opens, scrolls smoothly, and focuses the field.",
            },
            {
              label: "Scenario B — Dirty state",
              detail: "When any field diverges from initial load, Then the sticky footer shows unsaved status and guards exit.",
            },
          ],
          engineeringNote:
            "Removes ambiguity between design intent, frontend implementation, and QA regression.",
        },
      ],
    },
  ],
};
