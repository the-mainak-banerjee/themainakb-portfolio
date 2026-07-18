"use client";
import { MagneticButton } from "@/components/ui/button_list";
import { USER } from "../../data/user";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";

function Actions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <MagneticButton
        onClick={() =>
          window.open(
            `mailto:${USER.email}?subject=Let's%20build%20something`,
            "_blank",
          )
        }
      >
        <span className="flex items-center gap-2">
          <Mail size={18}/>
          <span>Let&apos;s Talk</span>
        </span>
      </MagneticButton>
    </div>
  );
}

export default Actions;
