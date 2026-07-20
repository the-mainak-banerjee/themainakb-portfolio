"use client";
import { getComponentRegistryItemByCategory } from "@/lib/registry";
import { ItemGrid } from "./item-grid";
import { REGISTRY_ITEM_CATEGORY } from "@/registry/config";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useDirection } from "@/hooks/useCategoryDirection";
import { CATEGORIES } from "../data/categories";

interface RegistryComponentGridProps {
  category?: keyof typeof REGISTRY_ITEM_CATEGORY;
  limit?: number;
  showMoreCard?: boolean;
  moreCardHref?: string;
  className?: string;
}

const OFFSET = 24

const slideVariants: Variants = {
  enter: (dir: 1 | -1) => ({
    opacity: 0,
    x: dir === 1 ? OFFSET : -OFFSET,
    transition: { duration: 0.2, ease: "easeInOut" },
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  exit: (dir: 1 | -1) => ({
    opacity: 0,
    x: dir === 1 ? -OFFSET : OFFSET,
    transition: { duration: 0.15, ease: "easeInOut" },
  }),
};

export function RegistryComponentGrid({
  category,
  limit,
  showMoreCard = false,
  moreCardHref,
  className,
}: RegistryComponentGridProps) {
  const items = getComponentRegistryItemByCategory(category);
  const visible = limit ? items.slice(0, limit) : items;
  const remaining = limit ? Math.max(items.length - limit, 0) : 0;

  const direction = useDirection(category, CATEGORIES);

  return (
    <AnimatePresence initial={false} mode="wait" custom={direction}>
      <motion.div
        key={category}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
      >
        <ItemGrid
          items={visible}
          className={className}
          moreCard={
            showMoreCard && remaining > 0
              ? { count: remaining, total: items.length, href: moreCardHref }
              : undefined
          }
        />
      </motion.div>
    </AnimatePresence>
  );
}
