import { NavItem } from "@/types/nav";
import { FileText, FlaskConical, House, Mail, NotebookPen } from "lucide-react";
import { Route } from "next";

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Labs",
    icon: FlaskConical,
    href: "/labs",
  },
  {
    title: "Blog",
    icon: NotebookPen,
    href: "/blog",
  },
  {
    title: "Resume",
    icon: FileText,
    href: "/resume",
  },
  {
    title: "Contact",
    icon: Mail,
    href: "/contact",
  },
];

export const MOBILE_NAV: NavItem<Route>[] = [{
  title: "Home",
  icon: House,
  href: "/",
}, ...MAIN_NAV]