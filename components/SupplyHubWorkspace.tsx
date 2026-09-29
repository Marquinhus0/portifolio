"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  FileText,
  DollarSign,
  TrendingUp,
  Truck,
  Users,
  Lock,
  ChevronRight,
  Filter,
  Layers,
  Send,
  SlidersHorizontal,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  X,
  Menu,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Eye,
  Sliders,
  Check,
  ExternalLink,
  ChevronDown,
  Plus,
  ShoppingCart,
  Package,
  Settings,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Info,
  Maximize2,
  Minimize2,
} from "lucide-react";

export type SupplyHubSection =
  | "dashboard"
  | "pesquisa"
  | "cotacoes"
  | "pedidos"
  | "fornecedores"
  | "aprovacoes"
  | "relatorios"
  | "configuracoes";

export default function SupplyHubWorkspace() {
  // Main section in sidebar
  const [activeSection, setActiveSection] = useState<SupplyHubSection>("dashboard");

  // Sub-tabs for each section
  const [pesquisaSubTab, setPesquisaSubTab] = useState<"busca" | "filtros" | "resultado" | "produto">("busca");
  const [cotacoesSubTab, setCotacoesSubTab] = useState<"lista" | "nova" | "comparar" | "cotacao" | "negociacao">("lista");
  const [pedidosSubTab, setPedidosSubTab] = useState<"todos" | "aprovacao" | "confirmados" | "enviados" | "entregues">("todos");
  const [fornecedoresSubTab, setFornecedoresSubTab] = useState<"lista" | "perfil" | "produtos" | "historico">("lista");
  const [aprovacoesSubTab, setAprovacoesSubTab] = useState<"pendentes" | "aprovadas" | "rejeitadas">("pendentes");

  // Search query in topbar
  const [searchQuery, setSearchQuery] = useState("");

  // Comparison selected supplier
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>("automax");

  // Negotiation interactive simulation
  const [discountPercent, setDiscountPercent] = useState<number>(8);
  const [paymentDays, setPaymentDays] = useState<string>("60 dias");
  const [counterOfferSuccess, setCounterOfferSuccess] = useState<boolean>(false);

  // Approval action simulation
  const [approvedRequests, setApprovedRequests] = useState<Record<string, "approved" | "rejected">>({});

  // Fullscreen container state
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      className={`w-full rounded-2xl border border-[#e4ebe7] bg-[#f8faf9] text-[#15201c] font-sans overflow-hidden shadow-2xl transition-all duration-300 ${
        isFullscreen ? "fixed inset-4 z-50 rounded-2xl shadow-2xl max-h-[96vh]" : "relative min-h-[750px]"
      }`}
    >
      {/* Top Bar Indicator for the Simulator */}
      <div className="bg-[#111817] text-white px-4 py-2 flex items-center justify-between text-xs font-mono border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16845a] animate-pulse" />
          <span className="font-bold text-[#a8e8c7]">SUPPLYHUB OS v2.4</span>
          <span className="text-neutral-500 hidden sm:inline">•</span>
          <span className="text-neutral-400 hidden sm:inline">Workspace Interativo de Compras B2B</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-neutral-400 text-[11px] hidden md:inline">
            Módulo Ativo: <strong className="text-white uppercase">{activeSection}</strong>
          </span>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white transition-colors"
            title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Flex Application Layout */}
      <div className="flex flex-col md:flex-row min-h-[680px]">
        {/* =================================================================== */}
        {/* SIDEBAR (246px matching the user HTML exactly)                      */}
        {/* =================================================================== */}
        <aside className="w-full md:w-[246px] bg-white border-r border-[#e4ebe7] p-4 md:p-5 flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5 font-extrabold tracking-tight text-[#15201c] text-base pb-3 border-b border-[#f0f3f1]">
              <span className="w-[28px] h-[28px] rounded-[9px] bg-gradient-to-br from-[#116c49] to-[#42c985] relative shadow-sm flex items-center justify-center">
                <span className="absolute w-[8px] h-[15px] right-1.5 top-1 bg-white rounded-tr-[3px] rounded-tl-[7px] rounded-br-[3px] rounded-bl-[7px] rotate-12 opacity-95" />
              </span>
              <span>SUPPLYHUB</span>
            </div>

            {/* Nav Group: Workspace */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9aa49f] px-2 py-1 block">
                Workspace
              </span>
              <nav className="space-y-1 pt-1 text-xs">
                <button
                  onClick={() => {
                    setActiveSection("dashboard");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === "dashboard"
                      ? "bg-[#e8f7ef] text-[#116c49] font-bold"
                      : "text-[#5e6965] hover:bg-[#f3f6f4]"
                  }`}
                >
                  <span className="w-4 text-center font-bold">⌂</span>
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    setActiveSection("pesquisa");
                    setPesquisaSubTab("busca");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === "pesquisa"
                      ? "bg-[#e8f7ef] text-[#116c49] font-bold"
                      : "text-[#5e6965] hover:bg-[#f3f6f4]"
                  }`}
                >
                  <span className="w-4 text-center font-bold">⌕</span>
                  <span>Pesquisa</span>
                </button>

                <button
                  onClick={() => {
                    setActiveSection("cotacoes");
                    setCotacoesSubTab("lista");
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === "cotacoes"
                      ? "bg-[#e8f7ef] text-[#116c49] font-bold"
                      : "text-[#5e6965] hover:bg-[#f3f6f4]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 text-center font-bold">▤</span>
                    <span>Cotações</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#eef2f0] text-[#66716d]">
                    12
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveSection("pedidos");
                    setPedidosSubTab("todos");
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === "pedidos"
                      ? "bg-[#e8f7ef] text-[#116c49] font-bold"
                      : "text-[#5e6965] hover:bg-[#f3f6f4]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 text-center font-bold">□</span>
                    <span>Pedidos</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#eef2f0] text-[#66716d]">
                    8
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveSection("fornecedores");
                    setFornecedoresSubTab("lista");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === "fornecedores"
                      ? "bg-[#e8f7ef] text-[#116c49] font-bold"
                      : "text-[#5e6965] hover:bg-[#f3f6f4]"
                  }`}
                >
                  <span className="w-4 text-center font-bold">◇</span>
                  <span>Fornecedores</span>
                </button>
              </nav>
            </div>

            {/* Nav Group: Gestão */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9aa49f] px-2 py-1 block">
                Gestão
              </span>
              <nav className="space-y-1 pt-1 text-xs">
                <button
                  onClick={() => {
                    setActiveSection("aprovacoes");
                    setAprovacoesSubTab("pendentes");
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === "aprovacoes"
                      ? "bg-[#e8f7ef] text-[#116c49] font-bold"
                      : "text-[#5e6965] hover:bg-[#f3f6f4]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 text-center font-bold">✓</span>
                    <span>Aprovações</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#fff6df] text-[#9b7620]">
                    3
                  </span>
                </button>

                <button
                  onClick={() => setActiveSection("relatorios")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === "relatorios"
                      ? "bg-[#e8f7ef] text-[#116c49] font-bold"
                      : "text-[#5e6965] hover:bg-[#f3f6f4]"
                  }`}
                >
                  <span className="w-4 text-center font-bold">▥</span>
                  <span>Relatórios</span>
                </button>

                <button
                  onClick={() => setActiveSection("configuracoes")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === "configuracoes"
                      ? "bg-[#e8f7ef] text-[#116c49] font-bold"
                      : "text-[#5e6965] hover:bg-[#f3f6f4]"
                  }`}
                >
                  <span className="w-4 text-center font-bold">⚙</span>
                  <span>Configurações</span>
                </button>
              </nav>
            </div>
          </div>

          {/* User/Company Footer in Sidebar */}
          <div className="pt-4 mt-6 border-t border-[#e4ebe7] flex items-center gap-2.5">
            <div className="w-[33px] h-[33px] rounded-full bg-[#dbeee4] text-[#116c49] font-bold text-xs flex items-center justify-center shrink-0">
              MR
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-xs text-[#15201c] truncate">Marcus Ritta</span>
              <span className="block text-[10px] text-[#71807a] truncate">Nexus Supply (Admin)</span>
            </div>
          </div>
        </aside>

        {/* =================================================================== */}
        {/* MAIN APPLICATION VIEWPORT                                           */}
        {/* =================================================================== */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#f8faf9]">
          {/* Topbar */}
          <header className="h-[64px] bg-white border-b border-[#e4ebe7] px-5 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-20">
            {/* Search Input */}
            <div className="flex-1 max-w-[380px] h-[38px] bg-[#f5f7f6] border border-[#edf1ef] rounded-lg flex items-center gap-2 px-3 text-xs text-[#9aa49f]">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Buscar produtos, fornecedores ou pedidos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-xs text-[#15201c] placeholder:text-[#9aa49f]"
              />
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-[#dfe3e1] rounded text-[#6b7672]">
                ⌘ K
              </kbd>
            </div>

            {/* Topbar Actions */}
            <div className="flex items-center gap-2.5">
              <button
                className="w-8 h-8 rounded-full border border-[#e4ebe7] bg-white flex items-center justify-center text-xs text-[#64716b] hover:bg-[#f5f7f6]"
                title="Ajuda e Documentação"
              >
                ?
              </button>
              <button
                className="w-8 h-8 rounded-full border border-[#e4ebe7] bg-white flex items-center justify-center text-xs text-[#64716b] hover:bg-[#f5f7f6]"
                title="Notificações"
              >
                ♢
              </button>
              <div className="flex items-center gap-2 pl-2">
                <div className="w-[30px] h-[30px] rounded-full bg-[#dbeee4] text-[#116c49] font-bold text-xs flex items-center justify-center">
                  MR
                </div>
                <div className="hidden sm:block text-left text-xs leading-tight">
                  <span className="font-bold text-[#15201c] block">Marcus Ritta</span>
                  <span className="text-[10px] text-[#71807a]">Nexus Enterprise</span>
                </div>
              </div>
            </div>
          </header>

          {/* Sub-Tabs Bar (When applicable to the section) */}
          {activeSection === "pesquisa" && (
            <div className="bg-white border-b border-[#e4ebe7] px-6 py-2 flex items-center gap-2 text-xs font-semibold overflow-x-auto">
              {[
                { id: "busca", label: "Busca de produtos" },
                { id: "filtros", label: "Filtros avançados" },
                { id: "resultado", label: "Resultados (14)" },
                { id: "produto", label: "Ficha do Produto" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPesquisaSubTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    pesquisaSubTab === tab.id
                      ? "bg-[#e8f7ef] text-[#116c49]"
                      : "text-[#5e6965] hover:bg-[#f5f7f6]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {activeSection === "cotacoes" && (
            <div className="bg-white border-b border-[#e4ebe7] px-6 py-2 flex items-center gap-2 text-xs font-semibold overflow-x-auto">
              {[
                { id: "lista", label: "Lista de Cotações" },
                { id: "nova", label: "+ Nova Cotação" },
                { id: "comparar", label: "Comparar Fornecedores" },
                { id: "cotacao", label: "Detalhe da Cotação" },
                { id: "negociacao", label: "Mesa de Negociação" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCotacoesSubTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    cotacoesSubTab === tab.id
                      ? "bg-[#e8f7ef] text-[#116c49]"
                      : "text-[#5e6965] hover:bg-[#f5f7f6]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {activeSection === "pedidos" && (
            <div className="bg-white border-b border-[#e4ebe7] px-6 py-2 flex items-center gap-2 text-xs font-semibold overflow-x-auto">
              {[
                { id: "todos", label: "Todos os Pedidos" },
                { id: "aprovacao", label: "Em Aprovação (2)" },
                { id: "confirmados", label: "Confirmados (3)" },
                { id: "enviados", label: "Enviados (2)" },
                { id: "entregues", label: "Entregues (1)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPedidosSubTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    pedidosSubTab === tab.id
                      ? "bg-[#e8f7ef] text-[#116c49]"
                      : "text-[#5e6965] hover:bg-[#f5f7f6]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {activeSection === "fornecedores" && (
            <div className="bg-white border-b border-[#e4ebe7] px-6 py-2 flex items-center gap-2 text-xs font-semibold overflow-x-auto">
              {[
                { id: "lista", label: "Lista de Fornecedores" },
                { id: "perfil", label: "Perfil da Distribuidora" },
                { id: "produtos", label: "Catálogo Vinculado" },
                { id: "historico", label: "Histórico de SLA" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFornecedoresSubTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    fornecedoresSubTab === tab.id
                      ? "bg-[#e8f7ef] text-[#116c49]"
                      : "text-[#5e6965] hover:bg-[#f5f7f6]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {activeSection === "aprovacoes" && (
            <div className="bg-white border-b border-[#e4ebe7] px-6 py-2 flex items-center gap-2 text-xs font-semibold overflow-x-auto">
              {[
                { id: "pendentes", label: "Pendentes de Aprovação (3)" },
                { id: "aprovadas", label: "Aprovadas no Mês" },
                { id: "rejeitadas", label: "Reprovadas" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAprovacoesSubTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    aprovacoesSubTab === tab.id
                      ? "bg-[#e8f7ef] text-[#116c49]"
                      : "text-[#5e6965] hover:bg-[#f5f7f6]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* ================================================================= */}
          {/* CONTENT AREA: RENDER ACTIVE SECTION CONTENT                       */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-7 flex-1 space-y-6">
            {/* 1. DASHBOARD VIEW (MATCHING USER HTML EXACTLY) */}
            {activeSection === "dashboard" && (
              <div className="space-y-6 animate-fadeIn">
                {/* Heading */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#16845a]">
                      Visão geral
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#15201c] mt-1">
                      Olá, Marcus.
                    </h1>
                    <p className="text-xs sm:text-sm text-[#71807a] mt-1">
                      Acompanhe suas compras e oportunidades em um só lugar.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveSection("cotacoes");
                      setCotacoesSubTab("nova");
                    }}
                    className="bg-[#16845a] hover:bg-[#116c49] text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-tight shadow-md transition-all self-start sm:self-auto flex items-center gap-1.5"
                  >
                    <span>+ Nova cotação</span>
                  </button>
                </div>

                {/* 4 Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="bg-white border border-[#e4ebe7] rounded-[15px] p-4 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs text-[#71807a]">
                      <span>Cotações abertas</span>
                      <span className="w-7 h-7 rounded-lg bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold">
                        ▤
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#15201c] tracking-tight">
                      12
                    </div>
                    <span className="text-[10px] font-bold text-[#16845a]">
                      ↑ 20% <span className="text-[#89938e] font-normal">vs. mês anterior</span>
                    </span>
                  </div>

                  <div className="bg-white border border-[#e4ebe7] rounded-[15px] p-4 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs text-[#71807a]">
                      <span>Pedidos ativos</span>
                      <span className="w-7 h-7 rounded-lg bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold">
                        □
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#15201c] tracking-tight">
                      08
                    </div>
                    <span className="text-[10px] font-bold text-[#16845a]">
                      ↑ 14% <span className="text-[#89938e] font-normal">vs. mês anterior</span>
                    </span>
                  </div>

                  <div className="bg-white border border-[#e4ebe7] rounded-[15px] p-4 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs text-[#71807a]">
                      <span>Aprovações pendentes</span>
                      <span className="w-7 h-7 rounded-lg bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold">
                        ✓
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#15201c] tracking-tight">
                      03
                    </div>
                    <span className="text-[10px] font-bold text-[#d85d5d]">
                      ↓ 25% <span className="text-[#89938e] font-normal">vs. mês anterior</span>
                    </span>
                  </div>

                  <div className="bg-white border border-[#e4ebe7] rounded-[15px] p-4 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs text-[#71807a]">
                      <span>Fornecedores ativos</span>
                      <span className="w-7 h-7 rounded-lg bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold">
                        ◇
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#15201c] tracking-tight">
                      48
                    </div>
                    <span className="text-[10px] font-bold text-[#16845a]">
                      ↑ 12% <span className="text-[#89938e] font-normal">vs. mês anterior</span>
                    </span>
                  </div>
                </div>

                {/* Grid: Volume de Compras Chart + Próximas Ações */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Volume de Compras Chart */}
                  <div className="lg:col-span-8 bg-white border border-[#e4ebe7] rounded-[15px] p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-[#15201c]">Volume de compras</span>
                      <span className="text-xs text-[#16845a] font-bold cursor-pointer">
                        Últimos 6 meses ▾
                      </span>
                    </div>

                    {/* Chart Container */}
                    <div className="h-[210px] relative border-b border-l border-[#edf1ef] pl-3 flex items-end gap-3 sm:gap-6 pt-6">
                      {/* Gridlines */}
                      <div className="absolute left-0 right-0 top-[25%] border-t border-dashed border-[#edf1ef]" />
                      <div className="absolute left-0 right-0 top-[50%] border-t border-dashed border-[#edf1ef]" />
                      <div className="absolute left-0 right-0 top-[75%] border-t border-dashed border-[#edf1ef]" />

                      {[
                        { mes: "Abr", val: "R$ 18k", height: "43%" },
                        { mes: "Mai", val: "R$ 25k", height: "60%" },
                        { mes: "Jun", val: "R$ 21k", height: "51%" },
                        { mes: "Jul", val: "R$ 31k", height: "74%" },
                        { mes: "Ago", val: "R$ 36k", height: "86%" },
                        { mes: "Set", val: "R$ 42k", height: "100%" },
                      ].map((item) => (
                        <div
                          key={item.mes}
                          className="h-full flex-1 flex flex-col justify-end items-center relative group"
                        >
                          <span className="text-[9px] text-[#5e6965] font-semibold mb-1 opacity-80 group-hover:opacity-100">
                            {item.val}
                          </span>
                          <div
                            style={{ height: item.height }}
                            className="w-[70%] max-w-[34px] bg-gradient-to-t from-[#16845a] to-[#55ce91] rounded-t-md hover:brightness-110 transition-all cursor-pointer"
                          />
                          <span className="text-[10px] text-[#8a948f] mt-2 font-medium">
                            {item.mes}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Próximas Ações Activity Feed */}
                  <div className="lg:col-span-4 bg-white border border-[#e4ebe7] rounded-[15px] p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-[#15201c]">Próximas ações</span>
                      <span className="text-xs text-[#16845a] font-bold cursor-pointer">Ver tudo</span>
                    </div>

                    <div className="space-y-3">
                      <div
                        onClick={() => {
                          setActiveSection("aprovacoes");
                          setAprovacoesSubTab("pendentes");
                        }}
                        className="grid grid-cols-[34px_1fr_auto] gap-2.5 items-start p-2 rounded-lg hover:bg-[#f8faf9] cursor-pointer transition-colors"
                      >
                        <div className="w-[34px] h-[34px] rounded-[10px] bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold text-xs">
                          ✓
                        </div>
                        <div>
                          <strong className="text-xs text-[#15201c] block">Aprovar pedido #1048</strong>
                          <span className="text-[11px] text-[#71807a]">R$ 8.420 · AutoMax</span>
                        </div>
                        <span className="text-[10px] text-[#a0a9a5]">Hoje</span>
                      </div>

                      <div
                        onClick={() => {
                          setActiveSection("cotacoes");
                          setCotacoesSubTab("negociacao");
                        }}
                        className="grid grid-cols-[34px_1fr_auto] gap-2.5 items-start p-2 rounded-lg hover:bg-[#f8faf9] cursor-pointer transition-colors"
                      >
                        <div className="w-[34px] h-[34px] rounded-[10px] bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold text-xs">
                          ▤
                        </div>
                        <div>
                          <strong className="text-xs text-[#15201c] block">Responder cotação</strong>
                          <span className="text-[11px] text-[#71807a]">Pastilhas · 3 propostas</span>
                        </div>
                        <span className="text-[10px] text-[#a0a9a5]">Hoje</span>
                      </div>

                      <div
                        onClick={() => {
                          setActiveSection("pedidos");
                          setPedidosSubTab("enviados");
                        }}
                        className="grid grid-cols-[34px_1fr_auto] gap-2.5 items-start p-2 rounded-lg hover:bg-[#f8faf9] cursor-pointer transition-colors"
                      >
                        <div className="w-[34px] h-[34px] rounded-[10px] bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold text-xs">
                          □
                        </div>
                        <div>
                          <strong className="text-xs text-[#15201c] block">Entrega prevista</strong>
                          <span className="text-[11px] text-[#71807a]">Pedido #1039 · 14 itens</span>
                        </div>
                        <span className="text-[10px] text-[#a0a9a5]">Amanhã</span>
                      </div>

                      <div
                        onClick={() => {
                          setActiveSection("fornecedores");
                          setFornecedoresSubTab("perfil");
                        }}
                        className="grid grid-cols-[34px_1fr_auto] gap-2.5 items-start p-2 rounded-lg hover:bg-[#f8faf9] cursor-pointer transition-colors"
                      >
                        <div className="w-[34px] h-[34px] rounded-[10px] bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold text-xs">
                          ◇
                        </div>
                        <div>
                          <strong className="text-xs text-[#15201c] block">Novo fornecedor</strong>
                          <span className="text-[11px] text-[#71807a]">Peças Brasil aguarda análise</span>
                        </div>
                        <span className="text-[10px] text-[#a0a9a5]">Sex.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cotações Recentes Table */}
                <div className="bg-white border border-[#e4ebe7] rounded-[15px] p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#15201c]">Cotações recentes</span>
                    <button
                      onClick={() => {
                        setActiveSection("cotacoes");
                        setCotacoesSubTab("lista");
                      }}
                      className="text-xs text-[#16845a] font-bold hover:underline"
                    >
                      Ver todas →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#e4ebe7] text-[#8a948f] text-[10px] font-semibold">
                          <th className="py-2.5 px-3">Produto / Solicitação</th>
                          <th className="py-2.5 px-3">Fornecedor</th>
                          <th className="py-2.5 px-3">Valor Estimado</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Atualizado</th>
                          <th className="py-2.5 px-3 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0f3f1]">
                        <tr
                          onClick={() => {
                            setActiveSection("cotacoes");
                            setCotacoesSubTab("negociacao");
                          }}
                          className="hover:bg-[#f8faf9] cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-3 font-semibold text-[#15201c]">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-[#eef5f1] text-[#16845a] text-[10px] font-extrabold flex items-center justify-center">
                                PF
                              </span>
                              <span>Pastilhas de freio</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-[#5e6965]">AutoMax</td>
                          <td className="py-3 px-3 font-bold text-[#15201c]">R$ 2.450,00</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e8f7ef] text-[#17704d]">
                              Em negociação
                            </span>
                          </td>
                          <td className="py-3 px-3 text-[#71807a]">Hoje, 14:32</td>
                          <td className="py-3 px-3 text-right text-[#16845a] font-bold">Ver →</td>
                        </tr>

                        <tr
                          onClick={() => {
                            setActiveSection("cotacoes");
                            setCotacoesSubTab("comparar");
                          }}
                          className="hover:bg-[#f8faf9] cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-3 font-semibold text-[#15201c]">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-[#eef5f1] text-[#16845a] text-[10px] font-extrabold flex items-center justify-center">
                                DS
                              </span>
                              <span>Óleo sintético 5W30</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-[#5e6965]">Distribuidora Sul</td>
                          <td className="py-3 px-3 font-bold text-[#15201c]">R$ 1.320,00</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fff6df] text-[#9b7620]">
                              Aguardando
                            </span>
                          </td>
                          <td className="py-3 px-3 text-[#71807a]">Hoje, 11:08</td>
                          <td className="py-3 px-3 text-right text-[#16845a] font-bold">Ver →</td>
                        </tr>

                        <tr
                          onClick={() => {
                            setActiveSection("cotacoes");
                            setCotacoesSubTab("cotacao");
                          }}
                          className="hover:bg-[#f8faf9] cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-3 font-semibold text-[#15201c]">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-[#eef5f1] text-[#16845a] text-[10px] font-extrabold flex items-center justify-center">
                                PB
                              </span>
                              <span>Amortecedor dianteiro</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-[#5e6965]">Peças Brasil</td>
                          <td className="py-3 px-3 font-bold text-[#15201c]">R$ 980,00</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e8f7ef] text-[#17704d]">
                              Recebida
                            </span>
                          </td>
                          <td className="py-3 px-3 text-[#71807a]">Ontem</td>
                          <td className="py-3 px-3 text-right text-[#16845a] font-bold">Ver →</td>
                        </tr>

                        <tr
                          onClick={() => {
                            setActiveSection("cotacoes");
                            setCotacoesSubTab("lista");
                          }}
                          className="hover:bg-[#f8faf9] cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-3 font-semibold text-[#15201c]">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-[#eef5f1] text-[#16845a] text-[10px] font-extrabold flex items-center justify-center">
                                AP
                              </span>
                              <span>Filtro de óleo (Cx 50un)</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-[#5e6965]">AutoParts Pro</td>
                          <td className="py-3 px-3 font-bold text-[#15201c]">R$ 450,00</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e8f7ef] text-[#17704d]">
                              Em cotação
                            </span>
                          </td>
                          <td className="py-3 px-3 text-[#71807a]">Ontem</td>
                          <td className="py-3 px-3 text-right text-[#16845a] font-bold">Ver →</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div
                    onClick={() => {
                      setActiveSection("pesquisa");
                      setPesquisaSubTab("busca");
                    }}
                    className="bg-white border border-[#e4ebe7] rounded-[15px] p-4 shadow-sm hover:border-[#16845a] cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="w-[34px] h-[34px] rounded-lg bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold">
                      ⌕
                    </div>
                    <strong className="text-xs text-[#15201c] block">Encontrar produtos</strong>
                    <p className="text-[10px] text-[#71807a]">Pesquise entre milhares de itens.</p>
                  </div>

                  <div
                    onClick={() => {
                      setActiveSection("cotacoes");
                      setCotacoesSubTab("comparar");
                    }}
                    className="bg-white border border-[#e4ebe7] rounded-[15px] p-4 shadow-sm hover:border-[#16845a] cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="w-[34px] h-[34px] rounded-lg bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold">
                      ⇄
                    </div>
                    <strong className="text-xs text-[#15201c] block">Comparar fornecedores</strong>
                    <p className="text-[10px] text-[#71807a]">Compare preço e condições.</p>
                  </div>

                  <div
                    onClick={() => {
                      setActiveSection("cotacoes");
                      setCotacoesSubTab("nova");
                    }}
                    className="bg-white border border-[#e4ebe7] rounded-[15px] p-4 shadow-sm hover:border-[#16845a] cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="w-[34px] h-[34px] rounded-lg bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold">
                      ▤
                    </div>
                    <strong className="text-xs text-[#15201c] block">Nova cotação</strong>
                    <p className="text-[10px] text-[#71807a]">Solicite propostas em poucos passos.</p>
                  </div>

                  <div
                    onClick={() => {
                      setActiveSection("aprovacoes");
                      setAprovacoesSubTab("pendentes");
                    }}
                    className="bg-white border border-[#e4ebe7] rounded-[15px] p-4 shadow-sm hover:border-[#16845a] cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="w-[34px] h-[34px] rounded-lg bg-[#e8f7ef] text-[#16845a] flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <strong className="text-xs text-[#15201c] block">Aprovar compras</strong>
                    <p className="text-[10px] text-[#71807a]">Revise solicitações pendentes.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PESQUISA VIEW */}
            {activeSection === "pesquisa" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-[#15201c]">Pesquisa de Produtos & Catálogo</h2>
                    <p className="text-xs text-[#71807a]">Encontre peças por código de fábrica, montadora ou aplicação.</p>
                  </div>
                  <span className="text-xs font-mono text-[#16845a] font-bold">54.200 itens catalogados</span>
                </div>

                {/* Sub-view: Busca / Filtros / Resultados / Produto */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Filters */}
                  <div className="md:col-span-4 bg-white border border-[#e4ebe7] rounded-xl p-4 space-y-4 text-xs">
                    <span className="font-bold text-[#15201c] uppercase text-[10px] tracking-wider block">
                      Filtros Dinâmicos
                    </span>

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-[#5e6965]">Categoria</label>
                      <select className="w-full p-2 bg-[#f8faf9] border border-[#e4ebe7] rounded text-xs">
                        <option>Componentes Eletromecânicos (34)</option>
                        <option>Fluidos e Lubrificantes Industriais (18)</option>
                        <option>Válvulas e Conexões de Alta Pressão (22)</option>
                        <option>Filtros e Equipamentos Industriais (41)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-[#5e6965]">Prazo de Entrega</label>
                      <div className="space-y-1 text-[11px]">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Até 24 horas (Pronta Entrega)</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Até 3 dias úteis</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Lotes industriais (7+ dias)</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#edf1ef]">
                      <label className="text-[11px] font-semibold text-[#5e6965]">Tipo de Frete</label>
                      <div className="flex gap-2">
                        <button className="flex-1 py-1.5 bg-[#e8f7ef] text-[#116c49] font-bold rounded">
                          CIF (Incluso)
                        </button>
                        <button className="flex-1 py-1.5 bg-[#f8faf9] text-[#5e6965] rounded">
                          FOB (Retirada)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Results Grid */}
                  <div className="md:col-span-8 space-y-3">
                    {[
                      {
                        code: "OEM-4890",
                        name: "Pastilha de Freio Cerâmica Dianteira",
                        brand: "Fras-le",
                        stock: "140 disponíveis",
                        suppliers: "3 distribuidores",
                        price: "R$ 42,50",
                      },
                      {
                        code: "OEM-7712",
                        name: "Disco de Freio Ventilado 280mm",
                        brand: "Fremax",
                        stock: "60 disponíveis",
                        suppliers: "2 distribuidores",
                        price: "R$ 118,00",
                      },
                      {
                        code: "OEM-3301",
                        name: "Fluido de Freio DOT 4 (500ml)",
                        brand: "Bosch",
                        stock: "320 disponíveis",
                        suppliers: "4 distribuidores",
                        price: "R$ 28,90",
                      },
                    ].map((item) => (
                      <div
                        key={item.code}
                        className="bg-white border border-[#e4ebe7] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#16845a] transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] text-[#71807a]">
                            <span className="font-mono font-bold text-[#16845a]">{item.code}</span>
                            <span>•</span>
                            <span>{item.brand}</span>
                            <span>•</span>
                            <span className="text-[#16845a] font-semibold">{item.suppliers}</span>
                          </div>
                          <h4 className="font-bold text-sm text-[#15201c]">{item.name}</h4>
                          <span className="text-[11px] text-[#5e6965]">{item.stock}</span>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                          <span className="text-base font-extrabold text-[#15201c]">{item.price}</span>
                          <button
                            onClick={() => {
                              setActiveSection("cotacoes");
                              setCotacoesSubTab("nova");
                            }}
                            className="px-3 py-1.5 bg-[#16845a] text-white rounded-lg text-xs font-bold hover:bg-[#116c49]"
                          >
                            + Cotar Item
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. COTAÇÕES VIEW */}
            {activeSection === "cotacoes" && (
              <div className="space-y-6 animate-fadeIn">
                {cotacoesSubTab === "comparar" ? (
                  /* Comparar Fornecedores Matrix */
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold text-[#15201c]">Matriz de Comparação de Fornecedores</h2>
                        <p className="text-xs text-[#71807a]">RFQ #2024-089: Lote de 100 Pastilhas de Freio Cerâmica</p>
                      </div>
                      <span className="px-2.5 py-1 bg-[#e8f7ef] text-[#16845a] font-bold text-xs rounded-full">
                        Melhor Custo Total: AutoMax
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          id: "automax",
                          name: "AutoMax Distribuição",
                          rating: "4.9 ★",
                          unitPrice: "R$ 42,50",
                          freight: "CIF (Incluso)",
                          leadTime: "2 dias úteis",
                          payment: "Faturamento 60 dias",
                          totalTco: "R$ 4.250,00",
                          isBest: true,
                        },
                        {
                          id: "pecasbrasil",
                          name: "Peças Brasil Indústria",
                          rating: "4.7 ★",
                          unitPrice: "R$ 39,90",
                          freight: "FOB (+ R$ 380)",
                          leadTime: "1 dia útil",
                          payment: "Boleto 30 dias",
                          totalTco: "R$ 4.370,00",
                          isBest: false,
                        },
                        {
                          id: "distribuidorasul",
                          name: "Distribuidora Sul",
                          rating: "4.5 ★",
                          unitPrice: "R$ 44,00",
                          freight: "CIF (Incluso)",
                          leadTime: "4 dias úteis",
                          payment: "Faturamento 30/60",
                          totalTco: "R$ 4.400,00",
                          isBest: false,
                        },
                      ].map((sup) => (
                        <div
                          key={sup.id}
                          className={`bg-white border rounded-2xl p-5 space-y-4 transition-all ${
                            sup.isBest
                              ? "border-[#16845a] shadow-md ring-2 ring-[#16845a]/10"
                              : "border-[#e4ebe7]"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-bold text-[#16845a] uppercase tracking-wider block">
                                {sup.rating} Homologado
                              </span>
                              <h3 className="font-bold text-sm text-[#15201c]">{sup.name}</h3>
                            </div>
                            {sup.isBest && (
                              <span className="px-2 py-0.5 rounded bg-[#16845a] text-white text-[9px] font-bold">
                                RECOMENDADA
                              </span>
                            )}
                          </div>

                          <div className="space-y-2 text-xs border-t border-b border-[#f0f3f1] py-3">
                            <div className="flex justify-between text-[#71807a]">
                              <span>Preço Unitário:</span>
                              <strong className="text-[#15201c]">{sup.unitPrice}</strong>
                            </div>
                            <div className="flex justify-between text-[#71807a]">
                              <span>Frete:</span>
                              <strong className="text-[#15201c]">{sup.freight}</strong>
                            </div>
                            <div className="flex justify-between text-[#71807a]">
                              <span>Prazo de Entrega:</span>
                              <strong className="text-[#15201c]">{sup.leadTime}</strong>
                            </div>
                            <div className="flex justify-between text-[#71807a]">
                              <span>Condição:</span>
                              <strong className="text-[#15201c]">{sup.payment}</strong>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <small className="text-[9px] text-[#71807a] block">Custo Total (TCO):</small>
                              <span className="text-base font-extrabold text-[#15201c]">{sup.totalTco}</span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedSupplierId(sup.id);
                                setCotacoesSubTab("negociacao");
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                                sup.isBest
                                  ? "bg-[#16845a] text-white hover:bg-[#116c49]"
                                  : "bg-[#f5f7f6] text-[#5e6965] hover:bg-[#e4ebe7]"
                              }`}
                            >
                              Negociar →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : cotacoesSubTab === "negociacao" ? (
                  /* Mesa de Negociação & Contraproposta */
                  <div className="bg-white border border-[#e4ebe7] rounded-2xl p-6 space-y-6 max-w-2xl mx-auto shadow-sm">
                    <div className="flex justify-between items-start border-b border-[#f0f3f1] pb-4">
                      <div>
                        <span className="text-xs font-bold text-[#16845a] uppercase tracking-wider">
                          Mesa de Negociação em Tempo Real
                        </span>
                        <h3 className="text-lg font-bold text-[#15201c]">Apex Distribuição Industrial</h3>
                        <p className="text-xs text-[#71807a]">RFQ #2024-089 • Proposta original: R$ 4.250,00</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#e8f7ef] text-[#116c49] font-bold text-xs">
                        Canal Seguro
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span>Contraproposta de Desconto por Lote:</span>
                          <span className="text-[#16845a]">-{discountPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="15"
                          value={discountPercent}
                          onChange={(e) => setDiscountPercent(Number(e.target.value))}
                          className="w-full accent-[#16845a]"
                        />
                        <div className="flex justify-between text-[10px] text-[#71807a]">
                          <span>0% (Tabela)</span>
                          <span>-5% (Volume)</span>
                          <span>-10% (Parceria)</span>
                          <span>-15% (Máximo)</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#15201c]">Prazo de Pagamento Desejado:</label>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {["30 dias", "60 dias", "30/60/90"].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setPaymentDays(opt)}
                              className={`py-2 rounded-lg font-bold border transition-colors ${
                                paymentDays === opt
                                  ? "border-[#16845a] bg-[#e8f7ef] text-[#116c49]"
                                  : "border-[#e4ebe7] text-[#5e6965]"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Recalculated Values */}
                      <div className="p-4 bg-[#f8faf9] border border-[#e4ebe7] rounded-xl flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[#71807a] block">Novo Valor Negociado:</span>
                          <strong className="text-lg text-[#16845a]">
                            R$ {(4250 * (1 - discountPercent / 100)).toFixed(2).replace(".", ",")}
                          </strong>
                        </div>
                        <div className="text-right">
                          <span className="text-[#71807a] block">Economia Estimada:</span>
                          <span className="font-bold text-[#116c49]">
                            R$ {((4250 * discountPercent) / 100).toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      </div>

                      {counterOfferSuccess ? (
                        <div className="p-3 bg-[#e8f7ef] border border-[#ccebd8] rounded-lg text-xs text-[#116c49] font-bold text-center">
                          ✓ Contraproposta enviada ao fornecedor AutoMax com sucesso!
                        </div>
                      ) : (
                        <button
                          onClick={() => setCounterOfferSuccess(true)}
                          className="w-full py-3 bg-[#16845a] hover:bg-[#116c49] text-white font-bold rounded-xl text-xs transition-colors shadow-md"
                        >
                          Enviar Contraproposta Formal
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Standard Cotações List */
                  <div className="bg-white border border-[#e4ebe7] rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-sm text-[#15201c]">Todas as Cotações em Andamento</h3>
                      <button
                        onClick={() => setCotacoesSubTab("comparar")}
                        className="text-xs text-[#16845a] font-bold"
                      >
                        Abrir Matriz Comparativa →
                      </button>
                    </div>
                    <p className="text-xs text-[#71807a]">
                      Selecione uma cotação para ver respostas de fornecedores ou abrir a mesa de negociação.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 4. PEDIDOS VIEW */}
            {activeSection === "pedidos" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-[#15201c]">Gestão de Pedidos (Orders Lifecycle)</h2>
                    <p className="text-xs text-[#71807a]">Acompanhamento em tempo real desde a emissão da PO até a entrega física.</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#16845a]">8 pedidos ativos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: "PO-9410",
                      product: "Pastilhas de freio (100 un)",
                      supplier: "AutoMax Distribuição",
                      status: "Em transporte",
                      statusBadge: "bg-[#e8f7ef] text-[#17704d]",
                      eta: "Hoje às 16:30",
                      progress: 75,
                      carrier: "JadLog Express",
                    },
                    {
                      id: "PO-9408",
                      product: "Óleo 5W30 (2 Tambores 200L)",
                      supplier: "Distribuidora Sul",
                      status: "Confirmado pelo fornecedor",
                      statusBadge: "bg-[#fff6df] text-[#9b7620]",
                      eta: "Amanhã às 10:00",
                      progress: 40,
                      carrier: "Transporte Próprio",
                    },
                  ].map((order) => (
                    <div key={order.id} className="bg-white border border-[#e4ebe7] rounded-xl p-5 space-y-3 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#16845a]">{order.id}</span>
                          <h4 className="font-bold text-sm text-[#15201c]">{order.product}</h4>
                          <span className="text-xs text-[#71807a]">{order.supplier}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${order.statusBadge}`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-[#71807a]">
                          <span>Progresso da Entrega:</span>
                          <span className="font-bold text-[#15201c]">{order.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-[#edf2ef] rounded-full overflow-hidden">
                          <div style={{ width: `${order.progress}%` }} className="h-full bg-[#16845a] rounded-full" />
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs text-[#71807a] pt-2 border-t border-[#f0f3f1]">
                        <span>Previsão: <strong className="text-[#15201c]">{order.eta}</strong></span>
                        <span className="text-[#16845a] font-bold cursor-pointer">Ver Rastreio →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. FORNECEDORES VIEW */}
            {activeSection === "fornecedores" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-[#15201c]">Rede de Fornecedores Homologados</h2>
                    <p className="text-xs text-[#71807a]">Classificação por pontualidade, certificações ISO e histórico de compras.</p>
                  </div>
                  <span className="text-xs font-mono text-[#16845a] font-bold">48 fornecedores ativos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "AutoMax Distribuidora",
                      segment: "Linha Pesada & Freios",
                      sla: "98.4% no prazo",
                      iso: "ISO 9001 / ISO 14001",
                      orders: "142 pedidos entregues",
                    },
                    {
                      name: "Distribuidora Sul Lubrificantes",
                      segment: "Óleos & Fluidos",
                      sla: "96.2% no prazo",
                      iso: "ISO 9001",
                      orders: "88 pedidos entregues",
                    },
                    {
                      name: "Peças Brasil Indústria",
                      segment: "Suspensão & Amortecedores",
                      sla: "94.8% no prazo",
                      iso: "Certificação Inmetro",
                      orders: "54 pedidos entregues",
                    },
                  ].map((sup) => (
                    <div key={sup.name} className="bg-white border border-[#e4ebe7] rounded-xl p-5 space-y-3 shadow-sm">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#16845a] uppercase">{sup.segment}</span>
                        <h4 className="font-bold text-sm text-[#15201c]">{sup.name}</h4>
                      </div>
                      <div className="space-y-1 text-xs text-[#71807a]">
                        <p>Pontualidade: <strong className="text-[#16845a]">{sup.sla}</strong></p>
                        <p>Qualidade: <strong className="text-[#15201c]">{sup.iso}</strong></p>
                        <p>Volume: <strong className="text-[#15201c]">{sup.orders}</strong></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. APROVAÇÕES VIEW */}
            {activeSection === "aprovacoes" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-[#15201c]">Central de Aprovações & Alçadas</h2>
                    <p className="text-xs text-[#71807a]">Requisições que excederam limites e aguardam validação de gestores.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-[#fff6df] text-[#9b7620] font-bold text-xs rounded-full">
                    3 pendentes de análise
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: "REQ-89201",
                      title: "Pastilhas de freio cerâmica (Lote 200 un)",
                      buyer: "Marcus Ritta (Comprador)",
                      amount: "R$ 8.420,00",
                      limit: "Alçada Gerência (< R$ 10.000)",
                      budgetLeft: "R$ 42.000 disponíveis",
                    },
                    {
                      id: "REQ-89198",
                      title: "Kit Amortecedores Dianteiros (Lote 40 un)",
                      buyer: "Ana Souza (Compradora)",
                      amount: "R$ 14.800,00",
                      limit: "Alçada Gerência (< R$ 25.000)",
                      budgetLeft: "R$ 33.600 disponíveis",
                    },
                  ].map((req) => (
                    <div
                      key={req.id}
                      className="bg-white border border-[#e4ebe7] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-[#16845a]">{req.id}</span>
                          <span>•</span>
                          <span className="text-[#71807a]">{req.buyer}</span>
                        </div>
                        <h4 className="font-bold text-sm text-[#15201c]">{req.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-[#5e6965]">
                          <span>Alçada: {req.limit}</span>
                          <span>•</span>
                          <span className="text-[#16845a] font-semibold">Saldo: {req.budgetLeft}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-base font-extrabold text-[#15201c]">{req.amount}</span>
                        {approvedRequests[req.id] === "approved" ? (
                          <span className="px-3 py-1.5 rounded-lg bg-[#e8f7ef] text-[#116c49] font-bold text-xs">
                            ✓ Aprovado
                          </span>
                        ) : approvedRequests[req.id] === "rejected" ? (
                          <span className="px-3 py-1.5 rounded-lg bg-[#fff0f0] text-[#b34b4b] font-bold text-xs">
                            ✕ Reprovado
                          </span>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setApprovedRequests({ ...approvedRequests, [req.id]: "rejected" })}
                              className="px-3 py-1.5 border border-[#e4ebe7] text-[#71807a] hover:bg-[#fff0f0] hover:text-[#b34b4b] rounded-lg text-xs font-bold transition-colors"
                            >
                              Reprovar
                            </button>
                            <button
                              onClick={() => setApprovedRequests({ ...approvedRequests, [req.id]: "approved" })}
                              className="px-3 py-1.5 bg-[#16845a] hover:bg-[#116c49] text-white rounded-lg text-xs font-bold transition-colors"
                            >
                              Aprovar Compra
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. RELATÓRIOS VIEW */}
            {activeSection === "relatorios" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-[#15201c]">Relatórios Gerenciais de Suprimentos</h2>
                    <p className="text-xs text-[#71807a]">Economia alcançada por negociação e cumprimento de SLAs.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-[#e4ebe7] rounded-xl p-5 space-y-1">
                    <span className="text-xs text-[#71807a]">Economia Acumulada no Mês</span>
                    <strong className="text-2xl font-extrabold text-[#16845a] block">R$ 28.450,00</strong>
                    <span className="text-[10px] text-[#71807a]">+12.4% acima da meta de economia</span>
                  </div>

                  <div className="bg-white border border-[#e4ebe7] rounded-xl p-5 space-y-1">
                    <span className="text-xs text-[#71807a]">Tempo Médio de Ciclo (P2P)</span>
                    <strong className="text-2xl font-extrabold text-[#15201c] block">2.4 dias</strong>
                    <span className="text-[10px] text-[#16845a] font-bold">Redução de 65% vs processo manual</span>
                  </div>

                  <div className="bg-white border border-[#e4ebe7] rounded-xl p-5 space-y-1">
                    <span className="text-xs text-[#71807a]">Taxa de Conformidade SLA</span>
                    <strong className="text-2xl font-extrabold text-[#15201c] block">97.8%</strong>
                    <span className="text-[10px] text-[#71807a]">Entregas dentro da janela acordada</span>
                  </div>
                </div>
              </div>
            )}

            {/* 8. CONFIGURAÇÕES VIEW */}
            {activeSection === "configuracoes" && (
              <div className="bg-white border border-[#e4ebe7] rounded-xl p-6 space-y-6 max-w-2xl animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-[#15201c]">Configurações da Empresa & Alçadas</h2>
                  <p className="text-xs text-[#71807a]">Definição de tetos de aprovação e governança de compras corporativas.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#15201c]">Alçada 1 — Comprador (Liberação Direta)</label>
                    <input
                      type="text"
                      defaultValue="Até R$ 5.000,00"
                      className="w-full p-2.5 bg-[#f8faf9] border border-[#e4ebe7] rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#15201c]">Alçada 2 — Gerência de Operações</label>
                    <input
                      type="text"
                      defaultValue="De R$ 5.000,01 até R$ 25.000,00"
                      className="w-full p-2.5 bg-[#f8faf9] border border-[#e4ebe7] rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#15201c]">Alçada 3 — Diretoria Executiva / CFO</label>
                    <input
                      type="text"
                      defaultValue="Acima de R$ 25.000,00"
                      className="w-full p-2.5 bg-[#f8faf9] border border-[#e4ebe7] rounded-lg text-xs"
                    />
                  </div>

                  <button className="px-4 py-2.5 bg-[#16845a] text-white font-bold rounded-lg text-xs hover:bg-[#116c49]">
                    Salvar Parâmetros de Alçada
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
