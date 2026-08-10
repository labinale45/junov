"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AlertCircle, Loader2, RefreshCcw, Sparkles } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { BeforeAfterSlider } from "@/components/tools/shared/BeforeAfterSlider";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { baseName, loadImageFromFile } from "@/lib/image-utils";

type UpscaleFactor = "2x" | "4x";

const MAX_SOURCE_DIMENSION = 1000;

interface UpscalerLike {
  upscale: (
    img: HTMLImageElement,
    options?: { progress?: (amount: number) => void }
  ) => Promise<string>;
  dispose: () => Promise<void>;
}

function loadImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Couldn't read the enhanced image result."));
    img.src = dataUrl;
  });
}

function downscaleImageToDataUrl(img: HTMLImageElement, targetWidth: number, targetHeight: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas isn't supported in this browser.");
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  return canvas.toDataURL("image/png");
}

/** Cap very large source images to a longest side of MAX_SOURCE_DIMENSION for reasonable browser runtime. */
function capSourceImage(img: HTMLImageElement): { dataUrl: string; width: number; height: number; wasCapped: boolean } {
  const longest = Math.max(img.naturalWidth, img.naturalHeight);
  if (longest <= MAX_SOURCE_DIMENSION) {
    return { dataUrl: img.src, width: img.naturalWidth, height: img.naturalHeight, wasCapped: false };
  }
  const scale = MAX_SOURCE_DIMENSION / longest;
  const width = Math.round(img.naturalWidth * scale);
  const height = Math.round(img.naturalHeight * scale);
  return { dataUrl: downscaleImageToDataUrl(img, width, height), width, height, wasCapped: true };
}

interface EnhanceResult {
  originalPreviewUrl: string;
  resultDataUrl: string;
  origWidth: number;
  origHeight: number;
  newWidth: number;
  newHeight: number;
}

export function ImageEnhancer() {
  const factorId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [factor, setFactor] = useState<UpscaleFactor>("2x");
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wasCapped, setWasCapped] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EnhanceResult | null>(null);
  const simTickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const upscalerRef = useRef<UpscalerLike | null>(null);

  // Each Upscaler instance holds GPU-resident model weights. Creating a fresh one per
  // "Enhance" click (the previous behavior) leaked that GPU memory on every run, since
  // JS garbage collection doesn't reclaim WebGL textures — repeated use would eventually
  // exhaust GPU memory and break shader compilation for later runs. Reuse one instance
  // for the component's lifetime and dispose it on unmount instead.
  useEffect(() => {
    return () => {
      upscalerRef.current?.dispose();
      upscalerRef.current = null;
    };
  }, []);

  // upscaler's progress callback only fires when a `patchSize` is configured, which would
  // change how the image is tiled/processed. Rather than take that tradeoff just for a
  // progress bar, we simulate a smoothly-advancing indeterminate progress instead, so the UI
  // never looks frozen/hung during the multi-second model run.
  const startSimulatedProgress = useCallback(() => {
    if (simTickRef.current) clearInterval(simTickRef.current);
    simTickRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 92 ? prev : prev + Math.max(1, Math.round((92 - prev) * 0.08))));
    }, 250);
  }, []);

  const stopSimulatedProgress = useCallback(() => {
    if (simTickRef.current) {
      clearInterval(simTickRef.current);
      simTickRef.current = null;
    }
  }, []);

  useEffect(() => stopSimulatedProgress, [stopSimulatedProgress]);

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0] ?? null);
    setResult(null);
    setError(null);
    setProgress(0);
    setWasCapped(false);
  }, []);

  const runEnhance = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);
    setModelLoading(true);
    setProgress(0);
    setError(null);
    setResult(null);
    startSimulatedProgress();
    // The model is already loaded/warmed after a very brief moment — flip the label
    // off "Loading AI model..." shortly after starting so it doesn't sit there for
    // the whole multi-second run (upscaler gives us no real load-vs-inference signal).
    const modelLoadingTimeout = setTimeout(() => setModelLoading(false), 900);

    try {
      const sourceImg = await loadImageFromFile(file);
      const capped = capSourceImage(sourceImg);
      setWasCapped(capped.wasCapped);

      const tf = await import("@tensorflow/tfjs");
      if (!upscalerRef.current) {
        const Upscaler = (await import("upscaler")).default;
        upscalerRef.current = new Upscaler() as unknown as UpscalerLike;
      }
      const upscaler = upscalerRef.current;

      const onProgress = (amount: number) => {
        setModelLoading(false);
        setProgress((prev) => Math.max(prev, Math.round(amount * 100)));
      };

      // Some GPU/driver combinations (notably certain Intel integrated GPUs) fail to
      // compile the WebGL backend's generated shaders for this model, throwing "Failed
      // to compile fragment shader" instead of producing a result. The CPU backend runs
      // the same model without touching WebGL at all, so it's immune to that failure
      // class — fall back to it once, transparently, rather than surfacing a dead end.
      const isShaderFailure = (err: unknown) => err instanceof Error && /shader|webgl/i.test(err.message);
      const upscaleWithFallback = async (img: HTMLImageElement) => {
        try {
          return await upscaler.upscale(img, { progress: onProgress });
        } catch (err) {
          if (isShaderFailure(err) && tf.getBackend() !== "cpu") {
            await tf.setBackend("cpu");
            return await upscaler.upscale(img, { progress: onProgress });
          }
          throw err;
        }
      };

      const passInputImg = await loadImageFromDataUrl(capped.dataUrl);
      const firstPassDataUrl = await upscaleWithFallback(passInputImg);
      const firstPassImg = await loadImageFromDataUrl(firstPassDataUrl);

      const achievedRatio = firstPassImg.naturalWidth / capped.width;

      let finalDataUrl = firstPassDataUrl;
      let finalWidth = firstPassImg.naturalWidth;
      let finalHeight = firstPassImg.naturalHeight;

      if (factor === "2x") {
        // One pass is enough if it reached ~2x or more; otherwise accept the model's native ratio honestly.
        if (achievedRatio > 2.05) {
          const targetWidth = capped.width * 2;
          const targetHeight = capped.height * 2;
          finalDataUrl = downscaleImageToDataUrl(firstPassImg, targetWidth, targetHeight);
          finalWidth = targetWidth;
          finalHeight = targetHeight;
        }
      } else {
        // 4x: run a second pass feeding the first pass's result back in.
        setProgress(0);
        const secondPassDataUrl = await upscaleWithFallback(firstPassImg);
        const secondPassImg = await loadImageFromDataUrl(secondPassDataUrl);
        finalDataUrl = secondPassDataUrl;
        finalWidth = secondPassImg.naturalWidth;
        finalHeight = secondPassImg.naturalHeight;

        const overallRatio = finalWidth / capped.width;
        if (overallRatio > 4.05) {
          const targetWidth = capped.width * 4;
          const targetHeight = capped.height * 4;
          finalDataUrl = downscaleImageToDataUrl(secondPassImg, targetWidth, targetHeight);
          finalWidth = targetWidth;
          finalHeight = targetHeight;
        }
      }

      setResult({
        originalPreviewUrl: capped.dataUrl,
        resultDataUrl: finalDataUrl,
        origWidth: capped.width,
        origHeight: capped.height,
        newWidth: finalWidth,
        newHeight: finalHeight,
      });
      setProgress(100);
    } catch (err) {
      let message = "Enhancement failed. Please try a different image.";
      if (err instanceof Error) {
        if (/webgl|shader/i.test(err.message)) {
          message = "Your browser doesn't support the WebGL features needed for AI enhancement. Try a recent version of Chrome or Firefox.";
        } else if (/memory|out of/i.test(err.message)) {
          message = "The image is too large to process in your browser's memory. Try a smaller image.";
        } else {
          message = err.message;
        }
      }
      setError(message);
    } finally {
      clearTimeout(modelLoadingTimeout);
      stopSimulatedProgress();
      setModelLoading(false);
      setIsProcessing(false);
    }
  }, [file, factor, startSimulatedProgress, stopSimulatedProgress]);

  const reset = useCallback(() => {
    setFile(null);
    setResult(null);
    setError(null);
    setProgress(0);
    setWasCapped(false);
  }, []);

  const downloadFilename = useMemo(() => (file ? `${baseName(file.name)}-enhanced.png` : "enhanced.png"), [file]);

  const getResultBlob = useCallback(async () => {
    if (!result) throw new Error("Nothing to download yet.");
    const response = await fetch(result.resultDataUrl);
    return response.blob();
  }, [result]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          acceptLabel="JPG, PNG, WebP — up to 5MB"
          maxSizeMB={5}
          onFilesAccepted={handleFiles}
        />
      </div>

      {file ? (
        <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300" id={factorId}>
                Upscale factor
              </label>
              <div className="inline-flex rounded-lg border border-white/[0.08] bg-slate-950 p-1 text-sm" role="group" aria-labelledby={factorId}>
                {(["2x", "4x"] as UpscaleFactor[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFactor(f)}
                    disabled={isProcessing}
                    className={`rounded-md px-4 py-1.5 font-medium transition-colors ${
                      factor === f ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={runEnhance}
              disabled={isProcessing}
              className="ml-auto inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 ease-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Enhancing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden /> Enhance
                </>
              )}
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-slate-500">
            <p>Enhancement runs in your browser using TensorFlow.js. No server upload.</p>
            <p>Large images may take longer to process.</p>
            {wasCapped ? (
              <p className="text-amber-400">
                This image was automatically downscaled to a longest side of {MAX_SOURCE_DIMENSION}px before enhancement, to keep processing time reasonable in the browser.
              </p>
            ) : null}
          </div>

          {isProcessing ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{modelLoading ? "Loading AI model..." : "Enhancing image..."}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="flex items-center gap-1.5 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {error}
            </p>
          ) : null}

          {result ? (
            <div className="space-y-4">
              <BeforeAfterSlider
                beforeSrc={result.originalPreviewUrl}
                afterSrc={result.resultDataUrl}
                beforeLabel="Before"
                afterLabel="After"
              />
              <p className="text-sm text-slate-400">
                Result: {result.origWidth}&times;{result.origHeight} &rarr; {result.newWidth}&times;{result.newHeight}
              </p>
              <DownloadButton filename={downloadFilename} onGenerate={getResultBlob} label="Download PNG" />
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
