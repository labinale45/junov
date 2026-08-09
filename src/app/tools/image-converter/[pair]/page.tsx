import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageConverter } from "@/components/tools/ImageConverter";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { CONVERTER_PAIRS, getConverterPairBySlug } from "@/lib/converter-pairs";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-converter")!;

type Props = { params: Promise<{ pair: string }> };

export function generateStaticParams() {
  return CONVERTER_PAIRS.map((pair) => ({ pair: pair.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair: slug } = await params;
  const pair = getConverterPairBySlug(slug);
  if (!pair) return { title: "Not found" };

  const title = `Convert ${pair.fromLabel} to ${pair.toLabel} Online Free`;
  const description = `Convert ${pair.fromLabel} to ${pair.toLabel} for free, right in your browser. No upload, no signup — pick your file and download the ${pair.toLabel} result instantly.`;
  const path = `/tools/image-converter/${pair.slug}`;

  return {
    title,
    description,
    keywords: [
      `${pair.fromLabel.toLowerCase()} to ${pair.toLabel.toLowerCase()}`,
      `convert ${pair.fromLabel.toLowerCase()} to ${pair.toLabel.toLowerCase()}`,
      `${pair.fromLabel.toLowerCase()} to ${pair.toLabel.toLowerCase()} converter`,
      "image converter",
      "convert image online free",
      ...tool.keywords,
    ],
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      title: `${title} | Rabin Ale`,
      description,
      url: `${siteUrl}${path}`,
      type: "website",
      images: [{ url: toolOgImageUrl(title), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Rabin Ale`,
      description,
      images: [toolOgImageUrl(title)],
    },
  };
}

export default async function ImageConverterPairPage({ params }: Props) {
  const { pair: slug } = await params;
  const pair = getConverterPairBySlug(slug);
  if (!pair) notFound();

  const otherPairs = CONVERTER_PAIRS.filter((p) => p.slug !== pair.slug);

  return (
    <ToolLayout toolSlug="image-converter">
      <ToolJsonLd
        tool={tool}
        pagePath={`/tools/image-converter/${pair.slug}`}
        pageName={`Convert ${pair.fromLabel} to ${pair.toLabel}`}
      />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">
        Convert {pair.fromLabel} to {pair.toLabel}
      </h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Upload a {pair.fromLabel} file and this tool converts it straight to {pair.toLabel} — entirely in your
        browser. Nothing is ever uploaded to a server.
      </p>

      <ImageConverter initialOutputFormat={pair.toFormat} />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">
          Converting {pair.fromLabel} to {pair.toLabel}
        </h2>
        <p className="text-slate-400">
          {pair.fromLabel} and {pair.toLabel} serve different purposes, and switching between them is one of the
          most common image tasks there is — whether it&apos;s an iPhone photo saved as HEIC that a website won&apos;t
          accept, or a PNG that needs to shrink down for the web. This tool reads your {pair.fromLabel} file into
          memory, decodes it using the browser&apos;s native image renderer, and re-encodes it as {pair.toLabel} —
          all on your device. Because nothing is sent to a server, it works even on private or sensitive images,
          and it keeps working offline once the page has loaded. Need a different pair? The full converter below
          supports HEIC, JPG, PNG, WebP, AVIF, BMP, GIF, TIFF, SVG and PDF in any direction.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use It</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop your {pair.fromLabel} file into the upload area (or click to browse).</li>
          <li>
            The output format is already set to {pair.toLabel} — change it if you need a different format instead.
          </li>
          {["jpg", "webp", "avif"].includes(pair.toFormat) ? (
            <li>Adjust the quality slider to balance file size and visual clarity.</li>
          ) : null}
          <li>Click Convert and download the {pair.toLabel} result.</li>
          <li>Converting several files? Switch to bulk mode and download everything as a ZIP.</li>
        </ol>

        <h2 className="text-xl font-bold text-slate-50">Other Conversions</h2>
        <div className="flex flex-wrap gap-2">
          {otherPairs.map((p) => (
            <Link
              key={p.slug}
              href={`/tools/image-converter/${p.slug}`}
              className="rounded-lg border border-white/[0.08] bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors duration-200 ease-out hover:border-violet-500/40 hover:text-white"
            >
              {p.fromLabel} to {p.toLabel}
            </Link>
          ))}
          <Link
            href="/tools/image-converter"
            className="rounded-lg border border-white/[0.08] bg-slate-900 px-3 py-1.5 text-sm font-medium text-violet-400 transition-colors duration-200 ease-out hover:border-violet-500/40 hover:text-violet-300"
          >
            Full converter (all formats) →
          </Link>
        </div>
      </section>
    </ToolLayout>
  );
}
