"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const options = ["Marketing", "Design", "Development"];

export default function SplitButtonInteraction() {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      layout
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              layout: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              },
            }
      }
      className={cn(
        "inline-flex items-center overflow-hidden rounded-2xl bg-neutral-900 py-2 pr-4 pl-3 dark:bg-white text-white dark:text-neutral-800",
        isExpanded ? "gap-2" : "gap-4",
      )}
    >
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="project-options"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex cursor-pointer items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isExpanded ? "close" : "open"}
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, rotate: -90, scale: 0.7 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, rotate: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: 90, scale: 0.7 }
            }
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            {isExpanded ? <X size={20} /> : <Plus size={18} />}
          </motion.span>
        </AnimatePresence>

        <span className="sr-only">
          {isExpanded ? "Close project options" : "Add project"}
        </span>

        <motion.span layout aria-hidden="true" className="ml-2">
          {isExpanded ? "" : "Add Project"}
        </motion.span>
      </button>

      <AnimatePresence initial={false} mode="popLayout">
        {isExpanded && (
          <motion.div
            id="project-options"
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: {
                transition: shouldReduceMotion
                  ? {}
                  : {
                      staggerChildren: 0.07,
                      delayChildren: 0.05,
                    },
              },
            }}
            className="flex items-center gap-4"
          >
            {options.map((option) => (
              <motion.button
                key={option}
                type="button"
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -8,
                    filter: "blur(4px)",
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                  },
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  ease: "easeOut",
                }}
                className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
