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
        <span className="text-muted-foreground shrink-0 font-mono text-xs tracking-widest uppercase">
          {sectionLabel}
        </span>
        <div className="border-border h-px flex-1 border-t border-dashed" />
      </div>
      <Typography variant="h5" as="h2">
        {sectionHeading}
      </Typography>
      <div>{children}</div>
    </div>
  );
}

export default SectionContainer;
