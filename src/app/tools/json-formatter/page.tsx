import type { Metadata } from "next";
import Link from "next/link";
import { JsonFormatterClient } from "@/components/tools/JsonFormatterClient";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "JSON Formatter",
  description:
    "Format and validate JSON in your browser. Useful for APIs, configs, and debugging—processing stays on your device.",
  keywords: ["json formatter", "json validator", "json minifier", "developer tool"],
  alternates: { canonical: `${siteUrl}/tools/json-formatter` },
  openGraph: {
    title: "JSON Formatter | Rabin Ale",
    description:
      "Format, validate, and minify JSON in-browser with privacy-friendly processing on your own device.",
    url: `${siteUrl}/tools/json-formatter`,
  },
  twitter: {
    card: "summary",
    title: "JSON Formatter | Rabin Ale",
    description:
      "Format, validate, and minify JSON in-browser with privacy-friendly processing on your own device.",
  },
};

export default function JsonFormatterPage() {
  return (
    <main className="flex-1 container mx-auto px-6 lg:px-12 py-12 lg:py-16 max-w-5xl">
      <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide mb-2">Tools</p>
      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">JSON Formatter</h1>
      <p className="text-slate-400 text-lg mb-8 max-w-2xl">
        Paste JSON below. Formatting and validation run entirely in your browser—nothing is uploaded to our servers.
      </p>

      <section className="mb-12 space-y-4 text-slate-300 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-semibold text-white">How to use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Paste raw JSON (from an API response, config file, or clipboard).</li>
          <li>Fix any syntax errors shown in red until the preview updates.</li>
          <li>Choose indent size, then copy formatted or minified output.</li>
        </ol>
        <p className="text-slate-500 text-sm">
          Tip: For huge payloads, your browser may slow down—trim to a smaller snippet while debugging.
        </p>
      </section>

      <JsonFormatterClient />

      <div className="mt-12 pt-8 border-t border-slate-800">
        <Link href="/tools" className="text-indigo-400 hover:text-indigo-300 font-medium">
          ← All tools
        </Link>
      </div>
    </main>
  );
}
