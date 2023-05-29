const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../config');
const AuthError = require('../errors/AuthError');
const { authErrorMessage } = require('../constants/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(authErrorMessage));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthError(authErrorMessage));
  }

  req.user = payload;
  return next();
};
