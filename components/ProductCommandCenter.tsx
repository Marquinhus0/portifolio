"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowUpRight,
  FolderKanban,
  Scale,
  Briefcase,
  Cpu,
  Compass,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { casesData } from "@/data/cases";
import { DECISION_SCENARIOS } from "@/data/decisionLabData";
import { experienceData } from "@/data/experience";
import { skillsData } from "@/data/skills";
import {
  CASE_CARD_COPY,
  EXPERIENCE_TRANSLATIONS,
  SKILLS_TRANSLATIONS,
} from "@/data/translations";

type ItemCategory = "all" | "case" | "decision" | "experience" | "skills" | "route";

interface CommandItem {
  id: string;
  category: Exclude<ItemCategory, "all">;
  badge: string;
  title: string;
  subtitle: string;
  href: string;
  keywords: string;
}

interface ProductCommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductCommandCenter({
  isOpen,
  onClose,
}: ProductCommandCenterProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const isEn = locale === "en";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("all");
  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = useMemo<CommandItem[]>(() => {
    const caseItems: CommandItem[] = casesData.map((c) => {
      const cardMeta = CASE_CARD_COPY[locale]?.[c.slug];
      return {
        id: `case-${c.slug}`,
        category: "case",
        badge: c.isConcept
          ? `[${c.number}] ${isEn ? "AUTHORIAL" : "AUTORAL"}`
          : `[${c.number}] ${isEn ? "REAL PRODUCT" : "PRODUTO REAL"}`,
        title: cardMeta ? cardMeta.title : c.title,
        subtitle: cardMeta ? cardMeta.subtitle : c.subtitle,
        href: `/work/${c.slug}`,
        keywords: `${c.title} ${c.category} ${c.tags.join(" ")} ${c.company}`,
      };
    });

    const decisionItems: CommandItem[] = DECISION_SCENARIOS[locale].map((s) => ({
      id: `dl-${s.id}`,
      category: "decision",
      badge: `${s.code} // LAB`,
      title: s.title,
      subtitle: s.dilemma,
      href: `/decision-lab?scenario=${s.code}`,
      keywords: `${s.code} ${s.domain} ${s.title} ${s.dilemma} ${s.stakeholders.join(" ")}`,
    }));

    const expList = EXPERIENCE_TRANSLATIONS[locale].itemsEn || experienceData;
    const expItems: CommandItem[] = expList.map((e, idx) => ({
      id: `exp-${idx}`,
      category: "experience",
      badge: e.period,
      title: `${e.role} — ${e.company}`,
      subtitle: e.description,
      href: "/about#experiencia",
      keywords: `${e.role} ${e.company} ${e.domain} ${e.technologies.join(" ")}`,
    }));

    const skillCats = SKILLS_TRANSLATIONS[locale].itemsEn || skillsData;
    const skillItems: CommandItem[] = skillCats.map((cat) => ({
      id: `skill-${cat.category}`,
      category: "skills",
      badge: isEn ? "STACK" : "COMPETÊNCIA",
      title: cat.category,
      subtitle: cat.skills.join(" • "),
      href: "/#competencias",
      keywords: `${cat.category} ${cat.description} ${cat.skills.join(" ")}`,
    }));

    const routeItems: CommandItem[] = [
      {
        id: "route-ds",
        category: "route",
        badge: "PLAYGROUND",
        title: isEn
          ? "Design System Playground & Tokens"
          : "Design System Playground & Tokens",
        subtitle: isEn
          ? "Interactive table density, form rules, modal, and edge states"
          : "Densidade tabular, regras de formulário, modal de alçada e tokens hex",
        href: "/about#design-system",
        keywords: "design system tokens figma css modal table input validation",
      },
      {
        id: "route-resume",
        category: "route",
        badge: "CV / PDF",
        title: isEn ? "Interactive Resume & Printable PDF" : "Currículo & PDF Imprimível",
        subtitle: isEn
          ? "Consolidated executive history ready for hiring teams"
          : "Resumo executivo consolidado pronto para exportação em PDF",
        href: "/resume",
        keywords: "resume curriculo cv pdf career",
      },
      {
        id: "route-contact",
        category: "route",
        badge: isEn ? "HIRE" : "CONTATO",
        title: isEn ? "Direct Contact & Briefing" : "Contato Direto & Briefing",
        subtitle: isEn
          ? "Reach out for Product Design roles or B2B consulting"
          : "Canal direto para oportunidades de Product Design e projetos B2B",
        href: "/contact",
        keywords: "contact email linkedin briefing hire",
      },
    ];

    return [...caseItems, ...decisionItems, ...expItems, ...skillItems, ...routeItems];
  }, [isEn, locale]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      return `${item.title} ${item.subtitle} ${item.badge} ${item.keywords}`
        .toLowerCase()
        .includes(q);
    });
  }, [allItems, activeCategory, query]);

  useEffect(() => {
    setHighlightedIdx(0);
  }, [query, activeCategory, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => inputRef.current?.focus(), 20);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIdx((prev) =>
          filteredItems.length ? (prev + 1) % filteredItems.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIdx((prev) =>
          filteredItems.length
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : 0
        );
      } else if (e.key === "Enter" && filteredItems[highlightedIdx]) {
        e.preventDefault();
        router.push(filteredItems[highlightedIdx].href);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filteredItems, highlightedIdx, onClose, router]);

  if (!isOpen) return null;

  const categories: { id: ItemCategory; label: string }[] = [
    { id: "all", label: isEn ? "All" : "Tudo" },
    { id: "case", label: isEn ? "Cases" : "Cases" },
    { id: "decision", label: "Decision Lab" },
    { id: "experience", label: isEn ? "Career" : "Trajetória" },
    { id: "skills", label: isEn ? "Skills" : "Stack" },
    { id: "route", label: isEn ? "System" : "Atalhos" },
  ];

  const getCategoryIcon = (category: CommandItem["category"]) => {
    switch (category) {
      case "case":
        return <FolderKanban className="w-4 h-4 text-[#13E1BC]" />;
      case "decision":
        return <Scale className="w-4 h-4 text-[#13E1BC]" />;
      case "experience":
        return <Briefcase className="w-4 h-4 text-neutral-300" />;
      case "skills":
        return <Cpu className="w-4 h-4 text-neutral-300" />;
      default:
        return <Layers className="w-4 h-4 text-neutral-300" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4 pb-6"
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? "Product Command Center" : "Central de Comando de Produto"}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl border border-neutral-700 bg-[#080808] shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Command Input */}
        <div className="px-4 py-3.5 border-b border-surface-borderSubtle flex items-center gap-3 bg-neutral-950">
          <Search className="w-4 h-4 text-[#13E1BC] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isEn
                ? "Search projects, ERP/SaaS dilemmas, React stack, Design System..."
                : "Buscar cases, dilemas B2B, experiência na ALFA, Design System, React..."
            }
            aria-label={
              isEn
                ? "Search portfolio command center"
                : "Pesquisar na central de comando do portfólio"
            }
            className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none font-mono"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? "Close command center" : "Fechar central de comando"}
            className="p-1.5 text-neutral-400 hover:text-white border border-neutral-800 rounded-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-2.5 border-b border-surface-borderSubtle bg-neutral-950/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <Compass className="w-3.5 h-3.5 text-neutral-500 shrink-0 mr-1" />
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-sm border whitespace-nowrap transition-colors ${
                  active
                    ? "border-[#13E1BC] bg-[#13E1BC]/15 text-[#13E1BC] font-semibold"
                    : "border-neutral-800 bg-[#080808] text-neutral-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto divide-y divide-neutral-900">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm text-neutral-300 font-mono">
                {isEn ? "No matching portfolio entry." : "Nenhum item encontrado para esta busca."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs font-mono text-[#13E1BC] hover:underline"
              >
                {isEn ? "Reset filter" : "Limpar filtros"}
              </button>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isHighlighted = idx === highlightedIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setHighlightedIdx(idx)}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3.5 flex items-center justify-between gap-4 transition-colors ${
                    isHighlighted ? "bg-neutral-900" : "hover:bg-neutral-950"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 shrink-0">{getCategoryIcon(item.category)}</div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-white truncate">
                          {item.title}
                        </span>
                        <span className="px-1.5 py-0.5 text-[10px] font-mono border border-neutral-800 bg-neutral-950 text-neutral-400 rounded-sm">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isHighlighted ? "text-[#13E1BC]" : "text-neutral-600"
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Keyboard Hints */}
        <div className="px-4 py-2.5 border-t border-surface-borderSubtle bg-neutral-950 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-neutral-500">
          <span>
            {isEn
              ? "Product Command Center // Connected Architecture"
              : "Product Command Center // Navegação Conectada"}
          </span>
          <div className="flex items-center gap-3">
            <span>↑↓ {isEn ? "Navigate" : "Navegar"}</span>
            <span>↵ {isEn ? "Open" : "Abrir"}</span>
            <span>ESC {isEn ? "Close" : "Fechar"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
