import { DocContent } from "@/components/global/doc-content";
import { Reveal } from "@/components/global/reveal";
import SectionListContainer from "@/components/global/section-list-container";
import Prose from "@/components/ui/prose";
import { Typography } from "@/components/ui/typography";
import DocHeader from "@/features/doc/components/doc-header";
import { getComponentDoc } from "@/features/doc/data/documents";
import { notFound } from "next/navigation";
import React from "react";

async function ComponentItemPage({ params }: PageProps<"/components/[slug]">) {
  const slug = (await params).slug;

  const doc = getComponentDoc(slug);

  if (!doc) {
    notFound();
  }
  return (
    <SectionListContainer>
      <DocHeader
        categorySlug={doc.categorySlug}
        itemTitle={doc.title}
        itemName={doc.name}
        slug={`/components/${slug}`}
      />
      <Reveal className="space-y-10">
        <div>
          <Typography variant="h1" className="font-geist-sans">
            {doc.title}
          </Typography>
          <Typography variant="body-lg" className="text-muted-foreground">
            {doc.description}
          </Typography>
        </div>
        <Prose className="[&>*+*:not(h2):not(h3)]:mt-6">
          <DocContent source={doc.content} />
        </Prose>
      </Reveal>
    </SectionListContainer>
  );
}

export default ComponentItemPage;
