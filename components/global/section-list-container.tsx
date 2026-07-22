import { cn } from "@/lib/utils";
import React from "react";

function SectionListContainer({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Component className={cn("space-y-6 md:space-y-10", className)}>
      {children}
    </Component>
  );
}

export default SectionListContainer;
