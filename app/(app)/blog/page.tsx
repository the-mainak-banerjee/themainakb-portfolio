import { MainContainer } from "@/components/global/containers";
import ListPageHeader from "@/components/global/list-page-header";
import SectionListContainer from "@/components/global/section-list-container";
import { NAV_LINKS } from "@/config/site";
import BlogListing from "@/features/doc/components/blog-listing-page";
import { getAllBlogPosts } from "@/features/doc/data/blogs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Documenting what I learn, as I learn it.",
  alternates: {
    canonical: `${NAV_LINKS.blog}`
  }
};

function BlogPage() {
  const blogs = getAllBlogPosts()
  return (
    <MainContainer>
      <SectionListContainer>
        <ListPageHeader
          eyebrow="writing"
          title="Notes on design and code"
          description="Documenting what I learn, as I learn it. Not expert advice, just notes that might help along the way."
          count={blogs.length}
        />
        <BlogListing posts={blogs} />
      </SectionListContainer>
    </MainContainer>
  );
}

export default BlogPage;
