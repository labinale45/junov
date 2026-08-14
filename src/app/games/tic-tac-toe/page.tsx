import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { TicTacToe } from "@/components/games/TicTacToe";
import { GameJsonLd } from "@/components/games/shared/GameJsonLd";
import { GameLayout } from "@/components/games/shared/GameLayout";
import { getSiteUrl, gameOgImageUrl } from "@/lib/site";
import { getGameBySlug } from "@/lib/games-registry";

const siteUrl = getSiteUrl();
const game = getGameBySlug("tic-tac-toe")!;

export const metadata: Metadata = {
  title: "Tic-Tac-Toe Online — Free, 2 Player",
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

export default function TicTacToePage() {
  return (
    <GameLayout gameSlug="tic-tac-toe">
      <GameJsonLd game={game} />
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <h1 className="text-xl font-bold text-slate-50 sm:text-2xl">Tic-Tac-Toe</h1>
        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-300">
          Strategy
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-500">
          <ShieldCheck className="h-3 w-3" aria-hidden />
          Free · No download
        </span>
      </div>

      <TicTacToe />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">How to Play Tic-Tac-Toe</h2>
        <p className="text-slate-400">
          You play X and always move first — click any empty cell to place your mark. Get three of your marks in a
          row, column, or diagonal before your opponent does to win. In vs AI mode, the computer calculates every
          possible outcome with a minimax search, so it never makes a losing move — the best result you can achieve
          against it is a draw. Open the settings menu (gear icon above the board) to switch to 2-player mode and
          pass the device back and forth with a friend instead. Wins, losses, and draws are tallied for your current
          session. Want a game that always ends in a win? Switch Draws to &quot;No Draws&quot; in the settings menu —
          each player then keeps at most 3 marks on the board, so placing a 4th makes your own oldest mark vanish
          (it pulses just before it disappears). The board can never fill up, so play keeps going until someone
          actually wins.
        </p>
      </section>
    </GameLayout>
  );
}
