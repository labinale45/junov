import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog/posts";
import { projects } from "@/content/projects/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rabinale.com.np";

  const coursePaths = [
    "/course",
    "/course/cpp",
    "/course/cpp/one-month",
    "/course/cpp/three-month",
    "/course/cpp/concepts",
    "/course/cpp/demo-projects",
    "/course/cpp/real-projects",
    "/course/cpp/visual-aids",
    "/course/cpp/assignments",
    "/course/cpp/best-practices",
    "/course/cpp/next-steps",
    "/course/web-design",
    "/course/web-design/one-month",
    "/course/web-design/three-month",
    "/course/web-design/concepts",
    "/course/web-design/demo-projects",
    "/course/web-design/real-projects",
    "/course/web-design/visual-aids",
    "/course/web-design/assignments",
    "/course/web-design/best-practices",
    "/course/web-design/next-steps",
  ];

  const courseRoutes: MetadataRoute.Sitemap = coursePaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/course" ? 0.82 : 0.72,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/tools/json-formatter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...projectRoutes];
}
