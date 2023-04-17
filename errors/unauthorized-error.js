class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = 'Отказано в доступе. Неправильный email и/или пароль';
    this.name = 'Unauthorized';
    this.status = 401;
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
