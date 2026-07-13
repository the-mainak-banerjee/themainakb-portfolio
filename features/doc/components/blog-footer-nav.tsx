"use client";

import { BlogPostNav } from "./blog-header";
import BlogNavCard from "./blog-nav-card";

export interface BlogFooterNavProps {
  previous?: BlogPostNav;
  next?: BlogPostNav;
}

function BlogFooterNav({ previous, next }: BlogFooterNavProps) {
  if (!previous && !next) return null;

  return (
    <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {previous ? (
        <BlogNavCard
          direction="previous"
          slug={previous.slug}
          title={previous.title}
        />
      ) : (
        <div />
      )}
      {next ? (
        <BlogNavCard direction="next" slug={next.slug} title={next.title} />
      ) : (
        <div />
      )}
    </div>
  );
}

export default BlogFooterNav;
