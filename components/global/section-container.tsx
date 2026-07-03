import React, { ReactNode } from "react";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";

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
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-4">
        <div className="border-border h-px flex-1 border-t border-dashed" />
        <Typography variant="caption-sm" className="shrink-0">
          {sectionLabel}
        </Typography>
        <div className="border-border h-px flex-1 border-t border-dashed" />
      </div>
      <Typography variant="h5" as="h2">
        {sectionHeading}
      </Typography>
      {children}
    </div>
  );
}

export default SectionContainer;
