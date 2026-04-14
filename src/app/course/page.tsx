import type { Metadata } from "next";
import { ContentSectionLayout } from "@/components/ContentSectionLayout";
import CourseCatalog from "@/components/course/pages/CourseCatalog";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Practical C++ and web design courses: structured tracks, projects, and practice — aligned with real-world skills.",
  keywords: ["coding courses", "c++ course", "web design course", "project based learning"],
  alternates: { canonical: `${siteUrl}/course` },
  openGraph: {
    title: "Courses | Rabin Ale",
    description:
      "Practical C++ and web design learning paths with concepts, projects, assignments, and roadmap-focused progression.",
    url: `${siteUrl}/course`,
    images: [
      {
        url: `${siteUrl}/course/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Courses - Rabin Ale",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Courses | Rabin Ale",
    description:
      "Practical C++ and web design learning paths with concepts, projects, assignments, and roadmap-focused progression.",
    images: [`${siteUrl}/course/opengraph-image`],
  },
};

export default function CourseCatalogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Course Catalog",
    itemListElement: [
      {
        "@type": "Course",
        position: 1,
        name: "C++ Programming Course",
        url: `${siteUrl}/course/cpp`,
        provider: { "@type": "Person", name: "Rabin Ale" },
      },
      {
        "@type": "Course",
        position: 2,
        name: "Web Design Course",
        url: `${siteUrl}/course/web-design`,
        provider: { "@type": "Person", name: "Rabin Ale" },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentSectionLayout>
        <CourseCatalog />
      </ContentSectionLayout>
    </>
  );
}
