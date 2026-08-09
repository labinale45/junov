"use client";

import { useCallback, useId, useRef, useState } from "react";
import { AlertCircle, RefreshCcw, UploadCloud, X } from "lucide-react";

export interface DropZoneProps {
  /** input[accept] value, e.g. "image/*" or "image/*,.heic,.heif" */
  accept?: string;
  /** Human readable formats shown under the drop area, e.g. "JPG, PNG, WEBP — up to 20MB" */
  acceptLabel?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
  onFilesAccepted: (files: File[]) => void;
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function extensionOf(name: string) {
  const idx = name.lastIndexOf(".");
  return idx === -1 ? "" : name.slice(idx).toLowerCase();
}

function isFileAccepted(file: File, accept?: string) {
  if (!accept) return true;
  const rules = accept.split(",").map((r) => r.trim().toLowerCase()).filter(Boolean);
  if (rules.length === 0) return true;
  const ext = extensionOf(file.name);
  const type = (file.type || "").toLowerCase();
  return rules.some((rule) => {
    if (rule.startsWith(".")) return ext === rule;
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
    return type === rule;
  });
}

interface StagedFile {
  file: File;
  previewUrl: string | null;
}

export function DropZone({
  accept = "image/*",
  acceptLabel,
  maxSizeMB = 10,
  multiple = false,
  maxFiles = multiple ? 20 : 1,
  disabled = false,
  className = "",
  onFilesAccepted,
}: DropZoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [staged, setStaged] = useState<StagedFile[]>([]);

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      const incoming = Array.from(fileList);
      if (incoming.length === 0) return;

      const maxBytes = maxSizeMB * 1024 * 1024;
      const accepted: File[] = [];
      let rejectReason: string | null = null;

      for (const file of incoming) {
        if (!isFileAccepted(file, accept)) {
          rejectReason = `"${file.name}" isn't a supported file type.`;
          continue;
        }
        if (file.size > maxBytes) {
          rejectReason = `"${file.name}" is larger than ${maxSizeMB}MB.`;
          continue;
        }
        accepted.push(file);
      }

      const capped = multiple ? accepted.slice(0, maxFiles) : accepted.slice(0, 1);
      if (multiple && accepted.length > maxFiles) {
        rejectReason = `Only the first ${maxFiles} files were kept (max ${maxFiles}).`;
      }

      if (capped.length === 0) {
        setError(rejectReason ?? "No valid files selected.");
        return;
      }

      setError(rejectReason);
      const next: StagedFile[] = capped.map((file) => ({
        file,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      }));

      setStaged((prev) => {
        prev.forEach((s) => s.previewUrl && URL.revokeObjectURL(s.previewUrl));
        return next;
      });
      onFilesAccepted(capped);
    },
    [accept, maxFiles, maxSizeMB, multiple, onFilesAccepted]
  );

  const clearStaged = useCallback(() => {
    setStaged((prev) => {
      prev.forEach((s) => s.previewUrl && URL.revokeObjectURL(s.previewUrl));
      return [];
    });
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const hiddenInput = (
    <input
      ref={inputRef}
      id={inputId}
      type="file"
      accept={accept}
      multiple={multiple}
      disabled={disabled}
      className="sr-only"
      onChange={(e) => {
        if (e.target.files) processFiles(e.target.files);
      }}
    />
  );

  // Once a single file is staged, replace the big drop target with a compact row —
  // showing both at once just duplicates the same file and pushes real controls down.
  const collapseDropzone = !multiple && staged.length > 0;

  if (collapseDropzone) {
    const s = staged[0];
    return (
      <div className={className}>
        {hiddenInput}
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-slate-900 px-3 py-2.5">
          {s.previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.previewUrl} alt="" className="h-10 w-10 shrink-0 rounded-md object-cover" />
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-800 text-[10px] font-medium text-slate-400">
              {extensionOf(s.file.name).replace(".", "").toUpperCase() || "FILE"}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-slate-100">{s.file.name}</p>
            <p className="text-xs text-slate-500">{formatBytes(s.file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => !disabled && inputRef.current?.click()}
            disabled={disabled}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-violet-400 transition-colors hover:bg-violet-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCcw className="h-3.5 w-3.5" aria-hidden />
            Replace
          </button>
          <button
            type="button"
            onClick={clearStaged}
            className="shrink-0 rounded-md p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200"
            aria-label="Clear selection"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        {error ? (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (!disabled) processFiles(e.dataTransfer.files);
        }}
        className={`group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all duration-300 ease-out cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-violet-500/60 hover:bg-violet-500/[0.03]"
        } ${
          isDragging
            ? "scale-[1.01] border-violet-500 bg-violet-500/10 shadow-[0_0_0_4px_rgba(124,58,237,0.15)]"
            : "border-white/15 bg-white/[0.02]"
        }`}
      >
        {hiddenInput}
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-violet-600/15 text-violet-400 transition-transform duration-300 ease-out group-hover:scale-110 ${
            isDragging ? "scale-110" : ""
          }`}
        >
          <UploadCloud className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-medium text-slate-50">
            <span className="text-violet-400">Click to upload</span> or drag and drop
          </p>
          {acceptLabel ? <p className="mt-1 text-xs text-slate-400">{acceptLabel}</p> : null}
        </div>
      </label>

      {error ? (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}

      {multiple && staged.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {staged.map((s, i) => (
            <li
              key={`${s.file.name}-${i}`}
              className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-slate-900 px-3 py-2"
            >
              {s.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.previewUrl} alt="" className="h-10 w-10 shrink-0 rounded-md object-cover" />
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-800 text-[10px] font-medium text-slate-400">
                  {extensionOf(s.file.name).replace(".", "").toUpperCase() || "FILE"}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-slate-100">{s.file.name}</p>
                <p className="text-xs text-slate-500">{formatBytes(s.file.size)}</p>
              </div>
              {i === staged.length - 1 ? (
                <button
                  type="button"
                  onClick={clearStaged}
                  className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200"
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
