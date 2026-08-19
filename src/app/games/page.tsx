import type { Metadata } from "next";
import { Gamepad2, ShieldCheck, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { GamesGrid } from "@/components/games/shared/GamesGrid";
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

export default function GamesIndexPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: GAMES.map((game, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: game.name,
      url: `${siteUrl}/games/${game.slug}`,
    })),
  };

  return (
    <main className="relative flex-1 overflow-hidden bg-[#0a0f1e]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

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
      </div>
    </main>
  );
}
