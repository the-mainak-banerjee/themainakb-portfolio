import React, { ReactNode } from "react";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import SectionLabel from "./section-label";

export interface ISectionContainer {
  sectionHeading: string;
  sectionLabel?: string;
  children: ReactNode;
  className?: string;
}

function SectionContainer({
  sectionHeading,
  sectionLabel,
  children,
  className,
}: ISectionContainer) {
  return (
    <Reveal>
      <div className={cn("space-y-6", className)}>
        {sectionLabel && <SectionLabel sectionLabel={sectionLabel} />}
        <Typography variant="h5" as="h2">
          {sectionHeading}
        </Typography>
        {children}
      </div>
    </Reveal>
  );
}

export default SectionContainer;
