"use client";
import React, { useState } from "react";
import { User_Stack } from "../../types/user";
import { Typography } from "@/components/ui/typography";
import { LayoutGroup } from "motion/react";
import { RevealPill } from "@/componentbank";
import { motion } from "motion/react";

export interface ITechStackCard {
  stackGroup: User_Stack;
}
function TechStackCard({ stackGroup }: ITechStackCard) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      layout
      key={stackGroup.id}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={"border-border relative flex flex-col gap-4 border px-6 py-4"}
      initial="initial"
      whileHover="hover"
    >
      <motion.div layout className="flex items-center gap-2">
        <stackGroup.icon size={16} />
        <Typography variant="caption-sm" className="shrink-0">
          {stackGroup.label}
        </Typography>
      </motion.div>
      <div className="flex flex-wrap gap-2 z-20">
        <LayoutGroup>
          {stackGroup.tools.map((tool) => {
            return (
              <a key={tool.slug} href={tool.url} target="_blank" rel="noopener">
                <RevealPill
                  key={tool.slug}
                  icon={tool.icon}
                  label={tool.name}
                />
              </a>
            );
          })}
        </LayoutGroup>
      </div>

      <motion.div layout className="absolute top-0 -right-5">
        <motion.svg
          layout
          style={{
            width: 96,
            height: 96,
            opacity: hovered ? 0.2 : 0.07,
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
      <motion.div
        className="bg-border/40 absolute inset-0 z-10"
        variants={{
          initial: { clipPath: "inset(0 100% 100% 0)", opacity: 0 },
          hover: { clipPath: "inset(0 0% 0% 0)", opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  );
}

export default TechStackCard;
