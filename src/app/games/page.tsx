import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, MessageCircleQuestion, ShieldCheck, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { GamesGrid } from "@/components/games/shared/GamesGrid";
import { ToolFAQ } from "@/components/tools/shared/ToolFAQ";
import { getSiteUrl } from "@/lib/site";
import { GAMES } from "@/lib/games-registry";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Free Online Games — Play Instantly",
  description:
    "Free browser games. Memory Match, Tic-Tac-Toe vs AI, Minesweeper, and Troll Jump. No login, no download, runs instantly in your browser.",
  keywords: ["free online games", "browser games", "no download games", "play games online free", "stickman game", "free puzzle games online"],
  alternates: { canonical: `${siteUrl}/games` },
  openGraph: {
    title: "Free Online Games — Play Instantly | Rabin Ale",
    description: "Browser-based games that work instantly. No download, no login, no cost.",
    url: `${siteUrl}/games`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Games — Play Instantly | Rabin Ale",
    description: "Browser-based games that work instantly. No download, no login, no cost.",
  },
};

const HUB_FAQS = [
  {
    question: "Are these games unblocked at school or work?",
    answer:
      "These are normal public web pages with no login, install, or plugin required — if your school or work network allows this site, every game just works, including on shared or restricted devices.",
  },
  {
    question: "Do I need Flash to play?",
    answer: "No. All games are built with HTML5, JavaScript, and Canvas. Flash was discontinued in 2020 and isn't used anywhere on this site.",
  },
  {
    question: "Can I play on my phone?",
    answer: "Yes, every game is touch-friendly and works on iOS Safari and Android Chrome with no app download.",
  },
  {
    question: "Are the games free forever?",
    answer: "Yes — no in-app purchases, subscriptions, or paid unlocks. Every game is fully playable for free.",
  },
  {
    question: "Do I need to make an account?",
    answer: "No login, no registration, no email. Click a game and it starts instantly.",
  },
  {
    question: "Will more games be added?",
    answer: "Yes, new games are added periodically — check back or bookmark this page to see what's new.",
  },
];

export default function GamesIndexPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Online Games — Rabinale",
    description:
      "A collection of free browser games you can play instantly — no download, no login, no plugins.",
    url: `${siteUrl}/games`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: GAMES.map((game, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: game.name,
        url: `${siteUrl}/games/${game.slug}`,
        description: game.tagline,
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

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,_rgba(124,58,237,0.16)_0%,_transparent_65%)] blur-2xl" />
        <div className="absolute top-40 right-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.14)_0%,_transparent_70%)] blur-2xl" />
      </div>

      <div className="relative container mx-auto max-w-6xl px-6 pb-[100px] pt-12 lg:px-12 lg:pt-16">
        <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-600/10 px-3 py-1 text-xs font-medium text-violet-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {GAMES.length} games, forever free
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-50 lg:text-6xl">
            Free games you can play right now
            <BrandLogo size={44} className="ml-3 hidden align-middle sm:inline-flex" />
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            Memory Match, Tic-Tac-Toe against an unbeatable AI, Minesweeper, and the trick platformer Troll Jump —{" "}
            {GAMES.length} browser games that are always free. No downloads, no logins, no catch.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3.5 py-1.5 text-xs font-medium text-green-500">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              100% client-side — nothing is uploaded to a server
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1.5 text-xs font-medium text-blue-400">
              <Gamepad2 className="h-3.5 w-3.5" aria-hidden />
              Works on desktop and mobile
            </div>
          </div>
        </div>

        <div className="mt-10">
          <GamesGrid />
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="mb-4 text-xl font-bold text-slate-50">Why play games on Rabinale?</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-400">
            <li>
              <strong className="text-slate-200">Unblocked-friendly</strong> — normal public web pages with no
              plugins or third-party game embeds that networks tend to filter.
            </li>
            <li>
              <strong className="text-slate-200">No download required</strong> — everything runs in your browser.
            </li>
            <li>
              <strong className="text-slate-200">No Flash</strong> — built with modern HTML5 and JavaScript.
            </li>
            <li>
              <strong className="text-slate-200">No login or account</strong> — click a game and start playing.
            </li>
            <li>
              <strong className="text-slate-200">Mobile friendly</strong> — touch controls on every game, no app
              needed.
            </li>
            <li>
              <strong className="text-slate-200">Completely free</strong> — no paywalls or in-app purchases.
            </li>
          </ul>
          <p className="mt-6 text-slate-400">
            Need something more practical?{" "}
            <Link href="/tools" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Try our free image and developer tools →
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
