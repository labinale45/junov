import type { Metadata } from "next";
import { ShieldCheck, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { ToolsGrid } from "@/components/tools/shared/ToolsGrid";
import { getSiteUrl } from "@/lib/site";
import { TOOLS } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Free Online Tools — Image & AI Tools",
  description:
    "Free browser-based image and AI tools. Compress, convert, enhance images and explain code instantly. No login required, files never leave your device.",
  keywords: ["free online tools", "image tools", "AI tools", "browser tools", "no upload image tools"],
  alternates: { canonical: `${siteUrl}/tools` },
  openGraph: {
    title: "Free Online Tools — Image & AI Tools | Rabin Ale",
    description:
      "Browser-based tools that work instantly. No upload, no login, no cost. Your files never leave your device.",
    url: `${siteUrl}/tools`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools — Image & AI Tools | Rabin Ale",
    description: "Browser-based tools that work instantly. No upload, no login, no cost.",
  },
};

export default function ToolsIndexPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TOOLS.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: `${siteUrl}/tools/${tool.slug}`,
    })),
  };

  return (
    <main className="relative flex-1 overflow-hidden bg-[#0a0f1e]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      {/* Decorative ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,_rgba(124,58,237,0.16)_0%,_transparent_65%)] blur-2xl" />
        <div className="absolute top-40 right-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.14)_0%,_transparent_70%)] blur-2xl" />
      </div>

      <div className="relative container mx-auto max-w-6xl px-6 pb-[100px] pt-12 lg:px-12 lg:pt-16">
        <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-600/10 px-3 py-1 text-xs font-medium text-violet-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {TOOLS.length} tools, forever free
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-50 lg:text-6xl">
            Every tool you need to edit images — free
            <BrandLogo size={44} className="ml-3 hidden align-middle sm:inline-flex" />
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            Compress, convert, resize, remove backgrounds and more — {TOOLS.length} browser-based tools that are
            always free. No uploads, no logins, no catch.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3.5 py-1.5 text-xs font-medium text-green-500">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            100% client-side processing — nothing is uploaded to a server
          </div>
        </div>

        <div className="mt-10">
          <ToolsGrid />
        </div>
      </div>
    </main>
  );
}
