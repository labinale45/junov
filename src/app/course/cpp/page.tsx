import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "C++ Programming Course",
  description:
    "C++ course overview with structured plans, core concepts, projects, and practice for beginners to intermediate learners.",
  path: "/course/cpp",
  keywords: ["c++ course", "cpp tutorial", "oop in c++"],
});

export { default } from "@/components/course/pages/Index";

