import type { Metadata } from "next";
import { ImageCropper } from "@/components/tools/ImageCropper";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-cropper")!;

export const metadata: Metadata = {
  title: "Image Cropper — Free, No Upload",
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

export default function ImageCropperPage() {
  return (
    <ToolLayout toolSlug="image-cropper">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Image Cropper</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Crop JPG, PNG, and WebP images right in your browser — drag to select a region, snap to a preset aspect
        ratio, and download the result. Nothing is ever uploaded to a server.
      </p>

      <ImageCropper />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Image Cropper?</h2>
        <p className="text-slate-400">
          The Image Cropper lets you trim an image down to exactly the region you want, directly in your browser tab.
          Drag the corner or edge handles to resize the crop box, drag inside it to reposition, and watch the exact
          pixel dimensions update live as you adjust. Snap to a preset ratio like 1:1 for a profile photo, 16:9 for a
          video thumbnail, or 9:16 for a story — or leave it on Free for a fully custom selection. When you&apos;re
          happy with the selection, the tool renders only that region onto a canvas at the image&apos;s original
          resolution and exports it in the source format, so quality is never downscaled by the on-screen preview.
          Because everything happens client-side, your photos are never uploaded anywhere, which makes this a safe
          option for cropping personal or sensitive images.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Image Cropper</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop a JPG, PNG, or WebP image into the upload area.</li>
          <li>Pick a preset aspect ratio, or leave it on Free to crop any shape.</li>
          <li>Drag the crop box&apos;s handles to resize it, and drag inside it to move it.</li>
          <li>Check the live width × height readout to confirm the exact pixel dimensions.</li>
          <li>Click Crop &amp; Download, then save the cropped image to your device.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
