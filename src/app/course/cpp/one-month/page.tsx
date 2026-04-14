import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "C++ 1-Month Fast-Track",
  description:
    "Accelerated one-month C++ learning plan covering fundamentals, OOP, and project-based practice.",
  path: "/course/cpp/one-month",
  keywords: ["c++ one month course", "fast-track cpp"],
});

export { default } from "@/components/course/pages/OneMonthCourse";

