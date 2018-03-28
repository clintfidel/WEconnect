import express from 'express';
import winston from 'winston';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import path from 'path';
import validator from 'express-validator';
import bodyParser from 'body-parser';
import webpackConfig from './webpack.config.dev';
import UserRouter from './server/routes/userRoutes';
import BusinessRouter from './server/routes/businessRoutes';
import ReviewRouter from './server/routes/reviewRoutes';

const app = express();
if (process.env.NODE_ENV !== 'production') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
}
app.use(express.static(path.join(__dirname, './client/public/images')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use('/api/v1/auth', UserRouter);
app.use('/api/v1/businesses', BusinessRouter);
app.use('/api/v1/businesses', ReviewRouter);


app.get('/', (req, res) => {
  res.status(200).send('Welcome to WEconnect Api');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

const port = process.env.PORT || 5600;

app.listen(port, () => {
  winston.info(`Connected on port ${port}`);
});

export default app;
