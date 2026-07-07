import { DocContent } from "@/components/global/doc-content";
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
    <div>
      <div>
        Header
        <div className="group/heading">Breadcrumb, Share, Next and Prev Button</div>
      </div>
      <div>
        Body
        <p>Preview tabs</p>
        <p>Installation</p>
        <p>Usage</p>
        <p>API References</p>
        <p>Refernces/Credits</p>
      </div>
      <DocContent source={doc.content} />
    </div>
  );
}

export default ComponentItemPage;
