"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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
    accentHex: string;
  }
> = {
  "pulse-social-network": {
    src: "/cases/pulse-cover.jpg",
    accentHex: "#ffffff",
  },
  "frame-interactive-video": {
    src: "/cases/frame-cover.jpg",
    accentHex: "#ff5352",
  },
  "flow-crm-b2b": {
    src: "/cases/flow-crm-cover.jpg",
    accentHex: "#1683E8",
  },
  "supplyhub-procurement-b2b": {
    src: "/cases/supplyhub-cover.jpg",
    accentHex: "#16845a",
  },
  "erp-enterprise-redesign": {
    src: "/cases/erp-enterprise-cover.jpg",
    accentHex: "#13E1BC",
  },
};

export default function CaseCardVisual({
  slug,
  title,
  coverImage,
}: CaseCardVisualProps) {
  const meta = CASE_COVERS[slug];
  const imgSrc = coverImage || meta?.src || `/cases/${slug}-cover.jpg`;

  return (
    <div className="relative w-full aspect-[16/10] bg-[#0a0a0c] overflow-hidden group select-none">
      {/* Real High-Resolution Product Interface Cover */}
      <Image
        src={imgSrc}
        alt={`Interface real do projeto ${title}`}
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* Subtle edge vignette only at bottom corner for hover CTA contrast */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Clean Hover Action Pill */}
      <div className="absolute bottom-3 right-3 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1.5 group-hover:translate-y-0">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#080808]/90 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-semibold tracking-wider uppercase rounded-sm shadow-xl">
          <span>Explorar Case</span>
          <ArrowUpRight className="w-3 h-3 text-[#13E1BC]" />
        </span>
      </div>
    </div>
  );
}
