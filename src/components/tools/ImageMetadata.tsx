"use client";

import { useCallback, useState } from "react";
import { parse as parseExif } from "exifr";
import { AlertCircle, ImageOff, Loader2, MapPin } from "lucide-react";
import { DropZone } from "@/components/tools/shared/DropZone";
import { CopyButton } from "@/components/tools/shared/CopyButton";
import { formatBytes } from "@/lib/image-utils";

type ExifData = Record<string, unknown>;
type Status = "idle" | "loading" | "done" | "error";

interface MetadataRow {
  label: string;
  value: string;
}

interface Dimensions {
  width: number;
  height: number;
}

function asString(value: unknown): string | null {
  if (value === undefined || value === null || value === "") return null;
  return String(value);
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function formatExposureTime(value: unknown): string | null {
  const n = asNumber(value);
  if (n === null || n <= 0) return null;
  if (n >= 1) return `${n}s`;
  return `1/${Math.round(1 / n)}s`;
}

function formatAperture(value: unknown): string | null {
  const n = asNumber(value);
  if (n === null) return null;
  return `f/${Number.isInteger(n) ? n : n.toFixed(1)}`;
}

function formatDate(value: unknown): string | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value as string);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString();
}

function formatColorSpace(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  if (value === 1) return "sRGB";
  if (value === 65535) return "Uncalibrated";
  return String(value);
}

function formatCoordinate(value: unknown): string | null {
  const n = asNumber(value);
  return n === null ? null : n.toFixed(6);
}

interface MetadataSections {
  camera: MetadataRow[];
  date: MetadataRow[];
  exposure: MetadataRow[];
  gps: MetadataRow[];
  dimensions: MetadataRow[];
  color: MetadataRow[];
  file: MetadataRow[];
}

function buildSections(metadata: ExifData | null, dims: Dimensions | null, file: File): MetadataSections {
  const m = metadata ?? {};

  const camera: MetadataRow[] = [];
  const make = asString(m.Make);
  const model = asString(m.Model);
  const lens = [asString(m.LensMake), asString(m.LensModel)].filter(Boolean).join(" ").trim();
  if (make) camera.push({ label: "Make", value: make });
  if (model) camera.push({ label: "Model", value: model });
  if (lens) camera.push({ label: "Lens", value: lens });

  const date: MetadataRow[] = [];
  const dateVal = formatDate(m.DateTimeOriginal) ?? formatDate(m.CreateDate) ?? formatDate(m.ModifyDate);
  if (dateVal) date.push({ label: "Date Taken", value: dateVal });

  const exposure: MetadataRow[] = [];
  const exposureTime = formatExposureTime(m.ExposureTime);
  if (exposureTime) exposure.push({ label: "Exposure Time", value: exposureTime });
  const aperture = formatAperture(m.FNumber);
  if (aperture) exposure.push({ label: "Aperture", value: aperture });
  const iso = m.ISO ?? m.ISOSpeedRatings;
  if (iso !== undefined && iso !== null) exposure.push({ label: "ISO", value: String(iso) });
  const focalLength = asNumber(m.FocalLength);
  if (focalLength !== null) exposure.push({ label: "Focal Length", value: `${focalLength}mm` });

  const gps: MetadataRow[] = [];
  const lat = formatCoordinate(m.latitude);
  const lon = formatCoordinate(m.longitude);
  if (lat !== null && lon !== null) {
    gps.push({ label: "Latitude", value: lat });
    gps.push({ label: "Longitude", value: lon });
  }

  const width = asNumber(m.ExifImageWidth) ?? asNumber(m.ImageWidth) ?? asNumber(m.PixelXDimension) ?? dims?.width ?? null;
  const height = asNumber(m.ExifImageHeight) ?? asNumber(m.ImageHeight) ?? asNumber(m.PixelYDimension) ?? dims?.height ?? null;
  const dimensions: MetadataRow[] = [];
  if (width !== null && height !== null) dimensions.push({ label: "Dimensions", value: `${width} × ${height} px` });

  const color: MetadataRow[] = [];
  const colorSpace = formatColorSpace(m.ColorSpace);
  if (colorSpace) color.push({ label: "Color Space", value: colorSpace });

  const fileRows: MetadataRow[] = [
    { label: "File Name", value: file.name },
    { label: "File Size", value: formatBytes(file.size) },
    { label: "File Type", value: file.type || "—" },
  ];

  return { camera, date, exposure, gps, dimensions, color, file: fileRows };
}

function Section({ title, rows, children }: { title: string; rows: MetadataRow[]; children?: React.ReactNode }) {
  if (rows.length === 0 && !children) return null;
  return (
    <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      {rows.length > 0 ? (
        <dl className="divide-y divide-white/[0.06] text-sm">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-4 py-2">
              <dt className="text-slate-500">{r.label}</dt>
              <dd className="text-right font-medium text-slate-200">{r.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-sm text-slate-500">—</p>
      )}
      {children}
    </div>
  );
}

export function ImageMetadata() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [metadata, setMetadata] = useState<ExifData | null>(null);
  const [dims, setDims] = useState<Dimensions | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const nextFile = files[0];
    if (!nextFile) return;

    setFile(nextFile);
    setStatus("loading");
    setErrorMsg(null);
    setMetadata(null);
    setDims(null);

    const url = URL.createObjectURL(nextFile);
    const img = new Image();
    img.onload = () => {
      setDims({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;

    (async () => {
      try {
        const result = await parseExif(nextFile, { gps: true, tiff: true, exif: true });
        setMetadata((result as ExifData | undefined) ?? null);
        setStatus("done");
      } catch (err) {
        setErrorMsg(
          err instanceof Error ? err.message : "Couldn't read metadata from this image. It may be corrupted or unsupported."
        );
        setStatus("error");
      }
    })();
  }, []);

  const sections = file ? buildSections(metadata, dims, file) : null;
  const hasExif = sections
    ? sections.camera.length > 0 ||
      sections.date.length > 0 ||
      sections.exposure.length > 0 ||
      sections.gps.length > 0 ||
      sections.color.length > 0
    : false;

  const rawLat = asNumber(metadata?.latitude);
  const rawLon = asNumber(metadata?.longitude);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.08] bg-slate-900 p-5">
        <DropZone
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
          acceptLabel="JPG, PNG, WebP, HEIC — up to 20MB"
          maxSizeMB={20}
          onFilesAccepted={handleFiles}
        />
      </div>

      {status === "loading" ? (
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-slate-900 p-5 text-sm text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Reading metadata...
        </div>
      ) : null}

      {status === "error" ? (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {errorMsg}
        </div>
      ) : null}

      {status === "done" && file && sections ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">
              Metadata for <span className="font-medium text-slate-200">{file.name}</span>
            </p>
            <CopyButton text={JSON.stringify(metadata ?? {}, null, 2)} label="Copy all metadata as JSON" />
          </div>

          {!hasExif ? (
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-slate-900 p-5 text-sm text-slate-400">
              <ImageOff className="h-4 w-4 shrink-0" aria-hidden /> No EXIF metadata found in this image.
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <Section title="Camera" rows={sections.camera} />
            <Section title="Date Taken" rows={sections.date} />
            <Section title="Exposure" rows={sections.exposure} />
            <Section title="Color Space" rows={sections.color} />
            <Section title="Image Dimensions" rows={sections.dimensions} />
            <Section title="File Info" rows={sections.file} />
          </div>

          <Section title="GPS Location" rows={sections.gps}>
            {rawLat !== null && rawLon !== null ? (
              <a
                href={`https://www.google.com/maps?q=${rawLat},${rawLon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-violet-600/15 px-3 py-1.5 text-xs font-medium text-violet-400 transition-all duration-200 ease-out hover:bg-violet-600/25"
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden /> View on Google Maps
              </a>
            ) : null}
          </Section>
        </div>
      ) : null}
    </div>
  );
}
