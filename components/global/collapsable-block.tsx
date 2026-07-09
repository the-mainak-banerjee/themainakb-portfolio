import { cn } from "@/lib/utils";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";

function CollapsableBlock({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      className={cn(
        "group/collapsible relative max-h-125 overflow-y-auto [&::-webkit-scrollbar]:hidden",
        className,
          )}
      {...props}
    >
      <CollapsibleContent
        className="overflow-hidden data-[state=closed]:max-h-80"
        forceMount
      >
        {children}
      </CollapsibleContent>
      <div className="absolute inset-x-0 bottom-0 flex h-24 items-center justify-center group-data-[state=open]/collapsible:hidden">
        <div className="from-background pointer-events-none absolute inset-0 bg-linear-to-t to-transparent mask-[linear-gradient(to_top,black_50%,transparent_100%)] backdrop-blur-[1px]" />

        <CollapsibleTrigger asChild>
          <Button
            variant="secondary"
            className="border-border text-muted-foreground relative rounded-md"
          >
            View Code
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
}

export default CollapsableBlock;
