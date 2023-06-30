const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// const cors = require('cors');

const { PORT, DB } = require('./config');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
// const { NOT_FOUND_ERROR_MESSAGE, CORS_OPTIONS } = require('./constants/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');

const app = express();

mongoose.connect(DB);

const allowedCors = [
  'https://maksus.movies-explorer.nomoredomains.rocks',
  'http://maksus.movies-explorer.nomoredomains.rocks',
  'http://localhost:3001',
];

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
});

// app.use(cors(CORS_OPTIONS));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(helmet());
app.use(limiter);

app.use('/', router);

app.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
