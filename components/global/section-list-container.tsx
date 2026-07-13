import { cn } from "@/lib/utils";
import React from "react";

function SectionListContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string}) {
  return <div className={cn("space-y-10", className)}>{children}</div>;
}

export default SectionListContainer;
