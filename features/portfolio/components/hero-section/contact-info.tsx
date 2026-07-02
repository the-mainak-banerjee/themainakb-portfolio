import { Typography } from "@/components/ui/typography";
import { Mail, MapPin } from "lucide-react";
import React from "react";
import { USER } from "../../data/user";
import SocialIcons from "./social-icons";
import { CopyButton } from "@/components/global/copy-button";

function ContactInfo() {
  return (
    <div className="flex flex-col-reverse justify-between md:flex-row md:items-center">
      <div className="ml-1 flex items-center gap-2 md:ml-0">
        <div className="flex items-center gap-px">
          <MapPin size={16} />
          <Typography variant="caption">{USER.address}</Typography>
        </div>
        <div className="bg-foreground h-1 w-1 rounded-full"></div>
        <div className="flex items-center gap-0.5">
          <Mail size={16} />
          <a
            href={`mailto:${USER.email}`}
            className="group decoration-1 hover:underline hover:underline-offset-4"
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
            label="Copy Email"
            className="h-6 w-6 border-0"
          />
        </div>
      </div>
      <SocialIcons />
    </div>
  );
}

export default ContactInfo;
