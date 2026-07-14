import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export interface ISectionContainer {
  sectionHeading?: string;
  sectionLabel?: string;
  children: ReactNode;
  className?: string;
  shouldAnimate?: boolean;
  action?: {
    label: string;
    href: string;
  };
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AccentHeading from "./accent-heading";

function SectionContainerSkaleton({
  sectionLabel,
  sectionHeading,
  action,
  className,
  children,
}: Omit<ISectionContainer, "shouldAnimate">) {
  return (
    <section className={cn("space-y-6", className)}>
      <div className="flex items-end justify-between gap-6">
        <AccentHeading
          label={sectionLabel}
          heading={sectionHeading}
          headingId={sectionHeading?.toLowerCase()}
        />

        {action && (
          <Link
            href={action.href}
            className="text-muted-foreground hover:text-foreground flex shrink-0 items-center gap-1.5 pb-1 text-[13px] transition-colors"
          >
            <span>{action.label}</span>
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}

function SectionContainer({
  shouldAnimate = true,
  ...props
}: ISectionContainer) {
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
