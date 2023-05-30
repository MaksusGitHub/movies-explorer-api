const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { PORT, DB } = require('./config');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const { NOT_FOUND_ERROR_MESSAGE } = require('./constants/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');

const app = express();

mongoose.connect(DB);

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
