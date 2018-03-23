import express from 'express';
import winston from 'winston';
import validator from 'express-validator';
import bodyParser from 'body-parser';
import UserRouter from './server/routes/userRoutes';
import BusinessRouter from './server/routes/businessRoutes';
import ReviewRouter from './server/routes/reviewRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use('/api/v1/auth', UserRouter);
app.use('/api/v1/business', BusinessRouter);
app.use('/api/v1/business', ReviewRouter);


app.get('/', (req, res) => {
  res.status(200).send('Welcome to WEconnect Api');
});

const port = process.env.PORT || 5500;

app.listen(port, () => {
  winston.info(`Connected on port ${port}`);
});

export default app;

