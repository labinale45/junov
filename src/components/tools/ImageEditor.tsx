"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileWarning, RefreshCcw } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { baseName, canvasToBlob, extensionFor, loadImageFromFile } from "@/lib/image-utils";

interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  sharpness: number;
  blur: number;
}

const DEFAULTS: Adjustments = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  hue: 0,
  sharpness: 0,
  blur: 0,
};

const SLIDERS: {
  key: keyof Adjustments;
  label: string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}[] = [
  { key: "brightness", label: "Brightness", min: -100, max: 100 },
  { key: "contrast", label: "Contrast", min: -100, max: 100 },
  { key: "saturation", label: "Saturation", min: -100, max: 100 },
  { key: "hue", label: "Hue", min: -180, max: 180, unit: "°" },
  { key: "sharpness", label: "Sharpness", min: 0, max: 100 },
  { key: "blur", label: "Blur", min: 0, max: 10, step: 0.1, unit: "px" },
];

const SUPPORTED_MIMES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Builds the CSS filter string shared by the live preview and the baked export.
 * Brightness/contrast/saturation map to CSS percentages, hue maps to hue-rotate degrees,
 * blur maps directly to px. There is no native CSS filter for "sharpness", so for the
 * live preview we fold a small contrast nudge in as a cheap approximation; the real
 * sharpening happens as a convolution pass baked into the exported image (see applySharpen).
 */
function cssFilterFor(adj: Adjustments, approximateSharpness: boolean): string {
  const sharpnessContrastBoost = approximateSharpness ? Math.round(adj.sharpness * 0.2) : 0;
  return [
    `brightness(${100 + adj.brightness}%)`,
    `contrast(${100 + adj.contrast + sharpnessContrastBoost}%)`,
    `saturate(${100 + adj.saturation}%)`,
    `hue-rotate(${adj.hue}deg)`,
    `blur(${adj.blur}px)`,
  ].join(" ");
}

/** Real unsharp-mask style sharpen via a 3x3 convolution kernel, scaled by amount (0-100). */
function applySharpen(ctx: CanvasRenderingContext2D, width: number, height: number, amount: number) {
  if (amount <= 0 || width === 0 || height === 0) return;
  const strength = amount / 100;
  const src = ctx.getImageData(0, 0, width, height);
  const data = src.data;
  const output = new Uint8ClampedArray(data.length);

  const center = 1 + 4 * strength;
  const edge = -strength;
  const kernel = [0, edge, 0, edge, center, edge, 0, edge, 0];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        let k = 0;
        for (let ky = -1; ky <= 1; ky++) {
          const yy = Math.min(height - 1, Math.max(0, y + ky));
          for (let kx = -1; kx <= 1; kx++) {
            const xx = Math.min(width - 1, Math.max(0, x + kx));
            sum += data[(yy * width + xx) * 4 + c] * kernel[k];
            k++;
          }
        }
        output[idx + c] = sum;
      }
      output[idx + 3] = data[idx + 3];
    }
  }

  src.data.set(output);
  ctx.putImageData(src, 0, 0);
}

function outputMimeFor(file: File): string {
  return SUPPORTED_MIMES.includes(file.type) ? file.type : "image/png";
}

export function ImageEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULTS);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const next = files[0];
    if (!next) return;
    setError(null);
    setAdjustments(DEFAULTS);
    try {
      const img = await loadImageFromFile(next);
      setFile(next);
      setImage(img);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't load that image.");
    }
  }, []);

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
  }, [image]);

  const previewFilter = useMemo(() => cssFilterFor(adjustments, true), [adjustments]);

  const updateAdjustment = useCallback((key: keyof Adjustments, value: number) => {
    setAdjustments((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetAll = useCallback(() => setAdjustments(DEFAULTS), []);

  const startOver = useCallback(() => {
    setFile(null);
    setImage(null);
    setAdjustments(DEFAULTS);
    setError(null);
  }, []);

  const generateBlob = useCallback(async (): Promise<Blob> => {
    if (!image || !file) throw new Error("No image loaded.");
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas isn't supported in this browser.");

    // Bake the CSS filter into the pixel data (setting ctx.filter before drawImage does this).
    ctx.filter = cssFilterFor(adjustments, false);
    ctx.drawImage(image, 0, 0);
    ctx.filter = "none";

    // Run the real sharpen convolution on top of the baked pixels.
    if (adjustments.sharpness > 0) {
      applySharpen(ctx, canvas.width, canvas.height, adjustments.sharpness);
    }

    const mime = outputMimeFor(file);
    const quality = mime === "image/png" ? undefined : 0.92;
    return canvasToBlob(canvas, mime, quality);
  }, [image, file, adjustments]);

  const outputFilename = useMemo(() => {
    if (!file) return "edited.png";
    return `${baseName(file.name)}-edited.${extensionFor(outputMimeFor(file))}`;
  }, [file]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, WebP — up to 20MB"
          maxSizeMB={20}
          onFilesAccepted={handleFiles}
        />
        {error ? (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-red-400">
            <FileWarning className="h-4 w-4 shrink-0" aria-hidden /> {error}
          </p>
        ) : null}
      </div>

      {image ? (
        <div className="grid gap-6 rounded-xl border border-white/[0.08] bg-slate-900 p-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Live preview</p>
            <div className="flex items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950 p-2">
              <canvas
                ref={canvasRef}
                style={{ filter: previewFilter, maxWidth: "100%", height: "auto" }}
                className="rounded-md"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-200">Adjustments</p>
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-200"
              >
                <RefreshCcw className="h-3.5 w-3.5" aria-hidden /> Reset All
              </button>
            </div>

            <div className="space-y-4">
              {SLIDERS.map((s) => (
                <div key={s.key}>
                  <label className="mb-1.5 flex justify-between text-sm font-medium text-slate-300">
                    <span>{s.label}</span>
                    <span className="text-slate-500">
                      {adjustments[s.key]}
                      {s.unit ?? ""}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step ?? 1}
                    value={adjustments[s.key]}
                    onChange={(e) => updateAdjustment(s.key, Number(e.target.value))}
                    className="w-full accent-violet-600"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <DownloadButton filename={outputFilename} onGenerate={generateBlob} label="Download Edited Image" className="w-full" />
              <button
                type="button"
                onClick={startOver}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-300"
              >
                <RefreshCcw className="h-3.5 w-3.5" aria-hidden /> Start over
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
