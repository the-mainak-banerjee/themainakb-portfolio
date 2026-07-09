"use client";

import * as React from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type InstallType = "cli" | "manual";

// Persist across components/pages
export const installTypeAtom = atomWithStorage<InstallType>(
  "preferred-install-type",
  "cli",
  undefined,
  { getOnInit: true },
);

/**
 * Wraps shadcn Tabs and binds it to the shared installTypeAtom, so
 * <TabsContent value="cli" /> and <TabsContent value="manual" /> just work
 * without each MDX file managing its own state.
 */
export function InstallTabs({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [value, setValue] = useAtom(installTypeAtom);

  return (
    <Tabs
      value={value}
      onValueChange={(v) => setValue(v as InstallType)}
      className={cn("relative my-6", className)}
    >
      {children}
    </Tabs>
  );
}

/**
 * Fixed CLI / Manual triggers — identical across every component doc,
 * so it's a standalone MDX component that takes no props.
 */
export function InstallTabsListType() {
  return (
    <TabsList className="mb-3 h-auto gap-4 bg-transparent p-0">
      <TabsTrigger
        value="cli"
        className="data-[state=active]:bg-muted rounded-md border px-3 py-1.5 text-sm data-[state=active]:shadow-none"
      >
        CLI
      </TabsTrigger>
      <TabsTrigger
        value="manual"
        className="data-[state=active]:bg-muted rounded-md border px-3 py-1.5 text-sm data-[state=active]:shadow-none"
      >
        Manual
      </TabsTrigger>
    </TabsList>
  );
}
