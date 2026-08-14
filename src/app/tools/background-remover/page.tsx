import type { Metadata } from "next";
import { BackgroundRemover } from "@/components/tools/BackgroundRemover";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("background-remover")!;

export const metadata: Metadata = {
  title: "Remove Background from Image — Free",
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

export default function BackgroundRemoverPage() {
  return (
    <ToolLayout toolSlug="background-remover" privacyNote="Runs entirely in your browser using AI. Your image never leaves your device.">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">AI Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Background Remover</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Remove the background from any photo in one click using an AI model that runs entirely inside your browser.
        Get a transparent PNG cutout, or drop it onto white, black, or any custom color — no upload, no account, no
        cost.
      </p>

      <BackgroundRemover />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Background Remover?</h2>
        <p className="text-slate-400">
          The Background Remover uses an on-device AI model to detect the main subject in a photo and cut it out
          from its background automatically — no manual selection, masking, or brush tools required. The model
          (delivered via WebAssembly) downloads once to your browser and then processes every image locally, so your
          photo is never uploaded to a server. The result is a PNG with a transparent background that you can drop
          straight into a design, product listing, presentation, or profile picture. If you&apos;d rather not keep the
          transparency, you can composite the cutout onto a solid white, black, or custom-colored background and
          preview the result live before downloading. Because everything runs in-browser, it works with portraits,
          product shots, logos, and pretty much any photo with a clear subject, and it keeps working even on a slow
          or unreliable connection once the model has loaded.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Background Remover</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop a JPG, PNG, or WebP photo into the upload area (up to 10MB).</li>
          <li>Click &quot;Remove Background&quot; and wait for the AI model to process your image.</li>
          <li>On the first run, allow 10-15 seconds for the AI model to download to your browser.</li>
          <li>Drag the before/after slider to compare the original photo with the background-removed result.</li>
          <li>Choose Transparent, White, Black, or a custom color, then download the finished PNG.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
