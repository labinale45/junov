import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "C++ Visual Aids",
  description:
    "C++ visual learning aids including diagrams, concept maps, and simplified references for faster understanding.",
  path: "/course/cpp/visual-aids",
  keywords: ["c++ visual aids", "cpp diagrams"],
});

export { default } from "@/components/course/pages/VisualAids";

