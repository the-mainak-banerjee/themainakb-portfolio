import { DocContent } from "@/components/global/doc-content";
import SectionListContainer from "@/components/global/section-list-container";
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
      <div className="[&>*+*:not(h2):not(h3)]:mt-6">
        <DocContent source={doc.content} />
      </div>
    </SectionListContainer>
  );
}

export default ComponentItemPage;
