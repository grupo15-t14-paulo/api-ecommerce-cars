import { Router } from "express";
import {
  deleteImageController,
  updateImageController,
} from "../controllers/images.controllers";
import { ensureDataIsValid } from "../middleware/ensureDataIsValid.middleware";
import { imageCreateSchema } from "../schemas/image.schema";
import { verifyImageExists } from "../middleware/images/verifyImageExists.middleware";

export const imgRoutes: Router = Router();

imgRoutes.patch(
  "/:id",
  verifyImageExists,
  ensureDataIsValid(imageCreateSchema),
  updateImageController
);

imgRoutes.delete("/:id", verifyImageExists, deleteImageController);
