"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
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
  Sparkles,
  Eye,
  Sliders,
  Check,
  ChevronDown,
  Plus,
  ShoppingCart,
  Package,
  Settings,
  BarChart3,
  Search,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Info,
  Maximize2,
  FolderGit2,
  Cpu,
  Monitor,
  LayoutGrid,
  Columns,
  Table,
} from "lucide-react";
import { CaseStudy } from "@/types";
import SupplyHubWorkspace from "./SupplyHubWorkspace";

interface SupplyHubCaseStudyProps {
  caseStudy: CaseStudy;
  nextCase: CaseStudy;
  prevCase: CaseStudy;
}

export default function SupplyHubCaseStudy({
  caseStudy,
  nextCase,
  prevCase,
}: SupplyHubCaseStudyProps) {
  // Navigation active section anchor
  const [activeNav, setActiveNav] = useState("overview");

  // Selected node in Information Architecture tree
  const [selectedTreeNode, setSelectedTreeNode] = useState<string>("dashboard");

  // Selected role for RBAC exploration
  const [selectedRole, setSelectedRole] = useState<"comprador" | "gerente" | "diretor" | "fornecedor">("comprador");

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "overview", label: "01. Overview" },
    { id: "problema", label: "02. Desafio & Fluxo" },
    { id: "regras", label: "03. Regras de Negócio" },
    { id: "workspace", label: "04. Sistema Interativo" },
    { id: "arquitetura", label: "05. Árvore de Telas" },
    { id: "rbac", label: "06. Matriz de Acesso" },
    { id: "metricas", label: "07. Validação & KPIs" },
    { id: "aprendizados", label: "08. Aprendizados" },
  ];

  return (
    <div className="bg-[#080808] text-white min-h-screen selection:bg-[#16845a] selection:text-white font-sans antialiased">
      {/* ========================================================================= */}
      {/* TOP HEADER BREADCRUMB                                                     */}
      {/* ========================================================================= */}
      <div className="border-b border-neutral-800 bg-[#080808] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between text-xs font-mono">
          <Link
            href="/work"
            className="inline-flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para todos os cases</span>
          </Link>
          <div className="flex items-center space-x-3 text-neutral-500">
            <span className="hidden sm:inline">MARCUS RITTA // PORTFOLIO</span>
            <span>•</span>
            <span className="text-[#3cd68e] font-semibold">SUPPLYHUB B2B</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STICKY SUBNAV BAR                                                         */}
      {/* ========================================================================= */}
      <nav className="sticky top-14 z-30 bg-[#080808]/95 backdrop-blur-md border-b border-neutral-800 py-2.5 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 text-xs font-mono min-w-max">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1.5 rounded-sm transition-all ${
                activeNav === item.id
                  ? "bg-[#16845a] text-white font-bold shadow-md shadow-[#16845a]/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 01. EDITORIAL HERO & CASE POSITIONING                                     */}
      {/* ========================================================================= */}
      <section id="overview" className="pt-16 pb-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          {/* Top Label & Title */}
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 text-xs font-mono font-bold tracking-widest uppercase bg-[#16845a]/20 border border-[#16845a]/40 text-[#3cd68e] rounded-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16845a] animate-pulse" />
                [CONCEPTUAL PRODUCT DESIGN PROJECT]
              </span>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                ESTUDO AUTORAL DE PRODUTO B2B // PROCUREMENT & SUPPLY CHAIN
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  SUPPLYHUB
                </h1>
                <span className="px-3 py-1 bg-[#16845a] text-white font-mono font-black text-xs sm:text-sm rounded shadow-lg shadow-[#16845a]/20">
                  B2B PROCUREMENT
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-mono text-[#3cd68e] font-medium">
                Plataforma corporativa de compras: Pesquisa, Cotações, Negociação e Gestão de Fornecedores.
              </p>
              <p className="text-sm font-mono text-neutral-400">
                &ldquo;Centralizando o ciclo completo de suprimentos corporativos em uma interface clara, previsível e sem silos operacionais.&rdquo;
              </p>
            </div>

            {/* Editorial Statement */}
            <div className="p-6 border-l-4 border-[#16845a] bg-neutral-900/70 border-y border-r border-neutral-800 rounded-r-sm space-y-3 shadow-2xl">
              <blockquote className="text-xl sm:text-2xl text-white font-light leading-relaxed">
                &ldquo;Quando os processos de compras deixam de ser dispersos entre e-mails e planilhas, empresas ganham poder de negociação, previsibilidade de entrega e auditoria contínua.&rdquo;
              </blockquote>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Um projeto conceitual de Product Design focado em resolver as dores reais da cadeia de suprimentos: busca de peças, cotações multilaterais, contrapropostas em tempo real, aprovações por alçadas de valor e acompanhamento ponta a ponta.
              </p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-neutral-800 text-xs font-mono">
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block uppercase tracking-wider font-semibold">ROLE</span>
              <p className="text-white font-semibold text-sm">Product Designer</p>
              <span className="text-[11px] text-neutral-400">Marcus Ritta</span>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block uppercase tracking-wider font-semibold">PROJECT TYPE</span>
              <p className="text-[#3cd68e] font-semibold text-sm">Conceptual Design</p>
              <span className="text-[11px] text-neutral-400">Projeto Autoral Completo</span>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block uppercase tracking-wider font-semibold">DOMAIN</span>
              <p className="text-white font-semibold text-sm">B2B Procurement</p>
              <span className="text-[11px] text-neutral-400">Supply Chain & Marketplace</span>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block uppercase tracking-wider font-semibold">DESIGN SYSTEM</span>
              <p className="text-[#3cd68e] font-semibold text-sm">Emerald Clean Slate</p>
              <span className="text-[11px] text-neutral-400">#16845a & #F8FAF9 High-Density</span>
            </div>
          </div>

          {/* Executive Project Badge */}
          <div className="p-3.5 bg-neutral-900/50 border border-neutral-800 rounded-sm text-xs font-mono text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#16845a]" />
              <strong className="text-white">Projeto Autoral:</strong>
              <span className="text-neutral-400">Design de Produto B2B &amp; Prototipagem Funcional em React</span>
            </div>
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider">
              Arquitetura de Suprimentos • RFQ Matrix • Sandbox Live
            </span>
          </div>

          {/* ========================================================================= */}
          {/* 01.1 HERO INTERFACE BANNER (EMERALD PROCUREMENT MATRIX & RFQ COCKPIT)     */}
          {/* ========================================================================= */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16845a] animate-pulse"></span>
                <span className="text-[#3cd68e] font-bold uppercase tracking-wider">
                  Artefato Visual: Matriz de Equalização Multilateral // RFQ #8492
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 bg-neutral-900 px-2.5 py-1 border border-neutral-800 rounded-sm">
                B2B Procurement Engine
              </span>
            </div>

            {/* Window Container Frame */}
            <div className="border border-neutral-800 bg-[#070b0e] rounded-sm shadow-2xl overflow-hidden relative group font-mono text-xs select-none">
              {/* Subtle top glow */}
              <div className="absolute top-0 right-1/4 w-80 h-32 bg-[#16845a]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-neutral-300 text-[11px] ml-2 font-medium">
                    SUPPLYHUB 2024 // Equalização Técnica de Propostas • 3 Fornecedores Homologados
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="px-2 py-0.5 bg-[#16845a]/20 text-[#3cd68e] border border-[#16845a]/40 rounded font-bold">
                    ✓ ALÇADA APROVADA: DIRETORIA
                  </span>
                </div>
              </div>

              {/* Cockpit Content Image Preview */}
              <div className="relative aspect-[16/9] w-full bg-[#070b0e] overflow-hidden group/hero">
                <Image
                  src="/cases/supplyhub-cover.jpg"
                  alt="Painel de Compras B2B SUPPLYHUB"
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover/hero:scale-[1.02]"
                  priority
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 text-white text-[11px] font-mono flex items-center gap-2 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-[#16845a] animate-pulse" />
                  <span>SUPPLYHUB // Matriz de Equalização Multilateral &amp; TCO</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#0a1510]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#16845a]/50 text-[#3cd68e] text-[11px] font-mono shadow-xl hidden sm:flex items-center gap-1.5">
                  <span>Decisão por TCO • Cotações Multilaterais • Alçadas de Aprovação</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. O DESAFIO E A JORNADA DE COMPRAS                                      */}
      {/* ========================================================================= */}
      <section id="problema" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#3cd68e] uppercase tracking-widest font-semibold block">
              02 — O CENÁRIO REAL DE COMPRAS B2B
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              O Problema da Fragmentação Operacional
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Em empresas de médio e grande porte, o setor de compras lida com dezenas de fornecedores simultaneamente. Sem uma plataforma centralizada, o fluxo vira uma colcha de retalhos entre conversas de WhatsApp, e-mails esquecidos e planilhas com dados defasados.
            </p>
          </div>

          {/* Before vs After Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* The Broken Traditional Way */}
            <div className="p-6 bg-neutral-900/50 border border-rose-950/60 rounded-sm space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center space-x-2 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="font-bold text-sm uppercase">Cenário Tradicional Fragmentado</span>
                </div>
                <span className="text-[10px] text-neutral-500">4+ Canais Desconectados</span>
              </div>
              <ul className="space-y-3 text-neutral-300 text-xs">
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Cotação Lenta: </strong>Compradores copiam preços manualmente de PDFs e e-mails para planilhas que perdem a validade em 24h.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Comparação Complexa: </strong>Dificuldade de comparar frete CIF vs FOB, prazos de entrega e condições de faturamento lado a lado.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Aprovações Cegas: </strong>Diretores aprovam pedidos por mensagem de texto sem visualizar o saldo de orçamento nem o histórico do fornecedor.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Rastreio Opaco: </strong>Após a emissão da ordem de compra, a entrega vira uma incógnita até que a carga física chegue na doca.</span>
                </li>
              </ul>
            </div>

            {/* The SupplyHub Solution */}
            <div className="p-6 bg-[#0c1813] border border-[#16845a]/60 rounded-sm space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center space-x-2 text-[#3cd68e]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16845a] animate-pulse" />
                  <span className="font-bold text-sm uppercase">Cenário SupplyHub Centralizado</span>
                </div>
                <span className="text-[10px] bg-[#16845a]/20 text-[#3cd68e] px-2 py-0.5 rounded font-bold">Plataforma Única</span>
              </div>
              <ul className="space-y-3 text-neutral-300 text-xs">
                <li className="flex items-start space-x-2">
                  <span className="text-[#3cd68e] font-bold shrink-0">✓</span>
                  <span><strong>Catálogo Unificado: </strong>Busca de produtos com filtros de pronta entrega, homologação de fornecedores e cálculo de TCO em tempo real.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#3cd68e] font-bold shrink-0">✓</span>
                  <span><strong>Matriz Comparativa: </strong>Análise automática da melhor proposta considerando preço unitário, frete, SLA de entrega e prazos.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#3cd68e] font-bold shrink-0">✓</span>
                  <span><strong>Mesa de Negociação: </strong>Contrapropostas de desconto por lote e flexibilização de prazos com trilha de auditoria completa.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#3cd68e] font-bold shrink-0">✓</span>
                  <span><strong>Alçadas Automatizadas: </strong>Regras de aprovação por teto de valor garantindo compliance sem travar compras rotineiras.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Journey Steps Horizontal Flow */}
          <div className="space-y-4 pt-4">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Jornada Ponta a Ponta: Da Descoberta ao Recebimento
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-mono">
              {[
                { step: "01", name: "Pesquisa", desc: "Catálogo e filtros" },
                { step: "02", name: "Comparação", desc: "Matriz de TCO" },
                { step: "03", name: "Cotação", desc: "RFQ multilateral" },
                { step: "04", name: "Negociação", desc: "Contrapropostas" },
                { step: "05", name: "Aprovação", desc: "Alçadas por valor" },
                { step: "06", name: "Compra", desc: "PO confirmada" },
                { step: "07", name: "Rastreio", desc: "Status e entrega" },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-1 relative group hover:border-[#16845a] transition-colors"
                >
                  <span className="text-[10px] text-[#3cd68e] font-bold block">{item.step}</span>
                  <strong className="text-white text-xs block">{item.name}</strong>
                  <span className="text-[10px] text-neutral-400 block">{item.desc}</span>
                  {idx < 6 && (
                    <span className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-neutral-600 z-10">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. REGRAS DE NEGÓCIO E GOVERNANÇA B2B                                    */}
      {/* ========================================================================= */}
      <section id="regras" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#3cd68e] uppercase tracking-widest font-semibold block">
              03 — ARQUITETURA DE REGRAS DE NEGÓCIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Governança Corporativa e Alçadas
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Sistemas de compras não são simples e-commerces. Cada clique envolve dinheiro de terceiros, limites orçamentários, compliance fiscal e regras de aprovação multinível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-[#3cd68e]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">Alçadas de Aprovação</span>
              </div>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Compras até <strong>R$ 5.000,00</strong> têm liberação direta pelo comprador. Entre <strong>R$ 5k e R$ 25k</strong> exigem aval do Gerente de Suprimentos. Valores acima demandam aprovação da Diretoria Executiva / CFO.
              </p>
              <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
                Garante agilidade em reposição de giro e controle rígido em grandes lotes.
              </div>
            </div>

            <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-[#3cd68e]">
                <Clock className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">SLAs de Resposta de Cotação</span>
              </div>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Fornecedores recebem a RFQ com cronômetro de validade (24h a 72h). Propostas que não responderem no prazo têm o status marcado como expirado, liberando o comprador para fechar com a segunda melhor oferta.
              </p>
              <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
                Elimina a espera infinita e mantém o índice de pontualidade atualizado.
              </div>
            </div>

            <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-[#3cd68e]">
                <FileText className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">Contrapropostas Auditáveis</span>
              </div>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Cada rodada de negociação (desconto por volume, prorrogação de prazo de pagamento ou frete bonificado) é registrada com timestamp e usuário responsável, impedindo alterações informais por fora do sistema.
              </p>
              <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
                Trilha completa de compliance para auditorias contábeis internas e externas.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. SISTEMA INTERATIVO (SUPPLYHUB WORKSPACE)                              */}
      {/* ========================================================================= */}
      <section id="workspace" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16845a] animate-pulse" />
                <span className="text-xs font-mono text-[#3cd68e] uppercase tracking-widest font-semibold block">
                  04 — PROTÓTIPO INTERATIVO DO SISTEMA
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                SupplyHub B2B Workspace Simulator
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed font-normal">
                Navegue livremente pelo sistema operacional de compras abaixo. Teste a árvore de navegação completa, compare fornecedores na matriz de cotações, simule contrapropostas com o slider e aprove requisições pendentes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded">
                Sidebar: 246px
              </span>
              <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded">
                Topbar: 64px
              </span>
              <span className="px-2.5 py-1 bg-[#16845a]/20 text-[#3cd68e] border border-[#16845a]/40 rounded font-bold">
                Design Real Navegável
              </span>
            </div>
          </div>

          {/* EMBEDDED SUPPLYHUB WORKSPACE */}
          <div className="relative">
            <SupplyHubWorkspace />
          </div>

          {/* Workspace Quick Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs pt-4 border-t border-neutral-800 text-neutral-400">
            <div className="p-3 bg-neutral-900/40 rounded border border-neutral-800">
              <strong className="text-white block mb-1">1. Navegação Modular</strong>
              Use a barra lateral para alternar entre <em>Dashboard</em>, <em>Pesquisa</em>, <em>Cotações</em>, <em>Pedidos</em> e <em>Aprovações</em>.
            </div>
            <div className="p-3 bg-neutral-900/40 rounded border border-neutral-800">
              <strong className="text-white block mb-1">2. Sub-Abas Conectadas</strong>
              Dentro de cada módulo, use a barra superior de abas para navegar pelas telas filhas da árvore de navegação.
            </div>
            <div className="p-3 bg-neutral-900/40 rounded border border-neutral-800">
              <strong className="text-white block mb-1">3. Ações Interativas</strong>
              Teste o slider de desconto na <em>Mesa de Negociação</em> e clique em aprovar/recusar na <em>Central de Aprovações</em>.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. ARQUITETURA DA INFORMAÇÃO & ÁRVORE DE TELAS                           */}
      {/* ========================================================================= */}
      <section id="arquitetura" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#3cd68e] uppercase tracking-widest font-semibold block">
              05 — ARQUITETURA DA INFORMAÇÃO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Árvore Estrutural de Telas & Módulos
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              A arquitetura do SupplyHub foi organizada para garantir que compradores encontrem qualquer informação em no máximo 2 cliques, mantendo o workspace operacional separado da governança administrativa.
            </p>
          </div>

          {/* Interactive Tree Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
            {/* Visual Tree Breakdown */}
            <div className="lg:col-span-6 p-6 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-neutral-400">
                <span className="font-bold text-white uppercase flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#3cd68e]" />
                  Estrutura Hierárquica do Sistema
                </span>
                <span className="text-[10px]">Clique para inspecionar</span>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                {/* Root */}
                <div className="font-bold text-[#3cd68e] text-sm">SUPPLYHUB</div>
                <div className="pl-4 space-y-3 border-l-2 border-neutral-800">
                  {/* Dashboard */}
                  <div>
                    <button
                      onClick={() => setSelectedTreeNode("dashboard")}
                      className={`text-left px-2 py-1 rounded transition-colors ${
                        selectedTreeNode === "dashboard"
                          ? "bg-[#16845a] text-white font-bold"
                          : "text-white hover:text-[#3cd68e]"
                      }`}
                    >
                      ├── Dashboard
                    </button>
                  </div>

                  {/* Pesquisa */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedTreeNode("pesquisa")}
                      className={`text-left px-2 py-1 rounded transition-colors ${
                        selectedTreeNode === "pesquisa"
                          ? "bg-[#16845a] text-white font-bold"
                          : "text-white hover:text-[#3cd68e]"
                      }`}
                    >
                      ├── Pesquisa
                    </button>
                    <div className="pl-4 space-y-0.5 text-neutral-400">
                      <div>│   ├── Busca de produtos</div>
                      <div>│   ├── Filtros</div>
                      <div>│   ├── Resultado</div>
                      <div>│   └── Produto</div>
                    </div>
                  </div>

                  {/* Cotações */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedTreeNode("cotacoes")}
                      className={`text-left px-2 py-1 rounded transition-colors ${
                        selectedTreeNode === "cotacoes"
                          ? "bg-[#16845a] text-white font-bold"
                          : "text-white hover:text-[#3cd68e]"
                      }`}
                    >
                      ├── Cotações
                    </button>
                    <div className="pl-4 space-y-0.5 text-neutral-400">
                      <div>│   ├── Lista</div>
                      <div>│   ├── Nova cotação</div>
                      <div>│   ├── Comparar fornecedores</div>
                      <div>│   ├── Cotação</div>
                      <div>│   └── Negociação</div>
                    </div>
                  </div>

                  {/* Pedidos */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedTreeNode("pedidos")}
                      className={`text-left px-2 py-1 rounded transition-colors ${
                        selectedTreeNode === "pedidos"
                          ? "bg-[#16845a] text-white font-bold"
                          : "text-white hover:text-[#3cd68e]"
                      }`}
                    >
                      ├── Pedidos
                    </button>
                    <div className="pl-4 space-y-0.5 text-neutral-400">
                      <div>│   ├── Todos</div>
                      <div>│   ├── Em aprovação</div>
                      <div>│   ├── Confirmados</div>
                      <div>│   ├── Enviados</div>
                      <div>│   └── Entregues</div>
                    </div>
                  </div>

                  {/* Fornecedores */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedTreeNode("fornecedores")}
                      className={`text-left px-2 py-1 rounded transition-colors ${
                        selectedTreeNode === "fornecedores"
                          ? "bg-[#16845a] text-white font-bold"
                          : "text-white hover:text-[#3cd68e]"
                      }`}
                    >
                      ├── Fornecedores
                    </button>
                    <div className="pl-4 space-y-0.5 text-neutral-400">
                      <div>│   ├── Lista</div>
                      <div>│   ├── Perfil</div>
                      <div>│   ├── Produtos</div>
                      <div>│   └── Histórico</div>
                    </div>
                  </div>

                  {/* Aprovações */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedTreeNode("aprovacoes")}
                      className={`text-left px-2 py-1 rounded transition-colors ${
                        selectedTreeNode === "aprovacoes"
                          ? "bg-[#16845a] text-white font-bold"
                          : "text-white hover:text-[#3cd68e]"
                      }`}
                    >
                      ├── Aprovações
                    </button>
                    <div className="pl-4 space-y-0.5 text-neutral-400">
                      <div>│   ├── Pendentes</div>
                      <div>│   ├── Aprovadas</div>
                      <div>│   └── Rejeitadas</div>
                    </div>
                  </div>

                  {/* Relatórios */}
                  <div>
                    <button
                      onClick={() => setSelectedTreeNode("relatorios")}
                      className={`text-left px-2 py-1 rounded transition-colors ${
                        selectedTreeNode === "relatorios"
                          ? "bg-[#16845a] text-white font-bold"
                          : "text-white hover:text-[#3cd68e]"
                      }`}
                    >
                      ├── Relatórios
                    </button>
                  </div>

                  {/* Configurações */}
                  <div>
                    <button
                      onClick={() => setSelectedTreeNode("configuracoes")}
                      className={`text-left px-2 py-1 rounded transition-colors ${
                        selectedTreeNode === "configuracoes"
                          ? "bg-[#16845a] text-white font-bold"
                          : "text-white hover:text-[#3cd68e]"
                      }`}
                    >
                      └── Configurações
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tree Details Card */}
            <div className="lg:col-span-6 p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs text-[#3cd68e] font-bold uppercase">
                  Detalhamento do Módulo Selecionado
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px]">
                  {selectedTreeNode.toUpperCase()}
                </span>
              </div>

              {selectedTreeNode === "dashboard" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">Dashboard Central & Visão Geral</h3>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Ponto de partida do comprador. Agrupa 4 cards de KPIs essenciais (cotações abertas, pedidos em trânsito, pendências de aprovação e fornecedores ativos), gráfico semestral de volume de compras e o feed com as próximas ações operacionais.
                  </p>
                  <div className="p-3 bg-black/40 rounded border border-neutral-800 space-y-1 text-[11px] text-neutral-400">
                    <strong className="text-white block">Decisão de Design:</strong>
                    Tabela de cotações recentes logo abaixo dos gráficos permite que o operador retome negociações sem precisar navegar para outro módulo.
                  </div>
                </div>
              )}

              {selectedTreeNode === "pesquisa" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">Pesquisa de Produtos & Catálogo</h3>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Motor de busca por código OEM, fabricante, aplicação automotiva e especificações técnicas. Suporta filtros laterais rápidos por prazo de entrega (pronta entrega vs lote industrial) e modalidade de frete (CIF/FOB).
                  </p>
                  <div className="p-3 bg-black/40 rounded border border-neutral-800 space-y-1 text-[11px] text-neutral-400">
                    <strong className="text-white block">Subtelas do Módulo:</strong>
                    Busca de produtos → Filtros dinâmicos → Grid de resultados com estoque em tempo real → Ficha técnica com múltiplos distribuidores homologados.
                  </div>
                </div>
              )}

              {selectedTreeNode === "cotacoes" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">Cotações & Mesa de Negociação</h3>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Coração do procurement B2B. Permite disparar RFQs para 3+ distribuidores com 1 clique e inspecionar a matriz de comparação automática destacando o menor Custo Total de Aquisição (TCO).
                  </p>
                  <div className="p-3 bg-black/40 rounded border border-neutral-800 space-y-1 text-[11px] text-neutral-400">
                    <strong className="text-white block">Mesa de Negociação:</strong>
                    Inclui slider de contraproposta com recálculo instantâneo de economia e seletor de prazos de faturamento (30, 60 ou 90 dias).
                  </div>
                </div>
              )}

              {selectedTreeNode === "pedidos" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">Gestão de Pedidos (Orders Lifecycle)</h3>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Acompanhamento visual dos pedidos divididos por estágio: <em>Todos</em>, <em>Em aprovação</em>, <em>Confirmados</em>, <em>Enviados</em> e <em>Entregues</em>. Cada card exibe transportadora, estimativa de entrega (ETA) e progresso percentual da rota.
                  </p>
                  <div className="p-3 bg-black/40 rounded border border-neutral-800 space-y-1 text-[11px] text-neutral-400">
                    <strong className="text-white block">Previsibilidade:</strong>
                    Elimina surpresas no recebimento de doca e avisa o comprador caso haja atraso na expedição.
                  </div>
                </div>
              )}

              {selectedTreeNode === "fornecedores" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">Rede de Fornecedores Homologados</h3>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Histórico de desempenho de cada parceiro comercial: índice de pontualidade no prazo (SLA %), certificações ISO de qualidade, histórico de devoluções e catálogo de peças vinculadas.
                  </p>
                  <div className="p-3 bg-black/40 rounded border border-neutral-800 space-y-1 text-[11px] text-neutral-400">
                    <strong className="text-white block">Compliance:</strong>
                    Fornecedores com SLA abaixo de 90% recebem aviso visual de revisão de homologação.
                  </div>
                </div>
              )}

              {selectedTreeNode === "aprovacoes" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">Central de Aprovações & Alçadas</h3>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Fila unificada para gestores e diretores. Reúne requisições que excederam a alçada padrão do comprador, com dados sobre saldo restante no centro de custo, justificativa do pedido e botões de ação imediata.
                  </p>
                  <div className="p-3 bg-black/40 rounded border border-neutral-800 space-y-1 text-[11px] text-neutral-400">
                    <strong className="text-white block">Sub-Abas:</strong>
                    Pendentes de aprovação → Aprovadas no mês corrente → Reprovadas com justificativa.
                  </div>
                </div>
              )}

              {selectedTreeNode === "relatorios" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">Relatórios Gerenciais & Spend Analysis</h3>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Indicadores estratégicos de suprimentos: economia acumulada gerada por negociação direta, tempo médio de ciclo da cotação ao recebimento (Procure-to-Pay) e aderência ao orçamento por centro de custo.
                  </p>
                </div>
              )}

              {selectedTreeNode === "configuracoes" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">Configurações & Parâmetros da Empresa</h3>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Customização das alçadas de aprovação em reais, gerenciamento dos membros da equipe com papéis RBAC e parametrização dos alertas de estoque mínimo do ERP.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. MATRIZ DE ACESSO E PERMISSÕES (RBAC)                                  */}
      {/* ========================================================================= */}
      <section id="rbac" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#3cd68e] uppercase tracking-widest font-semibold block">
              06 — CONTROLE DE ACESSO BASEADO EM FUNÇÃO (RBAC)
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Matriz de Permissões por Perfil de Usuário
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Para atender empresas com múltiplos níveis hierárquicos e fornecedores externos, a interface do SupplyHub adapta suas permissões de acordo com o papel logado.
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {[
              { id: "comprador", label: "Comprador Operacional" },
              { id: "gerente", label: "Gerente de Suprimentos" },
              { id: "diretor", label: "Diretoria Financeira / CFO" },
              { id: "fornecedor", label: "Distribuidor Externo" },
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as any)}
                className={`px-4 py-2 rounded-sm border transition-colors ${
                  selectedRole === role.id
                    ? "bg-[#16845a] text-white font-bold border-[#16845a]"
                    : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          {/* Role Permissions Matrix Table */}
          <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="font-bold text-white uppercase">
                Permissões Ativas para:{" "}
                <span className="text-[#3cd68e]">
                  {selectedRole === "comprador" && "Comprador Operacional"}
                  {selectedRole === "gerente" && "Gerente de Suprimentos"}
                  {selectedRole === "diretor" && "Diretoria Financeira / CFO"}
                  {selectedRole === "fornecedor" && "Distribuidor Externo (Portal Fornecedor)"}
                </span>
              </span>
              <span className="text-[10px] text-neutral-400">Controle Granular</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-black/40 rounded border border-neutral-800 space-y-2">
                <span className="text-neutral-500 uppercase text-[10px] font-bold block">
                  Pesquisa & Catálogo
                </span>
                <p className="text-white font-bold">
                  {selectedRole === "fornecedor" ? "Acesso Restrito" : "Acesso Completo"}
                </p>
                <span className="text-neutral-400 text-[11px] block">
                  {selectedRole === "fornecedor"
                    ? "Apenas visualiza seus próprios itens cadastrados."
                    : "Consulta catálogo completo de distribuidores."}
                </span>
              </div>

              <div className="p-4 bg-black/40 rounded border border-neutral-800 space-y-2">
                <span className="text-neutral-500 uppercase text-[10px] font-bold block">
                  Criação de Cotações
                </span>
                <p className="text-white font-bold">
                  {selectedRole === "fornecedor" ? "Não Autorizado" : "Habilitado"}
                </p>
                <span className="text-neutral-400 text-[11px] block">
                  {selectedRole === "fornecedor"
                    ? "Fornecedor apenas responde com preço."
                    : "Abre RFQs e envia contrapropostas."}
                </span>
              </div>

              <div className="p-4 bg-black/40 rounded border border-neutral-800 space-y-2">
                <span className="text-neutral-500 uppercase text-[10px] font-bold block">
                  Alçada de Aprovação
                </span>
                <p className="text-[#3cd68e] font-bold">
                  {selectedRole === "comprador" && "Até R$ 5.000,00"}
                  {selectedRole === "gerente" && "Até R$ 25.000,00"}
                  {selectedRole === "diretor" && "Ilimitada (C-Level)"}
                  {selectedRole === "fornecedor" && "N/A (Externo)"}
                </p>
                <span className="text-neutral-400 text-[11px] block">
                  {selectedRole === "comprador" && "Requer aprovação para valores superiores."}
                  {selectedRole === "gerente" && "Libera pedidos de equipe até R$ 25k."}
                  {selectedRole === "diretor" && "Valida investimentos de grande porte."}
                  {selectedRole === "fornecedor" && "Sem acesso às aprovações do cliente."}
                </span>
              </div>

              <div className="p-4 bg-black/40 rounded border border-neutral-800 space-y-2">
                <span className="text-neutral-500 uppercase text-[10px] font-bold block">
                  Parâmetros de Empresa
                </span>
                <p className="text-white font-bold">
                  {selectedRole === "gerente" || selectedRole === "diretor"
                    ? "Configuração Total"
                    : "Apenas Leitura"}
                </p>
                <span className="text-neutral-400 text-[11px] block">
                  Edição de tetos e políticas de suprimentos.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. PLANO DE VALIDAÇÃO & MÉTRICAS DE SUCESSO                              */}
      {/* ========================================================================= */}
      <section id="metricas" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#3cd68e] uppercase tracking-widest font-semibold block">
              07 — VALIDAÇÃO CONCEITUAL & CRITÉRIOS DE SUCESSO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Como Medir a Eficiência de uma Plataforma B2B
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Em projetos conceituais de Product Design, o sucesso não deve ser inventado com números falsos, mas estruturado através de um protocolo sólido de validação e métricas de impacto claras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-3">
              <span className="text-xs text-[#3cd68e] font-bold block uppercase">
                Métrica 01 — Time-to-Quote (TTQ)
              </span>
              <strong className="text-white text-sm block">Tempo Médio de Fechamento de Cotação</strong>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Mede a quantidade de horas desde o disparo da RFQ multilateral até a seleção final da proposta vencedora.
              </p>
              <span className="text-[11px] text-neutral-500 block pt-2 border-t border-neutral-800">
                Meta de Design: Reduzir de 3 dias úteis para menos de 4 horas operacionais.
              </span>
            </div>

            <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-3">
              <span className="text-xs text-[#3cd68e] font-bold block uppercase">
                Métrica 02 — Redução do TCO
              </span>
              <strong className="text-white text-sm block">Economia Real na Matriz Comparativa</strong>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Diferença percentual obtida entre o preço de tabela do distribuidor e o valor final negociado na plataforma.
              </p>
              <span className="text-[11px] text-neutral-500 block pt-2 border-t border-neutral-800">
                Meta de Design: Facilitar contrapropostas rápidas com economia média entre 6% e 12%.
              </span>
            </div>

            <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-3">
              <span className="text-xs text-[#3cd68e] font-bold block uppercase">
                Métrica 03 — Aderência às Alçadas
              </span>
              <strong className="text-white text-sm block">Zero Compras Não Conformes</strong>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Percentual de ordens de compra emitidas sem violação das regras de limite financeiro e sem requisição retroativa.
              </p>
              <span className="text-[11px] text-neutral-500 block pt-2 border-t border-neutral-800">
                Meta de Design: 100% de rastreabilidade de aprovações em auditoria contábil.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. PAPEL & APRENDIZADOS DE PRODUCT DESIGN                                */}
      {/* ========================================================================= */}
      <section id="aprendizados" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#3cd68e] uppercase tracking-widest font-semibold block">
              08 — REFLEXÕES DE DESIGN DE SISTEMAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Aprendizados de Product Design para B2B Complexo
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Construir interfaces para operações corporativas densas exige equilíbrio entre densidade de dados e clareza cognitiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-3">
              <strong className="text-white text-sm block">
                1. Densidade com Hierarquia não é Poluição Visual
              </strong>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Compradores profissionais não querem botões gigantes ou animações lentas que atrasam a digitação de 100 itens. Eles precisam de tabelas compactas, atalhos de teclado (como ⌘ K) e feedback visual imediato.
              </p>
            </div>

            <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-3">
              <strong className="text-white text-sm block">
                2. Comparar Preço sem Frete e Prazo é um Erro Grave
              </strong>
              <p className="text-neutral-300 text-xs leading-relaxed">
                No B2B, a peça mais barata pode sair mais cara se o frete for FOB e o caminhão demorar 7 dias a mais. O papel do Product Designer é estruturar o Custo Total de Aquisição (TCO) de forma transparente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CASE STUDY FOOTER NAVIGATION                                              */}
      {/* ========================================================================= */}
      <footer className="py-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-neutral-800 pt-12 text-xs font-mono">
          {prevCase ? (
            <Link
              href={`/work/${prevCase.slug}`}
              className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Case Anterior</span>
                <span className="font-bold text-white">{prevCase.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/work"
            className="px-4 py-2 border border-neutral-800 hover:border-neutral-600 rounded text-neutral-300 hover:text-white transition-colors"
          >
            Ver Todos os Cases
          </Link>

          {nextCase ? (
            <Link
              href={`/work/${nextCase.slug}`}
              className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors group text-right"
            >
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Próximo Case</span>
                <span className="font-bold text-white">{nextCase.title}</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </div>
  );
}
