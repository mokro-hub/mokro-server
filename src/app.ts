import express from "express";
import { config as envConfig } from "./startup/env";
import { config as middlewareConfig } from "./startup/middleware";
import { config as routerConfig } from "./startup/router";
import { connect as dbConnect } from "./startup/db";

const app = express();
const port = process.env.PORT || 3000;

// Load startup configs
envConfig();
middlewareConfig(app);
routerConfig(app);
dbConnect();

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
