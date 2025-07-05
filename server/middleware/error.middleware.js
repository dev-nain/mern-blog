import ApiError from "../utils/api-error.js";
import { Error as MongooseError } from "mongoose";
import { ZodError } from "zod";
import httpStatus from "http-status";
import logger from "../config/logger.js";

const handler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "development";

  let statusCode, errors;

  // Handle known error types directly
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errors = err.message;
  } else if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    errors = err.flatten().fieldErrors;
  } else if (err instanceof MongooseError.ValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errors = Object.fromEntries(
      Object.entries(err.errors).map(([field, error]) => [field, error.message])
    );
  } else if (err instanceof MongooseError.CastError) {
    statusCode = httpStatus.BAD_REQUEST;
    errors = { [err.path]: `Invalid value: ${err.value}` };
  } else if (err.code === 11000) {
    statusCode = httpStatus.CONFLICT;
    const field = Object.keys(err.keyValue)[0];
    errors = { [field]: `${field} already exists` };
  } else {
    // Unknown errors
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    errors = { general: err.message || "Something went wrong" };
  }

  logger.debug(err);

  const response = {
    code: statusCode,
    ...(typeof errors === "string" ? { message: errors } : { errors }),
    ...(isDev && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};

const notFound = (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, { general: "Not found" }));
};

export default { handler, notFound };
