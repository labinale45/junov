"use client";

import { useCallback, useRef, useState, type SyntheticEvent } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Crop as CropIcon, Loader2, RefreshCcw } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { baseName, canvasToBlob, extensionFor } from "@/lib/image-utils";

interface AspectOption {
  label: string;
  value: number | undefined;
}

const ASPECT_OPTIONS: AspectOption[] = [
  { label: "Free", value: undefined },
  { label: "1:1", value: 1 },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:2", value: 3 / 2 },
  { label: "9:16", value: 9 / 16 },
];

function centeredCrop(mediaWidth: number, mediaHeight: number, aspect: number | undefined): Crop {
  if (!aspect) {
    return { unit: "%", x: 10, y: 10, width: 80, height: 80 };
  }
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 80 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

function toPixelCrop(crop: Crop, displayWidth: number, displayHeight: number): PixelCrop {
  if (crop.unit === "px") return crop as PixelCrop;
  return {
    unit: "px",
    x: (crop.x / 100) * displayWidth,
    y: (crop.y / 100) * displayHeight,
    width: (crop.width / 100) * displayWidth,
    height: (crop.height / 100) * displayHeight,
  };
}

export function ImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const next = files[0];
    if (!next) return;
    setFile(next);
    setImgSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(next);
    });
    setCrop(undefined);
    setCroppedBlob(null);
    setError(null);
  }, []);

  const onImageLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setCrop(centeredCrop(width, height, aspect));
    },
    [aspect]
  );

  const handleAspectChange = useCallback((value: number | undefined) => {
    setAspect(value);
    const img = imgRef.current;
    if (img) {
      setCrop(centeredCrop(img.width, img.height, value));
    }
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setImgSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setCrop(undefined);
    setAspect(undefined);
    setCroppedBlob(null);
    setError(null);
  }, []);

  const generateCroppedBlob = useCallback(async (): Promise<Blob> => {
    const img = imgRef.current;
    if (!img || !crop || !crop.width || !crop.height) {
      throw new Error("Draw a crop selection on the image first.");
    }

    const pixelCrop = toPixelCrop(crop, img.width, img.height);
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    const sx = pixelCrop.x * scaleX;
    const sy = pixelCrop.y * scaleY;
    const sw = pixelCrop.width * scaleX;
    const sh = pixelCrop.height * scaleY;

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(sw));
    canvas.height = Math.max(1, Math.round(sh));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas isn't supported in this browser.");
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    const mime = file?.type && file.type.startsWith("image/") ? file.type : "image/png";
    const quality = mime === "image/jpeg" || mime === "image/webp" ? 0.92 : undefined;
    return canvasToBlob(canvas, mime, quality);
  }, [crop, file]);

  const handleCrop = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const blob = await generateCroppedBlob();
      setCroppedBlob(blob);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't crop the image.");
    } finally {
      setIsGenerating(false);
    }
  }, [generateCroppedBlob]);

  let liveDims: { w: number; h: number } | null = null;
  if (crop && imgRef.current) {
    const img = imgRef.current;
    const pixelCrop = toPixelCrop(crop, img.width, img.height);
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    liveDims = {
      w: Math.round(pixelCrop.width * scaleX),
      h: Math.round(pixelCrop.height * scaleY),
    };
  }

  const downloadName = file
    ? `${baseName(file.name)}-cropped.${extensionFor(file.type && file.type.startsWith("image/") ? file.type : "image/png")}`
    : "cropped-image.png";

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

      {imgSrc ? (
        <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="mb-1.5 text-sm font-medium text-slate-300">Aspect ratio</p>
              <div className="inline-flex flex-wrap gap-1.5">
                {ASPECT_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleAspectChange(opt.value)}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      aspect === opt.value
                        ? "bg-violet-600 text-white"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-white/[0.08]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {liveDims ? (
              <div className="ml-auto rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2 text-sm text-slate-300">
                <span className="text-slate-500">Crop size:</span>{" "}
                <span className="font-medium text-slate-100">
                  {liveDims.w} × {liveDims.h} px
                </span>
              </div>
            ) : null}
          </div>

          <div className="cropper-shell flex justify-center overflow-auto rounded-lg border border-white/[0.08] bg-slate-950 p-4">
            <ReactCrop
              crop={crop}
              aspect={aspect}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              className="max-w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Image to crop"
                onLoad={onImageLoad}
                className="max-h-[70vh] max-w-full"
              />
            </ReactCrop>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleCrop}
              disabled={isGenerating || !crop}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 ease-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Cropping...
                </>
              ) : (
                <>
                  <CropIcon className="h-4 w-4" aria-hidden /> Crop &amp; Download
                </>
              )}
            </button>

            {croppedBlob ? <DownloadButton filename={downloadName} blob={croppedBlob} label="Download cropped image" /> : null}

            <button
              type="button"
              onClick={reset}
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-300"
            >
              <RefreshCcw className="h-3.5 w-3.5" aria-hidden /> Start over
            </button>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </div>
      ) : null}

      <style jsx global>{`
        .cropper-shell {
          --rc-border-color: #7c3aed;
          --rc-focus-color: #7c3aed;
          --rc-drag-handle-bg-colour: rgba(124, 58, 237, 0.85);
        }
        .cropper-shell .ReactCrop__crop-selection {
          outline: 2px solid #7c3aed;
          box-shadow: 0 0 0 9999px rgba(10, 15, 30, 0.55);
        }
        .cropper-shell .ReactCrop__drag-handle {
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
