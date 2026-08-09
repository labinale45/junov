"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/tools/shared/CopyButton";

export function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);

  const parsed = useMemo(() => {
    if (!input.trim()) {
      return { formatted: "", minified: "", error: null as string | null };
    }
    try {
      const data = JSON.parse(input);
      return {
        formatted: JSON.stringify(data, null, indent),
        minified: JSON.stringify(data),
        error: null as string | null,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      return { formatted: "", minified: "", error: msg };
    }
  }, [input, indent]);

  return (
    <div className="space-y-6 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm text-slate-400">
          Indent:{" "}
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="ml-2 rounded-lg border border-white/[0.08] bg-slate-950 px-2 py-1 text-slate-200"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello":"world"}'
            className="min-h-[280px] w-full rounded-xl border border-white/[0.08] bg-slate-950/80 p-4 font-mono text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            spellCheck={false}
          />
          {parsed.error && <p className="mt-2 text-sm text-red-400">{parsed.error}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Formatted</label>
          <textarea
            readOnly
            value={parsed.formatted}
            className="min-h-[280px] w-full rounded-xl border border-white/[0.06] bg-slate-950/50 p-4 font-mono text-sm text-green-200/90"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <CopyButton text={parsed.formatted} label="Copy formatted" />
            <CopyButton text={parsed.minified} label="Copy minified" />
          </div>
        </div>
      </div>
    </div>
  );
}
