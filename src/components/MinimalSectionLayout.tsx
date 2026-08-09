import { AuroraBackground } from "@/components/immersive/AuroraBackground";
import { GrainOverlay } from "@/components/immersive/GrainOverlay";
import { ContentSiteFooter } from "@/components/ContentSiteFooter";

/**
 * Used by the Tools and Course sections in place of ContentSectionLayout — no site
 * navbar and no floating dock (FloatingDock hides itself on these routes). Each page
 * places its own small logo beside its main heading instead of a separate top bar.
 */
export function MinimalSectionLayout({
  children,
  tone = "violet",
}: {
  children: React.ReactNode;
  tone?: "violet" | "indigo";
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      <AuroraBackground tone={tone} />
      <GrainOverlay />

      <div className="relative z-10 flex-1">{children}</div>
      <ContentSiteFooter />
    </div>
  );
}
