import { Typography } from "@/components/ui/typography";
import { Mail, MapPin } from "lucide-react";
import React from "react";
import { USER } from "../../data/user";
import SocialIcons from "./social-icons";
import CopyButton from "@/components/global/copy-button";

function ContactInfo() {
  return (
    <div className="flex flex-col justify-between md:flex-row md:items-center gap-1">
      <div className="flex flex-col md:flex-row md:items-center  md:gap-2">
        <div className="flex items-center gap-1">
          <MapPin size={12} />
          <Typography variant="caption">{USER.address}</Typography>
        </div>
        <div className="bg-foreground h-1 w-1 rounded-full hidden md:block"></div>
        <div className="flex items-center gap-1">
          <Mail size={12} />
          <a
            href={`mailto:${USER.email}`}
            className="group decoration-1 hover:underline hover:underline-offset-4 flex items-center justify-center"
          >
            <Typography
              variant="caption"
              className="group-hover:text-foreground"
            >
              {USER.email}
            </Typography>
          </a>
          <CopyButton
            value={USER.email}
            tooltipLabel="Copy Email"
            withTooltip={true}
            className="h-4 w-4 border-0 rounded-none hover:bg-transparent"
          />
        </div>
      </div>
      <SocialIcons />
    </div>
  );
}

export default ContactInfo;
