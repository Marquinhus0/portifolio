"use client";

import Image from "next/image";

interface CaseCardVisualProps {
  slug: string;
  title: string;
  category: string;
  coverImage?: string;
}

const CASE_COVERS: Record<
  string,
  {
    src: string;
    badge: string;
    badgeColor: string;
    tag: string;
    caption: string;
  }
> = {
  "alfa-erp-automotive-redesign": {
    src: "/cases/alfa-erp-cover.jpg",
    badge: "REAL PRODUCT",
    badgeColor: "bg-[#13E1BC]/20 text-[#13E1BC] border-[#13E1BC]/40 font-semibold",
    tag: "ALFA ERP // B2B AUTOPEÇAS",
    caption: "Catálogo de Peças • PDV Balcão • Zero-Mouse Speed",
  },
  "pulse-social-network": {
    src: "/cases/pulse-cover.jpg",
    badge: "CONCEPT",
    badgeColor: "bg-white text-black font-bold border-white",
    tag: "PULSE // SINAL EDITORIAL",
    caption: "Grafo Calmo • Sem Métricas de Vaidade • Mobile App",
  },
  "frame-interactive-video": {
    src: "/cases/frame-cover.jpg",
    badge: "CONCEPT",
    badgeColor: "bg-[#ff5352]/25 text-[#ff807e] border-[#ff5352]/50",
    tag: "FRAME // CINEMA 21:9",
    caption: "Player Não-Bloqueante • Dossiê Sincronizado em Markdown",
  },
  "flow-crm-b2b": {
    src: "/cases/flow-crm-cover.jpg",
    badge: "CONCEPT",
    badgeColor: "bg-[#1683E8]/20 text-[#1683E8] border-[#1683E8]/40",
    tag: "FLOW CRM // PIPELINE B2B",
    caption: "Funil Comercial B2B • Pipeline Kanban • Operações de Vendas",
  },
  "supplyhub-procurement-b2b": {
    src: "/cases/supplyhub-cover.jpg",
    badge: "CONCEPT",
    badgeColor: "bg-[#16845a]/25 text-[#3cd68e] border-[#16845a]/50",
    tag: "SUPPLYHUB // RFQ MATRIX",
    caption: "Equalização de Cotações • Decisão por TCO • Alçadas",
  },
};

export default function CaseCardVisual({
  slug,
  title,
  category,
  coverImage,
}: CaseCardVisualProps) {
  const meta = CASE_COVERS[slug];
  const imgSrc = coverImage || meta?.src || `/cases/${slug}-cover.jpg`;

  return (
    <div className="relative w-full aspect-[16/10] bg-[#070b14] overflow-hidden group select-none">
      {/* Real High-Resolution Product Mockup Cover */}
      <Image
        src={imgSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        priority={slug === "alfa-erp-automotive-redesign"}
      />

      {/* Atmospheric overlays for editorial feel and high text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none transition-opacity duration-300 group-hover:opacity-85" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

      {/* Top Glassmorphism Status Bar */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10 text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-black/65 backdrop-blur-md border border-white/15 rounded text-white shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wider">
            {meta?.tag || title}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border rounded font-bold shadow-md backdrop-blur-md ${
            meta?.badgeColor || "bg-white text-black border-white"
          }`}
        >
          {meta?.badge || "CASE"}
        </span>
      </div>

      {/* Bottom Subtitle / Capability Ribbon */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none z-10 text-[10px] font-mono">
        <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/15 text-neutral-200 rounded truncate max-w-[80%] font-medium">
          {meta?.caption || category}
        </span>
        <span className="px-2.5 py-1 bg-white text-black font-bold rounded text-[9px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-lg">
          Ver Case →
        </span>
      </div>
    </div>
  );
}
