"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  REGISTRY_ITEM_CATEGORY,
} from "@/registry/config";
import { motion } from "motion/react";
import { CATEGORIES } from "../data/categories";

interface CategoryTabsProps {
  active?: keyof typeof REGISTRY_ITEM_CATEGORY;
  counts: Record<string, number>;
}

export function CategoryTabs({ active, counts }: CategoryTabsProps) {
  return (
    <div className="border-border/60 relative mb-10 border-b">
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-3">
        {CATEGORIES.map((cat) => {
          const isActive = cat.value === active;
          const href = cat.value
            ? `/components?category=${cat.value}`
            : "/components";
          const count = counts[cat.value ?? "all"] ?? 0;

          return (
            <Link
              key={cat.label}
              href={href}
              className={cn(
                "relative shrink-0 px-3.5 py-1.5 text-[13px] whitespace-nowrap transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="relative z-10">{cat.label}</span>
              <span className="text-muted-foreground/60 relative z-10 ml-1.5 font-mono text-[11px]">
                {count}
              </span>
              {isActive && (
                <motion.span
                  layout
                  layoutId="active_category_bg"
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
