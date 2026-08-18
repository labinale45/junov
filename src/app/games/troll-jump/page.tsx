import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { TrollJump } from "@/components/games/TrollJump";
import { GameJsonLd } from "@/components/games/shared/GameJsonLd";
import { GameLayout } from "@/components/games/shared/GameLayout";
import { getSiteUrl, gameOgImageUrl } from "@/lib/site";
import { getGameBySlug } from "@/lib/games-registry";

const siteUrl = getSiteUrl();
const game = getGameBySlug("troll-jump")!;

export const metadata: Metadata = {
  title: "Troll Jump — Free Trick Platformer Online",
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
      </section>
    </GameLayout>
  );
}
