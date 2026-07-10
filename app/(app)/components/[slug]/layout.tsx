import SectionListContainer from "@/components/global/section-list-container";
import DocHeader from "@/features/doc/components/doc-header";
import { getComponentDoc } from "@/features/doc/data/documents";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: LayoutProps<"/components/[slug]">) {
  const { slug } = await params;
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
      {children}
    </SectionListContainer>
  );
}
