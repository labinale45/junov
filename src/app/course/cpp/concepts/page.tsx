import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "C++ Core Concepts",
  description:
    "Core C++ concepts explained with examples: variables, control flow, OOP principles, and file handling basics.",
  path: "/course/cpp/concepts",
  keywords: ["c++ concepts", "learn c++ basics"],
});

export { default } from "@/components/course/pages/CoreConcepts";

