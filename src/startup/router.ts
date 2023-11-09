import * as express from "express";
import { router as ping } from "../routes/ping";
import { router as units } from "../routes/units";

export const config = (app: express.Express) => {
  // Register routes
  app.use("/ping", ping);
  app.use("/units", units);
};
