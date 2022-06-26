import { Router, Request, Response } from 'express';
import imagesRoutes from './api/images';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('<h1 style="text-align:center; color:blue"> Welcome to Image Processing API Project </h1>');
});

routes.use('/images', imagesRoutes);

export default routes;
