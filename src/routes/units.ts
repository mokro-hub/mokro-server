import { Request, Response, Router } from "express";
import { adminAuth } from "../middleware/adminAuth";
import { ProductionUnit } from "../models/unit";

export const router = Router();

router.get("/", [adminAuth], async (req: Request, res: Response) => {
  const productionUnits = await ProductionUnit.getAll();
  res.send(productionUnits);
});

router.post("/register", [adminAuth], async (req: Request, res: Response) => {
  const productionUnit = new ProductionUnit(req.body);

  try {
    await productionUnit.create();
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  res.send(productionUnit);
});

router.delete("/:productKey", [adminAuth], async (req: Request, res: Response) => {
  try {
    await ProductionUnit.deleteByKey(req.params.productKey);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  res.send();
});
