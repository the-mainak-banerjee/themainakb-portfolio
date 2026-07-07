import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { Typography } from "../ui/typography";
import ComponentPreview from "./component-preview";

const mdxComponents: MDXRemoteProps["components"] = {
  h1: (props: React.ComponentProps<"h1">) => (
    <Typography variant="h1" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <Typography variant="h2" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <Typography variant="h3" {...props} />
  ),
  h4: (props: React.ComponentProps<"h4">) => (
    <Typography variant="h4" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <Typography variant="body" {...props} />
  ),
  ComponentPreview,
};

export function DocContent({ source }: { source: string }) {
  const options: MDXRemoteProps["options"] = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  };
  return (
    <MDXRemote source={source} components={mdxComponents} options={options} />
  );
}
