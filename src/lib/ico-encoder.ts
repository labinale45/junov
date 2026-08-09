/**
 * Hand-rolled .ico encoder. Modern ICO files may embed PNG-encoded image data
 * directly inside each ICONDIRENTRY (no legacy BMP-in-ICO bit twiddling needed) —
 * every current OS and browser accepts PNG-in-ICO. This builds that structure
 * manually since no ICO-encoding library is installed.
 *
 * File layout:
 *  - 6-byte ICONDIR header: reserved(u16)=0, type(u16)=1, count(u16)=N
 *  - N x 16-byte ICONDIRENTRY records
 *  - N raw PNG byte blobs, concatenated in order
 */

export interface IcoSourceImage {
  size: number;
  data: ArrayBuffer;
}

export function buildIco(pngBuffers: IcoSourceImage[]): Blob {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  const dirSize = headerSize + entrySize * count;

  const totalSize = dirSize + pngBuffers.reduce((sum, img) => sum + img.data.byteLength, 0);

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);

  // ICONDIR header
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: 1 = icon
  view.setUint16(4, count, true); // image count

  let entryOffset = headerSize;
  let dataOffset = dirSize;

  for (const img of pngBuffers) {
    const dim = img.size >= 256 ? 0 : img.size; // 0 means 256px per the ICO spec

    view.setUint8(entryOffset, dim); // width
    view.setUint8(entryOffset + 1, dim); // height
    view.setUint8(entryOffset + 2, 0); // color count (0 = no palette)
    view.setUint8(entryOffset + 3, 0); // reserved
    view.setUint16(entryOffset + 4, 1, true); // color planes
    view.setUint16(entryOffset + 6, 32, true); // bits per pixel
    view.setUint32(entryOffset + 8, img.data.byteLength, true); // bytes in resource
    view.setUint32(entryOffset + 12, dataOffset, true); // offset to image data

    new Uint8Array(buffer, dataOffset, img.data.byteLength).set(new Uint8Array(img.data));

    entryOffset += entrySize;
    dataOffset += img.data.byteLength;
  }

  return new Blob([buffer], { type: "image/x-icon" });
}
