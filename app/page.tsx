import Hero from "@/components/Hero";
import HomeSelectedWorkSection from "@/components/HomeSelectedWorkSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import IntroStatement from "@/components/IntroStatement";
import SkillsGrid from "@/components/SkillsGrid";
import PhilosophyBlock from "@/components/PhilosophyBlock";
import ContactBlock from "@/components/ContactBlock";

export default function Home() {
  return (
    <div>
      {/* 01. Hero Section + Executive Credibility Dossier */}
      <Hero />

      {/* 02. Selected Work: Interactive Case Studies */}
      <HomeSelectedWorkSection />

      {/* 03. Real-World Professional Experience */}
      <div id="experiencia">
        <ExperienceTimeline />
      </div>

      {/* 04. Positioning & 4 Architectural Pillars */}
      <IntroStatement />

      {/* 05. Competencies & Stack */}
      <SkillsGrid />

      {/* 06. Design Philosophy */}
      <PhilosophyBlock />

      {/* 07. Direct Contact */}
      <ContactBlock />
    </div>
  );
}
