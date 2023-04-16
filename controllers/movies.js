const mongoose = require('mongoose');
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');

// возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: { $eq: req.user._id } })
    .populate(['owner'])
    .then((data) => res.send(data))
    .catch(next);
};

// создаёт фильм с переданными в теле country, director, duration, year, description, image,
// trailer, nameRU, nameEN и thumbnail, movieId
module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRu, nameEn, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRu,
    nameEn,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError());
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((movie_) => {
      if (movie_.owner._id.toString() === req.user._id) {
        Movie.findByIdAndRemove(movie_._id)
          .orFail(() => {
            throw new NotFoundError();
          })
          .then((movie) => res.send(movie))
          .catch((err) => {
            if (err instanceof mongoose.Error.CastError) {
              return next(new NotFoundError());
            }
            return next();
          });
      } else {
        return next(new ForbiddenError());
      }
      return true;
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new NotFoundError());
      }
      return next(err);
    });
};
