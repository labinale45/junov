import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "C++ Demo Projects",
  description:
    "Step-by-step C++ demo projects to apply object-oriented design, file handling, and practical problem solving.",
  path: "/course/cpp/demo-projects",
  keywords: ["c++ demo projects", "cpp practice projects"],
});

export { default } from "@/components/course/pages/DemoProjects";

