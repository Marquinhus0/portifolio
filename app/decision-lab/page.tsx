import type { Metadata } from "next";
import UxDecisionLab from "@/components/UxDecisionLab";

export const metadata: Metadata = {
  title: "UX Decision Lab & Product Thinking",
  description:
    "Simulador interativo de decisões de produto em ERP, Procurement e SaaS B2B: trade-offs, regras de negócio, arquitetura de informação e critérios de aceitação.",
  openGraph: {
    title: "UX Decision Lab & Product Thinking — Marcus Ritta",
    description:
      "Explore dilemas reais de sistemas corporativos e compare decisões entre velocidade operacional, regras fiscais/negócio e esforço de engenharia.",
    images: ["/og-cover.jpg"],
  },
};

export default function DecisionLabPage() {
  return <UxDecisionLab />;
}
