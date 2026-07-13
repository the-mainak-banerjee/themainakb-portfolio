"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

export interface BlogNavCardProps {
  direction: "previous" | "next";
  slug: string;
  title: string;
}

function BlogNavCard({ direction, slug, title }: BlogNavCardProps) {
  const isPrevious = direction === "previous";
  const Icon = isPrevious ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group border-border rounded-xl border p-5",
        "hover:border-foreground/20 transition-colors ease-out hover:bg-accent active:bg-transparent",
        !isPrevious && "text-right",
      )}
    >
      <div
        className={cn(
          "text-muted-foreground mb-2.5 flex items-center gap-1.5",
          !isPrevious && "justify-end",
        )}
      >
        {isPrevious && (
          <Icon
            size={14}
            className="group-hover:text-foreground transition-colors"
          />
        )}
        <span className="text-xs tracking-wide uppercase">{direction}</span>
        {!isPrevious && (
          <Icon
            size={14}
            className="group-hover:text-foreground transition-colors"
          />
        )}
      </div>
      <Typography variant="body-sm" className="group-hover:text-foreground">
        {title}
      </Typography>
    </Link>
  );
}

export default BlogNavCard;
