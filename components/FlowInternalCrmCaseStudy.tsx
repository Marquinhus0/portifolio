"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Store,
  Phone,
  MessageSquare,
  Award,
  Zap,
  Briefcase,
  Calendar,
  HelpCircle,
} from "lucide-react";
import { CaseStudy } from "@/types";
import FlowCrmShowcase from "./FlowCrmShowcase";

interface FlowInternalCrmCaseStudyProps {
  caseStudy: CaseStudy;
  nextCase: CaseStudy;
  prevCase: CaseStudy;
}

export default function FlowInternalCrmCaseStudy({
  caseStudy,
  nextCase,
  prevCase,
}: FlowInternalCrmCaseStudyProps) {
  // Navigation active section anchor
  const [activeNav, setActiveNav] = useState("overview");

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
    { id: "problema", label: "02. O Desafio Comercial" },
    { id: "conceito", label: "03. Conceito do Funil" },
    { id: "workspace", label: "04. Aplicação Interativa" },
    { id: "personas", label: "05. Personas & Rotina" },
    { id: "arquitetura", label: "06. Arquitetura & UX" },
    { id: "designsystem", label: "07. Design System & Tokens" },
    { id: "metricas", label: "08. Métricas & Resultados" },
    { id: "aprendizados", label: "09. Aprendizados" },
  ];

  return (
    <div className="bg-[#080808] text-white min-h-screen selection:bg-[#1683E8] selection:text-white font-sans antialiased">
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
            <span className="text-[#1683E8] font-semibold">FLOW CRM // PIPELINE B2B</span>
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
                  ? "bg-[#1683E8] text-white font-bold shadow-md shadow-[#1683E8]/20"
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
              <span className="px-2.5 py-1 text-xs font-mono font-bold tracking-widest uppercase bg-[#1683E8]/20 border border-[#1683E8]/40 text-[#1683E8] rounded-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1683E8] animate-pulse" />
                [CONCEPTUAL PRODUCT DESIGN PROJECT]
              </span>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                ESTUDO AUTORAL DE PRODUTO B2B // GESTÃO COMERCIAL ENTERPRISE
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  FLOW CRM
                </h1>
                <span className="px-3 py-1 bg-[#1683E8] text-white font-mono font-black text-xs sm:text-sm rounded shadow-lg shadow-[#1683E8]/20">
                  B2B PIPELINE
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-mono text-[#1683E8] font-medium">
                Central de Operações Comerciais para Distribuidoras, Indústrias e Negócios B2B.
              </p>
              <p className="text-sm font-mono text-neutral-400">
                &ldquo;Transformando a rotina do time comercial B2B em uma operação previsível, veloz e sem oportunidades esquecidas.&rdquo;
              </p>
            </div>

            {/* Editorial Statement */}
            <div className="p-6 border-l-4 border-[#1683E8] bg-neutral-900/70 border-y border-r border-neutral-800 rounded-r-sm space-y-3 shadow-2xl">
              <blockquote className="text-xl sm:text-2xl text-white font-light leading-relaxed">
                &ldquo;Um CRM não deve ser apenas um depósito burocrático de contatos. Ele precisa funcionar como a central de comando da venda: o vendedor deve abrir o sistema e saber instantaneamente quem atender primeiro, qual é o próximo passo e quanto há em jogo no pipeline.&rdquo;
              </blockquote>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Projetado para vendas consultivas e operações B2B de alto volume, o Flow CRM une a simplicidade tática para quem fecha negócios via WhatsApp e telefone à profundidade analítica exigida por gestores comerciais de alta performance.
              </p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-neutral-800 text-xs font-mono">
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block uppercase tracking-wider font-semibold">ROLE</span>
              <p className="text-white font-semibold text-sm">Product Designer & Front-End</p>
              <span className="text-[11px] text-neutral-400">Marcus Ritta</span>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block uppercase tracking-wider font-semibold">PROJECT NATURE</span>
              <p className="text-[#1683E8] font-semibold text-sm">Conceptual B2B SaaS</p>
              <span className="text-[11px] text-neutral-400">Estudo Autoral Completo</span>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block uppercase tracking-wider font-semibold">ECOSYSTEM</span>
              <p className="text-white font-semibold text-sm">Plataforma Comercial B2B</p>
              <span className="text-[11px] text-neutral-400">Vendas Consultivas & Atacado</span>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-1">
              <span className="text-neutral-500 block uppercase tracking-wider font-semibold">DESIGN SYSTEM</span>
              <p className="text-[#1683E8] font-semibold text-sm">Precision Blue & Neutral</p>
              <span className="text-[11px] text-neutral-400">#1683E8, #123B63 & #F5F7FA</span>
            </div>
          </div>

          {/* Executive Project Badge */}
          <div className="p-3.5 bg-neutral-900/50 border border-neutral-800 rounded-sm text-xs font-mono text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#1683E8]" />
              <strong className="text-white">Projeto Autoral &amp; Engenharia Front-End:</strong>
              <span className="text-neutral-400">Design System Corporativo, Pipeline Kanban Drag &amp; Drop e Sandbox Funcional</span>
            </div>
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider">
              CRM B2B Enterprise • Pipeline Kanban • React TS
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. O DESAFIO COMERCIAL DE VENDAS COMPLEXAS B2B                           */}
      {/* ========================================================================= */}
      <section id="problema" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683E8] uppercase tracking-widest font-semibold block">
              02 — O CENÁRIO REAL DE VENDAS COMPLEXAS B2B
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              A Fricção entre Vendas, WhatsApp e Planilhas Paralelas
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Em vendas consultivas B2B e distribuição, a velocidade de atendimento é decisiva. Compradores corporativos que solicitam cotações de grande volume fecham com o fornecedor que responder primeiro com precisão de estoque, condições comerciais claras e agilidade no contato. Quando a equipe comercial opera com ferramentas genéricas ou planilhas soltas, três gargalos graves acontecem:
            </p>
          </div>

          {/* 3 Core Pains Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-3 hover:border-[#1683E8]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-mono font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Leads Dispersos Sem Próximo Passo</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Contatos chegam via Google Ads, WhatsApp comercial, feiras setoriais e indicações, mas se perdem sem registro centralizado. O vendedor abre o dia sem saber qual cliente priorizar.
              </p>
            </div>

            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-3 hover:border-[#1683E8]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Oportunidades Estagnadas (Sem Follow-up)</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Propostas comerciais e contratos corporativos ficam mais de 3 dias sem contato por falta de alerta de SLA, permitindo que concorrentes ocupem o espaço e fechem com o cliente.
              </p>
            </div>

            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-3 hover:border-[#1683E8]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Cegueira nos Motivos de Perda</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Negócios são marcados como perdidos sem motivo registrado. A gestão não sabe se perdeu por preço, concorrente direto, timing ou falta de atendimento aos requisitos do cliente.
              </p>
            </div>
          </div>

          {/* Comparison Table: Legado vs Flow CRM */}
          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-sm space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-300">
              Comparativo de Operação: Sistema Genérico vs. Flow CRM Integrado
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 font-mono">
                    <th className="py-2.5 px-3">Critério Operacional</th>
                    <th className="py-2.5 px-3 text-rose-400">Operação Comum / CRM Genérico</th>
                    <th className="py-2.5 px-3 text-[#1683E8]">Operação Flow CRM (B2B SaaS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-300 font-mono text-[11px]">
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Orientação de Tarefas</td>
                    <td className="py-3 px-3 text-neutral-400">Listas passivas e dispersas em notas soltas</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">Destaque visual compulsório da &ldquo;Próxima Ação&rdquo;</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Comunicação Rápida</td>
                    <td className="py-3 px-3 text-neutral-400">Troca manual de abas com WhatsApp Web pessoal</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">Simulador com modelos prontos de mensagem B2B em 1 clique</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">SLA de Estagnação</td>
                    <td className="py-3 px-3 text-neutral-400">Negócios esfriam semanas sem nenhum alerta</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">Alerta automático de 3 dias sem contato no estágio</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Módulos de Interesse</td>
                    <td className="py-3 px-3 text-neutral-400">Campos de texto livres e inconsistentes</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">Tags corporativas estruturadas (Core, Faturamento, Fiscal, Logística)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Pós-Fechamento</td>
                    <td className="py-3 px-3 text-neutral-400">Redigitação manual de dados no sistema de faturamento</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">Sincronização instantânea com a base de clientes do ERP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. O CONCEITO CENTRAL DO FUNIL                                           */}
      {/* ========================================================================= */}
      <section id="conceito" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683E8] uppercase tracking-widest font-semibold block">
              03 — A JORNADA COMERCIAL B2B
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Do Primeiro Lead à Conversão em Cliente Ativo
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              O Flow CRM foi estruturado em torno do ciclo completo de fechamento B2B, permitindo acompanhar o fluxo visualmente de ponta a ponta:
            </p>
          </div>

          {/* Visual Step-by-step Funnel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-mono">
            {[
              { num: "01", name: "LEAD", desc: "Entrada multicanal", color: "border-blue-500 text-blue-400" },
              { num: "02", name: "QUALIFICAÇÃO", desc: "Perfil de lojas & filiais", color: "border-indigo-500 text-indigo-400" },
              { num: "03", name: "CONTATO", desc: "Primeiro diálogo ativo", color: "border-sky-500 text-sky-400" },
              { num: "04", name: "OPORTUNIDADE", desc: "Demo ERP & Curva ABC", color: "border-amber-500 text-amber-400" },
              { num: "05", name: "PROPOSTA", desc: "Orçamento de software", color: "border-purple-500 text-purple-400" },
              { num: "06", name: "NEGOCIAÇÃO", desc: "Ajuste de alçadas & prazos", color: "border-orange-500 text-orange-400" },
              { num: "07", name: "CLIENTE", desc: "Onboarding & Ativação", color: "border-emerald-500 text-emerald-400" },
            ].map((step, idx) => (
              <div
                key={step.num}
                className={`p-4 bg-neutral-900/60 border-t-2 ${step.color} border-x border-b border-neutral-800 rounded-sm space-y-1.5`}
              >
                <span className="text-[10px] text-neutral-500 font-bold block">{step.num}</span>
                <span className="font-extrabold text-white block">{step.name}</span>
                <span className="text-[10px] text-neutral-400 block">{step.desc}</span>
              </div>
            ))}
          </div>

          {/* 7 Critical Questions Answered */}
          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-sm space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1683E8]">
              As 7 Perguntas que o Vendedor Responde em Menos de 3 Segundos:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-sm">
                <span className="text-[#1683E8] font-bold block mb-1">01. Quem são meus leads?</span>
                <p className="text-neutral-300">Base filtrada por segmento (Distribuição, Indústria, Serviços Corporativos, Logística).</p>
              </div>
              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-sm">
                <span className="text-[#1683E8] font-bold block mb-1">02. De onde eles vieram?</span>
                <p className="text-neutral-300">Atribuição por Google Ads, WhatsApp, Balcão, Evento ou Indicação.</p>
              </div>
              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-sm">
                <span className="text-[#1683E8] font-bold block mb-1">03. Quem precisa ser atendido hoje?</span>
                <p className="text-neutral-300">Painel de follow-ups com checklist e prioridade alta.</p>
              </div>
              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-sm">
                <span className="text-[#1683E8] font-bold block mb-1">04. Quanto temos em negociação?</span>
                <p className="text-neutral-300">Volume total do pipeline e valor ponderado por probabilidade.</p>
              </div>
              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-sm">
                <span className="text-[#1683E8] font-bold block mb-1">05. Quais negócios estão parados?</span>
                <p className="text-neutral-300">Indicadores de dias no estágio com alerta aos 3 dias de inatividade.</p>
              </div>
              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-sm">
                <span className="text-[#1683E8] font-bold block mb-1">06. Por que perdemos negócios?</span>
                <p className="text-neutral-300">Classificação compulsória do motivo (Preço, Concorrente, Timing).</p>
              </div>
              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-sm">
                <span className="text-[#1683E8] font-bold block mb-1">07. Como avançar após o ganho?</span>
                <p className="text-neutral-300">Sincronização imediata com a base do ERP sem retrabalho manual de digitação.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. APLICAÇÃO INTERATIVA COMPLETA (O CORAÇÃO DO CASE)                     */}
      {/* ========================================================================= */}
      <section id="workspace" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="max-w-4xl space-y-3 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#1683E8] uppercase tracking-widest font-semibold block">
                04 — DEMONSTRAÇÃO INTERATIVA COMPLETA
              </span>
              <span className="px-2 py-0.5 bg-[#1683E8] text-white font-mono text-[10px] font-black rounded">
                LIVE WORKSPACE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Flow CRM em Ação (Protótipo Funcional)
            </h2>
            <p className="text-sm text-neutral-300 font-normal leading-relaxed">
              Interaja diretamente com a aplicação comercial. Navegue entre as abas na barra lateral, arraste cards no Kanban, filtre a tabela de leads, abra o perfil 360° com histórico, teste o simulador de WhatsApp comercial B2B e pressione <kbd className="px-1.5 py-0.5 bg-neutral-800 text-white rounded font-mono text-xs border border-neutral-700">Ctrl + K</kbd> para acionar a busca global.
            </p>
          </div>

          {/* Interactive Application Window Wrapper */}
          <div className="border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl bg-white text-[#172033]">
            {/* Window Title Bar */}
            <div className="bg-[#123B63] text-white px-5 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 font-bold tracking-wide">
                  FLOW CRM B2B // CENTRAL DE OPERAÇÕES COMERCIAIS ENTERPRISE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#1683E8] text-white font-bold">
                  SISTEMA 100% OPERACIONAL
                </span>
              </div>
            </div>

            {/* Embedded Live Flow CRM Component */}
            <FlowCrmShowcase />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. PERSONAS & ERGONOMIA DA ROTINA                                        */}
      {/* ========================================================================= */}
      <section id="personas" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683E8] uppercase tracking-widest font-semibold block">
              05 — PESQUISA DE USUÁRIO & PERSONAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Desenhado para a Velocidade Real de Balcão e Gestão
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              A arquitetura do Flow CRM equilibra a simplicidade operacional do vendedor em linha de frente com a inteligência estratégica exigida pela diretoria comercial:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-[#1683E8] flex items-center justify-center font-bold text-sm">
                  JS
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">João Silva (31)</h3>
                  <p className="text-[11px] text-neutral-400 font-mono">Vendedor Comercial / Televendas</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-neutral-300">
                <p><strong>Necessidades:</strong> Acessar contatos com 1 clique, histórico de WhatsApp e saber o próximo passo sem perder tempo preenchendo cadastros longos.</p>
                <p><strong>Comportamento:</strong> Faz mais de 40 contatos diários entre telefone e WhatsApp; odeia interfaces lentas e com muitos cliques.</p>
              </div>
            </div>

            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                  MH
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Marcus Henrique (35)</h3>
                  <p className="text-[11px] text-neutral-400 font-mono">Head Comercial / Gestor B2B</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-neutral-300">
                <p><strong>Necessidades:</strong> Visão do funil comercial, ticket médio, taxa de conversão e relatórios de motivos de perda para orientar políticas de preço.</p>
                <p><strong>Comportamento:</strong> Acompanha o painel diariamente para redistribuir leads estagnados e garantir o cumprimento de metas.</p>
              </div>
            </div>

            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  CS
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Carlos Silva (44)</h3>
                  <p className="text-[11px] text-neutral-400 font-mono">Diretor de Operações B2B (Cliente Comprador)</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-neutral-300">
                <p><strong>Necessidades:</strong> Proposta comercial transparente com módulos de gestão de pedidos, faturamento e integração fiscal para sua operação corporativa.</p>
                <p><strong>Comportamento:</strong> Avalia fornecedores que garantam confiabilidade, suporte técnico ágil e implantação sem parada da operação.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. ARQUITETURA DA INFORMAÇÃO & REGRAS DE UX                              */}
      {/* ========================================================================= */}
      <section id="arquitetura" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683E8] uppercase tracking-widest font-semibold block">
              06 — ARQUITETURA DE INFORMAÇÃO & INTERAÇÃO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Os 8 Pilares Estruturais do Flow CRM
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              Para atender à exigência de não ser um CRM genérico, cada tela foi desenhada com funcionalidades específicas para operações comerciais B2B:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#1683E8] font-bold block text-sm">01. App Shell & Busca</span>
              <p className="text-neutral-400">Sidebar esquerda expansível, atalhos rápidos (+) e modal de busca global com teclado (Ctrl+K).</p>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#1683E8] font-bold block text-sm">02. Dashboard Executivo</span>
              <p className="text-neutral-400">8 KPIs comerciais em tempo real, visualização de conversão por etapa e canais de entrada.</p>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#1683E8] font-bold block text-sm">03. Pipeline Kanban</span>
              <p className="text-neutral-400">7 colunas com Drag & Drop, valores totais e destaque obrigatório da próxima ação.</p>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#1683E8] font-bold block text-sm">04. Gestão de Leads</span>
              <p className="text-neutral-400">Filtros por segmento comercial, empresas e modal de cadastro com abertura automática do perfil.</p>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#1683E8] font-bold block text-sm">05. Drawer 360° do Lead</span>
              <p className="text-neutral-400">Linha do tempo cronológica com notas, histórico e ações diretas de ligação e WhatsApp.</p>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#1683E8] font-bold block text-sm">06. Módulos de Interesse</span>
              <p className="text-neutral-400">Associação das oportunidades aos módulos corporativos (Gestão Core, Faturamento, Fiscal e Operações).</p>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#1683E8] font-bold block text-sm">07. Motivos de Perda</span>
              <p className="text-neutral-400">Classificação compulsória ao arquivar oportunidade perdida para inteligência de mercado.</p>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#1683E8] font-bold block text-sm">08. Sincronização ERP</span>
              <p className="text-neutral-400">Conversão de lead ganho diretamente em cliente cadastrado no ERP da empresa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. DESIGN SYSTEM CORPORATIVO & ERGONOMIA COGNITIVA                       */}
      {/* ========================================================================= */}
      <section id="designsystem" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683E8] uppercase tracking-widest font-semibold block">
              07 — IDENTIDADE VISUAL & DESIGN SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Harmonia Cromática & Design System Corporativo
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              A paleta de cores foi desenhada respeitando a premissa de não transformar a tela em um bloco azul cansativo. O fundo é neutro e leve (#F5F7FA), e o azul (#1683E8) atua exclusivamente como vetor de ação e navegação.
            </p>
          </div>

          {/* Color Tokens Palette Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm space-y-2">
              <div className="h-10 rounded-sm bg-[#1683E8]"></div>
              <span className="font-bold text-white block">FLOW BLUE</span>
              <span className="text-[10px] text-neutral-400 block">#1683E8 · Ação & CTA</span>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm space-y-2">
              <div className="h-10 rounded-sm bg-[#123B63]"></div>
              <span className="font-bold text-white block">DEEP NAVY</span>
              <span className="text-[10px] text-neutral-400 block">#123B63 · Header & Estrutura</span>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm space-y-2">
              <div className="h-10 rounded-sm bg-[#EAF4FF] border border-neutral-700"></div>
              <span className="font-bold text-white block">BLUE LIGHT</span>
              <span className="text-[10px] text-neutral-400 block">#EAF4FF · Superfícies Ativas</span>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm space-y-2">
              <div className="h-10 rounded-sm bg-[#F5F7FA] border border-neutral-700"></div>
              <span className="font-bold text-white block">BACKGROUND</span>
              <span className="text-[10px] text-neutral-400 block">#F5F7FA · Fundo Neutro</span>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm space-y-2">
              <div className="h-10 rounded-sm bg-[#16A34A]"></div>
              <span className="font-bold text-white block">SUCCESS</span>
              <span className="text-[10px] text-neutral-400 block">#16A34A · Negócio Ganho</span>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm space-y-2">
              <div className="h-10 rounded-sm bg-[#DC2626]"></div>
              <span className="font-bold text-white block">DANGER</span>
              <span className="text-[10px] text-neutral-400 block">#DC2626 · Perda & SLA Crítico</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. MÉTRICAS DE IMPACTO & RESULTADOS                                      */}
      {/* ========================================================================= */}
      <section id="metricas" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683E8] uppercase tracking-widest font-semibold block">
              08 — EFICIÊNCIA & IMPACTO NO NEGÓCIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Resultados Projetados para a Operação Comercial
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              A consolidação do Flow CRM como central de operações de vendas gera ganhos diretos em tração e produtividade:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-mono">
            <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-3xl font-extrabold text-[#1683E8] block">-45%</span>
              <p className="text-xs text-white font-bold">Negócios Estagnados</p>
              <p className="text-[11px] text-neutral-400 leading-tight">Eliminação de oportunidades esquecidas com alerta de 3 dias.</p>
            </div>
            <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-3xl font-extrabold text-emerald-400 block">&lt; 15 min</span>
              <p className="text-xs text-white font-bold">Tempo de Resposta</p>
              <p className="text-[11px] text-neutral-400 leading-tight">Primeiro contato ágil após entrada via Google Ads e WhatsApp.</p>
            </div>
            <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-3xl font-extrabold text-[#1683E8] block">+2,8 p.p.</span>
              <p className="text-xs text-white font-bold">Aumento na Conversão</p>
              <p className="text-[11px] text-neutral-400 leading-tight">Taxa geral do funil atingindo 18,4% no período.</p>
            </div>
            <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-3xl font-extrabold text-emerald-400 block">+30%</span>
              <p className="text-xs text-white font-bold">Volume de Follow-ups</p>
              <p className="text-[11px] text-neutral-400 leading-tight">Mais contatos produtivos realizados por dia por cada vendedor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09. APRENDIZADOS DE PRODUTO & CONCLUSÃO                                    */}
      {/* ========================================================================= */}
      <section id="aprendizados" className="py-20 border-b border-neutral-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono text-[#1683E8] uppercase tracking-widest font-semibold block">
              09 — APRENDIZADOS & PRINCÍPIOS DE DESIGN
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              O que Aprendemos Desenhando para Vendas B2B
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
            <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-sm space-y-2">
              <h3 className="font-bold text-white text-sm">1. Especialização Vence a Generalidade</h3>
              <p className="text-neutral-400">
                CRMs genéricos falham no B2B porque tratam vendas complexas como compras de balcão comum. O produto precisa refletir a realidade de faturamento faturado, prazos de entrega e follow-ups com tomadores de decisão corporativos.
              </p>
            </div>
            <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-sm space-y-2">
              <h3 className="font-bold text-white text-sm">2. Redução de Cliques é Retenção de Uso</h3>
              <p className="text-neutral-400">
                Se registrar uma ligação exige mais de 3 passos, o vendedor deixa de registrar. Ações rápidas dentro do card e no drawer mantêm a disciplina do time alta.
              </p>
            </div>
            <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-sm space-y-2">
              <h3 className="font-bold text-white text-sm">3. Design Neutro com Azul Estratégico</h3>
              <p className="text-neutral-400">
                A neutralidade das superfícies dá protagonismo aos dados das empresas e evita o cansaço visual. O azul primário atua com clareza nos momentos de decisão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PORTFOLIO FOOTER NAVIGATION                                               */}
      {/* ========================================================================= */}
      <footer className="py-16 bg-[#080808] border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
          <Link
            href={`/work/${prevCase.slug}`}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#1683E8]" />
            <span>Case Anterior: [{prevCase.number}] {prevCase.title}</span>
          </Link>

          <Link
            href="/work"
            className="text-neutral-400 hover:text-[#1683E8] font-bold transition-colors"
          >
            VER TODOS OS PROJETOS
          </Link>

          <Link
            href={`/work/${nextCase.slug}`}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span>Próximo Case: [{nextCase.number}] {nextCase.title}</span>
            <ArrowRight className="w-4 h-4 text-[#1683E8]" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
