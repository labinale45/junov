"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavHashLinkProps = React.ComponentProps<typeof Link>;

/**
 * Ensures same-page hash links still scroll every click
 * even when the current URL already has that hash.
 */
export function NavHashLink({ href, onClick, ...props }: NavHashLinkProps) {
  const pathname = usePathname();

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (typeof href !== "string") return;
    if (!href.startsWith("/#")) return;
    if (pathname !== "/") return;

    event.preventDefault();
    const id = href.slice(2);
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${id}`);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
