import type { Metadata } from "next";
import { CodeExplainer } from "@/components/tools/CodeExplainer";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("code-explainer")!;

export const metadata: Metadata = {
  title: "Free Code Explainer — Understand Any Code Instantly",
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: `${siteUrl}/tools/${tool.slug}` },
  openGraph: {
    title: `${tool.name} | Rabin Ale`,
    description: tool.description,
    url: `${siteUrl}/tools/${tool.slug}`,
    type: "website",
    images: [{ url: toolOgImageUrl(tool.name), width: 1200, height: 630, alt: tool.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${tool.name} | Rabin Ale`,
    description: tool.description,
    images: [toolOgImageUrl(tool.name)],
  },
};

export default function CodeExplainerPage() {
  return (
    <ToolLayout toolSlug="code-explainer" privacyNote="Your code is never stored or logged.">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">AI Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Code Explainer</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Paste any code snippet and get a clear, plain-English explanation powered by AI — understand what it does,
        how it works, and the key concepts behind it in seconds.
      </p>

      <CodeExplainer />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Code Explainer?</h2>
        <p className="text-slate-400">
          The Code Explainer takes any snippet of code and turns it into a plain-English explanation using AI. It
          supports Python, JavaScript, TypeScript, Java, C#, C++, PHP, SQL, Go, Rust, and Bash. Choose between an
          overall summary that covers what the code does and the key concepts it uses, or a line-by-line breakdown
          that walks through each line or logical block individually. You can also ask it to suggest improvements,
          which appends a dedicated section covering readability, performance, or best-practice fixes. It&apos;s
          built for students learning a new language, developers reviewing unfamiliar code, and anyone who wants to
          quickly understand what a piece of code is actually doing without digging through documentation. The tool
          is completely free, requires no login, and your code is never stored or logged on our servers.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Code Explainer</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Paste or type your code into the editor on the left.</li>
          <li>Select the programming language from the dropdown so the explanation is accurate.</li>
          <li>Choose a mode — Explain Overall for a summary, or Line by Line for a detailed breakdown.</li>
          <li>Optionally toggle Suggest Improvements to get recommended fixes and best practices.</li>
          <li>Click Explain Code and read the AI-generated explanation on the right, or copy it with one click.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
