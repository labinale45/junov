"use client";

import { useEffect, useState } from "react";
import { GameOverlay } from "@/components/games/shared/GameOverlay";
import { GameToolbar } from "@/components/games/shared/GameToolbar";
import { ImageUploadSlot } from "@/components/games/shared/ImageUploadSlot";
import { SettingsSegment } from "@/components/games/shared/SettingsSegment";
import { useLocalStorageJSON } from "@/hooks/use-local-storage-json";

type Cell = "X" | "O" | null;
type Board = Cell[];
type Mode = "ai" | "friend";

const MODE_OPTIONS: { value: Mode; label: string }[] = [
  { value: "ai", label: "vs AI" },
  { value: "friend", label: "2 Player" },
];

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winnerOf(board: Board): { winner: Cell; line: number[] | null } {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
}

function isDraw(board: Board) {
  return board.every((c) => c !== null) && !winnerOf(board).winner;
}

/** Perfect-play minimax with depth-weighted scoring so the AI prefers faster wins and slower losses. */
function minimax(board: Board, depth: number, isMaximizing: boolean): number {
  const { winner } = winnerOf(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (isDraw(board)) return 0;

  const scores: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i]) continue;
    const next = [...board];
    next[i] = isMaximizing ? "O" : "X";
    scores.push(minimax(next, depth + 1, !isMaximizing));
  }
  return isMaximizing ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(board: Board): number {
  let best = -Infinity;
  let move = -1;
  for (let i = 0; i < board.length; i++) {
    if (board[i]) continue;
    const next = [...board];
    next[i] = "O";
    const score = minimax(next, 0, false);
    if (score > best) {
      best = score;
      move = i;
    }
  }
  return move;
}

export function TicTacToe() {
  const [mode, setMode] = useState<Mode>("ai");
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [score, setScore] = useState({ x: 0, o: 0, draw: 0 });
  const [markX, setMarkX] = useLocalStorageJSON<string | null>("tic-tac-toe-mark-x", null);
  const [markO, setMarkO] = useLocalStorageJSON<string | null>("tic-tac-toe-mark-o", null);

  const { winner, line } = winnerOf(board);
  const draw = isDraw(board);
  const gameOver = Boolean(winner) || draw;

  useEffect(() => {
    if (mode === "ai" && turn === "O" && !gameOver) {
      const t = setTimeout(() => {
        const move = bestMove(board);
        if (move !== -1) {
          setBoard((prev) => {
            const next = [...prev];
            next[move] = "O";
            return next;
          });
          setTurn("X");
        }
      }, 400);
      return () => clearTimeout(t);
    }
  }, [board, turn, mode, gameOver]);

  useEffect(() => {
    if (!gameOver) return;
    setScore((s) => {
      if (winner === "X") return { ...s, x: s.x + 1 };
      if (winner === "O") return { ...s, o: s.o + 1 };
      if (draw) return { ...s, draw: s.draw + 1 };
      return s;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  function play(i: number) {
    if (board[i] || gameOver || turn !== "X") return;
    if (mode === "ai") {
      const next = [...board];
      next[i] = "X";
      setBoard(next);
      setTurn("O");
    } else {
      const next = [...board];
      next[i] = turn;
      setBoard(next);
      setTurn(turn === "X" ? "O" : "X");
    }
  }

  function newRound() {
    setBoard(Array(9).fill(null));
    setTurn("X");
  }

  function switchMode(next: Mode) {
    setMode(next);
    setBoard(Array(9).fill(null));
    setTurn("X");
    setScore({ x: 0, o: 0, draw: 0 });
  }

  const turnStatus = mode === "ai" ? (turn === "X" ? "Your turn (X)" : "AI thinking…") : `${turn}'s turn`;

  const overlay = winner
    ? mode === "ai"
      ? winner === "X"
        ? { tone: "win" as const, title: "You Win!" }
        : { tone: "lose" as const, title: "AI Wins" }
      : { tone: "win" as const, title: `${winner} Wins!` }
    : draw
      ? { tone: "draw" as const, title: "It's a Draw" }
      : null;

  return (
    <div>
      <GameToolbar
        onRestart={newRound}
        restartLabel="New Round"
        stats={
          <>
            <span>
              X: <span className="font-semibold text-slate-100">{score.x}</span>
            </span>
            <span>
              O: <span className="font-semibold text-slate-100">{score.o}</span>
            </span>
            <span>
              Draws: <span className="font-semibold text-slate-100">{score.draw}</span>
            </span>
          </>
        }
        settings={
          <div className="space-y-4">
            <SettingsSegment label="Mode" options={MODE_OPTIONS} value={mode} onChange={switchMode} />
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Personalize</p>
              <div className="space-y-2.5">
                <ImageUploadSlot label="Your mark (X)" value={markX} onChange={setMarkX} />
                <ImageUploadSlot label="Opponent mark (O)" value={markO} onChange={setMarkO} />
              </div>
            </div>
          </div>
        }
      />

      {!gameOver ? (
        <p className="mb-3 text-center text-sm font-semibold text-slate-300 sm:text-base">{turnStatus}</p>
      ) : null}

      <div className="relative overflow-hidden rounded-2xl">
        <div className="mx-auto grid max-w-xs grid-cols-3 gap-2.5">
          {board.map((cell, i) => {
            const isWinning = line?.includes(i);
            const markSrc = cell === "X" ? markX : cell === "O" ? markO : null;
            return (
              <button
                key={i}
                type="button"
                onClick={() => play(i)}
                disabled={Boolean(cell) || gameOver || (mode === "ai" && turn !== "X")}
                aria-label={cell ? `Cell ${i + 1}: ${cell}` : `Cell ${i + 1}: empty`}
                className={`flex aspect-square items-center justify-center overflow-hidden rounded-xl border text-4xl font-bold transition-all duration-200 ease-out ${
                  isWinning
                    ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                    : "border-white/[0.08] bg-slate-900 text-slate-100 hover:border-violet-500/30 disabled:hover:border-white/[0.08]"
                } ${cell === "X" ? "text-blue-400" : cell === "O" ? "text-violet-400" : ""}`}
              >
                {markSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- dynamic client-side data URL
                  <img src={markSrc} alt="" className="h-full w-full object-cover" />
                ) : (
                  cell
                )}
              </button>
            );
          })}
        </div>

        {overlay ? (
          <GameOverlay tone={overlay.tone} title={overlay.title} actionLabel="Play Again" onAction={newRound} />
        ) : null}
      </div>
    </div>
  );
}
