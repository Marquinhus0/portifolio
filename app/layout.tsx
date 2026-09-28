import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Marcus Ritta — Product Designer | Discovery | ERP & SaaS B2B",
  description:
    "Portfólio de Marcus Ritta, Product Designer especializado em produtos B2B, ERP, SaaS, Discovery e experiências digitais complexas.",
  keywords: [
    "Product Designer",
    "Discovery",
    "Product Strategy",
    "UX/UI",
    "ERP",
    "SaaS B2B",
    "Design Systems",
    "Marcus Ritta",
  ],
  authors: [{ name: "Marcus Ritta" }],
  creator: "Marcus Ritta",
  openGraph: {
    title: "Marcus Ritta — Product Designer | Discovery | ERP & SaaS B2B",
    description:
      "Transformo processos complexos em experiências de produto mais simples. Especializado em B2B, ERP e SaaS.",
    url: "https://marcusritta.design",
    siteName: "Marcus Ritta Portfolio",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcus Ritta — Product Designer | Discovery | ERP & SaaS B2B",
    description:
      "Transformo processos complexos em experiências de produto mais simples. Especializado em B2B, ERP e SaaS.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="bg-background text-neutral-200 font-sans min-h-screen flex flex-col selection:bg-white selection:text-black">
        {/* Subtle background ambient noise/grid */}
        <div className="ambient-grid fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
