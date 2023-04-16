const mongoose = require('mongoose');
const data = require('../errors/data');

const movieSchema = new mongoose.Schema({
  nameRu: {
    type: String,
    required: true,
    minlength: 1,
  },
  nameEn: {
    type: String,
    required: true,
    minlength: 1,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 4,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line
        return /https?\:\/\/(www\.)?[\w\-\.\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{1,256}\.[a-zA-Zа-яА-Я]{1,6}#?[\w\-\.\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{1,256}/gi.test(v);
      },
      message: `${data.VALIDATION_ERROR_MESSAGE}`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line
        return /https?\:\/\/(www\.)?[\w\-\.\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{1,256}\.[a-zA-Zа-яА-Я]{1,6}#?[\w\-\.\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{1,256}/gi.test(v);
      },
      message: `${data.VALIDATION_ERROR_MESSAGE}`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line
        return /https?\:\/\/(www\.)?[\w\-\.\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{1,256}\.[a-zA-Zа-яА-Я]{1,6}#?[\w\-\.\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{1,256}/gi.test(v);
      },
      message: `${data.VALIDATION_ERROR_MESSAGE}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    minlength: 2,
  },
});

module.exports = mongoose.model('movie', movieSchema);
