"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface CategoryTabItem {
  label: string;
  /** Omit for the "All" tab */
  value?: string;
}

interface CategoryTabsProps {
  items: CategoryTabItem[];
  active?: string;
  counts: Record<string, number>;
  /** e.g. "/components" or "/labs" */
  basePath: string;
  /** query param name, defaults to "category" */
  queryParam?: string;
  /**
   * layoutId for the sliding active-pill background. Give each usage its
   * own value if more than one CategoryTabs could ever be mounted at once
   * (e.g. Components tabs + Labs tabs on the same page) so their layout
   * animations don't collide.
   */
  layoutId?: string;
}

export function CategoryTabs({
  items,
  active,
  counts,
  basePath,
  queryParam = "category",
  layoutId = "active_category_bg",
}: CategoryTabsProps) {
  return (
    <div className="border-border/60 relative mb-10 border-b">
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-3">
        {items.map((item) => {
          const isActive = item.value === active;
          const href = item.value
            ? `${basePath}?${queryParam}=${item.value}`
            : basePath;
          const count = counts[item.value ?? "all"] ?? 0;

          return (
            <Link
              key={item.label}
              href={href}
              className={cn(
                "relative shrink-0 px-3.5 py-1.5 text-[13px] whitespace-nowrap transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="relative z-10">{item.label}</span>
              <span className="text-muted-foreground/60 relative z-10 ml-1.5 font-mono text-[11px]">
                {count}
              </span>
              {isActive && (
                <motion.span
                  layout
                  layoutId={layoutId}
                  className="border-border bg-muted absolute inset-0 rounded-full border"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 40,
                    mass: 0.5,
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l to-transparent sm:hidden" />
    </div>
  );
}
