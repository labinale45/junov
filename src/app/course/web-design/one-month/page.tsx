import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "Web Design 1-Month Fast-Track",
  description:
    "Fast-track one-month web design curriculum covering HTML, CSS, layout fundamentals, and practical front-end build tasks.",
  path: "/course/web-design/one-month",
  keywords: ["one month web design course", "fast-track web design"],
});

export { default } from "@/components/course/pages/web-design/OneMonthCourse";

