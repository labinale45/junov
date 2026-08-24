import type { Metadata } from "next";
import { Watermark } from "@/components/tools/Watermark";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("watermark")!;

export const metadata: Metadata = {
  title: "Add Watermark to Photo — Free, No Upload",
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

export default function WatermarkPage() {
  return (
    <ToolLayout toolSlug="watermark">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Watermark Adder</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Add a text or logo watermark to your photos with full control over size, color, opacity and position —
        entirely in your browser. Nothing is ever uploaded to a server.
      </p>

      <Watermark />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Watermark Adder?</h2>
        <p className="text-slate-400">
          The Watermark Adder stamps a custom text label or logo image onto your photos to protect your work or
          reinforce your brand before sharing them online. Choose between a text watermark — with your own wording,
          font size, color and opacity — or an image watermark using your own logo, scaled as a percentage of the
          photo&apos;s width. A nine-point position grid lets you anchor the watermark to any corner, edge, or the
          center of the image, and a live canvas preview updates instantly as you adjust the controls so you can see
          exactly how the final result will look. Everything is rendered with the browser&apos;s built-in Canvas API,
          so your original photo and any logo you upload stay on your device the entire time — nothing is sent to a
          server, which makes it safe to use on private or unpublished images. The finished image downloads in the
          same format as the one you uploaded.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Watermark Adder</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop the photo you want to watermark into the upload area.</li>
          <li>Pick the Text Watermark or Image Watermark tab depending on what you want to add.</li>
          <li>For text, type your wording and adjust font size, color and opacity; for a logo, upload the image and adjust its size and opacity.</li>
          <li>Use the nine-point grid to anchor the watermark to a corner, edge, or the center of the photo.</li>
          <li>Check the live preview, then click Download Watermarked Image to save the result.</li>
        </ol>

        <h2 className="text-xl font-bold text-slate-50">When to Add a Watermark to a Photo</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-400">
          <li>
            <strong className="text-slate-200">Photographers</strong> protecting proofs or portfolio shots before
            sharing them publicly online.
          </li>
          <li>
            <strong className="text-slate-200">Small business owners</strong> branding product photos for a shop,
            marketplace listing, or social media page.
          </li>
          <li>
            <strong className="text-slate-200">Freelancers and designers</strong> adding a signature or logo to
            client previews before final delivery.
          </li>
          <li>
            <strong className="text-slate-200">Content creators</strong> marking screenshots or graphics so reposts
            stay traceable back to the original source.
          </li>
          <li>
            <strong className="text-slate-200">Real estate and event photographers</strong> stamping a studio name
            across gallery previews.
          </li>
        </ul>
      </section>
    </ToolLayout>
  );
}
