import { User_Social_Media } from "../types/user";

export const USER_SOCIAL_MEDIA_LINKS = {
  linkedin: "https://www.linkedin.com/in/themainakb/",
  instagrem: "https://www.instagram.com/mainak_builds",
  twitter: "https://x.com/themainakb",
  github: "https://github.com/the-mainak-banerjee",
};

export const USER_SOCIAL_MEDIA: User_Social_Media = [
  {
    icon: "linkedin",
    label: "LinkedIn",
    url: USER_SOCIAL_MEDIA_LINKS.linkedin,
    info: "Open Linkedin (@themainakb)",
  },
  {
    icon: "instagram",
    label: "Instagram",
    url: USER_SOCIAL_MEDIA_LINKS.instagrem,
    info: "Open Instagram (@mainak_build)",
  },
  {
    icon: "twitter",
    label: "X",
    url: USER_SOCIAL_MEDIA_LINKS.twitter,
    info: "Open X (@themainakb)",
  },
  {
    icon: "github",
    label: "GitHub",
    url: USER_SOCIAL_MEDIA_LINKS.github,
    info: "Open Github (@the-mainak-banerjee)",
  },
];
