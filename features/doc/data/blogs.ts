import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogFrontmatter, BlogPostDoc, BlogPostSummary } from "../types/blogs";

const BLOG_DIR = path.join(process.cwd(), "features/doc/content/blogs");

export function getAllBlogPosts(): BlogPostSummary[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
      const { data, content } = matter(raw);
      const slug = f.replace(/\.mdx$/, "");

      return {
        ...(data as BlogFrontmatter),
        slug,
        readingTime: getReadingTime(content),
      };
    })
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export function getReadingTime(content: string, wordsPerMinute = 200): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / wordsPerMinute));
  return `${minutes} min read`;
}

export function getBlogPostBySlug(slug: string): BlogPostDoc {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    content,
    data: data as BlogFrontmatter,
    readingTime: getReadingTime(content),
  };
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllBlogPosts();

  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : undefined,
    next: index > 0 ? posts[index - 1] : undefined,
  };
}

export function getPostsByTag(tag: string): BlogPostSummary[] {
  return getAllBlogPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export function getAllTags(): string[] {
  const posts = getAllBlogPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}