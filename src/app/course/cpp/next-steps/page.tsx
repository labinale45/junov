import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "C++ Next Steps",
  description:
    "Next-step roadmap after C++ fundamentals: advanced practice strategy, project progression, and career-focused learning path.",
  path: "/course/cpp/next-steps",
  keywords: ["c++ learning roadmap", "after learning c++"],
});

export { default } from "@/components/course/pages/NextSteps";

