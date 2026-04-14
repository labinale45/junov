import type { Metadata } from "next";
import { createCourseMetadata } from "@/lib/course-seo";

export const metadata: Metadata = createCourseMetadata({
  title: "Web Design Next Steps",
  description:
    "Web design next-step roadmap covering advanced practice, project polish, and progression toward professional frontend work.",
  path: "/course/web-design/next-steps",
  keywords: ["next steps web design", "frontend learning roadmap"],
});

export { default } from "@/components/course/pages/web-design/NextSteps";

