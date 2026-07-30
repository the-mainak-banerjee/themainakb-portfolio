import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export interface LabDemoProps {
  isPlaying?: boolean;
}

export type LabType = "component" | "template" | "page";

const GIHUB_REPO =
  "https://github.com/the-mainak-banerjee/motion-design-components/tree/main/lab/components/";

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
    github: `${GIHUB_REPO}ripple-button`,
    description:
      "A button with a cursor-following ripple effect and animated hover text transitions.",
    component: dynamic(
      () => import("@/features/lab/previews/ripple-button/ripple-button"),
    ),
  },
  {
    slug: "statefull-button",
    index: "002",
    title: "Statefull Button",
    type: LAB_ITEM_CATEGORY.component,
    tags: [
      "motion-sequence",
      "spring-shake",
      "layout-animation",
      "micro-interaction",
    ],
    github: `${GIHUB_REPO}statefull-button`,
    description:
      "A deploy button with morphing state transitions.Background wipes, spring-driven error shake, and success pop",
    component: dynamic(
      () => import("@/features/lab/previews/statefull-button/statefull-button"),
    ),
  },
  {
    slug: "tilt-card-spotlight",
    index: "003",
    title: "Tilt Card Spotlight",
    type: LAB_ITEM_CATEGORY.component,
    tags: ["useMotionValue", "useSpring", "useTransform", "useMotionTemplate"],
    github: `${GIHUB_REPO}tilt-card-spotlight`,
    description: "Cursor-driven 3D tilt with a dynamic spotlight highlight.",
    component: dynamic(
      () =>
        import("@/features/lab/previews/tilt-card-spotlight/tilt-card-spotlight"),
    ),
  },
  {
    slug: "pricing-card",
    index: "004",
    title: "Pricing Card",
    type: LAB_ITEM_CATEGORY.component,
    tags: [
      "useMotionValue",
      "useMotionTemplate",
      "animate()",
      "Gradient Border",
    ],
    github: `${GIHUB_REPO}pricing-card`,
    description:
      "A pricing card with gradient border on hover, billing type selector with scramble text animation and a dropdown with features included",
    component: dynamic(
      () => import("@/features/lab/previews/pricing-card/pricing-card"),
    ),
  },
  {
    slug: "app-store-grid",
    index: "005",
    title: "App store grid",
    type: LAB_ITEM_CATEGORY.component,
    tags: [
      "layoutId",
      "Shared layout animation",
      "AnimatePresence",
      "create()",
    ],
    github: `${GIHUB_REPO}app-store-grid`,
    description:
      "A pricing card with gradient border on hover, billing type selector with scramble text animation and a dropdown with features included",
    component: dynamic(
      () => import("@/features/lab/previews/app-store-grid/app-store-grid"),
    ),
  },
  {
    slug: "travel-card-drag",
    index: "006",
    title: "Travel Card Drag",
    type: LAB_ITEM_CATEGORY.component,
    tags: ["drag", "useTransform", "useMotionValue"],
    github: `${GIHUB_REPO}travel-card-drag`,
    description:
      "Draggable stacked cards with smooth reveal and hide animation",
    component: dynamic(
      () => import("@/features/lab/previews/travel-card-drag/travel-card-drag"),
    ),
  },
  {
    slug: "swipe-action-card",
    index: "007",
    title: "Swipe Action Card",
    type: LAB_ITEM_CATEGORY.component,
    tags: ["drag", "useTransform", "useAnimate", "useMotionValueEvent"],
    github: `${GIHUB_REPO}swipe-action-card`,
    description:
      "iOS-style swipe actions with progressive delete expansion and hold-to-delete interaction.",
    component: dynamic(
      () => import("@/features/lab/previews/swipe-action-card/swipe-action-card"),
    ),
  },
];

export function getAllLabsItem() {
  return labs;
}

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

export function getAdjacentItem(slug: string) {
  const index = labs.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return {
      previous: undefined,
      next: undefined,
    };
  }

  return {
    previous: index > 0 ? labs[index - 1] : undefined,
    next: index < labs.length - 1 ? labs[index + 1] : undefined,
  };
}
