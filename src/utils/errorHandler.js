class ErrorHandler {
    constructor(status, message, description, error) {
        return {
            status: status,
            message: message,
            errDescription: description,
            error: error
        }
    }
}

module.exports.ErrorHandler = ErrorHandler;