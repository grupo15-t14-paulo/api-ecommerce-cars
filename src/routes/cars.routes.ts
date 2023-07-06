import { Router } from "express";
import {
  createCarController,
  deleteCarController,
  listAllCarsController,
  listCarsByUserIdController,
  listOneCarByIdController,
  updateCarController,
} from "../controllers/cars.controllers";
import { ensureDataIsValid } from "../middleware/ensureDataIsValid.middleware";
import { carCreateSchema, carUpdateSchema } from "../schemas/cars.schema";
import { verifyCarExists } from "../middleware/cars/verifyCarExists.middleware";
import { ensureIsSeller } from "../middleware/ensureIsSeller.middleware";
import { ensureTokenIsValidMiddleware } from "../middleware/ensureTokenIsValidMiddleware";
import { ensureIsOwnerCar } from "../middleware/ensureIsOwnerCar.middleware";

export const carRoutes: Router = Router();

carRoutes.get("", listAllCarsController);

carRoutes.get("/:id", listCarsByUserIdController);
carRoutes.get("/search/:carId", listOneCarByIdController);

carRoutes.use(ensureTokenIsValidMiddleware);

carRoutes.post("", ensureIsSeller, ensureDataIsValid(carCreateSchema), createCarController);

carRoutes.patch(
  "/:id",
  verifyCarExists,
  ensureIsOwnerCar,
  ensureDataIsValid(carUpdateSchema),
  updateCarController
);
carRoutes.delete("/:id", ensureIsOwnerCar, verifyCarExists, deleteCarController);
