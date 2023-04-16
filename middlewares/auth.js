const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET_DEV } = require('../config');

const SECRET = process.env.NODE_ENV !== 'production' ? JWT_SECRET_DEV : process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError());
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    return next(new UnauthorizedError());
  }
  req.user = payload;
  return next();
};
