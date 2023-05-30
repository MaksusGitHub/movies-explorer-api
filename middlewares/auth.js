const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../config');
const AuthError = require('../errors/AuthError');
const { AUTH_ERROR_MESSAGE } = require('../constants/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError(AUTH_ERROR_MESSAGE));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthError(AUTH_ERROR_MESSAGE));
  }

  req.user = payload;
  return next();
};
