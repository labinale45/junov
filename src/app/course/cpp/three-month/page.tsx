import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "C++ 3-Month Comprehensive",
  description:
    "Comprehensive three-month C++ curriculum with deeper concept coverage, assignments, and real-world coding projects.",
  path: "/course/cpp/three-month",
  keywords: ["c++ three month course", "comprehensive cpp"],
});

export { default } from "@/components/course/pages/ThreeMonthCourse";

