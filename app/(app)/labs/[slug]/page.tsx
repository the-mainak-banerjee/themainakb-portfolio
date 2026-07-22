import { DocContainer } from "@/components/global/containers";
import { DocContent } from "@/components/global/doc-content";
import SectionListContainer from "@/components/global/section-list-container";
import TocInline from "@/components/global/toc-inline";
import TocSidebar from "@/components/global/toc-sidebar";
import DetailsPageHeader from "@/components/headers/details-page-header";
import Prose from "@/components/ui/prose";
import { NAV_LINK_KEYS, NAV_LINKS } from "@/config/site";
import { LabDetailLayout } from "@/features/lab/components/lab-details-layout";
import {
  getAdjacentItem,
  getAllLabsItem,
  getLabsItemBySlug,
} from "@/features/lab/data/labs-data";
import { getLabItemLearningBySlug } from "@/features/lab/data/labs-learning";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const labs = getAllLabsItem();
  return labs.map((lab) => ({ slug: lab.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const slug = (await params).slug;
  const labItem = getLabsItemBySlug(slug);

  if (!labItem) {
    return notFound();
  }

  return {
    title: labItem.title,
    description: labItem.description,
    alternates: {
      canonical: `${NAV_LINKS.labs}/${slug}`,
    },
  };
}

async function LabsItemPage({ params }: PageProps<"/labs/[slug]">) {
  const slug = (await params).slug;
  const labItem = getLabsItemBySlug(slug);
  const learning = getLabItemLearningBySlug(slug);

  if (!labItem) {
    return notFound();
  }

  const { next, previous } = getAdjacentItem(slug);

  return (
    <DocContainer>
      <aside className="max-lg:hidden"></aside>
      <SectionListContainer
        className="mx-auto w-full md:max-w-3xl"
        as="article"
      >
        <DetailsPageHeader
          category="Labs"
          categorySlug={NAV_LINK_KEYS.labs}
          itemTitle={labItem.title!}
          slug={slug}
          next={{
            slug: next?.slug,
            title: next?.title,
          }}
          previous={{
            slug: previous?.slug,
            title: previous?.title,
          }}
        />
        <LabDetailLayout lab={labItem} />
        {learning?.content && <TocInline content={learning.content} />}
        {learning?.content && (
          <Prose className="[&>*+*:not(h2):not(h3)]:mt-6">
            <DocContent source={learning?.content} />
          </Prose>
        )}
      </SectionListContainer>
      {learning?.content && (
        <aside className="relative max-lg:hidden">
          <TocSidebar content={learning?.content} />
        </aside>
      )}
    </DocContainer>
  );
}

export default LabsItemPage;
