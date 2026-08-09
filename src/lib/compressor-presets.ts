export interface CompressorPreset {
  slug: string;
  targetKB: number;
  label: string;
}

/** Target sizes in KB. Values >= 1024 render as "N MB" in the slug/label. */
const RAW_TARGETS_KB = [10, 20, 50, 100, 200, 500, 1024, 2048, 5120, 10240];

function labelFor(kb: number): string {
  return kb >= 1024 ? `${kb / 1024}MB` : `${kb}KB`;
}

export const COMPRESSOR_PRESETS: CompressorPreset[] = RAW_TARGETS_KB.map((targetKB) => {
  const label = labelFor(targetKB);
  return { slug: `compress-to-${label.toLowerCase()}`, targetKB, label };
});

export function getPresetBySlug(slug: string): CompressorPreset | undefined {
  return COMPRESSOR_PRESETS.find((p) => p.slug === slug);
}
