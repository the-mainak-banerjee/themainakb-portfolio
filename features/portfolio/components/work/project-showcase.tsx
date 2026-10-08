import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import SectionContainer from "@/components/global/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import type { WorkProject } from "@/features/portfolio/data/selected-work";

export default function ProjectShowcase({
  project,
  eager = false,
}: {
  project: WorkProject;
  eager?: boolean;
}) {
  return (
    <SectionContainer
      sectionLabel={project.category}
      sectionHeading={project.name}
      shouldAnimate={false}
    >
      <div className="space-y-6">
        <Typography variant="body-sm">{project.description}</Typography>
        <figure className="space-y-3">
          <Image
            src={project.image}
            alt={project.imageAlt}
            sizes="(max-width: 768px) 100vw, 768px"
            className="border-border h-auto w-full rounded-xl border"
            placeholder="blur"
            loading={eager ? "eager" : "lazy"}
          />
          <Typography as="figcaption" variant="caption" className="block">
            {project.imageCaption}
          </Typography>
        </figure>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <Typography variant="h4" as="h3">
                Why I built it
              </Typography>
              <Typography variant="body-sm">{project.motivation}</Typography>
            </div>
            <div className="space-y-2">
              <Typography variant="h4" as="h3">
                My role
              </Typography>
              <Typography variant="body-sm">{project.role}</Typography>
            </div>
          </div>
          <div className="space-y-3">
            <Typography variant="h4" as="h3">
              What you can do
            </Typography>
            <ul className="marker:text-muted-foreground list-disc space-y-2 pl-5">
              {project.capabilities.map((capability) => (
                <li key={capability}>
                  <Typography variant="body-sm">{capability}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-border space-y-3 border-t pt-4">
          <Typography variant="h4" as="h3">
            Engineering focus
          </Typography>
          <Typography variant="body-sm">{project.engineeringFocus}</Typography>
        </div>
        <div
          className="flex flex-wrap gap-2"
          aria-label={`${project.name} technology stack`}
        >
          {project.stack.map((technology) => (
            <Badge
              key={technology}
              variant="outline"
              className="h-auto whitespace-normal"
            >
              {technology}
            </Badge>
          ))}
        </div>
        <Button asChild size="lg">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} product (opens in a new tab)`}
          >
            View product <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </div>
    </SectionContainer>
  );
}
