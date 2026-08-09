import type { Metadata } from "next";
import { ImageResizer } from "@/components/tools/ImageResizer";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-resizer")!;

export const metadata: Metadata = {
  title: "Free Image Resizer — Resize Images Online",
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

export default function ImageResizerPage() {
  return (
    <ToolLayout toolSlug="image-resizer">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Image Resizer</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Resize JPG, PNG, or WebP images by exact pixels or by percentage, with an optional locked aspect ratio —
        entirely in your browser. Nothing is ever uploaded to a server.
      </p>

      <ImageResizer />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Image Resizer?</h2>
        <p className="text-slate-400">
          The Image Resizer changes the pixel dimensions of an image without sending it anywhere. It loads your
          file into the browser, draws it onto an HTML canvas at the target size, and re-encodes it back to the
          same format you uploaded. You can set an exact width and height in pixels, or scale the whole image by a
          percentage — 50% for half size, 200% to double it, and so on. With aspect ratio locked, changing one
          dimension automatically recalculates the other so your image never looks stretched or squashed. This is
          useful for shrinking oversized photos before uploading them to a website, preparing images for social
          media dimensions, or scaling down screenshots to save space. Because everything runs locally in your
          browser&apos;s memory, resizing is instant and your images stay completely private.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Image Resizer</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop a JPG, PNG, or WebP image into the upload area.</li>
          <li>Check the original dimensions shown above the resize controls.</li>
          <li>Choose &quot;By Pixels&quot; to set an exact width and height, or &quot;By Percentage&quot; to scale proportionally.</li>
          <li>Keep &quot;Lock aspect ratio&quot; on to preserve proportions, or turn it off for a custom width and height.</li>
          <li>Review the live &quot;Result&quot; dimensions, click Resize Image, then download the resized file.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
