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
          Minesweeper is a free logic puzzle for anyone who wants a quick, no-download brain game — students on a
          school computer, developers taking a break between tickets, or classic-game fans who grew up with the
          Windows version. Click any tile to reveal it. Revealed tiles show a number telling you how many mines are
          hiding in the up to eight surrounding tiles — use that information to logically deduce which nearby tiles
          are safe.
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Pick a difficulty from the settings menu (gear icon above the board): Beginner or Intermediate.</li>
          <li>Click any tile to start — your first click is always guaranteed safe, along with its immediate neighbors.</li>
          <li>Read the numbers on revealed tiles: each one tells you how many mines touch it.</li>
          <li>Right-click a tile to flag it as a suspected mine (or turn on Flag mode in settings on mobile, then tap to flag).</li>
          <li>Keep revealing tiles you&apos;ve logically proven are safe until every non-mine tile is uncovered.</li>
          <li>Click a mine and it&apos;s game over — restart instantly from the toolbar to try again.</li>
        </ol>

        <h2 className="text-xl font-bold text-slate-50">When to Play Minesweeper Online</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-400">
          <li>
            <strong className="text-slate-200">Students</strong> looking for a Minesweeper unblocked option that
            works on school Chromebooks and shared lab computers.
          </li>
          <li>
            <strong className="text-slate-200">Developers and office workers</strong> wanting a fast, logic-based
            break between tasks without installing anything.
          </li>
          <li>
            <strong className="text-slate-200">Classic PC game fans</strong> who grew up with Minesweeper on Windows
            and want the same ruleset in a browser.
          </li>
          <li>
            <strong className="text-slate-200">Commuters and mobile players</strong> who want a touch-friendly
            puzzle that doesn&apos;t need a data-heavy app download.
          </li>
          <li>
            <strong className="text-slate-200">Anyone practicing logical deduction</strong> as a low-stakes way to
            sharpen pattern recognition and probability thinking.
          </li>
        </ul>
      </section>
    </GameLayout>
  );
}
