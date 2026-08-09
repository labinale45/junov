/** Scroll distance (px) after which the top bar hides and the dock appears — keep in sync across Header, FloatingDock, and site headers. */
export const HEADER_SCROLL_THRESHOLD = 80;

/** Scrolls so the target section's own midpoint lands at the viewport's vertical center. */
export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const target = document.getElementById(id);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const targetCenter = rect.top + window.scrollY + rect.height / 2;
  const viewportCenter = window.innerHeight / 2;
  const top = Math.max(0, targetCenter - viewportCenter);
  window.scrollTo({ top, behavior });
}
