"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Computes a per-cell pixel size so a `cols` x `rows` grid of square cells fits entirely
 * within both the wrapper's available width AND the remaining viewport height — so the
 * whole board is visible without scrolling, on any screen size.
 */
export function useFitSquareGrid({
  cols,
  rows,
  gap,
  maxCell,
  minCell = 32,
  reserveBottom = 16,
}: {
  cols: number;
  rows: number;
  gap: number;
  maxCell: number;
  minCell?: number;
  reserveBottom?: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(maxCell);

  useEffect(() => {
    function recalc() {
      const el = wrapperRef.current;
      if (!el) return;
      const parent = el.parentElement;
      const availableWidth = (parent ?? el).clientWidth;
      const top = el.getBoundingClientRect().top;
      const availableHeight = window.innerHeight - top - reserveBottom;

      const widthPerCell = (availableWidth - gap * (cols - 1)) / cols;
      const heightPerCell = (availableHeight - gap * (rows - 1)) / rows;

      const size = Math.floor(Math.min(widthPerCell, heightPerCell, maxCell));
      setCellSize(Math.max(minCell, size));
    }

    recalc();
    window.addEventListener("resize", recalc);
    const ro = new ResizeObserver(recalc);
    if (wrapperRef.current?.parentElement) ro.observe(wrapperRef.current.parentElement);
    return () => {
      window.removeEventListener("resize", recalc);
      ro.disconnect();
    };
  }, [cols, rows, gap, maxCell, minCell, reserveBottom]);

  return { wrapperRef, cellSize };
}
