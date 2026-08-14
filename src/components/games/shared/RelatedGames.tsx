import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export interface RelatedGameItem {
  name: string;
  href: string;
  description: string;
  icon?: LucideIcon;
}

export function RelatedGames({ games }: { games: RelatedGameItem[] }) {
  if (games.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {games.map((game) => {
        const Icon = game.icon;
        return (
          <Link
            key={game.href}
            href={game.href}
            className="group flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-slate-900 p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-violet-500/50 hover:shadow-[0_0_0_1px_rgba(124,58,237,0.3),0_8px_24px_-8px_rgba(124,58,237,0.35)]"
          >
            {Icon ? (
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/15 text-violet-400 transition-transform duration-300 ease-out group-hover:scale-110">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
            ) : null}
            <div>
              <h3 className="text-sm font-semibold text-slate-50 group-hover:text-white">{game.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{game.description}</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-violet-400">
              Play now
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
