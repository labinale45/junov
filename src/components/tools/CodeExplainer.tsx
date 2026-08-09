"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertTriangle, Bot, Clock, Loader2, Sparkles } from "lucide-react";
import { CopyButton } from "@/components/tools/shared/CopyButton";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type ExplainMode = "overall" | "line-by-line";

interface LanguageOption {
  value: string;
  label: string;
  monaco: string;
}

const LANGUAGES: LanguageOption[] = [
  { value: "python", label: "Python", monaco: "python" },
  { value: "javascript", label: "JavaScript", monaco: "javascript" },
  { value: "typescript", label: "TypeScript", monaco: "typescript" },
  { value: "java", label: "Java", monaco: "java" },
  { value: "csharp", label: "C#", monaco: "csharp" },
  { value: "cpp", label: "C++", monaco: "cpp" },
  { value: "php", label: "PHP", monaco: "php" },
  { value: "sql", label: "SQL", monaco: "sql" },
  { value: "go", label: "Go", monaco: "go" },
  { value: "rust", label: "Rust", monaco: "rust" },
  { value: "bash", label: "Bash", monaco: "shell" },
];

function useEditorHeight() {
  const [height, setHeight] = useState("320px");

  useEffect(() => {
    const update = () => setHeight(window.innerWidth >= 1024 ? "380px" : "250px");
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return height;
}

export function CodeExplainer() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [mode, setMode] = useState<ExplainMode>("overall");
  const [improve, setImprove] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);

  const editorHeight = useEditorHeight();
  const activeLanguage = LANGUAGES.find((l) => l.value === language) ?? LANGUAGES[0];

  const lineCount = code.length ? code.split("\n").length : 0;
  const charCount = code.length;

  async function handleExplain() {
    if (!code.trim() || loading) return;

    setLoading(true);
    setError(null);
    setRateLimited(false);
    setResult(null);

    try {
      const res = await fetch("/api/explain-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, mode, improve }),
      });

      let data: { result?: string; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        // ignore JSON parse failure, handled below via res.ok check
      }

      if (!res.ok) {
        if (res.status === 429) {
          setRateLimited(true);
        }
        setError(data.error || "Something went wrong generating the explanation. Please try again.");
        return;
      }

      if (!data.result) {
        setError("Something went wrong generating the explanation. Please try again.");
        return;
      }

      setResult(data.result);
    } catch {
      setError("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left: input panel */}
      <div className="space-y-4 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-medium text-slate-300">
            Language
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="ml-2 rounded-lg border border-white/[0.08] bg-slate-950 px-2.5 py-1.5 text-sm text-slate-200 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-slate-950 p-1">
            {(
              [
                { value: "overall", label: "Explain Overall" },
                { value: "line-by-line", label: "Line by Line" },
              ] as { value: ExplainMode; label: string }[]
            ).map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMode(m.value)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ease-out ${
                  mode === m.value
                    ? "bg-violet-600/20 text-violet-200 ring-1 ring-violet-500/50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/[0.08]">
          <MonacoEditor
            height={editorHeight}
            language={activeLanguage.monaco}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value ?? "")}
            options={{
              wordWrap: "on",
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              padding: { top: 12, bottom: 12 },
            }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            {lineCount} {lineCount === 1 ? "line" : "lines"} &middot; {charCount} {charCount === 1 ? "character" : "characters"}
          </p>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={improve}
              onChange={(e) => setImprove(e.target.checked)}
              className="h-4 w-4 rounded border-white/[0.2] bg-slate-950 accent-violet-600"
            />
            Suggest Improvements
          </label>
        </div>

        <button
          type="button"
          onClick={handleExplain}
          disabled={loading || !code.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Explaining...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden />
              Explain Code
            </>
          )}
        </button>
      </div>

      {/* Right: output panel */}
      <div className="flex flex-col rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-slate-300">Explanation</p>
          <CopyButton text={result ?? ""} label="Copy" disabled={!result} />
        </div>

        <div className="overflow-y-auto pr-1" style={{ height: editorHeight }}>
          {error ? (
            <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
              {rateLimited ? (
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              ) : (
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              )}
              <p>
                {rateLimited ? "You've used all 10 free explanations for today — come back tomorrow!" : error}
              </p>
            </div>
          ) : loading ? (
            <div className="space-y-3">
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-800" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-800" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-800" />
            </div>
          ) : result ? (
            <div className="prose-invert max-w-none text-sm leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="mb-3 mt-5 text-xl font-bold text-slate-50 first:mt-0">{children}</h1>,
                  h2: ({ children }) => <h2 className="mb-3 mt-5 text-lg font-bold text-slate-50 first:mt-0">{children}</h2>,
                  h3: ({ children }) => <h3 className="mb-2 mt-4 text-base font-bold text-slate-50 first:mt-0">{children}</h3>,
                  p: ({ children }) => <p className="mb-3 text-[#cbd5e1]">{children}</p>,
                  ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5 text-[#cbd5e1]">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5 text-[#cbd5e1]">{children}</ol>,
                  li: ({ children }) => <li className="text-[#cbd5e1]">{children}</li>,
                  pre: ({ children }) => (
                    <pre className="mb-3 overflow-x-auto rounded-lg bg-[#1e293b] p-4 text-xs leading-relaxed text-slate-200">
                      {children}
                    </pre>
                  ),
                  code: ({ className, children, ...props }) => {
                    const isBlock = Boolean(className);
                    if (isBlock) {
                      return (
                        <code className={`${className ?? ""} font-mono`} {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="rounded bg-violet-600/10 px-1 py-0.5 font-mono text-violet-300" {...props}>
                        {children}
                      </code>
                    );
                  },
                  a: ({ children, href }) => (
                    <a href={href} className="text-violet-400 underline hover:text-violet-300" target="_blank" rel="noreferrer">
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => <strong className="font-semibold text-slate-100">{children}</strong>,
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500">
              <Bot className="h-10 w-10 text-slate-600" aria-hidden />
              <p className="max-w-xs text-sm">
                Paste some code on the left and click &quot;Explain Code&quot; to get a plain-English explanation.
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 border-t border-white/[0.08] pt-3 text-xs text-slate-500">
          Your code is never stored or logged.
        </p>
      </div>
    </div>
  );
}
