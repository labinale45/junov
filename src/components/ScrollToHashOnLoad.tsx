"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/lib/scroll";

/**
 * When the home page is loaded (or navigated to) with a URL hash — e.g. clicking
 * "Explore" from /blog does a real navigation to "/#explore" — the browser's native
 * anchor jump aligns the target to the top of the viewport. This repositions it to
 * match the in-page NavHashLink click behavior, so entry point doesn't change the result.
 */
export function ScrollToHashOnLoad() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const raf = requestAnimationFrame(() => scrollToSection(id, "auto"));
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
