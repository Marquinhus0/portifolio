export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "https://portifolio-marcus-hrt.vercel.app";

  const trimmed = raw.trim().replace(/\/+$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export const COVER_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "pulse-social-network": { width: 1600, height: 1000 },
  "frame-interactive-video": { width: 1216, height: 760 },
  "flow-crm-b2b": { width: 1544, height: 965 },
  "supplyhub-procurement-b2b": { width: 1216, height: 760 },
  "erp-enterprise-redesign": { width: 1216, height: 760 },
};
