import { NavItem } from "@/types/nav";
import { Route } from "next";

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Labs",
    href: "/labs",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Resume",
    href: "/resume",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
