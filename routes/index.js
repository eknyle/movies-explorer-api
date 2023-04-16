const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const { login, createUser } = require('../controllers/users');

router.use(requestLogger); // подключаем логгер запросов

// проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), login);

// создаёт пользователя с переданными в теле email, password и name
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use(errorLogger);

router.use(auth, (req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
