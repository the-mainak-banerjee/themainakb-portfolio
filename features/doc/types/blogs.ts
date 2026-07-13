export interface BlogFrontmatter {
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
}

export type BlogPostDoc = {
  content: string;
  data: BlogFrontmatter;
  readingTime: string
};

export interface BlogPostSummary extends BlogFrontmatter {
  slug: string;
  readingTime: string;
}
