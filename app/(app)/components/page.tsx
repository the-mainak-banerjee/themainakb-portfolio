import { CategoryTabs } from "@/components/global/category-tab";
import { MainContainer } from "@/components/global/containers";
import ListPageHeader from "@/components/global/list-page-header";
import SectionListContainer from "@/components/global/section-list-container";
import { NAV_LINKS } from "@/config/site";
import { RegistryComponentGrid } from "@/features/showcase/components/registry-components-grid";
import { CATEGORIES } from "@/features/showcase/data/categories";
import { getRegistryItemCategoryCounts } from "@/lib/registry";
import {
  REGISTRY_ITEM_CATEGORY,
  REGISTRY_TYPE_SLUGS,
} from "@/registry/config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Animated React components built with Motion, shadcn/ui, and Tailwind CSS.",
  alternates: {
    canonical: `${NAV_LINKS.components}`,
  },
};

interface IComponentsPageProps {
  searchParams: Promise<{ category?: string }>;
}

async function ComponentsPage({ searchParams }: IComponentsPageProps) {
  const { category } = await searchParams;
  const activeCategory = category as keyof typeof REGISTRY_ITEM_CATEGORY | undefined;

  const counts = getRegistryItemCategoryCounts(REGISTRY_TYPE_SLUGS.components);

  return (
    <MainContainer>
      <SectionListContainer>
        <ListPageHeader
          title="Motion-first UI components"
          description="Animated React components built with Motion, shadcn/ui, and Tailwind CSS for smooth, modern user interfaces."
          eyebrow="Assembling"
          count={counts.all}
          countLabel="components"
        />
        <CategoryTabs
          items={CATEGORIES}
          active={category}
          counts={counts}
          basePath={NAV_LINKS.components}
        />
        <RegistryComponentGrid category={activeCategory} />
      </SectionListContainer>
    </MainContainer>
  );
}

export default ComponentsPage;
