import { notFound } from "next/navigation";
import { Metadata } from "next";
import { casesData } from "@/data/cases";
import CaseStudyView from "@/components/CaseStudyView";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return casesData.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const caseStudy = casesData.find((c) => c.slug === params.slug);
  if (!caseStudy) {
    return {
      title: "Case Not Found | Marcus Ritta",
    };
  }

  return {
    title: `${caseStudy.title} — Marcus Ritta`,
    description: caseStudy.subtitle,
    openGraph: {
      title: `${caseStudy.title} — Marcus Ritta`,
      description: caseStudy.subtitle,
    },
  };
}

export default function CaseDetailPage({ params }: PageProps) {
  const currentIndex = casesData.findIndex((c) => c.slug === params.slug);

  if (currentIndex === -1) {
    notFound();
  }

  const currentCase = casesData[currentIndex];
  const nextCase = casesData[(currentIndex + 1) % casesData.length];
  const prevCase =
    casesData[(currentIndex - 1 + casesData.length) % casesData.length];

  return (
    <CaseStudyView
      caseStudy={currentCase}
      nextCase={nextCase}
      prevCase={prevCase}
    />
  );
}
