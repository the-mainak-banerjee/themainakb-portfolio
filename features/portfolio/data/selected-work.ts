import type { StaticImageData } from "next/image";
import quizImage from "@/public/quiz-mb.webp";
import frameImage from "@/public/frame-mb.jpg";

export interface WorkProject {
  id: "quizmb" | "framemb";
  name: string;
  category: string;
  href: string;
  image: StaticImageData;
  imageAlt: string;
  imageCaption: string;
  description: string;
  motivation: string;
  role: string;
  capabilities: readonly string[];
  engineeringFocus: string;
  stack: readonly string[];
}

export const selectedWork: readonly WorkProject[] = [
  {
    id: "quizmb",
    name: "QuizMB",
    category: "Live quiz platform",
    href: "https://quizmb.themainakb.com/",
    image: quizImage,
    imageAlt:
      "QuizMB host dashboard showing a timed live question, submitted answers, answer breakdown, and quiz progress.",
    imageCaption: "The host's view of a live quiz session.",
    description:
      "A live quiz platform where creators organize quizzes and hosts guide participants through an interactive session.",
    motivation:
      "I wanted to build a quiz experience where the host controls the pace—when questions advance, answers are revealed, and leaderboards appear—while participants get a clear, responsive way to join and answer.",
    role: "Product planning, interface design, and full-stack development.",
    capabilities: [
      "Organize multiple quizzes within projects.",
      "Create choice-based questions and collect descriptive responses without automatic grading.",
      "Run live participation with explicit answer submission and configurable timers.",
      "Control question progression, answer reveals, and leaderboard visibility as the host.",
      "Score answers using correctness and response speed.",
    ],
    engineeringFocus:
      "A live session needs one consistent source of truth across the host and participants. The server owns question timing, answer acceptance, and scoring; Socket.IO delivers session updates, while Redis coordinates presence and session locks. Scores combine correctness with server-measured response time, and descriptive answers remain ungraded.",
    stack: [
      "Next.js / Tailwind CSS",
      "Node.js / Express",
      "Socket.IO / Redis",
      "Postgres / Prisma",
    ],
  },
  {
    id: "framemb",
    name: "FrameMB",
    category: "Social image creation tool",
    href: "https://frame-mb.vercel.app/",
    image: frameImage,
    imageAlt:
      "FrameMB desktop editor with an image upload canvas, social platform formats, aspect ratios, image fit controls, and themed backgrounds.",
    imageCaption:
      "The desktop editor, with the canvas and properties side by side.",
    description:
      "Turn screenshots and images into polished visuals for social media with platform presets, flexible layouts, and themed backgrounds.",
    motivation:
      "I often had screenshots worth sharing, but preparing them for social media meant extra design work. I built FrameMB to make that process simple: upload an image, choose a format and background, then download a share-ready visual.",
    role: "Product planning, interface design, and full-stack development.",
    capabilities: [
      "Upload PNG, JPG/JPEG, and WebP images.",
      "Choose social platform formats and aspect ratios.",
      "Adjust image fit, scale, padding, and position within the composition.",
      "Customize looks, backgrounds, and shadows.",
      "Preview the composition and download a PNG at the selected output size.",
    ],
    engineeringFocus:
      "The editor separates the output dimensions from preview zoom, so changing the workspace view does not change the exported image. Fit and layout controls manage image proportions across formats, while preview and PNG export share a browser-based canvas renderer to keep the downloaded result consistent with the composition.",
    stack: ["Next.js", "Tailwind CSS", "Canvas API"],
  },
];
