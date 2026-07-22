import { Icon } from "@/components/global/icons/icon";
import Image from "next/image";
import Link from "next/link";
import { LabItem } from "../data/labs-data";
import { Typography } from "@/components/ui/typography";
import { CodeXml } from "lucide-react";

interface LabDetailLayoutProps {
  lab: LabItem;
}

export function LabDetailLayout({ lab }: LabDetailLayoutProps) {
  const Preview = lab.component;
  const showLivePreview = lab.type === "component" && Preview;
  const showSourceLink = lab.type === "component" && lab.github;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="border-border mb-10 border-b pb-10">
        <Typography
          variant="caption-sm"
          className="text-muted-foreground/70 font-mono text-xs tracking-wide uppercase"
        >
          {lab.index} · {lab.type}
        </Typography>
        <div className="mt-0.5 mb-4">
          <Typography variant="h1">{lab.title}</Typography>
          <Typography variant="body-sm">{lab.description}</Typography>
        </div>

        {lab.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {lab.tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent text-accent-foreground hover:bg-secondary rounded-md px-2.5 py-1 text-xs transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-border bg-muted text-card-foreground rounded-md border">
        <div className="text-muted-foreground flex items-center justify-between border-b px-4 py-2.5 font-mono text-sm">
          <div className="flex items-center gap-1">
            <CodeXml size={16} />
            <span>Live Preview</span>
          </div>
          {showSourceLink && (
            <Link
              href={lab.github!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <Icon name="github" className="h-4 w-4" />
              View source
            </Link>
          )}
        </div>
        {showLivePreview ? (
          <div className="bg-card relative flex min-h-125 flex-col items-center justify-center rounded-b-md">
            <Preview isPlaying />
          </div>
        ) : lab.screenshot ? (
          <Image
            src={lab.screenshot}
            alt={lab.title}
            width={1200}
            height={800}
            className="w-full"
          />
        ) : null}
      </div>
    </div>
  );
}
