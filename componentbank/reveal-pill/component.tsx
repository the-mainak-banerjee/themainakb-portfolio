"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/global/icons/icon";
import { IconName } from "@/components/global/icons/registry";

interface IRevealPill {
  icon: IconName;
  label: string;
  expandCard?: boolean;
  id: string
}

const PillContent = ({ icon, label, id }: Pick<IRevealPill , "icon" | "label" | "id">) => {
  return (
    <>
      <motion.div
        layout
        layoutId={`${id}-icon`}
        transition={{ layout: { duration: 0.4, ease: "easeOut" } }}
        className="text-tool-icon z-20"
      >
        <Icon name={icon} className="size-5" />
      </motion.div>
      <motion.span className="z-20 text-sm whitespace-nowrap lg:hidden">
        {label}
      </motion.span>
    </>
  );
};

export function RevealPill({ icon, label, expandCard, id }: IRevealPill) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldExpand = expandCard || isHovered;
  const handleHoverState = () => setIsHovered(true);
  const handleHoverEnd = () => setIsHovered(false);

  const containerClassName =
    "border-border bg-card relative inline-flex items-center gap-2 border px-3 py-2";

  return (
    <motion.div onHoverStart={handleHoverState} onHoverEnd={handleHoverEnd}>
      {shouldExpand ? (
        <motion.div
          layout
          layoutId={id}
          className={containerClassName}
          transition={{ layout: { duration: 0.4, ease: "easeOut" } }}
        >
          <PillContent icon={icon} label={label} id={id} />
          <AnimatePresence>
            {shouldExpand && (
              <motion.span
                layout
                key={id}
                className="z-20 hidden text-sm whitespace-nowrap lg:inline"
                initial={{ opacity: 0, x: -15, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -15, scale: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {label}
              </motion.span>
            )}
            {isHovered && (
              <motion.div
                className="bg-border absolute inset-0 z-10 w-full"
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              ></motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          layout
          layoutId={id}
          className={containerClassName}
          transition={{ layout: { duration: 0.4, ease: "easeOut" } }}
        >
          <PillContent icon={icon} label={label} id={id} />
        </motion.div>
      )}
    </motion.div>
  );
}
