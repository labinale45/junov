import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "C++ Assignments and MCQs",
  description:
    "Practice-focused C++ assignments and MCQs to reinforce core concepts and prepare for practical coding tasks.",
  path: "/course/cpp/assignments",
  keywords: ["c++ assignments", "cpp mcq"],
});

export { default } from "@/components/course/pages/Assignments";

