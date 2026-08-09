"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export interface DownloadButtonProps {
  filename: string;
  blob?: Blob | null;
  url?: string | null;
  /** Lazily produce the blob to download, e.g. from a canvas or a ZIP builder. */
  onGenerate?: () => Promise<Blob> | Blob;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function DownloadButton({
  filename,
  blob,
  url,
  onGenerate,
  disabled = false,
  label = "Download",
  className = "",
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleClick = useCallback(async () => {
    if (disabled || isDownloading) return;
    setIsDownloading(true);
    try {
      let objectUrl = url ?? null;
      let revoke = false;

      if (!objectUrl) {
        const resolvedBlob = blob ?? (onGenerate ? await onGenerate() : null);
        if (!resolvedBlob) throw new Error("Nothing to download yet.");
        objectUrl = URL.createObjectURL(resolvedBlob);
        revoke = true;
      }

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      if (revoke) URL.revokeObjectURL(objectUrl);

      toast.success(`Downloaded ${filename}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [disabled, isDownloading, url, blob, onGenerate, filename]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isDownloading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 ease-out hover:shadow-violet-600/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none ${className}`}
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Downloading...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" aria-hidden />
          {label}
        </>
      )}
    </button>
  );
}
