import logger from "../config/logger.js";

const requestLogger = (req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = (seconds * 1e3 + nanoseconds / 1e6).toFixed(2);

    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration} ms`
    );
  });

  next();
};

export default requestLogger;
