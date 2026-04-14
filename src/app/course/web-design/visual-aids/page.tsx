import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "Web Design Visual Aids",
  description:
    "Visual aids for web design topics including layout diagrams, responsive flow concepts, and frontend reference visuals.",
  path: "/course/web-design/visual-aids",
  keywords: ["web design visual aids", "frontend diagrams"],
});

export { default } from "@/components/course/pages/web-design/VisualAids";

