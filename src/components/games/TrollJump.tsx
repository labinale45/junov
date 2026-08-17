"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, ChevronLeft, ChevronRight, PartyPopper, Skull, Sparkles } from "lucide-react";
import { GameToolbar } from "@/components/games/shared/GameToolbar";
import { ImageCropModal } from "@/components/games/shared/ImageCropModal";
import { ImageUploadSlot } from "@/components/games/shared/ImageUploadSlot";
import { SettingsSegment } from "@/components/games/shared/SettingsSegment";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { useLocalStorageJSON } from "@/hooks/use-local-storage-json";

type HeadShape = "round" | "square" | "diamond";

const HEAD_SHAPE_OPTIONS: { value: HeadShape; label: string }[] = [
  { value: "round", label: "Round" },
  { value: "square", label: "Square" },
  { value: "diamond", label: "Diamond" },
];

const TS = 40; // tile size
const COLS = 20;
const ROWS = 12;
const GRAV = 2000;
const MOVE = 250;
const ACCEL = 1800; // how fast horizontal speed ramps toward MOVE (px/s^2)
const JUMP = 566; // tuned so max rise is ~2 tiles: JUMP^2 / (2*GRAV) ≈ 2*TS
const PW = 22; // player width
const PH = 30; // player height

interface ShiftPairDef {
  /** Tiles solid while this pair is in its "a" phase. */
  a: [number, number][];
  /** Tiles solid while in "b" phase — use an out-of-grid coordinate like [-1, -1] for "nowhere" (platform just vanishes). */
  b: [number, number][];
  /** Seconds spent in each phase before swapping. */
  interval: number;
}

interface LevelDef {
  name: string;
  note: string;
  grid: string[];
  /** Platforms whose solid tiles alternate between two positions on a timer. Defined by coordinates, not grid chars. */
  shiftPairs?: ShiftPairDef[];
}

// '#' solid   '^' floor spikes   'P' start   'G' real goal
// 'x' vanishing floor (crumbles after you step on it)   'v' hidden floor spike (pops after you land)
// 'B' fake block (looks solid, you drop through)   'a' auto-collapsing bridge (falls away on its own once armed)
// 'T' ceiling spike (drops when you pass under)
// 'D' mystery door (looks like the goal — exactly ONE is real, re-rolled every attempt)
// 'I' invisible wall (solid, drawn as nothing — you only find it by walking into it)
// 'Z' rising spikes (safe until you get close, then rise and strike — per contiguous run)
// 'q' proximity floor (vanishes the instant you get close — no touch, no delay, no warning)
const LEVELS: LevelDef[] = [
  {
    name: "Just wait there",
    note: "A straight walk to the door. The floor won't let you keep it that simple — and neither will the door.",
    grid: [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "P                  G",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
    ],
  },
  {
    name: "Trust it (sometimes)",
    note: "Same walk, same floor. This time the door isn't lying — waiting for the spike to drop is what gets you through.",
    grid: [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "P                  G",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
    ],
  },
  {
    name: "Too easy?",
    note: "No gaps, no spikes, no lies this time. Sometimes everything really is exactly what it looks like.",
    grid: [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "P                  G",
      "####################",
      "####################",
      "####################",
      "####################",
      "####################",
    ],
  },
  {
    name: "Left is right",
    note: "Same floor, same door, same trick — but your controls got flipped. And there's nowhere behind you to retreat to.",
    grid: [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "^P                 G",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
    ],
  },
  {
    name: "Now you see it",
    note: "Same gap as before. This time it doesn't give up when you land — it keeps chasing your feet for a few more steps.",
    grid: [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "P                  G",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
      "#########qq#########",
    ],
  },
  {
    name: "Blink and you're dead",
    note: "The spikes aren't always there. Time it.",
    grid: [
      "                    ",
      "                    ",
      "                T   ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "P        ZZZZZ    G ",
      "####################",
      "####################",
    ],
  },
  {
    name: "Now you don't",
    note: "The bridge is only there half the time. Move fast, or fall onto what's under it.",
    grid: [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "P                 G ",
      "########    ########",
      "########^^^^########",
    ],
    shiftPairs: [
      {
        a: [
          [10, 8],
          [10, 9],
          [10, 10],
          [10, 11],
        ],
        b: [[-1, -1]],
        interval: 1.1,
      },
    ],
  },
  {
    name: "Everything, always",
    note: "A wall you can't see, spikes that rise when you get close, a bridge that isn't always there, and two doors — one's a lie.",
    grid: [
      "                    ",
      "                    ",
      "   T                ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "P    I  ZZ       DD ",
      "############   #####",
      "############^^^#####",
    ],
    shiftPairs: [
      {
        a: [
          [10, 12],
          [10, 13],
          [10, 14],
        ],
        b: [[-1, -1]],
        interval: 1.1,
      },
    ],
  },
];

const DEATH_QUIPS = [
  "Nice try.",
  "The floor lied. Shocking.",
  "Skill issue.",
  "Big oof.",
  "Gravity: undefeated.",
  "Told you not to trust it.",
  "That was rude of the floor.",
  "10/10 fall.",
  "The door is laughing at you.",
  "Should've seen that coming.",
];
const LEVEL_CLEAR_QUIPS = [
  "Somehow, that worked.",
  "The floor is very upset right now.",
  "Suspiciously smooth.",
  "One less lie to worry about.",
  "You beat the trap. This time.",
  "The door didn't see that coming.",
];
const GAME_WIN_QUIPS = [
  "Certified floor-doubter.",
  "You trusted nothing, and it worked.",
  "The game has nothing left to lie about.",
  "Professional skeptic. Well played.",
];
function pickQuip(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

function dispatchKeyEvent(type: "keydown" | "keyup", key: string) {
  window.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true }));
}

/** On-screen d-pad/jump button for touch devices — dispatches real KeyboardEvents so the game's
 * existing window-level key listeners handle it with zero changes to the engine itself. */
function TouchControlButton({
  keyName,
  ariaLabel,
  className,
  children,
}: {
  keyName: string;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onPointerDown={(e) => {
        e.preventDefault();
        dispatchKeyEvent("keydown", keyName);
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        dispatchKeyEvent("keyup", keyName);
      }}
      onPointerLeave={() => dispatchKeyEvent("keyup", keyName)}
      onPointerCancel={() => dispatchKeyEvent("keyup", keyName)}
      onContextMenu={(e) => e.preventDefault()}
      className={`touch-none select-none rounded-full border border-white/10 bg-slate-900/70 text-slate-100 backdrop-blur-sm transition-colors active:bg-violet-600/60 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  onGround: boolean;
  face: 1 | -1;
  walkPhase: number;
}

/** One shared shape covers every trap tile type; fields not used by a given type stay undefined. */
interface TrapState {
  type: "x" | "v" | "T" | "a" | "Z" | "q";
  // 'x' vanishing floor
  touched?: boolean;
  timer?: number;
  gone?: boolean;
  delay?: number;
  // 'q' proximity floor — reuses `gone` above; `falling`/`fallY` drive its collapse animation
  falling?: boolean;
  fallY?: number;
  // 'v' hidden floor spike
  triggered?: boolean;
  deadly?: boolean;
  // 'T' ceiling dropper
  r?: number;
  c?: number;
  y?: number;
  vy?: number;
  dropping?: boolean;
  margin?: number;
  // 'a' auto-collapsing bridge, 'Z' rising spikes — index into shrinkRuns / blinkRuns
  run?: number;
}

interface ShrinkRun {
  keys: string[];
  armed: boolean;
  timer: number;
  next: number;
  interval: number;
}

/** A contiguous run of 'q' tiles that vanishes the instant the player gets within range — no telegraphing, no delay. */
interface CollapseRun {
  keys: string[];
  minCol: number;
  maxCol: number;
  triggerRange: number;
  triggered: boolean;
}

/**
 * A contiguous run of 'Z' tiles that rises together once the player gets close, rather than
 * rising only once the player is near, not on a blind global timer. idle (safe, waiting) -> warning (safe, telegraphing) ->
 * active (deadly) -> cooldown (safe, can't re-arm yet) -> back to idle.
 */
interface BlinkRun {
  keys: string[];
  minCol: number;
  maxCol: number;
  triggerRange: number;
  warnDelay: number;
  activeDuration: number;
  cooldownDuration: number;
  state: "idle" | "warning" | "active" | "cooldown";
  timer: number;
}
function blinkActive(run: BlinkRun): boolean {
  return run.state === "active";
}

interface ShiftPairState extends ShiftPairDef {
  phase: number;
  elapsed: number;
}
function shiftActiveSide(pair: ShiftPairState): "a" | "b" {
  const t = (pair.elapsed + pair.phase) % (pair.interval * 2);
  return t < pair.interval ? "a" : "b";
}

interface EngineState {
  level: number;
  deaths: number;
  started: boolean;
  won: boolean;
  dead: boolean;
  deadTimer: number;
  realDoor: string | null;
  /** Level 1's collapsing-floor troll: true once the player has safely crossed the gap. */
  waitArmed: boolean;
  /** True once the "wait" punishment spike has already fallen, so it can't re-trigger. */
  waitDropped: boolean;
  /** Seconds the player has stood still since waitArmed became true. */
  idleTimer: number;
  /** Random one-liner shown over the death flash — re-picked on every death. */
  deathQuip: string;
  /** Level 2: true once the player has crossed the collapsed gap — shows the "WAIT" prompt. */
  crossedGap: boolean;
  /** Level 2's door guardian: true once the player has gotten close enough to arm it. */
  guardArmed: boolean;
  /** Whether the guardian spike is currently up (blocking + deadly) or down (safe to pass). */
  guardUp: boolean;
  /** Seconds spent in the current guardUp/guardDown phase. */
  guardTimer: number;
  /** Level 5's troll: once the player crosses the original gap, the collapse keeps chasing their feet for a few more tiles before giving up. */
  chaseArmed: boolean;
  /** Remaining columns (in order, left to right) the chase still needs to collapse. */
  chaseCols: number[];
  /** Seconds the player has stood on the current chase column, waiting to trigger its drop. */
  chaseColTimer: number;
}

interface OverlayState {
  tone: "clear" | "win";
  title: string;
  text: string;
  btnLabel: string;
  onAction: () => void;
  /** Random funny aside shown above the title. */
  quip: string;
}

const START_TEXT =
  "A platformer that likes to lie to you. Floors vanish, blocks aren't there, walls you can't see block your way, spikes rise when you get close, bridges phase in and out, and at least one exit is a trap. Reach the real glowing door.";

export function TrollJump() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const restartRef = useRef<() => void>(() => {});
  const startActionRef = useRef<() => void>(() => {});
  const jumpToLevelRef = useRef<(i: number) => void>(() => {});
  const [hud, setHud] = useState({ level: 1, total: LEVELS.length, name: LEVELS[0].name, deaths: 0 });
  const [started, setStarted] = useState(false);
  const [overlay, setOverlay] = useState<OverlayState | null>(null);
  const [unlockedThrough, setUnlockedThrough] = useState(0);
  const [headImage, setHeadImage] = useLocalStorageJSON<string | null>("troll-jump-head-image", null);
  const [headShape, setHeadShape] = useLocalStorageJSON<HeadShape>("troll-jump-head-shape", "round");
  const [cropFile, setCropFile] = useState<File | null>(null);

  // Bridges into the mount-only engine effect below, which reads these live via .current
  // rather than depending on headImage/headShape directly (see restartRef etc. for the
  // same pattern already used in this file).
  const headImgRef = useRef<HTMLImageElement | null>(null);
  const headShapeRef = useRef<HeadShape>(headShape);

  useEffect(() => {
    headShapeRef.current = headShape;
  }, [headShape]);

  useEffect(() => {
    if (!headImage) {
      headImgRef.current = null;
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) headImgRef.current = img;
    };
    img.src = headImage;
    return () => {
      cancelled = true;
    };
  }, [headImage]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctxEl = canvasEl.getContext("2d");
    if (!ctxEl) return;
    // Re-bound with explicit non-nullable types so functions declared below (which TS
    // does not narrow across closures) still see these as always-defined.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctxEl;

    const gs: EngineState = {
      level: 0,
      deaths: 0,
      started: false,
      won: false,
      dead: false,
      deadTimer: 0,
      realDoor: null,
      waitArmed: false,
      waitDropped: false,
      idleTimer: 0,
      deathQuip: "",
      crossedGap: false,
      guardArmed: false,
      guardUp: false,
      guardTimer: 0,
      chaseArmed: false,
      chaseCols: [],
      chaseColTimer: 0,
    };
    const player: PlayerState = { x: 0, y: 0, vx: 0, vy: 0, onGround: false, face: 1, walkPhase: 0 };
    let grid: string[][] = [];
    let traps: Record<string, TrapState> = {};
    let shrinkRuns: ShrinkRun[] = [];
    let blinkRuns: BlinkRun[] = [];
    let collapseRuns: CollapseRun[] = [];
    let goalPos: { r: number; c: number } | null = null;
    let shiftPairsState: ShiftPairState[] = [];
    let shiftTileMap: Record<string, { pairIndex: number; side: "a" | "b" }> = {};
    const start = { x: 0, y: 0 };
    let flash = 0;
    let lastWalkStep = 0;
    const keys: Record<string, boolean> = {};
    let audioCtx: AudioContext | null = null;

    /** Tiny synthesized-tone player shared by every sound effect — no audio assets needed. */
    function playTone(freqStart: number, freqEnd: number, duration: number, type: OscillatorType, volume: number) {
      try {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === "suspended") audioCtx.resume();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freqStart, now);
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), now + duration);
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + duration);
      } catch {
        // Audio is a nice-to-have — never let it break the game.
      }
    }

    function playDeathSound() {
      playTone(220, 55, 0.4, "sawtooth", 0.18);
    }
    function playJumpSound() {
      playTone(320, 560, 0.12, "triangle", 0.09);
    }
    function playWalkSound() {
      playTone(140, 100, 0.05, "square", 0.035);
    }
    function playTrapFallSound() {
      playTone(260, 90, 0.22, "sawtooth", 0.1);
    }
    function playTrapAppearSound() {
      playTone(160, 640, 0.09, "triangle", 0.12);
    }

    function tileAt(r: number, c: number): string {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return " ";
      return grid[r][c];
    }
    function isSolid(r: number, c: number): boolean {
      const sp = shiftTileMap[`${r},${c}`];
      if (sp) return shiftActiveSide(shiftPairsState[sp.pairIndex]) === sp.side;
      const t = tileAt(r, c);
      if (t === "#" || t === "v" || t === "I") return true;
      if (t === "x" || t === "a") {
        const s = traps[`${r},${c}`];
        return !(s && s.gone);
      }
      if (t === "q") {
        const s = traps[`${r},${c}`];
        return !(s && (s.gone || s.falling));
      }
      return false;
    }

    function updateHud() {
      setHud({ level: gs.level + 1, total: LEVELS.length, name: LEVELS[gs.level].name, deaths: gs.deaths });
    }

    function loadLevel(i: number) {
      gs.level = i;
      gs.won = false;
      gs.dead = false;
      gs.deadTimer = 0;
      gs.waitArmed = false;
      gs.waitDropped = false;
      gs.idleTimer = 0;
      gs.crossedGap = false;
      gs.guardArmed = false;
      gs.guardUp = false;
      gs.guardTimer = 0;
      gs.chaseArmed = false;
      gs.chaseCols = [];
      gs.chaseColTimer = 0;
      goalPos = null;
      grid = LEVELS[i].grid.map((row) => {
        const arr = row.split("");
        while (arr.length < COLS) arr.push(" ");
        return arr.slice(0, COLS);
      });
      traps = {};
      const doorKeys: string[] = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const t = grid[r][c];
          const key = `${r},${c}`;
          if (t === "P") {
            start.x = c * TS + (TS - PW) / 2;
            start.y = r * TS + (TS - PH);
            grid[r][c] = " ";
          }
          if (t === "x") traps[key] = { type: "x", touched: false, timer: 0, gone: false, delay: 0.3 + Math.random() * 0.22 };
          if (t === "v") traps[key] = { type: "v", triggered: false, timer: 0, deadly: false, delay: 0.12 + Math.random() * 0.2 };
          if (t === "T") traps[key] = { type: "T", r, c, y: r * TS, vy: 0, dropping: false, gone: false, margin: Math.random() * 18 };
          if (t === "a") traps[key] = { type: "a", gone: false, run: -1 };
          if (t === "D") doorKeys.push(key);
          if (t === "G") goalPos = { r, c };
        }
      }
      gs.realDoor = doorKeys.length ? doorKeys[Math.floor(Math.random() * doorKeys.length)] : null;

      shrinkRuns = [];
      blinkRuns = [];
      collapseRuns = [];
      for (let rr = 0; rr < ROWS; rr++) {
        let cc = 0;
        while (cc < COLS) {
          const ch = grid[rr][cc];
          if (ch === "a" || ch === "Z") {
            const startCol = cc;
            const runKeys: string[] = [];
            while (cc < COLS && grid[rr][cc] === ch) {
              runKeys.push(`${rr},${cc}`);
              cc++;
            }
            if (ch === "a") {
              const idx = shrinkRuns.length;
              shrinkRuns.push({ keys: runKeys, armed: false, timer: 0, next: 0, interval: 0.32 });
              for (const rk of runKeys) {
                const trap = traps[rk];
                if (trap) trap.run = idx;
              }
            } else {
              const idx = blinkRuns.length;
              blinkRuns.push({
                keys: runKeys,
                minCol: startCol,
                maxCol: cc - 1,
                triggerRange: TS * (1.4 + Math.random() * 0.6),
                warnDelay: 0.22 + Math.random() * 0.14,
                activeDuration: 0.7 + Math.random() * 0.3,
                cooldownDuration: 0.5 + Math.random() * 0.3,
                state: "idle",
                timer: 0,
              });
              for (const rk of runKeys) traps[rk] = { type: "Z", run: idx };
            }
          } else cc++;
        }
      }

      // 'q' tiles group by 2D adjacency (not just horizontal runs) so a stacked chunk — the
      // collapsing floor plus everything beneath it — falls away together as one piece.
      const visitedQ = new Set<string>();
      for (let rr = 0; rr < ROWS; rr++) {
        for (let cc = 0; cc < COLS; cc++) {
          if (grid[rr][cc] !== "q" || visitedQ.has(`${rr},${cc}`)) continue;
          const stack: [number, number][] = [[rr, cc]];
          const runKeys: string[] = [];
          let minCol = cc;
          let maxCol = cc;
          while (stack.length) {
            const [sr, sc] = stack.pop()!;
            const sk = `${sr},${sc}`;
            if (sr < 0 || sr >= ROWS || sc < 0 || sc >= COLS || visitedQ.has(sk) || grid[sr][sc] !== "q") continue;
            visitedQ.add(sk);
            runKeys.push(sk);
            minCol = Math.min(minCol, sc);
            maxCol = Math.max(maxCol, sc);
            stack.push([sr + 1, sc], [sr - 1, sc], [sr, sc + 1], [sr, sc - 1]);
          }
          collapseRuns.push({ keys: runKeys, minCol, maxCol, triggerRange: TS * 0.75, triggered: false });
          for (const rk of runKeys) traps[rk] = { type: "q", gone: false, falling: false, fallY: 0 };
        }
      }

      // Level 5's troll: the chase picks up right where the original gap ends, and covers the
      // next 4 columns of floor.
      if (i === 4 && collapseRuns[0]) {
        const gr = collapseRuns[0];
        gs.chaseCols = [gr.maxCol + 1, gr.maxCol + 2, gr.maxCol + 3, gr.maxCol + 4];
      }

      shiftPairsState = (LEVELS[i].shiftPairs ?? []).map((p) => ({
        ...p,
        phase: Math.random() * p.interval * 2,
        elapsed: 0,
      }));
      shiftTileMap = {};
      shiftPairsState.forEach((pair, idx) => {
        pair.a.forEach(([r, c]) => {
          shiftTileMap[`${r},${c}`] = { pairIndex: idx, side: "a" };
        });
        pair.b.forEach(([r, c]) => {
          if (r >= 0 && c >= 0) shiftTileMap[`${r},${c}`] = { pairIndex: idx, side: "b" };
        });
      });

      player.x = start.x;
      player.y = start.y;
      player.vx = 0;
      player.vy = 0;
      player.onGround = false;
      player.face = 1;
      player.walkPhase = 0;
      lastWalkStep = 0;
      updateHud();
    }

    function killPlayer() {
      if (gs.dead) return;
      gs.dead = true;
      gs.deadTimer = 0.85;
      gs.deaths++;
      playDeathSound();
      gs.deathQuip = pickQuip(DEATH_QUIPS);
      flash = 0.8;
      updateHud();
    }

    function winLevel() {
      if (gs.level < LEVELS.length - 1) {
        const next = gs.level + 1;
        setUnlockedThrough((u) => Math.max(u, next));
        setOverlay({
          tone: "clear",
          title: `Level ${gs.level + 1} clear!`,
          text: LEVELS[next].note,
          btnLabel: "Next Level",
          quip: pickQuip(LEVEL_CLEAR_QUIPS),
          onAction: () => {
            setOverlay(null);
            loadLevel(next);
          },
        });
        gs.won = true;
      } else {
        gs.won = true;
        setOverlay({
          tone: "win",
          title: "You beat it!",
          text: `You survived all the lies in ${gs.deaths} death${gs.deaths === 1 ? "" : "s"}. Nicely done.`,
          btnLabel: "Play Again",
          quip: pickQuip(GAME_WIN_QUIPS),
          onAction: () => {
            setOverlay(null);
            gs.deaths = 0;
            loadLevel(0);
          },
        });
      }
    }

    function resolveAxis(isX: boolean) {
      const r0 = Math.floor(player.y / TS);
      const r1 = Math.floor((player.y + PH - 0.01) / TS);
      const c0 = Math.floor(player.x / TS);
      const c1 = Math.floor((player.x + PW - 0.01) / TS);
      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          if (!isSolid(r, c)) continue;
          const tx = c * TS;
          const ty = r * TS;
          if (player.x < tx + TS && player.x + PW > tx && player.y < ty + TS && player.y + PH > ty) {
            if (isX) {
              if (player.vx > 0) player.x = tx - PW;
              else if (player.vx < 0) player.x = tx + TS;
              player.vx = 0;
            } else {
              if (player.vy > 0) {
                player.y = ty - PH;
                player.onGround = true;
              } else if (player.vy < 0) {
                player.y = ty + TS;
              }
              player.vy = 0;
            }
          }
        }
      }
    }

    function checkHazards() {
      if (player.y > ROWS * TS + 40) {
        killPlayer();
        return;
      }
      const r0 = Math.floor(player.y / TS);
      const r1 = Math.floor((player.y + PH - 0.01) / TS);
      const c0 = Math.floor(player.x / TS);
      const c1 = Math.floor((player.x + PW - 0.01) / TS);
      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          const t = tileAt(r, c);
          const overlap = player.x < c * TS + TS && player.x + PW > c * TS && player.y < r * TS + TS && player.y + PH > r * TS;
          if (!overlap) continue;
          if (gs.level === 1 && gs.guardUp && goalPos && r === goalPos.r && c === goalPos.c - 1 && player.onGround) {
            killPlayer();
            return;
          }
          if (t === "^" || t === "F") {
            killPlayer();
            return;
          }
          if (t === "D") {
            if (`${r},${c}` === gs.realDoor) winLevel();
            else killPlayer();
            return;
          }
          if (t === "v") {
            const s = traps[`${r},${c}`];
            if (s && s.deadly) {
              killPlayer();
              return;
            }
          }
          if (t === "Z") {
            const s = traps[`${r},${c}`];
            const run = s && s.run !== undefined ? blinkRuns[s.run] : undefined;
            if (run && blinkActive(run)) {
              killPlayer();
              return;
            }
          }
          if (t === "G") {
            const guardCol = goalPos ? goalPos.c - 1 : -1;
            const jumpingOver = gs.level === 1 && gs.guardUp && !player.onGround && player.x + PW / 2 >= guardCol * TS;
            if (jumpingOver) {
              killPlayer();
            } else {
              winLevel();
            }
            return;
          }
        }
      }
    }

    function update(dt: number) {
      if (flash > 0) flash = Math.max(0, flash - dt * 2.5);
      if (!gs.started || gs.won) return;

      if (gs.dead) {
        gs.deadTimer -= dt;
        if (gs.deadTimer <= 0) loadLevel(gs.level);
        return;
      }

      let left = keys["arrowleft"] || keys["a"];
      let right = keys["arrowright"] || keys["d"];
      if (gs.level === 3) [left, right] = [right, left]; // level 4's troll: the controls are flipped
      const targetVx = (right ? MOVE : 0) - (left ? MOVE : 0);
      if (player.vx < targetVx) player.vx = Math.min(targetVx, player.vx + ACCEL * dt);
      else if (player.vx > targetVx) player.vx = Math.max(targetVx, player.vx - ACCEL * dt);
      if (player.vx > 0) player.face = 1;
      else if (player.vx < 0) player.face = -1;

      const jump = keys["arrowup"] || keys["w"] || keys[" "];
      if (jump && player.onGround) {
        player.vy = -JUMP;
        player.onGround = false;
        playJumpSound();
      }

      player.vy += GRAV * dt;
      if (player.vy > 900) player.vy = 900;

      player.x += player.vx * dt;
      resolveAxis(true);

      player.onGround = false;
      player.y += player.vy * dt;
      resolveAxis(false);

      if (player.x < 0) player.x = 0;
      if (player.x + PW > COLS * TS) player.x = COLS * TS - PW;

      if (player.onGround) {
        const fr = Math.floor((player.y + PH + 1) / TS);
        const c0 = Math.floor((player.x + 2) / TS);
        const c1 = Math.floor((player.x + PW - 2) / TS);
        for (let c = c0; c <= c1; c++) {
          const s = traps[`${fr},${c}`];
          if (!s) continue;
          if (s.type === "x") s.touched = true;
          if (s.type === "v" && !s.triggered) s.triggered = true;
          if (s.type === "a" && s.run !== undefined && s.run >= 0) shrinkRuns[s.run].armed = true;
        }
      }

      for (const key in traps) {
        const t = traps[key];
        if (t.type === "x" && t.touched && !t.gone) {
          t.timer = (t.timer ?? 0) + dt;
          if (t.timer > (t.delay ?? 0)) {
            t.gone = true;
            playTrapFallSound();
          }
        }
        if (t.type === "v" && t.triggered && !t.deadly) {
          t.timer = (t.timer ?? 0) + dt;
          if (t.timer > (t.delay ?? 0)) t.deadly = true;
        }
        if (t.type === "T" && !t.gone) {
          if (!t.dropping) {
            const cellCX = (t.c ?? 0) * TS + TS / 2;
            const pcx = player.x + PW / 2;
            if (Math.abs(pcx - cellCX) < TS / 2 + (t.margin ?? 0) && player.y + PH > (t.y ?? 0) + TS * 0.5) {
              t.dropping = true;
              playTrapFallSound();
            }
          } else {
            t.vy = (t.vy ?? 0) + 2600 * dt;
            t.y = (t.y ?? 0) + (t.vy ?? 0) * dt;
            if (t.y > ROWS * TS) {
              t.gone = true;
            } else {
              const sx0 = (t.c ?? 0) * TS + 5;
              const sx1 = (t.c ?? 0) * TS + TS - 5;
              const sy0 = t.y;
              const sy1 = t.y + TS * 1.1;
              if (player.x < sx1 && player.x + PW > sx0 && player.y < sy1 && player.y + PH > sy0) killPlayer();
            }
          }
        }
      }

      for (const run of shrinkRuns) {
        if (run.armed && run.next < run.keys.length) {
          run.timer += dt;
          while (run.next < run.keys.length && run.timer > (run.next + 1) * run.interval) {
            const kk = run.keys[run.next];
            const trap = traps[kk];
            if (trap) trap.gone = true;
            run.next++;
          }
        }
      }

      for (const run of collapseRuns) {
        if (run.triggered) continue;
        const runMinX = run.minCol * TS;
        const runMaxX = (run.maxCol + 1) * TS;
        const pcx = player.x + PW / 2;
        if (pcx > runMinX - run.triggerRange && pcx < runMaxX + run.triggerRange) {
          run.triggered = true;
          playTrapFallSound();
          for (const kk of run.keys) {
            const trap = traps[kk];
            if (trap) trap.falling = true;
          }
        }
      }

      for (const key in traps) {
        const t = traps[key];
        if (t.type === "q" && t.falling && !t.gone) {
          t.fallY = (t.fallY ?? 0) + TS * 7 * dt;
          if ((t.fallY ?? 0) > TS * 1.5) t.gone = true;
        }
      }

      // Level 1's troll (also reused verbatim by level 4): once the player has safely crossed
      // the collapsed gap, a "WAIT" prompt appears over the door — standing still to obey it is
      // exactly what gets punished.
      if (gs.level === 0 || gs.level === 3) {
        const gapRun = collapseRuns[0];
        if (gapRun && !gs.waitArmed && gapRun.triggered && player.onGround && player.x > (gapRun.maxCol + 1) * TS) {
          gs.waitArmed = true;
        }
        if (gs.waitArmed && !gs.waitDropped) {
          if (player.onGround && Math.abs(player.vx) < 5) {
            gs.idleTimer += dt;
            if (gs.idleTimer > 0.5) {
              const col = Math.floor((player.x + PW / 2) / TS);
              traps["wait-drop"] = { type: "T", r: 0, c: col, y: 0, vy: 0, dropping: true, gone: false, margin: 4 };
              playTrapFallSound();
              gs.waitDropped = true;
            }
          } else {
            gs.idleTimer = 0;
          }
        }
      }

      // Level 2's troll: get close to the door and a spike rises to block it — up for 5s,
      // then down for a short safe window, then back up again if you didn't make it through.
      if (gs.level === 1 && goalPos) {
        const gapRun = collapseRuns[0];
        if (gapRun && !gs.crossedGap && gapRun.triggered && player.onGround && player.x > (gapRun.maxCol + 1) * TS) {
          gs.crossedGap = true;
        }

        const doorCX = goalPos.c * TS + TS / 2;
        const pcx = player.x + PW / 2;
        if (!gs.guardArmed && Math.abs(pcx - doorCX) < TS * 2.5) {
          gs.guardArmed = true;
          gs.guardUp = true;
          gs.guardTimer = 0;
          playTrapAppearSound();
        }
        if (gs.guardArmed) {
          gs.guardTimer += dt;
          if (gs.guardUp && gs.guardTimer > 5) {
            gs.guardUp = false;
            gs.guardTimer = 0;
          } else if (!gs.guardUp && gs.guardTimer > 2) {
            gs.guardUp = true;
            gs.guardTimer = 0;
            playTrapAppearSound();
          }
        }
      }

      // Level 5's troll: the collapse doesn't stop at the original gap — once the player lands
      // past it, the floor keeps giving out right under their feet, chasing them column by
      // column, for a few more tiles before it finally gives up.
      if (gs.level === 4) {
        const gapRun = collapseRuns[0];
        if (gapRun && !gs.chaseArmed && gapRun.triggered && player.onGround && player.x > (gapRun.maxCol + 1) * TS) {
          gs.chaseArmed = true;
        }
        if (gs.chaseArmed && gs.chaseCols.length > 0 && player.onGround) {
          const col = Math.floor((player.x + PW / 2) / TS);
          const target = gs.chaseCols[0];
          if (col === target) {
            gs.chaseColTimer += dt;
            if (gs.chaseColTimer > 0.28) {
              gs.chaseCols.shift();
              gs.chaseColTimer = 0;
              for (let r = 7; r < ROWS; r++) {
                const key = `${r},${target}`;
                grid[r][target] = "q";
                traps[key] = { type: "q", gone: false, falling: true, fallY: 0 };
              }
              playTrapFallSound();
            }
          } else if (col > target) {
            gs.chaseCols.shift();
            gs.chaseColTimer = 0;
          } else {
            gs.chaseColTimer = 0;
          }
        }
      }

      for (const run of blinkRuns) {
        run.timer += dt;
        const runMinX = run.minCol * TS;
        const runMaxX = (run.maxCol + 1) * TS;
        const pcx = player.x + PW / 2;
        const near = pcx > runMinX - run.triggerRange && pcx < runMaxX + run.triggerRange;
        if (run.state === "idle") {
          if (near) {
            run.state = "warning";
            run.timer = 0;
          }
        } else if (run.state === "warning" && run.timer > run.warnDelay) {
          run.state = "active";
          run.timer = 0;
          playTrapAppearSound();
        } else if (run.state === "active" && run.timer > run.activeDuration) {
          run.state = "cooldown";
          run.timer = 0;
        } else if (run.state === "cooldown" && run.timer > run.cooldownDuration) {
          run.state = "idle";
          run.timer = 0;
        }
      }
      for (const pair of shiftPairsState) pair.elapsed += dt;

      if (player.onGround && Math.abs(player.vx) > 10) {
        player.walkPhase += dt * 10;
        const step = Math.floor(player.walkPhase / Math.PI);
        if (step !== lastWalkStep) {
          lastWalkStep = step;
          playWalkSound();
        }
      }

      checkHazards();
    }

    function drawBlock(px: number, py: number) {
      ctx.fillStyle = "#2b2750";
      ctx.fillRect(px, py, TS, TS);
    }
    function drawSpikes(px: number, py: number) {
      ctx.fillStyle = "#ff5078";
      const n = 4;
      const w = TS / n;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.moveTo(px + i * w, py + TS);
        ctx.lineTo(px + i * w + w / 2, py + TS * 0.28);
        ctx.lineTo(px + (i + 1) * w, py + TS);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = "rgba(255,80,120,0.25)";
      ctx.fillRect(px, py + TS - 4, TS, 4);
    }
    /** Blinking spikes telegraphing their rise before going deadly; progress is 0 (flat) to 1 (about to strike). */
    function drawSpikesRising(px: number, py: number, progress: number) {
      const h = TS * 0.28 * Math.min(1, Math.max(0, progress));
      ctx.fillStyle = "rgba(255,80,120,0.55)";
      const n = 4;
      const w = TS / n;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.moveTo(px + i * w, py + TS);
        ctx.lineTo(px + i * w + w / 2, py + TS - h);
        ctx.lineTo(px + (i + 1) * w, py + TS);
        ctx.closePath();
        ctx.fill();
      }
    }
    function drawDropper(t: TrapState) {
      const px = (t.c ?? 0) * TS;
      const y = t.y ?? 0;
      const n = 3;
      const seg = TS / n;
      const h = t.dropping ? TS * 1.1 : TS * 0.4;
      ctx.fillStyle = t.dropping ? "#ff5078" : "rgba(255,80,120,0.32)";
      if (t.dropping) {
        ctx.save();
        ctx.shadowColor = "#ff5078";
        ctx.shadowBlur = 8;
      }
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.moveTo(px + i * seg, y);
        ctx.lineTo(px + i * seg + seg / 2, y + h);
        ctx.lineTo(px + (i + 1) * seg, y);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = t.dropping ? "rgba(255,80,120,0.9)" : "rgba(255,80,120,0.28)";
      ctx.fillRect(px, y - 3, TS, 3);
      if (t.dropping) ctx.restore();
    }
    function drawGoal(px: number, py: number) {
      const t = Date.now() / 400;
      const glow = 10 + Math.sin(t) * 4;
      ctx.save();
      ctx.shadowColor = "#54ffb0";
      ctx.shadowBlur = glow;
      ctx.fillStyle = "#1a3f30";
      ctx.fillRect(px + 8, py + 6, TS - 16, TS - 6);
      ctx.fillStyle = "#54ffb0";
      ctx.fillRect(px + 12, py + 10, TS - 24, TS - 14);
      ctx.restore();
      ctx.fillStyle = "#0d0b1a";
      ctx.beginPath();
      ctx.arc(px + TS - 15, py + TS / 2 + 2, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawStick(cx: number, footY: number, mode: "idle" | "walk" | "jump" | "dead", t: number, wp: number, face: 1 | -1, dead: boolean) {
      const headImg = headImgRef.current;
      const bodyScale = headImg ? 2 : 1; // scale the whole body up to match the enlarged custom head
      const hipW = 2.3 * bodyScale;
      const shW = 3.2 * bodyScale;
      const thighL = 6.5 * bodyScale;
      const shinL = 6.5 * bodyScale;
      const torsoL = 10 * bodyScale;
      const upperL = 5.5 * bodyScale;
      const foreL = 5.5 * bodyScale;
      const neckGap = 5.5 * bodyScale;
      const headR = 4;
      const hipY = footY - (thighL + shinL);
      const shoulderY = hipY - torsoL;
      const headCY = shoulderY - neckGap;
      let bob = 0;
      let lean = 0;
      const legs: number[][][] = [];
      const arms: number[][][] = [];

      for (let i = 0; i < 2; i++) {
        const sgn = i === 0 ? -1 : 1;
        let thigh: number;
        let shin: number;
        let upper: number;
        let fore: number;

        if (mode === "idle") {
          bob = Math.sin(t * 2.4) * 0.7;
          thigh = 0.13 * sgn;
          shin = thigh;
          upper = 0.18 * sgn + 0.05 * Math.sin(t * 2.4);
          fore = upper * 1.05 + 0.1 * sgn;
        } else if (mode === "walk") {
          const ph = sgn > 0 ? wp : wp + Math.PI;
          thigh = 0.85 * Math.sin(ph);
          shin = thigh + 0.85 * Math.max(0, Math.cos(ph));
          const ap = ph + Math.PI;
          upper = 0.7 * Math.sin(ap);
          fore = upper + 0.45 + 0.35 * Math.max(0, Math.sin(ap));
          lean = 2;
          bob = -Math.abs(Math.sin(wp)) * 1.4;
        } else if (mode === "jump") {
          const vy = player.vy;
          if (vy < -70) {
            thigh = 0.4 * sgn - 0.05;
            shin = thigh + 0.12;
            upper = -1.15 * sgn - 0.25;
            fore = upper - 0.35 * sgn;
            lean = 2.6;
          } else if (vy > 150) {
            thigh = sgn > 0 ? 1.15 : 0.35;
            shin = sgn > 0 ? thigh + 1.25 : thigh + 0.7;
            upper = -2.5;
            fore = upper + 0.15;
            lean = 2.8;
          } else {
            thigh = 0.7 * sgn;
            shin = thigh + 0.25;
            upper = -1.9;
            fore = upper + 0.1;
            lean = 2;
          }
        } else {
          thigh = 0.35 * sgn;
          shin = thigh;
          upper = -2.4;
          fore = upper - 0.3 * sgn;
        }

        const hx = sgn * hipW;
        const kx = hx + Math.sin(thigh) * thighL;
        const ky = hipY + Math.cos(thigh) * thighL;
        const ax = kx + Math.sin(shin) * shinL;
        const ay = ky + Math.cos(shin) * shinL;
        legs.push([
          [hx, hipY],
          [kx, ky],
          [ax, ay],
        ]);

        const sx = sgn * shW;
        const ex = sx + Math.sin(upper) * upperL;
        const ey = shoulderY + Math.cos(upper) * upperL;
        const wx = ex + Math.sin(fore) * foreL;
        const wy = ey + Math.cos(fore) * foreL;
        arms.push([
          [sx, shoulderY],
          [ex, ey],
          [wx, wy],
        ]);
      }

      lean *= bodyScale;
      bob *= bodyScale;

      ctx.save();
      ctx.translate(cx, bob);
      ctx.scale(-face, 1);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2.3 * bodyScale;
      const col = dead ? "#ff5078" : "#6ee7ff";
      ctx.shadowColor = col;
      ctx.shadowBlur = 10;
      ctx.strokeStyle = col;
      ctx.fillStyle = col;

      ctx.beginPath();
      ctx.moveTo(0, hipY);
      ctx.lineTo(lean, shoulderY);
      ctx.stroke();
      for (const L of legs) {
        ctx.beginPath();
        ctx.moveTo(L[0][0], L[0][1]);
        ctx.lineTo(L[1][0], L[1][1]);
        ctx.lineTo(L[2][0], L[2][1]);
        ctx.stroke();
      }
      for (const A of arms) {
        ctx.beginPath();
        ctx.moveTo(A[0][0] + lean, A[0][1]);
        ctx.lineTo(A[1][0] + lean, A[1][1]);
        ctx.lineTo(A[2][0] + lean, A[2][1]);
        ctx.stroke();
      }
      const headShape = headShapeRef.current;
      const r = headImg ? headR * 6 : headR; // custom photos render 6x bigger than the default head (2x the previous 3x size)
      const traceHeadPath = () => {
        ctx.beginPath();
        if (headShape === "square") {
          ctx.rect(lean - r, headCY - r, r * 2, r * 2);
        } else if (headShape === "diamond") {
          ctx.moveTo(lean, headCY - r);
          ctx.lineTo(lean + r, headCY);
          ctx.lineTo(lean, headCY + r);
          ctx.lineTo(lean - r, headCY);
          ctx.closePath();
        } else {
          ctx.arc(lean, headCY, r, 0, Math.PI * 2);
        }
      };

      if (headImg) {
        ctx.save();
        traceHeadPath();
        ctx.clip();
        ctx.drawImage(headImg, lean - r, headCY - r, r * 2, r * 2);
        ctx.restore();
      } else {
        traceHeadPath();
        ctx.stroke();
      }

      if (dead && !headImg) {
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(lean - 2.4, headCY - 1.2);
        ctx.lineTo(lean - 0.7, headCY + 0.6);
        ctx.moveTo(lean - 0.7, headCY - 1.2);
        ctx.lineTo(lean - 2.4, headCY + 0.6);
        ctx.moveTo(lean + 0.7, headCY - 1.2);
        ctx.lineTo(lean + 2.4, headCY + 0.6);
        ctx.moveTo(lean + 2.4, headCY - 1.2);
        ctx.lineTo(lean + 0.7, headCY + 0.6);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawPlayer() {
      const cx = player.x + PW / 2;
      const footY = player.y + PH;
      const t = Date.now() / 1000;
      let mode: "idle" | "walk" | "jump" | "dead" = "idle";
      if (!player.onGround) mode = "jump";
      else if (Math.abs(player.vx) > 10) mode = "walk";
      if (gs.dead) mode = "dead";
      drawStick(cx, footY, mode, t, player.walkPhase, player.face, gs.dead);
    }

    function draw() {
      const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
      g.addColorStop(0, "#141130");
      g.addColorStop(1, "#0a0818");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const key = `${r},${c}`;
          const px = c * TS;
          const py = r * TS;
          const sp = shiftTileMap[key];
          if (sp) {
            if (shiftActiveSide(shiftPairsState[sp.pairIndex]) === sp.side) drawBlock(px, py);
            continue;
          }
          const t = grid[r][c];
          if (t === "#" || t === "B" || t === "v") drawBlock(px, py);
          else if (t === "x" || t === "a") {
            if (!(traps[key] || {}).gone) drawBlock(px, py);
          } else if (t === "q") {
            const s = traps[key];
            if (s && !s.gone) {
              if (s.falling) {
                ctx.save();
                ctx.globalAlpha = Math.max(0, 1 - (s.fallY ?? 0) / (TS * 1.5));
                drawBlock(px, py + (s.fallY ?? 0));
                ctx.restore();
              } else {
                drawBlock(px, py);
              }
            }
          } else if (t === "^") drawSpikes(px, py);
          else if (t === "Z") {
            const s = traps[key];
            const run = s && s.run !== undefined ? blinkRuns[s.run] : undefined;
            if (run?.state === "active") drawSpikes(px, py);
            else if (run?.state === "warning") drawSpikesRising(px, py, run.timer / run.warnDelay);
          } else if (t === "G" || t === "F" || t === "D") drawGoal(px, py);
          // 'I' (invisible wall) intentionally renders nothing.
        }
      }
      for (const key in traps) {
        const s = traps[key];
        if (s.type === "v" && s.deadly) {
          const [r, c] = key.split(",").map(Number);
          drawSpikes(c * TS, r * TS);
        }
        if (s.type === "T" && !s.gone) drawDropper(s);
      }

      if ((gs.level === 0 || gs.level === 3) && gs.waitArmed && !gs.waitDropped && !gs.won && !gs.dead && goalPos) {
        const bob = Math.sin(Date.now() / 260) * 3;
        const tx = goalPos.c * TS + TS / 2;
        const ty = goalPos.r * TS - 16 + bob;
        ctx.save();
        ctx.font = "bold 15px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffe066";
        ctx.shadowColor = "#ffe066";
        ctx.shadowBlur = 8;
        ctx.fillText("WAIT", tx, ty);
        ctx.restore();
      }

      if (gs.level === 4 && gs.chaseArmed && !gs.won && !gs.dead && goalPos) {
        const bob = Math.sin(Date.now() / 260) * 3;
        const tx = goalPos.c * TS + TS / 2;
        const ty = goalPos.r * TS - 16 + bob;
        ctx.save();
        ctx.font = "bold 15px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffe066";
        ctx.shadowColor = "#ffe066";
        ctx.shadowBlur = 8;
        ctx.fillText("WAIT", tx, ty);
        ctx.restore();
      }

      if (gs.level === 1 && goalPos) {
        const guardPx = (goalPos.c - 1) * TS;
        if (gs.guardUp) drawSpikes(guardPx, goalPos.r * TS);

        const jumpingOver = gs.guardUp && !player.onGround && player.x + PW / 2 >= guardPx;
        if (jumpingOver) drawSpikes(goalPos.c * TS, goalPos.r * TS);

        if (gs.crossedGap && !gs.won && !gs.dead) {
          const bob = Math.sin(Date.now() / 260) * 3;
          ctx.save();
          ctx.font = "bold 15px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillStyle = "#ffe066";
          ctx.shadowColor = "#ffe066";
          ctx.shadowBlur = 8;
          ctx.fillText("WAIT", guardPx + TS / 2, goalPos.r * TS - 16 + bob);
          ctx.restore();
        }
      }

      drawPlayer();

      if (flash > 0) {
        ctx.fillStyle = `rgba(255,80,120,${flash})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (gs.dead && gs.deathQuip) {
        const alpha = Math.min(1, gs.deadTimer / 0.2);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = "bold 22px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#ff5078";
        ctx.shadowBlur = 14;
        ctx.fillText(gs.deathQuip, canvas.width / 2, canvas.height / 2);
        ctx.restore();
      }
    }

    function restartLevel() {
      if (gs.started && !gs.won) loadLevel(gs.level);
    }
    restartRef.current = restartLevel;

    function onKeyDown(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", "arrowdown", " ", "w", "a", "s", "d"].includes(k)) e.preventDefault();
      keys[k] = true;
      if (k === "r") restartLevel();
    }
    function onKeyUp(e: KeyboardEvent) {
      keys[e.key.toLowerCase()] = false;
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let raf = 0;
    let last = 0;
    function frame(ts: number) {
      let dt = last ? (ts - last) / 1000 : 0;
      last = ts;
      if (dt > 0.033) dt = 0.033;
      update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    loadLevel(0);
    gs.started = false;
    startActionRef.current = () => {
      gs.started = true;
    };
    jumpToLevelRef.current = (i) => {
      gs.started = true;
      loadLevel(i);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const { containerRef, isFullscreen, isSupported, toggleFullscreen, portalContainer } = useFullscreen();

  return (
    <div
      ref={containerRef}
      className={isFullscreen ? "mx-auto flex h-full w-full max-w-4xl flex-col gap-3 overflow-auto bg-[#0a0f1e] p-4 sm:p-6" : undefined}
    >
      <GameToolbar
        onRestart={() => restartRef.current()}
        restartLabel="Restart Level"
        fullscreen={isSupported ? { isFullscreen, onToggle: toggleFullscreen } : undefined}
        settingsContainer={portalContainer}
        stats={
          <>
            <span>
              Level <span className="font-semibold text-slate-100">{hud.level}</span>/{hud.total} — {hud.name}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Skull className="h-3.5 w-3.5 shrink-0 text-rose-400" aria-hidden />
              <span className="font-semibold text-slate-100">{hud.deaths}</span>
            </span>
          </>
        }
        settings={
          <div className="space-y-3 text-slate-300">
            <p className="text-xs leading-relaxed text-slate-400">
              Not everything you see is real — floors vanish, blocks aren&apos;t there, some walls are invisible,
              spikes rise when you get close, bridges phase in and out, and at least one exit is a trap. Reach the
              real glowing door.
            </p>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Controls</p>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>&larr; / &rarr; or A / D — move</li>
                <li>Space, W, or &uarr; — jump</li>
                <li>R — restart the current level</li>
              </ul>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Personalize</p>
              <div className="space-y-2.5">
                <ImageUploadSlot label="Character head" value={headImage} onChange={setHeadImage} onFile={setCropFile} />
                <SettingsSegment label="Head shape" options={HEAD_SHAPE_OPTIONS} value={headShape} onChange={setHeadShape} />
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Levels</p>
              <div className="flex flex-wrap gap-1.5">
                {LEVELS.map((lvl, i) => {
                  const locked = i > unlockedThrough;
                  const current = hud.level - 1 === i;
                  return (
                    <button
                      key={lvl.name}
                      type="button"
                      disabled={locked}
                      onClick={() => {
                        jumpToLevelRef.current(i);
                        setOverlay(null);
                        setStarted(true);
                      }}
                      title={locked ? "Locked — clear the previous level first" : lvl.name}
                      aria-label={`Level ${i + 1}: ${lvl.name}${locked ? " (locked)" : ""}`}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                        current
                          ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white"
                          : locked
                            ? "cursor-not-allowed bg-slate-800/50 text-slate-600"
                            : "bg-slate-800/80 text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        }
      />

      <div className={isFullscreen ? "flex flex-1 flex-col items-center justify-center gap-3 overflow-auto" : undefined}>
      <div className="relative aspect-[20/12] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900">
        <canvas ref={canvasRef} width={800} height={480} className="block h-full w-full" style={{ imageRendering: "pixelated" }} />

        {!started ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl bg-slate-950/85 px-6 text-center backdrop-blur-sm duration-300 animate-in fade-in-0">
            <Sparkles className="h-8 w-8 text-violet-400" aria-hidden />
            <p className="text-2xl font-bold text-violet-300 sm:text-3xl">Troll Jump</p>
            <p className="max-w-md text-sm text-slate-300 sm:text-base">{START_TEXT}</p>
            <button
              type="button"
              onClick={() => {
                startActionRef.current();
                setStarted(true);
              }}
              className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2 text-sm font-semibold text-white"
            >
              Start
            </button>
          </div>
        ) : overlay ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl bg-slate-950/85 px-6 text-center backdrop-blur-sm duration-300 animate-in fade-in-0">
            {overlay.tone === "win" ? (
              <PartyPopper className="h-8 w-8 text-emerald-400" aria-hidden />
            ) : (
              <Sparkles className="h-8 w-8 text-emerald-400" aria-hidden />
            )}
            <p className="text-2xl font-bold text-emerald-400 sm:text-3xl">{overlay.title}</p>
            {overlay.quip ? <p className="text-sm font-medium italic text-fuchsia-300">{overlay.quip}</p> : null}
            <p className="max-w-md text-sm text-slate-300 sm:text-base">{overlay.text}</p>
            <button
              type="button"
              onClick={overlay.onAction}
              className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2 text-sm font-semibold text-white"
            >
              {overlay.btnLabel}
            </button>
          </div>
        ) : null}

        {started && !overlay ? (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-between p-4 pb-4 md:hidden">
            <div className="pointer-events-auto flex gap-8 ">
              <TouchControlButton keyName="ArrowLeft" ariaLabel="Move left" className="flex h-14 w-14 items-center justify-center">
                <ChevronLeft className="h-7 w-7" aria-hidden />
              </TouchControlButton>
              <TouchControlButton keyName="ArrowRight" ariaLabel="Move right" className="flex h-14 w-14 items-center justify-center">
                <ChevronRight className="h-7 w-7" aria-hidden />
              </TouchControlButton>
            </div>
            <TouchControlButton keyName=" " ariaLabel="Jump" className="pointer-events-auto flex h-16 w-16 items-center justify-center">
              <ArrowUp className="h-8 w-8" aria-hidden />
            </TouchControlButton>
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        <kbd className="rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5">&larr;</kbd>{" "}
        <kbd className="rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5">&rarr;</kbd> or{" "}
        <kbd className="rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5">A</kbd>{" "}
        <kbd className="rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5">D</kbd> to move &middot;{" "}
        <kbd className="rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5">Space</kbd> /{" "}
        <kbd className="rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5">W</kbd> /{" "}
        <kbd className="rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5">&uarr;</kbd> to jump &middot;{" "}
        <kbd className="rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5">R</kbd> to restart level
      </p>
      </div>

      {cropFile ? (
        <ImageCropModal
          file={cropFile}
          shape={headShape}
          container={portalContainer}
          onCancel={() => setCropFile(null)}
          onConfirm={(dataUrl) => {
            setHeadImage(dataUrl);
            setCropFile(null);
          }}
        />
      ) : null}
    </div>
  );
}
