"use client";
import React, { useState } from "react";
import { User_Stack } from "../../types/user";
import { Typography } from "@/components/ui/typography";
import { LayoutGroup, stagger } from "motion/react";
import { RevealPill } from "@/componentbank";
import { motion } from "motion/react";
import {
  container_item_reveal_variants,
  container_reveal_variants,
  REVEAL_VARIANTS_NAME,
} from "@/lib/motion_utils";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMobile";

export interface ITechStackCard {
  stackGroup: User_Stack;
}

function TechStackCard({ stackGroup }: ITechStackCard) {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      layout
      key={stackGroup.id}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={"border-border rounded-lg relative flex flex-col gap-4 border px-6 py-4"}
      initial={REVEAL_VARIANTS_NAME.initial}
      whileHover="hover"
      whileInView={REVEAL_VARIANTS_NAME.whileInView}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      variants={container_reveal_variants}
    >
      <motion.div
        layout
        className="flex items-center gap-2"
        variants={container_item_reveal_variants}
      >
        <stackGroup.icon size={16} />
        <Typography
          variant="caption-sm"
          className={cn("shrink-0", hovered ? "text-foreground" : "")}
        >
          {stackGroup.label}
        </Typography>
      </motion.div>
      <motion.div
        variants={{
          visible: { transition: { delayChildren: stagger(0.08) } },
        }}
        className="z-20 flex flex-wrap gap-2"
      >
        <LayoutGroup>
          {stackGroup.tools.map((tool) => {
            return (
              <motion.a
                key={tool.slug}
                href={tool.url}
                target="_blank"
                rel="noopener"
                variants={{
                  initial: {
                    opacity: 0,
                    y: 10,
                  },
                  visible: {
                    opacity: isMobile ? 1 : 0.8,
                    y: 0,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  },
                  hover: {
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }
                }}
              >
                <RevealPill
                  key={tool.slug}
                  icon={tool.icon}
                  label={tool.name}
                  id={`tech_stack_${tool.name}`}
                />
              </motion.a>
            );
          })}
        </LayoutGroup>
      </motion.div>

      <motion.div layout className="absolute top-0 -right-5">
        <motion.svg
          layout
          style={{
            width: 96,
            height: 96,
            opacity: isMobile ? 0.2 : hovered ? 0.5 : 0.07,
            transition: "opacity 0.4s ease",
          }}
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M50 0 L50 40 L80 20 M50 40 L20 60 M50 40 L70 70 M50 40 L30 20"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </motion.svg>
      </motion.div>
      {/* <motion.div
        className="bg-border/40 absolute inset-0 z-10"
        variants={{
          initial: { clipPath: "inset(0 100% 100% 0)", opacity: 0 },
          hover: { clipPath: "inset(0 0% 0% 0)", opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      /> */}
    </motion.div>
  );
}

export default TechStackCard;
