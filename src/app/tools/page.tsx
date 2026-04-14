import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Tools",
  description: "Free browser utilities: JSON formatter and more. No data sent to our servers for client-side tools.",
  keywords: ["developer tools", "online tools", "json formatter", "browser utilities"],
  alternates: { canonical: `${siteUrl}/tools` },
  openGraph: {
    title: "Tools | Rabin Ale",
    description: "Privacy-friendly browser tools for developers and students.",
    url: `${siteUrl}/tools`,
  },
  twitter: {
    card: "summary",
    title: "Tools | Rabin Ale",
    description: "Privacy-friendly browser tools for developers and students.",
  },
};

const tools = [
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    description: "Paste JSON, format, validate, and minify in the browser.",
  },
];

export default function ToolsIndexPage() {
  return (
    <main className="flex-1 container mx-auto px-6 lg:px-12 py-12 lg:py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-white mb-4">Tools</h1>
      <p className="text-slate-400 mb-12 text-lg">
        Small utilities that run in your browser. Prefer privacy-friendly, client-side tools where possible.
      </p>
      <ul className="space-y-8">
        {tools.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/tools/${t.slug}`}
              className="block glass rounded-2xl p-6 border border-slate-700/50 hover:border-indigo-500/30 transition-colors"
            >
              <h2 className="text-xl font-bold text-white mb-2">{t.title}</h2>
              <p className="text-slate-400">{t.description}</p>
              <span className="inline-block mt-3 text-indigo-400 text-sm font-medium">Open tool →</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
