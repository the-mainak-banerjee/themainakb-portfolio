"use client";
import { Typography } from "@/components/ui/typography";
import React, { useState } from "react";
import { USER } from "../../data/user";
import ExperienceCard from "./experience-card";

function ExperienceSection() {
  const [selectedJobRole, setSelectedJobRole] = useState<number | null>(null);
  return (
    <div className="mb-80 space-y-6">
      <Typography variant="h5" as="h2">
        Experience
      </Typography>
      <div className="space-y-6">
        {USER.jobRoles.map((role, idx) => {
          return (
            <ExperienceCard
              key={idx}
              job_role={role}
              onClose={() => setSelectedJobRole(null)}
              onClick={() => setSelectedJobRole(idx)}
              is_active={selectedJobRole === idx}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ExperienceSection;
