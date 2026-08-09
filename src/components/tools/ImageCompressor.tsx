"use client";

import { useCallback, useId, useState } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { CheckCircle2, FileWarning, Loader2, RefreshCcw } from "lucide-react";
import { BeforeAfterSlider } from "@/components/tools/shared/BeforeAfterSlider";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { DropZone } from "@/components/tools/shared/DropZone";
import { formatBytes } from "@/lib/image-utils";

interface CompressorItem {
  id: string;
  file: File;
  originalUrl: string;
  status: "idle" | "compressing" | "done" | "error";
  error?: string;
  compressedBlob?: Blob;
  compressedUrl?: string;
}

type SizeUnit = "KB" | "MB";
type CompressMode = "quality" | "size";

function savedPercent(originalBytes: number, compressedBytes: number): number {
  if (originalBytes <= 0) return 0;
  return Math.round(((originalBytes - compressedBytes) / originalBytes) * 100);
}

function targetToMB(value: number, unit: SizeUnit): number {
  return unit === "KB" ? value / 1024 : value;
}

type CompressOptions = { mode: "quality"; quality: number } | { mode: "size"; targetMB: number };

async function compressFile(file: File, options: CompressOptions): Promise<Blob> {
  if (options.mode === "size") {
    // Target size wins over quality: let the library push quality and dimensions
    // down as far as it takes (raised maxIteration, resolution changes allowed) to
    // land at or under the target, rather than stopping early to protect quality.
    return imageCompression(file, {
      maxSizeMB: Math.max(options.targetMB, 0.01),
      maxIteration: 20,
      alwaysKeepResolution: false,
      useWebWorker: true,
    });
  }
  return imageCompression(file, {
    maxSizeMB: 10,
    initialQuality: options.quality / 100,
    useWebWorker: true,
  });
}

export interface ImageCompressorProps {
  /** Pre-fills and locks the tool into "Target Size" mode — used by the /tools/image-compressor/[size] SEO landing pages. */
  initialTargetKB?: number;
}

export function ImageCompressor({ initialTargetKB }: ImageCompressorProps = {}) {
  const modeId = useId();
  const [bulkMode, setBulkMode] = useState(false);
  const [items, setItems] = useState<CompressorItem[]>([]);
  const [quality, setQuality] = useState(80);
  const [compressMode, setCompressMode] = useState<CompressMode>(initialTargetKB ? "size" : "quality");
  const [targetValue, setTargetValue] = useState(initialTargetKB ?? 200);
  const [targetUnit, setTargetUnit] = useState<SizeUnit>(
    initialTargetKB && initialTargetKB >= 1024 ? "MB" : "KB"
  );
  const [isCompressing, setIsCompressing] = useState(false);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  const revokeItems = useCallback((list: CompressorItem[]) => {
    list.forEach((it) => {
      URL.revokeObjectURL(it.originalUrl);
      if (it.compressedUrl) URL.revokeObjectURL(it.compressedUrl);
    });
  }, []);

  const handleFiles = useCallback(
    (files: File[]) => {
      setZipBlob(null);
      setItems((prev) => {
        revokeItems(prev);
        return files.map((file) => ({
          id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
          file,
          originalUrl: URL.createObjectURL(file),
          status: "idle" as const,
        }));
      });
    },
    [revokeItems]
  );

  const runCompression = useCallback(async () => {
    setIsCompressing(true);
    setZipBlob(null);
    setItems((prev) => prev.map((it) => ({ ...it, status: "compressing" as const, error: undefined })));

    const options: CompressOptions =
      compressMode === "size" ? { mode: "size", targetMB: targetToMB(targetValue, targetUnit) } : { mode: "quality", quality };

    const settled = await Promise.all(
      items.map(async (item) => {
        try {
          const blob = await compressFile(item.file, options);
          return { ...item, status: "done" as const, compressedBlob: blob, compressedUrl: URL.createObjectURL(blob) };
        } catch (err) {
          return {
            ...item,
            status: "error" as const,
            error: err instanceof Error ? err.message : "Compression failed. Try a different image.",
          };
        }
      })
    );

    setItems(settled);
    setIsCompressing(false);

    if (bulkMode) {
      const done = settled.filter((it) => it.status === "done" && it.compressedBlob);
      if (done.length > 0) {
        const zip = new JSZip();
        for (const it of done) zip.file(it.file.name, it.compressedBlob!);
        setZipBlob(await zip.generateAsync({ type: "blob" }));
      }
    }
  }, [items, quality, compressMode, targetValue, targetUnit, bulkMode]);

  const targetBytes = Math.round(targetToMB(targetValue, targetUnit) * 1024 * 1024);

  const reset = useCallback(() => {
    setItems((prev) => {
      revokeItems(prev);
      return [];
    });
    setZipBlob(null);
  }, [revokeItems]);

  const single = !bulkMode ? items[0] : undefined;
  const singleSaved =
    single?.status === "done" && single.compressedBlob ? savedPercent(single.file.size, single.compressedBlob.size) : null;

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
          {bulkMode ? "Compress up to 50 images at once, download as ZIP." : "Compress one image at a time."}
        </span>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/jpeg,image/png,image/webp,image/avif"
          acceptLabel="JPG, PNG, WebP, AVIF — up to 20MB each"
          maxSizeMB={20}
          multiple={bulkMode}
          maxFiles={50}
          onFilesAccepted={handleFiles}
        />
      </div>

      {items.length > 0 ? (
        <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <div className="space-y-4">
            <div className="inline-flex rounded-lg border border-white/[0.08] bg-slate-950 p-1 text-sm">
              <button
                type="button"
                onClick={() => setCompressMode("quality")}
                className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                  compressMode === "quality" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                By Quality
              </button>
              <button
                type="button"
                onClick={() => setCompressMode("size")}
                className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                  compressMode === "size" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                By Target Size
              </button>
            </div>

            <div className="flex flex-wrap items-end gap-4">
              {compressMode === "quality" ? (
                <div className="min-w-[220px] flex-1">
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
              ) : (
                <div className="min-w-[220px] flex-1">
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Target size</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1}
                      step={targetUnit === "KB" ? 10 : 0.1}
                      value={targetValue}
                      onChange={(e) => setTargetValue(Math.max(1, Number(e.target.value) || 1))}
                      className="w-28 rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                    <select
                      value={targetUnit}
                      onChange={(e) => setTargetUnit(e.target.value as SizeUnit)}
                      className="rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    >
                      <option value="KB">KB</option>
                      <option value="MB">MB</option>
                    </select>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">
                    We&apos;ll push quality — and dimensions, if needed — as far as it takes to hit this size.
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={runCompression}
                disabled={isCompressing}
                className="ml-auto inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 ease-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCompressing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Compressing...
                  </>
                ) : (
                  "Compress"
                )}
              </button>
            </div>
          </div>

          {!bulkMode && single ? (
            <div className="space-y-4">
              {single.status === "done" && single.compressedUrl && single.compressedBlob ? (
                <>
                  <BeforeAfterSlider
                    beforeSrc={single.originalUrl}
                    afterSrc={single.compressedUrl}
                    beforeLabel="Original"
                    afterLabel="Compressed"
                  />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-white/[0.08] bg-slate-950 p-3">
                      <p className="text-xs text-slate-500">Original size</p>
                      <p className="text-lg font-semibold text-slate-100">{formatBytes(single.file.size)}</p>
                    </div>
                    <div className="rounded-lg border border-white/[0.08] bg-slate-950 p-3">
                      <p className="text-xs text-slate-500">Compressed size</p>
                      <p className="text-lg font-semibold text-slate-100">{formatBytes(single.compressedBlob.size)}</p>
                    </div>
                    <div
                      className={`rounded-lg border p-3 ${
                        (singleSaved ?? 0) >= 0 ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"
                      }`}
                    >
                      <p className="text-xs text-slate-500">Size saved</p>
                      <p className={`text-lg font-semibold ${(singleSaved ?? 0) >= 0 ? "text-green-500" : "text-red-400"}`}>
                        {(singleSaved ?? 0) >= 0 ? `${singleSaved}% saved` : `${Math.abs(singleSaved ?? 0)}% larger`}
                      </p>
                    </div>
                  </div>
                  {compressMode === "size" ? (
                    single.compressedBlob.size <= targetBytes * 1.05 ? (
                      <p className="text-sm text-green-500">
                        Reached your target of {targetValue}
                        {targetUnit} (or close to it).
                      </p>
                    ) : (
                      <p className="text-sm text-amber-400">
                        This is the smallest we could get — {formatBytes(single.compressedBlob.size)} — while still keeping
                        the image usable. A {targetValue}
                        {targetUnit} target is smaller than this image can realistically go.
                      </p>
                    )
                  ) : null}
                  <DownloadButton filename={single.file.name} blob={single.compressedBlob} label="Download compressed image" />
                </>
              ) : single.status === "compressing" ? (
                <div className="flex aspect-video items-center justify-center rounded-xl border border-white/[0.08] bg-slate-950">
                  <Loader2 className="h-6 w-6 animate-spin text-violet-400" aria-hidden />
                </div>
              ) : single.status === "error" ? (
                <div className="flex aspect-video items-center justify-center rounded-xl border border-white/[0.08] bg-slate-950 px-4 text-center">
                  <span className="flex items-center gap-1.5 text-sm text-red-400">
                    <FileWarning className="h-4 w-4 shrink-0" aria-hidden /> {single.error}
                  </span>
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={single.originalUrl} alt="Original preview" className="h-full w-full object-contain" />
                </div>
              )}
            </div>
          ) : null}

          {bulkMode ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wide text-slate-500">
                    <th className="pb-2 pr-4 font-medium">Filename</th>
                    <th className="pb-2 pr-4 font-medium">Original Size</th>
                    <th className="pb-2 pr-4 font-medium">Compressed Size</th>
                    <th className="pb-2 pr-4 font-medium">Saved</th>
                    <th className="pb-2 pr-4 font-medium">Status</th>
                    <th className="pb-2 font-medium">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {items.map((it) => {
                    const saved = it.status === "done" && it.compressedBlob ? savedPercent(it.file.size, it.compressedBlob.size) : null;
                    return (
                      <tr key={it.id}>
                        <td className="max-w-[220px] truncate py-2.5 pr-4 text-slate-200">{it.file.name}</td>
                        <td className="py-2.5 pr-4 text-slate-400">{formatBytes(it.file.size)}</td>
                        <td className="py-2.5 pr-4 text-slate-400">
                          {it.status === "done" && it.compressedBlob ? formatBytes(it.compressedBlob.size) : "—"}
                        </td>
                        <td className="py-2.5 pr-4">
                          {saved !== null ? (
                            <span className={saved >= 0 ? "text-green-500" : "text-red-400"}>
                              {saved >= 0 ? `${saved}%` : `-${Math.abs(saved)}%`}
                            </span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                        <td className="py-2.5 pr-4">
                          {it.status === "compressing" ? (
                            <span className="inline-flex items-center gap-1.5 text-blue-400">
                              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> Compressing
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
                          {it.status === "done" && it.compressedBlob ? (
                            <DownloadButton filename={it.file.name} blob={it.compressedBlob} label="Download" className="px-3 py-1.5 text-xs" />
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {zipBlob ? (
                <div className="mt-4">
                  <DownloadButton filename="compressed-images.zip" blob={zipBlob} label="Download all as ZIP" />
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
