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
  email?: string;
  website?: string;
  jobTitle: string;
  about: string;
  ogImage?: string;
  keywords: string[];
  timeZone: string;
};
