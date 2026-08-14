import type { Metadata } from "next";
import { ImageEditor } from "@/components/tools/ImageEditor";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-editor")!;

export const metadata: Metadata = {
  title: "Online Photo Editor — Free, No Upload",
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

export default function ImageEditorPage() {
  return (
    <ToolLayout toolSlug="image-editor">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Image Editor</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Fine-tune brightness, contrast, saturation, hue, sharpness and blur with a live preview — entirely in your
        browser. Nothing is ever uploaded to a server.
      </p>

      <ImageEditor />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Image Editor?</h2>
        <p className="text-slate-400">
          The Image Editor is a browser-based adjustments tool for quickly fixing or stylizing a photo without
          installing any software. It gives you six sliders — brightness, contrast, saturation, hue, sharpness and
          blur — each mapped to a real image-processing operation, with a canvas preview that updates instantly as
          you drag. Brightness, contrast, saturation, hue and blur are applied live using the browser&apos;s native
          filter engine for zero-lag feedback, while sharpness uses a genuine convolution kernel that is baked into
          the file the moment you download it. Because every pixel is processed locally in your browser&apos;s
          memory, your photos are never uploaded anywhere, which makes it a safe choice for personal or sensitive
          images. It works well for correcting underexposed photos, boosting flat colors, softening a busy
          background, or crisping up a slightly soft shot before sharing it online.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Image Editor</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop a JPG, PNG or WebP image (up to 20MB) into the upload area.</li>
          <li>Drag the Brightness, Contrast, Saturation and Hue sliders and watch the preview update instantly.</li>
          <li>Add Sharpness to bring out fine detail, or Blur to soften the whole image.</li>
          <li>Click Reset All at any time to return every slider to its default value.</li>
          <li>Click Download Edited Image to save the result with your adjustments baked in.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
