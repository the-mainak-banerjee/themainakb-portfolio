import { DocContent } from "@/components/global/doc-content";
import Prose from "@/components/ui/prose";
import { Typography } from "@/components/ui/typography";
import { getComponentDoc } from "@/features/doc/data/documents";
import { notFound } from "next/navigation";

async function ComponentItemPage({ params }: PageProps<"/components/[slug]">) {
  const slug = (await params).slug;

  const doc = getComponentDoc(slug);

  if (!doc) {
    notFound();
  }
  return (
    <>
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
    </>
  );
}

export default ComponentItemPage;
