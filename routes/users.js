const usersRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

// TODO: Настроить Joi Валидацию

usersRouter.get('/me', getUser);
usersRouter.patch('/me', updateUser);

module.exports = usersRouter;
