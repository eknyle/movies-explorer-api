class TooManyRequestsError extends Error {
  constructor() {
    super();
    this.message = 'Слишком много запросов';
    this.name = 'TooManyRequests';
    this.status = 429;
    this.statusCode = 429;
  }
}

module.exports = TooManyRequestsError;
