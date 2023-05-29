const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const { EMAIL_REG } = require('../constants/constants');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_REG),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = usersRouter;
