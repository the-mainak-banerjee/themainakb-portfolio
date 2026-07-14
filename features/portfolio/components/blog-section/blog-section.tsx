import BlogItem from "@/features/doc/components/blog-item";
import SectionContainer from "@/components/global/section-container";
import { getAllBlogPosts } from "@/features/doc/data/blogs";


function HomeBlogSection() {
    const posts = getAllBlogPosts().slice(0,3)

  return (
    <SectionContainer
      sectionHeading="From the blog"
      sectionLabel="writing"
      action={{ label: "View all blogs", href: "/blog" }}
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

export default HomeBlogSection;
