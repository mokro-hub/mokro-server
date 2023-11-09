import { Request, Response, Router } from "express";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(`Running in ${process.env.NODE_ENV} mode.`);
});
