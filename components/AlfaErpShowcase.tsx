"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  Car,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sliders,
  DollarSign,
  Package,
  Layers,
  Sparkles,
  Command,
  Eye,
  EyeOff,
  RefreshCw,
  TrendingUp,
  FileText,
  KeyRound,
  Filter,
  ShieldCheck,
  Zap,
  Building2,
  Monitor,
  Lock,
  Maximize2,
  Minimize2,
  ChevronRight,
  Calendar,
  Download,
  Check,
  BarChart3,
  Clock,
  User,
} from "lucide-react";

export default function AlfaErpShowcase() {
  // Main view mode
  const [activeTab, setActiveTab] = useState<
    "comparison" | "balcaoSandbox" | "commandPalette"
  >("comparison");

  // Selected screen for Before vs After comparison
  const [selectedScreen, setSelectedScreen] = useState<
    "balcao" | "menu" | "faturamento" | "login"
  >("balcao");

  // Display mode in comparison: "sideBySide" | "fullscreenRedesign"
  const [displayMode, setDisplayMode] = useState<
    "sideBySide" | "fullscreenRedesign"
  >("sideBySide");

  // Login screen interactive state
  const [loginFilial, setLoginFilial] = useState("Filial 08 — Toledo / PR");
  const [loginTerminal, setLoginTerminal] = useState("Terminal PDV #01 (Balcão Rápido)");
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Balcão interactive state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("BRA2E19");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      code: "029 905 409",
      name: "Cabo de Vela Ignição Fusca/Kombi 1.6",
      brand: "NGK",
      brandBadge: "bg-red-500/15 text-red-400 border-red-500/30",
      qty: 1,
      unitPrice: 145.0,
      stockLocal: 14,
      stockCd: 48,
    },
    {
      id: 2,
      code: "032 129 620",
      name: "Filtro de Ar Motor VW EA111",
      brand: "Mahle",
      brandBadge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      qty: 2,
      unitPrice: 48.0,
      stockLocal: 8,
      stockCd: 22,
    },
  ]);
  const [discountPercent, setDiscountPercent] = useState<number>(5);

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
  const discountValue = subtotal * (discountPercent / 100);
  const total = subtotal - discountValue;

  const catalogItems = [
    {
      id: 101,
      code: "029 905 409",
      name: "Cabo de Vela Ignição Gol/Parati 1.6",
      application: "VW Gol / Parati / Saveiro 1.6 92/98",
      brand: "NGK Automotive",
      brandBadge: "bg-red-500/15 text-red-400 border-red-500/30",
      price: 145.0,
      stockLocal: 14,
      stockCd: 48,
      compatible: true,
    },
    {
      id: 102,
      code: "032 129 620",
      name: "Filtro de Ar Primário Motor EA111",
      application: "VW Gol G5/G6 / Fox / Polo 1.0 e 1.6 8V",
      brand: "Mahle Metal Leve",
      brandBadge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      price: 48.0,
      stockLocal: 8,
      stockCd: 22,
      compatible: true,
    },
    {
      id: 103,
      code: "5U0 698 151 A",
      name: "Jogo Pastilha de Freio Dianteira",
      application: "VW Gol / Voyage / Saveiro 2013+",
      brand: "Fras-le",
      brandBadge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
      price: 180.0,
      stockLocal: 12,
      stockCd: 35,
      compatible: true,
    },
    {
      id: 104,
      code: "BKR5E-11",
      name: "Vela de Ignição Green Plug (Jogo 4un)",
      application: "Universal Linha VW / GM / Fiat 1.0 a 1.8",
      brand: "NGK",
      brandBadge: "bg-red-500/15 text-red-400 border-red-500/30",
      price: 92.0,
      stockLocal: 28,
      stockCd: 110,
      compatible: true,
    },
  ];

  const addItemToCart = (item: (typeof catalogItems)[0]) => {
    const existing = cartItems.find((ci) => ci.code === item.code);
    if (existing) {
      setCartItems(
        cartItems.map((ci) =>
          ci.code === item.code ? { ...ci, qty: ci.qty + 1 } : ci
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: item.id,
          code: item.code,
          name: item.name,
          brand: item.brand,
          brandBadge: item.brandBadge,
          qty: 1,
          unitPrice: item.price,
          stockLocal: item.stockLocal,
          stockCd: item.stockCd,
        },
      ]);
    }
  };

  // Screens metadata
  const screensInfo = {
    balcao: {
      title: "01. Tela de Vendas & Balcão de Peças",
      subtitle: "Releitura da tela principal de atendimento rápido e orçamento",
      legacyPrint: "/cases/alfa-erp/legacy-balcao.png",
      legacyIssues: [
        "Mais de 25 campos visíveis competindo por atenção em uma única tela;",
        "Botão 'Buscar no Google' exposto no ERP comprovando deficiência de catálogo;",
        "10 campos de filtro horizontal que exigiam rolagem manual e clique de mouse;",
        "Tabela de itens densa, sem contraste e sem dados de compatibilidade técnica;",
        "Fricção de tempo no atendimento presencial durante horários de pico.",
      ],
      redesignSolutions: [
        "Barra de busca unificada por Placa, Chassi ou Código OEM com auto-complete;",
        "Identificação veicular com validação técnica automática do motor (EA111);",
        "Tabela de catálogo com status de estoque (Loja vs CD) e tags OEM coloridas;",
        "Split-screen com carrinho fixo e atalhos táteis rápidos (F2 a F10);",
        "Otimização substancial do fluxo com atalhos de teclado e busca direta de peças.",
      ],
    },
    menu: {
      title: "02. Menu Principal & Navegação de Módulos",
      subtitle: "Reestruturação da arquitetura de informação de 17 módulos para 4 domínios",
      legacyPrint: "/cases/alfa-erp/legacy-menu.png",
      legacyIssues: [
        "17 módulos espremidos na barra superior sem agrupamento funcional;",
        "Mega-menu dropdown vertical com 23 links ordenados apenas em ordem alfabética;",
        "Mistura de operações críticas de balcão com rotinas fiscais e contábeis raras;",
        "Ausência total de histórico de telas recentes ou atalhos de teclado;",
        "Operadores recorriam a papéis colados no monitor para memorizar caminhos.",
      ],
      redesignSolutions: [
        "Agrupamento inteligente em 4 domínios: Vendas, Estoque, Compras e Financeiro;",
        "Command Palette integrada (Ctrl + K) para abrir qualquer tela em 2 toques;",
        "Hub visual de rotinas frequentes com atalhos de teclado visíveis (Ctrl+N, F6, Alt+D);",
        "Histórico persistente de últimas telas acessadas por operador;",
        "Navegação 'Zero-Mouse' adaptada ao ritmo acelerado do varejo de autopeças.",
      ],
    },
    faturamento: {
      title: "03. Relatório de Faturamento por Fabricante",
      subtitle: "Transformação da planilha bruta de 18 colunas em Cockpit Analítico",
      legacyPrint: "/cases/alfa-erp/legacy-faturamento.png",
      legacyIssues: [
        "Grid cru de 18 colunas sem zebrado, sem ordenação visual e sem hierarquia;",
        "Filtros horizontais lentos sem presets corporativos de período;",
        "Impossibilidade de visualizar rapidamente devoluções e margem líquida;",
        "Números sem formatação monetária clara, gerando erros de interpretação;",
        "Gestores precisavam exportar para o Excel para calcular indicadores básicos.",
      ],
      redesignSolutions: [
        "4 KPIs luminosos no topo: Faturamento Bruto, Devoluções, Margem e Ticket Médio;",
        "Filtros rápidos em chips de 1 clique (Hoje, 7 Dias, Mês Atual, Ano);",
        "Tabela executiva com badges OEM coloridos (VW, NGK, Nakata, Ford, Sherwin);",
        "Margem líquida e taxa de devolução com severidade cromática (verde/vermelho);",
        "Exportação instantânea para XLSX/PDF e cálculo automático de rentabilidade.",
      ],
    },
    login: {
      title: "04. Tela de Autenticação / Login",
      subtitle: "Modernização da porta de entrada e seleção segura de terminal de caixa",
      legacyPrint: "/cases/alfa-erp/legacy-login.png",
      legacyIssues: [
        "Textura de nuvens dos anos 2000 (Windows XP) transmitindo obsolescência;",
        "Inputs desalinhados e botão conectar cinza sem estados de foco ou hover;",
        "Barra de ajuda azul redundante poluindo a área central;",
        "Falta de seleção de filial física e identificação de terminal de caixa;",
        "Ausência de indicadores de segurança, criptografia ou troca rápida de operador.",
      ],
      redesignSolutions: [
        "Design corporativo premium em Dark Navy com grid automotivo geométrico;",
        "Seletor corporativo de Filial (ex: Filial 08 - Toledo/PR) e Terminal PDV (#01);",
        "Campos alinhados com feedback visual ativo e toggle de visualização de senha;",
        "Autenticação rápida para troca de operador sem fechar orçamentos abertos;",
        "Indicador de segurança com criptografia TLS 1.3 e status do servidor em tempo real.",
      ],
    },
  };

  const currentScreenData = screensInfo[selectedScreen];

  return (
    <div className="w-full bg-[#070b14] border border-blue-950/60 rounded-sm overflow-hidden text-slate-200 font-sans shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3.5 border-b border-slate-800/80 bg-[#0d1424]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/30 text-white flex items-center justify-center font-bold text-sm rounded-sm">
            α
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
                ALFA ERP 2.0
                <span className="text-[10px] text-blue-400 font-mono font-medium">
                  // Automotive Edition
                </span>
              </span>
              <span className="text-[10px] font-mono uppercase bg-blue-500/15 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded-sm font-semibold">
                Estudo Real & Redesign
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Comparativo direto entre os Prints Reais do Sistema Legado e os Novos Layouts Modernizados
            </p>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center space-x-1.5 mt-3 sm:mt-0 font-mono text-xs">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-3 py-1.5 transition-all rounded-sm flex items-center gap-1.5 ${
              activeTab === "comparison"
                ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>01. Comparativo Prints vs Redesign</span>
          </button>
          <button
            onClick={() => setActiveTab("balcaoSandbox")}
            className={`px-3 py-1.5 transition-all rounded-sm flex items-center gap-1.5 ${
              activeTab === "balcaoSandbox"
                ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>02. Balcão Interativo (PDV)</span>
          </button>
          <button
            onClick={() => setActiveTab("commandPalette")}
            className={`px-3 py-1.5 transition-all rounded-sm flex items-center gap-1.5 ${
              activeTab === "commandPalette"
                ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800"
            }`}
          >
            <Command className="w-3.5 h-3.5" />
            <span>03. Command Palette (Ctrl+K)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: COMPARATIVO PRINTS REAIS VS REDESIGN REAL                           */}
      {/* ========================================================================= */}
      {activeTab === "comparison" && (
        <div className="p-6 space-y-6">
          {/* Sub-Header & Screen Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-semibold">
                Análise Comparativa Tela a Tela // HIGH-FIDELITY REDESIGN
              </span>
              <h3 className="text-lg font-medium text-white tracking-tight">
                {currentScreenData.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {currentScreenData.subtitle}
              </p>
            </div>

            {/* Screen Picker Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {[
                { id: "balcao", label: "01. Balcão & Busca" },
                { id: "menu", label: "02. Mega-Menu" },
                { id: "faturamento", label: "03. Faturamento" },
                { id: "login", label: "04. Tela de Login" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedScreen(item.id as any)}
                  className={`px-3 py-1.5 rounded-sm transition-all ${
                    selectedScreen === item.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-sm shadow-blue-500/30 ring-1 ring-blue-400/50"
                      : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="h-6 w-px bg-slate-800 mx-1 hidden sm:block" />

              {/* Display Mode Toggle */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-sm p-0.5">
                <button
                  onClick={() => setDisplayMode("sideBySide")}
                  className={`px-2.5 py-1 rounded-sm text-[11px] transition-colors ${
                    displayMode === "sideBySide"
                      ? "bg-blue-600 text-white font-medium"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="Visualizar Print Legado lado a lado com o Redesign"
                >
                  Lado a Lado (50/50)
                </button>
                <button
                  onClick={() => setDisplayMode("fullscreenRedesign")}
                  className={`px-2.5 py-1 rounded-sm text-[11px] transition-colors ${
                    displayMode === "fullscreenRedesign"
                      ? "bg-blue-600 text-white font-medium"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="Visualizar o Redesign em tela cheia"
                >
                  Expandir Redesign
                </button>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Container */}
          <div className={`grid gap-6 ${displayMode === "sideBySide" ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
            {/* ================= LEFT COLUMN: PRINT REAL LEGADO ================= */}
            {displayMode === "sideBySide" && (
              <div className="lg:col-span-5 flex flex-col space-y-4">
                <div className="p-4 border border-rose-950/60 bg-[#0d101a] rounded-sm flex-1 flex flex-col justify-between space-y-3 shadow-lg">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                        <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                          Print Original do Sistema Legado
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 border border-slate-800 rounded-sm">
                        Evidência Real em Campo
                      </span>
                    </div>

                    {/* The Real Image from public folder */}
                    <div className="relative w-full aspect-[4/3] bg-black border border-slate-800/90 rounded-sm overflow-hidden group shadow-inner">
                      <Image
                        src={currentScreenData.legacyPrint}
                        alt={`Print real legado de ${selectedScreen}`}
                        fill
                        className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm border border-slate-700 px-2 py-0.5 rounded text-[10px] font-mono text-slate-300">
                        Print de Produção
                      </div>
                    </div>
                  </div>

                  {/* Diagnostic Bullets */}
                  <div className="p-3.5 bg-slate-950 border border-rose-950/60 rounded-sm space-y-2 font-mono text-xs">
                    <span className="text-rose-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>Diagnóstico de Dívida de UX:</span>
                    </span>
                    <ul className="space-y-1.5 text-slate-400 text-[11px] leading-relaxed">
                      {currentScreenData.legacyIssues.map((issue, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-rose-500 font-bold">✕</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ================= RIGHT COLUMN: REDESIGN REAL EM ALTA FIDELIDADE ================= */}
            <div className={`${displayMode === "sideBySide" ? "lg:col-span-7" : "col-span-1"} space-y-4`}>
              <div className="p-4 border border-blue-500/40 bg-[#0c1222] rounded-sm space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      ALFA ERP 2.0 // Redesign Real Construído em Código
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 font-mono text-[10px]">
                    <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-sm font-semibold">
                      ✓ Alta Fidelidade
                    </span>
                    <span className="bg-blue-500/15 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded-sm">
                      Zero-Mouse UX
                    </span>
                  </div>
                </div>

                {/* ================= RENDER TELA 01: BALCÃO MODERNO ================= */}
                {selectedScreen === "balcao" && (
                  <div className="border border-slate-800 bg-[#080d19] rounded-sm overflow-hidden font-sans space-y-3 p-4">
                    {/* Vehicle Context Top Bar */}
                    <div className="p-3 bg-blue-950/30 border border-blue-500/30 rounded-sm flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-sm bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-white text-xs bg-black px-2 py-0.5 rounded border border-slate-700">
                              BRA-2E19
                            </span>
                            <span className="text-xs font-semibold text-white">
                              VW Gol 1.6 MSI 8V Flex (EA111)
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                              ✓ MOTOR VINCULADO
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            Ano 2018/2019 • Chassi: 9BWCA05U0JP182910 • Cliente: Auto Mecânica São José
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        Atendente: <strong className="text-white">MARCUS.117</strong> (Caixa #01)
                      </span>
                    </div>

                    {/* Single Unified Smart Search Bar */}
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Digite código OEM, placa, chassi ou descrição (ex: vela, filtro, pastilha)..."
                          className="w-full bg-slate-950 border border-blue-900/60 rounded-sm pl-9 pr-3 py-2 text-xs font-mono text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <button className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold rounded-sm transition-colors flex items-center space-x-1 shadow-sm">
                        <span>Buscar [Enter]</span>
                      </button>
                    </div>

                    {/* Split Layout: Catalog Table (Left) + Cart Summary (Right) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                      {/* Catalog Table */}
                      <div className="md:col-span-8 border border-slate-800/80 bg-slate-950/70 rounded-sm overflow-hidden">
                        <div className="p-2 bg-slate-900/80 border-b border-slate-800 text-[10px] font-mono font-semibold text-blue-400 flex justify-between">
                          <span>PEÇAS COMPATÍVEIS COM O VEÍCULO</span>
                          <span className="text-emerald-400 font-medium">4 itens localizados</span>
                        </div>

                        <div className="divide-y divide-slate-800/60 text-xs font-mono">
                          {catalogItems.map((item) => (
                            <div
                              key={item.id}
                              className="p-2.5 hover:bg-slate-900/70 transition-colors flex items-center justify-between gap-2"
                            >
                              <div className="space-y-0.5">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-white text-[11px]">
                                    {item.name}
                                  </span>
                                  <span className={`text-[9px] border px-1 py-0.2 rounded font-semibold ${item.brandBadge}`}>
                                    {item.brand}
                                  </span>
                                </div>
                                <div className="text-[10px] text-slate-400 flex items-center space-x-2">
                                  <span>OEM: {item.code}</span>
                                  <span>•</span>
                                  <span className="text-emerald-400">Loja: {item.stockLocal} un</span>
                                  <span>•</span>
                                  <span className="text-blue-400">CD: {item.stockCd} un</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-emerald-400 text-xs whitespace-nowrap">
                                  R$ {item.price.toFixed(2)}
                                </span>
                                <button
                                  onClick={() => addItemToCart(item)}
                                  className="px-2 py-1 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded-sm text-[10px] transition-colors font-semibold"
                                  title="Adicionar ao Orçamento"
                                >
                                  + Inserir
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Mini Checkout */}
                      <div className="md:col-span-4 border border-blue-950/60 bg-[#090f1e] p-3 rounded-sm space-y-2.5 font-mono text-xs">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                          <span className="font-bold text-white text-[11px]">Orçamento #4092</span>
                          <span className="text-[10px] text-emerald-400 font-semibold">{cartItems.length} itens</span>
                        </div>

                        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                          {cartItems.map((ci) => (
                            <div key={ci.id} className="p-1.5 bg-slate-950/80 border border-slate-800 rounded-sm text-[10px] flex justify-between items-center">
                              <span className="text-white truncate max-w-[110px]">{ci.name}</span>
                              <span className="text-emerald-400 font-bold whitespace-nowrap">
                                {ci.qty}x R$ {ci.unitPrice.toFixed(0)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px]">
                          <div className="flex justify-between text-slate-400">
                            <span>Subtotal:</span>
                            <span>R$ {subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Desconto (5%):</span>
                            <span className="text-rose-400">- R$ {discountValue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-white font-bold text-xs pt-1 border-t border-slate-800">
                            <span>Total Líquido:</span>
                            <span className="text-emerald-400 text-sm">R$ {total.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Semantic F-Keys Buttons */}
                        <div className="grid grid-cols-2 gap-1 pt-1 text-[10px]">
                          <button className="p-1.5 bg-teal-950/50 border border-teal-500/30 text-teal-300 rounded text-center font-semibold hover:bg-teal-900/60 transition-colors">
                            [F3] Pix
                          </button>
                          <button className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-center font-bold transition-all shadow-sm">
                            [F10] Faturar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= RENDER TELA 02: MENU MODERNO & COMMAND PALETTE ================= */}
                {selectedScreen === "menu" && (
                  <div className="border border-slate-800 bg-[#080d19] rounded-sm overflow-hidden font-sans space-y-3 p-4">
                    {/* Modern Top Navigation Bar */}
                    <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-sm flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center space-x-1">
                        {[
                          { name: "Vendas & Balcão", active: true },
                          { name: "Estoque & Peças", active: false },
                          { name: "Compras & Fornecedores", active: false },
                          { name: "Fiscal & Financeiro", active: false },
                        ].map((m, i) => (
                          <span
                            key={i}
                            className={`px-2.5 py-1 rounded-sm cursor-pointer transition-colors ${
                              m.active
                                ? "bg-blue-600 text-white font-semibold shadow-sm"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            {m.name}
                          </span>
                        ))}
                      </div>

                      <span className="text-[10px] text-blue-300 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded font-mono">
                        Filial 08 (Toledo/PR)
                      </span>
                    </div>

                    {/* Integrated Command Palette Preview */}
                    <div className="p-4 bg-slate-950 border border-blue-900/60 rounded-sm space-y-3 font-mono">
                      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs">
                        <Command className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-semibold">Command Palette (Ctrl + K)</span>
                        <span className="text-[10px] text-slate-500 ml-auto">Busca universal em tempo real</span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        {[
                          { title: "Nova Venda Balcão Rápido", shortcut: "Ctrl + N", category: "Rotina Crítica", desc: "Abrir tela de orçamento com foco no leitor" },
                          { title: "Consultar Compatibilidade por Placa", shortcut: "F6", category: "Catálogo Técnico", desc: "Consulta FIPE e histórico de manutenções" },
                          { title: "Entrada de Mercadoria por XML de NF-e", shortcut: "Ctrl + E", category: "Estoque", desc: "Manifestação de destinatário e conferência cega" },
                          { title: "DRE & Faturamento por Fabricante", shortcut: "Ctrl + R", category: "Financeiro", desc: "Margem líquida por marca e índice de devoluções" },
                        ].map((cmd, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-slate-900/60 hover:bg-blue-950/40 border border-slate-800/80 hover:border-blue-500/40 rounded-sm flex items-center justify-between transition-all cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-white text-[11px]">{cmd.title}</span>
                                <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded">
                                  {cmd.category}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400">{cmd.desc}</span>
                            </div>
                            <span className="text-[10px] font-bold bg-blue-600/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded">
                              {cmd.shortcut}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= RENDER TELA 03: FATURAMENTO & DRE POR MARCA ================= */}
                {selectedScreen === "faturamento" && (
                  <div className="border border-slate-800 bg-[#080d19] rounded-sm overflow-hidden font-sans space-y-3 p-4">
                    {/* Header with Quick Period Chips */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5 font-mono text-xs">
                      <div className="flex items-center space-x-1">
                        {["Hoje", "Últimos 7 dias", "Mês Atual (Set/24)", "Ano 2024"].map((p, i) => (
                          <button
                            key={i}
                            className={`px-2 py-0.5 rounded-sm text-[10px] ${
                              i === 2
                                ? "bg-blue-600 text-white font-semibold"
                                : "bg-slate-900 text-slate-400 border border-slate-800"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>

                      <button className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-sm text-[10px] flex items-center space-x-1 shadow-sm">
                        <Download className="w-3 h-3" />
                        <span>Exportar XLSX</span>
                      </button>
                    </div>

                    {/* 4 High-Tech KPI Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                      <div className="p-2.5 bg-blue-950/25 border border-blue-500/30 rounded-sm">
                        <span className="text-[9px] uppercase text-blue-300 block font-semibold">Faturamento Bruto</span>
                        <span className="text-base font-bold text-white">R$ 482.910</span>
                        <span className="text-[9px] text-emerald-400 block font-semibold">+12% vs mês anterior</span>
                      </div>
                      <div className="p-2.5 bg-rose-950/25 border border-rose-500/30 rounded-sm">
                        <span className="text-[9px] uppercase text-rose-300 block font-semibold">Devoluções Balcão</span>
                        <span className="text-base font-bold text-rose-400">R$ 6.120 (1.2%)</span>
                        <span className="text-[9px] text-emerald-400 block font-semibold">-40% pós-redesign</span>
                      </div>
                      <div className="p-2.5 bg-emerald-950/25 border border-emerald-500/30 rounded-sm">
                        <span className="text-[9px] uppercase text-emerald-300 block font-semibold">Margem Média Líq.</span>
                        <span className="text-base font-bold text-emerald-400">38.4%</span>
                        <span className="text-[9px] text-slate-400 block">Alçadas cumpridas</span>
                      </div>
                      <div className="p-2.5 bg-indigo-950/25 border border-indigo-500/30 rounded-sm">
                        <span className="text-[9px] uppercase text-indigo-300 block font-semibold">Ticket Médio</span>
                        <span className="text-base font-bold text-white">R$ 380,00</span>
                        <span className="text-[9px] text-indigo-300 block">2.8 itens / pedido</span>
                      </div>
                    </div>

                    {/* Clean Executive Table with OEM Badges */}
                    <div className="border border-slate-800 bg-slate-950 rounded-sm overflow-hidden font-mono text-[11px]">
                      <div className="grid grid-cols-5 p-2 bg-slate-900 border-b border-slate-800 text-[9px] text-blue-400 font-bold uppercase">
                        <span>Marca OEM</span>
                        <span className="text-right">Qtd Vend.</span>
                        <span className="text-right">Faturamento Bruto</span>
                        <span className="text-right">Devoluções</span>
                        <span className="text-right">Margem Líquida</span>
                      </div>

                      {[
                        { brand: "VOLKSWAGEN", badge: "bg-blue-500/15 text-blue-400 border-blue-500/30", qty: "142 un", gross: "R$ 62.400", dev: "1 un (0.7%)", devColor: "text-slate-400", margin: "41.2%" },
                        { brand: "NGK AUTOMOTIVE", badge: "bg-red-500/15 text-red-400 border-red-500/30", qty: "420 un", gross: "R$ 38.640", dev: "2 un (0.4%)", devColor: "text-emerald-400", margin: "39.5%" },
                        { brand: "NAKATA", badge: "bg-amber-500/15 text-amber-400 border-amber-500/30", qty: "94 un", gross: "R$ 48.200", dev: "0 un (0.0%)", devColor: "text-emerald-400", margin: "37.8%" },
                        { brand: "FORD MOTORCRAFT", badge: "bg-blue-600/20 text-blue-300 border-blue-500/30", qty: "68 un", gross: "R$ 29.100", dev: "1 un (1.4%)", devColor: "text-rose-400", margin: "36.2%" },
                        { brand: "SHERWIN WILLIAMS", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", qty: "110 un", gross: "R$ 22.000", dev: "0 un (0.0%)", devColor: "text-emerald-400", margin: "42.0%" },
                      ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-5 p-2 border-b border-slate-850 hover:bg-slate-900/50 items-center">
                          <div>
                            <span className={`text-[9px] border px-1.5 py-0.2 rounded font-semibold ${row.badge}`}>
                              {row.brand}
                            </span>
                          </div>
                          <span className="text-right text-slate-300">{row.qty}</span>
                          <span className="text-right text-white font-semibold">{row.gross}</span>
                          <span className={`text-right font-semibold ${row.devColor}`}>{row.dev}</span>
                          <span className="text-right text-emerald-400 font-bold">{row.margin}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ================= RENDER TELA 04: TELA DE LOGIN MODERNA ================= */}
                {selectedScreen === "login" && (
                  <div className="border border-slate-800 bg-gradient-to-br from-[#060a14] via-[#091124] to-[#04070e] rounded-sm overflow-hidden font-sans p-6 flex flex-col items-center justify-center min-h-[360px]">
                    <div className="w-full max-w-sm p-6 bg-[#0c1426]/90 border border-blue-900/50 rounded-xl shadow-2xl space-y-4">
                      {/* Logo Alfa ERP 2.0 */}
                      <div className="text-center space-y-1">
                        <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/30">
                          α
                        </div>
                        <h4 className="text-sm font-bold text-white tracking-tight pt-1">
                          ALFA ERP // Cloud Enterprise
                        </h4>
                        <p className="text-[10px] font-mono text-slate-400">
                          Autenticação Segura & Abertura de Caixa
                        </p>
                      </div>

                      {/* Filial & Terminal Selectors */}
                      <div className="space-y-2.5 font-mono text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] text-blue-300 uppercase block font-semibold">
                            Filial de Operação:
                          </label>
                          <div className="flex items-center space-x-2 p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 text-xs">
                            <Building2 className="w-3.5 h-3.5 text-blue-400" />
                            <span>{loginFilial}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-blue-300 uppercase block font-semibold">
                            Terminal / Ponto de Venda:
                          </label>
                          <div className="flex items-center space-x-2 p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 text-xs">
                            <Monitor className="w-3.5 h-3.5 text-blue-400" />
                            <span>{loginTerminal}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase block">
                            Matrícula / Usuário:
                          </label>
                          <div className="flex items-center space-x-2 p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 text-xs">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <input
                              type="text"
                              defaultValue="MARCUS.117"
                              className="bg-transparent text-white outline-none w-full text-xs font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase block">
                            Senha de Acesso:
                          </label>
                          <div className="flex items-center space-x-2 p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 text-xs">
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              defaultValue="••••••••••••"
                              className="bg-transparent text-white outline-none w-full text-xs font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-slate-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => setLoginSuccess(true)}
                          className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center space-x-1.5"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{loginSuccess ? "Sessão Autenticada!" : "Acessar Sistema [Enter]"}</span>
                        </button>
                      </div>

                      {/* Security Footnote */}
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
                        <span className="text-emerald-400">● TLS 1.3 Criptografado</span>
                        <span>SLA 99.98% Uptime</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Solutions Highlight List */}
                <div className="p-3.5 bg-slate-950 border border-blue-900/40 rounded-sm space-y-2 font-mono text-xs">
                  <span className="text-emerald-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Benefícios do Redesign Aplicado:</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                    {currentScreenData.redesignSolutions.map((sol, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: BALCÃO INTERATIVO SANDBOX (PDV COMPLETO)                           */}
      {/* ========================================================================= */}
      {activeTab === "balcaoSandbox" && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-medium">
                Simulador Funcional // ZERO-MOUSE PDV
              </span>
              <h3 className="text-lg font-medium text-white tracking-tight">
                Frente de Caixa Automotiva em Alta Velocidade
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-sm font-semibold">
                Sincronizado: Base FIPE + Catálogo OEM
              </span>
            </div>
          </div>

          {/* Full Interactive Sandbox View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Search & Catalog */}
            <div className="lg:col-span-8 space-y-4">
              {/* Vehicle Context Bar */}
              <div className="p-4 bg-gradient-to-r from-blue-950/40 to-slate-900/60 border border-blue-500/30 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-sm bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm bg-black px-2 py-0.5 rounded border border-slate-700">
                        BRA-2E19
                      </span>
                      <span className="text-sm font-semibold text-white">
                        VW Gol 1.6 MSI Flex (EA111)
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                        COMPATÍVEL OEM
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Cliente: Auto Mecânica Toledo Center (CNPJ 08.291.810/0001-92)
                    </span>
                  </div>
                </div>
              </div>

              {/* Universal Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar peça por código OEM, nome, aplicação ou código de barras..."
                  className="w-full bg-slate-950 border border-blue-900/60 rounded-sm pl-9 pr-3 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
                />
              </div>

              {/* Catalog Items Grid */}
              <div className="border border-slate-800 bg-slate-950 rounded-sm overflow-hidden font-mono text-xs divide-y divide-slate-850">
                {catalogItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 hover:bg-slate-900/60 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-xs">{item.name}</span>
                        <span className={`text-[10px] border px-1.5 py-0.2 rounded font-semibold ${item.brandBadge}`}>
                          {item.brand}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                        <span>OEM: {item.code}</span>
                        <span>•</span>
                        <span>{item.application}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center space-x-2 pt-0.5">
                        <span className="text-emerald-400 font-semibold">Loja Toledo: {item.stockLocal} un</span>
                        <span>•</span>
                        <span className="text-blue-400">Centro Distribuição: {item.stockCd} un</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">Unitário:</span>
                        <span className="font-bold text-emerald-400 text-sm">
                          R$ {item.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => addItemToCart(item)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-sm text-xs font-semibold transition-colors shadow-sm"
                      >
                        + Adicionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Cart & Totals */}
            <div className="lg:col-span-4 p-4 border border-blue-950/60 bg-[#0c1222] rounded-sm space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">Orçamento Balcão</span>
                <span className="text-blue-400 font-semibold">{cartItems.length} itens</span>
              </div>

              {/* Cart Items List */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {cartItems.map((ci) => (
                  <div key={ci.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-sm space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold truncate max-w-[150px]">{ci.name}</span>
                      <span className="text-emerald-400 font-bold">R$ {(ci.unitPrice * ci.qty).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>{ci.qty}x R$ {ci.unitPrice.toFixed(2)}</span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => {
                            if (ci.qty > 1) {
                              setCartItems(cartItems.map((i) => i.id === ci.id ? { ...i, qty: i.qty - 1 } : i));
                            } else {
                              setCartItems(cartItems.filter((i) => i.id !== ci.id));
                            }
                          }}
                          className="w-4 h-4 bg-slate-800 rounded text-center leading-3 hover:bg-slate-700"
                        >
                          -
                        </button>
                        <span className="text-white font-bold">{ci.qty}</span>
                        <button
                          onClick={() => setCartItems(cartItems.map((i) => i.id === ci.id ? { ...i, qty: i.qty + 1 } : i))}
                          className="w-4 h-4 bg-slate-800 rounded text-center leading-3 hover:bg-slate-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Slider */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Desconto Balcão:</span>
                  <span className={`font-bold ${discountPercent <= 5 ? "text-emerald-400" : discountPercent <= 10 ? "text-amber-400" : "text-rose-400"}`}>
                    {discountPercent}% {discountPercent <= 5 ? "(Autonomia)" : discountPercent <= 10 ? "(Alerta)" : "(Gerente)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-800 cursor-pointer"
                />
              </div>

              {/* Totals */}
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Desconto:</span>
                  <span className="text-rose-400">- R$ {discountValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-slate-800">
                  <span>Total Líquido:</span>
                  <span className="text-emerald-400 text-base">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* F-Keys Shortcuts */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button className="p-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded font-semibold text-center hover:bg-emerald-900/50 transition-colors">
                  [F2] Dinheiro
                </button>
                <button className="p-2 bg-teal-950/40 border border-teal-500/30 text-teal-300 rounded font-semibold text-center hover:bg-teal-900/50 transition-colors">
                  [F3] Pix QR
                </button>
                <button className="p-2 bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 rounded font-semibold text-center hover:bg-indigo-900/50 transition-colors">
                  [F4] Cartão
                </button>
                <button className="p-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-center transition-all shadow-md shadow-blue-600/30">
                  [F10] Faturar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: COMMAND PALETTE (CTRL + K)                                         */}
      {/* ========================================================================= */}
      {activeTab === "commandPalette" && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-medium">
                Navegação de Alta Velocidade // ZERO-MOUSE NAVIGATION
              </span>
              <h3 className="text-lg font-medium text-white tracking-tight">
                Command Palette Integrada (Ctrl + K)
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-sm">
              Substituiu o Mega-Menu de 23 Links
            </span>
          </div>

          <div className="max-w-2xl mx-auto p-6 border border-blue-900/60 bg-[#0d1424] rounded-sm shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
              <Command className="w-5 h-5 text-blue-400" />
              <input
                type="text"
                defaultValue="venda"
                placeholder="Digite uma ação, tela ou atalho..."
                className="w-full bg-transparent text-white text-sm font-mono outline-none"
              />
              <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-sm">
                ESC para fechar
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <span className="text-[10px] text-blue-400 uppercase tracking-wider block px-2 py-1 font-semibold">
                Ações Rápidas de Vendas (Mais Acessadas)
              </span>

              {[
                {
                  title: "Nova Venda / Balcão Rápido",
                  desc: "Abrir tela de orçamento com leitor de código de barras",
                  shortcut: "Ctrl + N",
                  active: true,
                },
                {
                  title: "Consultar Compatibilidade por Placa",
                  desc: "Buscar catálogo técnico vinculado à base FIPE",
                  shortcut: "F6",
                  active: false,
                },
                {
                  title: "Painel de Saída & Separação de Mercadorias",
                  desc: "Acompanhar pedidos prontos para entrega ao cliente",
                  shortcut: "Alt + S",
                  active: false,
                },
                {
                  title: "Relatório de Vendas por Vendedor",
                  desc: "Faturamento diário, comissão e margem de contribuição",
                  shortcut: "Ctrl + R",
                  active: false,
                },
                {
                  title: "Devolução de Peças & Troca com Garantia",
                  desc: "Localizar cupom fiscal anterior para estorno de estoque",
                  shortcut: "Alt + D",
                  active: false,
                },
              ].map((cmd, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2.5 rounded-sm cursor-pointer transition-colors ${
                    cmd.active
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div>
                    <span className="font-semibold block text-white">{cmd.title}</span>
                    <span className={`text-[10px] ${cmd.active ? "text-blue-100" : "text-slate-500"}`}>
                      {cmd.desc}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] rounded-sm font-mono ${
                      cmd.active
                        ? "bg-blue-700 text-white"
                        : "bg-slate-950 border border-slate-700 text-slate-300"
                    }`}
                  >
                    {cmd.shortcut}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Info Strip */}
      <div className="px-6 py-3 border-t border-slate-800/80 bg-[#0d1424] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>Alfa ERP 2.0 // Redesign Real Comparado com os Prints de Campo</span>
        </div>
        <div>
          <span className="text-blue-400 font-medium">Design System Automotivo • Ergonomia Zero-Mouse</span>
        </div>
      </div>
    </div>
  );
}
