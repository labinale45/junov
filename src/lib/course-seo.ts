import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

type CourseSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createCourseMetadata({
  title,
  description,
  path,
  keywords = [],
}: CourseSeoInput): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} | Rabin Ale`;

  return {
    title,
    description,
    keywords: [
      "programming course",
      "online learning",
      "web development course",
      "cpp course",
      "course notes",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: { index: true, follow: true },
  };
}
