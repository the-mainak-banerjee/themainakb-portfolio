import Image from "next/image";
import { LabItem } from "../data/labs-data";
import { Typography } from "@/components/ui/typography";
import PreviewFrame from "@/components/global/preview-frame";

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

      {showLivePreview && (
        <PreviewFrame
          preview={<Preview />}
          githubLink={showSourceLink ? lab.github : ""}
        />
      )}
      {lab.screenshot && (
        <Image
          src={lab.screenshot}
          alt={lab.title}
          width={1200}
          height={800}
          className="w-full"
        />
      )}
    </div>
  );
}
