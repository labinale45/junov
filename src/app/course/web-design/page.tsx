import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "Web Design Course",
  description:
    "Web design course overview with structured learning paths, practical builds, and foundational UI/UX development.",
  path: "/course/web-design",
  keywords: ["web design course", "html css course", "frontend basics"],
});

export { default } from "@/components/course/pages/web-design/Index";

