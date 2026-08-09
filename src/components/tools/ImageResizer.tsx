"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Lock, RefreshCcw, Unlock } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { baseName, canvasToBlob, formatBytes, loadImageFromFile } from "@/lib/image-utils";

type ResizeMode = "pixels" | "percentage";

function extensionFor(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  return map[mime] ?? "png";
}

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [mode, setMode] = useState<ResizeMode>("pixels");
  const [lockAspect, setLockAspect] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [percentage, setPercentage] = useState(100);

  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeError, setResizeError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setError(null);
    setOutputBlob(null);
    setResizeError(null);
    try {
      const img = await loadImageFromFile(f);
      setFile(f);
      setImage(img);
      setPreviewUrl(URL.createObjectURL(f));
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setPercentage(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't read that image.");
    }
  }, []);

  const aspectRatio = useMemo(
    () => (originalWidth && originalHeight ? originalWidth / originalHeight : 1),
    [originalWidth, originalHeight]
  );

  const handleWidthChange = useCallback(
    (value: number) => {
      const w = Math.max(1, Math.round(value));
      setWidth(w);
      if (lockAspect) setHeight(Math.max(1, Math.round(w / aspectRatio)));
    },
    [lockAspect, aspectRatio]
  );

  const handleHeightChange = useCallback(
    (value: number) => {
      const h = Math.max(1, Math.round(value));
      setHeight(h);
      if (lockAspect) setWidth(Math.max(1, Math.round(h * aspectRatio)));
    },
    [lockAspect, aspectRatio]
  );

  const targetDimensions = useMemo(() => {
    if (mode === "percentage") {
      const pct = Math.max(1, percentage) / 100;
      return {
        w: Math.max(1, Math.round(originalWidth * pct)),
        h: Math.max(1, Math.round(originalHeight * pct)),
      };
    }
    return { w: Math.max(1, Math.round(width)), h: Math.max(1, Math.round(height)) };
  }, [mode, percentage, originalWidth, originalHeight, width, height]);

  useEffect(() => {
    setOutputBlob(null);
  }, [targetDimensions.w, targetDimensions.h, mode]);

  const runResize = useCallback(async () => {
    if (!image || !file) return;
    setIsResizing(true);
    setResizeError(null);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = targetDimensions.w;
      canvas.height = targetDimensions.h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas isn't supported in this browser.");
      ctx.drawImage(image, 0, 0, targetDimensions.w, targetDimensions.h);
      const mime = file.type || "image/png";
      const blob = await canvasToBlob(canvas, mime, mime === "image/jpeg" || mime === "image/webp" ? 0.92 : undefined);
      setOutputBlob(blob);
    } catch (err) {
      setResizeError(err instanceof Error ? err.message : "Resize failed. Try again.");
    } finally {
      setIsResizing(false);
    }
  }, [image, file, targetDimensions]);

  const reset = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setImage(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth(0);
    setHeight(0);
    setPercentage(100);
    setOutputBlob(null);
    setError(null);
    setResizeError(null);
  }, []);

  const outputMime = file?.type || "image/png";
  const outputFilename = file
    ? `${baseName(file.name)}-${targetDimensions.w}x${targetDimensions.h}.${extensionFor(outputMime)}`
    : "resized-image.png";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, or WebP — up to 20MB"
          maxSizeMB={20}
          multiple={false}
          onFilesAccepted={handleFiles}
        />
        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
      </div>

      {file && image ? (
        <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-300">{file.name}</p>
              <p className="text-xs text-slate-500">
                {formatBytes(file.size)} &middot; Original: {originalWidth} &times; {originalHeight} px
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-300"
            >
              <RefreshCcw className="h-3.5 w-3.5" aria-hidden /> Start over
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="inline-flex rounded-lg border border-white/[0.08] bg-slate-950 p-1 text-sm">
                  <button
                    type="button"
                    onClick={() => setMode("pixels")}
                    className={`rounded-md px-3 py-1.5 font-medium transition-colors ${mode === "pixels" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    By Pixels
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("percentage")}
                    className={`rounded-md px-3 py-1.5 font-medium transition-colors ${mode === "percentage" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    By Percentage
                  </button>
                </div>
              </div>

              {mode === "pixels" ? (
                <div className="flex items-end gap-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300">Width (px)</label>
                    <input
                      type="number"
                      min={1}
                      value={width}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                      className="w-28 rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setLockAspect((v) => !v)}
                    aria-pressed={lockAspect}
                    aria-label={lockAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
                    title={lockAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
                    className={`mb-1 flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                      lockAspect
                        ? "border-violet-500/40 bg-violet-500/15 text-violet-400"
                        : "border-white/[0.08] bg-slate-950 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {lockAspect ? <Lock className="h-4 w-4" aria-hidden /> : <Unlock className="h-4 w-4" aria-hidden />}
                  </button>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300">Height (px)</label>
                    <input
                      type="number"
                      min={1}
                      value={height}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      className="w-28 rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Percentage of original</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={percentage}
                      onChange={(e) => setPercentage(Number(e.target.value))}
                      className="w-28 rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                    <span className="text-sm text-slate-400">%</span>
                  </div>
                </div>
              )}

              {mode === "pixels" ? (
                <label className="flex items-center gap-2 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    checked={lockAspect}
                    onChange={(e) => setLockAspect(e.target.checked)}
                    className="h-4 w-4 rounded border-white/[0.08] bg-slate-950 accent-violet-600"
                  />
                  Lock aspect ratio
                </label>
              ) : null}

              <p className="text-sm text-slate-300">
                Result:{" "}
                <span className="font-semibold text-slate-50">
                  {targetDimensions.w} &times; {targetDimensions.h} px
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={runResize}
                  disabled={isResizing}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 ease-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isResizing ? "Resizing..." : "Resize Image"}
                </button>
                {outputBlob ? <DownloadButton filename={outputFilename} blob={outputBlob} /> : null}
              </div>
              {resizeError ? <p className="text-sm text-red-400">{resizeError}</p> : null}
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-300">Preview</p>
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="Source preview" className="h-full w-full object-contain" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
