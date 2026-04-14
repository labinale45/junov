"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  title?: string;
  output?: string;
}

export default function CodeBlock({ code, title, output }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-border">
      {title && (
        <div className="bg-code-bg px-4 py-2 flex items-center justify-between border-b border-border">
          <span className="text-sm font-mono text-code-foreground">{title}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-code-comment hover:text-code-foreground transition-colors p-1"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
      <pre className="bg-code-bg p-4 overflow-x-auto">
        <code className="text-sm font-mono text-code-foreground whitespace-pre">{code}</code>
      </pre>
      {output && (
        <div className="bg-muted px-4 py-3 border-t border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Output:</span>
          <pre className="text-sm font-mono text-foreground mt-1 whitespace-pre">{output}</pre>
        </div>
      )}
    </div>
  );
}
