import type {
  AsIsToBeConfig,
  QaTestScenarioItem,
  ScenarioCode,
  SolutionAlternative,
} from "./types";

export interface ScenarioEnrichment {
  domainDisclaimer?: string;
  asIsToBe: AsIsToBeConfig;
  problemJustifications: Record<string, string>;
  extraAlternativesByProblem: Record<string, SolutionAlternative>;
  risksByAlternative: Record<string, string[]>;
  qaLinkedProblems: Record<string, string[]>;
  extraQaScenario: QaTestScenarioItem;
}

export const ENRICHMENTS_PT: Record<ScenarioCode, ScenarioEnrichment> = {
  "DL-01": {
    domainDisclaimer:
      "Hipóteses Didáticas (PDV & Fiscal): neste cenário, decisões sobre emissão fiscal, regras tributárias (NCM/CFOP) e operação em contingência são ilustrações didáticas para exercício de UX e arquitetura — sua aplicação em ambiente real exige validação tributária, contábil e jurídica especializada.",
    asIsToBe: {
      asIsTitle: "Fluxo Atual (Síncrono Bloqueante)",
      asIsSubtitle: "Cada etapa aguarda resposta remota sequencial sem proteção contra queda ou erro legível.",
      asIsNodes: [
        {
          id: "pdv-asis-1",
          step: "01",
          label: "Bipagem & Carrinho",
          stateTag: "RASCUNHO",
          detail: "Operador bipa itens sem pré-checagem fiscal; SKUs incompletos passam silenciosamente.",
        },
        {
          id: "pdv-asis-2",
          step: "02",
          label: "Pagamento no Balcão",
          stateTag: "BLOQUEADO",
          isFriction: true,
          detail: "Ao confirmar pagamento, tela trava esperando estoque central + autorizador fiscal.",
        },
        {
          id: "pdv-asis-3",
          step: "03",
          label: "Timeout / Código Cru",
          stateTag: "ERRO CRU",
          isFriction: true,
          detail: "Queda de rede ou NCM inválido retorna Erro 500/XML técnico e leva operador a reenviar clique ou recarregar.",
        },
        {
          id: "pdv-asis-4",
          step: "04",
          label: "Reconciliação Manual",
          stateTag: "RETRABALHO",
          isFriction: true,
          detail: "Supervisor precisa conferir cupom perdido, cancelar duplicidade e ajustar estoque após fechamento.",
        },
      ],
      toBeTitle: "Fluxo Proposto (Resiliente & Assíncrono)",
      toBeSubtitle: "Pré-validação no escaneamento, trava idempotente e contingência explícita com fila auditável.",
      toBeNodes: [
        {
          id: "pdv-tobe-1",
          step: "01",
          label: "Pré-Checagem no Scan",
          stateTag: "PRÉ-VALIDADO",
          isImproved: true,
          detail: "Regras fiscais em cache e alerta de últimas unidades sinalizam problemas antes do cliente pagar.",
        },
        {
          id: "pdv-tobe-2",
          step: "02",
          label: "Commit com Idempotência",
          stateTag: "PROTEGIDO",
          isImproved: true,
          detail: "F12 grava venda com chave única transacional, travando duplo envio acidental durante o PINPAD.",
        },
        {
          id: "pdv-tobe-3",
          step: "03",
          label: "Contingência / Mensagem Clara",
          stateTag: "CONTINGÊNCIA",
          isImproved: true,
          detail: "Timeout > limite aciona barra discreta de contingência preservando o carrinho e orientando próximo passo legível.",
        },
        {
          id: "pdv-tobe-4",
          step: "04",
          label: "Sincronização em Retaguarda",
          stateTag: "AUDITADO",
          isImproved: true,
          detail: "Fila sincroniza em segundo plano; eventuais rejeições fiscais seguem isoladas sem travar novos atendimentos.",
        },
      ],
      stateTransitions: [
        {
          from: "RASCUNHO",
          trigger: "Confirmar F12 + Pagamento",
          to: "PROCESSANDO",
          guardNote: "Bloqueia duplo clique usando chave única",
        },
        {
          from: "PROCESSANDO",
          trigger: "Timeout de Rede > Limite",
          to: "CONTINGÊNCIA_LOCAL",
          guardNote: "Hipótese didática dependente de validação fiscal",
        },
        {
          from: "CONTINGÊNCIA_LOCAL",
          trigger: "Sinal Restabelecido",
          to: "SINCRONIZADO",
          guardNote: "Baixa idempotente com log de retaguarda",
        },
      ],
      keyDifferences: [
        "Move validação fiscal de 'depois do pagamento' para 'entrada do item'",
        "Substitui telas travadas e códigos XML por fila segura e orientação humana acionável",
        "Preserva continuidade física do balcão sem perder rastreabilidade contábil em auditoria",
      ],
    },
    problemJustifications: {
      "pdv-p1":
        "Impacto direto em fila presencial e frequência máxima em todo fechamento; exige cuidado arquitetural para não violar regras fiscais.",
      "pdv-p2":
        "Risco crítico de abandono ou duplicidade quando há instabilidade de rede no balcão; afeta tanto confiança do caixa quanto estoque.",
      "pdv-p3":
        "Ocorrência moderada restrita aos últimos itens de SKU, mas gera alto desgaste pós-venda quando exige estorno ao cliente.",
      "pdv-p4":
        "Problema de origem cadastral que explode na ponta errada (operador não é analista fiscal); requer triagem preventiva.",
      "pdv-p5":
        "Frequência alta sempre que algo falha e baixo esforço de mitigação via tradução de mensagens de erro para ação humana.",
    },
    extraAlternativesByProblem: {
      "pdv-p3": {
        id: "pdv-p3-c",
        label: "C",
        title: "Sincronização rápida por lote a cada 60s com trava final no fechamento",
        description:
          "Mantém inclusão livre no carrinho durante a bipagem, mas valida saldo central exato antes da impressão final caso saldo total seja menor que 5.",
        expectedBenefit:
          "Equilibra rapidez inicial na bipagem sem prender estoque por carrinhos esquecidos.",
        limitation:
          "Ainda pode avisar indisponibilidade instantes antes do pagamento em itens muito disputados.",
        userImpact: "Reduz alertas prematuros, porém mantém risco residual perto do pagamento.",
        operationalImpact: "Menor complexidade de expiração que reserva em tempo real.",
        estimatedComplexity: "Média",
        dependencies: ["Sync frequente de saldo crítico", "Check final pré-PINPAD"],
        risks: [
          "Cliente já ter inserido cartão quando saldo zerar no último segundo",
          "Requer fallback imediato para venda sob encomenda ou troca",
        ],
        consequenceAnalysis:
          "Validar apenas perto do pagamento simplifica gestão de reservas abandonadas, mas mantém risco de frustração na etapa final em SKUs disputados.",
        tradeOffShift: {
          speedVsValidation: 0,
          flexibilityVsControl: 0,
          simplicityVsDensity: 1,
          autonomyVsGovernance: 0,
          easeVsTraceability: 0,
        },
      },
      "pdv-p4": {
        id: "pdv-p4-c",
        label: "C",
        title: "Regra fiscal sugerida provisória sujeita à aprovação fiscal na retaguarda",
        description:
          "Quando falta NCM/CFOP específico, o sistema aplica perfil padrão da categoria para concluir venda e encaminha a nota para revisão fiscal obrigatória.",
        expectedBenefit:
          "Evita parar fila física mantendo revisão especializada posterior.",
        limitation:
          "Hipótese didática arriscada: emitir documento provisório com tributo divergente pode gerar passivo se não corrigido no prazo legal.",
        userImpact: "Alivia pressão imediata no balcão.",
        operationalImpact: "Aumenta carga diária de revisão e carta de correção no time fiscal.",
        estimatedComplexity: "Média",
        dependencies: ["Perfis fiscais padrão por categoria", "Workflow fiscal pós-venda"],
        risks: [
          "Multa ou passivo tributário se regras padrão divergirem da legislação estadual (validar com contador)",
          "Acúmulo de fila de revisão fiscal no fechamento do mês",
        ],
        consequenceAnalysis:
          "Usar fallback tributário por categoria evita bloqueio imediato no balcão, mas só pode ser considerada após validação contábil rigorosa por conta do risco fiscal.",
        tradeOffShift: {
          speedVsValidation: 1,
          flexibilityVsControl: 1,
          simplicityVsDensity: 0,
          autonomyVsGovernance: -1,
          easeVsTraceability: 0,
        },
      },
      "pdv-p5": {
        id: "pdv-p5-c",
        label: "C",
        title: "Assistente interativo passo a passo com checklist de autoatendimento",
        description:
          "Abre drawer guiado quando ocorre erro recorrente oferecendo botões de diagnóstico automático (testar conexão, validar cliente, trocar pagamento).",
        expectedBenefit:
          "Aumenta autonomia da loja frente a incidentes comuns sem saturar TI.",
        limitation: "Mais complexo de construir e manter para múltiplos tipos de erro.",
        userImpact: "Exige alguns segundos extras lendo o assistente em momentos de fila.",
        operationalImpact: "Diminui dependência do suporte em falhas recuperáveis.",
        estimatedComplexity: "Alta",
        dependencies: ["Fluxos de diagnóstico integrados por erro"],
        risks: [
          "Operador pular checklist rápido sob pressão física de fila",
          "Custo alto de manutenção conforme regras externas mudam",
        ],
        consequenceAnalysis:
          "Um assistente guiado entrega autonomia avançada na loja, mas pede mais engenharia e cuidado para não atrasar operações simples no balcão.",
        tradeOffShift: {
          speedVsValidation: -1,
          flexibilityVsControl: 0,
          simplicityVsDensity: -1,
          autonomyVsGovernance: 1,
          easeVsTraceability: -1,
        },
      },
    },
    risksByAlternative: {
      "pdv-p1-a": ["Perda de venda por desistência em fila física longa", "Cliques repetidos frustrados"],
      "pdv-p1-b": ["Fila local órfã se terminal sofrer perda física antes de sincronizar", "Exige treinamento na fila de exceções fiscais"],
      "pdv-p1-c": ["Rejeição fiscal descoberta tarde (validar obrigatoriamente com especialista fiscal)", "Venda acima do estoque físico"],
      "pdv-p2-a": ["Expiração de prazo legal de contingência se internet cair por horas"],
      "pdv-p2-b": ["Paralisação presencial completa do faturamento durante queda do provedor"],
      "pdv-p2-c": ["Operador fecha aba achando que sistema travou e perde venda"],
      "pdv-p3-a": ["Estoque preso temporariamente por carrinhos abandonados se TTL for alto"],
      "pdv-p3-b": ["Ruptura recorrente e distorção automática no módulo de Compras"],
      "pdv-p4-a": ["Mercadoria recebida fisicamente não pode ser vendida até saneamento cadastral"],
      "pdv-p4-b": ["Preenchimento incorreto de imposto por pessoa sem formação fiscal"],
      "pdv-p5-a": ["Mensagens mal mapeadas perderem detalhe útil se dicionário não cobrir novos códigos"],
      "pdv-p5-b": ["Congestionamento do suporte interno com dúvidas simples de digitação"],
    },
    qaLinkedProblems: {
      "pdv-qa-1": ["P-01"],
      "pdv-qa-2": ["P-04", "P-05"],
      "pdv-qa-3": ["P-02", "P-05"],
      "pdv-qa-4": ["P-03"],
      "pdv-qa-5": ["P-03"],
      "pdv-qa-6": ["P-01", "P-02"],
    },
    extraQaScenario: {
      id: "pdv-qa-7",
      category: "loading_and_error",
      title: "Carregamento & Erro — Latência visual controlada no fechamento e recuperação sem perda",
      scenarioDescription:
        "Autorizador demora entre 2s e 4s antes de confirmar ou retornar erro recuperável na cobrança.",
      expectedUiState:
        "Botão trava duplo envio exibindo status claro de processamento; em erro, preserva carrinho e destaca ação segura.",
      givenWhenThen:
        "Dado processamento > 1.5s, Quando erro recuperável ocorrer, Então spinner encerra sem limpar carrinho e exibe orientação acionável.",
      recommendedCriticality: "essential",
      linkedProblemCodes: ["P-01", "P-05"],
    },
  },

  "DL-02": {
    asIsToBe: {
      asIsTitle: "Fluxo Atual (Saldo Opaco & Ajustes Soltos)",
      asIsSubtitle: "Saldo misturado sem motivo obrigatório ou separação entre físico e reservado.",
      asIsNodes: [
        {
          id: "inv-asis-1",
          step: "01",
          label: "Consulta Única de Saldo",
          stateTag: "OPACO",
          isFriction: true,
          detail: "Tela mostra apenas '10 unidades' sem informar que 7 estão reservadas para pedidos em aberto.",
        },
        {
          id: "inv-asis-2",
          step: "02",
          label: "Ajuste Direto Livre",
          stateTag: "SEM ALÇADA",
          isFriction: true,
          detail: "Qualquer perfil edita quantidade sem motivo estruturado ou vínculo ao documento de origem.",
        },
        {
          id: "inv-asis-3",
          step: "03",
          label: "Extrato Técnico (`MOV_42`)",
          stateTag: "ILEGÍVEL",
          isFriction: true,
          detail: "Tabela exibe siglas internas e usuários genéricos de balcão, dificultando auditoria.",
        },
      ],
      toBeTitle: "Fluxo Proposto (Saldo Composto & Trilha Auditável)",
      toBeSubtitle: "Visão clara de disponível vs reservado, motivo tipado em ajustes e extrato legível por ator/canal.",
      toBeNodes: [
        {
          id: "inv-tobe-1",
          step: "01",
          label: "Saldo por Estado",
          stateTag: "FÍSICO / LIVRE",
          isImproved: true,
          detail: "Separa Físico (10), Reservado (7) e Livre (3) na mesma leitura limpa para compras e vendas.",
        },
        {
          id: "inv-tobe-2",
          step: "02",
          label: "Alçada + Motivo Tipado",
          stateTag: "AUDITÁVEL",
          isImproved: true,
          detail: "Permissão respeita depósito atribuído; ajustes exigem categoria + documento e aprovação acima do teto.",
        },
        {
          id: "inv-tobe-3",
          step: "03",
          label: "Extrato Semântico & Origem",
          stateTag: "RASTREÁVEL",
          isImproved: true,
          detail: "Timeline mostra rótulo humano (+10 NF #402 / -2 Transferência), saldo resultante, usuário nominal e canal.",
        },
      ],
      stateTransitions: [
        {
          from: "FÍSICO_DISPONÍVEL",
          trigger: "Pedido Confirmado no Balcão",
          to: "RESERVADO",
          guardNote: "Abate saldo livre sem permitir transferência simultânea",
        },
        {
          from: "RESERVADO",
          trigger: "Faturamento / Saída Física",
          to: "BAIXADO_LOG",
          guardNote: "Grava evento append-only ligado ao documento",
        },
        {
          from: "AJUSTE_SOLICITADO",
          trigger: "Quantidade > Teto da Filial",
          to: "AGUARDANDO_APROVAÇÃO",
          guardNote: "Alçada gerencial valida justificativa antes de alterar custo",
        },
      ],
      keyDifferences: [
        "Elimina confusão entre unidades fisicamente na prateleira e unidades comprometidas em pedidos",
        "Substitui códigos internos (`MOV_42`) por extrato legível com documento, canal e responsável nominal",
        "Equilibra agilidade para pequenas avarias com aprovação obrigatória em ajustes críticos",
      ],
    },
    problemJustifications: {
      "inv-p1":
        "Impacta diretamente acuracidade de compras e vendas diárias; saldo opaco gera retrabalho físico constante.",
      "inv-p2":
        "Sem vínculo e motivo categorizado, divergências nunca revelam a causa raiz na auditoria mensal.",
      "inv-p3":
        "Erro acidental de filial ou excesso de permissão cria desvios de alto impacto financeiro em poucos cliques.",
      "inv-p4":
        "Ocorrência diária em todos os perfis (suporte, estoque, gerência) com baixo esforço de resolução na camada de apresentação.",
      "inv-p5":
        "Diferenciar humano de integração API evita investigações injustas e acelera depuração técnica.",
    },
    extraAlternativesByProblem: {
      "inv-p1": {
        id: "inv-p1-c",
        label: "C",
        title: "Manter saldo simples na busca e exibir breakdown completo em drawer lateral",
        description:
          "Lista principal mostra apenas o 'Saldo Livre para Venda' destacado, enquanto clicar abre gaveta detalhando Reservado, Em Trânsito e Físico.",
        expectedBenefit:
          "Protege simplicidade visual da busca sem esconder transparência quando houver dúvida.",
        limitation:
          "Exige 1 clique extra para compreender por que o físico no corredor difere do saldo livre.",
        userImpact: "Mantém busca limpa para vendedores rápidos.",
        operationalImpact: "Previne venda duplicada com menos ruído visual inicial.",
        estimatedComplexity: "Média",
        dependencies: ["Cálculo de saldo livre na query", "Drawer de composição de estoque"],
        risks: [
          "Estoquista ignorar o drawer e achar que o sistema 'sumiu' com itens já reservados",
        ],
        consequenceAnalysis:
          "Ocultar o breakdown atrás de um drawer equilibra legibilidade da tabela e precisão dos estados de saldo.",
        tradeOffShift: {
          speedVsValidation: 0,
          flexibilityVsControl: -1,
          simplicityVsDensity: 1,
          autonomyVsGovernance: -1,
          easeVsTraceability: -1,
        },
      },
      "inv-p2": {
        id: "inv-p2-c",
        label: "C",
        title: "Exigir anexo/observação somente acima de limite percentual, com motivo pré-marcado nos demais",
        description:
          "Pequenas correções pedem 1 clique no motivo padronizado; desvios acima do limite exigem justificativa escrita e vínculo de documento.",
        expectedBenefit:
          "Equilibra velocidade na rotina diária com rigor elevado onde o risco financeiro é alto.",
        limitation:
          "Precisa definir limites coerentes por curva ABC ou faixa de valor.",
        userImpact: "Menor burocracia para correções pequenas de contagem.",
        operationalImpact: "Foca disciplina de auditoria nas movimentações relevantes.",
        estimatedComplexity: "Média",
        dependencies: ["Regras de limiar por ajuste", "Catálogo rápido de motivos"],
        risks: [
          "Usuários fracionarem um grande desvio em vários pequenos ajustes abaixo do limite",
        ],
        consequenceAnalysis:
          "Calibrar exigência pelo tamanho do impacto evita burocracia em micro-ajustes, exigindo monitoramento contra fracionamento.",
        tradeOffShift: {
          speedVsValidation: 0,
          flexibilityVsControl: 0,
          simplicityVsDensity: 0,
          autonomyVsGovernance: 0,
          easeVsTraceability: -1,
        },
      },
      "inv-p3": {
        id: "inv-p3-c",
        label: "C",
        title: "Autonomia ampla na própria filial com alerta em tempo real ao gestor em anomalias",
        description:
          "Conferentes da filial executam ajustes sem trava prévia, porém desvios incomuns disparam notificação auditável imediata para o gerente revisar no dia.",
        expectedBenefit:
          "Não para a operação em horários de pico mantendo vigilância gerencial no mesmo turno.",
        limitation:
          "Correção acontece após o ajuste ter afetado o saldo momentâneo.",
        userImpact: "Alta fluidez no depósito sem esperar aprovação assíncrona.",
        operationalImpact: "Exige rotina ativa do gestor verificando alertas diários.",
        estimatedComplexity: "Média",
        dependencies: ["Alertas por limiar anômalo", "Fila de conferência pós-fato"],
        risks: [
          "Gestor não acompanhar alertas no mesmo dia e deixar erro propagar para compras",
        ],
        consequenceAnalysis:
          "Trocar prevenção dura por auditoria quase imediata acelera o almoxarifado, mas depende de disciplina do gestor revisando exceções.",
        tradeOffShift: {
          speedVsValidation: 1,
          flexibilityVsControl: 1,
          simplicityVsDensity: 1,
          autonomyVsGovernance: 1,
          easeVsTraceability: -1,
        },
      },
      "inv-p4": {
        id: "inv-p4-c",
        label: "C",
        title: "Modo duplo: extrato enxuto por padrão + toggle 'Ver códigos técnicos'",
        description:
          "Interface exibe descrição humana amigável por padrão e permite que suporte/TI ativem visualização técnica com IDs e códigos internos no mesmo lugar.",
        expectedBenefit:
          "Atende usuários operacionais e analistas de suporte sem duplicar telas.",
        limitation:
          "Leve aumento de complexidade na camada de visualização da tabela.",
        userImpact: "Leitura clara para o dia a dia sem tirar ferramenta do suporte.",
        operationalImpact: "Reduz chamados de interpretação mantendo diagnósticos ágeis.",
        estimatedComplexity: "Baixa",
        dependencies: ["Toggle de exibição técnica na tabela"],
        risks: [
          "Usuário comum ativar modo técnico por engano se toggle for muito proeminente",
        ],
        consequenceAnalysis:
          "Separar visão operacional da visão técnica via toggle mantém a interface limpa enquanto preserva profundidade de debug.",
        tradeOffShift: {
          speedVsValidation: 1,
          flexibilityVsControl: 1,
          simplicityVsDensity: 1,
          autonomyVsGovernance: 0,
          easeVsTraceability: -1,
        },
      },
      "inv-p5": {
        id: "inv-p5-c",
        label: "C",
        title: "Autenticação na estação por setor + assinatura obrigatória apenas em ajustes manuais",
        description:
          "Consultas e entradas padrão mantêm sessão rápida do terminal, mas qualquer ajuste/transferência exige confirmação nominal curta (PIN de 4 dígitos).",
        expectedBenefit:
          "Corta atrito na leitura constante sem abrir mão de identificar quem alterou saldo.",
        limitation:
          "Operações automáticas de venda ainda aparecem vinculadas ao operador logado no turno.",
        userImpact: "Equilíbrio entre praticidade no terminal compartilhado e segurança pessoal.",
        operationalImpact: "Protege o estoque nas ações de maior risco.",
        estimatedComplexity: "Média",
        dependencies: ["Prompt leve de PIN em ações sensíveis"],
        risks: [
          "Colegas compartilharem PINs verbalmente caso haja pressa no depósito",
        ],
        consequenceAnalysis:
          "Pedir assinatura rápida só em ações sensíveis reduz fadiga de login enquanto melhora auditoria de ajustes.",
        tradeOffShift: {
          speedVsValidation: 0,
          flexibilityVsControl: 0,
          simplicityVsDensity: 1,
          autonomyVsGovernance: -1,
          easeVsTraceability: -1,
        },
      },
    },
    risksByAlternative: {
      "inv-p1-a": ["Tabela carregada se hierarquia visual entre Físico e Livre não for clara"],
      "inv-p1-b": ["Mascaramento contínuo de furtos, avarias ou notas não lançadas"],
      "inv-p2-a": ["Resistência inicial se catálogo tiver opções genéricas demais ('Outros')"],
      "inv-p2-b": ["Histórico repleto de descrições vazias ou genéricas ('ok')"],
      "inv-p3-a": ["Demora se único aprovador da filial estiver ausente sem substituto"],
      "inv-p3-b": ["Uso de planilhas paralelas fora do ERP para contornar fila do supervisor"],
      "inv-p4-a": ["Dicionário incompleto em novos tipos de movimento futuros"],
      "inv-p4-b": ["Decisões baseadas em planilhas desatualizadas exportadas horas antes"],
      "inv-p5-a": ["Operadores deixarem sessão aberta em terminal compartilhado"],
      "inv-p5-b": ["Impossibilidade de separar ação humana de rotina no mesmo turno"],
    },
    qaLinkedProblems: {
      "inv-qa-1": ["P-02", "P-04", "P-05"],
      "inv-qa-2": ["P-02"],
      "inv-qa-3": ["P-01", "P-02"],
      "inv-qa-4": ["P-03", "P-05"],
      "inv-qa-5": ["P-01"],
      "inv-qa-6": ["P-01", "P-05"],
    },
    extraQaScenario: {
      id: "inv-qa-7",
      category: "loading_and_error",
      title: "Carregamento & Erro — Skeleton no extrato denso e fallback de erro ao gravar ajuste",
      scenarioDescription:
        "Consulta de SKU com 500+ movimentações carrega assincronamente ou falha ao salvar transferência.",
      expectedUiState:
        "Exibe estado de carregamento proporcional sem pular layout; se falhar, mantém lista digitada pronta para retry.",
      givenWhenThen:
        "Dado carregamento > 800ms ou falha 500 na API, Então tabela exibe feedback claro sem resetar filtros ou rascunho.",
      recommendedCriticality: "essential",
      linkedProblemCodes: ["P-01", "P-04"],
    },
  },

  "DL-03": {
    asIsToBe: {
      asIsTitle: "Fluxo Atual (Funil Passivo Sem SLA)",
      asIsSubtitle: "Leads chegam sem dono claro, cards envelhecem sem alerta e histórico fica no WhatsApp pessoal.",
      asIsNodes: [
        {
          id: "crm-asis-1",
          step: "01",
          label: "Entrada Genérica",
          stateTag: "SEM DONO",
          isFriction: true,
          detail: "Lead entra na primeira coluna aguardando alguém lembrar de puxar ou responder.",
        },
        {
          id: "crm-asis-2",
          step: "02",
          label: "Kanban Plano",
          stateTag: "ESTAGNADO",
          isFriction: true,
          detail: "Cards parados há 10 dias têm o mesmo peso visual de propostas quentes do dia.",
        },
        {
          id: "crm-asis-3",
          step: "03",
          label: "Contato Fora do CRM",
          stateTag: "SEM HISTÓRICO",
          isFriction: true,
          detail: "Formulário longo afasta vendedor, que negocia fora e não registra próxima ação.",
        },
      ],
      toBeTitle: "Fluxo Proposto (Cadência Visível & Registro Leve)",
      toBeSubtitle: "Atribuição com SLA, alerta visual progressivo, registro em 1 clique no Drawer e próxima ação visível.",
      toBeNodes: [
        {
          id: "crm-tobe-1",
          step: "01",
          label: "Atribuição + SLA Inicial",
          stateTag: "ATRIBUÍDO",
          isImproved: true,
          detail: "Roteamento automático atribui dono claro com cronômetro visível de primeiro contato.",
        },
        {
          id: "crm-tobe-2",
          step: "02",
          label: "Kanban Orientado a SLA",
          stateTag: "PRIORIZADO",
          isImproved: true,
          detail: "Cards exibem Próxima Ação em destaque e tingimento progressivo quando SLA estoura.",
        },
        {
          id: "crm-tobe-3",
          step: "03",
          label: "Drawer 360° + Chip +2d",
          stateTag: "EM CADÊNCIA",
          isImproved: true,
          detail: "Log de ligação/WhatsApp em 1 clique seguido de chips rápidos para agendar próximo retorno.",
        },
      ],
      stateTransitions: [
        {
          from: "NOVO_LEAD",
          trigger: "Regra de Entrada / Rodízio",
          to: "AGUARDANDO_CONTATO",
          guardNote: "Dispara timer de SLA inicial do vendedor",
        },
        {
          from: "EM_NEGOCIAÇÃO",
          trigger: "Dias sem Atividade > SLA do Estágio",
          to: "ALERTA_ESTAGNAÇÃO",
          guardNote: "Sobe card para fila de resgate diária sem fechar negócio",
        },
        {
          from: "ATIVIDADE_LOGADA",
          trigger: "Chip Rápido (+1d / +3d / +7d)",
          to: "PRÓXIMA_AÇÃO_AGENDADA",
          guardNote: "Zera inatividade e garante continuidade visível",
        },
      ],
      keyDifferences: [
        "Troca formulários punitivos de 6 campos por registro rápido lateral mantendo histórico completo",
        "Substitui lista cronológica neutra por ordenação transparente (SLA + Valor + Estágio)",
        "Evita leads perdidos no funil usando sinalização progressiva em vez de encerramento automático cego",
      ],
    },
    problemJustifications: {
      "crm-p1":
        "Leads inbound sem dono esfriam em minutos e transformam verba de aquisição em perda imediata.",
      "crm-p2":
        "Oportunidades já trabalhadas travam silenciosamente no meio do funil distorcendo metas do mês.",
      "crm-p3":
        "Sem histórico leve, o custo de registrar vence a disciplina do vendedor e a empresa perde contexto.",
      "crm-p4":
        "Frequência máxima diária e baixíssimo esforço de implementação com alto impacto na cadência de vendas.",
      "crm-p5":
        "Sem critério transparente, o vendedor gasta a melhor janela da manhã nos negócios menos urgentes.",
    },
    extraAlternativesByProblem: {
      "crm-p1": {
        id: "crm-p1-c",
        label: "C",
        title: "Pré-triagem rápida pelo gestor comercial com SLA de 30 min para distribuir",
        description:
          "Leads entram para curadoria rápida de um líder que direciona contas estratégicas para vendedores seniores e padrão para o time júnior.",
        expectedBenefit:
          "Melhor pareamento entre porte da conta e senioridade do vendedor.",
        limitation:
          "Depende integralmente da disponibilidade contínua de quem distribui.",
        userImpact: "Vendedor recebe leads já contextualizados.",
        operationalImpact: "Cria gargalo se o gestor entrar em reuniões longas.",
        estimatedComplexity: "Baixa",
        dependencies: ["Painel de atribuição em lote para gestor"],
        risks: [
          "Fila represada por horas quando o gestor está ausente ou em campo",
        ],
        consequenceAnalysis:
          "Curadoria humana melhora qualificação inicial, mas introduz risco sério de gargalo na entrada de demanda.",
        tradeOffShift: {
          speedVsValidation: -1,
          flexibilityVsControl: -1,
          simplicityVsDensity: 1,
          autonomyVsGovernance: -2,
          easeVsTraceability: -1,
        },
      },
      "crm-p2": {
        id: "crm-p2-c",
        label: "C",
        title: "Cadência de lembrete no card + resumo semanal para revisão em 1:1",
        description:
          "Cards exibem apenas contador discreto de dias parados sem tingimento forte no Kanban, gerando relatório semanal consolidado para o gestor.",
        expectedBenefit:
          "Visual extremamente limpo e baixa pressão imediata sobre o Kanban.",
        limitation:
          "Oportunidade perde janela comercial durante dias esperando revisão semanal.",
        userImpact: "Interface calma sem alertas constantes.",
        operationalImpact: "Reação lenta a desvios de pipeline no meio do mês.",
        estimatedComplexity: "Baixa",
        dependencies: ["Contador de dias no estágio", "Relatório semanal consolidado"],
        risks: [
          "Descoberta tardia de negócios esfriados apenas na reunião de sexta-feira",
        ],
        consequenceAnalysis:
          "Privilegiar calma visual reduz ruído no dia a dia, mas posterga detecção de esfriamento comercial.",
        tradeOffShift: {
          speedVsValidation: 1,
          flexibilityVsControl: 1,
          simplicityVsDensity: 2,
          autonomyVsGovernance: 1,
          easeVsTraceability: 0,
        },
      },
      "crm-p3": {
        id: "crm-p3-c",
        label: "C",
        title: "Sincronização automática de canais integrados + notas curtas opcionais no card",
        description:
          "Integra registro automático de e-mail e disparo de template WhatsApp na timeline, deixando comentários extras manuais opcionais.",
        expectedBenefit:
          "Captura eventos digitais reais com esforço praticamente nulo do vendedor.",
        limitation:
          "Ligações telefônicas ou reuniões presenciais continuam sem contexto se ninguém escrever uma nota curta.",
        userImpact: "Atrito mínimo durante atendimentos digitais.",
        operationalImpact: "Exige investimento técnico em webhooks e integrações de canal.",
        estimatedComplexity: "Alta",
        dependencies: ["Webhooks de E-mail/WhatsApp corporativo", "Timeline unificada"],
        risks: [
          "Falhas em APIs de mensageria deixarem lacunas silenciosas se não houver log manual complementar",
        ],
        consequenceAnalysis:
          "Automação reduz drasticamente digitação em canais digitais, mas custa mais infraestrutura e não substitui resumo consultivo em ligações.",
        tradeOffShift: {
          speedVsValidation: 2,
          flexibilityVsControl: 1,
          simplicityVsDensity: 0,
          autonomyVsGovernance: 0,
          easeVsTraceability: 0,
        },
      },
      "crm-p4": {
        id: "crm-p4-c",
        label: "C",
        title: "Sugestão passiva de próxima tarefa apenas na agenda externa sem destaque no card",
        description:
          "Vendedor cria lembretes na agenda do sistema apenas quando julgar necessário, mantendo o card Kanban limpo só com empresa e valor.",
        expectedBenefit:
          "Card visualmente mínimo e flexibilidade total ao vendedor experiente.",
        limitation:
          "Na prática, vendedores novatos ou sobrecarregados esquecem de consultar agenda desconectada do funil.",
        userImpact: "Máxima liberdade sem notificações ou pendências.",
        operationalImpact: "Falta de visibilidade gerencial sobre o que acontecerá em cada negócio aberto.",
        estimatedComplexity: "Baixa",
        dependencies: ["Módulo básico de tarefas"],
        risks: [
          "Retorno ao cenário original de oportunidades ativas sem próximo passo visível",
        ],
        consequenceAnalysis:
          "Deixar próxima ação desconectada do card preserva aparência limpa, mas enfraquece exatamente a proteção contra esquecimento.",
        tradeOffShift: {
          speedVsValidation: 2,
          flexibilityVsControl: 2,
          simplicityVsDensity: 2,
          autonomyVsGovernance: 2,
          easeVsTraceability: 2,
        },
      },
      "crm-p5": {
        id: "crm-p5-c",
        label: "C",
        title: "Tags manuais de temperatura (Quente / Morno / Frio) definidas pelo vendedor",
        description:
          "Cada card ganha seletor manual de prioridade subjetiva para que o próprio vendedor ordene sua lista.",
        expectedBenefit:
          "Respeita contexto qualitativo que dados numéricos às vezes não captam.",
        limitation:
          "Tags subjetivas ficam desatualizadas rapidamente e variam de critério entre vendedores.",
        userImpact: "Senso de controle pessoal sobre a carteira.",
        operationalImpact: "Dificulta padronizar previsibilidade gerencial entre vendedores.",
        estimatedComplexity: "Baixa",
        dependencies: ["Seletor de tag manual por card"],
        risks: [
          "Metade do pipeline marcado como 'Quente' permanentemente sem refletir urgência real",
        ],
        consequenceAnalysis:
          "Priorização puramente manual captura nuance humana, mas tende a perder consistência sob pressão de metas.",
        tradeOffShift: {
          speedVsValidation: 0,
          flexibilityVsControl: 2,
          simplicityVsDensity: 1,
          autonomyVsGovernance: 2,
          easeVsTraceability: 1,
        },
      },
    },
    risksByAlternative: {
      "crm-p1-a": ["Desequilíbrio temporário se regra não descontar férias/ausências"],
      "crm-p1-b": ["Abandono sistemático de leads complexos ou de menor ticket inicial"],
      "crm-p2-a": ["Distorção caso estágio de espera longa compartilhe mesmo SLA de qualificação"],
      "crm-p2-b": ["Preenchimento de notas falsas pela equipe apenas para não perder card"],
      "crm-p3-a": ["Notas extremamente curtas se vendedor não detalhar contexto em contas complexas"],
      "crm-p3-b": ["Abandono do CRM por vendedores sob alto volume de ligações"],
      "crm-p4-a": ["Possibilidade de alguns cards ficarem sem agendamento se chip for ignorado"],
      "crm-p4-b": ["Datas fictícias lançadas apenas para destravar drag-and-drop"],
      "crm-p5-a": ["Desconfiança caso critérios de ranking pareçam caixa-preta"],
      "crm-p5-b": ["Desperdício de fechamentos rápidos enquanto contratos lentos travam atenção"],
    },
    qaLinkedProblems: {
      "crm-qa-1": ["P-01", "P-03", "P-04"],
      "crm-qa-2": ["P-02", "P-03"],
      "crm-qa-3": ["P-03"],
      "crm-qa-4": ["P-01"],
      "crm-qa-5": ["P-04"],
      "crm-qa-6": ["P-01", "P-05"],
    },
    extraQaScenario: {
      id: "crm-qa-7",
      category: "loading_and_error",
      title: "Carregamento & Erro — Skeleton de colunas no Kanban e fallback de drag-and-drop em falha de rede",
      scenarioDescription:
        "Painel carrega 100+ oportunidades em filtros combinados ou falha requisição ao mover card entre estágios.",
      expectedUiState:
        "Kanban exibe esqueleto proporcional sem salto visual; se mover falhar na API, card retorna à coluna anterior com aviso de erro.",
      givenWhenThen:
        "Dado erro 500 ao persistir mudança de coluna no Kanban, Então atualização otimista reverte para coluna original com toast recuperável.",
      recommendedCriticality: "essential",
      linkedProblemCodes: ["P-02", "P-05"],
    },
  },
};
