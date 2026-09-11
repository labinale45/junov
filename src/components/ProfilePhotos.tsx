"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = ["/rabin-short-forma-nobg.png", "/rabin-short-cutout.png", "/rabin-ale.png"];

export function ProfilePhotos({ reduced = false, compact = false }: { reduced?: boolean; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const change = (direction: number) => setIndex(current => (current + direction + photos.length) % photos.length);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || reduced || preference.matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(current => (current + 1) % photos.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused, reduced, index]);

  return <div className={`pf-photo-viewer ${compact ? "pf-photo-compact" : "pf-portrait"}`}
    role="group" aria-roledescription="carousel" aria-label="Rabin Ale photos. Swipe or use left and right arrow keys to change photo." tabIndex={0}
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
    onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); change(event.key === "ArrowLeft" ? -1 : 1); } }}
    onPointerDown={event => { start.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
    onPointerCancel={() => { start.current = null; }}
    onPointerUp={event => { const origin = start.current; start.current = null; if (!origin) return; const delta = event.clientX - origin.x; if (Math.abs(delta) > 25 && Math.abs(delta) > Math.abs(event.clientY - origin.y)) change(delta < 0 ? 1 : -1); }}>
    {photos.map((src, photoIndex) => <Image key={src} src={src} alt={photoIndex === index ? `Rabin Ale, portrait ${photoIndex + 1} of 3` : ""} aria-hidden={photoIndex !== index} width={190} height={190} priority draggable={false} className={photoIndex === index ? "pf-photo-active" : ""} />)}
  </div>;
}
