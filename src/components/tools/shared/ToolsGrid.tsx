"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Code2, LayoutGrid, type LucideIcon, Image as ImageIcon } from "lucide-react";
import { ToolCard } from "@/components/tools/shared/ToolCard";
import { CATEGORY_LABELS, TOOLS, type ToolCategory } from "@/lib/tools-registry";

type FilterKey = "all" | ToolCategory;

const FILTERS: { key: FilterKey; label: string; icon: LucideIcon }[] = [
  { key: "all", label: "All", icon: LayoutGrid },
  { key: "image", label: CATEGORY_LABELS.image, icon: ImageIcon },
  { key: "ai", label: CATEGORY_LABELS.ai, icon: Bot },
  { key: "developer", label: CATEGORY_LABELS.developer, icon: Code2 },
];

const CATEGORY_ORDER: ToolCategory[] = ["image", "ai", "developer"];

function ToolCardGrid({ tools }: { tools: typeof TOOLS }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool, i) => (
        <div
          key={tool.slug}
          className="animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both"
          style={{ animationDelay: `${Math.min(i, 8) * 40}ms`, animationDuration: "400ms" }}
        >
          <ToolCard tool={tool} />
        </div>
      ))}
    </div>
  );
}

export function ToolsGrid() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = useMemo(
    () => (filter === "all" ? TOOLS : TOOLS.filter((t) => t.category === filter)),
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
                  layoutId="tools-filter-pill"
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
        <div className="space-y-12">
          {CATEGORY_ORDER.map((category) => {
            const tools = filtered.filter((t) => t.category === category);
            if (tools.length === 0) return null;
            return (
              <section key={category}>
                <h2 className="mb-5 text-xl font-bold text-slate-50">{CATEGORY_LABELS[category]}</h2>
                <ToolCardGrid tools={tools} />
              </section>
            );
          })}
        </div>
      ) : (
        <section>
          <h2 className="mb-5 text-xl font-bold text-slate-50">{CATEGORY_LABELS[filter]}</h2>
          <ToolCardGrid tools={filtered} />
        </section>
      )}
    </div>
  );
}
