import React from "react";

function SectionListContainer({ children }: { children: React.ReactNode }) {
  return <div className="space-y-10 pt-4 md:pt-8 pb-24">{children}</div>;
}

export default SectionListContainer;
