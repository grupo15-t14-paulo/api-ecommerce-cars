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
import { ensureIsSeller } from "../middleware/ensureIsSeller.middleware";
import { ensureTokenIsValidMiddleware } from "../middleware/ensureTokenIsValidMiddleware";

export const carRoutes: Router = Router();

carRoutes.post("",ensureTokenIsValidMiddleware, ensureIsSeller, ensureDataIsValid(carCreateSchema), createCarController);
carRoutes.get("", listAllCarsController);
carRoutes.patch(
  "/:id",
  verifyCarExists,
  ensureDataIsValid(carUpdateSchema),
  updateCarController
);
carRoutes.delete("/:id", verifyCarExists, deleteCarController);
