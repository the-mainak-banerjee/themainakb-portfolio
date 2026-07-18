import { NavItem } from "@/types/nav";
import {
  Component,
  House,
  Mail,
  NotebookPen,
} from "lucide-react";
import { Route } from "next";

export const NAV_LINKS = {
  components: "/components",
  templates: "/templates",
  blog: "/blog",
  contact: "/contact"
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
