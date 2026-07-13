import React, { ReactNode } from "react";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import SectionLabel from "./section-label";

export interface ISectionContainer {
  sectionHeading?: string;
  sectionLabel?: string;
  children: ReactNode;
  className?: string;
  shouldAnimate?: boolean;
}

function SectionContainerSkaleton({
  sectionHeading,
  sectionLabel,
  children,
  className,
}: Omit<ISectionContainer, "shouldAnimate">) {
  return (
      <div className={cn("space-y-6", className)}>
        {sectionLabel && <SectionLabel sectionLabel={sectionLabel} />}
        {sectionHeading && (
          <Typography variant="h2" id={sectionHeading.toLowerCase()}>{sectionHeading}</Typography>
        )}
        {children}
      </div>
  );
}

function SectionContainer({ shouldAnimate = true, ...props }: ISectionContainer) {
  if (shouldAnimate) {
    return (
      <Reveal>
        <SectionContainerSkaleton {...props} />
      </Reveal>
    );
  }
  return <SectionContainerSkaleton {...props} />;

}

export default SectionContainer;
