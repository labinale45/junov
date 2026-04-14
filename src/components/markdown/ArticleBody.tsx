"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ArticleBody({ content }: { content: string }) {
  return (
    <div className="prose-article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-3">{children}</h3>
          ),
          p: ({ children }) => <p className="text-slate-300 leading-relaxed mb-4">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc pl-6 text-slate-300 space-y-2 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 text-slate-300 space-y-2 mb-4">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-100">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          pre: ({ children }) => (
            <pre className="rounded-xl bg-slate-900/90 border border-slate-700/50 p-4 overflow-x-auto my-4 text-sm font-mono text-emerald-200/95 whitespace-pre-wrap">
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = /language-/.test(className ?? "");
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-indigo-200 font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-500/50 pl-4 italic text-slate-400 my-4">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-slate-700 my-10" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
