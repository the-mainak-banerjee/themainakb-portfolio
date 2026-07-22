import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export interface LabDemoProps {
  isPlaying?: boolean;
}

export type LabType = "component" | "template" | "page";

export interface LabItem {
  slug: string;
  index: string;
  title: string;
  type: LabType;
  tags: string[];
  github: string;
  /** Set only when this lab is a recreation/clone of existing work */
  inspiredBy?: { name: string; url?: string };
  description: string;
  /** Long-form writeup — shown on the lab's detail page, not the card */
  learnings: string;
  component: ComponentType<LabDemoProps>;
}

export const LAB_ITEM_CATEGORY = {
  component: "component",
} as const;

export const LAB_ITEM_CATEGORY_DISPLAY = {
  component: "Component",
} as const;

export const LAB_TYPE_CATEGORIES: {
  label: string;
  value?: keyof typeof LAB_ITEM_CATEGORY | "all";
}[] = [
  { label: "All" },
  ...(
    Object.keys(LAB_ITEM_CATEGORY) as Array<keyof typeof LAB_ITEM_CATEGORY>
  ).map((item) => {
    return {
      label: LAB_ITEM_CATEGORY_DISPLAY[item],
      value: item,
    };
  }),
];

export const labs: LabItem[] = [
  {
    slug: "ripple-button",
    index: "001",
    title: "Ripple Button",
    type: LAB_ITEM_CATEGORY.component,
    tags: ["click", "spring", "layout"],
    github:
      "https://github.com/your-username/your-repo/tree/main/labs/ripple-button",
    description:
      "A button that spawns a ripple from wherever you click, with a hover-swap label underneath.",
    learnings:
      "How to convert a raw click event into a ripple's local origin using getBoundingClientRect, sizing the ripple off the larger of the button's width/height so it always fully covers the surface regardless of aspect ratio. Also handled the keyboard-activation case (detail === 0 on a click event means it came from Enter/Space, not a mouse) by centering the ripple instead of guessing a cursor position that doesn't exist. AnimatePresence's popLayout mode was what let the hover-state text swap in and out without the button reflowing while ripples animate underneath it.",
    component: dynamic(() => import("@/features/lab/previews/ripple-button")),
  },
];

export function getLabsItemsByCategory(category?: LabType): LabItem[] {
  if (!category) return labs;
  return labs.filter((lab) => lab.type === category);
}

export function getLabsItemsCount(): Record<string, number> {
  const counts: Record<string, number> = {
    all: labs.length,
  };

  for (const lab of labs) {
    if (counts[lab.type]) {
      counts[lab.type] += 1;
    } else {
      counts[lab.type] = 1;
    }
  }

  return counts;
}
