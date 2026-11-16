import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/thank-you"] }], sitemap: "https://www.deepautoelectricals.com/sitemap.xml" };
}
