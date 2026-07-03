"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/global/icons/icon";
import { IconName } from "@/components/global/icons/registry";

interface IRevealPill {
  icon: IconName;
  label: string;
}

export function RevealPill({ icon, label }: IRevealPill) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      layout
      className="border-border bg-card relative inline-flex items-center gap-2 border px-3 py-2"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ layout: { duration: 0.2, ease: "easeInOut" } }}
    >
      <motion.div layout className="text-tool-icon z-20">
        <Icon name={icon} className="size-5" />
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              className="bg-border absolute inset-0 z-10 w-full"
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            ></motion.div>
            <motion.span
              layout
              key={label}
              className="z-20 text-sm whitespace-nowrap"
              initial={{ opacity: 0, x: -15, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -15, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {label}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
