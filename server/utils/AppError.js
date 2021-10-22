class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // https://v8.dev/docs/stack-trace-api
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
