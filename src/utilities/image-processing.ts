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
    resizedImage: string
) => {
    try {
        await sharp(oldImage)
            .resize(width, height)
            .toFormat('jpg')
            .toFile(resizedImage);
        return resizeImage;
    } catch (err) {
        return 'Image could be be processed. Please try again';
    }
};

export default resizeImage;
