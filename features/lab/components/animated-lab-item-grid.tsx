"use client";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useDirection } from "@/hooks/useCategoryDirection";
import { getLabsItemsByCategory, LAB_TYPE_CATEGORIES, LabType } from "../data/labs-data";
import { LabItemGrid } from "./lab-item-grid";

interface IAnimatedLabItemGridProps {
  type?: LabType;
  limit?: number;
  showMoreCard?: boolean;
  moreCardHref?: string;
  className?: string;
}

const OFFSET = 24;

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

export function AnimatedLabItemGrid({
  type,
  limit,
  className,
}: IAnimatedLabItemGridProps) {
  const items = getLabsItemsByCategory(type);
  const visible = limit ? items.slice(0, limit) : items;

  const direction = useDirection(type, LAB_TYPE_CATEGORIES);

  return (
    <AnimatePresence initial={false} mode="wait" custom={direction}>
      <motion.div
        key={type}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
      >
        <LabItemGrid
          items={visible}
          className={className}
        />
      </motion.div>
    </AnimatePresence>
  );
}
