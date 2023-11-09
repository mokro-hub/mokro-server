import { Request, Response, NextFunction } from "express";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const headerKey = req.headers["admin-key"];
  const envKey = process.env.ADMIN_KEY;

  if (headerKey === envKey) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
