"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ColorThief from "color-thief-ts";
import { Pipette, RefreshCcw } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { CopyButton } from "@/components/tools/shared/CopyButton";
import { toast } from "@/components/ui/sonner";
import { loadImageFromFile } from "@/lib/image-utils";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case rn:
      h = (gn - bn) / d + (gn < bn ? 6 : 0);
      break;
    case gn:
      h = (bn - rn) / d + 2;
      break;
    default:
      h = (rn - gn) / d + 4;
  }
  h /= 6;

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function formatRgb({ r, g, b }: RGB): string {
  return `rgb(${r}, ${g}, ${b})`;
}

function formatHsl({ r, g, b }: RGB): string {
  const { h, s, l } = rgbToHsl(r, g, b);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function ColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgElRef = useRef<HTMLImageElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<RGB | null>(null);
  const [hoverColor, setHoverColor] = useState<RGB | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [paletteError, setPaletteError] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setPickedColor(null);
    setHoverColor(null);
    setPalette([]);
    setPaletteError(null);

    try {
      const img = await loadImageFromFile(file);
      imgElRef.current = img;
      // Setting imageUrl mounts the <canvas> (it's gated behind this state);
      // the actual draw + palette extraction happens in the effect below,
      // once that canvas is guaranteed to exist in the DOM.
      setImageUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return img.src;
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't load that image.");
    }
  }, []);

  useEffect(() => {
    if (!imageUrl) return;
    const img = imgElRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      toast.error("Canvas isn't supported in this browser.");
      return;
    }
    ctx.drawImage(img, 0, 0);

    setIsExtracting(true);
    try {
      const colorThief = new ColorThief();
      const rgbPalette = colorThief.getPalette(img, 8, { colorType: "array" });
      setPalette(rgbPalette.map(([r, g, b]) => rgbToHex(r, g, b)));
    } catch {
      setPaletteError("Couldn't extract a color palette from this image. Try a different image.");
    } finally {
      setIsExtracting(false);
    }
  }, [imageUrl]);

  const colorAtPoint = useCallback((clientX: number, clientY: number): RGB | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.min(canvas.width - 1, Math.max(0, Math.floor((clientX - rect.left) * scaleX)));
    const y = Math.min(canvas.height - 1, Math.max(0, Math.floor((clientY - rect.top) * scaleY)));

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    try {
      const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
      return { r, g, b };
    } catch {
      return null;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const color = colorAtPoint(e.clientX, e.clientY);
      if (color) setHoverColor(color);
    },
    [colorAtPoint]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const color = colorAtPoint(e.clientX, e.clientY);
      if (color) setPickedColor(color);
    },
    [colorAtPoint]
  );

  const reset = useCallback(() => {
    setImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    imgElRef.current = null;
    setPickedColor(null);
    setHoverColor(null);
    setPalette([]);
    setPaletteError(null);
  }, []);

  const activeColor = hoverColor ?? pickedColor;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          acceptLabel="JPG, PNG, WebP — up to 10MB"
          maxSizeMB={10}
          onFilesAccepted={handleFiles}
        />
      </div>

      {imageUrl ? (
        <div className="space-y-6 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-300">
              <Pipette className="h-4 w-4 text-violet-400" aria-hidden />
              Click anywhere on the image to pick a color
            </p>
            <div className="flex items-center justify-center overflow-auto rounded-lg border border-white/[0.08] bg-slate-950 p-2">
              <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoverColor(null)}
                onClick={handleClick}
                className="max-h-[500px] w-auto max-w-full cursor-crosshair rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div
              className="h-16 w-16 shrink-0 rounded-lg border border-white/[0.08] shadow-inner"
              style={{ backgroundColor: activeColor ? formatRgb(activeColor) : "#0f172a" }}
              aria-hidden
            />
            <div className="grid flex-1 gap-2 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">Hex</p>
                  <p className="truncate text-sm font-medium text-slate-100">
                    {activeColor ? rgbToHex(activeColor.r, activeColor.g, activeColor.b) : "—"}
                  </p>
                </div>
                <CopyButton
                  text={activeColor ? rgbToHex(activeColor.r, activeColor.g, activeColor.b) : ""}
                  label=""
                  className="px-2 py-1.5"
                  disabled={!activeColor}
                />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">RGB</p>
                  <p className="truncate text-sm font-medium text-slate-100">{activeColor ? formatRgb(activeColor) : "—"}</p>
                </div>
                <CopyButton text={activeColor ? formatRgb(activeColor) : ""} label="" className="px-2 py-1.5" disabled={!activeColor} />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">HSL</p>
                  <p className="truncate text-sm font-medium text-slate-100">{activeColor ? formatHsl(activeColor) : "—"}</p>
                </div>
                <CopyButton text={activeColor ? formatHsl(activeColor) : ""} label="" className="px-2 py-1.5" disabled={!activeColor} />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Dominant color palette</p>
            {isExtracting ? (
              <p className="text-sm text-slate-500">Extracting colors...</p>
            ) : paletteError ? (
              <p className="text-sm text-red-400">{paletteError}</p>
            ) : palette.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {palette.map((hex, i) => (
                  <button
                    key={`${hex}-${i}`}
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(hex);
                        toast.success(`Copied ${hex}`);
                      } catch {
                        toast.error("Couldn't copy to clipboard.");
                      }
                    }}
                    className="group flex flex-col items-center gap-1.5 rounded-lg border border-white/[0.08] bg-slate-950 p-2 transition-all duration-200 ease-out hover:border-violet-500/40"
                    title={`Copy ${hex}`}
                  >
                    <span
                      className="h-10 w-10 rounded-md border border-white/[0.08] shadow-inner transition-transform duration-200 ease-out group-hover:scale-105"
                      style={{ backgroundColor: hex }}
                      aria-hidden
                    />
                    <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-200">{hex}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No palette available.</p>
            )}
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
