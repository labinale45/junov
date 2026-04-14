"use client";

import { useCallback, useMemo, useState } from "react";

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

  const copy = useCallback(async (text: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="text-sm text-slate-400">
          Indent:{" "}
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="ml-2 rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-slate-200"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello":"world"}'
            className="w-full min-h-[280px] rounded-xl bg-slate-900/80 border border-slate-700 p-4 font-mono text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            spellCheck={false}
          />
          {parsed.error && <p className="mt-2 text-sm text-red-400">{parsed.error}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Formatted</label>
          <textarea
            readOnly
            value={parsed.formatted}
            className="w-full min-h-[280px] rounded-xl bg-slate-900/50 border border-slate-700/80 p-4 font-mono text-sm text-emerald-200/90"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => copy(parsed.formatted)}
              disabled={!parsed.formatted}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm disabled:opacity-40"
            >
              Copy formatted
            </button>
            <button
              type="button"
              onClick={() => copy(parsed.minified)}
              disabled={!parsed.minified}
              className="px-4 py-2 rounded-lg border border-slate-600 text-slate-200 text-sm disabled:opacity-40"
            >
              Copy minified
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
