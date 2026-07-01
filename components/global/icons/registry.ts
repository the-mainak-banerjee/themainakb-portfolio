import { TelegramIcon } from "./telegram-icon";

export const iconRegistry = {
  telegram: TelegramIcon,
} as const;

export type IconName = keyof typeof iconRegistry;
