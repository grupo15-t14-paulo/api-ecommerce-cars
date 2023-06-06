import { Router } from "express";
import {
  createCarController,
  deleteCarController,
  listAllCarsController,
  updateCarController,
} from "../controllers/cars.controllers";
import { ensureDataIsValid } from "../middleware/ensureDataIsValid.middleware";
import { carCreateSchema, carUpdateSchema } from "../schemas/cars.schema";
import { verifyCarExists } from "../middleware/cars/verifyCarExists.middleware";

export const carRoutes: Router = Router();

carRoutes.post("", ensureDataIsValid(carCreateSchema), createCarController);
carRoutes.get("", listAllCarsController);
carRoutes.patch(
  "/:id",
  verifyCarExists,
  ensureDataIsValid(carUpdateSchema),
  updateCarController
);
carRoutes.delete("/:id", verifyCarExists, deleteCarController);
