"use client";
import React, { useState } from "react";
import { USER } from "../../data/user";
import ExperienceCard from "./experience-card";
import SectionContainer from "@/components/global/section-container";

function ExperienceSection() {
  const [selectedJobRole, setSelectedJobRole] = useState<number | null>(null);
  return (
    <SectionContainer sectionHeading="Experience" sectionLabel="Career">
      <div className="flex flex-col">
        {USER.jobRoles.map((role, idx) => {
          const isLast = idx === USER.jobRoles.length - 1;
          return (
            <div key={idx} className="flex">
              <div className="flex flex-col items-center pt-6">
                <span className="bg-primary ring-background h-2.5 w-2.5 shrink-0 rounded-full ring-4" />
                {!isLast && (
                  <span className="bg-border mt-1 -mb-5 w-px flex-1" />
                )}
              </div>

              <div className="flex w-4 flex-col items-center pt-6 sm:w-6">
                <span className="bg-border mt-1.25 h-px w-full" />
              </div>

              <div className={isLast ? "flex-1" : "flex-1 pb-6"}>
                <ExperienceCard
                  job_role={role}
                  onClose={() => setSelectedJobRole(null)}
                  onClick={() => setSelectedJobRole(idx)}
                  is_active={selectedJobRole === idx}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}

export default ExperienceSection;
