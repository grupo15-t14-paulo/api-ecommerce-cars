import { Router } from "express";
import {
  createCarController,
  listAllCarsController,
} from "../controllers/car.controller";
import { ensureDataIsValid } from "../middleware/ensureDataIsValid.middleware";
import { carCreateSchema } from "../schemas/cars.schema";

export const carRoutes: Router = Router();

carRoutes.post("", ensureDataIsValid(carCreateSchema), createCarController);

carRoutes.get("", listAllCarsController);
