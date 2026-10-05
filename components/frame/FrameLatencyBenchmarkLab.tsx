"use client";

import { useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, Cpu, RefreshCw, Zap } from "lucide-react";

export default function FrameLatencyBenchmarkLab() {
  const [selectedEngine, setSelectedEngine] = useState<"frame" | "legacy">("frame");
  const [scrubberPosition, setScrubberPosition] = useState(38); // percentage

  const isFrame = selectedEngine === "frame";

  return (
    <div className="p-6 bg-[#0c0c0f] border border-[#262626] rounded-sm space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#262626] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ff5352]" />
            <span className="text-white font-bold uppercase tracking-wider text-sm">
              Laboratório de Benchmark // Sync Engine &amp; Latência Não-Bloqueante
            </span>
          </div>
          <p className="text-neutral-400 text-[11px] font-sans">
            Teste a diferença de reatividade entre a sincronização seletiva em 4ms do FRAME e a arquitetura síncrona pesada das plataformas tradicionais.
          </p>
        </div>

        {/* Engine Switcher */}
        <div className="flex items-center bg-[#141418] p-1 border border-[#262626] rounded">
          <button
            onClick={() => setSelectedEngine("frame")}
            className={`px-3 py-1.5 rounded transition-all font-bold flex items-center gap-1.5 cursor-pointer ${
              isFrame
                ? "bg-[#ff5352] text-white shadow-md shadow-[#ff5352]/20"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>FRAME Engine (4ms)</span>
          </button>
          <button
            onClick={() => setSelectedEngine("legacy")}
            className={`px-3 py-1.5 rounded transition-all font-bold flex items-center gap-1.5 cursor-pointer ${
              !isFrame
                ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Player Tradicional (420ms)</span>
          </button>
        </div>
      </div>

      {/* Interactive Drag Scrubber Simulator */}
      <div className="p-4 bg-[#141418] border border-[#262626] space-y-3">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-neutral-400 uppercase">
            Simulador de Busca Temporal Contínua (Drag Scrubber):
          </span>
          <span className="text-[#ffb3ae] font-bold">
            Posição: {scrubberPosition}% // Timecode: {Math.floor((scrubberPosition / 100) * 605)}s
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={scrubberPosition}
          onChange={(e) => setScrubberPosition(Number(e.target.value))}
          className="w-full accent-[#ff5352] cursor-pointer"
        />

        <div className="flex justify-between text-[9px] text-neutral-500">
          <span>00:00 (Início)</span>
          <span>03:42 (Fenda de Luz)</span>
          <span>07:30 (Acústica)</span>
          <span>10:05 (Fim)</span>
        </div>
      </div>

      {/* Metrics Comparison Cockpit */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-[#121216] border border-[#262626] space-y-1">
          <span className="text-neutral-500 uppercase text-[9px] block">
            Latência de Sincronia:
          </span>
          <span
            className={`text-2xl font-bold block ${
              isFrame ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isFrame ? "4 ms" : "420 ms"}
          </span>
          <span className="text-[10px] text-neutral-400 block font-sans">
            {isFrame ? "requestAnimationFrame loop" : "Re-render bloqueante de DOM"}
          </span>
        </div>

        <div className="p-3.5 bg-[#121216] border border-[#262626] space-y-1">
          <span className="text-neutral-500 uppercase text-[9px] block">
            Uso de Thread Principal:
          </span>
          <span
            className={`text-2xl font-bold block ${
              isFrame ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {isFrame ? "2.1%" : "38.6%"}
          </span>
          <span className="text-[10px] text-neutral-400 block font-sans">
            {isFrame ? "Desacoplamento em micro-tarefas" : "Layout Shift em cada seek"}
          </span>
        </div>

        <div className="p-3.5 bg-[#121216] border border-[#262626] space-y-1">
          <span className="text-neutral-500 uppercase text-[9px] block">
            Continuidade de Áudio:
          </span>
          <span
            className={`text-2xl font-bold block ${
              isFrame ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isFrame ? "100%" : "32%"}
          </span>
          <span className="text-[10px] text-neutral-400 block font-sans">
            {isFrame ? "Zero silêncio ou buffering" : "Gagueira auditiva constante"}
          </span>
        </div>

        <div className="p-3.5 bg-[#121216] border border-[#262626] space-y-1">
          <span className="text-neutral-500 uppercase text-[9px] block">
            Estabilidade de FPS:
          </span>
          <span
            className={`text-2xl font-bold block ${
              isFrame ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {isFrame ? "60 FPS" : "24-35 FPS"}
          </span>
          <span className="text-[10px] text-neutral-400 block font-sans">
            {isFrame ? "Zero micro-stuttering" : "Jank perceptível ao scrubbar"}
          </span>
        </div>
      </div>

      {/* Explanatory Architecture Footer */}
      <div className="p-3.5 bg-[#111115] border border-[#ff5352]/30 text-neutral-300 text-xs leading-relaxed font-sans flex items-start gap-3">
        <Cpu className="w-4 h-4 text-[#ff5352] shrink-0 mt-0.5" />
        <div>
          <strong className="text-white font-mono text-[11px] uppercase block mb-1">
            {isFrame
              ? "Arquitetura FRAME: Desacoplamento Temporal via Virtual DOM Seletivo"
              : "Arquitetura Tradicional: Acoplamento Monolítico Síncrono"}
          </strong>
          <p className="text-[11px] text-neutral-400 font-sans">
            {isFrame
              ? "O FRAME monitora o timecode usando uma rotina isolada de alta precisão. Quando o usuário arrasta o scrubber, apenas a agulha visual e o nó ativo são atualizados na tela, enquanto a transcrição e os dados estruturais permanecem em cache sem repintar o player."
              : "Em players convencionais, a barra de progresso dispara múltiplos re-renders de layouts pesados abaixo do vídeo, fazendo o áudio engasgar e forçando o navegador a recalcular estilos desnecessários a cada milissegundo de arraste."}
          </p>
        </div>
      </div>
    </div>
  );
}
