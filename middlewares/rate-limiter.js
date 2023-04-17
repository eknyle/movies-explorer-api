const rateLimit = require('express-rate-limit');
const data = require('../errors/data');

module.exports = (req, res, next) => {
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: data.RATE_LIMITER_MASSAGE,
  });
  return next();
};
