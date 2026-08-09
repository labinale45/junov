"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scroll";

type NavHashLinkProps = React.ComponentProps<typeof Link>;

/**
 * Ensures same-page hash links still scroll every click
 * even when the current URL already has that hash.
 *
 * forwardRef so it stays compatible with Radix's `asChild` (e.g. DropdownMenuItem),
 * which clones its child and attaches a ref to the underlying anchor.
 */
export const NavHashLink = forwardRef<HTMLAnchorElement, NavHashLinkProps>(function NavHashLink(
  { href, onClick, ...props },
  ref
) {
  const pathname = usePathname();

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (typeof href !== "string") return;
    if (!href.startsWith("/#")) return;
    if (pathname !== "/") return;

    event.preventDefault();
    const id = href.slice(2);
    if (!document.getElementById(id)) return;

    scrollToSection(id, "smooth");
    window.history.replaceState(null, "", `/#${id}`);
  };

  return <Link ref={ref} href={href} onClick={handleClick} {...props} />;
});
