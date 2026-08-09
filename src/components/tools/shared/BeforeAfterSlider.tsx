"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const draggingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, ratio)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video w-full select-none overflow-hidden rounded-xl border border-white/[0.08] bg-slate-900 touch-none ${className}`}
      onPointerDown={(e) => {
        draggingRef.current = true;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (draggingRef.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        draggingRef.current = false;
      }}
      onPointerLeave={() => {
        draggingRef.current = false;
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={afterSrc} alt={afterLabel} className="absolute inset-0 h-full w-full object-contain" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${percent}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className="h-full object-contain"
          style={{ width: containerWidth || "100%", maxWidth: "none" }}
          draggable={false}
        />
      </div>

      <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-slate-100">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-slate-100">
        {afterLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${percent}%` }}>
        <div className="h-full w-0.5 -translate-x-1/2 bg-violet-500" />
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-violet-500 bg-slate-950 shadow-lg">
          <div className="flex gap-0.5">
            <span className="h-3 w-0.5 rounded-full bg-violet-400" />
            <span className="h-3 w-0.5 rounded-full bg-violet-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
