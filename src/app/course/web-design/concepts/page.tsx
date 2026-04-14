import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "Web Design Core Concepts",
  description:
    "Core web design concepts with practical explanations of HTML structure, CSS fundamentals, and responsive layout thinking.",
  path: "/course/web-design/concepts",
  keywords: ["web design concepts", "html css fundamentals"],
});

export { default } from "@/components/course/pages/web-design/CoreConcepts";

