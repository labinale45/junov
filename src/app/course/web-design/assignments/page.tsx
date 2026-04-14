import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "Web Design Assignments and MCQs",
  description:
    "Web design assignments and MCQs designed to test understanding of HTML, CSS, structure, and practical UI implementation.",
  path: "/course/web-design/assignments",
  keywords: ["web design assignments", "html css mcq"],
});

export { default } from "@/components/course/pages/web-design/Assignments";

