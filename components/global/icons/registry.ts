import GithubIcon from "./github-icon";
import LinkedinIcon from "./linkedin-icon";
import { TelegramIcon } from "./telegram-icon";
import InstagramIcon from "./instagram-icon";
import XIcon from "./X-icon";
import EmailIcon from "./email-icon";

export const iconRegistry = {
  telegram: TelegramIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  instagram: InstagramIcon,
  twitter: XIcon,
  email: EmailIcon
} as const;

export type IconName = keyof typeof iconRegistry;
