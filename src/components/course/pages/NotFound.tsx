"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function CourseNotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404: attempted:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center px-4">
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Page not found</p>
        <Link href="/course" className="text-primary underline hover:text-primary/90">
          Back to courses
        </Link>
      </div>
    </div>
  );
}
