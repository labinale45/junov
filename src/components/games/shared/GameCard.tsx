import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACCENT_CLASSES, type GameDef } from "@/lib/games-registry";

const CATEGORY_BADGE_CLASS: Record<GameDef["category"], string> = {
  puzzle: "bg-violet-600/10 text-violet-400 border-violet-500/20",
  strategy: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  arcade: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export function GameCard({ game }: { game: GameDef }) {
  const accent = ACCENT_CLASSES[game.accent];

  return (
    <Link
      href={`/games/${game.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900 transition-all duration-300 ease-out hover:-translate-y-1 ${accent.glow}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
        <Image
          src={game.image}
          alt=""
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {game.isNew ? (
          <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
            New
          </span>
        ) : (
          <span
            className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm ${CATEGORY_BADGE_CLASS[game.category]}`}
          >
            {game.categoryLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-50 group-hover:text-white">{game.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{game.tagline}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-violet-400">
          Play now
          <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
