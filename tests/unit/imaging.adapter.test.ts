import { describe, it, expect } from 'vitest';
import sharp from 'sharp';
import { ImagingAdapter } from '../../src/infrastructure/imaging/adapter';

async function createTestImage() {
  return sharp({
    create: {
      width: 100,
      height: 100,
      channels: 3,
      background: { r: 255, g: 0, b: 0 },
    },
  })
    .png()
    .toBuffer();
}

describe('ImagingAdapter', () => {
  const adapter = new ImagingAdapter();

  it('resizes images', async () => {
    const input = await createTestImage();
    const output = await adapter.resize(input, 50, 50);
    const meta = await sharp(output).metadata();
    expect(meta.width).toBe(50);
    expect(meta.height).toBe(50);
  });

  it('crops images', async () => {
    const input = await createTestImage();
    const output = await adapter.crop(input, 40, 40, 10, 10);
    const meta = await sharp(output).metadata();
    expect(meta.width).toBe(40);
    expect(meta.height).toBe(40);
  });

  it('converts image format', async () => {
    const input = await createTestImage();
    const output = await adapter.convertFormat(input, 'jpeg');
    const meta = await sharp(output).metadata();
    expect(meta.format).toBe('jpeg');
  });
});
