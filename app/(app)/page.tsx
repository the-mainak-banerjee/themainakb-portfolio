import { MainContainer } from "@/components/global/containers";
import SectionListContainer from "@/components/global/section-list-container";
import HomeBlogSection from "@/features/portfolio/components/blog-section/blog-section";
import ComponentSection from "@/features/portfolio/components/components-section/component-section";
import ExperienceSection from "@/features/portfolio/components/experience-section/experience-section";
import HeroSection from "@/features/portfolio/components/hero-section/hero-section";
import TechStackSection from "@/features/portfolio/components/tech-stack-section/tech-stack-section";

export default function Home() {
  return (
    <MainContainer>
      <SectionListContainer className="space-y-10 md:space-y-20">
        <HeroSection />
        <ExperienceSection />
        <ComponentSection />
        <HomeBlogSection />
        <TechStackSection />
      </SectionListContainer>
    </MainContainer>
  );
}
