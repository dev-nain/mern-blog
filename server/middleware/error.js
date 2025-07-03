import ApiError from "../utils/api-error.js";
import { Error } from "mongoose";
import httpStatus from "http-status";
import logger from "../config/logger.js";

const converter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = getStatusCode(error);
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, err.stack);
  }
  next(error);
};

function getStatusCode(error) {
  return error.statusCode || error instanceof Error
    ? httpStatus.BAD_REQUEST
    : httpStatus.INTERNAL_SERVER_ERROR;
}

const handler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    stack: err.stack, //TODO: Add it only for development
  };

  //TODO: Add it only for development
  logger.error(err);

  res.status(statusCode).send(response);
};

function notFound(req, res, next) {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
}

export default { converter, handler, notFound };
