import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contato & Briefing",
  description:
    "Envie mensagem direta, gere um briefing rápido ou baixe o currículo de Marcus Ritta — Product Designer B2B & ERP.",
  openGraph: {
    title: "Contato — Marcus Ritta",
    description:
      "Disponível para oportunidades CLT, PJ e consultoria de Product Design B2B e ERP.",
    images: ["/og-cover.jpg"],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
