import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export function MainContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("container pt-4 pb-24 md:pt-8", className)}>
      {children}
    </main>
  );
}

export function DocContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn("doc-container pt-4 pb-24 md:pt-8", className)}
    >
      {children}
    </main>
  );
}
