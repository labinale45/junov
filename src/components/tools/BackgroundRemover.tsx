"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { AlertCircle, RefreshCcw, Sparkles } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { BeforeAfterSlider } from "@/components/tools/shared/BeforeAfterSlider";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { baseName, canvasToBlob, loadImageFromBlob } from "@/lib/image-utils";

/**
 * The default "medium" (fp16-quantized) model leaves a visible halo of
 * partially-transparent background-color pixels around the cutout edge.
 * This does two things to clean that up:
 *  1. Uses the full-precision "large" model (better mask quality to begin with).
 *  2. Runs a small morphological erosion over the alpha channel — each pixel's
 *     alpha becomes the minimum alpha in its 3x3 neighborhood, which shrinks the
 *     opaque region by ~1px and wipes out the fringe of semi-transparent
 *     background-tinted pixels that erosion-free mattes always leave behind.
 *     Alpha below a small threshold is then snapped fully transparent.
 */
async function refineCutoutEdges(blob: Blob): Promise<Blob> {
  try {
    const img = await loadImageFromBlob(blob, "cutout");
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return blob;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    const srcAlpha = new Uint8ClampedArray(width * height);
    for (let i = 0; i < width * height; i++) srcAlpha[i] = data[i * 4 + 3];

    const RADIUS = 1;
    const HALO_THRESHOLD = 40;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        let minAlpha = srcAlpha[idx];
        for (let dy = -RADIUS; dy <= RADIUS; dy++) {
          const ny = y + dy;
          if (ny < 0 || ny >= height) continue;
          const rowOffset = ny * width;
          for (let dx = -RADIUS; dx <= RADIUS; dx++) {
            const nx = x + dx;
            if (nx < 0 || nx >= width) continue;
            const a = srcAlpha[rowOffset + nx];
            if (a < minAlpha) minAlpha = a;
          }
        }
        data[idx * 4 + 3] = minAlpha < HALO_THRESHOLD ? 0 : minAlpha;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return await canvasToBlob(canvas, "image/png");
  } catch {
    // If refinement fails for any reason, fall back to the unrefined cutout
    // rather than failing the whole background-removal flow.
    return blob;
  }
}

type BgOption = "transparent" | "white" | "black" | "custom";

const BG_OPTIONS: { value: BgOption; label: string }[] = [
  { value: "transparent", label: "Transparent" },
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "custom", label: "Custom" },
];

export function BackgroundRemover() {
  const colorInputId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [cutoutBlob, setCutoutBlob] = useState<Blob | null>(null);
  const [bgOption, setBgOption] = useState<BgOption>("transparent");
  const [customColor, setCustomColor] = useState("#22c55e");

  const [displayUrl, setDisplayUrl] = useState<string | null>(null);
  const [displayBlob, setDisplayBlob] = useState<Blob | null>(null);
  const [compositing, setCompositing] = useState(false);

  const handleFiles = useCallback((files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setOriginalUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(f);
    });
    setCutoutBlob(null);
    setDisplayUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setDisplayBlob(null);
    setStatus("idle");
    setError(null);
    setProgress(0);
    setBgOption("transparent");
  }, []);

  const removeBg = useCallback(async () => {
    if (!file) return;
    setStatus("processing");
    setError(null);
    setProgress(0);
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const rawBlob = await removeBackground(file, {
        progress: (_key: string, current: number, total: number) => {
          // Leave headroom for the edge-refinement pass that follows.
          setProgress(total > 0 ? Math.round((current / total) * 90) : 0);
        },
        output: { format: "image/png", quality: 1 },
      });
      const refinedBlob = await refineCutoutEdges(rawBlob);
      setProgress(100);
      setCutoutBlob(refinedBlob);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? `Couldn't remove the background: ${err.message}`
          : "Couldn't remove the background. Your browser may not support this feature, or the AI model failed to load. Please try again."
      );
    }
  }, [file]);

  // Recomposite the preview/download image whenever the cutout or chosen background changes.
  useEffect(() => {
    if (!cutoutBlob) return;
    let cancelled = false;

    async function run() {
      setCompositing(true);
      try {
        if (bgOption === "transparent") {
          const url = URL.createObjectURL(cutoutBlob as Blob);
          if (cancelled) {
            URL.revokeObjectURL(url);
            return;
          }
          setDisplayUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
          });
          setDisplayBlob(cutoutBlob);
        } else {
          const img = await loadImageFromBlob(cutoutBlob as Blob);
          if (cancelled) return;
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas isn't supported in this browser.");
          ctx.fillStyle = bgOption === "white" ? "#ffffff" : bgOption === "black" ? "#000000" : customColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          const blob = await canvasToBlob(canvas, "image/png");
          if (cancelled) return;
          const url = URL.createObjectURL(blob);
          setDisplayUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
          });
          setDisplayBlob(blob);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Couldn't apply the background color.");
        }
      } finally {
        if (!cancelled) setCompositing(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [cutoutBlob, bgOption, customColor]);

  const reset = useCallback(() => {
    setFile(null);
    setOriginalUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setCutoutBlob(null);
    setDisplayUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setDisplayBlob(null);
    setStatus("idle");
    setError(null);
    setProgress(0);
    setBgOption("transparent");
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, WebP — up to 10MB"
          maxSizeMB={10}
          onFilesAccepted={handleFiles}
        />
      </div>

      {file && originalUrl ? (
        <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          {status === "idle" || status === "error" ? (
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={removeBg}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 ease-out hover:brightness-110"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                Remove Background
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-300"
              >
                <RefreshCcw className="h-3.5 w-3.5" aria-hidden /> Start over
              </button>
              {status === "error" && error ? (
                <span className="flex w-full items-center gap-1.5 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {error}
                </span>
              ) : null}
            </div>
          ) : null}

          {status === "processing" ? (
            <div className="space-y-2">
              <p className="text-sm text-slate-300">
                Loading AI model (first run only)... this can take 10-15 seconds.
              </p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{progress}%</p>
            </div>
          ) : null}

          {status === "done" && displayUrl ? (
            <div className="space-y-5">
              <BeforeAfterSlider beforeSrc={originalUrl} afterSrc={displayUrl} beforeLabel="Before" afterLabel="After" />

              <div>
                <p className="mb-2 text-sm font-medium text-slate-300">Background</p>
                <div className="flex flex-wrap items-center gap-2">
                  {BG_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBgOption(opt.value)}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                        bgOption === opt.value
                          ? "border-violet-500 bg-violet-600/20 text-violet-300"
                          : "border-white/[0.08] bg-slate-950 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                  {bgOption === "custom" ? (
                    <label htmlFor={colorInputId} className="flex items-center gap-2 text-xs text-slate-400">
                      <input
                        id={colorInputId}
                        type="color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="h-9 w-9 cursor-pointer rounded-md border border-white/[0.08] bg-slate-950"
                      />
                    </label>
                  ) : null}
                  {compositing ? <span className="text-xs text-slate-500">Applying...</span> : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <DownloadButton
                  filename={`${baseName(file.name)}-no-bg.png`}
                  blob={displayBlob}
                  disabled={compositing || !displayBlob}
                  label="Download PNG"
                />
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-300"
                >
                  <RefreshCcw className="h-3.5 w-3.5" aria-hidden /> Start over
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
