import { Model, Schema, model } from "mongoose";

export enum UnitType {
  Waterman = "waterman",
  Watchdog = "watchdog",
}

// === Object interface ===
interface IUnit {
  productKey: string;
  secret: string;
  activated: boolean;
  unitType: UnitType;
}

interface IUnitMethods {
  create(): Promise<IUnit>;
}

interface UnitModel extends Model<IUnit, object, IUnitMethods> {
  getAll(): Promise<IUnit[]>;
  deleteByKey(key: string): Promise<void>;
}
// === Object interface ===

/// === Implementation ===
const schema = new Schema<IUnit, UnitModel, IUnitMethods>({
  productKey: { type: String, required: true, unique: true },
  secret: {
    type: String,
    required: true,
    default: () => {
      let secret = "";
      for (let i = 0; i < 4; i++)
        secret += Math.random().toString(36).substring(2, 15);
      return secret;
    },
  },
  activated: { type: Boolean, required: true, default: false },
  unitType: { type: String, enum: UnitType, required: true },
});

schema.static("getAll", async function getAll() {
  return await this.find();
});

schema.static("deleteByKey", async function deleteByKey(productKey: string) {
  await this.deleteOne({ productKey });
});

schema.method("create", async function create() {
  const productionUnit = await this.save();
  return productionUnit;
});
/// === Implementation ===

export const ProductionUnit = model<IUnit, UnitModel>("ProductionUnit", schema);
