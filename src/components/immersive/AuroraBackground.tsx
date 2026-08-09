type Tone = "violet" | "indigo";

const TONE_BLOBS: Record<Tone, { a: string; b: string }> = {
  violet: {
    a: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
    b: "radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%)",
  },
  indigo: {
    a: "radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)",
    b: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)",
  },
};

/**
 * Slow-drifting decorative gradient blobs. Purely visual, absolutely positioned,
 * pointer-events-none — safe to drop behind any section's content.
 */
export function AuroraBackground({ tone = "violet" }: { tone?: Tone }) {
  const blobs = TONE_BLOBS[tone];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="animate-aurora-1 absolute -top-24 right-[-10%] h-[460px] w-[460px] rounded-full blur-[70px]"
        style={{ background: blobs.a }}
      />
      <div
        className="animate-aurora-2 absolute top-[45%] -left-32 h-[420px] w-[420px] rounded-full blur-[70px]"
        style={{ background: blobs.b }}
      />
    </div>
  );
}
