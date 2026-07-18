"use client";
import SectionContainer from "@/components/global/section-container";
import { USER_STACK } from "../../data/user-stack";
import TechStackCard from "./tech-stack-card";
import { LayoutGroup } from "motion/react";

function TechStackSection() {
  return (
    <SectionContainer
      sectionHeading="Tech Stack"
      sectionLabel="Arsenal"
    >
      <div className="space-y-4">
        <LayoutGroup>
          {USER_STACK.map((item) => {
            return <TechStackCard stackGroup={item} key={item.id} />;
          })}
        </LayoutGroup>
      </div>
    </SectionContainer>
  );
}

export default TechStackSection;
