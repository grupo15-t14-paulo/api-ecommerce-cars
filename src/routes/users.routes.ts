import { Router } from "express";
import { ensureDataIsValid } from "../middleware/ensureDataIsValid.middleware";
import { updateUserWhitOutAdressSchema, userSchema } from "../schemas/users.schema";
import {
  createUserController,
  deleteUserController,
  reatriveUserController,
  updateUserController,
} from "../controllers/users.controller";
import { ensureEmailExistMiddleware } from "../middleware/users/ensureEmailExist.middleware";
import { ensureUserIdExist } from "../middleware/users/ensureUserIdExist.middleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValid(userSchema),
  ensureEmailExistMiddleware,
  createUserController
);
userRoutes.get("/:id", reatriveUserController);
userRoutes.patch(
  "/:id",
  ensureUserIdExist,
  ensureDataIsValid(updateUserWhitOutAdressSchema),
  updateUserController
);
userRoutes.delete("/:id", ensureUserIdExist, deleteUserController);
