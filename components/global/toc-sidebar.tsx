"use client";
import React, { useRef, useState } from "react";
import {
  AnchorProvider,
  ScrollProvider,
  TOCItem,
  TOCItemType,
  useActiveAnchors,
} from "fumadocs-core/toc";
import { getTableOfContents } from "fumadocs-core/content/toc";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function TocSidebarItem({
  item,
  hovered,
}: {
  item: TOCItemType;
  hovered: boolean;
}) {
  const activeAnchors = useActiveAnchors();
  const isActiveAnchor = activeAnchors.includes(item.url.replace("#", ""));
  const lineWidth = item.depth === 3 ? 32 : item.depth === 4 ? 24 : 40;
  return (
    <TOCItem
      href={item.url}
      data-depth={item.depth}
      data-active={isActiveAnchor}
      className="group text-foreground/60 data-active:text-foreground hover:text-foreground mb-2 last:mb-0 transition-colors duration-200 ease-out data-[depth=3]:ml-2 data-[depth=4]:ml-4"
    >
      <motion.span
        layout
        className="flex w-full items-center justify-end gap-2"
        transition={{
          layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {hovered && (
          <motion.span
            layout
            key="title"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="whitespace-nowrap"
          >
            {item.title}
          </motion.span>
        )}

        <motion.span
          layout
          transition={{
            layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          }}
          initial={false}
          animate={{
            width: hovered ? lineWidth + 10 : lineWidth,
            transition: { type: "spring", stiffness: 200, damping: 30 },
          }}
          className="bg-foreground/50 group-data-active:bg-foreground group-hover:bg-foreground inline-block h-px shrink-0 transition-[background-color] ease-out group-data-[depth=2]:w-10 group-data-[depth=3]:w-8 group-data-[depth=4]:w-6"
        />
      </motion.span>
    </TOCItem>
  );
}

function TocSidebar({ content }: { content: string }) {
  const [hovered, setHovered] = useState(false);
  const viewRef = useRef<HTMLDivElement>(null);
  const tocItems = getTableOfContents(content);
  return (
    <AnchorProvider toc={tocItems}>
      <motion.div
        ref={viewRef}
        className={cn(
          "fixed top-48 right-0 flex flex-col overflow-hidden py-2 pl-8",
          hovered
            ? "max-h-96 w-48 overflow-y-auto rounded-l-md border-r-0 [&::-webkit-scrollbar]:hidden"
            : "",
        )}
        initial={false}
        animate={{
          borderTopWidth: hovered ? 1 : 0,
          borderBottomWidth: hovered ? 1 : 0,
          borderLeftWidth: hovered ? 1 : 0,
          borderColor: hovered ? "var(--border)" : "var(--background)"
        }}
        transition={{
          borderWidth: { duration: 0.15, ease: [0.22, 1, 0.36, 1] },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ScrollProvider containerRef={viewRef}>
          {tocItems.map((item) => (
            <TocSidebarItem key={item.url} item={item} hovered={hovered} />
          ))}
        </ScrollProvider>
      </motion.div>
    </AnchorProvider>
  );
}

export default TocSidebar;
