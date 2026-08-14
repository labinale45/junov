import type { Metadata } from "next";
import { FaviconGenerator } from "@/components/tools/FaviconGenerator";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("favicon-generator")!;

export const metadata: Metadata = {
  title: "Favicon Generator — Free, No Upload",
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

export default function FaviconGeneratorPage() {
  return (
    <ToolLayout toolSlug="favicon-generator">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Favicon Generator</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Turn any logo or image into a complete favicon set — 16&times;16 up to 256&times;256, plus a ready-to-use
        favicon.ico — entirely in your browser. Nothing is ever uploaded to a server.
      </p>

      <FaviconGenerator />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Favicon Generator?</h2>
        <p className="text-slate-400">
          The Favicon Generator turns a logo, icon, or photo into every favicon size a website needs — 16, 32, 48,
          64, 128, and 256 pixels — plus a classic multi-size favicon.ico file, all generated locally in your
          browser. It reads your image into memory, draws it onto a set of offscreen canvases sized for each
          favicon dimension, and lets you choose a solid background color or keep transparency for logos that
          already have a clean cutout. Because everything happens client-side, your image never touches a server,
          which makes it safe to use for unreleased branding or private projects. Download every size individually,
          or grab the full set — PNGs and favicon.ico together — as a single ZIP file ready to drop into your
          site&apos;s public folder.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Favicon Generator</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop a PNG, JPG, or SVG image into the upload area.</li>
          <li>Choose whether to keep a transparent background or pick a solid background color.</li>
          <li>Click Generate Favicons to render all six sizes at once.</li>
          <li>Preview each size and download individual PNGs if you only need one.</li>
          <li>Click Download all as ZIP to get every PNG size plus a ready-to-use favicon.ico.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
