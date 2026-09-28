"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Compass,
  Users,
  Bookmark,
  MessageSquare,
  Repeat2,
  Share2,
  Check,
  Search,
  Hash,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Sliders,
  ChevronRight,
  Send,
  Eye,
  Bell,
  User,
  ExternalLink,
  Smartphone,
  Palette,
  CheckCircle2,
  TrendingUp,
  Grid,
  ShieldCheck,
  Scale,
  Copy,
  Info,
  X,
  ArrowRight,
  ArrowLeft,
  CornerDownRight,
  Flame,
  Radio,
  FileText,
  Clock,
  Filter,
  Calendar,
  Building2,
  Plus,
  MoreVertical,
  MoreHorizontal,
  Volume2,
  CheckSquare,
  RotateCw,
  Zap,
  Network,
  GitBranch,
  Split,
  Target,
  Workflow,
  Crosshair,
} from "lucide-react";

interface ScreenMeta {
  id: string;
  number: string;
  name: string;
  category: string;
  image: string;
  tagline: string;
  description: string;
  keyElements: string[];
  designRationale: string;
  systemTokens: {
    typography: string;
    surface: string;
    border: string;
  };
}

const SCREENS: ScreenMeta[] = [
  {
    id: "home_feed",
    number: "01",
    name: "Feed Editorial Curado",
    category: "Core Feed",
    image: "/projects/pulse/pulse_home_feed.png",
    tagline: "EDITION 042 // CURATED — O sinal prevalece sobre o ruído",
    description:
      "O feed principal do PULSE abandona algoritmos de recomendação baseados em retenção passiva e cliques sensacionalistas. Organizado por edições temáticas ('Edition 042 // Curated'), oferece filtros horizontais instantâneos e postagens em formato de ensaio com enquetes táticas integradas.",
    keyElements: [
      "Ticker 'Live Feed' com pulso dinâmico e identificador de edição editorial",
      "Pílulas horizontais de filtragem: All Signal, Communities, Discussions, Polls, Architecture, AI",
      "Cartão de autor com citação explícita da comunidade (c/DesignEthics) e tópico (#GenerativeDesign)",
      "Enquete interativa integrada ao fluxo sem redirecionamento para formulários externos",
    ],
    designRationale:
      "A hierarquia tipográfica liderada pela Space Grotesk estabelece peso e autoridade de publicação impressa, enquanto a Hanken Grotesk garante leitura confortável de parágrafos extensos sem fadiga visual.",
    systemTokens: {
      typography: "Space Grotesk (700/600) + Hanken Grotesk (400)",
      surface: "Obsidian Canvas #050505 / Containers #111111",
      border: "Hairline Subdued #2C2C2E (1px)",
    },
  },
  {
    id: "discover_search",
    number: "02",
    name: "Discovery & Matriz Temática",
    category: "Discovery",
    image: "/projects/pulse/pulse_discover_search.png",
    tagline: "Descoberta sem viés de popularidade viral",
    description:
      "Tela de exploração desenhada para mapear conhecimento emergente através de coleções selecionadas por curadores humanos e gráficos de tópicos afins, permitindo ao usuário navegar por conceitos em vez de seguir celebridades.",
    keyElements: [
      "Matriz de busca estruturada com autocompletar semântico de canais e conceitos",
      "Coleções editoriais em destaque com capas de alto contraste",
      "Seção de Tópicos em Frequência (#GenerativeDesign, #TypeArchitecture, #SystemsThinking)",
      "Recomendação de novos nós com base no grafo de interesses ativo do usuário",
    ],
    designRationale:
      "Elimina listas de 'Trending Topics' focadas em controvérsias momentâneas. O discovery privilegia consistência temática e densidade de pesquisa.",
    systemTokens: {
      typography: "Space Grotesk (Titling) + Mono Labels",
      surface: "Elevated Cards #1C1C1E",
      border: "Hairline Subdued #232326",
    },
  },
  {
    id: "community_page",
    number: "03",
    name: "Hub de Comunidade",
    category: "Community",
    image: "/projects/pulse/pulse_community_page.png",
    tagline: "Espaços delimitados por manifesto, regras e rituais",
    description:
      "Página da comunidade 'c/BrutalistForm' demonstrando a arquitetura de espaços autônomos dentro do PULSE. Inclui cabeçalho com número de membros ativos, manifesto comunitário fixado, diretrizes explícitas de convivência e subcanais temáticos.",
    keyElements: [
      "Identificador canônico com contagem de membros ativos e moderadores verificados",
      "Manifesto da Comunidade fixado no topo com objetivos e tom de conversa esperado",
      "Diretrizes claras de moderação para blindar o espaço contra spam e autopromoção",
      "Segmentação por canais de discussão específicos (Discourse, Critique, Resources)",
    ],
    designRationale:
      "Comunidades não são meros grupos de mensagens; elas funcionam como publicações coletivas governadas por seus membros.",
    systemTokens: {
      typography: "Space Grotesk Display + Body-md Hanken",
      surface: "Surface Low #161618",
      border: "Hairline Contrast #2C2C2E",
    },
  },
  {
    id: "post_detail",
    number: "04",
    name: "Leitura Imersiva & Thread",
    category: "Reading & Debate",
    image: "/projects/pulse/pulse_post_detail.png",
    tagline: "Foco tipográfico profundo e debates aninhados",
    description:
      "A visualização de leitura imersiva transforma qualquer post em uma experiência editorial. O layout valoriza o tempo de leitura, citações de trechos e respostas encadeadas por guias visuais contínuas, sem interrupções de banners ou ruídos laterais.",
    keyElements: [
      "Abertura em corpo de texto generoso com entrelinha aberta para leitura reflexiva",
      "Anotações marginais e citações diretas com recuo estilizado",
      "Árvore de respostas aninhadas com conectores visuais lineares (Thread Branches)",
      "Ações de interação calmas: Re-emitir sinal, Responder com argumento e Salvar na biblioteca",
    ],
    designRationale:
      "Ao remover botões chamativos de 'like' e contadores de visualizações em tempo real, a interface desacelera a ansiedade do leitor e estimula respostas ponderadas.",
    systemTokens: {
      typography: "Hanken Grotesk 17px / 26px line-height",
      surface: "Deep Canvas #050505",
      border: "Guide Line #2C2C2E",
    },
  },
  {
    id: "create_post",
    number: "05",
    name: "Publicação com Vínculo Temático",
    category: "Composer",
    image: "/projects/pulse/pulse_create_post.png",
    tagline: "Nenhum sinal é publicado no vazio",
    description:
      "O composer do PULSE introduz uma fricção positiva essencial: o autor é orientado a vincular obrigatoriamente sua publicação a uma Comunidade ou Tópico (#), escolher o formato do sinal (Ensaio, Discussão, Enquete, Link de Referência) e definir a síntese conceitual.",
    keyElements: [
      "Seletor obrigatório de Comunidade de destino ('Select Community / Channel')",
      "Seletor de formato de sinal: Ensaio Longo, Debate Rápido, Enquete ou Referência",
      "Área de redação com suporte nativo a títulos fortes e corpo markdown",
      "Tagging temático estruturado com validação de relevância em tempo real",
    ],
    designRationale:
      "A fricção construtiva educa o usuário a pensar na utilidade do que publica, evitando tweets soltos desprovidos de contexto ou valor compartilhado.",
    systemTokens: {
      typography: "Space Grotesk Input + Mono Helper",
      surface: "Input Area #161618",
      border: "Active Border #48484A",
    },
  },
  {
    id: "onboarding_experience",
    number: "06",
    name: "Onboarding de Interesses",
    category: "Activation",
    image: "/projects/pulse/pulse_onboarding_experience.png",
    tagline: "Ativação Day-1 sem depender da agenda de contatos",
    description:
      "Experiência de primeiro acesso desenhada para mapear as afinidades intelectuais do usuário em menos de 60 segundos. O usuário seleciona ao menos 3 macro-interesses e nós temáticos para gerar um feed útil desde o primeiro segundo.",
    keyElements: [
      "Matriz de seleção de interesses com chips táteis de alto contraste",
      "Indicador de progresso mínimo (Ex: 'Selecione pelo menos 3 tópicos')",
      "Sugestões contextuais de comunidades de alta qualidade vinculadas aos temas escolhidos",
      "CTA de transição direta para a primeira edição personalizada do feed",
    ],
    designRationale:
      "Garante a ativação do usuário mesmo que ele não conheça ninguém na plataforma no primeiro dia, eliminando o problema do 'cold start' social.",
    systemTokens: {
      typography: "Space Grotesk Headline + Pill Badges",
      surface: "Base Card #161618",
      border: "Selection Pill #FFFFFF",
    },
  },
  {
    id: "notifications_hub",
    number: "07",
    name: "Central de Sinais & Notificações",
    category: "Activity",
    image: "/projects/pulse/pulse_notifications_hub.png",
    tagline: "Apenas notificações de alto valor sem ruído de vaidade",
    description:
      "Hub de notificações saneado que agrupa respostas substanciais a ensaios, convites para debates de comunidades e sínteses semanais de leitura. Notificações superficiais de 'alguém visualizou seu perfil' ou curtidas em lote são descartadas.",
    keyElements: [
      "Abas de filtro: Todos os Sinais, Menções em Debates, Atualizações de Comunidades",
      "Trecho contextual da resposta exibido diretamente na notificação para leitura rápida",
      "Agrupamento inteligente por linha de discussão para evitar spam de alertas",
      "Marcação rápida de lido e arquivamento com gesto de swipe",
    ],
    designRationale:
      "Respeito ao tempo e atenção do usuário (*Calm Design*). Notificações são tratadas como correspondências importantes, não como gatilhos de dopamina.",
    systemTokens: {
      typography: "Space Grotesk Micro + Body Hanken",
      surface: "Row Container #111111",
      border: "Separator Hairline #232326",
    },
  },
  {
    id: "saved_library",
    number: "08",
    name: "Biblioteca & Leituras Salvas",
    category: "Archive",
    image: "/projects/pulse/pulse_saved_library.png",
    tagline: "Seu repositório pessoal de referências e ensaios",
    description:
      "A biblioteca do PULSE funciona como uma ferramenta de curadoria e pesquisa. Os usuários organizam publicações salvas em coleções temáticas com notas pessoais, estimativa de tempo de leitura e suporte a leitura offline.",
    keyElements: [
      "Coleções personalizadas ('Design Systems', 'AI Ethics', 'Architecture Manifestos')",
      "Indicador de progresso de leitura em ensaios longos ('5 min restantes')",
      "Filtros por formato: Apenas Textos, Apenas Enquetes, Referências Bibliográficas",
      "Exportação facilitada de notas e citações em Markdown",
    ],
    designRationale:
      "Transforma o consumo efêmero de redes sociais em um ativo intelectual duradouro para estudos e projetos de longo prazo.",
    systemTokens: {
      typography: "Space Grotesk Titles + Meta Labels",
      surface: "Library Cards #1C1C1E",
      border: "Subtle Hairline #2C2C2E",
    },
  },
  {
    id: "user_profile",
    number: "09",
    name: "Perfil do Criador / Curador",
    category: "Identity",
    image: "/projects/pulse/pulse_user_profile.png",
    tagline: "Repertório intelectual no lugar de métricas de vaidade",
    description:
      "O perfil no PULSE reflete a produção de conhecimento e o histórico de curadoria do membro. No lugar de contadores gigantescos de seguidores, destaca os tópicos mais aprofundados pelo autor, ensaios publicados e comunidades em que atua.",
    keyElements: [
      "Cabeçalho editorial com biografia reflexiva e links para pesquisas externas",
      "Métricas focadas em contribuição: Sinais Emitidos, Coleções Criadas e Debates Moderados",
      "Nuvem de Afinidades Temáticas mostrando os tópicos em que o autor possui maior densidade",
      "Abas de conteúdo: Ensaios, Discussões Ativas, Respostas e Coleções Públicas",
    ],
    designRationale:
      "Redefine o conceito de autoridade digital: ela advém da consistência das reflexões compartilhadas e não da quantidade de seguidores acumulados.",
    systemTokens: {
      typography: "Space Grotesk Display + Metadata Mono",
      surface: "Profile Slate #131313",
      border: "Editorial Frame #2C2C2E",
    },
  },
  {
    id: "empty_error_states",
    number: "10",
    name: "Estados de Borda & Resiliência",
    category: "System States",
    image: "/projects/pulse/pulse_empty_error_states.png",
    tagline: "Resiliência visual e feedback claro nas bordas do sistema",
    description:
      "Design de estados de exceção garantindo que o usuário nunca encontre telas em branco confusas. Apresenta o tratamento para canais sem sinal recente ('No signal in this frequency') e interrupções de conexão de rede com orientação humana e recuperação em 1 toque.",
    keyElements: [
      "Empty state temático com ilustração minimalista e sugestões de exploração",
      "Error state com diagnóstico transparente da falha de conexão",
      "Botão de ação de alta visibilidade ('Reconectar ao Sinal')",
      "Tom de voz editorial consistente mesmo em momentos de falha técnica",
    ],
    designRationale:
      "Product Designers seniores projetam para o erro tanto quanto para o caminho feliz. A transparência na falha constrói confiança com o usuário.",
    systemTokens: {
      typography: "Space Grotesk Status + Mono Help",
      surface: "Alert Canvas #161618",
      border: "Error Border #444748",
    },
  },
];

export default function PulseMobileShowcase() {
  const [selectedScreenId, setSelectedScreenId] = useState<string>("home_feed");
  const [viewMode, setViewMode] = useState<"render" | "simulator" | "grid">(
    "render"
  );
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Deep-Dive Explorations State
  const [selectedPersona, setSelectedPersona] = useState<"lara" | "rodrigo">(
    "lara"
  );
  const [selectedAnatomy, setSelectedAnatomy] = useState<"essay" | "composer">(
    "essay"
  );
  const [selectedGraphNode, setSelectedGraphNode] = useState<
    "pessoas" | "comunidades" | "interesses" | "topicos" | "eventos"
  >("comunidades");

  // Inspector Overlays
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [showContrastAudit, setShowContrastAudit] = useState(false);

  // Feed State
  const [feedFilter, setFeedFilter] = useState("All Signal");
  const [pollVoted, setPollVoted] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState([54, 31, 15]);
  const [bookmarked, setBookmarked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [pulsedCount, setPulsedCount] = useState(142);
  const [isPulsed, setIsPulsed] = useState(false);

  // Onboarding State
  const [onboardingSelectedTopics, setOnboardingSelectedTopics] = useState<
    string[]
  >([
    "Architecture & Brutalism",
    "Generative Systems",
    "Typography & Print",
    "Sound Design & Ambient",
  ]);
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([
    "c/brutalism-core",
    "c/generative-lab",
  ]);

  // Composer Form State
  const [composerCommunity, setComposerCommunity] = useState("c/DesignEthics");
  const [composerTopic, setComposerTopic] = useState("#GenerativeDesign");
  const [composerTitle, setComposerTitle] = useState("");
  const [composerBody, setComposerBody] = useState("");
  const [composerFormat, setComposerFormat] = useState("Text");
  const [crossPostActive, setCrossPostActive] = useState(true);
  const [communityNotifsActive, setCommunityNotifsActive] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Strategy Comparison Matrix State
  const [comparisonMode, setComparisonMode] = useState<"pulse" | "traditional">(
    "pulse"
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const selectedScreen =
    SCREENS.find((s) => s.id === selectedScreenId) || SCREENS[0];

  const handlePollVote = (optionIndex: number) => {
    if (pollVoted !== null) return;
    setPollVoted(optionIndex);
    const updated = [...pollVotes];
    updated[optionIndex] += 1;
    setPollVotes(updated);
    showToast("Voto anônimo computado com sucesso no nó.");
  };

  const handlePulseToggle = () => {
    if (!isPulsed) {
      setPulsedCount(pulsedCount + 1);
      setIsPulsed(true);
      showToast("Sinal amplificado com sucesso (+1).");
    } else {
      setPulsedCount(pulsedCount - 1);
      setIsPulsed(false);
      showToast("Amplificação removida.");
    }
  };

  const handleToggleTopic = (topic: string) => {
    if (onboardingSelectedTopics.includes(topic)) {
      setOnboardingSelectedTopics(
        onboardingSelectedTopics.filter((t) => t !== topic)
      );
    } else {
      setOnboardingSelectedTopics([...onboardingSelectedTopics, topic]);
    }
  };

  const handleToggleCommunity = (name: string) => {
    if (joinedCommunities.includes(name)) {
      setJoinedCommunities(joinedCommunities.filter((c) => c !== name));
      showToast(`Deixou de sintonizar ${name}`);
    } else {
      setJoinedCommunities([...joinedCommunities, name]);
      showToast(`Sintonizado em ${name}`);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`✓ Sinal publicado com sucesso em ${composerCommunity}`);
    setSelectedScreenId("home_feed");
  };

  const jumpToSimulatorScreen = (screenId: string) => {
    setSelectedScreenId(screenId);
    setViewMode("simulator");
    showToast(`Simulador sincronizado com Tela: ${screenId}`);
  };

  return (
    <div className="border border-surface-border bg-neutral-950 p-6 sm:p-10 space-y-12">
      {/* Header Controller */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-800 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              PULSE // Mobile Interface System
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-neutral-900 border border-neutral-700 text-neutral-300 rounded">
              10 Telas Projetadas
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-neutral-900 border border-neutral-800 text-neutral-400 rounded hidden sm:inline-block">
              Simulador Multi-Fluxo &amp; Bento Grid
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Design System &ldquo;Monochrome Editorial Social&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-2xl leading-relaxed">
            Exploração de telas mobile com estética monocromática refinada, tipografia editorial (Space Grotesk + Hanken Grotesk) e arquitetura centrada em comunidades e interesses sem algoritmos apelativos.
          </p>
        </div>

        {/* View Mode Toggle (3 Modes: Render, Simulator, Grid) */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-neutral-900/90 p-1.5 border border-neutral-800 rounded-lg">
            <button
              onClick={() => setViewMode("render")}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-md transition-all ${
                viewMode === "render"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Alta Resolução</span>
            </button>

            <button
              onClick={() => setViewMode("simulator")}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-md transition-all ${
                viewMode === "simulator"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulador</span>
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Grid 10 Telas</span>
            </button>
          </div>

          {/* Quick Inspector Badges */}
          <div className="flex items-center gap-1.5 bg-neutral-900/80 p-1.5 border border-neutral-800 rounded-lg text-xs font-mono">
            <button
              onClick={() => setShowGridOverlay(!showGridOverlay)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors ${
                showGridOverlay
                  ? "bg-neutral-800 text-white border border-neutral-600 font-semibold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
              title="Ativar sobreposição de grelha 8pt e caixas de toque 44px"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid 8pt</span>
            </button>

            <button
              onClick={() => setShowContrastAudit(!showContrastAudit)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors ${
                showContrastAudit
                  ? "bg-neutral-800 text-white border border-neutral-600 font-semibold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
              title="Auditoria de Contraste WCAG AAA"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>WCAG AAA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Screen Selection Carousel / Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="uppercase tracking-wider">
            Selecione uma das 10 Telas do Sistema:
          </span>
          <span className="text-white">
            {selectedScreen.number} / 10 — {selectedScreen.name}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {SCREENS.map((screen) => {
            const isSelected = screen.id === selectedScreenId;
            return (
              <button
                key={screen.id}
                onClick={() => setSelectedScreenId(screen.id)}
                className={`p-2.5 text-left border rounded-lg transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? "border-white bg-neutral-900 text-white shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]"
                    : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-[10px] text-neutral-500">
                    {screen.number}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <div className="text-[11px] font-medium truncate leading-tight">
                  {screen.name.split(" ")[0]}
                </div>
                <span className="text-[9px] font-mono text-neutral-500 uppercase truncate">
                  {screen.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODE 1 & 2: PHONE STAGE + SCREEN DETAILS (When NOT in Grid Mode) */}
      {viewMode !== "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mobile Device Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[380px] rounded-[48px] border-[8px] border-neutral-800 bg-black p-3.5 shadow-[0_0_60px_-15px_rgba(255,255,255,0.15)] ring-1 ring-neutral-700 relative overflow-hidden">
              {/* Dynamic Island / Speaker Pill */}
              <div className="w-28 h-4 bg-neutral-900 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-800 mr-2" />
                <div className="w-2 h-2 rounded-full bg-neutral-950 border border-neutral-800" />
              </div>

              {/* View Mode: High-Res Render of Screen */}
              {viewMode === "render" && (
                <div className="relative aspect-[9/19.5] w-full rounded-[30px] overflow-hidden bg-neutral-950 border border-neutral-900 group">
                  <Image
                    src={selectedScreen.image}
                    alt={selectedScreen.name}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 380px"
                    priority
                  />

                  {/* Grid Overlay if toggled */}
                  {showGridOverlay && (
                    <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:8px_8px]">
                      <div className="absolute top-4 left-4 px-2 py-0.5 bg-black/80 border border-neutral-700 text-[9px] font-mono text-neutral-300 rounded">
                        8pt Baseline System
                      </div>
                    </div>
                  )}

                  {/* Contrast Badges if toggled */}
                  {showContrastAudit && (
                    <div className="absolute inset-0 pointer-events-none z-20 p-4 flex flex-col justify-between">
                      <span className="self-end px-1.5 py-0.5 bg-white text-black font-mono text-[9px] font-bold rounded shadow">
                        21:1 (AAA)
                      </span>
                      <span className="self-start px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-200 font-mono text-[9px] rounded shadow">
                        14.6:1 (AAA)
                      </span>
                    </div>
                  )}

                  {/* Hover overlay to expand */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setFullscreenImage(selectedScreen.image)}
                      className="px-4 py-2 bg-white text-black text-xs font-mono font-medium rounded-full shadow-lg flex items-center gap-2 hover:bg-neutral-200 transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Expandir Tela</span>
                    </button>
                  </div>

                  {/* Bottom screen badge */}
                  <div className="absolute bottom-2 inset-x-2 bg-black/80 backdrop-blur-md border border-neutral-800/80 px-3 py-1.5 rounded-full flex items-center justify-between text-[10px] font-mono text-neutral-300">
                    <span className="truncate">{selectedScreen.name}</span>
                    <span className="text-neutral-500 uppercase">
                      {selectedScreen.number}/10
                    </span>
                  </div>
                </div>
              )}

              {/* View Mode: Interactive Live React Simulator Rendering Exact Screen */}
              {viewMode === "simulator" && (
                <div className="relative aspect-[9/19.5] w-full rounded-[30px] overflow-hidden bg-[#0e0e0e] text-[#e5e2e1] border border-neutral-800 flex flex-col font-sans select-none">
                  {/* Grid Overlay inside Simulator if toggled */}
                  {showGridOverlay && (
                    <div className="absolute inset-0 pointer-events-none z-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:8px_8px]" />
                  )}

                  {/* Toast message in Simulator */}
                  {toastMessage && (
                    <div className="absolute top-12 inset-x-3 z-40 bg-neutral-900 border border-white/30 text-white text-[10px] font-mono p-2 rounded shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                      <span className="truncate pr-2">{toastMessage}</span>
                      <button
                        onClick={() => setToastMessage(null)}
                        className="text-neutral-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* DYNAMIC SCREEN CONTENT IN SIMULATOR */}
                  <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
                    {/* SCREEN 01: HOME FEED */}
                    {selectedScreenId === "home_feed" && (
                      <div className="flex-1 flex flex-col">
                        <div className="px-4 py-3 border-b border-[#2C2C2E] bg-[#131313] flex items-center justify-between shrink-0">
                          <button
                            onClick={() =>
                              setSelectedScreenId("discover_search")
                            }
                            className="text-neutral-400 hover:text-white"
                          >
                            <Search className="w-4 h-4" />
                          </button>
                          <span className="font-bold tracking-tight text-white font-mono text-sm">
                            PULSE
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setSelectedScreenId("notifications_hub")
                              }
                              className="relative text-neutral-400 hover:text-white"
                            >
                              <Bell className="w-4 h-4" />
                              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-white" />
                            </button>
                            <div
                              onClick={() => setSelectedScreenId("user_profile")}
                              className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden cursor-pointer"
                            >
                              <div className="w-full h-full flex items-center justify-center text-[9px] text-white font-mono font-bold">
                                KV
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 space-y-3 flex-1">
                          <div className="flex items-center justify-between text-[10px] font-mono border-b border-[#2C2C2E] pb-1 text-neutral-400">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              <span className="text-white uppercase font-semibold">
                                Live Feed
                              </span>
                            </div>
                            <span>EDITION 042 // CURATED</span>
                          </div>

                          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[11px] font-mono">
                            {[
                              "All Signal",
                              "Communities",
                              "Discussions",
                              "Polls",
                              "Architecture",
                              "AI Systems",
                            ].map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setFeedFilter(cat)}
                                className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
                                  feedFilter === cat
                                    ? "bg-white text-black font-semibold"
                                    : "bg-[#1c1b1b] border border-[#2C2C2E] text-neutral-400 hover:text-white"
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>

                          {/* Post 1 */}
                          <div className="p-3 bg-[#161618] border border-[#2C2C2E] rounded-xl space-y-2.5">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] text-white font-mono font-bold">
                                  MV
                                </div>
                                <div>
                                  <div className="flex items-center gap-1 text-[11px]">
                                    <span className="font-semibold text-white">
                                      Marcus Vance
                                    </span>
                                    <span className="text-neutral-500 font-mono text-[10px]">
                                      @mvance
                                    </span>
                                  </div>
                                  <div className="text-[10px] font-mono text-neutral-400">
                                    c/DesignEthics in #GenerativeDesign
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono text-neutral-500">
                                24m
                              </span>
                            </div>

                            <h4
                              onClick={() => setSelectedScreenId("post_detail")}
                              className="text-xs font-semibold text-white leading-snug hover:underline cursor-pointer"
                            >
                              Are we losing the tactile grain in computational art?
                            </h4>

                            <p className="text-[11px] text-neutral-300 leading-relaxed font-light">
                              Why the return to monochromatic physical print holds lessons for digital canvas tools. Vector engines eliminate friction.
                            </p>

                            <div className="pt-2 border-t border-[#2C2C2E] flex items-center justify-between text-neutral-400 text-[10px] font-mono">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => setReposted(!reposted)}
                                  className={`flex items-center gap-1 ${
                                    reposted ? "text-white font-bold" : ""
                                  }`}
                                >
                                  <Repeat2 className="w-3.5 h-3.5" />
                                  <span>{reposted ? "143" : "142"}</span>
                                </button>
                                <button
                                  onClick={() =>
                                    setSelectedScreenId("post_detail")
                                  }
                                  className="flex items-center gap-1 hover:text-white"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>38</span>
                                </button>
                              </div>
                              <button
                                onClick={() => setBookmarked(!bookmarked)}
                                className={bookmarked ? "text-white" : ""}
                              >
                                <Bookmark
                                  className={`w-3.5 h-3.5 ${
                                    bookmarked ? "fill-white" : ""
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          {/* Post 2: Poll */}
                          <div className="p-3 bg-[#161618] border border-[#2C2C2E] rounded-xl space-y-2">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-white">
                                Elena Rostova · c/SoundSynthesis
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-300 rounded">
                                ENQUETE
                              </span>
                            </div>
                            <p className="text-xs text-white font-medium">
                              Primary monitoring environment when scoring long-form ambient soundscapes:
                            </p>
                            <div className="space-y-1.5 text-[11px] font-mono">
                              {[
                                "Studio Open-Back Headphones",
                                "Nearfield Linear Monitors",
                                "Spatial Audio Binaural",
                              ].map((opt, idx) => {
                                const total = pollVotes.reduce(
                                  (a, b) => a + b,
                                  0
                                );
                                const pct = Math.round(
                                  (pollVotes[idx] / total) * 100
                                );
                                const isChosen = pollVoted === idx;
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => handlePollVote(idx)}
                                    className={`w-full text-left p-2 rounded border relative overflow-hidden transition-all ${
                                      isChosen
                                        ? "border-white bg-neutral-900 text-white font-bold"
                                        : "border-[#2C2C2E] bg-neutral-900/40 text-neutral-300"
                                    }`}
                                  >
                                    {pollVoted !== null && (
                                      <div
                                        className="absolute inset-y-0 left-0 bg-neutral-800/80 -z-0"
                                        style={{ width: `${pct}%` }}
                                      />
                                    )}
                                    <div className="relative z-10 flex items-center justify-between">
                                      <span className="truncate pr-2">
                                        {opt}
                                      </span>
                                      <span className="font-mono text-[10px] text-white">
                                        {pct}%
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCREEN 02: DISCOVER SEARCH */}
                    {selectedScreenId === "discover_search" && (
                      <div className="flex-1 flex flex-col p-3 space-y-3 font-mono">
                        <div className="flex items-baseline justify-between border-b border-neutral-800 pb-2">
                          <h4 className="font-bold text-white text-base tracking-tight font-sans">
                            DISCOVER
                          </h4>
                          <span className="text-[10px] text-neutral-500">
                            EDITION 09.24
                          </span>
                        </div>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-500" />
                          <input
                            type="text"
                            placeholder="Search topics, communities..."
                            className="w-full bg-[#161618] border border-neutral-800 rounded-lg pl-8 pr-8 py-2 text-[11px] text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] text-neutral-400 border-b border-neutral-850 pb-1">
                            <span className="flex items-center gap-1 font-bold text-white uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              Trending in Topics
                            </span>
                            <span>LIVE FLOW</span>
                          </div>
                          <div className="divide-y divide-neutral-850 border border-neutral-800 rounded-lg bg-[#161618] text-[11px]">
                            {[
                              {
                                num: "01",
                                tag: "#ComputationalType",
                                disc: "4.2k discussions",
                              },
                              {
                                num: "02",
                                tag: "#NeuromorphicChipsets",
                                disc: "1.8k discussions",
                              },
                              {
                                num: "03",
                                tag: "#AnalogPrintPreservation",
                                disc: "950 discussions",
                              },
                            ].map((t) => (
                              <div
                                key={t.num}
                                className="p-2 flex items-center justify-between hover:bg-neutral-900 cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-neutral-500 font-bold">
                                    {t.num}
                                  </span>
                                  <div>
                                    <div className="text-white font-medium">
                                      {t.tag}
                                    </div>
                                    <div className="text-[9px] text-neutral-500 font-sans">
                                      {t.disc}
                                    </div>
                                  </div>
                                </div>
                                <ArrowRight className="w-3 h-3 text-neutral-500" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCREEN 03: COMMUNITY */}
                    {selectedScreenId === "community_page" && (
                      <div className="flex-1 flex flex-col font-mono text-xs">
                        <div className="h-24 bg-neutral-900 border-b border-neutral-800 p-3 flex flex-col justify-between">
                          <span className="text-[9px] text-neutral-500">
                            INDEX // ARCH-01
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-white font-sans">
                              c/BrutalistForm
                            </h4>
                            <span className="text-[9px] text-neutral-400">
                              EST. 2021 · MONOLITHIC DISCOURSE
                            </span>
                          </div>
                        </div>
                        <div className="p-3 space-y-2.5">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-white font-bold">
                              42.8k membros · 1.2k online
                            </span>
                            <button
                              onClick={() =>
                                handleToggleCommunity("c/BrutalistForm")
                              }
                              className="px-2.5 py-1 bg-white text-black font-bold rounded"
                            >
                              {joinedCommunities.includes("c/BrutalistForm")
                                ? "Joined"
                                : "Join"}
                            </button>
                          </div>
                          <div className="p-2.5 bg-[#161618] border border-neutral-800 rounded space-y-1">
                            <span className="text-[9px] text-white font-bold block">
                              PINNED MANIFESTO
                            </span>
                            <h5 className="text-xs text-white font-sans font-semibold">
                              On the permanence of raw materials: Why digital design is experiencing its own brutalist resurgence.
                            </h5>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCREEN 04: POST DETAIL */}
                    {selectedScreenId === "post_detail" && (
                      <div className="flex-1 flex flex-col p-3 space-y-3 font-sans">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                          <button
                            onClick={() => setSelectedScreenId("home_feed")}
                            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                          </button>
                          <span className="font-mono text-[10px] text-neutral-400">
                            c/DesignEthics
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white">
                          Are we losing the tactile grain in computational art?
                        </h3>
                        <p className="text-[11px] text-neutral-300 leading-relaxed font-light">
                          Why the return to monochromatic physical print holds lessons for digital canvas tools.
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-[10px] font-mono">
                          <button
                            onClick={handlePulseToggle}
                            className={`flex items-center gap-1 ${
                              isPulsed ? "text-white font-bold" : "text-neutral-400"
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>{pulsedCount}</span>
                          </button>
                          <span className="text-neutral-400">38 respostas</span>
                        </div>
                      </div>
                    )}

                    {/* SCREEN 05: CREATE POST */}
                    {selectedScreenId === "create_post" && (
                      <form
                        onSubmit={handlePublish}
                        className="flex-1 flex flex-col p-3 space-y-3 font-mono text-xs"
                      >
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                          <button
                            type="button"
                            onClick={() => setSelectedScreenId("home_feed")}
                            className="text-neutral-400 hover:text-white"
                          >
                            Cancelar
                          </button>
                          <span className="font-bold text-white text-xs">
                            Novo Sinal
                          </span>
                          <button
                            type="submit"
                            className="px-3 py-1 bg-white text-black font-bold rounded-full text-[10px]"
                          >
                            Publicar
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Título da Tese (opcional)"
                          value={composerTitle}
                          onChange={(e) => setComposerTitle(e.target.value)}
                          className="w-full bg-transparent border-b border-neutral-800 py-1 text-white font-bold focus:outline-none text-xs"
                        />
                        <textarea
                          rows={4}
                          placeholder="Desenvolva sua tese com rigor reflexivo..."
                          value={composerBody}
                          onChange={(e) => setComposerBody(e.target.value)}
                          className="w-full bg-transparent text-[11px] text-neutral-200 focus:outline-none resize-none font-sans"
                        />
                      </form>
                    )}

                    {/* SCREEN 06: ONBOARDING */}
                    {selectedScreenId === "onboarding_experience" && (
                      <div className="flex-1 flex flex-col p-3 space-y-3 font-sans">
                        <div className="flex justify-between font-mono text-[10px] text-neutral-400 border-b border-neutral-800 pb-1">
                          <span className="text-white font-bold">PULSE // CURATION</span>
                          <span>STEP 03 / 04</span>
                        </div>
                        <h4 className="text-base font-bold text-white font-mono">
                          Tune your signal.
                        </h4>
                        <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                          {[
                            "Architecture & Brutalism",
                            "Generative Systems",
                            "Typography & Print",
                            "Sound Design & Ambient",
                            "Cognitive Science",
                          ].map((t) => (
                            <button
                              key={t}
                              onClick={() => handleToggleTopic(t)}
                              className={`px-2 py-0.5 rounded-full border ${
                                onboardingSelectedTopics.includes(t)
                                  ? "bg-white text-black font-bold border-white"
                                  : "bg-[#161618] border-neutral-800 text-neutral-400"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedScreenId("home_feed");
                            showToast("Feed calibrado com sucesso.");
                          }}
                          className="w-full py-2 bg-white text-black font-mono font-bold text-xs rounded mt-auto"
                        >
                          Enter PULSE →
                        </button>
                      </div>
                    )}

                    {/* SCREEN 07: NOTIFICATIONS */}
                    {selectedScreenId === "notifications_hub" && (
                      <div className="flex-1 flex flex-col p-3 space-y-2 font-mono text-xs">
                        <h4 className="font-bold text-white text-sm border-b border-neutral-800 pb-1">
                          NOTIFICATIONS (4 NEW)
                        </h4>
                        <div className="p-2 bg-[#161618] border border-neutral-800 rounded font-sans text-[11px]">
                          c/BrutalistForm pinned a new manifesto: &ldquo;On the permanence of raw materials...&rdquo;
                        </div>
                        <div className="p-2 bg-[#161618] border border-neutral-800 rounded font-sans text-[11px]">
                          Your essay &ldquo;Spatial hierarchy inside concrete vaults&rdquo; surpassed 500 echoes.
                        </div>
                      </div>
                    )}

                    {/* SCREEN 08: SAVED */}
                    {selectedScreenId === "saved_library" && (
                      <div className="flex-1 flex flex-col p-3 space-y-2 font-mono text-xs">
                        <h4 className="font-bold text-white text-sm border-b border-neutral-800 pb-1">
                          LIBRARY &amp; SAVED
                        </h4>
                        <div className="p-2 bg-[#161618] border border-neutral-800 rounded font-sans text-[11px]">
                          O Fim dos Contadores Públicos de Vaidade · 5 min de leitura
                        </div>
                        <div className="p-2 bg-[#161618] border border-neutral-800 rounded font-sans text-[11px]">
                          Tipografia Suíça no Contexto de Software B2B · 8 min de leitura
                        </div>
                      </div>
                    )}

                    {/* SCREEN 09: PROFILE */}
                    {selectedScreenId === "user_profile" && (
                      <div className="flex-1 flex flex-col p-3 space-y-2.5 font-sans text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-neutral-800 border-2 border-white flex items-center justify-center font-mono font-bold text-white">
                            KV
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">
                              Kaelen Vance
                            </h4>
                            <p className="text-[10px] text-neutral-400 font-mono">
                              @kaelenvance · Fellow AA
                            </p>
                          </div>
                        </div>
                        <p className="text-[11px] text-neutral-300 font-light">
                          Architect &amp; Computational Theorist. Investigating monolithic structures.
                        </p>
                        <div className="grid grid-cols-4 gap-1 p-2 bg-[#161618] border border-neutral-800 rounded text-center font-mono text-[9px]">
                          <div>
                            <span className="text-white font-bold block">14.2k</span>
                            <span className="text-neutral-500">Signal</span>
                          </div>
                          <div>
                            <span className="text-white font-bold block">18</span>
                            <span className="text-neutral-500">Nodes</span>
                          </div>
                          <div>
                            <span className="text-white font-bold block">842</span>
                            <span className="text-neutral-500">Curations</span>
                          </div>
                          <div>
                            <span className="text-white font-bold block">3.1k</span>
                            <span className="text-neutral-500">Peers</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCREEN 10: EDGE STATES */}
                    {selectedScreenId === "empty_error_states" && (
                      <div className="flex-1 flex flex-col p-4 items-center justify-center text-center space-y-3 font-mono">
                        <Radio className="w-6 h-6 animate-pulse text-white" />
                        <h4 className="text-xs font-bold text-white uppercase">
                          No signal in this frequency
                        </h4>
                        <p className="text-[10px] text-neutral-500 font-sans">
                          Nenhum sinal ativo sintonizado.
                        </p>
                        <button
                          onClick={() => setSelectedScreenId("create_post")}
                          className="px-3 py-1 bg-white text-black font-bold text-[10px] rounded"
                        >
                          Emitir Sinal
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Simulator Bottom Navigation Bar */}
                  <div className="px-4 py-2 border-t border-[#2C2C2E] bg-[#131313] flex items-center justify-between text-neutral-400 shrink-0">
                    <button
                      onClick={() => setSelectedScreenId("home_feed")}
                      className={`flex flex-col items-center gap-0.5 transition-colors ${
                        selectedScreenId === "home_feed"
                          ? "text-white font-bold"
                          : "hover:text-neutral-200"
                      }`}
                    >
                      <Compass className="w-4 h-4" />
                      <span className="text-[8px] font-mono">Home</span>
                    </button>

                    <button
                      onClick={() => setSelectedScreenId("discover_search")}
                      className={`flex flex-col items-center gap-0.5 transition-colors ${
                        selectedScreenId === "discover_search"
                          ? "text-white font-bold"
                          : "hover:text-neutral-200"
                      }`}
                    >
                      <Search className="w-4 h-4" />
                      <span className="text-[8px] font-mono">Discover</span>
                    </button>

                    <button
                      onClick={() => setSelectedScreenId("create_post")}
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-all ${
                        selectedScreenId === "create_post"
                          ? "bg-white text-black ring-2 ring-white scale-105"
                          : "bg-white text-black hover:bg-neutral-200"
                      }`}
                      title="Create Post"
                    >
                      +
                    </button>

                    <button
                      onClick={() => setSelectedScreenId("community_page")}
                      className={`flex flex-col items-center gap-0.5 transition-colors ${
                        selectedScreenId === "community_page"
                          ? "text-white font-bold"
                          : "hover:text-neutral-200"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span className="text-[8px] font-mono">Guilds</span>
                    </button>

                    <button
                      onClick={() => setSelectedScreenId("user_profile")}
                      className={`flex flex-col items-center gap-0.5 transition-colors ${
                        selectedScreenId === "user_profile"
                          ? "text-white font-bold"
                          : "hover:text-neutral-200"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-[8px] font-mono">Profile</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Home Indicator bar */}
              <div className="w-32 h-1 bg-neutral-700 rounded-full mx-auto mt-2.5" />
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs font-mono text-neutral-400">
              <button
                onClick={() => setFullscreenImage(selectedScreen.image)}
                className="hover:text-white flex items-center gap-1.5 underline underline-offset-4"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Ver em Alta Resolução</span>
              </button>
              <span>•</span>
              <span>Escala: Mobile 380×820</span>
            </div>
          </div>

          {/* Right Column: Architectural Breakdown & Screen Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Screen Overview Card */}
            <div className="p-6 border border-surface-border bg-neutral-900/50 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-mono bg-white text-black font-semibold rounded">
                    TELA {selectedScreen.number}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    {selectedScreen.category}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-500">
                  PULSE Design System
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                  {selectedScreen.name}
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  {selectedScreen.tagline}
                </p>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {selectedScreen.description}
              </p>

              {/* Key Screen Elements */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Elementos Chave da Tela:
                </span>
                <ul className="space-y-2 font-mono text-xs text-neutral-300">
                  {selectedScreen.keyElements.map((elem, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-white font-bold select-none">›</span>
                      <span>{elem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Design Rationale */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1.5">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                  Racional de Product Design:
                </span>
                <p className="text-xs text-neutral-300 font-mono leading-relaxed">
                  {selectedScreen.designRationale}
                </p>
              </div>

              {/* System Tokens for this screen */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] font-mono">
                <div className="p-3 bg-neutral-950/80 border border-neutral-850 rounded">
                  <span className="text-neutral-500 block uppercase">
                    Tipografia:
                  </span>
                  <span className="text-neutral-200">
                    {selectedScreen.systemTokens.typography}
                  </span>
                </div>
                <div className="p-3 bg-neutral-950/80 border border-neutral-850 rounded">
                  <span className="text-neutral-500 block uppercase">
                    Superfície:
                  </span>
                  <span className="text-neutral-200">
                    {selectedScreen.systemTokens.surface}
                  </span>
                </div>
                <div className="p-3 bg-neutral-950/80 border border-neutral-850 rounded">
                  <span className="text-neutral-500 block uppercase">Bordas:</span>
                  <span className="text-neutral-200">
                    {selectedScreen.systemTokens.border}
                  </span>
                </div>
              </div>
            </div>

            {/* Design System Foundations Sheet */}
            <div className="p-6 border border-surface-border bg-neutral-900/30 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <Palette className="w-3.5 h-3.5 text-white" />
                <span>Diretrizes Fundamentais do Design System</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5 p-3.5 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <span className="text-xs font-medium text-white block">
                    01. Restrição Monocromática
                  </span>
                  <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
                    Elimina gradientes saturados e tons de alerta apelativos. A hierarquia se dá por luminância (Obsidian #050505 a Pure White #FFFFFF).
                  </p>
                </div>

                <div className="space-y-1.5 p-3.5 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <span className="text-xs font-medium text-white block">
                    02. Autoridade Editorial
                  </span>
                  <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
                    Títulos pesados em Space Grotesk com tracking fechado transmitem a gravidade de periódicos impressos e ensaios acadêmicos.
                  </p>
                </div>

                <div className="space-y-1.5 p-3.5 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <span className="text-xs font-medium text-white block">
                    03. Calm Technology
                  </span>
                  <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
                    Contadores públicos de vaidade são substituídos por métricas de profundidade (volume de discussões substantivas e leituras salvas).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 3: BENTO GRID DAS 10 TELAS (Visão Panorâmica de Sistema) */
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h4 className="text-xl font-medium text-white">
                Visão Panorâmica do Sistema: 10 Telas Projetadas
              </h4>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Inspeção lado a lado da linguagem visual, ritmo espacial e consistência dos tokens em todo o ecossistema móvel.
              </p>
            </div>
            <button
              onClick={() => setViewMode("simulator")}
              className="px-4 py-2 bg-white text-black font-mono text-xs font-semibold rounded hover:bg-neutral-200 transition-colors"
            >
              Voltar ao Simulador
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SCREENS.map((screen) => (
              <div
                key={screen.id}
                className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl space-y-3 flex flex-col justify-between hover:border-neutral-600 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="px-1.5 py-0.5 bg-neutral-800 text-white font-bold rounded">
                      TELA {screen.number}
                    </span>
                    <span className="text-neutral-500 uppercase">
                      {screen.category}
                    </span>
                  </div>

                  {/* Thumbnail Image with Zoom Trigger */}
                  <div
                    onClick={() => setFullscreenImage(screen.image)}
                    className="relative aspect-[9/19] w-full rounded-lg overflow-hidden border border-neutral-800 bg-black cursor-zoom-in"
                  >
                    <Image
                      src={screen.image}
                      alt={screen.name}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      sizes="220px"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-2.5 py-1 bg-black/80 text-white text-[10px] font-mono rounded-full border border-neutral-700 flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" /> Zoom
                      </span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-white text-xs leading-snug">
                      {screen.name}
                    </h5>
                    <p className="text-[10px] text-neutral-400 font-mono line-clamp-2 mt-0.5">
                      {screen.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <button
                  onClick={() => jumpToSimulatorScreen(screen.id)}
                  className="w-full py-1.5 bg-neutral-950 border border-neutral-800 hover:border-white text-neutral-300 hover:text-white font-mono text-[10px] rounded transition-colors flex items-center justify-center gap-1"
                >
                  <span>Testar no Simulador</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: ANATOMIA DE COMPONENTES CRÍTICOS (UI Deep-Dive) */}
      <div className="p-6 sm:p-8 border border-neutral-800 bg-neutral-900/40 rounded-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-white" />
              <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                Anatomia de Componentes Críticos // UI Deep-Dive
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-medium text-white">
              Dissecação Microscópica das Peças Centrais
            </h4>
          </div>

          {/* Toggle between Essay and Composer Anatomy */}
          <div className="flex items-center gap-2 bg-neutral-950 p-1.5 border border-neutral-800 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setSelectedAnatomy("essay")}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all ${
                selectedAnatomy === "essay"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Card de Ensaio Editorial
            </button>
            <button
              onClick={() => setSelectedAnatomy("composer")}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all ${
                selectedAnatomy === "composer"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Composer de Fricção Positiva
            </button>
          </div>
        </div>

        {selectedAnatomy === "essay" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Mock Card of Essay */}
            <div className="lg:col-span-6 p-5 bg-[#161618] border border-neutral-700 rounded-2xl space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-[10px] font-mono text-neutral-400">
                <span className="text-white font-bold">
                  c/DesignEthics in #GenerativeDesign
                </span>
                <span>24m ago</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white leading-tight font-sans">
                Are we losing the tactile grain in computational art?
              </h4>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed font-light">
                Why the return to monochromatic physical print holds lessons for digital canvas tools. The smooth vectors of modern raster engines eliminate the friction that historically disciplined our aesthetic choices.
              </p>
              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <div className="flex items-center gap-4">
                  <span>142 echoes</span>
                  <span>38 reflexões</span>
                </div>
                <span>Salvo na Biblioteca</span>
              </div>
            </div>

            {/* Microscopic Callout Points */}
            <div className="lg:col-span-6 space-y-3 font-mono text-xs">
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1">
                <span className="text-white font-bold block">
                  01. Título em Space Grotesk (700) com Tracking Fechado
                </span>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Transmite autoridade de periódico impresso e evita a esterilidade das fontes de sistema comuns.
                </p>
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1">
                <span className="text-white font-bold block">
                  02. Corpo em Hanken Grotesk 17px com Entrelinha 26px
                </span>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Calculado para leitura imersiva e sustentada sem fadiga visual em telas OLED pretas (#050505).
                </p>
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1">
                <span className="text-white font-bold block">
                  03. Ausência Intencional de Curtidas Públicas
                </span>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Substitui contadores apelativos de vaidade por &ldquo;ecos&rdquo; e arquivamentos intelectuais duradouros.
                </p>
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1">
                <span className="text-white font-bold block">
                  04. Alvos de Toque Mínimos de 44×44px
                </span>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Área de toque rigorosamente em conformidade com WCAG AAA e diretrizes de acessibilidade tátil móvel.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Mock of Composer */}
            <div className="lg:col-span-6 p-5 bg-[#161618] border border-neutral-700 rounded-2xl space-y-3 font-mono text-xs">
              <div className="p-2 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-300">
                <span className="text-white font-bold">Fricção Construtiva Ativa:</span> Todo sinal exige vínculo de comunidade e formato declarado.
              </div>
              <div className="flex gap-2 text-[10px]">
                <span className="px-2 py-1 bg-black border border-white text-white rounded">
                  Posting to c/DesignEthics
                </span>
                <span className="px-2 py-1 bg-black border border-neutral-700 text-neutral-400 rounded">
                  #GenerativeDesign
                </span>
              </div>
              <div className="p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-500 text-[11px]">
                Título da Tese e corpo estruturado em Markdown...
              </div>
              <div className="flex justify-between items-center text-[10px] pt-1">
                <span className="text-neutral-500">280 palavras · 1.5 min read</span>
                <span className="px-3 py-1 bg-white text-black font-bold rounded">
                  Emitir Sinal
                </span>
              </div>
            </div>

            {/* Microscopic Callout Points */}
            <div className="lg:col-span-6 space-y-3 font-mono text-xs">
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1">
                <span className="text-white font-bold block">
                  01. Seleção Obrigatória de Comunidade &amp; Tópico
                </span>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Impede que publicações caiam no vácuo de timelines desordenadas. Todo conteúdo tem destino contextual claro.
                </p>
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1">
                <span className="text-white font-bold block">
                  02. Declaração Prévia de Formato (Ensaio, Debate, Referência)
                </span>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Define a expectativa do leitor antes da leitura, permitindo filtrar por profundidade pretendida.
                </p>
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1">
                <span className="text-white font-bold block">
                  03. Eliminação da Impulsividade (&ldquo;Positive Friction&rdquo;)
                </span>
                <p className="text-[11px] text-neutral-400 font-sans">
                  A fricção estruturada educa o membro a pensar na utilidade do sinal antes de publicá-lo, elevando o S/N Ratio da rede.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: ARQUITETURA DA INFORMAÇÃO & GRAFO RELACIONAL (5 Eixos) */}
      <div className="p-6 sm:p-8 border border-neutral-800 bg-neutral-900/30 rounded-xl space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-white" />
            <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Arquitetura da Informação // Grafo de Conhecimento
            </span>
          </div>
          <h4 className="text-lg sm:text-xl font-medium text-white">
            O Modelo de 5 Eixos que Elimina a Dependência de Seguidores
          </h4>
          <p className="text-xs text-neutral-400 font-mono leading-relaxed max-w-3xl">
            Em redes tradicionais, o alcance depende do número bruto de seguidores. No PULSE, o conteúdo navega através de uma matriz semântica de 5 nós interconectados.
          </p>
        </div>

        {/* 5 Eixos Interativos */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-xs">
          {[
            {
              id: "comunidades",
              name: "01. Comunidades",
              badge: "Guildas",
              desc: "Espaços com manifesto e moderação soberana.",
            },
            {
              id: "topicos",
              name: "02. Tópicos",
              badge: "#Hashtags",
              desc: "Nós temáticos de frequência pura.",
            },
            {
              id: "pessoas",
              name: "03. Autores",
              badge: "Curadores",
              desc: "Perfis com foco em contribuição duradoura.",
            },
            {
              id: "interesses",
              name: "04. Interesses",
              badge: "Macro-Eixos",
              desc: "Afinidades calibradas no onboarding.",
            },
            {
              id: "eventos",
              name: "05. Salons",
              badge: "Ao Vivo",
              desc: "Debates e simpósios em tempo real.",
            },
          ].map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedGraphNode(node.id as any)}
              className={`p-3 text-left rounded-lg border transition-all flex flex-col justify-between gap-1.5 ${
                selectedGraphNode === node.id
                  ? "bg-white text-black border-white shadow-lg"
                  : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-[11px]">{node.name}</span>
                <span
                  className={`text-[8px] px-1 py-0.2 rounded uppercase ${
                    selectedGraphNode === node.id
                      ? "bg-black text-white"
                      : "bg-neutral-900 text-neutral-500"
                  }`}
                >
                  {node.badge}
                </span>
              </div>
              <p className="text-[10px] font-sans leading-tight">
                {node.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Dynamic Relational Flow Simulation */}
        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-3 font-mono text-xs">
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
            Jornada do Sinal no Grafo: Como um Autor com Zero Seguidores é Lido por 5.000 Especialistas
          </span>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-[11px]">
            <div className="p-3 bg-[#161618] border border-neutral-850 rounded space-y-1">
              <span className="text-white font-bold block">1. Criação com Destino</span>
              <p className="text-neutral-400 font-sans text-[11px]">
                O autor vincula a tese diretamente à guilda <strong className="text-white">c/DesignEthics</strong>.
              </p>
            </div>
            <div className="p-3 bg-[#161618] border border-neutral-850 rounded space-y-1">
              <span className="text-white font-bold block">2. Indexação Semântica</span>
              <p className="text-neutral-400 font-sans text-[11px]">
                A tag <strong className="text-white">#GenerativeDesign</strong> indexa o ensaio na frequência global do tópico.
              </p>
            </div>
            <div className="p-3 bg-[#161618] border border-neutral-850 rounded space-y-1">
              <span className="text-white font-bold block">3. Inclusão na Edição</span>
              <p className="text-neutral-400 font-sans text-[11px]">
                Os moderadores e curadores humanos compilam o sinal na <strong className="text-white">Edition 042</strong>.
              </p>
            </div>
            <div className="p-3 bg-[#161618] border border-neutral-850 rounded space-y-1">
              <span className="text-white font-bold block">4. Entrega Focada</span>
              <p className="text-neutral-400 font-sans text-[11px]">
                O leitor recebe o ensaio na sua leitura matinal, sem ruído de viralidade ou algoritmos opacos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: CONEXÃO COM AS PERSONAS (Lara vs. Rodrigo) */}
      <div className="p-6 sm:p-8 border border-neutral-800 bg-neutral-900/40 rounded-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-white" />
              <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                Jornadas por Persona // Resolução de Problemas Reais
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-medium text-white">
              Como o Produto Resolve as Dores Específicas de Cada Usuário
            </h4>
          </div>

          <div className="flex items-center gap-2 bg-neutral-950 p-1.5 border border-neutral-800 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setSelectedPersona("lara")}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all ${
                selectedPersona === "lara"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Persona 01: Lara (Leitora Focada)
            </button>
            <button
              onClick={() => setSelectedPersona("rodrigo")}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all ${
                selectedPersona === "rodrigo"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Persona 02: Rodrigo (Criador)
            </button>
          </div>
        </div>

        {selectedPersona === "lara" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
              <span className="text-[10px] text-neutral-500 uppercase block">
                A Dor Central da Lara
              </span>
              <h5 className="font-bold text-white text-sm">
                Exaustão por Ruído e Feeds Infinitos
              </h5>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                Frustração com algoritmos de recomendação baseados em controvérsias que mudam de assunto a cada swipe e geram ansiedade e perda de tempo.
              </p>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
              <span className="text-[10px] text-neutral-500 uppercase block">
                Como o PULSE Resolve
              </span>
              <h5 className="font-bold text-white text-sm">
                Edições Fechadas com Conclusão
              </h5>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                O feed tem início e fim delimitado (Edition 042). Lara conclui sua leitura, salva ensaios na biblioteca e fecha o app sem sensação de FOMO.
              </p>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 uppercase block">
                  Telas Envolvidas na Jornada
                </span>
                <span className="text-white font-bold block text-sm">
                  Tela 01 (Feed) · Tela 06 (Onboarding) · Tela 08 (Biblioteca)
                </span>
              </div>
              <button
                onClick={() => jumpToSimulatorScreen("home_feed")}
                className="w-full py-1.5 bg-white text-black font-bold text-[10px] rounded hover:bg-neutral-200 transition-colors"
              >
                Experimentar Jornada da Lara →
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
              <span className="text-[10px] text-neutral-500 uppercase block">
                A Dor Central do Rodrigo
              </span>
              <h5 className="font-bold text-white text-sm">
                Barreira de Distribuição para Conteúdo Denso
              </h5>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                Incapacidade de atingir leitores em plataformas tradicionais sem precisar produzir posts sensacionalistas ou acumular milhares de seguidores prévios.
              </p>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
              <span className="text-[10px] text-neutral-500 uppercase block">
                Como o PULSE Resolve
              </span>
              <h5 className="font-bold text-white text-sm">
                Composer com Fricção &amp; Indexação por Guilda
              </h5>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                Rodrigo vincula seu ensaio diretamente a c/DesignEthics. Seu texto chega instantaneamente a todos os interessados no assunto, independentemente de sua popularidade.
              </p>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 uppercase block">
                  Telas Envolvidas na Jornada
                </span>
                <span className="text-white font-bold block text-sm">
                  Tela 03 (Comunidade) · Tela 04 (Thread) · Tela 05 (Composer)
                </span>
              </div>
              <button
                onClick={() => jumpToSimulatorScreen("create_post")}
                className="w-full py-1.5 bg-white text-black font-bold text-[10px] rounded hover:bg-neutral-200 transition-colors"
              >
                Experimentar Jornada do Rodrigo →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 5: COMPARATIVE STRATEGY MATRIX */}
      <div className="p-6 sm:p-8 border border-neutral-800 bg-neutral-900/40 rounded-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-white" />
              <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                Matriz de Estratégia de Produto // Design Ético
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-medium text-white">
              Rede Algorítmica Convencional vs. Protocolo PULSE (Calm Design)
            </h4>
          </div>

          <div className="flex items-center gap-2 bg-neutral-950 p-1.5 border border-neutral-800 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setComparisonMode("pulse")}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all ${
                comparisonMode === "pulse"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Protocolo PULSE (Ativo)
            </button>
            <button
              onClick={() => setComparisonMode("traditional")}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all ${
                comparisonMode === "traditional"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Rede Convencional (Legado)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`p-5 rounded-lg border transition-all ${
              comparisonMode === "pulse"
                ? "bg-neutral-950 border-neutral-700 text-white shadow-lg"
                : "bg-neutral-900/20 border-neutral-800/60 text-neutral-400"
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
              01 // Modelo de Consumo
            </span>
            <h5 className="font-medium text-sm text-white mb-2">
              {comparisonMode === "pulse"
                ? "Edições Delimitadas (Edition 042)"
                : "Feed Infinito Sem Fim (Infinite Scroll)"}
            </h5>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              {comparisonMode === "pulse"
                ? "O feed tem início e fim. O usuário completa a leitura e desliga o app sem sensação de FOMO (Fear of Missing Out)."
                : "Padrão caça-níqueis (pull-to-refresh) desenhado para retenção passiva e anestesiamento visual via dopamina rápida."}
            </p>
          </div>

          <div
            className={`p-5 rounded-lg border transition-all ${
              comparisonMode === "pulse"
                ? "bg-neutral-950 border-neutral-700 text-white shadow-lg"
                : "bg-neutral-900/20 border-neutral-800/60 text-neutral-400"
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
              02 // Psicologia &amp; Validação
            </span>
            <h5 className="font-medium text-sm text-white mb-2">
              {comparisonMode === "pulse"
                ? "Métricas Anti-Vaidade Privadas"
                : "Contadores Públicos de Likes e Seguidores"}
            </h5>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              {comparisonMode === "pulse"
                ? "Substitui números inflados por tempo de leitura efetiva, densidade de citação e retenção em bibliotecas pessoais."
                : "Alimenta ansiedade social de aprovação e incentiva a produção de controvérsias polarizadoras para ganhar tração."}
            </p>
          </div>

          <div
            className={`p-5 rounded-lg border transition-all ${
              comparisonMode === "pulse"
                ? "bg-neutral-950 border-neutral-700 text-white shadow-lg"
                : "bg-neutral-900/20 border-neutral-800/60 text-neutral-400"
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
              03 // Arquitetura de Postagem
            </span>
            <h5 className="font-medium text-sm text-white mb-2">
              {comparisonMode === "pulse"
                ? "Fricção Construtiva Obrigatória"
                : "Composer Vazio sem Contexto"}
            </h5>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              {comparisonMode === "pulse"
                ? "Todo post exige seleção prévia de Comunidade, Formato do Sinal (Ensaio/Debate) e validação sintática do argumento."
                : "Caixa de texto 'O que você está pensando?' incentivando desabafos impulsivos e tweets fragmentados soltos no vácuo."}
            </p>
          </div>

          <div
            className={`p-5 rounded-lg border transition-all ${
              comparisonMode === "pulse"
                ? "bg-neutral-950 border-neutral-700 text-white shadow-lg"
                : "bg-neutral-900/20 border-neutral-800/60 text-neutral-400"
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
              04 // Política de Notificações
            </span>
            <h5 className="font-medium text-sm text-white mb-2">
              {comparisonMode === "pulse"
                ? "Calm Delivery &amp; Respeito ao Foco"
                : "Bombardeio de Gatilhos de Reengajamento"}
            </h5>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              {comparisonMode === "pulse"
                ? "Notificações são compiladas em lotes diários calmos. Nenhuma mensagem apelativa sobre quem visitou o perfil."
                : "Spam diário com banners vermelhos invasivos para forçar a abertura do app durante horas de sono ou trabalho."}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 6: PRODUCT STRATEGY & NORTH STAR METRICS FRAMEWORK */}
      <div className="p-6 sm:p-8 border border-neutral-800 bg-neutral-900/30 rounded-xl space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Product Strategy // Métricas de Qualidade
            </span>
          </div>
          <h4 className="text-lg sm:text-xl font-medium text-white">
            Como Medir o Sucesso Sem Contadores de Vaidade
          </h4>
          <p className="text-xs text-neutral-400 font-mono leading-relaxed max-w-3xl">
            Framework de métricas desenhado para avaliar a saúde intelectual da rede, qualidade do discurso e retenção de longo prazo sem recorrer a métricas de vaidade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              Métrica North Star 01
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">
                &gt;85%
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                Meta do Sistema
              </span>
            </div>
            <h6 className="text-xs font-medium text-white">
              DPI — Debate Profundity Index
            </h6>
            <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
              Percentual de respostas que possuem mais de 100 caracteres e citam argumentos estruturados vs. reações monossilábicas.
            </p>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              Métrica North Star 02
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">
                &gt;72%
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                Scroll Depth
              </span>
            </div>
            <h6 className="text-xs font-medium text-white">
              SCR — Scroll Completion Rate
            </h6>
            <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
              Taxa de leitura integral em ensaios longos (&gt;5 minutos), medindo a atenção concentrada sem skimming superficial.
            </p>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              Métrica North Star 03
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">
                &gt;90%
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                S/N Ratio
              </span>
            </div>
            <h6 className="text-xs font-medium text-white">
              Signal-to-Noise Ratio
            </h6>
            <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
              Proporção de publicações que são salvas em bibliotecas temáticas e exportadas como referências acadêmicas e profissionais.
            </p>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              Métrica North Star 04
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">
                &lt;60s
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                Cold Start
              </span>
            </div>
            <h6 className="text-xs font-medium text-white">
              Day-1 Activation Velocity
            </h6>
            <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
              Tempo até o primeiro sinal útil consumido através do grafo de tópicos sem exigir sincronização invasiva da agenda de contatos.
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Res Image Modal */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <div className="relative max-w-md w-full h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute -top-10 right-0 text-white font-mono text-xs flex items-center gap-1.5 hover:text-neutral-300"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Fechar Visualização [ESC]</span>
            </button>
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
              <Image
                src={fullscreenImage}
                alt="Fullscreen Screen Preview"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
