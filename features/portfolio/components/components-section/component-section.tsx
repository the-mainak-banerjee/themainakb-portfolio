"use client";
import { EntryCard } from "@/components/global/entry-card";
import SectionContainer from "@/components/global/section-container";
import { getComponentsWithStatus } from "@/lib/registry";
import { CATEGORY_SLUGS } from "@/registry/config";
import React from "react";

function ComponentSection() {
  const components = getComponentsWithStatus(CATEGORY_SLUGS.components);

  return (
    <SectionContainer sectionHeading="Components" sectionLabel="Labs" action={{href: "/components", label: "View all components"}}>
      <div className="grid gap-6 lg:grid-cols-2">
        {components.slice(0, 6).map((item) => {
          const { isNew, ...rest } = item;
          return (
            <EntryCard
              key={item.name}
              entry={rest}
              categorySlug={CATEGORY_SLUGS.components}
              miniVersion={true}
              isNew={isNew}
            />
          );
        })}
      </div>
    </SectionContainer>
  );
}

export default ComponentSection;
