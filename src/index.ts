import express from 'express';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import routes from './routes';

const app = express();
const port = 3000;

app.use('/api', routes);

app.get('/', (req, res) => {
  res.status(200).send('<h2>Server is running.</h2>');
});

// start the Express server
app.listen(port, (): void => {
  // make sure that path exists
  const imageLocation = path.resolve(__dirname, '../assets/thumb');

  if (!existsSync(imageLocation)) {
    // if image does not exist, then make directory
    mkdirSync(imageLocation);
  }

  console.log(`Server started at http://localhost:${port}`);
});

export default app;