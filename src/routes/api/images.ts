import { Router, Request, Response } from 'express';
import { existsSync, writeFile, readFile, fstat } from 'fs';
import path from 'path';
import resizeImage from '../../image-processing';

const imagesRoutes = Router();

imagesRoutes.get('/api/images', async (req: Request, res: Response) => {
  const name = req.query.name as string;
  const width = parseInt(req.query.width as string, 10);
  const height = parseInt(req.query.height as string, 10);

  if (name === undefined) {
    return res
      .status(400)
      .send('Bad request, query parameter (name) is required.');
  }

  const imgLocation =
    path.resolve('./') + `/assets/images/original${name}.jpg`;
  const resizedImgLocation =
    path.resolve('./') +
    `/assets/images/resized${name}_${width}X${height}.jpg`;


  // check query synatx
  checkImage(name, width, height, res);

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
      width,
      height,
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
  if (name === undefined) {
    return res.status(400).send('Invalid request, Please enter an image name');
  } else if (!width || width < 1) {
    return res
      .status(404)
      .send(
        'Invalid request, Please enter an image width value greater than 1'
      );
  } else if (!height || height < 1) {
    return res
      .status(404)
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
