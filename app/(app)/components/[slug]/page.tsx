import { DocContainer } from "@/components/global/containers";
import { DocContent } from "@/components/global/doc-content";
import SectionListContainer from "@/components/global/section-list-container";
import TocInline from "@/components/global/toc-inline";
import TocSidebar from "@/components/global/toc-sidebar";
import Prose from "@/components/ui/prose";
import { Typography } from "@/components/ui/typography";
import { NAV_LINKS } from "@/config/site";
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
          slug={`/${NAV_LINKS.components}/${slug}`}
        />
        <div>
          <Typography variant="h1" className="font-geist-sans">
            {doc.title}
          </Typography>
          <Typography variant="body-lg" className="text-muted-foreground">
            {doc.description}
          </Typography>
        </div>
        <TocInline content={doc.content} />
        <Prose className="[&>*+*:not(h2):not(h3)]:mt-6">
          <DocContent source={doc.content} />
        </Prose>
      </SectionListContainer>
      <aside className="relative max-lg:hidden">
        <TocSidebar content={doc.content} />
      </aside>
    </DocContainer>
  );
}

export default ComponentItemPage;
