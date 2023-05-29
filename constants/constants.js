const URL_REG = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const EMAIL_REG = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/;

const authErrorMessage = 'Необходима авторизация';
const wrongCredentialsErrorMessage = 'Неправильные почта или пароль';
const notFoundUserErrorMessage = 'Пользователя с таким ID нет';
const notFoundMovieErrorMessage = 'Фильма с таким ID нет';
const conflictErrorMessage = 'Пользователь с таким email уже существует';
const validationErrorMessage = 'Некорректный формат входных данных';
const AccessRightsMovieErrorMessage = 'Нет доступа к этому фильму';
const notFoundErrorMessage = 'Страница не найдена';

module.exports = {
  URL_REG,
  EMAIL_REG,
  authErrorMessage,
  wrongCredentialsErrorMessage,
  notFoundUserErrorMessage,
  notFoundMovieErrorMessage,
  conflictErrorMessage,
  validationErrorMessage,
  AccessRightsMovieErrorMessage,
  notFoundErrorMessage,
};
