const User = require('../models/user');

const getUser = (req, res, next) => {
  User.findById(req.params._id).orFail() // TODO: Прописать ошибку
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
  ).orFail() // TODO: Добавить ошибку
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch(next); // TODO: Обработать ошибку валидации
};

module.exports = {
  getUser,
  updateUser,
};
