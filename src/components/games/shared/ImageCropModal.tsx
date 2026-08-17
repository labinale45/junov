"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

export type CropShape = "round" | "square" | "diamond";

const VIEW = 260; // on-screen crop viewport, css px
const OUTPUT = 320; // exported image resolution, px
const MAX_ZOOM = 3;
const MASK_R = VIEW * 0.42;

/** Modal that lets the user pan/zoom an uploaded photo inside a shape-masked viewport, then exports a square crop of the visible area. */
export function ImageCropModal({
  file,
  shape,
  onCancel,
  onConfirm,
  container,
}: {
  file: File;
  shape: CropShape;
  onCancel: () => void;
  onConfirm: (dataUrl: string) => void;
  /** Portal target for the dialog — pass the fullscreen element while in fullscreen, otherwise it renders outside it and never paints. */
  container?: HTMLElement | null;
}) {
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setImgEl(img);
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const baseScale = imgEl ? Math.max(VIEW / imgEl.width, VIEW / imgEl.height) : 1;
  const scale = baseScale * zoom;
  const dispW = imgEl ? imgEl.width * scale : VIEW;
  const dispH = imgEl ? imgEl.height * scale : VIEW;

  function clamp(p: { x: number; y: number }, w: number, h: number) {
    const minX = Math.min(0, VIEW - w);
    const minY = Math.min(0, VIEW - h);
    return { x: Math.min(0, Math.max(minX, p.x)), y: Math.min(0, Math.max(minY, p.y)) };
  }

  // Derived at render time (not stored) so it stays correct across zoom/image changes without an effect.
  const clampedPos = clamp(pos, dispW, dispH);

  function onPointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: clampedPos.x, origY: clampedPos.y };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos(clamp({ x: dragRef.current.origX + dx, y: dragRef.current.origY + dy }, dispW, dispH));
  }
  function onPointerUp() {
    dragRef.current = null;
  }

  function handleConfirm() {
    if (!imgEl) return;
    const srcX = -clampedPos.x / scale;
    const srcY = -clampedPos.y / scale;
    const srcSize = VIEW / scale;
    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT;
    canvas.height = OUTPUT;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(imgEl, srcX, srcY, srcSize, srcSize, 0, 0, OUTPUT, OUTPUT);
    onConfirm(canvas.toDataURL("image/jpeg", 0.85));
  }

  const cx = VIEW / 2;
  const cy = VIEW / 2;
  const diamondPoints = `${cx},${cy - MASK_R} ${cx + MASK_R},${cy} ${cx},${cy + MASK_R} ${cx - MASK_R},${cy}`;

  return (
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent container={container} className="max-w-sm border-white/10 bg-slate-900 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-slate-50">Position your photo</DialogTitle>
        </DialogHeader>

        <div
          className="relative mx-auto touch-none select-none overflow-hidden rounded-lg bg-slate-950"
          style={{ width: VIEW, height: VIEW }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {imgEl ? (
            // eslint-disable-next-line @next/next/no-img-element -- dynamic client-side blob URL while cropping, not a static asset
            <img
              src={imgEl.src}
              alt=""
              draggable={false}
              className="absolute left-0 top-0 max-w-none cursor-grab active:cursor-grabbing"
              style={{ width: dispW, height: dispH, transform: `translate(${clampedPos.x}px, ${clampedPos.y}px)` }}
            />
          ) : null}
          <svg width={VIEW} height={VIEW} className="pointer-events-none absolute inset-0">
            <mask id="crop-shape-mask">
              <rect width={VIEW} height={VIEW} fill="white" />
              {shape === "round" && <circle cx={cx} cy={cy} r={MASK_R} fill="black" />}
              {shape === "square" && <rect x={cx - MASK_R} y={cy - MASK_R} width={MASK_R * 2} height={MASK_R * 2} fill="black" />}
              {shape === "diamond" && <polygon points={diamondPoints} fill="black" />}
            </mask>
            <rect width={VIEW} height={VIEW} fill="black" fillOpacity="0.6" mask="url(#crop-shape-mask)" />
            {shape === "round" && <circle cx={cx} cy={cy} r={MASK_R} fill="none" stroke="white" strokeOpacity="0.8" strokeWidth="2" />}
            {shape === "square" && (
              <rect x={cx - MASK_R} y={cy - MASK_R} width={MASK_R * 2} height={MASK_R * 2} fill="none" stroke="white" strokeOpacity="0.8" strokeWidth="2" />
            )}
            {shape === "diamond" && <polygon points={diamondPoints} fill="none" stroke="white" strokeOpacity="0.8" strokeWidth="2" />}
          </svg>
        </div>

        <div className="flex items-center gap-3 px-1">
          <span className="text-xs text-slate-400">Zoom</span>
          <Slider min={1} max={MAX_ZOOM} step={0.01} value={[zoom]} onValueChange={([v]) => setZoom(v)} />
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!imgEl}
            className="rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
          >
            Use photo
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
