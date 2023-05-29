const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { NODE_ENV, JWT_SECRET } = require('../config');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Некорректный формат входных данных'));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id).orFail(new NotFoundError('Пользователя с таким ID нет'))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundError('Пользователя с таким ID нет'))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Некорректный формат входных данных'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  login,
};
