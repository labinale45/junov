"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  GiBee,
  GiButterfly,
  GiCactus,
  GiClover,
  GiDiceSixFacesSix,
  GiFlame,
  GiFox,
  GiMusicalNotes,
  GiOctopus,
  GiPalette,
  GiPuzzle,
  GiRainbowStar,
  GiRocket,
  GiStarFormation,
  GiTrophy,
  GiTurtle,
  GiUfo,
  GiWatermelon,
} from "react-icons/gi";
import { Trophy, Upload, X } from "lucide-react";
import { useLocalStorageNumber } from "@/hooks/use-local-storage-number";
import { useLocalStorageJSON } from "@/hooks/use-local-storage-json";
import { useFitSquareGrid } from "@/hooks/use-fit-square-grid";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { resizeImageFile } from "@/lib/game-image-utils";
import { GameOverlay } from "@/components/games/shared/GameOverlay";
import { GameToolbar } from "@/components/games/shared/GameToolbar";
import { SettingsSegment } from "@/components/games/shared/SettingsSegment";

const DEFAULT_SYMBOLS: { Icon: IconType; color: string }[] = [
  { Icon: GiRocket, color: "text-orange-400" },
  { Icon: GiPalette, color: "text-pink-400" },
  { Icon: GiMusicalNotes, color: "text-fuchsia-400" },
  { Icon: GiStarFormation, color: "text-yellow-400" },
  { Icon: GiFlame, color: "text-red-400" },
  { Icon: GiClover, color: "text-emerald-400" },
  { Icon: GiOctopus, color: "text-purple-400" },
  { Icon: GiFox, color: "text-orange-500" },
  { Icon: GiWatermelon, color: "text-rose-400" },
  { Icon: GiDiceSixFacesSix, color: "text-slate-200" },
  { Icon: GiRainbowStar, color: "text-violet-400" },
  { Icon: GiPuzzle, color: "text-blue-400" },
  { Icon: GiUfo, color: "text-cyan-400" },
  { Icon: GiButterfly, color: "text-pink-300" },
  { Icon: GiBee, color: "text-amber-400" },
  { Icon: GiCactus, color: "text-green-400" },
  { Icon: GiTrophy, color: "text-yellow-500" },
  { Icon: GiTurtle, color: "text-teal-400" },
];

const MAX_CUSTOM_IMAGES = DEFAULT_SYMBOLS.length;

type Difficulty = "4x4" | "6x6";

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: "4x4", label: "8 pairs" },
  { value: "6x6", label: "18 pairs" },
];

const GRID_CONFIG: Record<Difficulty, { cols: number; rows: number; gap: number; maxCell: number }> = {
  "4x4": { cols: 4, rows: 4, gap: 10, maxCell: 132 },
  "6x6": { cols: 6, rows: 6, gap: 7, maxCell: 92 },
};

type CardSymbol = { kind: "icon"; Icon: IconType; color: string } | { kind: "image"; src: string };

interface Card {
  id: number;
  symbol: CardSymbol;
  flipped: boolean;
  matched: boolean;
}

function buildDeck(difficulty: Difficulty, customImages: string[]): Card[] {
  const pairCount = difficulty === "4x4" ? 8 : 18;
  const symbols: CardSymbol[] = [];
  for (let i = 0; i < pairCount; i++) {
    if (i < customImages.length) {
      symbols.push({ kind: "image", src: customImages[i] });
    } else {
      const { Icon, color } = DEFAULT_SYMBOLS[i % DEFAULT_SYMBOLS.length];
      symbols.push({ kind: "icon", Icon, color });
    }
  }
  return [...symbols, ...symbols]
    .map((symbol, i) => ({ id: i, symbol, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5)
    .map((card, i) => ({ ...card, id: i }));
}

function symbolsEqual(a: CardSymbol, b: CardSymbol): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "image" && b.kind === "image") return a.src === b.src;
  if (a.kind === "icon" && b.kind === "icon") return a.Icon === b.Icon;
  return false;
}

function bestScoreKey(difficulty: Difficulty) {
  return `memory-match-best-${difficulty}`;
}

export function MemoryMatch() {
  const [customImages, setCustomImages] = useLocalStorageJSON<string[]>("memory-match-custom-images", []);
  const [difficulty, setDifficulty] = useState<Difficulty>("4x4");
  const [cards, setCards] = useState<Card[]>(() => buildDeck("4x4", []));
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [best, setBest] = useLocalStorageNumber(bestScoreKey(difficulty));
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);

  // Mount-only: the initial deck is built before localStorage's custom images are known
  // (SSR-safe default). Rebuild once, using the now-available saved photos, if any exist.
  const hasRebuiltForCustomImages = useRef(false);
  useEffect(() => {
    if (hasRebuiltForCustomImages.current) return;
    hasRebuiltForCustomImages.current = true;
    if (customImages.length > 0) {
      setCards(buildDeck("4x4", customImages));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!running || won) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running, won]);

  function newGame(nextDifficulty: Difficulty = difficulty) {
    setDifficulty(nextDifficulty);
    setCards(buildDeck(nextDifficulty, customImages));
    setSelected([]);
    setMoves(0);
    setSeconds(0);
    setRunning(false);
    setLocked(false);
    setWon(false);
  }

  async function handleUploadPhotos(files: FileList | null) {
    if (!files || files.length === 0) return;
    const room = MAX_CUSTOM_IMAGES - customImages.length;
    const picked = Array.from(files).slice(0, Math.max(0, room));
    if (picked.length === 0) return;
    const resized = await Promise.all(picked.map((f) => resizeImageFile(f, 160)));
    setCustomImages([...customImages, ...resized]);
  }

  function removePhoto(index: number) {
    setCustomImages(customImages.filter((_, i) => i !== index));
  }

  function flip(id: number) {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (!running) setRunning(true);

    const nextSelected = [...selected, id];
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));

    if (nextSelected.length === 2) {
      setLocked(true);
      const finalMoves = moves + 1;
      setMoves(finalMoves);
      const [firstId, secondId] = nextSelected;
      const first = cards.find((c) => c.id === firstId);
      const second = cards.find((c) => c.id === secondId);

      if (first && second && symbolsEqual(first.symbol, second.symbol)) {
        setTimeout(() => {
          setCards((prev) => {
            const next = prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, matched: true } : c));
            if (next.every((c) => c.matched)) {
              setWon(true);
              setRunning(false);
              if (best === null || finalMoves < best) {
                setBest(finalMoves);
              }
            }
            return next;
          });
          setSelected([]);
          setLocked(false);
        }, 350);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c))
          );
          setSelected([]);
          setLocked(false);
        }, 700);
      }
    } else {
      setSelected(nextSelected);
    }
  }

  const { containerRef, isFullscreen, isSupported, toggleFullscreen, portalContainer } = useFullscreen();

  const { cols, rows, gap, maxCell: baseMaxCell } = GRID_CONFIG[difficulty];
  const maxCell = isFullscreen ? baseMaxCell * 1.8 : baseMaxCell; // let the board grow further when the container is genuinely fullscreen
  const { wrapperRef, cellSize } = useFitSquareGrid({ cols, rows, gap, maxCell, minCell: 34 });
  const iconSize = Math.round(cellSize * 0.42);

  return (
    <div
      ref={containerRef}
      className={isFullscreen ? "mx-auto flex h-full w-full max-w-4xl flex-col gap-3 overflow-auto bg-[#0a0f1e] p-4 sm:p-6" : undefined}
    >
      <GameToolbar
        onRestart={() => newGame()}
        fullscreen={isSupported ? { isFullscreen, onToggle: toggleFullscreen } : undefined}
        settingsContainer={portalContainer}
        stats={
          <>
            <span>
              Moves: <span className="font-semibold text-slate-100">{moves}</span>
            </span>
            <span>
              Time: <span className="font-semibold text-slate-100">{seconds}s</span>
            </span>
            {best !== null ? (
              <span className="inline-flex items-center gap-1 text-amber-400">
                <Trophy className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Best: {best}
              </span>
            ) : null}
          </>
        }
        settings={
          <div className="space-y-4">
            <SettingsSegment label="Difficulty" options={DIFFICULTY_OPTIONS} value={difficulty} onChange={(d) => newGame(d)} />
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Personalize</p>
              {customImages.length > 0 ? (
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {customImages.map((src, i) => (
                    <div key={i} className="group relative h-9 w-9 overflow-hidden rounded-md border border-white/[0.08]">
                      {/* eslint-disable-next-line @next/next/no-img-element -- dynamic client-side data URL */}
                      <img src={src} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        aria-label="Remove photo"
                        className="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/[0.08] bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white">
                  <Upload className="h-3.5 w-3.5" aria-hidden />
                  Upload photos
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      void handleUploadPhotos(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
                {customImages.length > 0 ? (
                  <button type="button" onClick={() => setCustomImages([])} className="text-xs font-medium text-slate-500 hover:text-slate-300">
                    Reset to icons
                  </button>
                ) : null}
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
                {customImages.length > 0
                  ? `${customImages.length} of ${MAX_CUSTOM_IMAGES} photos — remaining pairs use default icons.`
                  : `Upload up to ${MAX_CUSTOM_IMAGES} photos to replace the icons with your own images.`}
              </p>
            </div>
          </div>
        }
      />

      <div className={isFullscreen ? "flex w-full flex-1 flex-col items-center justify-center overflow-auto" : "w-full"}>
        <div
          ref={wrapperRef}
          className="relative mx-auto overflow-hidden rounded-2xl"
          style={{ width: cellSize * cols + gap * (cols - 1) }}
        >
          <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gap }}>
            {cards.map((card) => {
              const revealed = card.flipped || card.matched;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => flip(card.id)}
                  disabled={revealed}
                  aria-label={revealed ? "Revealed card" : "Hidden card"}
                  className={`flex aspect-square min-w-0 items-center justify-center overflow-hidden rounded-lg border font-bold transition-all duration-200 ease-out sm:rounded-xl ${
                    card.matched
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : revealed
                        ? "border-violet-500/40 bg-violet-500/10 scale-100"
                        : "border-white/[0.08] bg-slate-900 hover:border-violet-500/30 active:bg-slate-800 hover:-translate-y-0.5"
                  }`}
                >
                  {revealed ? (
                    card.symbol.kind === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element -- dynamic client-side data URL
                      <img src={card.symbol.src} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <card.symbol.Icon className={card.symbol.color} style={{ width: iconSize, height: iconSize }} />
                    )
                  ) : null}
                </button>
              );
            })}
          </div>

          {won ? (
            <GameOverlay
              tone="win"
              title="Every pair matched!"
              subtitle={`${moves} moves · ${seconds}s`}
              actionLabel="Play Again"
              onAction={() => newGame()}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
