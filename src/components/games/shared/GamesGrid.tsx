"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, LayoutGrid, Puzzle, Swords, type LucideIcon } from "lucide-react";
import { GameCard } from "@/components/games/shared/GameCard";
import { GAME_CATEGORY_LABELS, GAMES, type GameCategory } from "@/lib/games-registry";

type FilterKey = "all" | GameCategory;

const FILTERS: { key: FilterKey; label: string; icon: LucideIcon }[] = [
  { key: "all", label: "All", icon: LayoutGrid },
  { key: "puzzle", label: GAME_CATEGORY_LABELS.puzzle, icon: Puzzle },
  { key: "strategy", label: GAME_CATEGORY_LABELS.strategy, icon: Swords },
  { key: "arcade", label: GAME_CATEGORY_LABELS.arcade, icon: Gamepad2 },
];

function GameCardGrid({ games }: { games: typeof GAMES }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game, i) => (
        <div
          key={game.slug}
          className="animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both"
          style={{ animationDelay: `${Math.min(i, 8) * 40}ms`, animationDuration: "400ms" }}
        >
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
}

export function GamesGrid() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = useMemo(
    () => (filter === "all" ? GAMES : GAMES.filter((g) => g.category === filter)),
    [filter]
  );

  return (
    <div>
      <div className="mb-8 inline-flex flex-wrap gap-1 rounded-full border border-white/[0.08] bg-slate-900 p-1">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          const Icon = f.icon;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ease-out ${
                active ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="games-filter-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-500"
                />
              ) : null}
              <span className="relative inline-flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {f.label}
              </span>
            </button>
          );
        })}
      </div>

      {filter === "all" ? (
        <GameCardGrid games={filtered} />
      ) : (
        <section>
          <h2 className="mb-5 text-xl font-bold text-slate-50">{GAME_CATEGORY_LABELS[filter]}</h2>
          <GameCardGrid games={filtered} />
        </section>
      )}
    </div>
  );
}
