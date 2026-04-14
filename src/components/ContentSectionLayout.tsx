import { ContentSiteFooter } from "@/components/ContentSiteFooter";
import { ContentSiteHeader } from "@/components/ContentSiteHeader";

export function ContentSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <ContentSiteHeader />
      {/* Offset for fixed header (matches home overlay spacing) */}
      <div className="flex-1 pt-[4.5rem] md:pt-20">{children}</div>
      <ContentSiteFooter />
    </div>
  );
}

