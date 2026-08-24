import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircleQuestion, ShieldCheck, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { ToolsGrid } from "@/components/tools/shared/ToolsGrid";
import { ToolFAQ } from "@/components/tools/shared/ToolFAQ";
import { getSiteUrl } from "@/lib/site";
import { CATEGORY_LABELS, TOOLS } from "@/lib/tools-registry";

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

const HUB_FAQS = [
  {
    question: "Are these tools really free?",
    answer:
      "Yes — every tool on this page is free with no signup, no subscription, and no daily limit. There's no premium tier hiding better results behind a paywall.",
  },
  {
    question: "Do my files get uploaded to a server?",
    answer:
      "No. Every tool here processes your file entirely in your browser using the Canvas or FileReader APIs. Your images never leave your device — the one exception is the AI Code Explainer, which sends only the code you paste to an AI API to generate an explanation.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account, no email, no login. Open a tool and start using it immediately.",
  },
  {
    question: "What browsers are supported?",
    answer: "Any modern browser — Chrome, Firefox, Safari, or Edge — on desktop, tablet, or mobile.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "It varies by tool since processing happens on your device — most tools handle files up to 20MB comfortably. Check the individual tool's page for its exact limit.",
  },
  {
    question: "Can I use these tools on my phone?",
    answer: "Yes, all tools are built to work on mobile browsers on iOS and Android with no app install required.",
  },
];

export default function ToolsIndexPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Online Tools — Rabinale",
    description:
      "A collection of free, browser-based image and developer tools. No uploads, no signups, no paywalls.",
    url: `${siteUrl}/tools`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: TOOLS.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: tool.name,
        url: `${siteUrl}/tools/${tool.slug}`,
        description: tool.tagline,
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HUB_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="relative flex-1 overflow-hidden bg-[#0a0f1e]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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

        <section className="mt-16 max-w-3xl">
          <h2 className="mb-4 text-xl font-bold text-slate-50">Why use Rabinale tools?</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-400">
            <li>
              <strong className="text-slate-200">100% free</strong> — no subscriptions, no premium tier, no daily
              limits.
            </li>
            <li>
              <strong className="text-slate-200">No signup required</strong> — open any tool and start using it
              instantly.
            </li>
            <li>
              <strong className="text-slate-200">Privacy-first</strong> — {TOOLS.length} tools run entirely in your
              browser. Your files never touch a server.
            </li>
            <li>
              <strong className="text-slate-200">Works everywhere</strong> — desktop, tablet, and mobile, in any
              modern browser.
            </li>
            <li>
              <strong className="text-slate-200">Covers {Object.values(CATEGORY_LABELS).join(", ").toLowerCase()}</strong>{" "}
              — image conversion, compression, editing, and a couple of AI and developer utilities too.
            </li>
          </ul>
          <p className="mt-6 text-slate-400">
            Looking for something to do between edits?{" "}
            <Link href="/games" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Check out our free browser games →
            </Link>
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-blue-500/20 text-violet-400">
              <MessageCircleQuestion className="h-4 w-4" aria-hidden />
            </span>
            <h2 className="text-xl font-bold text-slate-50">Frequently Asked Questions</h2>
          </div>
          <ToolFAQ faqs={HUB_FAQS} />
        </section>
      </div>
    </main>
  );
}
