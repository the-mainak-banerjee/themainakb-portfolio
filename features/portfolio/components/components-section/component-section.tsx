"use client";
import SectionContainer from "@/components/global/section-container";
import { NAV_LINKS } from "@/config/site";
import { RegistryComponentGrid } from "@/features/showcase/components/registry-components-grid";
import React from "react";

function ComponentSection() {
  return (
    <SectionContainer
      sectionHeading="Components"
      sectionLabel="Workshop"
      action={{ href: NAV_LINKS.components, label: "View all components" }}
    >
      <RegistryComponentGrid limit={3} showMoreCard />
    </SectionContainer>
  );
}

export default ComponentSection;
