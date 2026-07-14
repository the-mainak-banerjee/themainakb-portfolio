"use client";

import { Share, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/button_list";
import {
  ShareMenu,
  ShareMenuContent,
  ShareMenuCopy,
  ShareMenuItem,
  ShareMenuNative,
  ShareMenuTrigger,
} from "@/registry/components/share-menu";
import { Icon } from "@/components/global/icons/icon";
import { Typography } from "@/components/ui/typography";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NAV_LINKS } from "@/config/site";

export interface BlogPostNav {
  slug: string;
  title: string;
}

export interface IBlogHeaderProps {
  index?: string; // e.g. "04" — omit if you don't want the numbered rail
  category: string;
  title: string;
  authorName: string;
  authorInitials: string;
  publishDate: string; // ISO string, e.g. "2026-07-13"
  updatedDate?: string; // ISO string, only rendered if different from publishDate
  readingTime: string; // e.g. "7 min read"
  tags: string[];
  slug: string; // used for share URL, e.g. "/blog/my-post"
  previous?: BlogPostNav;
  next?: BlogPostNav;
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
  authorName,
  authorInitials,
  publishDate,
  updatedDate,
  readingTime,
  tags,
  slug,
  previous,
  next,
}: IBlogHeaderProps) {
  const absoluteUrl =
    typeof window !== "undefined"
      ? new URL(slug, window.location.origin).toString()
      : slug;
  const urlEncoded = encodeURIComponent(absoluteUrl);

  const showUpdated = updatedDate && updatedDate !== publishDate;

  return (
    <div className="border-border max-w-full border-b pb-10">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href={NAV_LINKS.blog}
          className={cn(
            "group flex items-center gap-1.5",
            "hover:text-foreground text-muted-foreground",
          )}
        >
          <ChevronLeft size={14} className="group-hover:text-foreground" />
          <span className="text-xs">blog</span>
        </Link>
        <div className="flex gap-2">
          {previous && (
            <Link href={`/blog/${previous.slug}`}>
              <IconButton
                with_tooltip
                label={`Previous: ${previous.title}`}
                allowHoverAnimation={false}
                allowTapAnimation
                className="bg-hover-fill-icon rounded-md"
              >
                <ChevronLeft size={16} />
              </IconButton>
            </Link>
          )}

          <ShareMenu title={title} url={slug}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ShareMenuTrigger className="bg-hover-fill-icon hover:bg-hover-fill-icon flex h-7 w-7 items-center justify-center rounded-md border-0">
                    <Share size={16} />
                  </ShareMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <Typography variant="caption" className="text-background">
                    Share this blog with your network!
                  </Typography>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ShareMenuContent align="end">
              <ShareMenuCopy />
              <ShareMenuItem
                icon={<Icon name="twitter" />}
                href={`https://x.com/intent/tweet?url=${urlEncoded}`}
              >
                Share on Twitter
              </ShareMenuItem>
              <ShareMenuItem
                icon={<Icon name="linkedin" />}
                href={`https://www.linkedin.com/sharing/share-offsite?url=${urlEncoded}`}
              >
                Share on Linkedin
              </ShareMenuItem>
              <ShareMenuNative icon={<Share />}>Share To</ShareMenuNative>
            </ShareMenuContent>
          </ShareMenu>

          {next && (
            <Link href={`/blog/${next.slug}`}>
              <IconButton
                with_tooltip
                label={`Next: ${next.title}`}
                allowHoverAnimation={false}
                allowTapAnimation
                className="bg-hover-fill-icon rounded-md"
              >
                <ChevronRight size={16} />
              </IconButton>
            </Link>
          )}
        </div>
      </div>

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

          <Typography
            variant="h1"
            className="my-3 text-3xl leading-tight font-medium text-balance"
          >
            {title}
          </Typography>

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
