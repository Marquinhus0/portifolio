"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Search,
  Filter,
  Check,
  ChevronRight,
  ChevronDown,
  Building2,
  ShoppingCart,
  Package,
  DollarSign,
  FileText,
  Sliders,
  Maximize2,
  Minimize2,
  Eye,
  SlidersHorizontal,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Download,
  Plus,
  MoreVertical,
  X,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Zap,
  BarChart3,
  Truck,
  RotateCcw,
  Boxes,
  Users,
  AlertCircle,
  FileCheck,
  FolderGit2,
  Cpu,
  Monitor,
  LayoutGrid,
  Columns,
  Table,
} from "lucide-react";
import { CaseStudy } from "@/types";
import AlfaErpWorkspace from "./AlfaErpWorkspace";

interface AlfaErpCaseStudyProps {
  caseStudy: CaseStudy;
  nextCase: CaseStudy;
  prevCase: CaseStudy;
}

export default function AlfaErpCaseStudy({
  caseStudy,
  nextCase,
  prevCase,
}: AlfaErpCaseStudyProps) {
  // Navigation active state
  const [activeNav, setActiveNav] = useState("overview");
  const [heroVisualMode, setHeroVisualMode] = useState<"redesign" | "legacy">("redesign");

  // Lightbox modal state for reviewing source screenshots
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    domain: string;
    notes: string;
  } | null>(null);

  // Selected module for the Redesign Explorer
  const [activeModule, setActiveModule] = useState<
    | "sugestao"
    | "item"
    | "pessoa"
    | "vendas"
    | "cotacao"
    | "estoque"
    | "xml"
    | "financeiro"
    | "monitoramento"
    | "notas"
    | "ordem"
    | "devolucao"
  >("sugestao");

  // Before/After comparison screen
  const [compareScreen, setCompareScreen] = useState<
    "balcao" | "menu" | "fechamento" | "faturamento" | "sugestao" | "item" | "cotacao" | "fluxo"
  >("balcao");
  const [compareMode, setCompareMode] = useState<"sideBySide" | "splitSlider">("sideBySide");
  const [sliderPosition, setSliderPosition] = useState(50);

  // Interactive filter drawer state in Shell
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [activeFilterChips, setActiveFilterChips] = useState<string[]>([
    "Tipo: Peças de Ignição",
    "Estoque: Abaixo do Mínimo",
    "Marca: NGK",
  ]);

  // Interactive Table state
  const [tableDensity, setTableDensity] = useState<"compact" | "normal" | "spacious">("normal");
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({ 1: true });

  // Interactive Item tabs
  const [itemTab, setItemTab] = useState<
    "overview" | "cadastro" | "estoque" | "precos" | "fornecedores" | "historico" | "fiscal"
  >("overview");

  // Interactive Quotation supplier highlight
  const [selectedSupplier, setSelectedSupplier] = useState<number>(2);

  // Interactive XML import step
  const [xmlStep, setXmlStep] = useState<number>(4);

  // 20 Source Screenshots Registry
  const sourceScreenshots = [
    {
      id: "sugesta-compra",
      filename: "sugesta-compra.png",
      title: "Sugestão de Compra",
      module: "COMPRAS / ESTOQUE",
      description: "Cálculo de reposição por período, giro histórico, ponto de pedido e estoque mínimo.",
      issues: "25+ campos de filtro, ausência de cards de resumo de itens críticos, grid cru com 14 colunas.",
    },
    {
      id: "usuario-item-pesquisa",
      filename: "usuario-item-pesquisa.png",
      title: "Pesquisa de Itens & Usuários",
      module: "CADASTRO / BUSCA",
      description: "Localização de produtos por código, fabricante e permissões de operador.",
      issues: "Inputs sem validação visual inline, botões pequenos e dispersos na barra superior.",
    },
    {
      id: "venda",
      filename: "venda.png",
      title: "Vendas & Balcão de Peças",
      module: "VENDAS",
      description: "Atendimento presencial, conferência de estoque e orçamento com múltiplos itens.",
      issues: "Alta competição visual, ausência de identificação veicular direta e botões de atalho pouco destacados.",
    },
    {
      id: "cadastro-cotacao",
      filename: "cadastro-cotacao.png",
      title: "Cadastro de Cotação",
      module: "COTAÇÕES",
      description: "Abertura de lote para aquisição de peças junto a múltiplos distribuidores.",
      issues: "Formulário sequencial denso, mistura de dados cadastrais com regras de frete e pagamento.",
    },
    {
      id: "cadastro-item",
      filename: "cadastro-item.png",
      title: "Cadastro de Item (Ficha Técnica)",
      module: "CADASTRO",
      description: "Ficha cadastral completa com dados fiscais, NCM, GTIN, conversão e aplicação.",
      issues: "Todos os campos exibidos simultaneamente sem progressive disclosure ou abas funcionais.",
    },
    {
      id: "cadastro-pessoa",
      filename: "cadastro-pessoa.png",
      title: "Cadastro de Pessoa (Cliente / Fornecedor)",
      module: "CADASTRO",
      description: "Registro de pessoa física/jurídica, inscrição estadual, regime tributário e contatos.",
      issues: "Formulário vertical único sem agrupamento em cards de contexto e sem status comercial rápido.",
    },
    {
      id: "consulta-item-saldo",
      filename: "consulta-item-saldo.png",
      title: "Consulta de Saldo de Estoque",
      module: "ESTOQUE",
      description: "Verificação de saldo físico, quantidade reservada, em conferência e saldo disponível.",
      issues: "Tabela sem distinção clara entre saldo físico e disponível, ausência de filtros rápidos por filial.",
    },
    {
      id: "cotacao",
      filename: "cotacao.png",
      title: "Painel Geral de Cotações",
      module: "COTAÇÕES",
      description: "Listagem de processos de cotação em andamento, vencidos e confirmados.",
      issues: "Status comunicados por ícones muito reduzidos sem rótulo textual de fácil escaneamento.",
    },
    {
      id: "cotacao-fornecedor",
      filename: "cotacao-fornecedor.png",
      title: "Comparação de Fornecedores",
      module: "COTAÇÕES",
      description: "Matriz comparativa de propostas de preço, prazo de entrega e condições comerciais.",
      issues: "Dificuldade em identificar de imediato a melhor oferta por item sem calcular manualmente.",
    },
    {
      id: "devolucao",
      filename: "devolucao.png",
      title: "Devoluções de Mercadoria",
      module: "VENDAS / ESTOQUE",
      description: "Registro de estorno de peças vendidas, motivo da troca e devolução fiscal.",
      issues: "Muitas colunas operacionais sem agrupamento de status (Aprovada, Pendente de Inspeção).",
    },
    {
      id: "estatistica",
      filename: "estatistica.png",
      title: "Estatística de Vendas & Giro",
      module: "RELATÓRIOS / FINANCEIRO",
      description: "Indicadores de giro de produtos, curva ABC e histórico sazonal de saída.",
      issues: "Visualização puramente tabular sem gráficos de tendência ou destaque para curvas A e B.",
    },
    {
      id: "fechamento-pedido",
      filename: "fechamento-pedido.png",
      title: "Fechamento de Pedido",
      module: "VENDAS",
      description: "Seleção de condições de pagamento, frete, alçadas de desconto e emissão fiscal.",
      issues: "Campos de valor e desconto com hierarquia visual similar, gerando risco de erro operacional.",
    },
    {
      id: "fluxo-caixa",
      filename: "fluxo-caixa.png",
      title: "Fluxo de Caixa",
      module: "FINANCEIRO",
      description: "Projeção de entradas e saídas diárias, saldo bancário e conciliação financeira.",
      issues: "Planilha crua sem distinção cromática clara entre receitas realizadas e despesas previstas.",
    },
    {
      id: "importacao-xml",
      filename: "importacao-xml.png",
      title: "Importação de XML de NF-e",
      module: "COMPRAS / FISCAL",
      description: "Entrada de nota fiscal de fornecedor com conferência de itens e tributação.",
      issues: "Processo em tela única com sobrecarga de tabelas cruzadas sem assistente guiado em etapas.",
    },
    {
      id: "item",
      filename: "item.png",
      title: "Consulta Geral de Itens",
      module: "ESTOQUE / CADASTRO",
      description: "Catálogo completo de peças cadastradas com códigos de fábrica e referências.",
      issues: "Grid saturado com 16 colunas sem ordenação visual clara e sem agrupamento por categoria.",
    },
    {
      id: "monitor-administrativo",
      filename: "monitor-administrativo.png",
      title: "Monitor Administrativo",
      module: "CRM / GESTÃO",
      description: "Painel de controle com resumo de compras, vendas, pendências e alertas de filiais.",
      issues: "Muitos blocos de informação concorrendo sem priorização executiva dos pontos críticos.",
    },
    {
      id: "nota",
      filename: "nota.png",
      title: "Documentos Fiscais (Notas Emitidas)",
      module: "DOCUMENTOS / FISCAL",
      description: "Listagem de NF-e, NFC-e, cartas de correção e status de autorização na SEFAZ.",
      issues: "Status fiscal dependente de códigos numéricos sem tags semânticas coloridas de fácil leitura.",
    },
    {
      id: "ordem-compra",
      filename: "ordem-compra.png",
      title: "Ordem de Compra",
      module: "COMPRAS",
      description: "Formalização do pedido de compra junto ao distribuidor após aprovação de cotação.",
      issues: "Layout denso que mescla dados de entrega, tributos e lista de peças em um único bloco visual.",
    },
    {
      id: "parcela",
      filename: "parcela.png",
      title: "Contas a Pagar & Receber (Parcelas)",
      module: "FINANCEIRO",
      description: "Acompanhamento de vencimentos, liquidações, juros e conciliação de duplicatas.",
      issues: "Datas e valores sem hierarquia tipográfica, dificultando identificar parcelas vencidas.",
    },
    {
      id: "pedido-consulta",
      filename: "pedido-consulta.png",
      title: "Consulta de Pedidos de Venda",
      module: "VENDAS",
      description: "Histórico de orçamentos gerados, pedidos faturados e cancelamentos por cliente.",
      issues: "Filtros de data e vendedor dispersos, sem paginação clara e sem busca rápida por número.",
    },
    {
      id: "legacy-balcao",
      filename: "legacy-balcao.png",
      title: "Balcão de Venda Original",
      module: "VENDAS / PDV",
      description: "Tela de operação presencial com busca de peças, 16 micro-ícones de ação e emissão de cupom.",
      issues: "Barra com 9 inputs dispersos, ausência de validação de placa Mercosul e ícones sem rótulos legíveis.",
    },
    {
      id: "legacy-menu",
      filename: "legacy-menu.png",
      title: "Topbar & Menu Horizontal do Legado",
      module: "ARQUITETURA",
      description: "Barra superior com 14 módulos, busca global, contador de sessão e mega-menu cascata.",
      issues: "Dropdowns concorrentes sem categorização em colunas semânticas e busca global sem auto-complete.",
    },
    {
      id: "legacy-faturamento",
      filename: "legacy-faturamento.png",
      title: "Matriz Contábil de Faturamento",
      module: "FATURAMENTO / FISCAL",
      description: "Tabela com 18 colunas de saídas por mês/ano, vendedor, cliente, margem bruta e descontos.",
      issues: "Densidade pura de planilha sem cards de KPI executivo, curvas de faturamento ou destaque para margem líquida.",
    },
    {
      id: "legacy-login",
      filename: "legacy-login.png",
      title: "Tela de Autenticação Legada",
      module: "SISTEMA",
      description: "Acesso de operador com seleção de filial, banco de dados e credenciais.",
      issues: "Formulário cinza utilitário sem feedback visual de conexão com a SEFAZ ou filiais ativas.",
    },
  ];

  // 10 Observable Product Areas
  const productAreas = [
    { name: "VENDAS", icon: ShoppingCart, screens: ["venda.png", "fechamento-pedido.png", "pedido-consulta.png"], desc: "Atendimento balcão, orçamentos, pedidos faturados e devoluções." },
    { name: "COMPRAS", icon: Truck, screens: ["ordem-compra.png", "sugesta-compra.png"], desc: "Ordens de compra, giro histórico e reposição por ponto de pedido." },
    { name: "ESTOQUE", icon: Boxes, screens: ["consulta-item-saldo.png", "item.png"], desc: "Saldo multiloja, rastreabilidade física e endereçamento de peças." },
    { name: "CADASTRO", icon: Users, screens: ["cadastro-item.png", "cadastro-pessoa.png"], desc: "Peças, fornecedores, clientes, tabela de conversão e regras fiscais." },
    { name: "COTAÇÕES", icon: BarChart3, screens: ["cadastro-cotacao.png", "cotacao.png", "cotacao-fornecedor.png"], desc: "Lotes de cotação, comparação multilateral de preços e prazos." },
    { name: "FINANCEIRO", icon: DollarSign, screens: ["fluxo-caixa.png", "parcela.png", "estatistica.png"], desc: "Contas a pagar/receber, conciliação bancária e projeção de caixa." },
    { name: "DOCUMENTOS", icon: FileText, screens: ["nota.png"], desc: "Emissão de NF-e, NFC-e, contingência SEFAZ e cartas de correção." },
    { name: "RELATÓRIOS", icon: BarChart3, screens: ["estatistica.png"], desc: "Curva ABC, faturamento por marca e giro de estoque por filial." },
    { name: "CRM", icon: Monitor, screens: ["monitor-administrativo.png"], desc: "Visão executiva de filiais, ticket médio e pendências de clientes." },
    { name: "IMPORTAÇÃO XML", icon: FolderGit2, screens: ["importacao-xml.png"], desc: "Manifestação de destinatário, conferência cega e entrada de NF-e." },
  ];

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <article className="min-h-screen bg-[#080808] text-neutral-200 font-sans selection:bg-[#1683D8] selection:text-white">
      {/* ========================================================================= */}
      {/* 42. PORTFOLIO TOP INTEGRATION STRIP                                      */}
      {/* ========================================================================= */}
      <header className="border-b border-neutral-800 bg-[#080808]/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>VOLTAR PARA WORK</span>
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-white font-medium">MARCUS RITTA</span>
            <span className="text-neutral-600">/</span>
            <span className="text-[#1683D8] font-semibold">PRODUCT DESIGNER</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5 rounded-sm font-semibold tracking-wider">
              REAL PRODUCT
            </span>
            <span className="text-neutral-400">CASE 01 / ALFA ERP</span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 40. STICKY CASE NAVIGATION BAR                                           */}
      {/* ========================================================================= */}
      <nav className="border-b border-neutral-800 bg-[#080808]/95 sticky top-[45px] z-40 backdrop-blur-sm overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-1 text-[11px] font-mono whitespace-nowrap">
          {[
            { id: "overview", label: "01. Overview" },
            { id: "contexto", label: "02. Contexto" },
            { id: "complexidade", label: "03. Complexidade" },
            { id: "evidencias", label: "04. 20 Telas Reais" },
            { id: "auditoria", label: "05. Auditoria de UX" },
            { id: "desafio", label: "06. O Desafio" },
            { id: "arquitetura", label: "07. Arquitetura" },
            { id: "shell", label: "08. Shell ERP" },
            { id: "modulos", label: "09. Redesign Módulos" },
            { id: "comparativo", label: "10. Antes vs Depois" },
            { id: "designsystem", label: "11. Design System" },
            { id: "acessibilidade", label: "12. Acessibilidade" },
            { id: "qa", label: "13. Design QA" },
            { id: "papel", label: "14. Papel & Aprendizados" },
            { id: "resultados", label: "15. Resultados" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-2.5 py-1 rounded-sm transition-all ${
                activeNav === item.id
                  ? "bg-[#13E1BC] text-[#080808] font-bold shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 01 & 02. CASE POSITIONING & EDITORIAL HERO                                */}
      {/* ========================================================================= */}
      <section id="overview" className="pt-14 pb-0 border-b border-neutral-800 bg-[#080808] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">

          {/* ── SPLIT HERO ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[420px]">

            {/* Left Column – Editorial Copy */}
            <div className="py-14 pr-0 lg:pr-12 space-y-8 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-1 text-[10px] font-mono font-black tracking-widest uppercase bg-[#13E1BC]/15 border border-[#13E1BC]/40 text-[#13E1BC] rounded-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC] animate-pulse" />
                    REAL PRODUCT
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase border border-neutral-700 text-neutral-400 rounded-sm">
                    B2B SaaS · ERP · AUTO PARTS
                  </span>
                </div>

                <div>
                  <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-white leading-[0.9] font-mono">
                    ALFA
                  </h1>
                  <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] font-mono" style={{ color: "#13E1BC" }}>
                    ERP
                  </h1>
                </div>

                <p className="text-base text-neutral-300 leading-relaxed font-sans max-w-md">
                  Redesigning complex B2B workflows for an ERP specialized in Auto Parts — transformando a complexidade operacional em experiências claras, previsíveis e eficientes.
                </p>
              </div>

              {/* Quick role tags */}
              <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                {["Product Designer", "UX Discovery", "Design System", "UX QA", "Automotive Aftermarket"].map(t => (
                  <span key={t} className="px-2.5 py-1 border border-neutral-700 text-neutral-400 rounded-sm bg-neutral-900/40">{t}</span>
                ))}
              </div>
            </div>

            {/* Right Column – Impact Numbers */}
            <div className="hidden lg:grid grid-rows-2 grid-cols-2 gap-px bg-neutral-800 border-l border-neutral-800">
              <div className="bg-[#080808] p-8 flex flex-col justify-between hover:bg-[#13E1BC]/5 transition-colors group">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Módulos redesenhados</span>
                <div>
                  <span className="text-5xl font-black font-mono text-white group-hover:text-[#13E1BC] transition-colors">10+</span>
                  <span className="block text-xs font-mono text-neutral-400 mt-1">Vendas, Compras, Estoque, Financeiro...</span>
                </div>
              </div>
              <div className="bg-[#080808] p-8 flex flex-col justify-between hover:bg-[#13E1BC]/5 transition-colors group">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Telas auditadas em produção</span>
                <div>
                  <span className="text-5xl font-black font-mono text-white group-hover:text-[#13E1BC] transition-colors">20+</span>
                  <span className="block text-xs font-mono text-neutral-400 mt-1">Evidências visuais reais do sistema</span>
                </div>
              </div>
              <div className="bg-[#080808] p-8 flex flex-col justify-between hover:bg-[#13E1BC]/5 transition-colors group">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Heurísticas mapeadas</span>
                <div>
                  <span className="text-5xl font-black font-mono text-white group-hover:text-[#13E1BC] transition-colors">47</span>
                  <span className="block text-xs font-mono text-neutral-400 mt-1">Problemas de UX identificados</span>
                </div>
              </div>
              <div className="bg-[#080808] p-8 flex flex-col justify-between hover:bg-[#13E1BC]/5 transition-colors group">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Produto real em produção</span>
                <div>
                  <span className="text-5xl font-black font-mono" style={{ color: "#13E1BC" }}>B2B</span>
                  <span className="block text-xs font-mono text-neutral-400 mt-1">SaaS · AutoPeças Aftermarket</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── MOBILE IMPACT STRIP ──────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-neutral-800 border-t border-neutral-800 lg:hidden">
            {[
              { num: "10+", label: "Módulos" },
              { num: "20+", label: "Telas Auditadas" },
              { num: "47", label: "Heurísticas" },
              { num: "B2B", label: "SaaS Real" },
            ].map(s => (
              <div key={s.num} className="bg-[#080808] p-4 space-y-1">
                <span className="text-2xl font-black font-mono text-white block">{s.num}</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── SCOPE DISCLAIMER ─────────────────────────────────────── */}
          <div className="py-5 border-t border-neutral-800 text-xs font-mono text-neutral-400 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#13E1BC] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Escopo &amp; Atuação Profissional: </strong>
              Atuação direta na evolução de interface de um ecossistema existente de ERP corporativo, redesenhando fluxos críticos de alta densidade, estruturando o design system B2B e conduzindo a governança de UX QA com o time de engenharia.
            </div>
          </div>

        </div>
      </section>
      {/* ========================================================================= */}
      {/* 03. VISUAL HERO BANNER: REDESIGN SAAS 2024 vs LEGACY PRODUÇÃO             */}
      {/* ========================================================================= */}
      <section className="border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1683D8] animate-pulse"></span>
                <span className="text-white font-bold uppercase tracking-wider">
                  {heroVisualMode === "redesign"
                    ? "Artefato Visual: Redesign da Interface // Cockpit Operacional 2024"
                    : "Artefato Visual: Sistema Legado em Produção // Sugestão de Compra"}
                </span>
              </div>

              {/* Redesign vs Legacy Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-sm">
                <button
                  onClick={() => setHeroVisualMode("redesign")}
                  className={`px-3 py-1 rounded-sm text-xs font-mono font-medium transition-all ${
                    heroVisualMode === "redesign"
                      ? "bg-[#1683D8] text-white shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  ✨ Protótipo Redesenhado
                </button>
                <button
                  onClick={() => setHeroVisualMode("legacy")}
                  className={`px-3 py-1 rounded-sm text-xs font-mono font-medium transition-all ${
                    heroVisualMode === "legacy"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  🏛 Sistema Legado
                </button>
              </div>
            </div>

            {/* Editorial Application Window Frame */}
            <div className="relative border border-neutral-800 bg-[#070b14] rounded-sm shadow-2xl overflow-hidden group">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-neutral-300 text-[11px] ml-2 font-medium">
                    {heroVisualMode === "redesign"
                      ? "ALFA ERP 2024 // Cockpit Unificado de Vendas, Estoque e Balcão [SaaS Redesign]"
                      : "ALFA ERP — Módulo de Compras & Sugestão de Reposição [Produção Legada]"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                  <span className="hidden sm:inline">1920x1080 Full HD</span>
                  <span className="px-2 py-0.5 bg-blue-950 border border-blue-800 text-blue-300 rounded font-semibold">
                    {heroVisualMode === "redesign" ? "PROTÓTIPO DE ALTA FIDELIDADE" : "LEGACY AUDIT"}
                  </span>
                </div>
              </div>

              {heroVisualMode === "redesign" ? (
                /* REDESIGN HERO BANNER VISUAL */
                <div className="relative aspect-[16/9] w-full bg-neutral-950 overflow-hidden group/hero">
                  <Image
                    src="/cases/alfa-erp-cover.jpg"
                    alt="Protótipo de alta fidelidade redesenhado do ALFA ERP AutoPeças"
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover/hero:scale-[1.02]"
                    priority
                  />
                  {/* Subtle glass badges over image */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 text-white text-[11px] font-mono flex items-center gap-2 shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ALFA ERP // Catálogo Inteligente &amp; PDV Balcão [Redesign 2024]</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-blue-950/80 backdrop-blur-md px-3 py-1.5 rounded border border-blue-600/50 text-blue-200 text-[11px] font-mono shadow-xl hidden sm:flex items-center gap-1.5">
                    <span>Zero-Mouse Workflow • Validação de Motor por Placa • Catálogo Visual</span>
                  </div>
                </div>
              ) : (
                /* LEGACY SCREENSHOT VISUAL */
                <div className="relative aspect-[16/9] w-full bg-black">
                  <Image
                    src="/projects/alfa-erp/sugesta-compra.png"
                    alt="Tela existente em produção do módulo de Sugestão de Compra do ALFA ERP"
                    fill
                    className="object-contain p-2"
                    priority
                  />

                  {/* Editorial Annotation Markers */}
                  <div className="absolute top-[18%] left-[24%] bg-[#1683D8]/90 text-white text-[10px] font-mono px-2 py-1 rounded shadow-md border border-white/20 backdrop-blur-sm hidden sm:flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span>01. 12+ Grupos de Filtros Simultâneos</span>
                  </div>

                  <div className="absolute top-[48%] left-[45%] bg-[#1683D8]/90 text-white text-[10px] font-mono px-2 py-1 rounded shadow-md border border-white/20 backdrop-blur-sm hidden sm:flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span>02. Tabela de 14 Colunas Operacionais</span>
                  </div>

                  <div className="absolute bottom-[12%] right-[10%] bg-[#0F5F9E]/90 text-white text-[10px] font-mono px-2 py-1 rounded shadow-md border border-white/20 backdrop-blur-sm hidden sm:flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>03. Ações e Status Operacionais</span>
                  </div>
                </div>
              )}

              {/* Caption Framing */}
              <div className="p-4 bg-neutral-900/90 border-t border-neutral-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-neutral-400">
                <p>
                  <strong className="text-white">
                    {heroVisualMode === "redesign" ? "Direção do Redesign: " : "Diagnóstico do Legado: "}
                  </strong>
                  {heroVisualMode === "redesign"
                    ? "Interface reestruturada com densidade informativa equilibrada, atalhos de alta velocidade, validação de placa veicular e visão multilateral de saldo."
                    : "Sistema corporativo construído ao longo dos anos para ampla cobertura operacional, acumulando dezenas de filtros desordenados e tabelas densas sem hierarquia visual."}
                </p>
                {heroVisualMode === "legacy" && (
                  <button
                    onClick={() =>
                      setLightboxImage({
                        src: "/projects/alfa-erp/sugesta-compra.png",
                        title: "Sugestão de Compra (Print de Produção)",
                        domain: "COMPRAS & REPOSIÇÃO",
                        notes: "Observe a quantidade de filtros e a densidade de dados necessária para calcular a reposição de estoque.",
                      })
                    }
                    className="text-[#1683D8] hover:text-white font-semibold flex items-center gap-1 shrink-0"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Inspecionar em Alta Resolução</span>
                  </button>
                )}
              </div>
            </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. CONTEXTO & VISUAL MAP OF MODULES                                      */}
      {/* ========================================================================= */}
      <section id="contexto" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-widest font-semibold block">
              04 — CONTEXTO OPERACIONAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              &ldquo;Um produto que precisa lidar com complexidade real.&rdquo;
            </h2>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              O ALFA ERP atende operações do setor de AutoPeças e concentra diferentes processos operacionais em um único sistema: vendas de balcão, ordens de compra, reposição de estoque, cadastros de peças e clientes, cotações com distribuidores, fechamento financeiro e emissão fiscal.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-800 pb-2">
              <span className="text-neutral-400 font-bold uppercase tracking-wider">
                Mapeamento das 10 Áreas Funcionais Evidenciadas nos Prints Reais:
              </span>
              <span className="text-neutral-500">10 Módulos Integrados</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
              {productAreas.map((area, idx) => {
                const AreaIcon = area.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 bg-[#0e0e10] border border-neutral-800 border-l-2 border-l-[#13E1BC]/40 hover:border-l-[#13E1BC] hover:bg-[#13E1BC]/5 transition-all space-y-3 group cursor-default"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-neutral-500 font-bold">0{idx + 1}</span>
                      <AreaIcon className="w-4 h-4 text-[#13E1BC] group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-bold text-white text-xs tracking-tight group-hover:text-[#13E1BC] transition-colors">{area.name}</h3>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">{area.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. THE PRODUCT COMPLEXITY                                               */}
      {/* ========================================================================= */}
      <section id="complexidade" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-widest font-semibold block">
              05 — A REALIDADE DO SOFTWARE ENTERPRISE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              &ldquo;A complexidade não está apenas na interface.&rdquo;
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Sistemas de gestão empresarial precisam suportar fluxos de trabalho intensos, onde dezenas de variáveis operacionais afetam a tomada de decisão a cada segundo. A densidade da interface reflete a densidade das regras de negócio do mercado de autopeças.
            </p>
          </div>

          {/* 12 Observable Characteristics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {[
              {
                title: "Grandes Volumes de Dados",
                desc: "Milhares de SKUs com códigos de fabricantes concorrentes, aplicações por modelo/ano e referências cruzadas.",
              },
              {
                title: "Múltiplos Grupos de Filtros",
                desc: "Pesquisas simultâneas combinando marca, montadora, período, filial, localização de prateleira e saldo físico.",
              },
              {
                title: "Regras de Negócio e Alçadas",
                desc: "Percentuais de desconto condicionados a perfil de cliente, margem mínima por marca e alçadas de gerência.",
              },
              {
                title: "Múltiplos Estados Operacionais",
                desc: "Estoque físico dividido entre saldo disponível, saldo reservado para orçamentos e itens em conferência de entrada.",
              },
              {
                title: "Fluxo Financeiro & Duplicatas",
                desc: "Prazos de pagamento parcelados, cálculo de juros, conciliação de fluxo de caixa e controle de inadimplência.",
              },
              {
                title: "Relações entre Produtos",
                desc: "Peças complementares (ex: velas e cabos de ignição), kits de embreagem e itens equivalentes de outras marcas.",
              },
              {
                title: "Cotações com Múltiplos Fornecedores",
                desc: "Comparação multilateral de lotes de reposição entre distribuidores com preços e prazos de entrega distintos.",
              },
              {
                title: "Documentos Fiscais Rígidos",
                desc: "Emissão de NF-e, NFC-e, cálculo de substituição tributária (ST), ICMS e manifestação eletrônica de destinatário.",
              },
              {
                title: "Diferentes Contextos de Uso",
                desc: "Operadores com dinâmicas contrastantes: balcão presencial sob pressão de tempo vs compras com análise analítica.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 bg-[#0e0e10] border border-neutral-800 border-l-2 border-l-[#13E1BC]/30 hover:border-l-[#13E1BC] hover:bg-[#13E1BC]/5 transition-all space-y-2 group"
              >
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#13E1BC] shrink-0" />
                  <span className="font-bold text-white text-xs group-hover:text-[#13E1BC] transition-colors">{item.title}</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. SOURCE SCREENSHOTS GALLERY (AS 20 TELAS REAIS)                        */}
      {/* ========================================================================= */}
      <section id="evidencias" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
                06 — EVIDÊNCIAS VISUAIS DO SISTEMA
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Galeria das 20 Telas Reais do ALFA ERP
              </h2>
              <p className="text-sm text-neutral-300 font-normal">
                Todas as telas abaixo são capturas autênticas de produção do sistema ALFA ERP, utilizadas como fonte primária para auditoria heurística, mapeamento de fluxos e exploração do redesign.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 border border-neutral-800 rounded-sm">
              Clique em qualquer tela para inspecionar
            </div>
          </div>

          {/* 20 Screens Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 font-mono text-xs">
            {sourceScreenshots.map((item, idx) => (
              <div
                key={idx}
                onClick={() =>
                  setLightboxImage({
                    src: `/projects/alfa-erp/${item.filename}`,
                    title: item.title,
                    domain: item.module,
                    notes: item.description,
                  })
                }
                className="group cursor-pointer bg-neutral-900/50 border border-neutral-800 rounded-sm overflow-hidden hover:border-[#1683D8] transition-all flex flex-col justify-between shadow-md"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] w-full bg-black overflow-hidden border-b border-neutral-800">
                    <Image
                      src={`/projects/alfa-erp/${item.filename}`}
                      alt={item.title}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-[9px] px-1.5 py-0.5 rounded text-neutral-300 flex items-center gap-1">
                      <Maximize2 className="w-2.5 h-2.5" />
                      <span>Zoom</span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-3 space-y-1">
                    <span className="text-[10px] text-[#1683D8] font-bold block">{item.module}</span>
                    <h3 className="font-bold text-white text-xs truncate">{item.title}</h3>
                    <p className="text-[11px] text-neutral-400 font-sans line-clamp-2">{item.description}</p>
                  </div>
                </div>

                <div className="px-3 py-1.5 bg-neutral-950 border-t border-neutral-800 text-[10px] text-neutral-500 truncate">
                  {item.filename}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 & 08. PRODUCT AUDIT & BEFORE OBSERVATIONS                              */}
      {/* ========================================================================= */}
      <section id="auditoria" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
              07 — AUDITORIA DO PRODUTO & DIAGNÓSTICO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              &ldquo;Antes de desenhar, eu precisava entender o sistema.&rdquo;
            </h2>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              A auditoria não tratou o sistema legado como um erro de design, mas sim como uma interface que priorizou densidade de dados e cobertura funcional exaustiva ao longo de anos de regras acumuladas.
            </p>
          </div>

          {/* 6 Observable Design Observations (Section 08) */}
          <div className="space-y-4">
            <div className="text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-2">
              <strong className="text-white">Diagnóstico Heurístico: </strong>
              6 Características Observadas nas Telas de Produção
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              {[
                {
                  num: "01",
                  title: "HIGH INFORMATION DENSITY",
                  obs: "A quantidade de elementos competindo simultaneamente pela atenção cria uma oportunidade direta para melhorar hierarquia e orientação visual.",
                  impact: "Sem hierarquia clara, operadores levam mais tempo para isolar os dados prioritários.",
                },
                {
                  num: "02",
                  title: "MULTIPLE FILTER GROUPS",
                  obs: "Mais de 10 campos de filtro dispostos em uma única faixa horizontal geram sobrecarga e exigem esforço de escaneamento.",
                  impact: "Oportunidade para filtros em gaveta (drawer), chips rápidos de 1 clique e visualizações salvas.",
                },
                {
                  num: "03",
                  title: "DENSE DATA TABLES",
                  obs: "Tabelas com 14 a 18 colunas sem destaque tipográfico para os valores de decisão (preço, saldo e margem).",
                  impact: "Necessidade de cabeçalhos fixos, zebrado sutil, ordenação dinâmica e detalhes expansíveis.",
                },
                {
                  num: "04",
                  title: "MULTIPLE ACTION ICONS",
                  obs: "Muitos botões pequenos com ícones genéricos agrupados em barras de ferramentas sem rótulos textuais claros.",
                  impact: "Risco de cliques acidentais e dependência de memorização das ferramentas pelos operadores.",
                },
                {
                  num: "05",
                  title: "LONG FORM STRUCTURES",
                  obs: "Formulários verticais extensos nos cadastros de peças e pessoas com mais de 30 campos expostos de uma só vez.",
                  impact: "Oportunidade para agrupamento em abas contextuais e uso de progressive disclosure.",
                },
                {
                  num: "06",
                  title: "LOW VISUAL PRIORITIZATION",
                  obs: "Valores monetários, códigos técnicos e status fiscais dividindo o mesmo peso visual na tela.",
                  impact: "Aumento do esforço cognitivo durante horários de pico e atendimentos telefônicos acelerados.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between text-[#1683D8]">
                    <span className="text-xl font-bold font-mono">{item.num}</span>
                    <span className="text-[10px] bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">
                      Observação de Design
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                  <p className="text-neutral-300 text-xs font-sans leading-relaxed">{item.obs}</p>
                  <div className="pt-2 border-t border-neutral-800 text-[11px] text-[#1683D8] font-sans">
                    <strong>Direcionamento: </strong>
                    {item.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09 & 10. THE DESIGN CHALLENGE & 5 PRINCIPLES                              */}
      {/* ========================================================================= */}
      <section id="desafio" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          {/* Section 09: The Trilemma Challenge */}
          <div className="space-y-6 max-w-4xl">
            <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
              09 — O DESAFIO DE PRODUTO
            </span>
            <div className="p-8 border-l-4 border-emerald-500 bg-neutral-900/60 border-y border-r border-neutral-800 rounded-r-sm space-y-4 shadow-xl">
              <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                DECLARAÇÃO DO DESAFIO CENTRAL
              </h3>
              <p className="text-xl sm:text-2xl text-white font-light leading-relaxed">
                &ldquo;Como evoluir a experiência de um ERP que precisa preservar regras, dados e operações complexas, sem transformar o produto em uma interface simplificada demais para quem depende dessas informações?&rdquo;
              </p>
            </div>

            {/* The 3 Trilemma Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono text-xs">
              <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
                <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold block">
                  BUSINESS
                </span>
                <h4 className="text-base font-bold text-white">Preservar Regras e Operações</h4>
                <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                  Não é viável remover campos que atendem a exigências tributárias, regras de substituição fiscal ou fluxos consolidados de faturamento.
                </p>
              </div>

              <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block">
                  USER
                </span>
                <h4 className="text-base font-bold text-white">Reduzir Esforço Cognitivo</h4>
                <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                  Melhorar a orientação espacial, agrupar filtros e destacar informações críticas para tomada de decisão no primeiro olhar.
                </p>
              </div>

              <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold block">
                  TECHNOLOGY
                </span>
                <h4 className="text-base font-bold text-white">Soluções Viáveis de Implementar</h4>
                <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                  Desenhar componentes consistentes e reutilizáveis, garantindo que a equipe de engenharia consiga implementar sem reescrever todo o backend.
                </p>
              </div>
            </div>
          </div>

          {/* Section 10: 5 Redesign Principles */}
          <div className="space-y-6 pt-6 border-t border-neutral-800">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
                10 — PRINCÍPIOS DE REDESIGN
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Diretrizes Estruturais para o Redesign
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-mono text-xs">
              {[
                {
                  num: "01",
                  title: "Hierarquia Antes de Decoração",
                  desc: "Organizar a informação por importância operacional e contexto de uso, e não por estética puramente minimalista.",
                },
                {
                  num: "02",
                  title: "Progressive Disclosure",
                  desc: "Mostrar primeiro o que é estritamente necessário para agir, permitindo aprofundamento por abas ou gavetas.",
                },
                {
                  num: "03",
                  title: "Consistência de Padrões",
                  desc: "Criar padrões padronizados para tabelas, filtros, formulários, estados de erro e ações em todos os módulos.",
                },
                {
                  num: "04",
                  title: "Contexto no Momento da Decisão",
                  desc: "Apresentar dados relevantes (ex: saldo externo, preço concorrente) exatamente ao lado da ação que depende deles.",
                },
                {
                  num: "05",
                  title: "Densidade Controlada",
                  desc: "Manter a alta produtividade operacional sem transformar a tela em uma massa indistinta de campos.",
                },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2 hover:border-[#1683D8] transition-colors"
                >
                  <span className="text-xl font-bold text-[#1683D8] block font-mono">{p.num}</span>
                  <h4 className="font-bold text-white text-xs">{p.title}</h4>
                  <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. INFORMATION ARCHITECTURE                                              */}
      {/* ========================================================================= */}
      <section id="arquitetura" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
              11 — ARQUITETURA DA INFORMAÇÃO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Reestruturação Funcional dos Módulos do ERP
            </h2>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              A arquitetura foi reorganizada a partir dos fluxos operacionais evidenciados nos prints reais, agrupando dezenas de telas isoladas em 6 domínios coerentes de operação e decisão.
            </p>
          </div>

          {/* Visual IA Tree */}
          <div className="p-8 bg-neutral-950 border border-neutral-800 rounded-sm font-mono text-xs overflow-x-auto shadow-xl">
            <div className="flex items-center space-x-2 text-sm text-[#1683D8] font-bold pb-6 border-b border-neutral-800">
              <span className="px-2 py-0.5 bg-[#1683D8]/20 border border-[#1683D8]/40 rounded">ALFA ERP</span>
              <span className="text-neutral-500">// Arquitetura de Informação Reorganizada</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 pt-6">
              {/* Vendas */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-white font-bold text-sm border-b border-blue-900/50 pb-1.5">
                  <ShoppingCart className="w-3.5 h-3.5 text-[#1683D8]" />
                  <span>Vendas</span>
                </div>
                <ul className="space-y-2 text-neutral-400 text-xs">
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Pedidos de Venda</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Balcão de Peças</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Devoluções</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Fechamento</li>
                </ul>
              </div>

              {/* Compras */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-white font-bold text-sm border-b border-blue-900/50 pb-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#1683D8]" />
                  <span>Compras</span>
                </div>
                <ul className="space-y-2 text-neutral-400 text-xs">
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Ordem de Compra</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Cotação Fornecedores</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Sugestão de Compra</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Importação XML</li>
                </ul>
              </div>

              {/* Estoque */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-white font-bold text-sm border-b border-blue-900/50 pb-1.5">
                  <Boxes className="w-3.5 h-3.5 text-[#1683D8]" />
                  <span>Estoque</span>
                </div>
                <ul className="space-y-2 text-neutral-400 text-xs">
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Consulta de Saldo</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Catálogo de Itens</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Movimentações</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Endereçamento</li>
                </ul>
              </div>

              {/* Cadastros */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-white font-bold text-sm border-b border-blue-900/50 pb-1.5">
                  <Users className="w-3.5 h-3.5 text-[#1683D8]" />
                  <span>Cadastros</span>
                </div>
                <ul className="space-y-2 text-neutral-400 text-xs">
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Pessoas & Clientes</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Ficha de Item (SKU)</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Fornecedores</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Regras Fiscais</li>
                </ul>
              </div>

              {/* Financeiro */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-white font-bold text-sm border-b border-blue-900/50 pb-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#1683D8]" />
                  <span>Financeiro</span>
                </div>
                <ul className="space-y-2 text-neutral-400 text-xs">
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Fluxo de Caixa</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Parcelas a Pagar/Rec.</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Conciliação Bancária</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">DRE por Marca</li>
                </ul>
              </div>

              {/* Documentos & Gestão */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-white font-bold text-sm border-b border-blue-900/50 pb-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#1683D8]" />
                  <span>Documentos</span>
                </div>
                <ul className="space-y-2 text-neutral-400 text-xs">
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Notas Emitidas (NF-e)</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Monitor Administrativo</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Estatísticas de Giro</li>
                  <li className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">Auditoria Fiscal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12, 13, 14, 15. O ERP ALFA EM AÇÃO // LAYOUT INTERATIVO DE AUTOPEÇAS       */}
      {/* ========================================================================= */}
      <section id="shell" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold">
                12 & 13 — O ERP ALFA CLOUD // TRANSIÇÃO DO LEGADO PARA WEB MODERNA
              </span>
              <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                PROTÓTIPO CLOUD INTERATIVO
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              O Novo Alfa Cloud: Semelhante ao Legado Operacional, Moderno na Experiência Web
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              O protótipo interativo abaixo demonstra a evolução do software legado em Delphi/Windows para uma experiência <strong>100% Web em Nuvem (SaaS)</strong>. Mantivemos tudo o que os operadores de balcão amam pela velocidade (atalhos de teclado F1..F9, consulta por placa Mercosul com motorização, códigos OEM/fabricante, conversão cruzada e endereçamento físico de estoque), mas elevamos a interface com <strong>arquitetura multi-filial em nuvem</strong>, <strong>Command Palette global (Ctrl+K)</strong>, abas dinâmicas com contadores e integração SEFAZ em tempo real.
            </p>

            {/* Note on background color transition */}
            <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-sm text-xs font-mono text-neutral-400 flex items-start space-x-3">
              <Sparkles className="w-4 h-4 text-[#1683D8] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Experiência Web em Nuvem: </strong>
                O container do sistema abaixo simula o ambiente em nuvem ativo (com ping de latência AWS, multi-filial, alternância entre <strong>Modo Balcão Claro [#f8fafc]</strong> de alta legibilidade de balcão e <strong>Modo Cloud Slate [#0b1329]</strong>), permitindo testar a adição de itens, busca por placa e o fechamento de venda com PIX e NFC-e.
              </div>
            </div>
          </div>

          {/* Interactive ERP Workspace Component */}
          <AlfaErpWorkspace />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 16 a 27. REDESIGN DE MÓDULOS ESPECÍFICOS                                  */}
      {/* ========================================================================= */}
      <section id="modulos" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
              16 a 27 — REDESIGN DETALHADO POR MÓDULO OPERACIONAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Exploração das Principais Rotinas do ERP
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Selecione qualquer módulo abaixo para visualizar a solução proposta para cada rotina de negócio, comparando a estrutura de informação com os prints originais do software.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-900/80 border border-neutral-800 rounded-sm font-mono text-xs">
            {[
              { id: "sugestao", label: "16. Sugestão de Compra", screen: "sugesta-compra.png" },
              { id: "item", label: "17. Cadastro de Item", screen: "cadastro-item.png" },
              { id: "pessoa", label: "18. Cadastro de Pessoa", screen: "cadastro-pessoa.png" },
              { id: "vendas", label: "19. Vendas & Fechamento", screen: "venda.png" },
              { id: "cotacao", label: "20. Cotação Fornecedor", screen: "cotacao-fornecedor.png" },
              { id: "estoque", label: "21. Consulta Saldo", screen: "consulta-item-saldo.png" },
              { id: "xml", label: "22. Importação XML", screen: "importacao-xml.png" },
              { id: "financeiro", label: "23. Fluxo de Caixa", screen: "fluxo-caixa.png" },
              { id: "monitoramento", label: "24. Monitor Administrativo", screen: "monitor-administrativo.png" },
              { id: "notas", label: "25. Documentos / Notas", screen: "nota.png" },
              { id: "ordem", label: "26. Ordem de Compra", screen: "ordem-compra.png" },
              { id: "devolucao", label: "27. Devoluções", screen: "devolucao.png" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveModule(tab.id as any)}
                className={`px-3 py-1.5 rounded-sm transition-all ${
                  activeModule === tab.id
                    ? "bg-[#1683D8] text-white font-bold shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Render Active Module Spec */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-6 font-mono">
            {/* ================= 16. SUGESTÃO DE COMPRA ================= */}
            {activeModule === "sugestao" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                  <div>
                    <span className="text-[10px] text-[#1683D8] uppercase tracking-widest font-bold">
                      Módulo 16 // sugesta-compra.png
                    </span>
                    <h3 className="text-xl font-bold text-white">Sugestão de Compra & Reposição</h3>
                    <p className="text-xs text-slate-400">Identifique quais itens precisam ser repostos com base no giro e ponto de pedido.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setLightboxImage({
                          src: "/projects/alfa-erp/sugesta-compra.png",
                          title: "Sugestão de Compra (Print Real)",
                          domain: "COMPRAS",
                          notes: "Print de produção original do módulo de sugestão de compra.",
                        })
                      }
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Print Original</span>
                    </button>
                    <button className="px-3 py-1.5 bg-[#1683D8] text-white text-xs font-bold rounded">
                      Gerar Sugestão
                    </button>
                  </div>
                </div>

                {/* 4 Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-sm">
                    <span className="text-[10px] text-rose-300 block font-bold">ITENS CRÍTICOS</span>
                    <span className="text-lg font-bold text-white">18 SKUs</span>
                    <span className="text-[10px] text-rose-400 block">Ruptura iminente</span>
                  </div>
                  <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-sm">
                    <span className="text-[10px] text-amber-300 block font-bold">ABAIXO DO MÍNIMO</span>
                    <span className="text-lg font-bold text-white">42 SKUs</span>
                    <span className="text-[10px] text-amber-400 block">Estoque de segurança</span>
                  </div>
                  <div className="p-3 bg-blue-950/20 border border-blue-500/30 rounded-sm">
                    <span className="text-[10px] text-blue-300 block font-bold">SUGESTÃO TOTAL</span>
                    <span className="text-lg font-bold text-white">320 unidades</span>
                    <span className="text-[10px] text-blue-400 block">Giro para 30 dias</span>
                  </div>
                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-sm">
                    <span className="text-[10px] text-emerald-300 block font-bold">VALOR ESTIMADO</span>
                    <span className="text-lg font-bold text-emerald-400">R$ 28.450,00</span>
                    <span className="text-[10px] text-slate-400 block">Base último custo</span>
                  </div>
                </div>

                {/* Table representation */}
                <div className="border border-slate-800 rounded-sm overflow-hidden text-xs">
                  <div className="grid grid-cols-12 p-2 bg-slate-900 text-slate-400 font-bold text-[10px] uppercase">
                    <span className="col-span-2">Código</span>
                    <span className="col-span-3">Descrição da Peça</span>
                    <span className="col-span-2">Marca OEM</span>
                    <span className="col-span-1 text-right">Estoque</span>
                    <span className="col-span-1 text-right">Mínimo</span>
                    <span className="col-span-1 text-right">Sugestão</span>
                    <span className="col-span-2 text-right">Fornecedor Preferencial</span>
                  </div>
                  {[
                    { code: "029 905 409", name: "Cabo de Vela Fusca/Gol 1.6", brand: "NGK", stock: 2, min: 15, sug: 20, supplier: "Distribuidora Sul" },
                    { code: "032 129 620", name: "Filtro de Ar Motor EA111", brand: "Mahle", stock: 4, min: 20, sug: 30, supplier: "Peças & Cia" },
                    { code: "5U0 698 151 A", name: "Jogo Pastilha Dianteira", brand: "Fras-le", stock: 1, min: 10, sug: 15, supplier: "Frasle PR" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 p-2.5 border-b border-slate-850 items-center hover:bg-slate-900/40">
                      <span className="col-span-2 font-bold text-white">{row.code}</span>
                      <span className="col-span-3 text-slate-200 truncate">{row.name}</span>
                      <span className="col-span-2 text-slate-400">{row.brand}</span>
                      <span className="col-span-1 text-right text-rose-400 font-bold">{row.stock}</span>
                      <span className="col-span-1 text-right text-slate-400">{row.min}</span>
                      <span className="col-span-1 text-right text-emerald-400 font-bold">+{row.sug}</span>
                      <span className="col-span-2 text-right text-slate-400 truncate">{row.supplier}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= 17. CADASTRO DE ITEM ================= */}
            {activeModule === "item" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-[#1683D8] uppercase tracking-widest font-bold">
                      Módulo 17 // cadastro-item.png & item.png
                    </span>
                    <h3 className="text-xl font-bold text-white">Ficha de Item com Progressive Disclosure</h3>
                    <p className="text-xs text-slate-400">Em vez de exibir mais de 30 campos de uma só vez, a informação é agrupada por contexto de decisão.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setLightboxImage({
                          src: "/projects/alfa-erp/cadastro-item.png",
                          title: "Cadastro de Item (Print Real)",
                          domain: "CADASTROS",
                          notes: "Print de produção original mostrando todos os campos fiscais e técnicos expostos em bloco único.",
                        })
                      }
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Print Original</span>
                    </button>
                    <button className="px-3 py-1.5 bg-[#1683D8] text-white text-xs font-bold rounded">
                      Salvar Alterações
                    </button>
                  </div>
                </div>

                {/* Item Header Card */}
                <div className="p-4 bg-[#0c1426] border border-slate-800 rounded-sm flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold text-base">Cabo de Vela Ignição Linha Gol/Parati 1.6</span>
                      <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded">
                        ATIVO
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">Código Sistema: #10492 • Código Fabricante: 029 905 409 • Marca: NGK Automotive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs rounded hover:bg-slate-700">Editar</button>
                    <button className="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs rounded hover:bg-slate-700">Duplicar</button>
                    <button className="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs rounded hover:bg-slate-700">Mais ações ▼</button>
                  </div>
                </div>

                {/* Progressive Disclosure Tabs */}
                <div className="flex border-b border-slate-800 text-xs">
                  {(["overview", "cadastro", "estoque", "precos", "fornecedores", "fiscal"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setItemTab(tab)}
                      className={`px-4 py-2 border-b-2 font-bold capitalize transition-colors ${
                        itemTab === tab
                          ? "border-[#1683D8] text-[#1683D8]"
                          : "border-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: Identificação */}
                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-sm space-y-2.5 text-xs">
                    <span className="text-white font-bold block border-b border-slate-800 pb-1">
                      Identificação & Aplicação
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-slate-400">
                      <div>Tipo: <strong className="text-white block">Ignição / Cabos</strong></div>
                      <div>Subdescrição: <strong className="text-white block">Resistivo Supressivo</strong></div>
                      <div>Montadora: <strong className="text-white block">Volkswagen</strong></div>
                      <div>Motorização: <strong className="text-white block">EA111 / AP 1.6 8V</strong></div>
                    </div>
                  </div>

                  {/* Card 2: Códigos & Embalagem */}
                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-sm space-y-2.5 text-xs">
                    <span className="text-white font-bold block border-b border-slate-800 pb-1">
                      Códigos & Conversão
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-slate-400">
                      <div>GTIN / EAN: <strong className="text-white block">7897707502941</strong></div>
                      <div>Código Fabricante: <strong className="text-white block">ST-V25</strong></div>
                      <div>Embalagem: <strong className="text-white block">Jogo com 4 cabos</strong></div>
                      <div>Unidade Medida: <strong className="text-white block">JG (Jogo)</strong></div>
                    </div>
                  </div>

                  {/* Card 3: Fiscal */}
                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-sm space-y-2.5 text-xs md:col-span-2">
                    <span className="text-white font-bold block border-b border-slate-800 pb-1">
                      Tributação & Regras Fiscais
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-400">
                      <div>NCM: <strong className="text-white block">8544.30.00</strong></div>
                      <div>Origem: <strong className="text-white block">0 - Nacional</strong></div>
                      <div>CEST: <strong className="text-white block">01.018.00</strong></div>
                      <div>ICMS / ST: <strong className="text-emerald-400 block">Substituição Tributária</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 18. CADASTRO DE PESSOA ================= */}
            {activeModule === "pessoa" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-[#1683D8] uppercase tracking-widest font-bold">
                      Módulo 18 // cadastro-pessoa.png
                    </span>
                    <h3 className="text-xl font-bold text-white">Perfil de Cliente & Fornecedor</h3>
                    <p className="text-xs text-slate-400">Cards organizados substituindo o formulário vertical saturado.</p>
                  </div>
                  <button
                    onClick={() =>
                      setLightboxImage({
                        src: "/projects/alfa-erp/cadastro-pessoa.png",
                        title: "Cadastro de Pessoa (Print Real)",
                        domain: "CADASTROS",
                        notes: "Print de produção original do cadastro de pessoa física/jurídica.",
                      })
                    }
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Print Original</span>
                  </button>
                </div>

                {/* Profile Header */}
                <div className="p-4 bg-[#0c1426] border border-slate-800 rounded-sm flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold text-base">Auto Mecânica São José Ltda</span>
                      <span className="px-2 py-0.5 bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-bold rounded">
                        PESSOA JURÍDICA
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded">
                        CRÉDITO APROVADO
                      </span>
                    </div>
                    <span className="text-slate-400">CNPJ: 08.291.810/0001-92 • Inscrição Estadual: 902.182.91-0 • Cidade: Toledo / PR</span>
                  </div>
                </div>

                {/* 4 Quick Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">Contato Comercial:</span>
                    <span className="text-white font-bold block">Roberto Silva</span>
                    <span className="text-slate-400 text-[11px]">(45) 99812-4091</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">Limite de Crédito:</span>
                    <span className="text-emerald-400 font-bold block">R$ 15.000,00</span>
                    <span className="text-slate-400 text-[11px]">Disponível: R$ 8.420</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">Condição Padrão:</span>
                    <span className="text-white font-bold block">28 / 35 / 42 Dias</span>
                    <span className="text-slate-400 text-[11px]">Boleto Bancário</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">Vendedor Responsável:</span>
                    <span className="text-white font-bold block">Marcus R. (Balcão)</span>
                    <span className="text-slate-400 text-[11px]">Filial 08</span>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 19. REDESIGN — VENDAS ================= */}
            {activeModule === "vendas" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-[#1683D8] uppercase tracking-widest font-bold">
                      Módulo 19 // venda.png, fechamento-pedido.png, pedido-consulta.png
                    </span>
                    <h3 className="text-xl font-bold text-white">Workflow de Vendas em 7 Etapas Claras</h3>
                    <p className="text-xs text-slate-400">Jornada estruturada sem remover dados fiscais ou alçadas de desconto.</p>
                  </div>
                  <button
                    onClick={() =>
                      setLightboxImage({
                        src: "/projects/alfa-erp/venda.png",
                        title: "Vendas & Balcão (Print Real)",
                        domain: "VENDAS",
                        notes: "Print de produção original da tela de vendas do ALFA ERP.",
                      })
                    }
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Print Original</span>
                  </button>
                </div>

                {/* 7 Steps Diagram */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
                  {[
                    { step: "01", name: "Cliente", active: true },
                    { step: "02", name: "Itens / Peças", active: true },
                    { step: "03", name: "Preços / Desc.", active: true },
                    { step: "04", name: "Pagamento", active: false },
                    { step: "05", name: "Envio / Balcão", active: false },
                    { step: "06", name: "Revisão", active: false },
                    { step: "07", name: "Emissão NF-e", active: false },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-sm border text-center ${
                        s.active
                          ? "bg-[#1683D8]/15 border-[#1683D8] text-white"
                          : "bg-slate-900/60 border-slate-800 text-slate-500"
                      }`}
                    >
                      <span className="text-[10px] font-bold block">{s.step}</span>
                      <span className="text-[11px] font-semibold">{s.name}</span>
                    </div>
                  ))}
                </div>

                {/* Split Order Summary Sidebar */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
                  <div className="md:col-span-8 p-4 bg-slate-900/50 border border-slate-800 rounded-sm space-y-3">
                    <span className="text-white font-bold text-xs block">Itens Inseridos no Orçamento:</span>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-slate-950 border border-slate-850 rounded flex justify-between items-center">
                        <div>
                          <span className="text-white font-semibold block">Cabo de Vela Ignição Gol 1.6</span>
                          <span className="text-[10px] text-slate-400">OEM: 029 905 409 • NGK</span>
                        </div>
                        <span className="text-emerald-400 font-bold">1x R$ 145,00</span>
                      </div>
                      <div className="p-2 bg-slate-950 border border-slate-850 rounded flex justify-between items-center">
                        <div>
                          <span className="text-white font-semibold block">Filtro de Ar Primário EA111</span>
                          <span className="text-[10px] text-slate-400">OEM: 032 129 620 • Mahle</span>
                        </div>
                        <span className="text-emerald-400 font-bold">2x R$ 48,00</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4 p-4 bg-[#0c1426] border border-[#1683D8]/40 rounded-sm space-y-3 text-xs">
                    <span className="text-white font-bold block">Resumo do Orçamento #4492</span>
                    <div className="space-y-1.5 text-[11px] border-t border-slate-800 pt-2">
                      <div className="flex justify-between text-slate-400">
                        <span>Subtotal:</span>
                        <span>R$ 241,00</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Desconto (5%):</span>
                        <span className="text-rose-400">- R$ 12,05</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-xs pt-1 border-t border-slate-800">
                        <span>Total Líquido:</span>
                        <span className="text-emerald-400 text-sm">R$ 228,95</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-[#1683D8] hover:bg-[#0F5F9E] text-white font-bold rounded text-xs">
                      [F10] Faturar Pedido
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 20. REDESIGN — COTAÇÃO ================= */}
            {activeModule === "cotacao" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-[#1683D8] uppercase tracking-widest font-bold">
                      Módulo 20 // cotacao.png, cotacao-fornecedor.png, cadastro-cotacao.png
                    </span>
                    <h3 className="text-xl font-bold text-white">Matriz Comparativa de Cotações #448</h3>
                    <p className="text-xs text-slate-400">Comparação visual transparente de preços unitários, disponibilidade e prazos de fornecedores concorrentes.</p>
                  </div>
                  <button
                    onClick={() =>
                      setLightboxImage({
                        src: "/projects/alfa-erp/cotacao-fornecedor.png",
                        title: "Cotação Fornecedor (Print Real)",
                        domain: "COTAÇÕES",
                        notes: "Print de produção original mostrando a comparação tabular de distribuidores.",
                      })
                    }
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Print Original</span>
                  </button>
                </div>

                {/* Suppliers Matrix Table */}
                <div className="border border-slate-800 rounded-sm overflow-hidden text-xs">
                  <div className="grid grid-cols-12 p-2 bg-slate-900 text-slate-400 font-bold text-[10px] uppercase">
                    <span className="col-span-3">Fornecedor / Distribuidor</span>
                    <span className="col-span-2 text-right">Preço Unitário</span>
                    <span className="col-span-2 text-right">Lote (20 un)</span>
                    <span className="col-span-2 text-center">Disponibilidade</span>
                    <span className="col-span-2 text-center">Prazo Entrega</span>
                    <span className="col-span-1 text-right">Ação</span>
                  </div>

                  {[
                    { id: 1, name: "Distribuidora Automotiva Sul", unit: "R$ 138,00", total: "R$ 2.760,00", stock: "Imediato", lead: "1 dia útil", best: false },
                    { id: 2, name: "Auto Peças Cascavel Ltda", unit: "R$ 132,50", total: "R$ 2.650,00", stock: "Imediato", lead: "2 dias úteis", best: true },
                    { id: 3, name: "Distribuidora Nacional Peças", unit: "R$ 141,00", total: "R$ 2.820,00", stock: "3 dias", lead: "5 dias úteis", best: false },
                  ].map((s) => (
                    <div
                      key={s.id}
                      className={`grid grid-cols-12 p-3 border-b border-slate-850 items-center transition-colors ${
                        selectedSupplier === s.id ? "bg-[#1683D8]/10 border-l-4 border-l-[#1683D8]" : "hover:bg-slate-900/40"
                      }`}
                    >
                      <div className="col-span-3">
                        <span className="text-white font-bold block">{s.name}</span>
                        {s.best && (
                          <span className="text-[10px] text-emerald-400 font-bold">★ MELHOR PROPOSTA</span>
                        )}
                      </div>
                      <span className="col-span-2 text-right text-slate-200 font-bold">{s.unit}</span>
                      <span className="col-span-2 text-right text-white font-bold">{s.total}</span>
                      <span className="col-span-2 text-center text-emerald-400">{s.stock}</span>
                      <span className="col-span-2 text-center text-slate-400">{s.lead}</span>
                      <div className="col-span-1 text-right">
                        <button
                          onClick={() => setSelectedSupplier(s.id)}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            selectedSupplier === s.id
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-800 text-slate-300 hover:bg-[#1683D8] hover:text-white"
                          }`}
                        >
                          {selectedSupplier === s.id ? "Escolhida" : "Selecionar"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <span className="text-slate-400">
                    Proposta selecionada: <strong className="text-white">Auto Peças Cascavel Ltda (R$ 2.650,00)</strong>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded">
                      Comparar Propostas
                    </button>
                    <button className="px-3 py-1.5 bg-[#1683D8] text-white font-bold rounded">
                      Gerar Ordem de Compra
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 21. REDESIGN — ESTOQUE ================= */}
            {activeModule === "estoque" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-[#1683D8] uppercase tracking-widest font-bold">
                      Módulo 21 // consulta-item-saldo.png
                    </span>
                    <h3 className="text-xl font-bold text-white">Consulta Multiloja de Saldo de Estoque</h3>
                    <p className="text-xs text-slate-400">Visualização imediata entre saldo físico, reservado e disponível.</p>
                  </div>
                  <button
                    onClick={() =>
                      setLightboxImage({
                        src: "/projects/alfa-erp/consulta-item-saldo.png",
                        title: "Consulta de Saldo (Print Real)",
                        domain: "ESTOQUE",
                        notes: "Print de produção original da consulta de saldo de itens.",
                      })
                    }
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Print Original</span>
                  </button>
                </div>

                {/* 4 Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">ESTOQUE TOTAL</span>
                    <span className="text-base font-bold text-white">32 unidades</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">RESERVADO</span>
                    <span className="text-base font-bold text-amber-400">6 unidades</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">DISPONÍVEL</span>
                    <span className="text-base font-bold text-emerald-400">26 unidades</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">EM CONFERÊNCIA</span>
                    <span className="text-base font-bold text-blue-400">0 unidades</span>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 22. REDESIGN — IMPORTAÇÃO XML ================= */}
            {activeModule === "xml" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-[#1683D8] uppercase tracking-widest font-bold">
                      Módulo 22 // importacao-xml.png
                    </span>
                    <h3 className="text-xl font-bold text-white">Assistente de Importação de NF-e em 6 Etapas</h3>
                    <p className="text-xs text-slate-400">Fluxo guiado com validação por etapas para evitar erros de tributação e divergência de itens.</p>
                  </div>
                  <button
                    onClick={() =>
                      setLightboxImage({
                        src: "/projects/alfa-erp/importacao-xml.png",
                        title: "Importação XML (Print Real)",
                        domain: "IMPORTAÇÃO XML",
                        notes: "Print de produção original da importação de nota fiscal eletrônica por arquivo XML.",
                      })
                    }
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Print Original</span>
                  </button>
                </div>

                {/* 6 Step Progress */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
                  {[
                    { step: 1, label: "01. Upload XML", status: "completed" },
                    { step: 2, label: "02. Validação SEFAZ", status: "completed" },
                    { step: 3, label: "03. Fornecedor", status: "completed" },
                    { step: 4, label: "04. Conferência Itens", status: "active" },
                    { step: 5, label: "05. Tributos / ST", status: "pending" },
                    { step: 6, label: "06. Entrada Estoque", status: "pending" },
                  ].map((st) => (
                    <div
                      key={st.step}
                      className={`p-2.5 rounded border text-center ${
                        st.status === "completed"
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                          : st.status === "active"
                          ? "bg-[#1683D8]/20 border-[#1683D8] text-white font-bold"
                          : "bg-slate-900/60 border-slate-800 text-slate-500"
                      }`}
                    >
                      <span className="block text-[11px]">{st.label}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-sm space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-bold">NF-e #194.201 Autorizada na SEFAZ</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Fornecedor: NGK do Brasil Ltda • 12 itens identificados • R$ 8.420,00 de valor total.
                  </p>
                </div>
              </div>
            )}

            {/* ================= 23. REDESIGN — FINANCEIRO ================= */}
            {activeModule === "financeiro" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-[#1683D8] uppercase tracking-widest font-bold">
                      Módulo 23 // fluxo-caixa.png & parcela.png
                    </span>
                    <h3 className="text-xl font-bold text-white">Cockpit de Fluxo de Caixa & Contas</h3>
                    <p className="text-xs text-slate-400">Visualização executiva com aging de duplicatas e conciliação.</p>
                  </div>
                  <button
                    onClick={() =>
                      setLightboxImage({
                        src: "/projects/alfa-erp/fluxo-caixa.png",
                        title: "Fluxo de Caixa (Print Real)",
                        domain: "FINANCEIRO",
                        notes: "Print de produção original do fluxo de caixa e conciliação financeira.",
                      })
                    }
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Print Original</span>
                  </button>
                </div>

                {/* Financial KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">RECEITAS (MÊS)</span>
                    <span className="text-base font-bold text-emerald-400">R$ 184.200</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">DESPESAS (MÊS)</span>
                    <span className="text-base font-bold text-rose-400">R$ 112.450</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">SALDO BANCÁRIO</span>
                    <span className="text-base font-bold text-white">R$ 71.750</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">A RECEBER</span>
                    <span className="text-base font-bold text-blue-400">R$ 49.300</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-[10px] text-slate-500 block">A PAGAR</span>
                    <span className="text-base font-bold text-amber-400">R$ 38.100</span>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 24 a 27: DEMAIS MÓDULOS ================= */}
            {["monitoramento", "notas", "ordem", "devolucao"].includes(activeModule) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white capitalize">
                    {activeModule === "monitoramento" && "24. Monitor Administrativo & Dashboards"}
                    {activeModule === "notas" && "25. Documentos Fiscais & Notas Emitidas"}
                    {activeModule === "ordem" && "26. Ordem de Compra Estruturada"}
                    {activeModule === "devolucao" && "27. Devoluções & Garantia de Peças"}
                  </h3>
                  <span className="text-[10px] text-[#1683D8] font-bold uppercase">
                    PROPOSED REDESIGN
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {activeModule === "monitoramento" && "Painel executivo com cards e gráficos balanceados, evitando sobrecarga com indicadores essenciais de vendas, compras e devoluções."}
                  {activeModule === "notas" && "Listagem organizada de documentos com status chips semânticos (Autorizada, Cancelada, Contingência) substituindo códigos obscuros."}
                  {activeModule === "ordem" && "Documento estruturado separando cabeçalho comercial, itens encomendados, condições de frete e totais líquidos."}
                  {activeModule === "devolucao" && "Tabela de gestão de devoluções com filtros por motivo (peça incorreta, defeito de fabricação, desistência) e status de inspeção."}
                </p>
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded text-slate-400 text-xs">
                  Consulte os prints reais disponíveis na galeria acima para comparar a estrutura de dados existente com este direcionamento de redesign.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 28. BEFORE / AFTER PRESENTATION (COMPARAÇÃO INTERATIVA)                   */}
      {/* ========================================================================= */}
      <section id="comparativo" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
              28 — ANTES & DEPOIS // COMPARAÇÃO DIRETA
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Evolução da Interface: De Cobertura a Hierarquia
            </h2>
            <div className="p-4 border-l-2 border-[#1683D8] bg-neutral-900/60 text-sm text-neutral-300 font-light">
              &ldquo;Não se trata apenas de atualizar a aparência. A proposta reorganiza informação, reduz competição visual e aproxima contexto da decisão.&rdquo;
            </div>
          </div>

          {/* Comparison Screen Selector */}
          {/* Comparison Screen Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-3 font-mono text-xs">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "balcao", label: "01. Balcão de Peças (legacy-balcao.png)" },
                { id: "menu", label: "02. Topbar & Mega-Menu (legacy-menu.png)" },
                { id: "fechamento", label: "03. Fechamento de Pedido (fechamento-pedido.png)" },
                { id: "faturamento", label: "04. Faturamento Mensal (legacy-faturamento.png)" },
                { id: "sugestao", label: "05. Sugestão de Compra (sugesta-compra.png)" },
                { id: "item", label: "06. Grid de Itens (item.png)" },
                { id: "cotacao", label: "07. Cotação de Fornecedor (cotacao-fornecedor.png)" },
                { id: "fluxo", label: "08. Fluxo de Caixa (fluxo-caixa.png)" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCompareScreen(c.id as any)}
                  className={`px-3 py-1.5 rounded-sm transition-all ${
                    compareScreen === c.id
                      ? "bg-[#1683D8] text-white font-bold"
                      : "bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center bg-neutral-900/80 border border-neutral-800 rounded p-0.5">
              <button
                onClick={() => setCompareMode("sideBySide")}
                className={`px-2.5 py-1 text-[11px] rounded ${
                  compareMode === "sideBySide" ? "bg-[#1683D8] text-white font-bold" : "text-neutral-400"
                }`}
              >
                Lado a Lado (50/50)
              </button>
              <button
                onClick={() => setCompareMode("splitSlider")}
                className={`px-2.5 py-1 text-[11px] rounded ${
                  compareMode === "splitSlider" ? "bg-[#1683D8] text-white font-bold" : "text-neutral-400"
                }`}
              >
                Slider Interativo
              </button>
            </div>
          </div>

          {/* Render Comparison */}
          {compareMode === "sideBySide" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
              {/* Left: Original Screenshot */}
              <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-sm space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="text-rose-400 font-bold uppercase text-[11px]">
                      EXISTING PRODUCT // Tela Original em Produção
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">Print Autêntico</span>
                </div>

                <div className="relative aspect-[4/3] w-full bg-black border border-slate-800 rounded overflow-hidden">
                  <Image
                    src={`/projects/alfa-erp/${
                      compareScreen === "balcao"
                        ? "legacy-balcao.png"
                        : compareScreen === "menu"
                        ? "legacy-menu.png"
                        : compareScreen === "fechamento"
                        ? "fechamento-pedido.png"
                        : compareScreen === "faturamento"
                        ? "legacy-faturamento.png"
                        : compareScreen === "sugestao"
                        ? "sugesta-compra.png"
                        : compareScreen === "item"
                        ? "item.png"
                        : compareScreen === "cotacao"
                        ? "cotacao-fornecedor.png"
                        : "fluxo-caixa.png"
                    }`}
                    alt="Print legado original do ALFA ERP"
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded text-[11px] text-slate-400 space-y-1">
                  <span className="text-white font-bold block">Observação Heurística da Tela Legada:</span>
                  <p>
                    {compareScreen === "balcao" && "Barra de busca fragmentada em 9 campos de texto sem agrupamento, 16 micro-ícones de ação ilegíveis por linha e ausência de identificação direta por placa Mercosul."}
                    {compareScreen === "menu" && "Menu superior de 14 módulos com dropdown em cascata sem categorização visual, forçando o operador a memorizar posições em listas densas."}
                    {compareScreen === "fechamento" && "Campos de valor bruto, desconto e forma de pagamento com peso visual idêntico, gerando risco crítico de erro em emissão de NFC-e de balcão."}
                    {compareScreen === "faturamento" && "Matriz contábil de 18 colunas sem destaque de margem líquida, percentual de venda ou filtros rápidos por vendedor e parceiro."}
                    {compareScreen === "sugestao" && "Mais de 12 campos de filtro horizontais e tabela de 14 colunas competindo por atenção sem resumo executivo de giro e ponto de pedido."}
                    {compareScreen === "item" && "Grid saturado com 16 colunas operacionais e 16 micro-ícones por linha sem progressive disclosure."}
                    {compareScreen === "cotacao" && "Dificuldade em visualizar a melhor proposta por item sem calcular manualmente cada cotação."}
                    {compareScreen === "fluxo" && "Planilha crua sem distinção de severidade cromática entre contas pagas e a vencer."}
                  </p>
                </div>
              </div>

              {/* Right: Modern Redesign Exploration */}
              <div className="p-4 bg-[#0a1120] border border-[#1683D8]/50 rounded-sm space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1683D8] animate-pulse"></span>
                    <span className="text-white font-bold uppercase text-[11px]">
                      PROPOSED REDESIGN // Arquitetura Redesenhada
                    </span>
                  </div>
                  <span className="text-[10px] text-[#1683D8] bg-[#1683D8]/15 px-2 py-0.5 rounded font-bold">
                    Zero-Mouse UX
                  </span>
                </div>

                <div className="relative aspect-[4/3] w-full bg-slate-950 border border-slate-800 rounded p-4 flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-3">
                    <div className="p-2.5 bg-[#0d1830] border border-[#1683D8]/40 rounded flex items-center justify-between text-[11px]">
                      <span className="text-white font-bold">
                        {compareScreen === "balcao" && "Balcão PDV: Atendimento Rápido [F1]"}
                        {compareScreen === "menu" && "Topbar Horizontal com Mega-Menu Categorizado"}
                        {compareScreen === "fechamento" && "Fechamento de Pedido & Emissão NFC-e [F8]"}
                        {compareScreen === "faturamento" && "Matriz de Faturamento com Margens & % Venda"}
                        {compareScreen === "sugestao" && "Sugestão Inteligente com Ponto de Pedido"}
                        {compareScreen === "item" && "Ficha Técnica de Peças com Conversão Cruzada"}
                        {compareScreen === "cotacao" && "Matriz Multilateral de Fornecedores"}
                        {compareScreen === "fluxo" && "Fluxo de Caixa com Previsão Diária"}
                      </span>
                      <span className="text-[#1683D8] font-bold">Ergonomia & Velocidade</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                        <span className="text-slate-500 block">Arquitetura:</span>
                        <strong className="text-white">Fiel ao Legado + Moderna</strong>
                      </div>
                      <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                        <span className="text-slate-500 block">Navegação:</span>
                        <strong className="text-white">Abas Multi-Janela + F-Keys</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded space-y-2 text-[11px]">
                      <span className="text-emerald-400 font-bold block">✓ Soluções de Design Implementadas:</span>
                      <ul className="space-y-1 text-slate-300">
                        {compareScreen === "balcao" && (
                          <>
                            <li>• Identificação imediata por placa Mercosul com motorização (EA111);</li>
                            <li>• Substituição dos 16 micro-ícones por 4 ações claras de popover;</li>
                            <li>• Botão proeminente &apos;Vender&apos; com carrinho sincronizado em tempo real;</li>
                            <li>• Atalhos táticos [F1], [F3], [F6] e [F8] preservados para zero-mouse.</li>
                          </>
                        )}
                        {compareScreen === "menu" && (
                          <>
                            <li>• Topbar corporativa horizontal com logo na nuvem e multi-filial;</li>
                            <li>• Mega-menu de 5 colunas agrupado por contexto de negócio;</li>
                            <li>• Status SEFAZ online e contador de sessão sempre visíveis.</li>
                          </>
                        )}
                        {compareScreen === "fechamento" && (
                          <>
                            <li>• Hierarquia financeira nítida entre Bruto, Desconto e Total Líquido;</li>
                            <li>• Seleção clara de formas de pagamento (Dinheiro, PIX, Cartão, 30 Dias);</li>
                            <li>• Confirmação imediata com protocolo SEFAZ autorizado na tela.</li>
                          </>
                        )}
                        {compareScreen === "faturamento" && (
                          <>
                            <li>• Visualização tabular nítida com destaque de marcas e % de venda;</li>
                            <li>• Indicador executivo de total faturado no cabeçalho;</li>
                            <li>• Filtros rápidos por filial, vendedor e período contábil.</li>
                          </>
                        )}
                        {!["balcao", "menu", "fechamento", "faturamento"].includes(compareScreen) && (
                          <>
                            <li>• Cards de resumo para decisões em 1 segundo;</li>
                            <li>• Tabelas com linhas expansíveis e ações agrupadas;</li>
                            <li>• Paleta corporativa ALFA Blue de alto contraste;</li>
                            <li>• Preservação total de atalhos táteis de teclado.</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-500 pt-2 text-center block">
                    Exploração validada para estações de trabalho de autopeças
                  </span>
                </div>

                <div className="p-3 bg-[#0d1830] border border-[#1683D8]/30 rounded text-[11px] text-slate-300 space-y-1">
                  <span className="text-white font-bold block">Direcionamento de Produto:</span>
                  <p>
                    Reorganiza a densidade sem simplificar demais a ferramenta, garantindo que usuários experientes continuem operando em alta velocidade.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Split Slider */
            <div className="space-y-4">
              <div className="relative aspect-[16/9] w-full bg-black border border-slate-700 rounded-sm overflow-hidden select-none">
                {/* Background Image: Redesign Conceptual Representation */}
                <div className="absolute inset-0 bg-slate-950 p-6 flex flex-col justify-center items-center text-center font-mono">
                  <div className="max-w-md space-y-3">
                    <span className="text-xs text-[#1683D8] font-bold uppercase tracking-widest">
                      PROPOSED REDESIGN
                    </span>
                    <h4 className="text-2xl font-bold text-white">Hierarquia Visual e Ergonomia</h4>
                    <p className="text-xs text-slate-400">
                      Interface moderna com cards de resumo, filtros avançados e progressive disclosure.
                    </p>
                  </div>
                </div>

                {/* Foreground Image: Real Legacy Screen Clipped by Slider */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden bg-black border-r-2 border-[#1683D8]"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="relative h-full w-[100vw] max-w-7xl">
                    <Image
                      src={`/projects/alfa-erp/${
                        compareScreen === "balcao"
                          ? "legacy-balcao.png"
                          : compareScreen === "menu"
                          ? "legacy-menu.png"
                          : compareScreen === "fechamento"
                          ? "fechamento-pedido.png"
                          : compareScreen === "faturamento"
                          ? "legacy-faturamento.png"
                          : compareScreen === "sugestao"
                          ? "sugesta-compra.png"
                          : compareScreen === "item"
                          ? "item.png"
                          : compareScreen === "cotacao"
                          ? "cotacao-fornecedor.png"
                          : "fluxo-caixa.png"
                      }`}
                      alt="Print legado cortado"
                      fill
                      className="object-contain p-2"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 text-rose-400 font-mono text-[10px] px-2 py-1 rounded border border-rose-900/60">
                      ANTES: Interface Original
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-black/80 text-[#1683D8] font-mono text-[10px] px-2 py-1 rounded border border-blue-900/60">
                  DEPOIS: Redesign Proposto
                </div>
              </div>

              {/* Slider Input Range */}
              <div className="flex items-center space-x-4 font-mono text-xs">
                <span className="text-slate-400">Arraste para comparar:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="flex-1 accent-[#1683D8] bg-slate-800 cursor-ew-resize"
                />
                <span className="text-white font-bold">{sliderPosition}%</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 29. DESIGN SYSTEM (SISTEMA DE COMPONENTES B2B)                           */}
      {/* ========================================================================= */}
      <section id="designsystem" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
              29 — DESIGN SYSTEM ENTERPRISE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Padronização Escalável para Sistemas Complexos
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              O design system foi estruturado para garantir consistência visual e velocidade de implementação pela equipe de engenharia, padronizando botões, filtros, inputs, tabelas e badges de status.
            </p>
          </div>

          {/* Color Tokens Spec */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-sm block">01. Tokens de Cores Primárias & Proporção Visual</span>
              <span className="text-[11px] text-[#1683E8] bg-[#EAF4FF]/10 px-2 py-0.5 rounded border border-[#1683E8]/30">
                80% Neutros · 15% Alfa Blue · 5% Feedback
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { hex: "#1683E8", name: "ALFA BLUE", role: "Navegação ativa & CTAs primários" },
                { hex: "#123B63", name: "ALFA DARK", role: "Header window & contraste" },
                { hex: "#EAF4FF", name: "BLUE LIGHT", role: "Hover & tabs selecionadas" },
                { hex: "#F5F7FA", name: "BACKGROUND", role: "Canvas do sistema" },
                { hex: "#FFFFFF", name: "SURFACE", role: "Cards & tabelas operacionais" },
                { hex: "#172033", name: "TEXT PRIMARY", role: "Títulos e valores essenciais" },
                { hex: "#667085", name: "TEXT SECONDARY", role: "Subtítulos e labels de apoio" },
                { hex: "#E4E7EC", name: "BORDER", role: "Divisores sutis entre células" },
                { hex: "#16A34A", name: "SUCCESS", role: "Disponível & indicadores +" },
                { hex: "#F59E0B", name: "WARNING", role: "Atenção & estoque baixo" },
                { hex: "#DC2626", name: "DANGER", role: "Erros & estoque negativo" },
              ].map((token, i) => (
                <div key={i} className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-2">
                  <div
                    className="h-10 w-full rounded border border-white/10"
                    style={{ backgroundColor: token.hex }}
                  ></div>
                  <div>
                    <span className="font-bold text-white block text-[11px] truncate">{token.name}</span>
                    <span className="text-[10px] text-neutral-400 block font-mono">{token.hex}</span>
                    <span className="text-[9px] text-neutral-500 block truncate">{token.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UI Components Preview */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-white font-bold text-sm block">02. Biblioteca de Componentes de Interface</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Buttons */}
              <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-3">
                <span className="text-neutral-400 uppercase text-[10px] font-bold block">Botões & Ações</span>
                <div className="space-y-2">
                  <button className="w-full py-2 bg-[#1683D8] hover:bg-[#0F5F9E] text-white font-bold rounded text-xs">
                    Primary CTA Button
                  </button>
                  <button className="w-full py-2 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-neutral-200 font-medium rounded text-xs">
                    Secondary Outline Button
                  </button>
                  <button className="w-full py-2 bg-rose-600/20 border border-rose-500/40 text-rose-300 font-medium rounded text-xs">
                    Destructive Action Button
                  </button>
                </div>
              </div>

              {/* Status Badges */}
              <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-3">
                <span className="text-neutral-400 uppercase text-[10px] font-bold block">Status Badges & Chips</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded text-[11px] font-bold">
                    ✓ Autorizada SEFAZ
                  </span>
                  <span className="px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded text-[11px] font-bold">
                    ! Ponto de Pedido
                  </span>
                  <span className="px-2.5 py-1 bg-rose-500/15 border border-rose-500/30 text-rose-400 rounded text-[11px] font-bold">
                    ✕ Estoque Esgotado
                  </span>
                  <span className="px-2.5 py-1 bg-[#1683D8]/15 border border-[#1683D8]/40 text-[#1683D8] rounded text-[11px] font-bold">
                    ● Em Cotação #448
                  </span>
                </div>
              </div>

              {/* Form Controls */}
              <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-3">
                <span className="text-neutral-400 uppercase text-[10px] font-bold block">Inputs com Feedback</span>
                <div className="space-y-2">
                  <input
                    type="text"
                    defaultValue="029 905 409"
                    className="w-full bg-neutral-900 border border-[#1683D8] rounded px-3 py-1.5 text-xs text-white outline-none"
                  />
                  <div className="flex items-center space-x-1.5 text-emerald-400 text-[10px]">
                    <Check className="w-3 h-3" />
                    <span>Código OEM validado no catálogo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 30. ACCESSIBILITY CONSIDERATIONS                                          */}
      {/* ========================================================================= */}
      <section id="acessibilidade" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
              30 — CONSIDERAÇÕES DE ACESSIBILIDADE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ergonomia Visual para Longas Jornadas de Trabalho
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Em ambientes de balcão e escritórios onde operadores utilizam o ERP por 8 a 10 horas contínuas, decisões de contraste, legibilidade tipográfica e navegação por teclado reduzem diretamente o cansaço visual e os erros de digitação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-white font-bold text-xs block">Contraste & Hierarquia Cromática</span>
              <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                Superfícies Dark Navy (#0F172A) ou Light Slate (#F1F5F9) no ERP com texto em alta legibilidade eliminam o brilho excessivo de telas puramente brancas em ambientes fechados.
              </p>
            </div>
            <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-white font-bold text-xs block">Status Não Dependente Apenas de Cor</span>
              <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                Todas as indicações de severidade utilizam ícones descritivos (✓, !, ✕) e rótulos textuais explícitos, garantindo clareza para usuários daltônicos.
              </p>
            </div>
            <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-white font-bold text-xs block">Navegação Completa por Teclado</span>
              <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                Estados de foco visíveis em todos os campos, atalhos semânticos (F1 a F8) e tabulação sequencial contínua para evitar a troca desnecessária para o mouse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 31. QA & DESIGN VALIDATION (O DIFERENCIAL DO MARCUS)                      */}
      {/* ========================================================================= */}
      <section id="qa" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold block">
              31 — DESIGN QA & VALIDAÇÃO TÉCNICA
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              &ldquo;Design não termina no Figma.&rdquo;
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Minha experiência profissional também envolve QA e validação da implementação, permitindo observar e mitigar diferenças entre a solução projetada e o produto efetivamente entregue pela engenharia.
            </p>
          </div>

          {/* Workflow Diagram: Design to QA */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-sm font-mono text-xs">
            <span className="text-neutral-400 font-bold uppercase text-[10px] block pb-4 border-b border-neutral-800">
              Ciclo Contínuo de Design QA & Engenharia:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-6 text-center">
              {[
                { step: "01", name: "DESIGN", desc: "Fluxos e protótipos de alta fidelidade" },
                { step: "02", name: "HANDOFF", desc: "Critérios de aceite e especificações de tokens" },
                { step: "03", name: "IMPLEMENTAÇÃO", desc: "Construção de código pelo time de engenharia" },
                { step: "04", name: "DESIGN QA", desc: "Inspeção visual e funcional em ambiente de teste" },
                { step: "05", name: "VALIDAÇÃO", desc: "Alinhamento de divergências de layout" },
                { step: "06", name: "ITERAÇÃO", desc: "Ajuste refinado antes do deploy de produção" },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm space-y-1">
                  <span className="text-[10px] text-[#1683D8] font-bold block">{item.step}</span>
                  <strong className="text-white block text-xs">{item.name}</strong>
                  <span className="text-[10px] text-neutral-400 block font-sans">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Checklist Grid */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-white font-bold text-sm block">Critérios Validados nas Sessões de Design QA:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: "Espaçamentos & Grids", desc: "Consistência de padding e margens entre módulos." },
                { title: "Hierarquia Tipográfica", desc: "Escala correta de pesos e contrastes em telas densas." },
                { title: "Estados de Componentes", desc: "Default, hover, active, disabled e focus ring visível." },
                { title: "Mensagens de Validação", desc: "Avisos claros de erro de SEFAZ e validação de CNPJ." },
                { title: "Empty & Loading States", desc: "Skeletons proporcionais que não travam digitação." },
                { title: "Comportamento Responsivo", desc: "Adaptação para monitores 1366x768 de balcão e 1080p." },
                { title: "Regras de Negócio", desc: "Alçadas de desconto e bloqueio de peças incompatíveis." },
                { title: "Ergonomia de Teclado", desc: "Atalhos funcionais sem necessidade de uso do mouse." },
              ].map((chk, i) => (
                <div key={i} className="p-3 bg-neutral-900/60 border border-neutral-800/80 rounded space-y-1">
                  <div className="flex items-center space-x-1.5 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-bold text-white text-[11px]">{chk.title}</span>
                  </div>
                  <p className="text-neutral-400 text-[10px] font-sans">{chk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 32 & 33. ROLE & WHAT I LEARNED                                            */}
      {/* ========================================================================= */}
      <section id="papel" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          {/* Section 32: Role Breakdown */}
          <div className="space-y-6 max-w-4xl">
            <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
              32 — MEU PAPEL NO PROJETO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              &ldquo;Minha atuação atravessou diferentes etapas do ciclo de produto.&rdquo;
            </h2>
            <p className="text-sm text-neutral-300">
              Em vez de restringir a atuação ao desenho visual, o trabalho combinou entendimento aprofundado do negócio de autopeças, arquitetura da informação, viabilidade de engenharia e controle rigoroso de qualidade.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 font-mono text-xs">
              {[
                { name: "DISCOVERY", desc: "Compreensão de dores, imersão em regras fiscais e requisitos de balcão." },
                { name: "UX", desc: "Mapeamento de fluxos, arquitetura da informação e wireframes estruturais." },
                { name: "UI", desc: "Sistema de componentes, tokens cromáticos e interfaces de alta fidelidade." },
                { name: "PRODUCT", desc: "Tomada de decisão, priorização de impacto e alinhamento de escopo." },
                { name: "QA", desc: "Validação funcional, testes de interface e critérios de aceite com engenharia." },
                { name: "ENGINEERING", desc: "Colaboração técnica direta para assegurar viabilidade de entrega." },
              ].map((p, i) => (
                <div key={i} className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-1.5">
                  <span className="text-[#1683D8] font-bold text-xs block">{p.name}</span>
                  <p className="text-neutral-400 text-[11px] font-sans leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 33: 6 Learnings */}
          <div className="space-y-6 pt-6 border-t border-neutral-800">
            <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
              33 — APRENDIZADOS DE PRODUTO
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              {[
                {
                  num: "01",
                  title: "Complexidade não se resolve apenas na interface",
                  text: "Produtos corporativos exigem compreender as regras tributárias, logísticas e fiscais antes de alterar qualquer disposição visual.",
                },
                {
                  num: "02",
                  title: "Usuários corporativos precisam de densidade",
                  text: "Operadores profissionais rejeitam interfaces simplificadas que aumentam a quantidade de cliques; a densidade precisa de hierarquia, não de eliminação.",
                },
                {
                  num: "03",
                  title: "Boa IA reduz a complexidade percebida",
                  text: "Estruturar a navegação por domínios funcionais e abas lógicas organiza o sistema sem subtrair nenhum dado necessário.",
                },
                {
                  num: "04",
                  title: "Decisões de design devem respeitar regras de negócio",
                  text: "Um layout bonito que inviabilize o cálculo de substituição tributária ou a consulta rápida de estoque é inútil em ambiente real.",
                },
                {
                  num: "05",
                  title: "Colaboração próxima com engenharia melhora o resultado",
                  text: "Validar a arquitetura técnica antes da entrega final evita retrabalho e garante fidelidade entre o protótipo e a produção.",
                },
                {
                  num: "06",
                  title: "QA é uma extensão natural do Product Design",
                  text: "Inspecionar a entrega final no código assegura que o cuidado colocado na concepção chegue intacto às mãos do usuário final.",
                },
              ].map((lrn, i) => (
                <div key={i} className="p-5 bg-neutral-900/60 border border-neutral-800 rounded space-y-2">
                  <span className="text-[#1683D8] font-bold text-base block font-mono">{lrn.num}</span>
                  <h4 className="font-bold text-white text-xs">{lrn.title}</h4>
                  <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">{lrn.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 34. OUTCOMES & EVIDÊNCIAS REAIS (SEM DADOS INVENTADOS)                    */}
      {/* ========================================================================= */}
      <section id="resultados" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold block">
              34 — RESULTADOS & EVIDÊNCIAS DE ENTREGA
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Impacto Baseado em Entregáveis Concretos de Produto
            </h2>

            <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded text-xs font-mono text-neutral-400 space-y-2">
              <span className="text-white font-bold block">Entrega Real &amp; Consistência Operacional:</span>
              <p className="text-neutral-300">
                O valor deste trabalho reside na padronização sistemática de mais de 20 fluxos de alta complexidade, na eliminação de fricção cognitiva para operadores de balcão e retaguarda, e na implantação de um design system unificado integrado ao ciclo de desenvolvimento.
              </p>
            </div>
          </div>

          {/* Tangible Outcomes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block text-[10px] uppercase">ESCOPO DE PRODUÇÃO</span>
              <span className="text-lg font-bold text-[#13E1BC] block">20 Telas Reais</span>
              <span className="text-[10px] text-neutral-400">Mapeadas, auditadas e modernizadas</span>
            </div>

            <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block text-[10px] uppercase">COGNITIVO</span>
              <span className="text-lg font-bold text-white block">Hierarquia Visual</span>
              <span className="text-[10px] text-[#1683D8]">Filtros em drawer e densidade controlada</span>
            </div>

            <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block text-[10px] uppercase">DESIGN SYSTEM</span>
              <span className="text-lg font-bold text-white block">Componentes B2B</span>
              <span className="text-[10px] text-emerald-400">Tokens, inputs e tabelas padronizados</span>
            </div>

            <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block text-[10px] uppercase">GOVERNANÇA</span>
              <span className="text-lg font-bold text-white block">UX QA Sistemático</span>
              <span className="text-[10px] text-[#1683D8]">Critérios de paridade com desenvolvimento</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 35. CASE CONCLUSION & CTAS                                                */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#080808] text-center border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#1683D8] uppercase tracking-widest font-semibold block">
              CONCLUSÃO DO ESTUDO
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              &ldquo;Complexidade não precisa desaparecer.
              <br />
              Ela precisa ser organizada.&rdquo;
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
              Meu trabalho como Product Designer é transformar regras, informações e necessidades diferentes em experiências que façam sentido para quem usa o produto todos os dias.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-mono text-xs">
            <Link
              href="/work"
              className="px-6 py-3 bg-[#1683D8] hover:bg-[#0F5F9E] text-white font-bold rounded-sm transition-all shadow-lg shadow-blue-500/20"
            >
              VER OUTROS CASES
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-3 bg-neutral-900 border border-neutral-700 hover:border-white text-white font-medium rounded-sm transition-all"
            >
              ENTRAR EM CONTATO
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 42. BOTTOM CASE NAVIGATION                                                */}
      {/* ========================================================================= */}
      <footer className="py-12 bg-[#080808] font-mono text-xs border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border border-neutral-800/80 p-6 bg-neutral-900/60 rounded-sm">
            <Link
              href={`/work/${prevCase.slug}`}
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                Case Anterior: [{prevCase.number}] {prevCase.category}
              </span>
            </Link>

            <Link
              href="/work"
              className="text-neutral-500 hover:text-[#1683D8] transition-colors"
            >
              [TODOS OS CASES]
            </Link>

            <Link
              href={`/work/${nextCase.slug}`}
              className="inline-flex items-center gap-2 text-white hover:text-[#1683D8] transition-colors"
            >
              <span>
                Próximo Case: [{nextCase.number}] {nextCase.category}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* LIGHTBOX MODAL FOR INSPECTING SOURCE SCREENSHOTS                          */}
      {/* ========================================================================= */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-5xl bg-[#121212] border border-neutral-700 rounded-sm overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-white font-bold">{lightboxImage.title}</span>
                <span className="text-neutral-500">•</span>
                <span className="text-[#1683D8] font-bold">{lightboxImage.domain}</span>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image View */}
            <div className="relative flex-1 min-h-[400px] bg-black overflow-auto p-4 flex items-center justify-center">
              <div className="relative w-full h-full min-h-[380px]">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Modal Footer Notes */}
            <div className="p-4 bg-neutral-900/90 border-t border-neutral-800 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-neutral-300">
              <p className="font-sans text-xs text-neutral-400">{lightboxImage.notes}</p>
              <button
                onClick={() => setLightboxImage(null)}
                className="px-4 py-1.5 bg-[#1683D8] text-white font-bold rounded text-xs shrink-0 self-end sm:self-auto"
              >
                Fechar Inspeção
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
