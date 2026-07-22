import fs from "fs";
import path from "path";
import matter from "gray-matter";

const LABS_DIRECTORY = path.join(process.cwd(), "features/lab/previews");

export function getLabItemLearningBySlug(slug: string) {
  const filePath = path.join(LABS_DIRECTORY, slug, "learnings.mdx");
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data,
    content,
    slug,
  };
}
