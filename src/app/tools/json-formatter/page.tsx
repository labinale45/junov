import type { Metadata } from "next";
import { JsonFormatterClient } from "@/components/tools/JsonFormatterClient";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("json-formatter")!;

export const metadata: Metadata = {
  title: "JSON Formatter — Free, No Upload",
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

export default function JsonFormatterPage() {
  return (
    <ToolLayout toolSlug="json-formatter">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Developer Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">JSON Formatter</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Paste JSON below. Formatting and validation run entirely in your browser — nothing is uploaded to a server.
      </p>

      <JsonFormatterClient />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the JSON Formatter?</h2>
        <p className="text-slate-400">
          The JSON Formatter is a free browser-based utility that pretty-prints, validates, and minifies JSON
          data. Paste raw JSON from an API response, a configuration file, or your clipboard and instantly see a
          readable, indented version alongside a compact minified version. Invalid JSON is flagged immediately with
          a clear syntax error message so you can spot the problem without digging through a wall of text. Because
          everything runs client-side in JavaScript, nothing you paste is ever sent to a server — it&apos;s ideal for
          debugging API payloads, config files, or any JSON you&apos;d rather keep private. The tool works on any device
          with a modern browser and requires no installation or account.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the JSON Formatter</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Paste raw JSON into the input box (from an API response, config file, or clipboard).</li>
          <li>Fix any syntax errors shown in red until the preview updates.</li>
          <li>Choose an indent size — 2 or 4 spaces.</li>
          <li>Review the formatted output on the right for readability.</li>
          <li>Copy the formatted or minified version with one click.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
