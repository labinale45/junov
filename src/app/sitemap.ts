import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog/posts";
import { projects } from "@/content/projects/cases";
import { TOOLS } from "@/lib/tools-registry";
import { GAMES } from "@/lib/games-registry";
import { COMPRESSOR_PRESETS } from "@/lib/compressor-presets";
import { CONVERTER_PAIRS } from "@/lib/converter-pairs";

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
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/gta-6`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.92 },
    { url: `${siteUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/games`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const gameRoutes: MetadataRoute.Sitemap = GAMES.map((game) => ({
    url: `${siteUrl}/games/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const compressorPresetRoutes: MetadataRoute.Sitemap = COMPRESSOR_PRESETS.map((preset) => ({
    url: `${siteUrl}/tools/image-compressor/${preset.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const converterPairRoutes: MetadataRoute.Sitemap = CONVERTER_PAIRS.map((pair) => ({
    url: `${siteUrl}/tools/image-converter/${pair.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

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

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...gameRoutes,
    ...compressorPresetRoutes,
    ...converterPairRoutes,
    ...courseRoutes,
    ...blogRoutes,
    ...projectRoutes,
  ];
}
