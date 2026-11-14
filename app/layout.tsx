import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandCenterLauncher from "@/components/CommandCenterLauncher";
import { LanguageProvider } from "@/context/LanguageContext";
import { getSiteUrl } from "@/lib/site";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marcus Ritta — Product Designer | Discovery | ERP & SaaS B2B",
    template: "%s | Marcus Ritta",
  },
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
    url: SITE_URL,
    siteName: "Marcus Ritta Portfolio",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Marcus Ritta — Product Designer | ERP & SaaS B2B",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcus Ritta — Product Designer | Discovery | ERP & SaaS B2B",
    description:
      "Transformo processos complexos em experiências de produto mais simples. Especializado em B2B, ERP e SaaS.",
    images: ["/og-cover.jpg"],
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
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-neutral-200 font-sans min-h-screen flex flex-col selection:bg-[#13E1BC] selection:text-[#080808]">
        <LanguageProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#13E1BC] focus:text-[#080808] focus:font-mono focus:text-xs focus:font-bold focus:rounded-sm focus:shadow-lg"
          >
            Pular para o conteúdo principal / Skip to main content
          </a>
          {/* Subtle background ambient noise/grid */}
          <div className="ambient-grid fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

          <Navbar />
          <CommandCenterLauncher />
          <main id="main-content" className="flex-1 relative z-10">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
