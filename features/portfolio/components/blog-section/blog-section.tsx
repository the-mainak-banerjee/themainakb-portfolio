import BlogItem from "@/features/doc/components/blog-item";
import SectionContainer from "@/components/global/section-container";
import { getAllBlogPosts } from "@/features/doc/data/blogs";
import { NAV_LINKS } from "@/config/site";


function BlogSection() {
    const posts = getAllBlogPosts().slice(0,3)

  return (
    <SectionContainer
      sectionHeading="Blogs"
      sectionLabel="Journal"
      action={{ label: "View all blogs", href: NAV_LINKS.blog }}
    >
      <div>
        {posts.map((post) => (
          <BlogItem
            key={post.slug}
            slug={post.slug}
            title={post.title}
            date={post.createdAt}
            category={post.category}
            variant="compact"
          />
        ))}
      </div>
    </SectionContainer>
  );
}

export default BlogSection;
