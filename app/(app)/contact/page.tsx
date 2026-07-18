import { MainContainer } from "@/components/global/containers";
import CopyButton from "@/components/global/copy-button";
import { Typography } from "@/components/ui/typography";
import { NAV_LINKS } from "@/config/site";
import SocialIcons from "@/features/portfolio/components/hero-section/social-icons";
import { USER } from "@/features/portfolio/data/user";
import { ArrowRight, Download, Mail, Send } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch — I'm a frontend developer and design engineer specializing in motion, interaction design, and React/Next.js. Open to roles and freelance work",
  alternates: {
    canonical: `${NAV_LINKS.contact}`,
  },
};

function ContactPage() {
  return (
    <MainContainer className="space-y-8">
      <div className="space-y-3">
        <div className="bg-text-accent/10 dark:bg-text-accent/30 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1">
          <span className="relative flex size-2.5 items-center justify-center">
            <span className="bg-text-accent absolute size-2.5 animate-ping rounded-full opacity-50" />

            <span className="bg-text-accent size-1.5 rounded-full" />
          </span>
          <Typography variant="caption-sm" className="text-text-accent">
            Open to opportunities
          </Typography>
        </div>

        <Typography variant="h1">
          Let&apos;s build something together.
        </Typography>
        <Typography
          variant="body-sm"
          className="text-muted-foreground whitespace-pre-line"
        >
          I&apos;m a Frontend Developer passionate about creating modern web
          experiences through thoughtful UI and interaction design. Currently
          learning the nitty gritty of design enginnering.
        </Typography>
        <Typography
          variant="body-sm"
          className="text-muted-foreground whitespace-pre-line"
        >
          I&apos;m also open to{" "}
          <strong className="text-foreground/80">
            full-time opportunities
          </strong>{" "}
          and select freelance projects.
        </Typography>
        <Typography
          variant="body-sm"
          className="text-muted-foreground whitespace-pre-line"
        >
          If you&apos;re looking for a{" "}
          <strong className="text-foreground/80">frontend developer</strong>{" "}
          with a growing focus on design engineering, let&apos;s connect and see
          if I&apos;d be a good fit for your team.
        </Typography>
      </div>

      <div className="space-y-2">
        <div className="border-border bg-card hover:border-foreground/30 flex items-center justify-between rounded-lg border px-4 py-2 transition-colors duration-200">
          <div className="flex items-start gap-2">
            <Mail size={16} className="mt-1" />
            <div>
              <Typography variant="caption-sm">Email</Typography>
              <div className="flex items-center gap-2">
                <a href={`mailto:${USER.email}`} aria-label="Send email">
                  <Typography
                    variant="body-sm"
                    className="text-foreground underline-offset-2 max-lg:underline lg:hover:underline"
                  >
                    {USER.email}
                  </Typography>
                </a>
                <CopyButton
                  value={USER.email}
                  className="border-0"
                  withTooltip={true}
                  tooltipLabel="Copy Email."
                />
              </div>
            </div>
          </div>

          <a
            href={`mailto:${USER.email}`}
            aria-label="Send email"
            className="group hover:bg-foreground/5 relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors duration-200 max-lg:hidden"
          >
            <ArrowRight
              size={16}
              className="absolute transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-0"
            />
            <Send
              size={16}
              className="absolute -translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
            />
          </a>
        </div>

        <a
          href="/Mainak_Banerjee.pdf"
          target="_blank"
          className="border-border bg-card hover:border-foreground/30 flex w-fit items-center gap-2 rounded-lg border px-4 py-2 transition-colors duration-200"
        >
          <Download size={16} />
          <Typography variant="body-sm">View resume</Typography>
        </a>
      </div>
      <div className="border-border block space-y-2 border-t pt-4">
        <SocialIcons />
        <Typography variant="caption">
          Based in <strong>Kolkata, India</strong> · Usually replies within a
          day.
        </Typography>
      </div>
    </MainContainer>
  );
}

export default ContactPage;
