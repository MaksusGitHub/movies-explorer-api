const URL_REG = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const EMAIL_REG = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/;

const AUTH_ERROR_MESSAGE = 'Необходима авторизация';
const WRONG_CREDENTIALS_ERROR_MESSAGE = 'Неправильные почта или пароль';
const NOT_FOUND_USER_ERROR_MESSAGE = 'Пользователя с таким ID нет';
const NOT_FOUND_MOVIE_ERROR_MESSAGE = 'Фильма с таким ID нет';
const CONFLICT_ERROR_MESSAGE = 'Пользователь с таким email уже существует';
const VALIDATION_ERROR_MESSAGE = 'Некорректный формат входных данных';
const ACCESS_RIGHTS_MOVIES_ERROR_MESSAGE = 'Нет доступа к этому фильму';
const NOT_FOUND_ERROR_MESSAGE = 'Страница не найдена';
const LOGOUT_MESSAGE = 'Выход успешно выполнен';

module.exports = {
  URL_REG,
  EMAIL_REG,
  AUTH_ERROR_MESSAGE,
  WRONG_CREDENTIALS_ERROR_MESSAGE,
  NOT_FOUND_USER_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  ACCESS_RIGHTS_MOVIES_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  LOGOUT_MESSAGE,
};
