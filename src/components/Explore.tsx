"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Gamepad2, GraduationCap, Wrench } from "lucide-react";

interface ExploreItem {
  href: string;
  icon: typeof Wrench;
  kicker: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  accent: "indigo" | "emerald" | "violet";
}

const items: ExploreItem[] = [
  {
    href: "/tools",
    icon: Wrench,
    kicker: "15 free tools",
    title: "Browser-Based Tools",
    description:
      "Compress, convert, resize and edit images, remove backgrounds with AI, and explain code — all client-side, all free, nothing ever uploaded.",
    features: ["Image compressor & converter", "AI background remover", "AI code explainer"],
    cta: "Explore Tools",
    accent: "indigo",
  },
  {
    href: "/games",
    icon: Gamepad2,
    kicker: "3 free games",
    title: "Browser Games",
    description:
      "Take a break with Memory Match, Tic-Tac-Toe against an unbeatable AI, and Minesweeper — quick, replayable games with saved best scores.",
    features: ["Memory Match & Minesweeper", "Tic-Tac-Toe vs AI or a friend", "Best scores saved to your browser"],
    cta: "Explore Games",
    accent: "violet",
  },
  {
    href: "/course",
    icon: GraduationCap,
    kicker: "2 learning tracks",
    title: "Structured Courses",
    description:
      "Practical C++ and Web Design courses built for complete beginners — real projects, not just theory, from day one.",
    features: ["1-month fast-track or 3-month deep dive", "Hands-on real-world projects", "Assignments & best practices"],
    cta: "Explore Courses",
    accent: "emerald",
  },
];

const ACCENT = {
  indigo: {
    icon: "bg-indigo-500/10 text-indigo-400",
    border: "hover:border-indigo-500/30",
    title: "group-hover:text-indigo-400",
    check: "text-indigo-400",
    cta: "text-indigo-400",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400",
    border: "hover:border-emerald-500/30",
    title: "group-hover:text-emerald-400",
    check: "text-emerald-400",
    cta: "text-emerald-400",
  },
  violet: {
    icon: "bg-violet-500/10 text-violet-400",
    border: "hover:border-violet-500/30",
    title: "group-hover:text-violet-400",
    check: "text-violet-400",
    cta: "text-violet-400",
  },
};

export function Explore() {
  return (
    <section id="explore" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-wider uppercase mb-2">Explore</p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Tools, Games &amp; Courses</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Free browser-based tools, games, and structured, project-based courses — built to help you build, play,
            and learn faster.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            const accent = ACCENT[item.accent];
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`group block h-full glass rounded-3xl p-8 border border-slate-700/50 transition-all duration-300 ease-out hover:-translate-y-1 ${accent.border}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 ease-out group-hover:scale-110 ${accent.icon}`}>
                      <Icon className="h-7 w-7" aria-hidden />
                    </span>
                    <span className="text-xs font-medium text-slate-500">{item.kicker}</span>
                  </div>

                  <h3 className={`text-2xl font-bold text-white mb-2 transition-colors ${accent.title}`}>
                    {item.title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">{item.description}</p>

                  <ul className="space-y-2 mb-8">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                        <Check className={`h-4 w-4 shrink-0 ${accent.check}`} aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <span className={`inline-flex items-center gap-2 font-medium ${accent.cta}`}>
                    {item.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
