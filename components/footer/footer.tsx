import { MAIN_NAV } from "@/config/site";
import Link from "next/link";
import CopyButton from "../global/copy-button";
import { USER } from "@/features/portfolio/data/user";
import { Typography } from "../ui/typography";
import PrimaryLogo from "../primary-logo";
import AnimatedWatermark from "./animated-watermark";
import { USER_SOCIAL_MEDIA_LINKS } from "@/features/portfolio/data/user-social-media";

const INSPIRED_BY = [
  { name: "shadcn", href: "https://ui.shadcn.com" },
  { name: "Motion", href: "https://motion.dev" },
  { name: "Chánh Đại", href: "https://chanhdai.com" },
  { name: "Manu Arora", href: "https://manuarora.in" },
];

export function Footer() {
  return (
    <footer className="bg-card mx-auto w-full overflow-hidden rounded-xl px-8 pt-10 max-lg:pb-25">
      {/* Top row: signature mark + status/contact */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
        {/* <MonogramMB className="text-foreground h-10 w-14" /> */}
        <PrimaryLogo />

        <div className="flex flex-col items-end gap-1.5">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className="relative flex size-2.5 items-center justify-center">
              <span className="bg-text-accent absolute size-2.5 animate-ping rounded-full opacity-50" />

              <span className="bg-text-accent size-1.5 rounded-full" />
            </span>
            <Typography variant="caption-sm">Open to opportunities</Typography>
          </div>
          <div className="flex items-center text-sm">
            <CopyButton
              value={USER.email}
              className="border-0 hover:bg-transparent"
            />
            <a href={`mailto:${USER.email}`} aria-label="Send email">
              <Typography
                variant="body-sm"
                className="text-muted-foreground text-xs underline-offset-2 max-lg:underline lg:hover:underline"
              >
                {USER.email}
              </Typography>
            </a>
          </div>
        </div>
      </div>

      {/* Nav row */}
      <nav className="text-muted-foreground mb-10 flex flex-wrap gap-6 text-sm">
        {MAIN_NAV.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground lowercase"
            >
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Credits row */}
      <div className="border-border flex flex-wrap items-start justify-between gap-2 border-t py-5 text-xs">
        <div className="flex flex-col gap-1">
          <span className="text-foreground/80">
            Crafted by{" "}
            <a
              href={USER_SOCIAL_MEDIA_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium underline underline-offset-2"
            >
              @themainakb
            </a>{" "}
            · v0.1
          </span>
          <span className="text-muted-foreground">
            Inspired by{" "}
            {INSPIRED_BY.map((item, i) => (
              <span key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="decoration-muted-foreground/40 hover:text-foreground underline underline-offset-2"
                >
                  {item.name}
                </a>
                {i < INSPIRED_BY.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Closing wordmark */}
      <AnimatedWatermark />
    </footer>
  );
}