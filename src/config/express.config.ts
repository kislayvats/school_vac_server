import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from ".";
import router from "../routes";
import HttpStatus from "http-status-codes";
export default (app: express.Application) => {
  app.use(morgan("dev"));
  app.use(cors({ path: "*" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(`/${config.version.appMode}`, router);
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const {
        statusCode = HttpStatus.BAD_REQUEST,
        message = "Bad Request!!!",
      } = err;
      res.status(statusCode).json({ message, success: false });
    }
  );
};
