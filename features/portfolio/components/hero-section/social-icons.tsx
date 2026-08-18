import React from "react";
import { USER_SOCIAL_MEDIA } from "../../data/user-social-media";
import { Icon } from "@/components/global/icons/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { VisuallyHidden } from "@/components/global/visually-hidden";

function SocialIcons() {
  return (
    <ul className="flex items-center gap-3">
      {USER_SOCIAL_MEDIA.map((item, idx) => {
        return (
          <li key={idx}>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener"
                    className="group flex items-center"
                  >
                    <div className="md:border-border text-foreground relative inline-block rounded-sm md:border md:p-2">
                      <Icon name={item.icon} size={12} />
                      <div className="bg-accent absolute inset-0 -z-10 hidden rounded-sm opacity-0 transition-opacity duration-500 ease-in group-hover:opacity-100 group-hover:duration-100 group-hover:ease-out md:block" />
                    </div>
                    <Typography variant="caption" className="ml-1 md:hidden">
                      {item.label}
                    </Typography>
                    <VisuallyHidden>{item.label}</VisuallyHidden>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <Typography variant="caption" className="text-background">
                    {item.info}
                  </Typography>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialIcons;
