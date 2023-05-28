const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Error('Ошибка')); // TODO: Обработка ошибки
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Error('Ошибка')); // TODO: Обработка ошибки
  }

  req.user = payload;
  return next();
};
