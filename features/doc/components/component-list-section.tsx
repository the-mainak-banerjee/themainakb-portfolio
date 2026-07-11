"use client";
import { EntryCard } from "@/components/global/entry-card";
import SectionContainer from "@/components/global/section-container";
import { getComponentsListPageData } from "@/lib/registry";
import React from "react";

function ComponentListSection({ categorySlug }: { categorySlug: string }) {
  const { newComponents, olderComponents } =
    getComponentsListPageData(categorySlug);
  return (
    <>
      <SectionContainer shouldAnimate={false} sectionLabel={`New ${categorySlug}`}>
        <div className="grid grid-cols-1 items-start gap-3.5">
          {newComponents.map((item) => {
            return (
              <EntryCard
                key={item.name}
                entry={item}
                categorySlug={categorySlug}
                isNew={true}
              />
            );
          })}
        </div>
      </SectionContainer>
      <SectionContainer shouldAnimate={false} sectionLabel={`All ${categorySlug}`}>
        <div className="grid grid-cols-1 items-start gap-6">
          {olderComponents.map((item) => {
            return (
              <EntryCard
                key={item.name}
                entry={item}
                categorySlug={categorySlug}
              />
            );
          })}
        </div>
      </SectionContainer>
    </>
  );
}

export default ComponentListSection;
