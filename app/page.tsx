import Hero from "@/components/Hero";
import CareerMetricsStrip from "@/components/CareerMetricsStrip";
import HomeSelectedWorkSection from "@/components/HomeSelectedWorkSection";
import DecisionLabPreviewSection from "@/components/DecisionLabPreviewSection";
import IntroStatement from "@/components/IntroStatement";
import SkillsGrid from "@/components/SkillsGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactBlock from "@/components/ContactBlock";

export default function Home() {
  return (
    <div>
      {/* 01. Hero & Executive Positioning */}
      <Hero />

      {/* 02. Trajectory & Experience Indicators */}
      <CareerMetricsStrip />

      {/* 03 & 04. Featured Real Production Case (NDA-Safe) + Authorial Studies */}
      <HomeSelectedWorkSection />

      {/* 05. Product Thinking Lab Preview */}
      <DecisionLabPreviewSection />

      {/* 06. Positioning Pillars & Core Skills */}
      <IntroStatement />
      <SkillsGrid />

      {/* 07. Detailed Professional Experience */}
      <div id="experiencia">
        <ExperienceTimeline />
      </div>

      {/* 08. Direct Contact */}
      <ContactBlock />
    </div>
  );
}
