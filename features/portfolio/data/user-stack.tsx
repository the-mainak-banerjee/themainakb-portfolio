import {
  Code2,
  Terminal,
  Wrench,
  Sparkles,
  Cloud,
  Palette,
} from "lucide-react";
import { User_Stack } from "../types/user";

export const USER_STACK: User_Stack[] = [
  {
    id: "language",
    label: "Language",
    icon: Code2,
    span: "md:col-span-1",
    tools: [
      {
        name: "JavaScript",
        slug: "javascript",
        icon: "javascript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "TypeScript",
        slug: "typescript",
        icon: "typescript",
        url: "https://www.typescriptlang.org/docs",
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Terminal,
    span: "md:col-span-2",
    tools: [
      {
        name: "React",
        slug: "react",
        icon: "react",
        url: "https://react.dev",
      },
      {
        name: "Next.js",
        slug: "nextjs",
        icon: "nextjs",
        url: "https://nextjs.org",
      },
      {
        name: "Tailwind CSS",
        slug: "tailwind",
        icon: "tailwind",
        url: "https://tailwindcss.com",
      },
      {
        name: "shadcn/ui",
        slug: "shadcn",
        icon: "shadcn",
        url: "https://ui.shadcn.com",
      },
      {
        name: "Motion",
        slug: "motion",
        icon: "motion",
        url: "https://motion.dev",
      },
      {
        name: "TanStack",
        slug: "tanstack",
        icon: "tanstack",
        url: "https://tanstack.com",
      },
    ],
  },
  {
    id: "ai",
    label: "AI",
    icon: Sparkles,
    span: "md:col-span-1",
    tools: [
      {
        name: "Claude",
        slug: "claude",
        icon: "claude",
        url: "https://claude.com/",
      },
      {
        name: "Gemini",
        slug: "gemini",
        icon: "gemini",
        url: "https://gemini.google.com/",
      },
      {
        name: "ChatGPT",
        slug: "openai",
        icon: "openai",
        url: "https://chat.openai.com/",
      },
      {
        name: "Cursor",
        slug: "cursor",
        icon: "cursor",
        url: "https://cursor.com",
      },
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    icon: Wrench,
    span: "md:col-span-1",
    tools: [
      {
        name: "Git",
        slug: "git",
        icon: "git",
        url: "https://git-scm.com",
      },
      {
        name: "GitHub",
        slug: "github",
        icon: "github",
        url: "https://github.com",
      },
      {
        name: "Bitbucket",
        slug: "bitbucket",
        icon: "bitbucket",
        url: "https://bitbucket.org/product/",
      },
      {
        name: "Postman",
        slug: "postman",
        icon: "postman",
        url: "https://postman.com",
      },
    ],
  },
  {
    id: "infra",
    label: "Infra",
    icon: Cloud,
    span: "md:col-span-1",
    tools: [
      {
        name: "Vercel",
        slug: "vercel",
        icon: "vercel",
        url: "https://vercel.com",
      },
      {
        name: "Netlify",
        slug: "netlify",
        icon: "netlify",
        url: "https://netlify.com",
      },
      {
        name: "Firebase",
        slug: "firebase",
        icon: "firebase",
        url: "https://firebase.google.com",
      },
    ],
  },
  {
    id: "design",
    label: "Design",
    icon: Palette,
    span: "md:col-span-1",
    tools: [
      {
        name: "Figma",
        slug: "figma",
        icon: "figma",
        url: "https://figma.com",
      },
      {
        name: "Photoshop",
        slug: "photoshop",
        icon: "photoshop",
        url: "https://www.adobe.com/products/photoshop.html",
      },
    ],
  },
];