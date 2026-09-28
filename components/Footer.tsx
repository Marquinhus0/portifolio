"use client";

import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/in/marcusritta" },
    { name: "Email", href: "mailto:marcuszhrt@gmail.com" },
  ];

  return (
    <footer className="w-full border-t border-surface-borderSubtle bg-background py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium tracking-tight text-white flex items-center">
              Marcus Ritta
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC] inline-block ml-1.5 shadow-[0_0_8px_#13E1BC]" />
            </span>
            <span className="text-neutral-500 font-mono text-xs">/</span>
            <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
              Product Designer
            </span>
          </div>
          <p className="text-xs text-neutral-500 tracking-wide font-mono">
            Designed with curiosity. Built with purpose.
          </p>
        </div>

        {/* Center / Right Links */}
        <div className="flex flex-wrap items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-[#13E1BC] transition-colors"
            >
              <span>{link.name}</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-[#13E1BC] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs font-mono text-neutral-600 tracking-tight">
          © {currentYear} Marcus Ritta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
