// Hook up all the middleware that is necessary for every environment.
import * as express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

export const config = (app: express.Express) => {
  // ALL
  const CORS_CONFIG = {
    origin: "*",
  };

  app.use(cors(CORS_CONFIG));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // PRODUCTION
  if (process.env.NODE_ENV === "production") {
    app.use(helmet());
    app.use(compression());
  }

  // PRODUCTION, DEVELOPMENT
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development"
  ) {
    app.use(morgan(process.env.MORGAN_FORMAT));
  }
};
