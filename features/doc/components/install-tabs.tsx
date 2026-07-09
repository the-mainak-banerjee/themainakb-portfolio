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
      className={cn("relative gap-6", className)}
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
    <TabsList className="bg-muted h-auto gap-4 rounded-md p-0.5">
      {["CLI", "Manual"].map((item) => {
        return (
          <TabsTrigger
            value={item.toLowerCase()}
            key={item}
            className={cn(
              "font-geist-sans rounded-md",
              "dark:data-active:bg-foreground dark:data-active:text-background dark:data-active:hover:text-background",
              "data-active:bg-foreground data-active:text-background data-active:hover:text-background",
            )}
          >
            {item}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}
