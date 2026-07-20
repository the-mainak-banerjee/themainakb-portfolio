import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export interface LabDemoProps {
  isPlaying?: boolean;
}

export interface Lab {
  slug: string;
  index: string;
  name: string;
  tags: string[];
  github: string;
  inspiration?: string;
  description: string;
  learnings: string;
  component: ComponentType<LabDemoProps>;
}

export const labs: Lab[] = [
  {
    slug: "ripple-button",
    index: "001",
    name: "Ripple Button",
    tags: ["click", "spring", "layout"],
    github:
      "https://github.com/your-username/your-repo/tree/main/labs/ripple-button",
    inspiration: "",
    description:
      "A button that spawns a ripple from wherever you click, with a hover-swap label underneath.",
    learnings:
      "How to convert a raw click event into a ripple's local origin using getBoundingClientRect, sizing the ripple off the larger of the button's width/height so it always fully covers the surface regardless of aspect ratio. Also handled the keyboard-activation case (detail === 0 on a click event means it came from Enter/Space, not a mouse) by centering the ripple instead of guessing a cursor position that doesn't exist. AnimatePresence's popLayout mode was what let the hover-state text swap in and out without the button reflowing while ripples animate underneath it.",
    component: dynamic(() => import("@/features/lab/previews/ripple-button")),
  },
];
