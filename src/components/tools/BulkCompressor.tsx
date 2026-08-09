"use client";

import { useCallback, useMemo, useState } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { CheckCircle2, FileWarning, Loader2, RefreshCcw } from "lucide-react";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { DropZone } from "@/components/tools/shared/DropZone";
import { formatBytes } from "@/lib/image-utils";

interface CompressorItem {
  id: string;
  file: File;
  status: "idle" | "compressing" | "done" | "error";
  error?: string;
  compressedBlob?: Blob;
}

function savedPercent(originalBytes: number, compressedBytes: number): number {
  if (originalBytes <= 0) return 0;
  return Math.round(((originalBytes - compressedBytes) / originalBytes) * 100);
}

async function compressFile(file: File, quality: number): Promise<Blob> {
  return imageCompression(file, {
    maxSizeMB: 10,
    initialQuality: quality / 100,
    useWebWorker: true,
  });
}

export function BulkCompressor() {
  const [items, setItems] = useState<CompressorItem[]>([]);
  const [quality, setQuality] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    setZipBlob(null);
    setItems(
      files.map((file) => ({
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
        file,
        status: "idle" as const,
      }))
    );
  }, []);

  const runCompression = useCallback(async () => {
    setIsCompressing(true);
    setZipBlob(null);
    setItems((prev) => prev.map((it) => ({ ...it, status: "compressing" as const, error: undefined })));

    const settled = await Promise.all(
      items.map(async (item) => {
        try {
          const blob = await compressFile(item.file, quality);
          return { ...item, status: "done" as const, compressedBlob: blob };
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

    const done = settled.filter((it) => it.status === "done" && it.compressedBlob);
    if (done.length > 0) {
      const zip = new JSZip();
      for (const it of done) zip.file(it.file.name, it.compressedBlob!);
      setZipBlob(await zip.generateAsync({ type: "blob" }));
    }
  }, [items, quality]);

  const reset = useCallback(() => {
    setItems([]);
    setZipBlob(null);
  }, []);

  const doneItems = useMemo(() => items.filter((it) => it.status === "done" && it.compressedBlob), [items]);

  const summary = useMemo(() => {
    if (doneItems.length === 0) return null;
    const totalOriginal = doneItems.reduce((sum, it) => sum + it.file.size, 0);
    const totalCompressed = doneItems.reduce((sum, it) => sum + (it.compressedBlob?.size ?? 0), 0);
    const totalSavedBytes = totalOriginal - totalCompressed;
    const totalSavedPercent = savedPercent(totalOriginal, totalCompressed);
    const avgRatio =
      doneItems.reduce((sum, it) => sum + savedPercent(it.file.size, it.compressedBlob?.size ?? 0), 0) / doneItems.length;
    return {
      totalOriginal,
      totalCompressed,
      totalSavedBytes,
      totalSavedPercent,
      avgRatio: Math.round(avgRatio),
    };
  }, [doneItems]);

  const hasFinished = items.length > 0 && !isCompressing && items.every((it) => it.status === "done" || it.status === "error");

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, WebP — up to 10MB each, up to 50 files"
          maxSizeMB={10}
          multiple
          maxFiles={50}
          onFilesAccepted={handleFiles}
        />
      </div>

      {items.length > 0 ? (
        <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <div className="flex flex-wrap items-end gap-4">
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
                "Compress All"
              )}
            </button>
          </div>

          {hasFinished && summary ? (
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-white/[0.08] bg-slate-950 p-3">
                <p className="text-xs text-slate-500">Total original size</p>
                <p className="text-lg font-semibold text-slate-100">{formatBytes(summary.totalOriginal)}</p>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-slate-950 p-3">
                <p className="text-xs text-slate-500">Total compressed size</p>
                <p className="text-lg font-semibold text-slate-100">{formatBytes(summary.totalCompressed)}</p>
              </div>
              <div
                className={`rounded-lg border p-3 ${
                  summary.totalSavedBytes >= 0 ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"
                }`}
              >
                <p className="text-xs text-slate-500">Total saved</p>
                <p className={`text-lg font-semibold ${summary.totalSavedBytes >= 0 ? "text-green-500" : "text-red-400"}`}>
                  {formatBytes(Math.abs(summary.totalSavedBytes))} ({summary.totalSavedPercent >= 0 ? "" : "-"}
                  {Math.abs(summary.totalSavedPercent)}%)
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-slate-950 p-3">
                <p className="text-xs text-slate-500">Avg. compression ratio</p>
                <p className="text-lg font-semibold text-slate-100">{summary.avgRatio}%</p>
              </div>
            </div>
          ) : null}

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
                <DownloadButton filename="compressed-images.zip" blob={zipBlob} label="Download All as ZIP" />
              </div>
            ) : null}
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
