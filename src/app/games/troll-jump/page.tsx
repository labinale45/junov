import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { TrollJump } from "@/components/games/TrollJump";
import { GameJsonLd } from "@/components/games/shared/GameJsonLd";
import { GameLayout } from "@/components/games/shared/GameLayout";
import { getSiteUrl, gameOgImageUrl } from "@/lib/site";
import { getGameBySlug } from "@/lib/games-registry";

const siteUrl = getSiteUrl();
const game = getGameBySlug("troll-jump")!;

export const metadata: Metadata = {
  title: "Troll Jump — Free Stickman Trick Platformer Online",
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

export default function TrollJumpPage() {
  return (
    <GameLayout gameSlug="troll-jump">
      <GameJsonLd game={game} />
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <h1 className="text-xl font-bold text-slate-50 sm:text-2xl">Troll Jump</h1>
        <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 text-[11px] font-medium text-orange-300">
          Arcade
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-500">
          <ShieldCheck className="h-3 w-3" aria-hidden />
          Free · No download
        </span>
      </div>

      <TrollJump />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">How to Play Troll Jump</h2>
        <p className="text-slate-400">
          Move with the arrow keys or A/D and jump with Space, W, or the up arrow. Reach the glowing exit door to
          clear each of the 10 levels — but almost nothing on screen can be trusted. Floors marked as solid ground can
          quietly crumble away underfoot, some blocks you can walk straight through, some walls are completely
          invisible until you walk into them, spikes rise up the moment you get close, bridges phase in and out of
          existence, ceiling spikes drop as you pass beneath them, and levels with more than one exit door only ever
          have a single real one — pick wrong and it&apos;s game over. Every trap&apos;s timing, and which door is
          real, is re-rolled each time you load a level, so memorizing a single run through won&apos;t save you.
          Dying just respawns you instantly at the start of the level — press R or use the restart button in the
          toolbar to reset on demand. Your death count for the session is tracked right in the toolbar, and once
          you&apos;ve cleared a level you can jump straight back to it any time from the Levels list in the settings
          menu (gear icon above the game).
        </p>

        <h2 className="text-xl font-bold text-slate-50">Controls</h2>
        <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-300">
                <th className="px-4 py-2.5 font-semibold">Action</th>
                <th className="px-4 py-2.5 font-semibold">Desktop</th>
                <th className="px-4 py-2.5 font-semibold">Mobile</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-white/[0.05]">
                <td className="px-4 py-2.5">Move left</td>
                <td className="px-4 py-2.5">Left arrow / A</td>
                <td className="px-4 py-2.5">On-screen left button</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="px-4 py-2.5">Move right</td>
                <td className="px-4 py-2.5">Right arrow / D</td>
                <td className="px-4 py-2.5">On-screen right button</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="px-4 py-2.5">Jump</td>
                <td className="px-4 py-2.5">Space / W / Up arrow</td>
                <td className="px-4 py-2.5">On-screen jump button</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">Restart level</td>
                <td className="px-4 py-2.5">R</td>
                <td className="px-4 py-2.5">Restart button in toolbar</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          Touch controls appear automatically on touch devices — no separate mobile version needed.
        </p>

        <h2 className="text-xl font-bold text-slate-50">Tips for Troll Jump</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-400">
          <li>Slow down in unexplored sections — rushing into new areas is how most deaths happen.</li>
          <li>Treat every floor, wall, and door as suspect until you&apos;ve tested it once.</li>
          <li>
            A death still teaches you something: the exact trap and its rough timing for that attempt, since traps
            re-roll their timing (though not their type or location) on every level load.
          </li>
          <li>Watch the ceiling too — some spikes drop from above as you pass underneath.</li>
          <li>When a level has more than one exit door, only one is ever real — check both before committing.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-50">About Troll Jump</h2>
        <p className="text-slate-400">
          Troll Jump belongs to the &quot;troll platformer&quot; genre — games where the obstacle isn&apos;t just
          level design but the game deliberately misleading you, in the tradition of titles like The Impossible
          Game or Getting Over It. Each of the 10 levels re-rolls its trap timing and which exit door is real every
          time you load it, so a single successful run doesn&apos;t make the level trivial on your next attempt.
          Because deaths respawn you instantly at the start of the level, a run typically takes only seconds,
          keeping the &quot;one more try&quot; loop tight — a good pick for a quick break at school or work.
        </p>

        <h2 className="text-xl font-bold text-slate-50">More free games</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-400">
          <li>
            <Link href="/games/minesweeper" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Minesweeper
            </Link>{" "}
            — classic mine-clearing logic puzzle.
          </li>
          <li>
            <Link href="/games/tic-tac-toe" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Tic-Tac-Toe
            </Link>{" "}
            — play against an unbeatable AI or a friend.
          </li>
        </ul>
      </section>
    </GameLayout>
  );
}
