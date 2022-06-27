import { Router, Request, Response } from 'express';
import { existsSync, readFile } from 'fs';
import path from 'path';
import resizeImage from '../../utilities/image-processing';

const imagesRoutes = Router();

imagesRoutes.get('/', (req: Request, res: Response): void => {
    const name = req.query.name as string;
    const width = parseInt(req.query.width as string, 10);
    const height = parseInt(req.query.height as string, 10);

    const imgLocation =
        path.resolve('./') + `/assets/images/original/${name}.jpg`;
    const resizedImgLocation =
        path.resolve('./') +
        `/assets/images/resized/${name}_${width}X${height}.jpg`;

    // check query synatx & image location
    checkImage(imgLocation, name, width, height, res);

    const imageAvailabilty = existsSync(resizedImgLocation);

    // check if resized image was already created
    if (imageAvailabilty) {
        readFile(resizedImgLocation, (_err, _) => {
            try {
                res.status(200).sendFile(resizedImgLocation);
            } catch (err) {
                console.log(`error ${err} in resized image `);
                res.status(500).send(
                    'An error has occured while processing image'
                );
            }
        });
    } else {
        // if file not available, then resize:

        resizeImage(width, height, imgLocation, resizedImgLocation).then(() => {
            try {
                res.status(200).sendFile(resizedImgLocation);
            } catch (err) {
                console.log(`error ${err} in resized image `);
                res.status(500).send(
                    'An error has occured while processing image'
                );
            }
        });
    }
});

// check validity of image
const checkImage = async (
    location: string,
    name: string,
    width: number,
    height: number,
    res: Response
) => {
    if (existsSync(location) === false) {
        return res
            .status(404)
            .send(
                '<p style="font-size:18; color:red"> Invalid request, image provided does not exist! </p>'
            );
    } else if (name && width && height === undefined) {
        return res
            .status(404)
            .send(
                ' <p style="font-size:18; color:red"> A valid image name, width and height must be entered. Try again </p>'
            );
    } else if (name === undefined) {
        return res
            .status(400)
            .send(
                ' <p style="font-size:18; color:red"> Invalid request, Please enter an image name </p>'
            );
    } else if (!width || width < 1) {
        return res
            .status(404)
            .send(
                '<p style="font-size:18; color:red"> Invalid request, Please enter an image width value greater than 1. </p>'
            );
    } else if (!height || height < 1) {
        return res
            .status(404)
            .send(
                '<p style="font-size:18; color:red"> Invalid request, Please enter an image height value greater than 1 </p>'
            );
    } else {
        return 'Correct image data have been entered';
    }
};

export default imagesRoutes;
