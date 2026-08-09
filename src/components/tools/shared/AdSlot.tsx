import { Megaphone } from "lucide-react";

type AdSize = "banner" | "rectangle" | "leaderboard";

const SIZE_MIN_HEIGHT: Record<AdSize, string> = {
  banner: "min-h-[90px]",
  rectangle: "min-h-[250px]",
  leaderboard: "min-h-[90px]",
};

const SIZE_MAX_WIDTH: Record<AdSize, string> = {
  banner: "max-w-[728px]",
  rectangle: "max-w-[336px]",
  leaderboard: "max-w-[970px]",
};

/** Flip NEXT_PUBLIC_ADS_ENABLED=true in production once real AdSense ad units are approved and configured. */
const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
const IS_DEV = process.env.NODE_ENV === "development";

export function AdSlot({ size = "banner" }: { size?: AdSize }) {
  // Production stays hidden until real ad units are live; dev always previews placement.
  if (!IS_DEV && !ADS_ENABLED) return null;

  return (
    <div className={`mx-auto my-6 w-full ${SIZE_MAX_WIDTH[size]} ${SIZE_MIN_HEIGHT[size]}`} data-ad-slot={size}>
      {/* AdSense ad will go here in production once NEXT_PUBLIC_ADS_ENABLED is on */}
      {IS_DEV ? <TestAdPreview size={size} /> : null}
    </div>
  );
}

/** Clearly-labeled mock ad, dev-only — lets you eyeball real ad weight/placement without live AdSense. */
function TestAdPreview({ size }: { size: AdSize }) {
  const isRectangle = size === "rectangle";

  return (
    <div
      className={`relative flex h-full w-full items-center gap-4 rounded-xl border border-dashed border-amber-500/30 bg-gradient-to-br from-slate-900 to-slate-900/60 px-5 py-4 ${
        isRectangle ? "flex-col justify-center text-center" : ""
      }`}
    >
      <span className="absolute right-2 top-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-400">
        Test Ad
      </span>

      <span
        className={`flex shrink-0 items-center justify-center rounded-lg bg-slate-700/50 text-slate-500 ${
          isRectangle ? "h-14 w-14" : "h-10 w-10"
        }`}
      >
        <Megaphone className={isRectangle ? "h-7 w-7" : "h-5 w-5"} aria-hidden />
      </span>

      <div className={isRectangle ? "" : "min-w-0 flex-1"}>
        <p className="text-sm font-medium text-slate-400">Ad placeholder — {size}</p>
        <p className="text-xs text-slate-600">Dev-only preview. Real ads render once ads are enabled.</p>
      </div>

      {!isRectangle ? (
        <span className="shrink-0 rounded-full bg-slate-700/60 px-4 py-1.5 text-xs font-medium text-slate-400">
          Learn more
        </span>
      ) : null}
    </div>
  );
}
