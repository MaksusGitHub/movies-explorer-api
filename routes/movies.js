const moviesRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// TODO: Настроить Joi Валидацию

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovie);
moviesRouter.delete('/:id', deleteMovie);

module.exports = moviesRouter;
