"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
  const { locale } = useLanguage();
  const meta = CASE_COVERS[slug];
  const imgSrc = coverImage || meta?.src || `/cases/${slug}-cover.jpg`;
  const isRealErp = slug === "erp-enterprise-redesign";

  const altText = isRealErp
    ? locale === "en"
      ? `Anonymized structural reconstruction of ${title}`
      : `Reconstrução estrutural anonimizada de ${title}`
    : locale === "en"
    ? `Visual preview of authorial study ${title}`
    : `Preview visual do estudo autoral ${title}`;

  return (
    <div className="relative w-full aspect-[16/10] bg-[#0a0a0c] overflow-hidden group select-none">
      <Image
        src={imgSrc}
        alt={altText}
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
      />

      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      <div className="absolute bottom-3 right-3 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 motion-reduce:translate-y-0">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#080808]/95 border border-white/20 text-white font-mono text-[10px] font-semibold tracking-wider uppercase rounded-sm shadow-xl">
          <span>{locale === "en" ? "Explore Study" : "Explorar Case"}</span>
          <ArrowUpRight className="w-3 h-3 text-[#13E1BC]" />
        </span>
      </div>
    </div>
  );
}
