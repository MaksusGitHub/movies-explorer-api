const mongoose = require('mongoose');

const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const AccessRightsError = require('../errors/AccessRightsError');
const { validationErrorMessage, notFoundMovieErrorMessage, AccessRightsMovieErrorMessage } = require('../constants/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((allMovies) => res.send(allMovies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      movie.populate(['owner'])
        .then(() => res.send({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image,
          trailerLink: movie.trailer,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          thumbnail: movie.thumbnail,
          movieId: movie.movieId,
          owner: movie.owner,
        }))
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(validationErrorMessage));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id).orFail(new NotFoundError(notFoundMovieErrorMessage))
    .then((movie) => {
      if (String(movie.owner._id) !== req.user._id) {
        throw new AccessRightsError();
      }
      return movie.deleteOne();
    })
    .then((deletedMovie) => {
      res.send(deletedMovie);
    })
    .catch((err) => {
      if (err instanceof AccessRightsError) {
        next(new AccessRightsError(AccessRightsMovieErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
