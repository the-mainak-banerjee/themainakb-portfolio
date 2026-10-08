import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MainContainer } from "@/components/global/containers";
import { ItemCard } from "@/components/global/item-card";
import ListPageHeader from "@/components/global/list-page-header";
import SectionContainer from "@/components/global/section-container";
import SectionListContainer from "@/components/global/section-list-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { NAV_LINKS } from "@/config/site";
import {
  genericHero,
  getReferralSource,
  referralConfig,
  workCapabilities,
  workProcess,
  WORK_URL,
} from "@/features/portfolio/data/work-with-me";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "Let's turn product ideas into polished web and AI applications. Open to product opportunities, collaborations, and full-time roles.",
  alternates: { canonical: "/work-with-me" },
};

export default async function WorkWithMePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const source = getReferralSource((await searchParams).ref);
  const product = source === "direct" ? undefined : referralConfig[source];
  const hero = product ?? genericHero;
  const projects =
    source === "framemb"
      ? [referralConfig.framemb, referralConfig.quizmb]
      : [referralConfig.quizmb, referralConfig.framemb];

  return (
    <MainContainer>
      <SectionListContainer className="space-y-10 md:space-y-20">
        <section className="space-y-6" aria-label="Let's work together">
          <ListPageHeader
            eyebrow={hero.eyebrow}
            title={hero.headline}
            description={hero.description}
          />
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href={NAV_LINKS.contact}>
                Work with me <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={WORK_URL}>View my work</Link>
            </Button>
          </div>
          <Typography variant="body-sm">
            Open to meaningful product work, professional collaborations, and
            full-time opportunities.
          </Typography>
          {product && (
            <figure className="border-border bg-card space-y-3 rounded-xl border p-5">
              <Image
                src={product.image}
                alt={product.imageAlt}
                sizes="(max-width: 768px) 100vw, 768px"
                className="mx-auto h-auto max-h-80 w-auto max-w-full rounded-lg object-contain"
                loading="eager"
              />
              <Typography as="figcaption" variant="caption" className="block">
                {product.imageCaption}
              </Typography>
            </figure>
          )}
        </section>

        {product && (
          <SectionContainer
            sectionLabel="Behind the product"
            sectionHeading={`What ${product.productName} demonstrates`}
            shouldAnimate={false}
          >
            <Typography variant="body-sm">{product.summary}</Typography>
            <div className="flex flex-wrap gap-2">
              {product.capabilities.map((capability) => (
                <Badge
                  key={capability}
                  variant="outline"
                  className="h-auto whitespace-normal"
                >
                  {capability}
                </Badge>
              ))}
            </div>
          </SectionContainer>
        )}

        <SectionContainer
          sectionLabel="From idea to product"
          sectionHeading="What I can help with"
          shouldAnimate={false}
        >
          <dl className="grid gap-6 md:grid-cols-2">
            {workCapabilities.map((capability) => (
              <div
                key={capability.title}
                className="border-border space-y-2 border-t pt-4"
              >
                <Typography as="dt" variant="h4">
                  {capability.title}
                </Typography>
                <Typography as="dd" variant="body-sm">
                  {capability.description}
                </Typography>
              </div>
            ))}
          </dl>
        </SectionContainer>

        <SectionContainer
          sectionLabel="Built with care"
          sectionHeading="Selected work"
          shouldAnimate={false}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ItemCard key={project.productName} href={project.href}>
                <ItemCard.Header>
                  <Typography variant="h4" as="h3">
                    {project.productName}
                  </Typography>
                  <ItemCard.Arrow />
                </ItemCard.Header>
                <Typography variant="body-sm">{project.summary}</Typography>
                <ItemCard.Topics
                  topics={[...project.capabilities.slice(0, 3)]}
                />
                <ItemCard.Footer>
                  <Typography variant="caption">{project.linkLabel}</Typography>
                </ItemCard.Footer>
              </ItemCard>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer
          sectionLabel="A practical approach"
          sectionHeading="How I work"
          shouldAnimate={false}
        >
          <ol className="space-y-6">
            {workProcess.map((step, index) => (
              <li key={step.title} className="flex items-start gap-4">
                <Typography
                  variant="caption-sm"
                  className="text-secondary pt-1"
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <div className="space-y-2">
                  <Typography variant="h4" as="h3">
                    {step.title}
                  </Typography>
                  <Typography variant="body-sm">{step.description}</Typography>
                </div>
              </li>
            ))}
          </ol>
        </SectionContainer>

        <SectionContainer
          sectionLabel="Let's talk"
          sectionHeading="Have an idea you want to turn into a product?"
          shouldAnimate={false}
        >
          <Typography variant="body-sm">
            Tell me what you&apos;re building and where you&apos;re stuck.
            I&apos;ll help you figure out the fastest practical path to a
            working product.
          </Typography>
          <Button asChild size="lg">
            <Link href={NAV_LINKS.contact}>
              Work with me <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </SectionContainer>
      </SectionListContainer>
    </MainContainer>
  );
}
