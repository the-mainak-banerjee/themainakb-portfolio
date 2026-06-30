import { LucideIcon } from "lucide-react";

export type NavItem<T extends string = string> = {
  title: string;
  href: T;
  icon: LucideIcon;
};
