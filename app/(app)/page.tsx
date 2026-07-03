import SectionListContainer from "@/components/global/section-list-container";
import ExperienceSection from "@/features/portfolio/components/experience-section/experience-section";
import HeroSection from "@/features/portfolio/components/hero-section/hero-section";

export default function Home() {
  return (
    <SectionListContainer>
      <HeroSection />
      <ExperienceSection/>
    </SectionListContainer>
  );
}
