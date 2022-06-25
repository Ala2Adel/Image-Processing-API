import { Router, Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';

/**
 * sharp(inputBuffer)
  .resize(320, 240)
  .toFile('output.webp', (err, info) => { ... });
 * 
 */

const resizeImage = async (
  width: number,
  height: number,
  oldImage: string,
  resizedImage: string,
  callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void
) => {
  try {
    await sharp(oldImage).resize(width, height).toFile(resizedImage);
  } catch (err) {
    return 'Image could be be processed';
  }
};

export default resizeImage;
