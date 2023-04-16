const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const data = require('../errors/data');

const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', auth, getMovies);

// создаёт фильм с переданными в теле
router.post('/', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(data.REG_EXP_URL),
    trailerLink: Joi.string().required().regex(data.REG_EXP_URL),
    nameRu: Joi.string().required(),
    nameEn: Joi.string().required(),
    thumbnail: Joi.string().required().regex(data.REG_EXP_URL),
    movieId: Joi.string().required().regex(data.REG_EXP_OID),
  }),
}), addMovie);

// удаляет сохранённый фильм по id
router.delete('/:_id', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().regex(data.REG_EXP_OID),
  }),
}), deleteMovie);

module.exports = router;
