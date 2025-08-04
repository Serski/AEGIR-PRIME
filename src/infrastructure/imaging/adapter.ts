import type sharpType from 'sharp';

export interface ImagingClient {
  resize(image: Buffer, width: number, height: number): Promise<Buffer>;
  crop(
    image: Buffer,
    width: number,
    height: number,
    left?: number,
    top?: number,
  ): Promise<Buffer>;
  convertFormat(
    image: Buffer,
    format: 'jpeg' | 'png' | 'webp' | 'gif' | 'tiff' | 'avif',
  ): Promise<Buffer>;
}

export const IMAGING_CLIENT = 'ImagingClient';

/**
 * Thin wrapper around the `sharp` imaging library providing a minimal
 * asynchronous API for common transformations. Each operation accepts a
 * `Buffer` with image data and returns a new `Buffer` with the transformation
 * applied.
 */
export class ImagingAdapter implements ImagingClient {
  private readonly sharpInstance = import('sharp').then((m) => m.default as typeof sharpType);

  private async sharp() {
    return this.sharpInstance;
  }

  /**
    * Resize an image to the provided dimensions.
    */
  async resize(image: Buffer, width: number, height: number): Promise<Buffer> {
    const sharp = await this.sharp();
    return sharp(image).resize(width, height).toBuffer();
  }

  /**
   * Crop a region of the image defined by width, height and optional offsets.
   */
  async crop(
    image: Buffer,
    width: number,
    height: number,
    left = 0,
    top = 0,
  ): Promise<Buffer> {
    const sharp = await this.sharp();
    return sharp(image).extract({ width, height, left, top }).toBuffer();
  }

  /**
   * Convert an image to another format such as `png` or `jpeg`.
   */
  async convertFormat(
    image: Buffer,
    format: 'jpeg' | 'png' | 'webp' | 'gif' | 'tiff' | 'avif',
  ): Promise<Buffer> {
    const sharp = await this.sharp();
    return sharp(image).toFormat(format).toBuffer();
  }
}

