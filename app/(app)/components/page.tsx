import { MainContainer } from "@/components/global/containers";
import ListPageHeader from "@/components/global/list-page-header";
import SectionListContainer from "@/components/global/section-list-container";
import ComponentListSection from "@/features/doc/components/component-list-section";
import { CATEGORY_SLUGS, getComponentsByCategory } from "@/registry/config";
import React from "react";

function ComponentsPage() {
  const components = getComponentsByCategory(CATEGORY_SLUGS.components);

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
        <ComponentListSection categorySlug={CATEGORY_SLUGS.components} />
      </SectionListContainer>
    </MainContainer>
  );
}

export default ComponentsPage;
