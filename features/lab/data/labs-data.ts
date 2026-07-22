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
  description: string;
  screenshot?: string;
  component: ComponentType<LabDemoProps>;
  // Learnings: ComponentType;
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
    tags: [
      "AnimatePresence",
      "Enter & Exit Animations",
      "Hover States",
      "Tap Feedback",
    ],
    github:
      "https://github.com/the-mainak-banerjee/motion-design-components/tree/main/lab/components/ripple-button",
    description:
      "A button with a cursor-following ripple effect and animated hover text transitions.",
    component: dynamic(
      () => import("@/features/lab/previews/ripple-button/ripple-button"),
    ),
  },
];

export function getLabsItemBySlug(slug: string): LabItem | undefined {
  return labs.find((lab) => lab.slug === slug);
}

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