// Remove the connected neutral checkerboard from the approved generated portrait.
const sharp = require('sharp');
const path = require('node:path');

async function main() {
  const input = process.argv[2];
  if (!input) throw new Error('Pass the approved portrait path.');
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const seen = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0, tail = 0;
  function visit(x, y) {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const index = y * width + x;
    if (seen[index]) return;
    const offset = index * 4;
    const colors = [data[offset], data[offset + 1], data[offset + 2]];
    if (Math.min(...colors) < 145 || Math.max(...colors) - Math.min(...colors) > 25) return;
    seen[index] = 1;
    queue[tail++] = index;
  }
  for (let x = 0; x < width; x++) { visit(x, 0); visit(x, height - 1); }
  for (let y = 0; y < height; y++) { visit(0, y); visit(width - 1, y); }
  while (head < tail) {
    const index = queue[head++], x = index % width, y = Math.floor(index / width);
    data[index * 4 + 3] = 0;
    visit(x - 1, y); visit(x + 1, y); visit(x, y - 1); visit(x, y + 1);
  }
  const output = path.resolve('public/rabin-short-cutout.png');
  await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(output);
  console.log({ output, transparentPixels: tail, totalPixels: width * height });
}
main().catch(error => { console.error(error); process.exitCode = 1; });
