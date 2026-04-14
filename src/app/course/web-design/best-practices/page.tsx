import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "Web Design Best Practices",
  description:
    "Web design best practices for clean structure, maintainable CSS, accessibility basics, and production-ready front-end habits.",
  path: "/course/web-design/best-practices",
  keywords: ["web design best practices", "frontend quality"],
});

export { default } from "@/components/course/pages/web-design/BestPractices";

