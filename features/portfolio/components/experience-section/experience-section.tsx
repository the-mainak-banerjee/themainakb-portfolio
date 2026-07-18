"use client";
import React, { useState } from "react";
import { USER } from "../../data/user";
import ExperienceCard from "./experience-card";
import SectionContainer from "@/components/global/section-container";
import { motion } from "motion/react";
import {
  container_item_reveal_variants,
  container_reveal_variants,
  REVEAL_VARIANTS_NAME,
} from "@/lib/motion_utils";

function ExperienceSection() {
  const [selectedJobRole, setSelectedJobRole] = useState<number | null>(null);
  const [hoveredJobRoleCard, setHoveredJobRoleCard] = useState<string | null>(
    null,
  );
  return (
    <SectionContainer sectionHeading="Experience" sectionLabel="Journey">
      <motion.div
        className="flex flex-col"
        initial={REVEAL_VARIANTS_NAME.initial}
        whileInView={REVEAL_VARIANTS_NAME.whileInView}
        variants={container_reveal_variants}
        viewport={{
          once: true,
          amount: 0.1,
        }}
      >
        {USER.jobRoles.map((role, idx) => {
          const isLast = idx === USER.jobRoles.length - 1;
          return (
            <div key={idx} className="flex">
              <motion.div
                className="flex flex-col items-center pt-6"
                variants={container_item_reveal_variants}
              >
                <span className="bg-primary ring-background h-2.5 w-2.5 shrink-0 rounded-full ring-4" />
                {!isLast && (
                  <span className="bg-border mt-1 -mb-5 w-px flex-1" />
                )}
              </motion.div>

              <motion.div
                className="flex w-4 flex-col items-center pt-6 sm:w-6"
                variants={container_item_reveal_variants}
              >
                <span className="bg-border mt-1.25 h-px w-full" />
              </motion.div>

              <motion.div
                className={isLast ? "flex-1" : "flex-1 pb-6"}
                variants={container_item_reveal_variants}
                onHoverStart={() => setHoveredJobRoleCard(role.company_name)}
                onHoverEnd={() => setHoveredJobRoleCard(null)}
              >
                <ExperienceCard
                  job_role={role}
                  onClose={() => setSelectedJobRole(null)}
                  onClick={() => setSelectedJobRole(idx)}
                  is_active={selectedJobRole === idx}
                  is_hovered={hoveredJobRoleCard === role.company_name}
                />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </SectionContainer>
  );
}

export default ExperienceSection;
