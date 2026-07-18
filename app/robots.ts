import { isProd, SITE_URL } from "@/config/site";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProduction = isProd();

  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : "",
      disallow: isProduction ? [] : "/",
    },
    sitemap: isProduction ? `${SITE_URL}/sitemap.xml` : undefined,
  };
}
