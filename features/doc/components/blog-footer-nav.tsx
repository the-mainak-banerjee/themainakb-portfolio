"use client";

import { PrevNextItem } from "@/components/headers/details-page-header";
import BlogNavCard from "./blog-nav-card";

export interface BlogFooterNavProps {
  previous?: PrevNextItem;
  next?: PrevNextItem;
}

function BlogFooterNav({ previous, next }: BlogFooterNavProps) {
  if (!previous?.slug && !next?.slug) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {previous ? (
        <BlogNavCard
          direction="previous"
          slug={previous.slug!}
          title={previous.title!}
        />
      ) : (
        <div />
      )}
      {next ? (
        <BlogNavCard direction="next" slug={next.slug!} title={next.title!} />
      ) : (
        <div />
      )}
    </div>
  );
}

export default BlogFooterNav;
