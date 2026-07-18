import { User, User_Job_Roles } from "../types/user";
// ToDo Complete the user data with all the required fields and values.

const USER_JOB_ROLES: User_Job_Roles[] = [
  {
    company_name: "Digimantra",
    company_location: "Mohali, Punjab, India",
    job_location: "On Site",
    start_date: "2024-11",
    end_date: "2026-3",
    duration: "1 yr 5 mos",
    job_role: "Software Development Engineer",
    is_current_company: false,
    company_image: {
      src: "/digimantra_labs_logo.jpg",
      alt: "Digimantra Labs Logo",
    },
    description: `Working as a Frontend Developer, contributing to multiple high-impact SaaS and AI-driven products. My role involves building scalable UI architectures, integrating Generative AI capabilities, developing admin dashboards, and delivering seamless user-facing features using modern frontend technologies including React.js, Next.js (App Router), TypeScript, and Tailwind CSS.

I have successfully built and shipped responsive, maintainable, and production-ready interfaces while ensuring performance, accessibility, and clean developer experience. Along with UI development, I’ve also worked on full workflows that include backend logic and AI integrations using Mastra AI.

My work involves close collaboration with backend, AI, QA, and design teams to ensure alignment between product goals, technical implementation, and end-user experience. I also actively mentor junior developers through code reviews, pair programming, and knowledge-sharing, helping maintain high-quality standards across the codebase and supporting their growth.`,
    achievements: [
      {
        title: "Most Inspiring Digitian",
        description: "Awarded Employee of the Quarter for Q3 2025.",
        image: {
          src: "/digimantra_award.jpg",
          alt: "Award for employee of the quarter",
        },
      },
    ],
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
        name: "TanStack",
        slug: "tanstack",
        icon: "tanstack",
        url: "https://tanstack.com",
      },
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
        name: "Postman",
        slug: "postman",
        icon: "postman",
        url: "https://postman.com",
      },
      {
        name: "Vercel",
        slug: "vercel",
        icon: "vercel",
        url: "https://vercel.com",
      },
      {
        name: "Firebase",
        slug: "firebase",
        icon: "firebase",
        url: "https://firebase.google.com",
      },
      {
        name: "Figma",
        slug: "figma",
        icon: "figma",
        url: "https://figma.com",
      },
    ],
  },
  {
    company_name: "Welkin Digital",
    company_location: "Hyderabad, Telengana, India",
    job_location: "Remote",
    start_date: "2022-12",
    end_date: "2024-11",
    duration: "2 yrs",
    job_role: "Frontend Developer",
    is_current_company: false,
    company_image: {
      src: "/welkin_digital_logo.jpg",
      alt: "Welkin Digital Logo",
    },
    description: `As a front-end react developer, my job role entails working with cutting-edge technologies such as Next.js, Tailwind CSS, SCSS, and many more to create responsive, high-performance web applications.

I am responsible for converting figma mockups and prototypes into fully functional, intuitive user interfaces, as well as ensuring seamless functionality across different devices and platforms that deliver a seamless user experience.`,
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
      {
        name: "Vercel",
        slug: "vercel",
        icon: "vercel",
        url: "https://vercel.com",
      },
    ],
  },
];

export const USER: User = {
  firstName: "Mainak",
  lastName: "Banerjee",
  displayName: "Mainak Banerjee",
  username: "themainakb",
  gender: "male",
  pronouns: "he/him",
  bio: "React Developer with a Design Engineer mindset.",
  animatedSentences: [
    "Turning ideas into products with code.",
    "Fast MVPs. Thoughtful interactions.",
    "React Developer with a Design Engineer mindset.",
  ],
  profileImages: {
    light: "/profile_image_light.png",
    dark: "/profile_image_dark.png",
  },
  address: "Kolkata, India",
  telegramId: "themainakb",
  email: "developer.mainakbanerjee@gmail.com",
  jobTitle: "React Developer",
  jobRoles: USER_JOB_ROLES,
  about: `I'm Mainak, a React developer who ships fast without shipping sloppy.

Over the last 3 years, I've shipped 7+ production frontends across SaaS, e-commerce, and B2C products.

I work best with founders and teams who need an MVP delivered fast, but still expect the kind of thoughtful interactions and interface details that make a product feel finished.

Currently open to full-time roles and freelance projects — happy to talk either way.`,
  timeZone: "Asia/Kolkata",
  keywords: [
    "mainak banerjee",
    "mainak",
    "banerjee",
    "react developer",
    "react developer kolkata",
    "frontend developer india",
    "mvp developer",
    "frontend engineer",
    "react mvp",
    "interaction design developer",
    "design engineer frontend",
  ],
};
