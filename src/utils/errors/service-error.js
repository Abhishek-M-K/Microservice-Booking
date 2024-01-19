const { StatusCodes } = require("http-status-codes");

class ServiceError extends Error {
  constructor(
    message = "Something went wrong",
    explanation = "Unexpected error in service layer",
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    this.name = "ServiceError";
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}

module.exports = ServiceError;
