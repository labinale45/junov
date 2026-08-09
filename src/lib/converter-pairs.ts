import type { OutputFormat } from "@/components/tools/ImageConverter";

export interface ConverterPair {
  slug: string;
  fromLabel: string;
  toLabel: string;
  toFormat: OutputFormat;
}

export const CONVERTER_PAIRS: ConverterPair[] = [
  { slug: "heic-to-jpg", fromLabel: "HEIC", toLabel: "JPG", toFormat: "jpg" },
  { slug: "heic-to-png", fromLabel: "HEIC", toLabel: "PNG", toFormat: "png" },
  { slug: "png-to-jpg", fromLabel: "PNG", toLabel: "JPG", toFormat: "jpg" },
  { slug: "jpg-to-png", fromLabel: "JPG", toLabel: "PNG", toFormat: "png" },
  { slug: "png-to-webp", fromLabel: "PNG", toLabel: "WebP", toFormat: "webp" },
  { slug: "webp-to-png", fromLabel: "WebP", toLabel: "PNG", toFormat: "png" },
  { slug: "jpg-to-webp", fromLabel: "JPG", toLabel: "WebP", toFormat: "webp" },
  { slug: "webp-to-jpg", fromLabel: "WebP", toLabel: "JPG", toFormat: "jpg" },
  { slug: "svg-to-png", fromLabel: "SVG", toLabel: "PNG", toFormat: "png" },
  { slug: "avif-to-jpg", fromLabel: "AVIF", toLabel: "JPG", toFormat: "jpg" },
  { slug: "gif-to-png", fromLabel: "GIF", toLabel: "PNG", toFormat: "png" },
  { slug: "bmp-to-jpg", fromLabel: "BMP", toLabel: "JPG", toFormat: "jpg" },
];

export function getConverterPairBySlug(slug: string): ConverterPair | undefined {
  return CONVERTER_PAIRS.find((p) => p.slug === slug);
}
