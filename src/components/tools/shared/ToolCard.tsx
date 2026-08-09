import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACCENT_CLASSES, type ToolDef } from "@/lib/tools-registry";

const CATEGORY_BADGE_CLASS: Record<ToolDef["category"], string> = {
  image: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ai: "bg-violet-600/10 text-violet-400 border-violet-500/20",
  developer: "bg-green-500/10 text-green-400 border-green-500/20",
};

export function ToolCard({ tool }: { tool: ToolDef }) {
  const Icon = tool.icon;
  const accent = ACCENT_CLASSES[tool.accent];

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900 p-6 transition-all duration-300 ease-out hover:-translate-y-1 ${accent.glow}`}
    >
      {tool.isNew ? (
        <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
          New
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 ease-out group-hover:scale-110 ${accent.badge}`}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        {!tool.isNew ? (
          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${CATEGORY_BADGE_CLASS[tool.category]}`}>
            {tool.categoryLabel}
          </span>
        ) : null}
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-slate-50 group-hover:text-white">{tool.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{tool.tagline}</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-sm font-medium text-violet-400">
          Open tool
          <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden />
        </span>
        {tool.isNew ? (
          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${CATEGORY_BADGE_CLASS[tool.category]}`}>
            {tool.categoryLabel}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
