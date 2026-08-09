import type { Metadata } from "next";
import { ImageEnhancer } from "@/components/tools/ImageEnhancer";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-enhancer")!;

export const metadata: Metadata = {
  title: "Free AI Image Enhancer — Upscale & Sharpen Images Online",
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

export default function ImageEnhancerPage() {
  return (
    <ToolLayout toolSlug="image-enhancer">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">AI Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free AI Image Enhancer</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Upscale and sharpen images 2x or 4x using an AI model that runs entirely in your browser. No uploads, no
        accounts, no cost — just a clearer, larger version of your image in seconds.
      </p>

      <ImageEnhancer />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the AI Image Enhancer?</h2>
        <p className="text-slate-400">
          The AI Image Enhancer uses a neural network, powered by TensorFlow.js, to upscale images beyond what
          simple resizing can achieve. Instead of stretching pixels and leaving them blurry, the model predicts
          plausible detail as it enlarges the picture, producing sharper edges and cleaner textures at 2x or 4x the
          original resolution. Everything happens locally in your browser tab using WebGL — the image is decoded,
          processed by the model, and re-encoded without ever being sent to a server. That makes it just as suitable
          for private photos as for images you plan to publish. It&apos;s useful for enlarging small product photos,
          sharpening old or low-resolution pictures, or preparing images for print and larger displays. Because the
          model runs entirely client-side, the first enhancement on a page load takes a few extra seconds to
          initialize; after that, processing is limited mainly by your device&apos;s hardware and the size of the
          source image.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the AI Image Enhancer</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop a JPG, PNG, or WebP image into the upload area (up to 5MB).</li>
          <li>Choose your upscale factor — 2x or 4x — using the toggle.</li>
          <li>Click Enhance and wait while the AI model loads and processes your image in the browser.</li>
          <li>Drag the before/after slider to compare the original and enhanced results side by side.</li>
          <li>Check the reported dimensions, then download the enhanced image as a PNG.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
