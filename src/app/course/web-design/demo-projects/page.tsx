import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "Web Design Demo Projects",
  description:
    "Guided web design demo projects to practice layout building, styling patterns, and hands-on front-end workflow.",
  path: "/course/web-design/demo-projects",
  keywords: ["web design demo projects", "frontend practice projects"],
});

export { default } from "@/components/course/pages/web-design/DemoProjects";

