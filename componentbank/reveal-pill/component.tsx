"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/global/icons/icon";
import { IconName } from "@/components/global/icons/registry";

interface IRevealPill {
  icon: IconName;
  label: string;
  expandCard?: boolean;
  id: string;
}

const PillContent = ({
  icon,
  label,
}: Pick<IRevealPill, "icon" | "label">) => {
  return (
    <>
      <motion.div
        layout
        className="text-tool-icon z-20"
      >
        <Icon name={icon} className="size-5" />
      </motion.div>

      {/* Mobile label */}
      <motion.span className="z-20 text-sm whitespace-nowrap lg:hidden">
        {label}
      </motion.span>
    </>
  );
};

export function RevealPill({
  icon,
  label,
  expandCard = false,
  id,
}: IRevealPill) {
  const [isHovered, setIsHovered] = useState(false);

  const shouldExpand = expandCard || isHovered;

  const containerClassName =
    "border-border bg-card relative inline-flex items-center gap-2 border px-3 py-2 overflow-hidden";

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        layout
        layoutId={id}
        className={containerClassName}
        transition={{
          layout: {
            duration: 0.4,
            ease: "easeOut",
          },
        }}
      >
        <PillContent icon={icon} label={label} />

        {/* Desktop expanding label */}
        <AnimatePresence mode="popLayout">
          {shouldExpand && (
            <motion.span
              key={`${id}-label`}
              layout
              className="z-20 hidden text-sm whitespace-nowrap lg:inline"
              initial={{
                opacity: 0,
                x: -15,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: -15,
                scale: 0.5,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Hover background */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key={`${id}-hover`}
              className="bg-border absolute inset-0 z-10"
              initial={{
                opacity: 0,
                clipPath: "inset(0 100% 0 0)",
              }}
              animate={{
                opacity: 1,
                clipPath: "inset(0 0% 0 0)",
              }}
              exit={{
                opacity: 0,
                clipPath: "inset(0 100% 0 0)",
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
