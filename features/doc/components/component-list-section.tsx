"use client";
import { EntryCard } from "@/components/global/entry-card";
import SectionContainer from "@/components/global/section-container";
import { getRegistryItemsWithStatus } from "@/lib/registry";
import React from "react";

function ComponentListSection({ registryTypeSlug }: { registryTypeSlug: string }) {
  const components = getRegistryItemsWithStatus(registryTypeSlug);
  return (
    <>
      <SectionContainer
        shouldAnimate={false}
        sectionLabel={`All ${registryTypeSlug}`}
      >
        <div className="grid grid-cols-1 items-start gap-6">
          {components.map((item) => {
            return (
              <EntryCard
                key={item.name}
                entry={item}
                registryTypeSlug={registryTypeSlug}
                isNew={item.isNew}
              />
            );
          })}
        </div>
      </SectionContainer>
    </>
  );
}

export default ComponentListSection;
