"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { DownloadButton } from "@/components/tools/shared/DownloadButton";
import { baseName, canvasToBlob, extensionFor, loadImageFromFile } from "@/lib/image-utils";

type Tab = "text" | "image";

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const POSITIONS: { value: Position; label: string }[] = [
  { value: "top-left", label: "Top Left" },
  { value: "top-center", label: "Top Center" },
  { value: "top-right", label: "Top Right" },
  { value: "middle-left", label: "Middle Left" },
  { value: "center", label: "Center" },
  { value: "middle-right", label: "Middle Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right", label: "Bottom Right" },
];

function positionParts(position: Position): { h: "left" | "center" | "right"; v: "top" | "middle" | "bottom" } {
  if (position === "center") return { h: "center", v: "middle" };
  const [vert, horiz] = position.split("-") as ["top" | "middle" | "bottom", "left" | "center" | "right"];
  return { v: vert, h: horiz };
}

function getPadding(canvas: HTMLCanvasElement) {
  return Math.max(12, Math.round(Math.min(canvas.width, canvas.height) * 0.03));
}

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) || 0;
  const g = parseInt(clean.slice(2, 4), 16) || 0;
  const b = parseInt(clean.slice(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawTextWatermark(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  text: string,
  fontSize: number,
  color: string,
  opacityPct: number,
  position: Position
) {
  if (!text.trim()) return;
  const { h, v } = positionParts(position);
  const padding = getPadding(canvas);

  ctx.save();
  ctx.font = `600 ${fontSize}px sans-serif`;
  ctx.textAlign = h === "left" ? "left" : h === "right" ? "right" : "center";
  ctx.textBaseline = v === "top" ? "top" : v === "bottom" ? "bottom" : "middle";
  ctx.fillStyle = hexToRgba(color, opacityPct / 100);

  const x = h === "left" ? padding : h === "right" ? canvas.width - padding : canvas.width / 2;
  const y = v === "top" ? padding : v === "bottom" ? canvas.height - padding : canvas.height / 2;

  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawImageWatermark(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  logo: HTMLImageElement,
  sizePct: number,
  opacityPct: number,
  position: Position
) {
  const boxW = canvas.width * (sizePct / 100);
  const boxH = boxW * (logo.naturalHeight / logo.naturalWidth);
  const { h, v } = positionParts(position);
  const padding = getPadding(canvas);

  const x = h === "left" ? padding : h === "right" ? canvas.width - padding - boxW : (canvas.width - boxW) / 2;
  const y = v === "top" ? padding : v === "bottom" ? canvas.height - padding - boxH : (canvas.height - boxH) / 2;

  ctx.save();
  ctx.globalAlpha = opacityPct / 100;
  ctx.drawImage(logo, x, y, boxW, boxH);
  ctx.restore();
}

function PositionGrid({ value, onChange }: { value: Position; onChange: (p: Position) => void }) {
  return (
    <div className="grid w-32 grid-cols-3 gap-1.5" role="group" aria-label="Watermark position">
      {POSITIONS.map((p) => (
        <button
          key={p.value}
          type="button"
          onClick={() => onChange(p.value)}
          aria-label={p.label}
          aria-pressed={value === p.value}
          title={p.label}
          className={`flex aspect-square items-center justify-center rounded-md border transition-all duration-200 ease-out ${
            value === p.value
              ? "border-violet-500 bg-violet-600/20"
              : "border-white/[0.08] bg-slate-950 hover:border-white/20"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${value === p.value ? "bg-violet-400" : "bg-slate-600"}`}
            aria-hidden
          />
        </button>
      ))}
    </div>
  );
}

export function Watermark() {
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [mainImg, setMainImg] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [tab, setTab] = useState<Tab>("text");

  const [text, setText] = useState("Your Watermark");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#ffffff");
  const [textOpacity, setTextOpacity] = useState(80);
  const [textPosition, setTextPosition] = useState<Position>("bottom-right");

  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [logoSizePct, setLogoSizePct] = useState(20);
  const [logoOpacity, setLogoOpacity] = useState(80);
  const [logoPosition, setLogoPosition] = useState<Position>("bottom-right");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mime = mainFile && ["image/jpeg", "image/png", "image/webp"].includes(mainFile.type) ? mainFile.type : "image/png";

  const handleMainFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setError(null);
    try {
      const img = await loadImageFromFile(file);
      setMainFile(file);
      setMainImg(img);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't load that image.");
    }
  }, []);

  const handleLogoFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    try {
      const img = await loadImageFromFile(file);
      setLogoImg(img);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't load that logo image.");
    }
  }, []);

  const reset = useCallback(() => {
    setMainFile(null);
    setMainImg(null);
    setLogoImg(null);
    setError(null);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mainImg) return;
    canvas.width = mainImg.naturalWidth;
    canvas.height = mainImg.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mainImg, 0, 0);

    if (tab === "text") {
      drawTextWatermark(ctx, canvas, text, fontSize, color, textOpacity, textPosition);
    } else if (tab === "image" && logoImg) {
      drawImageWatermark(ctx, canvas, logoImg, logoSizePct, logoOpacity, logoPosition);
    }
  }, [mainImg, tab, text, fontSize, color, textOpacity, textPosition, logoImg, logoSizePct, logoOpacity, logoPosition]);

  const downloadFilename = mainFile ? `${baseName(mainFile.name)}-watermarked.${extensionFor(mime)}` : "watermarked.png";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, WebP — up to 20MB"
          maxSizeMB={20}
          onFilesAccepted={handleMainFiles}
        />
        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
      </div>

      {mainImg ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
            <p className="mb-3 text-sm font-medium text-slate-300">Preview</p>
            <div className="flex items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950">
              <canvas ref={canvasRef} className="h-auto max-h-[520px] w-full object-contain" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <DownloadButton
                filename={downloadFilename}
                onGenerate={() => {
                  const canvas = canvasRef.current;
                  if (!canvas) throw new Error("Nothing to download yet.");
                  return canvasToBlob(canvas, mime, mime === "image/jpeg" ? 0.92 : undefined);
                }}
                label="Download Watermarked Image"
              />
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-300"
              >
                <RefreshCcw className="h-3.5 w-3.5" aria-hidden /> Start over
              </button>
            </div>
          </div>

          <div className="space-y-5 rounded-xl border border-white/[0.08] bg-slate-900 p-5">
            <div className="inline-flex w-full rounded-lg border border-white/[0.08] bg-slate-950 p-1 text-sm">
              <button
                type="button"
                onClick={() => setTab("text")}
                className={`flex-1 rounded-md px-3 py-1.5 font-medium transition-colors ${
                  tab === "text" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Text Watermark
              </button>
              <button
                type="button"
                onClick={() => setTab("image")}
                className={`flex-1 rounded-md px-3 py-1.5 font-medium transition-colors ${
                  tab === "image" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Image Watermark
              </button>
            </div>

            {tab === "text" ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Watermark text</label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g. (c) Your Name"
                    className="w-full rounded-lg border border-white/[0.08] bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex justify-between text-sm font-medium text-slate-300">
                    <span>Font size</span>
                    <span className="text-slate-500">{fontSize}px</span>
                  </label>
                  <input
                    type="range"
                    min={12}
                    max={200}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-violet-600"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-medium text-slate-300">Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-9 w-16 cursor-pointer rounded-md border border-white/[0.08] bg-slate-950"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex justify-between text-sm font-medium text-slate-300">
                    <span>Opacity</span>
                    <span className="text-slate-500">{textOpacity}%</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={textOpacity}
                    onChange={(e) => setTextOpacity(Number(e.target.value))}
                    className="w-full accent-violet-600"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Position</label>
                  <PositionGrid value={textPosition} onChange={setTextPosition} />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Logo / watermark image</label>
                  <DropZone
                    accept="image/jpeg,image/png,image/webp"
                    acceptLabel="JPG, PNG, WebP — up to 20MB"
                    maxSizeMB={20}
                    onFilesAccepted={handleLogoFiles}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex justify-between text-sm font-medium text-slate-300">
                    <span>Size</span>
                    <span className="text-slate-500">{logoSizePct}%</span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={80}
                    value={logoSizePct}
                    onChange={(e) => setLogoSizePct(Number(e.target.value))}
                    className="w-full accent-violet-600"
                  />
                  <p className="mt-1 text-xs text-slate-500">Percentage of the main image&apos;s width.</p>
                </div>

                <div>
                  <label className="mb-1.5 flex justify-between text-sm font-medium text-slate-300">
                    <span>Opacity</span>
                    <span className="text-slate-500">{logoOpacity}%</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={logoOpacity}
                    onChange={(e) => setLogoOpacity(Number(e.target.value))}
                    className="w-full accent-violet-600"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Position</label>
                  <PositionGrid value={logoPosition} onChange={setLogoPosition} />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
