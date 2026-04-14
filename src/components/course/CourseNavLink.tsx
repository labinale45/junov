"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CourseNavLinkProps extends React.ComponentProps<typeof Link> {
  activeClassName?: string;
  pendingClassName?: string;
  end?: boolean;
}

/** Next.js NavLink compatible with blueprint sidebar (active state by pathname). */
export const CourseNavLink = forwardRef<HTMLAnchorElement, CourseNavLinkProps>(
  ({ className, activeClassName, pendingClassName, href, end, ...props }, ref) => {
    const pathname = usePathname();
    const path = typeof href === "string" ? href : href.pathname ?? "";
    const isActive = end ? pathname === path : pathname === path || (path !== "/" && pathname.startsWith(path + "/"));

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName, pendingClassName)}
        {...props}
      />
    );
  },
);

CourseNavLink.displayName = "CourseNavLink";
