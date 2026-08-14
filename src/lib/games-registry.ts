import type { LucideIcon } from "lucide-react";
import { Bomb, Brain, Hash } from "lucide-react";
import { ACCENT_CLASSES, type AccentColor } from "@/lib/tools-registry";

export type GameCategory = "puzzle" | "strategy";

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
};

export const GAMES: GameDef[] = [
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
    isNew: true,
    keywords: [
      "memory match game",
      "memory card game online free",
      "concentration game",
      "card matching game online free",
      "memory game browser",
      "pairs game",
    ],
    faqs: [
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
    keywords: [
      "tic tac toe online",
      "tic tac toe online free",
      "tic tac toe 2 player",
      "tic tac toe unblocked",
      "play tic tac toe",
      "tic tac toe vs computer",
      "noughts and crosses",
    ],
    faqs: [
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
    keywords: [
      "minesweeper online",
      "minesweeper online free",
      "play minesweeper free",
      "minesweeper unblocked",
      "classic minesweeper",
      "classic minesweeper browser game",
    ],
    faqs: [
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
