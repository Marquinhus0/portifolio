"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Projetos", href: "/work" },
    { name: "Sobre", href: "/about" },
    { name: "Currículo", href: "/resume" },
    { name: "Contato", href: "/contact" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/in/marcusritta" },
    { name: "Email", href: "mailto:marcuszhrt@gmail.com" },
  ];

  return (
    <footer className="w-full border-t border-surface-borderSubtle bg-background py-14 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium tracking-tight text-white flex items-center">
                Marcus Ritta
                <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC] inline-block ml-1.5 shadow-[0_0_8px_#13E1BC]" />
              </span>
              <span className="text-neutral-600 font-mono text-xs">/</span>
              <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
                Product Designer
              </span>
            </div>
            <p className="text-xs text-neutral-500 tracking-wide font-mono">
              Sistemas de Gestão • Plataformas B2B • Produtos Digitais Complexos
            </p>
          </div>

          {/* Internal Navigation */}
          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
            aria-label="Navegação do rodapé"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-[#13E1BC] transition-colors"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#13E1BC] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-surface-borderSubtle/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-neutral-600">
          <span>© {currentYear} Marcus Ritta. Todos os direitos reservados.</span>
          <span>Brasil • Remoto / Híbrido</span>
        </div>
      </div>
    </footer>
  );
}
