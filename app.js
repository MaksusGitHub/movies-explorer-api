const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { PORT, DB } = require('./config');
const router = require('./routes');
const { createUser, login, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const { EMAIL_REG, notFoundErrorMessage } = require('./constants/constants');
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

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(EMAIL_REG),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_REG),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signout', logout);

app.use(auth);

app.use('/', router);

app.use((req, res, next) => {
  next(new NotFoundError(notFoundErrorMessage));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
