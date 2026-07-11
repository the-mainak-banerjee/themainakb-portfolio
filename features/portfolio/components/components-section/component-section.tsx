"use client";
import { EntryCard } from "@/components/global/entry-card";
import SectionContainer from "@/components/global/section-container";
import { Button } from "@/components/ui/button";
import { getComponentsWithStatus } from "@/lib/registry";
import { CATEGORY_SLUGS } from "@/registry/config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function ComponentSection() {
  const components = getComponentsWithStatus(CATEGORY_SLUGS.components);

  return (
    <SectionContainer sectionHeading="Components" sectionLabel="Labs">
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
      <Button variant='updated_secondary' asChild>
        <Link href="/components" className="flex items-center gap-2 text-sm">
          All Components
          <ArrowRight size={16}/>
        </Link>
      </Button>
    </SectionContainer>
  );
}

export default ComponentSection;
