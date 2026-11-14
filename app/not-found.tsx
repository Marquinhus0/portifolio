import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full border border-surface-border bg-neutral-950 p-8 space-y-6 text-center">
        <span className="font-mono text-xs text-[#13E1BC] uppercase tracking-widest block">
          Erro 404 // Rota Não Encontrada
        </span>
        <h1 className="text-3xl font-medium tracking-tight text-white">
          Página não encontrada
        </h1>
        <p className="text-xs text-neutral-400 font-mono leading-relaxed">
          O caminho solicitado não existe ou foi movido na estrutura deste portfólio.
        </p>
        <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-[#13E1BC] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao início</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <span>Ver projetos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
