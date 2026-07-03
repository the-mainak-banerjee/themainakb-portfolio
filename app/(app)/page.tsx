import SectionListContainer from "@/components/global/section-list-container";
import ExperienceSection from "@/features/portfolio/components/experience-section/experience-section";
import HeroSection from "@/features/portfolio/components/hero-section/hero-section";
import ToolsSection from "@/features/portfolio/components/tools-section/tools-section";

export default function Home() {
  return (
    <SectionListContainer>
      <HeroSection />
      <ExperienceSection />
      <ToolsSection />
    </SectionListContainer>
  );
}
