import express from 'express';
import winston from 'winston';
import validator from 'express-validator';
import bodyParser from 'body-parser';
import UserDummyRouter from './dummyServer/routes/UserRoutes';
import BusinessDummyRouter from './dummyServer/routes/BusinessRoutes';
import UsersRouter from './server/routes/userRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

if (process.env.NODE_ENV === 'development') {
  app.use('/api/v1/auth', UsersRouter);
} else {
  app.use('/api/v1/auth', UserDummyRouter);
  app.use('/api/v1/business', BusinessDummyRouter);
}

app.get('/', (req, res) => {
  res.status(200).send('testing out Mock-data');
});

const port = process.env.PORT || 5500;

app.listen(port, () => {
  winston.info(`Connected on port ${port}`);
});

export default app;
