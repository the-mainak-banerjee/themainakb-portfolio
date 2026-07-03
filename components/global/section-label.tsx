import React from "react";
import { Typography } from "../ui/typography";

function SectionLabel({ sectionLabel }: { sectionLabel: string }) {
  return (
      <div className="flex items-center gap-4">
        <div className="border-border h-px flex-1 border-t border-dashed" />
        <Typography variant="caption-sm" className="shrink-0">
          {sectionLabel}
        </Typography>
        <div className="border-border h-px flex-1 border-t border-dashed" />
      </div>
  );
}

export default SectionLabel;
