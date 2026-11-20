import type { MetadataRoute } from "next";
import { categories, jobs } from "@/lib/company";

const base = "https://www.deepautoelectricals.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "about", "how-we-work", "products", "infrastructure", "quality", "customers", "locations", "life-at-daepl", "careers", "rfq", "contact", "privacy", "terms"];
  return [
    ...pages.map((p) => ({ url: `${base}/${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...categories.flatMap((c) => [{ url: `${base}/products/${c.slug}`, priority: 0.8 }, ...c.products.map((p) => ({ url: `${base}/products/${c.slug}/${p.slug}`, priority: 0.6 }))]),
    ...jobs.map((j) => ({ url: `${base}/careers/${j.slug}`, priority: 0.5 })),
  ];
}
