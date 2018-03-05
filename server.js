import express from 'express';
import winston from 'winston';
import validator from 'express-validator';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

// app.use();
// app.use();

app.get('/', (req, res) => {
  res.send('testing out Mock-data');
});

const port = process.env.PORT || 5500;

app.listen(port, () => {
  winston.info(`Connected on port ${port}`);
});
