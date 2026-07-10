import React from "react";
import { MagneticButton } from "../components/magnetic-button";

function MagneticButtonDemo() {
  return (
    <div className="w-full mx-auto flex items-center justify-center">
      <MagneticButton>
        <span className="flex items-center gap-2">
          <span>Hover Over Me</span>
        </span>
      </MagneticButton>
    </div>
  );
}

export default MagneticButtonDemo;
