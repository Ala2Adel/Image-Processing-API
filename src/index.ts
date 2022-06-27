import express, { Response, Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use(routes);

app.get('/', (req: Request, res: Response): void => {
    res.status(200).send('<h2>Server is running.</h2>');
});

// start the Express server
app.listen(port, (): void => {
    // make sure that path exists
    const imageLocation = path.resolve(__dirname, '../assets/images/resized');

    if (!existsSync(imageLocation)) {
        // if image does not exist, then make directory
        mkdirSync(imageLocation);
    }

    console.log(`Server started at http://localhost:${port}`);
});

export default app;
