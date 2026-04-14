import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "Web Design 3-Month Comprehensive",
  description:
    "Comprehensive three-month web design path with deeper UI structure, responsive practice, and portfolio-ready project output.",
  path: "/course/web-design/three-month",
  keywords: ["three month web design course", "comprehensive web design"],
});

export { default } from "@/components/course/pages/web-design/ThreeMonthCourse";

