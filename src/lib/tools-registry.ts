import type { LucideIcon } from "lucide-react";
import {
  Braces,
  Bot,
  Crop,
  Eraser,
  FileImage,
  ImagePlus,
  Layers,
  Palette,
  ScanEye,
  Sparkles,
  Square,
  Stamp,
  Star,
  SlidersHorizontal,
  Wand2,
} from "lucide-react";

export type ToolCategory = "image" | "ai" | "developer";

export type AccentColor =
  | "amber"
  | "emerald"
  | "sky"
  | "blue"
  | "fuchsia"
  | "violet"
  | "rose"
  | "indigo"
  | "teal"
  | "cyan"
  | "orange"
  | "pink"
  | "yellow"
  | "lime"
  | "purple"
  | "slate";

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export interface ToolDef {
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  categoryLabel: string;
  icon: LucideIcon;
  /** Per-tool accent for the hub grid's icon badge — keeps the grid quickly scannable, like a competitor's colorful tool grid. */
  accent: AccentColor;
  /** Shows a "New" tag on the hub card. */
  isNew?: boolean;
  keywords: string[];
  faqs: ToolFaqItem[];
  related: string[];
}

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  image: "Image Tools",
  ai: "AI Tools",
  developer: "Developer Tools",
};

interface AccentClasses {
  badge: string;
  glow: string;
}

export const ACCENT_CLASSES: Record<AccentColor, AccentClasses> = {
  amber: {
    badge: "bg-amber-500/15 text-amber-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(245,158,11,0.3),0_16px_36px_-12px_rgba(245,158,11,0.45)] hover:border-amber-500/50",
  },
  emerald: {
    badge: "bg-emerald-500/15 text-emerald-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(16,185,129,0.3),0_16px_36px_-12px_rgba(16,185,129,0.45)] hover:border-emerald-500/50",
  },
  sky: {
    badge: "bg-sky-500/15 text-sky-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(14,165,233,0.3),0_16px_36px_-12px_rgba(14,165,233,0.45)] hover:border-sky-500/50",
  },
  blue: {
    badge: "bg-blue-500/15 text-blue-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(59,130,246,0.3),0_16px_36px_-12px_rgba(59,130,246,0.45)] hover:border-blue-500/50",
  },
  fuchsia: {
    badge: "bg-fuchsia-500/15 text-fuchsia-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(217,70,239,0.3),0_16px_36px_-12px_rgba(217,70,239,0.45)] hover:border-fuchsia-500/50",
  },
  violet: {
    badge: "bg-violet-500/15 text-violet-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(124,58,237,0.3),0_16px_36px_-12px_rgba(124,58,237,0.45)] hover:border-violet-500/50",
  },
  rose: {
    badge: "bg-rose-500/15 text-rose-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(244,63,94,0.3),0_16px_36px_-12px_rgba(244,63,94,0.45)] hover:border-rose-500/50",
  },
  indigo: {
    badge: "bg-indigo-500/15 text-indigo-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_16px_36px_-12px_rgba(99,102,241,0.45)] hover:border-indigo-500/50",
  },
  teal: {
    badge: "bg-teal-500/15 text-teal-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(20,184,166,0.3),0_16px_36px_-12px_rgba(20,184,166,0.45)] hover:border-teal-500/50",
  },
  cyan: {
    badge: "bg-cyan-500/15 text-cyan-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(6,182,212,0.3),0_16px_36px_-12px_rgba(6,182,212,0.45)] hover:border-cyan-500/50",
  },
  orange: {
    badge: "bg-orange-500/15 text-orange-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(249,115,22,0.3),0_16px_36px_-12px_rgba(249,115,22,0.45)] hover:border-orange-500/50",
  },
  pink: {
    badge: "bg-pink-500/15 text-pink-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(236,72,153,0.3),0_16px_36px_-12px_rgba(236,72,153,0.45)] hover:border-pink-500/50",
  },
  yellow: {
    badge: "bg-yellow-500/15 text-yellow-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(234,179,8,0.3),0_16px_36px_-12px_rgba(234,179,8,0.45)] hover:border-yellow-500/50",
  },
  lime: {
    badge: "bg-lime-500/15 text-lime-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(132,204,22,0.3),0_16px_36px_-12px_rgba(132,204,22,0.45)] hover:border-lime-500/50",
  },
  purple: {
    badge: "bg-purple-500/15 text-purple-400",
    glow: "hover:shadow-[0_0_0_1px_rgba(168,85,247,0.3),0_16px_36px_-12px_rgba(168,85,247,0.45)] hover:border-purple-500/50",
  },
  slate: {
    badge: "bg-slate-500/15 text-slate-300",
    glow: "hover:shadow-[0_0_0_1px_rgba(100,116,139,0.3),0_16px_36px_-12px_rgba(100,116,139,0.45)] hover:border-slate-500/50",
  },
};

export const TOOLS: ToolDef[] = [
  {
    slug: "image-converter",
    name: "Image Converter",
    tagline: "Convert HEIC, JPG, PNG, WebP, AVIF & more — instantly",
    description: "Convert images between any format free. HEIC to JPG, PNG to WebP, JPG to AVIF and more. No upload needed, runs in your browser.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: FileImage,
    accent: "amber",
    keywords: ["image converter", "HEIC to JPG", "PNG to WebP", "convert image format online free", "AVIF converter"],
    faqs: [
      { question: "What image formats can I convert?", answer: "HEIC, JPG, PNG, WebP, AVIF, BMP, GIF, TIFF, SVG, PDF — all bidirectionally where possible." },
      { question: "Is HEIC to JPG conversion free?", answer: "Yes, completely free and runs in your browser." },
      { question: "Does conversion affect image quality?", answer: "Only lossy formats (JPG, WebP) reduce quality slightly. Use the quality slider to control this." },
      { question: "Can I convert multiple images at once?", answer: "Yes, use bulk mode to convert up to 20 images at once." },
      { question: "Do my images get uploaded to a server?", answer: "No. Everything runs in your browser. Your images never leave your device." },
    ],
    related: ["image-compressor", "image-resizer", "favicon-generator"],
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    tagline: "Reduce image file size without losing quality",
    description: "Compress JPG, PNG and WebP images online for free. Reduce file size without losing quality. No upload, runs in your browser instantly.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: Layers,
    accent: "emerald",
    keywords: ["image compressor", "compress image online", "reduce image size", "jpg compressor", "png compressor free"],
    faqs: [
      { question: "How much can I compress an image?", answer: "Typically 40-80% size reduction depending on the image and quality setting." },
      { question: "Will compression reduce image quality?", answer: "Minor quality reduction occurs with higher compression. Use the quality slider to find the right balance." },
      { question: "What formats are supported?", answer: "JPG, PNG, WebP, and AVIF." },
      { question: "Can I compress multiple images at once?", answer: "Yes, bulk mode lets you compress up to 50 images and download as ZIP." },
      { question: "Is my image uploaded to a server?", answer: "No. Compression happens entirely in your browser." },
    ],
    related: ["image-converter", "image-resizer", "bulk-compressor"],
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    tagline: "Resize by pixels or percentage with locked aspect ratio",
    description: "Resize images online for free by pixels or percentage. Maintain aspect ratio automatically. No upload, works in your browser.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: Square,
    accent: "sky",
    keywords: ["image resizer", "resize image online free", "change image size", "resize jpg png online"],
    faqs: [
      { question: "Can I resize without losing aspect ratio?", answer: "Yes, lock aspect ratio is on by default." },
      { question: "What formats are supported?", answer: "JPG, PNG, and WebP." },
      { question: "What is the maximum image size?", answer: "Up to 20MB." },
      { question: "Can I make an image larger?", answer: "Yes but enlarging may reduce quality." },
      { question: "Is the resized image saved anywhere?", answer: "No, everything runs in your browser." },
    ],
    related: ["image-cropper", "image-compressor", "image-converter"],
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    tagline: "Crop with preset ratios or freeform selection",
    description: "Crop images online free with preset aspect ratios or freeform. JPG, PNG, WebP supported. No upload, instant, runs in browser.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: Crop,
    accent: "blue",
    keywords: ["image cropper", "crop image online free", "crop jpg png online", "image crop tool"],
    faqs: [
      { question: "What aspect ratios are available?", answer: "Free, 1:1, 16:9, 4:3, 3:2, 9:16." },
      { question: "What formats are supported?", answer: "JPG, PNG, WebP." },
      { question: "Is the crop result saved anywhere?", answer: "No, everything runs in your browser." },
      { question: "Can I crop to exact pixel dimensions?", answer: "The live dimension display shows exact pixels as you crop." },
      { question: "What is the max file size?", answer: "20MB." },
    ],
    related: ["image-resizer", "image-compressor", "image-converter"],
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    tagline: "AI background removal, 100% in your browser",
    description: "Remove image backgrounds free using AI. Runs in your browser, no upload to server. JPG and PNG supported, download as transparent PNG.",
    category: "ai",
    categoryLabel: "AI Tools",
    icon: Eraser,
    accent: "fuchsia",
    isNew: true,
    keywords: ["background remover", "remove background free", "transparent background", "remove image background online"],
    faqs: [
      { question: "Does this use AI?", answer: "Yes, it uses an AI model that runs directly in your browser." },
      { question: "Is it really free?", answer: "Yes, completely free. No account needed." },
      { question: "Is my image sent to a server?", answer: "No. The AI model runs in your browser via WebAssembly." },
      { question: "What format is the output?", answer: "Always PNG to support transparency." },
      { question: "How long does it take?", answer: "First run loads the model (10-15 seconds), after that it is much faster." },
    ],
    related: ["image-converter", "image-editor", "watermark"],
  },
  {
    slug: "image-enhancer",
    name: "AI Image Enhancer",
    tagline: "Upscale and sharpen images 2x or 4x with AI",
    description: "Enhance and upscale images free using AI. 2x and 4x upscaling runs in your browser. No upload, no cost, instant download.",
    category: "ai",
    categoryLabel: "AI Tools",
    icon: Sparkles,
    accent: "violet",
    isNew: true,
    keywords: ["image enhancer", "upscale image free", "AI image upscaler", "enhance image quality online"],
    faqs: [
      { question: "How does the AI enhancement work?", answer: "It uses TensorFlow.js with a trained upscaling model running in your browser." },
      { question: "What upscale options are available?", answer: "2x and 4x." },
      { question: "Is my image uploaded anywhere?", answer: "No, everything runs in your browser." },
      { question: "What is the max file size?", answer: "5MB recommended for best performance." },
      { question: "What format is the output?", answer: "PNG." },
    ],
    related: ["background-remover", "image-compressor", "image-converter"],
  },
  {
    slug: "image-editor",
    name: "Image Editor",
    tagline: "Adjust brightness, contrast, saturation & more",
    description: "Edit images online free. Adjust brightness, contrast, saturation, hue, sharpness and blur. Instant preview, no upload needed.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: SlidersHorizontal,
    accent: "rose",
    keywords: ["image editor online free", "adjust brightness contrast", "image saturation tool", "online photo editor"],
    faqs: [
      { question: "What adjustments can I make?", answer: "Brightness, contrast, saturation, hue, sharpness, and blur." },
      { question: "Does it update in real time?", answer: "Yes, the preview updates instantly as you move sliders." },
      { question: "What formats are supported?", answer: "JPG, PNG, WebP." },
      { question: "Can I reset all changes?", answer: "Yes, use the Reset All button." },
      { question: "Is my image uploaded to a server?", answer: "No, everything runs in your browser." },
    ],
    related: ["image-effects", "image-cropper", "background-remover"],
  },
  {
    slug: "watermark",
    name: "Watermark Adder",
    tagline: "Add text or logo watermarks with full control",
    description: "Add text or image watermarks to photos online free. Choose position, opacity and size. No upload needed, runs in browser.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: Stamp,
    accent: "indigo",
    keywords: ["watermark image online free", "add watermark to photo", "text watermark", "image watermark tool"],
    faqs: [
      { question: "Can I add both text and image watermarks?", answer: "Yes, switch between tabs for each type." },
      { question: "Can I control watermark position?", answer: "Yes, choose from 9 anchor positions." },
      { question: "What formats are supported?", answer: "JPG, PNG, WebP." },
      { question: "Is my image uploaded?", answer: "No, runs entirely in browser." },
      { question: "Can I adjust opacity?", answer: "Yes with the opacity slider." },
    ],
    related: ["image-editor", "image-cropper", "background-remover"],
  },
  {
    slug: "image-effects",
    name: "Image Effects",
    tagline: "One-click filters: grayscale, sepia, vintage & more",
    description: "Apply grayscale, sepia, invert, vintage and more effects to images free online. Instant preview, no upload needed.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: Wand2,
    accent: "teal",
    keywords: ["image effects online", "photo filters free", "grayscale image", "sepia filter online", "image filter tool"],
    faqs: [
      { question: "What effects are available?", answer: "Grayscale, Sepia, Invert, Black & White, Blur, Pixelate, Vignette, Vintage, Warm, Cool." },
      { question: "Can I preview effects before downloading?", answer: "Yes, click any effect chip to preview instantly." },
      { question: "What formats are supported?", answer: "JPG, PNG, WebP." },
      { question: "Is it free?", answer: "Yes, completely free." },
      { question: "Is my image uploaded?", answer: "No, everything runs in your browser." },
    ],
    related: ["image-editor", "background-remover", "image-converter"],
  },
  {
    slug: "image-metadata",
    name: "Image Metadata Viewer",
    tagline: "View EXIF camera, GPS and dimension data",
    description: "View image EXIF metadata online free. See camera settings, GPS location, date taken and more. No upload, runs in browser.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: ScanEye,
    accent: "cyan",
    keywords: ["image metadata viewer", "EXIF data viewer", "view image metadata online", "EXIF reader free"],
    faqs: [
      { question: "What metadata can I view?", answer: "Camera model, lens, date, exposure, GPS, dimensions and more." },
      { question: "What formats are supported?", answer: "JPG, PNG, WebP, HEIC." },
      { question: "Can I see GPS location?", answer: "Yes if the image contains GPS EXIF data." },
      { question: "Is my image uploaded?", answer: "No, metadata is read entirely in your browser." },
      { question: "Can I export the metadata?", answer: "Yes, copy all metadata as JSON with one click." },
    ],
    related: ["image-converter", "image-compressor", "color-picker"],
  },
  {
    slug: "color-picker",
    name: "Color Picker & Palette Extractor",
    tagline: "Pick colors and extract dominant palettes from any image",
    description: "Pick colors from any image and extract dominant color palettes free online. Get HEX, RGB, HSL values instantly.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: Palette,
    accent: "orange",
    keywords: ["color picker from image", "image color extractor", "dominant color palette", "pick color from photo online free"],
    faqs: [
      { question: "How do I pick a color?", answer: "Upload an image and click anywhere on it." },
      { question: "What color formats are shown?", answer: "HEX, RGB, and HSL." },
      { question: "How many palette colors are extracted?", answer: "Up to 8 dominant colors." },
      { question: "What formats are supported?", answer: "JPG, PNG, WebP." },
      { question: "Is it free?", answer: "Yes, completely free." },
    ],
    related: ["image-editor", "image-effects", "watermark"],
  },
  {
    slug: "image-base64",
    name: "Image to Base64",
    shortName: "Image ⇄ Base64",
    tagline: "Encode images to Base64 or decode back to image",
    description: "Convert images to Base64 and Base64 back to images free online. Instant encoding and decoding in your browser.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: Braces,
    accent: "pink",
    keywords: ["image to base64", "base64 to image", "encode image base64 online free", "base64 converter"],
    faqs: [
      { question: "What is Base64 image encoding?", answer: "It converts image binary data into a text string that can be embedded in HTML or CSS." },
      { question: "What formats are supported?", answer: "JPG, PNG, WebP, GIF, SVG." },
      { question: "Can I convert Base64 back to image?", answer: "Yes, use the Base64 to Image tab." },
      { question: "Is it free?", answer: "Yes." },
      { question: "Is my image uploaded?", answer: "No, runs entirely in browser." },
    ],
    related: ["image-converter", "favicon-generator", "image-compressor"],
  },
  {
    slug: "favicon-generator",
    name: "Favicon Generator",
    tagline: "Generate every favicon size plus .ico in one click",
    description: "Generate favicons from any image free. Get all sizes (16x16 to 256x256) plus .ico file. No upload, instant download.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: Star,
    accent: "yellow",
    keywords: ["favicon generator", "create favicon online free", "favicon from image", "ico file generator"],
    faqs: [
      { question: "What sizes are generated?", answer: "16x16, 32x32, 48x48, 64x64, 128x128, 256x256." },
      { question: "What formats are supported as input?", answer: "PNG, SVG, JPG." },
      { question: "Can I download an .ico file?", answer: "Yes, included in the ZIP download." },
      { question: "Is it free?", answer: "Yes." },
      { question: "Is my image uploaded?", answer: "No, runs in browser." },
    ],
    related: ["image-converter", "image-resizer", "image-compressor"],
  },
  {
    slug: "bulk-compressor",
    name: "Bulk Image Compressor",
    tagline: "Compress up to 50 images at once and download as ZIP",
    description: "Compress multiple images at once free online. Upload up to 50 images, compress all in one click and download as ZIP.",
    category: "image",
    categoryLabel: "Image Tools",
    icon: ImagePlus,
    accent: "lime",
    keywords: ["bulk image compressor", "compress multiple images", "batch image compression free", "compress images online"],
    faqs: [
      { question: "How many images can I compress at once?", answer: "Up to 50 images." },
      { question: "What formats are supported?", answer: "JPG, PNG, WebP." },
      { question: "Can I download all compressed images at once?", answer: "Yes as a ZIP file." },
      { question: "Is it free?", answer: "Yes." },
      { question: "Is my image uploaded?", answer: "No, everything runs in your browser." },
    ],
    related: ["image-compressor", "image-converter", "image-resizer"],
  },
  {
    slug: "code-explainer",
    name: "Code Explainer",
    tagline: "Paste code, get a plain-English explanation via AI",
    description: "Paste any code and get a plain English explanation instantly using AI. Supports Python, JavaScript, Java, TypeScript and more. Free, no login.",
    category: "ai",
    categoryLabel: "AI Tools",
    icon: Bot,
    accent: "purple",
    isNew: true,
    keywords: ["code explainer", "explain code online free", "AI code explainer", "understand code", "code explanation tool"],
    faqs: [
      { question: "What languages are supported?", answer: "Python, JavaScript, TypeScript, Java, C#, C++, PHP, SQL, Go, Rust, Bash." },
      { question: "Is it free?", answer: "Yes, completely free. No login needed." },
      { question: "Is my code stored?", answer: "No, your code is never stored or logged." },
      { question: "What is the difference between modes?", answer: "Overall gives a summary. Line by Line explains each line." },
      { question: "Can it suggest improvements?", answer: "Yes, toggle Suggest Improvements before explaining." },
    ],
    related: ["image-compressor", "background-remover", "image-converter"],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    tagline: "Format, validate and minify JSON in your browser",
    description: "Format and validate JSON in your browser. Useful for APIs, configs, and debugging — processing stays on your device.",
    category: "developer",
    categoryLabel: "Developer Tools",
    icon: Braces,
    accent: "slate",
    keywords: ["json formatter", "json validator", "json minifier", "developer tool"],
    faqs: [
      { question: "Does formatting my JSON upload it anywhere?", answer: "No, formatting and validation run entirely in your browser." },
      { question: "Can I minify JSON too?", answer: "Yes, use the Copy minified button to get compact output." },
      { question: "What indent sizes are supported?", answer: "2 spaces or 4 spaces." },
      { question: "Will it tell me what's wrong with invalid JSON?", answer: "Yes, a syntax error message is shown below the input." },
      { question: "Is it free?", answer: "Yes, completely free with no login." },
    ],
    related: ["image-base64", "code-explainer", "image-converter"],
  },
];

export function getToolBySlug(slug: string): ToolDef | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getRelatedTools(slugs: string[]): ToolDef[] {
  return slugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolDef => Boolean(t));
}
