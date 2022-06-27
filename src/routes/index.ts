import { Router, Request, Response } from 'express';
import imagesRoutes from './api/images-router';

const routes = Router();

routes.use('/api/images', imagesRoutes);

routes.get('/', (req: Request, res: Response) => {
    res.send(
        '<h1 style="text-align:center; color:blue"> Welcome to Image Processing API Project </h1>'
    );
});

export default routes;
