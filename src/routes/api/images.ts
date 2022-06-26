import { Router, Request, Response } from 'express';
import { existsSync, writeFile, readFile, fstat } from 'fs';
import path from 'path';
import resizeImage from '../../image-processing';

const imagesRoutes = Router();

imagesRoutes.get('/', async (req: Request, res: Response) => {
  const imageName = req.query.imageName as string;
  const imageWidth = parseInt(req.query.imageWidth as string);
  const imageHeight = parseInt(req.query.imageHeight as string);

  const imgLocation =
    path.resolve('./') + `/assets/images/original${imageName}.jpg`;
  const resizedImgLocation =
    path.resolve('./') +
    `/assets/images/resized${imageName}_${imageWidth}X${imageHeight}.jpg`;

  // check query synatx
  checkImage(imageName, imageWidth, imageHeight, res);

  // check if file exists in assets folder
  checkExistence(imgLocation, res);

  // check if resized image was already created
  if (await checkExistence(resizedImgLocation, res)) {
    readFile(resizedImgLocation, (_err, bufferedData) => {
      try {
        res.status(200).send(bufferedData);
      } catch (err) {
        console.log(`error ${err} in resized image `);
        res.status(500).send('An error has occured while processing image');
      }
    });
  } else {
    // if file not available, then resize,
    resizeImage(
      imageWidth,
      imageHeight,
      imgLocation,
      resizedImgLocation,
      (_err, bufferedData) => {
        try {
          res.status(200).send(bufferedData);
        } catch (err) {
          console.log(`error ${err} in resized image `);
          res.status(500).send('An error has occured while processing image');
        }
      }
    );
  }
});

// check validity of image
const checkImage = async (
  name: string,
  width: number,
  height: number,
  res: Response
) => {
  if (name ==="") {
    return res.status(400).send('Invalid request, Please enter an image name');
  } else if (width === null || width < 1) {
    return res
      .status(400)
      .send(
        'Invalid request, Please enter an image width value greater than 1'
      );
  } else if (height === null || height < 1) {
    return res
      .status(400)
      .send(
        'Invalid request, Please enter an image height value greater than 1'
      );
  } else {
    return 'Correct image dimensions have been entered.';
  }
};
// check existence of image
async function checkExistence(location: string, res: Response) {
  if (existsSync(location) === false) {
    return res
      .status(404)
      .send('Invalid request, image provided does not exist!');
  }
  return null;
  //   res.sendFile(location);
}

export default imagesRoutes;
