"use client";

import { useState } from "react";
import { Compass, Eye, MapPin, Maximize2, Sparkles, Layers } from "lucide-react";
import { BlueprintHotspot, MasterclassDataset } from "./FrameMasterclassesData";

interface FrameBlueprintViewerProps {
  masterclass: MasterclassDataset;
  currentSeconds: number;
  onSeekTo: (seconds: number) => void;
  onSelectHotspot?: (hotspot: BlueprintHotspot) => void;
}

export default function FrameBlueprintViewer({
  masterclass,
  currentSeconds,
  onSeekTo,
  onSelectHotspot,
}: FrameBlueprintViewerProps) {
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    masterclass.blueprintHotspots[0]?.id || ""
  );
  const [showAxes, setShowAxes] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const activeHotspot =
    masterclass.blueprintHotspots.find((h) => h.id === activeHotspotId) ||
    masterclass.blueprintHotspots[0];

  const handleHotspotClick = (h: BlueprintHotspot) => {
    setActiveHotspotId(h.id);
    onSeekTo(h.seconds);
    if (onSelectHotspot) onSelectHotspot(h);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Blueprint Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#ff5352]" />
            <span className="text-white font-bold text-xs uppercase tracking-wider">
              Blueprint Vetorial // {masterclass.title.split(":")[0]}
            </span>
          </div>
          <p className="text-[10px] text-neutral-400 font-sans">
            Planta técnica com {masterclass.blueprintHotspots.length} pontos de ancoragem navegáveis ao vivo.
          </p>
        </div>

        {/* Display Toggles */}
        <div className="flex items-center gap-1.5 text-[10px]">
          <button
            onClick={() => setShowAxes(!showAxes)}
            className={`px-2 py-0.5 border transition-colors ${
              showAxes
                ? "bg-[#ff5352]/15 text-[#ff807e] border-[#ff5352]/40 font-bold"
                : "bg-[#18181b] text-neutral-400 border-[#262626]"
            }`}
          >
            Eixos Tectônicos
          </button>
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`px-2 py-0.5 border transition-colors ${
              showAnnotations
                ? "bg-[#ff5352]/15 text-[#ff807e] border-[#ff5352]/40 font-bold"
                : "bg-[#18181b] text-neutral-400 border-[#262626]"
            }`}
          >
            Anotações Cotadas
          </button>
        </div>
      </div>

      {/* Interactive Blueprint Vector Canvas */}
      <div className="relative aspect-[16/9] w-full bg-[#050507] border border-[#262626] rounded-sm overflow-hidden select-none group">
        {/* Subtle Architectural Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        {/* SVG Vector Diagrams Based on Masterclass */}
        <svg
          viewBox="0 0 800 450"
          className="w-full h-full relative z-10 pointer-events-none"
        >
          {/* ========================================================================= */}
          {/* TADAO ANDO: THE CHURCH OF THE LIGHT (Planta Baixa)                        */}
          {/* ========================================================================= */}
          {masterclass.id === "ando" && (
            <g className="transition-opacity duration-500">
              {/* North Arrow / Azimute */}
              {showAxes && (
                <g opacity="0.6">
                  <line x1="720" y1="60" x2="720" y2="25" stroke="#ff5352" strokeWidth="1.5" />
                  <polygon points="720,20 716,28 724,28" fill="#ff5352" />
                  <text x="730" y="30" fill="#ff5352" fontSize="10" fontFamily="monospace">N 94°E</text>
                  <circle cx="720" cy="60" r="16" fill="none" stroke="#262626" strokeDasharray="2,2" />
                </g>
              )}

              {/* Main Cube Outer Walls (Envelope de Concreto 500mm) */}
              <rect
                x="140"
                y="90"
                width="520"
                height="270"
                fill="#0d0d12"
                stroke="#d4d4d8"
                strokeWidth="4"
              />
              <rect
                x="155"
                y="105"
                width="490"
                height="240"
                fill="#08080a"
                stroke="#262626"
                strokeWidth="1"
              />

              {/* Fenda Cruciforme na parede Leste (X: 660, Y: 225) */}
              {/* Fenda Vertical */}
              <line x1="660" y1="120" x2="660" y2="330" stroke="#ff5352" strokeWidth="6" strokeLinecap="square" />
              {/* Fenda Horizontal */}
              <line x1="640" y1="210" x2="675" y2="210" stroke="#ff5352" strokeWidth="6" strokeLinecap="square" />
              {/* Feixe de Luz Zenital projetado no piso da nave */}
              <polygon
                points="660,210 400,160 400,260"
                fill="url(#ando-light-beam)"
                opacity="0.45"
              />

              {/* A Parede Oblíqua a 15 Graus (corta a nave) */}
              <line
                x1="220"
                y1="390"
                x2="380"
                y2="70"
                stroke="#ffb3ae"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Rasgo de passagem na parede oblíqua */}
              <line x1="280" y1="270" x2="310" y2="210" stroke="#050507" strokeWidth="9" />

              {/* Altar de Cedro */}
              <rect x="560" y="195" width="40" height="60" fill="#262626" stroke="#ff5352" strokeWidth="1" />
              <text x="564" y="230" fill="#ffffff" fontSize="9" fontFamily="monospace">ALTAR</text>

              {/* Bancos de Cedro (Linhas de assentos) */}
              {[150, 180, 210, 240, 270, 300].map((yVal, i) => (
                <line
                  key={i}
                  x1="420"
                  y1={yVal}
                  x2="520"
                  y2={yVal}
                  stroke="#333338"
                  strokeWidth="2.5"
                  strokeDasharray="6,3"
                />
              ))}

              {/* Cotas e Dimensões */}
              {showAnnotations && (
                <g fill="#71717a" fontSize="9" fontFamily="monospace">
                  <text x="360" y="75" textAnchor="middle">PAREDE A 15° // COMPRESSÃO 27.6 MPa</text>
                  <text x="675" y="190">FENDA 200mm</text>
                  <text x="140" y="380">← PÓRTICO TATAMI (180x90cm)</text>
                </g>
              )}

              {/* Gradiente do feixe de luz */}
              <defs>
                <linearGradient id="ando-light-beam" x1="1" y1="0.5" x2="0" y2="0.5">
                  <stop offset="0%" stopColor="#ff5352" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ff5352" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </g>
          )}

          {/* ========================================================================= */}
          {/* STANLEY KUBRICK: 2001 A SPACE ODYSSEY (Discovery One Blueprint)           */}
          {/* ========================================================================= */}
          {masterclass.id === "kubrick" && (
            <g className="transition-opacity duration-500">
              {/* Linha Central de Eixo Simétrico */}
              {showAxes && (
                <line
                  x1="50"
                  y1="225"
                  x2="750"
                  y2="225"
                  stroke="#ff5352"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />
              )}

              {/* Discovery One: Esfera de Comando Diâmetro 16.5m */}
              <circle cx="240" cy="225" r="95" fill="#0d0d12" stroke="#d4d4d8" strokeWidth="3" />
              {/* Centrífuga Gravitacional Interna (11.5m) */}
              <circle cx="240" cy="225" r="65" fill="#121216" stroke="#ff5352" strokeWidth="2" strokeDasharray="8,4" />
              {/* Olho de HAL 9000 no centro exato */}
              <circle cx="240" cy="225" r="14" fill="#000000" stroke="#ff5352" strokeWidth="2.5" />
              <circle cx="240" cy="225" r="5" fill="#ff5352" className="animate-ping" />
              <circle cx="240" cy="225" r="5" fill="#ff5352" />

              {/* Coluna Vertebral Modular (Módulos de Carga) */}
              <line x1="335" y1="225" x2="680" y2="225" stroke="#71717a" strokeWidth="8" />
              {[380, 440, 500, 560, 620].map((xVal, i) => (
                <rect
                  key={i}
                  x={xVal - 15}
                  y="205"
                  width="30"
                  height="40"
                  fill="#1c1c20"
                  stroke="#52525b"
                  strokeWidth="1.5"
                />
              ))}

              {/* Bloco de Propulsão Traseira e Escudos Nucleares */}
              <polygon points="680,185 750,165 750,285 680,265" fill="#18181b" stroke="#d4d4d8" strokeWidth="2" />
              <line x1="750" y1="190" x2="770" y2="180" stroke="#ff5352" strokeWidth="2" />
              <line x1="750" y1="225" x2="775" y2="225" stroke="#ff5352" strokeWidth="2" />
              <line x1="750" y1="260" x2="770" y2="270" stroke="#ff5352" strokeWidth="2" />

              {/* Cotas e Dimensões */}
              {showAnnotations && (
                <g fill="#71717a" fontSize="9" fontFamily="monospace">
                  <text x="240" y="110" textAnchor="middle">CENTRÍFUGA GRAVITACIONAL // Ø 11.5m (3 RPM)</text>
                  <text x="240" y="340" textAnchor="middle">ESFERA DE COMANDO HAL 9000</text>
                  <text x="500" y="180" textAnchor="middle">ESPINHA ESTRUTURAL (165 METROS)</text>
                  <text x="710" y="310">PROPULSÃO IÔNICA</text>
                </g>
              )}
            </g>
          )}

          {/* ========================================================================= */}
          {/* LINA BO BARDI: MASP (Corte Estrutural & Vão Livre)                        */}
          {/* ========================================================================= */}
          {masterclass.id === "bo-bardi" && (
            <g className="transition-opacity duration-500">
              {/* Linha do Chão / Avenida Paulista */}
              <line x1="60" y1="310" x2="740" y2="310" stroke="#52525b" strokeWidth="3" />
              <text x="70" y="325" fill="#71717a" fontSize="9" fontFamily="monospace">NÍVEL 0.00 // AVENIDA PAULISTA</text>

              {/* Desnível da 9 de Julho (Mirante a -14m) */}
              <path d="M 600,310 L 600,400 L 740,400" fill="none" stroke="#3f3f46" strokeWidth="2" strokeDasharray="3,3" />
              <text x="610" y="420" fill="#71717a" fontSize="8" fontFamily="monospace">DESNÍVEL -14.00m (VALE 9 DE JULHO)</text>

              {/* Os 4 Pilares Vermelhos Protendidos (2 Visíveis no corte lateral) */}
              {/* Pilar Esquerdo */}
              <rect x="120" y="80" width="40" height="230" fill="#ff5352" stroke="#ffffff" strokeWidth="1.5" />
              {/* Pilar Direito */}
              <rect x="580" y="80" width="40" height="230" fill="#ff5352" stroke="#ffffff" strokeWidth="1.5" />

              {/* As Duas Grandes Vigas Protendidas Superiores */}
              <rect x="110" y="80" width="520" height="35" fill="#ff5352" stroke="#ffffff" strokeWidth="1.5" />
              <text x="370" y="102" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                VIGA PROTENDIDA DE 74 METROS // CARGA 30.000t
              </text>

              {/* A Caixa Suspensa de Vidro (Pinacoteca) */}
              <rect
                x="145"
                y="115"
                width="450"
                height="125"
                fill="#121218"
                stroke="#38bdf8"
                strokeWidth="2"
                opacity="0.85"
              />
              {/* Esquadrias e Cavaletes de Cristal Internos */}
              {[200, 260, 320, 380, 440, 500].map((xPos, idx) => (
                <line
                  key={idx}
                  x1={xPos}
                  y1="140"
                  x2={xPos}
                  y2="220"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4,2"
                  opacity="0.6"
                />
              ))}

              {/* O Vão Livre Desobstruído (8 Metros de Altura) */}
              <rect x="160" y="240" width="420" height="70" fill="#ff5352" opacity="0.08" />
              <line x1="160" y1="275" x2="580" y2="275" stroke="#ffb3ae" strokeWidth="1" strokeDasharray="4,4" />
              <text x="370" y="270" fill="#ffb3ae" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                ← VÃO LIVRE CÍVICO DE 74 METROS (PÉ-DIREITO 8.00m) →
              </text>

              {/* Cotas */}
              {showAnnotations && (
                <g fill="#71717a" fontSize="9" fontFamily="monospace">
                  <text x="140" y="65">PILAR 01 (VERMELHO AUTOMOTIVO)</text>
                  <text x="600" y="65">PILAR 02 (4000 PSI)</text>
                  <text x="370" y="175" fill="#38bdf8" textAnchor="middle">PINACOTECA COM CAVALETES DE CRISTAL</text>
                </g>
              )}
            </g>
          )}
        </svg>

        {/* Hotspots Interativos Sobrepostos Clicáveis */}
        {masterclass.blueprintHotspots.map((h) => {
          const isSelected = h.id === activeHotspotId;
          return (
            <button
              key={h.id}
              onClick={() => handleHotspotClick(h)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/point cursor-pointer focus:outline-none"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              title={`Navegar para ${h.name} [${h.time}]`}
            >
              {/* Outer pulsing ring */}
              <span
                className={`absolute inset-0 rounded-full transition-all ${
                  isSelected
                    ? "w-8 h-8 -left-2 -top-2 bg-[#ff5352]/30 animate-ping"
                    : "w-6 h-6 -left-1.5 -top-1.5 bg-white/10 group-hover/point:bg-[#ff5352]/20"
                }`}
              />

              {/* Center point pin */}
              <div
                className={`relative w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] shadow-lg transition-transform ${
                  isSelected
                    ? "bg-[#ff5352] text-white scale-125 ring-2 ring-white"
                    : "bg-[#18181b] border border-white/60 text-white group-hover/point:scale-110 group-hover/point:border-[#ff5352]"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Floating Tooltip Label */}
              <div
                className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#121216] border border-[#ff5352] px-2.5 py-1 whitespace-nowrap shadow-2xl z-30 pointer-events-none transition-all ${
                  isSelected ? "opacity-100 scale-100" : "opacity-0 group-hover/point:opacity-100 scale-95"
                }`}
              >
                <div className="flex items-center gap-1.5 text-[9px]">
                  <span className="text-[#ffb3ae] font-bold">[{h.time}]</span>
                  <span className="text-white font-medium">{h.name}</span>
                </div>
                <span className="text-neutral-400 text-[8px] block">{h.tag}</span>
              </div>
            </button>
          );
        })}

        {/* Viewport Scale Indicator on Bottom-Left */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 bg-black/80 px-2 py-1 border border-white/10 text-[9px] text-neutral-400">
          <MapPin className="w-3 h-3 text-[#ff5352]" />
          <span>ESCALA: 1:100 // EIXO DCI 4K</span>
        </div>

        {/* Active Hotspot Mini HUD on Bottom-Right */}
        <div className="absolute bottom-3 right-3 z-20 bg-black/85 border border-[#ff5352]/40 px-3 py-1.5 text-right text-[10px]">
          <span className="text-[#ffb3ae] font-bold block">{activeHotspot.name}</span>
          <span className="text-neutral-400 block text-[9px]">
            {activeHotspot.time} • Clicar para saltar
          </span>
        </div>
      </div>

      {/* Selected Hotspot Detailed Card */}
      <div className="p-3.5 bg-[#141416] border border-[#262626] border-l-2 border-l-[#ff5352] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-[#ff5352] text-white text-[9px] font-bold">
              {activeHotspot.tag}
            </span>
            <span className="text-white font-bold text-xs">{activeHotspot.name}</span>
          </div>
          <button
            onClick={() => onSeekTo(activeHotspot.seconds)}
            className="text-[10px] text-[#ffb3ae] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Ir para {activeHotspot.time} no vídeo →</span>
          </button>
        </div>
        <p className="text-neutral-300 text-xs font-sans leading-relaxed">
          {activeHotspot.description}
        </p>
      </div>

      {/* Hotspots Quick Navigation Pills */}
      <div className="space-y-1.5">
        <span className="text-neutral-500 uppercase text-[9px] tracking-wider block">
          Pontos Notáveis da Planta ({masterclass.blueprintHotspots.length}):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {masterclass.blueprintHotspots.map((h) => {
            const isSel = h.id === activeHotspotId;
            return (
              <button
                key={h.id}
                onClick={() => handleHotspotClick(h)}
                className={`p-2 border text-left transition-colors cursor-pointer space-y-0.5 ${
                  isSel
                    ? "bg-[#1f1f23] border-[#ff5352]"
                    : "bg-[#111114] hover:bg-[#161619] border-[#262626]"
                }`}
              >
                <div className="flex items-center justify-between text-[9px]">
                  <span className="text-[#ffb3ae] font-bold">[{h.time}]</span>
                  <span className="text-neutral-500">{h.tag}</span>
                </div>
                <span className="text-white text-[11px] block truncate font-medium">
                  {h.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
