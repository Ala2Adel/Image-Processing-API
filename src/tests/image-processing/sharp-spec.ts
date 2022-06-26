
import path from 'path';
import supertest from 'supertest';
import app from '../../index';
import resizeImage from '../../utilities/image-processing';

// const request = supertest(app);

const imgLocation =
    path.resolve('./') + `/assets/images/original/fjord.jpg`;
const resizedImgLocation =
    path.resolve('./') +
    `/assets/images/resized/fjord_100X150.jpg`;

describe('Testing sharp function', (): void => {
    it('returns a file when image successfully resized', async () => {
        const resizedImage: unknown = await resizeImage(
            100,
            150,
            imgLocation,
            resizedImgLocation,
        );
        expect(resizedImage).toBeDefined();
    });
});