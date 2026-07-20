import { MainContainer } from "@/components/global/containers";
import ListPageHeader from "@/components/global/list-page-header";
import SectionListContainer from "@/components/global/section-list-container";
import { NAV_LINKS } from "@/config/site";
import ComponentListSection from "@/features/doc/components/component-list-section";
import { REGISTRY_TYPE_SLUGS, getRegistryItemByRegistryType } from "@/registry/config";
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

function ComponentsPage() {
  const components = getRegistryItemByRegistryType(REGISTRY_TYPE_SLUGS.components);

  return (
    <MainContainer>
      <SectionListContainer>
        <ListPageHeader
          title="Motion-first UI components"
          description="Animated React components built with Motion, shadcn/ui, and Tailwind CSS for smooth, modern user interfaces."
          eyebrow="Assembling"
          count={components.length}
          countLabel="components"
        />
        <ComponentListSection registryTypeSlug={REGISTRY_TYPE_SLUGS.components} />
      </SectionListContainer>
    </MainContainer>
  );
}

export default ComponentsPage;
