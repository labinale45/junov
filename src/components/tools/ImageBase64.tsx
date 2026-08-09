"use client";

import { useCallback, useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { CopyButton } from "@/components/tools/shared/CopyButton";

type Tab = "encode" | "decode";

const EXT_FOR_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/bmp": "bmp",
  "image/x-icon": "ico",
};

function extForMime(mime: string) {
  return EXT_FOR_MIME[mime] ?? "png";
}

function baseName(name: string) {
  const idx = name.lastIndexOf(".");
  return idx === -1 ? name : name.slice(0, idx);
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Couldn't read that file."));
    reader.readAsDataURL(file);
  });
}

/** Normalizes user input (full data URL or raw base64) into a usable data URL + detected mime type. */
function normalizeBase64Input(input: string): { dataUrl: string; mime: string } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/^data:([^;,]+);base64,([\s\S]*)$/);
  if (match) {
    const mime = match[1] || "image/png";
    const cleanData = match[2].replace(/\s/g, "");
    return { dataUrl: `data:${mime};base64,${cleanData}`, mime };
  }

  const cleanData = trimmed.replace(/\s/g, "");
  return { dataUrl: `data:image/png;base64,${cleanData}`, mime: "image/png" };
}

export function ImageBase64() {
  const [tab, setTab] = useState<Tab>("encode");

  // Encode tab state
  const [fileName, setFileName] = useState<string | null>(null);
  const [encoded, setEncoded] = useState<string>("");
  const [encodeError, setEncodeError] = useState<string | null>(null);

  // Decode tab state
  const [decodeInput, setDecodeInput] = useState<string>("");

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setEncodeError(null);
    setEncoded("");
    setFileName(file.name);
    try {
      const dataUrl = await readFileAsDataURL(file);
      setEncoded(dataUrl);
    } catch (err) {
      setEncodeError(err instanceof Error ? err.message : "Couldn't encode that file.");
    }
  }, []);

  const decodeResult = useMemo(() => {
    if (!decodeInput.trim()) return { dataUrl: null, mime: null, error: null as string | null };
    const normalized = normalizeBase64Input(decodeInput);
    if (!normalized) return { dataUrl: null, mime: null, error: null };
    try {
      // Validate that the base64 payload actually decodes.
      const commaIdx = normalized.dataUrl.indexOf(",");
      const payload = normalized.dataUrl.slice(commaIdx + 1);
      if (!payload) throw new Error("empty");
      atob(payload);
      return { dataUrl: normalized.dataUrl, mime: normalized.mime, error: null as string | null };
    } catch {
      return { dataUrl: null, mime: null, error: "That doesn't look like valid Base64. Double-check you copied the whole string." };
    }
  }, [decodeInput]);

  const handleDownloadDecoded = useCallback(async () => {
    if (!decodeResult.dataUrl || !decodeResult.mime) return new Blob();
    const res = await fetch(decodeResult.dataUrl);
    return res.blob();
  }, [decodeResult]);

  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-lg border border-white/[0.08] bg-slate-900 p-1 text-sm">
        <button
          type="button"
          onClick={() => setTab("encode")}
          className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
            tab === "encode" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Image to Base64
        </button>
        <button
          type="button"
          onClick={() => setTab("decode")}
          className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
            tab === "decode" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Base64 to Image
        </button>
      </div>

      {tab === "encode" ? (
        <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <DropZone
            accept="image/*,.svg"
            acceptLabel="JPG, PNG, WebP, GIF, SVG — up to 10MB"
            maxSizeMB={10}
            onFilesAccepted={handleFiles}
          />

          {encodeError ? (
            <p className="flex items-center gap-1.5 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
              {encodeError}
            </p>
          ) : null}

          {encoded ? (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">Base64 data URL</label>
              <textarea
                readOnly
                value={encoded}
                rows={10}
                className="w-full resize-y rounded-lg border border-white/[0.08] bg-slate-950 p-3 font-mono text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              <p className="text-xs text-slate-500">{encoded.length.toLocaleString()} characters</p>
              <div className="flex flex-wrap gap-3">
                <CopyButton text={encoded} label="Copy Base64" />
                <DownloadButton
                  filename={`${baseName(fileName ?? "image")}-base64.txt`}
                  onGenerate={() => new Blob([encoded], { type: "text/plain" })}
                  label="Download as .txt"
                />
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Base64 string</label>
            <textarea
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              placeholder="Paste a data:image/...;base64,.... string or a raw base64 string"
              rows={10}
              className="w-full resize-y rounded-lg border border-white/[0.08] bg-slate-950 p-3 font-mono text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>

          {decodeResult.error ? (
            <p className="flex items-center gap-1.5 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
              {decodeResult.error}
            </p>
          ) : null}

          {decodeResult.dataUrl ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-300">Preview</p>
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={decodeResult.dataUrl} alt="Decoded preview" className="h-full w-full object-contain" />
              </div>
              <DownloadButton
                filename={`decoded-image.${extForMime(decodeResult.mime ?? "image/png")}`}
                onGenerate={handleDownloadDecoded}
                label="Download image"
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
