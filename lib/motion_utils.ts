import { stagger, Variants } from "motion";

export const REVEAL_VARIANTS_NAME = {
    initial: "initial",
    whileInView: "visible"
}

export const container_reveal_variants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      when: "beforeChildren",
      delayChildren: stagger(0.02),
    },
  },
} as const;

export const container_item_reveal_variants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
} as const;