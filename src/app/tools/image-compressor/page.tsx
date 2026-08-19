import type { Metadata } from "next";
import Link from "next/link";
import { ImageCompressor } from "@/components/tools/ImageCompressor";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { COMPRESSOR_PRESETS } from "@/lib/compressor-presets";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-compressor")!;

export const metadata: Metadata = {
  title: "Image Compressor — Compress a Picture Free, No Upload",
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

export default function ImageCompressorPage() {
  return (
    <ToolLayout toolSlug="image-compressor">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Image Compressor — Compress a Picture in Seconds</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Compress a picture, photo, or graphic — JPG, PNG, WebP and AVIF — without a noticeable quality drop, entirely
        in your browser. Nothing is ever uploaded to a server.
      </p>

      <ImageCompressor />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Image Compressor?</h2>
        <p className="text-slate-400">
          The Image Compressor reduces the file size of your photos and graphics while keeping them looking sharp.
          It reads the image into memory, re-encodes it with a smarter, more efficient compression algorithm, and
          lets you compare the result against the original with a draggable before/after slider — all without
          leaving the page. Because everything runs locally in your browser, nothing is ever uploaded to a server,
          which makes it safe for private photos and fast even on a slow connection. Smaller images mean faster
          page loads, lower storage use, and quicker uploads to email, social media or a CMS. Use the quality
          slider to find the sweet spot between file size and visual fidelity, or switch to bulk mode to compress
          up to 50 images at once and download every result together as a single ZIP file. Need a specific file
          size instead — for an email attachment limit, a form upload cap, or a website&apos;s image guidelines?
          Switch to &quot;By Target Size&quot; mode and the tool will iterate quality and dimensions automatically
          to land as close as possible to the size you enter.
        </p>

        <h2 className="text-xl font-bold text-slate-50">Compress to a Specific Size</h2>
        <p className="text-slate-400">
          Jump straight to a preset target and the target-size field will already be filled in:
        </p>
        <div className="flex flex-wrap gap-2">
          {COMPRESSOR_PRESETS.map((preset) => (
            <Link
              key={preset.slug}
              href={`/tools/image-compressor/${preset.slug}`}
              className="rounded-lg border border-white/[0.08] bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors duration-200 ease-out hover:border-violet-500/40 hover:text-white"
            >
              Compress to {preset.label}
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Image Compressor</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop a JPG, PNG, WebP or AVIF image (or several, in bulk mode) into the upload area.</li>
          <li>Adjust the quality slider — lower values shrink the file more but reduce visual quality.</li>
          <li>Click Compress and let the tool process your image entirely in your browser.</li>
          <li>Drag the before/after slider to compare the original and compressed versions side by side.</li>
          <li>Check the size saved badge, then download the compressed image — or download all as a ZIP in bulk mode.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
