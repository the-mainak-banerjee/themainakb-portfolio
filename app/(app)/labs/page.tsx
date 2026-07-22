import { CategoryTabs } from "@/components/global/category-tab";
import { MainContainer } from "@/components/global/containers";
import ListPageHeader from "@/components/global/list-page-header";
import SectionContainer from "@/components/global/section-container";
import { NAV_LINKS } from "@/config/site";
import { AnimatedLabItemGrid } from "@/features/lab/components/animated-lab-item-grid";
import {
  getLabsItemsCount,
  LAB_TYPE_CATEGORIES,
  LabType,
} from "@/features/lab/data/labs-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "A running log of components rebuilt to learn motion and interaction.",
  alternates: {
    canonical: `${NAV_LINKS.labs}`,
  },
};

interface ILabsPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function LabsPage({ searchParams }: ILabsPageProps) {
  const { type } = await searchParams;
  const activeType = type as LabType | undefined;
  const counts = getLabsItemsCount();
  return (
    <MainContainer>
      <SectionContainer>
        <ListPageHeader
          title="Practice reps before they ship"
          description="Components, templates, and full pages I'm rebuilding to learn new animation and interaction techniques. Some original, some inspired by other builders."
          eyebrow="Experimenting"
          count={counts.all}
          countLabel="experiments"
        />
        <CategoryTabs
          items={LAB_TYPE_CATEGORIES}
          active={activeType}
          counts={counts}
          basePath={NAV_LINKS.labs}
          queryParam="type"
        />
        <AnimatedLabItemGrid type={activeType} />
      </SectionContainer>
    </MainContainer>
  );
}
