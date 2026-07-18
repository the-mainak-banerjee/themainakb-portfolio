import { DocContainer } from "@/components/global/containers";
import { DocContent } from "@/components/global/doc-content";
import ProgressIndicator from "@/components/global/progress-indicator";
import SectionListContainer from "@/components/global/section-list-container";
import TocInline from "@/components/global/toc-inline";
import TocSidebar from "@/components/global/toc-sidebar";
import Prose from "@/components/ui/prose";
import { NAV_LINKS } from "@/config/site";
import BlogFooterNav from "@/features/doc/components/blog-footer-nav";
import BlogHeader from "@/features/doc/components/blog-header";
import { getAdjacentPosts, getAllBlogPosts, getBlogPostBySlug } from "@/features/doc/data/blogs";
import { notFound } from "next/navigation";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const blogs = getAllBlogPosts();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

async function BlogContentPage({ params }: PageProps<"/components/[slug]">) {
  const slug = (await params).slug;

  const doc = getBlogPostBySlug(slug);
  const { previous, next } = getAdjacentPosts(slug);

  if (!doc) {
    notFound();
  }
  return (
    <DocContainer>
      <aside className="max-lg:hidden"></aside>
      <SectionListContainer className="mx-auto w-full md:max-w-3xl">
        <BlogHeader
          category={doc.data.category}
          title={doc.data.title}
          authorName="Mainak"
          authorInitials="MB"
          publishDate={doc.data.createdAt}
          updatedDate={doc.data.updatedAt}
          readingTime={doc.readingTime}
          tags={doc.data.tags}
          slug={`/${NAV_LINKS.blog}/${slug}`}
          previous={previous}
          next={next}
        />
        <TocInline content={doc.content} />
        <ProgressIndicator className="border-border border-b pb-10">
          <Prose className="[&>*+*:not(h2):not(h3)]:mt-6">
            <DocContent source={doc.content} />
          </Prose>
        </ProgressIndicator>
        {(next || previous) && (
          <BlogFooterNav previous={previous} next={next} />
        )}
      </SectionListContainer>
      <aside className="relative max-lg:hidden">
        <TocSidebar content={doc.content} />
      </aside>
    </DocContainer>
  );
}

export default BlogContentPage;
