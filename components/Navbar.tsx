"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Projetos", href: "/work" },
    { name: "Sobre", href: "/about" },
    { name: "Contato", href: "/contact" },
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
          aria-label="Marcus Ritta — Início"
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
          aria-label="Navegação principal"
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

        {/* Right: Status Indicator & Resume Link */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 hover:border-[#13E1BC]/50 transition-colors text-xs text-neutral-300"
            title="Disponível para novas oportunidades e projetos"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13E1BC] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#13E1BC] shadow-[0_0_8px_#13E1BC]" />
            </span>
            <span className="font-mono text-[11px] tracking-tight">
              Disponível
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
            <span>Currículo</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-neutral-800 bg-neutral-900/80 text-[10px] font-mono text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[#13E1BC] shadow-[0_0_6px_#13E1BC]" />
            <span>Disponível</span>
          </span>
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
                <span>Ver Currículo / CV</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
