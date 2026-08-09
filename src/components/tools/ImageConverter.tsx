"use client";

import { useCallback, useId, useState } from "react";
import JSZip from "jszip";
import { CheckCircle2, FileWarning, Loader2, RefreshCcw } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import {
  baseName,
  blobToDataURL,
  canvasToBlob,
  formatBytes,
  imageToCanvas,
  loadImageFromBlob,
  loadImageFromFile,
  mimeFor,
} from "@/lib/image-utils";
import { encodeBMP, encodeGIF, encodeTIFF } from "@/lib/image-encoders";

export type OutputFormat = "jpg" | "png" | "webp" | "avif" | "bmp" | "gif" | "tiff" | "svg";

const OUTPUT_FORMATS: { value: OutputFormat; label: string; lossy: boolean }[] = [
  { value: "jpg", label: "JPG", lossy: true },
  { value: "png", label: "PNG", lossy: false },
  { value: "webp", label: "WebP", lossy: true },
  { value: "avif", label: "AVIF", lossy: true },
  { value: "bmp", label: "BMP", lossy: false },
  { value: "gif", label: "GIF", lossy: false },
  { value: "tiff", label: "TIFF", lossy: false },
  { value: "svg", label: "SVG (wrapped raster)", lossy: false },
];

const EXT_LABELS: Record<string, string> = {
  heic: "HEIC",
  heif: "HEIC",
  jpg: "JPG",
  jpeg: "JPG",
  png: "PNG",
  webp: "WebP",
  avif: "AVIF",
  bmp: "BMP",
  gif: "GIF",
  tif: "TIFF",
  tiff: "TIFF",
  svg: "SVG",
  pdf: "PDF",
};

function extOf(name: string) {
  const idx = name.lastIndexOf(".");
  return idx === -1 ? "" : name.slice(idx + 1).toLowerCase();
}

async function encodeCanvas(canvas: HTMLCanvasElement, format: OutputFormat, quality: number): Promise<Blob> {
  if (format === "bmp") return encodeBMP(canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height));
  if (format === "tiff") return encodeTIFF(canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height));
  if (format === "gif") return encodeGIF(canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height));
  if (format === "svg") {
    const pngBlob = await canvasToBlob(canvas, "image/png");
    const dataUrl = await blobToDataURL(pngBlob);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}"><image width="${canvas.width}" height="${canvas.height}" href="${dataUrl}"/></svg>`;
    return new Blob([svg], { type: "image/svg+xml" });
  }
  const mime = mimeFor(format);
  const fmtDef = OUTPUT_FORMATS.find((f) => f.value === format);
  const quality01 = fmtDef?.lossy ? quality / 100 : undefined;
  const blob = await canvasToBlob(canvas, mime, quality01);
  if (format === "avif" && blob.type !== "image/avif") {
    throw new Error("Your browser doesn't support encoding AVIF. Try a recent version of Chrome, or pick a different output format.");
  }
  return blob;
}

async function rasterizeFile(file: File): Promise<HTMLImageElement> {
  const ext = extOf(file.name);
  if (ext === "heic" || ext === "heif") {
    const heic2any = (await import("heic2any")).default;
    const result = await heic2any({ blob: file, toType: "image/png", quality: 0.92 });
    const pngBlob = Array.isArray(result) ? result[0] : result;
    return loadImageFromBlob(pngBlob, file.name);
  }
  try {
    return await loadImageFromFile(file);
  } catch (err) {
    if (ext === "tif" || ext === "tiff") {
      throw new Error(`Your browser can't decode TIFF images natively. Try Safari, or re-save "${file.name}" as PNG/JPG first.`);
    }
    throw err;
  }
}

async function convertToPages(file: File): Promise<{ name: string; canvas: HTMLCanvasElement }[]> {
  const ext = extOf(file.name);
  if (ext === "pdf") {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    const pages: { name: string; canvas: HTMLCanvasElement }[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx, viewport, canvas }).promise;
      pages.push({ name: `${baseName(file.name)}-page-${i}`, canvas });
    }
    return pages;
  }
  const img = await rasterizeFile(file);
  return [{ name: baseName(file.name), canvas: imageToCanvas(img) }];
}

interface ConverterItem {
  id: string;
  file: File;
  formatLabel: string;
  previewUrl: string | null;
  status: "idle" | "converting" | "done" | "error";
  error?: string;
  outputs?: { name: string; blob: Blob }[];
}

export interface ImageConverterProps {
  /** Pre-selects the output format — used by the /tools/image-converter/[pair] SEO landing pages. */
  initialOutputFormat?: OutputFormat;
}

export function ImageConverter({ initialOutputFormat = "jpg" }: ImageConverterProps = {}) {
  const modeId = useId();
  const [bulkMode, setBulkMode] = useState(false);
  const [items, setItems] = useState<ConverterItem[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(initialOutputFormat);
  const [quality, setQuality] = useState(80);
  const [isConverting, setIsConverting] = useState(false);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  const showQuality = OUTPUT_FORMATS.find((f) => f.value === outputFormat)?.lossy;

  const handleFiles = useCallback((files: File[]) => {
    setZipBlob(null);
    const next: ConverterItem[] = files.map((file) => {
      const ext = extOf(file.name);
      let previewUrl: string | null = null;
      if (ext !== "heic" && ext !== "heif" && ext !== "tif" && ext !== "tiff" && ext !== "pdf") {
        previewUrl = URL.createObjectURL(file);
      }
      return {
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
        file,
        formatLabel: EXT_LABELS[ext] ?? ext.toUpperCase() ?? "Unknown",
        previewUrl,
        status: "idle",
      };
    });
    setItems(next);
  }, []);

  const runConversion = useCallback(async () => {
    setIsConverting(true);
    setZipBlob(null);
    setItems((prev) => prev.map((it) => ({ ...it, status: "converting" as const, error: undefined })));

    const settled = await Promise.all(
      items.map(async (item) => {
        try {
          const pages = await convertToPages(item.file);
          const outputs = await Promise.all(
            pages.map(async (p) => ({
              name: `${p.name}.${outputFormat}`,
              blob: await encodeCanvas(p.canvas, outputFormat, quality),
            }))
          );
          return { ...item, status: "done" as const, outputs };
        } catch (err) {
          return { ...item, status: "error" as const, error: err instanceof Error ? err.message : "Conversion failed." };
        }
      })
    );

    setItems(settled);
    setIsConverting(false);

    const allOutputs = settled.flatMap((it) => it.outputs ?? []);
    if (allOutputs.length > 1) {
      const zip = new JSZip();
      for (const out of allOutputs) zip.file(out.name, out.blob);
      setZipBlob(await zip.generateAsync({ type: "blob" }));
    }
  }, [items, outputFormat, quality]);

  const reset = useCallback(() => {
    setItems([]);
    setZipBlob(null);
  }, []);

  const single = !bulkMode ? items[0] : undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-white/[0.08] bg-slate-900 p-1 text-sm">
          <button
            type="button"
            onClick={() => {
              setBulkMode(false);
              reset();
            }}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${!bulkMode ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            Single file
          </button>
          <button
            type="button"
            onClick={() => {
              setBulkMode(true);
              reset();
            }}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${bulkMode ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            Bulk mode
          </button>
        </div>
        <span className="text-xs text-slate-500" id={modeId}>
          {bulkMode ? "Convert up to 20 images at once, download as ZIP." : "Convert one file at a time."}
        </span>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/*,.heic,.heif,.svg,.pdf,.tif,.tiff,.bmp"
          acceptLabel="HEIC, JPG, PNG, WebP, AVIF, BMP, GIF, TIFF, SVG, PDF — up to 20MB each"
          maxSizeMB={20}
          multiple={bulkMode}
          maxFiles={20}
          onFilesAccepted={handleFiles}
        />
      </div>

      {items.length > 0 ? (
        <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Output format</label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                className="rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                {OUTPUT_FORMATS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            {showQuality ? (
              <div className="min-w-[200px] flex-1">
                <label className="mb-1.5 flex justify-between text-sm font-medium text-slate-300">
                  <span>Quality</span>
                  <span className="text-slate-500">{quality}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-violet-600"
                />
              </div>
            ) : null}
            <button
              type="button"
              onClick={runConversion}
              disabled={isConverting}
              className="ml-auto inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 ease-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isConverting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Converting...
                </>
              ) : (
                "Convert"
              )}
            </button>
          </div>

          {!bulkMode && single ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-slate-300">
                  Input <span className="ml-1 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">{single.formatLabel}</span>
                </p>
                <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950">
                  {single.previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={single.previewUrl} alt="Input preview" className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-xs text-slate-500">Preview unavailable for {single.formatLabel}</span>
                  )}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-slate-300">Output</p>
                <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950">
                  {single.status === "converting" ? (
                    <Loader2 className="h-6 w-6 animate-spin text-violet-400" aria-hidden />
                  ) : single.status === "done" && single.outputs?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={URL.createObjectURL(single.outputs[0].blob)}
                      alt="Output preview"
                      className="h-full w-full object-contain"
                    />
                  ) : single.status === "error" ? (
                    <span className="flex items-center gap-1.5 px-3 text-center text-xs text-red-400">
                      <FileWarning className="h-4 w-4 shrink-0" aria-hidden /> {single.error}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">Click Convert to see the result</span>
                  )}
                </div>
                {single.status === "done" && single.outputs && single.outputs.length === 1 ? (
                  <div className="mt-3">
                    <DownloadButton filename={single.outputs[0].name} blob={single.outputs[0].blob} />
                  </div>
                ) : null}
                {single.status === "done" && single.outputs && single.outputs.length > 1 && zipBlob ? (
                  <div className="mt-3">
                    <DownloadButton filename={`${baseName(single.file.name)}-pages.zip`} blob={zipBlob} label="Download all pages (ZIP)" />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {bulkMode ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wide text-slate-500">
                    <th className="pb-2 pr-4 font-medium">File</th>
                    <th className="pb-2 pr-4 font-medium">Format</th>
                    <th className="pb-2 pr-4 font-medium">Size</th>
                    <th className="pb-2 pr-4 font-medium">Status</th>
                    <th className="pb-2 font-medium">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td className="py-2.5 pr-4 text-slate-200">{it.file.name}</td>
                      <td className="py-2.5 pr-4 text-slate-400">{it.formatLabel}</td>
                      <td className="py-2.5 pr-4 text-slate-400">{formatBytes(it.file.size)}</td>
                      <td className="py-2.5 pr-4">
                        {it.status === "converting" ? (
                          <span className="inline-flex items-center gap-1.5 text-blue-400">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> Converting
                          </span>
                        ) : it.status === "done" ? (
                          <span className="inline-flex items-center gap-1.5 text-green-500">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Done
                          </span>
                        ) : it.status === "error" ? (
                          <span className="inline-flex items-center gap-1.5 text-red-400" title={it.error}>
                            <FileWarning className="h-3.5 w-3.5" aria-hidden /> Failed
                          </span>
                        ) : (
                          <span className="text-slate-500">Waiting</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        {it.status === "done" && it.outputs?.[0] ? (
                          <DownloadButton filename={it.outputs[0].name} blob={it.outputs[0].blob} label="Download" className="px-3 py-1.5 text-xs" />
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {zipBlob ? (
                <div className="mt-4">
                  <DownloadButton filename="converted-images.zip" blob={zipBlob} label="Download all as ZIP" />
                </div>
              ) : null}
            </div>
          ) : null}

          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-300"
          >
            <RefreshCcw className="h-3.5 w-3.5" aria-hidden /> Start over
          </button>
        </div>
      ) : null}
    </div>
  );
}
