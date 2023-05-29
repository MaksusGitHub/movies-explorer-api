const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { EMAIL_REG, authErrorMessage, wrongCredentialsErrorMessage } = require('../constants/constants');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return EMAIL_REG.test(v);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(authErrorMessage);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(wrongCredentialsErrorMessage);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
