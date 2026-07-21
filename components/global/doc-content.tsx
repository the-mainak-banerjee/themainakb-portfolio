import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import { Typography } from "../ui/typography";
import { TabsContent } from "../ui/tabs";
import ComponentPreview from "./component-preview";
import {
  InstallTabs,
  InstallTabsListType,
} from "../../features/doc/components/install-tabs";
import {
  ComponentCliCommand,
  UniversalPackageManagerCommand,
} from "../../features/doc/components/component-cli-command";
import { ComponentSourceCode } from "../../features/doc/components/component-source-code";
import { Steps, Step } from "../../features/doc/components/steps";
import { Pre } from "../../features/doc/components/pre";
import { AutoTypeTable } from "../../features/doc/components/auto-type-table";
import Image from "next/image";

const mdxComponents: MDXRemoteProps["components"] = {
  h1: (props: React.ComponentProps<"h1">) => (
    <Typography variant="h1" {...props} className="font-geist-sans" />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <Typography
      variant="h2"
      {...props}
      className="font-geist-sans mt-10 mb-6"
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <Typography
      variant="h3"
      {...props}
      className="font-geist-sans mt-10 mb-6"
    />
  ),
  h4: (props: React.ComponentProps<"h4">) => (
    <Typography variant="h4" {...props} className="font-geist-sans" />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <Typography variant="body" allowProse={true} {...props} />
  ),
  img: (props: React.ComponentProps<"img">) => (
    <Image
      src={(props.src as string) ?? ""}
      width={800}
      height={450}
      className="rounded-lg"
      alt={props.alt ?? ""}
    />
  ),
  pre: Pre,
  ComponentPreview,
  InstallTabs,
  InstallTabsListType,
  TabsContent,
  ComponentCliCommand,
  UniversalPackageManagerCommand,
  ComponentSourceCode,
  Steps,
  Step,
  AutoTypeTable,
};

export function DocContent({ source }: { source: string }) {
  const options: MDXRemoteProps["options"] = {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeExternalLinks, { target: "_blank", rel: "nofollow noopener" }],
      ],
    },
  };
  return (
    <MDXRemote source={source} components={mdxComponents} options={options} />
  );
}
