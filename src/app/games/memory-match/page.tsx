import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { MemoryMatch } from "@/components/games/MemoryMatch";
import { GameJsonLd } from "@/components/games/shared/GameJsonLd";
import { GameLayout } from "@/components/games/shared/GameLayout";
import { getSiteUrl, gameOgImageUrl } from "@/lib/site";
import { getGameBySlug } from "@/lib/games-registry";

const siteUrl = getSiteUrl();
const game = getGameBySlug("memory-match")!;

export const metadata: Metadata = {
  title: "Memory Match Game — Free, Online",
  description: game.description,
  keywords: game.keywords,
  alternates: { canonical: `${siteUrl}/games/${game.slug}` },
  openGraph: {
    title: `${game.name} | Rabin Ale`,
    description: game.description,
    url: `${siteUrl}/games/${game.slug}`,
    type: "website",
    images: [{ url: gameOgImageUrl(game.name, game.tagline), width: 1200, height: 630, alt: game.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${game.name} | Rabin Ale`,
    description: game.description,
    images: [gameOgImageUrl(game.name, game.tagline)],
  },
};

export default function MemoryMatchPage() {
  return (
    <GameLayout gameSlug="memory-match">
      <GameJsonLd game={game} />
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <h1 className="text-xl font-bold text-slate-50 sm:text-2xl">Memory Match</h1>
        <span className="rounded-full border border-violet-500/20 bg-violet-600/10 px-2 py-0.5 text-[11px] font-medium text-violet-300">
          Puzzle
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-500">
          <ShieldCheck className="h-3 w-3" aria-hidden />
          Free · No download
        </span>
      </div>

      <MemoryMatch />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">How to Play Memory Match</h2>
        <p className="text-slate-400">
          Memory Match is a classic concentration card game. The board starts with every card face-down. Click any
          two cards to flip them over — if their symbols match, they stay revealed; if not, they flip back after a
          moment. The goal is to clear the entire board in as few moves as possible. Open the settings menu (gear
          icon above the board) to choose between an 8-pair board for a quick round or an 18-pair board for a
          tougher challenge. Your fewest-moves record for each difficulty is saved automatically in your browser, so
          you can come back and try to beat it.
        </p>
      </section>
    </GameLayout>
  );
}
