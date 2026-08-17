import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export interface RelatedGameItem {
  name: string;
  href: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
  isNew?: boolean;
}

export function RelatedGames({
  games,
  variant = "grid",
}: {
  games: RelatedGameItem[];
  variant?: "grid" | "sidebar";
}) {
  if (games.length === 0) return null;

  if (variant === "sidebar") {
    return (
      <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2 lg:flex lg:flex-col">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <Link
              key={game.href}
              href={game.href}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-slate-900 p-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-violet-500/50 hover:shadow-[0_0_0_1px_rgba(124,58,237,0.3),0_8px_24px_-8px_rgba(124,58,237,0.35)]"
            >
              {game.image ? (
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-950 transition-transform duration-300 ease-out group-hover:scale-110">
                  <Image src={game.image} alt="" fill className="object-cover" sizes="48px" />
                </span>
              ) : Icon ? (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600/15 text-violet-400 transition-transform duration-300 ease-out group-hover:scale-110">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              ) : null}
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-semibold text-slate-50 group-hover:text-white">{game.name}</span>
                  {game.isNew ? (
                    <span className="shrink-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                      New
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block truncate text-xs text-slate-400">{game.description}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-violet-400 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
            </Link>
          );
        })}
      </div>
    );
  }

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
            {game.image ? (
              <span className="relative h-12 w-12 overflow-hidden rounded-lg bg-slate-950 transition-transform duration-300 ease-out group-hover:scale-110">
                <Image src={game.image} alt="" fill className="object-cover" sizes="48px" />
              </span>
            ) : Icon ? (
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
