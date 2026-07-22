"use client";
import { ChevronLeft, ChevronRight, Share } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";

export interface PrevNextItem {
  slug?: string;
  title?: string;
}

export interface DetailsPageHeaderProps {
  categorySlug: string;
  itemTitle: string;
  slug: string;
  category: string;
  previous?: PrevNextItem;
  next?: PrevNextItem;
}

function DetailsPageHeader({
  categorySlug,
  itemTitle,
  slug,
  category,
  previous,
  next,
}: DetailsPageHeaderProps) {
  const absoluteUrl = slug.startsWith("http")
    ? slug
    : typeof window !== "undefined"
      ? new URL(`${categorySlug}/${slug}`, window.location.origin).toString()
      : slug;
  const urlEncoded = encodeURIComponent(absoluteUrl);

  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/${categorySlug}`}
        className={cn(
          "group flex items-center gap-1.5",
          "hover:text-foreground text-muted-foreground",
        )}
      >
        <ChevronLeft size={14} className="group-hover:text-foreground" />
        <span className="text-xs">{category.toLowerCase()}</span>
      </Link>

      <div className="flex items-center gap-2">
        {previous?.slug && (
          <Link href={`/${categorySlug}/${previous.slug}`}>
            <IconButton
              with_tooltip={true}
              label={`Previous: ${previous.title}`}
              allowHoverAnimation={false}
              allowTapAnimation={true}
              className="bg-hover-fill-icon rounded-md"
            >
              <ChevronLeft size={16} />
            </IconButton>
          </Link>
        )}
        <ShareMenu title={itemTitle!} url={`${categorySlug}/${slug}`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ShareMenuTrigger className="bg-hover-fill-icon hover:bg-hover-fill-icon flex h-7 w-7 items-center justify-center rounded-md border-0">
                  <Share size={16} />
                </ShareMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <Typography variant="caption" className="text-background">
                  Share with your network!
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
        {next?.slug && (
          <Link href={`/${categorySlug}/${next.slug}`}>
            <IconButton
              with_tooltip={true}
              label={`Next: ${next.title}`}
              allowHoverAnimation={false}
              allowTapAnimation={true}
              className="bg-hover-fill-icon rounded-md"
            >
              <ChevronRight size={16} />
            </IconButton>
          </Link>
        )}
      </div>
    </div>
  );
}

export default DetailsPageHeader;
