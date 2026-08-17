"use client";

import type { ReactNode } from "react";
import { Maximize, Minimize, RotateCcw, Settings2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/** Compact single-row HUD: settings popover on the left, live stats in the middle, fullscreen + restart on the right. */
export function GameToolbar({
  stats,
  settings,
  onRestart,
  restartLabel = "New Game",
  fullscreen,
  settingsContainer,
}: {
  stats: ReactNode;
  settings: ReactNode;
  onRestart: () => void;
  restartLabel?: string;
  fullscreen?: { isFullscreen: boolean; onToggle: () => void };
  /** Portal target for the settings popover — pass the fullscreen element while in fullscreen, otherwise it renders outside it and never paints. */
  settingsContainer?: HTMLElement | null;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-slate-900 px-2 py-2 sm:px-3">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Game settings"
            title="Settings"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Settings2 className="h-4.5 w-4.5" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          container={settingsContainer}
          className="w-64 rounded-xl border-white/10 bg-slate-900 p-3 text-slate-100 shadow-2xl"
        >
          {settings}
        </PopoverContent>
      </Popover>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-x-4 gap-y-1 overflow-hidden text-xs text-slate-400 sm:text-sm">
        {stats}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {fullscreen ? (
          <button
            type="button"
            onClick={fullscreen.onToggle}
            aria-label={fullscreen.isFullscreen ? "Exit fullscreen" : "Enlarge to fullscreen"}
            title={fullscreen.isFullscreen ? "Exit fullscreen" : "Enlarge to fullscreen"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            {fullscreen.isFullscreen ? (
              <Minimize className="h-4 w-4" aria-hidden />
            ) : (
              <Maximize className="h-4 w-4" aria-hidden />
            )}
          </button>
        ) : null}
        <button
          type="button"
          onClick={onRestart}
          aria-label={restartLabel}
          title={restartLabel}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
