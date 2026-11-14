import type { Metadata } from "next";
import AboutPageClient from "@/components/AboutPageClient";

export const metadata: Metadata = {
  title: "Sobre & Design System",
  description:
    "Trajetória de Marcus Ritta em ERPs corporativos, 15+ implantações B2B na ALFA Software, abordagem de produto e tokens de Design System.",
  openGraph: {
    title: "Sobre & Design System — Marcus Ritta",
    description:
      "Product Designer especializado em softwares transacionais de alta densidade, descoberta de produto e prototipação funcional.",
    images: ["/og-cover.jpg"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
