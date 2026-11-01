import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/blog`, changeFrequency: "weekly" },
    ...getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
