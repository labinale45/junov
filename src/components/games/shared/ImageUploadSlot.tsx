"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { resizeImageFile } from "@/lib/game-image-utils";

/** Single custom-image upload slot with a system-default fallback, used inside a game's settings popover. */
export function ImageUploadSlot({
  label,
  value,
  onChange,
  maxDim = 160,
  onFile,
}: {
  label: string;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  maxDim?: number;
  /** When provided, the raw file is handed here instead of being auto-resized (e.g. to run it through a crop step first). Call onChange yourself once ready. */
  onFile?: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (onFile) {
      onFile(file);
      return;
    }
    const dataUrl = await resizeImageFile(file, maxDim);
    onChange(dataUrl);
  }

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label={`Upload image for ${label}`}
        className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-800/80 text-slate-400 transition-colors hover:border-violet-500/40 hover:text-white"
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- dynamic client-side data URL, not a static asset
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <Upload className="h-4 w-4" aria-hidden />
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-slate-300">{label}</p>
        <div className="mt-0.5 flex gap-2.5 text-[11px]">
          <button type="button" onClick={() => inputRef.current?.click()} className="font-medium text-violet-400 hover:text-violet-300">
            {value ? "Change" : "Upload"}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-0.5 font-medium text-slate-500 hover:text-slate-300"
            >
              <X className="h-3 w-3" aria-hidden />
              Reset to default
            </button>
          ) : null}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}
