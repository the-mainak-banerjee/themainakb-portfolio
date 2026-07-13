import { DocContainer } from "@/components/global/containers";
import { DocContent } from "@/components/global/doc-content";
import SectionListContainer from "@/components/global/section-list-container";
import TocSidebar from "@/components/global/toc-sidebar";
import Prose from "@/components/ui/prose";
import { Typography } from "@/components/ui/typography";
import DocHeader from "@/features/doc/components/doc-header";
import { getComponentDoc } from "@/features/doc/data/documents";
import { notFound } from "next/navigation";

async function ComponentItemPage({ params }: PageProps<"/components/[slug]">) {
  const slug = (await params).slug;

  const doc = getComponentDoc(slug);

  if (!doc) {
    notFound();
  }
  return (
    <DocContainer>
      <aside className="max-lg:hidden"></aside>
      <SectionListContainer className="mx-auto w-full md:max-w-3xl">
        <DocHeader
          categorySlug={doc.categorySlug}
          itemTitle={doc.title}
          itemName={doc.name}
          slug={`/components/${slug}`}
        />
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
      </SectionListContainer>
      <aside className="max-lg:hidden relative">
        <TocSidebar content={doc.content} />
      </aside>
    </DocContainer>
  );
}

export default ComponentItemPage;
