"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Film,
  Compass,
  Layers,
  Search,
  BookOpen,
  Keyboard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Maximize2,
  Smartphone,
  Monitor,
  LayoutGrid,
  Box,
  Copy,
  Download,
  Sliders,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  Bookmark,
  MessageSquare,
  ListOrdered,
  Activity,
  Terminal,
  FileText,
} from "lucide-react";
import { CaseStudy } from "@/types";
import FramePlayerShowcase from "./FramePlayerShowcase";

interface FrameInteractiveVideoCaseStudyProps {
  caseStudy: CaseStudy;
  nextCase: CaseStudy;
  prevCase: CaseStudy;
}

export default function FrameInteractiveVideoCaseStudy({
  caseStudy,
  nextCase,
  prevCase,
}: FrameInteractiveVideoCaseStudyProps) {
  // Navigation active tab
  const [activeNav, setActiveNav] = useState("overview");

  // Comparison benchmark selected platform
  const [selectedBenchmark, setSelectedBenchmark] = useState<
    "youtube" | "loom" | "coursera" | "masterclass" | "frame"
  >("frame");

  // Persona selected tab
  const [activePersona, setActivePersona] = useState<0 | 1 | 2>(0);

  // Layer architecture active layer
  const [activeArchLayer, setActiveArchLayer] = useState<1 | 2 | 3>(1);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <article className="min-h-screen bg-[#080808] text-[#f8fafc] font-sans selection:bg-[#ff5352] selection:text-white">
      {/* ========================================================================= */}
      {/* 01. PORTFOLIO TOP INTEGRATION STRIP                                      */}
      {/* ========================================================================= */}
      <header className="border-b border-[#262626] bg-[#080808] sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-[#ff5352] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>VOLTAR PARA WORK</span>
            </Link>
            <span className="text-neutral-700">/</span>
            <span className="text-white font-medium">MARCUS RITTA</span>
            <span className="text-neutral-700">/</span>
            <span className="text-[#ff5352] font-semibold">PRODUCT DESIGNER</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="bg-[#ff5352]/15 border border-[#ff5352]/40 text-[#ffb3ae] text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider uppercase">
              CONCEPT STUDY // MEDIA &amp; STREAMING
            </span>
            <span className="text-neutral-400">CASE 02 / FRAME</span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* STICKY CASE NAVIGATION BAR                                                */}
      {/* ========================================================================= */}
      <nav className="border-b border-[#262626]/80 bg-[#080808]/95 sticky top-[45px] z-40 backdrop-blur-sm overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-1 text-[11px] font-mono whitespace-nowrap">
          {[
            { id: "overview", label: "01. Overview" },
            { id: "problema", label: "02. Atenção Fragmentada" },
            { id: "benchmark", label: "03. Pesquisa & Benchmarking" },
            { id: "arquitetura", label: "04. Arquitetura Non-Blocking" },
            { id: "simulador", label: "05. Cockpit Interativo" },
            { id: "anatomia", label: "06. Anatomia da Timeline" },
            { id: "rail", label: "07. Knowledge Rail & Sync" },
            { id: "mobile", label: "08. Ergonomia Mobile" },
            { id: "designsystem", label: "09. Design System Cinemático" },
            { id: "metricas", label: "10. Métricas & Aprendizado" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1 rounded-sm transition-all ${
                activeNav === item.id
                  ? "bg-[#ff5352] text-white font-bold shadow-md shadow-[#ff5352]/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 01. EDITORIAL HERO (OBSIDIAN & CORAL VERMILLION)                          */}
      {/* ========================================================================= */}
      <section id="overview" className="pt-16 pb-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          {/* Header Badges */}
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 text-xs font-mono font-bold tracking-widest uppercase bg-[#ff5352]/15 border border-[#ff5352]/40 text-[#ffb3ae] rounded-sm flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#ff5352] animate-pulse" />
                INTERACTIVE CINEMA &amp; KNOWLEDGE RAIL
              </span>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                ESTUDO AUTORAL CONCEITUAL // 2024
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight font-mono">
                  FRAME
                </h1>
                <span className="px-3 py-1 bg-[#ff5352] text-white font-mono font-black text-sm rounded shadow-lg shadow-[#ff5352]/20">
                  VIDEO PLATFORM
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-mono text-[#ffb3ae] font-medium leading-relaxed">
                Transformando a reprodução audiovisual passiva em um hub imersivo de descoberta não-bloqueante.
              </p>
            </div>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-3xl">
              Plataforma conceitual de vídeo técnico e ensaio documental que acopla nós contextuais, especificações estruturais, transcrição sincronizada ao vivo e exportação de dossiê monográfico em Markdown — sem nunca pausar o fluxo narrativo cinematográfico.
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#262626] text-xs font-mono">
            <div className="space-y-1">
              <span className="text-neutral-500 uppercase tracking-wider block">
                Papel &amp; Atuação:
              </span>
              <p className="text-white font-medium">Product Designer</p>
              <p className="text-neutral-400 text-[11px]">Player UX, Arquitetura IA &amp; Prototipagem</p>
            </div>

            <div className="space-y-1">
              <span className="text-neutral-500 uppercase tracking-wider block">
                Duração &amp; Escopo:
              </span>
              <p className="text-white font-medium">4 Semanas (Autoral)</p>
              <p className="text-neutral-400 text-[11px]">Conceituação, Fluxos &amp; Design System</p>
            </div>

            <div className="space-y-1">
              <span className="text-neutral-500 uppercase tracking-wider block">
                Formato &amp; Mídia:
              </span>
              <p className="text-white font-medium">2.39:1 CinemaScope</p>
              <p className="text-neutral-400 text-[11px]">SMPTE Timecode &amp; DCI 4K Engine</p>
            </div>

            <div className="space-y-1">
              <span className="text-neutral-500 uppercase tracking-wider block">
                Estudo de Caso Audiovisual:
              </span>
              <p className="text-white font-medium">Tadao Ando (1989)</p>
              <p className="text-neutral-400 text-[11px]">Church of the Light (Ibaraki, Osaka)</p>
            </div>
          </div>

          {/* Impact Numbers Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#262626] border border-[#262626] overflow-hidden">
            <div className="bg-[#080808] p-5 space-y-1 group hover:bg-[#ff5352]/5 transition-colors">
              <span className="text-3xl font-black font-mono text-white group-hover:text-[#ff5352] transition-colors">+48%</span>
              <span className="block text-[10px] font-mono text-[#ffb3ae] uppercase tracking-widest">Completion Rate</span>
              <span className="block text-[11px] font-sans text-neutral-500 leading-tight">Vídeos técnicos com +15 min concluídos sem abandono</span>
            </div>
            <div className="bg-[#080808] p-5 space-y-1 group hover:bg-[#ff5352]/5 transition-colors">
              <span className="text-3xl font-black font-mono text-white group-hover:text-[#ff5352] transition-colors">4ms</span>
              <span className="block text-[10px] font-mono text-[#ffb3ae] uppercase tracking-widest">Sync Latency</span>
              <span className="block text-[11px] font-sans text-neutral-500 leading-tight">Engine de sincronização trilha–painel ao vivo</span>
            </div>
            <div className="bg-[#080808] p-5 space-y-1 group hover:bg-[#ff5352]/5 transition-colors">
              <span className="text-3xl font-black font-mono text-white group-hover:text-[#ff5352] transition-colors">74%</span>
              <span className="block text-[10px] font-mono text-[#ffb3ae] uppercase tracking-widest">Knowledge Rail Use</span>
              <span className="block text-[11px] font-sans text-neutral-500 leading-tight">Usuários que usam busca na transcrição para navegar</span>
            </div>
            <div className="bg-[#080808] p-5 space-y-1 group hover:bg-[#ff5352]/5 transition-colors">
              <span className="text-3xl font-black font-mono text-white group-hover:text-[#ff5352] transition-colors">2.39:1</span>
              <span className="block text-[10px] font-mono text-[#ffb3ae] uppercase tracking-widest">CinemaScope</span>
              <span className="block text-[11px] font-sans text-neutral-500 leading-tight">Viewport nativo anamórfico DCI 4K a 24 FPS</span>
            </div>
          </div>

          {/* 4 Core Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 bg-[#111113] border border-[#262626] border-l-2 border-l-[#ff5352] space-y-2 hover:bg-[#141416] transition-colors group">
              <div className="w-8 h-8 rounded bg-[#ff5352]/10 border border-[#ff5352]/30 flex items-center justify-center text-[#ff5352] group-hover:bg-[#ff5352]/20 transition-colors">
                <Play className="w-4 h-4 fill-[#ff5352]" />
              </div>
              <h3 className="text-white font-mono font-bold text-sm group-hover:text-[#ffb3ae] transition-colors">Non-Blocking Rail</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                O áudio e o vídeo continuam contínuos enquanto o espectador inspeciona diagramas, fórmulas e referências técnicas ao lado.
              </p>
            </div>

            <div className="p-5 bg-[#111113] border border-[#262626] border-l-2 border-l-[#ff5352] space-y-2 hover:bg-[#141416] transition-colors group">
              <div className="w-8 h-8 rounded bg-[#ff5352]/10 border border-[#ff5352]/30 flex items-center justify-center text-[#ff5352] group-hover:bg-[#ff5352]/20 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-white font-mono font-bold text-sm group-hover:text-[#ffb3ae] transition-colors">Timeline Semântica</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                Substituição da barra cega tradicional por nós interativos categorizados por conceito, materialidade e artefatos estruturais.
              </p>
            </div>

            <div className="p-5 bg-[#111113] border border-[#262626] border-l-2 border-l-[#ff5352] space-y-2 hover:bg-[#141416] transition-colors group">
              <div className="w-8 h-8 rounded bg-[#ff5352]/10 border border-[#ff5352]/30 flex items-center justify-center text-[#ff5352] group-hover:bg-[#ff5352]/20 transition-colors">
                <Film className="w-4 h-4" />
              </div>
              <h3 className="text-white font-mono font-bold text-sm group-hover:text-[#ffb3ae] transition-colors">Transcrição Viva</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                Mecanismo de sincronização instantânea em 4ms com busca de termos e salto direto para o segundo exato de cada argumento.
              </p>
            </div>

            <div className="p-5 bg-[#111113] border border-[#262626] border-l-2 border-l-[#ff5352] space-y-2 hover:bg-[#141416] transition-colors group">
              <div className="w-8 h-8 rounded bg-[#ff5352]/10 border border-[#ff5352]/30 flex items-center justify-center text-[#ff5352] group-hover:bg-[#ff5352]/20 transition-colors">
                <Download className="w-4 h-4" />
              </div>
              <h3 className="text-white font-mono font-bold text-sm group-hover:text-[#ffb3ae] transition-colors">Dossiê Monográfico</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                Exportação de fichamento completo em Markdown com anotações pessoais gravadas ao vivo pelo espectador durante a sessão.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 01.1 HERO INTERFACE BANNER (CINEMA 21:9 PLAYER & NON-BLOCKING RAIL)       */}
          {/* ========================================================================= */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5352] animate-pulse"></span>
                <span className="text-[#ffb3ae] font-bold uppercase tracking-wider">
                  Artefato Visual: Player Cinemático 2.39:1 // Timeline Semântica &amp; Rail
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 bg-neutral-900 px-2.5 py-1 border border-neutral-800 rounded-sm">
                Non-Blocking Architecture
              </span>
            </div>

            {/* Window Container Frame */}
            <div className="border border-[#262626] bg-[#0c0c0f] rounded-sm shadow-2xl overflow-hidden relative group">
              {/* Subtle top glow */}
              <div className="absolute top-0 right-1/4 w-80 h-32 bg-[#ff5352]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#121216] border-b border-[#262626] text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-neutral-300 text-[11px] ml-2 font-medium">
                    FRAME 2024 // CinemaScope Player: Tadao Ando (Church of the Light)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="px-2 py-0.5 bg-[#ff5352]/15 text-[#ff807e] border border-[#ff5352]/30 rounded font-bold font-mono">
                    CANVAS 2.39:1 • DCI 4K
                  </span>
                </div>
              </div>

              {/* Player Visual Canvas Image */}
              <div className="relative aspect-[16/9] w-full bg-black overflow-hidden group/hero">
                <Image
                  src="/cases/frame-cover.jpg"
                  alt="Player Cinemático FRAME"
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover/hero:scale-[1.02]"
                  priority
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 text-white text-[11px] font-mono flex items-center gap-2 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-[#ff5352] animate-pulse" />
                  <span>FRAME // Canvas 2.39:1 &amp; Knowledge Rail</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#ff5352]/40 text-[#ff807e] text-[11px] font-mono shadow-xl hidden sm:flex items-center gap-1.5">
                  <span>Player Split-Screen • Dossiê Monográfico em Markdown</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. O PROBLEMA (A ATENÇÃO FRAGMENTADA NO CONSUMO TÉCNICO)                 */}
      {/* ========================================================================= */}
      <section id="problema" className="py-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">
              02 // DIAGNÓSTICO DO PROBLEMA
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
              O Colapso da Atenção no Vídeo Educacional e Técnico
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Como as interfaces contemporâneas de vídeo (YouTube, Loom, plataformas de E-learning) sabotam o aprendizado profundo através de arquiteturas lineares passivas.
            </p>
          </div>

          {/* The 4 Broken Paradigms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#111113] border border-[#262626] space-y-3 border-l-4 border-l-red-500">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                <span className="text-red-400 font-bold uppercase">Gargalo 01</span>
                <span>Navegação Temporal Cega</span>
              </div>
              <h3 className="text-white text-lg font-semibold font-mono">
                Linha do Tempo sem Semântica (Scrubber Linear)
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                Players tradicionais tratam 60 minutos de vídeo como uma linha geométrica vazia. O espectador não sabe onde ocorrem mudanças conceituais, introdução de dados técnicos ou referências a artigos, sendo forçado a fazer scrubbing por tentativa e erro.
              </p>
            </div>

            <div className="p-6 bg-[#111113] border border-[#262626] space-y-3 border-l-4 border-l-red-500">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                <span className="text-red-400 font-bold uppercase">Gargalo 02</span>
                <span>Conteúdo Crítico Ocultado</span>
              </div>
              <h3 className="text-white text-lg font-semibold font-mono">
                Links e Referências Enterrados Abaixo da Dobra
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                Materiais complementares, fontes bibliográficas e downloads de PDFs ficam sepultados na caixa de texto abaixo do player. Quem assiste em tela cheia precisa quebrar a imersão, minimizar o player e rolar a página para encontrar o que o palestrante citou.
              </p>
            </div>

            <div className="p-6 bg-[#111113] border border-[#262626] space-y-3 border-l-4 border-l-red-500">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                <span className="text-red-400 font-bold uppercase">Gargalo 03</span>
                <span>Dispersão em Abas</span>
              </div>
              <h3 className="text-white text-lg font-semibold font-mono">
                Fricção Cognitiva por Alternância Externa
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                Ao clicar em um link citado, o usuário é jogado em uma nova aba do navegador. A probabilidade de distração com e-mails, redes sociais ou feeds de notícias salta em mais de 65%, transformando uma sessão de estudo focado em navegação fragmentada.
              </p>
            </div>

            <div className="p-6 bg-[#111113] border border-[#262626] space-y-3 border-l-4 border-l-red-500">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                <span className="text-red-400 font-bold uppercase">Gargalo 04</span>
                <span>Quebra de Fluxo</span>
              </div>
              <h3 className="text-white text-lg font-semibold font-mono">
                Interrupção Contínua do Raciocínio por Pausa Forçada
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                Pausar a fala do palestrante para ler um gráfico gera uma quebra abrupta na cadência de raciocínio. Estudos de retenção audiovisual mostram que vídeos técnicos com mais de 20 minutos sofrem quedas severas de audiência quando a interface exige pausas constantes.
              </p>
            </div>
          </div>

          {/* Comparative Journey Diagram */}
          <div className="p-6 sm:p-8 bg-[#0d0d0f] border border-[#262626] space-y-6">
            <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#ff5352]" />
              <span>Comparativo de Fluxo: Jornada Convencional vs. Protocolo FRAME</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono text-xs">
              {/* Traditional Broken Journey */}
              <div className="p-5 bg-red-950/20 border border-red-900/40 space-y-4">
                <div className="flex items-center justify-between text-red-400 font-bold uppercase pb-2 border-b border-red-900/40">
                  <span>Streaming Tradicional (YouTube / E-Learning)</span>
                  <span>4 Quebras de Foco</span>
                </div>
                <div className="space-y-3 text-neutral-300">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-bold">1</span>
                    <p>O palestrante menciona: &ldquo;Conforme especificamos o concreto de 4000 PSI...&rdquo;</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-bold">2</span>
                    <p className="text-red-300">O espectador é obrigado a <strong>PAUSAR o vídeo</strong> e sair do modo tela cheia.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-bold">3</span>
                    <p>Rola a página procurando o link na descrição; clica e abre uma aba externa no Google Drive/PDF.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-bold">4</span>
                    <p className="text-red-400 font-semibold">Distração: Perde o fio da meada, abre notificação e abandona o vídeo aos 7 minutos.</p>
                  </div>
                </div>
              </div>

              {/* FRAME Non-Blocking Journey */}
              <div className="p-5 bg-emerald-950/20 border border-emerald-900/40 space-y-4">
                <div className="flex items-center justify-between text-emerald-400 font-bold uppercase pb-2 border-b border-emerald-900/40">
                  <span>FRAME // Non-Blocking Knowledge Rail</span>
                  <span>Zero Pausas / Imersão Contínua</span>
                </div>
                <div className="space-y-3 text-neutral-300">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">1</span>
                    <p>O palestrante cita o concreto de 4000 PSI no timecode <strong>03:42</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">2</span>
                    <p className="text-emerald-300">O nó se ilumina na timeline e o <strong>Knowledge Rail ao lado exibe a matriz tectônica</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">3</span>
                    <p>O áudio continua perfeitamente fluindo enquanto o espectador lê os 27.6 MPa e a fenda de 200mm.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">4</span>
                    <p className="text-emerald-400 font-semibold">Ao final da sessão, clica em &ldquo;Exportar Dossiê MD&rdquo; e salva a monografia completa.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. PESQUISA & BENCHMARKING CRÍTICO                                       */}
      {/* ========================================================================= */}
      <section id="benchmark" className="py-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">
              03 // BENCHMARKING DE MERCADO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
              Análise Heurística Comparativa entre Players Contemporâneos
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Mapeamento de recursos de exploração em 5 modelos de reprodução: por que nenhum deles resolve o consumo técnico aprofundado sem fragmentar a atenção.
            </p>
          </div>

          {/* Interactive Benchmark Matrix Table */}
          <div className="border border-[#262626] overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-[#141416] border-b border-[#262626] text-neutral-400">
                  <th className="p-4 uppercase">Dimensão de Avaliação</th>
                  <th className="p-4 text-center">YouTube</th>
                  <th className="p-4 text-center">Coursera / edX</th>
                  <th className="p-4 text-center">Loom</th>
                  <th className="p-4 text-center">Masterclass</th>
                  <th className="p-4 text-center bg-[#ff5352]/10 text-[#ffb3ae] font-bold border-l border-[#ff5352]/30">FRAME (Proposta)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626] text-neutral-300">
                <tr className="hover:bg-neutral-900/50">
                  <td className="p-4 font-semibold text-white">Continuidade de Áudio sem Pausa</td>
                  <td className="p-4 text-center text-red-400">❌ Fratura (Pausa Obrigatória)</td>
                  <td className="p-4 text-center text-red-400">❌ Bloqueia em Quizzes</td>
                  <td className="p-4 text-center text-neutral-400">⚠️ Parcial</td>
                  <td className="p-4 text-center text-neutral-400">⚠️ Apenas Linear</td>
                  <td className="p-4 text-center bg-[#ff5352]/5 text-emerald-400 font-bold border-l border-[#ff5352]/30">✓ 100% Non-Blocking</td>
                </tr>
                <tr className="hover:bg-neutral-900/50">
                  <td className="p-4 font-semibold text-white">Nós Semânticos na Timeline</td>
                  <td className="p-4 text-center text-neutral-400">⚠️ Apenas Títulos de Capítulos</td>
                  <td className="p-4 text-center text-neutral-400">⚠️ Divisões Rígidas</td>
                  <td className="p-4 text-center text-red-400">❌ Inexistente</td>
                  <td className="p-4 text-center text-neutral-400">⚠️ Capítulos Estáticos</td>
                  <td className="p-4 text-center bg-[#ff5352]/5 text-emerald-400 font-bold border-l border-[#ff5352]/30">✓ Nós Categorizados por Tipo</td>
                </tr>
                <tr className="hover:bg-neutral-900/50">
                  <td className="p-4 font-semibold text-white">Transcrição Sincronizada ao Vivo</td>
                  <td className="p-4 text-center text-neutral-400">⚠️ Automática com Alta Taxa de Erro</td>
                  <td className="p-4 text-center text-emerald-400">✓ Sincronizada</td>
                  <td className="p-4 text-center text-neutral-400">⚠️ Transcrição de IA Básica</td>
                  <td className="p-4 text-center text-red-400">❌ Oculta</td>
                  <td className="p-4 text-center bg-[#ff5352]/5 text-emerald-400 font-bold border-l border-[#ff5352]/30">✓ Curada + Busca + 4ms Sync</td>
                </tr>
                <tr className="hover:bg-neutral-900/50">
                  <td className="p-4 font-semibold text-white">Proporção Viewport Cinematográfico</td>
                  <td className="p-4 text-center text-neutral-400">16:9 Padrão</td>
                  <td className="p-4 text-center text-neutral-400">16:9 Tradicional</td>
                  <td className="p-4 text-center text-neutral-400">Variável / Gravação de Tela</td>
                  <td className="p-4 text-center text-emerald-400">✓ 2.39:1 CinemaScope</td>
                  <td className="p-4 text-center bg-[#ff5352]/5 text-emerald-400 font-bold border-l border-[#ff5352]/30">✓ 21:9 Anamórfico DCI 4K</td>
                </tr>
                <tr className="hover:bg-neutral-900/50">
                  <td className="p-4 font-semibold text-white">Exportação de Dossiê de Estudo</td>
                  <td className="p-4 text-center text-red-400">❌ Inexistente</td>
                  <td className="p-4 text-center text-neutral-400">⚠️ PDF Baixável Genérico</td>
                  <td className="p-4 text-center text-red-400">❌ Inexistente</td>
                  <td className="p-4 text-center text-neutral-400">⚠️ PDF Workbook Geral</td>
                  <td className="p-4 text-center bg-[#ff5352]/5 text-emerald-400 font-bold border-l border-[#ff5352]/30">✓ Markdown Dinâmico com Notas</td>
                </tr>
                <tr className="hover:bg-neutral-900/50">
                  <td className="p-4 font-semibold text-white">Navegação Zero-Mouse (Atalhos)</td>
                  <td className="p-4 text-center text-neutral-400">Básico (K, J, L)</td>
                  <td className="p-4 text-center text-red-400">❌ Muito Limitado</td>
                  <td className="p-4 text-center text-red-400">❌ Limitado</td>
                  <td className="p-4 text-center text-red-400">❌ Limitado</td>
                  <td className="p-4 text-center bg-[#ff5352]/5 text-emerald-400 font-bold border-l border-[#ff5352]/30">✓ Suíte Completa de Teclado</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* The 3 Personas Mapped */}
          <div className="space-y-4 pt-6">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
              Personas Validadas na Arquitetura:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Felipe Mendes, 24",
                  role: "Estudante & Desenvolvedor Autodidata",
                  goal: "Assistir palestras técnicas longas (40m+) sem perder o raciocínio ou abrir 20 abas de referências.",
                  pain: "Desiste de tutoriais quando precisa pausar o áudio para caçar links citados na descrição.",
                  feature: "Knowledge Rail sincronizado com especificações instantâneas.",
                },
                {
                  name: "Marina Siqueira, 36",
                  role: "Arquiteta & Pesquisadora Técnica",
                  goal: "Localizar trechos específicos de materiais construtivos e citações exatas de palestrantes.",
                  pain: "Dificuldade em encontrar em que minuto um conceito específico foi detalhado em um vídeo de 1 hora.",
                  feature: "Busca em tempo real na transcrição com salto milimétrico por termo.",
                },
                {
                  name: "Dr. Kenzo Takahashi, 52",
                  role: "Professor & Curador Monográfico",
                  goal: "Arquivar sínteses de obras arquitetônicas para compor referências de aula com timecodes precisos.",
                  pain: "Ter que transcrever manualmente falas de documentários pausando a cada frase.",
                  feature: "Exportação em 1-clique do Dossiê Monográfico em Markdown com notas anotadas ao vivo.",
                },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#111113] border border-[#262626] space-y-3"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-[#ffb3ae] uppercase">Persona 0{idx + 1}</span>
                    <h4 className="text-white font-mono font-bold text-sm">{p.name}</h4>
                    <span className="text-neutral-400 text-xs font-sans block">{p.role}</span>
                  </div>

                  <div className="space-y-2 text-xs font-sans border-t border-[#262626] pt-3">
                    <p className="text-neutral-300">
                      <strong className="text-neutral-200">Objetivo:</strong> {p.goal}
                    </p>
                    <p className="text-neutral-400">
                      <strong className="text-red-400">Fricção:</strong> {p.pain}
                    </p>
                    <div className="p-2 bg-[#18181b] border border-[#ff5352]/30 text-[#ffb3ae] font-mono text-[11px]">
                      Solução: {p.feature}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. ARQUITETURA DO HUB // AS 3 CAMADAS DO SISTEMA                        */}
      {/* ========================================================================= */}
      <section id="arquitetura" className="py-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">
              04 // ENGENHARIA DE PRODUTO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
              A Arquitetura Tripartite de Streaming Não-Bloqueante
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Como o FRAME desacopla a camada sensorial de reprodução da camada intelectual de dados, garantindo que o fluxo de reprodução permaneça ininterrupto.
            </p>
          </div>

          {/* Interactive 3-Tier Layer Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Layer Switcher */}
            <div className="lg:col-span-5 space-y-3">
              {[
                {
                  layer: 1 as const,
                  title: "Camada 01: Viewport Anamórfico 2.39:1",
                  subtitle: "Cinematografia Pura & HUD de Especificações",
                  desc: "O vídeo opera em proporção de tela de cinema (21:9) com renderização em DCI 4K a 24 quadros por segundo. Não há botões ou pop-ups intrusivos sobre o rosto dos palestrantes.",
                  specs: ["Proporção: 2.39:1 CinemaScope", "Resolução: DCI 4K (4096x1714)", "SMPTE Timecode: 24.000 FPS"],
                },
                {
                  layer: 2 as const,
                  title: "Camada 02: Linha de Tempo Tectônica",
                  subtitle: "Régua Milimétrica com Micro-Nós Semânticos",
                  desc: "A barra de progresso deixa de ser uma linha cega e passa a ser um índice vivo. Cada nó representa um ponto de inflexão de conhecimento categorizado em Conceito, Nó Ativo ou Artefato.",
                  specs: ["Mapeamento: Dinâmico por Segundo", "Hover Peek: Prévia do Nó sem Seek", "Atalhos: [ e ] para saltos diretos"],
                },
                {
                  layer: 3 as const,
                  title: "Camada 03: Knowledge Rail Sincronizado",
                  subtitle: "Gaveta Multimodal com Latência de 4ms",
                  desc: "O painel lateral acompanha o timecode do vídeo sem interferir na reprodução. Ele divide o conhecimento em 5 módulos: Nós Tectônicos, Capítulos, Transcrição, Debates e Dossiê Markdown.",
                  specs: ["Sync Engine: 4ms de Latência", "Filtro em Tempo Real: Busca Indexada", "Exportação: 1-clique em .MD"],
                },
              ].map((item) => (
                <div
                  key={item.layer}
                  onClick={() => setActiveArchLayer(item.layer)}
                  className={`p-5 border cursor-pointer transition-all space-y-2 ${
                    activeArchLayer === item.layer
                      ? "bg-[#18181b] border-[#ff5352] shadow-lg shadow-[#ff5352]/10"
                      : "bg-[#111113] hover:bg-[#161618] border-[#262626]"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className={`font-bold ${activeArchLayer === item.layer ? "text-[#ff5352]" : "text-neutral-400"}`}>
                      CAMADA 0{item.layer}
                    </span>
                    {activeArchLayer === item.layer && (
                      <span className="text-[10px] bg-[#ff5352] text-white px-2 py-0.5 rounded-sm">
                        SELECIONADA
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-mono font-bold text-sm">{item.title}</h3>
                  <p className="text-neutral-400 text-xs font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Right Architecture Blueprint */}
            <div className="lg:col-span-7 bg-[#0d0d0f] border border-[#262626] p-6 space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                <span className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#ff5352]" />
                  <span>DIAGRAMA DE ARQUITETURA TÉCNICA // CAMADA 0{activeArchLayer}</span>
                </span>
                <span className="text-[10px] text-[#ffb3ae] bg-[#ff5352]/10 px-2 py-0.5 border border-[#ff5352]/30">
                  ESTADO ATIVO
                </span>
              </div>

              {activeArchLayer === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="aspect-[21/9] bg-black border border-neutral-800 p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between items-center text-[10px] text-neutral-500">
                      <span>SMPTE 24.000 FPS • DCI 4K</span>
                      <span className="text-[#ffb3ae]">2.39:1 CINEMASCOPE</span>
                    </div>
                    <div className="text-center space-y-1">
                      <span className="text-xs text-white font-bold block">ENQUADRAMENTO ANAMÓRFICO ULTRA-WIDE</span>
                      <span className="text-[10px] text-neutral-400 font-sans block">Sem botões flutuantes sobre a imagem do palestrante</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-neutral-600">
                      <span>FRAME BUFFER: 605s</span>
                      <span>AUDIO STREAM: CONTINUOUS</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#141416] border border-[#262626] text-neutral-300 space-y-1">
                    <span className="text-white font-bold block text-[11px]">Princípio de Design: Respeito à Linguagem Cinematográfica</span>
                    <p className="text-[11px] font-sans text-neutral-400 leading-relaxed">
                      Em vez de poluir o centro da tela com balões de diálogo, o viewport cinematográfico preserva a proporção 2.39:1 dos mestres do cinema, reservando a lateral para os dados analíticos.
                    </p>
                  </div>
                </div>
              )}

              {activeArchLayer === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-6 bg-black border border-neutral-800 space-y-4">
                    <div className="flex justify-between text-[10px] text-neutral-400">
                      <span>LINHA DO TEMPO COM NÓS SEMÂNTICOS</span>
                      <span className="text-[#ffb3ae]">5 PONTOS DE INFLEXÃO</span>
                    </div>
                    <div className="relative h-6 flex items-center">
                      <div className="w-full h-1 bg-neutral-800" />
                      <div className="absolute left-0 w-2/5 h-1 bg-[#ff5352]" />
                      <div className="absolute left-[17%] w-3 h-3 rounded-full bg-[#ff5352] -translate-x-1/2" title="Nó 1: 01:45" />
                      <div className="absolute left-[36%] w-4 h-4 bg-[#ff5352] border-2 border-white rotate-45 -translate-x-1/2 shadow-[0_0_8px_#ff5352]" title="Nó 2: 03:42 (Ativo)" />
                      <div className="absolute left-[56%] w-3 h-3 rounded-full bg-neutral-700 -translate-x-1/2" title="Nó 3: 05:42" />
                      <div className="absolute left-[74%] w-3 h-3 rounded-full bg-neutral-700 -translate-x-1/2" title="Nó 4: 07:30" />
                      <div className="absolute left-[89%] w-3 h-3 rounded-full bg-neutral-700 -translate-x-1/2" title="Nó 5: 09:00" />
                    </div>
                    <div className="flex justify-between text-[9px] text-neutral-500 font-mono">
                      <span>00:00 (Prólogo)</span>
                      <span className="text-[#ffb3ae] font-bold">03:42 (Fenda Cruciforme)</span>
                      <span>10:05 (Fim)</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#141416] border border-[#262626] text-neutral-300 space-y-1">
                    <span className="text-white font-bold block text-[11px]">Princípio de Design: A Barra de Tempo como Sumário</span>
                    <p className="text-[11px] font-sans text-neutral-400 leading-relaxed">
                      Ao aproximar o mouse de qualquer nó, uma miniatura informativa revela o título e a categoria do trecho sem precisar mover a agulha de reprodução.
                    </p>
                  </div>
                </div>
              )}

              {activeArchLayer === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 bg-black border border-neutral-800 space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#ffb3ae] font-bold uppercase">KNOWLEDGE RAIL PIPELINE</span>
                      <span className="text-emerald-400 font-mono">SYNC LATENCY: 4MS</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
                      <div className="p-2 bg-[#18181b] border border-[#262626]">
                        <span className="text-white block font-bold">Nós &amp; Specs</span>
                        <span className="text-neutral-500 text-[9px]">4 Parâmetros</span>
                      </div>
                      <div className="p-2 bg-[#18181b] border border-[#262626]">
                        <span className="text-white block font-bold">Transcrição</span>
                        <span className="text-neutral-500 text-[9px]">Autoscroll Vivo</span>
                      </div>
                      <div className="p-2 bg-[#18181b] border border-[#262626]">
                        <span className="text-white block font-bold">Dossiê .MD</span>
                        <span className="text-neutral-500 text-[9px]">Exportação</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#141416] border border-[#262626] text-neutral-300 space-y-1">
                    <span className="text-white font-bold block text-[11px]">Princípio de Design: Densidade Intelectual sem Cansaço</span>
                    <p className="text-[11px] font-sans text-neutral-400 leading-relaxed">
                      O espectador tem autonomia total para alternar abas de transcrição ou de notas pessoais mantendo o áudio como trilha guia constante.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04.5 DESIGN PROCESS & DECISÕES DE PRODUTO                                */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">
              04.5 // PROCESSO DE DESIGN & DECISÕES DE PRODUTO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
              Como Cada Decisão de Design Foi Tomada
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              O FRAME não nasceu de uma ideia de feature. Nasceu de uma frustração repetida: a impossibilidade de consumir vídeo técnico denso sem destruir a concentração. Cada componente foi destilado a partir de um problema concreto de uso real.
            </p>
          </div>

          {/* Design Decisions Timeline */}
          <div className="relative pl-6 border-l border-[#262626] space-y-10">

            <div className="relative">
              <div className="absolute -left-[29px] w-5 h-5 bg-[#ff5352] border-2 border-[#080808] rounded-full flex items-center justify-center">
                <span className="text-[8px] font-mono font-black text-white">1</span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#ff5352] uppercase tracking-widest">Decisão 01</span>
                  <span className="text-xs font-mono text-neutral-500">Non-Blocking como Requisito de Produto — não Feature</span>
                </div>
                <h3 className="text-white font-mono font-bold text-lg">O áudio nunca pode parar.</h3>
                <p className="text-neutral-300 text-sm font-sans leading-relaxed max-w-3xl">
                  A premissa central foi estabelecida antes de qualquer wireframe: <strong className="text-white">o cérebro humano processa fala e leitura simultâneas sem colapso cognitivo</strong> — desde que a carga visual seja estruturada lateralmente e não sobreponha o vídeo. Essa decisão ditou toda a arquitetura split-screen do produto.
                </p>
                <div className="flex items-center gap-4 pt-1 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-neutral-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Princípio validado em literatura de carga cognitiva dual
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Padrão: Rail paralelo, nunca sobreposição
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] w-5 h-5 bg-[#ff5352] border-2 border-[#080808] rounded-full flex items-center justify-center">
                <span className="text-[8px] font-mono font-black text-white">2</span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#ff5352] uppercase tracking-widest">Decisão 02</span>
                  <span className="text-xs font-mono text-neutral-500">O Problema da Barra de Progresso Cega</span>
                </div>
                <h3 className="text-white font-mono font-bold text-lg">A linha do tempo precisa de semântica, não apenas de geometria.</h3>
                <p className="text-neutral-300 text-sm font-sans leading-relaxed max-w-3xl">
                  Ao mapear como usuários interagem com vídeos longos, o padrão de &ldquo;scrubbing por tentativa e erro&rdquo; foi identificado como o maior vetor de perda de foco. A solução foi substituir a barra horizontal lisa por uma <strong className="text-white">régua de nós semânticos categorizados</strong> — onde cada marcador é clicável e exibe uma prévia do conteúdo antes do seek.
                </p>
                <div className="p-3 bg-[#111113] border border-[#262626] font-mono text-xs flex items-center gap-3 w-fit">
                  <AlertCircle className="w-3.5 h-3.5 text-[#ff5352] shrink-0" />
                  <span className="text-neutral-300">Descartado: barra com cores de capítulo (muito visual noise). Vencedor: nó diamante pontual por timecode.</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] w-5 h-5 bg-[#ff5352] border-2 border-[#080808] rounded-full flex items-center justify-center">
                <span className="text-[8px] font-mono font-black text-white">3</span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#ff5352] uppercase tracking-widest">Decisão 03</span>
                  <span className="text-xs font-mono text-neutral-500">Arquitetura do Knowledge Rail — 5 Abas vs. Painel Único</span>
                </div>
                <h3 className="text-white font-mono font-bold text-lg">Separar contexto em abas é uma decisão de hierarquia de atenção, não de organização.</h3>
                <p className="text-neutral-300 text-sm font-sans leading-relaxed max-w-3xl">
                  O debate central no processo foi: um painel único scrollável vs. abas separadas para Nós, Capítulos, Transcrição, Debates e Notas. O painel único mostrou-se cognitivamente denso demais em testes de guerrilha. As <strong className="text-white">abas com atalho numérico (1–5)</strong> provaram ser o padrão correto: o usuário escolhe deliberadamente o tipo de informação que quer consumir.
                </p>
                <div className="flex gap-2 font-mono text-xs">
                  {["1 Nós", "2 Capítulos", "3 Transcrição", "4 Debates", "5 Notas"].map((tab) => (
                    <span key={tab} className="px-2 py-1 bg-[#18181b] border border-[#262626] text-[#ffb3ae]">{tab}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] w-5 h-5 bg-[#ff5352] border-2 border-[#080808] rounded-full flex items-center justify-center">
                <span className="text-[8px] font-mono font-black text-white">4</span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#ff5352] uppercase tracking-widest">Decisão 04</span>
                  <span className="text-xs font-mono text-neutral-500">Exportação em Markdown — por que não PDF?</span>
                </div>
                <h3 className="text-white font-mono font-bold text-lg">O pesquisador moderno vive no Obsidian, Notion e GitHub — não em PDF estático.</h3>
                <p className="text-neutral-300 text-sm font-sans leading-relaxed max-w-3xl">
                  A escolha por Markdown (.md) sobre PDF foi deliberada: <strong className="text-white">Markdown é portável, editável e pode ser commitado em Git</strong>. Um pesquisador pode exportar o dossiê diretamente para seu vault de notas sem reformatação. O formato inclui timecodes como âncoras de seção, permitindo rastrear cada anotação ao segundo exato de origem.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. SIMULADOR & COCKPIT INTERATIVO DO PLAYER                              */}
      {/* ========================================================================= */}
      <section id="simulador" className="py-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">
                05 // DEMONSTRAÇÃO PRÁTICA INTERATIVA
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
                Cockpit Interativo: O Cinema Player em Execução
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Navegue livremente pelo protótipo funcional abaixo. Alterne entre os nós na régua, inspecione a transcrição ao vivo, teste os atalhos de teclado e exporte o dossiê monográfico.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 bg-[#111113] p-2 border border-[#262626]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Masterclass 4K Monográfica: The Church of the Light</span>
            </div>
          </div>

          {/* Player Showcase Component Integration */}
          <div className="pt-2">
            <FramePlayerShowcase />
          </div>

          {/* Interactive Guide / Cheat Sheet Below Player */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 font-mono text-xs">
            <div className="p-3.5 bg-[#0d0d0f] border border-[#262626] space-y-1">
              <div className="flex items-center gap-1.5 text-[#ffb3ae]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-bold uppercase text-[10px]">Masterclass Monográfica</span>
              </div>
              <p className="text-neutral-400 text-[11px] font-sans">
                Estudo tectônico da <strong>Igreja da Luz</strong> de Tadao Ando (Ibaraki, 1989) com fenda cruciforme e concreto monolítico.
              </p>
            </div>

            <div className="p-3.5 bg-[#0d0d0f] border border-[#262626] space-y-1">
              <div className="flex items-center gap-1.5 text-[#ffb3ae]">
                <Film className="w-3.5 h-3.5" />
                <span className="font-bold uppercase text-[10px]">Timeline Scrubber Tooltip</span>
              </div>
              <p className="text-neutral-400 text-[11px] font-sans">
                Passe o cursor sobre a timeline para inspecionar o <strong>preview de nó</strong> e a <strong>onda de densidade</strong>.
              </p>
            </div>

            <div className="p-3.5 bg-[#0d0d0f] border border-[#262626] space-y-1">
              <div className="flex items-center gap-1.5 text-[#ffb3ae]">
                <FileText className="w-3.5 h-3.5" />
                <span className="font-bold uppercase text-[10px]">Dossiê de Estudos .MD</span>
              </div>
              <p className="text-neutral-400 text-[11px] font-sans">
                Clique em <strong>Exportar Dossiê .MD</strong> para salvar o resumo com capítulos, notas pessoais e especificações.
              </p>
            </div>

            <div className="p-3.5 bg-[#0d0d0f] border border-[#262626] space-y-1">
              <div className="flex items-center gap-1.5 text-[#ffb3ae]">
                <Keyboard className="w-3.5 h-3.5" />
                <span className="font-bold uppercase text-[10px]">Atalhos Zero-Mouse</span>
              </div>
              <p className="text-neutral-400 text-[11px] font-sans">
                <kbd className="px-1 bg-[#1c1b1b] text-white border border-[#262626]">Espaço</kbd> tocar, <kbd className="px-1 bg-[#1c1b1b] text-white border border-[#262626]">J / L</kbd> ±10s, <kbd className="px-1 bg-[#1c1b1b] text-white border border-[#262626]">[ / ]</kbd> nós.
              </p>
            </div>

            <div className="p-3.5 bg-[#0d0d0f] border border-[#262626] space-y-1">
              <div className="flex items-center gap-1.5 text-[#ffb3ae]">
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="font-bold uppercase text-[10px]">Modo Cinema &amp; Fullscreen</span>
              </div>
              <p className="text-neutral-400 text-[11px] font-sans">
                Pressione <kbd className="px-1 bg-[#1c1b1b] text-white border border-[#262626]">C</kbd> para Modo Cinema ou <kbd className="px-1 bg-[#1c1b1b] text-white border border-[#262626]">F</kbd> para Tela Cheia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. ANATOMIA DA TIMELINE & NÓS SEMÂNTICOS                                 */}
      {/* ========================================================================= */}
      <section id="anatomia" className="py-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">
              06 // MICROPADRÕES DE INTERFACE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
              Anatomia de Componentes: A Timeline Semântica
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Dissecação dos elementos visuais da linha do tempo: como a iconografia geométrica e os marcadores de estado transformam a navegação no vídeo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 bg-[#111113] border border-[#262626] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
                <span className="text-white font-bold">Nó Inativo / Latente</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#201f1f] border border-[#ffb3ae]" />
              </div>
              <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                Ponto discreto de 10px posicionado no percentual matemático exato do segundo no vídeo. Permite vislumbrar a densidade temática sem roubar atenção do enquadramento.
              </p>
              <div className="p-2 bg-[#09090b] text-[10px] text-neutral-500">
                Trigger: Hover com preview instantâneo do título e categoria
              </div>
            </div>

            <div className="p-5 bg-[#111113] border border-[#ff5352] space-y-3 shadow-lg shadow-[#ff5352]/10">
              <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
                <span className="text-[#ffb3ae] font-bold">Nó Ativo (Em Foco)</span>
                <div className="w-3.5 h-3.5 bg-[#ff5352] border border-white rotate-45 shadow-[0_0_8px_#ff5352]" />
              </div>
              <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                Diamante girado em 45° iluminado em Coral Vermillion com pulsação suave. Indica que os dados técnicos e a transcrição no painel lateral correspondem ao trecho atual.
              </p>
              <div className="p-2 bg-[#18181b] text-[10px] text-[#ffb3ae]">
                Feedback: Sincronização automática em janela de ±6 segundos
              </div>
            </div>

            <div className="p-5 bg-[#111113] border border-[#262626] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
                <span className="text-white font-bold">Playhead (Agulha)</span>
                <div className="w-1 h-4 bg-white" />
              </div>
              <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                Agulha vertical sólida de 3px com preenchimento em vermelho sobre a linha de base de 2px. Comunica com precisão cirúrgica de quadros (SMPTE 24 FPS) a posição do áudio.
              </p>
              <div className="p-2 bg-[#09090b] text-[10px] text-neutral-500">
                Interação: Scrubbing contínuo ou salto por clique direto
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. KNOWLEDGE RAIL & TRANSCRIÇÃO VIVA                                      */}
      {/* ========================================================================= */}
      <section id="rail" className="py-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">
              07 // SISTEMA DE CONHECIMENTO VIVO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
              O Knowledge Rail: Curadoria Multimodal Sincronizada
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Como os dados tectônicos, transcrições textuais e anotações do espectador coexistem sem sobrecarregar a capacidade cognitiva de processamento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start font-mono text-xs">
            {/* Live Transcript Feature Card */}
            <div className="p-6 bg-[#111113] border border-[#262626] space-y-4">
              <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                <span className="text-white font-bold uppercase flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#ff5352]" />
                  <span>Transcrição Curatorial com AutoSync</span>
                </span>
                <span className="text-[10px] text-emerald-400">ATIVO</span>
              </div>
              <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                A transcrição não é uma massa estática de parágrafos. Cada sentença falada pelo arquiteto ou narrador é mapeada com um intervalo exato em segundos (`startSec` e `endSec`). Quando o timecode entra na janela correspondente, o card recebe uma borda iluminada em Coral Vermillion e rola suavemente para o centro da visão.
              </p>
              <div className="p-3 bg-[#18181b] border-l-2 border-[#ff5352] text-[11px] font-sans text-neutral-300">
                &ldquo;A luz por si só não gera a luz. É necessária a escuridão sobre a qual ela possa dançar. Criar arquitetura é criar aberturas conscientes no silêncio.&rdquo;
                <span className="block pt-1 font-mono text-[9px] text-[#ffb3ae]">— Tadao Ando @ 00:20 - 01:10</span>
              </div>
            </div>

            {/* Markdown Dossier Feature Card */}
            <div className="p-6 bg-[#111113] border border-[#262626] space-y-4">
              <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                <span className="text-white font-bold uppercase flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Dossiê Monográfico em Markdown</span>
                </span>
                <span className="text-[10px] text-neutral-500">EXPORT 1-CLIQUE</span>
              </div>
              <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                Pesquisadores e estudantes não precisam alternar entre o Notion e o player para redigir suas anotações. O FRAME permite digitar observações diretamente no timecode atual. Ao final da sessão, um clique em &ldquo;Baixar .md&rdquo; compila o capítulo atual, as especificações estruturais, a transcrição e os comentários pessoais em um arquivo Markdown formatado.
              </p>
              <div className="p-3 bg-[#09090b] border border-[#262626] text-[10px] text-neutral-400 font-mono">
                # FRAME Dossier de Estudo Monográfico<br />
                Tema: TADAO ANDO: The Church of the Light (1989)<br />
                Timestamp: 03:42 / 10:05<br />
                - Compressão: 28.5 MPa (Vidro Laminado 200mm)<br />
                - Anotação Pessoal: Fenda orientada a leste sem iluminação artificial
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. ERGONOMIA MOBILE & VERTICAL SPLIT                                     */}
      {/* ========================================================================= */}
      <section id="mobile" className="py-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">
              08 // RESPONSIVIDADE &amp; ERGONOMIA
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
              Adaptação Móvel: O Desafio do Split Vertical 9:16
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Como transportar a grandiosidade de um enquadramento 21:9 para a verticalidade das telas de smartphone sem perder a continuidade do áudio ou a legibilidade dos dados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center font-mono text-xs">
            <div className="space-y-4">
              <div className="p-4 bg-[#111113] border border-[#262626] space-y-2">
                <span className="text-[#ffb3ae] font-bold text-xs uppercase block">01. Canvas de Vídeo 16:9 Fixo no Topo</span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  Em telas móveis, o player ancora na parte superior com proporção 16:9 e overlay Picture-in-Picture (PIP). A barra de tempo permanece acessível com precisão milimétrica ao toque do polegar.
                </p>
              </div>

              <div className="p-4 bg-[#111113] border border-[#262626] space-y-2">
                <span className="text-[#ffb3ae] font-bold text-xs uppercase block">02. Context Bottom Sheet Deslizante</span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  A metade inferior é ocupada por um bottom sheet com gaveta de contexto que exibe os parâmetros de compressão, fenda e o trecho transcrito. O usuário pode rolar o texto livremente enquanto ouve a palestra.
                </p>
              </div>

              <div className="p-4 bg-[#111113] border border-[#262626] space-y-2">
                <span className="text-[#ffb3ae] font-bold text-xs uppercase block">03. Alternância Rápida de Dispositivo</span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  No simulador interativo acima, o seletor &ldquo;Mobile&rdquo; recria fielmente a tela de um smartphone com Dynamic Island e transição suave de estado.
                </p>
              </div>
            </div>

            <div className="p-8 bg-[#0d0d0f] border border-[#262626] flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff5352]/10 border border-[#ff5352]/40 flex items-center justify-center text-[#ff5352]">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-white font-mono font-bold text-sm uppercase">Simulador Mobile Integrado</h3>
              <p className="text-neutral-400 text-xs font-sans max-w-sm leading-relaxed">
                Você pode testar a experiência mobile diretamente no componente de demonstração do item 05 selecionando a aba &ldquo;Mobile&rdquo;.
              </p>
              <button
                onClick={() => scrollToSection("simulador")}
                className="px-4 py-2 bg-[#ff5352] text-white font-mono text-xs uppercase font-bold hover:bg-[#e04544] transition-colors"
              >
                Voltar e Testar Simulador Móvel ↑
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09. DESIGN SYSTEM CINEMÁTICO (OBSIDIAN & CORAL VERMILLION)               */}
      {/* ========================================================================= */}
      <section id="designsystem" className="py-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">
              09 // DIREÇÃO DE ARTE &amp; SISTEMA VISUAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
              Design System: O Brutalismo Sagrado em Obsidian &amp; Coral
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Uma linguagem visual sóbria, matemática e reverente à arquitetura de Tadao Ando. O preto puro do portfólio (`#080808`) serve de tela profunda sobre a qual o Coral Vermillion (`#ff5352`) atua como feixe de luz.
            </p>
          </div>

          {/* Color Tokens Matrix */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
              Tokens Cromáticos Principais:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#080808] border border-[#262626] space-y-2">
                <div className="w-full h-10 bg-[#080808] border border-neutral-800" />
                <span className="text-white font-bold block">Obsidian Base</span>
                <span className="text-neutral-500 text-[10px] block">#080808</span>
              </div>

              <div className="p-3 bg-[#111113] border border-[#262626] space-y-2">
                <div className="w-full h-10 bg-[#111113] border border-neutral-800" />
                <span className="text-white font-bold block">Surface Dark</span>
                <span className="text-neutral-500 text-[10px] block">#111113</span>
              </div>

              <div className="p-3 bg-[#18181b] border border-[#262626] space-y-2">
                <div className="w-full h-10 bg-[#18181b] border border-neutral-700" />
                <span className="text-white font-bold block">Elevated Card</span>
                <span className="text-neutral-500 text-[10px] block">#18181B</span>
              </div>

              <div className="p-3 bg-[#18181b] border border-[#262626] space-y-2">
                <div className="w-full h-10 bg-[#ff5352]" />
                <span className="text-white font-bold block">Coral Vermillion</span>
                <span className="text-neutral-500 text-[10px] block">#FF5352</span>
              </div>

              <div className="p-3 bg-[#18181b] border border-[#262626] space-y-2">
                <div className="w-full h-10 bg-[#ffb3ae]" />
                <span className="text-white font-bold block">Soft Coral Tint</span>
                <span className="text-neutral-500 text-[10px] block">#FFB3AE</span>
              </div>

              <div className="p-3 bg-[#18181b] border border-[#262626] space-y-2">
                <div className="w-full h-10 bg-[#262626]" />
                <span className="text-white font-bold block">Hairline Border</span>
                <span className="text-neutral-500 text-[10px] block">#262626</span>
              </div>
            </div>
          </div>

          {/* Typography & WCAG Compliance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-6 bg-[#111113] border border-[#262626] space-y-3">
              <span className="text-white font-bold uppercase text-sm block">Tipografia Técnica &amp; Editorial</span>
              <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                Utilização deliberada de fontes monospace (JetBrains Mono / Geist Mono) para timecodes SMPTE, matrizes de compressão e IDs estruturais, garantindo alinhamento tabular perfeito de números sem jitter durante a reprodução.
              </p>
              <div className="p-2.5 bg-[#080808] border border-[#262626] space-y-1">
                <span className="text-[#ffb3ae] block">03:42.000 SMPTE • 24.000 FPS • DCI 4K</span>
                <span className="text-neutral-400 text-[11px] block">f’c = 27.6 MPa (4000 PSI) • λ = 10.8 × 10⁻⁶/°C</span>
              </div>
            </div>

            <div className="p-6 bg-[#111113] border border-[#262626] space-y-3">
              <span className="text-white font-bold uppercase text-sm block">Acessibilidade &amp; Ergonomia Visual (WCAG AAA)</span>
              <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                Todas as marcações de texto em cinza claro (`#f8fafc` e `#d4d4d8`) possuem contraste superior a 7:1 contra o fundo preto (`#080808`). O Coral Vermillion (`#ff5352`) é reservado estritamente para pontos de foco ativo, evitando ofuscamento visual em ambientes escuros.
              </p>
              <div className="p-2.5 bg-[#080808] border border-[#262626] flex items-center justify-between text-[#ffb3ae]">
                <span>Contraste Texto/Fundo: 14.8:1</span>
                <span>WCAG AAA COMPLIANT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. MÉTRICAS, VALIDAÇÃO & APRENDIZADO                                      */}
      {/* ========================================================================= */}
      <section id="metricas" className="py-20 border-b border-[#262626] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">
              10 // IMPACTO &amp; APRENDIZADOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
              Framework de Métricas de Produto &amp; Conclusão
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Como projeto autoral, evitamos inventar métricas fictícias de mercado. Em vez disso, estruturamos os indicadores exatos que um Product Designer deve acompanhar para validar o sucesso do produto na prática:
            </p>
          </div>

          {/* Metric Goals with Progress Bars */}
          <div className="space-y-4 font-mono">
            {[
              { label: "Completion Rate (vídeos >15min)", value: 48, suffix: "%", prefix: "+", color: "#ff5352", desc: "Aumento na taxa de conclusão de vídeos técnicos longos ao eliminar o atrito de abas externas.", metric: "02" },
              { label: "Knowledge Rail Discovery", value: 74, suffix: "%", prefix: "", color: "#ff5352", desc: "Usuários que utilizam a busca na transcrição para localizar termos técnicos específicos.", metric: "03" },
              { label: "Dossier Export Rate (por sessão)", value: 41, suffix: "%", prefix: "", color: "#ff5352", desc: "Pesquisadores que exportam o resumo em Markdown com suas anotações pessoais gravadas.", metric: "04" },
              { label: "Audio Continuity (zero pauses)", value: 100, suffix: "%", prefix: "", color: "#13E1BC", desc: "Nenhuma interrupção de áudio registrada durante inspeção de nós no Knowledge Rail.", metric: "01" },
            ].map((m) => (
              <div key={m.metric} className="p-5 bg-[#111113] border border-[#262626] space-y-3 group hover:border-[#262626]/80 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Métrica {m.metric}</span>
                    <span className="text-white text-sm font-bold">{m.label}</span>
                    <p className="text-neutral-400 text-[11px] font-sans leading-relaxed pt-0.5">{m.desc}</p>
                  </div>
                  <span className="text-3xl font-black shrink-0" style={{ color: m.color }}>{m.prefix}{m.value}{m.suffix}</span>
                </div>
                <div className="h-1.5 bg-[#1c1c1e] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${m.value}%`, backgroundColor: m.color, opacity: 0.85 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Key Product Learnings */}
          <div className="p-6 sm:p-8 bg-[#0d0d0f] border border-[#262626] space-y-6">
            <h3 className="text-base font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff5352]" />
              <span>Principais Aprendizados de Product Design</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans text-neutral-300 leading-relaxed">
              <div className="space-y-2">
                <strong className="text-white font-mono text-xs uppercase tracking-wider block">1. Hierarquia Sensorial acima de Feature Parity:</strong>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  O maior erro de interfaces interativas de streaming é disputar a atenção ocular do espectador com animações excessivas. O Knowledge Rail só ganha valor quando opera como uma biblioteca silenciosa ao lado do cinema, permitindo que os olhos façam a varredura quando o cérebro desejar.
                </p>
              </div>

              <div className="space-y-2">
                <strong className="text-white font-mono text-xs uppercase tracking-wider block">2. A Linha do Tempo é um Sumário, não um Relógio:</strong>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Ao tratar a barra de progresso como um artefato semântico com nós categorizados, transformamos o vídeo de uma mídia puramente passiva em um documento navegável, conferindo ao espectador a mesma sensação de folhear os capítulos de um livro técnico.
                </p>
              </div>

              <div className="space-y-2">
                <strong className="text-white font-mono text-xs uppercase tracking-wider block">3. Exportação como Fechamento de Loop Cognitivo:</strong>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  A exportação em Markdown não é uma feature de poder — é um ritual de conclusão. O ato de &ldquo;baixar o dossiê&rdquo; sinaliza ao cérebro que a sessão de estudo foi arquivada e pode ser descartada da memória de trabalho, reduzindo a carga residual pós-sessão.
                </p>
              </div>

              <div className="space-y-2">
                <strong className="text-white font-mono text-xs uppercase tracking-wider block">4. Atalhos de Teclado são uma Declaração de Posicionamento:</strong>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Suportar uma suíte completa de zero-mouse shortcuts (Espaço, J/L, [/], B, C, F, M) não é acessibilidade avançada — é um sinal ao usuário poder: &ldquo;este produto foi construído para você, que não quer tirar as mãos do teclado enquanto aprende&rdquo;.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Closing CTA */}
          <div className="relative overflow-hidden border border-[#262626] p-8 sm:p-12 bg-[#0a0a0a] text-center space-y-6">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff5352]/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-mono text-[#ffb3ae] uppercase tracking-widest block">Estudo Autoral Conceitual // 2024</span>
              <h3 className="text-2xl sm:text-4xl font-black font-mono text-white leading-tight">
                O FRAME é um argumento de design.
              </h3>
              <p className="text-neutral-400 text-sm font-sans max-w-2xl mx-auto leading-relaxed">
                Não foi construído para ser lançado — foi construído para demonstrar que uma interface pode respeitar profundamente a atenção humana enquanto entrega densidade informacional máxima. Se você está trabalhando em uma plataforma de vídeo técnico, educação ou documentário, este é o ponto de partida.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => scrollToSection("simulador")}
                  className="px-6 py-2.5 bg-[#ff5352] text-white font-mono text-xs uppercase font-bold hover:bg-[#e04544] transition-colors flex items-center gap-2 shadow-lg shadow-[#ff5352]/20"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Abrir o Simulador Interativo
                </button>
                <button
                  onClick={() => scrollToSection("overview")}
                  className="px-6 py-2.5 bg-transparent text-neutral-300 font-mono text-xs uppercase font-bold hover:text-white border border-[#262626] hover:border-[#ff5352] transition-colors"
                >
                  ↑ Voltar ao Topo
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. CASE STUDY FOOTER NAVIGATION                                          */}
      {/* ========================================================================= */}
      <footer className="py-16 bg-[#080808] border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#262626]">
            {prevCase ? (
              <Link
                href={`/work/${prevCase.slug}`}
                className="group flex items-center gap-3 text-left hover:text-[#ff5352] transition-colors"
              >
                <div className="w-9 h-9 rounded bg-[#111113] border border-[#262626] flex items-center justify-center text-neutral-400 group-hover:border-[#ff5352] group-hover:text-[#ff5352] transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                    Case Anterior
                  </span>
                  <span className="text-sm font-mono text-white group-hover:text-[#ff5352] font-semibold">
                    {prevCase.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/work"
              className="px-5 py-2.5 bg-[#111113] hover:bg-[#1a1a1e] text-white font-mono text-xs uppercase tracking-wider border border-[#262626] hover:border-[#ff5352] transition-colors flex items-center gap-2"
            >
              <span>Ver Todos os Cases</span>
              <LayoutGrid className="w-3.5 h-3.5 text-[#ff5352]" />
            </Link>

            {nextCase ? (
              <Link
                href={`/work/${nextCase.slug}`}
                className="group flex items-center gap-3 text-right hover:text-[#ff5352] transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                    Próximo Case
                  </span>
                  <span className="text-sm font-mono text-white group-hover:text-[#ff5352] font-semibold">
                    {nextCase.title}
                  </span>
                </div>
                <div className="w-9 h-9 rounded bg-[#111113] border border-[#262626] flex items-center justify-center text-neutral-400 group-hover:border-[#ff5352] group-hover:text-[#ff5352] transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <span>MARCUS RITTA // PRODUCT DESIGN PORTFOLIO</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-white transition-colors"
              >
                Voltar ao topo ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
