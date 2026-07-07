import React from "react";
import { MagneticButton } from "../components/magnetic-button";

function MagneticButtonDemo() {
  return (
    <MagneticButton>
      <span className="flex items-center gap-2">
        <span>Quick Chat</span>
      </span>
    </MagneticButton>
  );
}

export default MagneticButtonDemo;
