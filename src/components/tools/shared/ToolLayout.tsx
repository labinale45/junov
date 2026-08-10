import Link from "next/link";
import { ChevronRight, MessageCircleQuestion, ShieldCheck, Sparkles } from "lucide-react";
import { AdSenseScript } from "@/components/AdSense";
import { BrandLogo } from "@/components/BrandLogo";
import { AdSlot } from "@/components/tools/shared/AdSlot";
import { CopyLinkButton } from "@/components/tools/shared/CopyLinkButton";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { ToolFAQ } from "@/components/tools/shared/ToolFAQ";
import { getRelatedTools, getToolBySlug } from "@/lib/tools-registry";

export function ToolLayout({
  toolSlug,
  privacyNote = "Your files never leave your device.",
  children,
}: {
  toolSlug: string;
  privacyNote?: string;
  children: React.ReactNode;
}) {
  const tool = getToolBySlug(toolSlug);
  const related = tool ? getRelatedTools(tool.related) : [];

  return (
    <main className="relative flex-1 overflow-hidden bg-[#0a0f1e]">
      <AdSenseScript />
      {/* Decorative ambient glow — purely visual, sits behind all content */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.16)_0%,_transparent_70%)] blur-2xl" />
        <div className="absolute top-1/3 -left-24 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.12)_0%,_transparent_70%)] blur-2xl" />
      </div>

      <div className="relative container mx-auto max-w-5xl px-6 pb-[100px] pt-8 lg:px-12 lg:pt-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 animate-in fade-in-0 duration-500">
          <div className="flex items-center gap-3">
            <BrandLogo size={32} />
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500">
              <Link href="/" className="rounded-md px-1.5 py-0.5 transition-colors hover:bg-white/5 hover:text-slate-300">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-700" aria-hidden />
              <Link href="/tools" className="rounded-md px-1.5 py-0.5 transition-colors hover:bg-white/5 hover:text-slate-300">
                Tools
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-700" aria-hidden />
              <span className="rounded-md px-1.5 py-0.5 text-slate-300">{tool?.name ?? "Tool"}</span>
            </nav>
          </div>
          <CopyLinkButton />
        </div>

        <div className="mb-6 inline-flex animate-in fade-in-0 slide-in-from-bottom-1 items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3.5 py-1.5 text-xs font-medium text-green-500 duration-500">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          {privacyNote}
        </div>

        <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700">{children}</div>

        {/* Single ad below the tool itself, like a competitor's placement — never above the fold, never before the user can act. */}
        <AdSlot size="banner" />

        {related.length > 0 ? (
          <section className="mt-16">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-blue-500/20 text-violet-400">
                <Sparkles className="h-4 w-4" aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-slate-50">Related Tools</h2>
            </div>
            <RelatedTools
              tools={related.map((t) => ({ name: t.name, href: `/tools/${t.slug}`, description: t.tagline, icon: t.icon }))}
            />
          </section>
        ) : null}

        {tool && tool.faqs.length > 0 ? (
          <section className="mt-14">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-blue-500/20 text-violet-400">
                <MessageCircleQuestion className="h-4 w-4" aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-slate-50">Frequently Asked Questions</h2>
            </div>
            <ToolFAQ faqs={tool.faqs} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
