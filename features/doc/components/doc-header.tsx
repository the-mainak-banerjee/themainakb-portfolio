"use client";
import SectionContainer from "@/components/global/section-container";
import { ArrowLeft, ArrowRight, Share } from "lucide-react";
import React from "react";
import { ComponentDoc } from "../types/document";
import { CATEGORY_NAMES, getComponentNavigation } from "@/registry/config";
import { Typography } from "@/components/ui/typography";
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

export interface DocHeaderProps {
  categorySlug: ComponentDoc["categorySlug"];
  itemTitle: ComponentDoc["title"];
  itemName: ComponentDoc["name"];
  slug: string;
}

function DocHeader({
  categorySlug,
  itemTitle,
  itemName,
  slug,
}: DocHeaderProps) {
  const absoluteUrl = slug.startsWith("http")
    ? slug
    : typeof window !== "undefined"
      ? new URL(slug, window.location.origin).toString()
      : slug;
  const urlEncoded = encodeURIComponent(absoluteUrl);

  const category = CATEGORY_NAMES[categorySlug as keyof typeof CATEGORY_NAMES];

  const { previous, next } = getComponentNavigation(categorySlug, itemName);
  return (
    <SectionContainer>
      <div className="flex items-center justify-between">
        <Link
          href="/components"
          className={cn(
            "group flex items-center gap-2",
            "hover:text-foreground text-muted-foreground",
          )}
        >
          <ArrowLeft size={16} />
          <Typography variant="caption" className="group-hover:text-foreground">
            {category}
          </Typography>
        </Link>
        <div className="flex items-center gap-2">
          <ShareMenu title={itemTitle!} url={slug}>
            <ShareMenuTrigger className="bg-hover-fill-icon hover:bg-hover-fill-icon flex h-7 w-7 items-center justify-center rounded-md border-0">
              <Share size={16} />
            </ShareMenuTrigger>
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
          {previous && (
            <Link href={`/${categorySlug}/${previous.name}`}>
              <IconButton
                with_tooltip={true}
                label={`Previous ${category}`}
                allowHoverAnimation={false}
                className="bg-hover-fill-icon rounded-md"
              >
                <ArrowLeft size={16} />
              </IconButton>
            </Link>
          )}
          {next && (
            <Link href={`/${categorySlug}/${next.name}`}>
              <IconButton
                with_tooltip={true}
                label={`Next ${category}`}
                allowHoverAnimation={false}
                className="bg-hover-fill-icon rounded-md"
              >
                <ArrowRight size={16} />
              </IconButton>
            </Link>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}

export default DocHeader;
