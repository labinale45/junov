"use client";

import { useCallback, useState } from "react";
import Link from "next/link";

interface SpotlightCardProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  /** Tint of the glow — matches the site's violet/blue tool palette by default. */
  color?: string;
}

/** Card wrapper that renders a soft radial glow following the cursor on hover. */
export function SpotlightCard({ href, className = "", children, color = "124,58,237" }: SpotlightCardProps) {
  const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setStyle({
        opacity: 1,
        background: `radial-gradient(420px circle at ${x}% ${y}%, rgba(${color},0.16), transparent 70%)`,
      });
    },
    [color]
  );

  const handleLeave = useCallback(() => setStyle((s) => ({ ...s, opacity: 0 })), []);

  const glow = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
      style={style}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`relative isolate ${className}`}
      >
        {glow}
        {children}
      </Link>
    );
  }

  return (
    <div onMouseMove={handleMove} onMouseLeave={handleLeave} className={`relative isolate ${className}`}>
      {glow}
      {children}
    </div>
  );
}
