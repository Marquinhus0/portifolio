import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full border border-surface-border bg-neutral-950 p-8 space-y-6 text-center">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
          Error 404 // Page Not Found
        </span>
        <h1 className="text-3xl font-medium tracking-tight text-white">
          Página não encontrada
        </h1>
        <p className="text-xs text-neutral-400 font-mono leading-relaxed">
          O caminho solicitado não existe ou está temporariamente indisponível na
          arquitetura deste portfólio.
        </p>
        <div className="pt-4 border-t border-neutral-900">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao início</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
