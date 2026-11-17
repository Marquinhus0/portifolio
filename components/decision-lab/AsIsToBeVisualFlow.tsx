"use client";

import { useState } from "react";
import { AlertTriangle, ArrowDown, ArrowRight, CheckCircle2, GitCommitHorizontal } from "lucide-react";
import type { Locale } from "@/context/LanguageContext";
import type { AsIsToBeConfig, FlowNodeItem } from "@/data/decisionLab/types";

interface AsIsToBeVisualFlowProps {
  locale: Locale;
  config: AsIsToBeConfig;
}

export default function AsIsToBeVisualFlow({
  locale,
  config,
}: AsIsToBeVisualFlowProps) {
  const isEn = locale === "en";
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    config.asIsNodes.find((n) => n.isFriction)?.id || config.asIsNodes[0]?.id || ""
  );

  const allNodes = [...config.asIsNodes, ...config.toBeNodes];
  const inspectedNode: FlowNodeItem | undefined =
    allNodes.find((n) => n.id === selectedNodeId) || config.asIsNodes[0];

  const renderTrack = (
    title: string,
    subtitle: string,
    nodes: FlowNodeItem[],
    variant: "asis" | "tobe"
  ) => {
    const isAsIs = variant === "asis";
    return (
      <div
        className={`p-5 sm:p-6 border space-y-5 ${
          isAsIs
            ? "border-amber-500/30 bg-amber-950/[0.08]"
            : "border-[#13E1BC]/35 bg-[#13E1BC]/[0.04]"
        }`}
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider">
            <span className={isAsIs ? "text-amber-300 font-semibold" : "text-[#13E1BC] font-semibold"}>
              {title}
            </span>
            <span className="text-[10px] text-neutral-400">
              {isEn ? "Click any node to inspect" : "Clique em um nó para detalhar"}
            </span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">{subtitle}</p>
        </div>

        {/* Visual Connected Node Sequence */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-2">
          {nodes.map((node, idx) => {
            const active = node.id === selectedNodeId;
            const nodeTone = node.isFriction
              ? active
                ? "border-rose-400 bg-rose-950/40"
                : "border-rose-500/40 bg-[#080808] hover:border-rose-400"
              : node.isImproved
              ? active
                ? "border-[#13E1BC] bg-[#13E1BC]/15"
                : "border-[#13E1BC]/35 bg-[#080808] hover:border-[#13E1BC]"
              : active
              ? "border-white bg-neutral-900"
              : "border-neutral-800 bg-[#080808] hover:border-neutral-600";

            return (
              <div
                key={node.id}
                className="flex-1 flex flex-col lg:flex-row lg:items-center gap-2 min-w-0"
              >
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  aria-pressed={active}
                  className={`w-full text-left p-3.5 border transition-colors flex flex-col justify-between gap-2.5 h-full min-w-0 ${nodeTone}`}
                >
                  <div className="flex items-center justify-between gap-1.5 text-[10px] font-mono">
                    <span className="text-neutral-400">{node.step}</span>
                    {node.isFriction ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-rose-950/60 border border-rose-500/40 text-rose-300 rounded-sm">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>{node.stateTag}</span>
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 border rounded-sm ${
                          node.isImproved
                            ? "bg-[#13E1BC]/15 border-[#13E1BC]/40 text-[#13E1BC]"
                            : "bg-neutral-900 border-neutral-700 text-neutral-300"
                        }`}
                      >
                        {node.isImproved && <CheckCircle2 className="w-2.5 h-2.5" />}
                        <span>{node.stateTag}</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-white leading-snug block">
                    {node.label}
                  </span>
                </button>

                {idx < nodes.length - 1 && (
                  <div className="flex items-center justify-center shrink-0 text-neutral-500" aria-hidden="true">
                    <ArrowRight className="w-4 h-4 hidden lg:block" />
                    <ArrowDown className="w-4 h-4 lg:hidden" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Dual Flow Diagrams */}
      <div className="space-y-4">
        {renderTrack(config.asIsTitle, config.asIsSubtitle, config.asIsNodes, "asis")}
        {renderTrack(config.toBeTitle, config.toBeSubtitle, config.toBeNodes, "tobe")}
      </div>

      {/* Selected Node Inspection Bar */}
      {inspectedNode && (
        <div className="p-4 border border-neutral-800 bg-[#080808] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="font-mono uppercase tracking-wider text-[#13E1BC] block text-[11px]">
              {isEn ? "Inspected Node:" : "Nó Inspecionado:"} [{inspectedNode.step}]{" "}
              {inspectedNode.label} ({inspectedNode.stateTag})
            </span>
            <p className="text-neutral-200 leading-relaxed">{inspectedNode.detail}</p>
          </div>
          {inspectedNode.isFriction && (
            <span className="px-2.5 py-1 border border-rose-500/40 bg-rose-950/30 text-rose-300 font-mono text-[10px] uppercase tracking-wider shrink-0 self-start sm:self-center">
              {isEn ? "Friction Hotspot" : "Ponto de Fricção"}
            </span>
          )}
        </div>
      )}

      {/* State Transition Pipeline & Key Architectural Differences */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 p-5 border border-surface-border bg-[#080808] space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#13E1BC] flex items-center gap-2">
            <GitCommitHorizontal className="w-4 h-4" />
            <span>
              {isEn ? "System State Transitions" : "Mudanças de Estado do Sistema"}
            </span>
          </span>
          <div className="space-y-2.5">
            {config.stateTransitions.map((st, idx) => (
              <div
                key={idx}
                className="p-3 border border-neutral-850 bg-neutral-950 flex flex-col gap-1.5 text-xs font-mono"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-300">
                    {st.from}
                  </span>
                  <span className="text-neutral-400 text-[11px]">──[{st.trigger}]──▶</span>
                  <span className="px-2 py-0.5 bg-[#13E1BC]/15 border border-[#13E1BC]/40 text-[#13E1BC] font-semibold">
                    {st.to}
                  </span>
                </div>
                <span className="text-[11px] font-sans text-neutral-400">
                  {st.guardNote}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 p-5 border border-surface-border bg-[#080808] space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 block">
            {isEn
              ? "Why To-Be Improves This Workflow"
              : "Diferenças Estruturais (As-Is → To-Be)"}
          </span>
          <ul className="space-y-2.5 text-xs text-neutral-200 leading-relaxed">
            {config.keyDifferences.map((diff, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-mono text-[#13E1BC] font-bold shrink-0">0{i + 1}</span>
                <span>{diff}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
