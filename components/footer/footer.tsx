import { MAIN_NAV } from "@/config/site";
import Link from "next/link";
import CopyButton from "../global/copy-button";
import { USER } from "@/features/portfolio/data/user";
import { Typography } from "../ui/typography";
import PrimaryLogo from "../primary-logo";
import AnimatedWatermark from "./animated-watermark";

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
            <Typography variant="caption-sm">
              Open to opportunities
            </Typography>
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
      <div className="border-border text-muted-foreground flex flex-wrap justify-between gap-2 border-t py-5 text-xs">
        <span>v0.1 made with Next.js,Motion and shadcn</span>
        <span>© {new Date().getFullYear()}, built from scratch</span>
      </div>

      {/* Closing wordmark */}
      <AnimatedWatermark/>
    </footer>
  );
}