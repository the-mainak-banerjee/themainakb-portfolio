"use client";
import { EntryCard } from "@/components/global/entry-card";
import SectionContainer from "@/components/global/section-container";
import { Typography } from "@/components/ui/typography";
import { getComponentsListPageData } from "@/lib/registry";
import React from "react";

function ComponentListSection({ categorySlug }: { categorySlug: string }) {
  const { newComponents, olderComponents } =
    getComponentsListPageData(categorySlug);
  return (
    <SectionContainer shouldAnimate={false}>
      <div className="space-y-4">
        <Typography variant="label" as="p">
          New {categorySlug}
        </Typography>
        <div className="grid grid-cols-1 items-start gap-2">
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
      </div>
      <div className="space-y-4">
        <Typography variant="label" as="p">
          All {categorySlug}
        </Typography>
        <div>
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
      </div>
    </SectionContainer>
  );
}

export default ComponentListSection;
