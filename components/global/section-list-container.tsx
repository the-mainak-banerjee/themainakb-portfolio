import React from "react";

function SectionListContainer({ children }: { children: React.ReactNode }) {
  return <div className="space-y-10 pt-8">{children}</div>;
}

export default SectionListContainer;
