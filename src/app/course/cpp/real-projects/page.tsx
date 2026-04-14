import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "C++ Real-World Projects",
  description:
    "Applied C++ project cases that model real workflows, architecture decisions, and practical implementation patterns.",
  path: "/course/cpp/real-projects",
  keywords: ["c++ real projects", "cpp case studies"],
});

export { default } from "@/components/course/pages/RealWorldProjects";

