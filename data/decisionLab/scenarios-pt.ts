import type { DecisionScenarioConfig } from "./types";

export const SCENARIOS_PT: DecisionScenarioConfig[] = [
  // =========================================================================
  // CENÁRIO 01 — PDV: Operação de vendas em um ponto de venda
  // =========================================================================
  {
    id: "pdv-sales-operation",
    code: "DL-01",
    domain: "Varejo & Frente de Caixa (PDV)",
    originTag: "Cenário Didático • ERP / PDV",
    name: "Operação de vendas em um ponto de venda",
    dilemma:
      "Como manter fluidez no atendimento em horários de pico preservando integridade de estoque, dados fiscais e clareza operacional quando ocorrem falhas ou gargalos?",
    businessContext: {
      overview:
        "Uma operação comercial utiliza um sistema de PDV integrado ao ERP para registrar vendas no balcão, processar pagamentos e atualizar informações fiscais e de estoque. Durante picos de movimento, gargalos técnicos e fluxos rígidos comprometem a velocidade do caixa e a confiabilidade dos dados.",
      operationScale:
        "Múltiplos caixas operando simultaneamente • Pico entre 11h e 18h • Integração em tempo real com estoque e autorizador fiscal",
      stakeholders: [
        "Operador de Caixa",
        "Supervisor de Loja",
        "Time Fiscal / Contábil",
        "Cliente no Balcão",
      ],
      constraints: [
        "Cada item e fechamento precisam refletir regras fiscais corretas e movimentação de estoque rastreável",
        "Caixa operando com teclado sob pressão física de fila não pode depender de modais excessivos",
        "Falhas de rede não podem duplicar baixas no estoque nem deixar vendas sem registro auditável",
      ],
      keyMetricsWatch: [
        "Tempo de finalização no balcão",
        "Inconsistências entre estoque físico e sistema",
        "Rejeições fiscais pós-venda",
      ],
    },
    problems: [
      {
        id: "pdv-p1",
        code: "P-01",
        title: "Lentidão durante o fechamento da venda",
        symptom:
          "Após confirmar pagamento, a tela trava esperando validações síncronas em cadeia (estoque central, fiscal e recibo), formando fila física.",
        userImpactDetail:
          "Operador fica sem saber se o comando foi aceito, gerando ansiedade e pressionando teclas repetidas.",
        operationalImpactDetail:
          "Paralisa o atendimento do balcão exatamente nos horários de maior movimento da loja.",
        evidenceCue: "Tempo de espera concentrado na etapa final de confirmação do pagamento.",
        scores: {
          userImpact: 5,
          operationalImpact: 5,
          frequency: 5,
          businessRisk: 4,
          implementationEffort: 4,
        },
        alternatives: [
          {
            id: "pdv-p1-a",
            label: "A",
            title: "Manter bloqueio síncrono apenas com barra de progresso explícita",
            description:
              "O terminal continua esperando resposta completa de todos os serviços antes de liberar o caixa, adicionando spinner com mensagem de etapa.",
            expectedBenefit: "Baixo risco de inconsistência imediata porque nada avança antes da confirmação.",
            limitation: "Não resolve o tempo de fila física nem protege contra latência externa.",
            userImpact: "Reduz dúvidas visuais, mas mantém o operador parado aguardando.",
            operationalImpact: "Fila no balcão continua crescendo quando há picos de latência.",
            estimatedComplexity: "Baixa",
            dependencies: ["Atualização leve de feedback visual no PDV"],
            consequenceAnalysis:
              "Decidir apenas por feedback visual alivia a incerteza sobre o clique, porém o problema operacional de fila persiste sempre que a rede oscila.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -1,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -1,
              easeVsTraceability: -1,
            },
          },
          {
            id: "pdv-p1-b",
            label: "B",
            title: "Processamento assíncrono em fila local com chave de idempotência",
            description:
              "Validação cadastral pré-checada em cache, fechamento imediato no balcão com trava contra duplo envio e sincronização fiscal assíncrona em segundo plano.",
            expectedBenefit:
              "Libera o próximo atendimento rapidamente e evita travamento de fila mantendo rastreabilidade.",
            limitation:
              "Requer controle de fila local no terminal e fluxo de reconciliação na retaguarda para eventuais exceções.",
            userImpact: "Fluxo ágil por teclado sem interromper a cadência de atendimento.",
            operationalImpact: "Elimina o bloqueio físico no caixa mesmo sob latência de rede.",
            estimatedComplexity: "Alta",
            dependencies: ["Fila local transacional", "Chave de idempotência na API", "Monitoramento na retaguarda"],
            consequenceAnalysis:
              "Você priorizou continuidade de atendimento sob restrições de engenharia mais altas: o caixa não trava, mas engenharia e suporte passam a depender de uma fila de reconciliação robusta.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: 1,
              easeVsTraceability: 0,
            },
            isReferenceChoice: true,
          },
          {
            id: "pdv-p1-c",
            label: "C",
            title: "Remover checagens fiscais e de estoque do fechamento no PDV",
            description:
              "O caixa registra apenas valor pago e imprime comprovante provisório, deixando validação tributária para lote noturno.",
            expectedBenefit: "Finalização quase instantânea e implantação rápida na UI.",
            limitation: "Aumenta fortemente rejeições fiscais descobertas horas depois e divergências em produtos com último saldo.",
            userImpact: "Caixa rápido hoje, mas gera cobrança e retrabalho ao time fiscal no dia seguinte.",
            operationalImpact: "Transfere gargalos do balcão para a conciliação noturna.",
            estimatedComplexity: "Média",
            dependencies: ["Rotina de processamento em lote noturno"],
            consequenceAnalysis:
              "Escolher velocidade pura sacrificando validação reduz o tempo no balcão, mas cria risco alto de passivo tributário e estoque negativo em itens críticos.",
            tradeOffShift: {
              speedVsValidation: 2,
              flexibilityVsControl: 2,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 2,
              easeVsTraceability: -2,
            },
          },
        ],
      },
      {
        id: "pdv-p2",
        code: "P-02",
        title: "Falhas temporárias de comunicação",
        symptom:
          "Oscilações de internet ou indisponibilidade do autorizador fazem o PDV perder estado ou cancelar a tela no meio da venda.",
        userImpactDetail:
          "Operador precisa redigitar todos os produtos do carrinho após queda momentânea de sinal.",
        operationalImpactDetail:
          "Gera desistência no caixa, filas paralisadas e risco de venda lançada em duplicidade na reconexão.",
        evidenceCue: "Quedas intermitentes levam operadores a recarregar o aplicativo manualmente.",
        scores: {
          userImpact: 5,
          operationalImpact: 5,
          frequency: 4,
          businessRisk: 5,
          implementationEffort: 4,
        },
        alternatives: [
          {
            id: "pdv-p2-a",
            label: "A",
            title: "Modo contingência explícito com preservação do carrinho e reenvio idempotente",
            description:
              "Ao detectar timeout ou offline, o sistema preserva todos os itens, sinaliza 'Contingência Ativa' em barra superior e coloca a venda na fila segura de envio.",
            expectedBenefit:
              "Zero perda de itens digitados e continuidade operacional com visibilidade clara ao supervisor.",
            limitation: "Exige regras claras para expiração do lote em contingência e tratamento de reenvio.",
            userImpact: "Evita redigitação de carrinho inteiro sob pressão de clientes na fila.",
            operationalImpact: "Sustenta a loja aberta durante quedas curtas sem abrir planilhas paralelas.",
            estimatedComplexity: "Alta",
            dependencies: ["Persistência local segura da venda", "Mecanismo de retry idempotente"],
            consequenceAnalysis:
              "A continuidade operacional preservando o carrinho impede vendas paralelas em papel/planilha, embora obrigue um contrato de retry seguro para não duplicar transações.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 0,
              simplicityVsDensity: -1,
              autonomyVsGovernance: 0,
              easeVsTraceability: 0,
            },
            isReferenceChoice: true,
          },
          {
            id: "pdv-p2-b",
            label: "B",
            title: "Preservar apenas rascunho local e bloquear fechamento até sinal voltar",
            description:
              "O sistema mantém os itens na tela em rascunho, mas desabilita o botão de concluir venda enquanto o ping externo falhar.",
            expectedBenefit: "Impede emissão em contingência fora da comunicação principal.",
            limitation: "Se a conexão cair por 20 minutos, o caixa para completamente mesmo com dinheiro/maquininha disponível.",
            userImpact: "Não perde os produtos digitados, mas força o cliente a aguardar restabelecimento da rede.",
            operationalImpact: "Bloqueia faturamento presencial durante oscilações mais longas.",
            estimatedComplexity: "Média",
            dependencies: ["Rascunho de sessão no navegador/desktop"],
            consequenceAnalysis:
              "Priorizar governança estrita contra offline protege contra lotes pendentes, mas aceita o risco de paralisar o faturamento da loja em quedas moderadas.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
          },
          {
            id: "pdv-p2-c",
            label: "C",
            title: "Retentativa silenciosa infinita sem avisar o operador",
            description:
              "Em caso de falha de rede, o sistema tenta reconectar em loop infinito sem alterar a interface.",
            expectedBenefit: "Não exige desenhar novos estados de UI de contingência.",
            limitation: "Operador não entende por que o caixa travou e fecha o navegador, perdendo dados.",
            userImpact: "Frustração elevada pela falta total de feedback de erro acionável.",
            operationalImpact: "Multiplica acionamentos ao suporte técnico.",
            estimatedComplexity: "Baixa",
            dependencies: ["Loop de retry existente"],
            consequenceAnalysis:
              "Esconder a falha de comunicação atrás de silêncio da UI gera mais erro humano do que o próprio erro técnico.",
            tradeOffShift: {
              speedVsValidation: 0,
              flexibilityVsControl: 1,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 1,
              easeVsTraceability: -2,
            },
          },
        ],
      },
      {
        id: "pdv-p3",
        code: "P-03",
        title: "Divergências entre estoque e vendas",
        symptom:
          "Dois caixas vendem a última unidade ao mesmo tempo ou vendas canceladas demoram a estornar saldo corretamente.",
        userImpactDetail:
          "Vendedor promete produto que o sistema mostra disponível, mas não existe na prateleira física.",
        operationalImpactDetail:
          "Gera cancelamentos constrangedores após pagamento e furos constantes de inventário.",
        evidenceCue: "Conferência física aponta saldo divergente logo após finais de semana movimentados.",
        scores: {
          userImpact: 4,
          operationalImpact: 4,
          frequency: 3,
          businessRisk: 5,
          implementationEffort: 4,
        },
        alternatives: [
          {
            id: "pdv-p3-a",
            label: "A",
            title: "Reserva temporária no pedido + alerta explícito de baixo saldo em múltiplos caixas",
            description:
              "Ao incluir item com saldo <= 3 unidades, PDV sinaliza 'Últimas unidades' e reserva o item com expiração automática se o carrinho for abandonado.",
            expectedBenefit:
              "Evita venda duplicada da mesma peça em caixas vizinhos e dá transparência imediata ao vendedor.",
            limitation: "Exige controle de TTL de reserva para não prender estoque em vendas abandonadas.",
            userImpact: "Vendedor ganha confiança antes de fechar o pagamento com o cliente.",
            operationalImpact: "Reduz estornos pós-pagamento e furos entre estoque lógico e prateleira.",
            estimatedComplexity: "Alta",
            dependencies: ["Mecanismo de reserva com TTL", "Indicador visual de estoque crítico no PDV"],
            consequenceAnalysis:
              "Você escolheu prevenir o conflito na entrada do item com custo técnico moderado de expiração automática.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: -1,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "pdv-p3-b",
            label: "B",
            title: "Permitir venda livre com saldo negativo e tratar na contagem semanal",
            description:
              "PDV nunca bloqueia inclusão de item mesmo com saldo zerado ou em disputa, registrando apenas ajuste negativo para revisão posterior.",
            expectedBenefit: "Zero atrito no caixa para produtos cuja entrada fiscal ainda não foi lançada.",
            limitation: "Propaga erro de inventário por dias e distorce compras de reposição.",
            userImpact: "Alta flexibilidade ao operador sem paradas.",
            operationalImpact: "Acumula passivo de inventário difícil de auditar depois.",
            estimatedComplexity: "Baixa",
            dependencies: ["Relatório de estoque negativo na retaguarda"],
            consequenceAnalysis:
              "Privilegiar autonomia total no balcão mantém vendas ativas mesmo sem nota lançada, mas agrava furos recorrentes de estoque.",
            tradeOffShift: {
              speedVsValidation: 2,
              flexibilityVsControl: 2,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 2,
              easeVsTraceability: -2,
            },
          },
        ],
      },
      {
        id: "pdv-p4",
        code: "P-04",
        title: "Informações fiscais incompletas",
        symptom:
          "Produtos novos chegam ao balcão sem NCM/CFOP válido, bloqueando o cupom fiscal apenas na frente do cliente.",
        userImpactDetail:
          "Operador de caixa não domina siglas tributárias e não sabe corrigir código fiscal bloqueante.",
        operationalImpactDetail:
          "Venda fica parada esperando o departamento fiscal responder por telefone ou WhatsApp.",
        evidenceCue: "Erro tributário explode somente no clique final de pagamento.",
        scores: {
          userImpact: 4,
          operationalImpact: 4,
          frequency: 3,
          businessRisk: 5,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "pdv-p4-a",
            label: "A",
            title: "Pré-checagem fiscal ao bipar o item + bloqueio preventivo de cadastro incompleto",
            description:
              "Sistema valida elegibilidade fiscal no cadastro/entrada da nota e alerta imediatamente ao bipar item no PDV antes do pagamento.",
            expectedBenefit:
              "Evita descoberta tardia com o cliente já com cartão na maquininha e impede produto sem regra fiscal na venda.",
            limitation: "Pode exigir fluxo rápido de saneamento na entrada de mercadorias.",
            userImpact: "Operador identifica em segundos que o item precisa liberação cadastral antes de fechar venda.",
            operationalImpact: "Move a correção tributária para quem entende a regra (retaguarda/cadastro).",
            estimatedComplexity: "Média",
            dependencies: ["Validação fiscal no cadastro de produto", "Status de item apto para PDV"],
            consequenceAnalysis:
              "Mover a validação para a origem do produto evita constrangimento no balcão sem exigir conhecimento tributário do operador.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "pdv-p4-b",
            label: "B",
            title: "Abrir modal editável para o operador escolher CFOP/alíquota no caixa",
            description:
              "Quando falta dado fiscal, o PDV exibe combo tributário diretamente na tela do operador para preenchimento manual.",
            expectedBenefit: "Desbloqueia a venda localmente sem depender de outro setor.",
            limitation: "Alta probabilidade de erro tributário grave por pessoa sem treinamento fiscal.",
            userImpact: "Exige decisão técnica complexa de quem só deveria operar o caixa.",
            operationalImpact: "Multiplica cartas de correção e autuações posteriores.",
            estimatedComplexity: "Baixa",
            dependencies: ["Select de regras fiscais no PDV"],
            consequenceAnalysis:
              "Dar controle fiscal ao caixa destrava o momento imediato ao custo de expor a empresa a preenchimento incorreto de tributos.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 2,
              simplicityVsDensity: -2,
              autonomyVsGovernance: 2,
              easeVsTraceability: -1,
            },
          },
        ],
      },
      {
        id: "pdv-p5",
        code: "P-05",
        title: "Dificuldade para identificar erros de operação",
        symptom:
          "Erros retornam apenas mensagens técnicas genéricas como 'Erro 500' ou XML técnico sem orientação do próximo passo.",
        userImpactDetail:
          "Operador não sabe se deve tentar novamente, conferir dados do cliente ou acionar o supervisor.",
        operationalImpactDetail:
          "Aumenta chamados urgentes de suporte e tentativas repetidas que duplicam erros.",
        evidenceCue: "Mensagens de sistema reproduzem retornos crus de API.",
        scores: {
          userImpact: 5,
          operationalImpact: 4,
          frequency: 4,
          businessRisk: 3,
          implementationEffort: 2,
        },
        alternatives: [
          {
            id: "pdv-p5-a",
            label: "A",
            title: "Mensagens orientadas à ação humana + detalhe técnico colapsável",
            description:
              "Traduz códigos críticos em título claro, explicação curta do motivo, ação segura sugerida e acordeão opcional com payload para suporte.",
            expectedBenefit:
              "Alta resolubilidade rápida com implementação enxuta de interface e tradução de erros.",
            limitation: "Requer catálogo mapeado dos códigos de rejeição mais comuns.",
            userImpact: "Empodera operador e supervisor para agir com calma e precisão.",
            operationalImpact: "Encurta ligações ao suporte por entregar o contexto completo em 1 clique.",
            estimatedComplexity: "Baixa",
            dependencies: ["Dicionário de mapeamento erro técnico → mensagem acionável"],
            consequenceAnalysis:
              "Traduzir o erro sem esconder o código técnico para suporte entrega alto valor rápido com baixo esforço de engenharia.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 0,
              simplicityVsDensity: 1,
              autonomyVsGovernance: 0,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "pdv-p5-b",
            label: "B",
            title: "Substituir erros por modal padrão único dizendo apenas 'Contate o suporte'",
            description:
              "Padroniza todas as falhas sob um único aviso genérico orientando acionar TI externa.",
            expectedBenefit: "Implementação quase imediata e zero exposição de termos técnicos.",
            limitation: "Operador não consegue resolver erros triviais (ex.: CPF inválido ou limite do terminal).",
            userImpact: "Sensação de impotência diante de qualquer tropeço simples.",
            operationalImpact: "Satura fila de suporte com incidentes banais.",
            estimatedComplexity: "Baixa",
            dependencies: ["Nenhuma"],
            consequenceAnalysis:
              "Simplificar mensagens ao extremo remove complexidade visual, mas remove também a capacidade de reação autônoma da loja.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -1,
              simplicityVsDensity: 2,
              autonomyVsGovernance: -2,
              easeVsTraceability: -2,
            },
          },
        ],
      },
    ],
    tradeOffAxes: [
      {
        id: "speedVsValidation",
        leftPole: "Validação Rígida Síncrona",
        rightPole: "Velocidade no Balcão",
        criteriaNote: "Mede se validações fiscais/estoque bloqueiam a fila ou rodam de forma resiliente.",
      },
      {
        id: "flexibilityVsControl",
        leftPole: "Controle Preventivo",
        rightPole: "Flexibilidade Operacional",
        criteriaNote: "Define o quanto o caixa pode contornar exceções sem travar vendas.",
      },
      {
        id: "simplicityVsDensity",
        leftPole: "Densidade Diagnóstica",
        rightPole: "Simplicidade Visual",
        criteriaNote: "Equilíbrio entre tela enxuta de balcão e contexto suficiente em falhas.",
      },
      {
        id: "autonomyVsGovernance",
        leftPole: "Governança Fiscal/Estoque",
        rightPole: "Autonomia do Operador",
        criteriaNote: "Quem delibera sobre exceções tributárias e saldo divergente.",
      },
      {
        id: "easeVsTraceability",
        leftPole: "Rastreabilidade Completa",
        rightPole: "Atalho Imediato",
        criteriaNote: "Capacidade de auditar cada transação versus rapidez sem registro.",
      },
    ],
    qaScenarios: [
      {
        id: "pdv-qa-1",
        category: "normal_operation",
        title: "Operação Normal — Venda com múltiplos itens e confirmação via teclado",
        scenarioDescription:
          "Operador bipa produtos com saldo disponível, escolhe pagamento e confirma fechamento sem falhas externas.",
        expectedUiState: "Recibo confirmado em tempo ágil, saldo deduzido uma única vez e cursor pronto para próxima venda.",
        givenWhenThen: "Dado estoque disponível e rede estável, Quando operador confirma fechamento (F12), Então venda é concluída sem necessidade de mouse.",
        recommendedCriticality: "essential",
      },
      {
        id: "pdv-qa-2",
        category: "missing_required",
        title: "Campo Obrigatório Ausente — Item sem NCM/CFOP ou pagamento não selecionado",
        scenarioDescription:
          "Tentativa de finalizar venda contendo produto recém-cadastrado sem regra fiscal ou ausência de forma de pagamento.",
        expectedUiState: "Alerta claro antes da cobrança apontando exatamente o item ou campo pendente com foco direcionado.",
        givenWhenThen: "Dado item sem regra fiscal válida, Quando incluído ou na pré-validação, Então UI bloqueia emissão e informa a correção necessária.",
        recommendedCriticality: "essential",
      },
      {
        id: "pdv-qa-3",
        category: "communication_failure",
        title: "Falha de Comunicação — Timeout ou queda momentânea da rede no fechamento",
        scenarioDescription:
          "Rede ou autorizador externo excede timeout logo após confirmação do recebimento no balcão.",
        expectedUiState: "Carrinho preservado, banner de 'Contingência Ativa' visível, fila local enfileirada e caixa liberado sem recarregar página.",
        givenWhenThen: "Dado timeout > limite definido no autorizador, Quando pagamento for confirmado, Então pedido entra em fila segura com status SYNC_PENDING.",
        recommendedCriticality: "essential",
      },
      {
        id: "pdv-qa-4",
        category: "unauthorized_user",
        title: "Usuário Sem Permissão — Desconto ou cancelamento acima da alçada do operador",
        scenarioDescription:
          "Operador tenta aplicar desconto superior ao limite permitido para seu perfil ou cancelar cupom finalizado.",
        expectedUiState: "Modal solicita credencial de autorização do supervisor mantendo itens da venda intactos na tela.",
        givenWhenThen: "Dado desconto > limite do perfil Operador, Quando aplicado, Então sistema solicita elevação auditada sem perder o carrinho.",
        recommendedCriticality: "recommended",
      },
      {
        id: "pdv-qa-5",
        category: "inconsistent_data",
        title: "Dados Inconsistentes — Última unidade vendida simultaneamente em outro terminal",
        scenarioDescription:
          "Dois operadores iniciam venda do mesmo SKU com apenas 1 unidade remanescente em estoque.",
        expectedUiState: "Segundo terminal recebe aviso claro do conflito de reserva antes de cobrar o cliente.",
        givenWhenThen: "Quando terminal A reserva a última unidade, Então terminal B exibe conflito de saldo antes da etapa de pagamento.",
        recommendedCriticality: "recommended",
      },
      {
        id: "pdv-qa-6",
        category: "duplicate_operation",
        title: "Operação Duplicada — Duplo acionamento de tecla Enter/F12 durante envio",
        scenarioDescription:
          "Sob ansiedade da fila, operador pressiona atalho de conclusão duas vezes em intervalo < 300ms.",
        expectedUiState: "Botão assume estado processando e segunda chamada retorna mesma transação idempotente sem duplicar baixa.",
        givenWhenThen: "Dado envio em andamento com mesma chave de idempotência, Quando F12 é pressionado novamente, Então sistema ignora segundo submit.",
        recommendedCriticality: "essential",
      },
    ],
    referenceStrategy: {
      recommendedProblemIds: ["pdv-p1", "pdv-p2", "pdv-p5"],
      title: "Estabilizar Continuidade no Caixa e Visibilidade de Falhas Primeiro",
      summary:
        "Em operação de balcão com fila física, garantir que o fechamento não trave (P-01), não perca dados em quedas (P-02) e oriente o operador em erros (P-05) destrava a linha de frente antes de evoluções estruturais de reserva simultânea.",
      reasoning: [
        "P-01 e P-02 têm frequência diária máxima nos horários de pico e protegem tanto a experiência do cliente presencial quanto a consistência transacional.",
        "P-05 entrega alto alívio ao operador e reduz chamados ao suporte com esforço de engenharia baixo.",
        "P-03 e P-04 permanecem relevantes como segunda onda para saneamento preventivo em estoque multi-terminal e cadastro.",
      ],
    },
    relatedCaseSlug: "erp-enterprise-redesign",
    relatedCaseLabel: "Ver Case Real ERP [01] (NDA-Safe)",
  },

  // =========================================================================
  // CENÁRIO 02 — ERP DE ESTOQUE: Divergência de movimentações de estoque
  // =========================================================================
  {
    id: "erp-inventory-traceability",
    code: "DL-02",
    domain: "ERP Corporativo & Logística",
    originTag: "Cenário Didático • ERP / Estoque",
    name: "Divergência de movimentações de estoque",
    dilemma:
      "Como conciliar agilidade para operadores de almoxarifado e lojas sem perder controle de permissões, histórico claro e rastreabilidade auditável das movimentações?",
    businessContext: {
      overview:
        "Uma empresa opera múltiplas filiais e centros de distribuição com vários usuários realizando entradas de compra, saídas de venda, transferências internas e ajustes manuais de inventário. Divergências recorrentes geram desconfiança no sistema.",
      operationScale:
        "Múltiplos almoxarifados e turnos • Centenas de SKUs movimentados por dia • Impacto direto em compras e atendimento comercial",
      stakeholders: [
        "Conferente / Estoquista",
        "Comprador de Suprimentos",
        "Auditor / Gerente Operacional",
        "Vendedor / Faturamento",
      ],
      constraints: [
        "Ajustes manuais sem justificativa distorcem custo médio, margem e compras automáticas",
        "Fluxo de conferência no depósito não pode exigir navegação por cinco telas para registrar uma movimentação",
        "Qualquer alteração crítica precisa identificar quem executou, quando e a partir de qual documento",
      ],
      keyMetricsWatch: [
        "Divergência entre saldo físico e sistema",
        "Tempo para investigar a origem de um furo",
        "Volume de ajustes manuais sem motivo",
      ],
    },
    problems: [
      {
        id: "inv-p1",
        code: "P-01",
        title: "Divergência entre estoque físico e sistema",
        symptom:
          "O ERP aponta unidades disponíveis que não estão na prateleira ou bloqueia vendas por saldo zerado após entradas físicas ainda não conferidas.",
        userImpactDetail:
          "Vendedores e compradores perdem confiança no saldo exibido e passam a conferir prateleiras manualmente.",
        operationalImpactDetail:
          "Compras emergenciais erradas e rupturas não detectadas a tempo.",
        evidenceCue: "Contagens cíclicas apontam desvios recorrentes entre saldo lógico e físico.",
        scores: {
          userImpact: 5,
          operationalImpact: 5,
          frequency: 4,
          businessRisk: 5,
          implementationEffort: 4,
        },
        alternatives: [
          {
            id: "inv-p1-a",
            label: "A",
            title: "Separar estados de saldo (Físico, Reservado, Em Transferência e Pendente)",
            description:
              "Em vez de um número único opaco, o sistema separa saldo livre para venda daquilo que está reservado, em trânsito ou aguardando conferência.",
            expectedBenefit:
              "Elimina ambiguidade sobre por que um produto existe no galpão mas não pode ser faturado ainda.",
            limitation: "Aumenta densidade informacional da tela se não houver hierarquia clara.",
            userImpact: "Comprador e vendedor entendem exatamente onde está cada unidade.",
            operationalImpact: "Previne vendas sobre peças já empenhadas em outro pedido.",
            estimatedComplexity: "Alta",
            dependencies: ["Modelo de saldo composto por estado", "Redesenho da leitura rápida no card/grade"],
            consequenceAnalysis:
              "Você priorizou precisão conceitual do estoque exigindo cuidado de UI para não sobrecarregar a leitura básica.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -1,
              simplicityVsDensity: -2,
              autonomyVsGovernance: -1,
              easeVsTraceability: -2,
            },
            isReferenceChoice: true,
          },
          {
            id: "inv-p1-b",
            label: "B",
            title: "Botão rápido de 'Acerto Imediato' liberado na tela de consulta",
            description:
              "Qualquer operador pode digitar rapidamente a nova quantidade vista na prateleira e sobrescrever o saldo.",
            expectedBenefit: "Correção visual instantânea sem etapas burocráticas.",
            limitation: "Mascara erros reais de processo (perda, furto, nota não lançada) sob ajustes constantes.",
            userImpact: "Parece ágil no curto prazo, mas perpetua confusão entre turnos.",
            operationalImpact: "Destrói confiabilidade do custo médio e histórico.",
            estimatedComplexity: "Baixa",
            dependencies: ["Endpoint direto de atualização de saldo"],
            consequenceAnalysis:
              "Privilegiar facilidade irrestrita para sobrescrever saldo transforma o ERP em uma planilha sem memória confiável.",
            tradeOffShift: {
              speedVsValidation: 2,
              flexibilityVsControl: 2,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 2,
              easeVsTraceability: 2,
            },
          },
        ],
      },
      {
        id: "inv-p2",
        code: "P-02",
        title: "Falta de rastreabilidade",
        symptom:
          "Quando o saldo muda abruptamente, ninguém consegue ligar o ajuste a um pedido, transferência entre lojas ou inventário.",
        userImpactDetail:
          "Gestor gasta horas cruzando relatórios separados para tentar descobrir o que mexeu no SKU.",
        operationalImpactDetail:
          "Impede auditoria contábil limpa e atrasa fechamentos mensais.",
        evidenceCue: "Movimentações registradas apenas como 'Ajuste Manual' sem vínculo de origem.",
        scores: {
          userImpact: 4,
          operationalImpact: 5,
          frequency: 4,
          businessRisk: 5,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "inv-p2-a",
            label: "A",
            title: "Trilha imutável obrigando motivo categorizado e documento de vínculo",
            description:
              "Todo ajuste ou transferência exige motivo pré-tipado (Avaria, Contagem, Troca), justificativa curta e vínculo ao pedido/NF quando aplicável.",
            expectedBenefit:
              "Cada alteração conta uma história completa sem impedir operações legítimas do depósito.",
            limitation: "Adiciona 1 passo de seleção ao operador em ajustes manuais.",
            userImpact: "Reduz drásticamente tempo de investigação por gestores e auditoria.",
            operationalImpact: "Cria histórico consultável para corrigir causas raízes de perda.",
            estimatedComplexity: "Média",
            dependencies: ["Catálogo de motivos padronizados", "Tabela append-only de movimentações"],
            consequenceAnalysis:
              "Exigir motivo estruturado adiciona micro-fricção apenas nas exceções (ajustes manuais) enquanto entrega rastreabilidade auditável completa.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -2,
              simplicityVsDensity: 0,
              autonomyVsGovernance: -2,
              easeVsTraceability: -2,
            },
            isReferenceChoice: true,
          },
          {
            id: "inv-p2-b",
            label: "B",
            title: "Campo de observação textual opcional sem validação",
            description:
              "Mantém campo aberto opcional onde o usuário pode digitar o motivo apenas se quiser.",
            expectedBenefit: "Não gera resistência inicial nos usuários operacionais.",
            limitation: "Na prática diária, campos opcionais terminam vazios ou com textos como 'ok' / 'ajuste'.",
            userImpact: "Mantém a agilidade do lançador mas perpetua a cegueira de auditoria.",
            operationalImpact: "Falha no objetivo de descobrir origem de divergências.",
            estimatedComplexity: "Baixa",
            dependencies: ["Campo texto simples"],
            consequenceAnalysis:
              "Deixar justificativa opcional parece amigável na UI, mas quase sempre fracassa em rotina sob pressão operacional.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: 2,
              easeVsTraceability: 2,
            },
          },
        ],
      },
      {
        id: "inv-p3",
        code: "P-03",
        title: "Permissões inadequadas",
        symptom:
          "Todos os usuários com acesso ao módulo conseguem realizar ajustes de grande volume ou alterar saldos de qualquer filial.",
        userImpactDetail:
          "Estoquistas têm receio de clicar em ações erradas por não saber o escopo de sua permissão.",
        operationalImpactDetail:
          "Risco elevado de ajustes acidentais entre filiais e ausência de alçadas de aprovação.",
        evidenceCue: "Usuários operacionais executando estornos administrativos por engano.",
        scores: {
          userImpact: 3,
          operationalImpact: 4,
          frequency: 3,
          businessRisk: 5,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "inv-p3-a",
            label: "A",
            title: "Perfis por papel e filial + aprovação para ajustes acima do teto",
            description:
              "Restringe operações por depósito atribuído; pequenos ajustes rotineiros seguem diretos para conferentes, enquanto desvios altos exigem aprovação de gestor.",
            expectedBenefit:
              "Protege integridade entre filiais sem engessar a rotina operacional de baixa criticidade.",
            limitation: "Exige configuração prévia de papéis e fila clara de aprovação no módulo.",
            userImpact: "UI mostra somente ações pertinentes à filial e função do usuário.",
            operationalImpact: "Elimina alterações acidentais entre filiais.",
            estimatedComplexity: "Média",
            dependencies: ["Matriz RBAC por filial", "Fluxo de aprovação por valor/quantidade"],
            consequenceAnalysis:
              "Calibrar governança por perfil e teto evita tanto o caos total quanto burocracia em pequenos acertos.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "inv-p3-b",
            label: "B",
            title: "Bloquear qualquer ajuste manual para toda a loja, centralizando em 1 supervisor",
            description:
              "Somente um usuário administrador central pode aprovar e digitar qualquer correção de saldo.",
            expectedBenefit: "Controle centralizado rígido.",
            limitation: "Cria fila gargalo no supervisor e incentiva contornos informais fora do sistema.",
            userImpact: "Operação espera horas para corrigir avaria óbvia de 1 item.",
            operationalImpact: "Atrasa faturamento e contagens por gargalo único.",
            estimatedComplexity: "Baixa",
            dependencies: ["Bloqueio simples por flag isAdmin"],
            consequenceAnalysis:
              "Centralização extrema maximiza controle teórico, mas costuma gerar gargalo severo e planilhas paralelas na loja.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
          },
        ],
      },
      {
        id: "inv-p4",
        code: "P-04",
        title: "Histórico pouco compreensível",
        symptom:
          "A aba de movimentações exibe tabela crua com códigos internos (`TIPO_MOV_42`, IDs numéricos) difíceis de interpretar.",
        userImpactDetail:
          "Usuários não conseguem ler o extrato do produto sem ajuda do suporte para traduzir siglas.",
        operationalImpactDetail:
          "Prolonga reuniões de conciliação e gera interpretações erradas sobre entradas vs saídas.",
        evidenceCue: "Extrato de estoque usa jargão técnico de banco de dados na UI.",
        scores: {
          userImpact: 5,
          operationalImpact: 4,
          frequency: 5,
          businessRisk: 3,
          implementationEffort: 2,
        },
        alternatives: [
          {
            id: "inv-p4-a",
            label: "A",
            title: "Timeline legível com tipo visual (+ / -), saldo resultante e link ao documento",
            description:
              "Traduz códigos em rótulos claros ('Entrada NF #402', 'Transferência CD → Loja 2'), destacando variação (+10 / -2), saldo final após cada evento e autor.",
            expectedBenefit:
              "Qualquer perfil lê o extrato em segundos com baixíssimo custo de implementação visual.",
            limitation: "Requer padronização dos nomes de eventos no back-end ou camada de apresentação.",
            userImpact: "Reduz drasticamente dúvidas recorrentes e erros de leitura de histórico.",
            operationalImpact: "Acelera conferência diária de estoque sem dependência de TI.",
            estimatedComplexity: "Baixa",
            dependencies: ["Dicionário semântico de tipos de movimentação", "Cálculo de saldo progressivo"],
            consequenceAnalysis:
              "Transformar códigos crus em extrato bancário legível do produto é um ganho de altíssimo retorno com baixo esforço técnico.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 0,
              simplicityVsDensity: 1,
              autonomyVsGovernance: 0,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "inv-p4-b",
            label: "B",
            title: "Manter tabela atual e exportar CSV completo para análise em Excel",
            description:
              "Adiciona botão 'Exportar CSV' para que o gestor monte seus próprios filtros em planilha externa.",
            expectedBenefit: "Flexibilidade analítica fora do ERP.",
            limitation: "Não resolve a leitura dentro do sistema no momento do atendimento.",
            userImpact: "Força troca de ferramenta para tarefa rotineira.",
            operationalImpact: "Mantém dependência de planilhas paralelas.",
            estimatedComplexity: "Baixa",
            dependencies: ["Exportador CSV"],
            consequenceAnalysis:
              "Exportar para Excel ajuda analistas em fechamento, mas não resolve a usabilidade diária dentro do ERP.",
            tradeOffShift: {
              speedVsValidation: 0,
              flexibilityVsControl: 1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: 1,
              easeVsTraceability: 0,
            },
          },
        ],
      },
      {
        id: "inv-p5",
        code: "P-05",
        title: "Dificuldade para identificar a origem de alterações",
        symptom:
          "Vários usuários usam terminais compartilhados ou integrações automáticas sem distinguir se a baixa veio de operador humano, API ou rotina em lote.",
        userImpactDetail:
          "Suporte e gerentes não conseguem distinguir falha humana de erro de sincronização de integração.",
        operationalImpactDetail:
          "Retrabalho na apuração de responsabilidades e dificuldade para corrigir bugs recorrentes.",
        evidenceCue: "Registros aparecem atribuídos a usuário genérico de sistema ou terminal.",
        scores: {
          userImpact: 3,
          operationalImpact: 4,
          frequency: 3,
          businessRisk: 4,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "inv-p5-a",
            label: "A",
            title: "Assinatura obrigatória de origem (Usuário + Canal/Integração + Terminal)",
            description:
              "Cada movimento grava ator nominal (ou integração identificada), canal de origem (PDV, Balcão, Inventário App, E-commerce) e timestamp exato.",
            expectedBenefit:
              "Separa instantaneamente falhas de integração externa de ações manuais em loja.",
            limitation: "Exige eliminar logins compartilhados em terminais de depósito.",
            userImpact: "Traz segurança justa aos operadores e clareza técnica ao suporte.",
            operationalImpact: "Acelera diagnóstico de bugs em integrações multicanal.",
            estimatedComplexity: "Média",
            dependencies: ["Sessão individual rápida por PIN/Crachá", "Metadados de origem na trilha"],
            consequenceAnalysis:
              "Identificar canal + responsável protege inclusive os próprios operadores ao separar falhas de API de erros manuais.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: -1,
              easeVsTraceability: -2,
            },
            isReferenceChoice: true,
          },
          {
            id: "inv-p5-b",
            label: "B",
            title: "Registrar apenas IP da máquina mantendo login único de setor",
            description:
              "Salva endereço de rede do terminal sem autenticar usuário individual.",
            expectedBenefit: "Zero atrito para troca de operador no mesmo balcão.",
            limitation: "Em turno compartilhado, o IP não identifica qual pessoa ou processo executou o ajuste.",
            userImpact: "Login ágil sem digitação extra.",
            operationalImpact: "Mantém lacuna de auditoria em turnos alternados.",
            estimatedComplexity: "Baixa",
            dependencies: ["Captura de IP na requisição"],
            consequenceAnalysis:
              "Registrar somente terminal agiliza acesso compartilhado, mas compromete responsabilização individual em desvios críticos.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 2,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 2,
              easeVsTraceability: 2,
            },
          },
        ],
      },
    ],
    tradeOffAxes: [
      {
        id: "easeVsTraceability",
        leftPole: "Rastreabilidade Completa",
        rightPole: "Facilidade Imediata",
        criteriaNote: "Quanto esforço de preenchimento (motivo, documento) é pedido em nome da auditoria.",
      },
      {
        id: "autonomyVsGovernance",
        leftPole: "Governança & Alçadas",
        rightPole: "Autonomia da Equipe",
        criteriaNote: "Liberação direta por conferentes versus aprovação gerencial em desvios.",
      },
      {
        id: "simplicityVsDensity",
        leftPole: "Detalhamento de Estados",
        rightPole: "Leitura Enxuta",
        criteriaNote: "Saldo único simples versus visão separada de Físico, Reservado e Em Trânsito.",
      },
      {
        id: "flexibilityVsControl",
        leftPole: "Controle por Filial",
        rightPole: "Flexibilidade Cross-Loja",
        criteriaNote: "Restrição estrita por depósito atribuído versus operações amplas.",
      },
      {
        id: "speedVsValidation",
        leftPole: "Checagem Prévia",
        rightPole: "Registro Veloz",
        criteriaNote: "Prevenção antes da movimentação contra agilidade no lançamento.",
      },
    ],
    qaScenarios: [
      {
        id: "inv-qa-1",
        category: "normal_operation",
        title: "Operação Normal — Entrada de NF e consulta de extrato legível",
        scenarioDescription:
          "Usuário autorizado confere entrada de mercadoria e consulta histórico do SKU.",
        expectedUiState: "Extrato exibe entrada vinculada à NF, delta positivo, saldo atualizado e usuário nominal.",
        givenWhenThen: "Dado perfil autorizado, Quando entrada de NF é confirmada, Então movimentação grava documento, origem e novo saldo.",
        recommendedCriticality: "essential",
      },
      {
        id: "inv-qa-2",
        category: "missing_required",
        title: "Campo Obrigatório Ausente — Ajuste manual sem motivo categorizado",
        scenarioDescription:
          "Estoquista tenta concluir ajuste de perda/avaria sem selecionar motivo nem preencher observação exigida.",
        expectedUiState: "Formulário destaca campo de motivo obrigatório mantendo quantidade preenchida.",
        givenWhenThen: "Dado ajuste manual sem motivo selecionado, Quando submeter, Então UI impede gravação e foca campo pendente.",
        recommendedCriticality: "essential",
      },
      {
        id: "inv-qa-3",
        category: "communication_failure",
        title: "Falha de Comunicação — Timeout ao confirmar transferência entre filiais",
        scenarioDescription:
          "Queda de conexão ocorre exatamente ao transferir saldo do CD para a Loja 02.",
        expectedUiState: "Sistema exibe erro recuperável, preserva rascunho da lista de itens e garante que origem não perdeu saldo sem crédito no destino.",
        givenWhenThen: "Dado timeout em transferência, Então transação atômica evita débito isolado na origem e orienta reenvio seguro.",
        recommendedCriticality: "essential",
      },
      {
        id: "inv-qa-4",
        category: "unauthorized_user",
        title: "Usuário Sem Permissão — Tentativa de ajuste em depósito de outra filial",
        scenarioDescription:
          "Operador da Loja 01 tenta ajustar inventário da Matriz ou exceder limite sem alçada.",
        expectedUiState: "Ação bloqueada ou redirecionada para fila de aprovação com justificativa clara de permissão.",
        givenWhenThen: "Dado operador sem permissão na filial alvo, Quando tentar ajuste, Então API retorna 403 e UI informa necessidade de alçada.",
        recommendedCriticality: "essential",
      },
      {
        id: "inv-qa-5",
        category: "inconsistent_data",
        title: "Dados Inconsistentes — Transferência maior que saldo livre disponível",
        scenarioDescription:
          "Estoque físico tem 10 unidades, mas 7 estão reservadas em pedidos; operador tenta transferir 6.",
        expectedUiState: "UI mostra detalhamento '10 Físico / 7 Reservado = 3 Livres' impedindo quebrar pedidos já vendidos.",
        givenWhenThen: "Quando quantidade solicitada > saldo livre, Então UI explica reservas ativas sem depender de erro genérico.",
        recommendedCriticality: "recommended",
      },
      {
        id: "inv-qa-6",
        category: "duplicate_operation",
        title: "Operação Duplicada — Reprocessamento duplo de inventário ou clique duplo",
        scenarioDescription:
          "Mesma contagem ou guia de transferência enviada duas vezes seguidas pelo usuário.",
        expectedUiState: "Sistema detecta chave única da operação e impede baixa duplicada sobre o mesmo movimento.",
        givenWhenThen: "Dado documento já processado, Quando submetido novamente, Então registro existente é retornado sem alterar saldo outra vez.",
        recommendedCriticality: "recommended",
      },
    ],
    referenceStrategy: {
      recommendedProblemIds: ["inv-p1", "inv-p2", "inv-p4"],
      title: "Visibilidade Clara de Saldo, Vínculo Obrigatório e Extrato Legível",
      summary:
        "Para combater divergências em estoque multi-usuário, diferenciar estados de saldo (P-01), exigir vínculo auditável em ajustes (P-02) e tornar o extrato humano (P-04) resolve 80% da cegueira operacional antes de endurecer regras avançadas de permissão.",
      reasoning: [
        "P-04 tem implementação simples e reduz imediatamente erros de leitura de todo o time no histórico.",
        "P-01 e P-02 atacam diretamente a raiz de confiança no saldo e na auditoria de alterações.",
        "P-03 e P-05 complementam a governança entre depósitos e terminais compartilhados.",
      ],
    },
    relatedCaseSlug: "erp-enterprise-redesign",
    relatedCaseLabel: "Ver Case Real ERP [01] (NDA-Safe)",
  },

  // =========================================================================
  // CENÁRIO 03 — CRM COMERCIAL: Oportunidades comerciais sem acompanhamento
  // =========================================================================
  {
    id: "crm-stalled-opportunities",
    code: "DL-03",
    domain: "SaaS B2B & CRM Comercial",
    originTag: "Cenário Didático • CRM B2B",
    name: "Oportunidades comerciais sem acompanhamento",
    dilemma:
      "Como garantir velocidade diária para vendedores consultivos enquanto o CRM organiza prioridades, cobra próxima ação e evita leads esquecidos sem parecer burocrático?",
    businessContext: {
      overview:
        "Uma equipe comercial B2B utiliza um CRM para gerenciar leads de múltiplas fontes, oportunidades em funil Kanban e atividades de follow-up. Sem critérios claros de prioridade e próxima ação, negociações quentes esfriam silenciosamente.",
      operationScale:
        "Time comercial B2B • Múltiplos canais (Inbound, WhatsApp, Prospecção) • Ciclo consultivo de múltiplos contatos",
      stakeholders: [
        "Vendedor Consultivo / Inside Sales",
        "Gestor Comercial",
        "Marketing / Pré-Vendas",
        "Comprador B2B (Cliente)",
      ],
      constraints: [
        "Se registrar cada ligação/follow-up exigir formulários longos, o vendedor volta para WhatsApp pessoal e planilha",
        "Gestor precisa identificar oportunidades estagnadas antes de perder o fechamento mensal",
        "A interface deve responder em poucos segundos quem ligar primeiro hoje",
      ],
      keyMetricsWatch: [
        "Negócios sem próxima ação agendada",
        "Tempo sem contato no estágio",
        "Tempo entre entrada do lead e primeiro atendimento",
      ],
    },
    problems: [
      {
        id: "crm-p1",
        code: "P-01",
        title: "Leads sem responsável",
        symptom:
          "Novos leads chegam do formulário ou WhatsApp e ficam em uma fila genérica sem dono explícito ou SLA de primeiro contato.",
        userImpactDetail:
          "Cada vendedor presume que outro colega já assumiu o contato, ou dois vendedores abordam a mesma empresa.",
        operationalImpactDetail:
          "Lead esfria antes do primeiro retorno e gera desperdício de investimento comercial.",
        evidenceCue: "Leads novos passam horas na coluna inicial sem atribuição nominal.",
        scores: {
          userImpact: 4,
          operationalImpact: 5,
          frequency: 4,
          businessRisk: 5,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "crm-p1-a",
            label: "A",
            title: "Distribuição automática por regra + alerta de SLA para aceite rápido",
            description:
              "Novo lead é atribuído por rodízio/segmento ao entrar, exibindo alerta de tempo limite; se não houver ação no prazo, é redistribuído.",
            expectedBenefit:
              "Garante dono claro desde o minuto zero e evita leads órfãos sem exigir triagem manual do gestor.",
            limitation: "Requer definição transparente de regras de rodízio e ausência/férias de vendedores.",
            userImpact: "Vendedor recebe notificação clara com CTA de 1 clique para iniciar atendimento.",
            operationalImpact: "Reduz janelas mortas no primeiro contato comercial.",
            estimatedComplexity: "Média",
            dependencies: ["Motor simples de fila/rodízio", "Timer de SLA na entrada"],
            consequenceAnalysis:
              "Automação com fallback resolve o vazio de propriedade na entrada, desde que o time alinhe regras claras de distribuição.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: -1,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -1,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "crm-p1-b",
            label: "B",
            title: "Fila aberta ('Pescar Lead') onde quem clicar primeiro assume",
            description:
              "Todos os novos leads entram em painel compartilhado aguardando que algum vendedor puxe para seu funil.",
            expectedBenefit: "Simples de implementar e estimula velocidade em equipes competitivas.",
            limitation: "Leads menos atrativos ficam abandonados na fila e gera disputa agressiva por leads fáceis.",
            userImpact: "Beneficia apenas quem fica atualizando a tela o dia todo.",
            operationalImpact: "Contas complexas mas valiosas ficam sem atendimento rápido.",
            estimatedComplexity: "Baixa",
            dependencies: ["Filtro 'Sem Responsável' no grid"],
            consequenceAnalysis:
              "Deixar fila aberta parece simples e meritocrático, mas costuma deixar leads menores ou complexos sem dono.",
            tradeOffShift: {
              speedVsValidation: 2,
              flexibilityVsControl: 2,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 2,
              easeVsTraceability: 1,
            },
          },
        ],
      },
      {
        id: "crm-p2",
        code: "P-02",
        title: "Oportunidades estagnadas",
        symptom:
          "Negócios avançam para Proposta ou Negociação e permanecem dias ou semanas parados no Kanban sem atualização.",
        userImpactDetail:
          "Cards antigos se misturam aos ativos no mesmo peso visual, escondendo riscos reais da meta.",
        operationalImpactDetail:
          "Forecast fica irreal e concorrentes fecham enquanto a oportunidade dorme.",
        evidenceCue: "Cards com última atividade superior a 5–7 dias sem destaque visual.",
        scores: {
          userImpact: 4,
          operationalImpact: 5,
          frequency: 5,
          businessRisk: 5,
          implementationEffort: 2,
        },
        alternatives: [
          {
            id: "crm-p2-a",
            label: "A",
            title: "Sinalização progressiva de SLA por estágio + fila de resgate diária",
            description:
              "Cada card calcula dias desde a última interação real, destacando alertas visuais âmbar/vermelho no Kanban e agrupando estagnados no topo da agenda do dia.",
            expectedBenefit:
              "Torna o envelhecimento impossível de ignorar sem bloquear visualmente o funil.",
            limitation: "Precisa calibrar SLA diferente para estágios curtos (Lead) vs longos (Proposta).",
            userImpact: "Vendedor identifica em segundos quais negociações precisam de retorno hoje.",
            operationalImpact: "Expõe o forecast real ao gestor comercial.",
            estimatedComplexity: "Baixa",
            dependencies: ["Cálculo de dias sem atividade por card", "Badge visual por limiar do estágio"],
            consequenceAnalysis:
              "Alertas graduais acoplados à agenda diária dão visibilidade ao risco de estagnação sem travar a movimentação no Kanban.",
            tradeOffShift: {
              speedVsValidation: 0,
              flexibilityVsControl: -1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: -1,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "crm-p2-b",
            label: "B",
            title: "Encerramento automático como 'Perdido' após 7 dias sem log",
            description:
              "Se não houver atividade em 7 dias, o sistema move o negócio automaticamente para Perdido para manter funil limpo.",
            expectedBenefit: "Garante funil matematicamente limpo.",
            limitation: "Vendas B2B reais frequentemente aguardam aprovação de cliente por mais de 7 dias.",
            userImpact: "Gera frustração enorme quando o vendedor descobre oportunidades vivas arquivadas.",
            operationalImpact: "Induz logs falsos ('oi' só para zerar relógio).",
            estimatedComplexity: "Média",
            dependencies: ["Job agendado de expiração"],
            consequenceAnalysis:
              "Arquivamento punitivo sem contexto real costuma fazer o time burlar o CRM em vez de usar melhor a ferramenta.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
          },
        ],
      },
      {
        id: "crm-p3",
        code: "P-03",
        title: "Falta de histórico",
        symptom:
          "Interações acontecem em ligações e WhatsApp sem entrar na linha do tempo do cliente, obrigando o vendedor ou gestor a perguntar tudo de novo.",
        userImpactDetail:
          "Quando um vendedor substitui outro ou retoma conversa após dias, precisa caçar prints antigos.",
        operationalImpactDetail:
          "Passa imagem desorganizada ao cliente corporativo na retomada de proposta.",
        evidenceCue: "Cards chegam em Negociação com timeline vazia.",
        scores: {
          userImpact: 4,
          operationalImpact: 4,
          frequency: 5,
          businessRisk: 4,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "crm-p3-a",
            label: "A",
            title: "Drawer 360° lateral com registro em 1 clique + templates integrados",
            description:
              "Permite registrar resultado de ligação/WhatsApp em botões rápidos dentro do próprio card/drawer sem abrir página separada nem exigir formulário longo.",
            expectedBenefit:
              "Reduz atrito de preenchimento ao mínimo necessário para manter timeline real viva.",
            limitation: "Não captura automaticamente áudios ou conversas fora de canais integrados.",
            userImpact: "Vendedor registra contato em segundos sem sair do Kanban.",
            operationalImpact: "Preserva memória comercial em troca de carteiras ou férias.",
            estimatedComplexity: "Média",
            dependencies: ["Drawer contextual 360°", "Botões de log rápido com notas opcionais"],
            consequenceAnalysis:
              "Tornar o registro quase tão rápido quanto enviar uma mensagem aumenta adoção orgânica sem exigir microgestão.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 0,
              simplicityVsDensity: 0,
              autonomyVsGovernance: 0,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "crm-p3-b",
            label: "B",
            title: "Formulário obrigatório de 6 campos ao fechar qualquer interação",
            description:
              "Obriga preenchimento completo de resumo, concorrente, objeção e próxima data para salvar log.",
            expectedBenefit: "Dados altamente estruturados quando preenchidos.",
            limitation: "Sob ritmo intenso, vendedores param de registrar interações no CRM.",
            userImpact: "Sensação de sistema burocrático que atrasa o próximo atendimento.",
            operationalImpact: "Adoção cai e dados migram para notas pessoais.",
            estimatedComplexity: "Baixa",
            dependencies: ["Modal obrigatório"],
            consequenceAnalysis:
              "Exigir perfeição burocrática após cada ligação frequentemente reduz o volume total de registros reais.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -2,
              simplicityVsDensity: -1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
          },
        ],
      },
      {
        id: "crm-p4",
        code: "P-04",
        title: "Ausência de próxima ação",
        symptom:
          "Vendedor conclui uma ligação ou envia orçamento e move o card no Kanban sem agendar data nem objetivo do próximo contato.",
        userImpactDetail:
          "Ao iniciar o dia seguinte, vendedor olha dezenas de oportunidades sem saber o que executar.",
        operationalImpactDetail:
          "Negociações morrem por esquecimento passivo, não por recusa do cliente.",
        evidenceCue: "Maioria dos cards ativos não exibe tarefa futura atrelada.",
        scores: {
          userImpact: 5,
          operationalImpact: 5,
          frequency: 5,
          businessRisk: 5,
          implementationEffort: 2,
        },
        alternatives: [
          {
            id: "crm-p4-a",
            label: "A",
            title: "Exibir 'Próxima Ação' destacada no card + micro-prompt rápido ao concluir atividade",
            description:
              "Ao concluir uma tarefa ou mover card para estágio ativo, interface oferece atalhos de 1 clique ('Ligar em 2 dias', 'Cobrar proposta sexta') e destaca pendência em vermelho se vazia.",
            expectedBenefit:
              "Elimina esquecimento sem criar bloqueios frustrantes: agendar o próximo passo leva menos de 3 segundos.",
            limitation: "Requer disciplina mínima na revisão semanal dos cards sem tarefa.",
            userImpact: "Transforma a rotina diária em checklist claro de execução.",
            operationalImpact: "Mantém fluxo contínuo de follow-ups até Ganho ou Perda.",
            estimatedComplexity: "Baixa",
            dependencies: ["Campo NextAction no card Kanban", "Chips de agendamento rápido (+1d, +3d, +7d)"],
            consequenceAnalysis:
              "Combinar visibilidade explícita no card com atalhos de agendamento rápido equilibra leveza para o vendedor e previsibilidade para a operação.",
            tradeOffShift: {
              speedVsValidation: 0,
              flexibilityVsControl: -1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: -1,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "crm-p4-b",
            label: "B",
            title: "Bloquear drag-and-drop no Kanban se não houver tarefa futura",
            description:
              "Impede fisicamente arrastar qualquer card para coluna seguinte sem antes criar e salvar evento na agenda.",
            expectedBenefit: "100% de cards ativos com próxima data formal.",
            limitation: "Em atualizações rápidas em lote, o bloqueio rígido irrita e incentiva datas genéricas falsas.",
            userImpact: "Interrompe fluxo ágil de organização do funil.",
            operationalImpact: "Polui agenda com datas fictícias apenas para destravar o card.",
            estimatedComplexity: "Baixa",
            dependencies: ["Trava no handler de drag-and-drop"],
            consequenceAnalysis:
              "Restrição rígida no arrastar do Kanban cria fricção alta; é mais eficaz sugerir em 1 clique no pós-ação.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
          },
        ],
      },
      {
        id: "crm-p5",
        code: "P-05",
        title: "Dificuldade de priorização",
        symptom:
          "Vendedor vê lista plana com 40 leads sem distinguir valor potencial, urgência de SLA, temperatura ou estágio próximo ao fechamento.",
        userImpactDetail:
          "Gasta tempo em leads frios enquanto propostas prontas para assinatura esfriam sem retorno.",
        operationalImpactDetail:
          "Baixa eficiência da carteira ativa e desperdício de horas comerciais.",
        evidenceCue: "Cards do Kanban ordenados apenas por data de criação ou ordem aleatória.",
        scores: {
          userImpact: 4,
          operationalImpact: 4,
          frequency: 4,
          businessRisk: 4,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "crm-p5-a",
            label: "A",
            title: "Fila diária inteligente + filtros rápidos por Urgência, SLA e Valor no Kanban",
            description:
              "Oferece visão complementar 'Meu Dia / Prioridade' ordenando oportunidades por SLA vencido, valor ponderado e estágio avançado, com chips transparentes do motivo.",
            expectedBenefit:
              "Orienta o primeiro bloco da manhã com transparência sem substituir o controle visual do pipeline.",
            limitation: "Critérios de ordenação precisam ser transparentes para o vendedor confiar no ranking.",
            userImpact: "Corta dúvida de 'quem atender primeiro' ao abrir o sistema.",
            operationalImpact: "Protege negociações de maior valor próximas ao fechamento.",
            estimatedComplexity: "Média",
            dependencies: ["Preset de ordenação combinada (SLA + Valor + Estágio)"],
            consequenceAnalysis:
              "Explicitar por que um lead está no topo evita caixas-pretas e melhora aderência do time à priorização.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 0,
              simplicityVsDensity: 0,
              autonomyVsGovernance: 0,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "crm-p5-b",
            label: "B",
            title: "Ordenação simples apenas por valor monetário da proposta",
            description:
              "Coloca negócios de maior valor sempre no topo de todas as listas.",
            expectedBenefit: "Foco imediato nos maiores contratos.",
            limitation: "Leads médios prontos para fechar rápido ou com SLA estourando ficam enterrados.",
            userImpact: "Ignora urgência temporal e velocidade de fechamento.",
            operationalImpact: "Desequilibra conversão de volume recorrente.",
            estimatedComplexity: "Baixa",
            dependencies: ["Sort por dealValue desc"],
            consequenceAnalysis:
              "Valor sozinho distorce prioridade quando contratos gigantes em fase inicial ofuscam fechamentos rápidos do dia.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 1,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 1,
              easeVsTraceability: 1,
            },
          },
        ],
      },
    ],
    tradeOffAxes: [
      {
        id: "speedVsValidation",
        leftPole: "Preenchimento Obrigatório",
        rightPole: "Velocidade de Atendimento",
        criteriaNote: "Quanto dado é exigido do vendedor sem fazê-lo abandonar o CRM para planilhas.",
      },
      {
        id: "flexibilityVsControl",
        leftPole: "Regras Rígidas de Funil",
        rightPole: "Flexibilidade no Kanban",
        criteriaNote: "Se movimentos entre etapas exigem travas duras ou orientações leves.",
      },
      {
        id: "simplicityVsDensity",
        leftPole: "Riqueza de Sinais no Card",
        rightPole: "Card Enxuto",
        criteriaNote: "Quantidade de badges (SLA, valor, canal, próxima ação) sem poluir leitura.",
      },
      {
        id: "autonomyVsGovernance",
        leftPole: "Governança & SLA Automático",
        rightPole: "Autonomia do Vendedor",
        criteriaNote: "Regras automáticas de redistribuição vs gestão livre da própria fila.",
      },
      {
        id: "easeVsTraceability",
        leftPole: "Histórico Completo 360°",
        rightPole: "Atalho Sem Registro",
        criteriaNote: "Balanceia captura de contexto para o time com clique mínimo.",
      },
    ],
    qaScenarios: [
      {
        id: "crm-qa-1",
        category: "normal_operation",
        title: "Operação Normal — Lead atribuído, contato logado e próxima ação agendada",
        scenarioDescription:
          "Vendedor assume lead atribuído, registra ligação pelo drawer 360° e agenda follow-up com chip +2 dias.",
        expectedUiState: "Timeline atualizada instantaneamente e badge de Próxima Ação visível no card do Kanban.",
        givenWhenThen: "Dado lead atribuído ao vendedor, Quando logar interação e agendar próxima ação, Então card atualiza SLA e agenda sem recarregar.",
        recommendedCriticality: "essential",
      },
      {
        id: "crm-qa-2",
        category: "missing_required",
        title: "Campo Obrigatório Ausente — Mover oportunidade para Perdido sem motivo",
        scenarioDescription:
          "Vendedor arrasta card para estágio 'Perdido' tentando confirmar sem escolher motivo categorizado.",
        expectedUiState: "Modal solicita seleção de motivo (Preço, Concorrente, Timing) mantendo card na coluna anterior se usuário cancelar.",
        givenWhenThen: "Quando card for movido para Perdido sem motivo selecionado, Então confirmação fica bloqueada com destaque no seletor obrigatório.",
        recommendedCriticality: "essential",
      },
      {
        id: "crm-qa-3",
        category: "communication_failure",
        title: "Falha de Comunicação — Timeout ao salvar registro de ligação no Drawer 360°",
        scenarioDescription:
          "Rede falha no instante em que vendedor salva notas extensas de uma reunião comercial.",
        expectedUiState: "Rascunho do texto digitado permanece intacto no formulário com botão 'Tentar salvar novamente'.",
        givenWhenThen: "Dado erro de rede ao salvar log no Drawer, Então modal não limpa o texto digitado e oferece retry explícito.",
        recommendedCriticality: "essential",
      },
      {
        id: "crm-qa-4",
        category: "unauthorized_user",
        title: "Usuário Sem Permissão — Vendedor tentando reatribuir ou excluir oportunidade alheia",
        scenarioDescription:
          "Vendedor sem papel gerencial tenta alterar dono de oportunidade de outro colega ou excluir histórico.",
        expectedUiState: "Controles administrativos permanecem ocultos/protegidos e tentativa direta retorna mensagem clara de permissão.",
        givenWhenThen: "Dado usuário não-gestor, Quando tentar alterar owner ou apagar nota auditada, Então sistema bloqueia e preserva registro.",
        recommendedCriticality: "recommended",
      },
      {
        id: "crm-qa-5",
        category: "inconsistent_data",
        title: "Dados Inconsistentes — Agendamento de próxima ação com data no passado",
        scenarioDescription:
          "Operador seleciona acidentalmente data passada ao configurar próximo follow-up.",
        expectedUiState: "Validação inline orienta escolha de data atual ou futura impedindo criar tarefa já vencida na origem.",
        givenWhenThen: "Quando data selecionada < hoje, Então controle sinaliza erro inline antes do submit.",
        recommendedCriticality: "recommended",
      },
      {
        id: "crm-qa-6",
        category: "duplicate_operation",
        title: "Operação Duplicada — Criação de lead com CNPJ/e-mail já ativo no pipeline",
        scenarioDescription:
          "Dois canais tentam cadastrar oportunidade duplicada para a mesma empresa já em negociação.",
        expectedUiState: "CRM identifica duplicidade em tempo real e oferece link direto para abrir a oportunidade ativa existente.",
        givenWhenThen: "Dado CNPJ/e-mail já vinculado a oportunidade aberta, Quando tentar criar novo card, Então UI sugere abrir registro existente.",
        recommendedCriticality: "essential",
      },
    ],
    referenceStrategy: {
      recommendedProblemIds: ["crm-p4", "crm-p2", "crm-p3"],
      title: "Visibilidade do Próximo Passo, Alerta de Estagnação e Registro Leve",
      summary:
        "Para recuperar oportunidades sem burocracia excessiva, combinar Próxima Ação visível com agendamento em 1 clique (P-04), alertas de SLA por estágio (P-02) e Drawer 360° leve (P-03) ataca diretamente a causa da inatividade mantendo alta velocidade comercial.",
      reasoning: [
        "P-04 e P-02 transformam o Kanban em ferramenta ativa de rotina diária sem exigir preenchimento pesado.",
        "P-03 reduz atrito de registro para que o histórico exista de verdade no sistema.",
        "P-01 e P-05 amplificam escala quando o time cresce em volume de leads inbound e múltiplos vendedores.",
      ],
    },
    relatedCaseSlug: "flow-crm-b2b",
    relatedCaseLabel: "Ver Estudo Autoral: Case 02 Flow CRM",
  },
];
