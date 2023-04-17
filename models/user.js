const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const ForbiddenError = require('../errors/forbidden-error');
const data = require('../errors/data');
const NotFoundError = require('../errors/not-found-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: `${data.VALIDATION_ERROR_MESSAGE}`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.methods.removePassword = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => {
      console.log(user);
      if (!user) {
        return new NotFoundError();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ForbiddenError());
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
