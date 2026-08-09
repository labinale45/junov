/**
 * Manual encoders for formats the Canvas API's toBlob() cannot produce
 * (BMP, GIF, TIFF are not supported output MIME types in any browser).
 * All operate on raw ImageData and stay entirely client-side.
 */

export function encodeBMP(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const rowSize = Math.floor((24 * width + 31) / 32) * 4;
  const pixelArraySize = rowSize * height;
  const fileSize = 54 + pixelArraySize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  view.setUint8(0, 0x42); // 'B'
  view.setUint8(1, 0x4d); // 'M'
  view.setUint32(2, fileSize, true);
  view.setUint32(6, 0, true);
  view.setUint32(10, 54, true); // pixel data offset

  view.setUint32(14, 40, true); // DIB header size
  view.setInt32(18, width, true);
  view.setInt32(22, height, true); // positive = bottom-up
  view.setUint16(26, 1, true); // planes
  view.setUint16(28, 24, true); // bits per pixel
  view.setUint32(30, 0, true); // no compression
  view.setUint32(34, pixelArraySize, true);
  view.setInt32(38, 2835, true);
  view.setInt32(42, 2835, true);
  view.setUint32(46, 0, true);
  view.setUint32(50, 0, true);

  const rowPadding = rowSize - width * 3;
  let offset = 54;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      view.setUint8(offset++, data[srcIdx + 2]); // B
      view.setUint8(offset++, data[srcIdx + 1]); // G
      view.setUint8(offset++, data[srcIdx]); // R
    }
    for (let p = 0; p < rowPadding; p++) view.setUint8(offset++, 0);
  }

  return new Blob([buffer], { type: "image/bmp" });
}

export function encodeTIFF(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const rgb = new Uint8Array(width * height * 3);
  for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
    rgb[j] = data[i];
    rgb[j + 1] = data[i + 1];
    rgb[j + 2] = data[i + 2];
  }

  const numEntries = 8;
  const ifdSize = 2 + numEntries * 12 + 4;
  const headerSize = 8;
  const pixelDataOffset = headerSize + ifdSize;
  const totalSize = pixelDataOffset + rgb.length;

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  view.setUint8(0, 0x49);
  view.setUint8(1, 0x49); // little-endian "II"
  view.setUint16(2, 42, true);
  view.setUint32(4, 8, true); // IFD offset

  let off = 8;
  view.setUint16(off, numEntries, true);
  off += 2;

  const writeEntry = (tag: number, type: number, count: number, value: number) => {
    view.setUint16(off, tag, true);
    view.setUint16(off + 2, type, true);
    view.setUint32(off + 4, count, true);
    view.setUint32(off + 8, value, true);
    off += 12;
  };

  writeEntry(256, 3, 1, width); // ImageWidth
  writeEntry(257, 3, 1, height); // ImageLength
  writeEntry(258, 3, 1, 8); // BitsPerSample (only first channel stored; readers assume 8,8,8)
  writeEntry(259, 3, 1, 1); // Compression: none
  writeEntry(262, 3, 1, 2); // PhotometricInterpretation: RGB
  writeEntry(273, 4, 1, pixelDataOffset); // StripOffsets
  writeEntry(277, 3, 1, 3); // SamplesPerPixel
  writeEntry(279, 4, 1, rgb.length); // StripByteCounts

  view.setUint32(off, 0, true); // next IFD offset (none)

  new Uint8Array(buffer, pixelDataOffset).set(rgb);

  return new Blob([buffer], { type: "image/tiff" });
}

/** Compact single-frame GIF89a encoder: median-cut-ish palette + standard LZW. */
export function encodeGIF(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const pixelCount = width * height;

  // Quantize to a 256-color palette (simple uniform 6x7x6 color cube — fast, no deps).
  const palette: number[][] = [];
  const rLevels = 6;
  const gLevels = 7;
  const bLevels = 6;
  for (let r = 0; r < rLevels; r++) {
    for (let g = 0; g < gLevels; g++) {
      for (let b = 0; b < bLevels; b++) {
        palette.push([
          Math.round((r * 255) / (rLevels - 1)),
          Math.round((g * 255) / (gLevels - 1)),
          Math.round((b * 255) / (bLevels - 1)),
        ]);
      }
    }
  }
  while (palette.length < 256) palette.push([0, 0, 0]);

  const colorToIndex = (r: number, g: number, b: number) => {
    const ri = Math.min(rLevels - 1, Math.round((r / 255) * (rLevels - 1)));
    const gi = Math.min(gLevels - 1, Math.round((g / 255) * (gLevels - 1)));
    const bi = Math.min(bLevels - 1, Math.round((b / 255) * (bLevels - 1)));
    return ri * gLevels * bLevels + gi * bLevels + bi;
  };

  const indices = new Uint8Array(pixelCount);
  for (let i = 0; i < pixelCount; i++) {
    const o = i * 4;
    indices[i] = colorToIndex(data[o], data[o + 1], data[o + 2]);
  }

  const bytes: number[] = [];
  const pushStr = (s: string) => {
    for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i));
  };
  const push16 = (n: number) => {
    bytes.push(n & 0xff, (n >> 8) & 0xff);
  };

  pushStr("GIF89a");
  push16(width);
  push16(height);
  bytes.push(0xf7); // global color table, 256 entries, 8-bit color res
  bytes.push(0); // background color index
  bytes.push(0); // pixel aspect ratio

  for (const [r, g, b] of palette) bytes.push(r, g, b);

  // Image descriptor
  bytes.push(0x2c);
  push16(0);
  push16(0);
  push16(width);
  push16(height);
  bytes.push(0);

  const minCodeSize = 8;
  bytes.push(minCodeSize);

  const lzwData = lzwEncode(indices, minCodeSize);
  let p = 0;
  while (p < lzwData.length) {
    const chunk = lzwData.slice(p, p + 255);
    bytes.push(chunk.length, ...chunk);
    p += 255;
  }
  bytes.push(0); // block terminator

  bytes.push(0x3b); // trailer

  return new Blob([new Uint8Array(bytes)], { type: "image/gif" });
}

function lzwEncode(indices: Uint8Array, minCodeSize: number): number[] {
  const clearCode = 1 << minCodeSize;
  const endCode = clearCode + 1;
  let nextCode = endCode + 1;
  let codeSize = minCodeSize + 1;

  let dict = new Map<string, number>();
  const resetDict = () => {
    dict = new Map();
    for (let i = 0; i < clearCode; i++) dict.set(String(i), i);
    nextCode = endCode + 1;
    codeSize = minCodeSize + 1;
  };
  resetDict();

  const output: number[] = [];
  let bitBuffer = 0;
  let bitCount = 0;
  const emit = (code: number) => {
    bitBuffer |= code << bitCount;
    bitCount += codeSize;
    while (bitCount >= 8) {
      output.push(bitBuffer & 0xff);
      bitBuffer >>= 8;
      bitCount -= 8;
    }
  };

  emit(clearCode);
  let current = String(indices[0]);
  for (let i = 1; i < indices.length; i++) {
    const k = indices[i];
    const combined = `${current},${k}`;
    if (dict.has(combined)) {
      current = combined;
    } else {
      emit(dict.get(current)!);
      if (nextCode < 4096) {
        dict.set(combined, nextCode++);
        if (nextCode > 1 << codeSize && codeSize < 12) codeSize++;
      } else {
        emit(clearCode);
        resetDict();
      }
      current = String(k);
    }
  }
  emit(dict.get(current)!);
  emit(endCode);
  if (bitCount > 0) output.push(bitBuffer & 0xff);

  return output;
}
