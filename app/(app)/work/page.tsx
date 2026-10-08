import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MainContainer } from "@/components/global/containers";
import ListPageHeader from "@/components/global/list-page-header";
import SectionContainer from "@/components/global/section-container";
import SectionListContainer from "@/components/global/section-list-container";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { NAV_LINKS } from "@/config/site";
import ProjectShowcase from "@/features/portfolio/components/work/project-showcase";
import { selectedWork } from "@/features/portfolio/data/selected-work";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Products designed and built by Mainak Banerjee: live quiz experiences with QuizMB and social image creation with FrameMB.",
  alternates: { canonical: NAV_LINKS.work },
};

export default function WorkPage() {
  return (
    <MainContainer>
      <SectionListContainer className="space-y-10 md:space-y-20">
        <ListPageHeader
          eyebrow="Selected Work"
          title="Products I’m building, problems I’m solving."
          description="A selection of products I’ve designed and built—from live quiz experiences to tools that make everyday creative work easier."
        />
        {selectedWork.map((project, index) => (
          <ProjectShowcase
            key={project.id}
            project={project}
            eager={index === 0}
          />
        ))}
        <SectionContainer
          sectionLabel="Product engineering"
          sectionHeading="Let’s build something useful."
          shouldAnimate={false}
        >
          <Typography variant="body-sm">
            Open to product engineering roles and collaborations on useful
            digital products.
          </Typography>
          <Button asChild size="lg">
            <Link href={NAV_LINKS.contact}>
              Work with me <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </SectionContainer>
      </SectionListContainer>
    </MainContainer>
  );
}
