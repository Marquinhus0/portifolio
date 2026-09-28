import { Layers, GitBranch, Layout, Monitor } from "lucide-react";

interface CasePlaceholderMediaProps {
  type?: "wireframe" | "flow" | "interface" | "architecture";
  title?: string;
  category?: string;
  aspect?: "video" | "wide" | "square";
  className?: string;
}

export default function CasePlaceholderMedia({
  type = "interface",
  title = "[Estrutura Visual do Case]",
  category = "Product Architecture",
  aspect = "video",
  className = "",
}: CasePlaceholderMediaProps) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "wide"
      ? "aspect-[21/9]"
      : "aspect-[16/10]";

  const getIcon = () => {
    switch (type) {
      case "wireframe":
        return <Layout className="w-5 h-5 text-neutral-400" />;
      case "flow":
        return <GitBranch className="w-5 h-5 text-neutral-400" />;
      case "architecture":
        return <Layers className="w-5 h-5 text-neutral-400" />;
      default:
        return <Monitor className="w-5 h-5 text-neutral-400" />;
    }
  };

  return (
    <div
      className={`relative w-full ${aspectClass} bg-neutral-950 border border-surface-border overflow-hidden group select-none ${className}`}
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:20px_20px] opacity-60" />

      {/* Crosshair accents on corners */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neutral-600" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-neutral-600" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-neutral-600" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neutral-600" />

      {/* Schematic UI Mockup Wireframe Elements inside */}
      <div className="absolute inset-6 flex flex-col justify-between pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        {/* Top Mock Header Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neutral-700" />
            <div className="w-2 h-2 rounded-full bg-neutral-800" />
            <div className="w-2 h-2 rounded-full bg-neutral-800" />
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest pl-2">
              SYS-CANVAS // {category}
            </span>
          </div>
          <span className="font-mono text-[10px] text-neutral-600">
            W:1440 H:900 DP
          </span>
        </div>

        {/* Center Blueprint Content */}
        <div className="flex flex-col items-center justify-center text-center px-4 space-y-3 my-auto">
          <div className="w-10 h-10 rounded-sm border border-neutral-700 bg-neutral-900/80 flex items-center justify-center">
            {getIcon()}
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-300">
              {title}
            </p>
            <p className="text-[11px] font-mono text-neutral-400">
              [Área reservada para imagem / protótipo de alta fidelidade]
            </p>
          </div>
        </div>

        {/* Bottom Wireframe Status Bar */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 pt-2 font-mono text-[9px] text-neutral-400">
          <span>TYPE: {type.toUpperCase()}</span>
          <span>STATUS: READY_FOR_CONTENT</span>
          <span>GRID: 8PT_ALIGNED</span>
        </div>
      </div>
    </div>
  );
}
