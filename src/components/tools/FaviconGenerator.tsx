"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import JSZip from "jszip";
import { FileWarning, Loader2, RefreshCcw, Sparkles } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { baseName, canvasToBlob, loadImageFromFile } from "@/lib/image-utils";
import { buildIco } from "@/lib/ico-encoder";

const SIZES = [16, 32, 48, 64, 128, 256] as const;
const ICO_SIZES = [16, 32, 48] as const;

interface FaviconResult {
  size: number;
  blob: Blob;
  url: string;
}

function renderFaviconCanvas(img: HTMLImageElement, size: number, transparent: boolean, bgColor: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas isn't supported in this browser.");

  if (!transparent) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
  }

  const naturalWidth = img.naturalWidth || size;
  const naturalHeight = img.naturalHeight || size;
  const scale = Math.min(size / naturalWidth, size / naturalHeight);
  const drawWidth = naturalWidth * scale;
  const drawHeight = naturalHeight * scale;
  const dx = (size - drawWidth) / 2;
  const dy = (size - drawHeight) / 2;
  ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

  return canvas;
}

export function FaviconGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [transparent, setTransparent] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<FaviconResult[] | null>(null);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<FaviconResult[] | null>(null);

  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  useEffect(() => {
    return () => {
      resultsRef.current?.forEach((r) => URL.revokeObjectURL(r.url));
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearResults = useCallback(() => {
    setResults((prev) => {
      prev?.forEach((r) => URL.revokeObjectURL(r.url));
      return null;
    });
    setZipBlob(null);
  }, []);

  const handleFiles = useCallback(
    (files: File[]) => {
      const next = files[0];
      if (!next) return;
      setError(null);
      clearResults();
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(next);
      });
      setFile(next);
      setImgEl(null);
      loadImageFromFile(next)
        .then((img) => setImgEl(img))
        .catch((err) => setError(err instanceof Error ? err.message : "Couldn't read this image."));
    },
    [clearResults]
  );

  const generate = useCallback(async () => {
    if (!imgEl || !file) return;
    setIsGenerating(true);
    setError(null);
    clearResults();

    try {
      // Render and encode every size to a PNG blob.
      const encoded: FaviconResult[] = [];
      for (const size of SIZES) {
        const canvas = renderFaviconCanvas(imgEl, size, transparent, bgColor);
        const blob = await canvasToBlob(canvas, "image/png");
        encoded.push({ size, blob, url: URL.createObjectURL(blob) });
      }

      setResults(encoded);

      const zip = new JSZip();
      for (const result of encoded) {
        zip.file(`favicon-${result.size}x${result.size}.png`, result.blob);
      }

      const icoSources = await Promise.all(
        ICO_SIZES.map(async (size) => {
          const match = encoded.find((r) => r.size === size)!;
          return { size, data: await match.blob.arrayBuffer() };
        })
      );
      const icoBlob = buildIco(icoSources);
      zip.file("favicon.ico", icoBlob);

      const finalZip = await zip.generateAsync({ type: "blob" });
      setZipBlob(finalZip);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't generate favicons from this image.");
    } finally {
      setIsGenerating(false);
    }
  }, [imgEl, file, transparent, bgColor, clearResults]);

  const reset = useCallback(() => {
    setFile(null);
    setImgEl(null);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    clearResults();
    setError(null);
  }, [clearResults]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/png,image/jpeg,image/svg+xml,.svg"
          acceptLabel="PNG, JPG, SVG — up to 5MB"
          maxSizeMB={5}
          onFilesAccepted={handleFiles}
        />
      </div>

      {error ? (
        <p className="flex items-center gap-1.5 text-sm text-red-400">
          <FileWarning className="h-4 w-4 shrink-0" aria-hidden /> {error}
        </p>
      ) : null}

      {file ? (
        <div className="space-y-6 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <div className="flex flex-wrap items-end gap-5">
            <div>
              <p className="mb-2 text-sm font-medium text-slate-300">Source image</p>
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="Source preview" className="h-full w-full object-contain" />
                ) : null}
              </div>
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
                <input
                  type="checkbox"
                  checked={transparent}
                  onChange={(e) => setTransparent(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 accent-violet-600"
                />
                Transparent background
              </label>
              <p className="text-xs text-slate-500">Keeps alpha instead of filling a solid color.</p>
            </div>

            <div className={transparent ? "opacity-40" : ""}>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Background color</label>
              <input
                type="color"
                value={bgColor}
                disabled={transparent}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded-lg border border-white/[0.08] bg-slate-950 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="button"
              onClick={generate}
              disabled={isGenerating || !imgEl}
              className="ml-auto inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 ease-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden /> Generate Favicons
                </>
              )}
            </button>
          </div>

          {results ? (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {results.map((r) => (
                  <div
                    key={r.size}
                    className="flex flex-col items-center gap-2 rounded-lg border border-white/[0.08] bg-slate-950 p-3"
                  >
                    <div
                      className="flex items-center justify-center overflow-hidden rounded-md bg-[conic-gradient(#1e293b_0deg_90deg,transparent_90deg_180deg,#1e293b_180deg_270deg,transparent_270deg_360deg)] bg-[length:12px_12px]"
                      style={{ width: 56, height: 56 }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.url} alt={`${r.size}x${r.size} favicon preview`} className="h-full w-full object-contain" />
                    </div>
                    <p className="text-xs font-medium text-slate-300">
                      {r.size}&times;{r.size}
                    </p>
                    <DownloadButton
                      filename={`favicon-${r.size}x${r.size}.png`}
                      blob={r.blob}
                      label="PNG"
                      className="w-full px-2 py-1.5 text-xs"
                    />
                  </div>
                ))}
              </div>

              {zipBlob ? (
                <DownloadButton
                  filename={`${baseName(file.name)}-favicons.zip`}
                  blob={zipBlob}
                  label="Download all as ZIP (PNGs + favicon.ico)"
                />
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
