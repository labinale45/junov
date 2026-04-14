import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "C++ Best Practices",
  description:
    "C++ coding best practices for clean architecture, maintainability, and safer debugging habits in real projects.",
  path: "/course/cpp/best-practices",
  keywords: ["c++ best practices", "clean c++ code"],
});

export { default } from "@/components/course/pages/BestPractices";

