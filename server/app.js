import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import error from "./middleware/error.middleware.js";
import logger from "./middleware/logger.middleware.js";
import config from "./config/config.js";
import { connectDB } from "./utils/db.js";
import router from "./routes/v1/index.js";

connectDB();

const app = express();
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/", router);
app.use(error.notFound);
app.use(error.handler);

app.listen(config.port, () => {
  console.log(
    `App running on: http://localhost:${config.port} - ${process.env.NODE_ENV}`
  );
});
