"use client"
import React, { useRef } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown, List } from "lucide-react";
import { Typography } from "../ui/typography";
import { AnchorProvider, ScrollProvider, TOCItem } from "fumadocs-core/toc";
import { getTableOfContents } from "fumadocs-core/content/toc";

function TocInline({ content }: { content: string }) {
  const viewRef = useRef<HTMLDivElement>(null);

  const tocItems = getTableOfContents(content);

  return (
    <Collapsible className="lg:hidden bg-muted border-border rounded-lg border py-2">
      <CollapsibleTrigger className="group flex w-full items-center gap-2 px-4">
        <List size={16} />
        <Typography variant="body" className="text-[14px]">On This page</Typography>
        <ChevronDown size={18} className="ml-auto group-data-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <AnchorProvider toc={tocItems}>
          <div
            ref={viewRef}
            className="border-border mt-2 flex flex-col gap-2 border-t px-4 py-2"
          >
            <ScrollProvider containerRef={viewRef}>
              {tocItems.map((item) => (
                <TOCItem key={item.url} href={item.url}>
                  <Typography variant="body-sm">{item.title}</Typography>
                </TOCItem>
              ))}
            </ScrollProvider>
          </div>
        </AnchorProvider>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default TocInline;
