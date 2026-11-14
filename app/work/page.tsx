import type { Metadata } from "next";
import WorkPageClient from "@/components/WorkPageClient";

export const metadata: Metadata = {
  title: "Projetos & Estudos de Caso",
  description:
    "Índice de projetos de Product Design e UX: PULSE, FRAME, Flow CRM, SupplyHub e Case 05 NDA-safe de ERP Corporativo B2B.",
  openGraph: {
    title: "Projetos & Estudos de Caso — Marcus Ritta",
    description:
      "Estudos de caso de Product Design e UX para ERPs, SaaS B2B e mídia interativa com sandboxes funcionais em React.",
    images: ["/og-cover.jpg"],
  },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
