import type { Metadata } from "next";
import Link from "next/link";
import { ImageConverter } from "@/components/tools/ImageConverter";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { CONVERTER_PAIRS } from "@/lib/converter-pairs";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-converter")!;

export const metadata: Metadata = {
  title: "Image Converter — Free, No Upload",
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

export default function ImageConverterPage() {
  return (
    <ToolLayout toolSlug="image-converter">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Image Converter</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Convert images between HEIC, JPG, PNG, WebP, AVIF, BMP, GIF, TIFF, SVG and PDF — entirely in your browser.
        Nothing is ever uploaded to a server.
      </p>

      <ImageConverter />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Image Converter?</h2>
        <p className="text-slate-400">
          The Image Converter turns images from one format into another — HEIC to JPG, PNG to WebP, JPG to AVIF, and
          many more combinations — without ever leaving your browser tab. It reads the file into memory, decodes it
          with the browser&apos;s native image and PDF renderers, and re-encodes it in the format you choose. Because
          nothing is sent to a server, it works even on private or sensitive images, and it keeps working offline
          once the page has loaded. iPhone photos saved as HEIC are a common use case: this tool converts them to
          universally supported JPG or PNG in one click. Bulk mode lets you convert a batch of images at once and
          download every result together as a single ZIP file.
        </p>

        <h2 className="text-xl font-bold text-slate-50">Popular Conversions</h2>
        <p className="text-slate-400">Jump straight to a common pair and the output format will already be set:</p>
        <div className="flex flex-wrap gap-2">
          {CONVERTER_PAIRS.map((pair) => (
            <Link
              key={pair.slug}
              href={`/tools/image-converter/${pair.slug}`}
              className="rounded-lg border border-white/[0.08] bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors duration-200 ease-out hover:border-violet-500/40 hover:text-white"
            >
              {pair.fromLabel} to {pair.toLabel}
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Image Converter</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop an image (or several, in bulk mode) into the upload area.</li>
          <li>Check the detected input format shown as a badge above the preview.</li>
          <li>Choose your output format from the dropdown — JPG, PNG, WebP, AVIF, BMP, GIF, TIFF or SVG.</li>
          <li>If converting to a lossy format, adjust the quality slider to balance size and clarity.</li>
          <li>Click Convert, then download the result — or download all results as a ZIP in bulk mode.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
