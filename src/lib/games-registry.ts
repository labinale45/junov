import type { LucideIcon } from "lucide-react";
import { Bomb, Brain, Hash, Skull } from "lucide-react";
import { ACCENT_CLASSES, type AccentColor } from "@/lib/tools-registry";

export type GameCategory = "puzzle" | "strategy" | "arcade";

export interface GameFaqItem {
  question: string;
  answer: string;
}

export interface GameDef {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: GameCategory;
  categoryLabel: string;
  icon: LucideIcon;
  accent: AccentColor;
  image: string;
  isNew?: boolean;
  keywords: string[];
  faqs: GameFaqItem[];
  related: string[];
}

export { ACCENT_CLASSES };
export type { AccentColor };

export const GAME_CATEGORY_LABELS: Record<GameCategory, string> = {
  puzzle: "Puzzle Games",
  strategy: "Strategy Games",
  arcade: "Arcade Games",
};

export const GAMES: GameDef[] = [
  {
    slug: "troll-jump",
    name: "Troll Jump",
    tagline: "A platformer that lies to you — trust nothing, reach the real door",
    description:
      "Play Troll Jump free online. A 10-level stickman trick platformer where floors vanish, walls turn invisible, spikes rise when you get close, bridges phase in and out, and only one exit is real. No download, runs in your browser.",
    category: "arcade",
    categoryLabel: "Arcade Games",
    icon: Skull,
    accent: "orange",
    image: "/assets/troll-jump.jpg",
    isNew: true,
    keywords: [
      "troll jump game",
      "trap platformer online",
      "trick platformer game",
      "troll game online free",
      "prank platformer",
      "impossible platformer game",
      "stickman game",
      "stickman platformer",
      "free stickman game online",
    ],
    faqs: [
      { question: "How do I play Troll Jump?", answer: "Use the arrow keys or A/D to move and Space, W, or the up arrow to jump. Reach the glowing exit door to clear each of the 10 levels." },
      { question: "Is this like Stickman Hook?", answer: "Not quite — Stickman Hook is a grappling-hook swinging game, while Troll Jump is a trick platformer where you run and jump through 10 trap-filled levels. Both feature a simple stickman character and are free to play instantly in your browser, so if you're a fan of quick, replayable stickman games, Troll Jump is worth trying." },
      { question: "What makes it a \"troll\" game?", answer: "Almost nothing is what it looks like — floors quietly vanish underfoot, some blocks you can walk into are fake, some walls are completely invisible until you bump into them, spikes rise up out of the floor the moment you get close, bridges phase in and out of existence, and when a level has multiple exit doors only one is ever real. Watch the ceiling too." },
      { question: "Are the traps random?", answer: "Yes, the timing of vanishing floors, hidden spikes, rising spikes, phasing bridges, and which door is real are all re-rolled every time you load a level, so memorizing one run isn't enough." },
      { question: "Can I jump straight to a level I've already reached?", answer: "Yes — open the settings menu (gear icon above the game) and pick any unlocked level from the Levels row. Levels unlock as you clear them." },
      { question: "How do I restart a level?", answer: "Press R at any time, or use the restart button in the toolbar above the game." },
      { question: "Is it free?", answer: "Yes, completely free with no login or download." },
      { question: "Are deaths tracked?", answer: "Yes, your death count for the current session is shown in the toolbar — dying just respawns you at the start of the level instantly." },
    ],
    related: ["minesweeper", "tic-tac-toe"],
  },
  {
    slug: "memory-match",
    name: "Memory Match",
    tagline: "Flip cards, find every pair, beat your best score",
    description:
      "Play Memory Match free online. Flip cards to find matching pairs, race against your move count, and beat your best score. No download, runs in your browser.",
    category: "puzzle",
    categoryLabel: "Puzzle Games",
    icon: Brain,
    accent: "violet",
    image: "/assets/memory-match.jpg",
    isNew: true,
    keywords: [
      "memory match game",
      "memory card game online free",
      "concentration game",
      "card matching game online free",
      "memory game browser",
      "pairs game",
      "brain puzzle game online",
    ],
    faqs: [
      { question: "Is this a sudoku game?", answer: "No — Memory Match is a card-flipping pairs game, not a number-grid puzzle like Sudoku. It scratches a similar itch though: it's a free, no-login brain puzzle you can play in short bursts, right in your browser." },
      { question: "How do I play Memory Match?", answer: "Click any two cards to flip them. If the symbols match, they stay revealed. Find all pairs in as few moves as possible." },
      { question: "Is this the same as the concentration game?", answer: "Yes — Memory Match is the classic concentration (pairs) card game, playable free online with no login or download." },
      { question: "Is it free?", answer: "Yes, completely free with no login or download." },
      { question: "Is my best score saved?", answer: "Yes, your fewest-moves record is saved in your browser so you can try to beat it next time." },
      { question: "Can I change the difficulty?", answer: "Yes, switch between a 4x4 and 6x6 grid from the settings menu (gear icon above the board)." },
      { question: "Does this game require an internet connection after loading?", answer: "No, once the page loads the game runs entirely client-side." },
    ],
    related: ["minesweeper", "tic-tac-toe"],
  },
  {
    slug: "tic-tac-toe",
    name: "Tic-Tac-Toe",
    tagline: "Play against an unbeatable AI, or a friend on the same screen",
    description:
      "Play Tic-Tac-Toe free online against a smart AI opponent or a friend. Instant, no login, runs entirely in your browser.",
    category: "strategy",
    categoryLabel: "Strategy Games",
    icon: Hash,
    accent: "blue",
    image: "/assets/tic-tac-toe.jpg",
    keywords: [
      "tic tac toe online",
      "tic tac toe online free",
      "tic tac toe 2 player",
      "tic tac toe unblocked",
      "play tic tac toe",
      "tic tac toe vs computer",
      "noughts and crosses",
      "quick strategy game online",
    ],
    faqs: [
      { question: "Is this a block breaker game?", answer: "No — Tic-Tac-Toe is a grid strategy game, not a Breakout-style block breaker. If you landed here searching for block breaker, this is a different kind of quick, free browser game: no download, unbeatable AI, and matches that take under a minute." },
      { question: "Can I beat the AI?", answer: "The AI plays a perfect strategy — the best you can do against it is a draw, unless you turn on No Draws mode." },
      { question: "Can I turn off draws?", answer: "Yes — open the settings menu (gear icon above the board) and switch Draws to \"No Draws\". Each player then keeps at most 3 marks on the board; placing a 4th makes your own oldest mark vanish, so the board never fills up and the game keeps going until someone actually wins." },
      { question: "Can I play Tic-Tac-Toe 2 player?", answer: "Yes, open the settings menu (gear icon above the board) and switch to 2-player mode to play locally against a friend on the same device." },
      { question: "Is Tic-Tac-Toe unblocked here?", answer: "This is a normal public web page with no login or install required — if your network allows this site, the game just works." },
      { question: "Is it free?", answer: "Yes, completely free with no login." },
      { question: "Does it track the score?", answer: "Yes, wins, losses and draws are tallied for your current session." },
      { question: "Who goes first?", answer: "You play X and always move first." },
    ],
    related: ["memory-match", "minesweeper"],
  },
  {
    slug: "minesweeper",
    name: "Minesweeper",
    tagline: "Clear the board without hitting a mine",
    description:
      "Play Minesweeper free online. Classic beginner and intermediate boards, flag mines, race the clock. No download, runs in your browser.",
    category: "puzzle",
    categoryLabel: "Puzzle Games",
    icon: Bomb,
    accent: "rose",
    image: "/assets/minesweeper.jpg",
    keywords: [
      "minesweeper online",
      "minesweeper online free",
      "play minesweeper free",
      "minesweeper unblocked",
      "classic minesweeper",
      "classic minesweeper browser game",
      "classic browser puzzle game",
    ],
    faqs: [
      { question: "Is this a snake game?", answer: "No — Minesweeper is a grid-clearing logic puzzle, not Snake. If you came looking for a snake game, we don't have one yet, but Minesweeper offers the same quick, free, no-login browser-puzzle experience." },
      { question: "How do I flag a mine?", answer: "Right-click a tile on desktop, or open the settings menu (gear icon above the board) and turn on Flag mode to tap-flag tiles on mobile." },
      { question: "What do the numbers mean?", answer: "Each number shows how many mines are in the 8 surrounding tiles." },
      { question: "What difficulties are available?", answer: "Beginner (9x9, 10 mines) and Intermediate (16x16, 40 mines), selectable from the settings menu." },
      { question: "Is Minesweeper unblocked here?", answer: "This is a normal public web page with no login or install required — if your network allows this site, the game just works." },
      { question: "Is it free?", answer: "Yes, completely free with no login." },
      { question: "Does the first click ever hit a mine?", answer: "No, mines are placed only after your first click so the opening is always safe." },
    ],
    related: ["memory-match", "tic-tac-toe"],
  },
];

export function getGameBySlug(slug: string): GameDef | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export function getRelatedGames(slugs: string[]): GameDef[] {
  return slugs
    .map((s) => getGameBySlug(s))
    .filter((g): g is GameDef => Boolean(g));
}

/** All games except the given slug, newest first — used for the "more games" sidebar/rail on a game page. */
export function getOtherGames(slug: string): GameDef[] {
  return GAMES.filter((g) => g.slug !== slug).sort(
    (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)),
  );
}
