"use client";

import { useState } from "react";
import { Brain, Calculator, Clock, Sparkles, TrendingUp } from "lucide-react";

export default function FrameCognitiveCalculator() {
  const [videoDurationMin, setVideoDurationMin] = useState<number>(45);
  const [complexity, setComplexity] = useState<"baixa" | "media" | "alta">("alta");

  // Calculations based on UX Research model
  const complexityMultiplier = { baixa: 1.0, media: 1.6, alta: 2.4 }[complexity];
  const tabsAvoided = Math.round((videoDurationMin / 10) * complexityMultiplier * 2.8);
  const minutesSaved = Math.round((videoDurationMin * 0.28) * complexityMultiplier);
  const completionRateGain = Math.min(68, Math.round(28 + complexityMultiplier * 14));
  const focusPreservationScore = Math.min(99, Math.round(62 + complexityMultiplier * 15));

  return (
    <div className="p-6 bg-[#0c0c0f] border border-[#262626] rounded-sm space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#262626] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#ff5352]" />
            <span className="text-white font-bold uppercase tracking-wider text-sm">
              Calculadora de Retenção &amp; Economia Cognitiva
            </span>
          </div>
          <p className="text-neutral-400 text-[11px] font-sans">
            Simule o impacto mensurável da arquitetura não-bloqueante na preservação do estado de fluxo (Flow State).
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-[#ffb3ae] bg-[#ff5352]/10 px-2.5 py-1 border border-[#ff5352]/30 rounded">
          <Brain className="w-3.5 h-3.5" />
          <span>Modelo de Carga Cognitiva Sweller (1988)</span>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Slider Duration */}
        <div className="p-4 bg-[#141418] border border-[#262626] space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-neutral-400 uppercase">Duração do Vídeo / Masterclass:</span>
            <span className="text-white font-bold text-xs">{videoDurationMin} minutos</span>
          </div>
          <input
            type="range"
            min="15"
            max="120"
            step="5"
            value={videoDurationMin}
            onChange={(e) => setVideoDurationMin(Number(e.target.value))}
            className="w-full accent-[#ff5352] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-neutral-500">
            <span>15 min</span>
            <span>45 min</span>
            <span>90 min</span>
            <span>120 min</span>
          </div>
        </div>

        {/* Complexity Selector */}
        <div className="p-4 bg-[#141418] border border-[#262626] space-y-2">
          <span className="text-neutral-400 uppercase text-[10px] block">
            Densidade Conceitual do Conteúdo:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "baixa", label: "Geral", desc: "Tutorial introdutório" },
              { id: "media", label: "Intermediária", desc: "Palestra técnica" },
              { id: "alta", label: "Monográfica", desc: "Ensaio arquitetônico" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setComplexity(c.id as any)}
                className={`p-2 border text-left rounded-sm transition-all cursor-pointer ${
                  complexity === c.id
                    ? "bg-[#ff5352]/15 border-[#ff5352] text-white"
                    : "bg-[#101014] border-[#262626] text-neutral-400 hover:text-white"
                }`}
              >
                <span className="block font-bold text-[10px]">{c.label}</span>
                <span className="block text-[8px] text-neutral-500 truncate">{c.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-[#121216] border border-[#262626] space-y-1">
          <span className="text-neutral-500 uppercase text-[9px] block">
            Trocas de Aba Evitadas:
          </span>
          <span className="text-2xl font-bold text-[#ffb3ae] block">
            ~{tabsAvoided} abas
          </span>
          <span className="text-[10px] text-neutral-400 block font-sans">
            Menos dispersão cognitiva externa
          </span>
        </div>

        <div className="p-3.5 bg-[#121216] border border-[#262626] space-y-1">
          <span className="text-neutral-500 uppercase text-[9px] block">
            Tempo Focado Economizado:
          </span>
          <span className="text-2xl font-bold text-white block">
            +{minutesSaved} min
          </span>
          <span className="text-[10px] text-neutral-400 block font-sans">
            Eliminação de buscas cegas na barra
          </span>
        </div>

        <div className="p-3.5 bg-[#121216] border border-[#262626] space-y-1">
          <span className="text-neutral-500 uppercase text-[9px] block">
            Aumento no Completion Rate:
          </span>
          <span className="text-2xl font-bold text-emerald-400 block">
            +{completionRateGain}%
          </span>
          <span className="text-[10px] text-neutral-400 block font-sans">
            Espectadores que chegam ao final
          </span>
        </div>

        <div className="p-3.5 bg-[#121216] border border-[#262626] space-y-1">
          <span className="text-neutral-500 uppercase text-[9px] block">
            Índice de Retenção Ativa:
          </span>
          <span className="text-2xl font-bold text-emerald-400 block">
            {focusPreservationScore} / 100
          </span>
          <span className="text-[10px] text-neutral-400 block font-sans">
            Fixação conceitual pós-sessão
          </span>
        </div>
      </div>
    </div>
  );
}
