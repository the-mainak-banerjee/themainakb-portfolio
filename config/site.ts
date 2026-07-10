import { NavItem } from "@/types/nav";
import {
  Component,
  House,
  LayoutPanelTop,
  Mail,
  NotebookPen,
} from "lucide-react";
import { Route } from "next";

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Components",
    icon: Component,
    href: "/components",
  },
  {
    title: "Templates",
    icon: LayoutPanelTop,
    href: "/templates",
  },
  {
    title: "Blog",
    icon: NotebookPen,
    href: "/blog",
  },

  {
    title: "Contact",
    icon: Mail,
    href: "/contact",
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
