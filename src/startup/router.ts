import * as express from "express";
import { router as ping } from "../routes/ping";

export const config = (app: express.Express) => {
  // Register routes
  app.use(ping);
};
