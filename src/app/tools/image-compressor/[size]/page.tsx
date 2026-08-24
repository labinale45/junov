import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageCompressor } from "@/components/tools/ImageCompressor";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { COMPRESSOR_PRESETS, getPresetBySlug, type CompressorPreset } from "@/lib/compressor-presets";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug, type ToolFaqItem } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-compressor")!;

type Props = { params: Promise<{ size: string }> };

export function generateStaticParams() {
  return COMPRESSOR_PRESETS.map((preset) => ({ size: preset.slug }));
}

function faqsForPreset(preset: CompressorPreset): ToolFaqItem[] {
  const { label } = preset;
  return [
    {
      question: `How do I compress an image to ${label}?`,
      answer: `Upload your image and the tool automatically searches for the highest quality that still fits under ${label} — download it as soon as it's done.`,
    },
    { question: `Is it free to compress images to ${label}?`, answer: "Yes, completely free with no login or file limit." },
    {
      question: "Are my images uploaded to a server?",
      answer: `No, compression runs 100% in your browser using the Canvas API — your image is never uploaded anywhere.`,
    },
    { question: `What image formats can I compress to ${label}?`, answer: "JPG, PNG, WebP and AVIF." },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { size } = await params;
  const preset = getPresetBySlug(size);
  if (!preset) return { title: "Not found" };

  const title = `Compress Image to ${preset.label} Online Free`;
  const description = `Compress any JPG, PNG, WebP or AVIF image down to ${preset.label} for free, right in your browser. No upload, no signup — pick your file and download a ${preset.label}-or-smaller result instantly.`;
  const path = `/tools/image-compressor/${preset.slug}`;

  return {
    title,
    description,
    keywords: [
      `compress image to ${preset.label.toLowerCase()}`,
      `reduce image size to ${preset.label.toLowerCase()}`,
      "image compressor",
      "compress image online free",
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

export default async function ImageCompressorSizePage({ params }: Props) {
  const { size } = await params;
  const preset = getPresetBySlug(size);
  if (!preset) notFound();

  const otherPresets = COMPRESSOR_PRESETS.filter((p) => p.slug !== preset.slug);
  const faqs = faqsForPreset(preset);

  return (
    <ToolLayout toolSlug="image-compressor" faqs={faqs}>
      <ToolJsonLd
        tool={tool}
        pagePath={`/tools/image-compressor/${preset.slug}`}
        pageName={`Compress Image to ${preset.label}`}
        faqs={faqs}
      />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Compress Image to {preset.label}</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Upload a JPG, PNG, WebP or AVIF image and this tool will automatically target a {preset.label} file size —
        entirely in your browser, nothing is ever uploaded to a server.
      </p>

      <ImageCompressor initialTargetKB={preset.targetKB} />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">Why compress to {preset.label}?</h2>
        <p className="text-slate-400">
          Target file sizes like {preset.label} usually come from a hard limit somewhere else — an email
          attachment cap, a job application portal, a government form, a website&apos;s upload guidelines, or a
          slow connection you want to keep fast. Instead of guessing a quality percentage and hoping the result
          lands under the limit, this mode runs an iterative search: it re-encodes your image at progressively
          lower quality (and, if needed, slightly smaller dimensions) until the file fits at or under{" "}
          {preset.label}, then stops — so you get the best quality possible within that budget, not the smallest
          file the tool can technically produce. Everything happens locally using the Canvas API, so your photo
          never leaves your device.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use It</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop your JPG, PNG, WebP or AVIF image into the upload area.</li>
          <li>
            The target size is already set to {preset.label} — adjust it if you need something different, or switch
            to &quot;By Quality&quot; mode instead.
          </li>
          <li>Click Compress and let the tool search for the best quality that fits your target size.</li>
          <li>Compare the original and compressed versions with the before/after slider.</li>
          <li>Download the result, or start over with a new image.</li>
        </ol>

        <h2 className="text-xl font-bold text-slate-50">When to Compress an Image to {preset.label}</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-400">
          <li>
            <strong className="text-slate-200">Job applicants</strong> whose application portal or ATS rejects
            resume photos or attachments over a set file size.
          </li>
          <li>
            <strong className="text-slate-200">Students</strong> submitting assignments to platforms with strict
            upload limits.
          </li>
          <li>
            <strong className="text-slate-200">Government and visa form applicants</strong> who need a photo under
            an exact size specified in the instructions.
          </li>
          <li>
            <strong className="text-slate-200">Anyone emailing photos</strong> who wants to stay under an
            attachment size cap without switching to a file-sharing link.
          </li>
          <li>
            <strong className="text-slate-200">Website owners</strong> keeping page weight down for faster load
            times and better Core Web Vitals.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-slate-50">Other Target Sizes</h2>
        <div className="flex flex-wrap gap-2">
          {otherPresets.map((p) => (
            <Link
              key={p.slug}
              href={`/tools/image-compressor/${p.slug}`}
              className="rounded-lg border border-white/[0.08] bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors duration-200 ease-out hover:border-violet-500/40 hover:text-white"
            >
              Compress to {p.label}
            </Link>
          ))}
          <Link
            href="/tools/image-compressor"
            className="rounded-lg border border-white/[0.08] bg-slate-900 px-3 py-1.5 text-sm font-medium text-violet-400 transition-colors duration-200 ease-out hover:border-violet-500/40 hover:text-violet-300"
          >
            Full compressor (custom quality or size) →
          </Link>
        </div>
      </section>
    </ToolLayout>
  );
}
