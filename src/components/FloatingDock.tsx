"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NavHashLink } from "@/components/NavHashLink";
import { HEADER_SCROLL_THRESHOLD } from "@/lib/scroll";

const dockLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/#blog", label: "Blog", icon: BlogIcon },
  { href: "/#explore", label: "Explore", icon: CompassIcon },
  { href: "/#projects", label: "Projects", icon: FolderIcon },
  { href: "/#contact", label: "Contact", icon: MailIcon },
];

/** Tools, Course, Blog, and Projects pages get their own minimal logo-only header — no dock there. */
function isDockHiddenRoute(pathname: string) {
  return (
    pathname.startsWith("/tools") ||
    pathname.startsWith("/course") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/projects")
  );
}

function CompassIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="22" width="22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22a10 10 0 100-20 10 10 0 000 20zM15.5 8.5l-2.5 6-6 2.5 2.5-6 6-2.5z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="22" width="22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="22" width="22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="22" width="22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="22" width="22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

/** Bottom dock — only visible after scrolling past HEADER_SCROLL_THRESHOLD (top bar hidden). */
export function FloatingDock() {
  const pathname = usePathname();
  const hidden = isDockHiddenRoute(pathname);
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowDock(window.scrollY > HEADER_SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (showDock && !hidden) document.body.classList.add("pb-dock-safe");
    else document.body.classList.remove("pb-dock-safe");
    return () => document.body.classList.remove("pb-dock-safe");
  }, [showDock, hidden]);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {showDock ? (
        <motion.nav
          key="floating-dock"
          aria-label="Quick navigation"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed left-1/2 bottom-4 md:bottom-6 -translate-x-1/2 z-[100] max-w-[calc(100vw-1rem)] pointer-events-auto"
        >
          <div className="border border-slate-600/90 glass py-2.5 md:py-3 flex items-center justify-center gap-0.5 sm:gap-1 shadow-2xl rounded-2xl px-1.5 sm:px-2 backdrop-blur-xl bg-slate-950/80">
            {dockLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavHashLink
                  key={link.href + link.label}
                  href={link.href}
                  className="group relative px-2 sm:px-3 py-1 shrink-0"
                >
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-slate-200 hover:text-indigo-400 transition-colors">
                    <Icon />
                  </div>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[110] whitespace-nowrap origin-bottom scale-0 rounded-lg border border-slate-600 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 shadow-lg transition-all duration-200 ease-out group-hover:scale-100 pointer-events-none">
                    {link.label}
                  </span>
                </NavHashLink>
              );
            })}
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
