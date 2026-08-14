"use client";

import type { ReactNode } from "react";
import { Bomb, PartyPopper, RotateCcw, Users } from "lucide-react";

interface GameOverlayProps {
  tone: "win" | "lose" | "draw";
  title: string;
  subtitle?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const TONE_CLASSES: Record<GameOverlayProps["tone"], { title: string; icon: string; Icon: typeof PartyPopper }> = {
  win: { title: "text-emerald-400", icon: "text-emerald-400", Icon: PartyPopper },
  lose: { title: "text-rose-400", icon: "text-rose-400", Icon: Bomb },
  draw: { title: "text-slate-100", icon: "text-slate-400", Icon: Users },
};

/** Absolute-positioned result screen over the game area — never shifts the board's layout. */
export function GameOverlay({ tone, title, subtitle, actionLabel = "Play Again", onAction }: GameOverlayProps) {
  const t = TONE_CLASSES[tone];
  const Icon = t.Icon;

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl bg-slate-950/85 px-6 text-center backdrop-blur-sm duration-300 animate-in fade-in-0">
      <Icon className={`h-8 w-8 ${t.icon}`} aria-hidden />
      <p className={`text-2xl font-bold sm:text-3xl ${t.title}`}>{title}</p>
      {subtitle ? <p className="text-sm text-slate-300 sm:text-base">{subtitle}</p> : null}
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2 text-sm font-semibold text-white"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
