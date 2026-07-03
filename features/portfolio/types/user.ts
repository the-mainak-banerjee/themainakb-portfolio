import { IconName } from "@/components/global/icons/registry";
import { IImage } from "@/types/common";
import { LucideIcon } from "lucide-react";

export type User = {
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  gender: "male" | "female" | "non-binary";
  pronouns: string;
  bio: string;
  animatedSentences: string[];
  profileImages: {
    light: string;
    dark: string;
  };
  address: string;
  phoneNumber?: string;
  telegramId?: string;
  email: string;
  website?: string;
  jobTitle: string;
  about: string;
  ogImage?: string;
  keywords: string[];
  timeZone: string;
  jobRoles: User_Job_Roles[];
};

export interface SocialMediaLink {
  icon: IconName;
  label: string;
  url: string;
  info: string;
}

export type User_Social_Media = SocialMediaLink[];

export interface User_Job_Roles {
  company_name: string;
  company_image: IImage;
  company_location: string;
  job_location: "Remote" | "On Site";
  start_date: string; // "2023-01"
  end_date?: string; // "2026-07"
  duration?: string;
  is_current_company: boolean;
  achievements?: { title: string; description?: string; image?: IImage }[];
  description: string;
  job_role: string;
  tools: TechTool[]
}

export interface TechTool {
  name: string;
  slug: string;
  icon: IconName;
  url: string;
}

export interface User_Stack {
  id: string;
  label: string;
  icon: LucideIcon;
  span?: string;
  tools: TechTool[];
}