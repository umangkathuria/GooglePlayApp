class ErrorHandler {
  constructor(status, message, description, error) {
    return {
      status,
      message,
      errDescription: description,
      error,
    };
  }
}

module.exports.ErrorHandler = ErrorHandler;
