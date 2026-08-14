"use client";

import { useEffect, useState } from "react";
import { Bomb, Flag, MousePointerClick, Timer } from "lucide-react";
import { GameOverlay } from "@/components/games/shared/GameOverlay";
import { GameToolbar } from "@/components/games/shared/GameToolbar";
import { ImageUploadSlot } from "@/components/games/shared/ImageUploadSlot";
import { SettingsSegment } from "@/components/games/shared/SettingsSegment";
import { useLocalStorageJSON } from "@/hooks/use-local-storage-json";

type Difficulty = "beginner" | "intermediate";

interface DifficultyConfig {
  rows: number;
  cols: number;
  mines: number;
  label: string;
}

const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
  beginner: { rows: 9, cols: 9, mines: 10, label: "Beginner" },
  intermediate: { rows: 16, cols: 16, mines: 40, label: "Intermediate" },
};

const DIFFICULTY_OPTIONS = (Object.keys(DIFFICULTIES) as Difficulty[]).map((d) => ({
  value: d,
  label: DIFFICULTIES[d].label,
}));

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
}

type GameState = "idle" | "playing" | "won" | "lost";

function emptyBoard(config: DifficultyConfig): Cell[][] {
  return Array.from({ length: config.rows }, () =>
    Array.from({ length: config.cols }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 }))
  );
}

function neighborsOf(r: number, c: number, config: DifficultyConfig): [number, number][] {
  const out: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < config.rows && nc >= 0 && nc < config.cols) out.push([nr, nc]);
    }
  }
  return out;
}

function placeMines(board: Cell[][], config: DifficultyConfig, safeR: number, safeC: number): Cell[][] {
  const safeZone = new Set(neighborsOf(safeR, safeC, config).map(([r, c]) => `${r},${c}`));
  safeZone.add(`${safeR},${safeC}`);

  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  let placed = 0;
  while (placed < config.mines) {
    const r = Math.floor(Math.random() * config.rows);
    const c = Math.floor(Math.random() * config.cols);
    if (safeZone.has(`${r},${c}`) || next[r][c].mine) continue;
    next[r][c].mine = true;
    placed++;
  }

  for (let r = 0; r < config.rows; r++) {
    for (let c = 0; c < config.cols; c++) {
      if (next[r][c].mine) continue;
      next[r][c].adjacent = neighborsOf(r, c, config).filter(([nr, nc]) => next[nr][nc].mine).length;
    }
  }
  return next;
}

function floodReveal(board: Cell[][], config: DifficultyConfig, r: number, c: number): Cell[][] {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack: [number, number][] = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    const cell = next[cr][cc];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.adjacent === 0 && !cell.mine) {
      for (const [nr, nc] of neighborsOf(cr, cc, config)) {
        if (!next[nr][nc].revealed) stack.push([nr, nc]);
      }
    }
  }
  return next;
}

function checkWin(board: Cell[][], config: DifficultyConfig): boolean {
  for (let r = 0; r < config.rows; r++) {
    for (let c = 0; c < config.cols; c++) {
      if (!board[r][c].mine && !board[r][c].revealed) return false;
    }
  }
  return true;
}

export function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const config = DIFFICULTIES[difficulty];
  const [board, setBoard] = useState<Cell[][]>(() => emptyBoard(config));
  const [state, setState] = useState<GameState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [flagMode, setFlagMode] = useState(false);
  const [flagImage, setFlagImage] = useLocalStorageJSON<string | null>("minesweeper-flag-image", null);

  useEffect(() => {
    if (state !== "playing") return;
    const interval = setInterval(() => {
      setSeconds((s) => (s >= 999 ? s : s + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  function newGame(next: Difficulty = difficulty) {
    setDifficulty(next);
    setBoard(emptyBoard(DIFFICULTIES[next]));
    setState("idle");
    setSeconds(0);
    setFlagMode(false);
  }

  function setFlag(r: number, c: number, flagged: boolean) {
    setBoard((prev) => prev.map((row, ri) => row.map((cell, ci) => (ri === r && ci === c ? { ...cell, flagged } : cell))));
  }

  function reveal(r: number, c: number) {
    if (state === "won" || state === "lost") return;
    if (board[r][c].revealed) return;

    if (flagMode) {
      setFlag(r, c, !board[r][c].flagged);
      return;
    }
    if (board[r][c].flagged) return;

    let working = board;
    if (state === "idle") {
      working = placeMines(board, config, r, c);
      setState("playing");
    }

    if (working[r][c].mine) {
      const revealedAll = working.map((row) => row.map((cell) => (cell.mine ? { ...cell, revealed: true } : cell)));
      setBoard(revealedAll);
      setState("lost");
      return;
    }

    const flooded = floodReveal(working, config, r, c);
    setBoard(flooded);
    if (checkWin(flooded, config)) {
      setState("won");
    }
  }

  function toggleFlag(e: React.MouseEvent, r: number, c: number) {
    e.preventDefault();
    if (state === "won" || state === "lost" || board[r][c].revealed) return;
    setFlag(r, c, !board[r][c].flagged);
  }

  const flagCount = board.flat().filter((c) => c.flagged).length;
  const minesLeft = config.mines - flagCount;
  const gameOver = state === "won" || state === "lost";

  return (
    <div>
      <GameToolbar
        onRestart={() => newGame()}
        stats={
          <>
            <span className="inline-flex items-center gap-1.5">
              <Bomb className="h-3.5 w-3.5 shrink-0 text-rose-400" aria-hidden />
              <span className="font-semibold text-slate-100">{minesLeft}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="font-semibold text-slate-100">{seconds}s</span>
            </span>
          </>
        }
        settings={
          <div className="space-y-4">
            <SettingsSegment label="Difficulty" options={DIFFICULTY_OPTIONS} value={difficulty} onChange={(d) => newGame(d)} />
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Tap behavior</p>
              <button
                type="button"
                onClick={() => setFlagMode((v) => !v)}
                aria-pressed={flagMode}
                className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${
                  flagMode
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                    : "border-white/[0.08] bg-slate-800/80 text-slate-300 hover:text-white"
                }`}
              >
                {flagMode ? <Flag className="h-3.5 w-3.5 shrink-0" aria-hidden /> : <MousePointerClick className="h-3.5 w-3.5 shrink-0" aria-hidden />}
                {flagMode ? "Flag mode on — tap flags tiles" : "Flag mode off — tap reveals tiles"}
              </button>
              <p className="mt-1.5 text-[11px] text-slate-500">On desktop, right-click always flags regardless of this setting.</p>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Personalize</p>
              <ImageUploadSlot label="Flag marker" value={flagImage} onChange={setFlagImage} maxDim={64} />
            </div>
          </div>
        }
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900 p-2 sm:p-3">
        <div
          className="mx-auto grid w-full gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`, maxWidth: config.cols * 32 }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => reveal(r, c)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                disabled={gameOver}
                aria-label={cell.revealed ? (cell.mine ? "Mine" : `${cell.adjacent} adjacent mines`) : cell.flagged ? "Flagged cell" : "Hidden cell"}
                className={`flex aspect-square min-w-0 items-center justify-center overflow-hidden rounded-[3px] text-[10px] font-bold transition-colors sm:rounded-[4px] sm:text-xs ${
                  cell.revealed
                    ? cell.mine
                      ? "bg-rose-500/30 text-rose-300"
                      : "bg-slate-800 text-slate-300"
                    : "bg-slate-700/60 hover:bg-slate-700 active:bg-slate-600"
                }`}
              >
                {cell.revealed ? (
                  cell.mine ? (
                    <Bomb className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                  ) : cell.adjacent > 0 ? (
                    <span className={NUMBER_COLORS[cell.adjacent] ?? ""}>{cell.adjacent}</span>
                  ) : null
                ) : cell.flagged ? (
                  flagImage ? (
                    // eslint-disable-next-line @next/next/no-img-element -- dynamic client-side data URL
                    <img src={flagImage} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Flag className="h-3 w-3 text-amber-400 sm:h-3.5 sm:w-3.5" aria-hidden />
                  )
                ) : null}
              </button>
            ))
          )}
        </div>

        {state === "lost" ? (
          <GameOverlay tone="lose" title="Boom!" subtitle="You hit a mine." actionLabel="Try Again" onAction={() => newGame()} />
        ) : null}
        {state === "won" ? (
          <GameOverlay
            tone="win"
            title="Board cleared!"
            subtitle={`Cleared in ${seconds}s`}
            actionLabel="Play Again"
            onAction={() => newGame()}
          />
        ) : null}
      </div>

      {flagMode ? (
        <p className="mt-3 text-center text-xs font-medium text-amber-400">
          Flag mode is on — tap a tile to flag or unflag it.
        </p>
      ) : null}
    </div>
  );
}

const NUMBER_COLORS: Record<number, string> = {
  1: "text-blue-400",
  2: "text-emerald-400",
  3: "text-rose-400",
  4: "text-violet-400",
  5: "text-amber-400",
  6: "text-cyan-400",
  7: "text-slate-200",
  8: "text-slate-400",
};
