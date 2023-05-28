const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({ 'owner._id': req.params._id }).orFail() // TODO: Прописать ошибку
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
    .catch(next); // TODO: Проверить на валидацию
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id).orFail() // TODO: Ошибка
    .then((movie) => {
      if (String(movie.owner._id) !== req.user._id) {
        // TODO: Проверка доступа к карточке её владельца
      }
      return movie.deleteOne();
    })
    .then((deletedMovie) => {
      res.send(deletedMovie);
    })
    .catch(next); // TODO: Обработка ошибки на права доступа
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
