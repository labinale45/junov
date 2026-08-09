"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, RefreshCcw } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { baseName, canvasToBlob, extensionFor, loadImageFromFile } from "@/lib/image-utils";

type EffectId =
  | "none"
  | "grayscale"
  | "sepia"
  | "invert"
  | "bw"
  | "blur"
  | "pixelate"
  | "vignette"
  | "vintage"
  | "warm"
  | "cool";

interface EffectDef {
  id: EffectId;
  label: string;
}

const EFFECTS: EffectDef[] = [
  { id: "none", label: "None / Original" },
  { id: "grayscale", label: "Grayscale" },
  { id: "sepia", label: "Sepia" },
  { id: "invert", label: "Invert" },
  { id: "bw", label: "Black & White" },
  { id: "blur", label: "Blur" },
  { id: "pixelate", label: "Pixelate" },
  { id: "vignette", label: "Vignette" },
  { id: "vintage", label: "Vintage" },
  { id: "warm", label: "Warm" },
  { id: "cool", label: "Cool" },
];

function clamp(v: number) {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

function applyPixelEffect(data: Uint8ClampedArray, fn: (r: number, g: number, b: number) => [number, number, number]) {
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = fn(data[i], data[i + 1], data[i + 2]);
    data[i] = clamp(r);
    data[i + 1] = clamp(g);
    data[i + 2] = clamp(b);
  }
}

function drawSourceToCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas isn't supported in this browser.");
  ctx.drawImage(img, 0, 0);
  return canvas;
}

function applyVignette(ctx: CanvasRenderingContext2D, width: number, height: number, strength = 0.75) {
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.2,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.72
  );
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, `rgba(0,0,0,${strength})`);
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function renderEffect(img: HTMLImageElement, effect: EffectId): HTMLCanvasElement {
  const width = img.naturalWidth;
  const height = img.naturalHeight;

  if (effect === "blur") {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas isn't supported in this browser.");
    ctx.filter = "blur(4px)";
    ctx.drawImage(img, 0, 0);
    ctx.filter = "none";
    return canvas;
  }

  if (effect === "pixelate") {
    const scale = 0.08;
    const smallWidth = Math.max(1, Math.round(width * scale));
    const smallHeight = Math.max(1, Math.round(height * scale));
    const small = document.createElement("canvas");
    small.width = smallWidth;
    small.height = smallHeight;
    const smallCtx = small.getContext("2d");
    if (!smallCtx) throw new Error("Canvas isn't supported in this browser.");
    smallCtx.drawImage(img, 0, 0, smallWidth, smallHeight);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas isn't supported in this browser.");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(small, 0, 0, smallWidth, smallHeight, 0, 0, width, height);
    return canvas;
  }

  const canvas = drawSourceToCanvas(img);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas isn't supported in this browser.");

  if (effect === "none") return canvas;

  if (effect === "vignette") {
    applyVignette(ctx, width, height, 0.75);
    return canvas;
  }

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  switch (effect) {
    case "grayscale":
      applyPixelEffect(data, (r, g, b) => {
        const avg = (r + g + b) / 3;
        return [avg, avg, avg];
      });
      break;
    case "sepia":
      applyPixelEffect(data, (r, g, b) => [
        0.393 * r + 0.769 * g + 0.189 * b,
        0.349 * r + 0.686 * g + 0.168 * b,
        0.272 * r + 0.534 * g + 0.131 * b,
      ]);
      break;
    case "invert":
      applyPixelEffect(data, (r, g, b) => [255 - r, 255 - g, 255 - b]);
      break;
    case "bw":
      applyPixelEffect(data, (r, g, b) => {
        const avg = (r + g + b) / 3;
        const v = avg > 128 ? 255 : 0;
        return [v, v, v];
      });
      break;
    case "warm":
      applyPixelEffect(data, (r, g, b) => [r + 25, g + 10, b - 20]);
      break;
    case "cool":
      applyPixelEffect(data, (r, g, b) => [r - 20, g, b + 25]);
      break;
    case "vintage":
      applyPixelEffect(data, (r, g, b) => {
        // subtle sepia tint
        const sr = 0.393 * r + 0.769 * g + 0.189 * b;
        const sg = 0.349 * r + 0.686 * g + 0.168 * b;
        const sb = 0.272 * r + 0.534 * g + 0.131 * b;
        const tr = r + (sr - r) * 0.4;
        const tg = g + (sg - g) * 0.4;
        const tb = b + (sb - b) * 0.4;
        // reduced contrast (pull towards mid-gray)
        const mix = (v: number) => v + (128 - v) * 0.15;
        return [mix(tr), mix(tg), mix(tb)];
      });
      break;
    default:
      break;
  }

  ctx.putImageData(imageData, 0, 0);

  if (effect === "vintage") {
    applyVignette(ctx, width, height, 0.4);
  }

  return canvas;
}

interface Rendered {
  canvas: HTMLCanvasElement;
  url: string;
}

export function ImageEffects() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [activeEffect, setActiveEffect] = useState<EffectId>("none");
  const [rendered, setRendered] = useState<Rendered | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setError(null);
    setFile(f);
    setActiveEffect("none");
    try {
      const img = await loadImageFromFile(f);
      setImage(img);
      setSourceUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(f);
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load this image.");
    }
  }, []);

  useEffect(() => {
    if (!image) {
      setRendered(null);
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const canvas = renderEffect(image, activeEffect);
      const url = canvas.toDataURL();
      setRendered({ canvas, url });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't apply this effect.");
    } finally {
      setIsProcessing(false);
    }
  }, [image, activeEffect]);

  const mime = file?.type && file.type.startsWith("image/") ? file.type : "image/png";
  const outExt = extensionFor(mime);

  const outputFilename = useMemo(() => {
    if (!file) return `effect.${outExt}`;
    const suffix = activeEffect === "none" ? "original" : activeEffect;
    return `${baseName(file.name)}-${suffix}.${outExt}`;
  }, [file, activeEffect, outExt]);

  const reset = useCallback(() => {
    setFile(null);
    setImage(null);
    setActiveEffect("none");
    setSourceUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setRendered(null);
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, WebP — up to 20MB"
          maxSizeMB={20}
          onFilesAccepted={handleFiles}
        />
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      {sourceUrl && image ? (
        <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Effects</p>
            <div className="flex flex-wrap gap-2">
              {EFFECTS.map((fx) => {
                const isActive = fx.id === activeEffect;
                return (
                  <button
                    key={fx.id}
                    type="button"
                    onClick={() => setActiveEffect(fx.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ease-out ${
                      isActive
                        ? "border-violet-500 bg-violet-600/20 text-violet-200 shadow-[0_0_0_3px_rgba(124,58,237,0.2)] ring-1 ring-violet-500/50"
                        : "border-white/[0.08] bg-slate-950 text-slate-400 hover:border-violet-500/40 hover:text-slate-200"
                    }`}
                  >
                    {fx.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-slate-300">Original</p>
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sourceUrl} alt="Original" className="h-full w-full object-contain" />
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-slate-300">Preview</p>
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950">
                {isProcessing ? (
                  <Loader2 className="h-6 w-6 animate-spin text-violet-400" aria-hidden />
                ) : rendered ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={rendered.url} alt="Effect preview" className="h-full w-full object-contain" />
                ) : (
                  <span className="text-xs text-slate-500">Pick an effect to preview</span>
                )}
              </div>
              {rendered ? (
                <div className="mt-3">
                  <DownloadButton
                    filename={outputFilename}
                    onGenerate={() => canvasToBlob(rendered.canvas, mime)}
                    label="Download"
                  />
                </div>
              ) : null}
            </div>
          </div>

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
