"use client";

import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function CopyButton({ text, label = "Copy", className = "", disabled = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (disabled || !text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy to clipboard.");
    }
  }, [disabled, text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled || !text}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] bg-slate-900 px-3.5 py-2 text-sm font-medium text-slate-200 transition-all duration-200 ease-out hover:border-violet-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" aria-hidden />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden />
          {label}
        </>
      )}
    </button>
  );
}
