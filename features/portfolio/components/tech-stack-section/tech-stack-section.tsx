"use client";
import SectionContainer from "@/components/global/section-container";
import { USER_STACK } from "../../data/user-stack";
import TechStackCard from "./tech-stack-card";
import { LayoutGroup } from "motion/react";

function TechStackSection() {
  return (
    <SectionContainer sectionHeading="Tech Stack" sectionLabel="Toolbox">
      <LayoutGroup>
        {USER_STACK.map((item) => {
          return <TechStackCard stackGroup={item} key={item.id} />;
        })}
      </LayoutGroup>
    </SectionContainer>
  );
}

export default TechStackSection;
