import { DocContainer } from "@/components/global/containers";
import { DocContent } from "@/components/global/doc-content";
import SectionListContainer from "@/components/global/section-list-container";
import DetailsPageHeader from "@/components/headers/details-page-header";
import Prose from "@/components/ui/prose";
import { LabDetailLayout } from "@/features/lab/components/lab-details-layout";
import {
  getLabsItemBySlug,
} from "@/features/lab/data/labs-data";
import { getLabItemLearningBySlug } from "@/features/lab/data/labs-learning";
import { notFound } from "next/navigation";
import React from "react";

async function LabsItemPage({ params }: PageProps<"/labs/[slug]">) {
  const slug = (await params).slug;
  const labItem = getLabsItemBySlug(slug);
  const learning = getLabItemLearningBySlug(slug);

  if (!labItem) {
    return notFound();
  }

  return (
    <DocContainer>
      <aside className="max-lg:hidden"></aside>
      <SectionListContainer
        className="mx-auto w-full md:max-w-3xl"
        as="article"
      >
        <DetailsPageHeader
          category="Labs"
          categorySlug="labs"
          itemTitle={labItem.title!}
          //   next={{
          //     slug: next?.name,
          //     title: next?.title,
          //   }}
          //   previous={{
          //     slug: previous?.name,
          //     title: previous?.title,
          //   }}
          slug={slug}
        />
        <LabDetailLayout lab={labItem} />
        {learning?.content && (
          <Prose className="[&>*+*:not(h2):not(h3)]:mt-6">
            <DocContent source={learning?.content} />
          </Prose>
        )}
      </SectionListContainer>
    </DocContainer>
  );
}

export default LabsItemPage;
