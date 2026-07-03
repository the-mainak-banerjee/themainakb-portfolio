import LinkedinIcon from "./linkedin-icon";
import { TelegramIcon } from "./telegram-icon";
import InstagramIcon from "./instagram-icon";
import XIcon from "./X-icon";
import EmailIcon from "./email-icon";
import JavaScriptIcon from "./js-icon";
import TypeScriptIcon from "./ts-icon";
import ReactIcon from "./react-icon";
import NextJSIcon from "./nextjs-icon";
import TailwindIcon from "./tailwind-icon";
import ShadcnIcon from "./shadcn-icon";
import MotionIcon from "./motion-icon";
import TanstackIcon from "./tanstack-icon";
import { ClaudeIcon, CursorIcon, GeminiIcon, OpenAiIcon } from "./ai-tools-icon";
import { BitbucketIcon, GithubIcon, GitIcon, PostmanIcon } from "./tooling-icon";
import { FirebaseIcon, NetlifyIcon, VercelIcon } from "./infra-icon";
import { FigmaIcon, PhotoshopIcon } from "./design-tools-icon";

export const iconRegistry = {
  telegram: TelegramIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  git: GitIcon,
  postman: PostmanIcon,
  bitbucket: BitbucketIcon,
  instagram: InstagramIcon,
  twitter: XIcon,
  email: EmailIcon,
  javascript: JavaScriptIcon,
  typescript: TypeScriptIcon,
  react: ReactIcon,
  vercel: VercelIcon,
  netlify: NetlifyIcon,
  firebase: FirebaseIcon,
  nextjs: NextJSIcon,
  tailwind: TailwindIcon,
  shadcn: ShadcnIcon,
  motion: MotionIcon,
  tanstack: TanstackIcon,
  claude: ClaudeIcon,
  openai: OpenAiIcon,
  gemini: GeminiIcon,
  cursor: CursorIcon,
  figma: FigmaIcon,
  photoshop: PhotoshopIcon
} as const;

export type IconName = keyof typeof iconRegistry;
