import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "Web Design Real-World Projects",
  description:
    "Real-world web design project cases with implementation choices, structure decisions, and practical front-end outputs.",
  path: "/course/web-design/real-projects",
  keywords: ["real web design projects", "web project case study"],
});

export { default } from "@/components/course/pages/web-design/RealWorldProjects";

