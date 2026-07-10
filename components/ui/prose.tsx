import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";
import React, { ComponentProps } from "react";

function Prose({
  asChild,
  className,
  ...props
}: ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="prose"
      className={cn("prose dark:prose-invert prose-zinc prose-doc", className)}
      {...props}
    />
  );
}

export default Prose;
