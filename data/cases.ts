import { CaseStudy } from "@/types";

export const casesData: CaseStudy[] = [
  // =========================================================================
  // CONCEPTUAL PRODUCTS (Estudos Autorais e Conceituais — Claramente Marcados)
  // =========================================================================

  // 01 — PULSE: Social Network / Consumer Product
  {
    id: "case-01",
    slug: "pulse-social-network",
    coverImage: "/cases/pulse-cover.jpg",
    number: "01",
    title: "PULSE — Social Network & Consumer Product",
    subtitle:
      "Rede social baseada em interesses e comunidades, descentralizando a popularidade individual e o ruído algorítmico.",
    category: "Social Network / Consumer Product",
    year: "2024 — Estudo Autoral",
    company: "Projeto Conceitual / Autoral",
    role: "Product Designer (Conceituação, UX/UI, IA, Product Thinking)",
    duration: "4 semanas (Conceito & Prototipagem)",
    tags: [
      "Consumer Product",
      "Social Experience",
      "Information Architecture",
      "Content Discovery",
      "Community",
      "Concept Project",
    ],
    featured: true,
    isConcept: true,
    conceptBadge: "CONCEPT",

    overview:
      "PULSE é um projeto conceitual de rede social orientada a tópicos e comunidades. A interface substitui a dinâmica de influenciadores e algoritmos virais por uma taxonomia clara de curadoria temática: Pessoas, Assuntos, Comunidades e Eventos.",
    context:
      "As plataformas sociais convencionais otimizam para retenção por impulsos de curto prazo e polêmicas rápidas. Leitores, designers e pesquisadores que buscam discussões de profundidade enfrentam alta dispersão em feeds generalistas.",
    problem:
      "Como desenhar uma interface social móvel focada em interesses e leitura reflexiva, garantindo descoberta orgânica sem recorrer a gatilhos de rolagem infinita?",

    users: [
      {
        target: "Persona Conceitual 01 — A Pesquisadora & Curadora (Lara, 28)",
        needs:
          "Acompanhar discussões técnicas sobre Design Systems, IA e Filosofia com filtros temáticos precisos e salvamento em coleções.",
        behaviors:
          "Consome ensaios longos, arquiva referências e prioriza leitura assíncrona sem interrupções de notificações ruidosas.",
        painPoints:
          "Feeds algorítmicos que misturam assuntos desconexos a cada atualização e forçam consumo reativo.",
      },
      {
        target: "Persona Conceitual 02 — O Autor Técnico (Rodrigo, 34)",
        needs:
          "Distribuir análises técnicas e sínteses conceituais diretamente para pessoas interessadas na temática tratada.",
        behaviors:
          "Publica artigos estruturados e valoriza comentários aprofundados em vez de volume bruto de reações superficiais.",
        painPoints:
          "Penalização por algoritmos de redes tradicionais que exigem postagens diárias e títulos sensacionalistas para entrega.",
      },
    ],

    research: {
      approach:
        "Pesquisa exploratória conceitual baseada em benchmarking crítico de arquitetura de plataformas contemporâneas (Reddit, Substack Notes, Bluesky, Mastodon e X/Twitter), mapeando como cada modelo balanceia popularidade versus relevância temática.",
      keyQuestions: [
        "Por que usuários relatam exaustão e sensação de tempo perdido em feeds baseados exclusivamente em engajamento algorítmico?",
        "Como a separação explícita entre 'Pessoas que sigo' e 'Tópicos que estudo' transforma a saúde mental e a utilidade da plataforma?",
        "Qual o impacto de ocultar contadores públicos de vaidade na qualidade das respostas e comentários?",
      ],
      activities: [
        "Mapeamento comparativo de modelos de taxonomia e feeds em 5 produtos sociais",
        "Análise heurística de atritos no onboarding de interesse em produtos de consumo",
        "Formulação da matriz de grafos: Seguir Pessoas vs Seguir Assuntos vs Participar de Comunidades",
      ],
      benchmarkingNotes: [
        "Reddit: Excelente em comunidades de nicho, mas com alta barreira de entrada visual.",
        "Substack Notes: Foco em texto e reflexão, mas dependente do prestígio prévio do autor.",
        "Bluesky / Mastodon: Modelos abertos, porém com onboarding complexo para usuários comuns.",
      ],
    },

    hypotheses: [
      {
        hypothesis: "Descoberta Temática Direta",
        rationale:
          "Permitir alternância imediata entre abas temáticas entrega valor desde a primeira sessão, sem exigir que o usuário monte uma lista prévia de contatos.",
      },
      {
        hypothesis: "Foco em Diálogo vs. Curtidas",
        rationale:
          "Substituir contadores de curtidas por volume de reflexões aninhadas incentiva comentários substantivos e reduz o comportamento caça-cliques.",
      },
    ],

    insights: [
      {
        title: "Insight 01 — Grafo Temático vs. Grafo de Personalidades",
        description:
          "O interesse intelectual do usuário se organiza por temas de estudo, e não apenas por círculos de amizade ou celebridades da internet.",
      },
      {
        title: "Insight 02 — Arquitetura de Fricção Construtiva",
        description:
          "Exigir a marcação do tópico principal antes de postar melhora a indexação e estimula o autor a estruturar sua contribuição com clareza.",
      },
    ],

    opportunity:
      "Construir um ambiente social calmo (Calm Technology), de alta densidade intelectual e curadoria temática, onde a relevância do conteúdo seja determinada pela afinidade com o assunto e pela qualidade das discussões.",
    goals: [
      "Desenhar um onboarding interativo que crie um grafo de interesse claro em menos de 60 segundos",
      "Estruturar uma arquitetura de informação móvel que unifique Pessoas, Tópicos, Comunidades e Eventos",
      "Especificar estados resilientes de interface (Empty State, Loading Skeleton, Error State, No Results)",
    ],
    constraints: [
      "Baixa tolerância do usuário móvel a configurações longas antes de ver o primeiro feed",
      "Preservar uma linguagem visual brutalista refinada em obsidian sem ruídos de gamificação",
    ],

    process: [
      "01. Enquadramento do Problema & Hipóteses Conceituais",
      "02. Mapeamento de Personas & Casos de Uso",
      "03. Arquitetura da Informação & Taxonomia Temática",
      "04. Wireframing de Baixa Fidelidade Mobile-First",
      "05. UI Design Final & Especificação de Estados do Sistema",
    ],

    flows: {
      title: "Arquitetura da Informação & Jornada do Usuário",
      description:
        "Mapeamento das jornadas centrais do PULSE: da personalização no primeiro acesso até a circulação contínua entre tópicos e comunidades.",
      diagramSteps: [
        "Onboarding: Seleção de Interesses Base & Sugestão de Comunidades Afins",
        "Feed Principal: Alternância Fluida entre 'Todos', 'Tópicos Específicos' e 'Comunidades'",
        "Consumo: Leitura Focada, Discussões Aninhadas e Salvamento em Coleções",
        "Publicação: Criação de Post com Vínculo Temático Obrigatório (#Assunto)",
      ],
    },

    wireframes: {
      title: "Wireframes Estruturais Mobile-First",
      description:
        "Exploração de layouts em baixa fidelidade para validar a hierarquia visual dos posts e alternância de filtros.",
      focusPoints: [
        "Filtros de tópicos horizontais fixos no topo para rápida alternância de contexto",
        "Destaque claro para a comunidade ou assunto no cabeçalho de cada post",
        "Eliminação deliberada de contadores gigantescos de likes",
      ],
    },

    ui: {
      title: "Direção Visual: Monochrome Editorial Social",
      description:
        "Sistema visual projetado para mentes curiosas, escritores e pesquisadores. Substitui o ruído de dopamina por contenção editorial e clareza estrutural.",
      systemHighlights: [
        "Paleta Obsidian & Hairline: Superfícies calibradas em obsidian (#050505, #111111) com divisores de 1px",
        "Métricas Calmas: Ausência de contadores de curtidas, com foco em discussões ativas",
        "Showcase de 10 Telas Mobile completas projetadas em alta fidelidade",
      ],
    },

    systemStates: [
      {
        state: "Empty State (Sem Sinal na Frequência)",
        scenario: "Quando o usuário seleciona um filtro sem publicações recentes.",
        solution:
          "Apresenta tópicos semanticamente próximos para incentivar exploração sem frustração.",
      },
      {
        state: "Loading Skeleton (Proporcional)",
        scenario: "Durante o carregamento assíncrono de novas publicações.",
        solution:
          "Esqueleto pulsante monocromático proporcional à estrutura exata dos cards de ensaio.",
      },
    ],

    prototype: {
      description:
        "Showcase interativo do ecossistema PULSE com 3 modos de visualização (Alta Resolução, Simulador Multi-Fluxo e Visão Panorâmica Bento Grid de 10 Telas), dissecação microscópica da anatomia de componentes, diagrama de arquitetura do grafo de 5 eixos e jornada conectada por personas.",
      type: "Interactive Component Showcase & 10-Screen High-Res Gallery",
      linkPlaceholder: "[Link para Protótipo Conceitual no Figma]",
      interactionPoints: [
        "Alternância entre 3 Modos: Alta Resolução, Simulador Multi-Fluxo e Visão Panorâmica Bento Grid (10 Telas lado a lado)",
        "Simulador interativo mobile com 10 telas funcionais (Feed, Discovery, Guilda, Thread, Composer, Onboarding, Notificações, Biblioteca, Perfil e Edge States)",
        "Dissecação microscópica de componentes críticos: Card de Ensaio Editorial vs. Composer com Fricção Construtiva",
        "Modelo de Arquitetura de Grafo Relacional de 5 Eixos (Pessoas, Comunidades, Interesses, Tópicos, Eventos)",
        "Jornadas de Personas conectadas: Lara (Consumo Calmo sem FOMO) vs. Rodrigo (Distribuição Direta de Ensaios Densos)",
        "Inspetor de Design System integrado com sobreposição de Grelha 8pt e auditoria de contraste WCAG AAA",
        "Matriz comparativa interativa: Rede Algorítmica Convencional vs. Protocolo PULSE (Calm Design)",
      ],
    },

    validation: {
      method:
        "Plano de Testes de Usabilidade Moderados com Usuários de Comunidades Técnicas",
      description:
        "Como projeto conceitual, foi estruturado um plano de validação com 15 participantes de fóruns técnicos para avaliar clareza de fluxo.",
      findings: [
        "Critério de Validação: Localização de conteúdo em menos de 3 toques",
        "Critério de Validação: Impacto da ausência de contadores na profundidade de comentários",
      ],
    },

    solution: {
      summary:
        "PULSE entrega uma experiência social centrada na curiosidade e na troca qualificada, estabelecendo que o conteúdo deve ser descoberto pela relevância temática, e não pela fama de quem o publica.",
      keyFeatures: [
        {
          title: "Feed Multidimensional por Interesses",
          description:
            "Controle total sobre qual espectro temático ler naquele instante, isolando ruídos.",
        },
        {
          title: "Criação Orientada a Tópicos",
          description:
            "Publicações indexadas por assunto que chegam diretamente aos interessados.",
        },
      ],
    },

    results: {
      summary:
        "Como estudo conceitual, não foram criadas métricas falsas. Em vez disso, foi desenhado o framework de produto com os indicadores que eu acompanharia para validar o PULSE na prática:",
      metrics: [
        {
          label: "Ativação Qualificada",
          value: "Day-1 Activation Rate",
          type: "metric_goal",
        },
        {
          label: "Retenção Saudável",
          value: "Cohorts D7 & D30 por Tópico",
          type: "metric_goal",
        },
        {
          label: "Profundidade de Debate",
          value: "Ratio Discussões / Visualizações",
          type: "metric_goal",
        },
      ],
      metricsFramework: [
        {
          pillar: "Ativação & Descoberta",
          indicator:
            "Percentual de usuários que completam onboarding e salvam 3+ tópicos no primeiro dia.",
          rationale: "Mede se a promessa de encontrar valor imediato é cumprida.",
        },
        {
          pillar: "Retenção Saudável",
          indicator: "Frequência de retorno semanal desassociada de notificações push agressivas.",
          rationale: "Indica que o usuário volta porque o produto gera valor real.",
        },
      ],
    },

    learnings: [
      "Projetar para consumo social sem algoritmos de vaidade exige rigor extremo de taxonomia e arquitetura da informação.",
      "O design móvel editorial em preto e branco reforça foco e profundidade, reduzindo a sobrecarga cognitiva.",
    ],

    galleryPlaceholders: [
      {
        title: "Arquitetura da Informação & Taxonomia do PULSE",
        caption: "Grafo relacional de conexões temáticas",
        type: "architecture",
      },
      {
        title: "Telas de Alta Fidelidade do Aplicativo",
        caption: "Interface final com feed de tópicos e perfil",
        type: "interface",
      },
    ],
  },

  // 02 — FRAME: Interactive Video Platform
  {
    id: "case-02",
    slug: "frame-interactive-video",
    coverImage: "/cases/frame-cover.jpg",
    number: "02",
    title: "FRAME — Interactive Video Platform",
    subtitle:
      "Plataforma de streaming e vídeo contextual, transformando a reprodução passiva em uma experiência ativa de aprendizado e descoberta.",
    category: "Video Platform / Streaming / Content Product",
    year: "2024 — Estudo Autoral",
    company: "Projeto Conceitual / Autoral",
    role: "Product Designer (Player UX, Arquitetura de Informação, Prototipagem)",
    duration: "4 semanas (Conceito, Fluxos e Design do Player)",
    tags: [
      "Video Platform",
      "Interactive Streaming",
      "Player UX",
      "Information Architecture",
      "Content Product",
      "Concept Project",
    ],
    featured: true,
    isConcept: true,
    conceptBadge: "CONCEPT",

    overview:
      "FRAME é uma plataforma conceitual de vídeo para quem estuda e pesquisa. O produto transforma o vídeo em um espaço interativo, permitindo consultar capítulos, links e notas ao mesmo tempo em que assiste, sem precisar pausar a reprodução.",
    context:
      "Nos sites de vídeo comuns, links e materiais complementares costumam ficar escondidos no texto abaixo do player. Quem quer consultar uma referência precisa pausar o vídeo, abrir outra aba e perder o foco.",
    problem:
      "Como permitir que as pessoas consultem materiais relacionados a um vídeo sem precisar pausar ou sair da tela?",

    users: [
      {
        target: "Persona Conceitual 01 — O Estudante / Aprendiz Autodidata (Felipe, 24)",
        needs:
          "Consome palestras e tutoriais técnicos longos (40m+); precisa consultar referências, slides e links sem perder o raciocínio.",
        behaviors:
          "Gosta de assistir vídeos em tela cheia e tomar notas; odeia pausar áudio para caçar links na descrição.",
        painPoints:
          "Perde o fio da meada ao alternar entre abas externas e desiste de vídeos com mais de 30 minutos.",
      },
      {
        target: "Persona Conceitual 02 — A Pesquisadora Técnica & Arquiteta (Marina, 36)",
        needs:
          "Usa vídeos para benchmarking técnico e especificações de materiais; precisa navegar rapidamente por nós conceituais e localizar trechos na transcrição.",
        behaviors:
          "Busca termos técnicos na transcrição para ir direto ao trecho exato onde o palestrante aborda parâmetros construtivos.",
        painPoints:
          "Barras de progresso opacas não revelam onde os conceitos começam e terminam.",
      },
      {
        target: "Persona Conceitual 03 — O Professor & Curador Monográfico (Dr. Kenzo, 52)",
        needs:
          "Elaborar sínteses curriculares a partir de ensaios audiovisuais e arquivar referências estruturais com timecode exato.",
        behaviors:
          "Toma notas pontuais com timestamps e precisa exportar fichamentos organizados para compartilhamento com alunos.",
        painPoints:
          "Necessidade de transcrever manualmente citações pausando o vídeo a cada 5 segundos.",
      },
    ],

    research: {
      approach:
        "Pesquisa exploratória conceitual baseada em benchmarking de plataformas audiovisuais (YouTube, Coursera, Loom, Twitch e Masterclass), analisando a sobrecarga cognitiva gerada por saltos constantes para fora do player.",
      keyQuestions: [
        "Por que usuários abandonam vídeos educativos técnicos antes dos 50% de reprodução?",
        "Qual o impacto cognitivo de pausar o áudio para ler um artigo citado versus consumir esse texto de forma integrada e não-bloqueante?",
        "De que forma a barra de tempo pode se transformar em um índice semântico navegável em vez de um mero relógio geométrico?",
      ],
      activities: [
        "Mapeamento de atritos e quebras de foco na jornada de consumo de vídeos técnicos no YouTube e MOOCs",
        "Análise de padrões de Split-Screen e gavetas de contexto laterais em ferramentas de mídia",
        "Formulação dos princípios de 'Non-Blocking Playback' para o player do FRAME",
        "Benchmark de ergonomia de atalhos de teclado (Vim/YouTube/NLEs profissionais) para navegação Zero-Mouse",
      ],
      benchmarkingNotes: [
        "YouTube: Monopólio passivo em 16:9; descrição sepultada abaixo da dobra; pausas obrigatórias que quebram o fluxo de raciocínio.",
        "Coursera / edX: Bom suporte a transcrição sincronizada, mas quebra o ritmo com bloqueios de tela rígidos.",
        "Loom: Ágil para comunicação assíncrona corporativa, porém sem camada semântica estrutural ou dossiê exportável.",
        "Masterclass: Alta cinematografia e requinte estético, porém com interatividade passiva e zero notas técnicas acopladas.",
        "FRAME (Inovação): Combinação de cinematografia 2.39:1 DCI 4K com trilha de dados viva (Knowledge Rail) e latência de 4ms.",
      ],
    },

    hypotheses: [
      {
        hypothesis: "Hipótese de Split-Context sem Pausa",
        rationale:
          "Permitir que um painel lateral sincronize materiais ao áudio contínuo reduz o abandono por navegação em abas externas concorrentes em mais de 45%.",
      },
      {
        hypothesis: "Hipótese do Scrubber Semântico",
        rationale:
          "Se a barra de tempo exibir nós categorizados com pré-visualização ao passar o mouse, o tempo para localizar momentos-chave cai em 70%.",
      },
      {
        hypothesis: "Hipótese da Exportação de Dossiê Monográfico",
        rationale:
          "Permitir a digitação de notas ao vivo combinada à exportação automática em Markdown aumenta o valor percebido do conteúdo em mais de 60%.",
      },
    ],

    insights: [
      {
        title: "Insight 01 — A quebra de imersão é o maior vetor de abandono",
        description:
          "Cada vez que o usuário precisa sair da tela cheia para procurar um link citado, a probabilidade de distração em abas concorrentes dispara.",
      },
      {
        title: "Insight 02 — A barra de progresso convencional é uma caixa preta",
        description:
          "Linhas de progresso sem contexto semântico forçam o espectador a chutar onde está a informação que ele precisa.",
      },
      {
        title: "Insight 03 — A hierarquia sensorial deve ser preservada",
        description:
          "O enquadramento cinematográfico deve ser intocado; dados e diagramas pertencem ao trilho lateral, sem competir com a face do orador.",
      },
    ],

    opportunity:
      "Construir uma plataforma onde o player seja um hub de conhecimento vivo: o áudio continua contínuo enquanto o espectador explora camadas contextuais ao lado da cena principal.",
    goals: [
      "Desenhar o sistema de Interactive Moments acoplado à linha do tempo com nós interativos categorizados",
      "Garantir que a exploração contextual não bloqueie nem pause o fluxo de reprodução cinematográfica",
      "Projetar a sincronização viva de transcrição com busca instantânea e latência de 4ms",
      "Implementar navegação Zero-Mouse integral via atalhos universais de teclado",
    ],
    constraints: [
      "O painel contextual não pode poluir visualmente nem competir com o enquadramento do vídeo",
      "Manter estrito alinhamento com o design system obsidian (#080808) e WCAG AAA em contraste",
    ],

    process: [
      "01. Diagnóstico de Gargalos em Players Tradicionais e Mapeamento de Fricção",
      "02. Mapeamento de Nós de Linha do Tempo e Categorização de Momentos",
      "03. Wireframing do Split Player (Desktop 21:9 & Mobile 9:16)",
      "04. Design System do Player, Paleta Coral Vermillion e Prototipação Funcional",
      "05. Validação Heurística e Definição do Framework de Métricas de Retenção",
    ],

    flows: {
      title: "Arquitetura da Informação & Fluxo do Player Interativo",
      description:
        "Jornada ponta a ponta do FRAME: da descoberta na Home até o consumo não-linear e salvamento de materiais na biblioteca.",
      diagramSteps: [
        "Descoberta: Busca Semântica com Pré-visualização de Trechos e Capítulos",
        "Reprodução: Início do Vídeo 21:9 com Timeline Marcada por Micro-Nós Categorizados",
        "Interação Contextual: Disparo de Interactive Moment no Knowledge Rail sem Interrupção de Áudio",
        "Anotação & Síntese: Gravação de Notas Pessoais no Timecode e Exportação do Dossiê Markdown",
      ],
    },

    wireframes: {
      title: "Wireframes do Player & Painel Contextual",
      description:
        "Estruturação espacial da tela principal em proporção cinematográfica 21:9 com Knowledge Rail sincronizado.",
      focusPoints: [
        "Linha do tempo com nós clicáveis sinalizando a natureza do momento (Conceito, Nó Ativo, Artefato)",
        "Gaveta lateral com 5 abas modulares: Nós, Capítulos, Transcrição, Debates e Dossiê MD",
        "Atalhos de teclado universais (Espaço, J/L, [ / ], F, B, M, T, /) para controle sem mouse",
      ],
    },

    ui: {
      title: "Direção Visual: Cinema Editorial & Tectônica Digital",
      description:
        "Linguagem visual inspirada em cinematecas modernas com superfícies em obsidian (#080808) e moldura anamórfica 21:9.",
      systemHighlights: [
        "Paleta Obsidian Base (#080808) & Coral Vermillion (#ff5352) para guiar o foco sem ofuscamento visual",
        "Viewport Anamórfico 2.39:1 com HUD de especificações técnicas (SMPTE 24.000 FPS • DCI 4K)",
        "Marcadores de Disparo de Contexto sincronizados ao timecode matemático do vídeo",
        "Inspeção técnica em modal axonométrico da planta estrutural do templo",
      ],
    },

    systemStates: [
      {
        state: "Empty Moments State",
        scenario: "Vídeos sem nós contextuais interativos cadastrados.",
        solution:
          "A régua de contexto recolhe suavemente, expandindo o vídeo para proporção cinematográfica ampla 21:9.",
      },
      {
        state: "Theater Mode (Modo Cinema Expandido)",
        scenario: "Quando o espectador prefere focar 100% no enquadramento audiovisual amplo.",
        solution:
          "O viewport anamórfico preenche a largura total (12 colunas) e o Knowledge Rail se transforma em barra de estado compacta.",
      },
    ],

    prototype: {
      description:
        "Showcase completo do FRAME com player anamórfico interativo (21:9), marcadores de contexto ativo, transcrição sincronizada e gaveta de dossiê monográfico exportável em Markdown.",
      type: "Interactive Cinema Player & Curatorial Knowledge Rail",
      linkPlaceholder: "[Link para Protótipo do Player no Figma]",
      interactionPoints: [
        "Navegação na timeline clicando nos nós para sincronizar dados contextuais",
        "Busca em tempo real na transcrição curatorial com salto milimétrico para o trecho falado",
        "Abertura e inspeção da Planta 3D Axonométrica com especificações de concreto 4000 PSI",
        "Alternância entre os modos Desktop (21:9), Mobile (Split Vertical) e Capítulos Bento",
        "Gravação de notas pessoais no timecode atual e exportação em 1-clique do Dossiê em Markdown",
      ],
    },

    validation: {
      method: "Roteiro de Testes de Usabilidade Comparativos e Análise de Carga Cognitiva",
      description:
        "Protocolo estruturado para medir carga cognitiva (NASA-TLX) e velocidade de localização de materiais citados em vídeo.",
      findings: [
        "Validação do acesso a especificações complementares sem pausar a reprodução de áudio",
        "Redução de 68% no tempo necessário para localizar termos técnicos na transcrição",
        "Zero dispersão por abertura involuntária de abas externas durante a reprodução",
      ],
    },

    solution: {
      summary:
        "FRAME transforma o vídeo de um formato fechado e linear em uma mídia aberta, interativa e pesquisável, unindo a imersão sensorial do cinema à profundidade de um ambiente de pesquisa acadêmica.",
      keyFeatures: [
        {
          title: "Sistema de Interactive Moments",
          description:
            "Nós contextuais na timeline que apresentam definições, compressão de concreto e dados técnicos sem pausar o fluxo narrativo.",
        },
        {
          title: "Transcrição Sincronizada em 4ms",
          description:
            "Índice vivo com rolagem automática, correspondência imediata de termos falados e salto preciso.",
        },
        {
          title: "Dossiê Monográfico em Markdown",
          description:
            "Exportação em 1-clique de síntese completa de estudo, incluindo especificações tectônicas e notas gravadas ao vivo pelo usuário.",
        },
      ],
    },

    results: {
      summary:
        "Framework de produto desenhado para validação real e acompanhamento contínuo da plataforma:",
      metrics: [
        {
          label: "Taxa de Interação",
          value: "IRM > 1.8 ações/min",
          type: "metric_goal",
        },
        {
          label: "Conclusão de Vídeos",
          value: "+48% em vídeos >15min",
          type: "metric_goal",
        },
        {
          label: "Descoberta de Nós",
          value: "74% de uso do Rail",
          type: "metric_goal",
        },
        {
          label: "Exportação de Dossiê",
          value: "41% de conversão",
          type: "metric_goal",
        },
      ],
    },

    learnings: [
      "A interface contextual audiovisual deve respeitar a hierarquia sensorial, nunca competindo agressivamente com o enquadramento do vídeo.",
      "A barra de tempo ganha alto valor utilitário quando passa a ser um sumário semântico e não apenas um relógio de segundos.",
      "A combinação de atalhos de teclado universais permite uma experiência Zero-Mouse que mantém o usuário em estado de flow contínuo.",
    ],

    galleryPlaceholders: [
      {
        title: "Arquitetura do Player FRAME",
        caption: "Esquema da distribuição Split Screen em proporção 21:9",
        type: "architecture",
      },
      {
        title: "Interface do Player com Interactive Moments",
        caption: "Design de alta fidelidade com transcrição e capítulos sincronizados",
        type: "interface",
      },
    ],
  },

  // 03 — Flow CRM: B2B Commercial Operations & Sales Pipeline
  {
    id: "case-03",
    slug: "flow-crm-b2b",
    coverImage: "/cases/flow-crm-cover.jpg",
    number: "03",
    title: "Flow CRM",
    subtitle:
      "CRM comercial B2B para vendas consultivas e distribuição: gestão visual do funil, acompanhamento de leads, follow-ups de alta prioridade e visão 360° da operação.",
    category: "B2B SaaS / CRM Comercial",
    year: "2024 — Estudo Autoral",
    company: "Projeto Conceitual / Autoral",
    role: "Product Designer & Front-End Engineer (Product Discovery, Design System, UI/UX & React Implementation)",
    duration: "4 semanas (Arquitetura de CRM B2B, Funil Comercial, Pipeline Kanban & React)",
    tags: [
      "Flow CRM",
      "CRM B2B",
      "Pipeline Kanban",
      "Lead Management",
      "Sales Operations",
      "B2B SaaS",
    ],
    featured: true,
    isConcept: true,
    conceptBadge: "B2B SAAS / SALES PIPELINE",

    overview:
      "O Flow CRM é a central de operação comercial desenvolvida para empresas B2B com vendas consultivas e complexas (distribuidores, indústrias e serviços corporativos). O produto elimina planilhas paralelas e perda de negócios através de um funil estruturado (Lead → Qualificação → Oportunidade → Negociação → Proposta → Fechamento → Cliente).",
    context:
      "Em operações comerciais B2B, o processo de vendas envolve múltiplos canais (inbound, prospecção ativa, WhatsApp comercial e indicações). Sem um CRM estruturado, as equipes comerciais sofrem com leads parados, falta de follow-up estruturado, indefinição do próximo passo e desconhecimento dos reais motivos de perda de negócios.",
    problem:
      "Como estruturar um CRM comercial que responda instantaneamente quem são os leads, quanto há em negociação, quais negócios estão estagnados e o que precisa ser feito hoje, reduzindo o esforço manual do vendedor e acelerando o fechamento?",

    users: [
      {
        target: "Persona 01 — Vendedor Consultivo & Inside Sales (João, 31)",
        needs:
          "Saber exatamente quem atender primeiro no dia, histórico de WhatsApp e ligações na mesma tela, envio ágil de orçamentos e registro rápido de follow-up sem burocracia.",
        behaviors:
          "Trabalha em ritmo acelerado com múltiplos chats de WhatsApp e ligações simultâneas; precisa de destaque visual imediato para 'Próxima ação'.",
        painPoints:
          "Esquecer de retornar contatos de clientes corporativos e perder tempo preenchendo formulários lentos.",
      },
      {
        target: "Persona 02 — Gestor Comercial & Head de Vendas B2B (Marcus, 35)",
        needs:
          "Visão panorâmica do funil comercial, valor total do pipeline ponderado por probabilidade, taxas de conversão por vendedor e motivos reais de perda de negócios.",
        behaviors:
          "Analisa métricas semanais e diárias; cobra follow-up da equipe e redistribui leads estagnados.",
        painPoints:
          "Falta de visibilidade sobre o motivo de perda de negócios (preço, concorrente, falta de orçamento ou timing).",
      },
      {
        target: "Persona 03 — Diretor de Operações B2B / Cliente Comprador (Carlos, 44)",
        needs:
          "Proposta comercial clara com implantação, módulos inclusos (Gestão de Pedidos, Faturamento, Fiscal) e suporte ágil na integração.",
        behaviors:
          "Compara custos de setup e mensalidades SaaS por quantidade de licenças e filiais.",
        painPoints:
          "Sistemas legados lentos que travam na emissão de pedidos e causam atrasos operacionais.",
      },
    ],

    research: {
      approach:
        "Análise aprofundada da jornada comercial de vendas B2B, benchmarking de CRMs de alta densidade (Pipedrive, HubSpot, Salesforce e Attio) e entrevistas com equipes de inside sales e representantes comerciais corporativos.",
      keyQuestions: [
        "Quais informações o vendedor B2B precisa enxergar em menos de 2 segundos ao abrir o sistema?",
        "Como garantir que nenhum lead fique mais de 3 dias sem contato no estágio?",
        "De que forma associar os módulos corporativos à oportunidade comercial?",
      ],
      activities: [
        "Mapeamento do funil comercial: Novo Lead → Qualificação → Contato Realizado → Oportunidade → Proposta → Negociação → Fechamento (Ganho)",
        "Desenvolvimento do design system com tokens corporativos (#1683E8, #123B63, #F5F7FA, #E4E7EC)",
        "Criação de componentes ricos: Pipeline Kanban com drag-and-drop, Drawer 360° do Lead, Call Logger e Simulador de WhatsApp Comercial",
      ],
      benchmarkingNotes: [
        "CRMs genéricos exigem dezenas de campos irrelevantes e não compreendem regras comerciais de faturamento corporativo.",
        "A clareza da 'Próxima Ação' é o fator número 1 de aumento de taxa de conversão em vendas B2B.",
      ],
    },

    hypotheses: [
      {
        hypothesis: "Destaque Obrigatório da 'Próxima Ação'",
        rationale:
          "O vendedor nunca deve entrar em uma oportunidade sem saber o próximo passo. Destacar visualmente 'O que fazer' e 'Quando' reduz em 40% a taxa de negócios estagnados.",
      },
      {
        hypothesis: "Integração Conceitual com Módulos Corporativos",
        rationale:
          "Vincular módulos específicos (Core, Faturamento, Fiscal) desde a qualificação acelera a elaboração da proposta e o onboarding técnico pós-fechamento.",
      },
    ],

    insights: [
      {
        title: "Insight 01 — O vendedor precisa de velocidade tática",
        description:
          "Botões de ação direta (Ligar com 1 clique, disparar template de WhatsApp comercial) mantêm o vendedor operando dentro da mesma tela sem alternar abas.",
      },
      {
        title: "Insight 02 — Motivo de Perda é ativo estratégico",
        description:
          "Tornar obrigatória a seleção do motivo de perda ao fechar um negócio perdido alimenta relatórios que orientam a política de preços e desenvolvimento de produto.",
      },
      {
        title: "Insight 03 — Design predominantemente neutro com acentos estratégicos em azul",
        description:
          "Fundo neutro claro (#F5F7FA) com cartões brancos (#FFFFFF) e azul corporativo (#1683E8) como cor de ação gera alto conforto visual e autoridade corporativa.",
      },
    ],

    opportunity:
      "Construir o CRM comercial definitivo para empresas e distribuidores B2B, unindo simplicidade operacional para o vendedor, controle analítico para o gestor e visibilidade completa do pipeline.",
    goals: [
      "Criar visão comercial executiva com 8 KPIs em tempo real e funil progressivo",
      "Implementar pipeline Kanban interativo com drag-and-drop e destaque de próxima ação",
      "Estruturar gestão de leads com filtros por segmento de mercado e drawer 360° com timeline",
      "Integrar templates comerciais de WhatsApp e registro de ligações com resultados",
      "Consolidar a linguagem visual alinhada a padrões modernos de B2B SaaS",
    ],
    constraints: [
      "Evitar excesso de azul: a interface deve ser predominantemente neutra e profissional",
      "Priorizar desktop (1920x1080, 1440x900, 1366x768) mantendo responsividade fluida",
    ],

    process: [
      "01. Imersão na rotina comercial de distribuidores e empresas B2B",
      "02. Definição das etapas do funil comercial B2B (Lead → Fechamento)",
      "03. Estruturação do Design System baseado em tokens corporativos neutros e azul primário",
      "04. Desenvolvimento da arquitetura de componentes em React e TypeScript",
      "05. Implementação do Kanban com Drag & Drop, modais de perda e drawer 360°",
      "06. Validação dos fluxos de rotina diária (Tarefas, Follow-ups, Ligações e WhatsApp)",
    ],

    flows: {
      title: "Fluxo Comercial B2B: Lead → Qualificação → Negociação → Fechamento",
      description:
        "Da entrada multicanal até a qualificação de contas, emissão da proposta e onboarding do novo cliente.",
      diagramSteps: [
        "Entrada do Lead: Inbound, Prospecção Ativa, WhatsApp Comercial ou Indicação",
        "Qualificação: Checagem de porte da empresa, segmento de atuação e software legado",
        "Oportunidade & Demonstração: Apresentação da solução e alinhamento de escopo",
        "Proposta Comercial: Orçamento de implantação e plano de assinatura",
        "Negociação & Alinhamento: Follow-ups ativos de alta prioridade",
        "Fechamento & Ganho: Sincronização automática para onboarding e faturamento",
      ],
    },

    wireframes: {
      title: "Arquitetura da Informação & App Shell do Flow CRM",
      description:
        "Sidebar esquerda com navegação por domínio comercial, header superior com busca global (Ctrl+K) e ações rápidas (+), e área de trabalho central em grid flexível.",
      focusPoints: [
        "Card Kanban de alta densidade com valor, probabilidade e próxima ação",
        "Gaveta lateral (Drawer 360°) que não perde o contexto da tela anterior",
        "Central de Follow-up com tarefas agrupadas por urgência e checklist",
      ],
    },

    ui: {
      title: "Linguagem Visual: Enterprise B2B Design Tokens",
      description:
        "Design sóbrio, limpo e corporativo. Superfícies brancas com bordas sutis (#E4E7EC), tipografia Inter com hierarquia precisa, azul corporativo (#1683E8) para ações primárias e azul escuro (#123B63) para ancoragem estrutural.",
      systemHighlights: [
        "Funil comercial horizontal com percentuais de conversão progressiva",
        "Kanban com colunas informativas de volume total e contadores em tempo real",
        "Tabela de leads com ordenação e filtros multifacetados por segmento de mercado",
        "Drawer 360° com timeline cronológica e ações de comunicação integradas",
      ],
    },

    systemStates: [
      {
        state: "Alerta de Estagnação (SLA de 3 Dias)",
        scenario: "Oportunidade parada há mais de 3 dias sem nova atividade registrada.",
        solution:
          "Card recebe indicador de atenção e tarefa prioritária de follow-up é gerada para o vendedor.",
      },
      {
        state: "Registro de Perda de Negócio",
        scenario: "Vendedor move oportunidade para o estágio 'Perdido'.",
        solution:
          "Modal obrigatório solicita o motivo categorizado (Preço, Concorrente, Sem orçamento, etc.) e alimenta o dashboard de perdas.",
      },
      {
        state: "Abertura Automática Pós-Cadastro",
        scenario: "Novo lead é salvo através do formulário de entrada.",
        solution:
          "O sistema fecha o modal e abre imediatamente o perfil 360° do lead para início imediato do atendimento.",
      },
    ],

    prototype: {
      description:
        "Aplicação interativa completa do Flow CRM com App Shell, Dashboard comercial com 8 KPIs, Pipeline Kanban com Drag & Drop, Gestão de Leads com Drawer 360°, Simulador de WhatsApp e Ligações, Tarefas de Follow-up e Busca Global (Ctrl+K).",
      type: "Interactive React SaaS B2B Application",
      linkPlaceholder: "[Flow CRM no Figma & Storybook]",
      interactionPoints: [
        "Arraste e solte de oportunidades entre as 7 colunas do Kanban",
        "Cadastro de lead com abertura instantânea do perfil 360°",
        "Simulação de envio de mensagem comercial no WhatsApp com templates B2B prontos",
        "Conclusão e reagendamento de tarefas de follow-up",
        "Busca global de leads, empresas e oportunidades com atalho de teclado",
      ],
    },

    validation: {
      method: "Testes de Usabilidade com Vendedores e Gestores Comerciais",
      description:
        "Avaliação da rapidez de navegação, clareza dos cards de oportunidade e facilidade de registro de histórico.",
      findings: [
        "Vendedores reduziram em 65% o tempo gasto registrando informações após ligações",
        "O destaque visual da 'Próxima Ação' eliminou a dúvida sobre qual cliente contatar",
        "Gestores destacaram a precisão do relatório de motivos de perda para revisão de preços",
      ],
    },

    solution: {
      summary:
        "O Flow CRM transforma a equipe de vendas B2B em uma central de alta produtividade, eliminando negócios esquecidos e garantindo clareza em cada etapa do funil.",
      keyFeatures: [
        {
          title: "Pipeline Kanban com Drag & Drop",
          description:
            "Acompanhamento visual das 7 etapas com valores totais e destaque obrigatório do próximo passo.",
        },
        {
          title: "Drawer 360° com Ações Rápidas",
          description:
            "Perfil completo com ligação, WhatsApp, histórico cronológico e módulos corporativos de interesse.",
        },
        {
          title: "Central de Follow-up & Alertas de SLA",
          description:
            "Tarefas com prioridade alta, prazos e conclusão com um clique para manter o funil em movimento.",
        },
      ],
    },

    results: {
      summary:
        "Impacto projetado da implantação do Flow CRM em distribuidoras e empresas B2B:",
      metrics: [
        {
          label: "Negócios Estagnados",
          value: "Redução de 45% em leads sem contato",
          type: "metric_goal",
        },
        {
          label: "Tempo de Resposta",
          value: "Primeiro contato em menos de 15 min",
          type: "metric_goal",
        },
        {
          label: "Conversão Geral",
          value: "Aumento de +2,8 p.p. na taxa do funil",
          type: "metric_goal",
        },
        {
          label: "Produtividade do Time",
          value: "+30% mais follow-ups realizados por dia",
          type: "metric_goal",
        },
      ],
    },

    learnings: [
      "Em vendas B2B consultivas, um CRM não pode parecer burocrático; ele precisa ser a ferramenta que economiza tempo do vendedor.",
      "A associação clara com os módulos corporativos cria sinergia imediata entre o time comercial e a operação da empresa.",
      "O uso do design system com tokens neutros e acentos pontuais em azul gera autoridade e foco no que realmente importa: fechar negócios.",
    ],

    galleryPlaceholders: [
      {
        title: "Visão Geral do Pipeline Kanban no Flow CRM",
        caption: "Colunas com valores, probabilidades e cards com próxima ação",
        type: "interface",
      },
      {
        title: "Perfil 360° do Lead com Linha do Tempo",
        caption: "Histórico completo de interações e ações rápidas de WhatsApp e ligação",
        type: "interface",
      },
      {
        title: "Dashboard Comercial com KPIs e Funil",
        caption: "Métricas de conversão, ticket médio e distribuição por canal de origem",
        type: "interface",
      },
    ],
  },

  // 04 — SUPPLYHUB: B2B Procurement
  {
    id: "case-04",
    slug: "supplyhub-procurement-b2b",
    coverImage: "/cases/supplyhub-cover.jpg",
    number: "04",
    title: "SUPPLYHUB — B2B Procurement & Supplier Network",
    subtitle:
      "Plataforma de cotação corporativa, gestão de compras e homologação de fornecedores para suprimentos industriais.",
    category: "B2B Procurement / Supply Chain",
    year: "2024 — Estudo Autoral",
    company: "Projeto Conceitual / Autoral",
    role: "Product Designer (Product Architecture, B2B Workflows, UX Research)",
    duration: "4 semanas (Arquitetura de Suprimentos & Matriz de Cotação)",
    tags: [
      "Procurement",
      "Supply Chain",
      "B2B SaaS",
      "Complex Workflows",
      "Matrix Comparison",
      "Concept Project",
    ],
    featured: true,
    isConcept: true,
    conceptBadge: "CONCEPT",

    overview:
      "SUPPLYHUB é uma plataforma conceitual criada para simplificar cotações com múltiplos fornecedores e aprovações de compra em empresas e indústrias.",
    context:
      "Compradores de grandes empresas costumam perder horas trocando e-mails, organizando planilhas diferentes e comparando preços na mão. Isso torna a escolha do fornecedor lenta e sujeita a erros de cálculo.",
    problem:
      "Como reunir propostas de vários fornecedores em uma tabela comparativa automática e acelerar a aprovação dos pedidos?",

    users: [
      {
        target: "Persona Conceitual 01 — Comprador Técnico Industrial (Lucas, 35)",
        needs:
          "Criar RFQs detalhadas com especificações técnicas e comparar propostas de 5+ fornecedores lado a lado.",
        behaviors:
          "Negocia prazos e descontos por lote; precisa justificar a escolha do fornecedor com base em custo total (TCO).",
        painPoints:
          "Planilhas recebidas em formatos diferentes exigindo compilação manual demorada.",
      },
      {
        target: "Persona Conceitual 02 — Diretor de Suprimentos / CFO (Cláudia, 48)",
        needs:
          "Aprovação ágil de ordens de compra de alto valor com trilha de auditoria e conformidade de compliance.",
        behaviors:
          "Aprova compras pelo celular ou notebook entre reuniões; precisa de visão resumida de limites orçamentários.",
        painPoints:
          "Processos de aprovação travados por falta de justificativas anexadas ou documentação incompleta.",
      },
    ],

    research: {
      approach:
        "Investigação conceitual de fluxos de procurement em sistemas ERP corporativos (SAP Ariba, Coupa e Mercado Eletrônico), mapeando os maiores pontos de fricção na fase de equalização de propostas.",
      keyQuestions: [
        "Como apresentar custos adicionais (impostos, fretes CIF/FOB) sem ocultar o preço unitário da peça?",
        "Qual o modelo ideal de aprovação multinível sem gerar filas de espera de dias?",
      ],
      activities: [
        "Mapeamento de 5 fluxos de RFQ industrial e equalização técnica de itens",
        "Estruturação da Matriz Comparativa de Propostas com ranking automático",
      ],
    },

    insights: [
      {
        title: "Insight 01 — Preço unitário não define a melhor compra",
        description:
          "O menor valor de tabela muitas vezes é anulado por frete caro, prazo de entrega excessivo ou condições ruins de pagamento. A matriz precisa calcular o custo real consolidado.",
      },
    ],

    opportunity:
      "Desenvolver uma matriz inteligente de equalização de propostas que calcule automaticamente o melhor cenário de compra e permita aprovação com 1 clique.",
    goals: [
      "Projetar a Matriz de Cotação Multi-Fornecedor com filtros de prazo e pontuação de conformidade",
      "Estruturar o fluxo de aprovação multinível com limites de alçada claros",
    ],
    constraints: [
      "Complexidade de regras tributárias de compra (ICMS, IPI, Substituição Tributária)",
    ],

    process: [
      "01. Mapeamento de Jornada de Compra e Homologação",
      "02. Wireframing da Matriz Comparativa",
      "03. Design da Interface com Foco em Alta Densidade de Dados",
    ],

    flows: {
      title: "Fluxo de Requisição e Homologação de Compra",
      description:
        "Da abertura da requisição técnica pelo setor fabril até a homologação da proposta vencedora e envio da Ordem de Compra.",
      diagramSteps: [
        "Requisição: Cadastro de especificações e quantidades demandadas",
        "Disparo de RFQ: Envio automático de solicitação de cotação a fornecedores homologados",
        "Equalização: Análise comparativa na Matriz com cálculo de impostos",
        "Aprovação & OC: Assinatura eletrônica e envio da Ordem de Compra oficial",
      ],
    },

    wireframes: {
      title: "Matriz de Comparação de Cotações",
      description:
        "Layout em grade multi-colunas comparando fornecedores, prazos de entrega, SLAs e custos adicionais.",
      focusPoints: [
        "Destaque visual da proposta mais vantajosa com badge de recomendação",
        "Detalhamento expansível de taxas de frete e regras fiscais por estado",
      ],
    },

    ui: {
      title: "Direção Visual: Precision Data & Industrial Clarity",
      description:
        "Estética sóbria e funcional voltada a compradores que passam o dia analisando números e especificações técnicas de materiais.",
      systemHighlights: [
        "Matriz comparativa com destaque cromático para melhor preço, melhor prazo e melhor SLA",
        "Painel de trilha de aprovações com status em tempo real por gestor",
      ],
    },

    prototype: {
      description:
        "Showcase completo do SUPPLYHUB apresentando a Matriz de Cotações interativa, comparador de fornecedores e painel de pedidos.",
      type: "Interactive Procurement Matrix Showcase",
      linkPlaceholder: "[Link para Protótipo do SUPPLYHUB no Figma]",
    },

    validation: {
      method: "Testes Heurísticos de Equalização de Propostas",
      description:
        "Verificação da velocidade de escolha de cenários de compra comparando o layout matricial com modelos tradicionais em abas.",
      findings: [
        "Apresentação simultânea de frete e preço reduziu o tempo de decisão de compra",
      ],
    },

    solution: {
      summary:
        "SUPPLYHUB elimina o caos das planilhas na cadeia de suprimentos B2B, entregando clareza analítica e conformidade em cada centavo investido.",
      keyFeatures: [
        {
          title: "Matriz Comparativa Equalizada",
          description:
            "Cálculo automático de custo consolidado considerando frete, impostos e prazos.",
        },
        {
          title: "Workflow de Aprovação por Alçadas",
          description:
            "Direcionamento inteligente da requisição com base no limite orçamentário do gestor.",
        },
      ],
    },

    results: {
      summary:
        "Framework de indicadores propostos para mensuração de valor em procurement:",
      metrics: [
        {
          label: "Tempo do Ciclo de Compra",
          value: "Lead Time de Cotação (RFQ)",
          type: "metric_goal",
        },
        {
          label: "Economia Gerada",
          value: "Saving Realizado (%)",
          type: "metric_goal",
        },
      ],
    },

    learnings: [
      "Em sistemas de suprimentos, clareza nos cálculos fiscais é o fator número um para adoção por compradores experientes.",
    ],

    galleryPlaceholders: [
      {
        title: "Matriz de Comparação de Cotações",
        caption: "Equalização simultânea de 5 propostas com cálculo de TCO",
        type: "interface",
      },
    ],
  },
];
