"use client";

import { useState } from "react";
import { Copy, Check, X, Share2, Film, Sparkles, Download } from "lucide-react";
import { MasterclassDataset, TranscriptLine, TimelineBead } from "./FrameMasterclassesData";

interface FrameQuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  masterclass: MasterclassDataset;
  quoteData: {
    speaker: string;
    text: string;
    time: string;
    category?: string;
  };
}

export default function FrameQuoteCardModal({
  isOpen,
  onClose,
  masterclass,
  quoteData,
}: FrameQuoteCardModalProps) {
  const [copiedType, setCopiedType] = useState<"text" | "markdown" | null>(null);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const text = `"${quoteData.text}" — ${quoteData.speaker} [${quoteData.time}] | ${masterclass.title}`;
    navigator.clipboard.writeText(text);
    setCopiedType("text");
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyMarkdown = () => {
    const md = `> "${quoteData.text}"\n>\n> — **${quoteData.speaker}** (${quoteData.time})\n> *${masterclass.title}* // FRAME Video Platform`;
    navigator.clipboard.writeText(md);
    setCopiedType("markdown");
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0e0e12] border border-[#ff5352]/50 p-6 rounded shadow-2xl space-y-5 font-mono text-xs max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div className="flex items-center space-x-2 text-white">
            <Share2 className="w-4 h-4 text-[#ff5352]" />
            <h3 className="font-bold text-sm">
              Gerador de Citação Editorial // FRAME
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Cinematic Quote Card Preview */}
        <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-[#0c0c10] via-[#141418] to-[#08080a] border border-[#ff5352]/40 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl rounded-sm">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5352]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Card Meta */}
          <div className="relative z-10 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5352] animate-pulse" />
              <span className="text-[#ffb3ae] font-bold tracking-wider">
                FRAME // ENSAIO MONOGRÁFICO
              </span>
            </div>
            <span className="text-neutral-400 bg-black/60 px-2 py-0.5 border border-white/10 rounded">
              TIMECODE: [{quoteData.time}]
            </span>
          </div>

          {/* Center Quote Body */}
          <div className="relative z-10 space-y-3 my-auto">
            <span className="text-4xl sm:text-5xl font-serif text-[#ff5352]/40 block leading-none select-none">
              &ldquo;
            </span>
            <blockquote className="text-sm sm:text-base md:text-lg font-sans text-neutral-100 italic font-normal leading-relaxed">
              {quoteData.text}
            </blockquote>
          </div>

          {/* Bottom Attribution */}
          <div className="relative z-10 pt-4 border-t border-[#262626] flex items-end justify-between text-[10px]">
            <div className="space-y-0.5">
              <span className="text-white font-bold block text-xs">
                {quoteData.speaker}
              </span>
              <span className="text-neutral-400 block truncate max-w-xs sm:max-w-md">
                {masterclass.title} ({masterclass.location})
              </span>
            </div>
            <div className="text-right">
              <span className="text-[#ff5352] font-black text-xs block">
                FRAME
              </span>
              <span className="text-neutral-500 text-[9px] block">
                2.39:1 CINEMASCOPE
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#262626]">
          <span className="text-neutral-400 text-[10px]">
            Card formatado para publicações acadêmicas, portfólio e redes de pesquisa.
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 bg-[#18181b] hover:bg-[#202025] text-white border border-[#262626] transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
            >
              {copiedType === "text" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Texto Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Texto</span>
                </>
              )}
            </button>
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 bg-[#ff5352] hover:bg-[#e04544] text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#ff5352]/20"
            >
              {copiedType === "markdown" ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Markdown Copiado!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Copiar Bloco Markdown</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
