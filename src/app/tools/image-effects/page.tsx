import type { Metadata } from "next";
import { ImageEffects } from "@/components/tools/ImageEffects";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-effects")!;

export const metadata: Metadata = {
  title: "Photo Filters Online — Free, No Upload",
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

export default function ImageEffectsPage() {
  return (
    <ToolLayout toolSlug="image-effects">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Image Effects</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Apply one-click filters — grayscale, sepia, invert, vintage, blur, pixelate and more — to your photos
        entirely in your browser. Preview instantly and download the result. Nothing is ever uploaded to a server.
      </p>

      <ImageEffects />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is Image Effects?</h2>
        <p className="text-slate-400">
          Image Effects is a one-click filter tool that transforms your photos with classic looks like grayscale,
          sepia, invert, black &amp; white, blur, pixelate, vignette, vintage, warm and cool tones — all without
          leaving your browser tab. Upload an image, tap an effect chip, and see a full preview generated instantly
          using the Canvas API&apos;s pixel manipulation. Each filter reads the image&apos;s raw pixel data,
          transforms it with a small, well-known formula (like averaging RGB channels for grayscale or applying a
          sepia matrix), and redraws the result — all in browser memory. Because nothing is sent to a server, your
          images stay completely private and the tool keeps working even offline once the page has loaded. It&apos;s
          a fast way to experiment with photo looks before downloading the version you like best.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use Image Effects</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop a JPG, PNG or WebP image into the upload area (up to 20MB).</li>
          <li>Browse the effect chips — Grayscale, Sepia, Invert, Black &amp; White, Blur, Pixelate, Vignette, Vintage, Warm and Cool.</li>
          <li>Click any chip to instantly apply that effect and see a full preview next to the original.</li>
          <li>Try different effects freely — each click re-renders the preview from the original image.</li>
          <li>When you&apos;re happy with the result, click Download to save the filtered image.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
