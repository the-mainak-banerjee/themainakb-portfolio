"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import BlogItem from "./blog-item";
import { BlogPostSummary } from "../types/blogs";

export interface IBlogListingProps {
  posts: BlogPostSummary[];
}

function groupByYear(posts: BlogPostSummary[]) {
  const groups = new Map<string, BlogPostSummary[]>();
  for (const post of posts) {
    const year = new Date(post.createdAt).getFullYear().toString();
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }
  return Array.from(groups.entries());
}

function BlogListing({ posts }: IBlogListingProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(),
    [posts],
  );

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery =
        query.trim() === "" ||
        post.title.toLowerCase().includes(query.toLowerCase());
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  const grouped = useMemo(() => groupByYear(filtered), [filtered]);

  return (
    <div className="mx-auto">
      <div className="mb-10 hidden items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts"
            className="border-border bg-background w-full rounded-md border py-2 pr-3 pl-9 text-sm outline-none"
          />
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="mb-10 hidden flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setActiveTag((current) => (current === tag ? null : tag))
              }
              className={cn(
                "rounded-md px-2.5 py-1 text-xs transition-colors",
                activeTag === tag
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {grouped.length > 0 && (
        <div className="space-y-6 md:space-y-10">
          {grouped.map(([year, yearPosts]) => (
            <div key={year} className="relative space-y-4">
              <div className="flex flex-col gap-1 py-2">
                <div className="flex items-end gap-1">
                  <Typography variant="h2">{year}</Typography>
                  <span className="text-text-accent pb-1 font-mono text-xs tracking-wide uppercase">
                    ({yearPosts.length} Posts)
                  </span>
                </div>
                <div className="bg-text-accent h-0.75 w-6 rounded-full" />
              </div>
              <div>
                {yearPosts.map((post) => (
                  <BlogItem
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    date={post.createdAt}
                    excerpt={post.excerpt}
                    variant="listing"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-muted-foreground py-8 text-sm">
          No posts match your search.
        </p>
      )}
    </div>
  );
}

export default BlogListing;
