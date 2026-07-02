"use client";
import { Icon } from "@/components/global/icons/icon";
import { MagneticButton } from "@/components/ui/button_list";
import { USER } from "../../data/user";
import { cn } from "@/lib/utils";

function Actions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <MagneticButton
        onClick={() => window.open(`https://t.me/${USER.telegramId}`, "_blank")}
      >
        <span className="flex items-center gap-2">
          <Icon name="telegram" size={20} />
          <span>Quick Chat</span>
        </span>
      </MagneticButton>
    </div>
  );
}

export default Actions;
