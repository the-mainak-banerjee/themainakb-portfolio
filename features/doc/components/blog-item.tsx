"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

export interface IBlogItemProps {
  slug: string;
  title: string;
  date: string; // ISO string
  variant?: "listing" | "compact";
  excerpt?: string;
  category?: string;
}

function BlogItem({
  slug,
  title,
  date,
  variant = "listing",
  excerpt,
  category,
}: IBlogItemProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group border-border active:bg-accent relative block border-t py-3.5 pl-4 no-underline last:border-b",
        "transition-colors duration-100",
      )}
    >
      <span
        className="bg-text-accent absolute top-4 left-0 h-4 w-0.75 scale-y-0 transition-transform duration-150 group-hover:scale-y-100 group-active:scale-y-100"
        aria-hidden="true"
      />

      <div className="flex items-baseline justify-between">
        <span className="text-foreground text-[15px] font-medium">{title}</span>
        <span className="text-muted-foreground ml-3 font-mono text-xs whitespace-nowrap">
          {formatDate(date)}
        </span>
      </div>

      {variant === "compact" && category && (
        <span className="text-muted-foreground text-[11px] tracking-wide uppercase">
          {category}
        </span>
      )}

      {variant === "listing" && excerpt && (
        <div
          className={cn(
            "grid grid-rows-[1fr] opacity-100",
            "[@media(hover:hover)_and_(pointer:fine)]:grid-rows-[0fr] [@media(hover:hover)_and_(pointer:fine)]:opacity-0",
            "[@media(hover:hover)_and_(pointer:fine)]:group-hover:grid-rows-[1fr] [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
            "[@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:opacity-100",
            "transition-[grid-template-rows,opacity] duration-200 ease-out",
          )}
        >
          <div className="overflow-hidden">
            <p className="text-muted-foreground mt-1 mb-1 flex items-center gap-2 text-[13px] leading-relaxed">
              <ArrowRight
                size={14}
                className={cn(
                  "hidden shrink-0",
                  "[@media(hover:hover)_and_(pointer:fine)]:inline-block [@media(hover:hover)_and_(pointer:fine)]:-translate-x-1 [@media(hover:hover)_and_(pointer:fine)]:opacity-0",
                  "[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
                  "transition-all duration-150",
                )}
              />
              {excerpt}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
}

export default BlogItem;
