"use client";

import * as React from "react";
import {
  ShareMenu,
  ShareMenuContent,
  ShareMenuCopy,
  ShareMenuItem,
  ShareMenuNative,
  ShareMenuTrigger,
} from "@/registry/components/share-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const animations = [
  "fade",
  "scale",
  "slide",
  "inset",
  "ellipse",
  "blur",
  "pop",
] as const;

export default function ShareMenuDemo() {
  const [animation, setAnimation] =
    React.useState<(typeof animations)[number]>("ellipse");

  const url =
    "https://themainakb.com/components/share-menu";
  const encodedUrl = encodeURIComponent(url);
  const title = "Check out this Share Menu component!";

  return (
    <div className="mx-auto flex h-full min-h-80 w-full flex-col items-center">
      <div className="flex items-center justify-center flex-1">
        <ShareMenu title={title} url={url}>
          <ShareMenuTrigger />

          <ShareMenuContent animation={animation}>
            <ShareMenuItem
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
            >
              Share on X
            </ShareMenuItem>

            <ShareMenuItem
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            >
              Share on Facebook
            </ShareMenuItem>

            <ShareMenuItem
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            >
              Share on LinkedIn
            </ShareMenuItem>

            <ShareMenuCopy showIcon={false} />

            <ShareMenuNative />
          </ShareMenuContent>
        </ShareMenu>
      </div>
      <div className="flex flex-col items-center gap-1.5 p-4">
        <label
          htmlFor="animation-select"
          className="text-muted-foreground text-xs font-medium"
        >
          Select a Open animation and click on the button above
        </label>
        <Select
          value={animation}
          onValueChange={(value) =>
            setAnimation(value as (typeof animations)[number])
          }
        >
          <SelectTrigger id="animation-select" className="w-40 rounded-md">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="rounded-md">
            {animations.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
