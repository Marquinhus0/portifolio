import type { Metadata } from "next";
import ResumePageClient from "@/components/ResumePageClient";

export const metadata: Metadata = {
  title: "Currículo & PDF",
  description:
    "Currículo completo de Marcus Ritta em português e inglês pronto para impressão e exportação em PDF.",
  openGraph: {
    title: "Currículo & PDF — Marcus Ritta",
    description:
      "Experiência em Product Design, Análise de Negócios ERP (15+ implantações), competências técnicas e formação.",
    images: ["/og-cover.jpg"],
  },
};

export default function ResumePage() {
  return <ResumePageClient />;
}
