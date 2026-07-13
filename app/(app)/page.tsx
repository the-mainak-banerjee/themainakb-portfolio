import { MainContainer } from "@/components/global/containers";
import SectionListContainer from "@/components/global/section-list-container";
import ComponentSection from "@/features/portfolio/components/components-section/component-section";
import ExperienceSection from "@/features/portfolio/components/experience-section/experience-section";
import HeroSection from "@/features/portfolio/components/hero-section/hero-section";
import TechStackSection from "@/features/portfolio/components/tech-stack-section/tech-stack-section";

export default function Home() {
  return (
    <MainContainer>
      <SectionListContainer>
        <HeroSection />
        <ExperienceSection />
        <ComponentSection />
        <TechStackSection />
      </SectionListContainer>
    </MainContainer>
  );
}
