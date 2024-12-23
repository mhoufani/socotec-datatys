import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

import morganMiddleware from './middlewares/logger.mjs';
import headerMiddleware from './middlewares/header.mjs';
import healthcheckRoute from './routes/healthcheck/index.mjs';
import userRoute from './routes/user/index.mjs';

const port = process.env.APP_PORT || 3002;

const upload = multer();
const app = express();

app.use(headerMiddleware);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// for parsing multipart/form-data
app.use(upload.array());

app.use(morganMiddleware);
app.use(healthcheckRoute);

app.use('/api', userRoute);

app.use('*', (req, res) => {
  res.status(404).send('Not Found').end();
});

const server = app.listen(port, () => {
  console.log(`Datatys App running on port ${port}.`);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received.');

  // Stops new server connections and finishes existing.
  server.close((err) => {
    console.log('Server connections closed');

    if (err) {
      console.error('Server connections closing error', err);
      process.exit(1);
    }

    process.exit(0);
  });
});
