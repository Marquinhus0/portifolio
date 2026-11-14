import dynamic from "next/dynamic";
import { CaseStudy } from "@/types";

function CaseStudyLoadingSkeleton() {
  return (
    <div
      className="min-h-screen bg-[#080808] border-b border-surface-borderSubtle animate-pulse"
      aria-busy="true"
      aria-label="Carregando estudo de caso"
    >
      <div className="border-b border-surface-borderSubtle h-12" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 pb-20 space-y-6">
        <div className="h-4 w-48 bg-neutral-900 rounded-sm" />
        <div className="h-12 w-3/4 bg-neutral-900 rounded-sm" />
        <div className="h-6 w-2/3 bg-neutral-900 rounded-sm" />
        <div className="mt-14 h-[420px] w-full bg-neutral-900/70 border border-neutral-800 rounded-sm" />
      </div>
    </div>
  );
}

const PulseCaseStudy = dynamic(() => import("./PulseCaseStudy"), {
  loading: () => <CaseStudyLoadingSkeleton />,
});

const FrameInteractiveVideoCaseStudy = dynamic(
  () => import("./FrameInteractiveVideoCaseStudy"),
  { loading: () => <CaseStudyLoadingSkeleton /> }
);

const FlowInternalCrmCaseStudy = dynamic(
  () => import("./FlowInternalCrmCaseStudy"),
  { loading: () => <CaseStudyLoadingSkeleton /> }
);

const SupplyHubCaseStudy = dynamic(() => import("./SupplyHubCaseStudy"), {
  loading: () => <CaseStudyLoadingSkeleton />,
});

const ErpEnterpriseCaseStudy = dynamic(
  () => import("./ErpEnterpriseCaseStudy"),
  { loading: () => <CaseStudyLoadingSkeleton /> }
);

interface CaseStudyViewProps {
  caseStudy: CaseStudy;
  nextCase: CaseStudy;
  prevCase: CaseStudy;
}

export default function CaseStudyView({
  caseStudy,
  nextCase,
  prevCase,
}: CaseStudyViewProps) {
  switch (caseStudy.slug) {
    case "erp-enterprise-redesign":
      return (
        <ErpEnterpriseCaseStudy
          caseStudy={caseStudy}
          nextCase={nextCase}
          prevCase={prevCase}
        />
      );
    case "flow-crm-b2b":
      return (
        <FlowInternalCrmCaseStudy
          caseStudy={caseStudy}
          nextCase={nextCase}
          prevCase={prevCase}
        />
      );
    case "frame-interactive-video":
      return (
        <FrameInteractiveVideoCaseStudy
          caseStudy={caseStudy}
          nextCase={nextCase}
          prevCase={prevCase}
        />
      );
    case "supplyhub-procurement-b2b":
      return (
        <SupplyHubCaseStudy
          caseStudy={caseStudy}
          nextCase={nextCase}
          prevCase={prevCase}
        />
      );
    default:
      return (
        <PulseCaseStudy
          caseStudy={caseStudy}
          nextCase={nextCase}
          prevCase={prevCase}
        />
      );
  }
}
