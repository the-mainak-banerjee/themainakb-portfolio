import { MetadataRoute } from "next";
import { REGISTRY_TYPE_SLUGS, getRegistryItemByRegistryType } from "@/registry/config";
import { MOBILE_NAV, NAV_LINKS, SITE_URL } from "@/config/site";
import { getAllBlogPosts } from "@/features/doc/data/blogs";

export const revalidate = false;
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const components = getRegistryItemByRegistryType(REGISTRY_TYPE_SLUGS.components).map(
    (component) => {
      return {
        url: `${SITE_URL}${NAV_LINKS.components}/${component.name}`,
        lastModified: new Date().toISOString(),
      };
    },
  );

  const blogs = getAllBlogPosts().map((blog) => {
    return {
      url: `${SITE_URL}${NAV_LINKS.blog}/${blog.slug}`,
      lastModified: new Date(blog.updatedAt!).toISOString(),
    };
  });

  const routes = MOBILE_NAV.map((item) => {
    return {
      url: `${SITE_URL}${item.href}`,
      lastModified: new Date().toISOString(),
    };
  });

  return [...routes, ...blogs, ...components];
}
