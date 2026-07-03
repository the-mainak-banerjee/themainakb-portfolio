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
    span: "md:col-span-2",
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
    span: "md:col-span-3",
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
        url: "https://nextjs.org/docs",
      },
      {
        name: "Tailwind CSS",
        slug: "tailwind",
        icon: "tailwind",
        url: "https://tailwindcss.com/docs",
      },
      {
        name: "shadcn/ui",
        slug: "shadcn",
        icon: "shadcn",
        url: "https://ui.shadcn.com/docs",
      },
      {
        name: "Motion",
        slug: "motion",
        icon: "motion",
        url: "https://motion.dev/docs",
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
    span: "md:col-span-2",
    tools: [
      {
        name: "Claude",
        slug: "claude",
        icon: "claude",
        url: "https://docs.anthropic.com",
      },
      {
        name: "Gemini",
        slug: "gemini",
        icon: "gemini",
        url: "https://ai.google.dev",
      },
      {
        name: "ChatGPT",
        slug: "openai",
        icon: "openai",
        url: "https://platform.openai.com/docs",
      },
      {
        name: "Cursor",
        slug: "cursor",
        icon: "cursor",
        url: "https://docs.cursor.com",
      },
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    icon: Wrench,
    span: "md:col-span-3",
    tools: [
      {
        name: "Git",
        slug: "git",
        icon: "git",
        url: "https://git-scm.com/doc",
      },
      {
        name: "GitHub",
        slug: "github",
        icon: "github",
        url: "https://docs.github.com",
      },
      {
        name: "Bitbucket",
        slug: "bitbucket",
        icon: "bitbucket",
        url: "https://support.atlassian.com/bitbucket-cloud",
      },
      {
        name: "Postman",
        slug: "postman",
        icon: "postman",
        url: "https://learning.postman.com/docs",
      },
    ],
  },
  {
    id: "infra",
    label: "Infra",
    icon: Cloud,
    span: "md:col-span-2",
    tools: [
      {
        name: "Vercel",
        slug: "vercel",
        icon: "vercel",
        url: "https://vercel.com/docs",
      },
      {
        name: "Netlify",
        slug: "netlify",
        icon: "netlify",
        url: "https://docs.netlify.com",
      },
      {
        name: "Firebase",
        slug: "firebase",
        icon: "firebase",
        url: "https://firebase.google.com/docs",
      },
    ],
  },
  {
    id: "design",
    label: "Design",
    icon: Palette,
    span: "md:col-span-3",
    tools: [
      {
        name: "Figma",
        slug: "figma",
        icon: "figma",
        url: "https://help.figma.com",
      },
      {
        name: "Photoshop",
        slug: "photoshop",
        icon: "photoshop",
        url: "https://helpx.adobe.com/photoshop/user-guide.html",
      },
    ],
  },
];