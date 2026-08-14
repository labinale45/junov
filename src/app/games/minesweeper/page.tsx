import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Minesweeper } from "@/components/games/Minesweeper";
import { GameJsonLd } from "@/components/games/shared/GameJsonLd";
import { GameLayout } from "@/components/games/shared/GameLayout";
import { getSiteUrl, gameOgImageUrl } from "@/lib/site";
import { getGameBySlug } from "@/lib/games-registry";

const siteUrl = getSiteUrl();
const game = getGameBySlug("minesweeper")!;

export const metadata: Metadata = {
  title: "Minesweeper Online — Free, Unblocked",
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

export default function MinesweeperPage() {
  return (
    <GameLayout gameSlug="minesweeper">
      <GameJsonLd game={game} />
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <h1 className="text-xl font-bold text-slate-50 sm:text-2xl">Minesweeper</h1>
        <span className="rounded-full border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-300">
          Puzzle
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-500">
          <ShieldCheck className="h-3 w-3" aria-hidden />
          Free · No download
        </span>
      </div>

      <Minesweeper />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">How to Play Minesweeper</h2>
        <p className="text-slate-400">
          Click any tile to reveal it. Revealed tiles show a number telling you how many mines are hiding in the up
          to eight surrounding tiles — use that information to logically deduce which nearby tiles are safe. Your
          first click is always guaranteed safe, along with its immediate neighbors. Right-click on desktop, or open
          the settings menu (gear icon above the board) and turn on Flag mode to tap-flag tiles on mobile. Clear
          every tile that isn&apos;t a mine to win; click a mine and it&apos;s game over.
        </p>
      </section>
    </GameLayout>
  );
}
