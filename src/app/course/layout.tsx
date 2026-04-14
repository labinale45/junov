"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return <TooltipProvider delayDuration={0}>{children}</TooltipProvider>;
}
