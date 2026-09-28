"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-borderSubtle bg-background/90 backdrop-blur-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 focus-visible:outline-none"
          aria-label="Marcus Ritta — Home"
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
          {/* Status Badge */}
          <div
            className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs text-neutral-300"
            title="Disponível para novas oportunidades e projetos"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13E1BC] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#13E1BC] shadow-[0_0_8px_#13E1BC]"></span>
            </span>
            <span className="font-mono text-[11px] tracking-tight">
              Open to work
            </span>
          </div>

          {/* Resume link */}
          <Link
            href="/resume"
            className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-[#13E1BC] transition-colors border-b border-transparent hover:border-[#13E1BC] pb-0.5"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-surface-border bg-neutral-950 px-6 py-6 transition-all">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium tracking-tight flex items-center justify-between ${
                  isActive(link.href) ? "text-[#13E1BC]" : "text-neutral-400"
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.href) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC] shadow-[0_0_6px_#13E1BC]" />
                )}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-surface-borderSubtle flex flex-col space-y-3">
              <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
                <span className="h-2 w-2 rounded-full bg-[#13E1BC] animate-pulse shadow-[0_0_6px_#13E1BC]" />
                <span className="font-mono">Available for opportunities</span>
              </div>
              <Link
                href="/resume"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 text-sm font-mono text-white hover:text-[#13E1BC] transition-colors"
              >
                <span>Ver Resume / CV</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
