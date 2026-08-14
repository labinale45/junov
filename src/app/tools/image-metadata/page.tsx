import type { Metadata } from "next";
import { ImageMetadata } from "@/components/tools/ImageMetadata";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("image-metadata")!;

export const metadata: Metadata = {
  title: "EXIF Viewer Online — Free, No Upload",
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

export default function ImageMetadataPage() {
  return (
    <ToolLayout toolSlug="image-metadata">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Image Metadata Viewer</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Upload a photo to see its EXIF metadata — camera model, lens, exposure settings, GPS location, dimensions and
        more — instantly and entirely in your browser.
      </p>

      <ImageMetadata />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Image Metadata Viewer?</h2>
        <p className="text-slate-400">
          The Image Metadata Viewer reads the hidden EXIF data embedded inside your photos — details like the
          camera make and model, lens used, exposure time, aperture, ISO, the date the photo was taken, and even
          the exact GPS coordinates if location data was recorded. It parses this information directly in your
          browser using JavaScript, so your image is never uploaded anywhere. This makes it useful for
          photographers checking their shooting settings, for verifying whether a photo still carries GPS data
          before sharing it publicly, or simply for curiosity about how an image was captured. Because so many
          images shared online have their metadata stripped by social platforms and messaging apps, the tool also
          clearly tells you when no EXIF data is present rather than showing a confusing blank screen. Every result
          can be copied as raw JSON for further use.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Image Metadata Viewer</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop a JPG, PNG, WebP, or HEIC image into the upload area (up to 20MB).</li>
          <li>Wait a moment while the metadata is read directly in your browser.</li>
          <li>Review the organized sections: Camera, Date Taken, Exposure, GPS, Dimensions and Color Space.</li>
          <li>If GPS coordinates are present, click &quot;View on Google Maps&quot; to see where the photo was taken.</li>
          <li>Click &quot;Copy all metadata as JSON&quot; to export every detected field at once.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
