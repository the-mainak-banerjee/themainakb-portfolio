import quizImage from "@/public/quiz-mb.webp";
import frameImage from "@/public/frame-mb.jpg";
import { NAV_LINKS } from "@/config/site";

export const WORK_URL = NAV_LINKS.work;

export const referralConfig = {
  quizmb: {
    productName: "QuizMB",
    eyebrow: "Coming from QuizMB?",
    headline: "Like what you saw? Let's build something great.",
    description:
      "I design and build production-ready web products, real-time applications, and AI-powered experiences — from idea to deployed product.",
    image: quizImage,
    imageAlt:
      "QuizMB host dashboard with a live question, answer breakdown, participation, and quiz progress.",
    imageCaption: "QuizMB · A live session, from the host's perspective.",
    summary:
      "A live quiz platform built around real-time sessions, server-authoritative state, authentication, scoring, reconnect handling, and production-focused architecture.",
    capabilities: [
      "Full-stack product development",
      "Real-time sessions",
      "Authentication and security",
      "Responsive product UI",
      "Production architecture",
    ],
    href: "https://quizmb.themainakb.com/",
    linkLabel: "Open QuizMB",
  },
  framemb: {
    productName: "FrameMB",
    eyebrow: "Coming from FrameMB?",
    headline: "Like what you saw? Let's build something great.",
    description:
      "From image workflows to polished product interfaces, I design and build production-ready web and AI applications with thoughtful interactions at every step.",
    image: frameImage,
    imageAlt:
      "FrameMB desktop image editor with an upload canvas, platform formats, aspect ratios, image fit controls, and themed backgrounds.",
    imageCaption: "FrameMB · A focused desktop image workflow.",
    summary:
      "An image framing tool that turns screenshots and graphics into polished visuals. Its editor brings image workflows, visual customization, and responsive interaction design into one focused product.",
    capabilities: [
      "Product-focused frontend development",
      "Image workflows",
      "Responsive UI",
      "Interaction design",
      "End-to-end MVP development",
    ],
    href: "https://frame-mb.vercel.app/",
    linkLabel: "Open FrameMB",
  },
} as const;

export type ReferralSource = keyof typeof referralConfig | "direct";

export function getReferralSource(
  ref: string | string[] | undefined,
): ReferralSource {
  return ref === "quizmb" || ref === "framemb" ? ref : "direct";
}

export const genericHero = {
  eyebrow: "Let's work together",
  headline: "Have something you want to build?",
  description:
    "I help turn product ideas into polished, production-ready web and AI applications.",
};

export const workCapabilities = [
  {
    title: "Frontend Product Development",
    description:
      "Build polished, responsive, production-ready web experiences with strong UX and reusable component systems.",
  },
  // {
  //   title: "MVP Development",
  //   description:
  //     "Turn an idea into a focused, working MVP with fast iteration and practical product decisions.",
  // },
  {
    title: "Real-Time Product Experiences",
    description:
      "Build interactive live experiences such as quizzes, dashboards, collaborative flows, and event-driven interfaces.",
  },
  {
    title: "Applied AI Integration",
    description:
      "Add practical AI features using LLMs, structured outputs, tool calling, RAG, and workflow automation.",
  },
  {
    title: "AI-Powered Development",
    description:
      "Use tools like Codex and Claude to speed up implementation, iteration, debugging, and product delivery while keeping architecture and quality under control.",
  },
];

export const workProcess = [
  {
    title: "Understand the problem",
    description: "Start with the people, the need, and the constraints.",
  },
  {
    title: "Define the MVP",
    description: "Focus on the smallest useful version of the idea.",
  },
  {
    title: "Design and build",
    description: "Connect thoughtful interfaces with reliable functionality.",
  },
  {
    title: "Test and deploy",
    description:
      "Check the complete experience and get it into people's hands.",
  },
  {
    title: "Iterate from feedback",
    description: "Learn from real use and improve what matters.",
  },
];
