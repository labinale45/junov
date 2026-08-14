import type { Metadata } from "next";
import { ColorPicker } from "@/components/tools/ColorPicker";
import { ToolJsonLd } from "@/components/tools/shared/ToolJsonLd";
import { ToolLayout } from "@/components/tools/shared/ToolLayout";
import { getSiteUrl, toolOgImageUrl } from "@/lib/site";
import { getToolBySlug } from "@/lib/tools-registry";

const siteUrl = getSiteUrl();
const tool = getToolBySlug("color-picker")!;

export const metadata: Metadata = {
  title: "Color Picker from Image — Free, No Upload",
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

export default function ColorPickerPage() {
  return (
    <ToolLayout toolSlug="color-picker">
      <ToolJsonLd tool={tool} />
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-400">Image Tools</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-50 lg:text-4xl">Free Color Picker & Palette Extractor</h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-400">
        Upload an image, click anywhere to pick a color, and get instant HEX, RGB and HSL values — plus an
        automatically extracted 8-color dominant palette. Everything runs in your browser, nothing is uploaded.
      </p>

      <ColorPicker />

      <section className="mt-14 max-w-3xl space-y-4 leading-relaxed text-slate-300">
        <h2 className="text-xl font-bold text-slate-50">What is the Color Picker & Palette Extractor?</h2>
        <p className="text-slate-400">
          The Color Picker & Palette Extractor lets you sample any color from an image and see its exact value in
          three common formats — HEX, RGB, and HSL — instantly, without installing any software. Upload a JPG, PNG,
          or WebP image, click anywhere on it, and the pixel color under your cursor is captured and displayed with
          one-click copy buttons for each format. Alongside manual picking, the tool automatically analyzes the whole
          image and extracts its eight most dominant colors, presenting them as clickable swatches you can copy
          straight to your clipboard. This is useful for designers pulling a palette from a photo or mockup,
          developers grabbing a brand color for CSS, or anyone matching colors across projects. All processing
          happens locally in your browser using the Canvas API, so your images are never uploaded or stored anywhere.
        </p>

        <h2 className="text-xl font-bold text-slate-50">How to Use the Color Picker</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-400">
          <li>Drag and drop an image (JPG, PNG, or WebP) into the upload area, or click to browse.</li>
          <li>Wait a moment while the dominant color palette is automatically extracted.</li>
          <li>Move your cursor over the image to preview colors live, and click to lock in a picked color.</li>
          <li>Copy the HEX, RGB, or HSL value using the copy button next to each format.</li>
          <li>Click any swatch in the palette below the image to copy its HEX code directly.</li>
        </ol>
      </section>
    </ToolLayout>
  );
}
