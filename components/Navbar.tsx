"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Globe, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { NAV_TRANSLATIONS } from "@/data/translations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();
  const t = NAV_TRANSLATIONS[locale];

  const navLinks = [
    { name: t.links.home, href: "/" },
    { name: t.links.work, href: "/work" },
    { name: t.links.decisionLab, href: "/decision-lab" },
    { name: t.links.about, href: "/about" },
    { name: t.links.contact, href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-borderSubtle bg-background/90 backdrop-blur-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 focus-visible:outline-none"
          aria-label={t.brandAria}
        >
          <span className="text-base font-medium tracking-tight text-white group-hover:text-neutral-300 transition-colors flex items-center">
            Marcus Ritta
            <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC] inline-block ml-1.5 shadow-[0_0_8px_#13E1BC]" />
          </span>
          <span className="hidden sm:inline-block text-xs font-mono tracking-wider text-neutral-500 uppercase">
            / Product Designer
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-1"
          aria-label={t.mainNavAria}
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3.5 py-1.5 text-sm tracking-tight transition-colors duration-150 rounded-md ${
                  active
                    ? "text-white font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-[#13E1BC] shadow-[0_0_8px_rgba(19,225,188,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Command Center, Language Switcher, Status Indicator & Resume Link */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-center"))}
            aria-label={
              locale === "en"
                ? "Open Product Command Center (Ctrl+K)"
                : "Abrir Central de Comando de Produto (Ctrl+K)"
            }
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-neutral-800 bg-neutral-950 hover:border-[#13E1BC]/60 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors"
          >
            <Search className="w-3 h-3 text-[#13E1BC]" />
            <kbd className="text-[10px] text-neutral-400">⌘K</kbd>
          </button>

          <div
            className="inline-flex items-center rounded-sm border border-neutral-800 bg-neutral-950 p-0.5 text-[10px] font-mono"
            role="group"
            aria-label="Idioma / Language"
          >
            <Globe className="w-3 h-3 text-neutral-500 mx-1.5" />
            <button
              type="button"
              onClick={() => setLocale("pt")}
              aria-pressed={locale === "pt"}
              className={`px-2 py-0.5 rounded-sm transition-colors ${
                locale === "pt"
                  ? "bg-[#13E1BC] text-[#080808] font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={`px-2 py-0.5 rounded-sm transition-colors ${
                locale === "en"
                  ? "bg-[#13E1BC] text-[#080808] font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <Link
            href="/contact"
            className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 hover:border-[#13E1BC]/50 transition-colors text-xs text-neutral-300"
            title={t.availableTitle}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13E1BC] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#13E1BC] shadow-[0_0_8px_#13E1BC]" />
            </span>
            <span className="font-mono text-[11px] tracking-tight">
              {t.available}
            </span>
          </Link>

          <Link
            href="/resume"
            aria-current={isActive("/resume") ? "page" : undefined}
            className={`flex items-center gap-1 text-xs font-mono uppercase tracking-wider transition-colors border-b pb-0.5 ${
              isActive("/resume")
                ? "text-[#13E1BC] border-[#13E1BC]"
                : "text-neutral-400 hover:text-[#13E1BC] border-transparent hover:border-[#13E1BC]"
            }`}
          >
            <span>{t.resume}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2.5">
          <div
            className="inline-flex items-center rounded-sm border border-neutral-800 bg-neutral-950 p-0.5 text-[10px] font-mono"
            role="group"
            aria-label="Idioma / Language"
          >
            <button
              type="button"
              onClick={() => setLocale("pt")}
              aria-pressed={locale === "pt"}
              className={`px-1.5 py-0.5 rounded-sm transition-colors ${
                locale === "pt"
                  ? "bg-[#13E1BC] text-[#080808] font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={`px-1.5 py-0.5 rounded-sm transition-colors ${
                locale === "en"
                  ? "bg-[#13E1BC] text-[#080808] font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-neutral-800 bg-neutral-900/80 text-[10px] font-mono text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[#13E1BC] shadow-[0_0_6px_#13E1BC]" />
            <span>{t.available}</span>
          </span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-center"))}
            className="p-2 text-neutral-300 hover:text-[#13E1BC] border border-neutral-800 rounded-sm bg-neutral-950"
            aria-label={
              locale === "en"
                ? "Open Product Command Center"
                : "Abrir Central de Comando"
            }
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-neutral-400 hover:text-white focus:outline-none border border-neutral-800 rounded-sm bg-neutral-950"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-surface-border bg-neutral-950/98 backdrop-blur-lg px-6 py-6">
          <nav className="flex flex-col space-y-3" aria-label="Menu mobile">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`py-2 text-base font-medium tracking-tight flex items-center justify-between border-b border-neutral-900 ${
                    active ? "text-[#13E1BC]" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC] shadow-[0_0_6px_#13E1BC]" />
                  )}
                </Link>
              );
            })}

            <div className="pt-3 flex items-center justify-between">
              <Link
                href="/resume"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#13E1BC] transition-colors"
              >
                <span>{locale === "en" ? "View Resume / CV" : "Ver Currículo / CV"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
