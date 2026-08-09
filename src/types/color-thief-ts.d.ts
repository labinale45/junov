declare module "color-thief-ts" {
  type ColorArray = [number, number, number];
  type ColorType = "array" | "hex";
  interface PaletteOptions<T extends ColorType = ColorType> {
    quality?: number;
    colorType?: T;
  }

  export default class ColorThief {
    constructor(opts?: { crossOrigin: boolean });
    getPalette(sourceImage: HTMLImageElement, colorCount: number, opts?: PaletteOptions<"array">): ColorArray[];
    getPalette(sourceImage: HTMLImageElement, colorCount: number, opts?: PaletteOptions<"hex">): string[];
    getColor(sourceImage: HTMLImageElement, opts?: PaletteOptions<"array">): ColorArray;
    getColor(sourceImage: HTMLImageElement, opts?: PaletteOptions<"hex">): string;
    getPaletteAsync(imageUrl: string, colorCount: number, opts?: PaletteOptions<"array">): Promise<ColorArray[]>;
    getPaletteAsync(imageUrl: string, colorCount: number, opts?: PaletteOptions<"hex">): Promise<string[]>;
    getColorAsync(imageUrl: string, opts?: PaletteOptions<"array">): Promise<ColorArray>;
    getColorAsync(imageUrl: string, opts?: PaletteOptions<"hex">): Promise<string>;
  }
}
