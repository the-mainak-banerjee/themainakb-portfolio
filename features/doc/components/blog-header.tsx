"use client";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";

export interface IBlogHeaderProps {
  index?: string; // e.g. "04" — omit if you don't want the numbered rail
  category: string;
  title: string;
  description: string;
  authorName: string;
  authorInitials: string;
  publishDate: string; // ISO string, e.g. "2026-07-13"
  updatedDate?: string; // ISO string, only rendered if different from publishDate
  readingTime: string; // e.g. "7 min read"
  tags: string[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BlogHeader({
  index,
  category,
  title,
  description,
  authorName,
  authorInitials,
  publishDate,
  updatedDate,
  readingTime,
  tags,
}: IBlogHeaderProps) {
  const showUpdated = updatedDate && updatedDate !== publishDate;

  return (
    <div className="border-border max-w-full border-b pb-10">
      <div className="flex gap-6">
        {index && (
          <div className="flex flex-col items-center gap-2.5 pt-1.5">
            <span className="text-muted-foreground font-mono text-[11px]">
              {index}
            </span>
            <div className="bg-border w-px flex-1" />
          </div>
        )}

        <div className="flex-1">
          <span className="text-text-accent font-mono text-xs tracking-wide uppercase">
            {category}
          </span>

          <div className="my-3">
            <Typography
              variant="h1"
              className="mb-1 text-3xl leading-tight font-medium text-balance"
            >
              {title}
            </Typography>
            <Typography variant="body-sm">{description}</Typography>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <div className="bg-secondary text-secondary-foreground flex h-6.5 w-6.5 items-center justify-center rounded-full text-[11px] font-medium">
              {authorInitials}
            </div>
            <Typography variant="caption">{authorName}</Typography>
            <span className="text-muted-foreground/50 text-sm">·</span>
            <Typography
              variant="caption"
              className="text-muted-foreground text-sm"
            >
              {formatDate(publishDate)}
            </Typography>

            {showUpdated && (
              <>
                <span className="text-muted-foreground/50 text-sm">·</span>
                <Typography
                  variant="caption"
                  className="text-muted-foreground text-sm"
                >
                  Updated {formatDate(updatedDate!)}
                </Typography>
              </>
            )}
            <span className="text-muted-foreground/50 text-sm">·</span>
            <Typography
              variant="caption"
              className="text-muted-foreground text-sm"
            >
              {readingTime}
            </Typography>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link key={tag} href={`/blog/tags/${tag}`}>
                  <span className="bg-accent text-accent-foreground hover:bg-secondary rounded-md px-2.5 py-1 text-xs transition-colors">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogHeader;
