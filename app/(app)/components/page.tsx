import { MainContainer } from "@/components/global/containers";
import ListPageHeader from "@/components/global/list-page-header";
import SectionListContainer from "@/components/global/section-list-container";
import ComponentListSection from "@/features/doc/components/component-list-section";
import { CATEGORY_SLUGS } from "@/registry/config";
import React from "react";

function ComponentsPage() {
 
  return (
    <MainContainer>
      <SectionListContainer>
        <ListPageHeader
          title="Components"
          description="Animated React components built with Motion, shadcn/ui, and Tailwind CSS for smooth, modern user interfaces."
        />
        <ComponentListSection categorySlug={CATEGORY_SLUGS.components} />
      </SectionListContainer>
    </MainContainer>
  );
}

export default ComponentsPage;
