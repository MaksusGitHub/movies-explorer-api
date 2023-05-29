const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { URL_REG } = require('../constants/constants');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_REG),
    trailerLink: Joi.string().required().pattern(URL_REG),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(URL_REG),
    movieId: Joi.number().required(),
  }),
}), createMovie);
moviesRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = moviesRouter;
