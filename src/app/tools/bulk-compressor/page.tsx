import type { Metadata } from "next";
import { BulkCompressor } from "@/components/tools/BulkCompressor";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("bulk-compressor")!;

export const metadata: Metadata = {
  title: "Bulk Image Compressor — Free, No Upload",
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

export default function BulkCompressorPage() {
  return (
    <ToolLayout toolSlug="bulk-compressor">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Bulk Image Compressor</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Compress up to 50 JPG, PNG, or WebP images at once and download every result together as a ZIP — entirely
        in your browser, with a summary of exactly how much space you saved.
      </p>

      <BulkCompressor />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Bulk Image Compressor?</h2>
        <p className="text-slate-400">
          The Bulk Image Compressor shrinks a whole batch of images in one pass, right in your browser tab. Drop in
          up to 50 JPG, PNG, or WebP files, set a single quality level, and every image is compressed using the same
          settings — no need to process files one at a time. Each row in the results table shows the original size,
          the compressed size, and the percentage saved, so you can see exactly what happened to every file. Once
          everything is done, a summary panel totals the original size, the compressed size, the overall bytes and
          percentage saved, and the average compression ratio across the whole batch. Because nothing is uploaded to
          a server, it works on large batches of private photos, product images, or design assets without any
          privacy concerns, and every result can be downloaded individually or all together as a single ZIP file.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Bulk Image Compressor</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop up to 50 JPG, PNG, or WebP images into the upload area (or click to browse).</li>
          <li>Adjust the quality slider to balance file size against visual quality — it applies to every image.</li>
          <li>Click Compress All to process the whole batch at once.</li>
          <li>Watch each row update from Waiting to Compressing to Done, and check the summary stats above the table.</li>
          <li>Download individual images from their row, or click Download All as ZIP to get everything at once.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
