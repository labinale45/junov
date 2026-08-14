import type { Metadata } from "next";
import { ImageBase64 } from "@/components/tools/ImageBase64";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-base64")!;

export const metadata: Metadata = {
  title: "Image to Base64 — Free, No Upload",
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

export default function ImageBase64Page() {
  return (
    <ToolLayout toolSlug="image-base64">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Image to Base64 Converter</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Encode images to a Base64 string, or decode a Base64 string back into a downloadable image — entirely in
        your browser. Nothing is ever uploaded to a server.
      </p>

      <ImageBase64 />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is Base64 Image Encoding?</h2>
        <p className="text-slate-400">
          Base64 is a text encoding scheme that represents binary data — like an image file — as a string made up
          of letters, numbers, and a few symbols. Encoding an image to Base64 lets you embed it directly inside
          HTML, CSS, or JSON without linking to a separate file, which is handy for small icons, inline email
          images, or CSS background images that need to travel as a single self-contained block of text. The
          resulting string is typically wrapped in a &quot;data URL&quot; like{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-slate-300">
            data:image/png;base64,...
          </code>{" "}
          so browsers know how to decode and render it. This tool converts in both directions: upload an image to
          get its Base64 string, or paste a Base64 string (with or without the data URL prefix) to preview and
          download the original image. Everything happens locally using the browser&apos;s built-in FileReader API —
          your images and strings are never sent anywhere.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Image to Base64 Converter</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Choose the &quot;Image to Base64&quot; or &quot;Base64 to Image&quot; tab depending on what you need.</li>
          <li>To encode, drag and drop a JPG, PNG, WebP, GIF, or SVG file into the upload area.</li>
          <li>Copy the generated Base64 string or download it as a .txt file.</li>
          <li>To decode, paste a full data URL or a raw Base64 string into the text box.</li>
          <li>Review the live image preview, then click Download image to save the result.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
