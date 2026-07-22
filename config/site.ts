import { NavItem } from "@/types/nav";
import {
  Component,
  FlaskConical,
  House,
  Mail,
  NotebookPen,
} from "lucide-react";
import { Route } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://themainakb.com";

export const NAV_LINKS = {
  components: "/components",
  templates: "/templates",
  blog: "/blog",
  labs: "/labs",
  contact: "/contact"
};


export const NAV_LINK_KEYS = Object.fromEntries(
  Object.entries(NAV_LINKS).map(([key, value]) => [key, value.slice(1)]),
) as {
  [K in keyof typeof NAV_LINKS]: string;
  };

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Components",
    icon: Component,
    href: NAV_LINKS.components,
  },
  {
    title: "Blog",
    icon: NotebookPen,
    href: NAV_LINKS.blog,
  },
  {
    title: "Labs",
    icon: FlaskConical,
    href: NAV_LINKS.labs,
  },
  {
    title: "Contact",
    icon: Mail,
    href: NAV_LINKS.contact,
  },
];

export const MOBILE_NAV: NavItem<Route>[] = [
  {
    title: "Home",
    icon: House,
    href: "/",
  },
  ...MAIN_NAV,
];


export function getBaseUrl() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return process.env.NEXT_PUBLIC_APP_URL || "https://themainakb.com";
}

export function isProd() {
  return process.env.NEXT_PUBLIC_APP_URL === "https://themainakb.com";
}
